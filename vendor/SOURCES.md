# Vendored visual engines

The assistant orb renderer is based on [weeeha/AI-Orb](https://github.com/weeeha/AI-Orb), MIT licensed, inspected at commit `22ce1d007dcb20a541be2d71b7122d788b2f2c3a` (2026-11-07). The local source files in `ai-orb/src/` retain upstream structure and copyright/license text is in `ai-orb/LICENSE`. The `vessel` shader keeps its fixed glass shell; this project adds a small pointer-driven rotation response to its inner field and passes the existing microphone level into the upstream input-level hook.

The background GPU fluid engine is [michaelbrusegard/WebGL-Fluid-Enhanced](https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced), MIT licensed, version `0.8.0`, inspected at commit `81af32f77abd9360be1c63d368cd9be3759ab29f`. The locally vendored ESM package is in `webgl-fluid-enhanced/dist/index.es.js`; copyright/license text is in `webgl-fluid-enhanced/LICENSE`. Its source exposes mobile-resolution settings, fixed color palettes, transparency, and direct splat injection. This project connects local input events to those splats; no user text or audio is sent to the vendor.

These are implementation sources for individual visual effects, not the original source of the complete mobile app shown in the user's reference images. The reference images remain the visual target.


The face and gaze animation are adapted from [kochjar/orbling](https://github.com/kochjar/orbling), MIT licensed, inspected at commit `f76c4b8932f144dd2430a7ca6b475d603bd71652` (2026-11-07). Its original `src/orbling/orbling.css` is shipped as `orbling.css`, and the original `src/orbling/ball.tsx` markup plus copyright/license text are retained in `orbling/`. Only the original `orbling-eyes` layer is mounted over the already-vendored AI-Orb glass vessel; its shader heat is not loaded, so this adds no `@paper-design/shaders-react` runtime dependency.


The current assistant orb preview uses the [abektes/lumaform-orb](https://github.com/abektes/lumaform-orb) MIT package, version `0.3.1`, with its named `aqueous` engine and Three.js `0.160.0` (MIT). It renders the real refractive 3D sphere with a low, blue-violet glass palette; it is not claimed to be an exact match for the reference's interwoven rings. The upstream license texts and generated bundle are in `vendor/lumaform-orb/`; the small source entry is `tools/vendor-lumaform-entry.js`.

The composer preview uses the MIT free components [Libraries.dev Border Beam](https://github.com/Jakubantalik/Libraries.dev/tree/main/packages/border-beam) `1.4.1` and [Voice Ring](https://github.com/Jakubantalik/Libraries.dev/tree/main/packages/voice-ring) `0.2.0`. React `18.3.1` is bundled privately with the visual roots to avoid coupling to the store's React instance. Both components use only KB's existing text-input and audio-level UI; no microphone is requested and no Pro feature is included. Source, licenses and bundle are recorded in `vendor/libraries-dev/`.
