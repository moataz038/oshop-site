"""يحقن نسخة tools/product-matching.cjs داخل حزمة الخادم المبنية.

الحزمة `vercel-output/functions/api.func/index.cjs` مبنيّة ومصغّرة، وفيها نسخة
مطابقة قديمة كانت محقونة بـ tools/apply-product-matching.py. هذا السكربت
يستبدل تلك النسخة بالكامل بنسخة tools/product-matching.cjs الحالية.

آمن: يتوقف بدون تعديل إذا لم يجد المرساة مرة واحدة بالضبط، أو إذا كانت
النسخة الجديدة محقونة أصلًا (idempotent).

الاستعمال:  python3 tools/apply-product-matching-v3.py
ثم:         node --check vercel-output/functions/api.func/index.cjs
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SERVER = ROOT / "vercel-output/functions/api.func/index.cjs"
HELPER = ROOT / "tools/product-matching.cjs"
ANCHOR = "\nasync function ZTe("
START = "const PRODUCT_TYPES = ["
# علامة موجودة فقط في النسخة الجديدة، لضمان عدم التطبيق مرتين.
# ملاحظة: لا تستخدم كلمة لهجية كعلامة — بعضها مذكور في نص البرومبت داخل الحزمة.
MARKER = "const AUDIENCE = new Set("
MARKER_B = "function baseForms("


def main() -> int:
    if not SERVER.exists():
        print(f"missing bundle: {SERVER}", file=sys.stderr)
        return 1
    if not HELPER.exists():
        print(f"missing helper: {HELPER}", file=sys.stderr)
        return 1

    server = SERVER.read_text(encoding="utf-8")
    if MARKER in server or MARKER_B in server:
        print("already patched (new helper already injected) — nothing to do")
        return 0

    helper = HELPER.read_text(encoding="utf-8")
    # الحزمة لا تحتمل `module.exports`؛ نحذفه مثل السكربت الأصلي.
    helper = re.sub(r"\nmodule\.exports\s*=\s*\{[^\n]*\};\s*$", "\n", helper)
    if "function productMatchesTitle(" not in helper:
        print("helper does not define productMatchesTitle", file=sys.stderr)
        return 1

    if server.count(START) != 1:
        print(f"expected exactly one '{START}', found {server.count(START)}", file=sys.stderr)
        return 1
    if server.count(ANCHOR) != 1:
        print(f"expected exactly one anchor, found {server.count(ANCHOR)}", file=sys.stderr)
        return 1

    start = server.index(START)
    end = server.index(ANCHOR)
    if end <= start:
        print("anchor appears before the helper block", file=sys.stderr)
        return 1

    patched = server[:start] + helper.rstrip("\n") + server[end:]
    SERVER.write_text(patched, encoding="utf-8")
    print(f"patched {SERVER.relative_to(ROOT)} ({len(patched)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
