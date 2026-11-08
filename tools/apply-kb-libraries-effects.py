#!/usr/bin/env python3
"""Add the free Libraries.dev beam/ring layers to existing KB controls."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_PATHS = (
    ROOT / "brand/kb-ui-refresh.css",
    ROOT / "vercel-output/static/assets/kb-ui-refresh.css",
)
MARKER = "/* Libraries.dev MIT interactive effects on existing controls. */"
LIBRARIES_CSS = r'''/* Libraries.dev MIT interactive effects on existing controls. */
.app .input-bar.kb-libraries-border-beam-positioned { position: relative !important; }
.app .input-bar > .kb-libraries-border-beam-host {
  position: absolute !important;
  z-index: 0 !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  border-radius: inherit !important;
  pointer-events: none !important;
}
.app .input-bar > .kb-libraries-border-beam-host > * {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
}
.app .input-bar > *:not(.kb-libraries-border-beam-host) {
  position: relative;
  z-index: 1;
}
.app .kb-input-wave,
.app .voice-pill-trigger {
  position: relative !important;
  overflow: visible !important;
  isolation: isolate;
}
.app .kb-libraries-voice-ring-host {
  position: absolute !important;
  z-index: 0 !important;
  top: 50% !important;
  left: 50% !important;
  width: 60px !important;
  height: 60px !important;
  transform: translate(-50%, -50%) !important;
  opacity: .76;
  overflow: visible !important;
  mix-blend-mode: screen;
  pointer-events: none !important;
}
.app .kb-libraries-voice-ring-host canvas {
  display: block !important;
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  pointer-events: none !important;
}
.app .kb-input-wave > :not(.kb-libraries-voice-ring-host),
.app .voice-pill-trigger > :not(.kb-libraries-voice-ring-host) {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .app .kb-libraries-voice-ring-host { animation: none !important; }
}
'''


def main() -> None:
    changed = False
    for path in CSS_PATHS:
        css = path.read_text(encoding="utf-8")
        original = css
        # Camera controls now rotate the real Lumaform scene, not the DOM shell.
        css = css.replace(
            "  transform: perspective(620px) rotateX(var(--kb-orb-pitch, 0deg)) rotateY(var(--kb-orb-yaw, 0deg));\n"
            "  transform-style: preserve-3d;\n"
            "  transition: transform 110ms cubic-bezier(.2, .7, .25, 1);\n"
            "  will-change: transform;\n",
            "",
        )
        # Do not substitute a hand-drawn CSS sphere if the real WebGL asset fails.
        css = css.replace(
            ".kb-orb-host.kb-orb-fallback {\n"
            "  background:\n"
            "    radial-gradient(ellipse at 34% 29%, rgba(216, 246, 255, .92), transparent 12%),\n"
            "    radial-gradient(ellipse at 38% 38%, rgba(62, 168, 255, .9), rgba(87, 88, 255, .65) 33%, rgba(14, 22, 59, .78) 62%, rgba(7, 10, 24, .35) 74%, transparent 76%);\n"
            "  box-shadow: inset 0 0 18px rgba(222, 245, 255, .32), 0 0 44px rgba(59, 125, 255, .3);\n"
            "}\n\n",
            "",
        )
        css = css.replace(
            ".app .kb-orb-webgl-fallback { border-radius: 50%; background: radial-gradient(circle at 42% 34%, #9e6bfa 0%, #2a85f5 39%, rgba(7, 8, 14, .4) 72%, transparent 74%); }\n",
            "",
        )
        css = css.replace(
            ".app .kb-orb-webgl { display: block; width: 100%; height: 100%; pointer-events: none; }",
            ".app .kb-orb-webgl { display: block; width: 100%; height: 100%; pointer-events: auto; touch-action: none; }",
        )
        marker_index = css.rfind(MARKER)
        if marker_index >= 0:
            css = css[:marker_index].rstrip() + "\n\n" + LIBRARIES_CSS.rstrip() + "\n"
        else:
            css = css.rstrip() + "\n\n" + LIBRARIES_CSS.rstrip() + "\n"
        if css != original:
            path.write_text(css, encoding="utf-8")
            changed = True
    print("Applied Libraries.dev MIT effects." if changed else "Libraries.dev effects already applied.")


if __name__ == "__main__":
    main()
