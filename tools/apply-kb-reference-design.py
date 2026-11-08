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
    if count == 0 and label == "replace previous orb with transparent WebGL vessel host" and 'className:"kb-orb-host"' in source:
        return source, False
    if count == 0 and label == "brand pill to smart mode" and 'className:"kb-ref-smart-mode"' in source:
        return source, False
    if count == 0 and label == "remove KB name from home greeting" and 'className:"kb-greeting"' in source:
        return source, False
    if count == 0 and label == "two-line localized shipping prompt" and 'children:[["شن تبي تشحن",""],["اليوم؟",""]]' in source:
        return source, False
    if count == 0 and label == "reference screen copy layout" and 'className:"kb-ref-copy relative z-10 px-6 text-center"' in source:
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
        (ROOT / "vendor/lumaform-orb/dist/lumaform-aqueous.js", ASSETS / "lumaform-aqueous.js"),
        (ROOT / "vendor/libraries-dev/dist/kb-libraries-effects.js", ASSETS / "kb-libraries-effects.js"),
        (ROOT / "tools/kb-fluid-background.js", ASSETS / "kb-fluid-background.js"),
        (ROOT / "vendor/ai-orb/dist/ai-orb-core.js", ASSETS / "ai-orb-core.js"),
        (ROOT / "vendor/webgl-fluid-enhanced/dist/index.es.js", ASSETS / "webgl-fluid-enhanced.js"),
        (ROOT / "vendor/orbling/orbling.css", ASSETS / "orbling.css"),
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
    ui_stylesheet = '<link rel="stylesheet" href="./assets/kb-ui-refresh.css">'
    orbling_stylesheet = '<link rel="stylesheet" href="./assets/orbling.css">'
    if source.count(ui_stylesheet) != 1:
        raise SystemExit(f"Expected exactly one refreshed UI stylesheet link, found {source.count(ui_stylesheet)}.")
    if orbling_stylesheet not in source:
        source = source.replace(ui_stylesheet, ui_stylesheet + "\n    " + orbling_stylesheet, 1)
        changed = True
    main_script = '<script type="module" crossorigin src="./assets/index-6ttDirym.js?palette=64a124f9d2"></script>'
    orb_script = '<script type="module" crossorigin src="./assets/kb-crystal-orb.js?orb=vessel-1"></script>'
    fluid_script = '<script type="module" crossorigin src="./assets/kb-fluid-background.js?fluid=webgl-1"></script>'
    effects_script = '<script type="module" crossorigin src="./assets/kb-libraries-effects.js?libraries=mit-1"></script>'
    if source.count(main_script) != 1:
        raise SystemExit(f"Expected exactly one main module script, found {source.count(main_script)}.")
    normalized = source
    for script in (orb_script, fluid_script, effects_script):
        normalized = re.sub(rf"(?m)^[ \t]*{re.escape(script)}[ \t]*(?:\r?\n|$)", "", normalized)
    scripts = "\n    ".join((main_script, orb_script, fluid_script, effects_script))
    normalized = normalized.replace(main_script, scripts, 1)
    normalized = re.sub(
        rf"({re.escape(main_script)}\r?\n    {re.escape(orb_script)}\r?\n    {re.escape(fluid_script)}\r?\n    {re.escape(effects_script)})(?:\r?\n[ \t]*(?=\r?\n))*",
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
            'placeholder:"اكتب سؤالك…","aria-label":"رسالتك","data-testid":"input-home"',
            'placeholder:"Ask anything...","aria-label":"رسالتك","data-testid":"input-home"',
            "neutral home input placeholder",
        ),
        (
            'className:"relative z-10 px-6 text-center",children:[c.jsxs(oe.div',
            'className:"kb-ref-copy relative z-10 px-6 text-center",children:[c.jsxs(oe.div',
            "reference screen copy layout",
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

    # Replace the old two-sided site navigation with the reference's status bar
    # and compact three-control assistant header. Route controls to existing app
    # screens/actions rather than adding decorative dead buttons.
    header_start = source.find('c.jsxs("div",{className:"safe-top relative z-10 px-4 pt-2 flex items-center justify-between"')
    if header_start >= 0:
        header_end = source.find(',c.jsx("div",{className:"flex-1"})', header_start)
        if header_end < 0:
            raise SystemExit("Could not locate the home screen spacer after its navigation header.")
        header = '''c.jsxs("div",{className:"kb-ref-statusbar", "aria-hidden":!0,children:[c.jsx("span",{children:"9:41"}),c.jsxs("div",{className:"kb-ref-status-icons",children:[c.jsx("svg",{width:"16",height:"12",viewBox:"0 0 20 14",fill:"currentColor",children:c.jsx("path",{d:"M1 12h2V8H1zm4 0h2V5H5zm4 0h2V2H9zm4 0h2V0h-2zm4 0h2V4h-2z"})}),c.jsx("svg",{width:"18",height:"14",viewBox:"0 0 20 16",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",children:c.jsx("path",{d:"M2 5.5C6.5 1.5 13.5 1.5 18 5.5M5 9c3-2.7 7-2.7 10 0m-6.8 3.3c1.1-.9 2.5-.9 3.6 0M10 14h.01"})}),c.jsx("span",{className:"kb-ref-battery",children:"70"})]})]}),c.jsxs("div",{className:"kb-ref-header relative z-10",children:[c.jsx("button",{type:"button",className:"kb-ref-icon",onClick:()=>s("/settings"),"aria-label":"القائمة","data-testid":"button-settings",children:c.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",children:c.jsx("path",{d:"M4 6h16M4 12h16M4 18h16"})})}),c.jsxs("button",{type:"button",className:"kb-ref-smart-mode",onClick:()=>s("/settings/appearance"),"aria-label":"Smart Mode",children:[c.jsx("span",{children:"Smart Mode"}),c.jsx("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:c.jsx("path",{d:"m7 10 5 5 5-5"})})]}),c.jsx("button",{type:"button",className:"kb-ref-icon kb-ref-edit",onClick:()=>{a.newThread(),s("/chat")},"aria-label":"محادثة جديدة","data-testid":"button-new-chat",children:c.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:c.jsx("path",{d:"M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"})})})]})'''
        source = source[:header_start] + header + source[header_end:]
        changed = True
    elif 'className:"kb-ref-header relative z-10"' not in source or 'className:"kb-ref-statusbar"' not in source:
        raise SystemExit("Could not locate the source home navigation header.")

    source, did_change = replace_once(
        source,
        'className:"kb-ref-smart-mode",onClick:()=>s("/settings/appearance"),"aria-label":"Smart Mode"',
        'className:"kb-ref-smart-mode","aria-label":"Smart Mode"',
        "keep Smart Mode as a visual-only pill",
    )
    changed |= did_change
    source, did_change = replace_once(
        source,
        'onClick:()=>{a.newThread(),s("/chat")},"aria-label":"محادثة جديدة","data-testid":"button-new-chat"',
        'onClick:()=>s("/profile"),"aria-label":"الملف الشخصي","data-testid":"button-profile"',
        "preserve the existing profile button behavior",
    )
    changed |= did_change

    # Use the reference's small plain greeting and two-line translated prompt.
    greeting_start = source.find('c.jsxs(oe.div,{className:"pill mx-auto !text-[0.8rem]"')
    if greeting_start >= 0:
        greeting_end = source.find(',c.jsx(oe.h1,', greeting_start)
        if greeting_end < 0:
            raise SystemExit("Could not locate the assistant title after its greeting.")
        greeting = 'c.jsx(oe.div,{className:"kb-greeting",initial:{y:12,opacity:0},animate:{y:0,opacity:1},transition:{...Oe,delay:.15},children:"Hello Alex"})'
        source = source[:greeting_start] + greeting + source[greeting_end:]
        changed = True
    elif 'className:"kb-greeting"' not in source:
        raise SystemExit("Could not locate the assistant greeting source.")

    title_start = source.find('children:[["أهلًا بك",""]')
    if title_start >= 0:
        title_end = source.find('].map(([x,C],A)=>', title_start)
        if title_end < 0:
            raise SystemExit("Could not locate the title word renderer.")
        source = source[:title_start] + 'children:[["شن تبي تشحن",""],["اليوم؟",""]]' + source[title_end + 1:]
        changed = True
    elif 'children:[["شن تبي تشحن",""],["اليوم؟",""]]' not in source:
        raise SystemExit("Could not locate the assistant title source.")

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
