#!/usr/bin/env python3
"""Install the standalone, server-authenticated KB badge-copy editor."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULTS = [
    "مرحبًا بك",
    "مرحبًا بك",
    "مرحبًا بك",
    "مرحبًا بك",
    "مرحبًا بك",
]


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected one {label} insertion point, found {count}")
    return text.replace(old, new, 1)


def patch_store() -> None:
    path = ROOT / "vercel-output/functions/api.func/shared-store.cjs"
    text = path.read_text()
    text = replace_once(
        text,
        "function validEndpoint(value) {",
        '''function normalizeKbBadgeCopy(items) {
  if (!Array.isArray(items) || items.length !== 5 || items.some((item) => typeof item !== "string" || item.length > 80)) {
    throw new SharedStoreError("invalid badge copy", "INVALID_INPUT");
  }
  const normalized = items.map((item) => item.replace(/[\\u0000-\\u001f\\u007f]/g, " ").trim());
  if (normalized.every((item) => !item)) throw new SharedStoreError("invalid badge copy", "INVALID_INPUT");
  return normalized;
}
function validEndpoint(value) {''',
        "badge-copy validator",
    )
    text = replace_once(
        text,
        '  const settingsKey = key("settings");',
        '  const settingsKey = key("settings");\n  const kbBadgeCopyKey = key("kb:badge-copy");',
        "badge-copy storage key",
    )
    text = replace_once(
        text,
        "    async getSettings(defaults = {}) {",
        '''    async getKbBadgeCopy(defaults = []) {
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
    async getSettings(defaults = {}) {''',
        "badge-copy storage methods",
    )
    path.write_text(text)


def patch_security() -> None:
    path = ROOT / "vercel-output/functions/api.func/admin-security.cjs"
    text = path.read_text()
    text = replace_once(
        text,
        "const raw = env.OSHOP_ADMIN_ALLOWED_ORIGINS || DEFAULT_ORIGIN;",
        "const raw = `${env.OSHOP_ADMIN_ALLOWED_ORIGINS || DEFAULT_ORIGIN},https://kb-online-store.vercel.app`;",
        "current KB origin allowlist",
    )
    text = replace_once(
        text,
        "    res.setHeader('Cache-Control', 'no-store');\n    const configured = isConfigured(env);",
        "    res.setHeader('Cache-Control', 'no-store');\n    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');\n    const configured = isConfigured(env);",
        "admin noindex response header",
    )
    text = replace_once(
        text,
        "  return path === '/api/staff' || path.startsWith('/api/staff/') || (req.method === 'PUT' && path === '/api/settings') || path.startsWith('/api/requests/');",
        "  return path === '/kb-badge-admin' || path === '/api/staff' || path.startsWith('/api/staff/') || (req.method === 'PUT' && path === '/api/settings') || path.startsWith('/api/requests/');",
        "standalone badge-admin page protection",
    )
    old_redirect = "    res.setHeader('X-Oshop-Admin-Auth', 'required');\n    if (req.method === 'GET' && normalizedPath(req) === '/api/staff/kb-badge-admin') {\n      res.setHeader('Location', '/admin-login.html?next=%2Fkb-badge-admin');\n      return res.status(302).end();\n    }\n    return sendJson(res, 401, { error: 'يلزم تسجيل الدخول للوحة الموظفين.' });"
    new_redirect = "    res.setHeader('X-Oshop-Admin-Auth', 'required');\n    if (req.method === 'GET' && ['/api/staff/kb-badge-admin', '/kb-badge-admin'].includes(normalizedPath(req))) {\n      res.setHeader('Location', '/admin-login.html?next=%2Fkb-badge-admin');\n      return res.status(302).end();\n    }\n    return sendJson(res, 401, { error: 'يلزم تسجيل الدخول للوحة الموظفين.' });"
    if new_redirect not in text and "'/kb-badge-admin-login.html?next=%2Fkb-badge-admin'" not in text:
        if old_redirect in text:
            text = text.replace(old_redirect, new_redirect, 1)
        else:
            text = replace_once(
                text,
                "    res.setHeader('X-Oshop-Admin-Auth', 'required');\n    return sendJson(res, 401, { error: 'يلزم تسجيل الدخول للوحة الموظفين.' });",
                new_redirect,
                "unauthenticated page redirect",
            )
    text = replace_once(
        text,
        "    if (!rule && req.method === 'GET' && path === '/api/settings') rule = { perIp: 120, global: 1200 };",
        "    if (!rule && req.method === 'GET' && path === '/api/kb/badge-display') rule = { perIp: 120, global: 1200 };\n    if (!rule && req.method === 'GET' && path === '/api/settings') rule = { perIp: 120, global: 1200 };",
        "public badge-display rate limit",
    )
    path.write_text(text)


def patch_api_bundle() -> None:
    path = ROOT / "vercel-output/functions/api.func/index.cjs"
    text = path.read_text()
    defaults = json.dumps(DEFAULTS, ensure_ascii=False, separators=(",", ":"))
    marker = "/*KB_BADGE_ADMIN_V1*/"
    if marker in text:
        declaration_start = text.rfind("var KB_BADGE_DEFAULTS=", 0, text.index(marker))
        if declaration_start < 0:
            raise SystemExit("Badge defaults marker exists without its declaration")
        text = text[:declaration_start] + f"var KB_BADGE_DEFAULTS={defaults};" + text[text.index(marker):]
    else:
        text = replace_once(
            text,
            'var __oshopStore=require("./shared-store.cjs").createSharedStore();async function Vs()',
            f'var __oshopStore=require("./shared-store.cjs").createSharedStore();var KB_BADGE_DEFAULTS={defaults};/*KB_BADGE_ADMIN_V1*/async function Vs()',
            "API badge-copy defaults",
        )
    route_code = '''e.get("/api/kb/badge-display",__oshopSecurity.asyncHandler(async(r,i)=>{i.setHeader("Cache-Control","no-store");i.setHeader("X-Robots-Tag","noindex, nofollow, noarchive");i.json({items:await __oshopStore.getKbBadgeCopy(KB_BADGE_DEFAULTS)})})),e.get("/api/staff/kb-badge-copy",__oshopSecurity.asyncHandler(async(r,i)=>{i.setHeader("Cache-Control","no-store");i.json({items:await __oshopStore.getKbBadgeCopy(KB_BADGE_DEFAULTS)})})),e.put("/api/staff/kb-badge-copy",__oshopSecurity.asyncHandler(async(r,i)=>{let n=r.body?.items;if(!Array.isArray(n)||n.length!==5||n.some(a=>typeof a!=="string"||a.length>80))return i.status(400).json({error:"صيغة العبارات غير صالحة."});let a=n.map(a=>a.replace(/[\\u0000-\\u001f\\u007f]/g," ").trim());if(a.every(a=>!a))return i.status(400).json({error:"أدخل عبارة واحدة على الأقل."});i.setHeader("Cache-Control","no-store");i.json({items:await __oshopStore.updateKbBadgeCopy(a)})})),e.get("/api/staff/kb-badge-admin",(r,i)=>{i.setHeader("Cache-Control","no-store");i.setHeader("X-Robots-Tag","noindex, nofollow, noarchive");i.type("html").send(require("./kb-badge-admin-page.cjs"))}),'''
    text = replace_once(text, 'e.get("/api/staff/overview"', route_code + 'e.get("/api/staff/overview"', "API badge-copy routes")
    path.write_text(text)


def patch_storefront() -> None:
    path = ROOT / "vercel-output/static/assets/index-6ttDirym.js"
    text = path.read_text()
    old = 'const OSF=["مرحبًا بك","شحن مجاني من شي إن","صفر عمولة على طلبك","البطاقة نفس سعر الكاش","توصيل لكل مدن ليبيا"];function OSO(){const[a,b]=N.useState(OSF),[i,x]=N.useState(0);return N.useEffect(()=>{let live=true;fetch("/api/kb/badge-display",{credentials:"same-origin",cache:"no-store"}).then(r=>r.ok?r.json():null).then(r=>{if(live&&Array.isArray(r?.items)&&r.items.length===OSF.length&&r.items.every(t=>typeof t==="string"))b(r.items)}).catch(()=>{});return()=>{live=false}},[]),N.useEffect(()=>{const t=setInterval(()=>x(v=>(v+1)%a.length),3200);return()=>clearInterval(t)},[a.length]),c.jsx(oe.span,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:Oe,children:a[i]},i)}'
    new = 'const OSF=["مرحبًا بك","مرحبًا بك","مرحبًا بك","مرحبًا بك","مرحبًا بك"];function OSO(){const[a,b]=N.useState(OSF),[i,x]=N.useState(0);return N.useEffect(()=>{let live=true;fetch("/api/kb/badge-display",{credentials:"same-origin",cache:"no-store"}).then(r=>r.ok?r.json():null).then(r=>{if(live&&Array.isArray(r?.items)&&r.items.length===OSF.length&&r.items.every(t=>typeof t==="string"))b(r.items)}).catch(()=>{});return()=>{live=false}},[]),N.useEffect(()=>{const t=setInterval(()=>x(v=>(v+1)%a.length),3200);return()=>clearInterval(t)},[a.length]),c.jsx(oe.span,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:Oe,children:a[i]},i)}'
    text = replace_once(text, old, new, "storefront badge rotation source")
    path.write_text(text)


def patch_login() -> None:
    path = ROOT / "vercel-output/static/admin-login.js"
    text = path.read_text()
    text = replace_once(
        text,
        "    window.location.replace('/#/staff');",
        "    const requested = new URLSearchParams(window.location.search).get('next');\n    window.location.replace(requested === '/kb-badge-admin' ? requested : '/#/staff');",
        "safe admin login return path",
    )
    path.write_text(text)
    html = ROOT / "vercel-output/static/admin-login.html"
    content = html.read_text()
    content = replace_once(
        content,
        '<meta charset="UTF-8" />',
        '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow, noarchive" />',
        "admin-login robots metadata",
    )
    html.write_text(content)


def patch_routes() -> None:
    path = ROOT / "vercel-output/config.json"
    config = json.loads(path.read_text())
    route = {
        "src": "^/kb-badge-admin/?$",
        "dest": "/api/staff/kb-badge-admin",
        "check": True,
        "headers": {
            "X-Robots-Tag": "noindex, nofollow, noarchive",
            "Cache-Control": "no-store",
        },
    }
    routes = config.setdefault("routes", [])
    existing_route = next((item for item in routes if item.get("src") == route["src"]), None)
    if existing_route is None:
        api_index = next((i for i, item in enumerate(routes) if item.get("src") == "^/api(/.*)?$"), len(routes))
        routes.insert(api_index, route)
    else:
        existing_route.update(route)
        existing_route.pop("continue", None)
    path.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n")

    path = ROOT / "vercel.json"
    vercel = json.loads(path.read_text())
    headers = vercel.setdefault("headers", [])
    for source in ("/kb-badge-admin", "/admin-login.html"):
        if not any(item.get("source") == source for item in headers):
            headers.append({
                "source": source,
                "headers": [
                    {"key": "X-Robots-Tag", "value": "noindex, nofollow, noarchive"},
                    {"key": "Cache-Control", "value": "no-store"},
                ],
            })
    rewrite = {"source": "/kb-badge-admin", "destination": "/api/staff/kb-badge-admin"}
    rewrites = vercel.setdefault("rewrites", [])
    existing_rewrite = next((item for item in rewrites if item.get("source") in {rewrite["source"], "^/kb-badge-admin/?$"}), None)
    if existing_rewrite is None:
        rewrites.insert(0, rewrite)
    else:
        existing_rewrite.clear()
        existing_rewrite.update(rewrite)
    path.write_text(json.dumps(vercel, ensure_ascii=False, indent=2) + "\n")


def patch_api_direct_admin_route() -> None:
    path = ROOT / "vercel-output/functions/api.func/index.cjs"
    text = path.read_text()
    route = 'e.get("/kb-badge-admin",(r,i)=>{i.setHeader("Cache-Control","no-store");i.setHeader("X-Robots-Tag","noindex, nofollow, noarchive");i.type("html").send(require("./kb-badge-admin-page.cjs"))}),'
    count = text.count(route)
    if count == 0:
        text = replace_once(text, 'e.get("/api/staff/overview"', route + 'e.get("/api/staff/overview"', "direct standalone badge-admin page route")
    elif count > 1:
        keep_until = text.find(route) + len(route)
        text = text[:keep_until] + text[keep_until:].replace(route, "", count - 1)
    path.write_text(text)


def main() -> None:
    patch_store()
    patch_security()
    patch_api_bundle()
    patch_api_direct_admin_route()
    patch_storefront()
    patch_login()
    patch_routes()
    print("KB badge administration patch applied.")


if __name__ == "__main__":
    main()
