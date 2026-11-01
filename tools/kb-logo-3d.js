/*
 * Smooth KB gold-only extrusion generated from the official profile contours.
 * The front is triangulated only inside the gold shapes; every contour edge has
 * a real gold side wall. Empty spaces stay transparent, never a rectangular plate.
 */
(() => {
  "use strict";

  const selector = 'img[src*="kb-gold-only.png"]:not([data-kb-logo3d-layer="true"]), img[src*="kb-hero.webp"]:not([data-kb-logo3d-layer="true"])';
  const scriptUrl = document.currentScript ? document.currentScript.src : location.href;
  const goldLogoUrl = new URL("./img/kb-gold-only.png", scriptUrl).href;
  const geometryUrl = new URL("./kb-gold-geometry.json", scriptUrl).href;
  const states = new WeakMap();
  const RELIEF_DEPTH = 0.105;

  const vertexShader = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aUv;
    uniform float uAngleX;
    uniform float uAngleY;
    uniform float uAngleZ;
    uniform float uScale;
    uniform float uBob;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      float cy = cos(uAngleY), sy = sin(uAngleY);
      vec3 p = vec3(cy * aPosition.x + sy * aPosition.z,
                    aPosition.y,
                    -sy * aPosition.x + cy * aPosition.z);
      vec3 n = vec3(cy * aNormal.x + sy * aNormal.z,
                    aNormal.y,
                    -sy * aNormal.x + cy * aNormal.z);
      float cx = cos(uAngleX), sx = sin(uAngleX);
      p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
      n = vec3(n.x, cx * n.y - sx * n.z, sx * n.y + cx * n.z);
      float cz = cos(uAngleZ), sz = sin(uAngleZ);
      p = vec3(cz * p.x - sz * p.y, sz * p.x + cz * p.y, p.z);
      n = vec3(cz * n.x - sz * n.y, sz * n.x + cz * n.y, n.z);
      vNormal = normalize(n);
      vPosition = p;
      vUv = aUv;
      float cameraDepth = 3.45 - p.z;
      gl_Position = vec4(p.x * uScale,
                         p.y * uScale + uBob,
                         -p.z * 0.16,
                         cameraDepth);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    uniform sampler2D uTexture;
    uniform int uUseTexture;
    uniform vec3 uSideColor;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec4 sampleColor = vec4(1.0);
      if (uUseTexture == 1) {
        sampleColor = texture2D(uTexture, vUv);
        if (sampleColor.a < 0.025) discard;
      }
      vec3 base = (uUseTexture == 1) ? sampleColor.rgb : uSideColor;
      vec3 n = normalize(vNormal);
      vec3 lightDirection = normalize(vec3(-0.28, 0.50, 0.82));
      vec3 viewDirection = normalize(vec3(0.0, 0.0, 3.45) - vPosition);
      vec3 halfVector = normalize(lightDirection + viewDirection);
      float diffuse = 0.48 + 0.52 * max(dot(n, lightDirection), 0.0);
      float shininess = (uUseTexture == 1) ? 38.0 : 28.0;
      float specular = pow(max(dot(n, halfVector), 0.0), shininess);
      float movingGleam = pow(max(0.0, 1.0 - abs(vUv.x - fract(uTime * 0.075))), 20.0);
      float specStrength = (uUseTexture == 1) ? 0.18 : 0.40;
      vec3 goldHighlight = vec3(1.0, 0.91, 0.62);
      vec3 color = base * diffuse + goldHighlight * (specular * specStrength + movingGleam * 0.10);
      float alpha = (uUseTexture == 1) ? sampleColor.a : 1.0;
      gl_FragColor = vec4(min(color, vec3(1.0)), alpha);
    }
  `;

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || "shader compile failed";
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }

  function makeProgram(gl) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "program link failed");
    }
    return {
      program,
      position: gl.getAttribLocation(program, "aPosition"),
      normal: gl.getAttribLocation(program, "aNormal"),
      uv: gl.getAttribLocation(program, "aUv"),
      angleX: gl.getUniformLocation(program, "uAngleX"),
      angleY: gl.getUniformLocation(program, "uAngleY"),
      angleZ: gl.getUniformLocation(program, "uAngleZ"),
      scale: gl.getUniformLocation(program, "uScale"),
      bob: gl.getUniformLocation(program, "uBob"),
      texture: gl.getUniformLocation(program, "uTexture"),
      useTexture: gl.getUniformLocation(program, "uUseTexture"),
      sideColor: gl.getUniformLocation(program, "uSideColor"),
      time: gl.getUniformLocation(program, "uTime"),
    };
  }

  function buildExtrudedMesh(data) {
    if (!data || data.version !== 1 || !Array.isArray(data.frontUVs) || !Array.isArray(data.sideSegments)) {
      throw new Error("The smooth KB geometry file is invalid");
    }
    if (!data.frontUVs.length || data.frontUVs.length % 6 !== 0 || data.sideSegments.length % 6 !== 0) {
      throw new Error("The smooth KB geometry arrays are incomplete");
    }
    const aspect = Number(data.aspect);
    const floatsPerVertex = 8;
    const front = new Float32Array((data.frontUVs.length / 2) * floatsPerVertex);
    let fp = 0;
    for (let i = 0; i < data.frontUVs.length; i += 2) {
      const u = Number(data.frontUVs[i]);
      const v = Number(data.frontUVs[i + 1]);
      const x = (2 * u - 1) * aspect;
      const y = 2 * v - 1;
      front[fp++] = x;
      front[fp++] = y;
      front[fp++] = RELIEF_DEPTH + 0.001;
      front[fp++] = 0;
      front[fp++] = 0;
      front[fp++] = 1;
      front[fp++] = u;
      front[fp++] = v;
    }

    const sideEdgeCount = data.sideSegments.length / 6;
    const sides = new Float32Array(sideEdgeCount * 6 * floatsPerVertex);
    let sp = 0;
    const putVertex = (x, y, z, nx, ny, nz, u, v) => {
      sides[sp++] = x;
      sides[sp++] = y;
      sides[sp++] = z;
      sides[sp++] = nx;
      sides[sp++] = ny;
      sides[sp++] = nz;
      sides[sp++] = u;
      sides[sp++] = v;
    };
    const putTriangle = (a, b, c, normal) => {
      putVertex(a[0], a[1], a[2], normal[0], normal[1], normal[2], a[3], a[4]);
      putVertex(b[0], b[1], b[2], normal[0], normal[1], normal[2], b[3], b[4]);
      putVertex(c[0], c[1], c[2], normal[0], normal[1], normal[2], c[3], c[4]);
    };
    for (let i = 0; i < data.sideSegments.length; i += 6) {
      const u0 = Number(data.sideSegments[i]);
      const v0 = Number(data.sideSegments[i + 1]);
      const u1 = Number(data.sideSegments[i + 2]);
      const v1 = Number(data.sideSegments[i + 3]);
      const nx = Number(data.sideSegments[i + 4]);
      const ny = Number(data.sideSegments[i + 5]);
      const a = [(2 * u0 - 1) * aspect, 2 * v0 - 1, 0, u0, 0];
      const b = [(2 * u1 - 1) * aspect, 2 * v1 - 1, 0, u1, 0];
      const topB = [b[0], b[1], RELIEF_DEPTH, u1, 1];
      const topA = [a[0], a[1], RELIEF_DEPTH, u0, 1];
      const normal = [nx, ny, 0];
      putTriangle(a, b, topB, normal);
      putTriangle(a, topB, topA, normal);
    }
    return {
      front,
      sides,
      aspect,
      frontVertexCount: front.length / floatsPerVertex,
      sideVertexCount: sides.length / floatsPerVertex,
      groups: Number(data.groups) || 0,
    };
  }

  function makeBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
  }

  function logoPlacement(parent) {
    const rect = parent.getBoundingClientRect();
    const above = parent.parentElement;
    const homeHero = parent.classList.contains("absolute")
      || Boolean(above && above.classList.contains("canvas-wrap") && above.classList.contains("absolute"));
    const ratio = homeHero ? 0.67 : 0.84;
    const side = Math.max(1, Math.min(rect.width * ratio, rect.height * ratio, (window.innerWidth || rect.width) * 0.88));
    const centerY = rect.top + rect.height * (homeHero ? 0.54 : 0.50);
    return {
      left: rect.left + rect.width / 2 - side / 2,
      top: centerY - side / 2,
      side,
    };
  }

  function bindAttributes(gl, info, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const stride = 8 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(info.position);
    gl.vertexAttribPointer(info.position, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(info.normal);
    gl.vertexAttribPointer(info.normal, 3, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(info.uv);
    gl.vertexAttribPointer(info.uv, 2, gl.FLOAT, false, stride, 6 * Float32Array.BYTES_PER_ELEMENT);
  }

  function cleanup(resources, img, canvas, parent) {
    resources.running = false;
    if (resources.frame) cancelAnimationFrame(resources.frame);
    if (resources.resizeObserver) resources.resizeObserver.disconnect();
    if (resources.domObserver) resources.domObserver.disconnect();
    window.removeEventListener("resize", resources.resize);
    window.removeEventListener("scroll", resources.resize, true);
    canvas.removeEventListener("pointerdown", resources.pointerDown);
    canvas.removeEventListener("pointermove", resources.pointerMove);
    canvas.removeEventListener("pointerup", resources.pointerUp);
    canvas.removeEventListener("pointercancel", resources.pointerUp);
    canvas.__kbWebGLContext = null;
    canvas.__kbMeshResources = null;
    canvas.remove();
    img.style.visibility = "";
  }

  function installCssExtrusion(img) {
    if (!img.isConnected || !img.parentElement || img.__kbCssExtrusion) return;
    const parent = img.parentElement;
    if (!document.getElementById("kb-gold-extrusion-style")) {
      const style = document.createElement("style");
      style.id = "kb-gold-extrusion-style";
      style.textContent = `
        @keyframes kbGoldExtrusionFloat {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(0deg) rotateY(3deg); }
          50% { transform: rotateX(0deg) rotateY(0deg); }
          75% { transform: rotateX(0deg) rotateY(-3deg); }
        }
      `;
      document.head.appendChild(style);
    }
    const stage = document.createElement("div");
    stage.dataset.kbGoldCssExtrusion = "true";
    stage.setAttribute("role", "img");
    stage.setAttribute("aria-label", "شعار KB الذهبي مجسّم ومتحرك بخلفية شفافة");
    Object.assign(stage.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "1px",
      height: "1px",
      perspective: "1000px",
      pointerEvents: "auto",
      touchAction: "none",
      cursor: "grab",
      zIndex: "20",
    });
    const model = document.createElement("div");
    Object.assign(model.style, {
      position: "absolute",
      inset: "0",
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) model.style.transform = "rotateX(10deg) rotateY(-10deg)";
    else model.style.animation = "kbGoldExtrusionFloat 5.2s ease-in-out 0.8s infinite";

    const makeLayer = (depth, front) => {
      const layer = img.cloneNode(false);
      layer.removeAttribute("id");
      layer.removeAttribute("style");
      layer.removeAttribute("data-kb-logo3d");
      layer.className = "";
      layer.alt = "";
      layer.setAttribute("aria-hidden", "true");
      layer.dataset.kbLogo3dLayer = "true";
      Object.assign(layer.style, {
        position: "absolute",
        inset: "0",
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        backfaceVisibility: "hidden",
        pointerEvents: "none",
        transform: front ? "translateZ(0.5px)" : `translate3d(${depth * 0.34}px, ${depth * 0.34}px, ${-depth * 0.9}px)`,
        filter: front
          ? "drop-shadow(0 8px 11px rgba(104, 77, 20, .20))"
          : `brightness(${0.68 + depth * 0.018}) saturate(1.12)`,
      });
      return layer;
    };
    for (let depth = 8; depth >= 1; depth--) model.appendChild(makeLayer(depth, false));
    model.appendChild(makeLayer(0, true));
    stage.appendChild(model);
    document.body.appendChild(stage);

    let cssDrag = null;
    const pointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      cssDrag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      model.style.animation = "none";
      stage.style.cursor = "grabbing";
      if (stage.setPointerCapture) stage.setPointerCapture(event.pointerId);
    };
    const pointerMove = (event) => {
      if (!cssDrag || cssDrag.id !== event.pointerId) return;
      const rect = stage.getBoundingClientRect();
      const dx = (event.clientX - cssDrag.x) / Math.max(rect.width, 1);
      const dy = (event.clientY - cssDrag.y) / Math.max(rect.height, 1);
      const rotateY = Math.max(-45, Math.min(45, dx * 65));
      const rotateX = Math.max(-30, Math.min(30, dy * 45));
      model.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const pointerUp = () => {
      if (!cssDrag) return;
      cssDrag = null;
      model.style.transform = "";
      model.style.animation = "kbGoldExtrusionFloat 5.2s ease-in-out 0.8s infinite";
      stage.style.cursor = "grab";
    };
    stage.addEventListener("pointerdown", pointerDown);
    stage.addEventListener("pointermove", pointerMove);
    stage.addEventListener("pointerup", pointerUp);
    stage.addEventListener("pointercancel", pointerUp);

    const update = () => {
      if (!img.isConnected || !parent.isConnected) return;
      const placement = logoPlacement(parent);
      stage.style.left = `${placement.left}px`;
      stage.style.top = `${placement.top}px`;
      stage.style.width = `${placement.side}px`;
      stage.style.height = `${placement.side}px`;
    };
    const remove = () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      if (resizeObserver) resizeObserver.disconnect();
      if (domObserver) domObserver.disconnect();
      stage.remove();
      img.style.visibility = "";
      delete img.__kbCssExtrusion;
    };
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    const domObserver = new MutationObserver(() => {
      if (!img.isConnected || !parent.isConnected) remove();
    });
    if (resizeObserver) resizeObserver.observe(parent);
    domObserver.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true, capture: true });
    img.__kbCssExtrusion = { stage, remove };
    img.style.visibility = "hidden";
    img.dataset.kbLogo3d = "css-fallback";
    update();
  }

  async function setupImage(img) {
    if (states.get(img) === "active" || states.get(img) === "loading" || !img.parentElement) return;
    states.set(img, "loading");
    const parent = img.parentElement;
    const canvas = document.createElement("canvas");
    canvas.className = "kb-logo-3d-canvas";
    canvas.dataset.kbGoldMesh = "true";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "شعار KB الذهبي مجسّم ومتحرك بخلفية شفافة");
    Object.assign(canvas.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      display: "block",
      width: "1px",
      height: "1px",
      transform: "none",
      opacity: "0",
      zIndex: "20",
      pointerEvents: "auto",
      touchAction: "none",
      cursor: "grab",
      filter: "drop-shadow(0 12px 15px rgba(104, 77, 20, .19))",
      transition: "opacity .24s ease",
    });
    document.body.appendChild(canvas);

    const fallback = (error) => {
      states.set(img, "fallback");
      canvas.remove();
      img.style.visibility = "";
      installCssExtrusion(img);
      if (error) console.warn("KB smooth gold mesh fallback to transparent artwork:", error);
    };

    try {
      const response = await fetch(geometryUrl, { credentials: "same-origin", cache: "force-cache" });
      if (!response.ok) throw new Error(`Geometry request failed (${response.status})`);
      const geometry = await response.json();
      if (!img.isConnected || !canvas.isConnected) {
        canvas.remove();
        states.delete(img);
        return;
      }

      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });
      if (!gl) throw new Error("WebGL is unavailable");
      const info = makeProgram(gl);
      const mesh = buildExtrudedMesh(geometry);
      const frontBuffer = makeBuffer(gl, mesh.front);
      const sideBuffer = makeBuffer(gl, mesh.sides);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      if (gl.UNPACK_COLORSPACE_CONVERSION_WEBGL !== undefined) {
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.useProgram(info.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(info.texture, 0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.CULL_FACE);

      const drag = { active: false, pointerId: null, startX: 0, startY: 0, baseX: 0, baseY: 0, x: 0, y: 0 };
      let displayX = 0;
      let displayY = 0;
      let motionStart = null;
      const resources = {
        running: true,
        frame: 0,
        resizeObserver: null,
        domObserver: null,
        resize: null,
        pointerDown: null,
        pointerMove: null,
        pointerUp: null,
      };
      canvas.__kbWebGLContext = gl;
      canvas.__kbMeshResources = resources;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resources.pointerDown = (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        event.preventDefault();
        drag.active = true;
        drag.pointerId = event.pointerId;
        drag.startX = event.clientX;
        drag.startY = event.clientY;
        drag.baseX = displayX;
        drag.baseY = displayY;
        drag.x = displayX;
        drag.y = displayY;
        canvas.style.cursor = "grabbing";
        if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      };
      resources.pointerMove = (event) => {
        if (!drag.active || drag.pointerId !== event.pointerId) return;
        const rect = canvas.getBoundingClientRect();
        const dx = (event.clientX - drag.startX) / Math.max(rect.width, 1);
        const dy = (event.clientY - drag.startY) / Math.max(rect.height, 1);
        drag.y = Math.max(-0.82, Math.min(0.82, drag.baseY + dx * 1.55));
        drag.x = Math.max(-0.52, Math.min(0.52, drag.baseX + dy * 1.1));
      };
      resources.pointerUp = () => {
        drag.active = false;
        drag.pointerId = null;
        canvas.style.cursor = "grab";
      };
      canvas.addEventListener("pointerdown", resources.pointerDown);
      canvas.addEventListener("pointermove", resources.pointerMove);
      canvas.addEventListener("pointerup", resources.pointerUp);
      canvas.addEventListener("pointercancel", resources.pointerUp);

      const draw = (now) => {
        if (!resources.running || !canvas.isConnected) return;
        if (motionStart === null) motionStart = now;
        const seconds = now * 0.001;
        const elapsed = (now - motionStart) * 0.001;
        const targetX = drag.active ? drag.x : 0;
        const moveTime = Math.max(0, elapsed - 0.8);
        const moveRamp = Math.min(1, moveTime / 0.55);
        const targetY = drag.active ? drag.y : (reducedMotion ? 0 : Math.sin(moveTime * 0.74) * 0.075 * moveRamp);
        displayX += (targetX - displayX) * 0.16;
        displayY += (targetY - displayY) * 0.16;
        const angleX = displayX;
        const angleY = displayY;
        const angleZ = 0;
        const bob = 0;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(info.program);
        gl.uniform1f(info.angleX, angleX);
        gl.uniform1f(info.angleY, angleY);
        gl.uniform1f(info.angleZ, angleZ);
        gl.uniform1f(info.scale, 2.95);
        gl.uniform1f(info.bob, bob);
        gl.uniform1f(info.time, seconds);
        gl.uniform3f(info.sideColor, 0.60, 0.40, 0.075);

        gl.uniform1i(info.useTexture, 0);
        bindAttributes(gl, info, sideBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, mesh.sideVertexCount);

        gl.uniform1i(info.useTexture, 1);
        bindAttributes(gl, info, frontBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, mesh.frontVertexCount);

        if (img.style.visibility !== "hidden") {
          canvas.style.opacity = "1";
          img.style.visibility = "hidden";
          img.dataset.kbLogo3d = "active";
          canvas.dataset.meshVertices = String(mesh.frontVertexCount + mesh.sideVertexCount);
          canvas.dataset.meshGroups = String(mesh.groups);
          canvas.dataset.logoAspect = mesh.aspect.toFixed(3);
        }
        if (!reducedMotion) resources.frame = requestAnimationFrame(draw);
      };

      const resize = () => {
        const placement = logoPlacement(parent);
        const side = placement.side;
        canvas.style.left = `${placement.left}px`;
        canvas.style.top = `${placement.top}px`;
        canvas.style.width = `${side}px`;
        canvas.style.height = `${side}px`;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.max(1, Math.round(side * pixelRatio));
        canvas.height = Math.max(1, Math.round(side * pixelRatio));
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (reducedMotion) draw(performance.now());
      };
      resources.resize = resize;
      resources.resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
      if (resources.resizeObserver) resources.resizeObserver.observe(parent);
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("scroll", resize, { passive: true, capture: true });
      resources.domObserver = new MutationObserver(() => {
        if (!parent.isConnected || !img.isConnected) cleanup(resources, img, canvas, parent);
      });
      resources.domObserver.observe(document.documentElement, { childList: true, subtree: true });
      resize();
      if (reducedMotion) draw(performance.now());
      else resources.frame = requestAnimationFrame(draw);

      canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        cleanup(resources, img, canvas, parent);
        states.set(img, "fallback");
        installCssExtrusion(img);
      }, { once: true });
      states.set(img, "active");
    } catch (error) {
      fallback(error);
    }
  }

  function attach(img) {
    if (img.dataset.kbLogo3dLayer === "true") return;
    const current = states.get(img);
    if (current === "active" || current === "loading" || current === "fallback") return;
    if (img.getAttribute("src")?.includes("kb-hero.webp")) img.src = goldLogoUrl;
    if (!img.complete || !img.naturalWidth) {
      states.set(img, "loading");
      img.addEventListener("load", () => {
        states.delete(img);
        setupImage(img);
      }, { once: true });
      img.addEventListener("error", () => states.set(img, "fallback"), { once: true });
      return;
    }
    setupImage(img);
  }

  function scan(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.matches && node.matches(selector)) attach(node);
    if (node.querySelectorAll) node.querySelectorAll(selector).forEach(attach);
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) scan(node);
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scan(document.documentElement);
})();
