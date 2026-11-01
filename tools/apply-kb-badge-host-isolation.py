#!/usr/bin/env python3
"""Exact-host KB badge administration. Admin assets are server-only, never static."""
from __future__ import annotations
import json
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'vercel-output'
STATIC = OUT / 'static'
FUNCTION = OUT / 'functions/api.func'
SECURITY = FUNCTION / 'admin-security.cjs'
ADMIN_HOST = 'kb-badge-admin.vercel.app'
PUBLIC_HOST = 'kb-online-store.vercel.app'
ASSETS = {
    'admin-login.html': 'admin-login-html.cjs',
    'admin-login.js': 'admin-login-js.cjs',
    'kb-badge-admin-login.html': 'kb-badge-admin-login-html.cjs',
    'kb-badge-admin-login.js': 'kb-badge-admin-login-js.cjs',
    'kb-badge-admin.js': 'kb-badge-admin-js.cjs',
}


def once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if text.count(old) != 1:
        raise SystemExit(f'Expected one {label} insertion point, found {text.count(old)}')
    return text.replace(old, new, 1)


def prepare() -> None:
    # Rehydrate build-only inputs for existing branding/badge patches. They are
    # removed from static again before any verification or deployment occurs.
    for name, module in ASSETS.items():
        path = FUNCTION / module
        if path.exists():
            content = json.loads(path.read_text().partition('module.exports = ')[2].rstrip(';\n'))
            (STATIC / name).write_text(content)


def patch_security() -> None:
    text = SECURITY.read_text()
    start = text.find('// KB_BADGE_HOST_ISOLATION_V1:')
    if start >= 0:
        end = text.index('function isAllowedOrigin(req, env) {', start)
        text = text[:start] + text[end:]
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
  const allowed = new Set(['/kb-badge-admin', '/api/staff/kb-badge-admin', '/api/staff/kb-badge-copy', '/api/kb-badge-admin/login', '/api/kb-badge-admin/logout', '/kb-badge-admin-login.html', '/kb-badge-admin-login.js', '/kb-badge-admin.js', '/api/kb-badge-admin/assets/login-html', '/api/kb-badge-admin/assets/login-js', '/api/kb-badge-admin/assets/panel-js']);
  const legacy = new Set(['/admin-login.html', '/admin-login.js', '/api/legacy-admin/login-page', '/api/legacy-admin/login-script']);
  return (req, res, next) => {
    const path = normalizedPath(req);
    const adminHost = isBadgeAdminHost(req);
    if (isBadgeAdminPath(req) && !adminHost) return badgeNotFound(res);
    if (badgeRequestHost(req) === KB_PUBLIC_HOST && (legacy.has(path) || /^\\/api\\/admin(?:\\/.*)?$/.test(path))) return badgeNotFound(res);
    if (!adminHost) return next();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    if (!allowed.has(path)) return badgeNotFound(res);
    if (!['GET', 'HEAD'].includes(req.method) && !isAllowedBadgeOrigin(req)) return sendJson(res, 403, { error: 'طلب غير مسموح.' });
    return next();
  };
}
function installBadgeAssetRoutes(app) {
  const assets = [
    [['/kb-badge-admin-login.html', '/api/kb-badge-admin/assets/login-html'], './kb-badge-admin-login-html.cjs', 'text/html; charset=utf-8'],
    [['/kb-badge-admin-login.js', '/api/kb-badge-admin/assets/login-js'], './kb-badge-admin-login-js.cjs', 'application/javascript; charset=utf-8'],
    [['/kb-badge-admin.js', '/api/kb-badge-admin/assets/panel-js'], './kb-badge-admin-js.cjs', 'application/javascript; charset=utf-8'],
    [['/admin-login.html', '/api/legacy-admin/login-page'], './admin-login-html.cjs', 'text/html; charset=utf-8'],
    [['/admin-login.js', '/api/legacy-admin/login-script'], './admin-login-js.cjs', 'application/javascript; charset=utf-8'],
  ];
  for (const [paths, module, contentType] of assets) for (const path of paths) app.get(path, (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.setHeader('Content-Type', contentType);
    return res.status(200).send(require(module));
  });
}
"""
    text = once(text, 'function isAllowedOrigin(req, env) {', helper + '\nfunction isAllowedOrigin(req, env) {', 'host guard helpers')
    text = once(text, "  return asyncHandler(async (req, res, next) => {\n    if (!isAdminRoute(req)) return next();", "  return asyncHandler(async (req, res, next) => {\n    if (isBadgeAdminPath(req) && !isBadgeAdminHost(req)) return badgeNotFound(res);\n    if (!isAdminRoute(req)) return next();", 'defense before session checks')
    text = once(text, "if (req.method !== 'GET' && !isAllowedOrigin(req, env))", "if (req.method !== 'GET' && !(isBadgeAdminPath(req) ? isAllowedBadgeOrigin(req) : isAllowedOrigin(req, env)))", 'strict badge write origin')
    text = text.replace("res.setHeader('Location', '/admin-login.html?next=%2Fkb-badge-admin');", "res.setHeader('Location', '/kb-badge-admin-login.html?next=%2Fkb-badge-admin');")
    for line in ["  app.use(createBadgeHostMiddleware());\n", "  installBadgeAssetRoutes(app);\n", "  const badgeOptions = { ...options, env: { ...(options.env || process.env), OSHOP_ADMIN_ALLOWED_ORIGINS: KB_BADGE_ADMIN_ORIGIN } };\n", "  app.post('/api/kb-badge-admin/login', makeLoginHandler(badgeOptions));\n", "  app.post('/api/kb-badge-admin/logout', makeLogoutHandler(badgeOptions));\n"]:
        text = text.replace(line, '')
    text = once(text, "  app.post('/api/admin/login', makeLoginHandler(options));", """  app.use(createBadgeHostMiddleware());
  installBadgeAssetRoutes(app);
  const badgeOptions = { ...options, env: { ...(options.env || process.env), OSHOP_ADMIN_ALLOWED_ORIGINS: KB_BADGE_ADMIN_ORIGIN } };
  app.post('/api/kb-badge-admin/login', makeLoginHandler(badgeOptions));
  app.post('/api/kb-badge-admin/logout', makeLogoutHandler(badgeOptions));
  app.post('/api/admin/login', makeLoginHandler(options));""", 'host middleware before asset and auth handlers')
    text = once(text, 'module.exports = { COOKIE_NAME,', 'module.exports = { KB_BADGE_ADMIN_HOST, KB_BADGE_ADMIN_ORIGIN, createBadgeHostMiddleware, isAllowedBadgeOrigin, COOKIE_NAME,', 'host guard test exports')
    SECURITY.write_text(text)


def patch_assets() -> None:
    html = (STATIC / 'admin-login.html').read_text().replace('دخول الموظفين', 'دخول إدارة شارة KB').replace('./admin-login.js', './kb-badge-admin-login.js')
    (STATIC / 'kb-badge-admin-login.html').write_text(html)
    js = (STATIC / 'admin-login.js').read_text().replace("'/api/admin/login'", "'/api/kb-badge-admin/login'")
    js = js.replace("requested === '/kb-badge-admin' ? requested : '/#/staff'", "'/kb-badge-admin'")
    (STATIC / 'kb-badge-admin-login.js').write_text(js)
    badge = (STATIC / 'kb-badge-admin.js').read_text().replace("'/api/admin/logout'", "'/api/kb-badge-admin/logout'")
    badge = badge.replace("'/admin-login.html?next=%2Fkb-badge-admin'", "'/kb-badge-admin-login.html?next=%2Fkb-badge-admin'").replace("'/admin-login.html'", "'/kb-badge-admin-login.html?next=%2Fkb-badge-admin'")
    (STATIC / 'kb-badge-admin.js').write_text(badge)
    for name, module in ASSETS.items():
        content = (STATIC / name).read_text()
        (FUNCTION / module).write_text("'use strict';\nmodule.exports = " + json.dumps(content, ensure_ascii=False) + ';\n')
        (STATIC / name).unlink()
    (STATIC / 'kb-badge-admin-robots.txt').unlink(missing_ok=True)
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


def patch_routes() -> None:
    path = OUT / 'config.json'
    cfg = json.loads(path.read_text())
    remaining = [r for r in cfg.get('routes', []) if not any(s in json.dumps(r) for s in ['kb-badge-admin', 'staff/kb-badge-copy', 'legacy-admin']) and not ('admin-login' in json.dumps(r) and PUBLIC_HOST in json.dumps(r))]
    host = [{'type': 'host', 'value': {'eq': ADMIN_HOST}}]
    primary = [{'type': 'host', 'value': {'eq': PUBLIC_HOST}}]
    headers = {'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive'}
    assets = [('/kb-badge-admin-login.html', '/api/kb-badge-admin/assets/login-html'), ('/kb-badge-admin-login.js', '/api/kb-badge-admin/assets/login-js'), ('/kb-badge-admin.js', '/api/kb-badge-admin/assets/panel-js'), ('/admin-login.html', '/api/legacy-admin/login-page'), ('/admin-login.js', '/api/legacy-admin/login-script')]
    routes = [
        {'src': '^/(?:kb-badge-admin[^/]*(?:/.*)?|api/(?:kb-badge-admin(?:/.*)?|staff/kb-badge-(?:admin|copy)(?:/.*)?))$', 'caseSensitive': False, 'missing': host, 'status': 404, 'headers': headers},
        {'src': '^/(?:admin-login(?:\\.html|\\.js)?(?:/.*)?|api/admin(?:/.*)?|api/legacy-admin(?:/.*)?)$', 'caseSensitive': False, 'has': primary, 'status': 404, 'headers': headers},
        {'src': '^/(.*)$', 'has': host, 'headers': headers, 'continue': True},
        {'src': '^/$', 'has': host, 'status': 302, 'headers': {'Location': '/kb-badge-admin', **headers}},
        {'src': '^/kb-badge-admin/?$', 'caseSensitive': False, 'has': host, 'dest': '/api/staff/kb-badge-admin', 'check': True, 'headers': headers},
    ]
    for source, dest in assets:
        routes.append({'src': '^' + source.replace('.', '\\.') + '$', 'caseSensitive': False, 'dest': dest, 'check': True, 'headers': headers})
    routes.append({'src': '^/(?!(?:kb-badge-admin/?|kb-badge-admin-login\\.html|kb-badge-admin-login\\.js|kb-badge-admin\\.js|api/(?:staff/kb-badge-(?:admin|copy)/?|kb-badge-admin/(?:login|logout)/?|kb-badge-admin/assets/(?:login-html|login-js|panel-js)))$).*$', 'caseSensitive': False, 'has': host, 'status': 404, 'headers': headers})
    idx = next((i for i, r in enumerate(remaining) if r.get('src') == '^/api(/.*)?$' or r.get('handle')), len(remaining))
    cfg['routes'] = remaining[:idx] + routes + remaining[idx:]
    path.write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + '\n')
    path = ROOT / 'vercel.json'
    vercel = json.loads(path.read_text())
    for rewrite in vercel.get('rewrites', []):
        if rewrite.get('source') == '/kb-badge-admin': rewrite['has'] = host
    rewrites = vercel.setdefault('rewrites', [])
    for source, dest in assets:
        entry = next((r for r in rewrites if r.get('source') == source), None)
        if entry is None: rewrites.append({'source': source, 'destination': dest})
        else: entry.update({'destination': dest})
    path.write_text(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')


def main() -> None:
    if '--prepare' in sys.argv:
        prepare()
        return
    patch_security()
    patch_assets()
    patch_routes()
    print('KB badge host isolation applied; all administration assets are server-only.')


if __name__ == '__main__':
    main()
