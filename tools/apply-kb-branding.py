#!/usr/bin/env python3
"""Apply the reviewed KB visual identity to the existing Oshop runtime bundle.

This updates display strings and image assets only. Storage keys, route IDs,
API names, authentication, pricing, and business calculations remain unchanged.
"""
from __future__ import annotations

from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "vercel-output" / "static"
JS = STATIC / "assets" / "index-6ttDirym.js"
CSS = STATIC / "assets" / "index-ca6a3825.css"
INDEX = STATIC / "index.html"
ADMIN = STATIC / "admin-login.html"
API = ROOT / "vercel-output" / "functions" / "api.func" / "index.cjs"


def replace_all(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count:
        return text.replace(old, new)
    if new in text:
        return text
    raise RuntimeError(f"Could not find either old or new text for {label}")


def patch_file(path: Path, pairs: list[tuple[str, str, str]]) -> None:
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new, label in pairs:
        text = replace_all(text, old, new, label)
    if text != original:
        path.write_text(text, encoding="utf-8")


def main() -> None:
    if not all(path.is_file() for path in (JS, CSS, INDEX, ADMIN, API)):
        raise RuntimeError("A required runtime file is missing; refusing a partial branding update")

    patch_file(JS, [
        ('children:"O"}),"shop"]', 'children:"K"}),"B"]', "welcome wordmark"),
        ('oshop-mark.png', 'kb-mark.png', "assistant and app logo asset"),
        ('img/chrome.webp', 'img/kb-hero.webp', "welcome artwork asset"),
        ('children:c.jsx($k,{className:"w-full h-full"})', 'children:c.jsx("img",{src:"img/kb-hero.webp",alt:"",className:"w-full h-full object-contain"})', "welcome hero graphic"),
        ('children:c.jsx(Wk,{className:"w-full h-full"})', 'children:c.jsx("img",{src:"img/kb-hero.webp",alt:"",className:"w-full h-full object-contain"})', "home hero graphic"),
        ('id:"oshop",hex:"#9b7b3f",name:"KB"', 'id:"oshop",hex:"#d0d0d0",name:"KB"', "default theme color"),
        ('https://www.instagram.com/oshop.company', 'https://www.instagram.com/kb.online.store', "Instagram target"),
        ('@oshop.company', '@kb.online.store', "Instagram handle"),
        ('Oshop', 'KB', "visible English brand name"),
        ('اوشوب', 'KB', "visible Arabic brand name"),
        ('KB KB · Shipping & E-commerce · الإصدار 1.0', 'KB Online Store · Shipping & E-commerce · الإصدار 1.0', "footer brand lockup"),
    ])

    patch_file(API, [
        ('اوشوب Oshop للشحن والتجارة الإلكترونية', 'KB Online Store للشحن والتجارة الإلكترونية', "assistant business identity"),
        (r'Oshop\uFF08اوشوب\uFF09', 'KB Online Store', "supplier message identity"),
        ('We are Oshop, an import company in Libya.', 'We are KB Online Store, an import company in Libya.', "English supplier message"),
        ('Oshop Agent', 'KB Online Store Agent', "report metadata"),
        ('Oshop', 'KB', "assistant and report brand"),
        ('اوشوب', 'KB', "Arabic business references"),
    ])

    patch_file(INDEX, [
        ('<title>اوشوب Oshop | وكيلك الذكي للتسوق والشحن</title>', '<title>KB Online Store | وكيلك الذكي للتسوق والشحن</title>', "page title"),
        ('اوشوب للشحن والتجارة الإلكترونية:', 'KB للتسوق والشحن والتجارة الإلكترونية:', "page description"),
        ('#9B7B3F', '#030303', "browser theme color"),
        ('./img/chrome.webp', './img/kb-hero.webp', "preloaded welcome artwork"),
    ])

    patch_file(ADMIN, [
        ('دخول الموظفين | Oshop', 'دخول الموظفين | KB Online Store', "admin page title"),
        ('لوحة Oshop', 'لوحة KB Online Store', "admin page description"),
        ('#FDE3D0', '#9B7B3F', "admin theme color"),
        ('background: #fff8f3; color: #292524;', 'background: #f6f3eb; color: #201e19;', "admin page palette"),
        ('border: 1px solid #ead8cb; border-radius: 20px; background: white; box-shadow: 0 12px 36px #53250f12;', 'border: 1px solid #e6dcc5; border-radius: 20px; background: #fffefa; box-shadow: 0 12px 36px rgba(54, 42, 19, .12); text-align: center;', "admin card palette"),
        ('background: #a34822; color: white;', 'background: linear-gradient(135deg, #9b7b3f, #c5a85f); color: #201b10;', "admin button palette"),
        ('      h1 { margin: 0 0 8px; font-size: 1.35rem; }', '      .brand-mark { display: grid; place-items: center; width: 68px; height: 68px; margin: 0 auto 18px; border: 1px solid #9b7b3f; border-radius: 20px; background: #171610; color: #d5b968; font: 700 1.35rem Georgia, serif; letter-spacing: -.08em; box-shadow: 0 8px 20px rgba(155, 123, 63, .18); }\n      h1 { margin: 0 0 8px; font-size: 1.35rem; }', "admin brand badge style"),
        ('      <h1>دخول الموظفين</h1>', '      <div class="brand-mark" aria-label="KB">KB</div>\n      <h1>دخول الموظفين</h1>', "admin brand badge"),
    ])

    patch_file(CSS, [
        ('.app .canvas-wrap canvas,\n.app img[src*="oshop-mark"] {\n  filter: hue-rotate(18deg) saturate(.76) brightness(.97);\n}', '.app .canvas-wrap canvas {\n  filter: hue-rotate(18deg) saturate(.76) brightness(.97);\n}', "legacy logo color filter"),
    ])

    # Sync the newly rendered, reviewable brand assets into the deployable folder.
    assets = {
        ROOT / "brand" / "kb-mark.png": STATIC / "img" / "kb-mark.png",
        ROOT / "brand" / "kb-mark-white.png": STATIC / "img" / "kb-mark-white.png",
        ROOT / "brand" / "kb-hero.webp": STATIC / "img" / "kb-hero.webp",
        ROOT / "brand" / "favicon.png": STATIC / "favicon.png",
    }
    for source, destination in assets.items():
        if not source.is_file():
            raise RuntimeError(f"Missing KB brand asset: {source.relative_to(ROOT)}")
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    # Old Oshop imagery is no longer referenced by the runtime bundle.
    for obsolete in (STATIC / "img" / "oshop-mark.png", STATIC / "img" / "oshop-mark-white.png", STATIC / "img" / "chrome.webp"):
        if obsolete.exists():
            obsolete.unlink()

    runtime = "\n".join(path.read_text(encoding="utf-8", errors="replace") for path in (JS, API, INDEX, ADMIN))
    if "Oshop" in runtime or "اوشوب" in runtime or "oshop.company" in runtime or "KB KB" in runtime:
        raise RuntimeError("Old visible brand text remains in the runtime output")
    if 'role:"وكيل الذكاء الاصطناعي المساعد"' not in JS.read_text(encoding="utf-8"):
        raise RuntimeError("AI assistant identity/role marker was unexpectedly changed")
    for tool_name in ("compare_markets", "calculate_shein_cart", "track_shipment", "search_china_suppliers"):
        if tool_name not in API.read_text(encoding="utf-8"):
            raise RuntimeError(f"API tool missing after visual branding change: {tool_name}")

    print("KB branding patch applied and verified (visual identity only).")


if __name__ == "__main__":
    main()
