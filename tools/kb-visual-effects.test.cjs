const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const orbRuntime = read('tools/kb-crystal-orb.js');
const fluidRuntime = read('tools/kb-fluid-background.js');
const orbShader = read('vendor/ai-orb/src/shader.ts');
const orblingSource = read('vendor/orbling/ball.tsx');
const orblingCss = read('vendor/orbling/orbling.css');
const vendorNotes = read('vendor/SOURCES.md');
const css = read('brand/kb-ui-refresh.css');
const html = read('vercel-output/static/index.html');
const appBundle = read('vercel-output/static/assets/index-6ttDirym.js');

test('orb remains the GitHub WebGL vessel with local iris colors, microphone response, and direct manipulation', () => {
  assert.match(vendorNotes, /https:\/\/github\.com\/weeeha\/AI-Orb/);
  assert.match(vendorNotes, /MIT licensed/);
  assert.match(orbRuntime, /import \{ OrbRenderer, orbPalettes \} from "\.\/ai-orb-core\.js"/);
  assert.match(orbRuntime, /colors: orbPalettes\.iris\.dark/);
  assert.match(orbRuntime, /getInputLevel: \(\) => Number\(window\.__kbOrbInputLevel\)/);
  assert.match(orbRuntime, /renderer\.setPointer\(direction\.x, direction\.y, true\)/);
  assert.match(orbRuntime, /pointerdown/);
  assert.match(orbRuntime, /ArrowLeft/);
  assert.match(orbShader, /float dragAngle = uPtr \* uPointer\.x/);
  assert.match(orbShader, /0\.07 \* uIn/);
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

test('build ships GitHub visual sources locally and carries their upstream licenses', () => {
  assert.match(html, /assets\/kb-crystal-orb\.js\?orb=vessel-1/);
  assert.match(html, /assets\/kb-fluid-background\.js\?fluid=webgl-1/);
  assert.match(html, /assets\/orbling\.css/);
  assert.equal(
    fs.readFileSync(path.join(root, 'vercel-output/static/assets/ai-orb-core.js'), 'utf8'),
    fs.readFileSync(path.join(root, 'vendor/ai-orb/dist/ai-orb-core.js'), 'utf8'),
  );
  assert.equal(
    fs.readFileSync(path.join(root, 'vercel-output/static/assets/webgl-fluid-enhanced.js'), 'utf8'),
    fs.readFileSync(path.join(root, 'vendor/webgl-fluid-enhanced/dist/index.es.js'), 'utf8'),
  );
  assert.equal(
    fs.readFileSync(path.join(root, 'vercel-output/static/assets/orbling.css'), 'utf8'),
    orblingCss,
  );
  assert.match(read('vendor/ai-orb/LICENSE'), /MIT License/);
  assert.match(read('vendor/webgl-fluid-enhanced/LICENSE'), /MIT License/);
  assert.match(read('vendor/orbling/LICENSE'), /MIT License/);
});

test('idle composer is translucent blue-violet glass over the fluid canvas in its ordinary state', () => {
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
  assert.match(css, /--kb-orb-yaw/);
});

test('assistant home matches the supplied phone screen while keeping real navigation and input actions', () => {
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
  assert.match(orbRuntime, /replaceChildren\(canvas, face\)/);
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

test('phone reference tuning keeps the orb proportional and complete chips inside the screen', () => {
  assert.match(css, /Final phone-reference tuning/);
  assert.match(css, /width: clamp\(140px, 43\.3vw, 184px\) !important/);
  assert.match(css, /transform: translateY\(40px\) !important/);
  assert.match(css, /\.kb-ref-copy \.kb-greeting,[\s\S]*top: -46px/);
  assert.match(css, /height: 142px !important;\s*margin-top: 40px !important/);
  assert.match(css, /calc\(100% - 332px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /ellipse 55% 15% at 82% 90%/);
  assert.doesNotMatch(css, /\.chip:nth-child\(n\s*\+\s*4\)/, 'suggestions remain available to swipe');
  assert.equal(
    fs.readFileSync(path.join(root, 'brand/kb-ui-refresh.css'), 'utf8'),
    fs.readFileSync(path.join(root, 'vercel-output/static/assets/kb-ui-refresh.css'), 'utf8'),
  );
});
