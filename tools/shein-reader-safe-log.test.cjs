"use strict";

const assert = require("node:assert/strict");
const cp = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const createSafeLogger = require("./shein-reader-safe-log.cjs");

const root = path.resolve(__dirname, "..");
const bundlePath = path.join(root, "vercel-output/functions/api.func/index.cjs");
const marker = "/* KB_SHEIN_READER_SAFE_LOG_V1 */";

function capture(input) {
  const writes = [];
  createSafeLogger((...args) => writes.push(args))(input);
  return writes;
}

function onlyMetadata(writes, expected) {
  assert.equal(writes.length, 1);
  assert.deepEqual(writes[0], ["[shein-reader]", JSON.stringify(expected)]);
  const line = writes[0].join(" ");
  for (const privateValue of [
    "https://www.shein.com/cart/share/private-cart",
    "Secret Product Title",
    "sk-live-never-log-this",
    "provider supplied diagnostic text",
  ]) {
    assert.equal(line.includes(privateValue), false);
  }
}

test("HTTP failures log only normalized category, status, and code", () => {
  onlyMetadata(capture({
    response: { ok: false, status: 403 },
    hasData: true,
    providerError: true,
  }), { category: "http_error", status: 403, code: "HTTP_403" });
});

test("transport errors retain only a recognized safe code", () => {
  onlyMetadata(capture({
    error: {
      name: "TypeError",
      code: "ECONNRESET",
      message: "provider supplied diagnostic text https://www.shein.com/cart/share/private-cart sk-live-never-log-this",
    },
  }), { category: "network_error", status: null, code: "ECONNRESET" });
});

test("unknown error codes and timeout details are never echoed", () => {
  onlyMetadata(capture({
    error: {
      name: "TimeoutError",
      code: "sk-live-never-log-this",
      message: "provider supplied diagnostic text Secret Product Title",
    },
  }), { category: "timeout", status: null, code: "TIMEOUT" });
});

test("provider errors and invalid responses have fixed, non-provider codes", () => {
  onlyMetadata(capture({
    response: { ok: true, status: 200 },
    hasData: true,
    providerError: true,
  }), { category: "provider_error", status: 200, code: "UPSTREAM_ERROR" });
  onlyMetadata(capture({
    response: { ok: true, status: 200 },
    hasData: false,
  }), { category: "invalid_response", status: 200, code: "INVALID_RESPONSE" });
});

test("safe logger patcher is idempotent", () => {
  const before = fs.readFileSync(bundlePath, "utf8");
  cp.execFileSync("python3", ["tools/apply-shein-reader-safe-logging.py"], { cwd: root, stdio: "pipe" });
  const after = fs.readFileSync(bundlePath, "utf8");
  assert.equal(after, before);
});

test("the generated API contains only the safe helper and one failure-path call", () => {
  const bundle = fs.readFileSync(bundlePath, "utf8");
  assert.equal(bundle.split(marker).length - 1, 1);
  assert.equal(bundle.split("__KBSheinReaderSafeLog({response:resp,error:lastErr,hasData:Boolean(data),providerError:Boolean(data?.error)})").length - 1, 1);
  const helperStart = bundle.indexOf(marker) + marker.length;
  const helperEnd = bundle.indexOf("function iCe(){", helperStart);
  assert.ok(helperEnd > helperStart, "safe logger helper is present before provider setup");
  const helper = bundle.slice(helperStart, helperEnd);
  assert.match(helper, /JSON\.stringify\(\{ category, status, code \}\)/);
  assert.doesNotMatch(helper, /message|url|items|API-Key|secret/i);
});
