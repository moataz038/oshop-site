import { OrbRenderer, orbPalettes } from "./ai-orb-core.js";

const instances = new Map();
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function mount(host) {
  const canvas = document.createElement("canvas");
  canvas.className = "kb-orb-webgl";
  canvas.setAttribute("aria-hidden", "true");
  const face = document.createElement("span");
  face.className = "orbling orbling-face";
  face.dataset.act = "idle";
  face.dataset.palette = "night";
  face.setAttribute("aria-hidden", "true");
  const eyes = document.createElement("span");
  eyes.className = "orbling-eyes";
  eyes.append(document.createElement("i"), document.createElement("i"));
  face.append(eyes);
  host.replaceChildren(canvas, face);
  host.removeAttribute("aria-hidden");
  host.setAttribute("role", "img");
  host.setAttribute("aria-label", "كرة زجاجية ثلاثية الأبعاد تفاعلية");
  host.setAttribute("tabindex", "0");
  host.dataset.kbOrbMounted = "true";

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const renderer = new OrbRenderer(
    canvas,
    {
      finish: "vessel",
      field: "dark",
      colors: orbPalettes.iris.dark,
      state: "idle",
      grain: 0.035,
      seed: 0.27,
      speed: reducedMotion ? 0.35 : 0.82,
      still: reducedMotion,
    },
    {
      getInputLevel: () => Number(window.__kbOrbInputLevel) || 0,
      getOutputLevel: () => Number(window.__kbOrbOutputLevel) || 0,
    },
  );

  if (renderer.supported) {
    if (reducedMotion) renderer.renderStill(6);
    else renderer.start();
  } else {
    host.classList.add("kb-orb-webgl-fallback");
  }

  let dragging = false;
  let activePointer = null;
  let lastX = 0;
  let lastY = 0;
  let yaw = 0;
  let pitch = 0;
  let direction = { x: 0, y: 0 };

  function updateDirection(event) {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    direction = {
      x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
      y: clamp((0.5 - (event.clientY - rect.top) / rect.height) * 2, -1, 1),
    };
    if (renderer.supported) renderer.setPointer(direction.x, direction.y, true);
  }

  function onPointerDown(event) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragging = true;
    activePointer = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    host.dataset.kbOrbDragging = "true";
    host.classList.add("kb-orb-dragging");
    host.setPointerCapture?.(event.pointerId);
    updateDirection(event);
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (!dragging || event.pointerId !== activePointer) return;
    yaw = ((yaw + (event.clientX - lastX) * 0.56) % 360 + 360) % 360;
    pitch = clamp(pitch - (event.clientY - lastY) * 0.34, -34, 34);
    lastX = event.clientX;
    lastY = event.clientY;
    host.style.setProperty("--kb-orb-yaw", `${yaw.toFixed(1)}deg`);
    host.style.setProperty("--kb-orb-pitch", `${pitch.toFixed(1)}deg`);
    updateDirection(event);
    event.preventDefault();
  }

  function onPointerEnd(event) {
    if (!dragging || event.pointerId !== activePointer) return;
    dragging = false;
    activePointer = null;
    delete host.dataset.kbOrbDragging;
    host.classList.remove("kb-orb-dragging");
    if (host.hasPointerCapture?.(event.pointerId)) host.releasePointerCapture(event.pointerId);
    // Keep the shader's last direction as the new globe orientation after release.
    if (renderer.supported) renderer.setPointer(direction.x, direction.y, true);
  }

  function onKeyDown(event) {
    const step = event.shiftKey ? 20 : 10;
    if (event.key === "ArrowLeft") yaw -= step;
    else if (event.key === "ArrowRight") yaw += step;
    else if (event.key === "ArrowUp") pitch = clamp(pitch - step, -34, 34);
    else if (event.key === "ArrowDown") pitch = clamp(pitch + step, -34, 34);
    else return;
    event.preventDefault();
    host.style.setProperty("--kb-orb-yaw", `${yaw.toFixed(1)}deg`);
    host.style.setProperty("--kb-orb-pitch", `${pitch.toFixed(1)}deg`);
    direction = { x: clamp(yaw / 70, -1, 1), y: clamp(-pitch / 55, -1, 1) };
    if (renderer.supported) renderer.setPointer(direction.x, direction.y, true);
  }

  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerup", onPointerEnd);
  host.addEventListener("pointercancel", onPointerEnd);
  host.addEventListener("keydown", onKeyDown);

  return () => {
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerup", onPointerEnd);
    host.removeEventListener("pointercancel", onPointerEnd);
    host.removeEventListener("keydown", onKeyDown);
    if (renderer.supported) renderer.destroy();
    canvas.remove();
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
    if (!instances.has(host)) instances.set(host, mount(host));
  });
}

function start() {
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
