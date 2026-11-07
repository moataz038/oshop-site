import WebGLFluidEnhanced from "./webgl-fluid-enhanced.js";

const palette = ["#2a85f5", "#59d4fc", "#9e6bfa"];
const instances = new Map();
const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const clamp01 = (value) => Math.min(1, Math.max(0, Number(value) || 0));
let audioLevel = 0;
let writingLevel = 0;
let lastAudioPulse = 0;
let lastTextPulse = 0;
let pulseIndex = 0;
let lastInputAt = 0;
let audioFadeTimer = 0;
let writingFadeTimer = 0;

function setLevel(name, value) {
  document.documentElement.style.setProperty(name, clamp01(value).toFixed(3));
}

function locationInApp(app, pageX, pageY) {
  const rect = app.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return {
    x: (pageX - rect.left) * dpr,
    y: pageY - rect.top,
  };
}

function inject(instance, pageX, pageY, dx, dy, color) {
  const fluid = instance.fluid;
  try {
    const point = locationInApp(instance.app, pageX, pageY);
    // The upstream HEXColor shortcut treats 8-bit channels as floats. Use its normalized palette path instead.
    fluid.setConfig({ colorPalette: [color], brightness: 0.32 });
    fluid.splatAtLocation(point.x, point.y, dx, dy);
  } catch (error) {
    instance.app.dataset.kbFluidStatus = "degraded";
  } finally {
    try {
      fluid.setConfig({ colorPalette: palette, brightness: 0.32 });
    } catch (error) {
      instance.app.dataset.kbFluidStatus = "degraded";
    }
  }
}

function pulseAtBottom(instance, level, color, phase) {
  const rect = instance.app.getBoundingClientRect();
  const t = performance.now() / 1100 + phase;
  const x = rect.left + rect.width * (0.5 + Math.sin(phase) * 0.28 + Math.sin(t) * 0.04);
  const y = rect.top + rect.height * (0.89 + 0.018 * Math.cos(t * 0.7));
  inject(instance, x, y, Math.cos(t) * (12 + level * 28), 18 + level * 28, color);
}

function mount(app) {
  const layer = document.createElement("div");
  layer.className = "kb-fluid-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.dataset.kbFluidLayer = "ready";
  app.insertBefore(layer, app.firstChild);

  try {
    const fluid = new WebGLFluidEnhanced(layer);
    fluid.setConfig({
      simResolution: 64,
      dyeResolution: 512,
      captureResolution: 256,
      densityDissipation: 0.985,
      velocityDissipation: 0.24,
      pressure: 0.82,
      pressureIterations: 12,
      curl: 18,
      splatRadius: 0.2,
      splatForce: 1200,
      shading: true,
      colorful: false,
      colorUpdateSpeed: 0,
      colorPalette: palette,
      hover: false,
      backgroundColor: "#03050b",
      transparent: true,
      brightness: 0.32,
      bloom: false,
      bloomIterations: 4,
      bloomResolution: 128,
      bloomIntensity: 0.24,
      bloomThreshold: 0.78,
      bloomSoftKnee: 0.58,
      sunrays: false,
    });
    fluid.start();
    const instance = { app, fluid };
    app.dataset.kbFluidStatus = "ready";

    requestAnimationFrame(() => {
      if (!app.isConnected) return;
      pulseAtBottom(instance, 0.56, palette[0], 0.1);
      pulseAtBottom(instance, 0.68, palette[2], 2.2);
      pulseAtBottom(instance, 0.48, palette[1], 4.1);
      if (reducedMotion) fluid.togglePause(true);
    });

    return {
      app,
      fluid,
      dispose() {
        fluid.stop();
        layer.remove();
        delete app.dataset.kbFluidStatus;
      },
    };
  } catch (error) {
    layer.remove();
    app.classList.add("kb-fluid-fallback");
    app.dataset.kbFluidStatus = "unsupported";
    return { app, fluid: null, dispose() {} };
  }
}

function scan() {
  for (const [app, instance] of instances) {
    if (!app.isConnected) {
      instance.dispose();
      instances.delete(app);
    }
  }
  document.querySelectorAll(".app").forEach((app) => {
    if (!instances.has(app)) instances.set(app, mount(app));
  });
}

function decayAudio() {
  audioLevel *= 0.68;
  window.__kbOrbInputLevel = audioLevel;
  setLevel("--kb-fluid-audio-level", audioLevel);
  if (audioLevel > 0.012) audioFadeTimer = window.setTimeout(decayAudio, 65);
  else {
    audioLevel = 0;
    window.__kbOrbInputLevel = 0;
    setLevel("--kb-fluid-audio-level", 0);
  }
}

function decayWriting() {
  writingLevel *= 0.68;
  setLevel("--kb-fluid-writing-level", writingLevel);
  if (writingLevel > 0.012) writingFadeTimer = window.setTimeout(decayWriting, 75);
  else {
    writingLevel = 0;
    setLevel("--kb-fluid-writing-level", 0);
  }
}

window.kbFluidAudio = (level) => {
  audioLevel = clamp01(level);
  window.__kbOrbInputLevel = audioLevel;
  setLevel("--kb-fluid-audio-level", audioLevel);
  window.clearTimeout(audioFadeTimer);
  const now = performance.now();
  if (audioLevel > 0) audioFadeTimer = window.setTimeout(decayAudio, 230);
  if (reducedMotion || audioLevel < 0.055 || now - lastAudioPulse < 145) return;
  lastAudioPulse = now;
  pulseIndex += 1;
  instances.forEach((instance) => {
    if (!instance.fluid) return;
    const color = palette[Math.min(2, Math.floor(audioLevel * 3))];
    pulseAtBottom(instance, audioLevel, color, pulseIndex * 0.71);
  });
};

function onInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  if (!target.closest(".app")) return;
  const length = target.value.trim().length;
  const now = performance.now();
  if (!length) {
    writingLevel = 0;
    window.clearTimeout(writingFadeTimer);
    setLevel("--kb-fluid-writing-level", 0);
    return;
  }

  const elapsed = lastInputAt ? now - lastInputAt : 380;
  lastInputAt = now;
  writingLevel = Math.max(writingLevel * 0.7, clamp01(0.22 + 0.44 * Math.min(1, 220 / Math.max(80, elapsed))));
  setLevel("--kb-fluid-writing-level", writingLevel);
  window.clearTimeout(writingFadeTimer);
  writingFadeTimer = window.setTimeout(decayWriting, 300);
  if (reducedMotion || now - lastTextPulse < 90) return;
  lastTextPulse = now;
  pulseIndex += 1;
  const rect = target.getBoundingClientRect();
  const color = palette[pulseIndex % palette.length];
  const strength = clamp01(writingLevel + Math.min(length, 28) * 0.008);
  instances.forEach((instance) => {
    if (!instance.fluid) return;
    const x = rect.left + rect.width * 0.55;
    const y = rect.top + rect.height * 0.52;
    inject(instance, x, y, Math.sin(pulseIndex * 0.9) * (8 + strength * 12), 16 + strength * 20, color);
  });
}

function start() {
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  document.addEventListener("input", onInput, true);
  setLevel("--kb-fluid-audio-level", audioLevel);
  setLevel("--kb-fluid-writing-level", writingLevel);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
