/*
 * Crystal-vessel orb for the KB store preview.
 * Adapted from the vessel finish in AI-Orb by Nick Vyhouski (MIT, 2026).
 * Original source: https://github.com/weeeha/AI-Orb/blob/main/src/shader.ts
 * The required MIT notice is preserved in /licenses/AI-Orb-MIT.txt.
 * This local WebGL 1 implementation has no runtime fetches or dependencies.
 */
(() => {
  "use strict";

  const vertexSource = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos * 0.5 + 0.5;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uC1;
    uniform vec3 uC2;
    uniform vec3 uC3;
    uniform vec3 uBody;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise2(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
      float value = 0.0, amplitude = 0.5;
      mat2 rot = mat2(0.8776, 0.4794, -0.4794, 0.8776);
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise2(p);
        p = rot * p * 2.02 + vec2(37.1, 11.7);
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      float time = uTime * 0.68;
      vec2 p = (vUv - 0.5) * 2.0;
      float r = length(p);
      float alpha = 1.0 - smoothstep(0.982, 1.0, r);
      float bulge = sqrt(max(1.0 - min(dot(p, p), 1.0), 0.0));
      vec3 normal = normalize(vec3(p, max(bulge, 0.001)));
      vec2 spherePoint = p / (bulge * 0.55 + 1.0);

      /* AI-Orb's vessel principle: the shell remains steady while three
         independent luminous contents drift and merge inside it. */
      vec3 acc = vec3(0.0);
      float field = 0.0;
      float spread = 0.26 + 0.035 * sin(time * 0.3);
      float mass = 0.158;
      for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float orbit = spread + 0.05 * sin(time * 0.37 + fi * 1.7);
        vec2 center = vec2(
          cos(time * 0.42 + fi * 2.094),
          sin(time * 0.35 + fi * 2.094)
        ) * orbit;
        float weight = mass / (dot(p - center, p - center) + 0.034);
        vec3 tint = fi < 0.5 ? uC1 : (fi < 1.5 ? uC2 : uC3);
        field += weight;
        acc += weight * tint;
      }
      vec3 inner = acc / max(field, 0.0001);
      float body = smoothstep(0.80, 2.10, field);
      vec3 color = mix(uBody, inner, body * 0.96);

      /* Soft, moving refractive ribbons create the folded-glass look from the
         supplied reference, without deforming the stable circular silhouette. */
      float flow = fbm(spherePoint * 2.8 + vec2(time * 0.08, -time * 0.05));
      float angle = atan(p.y, p.x);
      float wave = sin(angle * 1.65 - time * 0.52 + flow * 4.0);
      float ribbonRadius = 0.62 + 0.075 * wave + 0.026 * sin(spherePoint.x * 5.0 + time * 0.42);
      float ribbon = 1.0 - smoothstep(0.0, 0.055, abs(r - ribbonRadius));
      ribbon *= 1.0 - smoothstep(0.48, 1.0, r);
      vec3 ribbonTint = mix(uC2, uC3, 0.5 + 0.5 * sin(angle * 1.2 + time * 0.25));
      color += ribbonTint * ribbon * 0.58;

      float innerArc = 1.0 - smoothstep(0.0, 0.026, abs(r - (0.43 + 0.04 * sin(angle * 1.4 + time * 0.38))));
      innerArc *= (1.0 - smoothstep(0.40, 0.83, r)) * (0.25 + 0.2 * flow);
      color += mix(uC1, uC2, 0.58) * innerArc * 0.48;

      /* Transparent glass shell: cool Fresnel rim, caustic edge and one
         controlled specular highlight rather than a flat radial gradient. */
      float rim = smoothstep(0.72, 0.99, r) * (1.0 - smoothstep(0.965, 1.0, r));
      color += mix(vec3(0.42, 0.72, 0.98), vec3(0.42, 0.88, 1.0), 0.55) * rim * 0.58;
      color += vec3(0.78, 0.9, 1.0) * pow(1.0 - bulge, 8.0) * 0.18;
      vec3 lightDir = normalize(vec3(-0.40, 0.60, 0.69));
      float specular = pow(max(dot(normal, lightDir), 0.0), 46.0);
      color += vec3(1.0, 0.98, 1.0) * specular * 0.62;
      float glint = exp(-dot((p - vec2(-0.28, 0.36)) * vec2(3.8, 5.0), (p - vec2(-0.28, 0.36)) * vec2(3.8, 5.0)));
      color += vec3(0.7, 0.9, 1.0) * glint * 0.22;

      float grain = hash21(vUv * 780.0 + fract(uTime) * 91.0);
      color *= 1.0 - 0.035 * (grain - 0.5);
      gl_FragColor = vec4(clamp(color, 0.0, 1.0) * alpha, alpha);
    }
  `;

  const colors = {
    c1: [0.19, 0.55, 1.0],
    c2: [0.20, 0.88, 1.0],
    c3: [0.48, 0.42, 1.0],
    body: [0.012, 0.018, 0.050],
  };

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("[crystal-orb] shader compile failed", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function mount(host) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%;";
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) {
      host.classList.add("kb-orb-fallback");
      return () => { host.classList.remove("kb-orb-fallback"); canvas.remove(); };
    }

    const vs = compile(gl, gl.VERTEX_SHADER, vertexSource);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      host.classList.add("kb-orb-fallback");
      return () => { host.classList.remove("kb-orb-fallback"); canvas.remove(); };
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[crystal-orb] program link failed", gl.getProgramInfoLog(program));
      host.classList.add("kb-orb-fallback");
      return () => { gl.deleteProgram(program); canvas.remove(); host.classList.remove("kb-orb-fallback"); };
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const c1Loc = gl.getUniformLocation(program, "uC1");
    const c2Loc = gl.getUniformLocation(program, "uC2");
    const c3Loc = gl.getUniformLocation(program, "uC3");
    const bodyLoc = gl.getUniformLocation(program, "uBody");
    gl.uniform3fv(c1Loc, colors.c1);
    gl.uniform3fv(c2Loc, colors.c2);
    gl.uniform3fv(c3Loc, colors.c3);
    gl.uniform3fv(bodyLoc, colors.body);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let running = false;
    let intersecting = true;
    let destroyed = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resize() {
      if (destroyed) return;
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    function draw(seconds) {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function frame(now) {
      if (!running || destroyed) return;
      if (!document.hidden && intersecting) draw(now * 0.001);
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (destroyed || reducedMotion.matches || running || document.hidden || !intersecting) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    }

    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(host);
    else window.addEventListener("resize", resize);

    const intersectionObserver = typeof IntersectionObserver === "function"
      ? new IntersectionObserver((entries) => {
          intersecting = !!entries[0].isIntersecting;
          if (intersecting) start(); else stop();
        }, { rootMargin: "100px" })
      : null;
    if (intersectionObserver) intersectionObserver.observe(host);

    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    const onMotion = () => {
      if (reducedMotion.matches) { stop(); draw(1.25); }
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotion);
    canvas.addEventListener("webglcontextlost", (event) => { event.preventDefault(); stop(); });
    resize();
    if (reducedMotion.matches) draw(1.25); else start();

    return () => {
      destroyed = true;
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotion);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      canvas.remove();
    };
  }

  const mounted = new Map();
  function scan() {
    document.querySelectorAll(".kb-orb-host").forEach((host) => {
      if (!mounted.has(host)) mounted.set(host, mount(host));
    });
    for (const [host, unmount] of mounted) {
      if (!host.isConnected) { unmount(); mounted.delete(host); }
    }
  }

  function boot() {
    if (!document.body) return;
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    scan();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
