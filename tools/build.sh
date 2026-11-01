#!/usr/bin/env bash
set -euo pipefail

# تحديد جذر المستودع حتى يعمل السكربت من أي مجلد.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
python3 tools/apply-kb-badge-host-isolation.py --prepare


# تحديث قواعد مطابقة المنتجات داخل حزمة API بشكل آمن ومتكرر.
python3 tools/apply-product-matching-v3.py

# تركيب حماية الإدارة والرؤوس الأمنية بصورة قابلة لإعادة البناء.
python3 tools/apply-security-hardening.py

# تركيب المخزن المشترك بعد حماية الجلسات وقبل الاختبارات.
python3 tools/apply-shared-storage.py
# تحديث الهوية المرئية والشعارات في الحزمة الجاهزة، مع إبقاء المسارات والمنطق.
python3 tools/apply-kb-branding.py
# تركيب لوحة العبارات المستقلة وحمايتها بعد توليد الحزمة، بصورة قابلة للتكرار.
python3 tools/apply-kb-badge-admin.py
# Restrict badge UI, APIs, and assets to the exact production admin hostname.
python3 tools/apply-kb-badge-host-isolation.py
# فحص بناء JavaScript الخلفي والواجهة قبل السماح بالنشر.
node --check vercel-output/functions/api.func/index.cjs
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js
node --check vercel-output/functions/api.func/admin-security.cjs
node --check vercel-output/functions/api.func/shared-store.cjs
node --check vercel-output/functions/api.func/admin-login-js.cjs
node --check vercel-output/functions/api.func/kb-badge-admin-login-js.cjs
node --check vercel-output/static/admin-auth-redirect.js
node --check vercel-output/static/kb-logo-3d.js
python3 -m json.tool vercel-output/config.json >/dev/null
python3 -m json.tool vercel.json >/dev/null
node --test tools/security-hardening.test.cjs tools/shared-store.test.cjs tools/runtime-security.test.cjs tools/kb-badge-host-isolation.test.cjs tools/product-matching.test.cjs

# فحص الملفات المطلوبة والهوية والأسرار المكشوفة.
bash tools/verify.sh

echo "KB build verification passed. vercel-output is ready for deployment."
