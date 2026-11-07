const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const bundle = fs.readFileSync(path.join(root, 'vercel-output/static/assets/index-6ttDirym.js'), 'utf8');
const sourceCss = fs.readFileSync(path.join(root, 'brand/kb-ui-refresh.css'), 'utf8');
const outputCss = fs.readFileSync(path.join(root, 'vercel-output/static/assets/kb-ui-refresh.css'), 'utf8');

function count(pattern, value) {
  return (value.match(pattern) || []).length;
}

test('Voice Pill decorates the single existing recorder and keeps its controls', () => {
  assert.equal(count(/function Uy\(\)/g, bundle), 1, 'one shared recorder helper remains');
  assert.equal(count(/new MediaRecorder\(/g, bundle), 1, 'no second MediaRecorder is added');
  assert.equal(count(/navigator\.mediaDevices\.getUserMedia\(/g, bundle), 1, 'only the existing microphone acquisition call remains');

  assert.match(bundle, /className:"input-bar voice-pill-expanded !gap-2"/);
  assert.match(bundle, /className:"flex-1 flex items-center justify-center gap-\[3px\] h-\[30px\] overflow-hidden voice-pill-equalizer"/);
  assert.match(bundle, /voice-pill-bar/);
  assert.match(bundle, /voice-pill-timer/);
  assert.match(bundle, /data-testid":"button-voice"/);
  assert.match(bundle, /data-testid":"button-rec-cancel"/);
  assert.match(bundle, /data-testid":"button-rec-send"/);
  assert.match(bundle, /onClick:G,disabled:r\.busy,"aria-label":"سجّل رسالة صوتية"/);
  assert.match(bundle, /onClick:O,disabled:x==="sending","aria-label":"إلغاء التسجيل"/);
  assert.match(bundle, /onClick:ke,disabled:x==="sending","aria-label":"إرسال التسجيل"/);
  assert.match(bundle, /Wy\(A\)/, 'the recording duration still updates');
  assert.match(bundle, /v\.current\?\.level\(\)/, 'bars still respond to live microphone level');
  assert.match(bundle, /await \$y\(se\)/, 'the existing transcription path remains');
  assert.match(bundle, /r\.send\(de,void 0,"shipping",n\.persona/);
});

test('Voice Pill styling stays aligned with the blue-violet glass refresh', () => {
  assert.equal(sourceCss, outputCss, 'the build CSS mirror must stay byte-for-byte in sync');
  assert.match(sourceCss, /\/\* Voice Pill: glass expansion around the existing recorder\. \*\//);
  assert.match(sourceCss, /\.voice-pill-expanded/);
  assert.match(sourceCss, /\.voice-pill-equalizer/);
  assert.match(sourceCss, /kbVoicePillExpand/);
  assert.match(sourceCss, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(sourceCss.slice(sourceCss.indexOf('/* Voice Pill:'), sourceCss.length), /#c9a65f|#c6a75d|#9b7b3f/i);
});
