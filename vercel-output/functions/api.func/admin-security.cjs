'use strict';

const crypto = require('node:crypto');

const COOKIE_NAME = '__Host-oshop_admin';
const DEFAULT_ORIGIN = 'https://oshop-ly.vercel.app';
const SESSION_TTL_SECONDS = 2 * 60 * 60;
const DOWNLOAD_TTL_MS = 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES = 8;
const MIN_ADMIN_PASSWORD_LENGTH = 32;

function sendJson(res, status, body, headers = {}) {
  if (typeof res.setHeader === 'function') res.setHeader('Cache-Control', 'no-store');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  return res.status(status).json(body);
}

function generic503(res) {
  return sendJson(res, 503, { error: 'الخدمة غير متاحة مؤقتًا.' });
}

function getAllowedOrigins(env) {
  const raw = `${env.OSHOP_ADMIN_ALLOWED_ORIGINS || DEFAULT_ORIGIN},https://kb-online-store.vercel.app`;
  return new Set(raw.split(',').map((value) => {
    try { return new URL(value.trim()).origin; } catch { return ''; }
  }).filter(Boolean));
}

function isAllowedOrigin(req, env) {
  const origin = req.headers?.origin;
  if (typeof origin !== 'string') return false;
  try { return getAllowedOrigins(env).has(new URL(origin).origin); } catch { return false; }
}

function safeEqual(left, right) {
  const a = crypto.createHash('sha256').update(String(left)).digest();
  const b = crypto.createHash('sha256').update(String(right)).digest();
  return crypto.timingSafeEqual(a, b);
}

function isConfigured(env) {
  return typeof env.OSHOP_ADMIN_PASSWORD === 'string' && env.OSHOP_ADMIN_PASSWORD.length >= MIN_ADMIN_PASSWORD_LENGTH;
}

function createSessionCookie(password, nowMs = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ v: 1, exp: Math.floor(nowMs / 1000) + SESSION_TTL_SECONDS })).toString('base64url');
  const signature = crypto.createHmac('sha256', password).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifySessionCookie(value, password, nowMs = Date.now()) {
  if (typeof value !== 'string' || !isConfigured({ OSHOP_ADMIN_PASSWORD: password })) return false;
  const parts = value.split('.');
  if (parts.length !== 2) return false;
  const expected = crypto.createHmac('sha256', password).update(parts[0]).digest('base64url');
  if (!safeEqual(parts[1], expected)) return false;
  try {
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    return payload?.v === 1 && Number.isSafeInteger(payload.exp) && payload.exp > Math.floor(nowMs / 1000);
  } catch { return false; }
}

function parseCookieHeader(header, name) {
  if (typeof header !== 'string') return '';
  for (const item of header.split(';')) {
    const separator = item.indexOf('=');
    if (separator >= 0 && item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim();
  }
  return '';
}

function getClientKey(req) {
  // Express's req.ip is trusted after the app's proxy configuration. Never use a
  // client-supplied forwarding header when req.ip is present.
  const value = req.ip || req.socket?.remoteAddress || 'unknown';
  return String(value || 'unknown').replace(/[^a-zA-Z0-9:._-]/g, '').slice(0, 80) || 'unknown';
}

function hashBucketKey(env, value) {
  const key = [env.OSHOP_RATE_LIMIT_KEY, env.KV_REST_API_TOKEN, env.UPSTASH_REDIS_REST_TOKEN, env.VERCEL_OIDC_TOKEN, env.OSHOP_ADMIN_PASSWORD]
    .find((candidate) => typeof candidate === 'string' && candidate.length >= 32);
  if (!key) throw new Error('secure rate-limit key unavailable');
  return crypto.createHmac('sha256', key).update(String(value)).digest('hex');
}

function getSharedStore(options, env) {
  if (options && options.sharedStore) return options.sharedStore;
  try {
    return require('./shared-store.cjs').createSharedStore({ env });
  } catch { return null; }
}

async function storeIsConfigured(store) {
  return !!store && (await Promise.resolve(store.isConfigured())) === true;
}

async function consume(store, bucket, max, windowMs) {
  if (!store || typeof store.consumeRateLimit !== 'function') throw new Error('shared store unavailable');
  const result = await store.consumeRateLimit(bucket, max, windowMs);
  if (!result || typeof result.allowed !== 'boolean' || !Number.isFinite(Number(result.remaining)) || !Number.isFinite(Number(result.retryAfterSeconds))) throw new Error('invalid shared store response');
  return result;
}

function createDownloadCapability(nowMs = Date.now()) {
  const token = crypto.randomBytes(32).toString('base64url');
  return { token, tokenHash: crypto.createHash('sha256').update(token).digest('hex'), expiresAt: nowMs + DOWNLOAD_TTL_MS };
}

function verifyDownloadCapability(token, storedHash, expiresAt, nowMs = Date.now()) {
  if (typeof token !== 'string' || token.length < 40 || token.length > 128) return false;
  if (typeof storedHash !== 'string' || !/^[a-f0-9]{64}$/i.test(storedHash)) return false;
  if (!Number.isFinite(Number(expiresAt)) || Number(expiresAt) <= nowMs) return false;
  const digest = crypto.createHash('sha256').update(token).digest('hex');
  return safeEqual(digest.toLowerCase(), storedHash.toLowerCase());
}

function asyncHandler(fn) {
  return function wrappedAsyncHandler(req, res, next) {
    return Promise.resolve().then(() => fn(req, res, next)).catch((error) => {
      if (res.headersSent) return typeof next === 'function' ? next(error) : undefined;
      return generic503(res);
    });
  };
}

function makeLogoutHandler({ env = process.env } = {}) {
  return asyncHandler(async (req, res) => {
    if (!isAllowedOrigin(req, env)) return sendJson(res, 403, { error: 'طلب غير مسموح.' });
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
    return sendJson(res, 200, { ok: true });
  });
}

function makeLoginHandler({ env = process.env, now = Date.now, sharedStore } = {}) {
  return asyncHandler(async (req, res) => {
    if (!isConfigured(env)) return generic503(res);
    if (!isAllowedOrigin(req, env)) return sendJson(res, 403, { error: 'طلب تسجيل الدخول غير مسموح.' });
    const store = getSharedStore({ sharedStore }, env);
    if (!await storeIsConfigured(store)) return generic503(res);
    const timestamp = now();
    const bucket = `login:${hashBucketKey(env, getClientKey(req))}`;
    let limit;
    try { limit = await consume(store, bucket, LOGIN_MAX_FAILURES, LOGIN_WINDOW_MS); } catch { return generic503(res); }
    if (!limit.allowed) return sendJson(res, 429, { error: 'محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.' }, { 'Retry-After': String(Math.max(1, Math.ceil(limit.retryAfterSeconds))) });

    const submitted = typeof req.body?.password === 'string' ? req.body.password : '';
    if (submitted.length > 512 || !safeEqual(submitted, env.OSHOP_ADMIN_PASSWORD)) return sendJson(res, 401, { error: 'كلمة المرور غير صحيحة.' });
    const cookie = createSessionCookie(env.OSHOP_ADMIN_PASSWORD, timestamp);
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${cookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`);
    return sendJson(res, 200, { ok: true });
  });
}

function normalizedPath(req) {
  let path = String(req.path || '');
  try { path = decodeURIComponent(path); } catch { return '/'; }
  return path.replace(/\/{2,}/g, '/').replace(/\/+$/g, '').toLowerCase() || '/';
}

function isAdminRoute(req) {
  const path = normalizedPath(req);
  return path === '/api/staff' || path.startsWith('/api/staff/') || (req.method === 'PUT' && path === '/api/settings') || path.startsWith('/api/requests/');
}

function isExportRoute(req) { return req.method === 'GET' && /^\/api\/requests\/(\d+)\/excel$/.test(normalizedPath(req)); }

function createAdminMiddleware({ env = process.env, now = Date.now, getRequestById = () => null } = {}) {
  return asyncHandler(async (req, res, next) => {
    if (!isAdminRoute(req)) return next();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    const configured = isConfigured(env);
    const cookie = parseCookieHeader(req.headers?.cookie, COOKIE_NAME);
    if (configured && verifySessionCookie(cookie, env.OSHOP_ADMIN_PASSWORD, now())) {
      if (req.method !== 'GET' && !isAllowedOrigin(req, env)) return sendJson(res, 403, { error: 'مصدر الطلب غير مسموح.' });
      return next();
    }
    if (isExportRoute(req)) {
      const match = /^\/api\/requests\/(\d+)\/excel$/.exec(normalizedPath(req));
      const token = typeof req.query?.token === 'string' ? req.query.token : '';
      if (/^[A-Za-z0-9_-]{43}$/.test(token) && Number.isSafeInteger(Number(match[1]))) {
        let record;
        try { record = await getRequestById(Number(match[1])); } catch { return generic503(res); }
        if (record && verifyDownloadCapability(token, record.downloadTokenHash, record.downloadTokenExpiresAt, now())) {
          req.oshopRequestRecord = record;
          return next();
        }
      }
    }
    if (!configured) {
      res.setHeader('X-Oshop-Admin-Auth', 'configuration-required');
      return generic503(res);
    }
    res.setHeader('X-Oshop-Admin-Auth', 'required');
    if (req.method === 'GET' && normalizedPath(req) === '/api/staff/kb-badge-admin') {
      res.setHeader('Location', '/admin-login.html?next=%2Fkb-badge-admin');
      return res.status(302).end();
    }
    return sendJson(res, 401, { error: 'يلزم تسجيل الدخول للوحة الموظفين.' });
  });
}

function createRateLimitMiddleware({ env = process.env, sharedStore, now = Date.now } = {}) {
  const limits = new Map([
    ['POST /api/chat', [20, 200]], ['POST /api/transcribe', [8, 80]], ['POST /api/tts', [20, 200]], ['POST /api/client-log', [60, 600]],
  ]);
  return asyncHandler(async (req, res, next) => {
    const path = normalizedPath(req);
    const pair = limits.get(`${req.method} ${path}`);
    let group = path;
    let rule = pair && { perIp: pair[0], global: pair[1] };
    if (!rule && req.method === 'GET' && path === '/api/kb/badge-display') rule = { perIp: 120, global: 1200 };
    if (!rule && req.method === 'GET' && path === '/api/settings') rule = { perIp: 120, global: 1200 };
    if (!rule && req.method === 'GET' && path === '/api/fx') rule = { perIp: 120, global: 1200 };
    if (!rule && req.method === 'GET' && path.startsWith('/api/track/')) { rule = { perIp: 60, global: 600 }; group = '/api/track/:code'; }
    if (!rule && isExportRoute(req)) { rule = { perIp: 60, global: 600 }; group = '/api/requests/:id/excel'; }
    if (!rule) return next();
    const store = getSharedStore({ sharedStore }, env);
    if (!await storeIsConfigured(store)) return generic503(res);
    const suffix = `${req.method}:${group}`;
    try {
      const ipKey = `rate:ip:${hashBucketKey(env, getClientKey(req))}:${suffix}`;
      const ipLimit = await consume(store, ipKey, rule.perIp, 60_000);
      if (!ipLimit.allowed) return sendJson(res, 429, { error: 'وصلت للحد المؤقت من الطلبات. حاول بعد قليل.' }, { 'Retry-After': String(Math.max(1, Math.ceil(ipLimit.retryAfterSeconds))) });
      const global = await consume(store, `rate:global:${hashBucketKey(env, suffix)}`, rule.global, 60_000);
      if (!global.allowed) return sendJson(res, 429, { error: 'وصلت للحد المؤقت من الطلبات. حاول بعد قليل.' }, { 'Retry-After': String(Math.max(1, Math.ceil(global.retryAfterSeconds))) });
    } catch { return generic503(res); }
    return next();
  });
}

function cleanLogValue(value, maxLength) { return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, maxLength); }

function createInputGuard() {
  return (req, res, next) => {
    const path = normalizedPath(req);
    if (req.method === 'POST' && path === '/api/chat') {
      const messages = req.body?.messages;
      if (!Array.isArray(messages) || messages.length < 1 || messages.length > 20) return res.status(400).json({ error: 'صيغة الرسائل غير صالحة.' });
      let totalText = 0;
      for (const item of messages) {
        if (!item || typeof item !== 'object' || !['user', 'assistant'].includes(item.role)) return res.status(400).json({ error: 'صيغة الرسالة غير صالحة.' });
        if (item.text !== undefined && (typeof item.text !== 'string' || item.text.length > 6000)) return res.status(413).json({ error: 'الرسالة أطول من الحد المسموح.' });
        totalText += typeof item.text === 'string' ? item.text.length : 0;
        if (item.image !== undefined) {
          const image = item.image;
          if (!image || typeof image !== 'object' || !/^image\/(png|jpeg|webp|gif)$/.test(String(image.mediaType || '')) || typeof image.data !== 'string' || image.data.length > 5_600_000) return res.status(413).json({ error: 'الصورة غير صالحة أو أكبر من الحد المسموح.' });
        }
      }
      if (totalText > 30_000) return res.status(413).json({ error: 'إجمالي نص المحادثة أكبر من الحد المسموح.' });
    }
    if (req.method === 'POST' && path === '/api/tts') {
      if (typeof req.body?.text !== 'string' || !req.body.text.trim()) return res.status(400).json({ error: 'النص مطلوب.' });
      if (req.body.text.length > 3000) return res.status(413).json({ error: 'النص أطول من الحد المسموح.' });
    }
    if (req.method === 'POST' && path === '/api/transcribe') {
      const contentType = String(req.headers?.['content-type'] || '').toLowerCase();
      const contentLength = Number(req.headers?.['content-length'] || 0);
      if (contentLength > 12 * 1024 * 1024) return res.status(413).json({ error: 'حجم التسجيل أكبر من الحد المسموح.' });
      if (!contentType.includes('application/json') && !/^audio\//.test(contentType)) return res.status(415).json({ error: 'نوع التسجيل غير مدعوم.' });
      if (contentType.includes('application/json') && typeof req.body?.data !== 'string') return res.status(400).json({ error: 'بيانات التسجيل غير صالحة.' });
    }
    if (req.method === 'POST' && path === '/api/client-log') {
      if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return res.status(400).json({ error: 'بيانات السجل غير صالحة.' });
      req.body.where = cleanLogValue(req.body.where, 100); req.body.message = cleanLogValue(req.body.message, 300);
    }
    return next();
  };
}

function installAdminSecurity(app, options = {}) {
  if (typeof app.set === 'function') app.set('trust proxy', 1);
  app.post('/api/admin/login', makeLoginHandler(options));
  app.post('/api/admin/logout', makeLogoutHandler(options));
  app.use(createInputGuard());
  app.use(createRateLimitMiddleware(options));
  app.use(createAdminMiddleware(options));
}

module.exports = { COOKIE_NAME, DEFAULT_ORIGIN, DOWNLOAD_TTL_MS, createAdminMiddleware, createDownloadCapability, createInputGuard, createRateLimitMiddleware, createSessionCookie, installAdminSecurity, isAllowedOrigin, makeLoginHandler, makeLogoutHandler, verifyDownloadCapability, verifySessionCookie, asyncHandler };
