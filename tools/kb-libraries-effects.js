import React from "react";
import { createRoot } from "react-dom/client";
import { BorderBeam } from "border-beam";
import { VoiceRing } from "voice-ring";

const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const mounted = new Map();
const clamp = (value) => Math.min(1, Math.max(0, Number(value) || 0));
let observer;
let scanQueued = false;
let voiceTimer = null;

function voiceState() {
  if (clamp(window.__kbOrbOutputLevel) > 0.035) return "speaking";
  if (clamp(window.__kbOrbInputLevel) > 0.025) return "listening";
  return "idle";
}

function voiceLevel() {
  return Math.max(clamp(window.__kbOrbInputLevel), clamp(window.__kbOrbOutputLevel));
}

function mountBeam(bar) {
  if (bar.classList.contains("voice-pill-expanded")) return;
  if (bar.querySelector(":scope > .kb-libraries-border-beam-host")) return;

  const positionedByLayer = getComputedStyle(bar).position === "static";
  if (positionedByLayer) bar.classList.add("kb-libraries-border-beam-positioned");
  const host = document.createElement("div");
  host.className = "kb-libraries-border-beam-host";
  host.setAttribute("aria-hidden", "true");
  bar.prepend(host);

  const radius = Math.max(12, parseFloat(getComputedStyle(bar).borderTopLeftRadius) || 24);
  const root = createRoot(host);
  root.render(React.createElement(BorderBeam, {
    size: "line",
    colorVariant: "ocean",
    theme: "dark",
    strength: 0.42,
    duration: 3.1,
    staticColors: true,
    active: !reducedMotion,
    borderRadius: radius,
    className: "kb-libraries-border-beam",
    style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 },
  }, React.createElement("div", {
    "aria-hidden": true,
    style: { width: "100%", height: "100%", borderRadius: `${radius}px`, background: "transparent" },
  })));
  mounted.set(host, { root, owner: bar, type: "beam", positionedByLayer });
}

function mountVoiceRing(button) {
  if (button.querySelector(":scope > .kb-libraries-voice-ring-host")) return;

  const host = document.createElement("span");
  host.className = "kb-libraries-voice-ring-host";
  host.setAttribute("aria-hidden", "true");
  button.prepend(host);

  const root = createRoot(host);
  let currentState = voiceState();
  root.render(React.createElement(VoiceRing, {
    size: 60,
    state: currentState,
    level: voiceLevel,
    theme: "dark",
    paused: reducedMotion,
    sensitivity: 0.85,
  }));
  mounted.set(host, { root, owner: button, type: "voice", currentState });
}

function updateVoiceRings() {
  const nextState = voiceState();
  for (const [host, entry] of mounted) {
    if (entry.type !== "voice" || !host.isConnected || entry.currentState === nextState) continue;
    entry.currentState = nextState;
    entry.root.render(React.createElement(VoiceRing, {
      size: 60,
      state: nextState,
      level: voiceLevel,
      theme: "dark",
      paused: reducedMotion,
      sensitivity: 0.85,
    }));
  }
}

function scan() {
  scanQueued = false;
  for (const [host, entry] of mounted) {
    if (!host.isConnected || !entry.owner.isConnected) {
      entry.root.unmount();
      if (entry.positionedByLayer) entry.owner.classList.remove("kb-libraries-border-beam-positioned");
      mounted.delete(host);
    }
  }
  document.querySelectorAll(".input-bar:not(.voice-pill-expanded)").forEach(mountBeam);
  document.querySelectorAll(".voice-pill-trigger").forEach(mountVoiceRing);
}

function scheduleScan() {
  if (scanQueued) return;
  scanQueued = true;
  requestAnimationFrame(scan);
}

function start() {
  scan();
  observer = new MutationObserver(scheduleScan);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("hashchange", scheduleScan);
  voiceTimer = window.setInterval(updateVoiceRings, 180);
}

function stop() {
  observer?.disconnect();
  window.removeEventListener("hashchange", scheduleScan);
  if (voiceTimer !== null) window.clearInterval(voiceTimer);
  for (const { root } of mounted.values()) root.unmount();
  mounted.clear();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
window.addEventListener("pagehide", stop, { once: true });
