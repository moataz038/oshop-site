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
python3 tools/apply-kb-reference-design.py
# Style the existing chat recorder as a glass Voice Pill; no new recorder logic.
python3 tools/apply-kb-voice-pill.py
python3 tools/apply-kb-badge-admin.py
# Restrict badge UI, APIs, and assets to the exact production admin hostname.
python3 tools/apply-kb-badge-host-isolation.py
# Ensure the privacy-safe reader diagnostics exist before replacing the provider branch.
python3 tools/apply-shein-reader-safe-logging.py
# Replace the legacy cart reader first so later patches never preserve a paid provider path.
python3 tools/apply-shein-direct-reader.py
# Add the local-only SHEIN quantity review UI and safe missing-price handling.
python3 tools/apply-shein-cart-quantity.py
# Route SHEIN share links deterministically and fail closed on missing data.
python3 tools/apply-shein-cart-routing.py
# فحص بناء JavaScript الخلفي والواجهة قبل السماح بالنشر.
node --check vercel-output/functions/api.func/index.cjs
node --check vercel-output/functions/api.func/shein-direct-reader.mjs
node --input-type=module --check < vercel-output/static/assets/index-6ttDirym.js
node --input-type=module --check < vercel-output/static/assets/kb-crystal-orb.js
node --input-type=module --check < vercel-output/static/assets/kb-fluid-background.js
node --input-type=module --check < vercel-output/static/assets/ai-orb-core.js
node --input-type=module --check < vercel-output/static/assets/webgl-fluid-enhanced.js
node --check vercel-output/functions/api.func/admin-security.cjs
node --check vercel-output/functions/api.func/shared-store.cjs
node --check vercel-output/functions/api.func/admin-login-js.cjs
node --check vercel-output/functions/api.func/kb-badge-admin-login-js.cjs
node --check vercel-output/static/admin-auth-redirect.js
node --check vercel-output/static/kb-logo-3d.js
python3 -m json.tool vercel-output/config.json >/dev/null
python3 -m json.tool vercel.json >/dev/null
node --test tools/security-hardening.test.cjs tools/shared-store.test.cjs tools/runtime-security.test.cjs tools/kb-badge-host-isolation.test.cjs tools/product-matching.test.cjs tools/shein-cart-quantity.test.cjs tools/shein-cart-routing.test.cjs tools/shein-reader-safe-log.test.cjs tools/shein-direct-reader.test.cjs tools/voice-pill-ui.test.cjs tools/kb-visual-effects.test.cjs

# فحص الملفات المطلوبة والهوية والأسرار المكشوفة.
bash tools/verify.sh

echo "KB build verification passed. vercel-output is ready for deployment."
