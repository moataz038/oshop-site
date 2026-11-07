#!/usr/bin/env python3
"""Style the existing chat recorder as a glass Voice Pill without new capture logic."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / "vercel-output/static/assets/index-6ttDirym.js"
CSS_PATHS = (
    ROOT / "brand/kb-ui-refresh.css",
    ROOT / "vercel-output/static/assets/kb-ui-refresh.css",
)
CSS_MARKER = "/* Voice Pill: glass expansion around the existing recorder. */"
VOICE_PILL_CSS = r'''/* Voice Pill: glass expansion around the existing recorder. */
.voice-pill-trigger {
  border: 1px solid rgba(220, 235, 255, .24) !important;
  box-shadow: 0 0 22px rgba(108, 131, 255, .4), 0 1px 0 rgba(255, 255, 255, .42) inset !important;
}

.voice-pill-expanded {
  gap: 8px !important;
  padding: 5px !important;
  border-color: rgba(190, 211, 255, .3) !important;
  background: linear-gradient(118deg, rgba(68, 83, 184, .62), rgba(46, 143, 190, .38) 56%, rgba(111, 80, 189, .55)) !important;
  box-shadow: 0 12px 34px rgba(12, 28, 84, .34), 0 0 24px rgba(105, 132, 255, .16), 0 1px 0 rgba(255, 255, 255, .22) inset !important;
  -webkit-backdrop-filter: blur(20px) saturate(1.22);
  backdrop-filter: blur(20px) saturate(1.22);
  transform-origin: right center;
  animation: kbVoicePillExpand .38s cubic-bezier(.22, 1, .36, 1) both;
}

.voice-pill-expanded [data-testid="button-rec-cancel"] {
  flex: 0 0 34px;
  border: 1px solid rgba(210, 225, 255, .2);
  color: rgba(242, 247, 255, .92);
  background: rgba(11, 19, 49, .34);
}

.voice-pill-dot {
  flex: 0 0 10px;
  box-shadow: 0 0 12px rgba(117, 216, 255, .78);
}

.voice-pill-timer {
  flex: 0 0 38px;
  color: #f7f9ff;
  text-shadow: 0 0 12px rgba(150, 190, 255, .38);
}

.voice-pill-equalizer {
  min-width: 0;
  height: 34px !important;
  padding: 0 8px;
  border: 1px solid rgba(205, 223, 255, .18);
  border-radius: 999px;
  background: linear-gradient(100deg, rgba(19, 30, 85, .32), rgba(75, 106, 195, .18), rgba(25, 77, 110, .28));
  box-shadow: 0 1px 0 rgba(255, 255, 255, .12) inset, 0 0 16px rgba(96, 152, 255, .1);
}

.voice-pill-equalizer i.voice-pill-bar {
  flex: 0 1 3px;
  min-height: 3px;
  max-height: 26px;
  background: linear-gradient(180deg, #d8f7ff 0%, var(--accent-2) 45%, var(--accent) 100%) !important;
  box-shadow: 0 0 8px rgba(125, 205, 255, .56);
}

.voice-pill-expanded [data-testid="button-rec-send"] {
  flex: 0 0 42px;
  box-shadow: 0 0 22px rgba(109, 135, 255, .36), 0 1px 0 rgba(255, 255, 255, .32) inset;
}

@keyframes kbVoicePillExpand {
  0% { opacity: .7; transform: scaleX(.78); filter: blur(3px); }
  70% { opacity: 1; transform: scaleX(1.018); filter: blur(0); }
  100% { opacity: 1; transform: scaleX(1); }
}

@media (max-width: 360px) {
  .voice-pill-expanded { gap: 6px !important; }
  .voice-pill-equalizer { padding-inline: 5px; gap: 2px !important; }
}

@media (prefers-reduced-motion: reduce) {
  .voice-pill-expanded { animation: none !important; }
  .voice-pill-expanded .voice-pill-equalizer i { transition: none !important; }
}
'''


def replace_once(source: str, old: str, new: str, label: str) -> tuple[str, bool]:
    count = source.count(old)
    if count == 1:
        return source.replace(old, new, 1), True
    if count == 0 and new in source:
        return source, False
    raise SystemExit(f"Expected exactly one {label} marker, found {count}.")


def main() -> None:
    source = ENTRY.read_text(encoding="utf-8")
    patches = [
        (
            'className:"input-bar !gap-2",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:Oe,"data-testid":"recording-bar"',
            'className:"input-bar voice-pill-expanded !gap-2",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:Oe,"data-testid":"recording-bar"',
            "existing recorder capsule",
        ),
        (
            'className:"w-2.5 h-2.5 rounded-full shrink-0",style:{background:"#ef4444"}',
            'className:"w-2.5 h-2.5 rounded-full shrink-0 voice-pill-dot",style:{background:"var(--accent-2)"}',
            "live recording indicator",
        ),
        (
            'className:"text-[0.85rem] tabular-nums w-[38px]",children:Wy(A)',
            'className:"text-[0.85rem] tabular-nums w-[38px] voice-pill-timer",children:Wy(A)',
            "recording timer",
        ),
        (
            'className:"flex-1 flex items-center justify-center gap-[3px] h-[30px] overflow-hidden","aria-hidden":!0,children:x==="sending"?',
            'className:"flex-1 flex items-center justify-center gap-[3px] h-[30px] overflow-hidden voice-pill-equalizer","aria-hidden":!0,children:x==="sending"?',
            "live equalizer capsule",
        ),
        (
            'L.map((se,de)=>c.jsx("i",{className:"block w-[3px] rounded-full",style:{height:4+se*26,background:"var(--accent)",opacity:.55+se*.45,transition:"height .09s"}},de))',
            'L.map((se,de)=>c.jsx("i",{className:"block w-[3px] rounded-full voice-pill-bar",style:{height:4+se*26,background:"var(--accent)",opacity:.55+se*.45,transition:"height .09s"}},de))',
            "existing audio-level bars",
        ),
        (
            'className:"round round-accent !w-[42px] !h-[42px]",whileTap:{scale:.9},onClick:G,disabled:r.busy,"aria-label":"سجّل رسالة صوتية","data-testid":"button-voice"',
            'className:"round round-accent voice-pill-trigger !w-[42px] !h-[42px]",whileTap:{scale:.9},onClick:G,disabled:r.busy,"aria-label":"سجّل رسالة صوتية","data-testid":"button-voice"',
            "existing chat microphone button",
        ),
        (
            'className:"round round-accent !w-[42px] !h-[42px]",whileTap:{scale:.9},onClick:()=>s("/voice"),"aria-label":"كلّم الوكيل بصوتك","data-testid":"button-home-voice"',
            'className:"round round-accent voice-pill-trigger !w-[42px] !h-[42px]",whileTap:{scale:.9},onClick:()=>s("/voice"),"aria-label":"كلّم الوكيل بصوتك","data-testid":"button-home-voice"',
            "existing welcome microphone button",
        ),
    ]
    changed = False
    for old, new, label in patches:
        source, did_change = replace_once(source, old, new, label)
        changed |= did_change
    ENTRY.write_text(source, encoding="utf-8")

    for path in CSS_PATHS:
        original = path.read_text(encoding="utf-8")
        css = original
        if CSS_MARKER not in css:
            css = css.rstrip() + "\n\n" + VOICE_PILL_CSS.rstrip() + "\n"
        else:
            css = css.rstrip() + "\n"
        if css != original:
            path.write_text(css, encoding="utf-8")
            changed = True
    print("Applied Voice Pill styling to the existing recorder." if changed else "Voice Pill styling already applied.")


if __name__ == "__main__":
    main()
