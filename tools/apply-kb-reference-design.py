#!/usr/bin/env python3
"""Apply the reference-chat design without exposing KB branding in screen copy.

Mount local GitHub-derived glass-orb and fluid WebGL modules, localize the
shipping prompt, switch the home screen to the supplied dark glass layout, and
preserve functional attachment, voice and chat controls.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "vercel-output/static/assets"
ENTRY = ASSETS / "index-6ttDirym.js"
ENTRY_IMPORT = "./index-6ttDirym.js"
ENTRY_IMPORT_WITH_PALETTE = "./index-6ttDirym.js?palette=64a124f9d2"


def replace_once(source: str, old: str, new: str, label: str) -> tuple[str, bool]:
    count = source.count(old)
    if count == 1:
        return source.replace(old, new, 1), True
    if count == 0 and label == "home attachment and voice controls" and 'data-testid":"button-home-attach"' in source and 'data-testid":"button-home-voice-mode"' in source:
        return source, False
    if count == 0 and new in source:
        return source, False
    raise SystemExit(f"Expected exactly one {label} source marker, found {count}.")


def replace_all(source: str, old: str, new: str, label: str) -> tuple[str, bool]:
    count = source.count(old)
    if count:
        return source.replace(old, new), True
    if new in source:
        return source, False
    raise SystemExit(f"Expected at least one {label} source marker, found 0.")


def copy_visual_assets() -> bool:
    assets = [
        (ROOT / "tools/kb-crystal-orb.js", ASSETS / "kb-crystal-orb.js"),
        (ROOT / "tools/kb-fluid-background.js", ASSETS / "kb-fluid-background.js"),
        (ROOT / "vendor/ai-orb/dist/ai-orb-core.js", ASSETS / "ai-orb-core.js"),
        (ROOT / "vendor/webgl-fluid-enhanced/dist/index.es.js", ASSETS / "webgl-fluid-enhanced.js"),
    ]
    changed = False
    for source, target in assets:
        if not source.is_file():
            raise SystemExit(f"Missing local visual asset source: {source}")
        content = source.read_bytes()
        if not target.is_file() or target.read_bytes() != content:
            target.write_bytes(content)
            changed = True
    return changed


def patch_html() -> bool:
    path = ROOT / "vercel-output/static/index.html"
    source = path.read_text(encoding="utf-8")
    changed = False
    source, did_change = replace_once(
        source,
        "<title>KB Online Store | وكيلك الذكي للتسوق والشحن</title>",
        "<title>التسوق والشحن | مساعدك الذكي</title>",
        "page title",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        '<meta property="og:site_name" content="KB Online Store" />',
        '<meta property="og:site_name" content="مساعد التسوق والشحن" />',
        "Open Graph site name",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        '<meta property="og:title" content="KB Online Store | وكيلك الذكي للتسوق والشحن" />',
        '<meta property="og:title" content="التسوق والشحن | مساعدك الذكي" />',
        "Open Graph title",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        '<meta property="og:image:alt" content="الشعار الأصلي لمتجر KB" />',
        '<meta property="og:image:alt" content="مساعد التسوق والشحن" />',
        "Open Graph image alt text",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        '<meta name="twitter:title" content="KB Online Store | وكيلك الذكي للتسوق والشحن" />',
        '<meta name="twitter:title" content="التسوق والشحن | مساعدك الذكي" />',
        "Twitter title",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        '<meta name="twitter:image:alt" content="الشعار الأصلي لمتجر KB" />',
        '<meta name="twitter:image:alt" content="مساعد التسوق والشحن" />',
        "Twitter image alt text",
    )
    changed |= did_change
    source, did_change = replace_all(source, "KB للتسوق والشحن", "التسوق والشحن", "brand metadata")
    changed |= did_change
    main_script = '<script type="module" crossorigin src="./assets/index-6ttDirym.js?palette=64a124f9d2"></script>'
    orb_script = '<script type="module" crossorigin src="./assets/kb-crystal-orb.js?orb=vessel-1"></script>'
    fluid_script = '<script type="module" crossorigin src="./assets/kb-fluid-background.js?fluid=webgl-1"></script>'
    if source.count(main_script) != 1:
        raise SystemExit(f"Expected exactly one main module script, found {source.count(main_script)}.")
    normalized = source
    for script in (orb_script, fluid_script):
        normalized = re.sub(rf"(?m)^[ \t]*{re.escape(script)}[ \t]*(?:\r?\n|$)", "", normalized)
    normalized = normalized.replace(main_script, main_script + "\n    " + orb_script + "\n    " + fluid_script, 1)
    normalized = re.sub(
        rf"({re.escape(main_script)}\r?\n    {re.escape(orb_script)}\r?\n    {re.escape(fluid_script)})(?:\r?\n[ \t]*(?=\r?\n))*",
        r"\1",
        normalized,
        count=1,
    )
    did_change = normalized != source
    source = normalized
    changed |= did_change
    path.write_text(source, encoding="utf-8")
    return changed


def main() -> None:
    source = ENTRY.read_text(encoding="utf-8")
    changed = copy_visual_assets()
    patches = [
        (
            'fallback:c.jsx("img",{src:"img/kb-gold-only.png",alt:"",className:"block max-w-none",style:{width:"132%",marginInlineStart:"-16%"}})',
            'fallback:c.jsx("div",{className:"kb-orb-loading"})',
            "large-logo loading fallback",
        ),
        (
            'c.jsx(Ct,{path:"/welcome",component:Hk})',
            'c.jsx(Ct,{path:"/welcome",component:Kk})',
            "route the welcome URL to the refreshed assistant screen",
        ),
        (
            'children:c.jsx(N.Suspense,{fallback:c.jsx("div",{className:"kb-orb-loading"}),children:c.jsx("div",{className:"kb-orb-holder",children:c.jsx(lS,{size:154})})})})]}),c.jsxs("div",{className:"safe-top relative z-10 px-4 pt-2 flex items-center justify-between"',
            'children:c.jsx(N.Suspense,{fallback:c.jsx("div",{className:"kb-orb-loading"}),children:c.jsx("div",{className:"kb-orb-holder",children:c.jsx("div",{className:"kb-orb-host","aria-hidden":"true"})})})})]}),c.jsxs("div",{className:"safe-top relative z-10 px-4 pt-2 flex items-center justify-between"',
            "replace previous orb with transparent WebGL vessel host",
        ),
        (
            'c.jsx("img",{src:"img/kb-mark.png",alt:"KB",style:{height:18,width:"auto"}}),c.jsx("span",{className:"font-medium text-[0.92rem]",children:n?c.jsxs(c.Fragment,{children:["KB ",c.jsx("span",{style:{color:"var(--accent)"},children:"موتورز"})]}):c.jsxs(c.Fragment,{children:["KB ",c.jsx("span",{style:{color:"var(--accent)"},children:"للتسوق والشحن"})]})})',
            'c.jsx("span",{className:"font-medium text-[0.92rem]",children:"وضع ذكي"})',
            "brand pill to smart mode",
        ),
        (
            'const Yn={oshop:{name:"KB",img:"img/kb-original-profile.jpg",role:"وكيل الذكاء الاصطناعي المساعد",f:!1}}',
            'const Yn={oshop:{name:"مساعد الشحن",img:"img/assistant-avatar.svg",role:"وكيل الشحن الذكي",f:!1}}',
            "neutral assistant identity",
        ),
        (
            '{id:"oshop",hex:"#c9a65f",name:"KB"}',
            '{id:"oshop",hex:"#798cff",name:"ليلي"}',
            "neutral theme label",
        ),
        (
            '["أهلًا،",""],[`أنا ${p.name}`,"grad"]',
            '["أهلًا بك",""]',
            "remove KB name from home greeting",
        ),
        (
            '["تبي تشحن","grad"],["اليوم؟",""]',
            '["تبي تشحن","grad"],["\\n",""],["اليوم؟",""]',
            "two-line localized shipping prompt",
        ),
        (
            'children:[c.jsx("input",{value:l,onChange:x=>h(x.target.value),placeholder:`اكتب لـ${p.name}…`,"aria-label":"رسالتك","data-testid":"input-home"}),l.trim()?',
            '''children:[c.jsx("button",{type:"button",className:"kb-input-add",onClick:()=>f.current?.click(),"aria-label":"إضافة صورة","data-testid":"button-home-attach",children:c.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:c.jsx("path",{d:"M12 5v14M5 12h14"})})}),c.jsx("input",{value:l,onChange:x=>h(x.target.value),placeholder:`اكتب لـ${p.name}…`,"aria-label":"رسالتك","data-testid":"input-home"}),c.jsx("button",{type:"button",className:"kb-input-wave",onClick:()=>s("/voice"),"aria-label":"محادثة صوتية","data-testid":"button-home-voice-mode",children:c.jsx("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",children:c.jsx("path",{d:"M3 10v4m4-8v12m5-15v18m5-14v10m4-7v4"})})}),l.trim()?''',
            "home attachment and voice controls",
        ),
        (
            'placeholder:`اكتب لـ${p.name}…`,"aria-label":"رسالتك","data-testid":"input-home"',
            'placeholder:"اكتب سؤالك…","aria-label":"رسالتك","data-testid":"input-home"',
            "neutral home input placeholder",
        ),
        (
            'const OSF=["وكيل KB الذكي"',
            'const OSF=["مرحبًا بك"',
            "neutral assistant badge",
        ),
        (
            'children:"KB Online Store · Shipping & E-commerce · الإصدار 1.0"',
            'children:"مساعد الشحن · الإصدار 1.0"',
            "neutral footer label",
        ),
    ]
    for old, new, label in patches:
        source, did_change = replace_once(source, old, new, label)
        changed |= did_change

    old_wave = 'className:"kb-input-wave",onClick:()=>s("/voice"),"aria-label":"محادثة صوتية","data-testid":"button-home-voice-mode",children:c.jsx("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",children:c.jsx("path",{d:"M3 10v4m4-8v12m5-15v18m5-14v10m4-7v4"})})})'
    new_wave = 'className:"kb-input-wave",onClick:()=>s("/voice"),"aria-label":"محادثة صوتية","data-testid":"button-home-voice-mode",children:c.jsxs("div",{className:"kb-wave-bars","aria-hidden":"true",children:[c.jsx("span",{className:"kb-wave-bar kb-wave-bar-1"},"wave-1"),c.jsx("span",{className:"kb-wave-bar kb-wave-bar-2"},"wave-2"),c.jsx("span",{className:"kb-wave-bar kb-wave-bar-3"},"wave-3"),c.jsx("span",{className:"kb-wave-bar kb-wave-bar-4"},"wave-4"),c.jsx("span",{className:"kb-wave-bar kb-wave-bar-5"},"wave-5")]})})'
    source, did_change = replace_once(source, old_wave, new_wave, "animated audio waveform icon")
    changed |= did_change

    source, did_change = replace_all(source, "KB للتسوق والشحن", "التسوق والشحن", "brand references")
    changed |= did_change
    ENTRY.write_text(source, encoding="utf-8")
    changed |= patch_html()

    # The entry is loaded with a palette query. Keep lazy 3D dependencies on
    # that same module identity to prevent a second React copy and invalid hooks.
    for name in ("Orb-Bm_qLAkp.js", "react-three-fiber.esm-sYP6ER8-.js", "ChromeLogo-BU19-cbJ.js"):
        path = ASSETS / name
        module = path.read_text(encoding="utf-8")
        module, did_change = replace_once(
            module,
            f'from"{ENTRY_IMPORT}"',
            f'from"{ENTRY_IMPORT_WITH_PALETTE}"',
            f"shared React import in {name}",
        )
        changed |= did_change
        path.write_text(module, encoding="utf-8")

    print("Applied KB reference design patch." if changed else "KB reference design patch already applied.")


if __name__ == "__main__":
    main()
