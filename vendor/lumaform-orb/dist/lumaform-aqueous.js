/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const aa = "160", wn = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Cn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, sl = 0, Ra = 1, ol = 2, ro = 1, ll = 2, Zt = 3, tn = 0, yt = 1, $t = 2, Jt = 0, jn = 1, pi = 2, wa = 3, Ca = 4, ao = 5, un = 100, cl = 101, ul = 102, Pa = 103, La = 104, so = 200, Yi = 201, dl = 202, fl = 203, Zi = 204, Yr = 205, hl = 206, pl = 207, ml = 208, gl = 209, _l = 210, bl = 211, xl = 212, vl = 213, yl = 214, Sl = 0, Ml = 1, El = 2, $i = 3, Tl = 4, Al = 5, Rl = 6, wl = 7, oo = 0, Cl = 1, Pl = 2, hn = 0, lo = 1, co = 2, uo = 3, sa = 4, Ll = 5, fo = 6, ho = 300, Zn = 301, $n = 302, jr = 303, Kr = 304, ar = 306, Zr = 1e3, Ft = 1001, $r = 1002, _t = 1003, Da = 1004, pr = 1005, Ct = 1006, Dl = 1007, mi = 1008, pn = 1009, Ul = 1010, Il = 1011, oa = 1012, po = 1013, dn = 1014, fn = 1015, en = 1016, mo = 1017, go = 1018, Mn = 1020, Nl = 1021, Ot = 1023, Fl = 1024, Ol = 1025, En = 1026, Qn = 1027, Bl = 1028, _o = 1029, zl = 1030, bo = 1031, xo = 1033, mr = 33776, gr = 33777, _r = 33778, br = 33779, Ua = 35840, Ia = 35841, Na = 35842, Fa = 35843, vo = 36196, Oa = 37492, Ba = 37496, za = 37808, Ga = 37809, ka = 37810, Ha = 37811, Va = 37812, Wa = 37813, Xa = 37814, qa = 37815, Ya = 37816, ja = 37817, Ka = 37818, Za = 37819, $a = 37820, Qa = 37821, xr = 36492, Ja = 36494, es = 36495, Gl = 36283, ts = 36284, ns = 36285, is = 36286, yo = 3e3, Tn = 3001, kl = 3200, Hl = 3201, Vl = 0, Wl = 1, Lt = "", ot = "srgb", nn = "srgb-linear", la = "display-p3", sr = "display-p3-linear", Qi = "linear", Ke = "srgb", Ji = "rec709", er = "p3", Pn = 7680, rs = 519, Xl = 512, ql = 513, Yl = 514, So = 515, jl = 516, Kl = 517, Zl = 518, $l = 519, as = 35044, ss = "300 es", Qr = 1035, Qt = 2e3, tr = 2001;
class Rn {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const a = r.indexOf(t);
      a !== -1 && r.splice(a, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let a = 0, o = r.length; a < o; a++)
        r[a].call(this, e);
      e.target = null;
    }
  }
}
const dt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], ji = Math.PI / 180, Jr = 180 / Math.PI;
function _i() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (dt[i & 255] + dt[i >> 8 & 255] + dt[i >> 16 & 255] + dt[i >> 24 & 255] + "-" + dt[e & 255] + dt[e >> 8 & 255] + "-" + dt[e >> 16 & 15 | 64] + dt[e >> 24 & 255] + "-" + dt[t & 63 | 128] + dt[t >> 8 & 255] + "-" + dt[t >> 16 & 255] + dt[t >> 24 & 255] + dt[n & 255] + dt[n >> 8 & 255] + dt[n >> 16 & 255] + dt[n >> 24 & 255]).toLowerCase();
}
function bt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Ql(i, e) {
  return (i % e + e) % e;
}
function vr(i, e, t) {
  return (1 - t) * i + t * e;
}
function os(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function ea(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function ai(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function vt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Jl = {
  DEG2RAD: ji
};
class be {
  constructor(e = 0, t = 0) {
    be.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(bt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = this.x - e.x, o = this.y - e.y;
    return this.x = a * n - o * r + e.x, this.y = a * r + o * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Ge {
  constructor(e, t, n, r, a, o, s, l, c) {
    Ge.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, o, s, l, c);
  }
  set(e, t, n, r, a, o, s, l, c) {
    const d = this.elements;
    return d[0] = e, d[1] = r, d[2] = s, d[3] = t, d[4] = a, d[5] = l, d[6] = n, d[7] = o, d[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, o = n[0], s = n[3], l = n[6], c = n[1], d = n[4], f = n[7], h = n[2], m = n[5], _ = n[8], b = r[0], p = r[3], u = r[6], v = r[1], g = r[4], T = r[7], C = r[2], R = r[5], w = r[8];
    return a[0] = o * b + s * v + l * C, a[3] = o * p + s * g + l * R, a[6] = o * u + s * T + l * w, a[1] = c * b + d * v + f * C, a[4] = c * p + d * g + f * R, a[7] = c * u + d * T + f * w, a[2] = h * b + m * v + _ * C, a[5] = h * p + m * g + _ * R, a[8] = h * u + m * T + _ * w, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], o = e[4], s = e[5], l = e[6], c = e[7], d = e[8];
    return t * o * d - t * s * c - n * a * d + n * s * l + r * a * c - r * o * l;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], o = e[4], s = e[5], l = e[6], c = e[7], d = e[8], f = d * o - s * c, h = s * l - d * a, m = c * a - o * l, _ = t * f + n * h + r * m;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const b = 1 / _;
    return e[0] = f * b, e[1] = (r * c - d * n) * b, e[2] = (s * n - r * o) * b, e[3] = h * b, e[4] = (d * t - r * l) * b, e[5] = (r * a - s * t) * b, e[6] = m * b, e[7] = (n * l - c * t) * b, e[8] = (o * t - n * a) * b, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, r, a, o, s) {
    const l = Math.cos(a), c = Math.sin(a);
    return this.set(
      n * l,
      n * c,
      -n * (l * o + c * s) + o + e,
      -r * c,
      r * l,
      -r * (-c * o + l * s) + s + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(yr.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(yr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(yr.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const yr = /* @__PURE__ */ new Ge();
function Mo(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function nr(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function ec() {
  const i = nr("canvas");
  return i.style.display = "block", i;
}
const ls = {};
function fi(i) {
  i in ls || (ls[i] = !0, console.warn(i));
}
const cs = /* @__PURE__ */ new Ge().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), us = /* @__PURE__ */ new Ge().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), Si = {
  [nn]: {
    transfer: Qi,
    primaries: Ji,
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [ot]: {
    transfer: Ke,
    primaries: Ji,
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [sr]: {
    transfer: Qi,
    primaries: er,
    toReference: (i) => i.applyMatrix3(us),
    fromReference: (i) => i.applyMatrix3(cs)
  },
  [la]: {
    transfer: Ke,
    primaries: er,
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(us),
    fromReference: (i) => i.applyMatrix3(cs).convertLinearToSRGB()
  }
}, tc = /* @__PURE__ */ new Set([nn, sr]), Ye = {
  enabled: !0,
  _workingColorSpace: nn,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!tc.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, e, t) {
    if (this.enabled === !1 || e === t || !e || !t)
      return i;
    const n = Si[e].toReference, r = Si[t].fromReference;
    return r(n(i));
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return Si[i].primaries;
  },
  getTransfer: function(i) {
    return i === Lt ? Qi : Si[i].transfer;
  }
};
function Kn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Sr(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Ln;
class Eo {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      Ln === void 0 && (Ln = nr("canvas")), Ln.width = e.width, Ln.height = e.height;
      const n = Ln.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = Ln;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = nr("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), a = r.data;
      for (let o = 0; o < a.length; o++)
        a[o] = Kn(a[o] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Kn(t[n] / 255) * 255) : t[n] = Kn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let nc = 0;
class To {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: nc++ }), this.uuid = _i(), this.data = e, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let a;
      if (Array.isArray(r)) {
        a = [];
        for (let o = 0, s = r.length; o < s; o++)
          r[o].isDataTexture ? a.push(Mr(r[o].image)) : a.push(Mr(r[o]));
      } else
        a = Mr(r);
      n.url = a;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Mr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Eo.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let ic = 0;
class Tt extends Rn {
  constructor(e = Tt.DEFAULT_IMAGE, t = Tt.DEFAULT_MAPPING, n = Ft, r = Ft, a = Ct, o = mi, s = Ot, l = pn, c = Tt.DEFAULT_ANISOTROPY, d = Lt) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: ic++ }), this.uuid = _i(), this.name = "", this.source = new To(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = a, this.minFilter = o, this.anisotropy = c, this.format = s, this.internalFormat = null, this.type = l, this.offset = new be(0, 0), this.repeat = new be(1, 1), this.center = new be(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ge(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof d == "string" ? this.colorSpace = d : (fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = d === Tn ? ot : Lt), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== ho) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Zr:
          e.x = e.x - Math.floor(e.x);
          break;
        case Ft:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case $r:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Zr:
          e.y = e.y - Math.floor(e.y);
          break;
        case Ft:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case $r:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === ot ? Tn : yo;
  }
  set encoding(e) {
    fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = e === Tn ? ot : Lt;
  }
}
Tt.DEFAULT_IMAGE = null;
Tt.DEFAULT_MAPPING = ho;
Tt.DEFAULT_ANISOTROPY = 1;
class lt {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    lt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = this.w, o = e.elements;
    return this.x = o[0] * t + o[4] * n + o[8] * r + o[12] * a, this.y = o[1] * t + o[5] * n + o[9] * r + o[13] * a, this.z = o[2] * t + o[6] * n + o[10] * r + o[14] * a, this.w = o[3] * t + o[7] * n + o[11] * r + o[15] * a, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, a;
    const l = e.elements, c = l[0], d = l[4], f = l[8], h = l[1], m = l[5], _ = l[9], b = l[2], p = l[6], u = l[10];
    if (Math.abs(d - h) < 0.01 && Math.abs(f - b) < 0.01 && Math.abs(_ - p) < 0.01) {
      if (Math.abs(d + h) < 0.1 && Math.abs(f + b) < 0.1 && Math.abs(_ + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const g = (c + 1) / 2, T = (m + 1) / 2, C = (u + 1) / 2, R = (d + h) / 4, w = (f + b) / 4, H = (_ + p) / 4;
      return g > T && g > C ? g < 0.01 ? (n = 0, r = 0.707106781, a = 0.707106781) : (n = Math.sqrt(g), r = R / n, a = w / n) : T > C ? T < 0.01 ? (n = 0.707106781, r = 0, a = 0.707106781) : (r = Math.sqrt(T), n = R / r, a = H / r) : C < 0.01 ? (n = 0.707106781, r = 0.707106781, a = 0) : (a = Math.sqrt(C), n = w / a, r = H / a), this.set(n, r, a, t), this;
    }
    let v = Math.sqrt((p - _) * (p - _) + (f - b) * (f - b) + (h - d) * (h - d));
    return Math.abs(v) < 1e-3 && (v = 1), this.x = (p - _) / v, this.y = (f - b) / v, this.z = (h - d) / v, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class rc extends Rn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new lt(0, 0, e, t), this.scissorTest = !1, this.viewport = new lt(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n.encoding !== void 0 && (fi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), n.colorSpace = n.encoding === Tn ? ot : Lt), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Ct,
      depthBuffer: !0,
      stencilBuffer: !1,
      depthTexture: null,
      samples: 0
    }, n), this.texture = new Tt(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = n.generateMipmaps, this.texture.internalFormat = n.internalFormat, this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  setSize(e, t, n = 1) {
    (this.width !== e || this.height !== t || this.depth !== n) && (this.width = e, this.height = t, this.depth = n, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new To(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class zt extends rc {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class Ao extends Tt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = _t, this.minFilter = _t, this.wrapR = Ft, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class ac extends Tt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = _t, this.minFilter = _t, this.wrapR = Ft, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class An {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, a, o, s) {
    let l = n[r + 0], c = n[r + 1], d = n[r + 2], f = n[r + 3];
    const h = a[o + 0], m = a[o + 1], _ = a[o + 2], b = a[o + 3];
    if (s === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = d, e[t + 3] = f;
      return;
    }
    if (s === 1) {
      e[t + 0] = h, e[t + 1] = m, e[t + 2] = _, e[t + 3] = b;
      return;
    }
    if (f !== b || l !== h || c !== m || d !== _) {
      let p = 1 - s;
      const u = l * h + c * m + d * _ + f * b, v = u >= 0 ? 1 : -1, g = 1 - u * u;
      if (g > Number.EPSILON) {
        const C = Math.sqrt(g), R = Math.atan2(C, u * v);
        p = Math.sin(p * R) / C, s = Math.sin(s * R) / C;
      }
      const T = s * v;
      if (l = l * p + h * T, c = c * p + m * T, d = d * p + _ * T, f = f * p + b * T, p === 1 - s) {
        const C = 1 / Math.sqrt(l * l + c * c + d * d + f * f);
        l *= C, c *= C, d *= C, f *= C;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = d, e[t + 3] = f;
  }
  static multiplyQuaternionsFlat(e, t, n, r, a, o) {
    const s = n[r], l = n[r + 1], c = n[r + 2], d = n[r + 3], f = a[o], h = a[o + 1], m = a[o + 2], _ = a[o + 3];
    return e[t] = s * _ + d * f + l * m - c * h, e[t + 1] = l * _ + d * h + c * f - s * m, e[t + 2] = c * _ + d * m + s * h - l * f, e[t + 3] = d * _ - s * f - l * h - c * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, a = e._z, o = e._order, s = Math.cos, l = Math.sin, c = s(n / 2), d = s(r / 2), f = s(a / 2), h = l(n / 2), m = l(r / 2), _ = l(a / 2);
    switch (o) {
      case "XYZ":
        this._x = h * d * f + c * m * _, this._y = c * m * f - h * d * _, this._z = c * d * _ + h * m * f, this._w = c * d * f - h * m * _;
        break;
      case "YXZ":
        this._x = h * d * f + c * m * _, this._y = c * m * f - h * d * _, this._z = c * d * _ - h * m * f, this._w = c * d * f + h * m * _;
        break;
      case "ZXY":
        this._x = h * d * f - c * m * _, this._y = c * m * f + h * d * _, this._z = c * d * _ + h * m * f, this._w = c * d * f - h * m * _;
        break;
      case "ZYX":
        this._x = h * d * f - c * m * _, this._y = c * m * f + h * d * _, this._z = c * d * _ - h * m * f, this._w = c * d * f + h * m * _;
        break;
      case "YZX":
        this._x = h * d * f + c * m * _, this._y = c * m * f + h * d * _, this._z = c * d * _ - h * m * f, this._w = c * d * f - h * m * _;
        break;
      case "XZY":
        this._x = h * d * f - c * m * _, this._y = c * m * f - h * d * _, this._z = c * d * _ + h * m * f, this._w = c * d * f + h * m * _;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], a = t[8], o = t[1], s = t[5], l = t[9], c = t[2], d = t[6], f = t[10], h = n + s + f;
    if (h > 0) {
      const m = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / m, this._x = (d - l) * m, this._y = (a - c) * m, this._z = (o - r) * m;
    } else if (n > s && n > f) {
      const m = 2 * Math.sqrt(1 + n - s - f);
      this._w = (d - l) / m, this._x = 0.25 * m, this._y = (r + o) / m, this._z = (a + c) / m;
    } else if (s > f) {
      const m = 2 * Math.sqrt(1 + s - n - f);
      this._w = (a - c) / m, this._x = (r + o) / m, this._y = 0.25 * m, this._z = (l + d) / m;
    } else {
      const m = 2 * Math.sqrt(1 + f - n - s);
      this._w = (o - r) / m, this._x = (a + c) / m, this._y = (l + d) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(bt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, a = e._z, o = e._w, s = t._x, l = t._y, c = t._z, d = t._w;
    return this._x = n * d + o * s + r * c - a * l, this._y = r * d + o * l + a * s - n * c, this._z = a * d + o * c + n * l - r * s, this._w = o * d - n * s - r * l - a * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, r = this._y, a = this._z, o = this._w;
    let s = o * e._w + n * e._x + r * e._y + a * e._z;
    if (s < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, s = -s) : this.copy(e), s >= 1)
      return this._w = o, this._x = n, this._y = r, this._z = a, this;
    const l = 1 - s * s;
    if (l <= Number.EPSILON) {
      const m = 1 - t;
      return this._w = m * o + t * this._w, this._x = m * n + t * this._x, this._y = m * r + t * this._y, this._z = m * a + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), d = Math.atan2(c, s), f = Math.sin((1 - t) * d) / c, h = Math.sin(t * d) / c;
    return this._w = o * f + this._w * h, this._x = n * f + this._x * h, this._y = r * f + this._y * h, this._z = a * f + this._z * h, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = Math.random(), t = Math.sqrt(1 - e), n = Math.sqrt(e), r = 2 * Math.PI * Math.random(), a = 2 * Math.PI * Math.random();
    return this.set(
      t * Math.cos(r),
      n * Math.sin(a),
      n * Math.cos(a),
      t * Math.sin(r)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class D {
  constructor(e = 0, t = 0, n = 0) {
    D.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(ds.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(ds.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[3] * n + a[6] * r, this.y = a[1] * t + a[4] * n + a[7] * r, this.z = a[2] * t + a[5] * n + a[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements, o = 1 / (a[3] * t + a[7] * n + a[11] * r + a[15]);
    return this.x = (a[0] * t + a[4] * n + a[8] * r + a[12]) * o, this.y = (a[1] * t + a[5] * n + a[9] * r + a[13]) * o, this.z = (a[2] * t + a[6] * n + a[10] * r + a[14]) * o, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, a = e.x, o = e.y, s = e.z, l = e.w, c = 2 * (o * r - s * n), d = 2 * (s * t - a * r), f = 2 * (a * n - o * t);
    return this.x = t + l * c + o * f - s * d, this.y = n + l * d + s * c - a * f, this.z = r + l * f + a * d - o * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r, this.y = a[1] * t + a[5] * n + a[9] * r, this.z = a[2] * t + a[6] * n + a[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, r = e.y, a = e.z, o = t.x, s = t.y, l = t.z;
    return this.x = r * l - a * s, this.y = a * o - n * l, this.z = n * s - r * o, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Er.copy(this).projectOnVector(e), this.sub(Er);
  }
  reflect(e) {
    return this.sub(Er.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(bt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = (Math.random() - 0.5) * 2, t = Math.random() * Math.PI * 2, n = Math.sqrt(1 - e ** 2);
    return this.x = n * Math.cos(t), this.y = n * Math.sin(t), this.z = e, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Er = /* @__PURE__ */ new D(), ds = /* @__PURE__ */ new An();
class bi {
  constructor(e = new D(1 / 0, 1 / 0, 1 / 0), t = new D(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Dt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Dt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Dt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const a = n.getAttribute("position");
      if (t === !0 && a !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, s = a.count; o < s; o++)
          e.isMesh === !0 ? e.getVertexPosition(o, Dt) : Dt.fromBufferAttribute(a, o), Dt.applyMatrix4(e.matrixWorld), this.expandByPoint(Dt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Mi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Mi.copy(n.boundingBox)), Mi.applyMatrix4(e.matrixWorld), this.union(Mi);
    }
    const r = e.children;
    for (let a = 0, o = r.length; a < o; a++)
      this.expandByObject(r[a], t);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Dt), Dt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(si), Ei.subVectors(this.max, si), Dn.subVectors(e.a, si), Un.subVectors(e.b, si), In.subVectors(e.c, si), rn.subVectors(Un, Dn), an.subVectors(In, Un), _n.subVectors(Dn, In);
    let t = [
      0,
      -rn.z,
      rn.y,
      0,
      -an.z,
      an.y,
      0,
      -_n.z,
      _n.y,
      rn.z,
      0,
      -rn.x,
      an.z,
      0,
      -an.x,
      _n.z,
      0,
      -_n.x,
      -rn.y,
      rn.x,
      0,
      -an.y,
      an.x,
      0,
      -_n.y,
      _n.x,
      0
    ];
    return !Tr(t, Dn, Un, In, Ei) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Tr(t, Dn, Un, In, Ei)) ? !1 : (Ti.crossVectors(rn, an), t = [Ti.x, Ti.y, Ti.z], Tr(t, Dn, Un, In, Ei));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Dt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Dt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Xt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Xt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Xt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Xt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Xt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Xt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Xt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Xt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Xt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Xt = [
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D()
], Dt = /* @__PURE__ */ new D(), Mi = /* @__PURE__ */ new bi(), Dn = /* @__PURE__ */ new D(), Un = /* @__PURE__ */ new D(), In = /* @__PURE__ */ new D(), rn = /* @__PURE__ */ new D(), an = /* @__PURE__ */ new D(), _n = /* @__PURE__ */ new D(), si = /* @__PURE__ */ new D(), Ei = /* @__PURE__ */ new D(), Ti = /* @__PURE__ */ new D(), bn = /* @__PURE__ */ new D();
function Tr(i, e, t, n, r) {
  for (let a = 0, o = i.length - 3; a <= o; a += 3) {
    bn.fromArray(i, a);
    const s = r.x * Math.abs(bn.x) + r.y * Math.abs(bn.y) + r.z * Math.abs(bn.z), l = e.dot(bn), c = t.dot(bn), d = n.dot(bn);
    if (Math.max(-Math.max(l, c, d), Math.min(l, c, d)) > s)
      return !1;
  }
  return !0;
}
const sc = /* @__PURE__ */ new bi(), oi = /* @__PURE__ */ new D(), Ar = /* @__PURE__ */ new D();
class ca {
  constructor(e = new D(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : sc.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let a = 0, o = e.length; a < o; a++)
      r = Math.max(r, n.distanceToSquared(e[a]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    oi.subVectors(e, this.center);
    const t = oi.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(oi, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Ar.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(oi.copy(e.center).add(Ar)), this.expandByPoint(oi.copy(e.center).sub(Ar))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const qt = /* @__PURE__ */ new D(), Rr = /* @__PURE__ */ new D(), Ai = /* @__PURE__ */ new D(), sn = /* @__PURE__ */ new D(), wr = /* @__PURE__ */ new D(), Ri = /* @__PURE__ */ new D(), Cr = /* @__PURE__ */ new D();
class Ro {
  constructor(e = new D(), t = new D(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, qt)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = qt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (qt.copy(this.origin).addScaledVector(this.direction, t), qt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    Rr.copy(e).add(t).multiplyScalar(0.5), Ai.copy(t).sub(e).normalize(), sn.copy(this.origin).sub(Rr);
    const a = e.distanceTo(t) * 0.5, o = -this.direction.dot(Ai), s = sn.dot(this.direction), l = -sn.dot(Ai), c = sn.lengthSq(), d = Math.abs(1 - o * o);
    let f, h, m, _;
    if (d > 0)
      if (f = o * l - s, h = o * s - l, _ = a * d, f >= 0)
        if (h >= -_)
          if (h <= _) {
            const b = 1 / d;
            f *= b, h *= b, m = f * (f + o * h + 2 * s) + h * (o * f + h + 2 * l) + c;
          } else
            h = a, f = Math.max(0, -(o * h + s)), m = -f * f + h * (h + 2 * l) + c;
        else
          h = -a, f = Math.max(0, -(o * h + s)), m = -f * f + h * (h + 2 * l) + c;
      else
        h <= -_ ? (f = Math.max(0, -(-o * a + s)), h = f > 0 ? -a : Math.min(Math.max(-a, -l), a), m = -f * f + h * (h + 2 * l) + c) : h <= _ ? (f = 0, h = Math.min(Math.max(-a, -l), a), m = h * (h + 2 * l) + c) : (f = Math.max(0, -(o * a + s)), h = f > 0 ? a : Math.min(Math.max(-a, -l), a), m = -f * f + h * (h + 2 * l) + c);
    else
      h = o > 0 ? -a : a, f = Math.max(0, -(o * h + s)), m = -f * f + h * (h + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy(Rr).addScaledVector(Ai, h), m;
  }
  intersectSphere(e, t) {
    qt.subVectors(e.center, this.origin);
    const n = qt.dot(this.direction), r = qt.dot(qt) - n * n, a = e.radius * e.radius;
    if (r > a) return null;
    const o = Math.sqrt(a - r), s = n - o, l = n + o;
    return l < 0 ? null : s < 0 ? this.at(l, t) : this.at(s, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, a, o, s, l;
    const c = 1 / this.direction.x, d = 1 / this.direction.y, f = 1 / this.direction.z, h = this.origin;
    return c >= 0 ? (n = (e.min.x - h.x) * c, r = (e.max.x - h.x) * c) : (n = (e.max.x - h.x) * c, r = (e.min.x - h.x) * c), d >= 0 ? (a = (e.min.y - h.y) * d, o = (e.max.y - h.y) * d) : (a = (e.max.y - h.y) * d, o = (e.min.y - h.y) * d), n > o || a > r || ((a > n || isNaN(n)) && (n = a), (o < r || isNaN(r)) && (r = o), f >= 0 ? (s = (e.min.z - h.z) * f, l = (e.max.z - h.z) * f) : (s = (e.max.z - h.z) * f, l = (e.min.z - h.z) * f), n > l || s > r) || ((s > n || n !== n) && (n = s), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, qt) !== null;
  }
  intersectTriangle(e, t, n, r, a) {
    wr.subVectors(t, e), Ri.subVectors(n, e), Cr.crossVectors(wr, Ri);
    let o = this.direction.dot(Cr), s;
    if (o > 0) {
      if (r) return null;
      s = 1;
    } else if (o < 0)
      s = -1, o = -o;
    else
      return null;
    sn.subVectors(this.origin, e);
    const l = s * this.direction.dot(Ri.crossVectors(sn, Ri));
    if (l < 0)
      return null;
    const c = s * this.direction.dot(wr.cross(sn));
    if (c < 0 || l + c > o)
      return null;
    const d = -s * sn.dot(Cr);
    return d < 0 ? null : this.at(d / o, a);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ct {
  constructor(e, t, n, r, a, o, s, l, c, d, f, h, m, _, b, p) {
    ct.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, o, s, l, c, d, f, h, m, _, b, p);
  }
  set(e, t, n, r, a, o, s, l, c, d, f, h, m, _, b, p) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = a, u[5] = o, u[9] = s, u[13] = l, u[2] = c, u[6] = d, u[10] = f, u[14] = h, u[3] = m, u[7] = _, u[11] = b, u[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new ct().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, r = 1 / Nn.setFromMatrixColumn(e, 0).length(), a = 1 / Nn.setFromMatrixColumn(e, 1).length(), o = 1 / Nn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z, o = Math.cos(n), s = Math.sin(n), l = Math.cos(r), c = Math.sin(r), d = Math.cos(a), f = Math.sin(a);
    if (e.order === "XYZ") {
      const h = o * d, m = o * f, _ = s * d, b = s * f;
      t[0] = l * d, t[4] = -l * f, t[8] = c, t[1] = m + _ * c, t[5] = h - b * c, t[9] = -s * l, t[2] = b - h * c, t[6] = _ + m * c, t[10] = o * l;
    } else if (e.order === "YXZ") {
      const h = l * d, m = l * f, _ = c * d, b = c * f;
      t[0] = h + b * s, t[4] = _ * s - m, t[8] = o * c, t[1] = o * f, t[5] = o * d, t[9] = -s, t[2] = m * s - _, t[6] = b + h * s, t[10] = o * l;
    } else if (e.order === "ZXY") {
      const h = l * d, m = l * f, _ = c * d, b = c * f;
      t[0] = h - b * s, t[4] = -o * f, t[8] = _ + m * s, t[1] = m + _ * s, t[5] = o * d, t[9] = b - h * s, t[2] = -o * c, t[6] = s, t[10] = o * l;
    } else if (e.order === "ZYX") {
      const h = o * d, m = o * f, _ = s * d, b = s * f;
      t[0] = l * d, t[4] = _ * c - m, t[8] = h * c + b, t[1] = l * f, t[5] = b * c + h, t[9] = m * c - _, t[2] = -c, t[6] = s * l, t[10] = o * l;
    } else if (e.order === "YZX") {
      const h = o * l, m = o * c, _ = s * l, b = s * c;
      t[0] = l * d, t[4] = b - h * f, t[8] = _ * f + m, t[1] = f, t[5] = o * d, t[9] = -s * d, t[2] = -c * d, t[6] = m * f + _, t[10] = h - b * f;
    } else if (e.order === "XZY") {
      const h = o * l, m = o * c, _ = s * l, b = s * c;
      t[0] = l * d, t[4] = -f, t[8] = c * d, t[1] = h * f + b, t[5] = o * d, t[9] = m * f - _, t[2] = _ * f - m, t[6] = s * d, t[10] = b * f + h;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(oc, e, lc);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return Mt.subVectors(e, t), Mt.lengthSq() === 0 && (Mt.z = 1), Mt.normalize(), on.crossVectors(n, Mt), on.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Mt.x += 1e-4 : Mt.z += 1e-4, Mt.normalize(), on.crossVectors(n, Mt)), on.normalize(), wi.crossVectors(Mt, on), r[0] = on.x, r[4] = wi.x, r[8] = Mt.x, r[1] = on.y, r[5] = wi.y, r[9] = Mt.y, r[2] = on.z, r[6] = wi.z, r[10] = Mt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, o = n[0], s = n[4], l = n[8], c = n[12], d = n[1], f = n[5], h = n[9], m = n[13], _ = n[2], b = n[6], p = n[10], u = n[14], v = n[3], g = n[7], T = n[11], C = n[15], R = r[0], w = r[4], H = r[8], y = r[12], E = r[1], z = r[5], q = r[9], le = r[13], L = r[2], N = r[6], V = r[10], Y = r[14], X = r[3], W = r[7], Q = r[11], te = r[15];
    return a[0] = o * R + s * E + l * L + c * X, a[4] = o * w + s * z + l * N + c * W, a[8] = o * H + s * q + l * V + c * Q, a[12] = o * y + s * le + l * Y + c * te, a[1] = d * R + f * E + h * L + m * X, a[5] = d * w + f * z + h * N + m * W, a[9] = d * H + f * q + h * V + m * Q, a[13] = d * y + f * le + h * Y + m * te, a[2] = _ * R + b * E + p * L + u * X, a[6] = _ * w + b * z + p * N + u * W, a[10] = _ * H + b * q + p * V + u * Q, a[14] = _ * y + b * le + p * Y + u * te, a[3] = v * R + g * E + T * L + C * X, a[7] = v * w + g * z + T * N + C * W, a[11] = v * H + g * q + T * V + C * Q, a[15] = v * y + g * le + T * Y + C * te, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], a = e[12], o = e[1], s = e[5], l = e[9], c = e[13], d = e[2], f = e[6], h = e[10], m = e[14], _ = e[3], b = e[7], p = e[11], u = e[15];
    return _ * (+a * l * f - r * c * f - a * s * h + n * c * h + r * s * m - n * l * m) + b * (+t * l * m - t * c * h + a * o * h - r * o * m + r * c * d - a * l * d) + p * (+t * c * f - t * s * m - a * o * f + n * o * m + a * s * d - n * c * d) + u * (-r * s * d - t * l * f + t * s * h + r * o * f - n * o * h + n * l * d);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], o = e[4], s = e[5], l = e[6], c = e[7], d = e[8], f = e[9], h = e[10], m = e[11], _ = e[12], b = e[13], p = e[14], u = e[15], v = f * p * c - b * h * c + b * l * m - s * p * m - f * l * u + s * h * u, g = _ * h * c - d * p * c - _ * l * m + o * p * m + d * l * u - o * h * u, T = d * b * c - _ * f * c + _ * s * m - o * b * m - d * s * u + o * f * u, C = _ * f * l - d * b * l - _ * s * h + o * b * h + d * s * p - o * f * p, R = t * v + n * g + r * T + a * C;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const w = 1 / R;
    return e[0] = v * w, e[1] = (b * h * a - f * p * a - b * r * m + n * p * m + f * r * u - n * h * u) * w, e[2] = (s * p * a - b * l * a + b * r * c - n * p * c - s * r * u + n * l * u) * w, e[3] = (f * l * a - s * h * a - f * r * c + n * h * c + s * r * m - n * l * m) * w, e[4] = g * w, e[5] = (d * p * a - _ * h * a + _ * r * m - t * p * m - d * r * u + t * h * u) * w, e[6] = (_ * l * a - o * p * a - _ * r * c + t * p * c + o * r * u - t * l * u) * w, e[7] = (o * h * a - d * l * a + d * r * c - t * h * c - o * r * m + t * l * m) * w, e[8] = T * w, e[9] = (_ * f * a - d * b * a - _ * n * m + t * b * m + d * n * u - t * f * u) * w, e[10] = (o * b * a - _ * s * a + _ * n * c - t * b * c - o * n * u + t * s * u) * w, e[11] = (d * s * a - o * f * a - d * n * c + t * f * c + o * n * m - t * s * m) * w, e[12] = C * w, e[13] = (d * b * r - _ * f * r + _ * n * h - t * b * h - d * n * p + t * f * p) * w, e[14] = (_ * s * r - o * b * r - _ * n * l + t * b * l + o * n * p - t * s * p) * w, e[15] = (o * f * r - d * s * r + d * n * l - t * f * l - o * n * h + t * s * h) * w, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= a, t[1] *= n, t[5] *= r, t[9] *= a, t[2] *= n, t[6] *= r, t[10] *= a, t[3] *= n, t[7] *= r, t[11] *= a, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = 1 - n, o = e.x, s = e.y, l = e.z, c = a * o, d = a * s;
    return this.set(
      c * o + n,
      c * s - r * l,
      c * l + r * s,
      0,
      c * s + r * l,
      d * s + n,
      d * l - r * o,
      0,
      c * l - r * s,
      d * l + r * o,
      a * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, r, a, o) {
    return this.set(
      1,
      n,
      a,
      0,
      e,
      1,
      o,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const r = this.elements, a = t._x, o = t._y, s = t._z, l = t._w, c = a + a, d = o + o, f = s + s, h = a * c, m = a * d, _ = a * f, b = o * d, p = o * f, u = s * f, v = l * c, g = l * d, T = l * f, C = n.x, R = n.y, w = n.z;
    return r[0] = (1 - (b + u)) * C, r[1] = (m + T) * C, r[2] = (_ - g) * C, r[3] = 0, r[4] = (m - T) * R, r[5] = (1 - (h + u)) * R, r[6] = (p + v) * R, r[7] = 0, r[8] = (_ + g) * w, r[9] = (p - v) * w, r[10] = (1 - (h + b)) * w, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let a = Nn.set(r[0], r[1], r[2]).length();
    const o = Nn.set(r[4], r[5], r[6]).length(), s = Nn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (a = -a), e.x = r[12], e.y = r[13], e.z = r[14], Ut.copy(this);
    const c = 1 / a, d = 1 / o, f = 1 / s;
    return Ut.elements[0] *= c, Ut.elements[1] *= c, Ut.elements[2] *= c, Ut.elements[4] *= d, Ut.elements[5] *= d, Ut.elements[6] *= d, Ut.elements[8] *= f, Ut.elements[9] *= f, Ut.elements[10] *= f, t.setFromRotationMatrix(Ut), n.x = a, n.y = o, n.z = s, this;
  }
  makePerspective(e, t, n, r, a, o, s = Qt) {
    const l = this.elements, c = 2 * a / (t - e), d = 2 * a / (n - r), f = (t + e) / (t - e), h = (n + r) / (n - r);
    let m, _;
    if (s === Qt)
      m = -(o + a) / (o - a), _ = -2 * o * a / (o - a);
    else if (s === tr)
      m = -o / (o - a), _ = -o * a / (o - a);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = d, l[9] = h, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, a, o, s = Qt) {
    const l = this.elements, c = 1 / (t - e), d = 1 / (n - r), f = 1 / (o - a), h = (t + e) * c, m = (n + r) * d;
    let _, b;
    if (s === Qt)
      _ = (o + a) * f, b = -2 * f;
    else if (s === tr)
      _ = a * f, b = -1 * f;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -h, l[1] = 0, l[5] = 2 * d, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = b, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const Nn = /* @__PURE__ */ new D(), Ut = /* @__PURE__ */ new ct(), oc = /* @__PURE__ */ new D(0, 0, 0), lc = /* @__PURE__ */ new D(1, 1, 1), on = /* @__PURE__ */ new D(), wi = /* @__PURE__ */ new D(), Mt = /* @__PURE__ */ new D(), fs = /* @__PURE__ */ new ct(), hs = /* @__PURE__ */ new An();
class or {
  constructor(e = 0, t = 0, n = 0, r = or.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, a = r[0], o = r[4], s = r[8], l = r[1], c = r[5], d = r[9], f = r[2], h = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(bt(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(-d, m), this._z = Math.atan2(-o, a)) : (this._x = Math.atan2(h, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-bt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(s, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, a), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(bt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-f, m), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, a));
        break;
      case "ZYX":
        this._y = Math.asin(-bt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(h, m), this._z = Math.atan2(l, a)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(bt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-d, c), this._y = Math.atan2(-f, a)) : (this._x = 0, this._y = Math.atan2(s, m));
        break;
      case "XZY":
        this._z = Math.asin(-bt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(h, c), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-d, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return fs.makeRotationFromQuaternion(e), this.setFromRotationMatrix(fs, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return hs.setFromEuler(this), this.setFromQuaternion(hs, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
or.DEFAULT_ORDER = "XYZ";
class wo {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let cc = 0;
const ps = /* @__PURE__ */ new D(), Fn = /* @__PURE__ */ new An(), Yt = /* @__PURE__ */ new ct(), Ci = /* @__PURE__ */ new D(), li = /* @__PURE__ */ new D(), uc = /* @__PURE__ */ new D(), dc = /* @__PURE__ */ new An(), ms = /* @__PURE__ */ new D(1, 0, 0), gs = /* @__PURE__ */ new D(0, 1, 0), _s = /* @__PURE__ */ new D(0, 0, 1), fc = { type: "added" }, hc = { type: "removed" };
class At extends Rn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: cc++ }), this.uuid = _i(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = At.DEFAULT_UP.clone();
    const e = new D(), t = new or(), n = new An(), r = new D(1, 1, 1);
    function a() {
      n.setFromEuler(t, !1);
    }
    function o() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(a), n._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new ct()
      },
      normalMatrix: {
        value: new Ge()
      }
    }), this.matrix = new ct(), this.matrixWorld = new ct(), this.matrixAutoUpdate = At.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new wo(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return Fn.setFromAxisAngle(e, t), this.quaternion.multiply(Fn), this;
  }
  rotateOnWorldAxis(e, t) {
    return Fn.setFromAxisAngle(e, t), this.quaternion.premultiply(Fn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(ms, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(gs, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(_s, e);
  }
  translateOnAxis(e, t) {
    return ps.copy(e).applyQuaternion(this.quaternion), this.position.add(ps.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(ms, e);
  }
  translateY(e) {
    return this.translateOnAxis(gs, e);
  }
  translateZ(e) {
    return this.translateOnAxis(_s, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Yt.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Ci.copy(e) : Ci.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), li.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Yt.lookAt(li, Ci, this.up) : Yt.lookAt(Ci, li, this.up), this.quaternion.setFromRotationMatrix(Yt), r && (Yt.extractRotation(r.matrixWorld), Fn.setFromRotationMatrix(Yt), this.quaternion.premultiply(Fn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(fc)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(hc)), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Yt.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Yt.multiply(e.parent.matrixWorld)), e.applyMatrix4(Yt), this.add(e), e.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const o = this.children[n].getObjectByProperty(e, t);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let a = 0, o = r.length; a < o; a++)
      r[a].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(li, e, uc), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(li, dc, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++) {
      const a = t[n];
      (a.matrixWorldAutoUpdate === !0 || e === !0) && a.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.matrixWorldAutoUpdate === !0 && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) {
      const r = this.children;
      for (let a = 0, o = r.length; a < o; a++) {
        const s = r[a];
        s.matrixWorldAutoUpdate === !0 && s.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((s) => ({
      boxInitialized: s.boxInitialized,
      boxMin: s.box.min.toArray(),
      boxMax: s.box.max.toArray(),
      sphereInitialized: s.sphereInitialized,
      sphereRadius: s.sphere.radius,
      sphereCenter: s.sphere.center.toArray()
    })), r.maxGeometryCount = this._maxGeometryCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function a(s, l) {
      return s[l.uuid] === void 0 && (s[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = a(e.geometries, this.geometry);
      const s = this.geometry.parameters;
      if (s !== void 0 && s.shapes !== void 0) {
        const l = s.shapes;
        if (Array.isArray(l))
          for (let c = 0, d = l.length; c < d; c++) {
            const f = l[c];
            a(e.shapes, f);
          }
        else
          a(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (a(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const s = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          s.push(a(e.materials, this.material[l]));
        r.material = s;
      } else
        r.material = a(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let s = 0; s < this.children.length; s++)
        r.children.push(this.children[s].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let s = 0; s < this.animations.length; s++) {
        const l = this.animations[s];
        r.animations.push(a(e.animations, l));
      }
    }
    if (t) {
      const s = o(e.geometries), l = o(e.materials), c = o(e.textures), d = o(e.images), f = o(e.shapes), h = o(e.skeletons), m = o(e.animations), _ = o(e.nodes);
      s.length > 0 && (n.geometries = s), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), d.length > 0 && (n.images = d), f.length > 0 && (n.shapes = f), h.length > 0 && (n.skeletons = h), m.length > 0 && (n.animations = m), _.length > 0 && (n.nodes = _);
    }
    return n.object = r, n;
    function o(s) {
      const l = [];
      for (const c in s) {
        const d = s[c];
        delete d.metadata, l.push(d);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
At.DEFAULT_UP = /* @__PURE__ */ new D(0, 1, 0);
At.DEFAULT_MATRIX_AUTO_UPDATE = !0;
At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const It = /* @__PURE__ */ new D(), jt = /* @__PURE__ */ new D(), Pr = /* @__PURE__ */ new D(), Kt = /* @__PURE__ */ new D(), On = /* @__PURE__ */ new D(), Bn = /* @__PURE__ */ new D(), bs = /* @__PURE__ */ new D(), Lr = /* @__PURE__ */ new D(), Dr = /* @__PURE__ */ new D(), Ur = /* @__PURE__ */ new D();
let Pi = !1;
class Nt {
  constructor(e = new D(), t = new D(), n = new D()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), It.subVectors(e, t), r.cross(It);
    const a = r.lengthSq();
    return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, a) {
    It.subVectors(r, t), jt.subVectors(n, t), Pr.subVectors(e, t);
    const o = It.dot(It), s = It.dot(jt), l = It.dot(Pr), c = jt.dot(jt), d = jt.dot(Pr), f = o * c - s * s;
    if (f === 0)
      return a.set(0, 0, 0), null;
    const h = 1 / f, m = (c * l - s * d) * h, _ = (o * d - s * l) * h;
    return a.set(1 - m - _, _, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, Kt) === null ? !1 : Kt.x >= 0 && Kt.y >= 0 && Kt.x + Kt.y <= 1;
  }
  static getUV(e, t, n, r, a, o, s, l) {
    return Pi === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), Pi = !0), this.getInterpolation(e, t, n, r, a, o, s, l);
  }
  static getInterpolation(e, t, n, r, a, o, s, l) {
    return this.getBarycoord(e, t, n, r, Kt) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(a, Kt.x), l.addScaledVector(o, Kt.y), l.addScaledVector(s, Kt.z), l);
  }
  static isFrontFacing(e, t, n, r) {
    return It.subVectors(n, t), jt.subVectors(e, t), It.cross(jt).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return It.subVectors(this.c, this.b), jt.subVectors(this.a, this.b), It.cross(jt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Nt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Nt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, n, r, a) {
    return Pi === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), Pi = !0), Nt.getInterpolation(e, this.a, this.b, this.c, t, n, r, a);
  }
  getInterpolation(e, t, n, r, a) {
    return Nt.getInterpolation(e, this.a, this.b, this.c, t, n, r, a);
  }
  containsPoint(e) {
    return Nt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Nt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, a = this.c;
    let o, s;
    On.subVectors(r, n), Bn.subVectors(a, n), Lr.subVectors(e, n);
    const l = On.dot(Lr), c = Bn.dot(Lr);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    Dr.subVectors(e, r);
    const d = On.dot(Dr), f = Bn.dot(Dr);
    if (d >= 0 && f <= d)
      return t.copy(r);
    const h = l * f - d * c;
    if (h <= 0 && l >= 0 && d <= 0)
      return o = l / (l - d), t.copy(n).addScaledVector(On, o);
    Ur.subVectors(e, a);
    const m = On.dot(Ur), _ = Bn.dot(Ur);
    if (_ >= 0 && m <= _)
      return t.copy(a);
    const b = m * c - l * _;
    if (b <= 0 && c >= 0 && _ <= 0)
      return s = c / (c - _), t.copy(n).addScaledVector(Bn, s);
    const p = d * _ - m * f;
    if (p <= 0 && f - d >= 0 && m - _ >= 0)
      return bs.subVectors(a, r), s = (f - d) / (f - d + (m - _)), t.copy(r).addScaledVector(bs, s);
    const u = 1 / (p + b + h);
    return o = b * u, s = h * u, t.copy(n).addScaledVector(On, o).addScaledVector(Bn, s);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Co = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, ln = { h: 0, s: 0, l: 0 }, Li = { h: 0, s: 0, l: 0 };
function Ir(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class We {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = ot) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ye.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = Ye.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ye.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = Ye.workingColorSpace) {
    if (e = Ql(e, 1), t = bt(t, 0, 1), n = bt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const a = n <= 0.5 ? n * (1 + t) : n + t - n * t, o = 2 * n - a;
      this.r = Ir(o, a, e + 1 / 3), this.g = Ir(o, a, e), this.b = Ir(o, a, e - 1 / 3);
    }
    return Ye.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = ot) {
    function n(a) {
      a !== void 0 && parseFloat(a) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let a;
      const o = r[1], s = r[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setRGB(
              Math.min(255, parseInt(a[1], 10)) / 255,
              Math.min(255, parseInt(a[2], 10)) / 255,
              Math.min(255, parseInt(a[3], 10)) / 255,
              t
            );
          if (a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setRGB(
              Math.min(100, parseInt(a[1], 10)) / 100,
              Math.min(100, parseInt(a[2], 10)) / 100,
              Math.min(100, parseInt(a[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setHSL(
              parseFloat(a[1]) / 360,
              parseFloat(a[2]) / 100,
              parseFloat(a[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const a = r[1], o = a.length;
      if (o === 3)
        return this.setRGB(
          parseInt(a.charAt(0), 16) / 15,
          parseInt(a.charAt(1), 16) / 15,
          parseInt(a.charAt(2), 16) / 15,
          t
        );
      if (o === 6)
        return this.setHex(parseInt(a, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = ot) {
    const n = Co[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Kn(e.r), this.g = Kn(e.g), this.b = Kn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Sr(e.r), this.g = Sr(e.g), this.b = Sr(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = ot) {
    return Ye.fromWorkingColorSpace(ft.copy(this), e), Math.round(bt(ft.r * 255, 0, 255)) * 65536 + Math.round(bt(ft.g * 255, 0, 255)) * 256 + Math.round(bt(ft.b * 255, 0, 255));
  }
  getHexString(e = ot) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Ye.workingColorSpace) {
    Ye.fromWorkingColorSpace(ft.copy(this), t);
    const n = ft.r, r = ft.g, a = ft.b, o = Math.max(n, r, a), s = Math.min(n, r, a);
    let l, c;
    const d = (s + o) / 2;
    if (s === o)
      l = 0, c = 0;
    else {
      const f = o - s;
      switch (c = d <= 0.5 ? f / (o + s) : f / (2 - o - s), o) {
        case n:
          l = (r - a) / f + (r < a ? 6 : 0);
          break;
        case r:
          l = (a - n) / f + 2;
          break;
        case a:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = d, e;
  }
  getRGB(e, t = Ye.workingColorSpace) {
    return Ye.fromWorkingColorSpace(ft.copy(this), t), e.r = ft.r, e.g = ft.g, e.b = ft.b, e;
  }
  getStyle(e = ot) {
    Ye.fromWorkingColorSpace(ft.copy(this), e);
    const t = ft.r, n = ft.g, r = ft.b;
    return e !== ot ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(ln), this.setHSL(ln.h + e, ln.s + t, ln.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(ln), e.getHSL(Li);
    const n = vr(ln.h, Li.h, t), r = vr(ln.s, Li.s, t), a = vr(ln.l, Li.l, t);
    return this.setHSL(n, r, a), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, a = e.elements;
    return this.r = a[0] * t + a[3] * n + a[6] * r, this.g = a[1] * t + a[4] * n + a[7] * r, this.b = a[2] * t + a[5] * n + a[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const ft = /* @__PURE__ */ new We();
We.NAMES = Co;
let pc = 0;
class lr extends Rn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: pc++ }), this.uuid = _i(), this.name = "", this.type = "Material", this.blending = jn, this.side = tn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Zi, this.blendDst = Yr, this.blendEquation = un, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new We(0, 0, 0), this.blendAlpha = 0, this.depthFunc = $i, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = rs, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Pn, this.stencilZFail = Pn, this.stencilZPass = Pn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== jn && (n.blending = this.blending), this.side !== tn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== Zi && (n.blendSrc = this.blendSrc), this.blendDst !== Yr && (n.blendDst = this.blendDst), this.blendEquation !== un && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== $i && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== rs && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Pn && (n.stencilFail = this.stencilFail), this.stencilZFail !== Pn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Pn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(a) {
      const o = [];
      for (const s in a) {
        const l = a[s];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (t) {
      const a = r(e.textures), o = r(e.images);
      a.length > 0 && (n.textures = a), o.length > 0 && (n.images = o);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let a = 0; a !== r; ++a)
        n[a] = t[a].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class ua extends lr {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new We(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = oo, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const et = /* @__PURE__ */ new D(), Di = /* @__PURE__ */ new be();
class Ht {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = as, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = fn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  get updateRange() {
    return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, a = this.itemSize; r < a; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Di.fromBufferAttribute(this, t), Di.applyMatrix3(e), this.setXY(t, Di.x, Di.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        et.fromBufferAttribute(this, t), et.applyMatrix3(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.applyMatrix4(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.applyNormalMatrix(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.transformDirection(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = ai(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = vt(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = ai(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = vt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = ai(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = vt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = ai(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = vt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = ai(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = vt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = vt(t, this.array), n = vt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = vt(t, this.array), n = vt(n, this.array), r = vt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, a) {
    return e *= this.itemSize, this.normalized && (t = vt(t, this.array), n = vt(n, this.array), r = vt(r, this.array), a = vt(a, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = a, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== as && (e.usage = this.usage), e;
  }
}
class Po extends Ht {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Lo extends Ht {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class xt extends Ht {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let mc = 0;
const wt = /* @__PURE__ */ new ct(), Nr = /* @__PURE__ */ new At(), zn = /* @__PURE__ */ new D(), Et = /* @__PURE__ */ new bi(), ci = /* @__PURE__ */ new bi(), st = /* @__PURE__ */ new D();
class Vt extends Rn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: mc++ }), this.uuid = _i(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Mo(e) ? Lo : Po)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const a = new Ge().getNormalMatrix(e);
      n.applyNormalMatrix(a), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return wt.makeRotationFromQuaternion(e), this.applyMatrix4(wt), this;
  }
  rotateX(e) {
    return wt.makeRotationX(e), this.applyMatrix4(wt), this;
  }
  rotateY(e) {
    return wt.makeRotationY(e), this.applyMatrix4(wt), this;
  }
  rotateZ(e) {
    return wt.makeRotationZ(e), this.applyMatrix4(wt), this;
  }
  translate(e, t, n) {
    return wt.makeTranslation(e, t, n), this.applyMatrix4(wt), this;
  }
  scale(e, t, n) {
    return wt.makeScale(e, t, n), this.applyMatrix4(wt), this;
  }
  lookAt(e) {
    return Nr.lookAt(e), Nr.updateMatrix(), this.applyMatrix4(Nr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(zn).negate(), this.translate(zn.x, zn.y, zn.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let n = 0, r = e.length; n < r; n++) {
      const a = e[n];
      t.push(a.x, a.y, a.z || 0);
    }
    return this.setAttribute("position", new xt(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new bi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new D(-1 / 0, -1 / 0, -1 / 0),
        new D(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const a = t[n];
          Et.setFromBufferAttribute(a), this.morphTargetsRelative ? (st.addVectors(this.boundingBox.min, Et.min), this.boundingBox.expandByPoint(st), st.addVectors(this.boundingBox.max, Et.max), this.boundingBox.expandByPoint(st)) : (this.boundingBox.expandByPoint(Et.min), this.boundingBox.expandByPoint(Et.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new ca());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new D(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Et.setFromBufferAttribute(e), t)
        for (let a = 0, o = t.length; a < o; a++) {
          const s = t[a];
          ci.setFromBufferAttribute(s), this.morphTargetsRelative ? (st.addVectors(Et.min, ci.min), Et.expandByPoint(st), st.addVectors(Et.max, ci.max), Et.expandByPoint(st)) : (Et.expandByPoint(ci.min), Et.expandByPoint(ci.max));
        }
      Et.getCenter(n);
      let r = 0;
      for (let a = 0, o = e.count; a < o; a++)
        st.fromBufferAttribute(e, a), r = Math.max(r, n.distanceToSquared(st));
      if (t)
        for (let a = 0, o = t.length; a < o; a++) {
          const s = t[a], l = this.morphTargetsRelative;
          for (let c = 0, d = s.count; c < d; c++)
            st.fromBufferAttribute(s, c), l && (zn.fromBufferAttribute(e, c), st.add(zn)), r = Math.max(r, n.distanceToSquared(st));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.array, r = t.position.array, a = t.normal.array, o = t.uv.array, s = r.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ht(new Float32Array(4 * s), 4));
    const l = this.getAttribute("tangent").array, c = [], d = [];
    for (let E = 0; E < s; E++)
      c[E] = new D(), d[E] = new D();
    const f = new D(), h = new D(), m = new D(), _ = new be(), b = new be(), p = new be(), u = new D(), v = new D();
    function g(E, z, q) {
      f.fromArray(r, E * 3), h.fromArray(r, z * 3), m.fromArray(r, q * 3), _.fromArray(o, E * 2), b.fromArray(o, z * 2), p.fromArray(o, q * 2), h.sub(f), m.sub(f), b.sub(_), p.sub(_);
      const le = 1 / (b.x * p.y - p.x * b.y);
      isFinite(le) && (u.copy(h).multiplyScalar(p.y).addScaledVector(m, -b.y).multiplyScalar(le), v.copy(m).multiplyScalar(b.x).addScaledVector(h, -p.x).multiplyScalar(le), c[E].add(u), c[z].add(u), c[q].add(u), d[E].add(v), d[z].add(v), d[q].add(v));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: n.length
    }]);
    for (let E = 0, z = T.length; E < z; ++E) {
      const q = T[E], le = q.start, L = q.count;
      for (let N = le, V = le + L; N < V; N += 3)
        g(
          n[N + 0],
          n[N + 1],
          n[N + 2]
        );
    }
    const C = new D(), R = new D(), w = new D(), H = new D();
    function y(E) {
      w.fromArray(a, E * 3), H.copy(w);
      const z = c[E];
      C.copy(z), C.sub(w.multiplyScalar(w.dot(z))).normalize(), R.crossVectors(H, z);
      const le = R.dot(d[E]) < 0 ? -1 : 1;
      l[E * 4] = C.x, l[E * 4 + 1] = C.y, l[E * 4 + 2] = C.z, l[E * 4 + 3] = le;
    }
    for (let E = 0, z = T.length; E < z; ++E) {
      const q = T[E], le = q.start, L = q.count;
      for (let N = le, V = le + L; N < V; N += 3)
        y(n[N + 0]), y(n[N + 1]), y(n[N + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Ht(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let h = 0, m = n.count; h < m; h++)
          n.setXYZ(h, 0, 0, 0);
      const r = new D(), a = new D(), o = new D(), s = new D(), l = new D(), c = new D(), d = new D(), f = new D();
      if (e)
        for (let h = 0, m = e.count; h < m; h += 3) {
          const _ = e.getX(h + 0), b = e.getX(h + 1), p = e.getX(h + 2);
          r.fromBufferAttribute(t, _), a.fromBufferAttribute(t, b), o.fromBufferAttribute(t, p), d.subVectors(o, a), f.subVectors(r, a), d.cross(f), s.fromBufferAttribute(n, _), l.fromBufferAttribute(n, b), c.fromBufferAttribute(n, p), s.add(d), l.add(d), c.add(d), n.setXYZ(_, s.x, s.y, s.z), n.setXYZ(b, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let h = 0, m = t.count; h < m; h += 3)
          r.fromBufferAttribute(t, h + 0), a.fromBufferAttribute(t, h + 1), o.fromBufferAttribute(t, h + 2), d.subVectors(o, a), f.subVectors(r, a), d.cross(f), n.setXYZ(h + 0, d.x, d.y, d.z), n.setXYZ(h + 1, d.x, d.y, d.z), n.setXYZ(h + 2, d.x, d.y, d.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      st.fromBufferAttribute(e, t), st.normalize(), e.setXYZ(t, st.x, st.y, st.z);
  }
  toNonIndexed() {
    function e(s, l) {
      const c = s.array, d = s.itemSize, f = s.normalized, h = new c.constructor(l.length * d);
      let m = 0, _ = 0;
      for (let b = 0, p = l.length; b < p; b++) {
        s.isInterleavedBufferAttribute ? m = l[b] * s.data.stride + s.offset : m = l[b] * d;
        for (let u = 0; u < d; u++)
          h[_++] = c[m++];
      }
      return new Ht(h, d, f);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Vt(), n = this.index.array, r = this.attributes;
    for (const s in r) {
      const l = r[s], c = e(l, n);
      t.setAttribute(s, c);
    }
    const a = this.morphAttributes;
    for (const s in a) {
      const l = [], c = a[s];
      for (let d = 0, f = c.length; d < f; d++) {
        const h = c[d], m = e(h, n);
        l.push(m);
      }
      t.morphAttributes[s] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let s = 0, l = o.length; s < l; s++) {
      const c = o[s];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let a = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], d = [];
      for (let f = 0, h = c.length; f < h; f++) {
        const m = c[f];
        d.push(m.toJSON(e.data));
      }
      d.length > 0 && (r[l] = d, a = !0);
    }
    a && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
    const s = this.boundingSphere;
    return s !== null && (e.data.boundingSphere = {
      center: s.center.toArray(),
      radius: s.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const r = e.attributes;
    for (const c in r) {
      const d = r[c];
      this.setAttribute(c, d.clone(t));
    }
    const a = e.morphAttributes;
    for (const c in a) {
      const d = [], f = a[c];
      for (let h = 0, m = f.length; h < m; h++)
        d.push(f[h].clone(t));
      this.morphAttributes[c] = d;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let c = 0, d = o.length; c < d; c++) {
      const f = o[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const s = e.boundingBox;
    s !== null && (this.boundingBox = s.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const xs = /* @__PURE__ */ new ct(), xn = /* @__PURE__ */ new Ro(), Ui = /* @__PURE__ */ new ca(), vs = /* @__PURE__ */ new D(), Gn = /* @__PURE__ */ new D(), kn = /* @__PURE__ */ new D(), Hn = /* @__PURE__ */ new D(), Fr = /* @__PURE__ */ new D(), Ii = /* @__PURE__ */ new D(), Ni = /* @__PURE__ */ new be(), Fi = /* @__PURE__ */ new be(), Oi = /* @__PURE__ */ new be(), ys = /* @__PURE__ */ new D(), Ss = /* @__PURE__ */ new D(), Ms = /* @__PURE__ */ new D(), Bi = /* @__PURE__ */ new D(), zi = /* @__PURE__ */ new D();
class Bt extends At {
  constructor(e = new Vt(), t = new ua()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let a = 0, o = r.length; a < o; a++) {
          const s = r[a].name || String(a);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = a;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, a = n.morphAttributes.position, o = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const s = this.morphTargetInfluences;
    if (a && s) {
      Ii.set(0, 0, 0);
      for (let l = 0, c = a.length; l < c; l++) {
        const d = s[l], f = a[l];
        d !== 0 && (Fr.fromBufferAttribute(f, e), o ? Ii.addScaledVector(Fr, d) : Ii.addScaledVector(Fr.sub(t), d));
      }
      t.add(Ii);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, a = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Ui.copy(n.boundingSphere), Ui.applyMatrix4(a), xn.copy(e.ray).recast(e.near), !(Ui.containsPoint(xn.origin) === !1 && (xn.intersectSphere(Ui, vs) === null || xn.origin.distanceToSquared(vs) > (e.far - e.near) ** 2)) && (xs.copy(a).invert(), xn.copy(e.ray).applyMatrix4(xs), !(n.boundingBox !== null && xn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, xn)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const a = this.geometry, o = this.material, s = a.index, l = a.attributes.position, c = a.attributes.uv, d = a.attributes.uv1, f = a.attributes.normal, h = a.groups, m = a.drawRange;
    if (s !== null)
      if (Array.isArray(o))
        for (let _ = 0, b = h.length; _ < b; _++) {
          const p = h[_], u = o[p.materialIndex], v = Math.max(p.start, m.start), g = Math.min(s.count, Math.min(p.start + p.count, m.start + m.count));
          for (let T = v, C = g; T < C; T += 3) {
            const R = s.getX(T), w = s.getX(T + 1), H = s.getX(T + 2);
            r = Gi(this, u, e, n, c, d, f, R, w, H), r && (r.faceIndex = Math.floor(T / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, m.start), b = Math.min(s.count, m.start + m.count);
        for (let p = _, u = b; p < u; p += 3) {
          const v = s.getX(p), g = s.getX(p + 1), T = s.getX(p + 2);
          r = Gi(this, o, e, n, c, d, f, v, g, T), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let _ = 0, b = h.length; _ < b; _++) {
          const p = h[_], u = o[p.materialIndex], v = Math.max(p.start, m.start), g = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
          for (let T = v, C = g; T < C; T += 3) {
            const R = T, w = T + 1, H = T + 2;
            r = Gi(this, u, e, n, c, d, f, R, w, H), r && (r.faceIndex = Math.floor(T / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, m.start), b = Math.min(l.count, m.start + m.count);
        for (let p = _, u = b; p < u; p += 3) {
          const v = p, g = p + 1, T = p + 2;
          r = Gi(this, o, e, n, c, d, f, v, g, T), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
  }
}
function gc(i, e, t, n, r, a, o, s) {
  let l;
  if (e.side === yt ? l = n.intersectTriangle(o, a, r, !0, s) : l = n.intersectTriangle(r, a, o, e.side === tn, s), l === null) return null;
  zi.copy(s), zi.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(zi);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: zi.clone(),
    object: i
  };
}
function Gi(i, e, t, n, r, a, o, s, l, c) {
  i.getVertexPosition(s, Gn), i.getVertexPosition(l, kn), i.getVertexPosition(c, Hn);
  const d = gc(i, e, t, n, Gn, kn, Hn, Bi);
  if (d) {
    r && (Ni.fromBufferAttribute(r, s), Fi.fromBufferAttribute(r, l), Oi.fromBufferAttribute(r, c), d.uv = Nt.getInterpolation(Bi, Gn, kn, Hn, Ni, Fi, Oi, new be())), a && (Ni.fromBufferAttribute(a, s), Fi.fromBufferAttribute(a, l), Oi.fromBufferAttribute(a, c), d.uv1 = Nt.getInterpolation(Bi, Gn, kn, Hn, Ni, Fi, Oi, new be()), d.uv2 = d.uv1), o && (ys.fromBufferAttribute(o, s), Ss.fromBufferAttribute(o, l), Ms.fromBufferAttribute(o, c), d.normal = Nt.getInterpolation(Bi, Gn, kn, Hn, ys, Ss, Ms, new D()), d.normal.dot(n.direction) > 0 && d.normal.multiplyScalar(-1));
    const f = {
      a: s,
      b: l,
      c,
      normal: new D(),
      materialIndex: 0
    };
    Nt.getNormal(Gn, kn, Hn, f.normal), d.face = f;
  }
  return d;
}
class xi extends Vt {
  constructor(e = 1, t = 1, n = 1, r = 1, a = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: a,
      depthSegments: o
    };
    const s = this;
    r = Math.floor(r), a = Math.floor(a), o = Math.floor(o);
    const l = [], c = [], d = [], f = [];
    let h = 0, m = 0;
    _("z", "y", "x", -1, -1, n, t, e, o, a, 0), _("z", "y", "x", 1, -1, n, t, -e, o, a, 1), _("x", "z", "y", 1, 1, e, n, t, r, o, 2), _("x", "z", "y", 1, -1, e, n, -t, r, o, 3), _("x", "y", "z", 1, -1, e, t, n, r, a, 4), _("x", "y", "z", -1, -1, e, t, -n, r, a, 5), this.setIndex(l), this.setAttribute("position", new xt(c, 3)), this.setAttribute("normal", new xt(d, 3)), this.setAttribute("uv", new xt(f, 2));
    function _(b, p, u, v, g, T, C, R, w, H, y) {
      const E = T / w, z = C / H, q = T / 2, le = C / 2, L = R / 2, N = w + 1, V = H + 1;
      let Y = 0, X = 0;
      const W = new D();
      for (let Q = 0; Q < V; Q++) {
        const te = Q * z - le;
        for (let de = 0; de < N; de++) {
          const k = de * E - q;
          W[b] = k * v, W[p] = te * g, W[u] = L, c.push(W.x, W.y, W.z), W[b] = 0, W[p] = 0, W[u] = R > 0 ? 1 : -1, d.push(W.x, W.y, W.z), f.push(de / w), f.push(1 - Q / H), Y += 1;
        }
      }
      for (let Q = 0; Q < H; Q++)
        for (let te = 0; te < w; te++) {
          const de = h + te + N * Q, k = h + te + N * (Q + 1), K = h + (te + 1) + N * (Q + 1), ue = h + (te + 1) + N * Q;
          l.push(de, k, ue), l.push(k, K, ue), X += 6;
        }
      s.addGroup(m, X, y), m += X, h += Y;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new xi(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Jn(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r;
    }
  }
  return e;
}
function gt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = Jn(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function _c(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Do(i) {
  return i.getRenderTarget() === null ? i.outputColorSpace : Ye.workingColorSpace;
}
const gi = { clone: Jn, merge: gt };
var bc = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, xc = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class ht extends lr {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = bc, this.fragmentShader = xc, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      derivatives: !1,
      // set to use derivatives
      fragDepth: !1,
      // set to use fragment depth values
      drawBuffers: !1,
      // set to use draw buffers
      shaderTextureLOD: !1,
      // set to use shader texture LOD
      clipCullDistance: !1
      // set to use vertex shader clipping
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Jn(e.uniforms), this.uniformsGroups = _c(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const o = this.uniforms[r].value;
      o && o.isTexture ? t.uniforms[r] = {
        type: "t",
        value: o.toJSON(e).uuid
      } : o && o.isColor ? t.uniforms[r] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: o.toArray()
      } : t.uniforms[r] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class Uo extends At {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ct(), this.projectionMatrix = new ct(), this.projectionMatrixInverse = new ct(), this.coordinateSystem = Qt;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Pt extends Uo {
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Jr * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(ji * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Jr * 2 * Math.atan(
      Math.tan(ji * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, r, a, o) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(ji * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, a = -0.5 * r;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth, c = o.fullHeight;
      a += o.offsetX * r / l, t -= o.offsetY * n / c, r *= o.width / l, n *= o.height / c;
    }
    const s = this.filmOffset;
    s !== 0 && (a += e * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(a, a + r, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const Vn = -90, Wn = 1;
class vc extends At {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Pt(Vn, Wn, e, t);
    r.layers = this.layers, this.add(r);
    const a = new Pt(Vn, Wn, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Pt(Vn, Wn, e, t);
    o.layers = this.layers, this.add(o);
    const s = new Pt(Vn, Wn, e, t);
    s.layers = this.layers, this.add(s);
    const l = new Pt(Vn, Wn, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Pt(Vn, Wn, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, a, o, s, l] = t;
    for (const c of t) this.remove(c);
    if (e === Qt)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), a.up.set(0, 0, -1), a.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === tr)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), a.up.set(0, 0, 1), a.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [a, o, s, l, c, d] = this.children, f = e.getRenderTarget(), h = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const b = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, a), e.setRenderTarget(n, 1, r), e.render(t, o), e.setRenderTarget(n, 2, r), e.render(t, s), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = b, e.setRenderTarget(n, 5, r), e.render(t, d), e.setRenderTarget(f, h, m), e.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}
class Io extends Tt {
  constructor(e, t, n, r, a, o, s, l, c, d) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : Zn, super(e, t, n, r, a, o, s, l, c, d), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class yc extends zt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    t.encoding !== void 0 && (fi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), t.colorSpace = t.encoding === Tn ? ot : Lt), this.texture = new Io(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : Ct;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new xi(5, 5, 5), a = new ht({
      name: "CubemapFromEquirect",
      uniforms: Jn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: yt,
      blending: Jt
    });
    a.uniforms.tEquirect.value = t;
    const o = new Bt(r, a), s = t.minFilter;
    return t.minFilter === mi && (t.minFilter = Ct), new vc(1, 10, this).update(e, o), t.minFilter = s, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const a = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, n, r);
    e.setRenderTarget(a);
  }
}
const Or = /* @__PURE__ */ new D(), Sc = /* @__PURE__ */ new D(), Mc = /* @__PURE__ */ new Ge();
class cn {
  constructor(e = new D(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = Or.subVectors(n, t).cross(Sc.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(Or), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / r;
    return a < 0 || a > 1 ? null : t.copy(e.start).addScaledVector(n, a);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || Mc.getNormalMatrix(e), r = this.coplanarPoint(Or).applyMatrix4(e), a = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(a), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const vn = /* @__PURE__ */ new ca(), ki = /* @__PURE__ */ new D();
class No {
  constructor(e = new cn(), t = new cn(), n = new cn(), r = new cn(), a = new cn(), o = new cn()) {
    this.planes = [e, t, n, r, a, o];
  }
  set(e, t, n, r, a, o) {
    const s = this.planes;
    return s[0].copy(e), s[1].copy(t), s[2].copy(n), s[3].copy(r), s[4].copy(a), s[5].copy(o), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = Qt) {
    const n = this.planes, r = e.elements, a = r[0], o = r[1], s = r[2], l = r[3], c = r[4], d = r[5], f = r[6], h = r[7], m = r[8], _ = r[9], b = r[10], p = r[11], u = r[12], v = r[13], g = r[14], T = r[15];
    if (n[0].setComponents(l - a, h - c, p - m, T - u).normalize(), n[1].setComponents(l + a, h + c, p + m, T + u).normalize(), n[2].setComponents(l + o, h + d, p + _, T + v).normalize(), n[3].setComponents(l - o, h - d, p - _, T - v).normalize(), n[4].setComponents(l - s, h - f, p - b, T - g).normalize(), t === Qt)
      n[5].setComponents(l + s, h + f, p + b, T + g).normalize();
    else if (t === tr)
      n[5].setComponents(s, f, b, g).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(vn);
  }
  intersectsSprite(e) {
    return vn.center.set(0, 0, 0), vn.radius = 0.7071067811865476, vn.applyMatrix4(e.matrixWorld), this.intersectsSphere(vn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let a = 0; a < 6; a++)
      if (t[a].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (ki.x = r.normal.x > 0 ? e.max.x : e.min.x, ki.y = r.normal.y > 0 ? e.max.y : e.min.y, ki.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(ki) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function Fo() {
  let i = null, e = !1, t = null, n = null;
  function r(a, o) {
    t(a, o), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(a) {
      t = a;
    },
    setContext: function(a) {
      i = a;
    }
  };
}
function Ec(i, e) {
  const t = e.isWebGL2, n = /* @__PURE__ */ new WeakMap();
  function r(c, d) {
    const f = c.array, h = c.usage, m = f.byteLength, _ = i.createBuffer();
    i.bindBuffer(d, _), i.bufferData(d, f, h), c.onUploadCallback();
    let b;
    if (f instanceof Float32Array)
      b = i.FLOAT;
    else if (f instanceof Uint16Array)
      if (c.isFloat16BufferAttribute)
        if (t)
          b = i.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        b = i.UNSIGNED_SHORT;
    else if (f instanceof Int16Array)
      b = i.SHORT;
    else if (f instanceof Uint32Array)
      b = i.UNSIGNED_INT;
    else if (f instanceof Int32Array)
      b = i.INT;
    else if (f instanceof Int8Array)
      b = i.BYTE;
    else if (f instanceof Uint8Array)
      b = i.UNSIGNED_BYTE;
    else if (f instanceof Uint8ClampedArray)
      b = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + f);
    return {
      buffer: _,
      type: b,
      bytesPerElement: f.BYTES_PER_ELEMENT,
      version: c.version,
      size: m
    };
  }
  function a(c, d, f) {
    const h = d.array, m = d._updateRange, _ = d.updateRanges;
    if (i.bindBuffer(f, c), m.count === -1 && _.length === 0 && i.bufferSubData(f, 0, h), _.length !== 0) {
      for (let b = 0, p = _.length; b < p; b++) {
        const u = _[b];
        t ? i.bufferSubData(
          f,
          u.start * h.BYTES_PER_ELEMENT,
          h,
          u.start,
          u.count
        ) : i.bufferSubData(
          f,
          u.start * h.BYTES_PER_ELEMENT,
          h.subarray(u.start, u.start + u.count)
        );
      }
      d.clearUpdateRanges();
    }
    m.count !== -1 && (t ? i.bufferSubData(
      f,
      m.offset * h.BYTES_PER_ELEMENT,
      h,
      m.offset,
      m.count
    ) : i.bufferSubData(
      f,
      m.offset * h.BYTES_PER_ELEMENT,
      h.subarray(m.offset, m.offset + m.count)
    ), m.count = -1), d.onUploadCallback();
  }
  function o(c) {
    return c.isInterleavedBufferAttribute && (c = c.data), n.get(c);
  }
  function s(c) {
    c.isInterleavedBufferAttribute && (c = c.data);
    const d = n.get(c);
    d && (i.deleteBuffer(d.buffer), n.delete(c));
  }
  function l(c, d) {
    if (c.isGLBufferAttribute) {
      const h = n.get(c);
      (!h || h.version < c.version) && n.set(c, {
        buffer: c.buffer,
        type: c.type,
        bytesPerElement: c.elementSize,
        version: c.version
      });
      return;
    }
    c.isInterleavedBufferAttribute && (c = c.data);
    const f = n.get(c);
    if (f === void 0)
      n.set(c, r(c, d));
    else if (f.version < c.version) {
      if (f.size !== c.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      a(f.buffer, c, d), f.version = c.version;
    }
  }
  return {
    get: o,
    remove: s,
    update: l
  };
}
class da extends Vt {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const a = e / 2, o = t / 2, s = Math.floor(n), l = Math.floor(r), c = s + 1, d = l + 1, f = e / s, h = t / l, m = [], _ = [], b = [], p = [];
    for (let u = 0; u < d; u++) {
      const v = u * h - o;
      for (let g = 0; g < c; g++) {
        const T = g * f - a;
        _.push(T, -v, 0), b.push(0, 0, 1), p.push(g / s), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let v = 0; v < s; v++) {
        const g = v + c * u, T = v + c * (u + 1), C = v + 1 + c * (u + 1), R = v + 1 + c * u;
        m.push(g, T, R), m.push(T, C, R);
      }
    this.setIndex(m), this.setAttribute("position", new xt(_, 3)), this.setAttribute("normal", new xt(b, 3)), this.setAttribute("uv", new xt(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new da(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var Tc = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Ac = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Rc = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, wc = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Cc = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`, Pc = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Lc = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Dc = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Uc = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Ic = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`, Nc = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Fc = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Oc = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Bc = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, zc = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Gc = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`, kc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Hc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Vc = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Wc = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Xc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, qc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, Yc = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, jc = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Kc = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Zc = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, $c = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Qc = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Jc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, eu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, tu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", nu = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`, iu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, ru = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, au = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, su = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, ou = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, lu = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, cu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, uu = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, du = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, fu = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, hu = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, pu = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, mu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, gu = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, _u = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, bu = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, xu = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, vu = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, yu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Su = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Mu = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Eu = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Tu = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Au = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Ru = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, wu = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Cu = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Pu = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`, Lu = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`, Du = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Uu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Iu = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Nu = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Fu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Ou = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Bu = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, zu = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, Gu = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, ku = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, Hu = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Vu = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Wu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Xu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, qu = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Yu = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, ju = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Ku = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Zu = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, $u = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Qu = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Ju = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, ed = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, td = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, nd = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, id = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, rd = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, ad = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, sd = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`, od = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, ld = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, cd = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, ud = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, dd = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, fd = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, hd = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, pd = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, md = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, gd = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, _d = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, bd = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, xd = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, vd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, yd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Sd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Md = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Ed = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Td = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Ad = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Rd = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, wd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Cd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Pd = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Ld = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, Dd = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Ud = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, Id = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Nd = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Fd = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Od = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Bd = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, zd = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Gd = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, kd = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Hd = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Vd = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Wd = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Xd = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, qd = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Yd = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, jd = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Kd = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Zd = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, $d = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Qd = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Jd = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, ef = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, tf = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, nf = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, rf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ne = {
  alphahash_fragment: Tc,
  alphahash_pars_fragment: Ac,
  alphamap_fragment: Rc,
  alphamap_pars_fragment: wc,
  alphatest_fragment: Cc,
  alphatest_pars_fragment: Pc,
  aomap_fragment: Lc,
  aomap_pars_fragment: Dc,
  batching_pars_vertex: Uc,
  batching_vertex: Ic,
  begin_vertex: Nc,
  beginnormal_vertex: Fc,
  bsdfs: Oc,
  iridescence_fragment: Bc,
  bumpmap_pars_fragment: zc,
  clipping_planes_fragment: Gc,
  clipping_planes_pars_fragment: kc,
  clipping_planes_pars_vertex: Hc,
  clipping_planes_vertex: Vc,
  color_fragment: Wc,
  color_pars_fragment: Xc,
  color_pars_vertex: qc,
  color_vertex: Yc,
  common: jc,
  cube_uv_reflection_fragment: Kc,
  defaultnormal_vertex: Zc,
  displacementmap_pars_vertex: $c,
  displacementmap_vertex: Qc,
  emissivemap_fragment: Jc,
  emissivemap_pars_fragment: eu,
  colorspace_fragment: tu,
  colorspace_pars_fragment: nu,
  envmap_fragment: iu,
  envmap_common_pars_fragment: ru,
  envmap_pars_fragment: au,
  envmap_pars_vertex: su,
  envmap_physical_pars_fragment: bu,
  envmap_vertex: ou,
  fog_vertex: lu,
  fog_pars_vertex: cu,
  fog_fragment: uu,
  fog_pars_fragment: du,
  gradientmap_pars_fragment: fu,
  lightmap_fragment: hu,
  lightmap_pars_fragment: pu,
  lights_lambert_fragment: mu,
  lights_lambert_pars_fragment: gu,
  lights_pars_begin: _u,
  lights_toon_fragment: xu,
  lights_toon_pars_fragment: vu,
  lights_phong_fragment: yu,
  lights_phong_pars_fragment: Su,
  lights_physical_fragment: Mu,
  lights_physical_pars_fragment: Eu,
  lights_fragment_begin: Tu,
  lights_fragment_maps: Au,
  lights_fragment_end: Ru,
  logdepthbuf_fragment: wu,
  logdepthbuf_pars_fragment: Cu,
  logdepthbuf_pars_vertex: Pu,
  logdepthbuf_vertex: Lu,
  map_fragment: Du,
  map_pars_fragment: Uu,
  map_particle_fragment: Iu,
  map_particle_pars_fragment: Nu,
  metalnessmap_fragment: Fu,
  metalnessmap_pars_fragment: Ou,
  morphcolor_vertex: Bu,
  morphnormal_vertex: zu,
  morphtarget_pars_vertex: Gu,
  morphtarget_vertex: ku,
  normal_fragment_begin: Hu,
  normal_fragment_maps: Vu,
  normal_pars_fragment: Wu,
  normal_pars_vertex: Xu,
  normal_vertex: qu,
  normalmap_pars_fragment: Yu,
  clearcoat_normal_fragment_begin: ju,
  clearcoat_normal_fragment_maps: Ku,
  clearcoat_pars_fragment: Zu,
  iridescence_pars_fragment: $u,
  opaque_fragment: Qu,
  packing: Ju,
  premultiplied_alpha_fragment: ed,
  project_vertex: td,
  dithering_fragment: nd,
  dithering_pars_fragment: id,
  roughnessmap_fragment: rd,
  roughnessmap_pars_fragment: ad,
  shadowmap_pars_fragment: sd,
  shadowmap_pars_vertex: od,
  shadowmap_vertex: ld,
  shadowmask_pars_fragment: cd,
  skinbase_vertex: ud,
  skinning_pars_vertex: dd,
  skinning_vertex: fd,
  skinnormal_vertex: hd,
  specularmap_fragment: pd,
  specularmap_pars_fragment: md,
  tonemapping_fragment: gd,
  tonemapping_pars_fragment: _d,
  transmission_fragment: bd,
  transmission_pars_fragment: xd,
  uv_pars_fragment: vd,
  uv_pars_vertex: yd,
  uv_vertex: Sd,
  worldpos_vertex: Md,
  background_vert: Ed,
  background_frag: Td,
  backgroundCube_vert: Ad,
  backgroundCube_frag: Rd,
  cube_vert: wd,
  cube_frag: Cd,
  depth_vert: Pd,
  depth_frag: Ld,
  distanceRGBA_vert: Dd,
  distanceRGBA_frag: Ud,
  equirect_vert: Id,
  equirect_frag: Nd,
  linedashed_vert: Fd,
  linedashed_frag: Od,
  meshbasic_vert: Bd,
  meshbasic_frag: zd,
  meshlambert_vert: Gd,
  meshlambert_frag: kd,
  meshmatcap_vert: Hd,
  meshmatcap_frag: Vd,
  meshnormal_vert: Wd,
  meshnormal_frag: Xd,
  meshphong_vert: qd,
  meshphong_frag: Yd,
  meshphysical_vert: jd,
  meshphysical_frag: Kd,
  meshtoon_vert: Zd,
  meshtoon_frag: $d,
  points_vert: Qd,
  points_frag: Jd,
  shadow_vert: ef,
  shadow_frag: tf,
  sprite_vert: nf,
  sprite_frag: rf
}, oe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ge() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ge() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ge() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ge() },
    normalScale: { value: /* @__PURE__ */ new be(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ge() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ge() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new We(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ge() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ge() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new be(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ge() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ge() },
    alphaTest: { value: 0 }
  }
}, kt = {
  basic: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.fog
    ]),
    vertexShader: Ne.meshbasic_vert,
    fragmentShader: Ne.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: Ne.meshlambert_vert,
    fragmentShader: Ne.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        specular: { value: /* @__PURE__ */ new We(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ne.meshphong_vert,
    fragmentShader: Ne.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.roughnessmap,
      oe.metalnessmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: Ne.meshphysical_vert,
    fragmentShader: Ne.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.gradientmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: Ne.meshtoon_vert,
    fragmentShader: Ne.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ne.meshmatcap_vert,
    fragmentShader: Ne.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ gt([
      oe.points,
      oe.fog
    ]),
    vertexShader: Ne.points_vert,
    fragmentShader: Ne.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ne.linedashed_vert,
    fragmentShader: Ne.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.displacementmap
    ]),
    vertexShader: Ne.depth_vert,
    fragmentShader: Ne.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ne.meshnormal_vert,
    fragmentShader: Ne.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ gt([
      oe.sprite,
      oe.fog
    ]),
    vertexShader: Ne.sprite_vert,
    fragmentShader: Ne.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ge() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ne.background_vert,
    fragmentShader: Ne.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ne.backgroundCube_vert,
    fragmentShader: Ne.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ne.cube_vert,
    fragmentShader: Ne.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ne.equirect_vert,
    fragmentShader: Ne.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ gt([
      oe.common,
      oe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new D() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ne.distanceRGBA_vert,
    fragmentShader: Ne.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ gt([
      oe.lights,
      oe.fog,
      {
        color: { value: /* @__PURE__ */ new We(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ne.shadow_vert,
    fragmentShader: Ne.shadow_frag
  }
};
kt.physical = {
  uniforms: /* @__PURE__ */ gt([
    kt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Ge() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ge() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new be(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ge() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Ge() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ge() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new We(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Ge() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ge() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Ge() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new be() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Ge() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new We(0) },
      specularColor: { value: /* @__PURE__ */ new We(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Ge() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Ge() },
      anisotropyVector: { value: /* @__PURE__ */ new be() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Ge() }
    }
  ]),
  vertexShader: Ne.meshphysical_vert,
  fragmentShader: Ne.meshphysical_frag
};
const Hi = { r: 0, b: 0, g: 0 };
function af(i, e, t, n, r, a, o) {
  const s = new We(0);
  let l = a === !0 ? 0 : 1, c, d, f = null, h = 0, m = null;
  function _(p, u) {
    let v = !1, g = u.isScene === !0 ? u.background : null;
    g && g.isTexture && (g = (u.backgroundBlurriness > 0 ? t : e).get(g)), g === null ? b(s, l) : g && g.isColor && (b(g, 1), v = !0);
    const T = i.xr.getEnvironmentBlendMode();
    T === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : T === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || v) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), g && (g.isCubeTexture || g.mapping === ar) ? (d === void 0 && (d = new Bt(
      new xi(1, 1, 1),
      new ht({
        name: "BackgroundCubeMaterial",
        uniforms: Jn(kt.backgroundCube.uniforms),
        vertexShader: kt.backgroundCube.vertexShader,
        fragmentShader: kt.backgroundCube.fragmentShader,
        side: yt,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), d.geometry.deleteAttribute("normal"), d.geometry.deleteAttribute("uv"), d.onBeforeRender = function(C, R, w) {
      this.matrixWorld.copyPosition(w.matrixWorld);
    }, Object.defineProperty(d.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(d)), d.material.uniforms.envMap.value = g, d.material.uniforms.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, d.material.uniforms.backgroundBlurriness.value = u.backgroundBlurriness, d.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, d.material.toneMapped = Ye.getTransfer(g.colorSpace) !== Ke, (f !== g || h !== g.version || m !== i.toneMapping) && (d.material.needsUpdate = !0, f = g, h = g.version, m = i.toneMapping), d.layers.enableAll(), p.unshift(d, d.geometry, d.material, 0, 0, null)) : g && g.isTexture && (c === void 0 && (c = new Bt(
      new da(2, 2),
      new ht({
        name: "BackgroundMaterial",
        uniforms: Jn(kt.background.uniforms),
        vertexShader: kt.background.vertexShader,
        fragmentShader: kt.background.fragmentShader,
        side: tn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = g, c.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, c.material.toneMapped = Ye.getTransfer(g.colorSpace) !== Ke, g.matrixAutoUpdate === !0 && g.updateMatrix(), c.material.uniforms.uvTransform.value.copy(g.matrix), (f !== g || h !== g.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, f = g, h = g.version, m = i.toneMapping), c.layers.enableAll(), p.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function b(p, u) {
    p.getRGB(Hi, Do(i)), n.buffers.color.setClear(Hi.r, Hi.g, Hi.b, u, o);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(p, u = 1) {
      s.set(p), l = u, b(s, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(p) {
      l = p, b(s, l);
    },
    render: _
  };
}
function sf(i, e, t, n) {
  const r = i.getParameter(i.MAX_VERTEX_ATTRIBS), a = n.isWebGL2 ? null : e.get("OES_vertex_array_object"), o = n.isWebGL2 || a !== null, s = {}, l = p(null);
  let c = l, d = !1;
  function f(L, N, V, Y, X) {
    let W = !1;
    if (o) {
      const Q = b(Y, V, N);
      c !== Q && (c = Q, m(c.object)), W = u(L, Y, V, X), W && v(L, Y, V, X);
    } else {
      const Q = N.wireframe === !0;
      (c.geometry !== Y.id || c.program !== V.id || c.wireframe !== Q) && (c.geometry = Y.id, c.program = V.id, c.wireframe = Q, W = !0);
    }
    X !== null && t.update(X, i.ELEMENT_ARRAY_BUFFER), (W || d) && (d = !1, H(L, N, V, Y), X !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(X).buffer));
  }
  function h() {
    return n.isWebGL2 ? i.createVertexArray() : a.createVertexArrayOES();
  }
  function m(L) {
    return n.isWebGL2 ? i.bindVertexArray(L) : a.bindVertexArrayOES(L);
  }
  function _(L) {
    return n.isWebGL2 ? i.deleteVertexArray(L) : a.deleteVertexArrayOES(L);
  }
  function b(L, N, V) {
    const Y = V.wireframe === !0;
    let X = s[L.id];
    X === void 0 && (X = {}, s[L.id] = X);
    let W = X[N.id];
    W === void 0 && (W = {}, X[N.id] = W);
    let Q = W[Y];
    return Q === void 0 && (Q = p(h()), W[Y] = Q), Q;
  }
  function p(L) {
    const N = [], V = [], Y = [];
    for (let X = 0; X < r; X++)
      N[X] = 0, V[X] = 0, Y[X] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: N,
      enabledAttributes: V,
      attributeDivisors: Y,
      object: L,
      attributes: {},
      index: null
    };
  }
  function u(L, N, V, Y) {
    const X = c.attributes, W = N.attributes;
    let Q = 0;
    const te = V.getAttributes();
    for (const de in te)
      if (te[de].location >= 0) {
        const K = X[de];
        let ue = W[de];
        if (ue === void 0 && (de === "instanceMatrix" && L.instanceMatrix && (ue = L.instanceMatrix), de === "instanceColor" && L.instanceColor && (ue = L.instanceColor)), K === void 0 || K.attribute !== ue || ue && K.data !== ue.data) return !0;
        Q++;
      }
    return c.attributesNum !== Q || c.index !== Y;
  }
  function v(L, N, V, Y) {
    const X = {}, W = N.attributes;
    let Q = 0;
    const te = V.getAttributes();
    for (const de in te)
      if (te[de].location >= 0) {
        let K = W[de];
        K === void 0 && (de === "instanceMatrix" && L.instanceMatrix && (K = L.instanceMatrix), de === "instanceColor" && L.instanceColor && (K = L.instanceColor));
        const ue = {};
        ue.attribute = K, K && K.data && (ue.data = K.data), X[de] = ue, Q++;
      }
    c.attributes = X, c.attributesNum = Q, c.index = Y;
  }
  function g() {
    const L = c.newAttributes;
    for (let N = 0, V = L.length; N < V; N++)
      L[N] = 0;
  }
  function T(L) {
    C(L, 0);
  }
  function C(L, N) {
    const V = c.newAttributes, Y = c.enabledAttributes, X = c.attributeDivisors;
    V[L] = 1, Y[L] === 0 && (i.enableVertexAttribArray(L), Y[L] = 1), X[L] !== N && ((n.isWebGL2 ? i : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](L, N), X[L] = N);
  }
  function R() {
    const L = c.newAttributes, N = c.enabledAttributes;
    for (let V = 0, Y = N.length; V < Y; V++)
      N[V] !== L[V] && (i.disableVertexAttribArray(V), N[V] = 0);
  }
  function w(L, N, V, Y, X, W, Q) {
    Q === !0 ? i.vertexAttribIPointer(L, N, V, X, W) : i.vertexAttribPointer(L, N, V, Y, X, W);
  }
  function H(L, N, V, Y) {
    if (n.isWebGL2 === !1 && (L.isInstancedMesh || Y.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
      return;
    g();
    const X = Y.attributes, W = V.getAttributes(), Q = N.defaultAttributeValues;
    for (const te in W) {
      const de = W[te];
      if (de.location >= 0) {
        let k = X[te];
        if (k === void 0 && (te === "instanceMatrix" && L.instanceMatrix && (k = L.instanceMatrix), te === "instanceColor" && L.instanceColor && (k = L.instanceColor)), k !== void 0) {
          const K = k.normalized, ue = k.itemSize, xe = t.get(k);
          if (xe === void 0) continue;
          const ge = xe.buffer, Ce = xe.type, Pe = xe.bytesPerElement, Ee = n.isWebGL2 === !0 && (Ce === i.INT || Ce === i.UNSIGNED_INT || k.gpuType === po);
          if (k.isInterleavedBufferAttribute) {
            const ke = k.data, I = ke.stride, it = k.offset;
            if (ke.isInstancedInterleavedBuffer) {
              for (let Se = 0; Se < de.locationSize; Se++)
                C(de.location + Se, ke.meshPerAttribute);
              L.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = ke.meshPerAttribute * ke.count);
            } else
              for (let Se = 0; Se < de.locationSize; Se++)
                T(de.location + Se);
            i.bindBuffer(i.ARRAY_BUFFER, ge);
            for (let Se = 0; Se < de.locationSize; Se++)
              w(
                de.location + Se,
                ue / de.locationSize,
                Ce,
                K,
                I * Pe,
                (it + ue / de.locationSize * Se) * Pe,
                Ee
              );
          } else {
            if (k.isInstancedBufferAttribute) {
              for (let ke = 0; ke < de.locationSize; ke++)
                C(de.location + ke, k.meshPerAttribute);
              L.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = k.meshPerAttribute * k.count);
            } else
              for (let ke = 0; ke < de.locationSize; ke++)
                T(de.location + ke);
            i.bindBuffer(i.ARRAY_BUFFER, ge);
            for (let ke = 0; ke < de.locationSize; ke++)
              w(
                de.location + ke,
                ue / de.locationSize,
                Ce,
                K,
                ue * Pe,
                ue / de.locationSize * ke * Pe,
                Ee
              );
          }
        } else if (Q !== void 0) {
          const K = Q[te];
          if (K !== void 0)
            switch (K.length) {
              case 2:
                i.vertexAttrib2fv(de.location, K);
                break;
              case 3:
                i.vertexAttrib3fv(de.location, K);
                break;
              case 4:
                i.vertexAttrib4fv(de.location, K);
                break;
              default:
                i.vertexAttrib1fv(de.location, K);
            }
        }
      }
    }
    R();
  }
  function y() {
    q();
    for (const L in s) {
      const N = s[L];
      for (const V in N) {
        const Y = N[V];
        for (const X in Y)
          _(Y[X].object), delete Y[X];
        delete N[V];
      }
      delete s[L];
    }
  }
  function E(L) {
    if (s[L.id] === void 0) return;
    const N = s[L.id];
    for (const V in N) {
      const Y = N[V];
      for (const X in Y)
        _(Y[X].object), delete Y[X];
      delete N[V];
    }
    delete s[L.id];
  }
  function z(L) {
    for (const N in s) {
      const V = s[N];
      if (V[L.id] === void 0) continue;
      const Y = V[L.id];
      for (const X in Y)
        _(Y[X].object), delete Y[X];
      delete V[L.id];
    }
  }
  function q() {
    le(), d = !0, c !== l && (c = l, m(c.object));
  }
  function le() {
    l.geometry = null, l.program = null, l.wireframe = !1;
  }
  return {
    setup: f,
    reset: q,
    resetDefaultState: le,
    dispose: y,
    releaseStatesOfGeometry: E,
    releaseStatesOfProgram: z,
    initAttributes: g,
    enableAttribute: T,
    disableUnusedAttributes: R
  };
}
function of(i, e, t, n) {
  const r = n.isWebGL2;
  let a;
  function o(d) {
    a = d;
  }
  function s(d, f) {
    i.drawArrays(a, d, f), t.update(f, a, 1);
  }
  function l(d, f, h) {
    if (h === 0) return;
    let m, _;
    if (r)
      m = i, _ = "drawArraysInstanced";
    else if (m = e.get("ANGLE_instanced_arrays"), _ = "drawArraysInstancedANGLE", m === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    m[_](a, d, f, h), t.update(f, a, h);
  }
  function c(d, f, h) {
    if (h === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let _ = 0; _ < h; _++)
        this.render(d[_], f[_]);
    else {
      m.multiDrawArraysWEBGL(a, d, 0, f, 0, h);
      let _ = 0;
      for (let b = 0; b < h; b++)
        _ += f[b];
      t.update(_, a, 1);
    }
  }
  this.setMode = o, this.render = s, this.renderInstances = l, this.renderMultiDraw = c;
}
function lf(i, e, t) {
  let n;
  function r() {
    if (n !== void 0) return n;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const w = e.get("EXT_texture_filter_anisotropic");
      n = i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      n = 0;
    return n;
  }
  function a(w) {
    if (w === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      w = "mediump";
    }
    return w === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  const o = typeof WebGL2RenderingContext < "u" && i.constructor.name === "WebGL2RenderingContext";
  let s = t.precision !== void 0 ? t.precision : "highp";
  const l = a(s);
  l !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", l, "instead."), s = l);
  const c = o || e.has("WEBGL_draw_buffers"), d = t.logarithmicDepthBuffer === !0, f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), h = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), m = i.getParameter(i.MAX_TEXTURE_SIZE), _ = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), b = i.getParameter(i.MAX_VERTEX_ATTRIBS), p = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), u = i.getParameter(i.MAX_VARYING_VECTORS), v = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), g = h > 0, T = o || e.has("OES_texture_float"), C = g && T, R = o ? i.getParameter(i.MAX_SAMPLES) : 0;
  return {
    isWebGL2: o,
    drawBuffers: c,
    getMaxAnisotropy: r,
    getMaxPrecision: a,
    precision: s,
    logarithmicDepthBuffer: d,
    maxTextures: f,
    maxVertexTextures: h,
    maxTextureSize: m,
    maxCubemapSize: _,
    maxAttributes: b,
    maxVertexUniforms: p,
    maxVaryings: u,
    maxFragmentUniforms: v,
    vertexTextures: g,
    floatFragmentTextures: T,
    floatVertexTextures: C,
    maxSamples: R
  };
}
function cf(i) {
  const e = this;
  let t = null, n = 0, r = !1, a = !1;
  const o = new cn(), s = new Ge(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, h) {
    const m = f.length !== 0 || h || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = h, n = f.length, m;
  }, this.beginShadows = function() {
    a = !0, d(null);
  }, this.endShadows = function() {
    a = !1;
  }, this.setGlobalState = function(f, h) {
    t = d(f, h, 0);
  }, this.setState = function(f, h, m) {
    const _ = f.clippingPlanes, b = f.clipIntersection, p = f.clipShadows, u = i.get(f);
    if (!r || _ === null || _.length === 0 || a && !p)
      a ? d(null) : c();
    else {
      const v = a ? 0 : n, g = v * 4;
      let T = u.clippingState || null;
      l.value = T, T = d(_, h, g, m);
      for (let C = 0; C !== g; ++C)
        T[C] = t[C];
      u.clippingState = T, this.numIntersection = b ? this.numPlanes : 0, this.numPlanes += v;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function d(f, h, m, _) {
    const b = f !== null ? f.length : 0;
    let p = null;
    if (b !== 0) {
      if (p = l.value, _ !== !0 || p === null) {
        const u = m + b * 4, v = h.matrixWorldInverse;
        s.getNormalMatrix(v), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let g = 0, T = m; g !== b; ++g, T += 4)
          o.copy(f[g]).applyMatrix4(v, s), o.normal.toArray(p, T), p[T + 3] = o.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return e.numPlanes = b, e.numIntersection = 0, p;
  }
}
function uf(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, s) {
    return s === jr ? o.mapping = Zn : s === Kr && (o.mapping = $n), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const s = o.mapping;
      if (s === jr || s === Kr)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return t(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new yc(l.height / 2);
            return c.fromEquirectangularTexture(i, o), e.set(o, c), o.addEventListener("dispose", r), t(c.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function r(o) {
    const s = o.target;
    s.removeEventListener("dispose", r);
    const l = e.get(s);
    l !== void 0 && (e.delete(s), l.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: a
  };
}
class Oo extends Uo {
  constructor(e = -1, t = 1, n = 1, r = -1, a = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = a, this.far = o, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, a, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let a = n - e, o = n + e, s = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, d = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      a += c * this.view.offsetX, o = a + c * this.view.width, s -= d * this.view.offsetY, l = s - d * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(a, o, s, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const qn = 4, Es = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Sn = 20, Br = /* @__PURE__ */ new Oo(), Ts = /* @__PURE__ */ new We();
let zr = null, Gr = 0, kr = 0;
const yn = (1 + Math.sqrt(5)) / 2, Xn = 1 / yn, As = [
  /* @__PURE__ */ new D(1, 1, 1),
  /* @__PURE__ */ new D(-1, 1, 1),
  /* @__PURE__ */ new D(1, 1, -1),
  /* @__PURE__ */ new D(-1, 1, -1),
  /* @__PURE__ */ new D(0, yn, Xn),
  /* @__PURE__ */ new D(0, yn, -Xn),
  /* @__PURE__ */ new D(Xn, 0, yn),
  /* @__PURE__ */ new D(-Xn, 0, yn),
  /* @__PURE__ */ new D(yn, Xn, 0),
  /* @__PURE__ */ new D(-yn, Xn, 0)
];
class Rs {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, r = 100) {
    zr = this._renderer.getRenderTarget(), Gr = this._renderer.getActiveCubeFace(), kr = this._renderer.getActiveMipmapLevel(), this._setSize(256);
    const a = this._allocateTargets();
    return a.depthBuffer = !0, this._sceneToCubeUV(e, n, r, a), t > 0 && this._blur(a, 0, 0, t), this._applyPMREM(a), this._cleanup(a), a;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Ps(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Cs(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(zr, Gr, kr), e.scissorTest = !1, Vi(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Zn || e.mapping === $n ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), zr = this._renderer.getRenderTarget(), Gr = this._renderer.getActiveCubeFace(), kr = this._renderer.getActiveMipmapLevel();
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: Ct,
      minFilter: Ct,
      generateMipmaps: !1,
      type: en,
      format: Ot,
      colorSpace: nn,
      depthBuffer: !1
    }, r = ws(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ws(e, t, n);
      const { _lodMax: a } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = df(a)), this._blurMaterial = ff(a, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Bt(this._lodPlanes[0], e);
    this._renderer.compile(t, Br);
  }
  _sceneToCubeUV(e, t, n, r) {
    const s = new Pt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], d = this._renderer, f = d.autoClear, h = d.toneMapping;
    d.getClearColor(Ts), d.toneMapping = hn, d.autoClear = !1;
    const m = new ua({
      name: "PMREM.Background",
      side: yt,
      depthWrite: !1,
      depthTest: !1
    }), _ = new Bt(new xi(), m);
    let b = !1;
    const p = e.background;
    p ? p.isColor && (m.color.copy(p), e.background = null, b = !0) : (m.color.copy(Ts), b = !0);
    for (let u = 0; u < 6; u++) {
      const v = u % 3;
      v === 0 ? (s.up.set(0, l[u], 0), s.lookAt(c[u], 0, 0)) : v === 1 ? (s.up.set(0, 0, l[u]), s.lookAt(0, c[u], 0)) : (s.up.set(0, l[u], 0), s.lookAt(0, 0, c[u]));
      const g = this._cubeSize;
      Vi(r, v * g, u > 2 ? g : 0, g, g), d.setRenderTarget(r), b && d.render(_, s), d.render(e, s);
    }
    _.geometry.dispose(), _.material.dispose(), d.toneMapping = h, d.autoClear = f, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === Zn || e.mapping === $n;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Ps()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Cs());
    const a = r ? this._cubemapMaterial : this._equirectMaterial, o = new Bt(this._lodPlanes[0], a), s = a.uniforms;
    s.envMap.value = e;
    const l = this._cubeSize;
    Vi(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(o, Br);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    for (let r = 1; r < this._lodPlanes.length; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = As[(r - 1) % As.length];
      this._blur(e, r - 1, r, a, o);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, r, a) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      o,
      t,
      n,
      r,
      "latitudinal",
      a
    ), this._halfBlur(
      o,
      e,
      n,
      n,
      r,
      "longitudinal",
      a
    );
  }
  _halfBlur(e, t, n, r, a, o, s) {
    const l = this._renderer, c = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const d = 3, f = new Bt(this._lodPlanes[r], c), h = c.uniforms, m = this._sizeLods[n] - 1, _ = isFinite(a) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * Sn - 1), b = a / _, p = isFinite(a) ? 1 + Math.floor(d * b) : Sn;
    p > Sn && console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Sn}`);
    const u = [];
    let v = 0;
    for (let w = 0; w < Sn; ++w) {
      const H = w / b, y = Math.exp(-H * H / 2);
      u.push(y), w === 0 ? v += y : w < p && (v += 2 * y);
    }
    for (let w = 0; w < u.length; w++)
      u[w] = u[w] / v;
    h.envMap.value = e.texture, h.samples.value = p, h.weights.value = u, h.latitudinal.value = o === "latitudinal", s && (h.poleAxis.value = s);
    const { _lodMax: g } = this;
    h.dTheta.value = _, h.mipInt.value = g - n;
    const T = this._sizeLods[r], C = 3 * T * (r > g - qn ? r - g + qn : 0), R = 4 * (this._cubeSize - T);
    Vi(t, C, R, 3 * T, 2 * T), l.setRenderTarget(t), l.render(f, Br);
  }
}
function df(i) {
  const e = [], t = [], n = [];
  let r = i;
  const a = i - qn + 1 + Es.length;
  for (let o = 0; o < a; o++) {
    const s = Math.pow(2, r);
    t.push(s);
    let l = 1 / s;
    o > i - qn ? l = Es[o - i + qn - 1] : o === 0 && (l = 0), n.push(l);
    const c = 1 / (s - 2), d = -c, f = 1 + c, h = [d, d, f, d, f, f, d, d, f, f, d, f], m = 6, _ = 6, b = 3, p = 2, u = 1, v = new Float32Array(b * _ * m), g = new Float32Array(p * _ * m), T = new Float32Array(u * _ * m);
    for (let R = 0; R < m; R++) {
      const w = R % 3 * 2 / 3 - 1, H = R > 2 ? 0 : -1, y = [
        w,
        H,
        0,
        w + 2 / 3,
        H,
        0,
        w + 2 / 3,
        H + 1,
        0,
        w,
        H,
        0,
        w + 2 / 3,
        H + 1,
        0,
        w,
        H + 1,
        0
      ];
      v.set(y, b * _ * R), g.set(h, p * _ * R);
      const E = [R, R, R, R, R, R];
      T.set(E, u * _ * R);
    }
    const C = new Vt();
    C.setAttribute("position", new Ht(v, b)), C.setAttribute("uv", new Ht(g, p)), C.setAttribute("faceIndex", new Ht(T, u)), e.push(C), r > qn && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function ws(i, e, t) {
  const n = new zt(i, e, t);
  return n.texture.mapping = ar, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Vi(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function ff(i, e, t) {
  const n = new Float32Array(Sn), r = new D(0, 1, 0);
  return new ht({
    name: "SphericalGaussianBlur",
    defines: {
      n: Sn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: fa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Jt,
    depthTest: !1,
    depthWrite: !1
  });
}
function Cs() {
  return new ht({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: fa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Jt,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ps() {
  return new ht({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: fa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Jt,
    depthTest: !1,
    depthWrite: !1
  });
}
function fa() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function hf(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(s) {
    if (s && s.isTexture) {
      const l = s.mapping, c = l === jr || l === Kr, d = l === Zn || l === $n;
      if (c || d)
        if (s.isRenderTargetTexture && s.needsPMREMUpdate === !0) {
          s.needsPMREMUpdate = !1;
          let f = e.get(s);
          return t === null && (t = new Rs(i)), f = c ? t.fromEquirectangular(s, f) : t.fromCubemap(s, f), e.set(s, f), f.texture;
        } else {
          if (e.has(s))
            return e.get(s).texture;
          {
            const f = s.image;
            if (c && f && f.height > 0 || d && f && r(f)) {
              t === null && (t = new Rs(i));
              const h = c ? t.fromEquirectangular(s) : t.fromCubemap(s);
              return e.set(s, h), s.addEventListener("dispose", a), h.texture;
            } else
              return null;
          }
        }
    }
    return s;
  }
  function r(s) {
    let l = 0;
    const c = 6;
    for (let d = 0; d < c; d++)
      s[d] !== void 0 && l++;
    return l === c;
  }
  function a(s) {
    const l = s.target;
    l.removeEventListener("dispose", a);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function o() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: o
  };
}
function pf(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function(n) {
      n.isWebGL2 ? (t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance")) : (t("WEBGL_depth_texture"), t("OES_texture_float"), t("OES_texture_half_float"), t("OES_texture_half_float_linear"), t("OES_standard_derivatives"), t("OES_element_index_uint"), t("OES_vertex_array_object"), t("ANGLE_instanced_arrays")), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture");
    },
    get: function(n) {
      const r = t(n);
      return r === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function mf(i, e, t, n) {
  const r = {}, a = /* @__PURE__ */ new WeakMap();
  function o(f) {
    const h = f.target;
    h.index !== null && e.remove(h.index);
    for (const _ in h.attributes)
      e.remove(h.attributes[_]);
    for (const _ in h.morphAttributes) {
      const b = h.morphAttributes[_];
      for (let p = 0, u = b.length; p < u; p++)
        e.remove(b[p]);
    }
    h.removeEventListener("dispose", o), delete r[h.id];
    const m = a.get(h);
    m && (e.remove(m), a.delete(h)), n.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, t.memory.geometries--;
  }
  function s(f, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", o), r[h.id] = !0, t.memory.geometries++), h;
  }
  function l(f) {
    const h = f.attributes;
    for (const _ in h)
      e.update(h[_], i.ARRAY_BUFFER);
    const m = f.morphAttributes;
    for (const _ in m) {
      const b = m[_];
      for (let p = 0, u = b.length; p < u; p++)
        e.update(b[p], i.ARRAY_BUFFER);
    }
  }
  function c(f) {
    const h = [], m = f.index, _ = f.attributes.position;
    let b = 0;
    if (m !== null) {
      const v = m.array;
      b = m.version;
      for (let g = 0, T = v.length; g < T; g += 3) {
        const C = v[g + 0], R = v[g + 1], w = v[g + 2];
        h.push(C, R, R, w, w, C);
      }
    } else if (_ !== void 0) {
      const v = _.array;
      b = _.version;
      for (let g = 0, T = v.length / 3 - 1; g < T; g += 3) {
        const C = g + 0, R = g + 1, w = g + 2;
        h.push(C, R, R, w, w, C);
      }
    } else
      return;
    const p = new (Mo(h) ? Lo : Po)(h, 1);
    p.version = b;
    const u = a.get(f);
    u && e.remove(u), a.set(f, p);
  }
  function d(f) {
    const h = a.get(f);
    if (h) {
      const m = f.index;
      m !== null && h.version < m.version && c(f);
    } else
      c(f);
    return a.get(f);
  }
  return {
    get: s,
    update: l,
    getWireframeAttribute: d
  };
}
function gf(i, e, t, n) {
  const r = n.isWebGL2;
  let a;
  function o(m) {
    a = m;
  }
  let s, l;
  function c(m) {
    s = m.type, l = m.bytesPerElement;
  }
  function d(m, _) {
    i.drawElements(a, _, s, m * l), t.update(_, a, 1);
  }
  function f(m, _, b) {
    if (b === 0) return;
    let p, u;
    if (r)
      p = i, u = "drawElementsInstanced";
    else if (p = e.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", p === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    p[u](a, _, s, m * l, b), t.update(_, a, b);
  }
  function h(m, _, b) {
    if (b === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let u = 0; u < b; u++)
        this.render(m[u] / l, _[u]);
    else {
      p.multiDrawElementsWEBGL(a, _, 0, s, m, 0, b);
      let u = 0;
      for (let v = 0; v < b; v++)
        u += _[v];
      t.update(u, a, 1);
    }
  }
  this.setMode = o, this.setIndex = c, this.render = d, this.renderInstances = f, this.renderMultiDraw = h;
}
function _f(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(a, o, s) {
    switch (t.calls++, o) {
      case i.TRIANGLES:
        t.triangles += s * (a / 3);
        break;
      case i.LINES:
        t.lines += s * (a / 2);
        break;
      case i.LINE_STRIP:
        t.lines += s * (a - 1);
        break;
      case i.LINE_LOOP:
        t.lines += s * a;
        break;
      case i.POINTS:
        t.points += s * a;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function bf(i, e) {
  return i[0] - e[0];
}
function xf(i, e) {
  return Math.abs(e[1]) - Math.abs(i[1]);
}
function vf(i, e, t) {
  const n = {}, r = new Float32Array(8), a = /* @__PURE__ */ new WeakMap(), o = new lt(), s = [];
  for (let c = 0; c < 8; c++)
    s[c] = [c, 0];
  function l(c, d, f) {
    const h = c.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const m = d.morphAttributes.position || d.morphAttributes.normal || d.morphAttributes.color, _ = m !== void 0 ? m.length : 0;
      let b = a.get(d);
      if (b === void 0 || b.count !== _) {
        let L = function() {
          q.dispose(), a.delete(d), d.removeEventListener("dispose", L);
        };
        b !== void 0 && b.texture.dispose();
        const v = d.morphAttributes.position !== void 0, g = d.morphAttributes.normal !== void 0, T = d.morphAttributes.color !== void 0, C = d.morphAttributes.position || [], R = d.morphAttributes.normal || [], w = d.morphAttributes.color || [];
        let H = 0;
        v === !0 && (H = 1), g === !0 && (H = 2), T === !0 && (H = 3);
        let y = d.attributes.position.count * H, E = 1;
        y > e.maxTextureSize && (E = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
        const z = new Float32Array(y * E * 4 * _), q = new Ao(z, y, E, _);
        q.type = fn, q.needsUpdate = !0;
        const le = H * 4;
        for (let N = 0; N < _; N++) {
          const V = C[N], Y = R[N], X = w[N], W = y * E * 4 * N;
          for (let Q = 0; Q < V.count; Q++) {
            const te = Q * le;
            v === !0 && (o.fromBufferAttribute(V, Q), z[W + te + 0] = o.x, z[W + te + 1] = o.y, z[W + te + 2] = o.z, z[W + te + 3] = 0), g === !0 && (o.fromBufferAttribute(Y, Q), z[W + te + 4] = o.x, z[W + te + 5] = o.y, z[W + te + 6] = o.z, z[W + te + 7] = 0), T === !0 && (o.fromBufferAttribute(X, Q), z[W + te + 8] = o.x, z[W + te + 9] = o.y, z[W + te + 10] = o.z, z[W + te + 11] = X.itemSize === 4 ? o.w : 1);
          }
        }
        b = {
          count: _,
          texture: q,
          size: new be(y, E)
        }, a.set(d, b), d.addEventListener("dispose", L);
      }
      let p = 0;
      for (let v = 0; v < h.length; v++)
        p += h[v];
      const u = d.morphTargetsRelative ? 1 : 1 - p;
      f.getUniforms().setValue(i, "morphTargetBaseInfluence", u), f.getUniforms().setValue(i, "morphTargetInfluences", h), f.getUniforms().setValue(i, "morphTargetsTexture", b.texture, t), f.getUniforms().setValue(i, "morphTargetsTextureSize", b.size);
    } else {
      const m = h === void 0 ? 0 : h.length;
      let _ = n[d.id];
      if (_ === void 0 || _.length !== m) {
        _ = [];
        for (let g = 0; g < m; g++)
          _[g] = [g, 0];
        n[d.id] = _;
      }
      for (let g = 0; g < m; g++) {
        const T = _[g];
        T[0] = g, T[1] = h[g];
      }
      _.sort(xf);
      for (let g = 0; g < 8; g++)
        g < m && _[g][1] ? (s[g][0] = _[g][0], s[g][1] = _[g][1]) : (s[g][0] = Number.MAX_SAFE_INTEGER, s[g][1] = 0);
      s.sort(bf);
      const b = d.morphAttributes.position, p = d.morphAttributes.normal;
      let u = 0;
      for (let g = 0; g < 8; g++) {
        const T = s[g], C = T[0], R = T[1];
        C !== Number.MAX_SAFE_INTEGER && R ? (b && d.getAttribute("morphTarget" + g) !== b[C] && d.setAttribute("morphTarget" + g, b[C]), p && d.getAttribute("morphNormal" + g) !== p[C] && d.setAttribute("morphNormal" + g, p[C]), r[g] = R, u += R) : (b && d.hasAttribute("morphTarget" + g) === !0 && d.deleteAttribute("morphTarget" + g), p && d.hasAttribute("morphNormal" + g) === !0 && d.deleteAttribute("morphNormal" + g), r[g] = 0);
      }
      const v = d.morphTargetsRelative ? 1 : 1 - u;
      f.getUniforms().setValue(i, "morphTargetBaseInfluence", v), f.getUniforms().setValue(i, "morphTargetInfluences", r);
    }
  }
  return {
    update: l
  };
}
function yf(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const c = n.render.frame, d = l.geometry, f = e.get(l, d);
    if (r.get(f) !== c && (e.update(f), r.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", s) === !1 && l.addEventListener("dispose", s), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const h = l.skeleton;
      r.get(h) !== c && (h.update(), r.set(h, c));
    }
    return f;
  }
  function o() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function s(l) {
    const c = l.target;
    c.removeEventListener("dispose", s), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
class Bo extends Tt {
  constructor(e, t, n, r, a, o, s, l, c, d) {
    if (d = d !== void 0 ? d : En, d !== En && d !== Qn)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && d === En && (n = dn), n === void 0 && d === Qn && (n = Mn), super(null, r, a, o, s, l, d, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = s !== void 0 ? s : _t, this.minFilter = l !== void 0 ? l : _t, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const zo = /* @__PURE__ */ new Tt(), Go = /* @__PURE__ */ new Bo(1, 1);
Go.compareFunction = So;
const ko = /* @__PURE__ */ new Ao(), Ho = /* @__PURE__ */ new ac(), Vo = /* @__PURE__ */ new Io(), Ls = [], Ds = [], Us = new Float32Array(16), Is = new Float32Array(9), Ns = new Float32Array(4);
function ni(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let a = Ls[r];
  if (a === void 0 && (a = new Float32Array(r), Ls[r] = a), e !== 0) {
    n.toArray(a, 0);
    for (let o = 1, s = 0; o !== e; ++o)
      s += t, i[o].toArray(a, s);
  }
  return a;
}
function tt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function nt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function cr(i, e) {
  let t = Ds[e];
  t === void 0 && (t = new Int32Array(e), Ds[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function Sf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function Mf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2fv(this.addr, e), nt(t, e);
  }
}
function Ef(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (tt(t, e)) return;
    i.uniform3fv(this.addr, e), nt(t, e);
  }
}
function Tf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4fv(this.addr, e), nt(t, e);
  }
}
function Af(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Ns.set(n), i.uniformMatrix2fv(this.addr, !1, Ns), nt(t, n);
  }
}
function Rf(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Is.set(n), i.uniformMatrix3fv(this.addr, !1, Is), nt(t, n);
  }
}
function wf(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Us.set(n), i.uniformMatrix4fv(this.addr, !1, Us), nt(t, n);
  }
}
function Cf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function Pf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2iv(this.addr, e), nt(t, e);
  }
}
function Lf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (tt(t, e)) return;
    i.uniform3iv(this.addr, e), nt(t, e);
  }
}
function Df(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4iv(this.addr, e), nt(t, e);
  }
}
function Uf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function If(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2uiv(this.addr, e), nt(t, e);
  }
}
function Nf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (tt(t, e)) return;
    i.uniform3uiv(this.addr, e), nt(t, e);
  }
}
function Ff(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4uiv(this.addr, e), nt(t, e);
  }
}
function Of(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  const a = this.type === i.SAMPLER_2D_SHADOW ? Go : zo;
  t.setTexture2D(e || a, r);
}
function Bf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || Ho, r);
}
function zf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || Vo, r);
}
function Gf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || ko, r);
}
function kf(i) {
  switch (i) {
    case 5126:
      return Sf;
    case 35664:
      return Mf;
    case 35665:
      return Ef;
    case 35666:
      return Tf;
    case 35674:
      return Af;
    case 35675:
      return Rf;
    case 35676:
      return wf;
    case 5124:
    case 35670:
      return Cf;
    case 35667:
    case 35671:
      return Pf;
    case 35668:
    case 35672:
      return Lf;
    case 35669:
    case 35673:
      return Df;
    case 5125:
      return Uf;
    case 36294:
      return If;
    case 36295:
      return Nf;
    case 36296:
      return Ff;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Of;
    case 35679:
    case 36299:
    case 36307:
      return Bf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return zf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Gf;
  }
}
function Hf(i, e) {
  i.uniform1fv(this.addr, e);
}
function Vf(i, e) {
  const t = ni(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Wf(i, e) {
  const t = ni(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Xf(i, e) {
  const t = ni(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function qf(i, e) {
  const t = ni(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Yf(i, e) {
  const t = ni(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function jf(i, e) {
  const t = ni(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Kf(i, e) {
  i.uniform1iv(this.addr, e);
}
function Zf(i, e) {
  i.uniform2iv(this.addr, e);
}
function $f(i, e) {
  i.uniform3iv(this.addr, e);
}
function Qf(i, e) {
  i.uniform4iv(this.addr, e);
}
function Jf(i, e) {
  i.uniform1uiv(this.addr, e);
}
function eh(i, e) {
  i.uniform2uiv(this.addr, e);
}
function th(i, e) {
  i.uniform3uiv(this.addr, e);
}
function nh(i, e) {
  i.uniform4uiv(this.addr, e);
}
function ih(i, e, t) {
  const n = this.cache, r = e.length, a = cr(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || zo, a[o]);
}
function rh(i, e, t) {
  const n = this.cache, r = e.length, a = cr(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let o = 0; o !== r; ++o)
    t.setTexture3D(e[o] || Ho, a[o]);
}
function ah(i, e, t) {
  const n = this.cache, r = e.length, a = cr(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let o = 0; o !== r; ++o)
    t.setTextureCube(e[o] || Vo, a[o]);
}
function sh(i, e, t) {
  const n = this.cache, r = e.length, a = cr(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let o = 0; o !== r; ++o)
    t.setTexture2DArray(e[o] || ko, a[o]);
}
function oh(i) {
  switch (i) {
    case 5126:
      return Hf;
    case 35664:
      return Vf;
    case 35665:
      return Wf;
    case 35666:
      return Xf;
    case 35674:
      return qf;
    case 35675:
      return Yf;
    case 35676:
      return jf;
    case 5124:
    case 35670:
      return Kf;
    case 35667:
    case 35671:
      return Zf;
    case 35668:
    case 35672:
      return $f;
    case 35669:
    case 35673:
      return Qf;
    case 5125:
      return Jf;
    case 36294:
      return eh;
    case 36295:
      return th;
    case 36296:
      return nh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ih;
    case 35679:
    case 36299:
    case 36307:
      return rh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return ah;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return sh;
  }
}
class lh {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = kf(t.type);
  }
}
class ch {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = oh(t.type);
  }
}
class uh {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let a = 0, o = r.length; a !== o; ++a) {
      const s = r[a];
      s.setValue(e, t[s.id], n);
    }
  }
}
const Hr = /(\w+)(\])?(\[|\.)?/g;
function Fs(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function dh(i, e, t) {
  const n = i.name, r = n.length;
  for (Hr.lastIndex = 0; ; ) {
    const a = Hr.exec(n), o = Hr.lastIndex;
    let s = a[1];
    const l = a[2] === "]", c = a[3];
    if (l && (s = s | 0), c === void 0 || c === "[" && o + 2 === r) {
      Fs(t, c === void 0 ? new lh(s, i, e) : new ch(s, i, e));
      break;
    } else {
      let f = t.map[s];
      f === void 0 && (f = new uh(s), Fs(t, f)), t = f;
    }
  }
}
class Ki {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const a = e.getActiveUniform(t, r), o = e.getUniformLocation(t, a.name);
      dh(a, o, this);
    }
  }
  setValue(e, t, n, r) {
    const a = this.map[t];
    a !== void 0 && a.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let a = 0, o = t.length; a !== o; ++a) {
      const s = t[a], l = n[s.id];
      l.needsUpdate !== !1 && s.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, a = e.length; r !== a; ++r) {
      const o = e[r];
      o.id in t && n.push(o);
    }
    return n;
  }
}
function Os(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const fh = 37297;
let hh = 0;
function ph(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), a = Math.min(e + 6, t.length);
  for (let o = r; o < a; o++) {
    const s = o + 1;
    n.push(`${s === e ? ">" : " "} ${s}: ${t[o]}`);
  }
  return n.join(`
`);
}
function mh(i) {
  const e = Ye.getPrimaries(Ye.workingColorSpace), t = Ye.getPrimaries(i);
  let n;
  switch (e === t ? n = "" : e === er && t === Ji ? n = "LinearDisplayP3ToLinearSRGB" : e === Ji && t === er && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case nn:
    case sr:
      return [n, "LinearTransferOETF"];
    case ot:
    case la:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function Bs(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(r);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + r + `

` + ph(i.getShaderSource(e), o);
  } else
    return r;
}
function gh(i, e) {
  const t = mh(e);
  return `vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function _h(i, e) {
  let t;
  switch (e) {
    case lo:
      t = "Linear";
      break;
    case co:
      t = "Reinhard";
      break;
    case uo:
      t = "OptimizedCineon";
      break;
    case sa:
      t = "ACESFilmic";
      break;
    case fo:
      t = "AgX";
      break;
    case Ll:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
function bh(i) {
  return [
    i.extensionDerivatives || i.envMapCubeUVHeight || i.bumpMap || i.normalMapTangentSpace || i.clearcoatNormalMap || i.flatShading || i.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (i.extensionFragDepth || i.logarithmicDepthBuffer) && i.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    i.extensionDrawBuffers && i.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (i.extensionShaderTextureLOD || i.envMap || i.transmission) && i.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(Yn).join(`
`);
}
function xh(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : ""
  ].filter(Yn).join(`
`);
}
function vh(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function yh(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const a = i.getActiveAttrib(e, r), o = a.name;
    let s = 1;
    a.type === i.FLOAT_MAT2 && (s = 2), a.type === i.FLOAT_MAT3 && (s = 3), a.type === i.FLOAT_MAT4 && (s = 4), t[o] = {
      type: a.type,
      location: i.getAttribLocation(e, o),
      locationSize: s
    };
  }
  return t;
}
function Yn(i) {
  return i !== "";
}
function zs(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Gs(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Sh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ta(i) {
  return i.replace(Sh, Eh);
}
const Mh = /* @__PURE__ */ new Map([
  ["encodings_fragment", "colorspace_fragment"],
  // @deprecated, r154
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  // @deprecated, r154
  ["output_fragment", "opaque_fragment"]
  // @deprecated, r154
]);
function Eh(i, e) {
  let t = Ne[e];
  if (t === void 0) {
    const n = Mh.get(e);
    if (n !== void 0)
      t = Ne[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return ta(t);
}
const Th = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ks(i) {
  return i.replace(Th, Ah);
}
function Ah(i, e, t, n) {
  let r = "";
  for (let a = parseInt(e); a < parseInt(t); a++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  return r;
}
function Hs(i) {
  let e = "precision " + i.precision + ` float;
precision ` + i.precision + " int;";
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function Rh(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === ro ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === ll ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === Zt && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function wh(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Zn:
      case $n:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case ar:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function Ch(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case $n:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function Ph(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case oo:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Cl:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case Pl:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function Lh(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function Dh(i, e, t, n) {
  const r = i.getContext(), a = t.defines;
  let o = t.vertexShader, s = t.fragmentShader;
  const l = Rh(t), c = wh(t), d = Ch(t), f = Ph(t), h = Lh(t), m = t.isWebGL2 ? "" : bh(t), _ = xh(t), b = vh(a), p = r.createProgram();
  let u, v, g = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    b
  ].filter(Yn).join(`
`), u.length > 0 && (u += `
`), v = [
    m,
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    b
  ].filter(Yn).join(`
`), v.length > 0 && (v += `
`)) : (u = [
    Hs(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    b,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + d : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Yn).join(`
`), v = [
    m,
    Hs(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    b,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + d : "",
    t.envMap ? "#define " + f : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== hn ? "#define TONE_MAPPING" : "",
    t.toneMapping !== hn ? Ne.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== hn ? _h("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ne.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    gh("linearToOutputTexel", t.outputColorSpace),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Yn).join(`
`)), o = ta(o), o = zs(o, t), o = Gs(o, t), s = ta(s), s = zs(s, t), s = Gs(s, t), o = ks(o), s = ks(s), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (g = `#version 300 es
`, u = [
    _,
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + u, v = [
    "precision mediump sampler2DArray;",
    "#define varying in",
    t.glslVersion === ss ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === ss ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + v);
  const T = g + u + o, C = g + v + s, R = Os(r, r.VERTEX_SHADER, T), w = Os(r, r.FRAGMENT_SHADER, C);
  r.attachShader(p, R), r.attachShader(p, w), t.index0AttributeName !== void 0 ? r.bindAttribLocation(p, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(p, 0, "position"), r.linkProgram(p);
  function H(q) {
    if (i.debug.checkShaderErrors) {
      const le = r.getProgramInfoLog(p).trim(), L = r.getShaderInfoLog(R).trim(), N = r.getShaderInfoLog(w).trim();
      let V = !0, Y = !0;
      if (r.getProgramParameter(p, r.LINK_STATUS) === !1)
        if (V = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, p, R, w);
        else {
          const X = Bs(r, R, "vertex"), W = Bs(r, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(p, r.VALIDATE_STATUS) + `

Program Info Log: ` + le + `
` + X + `
` + W
          );
        }
      else le !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", le) : (L === "" || N === "") && (Y = !1);
      Y && (q.diagnostics = {
        runnable: V,
        programLog: le,
        vertexShader: {
          log: L,
          prefix: u
        },
        fragmentShader: {
          log: N,
          prefix: v
        }
      });
    }
    r.deleteShader(R), r.deleteShader(w), y = new Ki(r, p), E = yh(r, p);
  }
  let y;
  this.getUniforms = function() {
    return y === void 0 && H(this), y;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && H(this), E;
  };
  let z = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return z === !1 && (z = r.getProgramParameter(p, fh)), z;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(p), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = hh++, this.cacheKey = e, this.usedTimes = 1, this.program = p, this.vertexShader = R, this.fragmentShader = w, this;
}
let Uh = 0;
class Ih {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), a = this._getShaderStage(n), o = this._getShaderCacheForMaterial(e);
    return o.has(r) === !1 && (o.add(r), r.usedTimes++), o.has(a) === !1 && (o.add(a), a.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Nh(e), t.set(e, n)), n;
  }
}
class Nh {
  constructor(e) {
    this.id = Uh++, this.code = e, this.usedTimes = 0;
  }
}
function Fh(i, e, t, n, r, a, o) {
  const s = new wo(), l = new Ih(), c = [], d = r.isWebGL2, f = r.logarithmicDepthBuffer, h = r.vertexTextures;
  let m = r.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function b(y) {
    return y === 0 ? "uv" : `uv${y}`;
  }
  function p(y, E, z, q, le) {
    const L = q.fog, N = le.geometry, V = y.isMeshStandardMaterial ? q.environment : null, Y = (y.isMeshStandardMaterial ? t : e).get(y.envMap || V), X = Y && Y.mapping === ar ? Y.image.height : null, W = _[y.type];
    y.precision !== null && (m = r.getMaxPrecision(y.precision), m !== y.precision && console.warn("THREE.WebGLProgram.getParameters:", y.precision, "not supported, using", m, "instead."));
    const Q = N.morphAttributes.position || N.morphAttributes.normal || N.morphAttributes.color, te = Q !== void 0 ? Q.length : 0;
    let de = 0;
    N.morphAttributes.position !== void 0 && (de = 1), N.morphAttributes.normal !== void 0 && (de = 2), N.morphAttributes.color !== void 0 && (de = 3);
    let k, K, ue, xe;
    if (W) {
      const pt = kt[W];
      k = pt.vertexShader, K = pt.fragmentShader;
    } else
      k = y.vertexShader, K = y.fragmentShader, l.update(y), ue = l.getVertexShaderID(y), xe = l.getFragmentShaderID(y);
    const ge = i.getRenderTarget(), Ce = le.isInstancedMesh === !0, Pe = le.isBatchedMesh === !0, Ee = !!y.map, ke = !!y.matcap, I = !!Y, it = !!y.aoMap, Se = !!y.lightMap, Re = !!y.bumpMap, pe = !!y.normalMap, Ze = !!y.displacementMap, Le = !!y.emissiveMap, M = !!y.metalnessMap, x = !!y.roughnessMap, F = y.anisotropy > 0, ee = y.clearcoat > 0, $ = y.iridescence > 0, J = y.sheen > 0, me = y.transmission > 0, ce = F && !!y.anisotropyMap, he = ee && !!y.clearcoatMap, Te = ee && !!y.clearcoatNormalMap, Ue = ee && !!y.clearcoatRoughnessMap, Z = $ && !!y.iridescenceMap, He = $ && !!y.iridescenceThicknessMap, A = J && !!y.sheenColorMap, j = J && !!y.sheenRoughnessMap, se = !!y.specularMap, ne = !!y.specularColorMap, _e = !!y.specularIntensityMap, Be = me && !!y.transmissionMap, Ve = me && !!y.thicknessMap, Fe = !!y.gradientMap, ae = !!y.alphaMap, P = y.alphaTest > 0, ie = !!y.alphaHash, re = !!y.extensions, Me = !!N.attributes.uv1, ve = !!N.attributes.uv2, Xe = !!N.attributes.uv3;
    let qe = hn;
    return y.toneMapped && (ge === null || ge.isXRRenderTarget === !0) && (qe = i.toneMapping), {
      isWebGL2: d,
      shaderID: W,
      shaderType: y.type,
      shaderName: y.name,
      vertexShader: k,
      fragmentShader: K,
      defines: y.defines,
      customVertexShaderID: ue,
      customFragmentShaderID: xe,
      isRawShaderMaterial: y.isRawShaderMaterial === !0,
      glslVersion: y.glslVersion,
      precision: m,
      batching: Pe,
      instancing: Ce,
      instancingColor: Ce && le.instanceColor !== null,
      supportsVertexTextures: h,
      outputColorSpace: ge === null ? i.outputColorSpace : ge.isXRRenderTarget === !0 ? ge.texture.colorSpace : nn,
      map: Ee,
      matcap: ke,
      envMap: I,
      envMapMode: I && Y.mapping,
      envMapCubeUVHeight: X,
      aoMap: it,
      lightMap: Se,
      bumpMap: Re,
      normalMap: pe,
      displacementMap: h && Ze,
      emissiveMap: Le,
      normalMapObjectSpace: pe && y.normalMapType === Wl,
      normalMapTangentSpace: pe && y.normalMapType === Vl,
      metalnessMap: M,
      roughnessMap: x,
      anisotropy: F,
      anisotropyMap: ce,
      clearcoat: ee,
      clearcoatMap: he,
      clearcoatNormalMap: Te,
      clearcoatRoughnessMap: Ue,
      iridescence: $,
      iridescenceMap: Z,
      iridescenceThicknessMap: He,
      sheen: J,
      sheenColorMap: A,
      sheenRoughnessMap: j,
      specularMap: se,
      specularColorMap: ne,
      specularIntensityMap: _e,
      transmission: me,
      transmissionMap: Be,
      thicknessMap: Ve,
      gradientMap: Fe,
      opaque: y.transparent === !1 && y.blending === jn,
      alphaMap: ae,
      alphaTest: P,
      alphaHash: ie,
      combine: y.combine,
      //
      mapUv: Ee && b(y.map.channel),
      aoMapUv: it && b(y.aoMap.channel),
      lightMapUv: Se && b(y.lightMap.channel),
      bumpMapUv: Re && b(y.bumpMap.channel),
      normalMapUv: pe && b(y.normalMap.channel),
      displacementMapUv: Ze && b(y.displacementMap.channel),
      emissiveMapUv: Le && b(y.emissiveMap.channel),
      metalnessMapUv: M && b(y.metalnessMap.channel),
      roughnessMapUv: x && b(y.roughnessMap.channel),
      anisotropyMapUv: ce && b(y.anisotropyMap.channel),
      clearcoatMapUv: he && b(y.clearcoatMap.channel),
      clearcoatNormalMapUv: Te && b(y.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Ue && b(y.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Z && b(y.iridescenceMap.channel),
      iridescenceThicknessMapUv: He && b(y.iridescenceThicknessMap.channel),
      sheenColorMapUv: A && b(y.sheenColorMap.channel),
      sheenRoughnessMapUv: j && b(y.sheenRoughnessMap.channel),
      specularMapUv: se && b(y.specularMap.channel),
      specularColorMapUv: ne && b(y.specularColorMap.channel),
      specularIntensityMapUv: _e && b(y.specularIntensityMap.channel),
      transmissionMapUv: Be && b(y.transmissionMap.channel),
      thicknessMapUv: Ve && b(y.thicknessMap.channel),
      alphaMapUv: ae && b(y.alphaMap.channel),
      //
      vertexTangents: !!N.attributes.tangent && (pe || F),
      vertexColors: y.vertexColors,
      vertexAlphas: y.vertexColors === !0 && !!N.attributes.color && N.attributes.color.itemSize === 4,
      vertexUv1s: Me,
      vertexUv2s: ve,
      vertexUv3s: Xe,
      pointsUvs: le.isPoints === !0 && !!N.attributes.uv && (Ee || ae),
      fog: !!L,
      useFog: y.fog === !0,
      fogExp2: L && L.isFogExp2,
      flatShading: y.flatShading === !0,
      sizeAttenuation: y.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      skinning: le.isSkinnedMesh === !0,
      morphTargets: N.morphAttributes.position !== void 0,
      morphNormals: N.morphAttributes.normal !== void 0,
      morphColors: N.morphAttributes.color !== void 0,
      morphTargetsCount: te,
      morphTextureStride: de,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: y.dithering,
      shadowMapEnabled: i.shadowMap.enabled && z.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: qe,
      useLegacyLights: i._useLegacyLights,
      decodeVideoTexture: Ee && y.map.isVideoTexture === !0 && Ye.getTransfer(y.map.colorSpace) === Ke,
      premultipliedAlpha: y.premultipliedAlpha,
      doubleSided: y.side === $t,
      flipSided: y.side === yt,
      useDepthPacking: y.depthPacking >= 0,
      depthPacking: y.depthPacking || 0,
      index0AttributeName: y.index0AttributeName,
      extensionDerivatives: re && y.extensions.derivatives === !0,
      extensionFragDepth: re && y.extensions.fragDepth === !0,
      extensionDrawBuffers: re && y.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: re && y.extensions.shaderTextureLOD === !0,
      extensionClipCullDistance: re && y.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"),
      rendererExtensionFragDepth: d || n.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: d || n.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: d || n.has("EXT_shader_texture_lod"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: y.customProgramCacheKey()
    };
  }
  function u(y) {
    const E = [];
    if (y.shaderID ? E.push(y.shaderID) : (E.push(y.customVertexShaderID), E.push(y.customFragmentShaderID)), y.defines !== void 0)
      for (const z in y.defines)
        E.push(z), E.push(y.defines[z]);
    return y.isRawShaderMaterial === !1 && (v(E, y), g(E, y), E.push(i.outputColorSpace)), E.push(y.customProgramCacheKey), E.join();
  }
  function v(y, E) {
    y.push(E.precision), y.push(E.outputColorSpace), y.push(E.envMapMode), y.push(E.envMapCubeUVHeight), y.push(E.mapUv), y.push(E.alphaMapUv), y.push(E.lightMapUv), y.push(E.aoMapUv), y.push(E.bumpMapUv), y.push(E.normalMapUv), y.push(E.displacementMapUv), y.push(E.emissiveMapUv), y.push(E.metalnessMapUv), y.push(E.roughnessMapUv), y.push(E.anisotropyMapUv), y.push(E.clearcoatMapUv), y.push(E.clearcoatNormalMapUv), y.push(E.clearcoatRoughnessMapUv), y.push(E.iridescenceMapUv), y.push(E.iridescenceThicknessMapUv), y.push(E.sheenColorMapUv), y.push(E.sheenRoughnessMapUv), y.push(E.specularMapUv), y.push(E.specularColorMapUv), y.push(E.specularIntensityMapUv), y.push(E.transmissionMapUv), y.push(E.thicknessMapUv), y.push(E.combine), y.push(E.fogExp2), y.push(E.sizeAttenuation), y.push(E.morphTargetsCount), y.push(E.morphAttributeCount), y.push(E.numDirLights), y.push(E.numPointLights), y.push(E.numSpotLights), y.push(E.numSpotLightMaps), y.push(E.numHemiLights), y.push(E.numRectAreaLights), y.push(E.numDirLightShadows), y.push(E.numPointLightShadows), y.push(E.numSpotLightShadows), y.push(E.numSpotLightShadowsWithMaps), y.push(E.numLightProbes), y.push(E.shadowMapType), y.push(E.toneMapping), y.push(E.numClippingPlanes), y.push(E.numClipIntersection), y.push(E.depthPacking);
  }
  function g(y, E) {
    s.disableAll(), E.isWebGL2 && s.enable(0), E.supportsVertexTextures && s.enable(1), E.instancing && s.enable(2), E.instancingColor && s.enable(3), E.matcap && s.enable(4), E.envMap && s.enable(5), E.normalMapObjectSpace && s.enable(6), E.normalMapTangentSpace && s.enable(7), E.clearcoat && s.enable(8), E.iridescence && s.enable(9), E.alphaTest && s.enable(10), E.vertexColors && s.enable(11), E.vertexAlphas && s.enable(12), E.vertexUv1s && s.enable(13), E.vertexUv2s && s.enable(14), E.vertexUv3s && s.enable(15), E.vertexTangents && s.enable(16), E.anisotropy && s.enable(17), E.alphaHash && s.enable(18), E.batching && s.enable(19), y.push(s.mask), s.disableAll(), E.fog && s.enable(0), E.useFog && s.enable(1), E.flatShading && s.enable(2), E.logarithmicDepthBuffer && s.enable(3), E.skinning && s.enable(4), E.morphTargets && s.enable(5), E.morphNormals && s.enable(6), E.morphColors && s.enable(7), E.premultipliedAlpha && s.enable(8), E.shadowMapEnabled && s.enable(9), E.useLegacyLights && s.enable(10), E.doubleSided && s.enable(11), E.flipSided && s.enable(12), E.useDepthPacking && s.enable(13), E.dithering && s.enable(14), E.transmission && s.enable(15), E.sheen && s.enable(16), E.opaque && s.enable(17), E.pointsUvs && s.enable(18), E.decodeVideoTexture && s.enable(19), y.push(s.mask);
  }
  function T(y) {
    const E = _[y.type];
    let z;
    if (E) {
      const q = kt[E];
      z = gi.clone(q.uniforms);
    } else
      z = y.uniforms;
    return z;
  }
  function C(y, E) {
    let z;
    for (let q = 0, le = c.length; q < le; q++) {
      const L = c[q];
      if (L.cacheKey === E) {
        z = L, ++z.usedTimes;
        break;
      }
    }
    return z === void 0 && (z = new Dh(i, E, y, a), c.push(z)), z;
  }
  function R(y) {
    if (--y.usedTimes === 0) {
      const E = c.indexOf(y);
      c[E] = c[c.length - 1], c.pop(), y.destroy();
    }
  }
  function w(y) {
    l.remove(y);
  }
  function H() {
    l.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: u,
    getUniforms: T,
    acquireProgram: C,
    releaseProgram: R,
    releaseShaderCache: w,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: H
  };
}
function Oh() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function t(a) {
    i.delete(a);
  }
  function n(a, o, s) {
    i.get(a)[o] = s;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    remove: t,
    update: n,
    dispose: r
  };
}
function Bh(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Vs(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Ws() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function a() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function o(f, h, m, _, b, p) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: f.id,
      object: f,
      geometry: h,
      material: m,
      groupOrder: _,
      renderOrder: f.renderOrder,
      z: b,
      group: p
    }, i[e] = u) : (u.id = f.id, u.object = f, u.geometry = h, u.material = m, u.groupOrder = _, u.renderOrder = f.renderOrder, u.z = b, u.group = p), e++, u;
  }
  function s(f, h, m, _, b, p) {
    const u = o(f, h, m, _, b, p);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function l(f, h, m, _, b, p) {
    const u = o(f, h, m, _, b, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(f, h) {
    t.length > 1 && t.sort(f || Bh), n.length > 1 && n.sort(h || Vs), r.length > 1 && r.sort(h || Vs);
  }
  function d() {
    for (let f = e, h = i.length; f < h; f++) {
      const m = i[f];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: a,
    push: s,
    unshift: l,
    finish: d,
    sort: c
  };
}
function zh() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const a = i.get(n);
    let o;
    return a === void 0 ? (o = new Ws(), i.set(n, [o])) : r >= a.length ? (o = new Ws(), a.push(o)) : o = a[r], o;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Gh() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new D(),
            color: new We()
          };
          break;
        case "SpotLight":
          t = {
            position: new D(),
            direction: new D(),
            color: new We(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new D(),
            color: new We(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new D(),
            skyColor: new We(),
            groundColor: new We()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new We(),
            position: new D(),
            halfWidth: new D(),
            halfHeight: new D()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function kh() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new be()
          };
          break;
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new be()
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new be(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let Hh = 0;
function Vh(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Wh(i, e) {
  const t = new Gh(), n = kh(), r = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let d = 0; d < 9; d++) r.probe.push(new D());
  const a = new D(), o = new ct(), s = new ct();
  function l(d, f) {
    let h = 0, m = 0, _ = 0;
    for (let q = 0; q < 9; q++) r.probe[q].set(0, 0, 0);
    let b = 0, p = 0, u = 0, v = 0, g = 0, T = 0, C = 0, R = 0, w = 0, H = 0, y = 0;
    d.sort(Vh);
    const E = f === !0 ? Math.PI : 1;
    for (let q = 0, le = d.length; q < le; q++) {
      const L = d[q], N = L.color, V = L.intensity, Y = L.distance, X = L.shadow && L.shadow.map ? L.shadow.map.texture : null;
      if (L.isAmbientLight)
        h += N.r * V * E, m += N.g * V * E, _ += N.b * V * E;
      else if (L.isLightProbe) {
        for (let W = 0; W < 9; W++)
          r.probe[W].addScaledVector(L.sh.coefficients[W], V);
        y++;
      } else if (L.isDirectionalLight) {
        const W = t.get(L);
        if (W.color.copy(L.color).multiplyScalar(L.intensity * E), L.castShadow) {
          const Q = L.shadow, te = n.get(L);
          te.shadowBias = Q.bias, te.shadowNormalBias = Q.normalBias, te.shadowRadius = Q.radius, te.shadowMapSize = Q.mapSize, r.directionalShadow[b] = te, r.directionalShadowMap[b] = X, r.directionalShadowMatrix[b] = L.shadow.matrix, T++;
        }
        r.directional[b] = W, b++;
      } else if (L.isSpotLight) {
        const W = t.get(L);
        W.position.setFromMatrixPosition(L.matrixWorld), W.color.copy(N).multiplyScalar(V * E), W.distance = Y, W.coneCos = Math.cos(L.angle), W.penumbraCos = Math.cos(L.angle * (1 - L.penumbra)), W.decay = L.decay, r.spot[u] = W;
        const Q = L.shadow;
        if (L.map && (r.spotLightMap[w] = L.map, w++, Q.updateMatrices(L), L.castShadow && H++), r.spotLightMatrix[u] = Q.matrix, L.castShadow) {
          const te = n.get(L);
          te.shadowBias = Q.bias, te.shadowNormalBias = Q.normalBias, te.shadowRadius = Q.radius, te.shadowMapSize = Q.mapSize, r.spotShadow[u] = te, r.spotShadowMap[u] = X, R++;
        }
        u++;
      } else if (L.isRectAreaLight) {
        const W = t.get(L);
        W.color.copy(N).multiplyScalar(V), W.halfWidth.set(L.width * 0.5, 0, 0), W.halfHeight.set(0, L.height * 0.5, 0), r.rectArea[v] = W, v++;
      } else if (L.isPointLight) {
        const W = t.get(L);
        if (W.color.copy(L.color).multiplyScalar(L.intensity * E), W.distance = L.distance, W.decay = L.decay, L.castShadow) {
          const Q = L.shadow, te = n.get(L);
          te.shadowBias = Q.bias, te.shadowNormalBias = Q.normalBias, te.shadowRadius = Q.radius, te.shadowMapSize = Q.mapSize, te.shadowCameraNear = Q.camera.near, te.shadowCameraFar = Q.camera.far, r.pointShadow[p] = te, r.pointShadowMap[p] = X, r.pointShadowMatrix[p] = L.shadow.matrix, C++;
        }
        r.point[p] = W, p++;
      } else if (L.isHemisphereLight) {
        const W = t.get(L);
        W.skyColor.copy(L.color).multiplyScalar(V * E), W.groundColor.copy(L.groundColor).multiplyScalar(V * E), r.hemi[g] = W, g++;
      }
    }
    v > 0 && (e.isWebGL2 ? i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = oe.LTC_FLOAT_1, r.rectAreaLTC2 = oe.LTC_FLOAT_2) : (r.rectAreaLTC1 = oe.LTC_HALF_1, r.rectAreaLTC2 = oe.LTC_HALF_2) : i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = oe.LTC_FLOAT_1, r.rectAreaLTC2 = oe.LTC_FLOAT_2) : i.has("OES_texture_half_float_linear") === !0 ? (r.rectAreaLTC1 = oe.LTC_HALF_1, r.rectAreaLTC2 = oe.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = h, r.ambient[1] = m, r.ambient[2] = _;
    const z = r.hash;
    (z.directionalLength !== b || z.pointLength !== p || z.spotLength !== u || z.rectAreaLength !== v || z.hemiLength !== g || z.numDirectionalShadows !== T || z.numPointShadows !== C || z.numSpotShadows !== R || z.numSpotMaps !== w || z.numLightProbes !== y) && (r.directional.length = b, r.spot.length = u, r.rectArea.length = v, r.point.length = p, r.hemi.length = g, r.directionalShadow.length = T, r.directionalShadowMap.length = T, r.pointShadow.length = C, r.pointShadowMap.length = C, r.spotShadow.length = R, r.spotShadowMap.length = R, r.directionalShadowMatrix.length = T, r.pointShadowMatrix.length = C, r.spotLightMatrix.length = R + w - H, r.spotLightMap.length = w, r.numSpotLightShadowsWithMaps = H, r.numLightProbes = y, z.directionalLength = b, z.pointLength = p, z.spotLength = u, z.rectAreaLength = v, z.hemiLength = g, z.numDirectionalShadows = T, z.numPointShadows = C, z.numSpotShadows = R, z.numSpotMaps = w, z.numLightProbes = y, r.version = Hh++);
  }
  function c(d, f) {
    let h = 0, m = 0, _ = 0, b = 0, p = 0;
    const u = f.matrixWorldInverse;
    for (let v = 0, g = d.length; v < g; v++) {
      const T = d[v];
      if (T.isDirectionalLight) {
        const C = r.directional[h];
        C.direction.setFromMatrixPosition(T.matrixWorld), a.setFromMatrixPosition(T.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(u), h++;
      } else if (T.isSpotLight) {
        const C = r.spot[_];
        C.position.setFromMatrixPosition(T.matrixWorld), C.position.applyMatrix4(u), C.direction.setFromMatrixPosition(T.matrixWorld), a.setFromMatrixPosition(T.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(u), _++;
      } else if (T.isRectAreaLight) {
        const C = r.rectArea[b];
        C.position.setFromMatrixPosition(T.matrixWorld), C.position.applyMatrix4(u), s.identity(), o.copy(T.matrixWorld), o.premultiply(u), s.extractRotation(o), C.halfWidth.set(T.width * 0.5, 0, 0), C.halfHeight.set(0, T.height * 0.5, 0), C.halfWidth.applyMatrix4(s), C.halfHeight.applyMatrix4(s), b++;
      } else if (T.isPointLight) {
        const C = r.point[m];
        C.position.setFromMatrixPosition(T.matrixWorld), C.position.applyMatrix4(u), m++;
      } else if (T.isHemisphereLight) {
        const C = r.hemi[p];
        C.direction.setFromMatrixPosition(T.matrixWorld), C.direction.transformDirection(u), p++;
      }
    }
  }
  return {
    setup: l,
    setupView: c,
    state: r
  };
}
function Xs(i, e) {
  const t = new Wh(i, e), n = [], r = [];
  function a() {
    n.length = 0, r.length = 0;
  }
  function o(f) {
    n.push(f);
  }
  function s(f) {
    r.push(f);
  }
  function l(f) {
    t.setup(n, f);
  }
  function c(f) {
    t.setupView(n, f);
  }
  return {
    init: a,
    state: {
      lightsArray: n,
      shadowsArray: r,
      lights: t
    },
    setupLights: l,
    setupLightsView: c,
    pushLight: o,
    pushShadow: s
  };
}
function Xh(i, e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(a, o = 0) {
    const s = t.get(a);
    let l;
    return s === void 0 ? (l = new Xs(i, e), t.set(a, [l])) : o >= s.length ? (l = new Xs(i, e), s.push(l)) : l = s[o], l;
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class qh extends lr {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = kl, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Yh extends lr {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const jh = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Kh = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Zh(i, e, t) {
  let n = new No();
  const r = new be(), a = new be(), o = new lt(), s = new qh({ depthPacking: Hl }), l = new Yh(), c = {}, d = t.maxTextureSize, f = { [tn]: yt, [yt]: tn, [$t]: $t }, h = new ht({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new be() },
      radius: { value: 4 }
    },
    vertexShader: jh,
    fragmentShader: Kh
  }), m = h.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const _ = new Vt();
  _.setAttribute(
    "position",
    new Ht(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const b = new Bt(_, h), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = ro;
  let u = this.type;
  this.render = function(R, w, H) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || R.length === 0) return;
    const y = i.getRenderTarget(), E = i.getActiveCubeFace(), z = i.getActiveMipmapLevel(), q = i.state;
    q.setBlending(Jt), q.buffers.color.setClear(1, 1, 1, 1), q.buffers.depth.setTest(!0), q.setScissorTest(!1);
    const le = u !== Zt && this.type === Zt, L = u === Zt && this.type !== Zt;
    for (let N = 0, V = R.length; N < V; N++) {
      const Y = R[N], X = Y.shadow;
      if (X === void 0) {
        console.warn("THREE.WebGLShadowMap:", Y, "has no shadow.");
        continue;
      }
      if (X.autoUpdate === !1 && X.needsUpdate === !1) continue;
      r.copy(X.mapSize);
      const W = X.getFrameExtents();
      if (r.multiply(W), a.copy(X.mapSize), (r.x > d || r.y > d) && (r.x > d && (a.x = Math.floor(d / W.x), r.x = a.x * W.x, X.mapSize.x = a.x), r.y > d && (a.y = Math.floor(d / W.y), r.y = a.y * W.y, X.mapSize.y = a.y)), X.map === null || le === !0 || L === !0) {
        const te = this.type !== Zt ? { minFilter: _t, magFilter: _t } : {};
        X.map !== null && X.map.dispose(), X.map = new zt(r.x, r.y, te), X.map.texture.name = Y.name + ".shadowMap", X.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(X.map), i.clear();
      const Q = X.getViewportCount();
      for (let te = 0; te < Q; te++) {
        const de = X.getViewport(te);
        o.set(
          a.x * de.x,
          a.y * de.y,
          a.x * de.z,
          a.y * de.w
        ), q.viewport(o), X.updateMatrices(Y, te), n = X.getFrustum(), T(w, H, X.camera, Y, this.type);
      }
      X.isPointLightShadow !== !0 && this.type === Zt && v(X, H), X.needsUpdate = !1;
    }
    u = this.type, p.needsUpdate = !1, i.setRenderTarget(y, E, z);
  };
  function v(R, w) {
    const H = e.update(b);
    h.defines.VSM_SAMPLES !== R.blurSamples && (h.defines.VSM_SAMPLES = R.blurSamples, m.defines.VSM_SAMPLES = R.blurSamples, h.needsUpdate = !0, m.needsUpdate = !0), R.mapPass === null && (R.mapPass = new zt(r.x, r.y)), h.uniforms.shadow_pass.value = R.map.texture, h.uniforms.resolution.value = R.mapSize, h.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(w, null, H, h, b, null), m.uniforms.shadow_pass.value = R.mapPass.texture, m.uniforms.resolution.value = R.mapSize, m.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(w, null, H, m, b, null);
  }
  function g(R, w, H, y) {
    let E = null;
    const z = H.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (z !== void 0)
      E = z;
    else if (E = H.isPointLight === !0 ? l : s, i.localClippingEnabled && w.clipShadows === !0 && Array.isArray(w.clippingPlanes) && w.clippingPlanes.length !== 0 || w.displacementMap && w.displacementScale !== 0 || w.alphaMap && w.alphaTest > 0 || w.map && w.alphaTest > 0) {
      const q = E.uuid, le = w.uuid;
      let L = c[q];
      L === void 0 && (L = {}, c[q] = L);
      let N = L[le];
      N === void 0 && (N = E.clone(), L[le] = N, w.addEventListener("dispose", C)), E = N;
    }
    if (E.visible = w.visible, E.wireframe = w.wireframe, y === Zt ? E.side = w.shadowSide !== null ? w.shadowSide : w.side : E.side = w.shadowSide !== null ? w.shadowSide : f[w.side], E.alphaMap = w.alphaMap, E.alphaTest = w.alphaTest, E.map = w.map, E.clipShadows = w.clipShadows, E.clippingPlanes = w.clippingPlanes, E.clipIntersection = w.clipIntersection, E.displacementMap = w.displacementMap, E.displacementScale = w.displacementScale, E.displacementBias = w.displacementBias, E.wireframeLinewidth = w.wireframeLinewidth, E.linewidth = w.linewidth, H.isPointLight === !0 && E.isMeshDistanceMaterial === !0) {
      const q = i.properties.get(E);
      q.light = H;
    }
    return E;
  }
  function T(R, w, H, y, E) {
    if (R.visible === !1) return;
    if (R.layers.test(w.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && E === Zt) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, R.matrixWorld);
      const le = e.update(R), L = R.material;
      if (Array.isArray(L)) {
        const N = le.groups;
        for (let V = 0, Y = N.length; V < Y; V++) {
          const X = N[V], W = L[X.materialIndex];
          if (W && W.visible) {
            const Q = g(R, W, y, E);
            R.onBeforeShadow(i, R, w, H, le, Q, X), i.renderBufferDirect(H, null, le, Q, R, X), R.onAfterShadow(i, R, w, H, le, Q, X);
          }
        }
      } else if (L.visible) {
        const N = g(R, L, y, E);
        R.onBeforeShadow(i, R, w, H, le, N, null), i.renderBufferDirect(H, null, le, N, R, null), R.onAfterShadow(i, R, w, H, le, N, null);
      }
    }
    const q = R.children;
    for (let le = 0, L = q.length; le < L; le++)
      T(q[le], w, H, y, E);
  }
  function C(R) {
    R.target.removeEventListener("dispose", C);
    for (const H in c) {
      const y = c[H], E = R.target.uuid;
      E in y && (y[E].dispose(), delete y[E]);
    }
  }
}
function $h(i, e, t) {
  const n = t.isWebGL2;
  function r() {
    let P = !1;
    const ie = new lt();
    let re = null;
    const Me = new lt(0, 0, 0, 0);
    return {
      setMask: function(ve) {
        re !== ve && !P && (i.colorMask(ve, ve, ve, ve), re = ve);
      },
      setLocked: function(ve) {
        P = ve;
      },
      setClear: function(ve, Xe, qe, rt, pt) {
        pt === !0 && (ve *= rt, Xe *= rt, qe *= rt), ie.set(ve, Xe, qe, rt), Me.equals(ie) === !1 && (i.clearColor(ve, Xe, qe, rt), Me.copy(ie));
      },
      reset: function() {
        P = !1, re = null, Me.set(-1, 0, 0, 0);
      }
    };
  }
  function a() {
    let P = !1, ie = null, re = null, Me = null;
    return {
      setTest: function(ve) {
        ve ? Pe(i.DEPTH_TEST) : Ee(i.DEPTH_TEST);
      },
      setMask: function(ve) {
        ie !== ve && !P && (i.depthMask(ve), ie = ve);
      },
      setFunc: function(ve) {
        if (re !== ve) {
          switch (ve) {
            case Sl:
              i.depthFunc(i.NEVER);
              break;
            case Ml:
              i.depthFunc(i.ALWAYS);
              break;
            case El:
              i.depthFunc(i.LESS);
              break;
            case $i:
              i.depthFunc(i.LEQUAL);
              break;
            case Tl:
              i.depthFunc(i.EQUAL);
              break;
            case Al:
              i.depthFunc(i.GEQUAL);
              break;
            case Rl:
              i.depthFunc(i.GREATER);
              break;
            case wl:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          re = ve;
        }
      },
      setLocked: function(ve) {
        P = ve;
      },
      setClear: function(ve) {
        Me !== ve && (i.clearDepth(ve), Me = ve);
      },
      reset: function() {
        P = !1, ie = null, re = null, Me = null;
      }
    };
  }
  function o() {
    let P = !1, ie = null, re = null, Me = null, ve = null, Xe = null, qe = null, rt = null, pt = null;
    return {
      setTest: function(je) {
        P || (je ? Pe(i.STENCIL_TEST) : Ee(i.STENCIL_TEST));
      },
      setMask: function(je) {
        ie !== je && !P && (i.stencilMask(je), ie = je);
      },
      setFunc: function(je, mt, Gt) {
        (re !== je || Me !== mt || ve !== Gt) && (i.stencilFunc(je, mt, Gt), re = je, Me = mt, ve = Gt);
      },
      setOp: function(je, mt, Gt) {
        (Xe !== je || qe !== mt || rt !== Gt) && (i.stencilOp(je, mt, Gt), Xe = je, qe = mt, rt = Gt);
      },
      setLocked: function(je) {
        P = je;
      },
      setClear: function(je) {
        pt !== je && (i.clearStencil(je), pt = je);
      },
      reset: function() {
        P = !1, ie = null, re = null, Me = null, ve = null, Xe = null, qe = null, rt = null, pt = null;
      }
    };
  }
  const s = new r(), l = new a(), c = new o(), d = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap();
  let h = {}, m = {}, _ = /* @__PURE__ */ new WeakMap(), b = [], p = null, u = !1, v = null, g = null, T = null, C = null, R = null, w = null, H = null, y = new We(0, 0, 0), E = 0, z = !1, q = null, le = null, L = null, N = null, V = null;
  const Y = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let X = !1, W = 0;
  const Q = i.getParameter(i.VERSION);
  Q.indexOf("WebGL") !== -1 ? (W = parseFloat(/^WebGL (\d)/.exec(Q)[1]), X = W >= 1) : Q.indexOf("OpenGL ES") !== -1 && (W = parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]), X = W >= 2);
  let te = null, de = {};
  const k = i.getParameter(i.SCISSOR_BOX), K = i.getParameter(i.VIEWPORT), ue = new lt().fromArray(k), xe = new lt().fromArray(K);
  function ge(P, ie, re, Me) {
    const ve = new Uint8Array(4), Xe = i.createTexture();
    i.bindTexture(P, Xe), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let qe = 0; qe < re; qe++)
      n && (P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY) ? i.texImage3D(ie, 0, i.RGBA, 1, 1, Me, 0, i.RGBA, i.UNSIGNED_BYTE, ve) : i.texImage2D(ie + qe, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ve);
    return Xe;
  }
  const Ce = {};
  Ce[i.TEXTURE_2D] = ge(i.TEXTURE_2D, i.TEXTURE_2D, 1), Ce[i.TEXTURE_CUBE_MAP] = ge(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), n && (Ce[i.TEXTURE_2D_ARRAY] = ge(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), Ce[i.TEXTURE_3D] = ge(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)), s.setClear(0, 0, 0, 1), l.setClear(1), c.setClear(0), Pe(i.DEPTH_TEST), l.setFunc($i), Le(!1), M(Ra), Pe(i.CULL_FACE), pe(Jt);
  function Pe(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function Ee(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function ke(P, ie) {
    return m[P] !== ie ? (i.bindFramebuffer(P, ie), m[P] = ie, n && (P === i.DRAW_FRAMEBUFFER && (m[i.FRAMEBUFFER] = ie), P === i.FRAMEBUFFER && (m[i.DRAW_FRAMEBUFFER] = ie)), !0) : !1;
  }
  function I(P, ie) {
    let re = b, Me = !1;
    if (P)
      if (re = _.get(ie), re === void 0 && (re = [], _.set(ie, re)), P.isWebGLMultipleRenderTargets) {
        const ve = P.texture;
        if (re.length !== ve.length || re[0] !== i.COLOR_ATTACHMENT0) {
          for (let Xe = 0, qe = ve.length; Xe < qe; Xe++)
            re[Xe] = i.COLOR_ATTACHMENT0 + Xe;
          re.length = ve.length, Me = !0;
        }
      } else
        re[0] !== i.COLOR_ATTACHMENT0 && (re[0] = i.COLOR_ATTACHMENT0, Me = !0);
    else
      re[0] !== i.BACK && (re[0] = i.BACK, Me = !0);
    Me && (t.isWebGL2 ? i.drawBuffers(re) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re));
  }
  function it(P) {
    return p !== P ? (i.useProgram(P), p = P, !0) : !1;
  }
  const Se = {
    [un]: i.FUNC_ADD,
    [cl]: i.FUNC_SUBTRACT,
    [ul]: i.FUNC_REVERSE_SUBTRACT
  };
  if (n)
    Se[Pa] = i.MIN, Se[La] = i.MAX;
  else {
    const P = e.get("EXT_blend_minmax");
    P !== null && (Se[Pa] = P.MIN_EXT, Se[La] = P.MAX_EXT);
  }
  const Re = {
    [so]: i.ZERO,
    [Yi]: i.ONE,
    [dl]: i.SRC_COLOR,
    [Zi]: i.SRC_ALPHA,
    [_l]: i.SRC_ALPHA_SATURATE,
    [ml]: i.DST_COLOR,
    [hl]: i.DST_ALPHA,
    [fl]: i.ONE_MINUS_SRC_COLOR,
    [Yr]: i.ONE_MINUS_SRC_ALPHA,
    [gl]: i.ONE_MINUS_DST_COLOR,
    [pl]: i.ONE_MINUS_DST_ALPHA,
    [bl]: i.CONSTANT_COLOR,
    [xl]: i.ONE_MINUS_CONSTANT_COLOR,
    [vl]: i.CONSTANT_ALPHA,
    [yl]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function pe(P, ie, re, Me, ve, Xe, qe, rt, pt, je) {
    if (P === Jt) {
      u === !0 && (Ee(i.BLEND), u = !1);
      return;
    }
    if (u === !1 && (Pe(i.BLEND), u = !0), P !== ao) {
      if (P !== v || je !== z) {
        if ((g !== un || R !== un) && (i.blendEquation(i.FUNC_ADD), g = un, R = un), je)
          switch (P) {
            case jn:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case pi:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case wa:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Ca:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case jn:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case pi:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case wa:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Ca:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        T = null, C = null, w = null, H = null, y.set(0, 0, 0), E = 0, v = P, z = je;
      }
      return;
    }
    ve = ve || ie, Xe = Xe || re, qe = qe || Me, (ie !== g || ve !== R) && (i.blendEquationSeparate(Se[ie], Se[ve]), g = ie, R = ve), (re !== T || Me !== C || Xe !== w || qe !== H) && (i.blendFuncSeparate(Re[re], Re[Me], Re[Xe], Re[qe]), T = re, C = Me, w = Xe, H = qe), (rt.equals(y) === !1 || pt !== E) && (i.blendColor(rt.r, rt.g, rt.b, pt), y.copy(rt), E = pt), v = P, z = !1;
  }
  function Ze(P, ie) {
    P.side === $t ? Ee(i.CULL_FACE) : Pe(i.CULL_FACE);
    let re = P.side === yt;
    ie && (re = !re), Le(re), P.blending === jn && P.transparent === !1 ? pe(Jt) : pe(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), l.setFunc(P.depthFunc), l.setTest(P.depthTest), l.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const Me = P.stencilWrite;
    c.setTest(Me), Me && (c.setMask(P.stencilWriteMask), c.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), c.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), F(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? Pe(i.SAMPLE_ALPHA_TO_COVERAGE) : Ee(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Le(P) {
    q !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), q = P);
  }
  function M(P) {
    P !== sl ? (Pe(i.CULL_FACE), P !== le && (P === Ra ? i.cullFace(i.BACK) : P === ol ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Ee(i.CULL_FACE), le = P;
  }
  function x(P) {
    P !== L && (X && i.lineWidth(P), L = P);
  }
  function F(P, ie, re) {
    P ? (Pe(i.POLYGON_OFFSET_FILL), (N !== ie || V !== re) && (i.polygonOffset(ie, re), N = ie, V = re)) : Ee(i.POLYGON_OFFSET_FILL);
  }
  function ee(P) {
    P ? Pe(i.SCISSOR_TEST) : Ee(i.SCISSOR_TEST);
  }
  function $(P) {
    P === void 0 && (P = i.TEXTURE0 + Y - 1), te !== P && (i.activeTexture(P), te = P);
  }
  function J(P, ie, re) {
    re === void 0 && (te === null ? re = i.TEXTURE0 + Y - 1 : re = te);
    let Me = de[re];
    Me === void 0 && (Me = { type: void 0, texture: void 0 }, de[re] = Me), (Me.type !== P || Me.texture !== ie) && (te !== re && (i.activeTexture(re), te = re), i.bindTexture(P, ie || Ce[P]), Me.type = P, Me.texture = ie);
  }
  function me() {
    const P = de[te];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function ce() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function he() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Te() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ue() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Z() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function He() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function A() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function j() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function se() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ne() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function _e(P) {
    ue.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), ue.copy(P));
  }
  function Be(P) {
    xe.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), xe.copy(P));
  }
  function Ve(P, ie) {
    let re = f.get(ie);
    re === void 0 && (re = /* @__PURE__ */ new WeakMap(), f.set(ie, re));
    let Me = re.get(P);
    Me === void 0 && (Me = i.getUniformBlockIndex(ie, P.name), re.set(P, Me));
  }
  function Fe(P, ie) {
    const Me = f.get(ie).get(P);
    d.get(ie) !== Me && (i.uniformBlockBinding(ie, Me, P.__bindingPointIndex), d.set(ie, Me));
  }
  function ae() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), n === !0 && (i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null)), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, te = null, de = {}, m = {}, _ = /* @__PURE__ */ new WeakMap(), b = [], p = null, u = !1, v = null, g = null, T = null, C = null, R = null, w = null, H = null, y = new We(0, 0, 0), E = 0, z = !1, q = null, le = null, L = null, N = null, V = null, ue.set(0, 0, i.canvas.width, i.canvas.height), xe.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), l.reset(), c.reset();
  }
  return {
    buffers: {
      color: s,
      depth: l,
      stencil: c
    },
    enable: Pe,
    disable: Ee,
    bindFramebuffer: ke,
    drawBuffers: I,
    useProgram: it,
    setBlending: pe,
    setMaterial: Ze,
    setFlipSided: Le,
    setCullFace: M,
    setLineWidth: x,
    setPolygonOffset: F,
    setScissorTest: ee,
    activeTexture: $,
    bindTexture: J,
    unbindTexture: me,
    compressedTexImage2D: ce,
    compressedTexImage3D: he,
    texImage2D: se,
    texImage3D: ne,
    updateUBOMapping: Ve,
    uniformBlockBinding: Fe,
    texStorage2D: A,
    texStorage3D: j,
    texSubImage2D: Te,
    texSubImage3D: Ue,
    compressedTexSubImage2D: Z,
    compressedTexSubImage3D: He,
    scissor: _e,
    viewport: Be,
    reset: ae
  };
}
function Qh(i, e, t, n, r, a, o) {
  const s = r.isWebGL2, l = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), d = /* @__PURE__ */ new WeakMap();
  let f;
  const h = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function _(M, x) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(M, x)
    ) : nr("canvas");
  }
  function b(M, x, F, ee) {
    let $ = 1;
    if ((M.width > ee || M.height > ee) && ($ = ee / Math.max(M.width, M.height)), $ < 1 || x === !0)
      if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
        const J = x ? ea : Math.floor, me = J($ * M.width), ce = J($ * M.height);
        f === void 0 && (f = _(me, ce));
        const he = F ? _(me, ce) : f;
        return he.width = me, he.height = ce, he.getContext("2d").drawImage(M, 0, 0, me, ce), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + M.width + "x" + M.height + ") to (" + me + "x" + ce + ")."), he;
      } else
        return "data" in M && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + M.width + "x" + M.height + ")."), M;
    return M;
  }
  function p(M) {
    return os(M.width) && os(M.height);
  }
  function u(M) {
    return s ? !1 : M.wrapS !== Ft || M.wrapT !== Ft || M.minFilter !== _t && M.minFilter !== Ct;
  }
  function v(M, x) {
    return M.generateMipmaps && x && M.minFilter !== _t && M.minFilter !== Ct;
  }
  function g(M) {
    i.generateMipmap(M);
  }
  function T(M, x, F, ee, $ = !1) {
    if (s === !1) return x;
    if (M !== null) {
      if (i[M] !== void 0) return i[M];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + M + "'");
    }
    let J = x;
    if (x === i.RED && (F === i.FLOAT && (J = i.R32F), F === i.HALF_FLOAT && (J = i.R16F), F === i.UNSIGNED_BYTE && (J = i.R8)), x === i.RED_INTEGER && (F === i.UNSIGNED_BYTE && (J = i.R8UI), F === i.UNSIGNED_SHORT && (J = i.R16UI), F === i.UNSIGNED_INT && (J = i.R32UI), F === i.BYTE && (J = i.R8I), F === i.SHORT && (J = i.R16I), F === i.INT && (J = i.R32I)), x === i.RG && (F === i.FLOAT && (J = i.RG32F), F === i.HALF_FLOAT && (J = i.RG16F), F === i.UNSIGNED_BYTE && (J = i.RG8)), x === i.RGBA) {
      const me = $ ? Qi : Ye.getTransfer(ee);
      F === i.FLOAT && (J = i.RGBA32F), F === i.HALF_FLOAT && (J = i.RGBA16F), F === i.UNSIGNED_BYTE && (J = me === Ke ? i.SRGB8_ALPHA8 : i.RGBA8), F === i.UNSIGNED_SHORT_4_4_4_4 && (J = i.RGBA4), F === i.UNSIGNED_SHORT_5_5_5_1 && (J = i.RGB5_A1);
    }
    return (J === i.R16F || J === i.R32F || J === i.RG16F || J === i.RG32F || J === i.RGBA16F || J === i.RGBA32F) && e.get("EXT_color_buffer_float"), J;
  }
  function C(M, x, F) {
    return v(M, F) === !0 || M.isFramebufferTexture && M.minFilter !== _t && M.minFilter !== Ct ? Math.log2(Math.max(x.width, x.height)) + 1 : M.mipmaps !== void 0 && M.mipmaps.length > 0 ? M.mipmaps.length : M.isCompressedTexture && Array.isArray(M.image) ? x.mipmaps.length : 1;
  }
  function R(M) {
    return M === _t || M === Da || M === pr ? i.NEAREST : i.LINEAR;
  }
  function w(M) {
    const x = M.target;
    x.removeEventListener("dispose", w), y(x), x.isVideoTexture && d.delete(x);
  }
  function H(M) {
    const x = M.target;
    x.removeEventListener("dispose", H), z(x);
  }
  function y(M) {
    const x = n.get(M);
    if (x.__webglInit === void 0) return;
    const F = M.source, ee = h.get(F);
    if (ee) {
      const $ = ee[x.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && E(M), Object.keys(ee).length === 0 && h.delete(F);
    }
    n.remove(M);
  }
  function E(M) {
    const x = n.get(M);
    i.deleteTexture(x.__webglTexture);
    const F = M.source, ee = h.get(F);
    delete ee[x.__cacheKey], o.memory.textures--;
  }
  function z(M) {
    const x = M.texture, F = n.get(M), ee = n.get(x);
    if (ee.__webglTexture !== void 0 && (i.deleteTexture(ee.__webglTexture), o.memory.textures--), M.depthTexture && M.depthTexture.dispose(), M.isWebGLCubeRenderTarget)
      for (let $ = 0; $ < 6; $++) {
        if (Array.isArray(F.__webglFramebuffer[$]))
          for (let J = 0; J < F.__webglFramebuffer[$].length; J++) i.deleteFramebuffer(F.__webglFramebuffer[$][J]);
        else
          i.deleteFramebuffer(F.__webglFramebuffer[$]);
        F.__webglDepthbuffer && i.deleteRenderbuffer(F.__webglDepthbuffer[$]);
      }
    else {
      if (Array.isArray(F.__webglFramebuffer))
        for (let $ = 0; $ < F.__webglFramebuffer.length; $++) i.deleteFramebuffer(F.__webglFramebuffer[$]);
      else
        i.deleteFramebuffer(F.__webglFramebuffer);
      if (F.__webglDepthbuffer && i.deleteRenderbuffer(F.__webglDepthbuffer), F.__webglMultisampledFramebuffer && i.deleteFramebuffer(F.__webglMultisampledFramebuffer), F.__webglColorRenderbuffer)
        for (let $ = 0; $ < F.__webglColorRenderbuffer.length; $++)
          F.__webglColorRenderbuffer[$] && i.deleteRenderbuffer(F.__webglColorRenderbuffer[$]);
      F.__webglDepthRenderbuffer && i.deleteRenderbuffer(F.__webglDepthRenderbuffer);
    }
    if (M.isWebGLMultipleRenderTargets)
      for (let $ = 0, J = x.length; $ < J; $++) {
        const me = n.get(x[$]);
        me.__webglTexture && (i.deleteTexture(me.__webglTexture), o.memory.textures--), n.remove(x[$]);
      }
    n.remove(x), n.remove(M);
  }
  let q = 0;
  function le() {
    q = 0;
  }
  function L() {
    const M = q;
    return M >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + M + " texture units while this GPU supports only " + r.maxTextures), q += 1, M;
  }
  function N(M) {
    const x = [];
    return x.push(M.wrapS), x.push(M.wrapT), x.push(M.wrapR || 0), x.push(M.magFilter), x.push(M.minFilter), x.push(M.anisotropy), x.push(M.internalFormat), x.push(M.format), x.push(M.type), x.push(M.generateMipmaps), x.push(M.premultiplyAlpha), x.push(M.flipY), x.push(M.unpackAlignment), x.push(M.colorSpace), x.join();
  }
  function V(M, x) {
    const F = n.get(M);
    if (M.isVideoTexture && Ze(M), M.isRenderTargetTexture === !1 && M.version > 0 && F.__version !== M.version) {
      const ee = M.image;
      if (ee === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (ee.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        ue(F, M, x);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, F.__webglTexture, i.TEXTURE0 + x);
  }
  function Y(M, x) {
    const F = n.get(M);
    if (M.version > 0 && F.__version !== M.version) {
      ue(F, M, x);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, F.__webglTexture, i.TEXTURE0 + x);
  }
  function X(M, x) {
    const F = n.get(M);
    if (M.version > 0 && F.__version !== M.version) {
      ue(F, M, x);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, F.__webglTexture, i.TEXTURE0 + x);
  }
  function W(M, x) {
    const F = n.get(M);
    if (M.version > 0 && F.__version !== M.version) {
      xe(F, M, x);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture, i.TEXTURE0 + x);
  }
  const Q = {
    [Zr]: i.REPEAT,
    [Ft]: i.CLAMP_TO_EDGE,
    [$r]: i.MIRRORED_REPEAT
  }, te = {
    [_t]: i.NEAREST,
    [Da]: i.NEAREST_MIPMAP_NEAREST,
    [pr]: i.NEAREST_MIPMAP_LINEAR,
    [Ct]: i.LINEAR,
    [Dl]: i.LINEAR_MIPMAP_NEAREST,
    [mi]: i.LINEAR_MIPMAP_LINEAR
  }, de = {
    [Xl]: i.NEVER,
    [$l]: i.ALWAYS,
    [ql]: i.LESS,
    [So]: i.LEQUAL,
    [Yl]: i.EQUAL,
    [Zl]: i.GEQUAL,
    [jl]: i.GREATER,
    [Kl]: i.NOTEQUAL
  };
  function k(M, x, F) {
    if (F ? (i.texParameteri(M, i.TEXTURE_WRAP_S, Q[x.wrapS]), i.texParameteri(M, i.TEXTURE_WRAP_T, Q[x.wrapT]), (M === i.TEXTURE_3D || M === i.TEXTURE_2D_ARRAY) && i.texParameteri(M, i.TEXTURE_WRAP_R, Q[x.wrapR]), i.texParameteri(M, i.TEXTURE_MAG_FILTER, te[x.magFilter]), i.texParameteri(M, i.TEXTURE_MIN_FILTER, te[x.minFilter])) : (i.texParameteri(M, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(M, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), (M === i.TEXTURE_3D || M === i.TEXTURE_2D_ARRAY) && i.texParameteri(M, i.TEXTURE_WRAP_R, i.CLAMP_TO_EDGE), (x.wrapS !== Ft || x.wrapT !== Ft) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), i.texParameteri(M, i.TEXTURE_MAG_FILTER, R(x.magFilter)), i.texParameteri(M, i.TEXTURE_MIN_FILTER, R(x.minFilter)), x.minFilter !== _t && x.minFilter !== Ct && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), x.compareFunction && (i.texParameteri(M, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(M, i.TEXTURE_COMPARE_FUNC, de[x.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      const ee = e.get("EXT_texture_filter_anisotropic");
      if (x.magFilter === _t || x.minFilter !== pr && x.minFilter !== mi || x.type === fn && e.has("OES_texture_float_linear") === !1 || s === !1 && x.type === en && e.has("OES_texture_half_float_linear") === !1) return;
      (x.anisotropy > 1 || n.get(x).__currentAnisotropy) && (i.texParameterf(M, ee.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, r.getMaxAnisotropy())), n.get(x).__currentAnisotropy = x.anisotropy);
    }
  }
  function K(M, x) {
    let F = !1;
    M.__webglInit === void 0 && (M.__webglInit = !0, x.addEventListener("dispose", w));
    const ee = x.source;
    let $ = h.get(ee);
    $ === void 0 && ($ = {}, h.set(ee, $));
    const J = N(x);
    if (J !== M.__cacheKey) {
      $[J] === void 0 && ($[J] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, F = !0), $[J].usedTimes++;
      const me = $[M.__cacheKey];
      me !== void 0 && ($[M.__cacheKey].usedTimes--, me.usedTimes === 0 && E(x)), M.__cacheKey = J, M.__webglTexture = $[J].texture;
    }
    return F;
  }
  function ue(M, x, F) {
    let ee = i.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && (ee = i.TEXTURE_2D_ARRAY), x.isData3DTexture && (ee = i.TEXTURE_3D);
    const $ = K(M, x), J = x.source;
    t.bindTexture(ee, M.__webglTexture, i.TEXTURE0 + F);
    const me = n.get(J);
    if (J.version !== me.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + F);
      const ce = Ye.getPrimaries(Ye.workingColorSpace), he = x.colorSpace === Lt ? null : Ye.getPrimaries(x.colorSpace), Te = x.colorSpace === Lt || ce === he ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Te);
      const Ue = u(x) && p(x.image) === !1;
      let Z = b(x.image, Ue, !1, r.maxTextureSize);
      Z = Le(x, Z);
      const He = p(Z) || s, A = a.convert(x.format, x.colorSpace);
      let j = a.convert(x.type), se = T(x.internalFormat, A, j, x.colorSpace, x.isVideoTexture);
      k(ee, x, He);
      let ne;
      const _e = x.mipmaps, Be = s && x.isVideoTexture !== !0 && se !== vo, Ve = me.__version === void 0 || $ === !0, Fe = C(x, Z, He);
      if (x.isDepthTexture)
        se = i.DEPTH_COMPONENT, s ? x.type === fn ? se = i.DEPTH_COMPONENT32F : x.type === dn ? se = i.DEPTH_COMPONENT24 : x.type === Mn ? se = i.DEPTH24_STENCIL8 : se = i.DEPTH_COMPONENT16 : x.type === fn && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), x.format === En && se === i.DEPTH_COMPONENT && x.type !== oa && x.type !== dn && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), x.type = dn, j = a.convert(x.type)), x.format === Qn && se === i.DEPTH_COMPONENT && (se = i.DEPTH_STENCIL, x.type !== Mn && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), x.type = Mn, j = a.convert(x.type))), Ve && (Be ? t.texStorage2D(i.TEXTURE_2D, 1, se, Z.width, Z.height) : t.texImage2D(i.TEXTURE_2D, 0, se, Z.width, Z.height, 0, A, j, null));
      else if (x.isDataTexture)
        if (_e.length > 0 && He) {
          Be && Ve && t.texStorage2D(i.TEXTURE_2D, Fe, se, _e[0].width, _e[0].height);
          for (let ae = 0, P = _e.length; ae < P; ae++)
            ne = _e[ae], Be ? t.texSubImage2D(i.TEXTURE_2D, ae, 0, 0, ne.width, ne.height, A, j, ne.data) : t.texImage2D(i.TEXTURE_2D, ae, se, ne.width, ne.height, 0, A, j, ne.data);
          x.generateMipmaps = !1;
        } else
          Be ? (Ve && t.texStorage2D(i.TEXTURE_2D, Fe, se, Z.width, Z.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Z.width, Z.height, A, j, Z.data)) : t.texImage2D(i.TEXTURE_2D, 0, se, Z.width, Z.height, 0, A, j, Z.data);
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          Be && Ve && t.texStorage3D(i.TEXTURE_2D_ARRAY, Fe, se, _e[0].width, _e[0].height, Z.depth);
          for (let ae = 0, P = _e.length; ae < P; ae++)
            ne = _e[ae], x.format !== Ot ? A !== null ? Be ? t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, ae, 0, 0, 0, ne.width, ne.height, Z.depth, A, ne.data, 0, 0) : t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, ae, se, ne.width, ne.height, Z.depth, 0, ne.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Be ? t.texSubImage3D(i.TEXTURE_2D_ARRAY, ae, 0, 0, 0, ne.width, ne.height, Z.depth, A, j, ne.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, ae, se, ne.width, ne.height, Z.depth, 0, A, j, ne.data);
        } else {
          Be && Ve && t.texStorage2D(i.TEXTURE_2D, Fe, se, _e[0].width, _e[0].height);
          for (let ae = 0, P = _e.length; ae < P; ae++)
            ne = _e[ae], x.format !== Ot ? A !== null ? Be ? t.compressedTexSubImage2D(i.TEXTURE_2D, ae, 0, 0, ne.width, ne.height, A, ne.data) : t.compressedTexImage2D(i.TEXTURE_2D, ae, se, ne.width, ne.height, 0, ne.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Be ? t.texSubImage2D(i.TEXTURE_2D, ae, 0, 0, ne.width, ne.height, A, j, ne.data) : t.texImage2D(i.TEXTURE_2D, ae, se, ne.width, ne.height, 0, A, j, ne.data);
        }
      else if (x.isDataArrayTexture)
        Be ? (Ve && t.texStorage3D(i.TEXTURE_2D_ARRAY, Fe, se, Z.width, Z.height, Z.depth), t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Z.width, Z.height, Z.depth, A, j, Z.data)) : t.texImage3D(i.TEXTURE_2D_ARRAY, 0, se, Z.width, Z.height, Z.depth, 0, A, j, Z.data);
      else if (x.isData3DTexture)
        Be ? (Ve && t.texStorage3D(i.TEXTURE_3D, Fe, se, Z.width, Z.height, Z.depth), t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Z.width, Z.height, Z.depth, A, j, Z.data)) : t.texImage3D(i.TEXTURE_3D, 0, se, Z.width, Z.height, Z.depth, 0, A, j, Z.data);
      else if (x.isFramebufferTexture) {
        if (Ve)
          if (Be)
            t.texStorage2D(i.TEXTURE_2D, Fe, se, Z.width, Z.height);
          else {
            let ae = Z.width, P = Z.height;
            for (let ie = 0; ie < Fe; ie++)
              t.texImage2D(i.TEXTURE_2D, ie, se, ae, P, 0, A, j, null), ae >>= 1, P >>= 1;
          }
      } else if (_e.length > 0 && He) {
        Be && Ve && t.texStorage2D(i.TEXTURE_2D, Fe, se, _e[0].width, _e[0].height);
        for (let ae = 0, P = _e.length; ae < P; ae++)
          ne = _e[ae], Be ? t.texSubImage2D(i.TEXTURE_2D, ae, 0, 0, A, j, ne) : t.texImage2D(i.TEXTURE_2D, ae, se, A, j, ne);
        x.generateMipmaps = !1;
      } else
        Be ? (Ve && t.texStorage2D(i.TEXTURE_2D, Fe, se, Z.width, Z.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, A, j, Z)) : t.texImage2D(i.TEXTURE_2D, 0, se, A, j, Z);
      v(x, He) && g(ee), me.__version = J.version, x.onUpdate && x.onUpdate(x);
    }
    M.__version = x.version;
  }
  function xe(M, x, F) {
    if (x.image.length !== 6) return;
    const ee = K(M, x), $ = x.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, M.__webglTexture, i.TEXTURE0 + F);
    const J = n.get($);
    if ($.version !== J.__version || ee === !0) {
      t.activeTexture(i.TEXTURE0 + F);
      const me = Ye.getPrimaries(Ye.workingColorSpace), ce = x.colorSpace === Lt ? null : Ye.getPrimaries(x.colorSpace), he = x.colorSpace === Lt || me === ce ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, he);
      const Te = x.isCompressedTexture || x.image[0].isCompressedTexture, Ue = x.image[0] && x.image[0].isDataTexture, Z = [];
      for (let ae = 0; ae < 6; ae++)
        !Te && !Ue ? Z[ae] = b(x.image[ae], !1, !0, r.maxCubemapSize) : Z[ae] = Ue ? x.image[ae].image : x.image[ae], Z[ae] = Le(x, Z[ae]);
      const He = Z[0], A = p(He) || s, j = a.convert(x.format, x.colorSpace), se = a.convert(x.type), ne = T(x.internalFormat, j, se, x.colorSpace), _e = s && x.isVideoTexture !== !0, Be = J.__version === void 0 || ee === !0;
      let Ve = C(x, He, A);
      k(i.TEXTURE_CUBE_MAP, x, A);
      let Fe;
      if (Te) {
        _e && Be && t.texStorage2D(i.TEXTURE_CUBE_MAP, Ve, ne, He.width, He.height);
        for (let ae = 0; ae < 6; ae++) {
          Fe = Z[ae].mipmaps;
          for (let P = 0; P < Fe.length; P++) {
            const ie = Fe[P];
            x.format !== Ot ? j !== null ? _e ? t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P, 0, 0, ie.width, ie.height, j, ie.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P, ne, ie.width, ie.height, 0, ie.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : _e ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P, 0, 0, ie.width, ie.height, j, se, ie.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P, ne, ie.width, ie.height, 0, j, se, ie.data);
          }
        }
      } else {
        Fe = x.mipmaps, _e && Be && (Fe.length > 0 && Ve++, t.texStorage2D(i.TEXTURE_CUBE_MAP, Ve, ne, Z[0].width, Z[0].height));
        for (let ae = 0; ae < 6; ae++)
          if (Ue) {
            _e ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0, 0, 0, Z[ae].width, Z[ae].height, j, se, Z[ae].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0, ne, Z[ae].width, Z[ae].height, 0, j, se, Z[ae].data);
            for (let P = 0; P < Fe.length; P++) {
              const re = Fe[P].image[ae].image;
              _e ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P + 1, 0, 0, re.width, re.height, j, se, re.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P + 1, ne, re.width, re.height, 0, j, se, re.data);
            }
          } else {
            _e ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0, 0, 0, j, se, Z[ae]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0, ne, j, se, Z[ae]);
            for (let P = 0; P < Fe.length; P++) {
              const ie = Fe[P];
              _e ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P + 1, 0, 0, j, se, ie.image[ae]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, P + 1, ne, j, se, ie.image[ae]);
            }
          }
      }
      v(x, A) && g(i.TEXTURE_CUBE_MAP), J.__version = $.version, x.onUpdate && x.onUpdate(x);
    }
    M.__version = x.version;
  }
  function ge(M, x, F, ee, $, J) {
    const me = a.convert(F.format, F.colorSpace), ce = a.convert(F.type), he = T(F.internalFormat, me, ce, F.colorSpace);
    if (!n.get(x).__hasExternalTextures) {
      const Ue = Math.max(1, x.width >> J), Z = Math.max(1, x.height >> J);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, J, he, Ue, Z, x.depth, 0, me, ce, null) : t.texImage2D($, J, he, Ue, Z, 0, me, ce, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, M), pe(x) ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, ee, $, n.get(F).__webglTexture, 0, Re(x)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, ee, $, n.get(F).__webglTexture, J), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ce(M, x, F) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, M), x.depthBuffer && !x.stencilBuffer) {
      let ee = s === !0 ? i.DEPTH_COMPONENT24 : i.DEPTH_COMPONENT16;
      if (F || pe(x)) {
        const $ = x.depthTexture;
        $ && $.isDepthTexture && ($.type === fn ? ee = i.DEPTH_COMPONENT32F : $.type === dn && (ee = i.DEPTH_COMPONENT24));
        const J = Re(x);
        pe(x) ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, J, ee, x.width, x.height) : i.renderbufferStorageMultisample(i.RENDERBUFFER, J, ee, x.width, x.height);
      } else
        i.renderbufferStorage(i.RENDERBUFFER, ee, x.width, x.height);
      i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, M);
    } else if (x.depthBuffer && x.stencilBuffer) {
      const ee = Re(x);
      F && pe(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ee, i.DEPTH24_STENCIL8, x.width, x.height) : pe(x) ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ee, i.DEPTH24_STENCIL8, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, x.width, x.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, M);
    } else {
      const ee = x.isWebGLMultipleRenderTargets === !0 ? x.texture : [x.texture];
      for (let $ = 0; $ < ee.length; $++) {
        const J = ee[$], me = a.convert(J.format, J.colorSpace), ce = a.convert(J.type), he = T(J.internalFormat, me, ce, J.colorSpace), Te = Re(x);
        F && pe(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Te, he, x.width, x.height) : pe(x) ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Te, he, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, he, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Pe(M, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, M), !(x.depthTexture && x.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(x.depthTexture).__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), V(x.depthTexture, 0);
    const ee = n.get(x.depthTexture).__webglTexture, $ = Re(x);
    if (x.depthTexture.format === En)
      pe(x) ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ee, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ee, 0);
    else if (x.depthTexture.format === Qn)
      pe(x) ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ee, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ee, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ee(M) {
    const x = n.get(M), F = M.isWebGLCubeRenderTarget === !0;
    if (M.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      Pe(x.__webglFramebuffer, M);
    } else if (F) {
      x.__webglDepthbuffer = [];
      for (let ee = 0; ee < 6; ee++)
        t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[ee]), x.__webglDepthbuffer[ee] = i.createRenderbuffer(), Ce(x.__webglDepthbuffer[ee], M, !1);
    } else
      t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer = i.createRenderbuffer(), Ce(x.__webglDepthbuffer, M, !1);
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function ke(M, x, F) {
    const ee = n.get(M);
    x !== void 0 && ge(ee.__webglFramebuffer, M, M.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), F !== void 0 && Ee(M);
  }
  function I(M) {
    const x = M.texture, F = n.get(M), ee = n.get(x);
    M.addEventListener("dispose", H), M.isWebGLMultipleRenderTargets !== !0 && (ee.__webglTexture === void 0 && (ee.__webglTexture = i.createTexture()), ee.__version = x.version, o.memory.textures++);
    const $ = M.isWebGLCubeRenderTarget === !0, J = M.isWebGLMultipleRenderTargets === !0, me = p(M) || s;
    if ($) {
      F.__webglFramebuffer = [];
      for (let ce = 0; ce < 6; ce++)
        if (s && x.mipmaps && x.mipmaps.length > 0) {
          F.__webglFramebuffer[ce] = [];
          for (let he = 0; he < x.mipmaps.length; he++)
            F.__webglFramebuffer[ce][he] = i.createFramebuffer();
        } else
          F.__webglFramebuffer[ce] = i.createFramebuffer();
    } else {
      if (s && x.mipmaps && x.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let ce = 0; ce < x.mipmaps.length; ce++)
          F.__webglFramebuffer[ce] = i.createFramebuffer();
      } else
        F.__webglFramebuffer = i.createFramebuffer();
      if (J)
        if (r.drawBuffers) {
          const ce = M.texture;
          for (let he = 0, Te = ce.length; he < Te; he++) {
            const Ue = n.get(ce[he]);
            Ue.__webglTexture === void 0 && (Ue.__webglTexture = i.createTexture(), o.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (s && M.samples > 0 && pe(M) === !1) {
        const ce = J ? x : [x];
        F.__webglMultisampledFramebuffer = i.createFramebuffer(), F.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let he = 0; he < ce.length; he++) {
          const Te = ce[he];
          F.__webglColorRenderbuffer[he] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, F.__webglColorRenderbuffer[he]);
          const Ue = a.convert(Te.format, Te.colorSpace), Z = a.convert(Te.type), He = T(Te.internalFormat, Ue, Z, Te.colorSpace, M.isXRRenderTarget === !0), A = Re(M);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, A, He, M.width, M.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.RENDERBUFFER, F.__webglColorRenderbuffer[he]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), M.depthBuffer && (F.__webglDepthRenderbuffer = i.createRenderbuffer(), Ce(F.__webglDepthRenderbuffer, M, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if ($) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, ee.__webglTexture), k(i.TEXTURE_CUBE_MAP, x, me);
      for (let ce = 0; ce < 6; ce++)
        if (s && x.mipmaps && x.mipmaps.length > 0)
          for (let he = 0; he < x.mipmaps.length; he++)
            ge(F.__webglFramebuffer[ce][he], M, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ce, he);
        else
          ge(F.__webglFramebuffer[ce], M, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ce, 0);
      v(x, me) && g(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (J) {
      const ce = M.texture;
      for (let he = 0, Te = ce.length; he < Te; he++) {
        const Ue = ce[he], Z = n.get(Ue);
        t.bindTexture(i.TEXTURE_2D, Z.__webglTexture), k(i.TEXTURE_2D, Ue, me), ge(F.__webglFramebuffer, M, Ue, i.COLOR_ATTACHMENT0 + he, i.TEXTURE_2D, 0), v(Ue, me) && g(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ce = i.TEXTURE_2D;
      if ((M.isWebGL3DRenderTarget || M.isWebGLArrayRenderTarget) && (s ? ce = M.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), t.bindTexture(ce, ee.__webglTexture), k(ce, x, me), s && x.mipmaps && x.mipmaps.length > 0)
        for (let he = 0; he < x.mipmaps.length; he++)
          ge(F.__webglFramebuffer[he], M, x, i.COLOR_ATTACHMENT0, ce, he);
      else
        ge(F.__webglFramebuffer, M, x, i.COLOR_ATTACHMENT0, ce, 0);
      v(x, me) && g(ce), t.unbindTexture();
    }
    M.depthBuffer && Ee(M);
  }
  function it(M) {
    const x = p(M) || s, F = M.isWebGLMultipleRenderTargets === !0 ? M.texture : [M.texture];
    for (let ee = 0, $ = F.length; ee < $; ee++) {
      const J = F[ee];
      if (v(J, x)) {
        const me = M.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, ce = n.get(J).__webglTexture;
        t.bindTexture(me, ce), g(me), t.unbindTexture();
      }
    }
  }
  function Se(M) {
    if (s && M.samples > 0 && pe(M) === !1) {
      const x = M.isWebGLMultipleRenderTargets ? M.texture : [M.texture], F = M.width, ee = M.height;
      let $ = i.COLOR_BUFFER_BIT;
      const J = [], me = M.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ce = n.get(M), he = M.isWebGLMultipleRenderTargets === !0;
      if (he)
        for (let Te = 0; Te < x.length; Te++)
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, null, 0);
      t.bindFramebuffer(i.READ_FRAMEBUFFER, ce.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglFramebuffer);
      for (let Te = 0; Te < x.length; Te++) {
        J.push(i.COLOR_ATTACHMENT0 + Te), M.depthBuffer && J.push(me);
        const Ue = ce.__ignoreDepthValues !== void 0 ? ce.__ignoreDepthValues : !1;
        if (Ue === !1 && (M.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), M.stencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), he && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ce.__webglColorRenderbuffer[Te]), Ue === !0 && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [me]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [me])), he) {
          const Z = n.get(x[Te]).__webglTexture;
          i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Z, 0);
        }
        i.blitFramebuffer(0, 0, F, ee, 0, 0, F, ee, $, i.NEAREST), c && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, J);
      }
      if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), he)
        for (let Te = 0; Te < x.length; Te++) {
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, ce.__webglColorRenderbuffer[Te]);
          const Ue = n.get(x[Te]).__webglTexture;
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, Ue, 0);
        }
      t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglMultisampledFramebuffer);
    }
  }
  function Re(M) {
    return Math.min(r.maxSamples, M.samples);
  }
  function pe(M) {
    const x = n.get(M);
    return s && M.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function Ze(M) {
    const x = o.render.frame;
    d.get(M) !== x && (d.set(M, x), M.update());
  }
  function Le(M, x) {
    const F = M.colorSpace, ee = M.format, $ = M.type;
    return M.isCompressedTexture === !0 || M.isVideoTexture === !0 || M.format === Qr || F !== nn && F !== Lt && (Ye.getTransfer(F) === Ke ? s === !1 ? e.has("EXT_sRGB") === !0 && ee === Ot ? (M.format = Qr, M.minFilter = Ct, M.generateMipmaps = !1) : x = Eo.sRGBToLinear(x) : (ee !== Ot || $ !== pn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), x;
  }
  this.allocateTextureUnit = L, this.resetTextureUnits = le, this.setTexture2D = V, this.setTexture2DArray = Y, this.setTexture3D = X, this.setTextureCube = W, this.rebindTextures = ke, this.setupRenderTarget = I, this.updateRenderTargetMipmap = it, this.updateMultisampleRenderTarget = Se, this.setupDepthRenderbuffer = Ee, this.setupFrameBufferTexture = ge, this.useMultisampledRTT = pe;
}
function Jh(i, e, t) {
  const n = t.isWebGL2;
  function r(a, o = Lt) {
    let s;
    const l = Ye.getTransfer(o);
    if (a === pn) return i.UNSIGNED_BYTE;
    if (a === mo) return i.UNSIGNED_SHORT_4_4_4_4;
    if (a === go) return i.UNSIGNED_SHORT_5_5_5_1;
    if (a === Ul) return i.BYTE;
    if (a === Il) return i.SHORT;
    if (a === oa) return i.UNSIGNED_SHORT;
    if (a === po) return i.INT;
    if (a === dn) return i.UNSIGNED_INT;
    if (a === fn) return i.FLOAT;
    if (a === en)
      return n ? i.HALF_FLOAT : (s = e.get("OES_texture_half_float"), s !== null ? s.HALF_FLOAT_OES : null);
    if (a === Nl) return i.ALPHA;
    if (a === Ot) return i.RGBA;
    if (a === Fl) return i.LUMINANCE;
    if (a === Ol) return i.LUMINANCE_ALPHA;
    if (a === En) return i.DEPTH_COMPONENT;
    if (a === Qn) return i.DEPTH_STENCIL;
    if (a === Qr)
      return s = e.get("EXT_sRGB"), s !== null ? s.SRGB_ALPHA_EXT : null;
    if (a === Bl) return i.RED;
    if (a === _o) return i.RED_INTEGER;
    if (a === zl) return i.RG;
    if (a === bo) return i.RG_INTEGER;
    if (a === xo) return i.RGBA_INTEGER;
    if (a === mr || a === gr || a === _r || a === br)
      if (l === Ke)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (a === mr) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (a === gr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (a === _r) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (a === br) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (a === mr) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (a === gr) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (a === _r) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (a === br) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (a === Ua || a === Ia || a === Na || a === Fa)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (a === Ua) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (a === Ia) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (a === Na) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (a === Fa) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (a === vo)
      return s = e.get("WEBGL_compressed_texture_etc1"), s !== null ? s.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (a === Oa || a === Ba)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (a === Oa) return l === Ke ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (a === Ba) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (a === za || a === Ga || a === ka || a === Ha || a === Va || a === Wa || a === Xa || a === qa || a === Ya || a === ja || a === Ka || a === Za || a === $a || a === Qa)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (a === za) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (a === Ga) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (a === ka) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (a === Ha) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (a === Va) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (a === Wa) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (a === Xa) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (a === qa) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (a === Ya) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (a === ja) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (a === Ka) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (a === Za) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (a === $a) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (a === Qa) return l === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (a === xr || a === Ja || a === es)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (a === xr) return l === Ke ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (a === Ja) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (a === es) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (a === Gl || a === ts || a === ns || a === is)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (a === xr) return s.COMPRESSED_RED_RGTC1_EXT;
        if (a === ts) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (a === ns) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (a === is) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return a === Mn ? n ? i.UNSIGNED_INT_24_8 : (s = e.get("WEBGL_depth_texture"), s !== null ? s.UNSIGNED_INT_24_8_WEBGL : null) : i[a] !== void 0 ? i[a] : null;
  }
  return { convert: r };
}
class ep extends Pt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class di extends At {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const tp = { type: "move" };
class Vr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new di(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new di(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new D(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new D()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new di(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new D(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new D()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null, a = null, o = null;
    const s = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        o = !0;
        for (const b of e.hand.values()) {
          const p = t.getJointPose(b, n), u = this._getHandJoint(c, b);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const d = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], h = d.position.distanceTo(f.position), m = 0.02, _ = 5e-3;
        c.inputState.pinching && h > m + _ ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && h <= m - _ && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (a = t.getPose(e.gripSpace, n), a !== null && (l.matrix.fromArray(a.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, a.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(a.linearVelocity)) : l.hasLinearVelocity = !1, a.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(a.angularVelocity)) : l.hasAngularVelocity = !1));
      s !== null && (r = t.getPose(e.targetRaySpace, n), r === null && a !== null && (r = a), r !== null && (s.matrix.fromArray(r.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(r.linearVelocity)) : s.hasLinearVelocity = !1, r.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(r.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(tp)));
    }
    return s !== null && (s.visible = r !== null), l !== null && (l.visible = a !== null), c !== null && (c.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new di();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
class np extends Rn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, a = 1, o = null, s = "local-floor", l = 1, c = null, d = null, f = null, h = null, m = null, _ = null;
    const b = t.getContextAttributes();
    let p = null, u = null;
    const v = [], g = [], T = new be();
    let C = null;
    const R = new Pt();
    R.layers.enable(1), R.viewport = new lt();
    const w = new Pt();
    w.layers.enable(2), w.viewport = new lt();
    const H = [R, w], y = new ep();
    y.layers.enable(1), y.layers.enable(2);
    let E = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(k) {
      let K = v[k];
      return K === void 0 && (K = new Vr(), v[k] = K), K.getTargetRaySpace();
    }, this.getControllerGrip = function(k) {
      let K = v[k];
      return K === void 0 && (K = new Vr(), v[k] = K), K.getGripSpace();
    }, this.getHand = function(k) {
      let K = v[k];
      return K === void 0 && (K = new Vr(), v[k] = K), K.getHandSpace();
    };
    function q(k) {
      const K = g.indexOf(k.inputSource);
      if (K === -1)
        return;
      const ue = v[K];
      ue !== void 0 && (ue.update(k.inputSource, k.frame, c || o), ue.dispatchEvent({ type: k.type, data: k.inputSource }));
    }
    function le() {
      r.removeEventListener("select", q), r.removeEventListener("selectstart", q), r.removeEventListener("selectend", q), r.removeEventListener("squeeze", q), r.removeEventListener("squeezestart", q), r.removeEventListener("squeezeend", q), r.removeEventListener("end", le), r.removeEventListener("inputsourceschange", L);
      for (let k = 0; k < v.length; k++) {
        const K = g[k];
        K !== null && (g[k] = null, v[k].disconnect(K));
      }
      E = null, z = null, e.setRenderTarget(p), m = null, h = null, f = null, r = null, u = null, de.stop(), n.isPresenting = !1, e.setPixelRatio(C), e.setSize(T.width, T.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(k) {
      a = k, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(k) {
      s = k, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || o;
    }, this.setReferenceSpace = function(k) {
      c = k;
    }, this.getBaseLayer = function() {
      return h !== null ? h : m;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(k) {
      if (r = k, r !== null) {
        if (p = e.getRenderTarget(), r.addEventListener("select", q), r.addEventListener("selectstart", q), r.addEventListener("selectend", q), r.addEventListener("squeeze", q), r.addEventListener("squeezestart", q), r.addEventListener("squeezeend", q), r.addEventListener("end", le), r.addEventListener("inputsourceschange", L), b.xrCompatible !== !0 && await t.makeXRCompatible(), C = e.getPixelRatio(), e.getSize(T), r.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
          const K = {
            antialias: r.renderState.layers === void 0 ? b.antialias : !0,
            alpha: !0,
            depth: b.depth,
            stencil: b.stencil,
            framebufferScaleFactor: a
          };
          m = new XRWebGLLayer(r, t, K), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), u = new zt(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: Ot,
              type: pn,
              colorSpace: e.outputColorSpace,
              stencilBuffer: b.stencil
            }
          );
        } else {
          let K = null, ue = null, xe = null;
          b.depth && (xe = b.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, K = b.stencil ? Qn : En, ue = b.stencil ? Mn : dn);
          const ge = {
            colorFormat: t.RGBA8,
            depthFormat: xe,
            scaleFactor: a
          };
          f = new XRWebGLBinding(r, t), h = f.createProjectionLayer(ge), r.updateRenderState({ layers: [h] }), e.setPixelRatio(1), e.setSize(h.textureWidth, h.textureHeight, !1), u = new zt(
            h.textureWidth,
            h.textureHeight,
            {
              format: Ot,
              type: pn,
              depthTexture: new Bo(h.textureWidth, h.textureHeight, ue, void 0, void 0, void 0, void 0, void 0, void 0, K),
              stencilBuffer: b.stencil,
              colorSpace: e.outputColorSpace,
              samples: b.antialias ? 4 : 0
            }
          );
          const Ce = e.properties.get(u);
          Ce.__ignoreDepthValues = h.ignoreDepthValues;
        }
        u.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await r.requestReferenceSpace(s), de.setContext(r), de.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    };
    function L(k) {
      for (let K = 0; K < k.removed.length; K++) {
        const ue = k.removed[K], xe = g.indexOf(ue);
        xe >= 0 && (g[xe] = null, v[xe].disconnect(ue));
      }
      for (let K = 0; K < k.added.length; K++) {
        const ue = k.added[K];
        let xe = g.indexOf(ue);
        if (xe === -1) {
          for (let Ce = 0; Ce < v.length; Ce++)
            if (Ce >= g.length) {
              g.push(ue), xe = Ce;
              break;
            } else if (g[Ce] === null) {
              g[Ce] = ue, xe = Ce;
              break;
            }
          if (xe === -1) break;
        }
        const ge = v[xe];
        ge && ge.connect(ue);
      }
    }
    const N = new D(), V = new D();
    function Y(k, K, ue) {
      N.setFromMatrixPosition(K.matrixWorld), V.setFromMatrixPosition(ue.matrixWorld);
      const xe = N.distanceTo(V), ge = K.projectionMatrix.elements, Ce = ue.projectionMatrix.elements, Pe = ge[14] / (ge[10] - 1), Ee = ge[14] / (ge[10] + 1), ke = (ge[9] + 1) / ge[5], I = (ge[9] - 1) / ge[5], it = (ge[8] - 1) / ge[0], Se = (Ce[8] + 1) / Ce[0], Re = Pe * it, pe = Pe * Se, Ze = xe / (-it + Se), Le = Ze * -it;
      K.matrixWorld.decompose(k.position, k.quaternion, k.scale), k.translateX(Le), k.translateZ(Ze), k.matrixWorld.compose(k.position, k.quaternion, k.scale), k.matrixWorldInverse.copy(k.matrixWorld).invert();
      const M = Pe + Ze, x = Ee + Ze, F = Re - Le, ee = pe + (xe - Le), $ = ke * Ee / x * M, J = I * Ee / x * M;
      k.projectionMatrix.makePerspective(F, ee, $, J, M, x), k.projectionMatrixInverse.copy(k.projectionMatrix).invert();
    }
    function X(k, K) {
      K === null ? k.matrixWorld.copy(k.matrix) : k.matrixWorld.multiplyMatrices(K.matrixWorld, k.matrix), k.matrixWorldInverse.copy(k.matrixWorld).invert();
    }
    this.updateCamera = function(k) {
      if (r === null) return;
      y.near = w.near = R.near = k.near, y.far = w.far = R.far = k.far, (E !== y.near || z !== y.far) && (r.updateRenderState({
        depthNear: y.near,
        depthFar: y.far
      }), E = y.near, z = y.far);
      const K = k.parent, ue = y.cameras;
      X(y, K);
      for (let xe = 0; xe < ue.length; xe++)
        X(ue[xe], K);
      ue.length === 2 ? Y(y, R, w) : y.projectionMatrix.copy(R.projectionMatrix), W(k, y, K);
    };
    function W(k, K, ue) {
      ue === null ? k.matrix.copy(K.matrixWorld) : (k.matrix.copy(ue.matrixWorld), k.matrix.invert(), k.matrix.multiply(K.matrixWorld)), k.matrix.decompose(k.position, k.quaternion, k.scale), k.updateMatrixWorld(!0), k.projectionMatrix.copy(K.projectionMatrix), k.projectionMatrixInverse.copy(K.projectionMatrixInverse), k.isPerspectiveCamera && (k.fov = Jr * 2 * Math.atan(1 / k.projectionMatrix.elements[5]), k.zoom = 1);
    }
    this.getCamera = function() {
      return y;
    }, this.getFoveation = function() {
      if (!(h === null && m === null))
        return l;
    }, this.setFoveation = function(k) {
      l = k, h !== null && (h.fixedFoveation = k), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = k);
    };
    let Q = null;
    function te(k, K) {
      if (d = K.getViewerPose(c || o), _ = K, d !== null) {
        const ue = d.views;
        m !== null && (e.setRenderTargetFramebuffer(u, m.framebuffer), e.setRenderTarget(u));
        let xe = !1;
        ue.length !== y.cameras.length && (y.cameras.length = 0, xe = !0);
        for (let ge = 0; ge < ue.length; ge++) {
          const Ce = ue[ge];
          let Pe = null;
          if (m !== null)
            Pe = m.getViewport(Ce);
          else {
            const ke = f.getViewSubImage(h, Ce);
            Pe = ke.viewport, ge === 0 && (e.setRenderTargetTextures(
              u,
              ke.colorTexture,
              h.ignoreDepthValues ? void 0 : ke.depthStencilTexture
            ), e.setRenderTarget(u));
          }
          let Ee = H[ge];
          Ee === void 0 && (Ee = new Pt(), Ee.layers.enable(ge), Ee.viewport = new lt(), H[ge] = Ee), Ee.matrix.fromArray(Ce.transform.matrix), Ee.matrix.decompose(Ee.position, Ee.quaternion, Ee.scale), Ee.projectionMatrix.fromArray(Ce.projectionMatrix), Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(), Ee.viewport.set(Pe.x, Pe.y, Pe.width, Pe.height), ge === 0 && (y.matrix.copy(Ee.matrix), y.matrix.decompose(y.position, y.quaternion, y.scale)), xe === !0 && y.cameras.push(Ee);
        }
      }
      for (let ue = 0; ue < v.length; ue++) {
        const xe = g[ue], ge = v[ue];
        xe !== null && ge !== void 0 && ge.update(xe, K, c || o);
      }
      Q && Q(k, K), K.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: K }), _ = null;
    }
    const de = new Fo();
    de.setAnimationLoop(te), this.setAnimationLoop = function(k) {
      Q = k;
    }, this.dispose = function() {
    };
  }
}
function ip(i, e) {
  function t(p, u) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, Do(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, v, g, T) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? a(p, u) : u.isMeshToonMaterial ? (a(p, u), f(p, u)) : u.isMeshPhongMaterial ? (a(p, u), d(p, u)) : u.isMeshStandardMaterial ? (a(p, u), h(p, u), u.isMeshPhysicalMaterial && m(p, u, T)) : u.isMeshMatcapMaterial ? (a(p, u), _(p, u)) : u.isMeshDepthMaterial ? a(p, u) : u.isMeshDistanceMaterial ? (a(p, u), b(p, u)) : u.isMeshNormalMaterial ? a(p, u) : u.isLineBasicMaterial ? (o(p, u), u.isLineDashedMaterial && s(p, u)) : u.isPointsMaterial ? l(p, u, v, g) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function a(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, t(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === yt && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, t(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === yt && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, t(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, t(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const v = e.get(u).envMap;
    if (v && (p.envMap.value = v, p.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap) {
      p.lightMap.value = u.lightMap;
      const g = i._useLegacyLights === !0 ? Math.PI : 1;
      p.lightMapIntensity.value = u.lightMapIntensity * g, t(u.lightMap, p.lightMapTransform);
    }
    u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, p.aoMapTransform));
  }
  function o(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, t(u.map, p.mapTransform));
  }
  function s(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, v, g) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * v, p.scale.value = g * 0.5, u.map && (p.map.value = u.map, t(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function d(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function h(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, p.roughnessMapTransform)), e.get(u).envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, v) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === yt && p.clearcoatNormalScale.value.negate())), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = v.texture, p.transmissionSamplerSize.value.set(v.width, v.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function _(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function b(p, u) {
    const v = e.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(v.matrixWorld), p.nearDistance.value = v.shadow.camera.near, p.farDistance.value = v.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function rp(i, e, t, n) {
  let r = {}, a = {}, o = [];
  const s = t.isWebGL2 ? i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function l(v, g) {
    const T = g.program;
    n.uniformBlockBinding(v, T);
  }
  function c(v, g) {
    let T = r[v.id];
    T === void 0 && (_(v), T = d(v), r[v.id] = T, v.addEventListener("dispose", p));
    const C = g.program;
    n.updateUBOMapping(v, C);
    const R = e.render.frame;
    a[v.id] !== R && (h(v), a[v.id] = R);
  }
  function d(v) {
    const g = f();
    v.__bindingPointIndex = g;
    const T = i.createBuffer(), C = v.__size, R = v.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, T), i.bufferData(i.UNIFORM_BUFFER, C, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, g, T), T;
  }
  function f() {
    for (let v = 0; v < s; v++)
      if (o.indexOf(v) === -1)
        return o.push(v), v;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(v) {
    const g = r[v.id], T = v.uniforms, C = v.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, g);
    for (let R = 0, w = T.length; R < w; R++) {
      const H = Array.isArray(T[R]) ? T[R] : [T[R]];
      for (let y = 0, E = H.length; y < E; y++) {
        const z = H[y];
        if (m(z, R, y, C) === !0) {
          const q = z.__offset, le = Array.isArray(z.value) ? z.value : [z.value];
          let L = 0;
          for (let N = 0; N < le.length; N++) {
            const V = le[N], Y = b(V);
            typeof V == "number" || typeof V == "boolean" ? (z.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, q + L, z.__data)) : V.isMatrix3 ? (z.__data[0] = V.elements[0], z.__data[1] = V.elements[1], z.__data[2] = V.elements[2], z.__data[3] = 0, z.__data[4] = V.elements[3], z.__data[5] = V.elements[4], z.__data[6] = V.elements[5], z.__data[7] = 0, z.__data[8] = V.elements[6], z.__data[9] = V.elements[7], z.__data[10] = V.elements[8], z.__data[11] = 0) : (V.toArray(z.__data, L), L += Y.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, q, z.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(v, g, T, C) {
    const R = v.value, w = g + "_" + T;
    if (C[w] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? C[w] = R : C[w] = R.clone(), !0;
    {
      const H = C[w];
      if (typeof R == "number" || typeof R == "boolean") {
        if (H !== R)
          return C[w] = R, !0;
      } else if (H.equals(R) === !1)
        return H.copy(R), !0;
    }
    return !1;
  }
  function _(v) {
    const g = v.uniforms;
    let T = 0;
    const C = 16;
    for (let w = 0, H = g.length; w < H; w++) {
      const y = Array.isArray(g[w]) ? g[w] : [g[w]];
      for (let E = 0, z = y.length; E < z; E++) {
        const q = y[E], le = Array.isArray(q.value) ? q.value : [q.value];
        for (let L = 0, N = le.length; L < N; L++) {
          const V = le[L], Y = b(V), X = T % C;
          X !== 0 && C - X < Y.boundary && (T += C - X), q.__data = new Float32Array(Y.storage / Float32Array.BYTES_PER_ELEMENT), q.__offset = T, T += Y.storage;
        }
      }
    }
    const R = T % C;
    return R > 0 && (T += C - R), v.__size = T, v.__cache = {}, this;
  }
  function b(v) {
    const g = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof v == "number" || typeof v == "boolean" ? (g.boundary = 4, g.storage = 4) : v.isVector2 ? (g.boundary = 8, g.storage = 8) : v.isVector3 || v.isColor ? (g.boundary = 16, g.storage = 12) : v.isVector4 ? (g.boundary = 16, g.storage = 16) : v.isMatrix3 ? (g.boundary = 48, g.storage = 48) : v.isMatrix4 ? (g.boundary = 64, g.storage = 64) : v.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", v), g;
  }
  function p(v) {
    const g = v.target;
    g.removeEventListener("dispose", p);
    const T = o.indexOf(g.__bindingPointIndex);
    o.splice(T, 1), i.deleteBuffer(r[g.id]), delete r[g.id], delete a[g.id];
  }
  function u() {
    for (const v in r)
      i.deleteBuffer(r[v]);
    o = [], r = {}, a = {};
  }
  return {
    bind: l,
    update: c,
    dispose: u
  };
}
class Wo {
  constructor(e = {}) {
    const {
      canvas: t = ec(),
      context: n = null,
      depth: r = !0,
      stencil: a = !0,
      alpha: o = !1,
      antialias: s = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: d = "default",
      failIfMajorPerformanceCaveat: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let h;
    n !== null ? h = n.getContextAttributes().alpha : h = o;
    const m = new Uint32Array(4), _ = new Int32Array(4);
    let b = null, p = null;
    const u = [], v = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = ot, this._useLegacyLights = !1, this.toneMapping = hn, this.toneMappingExposure = 1;
    const g = this;
    let T = !1, C = 0, R = 0, w = null, H = -1, y = null;
    const E = new lt(), z = new lt();
    let q = null;
    const le = new We(0);
    let L = 0, N = t.width, V = t.height, Y = 1, X = null, W = null;
    const Q = new lt(0, 0, N, V), te = new lt(0, 0, N, V);
    let de = !1;
    const k = new No();
    let K = !1, ue = !1, xe = null;
    const ge = new ct(), Ce = new be(), Pe = new D(), Ee = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function ke() {
      return w === null ? Y : 1;
    }
    let I = n;
    function it(S, U) {
      for (let B = 0; B < S.length; B++) {
        const G = S[B], O = t.getContext(G, U);
        if (O !== null) return O;
      }
      return null;
    }
    try {
      const S = {
        alpha: !0,
        depth: r,
        stencil: a,
        antialias: s,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: d,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${aa}`), t.addEventListener("webglcontextlost", ae, !1), t.addEventListener("webglcontextrestored", P, !1), t.addEventListener("webglcontextcreationerror", ie, !1), I === null) {
        const U = ["webgl2", "webgl", "experimental-webgl"];
        if (g.isWebGL1Renderer === !0 && U.shift(), I = it(U, S), I === null)
          throw it(U) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && I instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), I.getShaderPrecisionFormat === void 0 && (I.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (S) {
      throw console.error("THREE.WebGLRenderer: " + S.message), S;
    }
    let Se, Re, pe, Ze, Le, M, x, F, ee, $, J, me, ce, he, Te, Ue, Z, He, A, j, se, ne, _e, Be;
    function Ve() {
      Se = new pf(I), Re = new lf(I, Se, e), Se.init(Re), ne = new Jh(I, Se, Re), pe = new $h(I, Se, Re), Ze = new _f(I), Le = new Oh(), M = new Qh(I, Se, pe, Le, Re, ne, Ze), x = new uf(g), F = new hf(g), ee = new Ec(I, Re), _e = new sf(I, Se, ee, Re), $ = new mf(I, ee, Ze, _e), J = new yf(I, $, ee, Ze), A = new vf(I, Re, M), Ue = new cf(Le), me = new Fh(g, x, F, Se, Re, _e, Ue), ce = new ip(g, Le), he = new zh(), Te = new Xh(Se, Re), He = new af(g, x, F, pe, J, h, l), Z = new Zh(g, J, Re), Be = new rp(I, Ze, Re, pe), j = new of(I, Se, Ze, Re), se = new gf(I, Se, Ze, Re), Ze.programs = me.programs, g.capabilities = Re, g.extensions = Se, g.properties = Le, g.renderLists = he, g.shadowMap = Z, g.state = pe, g.info = Ze;
    }
    Ve();
    const Fe = new np(g, I);
    this.xr = Fe, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const S = Se.get("WEBGL_lose_context");
      S && S.loseContext();
    }, this.forceContextRestore = function() {
      const S = Se.get("WEBGL_lose_context");
      S && S.restoreContext();
    }, this.getPixelRatio = function() {
      return Y;
    }, this.setPixelRatio = function(S) {
      S !== void 0 && (Y = S, this.setSize(N, V, !1));
    }, this.getSize = function(S) {
      return S.set(N, V);
    }, this.setSize = function(S, U, B = !0) {
      if (Fe.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      N = S, V = U, t.width = Math.floor(S * Y), t.height = Math.floor(U * Y), B === !0 && (t.style.width = S + "px", t.style.height = U + "px"), this.setViewport(0, 0, S, U);
    }, this.getDrawingBufferSize = function(S) {
      return S.set(N * Y, V * Y).floor();
    }, this.setDrawingBufferSize = function(S, U, B) {
      N = S, V = U, Y = B, t.width = Math.floor(S * B), t.height = Math.floor(U * B), this.setViewport(0, 0, S, U);
    }, this.getCurrentViewport = function(S) {
      return S.copy(E);
    }, this.getViewport = function(S) {
      return S.copy(Q);
    }, this.setViewport = function(S, U, B, G) {
      S.isVector4 ? Q.set(S.x, S.y, S.z, S.w) : Q.set(S, U, B, G), pe.viewport(E.copy(Q).multiplyScalar(Y).floor());
    }, this.getScissor = function(S) {
      return S.copy(te);
    }, this.setScissor = function(S, U, B, G) {
      S.isVector4 ? te.set(S.x, S.y, S.z, S.w) : te.set(S, U, B, G), pe.scissor(z.copy(te).multiplyScalar(Y).floor());
    }, this.getScissorTest = function() {
      return de;
    }, this.setScissorTest = function(S) {
      pe.setScissorTest(de = S);
    }, this.setOpaqueSort = function(S) {
      X = S;
    }, this.setTransparentSort = function(S) {
      W = S;
    }, this.getClearColor = function(S) {
      return S.copy(He.getClearColor());
    }, this.setClearColor = function() {
      He.setClearColor.apply(He, arguments);
    }, this.getClearAlpha = function() {
      return He.getClearAlpha();
    }, this.setClearAlpha = function() {
      He.setClearAlpha.apply(He, arguments);
    }, this.clear = function(S = !0, U = !0, B = !0) {
      let G = 0;
      if (S) {
        let O = !1;
        if (w !== null) {
          const fe = w.texture.format;
          O = fe === xo || fe === bo || fe === _o;
        }
        if (O) {
          const fe = w.texture.type, ye = fe === pn || fe === dn || fe === oa || fe === Mn || fe === mo || fe === go, Ae = He.getClearColor(), we = He.getClearAlpha(), Oe = Ae.r, De = Ae.g, Ie = Ae.b;
          ye ? (m[0] = Oe, m[1] = De, m[2] = Ie, m[3] = we, I.clearBufferuiv(I.COLOR, 0, m)) : (_[0] = Oe, _[1] = De, _[2] = Ie, _[3] = we, I.clearBufferiv(I.COLOR, 0, _));
        } else
          G |= I.COLOR_BUFFER_BIT;
      }
      U && (G |= I.DEPTH_BUFFER_BIT), B && (G |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), I.clear(G);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", ae, !1), t.removeEventListener("webglcontextrestored", P, !1), t.removeEventListener("webglcontextcreationerror", ie, !1), he.dispose(), Te.dispose(), Le.dispose(), x.dispose(), F.dispose(), J.dispose(), _e.dispose(), Be.dispose(), me.dispose(), Fe.dispose(), Fe.removeEventListener("sessionstart", pt), Fe.removeEventListener("sessionend", je), xe && (xe.dispose(), xe = null), mt.stop();
    };
    function ae(S) {
      S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), T = !0;
    }
    function P() {
      console.log("THREE.WebGLRenderer: Context Restored."), T = !1;
      const S = Ze.autoReset, U = Z.enabled, B = Z.autoUpdate, G = Z.needsUpdate, O = Z.type;
      Ve(), Ze.autoReset = S, Z.enabled = U, Z.autoUpdate = B, Z.needsUpdate = G, Z.type = O;
    }
    function ie(S) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage);
    }
    function re(S) {
      const U = S.target;
      U.removeEventListener("dispose", re), Me(U);
    }
    function Me(S) {
      ve(S), Le.remove(S);
    }
    function ve(S) {
      const U = Le.get(S).programs;
      U !== void 0 && (U.forEach(function(B) {
        me.releaseProgram(B);
      }), S.isShaderMaterial && me.releaseShaderCache(S));
    }
    this.renderBufferDirect = function(S, U, B, G, O, fe) {
      U === null && (U = Ee);
      const ye = O.isMesh && O.matrixWorld.determinant() < 0, Ae = nl(S, U, B, G, O);
      pe.setMaterial(G, ye);
      let we = B.index, Oe = 1;
      if (G.wireframe === !0) {
        if (we = $.getWireframeAttribute(B), we === void 0) return;
        Oe = 2;
      }
      const De = B.drawRange, Ie = B.attributes.position;
      let Je = De.start * Oe, St = (De.start + De.count) * Oe;
      fe !== null && (Je = Math.max(Je, fe.start * Oe), St = Math.min(St, (fe.start + fe.count) * Oe)), we !== null ? (Je = Math.max(Je, 0), St = Math.min(St, we.count)) : Ie != null && (Je = Math.max(Je, 0), St = Math.min(St, Ie.count));
      const at = St - Je;
      if (at < 0 || at === 1 / 0) return;
      _e.setup(O, G, Ae, B, we);
      let Wt, $e = j;
      if (we !== null && (Wt = ee.get(we), $e = se, $e.setIndex(Wt)), O.isMesh)
        G.wireframe === !0 ? (pe.setLineWidth(G.wireframeLinewidth * ke()), $e.setMode(I.LINES)) : $e.setMode(I.TRIANGLES);
      else if (O.isLine) {
        let ze = G.linewidth;
        ze === void 0 && (ze = 1), pe.setLineWidth(ze * ke()), O.isLineSegments ? $e.setMode(I.LINES) : O.isLineLoop ? $e.setMode(I.LINE_LOOP) : $e.setMode(I.LINE_STRIP);
      } else O.isPoints ? $e.setMode(I.POINTS) : O.isSprite && $e.setMode(I.TRIANGLES);
      if (O.isBatchedMesh)
        $e.renderMultiDraw(O._multiDrawStarts, O._multiDrawCounts, O._multiDrawCount);
      else if (O.isInstancedMesh)
        $e.renderInstances(Je, at, O.count);
      else if (B.isInstancedBufferGeometry) {
        const ze = B._maxInstanceCount !== void 0 ? B._maxInstanceCount : 1 / 0, ur = Math.min(B.instanceCount, ze);
        $e.renderInstances(Je, at, ur);
      } else
        $e.render(Je, at);
    };
    function Xe(S, U, B) {
      S.transparent === !0 && S.side === $t && S.forceSinglePass === !1 ? (S.side = yt, S.needsUpdate = !0, yi(S, U, B), S.side = tn, S.needsUpdate = !0, yi(S, U, B), S.side = $t) : yi(S, U, B);
    }
    this.compile = function(S, U, B = null) {
      B === null && (B = S), p = Te.get(B), p.init(), v.push(p), B.traverseVisible(function(O) {
        O.isLight && O.layers.test(U.layers) && (p.pushLight(O), O.castShadow && p.pushShadow(O));
      }), S !== B && S.traverseVisible(function(O) {
        O.isLight && O.layers.test(U.layers) && (p.pushLight(O), O.castShadow && p.pushShadow(O));
      }), p.setupLights(g._useLegacyLights);
      const G = /* @__PURE__ */ new Set();
      return S.traverse(function(O) {
        const fe = O.material;
        if (fe)
          if (Array.isArray(fe))
            for (let ye = 0; ye < fe.length; ye++) {
              const Ae = fe[ye];
              Xe(Ae, B, O), G.add(Ae);
            }
          else
            Xe(fe, B, O), G.add(fe);
      }), v.pop(), p = null, G;
    }, this.compileAsync = function(S, U, B = null) {
      const G = this.compile(S, U, B);
      return new Promise((O) => {
        function fe() {
          if (G.forEach(function(ye) {
            Le.get(ye).currentProgram.isReady() && G.delete(ye);
          }), G.size === 0) {
            O(S);
            return;
          }
          setTimeout(fe, 10);
        }
        Se.get("KHR_parallel_shader_compile") !== null ? fe() : setTimeout(fe, 10);
      });
    };
    let qe = null;
    function rt(S) {
      qe && qe(S);
    }
    function pt() {
      mt.stop();
    }
    function je() {
      mt.start();
    }
    const mt = new Fo();
    mt.setAnimationLoop(rt), typeof self < "u" && mt.setContext(self), this.setAnimationLoop = function(S) {
      qe = S, Fe.setAnimationLoop(S), S === null ? mt.stop() : mt.start();
    }, Fe.addEventListener("sessionstart", pt), Fe.addEventListener("sessionend", je), this.render = function(S, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (T === !0) return;
      S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), Fe.enabled === !0 && Fe.isPresenting === !0 && (Fe.cameraAutoUpdate === !0 && Fe.updateCamera(U), U = Fe.getCamera()), S.isScene === !0 && S.onBeforeRender(g, S, U, w), p = Te.get(S, v.length), p.init(), v.push(p), ge.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), k.setFromProjectionMatrix(ge), ue = this.localClippingEnabled, K = Ue.init(this.clippingPlanes, ue), b = he.get(S, u.length), b.init(), u.push(b), Gt(S, U, 0, g.sortObjects), b.finish(), g.sortObjects === !0 && b.sort(X, W), this.info.render.frame++, K === !0 && Ue.beginShadows();
      const B = p.state.shadowsArray;
      if (Z.render(B, S, U), K === !0 && Ue.endShadows(), this.info.autoReset === !0 && this.info.reset(), He.render(b, S), p.setupLights(g._useLegacyLights), U.isArrayCamera) {
        const G = U.cameras;
        for (let O = 0, fe = G.length; O < fe; O++) {
          const ye = G[O];
          ya(b, S, ye, ye.viewport);
        }
      } else
        ya(b, S, U);
      w !== null && (M.updateMultisampleRenderTarget(w), M.updateRenderTargetMipmap(w)), S.isScene === !0 && S.onAfterRender(g, S, U), _e.resetDefaultState(), H = -1, y = null, v.pop(), v.length > 0 ? p = v[v.length - 1] : p = null, u.pop(), u.length > 0 ? b = u[u.length - 1] : b = null;
    };
    function Gt(S, U, B, G) {
      if (S.visible === !1) return;
      if (S.layers.test(U.layers)) {
        if (S.isGroup)
          B = S.renderOrder;
        else if (S.isLOD)
          S.autoUpdate === !0 && S.update(U);
        else if (S.isLight)
          p.pushLight(S), S.castShadow && p.pushShadow(S);
        else if (S.isSprite) {
          if (!S.frustumCulled || k.intersectsSprite(S)) {
            G && Pe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);
            const ye = J.update(S), Ae = S.material;
            Ae.visible && b.push(S, ye, Ae, B, Pe.z, null);
          }
        } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || k.intersectsObject(S))) {
          const ye = J.update(S), Ae = S.material;
          if (G && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), Pe.copy(S.boundingSphere.center)) : (ye.boundingSphere === null && ye.computeBoundingSphere(), Pe.copy(ye.boundingSphere.center)), Pe.applyMatrix4(S.matrixWorld).applyMatrix4(ge)), Array.isArray(Ae)) {
            const we = ye.groups;
            for (let Oe = 0, De = we.length; Oe < De; Oe++) {
              const Ie = we[Oe], Je = Ae[Ie.materialIndex];
              Je && Je.visible && b.push(S, ye, Je, B, Pe.z, Ie);
            }
          } else Ae.visible && b.push(S, ye, Ae, B, Pe.z, null);
        }
      }
      const fe = S.children;
      for (let ye = 0, Ae = fe.length; ye < Ae; ye++)
        Gt(fe[ye], U, B, G);
    }
    function ya(S, U, B, G) {
      const O = S.opaque, fe = S.transmissive, ye = S.transparent;
      p.setupLightsView(B), K === !0 && Ue.setGlobalState(g.clippingPlanes, B), fe.length > 0 && tl(O, fe, U, B), G && pe.viewport(E.copy(G)), O.length > 0 && vi(O, U, B), fe.length > 0 && vi(fe, U, B), ye.length > 0 && vi(ye, U, B), pe.buffers.depth.setTest(!0), pe.buffers.depth.setMask(!0), pe.buffers.color.setMask(!0), pe.setPolygonOffset(!1);
    }
    function tl(S, U, B, G) {
      if ((B.isScene === !0 ? B.overrideMaterial : null) !== null)
        return;
      const fe = Re.isWebGL2;
      xe === null && (xe = new zt(1, 1, {
        generateMipmaps: !0,
        type: Se.has("EXT_color_buffer_half_float") ? en : pn,
        minFilter: mi,
        samples: fe ? 4 : 0
      })), g.getDrawingBufferSize(Ce), fe ? xe.setSize(Ce.x, Ce.y) : xe.setSize(ea(Ce.x), ea(Ce.y));
      const ye = g.getRenderTarget();
      g.setRenderTarget(xe), g.getClearColor(le), L = g.getClearAlpha(), L < 1 && g.setClearColor(16777215, 0.5), g.clear();
      const Ae = g.toneMapping;
      g.toneMapping = hn, vi(S, B, G), M.updateMultisampleRenderTarget(xe), M.updateRenderTargetMipmap(xe);
      let we = !1;
      for (let Oe = 0, De = U.length; Oe < De; Oe++) {
        const Ie = U[Oe], Je = Ie.object, St = Ie.geometry, at = Ie.material, Wt = Ie.group;
        if (at.side === $t && Je.layers.test(G.layers)) {
          const $e = at.side;
          at.side = yt, at.needsUpdate = !0, Sa(Je, B, G, St, at, Wt), at.side = $e, at.needsUpdate = !0, we = !0;
        }
      }
      we === !0 && (M.updateMultisampleRenderTarget(xe), M.updateRenderTargetMipmap(xe)), g.setRenderTarget(ye), g.setClearColor(le, L), g.toneMapping = Ae;
    }
    function vi(S, U, B) {
      const G = U.isScene === !0 ? U.overrideMaterial : null;
      for (let O = 0, fe = S.length; O < fe; O++) {
        const ye = S[O], Ae = ye.object, we = ye.geometry, Oe = G === null ? ye.material : G, De = ye.group;
        Ae.layers.test(B.layers) && Sa(Ae, U, B, we, Oe, De);
      }
    }
    function Sa(S, U, B, G, O, fe) {
      S.onBeforeRender(g, U, B, G, O, fe), S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), O.onBeforeRender(g, U, B, G, S, fe), O.transparent === !0 && O.side === $t && O.forceSinglePass === !1 ? (O.side = yt, O.needsUpdate = !0, g.renderBufferDirect(B, U, G, O, S, fe), O.side = tn, O.needsUpdate = !0, g.renderBufferDirect(B, U, G, O, S, fe), O.side = $t) : g.renderBufferDirect(B, U, G, O, S, fe), S.onAfterRender(g, U, B, G, O, fe);
    }
    function yi(S, U, B) {
      U.isScene !== !0 && (U = Ee);
      const G = Le.get(S), O = p.state.lights, fe = p.state.shadowsArray, ye = O.state.version, Ae = me.getParameters(S, O.state, fe, U, B), we = me.getProgramCacheKey(Ae);
      let Oe = G.programs;
      G.environment = S.isMeshStandardMaterial ? U.environment : null, G.fog = U.fog, G.envMap = (S.isMeshStandardMaterial ? F : x).get(S.envMap || G.environment), Oe === void 0 && (S.addEventListener("dispose", re), Oe = /* @__PURE__ */ new Map(), G.programs = Oe);
      let De = Oe.get(we);
      if (De !== void 0) {
        if (G.currentProgram === De && G.lightsStateVersion === ye)
          return Ea(S, Ae), De;
      } else
        Ae.uniforms = me.getUniforms(S), S.onBuild(B, Ae, g), S.onBeforeCompile(Ae, g), De = me.acquireProgram(Ae, we), Oe.set(we, De), G.uniforms = Ae.uniforms;
      const Ie = G.uniforms;
      return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (Ie.clippingPlanes = Ue.uniform), Ea(S, Ae), G.needsLights = rl(S), G.lightsStateVersion = ye, G.needsLights && (Ie.ambientLightColor.value = O.state.ambient, Ie.lightProbe.value = O.state.probe, Ie.directionalLights.value = O.state.directional, Ie.directionalLightShadows.value = O.state.directionalShadow, Ie.spotLights.value = O.state.spot, Ie.spotLightShadows.value = O.state.spotShadow, Ie.rectAreaLights.value = O.state.rectArea, Ie.ltc_1.value = O.state.rectAreaLTC1, Ie.ltc_2.value = O.state.rectAreaLTC2, Ie.pointLights.value = O.state.point, Ie.pointLightShadows.value = O.state.pointShadow, Ie.hemisphereLights.value = O.state.hemi, Ie.directionalShadowMap.value = O.state.directionalShadowMap, Ie.directionalShadowMatrix.value = O.state.directionalShadowMatrix, Ie.spotShadowMap.value = O.state.spotShadowMap, Ie.spotLightMatrix.value = O.state.spotLightMatrix, Ie.spotLightMap.value = O.state.spotLightMap, Ie.pointShadowMap.value = O.state.pointShadowMap, Ie.pointShadowMatrix.value = O.state.pointShadowMatrix), G.currentProgram = De, G.uniformsList = null, De;
    }
    function Ma(S) {
      if (S.uniformsList === null) {
        const U = S.currentProgram.getUniforms();
        S.uniformsList = Ki.seqWithValue(U.seq, S.uniforms);
      }
      return S.uniformsList;
    }
    function Ea(S, U) {
      const B = Le.get(S);
      B.outputColorSpace = U.outputColorSpace, B.batching = U.batching, B.instancing = U.instancing, B.instancingColor = U.instancingColor, B.skinning = U.skinning, B.morphTargets = U.morphTargets, B.morphNormals = U.morphNormals, B.morphColors = U.morphColors, B.morphTargetsCount = U.morphTargetsCount, B.numClippingPlanes = U.numClippingPlanes, B.numIntersection = U.numClipIntersection, B.vertexAlphas = U.vertexAlphas, B.vertexTangents = U.vertexTangents, B.toneMapping = U.toneMapping;
    }
    function nl(S, U, B, G, O) {
      U.isScene !== !0 && (U = Ee), M.resetTextureUnits();
      const fe = U.fog, ye = G.isMeshStandardMaterial ? U.environment : null, Ae = w === null ? g.outputColorSpace : w.isXRRenderTarget === !0 ? w.texture.colorSpace : nn, we = (G.isMeshStandardMaterial ? F : x).get(G.envMap || ye), Oe = G.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, De = !!B.attributes.tangent && (!!G.normalMap || G.anisotropy > 0), Ie = !!B.morphAttributes.position, Je = !!B.morphAttributes.normal, St = !!B.morphAttributes.color;
      let at = hn;
      G.toneMapped && (w === null || w.isXRRenderTarget === !0) && (at = g.toneMapping);
      const Wt = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, $e = Wt !== void 0 ? Wt.length : 0, ze = Le.get(G), ur = p.state.lights;
      if (K === !0 && (ue === !0 || S !== y)) {
        const Rt = S === y && G.id === H;
        Ue.setState(G, S, Rt);
      }
      let Qe = !1;
      G.version === ze.__version ? (ze.needsLights && ze.lightsStateVersion !== ur.state.version || ze.outputColorSpace !== Ae || O.isBatchedMesh && ze.batching === !1 || !O.isBatchedMesh && ze.batching === !0 || O.isInstancedMesh && ze.instancing === !1 || !O.isInstancedMesh && ze.instancing === !0 || O.isSkinnedMesh && ze.skinning === !1 || !O.isSkinnedMesh && ze.skinning === !0 || O.isInstancedMesh && ze.instancingColor === !0 && O.instanceColor === null || O.isInstancedMesh && ze.instancingColor === !1 && O.instanceColor !== null || ze.envMap !== we || G.fog === !0 && ze.fog !== fe || ze.numClippingPlanes !== void 0 && (ze.numClippingPlanes !== Ue.numPlanes || ze.numIntersection !== Ue.numIntersection) || ze.vertexAlphas !== Oe || ze.vertexTangents !== De || ze.morphTargets !== Ie || ze.morphNormals !== Je || ze.morphColors !== St || ze.toneMapping !== at || Re.isWebGL2 === !0 && ze.morphTargetsCount !== $e) && (Qe = !0) : (Qe = !0, ze.__version = G.version);
      let mn = ze.currentProgram;
      Qe === !0 && (mn = yi(G, U, O));
      let Ta = !1, ri = !1, dr = !1;
      const ut = mn.getUniforms(), gn = ze.uniforms;
      if (pe.useProgram(mn.program) && (Ta = !0, ri = !0, dr = !0), G.id !== H && (H = G.id, ri = !0), Ta || y !== S) {
        ut.setValue(I, "projectionMatrix", S.projectionMatrix), ut.setValue(I, "viewMatrix", S.matrixWorldInverse);
        const Rt = ut.map.cameraPosition;
        Rt !== void 0 && Rt.setValue(I, Pe.setFromMatrixPosition(S.matrixWorld)), Re.logarithmicDepthBuffer && ut.setValue(
          I,
          "logDepthBufFC",
          2 / (Math.log(S.far + 1) / Math.LN2)
        ), (G.isMeshPhongMaterial || G.isMeshToonMaterial || G.isMeshLambertMaterial || G.isMeshBasicMaterial || G.isMeshStandardMaterial || G.isShaderMaterial) && ut.setValue(I, "isOrthographic", S.isOrthographicCamera === !0), y !== S && (y = S, ri = !0, dr = !0);
      }
      if (O.isSkinnedMesh) {
        ut.setOptional(I, O, "bindMatrix"), ut.setOptional(I, O, "bindMatrixInverse");
        const Rt = O.skeleton;
        Rt && (Re.floatVertexTextures ? (Rt.boneTexture === null && Rt.computeBoneTexture(), ut.setValue(I, "boneTexture", Rt.boneTexture, M)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      O.isBatchedMesh && (ut.setOptional(I, O, "batchingTexture"), ut.setValue(I, "batchingTexture", O._matricesTexture, M));
      const fr = B.morphAttributes;
      if ((fr.position !== void 0 || fr.normal !== void 0 || fr.color !== void 0 && Re.isWebGL2 === !0) && A.update(O, B, mn), (ri || ze.receiveShadow !== O.receiveShadow) && (ze.receiveShadow = O.receiveShadow, ut.setValue(I, "receiveShadow", O.receiveShadow)), G.isMeshGouraudMaterial && G.envMap !== null && (gn.envMap.value = we, gn.flipEnvMap.value = we.isCubeTexture && we.isRenderTargetTexture === !1 ? -1 : 1), ri && (ut.setValue(I, "toneMappingExposure", g.toneMappingExposure), ze.needsLights && il(gn, dr), fe && G.fog === !0 && ce.refreshFogUniforms(gn, fe), ce.refreshMaterialUniforms(gn, G, Y, V, xe), Ki.upload(I, Ma(ze), gn, M)), G.isShaderMaterial && G.uniformsNeedUpdate === !0 && (Ki.upload(I, Ma(ze), gn, M), G.uniformsNeedUpdate = !1), G.isSpriteMaterial && ut.setValue(I, "center", O.center), ut.setValue(I, "modelViewMatrix", O.modelViewMatrix), ut.setValue(I, "normalMatrix", O.normalMatrix), ut.setValue(I, "modelMatrix", O.matrixWorld), G.isShaderMaterial || G.isRawShaderMaterial) {
        const Rt = G.uniformsGroups;
        for (let hr = 0, al = Rt.length; hr < al; hr++)
          if (Re.isWebGL2) {
            const Aa = Rt[hr];
            Be.update(Aa, mn), Be.bind(Aa, mn);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return mn;
    }
    function il(S, U) {
      S.ambientLightColor.needsUpdate = U, S.lightProbe.needsUpdate = U, S.directionalLights.needsUpdate = U, S.directionalLightShadows.needsUpdate = U, S.pointLights.needsUpdate = U, S.pointLightShadows.needsUpdate = U, S.spotLights.needsUpdate = U, S.spotLightShadows.needsUpdate = U, S.rectAreaLights.needsUpdate = U, S.hemisphereLights.needsUpdate = U;
    }
    function rl(S) {
      return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return C;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return w;
    }, this.setRenderTargetTextures = function(S, U, B) {
      Le.get(S.texture).__webglTexture = U, Le.get(S.depthTexture).__webglTexture = B;
      const G = Le.get(S);
      G.__hasExternalTextures = !0, G.__hasExternalTextures && (G.__autoAllocateDepthBuffer = B === void 0, G.__autoAllocateDepthBuffer || Se.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), G.__useRenderToTexture = !1));
    }, this.setRenderTargetFramebuffer = function(S, U) {
      const B = Le.get(S);
      B.__webglFramebuffer = U, B.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(S, U = 0, B = 0) {
      w = S, C = U, R = B;
      let G = !0, O = null, fe = !1, ye = !1;
      if (S) {
        const we = Le.get(S);
        we.__useDefaultFramebuffer !== void 0 ? (pe.bindFramebuffer(I.FRAMEBUFFER, null), G = !1) : we.__webglFramebuffer === void 0 ? M.setupRenderTarget(S) : we.__hasExternalTextures && M.rebindTextures(S, Le.get(S.texture).__webglTexture, Le.get(S.depthTexture).__webglTexture);
        const Oe = S.texture;
        (Oe.isData3DTexture || Oe.isDataArrayTexture || Oe.isCompressedArrayTexture) && (ye = !0);
        const De = Le.get(S).__webglFramebuffer;
        S.isWebGLCubeRenderTarget ? (Array.isArray(De[U]) ? O = De[U][B] : O = De[U], fe = !0) : Re.isWebGL2 && S.samples > 0 && M.useMultisampledRTT(S) === !1 ? O = Le.get(S).__webglMultisampledFramebuffer : Array.isArray(De) ? O = De[B] : O = De, E.copy(S.viewport), z.copy(S.scissor), q = S.scissorTest;
      } else
        E.copy(Q).multiplyScalar(Y).floor(), z.copy(te).multiplyScalar(Y).floor(), q = de;
      if (pe.bindFramebuffer(I.FRAMEBUFFER, O) && Re.drawBuffers && G && pe.drawBuffers(S, O), pe.viewport(E), pe.scissor(z), pe.setScissorTest(q), fe) {
        const we = Le.get(S.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + U, we.__webglTexture, B);
      } else if (ye) {
        const we = Le.get(S.texture), Oe = U || 0;
        I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, we.__webglTexture, B || 0, Oe);
      }
      H = -1;
    }, this.readRenderTargetPixels = function(S, U, B, G, O, fe, ye) {
      if (!(S && S.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Ae = Le.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && ye !== void 0 && (Ae = Ae[ye]), Ae) {
        pe.bindFramebuffer(I.FRAMEBUFFER, Ae);
        try {
          const we = S.texture, Oe = we.format, De = we.type;
          if (Oe !== Ot && ne.convert(Oe) !== I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const Ie = De === en && (Se.has("EXT_color_buffer_half_float") || Re.isWebGL2 && Se.has("EXT_color_buffer_float"));
          if (De !== pn && ne.convert(De) !== I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
          !(De === fn && (Re.isWebGL2 || Se.has("OES_texture_float") || Se.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !Ie) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= S.width - G && B >= 0 && B <= S.height - O && I.readPixels(U, B, G, O, ne.convert(Oe), ne.convert(De), fe);
        } finally {
          const we = w !== null ? Le.get(w).__webglFramebuffer : null;
          pe.bindFramebuffer(I.FRAMEBUFFER, we);
        }
      }
    }, this.copyFramebufferToTexture = function(S, U, B = 0) {
      const G = Math.pow(2, -B), O = Math.floor(U.image.width * G), fe = Math.floor(U.image.height * G);
      M.setTexture2D(U, 0), I.copyTexSubImage2D(I.TEXTURE_2D, B, 0, 0, S.x, S.y, O, fe), pe.unbindTexture();
    }, this.copyTextureToTexture = function(S, U, B, G = 0) {
      const O = U.image.width, fe = U.image.height, ye = ne.convert(B.format), Ae = ne.convert(B.type);
      M.setTexture2D(B, 0), I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, B.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, B.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, B.unpackAlignment), U.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, G, S.x, S.y, O, fe, ye, Ae, U.image.data) : U.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, G, S.x, S.y, U.mipmaps[0].width, U.mipmaps[0].height, ye, U.mipmaps[0].data) : I.texSubImage2D(I.TEXTURE_2D, G, S.x, S.y, ye, Ae, U.image), G === 0 && B.generateMipmaps && I.generateMipmap(I.TEXTURE_2D), pe.unbindTexture();
    }, this.copyTextureToTexture3D = function(S, U, B, G, O = 0) {
      if (g.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const fe = S.max.x - S.min.x + 1, ye = S.max.y - S.min.y + 1, Ae = S.max.z - S.min.z + 1, we = ne.convert(G.format), Oe = ne.convert(G.type);
      let De;
      if (G.isData3DTexture)
        M.setTexture3D(G, 0), De = I.TEXTURE_3D;
      else if (G.isDataArrayTexture || G.isCompressedArrayTexture)
        M.setTexture2DArray(G, 0), De = I.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, G.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, G.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, G.unpackAlignment);
      const Ie = I.getParameter(I.UNPACK_ROW_LENGTH), Je = I.getParameter(I.UNPACK_IMAGE_HEIGHT), St = I.getParameter(I.UNPACK_SKIP_PIXELS), at = I.getParameter(I.UNPACK_SKIP_ROWS), Wt = I.getParameter(I.UNPACK_SKIP_IMAGES), $e = B.isCompressedTexture ? B.mipmaps[O] : B.image;
      I.pixelStorei(I.UNPACK_ROW_LENGTH, $e.width), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, $e.height), I.pixelStorei(I.UNPACK_SKIP_PIXELS, S.min.x), I.pixelStorei(I.UNPACK_SKIP_ROWS, S.min.y), I.pixelStorei(I.UNPACK_SKIP_IMAGES, S.min.z), B.isDataTexture || B.isData3DTexture ? I.texSubImage3D(De, O, U.x, U.y, U.z, fe, ye, Ae, we, Oe, $e.data) : B.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), I.compressedTexSubImage3D(De, O, U.x, U.y, U.z, fe, ye, Ae, we, $e.data)) : I.texSubImage3D(De, O, U.x, U.y, U.z, fe, ye, Ae, we, Oe, $e), I.pixelStorei(I.UNPACK_ROW_LENGTH, Ie), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, Je), I.pixelStorei(I.UNPACK_SKIP_PIXELS, St), I.pixelStorei(I.UNPACK_SKIP_ROWS, at), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Wt), O === 0 && G.generateMipmaps && I.generateMipmap(De), pe.unbindTexture();
    }, this.initTexture = function(S) {
      S.isCubeTexture ? M.setTextureCube(S, 0) : S.isData3DTexture ? M.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? M.setTexture2DArray(S, 0) : M.setTexture2D(S, 0), pe.unbindTexture();
    }, this.resetState = function() {
      C = 0, R = 0, w = null, pe.reset(), _e.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Qt;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === la ? "display-p3" : "srgb", t.unpackColorSpace = Ye.workingColorSpace === sr ? "display-p3" : "srgb";
  }
  get outputEncoding() {
    return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === ot ? Tn : yo;
  }
  set outputEncoding(e) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = e === Tn ? ot : nn;
  }
  get useLegacyLights() {
    return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
  }
  set useLegacyLights(e) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = e;
  }
}
class ap extends Wo {
}
ap.prototype.isWebGL1Renderer = !0;
class sp extends At {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t;
  }
}
class ha extends Vt {
  constructor(e = [], t = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: e,
      indices: t,
      radius: n,
      detail: r
    };
    const a = [], o = [];
    s(r), c(n), d(), this.setAttribute("position", new xt(a, 3)), this.setAttribute("normal", new xt(a.slice(), 3)), this.setAttribute("uv", new xt(o, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function s(v) {
      const g = new D(), T = new D(), C = new D();
      for (let R = 0; R < t.length; R += 3)
        m(t[R + 0], g), m(t[R + 1], T), m(t[R + 2], C), l(g, T, C, v);
    }
    function l(v, g, T, C) {
      const R = C + 1, w = [];
      for (let H = 0; H <= R; H++) {
        w[H] = [];
        const y = v.clone().lerp(T, H / R), E = g.clone().lerp(T, H / R), z = R - H;
        for (let q = 0; q <= z; q++)
          q === 0 && H === R ? w[H][q] = y : w[H][q] = y.clone().lerp(E, q / z);
      }
      for (let H = 0; H < R; H++)
        for (let y = 0; y < 2 * (R - H) - 1; y++) {
          const E = Math.floor(y / 2);
          y % 2 === 0 ? (h(w[H][E + 1]), h(w[H + 1][E]), h(w[H][E])) : (h(w[H][E + 1]), h(w[H + 1][E + 1]), h(w[H + 1][E]));
        }
    }
    function c(v) {
      const g = new D();
      for (let T = 0; T < a.length; T += 3)
        g.x = a[T + 0], g.y = a[T + 1], g.z = a[T + 2], g.normalize().multiplyScalar(v), a[T + 0] = g.x, a[T + 1] = g.y, a[T + 2] = g.z;
    }
    function d() {
      const v = new D();
      for (let g = 0; g < a.length; g += 3) {
        v.x = a[g + 0], v.y = a[g + 1], v.z = a[g + 2];
        const T = p(v) / 2 / Math.PI + 0.5, C = u(v) / Math.PI + 0.5;
        o.push(T, 1 - C);
      }
      _(), f();
    }
    function f() {
      for (let v = 0; v < o.length; v += 6) {
        const g = o[v + 0], T = o[v + 2], C = o[v + 4], R = Math.max(g, T, C), w = Math.min(g, T, C);
        R > 0.9 && w < 0.1 && (g < 0.2 && (o[v + 0] += 1), T < 0.2 && (o[v + 2] += 1), C < 0.2 && (o[v + 4] += 1));
      }
    }
    function h(v) {
      a.push(v.x, v.y, v.z);
    }
    function m(v, g) {
      const T = v * 3;
      g.x = e[T + 0], g.y = e[T + 1], g.z = e[T + 2];
    }
    function _() {
      const v = new D(), g = new D(), T = new D(), C = new D(), R = new be(), w = new be(), H = new be();
      for (let y = 0, E = 0; y < a.length; y += 9, E += 6) {
        v.set(a[y + 0], a[y + 1], a[y + 2]), g.set(a[y + 3], a[y + 4], a[y + 5]), T.set(a[y + 6], a[y + 7], a[y + 8]), R.set(o[E + 0], o[E + 1]), w.set(o[E + 2], o[E + 3]), H.set(o[E + 4], o[E + 5]), C.copy(v).add(g).add(T).divideScalar(3);
        const z = p(C);
        b(R, E + 0, v, z), b(w, E + 2, g, z), b(H, E + 4, T, z);
      }
    }
    function b(v, g, T, C) {
      C < 0 && v.x === 1 && (o[g] = v.x - 1), T.x === 0 && T.z === 0 && (o[g] = C / 2 / Math.PI + 0.5);
    }
    function p(v) {
      return Math.atan2(v.z, -v.x);
    }
    function u(v) {
      return Math.atan2(-v.y, Math.sqrt(v.x * v.x + v.z * v.z));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ha(e.vertices, e.indices, e.radius, e.details);
  }
}
class pa extends ha {
  constructor(e = 1, t = 0) {
    const n = (1 + Math.sqrt(5)) / 2, r = [
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      0,
      0,
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      n,
      0,
      -1,
      n,
      0,
      1,
      -n,
      0,
      -1,
      -n,
      0,
      1
    ], a = [
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    ];
    super(r, a, e, t), this.type = "IcosahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new pa(e.radius, e.detail);
  }
}
class ma extends Vt {
  constructor(e = 1, t = 32, n = 16, r = 0, a = Math.PI * 2, o = 0, s = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: r,
      phiLength: a,
      thetaStart: o,
      thetaLength: s
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const l = Math.min(o + s, Math.PI);
    let c = 0;
    const d = [], f = new D(), h = new D(), m = [], _ = [], b = [], p = [];
    for (let u = 0; u <= n; u++) {
      const v = [], g = u / n;
      let T = 0;
      u === 0 && o === 0 ? T = 0.5 / t : u === n && l === Math.PI && (T = -0.5 / t);
      for (let C = 0; C <= t; C++) {
        const R = C / t;
        f.x = -e * Math.cos(r + R * a) * Math.sin(o + g * s), f.y = e * Math.cos(o + g * s), f.z = e * Math.sin(r + R * a) * Math.sin(o + g * s), _.push(f.x, f.y, f.z), h.copy(f).normalize(), b.push(h.x, h.y, h.z), p.push(R + T, 1 - g), v.push(c++);
      }
      d.push(v);
    }
    for (let u = 0; u < n; u++)
      for (let v = 0; v < t; v++) {
        const g = d[u][v + 1], T = d[u][v], C = d[u + 1][v], R = d[u + 1][v + 1];
        (u !== 0 || o > 0) && m.push(g, T, R), (u !== n - 1 || l < Math.PI) && m.push(T, C, R);
      }
    this.setIndex(m), this.setAttribute("position", new xt(_, 3)), this.setAttribute("normal", new xt(b, 3)), this.setAttribute("uv", new xt(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ma(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class op extends ht {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class Xo {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = qs(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const t = qs();
      e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e;
    }
    return e;
  }
}
function qs() {
  return (typeof performance > "u" ? Date : performance).now();
}
class Ys {
  constructor(e = 1, t = 0, n = 0) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(bt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: aa
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = aa);
const js = { type: "change" }, Wr = { type: "start" }, Ks = { type: "end" }, Wi = new Ro(), Zs = new cn(), lp = Math.cos(70 * Jl.DEG2RAD);
class cp extends Rn {
  constructor(e, t) {
    super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: wn.ROTATE, MIDDLE: wn.DOLLY, RIGHT: wn.PAN }, this.touches = { ONE: Cn.ROTATE, TWO: Cn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(A) {
      A.addEventListener("keydown", J), this._domElementKeyEvents = A;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", J), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom;
    }, this.reset = function() {
      n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(js), n.update(), a = r.NONE;
    }, this.update = function() {
      const A = new D(), j = new An().setFromUnitVectors(e.up, new D(0, 1, 0)), se = j.clone().invert(), ne = new D(), _e = new An(), Be = new D(), Ve = 2 * Math.PI;
      return function(ae = null) {
        const P = n.object.position;
        A.copy(P).sub(n.target), A.applyQuaternion(j), s.setFromVector3(A), n.autoRotate && a === r.NONE && z(y(ae)), n.enableDamping ? (s.theta += l.theta * n.dampingFactor, s.phi += l.phi * n.dampingFactor) : (s.theta += l.theta, s.phi += l.phi);
        let ie = n.minAzimuthAngle, re = n.maxAzimuthAngle;
        isFinite(ie) && isFinite(re) && (ie < -Math.PI ? ie += Ve : ie > Math.PI && (ie -= Ve), re < -Math.PI ? re += Ve : re > Math.PI && (re -= Ve), ie <= re ? s.theta = Math.max(ie, Math.min(re, s.theta)) : s.theta = s.theta > (ie + re) / 2 ? Math.max(ie, s.theta) : Math.min(re, s.theta)), s.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, s.phi)), s.makeSafe(), n.enableDamping === !0 ? n.target.addScaledVector(d, n.dampingFactor) : n.target.add(d), n.target.sub(n.cursor), n.target.clampLength(n.minTargetRadius, n.maxTargetRadius), n.target.add(n.cursor), n.zoomToCursor && R || n.object.isOrthographicCamera ? s.radius = W(s.radius) : s.radius = W(s.radius * c), A.setFromSpherical(s), A.applyQuaternion(se), P.copy(n.target).add(A), n.object.lookAt(n.target), n.enableDamping === !0 ? (l.theta *= 1 - n.dampingFactor, l.phi *= 1 - n.dampingFactor, d.multiplyScalar(1 - n.dampingFactor)) : (l.set(0, 0, 0), d.set(0, 0, 0));
        let Me = !1;
        if (n.zoomToCursor && R) {
          let ve = null;
          if (n.object.isPerspectiveCamera) {
            const Xe = A.length();
            ve = W(Xe * c);
            const qe = Xe - ve;
            n.object.position.addScaledVector(T, qe), n.object.updateMatrixWorld();
          } else if (n.object.isOrthographicCamera) {
            const Xe = new D(C.x, C.y, 0);
            Xe.unproject(n.object), n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), n.object.updateProjectionMatrix(), Me = !0;
            const qe = new D(C.x, C.y, 0);
            qe.unproject(n.object), n.object.position.sub(qe).add(Xe), n.object.updateMatrixWorld(), ve = A.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), n.zoomToCursor = !1;
          ve !== null && (this.screenSpacePanning ? n.target.set(0, 0, -1).transformDirection(n.object.matrix).multiplyScalar(ve).add(n.object.position) : (Wi.origin.copy(n.object.position), Wi.direction.set(0, 0, -1).transformDirection(n.object.matrix), Math.abs(n.object.up.dot(Wi.direction)) < lp ? e.lookAt(n.target) : (Zs.setFromNormalAndCoplanarPoint(n.object.up, n.target), Wi.intersectPlane(Zs, n.target))));
        } else n.object.isOrthographicCamera && (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), n.object.updateProjectionMatrix(), Me = !0);
        return c = 1, R = !1, Me || ne.distanceToSquared(n.object.position) > o || 8 * (1 - _e.dot(n.object.quaternion)) > o || Be.distanceToSquared(n.target) > 0 ? (n.dispatchEvent(js), ne.copy(n.object.position), _e.copy(n.object.quaternion), Be.copy(n.target), !0) : !1;
      };
    }(), this.dispose = function() {
      n.domElement.removeEventListener("contextmenu", he), n.domElement.removeEventListener("pointerdown", Le), n.domElement.removeEventListener("pointercancel", x), n.domElement.removeEventListener("wheel", $), n.domElement.removeEventListener("pointermove", M), n.domElement.removeEventListener("pointerup", x), n._domElementKeyEvents !== null && (n._domElementKeyEvents.removeEventListener("keydown", J), n._domElementKeyEvents = null);
    };
    const n = this, r = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = r.NONE;
    const o = 1e-6, s = new Ys(), l = new Ys();
    let c = 1;
    const d = new D(), f = new be(), h = new be(), m = new be(), _ = new be(), b = new be(), p = new be(), u = new be(), v = new be(), g = new be(), T = new D(), C = new be();
    let R = !1;
    const w = [], H = {};
    function y(A) {
      return A !== null ? 2 * Math.PI / 60 * n.autoRotateSpeed * A : 2 * Math.PI / 60 / 60 * n.autoRotateSpeed;
    }
    function E(A) {
      const j = Math.abs(A) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, n.zoomSpeed * j);
    }
    function z(A) {
      l.theta -= A;
    }
    function q(A) {
      l.phi -= A;
    }
    const le = function() {
      const A = new D();
      return function(se, ne) {
        A.setFromMatrixColumn(ne, 0), A.multiplyScalar(-se), d.add(A);
      };
    }(), L = function() {
      const A = new D();
      return function(se, ne) {
        n.screenSpacePanning === !0 ? A.setFromMatrixColumn(ne, 1) : (A.setFromMatrixColumn(ne, 0), A.crossVectors(n.object.up, A)), A.multiplyScalar(se), d.add(A);
      };
    }(), N = function() {
      const A = new D();
      return function(se, ne) {
        const _e = n.domElement;
        if (n.object.isPerspectiveCamera) {
          const Be = n.object.position;
          A.copy(Be).sub(n.target);
          let Ve = A.length();
          Ve *= Math.tan(n.object.fov / 2 * Math.PI / 180), le(2 * se * Ve / _e.clientHeight, n.object.matrix), L(2 * ne * Ve / _e.clientHeight, n.object.matrix);
        } else n.object.isOrthographicCamera ? (le(se * (n.object.right - n.object.left) / n.object.zoom / _e.clientWidth, n.object.matrix), L(ne * (n.object.top - n.object.bottom) / n.object.zoom / _e.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), n.enablePan = !1);
      };
    }();
    function V(A) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c /= A : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function Y(A) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c *= A : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function X(A, j) {
      if (!n.zoomToCursor)
        return;
      R = !0;
      const se = n.domElement.getBoundingClientRect(), ne = A - se.left, _e = j - se.top, Be = se.width, Ve = se.height;
      C.x = ne / Be * 2 - 1, C.y = -(_e / Ve) * 2 + 1, T.set(C.x, C.y, 1).unproject(n.object).sub(n.object.position).normalize();
    }
    function W(A) {
      return Math.max(n.minDistance, Math.min(n.maxDistance, A));
    }
    function Q(A) {
      f.set(A.clientX, A.clientY);
    }
    function te(A) {
      X(A.clientX, A.clientX), u.set(A.clientX, A.clientY);
    }
    function de(A) {
      _.set(A.clientX, A.clientY);
    }
    function k(A) {
      h.set(A.clientX, A.clientY), m.subVectors(h, f).multiplyScalar(n.rotateSpeed);
      const j = n.domElement;
      z(2 * Math.PI * m.x / j.clientHeight), q(2 * Math.PI * m.y / j.clientHeight), f.copy(h), n.update();
    }
    function K(A) {
      v.set(A.clientX, A.clientY), g.subVectors(v, u), g.y > 0 ? V(E(g.y)) : g.y < 0 && Y(E(g.y)), u.copy(v), n.update();
    }
    function ue(A) {
      b.set(A.clientX, A.clientY), p.subVectors(b, _).multiplyScalar(n.panSpeed), N(p.x, p.y), _.copy(b), n.update();
    }
    function xe(A) {
      X(A.clientX, A.clientY), A.deltaY < 0 ? Y(E(A.deltaY)) : A.deltaY > 0 && V(E(A.deltaY)), n.update();
    }
    function ge(A) {
      let j = !1;
      switch (A.code) {
        case n.keys.UP:
          A.ctrlKey || A.metaKey || A.shiftKey ? q(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : N(0, n.keyPanSpeed), j = !0;
          break;
        case n.keys.BOTTOM:
          A.ctrlKey || A.metaKey || A.shiftKey ? q(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : N(0, -n.keyPanSpeed), j = !0;
          break;
        case n.keys.LEFT:
          A.ctrlKey || A.metaKey || A.shiftKey ? z(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : N(n.keyPanSpeed, 0), j = !0;
          break;
        case n.keys.RIGHT:
          A.ctrlKey || A.metaKey || A.shiftKey ? z(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : N(-n.keyPanSpeed, 0), j = !0;
          break;
      }
      j && (A.preventDefault(), n.update());
    }
    function Ce(A) {
      if (w.length === 1)
        f.set(A.pageX, A.pageY);
      else {
        const j = He(A), se = 0.5 * (A.pageX + j.x), ne = 0.5 * (A.pageY + j.y);
        f.set(se, ne);
      }
    }
    function Pe(A) {
      if (w.length === 1)
        _.set(A.pageX, A.pageY);
      else {
        const j = He(A), se = 0.5 * (A.pageX + j.x), ne = 0.5 * (A.pageY + j.y);
        _.set(se, ne);
      }
    }
    function Ee(A) {
      const j = He(A), se = A.pageX - j.x, ne = A.pageY - j.y, _e = Math.sqrt(se * se + ne * ne);
      u.set(0, _e);
    }
    function ke(A) {
      n.enableZoom && Ee(A), n.enablePan && Pe(A);
    }
    function I(A) {
      n.enableZoom && Ee(A), n.enableRotate && Ce(A);
    }
    function it(A) {
      if (w.length == 1)
        h.set(A.pageX, A.pageY);
      else {
        const se = He(A), ne = 0.5 * (A.pageX + se.x), _e = 0.5 * (A.pageY + se.y);
        h.set(ne, _e);
      }
      m.subVectors(h, f).multiplyScalar(n.rotateSpeed);
      const j = n.domElement;
      z(2 * Math.PI * m.x / j.clientHeight), q(2 * Math.PI * m.y / j.clientHeight), f.copy(h);
    }
    function Se(A) {
      if (w.length === 1)
        b.set(A.pageX, A.pageY);
      else {
        const j = He(A), se = 0.5 * (A.pageX + j.x), ne = 0.5 * (A.pageY + j.y);
        b.set(se, ne);
      }
      p.subVectors(b, _).multiplyScalar(n.panSpeed), N(p.x, p.y), _.copy(b);
    }
    function Re(A) {
      const j = He(A), se = A.pageX - j.x, ne = A.pageY - j.y, _e = Math.sqrt(se * se + ne * ne);
      v.set(0, _e), g.set(0, Math.pow(v.y / u.y, n.zoomSpeed)), V(g.y), u.copy(v);
      const Be = (A.pageX + j.x) * 0.5, Ve = (A.pageY + j.y) * 0.5;
      X(Be, Ve);
    }
    function pe(A) {
      n.enableZoom && Re(A), n.enablePan && Se(A);
    }
    function Ze(A) {
      n.enableZoom && Re(A), n.enableRotate && it(A);
    }
    function Le(A) {
      n.enabled !== !1 && (w.length === 0 && (n.domElement.setPointerCapture(A.pointerId), n.domElement.addEventListener("pointermove", M), n.domElement.addEventListener("pointerup", x)), Te(A), A.pointerType === "touch" ? me(A) : F(A));
    }
    function M(A) {
      n.enabled !== !1 && (A.pointerType === "touch" ? ce(A) : ee(A));
    }
    function x(A) {
      Ue(A), w.length === 0 && (n.domElement.releasePointerCapture(A.pointerId), n.domElement.removeEventListener("pointermove", M), n.domElement.removeEventListener("pointerup", x)), n.dispatchEvent(Ks), a = r.NONE;
    }
    function F(A) {
      let j;
      switch (A.button) {
        case 0:
          j = n.mouseButtons.LEFT;
          break;
        case 1:
          j = n.mouseButtons.MIDDLE;
          break;
        case 2:
          j = n.mouseButtons.RIGHT;
          break;
        default:
          j = -1;
      }
      switch (j) {
        case wn.DOLLY:
          if (n.enableZoom === !1) return;
          te(A), a = r.DOLLY;
          break;
        case wn.ROTATE:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (n.enablePan === !1) return;
            de(A), a = r.PAN;
          } else {
            if (n.enableRotate === !1) return;
            Q(A), a = r.ROTATE;
          }
          break;
        case wn.PAN:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (n.enableRotate === !1) return;
            Q(A), a = r.ROTATE;
          } else {
            if (n.enablePan === !1) return;
            de(A), a = r.PAN;
          }
          break;
        default:
          a = r.NONE;
      }
      a !== r.NONE && n.dispatchEvent(Wr);
    }
    function ee(A) {
      switch (a) {
        case r.ROTATE:
          if (n.enableRotate === !1) return;
          k(A);
          break;
        case r.DOLLY:
          if (n.enableZoom === !1) return;
          K(A);
          break;
        case r.PAN:
          if (n.enablePan === !1) return;
          ue(A);
          break;
      }
    }
    function $(A) {
      n.enabled === !1 || n.enableZoom === !1 || a !== r.NONE || (A.preventDefault(), n.dispatchEvent(Wr), xe(A), n.dispatchEvent(Ks));
    }
    function J(A) {
      n.enabled === !1 || n.enablePan === !1 || ge(A);
    }
    function me(A) {
      switch (Z(A), w.length) {
        case 1:
          switch (n.touches.ONE) {
            case Cn.ROTATE:
              if (n.enableRotate === !1) return;
              Ce(A), a = r.TOUCH_ROTATE;
              break;
            case Cn.PAN:
              if (n.enablePan === !1) return;
              Pe(A), a = r.TOUCH_PAN;
              break;
            default:
              a = r.NONE;
          }
          break;
        case 2:
          switch (n.touches.TWO) {
            case Cn.DOLLY_PAN:
              if (n.enableZoom === !1 && n.enablePan === !1) return;
              ke(A), a = r.TOUCH_DOLLY_PAN;
              break;
            case Cn.DOLLY_ROTATE:
              if (n.enableZoom === !1 && n.enableRotate === !1) return;
              I(A), a = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = r.NONE;
          }
          break;
        default:
          a = r.NONE;
      }
      a !== r.NONE && n.dispatchEvent(Wr);
    }
    function ce(A) {
      switch (Z(A), a) {
        case r.TOUCH_ROTATE:
          if (n.enableRotate === !1) return;
          it(A), n.update();
          break;
        case r.TOUCH_PAN:
          if (n.enablePan === !1) return;
          Se(A), n.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (n.enableZoom === !1 && n.enablePan === !1) return;
          pe(A), n.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (n.enableZoom === !1 && n.enableRotate === !1) return;
          Ze(A), n.update();
          break;
        default:
          a = r.NONE;
      }
    }
    function he(A) {
      n.enabled !== !1 && A.preventDefault();
    }
    function Te(A) {
      w.push(A.pointerId);
    }
    function Ue(A) {
      delete H[A.pointerId];
      for (let j = 0; j < w.length; j++)
        if (w[j] == A.pointerId) {
          w.splice(j, 1);
          return;
        }
    }
    function Z(A) {
      let j = H[A.pointerId];
      j === void 0 && (j = new be(), H[A.pointerId] = j), j.set(A.pageX, A.pageY);
    }
    function He(A) {
      const j = A.pointerId === w[0] ? w[1] : w[0];
      return H[j];
    }
    n.domElement.addEventListener("contextmenu", he), n.domElement.addEventListener("pointerdown", Le), n.domElement.addEventListener("pointercancel", x), n.domElement.addEventListener("wheel", $, { passive: !1 }), this.update();
  }
}
const qo = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class ii {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const up = new Oo(-1, 1, 1, -1, 0, 1);
class dp extends Vt {
  constructor() {
    super(), this.setAttribute("position", new xt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new xt([0, 2, 0, 0, 2, 0], 2));
  }
}
const fp = new dp();
class ga {
  constructor(e) {
    this._mesh = new Bt(fp, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, up);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class _a extends ii {
  constructor(e, t) {
    super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof ht ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = gi.clone(e.uniforms), this.material = new ht({
      name: e.name !== void 0 ? e.name : "unspecified",
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new ga(this.material);
  }
  render(e, t, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class $s extends ii {
  constructor(e, t) {
    super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, t, n) {
    const r = e.getContext(), a = e.state;
    a.buffers.color.setMask(!1), a.buffers.depth.setMask(!1), a.buffers.color.setLocked(!0), a.buffers.depth.setLocked(!0);
    let o, s;
    this.inverse ? (o = 0, s = 1) : (o = 1, s = 0), a.buffers.stencil.setTest(!0), a.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), a.buffers.stencil.setFunc(r.ALWAYS, o, 4294967295), a.buffers.stencil.setClear(s), a.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), a.buffers.color.setLocked(!1), a.buffers.depth.setLocked(!1), a.buffers.color.setMask(!0), a.buffers.depth.setMask(!0), a.buffers.stencil.setLocked(!1), a.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), a.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), a.buffers.stencil.setLocked(!0);
  }
}
class hp extends ii {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class pp {
  constructor(e, t) {
    if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
      const n = e.getSize(new be());
      this._width = n.width, this._height = n.height, t = new zt(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: en }), t.texture.name = "EffectComposer.rt1";
    } else
      this._width = t.width, this._height = t.height;
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new _a(qo), this.copyPass.material.blending = Jt, this.clock = new Xo();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const t = this.renderer.getRenderTarget();
    let n = !1;
    for (let r = 0, a = this.passes.length; r < a; r++) {
      const o = this.passes[r];
      if (o.enabled !== !1) {
        if (o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(r), o.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), o.needsSwap) {
          if (n) {
            const s = this.renderer.getContext(), l = this.renderer.state.buffers.stencil;
            l.setFunc(s.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), l.setFunc(s.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        $s !== void 0 && (o instanceof $s ? n = !0 : o instanceof hp && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new be());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, t) {
    this._width = e, this._height = t;
    const n = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
    for (let a = 0; a < this.passes.length; a++)
      this.passes[a].setSize(n, r);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class mp extends ii {
  constructor(e, t, n = null, r = null, a = null) {
    super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = r, this.clearAlpha = a, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new We();
  }
  render(e, t, n) {
    const r = e.autoClear;
    e.autoClear = !1;
    let a, o;
    this.overrideMaterial !== null && (o = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor)), this.clearAlpha !== null && (a = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(a), this.overrideMaterial !== null && (this.scene.overrideMaterial = o), e.autoClear = r;
  }
}
const gp = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new We(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
  )
};
class ei extends ii {
  constructor(e, t, n, r) {
    super(), this.strength = t !== void 0 ? t : 1, this.radius = n, this.threshold = r, this.resolution = e !== void 0 ? new be(e.x, e.y) : new be(256, 256), this.clearColor = new We(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let a = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new zt(a, o, { type: en }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let f = 0; f < this.nMips; f++) {
      const h = new zt(a, o, { type: en });
      h.texture.name = "UnrealBloomPass.h" + f, h.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(h);
      const m = new zt(a, o, { type: en });
      m.texture.name = "UnrealBloomPass.v" + f, m.texture.generateMipmaps = !1, this.renderTargetsVertical.push(m), a = Math.round(a / 2), o = Math.round(o / 2);
    }
    const s = gp;
    this.highPassUniforms = gi.clone(s.uniforms), this.highPassUniforms.luminosityThreshold.value = r, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new ht({
      uniforms: this.highPassUniforms,
      vertexShader: s.vertexShader,
      fragmentShader: s.fragmentShader
    }), this.separableBlurMaterials = [];
    const l = [3, 5, 7, 9, 11];
    a = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    for (let f = 0; f < this.nMips; f++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])), this.separableBlurMaterials[f].uniforms.invSize.value = new be(1 / a, 1 / o), a = Math.round(a / 2), o = Math.round(o / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    const c = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = c, this.bloomTintColors = [new D(1, 1, 1), new D(1, 1, 1), new D(1, 1, 1), new D(1, 1, 1), new D(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const d = qo;
    this.copyUniforms = gi.clone(d.uniforms), this.blendMaterial = new ht({
      uniforms: this.copyUniforms,
      vertexShader: d.vertexShader,
      fragmentShader: d.fragmentShader,
      blending: pi,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new We(), this.oldClearAlpha = 1, this.basic = new ua(), this.fsQuad = new ga(null);
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(e, t) {
    let n = Math.round(e / 2), r = Math.round(t / 2);
    this.renderTargetBright.setSize(n, r);
    for (let a = 0; a < this.nMips; a++)
      this.renderTargetsHorizontal[a].setSize(n, r), this.renderTargetsVertical[a].setSize(n, r), this.separableBlurMaterials[a].uniforms.invSize.value = new be(1 / n, 1 / r), n = Math.round(n / 2), r = Math.round(r / 2);
  }
  render(e, t, n, r, a) {
    e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
    const o = e.autoClear;
    e.autoClear = !1, e.setClearColor(this.clearColor, 0), a && e.state.buffers.stencil.setTest(!1), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = n.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = n.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this.fsQuad.render(e);
    let s = this.renderTargetBright;
    for (let l = 0; l < this.nMips; l++)
      this.fsQuad.material = this.separableBlurMaterials[l], this.separableBlurMaterials[l].uniforms.colorTexture.value = s.texture, this.separableBlurMaterials[l].uniforms.direction.value = ei.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[l]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[l].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture, this.separableBlurMaterials[l].uniforms.direction.value = ei.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[l]), e.clear(), this.fsQuad.render(e), s = this.renderTargetsVertical[l];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, a && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(n), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = o;
  }
  getSeperableBlurMaterial(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(0.39894 * Math.exp(-0.5 * n * n / (e * e)) / e);
    return new ht({
      defines: {
        KERNEL_RADIUS: e
      },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new be(0.5, 0.5) },
        // inverse texture size
        direction: { value: new be(0.5, 0.5) },
        gaussianCoefficients: { value: t }
        // precomputed Gaussian coefficients
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(e) {
    return new ht({
      defines: {
        NUM_MIPS: e
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
}
ei.BlurDirectionX = new be(1, 0);
ei.BlurDirectionY = new be(0, 1);
const _p = {
  name: "OutputShader",
  uniforms: {
    tDiffuse: { value: null },
    toneMappingExposure: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`
  )
};
class bp extends ii {
  constructor() {
    super();
    const e = _p;
    this.uniforms = gi.clone(e.uniforms), this.material = new op({
      name: e.name,
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    }), this.fsQuad = new ga(this.material), this._outputColorSpace = null, this._toneMapping = null;
  }
  render(e, t, n) {
    this.uniforms.tDiffuse.value = n.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, Ye.getTransfer(this._outputColorSpace) === Ke && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === lo ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === co ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === uo ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === sa ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === fo && (this.material.defines.AGX_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
function xp(i) {
  const e = new be(0, 0);
  function t(n) {
    const r = i.getBoundingClientRect();
    e.x = (n.clientX - r.left) / r.width * 2 - 1, e.y = -((n.clientY - r.top) / r.height) * 2 + 1;
  }
  return i.addEventListener("pointermove", t, { passive: !0 }), {
    pointer: e,
    dispose() {
      i.removeEventListener("pointermove", t);
    }
  };
}
function vp(i, e) {
  function t() {
    e();
  }
  return i.addEventListener("pointerdown", t), {
    dispose() {
      i.removeEventListener("pointerdown", t);
    }
  };
}
function yp() {
  let i = 0, e = performance.now(), t = 60;
  return {
    get fps() {
      return t;
    },
    tick() {
      i += 1;
      const n = performance.now();
      n - e >= 1e3 && (t = i, i = 0, e = n);
    },
    getMarchQuality(n) {
      return t < 40 ? 0.55 : t < 50 ? 0.72 : n > 1.5 ? 0.78 : 1;
    }
  };
}
const Sp = [
  {
    key: "TESSERACT",
    id: "tesseract",
    name: "Tesseract",
    badge: "Hypercube Projection",
    description: "A four-dimensional cube projected into 3D. The inner and outer cubes trade places as it turns through the fourth dimension.",
    defaultPreset: "Canonical Hypercube",
    file: "tesseract-engine.js",
    factoryName: "createTesseractEngine",
    params: {
      color1: { type: "color", label: "Outer Cube Edges", default: "#ffed00", section: "colors" },
      color2: { type: "color", label: "Inner Cube Edges", default: "#00f0ff", section: "colors" },
      colorStrut: { type: "color", label: "Corner Struts", default: "#ffffff", section: "colors", paletteRole: "fixed" },
      nodeColor: { type: "color", label: "Corner Vertex Nodes", default: "#ffffff", section: "colors", paletteRole: "fixed" },
      cellColor: { type: "color", label: "Glass Facet Tint", default: "#ffed00", section: "colors" },
      edgeGlow: { type: "number", label: "Edge Radiance", min: 0.5, max: 3.5, step: 0.1, default: 1.2, section: "colors" },
      projection: { type: "select", label: "4D Viewing Axis", options: ["cell_first", "face_first", "edge_first", "vertex_first"], default: "cell_first", section: "geometry" },
      edgeMode: { type: "select", label: "Edge Architecture", options: ["sketch", "cubes", "outer_struts", "inner_struts", "struts"], default: "sketch", section: "geometry" },
      innerScale: { type: "number", label: "Inner Cube Ratio", min: 0.25, max: 0.75, step: 0.01, default: 0.48, section: "geometry" },
      cubeSize: { type: "number", label: "Hypercube Scale", min: 0.6, max: 2.5, step: 0.05, default: 1.35, section: "geometry" },
      edgeWidth: { type: "number", label: "Edge Line Width", min: 1, max: 6, step: 0.2, default: 2.6, section: "geometry" },
      nodeSize: { type: "number", label: "Corner Vertex Nodes", min: 0, max: 0.12, step: 5e-3, default: 0.038, section: "geometry" },
      cellOpacity: { type: "number", label: "Glass Facet Opacity", min: 0, max: 0.4, step: 0.01, default: 0, section: "geometry" },
      motionMode: { type: "select", label: "Motion Dynamic", options: ["sketch3d", "hyperfold", "pulse", "true4d"], default: "sketch3d", section: "motion" },
      rotSpeedX: { type: "number", label: "3D Rotation Pitch", min: -2, max: 2, step: 0.05, default: 0.25, section: "motion" },
      rotSpeedY: { type: "number", label: "3D Rotation Yaw", min: -2, max: 2, step: 0.05, default: 0.5, section: "motion" },
      pulseSpeed: { type: "number", label: "Fold / Pulse Speed", min: 0.2, max: 3, step: 0.1, default: 1.2, section: "motion" },
      rotSpeedXW: { type: "number", label: "4D Rotation XW", min: -2, max: 2, step: 0.05, default: 0.35, section: "motion" },
      rotSpeedYW: { type: "number", label: "4D Rotation YW", min: -2, max: 2, step: 0.05, default: 0.45, section: "motion" }
    }
  },
  {
    key: "MOIRE",
    id: "moire",
    name: "Chiral Moiré",
    badge: "Optical String Art",
    description: "String art in three dimensions: straight lines strung between two rings and twisted until their crossings make moiré. Nine shapes, from funnels to saddles.",
    defaultPreset: "1. Chiral Square Vortex",
    file: "moire-engine.js",
    factoryName: "createMoireEngine",
    params: {
      archetype: { type: "select", label: "Grid Archetype", options: ["meridian_beat", "lattice_beat", "helix_beat"], default: "meridian_beat", section: "geometry" },
      scale: { type: "number", label: "Orb Scale", min: 0.8, max: 3, step: 0.05, default: 2.2, section: "geometry" },
      lineDensity: { type: "number", label: "Meridians", min: 8, max: 60, step: 1, default: 28, section: "geometry" },
      beatOffset: { type: "number", label: "Beat Offset", min: -8, max: 8, step: 1, default: 2, section: "geometry" },
      latBands: { type: "number", label: "Latitude Rings", min: 0, max: 24, step: 1, default: 8, section: "geometry" },
      twistAngle: { type: "number", label: "Chiral Twist Angle", min: -1.5, max: 1.5, step: 0.02, default: 0.72, section: "geometry" },
      shellGap: { type: "number", label: "Shell Gap", min: 0.55, max: 0.99, step: 0.01, default: 0.9, section: "motion" },
      lineWidth: { type: "number", label: "Line Stroke Thickness", min: 0.5, max: 6, step: 0.1, default: 1.6, section: "geometry" },
      lineColor: { type: "color", label: "Line Color", default: "#7fe9ff", section: "colors" },
      lineGlow: { type: "number", label: "Line Glow / Radiance", min: 0.5, max: 3, step: 0.1, default: 1, section: "colors" },
      motionMode: { type: "select", label: "Motion Dynamic", options: ["counter_spin", "orbit_3d", "wave_pulse", "interactive_tilt"], default: "counter_spin", section: "motion" },
      counterSpin: { type: "number", label: "Counter-Spin Rate", min: -2, max: 2, step: 0.05, default: 0.55, section: "motion" },
      rotSpeedX: { type: "number", label: "3D Pitch Rotation", min: -2, max: 2, step: 0.02, default: 0.06, section: "motion" },
      rotSpeedY: { type: "number", label: "3D Yaw Rotation", min: -2, max: 2, step: 0.02, default: 0.18, section: "motion" },
      rotSpeedZ: { type: "number", label: "3D Roll Rotation", min: -2, max: 2, step: 0.02, default: 0, section: "motion" },
      breatheSpeed: { type: "number", label: "Shell Breath Rate", min: 0, max: 2.5, step: 0.05, default: 0.6, section: "motion" },
      breatheAmp: { type: "number", label: "Breathing Amplitude", min: 0, max: 0.25, step: 0.01, default: 0.05, section: "motion" },
      twistSpeed: { type: "number", label: "Chiral Winding Speed", min: 0, max: 2, step: 0.05, default: 0.15, section: "motion" },
      tiltStrength: { type: "number", label: "Mouse Parallax Depth", min: 0, max: 1, step: 0.05, default: 0.35, section: "motion" }
    }
  },
  {
    key: "AURIS",
    id: "auris",
    name: "Auris",
    badge: "Lit Polyhedra",
    description: "Geodesic polyhedra and Kepler compounds in wireframe and facet, lit from one side with line hatching.",
    defaultPreset: "Geodesic Stellated Sun",
    file: "auris-engine.js",
    factoryName: "createAurisEngine",
    params: {
      archetype: { type: "select", label: "Crystalline Archetype", options: ["geodesic", "cubic_compound", "nested_square", "nested_hex", "nested_pentagon", "nested_triangle"], default: "geodesic", section: "geometry" },
      scale: { type: "number", label: "Polyhedron Scale", min: 0.8, max: 2.5, step: 0.05, default: 1.4, section: "geometry" },
      stellaHeight: { type: "number", label: "Stellation / 3D Depth", min: 0, max: 1.2, step: 0.02, default: 0.45, section: "geometry" },
      twistAngle: { type: "number", label: "Per-Layer Rotation", min: 0.02, max: 0.35, step: 0.01, default: 0.14, section: "geometry" },
      wireWidth: { type: "number", label: "Contour Line Width", min: 1, max: 5, step: 0.2, default: 2.4, section: "geometry" },
      lightColor: { type: "color", label: "Directional Light Tint", default: "#ffea79", section: "colors" },
      facetColor: { type: "color", label: "Facet Base Shading", default: "#1e293b", section: "colors", paletteRole: "fixed" },
      wireColor: { type: "color", label: "Glowing Edge Contours", default: "#fef08a", section: "colors" },
      shadowColor: { type: "color", label: "Shadow Ambient Tone", default: "#090d16", section: "colors", paletteRole: "fixed" },
      wireGlow: { type: "number", label: "Wire Radiance", min: 0.5, max: 3.5, step: 0.1, default: 1.3, section: "colors" },
      hatchStrength: { type: "number", label: "Architectural Hatching", min: 0, max: 1, step: 0.05, default: 0.85, section: "colors" },
      lightYaw: { type: "number", label: "Light Direction (Azimuth)", min: 0, max: 360, step: 5, default: 45, section: "motion" },
      lightPitch: { type: "number", label: "Light Elevation (Altitude)", min: -85, max: 85, step: 5, default: 35, section: "motion" },
      lightIntensity: { type: "number", label: "Illumination Power", min: 0.4, max: 3.5, step: 0.1, default: 1.6, section: "motion" },
      hatchDensity: { type: "number", label: "Hatching Frequency", min: 6, max: 50, step: 1, default: 18, section: "motion" },
      rotSpeedX: { type: "number", label: "3D Rotation Pitch", min: -2, max: 2, step: 0.05, default: 0.2, section: "motion" },
      rotSpeedY: { type: "number", label: "3D Rotation Yaw", min: -2, max: 2, step: 0.05, default: 0.45, section: "motion" },
      rotSpeedZ: { type: "number", label: "3D Rotation Roll", min: -2, max: 2, step: 0.05, default: 0.1, section: "motion" }
    }
  },
  {
    key: "HOPF",
    id: "hopf",
    name: "Hopf Fibration",
    badge: "Clifford Torus",
    description: "Stereographic projection of the 3-sphere S³ to R³ generating nested Villarceau circle fibers and Clifford toroidal inversions.",
    defaultPreset: "Clifford Vortex",
    file: "hopf-engine.js",
    factoryName: "createHopfEngine",
    params: {
      color1: { type: "color", label: "Core Villarceau Ring", default: "#ffed00", section: "colors" },
      color2: { type: "color", label: "Outer Toroidal Shell", default: "#a855f7", section: "colors" },
      accentColor: { type: "color", label: "Streamline Sparkles", default: "#00f2fe", section: "colors" },
      glowIntensity: { type: "number", label: "Fiber Radiance", min: 0.4, max: 3.5, step: 0.1, default: 1.5, section: "colors" },
      fiberCount: { type: "select", label: "Fiber Circle Count", options: [16, 24, 32, 48], default: 32, section: "geometry" },
      torusRadius: { type: "number", label: "Major Torus Radius (R)", min: 0.8, max: 2.8, step: 0.05, default: 1.75, section: "geometry" },
      tubeRadius: { type: "number", label: "Minor Torus Radius (r)", min: 0.3, max: 1.6, step: 0.05, default: 0.85, section: "geometry" },
      lineWidth: { type: "number", label: "Fiber Ribbon Width", min: 1, max: 6, step: 0.5, default: 2.8, section: "geometry" },
      cliffordSpeed: { type: "number", label: "Clifford 4D Inversion Rate", min: 0, max: 2.5, step: 0.05, default: 0.7, section: "motion" },
      flowSpeed: { type: "number", label: "Stream Flow Velocity", min: 0.1, max: 3, step: 0.1, default: 1.2, section: "motion" },
      twistHarmonics: { type: "number", label: "Winding Harmonics", min: 1, max: 5, step: 1, default: 2, section: "motion" }
    }
  },
  {
    key: "POLYTOPE",
    id: "polytope",
    name: "Star Polytope",
    badge: "Star Tetrahedron",
    description: "Two interlocked tetrahedra turning against each other around a Kepler–Poinsot star, with dispersion on the facets.",
    defaultPreset: "Gold Star Tetrahedron",
    file: "polytope-engine.js",
    factoryName: "createPolytopeEngine",
    params: {
      color1: { type: "color", label: "Primary Star (Yang)", default: "#ffed00", section: "colors" },
      color2: { type: "color", label: "Counter Star (Yin)", default: "#ec4899", section: "colors" },
      coreColor: { type: "color", label: "Core Spark", default: "#ffffff", section: "colors", paletteRole: "fixed" },
      wireColor: { type: "color", label: "Geodesic Wireframe", default: "#00f0ff", section: "colors" },
      wireGlow: { type: "number", label: "Wireframe Luma", min: 0.5, max: 3.5, step: 0.1, default: 1.8, section: "colors" },
      facetDispersion: { type: "number", label: "Prismatic Dispersion", min: 0, max: 1.5, step: 0.05, default: 0.75, section: "colors" },
      polytopeType: { type: "select", label: "Shape", options: ["merkabah", "kepler_star", "icosa_stellation"], optionLabels: { merkabah: "Star tetrahedron", kepler_star: "Kepler star", icosa_stellation: "Stellated icosahedron" }, default: "merkabah", section: "geometry" },
      scale: { type: "number", label: "Polytope Outer Radius", min: 0.8, max: 2.6, step: 0.05, default: 1.65, section: "geometry" },
      coreRadius: { type: "number", label: "Core Radius", min: 0.15, max: 0.9, step: 0.05, default: 0.45, section: "geometry" },
      wireThickness: { type: "number", label: "Geodesic Line Width", min: 1, max: 6, step: 0.5, default: 3, section: "geometry" },
      rotRateA: { type: "number", label: "Star A Spin Velocity", min: -2, max: 2, step: 0.05, default: 0.6, section: "motion" },
      rotRateB: { type: "number", label: "Star B Counter-Spin", min: -2, max: 2, step: 0.05, default: -0.6, section: "motion" }
    }
  },
  {
    key: "NEBULA",
    id: "nebula",
    name: "Gyroid Nebula",
    badge: "Volumetric Raymarching",
    description: "A gyroid surface raymarched as a glowing volume inside a soft atmospheric shell, with chromatic aberration and fine sparkle.",
    defaultPreset: "Aurora Core",
    file: "nebula-engine.js",
    factoryName: "createNebulaEngine",
    params: {
      color1: { type: "color", label: "Primary Gradient", default: "#00ffc8", section: "colors" },
      color2: { type: "color", label: "Secondary Colour", default: "#4466ff", section: "colors" },
      colorShell: { type: "color", label: "Atmosphere Shell", default: "#00ffc8", section: "colors" },
      aberration: { type: "number", label: "Chromatic Aberration", min: 0, max: 2, step: 0.01, default: 0.85, section: "colors" },
      glowIntensity: { type: "number", label: "Internal Glow", min: 2e-3, max: 0.03, step: 1e-3, default: 7e-3, section: "colors" },
      atmosphereStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.3, section: "colors" },
      sphereRadius: { type: "number", label: "Sphere Bounds", min: 1, max: 3.5, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.1, max: 1.2, step: 0.01, default: 0.381, section: "geometry" },
      fractalScale: { type: "number", label: "Domain Scale", min: 0.2, max: 1.4, step: 0.01, default: 0.7602, section: "geometry" },
      fractalMult: { type: "number", label: "Fractal Multiplier", min: 1.2, max: 3.8, step: 0.05, default: 2.196, section: "geometry" },
      particleDensity: { type: "number", label: "Stardust Density", min: 0, max: 0.05, step: 1e-3, default: 0.014, section: "geometry" },
      sphereSpinSpeed: { type: "number", label: "Fractal Spin", min: -3, max: 3, step: 0.05, default: -0.65, section: "motion" },
      fractalWarpSpeed: { type: "number", label: "Warp Speed", min: 5e-3, max: 0.08, step: 1e-3, default: 0.0262, section: "motion" }
    }
  },
  {
    key: "QUANTUM",
    id: "quantum",
    name: "Fractal Lattice",
    badge: "IFS Fractal",
    description: "A recursive iterated-function lattice folded through four dimensions and traced with glowing orbit lines.",
    defaultPreset: "Phosphor Lattice",
    file: "quantum-engine.js",
    factoryName: "createQuantumEngine",
    params: {
      color1: { type: "color", label: "Primary Colour", default: "#0066ff", section: "colors" },
      color2: { type: "color", label: "Secondary Colour", default: "#a855f7", section: "colors" },
      color3: { type: "color", label: "Core Colour", default: "#00f2fe", section: "colors" },
      edgeGlow: { type: "number", label: "Edge Luma", min: 0, max: 3, step: 0.05, default: 1.2, section: "colors" },
      shape: { type: "select", label: "Lattice Geometry", options: ["sphere", "cube", "octahedron"], default: "sphere", section: "geometry" },
      cubeSize: { type: "number", label: "Structure Size", min: 0.6, max: 2.2, step: 0.05, default: 1.25, section: "geometry" },
      scaleFactor: { type: "number", label: "Recursion Scale", min: 1.4, max: 3.2, step: 0.01, default: 2.15, section: "geometry" },
      orbitPathWidth: { type: "number", label: "Orbital Line Width", min: 1, max: 8, step: 0.5, default: 4, section: "geometry" },
      orbitPathBrightness: { type: "number", label: "Orbital Brightness", min: 0.5, max: 6, step: 0.1, default: 3.5, section: "geometry" },
      rotSpeedX: { type: "number", label: "Rotation Pitch", min: 0, max: 0.8, step: 0.02, default: 0.18, section: "motion" },
      rotSpeedY: { type: "number", label: "Rotation Yaw", min: 0, max: 0.8, step: 0.02, default: 0.28, section: "motion" },
      fractalSpeed: { type: "number", label: "Fractal Oscillation", min: 0.2, max: 2.5, step: 0.05, default: 1, section: "motion" },
      morphSpeed: { type: "number", label: "Morph Speed", min: 0.2, max: 2.5, step: 0.05, default: 1, section: "motion" }
    }
  },
  {
    key: "SINGULARITY",
    id: "singularity",
    name: "Black Hole",
    badge: "Accretion Disk",
    description: "Event horizon with gravitational light bending, Doppler-beamed accretion disk, and relativistic photon sphere.",
    defaultPreset: "Gargantua Singularity",
    file: "singularity-engine.js",
    factoryName: "createSingularityEngine",
    params: {
      color1: { type: "color", label: "Accretion Core Flame", default: "#f59e0b", section: "colors" },
      color2: { type: "color", label: "Outer Collapsar Halo", default: "#ef4444", section: "colors" },
      color3: { type: "color", label: "Relativistic Doppler Blue", default: "#38bdf8", section: "colors" },
      horizonRadius: { type: "number", label: "Event Horizon Radius", min: 0.5, max: 1.6, step: 0.05, default: 1.05, section: "geometry" },
      diskInner: { type: "number", label: "Accretion Inner Ring", min: 0.8, max: 2.2, step: 0.05, default: 1.45, section: "geometry" },
      diskOuter: { type: "number", label: "Accretion Outer Edge", min: 2.2, max: 5, step: 0.1, default: 3.5, section: "geometry" },
      accretionDensity: { type: "number", label: "Disk Density", min: 0.4, max: 3, step: 0.05, default: 1.6, section: "geometry" },
      warpStrength: { type: "number", label: "Gravitational Lensing", min: 0.2, max: 2.5, step: 0.05, default: 1.35, section: "motion" },
      diskSpeed: { type: "number", label: "Vortex Orbital Velocity", min: 0.2, max: 2.5, step: 0.05, default: 0.85, section: "motion" },
      dopplerShift: { type: "number", label: "Relativistic Beaming", min: 0, max: 1.5, step: 0.05, default: 0.75, section: "motion" },
      diskTilt: { type: "number", label: "Accretion Plane Tilt", min: -1, max: 1, step: 0.02, default: 0.28, section: "motion" },
      spiralArms: { type: "select", label: "Spiral Density Arms", options: [2, 3, 4, 5, 6], default: 3, section: "geometry" },
      armContrast: { type: "number", label: "Arm Definition", min: 0, max: 1, step: 0.01, default: 0.65, section: "motion" }
    }
  },
  {
    key: "SILKWARP",
    id: "silkwarp",
    name: "Silk Warp",
    badge: "Domain-Warped Flow",
    description: "Layered warped-noise currents flowing over a shaded sphere, blended in perceptual colour space so every mid-tone keeps its hue.",
    defaultPreset: "Teal Undertow",
    file: "silkwarp-engine.js",
    factoryName: "createSilkWarpEngine",
    params: {
      color1: { type: "color", label: "Current Tint", default: "#5eead4", section: "colors" },
      color2: { type: "color", label: "Undertow Tint", default: "#818cf8", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#e0f2fe", section: "colors" },
      contrast: { type: "number", label: "Silk Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.15, section: "colors" },
      glow: { type: "number", label: "Current Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1.1, section: "colors" },
      sheen: { type: "number", label: "Iridescent Sheen", min: 0, max: 1, step: 0.01, default: 0.35, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.25, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 3, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      octaves: { type: "select", label: "Detail Octaves", options: [3, 4, 5, 6], default: 5, section: "geometry" },
      warpDepth: { type: "number", label: "Warp Intensity", min: 0, max: 2.5, step: 0.05, default: 1.25, section: "motion" },
      warpScale: { type: "number", label: "Warp Grain", min: 0.5, max: 4, step: 0.05, default: 2.4, section: "motion" },
      driftSpin: { type: "number", label: "Current Drift", min: -1, max: 1, step: 0.01, default: 0.22, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 0.01, default: -0.13, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.45, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.3, step: 0.01, default: 0.08, section: "motion" }
    }
  },
  {
    key: "KALEIDO",
    id: "kaleido",
    name: "Kaleido Sigil",
    badge: "Fold-Fractural Mandala",
    description: "A kaleidoscopic fold fractal — mirrored wedges of an orbit-trapped similarity iteration, drawn as glowing contour filaments on a shaded disc.",
    defaultPreset: "Gilded Rose Window",
    file: "kaleido-engine.js",
    factoryName: "createKaleidoEngine",
    params: {
      color1: { type: "color", label: "Petal Tint", default: "#ffd166", section: "colors" },
      color2: { type: "color", label: "Vortex Tint", default: "#e879f9", section: "colors" },
      rimColor: { type: "color", label: "Rim Halo", default: "#fff7ed", section: "colors" },
      edgeGlow: { type: "number", label: "Line Radiance", min: 0.3, max: 3, step: 0.05, default: 1.35, section: "colors" },
      lineWidth: { type: "number", label: "Contour Weight", min: 0.3, max: 2.5, step: 0.05, default: 1.1, section: "colors" },
      grain: { type: "number", label: "Film Grain", min: 0, max: 0.2, step: 5e-3, default: 0.035, section: "colors" },
      radius: { type: "number", label: "Sigil Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      symmetry: { type: "select", label: "Fold Symmetry", options: [5, 6, 7, 8, 9, 10, 12, 16], default: 8, section: "geometry" },
      iterations: { type: "select", label: "Fold Depth", options: [4, 5, 6, 7, 8], default: 6, section: "geometry" },
      contraction: { type: "number", label: "Fold Contraction", min: 0.55, max: 1.1, step: 0.01, default: 0.82, section: "geometry" },
      warpTwist: { type: "number", label: "Petal Twist", min: -1.5, max: 1.5, step: 0.02, default: 0.35, section: "motion" },
      spinRate: { type: "number", label: "Sigil Spin", min: -1, max: 1, step: 0.01, default: 0.16, section: "motion" },
      counterRate: { type: "number", label: "Seed Orbit Rate", min: -1, max: 1, step: 0.01, default: -0.11, section: "motion" },
      seedRadius: { type: "number", label: "Seed Radius", min: 0.2, max: 1.2, step: 0.01, default: 0.62, section: "motion" },
      zoomRate: { type: "number", label: "Zoom Breath Rate", min: 0, max: 2, step: 0.05, default: 0.4, section: "motion" },
      zoomDepth: { type: "number", label: "Zoom Depth", min: 0, max: 0.08, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "VEIL",
    id: "veil",
    name: "Prism Veil",
    badge: "Thin-Film Iridescence",
    description: "An oil-film of warped noise over a wet sphere — spectral interference colours sliding across the surface with a moving specular glint.",
    defaultPreset: "Oil Slick Reverie",
    file: "prism-veil-engine.js",
    factoryName: "createPrismVeilEngine",
    params: {
      color1: { type: "color", label: "Base Tint", default: "#2dd4bf", section: "colors" },
      color2: { type: "color", label: "Undertow Tint", default: "#7c3aed", section: "colors" },
      iridStrength: { type: "number", label: "Iridescence", min: 0, max: 1, step: 0.01, default: 0.75, section: "colors" },
      sheen: { type: "number", label: "Wet Glint", min: 0, max: 1.5, step: 0.01, default: 0.6, section: "colors" },
      contrast: { type: "number", label: "Film Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.1, section: "colors" },
      glow: { type: "number", label: "Film Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.22, section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#eef2ff", section: "colors", paletteRole: "fixed" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      octaves: { type: "select", label: "Detail Octaves", options: [3, 4, 5, 6], default: 5, section: "geometry" },
      filmThickness: { type: "number", label: "Film Thickness", min: 0.5, max: 3, step: 0.05, default: 1.6, section: "motion" },
      filmFrequency: { type: "number", label: "Spectral Banding", min: 0.3, max: 2, step: 0.01, default: 1, section: "motion" },
      warpDepth: { type: "number", label: "Warp Intensity", min: 0, max: 2.5, step: 0.05, default: 1.35, section: "motion" },
      driftSpin: { type: "number", label: "Current Drift", min: -1, max: 1, step: 0.01, default: 0.18, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 0.01, default: -0.11, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.4, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.07, section: "motion" }
    }
  },
  {
    key: "MOSAIC",
    id: "mosaic",
    name: "Luminous Mosaic",
    badge: "Voronoi Glass",
    description: "A drifting tessellation of stained-glass cells with luminous seams — light breathes across the orb one cell at a time.",
    defaultPreset: "Cathedral Window",
    file: "luminous-mosaic-engine.js",
    factoryName: "createLuminousMosaicEngine",
    params: {
      color1: { type: "color", label: "Glass Base", default: "#1d4ed8", section: "colors" },
      color2: { type: "color", label: "Glass Accent", default: "#22d3ee", section: "colors" },
      borderColor: { type: "color", label: "Seam Light", default: "#ffd166", section: "colors" },
      borderGlow: { type: "number", label: "Seam Radiance", min: 0, max: 3, step: 0.05, default: 1.3, section: "colors" },
      borderSoft: { type: "number", label: "Seam Width", min: 0.01, max: 0.2, step: 5e-3, default: 0.07, section: "colors" },
      glow: { type: "number", label: "Glass Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.2, section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#e0f2fe", section: "colors", paletteRole: "fixed" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      cellScale: { type: "number", label: "Cell Density", min: 1.5, max: 6, step: 0.05, default: 3.2, section: "motion" },
      tintSpread: { type: "number", label: "Tint Variance", min: 0, max: 1, step: 0.01, default: 0.55, section: "motion" },
      cellBreath: { type: "number", label: "Cell Breath", min: 0, max: 1, step: 0.01, default: 0.6, section: "motion" },
      driftSpin: { type: "number", label: "Lattice Drift", min: -1, max: 1, step: 0.01, default: 0.14, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 0.01, default: -0.09, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  },
  {
    key: "KALISET",
    id: "kaliset",
    name: "Kaliset Lace",
    badge: "Orbit-Trap Threads",
    description: "Lace drawn by the Kaliset fold: points folded and inverted again and again, lit where their orbit passes near a ring.",
    defaultPreset: "Gossamer Field",
    file: "kaliset-lace-engine.js",
    factoryName: "createKalisetLaceEngine",
    params: {
      color1: { type: "color", label: "Thread Tint", default: "#f43f5e", section: "colors" },
      color2: { type: "color", label: "Ground Tint", default: "#fbbf24", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#fff1f2", section: "colors", paletteRole: "fixed" },
      laceGlow: { type: "number", label: "Lace Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1.15, section: "colors" },
      contrast: { type: "number", label: "Lace Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.2, section: "colors" },
      glow: { type: "number", label: "Field Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.2, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      folds: { type: "select", label: "Fold Count", options: [6, 8, 10, 12, 14], default: 12, section: "geometry" },
      threadSharp: { type: "number", label: "Thread Sharpness", min: 2, max: 16, step: 0.1, default: 7, section: "motion" },
      ringRadius: { type: "number", label: "Trap Ring Radius", min: 0.2, max: 1.2, step: 0.01, default: 0.55, section: "motion" },
      foldScale: { type: "number", label: "Lace Grain", min: 0.6, max: 3, step: 0.05, default: 1.6, section: "motion" },
      seedStrength: { type: "number", label: "Seed Strength", min: 0.3, max: 0.9, step: 5e-3, default: 0.62, section: "motion" },
      driftSpin: { type: "number", label: "Lace Drift", min: -1, max: 1, step: 0.01, default: 0.12, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 0.01, default: -0.08, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  }
], Mp = [
  {
    key: "SCROLLDOME",
    id: "scrolldome",
    name: "Scroll Dome",
    badge: "Ornate Scrollwork",
    description: "Interlocking scroll curves inked over a rolling sphere — two sine grids warping each other into filigree.",
    defaultPreset: "Gilded Scrollwork",
    file: "scroll-dome-engine.js",
    factoryName: "createScrollDomeEngine",
    params: {
      color1: { type: "color", label: "Ink Lines", default: "#ffd166", section: "colors" },
      color2: { type: "color", label: "Body Depth", default: "#0b1026", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#fef3c7", section: "colors", paletteRole: "fixed" },
      gain: { type: "number", label: "Ink Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.35, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.3, max: 2, step: 0.01, default: 0.9, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.15, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      patternScale: { type: "number", label: "Scroll Grain", min: 1, max: 8, step: 0.05, default: 5.2, section: "motion" },
      patternZoom: { type: "number", label: "Curl Tightness", min: 0.5, max: 5, step: 0.05, default: 2.4, section: "motion" },
      swirlAmp: { type: "number", label: "Swirl Depth", min: 0, max: 4, step: 0.05, default: 2.3, section: "motion" },
      warpFreq: { type: "number", label: "Warp Frequency", min: 0.4, max: 4, step: 0.01, default: 2.1, section: "motion" },
      lineClamp: { type: "number", label: "Line Weight", min: 0.03, max: 0.4, step: 5e-3, default: 0.09, section: "motion" },
      swell: { type: "number", label: "Swell Depth", min: 0, max: 0.15, step: 5e-3, default: 0.05, section: "motion" },
      swirlRate: { type: "number", label: "Roll Rate", min: -0.5, max: 0.5, step: 5e-3, default: 0.16, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Roll", min: -0.5, max: 0.5, step: 5e-3, default: -0.1, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.4, section: "motion" }
    }
  },
  {
    key: "NACRE",
    id: "nacre",
    name: "Nacre Bands",
    badge: "Mother-of-Pearl",
    description: "Pearlescent contour bands with a hue of their own per layer — an abalone curtain boiling gently over the sphere.",
    defaultPreset: "Abalone Sheen",
    file: "nacre-engine.js",
    factoryName: "createNacreEngine",
    params: {
      colorDeep: { type: "color", label: "Shell Body", default: "#0d1430", section: "colors" },
      colorLow: { type: "color", label: "Dim Layer", default: "#2fb8c6", section: "colors" },
      colorCrest: { type: "color", label: "Bright Layer", default: "#fff1de", section: "colors" },
      colorSheen: { type: "color", label: "Sheen Tint", default: "#bfe4ff", section: "colors", paletteRole: "fixed" },
      irid: { type: "number", label: "Iridescence", min: 0, max: 2, step: 0.01, default: 0.7, section: "colors" },
      irisScale: { type: "number", label: "Iridescence Scale", min: 0, max: 2, step: 5e-3, default: 0.32, section: "colors" },
      split: { type: "number", label: "Chromatic Split", min: 0, max: 0.5, step: 5e-3, default: 0.1, section: "colors" },
      gain: { type: "number", label: "Band Radiance", min: 0.1, max: 3, step: 0.05, default: 1.1, section: "colors" },
      contrast: { type: "number", label: "Band Contrast", min: 0.2, max: 3, step: 0.01, default: 1.15, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.1, max: 2, step: 0.01, default: 0.75, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.5, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      octaves: { type: "select", label: "Detail Octaves", options: [3, 4, 5], default: 4, section: "geometry" },
      bandScale: { type: "number", label: "Band Count", min: 2, max: 10, step: 0.1, default: 5.5, section: "motion" },
      bandWidth: { type: "number", label: "Band Width", min: 0.02, max: 0.6, step: 5e-3, default: 0.2, section: "motion" },
      warpAmp: { type: "number", label: "Warp Depth", min: 0, max: 2.5, step: 0.05, default: 1, section: "motion" },
      beat: { type: "number", label: "Warp Beat", min: 0, max: 1, step: 0.01, default: 0, section: "motion" },
      viewShift: { type: "number", label: "Angle Shift", min: 0, max: 3, step: 0.01, default: 1.34, section: "motion" },
      boilRate: { type: "number", label: "Boil Rate", min: 0, max: 1, step: 5e-3, default: 0.25, section: "motion" },
      flowRate: { type: "number", label: "Band Drift", min: 0, max: 1.5, step: 5e-3, default: 0.3, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "QUANTPLASMA",
    id: "quantplasma",
    name: "Quantized Plasma",
    badge: "Pixel Plasma",
    description: "A lit plasma dome quantized to chunky two-tone pixels — retro waves on a coarse screen.",
    defaultPreset: "Poster Plasma",
    file: "quant-plasma-engine.js",
    factoryName: "createQuantPlasmaEngine",
    params: {
      colorInk: { type: "color", label: "Ink Tone", default: "#101426", section: "colors" },
      colorPaper: { type: "color", label: "Paper Tone", default: "#cfe6ff", section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.1, max: 2, step: 0.01, default: 0.9, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.35, section: "colors" },
      gain: { type: "number", label: "Plasma Radiance", min: 0.1, max: 3, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Plasma Contrast", min: 0.2, max: 3, step: 0.01, default: 1.1, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      cells: { type: "select", label: "Pixel Cells", options: [60, 90, 120, 140, 180, 240], default: 140, section: "geometry" },
      levels: { type: "select", label: "Tone Levels", options: [2, 3, 4, 5, 6], default: 3, section: "geometry" },
      patternScale: { type: "number", label: "Plasma Scale", min: 0.4, max: 4, step: 0.01, default: 1.5, section: "motion" },
      plasmaAmp: { type: "number", label: "Plasma Depth", min: 0, max: 3, step: 0.01, default: 0.9, section: "motion" },
      plasmaRate: { type: "number", label: "Plasma Rate", min: 0, max: 2, step: 5e-3, default: 0.5, section: "motion" },
      spinRate: { type: "number", label: "Spin Rate", min: -1, max: 1, step: 5e-3, default: 0.15, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "BEADS",
    id: "beads",
    name: "Bead Field",
    badge: "Packing Beads",
    description: "Beads swelling and shrinking in their cells, packed over the ball — each on its own detuned clock.",
    defaultPreset: "Mercury Packing",
    file: "bead-field-engine.js",
    factoryName: "createBeadFieldEngine",
    params: {
      colorDot: { type: "color", label: "Bead Tint", default: "#ffffff", section: "colors" },
      colorDotAccent: { type: "color", label: "Bead Accent", default: "#eef5ff", section: "colors" },
      colorBody: { type: "color", label: "Body Depth", default: "#05070c", section: "colors" },
      colorSheen: { type: "color", label: "Sheen Tint", default: "#9dbfe4", section: "colors", paletteRole: "fixed" },
      beadShade: { type: "number", label: "Bead Shading", min: 0, max: 1, step: 0.01, default: 0.55, section: "colors" },
      floorLevel: { type: "number", label: "Body Fill", min: 0, max: 1, step: 0.01, default: 0.06, section: "colors" },
      gain: { type: "number", label: "Bead Radiance", min: 0.1, max: 3, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Bead Contrast", min: 0.2, max: 3, step: 0.01, default: 1, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0, max: 2, step: 0.01, default: 0.5, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.35, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      packingScale: { type: "number", label: "Packing Density", min: 3, max: 20, step: 0.1, default: 10, section: "motion" },
      grow: { type: "number", label: "Bead Size", min: 0, max: 0.45, step: 5e-3, default: 0.185, section: "motion" },
      vary: { type: "number", label: "Size Variation", min: 0, max: 0.4, step: 5e-3, default: 0.13, section: "motion" },
      skew: { type: "number", label: "Detune", min: 0, max: 2, step: 0.01, default: 0.62, section: "motion" },
      jitter: { type: "number", label: "Wander", min: 0, max: 0.8, step: 5e-3, default: 0.1, section: "motion" },
      edgeHardness: { type: "number", label: "Rim Hardness", min: 2, max: 200, step: 1, default: 50, section: "motion" },
      pulseRate: { type: "number", label: "Swell Rate", min: 0, max: 2, step: 5e-3, default: 0.5, section: "motion" },
      driftSpin: { type: "number", label: "Packing Drift", min: -1, max: 1, step: 5e-3, default: 0.12, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 5e-3, default: -0.08, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "RADAR",
    id: "radar",
    name: "Radar Mosaic",
    badge: "Weather Radar",
    description: "Fronts of coloured pixels sweeping the ball — a living weather-radar mosaic with twinkling returns.",
    defaultPreset: "Storm Watch",
    file: "radar-mosaic-engine.js",
    factoryName: "createRadarMosaicEngine",
    params: {
      colorPaper: { type: "color", label: "Clear Tone", default: "#efe9dc", section: "colors" },
      colorQuiet: { type: "color", label: "Quiet Tone", default: "#a9a9a6", section: "colors" },
      colorLow: { type: "color", label: "Rain Class", default: "#2e5df0", section: "colors" },
      colorMid: { type: "color", label: "Storm Class", default: "#22c35c", section: "colors" },
      colorHigh: { type: "color", label: "Heavy Class", default: "#e8322a", section: "colors" },
      colorPeak: { type: "color", label: "Peak Class", default: "#f5d020", section: "colors", paletteRole: "fixed" },
      grain: { type: "number", label: "Grain", min: 0, max: 0.6, step: 5e-3, default: 0.1, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0, max: 1, step: 5e-3, default: 0.18, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1, step: 5e-3, default: 0.35, section: "colors" },
      gain: { type: "number", label: "Mosaic Radiance", min: 0.1, max: 3, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Mosaic Contrast", min: 0.2, max: 3, step: 0.01, default: 1, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      cells: { type: "select", label: "Mosaic Cells", options: [16, 24, 34, 48, 68, 90], default: 34, section: "geometry" },
      dotSize: { type: "number", label: "Cell Dot", min: 0.15, max: 0.48, step: 5e-3, default: 0.36, section: "motion" },
      vortex: { type: "number", label: "Vortex Curl", min: 0, max: 2, step: 0.01, default: 0.45, section: "motion" },
      warpAmp: { type: "number", label: "Front Warp", min: 0, max: 2, step: 0.01, default: 0.3, section: "motion" },
      loThresh: { type: "number", label: "Quiet Floor", min: 0, max: 0.5, step: 5e-3, default: 0.12, section: "motion" },
      hiThresh: { type: "number", label: "Peak Ceiling", min: 0.5, max: 1, step: 5e-3, default: 0.82, section: "motion" },
      curve: { type: "number", label: "Intensity Gamma", min: 0.5, max: 3, step: 0.01, default: 1.4, section: "motion" },
      sparse: { type: "number", label: "Sparse Cells", min: 0, max: 0.8, step: 5e-3, default: 0.16, section: "motion" },
      sweepRate: { type: "number", label: "Sweep Rate", min: 0, max: 2, step: 5e-3, default: 0.3, section: "motion" },
      spinRate: { type: "number", label: "Spin Rate", min: -1, max: 1, step: 5e-3, default: 0.15, section: "motion" },
      twinkleRate: { type: "number", label: "Twinkle Rate", min: 0, max: 10, step: 0.1, default: 3, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.05, section: "motion" }
    }
  }
], Ep = [
  {
    key: "FLUX",
    id: "flux",
    name: "Flux Ribbon",
    badge: "Travelling Wave",
    description: "A bundle of glowing strands streaming in a travelling wave, fanning apart and converging into bright knots. Renders as a wide ribbon or wrapped onto an orb.",
    defaultPreset: "Filament Sphere",
    file: "flux-engine.js",
    factoryName: "createFluxEngine",
    params: {
      layout: { type: "select", label: "Layout", options: ["ribbon", "orb"], default: "orb", section: "geometry" },
      strands: { type: "number", label: "Strand Count", min: 6, max: 64, step: 1, default: 28, section: "geometry" },
      segments: { type: "number", label: "Strand Resolution", min: 40, max: 300, step: 10, default: 160, section: "geometry" },
      bandSpread: { type: "number", label: "Band Spread", min: 0, max: 3, step: 0.05, default: 1.1, section: "geometry" },
      ribbonWidth: { type: "number", label: "Ribbon Width", min: 4, max: 24, step: 0.5, default: 14, section: "geometry" },
      twist: { type: "number", label: "Orb Twist", min: -2, max: 2, step: 0.05, default: 0.6, section: "geometry" },
      sparkleDensity: { type: "number", label: "Sparkle Density", min: 0, max: 0.2, step: 5e-3, default: 0.03, section: "geometry" },
      amplitude: { type: "number", label: "Wave Amplitude", min: 0, max: 2.5, step: 0.05, default: 0.85, section: "motion" },
      wavelength: { type: "number", label: "Wavelength", min: 0.1, max: 1.5, step: 0.02, default: 0.42, section: "motion" },
      phaseSpread: { type: "number", label: "Strand Phase Spread", min: 0, max: 8, step: 0.1, default: 2.4, section: "motion" },
      depth: { type: "number", label: "Depth Separation", min: 0, max: 5, step: 0.1, default: 2.2, section: "motion" },
      turbulence: { type: "number", label: "Turbulence", min: 0, max: 1.5, step: 0.05, default: 0.35, section: "motion" },
      flowSpeed: { type: "number", label: "Flow Speed", min: -3, max: 3, step: 0.05, default: 0.9, section: "motion" },
      colorA: { type: "color", label: "Leading Colour", default: "#ff4fd8", section: "colors" },
      colorB: { type: "color", label: "Mid Colour", default: "#a86bff", section: "colors" },
      colorC: { type: "color", label: "Trailing Colour", default: "#4fd0ff", section: "colors" },
      glow: { type: "number", label: "Strand Glow", min: 0.2, max: 3, step: 0.05, default: 2.1, section: "colors" },
      sparkleSize: { type: "number", label: "Sparkle Size", min: 0.5, max: 8, step: 0.1, default: 2.2, section: "colors" },
      sparkleBrightness: { type: "number", label: "Sparkle Brightness", min: 0, max: 5, step: 0.1, default: 2.4, section: "colors" }
    }
  },
  {
    key: "AQUEOUS",
    id: "aqueous",
    name: "Aqueous",
    badge: "Refractive Body",
    description: "A soft, luminous body with migrating liquid contours, glassy depth, and a calm physical presence.",
    defaultPreset: "Stillwater Listener",
    file: "aqueous-engine.js",
    factoryName: "createAqueousEngine",
    params: {
      detail: { type: "select", label: "Surface Detail", options: [3, 4, 5, 6], default: 5, section: "geometry" },
      radius: { type: "number", label: "Body Radius", min: 0.8, max: 2.2, step: 0.05, default: 1.5, section: "geometry" },
      displaceOctaves: { type: "select", label: "Surface Layers", options: [1, 2, 3, 4], default: 3, section: "geometry" },
      displaceAmount: { type: "number", label: "Liquid Displacement", min: 0, max: 0.5, step: 0.01, default: 0.18, section: "motion" },
      displaceScale: { type: "number", label: "Surface Character", min: 0.3, max: 4, step: 0.05, default: 1.4, section: "motion" },
      breatheSpeed: { type: "number", label: "Breathing Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breathing Depth", min: 0, max: 0.15, step: 5e-3, default: 0.04, section: "motion" },
      driftSpeed: { type: "number", label: "Surface Drift Speed", min: 0, max: 1.5, step: 0.05, default: 0.25, section: "motion" },
      pulseDeform: { type: "number", label: "Pulse Deformation", min: 0, max: 0.6, step: 0.02, default: 0.25, section: "motion" },
      bodyColor: { type: "color", label: "Body Tint", default: "#2dd4bf", section: "colors" },
      coreColor: { type: "color", label: "Inner Light", default: "#ffed00", section: "colors" },
      transmission: { type: "number", label: "Glassy Transmission", min: 0, max: 1, step: 0.01, default: 0.85, section: "colors" },
      thickness: { type: "number", label: "Optical Thickness", min: 0, max: 3, step: 0.05, default: 1.2, section: "colors" },
      ior: { type: "number", label: "Refraction Index", min: 1, max: 2.4, step: 0.01, default: 1.42, section: "colors" },
      roughness: { type: "number", label: "Surface Roughness", min: 0, max: 1, step: 0.01, default: 0.15, section: "colors" },
      coreIntensity: { type: "number", label: "Inner Light Strength", min: 0, max: 4, step: 0.1, default: 1.6, section: "colors" },
      fresnelPower: { type: "number", label: "Rim Falloff", min: 0.5, max: 6, step: 0.1, default: 2.5, section: "colors" }
    }
  },
  {
    key: "CURL_DRIFT",
    id: "curldrift",
    name: "Curl Drift",
    badge: "Advected Flow",
    description: "Directional light ribbons braid around a spherical shell inside a deterministic curl field.",
    defaultPreset: "Blue Current",
    file: "curl-drift-engine.js",
    factoryName: "createCurlDriftEngine",
    params: {
      streamCount: { type: "select", label: "Stream Count", options: [32, 48, 64, 96, 128], default: 64, section: "geometry" },
      trailLength: { type: "select", label: "Trail Length", options: [16, 32, 48, 64, 96], default: 48, section: "geometry" },
      shellRadius: { type: "number", label: "Flow Shell Radius", min: 0.8, max: 2.4, step: 0.05, default: 1.6, section: "geometry" },
      lineWidth: { type: "number", label: "Stream Width", min: 0.5, max: 5, step: 0.1, default: 1.6, section: "motion" },
      fieldScale: { type: "number", label: "Curl Field Scale", min: 0.2, max: 3, step: 0.05, default: 0.9, section: "motion" },
      fieldEvolveSpeed: { type: "number", label: "Field Evolution Speed", min: 0, max: 1, step: 0.01, default: 0.12, section: "motion" },
      flowSpeed: { type: "number", label: "Stream Flow Speed", min: 0.1, max: 3, step: 0.05, default: 0.8, section: "motion" },
      shellBinding: { type: "number", label: "Shell Binding", min: 0, max: 2, step: 0.05, default: 0.7, section: "motion" },
      swirl: { type: "number", label: "Directional Swirl", min: 0, max: 1.5, step: 0.05, default: 0.3, section: "motion" },
      lifetimeJitter: { type: "number", label: "Lifetime Variation", min: 0, max: 1, step: 0.05, default: 0.5, section: "motion" },
      coverage: { type: "number", label: "Shell Coverage", min: 0.05, max: 1, step: 0.01, default: 1, section: "motion" },
      coverageCenter: { type: "number", label: "Coverage Latitude", min: -1, max: 1, step: 0.02, default: 0, section: "motion" },
      headColor: { type: "color", label: "Leading Light", default: "#00f2fe", section: "colors" },
      midColor: { type: "color", label: "Mid-Trail Light", default: "#4f8cff", section: "colors" },
      tailColor: { type: "color", label: "Trailing Light", default: "#a855f7", section: "colors" },
      glowIntensity: { type: "number", label: "Flow Radiance", min: 0.4, max: 3, step: 0.1, default: 1.3, section: "colors" },
      tailFade: { type: "number", label: "Trail Fade", min: 0, max: 1, step: 0.05, default: 0.7, section: "colors" }
    }
  },
  {
    key: "MURMURATION",
    id: "murmuration",
    name: "Murmuration",
    badge: "Emergent Swarm",
    description: "A living cloud of agents gathers, separates, and regroups on a sphere, torus, cube, or disk.",
    defaultPreset: "Deliberation Cloud",
    file: "murmuration-engine.js",
    factoryName: "createMurmurationEngine",
    params: {
      agentCount: { type: "select", label: "Agent Count", options: [128, 256, 384, 512], default: 256, section: "geometry" },
      shellShape: { type: "select", label: "Shell Shape", options: ["sphere", "torus", "cube", "disk"], default: "sphere", section: "geometry" },
      shellRadius: { type: "number", label: "Swarm Shell Radius", min: 0.8, max: 2.6, step: 0.05, default: 1.7, section: "geometry" },
      trailLength: { type: "select", label: "Ghost Trail Length", options: [0, 4, 8, 16], default: 8, section: "geometry" },
      pointSize: { type: "number", label: "Agent Size", min: 0.5, max: 6, step: 0.1, default: 2, section: "motion" },
      cohesion: { type: "number", label: "Cohesion", min: 0, max: 1, step: 0.01, default: 0.4, section: "motion" },
      separation: { type: "number", label: "Separation", min: 0, max: 1, step: 0.01, default: 0.55, section: "motion" },
      alignment: { type: "number", label: "Alignment", min: 0, max: 1, step: 0.01, default: 0.35, section: "motion" },
      neighbourRadius: { type: "number", label: "Neighbour Radius", min: 0.1, max: 1.5, step: 0.05, default: 0.55, section: "motion" },
      attractorPull: { type: "number", label: "Attractor Pull", min: 0, max: 2, step: 0.05, default: 0.5, section: "motion" },
      gathering: { type: "number", label: "Gathering", min: 0, max: 1, step: 0.01, default: 0.45, section: "motion" },
      shellBinding: { type: "number", label: "Shell Binding", min: 0, max: 2, step: 0.05, default: 0.8, section: "motion" },
      agentSpeed: { type: "number", label: "Agent Speed", min: 0.1, max: 3, step: 0.05, default: 1, section: "motion" },
      damping: { type: "number", label: "Collective Damping", min: 0.8, max: 0.995, step: 5e-3, default: 0.96, section: "motion" },
      coreColor: { type: "color", label: "Core Agent Colour", default: "#ffed00", section: "colors" },
      edgeColor: { type: "color", label: "Shell Agent Colour", default: "#00f2fe", section: "colors" },
      glowIntensity: { type: "number", label: "Swarm Radiance", min: 0.4, max: 3, step: 0.1, default: 1.4, section: "colors" },
      trailFade: { type: "number", label: "Ghost Trail Fade", min: 0, max: 1, step: 0.05, default: 0.6, section: "colors" }
    }
  },
  {
    key: "FILAMENT",
    id: "filament",
    name: "Filament Lattice",
    badge: "Spring Network",
    description: "Signals travel through an elastic geodesic network, reflect, interfere, and ring down.",
    defaultPreset: "Signal Lattice",
    file: "filament-engine.js",
    factoryName: "createFilamentEngine",
    params: {
      subdivision: { type: "select", label: "Lattice Subdivision", options: [1, 2, 3], default: 2, section: "geometry" },
      radius: { type: "number", label: "Rest Sphere Radius", min: 0.8, max: 2.4, step: 0.05, default: 1.6, section: "geometry" },
      nodeSize: { type: "number", label: "Node Size", min: 0, max: 0.1, step: 5e-3, default: 0.03, section: "motion" },
      lineWidth: { type: "number", label: "Filament Width", min: 0.5, max: 5, step: 0.1, default: 1.8, section: "motion" },
      stiffness: { type: "number", label: "Spring Stiffness", min: 0.05, max: 1, step: 0.01, default: 0.35, section: "motion" },
      damping: { type: "number", label: "Ring-down Damping", min: 0.8, max: 0.995, step: 5e-3, default: 0.94, section: "motion" },
      tether: { type: "number", label: "Rest Tether", min: 0, max: 0.5, step: 0.01, default: 0.06, section: "motion" },
      pulseStrength: { type: "number", label: "Pulse Impulse", min: 0, max: 1.5, step: 0.05, default: 0.5, section: "motion" },
      idleExcitation: { type: "number", label: "Idle Excitation", min: 0, max: 0.3, step: 0.01, default: 0.05, section: "motion" },
      waveSpeed: { type: "number", label: "Wave Speed", min: 0, max: 2, step: 0.05, default: 0.4, section: "motion" },
      displacementGlow: { type: "number", label: "Displacement Radiance", min: 0, max: 3, step: 0.1, default: 1.5, section: "colors" },
      restColor: { type: "color", label: "Resting Filaments", default: "#1e293b", section: "colors", paletteRole: "fixed" },
      activeColor: { type: "color", label: "Active Signal", default: "#ffed00", section: "colors" },
      nodeColor: { type: "color", label: "Node Light", default: "#ffffff", section: "colors", paletteRole: "fixed" }
    }
  }
], Tp = [
  {
    key: "PRISM_BLOOM",
    id: "prismbloom",
    name: "Prism Bloom",
    badge: "Crystalline Flora",
    description: "Iridescent crystalline petals open in waves around a warm faceted core.",
    defaultPreset: "Opaline Bloom",
    file: "prism-bloom-engine.js",
    factoryName: "createPrismBloomEngine",
    params: {
      petalCount: { type: "select", label: "Petal Count", options: [24, 36, 48, 60, 72], default: 48, section: "geometry" },
      petalLength: { type: "number", label: "Petal Length", min: 1.05, max: 1.42, step: 0.01, default: 1.32, section: "geometry" },
      petalWidth: { type: "number", label: "Petal Width", min: 0.38, max: 0.64, step: 0.01, default: 0.52, section: "geometry" },
      coreRadius: { type: "number", label: "Faceted Core Radius", min: 0.68, max: 0.9, step: 0.01, default: 0.83, section: "geometry" },
      bloom: { type: "number", label: "Bloom Openness", min: 0.12, max: 1, step: 0.01, default: 0.58, section: "motion" },
      fold: { type: "number", label: "Petal Fold", min: 0.35, max: 1, step: 0.01, default: 0.78, section: "motion" },
      waveStrength: { type: "number", label: "Opening Wave", min: 0, max: 0.7, step: 0.01, default: 0.42, section: "motion" },
      breatheAmp: { type: "number", label: "Breathing Depth", min: 0, max: 0.25, step: 0.01, default: 0.14, section: "motion" },
      breatheSpeed: { type: "number", label: "Breathing Rate", min: 0.2, max: 1.4, step: 0.02, default: 0.72, section: "motion" },
      innerColor: { type: "color", label: "Inner Petal Colour", default: "#f8c8ff", section: "colors" },
      outerColor: { type: "color", label: "Outer Petal Colour", default: "#58c9ff", section: "colors" },
      edgeColor: { type: "color", label: "Prismatic Edge", default: "#fff4cb", section: "colors" },
      iridescence: { type: "number", label: "Iridescence", min: 0, max: 1, step: 0.01, default: 0.72, section: "colors" },
      glow: { type: "number", label: "Crystal Radiance", min: 0.8, max: 1.8, step: 0.02, default: 1.28, section: "colors" }
    }
  },
  {
    key: "CORONA_VEIL",
    id: "coronaveil",
    name: "Corona Veil",
    badge: "Aurora Membrane",
    description: "Membranes around a dark solar core — bands or coronal loops, worn as aurora, silk, lace or frost.",
    defaultPreset: "Polar Veil",
    file: "corona-veil-engine.js",
    factoryName: "createCoronaVeilEngine",
    params: {
      veilCount: { type: "select", label: "Veil Count", options: [5, 6, 8, 10, 12], default: 8, section: "geometry" },
      detail: { type: "select", label: "Membrane Detail", options: [48, 64, 80, 96], default: 80, section: "geometry" },
      coreRadius: { type: "number", label: "Dark Core Radius", min: 1.5, max: 1.75, step: 0.01, default: 1.62, section: "geometry" },
      // Shape and surface are uniforms: switching morphs or cross-fades over
      // ~0.6 s and never rebuilds. Selects, so never modulated.
      veilShape: { type: "select", label: "Veil Shape", options: ["bands", "loops"], default: "bands", section: "geometry" },
      veilSurface: { type: "select", label: "Veil Surface", options: ["aurora", "silk", "lace", "frost"], default: "aurora", section: "geometry" },
      veilSpread: { type: "number", label: "Veil Separation", min: 0.14, max: 0.3, step: 0.01, default: 0.24, section: "motion" },
      twist: { type: "number", label: "Membrane Twist", min: 0.25, max: 1.1, step: 0.01, default: 0.68, section: "motion" },
      waveAmp: { type: "number", label: "Membrane Wave", min: 0.02, max: 0.09, step: 5e-3, default: 0.055, section: "motion" },
      breatheAmp: { type: "number", label: "Corona Breath", min: 0, max: 0.055, step: 5e-3, default: 0.025, section: "motion" },
      driftSpeed: { type: "number", label: "Veil Drift Speed", min: 0.06, max: 0.28, step: 0.01, default: 0.16, section: "motion" },
      waveSpeed: { type: "number", label: "Membrane Wave Speed", min: 0.24, max: 0.72, step: 0.02, default: 0.48, section: "motion" },
      coreColor: { type: "color", label: "Solar Core", default: "#02040a", section: "colors", paletteRole: "fixed" },
      veilColor: { type: "color", label: "Aurora Veil", default: "#62d8d2", section: "colors" },
      accentColor: { type: "color", label: "Corona Accent", default: "#b9a7ff", section: "colors" },
      opacity: { type: "number", label: "Veil Opacity", min: 0.16, max: 0.34, step: 0.01, default: 0.25, section: "colors" },
      edgeGlow: { type: "number", label: "Membrane Edge Glow", min: 0.75, max: 1.7, step: 0.05, default: 1.25, section: "colors" }
    }
  },
  {
    key: "ECHO_RINGS",
    id: "echorings",
    name: "Echo Rings",
    badge: "Signal Memory",
    description: "Luminous wavefronts remember each pulse as they propagate and settle around a dark orb.",
    defaultPreset: "First Contact",
    file: "echo-rings-engine.js",
    factoryName: "createEchoRingsEngine",
    params: {
      ringCount: { type: "select", label: "Idle Ring Count", options: [3, 5, 7, 9, 11], default: 7, section: "geometry" },
      segments: { type: "select", label: "Ring Resolution", options: [64, 96, 128, 160, 192], default: 128, section: "geometry" },
      radius: { type: "number", label: "Signal Sphere Radius", min: 1.4, max: 1.9, step: 0.02, default: 1.72, section: "geometry" },
      lineWidth: { type: "number", label: "Signal Width", min: 0.8, max: 5, step: 0.1, default: 2.4, section: "motion" },
      tiltSpread: { type: "number", label: "Ring Plane Spread", min: 0.15, max: 1.45, step: 0.02, default: 0.92, section: "motion" },
      ringSpacing: { type: "number", label: "Wavefront Spacing", min: 0.35, max: 1.3, step: 0.01, default: 0.82, section: "motion" },
      idleWave: { type: "number", label: "Idle Signal", min: 0, max: 1.2, step: 0.02, default: 0.42, section: "motion" },
      pulseStrength: { type: "number", label: "Echo Strength", min: 0.4, max: 2.2, step: 0.05, default: 1.35, section: "motion" },
      driftSpeed: { type: "number", label: "Ring Drift Speed", min: -0.4, max: 0.4, step: 0.01, default: 0.14, section: "motion" },
      propagationSpeed: { type: "number", label: "Propagation Speed", min: 0.55, max: 1.45, step: 0.02, default: 1, section: "motion" },
      pingRate: { type: "number", label: "Spontaneous Pings", min: 0, max: 1, step: 0.01, default: 0.18, section: "motion" },
      memoryHold: { type: "number", label: "Memory Hold", min: 0, max: 30, step: 0.5, default: 10, section: "motion" },
      baseColor: { type: "color", label: "Resting Rings", default: "#123039", section: "colors", paletteRole: "fixed" },
      echoColor: { type: "color", label: "Active Echo", default: "#42d9ff", section: "colors" },
      coreColor: { type: "color", label: "Signal Core", default: "#e8fdff", section: "colors", paletteRole: "fixed" },
      glow: { type: "number", label: "Echo Radiance", min: 0.5, max: 2.8, step: 0.05, default: 1.65, section: "colors" }
    }
  },
  {
    key: "CHROMASPHERE",
    id: "chromasphere",
    name: "Chromasphere",
    badge: "Liquid Chrome",
    description: "A solid, opaque metal orb whose rippling surface reflects an analytic studio environment. The one engine here with a hard silhouette.",
    defaultPreset: "Luminous Root",
    file: "chromasphere-engine.js",
    factoryName: "createChromasphereEngine",
    params: {
      detail: { type: "select", label: "Surface Subdivision", options: [3, 4, 5, 6], default: 5, section: "geometry" },
      rippleOctaves: { type: "select", label: "Ripple Detail", options: [1, 2, 3, 4], default: 3, section: "geometry" },
      barCount: { type: "select", label: "Studio Light Count", options: [2, 3, 4, 6, 8], default: 4, section: "geometry" },
      radius: { type: "number", label: "Orb Radius", min: 0.8, max: 2.2, step: 0.05, default: 1.45, section: "motion" },
      rippleAmount: { type: "number", label: "Ripple Depth", min: 0, max: 0.4, step: 5e-3, default: 0.14, section: "motion" },
      rippleScale: { type: "number", label: "Ripple Frequency", min: 0.5, max: 5, step: 0.05, default: 1.9, section: "motion" },
      flowSpeed: { type: "number", label: "Surface Flow Rate", min: 0, max: 1.5, step: 0.01, default: 0.3, section: "motion" },
      spinSpeed: { type: "number", label: "Studio Spin Rate", min: -1, max: 1, step: 0.01, default: 0.12, section: "motion" },
      breatheSpeed: { type: "number", label: "Breath Rate", min: 0, max: 1.5, step: 0.01, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Amplitude", min: 0, max: 0.12, step: 5e-3, default: 0.03, section: "motion" },
      pulseRipple: { type: "number", label: "Pulse Ripple", min: 0, max: 0.6, step: 0.02, default: 0.3, section: "motion" },
      metalTint: { type: "color", label: "Metal Tint", default: "#dfe7ef", section: "colors" },
      envTop: { type: "color", label: "Studio Key Light", default: "#8ea6c8", section: "colors" },
      barColor: { type: "color", label: "Softbox Strips", default: "#fff6e0", section: "colors" },
      envBottom: { type: "color", label: "Studio Floor", default: "#0a0d14", section: "colors", paletteRole: "fixed" },
      envIntensity: { type: "number", label: "Reflection Intensity", min: 0.2, max: 3.5, step: 0.05, default: 1.5, section: "colors" },
      roughness: { type: "number", label: "Surface Roughness", min: 0, max: 0.8, step: 0.01, default: 0.14, section: "colors" },
      fresnelPower: { type: "number", label: "Rim Falloff", min: 0.5, max: 6, step: 0.1, default: 3.2, section: "colors" },
      fresnelGain: { type: "number", label: "Rim Brightness", min: 0, max: 1.5, step: 0.05, default: 0.55, section: "colors" },
      barWidth: { type: "number", label: "Softbox Width", min: 0.05, max: 1.2, step: 0.01, default: 0.3, section: "colors" }
    }
  },
  {
    key: "VOCALIS",
    id: "vocalis",
    name: "Vocalis",
    badge: "Vocal Diaphragm",
    description: "Acoustic diaphragm rings ripple around a glottal slit that opens and snaps shut with each syllable — as circles, an iris, an ellipse, or globe latitudes.",
    defaultPreset: "Vocal Resonator",
    file: "vocalis-engine.js",
    factoryName: "createVocalisEngine",
    params: {
      ringCount: { type: "select", label: "Diaphragm Rings", options: [4, 6, 8, 10, 12], default: 6, section: "geometry" },
      ringLayout: { type: "select", label: "Ring Layout", options: ["circle", "iris", "ellipse", "globe"], default: "circle", section: "geometry" },
      baseRadius: { type: "number", label: "Acoustic Radius", min: 0.8, max: 2.2, step: 0.05, default: 1.45, section: "geometry" },
      diaphragmDepth: { type: "number", label: "Diaphragm Curvature", min: 0.2, max: 1.2, step: 0.05, default: 0.6, section: "geometry" },
      lineWidth: { type: "number", label: "Ring Stroke Width", min: 1, max: 5, step: 0.1, default: 2.4, section: "geometry" },
      apertureSize: { type: "number", label: "Glottal Aperture", min: 0.1, max: 0.9, step: 0.02, default: 0.35, section: "motion" },
      vocalRipple: { type: "number", label: "Phonetic Ripple Depth", min: 0, max: 0.45, step: 0.01, default: 0.14, section: "motion" },
      formantHarmonics: { type: "select", label: "Formant Harmonics", options: [2, 3, 4, 5, 6], default: 3, section: "motion" },
      formantGain: { type: "number", label: "Formant Resonance Gain", min: 0.2, max: 2.5, step: 0.05, default: 1.2, section: "motion" },
      breatheAmp: { type: "number", label: "Vocal Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.04, section: "motion" },
      articulationRate: { type: "number", label: "Speech Cadence Rate", min: 0.2, max: 3, step: 0.05, default: 1.2, section: "motion" },
      plosiveSurge: { type: "number", label: "Plosive Burst Surge", min: 0.2, max: 2.5, step: 0.05, default: 1.4, section: "motion" },
      coreColor: { type: "color", label: "Vocal Glottis Spark", default: "#ffffff", section: "colors", paletteRole: "fixed" },
      diaphragmColor: { type: "color", label: "Diaphragm Ribbons", default: "#00f2fe", section: "colors" },
      formantColor: { type: "color", label: "Formant Crest Wave", default: "#a855f7", section: "colors" },
      glowIntensity: { type: "number", label: "Acoustic Radiance", min: 0.4, max: 3, step: 0.1, default: 1.8, section: "colors" },
      glottisDarkness: { type: "number", label: "Glottal Occlusion", min: 0.2, max: 1, step: 0.05, default: 0.8, section: "colors" },
      // Uniform writes on the slit card, so both stay modulatable.
      slitAngle: { type: "number", label: "Slit Angle (mouth ↔ folds)", min: 0, max: 180, step: 1, default: 0, section: "motion" },
      slitLength: { type: "number", label: "Slit Length", min: 0.3, max: 1, step: 0.01, default: 0.7, section: "motion" },
      // A select, not a new on/off type: selects already work everywhere a
      // parameter goes (panel, config files, randomise), so this adds nothing
      // for a host or the studio to learn.
      mouth: { type: "select", label: "Mouth", options: ["on", "off"], default: "on", section: "motion" }
    }
  },
  {
    key: "AETHERIA",
    id: "aetheria",
    name: "Aetheria",
    badge: "Fluid Pearl",
    description: "A pearl of slow fluid: warped ripples on the surface, a dispersive rim, and caustics moving underneath.",
    defaultPreset: "Siri Pearl",
    file: "aetheria-engine.js",
    factoryName: "createAetheriaEngine",
    params: {
      sphereRadius: { type: "number", label: "Fluid Sphere Radius", min: 1, max: 2.2, step: 0.05, default: 1.55, section: "geometry" },
      detail: { type: "select", label: "Mesh Resolution", options: [32, 48, 64, 96], default: 64, section: "geometry" },
      causticRibbons: { type: "select", label: "Silk Caustic Ribbons", options: [1, 2, 3, 4], default: 3, section: "geometry" },
      fluidSpeed: { type: "number", label: "Fluid Drift Rate", min: 0.1, max: 2, step: 0.05, default: 0.45, section: "motion" },
      fluidWaveAmp: { type: "number", label: "Surface Wavelet Depth", min: 0, max: 0.35, step: 0.01, default: 0.12, section: "motion" },
      breatheAmp: { type: "number", label: "Radial Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.04, section: "motion" },
      causticSwirl: { type: "number", label: "Caustic Swirl Dynamics", min: 0.1, max: 2, step: 0.05, default: 0.6, section: "motion" },
      pulseGlow: { type: "number", label: "Radiant Pulse Surge", min: 0.2, max: 2.5, step: 0.05, default: 1.5, section: "motion" },
      color1: { type: "color", label: "Electric Azure Tint", default: "#00f2fe", section: "colors" },
      color2: { type: "color", label: "Secondary Violet Tone", default: "#a855f7", section: "colors" },
      color3: { type: "color", label: "Ambient Magenta Depth", default: "#ff4fd8", section: "colors" },
      rimColor: { type: "color", label: "Prismatic Dispersion Rim", default: "#ffed00", section: "colors", paletteRole: "fixed" },
      iridescence: { type: "number", label: "Spectral Split Strength", min: 0, max: 1.5, step: 0.05, default: 0.85, section: "colors" },
      glowIntensity: { type: "number", label: "Luminous Bloom Radiance", min: 0.4, max: 3, step: 0.1, default: 1.8, section: "colors" }
    }
  },
  {
    key: "SUPERPOSITION",
    id: "superposition",
    name: "Superposition",
    badge: "Quantum Wavepacket",
    description: "Orbital lobes from two quantum states beating against each other. A click measures it: the cloud collapses to one spot, then spreads out again.",
    defaultPreset: "Quantum Superposition",
    file: "superposition-engine.js",
    factoryName: "createSuperpositionEngine",
    params: {
      sampleDensity: { type: "select", label: "Quantum Samples", options: [3072, 6144, 9216, 12288], default: 6144, section: "geometry" },
      orbitalScale: { type: "number", label: "Orbital Envelope", min: 0.8, max: 2.2, step: 0.05, default: 1.45, section: "geometry" },
      nucleusRadius: { type: "number", label: "Nucleus Radius", min: 0.15, max: 0.8, step: 0.02, default: 0.38, section: "geometry" },
      stateMode: { type: "select", label: "Orbital Eigenstate", options: ["hybrid_sp", "d_orbital", "f_orbital", "chiral_vortex"], default: "d_orbital", section: "geometry" },
      pointSize: { type: "number", label: "Sample Point Size", min: 1, max: 6, step: 0.1, default: 2.8, section: "motion" },
      coherence: { type: "number", label: "Phase Coherence", min: 0, max: 1, step: 0.02, default: 0.85, section: "motion" },
      waveExcursion: { type: "number", label: "Lobe Excursion Depth", min: 0.1, max: 1.2, step: 0.05, default: 0.45, section: "motion" },
      breatheAmp: { type: "number", label: "Probability Breath", min: 0, max: 0.12, step: 5e-3, default: 0.04, section: "motion" },
      collapseStrength: { type: "number", label: "Measurement Collapse", min: 0.2, max: 2.5, step: 0.05, default: 1.4, section: "motion" },
      phaseRate: { type: "number", label: "Precession Velocity", min: 0.2, max: 3, step: 0.05, default: 1.1, section: "motion" },
      psiColorA: { type: "color", label: "Phase Real (+)", default: "#38bdf8", section: "colors" },
      psiColorB: { type: "color", label: "Phase Imaginary (-)", default: "#f43f5e", section: "colors" },
      nodalColor: { type: "color", label: "Nodal Surface Spark", default: "#e0f2fe", section: "colors" },
      glowIntensity: { type: "number", label: "Wavepacket Radiance", min: 0.4, max: 3, step: 0.1, default: 1.8, section: "colors" }
    }
  },
  {
    key: "SYNTHESIS",
    id: "synthesis",
    name: "Synthesis",
    badge: "Merging Bodies",
    description: "Four fluid bodies on a figure-eight orbit, merging through liquid bridges as they pass and pulling apart again.",
    defaultPreset: "Gemini Harmonic",
    file: "synthesis-engine.js",
    factoryName: "createSynthesisEngine",
    params: {
      envelopeRadius: { type: "number", label: "Envelope Radius", min: 1, max: 2.2, step: 0.05, default: 1.6, section: "geometry" },
      coreRadius: { type: "number", label: "Fluid Core Size", min: 0.2, max: 0.65, step: 0.02, default: 0.38, section: "geometry" },
      filamentCount: { type: "select", label: "Gravitational Filaments", options: [0, 4, 6, 8], default: 6, section: "geometry" },
      stardustDensity: { type: "select", label: "Ambient Stardust Motes", options: [32, 64, 128, 256], default: 64, section: "geometry" },
      orbitSpread: { type: "number", label: "Orbital Chord Separation", min: 0.2, max: 1.2, step: 0.02, default: 0.75, section: "motion" },
      orbitSpeed: { type: "number", label: "Choreography Velocity", min: 0.1, max: 2.5, step: 0.05, default: 0.55, section: "motion" },
      fusionTension: { type: "number", label: "Liquid Bridge Attraction", min: 0.1, max: 1.5, step: 0.05, default: 0.65, section: "motion" },
      breatheAmp: { type: "number", label: "Harmonic Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.035, section: "motion" },
      coalesceSurge: { type: "number", label: "Unified Synthesis Pulse", min: 0.2, max: 2.5, step: 0.05, default: 1.4, section: "motion" },
      color1: { type: "color", label: "Modality Azure (Core A)", default: "#4285f4", section: "colors" },
      color2: { type: "color", label: "Modality Coral (Core B)", default: "#ea4335", section: "colors" },
      color3: { type: "color", label: "Modality Amber (Core C)", default: "#fbbc05", section: "colors" },
      color4: { type: "color", label: "Modality Mint (Core D)", default: "#34a853", section: "colors" },
      veilColor: { type: "color", label: "Veil Glow", default: "#1e1b4b", section: "colors", paletteRole: "fixed" },
      glowIntensity: { type: "number", label: "Volumetric Radiance", min: 0.4, max: 3, step: 0.1, default: 1.8, section: "colors" }
    }
  },
  {
    key: "FERRO_TRAILS",
    id: "ferrotrails",
    name: "Ferro Trails",
    badge: "Ferrofluid",
    description: "A ferrofluid core whose spikes rise and fall, circled by ribbon trails that follow its field.",
    defaultPreset: "Magnetic Nebula Oval",
    file: "ferro-trails-engine.js",
    factoryName: "createFerroTrailsEngine",
    params: {
      ovalRatio: { type: "number", label: "Orb Oval Aspect Ratio", min: 0.8, max: 1.6, step: 0.02, default: 1.25, section: "geometry" },
      coreRadius: { type: "number", label: "Ferrofluid Core Radius", min: 0.8, max: 2, step: 0.05, default: 1.35, section: "geometry" },
      trailCount: { type: "select", label: "Sweeping Arc Trails", options: [6, 12, 18, 24], default: 12, section: "geometry" },
      trailDetail: { type: "select", label: "Trail Arc Resolution", options: [60, 90, 120], default: 90, section: "geometry" },
      particleMotes: { type: "select", label: "Magnetic Mote Swarm", options: [32, 64, 128], default: 64, section: "geometry" },
      arcCurvature: { type: "number", label: "Arc Curvature Bend", min: 0.2, max: 2, step: 0.05, default: 0.85, section: "motion" },
      trailSweepSpeed: { type: "number", label: "Trail Orbital Velocity", min: 0.1, max: 2.5, step: 0.05, default: 0.65, section: "motion" },
      magneticSpikes: { type: "number", label: "Magnetic Crest Excursion", min: 0, max: 0.45, step: 0.01, default: 0.16, section: "motion" },
      spikeFrequency: { type: "number", label: "Ferro Spike Density", min: 1, max: 6, step: 0.1, default: 3.2, section: "motion" },
      fluidViscosity: { type: "number", label: "Fluid Viscous Tension", min: 0.2, max: 2.5, step: 0.05, default: 0.9, section: "motion" },
      breatheAmp: { type: "number", label: "Magnetic Breathing Depth", min: 0, max: 0.12, step: 5e-3, default: 0.035, section: "motion" },
      pulseSurge: { type: "number", label: "Speech Pulse Surge", min: 0.2, max: 2.5, step: 0.05, default: 1.5, section: "motion" },
      colorLiquid: { type: "color", label: "Ferrofluid Liquid Body", default: "#0b1021", section: "colors" },
      colorCrest: { type: "color", label: "Magnetic Crest Radiance", default: "#00f0ff", section: "colors" },
      colorTrail1: { type: "color", label: "Trail Head Colour", default: "#38bdf8", section: "colors" },
      colorTrail2: { type: "color", label: "Trail Tail Colour", default: "#a855f7", section: "colors" },
      colorCore: { type: "color", label: "Magnetic Spark Core", default: "#ffffff", section: "colors", paletteRole: "fixed" },
      glowIntensity: { type: "number", label: "Volumetric Arc Radiance", min: 0.4, max: 3, step: 0.1, default: 1.8, section: "colors" }
    }
  },
  {
    key: "REGARD",
    id: "regard",
    name: "Regard",
    badge: "Attentive Gaze",
    description: "A dark sphere with one inner light that looks — at you while listening, away in quick glances while thinking. The one engine here with a front.",
    defaultPreset: "Regard Attending",
    file: "regard-engine.js",
    factoryName: "createRegardEngine",
    params: {
      // Everything is a uniform write or a number read at the next saccade.
      // haloSize sits in `geometry` for a different reason: it sets
      // frame.radius, and only a direct edit reframes the camera — a modulated
      // halo would swell past the frame edge.
      haloSize: { type: "number", label: "Halo Size", min: 1.05, max: 1.4, step: 0.01, default: 1.18, section: "geometry" },
      irisFibres: { type: "select", label: "Iris Fibres", options: [0, 12, 23, 36], default: 23, section: "geometry" },
      attention: { type: "number", label: "Attention (you → away)", min: 0, max: 1, step: 0.01, default: 0.3, section: "motion" },
      searchSpread: { type: "number", label: "Search Spread", min: 0.05, max: 1, step: 0.01, default: 0.55, section: "motion" },
      dwell: { type: "number", label: "Fixation Dwell (s)", min: 0.2, max: 3, step: 0.05, default: 0.9, section: "motion" },
      saccadeSpeed: { type: "number", label: "Glance Speed", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "motion" },
      jitter: { type: "number", label: "Fixation Drift", min: 0, max: 1, step: 0.01, default: 0.35, section: "motion" },
      blinks: { type: "number", label: "Blinkiness", min: 0, max: 1, step: 0.01, default: 0.35, section: "motion" },
      focusSize: { type: "number", label: "Focus Size", min: 0.15, max: 0.7, step: 0.01, default: 0.38, section: "motion" },
      lean: { type: "number", label: "Body Follows Gaze", min: 0, max: 1, step: 0.01, default: 0.5, section: "motion" },
      focusColor: { type: "color", label: "Focus Light", default: "#ffc978", section: "colors" },
      haloColor: { type: "color", label: "Spill & Halo", default: "#ff8a4c", section: "colors" },
      rimColor: { type: "color", label: "Rim", default: "#4f63ff", section: "colors" },
      bodyColor: { type: "color", label: "Body", default: "#05070c", section: "colors", paletteRole: "fixed" },
      focusGlow: { type: "number", label: "Focus Glow", min: 0.3, max: 2.5, step: 0.05, default: 1.2, section: "colors" },
      rimGlow: { type: "number", label: "Rim Glow", min: 0, max: 1.5, step: 0.05, default: 0.6, section: "colors" }
    }
  }
], Ap = [
  {
    key: "CHLADNI",
    id: "chladni",
    name: "Chladni Plate",
    badge: "Cymatic Resonance",
    description: "Sand gathering on the nodal lines of a vibrating plate — Chladni figures morphing as the resonance sweeps.",
    defaultPreset: "Sand Sequencing",
    file: "chladni-engine.js",
    factoryName: "createChladniEngine",
    params: {
      colorSand: { type: "color", label: "Sand Lines", default: "#ffe9b8", section: "colors" },
      colorPlate: { type: "color", label: "Plate Depth", default: "#101b2e", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#dbe7ff", section: "colors", paletteRole: "fixed" },
      sandGlow: { type: "number", label: "Sand Radiance", min: 0.3, max: 3, step: 0.05, default: 1.3, section: "colors" },
      plateLight: { type: "number", label: "Plate Light", min: 0.2, max: 2, step: 0.01, default: 0.7, section: "colors" },
      gain: { type: "number", label: "Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.1, section: "colors" },
      radius: { type: "number", label: "Plate Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      plate: { type: "select", label: "Plate Shape", options: ["circle", "square"], default: "circle", section: "geometry" },
      modeN: { type: "select", label: "Mode N", options: [2, 3, 4, 5, 6, 7], default: 4, section: "geometry" },
      modeM: { type: "select", label: "Mode M", options: [1, 2, 3, 4, 5, 6], default: 2, section: "geometry" },
      resonance: { type: "number", label: "Resonance", min: 0, max: 1, step: 0.01, default: 0.7, section: "motion" },
      lineWeight: { type: "number", label: "Line Weight", min: 0.015, max: 0.2, step: 5e-3, default: 0.05, section: "motion" },
      morphRate: { type: "number", label: "Resonance Sweep Rate", min: 0, max: 1, step: 5e-3, default: 0.24, section: "motion" },
      spinRate: { type: "number", label: "Plate Spin", min: -0.5, max: 0.5, step: 5e-3, default: 0.05, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.04, section: "motion" }
    }
  },
  {
    key: "PHYLLOTAXIS",
    id: "phyllotaxis",
    name: "Phyllotaxis",
    badge: "Golden Spiral",
    description: "The sunflower head — seeds packed by the golden angle, each swelling on its own slice of a rolling breath.",
    defaultPreset: "Sunflower Canon",
    file: "phyllotaxis-engine.js",
    factoryName: "createPhyllotaxisEngine",
    params: {
      colorCore: { type: "color", label: "Core Seeds", default: "#ffd166", section: "colors" },
      colorEdge: { type: "color", label: "Edge Seeds", default: "#e879f9", section: "colors" },
      colorBg: { type: "color", label: "Head Depth", default: "#0c0a14", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#fefce8", section: "colors", paletteRole: "fixed" },
      glow: { type: "number", label: "Seed Glow", min: 0.2, max: 2.5, step: 0.05, default: 1, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.2, max: 2, step: 0.01, default: 0.9, section: "colors" },
      gain: { type: "number", label: "Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.05, section: "colors" },
      radius: { type: "number", label: "Head Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      count: { type: "select", label: "Seed Count", options: [140, 180, 220, 280], default: 220, section: "geometry" },
      dotScale: { type: "number", label: "Seed Size", min: 0.2, max: 1.2, step: 0.01, default: 0.55, section: "motion" },
      angleDrift: { type: "number", label: "Angle Drift", min: -0.15, max: 0.15, step: 1e-3, default: 0, section: "motion" },
      dotBreath: { type: "number", label: "Seed Breath", min: 0, max: 1, step: 0.01, default: 0.55, section: "motion" },
      spinRate: { type: "number", label: "Head Spin", min: -0.5, max: 0.5, step: 5e-3, default: 0.08, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.4, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "HARMONOGRAPH",
    id: "harmonograph",
    name: "Harmonograph",
    badge: "Damped Pendulums",
    description: "A Victorian harmonograph drawing damped Lissajous ink figures — the trace slowly redrawn as the pendulums drift.",
    defaultPreset: "Ink on Vellum",
    file: "harmonograph-engine.js",
    factoryName: "createHarmonographEngine",
    params: {
      colorInk: { type: "color", label: "Ink", default: "#1d4ed8", section: "colors" },
      colorPaper: { type: "color", label: "Paper", default: "#f8f5ec", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#dbeafe", section: "colors", paletteRole: "fixed" },
      inkGlow: { type: "number", label: "Ink Glow", min: 0.3, max: 3, step: 0.05, default: 1.2, section: "colors" },
      gain: { type: "number", label: "Paper Light", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1, section: "colors" },
      radius: { type: "number", label: "Paper Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      freqA: { type: "number", label: "Pendulum A Frequency", min: 1, max: 6, step: 0.01, default: 3, section: "motion" },
      freqB: { type: "number", label: "Pendulum B Frequency", min: 1, max: 6, step: 0.01, default: 2, section: "motion" },
      damping: { type: "number", label: "Damping", min: 0.03, max: 0.5, step: 5e-3, default: 0.16, section: "motion" },
      traceLength: { type: "number", label: "Trace Length", min: 5, max: 15, step: 0.1, default: 10, section: "motion" },
      lineWeight: { type: "number", label: "Ink Weight", min: 0.6, max: 6, step: 0.05, default: 1.9, section: "motion" },
      driftRate: { type: "number", label: "Pendulum Drift", min: 0, max: 0.6, step: 5e-3, default: 0.18, section: "motion" },
      spinRate: { type: "number", label: "Paper Spin", min: -0.3, max: 0.3, step: 5e-3, default: 0.04, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.3, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.05, section: "motion" }
    }
  },
  {
    key: "ATTRACTOR",
    id: "attractor",
    name: "Clifford Attractor",
    badge: "Strange Attractor",
    description: "A strange attractor condensed from pure iteration — wisps of ink reforming as one coefficient slowly drifts.",
    defaultPreset: "Ember Wisps",
    file: "attractor-engine.js",
    factoryName: "createAttractorEngine",
    params: {
      colorEmber: { type: "color", label: "Ember Core", default: "#fbbf24", section: "colors" },
      colorWisp: { type: "color", label: "Wisp Body", default: "#6366f1", section: "colors" },
      colorBg: { type: "color", label: "Background", default: "#07060e", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#eef2ff", section: "colors", paletteRole: "fixed" },
      densityGain: { type: "number", label: "Ink Density", min: 0.3, max: 3, step: 0.05, default: 1.2, section: "colors" },
      gain: { type: "number", label: "Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.15, section: "colors" },
      radius: { type: "number", label: "Medallion Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      iterations: { type: "select", label: "Orbit Depth", options: [16, 24, 32, 40], default: 32, section: "geometry" },
      coefA: { type: "number", label: "Coefficient a", min: 1.2, max: 2.2, step: 5e-3, default: 1.7, section: "motion" },
      coefB: { type: "number", label: "Coefficient b", min: 0.8, max: 2.2, step: 5e-3, default: 1.7, section: "motion" },
      coefC: { type: "number", label: "Coefficient c", min: 0.2, max: 1.5, step: 5e-3, default: 0.6, section: "motion" },
      coefD: { type: "number", label: "Coefficient d", min: 0.2, max: 1.8, step: 5e-3, default: 1.2, section: "motion" },
      morphAmp: { type: "number", label: "Drift Depth", min: 0, max: 0.3, step: 5e-3, default: 0.18, section: "motion" },
      spinRate: { type: "number", label: "Medallion Spin", min: -0.5, max: 0.5, step: 5e-3, default: 0.05, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.04, section: "motion" }
    }
  },
  {
    key: "MAURER",
    id: "maurer",
    name: "Maurer Rose",
    badge: "Chord Web",
    description: "Peter Maurer's chord web through a rose curve — hundreds of straight lines whose envelope weaves the petals.",
    defaultPreset: "Rose Web",
    file: "maurer-rose-engine.js",
    factoryName: "createMaurerRoseEngine",
    params: {
      colorWeb: { type: "color", label: "Chord Ink", default: "#f9a8d4", section: "colors" },
      colorHeart: { type: "color", label: "Heart Depth", default: "#170b1e", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#fdf2f8", section: "colors", paletteRole: "fixed" },
      chordGlow: { type: "number", label: "Chord Radiance", min: 0.3, max: 3, step: 0.05, default: 1.25, section: "colors" },
      coreBloom: { type: "number", label: "Heart Bloom", min: 0, max: 1, step: 0.01, default: 0.5, section: "colors" },
      gain: { type: "number", label: "Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.05, section: "colors" },
      radius: { type: "number", label: "Medallion Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      petals: { type: "select", label: "Petal Count", options: [3, 4, 5, 6, 7, 8], default: 5, section: "geometry" },
      step: { type: "select", label: "Chord Step (deg)", options: [29, 51, 71, 97, 129, 151], default: 71, section: "geometry" },
      lineWeight: { type: "number", label: "Line Weight", min: 0.5, max: 4, step: 0.05, default: 1.4, section: "motion" },
      spinRate: { type: "number", label: "Web Spin", min: -0.5, max: 0.5, step: 5e-3, default: 0.06, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.04, section: "motion" }
    }
  },
  {
    key: "INKMARBLE",
    id: "inkmarble",
    name: "Ink Marbling",
    badge: "Paper Marbling",
    description: "Suminagashi striations — a striped bath sheared by six decaying stylus passes, sharp ink lines with a gold crease.",
    defaultPreset: "Suminagashi",
    file: "ink-marble-engine.js",
    factoryName: "createInkMarbleEngine",
    params: {
      colorInk: { type: "color", label: "Ink", default: "#1e1b4b", section: "colors" },
      colorPaper: { type: "color", label: "Paper Bath", default: "#fdf6e3", section: "colors" },
      colorAccent: { type: "color", label: "Gold Crease", default: "#d97706", section: "colors" },
      creaseGain: { type: "number", label: "Crease Glow", min: 0, max: 1.5, step: 0.01, default: 0.6, section: "colors" },
      gain: { type: "number", label: "Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.15, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.2, max: 2, step: 0.01, default: 0.8, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.3, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.18, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      stripeDensity: { type: "number", label: "Stripe Density", min: 3, max: 16, step: 0.1, default: 9, section: "motion" },
      swirlDepth: { type: "number", label: "Stylus Depth", min: 0.3, max: 3.5, step: 0.01, default: 1.7, section: "motion" },
      swirlFreq: { type: "number", label: "Stylus Grain", min: 0.5, max: 3.5, step: 0.01, default: 1.6, section: "motion" },
      driftSpin: { type: "number", label: "Bath Drift", min: -1, max: 1, step: 5e-3, default: 0.1, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 5e-3, default: -0.07, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  },
  {
    key: "LAVALAMP",
    id: "lavalamp",
    name: "Lava Lamp",
    badge: "Soft Metaballs",
    description: "Blobs of gel drifting, kissing and parting — a classic metaball field with depth shading and a crest glint.",
    defaultPreset: "Pink Goo",
    file: "lava-lamp-engine.js",
    factoryName: "createLavaLampEngine",
    params: {
      colorGel: { type: "color", label: "Gel Tint", default: "#fb7185", section: "colors" },
      colorGelDeep: { type: "color", label: "Gel Depth", default: "#7c2d4e", section: "colors" },
      colorSpec: { type: "color", label: "Crest Glint", default: "#ffe4e6", section: "colors", paletteRole: "fixed" },
      light: { type: "number", label: "Key Light", min: 0.1, max: 2, step: 0.01, default: 0.9, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.3, section: "colors" },
      gain: { type: "number", label: "Gel Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Gel Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.05, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.2, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      blobCount: { type: "select", label: "Blob Count", options: [3, 4, 5, 6, 7], default: 5, section: "geometry" },
      blobSpread: { type: "number", label: "Orbit Spread", min: 0.2, max: 1.2, step: 0.01, default: 0.55, section: "motion" },
      blobSize: { type: "number", label: "Blob Size", min: 0.2, max: 1.1, step: 0.01, default: 0.45, section: "motion" },
      fieldSharp: { type: "number", label: "Goo Softness", min: 0.05, max: 0.4, step: 5e-3, default: 0.08, section: "motion" },
      gooRate: { type: "number", label: "Goo Rate", min: 0.05, max: 1.5, step: 5e-3, default: 0.35, section: "motion" },
      driftSpin: { type: "number", label: "Drift", min: -1, max: 1, step: 5e-3, default: 0.08, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 5e-3, default: -0.06, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  },
  {
    key: "TRUCHET",
    id: "truchet",
    name: "Truchet Weave",
    badge: "Arc Weave",
    description: "A Truchet tiling of glowing quarter-arcs, threaded with travelling pulses — cells quietly re-thread on a slot clock.",
    defaultPreset: "Copper Circuit",
    file: "truchet-weave-engine.js",
    factoryName: "createTruchetWeaveEngine",
    params: {
      colorArc: { type: "color", label: "Arc Tint", default: "#5eead4", section: "colors" },
      colorCell: { type: "color", label: "Cell Depth", default: "#0b1220", section: "colors" },
      colorFlow: { type: "color", label: "Flow Crest", default: "#fde68a", section: "colors" },
      arcGlow: { type: "number", label: "Arc Radiance", min: 0.3, max: 3, step: 0.05, default: 1.3, section: "colors" },
      arcWidth: { type: "number", label: "Arc Width", min: 0.4, max: 2.5, step: 0.01, default: 1.1, section: "colors" },
      gain: { type: "number", label: "Weave Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Weave Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.1, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.2, max: 2, step: 0.01, default: 0.75, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.3, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.18, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      cellScale: { type: "number", label: "Tile Density", min: 3, max: 14, step: 0.05, default: 9, section: "motion" },
      flipRate: { type: "number", label: "Re-thread Rate", min: 0, max: 1.5, step: 5e-3, default: 0.22, section: "motion" },
      flowRate: { type: "number", label: "Pulse Rate", min: 0, max: 2, step: 5e-3, default: 0.8, section: "motion" },
      driftSpin: { type: "number", label: "Weave Drift", min: -1, max: 1, step: 5e-3, default: 0.1, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 5e-3, default: -0.07, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  },
  {
    key: "CAUSTICS",
    id: "caustics",
    name: "Caustic Pool",
    badge: "Water Light",
    description: "Underwater caustics — three octaves of sharpened light ridges knotting into the classic net as the water flows.",
    defaultPreset: "Shallow Water",
    file: "caustic-pool-engine.js",
    factoryName: "createCausticPoolEngine",
    params: {
      colorShallow: { type: "color", label: "Shallow Tint", default: "#67e8f9", section: "colors" },
      colorDeep: { type: "color", label: "Deep Tint", default: "#0e3a5c", section: "colors" },
      colorFilament: { type: "color", label: "Filament Light", default: "#f0fdfa", section: "colors" },
      filamentSharp: { type: "number", label: "Filament Sharpness", min: 2, max: 16, step: 0.1, default: 9, section: "colors" },
      gain: { type: "number", label: "Pool Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Pool Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.1, section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.2, max: 2, step: 0.01, default: 0.85, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.3, section: "colors" },
      haloStrength: { type: "number", label: "Atmosphere Shell", min: 0, max: 1, step: 0.01, default: 0.2, section: "colors" },
      radius: { type: "number", label: "Sphere Bounds", min: 1, max: 2.6, step: 0.05, default: 2.15, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.6, step: 0.01, default: 0.18, section: "geometry" },
      waterScale: { type: "number", label: "Water Scale", min: 0.8, max: 5, step: 0.01, default: 2.2, section: "motion" },
      warpAmp: { type: "number", label: "Refraction Wobble", min: 0, max: 2, step: 0.01, default: 0.6, section: "motion" },
      flowRate: { type: "number", label: "Flow Rate", min: 0, max: 1.5, step: 5e-3, default: 0.4, section: "motion" },
      driftSpin: { type: "number", label: "Pool Drift", min: -1, max: 1, step: 5e-3, default: 0.1, section: "motion" },
      counterSpin: { type: "number", label: "Counter-Drift", min: -1, max: 1, step: 5e-3, default: -0.07, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.12, step: 5e-3, default: 0.06, section: "motion" }
    }
  },
  {
    key: "SUPERBLOOM",
    id: "superbloom",
    name: "Superbloom",
    badge: "Superformula",
    description: "Gielis' superformula as a living bloom — petals morphing between symmetries, a glowing envelope breathing around them.",
    defaultPreset: "Morphing Peony",
    file: "superbloom-engine.js",
    factoryName: "createSuperbloomEngine",
    params: {
      colorPetal: { type: "color", label: "Petal Tint", default: "#f472b6", section: "colors" },
      colorHeart: { type: "color", label: "Heart Tint", default: "#fde68a", section: "colors" },
      colorEdge: { type: "color", label: "Edge Tint", default: "#4c1d95", section: "colors" },
      rimColor: { type: "color", label: "Rim Sheen", default: "#fdf2f8", section: "colors", paletteRole: "fixed" },
      edgeGlow: { type: "number", label: "Envelope Glow", min: 0.2, max: 3, step: 0.05, default: 1.2, section: "colors" },
      fillGradient: { type: "number", label: "Edge Fill", min: 0, max: 1, step: 0.01, default: 0.65, section: "colors" },
      gain: { type: "number", label: "Bloom Radiance", min: 0.3, max: 2.5, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Bloom Contrast", min: 0.4, max: 2.2, step: 0.01, default: 1.05, section: "colors" },
      radius: { type: "number", label: "Bloom Bounds", min: 1, max: 2.25, step: 0.05, default: 2.2, section: "geometry" },
      edgeFade: { type: "number", label: "Edge Softness", min: 0.05, max: 0.5, step: 0.01, default: 0.1, section: "geometry" },
      symmetry: { type: "select", label: "Petal Symmetry", options: [3, 4, 5, 6, 7, 8, 9], default: 6, section: "geometry" },
      pinch: { type: "number", label: "Petal Pinch", min: 0.2, max: 2, step: 5e-3, default: 0.5, section: "motion" },
      roundness: { type: "number", label: "Petal Roundness", min: 0.2, max: 3, step: 5e-3, default: 1.3, section: "motion" },
      morphRate: { type: "number", label: "Morph Rate", min: 0, max: 0.8, step: 5e-3, default: 0.16, section: "motion" },
      spinRate: { type: "number", label: "Bloom Spin", min: -0.5, max: 0.5, step: 5e-3, default: 0.06, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.05, section: "motion" }
    }
  }
], Rp = [
  {
    key: "LEDBOX",
    id: "ledbox",
    name: "LED Box",
    badge: "LED Tile Cube",
    description: "An LED tile wall wrapped on a raymarched rounded cube — blobs of light churn across the tiles, confetti flickers at the edges.",
    defaultPreset: "Signal Wall",
    file: "led-box-engine.js",
    factoryName: "createLedBoxEngine",
    params: {
      colorLit: { type: "color", label: "Lit Tile", default: "#fff2dd", section: "colors" },
      colorWall: { type: "color", label: "Wall", default: "#161616", section: "colors" },
      light: { type: "number", label: "Key Light", min: 0, max: 2, step: 0.01, default: 0.6, section: "colors" },
      gain: { type: "number", label: "Tile Radiance", min: 0.1, max: 3, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Tile Contrast", min: 0.2, max: 3, step: 0.01, default: 1, section: "colors" },
      shape: { type: "select", label: "Solid Shape", options: ["box", "octahedron", "sphere"], default: "box", section: "geometry" },
      boxSize: { type: "number", label: "Box Bounds", min: 1.1, max: 1.9, step: 0.05, default: 1.5, section: "geometry" },
      bevel: { type: "number", label: "Corner Round", min: 0.02, max: 0.3, step: 5e-3, default: 0.12, section: "geometry" },
      cells: { type: "select", label: "Tile Grid", options: [24, 32, 40, 48, 64, 80], default: 40, section: "geometry" },
      blobScale: { type: "number", label: "Blob Scale", min: 0.4, max: 3, step: 0.01, default: 1.3, section: "motion" },
      coverage: { type: "number", label: "Lit Coverage", min: 0.15, max: 0.9, step: 5e-3, default: 0.62, section: "motion" },
      confetti: { type: "number", label: "Confetti", min: 0, max: 1, step: 5e-3, default: 0.22, section: "motion" },
      churnRate: { type: "number", label: "Churn Rate", min: 0, max: 2, step: 5e-3, default: 0.5, section: "motion" },
      driftRate: { type: "number", label: "Drift Rate", min: 0, max: 2, step: 5e-3, default: 0.45, section: "motion" },
      twinkleRate: { type: "number", label: "Twinkle Rate", min: 0, max: 8, step: 0.1, default: 2, section: "motion" },
      spinRate: { type: "number", label: "Spin Rate", min: -0.5, max: 0.5, step: 5e-3, default: 0.1, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.03, section: "motion" }
    }
  },
  {
    key: "QUANTTORUS",
    id: "quanttorus",
    name: "Quantized Torus",
    badge: "Plasma Ring",
    description: "Chunky quantized plasma flowing around a raymarched torus — retro pixel waves chasing each other around the ring.",
    defaultPreset: "Circuit Ring",
    file: "quant-torus-engine.js",
    factoryName: "createQuantTorusEngine",
    params: {
      colorInk: { type: "color", label: "Ink Tone", default: "#101426", section: "colors" },
      colorPaper: { type: "color", label: "Paper Tone", default: "#cfe6ff", section: "colors" },
      light: { type: "number", label: "Key Light", min: 0.1, max: 2, step: 0.01, default: 0.9, section: "colors" },
      rim: { type: "number", label: "Rim Sheen", min: 0, max: 1.5, step: 0.01, default: 0.35, section: "colors" },
      gain: { type: "number", label: "Plasma Radiance", min: 0.1, max: 3, step: 0.05, default: 1, section: "colors" },
      contrast: { type: "number", label: "Plasma Contrast", min: 0.2, max: 3, step: 0.01, default: 1.3, section: "colors" },
      ringR: { type: "number", label: "Ring Radius", min: 1.05, max: 1.6, step: 0.05, default: 1.35, section: "geometry" },
      tubeR: { type: "number", label: "Tube Radius", min: 0.4, max: 1, step: 0.01, default: 0.65, section: "geometry" },
      profile: { type: "select", label: "Tube Profile", options: ["round", "square", "hexagon"], default: "round", section: "geometry" },
      tilt: { type: "number", label: "Ring Tilt", min: 0, max: 1.57, step: 0.01, default: 1.2, section: "motion" },
      cells: { type: "select", label: "Pixel Cells", options: [24, 32, 40, 56, 72], default: 40, section: "geometry" },
      levels: { type: "select", label: "Tone Levels", options: [2, 3, 4, 5, 6], default: 3, section: "geometry" },
      patternScale: { type: "number", label: "Plasma Scale", min: 0.6, max: 4, step: 0.01, default: 2, section: "motion" },
      plasmaAmp: { type: "number", label: "Plasma Depth", min: 0, max: 2.5, step: 0.01, default: 1, section: "motion" },
      plasmaRate: { type: "number", label: "Plasma Rate", min: 0, max: 2, step: 5e-3, default: 0.5, section: "motion" },
      spinRate: { type: "number", label: "Spin Rate", min: -1, max: 1, step: 5e-3, default: 0.12, section: "motion" },
      breatheRate: { type: "number", label: "Breath Rate", min: 0, max: 2, step: 0.05, default: 0.35, section: "motion" },
      breatheAmp: { type: "number", label: "Breath Depth", min: 0, max: 0.1, step: 5e-3, default: 0.04, section: "motion" }
    }
  }
], ba = [
  ...Sp,
  ...Mp,
  ...Ep,
  ...Tp,
  ...Rp,
  ...Ap
];
Object.fromEntries(
  ba.map((i) => [i.key, i.id])
);
Object.fromEntries(
  ba.map((i) => [
    i.id,
    {
      id: i.id,
      name: i.name,
      badge: i.badge,
      description: i.description
    }
  ])
);
const hi = Object.fromEntries(
  ba.map((i) => [i.id, i.params])
);
function Yo(i) {
  const e = hi[i] || {}, t = {};
  for (const [n, r] of Object.entries(e))
    t[n] = r.default;
  return t;
}
const wp = /speed|rate|spin|flow|rot[A-Z]|^rot/i, Cp = /* @__PURE__ */ new Set(["twistHarmonics", "hatchDensity"]), Pp = "_timeScale";
function xa(i, e) {
  return !(!e || e.type !== "number" || e.section === "geometry" || wp.test(i) || Cp.has(i));
}
function na(i) {
  const e = Math.sin(i * 127.1) * 43758.5453123;
  return e - Math.floor(e);
}
function Lp(i) {
  return i * i * (3 - 2 * i);
}
function Dp(i, e = 0) {
  const t = Math.floor(i), n = i - t, r = na(t + e * 57), a = na(t + 1 + e * 57);
  return (r + (a - r) * Lp(n)) * 2 - 1;
}
function Up(i, e = 3, t = 0) {
  let n = 0, r = 0.5, a = 1, o = 0;
  for (let s = 0; s < e; s++)
    n += Dp(i * a, t + s) * r, o += r, r *= 0.5, a *= 2;
  return o > 0 ? n / o : 0;
}
function Ip(i, e) {
  const t = e - Math.floor(e);
  switch (i) {
    case "triangle":
      return t < 0.25 ? t * 4 : t < 0.75 ? 2 - t * 4 : t * 4 - 4;
    case "saw":
      return t < 0.5 ? t * 2 : t * 2 - 2;
    case "square":
      return t < 0.5 ? 1 : -1;
    case "sampleHold":
      return na(Math.floor(e) + 1) * 2 - 1;
    case "sine":
    default:
      return Math.sin(t * Math.PI * 2);
  }
}
function Np(i, { attack: e = 0.1, hold: t = 0.05, decay: n = 0.6 }) {
  if (i < 0) return 0;
  if (i < e) return e > 0 ? i / e : 1;
  if (i < e + t) return 1;
  const r = i - e - t;
  if (n <= 0 || r >= n) return 0;
  const a = r / n;
  return 1 - a * a;
}
function ia() {
  return {
    enabled: !1,
    loopLength: 4,
    sources: {
      lfo1: { type: "lfo", shape: "sine", rate: 0.5, phase: 0 },
      noise1: { type: "noise", rate: 0.35, octaves: 3, seed: 1 },
      env1: { type: "env", attack: 0.08, hold: 0.06, decay: 0.9 },
      // Inert until an audio input is attached and pushes a level in.
      audio1: { type: "audio", gain: 1, attack: 0.5, release: 0.12 }
    },
    routes: []
  };
}
function Fp(i) {
  let e = i || ia(), t = -1 / 0, n = 0;
  function r(a) {
    const o = {};
    for (const [s, l] of Object.entries(e.sources || {}))
      l.type === "lfo" ? o[s] = Ip(l.shape, a * (l.rate ?? 0.5) + (l.phase ?? 0)) : l.type === "noise" ? o[s] = Up(a * (l.rate ?? 0.35), l.octaves ?? 3, l.seed ?? 0) : l.type === "env" ? o[s] = Np(a - t, l) : l.type === "audio" ? o[s] = Math.min(1, Math.max(0, n * (l.gain ?? 1))) : o[s] = 0;
    return o;
  }
  return {
    get config() {
      return e;
    },
    setConfig(a) {
      e = a || ia();
    },
    trigger(a) {
      t = a;
    },
    setAudioLevel(a) {
      n = Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0;
    },
    get audioLevel() {
      return n;
    },
    evaluateSources: r,
    // Returns { params, timeScale }.
    //   params    — only the keys this rack actually changed
    //   timeScale — multiplier for virtualTime integration (1 = unmodulated)
    apply(a, o, s) {
      const l = {};
      let c = 1;
      if (!e.enabled || !e.routes?.length) return { params: l, timeScale: c };
      const d = r(s), f = {};
      for (const h of e.routes) {
        if (h.enabled === !1) continue;
        const m = d[h.source];
        if (m === void 0) continue;
        const _ = h.amount ?? 0;
        if (h.dest === Pp) {
          c += _ * m;
          continue;
        }
        const b = o?.[h.dest];
        if (!xa(h.dest, b)) continue;
        const p = a[h.dest];
        if (typeof p != "number") continue;
        const u = (b.max - b.min) * 0.5;
        f[h.dest] = (f[h.dest] ?? p) + _ * m * u;
      }
      for (const [h, m] of Object.entries(f)) {
        const _ = o[h];
        l[h] = Math.min(_.max, Math.max(_.min, m));
      }
      return c = Math.min(3, Math.max(0.02, c)), { params: l, timeScale: c };
    }
  };
}
const Qs = {
  linear: (i) => i,
  easeOut: (i) => 1 - Math.pow(1 - i, 3),
  easeInOut: (i) => i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2,
  // Damped oscillation, pinned to exactly 1 at t = 1.
  spring: (i) => i <= 0 ? 0 : i >= 1 ? 1 : 1 - Math.pow(2, -10 * i) * Math.cos((i * 10 - 0.75) * (2 * Math.PI / 3)),
  // Most of the distance in the first third, then a long settle. Reads as
  // "reacted immediately, then thought about it".
  snap: (i) => i <= 0 ? 0 : i >= 1 ? 1 : 1 - Math.pow(1 - i, 6)
}, Op = ["linear", "easeOut", "easeInOut", "spring", "snap"];
function jo(i, e) {
  return (Qs[i] || Qs.linear)(e);
}
const Js = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
function Bp(i, e, t) {
  const n = Js.exec(i || ""), r = Js.exec(e || "");
  if (!n || !r) return e;
  const a = (o) => {
    const s = parseInt(n[o], 16), l = parseInt(r[o], 16);
    return Math.round(s + (l - s) * t).toString(16).padStart(2, "0");
  };
  return `#${a(1)}${a(2)}${a(3)}`;
}
function zp(i, e, t, n) {
  const r = {};
  for (const [a, o] of Object.entries(e || {})) {
    const s = t?.[a], l = i?.[a];
    if (s?.type === "number" && xa(a, s) && typeof l == "number" && typeof o == "number") {
      const c = l + (o - l) * n, d = Number.isFinite(s.min) ? s.min : -1 / 0, f = Number.isFinite(s.max) ? s.max : 1 / 0;
      r[a] = Math.min(f, Math.max(d, c));
    } else s?.type === "color" && s.section !== "geometry" ? r[a] = Bp(l, o, Math.min(1, Math.max(0, n))) : r[a] = n >= 0.5 ? o : l ?? o;
  }
  return r;
}
function Gp() {
  let i = null, e = null, t = null, n = 0, r = 0, a = "easeOut", o = !1;
  return {
    get isRunning() {
      return o;
    },
    get progress() {
      return r > 0 ? Math.min(1, n / r) : 1;
    },
    start(s, l, c, { durationMs: d = 400, easing: f = "easeOut" } = {}) {
      i = { ...s }, e = { ...l }, t = c || {}, r = Math.max(0, d), a = f, n = 0, o = !0;
    },
    advance(s) {
      if (!o) return null;
      n += Math.max(0, s);
      const l = r > 0 ? Math.min(1, n / r) : 1;
      return l >= 1 ? (o = !1, { ...e }) : zp(i, e, t, jo(a, l));
    },
    cancel() {
      o = !1;
    }
  };
}
const kp = /^#[0-9a-fA-F]{6}$/;
function ti(i) {
  return !!i && typeof i == "object" && !Array.isArray(i);
}
function Ko(i, e) {
  const t = {}, n = [];
  for (const [r, a] of Object.entries(i || {})) {
    const o = e && Object.hasOwn(e, r) ? e[r] : void 0;
    if (!o) {
      n.push(r);
      continue;
    }
    if (o.type === "number") {
      const l = typeof a == "number" || typeof a == "string" && a.trim() !== "" ? Number(a) : NaN;
      if (!Number.isFinite(l)) {
        n.push(r);
        continue;
      }
      const c = Number.isFinite(o.min) ? o.min : -1 / 0, d = Number.isFinite(o.max) ? o.max : 1 / 0;
      t[r] = Math.min(d, Math.max(c, l));
    } else o.type === "select" ? Array.isArray(o.options) && o.options.includes(a) ? t[r] = a : n.push(r) : o.type === "color" ? typeof a == "string" && kp.test(a) ? t[r] = a : n.push(r) : t[r] = a;
  }
  return { params: t, dropped: n };
}
const ir = Object.freeze([0.25, 4]), eo = Object.freeze({ durationMs: 600, easing: "easeInOut" });
function Hp(i, e) {
  return e?.type === "color" ? e.section !== "geometry" : xa(i, e);
}
function Zo(i) {
  const t = typeof i == "number" || typeof i == "string" && i.trim() !== "" ? Number(i) : NaN;
  return Number.isFinite(t) ? t : null;
}
function Vp(i, e) {
  if (!ti(i)) return { states: null, dropped: [] };
  const t = {}, n = [], r = {};
  for (const [a, o] of Object.entries(e || {}))
    Hp(a, o) && (r[a] = o);
  for (const [a, o] of Object.entries(i)) {
    if (a === "__proto__" || !ti(o)) {
      n.push(a);
      continue;
    }
    const { params: s, dropped: l } = Ko(o.params, r);
    for (const f of l) n.push(`${a}.${f}`);
    const c = Zo(o.tempo), d = c === null ? 1 : Math.min(ir[1], Math.max(ir[0], c));
    t[a] = { params: s, tempo: d };
  }
  return { states: t, dropped: n };
}
function $o(i) {
  const e = ti(i) ? i : {}, t = Zo(e.durationMs);
  return {
    durationMs: t === null ? eo.durationMs : Math.min(1e4, Math.max(0, t)),
    easing: Op.includes(e.easing) ? e.easing : eo.easing
  };
}
const Wp = Object.freeze(["dpr", "paused"]);
function Xp(i) {
  if (!ti(i)) return null;
  const e = { ...i };
  for (const t of Wp) delete e[t];
  return e;
}
function qp(i, e) {
  const { params: t, dropped: n } = Ko(i.params, e), { states: r, dropped: a } = Vp(i.states, e), o = r && typeof i.initialState == "string" && Object.hasOwn(r, i.initialState) ? i.initialState : null;
  return {
    engine: i.engine,
    params: t,
    global: ti(i.global) ? Xp(i.global) : null,
    // Detached, so a later edit to the parsed file cannot reach into whatever
    // the caller installs this in.
    modulation: ti(i.modulation) ? structuredClone(i.modulation) : null,
    states: r,
    initialState: o,
    transition: $o(i.transition),
    dropped: [...n, ...a]
  };
}
const Xr = { durationMs: 600, easing: "easeInOut" };
function Yp() {
  let i = {}, e = {}, t = {}, n = { ...Xr }, r = [], a = null;
  const o = Gp();
  let s = 1, l = 1, c = 1, d = Xr.easing, f = 0, h = 0;
  const m = (v) => typeof v == "string" && Object.hasOwn(e, v), _ = (v) => m(v) ? e[v].tempo ?? 1 : 1, b = (v) => Math.min(ir[1], Math.max(ir[0], v));
  function p(v) {
    const g = m(v) ? e[v].params || {} : {}, T = {};
    for (const C of r)
      Object.hasOwn(g, C) ? T[C] = g[C] : Object.hasOwn(i, C) && (T[C] = i[C]);
    return T;
  }
  function u() {
    s = l = c = _(a), f = h = 0;
  }
  return {
    configure(v) {
      i = { ...v.base || {} }, e = v.states || {}, t = v.defs || {}, n = { ...Xr, ...v.transition || {} }, r = [...new Set(Object.values(e).flatMap((g) => Object.keys(g.params || {})))], a = m(v.initialState) ? v.initialState : null, o.cancel(), u();
    },
    setBase(v) {
      i = { ...v }, o.cancel(), u();
    },
    targetFor: p,
    get names() {
      return Object.keys(e);
    },
    get current() {
      return a;
    },
    get tempo() {
      return s;
    },
    get isRunning() {
      return o.isRunning || f < h;
    },
    start(v, g, T) {
      if (!m(v)) return !1;
      T ?? (T = {});
      const C = Number.isFinite(T.durationMs) ? T.durationMs : n.durationMs, R = T.easing ?? n.easing;
      return a = v, o.start(g, p(v), t, { durationMs: C, easing: R }), l = s, c = _(v), d = R, f = 0, h = Math.max(0, C), !0;
    },
    advance(v) {
      const g = Number.isFinite(v) ? Math.max(0, v) : 0;
      if (f < h || h === 0 && s !== c) {
        f = Math.min(h, f + g);
        const T = h > 0 ? f / h : 1;
        s = T >= 1 ? c : b(l + (c - l) * jo(d, T));
      }
      return o.isRunning ? o.advance(g) : null;
    },
    cancel() {
      o.cancel(), u();
    }
  };
}
const ra = 0.8, Qo = 2.5;
function jp(i, e) {
  return Math.tan(e * Math.PI / 180 / 2) * i;
}
function Kp(i, e, t = ra, n = 1) {
  const r = Number.isFinite(i) && i > 0 ? i : Qo, a = Number.isFinite(t) && t > 0 ? Math.min(t, 1) : ra, o = Number.isFinite(n) && n > 0 ? Math.min(n, 1) : 1, s = e * Math.PI / 180 / 2;
  return r / (a * Math.tan(s) * o);
}
function Xi(i) {
  const e = i?.frame?.radius;
  return Number.isFinite(e) && e > 0 ? e : Qo;
}
function va(i, e, ...t) {
  if (!i) return;
  const n = i[e];
  typeof n == "function" && n.apply(i, t);
}
function qi(i, e) {
  va(i, "setParams", e);
}
function Zp(i) {
  va(i, "onPulse");
}
function $p(i, e, t) {
  va(i, "onResize", e, t);
}
const to = Object.freeze({
  // Drag-to-rotate on an ambient orb is usually a misclick, not a feature.
  controls: !1,
  // Motion belongs to the engine, not the camera.
  autoRotate: !1,
  // Only consulted when controls are on.
  enableZoom: !0,
  // Keeps the frame alive after compositing, which costs memory and bandwidth
  // on every frame. Only a caller reading pixels back needs it.
  preserveDrawingBuffer: !1
}), Qp = 2;
function Jp(i, e) {
  if (typeof i == "number" && Number.isFinite(i) && i > 0) return i;
  const t = Number.isFinite(e) && e > 0 ? e : 1;
  return Math.min(t, Qp);
}
function em(i = {}) {
  const e = i && typeof i == "object" ? i : {}, t = { ...to };
  for (const n of Object.keys(to))
    e[n] !== void 0 && (t[n] = !!e[n]);
  return t;
}
const rr = Object.freeze({
  contrast: 1,
  saturation: 1,
  grain: 0,
  edgeFade: 0,
  lightCoverage: 0
}), tm = Object.freeze({
  contrast: [0.5, 2],
  saturation: [0, 2],
  grain: [0, 0.15],
  edgeFade: [0, 1],
  lightCoverage: [0, 1]
});
function nm(i, e) {
  const t = { ...i };
  for (const n of Object.keys(rr)) {
    const r = e?.[n];
    if (typeof r != "number" || !Number.isFinite(r)) continue;
    const [a, o] = tm[n];
    t[n] = Math.min(o, Math.max(a, r));
  }
  return t;
}
function im(i, { transparent: e }) {
  return Object.keys(rr).every((t) => t === "lightCoverage" && !e ? !0 : i[t] === rr[t]);
}
const rm = {
  uniforms: {
    tDiffuse: { value: null },
    uContrast: { value: 1 },
    uSaturation: { value: 1 },
    uGrain: { value: 0 },
    uEdgeFade: { value: 0 },
    uLightCoverage: { value: 0 },
    uSeed: { value: 0 },
    uCenter: { value: new be(0.5, 0.5) },
    uRadius: { value: 0.8 },
    uAspect: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float uContrast;
    uniform float uSaturation;
    uniform float uGrain;
    uniform float uEdgeFade;
    uniform float uLightCoverage;
    uniform float uSeed;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform float uAspect;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(443.897, 441.423));
      p += dot(p, p.yx + 19.19);
      return fract((p.x + p.y) * p.x);
    }

    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 rgb = src.rgb;
      float a = src.a;
      float peak = max(rgb.r, max(rgb.g, rgb.b));
      float presence = clamp(max(a, peak * 4.0), 0.0, 1.0);

      float luma = dot(rgb, vec3(0.2126, 0.7152, 0.0722));
      rgb = mix(vec3(luma), rgb, uSaturation);
      // An S-curve, not a linear stretch: it keeps 0 and 1 fixed, so soft
      // glow edges steepen instead of clipping or crushing. Mirrors
      // contrastCurve() in this file.
      // Kept off exactly 0 and 1: some mobile drivers lower pow() to
      // exp2(k * log2(x)), which is NaN at 0 and would poison empty pixels.
      vec3 x = clamp(rgb, 1e-6, 1.0 - 1e-6);
      vec3 xk = pow(x, vec3(uContrast));
      vec3 yk = pow(1.0 - x, vec3(uContrast));
      vec3 graded = xk / (xk + yk);
      rgb = mix(rgb, graded, presence);

      // Seeded from virtual time, so a paused orb holds still instead of
      // crawling with static.
      float n = hash(gl_FragCoord.xy + uSeed) - 0.5;
      rgb += n * uGrain * presence;

      if (uEdgeFade > 0.0) {
        // Distance from the orb's centre in viewport half-heights, the unit
        // uRadius is measured in.
        float d = length((vUv - uCenter) * vec2(uAspect, 1.0)) * 2.0;
        float inner = uRadius * (1.0 - 0.6 * uEdgeFade);
        float outer = uRadius * (1.0 + 0.25 * uEdgeFade);
        float mask = 1.0 - smoothstep(inner, outer, d);
        rgb *= mask;
        a *= mask;
      }

      // Glow carries colour with little coverage. Scaling by 4, as presence
      // does, lets a bright halo reach full coverage at lightCoverage 1, so
      // over a light page it shows as its own colour rather than a pale tint.
      // rgb is untouched, so over black nothing changes.
      a = max(a, clamp(max(rgb.r, max(rgb.g, rgb.b)) * 4.0 * uLightCoverage, 0.0, 1.0));
      gl_FragColor = vec4(max(rgb, 0.0), a);
    }
  `
  )
};
function am() {
  const i = new _a(rm);
  i.enabled = !1;
  const e = i.material.uniforms;
  let t = { ...rr }, n = !1;
  return {
    pass: i,
    get settings() {
      return t;
    },
    // Takes the whole global bag; only the five finish keys are read.
    set(r, { transparent: a } = {}) {
      t = nm(t, r), a !== void 0 && (n = !!a), e.uContrast.value = t.contrast, e.uSaturation.value = t.saturation, e.uGrain.value = t.grain, e.uEdgeFade.value = t.edgeFade, e.uLightCoverage.value = n ? t.lightCoverage : 0, i.enabled = !im(t, { transparent: n });
    },
    frame({ center: r, radius: a, aspect: o, seed: s }) {
      e.uCenter.value.set(r[0], r[1]), e.uRadius.value = a, e.uAspect.value = o, e.uSeed.value = s;
    }
  };
}
function sm(i) {
  if (typeof i != "string") return null;
  let e = i.trim().replace(/^#/, "").toLowerCase();
  return /^[0-9a-f]{3}$/.test(e) && (e = [...e].map((t) => t + t).join("")), /^[0-9a-f]{6}$/.test(e) ? [0, 2, 4].map((t) => parseInt(e.slice(t, t + 2), 16) / 255) : null;
}
const om = {
  uniforms: {
    tDiffuse: { value: null },
    uColor: { value: new D() },
    uOpaque: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform vec3 uColor;
    uniform float uOpaque;
    varying vec2 vUv;
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      float coverage = clamp(src.a, 0.0, 1.0);
      vec3 rgb = src.rgb + uColor * (1.0 - coverage) * uOpaque;
      // Transparent mode keeps the orb's own coverage so the host page shows
      // through; opaque mode is fully covered by the backdrop.
      gl_FragColor = vec4(rgb, mix(coverage, 1.0, uOpaque));
    }
  `
  )
};
function lm() {
  const i = new _a(om), { uColor: e, uOpaque: t } = i.material.uniforms;
  return {
    pass: i,
    // `transparent` wins over `background`, matching the global settings.
    // An unparseable colour leaves the current one in place.
    set({ background: n, transparent: r } = {}) {
      r !== void 0 && (t.value = r ? 0 : 1);
      const a = sm(n);
      a && e.value.set(...a);
    }
  };
}
function Jo(i) {
  i.blending = ao, i.blendEquation = un, i.blendSrc = i.premultipliedAlpha ? Yi : Zi, i.blendDst = Yi, i.blendSrcAlpha = so, i.blendDstAlpha = Yi, i.needsUpdate = !0;
}
function cm(i) {
  i?.blendMaterial && Jo(i.blendMaterial);
}
function um(i) {
  i?.traverse((e) => {
    const { material: t } = e;
    if (t)
      for (const n of Array.isArray(t) ? t : [t])
        n.blending === pi && Jo(n);
  });
}
class dm {
  constructor(e, t = {}) {
    this.container = e, this.options = t;
    const { controls: n, autoRotate: r, enableZoom: a, preserveDrawingBuffer: o } = em(t);
    this.scene = new sp();
    const { width: s, height: l } = this.measureContainer();
    this.camera = new Pt(45, s / l, 0.1, 100), this.camera.position.set(0, 0, 9), this.renderer = new Wo({
      antialias: !0,
      alpha: !0,
      // Forces the GPU to keep the frame around after compositing. Only a
      // consumer calling toDataURL needs it; everyone else paid for it.
      preserveDrawingBuffer: o,
      powerPreference: "high-performance"
    }), this.renderer.setPixelRatio(Jp(t.pixelRatio, globalThis.devicePixelRatio)), this.renderer.setSize(s, l), this.renderer.toneMapping = sa, this.renderer.toneMappingExposure = 1.1, this.renderer.outputColorSpace = ot, this.container.appendChild(this.renderer.domElement), this.controlsTarget = new D(0, 0, 0), this.controls = null, n && (this.controls = new cp(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.05, this.controls.enableZoom = a, this.controls.autoRotate = r, this.controls.autoRotateSpeed = 1, this.controls.target = this.controlsTarget), this.pointerTracker = xp(this.renderer.domElement), this.fpsTracker = yp(), this.smoothedPointer = new be(0, 0), this.finishProbe = new D(), this.clickPulseTracker = vp(this.renderer.domElement, () => {
      Zp(this.activeEngine), this.modulation.trigger(this.virtualTime);
    }), this.modulation = Fp(ia()), this.baseParams = {}, this.paramDefs = {}, this.lastModulated = {}, this.statePlayer = Yp(), this.audioSource = t.audioSource ?? null, this.initPostProcessing(), this.engineConstructors = /* @__PURE__ */ new Map(), this.activeEngine = null, this.activeEngineType = null, this.clock = new Xo(), this.virtualTime = 0, this.frameStep = 0, this.timeScale = 1, this.isPaused = !1, this.handleResize = this.onWindowResize.bind(this), this.resizeObserver = new ResizeObserver(() => this.handleResize()), this.resizeObserver.observe(this.container);
  }
  initPostProcessing() {
    this.composer = new pp(this.renderer), this.renderPass = new mp(this.scene, this.camera), this.composer.addPass(this.renderPass), this.bloomPass = new ei(
      new be(window.innerWidth, window.innerHeight),
      // Overwritten by updateGlobalSettings on the first state sync; kept in step
      // with DEFAULT_GLOBAL_SETTINGS so the very first frame is not brighter than
      // every frame after it.
      0.25,
      // strength
      0.25,
      // radius
      0.35
      // threshold
    ), this.composer.addPass(this.bloomPass), cm(this.bloomPass), this.outputPass = new bp(), this.composer.addPass(this.outputPass), this.finish = am(), this.composer.addPass(this.finish.pass), this.background = lm(), this.composer.addPass(this.background.pass), this.renderer.setClearColor(0, 0), this.scene.background = null;
  }
  registerEngine(e, t) {
    this.engineConstructors.set(e, t);
  }
  // Mounts an engine. Takes that engine's own params, not a store keyed by
  // every engine type: the runtime has no opinion about how a host organises
  // state, and asking for `state.engines[type]` made the studio's store shape
  // part of the published API.
  //
  // Returns true when an engine was actually constructed, so a caller that
  // needs to rebuild something on a real swap can tell that from a no-op.
  mountEngine(e, { params: t = {}, global: n = {}, modulation: r, states: a = null, initialState: o = null, transition: s = null } = {}) {
    const l = s ? $o(s) : null, c = (f) => this.statePlayer.configure({
      base: f,
      states: a,
      initialState: o,
      transition: l,
      defs: hi[e] || {}
    });
    if (this.activeEngineType === e && this.activeEngine)
      return c({ ...t }), this.applyParams({ params: t, global: n, modulation: r }), !1;
    this.activeEngine && (this.activeEngine.dispose(), this.activeEngine = null);
    const d = this.engineConstructors.get(e);
    if (!d) {
      console.error(`Engine type "${e}" not registered.`);
      return;
    }
    return this.activeEngineType = e, this.camera.fov = 45, this.camera.updateProjectionMatrix(), this.controls && (this.controls.enablePan = !0), this.activeEngine = d({
      studio: this,
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      composer: this.composer,
      pointerTracker: this.pointerTracker,
      params: t,
      global: n
    }), this.frameActiveEngine(), this.baseParams = { ...t }, this.paramDefs = hi[e] || {}, this.lastModulated = {}, r && this.syncModulation({ modulation: r }), this.updateGlobalSettings(n), qi(this.activeEngine, t), this.onWindowResize(), c(this.baseParams), this.applyCurrentState(), this.refitCamera(), !0;
  }
  // Applies params to the already-mounted engine. Cancelling an in-flight tween
  // because a direct edit supersedes it is a *host* policy, so it no longer
  // happens here — the studio does it before calling this.
  applyParams({ params: e = {}, global: t = {}, modulation: n } = {}) {
    if (n && this.syncModulation({ modulation: n }), this.updateGlobalSettings(t), this.activeEngine && this.activeEngineType) {
      const r = e;
      this.baseParams = { ...r }, this.paramDefs = hi[this.activeEngineType] || {}, this.lastModulated = {}, this.statePlayer.setBase(this.baseParams), qi(this.activeEngine, r), this.applyCurrentState(), this.refitCamera();
    }
  }
  // A config that names an initial state starts there, not at the base look.
  // Also re-run after a direct edit, which replaces the base look and so drops
  // the current state's patch. Both are a hard cut: in the first case there is
  // nothing on screen yet to transition from, in the second the host just
  // asked for exactly these values.
  applyCurrentState() {
    const e = this.statePlayer.current;
    e && (this.statePlayer.start(e, this.baseParams, { durationMs: 0 }), this.stepStateTransition(0));
  }
  // Moves toward a named state. The host calls this; nothing calls back up.
  // An unknown name is a typo in someone's app, so it warns and does nothing
  // rather than throwing inside their render loop.
  setState(e, t = {}) {
    const n = this.statePlayer.start(e, this.baseParams, t ?? {});
    if (!n) {
      const r = this.statePlayer.names;
      console.warn(`setState: no state named "${e}". ${r.length ? `Known: ${r.join(", ")}.` : "This config has no states."}`);
    }
    return n;
  }
  get state() {
    return this.statePlayer.current;
  }
  get stateNames() {
    return this.statePlayer.names;
  }
  // Applies one step of a running transition to the base params. The pattern
  // is the studio's own tween step: write base, then send the engine only what
  // changed. Keys it sends are forgotten by applyModulatedParams so a route on
  // the same key re-sends its modulated value over the bare eased one.
  stepStateTransition(e) {
    const t = this.statePlayer.advance(e);
    if (!t || !this.activeEngine) return;
    const n = {};
    for (const [r, a] of Object.entries(t))
      Object.is(this.baseParams[r], a) || (n[r] = a);
    Object.assign(this.baseParams, t);
    for (const r of Object.keys(n)) delete this.lastModulated[r];
    Object.keys(n).length && qi(this.activeEngine, n);
  }
  // Modulation lives in app state so it round-trips through export and presets.
  // Called from both setEngine and updateParameters so the rack always reflects
  // whatever the Motion Lab last wrote.
  syncModulation(e) {
    if (e?.modulation) {
      this.modulation.setConfig(e.modulation);
      const t = e.modulation.sources?.audio1;
      t && this.audioSource?.setOptions && this.audioSource.setOptions({ attack: t.attack, release: t.release });
    }
  }
  updateGlobalSettings(e) {
    e && (e.dpr !== void 0 && (this.renderer.setPixelRatio(e.dpr), this.composer.setPixelRatio(e.dpr)), e.exposure !== void 0 && (this.renderer.toneMappingExposure = e.exposure), e.bloomStrength !== void 0 && (this.bloomPass.strength = e.bloomStrength), e.bloomRadius !== void 0 && (this.bloomPass.radius = e.bloomRadius), e.bloomThreshold !== void 0 && (this.bloomPass.threshold = e.bloomThreshold), e.autoRotate !== void 0 && this.controls && (this.controls.autoRotate = e.autoRotate), e.autoRotateSpeed !== void 0 && this.controls && (this.controls.autoRotateSpeed = e.autoRotateSpeed), e.timeScale !== void 0 && (this.timeScale = e.timeScale), e.paused !== void 0 && (this.isPaused = e.paused), this.background.set({ background: e.background, transparent: e.transparentBg }), this.finish.set(e, { transparent: e.transparentBg }));
  }
  // Push only what actually changed. Engines fan params out to uniforms on every
  // setParams call, so sending all ~20 keys at 60fps would be wasteful — and when
  // a route is removed the engine is still holding the last modulated value, so
  // those keys have to be explicitly restored to base exactly once.
  applyModulatedParams(e) {
    if (!this.activeEngine) return;
    const t = {};
    let n = !1;
    for (const [r, a] of Object.entries(e))
      (this.lastModulated[r] === void 0 || Math.abs(this.lastModulated[r] - a) > 1e-4) && (t[r] = a, n = !0);
    for (const r of Object.keys(this.lastModulated))
      e[r] === void 0 && this.baseParams[r] !== void 0 && (t[r] = this.baseParams[r], n = !0);
    this.lastModulated = { ...e }, n && qi(this.activeEngine, t);
  }
  // Falls back to the viewport when the container has no layout yet — a common
  // case when the orb is constructed before its parent is shown. The observer
  // corrects it the moment real dimensions exist.
  measureContainer() {
    const e = this.container?.clientWidth || window.innerWidth, t = this.container?.clientHeight || window.innerHeight;
    return { width: Math.max(1, e), height: Math.max(1, t) };
  }
  onWindowResize() {
    const { width: e, height: t } = this.measureContainer();
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.composer.setSize(e, t), $p(this.activeEngine, e, t), this.refitCamera();
  }
  // The camera distance that frames `radius` at the standard fill in the current
  // view, whichever of its sides is narrower.
  framingDistance(e = Xi(this.activeEngine)) {
    return Kp(e, this.camera.fov, ra, this.camera.aspect);
  }
  // Frames the active engine at a consistent fraction of the viewport. Engines
  // declare the world radius they occupy; a fixed distance for all eight is what
  // left Hopf cropped at 1.34 of the visible half-height and Singularity at 0.46.
  frameActiveEngine() {
    const e = Xi(this.activeEngine);
    this.framedRadius = e, this.framedDistance = this.framingDistance(e), this.camera.position.set(0, 0, this.framedDistance), this.camera.updateProjectionMatrix(), this.camera.lookAt(0, 0, 0), this.controlsTarget.set(0, 0, 0), this.controls?.update();
  }
  // The distance framing asks for changes when an engine reports a new
  // frame.radius from setParams (a size slider) or when the view changes shape.
  // Nothing used to follow either: a size slider grew the orb past the frame edge
  // and left it there, and a resize to portrait ran it off the sides. Re-framing
  // wholesale is not the fix: it snaps the camera back to the front and resets
  // the orbit target, discarding whatever view the user had set up. The distance
  // is scaled along the direction they already look from, by the ratio the
  // framing changed, so a zoom they set is kept.
  refitCamera() {
    if (!this.activeEngine || !(this.framedDistance > 0)) return;
    const e = Xi(this.activeEngine), t = this.framingDistance(e);
    if (this.framedRadius = e, Math.abs(t - this.framedDistance) < 1e-6) return;
    const n = this.camera.position.clone().sub(this.controlsTarget);
    n.length() < 1e-6 || (n.multiplyScalar(t / this.framedDistance), this.framedDistance = t, this.camera.position.copy(this.controlsTarget.clone().add(n)), this.controls?.update());
  }
  resetCamera() {
    this.camera.fov = 45, this.frameActiveEngine();
  }
  togglePlayPause() {
    return this.isPaused = !this.isPaused, this.isPaused;
  }
  // Advances time and parameters by one step. Separate from render() because a
  // host may advance state and then draw something else entirely — the studio's
  // variation grid renders N scissored viewports and never touches the composer.
  advance(e) {
    this.audioSource?.isActive && this.modulation.setAudioLevel(this.audioSource.read()), this.stepStateTransition(e * 1e3);
    const t = this.modulation.apply(this.baseParams, this.paramDefs, this.virtualTime);
    return this.frameStep = this.isPaused ? 0 : e * this.timeScale * t.timeScale * this.statePlayer.tempo, this.virtualTime += this.frameStep, this.applyModulatedParams(t.params), t;
  }
  // Where the orb is on screen, for the finish pass's edge fade. The orb sits
  // at the world origin, not the orbit target: panning moves the target and the
  // camera but never the engine. Its radius in viewport half-heights follows
  // from the engine's frame hint and the camera distance, so a zoom, a pan or a
  // portrait container moves the fade with it.
  updateFinishFrame() {
    if (!this.finish.pass.enabled) return;
    this.camera.updateMatrixWorld();
    const e = this.finishProbe.set(0, 0, 0).project(this.camera), t = jp(this.camera.position.length(), this.camera.fov);
    this.finish.frame({
      center: [(e.x + 1) / 2, (e.y + 1) / 2],
      radius: t > 0 ? Xi(this.activeEngine) / t : 1,
      aspect: this.camera.aspect,
      // Steps 24 times a second of virtual time: film-like, and frozen on pause.
      seed: Math.floor(this.virtualTime * 24) % 997 * 0.618
    });
  }
  // Draws the active engine through the composer. Time comes from the last
  // advance(), never from an argument, so drawing cannot disagree with it.
  render() {
    if (this.smoothedPointer.lerp(this.pointerTracker.pointer, 0.08), this.controls?.update(), this.camera.updateMatrixWorld(), this.activeEngine) {
      const e = this.renderer.getPixelRatio(), t = this.fpsTracker.getMarchQuality(e);
      this.activeEngine.update({
        time: this.virtualTime,
        delta: this.frameStep,
        pointer: this.smoothedPointer,
        marchQuality: t,
        fps: this.fpsTracker.fps
      });
    }
    this.updateFinishFrame(), um(this.scene), this.composer.render();
  }
  // One frame, for a host with nothing to interleave.
  tick(e) {
    this.fpsTracker.tick(), this.advance(e), this.render();
  }
  // A refused microphone is a normal outcome, not an error.
  // Attach or replace the level source driving `audio1`. Pass null to detach —
  // routes then read 0 and go inert rather than freezing at their last value,
  // which is what made a stopped microphone look like a stuck orb.
  setAudioSource(e) {
    this.audioSource = e ?? null, this.audioSource || this.modulation.setAudioLevel(0);
  }
  // The host stops its own loop; a runtime that never started one cannot end it.
  dispose() {
    this.resizeObserver?.disconnect(), this.clickPulseTracker?.dispose(), this.pointerTracker?.dispose(), this.controls?.dispose(), this.activeEngine?.dispose(), this.background?.pass.dispose(), this.finish?.pass.dispose(), this.composer?.dispose(), this.renderer?.dispose(), this.renderer?.domElement?.remove();
  }
}
function no({ engines: i = {}, template: e = null, config: t = null, engine: n = null, params: r = null, global: a = null, state: o = null } = {}) {
  const s = { ...i };
  let l = t;
  e && (s[e.config.engine] = e.engine, l = e.config);
  const c = Object.keys(s), d = l?.engine ?? n ?? (c.length === 1 ? c[0] : null);
  if (!d) return { engines: s, engine: null, mount: null, dropped: [] };
  const f = hi[d] || {};
  let h = { ...Yo(d), ...r || {} }, m = a || {}, _, b = null, p = null, u = null, v = [];
  if (l) {
    const g = qp(l, f);
    v = g.dropped, h = { ...h, ...g.params }, g.global && (m = { ...m, ...g.global }), g.modulation && (_ = g.modulation), b = g.states, u = g.transition, p = o && b && Object.hasOwn(b, o) ? o : g.initialState;
  }
  return {
    engines: s,
    engine: d,
    mount: { params: h, global: m, modulation: _, states: b, initialState: p, transition: u },
    dropped: v
  };
}
function pm(i, e = {}) {
  const {
    engines: t = {},
    template: n = null,
    config: r = null,
    engine: a = null,
    params: o = null,
    global: s = null,
    state: l = null,
    autoStart: c = !0,
    ...d
  } = e;
  if (!i) throw new TypeError("createOrb(container, …) needs a container element.");
  const f = new dm(i, d), h = no({ engines: t, template: n, config: r, engine: a, params: o, global: s, state: l });
  for (const [g, T] of Object.entries(h.engines)) {
    if (typeof T != "function") {
      console.error(`createOrb: engine "${g}" is not a factory function.`);
      continue;
    }
    f.registerEngine(g, T);
  }
  const { dropped: m } = h;
  h.engine && f.mountEngine(h.engine, h.mount);
  let _ = { ...h.mount?.params || {} }, b = null;
  function p() {
    b = requestAnimationFrame(p), f.tick(f.clock.getDelta());
  }
  function u() {
    b === null && (f.clock.getDelta(), b = requestAnimationFrame(p));
  }
  function v() {
    b !== null && (cancelAnimationFrame(b), b = null);
  }
  return c && u(), {
    runtime: f,
    start: u,
    stop: v,
    get isRunning() {
      return b !== null;
    },
    // Keys the config carried that the engine's schema does not define. Worth
    // surfacing rather than swallowing: it is usually a version mismatch.
    dropped: m,
    setEngine(g, T = {}) {
      return _ = { ...Yo(g), ...T.params || {} }, f.mountEngine(g, {
        params: { ..._ },
        global: T.global || {},
        modulation: T.modulation
      });
    },
    setParams(g, T = {}) {
      _ = { ..._, ...g || {} }, f.applyParams({ params: { ..._ }, global: T });
    },
    loadConfig(g, { state: T = null } = {}) {
      const C = no({ config: g, state: T });
      return C.engine ? (_ = { ...C.mount.params }, f.mountEngine(C.engine, C.mount), { engine: C.engine, dropped: C.dropped }) : (console.error("loadConfig: the config does not name an engine, so there is nothing to mount."), { engine: null, dropped: C.dropped });
    },
    // Moves toward a named state from the config or template. Returns false,
    // and warns, for a name the config does not define.
    setState(g, T) {
      return f.setState(g, T);
    },
    get state() {
      return f.state;
    },
    get states() {
      return f.stateNames;
    },
    // Anything with `.read() → 0..1` and `.isActive`. Deliberately not a
    // microphone: see the note in ./audio about why consent is the consumer's.
    setAudioSource(g) {
      f.setAudioSource(g);
    },
    dispose() {
      v(), f.dispose();
    }
  };
}
const el = Math.PI * 2;
function fm(i, e, t, n = el) {
  const r = (i + e * t) % n;
  return r < 0 ? r + n : r;
}
function hm() {
  const i = /* @__PURE__ */ new Map();
  let e = null, t = 0;
  return {
    // Returns the virtual step this frame, in case a caller wants it directly.
    advance(n) {
      const r = typeof n == "number" && Number.isFinite(n) ? n : e ?? 0;
      return t = e === null ? 0 : Math.max(0, r - e), e = r, t;
    },
    phase(n, r, a = el) {
      const o = fm(i.get(n) ?? 0, t, r, a);
      return i.set(n, o), o;
    }
  };
}
const ui = {
  detail: 5,
  radius: 1.5,
  displaceAmount: 0.18,
  displaceScale: 1.4,
  displaceOctaves: 3,
  breatheSpeed: 0.35,
  breatheAmp: 0.04,
  driftSpeed: 0.25,
  pulseDeform: 0.25,
  transmission: 0.85,
  thickness: 1.2,
  ior: 1.42,
  roughness: 0.15,
  bodyColor: "#2dd4bf",
  coreColor: "#ffed00",
  coreIntensity: 1.6,
  fresnelPower: 2.5
};
function qr(i, e, t, n) {
  const r = Number(i);
  return Number.isFinite(r) ? Math.min(t, Math.max(e, Math.round(r))) : n;
}
function io(i) {
  const e = Math.max(0, Number(i.radius) || 0), t = Math.abs(Number(i.breatheAmp) || 0) * e, n = Math.abs(Number(i.displaceAmount) || 0), r = Math.abs(Number(i.pulseDeform) || 0);
  return Math.max(0.1, (e + t + n + r) * 1.05);
}
function mm({ scene: i, params: e }) {
  const t = {
    ...ui,
    ...e
  }, n = new di();
  i.add(n);
  const r = new ht({
    defines: {
      DISPLACE_OCTAVES: qr(t.displaceOctaves, 1, 4, 3)
    },
    uniforms: {
      // uTime remains only for the fbm surface drift, whose noise domain is
      // aperiodic and so has no seamless wrap. Everything periodic accumulates.
      uTime: { value: 0 },
      uBreathePhase: { value: 0 },
      uCausticAPhase: { value: 0 },
      uCausticBPhase: { value: 0 },
      uVeilPhase: { value: 0 },
      uDisplaceAmount: { value: t.displaceAmount },
      uDisplaceScale: { value: t.displaceScale },
      uBreatheSpeed: { value: t.breatheSpeed },
      uBreatheAmp: { value: t.breatheAmp },
      uDriftSpeed: { value: t.driftSpeed },
      uPulse: { value: 0 },
      uPulseDeform: { value: t.pulseDeform },
      uTransmission: { value: t.transmission },
      uThickness: { value: t.thickness },
      uIor: { value: t.ior },
      uRoughness: { value: t.roughness },
      uBodyColor: { value: new We(t.bodyColor) },
      uCoreColor: { value: new We(t.coreColor) },
      uCoreIntensity: { value: t.coreIntensity },
      uFresnelPower: { value: t.fresnelPower }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uBreathePhase;
      uniform float uDisplaceAmount;
      uniform float uDisplaceScale;
      uniform float uBreatheSpeed;
      uniform float uBreatheAmp;
      uniform float uDriftSpeed;
      uniform float uPulse;
      uniform float uPulseDeform;

      varying vec3 vLocalPosition;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying float vSurfaceNoise;

      float hash31(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
      }

      float valueNoise(vec3 p) {
        vec3 cell = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        float n000 = hash31(cell);
        float n100 = hash31(cell + vec3(1.0, 0.0, 0.0));
        float n010 = hash31(cell + vec3(0.0, 1.0, 0.0));
        float n110 = hash31(cell + vec3(1.0, 1.0, 0.0));
        float n001 = hash31(cell + vec3(0.0, 0.0, 1.0));
        float n101 = hash31(cell + vec3(1.0, 0.0, 1.0));
        float n011 = hash31(cell + vec3(0.0, 1.0, 1.0));
        float n111 = hash31(cell + vec3(1.0, 1.0, 1.0));

        float nearY0 = mix(n000, n100, f.x);
        float nearY1 = mix(n010, n110, f.x);
        float farY0 = mix(n001, n101, f.x);
        float farY1 = mix(n011, n111, f.x);
        return mix(mix(nearY0, nearY1, f.y), mix(farY0, farY1, f.y), f.z) * 2.0 - 1.0;
      }

      float surfaceFbm(vec3 p) {
        mat3 octaveTurn = mat3(
          0.00, 0.80, 0.60,
          -0.80, 0.36, -0.48,
          -0.60, -0.48, 0.64
        );
        float value = valueNoise(p) * 0.56;
        float weight = 0.56;
#if DISPLACE_OCTAVES > 1
        p = octaveTurn * p * 2.03 + vec3(1.7, -2.1, 0.8);
        value += valueNoise(p) * 0.27;
        weight += 0.27;
#endif
#if DISPLACE_OCTAVES > 2
        p = octaveTurn * p * 2.01 + vec3(-1.3, 0.5, 2.4);
        value += valueNoise(p) * 0.12;
        weight += 0.12;
#endif
#if DISPLACE_OCTAVES > 3
        p = octaveTurn * p * 1.97 + vec3(0.7, 1.9, -2.6);
        value += valueNoise(p) * 0.05;
        weight += 0.05;
#endif
        return value / weight;
      }

      vec3 displaceSurface(vec3 direction, float baseRadius, out float surfaceNoise) {
        vec3 drift = vec3(0.73, -0.41, 0.57) * uTime * uDriftSpeed;
        surfaceNoise = surfaceFbm(direction * uDisplaceScale + drift);
        vec3 pulseDrift = vec3(-0.31, 0.67, 0.44) * uTime * uDriftSpeed;
        float pulseNoise = valueNoise(direction * (uDisplaceScale * 2.35 + 1.2) + pulseDrift);

        float breathe = 1.0 + sin(uBreathePhase) * uBreatheAmp;
        float pulseOffset = uPulse * uPulseDeform * (0.12 + pulseNoise * 0.72);
        float displacedRadius = (baseRadius + surfaceNoise * uDisplaceAmount + pulseOffset) * breathe;
        return direction * max(displacedRadius, baseRadius * 0.2);
      }

      void main() {
        float baseRadius = length(position);
        vec3 direction = normalize(position);

        // Moving the sample point, rather than the mesh, lets features migrate
        // through a body that remains visibly at rest.
        float surfaceNoise;
        vec3 displaced = displaceSurface(direction, baseRadius, surfaceNoise);

        // Reconstruct the normal from the continuous displacement field instead
        // of the mesh triangles so liquid contours stay smooth at every detail.
        vec3 tangent = normalize(
          abs(direction.y) < 0.9
            ? cross(direction, vec3(0.0, 1.0, 0.0))
            : cross(direction, vec3(1.0, 0.0, 0.0))
        );
        vec3 bitangent = normalize(cross(direction, tangent));
        float tangentNoise;
        float bitangentNoise;
        float sampleStep = 0.012;
        vec3 tangentPosition = displaceSurface(
          normalize(direction + tangent * sampleStep),
          baseRadius,
          tangentNoise
        );
        vec3 bitangentPosition = displaceSurface(
          normalize(direction + bitangent * sampleStep),
          baseRadius,
          bitangentNoise
        );
        vec3 localNormal = normalize(cross(tangentPosition - displaced, bitangentPosition - displaced));
        if (dot(localNormal, direction) < 0.0) localNormal = -localNormal;

        vLocalPosition = displaced;
        vSurfaceNoise = surfaceNoise;
        vWorldNormal = normalize(mat3(modelMatrix) * localNormal);
        vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float uCausticAPhase;
      uniform float uCausticBPhase;
      uniform float uVeilPhase;
      uniform float uTransmission;
      uniform float uThickness;
      uniform float uIor;
      uniform float uRoughness;
      uniform vec3 uBodyColor;
      uniform vec3 uCoreColor;
      uniform float uCoreIntensity;
      uniform float uFresnelPower;

      varying vec3 vLocalPosition;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying float vSurfaceNoise;

      void main() {
        vec3 normal = normalize(vWorldNormal);
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        if (dot(normal, viewDirection) < 0.0) normal = -normal;

        float facing = clamp(dot(normal, viewDirection), 0.0, 1.0);
        float fresnel = pow(1.0 - facing, max(uFresnelPower, 0.001));
        vec3 refracted = refract(-viewDirection, normal, 1.0 / max(uIor, 1.001));

        // Environment, absorption and highlights all follow the authored body
        // and core colours. Hardcoded teal/water terms made every palette read
        // as the same glass of water. Keep in step with aqueous-color.js.
        vec3 body = uBodyColor;
        float horizon = smoothstep(-0.82, 0.92, refracted.y + normal.y * 0.12);
        float sideLight = pow(max(dot(refracted, normalize(vec3(-0.62, 0.48, 0.62))), 0.0), 6.0);
        vec3 deep = body * 0.09;
        vec3 mid = body * 0.46;
        vec3 clearLift = mix(body * 0.72, body + (vec3(1.0) - body) * 0.18, 0.35);
        vec3 environment = mix(deep, clearLift, horizon);
        environment = mix(environment, mid, 0.18 + facing * 0.12);
        environment += mix(body, uCoreColor, 0.22) * sideLight * 0.28;

        float travel = uThickness * mix(0.42, 1.18, 1.0 - facing);
        vec3 absorption = exp(-(vec3(1.0) - body) * travel * 0.92);
        vec3 softenedEnvironment = mix(
          environment,
          mix(deep, mid, 0.58),
          clamp(uRoughness, 0.0, 1.0) * 0.62
        );
        vec3 refractedColor = softenedEnvironment * absorption;

        vec2 lensUv = normal.xy + refracted.xy * 0.075;
        lensUv += vec2(vSurfaceNoise, -vSurfaceNoise) * 0.025;
        float innerLens = exp(-dot(lensUv, lensUv) * 8.5);
        float causticA = sin(dot(refracted.xz, vec2(12.0, -9.0)) + vLocalPosition.y * 6.0 - uCausticAPhase);
        float causticB = sin(dot(refracted.zy, vec2(8.0, 11.0)) - vLocalPosition.x * 5.0 + uCausticBPhase);
        float caustics = pow(clamp(1.0 - abs(causticA + causticB) * 0.52, 0.0, 1.0), 5.0);
        caustics *= (1.0 - clamp(uRoughness, 0.0, 1.0)) * (0.16 + innerLens * 0.34);
        float innerVeil = smoothstep(0.34, 0.88, facing);
        innerVeil *= 0.5 + 0.5 * sin(
          vLocalPosition.y * 5.2 +
          vLocalPosition.x * 2.1 +
          vSurfaceNoise * 5.0 -
          uVeilPhase
        );
        innerVeil = smoothstep(0.28, 0.82, innerVeil) * (0.35 + innerLens * 0.65);

        vec3 surfaceColor = body * (0.22 + facing * 0.28 + vSurfaceNoise * 0.04);
        vec3 bodyColor = mix(surfaceColor, refractedColor, clamp(uTransmission, 0.0, 1.0));
        bodyColor += mix(body, uCoreColor, innerLens * 0.62) * caustics * uCoreIntensity * 0.12;
        bodyColor += uCoreColor * innerLens * uCoreIntensity * uTransmission * 0.12;
        bodyColor += mix(deep, body, 0.48) * innerVeil * uTransmission * 0.10;

        float specularPower = mix(96.0, 10.0, clamp(uRoughness, 0.0, 1.0));
        vec3 halfVector = normalize(viewDirection + normalize(vec3(-0.45, 0.72, 0.53)));
        float specular = pow(max(dot(normal, halfVector), 0.0), specularPower);
        bodyColor += mix(vec3(1.0), mix(body, uCoreColor, 0.4), 0.22) * specular * 0.42;

        vec3 rimColor = mix(body, uCoreColor, 0.28);
        bodyColor += rimColor * fresnel * (0.22 + uTransmission * 0.28);

        float opaqueAlpha = clamp(0.86 + uThickness * 0.035, 0.86, 0.96);
        float glassAlpha = clamp(0.43 + uThickness * 0.075, 0.43, 0.68);
        float alpha = mix(opaqueAlpha, glassAlpha, clamp(uTransmission, 0.0, 1.0));
        alpha = clamp(alpha + fresnel * 0.14, 0.0, 0.96);
        gl_FragColor = vec4(bodyColor, alpha);
      }
    `,
    transparent: !0,
    depthWrite: !1,
    side: tn,
    toneMapped: !1
  });
  function a() {
    const u = qr(t.detail, 3, 6, ui.detail), v = Number.isFinite(Number(t.radius)) ? Math.max(0.01, Number(t.radius)) : ui.radius;
    return new pa(v, u);
  }
  let o = a();
  const s = new Bt(o, r);
  s.renderOrder = 2, n.add(s);
  const l = new ma(1, 32, 24), c = new ht({
    uniforms: {
      uColor: { value: new We(t.coreColor) },
      uIntensity: { value: t.coreIntensity },
      uWobbleAPhase: { value: 0 },
      uWobbleBPhase: { value: 0 },
      uLivingPhase: { value: 0 },
      uMoltenPhase: { value: 0 }
    },
    vertexShader: `
      uniform float uWobbleAPhase;
      uniform float uWobbleBPhase;

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vLocalPosition;

      void main() {
        float softWobble = sin(position.y * 3.8 + uWobbleAPhase);
        softWobble *= sin(position.x * 3.1 - position.z * 2.4 - uWobbleBPhase);
        vec3 displaced = position * (1.0 + softWobble * 0.045);
        vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewPosition = -viewPosition.xyz;
        vLocalPosition = displaced;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uLivingPhase;
      uniform float uMoltenPhase;

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vLocalPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDirection = normalize(vViewPosition);
        float facing = clamp(dot(normal, viewDirection), 0.0, 1.0);
        float keyLight = max(dot(normal, normalize(vec3(-0.48, 0.66, 0.57))), 0.0);
        float highlight = pow(max(dot(normalize(normal + viewDirection), normalize(vec3(-0.42, 0.72, 0.55))), 0.0), 24.0);
        float livingLight = 0.96 + sin(uLivingPhase) * 0.04;
        float moltenBand = 0.5 + 0.5 * sin(vLocalPosition.y * 5.4 + vLocalPosition.x * 2.2 - uMoltenPhase);
        moltenBand = smoothstep(0.18, 0.86, moltenBand) * 0.12;
        float hotPool = exp(-dot(vLocalPosition.xy - vec2(-0.22, 0.24), vLocalPosition.xy - vec2(-0.22, 0.24)) * 5.5);
        vec3 hot = mix(uColor, vec3(1.0), 0.4);
        vec3 color = mix(uColor * 0.28, hot, 0.16 + facing * 0.64 + hotPool * 0.12);
        color *= (0.72 + uIntensity * 0.38) * (0.72 + keyLight * 0.28 + moltenBand) * livingLight;
        color += hot * (highlight * 0.28 + hotPool * 0.12);
        float alpha = smoothstep(0.02, 0.68, facing) * clamp(0.28 + uIntensity * 0.12, 0.28, 0.62);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: !0,
    depthWrite: !1,
    blending: pi,
    toneMapped: !1
  }), d = new Bt(l, c);
  d.renderOrder = 3, n.add(d);
  const f = { radius: io(t) };
  let h = 0, m = Math.PI * 0.5;
  const _ = hm();
  function b(u = 0) {
    const v = Math.max(0.01, Number(t.radius) || ui.radius), g = 1 + Math.abs(u) * Math.max(0, t.pulseDeform) * 0.16;
    d.scale.setScalar(v * 0.26 * g);
  }
  b();
  function p() {
    const u = a();
    s.geometry = u, o.dispose(), o = u;
  }
  return {
    frame: f,
    update(u = {}) {
      const v = typeof u.time == "number" ? u.time : 0, g = typeof u.delta == "number" ? Math.max(0, u.delta) : 0;
      h > 1e-4 && g > 0 ? (m += g * 11.5, h *= Math.exp(-g * 3.6)) : h <= 1e-4 && (h = 0);
      const T = h * Math.sin(m);
      r.uniforms.uTime.value = v, _.advance(v);
      const C = r.uniforms;
      C.uBreathePhase.value = _.phase("breathe", t.breatheSpeed), C.uCausticAPhase.value = _.phase("causticA", 0.28), C.uCausticBPhase.value = _.phase("causticB", 0.17), C.uVeilPhase.value = _.phase("veil", 0.19);
      const R = c.uniforms;
      R.uWobbleAPhase.value = _.phase("wobbleA", 0.33), R.uWobbleBPhase.value = _.phase("wobbleB", 0.21), R.uLivingPhase.value = _.phase("living", 0.47), R.uMoltenPhase.value = _.phase("molten", 0.31), r.uniforms.uPulse.value = T, b(T);
    },
    setParams(u = {}) {
      const v = u.detail !== void 0 && u.detail !== t.detail || u.radius !== void 0 && u.radius !== t.radius || u.displaceOctaves !== void 0 && u.displaceOctaves !== t.displaceOctaves;
      Object.assign(t, u), u.displaceOctaves !== void 0 && (r.defines.DISPLACE_OCTAVES = qr(
        t.displaceOctaves,
        1,
        4,
        ui.displaceOctaves
      ), r.needsUpdate = !0), v && p(), u.displaceAmount !== void 0 && (r.uniforms.uDisplaceAmount.value = t.displaceAmount), u.displaceScale !== void 0 && (r.uniforms.uDisplaceScale.value = t.displaceScale), u.breatheSpeed !== void 0 && (r.uniforms.uBreatheSpeed.value = t.breatheSpeed), u.breatheAmp !== void 0 && (r.uniforms.uBreatheAmp.value = t.breatheAmp), u.driftSpeed !== void 0 && (r.uniforms.uDriftSpeed.value = t.driftSpeed), u.pulseDeform !== void 0 && (r.uniforms.uPulseDeform.value = t.pulseDeform), u.transmission !== void 0 && (r.uniforms.uTransmission.value = t.transmission), u.thickness !== void 0 && (r.uniforms.uThickness.value = t.thickness), u.ior !== void 0 && (r.uniforms.uIor.value = t.ior), u.roughness !== void 0 && (r.uniforms.uRoughness.value = t.roughness), u.bodyColor !== void 0 && r.uniforms.uBodyColor.value.set(t.bodyColor), u.coreColor !== void 0 && (r.uniforms.uCoreColor.value.set(t.coreColor), c.uniforms.uColor.value.set(t.coreColor)), u.coreIntensity !== void 0 && (r.uniforms.uCoreIntensity.value = t.coreIntensity, c.uniforms.uIntensity.value = t.coreIntensity), u.fresnelPower !== void 0 && (r.uniforms.uFresnelPower.value = t.fresnelPower), (u.radius !== void 0 || u.displaceAmount !== void 0 || u.breatheAmp !== void 0 || u.pulseDeform !== void 0) && (f.radius = io(t), b());
    },
    onPulse() {
      h = 1, m = Math.PI * 0.5;
    },
    dispose() {
      i.remove(n), o.dispose(), r.dispose(), l.dispose(), c.dispose();
    }
  };
}
export {
  mm as aqueous,
  pm as createOrb
};
