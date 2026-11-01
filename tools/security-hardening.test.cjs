'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const security = require('../vercel-output/functions/api.func/admin-security.cjs');

const password = 'test-only-oshop-admin-password-0123456789';
const origin = 'https://oshop-ly.vercel.app';
const env = { OSHOP_ADMIN_PASSWORD: password, OSHOP_ADMIN_ALLOWED_ORIGINS: origin };

function makeResponse() {
  return {
    statusCode: 200, headers: {}, body: undefined, headersSent: false,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; this.headersSent = true; return this; },
  };
}

function makeRequest({ path, method = 'GET', headers = {}, body, query = {}, ip = '127.0.0.1' }) {
  return { path, method, headers, body, query, ip, socket: { remoteAddress: ip } };
}

async function runMiddleware(middleware, req) {
  const res = makeResponse(); let passed = false; let nextError;
  await middleware(req, res, (error) => { passed = true; nextError = error; });
  return { res, passed, nextError };
}

function makeSharedStore({ configured = true, outage = false } = {}) {
  const buckets = new Map();
  return {
    buckets, isConfigured: () => configured,
    async ping() { if (outage) throw new Error('backend outage'); return true; },
    async consumeRateLimit(bucket, max, windowMs) {
      if (outage) throw new Error('backend outage');
      const now = Date.now();
      const item = buckets.get(bucket) || { started: now, count: 0 };
      if (now - item.started >= windowMs) { item.started = now; item.count = 0; }
      item.count += 1; buckets.set(bucket, item);
      const allowed = item.count <= max;
      return { allowed, remaining: Math.max(0, max - item.count), retryAfterSeconds: allowed ? 0 : Math.max(1, Math.ceil((item.started + windowMs - now) / 1000)) };
    },
  };
}

const sharedStore = makeSharedStore();

async function sessionFromLogin(nowValue = Date.now(), ip = 'login-test-ip', store = sharedStore) {
  const handler = security.makeLoginHandler({ env, now: () => nowValue, sharedStore: store });
  const req = makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password }, ip });
  const res = makeResponse(); await handler(req, res);
  assert.equal(res.statusCode, 200); return res.headers['set-cookie'].split(';', 1)[0];
}

test('admin login fails closed for missing store/configuration and store outage', async () => {
  const missing = security.makeLoginHandler({ env: { ...env }, sharedStore: null });
  const missingRes = makeResponse(); await missing(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password } }), missingRes);
  assert.equal(missingRes.statusCode, 503); assert.equal(missingRes.headers['cache-control'], 'no-store');
  const unconfigured = makeResponse(); await security.makeLoginHandler({ env, sharedStore: makeSharedStore({ configured: false }) })(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password } }), unconfigured);
  assert.equal(unconfigured.statusCode, 503);
  const outage = makeResponse(); await security.makeLoginHandler({ env, sharedStore: makeSharedStore({ outage: true }) })(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password } }), outage);
  assert.equal(outage.statusCode, 503); assert.doesNotMatch(JSON.stringify(outage.body), /backend|stack|provider/i);
});

test('login checks origin, counts failures across instances, and allows valid cookie', async () => {
  const backend = makeSharedStore();
  const first = security.makeLoginHandler({ env, sharedStore: backend, now: () => 1_800_000_000_000 });
  const second = security.makeLoginHandler({ env, sharedStore: backend, now: () => 1_800_000_000_000 });
  const forbidden = makeResponse(); await first(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin: 'https://evil.example' }, body: { password } }), forbidden);
  assert.equal(forbidden.statusCode, 403);
  for (let i = 0; i < 8; i++) { const res = makeResponse(); await first(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password: 'wrong' }, ip: 'shared-login-ip' }), res); assert.equal(res.statusCode, 401); }
  const limited = makeResponse(); await second(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password }, ip: 'shared-login-ip' }), limited);
  assert.equal(limited.statusCode, 429); assert.ok(limited.headers['retry-after']);
  const cookie = await sessionFromLogin(1_800_000_000_000, 'valid-login-ip', makeSharedStore());
  assert.match(cookie, /^__Host-oshop_admin=/);
  assert.match((await (async () => { const h = security.makeLoginHandler({ env, sharedStore: makeSharedStore() }); const r = makeResponse(); await h(makeRequest({ path: '/api/admin/login', method: 'POST', headers: { origin }, body: { password }, ip: 'cookie-ip' }), r); return r.headers['set-cookie']; })()), /Path=\/; HttpOnly; Secure; SameSite=Strict/);
  assert.equal(security.verifySessionCookie(cookie.split('=')[1], password, 1_800_000_000_000), true);
  assert.equal(security.verifySessionCookie(cookie.split('=')[1], password, 1_800_010_000_000), false);
});

test('staff authorization normalizes uppercase/trailing slash and enforces origin', async () => {
  const cookie = await sessionFromLogin(1_800_000_000_000, 'staff-login-ip', makeSharedStore());
  const middleware = security.createAdminMiddleware({ env, now: () => 1_800_000_000_000 });
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/API/STAFF/overview/' }))).res.statusCode, 401);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/staff/overview', headers: { cookie } }))).passed, true);
  const wrongOrigin = await runMiddleware(middleware, makeRequest({ path: '/api/settings', method: 'PUT', headers: { cookie, origin: 'https://evil.example' } }));
  assert.equal(wrongOrigin.res.statusCode, 403);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/API/SETTINGS/', method: 'PUT', headers: { cookie, origin } }))).passed, true);
});

test('Excel capability lookup is async, saves record, and fails closed on lookup error', async () => {
  const nowValue = 1_800_000_000_000; const capability = security.createDownloadCapability(nowValue);
  const record = { downloadTokenHash: capability.tokenHash, downloadTokenExpiresAt: capability.expiresAt, id: 42 };
  const middleware = security.createAdminMiddleware({ env: {}, now: () => nowValue, getRequestById: async (id) => id === 42 ? record : null });
  const req = makeRequest({ path: '/api/requests/42/excel', query: { token: capability.token } });
  const valid = await runMiddleware(middleware, req); assert.equal(valid.passed, true); assert.equal(req.oshopRequestRecord, record);
  const failure = security.createAdminMiddleware({ env, getRequestById: async () => { throw new Error('database detail'); } });
  const failed = await runMiddleware(failure, makeRequest({ path: '/api/requests/42/excel', query: { token: capability.token } }));
  assert.equal(failed.res.statusCode, 503); assert.doesNotMatch(JSON.stringify(failed.res.body), /database|detail|stack/i);
  const expired = security.createAdminMiddleware({ env, now: () => capability.expiresAt + 1, getRequestById: async () => record });
  assert.equal((await runMiddleware(expired, makeRequest({ path: '/api/requests/42/excel', query: { token: capability.token } }))).res.statusCode, 401);
});

test('public reads stay public while protected request routes require auth', async () => {
  const middleware = security.createAdminMiddleware({ env });
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/settings', method: 'GET' }))).passed, true);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/requests/42/excel' }))).res.statusCode, 401);
});

test('input guard preserves input/capability checks and normalizes paths', async () => {
  const guard = security.createInputGuard();
  assert.equal((await runMiddleware(guard, makeRequest({ path: '/API/CHAT/', method: 'POST', body: { messages: Array.from({ length: 21 }, () => ({ role: 'user', text: 'x' })) } }))).res.statusCode, 400);
  assert.equal((await runMiddleware(guard, makeRequest({ path: '/api/tts', method: 'POST', body: { text: 'x'.repeat(3001) } }))).res.statusCode, 413);
  const logReq = makeRequest({ path: '/api/client-log', method: 'POST', body: { where: 'x\nforged', message: 'y\u0000z' } });
  assert.equal((await runMiddleware(guard, logReq)).passed, true); assert.equal(logReq.body.where, 'x forged'); assert.equal(logReq.body.message, 'y z');
});

test('rate limits are shared across middleware instances, add global caps, and ignore spoofed forwarding headers', async () => {
  const backend = makeSharedStore(); const opts = { env, sharedStore: backend, now: () => 1_800_000_000_000 };
  const one = security.createRateLimitMiddleware(opts); const two = security.createRateLimitMiddleware(opts);
  for (let attempt = 0; attempt < 20; attempt++) assert.equal((await runMiddleware(one, makeRequest({ path: '/api/chat', method: 'POST', ip: 'stable-client-ip', headers: { 'x-forwarded-for': `spoofed-${attempt}` } }))).passed, true);
  const limited = await runMiddleware(two, makeRequest({ path: '/API/CHAT/', method: 'POST', ip: 'stable-client-ip', headers: { 'x-forwarded-for': 'different-spoof' } }));
  assert.equal(limited.res.statusCode, 429);
  for (let attempt = 0; attempt < 199; attempt++) await runMiddleware(one, makeRequest({ path: '/api/chat', method: 'POST', ip: `client-${attempt}` }));
  assert.equal((await runMiddleware(two, makeRequest({ path: '/api/chat', method: 'POST', ip: 'another-client' }))).res.statusCode, 429);
  assert.equal((await runMiddleware(one, makeRequest({ path: '/api/settings', method: 'GET', ip: 'settings-ip' }))).passed, true);
});

test('rate limiter fails closed for missing configuration or outage', async () => {
  const req = makeRequest({ path: '/api/chat', method: 'POST' });
  assert.equal((await runMiddleware(security.createRateLimitMiddleware({ env, sharedStore: makeSharedStore({ configured: false }) }), req)).res.statusCode, 503);
  assert.equal((await runMiddleware(security.createRateLimitMiddleware({ env, sharedStore: makeSharedStore({ outage: true }) }), req)).res.statusCode, 503);
});

test('rate-limit client hashes require a private long secret and never store raw IP', async () => {
  const token = 'local-only-test-redis-token-with-enough-entropy';
  const backend = makeSharedStore();
  const limiter = security.createRateLimitMiddleware({ env: { KV_REST_API_TOKEN: token }, sharedStore: backend });
  await runMiddleware(limiter, makeRequest({ path: '/api/chat', method: 'POST', ip: 'private-client-address' }));
  const ipBucket = [...backend.buckets.keys()].find((key) => key.startsWith('rate:ip:'));
  const expected = crypto.createHmac('sha256', token).update('private-client-address').digest('hex');
  assert.ok(ipBucket.includes(expected));
  assert.equal(ipBucket.includes('private-client-address'), false);
  const unkeyed = await runMiddleware(security.createRateLimitMiddleware({ env: {}, sharedStore: makeSharedStore() }), makeRequest({ path: '/api/chat', method: 'POST' }));
  assert.equal(unkeyed.res.statusCode, 503);
});

test('unauthenticated export without a plausible capability does not read private records', async () => {
  let reads = 0;
  const middleware = security.createAdminMiddleware({ env, getRequestById: async () => { reads++; throw new Error('must not read'); } });
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/requests/1/excel' }))).res.statusCode, 401);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/requests/2/excel', query: { token: 'invalid' } }))).res.statusCode, 401);
  assert.equal(reads, 0);
});

test('changing tracking codes or export ids cannot create fresh rate-limit buckets', async () => {
  const middleware = security.createRateLimitMiddleware({ env, sharedStore: makeSharedStore() });
  for (let i = 0; i < 60; i++) assert.equal((await runMiddleware(middleware, makeRequest({ path: `/api/track/code-${i}`, ip: 'track-enumerator' }))).passed, true);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/track/another-code', ip: 'track-enumerator' }))).res.statusCode, 429);
  for (let i = 1; i <= 60; i++) assert.equal((await runMiddleware(middleware, makeRequest({ path: `/api/requests/${i}/excel`, ip: 'export-enumerator' }))).passed, true);
  assert.equal((await runMiddleware(middleware, makeRequest({ path: '/api/requests/999/excel', ip: 'export-enumerator' }))).res.statusCode, 429);
});
