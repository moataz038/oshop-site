#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

python3 tools/apply-product-matching-v3.py
node --check vercel-output/functions/api.func/index.cjs
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js
python3 -m json.tool vercel-output/config.json >/dev/null
python3 -m json.tool vercel.json >/dev/null
bash tools/verify.sh

echo "Oshop build verification passed. vercel-output is ready for deployment."
