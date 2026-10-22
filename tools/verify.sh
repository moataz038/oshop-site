#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

required=(
  vercel-output/static/index.html
  vercel-output/static/assets/index-6ttDirym.js
  vercel-output/static/assets/index-ca6a3825.css
  vercel-output/static/img/oshop-mark.png
  vercel-output/functions/api.func/index.cjs
)
for path in "${required[@]}"; do
  test -s "$path" || { echo "Missing required file: $path" >&2; exit 1; }
done

node --check vercel-output/functions/api.func/index.cjs
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js

grep -q 'index-6ttDirym.js' vercel-output/static/index.html
grep -q 'index-ca6a3825.css' vercel-output/static/index.html
grep -q 'name:"Oshop"' vercel-output/static/assets/index-6ttDirym.js
grep -q 'وكيل الذكاء الاصطناعي المساعد' vercel-output/static/assets/index-6ttDirym.js

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

echo "Oshop verification passed."
