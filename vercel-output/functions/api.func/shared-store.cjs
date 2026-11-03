"use strict";

const crypto = require("node:crypto");

const MAX_JSON_BYTES = 2 * 1024 * 1024;
const DEFAULT_TIMEOUT_MS = 5000;
const ALLOWED_STATUSES = new Set(["needs_approval", "approved", "rejected", "sent"]);

class SharedStoreError extends Error {
  constructor(message = "shared store unavailable", code = "SHARED_STORE_ERROR") {
    super(message);
    this.name = "SharedStoreError";
    this.code = code;
  }
}

const CREATE_REQUEST_LUA = `
local id = redis.call('INCR', KEYS[1])
redis.call('HSET', KEYS[2], tostring(id), ARGV[1])
redis.call('ZADD', KEYS[3], id, tostring(id))
return id
`;

const CREATE_NEGOTIATION_LUA = `
local id = redis.call('INCR', KEYS[1])
redis.call('HSET', KEYS[2], tostring(id), ARGV[1])
redis.call('ZADD', KEYS[3], id, tostring(id))
redis.call('HSET', KEYS[4], tostring(id), ARGV[2])
redis.call('HINCRBY', KEYS[6], ARGV[2], 1)
return id
`;

const UPDATE_NEGOTIATION_LUA = `
local raw = redis.call('HGET', KEYS[1], ARGV[1])
if not raw then return 0 end
local old = redis.call('HGET', KEYS[2], ARGV[1])
if not old then old = 'needs_approval' end
local nextStatus = ARGV[2]
redis.call('HSET', KEYS[2], ARGV[1], nextStatus)
redis.call('HSET', KEYS[3], ARGV[1], ARGV[3])
if old ~= nextStatus then
  redis.call('HINCRBY', KEYS[4], old, -1)
  redis.call('HINCRBY', KEYS[4], nextStatus, 1)
end
return 1
`;

const SETTINGS_LUA = `
local base = {}
local defaults = cjson.decode(ARGV[1])
for k,v in pairs(defaults) do base[k] = v end
local saved = redis.call('HGET', KEYS[1], 'settings')
if saved then
  local persisted = cjson.decode(saved)
  for k,v in pairs(persisted) do base[k] = v end
end
local patch = cjson.decode(ARGV[2])
-- SHEIN_FX_CONFIGURED_V1
local rateTouched = patch.rateMode ~= nil or patch.officialUsd ~= nil or patch.parallelUsd ~= nil
for k,v in pairs(patch) do
  if k ~= 'usdToLyd' and k ~= 'usdToLydConfigured' then base[k] = v end
end
if rateTouched then
  local configuredRate = tonumber(base.rateMode == 'parallel' and base.parallelUsd or base.officialUsd)
  base.usdToLydConfigured = configuredRate ~= nil and configuredRate > 0
elseif base.usdToLydConfigured ~= true then
  base.usdToLydConfigured = false
end
if base.rateMode == 'parallel' then
  base.usdToLyd = base.parallelUsd
else
  base.rateMode = 'official'
  base.usdToLyd = base.officialUsd
end
redis.call('HSET', KEYS[1], 'settings', cjson.encode(base))
return cjson.encode(base)
`;

const RATE_LIMIT_LUA = `
local current = redis.call('GET', KEYS[1])
if current and tonumber(current) >= tonumber(ARGV[1]) then
  local ttl = redis.call('PTTL', KEYS[1])
  if ttl < 0 then ttl = tonumber(ARGV[2]) end
  return {0, 0, ttl}
end
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[2]) end
local ttl = redis.call('PTTL', KEYS[1])
return {1, math.max(tonumber(ARGV[1]) - count, 0), ttl}
`;

function jsonSize(value) {
  let text;
  try { text = JSON.stringify(value); } catch { throw new SharedStoreError("invalid record", "INVALID_INPUT"); }
  if (typeof text !== "string" || Buffer.byteLength(text, "utf8") > MAX_JSON_BYTES) throw new SharedStoreError("record too large", "INVALID_INPUT");
  return text;
}

function positiveInt(value, name, fallback) {
  const n = value === undefined ? fallback : value;
  if (!Number.isSafeInteger(n) || n <= 0) throw new SharedStoreError(`invalid ${name}`, "INVALID_INPUT");
  return n;
}

function idValue(value) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new SharedStoreError("invalid id", "INVALID_INPUT");
  return String(value);
}

function prepareRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) throw new SharedStoreError("invalid record", "INVALID_INPUT");
  const copy = { ...record };
  delete copy.id;
  delete copy.downloadToken;
  return copy;
}

function normalizeKbBadgeCopy(items) {
  if (!Array.isArray(items) || items.length !== 5 || items.some((item) => typeof item !== "string" || item.length > 80)) {
    throw new SharedStoreError("invalid badge copy", "INVALID_INPUT");
  }
  const normalized = items.map((item) => item.replace(/[\u0000-\u001f\u007f]/g, " ").trim());
  if (normalized.every((item) => !item)) throw new SharedStoreError("invalid badge copy", "INVALID_INPUT");
  return normalized;
}
function validEndpoint(value) {
  if (typeof value !== "string" || !value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && parsed.hostname && !parsed.username && !parsed.password && !parsed.search && !parsed.hash;
  } catch { return false; }
}

function createSharedStore({ env = process.env, fetchImpl = globalThis.fetch, prefix, now = Date.now } = {}) {
  const source = env || {};
  const endpoint = source.KV_REST_API_URL || source.UPSTASH_REDIS_REST_URL || "";
  const token = source.KV_REST_API_TOKEN || source.UPSTASH_REDIS_REST_TOKEN || "";
  const configured = validEndpoint(endpoint) && typeof token === "string" && token.length > 0 && typeof fetchImpl === "function";
  const environment = source.VERCEL_ENV || "development";
  const namespace = prefix === undefined ? `oshop:v1:${environment}:` : String(prefix);
  if (!namespace || namespace.length > 240 || /[\r\n]/.test(namespace)) throw new SharedStoreError("invalid prefix", "INVALID_INPUT");

  const key = (name) => `${namespace}${name}`;
  const requestCounter = key("requests:next");
  const requestRecords = key("requests:records");
  const requestIndex = key("requests:index");
  const negotiationCounter = key("negotiations:next");
  const negotiationRecords = key("negotiations:records");
  const negotiationIndex = key("negotiations:index");
  const negotiationState = key("negotiations:state");
  const negotiationUpdated = key("negotiations:updated");
  const negotiationStats = key("negotiations:stats");
  const settingsKey = key("settings");
  const kbBadgeCopyKey = key("kb:badge-copy");

  async function command(parts) {
    if (!configured) throw new SharedStoreError("shared store is not configured", "NOT_CONFIGURED");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
    try {
      const response = await fetchImpl(endpoint, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(parts), signal: controller.signal });
      if (!response || !response.ok) throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE");
      let body;
      try { body = await response.json(); } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
      if (!body || Object.prototype.hasOwnProperty.call(body, "error") || !Object.prototype.hasOwnProperty.call(body, "result")) throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE");
      return body.result;
    } catch (error) {
      if (error instanceof SharedStoreError) throw error;
      throw new SharedStoreError("shared store unavailable", "STORE_UNAVAILABLE");
    } finally { clearTimeout(timer); }
  }

  async function evalLua(script, keys, args) { return command(["EVAL", script, String(keys.length), ...keys, ...args.map(String)]); }
  async function readHashRecords(hash, ids, stateHash, updatedHash) {
    if (!ids.length) return [];
    const values = await command(["HMGET", hash, ...ids]);
    if (!Array.isArray(values)) throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE");
    const states = stateHash ? await command(["HMGET", stateHash, ...ids]) : null;
    const updated = updatedHash ? await command(["HMGET", updatedHash, ...ids]) : null;
    return values.map((raw, i) => {
      if (!raw) return null;
      try {
        const record = JSON.parse(raw);
        record.id = Number(ids[i]);
        if (stateHash && states && states[i]) record.status = states[i];
        if (updatedHash && updated && updated[i]) record.updated_at = updated[i];
        return record;
      } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
    }).filter(Boolean);
  }

  return {
    isConfigured: () => configured,
    async ping() { const result = await command(["PING"]); if (result !== "PONG") throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); return true; },
    async createRequest(record) {
      const obj = prepareRecord(record);
      if (obj.createdAt === undefined && obj.created_at === undefined) obj.created_at = now();
      const id = await evalLua(CREATE_REQUEST_LUA, [requestCounter, requestRecords, requestIndex], [jsonSize(obj)]);
      return positiveInt(Number(id), "id");
    },
    async getRequest(id) {
      const raw = await command(["HGET", requestRecords, idValue(id)]);
      if (!raw) return null;
      try { const record = JSON.parse(raw); record.id = Number(id); return record; } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
    },
    async listRequests(limit = 50) {
      const count = positiveInt(limit, "limit", 50);
      const ids = await command(["ZREVRANGE", requestIndex, "0", String(count - 1)]);
      const records = await readHashRecords(requestRecords, ids || []);
      return records.map(({ payload, downloadTokenHash, downloadTokenExpiresAt, downloadToken, ...metadata }) => metadata);
    },
    async createNegotiation(record) {
      const input = prepareRecord(record);
      const status = input.status || "needs_approval";
      if (!ALLOWED_STATUSES.has(status)) throw new SharedStoreError("invalid status", "INVALID_INPUT");
      if (input.createdAt === undefined && input.created_at === undefined) input.created_at = now();
      const id = await evalLua(CREATE_NEGOTIATION_LUA, [negotiationCounter, negotiationRecords, negotiationIndex, negotiationState, negotiationUpdated, negotiationStats], [jsonSize(input), status]);
      return positiveInt(Number(id), "id");
    },
    async listNegotiations(limit = 100) {
      const count = positiveInt(limit, "limit", 100);
      const ids = await command(["ZREVRANGE", negotiationIndex, "0", String(count - 1)]);
      return readHashRecords(negotiationRecords, ids || [], negotiationState, negotiationUpdated);
    },
    async updateNegotiationStatus(id, status, updatedAt) {
      if (!ALLOWED_STATUSES.has(status)) throw new SharedStoreError("invalid status", "INVALID_INPUT");
      const result = await evalLua(UPDATE_NEGOTIATION_LUA, [negotiationRecords, negotiationState, negotiationUpdated, negotiationStats], [idValue(id), status, String(updatedAt === undefined ? now() : updatedAt)]);
      return Number(result) === 1;
    },
    async stats() {
      const [requests, values] = await Promise.all([command(["HLEN", requestRecords]), command(["HMGET", negotiationStats, "needs_approval", "approved"])]);
      if (!Array.isArray(values)) throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE");
      return { requests: Number(requests || 0), pending: Number(values[0] || 0), approved: Number(values[1] || 0) };
    },
    async getKbBadgeCopy(defaults = []) {
      const defaultItems = normalizeKbBadgeCopy(defaults);
      const raw = await command(["HGET", kbBadgeCopyKey, "items"]);
      if (!raw) return defaultItems;
      let parsed;
      try { parsed = JSON.parse(raw); } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
      try { return normalizeKbBadgeCopy(parsed); } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
    },
    async updateKbBadgeCopy(items) {
      const normalized = normalizeKbBadgeCopy(items);
      await command(["HSET", kbBadgeCopyKey, "items", JSON.stringify(normalized)]);
      return normalized;
    },
    async getSettings(defaults = {}) {
      if (!defaults || typeof defaults !== "object" || Array.isArray(defaults)) throw new SharedStoreError("invalid defaults", "INVALID_INPUT");
      const raw = await command(["HGET", settingsKey, "settings"]);
      let saved = {};
      if (raw) { try { saved = JSON.parse(raw); } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); } }
      return { ...defaults, ...saved };
    },
    async updateSettings(patch = {}, defaults = {}) {
      if (!patch || typeof patch !== "object" || Array.isArray(patch) || !defaults || typeof defaults !== "object" || Array.isArray(defaults)) throw new SharedStoreError("invalid settings", "INVALID_INPUT");
      const result = await evalLua(SETTINGS_LUA, [settingsKey], [jsonSize(defaults), jsonSize(patch)]);
      try { return JSON.parse(result); } catch { throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE"); }
    },
    async consumeRateLimit(bucket, max, windowMs) {
      if (typeof bucket !== "string" || !bucket || bucket.length > 4096) throw new SharedStoreError("invalid bucket", "INVALID_INPUT");
      const maximum = positiveInt(max, "max");
      const window = positiveInt(windowMs, "windowMs");
      const digest = crypto.createHash("sha256").update(bucket).digest("hex");
      const result = await evalLua(RATE_LIMIT_LUA, [key(`rate:${digest}`)], [maximum, window]);
      if (!Array.isArray(result) || result.length < 3) throw new SharedStoreError("shared store request failed", "STORE_UNAVAILABLE");
      const allowed = Number(result[0]) === 1;
      return { allowed, remaining: Math.max(0, Number(result[1] || 0)), retryAfterSeconds: allowed ? 0 : Math.max(1, Math.ceil(Number(result[2] || window) / 1000)) };
    },
  };
}

module.exports = { createSharedStore, SharedStoreError };
