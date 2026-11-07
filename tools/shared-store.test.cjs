"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { execFile, execFileSync } = require("node:child_process");
const { promisify } = require("node:util");
const { mkdtemp, rm } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { createSharedStore, SharedStoreError } = require("../vercel-output/functions/api.func/shared-store.cjs");

const execFileAsync = promisify(execFile);
const env = { KV_REST_API_URL: "https://redis.example.test", KV_REST_API_TOKEN: "secret-token", VERCEL_ENV: "test" };

function mockFetch() {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    const command = JSON.parse(options.body);
    if (command[0] === "PING") return response("PONG");
    return response(null);
  };
  return { calls, fetchImpl };
}
function response(result, ok = true) { return { ok, status: ok ? 200 : 500, json: async () => ok ? { result } : { error: "provider secret" } }; }

function assertGenericFailure(promise, code) {
  return assert.rejects(promise, (error) => error instanceof SharedStoreError && (!code || error.code === code) && !/secret|provider|token/i.test(error.message));
}

test("configuration validates HTTPS URL syntax and keeps credentials out of URL", async () => {
  const mock = mockFetch();
  const store = createSharedStore({ env, fetchImpl: mock.fetchImpl });
  assert.equal(store.isConfigured(), true);
  await store.ping();
  assert.equal(mock.calls[0].url, env.KV_REST_API_URL);
  assert.equal(mock.calls[0].options.headers.Authorization, "Bearer secret-token");
  assert.deepEqual(JSON.parse(mock.calls[0].options.body), ["PING"]);
  for (const url of ["http://redis.test", "https://user:pass@redis.test", "https://redis.test/?x=1", "https://redis.test/#x", "not a url"]) {
    assert.equal(createSharedStore({ env: { ...env, KV_REST_API_URL: url }, fetchImpl: mock.fetchImpl }).isConfigured(), false, url);
  }
  assert.equal(createSharedStore({ env: { UPSTASH_REDIS_REST_URL: "https://upstash.test", UPSTASH_REDIS_REST_TOKEN: "u-token" }, fetchImpl: mock.fetchImpl }).isConfigured(), true);
});

test("missing config and provider outage fail closed with generic errors", async () => {
  const noConfig = createSharedStore({ env: {}, fetchImpl: async () => { throw new Error("secret-token"); } });
  await assertGenericFailure(noConfig.ping(), "NOT_CONFIGURED");
  const outage = createSharedStore({ env, fetchImpl: async () => response(null, false) });
  await assertGenericFailure(outage.ping(), "STORE_UNAVAILABLE");
});

test("input validation rejects unsafe ids, invalid statuses and oversized payloads", async () => {
  const mock = mockFetch();
  const store = createSharedStore({ env, fetchImpl: mock.fetchImpl });
  await assert.rejects(store.getRequest(0), /id/i);
  await assert.rejects(store.updateNegotiationStatus(1, "pending"), /status/i);
  await assert.rejects(store.createRequest({ payload: "x".repeat(2 * 1024 * 1024) }), /large/i);
  await assert.rejects(store.listRequests(0), /limit/i);
  assert.equal(mock.calls.length, 0);
});

test("the configured FX marker is server-managed and requires an explicitly touched positive admin rate", () => {
  const source = require("node:fs").readFileSync(path.join(__dirname, "../vercel-output/functions/api.func/shared-store.cjs"), "utf8");
  const match = source.match(/const SETTINGS_LUA = `([\s\S]*?)`;/);
  assert.ok(match, "settings Lua transaction must exist");
  assert.match(match[1], /-- SHEIN_FX_CONFIGURED_V1/);
  assert.match(match[1], /local rateTouched = patch\.rateMode ~= nil or patch\.officialUsd ~= nil or patch\.parallelUsd ~= nil/);
  assert.match(match[1], /k ~= 'usdToLydConfigured'/);
  assert.match(match[1], /base\.usdToLydConfigured = configuredRate ~= nil and configuredRate > 0/);
});

function redisBinary(name) {
  const candidate = process.env[name === "server" ? "REDIS_SERVER_BIN" : "REDIS_CLI_BIN"] || (name === "server" ? "redis-server" : "redis-cli");
  try { execFileSync(candidate, ["--version"], { stdio: "ignore" }); return candidate; } catch { return null; }
}

async function redisFetch(socket, cli, url, options) {
  const command = JSON.parse(options.body);
  const { stdout } = await execFileAsync(cli, ["--json", "-s", socket, ...command.map(String)], { timeout: 10000, maxBuffer: 8 * 1024 * 1024 });
  const text = stdout.trim();
  if (!text) return response(null);
  let result;
  try { result = JSON.parse(text); } catch { return response(null, false); }
  return response(result);
}

async function startRedis(server, cli) {
  const dir = await mkdtemp(path.join(tmpdir(), "oshop-redis-"));
  const socket = path.join(dir, "redis.sock");
  const child = require("node:child_process").spawn(server, ["--port", "0", "--unixsocket", socket, "--save", "", "--appendonly", "no", "--daemonize", "no"], { stdio: "ignore" });
  for (let i = 0; i < 100; i++) {
    try { await execFileAsync(cli, ["-s", socket, "PING"], { timeout: 500 }); break; } catch { await new Promise((resolve) => setTimeout(resolve, 25)); }
  }
  await execFileAsync(cli, ["-s", socket, "PING"], { timeout: 1000 });
  return { socket, child, dir };
}

const serverBin = redisBinary("server");
const cliBin = redisBinary("cli");

test("actual Redis Lua integration: atomic IDs, limits, statuses, settings, expiry and persistence", { skip: !serverBin || !cliBin }, async (t) => {
  const redis = await startRedis(serverBin, cliBin);
  t.after(async () => { redis.child.kill("SIGTERM"); await rm(redis.dir, { recursive: true, force: true }); });
  const fetchImpl = (url, options) => redisFetch(redis.socket, cliBin, url, options);
  const base = { KV_REST_API_URL: "https://local.redis.test", KV_REST_API_TOKEN: "local-token", VERCEL_ENV: "test" };
  const a = createSharedStore({ env: base, fetchImpl, prefix: "actual:" });
  const b = createSharedStore({ env: base, fetchImpl, prefix: "actual:" });
  const nested = { emptyArray: [], nonemptyArray: [{ emptyObject: {}, values: [1, 2] }], emptyObject: {} };
  const ids = await Promise.all(Array.from({ length: 20 }, (_, i) => (i % 2 ? b : a).createRequest({ created_at: `r-${i}`, payload: nested, downloadToken: "hidden", downloadTokenHash: "hash", downloadTokenExpiresAt: 123, n: i })));
  assert.equal(new Set(ids).size, 20);
  const listedRequests = await a.listRequests();
  for (const record of listedRequests) {
    for (const field of ["payload", "downloadToken", "downloadTokenHash", "downloadTokenExpiresAt"]) assert.equal(Object.hasOwn(record, field), false, field);
  }
  const fullRequest = await a.getRequest(ids[0]);
  assert.deepEqual(fullRequest.payload, nested);
  assert.equal(fullRequest.downloadTokenHash, "hash");
  assert.equal(Object.hasOwn(fullRequest, "downloadToken"), false);
  await a.createNegotiation({ status: "needs_approval", created_at: "n-1" });
  const negotiationId = await b.createNegotiation({ status: "approved", created_at: "n-2" });
  assert.deepEqual(await a.stats(), { requests: 20, pending: 1, approved: 1 });
  assert.equal(await b.updateNegotiationStatus(negotiationId, "needs_approval", "updated-value"), true);
  assert.deepEqual(await a.stats(), { requests: 20, pending: 2, approved: 0 });
  assert.equal((await a.listNegotiations()).find((x) => x.id === negotiationId).updated_at, "updated-value");

  const before = await a.getRequest(ids[0]);
  const negotiationPayload = { nested: { empty: [], values: [{}] } };
  const stableId = await a.createNegotiation({ status: "approved", created_at: "same", payload: negotiationPayload });
  const rawBefore = await a.getRequest(ids[0]);
  assert.equal(await a.updateNegotiationStatus(stableId, "rejected", "later"), true);
  const stable = (await a.listNegotiations()).find((x) => x.id === stableId);
  assert.deepEqual(stable.payload, negotiationPayload);
  assert.equal(stable.status, "rejected");
  assert.equal(stable.updated_at, "later");
  assert.deepEqual(await a.getRequest(ids[0]), rawBefore);
  const ordered = await Promise.all(Array.from({ length: 12 }, () => a.createRequest({ created_at: "same" })));
  assert.deepEqual((await a.listRequests(12)).map((x) => x.id), ordered.slice().sort((x, y) => y - x));
  const storedRaw = await execFileAsync(cliBin, ["-s", redis.socket, "HGET", "actual:requests:records", String(ordered[0])]);
  assert.equal(JSON.parse(storedRaw.stdout).id, undefined);

  const defaults = { rateMode: "official", officialUsd: 6.43, parallelUsd: 9.9, usdToLyd: 6.43, usdToLydConfigured: false };
  assert.equal((await a.updateSettings({ usdToLydConfigured: true, usdToLyd: 999 }, defaults)).usdToLydConfigured, false);
  const selected = await a.updateSettings({ rateMode: "parallel", usdToLyd: 999 }, defaults);
  assert.equal(selected.usdToLyd, 9.9);
  assert.equal(selected.usdToLydConfigured, true);
  const settings = await Promise.all([a.updateSettings({ officialUsd: 6.5 }, defaults), b.updateSettings({ parallelUsd: 10.1 }, defaults)]);
  assert.ok(settings.every((x) => x.usdToLyd === (x.rateMode === "parallel" ? x.parallelUsd : x.officialUsd)));
  assert.ok(settings.every((x) => x.usdToLydConfigured === true));
  assert.equal((await a.getSettings(defaults)).usdToLyd, 10.1);
  const zeroRate = await a.updateSettings({ rateMode: "official", officialUsd: 0 }, defaults);
  assert.equal(zeroRate.usdToLydConfigured, false);

  const badgeDefaults = ["مرحبًا بك", "مرحبًا بك", "مرحبًا بك", "مرحبًا بك", "مرحبًا بك"];
  const editedBadgeCopy = ["مرحبًا بك", "كيف نساعدك؟", "وكيلك للشحن", "تسوق بثقة", "توصيل لكل مدن ليبيا"];
  assert.deepEqual(await a.getKbBadgeCopy(badgeDefaults), badgeDefaults);
  assert.deepEqual(await a.updateKbBadgeCopy(editedBadgeCopy), editedBadgeCopy);
  assert.deepEqual(await b.getKbBadgeCopy(badgeDefaults), editedBadgeCopy);
  await assert.rejects(a.updateKbBadgeCopy(["عبارة واحدة"]), { code: "INVALID_INPUT" });
  await assert.rejects(a.updateKbBadgeCopy([" ", "", "", "", ""]), { code: "INVALID_INPUT" });
  await assert.rejects(a.updateKbBadgeCopy(["x".repeat(81), "", "", "", ""]), { code: "INVALID_INPUT" });

  const outcomes = await Promise.all(Array.from({ length: 8 }, () => a.consumeRateLimit("local-bucket", 3, 150)));
  assert.equal(outcomes.filter((x) => x.allowed).length, 3);
  assert.equal(outcomes.filter((x) => !x.allowed).length, 5);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal((await a.consumeRateLimit("local-bucket", 3, 150)).allowed, true);
  const rejected = await a.consumeRateLimit("rejected-bucket", 1, 150);
  assert.equal(rejected.allowed, true);
  const limited = await a.consumeRateLimit("rejected-bucket", 1, 150);
  assert.equal(limited.allowed, false);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal((await a.consumeRateLimit("rejected-bucket", 1, 150)).allowed, true);
});
