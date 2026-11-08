import { createOrb, aqueous } from "./lumaform-aqueous.js";

const instances = new Map();
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function createFace() {
  const face = document.createElement("span");
  face.className = "orbling orbling-face";
  face.dataset.act = "idle";
  face.dataset.palette = "night";
  face.setAttribute("aria-hidden", "true");
  const eyes = document.createElement("span");
  eyes.className = "orbling-eyes";
  eyes.append(document.createElement("i"), document.createElement("i"));
  face.append(eyes);
  return face;
}

function mount(host) {
  host.replaceChildren();
  host.removeAttribute("aria-hidden");
  host.setAttribute("role", "img");
  host.setAttribute("aria-label", "كرة مساعد زرقاء بنفسجية ثلاثية الأبعاد قابلة للتحريك");
  host.setAttribute("tabindex", "0");
  host.dataset.kbOrbMounted = "true";

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  let orb;
  try {
    orb = createOrb(host, {
      engines: { aqueous },
      engine: "aqueous",
      controls: true,
      enableZoom: false,
      autoStart: !reducedMotion,
      global: {
        exposure: 1.02,
        bloomStrength: 0.42,
        bloomRadius: 0.32,
        bloomThreshold: 0.28,
        autoRotate: !reducedMotion,
        autoRotateSpeed: 0.22,
        background: "#090b13",
        transparentBg: true,
        bgMode: "void",
      },
      params: {
        detail: 5,
        radius: 1.55,
        displaceOctaves: 2,
        displaceAmount: 0.045,
        displaceScale: 1.1,
        breatheSpeed: reducedMotion ? 0 : 0.22,
        breatheAmp: reducedMotion ? 0 : 0.018,
        driftSpeed: reducedMotion ? 0 : 0.12,
        pulseDeform: 0.22,
        bodyColor: "#4a4fda",
        coreColor: "#c0a5ff",
        transmission: 0.92,
        thickness: 0.78,
        ior: 1.38,
        roughness: 0.08,
        coreIntensity: 2.2,
        fresnelPower: 1.85,
      },
    });
  } catch {
    // Never replace a failed real 3D model with a hand-drawn orb.
    host.dataset.kbOrbFailed = "true";
    delete host.dataset.kbOrbMounted;
    return () => {};
  }

  const canvas = host.querySelector("canvas");
  if (canvas) {
    canvas.classList.add("kb-orb-webgl");
    canvas.setAttribute("aria-hidden", "true");
  }
  const face = createFace();
  host.append(face);

  let inputLevel = 0;
  let lastPulseAt = 0;
  const pulseTimer = reducedMotion ? null : window.setInterval(() => {
    const next = Math.max(Number(window.__kbOrbInputLevel) || 0, Number(window.__kbOrbOutputLevel) || 0);
    const now = performance.now();
    if (next >= 0.11 && next - inputLevel >= 0.025 && now - lastPulseAt > 280) {
      // This is the same engine event that Lumaform uses for direct canvas taps;
      // it consumes the level already measured by KB and opens no new microphone.
      orb.runtime?.activeEngine?.onPulse?.();
      lastPulseAt = now;
    }
    inputLevel = next;
  }, 80);

  const stillChange = () => { if (reducedMotion) orb.runtime.render(); };
  if (reducedMotion) {
    orb.runtime.render();
    orb.runtime.controls?.addEventListener("change", stillChange);
  }

  function onPointerDown(event) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    host.dataset.kbOrbDragging = "true";
    host.classList.add("kb-orb-dragging");
  }
  function onPointerEnd() {
    delete host.dataset.kbOrbDragging;
    host.classList.remove("kb-orb-dragging");
  }
  function onKeyDown(event) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    const runtime = orb.runtime;
    const camera = runtime.camera;
    const target = runtime.controlsTarget;
    const dx = camera.position.x - target.x;
    const dy = camera.position.y - target.y;
    const dz = camera.position.z - target.z;
    const distance = Math.max(0.01, Math.hypot(dx, dy, dz));
    const step = (event.shiftKey ? 20 : 10) * Math.PI / 180;
    let yaw = Math.atan2(dx, dz);
    let pitch = Math.asin(clamp(dy / distance, -1, 1));
    if (event.key === "ArrowLeft") yaw -= step;
    else if (event.key === "ArrowRight") yaw += step;
    else if (event.key === "ArrowUp") pitch = clamp(pitch + step, -0.56, 0.56);
    else if (event.key === "ArrowDown") pitch = clamp(pitch - step, -0.56, 0.56);
    const horizontal = distance * Math.cos(pitch);
    camera.position.set(target.x + horizontal * Math.sin(yaw), target.y + distance * Math.sin(pitch), target.z + horizontal * Math.cos(yaw));
    runtime.controls?.update();
    if (reducedMotion) runtime.render();
    event.preventDefault();
  }

  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerEnd);
  host.addEventListener("pointercancel", onPointerEnd);
  host.addEventListener("lostpointercapture", onPointerEnd);
  host.addEventListener("keydown", onKeyDown);

  return () => {
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointerup", onPointerEnd);
    host.removeEventListener("pointercancel", onPointerEnd);
    host.removeEventListener("lostpointercapture", onPointerEnd);
    host.removeEventListener("keydown", onKeyDown);
    if (pulseTimer !== null) window.clearInterval(pulseTimer);
    if (reducedMotion) orb.runtime.controls?.removeEventListener("change", stillChange);
    orb.dispose();
    host.replaceChildren();
    delete host.dataset.kbOrbMounted;
  };
}

function scan() {
  for (const [host, dispose] of instances) {
    if (!host.isConnected) {
      dispose();
      instances.delete(host);
    }
  }
  document.querySelectorAll(".kb-orb-host").forEach((host) => {
    if (!instances.has(host) && host.dataset.kbOrbFailed !== "true") instances.set(host, mount(host));
  });
}

function start() {
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
