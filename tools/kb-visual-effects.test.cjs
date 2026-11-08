const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const orbRuntime = read('tools/kb-crystal-orb.js');
const libraryRuntime = read('tools/kb-libraries-effects.js');
const lumaformEntry = read('tools/vendor-lumaform-entry.js');
const fluidRuntime = read('tools/kb-fluid-background.js');
const orblingSource = read('vendor/orbling/ball.tsx');
const orblingCss = read('vendor/orbling/orbling.css');
const vendorNotes = read('vendor/SOURCES.md');
const css = read('brand/kb-ui-refresh.css');
const html = read('vercel-output/static/index.html');
const appBundle = read('vercel-output/static/assets/index-6ttDirym.js');

test('orb uses the real MIT Lumaform Aqueous engine with direct manipulation, reduced-motion support and local audio pulses', () => {
  assert.match(vendorNotes, /abektes\/lumaform-orb/);
  assert.match(vendorNotes, /MIT/);
  assert.match(lumaformEntry, /createOrb/);
  assert.match(lumaformEntry, /aqueous/);
  assert.match(orbRuntime, /import \{ createOrb, aqueous \} from "\.\/lumaform-aqueous\.js"/);
  assert.match(orbRuntime, /engines: \{ aqueous \}/);
  assert.match(orbRuntime, /controls: true/);
  assert.match(orbRuntime, /enableZoom: false/);
  assert.match(orbRuntime, /bodyColor: "#4a4fda"/);
  assert.match(orbRuntime, /transmission: 0\.92/);
  assert.match(orbRuntime, /window\.__kbOrbInputLevel/);
  assert.match(orbRuntime, /activeEngine\?\.onPulse\?\.\(\)/);
  assert.match(orbRuntime, /pointerdown/);
  assert.match(orbRuntime, /ArrowLeft/);
  assert.match(orbRuntime, /orb\.dispose\(\)/);
  assert.doesNotMatch(orbRuntime, /OrbRenderer|ai-orb-core/);
});

test('background uses the vendored GPU fluid engine and injects fixed-palette splats from mic and typing', () => {
  assert.match(vendorNotes, /https:\/\/github\.com\/michaelbrusegard\/WebGL-Fluid-Enhanced/);
  assert.match(fluidRuntime, /import WebGLFluidEnhanced from "\.\/webgl-fluid-enhanced\.js"/);
  assert.match(fluidRuntime, /new WebGLFluidEnhanced\(layer\)/);
  assert.match(fluidRuntime, /setConfig\(\{ colorPalette: \[color\], brightness: 0\.32 \}\)/, 'one fixed hue uses the engine’s normalized color path');
  assert.match(fluidRuntime, /splatAtLocation\(point\.x, point\.y, dx, dy\)/);
  assert.match(fluidRuntime, /splatRadius: 0\.2/);
  assert.match(fluidRuntime, /bloom: false/);
  assert.match(fluidRuntime, /colorPalette: palette/);
  assert.match(fluidRuntime, /window\.kbFluidAudio =/);
  assert.match(fluidRuntime, /document\.addEventListener\("input", onInput, true\)/);
  assert.match(fluidRuntime, /window\.__kbOrbInputLevel = audioLevel/);
  assert.doesNotMatch(fluidRuntime, /fetch\(|XMLHttpRequest|https?:\/\//, 'the local visual runtime does not fetch remote services');
  assert.match(appBundle, /window\.kbFluidAudio\?\.\(level\)/, 'existing mic meter reaches the background simulation');
});

test('Libraries.dev free MIT components decorate existing controls without requesting microphone access', () => {
  assert.match(vendorNotes, /border-beam/);
  assert.match(vendorNotes, /voice-ring/);
  assert.match(libraryRuntime, /from "border-beam"/);
  assert.match(libraryRuntime, /from "voice-ring"/);
  assert.match(libraryRuntime, /size: "line"/);
  assert.match(libraryRuntime, /colorVariant: "ocean"/);
  assert.match(libraryRuntime, /size: 60/);
  assert.match(libraryRuntime, /level: voiceLevel/);
  assert.match(libraryRuntime, /window\.__kbOrbOutputLevel/);
  assert.doesNotMatch(libraryRuntime, /useMicrophone|getUserMedia|mediaDevices/);
  assert.match(libraryRuntime, /active: !reducedMotion/);
  assert.match(libraryRuntime, /prefers-reduced-motion/);
  assert.match(libraryRuntime, /\.input-bar:not\(\.voice-pill-expanded\)/);
  assert.match(libraryRuntime, /\.voice-pill-trigger/);
});

test('build ships the selected vendored visual sources locally and carries upstream licenses', () => {
  assert.match(html, /assets\/kb-crystal-orb\.js\?orb=vessel-1/);
  assert.match(orbRuntime, /\.\/lumaform-aqueous\.js/);
  assert.match(html, /assets\/kb-libraries-effects\.js\?libraries=mit-1/);
  assert.match(html, /assets\/kb-fluid-background\.js\?fluid=webgl-1/);
  assert.match(html, /assets\/orbling\.css/);
  assert.equal(
    read('vercel-output/static/assets/lumaform-aqueous.js'),
    read('vendor/lumaform-orb/dist/lumaform-aqueous.js'),
  );
  assert.equal(
    read('vercel-output/static/assets/kb-libraries-effects.js'),
    read('vendor/libraries-dev/dist/kb-libraries-effects.js'),
  );
  assert.equal(
    read('vercel-output/static/assets/webgl-fluid-enhanced.js'),
    read('vendor/webgl-fluid-enhanced/dist/index.es.js'),
  );
  assert.equal(
    read('vercel-output/static/assets/orbling.css'),
    orblingCss,
  );
  assert.match(read('vendor/lumaform-orb/LICENSE'), /MIT License/);
  assert.match(read('vendor/lumaform-orb/THREE-LICENSE.txt'), /MIT License/);
  for (const license of [
    'vendor/libraries-dev/licenses/border-beam-MIT.txt',
    'vendor/libraries-dev/licenses/voice-ring-MIT.txt',
    'vendor/libraries-dev/licenses/react-MIT.txt',
    'vendor/libraries-dev/licenses/react-dom-MIT.txt',
    'vendor/libraries-dev/licenses/scheduler-MIT.txt',
    'vendor/libraries-dev/licenses/loose-envify-MIT.txt',
    'vendor/libraries-dev/licenses/js-tokens-MIT.txt',
  ]) assert.match(read(license), /MIT License/);
});

test('idle composer stays translucent blue-violet glass and the new effects do not take over controls', () => {
  const refreshed = css.slice(css.lastIndexOf('/* GitHub-backed WebGL field'));
  assert.match(refreshed, /\.app > \.kb-fluid-layer/);
  assert.match(refreshed, /z-index: -1 !important/);
  assert.match(refreshed, /#root \.app/);
  assert.doesNotMatch(refreshed, /\.app > \*:not\(\.kb-fluid-layer\)/, 'existing app positioning remains untouched');
  assert.match(refreshed, /\.input-bar:not\(\.voice-pill-expanded\)/);
  assert.match(refreshed, /rgba\(62, 91, 220, \.34\)/);
  assert.match(refreshed, /backdrop-filter: blur\(24px\) saturate\(1\.42\)/);
  assert.match(refreshed, /\.kb-input-add/);
  assert.match(refreshed, /\.kb-input-wave/);
  assert.match(css, /Libraries\.dev MIT interactive effects on existing controls/);
  assert.match(css, /\.kb-libraries-border-beam-host/);
  assert.match(css, /\.kb-libraries-voice-ring-host/);
  assert.match(css, /pointer-events: none !important/);
});

test('assistant home keeps the real navigation and input actions and the original Orbling eyes', () => {
  assert.match(appBundle, /kb-ref-statusbar/);
  assert.match(appBundle, /children:"9:41"/);
  assert.match(appBundle, /Smart Mode/);
  assert.match(appBundle, /Hello Alex/);
  assert.match(appBundle, /شن تبي تشحن/);
  assert.match(appBundle, /Ask anything\.\.\./);
  assert.match(appBundle, /button-profile/);
  assert.doesNotMatch(appBundle, /button-new-chat/);
  assert.match(appBundle, /button-home-attach/);
  assert.match(appBundle, /button-home-voice-mode/);
  assert.match(orbRuntime, /host\.replaceChildren\(\)/);
  assert.match(orbRuntime, /host\.append\(face\)/);
  assert.match(orbRuntime, /orbling orbling-face/);
  assert.match(orbRuntime, /orbling-eyes/);
  assert.match(orblingSource, /<span className="orbling-eyes">/);
  assert.match(orblingCss, /@keyframes orbling-look-around/);
  assert.match(vendorNotes, /kochjar\/orbling/);
  assert.match(css, /\.app:has\(\.kb-ref-copy\)/);
  assert.doesNotMatch(css, /\.kb-orb-face::(?:before|after)/);
  assert.match(css, /\.app:has\(\.kb-ref-copy\) > \[data-testid="chip-rows"\]/);
  assert.match(css, /direction: ltr/);
});

test('phone layout keeps the orb interactive and proportionate while suggestions remain swipeable', () => {
  assert.match(css, /Final phone-reference tuning/);
  assert.match(css, /width: clamp\(140px, 43\.3vw, 184px\) !important/);
  assert.match(css, /transform: translateY\(40px\) !important/);
  assert.match(css, /\.kb-ref-copy \.kb-greeting,[\s\S]*top: -46px/);
  assert.match(css, /height: 142px !important;\s*margin-top: 40px !important/);
  assert.match(css, /calc\(100% - 332px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /ellipse 55% 15% at 82% 90%/);
  assert.match(css, /\.app \.kb-orb-webgl \{[^}]*pointer-events: auto; touch-action: none/);
  assert.match(css, /\.app \.kb-orb-host\.kb-orb-dragging/);
  assert.doesNotMatch(css, /\.kb-orb-host\.kb-orb-fallback|\.kb-orb-webgl-fallback/);
  assert.doesNotMatch(css, /\.chip:nth-child\(n\s*\+\s*4\)/, 'suggestions remain available to swipe');
  assert.equal(
    fs.readFileSync(path.join(root, 'brand/kb-ui-refresh.css'), 'utf8'),
    fs.readFileSync(path.join(root, 'vercel-output/static/assets/kb-ui-refresh.css'), 'utf8'),
  );
});
