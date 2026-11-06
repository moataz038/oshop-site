#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

required=(
  vercel-output/static/index.html
  vercel-output/static/assets/index-6ttDirym.js
  vercel-output/static/assets/index-ca6a3825.css
  vercel-output/static/assets/kb-ui-refresh.css
  vercel-output/static/img/kb-mark.png
  vercel-output/static/img/kb-hero.webp
  vercel-output/static/favicon.png
  vercel-output/functions/api.func/index.cjs
  vercel-output/functions/api.func/admin-security.cjs
  vercel-output/functions/api.func/shared-store.cjs
  vercel-output/functions/api.func/admin-login-html.cjs
  vercel-output/functions/api.func/admin-login-js.cjs
  vercel-output/functions/api.func/shein-direct-reader.mjs
  vercel-output/functions/api.func/kb-badge-admin-login-html.cjs
  vercel-output/functions/api.func/kb-badge-admin-login-js.cjs
  vercel-output/functions/api.func/kb-badge-admin-page.cjs
  vercel-output/functions/api.func/kb-badge-admin-js.cjs
  vercel-output/static/robots.txt
  vercel-output/static/admin-auth-redirect.js
  tools/runtime-security.test.cjs
  tools/helpers/runtime-security-child.cjs
  tools/shein-cart-quantity-core.cjs
  tools/shein-cart-quantity-ui.js
  tools/apply-shein-cart-quantity.py
  tools/shein-cart-quantity.test.cjs
  tools/shein-cart-quantity.browser.test.py
  tools/shein-cart-routing-core.cjs
  tools/apply-shein-cart-routing.py
  tools/shein-cart-routing.test.cjs
  tools/shein-direct-reader.mjs
  tools/apply-shein-direct-reader.py
  tools/shein-direct-reader.test.cjs
  vendor/shein-cart/LICENSE
  vendor/shein-cart/NOTICE.md
)
for path in "${required[@]}"; do
  test -s "$path" || { echo "Missing required file: $path" >&2; exit 1; }
done

node --check vercel-output/functions/api.func/index.cjs
node --check vercel-output/functions/api.func/admin-security.cjs
node --check vercel-output/functions/api.func/shared-store.cjs
node --check vercel-output/functions/api.func/shein-direct-reader.mjs
node --check vercel-output/functions/api.func/kb-badge-admin-page.cjs
node --check vercel-output/functions/api.func/kb-badge-admin-js.cjs
node --check vercel-output/functions/api.func/admin-login-js.cjs
node --check vercel-output/functions/api.func/kb-badge-admin-login-js.cjs
node --check vercel-output/static/admin-auth-redirect.js
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js
node --check tools/shein-cart-quantity-core.cjs
node --check tools/shein-cart-quantity-ui.js
node --check tools/shein-cart-routing-core.cjs
node --check tools/shein-direct-reader.mjs

grep -q 'index-6ttDirym.js' vercel-output/static/index.html
grep -q 'index-ca6a3825.css' vercel-output/static/index.html
grep -q 'href="./assets/kb-ui-refresh.css"' vercel-output/static/index.html
grep -q 'name:"KB"' vercel-output/static/assets/index-6ttDirym.js
grep -q 'وكيل الذكاء الاصطناعي المساعد' vercel-output/static/assets/index-6ttDirym.js
grep -q 'https://www.instagram.com/kb.online.store' vercel-output/static/assets/index-6ttDirym.js
grep -q 'KB_SHEIN_ITEM_QUANTITY_CALL_V1' vercel-output/static/assets/index-6ttDirym.js
grep -q 'KB_SHEIN_ITEM_QUANTITY_API_V1' vercel-output/functions/api.func/index.cjs
grep -q 'KB_SHEIN_CART_ROUTE_V1' vercel-output/functions/api.func/index.cjs
grep -q 'KB_SHEIN_DIRECT_READER_V1' vercel-output/functions/api.func/index.cjs
grep -q 'var __KBSheinCartReaderPromise=import("./shein-direct-reader.mjs");' vercel-output/functions/api.func/index.cjs
grep -q 'source:"shein-cart"' vercel-output/functions/api.func/index.cjs
grep -q 'qty:null' vercel-output/functions/api.func/index.cjs
grep -q 'totalLyd:null' vercel-output/functions/api.func/index.cjs
grep -q 'priceKnown=priceAmount!==null&&priceCurrency==="USD"' vercel-output/functions/api.func/index.cjs
grep -Fq 'priceCurrency=currencies.length===1&&items.every(item=>item.priceCurrency===currencies[0])?currencies[0]:currencies.length?"MIXED":""' vercel-output/functions/api.func/index.cjs
grep -q 'exchangeRateConfigured:rateConfig.configured' vercel-output/functions/api.func/index.cjs
grep -q 'usdToLydConfigured:false' vercel-output/functions/api.func/index.cjs
grep -q 'SHEIN_FX_CONFIGURED_V1' vercel-output/functions/api.func/shared-store.cjs
grep -q "base.usdToLydConfigured = configuredRate ~= nil and configuredRate > 0" vercel-output/functions/api.func/shared-store.cjs
grep -q 'مراجعة كمية كل منتج' vercel-output/static/assets/index-6ttDirym.js
if grep -RE 'OMKAR_API_KEY|shein-scraper\.omkar\.cloud|API-Key' vercel-output/functions/api.func/index.cjs >/dev/null; then
  echo "Paid Omkar reader code must not remain in the runtime API" >&2
  exit 1
fi

if grep -RnE 'Oshop|اوشوب|oshop\.company|oshop-mark\.png|img/chrome\.webp' \
  vercel-output/static/index.html \
  vercel-output/functions/api.func/admin-login-html.cjs \
  vercel-output/static/assets/index-6ttDirym.js \
  vercel-output/functions/api.func/index.cjs >/dev/null; then
  echo "Old visible brand reference found in runtime output" >&2
  exit 1
fi

# Runtime output must contain only the current Oshop identity.
legacy_brand=$(printf "\\x61\\x66\\x61\\x61\\x71")
legacy_short=$(printf "\\x61\\x66\\x61\\x71")
legacy_assets=$(printf "agent-female|agent-male")
if grep -RniE "${legacy_brand}|${legacy_short}|${legacy_assets}" \
  vercel-output/static/index.html \
  vercel-output/static/assets/index-6ttDirym.js \
  vercel-output/functions/api.func/index.cjs >/dev/null; then
  echo "Legacy branding/persona reference found in runtime output" >&2
  exit 1
fi

if grep -RniE 'ok_[A-Za-z0-9]{20,}' \
  vercel-output/functions/api.func/index.cjs vercel-output/static >/dev/null; then
  echo "Possible secret value found in tracked runtime output" >&2
  exit 1
fi

grep -q 'installAdminSecurity' vercel-output/functions/api.func/index.cjs
grep -q 'downloadTokenHash' vercel-output/functions/api.func/index.cjs
grep -q 'admin-auth-redirect.js' vercel-output/static/index.html
grep -q 'X-Oshop-Admin-Auth' vercel-output/static/admin-auth-redirect.js
grep -q 'KB_BADGE_ADMIN_V1' vercel-output/functions/api.func/index.cjs
grep -q 'kb-badge-admin.vercel.app' vercel-output/functions/api.func/admin-security.cjs
grep -q 'kb-badge-admin-login.html' vercel-output/functions/api.func/kb-badge-admin-js.cjs
grep -q 'kb-badge-admin' vercel-output/functions/api.func/admin-security.cjs
grep -q 'e.get("/kb-badge-admin"' vercel-output/functions/api.func/index.cjs
grep -q 'noindex, nofollow, noarchive' vercel-output/functions/api.func/kb-badge-admin-page.cjs
if grep -Eq 'kb-badge-admin|admin-login' vercel-output/static/robots.txt; then
  echo "Public robots must not disclose badge/admin-login names" >&2
  exit 1
fi
if grep -q 'x-vercel-oidc-token' vercel-output/functions/api.func/index.cjs; then
  echo "Client-supplied OIDC header handling must not return" >&2
  exit 1
fi
if grep -R 'OSHOP_ADMIN_PASSWORD' vercel-output/static >/dev/null; then
  echo "Admin password environment name leaked into client assets" >&2
  exit 1
fi
if grep -RE 'KV_REST_API_TOKEN|UPSTASH_REDIS_REST_TOKEN' vercel-output/static >/dev/null; then
  echo "Server-side Redis configuration leaked into client assets" >&2
  exit 1
fi
if grep -E 'loginFailures|rateBuckets' vercel-output/functions/api.func/admin-security.cjs >/dev/null; then
  echo "Process-local abuse counters must not return" >&2
  exit 1
fi
python3 - <<'PY'
import json
import re
import runpy
from pathlib import Path
patterns = {
    'AI API token': r'sk-(?:proj-|ant-)?[A-Za-z0-9_-]{24,}',
    'GitHub token': r'gh[pousr]_[A-Za-z0-9]{30,}',
    'AWS access key': r'AKIA[A-Z0-9]{16}',
    'private key': r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
}
for root in ('vercel-output', 'tools'):
    for path in Path(root).rglob('*'):
        if path.is_file() and path.suffix in {'.cjs', '.js', '.mjs', '.py', '.html', '.json', '.sh'}:
            text = path.read_text(errors='replace')
            for label, pattern in patterns.items():
                assert not re.search(pattern, text), f'Possible {label} in {path}; value withheld'
runpy.run_path('tools/apply-shared-storage.py')['validate'](Path('vercel-output/functions/api.func/index.cjs').read_text())
required = {'Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Content-Security-Policy'}
config = json.loads(Path('vercel-output/config.json').read_text())
routes = config.get('routes', [])
assert routes and routes[0].get('continue') is True and required <= set(routes[0].get('headers', {})), 'Missing Build Output security headers'
vercel = json.loads(Path('vercel.json').read_text())
assert any(item.get('source') == '/(.*)' and required <= {header.get('key') for header in item.get('headers', [])} for item in vercel.get('headers', [])), 'Missing vercel.json security headers'
command = vercel.get('buildCommand', '')
assert len(command) <= 256, 'Vercel buildCommand exceeds schema limit'
assert command.startswith('bash tools/build.sh &&'), 'Missing verified build entry point'
build = Path('tools/build.sh').read_text()
assert 'apply-shared-storage.py' in build and all(name in build for name in ('shared-store.test.cjs', 'runtime-security.test.cjs', 'security-hardening.test.cjs')), 'Missing shared storage or runtime security build/test gate'
assert 'apply-shein-cart-quantity.py' in build and 'shein-cart-quantity.test.cjs' in build, 'Missing SHEIN quantity patch/test gate'
assert 'apply-shein-cart-routing.py' in build and 'shein-cart-routing.test.cjs' in build, 'Missing SHEIN routing patch/test gate'
assert 'apply-shein-direct-reader.py' in build and 'shein-direct-reader.test.cjs' in build, 'Missing direct SHEIN reader patch/test gate'
assert 'apply-kb-badge-admin.py' in build, 'Missing badge-admin build patch'
assert 'apply-kb-badge-host-isolation.py' in build, 'Missing badge host-isolation build patch'
assert any(route.get('src') == '^/kb-badge-admin/?$' and route.get('dest') == '/api/staff/kb-badge-admin' and route.get('check') is True and not route.get('continue') for route in routes), 'Missing checked Build Output standalone admin rewrite'
assert any(item.get('source') == '/kb-badge-admin' and 'X-Robots-Tag' in {h.get('key') for h in item.get('headers', [])} for item in vercel.get('headers', [])), 'Missing admin noindex headers'
assert any(item.get('source') == '/kb-badge-admin' and item.get('destination') == '/api/staff/kb-badge-admin' for item in vercel.get('rewrites', [])), 'Missing Vercel root standalone admin rewrite'
assert Path('vercel-output/functions/api.func/index.cjs').read_text().count('e.get("/kb-badge-admin"') == 1, 'Expected one direct admin page route'
assert not any(route.get('dest') == '/api/staff/kb-badge-admin' and not route.get('has') for route in routes), 'Unscoped badge rewrite is forbidden'
assert any(route.get('has') == [{'type': 'host', 'value': {'eq': 'kb-badge-admin.vercel.app'}}] and route.get('src') == '^/kb-badge-admin/?$' for route in routes), 'Missing exact admin host route'
assert any(route.get('status') == 404 and route.get('missing') == [{'type': 'host', 'value': {'eq': 'kb-badge-admin.vercel.app'}}] for route in routes), 'Missing non-admin host 404 gate'
assert any(route.get('status') == 404 and route.get('has') == [{'type': 'host', 'value': {'eq': 'kb-badge-admin.vercel.app'}}] and '(?!(?:kb-badge-admin' in route.get('src', '') for route in routes), 'Missing admin-host unknown-path 404 gate'
PY

echo "Oshop verification passed."
