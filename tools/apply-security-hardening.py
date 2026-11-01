#!/usr/bin/env python3
"""Apply reviewed, idempotent security changes to Oshop's Vercel output bundle."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = ROOT / "vercel-output/functions/api.func/index.cjs"
FRONTEND = ROOT / "vercel-output/static/assets/index-6ttDirym.js"
HTML = ROOT / "vercel-output/static/index.html"
OUTPUT_CONFIG = ROOT / "vercel-output/config.json"
VERCEL_CONFIG = ROOT / "vercel.json"


def replace_exact(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count == 1:
        return text.replace(old, new, 1)
    if count == 0 and new in text:
        return text
    if count == 0 and "/*OSHOP_SHARED_STORAGE_V1*/" in text and label in {
        "request-scoped Excel capability token creation",
        "removal of capability hashes from staff overview output",
    }:
        return text
    raise SystemExit(f"Expected one match for {label}; found {count}.")


def patch_api() -> None:
    if not API.is_file() or not (ROOT / "vercel-output/functions/api.func/admin-security.cjs").is_file():
        raise SystemExit("Missing API bundle or admin-security.cjs.")
    text = API.read_text(encoding="utf-8")
    text = replace_exact(
        text,
        "function E$(t){let e=X0.length+1;return X0.push({id:e,created_at:new Date().toISOString(),...t}),e}",
        "function E$(t){let e=X0.length+1,c=__oshopSecurity.createDownloadCapability(),r={id:e,created_at:new Date().toISOString(),...t,downloadTokenHash:c.tokenHash,downloadTokenExpiresAt:c.expiresAt};return X0.push(r),{id:e,downloadToken:c.token}}",
        "request-scoped Excel capability token creation",
    )
    text = replace_exact(
        text,
        "function zTe(t=50){return X0.slice().reverse().slice(0,t).map(({payload:e,...r})=>r)}",
        "function zTe(t=50){return X0.slice().reverse().slice(0,t).map(({payload:e,downloadTokenHash:d,downloadTokenExpiresAt:p,...r})=>r)}",
        "removal of capability hashes from staff overview output",
    )
    text = replace_exact(
        text,
        "requestId:c,supplier:f.offer.supplier.name",
        "requestId:c.id,supplier:f.offer.supplier.name",
        "sourcing negotiation request IDs",
    )
    text = replace_exact(
        text,
        'i.push({type:"sourcing",requestId:c,result:o})',
        'i.push({type:"sourcing",requestId:c.id,downloadToken:c.downloadToken,result:o})',
        "customer sourcing download token response",
    )
    text = replace_exact(
        text,
        'i.push({type:"compare",requestId:o,query:',
        'i.push({type:"compare",requestId:o.id,downloadToken:o.downloadToken,query:',
        "customer comparison download token response",
    )
    text = replace_exact(
        text,
        'var cm=(0,O$.default)();cm.use(O$.default.json({limit:"12mb"}));cm.use((t,e,r)=>{',
        'var cm=(0,O$.default)();cm.disable("x-powered-by");cm.use(O$.default.json({limit:"12mb"}));var __oshopSecurity=require("./admin-security.cjs");__oshopSecurity.installAdminSecurity(cm,{getRequestById:id=>WTe(id)});',
        "server-side admin auth and abuse guards",
    )
    oidc_middleware = 'cm.use((t,e,r)=>{let i=t.headers["x-vercel-oidc-token"];typeof i=="string"&&i&&(zC.token=i),r()});'
    if text.count(oidc_middleware) > 1:
        raise SystemExit("Unexpected duplicate client-supplied OIDC middleware.")
    text = text.replace(oidc_middleware, "", 1)
    text = replace_exact(
        text,
        'function Nxt(){if(!JTe)return Fxt??=new DC;let e=process.env.AI_GATEWAY_API_KEY||zC.token||process.env.VERCEL_OIDC_TOKEN;return new DC({baseURL:"https://ai-gateway.vercel.sh",apiKey:null,authToken:e})}',
        'function Nxt(){if(!JTe)return Fxt??=new DC;let e=process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN;return new DC({baseURL:"https://ai-gateway.vercel.sh",apiKey:null,authToken:e})}',
        "server-side-only Vercel OIDC credentials",
    )
    text = replace_exact(
        text,
        'cm.get("/api/health",(t,e)=>e.json({ok:!0,reef:!!process.env.REEF_API_KEY,gemini:!!process.env.GEMINI_API_KEY,nvidia:!!process.env.NVIDIA_API_KEY,groq:!!process.env.GROQ_API_KEY,ai:!!(process.env.GEMINI_API_KEY||process.env.NVIDIA_API_KEY||process.env.GROQ_API_KEY||process.env.AI_GATEWAY_API_KEY||zC.token||process.env.VERCEL_OIDC_TOKEN)}));',
        'cm.get("/api/health",(t,e)=>{e.setHeader("Cache-Control","no-store");e.json({ok:!0})});',
        "removal of provider-secret presence flags from health endpoint",
    )
    API.write_text(text, encoding="utf-8")


def patch_frontend() -> None:
    text = FRONTEND.read_text(encoding="utf-8")
    text = replace_exact(
        text,
        'href:`${Rn}/api/requests/${n.requestId}/excel`',
        'href:`${Rn}/api/requests/${n.requestId}/excel?token=${encodeURIComponent(n.downloadToken||"")}`',
        "customer Excel capability URL",
    )
    FRONTEND.write_text(text, encoding="utf-8")

    html = HTML.read_text(encoding="utf-8")
    marker = '<script type="module" crossorigin src="./assets/index-6ttDirym.js"></script>'
    insertion = '<script defer src="./admin-auth-redirect.js"></script>\n    ' + marker
    if "./admin-auth-redirect.js" not in html:
        html = replace_exact(html, marker, insertion, "staff-login redirect bootstrap")
    HTML.write_text(html, encoding="utf-8")


def security_headers() -> dict[str, str]:
    return {
        "Strict-Transport-Security": "max-age=31536000",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
        "Permissions-Policy": "camera=(), microphone=(self), geolocation=()",
        "Content-Security-Policy": "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
    }


def patch_configs() -> None:
    config = json.loads(OUTPUT_CONFIG.read_text(encoding="utf-8"))
    route = {"src": "/(.*)", "headers": security_headers(), "continue": True}
    routes = config.setdefault("routes", [])
    routes[:] = [item for item in routes if not (item.get("src") == route["src"] and item.get("headers") == route["headers"])]
    routes.insert(0, route)
    OUTPUT_CONFIG.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    vercel = json.loads(VERCEL_CONFIG.read_text(encoding="utf-8"))
    vercel["buildCommand"] = "bash tools/build.sh && mkdir -p .vercel/output && cp -R vercel-output/. .vercel/output/"
    header_items = [{"key": key, "value": value} for key, value in security_headers().items()]
    vercel["headers"] = [{"source": "/(.*)", "headers": header_items}]
    VERCEL_CONFIG.write_text(json.dumps(vercel, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    patch_api()
    patch_frontend()
    patch_configs()
    print("Oshop security hardening patch applied.")


if __name__ == "__main__":
    main()
