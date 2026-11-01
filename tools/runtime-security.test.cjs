'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs/promises');
const { spawn, execFile, execFileSync } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync = promisify(execFile);
const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, 'vercel-output/functions/api.func/index.cjs');
const CHILD = path.join(ROOT, 'tools/helpers/runtime-security-child.cjs');
const SERVER = process.env.REDIS_SERVER_BIN || '/workspace/local-test-tools/redis/usr/bin/redis-server';
const CLI = process.env.REDIS_CLI_BIN || '/workspace/local-test-tools/redis/usr/bin/redis-cli';
const LIB = process.env.LD_LIBRARY_PATH || '/workspace/local-test-tools/redis/usr/lib/x86_64-linux-gnu';
const PASSWORD = 'runtime-test-admin-password-01234567890123456789';
const ORIGIN = 'http://localhost.test';
const ENV_BASE = { KV_REST_API_URL: 'https://local.redis.test', KV_REST_API_TOKEN: 'runtime-dummy-redis-token', VERCEL_ENV: 'runtime-integration-test', OSHOP_ADMIN_PASSWORD: PASSWORD, OSHOP_ADMIN_ALLOWED_ORIGINS: ORIGIN };
const env = { ...process.env, LD_LIBRARY_PATH: LIB };
function available(bin) { try { execFileSync(bin, ['--version'], { stdio: 'ignore', env }); return true; } catch { return false; } }
const canRun = available(SERVER) && available(CLI);
async function redisCommand(socket, ...args) { const { stdout } = await execFileAsync(CLI, ['--json', '-s', socket, ...args.map(String)], { env, timeout: 10000 }); const t = stdout.trim(); return t ? JSON.parse(t) : null; }
async function waitForRedis(socket, child) { for (let i = 0; i < 120; i++) { try { await execFileAsync(CLI, ['-s', socket, 'PING'], { env, timeout: 500 }); return; } catch { if (child.exitCode !== null) throw new Error('redis exited before readiness'); await new Promise(r => setTimeout(r, 25)); } } throw new Error('redis readiness timeout'); }
async function startRedis(dir) { const socket = path.join(dir, 'redis.sock'); const child = spawn(SERVER, ['--port', '0', '--unixsocket', socket, '--save', '', '--appendonly', 'no', '--daemonize', 'no'], { env, stdio: 'ignore' }); await waitForRedis(socket, child); return { socket, child }; }
function startInstance(socket, port) { const child = spawn(process.execPath, [CHILD], { env: { PATH: process.env.PATH, LD_LIBRARY_PATH: LIB, REDIS_CLI_BIN: CLI, REDIS_SOCKET: socket, OSHOP_BUNDLE: BUNDLE, PORT: String(port), ...ENV_BASE }, stdio: ['ignore', 'pipe', 'pipe'] }); return new Promise((resolve, reject) => { let out = ''; const timer = setTimeout(() => reject(new Error(`child ${port} readiness timeout: ${out}`)), 10000); child.stdout.on('data', d => { out += d; if (out.includes(`READY ${port}`)) { clearTimeout(timer); resolve(child); } }); child.once('error', reject); child.once('exit', code => { if (code && !out.includes(`READY ${port}`)) { clearTimeout(timer); reject(new Error(`child ${port} exited ${code}: ${out}`)); } }); }); }
async function stop(child) { if (!child || child.exitCode !== null) return; child.kill('SIGTERM'); await new Promise(resolve => child.once('exit', resolve)); }
async function request(port, pathname, { method = 'GET', body, cookie, origin, host = 'oshop-ly.vercel.app', forwardedHost, ip = '127.0.0.1' } = {}) { const headers = { 'x-test-ip': ip, 'x-test-host': host }; if (forwardedHost) headers['x-forwarded-host'] = forwardedHost; if (body !== undefined) headers['content-type'] = 'application/json'; if (cookie) headers.cookie = cookie; if (origin) headers.origin = origin; const res = await fetch(`http://127.0.0.1:${port}${pathname}`, { method, headers, redirect: 'manual', body: body === undefined ? undefined : JSON.stringify(body) }); const raw = Buffer.from(await res.arrayBuffer()); let json; try { json = JSON.parse(raw.toString()); } catch {} return { status: res.status, headers: res.headers, json, body: raw }; }
function badgeRequest(port, pathname, options = {}) { return request(port, pathname, { ...options, host: 'kb-badge-admin.vercel.app' }); }
function cookieValue(setCookie) { return String(setCookie).split(';', 1)[0]; }
function capability() { const token = crypto.randomBytes(32).toString('base64url'); return { token, tokenHash: crypto.createHash('sha256').update(token).digest('hex'), expiresAt: Date.now() + 15 * 60 * 1000 }; }
function makeFetch(socket) { return async (url, options = {}) => { const u = new URL(url); if (u.hostname === 'open.er-api.com') return new Response(JSON.stringify({ result: 'error', rates: {} }), { status: 200 }); if (u.hostname !== 'local.redis.test') throw new Error('seed network blocked'); const command = JSON.parse(options.body); const result = await redisCommand(socket, ...command.map(String)); return new Response(JSON.stringify({ result }), { status: 200 }); }; }

test('runtime HTTP integration uses real bundle, isolated children, Redis Lua, and fails closed', { skip: !canRun ? 'Redis binaries unavailable' : false }, async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'oshop-runtime-security-'));
  let redis; const children = [];
  try {
    redis = await startRedis(dir);
    const fetchImpl = makeFetch(redis.socket);
    const { createSharedStore } = require(path.join(ROOT, 'vercel-output/functions/api.func/shared-store.cjs'));
    const storeA = createSharedStore({ env: ENV_BASE, fetchImpl, prefix: 'oshop:v1:runtime-integration-test:' });
    const storeB = createSharedStore({ env: ENV_BASE, fetchImpl, prefix: 'oshop:v1:runtime-integration-test:' });
    const defaults = { rateMode: 'official', officialUsd: 6.43, parallelUsd: 9.9, usdToLyd: 6.43, airUsdPerKg: 9, seaUsdPerCbm: 280, serviceFeePercent: 5, customsPercent: 0 };
    const defaultBadgeCopy = ['وكيل KB الذكي', 'شحن مجاني من شي إن', 'صفر عمولة على طلبك', 'البطاقة نفس سعر الكاش', 'توصيل لكل مدن ليبيا'];
    const cap = capability();
    const nested = { request: { items: [{ options: [], meta: {} }], empty: [] }, results: [{ offer: { tags: [] }, flags: [] }] };
    const exportPayload = { generatedAt: Date.now(), request: { mode: 'air', qty: 1 }, options: [], ...nested, translated: { original: 'test', searchTerm: 'test', method: 'local' }, searchTerms: ['test'], searchedCount: 0, fx: { cnyToLyd: 1, usdToLyd: 12.34 }, chinaDomestic: { cnyPerKg: 1 }, freight: { air: { usdPerKg: 1 }, sea: { usdPerCbm: 1 } }, packagingWeightFactor: 1, defaultDensityKgPerCbm: 1, fallbackUnitWeightKg: 1, customsPercent: 0, serviceFeePercent: 0, paymentFeePercent: 0, creditsUsed: 0, warnings: [] };
    const reqId = await storeA.createRequest({ kind: 'sourcing', payload: exportPayload, downloadTokenHash: cap.tokenHash, downloadTokenExpiresAt: cap.expiresAt });
    const negotiationId = await storeA.createNegotiation({ status: 'needs_approval', supplier: 'local supplier', product: 'nested product', data: { values: [] } });
    await storeA.updateSettings({ rateMode: 'official', parallelUsd: 9.9 }, defaults);
    await storeA.ping();
    const [aPort, bPort, cPort] = [19181, 19182, 19183];
    children.push(await startInstance(redis.socket, aPort), await startInstance(redis.socket, bPort), await startInstance(redis.socket, cPort));
    const anon = await request(aPort, '/api/staff/overview'); assert.equal(anon.status, 401);
    assert.equal((await request(aPort, '/api/settings', { method: 'PUT', body: { parallelUsd: 10 } })).status, 401);
    assert.equal((await badgeRequest(aPort, '/api/staff/kb-badge-copy')).status, 401);
    assert.equal((await request(aPort, '/api/staff/kb-badge-copy', { host: 'kb-online-store.vercel.app', forwardedHost: 'kb-badge-admin.vercel.app', cookie: 'forged=ignored' })).status, 404);
    assert.equal((await badgeRequest(aPort, '/api/staff/kb-badge-copy', { method: 'PUT', origin: 'https://kb-badge-admin.vercel.app', body: { items: defaultBadgeCopy } })).status, 401);
    const publicBadge = await request(aPort, '/api/kb/badge-display'); assert.equal(publicBadge.status, 200); assert.deepEqual(publicBadge.json.items, defaultBadgeCopy);
    assert.equal((await request(aPort, '/API/STAFF/OVERVIEW/')).status, 401);
    assert.equal((await request(aPort, '/api/admin/login', { method: 'POST', origin: 'https://evil.test', body: { password: PASSWORD }, ip: 'origin-ip' })).status, 403);
    assert.equal((await request(aPort, '/api/admin/login', { method: 'POST', origin: ORIGIN, body: { password: 'wrong-password' }, ip: 'wrong-ip' })).status, 401);
    const login = await request(aPort, '/api/admin/login', { method: 'POST', origin: ORIGIN, body: { password: PASSWORD }, ip: 'valid-ip' });
    assert.equal(login.status, 200); const cookie = cookieValue(login.headers.get('set-cookie')); assert.match(login.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Strict/);
    const badgeLogin = await badgeRequest(aPort, '/api/kb-badge-admin/login', { method: 'POST', origin: 'https://kb-badge-admin.vercel.app', body: { password: PASSWORD }, ip: 'badge-valid-ip' });
    assert.equal(badgeLogin.status, 200); assert.match(badgeLogin.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Strict/);
    const wrongBadgeOrigin = await badgeRequest(aPort, '/api/kb-badge-admin/login', { method: 'POST', origin: ORIGIN, body: { password: PASSWORD } }); assert.equal(wrongBadgeOrigin.status, 403);
    const anonymousPage = await badgeRequest(aPort, '/kb-badge-admin'); assert.equal(anonymousPage.status, 302); assert.match(anonymousPage.headers.get('location'), /kb-badge-admin-login/);
    for (const path of ['/kb-badge-admin', '/API/STAFF/KB-BADGE-ADMIN/', '/api/staff/kb-badge-copy', '/api/kb-badge-admin/login']) {
      const hidden = await request(aPort, path, { host: 'kb-online-store.vercel.app', cookie, forwardedHost: 'kb-badge-admin.vercel.app' }); assert.equal(hidden.status, 404); assert.equal(hidden.headers.get('location'), null); assert.equal(hidden.headers.get('x-oshop-admin-auth'), null);
    }
    assert.equal((await badgeRequest(aPort, '/api/settings')).status, 404);
    for (const path of ['/kb-badge-admin-login.html', '/kb-badge-admin-login.js', '/kb-badge-admin.js', '/api/kb-badge-admin/assets/login-html']) {
      const allowedAsset = await badgeRequest(aPort, path); assert.equal(allowedAsset.status, 200, path); assert.equal(allowedAsset.headers.get('cache-control'), 'no-store');
      const hiddenAsset = await request(aPort, path, { host: 'kb-online-store.vercel.app', cookie }); assert.equal(hiddenAsset.status, 404, path); assert.equal(hiddenAsset.headers.get('location'), null);
    }
    for (const path of ['/admin-login.html', '/admin-login.js', '/api/legacy-admin/login-page']) {
      assert.equal((await request(aPort, path)).status, 200, 'legacy '+path);
      assert.equal((await request(aPort, path, { host: 'kb-online-store.vercel.app' })).status, 404, 'primary '+path);
      assert.equal((await badgeRequest(aPort, path)).status, 404, 'admin '+path);
    }

    const overview = await request(bPort, '/api/staff/overview', { cookie }); assert.equal(overview.status, 200); assert.ok(overview.json && overview.json.stats && Array.isArray(overview.json.requests) && Array.isArray(overview.json.negotiations)); assert.ok(overview.json.requests.every(r => !Object.prototype.hasOwnProperty.call(r, 'payload') && !Object.prototype.hasOwnProperty.call(r, 'downloadTokenHash') && !Object.prototype.hasOwnProperty.call(r, 'downloadTokenExpiresAt') && !Object.prototype.hasOwnProperty.call(r, 'downloadToken'))); assert.ok(!JSON.stringify(overview.json).includes('[object Promise]'));
    const adminPage = await badgeRequest(aPort, '/api/staff/kb-badge-admin', { cookie }); assert.equal(adminPage.status, 200); assert.match(adminPage.body.toString(), /noindex, nofollow, noarchive/);
    const directAdminPage = await badgeRequest(aPort, '/kb-badge-admin', { cookie }); assert.equal(directAdminPage.status, 200); assert.match(directAdminPage.body.toString(), /noindex, nofollow, noarchive/);
    const adminCopy = await badgeRequest(aPort, '/api/staff/kb-badge-copy', { cookie }); assert.equal(adminCopy.status, 200); assert.deepEqual(adminCopy.json.items, defaultBadgeCopy);
    const editedBadgeCopy = ['وكيل KB المتطور', 'شحن سريع من شي إن', 'بدون عمولة إضافية', 'السعر موضح قبل الطلب', 'توصيل داخل ليبيا'];
    const saveBadge = await badgeRequest(aPort, '/api/staff/kb-badge-copy', { method: 'PUT', origin: 'https://kb-badge-admin.vercel.app', cookie, body: { items: editedBadgeCopy } }); assert.equal(saveBadge.status, 200); assert.deepEqual(saveBadge.json.items, editedBadgeCopy);
    const publicUpdatedBadge = await request(bPort, '/api/kb/badge-display'); assert.equal(publicUpdatedBadge.status, 200); assert.deepEqual(publicUpdatedBadge.json.items, editedBadgeCopy);
    const anonymousReadAfterSave = await badgeRequest(cPort, '/api/staff/kb-badge-copy'); assert.equal(anonymousReadAfterSave.status, 401); assert.doesNotMatch(anonymousReadAfterSave.body.toString(), /وكيل KB المتطور/);
    const anonymousWriteAfterSave = await badgeRequest(cPort, '/api/staff/kb-badge-copy', { method: 'PUT', origin: 'https://kb-badge-admin.vercel.app', body: { items: defaultBadgeCopy } }); assert.equal(anonymousWriteAfterSave.status, 401);
    const unchangedAfterDeniedWrite = await request(bPort, '/api/kb/badge-display'); assert.deepEqual(unchangedAfterDeniedWrite.json.items, editedBadgeCopy);
    const invalidBadge = await badgeRequest(aPort, '/api/staff/kb-badge-copy', { method: 'PUT', origin: 'https://kb-badge-admin.vercel.app', cookie, body: { items: ['واحدة فقط'] } }); assert.equal(invalidBadge.status, 400);
    const put = await request(aPort, '/api/settings', { method: 'PUT', origin: ORIGIN, cookie, body: { rateMode: 'parallel', parallelUsd: 12.34 } }); assert.equal(put.status, 200); assert.equal(put.json.usdToLyd, 12.34);
    const settingsB = await request(bPort, '/api/settings'); assert.equal(settingsB.status, 200); assert.equal(settingsB.json.usdToLyd, 12.34);
    await stop(children.shift()); const cold = await startInstance(redis.socket, aPort); children.push(cold); const coldOverview = await request(aPort, '/api/staff/overview', { cookie }); assert.equal(coldOverview.status, 200); assert.ok(coldOverview.json.requests.some(r => r.id === reqId)); const coldBadge = await badgeRequest(aPort, '/api/staff/kb-badge-copy', { cookie }); assert.equal(coldBadge.status, 200); assert.deepEqual(coldBadge.json.items, editedBadgeCopy);
    const validExport = await request(bPort, `/api/requests/${reqId}/excel?token=${encodeURIComponent(cap.token)}`); assert.equal(validExport.status, 200); assert.equal(validExport.body.subarray(0, 2).toString(), 'PK');
    assert.equal((await request(bPort, `/api/requests/${reqId}/excel?token=invalid-token`)).status, 401);
    const expired = capability(); await storeA.createRequest({ kind: 'sourcing', payload: exportPayload, downloadTokenHash: expired.tokenHash, downloadTokenExpiresAt: Date.now() - 1 }); assert.equal((await request(bPort, `/api/requests/${reqId + 1}/excel?token=${expired.token}`)).status, 401);
    const cookieExport = await request(cPort, `/api/requests/${reqId}/excel`, { cookie }); assert.equal(cookieExport.status, 200); assert.equal(cookieExport.body.subarray(0, 2).toString(), 'PK');
    const seedNeg = await storeB.createNegotiation({ status: 'needs_approval', supplier: 'seed', product: 'seed', data: { nested: [] } }); assert.ok(seedNeg > 0); const update = await request(aPort, `/api/staff/negotiations/${negotiationId}`, { method: 'POST', origin: ORIGIN, cookie, body: { status: 'approved' } }); assert.equal(update.status, 200); const stats = (await request(bPort, '/api/staff/overview', { cookie })).json.stats; assert.deepEqual(Object.keys(stats).sort(), ['approved', 'pending', 'requests']); assert.equal(stats.pending, 1); assert.equal(stats.approved, 1);
    const attempts = await Promise.all(Array.from({ length: 9 }, (_, i) => request(i % 2 ? bPort : cPort, '/api/admin/login', { method: 'POST', origin: ORIGIN, body: { password: 'wrong-password' }, ip: 'distributed-login-ip' }))); assert.equal(attempts.filter(x => x.status === 429).length, 1); assert.ok(attempts.some(x => x.headers.get('retry-after')));
    assert.equal((await request(aPort, '/api/health')).status, 200); assert.doesNotMatch(JSON.stringify(await request(aPort, '/api/health')), /password|token|redis/i);
    await stop(redis.child); redis = null;
    const outage = await request(bPort, '/api/settings'); assert.equal(outage.status, 503); const outageLogin = await request(cPort, '/api/admin/login', { method: 'POST', origin: ORIGIN, body: { password: PASSWORD }, ip: 'outage-ip' }); assert.equal(outageLogin.status, 503); assert.doesNotMatch(JSON.stringify(outageLogin.json), /secret|token|redis|provider|stack/i);
  } finally {
    for (const child of children) await stop(child);
    if (redis) await stop(redis.child);
    await fs.rm(dir, { recursive: true, force: true });
  }
});
