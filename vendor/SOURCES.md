# Vendored visual engines

The assistant orb renderer is based on [weeeha/AI-Orb](https://github.com/weeeha/AI-Orb), MIT licensed, inspected at commit `22ce1d007dcb20a541be2d71b7122d788b2f2c3a` (2026-11-07). The local source files in `ai-orb/src/` retain upstream structure and copyright/license text is in `ai-orb/LICENSE`. This preview selects AI-Orb's original `aurora` finish, whose dark glass globe carries a broad blue-violet light band, and keeps the upstream iris palette. The app adds a pointer-driven response and passes the existing microphone level into the upstream input-level hook; it does not draw replacement orb geometry.

The background GPU fluid engine is [michaelbrusegard/WebGL-Fluid-Enhanced](https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced), MIT licensed, version `0.8.0`, inspected at commit `81af32f77abd9360be1c63d368cd9be3759ab29f`. The locally vendored ESM package is in `webgl-fluid-enhanced/dist/index.es.js`; copyright/license text is in `webgl-fluid-enhanced/LICENSE`. Its source exposes mobile-resolution settings, fixed color palettes, transparency, and direct splat injection. This project connects local input events to those splats; no user text or audio is sent to the vendor.

These are implementation sources for individual visual effects, not the original source of the complete mobile app shown in the user's reference images. The reference images remain the visual target.


The face and gaze animation are adapted from [kochjar/orbling](https://github.com/kochjar/orbling), MIT licensed, inspected at commit `f76c4b8932f144dd2430a7ca6b475d603bd71652` (2026-11-07). Its original `src/orbling/orbling.css` is shipped as `orbling.css`, and the original `src/orbling/ball.tsx` markup plus copyright/license text are retained in `orbling/`. Only the original `orbling-eyes` layer is mounted over AI-Orb; its shader heat is not loaded, so this adds no `@paper-design/shaders-react` runtime dependency.
