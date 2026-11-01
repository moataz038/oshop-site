#!/usr/bin/env python3
"""Isolate the KB badge editor by exact production hostname, without data changes."""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'vercel-output'
STATIC = OUT / 'static'
SECURITY = OUT / 'functions/api.func/admin-security.cjs'
ADMIN_HOST = 'kb-badge-admin.vercel.app'
PUBLIC_HOST = 'kb-online-store.vercel.app'


def once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if text.count(old) != 1:
        raise SystemExit(f'Expected one {label} insertion point, found {text.count(old)}')
    return text.replace(old, new, 1)


def patch_security() -> None:
    text = SECURITY.read_text()
    helper = """// KB_BADGE_HOST_ISOLATION_V1: no forwarded host is trusted.
const KB_BADGE_ADMIN_HOST = 'kb-badge-admin.vercel.app';
const KB_BADGE_ADMIN_ORIGIN = 'https://kb-badge-admin.vercel.app';
const KB_PUBLIC_HOST = 'kb-online-store.vercel.app';
function badgeRequestHost(req) {
  const raw = req.headers?.host;
  return typeof raw === 'string' && raw === raw.trim() ? raw.toLowerCase() : '';
}
function isBadgeAdminHost(req) { return badgeRequestHost(req) === KB_BADGE_ADMIN_HOST; }
function isBadgeAdminPath(req) {
  const path = normalizedPath(req);
  return /^\\/kb-badge-admin(?:[^/]*)(?:\\/.*)?$/.test(path) ||
    /^\\/api\\/kb-badge-admin(?:\\/.*)?$/.test(path) ||
    /^\\/api\\/staff\\/kb-badge-(?:admin|copy)(?:\\/.*)?$/.test(path);
}
function isAllowedBadgeOrigin(req) { return req.headers?.origin === KB_BADGE_ADMIN_ORIGIN; }
function badgeNotFound(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return res.status(404).end();
}
function createBadgeHostMiddleware() {
  const allowed = new Set(['/kb-badge-admin', '/api/staff/kb-badge-admin', '/api/staff/kb-badge-copy', '/api/kb-badge-admin/login', '/api/kb-badge-admin/logout']);
  return (req, res, next) => {
    const path = normalizedPath(req);
    const adminHost = isBadgeAdminHost(req);
    if (isBadgeAdminPath(req) && !adminHost) return badgeNotFound(res);
    if (badgeRequestHost(req) === KB_PUBLIC_HOST && /^\\/api\\/admin(?:\\/.*)?$/.test(path)) return badgeNotFound(res);
    if (!adminHost) return next();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    if (!allowed.has(path)) return badgeNotFound(res);
    if (!['GET', 'HEAD'].includes(req.method) && !isAllowedBadgeOrigin(req)) return sendJson(res, 403, { error: 'طلب غير مسموح.' });
    return next();
  };
}
"""
    text = once(text, 'function isAllowedOrigin(req, env) {', helper + '\nfunction isAllowedOrigin(req, env) {', 'host guard helpers')
    text = once(text, "  return asyncHandler(async (req, res, next) => {\n    if (!isAdminRoute(req)) return next();", "  return asyncHandler(async (req, res, next) => {\n    if (isBadgeAdminPath(req) && !isBadgeAdminHost(req)) return badgeNotFound(res);\n    if (!isAdminRoute(req)) return next();", 'defense before session checks')
    text = once(text, "if (req.method !== 'GET' && !isAllowedOrigin(req, env))", "if (req.method !== 'GET' && !(isBadgeAdminPath(req) ? isAllowedBadgeOrigin(req) : isAllowedOrigin(req, env)))", 'strict badge write origin')
    text = text.replace("res.setHeader('Location', '/admin-login.html?next=%2Fkb-badge-admin');", "res.setHeader('Location', '/kb-badge-admin-login.html?next=%2Fkb-badge-admin');")
    text = once(text, "  app.post('/api/admin/login', makeLoginHandler(options));", """  app.use(createBadgeHostMiddleware());
  const badgeOptions = { ...options, env: { ...(options.env || process.env), OSHOP_ADMIN_ALLOWED_ORIGINS: KB_BADGE_ADMIN_ORIGIN } };
  app.post('/api/kb-badge-admin/login', makeLoginHandler(badgeOptions));
  app.post('/api/kb-badge-admin/logout', makeLogoutHandler(badgeOptions));
  app.post('/api/admin/login', makeLoginHandler(options));""", 'host middleware before login handlers')
    text = once(text, 'module.exports = { COOKIE_NAME,', 'module.exports = { KB_BADGE_ADMIN_HOST, KB_BADGE_ADMIN_ORIGIN, createBadgeHostMiddleware, isAllowedBadgeOrigin, COOKIE_NAME,', 'host guard test exports')
    SECURITY.write_text(text)


def patch_assets() -> None:
    html = (STATIC / 'admin-login.html').read_text()
    html = html.replace('دخول الموظفين', 'دخول إدارة شارة KB').replace('./admin-login.js', './kb-badge-admin-login.js')
    (STATIC / 'kb-badge-admin-login.html').write_text(html)
    js = (STATIC / 'admin-login.js').read_text().replace("'/api/admin/login'", "'/api/kb-badge-admin/login'")
    js = js.replace("requested === '/kb-badge-admin' ? requested : '/#/staff'", "'/kb-badge-admin'")
    (STATIC / 'kb-badge-admin-login.js').write_text(js)
    badge = (STATIC / 'kb-badge-admin.js').read_text()
    badge = badge.replace("'/api/admin/logout'", "'/api/kb-badge-admin/logout'")
    badge = badge.replace("'/admin-login.html?next=%2Fkb-badge-admin'", "'/kb-badge-admin-login.html?next=%2Fkb-badge-admin'")
    badge = badge.replace("'/admin-login.html'", "'/kb-badge-admin-login.html?next=%2Fkb-badge-admin'")
    (STATIC / 'kb-badge-admin.js').write_text(badge)
    (STATIC / 'admin-auth-redirect.js').write_text("""(() => {
  const publicStore = window.location.hostname === 'kb-online-store.vercel.app';
  if (publicStore) {
    const hideStaffRoute = () => {
      let hash;
      try { hash = decodeURIComponent(window.location.hash); } catch { hash = ''; }
      while (hash.includes('//')) hash = hash.replace('//', '/');
      if (/^#\\/staff(?:[/?]|$)/i.test(hash)) window.history.replaceState(null, '', '/');
    };
    hideStaffRoute();
    window.addEventListener('hashchange', hideStaffRoute);
  }
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    if (!publicStore && response.status === 401 && response.headers.get('X-Oshop-Admin-Auth') === 'required' && window.location.pathname !== '/admin-login.html') window.location.replace('/admin-login.html');
    return response;
  };
})();
""")
    (STATIC / 'robots.txt').write_text('User-agent: *\nDisallow: /api/\n')
    (STATIC / 'kb-badge-admin-robots.txt').write_text('User-agent: *\nDisallow: /\n')


def patch_routes() -> None:
    path = OUT / 'config.json'
    cfg = json.loads(path.read_text())
    # Keep unrelated routes; replace all generated isolation/old badge routes deterministically.
    remaining = []
    for route in cfg.get('routes', []):
        serialized = json.dumps(route)
        if 'kb-badge-admin' in serialized or 'staff/kb-badge-copy' in serialized or ('admin-login' in serialized and PUBLIC_HOST in serialized):
            continue
        remaining.append(route)
    host = [{'type': 'host', 'value': {'eq': ADMIN_HOST}}]
    primary = [{'type': 'host', 'value': {'eq': PUBLIC_HOST}}]
    private_headers = {'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive'}
    routes = [
        {'src': '^/(?:kb-badge-admin[^/]*(?:/.*)?|api/(?:kb-badge-admin(?:/.*)?|staff/kb-badge-(?:admin|copy)(?:/.*)?))$', 'caseSensitive': False, 'missing': host, 'status': 404, 'headers': private_headers},
        {'src': '^/(?:admin-login(?:\\.html|\\.js)?(?:/.*)?|api/admin(?:/.*)?)$', 'caseSensitive': False, 'has': primary, 'status': 404, 'headers': private_headers},
        {'src': '^/(.*)$', 'has': host, 'headers': private_headers, 'continue': True},
        {'src': '^/$', 'has': host, 'status': 302, 'headers': {'Location': '/kb-badge-admin', **private_headers}},
        {'src': '^/kb-badge-admin/?$', 'caseSensitive': False, 'has': host, 'dest': '/api/staff/kb-badge-admin', 'check': True, 'headers': private_headers},
        {'src': '^/robots\\.txt$', 'has': host, 'dest': '/kb-badge-admin-robots.txt', 'check': True},
        {'src': '^/(?!(?:kb-badge-admin/?|kb-badge-admin-login\\.html|kb-badge-admin-login\\.js|kb-badge-admin\\.js|kb-badge-admin-robots\\.txt|api/(?:staff/kb-badge-(?:admin|copy)/?|kb-badge-admin/(?:login|logout)/?))$).*$', 'caseSensitive': False, 'has': host, 'status': 404, 'headers': private_headers},
    ]
    # Security headers may continue safely, but every gate precedes API/filesystem handling.
    idx = next((i for i, item in enumerate(remaining) if item.get('src') == '^/api(/.*)?$' or item.get('handle')), len(remaining))
    cfg['routes'] = remaining[:idx] + routes + remaining[idx:]
    path.write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + '\n')
    path = ROOT / 'vercel.json'
    vercel = json.loads(path.read_text())
    for rewrite in vercel.get('rewrites', []):
        if rewrite.get('source') == '/kb-badge-admin':
            rewrite['has'] = host
    path.write_text(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')


def main() -> None:
    patch_security()
    patch_assets()
    patch_routes()
    print('KB badge host isolation applied; public storefront and phrase data unchanged.')


if __name__ == '__main__':
    main()
