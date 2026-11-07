# Vendored visual engines

The assistant orb renderer is based on [weeeha/AI-Orb](https://github.com/weeeha/AI-Orb), MIT licensed, inspected at commit `22ce1d007dcb20a541be2d71b7122d788b2f2c3a` (2026-11-07). The local source files in `ai-orb/src/` retain upstream structure and copyright/license text is in `ai-orb/LICENSE`. The `vessel` shader keeps its fixed glass shell; this project adds a small pointer-driven rotation response to its inner field and passes the existing microphone level into the upstream input-level hook.

The background GPU fluid engine is [michaelbrusegard/WebGL-Fluid-Enhanced](https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced), MIT licensed, version `0.8.0`, inspected at commit `81af32f77abd9360be1c63d368cd9be3759ab29f`. The locally vendored ESM package is in `webgl-fluid-enhanced/dist/index.es.js`; copyright/license text is in `webgl-fluid-enhanced/LICENSE`. Its source exposes mobile-resolution settings, fixed color palettes, transparency, and direct splat injection. This project connects local input events to those splats; no user text or audio is sent to the vendor.

These are implementation sources for individual visual effects, not the original source of the complete mobile app shown in the user's reference images. The reference images remain the visual target.
