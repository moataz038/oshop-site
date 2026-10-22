#!/usr/bin/env bash
set -euo pipefail

# تحديد جذر المستودع حتى يعمل السكربت من أي مجلد.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"


# تحديث قواعد مطابقة المنتجات داخل حزمة API بشكل آمن ومتكرر.
python3 tools/apply-product-matching-v3.py

# فحص بناء JavaScript الخلفي والواجهة قبل السماح بالنشر.
node --check vercel-output/functions/api.func/index.cjs
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js
python3 -m json.tool vercel-output/config.json >/dev/null
python3 -m json.tool vercel.json >/dev/null

# فحص الملفات المطلوبة والهوية والأسرار المكشوفة.
bash tools/verify.sh

echo "Oshop build verification passed. vercel-output is ready for deployment."
