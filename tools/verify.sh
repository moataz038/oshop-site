#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

required=(
  vercel-output/static/index.html
  vercel-output/static/assets/index-6ttDirym.js
  vercel-output/static/assets/index-ca6a3825.css
  vercel-output/static/img/kb-mark.png
  vercel-output/static/img/kb-hero.webp
  vercel-output/static/favicon.png
  vercel-output/functions/api.func/index.cjs
  vercel-output/functions/api.func/admin-security.cjs
  vercel-output/functions/api.func/shared-store.cjs
  vercel-output/static/admin-login.html
  vercel-output/static/admin-login.js
  vercel-output/functions/api.func/kb-badge-admin-page.cjs
  vercel-output/static/kb-badge-admin.js
  vercel-output/static/robots.txt
  vercel-output/static/admin-auth-redirect.js
  tools/runtime-security.test.cjs
  tools/helpers/runtime-security-child.cjs
)
for path in "${required[@]}"; do
  test -s "$path" || { echo "Missing required file: $path" >&2; exit 1; }
done

node --check vercel-output/functions/api.func/index.cjs
node --check vercel-output/functions/api.func/admin-security.cjs
node --check vercel-output/functions/api.func/shared-store.cjs
node --check vercel-output/functions/api.func/kb-badge-admin-page.cjs
node --check vercel-output/static/kb-badge-admin.js
node --check vercel-output/static/admin-login.js
node --check vercel-output/static/admin-auth-redirect.js
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js

grep -q 'index-6ttDirym.js' vercel-output/static/index.html
grep -q 'index-ca6a3825.css' vercel-output/static/index.html
grep -q 'name:"KB"' vercel-output/static/assets/index-6ttDirym.js
grep -q 'وكيل الذكاء الاصطناعي المساعد' vercel-output/static/assets/index-6ttDirym.js
grep -q 'https://www.instagram.com/kb.online.store' vercel-output/static/assets/index-6ttDirym.js

if grep -RnE 'Oshop|اوشوب|oshop\.company|oshop-mark\.png|img/chrome\.webp' \
  vercel-output/static/index.html \
  vercel-output/static/admin-login.html \
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
grep -q 'kb-badge-admin' vercel-output/functions/api.func/admin-security.cjs
grep -q 'noindex, nofollow, noarchive' vercel-output/functions/api.func/kb-badge-admin-page.cjs
grep -q 'Disallow: /kb-badge-admin' vercel-output/static/robots.txt
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
        if path.is_file() and path.suffix in {'.cjs', '.js', '.py', '.html', '.json', '.sh'}:
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
assert 'apply-kb-badge-admin.py' in build, 'Missing badge-admin build patch'
assert any(route.get('src') == '^/kb-badge-admin/?$' and route.get('dest') == '/api/staff/kb-badge-admin' for route in routes), 'Missing protected standalone admin rewrite'
assert any(item.get('source') == '/kb-badge-admin' and 'X-Robots-Tag' in {h.get('key') for h in item.get('headers', [])} for item in vercel.get('headers', [])), 'Missing admin noindex headers'
PY

echo "Oshop verification passed."
