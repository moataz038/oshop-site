function rp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var d0 = { exports: {} }, j = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var go = Symbol.for("react.element"), np = Symbol.for("react.portal"), op = Symbol.for("react.fragment"), ip = Symbol.for("react.strict_mode"), ap = Symbol.for("react.profiler"), lp = Symbol.for("react.provider"), sp = Symbol.for("react.context"), up = Symbol.for("react.forward_ref"), cp = Symbol.for("react.suspense"), fp = Symbol.for("react.memo"), pp = Symbol.for("react.lazy"), Bs = Symbol.iterator;
function dp(e) {
  return e === null || typeof e != "object" ? null : (e = Bs && e[Bs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var g0 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, m0 = Object.assign, h0 = {};
function yn(e, t, r) {
  this.props = e, this.context = t, this.refs = h0, this.updater = r || g0;
}
yn.prototype.isReactComponent = {};
yn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
yn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function v0() {
}
v0.prototype = yn.prototype;
function Rl(e, t, r) {
  this.props = e, this.context = t, this.refs = h0, this.updater = r || g0;
}
var Xl = Rl.prototype = new v0();
Xl.constructor = Rl;
m0(Xl, yn.prototype);
Xl.isPureReactComponent = !0;
var Us = Array.isArray, y0 = Object.prototype.hasOwnProperty, Fl = { current: null }, x0 = { key: !0, ref: !0, __self: !0, __source: !0 };
function b0(e, t, r) {
  var n, o = {}, i = null, a = null;
  if (t != null) for (n in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (i = "" + t.key), t) y0.call(t, n) && !x0.hasOwnProperty(n) && (o[n] = t[n]);
  var l = arguments.length - 2;
  if (l === 1) o.children = r;
  else if (1 < l) {
    for (var s = Array(l), u = 0; u < l; u++) s[u] = arguments[u + 2];
    o.children = s;
  }
  if (e && e.defaultProps) for (n in l = e.defaultProps, l) o[n] === void 0 && (o[n] = l[n]);
  return { $$typeof: go, type: e, key: i, ref: a, props: o, _owner: Fl.current };
}
function gp(e, t) {
  return { $$typeof: go, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Yl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === go;
}
function mp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var Vs = /\/+/g;
function ra(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? mp("" + e.key) : t.toString(36);
}
function Bo(e, t, r, n, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else switch (i) {
    case "string":
    case "number":
      a = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case go:
        case np:
          a = !0;
      }
  }
  if (a) return a = e, o = o(a), e = n === "" ? "." + ra(a, 0) : n, Us(o) ? (r = "", e != null && (r = e.replace(Vs, "$&/") + "/"), Bo(o, t, r, "", function(u) {
    return u;
  })) : o != null && (Yl(o) && (o = gp(o, r + (!o.key || a && a.key === o.key ? "" : ("" + o.key).replace(Vs, "$&/") + "/") + e)), t.push(o)), 1;
  if (a = 0, n = n === "" ? "." : n + ":", Us(e)) for (var l = 0; l < e.length; l++) {
    i = e[l];
    var s = n + ra(i, l);
    a += Bo(i, t, r, s, o);
  }
  else if (s = dp(e), typeof s == "function") for (e = s.call(e), l = 0; !(i = e.next()).done; ) i = i.value, s = n + ra(i, l++), a += Bo(i, t, r, s, o);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function ko(e, t, r) {
  if (e == null) return e;
  var n = [], o = 0;
  return Bo(e, n, "", "", function(i) {
    return t.call(r, i, o++);
  }), n;
}
function hp(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
    }, function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ye = { current: null }, Uo = { transition: null }, vp = { ReactCurrentDispatcher: Ye, ReactCurrentBatchConfig: Uo, ReactCurrentOwner: Fl };
function z0() {
  throw Error("act(...) is not supported in production builds of React.");
}
j.Children = { map: ko, forEach: function(e, t, r) {
  ko(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return ko(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ko(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Yl(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
j.Component = yn;
j.Fragment = op;
j.Profiler = ap;
j.PureComponent = Rl;
j.StrictMode = ip;
j.Suspense = cp;
j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vp;
j.act = z0;
j.cloneElement = function(e, t, r) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var n = m0({}, e.props), o = e.key, i = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, a = Fl.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
    for (s in t) y0.call(t, s) && !x0.hasOwnProperty(s) && (n[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    l = Array(s);
    for (var u = 0; u < s; u++) l[u] = arguments[u + 2];
    n.children = l;
  }
  return { $$typeof: go, type: e.type, key: o, ref: i, props: n, _owner: a };
};
j.createContext = function(e) {
  return e = { $$typeof: sp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: lp, _context: e }, e.Consumer = e;
};
j.createElement = b0;
j.createFactory = function(e) {
  var t = b0.bind(null, e);
  return t.type = e, t;
};
j.createRef = function() {
  return { current: null };
};
j.forwardRef = function(e) {
  return { $$typeof: up, render: e };
};
j.isValidElement = Yl;
j.lazy = function(e) {
  return { $$typeof: pp, _payload: { _status: -1, _result: e }, _init: hp };
};
j.memo = function(e, t) {
  return { $$typeof: fp, type: e, compare: t === void 0 ? null : t };
};
j.startTransition = function(e) {
  var t = Uo.transition;
  Uo.transition = {};
  try {
    e();
  } finally {
    Uo.transition = t;
  }
};
j.unstable_act = z0;
j.useCallback = function(e, t) {
  return Ye.current.useCallback(e, t);
};
j.useContext = function(e) {
  return Ye.current.useContext(e);
};
j.useDebugValue = function() {
};
j.useDeferredValue = function(e) {
  return Ye.current.useDeferredValue(e);
};
j.useEffect = function(e, t) {
  return Ye.current.useEffect(e, t);
};
j.useId = function() {
  return Ye.current.useId();
};
j.useImperativeHandle = function(e, t, r) {
  return Ye.current.useImperativeHandle(e, t, r);
};
j.useInsertionEffect = function(e, t) {
  return Ye.current.useInsertionEffect(e, t);
};
j.useLayoutEffect = function(e, t) {
  return Ye.current.useLayoutEffect(e, t);
};
j.useMemo = function(e, t) {
  return Ye.current.useMemo(e, t);
};
j.useReducer = function(e, t, r) {
  return Ye.current.useReducer(e, t, r);
};
j.useRef = function(e) {
  return Ye.current.useRef(e);
};
j.useState = function(e) {
  return Ye.current.useState(e);
};
j.useSyncExternalStore = function(e, t, r) {
  return Ye.current.useSyncExternalStore(e, t, r);
};
j.useTransition = function() {
  return Ye.current.useTransition();
};
j.version = "18.3.1";
d0.exports = j;
var B = d0.exports;
const ni = /* @__PURE__ */ rp(B);
var w0 = { exports: {} }, tt = {}, $0 = { exports: {} }, k0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(S, _) {
    var E = S.length;
    S.push(_);
    e: for (; 0 < E; ) {
      var P = E - 1 >>> 1, Y = S[P];
      if (0 < o(Y, _)) S[P] = _, S[E] = Y, E = P;
      else break e;
    }
  }
  function r(S) {
    return S.length === 0 ? null : S[0];
  }
  function n(S) {
    if (S.length === 0) return null;
    var _ = S[0], E = S.pop();
    if (E !== _) {
      S[0] = E;
      e: for (var P = 0, Y = S.length, D = Y >>> 1; P < D; ) {
        var I = 2 * (P + 1) - 1, U = S[I], G = I + 1, ee = S[G];
        if (0 > o(U, E)) G < Y && 0 > o(ee, U) ? (S[P] = ee, S[G] = E, P = G) : (S[P] = U, S[I] = E, P = I);
        else if (G < Y && 0 > o(ee, E)) S[P] = ee, S[G] = E, P = G;
        else break e;
      }
    }
    return _;
  }
  function o(S, _) {
    var E = S.sortIndex - _.sortIndex;
    return E !== 0 ? E : S.id - _.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var a = Date, l = a.now();
    e.unstable_now = function() {
      return a.now() - l;
    };
  }
  var s = [], u = [], g = 1, f = null, d = 3, v = !1, y = !1, x = !1, w = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(S) {
    for (var _ = r(u); _ !== null; ) {
      if (_.callback === null) n(u);
      else if (_.startTime <= S) n(u), _.sortIndex = _.expirationTime, t(s, _);
      else break;
      _ = r(u);
    }
  }
  function h(S) {
    if (x = !1, m(S), !y) if (r(s) !== null) y = !0, F(b);
    else {
      var _ = r(u);
      _ !== null && L(h, _.startTime - S);
    }
  }
  function b(S, _) {
    y = !1, x && (x = !1, p($), $ = -1), v = !0;
    var E = d;
    try {
      for (m(_), f = r(s); f !== null && (!(f.expirationTime > _) || S && !H()); ) {
        var P = f.callback;
        if (typeof P == "function") {
          f.callback = null, d = f.priorityLevel;
          var Y = P(f.expirationTime <= _);
          _ = e.unstable_now(), typeof Y == "function" ? f.callback = Y : f === r(s) && n(s), m(_);
        } else n(s);
        f = r(s);
      }
      if (f !== null) var D = !0;
      else {
        var I = r(u);
        I !== null && L(h, I.startTime - _), D = !1;
      }
      return D;
    } finally {
      f = null, d = E, v = !1;
    }
  }
  var z = !1, k = null, $ = -1, W = 5, M = -1;
  function H() {
    return !(e.unstable_now() - M < W);
  }
  function N() {
    if (k !== null) {
      var S = e.unstable_now();
      M = S;
      var _ = !0;
      try {
        _ = k(!0, S);
      } finally {
        _ ? T() : (z = !1, k = null);
      }
    } else z = !1;
  }
  var T;
  if (typeof c == "function") T = function() {
    c(N);
  };
  else if (typeof MessageChannel < "u") {
    var X = new MessageChannel(), O = X.port2;
    X.port1.onmessage = N, T = function() {
      O.postMessage(null);
    };
  } else T = function() {
    w(N, 0);
  };
  function F(S) {
    k = S, z || (z = !0, T());
  }
  function L(S, _) {
    $ = w(function() {
      S(e.unstable_now());
    }, _);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(S) {
    S.callback = null;
  }, e.unstable_continueExecution = function() {
    y || v || (y = !0, F(b));
  }, e.unstable_forceFrameRate = function(S) {
    0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : W = 0 < S ? Math.floor(1e3 / S) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return r(s);
  }, e.unstable_next = function(S) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var _ = 3;
        break;
      default:
        _ = d;
    }
    var E = d;
    d = _;
    try {
      return S();
    } finally {
      d = E;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(S, _) {
    switch (S) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        S = 3;
    }
    var E = d;
    d = S;
    try {
      return _();
    } finally {
      d = E;
    }
  }, e.unstable_scheduleCallback = function(S, _, E) {
    var P = e.unstable_now();
    switch (typeof E == "object" && E !== null ? (E = E.delay, E = typeof E == "number" && 0 < E ? P + E : P) : E = P, S) {
      case 1:
        var Y = -1;
        break;
      case 2:
        Y = 250;
        break;
      case 5:
        Y = 1073741823;
        break;
      case 4:
        Y = 1e4;
        break;
      default:
        Y = 5e3;
    }
    return Y = E + Y, S = { id: g++, callback: _, priorityLevel: S, startTime: E, expirationTime: Y, sortIndex: -1 }, E > P ? (S.sortIndex = E, t(u, S), r(s) === null && S === r(u) && (x ? (p($), $ = -1) : x = !0, L(h, E - P))) : (S.sortIndex = Y, t(s, S), y || v || (y = !0, F(b))), S;
  }, e.unstable_shouldYield = H, e.unstable_wrapCallback = function(S) {
    var _ = d;
    return function() {
      var E = d;
      d = _;
      try {
        return S.apply(this, arguments);
      } finally {
        d = E;
      }
    };
  };
})(k0);
$0.exports = k0;
var yp = $0.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xp = B, et = yp;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var S0 = /* @__PURE__ */ new Set(), qn = {};
function Fr(e, t) {
  fn(e, t), fn(e + "Capture", t);
}
function fn(e, t) {
  for (qn[e] = t, e = 0; e < t.length; e++) S0.add(t[e]);
}
var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ya = Object.prototype.hasOwnProperty, bp = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Qs = {}, qs = {};
function zp(e) {
  return Ya.call(qs, e) ? !0 : Ya.call(Qs, e) ? !1 : bp.test(e) ? qs[e] = !0 : (Qs[e] = !0, !1);
}
function wp(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return n ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function $p(e, t, r, n) {
  if (t === null || typeof t > "u" || wp(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null) switch (r.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Oe(e, t, r, n, o, i, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = n, this.attributeNamespace = o, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = a;
}
var Ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Ce[e] = new Oe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Ce[t] = new Oe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Ce[e] = new Oe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Ce[e] = new Oe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Ce[e] = new Oe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Ce[e] = new Oe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Ce[e] = new Oe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Ce[e] = new Oe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Ce[e] = new Oe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ol = /[\-:]([a-z])/g;
function Il(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ol,
    Il
  );
  Ce[t] = new Oe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ol, Il);
  Ce[t] = new Oe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ol, Il);
  Ce[t] = new Oe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Ce[e] = new Oe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ce.xlinkHref = new Oe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Ce[e] = new Oe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Dl(e, t, r, n) {
  var o = Ce.hasOwnProperty(t) ? Ce[t] : null;
  (o !== null ? o.type !== 0 : n || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && ($p(t, r, o, n) && (r = null), n || o === null ? zp(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : o.mustUseProperty ? e[o.propertyName] = r === null ? o.type === 3 ? !1 : "" : r : (t = o.attributeName, n = o.attributeNamespace, r === null ? e.removeAttribute(t) : (o = o.type, r = o === 3 || o === 4 && r === !0 ? "" : "" + r, n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var Dt = xp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, So = Symbol.for("react.element"), Br = Symbol.for("react.portal"), Ur = Symbol.for("react.fragment"), Al = Symbol.for("react.strict_mode"), Oa = Symbol.for("react.profiler"), M0 = Symbol.for("react.provider"), E0 = Symbol.for("react.context"), jl = Symbol.for("react.forward_ref"), Ia = Symbol.for("react.suspense"), Da = Symbol.for("react.suspense_list"), Bl = Symbol.for("react.memo"), Kt = Symbol.for("react.lazy"), C0 = Symbol.for("react.offscreen"), Gs = Symbol.iterator;
function En(e) {
  return e === null || typeof e != "object" ? null : (e = Gs && e[Gs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var se = Object.assign, na;
function Rn(e) {
  if (na === void 0) try {
    throw Error();
  } catch (r) {
    var t = r.stack.trim().match(/\n( *(at )?)/);
    na = t && t[1] || "";
  }
  return `
` + na + e;
}
var oa = !1;
function ia(e, t) {
  if (!e || oa) return "";
  oa = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var n = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        n = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      e();
    }
  } catch (u) {
    if (u && n && typeof u.stack == "string") {
      for (var o = u.stack.split(`
`), i = n.stack.split(`
`), a = o.length - 1, l = i.length - 1; 1 <= a && 0 <= l && o[a] !== i[l]; ) l--;
      for (; 1 <= a && 0 <= l; a--, l--) if (o[a] !== i[l]) {
        if (a !== 1 || l !== 1)
          do
            if (a--, l--, 0 > l || o[a] !== i[l]) {
              var s = `
` + o[a].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= a && 0 <= l);
        break;
      }
    }
  } finally {
    oa = !1, Error.prepareStackTrace = r;
  }
  return (e = e ? e.displayName || e.name : "") ? Rn(e) : "";
}
function kp(e) {
  switch (e.tag) {
    case 5:
      return Rn(e.type);
    case 16:
      return Rn("Lazy");
    case 13:
      return Rn("Suspense");
    case 19:
      return Rn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = ia(e.type, !1), e;
    case 11:
      return e = ia(e.type.render, !1), e;
    case 1:
      return e = ia(e.type, !0), e;
    default:
      return "";
  }
}
function Aa(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ur:
      return "Fragment";
    case Br:
      return "Portal";
    case Oa:
      return "Profiler";
    case Al:
      return "StrictMode";
    case Ia:
      return "Suspense";
    case Da:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case E0:
      return (e.displayName || "Context") + ".Consumer";
    case M0:
      return (e._context.displayName || "Context") + ".Provider";
    case jl:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Bl:
      return t = e.displayName || null, t !== null ? t : Aa(e.type) || "Memo";
    case Kt:
      t = e._payload, e = e._init;
      try {
        return Aa(e(t));
      } catch {
      }
  }
  return null;
}
function Sp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Aa(t);
    case 8:
      return t === Al ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function dr(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function _0(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Mp(e) {
  var t = _0(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), n = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
    var o = r.get, i = r.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return o.call(this);
    }, set: function(a) {
      n = "" + a, i.call(this, a);
    } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
      return n;
    }, setValue: function(a) {
      n = "" + a;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Mo(e) {
  e._valueTracker || (e._valueTracker = Mp(e));
}
function W0(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(), n = "";
  return e && (n = _0(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== r ? (t.setValue(e), !0) : !1;
}
function oi(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ja(e, t) {
  var r = t.checked;
  return se({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
}
function Ks(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue, n = t.checked != null ? t.checked : t.defaultChecked;
  r = dr(t.value != null ? t.value : r), e._wrapperState = { initialChecked: n, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function P0(e, t) {
  t = t.checked, t != null && Dl(e, "checked", t, !1);
}
function Ba(e, t) {
  P0(e, t);
  var r = dr(t.value), n = t.type;
  if (r != null) n === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
  else if (n === "submit" || n === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ua(e, t.type, r) : t.hasOwnProperty("defaultValue") && Ua(e, t.type, dr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Zs(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var n = t.type;
    if (!(n !== "submit" && n !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
  }
  r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
}
function Ua(e, t, r) {
  (t !== "number" || oi(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var Xn = Array.isArray;
function nn(e, t, r, n) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < r.length; o++) t["$" + r[o]] = !0;
    for (r = 0; r < e.length; r++) o = t.hasOwnProperty("$" + e[r].value), e[r].selected !== o && (e[r].selected = o), o && n && (e[r].defaultSelected = !0);
  } else {
    for (r = "" + dr(r), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === r) {
        e[o].selected = !0, n && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Va(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return se({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Js(e, t) {
  var r = t.value;
  if (r == null) {
    if (r = t.children, t = t.defaultValue, r != null) {
      if (t != null) throw Error(C(92));
      if (Xn(r)) {
        if (1 < r.length) throw Error(C(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ""), r = t;
  }
  e._wrapperState = { initialValue: dr(r) };
}
function H0(e, t) {
  var r = dr(t.value), n = dr(t.defaultValue);
  r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), n != null && (e.defaultValue = "" + n);
}
function eu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function T0(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Qa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? T0(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Eo, N0 = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, n, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, r, n, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Eo = Eo || document.createElement("div"), Eo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Eo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Gn(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var On = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Ep = ["Webkit", "ms", "Moz", "O"];
Object.keys(On).forEach(function(e) {
  Ep.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), On[t] = On[e];
  });
});
function L0(e, t, r) {
  return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || On.hasOwnProperty(e) && On[e] ? ("" + t).trim() : t + "px";
}
function R0(e, t) {
  e = e.style;
  for (var r in t) if (t.hasOwnProperty(r)) {
    var n = r.indexOf("--") === 0, o = L0(r, t[r], n);
    r === "float" && (r = "cssFloat"), n ? e.setProperty(r, o) : e[r] = o;
  }
}
var Cp = se({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function qa(e, t) {
  if (t) {
    if (Cp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function Ga(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ka = null;
function Ul(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Za = null, on = null, an = null;
function tu(e) {
  if (e = vo(e)) {
    if (typeof Za != "function") throw Error(C(280));
    var t = e.stateNode;
    t && (t = Ri(t), Za(e.stateNode, e.type, t));
  }
}
function X0(e) {
  on ? an ? an.push(e) : an = [e] : on = e;
}
function F0() {
  if (on) {
    var e = on, t = an;
    if (an = on = null, tu(e), t) for (e = 0; e < t.length; e++) tu(t[e]);
  }
}
function Y0(e, t) {
  return e(t);
}
function O0() {
}
var aa = !1;
function I0(e, t, r) {
  if (aa) return e(t, r);
  aa = !0;
  try {
    return Y0(e, t, r);
  } finally {
    aa = !1, (on !== null || an !== null) && (O0(), F0());
  }
}
function Kn(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = Ri(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(C(231, t, typeof r));
  return r;
}
var Ja = !1;
if (Ft) try {
  var Cn = {};
  Object.defineProperty(Cn, "passive", { get: function() {
    Ja = !0;
  } }), window.addEventListener("test", Cn, Cn), window.removeEventListener("test", Cn, Cn);
} catch {
  Ja = !1;
}
function _p(e, t, r, n, o, i, a, l, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (g) {
    this.onError(g);
  }
}
var In = !1, ii = null, ai = !1, el = null, Wp = { onError: function(e) {
  In = !0, ii = e;
} };
function Pp(e, t, r, n, o, i, a, l, s) {
  In = !1, ii = null, _p.apply(Wp, arguments);
}
function Hp(e, t, r, n, o, i, a, l, s) {
  if (Pp.apply(this, arguments), In) {
    if (In) {
      var u = ii;
      In = !1, ii = null;
    } else throw Error(C(198));
    ai || (ai = !0, el = u);
  }
}
function Yr(e) {
  var t = e, r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (r = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function D0(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ru(e) {
  if (Yr(e) !== e) throw Error(C(188));
}
function Tp(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Yr(e), t === null) throw Error(C(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var o = r.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (n = o.return, n !== null) {
        r = n;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === r) return ru(o), e;
        if (i === n) return ru(o), t;
        i = i.sibling;
      }
      throw Error(C(188));
    }
    if (r.return !== n.return) r = o, n = i;
    else {
      for (var a = !1, l = o.child; l; ) {
        if (l === r) {
          a = !0, r = o, n = i;
          break;
        }
        if (l === n) {
          a = !0, n = o, r = i;
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = i.child; l; ) {
          if (l === r) {
            a = !0, r = i, n = o;
            break;
          }
          if (l === n) {
            a = !0, n = i, r = o;
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(C(189));
      }
    }
    if (r.alternate !== n) throw Error(C(190));
  }
  if (r.tag !== 3) throw Error(C(188));
  return r.stateNode.current === r ? e : t;
}
function A0(e) {
  return e = Tp(e), e !== null ? j0(e) : null;
}
function j0(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = j0(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var B0 = et.unstable_scheduleCallback, nu = et.unstable_cancelCallback, Np = et.unstable_shouldYield, Lp = et.unstable_requestPaint, ge = et.unstable_now, Rp = et.unstable_getCurrentPriorityLevel, Vl = et.unstable_ImmediatePriority, U0 = et.unstable_UserBlockingPriority, li = et.unstable_NormalPriority, Xp = et.unstable_LowPriority, V0 = et.unstable_IdlePriority, Hi = null, _t = null;
function Fp(e) {
  if (_t && typeof _t.onCommitFiberRoot == "function") try {
    _t.onCommitFiberRoot(Hi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var bt = Math.clz32 ? Math.clz32 : Ip, Yp = Math.log, Op = Math.LN2;
function Ip(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Yp(e) / Op | 0) | 0;
}
var Co = 64, _o = 4194304;
function Fn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function si(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0, o = e.suspendedLanes, i = e.pingedLanes, a = r & 268435455;
  if (a !== 0) {
    var l = a & ~o;
    l !== 0 ? n = Fn(l) : (i &= a, i !== 0 && (n = Fn(i)));
  } else a = r & ~o, a !== 0 ? n = Fn(a) : i !== 0 && (n = Fn(i));
  if (n === 0) return 0;
  if (t !== 0 && t !== n && !(t & o) && (o = n & -n, i = t & -t, o >= i || o === 16 && (i & 4194240) !== 0)) return t;
  if (n & 4 && (n |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= n; 0 < t; ) r = 31 - bt(t), o = 1 << r, n |= e[r], t &= ~o;
  return n;
}
function Dp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Ap(e, t) {
  for (var r = e.suspendedLanes, n = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var a = 31 - bt(i), l = 1 << a, s = o[a];
    s === -1 ? (!(l & r) || l & n) && (o[a] = Dp(l, t)) : s <= t && (e.expiredLanes |= l), i &= ~l;
  }
}
function tl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Q0() {
  var e = Co;
  return Co <<= 1, !(Co & 4194240) && (Co = 64), e;
}
function la(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function mo(e, t, r) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - bt(t), e[t] = r;
}
function jp(e, t) {
  var r = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var o = 31 - bt(r), i = 1 << o;
    t[o] = 0, n[o] = -1, e[o] = -1, r &= ~i;
  }
}
function Ql(e, t) {
  var r = e.entangledLanes |= t;
  for (e = e.entanglements; r; ) {
    var n = 31 - bt(r), o = 1 << n;
    o & t | e[n] & t && (e[n] |= t), r &= ~o;
  }
}
var q = 0;
function q0(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var G0, ql, K0, Z0, J0, rl = !1, Wo = [], nr = null, or = null, ir = null, Zn = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map(), Jt = [], Bp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ou(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      nr = null;
      break;
    case "dragenter":
    case "dragleave":
      or = null;
      break;
    case "mouseover":
    case "mouseout":
      ir = null;
      break;
    case "pointerover":
    case "pointerout":
      Zn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jn.delete(t.pointerId);
  }
}
function _n(e, t, r, n, o, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: n, nativeEvent: i, targetContainers: [o] }, t !== null && (t = vo(t), t !== null && ql(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function Up(e, t, r, n, o) {
  switch (t) {
    case "focusin":
      return nr = _n(nr, e, t, r, n, o), !0;
    case "dragenter":
      return or = _n(or, e, t, r, n, o), !0;
    case "mouseover":
      return ir = _n(ir, e, t, r, n, o), !0;
    case "pointerover":
      var i = o.pointerId;
      return Zn.set(i, _n(Zn.get(i) || null, e, t, r, n, o)), !0;
    case "gotpointercapture":
      return i = o.pointerId, Jn.set(i, _n(Jn.get(i) || null, e, t, r, n, o)), !0;
  }
  return !1;
}
function ec(e) {
  var t = Mr(e.target);
  if (t !== null) {
    var r = Yr(t);
    if (r !== null) {
      if (t = r.tag, t === 13) {
        if (t = D0(r), t !== null) {
          e.blockedOn = t, J0(e.priority, function() {
            K0(r);
          });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Vo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = nl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      Ka = n, r.target.dispatchEvent(n), Ka = null;
    } else return t = vo(r), t !== null && ql(t), e.blockedOn = r, !1;
    t.shift();
  }
  return !0;
}
function iu(e, t, r) {
  Vo(e) && r.delete(t);
}
function Vp() {
  rl = !1, nr !== null && Vo(nr) && (nr = null), or !== null && Vo(or) && (or = null), ir !== null && Vo(ir) && (ir = null), Zn.forEach(iu), Jn.forEach(iu);
}
function Wn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, rl || (rl = !0, et.unstable_scheduleCallback(et.unstable_NormalPriority, Vp)));
}
function eo(e) {
  function t(o) {
    return Wn(o, e);
  }
  if (0 < Wo.length) {
    Wn(Wo[0], e);
    for (var r = 1; r < Wo.length; r++) {
      var n = Wo[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (nr !== null && Wn(nr, e), or !== null && Wn(or, e), ir !== null && Wn(ir, e), Zn.forEach(t), Jn.forEach(t), r = 0; r < Jt.length; r++) n = Jt[r], n.blockedOn === e && (n.blockedOn = null);
  for (; 0 < Jt.length && (r = Jt[0], r.blockedOn === null); ) ec(r), r.blockedOn === null && Jt.shift();
}
var ln = Dt.ReactCurrentBatchConfig, ui = !0;
function Qp(e, t, r, n) {
  var o = q, i = ln.transition;
  ln.transition = null;
  try {
    q = 1, Gl(e, t, r, n);
  } finally {
    q = o, ln.transition = i;
  }
}
function qp(e, t, r, n) {
  var o = q, i = ln.transition;
  ln.transition = null;
  try {
    q = 4, Gl(e, t, r, n);
  } finally {
    q = o, ln.transition = i;
  }
}
function Gl(e, t, r, n) {
  if (ui) {
    var o = nl(e, t, r, n);
    if (o === null) va(e, t, n, ci, r), ou(e, n);
    else if (Up(o, e, t, r, n)) n.stopPropagation();
    else if (ou(e, n), t & 4 && -1 < Bp.indexOf(e)) {
      for (; o !== null; ) {
        var i = vo(o);
        if (i !== null && G0(i), i = nl(e, t, r, n), i === null && va(e, t, n, ci, r), i === o) break;
        o = i;
      }
      o !== null && n.stopPropagation();
    } else va(e, t, n, null, r);
  }
}
var ci = null;
function nl(e, t, r, n) {
  if (ci = null, e = Ul(n), e = Mr(e), e !== null) if (t = Yr(e), t === null) e = null;
  else if (r = t.tag, r === 13) {
    if (e = D0(t), e !== null) return e;
    e = null;
  } else if (r === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ci = e, null;
}
function tc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Rp()) {
        case Vl:
          return 1;
        case U0:
          return 4;
        case li:
        case Xp:
          return 16;
        case V0:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var tr = null, Kl = null, Qo = null;
function rc() {
  if (Qo) return Qo;
  var e, t = Kl, r = t.length, n, o = "value" in tr ? tr.value : tr.textContent, i = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++) ;
  var a = r - e;
  for (n = 1; n <= a && t[r - n] === o[i - n]; n++) ;
  return Qo = o.slice(e, 1 < n ? 1 - n : void 0);
}
function qo(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Po() {
  return !0;
}
function au() {
  return !1;
}
function rt(e) {
  function t(r, n, o, i, a) {
    this._reactName = r, this._targetInst = o, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null;
    for (var l in e) e.hasOwnProperty(l) && (r = e[l], this[l] = r ? r(i) : i[l]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Po : au, this.isPropagationStopped = au, this;
  }
  return se(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var r = this.nativeEvent;
    r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Po);
  }, stopPropagation: function() {
    var r = this.nativeEvent;
    r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Po);
  }, persist: function() {
  }, isPersistent: Po }), t;
}
var xn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Zl = rt(xn), ho = se({}, xn, { view: 0, detail: 0 }), Gp = rt(ho), sa, ua, Pn, Ti = se({}, ho, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Jl, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Pn && (Pn && e.type === "mousemove" ? (sa = e.screenX - Pn.screenX, ua = e.screenY - Pn.screenY) : ua = sa = 0, Pn = e), sa);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ua;
} }), lu = rt(Ti), Kp = se({}, Ti, { dataTransfer: 0 }), Zp = rt(Kp), Jp = se({}, ho, { relatedTarget: 0 }), ca = rt(Jp), ed = se({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), td = rt(ed), rd = se({}, xn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), nd = rt(rd), od = se({}, xn, { data: 0 }), su = rt(od), id = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, ad = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, ld = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function sd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ld[e]) ? !!t[e] : !1;
}
function Jl() {
  return sd;
}
var ud = se({}, ho, { key: function(e) {
  if (e.key) {
    var t = id[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = qo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ad[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Jl, charCode: function(e) {
  return e.type === "keypress" ? qo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? qo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), cd = rt(ud), fd = se({}, Ti, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), uu = rt(fd), pd = se({}, ho, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Jl }), dd = rt(pd), gd = se({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), md = rt(gd), hd = se({}, Ti, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), vd = rt(hd), yd = [9, 13, 27, 32], es = Ft && "CompositionEvent" in window, Dn = null;
Ft && "documentMode" in document && (Dn = document.documentMode);
var xd = Ft && "TextEvent" in window && !Dn, nc = Ft && (!es || Dn && 8 < Dn && 11 >= Dn), cu = " ", fu = !1;
function oc(e, t) {
  switch (e) {
    case "keyup":
      return yd.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function ic(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Vr = !1;
function bd(e, t) {
  switch (e) {
    case "compositionend":
      return ic(t);
    case "keypress":
      return t.which !== 32 ? null : (fu = !0, cu);
    case "textInput":
      return e = t.data, e === cu && fu ? null : e;
    default:
      return null;
  }
}
function zd(e, t) {
  if (Vr) return e === "compositionend" || !es && oc(e, t) ? (e = rc(), Qo = Kl = tr = null, Vr = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return nc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var wd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function pu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!wd[e.type] : t === "textarea";
}
function ac(e, t, r, n) {
  X0(n), t = fi(t, "onChange"), 0 < t.length && (r = new Zl("onChange", "change", null, r, n), e.push({ event: r, listeners: t }));
}
var An = null, to = null;
function $d(e) {
  vc(e, 0);
}
function Ni(e) {
  var t = Gr(e);
  if (W0(t)) return e;
}
function kd(e, t) {
  if (e === "change") return t;
}
var lc = !1;
if (Ft) {
  var fa;
  if (Ft) {
    var pa = "oninput" in document;
    if (!pa) {
      var du = document.createElement("div");
      du.setAttribute("oninput", "return;"), pa = typeof du.oninput == "function";
    }
    fa = pa;
  } else fa = !1;
  lc = fa && (!document.documentMode || 9 < document.documentMode);
}
function gu() {
  An && (An.detachEvent("onpropertychange", sc), to = An = null);
}
function sc(e) {
  if (e.propertyName === "value" && Ni(to)) {
    var t = [];
    ac(t, to, e, Ul(e)), I0($d, t);
  }
}
function Sd(e, t, r) {
  e === "focusin" ? (gu(), An = t, to = r, An.attachEvent("onpropertychange", sc)) : e === "focusout" && gu();
}
function Md(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ni(to);
}
function Ed(e, t) {
  if (e === "click") return Ni(t);
}
function Cd(e, t) {
  if (e === "input" || e === "change") return Ni(t);
}
function _d(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var wt = typeof Object.is == "function" ? Object.is : _d;
function ro(e, t) {
  if (wt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var o = r[n];
    if (!Ya.call(t, o) || !wt(e[o], t[o])) return !1;
  }
  return !0;
}
function mu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function hu(e, t) {
  var r = mu(e);
  e = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (n = e + r.textContent.length, e <= t && n >= t) return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = mu(r);
  }
}
function uc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function cc() {
  for (var e = window, t = oi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = oi(e.document);
  }
  return t;
}
function ts(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Wd(e) {
  var t = cc(), r = e.focusedElem, n = e.selectionRange;
  if (t !== r && r && r.ownerDocument && uc(r.ownerDocument.documentElement, r)) {
    if (n !== null && ts(r)) {
      if (t = n.start, e = n.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
      else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = r.textContent.length, i = Math.min(n.start, o);
        n = n.end === void 0 ? i : Math.min(n.end, o), !e.extend && i > n && (o = n, n = i, i = o), o = hu(r, i);
        var a = hu(
          r,
          n
        );
        o && a && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), i > n ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Pd = Ft && "documentMode" in document && 11 >= document.documentMode, Qr = null, ol = null, jn = null, il = !1;
function vu(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  il || Qr == null || Qr !== oi(n) || (n = Qr, "selectionStart" in n && ts(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = { anchorNode: n.anchorNode, anchorOffset: n.anchorOffset, focusNode: n.focusNode, focusOffset: n.focusOffset }), jn && ro(jn, n) || (jn = n, n = fi(ol, "onSelect"), 0 < n.length && (t = new Zl("onSelect", "select", null, t, r), e.push({ event: t, listeners: n }), t.target = Qr)));
}
function Ho(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
}
var qr = { animationend: Ho("Animation", "AnimationEnd"), animationiteration: Ho("Animation", "AnimationIteration"), animationstart: Ho("Animation", "AnimationStart"), transitionend: Ho("Transition", "TransitionEnd") }, da = {}, fc = {};
Ft && (fc = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
function Li(e) {
  if (da[e]) return da[e];
  if (!qr[e]) return e;
  var t = qr[e], r;
  for (r in t) if (t.hasOwnProperty(r) && r in fc) return da[e] = t[r];
  return e;
}
var pc = Li("animationend"), dc = Li("animationiteration"), gc = Li("animationstart"), mc = Li("transitionend"), hc = /* @__PURE__ */ new Map(), yu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mr(e, t) {
  hc.set(e, t), Fr(t, [e]);
}
for (var ga = 0; ga < yu.length; ga++) {
  var ma = yu[ga], Hd = ma.toLowerCase(), Td = ma[0].toUpperCase() + ma.slice(1);
  mr(Hd, "on" + Td);
}
mr(pc, "onAnimationEnd");
mr(dc, "onAnimationIteration");
mr(gc, "onAnimationStart");
mr("dblclick", "onDoubleClick");
mr("focusin", "onFocus");
mr("focusout", "onBlur");
mr(mc, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Fr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Fr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Fr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Fr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Fr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Fr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Nd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Yn));
function xu(e, t, r) {
  var n = e.type || "unknown-event";
  e.currentTarget = r, Hp(n, t, void 0, e), e.currentTarget = null;
}
function vc(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r], o = n.event;
    n = n.listeners;
    e: {
      var i = void 0;
      if (t) for (var a = n.length - 1; 0 <= a; a--) {
        var l = n[a], s = l.instance, u = l.currentTarget;
        if (l = l.listener, s !== i && o.isPropagationStopped()) break e;
        xu(o, l, u), i = s;
      }
      else for (a = 0; a < n.length; a++) {
        if (l = n[a], s = l.instance, u = l.currentTarget, l = l.listener, s !== i && o.isPropagationStopped()) break e;
        xu(o, l, u), i = s;
      }
    }
  }
  if (ai) throw e = el, ai = !1, el = null, e;
}
function re(e, t) {
  var r = t[cl];
  r === void 0 && (r = t[cl] = /* @__PURE__ */ new Set());
  var n = e + "__bubble";
  r.has(n) || (yc(t, e, 2, !1), r.add(n));
}
function ha(e, t, r) {
  var n = 0;
  t && (n |= 4), yc(r, e, n, t);
}
var To = "_reactListening" + Math.random().toString(36).slice(2);
function no(e) {
  if (!e[To]) {
    e[To] = !0, S0.forEach(function(r) {
      r !== "selectionchange" && (Nd.has(r) || ha(r, !1, e), ha(r, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[To] || (t[To] = !0, ha("selectionchange", !1, t));
  }
}
function yc(e, t, r, n) {
  switch (tc(t)) {
    case 1:
      var o = Qp;
      break;
    case 4:
      o = qp;
      break;
    default:
      o = Gl;
  }
  r = o.bind(null, t, r, e), o = void 0, !Ja || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), n ? o !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: o }) : e.addEventListener(t, r, !0) : o !== void 0 ? e.addEventListener(t, r, { passive: o }) : e.addEventListener(t, r, !1);
}
function va(e, t, r, n, o) {
  var i = n;
  if (!(t & 1) && !(t & 2) && n !== null) e: for (; ; ) {
    if (n === null) return;
    var a = n.tag;
    if (a === 3 || a === 4) {
      var l = n.stateNode.containerInfo;
      if (l === o || l.nodeType === 8 && l.parentNode === o) break;
      if (a === 4) for (a = n.return; a !== null; ) {
        var s = a.tag;
        if ((s === 3 || s === 4) && (s = a.stateNode.containerInfo, s === o || s.nodeType === 8 && s.parentNode === o)) return;
        a = a.return;
      }
      for (; l !== null; ) {
        if (a = Mr(l), a === null) return;
        if (s = a.tag, s === 5 || s === 6) {
          n = i = a;
          continue e;
        }
        l = l.parentNode;
      }
    }
    n = n.return;
  }
  I0(function() {
    var u = i, g = Ul(r), f = [];
    e: {
      var d = hc.get(e);
      if (d !== void 0) {
        var v = Zl, y = e;
        switch (e) {
          case "keypress":
            if (qo(r) === 0) break e;
          case "keydown":
          case "keyup":
            v = cd;
            break;
          case "focusin":
            y = "focus", v = ca;
            break;
          case "focusout":
            y = "blur", v = ca;
            break;
          case "beforeblur":
          case "afterblur":
            v = ca;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = lu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Zp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = dd;
            break;
          case pc:
          case dc:
          case gc:
            v = td;
            break;
          case mc:
            v = md;
            break;
          case "scroll":
            v = Gp;
            break;
          case "wheel":
            v = vd;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = nd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = uu;
        }
        var x = (t & 4) !== 0, w = !x && e === "scroll", p = x ? d !== null ? d + "Capture" : null : d;
        x = [];
        for (var c = u, m; c !== null; ) {
          m = c;
          var h = m.stateNode;
          if (m.tag === 5 && h !== null && (m = h, p !== null && (h = Kn(c, p), h != null && x.push(oo(c, h, m)))), w) break;
          c = c.return;
        }
        0 < x.length && (d = new v(d, y, null, r, g), f.push({ event: d, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", d && r !== Ka && (y = r.relatedTarget || r.fromElement) && (Mr(y) || y[Yt])) break e;
        if ((v || d) && (d = g.window === g ? g : (d = g.ownerDocument) ? d.defaultView || d.parentWindow : window, v ? (y = r.relatedTarget || r.toElement, v = u, y = y ? Mr(y) : null, y !== null && (w = Yr(y), y !== w || y.tag !== 5 && y.tag !== 6) && (y = null)) : (v = null, y = u), v !== y)) {
          if (x = lu, h = "onMouseLeave", p = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (x = uu, h = "onPointerLeave", p = "onPointerEnter", c = "pointer"), w = v == null ? d : Gr(v), m = y == null ? d : Gr(y), d = new x(h, c + "leave", v, r, g), d.target = w, d.relatedTarget = m, h = null, Mr(g) === u && (x = new x(p, c + "enter", y, r, g), x.target = m, x.relatedTarget = w, h = x), w = h, v && y) t: {
            for (x = v, p = y, c = 0, m = x; m; m = jr(m)) c++;
            for (m = 0, h = p; h; h = jr(h)) m++;
            for (; 0 < c - m; ) x = jr(x), c--;
            for (; 0 < m - c; ) p = jr(p), m--;
            for (; c--; ) {
              if (x === p || p !== null && x === p.alternate) break t;
              x = jr(x), p = jr(p);
            }
            x = null;
          }
          else x = null;
          v !== null && bu(f, d, v, x, !1), y !== null && w !== null && bu(f, w, y, x, !0);
        }
      }
      e: {
        if (d = u ? Gr(u) : window, v = d.nodeName && d.nodeName.toLowerCase(), v === "select" || v === "input" && d.type === "file") var b = kd;
        else if (pu(d)) if (lc) b = Cd;
        else {
          b = Md;
          var z = Sd;
        }
        else (v = d.nodeName) && v.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (b = Ed);
        if (b && (b = b(e, u))) {
          ac(f, b, r, g);
          break e;
        }
        z && z(e, d, u), e === "focusout" && (z = d._wrapperState) && z.controlled && d.type === "number" && Ua(d, "number", d.value);
      }
      switch (z = u ? Gr(u) : window, e) {
        case "focusin":
          (pu(z) || z.contentEditable === "true") && (Qr = z, ol = u, jn = null);
          break;
        case "focusout":
          jn = ol = Qr = null;
          break;
        case "mousedown":
          il = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          il = !1, vu(f, r, g);
          break;
        case "selectionchange":
          if (Pd) break;
        case "keydown":
        case "keyup":
          vu(f, r, g);
      }
      var k;
      if (es) e: {
        switch (e) {
          case "compositionstart":
            var $ = "onCompositionStart";
            break e;
          case "compositionend":
            $ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            $ = "onCompositionUpdate";
            break e;
        }
        $ = void 0;
      }
      else Vr ? oc(e, r) && ($ = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && ($ = "onCompositionStart");
      $ && (nc && r.locale !== "ko" && (Vr || $ !== "onCompositionStart" ? $ === "onCompositionEnd" && Vr && (k = rc()) : (tr = g, Kl = "value" in tr ? tr.value : tr.textContent, Vr = !0)), z = fi(u, $), 0 < z.length && ($ = new su($, e, null, r, g), f.push({ event: $, listeners: z }), k ? $.data = k : (k = ic(r), k !== null && ($.data = k)))), (k = xd ? bd(e, r) : zd(e, r)) && (u = fi(u, "onBeforeInput"), 0 < u.length && (g = new su("onBeforeInput", "beforeinput", null, r, g), f.push({ event: g, listeners: u }), g.data = k));
    }
    vc(f, t);
  });
}
function oo(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function fi(e, t) {
  for (var r = t + "Capture", n = []; e !== null; ) {
    var o = e, i = o.stateNode;
    o.tag === 5 && i !== null && (o = i, i = Kn(e, r), i != null && n.unshift(oo(e, i, o)), i = Kn(e, t), i != null && n.push(oo(e, i, o))), e = e.return;
  }
  return n;
}
function jr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function bu(e, t, r, n, o) {
  for (var i = t._reactName, a = []; r !== null && r !== n; ) {
    var l = r, s = l.alternate, u = l.stateNode;
    if (s !== null && s === n) break;
    l.tag === 5 && u !== null && (l = u, o ? (s = Kn(r, i), s != null && a.unshift(oo(r, s, l))) : o || (s = Kn(r, i), s != null && a.push(oo(r, s, l)))), r = r.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var Ld = /\r\n?/g, Rd = /\u0000|\uFFFD/g;
function zu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ld, `
`).replace(Rd, "");
}
function No(e, t, r) {
  if (t = zu(t), zu(e) !== t && r) throw Error(C(425));
}
function pi() {
}
var al = null, ll = null;
function sl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ul = typeof setTimeout == "function" ? setTimeout : void 0, Xd = typeof clearTimeout == "function" ? clearTimeout : void 0, wu = typeof Promise == "function" ? Promise : void 0, Fd = typeof queueMicrotask == "function" ? queueMicrotask : typeof wu < "u" ? function(e) {
  return wu.resolve(null).then(e).catch(Yd);
} : ul;
function Yd(e) {
  setTimeout(function() {
    throw e;
  });
}
function ya(e, t) {
  var r = t, n = 0;
  do {
    var o = r.nextSibling;
    if (e.removeChild(r), o && o.nodeType === 8) if (r = o.data, r === "/$") {
      if (n === 0) {
        e.removeChild(o), eo(t);
        return;
      }
      n--;
    } else r !== "$" && r !== "$?" && r !== "$!" || n++;
    r = o;
  } while (r);
  eo(t);
}
function ar(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function $u(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var bn = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + bn, io = "__reactProps$" + bn, Yt = "__reactContainer$" + bn, cl = "__reactEvents$" + bn, Od = "__reactListeners$" + bn, Id = "__reactHandles$" + bn;
function Mr(e) {
  var t = e[Ct];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if (t = r[Yt] || r[Ct]) {
      if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = $u(e); e !== null; ) {
        if (r = e[Ct]) return r;
        e = $u(e);
      }
      return t;
    }
    e = r, r = e.parentNode;
  }
  return null;
}
function vo(e) {
  return e = e[Ct] || e[Yt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Gr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function Ri(e) {
  return e[io] || null;
}
var fl = [], Kr = -1;
function hr(e) {
  return { current: e };
}
function ne(e) {
  0 > Kr || (e.current = fl[Kr], fl[Kr] = null, Kr--);
}
function J(e, t) {
  Kr++, fl[Kr] = e.current, e.current = t;
}
var gr = {}, Ne = hr(gr), Be = hr(!1), Hr = gr;
function pn(e, t) {
  var r = e.type.contextTypes;
  if (!r) return gr;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t) return n.__reactInternalMemoizedMaskedChildContext;
  var o = {}, i;
  for (i in r) o[i] = t[i];
  return n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function Ue(e) {
  return e = e.childContextTypes, e != null;
}
function di() {
  ne(Be), ne(Ne);
}
function ku(e, t, r) {
  if (Ne.current !== gr) throw Error(C(168));
  J(Ne, t), J(Be, r);
}
function xc(e, t, r) {
  var n = e.stateNode;
  if (t = t.childContextTypes, typeof n.getChildContext != "function") return r;
  n = n.getChildContext();
  for (var o in n) if (!(o in t)) throw Error(C(108, Sp(e) || "Unknown", o));
  return se({}, r, n);
}
function gi(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gr, Hr = Ne.current, J(Ne, e), J(Be, Be.current), !0;
}
function Su(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(C(169));
  r ? (e = xc(e, t, Hr), n.__reactInternalMemoizedMergedChildContext = e, ne(Be), ne(Ne), J(Ne, e)) : ne(Be), J(Be, r);
}
var Nt = null, Xi = !1, xa = !1;
function bc(e) {
  Nt === null ? Nt = [e] : Nt.push(e);
}
function Dd(e) {
  Xi = !0, bc(e);
}
function vr() {
  if (!xa && Nt !== null) {
    xa = !0;
    var e = 0, t = q;
    try {
      var r = Nt;
      for (q = 1; e < r.length; e++) {
        var n = r[e];
        do
          n = n(!0);
        while (n !== null);
      }
      Nt = null, Xi = !1;
    } catch (o) {
      throw Nt !== null && (Nt = Nt.slice(e + 1)), B0(Vl, vr), o;
    } finally {
      q = t, xa = !1;
    }
  }
  return null;
}
var Zr = [], Jr = 0, mi = null, hi = 0, at = [], lt = 0, Tr = null, Lt = 1, Rt = "";
function $r(e, t) {
  Zr[Jr++] = hi, Zr[Jr++] = mi, mi = e, hi = t;
}
function zc(e, t, r) {
  at[lt++] = Lt, at[lt++] = Rt, at[lt++] = Tr, Tr = e;
  var n = Lt;
  e = Rt;
  var o = 32 - bt(n) - 1;
  n &= ~(1 << o), r += 1;
  var i = 32 - bt(t) + o;
  if (30 < i) {
    var a = o - o % 5;
    i = (n & (1 << a) - 1).toString(32), n >>= a, o -= a, Lt = 1 << 32 - bt(t) + o | r << o | n, Rt = i + e;
  } else Lt = 1 << i | r << o | n, Rt = e;
}
function rs(e) {
  e.return !== null && ($r(e, 1), zc(e, 1, 0));
}
function ns(e) {
  for (; e === mi; ) mi = Zr[--Jr], Zr[Jr] = null, hi = Zr[--Jr], Zr[Jr] = null;
  for (; e === Tr; ) Tr = at[--lt], at[lt] = null, Rt = at[--lt], at[lt] = null, Lt = at[--lt], at[lt] = null;
}
var Je = null, Ze = null, oe = !1, xt = null;
function wc(e, t) {
  var r = st(5, null, null, 0);
  r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
}
function Mu(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Je = e, Ze = ar(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Je = e, Ze = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Tr !== null ? { id: Lt, overflow: Rt } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = st(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, Je = e, Ze = null, !0) : !1;
    default:
      return !1;
  }
}
function pl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function dl(e) {
  if (oe) {
    var t = Ze;
    if (t) {
      var r = t;
      if (!Mu(e, t)) {
        if (pl(e)) throw Error(C(418));
        t = ar(r.nextSibling);
        var n = Je;
        t && Mu(e, t) ? wc(n, r) : (e.flags = e.flags & -4097 | 2, oe = !1, Je = e);
      }
    } else {
      if (pl(e)) throw Error(C(418));
      e.flags = e.flags & -4097 | 2, oe = !1, Je = e;
    }
  }
}
function Eu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Je = e;
}
function Lo(e) {
  if (e !== Je) return !1;
  if (!oe) return Eu(e), oe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !sl(e.type, e.memoizedProps)), t && (t = Ze)) {
    if (pl(e)) throw $c(), Error(C(418));
    for (; t; ) wc(e, t), t = ar(t.nextSibling);
  }
  if (Eu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Ze = ar(e.nextSibling);
              break e;
            }
            t--;
          } else r !== "$" && r !== "$!" && r !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ze = null;
    }
  } else Ze = Je ? ar(e.stateNode.nextSibling) : null;
  return !0;
}
function $c() {
  for (var e = Ze; e; ) e = ar(e.nextSibling);
}
function dn() {
  Ze = Je = null, oe = !1;
}
function os(e) {
  xt === null ? xt = [e] : xt.push(e);
}
var Ad = Dt.ReactCurrentBatchConfig;
function Hn(e, t, r) {
  if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (r._owner) {
      if (r = r._owner, r) {
        if (r.tag !== 1) throw Error(C(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(C(147, e));
      var o = n, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(a) {
        var l = o.refs;
        a === null ? delete l[i] : l[i] = a;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!r._owner) throw Error(C(290, e));
  }
  return e;
}
function Ro(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Cu(e) {
  var t = e._init;
  return t(e._payload);
}
function kc(e) {
  function t(p, c) {
    if (e) {
      var m = p.deletions;
      m === null ? (p.deletions = [c], p.flags |= 16) : m.push(c);
    }
  }
  function r(p, c) {
    if (!e) return null;
    for (; c !== null; ) t(p, c), c = c.sibling;
    return null;
  }
  function n(p, c) {
    for (p = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? p.set(c.key, c) : p.set(c.index, c), c = c.sibling;
    return p;
  }
  function o(p, c) {
    return p = cr(p, c), p.index = 0, p.sibling = null, p;
  }
  function i(p, c, m) {
    return p.index = m, e ? (m = p.alternate, m !== null ? (m = m.index, m < c ? (p.flags |= 2, c) : m) : (p.flags |= 2, c)) : (p.flags |= 1048576, c);
  }
  function a(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, c, m, h) {
    return c === null || c.tag !== 6 ? (c = Ma(m, p.mode, h), c.return = p, c) : (c = o(c, m), c.return = p, c);
  }
  function s(p, c, m, h) {
    var b = m.type;
    return b === Ur ? g(p, c, m.props.children, h, m.key) : c !== null && (c.elementType === b || typeof b == "object" && b !== null && b.$$typeof === Kt && Cu(b) === c.type) ? (h = o(c, m.props), h.ref = Hn(p, c, m), h.return = p, h) : (h = ri(m.type, m.key, m.props, null, p.mode, h), h.ref = Hn(p, c, m), h.return = p, h);
  }
  function u(p, c, m, h) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== m.containerInfo || c.stateNode.implementation !== m.implementation ? (c = Ea(m, p.mode, h), c.return = p, c) : (c = o(c, m.children || []), c.return = p, c);
  }
  function g(p, c, m, h, b) {
    return c === null || c.tag !== 7 ? (c = Wr(m, p.mode, h, b), c.return = p, c) : (c = o(c, m), c.return = p, c);
  }
  function f(p, c, m) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = Ma("" + c, p.mode, m), c.return = p, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case So:
          return m = ri(c.type, c.key, c.props, null, p.mode, m), m.ref = Hn(p, null, c), m.return = p, m;
        case Br:
          return c = Ea(c, p.mode, m), c.return = p, c;
        case Kt:
          var h = c._init;
          return f(p, h(c._payload), m);
      }
      if (Xn(c) || En(c)) return c = Wr(c, p.mode, m, null), c.return = p, c;
      Ro(p, c);
    }
    return null;
  }
  function d(p, c, m, h) {
    var b = c !== null ? c.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return b !== null ? null : l(p, c, "" + m, h);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case So:
          return m.key === b ? s(p, c, m, h) : null;
        case Br:
          return m.key === b ? u(p, c, m, h) : null;
        case Kt:
          return b = m._init, d(
            p,
            c,
            b(m._payload),
            h
          );
      }
      if (Xn(m) || En(m)) return b !== null ? null : g(p, c, m, h, null);
      Ro(p, m);
    }
    return null;
  }
  function v(p, c, m, h, b) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return p = p.get(m) || null, l(c, p, "" + h, b);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case So:
          return p = p.get(h.key === null ? m : h.key) || null, s(c, p, h, b);
        case Br:
          return p = p.get(h.key === null ? m : h.key) || null, u(c, p, h, b);
        case Kt:
          var z = h._init;
          return v(p, c, m, z(h._payload), b);
      }
      if (Xn(h) || En(h)) return p = p.get(m) || null, g(c, p, h, b, null);
      Ro(c, h);
    }
    return null;
  }
  function y(p, c, m, h) {
    for (var b = null, z = null, k = c, $ = c = 0, W = null; k !== null && $ < m.length; $++) {
      k.index > $ ? (W = k, k = null) : W = k.sibling;
      var M = d(p, k, m[$], h);
      if (M === null) {
        k === null && (k = W);
        break;
      }
      e && k && M.alternate === null && t(p, k), c = i(M, c, $), z === null ? b = M : z.sibling = M, z = M, k = W;
    }
    if ($ === m.length) return r(p, k), oe && $r(p, $), b;
    if (k === null) {
      for (; $ < m.length; $++) k = f(p, m[$], h), k !== null && (c = i(k, c, $), z === null ? b = k : z.sibling = k, z = k);
      return oe && $r(p, $), b;
    }
    for (k = n(p, k); $ < m.length; $++) W = v(k, p, $, m[$], h), W !== null && (e && W.alternate !== null && k.delete(W.key === null ? $ : W.key), c = i(W, c, $), z === null ? b = W : z.sibling = W, z = W);
    return e && k.forEach(function(H) {
      return t(p, H);
    }), oe && $r(p, $), b;
  }
  function x(p, c, m, h) {
    var b = En(m);
    if (typeof b != "function") throw Error(C(150));
    if (m = b.call(m), m == null) throw Error(C(151));
    for (var z = b = null, k = c, $ = c = 0, W = null, M = m.next(); k !== null && !M.done; $++, M = m.next()) {
      k.index > $ ? (W = k, k = null) : W = k.sibling;
      var H = d(p, k, M.value, h);
      if (H === null) {
        k === null && (k = W);
        break;
      }
      e && k && H.alternate === null && t(p, k), c = i(H, c, $), z === null ? b = H : z.sibling = H, z = H, k = W;
    }
    if (M.done) return r(
      p,
      k
    ), oe && $r(p, $), b;
    if (k === null) {
      for (; !M.done; $++, M = m.next()) M = f(p, M.value, h), M !== null && (c = i(M, c, $), z === null ? b = M : z.sibling = M, z = M);
      return oe && $r(p, $), b;
    }
    for (k = n(p, k); !M.done; $++, M = m.next()) M = v(k, p, $, M.value, h), M !== null && (e && M.alternate !== null && k.delete(M.key === null ? $ : M.key), c = i(M, c, $), z === null ? b = M : z.sibling = M, z = M);
    return e && k.forEach(function(N) {
      return t(p, N);
    }), oe && $r(p, $), b;
  }
  function w(p, c, m, h) {
    if (typeof m == "object" && m !== null && m.type === Ur && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case So:
          e: {
            for (var b = m.key, z = c; z !== null; ) {
              if (z.key === b) {
                if (b = m.type, b === Ur) {
                  if (z.tag === 7) {
                    r(p, z.sibling), c = o(z, m.props.children), c.return = p, p = c;
                    break e;
                  }
                } else if (z.elementType === b || typeof b == "object" && b !== null && b.$$typeof === Kt && Cu(b) === z.type) {
                  r(p, z.sibling), c = o(z, m.props), c.ref = Hn(p, z, m), c.return = p, p = c;
                  break e;
                }
                r(p, z);
                break;
              } else t(p, z);
              z = z.sibling;
            }
            m.type === Ur ? (c = Wr(m.props.children, p.mode, h, m.key), c.return = p, p = c) : (h = ri(m.type, m.key, m.props, null, p.mode, h), h.ref = Hn(p, c, m), h.return = p, p = h);
          }
          return a(p);
        case Br:
          e: {
            for (z = m.key; c !== null; ) {
              if (c.key === z) if (c.tag === 4 && c.stateNode.containerInfo === m.containerInfo && c.stateNode.implementation === m.implementation) {
                r(p, c.sibling), c = o(c, m.children || []), c.return = p, p = c;
                break e;
              } else {
                r(p, c);
                break;
              }
              else t(p, c);
              c = c.sibling;
            }
            c = Ea(m, p.mode, h), c.return = p, p = c;
          }
          return a(p);
        case Kt:
          return z = m._init, w(p, c, z(m._payload), h);
      }
      if (Xn(m)) return y(p, c, m, h);
      if (En(m)) return x(p, c, m, h);
      Ro(p, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, c !== null && c.tag === 6 ? (r(p, c.sibling), c = o(c, m), c.return = p, p = c) : (r(p, c), c = Ma(m, p.mode, h), c.return = p, p = c), a(p)) : r(p, c);
  }
  return w;
}
var gn = kc(!0), Sc = kc(!1), vi = hr(null), yi = null, en = null, is = null;
function as() {
  is = en = yi = null;
}
function ls(e) {
  var t = vi.current;
  ne(vi), e._currentValue = t;
}
function gl(e, t, r) {
  for (; e !== null; ) {
    var n = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === r) break;
    e = e.return;
  }
}
function sn(e, t) {
  yi = e, is = en = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (je = !0), e.firstContext = null);
}
function ft(e) {
  var t = e._currentValue;
  if (is !== e) if (e = { context: e, memoizedValue: t, next: null }, en === null) {
    if (yi === null) throw Error(C(308));
    en = e, yi.dependencies = { lanes: 0, firstContext: e };
  } else en = en.next = e;
  return t;
}
var Er = null;
function ss(e) {
  Er === null ? Er = [e] : Er.push(e);
}
function Mc(e, t, r, n) {
  var o = t.interleaved;
  return o === null ? (r.next = r, ss(t)) : (r.next = o.next, o.next = r), t.interleaved = r, Ot(e, n);
}
function Ot(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
  return r.tag === 3 ? r.stateNode : null;
}
var Zt = !1;
function us(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ec(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Xt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function lr(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (n = n.shared, V & 2) {
    var o = n.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), n.pending = t, Ot(e, r);
  }
  return o = n.interleaved, o === null ? (t.next = t, ss(n)) : (t.next = o.next, o.next = t), n.interleaved = t, Ot(e, r);
}
function Go(e, t, r) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
    var n = t.lanes;
    n &= e.pendingLanes, r |= n, t.lanes = r, Ql(e, r);
  }
}
function _u(e, t) {
  var r = e.updateQueue, n = e.alternate;
  if (n !== null && (n = n.updateQueue, r === n)) {
    var o = null, i = null;
    if (r = r.firstBaseUpdate, r !== null) {
      do {
        var a = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
        i === null ? o = i = a : i = i.next = a, r = r.next;
      } while (r !== null);
      i === null ? o = i = t : i = i.next = t;
    } else o = i = t;
    r = { baseState: n.baseState, firstBaseUpdate: o, lastBaseUpdate: i, shared: n.shared, effects: n.effects }, e.updateQueue = r;
    return;
  }
  e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
}
function xi(e, t, r, n) {
  var o = e.updateQueue;
  Zt = !1;
  var i = o.firstBaseUpdate, a = o.lastBaseUpdate, l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var s = l, u = s.next;
    s.next = null, a === null ? i = u : a.next = u, a = s;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, l = g.lastBaseUpdate, l !== a && (l === null ? g.firstBaseUpdate = u : l.next = u, g.lastBaseUpdate = s));
  }
  if (i !== null) {
    var f = o.baseState;
    a = 0, g = u = s = null, l = i;
    do {
      var d = l.lane, v = l.eventTime;
      if ((n & d) === d) {
        g !== null && (g = g.next = {
          eventTime: v,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        e: {
          var y = e, x = l;
          switch (d = t, v = r, x.tag) {
            case 1:
              if (y = x.payload, typeof y == "function") {
                f = y.call(v, f, d);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = x.payload, d = typeof y == "function" ? y.call(v, f, d) : y, d == null) break e;
              f = se({}, f, d);
              break e;
            case 2:
              Zt = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (e.flags |= 64, d = o.effects, d === null ? o.effects = [l] : d.push(l));
      } else v = { eventTime: v, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, g === null ? (u = g = v, s = f) : g = g.next = v, a |= d;
      if (l = l.next, l === null) {
        if (l = o.shared.pending, l === null) break;
        d = l, l = d.next, d.next = null, o.lastBaseUpdate = d, o.shared.pending = null;
      }
    } while (!0);
    if (g === null && (s = f), o.baseState = s, o.firstBaseUpdate = u, o.lastBaseUpdate = g, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        a |= o.lane, o = o.next;
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    Lr |= a, e.lanes = a, e.memoizedState = f;
  }
}
function Wu(e, t, r) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var n = e[t], o = n.callback;
    if (o !== null) {
      if (n.callback = null, n = r, typeof o != "function") throw Error(C(191, o));
      o.call(n);
    }
  }
}
var yo = {}, Wt = hr(yo), ao = hr(yo), lo = hr(yo);
function Cr(e) {
  if (e === yo) throw Error(C(174));
  return e;
}
function cs(e, t) {
  switch (J(lo, t), J(ao, e), J(Wt, yo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Qa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Qa(t, e);
  }
  ne(Wt), J(Wt, t);
}
function mn() {
  ne(Wt), ne(ao), ne(lo);
}
function Cc(e) {
  Cr(lo.current);
  var t = Cr(Wt.current), r = Qa(t, e.type);
  t !== r && (J(ao, e), J(Wt, r));
}
function fs(e) {
  ao.current === e && (ne(Wt), ne(ao));
}
var ie = hr(0);
function bi(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ba = [];
function ps() {
  for (var e = 0; e < ba.length; e++) ba[e]._workInProgressVersionPrimary = null;
  ba.length = 0;
}
var Ko = Dt.ReactCurrentDispatcher, za = Dt.ReactCurrentBatchConfig, Nr = 0, le = null, be = null, ke = null, zi = !1, Bn = !1, so = 0, jd = 0;
function Pe() {
  throw Error(C(321));
}
function ds(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++) if (!wt(e[r], t[r])) return !1;
  return !0;
}
function gs(e, t, r, n, o, i) {
  if (Nr = i, le = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ko.current = e === null || e.memoizedState === null ? Qd : qd, e = r(n, o), Bn) {
    i = 0;
    do {
      if (Bn = !1, so = 0, 25 <= i) throw Error(C(301));
      i += 1, ke = be = null, t.updateQueue = null, Ko.current = Gd, e = r(n, o);
    } while (Bn);
  }
  if (Ko.current = wi, t = be !== null && be.next !== null, Nr = 0, ke = be = le = null, zi = !1, t) throw Error(C(300));
  return e;
}
function ms() {
  var e = so !== 0;
  return so = 0, e;
}
function Et() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ke === null ? le.memoizedState = ke = e : ke = ke.next = e, ke;
}
function pt() {
  if (be === null) {
    var e = le.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = be.next;
  var t = ke === null ? le.memoizedState : ke.next;
  if (t !== null) ke = t, be = e;
  else {
    if (e === null) throw Error(C(310));
    be = e, e = { memoizedState: be.memoizedState, baseState: be.baseState, baseQueue: be.baseQueue, queue: be.queue, next: null }, ke === null ? le.memoizedState = ke = e : ke = ke.next = e;
  }
  return ke;
}
function uo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wa(e) {
  var t = pt(), r = t.queue;
  if (r === null) throw Error(C(311));
  r.lastRenderedReducer = e;
  var n = be, o = n.baseQueue, i = r.pending;
  if (i !== null) {
    if (o !== null) {
      var a = o.next;
      o.next = i.next, i.next = a;
    }
    n.baseQueue = o = i, r.pending = null;
  }
  if (o !== null) {
    i = o.next, n = n.baseState;
    var l = a = null, s = null, u = i;
    do {
      var g = u.lane;
      if ((Nr & g) === g) s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), n = u.hasEagerState ? u.eagerState : e(n, u.action);
      else {
        var f = {
          lane: g,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        s === null ? (l = s = f, a = n) : s = s.next = f, le.lanes |= g, Lr |= g;
      }
      u = u.next;
    } while (u !== null && u !== i);
    s === null ? a = n : s.next = l, wt(n, t.memoizedState) || (je = !0), t.memoizedState = n, t.baseState = a, t.baseQueue = s, r.lastRenderedState = n;
  }
  if (e = r.interleaved, e !== null) {
    o = e;
    do
      i = o.lane, le.lanes |= i, Lr |= i, o = o.next;
    while (o !== e);
  } else o === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function $a(e) {
  var t = pt(), r = t.queue;
  if (r === null) throw Error(C(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch, o = r.pending, i = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var a = o = o.next;
    do
      i = e(i, a.action), a = a.next;
    while (a !== o);
    wt(i, t.memoizedState) || (je = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), r.lastRenderedState = i;
  }
  return [i, n];
}
function _c() {
}
function Wc(e, t) {
  var r = le, n = pt(), o = t(), i = !wt(n.memoizedState, o);
  if (i && (n.memoizedState = o, je = !0), n = n.queue, hs(Tc.bind(null, r, n, e), [e]), n.getSnapshot !== t || i || ke !== null && ke.memoizedState.tag & 1) {
    if (r.flags |= 2048, co(9, Hc.bind(null, r, n, o, t), void 0, null), Se === null) throw Error(C(349));
    Nr & 30 || Pc(r, t, o);
  }
  return o;
}
function Pc(e, t, r) {
  e.flags |= 16384, e = { getSnapshot: t, value: r }, t = le.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, le.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
}
function Hc(e, t, r, n) {
  t.value = r, t.getSnapshot = n, Nc(t) && Lc(e);
}
function Tc(e, t, r) {
  return r(function() {
    Nc(t) && Lc(e);
  });
}
function Nc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !wt(e, r);
  } catch {
    return !0;
  }
}
function Lc(e) {
  var t = Ot(e, 1);
  t !== null && zt(t, e, 1, -1);
}
function Pu(e) {
  var t = Et();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: uo, lastRenderedState: e }, t.queue = e, e = e.dispatch = Vd.bind(null, le, e), [t.memoizedState, e];
}
function co(e, t, r, n) {
  return e = { tag: e, create: t, destroy: r, deps: n, next: null }, t = le.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, le.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (n = r.next, r.next = e, e.next = n, t.lastEffect = e)), e;
}
function Rc() {
  return pt().memoizedState;
}
function Zo(e, t, r, n) {
  var o = Et();
  le.flags |= e, o.memoizedState = co(1 | t, r, void 0, n === void 0 ? null : n);
}
function Fi(e, t, r, n) {
  var o = pt();
  n = n === void 0 ? null : n;
  var i = void 0;
  if (be !== null) {
    var a = be.memoizedState;
    if (i = a.destroy, n !== null && ds(n, a.deps)) {
      o.memoizedState = co(t, r, i, n);
      return;
    }
  }
  le.flags |= e, o.memoizedState = co(1 | t, r, i, n);
}
function Hu(e, t) {
  return Zo(8390656, 8, e, t);
}
function hs(e, t) {
  return Fi(2048, 8, e, t);
}
function Xc(e, t) {
  return Fi(4, 2, e, t);
}
function Fc(e, t) {
  return Fi(4, 4, e, t);
}
function Yc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Oc(e, t, r) {
  return r = r != null ? r.concat([e]) : null, Fi(4, 4, Yc.bind(null, t, e), r);
}
function vs() {
}
function Ic(e, t) {
  var r = pt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && ds(t, n[1]) ? n[0] : (r.memoizedState = [e, t], e);
}
function Dc(e, t) {
  var r = pt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && ds(t, n[1]) ? n[0] : (e = e(), r.memoizedState = [e, t], e);
}
function Ac(e, t, r) {
  return Nr & 21 ? (wt(r, t) || (r = Q0(), le.lanes |= r, Lr |= r, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, je = !0), e.memoizedState = r);
}
function Bd(e, t) {
  var r = q;
  q = r !== 0 && 4 > r ? r : 4, e(!0);
  var n = za.transition;
  za.transition = {};
  try {
    e(!1), t();
  } finally {
    q = r, za.transition = n;
  }
}
function jc() {
  return pt().memoizedState;
}
function Ud(e, t, r) {
  var n = ur(e);
  if (r = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null }, Bc(e)) Uc(t, r);
  else if (r = Mc(e, t, r, n), r !== null) {
    var o = Fe();
    zt(r, e, n, o), Vc(r, t, n);
  }
}
function Vd(e, t, r) {
  var n = ur(e), o = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Bc(e)) Uc(t, o);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var a = t.lastRenderedState, l = i(a, r);
      if (o.hasEagerState = !0, o.eagerState = l, wt(l, a)) {
        var s = t.interleaved;
        s === null ? (o.next = o, ss(t)) : (o.next = s.next, s.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    r = Mc(e, t, o, n), r !== null && (o = Fe(), zt(r, e, n, o), Vc(r, t, n));
  }
}
function Bc(e) {
  var t = e.alternate;
  return e === le || t !== null && t === le;
}
function Uc(e, t) {
  Bn = zi = !0;
  var r = e.pending;
  r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
}
function Vc(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    n &= e.pendingLanes, r |= n, t.lanes = r, Ql(e, r);
  }
}
var wi = { readContext: ft, useCallback: Pe, useContext: Pe, useEffect: Pe, useImperativeHandle: Pe, useInsertionEffect: Pe, useLayoutEffect: Pe, useMemo: Pe, useReducer: Pe, useRef: Pe, useState: Pe, useDebugValue: Pe, useDeferredValue: Pe, useTransition: Pe, useMutableSource: Pe, useSyncExternalStore: Pe, useId: Pe, unstable_isNewReconciler: !1 }, Qd = { readContext: ft, useCallback: function(e, t) {
  return Et().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ft, useEffect: Hu, useImperativeHandle: function(e, t, r) {
  return r = r != null ? r.concat([e]) : null, Zo(
    4194308,
    4,
    Yc.bind(null, t, e),
    r
  );
}, useLayoutEffect: function(e, t) {
  return Zo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Zo(4, 2, e, t);
}, useMemo: function(e, t) {
  var r = Et();
  return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
}, useReducer: function(e, t, r) {
  var n = Et();
  return t = r !== void 0 ? r(t) : t, n.memoizedState = n.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, n.queue = e, e = e.dispatch = Ud.bind(null, le, e), [n.memoizedState, e];
}, useRef: function(e) {
  var t = Et();
  return e = { current: e }, t.memoizedState = e;
}, useState: Pu, useDebugValue: vs, useDeferredValue: function(e) {
  return Et().memoizedState = e;
}, useTransition: function() {
  var e = Pu(!1), t = e[0];
  return e = Bd.bind(null, e[1]), Et().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, r) {
  var n = le, o = Et();
  if (oe) {
    if (r === void 0) throw Error(C(407));
    r = r();
  } else {
    if (r = t(), Se === null) throw Error(C(349));
    Nr & 30 || Pc(n, t, r);
  }
  o.memoizedState = r;
  var i = { value: r, getSnapshot: t };
  return o.queue = i, Hu(Tc.bind(
    null,
    n,
    i,
    e
  ), [e]), n.flags |= 2048, co(9, Hc.bind(null, n, i, r, t), void 0, null), r;
}, useId: function() {
  var e = Et(), t = Se.identifierPrefix;
  if (oe) {
    var r = Rt, n = Lt;
    r = (n & ~(1 << 32 - bt(n) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = so++, 0 < r && (t += "H" + r.toString(32)), t += ":";
  } else r = jd++, t = ":" + t + "r" + r.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, qd = {
  readContext: ft,
  useCallback: Ic,
  useContext: ft,
  useEffect: hs,
  useImperativeHandle: Oc,
  useInsertionEffect: Xc,
  useLayoutEffect: Fc,
  useMemo: Dc,
  useReducer: wa,
  useRef: Rc,
  useState: function() {
    return wa(uo);
  },
  useDebugValue: vs,
  useDeferredValue: function(e) {
    var t = pt();
    return Ac(t, be.memoizedState, e);
  },
  useTransition: function() {
    var e = wa(uo)[0], t = pt().memoizedState;
    return [e, t];
  },
  useMutableSource: _c,
  useSyncExternalStore: Wc,
  useId: jc,
  unstable_isNewReconciler: !1
}, Gd = { readContext: ft, useCallback: Ic, useContext: ft, useEffect: hs, useImperativeHandle: Oc, useInsertionEffect: Xc, useLayoutEffect: Fc, useMemo: Dc, useReducer: $a, useRef: Rc, useState: function() {
  return $a(uo);
}, useDebugValue: vs, useDeferredValue: function(e) {
  var t = pt();
  return be === null ? t.memoizedState = e : Ac(t, be.memoizedState, e);
}, useTransition: function() {
  var e = $a(uo)[0], t = pt().memoizedState;
  return [e, t];
}, useMutableSource: _c, useSyncExternalStore: Wc, useId: jc, unstable_isNewReconciler: !1 };
function vt(e, t) {
  if (e && e.defaultProps) {
    t = se({}, t), e = e.defaultProps;
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function ml(e, t, r, n) {
  t = e.memoizedState, r = r(n, t), r = r == null ? t : se({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
}
var Yi = { isMounted: function(e) {
  return (e = e._reactInternals) ? Yr(e) === e : !1;
}, enqueueSetState: function(e, t, r) {
  e = e._reactInternals;
  var n = Fe(), o = ur(e), i = Xt(n, o);
  i.payload = t, r != null && (i.callback = r), t = lr(e, i, o), t !== null && (zt(t, e, o, n), Go(t, e, o));
}, enqueueReplaceState: function(e, t, r) {
  e = e._reactInternals;
  var n = Fe(), o = ur(e), i = Xt(n, o);
  i.tag = 1, i.payload = t, r != null && (i.callback = r), t = lr(e, i, o), t !== null && (zt(t, e, o, n), Go(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var r = Fe(), n = ur(e), o = Xt(r, n);
  o.tag = 2, t != null && (o.callback = t), t = lr(e, o, n), t !== null && (zt(t, e, n, r), Go(t, e, n));
} };
function Tu(e, t, r, n, o, i, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, i, a) : t.prototype && t.prototype.isPureReactComponent ? !ro(r, n) || !ro(o, i) : !0;
}
function Qc(e, t, r) {
  var n = !1, o = gr, i = t.contextType;
  return typeof i == "object" && i !== null ? i = ft(i) : (o = Ue(t) ? Hr : Ne.current, n = t.contextTypes, i = (n = n != null) ? pn(e, o) : gr), t = new t(r, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Yi, e.stateNode = t, t._reactInternals = e, n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Nu(e, t, r, n) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, n), t.state !== e && Yi.enqueueReplaceState(t, t.state, null);
}
function hl(e, t, r, n) {
  var o = e.stateNode;
  o.props = r, o.state = e.memoizedState, o.refs = {}, us(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? o.context = ft(i) : (i = Ue(t) ? Hr : Ne.current, o.context = pn(e, i)), o.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (ml(e, t, i, r), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && Yi.enqueueReplaceState(o, o.state, null), xi(e, r, o, n), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function hn(e, t) {
  try {
    var r = "", n = t;
    do
      r += kp(n), n = n.return;
    while (n);
    var o = r;
  } catch (i) {
    o = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function ka(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function vl(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function() {
      throw r;
    });
  }
}
var Kd = typeof WeakMap == "function" ? WeakMap : Map;
function qc(e, t, r) {
  r = Xt(-1, r), r.tag = 3, r.payload = { element: null };
  var n = t.value;
  return r.callback = function() {
    ki || (ki = !0, El = n), vl(e, t);
  }, r;
}
function Gc(e, t, r) {
  r = Xt(-1, r), r.tag = 3;
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var o = t.value;
    r.payload = function() {
      return n(o);
    }, r.callback = function() {
      vl(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (r.callback = function() {
    vl(e, t), typeof n != "function" && (sr === null ? sr = /* @__PURE__ */ new Set([this]) : sr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), r;
}
function Lu(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new Kd();
    var o = /* @__PURE__ */ new Set();
    n.set(t, o);
  } else o = n.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), n.set(t, o));
  o.has(r) || (o.add(r), e = f1.bind(null, e, t, r), t.then(e, e));
}
function Ru(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Xu(e, t, r, n, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Xt(-1, 1), t.tag = 2, lr(r, t, 1))), r.lanes |= 1), e);
}
var Zd = Dt.ReactCurrentOwner, je = !1;
function Xe(e, t, r, n) {
  t.child = e === null ? Sc(t, null, r, n) : gn(t, e.child, r, n);
}
function Fu(e, t, r, n, o) {
  r = r.render;
  var i = t.ref;
  return sn(t, o), n = gs(e, t, r, n, i, o), r = ms(), e !== null && !je ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, It(e, t, o)) : (oe && r && rs(t), t.flags |= 1, Xe(e, t, n, o), t.child);
}
function Yu(e, t, r, n, o) {
  if (e === null) {
    var i = r.type;
    return typeof i == "function" && !Ss(i) && i.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = i, Kc(e, t, i, n, o)) : (e = ri(r.type, null, n, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & o)) {
    var a = i.memoizedProps;
    if (r = r.compare, r = r !== null ? r : ro, r(a, n) && e.ref === t.ref) return It(e, t, o);
  }
  return t.flags |= 1, e = cr(i, n), e.ref = t.ref, e.return = t, t.child = e;
}
function Kc(e, t, r, n, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (ro(i, n) && e.ref === t.ref) if (je = !1, t.pendingProps = n = i, (e.lanes & o) !== 0) e.flags & 131072 && (je = !0);
    else return t.lanes = e.lanes, It(e, t, o);
  }
  return yl(e, t, r, n, o);
}
function Zc(e, t, r) {
  var n = t.pendingProps, o = n.children, i = e !== null ? e.memoizedState : null;
  if (n.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, J(rn, Ke), Ke |= r;
  else {
    if (!(r & 1073741824)) return e = i !== null ? i.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, J(rn, Ke), Ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, n = i !== null ? i.baseLanes : r, J(rn, Ke), Ke |= n;
  }
  else i !== null ? (n = i.baseLanes | r, t.memoizedState = null) : n = r, J(rn, Ke), Ke |= n;
  return Xe(e, t, o, r), t.child;
}
function Jc(e, t) {
  var r = t.ref;
  (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
}
function yl(e, t, r, n, o) {
  var i = Ue(r) ? Hr : Ne.current;
  return i = pn(t, i), sn(t, o), r = gs(e, t, r, n, i, o), n = ms(), e !== null && !je ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, It(e, t, o)) : (oe && n && rs(t), t.flags |= 1, Xe(e, t, r, o), t.child);
}
function Ou(e, t, r, n, o) {
  if (Ue(r)) {
    var i = !0;
    gi(t);
  } else i = !1;
  if (sn(t, o), t.stateNode === null) Jo(e, t), Qc(t, r, n), hl(t, r, n, o), n = !0;
  else if (e === null) {
    var a = t.stateNode, l = t.memoizedProps;
    a.props = l;
    var s = a.context, u = r.contextType;
    typeof u == "object" && u !== null ? u = ft(u) : (u = Ue(r) ? Hr : Ne.current, u = pn(t, u));
    var g = r.getDerivedStateFromProps, f = typeof g == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== n || s !== u) && Nu(t, a, n, u), Zt = !1;
    var d = t.memoizedState;
    a.state = d, xi(t, n, a, o), s = t.memoizedState, l !== n || d !== s || Be.current || Zt ? (typeof g == "function" && (ml(t, r, g, n), s = t.memoizedState), (l = Zt || Tu(t, r, l, n, d, s, u)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = s), a.props = n, a.state = s, a.context = u, n = l) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), n = !1);
  } else {
    a = t.stateNode, Ec(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : vt(t.type, l), a.props = u, f = t.pendingProps, d = a.context, s = r.contextType, typeof s == "object" && s !== null ? s = ft(s) : (s = Ue(r) ? Hr : Ne.current, s = pn(t, s));
    var v = r.getDerivedStateFromProps;
    (g = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l !== f || d !== s) && Nu(t, a, n, s), Zt = !1, d = t.memoizedState, a.state = d, xi(t, n, a, o);
    var y = t.memoizedState;
    l !== f || d !== y || Be.current || Zt ? (typeof v == "function" && (ml(t, r, v, n), y = t.memoizedState), (u = Zt || Tu(t, r, u, n, d, y, s) || !1) ? (g || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(n, y, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(n, y, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = y), a.props = n, a.state = y, a.context = s, n = u) : (typeof a.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), n = !1);
  }
  return xl(e, t, r, n, i, o);
}
function xl(e, t, r, n, o, i) {
  Jc(e, t);
  var a = (t.flags & 128) !== 0;
  if (!n && !a) return o && Su(t, r, !1), It(e, t, i);
  n = t.stateNode, Zd.current = t;
  var l = a && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  return t.flags |= 1, e !== null && a ? (t.child = gn(t, e.child, null, i), t.child = gn(t, null, l, i)) : Xe(e, t, l, i), t.memoizedState = n.state, o && Su(t, r, !0), t.child;
}
function ef(e) {
  var t = e.stateNode;
  t.pendingContext ? ku(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ku(e, t.context, !1), cs(e, t.containerInfo);
}
function Iu(e, t, r, n, o) {
  return dn(), os(o), t.flags |= 256, Xe(e, t, r, n), t.child;
}
var bl = { dehydrated: null, treeContext: null, retryLane: 0 };
function zl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tf(e, t, r) {
  var n = t.pendingProps, o = ie.current, i = !1, a = (t.flags & 128) !== 0, l;
  if ((l = a) || (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), l ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), J(ie, o & 1), e === null)
    return dl(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = n.children, e = n.fallback, i ? (n = t.mode, i = t.child, a = { mode: "hidden", children: a }, !(n & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = a) : i = Di(a, n, 0, null), e = Wr(e, n, r, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = zl(r), t.memoizedState = bl, e) : ys(t, a));
  if (o = e.memoizedState, o !== null && (l = o.dehydrated, l !== null)) return Jd(e, t, a, n, l, o, r);
  if (i) {
    i = n.fallback, a = t.mode, o = e.child, l = o.sibling;
    var s = { mode: "hidden", children: n.children };
    return !(a & 1) && t.child !== o ? (n = t.child, n.childLanes = 0, n.pendingProps = s, t.deletions = null) : (n = cr(o, s), n.subtreeFlags = o.subtreeFlags & 14680064), l !== null ? i = cr(l, i) : (i = Wr(i, a, r, null), i.flags |= 2), i.return = t, n.return = t, n.sibling = i, t.child = n, n = i, i = t.child, a = e.child.memoizedState, a = a === null ? zl(r) : { baseLanes: a.baseLanes | r, cachePool: null, transitions: a.transitions }, i.memoizedState = a, i.childLanes = e.childLanes & ~r, t.memoizedState = bl, n;
  }
  return i = e.child, e = i.sibling, n = cr(i, { mode: "visible", children: n.children }), !(t.mode & 1) && (n.lanes = r), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n;
}
function ys(e, t) {
  return t = Di({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Xo(e, t, r, n) {
  return n !== null && os(n), gn(t, e.child, null, r), e = ys(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Jd(e, t, r, n, o, i, a) {
  if (r)
    return t.flags & 256 ? (t.flags &= -257, n = ka(Error(C(422))), Xo(e, t, a, n)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = n.fallback, o = t.mode, n = Di({ mode: "visible", children: n.children }, o, 0, null), i = Wr(i, o, a, null), i.flags |= 2, n.return = t, i.return = t, n.sibling = i, t.child = n, t.mode & 1 && gn(t, e.child, null, a), t.child.memoizedState = zl(a), t.memoizedState = bl, i);
  if (!(t.mode & 1)) return Xo(e, t, a, null);
  if (o.data === "$!") {
    if (n = o.nextSibling && o.nextSibling.dataset, n) var l = n.dgst;
    return n = l, i = Error(C(419)), n = ka(i, n, void 0), Xo(e, t, a, n);
  }
  if (l = (a & e.childLanes) !== 0, je || l) {
    if (n = Se, n !== null) {
      switch (a & -a) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (n.suspendedLanes | a) ? 0 : o, o !== 0 && o !== i.retryLane && (i.retryLane = o, Ot(e, o), zt(n, e, o, -1));
    }
    return ks(), n = ka(Error(C(421))), Xo(e, t, a, n);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = p1.bind(null, e), o._reactRetry = t, null) : (e = i.treeContext, Ze = ar(o.nextSibling), Je = t, oe = !0, xt = null, e !== null && (at[lt++] = Lt, at[lt++] = Rt, at[lt++] = Tr, Lt = e.id, Rt = e.overflow, Tr = t), t = ys(t, n.children), t.flags |= 4096, t);
}
function Du(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  n !== null && (n.lanes |= t), gl(e.return, t, r);
}
function Sa(e, t, r, n, o) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: n, tail: r, tailMode: o } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = n, i.tail = r, i.tailMode = o);
}
function rf(e, t, r) {
  var n = t.pendingProps, o = n.revealOrder, i = n.tail;
  if (Xe(e, t, n.children, r), n = ie.current, n & 2) n = n & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Du(e, r, t);
      else if (e.tag === 19) Du(e, r, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    n &= 1;
  }
  if (J(ie, n), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (r = t.child, o = null; r !== null; ) e = r.alternate, e !== null && bi(e) === null && (o = r), r = r.sibling;
      r = o, r === null ? (o = t.child, t.child = null) : (o = r.sibling, r.sibling = null), Sa(t, !1, o, r, i);
      break;
    case "backwards":
      for (r = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && bi(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = r, r = o, o = e;
      }
      Sa(t, !0, r, null, i);
      break;
    case "together":
      Sa(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Jo(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function It(e, t, r) {
  if (e !== null && (t.dependencies = e.dependencies), Lr |= t.lanes, !(r & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, r = cr(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = cr(e, e.pendingProps), r.return = t;
    r.sibling = null;
  }
  return t.child;
}
function e1(e, t, r) {
  switch (t.tag) {
    case 3:
      ef(t), dn();
      break;
    case 5:
      Cc(t);
      break;
    case 1:
      Ue(t.type) && gi(t);
      break;
    case 4:
      cs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context, o = t.memoizedProps.value;
      J(vi, n._currentValue), n._currentValue = o;
      break;
    case 13:
      if (n = t.memoizedState, n !== null)
        return n.dehydrated !== null ? (J(ie, ie.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? tf(e, t, r) : (J(ie, ie.current & 1), e = It(e, t, r), e !== null ? e.sibling : null);
      J(ie, ie.current & 1);
      break;
    case 19:
      if (n = (r & t.childLanes) !== 0, e.flags & 128) {
        if (n) return rf(e, t, r);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), J(ie, ie.current), n) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zc(e, t, r);
  }
  return It(e, t, r);
}
var nf, wl, of, af;
nf = function(e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      r.child.return = r, r = r.child;
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    r.sibling.return = r.return, r = r.sibling;
  }
};
wl = function() {
};
of = function(e, t, r, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    e = t.stateNode, Cr(Wt.current);
    var i = null;
    switch (r) {
      case "input":
        o = ja(e, o), n = ja(e, n), i = [];
        break;
      case "select":
        o = se({}, o, { value: void 0 }), n = se({}, n, { value: void 0 }), i = [];
        break;
      case "textarea":
        o = Va(e, o), n = Va(e, n), i = [];
        break;
      default:
        typeof o.onClick != "function" && typeof n.onClick == "function" && (e.onclick = pi);
    }
    qa(r, n);
    var a;
    r = null;
    for (u in o) if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null) if (u === "style") {
      var l = o[u];
      for (a in l) l.hasOwnProperty(a) && (r || (r = {}), r[a] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (qn.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in n) {
      var s = n[u];
      if (l = o?.[u], n.hasOwnProperty(u) && s !== l && (s != null || l != null)) if (u === "style") if (l) {
        for (a in l) !l.hasOwnProperty(a) || s && s.hasOwnProperty(a) || (r || (r = {}), r[a] = "");
        for (a in s) s.hasOwnProperty(a) && l[a] !== s[a] && (r || (r = {}), r[a] = s[a]);
      } else r || (i || (i = []), i.push(
        u,
        r
      )), r = s;
      else u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, s != null && l !== s && (i = i || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (qn.hasOwnProperty(u) ? (s != null && u === "onScroll" && re("scroll", e), i || l === s || (i = [])) : (i = i || []).push(u, s));
    }
    r && (i = i || []).push("style", r);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
af = function(e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function Tn(e, t) {
  if (!oe) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
      r === null ? e.tail = null : r.sibling = null;
      break;
    case "collapsed":
      r = e.tail;
      for (var n = null; r !== null; ) r.alternate !== null && (n = r), r = r.sibling;
      n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
  }
}
function He(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, r = 0, n = 0;
  if (t) for (var o = e.child; o !== null; ) r |= o.lanes | o.childLanes, n |= o.subtreeFlags & 14680064, n |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) r |= o.lanes | o.childLanes, n |= o.subtreeFlags, n |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= n, e.childLanes = r, t;
}
function t1(e, t, r) {
  var n = t.pendingProps;
  switch (ns(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return He(t), null;
    case 1:
      return Ue(t.type) && di(), He(t), null;
    case 3:
      return n = t.stateNode, mn(), ne(Be), ne(Ne), ps(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Lo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, xt !== null && (Wl(xt), xt = null))), wl(e, t), He(t), null;
    case 5:
      fs(t);
      var o = Cr(lo.current);
      if (r = t.type, e !== null && t.stateNode != null) of(e, t, r, n, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(C(166));
          return He(t), null;
        }
        if (e = Cr(Wt.current), Lo(t)) {
          n = t.stateNode, r = t.type;
          var i = t.memoizedProps;
          switch (n[Ct] = t, n[io] = i, e = (t.mode & 1) !== 0, r) {
            case "dialog":
              re("cancel", n), re("close", n);
              break;
            case "iframe":
            case "object":
            case "embed":
              re("load", n);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Yn.length; o++) re(Yn[o], n);
              break;
            case "source":
              re("error", n);
              break;
            case "img":
            case "image":
            case "link":
              re(
                "error",
                n
              ), re("load", n);
              break;
            case "details":
              re("toggle", n);
              break;
            case "input":
              Ks(n, i), re("invalid", n);
              break;
            case "select":
              n._wrapperState = { wasMultiple: !!i.multiple }, re("invalid", n);
              break;
            case "textarea":
              Js(n, i), re("invalid", n);
          }
          qa(r, i), o = null;
          for (var a in i) if (i.hasOwnProperty(a)) {
            var l = i[a];
            a === "children" ? typeof l == "string" ? n.textContent !== l && (i.suppressHydrationWarning !== !0 && No(n.textContent, l, e), o = ["children", l]) : typeof l == "number" && n.textContent !== "" + l && (i.suppressHydrationWarning !== !0 && No(
              n.textContent,
              l,
              e
            ), o = ["children", "" + l]) : qn.hasOwnProperty(a) && l != null && a === "onScroll" && re("scroll", n);
          }
          switch (r) {
            case "input":
              Mo(n), Zs(n, i, !0);
              break;
            case "textarea":
              Mo(n), eu(n);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (n.onclick = pi);
          }
          n = o, t.updateQueue = n, n !== null && (t.flags |= 4);
        } else {
          a = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = T0(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof n.is == "string" ? e = a.createElement(r, { is: n.is }) : (e = a.createElement(r), r === "select" && (a = e, n.multiple ? a.multiple = !0 : n.size && (a.size = n.size))) : e = a.createElementNS(e, r), e[Ct] = t, e[io] = n, nf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = Ga(r, n), r) {
              case "dialog":
                re("cancel", e), re("close", e), o = n;
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", e), o = n;
                break;
              case "video":
              case "audio":
                for (o = 0; o < Yn.length; o++) re(Yn[o], e);
                o = n;
                break;
              case "source":
                re("error", e), o = n;
                break;
              case "img":
              case "image":
              case "link":
                re(
                  "error",
                  e
                ), re("load", e), o = n;
                break;
              case "details":
                re("toggle", e), o = n;
                break;
              case "input":
                Ks(e, n), o = ja(e, n), re("invalid", e);
                break;
              case "option":
                o = n;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!n.multiple }, o = se({}, n, { value: void 0 }), re("invalid", e);
                break;
              case "textarea":
                Js(e, n), o = Va(e, n), re("invalid", e);
                break;
              default:
                o = n;
            }
            qa(r, o), l = o;
            for (i in l) if (l.hasOwnProperty(i)) {
              var s = l[i];
              i === "style" ? R0(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && N0(e, s)) : i === "children" ? typeof s == "string" ? (r !== "textarea" || s !== "") && Gn(e, s) : typeof s == "number" && Gn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (qn.hasOwnProperty(i) ? s != null && i === "onScroll" && re("scroll", e) : s != null && Dl(e, i, s, a));
            }
            switch (r) {
              case "input":
                Mo(e), Zs(e, n, !1);
                break;
              case "textarea":
                Mo(e), eu(e);
                break;
              case "option":
                n.value != null && e.setAttribute("value", "" + dr(n.value));
                break;
              case "select":
                e.multiple = !!n.multiple, i = n.value, i != null ? nn(e, !!n.multiple, i, !1) : n.defaultValue != null && nn(
                  e,
                  !!n.multiple,
                  n.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = pi);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return He(t), null;
    case 6:
      if (e && t.stateNode != null) af(e, t, e.memoizedProps, n);
      else {
        if (typeof n != "string" && t.stateNode === null) throw Error(C(166));
        if (r = Cr(lo.current), Cr(Wt.current), Lo(t)) {
          if (n = t.stateNode, r = t.memoizedProps, n[Ct] = t, (i = n.nodeValue !== r) && (e = Je, e !== null)) switch (e.tag) {
            case 3:
              No(n.nodeValue, r, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && No(n.nodeValue, r, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n), n[Ct] = t, t.stateNode = n;
      }
      return He(t), null;
    case 13:
      if (ne(ie), n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (oe && Ze !== null && t.mode & 1 && !(t.flags & 128)) $c(), dn(), t.flags |= 98560, i = !1;
        else if (i = Lo(t), n !== null && n.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(C(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(C(317));
            i[Ct] = t;
          } else dn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          He(t), i = !1;
        } else xt !== null && (Wl(xt), xt = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = r, t) : (n = n !== null, n !== (e !== null && e.memoizedState !== null) && n && (t.child.flags |= 8192, t.mode & 1 && (e === null || ie.current & 1 ? ze === 0 && (ze = 3) : ks())), t.updateQueue !== null && (t.flags |= 4), He(t), null);
    case 4:
      return mn(), wl(e, t), e === null && no(t.stateNode.containerInfo), He(t), null;
    case 10:
      return ls(t.type._context), He(t), null;
    case 17:
      return Ue(t.type) && di(), He(t), null;
    case 19:
      if (ne(ie), i = t.memoizedState, i === null) return He(t), null;
      if (n = (t.flags & 128) !== 0, a = i.rendering, a === null) if (n) Tn(i, !1);
      else {
        if (ze !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = bi(e), a !== null) {
            for (t.flags |= 128, Tn(i, !1), n = a.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), t.subtreeFlags = 0, n = r, r = t.child; r !== null; ) i = r, e = n, i.flags &= 14680066, a = i.alternate, a === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = a.childLanes, i.lanes = a.lanes, i.child = a.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = a.memoizedProps, i.memoizedState = a.memoizedState, i.updateQueue = a.updateQueue, i.type = a.type, e = a.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
            return J(ie, ie.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && ge() > vn && (t.flags |= 128, n = !0, Tn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!n) if (e = bi(a), e !== null) {
          if (t.flags |= 128, n = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Tn(i, !0), i.tail === null && i.tailMode === "hidden" && !a.alternate && !oe) return He(t), null;
        } else 2 * ge() - i.renderingStartTime > vn && r !== 1073741824 && (t.flags |= 128, n = !0, Tn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (a.sibling = t.child, t.child = a) : (r = i.last, r !== null ? r.sibling = a : t.child = a, i.last = a);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ge(), t.sibling = null, r = ie.current, J(ie, n ? r & 1 | 2 : r & 1), t) : (He(t), null);
    case 22:
    case 23:
      return $s(), n = t.memoizedState !== null, e !== null && e.memoizedState !== null !== n && (t.flags |= 8192), n && t.mode & 1 ? Ke & 1073741824 && (He(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : He(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function r1(e, t) {
  switch (ns(t), t.tag) {
    case 1:
      return Ue(t.type) && di(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), ne(Be), ne(Ne), ps(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return fs(t), null;
    case 13:
      if (ne(ie), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(C(340));
        dn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return ne(ie), null;
    case 4:
      return mn(), null;
    case 10:
      return ls(t.type._context), null;
    case 22:
    case 23:
      return $s(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Fo = !1, Te = !1, n1 = typeof WeakSet == "function" ? WeakSet : Set, R = null;
function tn(e, t) {
  var r = e.ref;
  if (r !== null) if (typeof r == "function") try {
    r(null);
  } catch (n) {
    fe(e, t, n);
  }
  else r.current = null;
}
function $l(e, t, r) {
  try {
    r();
  } catch (n) {
    fe(e, t, n);
  }
}
var Au = !1;
function o1(e, t) {
  if (al = ui, e = cc(), ts(e)) {
    if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      r = (r = e.ownerDocument) && r.defaultView || window;
      var n = r.getSelection && r.getSelection();
      if (n && n.rangeCount !== 0) {
        r = n.anchorNode;
        var o = n.anchorOffset, i = n.focusNode;
        n = n.focusOffset;
        try {
          r.nodeType, i.nodeType;
        } catch {
          r = null;
          break e;
        }
        var a = 0, l = -1, s = -1, u = 0, g = 0, f = e, d = null;
        t: for (; ; ) {
          for (var v; f !== r || o !== 0 && f.nodeType !== 3 || (l = a + o), f !== i || n !== 0 && f.nodeType !== 3 || (s = a + n), f.nodeType === 3 && (a += f.nodeValue.length), (v = f.firstChild) !== null; )
            d = f, f = v;
          for (; ; ) {
            if (f === e) break t;
            if (d === r && ++u === o && (l = a), d === i && ++g === n && (s = a), (v = f.nextSibling) !== null) break;
            f = d, d = f.parentNode;
          }
          f = v;
        }
        r = l === -1 || s === -1 ? null : { start: l, end: s };
      } else r = null;
    }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (ll = { focusedElem: e, selectionRange: r }, ui = !1, R = t; R !== null; ) if (t = R, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, R = e;
  else for (; R !== null; ) {
    t = R;
    try {
      var y = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (y !== null) {
            var x = y.memoizedProps, w = y.memoizedState, p = t.stateNode, c = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : vt(t.type, x), w);
            p.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(C(163));
      }
    } catch (h) {
      fe(t, t.return, h);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, R = e;
      break;
    }
    R = t.return;
  }
  return y = Au, Au = !1, y;
}
function Un(e, t, r) {
  var n = t.updateQueue;
  if (n = n !== null ? n.lastEffect : null, n !== null) {
    var o = n = n.next;
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        o.destroy = void 0, i !== void 0 && $l(t, r, i);
      }
      o = o.next;
    } while (o !== n);
  }
}
function Oi(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var r = t = t.next;
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function kl(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function lf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, lf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ct], delete t[io], delete t[cl], delete t[Od], delete t[Id])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function sf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ju(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || sf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Sl(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = pi));
  else if (n !== 4 && (e = e.child, e !== null)) for (Sl(e, t, r), e = e.sibling; e !== null; ) Sl(e, t, r), e = e.sibling;
}
function Ml(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (n !== 4 && (e = e.child, e !== null)) for (Ml(e, t, r), e = e.sibling; e !== null; ) Ml(e, t, r), e = e.sibling;
}
var Me = null, yt = !1;
function qt(e, t, r) {
  for (r = r.child; r !== null; ) uf(e, t, r), r = r.sibling;
}
function uf(e, t, r) {
  if (_t && typeof _t.onCommitFiberUnmount == "function") try {
    _t.onCommitFiberUnmount(Hi, r);
  } catch {
  }
  switch (r.tag) {
    case 5:
      Te || tn(r, t);
    case 6:
      var n = Me, o = yt;
      Me = null, qt(e, t, r), Me = n, yt = o, Me !== null && (yt ? (e = Me, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Me.removeChild(r.stateNode));
      break;
    case 18:
      Me !== null && (yt ? (e = Me, r = r.stateNode, e.nodeType === 8 ? ya(e.parentNode, r) : e.nodeType === 1 && ya(e, r), eo(e)) : ya(Me, r.stateNode));
      break;
    case 4:
      n = Me, o = yt, Me = r.stateNode.containerInfo, yt = !0, qt(e, t, r), Me = n, yt = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Te && (n = r.updateQueue, n !== null && (n = n.lastEffect, n !== null))) {
        o = n = n.next;
        do {
          var i = o, a = i.destroy;
          i = i.tag, a !== void 0 && (i & 2 || i & 4) && $l(r, t, a), o = o.next;
        } while (o !== n);
      }
      qt(e, t, r);
      break;
    case 1:
      if (!Te && (tn(r, t), n = r.stateNode, typeof n.componentWillUnmount == "function")) try {
        n.props = r.memoizedProps, n.state = r.memoizedState, n.componentWillUnmount();
      } catch (l) {
        fe(r, t, l);
      }
      qt(e, t, r);
      break;
    case 21:
      qt(e, t, r);
      break;
    case 22:
      r.mode & 1 ? (Te = (n = Te) || r.memoizedState !== null, qt(e, t, r), Te = n) : qt(e, t, r);
      break;
    default:
      qt(e, t, r);
  }
}
function Bu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new n1()), t.forEach(function(n) {
      var o = d1.bind(null, e, n);
      r.has(n) || (r.add(n), n.then(o, o));
    });
  }
}
function ht(e, t) {
  var r = t.deletions;
  if (r !== null) for (var n = 0; n < r.length; n++) {
    var o = r[n];
    try {
      var i = e, a = t, l = a;
      e: for (; l !== null; ) {
        switch (l.tag) {
          case 5:
            Me = l.stateNode, yt = !1;
            break e;
          case 3:
            Me = l.stateNode.containerInfo, yt = !0;
            break e;
          case 4:
            Me = l.stateNode.containerInfo, yt = !0;
            break e;
        }
        l = l.return;
      }
      if (Me === null) throw Error(C(160));
      uf(i, a, o), Me = null, yt = !1;
      var s = o.alternate;
      s !== null && (s.return = null), o.return = null;
    } catch (u) {
      fe(o, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) cf(t, e), t = t.sibling;
}
function cf(e, t) {
  var r = e.alternate, n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ht(t, e), Mt(e), n & 4) {
        try {
          Un(3, e, e.return), Oi(3, e);
        } catch (x) {
          fe(e, e.return, x);
        }
        try {
          Un(5, e, e.return);
        } catch (x) {
          fe(e, e.return, x);
        }
      }
      break;
    case 1:
      ht(t, e), Mt(e), n & 512 && r !== null && tn(r, r.return);
      break;
    case 5:
      if (ht(t, e), Mt(e), n & 512 && r !== null && tn(r, r.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          Gn(o, "");
        } catch (x) {
          fe(e, e.return, x);
        }
      }
      if (n & 4 && (o = e.stateNode, o != null)) {
        var i = e.memoizedProps, a = r !== null ? r.memoizedProps : i, l = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          l === "input" && i.type === "radio" && i.name != null && P0(o, i), Ga(l, a);
          var u = Ga(l, i);
          for (a = 0; a < s.length; a += 2) {
            var g = s[a], f = s[a + 1];
            g === "style" ? R0(o, f) : g === "dangerouslySetInnerHTML" ? N0(o, f) : g === "children" ? Gn(o, f) : Dl(o, g, f, u);
          }
          switch (l) {
            case "input":
              Ba(o, i);
              break;
            case "textarea":
              H0(o, i);
              break;
            case "select":
              var d = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!i.multiple;
              var v = i.value;
              v != null ? nn(o, !!i.multiple, v, !1) : d !== !!i.multiple && (i.defaultValue != null ? nn(
                o,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : nn(o, !!i.multiple, i.multiple ? [] : "", !1));
          }
          o[io] = i;
        } catch (x) {
          fe(e, e.return, x);
        }
      }
      break;
    case 6:
      if (ht(t, e), Mt(e), n & 4) {
        if (e.stateNode === null) throw Error(C(162));
        o = e.stateNode, i = e.memoizedProps;
        try {
          o.nodeValue = i;
        } catch (x) {
          fe(e, e.return, x);
        }
      }
      break;
    case 3:
      if (ht(t, e), Mt(e), n & 4 && r !== null && r.memoizedState.isDehydrated) try {
        eo(t.containerInfo);
      } catch (x) {
        fe(e, e.return, x);
      }
      break;
    case 4:
      ht(t, e), Mt(e);
      break;
    case 13:
      ht(t, e), Mt(e), o = e.child, o.flags & 8192 && (i = o.memoizedState !== null, o.stateNode.isHidden = i, !i || o.alternate !== null && o.alternate.memoizedState !== null || (zs = ge())), n & 4 && Bu(e);
      break;
    case 22:
      if (g = r !== null && r.memoizedState !== null, e.mode & 1 ? (Te = (u = Te) || g, ht(t, e), Te = u) : ht(t, e), Mt(e), n & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !g && e.mode & 1) for (R = e, g = e.child; g !== null; ) {
          for (f = R = g; R !== null; ) {
            switch (d = R, v = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Un(4, d, d.return);
                break;
              case 1:
                tn(d, d.return);
                var y = d.stateNode;
                if (typeof y.componentWillUnmount == "function") {
                  n = d, r = d.return;
                  try {
                    t = n, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                  } catch (x) {
                    fe(n, r, x);
                  }
                }
                break;
              case 5:
                tn(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  Vu(f);
                  continue;
                }
            }
            v !== null ? (v.return = d, R = v) : Vu(f);
          }
          g = g.sibling;
        }
        e: for (g = null, f = e; ; ) {
          if (f.tag === 5) {
            if (g === null) {
              g = f;
              try {
                o = f.stateNode, u ? (i = o.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (l = f.stateNode, s = f.memoizedProps.style, a = s != null && s.hasOwnProperty("display") ? s.display : null, l.style.display = L0("display", a));
              } catch (x) {
                fe(e, e.return, x);
              }
            }
          } else if (f.tag === 6) {
            if (g === null) try {
              f.stateNode.nodeValue = u ? "" : f.memoizedProps;
            } catch (x) {
              fe(e, e.return, x);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            g === f && (g = null), f = f.return;
          }
          g === f && (g = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      ht(t, e), Mt(e), n & 4 && Bu(e);
      break;
    case 21:
      break;
    default:
      ht(
        t,
        e
      ), Mt(e);
  }
}
function Mt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (sf(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(C(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          n.flags & 32 && (Gn(o, ""), n.flags &= -33);
          var i = ju(e);
          Ml(e, i, o);
          break;
        case 3:
        case 4:
          var a = n.stateNode.containerInfo, l = ju(e);
          Sl(e, l, a);
          break;
        default:
          throw Error(C(161));
      }
    } catch (s) {
      fe(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function i1(e, t, r) {
  R = e, ff(e);
}
function ff(e, t, r) {
  for (var n = (e.mode & 1) !== 0; R !== null; ) {
    var o = R, i = o.child;
    if (o.tag === 22 && n) {
      var a = o.memoizedState !== null || Fo;
      if (!a) {
        var l = o.alternate, s = l !== null && l.memoizedState !== null || Te;
        l = Fo;
        var u = Te;
        if (Fo = a, (Te = s) && !u) for (R = o; R !== null; ) a = R, s = a.child, a.tag === 22 && a.memoizedState !== null ? Qu(o) : s !== null ? (s.return = a, R = s) : Qu(o);
        for (; i !== null; ) R = i, ff(i), i = i.sibling;
        R = o, Fo = l, Te = u;
      }
      Uu(e);
    } else o.subtreeFlags & 8772 && i !== null ? (i.return = o, R = i) : Uu(e);
  }
}
function Uu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Te || Oi(5, t);
            break;
          case 1:
            var n = t.stateNode;
            if (t.flags & 4 && !Te) if (r === null) n.componentDidMount();
            else {
              var o = t.elementType === t.type ? r.memoizedProps : vt(t.type, r.memoizedProps);
              n.componentDidUpdate(o, r.memoizedState, n.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Wu(t, i, n);
            break;
          case 3:
            var a = t.updateQueue;
            if (a !== null) {
              if (r = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  r = t.child.stateNode;
                  break;
                case 1:
                  r = t.child.stateNode;
              }
              Wu(t, a, r);
            }
            break;
          case 5:
            var l = t.stateNode;
            if (r === null && t.flags & 4) {
              r = l;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && r.focus();
                  break;
                case "img":
                  s.src && (r.src = s.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var g = u.memoizedState;
                if (g !== null) {
                  var f = g.dehydrated;
                  f !== null && eo(f);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(C(163));
        }
        Te || t.flags & 512 && kl(t);
      } catch (d) {
        fe(t, t.return, d);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (r = t.sibling, r !== null) {
      r.return = t.return, R = r;
      break;
    }
    R = t.return;
  }
}
function Vu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      r.return = t.return, R = r;
      break;
    }
    R = t.return;
  }
}
function Qu(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            Oi(4, t);
          } catch (s) {
            fe(t, r, s);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == "function") {
            var o = t.return;
            try {
              n.componentDidMount();
            } catch (s) {
              fe(t, o, s);
            }
          }
          var i = t.return;
          try {
            kl(t);
          } catch (s) {
            fe(t, i, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            kl(t);
          } catch (s) {
            fe(t, a, s);
          }
      }
    } catch (s) {
      fe(t, t.return, s);
    }
    if (t === e) {
      R = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      l.return = t.return, R = l;
      break;
    }
    R = t.return;
  }
}
var a1 = Math.ceil, $i = Dt.ReactCurrentDispatcher, xs = Dt.ReactCurrentOwner, ut = Dt.ReactCurrentBatchConfig, V = 0, Se = null, he = null, Ee = 0, Ke = 0, rn = hr(0), ze = 0, fo = null, Lr = 0, Ii = 0, bs = 0, Vn = null, Ae = null, zs = 0, vn = 1 / 0, Tt = null, ki = !1, El = null, sr = null, Yo = !1, rr = null, Si = 0, Qn = 0, Cl = null, ei = -1, ti = 0;
function Fe() {
  return V & 6 ? ge() : ei !== -1 ? ei : ei = ge();
}
function ur(e) {
  return e.mode & 1 ? V & 2 && Ee !== 0 ? Ee & -Ee : Ad.transition !== null ? (ti === 0 && (ti = Q0()), ti) : (e = q, e !== 0 || (e = window.event, e = e === void 0 ? 16 : tc(e.type)), e) : 1;
}
function zt(e, t, r, n) {
  if (50 < Qn) throw Qn = 0, Cl = null, Error(C(185));
  mo(e, r, n), (!(V & 2) || e !== Se) && (e === Se && (!(V & 2) && (Ii |= r), ze === 4 && er(e, Ee)), Ve(e, n), r === 1 && V === 0 && !(t.mode & 1) && (vn = ge() + 500, Xi && vr()));
}
function Ve(e, t) {
  var r = e.callbackNode;
  Ap(e, t);
  var n = si(e, e === Se ? Ee : 0);
  if (n === 0) r !== null && nu(r), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = n & -n, e.callbackPriority !== t) {
    if (r != null && nu(r), t === 1) e.tag === 0 ? Dd(qu.bind(null, e)) : bc(qu.bind(null, e)), Fd(function() {
      !(V & 6) && vr();
    }), r = null;
    else {
      switch (q0(n)) {
        case 1:
          r = Vl;
          break;
        case 4:
          r = U0;
          break;
        case 16:
          r = li;
          break;
        case 536870912:
          r = V0;
          break;
        default:
          r = li;
      }
      r = xf(r, pf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = r;
  }
}
function pf(e, t) {
  if (ei = -1, ti = 0, V & 6) throw Error(C(327));
  var r = e.callbackNode;
  if (un() && e.callbackNode !== r) return null;
  var n = si(e, e === Se ? Ee : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = Mi(e, n);
  else {
    t = n;
    var o = V;
    V |= 2;
    var i = gf();
    (Se !== e || Ee !== t) && (Tt = null, vn = ge() + 500, _r(e, t));
    do
      try {
        u1();
        break;
      } catch (l) {
        df(e, l);
      }
    while (!0);
    as(), $i.current = i, V = o, he !== null ? t = 0 : (Se = null, Ee = 0, t = ze);
  }
  if (t !== 0) {
    if (t === 2 && (o = tl(e), o !== 0 && (n = o, t = _l(e, o))), t === 1) throw r = fo, _r(e, 0), er(e, n), Ve(e, ge()), r;
    if (t === 6) er(e, n);
    else {
      if (o = e.current.alternate, !(n & 30) && !l1(o) && (t = Mi(e, n), t === 2 && (i = tl(e), i !== 0 && (n = i, t = _l(e, i))), t === 1)) throw r = fo, _r(e, 0), er(e, n), Ve(e, ge()), r;
      switch (e.finishedWork = o, e.finishedLanes = n, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          kr(e, Ae, Tt);
          break;
        case 3:
          if (er(e, n), (n & 130023424) === n && (t = zs + 500 - ge(), 10 < t)) {
            if (si(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & n) !== n) {
              Fe(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = ul(kr.bind(null, e, Ae, Tt), t);
            break;
          }
          kr(e, Ae, Tt);
          break;
        case 4:
          if (er(e, n), (n & 4194240) === n) break;
          for (t = e.eventTimes, o = -1; 0 < n; ) {
            var a = 31 - bt(n);
            i = 1 << a, a = t[a], a > o && (o = a), n &= ~i;
          }
          if (n = o, n = ge() - n, n = (120 > n ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * a1(n / 1960)) - n, 10 < n) {
            e.timeoutHandle = ul(kr.bind(null, e, Ae, Tt), n);
            break;
          }
          kr(e, Ae, Tt);
          break;
        case 5:
          kr(e, Ae, Tt);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Ve(e, ge()), e.callbackNode === r ? pf.bind(null, e) : null;
}
function _l(e, t) {
  var r = Vn;
  return e.current.memoizedState.isDehydrated && (_r(e, t).flags |= 256), e = Mi(e, t), e !== 2 && (t = Ae, Ae = r, t !== null && Wl(t)), e;
}
function Wl(e) {
  Ae === null ? Ae = e : Ae.push.apply(Ae, e);
}
function l1(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && (r = r.stores, r !== null)) for (var n = 0; n < r.length; n++) {
        var o = r[n], i = o.getSnapshot;
        o = o.value;
        try {
          if (!wt(i(), o)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function er(e, t) {
  for (t &= ~bs, t &= ~Ii, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var r = 31 - bt(t), n = 1 << r;
    e[r] = -1, t &= ~n;
  }
}
function qu(e) {
  if (V & 6) throw Error(C(327));
  un();
  var t = si(e, 0);
  if (!(t & 1)) return Ve(e, ge()), null;
  var r = Mi(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = tl(e);
    n !== 0 && (t = n, r = _l(e, n));
  }
  if (r === 1) throw r = fo, _r(e, 0), er(e, t), Ve(e, ge()), r;
  if (r === 6) throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, kr(e, Ae, Tt), Ve(e, ge()), null;
}
function ws(e, t) {
  var r = V;
  V |= 1;
  try {
    return e(t);
  } finally {
    V = r, V === 0 && (vn = ge() + 500, Xi && vr());
  }
}
function Rr(e) {
  rr !== null && rr.tag === 0 && !(V & 6) && un();
  var t = V;
  V |= 1;
  var r = ut.transition, n = q;
  try {
    if (ut.transition = null, q = 1, e) return e();
  } finally {
    q = n, ut.transition = r, V = t, !(V & 6) && vr();
  }
}
function $s() {
  Ke = rn.current, ne(rn);
}
function _r(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var r = e.timeoutHandle;
  if (r !== -1 && (e.timeoutHandle = -1, Xd(r)), he !== null) for (r = he.return; r !== null; ) {
    var n = r;
    switch (ns(n), n.tag) {
      case 1:
        n = n.type.childContextTypes, n != null && di();
        break;
      case 3:
        mn(), ne(Be), ne(Ne), ps();
        break;
      case 5:
        fs(n);
        break;
      case 4:
        mn();
        break;
      case 13:
        ne(ie);
        break;
      case 19:
        ne(ie);
        break;
      case 10:
        ls(n.type._context);
        break;
      case 22:
      case 23:
        $s();
    }
    r = r.return;
  }
  if (Se = e, he = e = cr(e.current, null), Ee = Ke = t, ze = 0, fo = null, bs = Ii = Lr = 0, Ae = Vn = null, Er !== null) {
    for (t = 0; t < Er.length; t++) if (r = Er[t], n = r.interleaved, n !== null) {
      r.interleaved = null;
      var o = n.next, i = r.pending;
      if (i !== null) {
        var a = i.next;
        i.next = o, n.next = a;
      }
      r.pending = n;
    }
    Er = null;
  }
  return e;
}
function df(e, t) {
  do {
    var r = he;
    try {
      if (as(), Ko.current = wi, zi) {
        for (var n = le.memoizedState; n !== null; ) {
          var o = n.queue;
          o !== null && (o.pending = null), n = n.next;
        }
        zi = !1;
      }
      if (Nr = 0, ke = be = le = null, Bn = !1, so = 0, xs.current = null, r === null || r.return === null) {
        ze = 1, fo = t, he = null;
        break;
      }
      e: {
        var i = e, a = r.return, l = r, s = t;
        if (t = Ee, l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var u = s, g = l, f = g.tag;
          if (!(g.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = g.alternate;
            d ? (g.updateQueue = d.updateQueue, g.memoizedState = d.memoizedState, g.lanes = d.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var v = Ru(a);
          if (v !== null) {
            v.flags &= -257, Xu(v, a, l, i, t), v.mode & 1 && Lu(i, u, t), t = v, s = u;
            var y = t.updateQueue;
            if (y === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(s), t.updateQueue = x;
            } else y.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Lu(i, u, t), ks();
              break e;
            }
            s = Error(C(426));
          }
        } else if (oe && l.mode & 1) {
          var w = Ru(a);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256), Xu(w, a, l, i, t), os(hn(s, l));
            break e;
          }
        }
        i = s = hn(s, l), ze !== 4 && (ze = 2), Vn === null ? Vn = [i] : Vn.push(i), i = a;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = qc(i, s, t);
              _u(i, p);
              break e;
            case 1:
              l = s;
              var c = i.type, m = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (sr === null || !sr.has(m)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var h = Gc(i, l, t);
                _u(i, h);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      hf(r);
    } catch (b) {
      t = b, he === r && r !== null && (he = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function gf() {
  var e = $i.current;
  return $i.current = wi, e === null ? wi : e;
}
function ks() {
  (ze === 0 || ze === 3 || ze === 2) && (ze = 4), Se === null || !(Lr & 268435455) && !(Ii & 268435455) || er(Se, Ee);
}
function Mi(e, t) {
  var r = V;
  V |= 2;
  var n = gf();
  (Se !== e || Ee !== t) && (Tt = null, _r(e, t));
  do
    try {
      s1();
      break;
    } catch (o) {
      df(e, o);
    }
  while (!0);
  if (as(), V = r, $i.current = n, he !== null) throw Error(C(261));
  return Se = null, Ee = 0, ze;
}
function s1() {
  for (; he !== null; ) mf(he);
}
function u1() {
  for (; he !== null && !Np(); ) mf(he);
}
function mf(e) {
  var t = yf(e.alternate, e, Ke);
  e.memoizedProps = e.pendingProps, t === null ? hf(e) : he = t, xs.current = null;
}
function hf(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (r = r1(r, t), r !== null) {
        r.flags &= 32767, he = r;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ze = 6, he = null;
        return;
      }
    } else if (r = t1(r, t, Ke), r !== null) {
      he = r;
      return;
    }
    if (t = t.sibling, t !== null) {
      he = t;
      return;
    }
    he = t = e;
  } while (t !== null);
  ze === 0 && (ze = 5);
}
function kr(e, t, r) {
  var n = q, o = ut.transition;
  try {
    ut.transition = null, q = 1, c1(e, t, r, n);
  } finally {
    ut.transition = o, q = n;
  }
  return null;
}
function c1(e, t, r, n) {
  do
    un();
  while (rr !== null);
  if (V & 6) throw Error(C(327));
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = r.lanes | r.childLanes;
  if (jp(e, i), e === Se && (he = Se = null, Ee = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || Yo || (Yo = !0, xf(li, function() {
    return un(), null;
  })), i = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || i) {
    i = ut.transition, ut.transition = null;
    var a = q;
    q = 1;
    var l = V;
    V |= 4, xs.current = null, o1(e, r), cf(r, e), Wd(ll), ui = !!al, ll = al = null, e.current = r, i1(r), Lp(), V = l, q = a, ut.transition = i;
  } else e.current = r;
  if (Yo && (Yo = !1, rr = e, Si = o), i = e.pendingLanes, i === 0 && (sr = null), Fp(r.stateNode), Ve(e, ge()), t !== null) for (n = e.onRecoverableError, r = 0; r < t.length; r++) o = t[r], n(o.value, { componentStack: o.stack, digest: o.digest });
  if (ki) throw ki = !1, e = El, El = null, e;
  return Si & 1 && e.tag !== 0 && un(), i = e.pendingLanes, i & 1 ? e === Cl ? Qn++ : (Qn = 0, Cl = e) : Qn = 0, vr(), null;
}
function un() {
  if (rr !== null) {
    var e = q0(Si), t = ut.transition, r = q;
    try {
      if (ut.transition = null, q = 16 > e ? 16 : e, rr === null) var n = !1;
      else {
        if (e = rr, rr = null, Si = 0, V & 6) throw Error(C(331));
        var o = V;
        for (V |= 4, R = e.current; R !== null; ) {
          var i = R, a = i.child;
          if (R.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var s = 0; s < l.length; s++) {
                var u = l[s];
                for (R = u; R !== null; ) {
                  var g = R;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Un(8, g, i);
                  }
                  var f = g.child;
                  if (f !== null) f.return = g, R = f;
                  else for (; R !== null; ) {
                    g = R;
                    var d = g.sibling, v = g.return;
                    if (lf(g), g === u) {
                      R = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = v, R = d;
                      break;
                    }
                    R = v;
                  }
                }
              }
              var y = i.alternate;
              if (y !== null) {
                var x = y.child;
                if (x !== null) {
                  y.child = null;
                  do {
                    var w = x.sibling;
                    x.sibling = null, x = w;
                  } while (x !== null);
                }
              }
              R = i;
            }
          }
          if (i.subtreeFlags & 2064 && a !== null) a.return = i, R = a;
          else e: for (; R !== null; ) {
            if (i = R, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Un(9, i, i.return);
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, R = p;
              break e;
            }
            R = i.return;
          }
        }
        var c = e.current;
        for (R = c; R !== null; ) {
          a = R;
          var m = a.child;
          if (a.subtreeFlags & 2064 && m !== null) m.return = a, R = m;
          else e: for (a = c; R !== null; ) {
            if (l = R, l.flags & 2048) try {
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  Oi(9, l);
              }
            } catch (b) {
              fe(l, l.return, b);
            }
            if (l === a) {
              R = null;
              break e;
            }
            var h = l.sibling;
            if (h !== null) {
              h.return = l.return, R = h;
              break e;
            }
            R = l.return;
          }
        }
        if (V = o, vr(), _t && typeof _t.onPostCommitFiberRoot == "function") try {
          _t.onPostCommitFiberRoot(Hi, e);
        } catch {
        }
        n = !0;
      }
      return n;
    } finally {
      q = r, ut.transition = t;
    }
  }
  return !1;
}
function Gu(e, t, r) {
  t = hn(r, t), t = qc(e, t, 1), e = lr(e, t, 1), t = Fe(), e !== null && (mo(e, 1, t), Ve(e, t));
}
function fe(e, t, r) {
  if (e.tag === 3) Gu(e, e, r);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Gu(t, e, r);
      break;
    } else if (t.tag === 1) {
      var n = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (sr === null || !sr.has(n))) {
        e = hn(r, e), e = Gc(t, e, 1), t = lr(t, e, 1), e = Fe(), t !== null && (mo(t, 1, e), Ve(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function f1(e, t, r) {
  var n = e.pingCache;
  n !== null && n.delete(t), t = Fe(), e.pingedLanes |= e.suspendedLanes & r, Se === e && (Ee & r) === r && (ze === 4 || ze === 3 && (Ee & 130023424) === Ee && 500 > ge() - zs ? _r(e, 0) : bs |= r), Ve(e, t);
}
function vf(e, t) {
  t === 0 && (e.mode & 1 ? (t = _o, _o <<= 1, !(_o & 130023424) && (_o = 4194304)) : t = 1);
  var r = Fe();
  e = Ot(e, t), e !== null && (mo(e, t, r), Ve(e, r));
}
function p1(e) {
  var t = e.memoizedState, r = 0;
  t !== null && (r = t.retryLane), vf(e, r);
}
function d1(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode, o = e.memoizedState;
      o !== null && (r = o.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(C(314));
  }
  n !== null && n.delete(t), vf(e, r);
}
var yf;
yf = function(e, t, r) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Be.current) je = !0;
  else {
    if (!(e.lanes & r) && !(t.flags & 128)) return je = !1, e1(e, t, r);
    je = !!(e.flags & 131072);
  }
  else je = !1, oe && t.flags & 1048576 && zc(t, hi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var n = t.type;
      Jo(e, t), e = t.pendingProps;
      var o = pn(t, Ne.current);
      sn(t, r), o = gs(null, t, n, e, o, r);
      var i = ms();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ue(n) ? (i = !0, gi(t)) : i = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, us(t), o.updater = Yi, t.stateNode = o, o._reactInternals = t, hl(t, n, e, r), t = xl(null, t, n, !0, i, r)) : (t.tag = 0, oe && i && rs(t), Xe(null, t, o, r), t = t.child), t;
    case 16:
      n = t.elementType;
      e: {
        switch (Jo(e, t), e = t.pendingProps, o = n._init, n = o(n._payload), t.type = n, o = t.tag = m1(n), e = vt(n, e), o) {
          case 0:
            t = yl(null, t, n, e, r);
            break e;
          case 1:
            t = Ou(null, t, n, e, r);
            break e;
          case 11:
            t = Fu(null, t, n, e, r);
            break e;
          case 14:
            t = Yu(null, t, n, vt(n.type, e), r);
            break e;
        }
        throw Error(C(
          306,
          n,
          ""
        ));
      }
      return t;
    case 0:
      return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : vt(n, o), yl(e, t, n, o, r);
    case 1:
      return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : vt(n, o), Ou(e, t, n, o, r);
    case 3:
      e: {
        if (ef(t), e === null) throw Error(C(387));
        n = t.pendingProps, i = t.memoizedState, o = i.element, Ec(e, t), xi(t, n, null, r);
        var a = t.memoizedState;
        if (n = a.element, i.isDehydrated) if (i = { element: n, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          o = hn(Error(C(423)), t), t = Iu(e, t, n, r, o);
          break e;
        } else if (n !== o) {
          o = hn(Error(C(424)), t), t = Iu(e, t, n, r, o);
          break e;
        } else for (Ze = ar(t.stateNode.containerInfo.firstChild), Je = t, oe = !0, xt = null, r = Sc(t, null, n, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
        else {
          if (dn(), n === o) {
            t = It(e, t, r);
            break e;
          }
          Xe(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Cc(t), e === null && dl(t), n = t.type, o = t.pendingProps, i = e !== null ? e.memoizedProps : null, a = o.children, sl(n, o) ? a = null : i !== null && sl(n, i) && (t.flags |= 32), Jc(e, t), Xe(e, t, a, r), t.child;
    case 6:
      return e === null && dl(t), null;
    case 13:
      return tf(e, t, r);
    case 4:
      return cs(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = gn(t, null, n, r) : Xe(e, t, n, r), t.child;
    case 11:
      return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : vt(n, o), Fu(e, t, n, o, r);
    case 7:
      return Xe(e, t, t.pendingProps, r), t.child;
    case 8:
      return Xe(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return Xe(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (n = t.type._context, o = t.pendingProps, i = t.memoizedProps, a = o.value, J(vi, n._currentValue), n._currentValue = a, i !== null) if (wt(i.value, a)) {
          if (i.children === o.children && !Be.current) {
            t = It(e, t, r);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var l = i.dependencies;
          if (l !== null) {
            a = i.child;
            for (var s = l.firstContext; s !== null; ) {
              if (s.context === n) {
                if (i.tag === 1) {
                  s = Xt(-1, r & -r), s.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var g = u.pending;
                    g === null ? s.next = s : (s.next = g.next, g.next = s), u.pending = s;
                  }
                }
                i.lanes |= r, s = i.alternate, s !== null && (s.lanes |= r), gl(
                  i.return,
                  r,
                  t
                ), l.lanes |= r;
                break;
              }
              s = s.next;
            }
          } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (a = i.return, a === null) throw Error(C(341));
            a.lanes |= r, l = a.alternate, l !== null && (l.lanes |= r), gl(a, r, t), a = i.sibling;
          } else a = i.child;
          if (a !== null) a.return = i;
          else for (a = i; a !== null; ) {
            if (a === t) {
              a = null;
              break;
            }
            if (i = a.sibling, i !== null) {
              i.return = a.return, a = i;
              break;
            }
            a = a.return;
          }
          i = a;
        }
        Xe(e, t, o.children, r), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, n = t.pendingProps.children, sn(t, r), o = ft(o), n = n(o), t.flags |= 1, Xe(e, t, n, r), t.child;
    case 14:
      return n = t.type, o = vt(n, t.pendingProps), o = vt(n.type, o), Yu(e, t, n, o, r);
    case 15:
      return Kc(e, t, t.type, t.pendingProps, r);
    case 17:
      return n = t.type, o = t.pendingProps, o = t.elementType === n ? o : vt(n, o), Jo(e, t), t.tag = 1, Ue(n) ? (e = !0, gi(t)) : e = !1, sn(t, r), Qc(t, n, o), hl(t, n, o, r), xl(null, t, n, !0, e, r);
    case 19:
      return rf(e, t, r);
    case 22:
      return Zc(e, t, r);
  }
  throw Error(C(156, t.tag));
};
function xf(e, t) {
  return B0(e, t);
}
function g1(e, t, r, n) {
  this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function st(e, t, r, n) {
  return new g1(e, t, r, n);
}
function Ss(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function m1(e) {
  if (typeof e == "function") return Ss(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === jl) return 11;
    if (e === Bl) return 14;
  }
  return 2;
}
function cr(e, t) {
  var r = e.alternate;
  return r === null ? (r = st(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
}
function ri(e, t, r, n, o, i) {
  var a = 2;
  if (n = e, typeof e == "function") Ss(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case Ur:
      return Wr(r.children, o, i, t);
    case Al:
      a = 8, o |= 8;
      break;
    case Oa:
      return e = st(12, r, t, o | 2), e.elementType = Oa, e.lanes = i, e;
    case Ia:
      return e = st(13, r, t, o), e.elementType = Ia, e.lanes = i, e;
    case Da:
      return e = st(19, r, t, o), e.elementType = Da, e.lanes = i, e;
    case C0:
      return Di(r, o, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case M0:
          a = 10;
          break e;
        case E0:
          a = 9;
          break e;
        case jl:
          a = 11;
          break e;
        case Bl:
          a = 14;
          break e;
        case Kt:
          a = 16, n = null;
          break e;
      }
      throw Error(C(130, e == null ? e : typeof e, ""));
  }
  return t = st(a, r, t, o), t.elementType = e, t.type = n, t.lanes = i, t;
}
function Wr(e, t, r, n) {
  return e = st(7, e, n, t), e.lanes = r, e;
}
function Di(e, t, r, n) {
  return e = st(22, e, n, t), e.elementType = C0, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
}
function Ma(e, t, r) {
  return e = st(6, e, null, t), e.lanes = r, e;
}
function Ea(e, t, r) {
  return t = st(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function h1(e, t, r, n, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = la(0), this.expirationTimes = la(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = la(0), this.identifierPrefix = n, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function Ms(e, t, r, n, o, i, a, l, s) {
  return e = new h1(e, t, r, l, s), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = st(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: n, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, us(i), e;
}
function v1(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Br, key: n == null ? null : "" + n, children: e, containerInfo: t, implementation: r };
}
function bf(e) {
  if (!e) return gr;
  e = e._reactInternals;
  e: {
    if (Yr(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ue(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Ue(r)) return xc(e, r, t);
  }
  return t;
}
function zf(e, t, r, n, o, i, a, l, s) {
  return e = Ms(r, n, !0, e, o, i, a, l, s), e.context = bf(null), r = e.current, n = Fe(), o = ur(r), i = Xt(n, o), i.callback = t ?? null, lr(r, i, o), e.current.lanes = o, mo(e, o, n), Ve(e, n), e;
}
function Ai(e, t, r, n) {
  var o = t.current, i = Fe(), a = ur(o);
  return r = bf(r), t.context === null ? t.context = r : t.pendingContext = r, t = Xt(i, a), t.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (t.callback = n), e = lr(o, t, a), e !== null && (zt(e, o, a, i), Go(e, o, a)), a;
}
function Ei(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ku(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Es(e, t) {
  Ku(e, t), (e = e.alternate) && Ku(e, t);
}
function y1() {
  return null;
}
var wf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Cs(e) {
  this._internalRoot = e;
}
ji.prototype.render = Cs.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  Ai(e, t, null, null);
};
ji.prototype.unmount = Cs.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Rr(function() {
      Ai(null, e, null, null);
    }), t[Yt] = null;
  }
};
function ji(e) {
  this._internalRoot = e;
}
ji.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Z0();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < Jt.length && t !== 0 && t < Jt[r].priority; r++) ;
    Jt.splice(r, 0, e), r === 0 && ec(e);
  }
};
function _s(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Bi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Zu() {
}
function x1(e, t, r, n, o) {
  if (o) {
    if (typeof n == "function") {
      var i = n;
      n = function() {
        var u = Ei(a);
        i.call(u);
      };
    }
    var a = zf(t, n, e, 0, null, !1, !1, "", Zu);
    return e._reactRootContainer = a, e[Yt] = a.current, no(e.nodeType === 8 ? e.parentNode : e), Rr(), a;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof n == "function") {
    var l = n;
    n = function() {
      var u = Ei(s);
      l.call(u);
    };
  }
  var s = Ms(e, 0, !1, null, null, !1, !1, "", Zu);
  return e._reactRootContainer = s, e[Yt] = s.current, no(e.nodeType === 8 ? e.parentNode : e), Rr(function() {
    Ai(t, s, r, n);
  }), s;
}
function Ui(e, t, r, n, o) {
  var i = r._reactRootContainer;
  if (i) {
    var a = i;
    if (typeof o == "function") {
      var l = o;
      o = function() {
        var s = Ei(a);
        l.call(s);
      };
    }
    Ai(t, a, e, o);
  } else a = x1(r, t, e, o, n);
  return Ei(a);
}
G0 = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Fn(t.pendingLanes);
        r !== 0 && (Ql(t, r | 1), Ve(t, ge()), !(V & 6) && (vn = ge() + 500, vr()));
      }
      break;
    case 13:
      Rr(function() {
        var n = Ot(e, 1);
        if (n !== null) {
          var o = Fe();
          zt(n, e, 1, o);
        }
      }), Es(e, 1);
  }
};
ql = function(e) {
  if (e.tag === 13) {
    var t = Ot(e, 134217728);
    if (t !== null) {
      var r = Fe();
      zt(t, e, 134217728, r);
    }
    Es(e, 134217728);
  }
};
K0 = function(e) {
  if (e.tag === 13) {
    var t = ur(e), r = Ot(e, t);
    if (r !== null) {
      var n = Fe();
      zt(r, e, t, n);
    }
    Es(e, t);
  }
};
Z0 = function() {
  return q;
};
J0 = function(e, t) {
  var r = q;
  try {
    return q = e, t();
  } finally {
    q = r;
  }
};
Za = function(e, t, r) {
  switch (t) {
    case "input":
      if (Ba(e, r), t = r.name, r.type === "radio" && t != null) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var o = Ri(n);
            if (!o) throw Error(C(90));
            W0(n), Ba(n, o);
          }
        }
      }
      break;
    case "textarea":
      H0(e, r);
      break;
    case "select":
      t = r.value, t != null && nn(e, !!r.multiple, t, !1);
  }
};
Y0 = ws;
O0 = Rr;
var b1 = { usingClientEntryPoint: !1, Events: [vo, Gr, Ri, X0, F0, ws] }, Nn = { findFiberByHostInstance: Mr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, z1 = { bundleType: Nn.bundleType, version: Nn.version, rendererPackageName: Nn.rendererPackageName, rendererConfig: Nn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Dt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = A0(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Nn.findFiberByHostInstance || y1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Oo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Oo.isDisabled && Oo.supportsFiber) try {
    Hi = Oo.inject(z1), _t = Oo;
  } catch {
  }
}
tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b1;
tt.createPortal = function(e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!_s(t)) throw Error(C(200));
  return v1(e, t, null, r);
};
tt.createRoot = function(e, t) {
  if (!_s(e)) throw Error(C(299));
  var r = !1, n = "", o = wf;
  return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Ms(e, 1, !1, null, null, r, !1, n, o), e[Yt] = t.current, no(e.nodeType === 8 ? e.parentNode : e), new Cs(t);
};
tt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = A0(t), e = e === null ? null : e.stateNode, e;
};
tt.flushSync = function(e) {
  return Rr(e);
};
tt.hydrate = function(e, t, r) {
  if (!Bi(t)) throw Error(C(200));
  return Ui(null, e, t, !0, r);
};
tt.hydrateRoot = function(e, t, r) {
  if (!_s(e)) throw Error(C(405));
  var n = r != null && r.hydratedSources || null, o = !1, i = "", a = wf;
  if (r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (i = r.identifierPrefix), r.onRecoverableError !== void 0 && (a = r.onRecoverableError)), t = zf(t, null, e, 1, r ?? null, o, !1, i, a), e[Yt] = t.current, no(e), n) for (e = 0; e < n.length; e++) r = n[e], o = r._getVersion, o = o(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, o] : t.mutableSourceEagerHydrationData.push(
    r,
    o
  );
  return new ji(t);
};
tt.render = function(e, t, r) {
  if (!Bi(t)) throw Error(C(200));
  return Ui(null, e, t, !1, r);
};
tt.unmountComponentAtNode = function(e) {
  if (!Bi(e)) throw Error(C(40));
  return e._reactRootContainer ? (Rr(function() {
    Ui(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Yt] = null;
    });
  }), !0) : !1;
};
tt.unstable_batchedUpdates = ws;
tt.unstable_renderSubtreeIntoContainer = function(e, t, r, n) {
  if (!Bi(r)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return Ui(e, t, r, !1, n);
};
tt.version = "18.3.1-next-f1338f8080-20240426";
function $f() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($f);
    } catch (e) {
      console.error(e);
    }
}
$f(), w0.exports = tt;
var w1 = w0.exports, Ws, Ju = w1;
Ws = Ju.createRoot, Ju.hydrateRoot;
var kf = { exports: {} }, Vi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $1 = B, k1 = Symbol.for("react.element"), S1 = Symbol.for("react.fragment"), M1 = Object.prototype.hasOwnProperty, E1 = $1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sf(e, t, r) {
  var n, o = {}, i = null, a = null;
  r !== void 0 && (i = "" + r), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (n in t) M1.call(t, n) && !C1.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) o[n] === void 0 && (o[n] = t[n]);
  return { $$typeof: k1, type: e, key: i, ref: a, props: o, _owner: E1.current };
}
Vi.Fragment = S1;
Vi.jsx = Sf;
Vi.jsxs = Sf;
kf.exports = Vi;
var Sr = kf.exports;
const _1 = {
  sm: {
    borderRadius: 32,
    borderWidth: 1,
    width: 70,
    height: 36
  },
  md: {
    borderRadius: 16,
    borderWidth: 1
  },
  line: {
    borderRadius: 16,
    borderWidth: 1
  },
  "pulse-outside": {
    borderRadius: 16,
    borderWidth: 1
  },
  "pulse-inner": {
    borderRadius: 16,
    borderWidth: 1
  }
}, W1 = {
  sm: {
    dark: {
      strokeOpacity: 0.46,
      innerOpacity: 0.24,
      bloomOpacity: 0.38,
      innerShadow: "rgba(255, 255, 255, 0.3)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.3,
      bloomOpacity: 0.16,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.8
    }
  },
  md: {
    dark: {
      strokeOpacity: 0.26,
      innerOpacity: 0.42,
      bloomOpacity: 0.24,
      innerShadow: "rgba(255, 255, 255, 0.27)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.26,
      bloomOpacity: 0.34,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.5
    }
  },
  line: {
    dark: {
      strokeOpacity: 1.14,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: "rgba(255, 255, 255, 0.1)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.16,
      innerOpacity: 0.32,
      bloomOpacity: 0.3,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.95
    }
  },
  // Pulse Outside — outward-blooming breathe (ported from v5 "Breathe Outside Uncropped" / c6)
  "pulse-outside": {
    dark: {
      strokeOpacity: 0.94,
      innerOpacity: 0.34,
      bloomOpacity: 0.3,
      innerShadow: "transparent",
      saturation: 1.2,
      brightness: 1.9,
      // v5 Card 5 frames the card with a single 1px hairline (its box-shadow at
      // 0.3). Wrapped components here already supply their own ~equivalent 1px
      // border, so the beam must NOT add a second hairline on top or the edge
      // reads brighter than v5. Kept at 0 to match v5's single-hairline look.
      hairlineOpacity: 0
    },
    light: {
      strokeOpacity: 1.96,
      innerOpacity: 1.04,
      bloomOpacity: 0.42,
      innerShadow: "transparent",
      saturation: 0.6,
      brightness: 1.7,
      hairlineOpacity: 0
    }
  },
  // Pulse Inner — contained breathe (ported from v5 "Breathe" / c4)
  "pulse-inner": {
    dark: {
      strokeOpacity: 1.54,
      innerOpacity: 0.44,
      bloomOpacity: 0.66,
      innerShadow: "transparent",
      saturation: 1.2,
      brightness: 0.75
    },
    light: {
      strokeOpacity: 0.32,
      innerOpacity: 0.4,
      bloomOpacity: 0.8,
      innerShadow: "transparent",
      saturation: 0.75,
      brightness: 1.3
    }
  }
}, Or = {
  colorful: {
    border: [
      { color: "rgb(255, 50, 100)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(40, 140, 255)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(50, 200, 80)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(30, 185, 170)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(100, 70, 255)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(40, 140, 255)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(255, 120, 40)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(255, 60, 80)", secondary: "rgba(40, 190, 180, 0.98)" },
    spikeLt: { primary: "rgb(200, 30, 60)", secondary: "rgb(20, 150, 140)" }
  },
  mono: {
    border: [
      { color: "rgb(180, 180, 180)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(140, 140, 140)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(160, 160, 160)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(130, 130, 130)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(170, 170, 170)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(150, 150, 150)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(190, 190, 190)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(200, 200, 200)", secondary: "rgb(170, 170, 170)" },
    spikeLt: { primary: "rgb(80, 80, 80)", secondary: "rgb(120, 120, 120)" }
  },
  ocean: {
    border: [
      { color: "rgb(100, 80, 220)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(60, 120, 255)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(80, 100, 200)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(50, 140, 220)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(120, 80, 255)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(70, 130, 255)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(140, 100, 240)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(90, 110, 230)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(130, 70, 255)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(100, 120, 255)", secondary: "rgba(130, 100, 220, 0.98)" },
    spikeLt: { primary: "rgb(60, 60, 180)", secondary: "rgb(80, 100, 200)" }
  },
  sunset: {
    border: [
      { color: "rgb(255, 80, 50)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(255, 160, 40)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(255, 120, 60)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(255, 200, 50)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(255, 100, 80)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(255, 180, 60)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(255, 60, 60)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(255, 140, 50)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(255, 140, 80)", secondary: "rgba(255, 100, 60, 0.98)" },
    spikeLt: { primary: "rgb(200, 80, 40)", secondary: "rgb(220, 120, 30)" }
  },
  forest: {
    border: [
      { color: "rgb(46, 160, 90)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(30, 190, 120)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(70, 180, 70)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(20, 150, 130)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(90, 200, 80)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(40, 170, 110)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(120, 210, 70)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(35, 145, 100)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(60, 195, 140)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(46, 160, 90)", secondary: "rgba(30, 190, 120,, 0.98)" },
    spikeLt: { primary: "rgb(33, 115, 65)", secondary: "rgb(22, 137, 86)" }
  },
  candy: {
    border: [
      { color: "rgb(240, 70, 170)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(255, 90, 140)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(215, 60, 200)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(255, 110, 180)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(200, 80, 240)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(250, 60, 150)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(230, 120, 220)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(245, 85, 165)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(210, 70, 230)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(240, 70, 170)", secondary: "rgba(255, 90, 140,, 0.98)" },
    spikeLt: { primary: "rgb(173, 50, 122)", secondary: "rgb(184, 65, 101)" }
  },
  ice: {
    border: [
      { color: "rgb(90, 200, 240)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(60, 175, 230)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(130, 220, 250)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(70, 190, 215)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(110, 210, 255)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(50, 165, 220)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(150, 230, 250)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(85, 195, 235)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(65, 180, 245)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(90, 200, 240)", secondary: "rgba(60, 175, 230,, 0.98)" },
    spikeLt: { primary: "rgb(65, 144, 173)", secondary: "rgb(43, 126, 166)" }
  },
  gold: {
    border: [
      { color: "rgb(240, 190, 60)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(255, 210, 90)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(225, 165, 40)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(250, 200, 70)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(255, 225, 120)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(230, 175, 50)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(245, 205, 85)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(215, 155, 35)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(255, 215, 100)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(240, 190, 60)", secondary: "rgba(255, 210, 90,, 0.98)" },
    spikeLt: { primary: "rgb(173, 137, 43)", secondary: "rgb(184, 151, 65)" }
  }
}, Mf = {
  colorful: {
    border: [
      { color: "rgb(50, 200, 80)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(30, 185, 170)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 120, 40)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(100, 70, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(40, 140, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 50, 100)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(50, 200, 80, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(30, 185, 170, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 120, 40, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(100, 70, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(240, 50, 180, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(180, 40, 240, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(40, 140, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 50, 100, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  mono: {
    border: [
      { color: "rgb(160, 160, 160)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(140, 140, 140)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(180, 180, 180)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(150, 150, 150)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(170, 170, 170)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(155, 155, 155)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(160, 160, 160, 0.25)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(140, 140, 140, 0.22)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(180, 180, 180, 0.17)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(150, 150, 150, 0.17)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(170, 170, 170, 0.15)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(155, 155, 155, 0.20)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(145, 145, 145, 0.15)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(165, 165, 165, 0.15)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  ocean: {
    border: [
      { color: "rgb(60, 140, 200)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(50, 120, 180)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(100, 80, 220)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(80, 100, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(120, 70, 240)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(90, 80, 220)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(70, 110, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(110, 90, 230)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(60, 140, 200, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(50, 120, 180, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(100, 80, 220, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(80, 100, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(120, 70, 240, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(90, 80, 220, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(70, 110, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(110, 90, 230, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  sunset: {
    border: [
      { color: "rgb(255, 180, 50)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 150, 40)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 80, 60)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(255, 100, 80)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(255, 60, 80)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(255, 120, 60)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(255, 200, 50)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(255, 180, 50, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(255, 150, 40, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 80, 60, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(255, 100, 80, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(255, 60, 80, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(255, 120, 60, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(255, 200, 50, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 90, 70, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  forest: {
    border: [
      { color: "rgb(46, 160, 90)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(30, 190, 120)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(70, 180, 70)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(20, 150, 130)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(90, 200, 80)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(40, 170, 110)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(120, 210, 70)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(35, 145, 100)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(60, 195, 140,, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(46, 160, 90,, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(30, 190, 120,, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(70, 180, 70,, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(20, 150, 130,, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(90, 200, 80,, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(40, 170, 110,, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(120, 210, 70,, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  candy: {
    border: [
      { color: "rgb(240, 70, 170)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 90, 140)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(215, 60, 200)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(255, 110, 180)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(200, 80, 240)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(250, 60, 150)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(230, 120, 220)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(245, 85, 165)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(210, 70, 230,, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(240, 70, 170,, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 90, 140,, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(215, 60, 200,, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(255, 110, 180,, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(200, 80, 240,, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(250, 60, 150,, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(230, 120, 220,, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  ice: {
    border: [
      { color: "rgb(90, 200, 240)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(60, 175, 230)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(130, 220, 250)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(70, 190, 215)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(110, 210, 255)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(50, 165, 220)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(150, 230, 250)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(85, 195, 235)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(65, 180, 245,, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(90, 200, 240,, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(60, 175, 230,, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(130, 220, 250,, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(70, 190, 215,, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(110, 210, 255,, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(50, 165, 220,, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(150, 230, 250,, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  gold: {
    border: [
      { color: "rgb(240, 190, 60)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 210, 90)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(225, 165, 40)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(250, 200, 70)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(255, 225, 120)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(230, 175, 50)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(245, 205, 85)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(215, 155, 35)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(255, 215, 100,, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(240, 190, 60,, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 210, 90,, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(225, 165, 40,, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(250, 200, 70,, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(255, 225, 120,, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(230, 175, 50,, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(245, 205, 85,, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  }
};
function P1(e) {
  return Mf[e].border.map((t) => `radial-gradient(ellipse ${t.size} at ${t.pos}, ${t.color}, transparent)`).join(`,
    `);
}
function H1(e) {
  return Mf[e].inner.map((t) => `radial-gradient(ellipse ${t.size} at ${t.pos}, ${t.color}, transparent)`).join(`,
    `);
}
function T1(e) {
  return Or[e].border.map((t) => `radial-gradient(ellipse ${t.size} at ${t.pos}, ${t.color}, transparent)`).join(`,
    `);
}
function N1(e) {
  const t = Or[e], r = e === "mono" ? 0.225 : 0.45;
  return t.border.map((n) => {
    const o = n.color.replace("rgb(", "rgba(").replace(")", `, ${r})`);
    return `radial-gradient(ellipse ${n.size.split(" ").map((i) => {
      const a = parseInt(i);
      return `${Math.round(a * 0.9)}px`;
    }).join(" ")} at ${n.pos}, ${o}, transparent)`;
  }).join(`,
    `);
}
function L1(e, t) {
  const r = Or[e];
  return t ? r.spike : r.spikeLt;
}
const R1 = {
  colorful: {
    dark: [
      { color: "rgb(255, 50, 100)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 180, 220)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 160, 30)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(240, 50, 180)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(30, 185, 170)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(255, 50, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 140, 255)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(30, 185, 170)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(255, 120, 40)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(240, 50, 180)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  mono: {
    dark: [
      { color: "rgb(200, 200, 200)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(170, 170, 170)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(155, 155, 155)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(185, 185, 185)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(165, 165, 165)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(180, 180, 180)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(160, 160, 160)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(175, 175, 175)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(190, 190, 190)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(100, 100, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(80, 80, 80)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(90, 90, 90)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(70, 70, 70)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(85, 85, 85)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(95, 95, 95)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(75, 75, 75)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(105, 105, 105)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(65, 65, 65)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  ocean: {
    dark: [
      { color: "rgb(100, 80, 220)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(60, 120, 255)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(80, 100, 200)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(130, 70, 255)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(70, 130, 255)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(120, 80, 255)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(90, 110, 230)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(110, 90, 240)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(140, 100, 255)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(80, 60, 200)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(50, 100, 220)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(70, 90, 190)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(110, 60, 220)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(60, 110, 230)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(100, 70, 240)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(80, 100, 210)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(90, 80, 225)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(120, 90, 245)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  sunset: {
    dark: [
      { color: "rgb(255, 100, 60)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(255, 180, 50)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(255, 140, 70)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(255, 80, 80)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 200, 60)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(255, 120, 50)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(255, 160, 80)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(255, 90, 60)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(255, 70, 70)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(220, 80, 40)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(230, 150, 30)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(210, 110, 50)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(200, 60, 60)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(220, 170, 40)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(210, 100, 30)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(230, 130, 60)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(190, 70, 50)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(180, 50, 50)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  forest: {
    dark: [
      { color: "rgb(46, 160, 90)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(30, 190, 120)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(70, 180, 70)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(20, 150, 130)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(90, 200, 80)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(40, 170, 110)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(120, 210, 70)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(35, 145, 100)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(60, 195, 140)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(33, 115, 65)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(22, 137, 86)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(50, 130, 50)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(14, 108, 94)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(65, 144, 58)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(29, 122, 79)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(86, 151, 50)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(25, 104, 72)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(43, 140, 101)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  candy: {
    dark: [
      { color: "rgb(240, 70, 170)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(255, 90, 140)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(215, 60, 200)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(255, 110, 180)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(200, 80, 240)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(250, 60, 150)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(230, 120, 220)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(245, 85, 165)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(210, 70, 230)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(173, 50, 122)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(184, 65, 101)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(155, 43, 144)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(184, 79, 130)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(144, 58, 173)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(180, 43, 108)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(166, 86, 158)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(176, 61, 119)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(151, 50, 166)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  ice: {
    dark: [
      { color: "rgb(90, 200, 240)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(60, 175, 230)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(130, 220, 250)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(70, 190, 215)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(110, 210, 255)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(50, 165, 220)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(150, 230, 250)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(85, 195, 235)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(65, 180, 245)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(65, 144, 173)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(43, 126, 166)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(94, 158, 180)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(50, 137, 155)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(79, 151, 184)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(36, 119, 158)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(108, 166, 180)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(61, 140, 169)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(47, 130, 176)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  gold: {
    dark: [
      { color: "rgb(240, 190, 60)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(255, 210, 90)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(225, 165, 40)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(250, 200, 70)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 225, 120)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(230, 175, 50)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(245, 205, 85)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(215, 155, 35)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(255, 215, 100)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(173, 137, 43)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(184, 151, 65)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(162, 119, 29)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(180, 144, 50)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(184, 162, 86)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(166, 126, 36)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(176, 148, 61)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(155, 112, 25)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(184, 155, 72)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  }
};
function X1(e, t, r) {
  return R1[e][t ? "dark" : "light"].map((n) => {
    const o = n.offsetX === 0 ? "" : n.offsetX > 0 ? ` + ${n.offsetX}px` : ` - ${Math.abs(n.offsetX)}px`, i = n.offsetY === 0 ? "" : n.offsetY > 0 ? ` + ${n.offsetY}px` : ` - ${Math.abs(n.offsetY)}px`;
    return `radial-gradient(ellipse calc(${n.sizeW}px * var(--beam-w-${r})) calc(${n.sizeH}px * var(--beam-h-${r})) at calc(var(--beam-x-${r}) * 100%${o}) calc(100%${i}), ${n.color}, transparent)`;
  }).join(`,
       `);
}
const F1 = {
  colorful: [
    { color: "rgba(255, 50, 100, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(40, 180, 220, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(50, 200, 80, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(180, 40, 240, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 160, 30, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(100, 70, 255, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(40, 140, 255, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(240, 50, 180, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(30, 185, 170, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  mono: [
    { color: "rgba(200, 200, 200, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(170, 170, 170, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(155, 155, 155, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(185, 185, 185, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(165, 165, 165, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(180, 180, 180, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(160, 160, 160, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(175, 175, 175, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(190, 190, 190, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  ocean: [
    { color: "rgba(100, 80, 220, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(60, 120, 255, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(80, 100, 200, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(130, 70, 255, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(70, 130, 255, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(120, 80, 255, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(90, 110, 230, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(110, 90, 240, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(140, 100, 255, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  sunset: [
    { color: "rgba(255, 100, 60, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(255, 180, 50, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(255, 140, 70, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(255, 80, 80, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 200, 60, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(255, 120, 50, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(255, 160, 80, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(255, 90, 60, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(255, 70, 70, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  forest: [
    { color: "rgba(46, 160, 90,, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(30, 190, 120,, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(70, 180, 70,, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(20, 150, 130,, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(90, 200, 80,, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(40, 170, 110,, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(120, 210, 70,, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(35, 145, 100,, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(60, 195, 140,, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  candy: [
    { color: "rgba(240, 70, 170,, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(255, 90, 140,, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(215, 60, 200,, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(255, 110, 180,, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(200, 80, 240,, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(250, 60, 150,, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(230, 120, 220,, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(245, 85, 165,, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(210, 70, 230,, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  ice: [
    { color: "rgba(90, 200, 240,, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(60, 175, 230,, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(130, 220, 250,, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(70, 190, 215,, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(110, 210, 255,, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(50, 165, 220,, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(150, 230, 250,, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(85, 195, 235,, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(65, 180, 245,, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  gold: [
    { color: "rgba(240, 190, 60,, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(255, 210, 90,, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(225, 165, 40,, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(250, 200, 70,, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 225, 120,, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(230, 175, 50,, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(245, 205, 85,, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(215, 155, 35,, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(255, 215, 100,, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ]
};
function Y1(e, t) {
  return F1[e].map((r) => {
    const n = r.offsetX === 0 ? "" : r.offsetX > 0 ? ` + ${r.offsetX}px` : ` - ${Math.abs(r.offsetX)}px`, o = r.offsetY === 0 ? "" : ` - ${Math.abs(r.offsetY)}px`;
    return `radial-gradient(ellipse calc(${r.sizeW}px * var(--beam-w-${t})) calc(${r.sizeH}px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%${n}) calc(100%${o}), ${r.color}, transparent)`;
  }).join(`,
    `);
}
const O1 = {
  colorful: {
    dark: {
      spikes: [
        { color1: "rgb(100, 70, 255)", color2: "rgba(100, 70, 255, 1)" },
        // 36%
        { color1: "rgba(255, 170, 40, 0.59)", color2: "rgba(255, 170, 40, 0.29)" },
        // 50%
        { color1: "rgb(50, 200, 100)", color2: "rgba(50, 200, 100, 1)" },
        // 64%
        { color1: "rgba(200, 50, 240, 0.91)", color2: "rgba(200, 50, 240, 0.45)" },
        // 78%
        { color1: "rgb(40, 140, 255)", color2: "rgba(40, 140, 255, 1)" }
        // 92%
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(80, 50, 200)", color2: "rgba(80, 50, 200, 0.8)" },
        // 36%
        { color1: "rgba(210, 130, 0, 0.7)", color2: "rgba(210, 130, 0, 0.46)" },
        // 50%
        { color1: "rgb(30, 160, 70)", color2: "rgba(30, 160, 70, 0.82)" },
        // 64%
        { color1: "rgb(160, 30, 190)", color2: "rgba(160, 30, 190, 0.7)" },
        // 78%
        { color1: "rgb(30, 100, 200)", color2: "rgba(30, 100, 200, 0.78)" }
        // 92%
      ]
    }
  },
  mono: {
    dark: {
      spikes: [
        { color1: "rgb(200, 200, 200)", color2: "rgba(200, 200, 200, 1)" },
        { color1: "rgba(180, 180, 180, 0.59)", color2: "rgba(180, 180, 180, 0.29)" },
        { color1: "rgb(190, 190, 190)", color2: "rgba(190, 190, 190, 1)" },
        { color1: "rgba(170, 170, 170, 0.91)", color2: "rgba(170, 170, 170, 0.45)" },
        { color1: "rgb(185, 185, 185)", color2: "rgba(185, 185, 185, 1)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(80, 80, 80)", color2: "rgba(80, 80, 80, 0.8)" },
        { color1: "rgba(100, 100, 100, 0.7)", color2: "rgba(100, 100, 100, 0.46)" },
        { color1: "rgb(70, 70, 70)", color2: "rgba(70, 70, 70, 0.82)" },
        { color1: "rgb(90, 90, 90)", color2: "rgba(90, 90, 90, 0.7)" },
        { color1: "rgb(85, 85, 85)", color2: "rgba(85, 85, 85, 0.78)" }
      ]
    }
  },
  ocean: {
    dark: {
      spikes: [
        { color1: "rgb(100, 80, 255)", color2: "rgb(100, 80, 255)" },
        { color1: "rgba(80, 130, 220, 0.59)", color2: "rgba(80, 130, 220, 0.29)" },
        { color1: "rgb(60, 100, 255)", color2: "rgb(60, 100, 255)" },
        { color1: "rgba(90, 120, 200, 0.91)", color2: "rgba(90, 120, 200, 0.45)" },
        { color1: "rgb(120, 90, 255)", color2: "rgb(120, 90, 255)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(50, 40, 180)", color2: "rgba(50, 40, 180, 0.8)" },
        { color1: "rgba(40, 80, 200, 0.7)", color2: "rgba(40, 80, 200, 0.46)" },
        { color1: "rgb(30, 50, 190)", color2: "rgba(30, 50, 190, 0.82)" },
        { color1: "rgb(60, 90, 180)", color2: "rgba(60, 90, 180, 0.7)" },
        { color1: "rgb(70, 60, 200)", color2: "rgba(70, 60, 200, 0.78)" }
      ]
    }
  },
  sunset: {
    dark: {
      spikes: [
        { color1: "rgb(255, 100, 80)", color2: "rgb(255, 100, 80)" },
        { color1: "rgba(255, 150, 80, 0.59)", color2: "rgba(255, 150, 80, 0.29)" },
        { color1: "rgb(255, 80, 60)", color2: "rgb(255, 80, 60)" },
        { color1: "rgba(255, 120, 50, 0.91)", color2: "rgba(255, 120, 50, 0.45)" },
        { color1: "rgb(255, 140, 70)", color2: "rgb(255, 140, 70)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(200, 60, 30)", color2: "rgba(200, 60, 30, 0.8)" },
        { color1: "rgba(220, 100, 20, 0.7)", color2: "rgba(220, 100, 20, 0.46)" },
        { color1: "rgb(180, 40, 20)", color2: "rgba(180, 40, 20, 0.82)" },
        { color1: "rgb(210, 80, 10)", color2: "rgba(210, 80, 10, 0.7)" },
        { color1: "rgb(190, 70, 30)", color2: "rgba(190, 70, 30, 0.78)" }
      ]
    }
  },
  forest: {
    dark: {
      spikes: [
        { color1: "rgb(46, 160, 90)", color2: "rgb(30, 190, 120)" },
        { color1: "rgba(70, 180, 70,, 0.59)", color2: "rgba(20, 150, 130,, 0.29)" },
        { color1: "rgb(90, 200, 80)", color2: "rgb(40, 170, 110)" },
        { color1: "rgba(120, 210, 70,, 0.91)", color2: "rgba(35, 145, 100,, 0.45)" },
        { color1: "rgb(60, 195, 140)", color2: "rgb(46, 160, 90)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(33, 115, 65)", color2: "rgba(22, 137, 86,, 0.8)" },
        { color1: "rgba(50, 130, 50,, 0.7)", color2: "rgba(14, 108, 94,, 0.46)" },
        { color1: "rgb(65, 144, 58)", color2: "rgba(29, 122, 79,, 0.82)" },
        { color1: "rgb(86, 151, 50)", color2: "rgba(25, 104, 72,, 0.7)" },
        { color1: "rgb(43, 140, 101)", color2: "rgba(33, 115, 65,, 0.78)" }
      ]
    }
  },
  candy: {
    dark: {
      spikes: [
        { color1: "rgb(240, 70, 170)", color2: "rgb(255, 90, 140)" },
        { color1: "rgba(215, 60, 200,, 0.59)", color2: "rgba(255, 110, 180,, 0.29)" },
        { color1: "rgb(200, 80, 240)", color2: "rgb(250, 60, 150)" },
        { color1: "rgba(230, 120, 220,, 0.91)", color2: "rgba(245, 85, 165,, 0.45)" },
        { color1: "rgb(210, 70, 230)", color2: "rgb(240, 70, 170)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(173, 50, 122)", color2: "rgba(184, 65, 101,, 0.8)" },
        { color1: "rgba(155, 43, 144,, 0.7)", color2: "rgba(184, 79, 130,, 0.46)" },
        { color1: "rgb(144, 58, 173)", color2: "rgba(180, 43, 108,, 0.82)" },
        { color1: "rgb(166, 86, 158)", color2: "rgba(176, 61, 119,, 0.7)" },
        { color1: "rgb(151, 50, 166)", color2: "rgba(173, 50, 122,, 0.78)" }
      ]
    }
  },
  ice: {
    dark: {
      spikes: [
        { color1: "rgb(90, 200, 240)", color2: "rgb(60, 175, 230)" },
        { color1: "rgba(130, 220, 250,, 0.59)", color2: "rgba(70, 190, 215,, 0.29)" },
        { color1: "rgb(110, 210, 255)", color2: "rgb(50, 165, 220)" },
        { color1: "rgba(150, 230, 250,, 0.91)", color2: "rgba(85, 195, 235,, 0.45)" },
        { color1: "rgb(65, 180, 245)", color2: "rgb(90, 200, 240)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(65, 144, 173)", color2: "rgba(43, 126, 166,, 0.8)" },
        { color1: "rgba(94, 158, 180,, 0.7)", color2: "rgba(50, 137, 155,, 0.46)" },
        { color1: "rgb(79, 151, 184)", color2: "rgba(36, 119, 158,, 0.82)" },
        { color1: "rgb(108, 166, 180)", color2: "rgba(61, 140, 169,, 0.7)" },
        { color1: "rgb(47, 130, 176)", color2: "rgba(65, 144, 173,, 0.78)" }
      ]
    }
  },
  gold: {
    dark: {
      spikes: [
        { color1: "rgb(240, 190, 60)", color2: "rgb(255, 210, 90)" },
        { color1: "rgba(225, 165, 40,, 0.59)", color2: "rgba(250, 200, 70,, 0.29)" },
        { color1: "rgb(255, 225, 120)", color2: "rgb(230, 175, 50)" },
        { color1: "rgba(245, 205, 85,, 0.91)", color2: "rgba(215, 155, 35,, 0.45)" },
        { color1: "rgb(255, 215, 100)", color2: "rgb(240, 190, 60)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(173, 137, 43)", color2: "rgba(184, 151, 65,, 0.8)" },
        { color1: "rgba(162, 119, 29,, 0.7)", color2: "rgba(180, 144, 50,, 0.46)" },
        { color1: "rgb(184, 162, 86)", color2: "rgba(166, 126, 36,, 0.82)" },
        { color1: "rgb(176, 148, 61)", color2: "rgba(155, 112, 25,, 0.7)" },
        { color1: "rgb(184, 155, 72)", color2: "rgba(173, 137, 43,, 0.78)" }
      ]
    }
  }
};
function Io(e, t) {
  const r = e.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/);
  if (r) return `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t})`;
  const n = e.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  return n ? `rgba(${n[1]}, ${n[2]}, ${n[3]}, ${t})` : e;
}
function br(e, t) {
  const r = e.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (r) return `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${(parseFloat(r[4]) * t).toFixed(2)})`;
  const n = e.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  return n ? `rgba(${n[1]}, ${n[2]}, ${n[3]}, ${t.toFixed(2)})` : e;
}
function I1(e, t, r) {
  const n = L1(e, t), o = O1[e][t ? "dark" : "light"], i = e === "mono", a = i ? 0.14 : 1, l = i ? br(n.primary, 0.14) : n.primary, s = i ? br(n.primary, 0.09) : n.primary, u = i ? br(n.secondary, 0.12) : n.secondary, g = i ? Io(n.secondary, 0.06) : Io(n.secondary, 0.49), f = o.spikes.map(
    (H) => i ? { color1: br(H.color1, a), color2: br(H.color2, a * 0.7) } : H
  ), d = i ? "12px" : "0.8px", v = i ? "14px" : "2px", y = i ? "12px" : "1.2px", x = i ? "10px" : "0.6px", w = i ? "42px" : "92px", p = i ? "38px" : "72px", c = i ? "40px" : "85px", m = i ? "32px" : "60px", h = i ? "12px" : "1px", b = i ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)", z = i ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.9)", k = i ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.5)", $ = i ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.3)", W = i ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.12)", M = i ? "rgba(255, 255, 255, 0.015)" : "rgba(255, 255, 255, 0.03)";
  if (t)
    return `radial-gradient(ellipse calc(${d} * var(--beam-spike-${r}) * var(--beam-spike-mul, 1)) calc(${w} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 8% calc(100% - 2px), ${l}, ${s} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${r}) * var(--beam-spike-mul, 1)) calc(35px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 22% calc(100% - 4px), ${u}, ${g} 50%, transparent 95%),
       radial-gradient(ellipse calc(${v} * (2 - var(--beam-spike-${r})) * var(--beam-spike-mul, 1)) calc(${p} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 36% calc(100% - 3px), ${f[0].color1}, ${f[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${r}) * var(--beam-spike-mul, 1)) calc(28px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 50% calc(100% - 2px), ${f[1].color1}, ${f[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${y} * (2 - var(--beam-spike2-${r})) * var(--beam-spike-mul, 1)) calc(${c} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 64% calc(100% - 4px), ${f[2].color1}, ${f[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${r}) * var(--beam-spike-mul, 1)) calc(45px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 78% calc(100% - 2px), ${f[3].color1}, ${f[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${x} * (2 - var(--beam-spike-${r})) * var(--beam-spike-mul, 1)) calc(${m} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 92% calc(100% - 3px), ${f[4].color1}, ${f[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike-${r})) calc(15px * var(--beam-spike2-${r})) at calc(var(--beam-x-${r}) * 100%) calc(100% + 1px), ${b} 0%, ${z} 20%, ${k} 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w-${r})) calc(40px * var(--beam-h-${r})) at calc(var(--beam-x-${r}) * 100%) 100%, ${$} 0%, ${W} 25%, ${M} 55%, transparent 80%)`;
  {
    const H = i ? br(n.primary, 0.11) : Io(n.primary, 0.85), N = i ? br(n.secondary, 0.09) : Io(n.secondary, 0.7);
    return `radial-gradient(ellipse calc(${d} * var(--beam-spike-${r}) * var(--beam-spike-mul, 1)) calc(${w} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 8% calc(100% - 2px), ${l}, ${H} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${r}) * var(--beam-spike-mul, 1)) calc(35px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 22% calc(100% - 4px), ${u}, ${N} 50%, transparent 95%),
       radial-gradient(ellipse calc(${v} * (2 - var(--beam-spike-${r})) * var(--beam-spike-mul, 1)) calc(${p} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 36% calc(100% - 3px), ${f[0].color1}, ${f[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${r}) * var(--beam-spike-mul, 1)) calc(28px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 50% calc(100% - 2px), ${f[1].color1}, ${f[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${y} * (2 - var(--beam-spike2-${r})) * var(--beam-spike-mul, 1)) calc(${c} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 64% calc(100% - 4px), ${f[2].color1}, ${f[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${r}) * var(--beam-spike-mul, 1)) calc(45px * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 78% calc(100% - 2px), ${f[3].color1}, ${f[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${h} * (2 - var(--beam-spike-${r})) * var(--beam-spike-mul, 1)) calc(${m} * var(--beam-h-${r}) * var(--beam-spike-mul, 1)) at 92% calc(100% - 3px), ${f[4].color1}, ${f[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w-${r})) calc(32px * var(--beam-h-${r})) at calc(var(--beam-x-${r}) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`;
  }
}
const Ef = [
  { region: 1, quad: "tl" },
  { region: 2, quad: "tl" },
  { region: 3, quad: "bl" },
  { region: 1, quad: "bl" },
  { region: 2, quad: "br" },
  { region: 3, quad: "br" },
  { region: 1, quad: "tr" },
  { region: 2, quad: "tr" },
  { region: 3, quad: "tr" }
], D1 = [
  [65, 35],
  [55, 30],
  [35, 65],
  [15, 30],
  [173, 28],
  [80, 22],
  [69, 28],
  [22, 38],
  [47, 44]
], A1 = [
  { ci: 0, region: 1, quad: "tl", w: 84, h: 48 },
  { ci: 1, region: 2, quad: "tl", w: 72, h: 42 },
  { ci: 2, region: 3, quad: "bl", w: 48, h: 84 },
  { ci: 4, region: 2, quad: "br", w: 216, h: 38 },
  { ci: 5, region: 3, quad: "br", w: 102, h: 31 },
  { ci: 6, region: 1, quad: "tr", w: 89, h: 38 },
  { ci: 8, region: 3, quad: "tr", w: 62, h: 58 }
], e0 = [
  { ci: 0, region: 1, quad: "tl", w: 80, h: 19, x: "27%", y: "0%" },
  { ci: 6, region: 2, quad: "tr", w: 74, h: 11, x: "73%", y: "-1%" },
  { ci: 7, region: 3, quad: "tr", w: 15, h: 44, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 19, h: 38, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 84, h: 13, x: "67%", y: "100%" },
  { ci: 1, region: 3, quad: "bl", w: 60, h: 21, x: "24%", y: "101%" },
  { ci: 2, region: 1, quad: "bl", w: 17, h: 40, x: "0%", y: "60%" },
  { ci: 3, region: 2, quad: "tl", w: 13, h: 32, x: "-1%", y: "28%" }
], j1 = [
  { ci: 0, region: 1, quad: "tl", w: 110, h: 30, x: "27%", y: "3%" },
  { ci: 6, region: 2, quad: "tr", w: 100, h: 20, x: "73%", y: "1%" },
  { ci: 7, region: 3, quad: "tr", w: 26, h: 62, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 30, h: 56, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 120, h: 22, x: "67%", y: "99%" },
  { ci: 1, region: 3, quad: "bl", w: 88, h: 32, x: "24%", y: "99%" },
  { ci: 2, region: 1, quad: "bl", w: 28, h: 58, x: "0%", y: "60%" }
];
function B1(e, t, r) {
  const n = e.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  return `rgba(${n ? `${n[1]}, ${n[2]}, ${n[3]}` : "255, 255, 255"}, var(--bop-${t}-${r}))`;
}
function Ps(e, t, r, n, o, i, a, l) {
  return `radial-gradient(ellipse calc(${t}px * var(--bw${n}-${l}) * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${r}px * var(--bh${n}-${l}) * var(--bgh-${l}) * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at calc(${i} + var(--bx${n}-${l})) calc(${a} + var(--by${n}-${l})), ${B1(e, o, l)}, transparent)`;
}
function U1(e, t) {
  return Or[e].border.map((r, n) => {
    const { region: o, quad: i } = Ef[n], [a, l] = r.pos.split(" "), [s, u] = r.size.split(" ").map(parseFloat);
    return Ps(r.color, s, u, o, i, a, l, t);
  }).join(`,
    `);
}
function V1(e, t, r) {
  const n = Or[e].border.map((l, s) => {
    const { region: u, quad: g } = Ef[s], [f, d] = l.pos.split(" "), [v, y] = D1[s];
    return Ps(l.color, v, y, u, g, f, d, t);
  }), o = r ? "255, 255, 255" : "0, 0, 0", i = r ? 0.18 : 0.08, a = [
    ["0%", "0%", "tl"],
    ["100%", "0%", "tr"],
    ["0%", "100%", "bl"],
    ["100%", "100%", "br"]
  ].map(
    ([l, s, u]) => `radial-gradient(ellipse 60px 60px at ${l} ${s}, rgba(${o}, calc(${i} * var(--bop-${u}-${t}))), transparent 70%)`
  );
  return [...n, ...a].join(`,
    `);
}
function t0(e, t, r) {
  const n = Or[t].border;
  return e.map((o) => {
    const i = n[o.ci], [a, l] = i.pos.split(" ");
    return Ps(i.color, o.w, o.h, o.region, o.quad, o.x ?? a, o.y ?? l, r);
  }).join(`,
    `);
}
function Cf(e, t, r) {
  const n = Or[t].border, o = +r.toFixed(3);
  return e.map((i) => {
    const a = n[i.ci], [l, s] = a.pos.split(" "), u = i.x ?? l, g = i.y ?? s, f = a.color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/), d = f ? `${f[1]}, ${f[2]}, ${f[3]}` : "255, 255, 255";
    return `radial-gradient(ellipse calc(${i.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${i.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at ${u} ${g}, rgba(${d}, ${o}), transparent)`;
  }).join(`,
    `);
}
function xo(e) {
  return `
[data-beam="${e}"][data-paused],
[data-beam="${e}"][data-paused]::after,
[data-beam="${e}"][data-paused]::before,
[data-beam="${e}"][data-paused] [data-beam-bloom] {
  animation-play-state: paused !important;
}`;
}
function _f(e) {
  const t = ["bw1", "bh1", "bw2", "bh2", "bw3", "bh3", "bgh", "bop-tl", "bop-tr", "bop-bl", "bop-br"], r = ["bx1", "by1", "bx2", "by2", "bx3", "by3"], n = t.map(
    (i) => `@property --${i}-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}`
  ).join(`

`), o = r.map(
    (i) => `@property --${i}-${e} {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}`
  ).join(`

`);
  return `${n}

${o}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-hue-${e} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}`;
}
function Hs(e, t, r) {
  const n = t === "dark", o = r / 2.3;
  return e === "pulse-inner" ? {
    sp: 0.28,
    dr: n ? 33 : 40,
    op: n ? 0.48 : 0.45,
    gh: n ? 0.34 : 0.22,
    bs: (n ? 1.9 : 2.6) * o,
    ss: (n ? 2.6 : 4.6) * o,
    ghs: (n ? 2.4 : 5.5) * o,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 16
  } : {
    sp: n ? 0.28 : 0.36,
    dr: n ? 14 : 19,
    op: n ? 0.46 : 0,
    gh: n ? 0.16 : 0.58,
    bs: (n ? 2.3 : 3.7) * o,
    ss: (n ? 6.4 : 4.6) * o,
    ghs: (n ? 2.4 : 3.8) * o,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 14
  };
}
function Q1(e, t) {
  const { sp: r, dr: n, op: o, gh: i, bs: a, ss: l, ghs: s } = t;
  return [
    { prop: `--bw1-${e}`, a: 1 - r, b: 1 + r * 1.1, period: l * 0.9, delay: 0, unit: "" },
    { prop: `--bh1-${e}`, a: 1 + r * 0.9, b: 1 - r * 0.85, period: l * 1.26, delay: 0, unit: "" },
    { prop: `--bx1-${e}`, a: -n, b: n * 0.9, period: a * 1.6, delay: 0, unit: "px" },
    { prop: `--by1-${e}`, a: n * 0.55, b: -n * 0.7, period: a * 1.6, delay: 0, unit: "px" },
    { prop: `--bw2-${e}`, a: 1 + r, b: 1 - r * 0.85, period: l * 1.1, delay: 0, unit: "" },
    { prop: `--bh2-${e}`, a: 1 - r * 0.8, b: 1 + r * 1.05, period: l * 0.81, delay: 0, unit: "" },
    { prop: `--bx2-${e}`, a: n * 0.8, b: -n * 0.9, period: a * 1.88, delay: 0, unit: "px" },
    { prop: `--by2-${e}`, a: -n, b: n * 0.65, period: a * 1.88, delay: 0, unit: "px" },
    { prop: `--bw3-${e}`, a: 1 - r * 0.6, b: 1 + r * 1.15, period: l * 0.98, delay: 0, unit: "" },
    { prop: `--bh3-${e}`, a: 1 + r * 0.75, b: 1 - r, period: l * 1.4, delay: 0, unit: "" },
    { prop: `--bx3-${e}`, a: -n * 0.6, b: n, period: a * 1.45, delay: 0, unit: "px" },
    { prop: `--by3-${e}`, a: -n * 0.85, b: n * 0.45, period: a * 1.45, delay: 0, unit: "px" },
    { prop: `--bgh-${e}`, a: 1 - i, b: 1 + i, period: s, delay: 0, unit: "" },
    { prop: `--bop-tl-${e}`, a: 1 - o, b: 1, period: a, delay: 0, unit: "" },
    { prop: `--bop-tr-${e}`, a: 1 - o, b: 1, period: a * 1.32, delay: a * 0.28, unit: "" },
    { prop: `--bop-bl-${e}`, a: 1 - o, b: 1, period: a * 0.84, delay: a * 0.55, unit: "" },
    { prop: `--bop-br-${e}`, a: 1 - o, b: 1, period: a * 1.58, delay: a * 0.83, unit: "" }
  ];
}
function q1(e, t, r, n, o, i) {
  if (e !== "pulse-inner" && e !== "pulse-outside") return null;
  const a = Hs(e, t, r);
  return {
    oscillators: Q1(i, a),
    // Pulse colors continuously rotate a full hue circle so the palette is never
    // pinned to fixed edges (no more "always red top-right / green left").
    hue: o ? null : { prop: `--beam-hue-${i}`, range: 360, period: a.huePeriod, continuous: !0 }
  };
}
function Ci(e, t, r) {
  return `  animation: ${t}-${e} ${r}s ease forwards;`;
}
function fr(e, t = 1) {
  return Math.max(0.5, Math.round(e * t * 100) / 100);
}
function G1(e) {
  const { size: t } = e;
  return t === "line" ? t2(e) : t === "sm" ? K1(e) : t === "pulse-inner" ? J1(e) : t === "pulse-outside" ? e2(e) : Z1(e);
}
function K1(e) {
  const {
    id: t,
    borderRadius: r,
    borderWidth: n,
    duration: o,
    strokeOpacity: i,
    innerOpacity: a,
    bloomOpacity: l,
    innerShadow: s,
    colorVariant: u,
    staticColors: g,
    brightness: f,
    saturation: d,
    hueRange: v,
    theme: y,
    glowSize: x = 1
  } = e, w = Math.max(0, r - n), p = u === "mono" ? 0.5 : 1, c = i * p, m = a * p, h = l * p, b = g ? "" : `animation: beam-hue-shift-${t} 12s ease-in-out infinite;`, z = g ? "" : `
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
}`, k = y === "dark", $ = k ? `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )` : `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`, W = P1(u), M = H1(u), H = k ? `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )` : `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`, N = `conic-gradient(
    from var(--beam-angle-${t}),
    transparent 0%, transparent 22%,
    rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
    white 46%, white 82%,
    rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
    transparent 97%, transparent 100%
  )`;
  return `
@property --beam-angle-${t} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${r}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-spin-${t} ${o}s linear infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-spin-${t} ${o}s linear infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  padding: ${n}px;
  clip-path: inset(0 round ${r}px);
  background: ${$},${W};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * ${c.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${b}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  clip-path: inset(0 round ${r}px);
  background: ${M};
  box-shadow: inset 0 0 5px 1px ${s};
  -webkit-mask-image: ${N};
  -webkit-mask-composite: source-over;
  mask-image: ${N};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * ${m.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${b}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  clip-path: inset(0 round ${r}px);
  background: ${H};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${n}px;
  filter: blur(${fr(8, x)}px) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${h.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

@keyframes beam-spin-${t} {
  to { --beam-angle-${t}: 360deg; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${z}
${xo(t)}
`;
}
function Z1(e) {
  const {
    id: t,
    borderRadius: r,
    borderWidth: n,
    duration: o,
    strokeOpacity: i,
    innerOpacity: a,
    bloomOpacity: l,
    innerShadow: s,
    colorVariant: u,
    staticColors: g,
    brightness: f,
    saturation: d,
    hueRange: v,
    theme: y,
    glowSize: x = 1
  } = e, w = Math.max(0, r - n), p = u === "mono" ? 0.5 : 1, c = i * p, m = a * p, h = l * p, b = g ? "" : `animation: beam-hue-shift-${t} 12s ease-in-out infinite;`, z = g ? "" : `
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
}`, k = y === "dark", $ = k ? `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )` : `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`, W = T1(u), M = N1(u), H = k ? `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )` : `conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`;
  return `
@property --beam-angle-${t} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${r}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-spin-${t} ${o}s linear infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-spin-${t} ${o}s linear infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  padding: ${n}px;
  clip-path: inset(0 round ${r}px);
  background: ${$},${W};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * ${c.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${b}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  background: ${M};
  box-shadow: inset 0 0 9px 1px ${s};
  -webkit-mask-image:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * ${m.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round ${r}px);
  ${b}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  clip-path: inset(0 round ${r}px);
  background: ${H};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${n}px;
  filter: blur(${fr(8, x)}px) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${h.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

@keyframes beam-spin-${t} {
  to { --beam-angle-${t}: 360deg; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${z}
${xo(t)}
`;
}
function J1(e) {
  const {
    id: t,
    borderRadius: r,
    borderWidth: n,
    duration: o,
    strokeOpacity: i,
    innerOpacity: a,
    bloomOpacity: l,
    colorVariant: s,
    staticColors: u,
    brightness: g,
    saturation: f,
    hueRange: d,
    theme: v,
    glowSize: y = 1
  } = e, x = v === "dark", w = s === "mono" ? 0.5 : 1, p = (i * w).toFixed(2), c = (a * w).toFixed(2), m = (l * w).toFixed(2), { op: h } = Hs("pulse-inner", v, o), b = fr(8, y), z = g.toFixed(2), k = f.toFixed(2), $ = u ? `filter: brightness(${z}) saturate(${k});` : `filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${t}))) brightness(${z}) saturate(${k});`, W = u ? `filter: blur(${b}px) brightness(${z}) saturate(${k});` : `filter: blur(${b}px) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${t}))) brightness(${z}) saturate(${k});`, M = U1(s, t), H = V1(s, t, x), N = Cf(A1, s, 1 - h * 0.5);
  return `
${_f(t)}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${r}px;
  overflow: hidden;
  isolation: isolate;
}

[data-beam="${t}"][data-active] {
${Ci(t, "beam-fade-in", 0.6)}
}

[data-beam="${t}"][data-fading] {
${Ci(t, "beam-fade-out", 0.5)}
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  padding: ${n}px;
  clip-path: inset(0 round ${r}px);
  background: ${M};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${p} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${$}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  clip-path: inset(0 round ${r}px);
  background: ${H};
  -webkit-mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-over;
  mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${c} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${$}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  clip-path: inset(0 round ${r}px);
  background: ${N};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${n}px;
  pointer-events: none;
  z-index: 3;
  will-change: opacity;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${m} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${W}
}

@keyframes beam-fade-in-${t} { to { --beam-opacity-${t}: 1; } }
@keyframes beam-fade-out-${t} { from { --beam-opacity-${t}: 1; } to { --beam-opacity-${t}: 0; } }
${xo(t)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${t}"][data-active],
  [data-beam="${t}"][data-fading],
  [data-beam="${t}"][data-active]::after,
  [data-beam="${t}"][data-fading]::after,
  [data-beam="${t}"][data-active]::before,
  [data-beam="${t}"][data-fading]::before,
  [data-beam="${t}"][data-active] [data-beam-bloom],
  [data-beam="${t}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`;
}
function e2(e) {
  const {
    id: t,
    borderRadius: r,
    duration: n,
    strokeOpacity: o,
    innerOpacity: i,
    bloomOpacity: a,
    colorVariant: l,
    staticColors: s,
    brightness: u,
    saturation: g,
    hueRange: f,
    theme: d,
    hairlineOpacity: v = 0,
    glowSize: y = 1
  } = e, x = d === "dark", w = l === "mono" ? 0.5 : 1, p = (o * w).toFixed(2), c = (i * w).toFixed(2), m = (a * w).toFixed(2), h = x ? "70, 70, 70" : "0, 0, 0", b = v.toFixed(2), z = `linear-gradient(rgba(${h}, ${b}), rgba(${h}, ${b}))`, { op: k } = Hs("pulse-outside", d, n), $ = 0.95, W = 0.9, M = fr(x ? 3 : 6, y), H = fr(x ? 22.5 : 15, y), N = u.toFixed(2), T = g.toFixed(2), X = s ? `filter: brightness(${N}) saturate(${T});` : `filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${t}))) brightness(${N}) saturate(${T});`, O = `brightness(var(--beam-glow-brightness, ${N})) saturate(var(--beam-glow-saturate, ${T}))`, F = s ? `filter: blur(var(--beam-core-blur, ${M}px)) ${O};` : `filter: blur(var(--beam-core-blur, ${M}px)) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${t}))) ${O};`, L = s ? `filter: blur(var(--beam-bloom-blur, ${H}px)) ${O};` : `filter: blur(var(--beam-bloom-blur, ${H}px)) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${t}))) ${O};`, S = t0(e0, l, t), _ = t0(e0, l, t), E = Cf(j1, l, 1 - k * 0.5), P = v > 0 ? `${S},
    ${z}` : S;
  return `
${_f(t)}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${r}px;
  overflow: visible;
  isolation: isolate;
}

[data-beam="${t}"][data-active] {
${Ci(t, "beam-fade-in", 0.6)}
}

[data-beam="${t}"][data-fading] {
${Ci(t, "beam-fade-out", 0.5)}
}
${v > 0 ? `
/* Idle hairline — painted above the (opaque) child in the inner 1px edge ring so
   it overlaps a standard inset component border exactly. */
[data-beam="${t}"]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  padding: 1px;
  clip-path: inset(0 round ${r}px);
  background: ${z};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}
` : ""}
[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  padding: 1px;
  clip-path: inset(0 round ${r}px);
  background: ${P};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${p} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${X}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: -10px;
  z-index: -1;
  border-radius: ${r + 10}px;
  background: ${_};
  transform: scale(${$}, ${W});
  pointer-events: none;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${c} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${F}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: -30px;
  z-index: -1;
  border-radius: ${r + 30}px;
  background: ${E};
  transform: scale(${$}, ${W});
  pointer-events: none;
  will-change: transform;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${m} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${L}
}

@keyframes beam-fade-in-${t} { to { --beam-opacity-${t}: 1; } }
@keyframes beam-fade-out-${t} { from { --beam-opacity-${t}: 1; } to { --beam-opacity-${t}: 0; } }
${xo(t)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${t}"][data-active],
  [data-beam="${t}"][data-fading],
  [data-beam="${t}"][data-active]::after,
  [data-beam="${t}"][data-fading]::after,
  [data-beam="${t}"][data-active]::before,
  [data-beam="${t}"][data-fading]::before,
  [data-beam="${t}"][data-active] [data-beam-bloom],
  [data-beam="${t}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`;
}
function t2(e) {
  const {
    id: t,
    borderRadius: r,
    borderWidth: n,
    duration: o,
    strokeOpacity: i,
    innerOpacity: a,
    bloomOpacity: l,
    innerShadow: s,
    colorVariant: u,
    staticColors: g,
    brightness: f,
    saturation: d,
    hueRange: v,
    theme: y,
    glowSize: x = 1
  } = e, w = Math.max(0, r - n), p = y === "dark", c = i, m = a, h = l, b = g ? "" : `animation: beam-hue-shift-${t} 12s ease-in-out infinite;`, z = g ? "" : `animation: beam-hue-shift-bloom-${t} 8s ease-in-out infinite;`, k = g ? "" : `
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
}

@keyframes beam-hue-shift-bloom-${t} {
  0% { filter: blur(${fr(8, x)}px) hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v + 10}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  50% { filter: blur(${fr(8, x)}px) hue-rotate(calc(var(--beam-hue-base, 0deg) + ${v + 10}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
  100% { filter: blur(${fr(8, x)}px) hue-rotate(calc(var(--beam-hue-base, 0deg) - ${v + 10}deg)) brightness(${f.toFixed(2)}) saturate(${d.toFixed(2)}); }
}`, $ = p ? `radial-gradient(
        ellipse calc(24px * var(--beam-w-${t})) calc(28px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )` : `radial-gradient(
        ellipse calc(35px * var(--beam-w-${t})) calc(28px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) calc(100% + 2px),
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        transparent 70%
      )`, W = X1(u, p, t), M = Y1(u, t), H = I1(u, p, t), N = u === "mono" ? "filter: blur(6px);" : "";
  return `
@property --beam-x-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-w-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-h-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike2-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-edge-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${r}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-travel-${t} ${o}s linear infinite,
    beam-edge-fade-${t} ${o}s linear infinite,
    beam-breathe-${t} ${(o * 1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${t} ${(o * 1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${t} ${(o * 1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-travel-${t} ${o}s linear infinite,
    beam-edge-fade-${t} ${o}s linear infinite,
    beam-breathe-${t} ${(o * 1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${t} ${(o * 1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${t} ${(o * 1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  padding: ${n}px;
  clip-path: inset(0 round ${r}px);
  background: ${$}, ${W};
  -webkit-mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${c.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${b}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${r}px;
  background: ${M};
  box-shadow: inset 0 0 9px 1px ${s};
  -webkit-mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${m.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round ${r}px);
  ${b}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${w}px;
  clip-path: inset(0 round ${r}px);
  padding: 0;
  -webkit-mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${t})) calc(110px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  -webkit-mask-composite: source-over;
  mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${t})) calc(110px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  mask-composite: add;
  background: ${H};
  ${N}
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${h.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${z}
}

@keyframes beam-travel-${t} {
  0%   { --beam-x-${t}: 0.06;  --beam-w-${t}: 0.5; }
  10%  { --beam-x-${t}: 0.15;  --beam-w-${t}: 0.8; }
  20%  { --beam-x-${t}: 0.25;  --beam-w-${t}: 1.1; }
  30%  { --beam-x-${t}: 0.35;  --beam-w-${t}: 1.3; }
  40%  { --beam-x-${t}: 0.44;  --beam-w-${t}: 1.45; }
  50%  { --beam-x-${t}: 0.5;   --beam-w-${t}: 1.5; }
  60%  { --beam-x-${t}: 0.56;  --beam-w-${t}: 1.45; }
  70%  { --beam-x-${t}: 0.65;  --beam-w-${t}: 1.3; }
  80%  { --beam-x-${t}: 0.75;  --beam-w-${t}: 1.1; }
  90%  { --beam-x-${t}: 0.85;  --beam-w-${t}: 0.8; }
  100% { --beam-x-${t}: 0.94;  --beam-w-${t}: 0.5; }
}

@keyframes beam-edge-fade-${t} {
  0%    { --beam-edge-${t}: 0; }
  12.5% { --beam-edge-${t}: 0; }
  32.5% { --beam-edge-${t}: 1; }
  67.5% { --beam-edge-${t}: 1; }
  87.5% { --beam-edge-${t}: 0; }
  100%  { --beam-edge-${t}: 0; }
}

@keyframes beam-breathe-${t} {
  0%, 100% { --beam-h-${t}: 0.8; }
  25%      { --beam-h-${t}: 1.25; }
  55%      { --beam-h-${t}: 0.85; }
  80%      { --beam-h-${t}: 1.3; }
}

@keyframes beam-spike-${t} {
  0%   { --beam-spike-${t}: 0.8; }
  25%  { --beam-spike-${t}: 1.3; }
  50%  { --beam-spike-${t}: 0.9; }
  75%  { --beam-spike-${t}: 1.4; }
  100% { --beam-spike-${t}: 0.8; }
}

@keyframes beam-spike2-${t} {
  0%   { --beam-spike2-${t}: 1.2; }
  25%  { --beam-spike2-${t}: 0.7; }
  50%  { --beam-spike2-${t}: 1.4; }
  75%  { --beam-spike2-${t}: 0.8; }
  100% { --beam-spike2-${t}: 1.2; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${k}
${xo(t)}
`;
}
const _i = /* @__PURE__ */ new Set();
let cn = null, Pl = 0;
const r2 = 1e3 / 30 - 2, n2 = Math.PI * 2;
function r0(e) {
  return (1 - Math.cos(n2 * e)) / 2;
}
function Wf(e) {
  if (cn = requestAnimationFrame(Wf), e - Pl < r2) return;
  Pl = e;
  const t = e / 1e3;
  _i.forEach(({ el: r, config: n }) => {
    for (const o of n.oscillators) {
      const i = (t - o.delay) / o.period, a = o.a + (o.b - o.a) * r0(i);
      r.style.setProperty(
        o.prop,
        o.unit === "px" ? `${a.toFixed(2)}px` : a.toFixed(4)
      );
    }
    if (n.hue) {
      const { prop: o, range: i, period: a, continuous: l } = n.hue, s = l ? t / a % 1 * i : -i + 2 * i * r0(t / a);
      r.style.setProperty(o, `${s.toFixed(2)}deg`);
    }
  });
}
function o2() {
  cn == null && (Pl = 0, cn = requestAnimationFrame(Wf));
}
function i2() {
  _i.size === 0 && cn != null && (cancelAnimationFrame(cn), cn = null);
}
function a2(e, t) {
  const r = { el: e, config: t };
  return _i.add(r), o2(), () => {
    _i.delete(r), i2();
  };
}
function l2() {
  const [e, t] = B.useState(() => typeof window > "u" || window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  return B.useEffect(() => {
    if (typeof window > "u") return;
    const r = window.matchMedia("(prefers-color-scheme: dark)"), n = (o) => {
      t(o.matches ? "dark" : "light");
    };
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
  }, []), e;
}
function s2(e, t) {
  return e === "auto" ? t : e;
}
const u2 = B.forwardRef(
  function({
    children: e,
    size: t = "md",
    colorVariant: r = "colorful",
    theme: n = "dark",
    staticColors: o = !1,
    duration: i,
    active: a = !0,
    borderRadius: l,
    brightness: s,
    saturation: u,
    hueRange: g = 30,
    glowSize: f = 1,
    strength: d = 1,
    className: v,
    style: y,
    css: x,
    onActivate: w,
    onDeactivate: p,
    onAnimationEnd: c,
    ...m
  }, h) {
    const b = B.useId().replace(/:/g, "-"), z = l2(), k = B.useRef(null), [$, W] = B.useState(a), [M, H] = B.useState(!1), [N, T] = B.useState(!0), [X, O] = B.useState(null), [F, L] = B.useState({ x: 1, y: 1 });
    B.useEffect(() => {
      if (l != null) return;
      const A = k.current;
      if (!A) return;
      const K = () => {
        const ve = A.firstElementChild;
        if (!ve) return;
        const we = getComputedStyle(ve), de = parseFloat(we.borderTopLeftRadius);
        !isNaN(de) && de > 0 && O(de);
      };
      K();
      const Z = new MutationObserver(K);
      return Z.observe(A, { childList: !0, subtree: !1 }), () => Z.disconnect();
    }, [l, e]), B.useEffect(() => {
      a && !$ && !M ? W(!0) : !a && $ && !M && H(!0);
    }, [a, $, M]), B.useEffect(() => {
      const A = k.current;
      if (!A || typeof IntersectionObserver > "u") return;
      const K = new IntersectionObserver(
        (Z) => {
          for (const ve of Z) T(ve.isIntersecting);
        },
        // Start animating slightly before the element scrolls into view.
        { rootMargin: "256px" }
      );
      return K.observe(A), () => K.disconnect();
    }, []), B.useEffect(() => {
      if (t !== "pulse-outside") {
        L({ x: 1, y: 1 });
        return;
      }
      const A = k.current;
      if (!A) return;
      const K = 350, Z = 140, ve = 0.35, we = 4, de = (nt) => Math.max(ve, Math.min(we, nt)), ye = () => {
        const nt = A.firstElementChild;
        if (!nt) return;
        const xe = nt.getBoundingClientRect();
        if (!xe.width || !xe.height) return;
        const Qe = +de(xe.width / K).toFixed(3), me = +de(xe.height / Z).toFixed(3);
        L((te) => te.x === Qe && te.y === me ? te : { x: Qe, y: me });
      };
      if (ye(), typeof ResizeObserver > "u") return;
      const $e = A.firstElementChild;
      if (!$e) return;
      const We = new ResizeObserver(ye);
      return We.observe($e), () => We.disconnect();
    }, [t, e]);
    const S = B.useCallback(
      (A) => {
        const K = A.animationName;
        K.includes("fade-out") ? (W(!1), H(!1), p?.()) : K.includes("fade-in") && w?.(), c?.(A);
      },
      [w, p, c]
    ), _ = s2(n, z), E = W1[t][_], P = _1[t], Y = t === "pulse-inner" || t === "pulse-outside", D = l ?? X ?? P.borderRadius, I = i ?? (t === "line" ? 3.1 : Y ? 2.3 : 1.96), U = u ?? E.saturation, G = s ?? E.brightness ?? 1.3, ee = t === "line" ? Math.min(g, 13) : g, ue = r === "mono" ? !0 : o, ce = B.useMemo(
      () => G1({
        id: b,
        borderRadius: D,
        borderWidth: P.borderWidth,
        duration: I,
        strokeOpacity: E.strokeOpacity,
        innerOpacity: E.innerOpacity,
        bloomOpacity: E.bloomOpacity,
        innerShadow: E.innerShadow,
        size: t,
        colorVariant: r,
        staticColors: ue,
        brightness: G,
        saturation: U,
        hueRange: ee,
        theme: _,
        hairlineOpacity: E.hairlineOpacity,
        glowSize: f
      }),
      [
        b,
        D,
        P.borderWidth,
        I,
        E.strokeOpacity,
        E.innerOpacity,
        E.bloomOpacity,
        E.innerShadow,
        E.hairlineOpacity,
        t,
        r,
        ue,
        G,
        U,
        ee,
        f,
        _
      ]
    ), pe = B.useMemo(
      () => Y ? q1(t, _, I, ee, ue, b) : null,
      [Y, t, _, I, ee, ue, b]
    );
    B.useEffect(() => {
      var A;
      if (!pe || !($ || M) || !N) return;
      const K = k.current;
      if (K && !(typeof window < "u" && (A = window.matchMedia) != null && A.call(window, "(prefers-reduced-motion: reduce)").matches))
        return a2(K, pe);
    }, [pe, $, M, N]);
    const Le = B.useCallback(
      (A) => {
        k.current = A, typeof h == "function" ? h(A) : h && (h.current = A);
      },
      [h]
    ), _e = {
      ...y ?? {},
      "--beam-strength": Math.max(0, Math.min(1, d)),
      ...t === "pulse-outside" ? { "--pulse-glow-sx": F.x, "--pulse-glow-sy": F.y } : {}
    };
    return /* @__PURE__ */ Sr.jsxs(Sr.Fragment, { children: [
      /* @__PURE__ */ Sr.jsx("style", { children: x ? `${ce}
${x.split("{id}").join(b)}` : ce }),
      /* @__PURE__ */ Sr.jsxs(
        "div",
        {
          ...m,
          ref: Le,
          "data-beam": b,
          "data-active": $ && !M ? "" : void 0,
          "data-fading": M ? "" : void 0,
          "data-paused": $ && !M && !N ? "" : void 0,
          className: v,
          style: _e,
          onAnimationEnd: S,
          children: [
            e,
            /* @__PURE__ */ Sr.jsx("div", { "data-beam-bloom": !0 })
          ]
        }
      )
    ] });
  }
);
let Ln = null;
function c2() {
  if (typeof window > "u") return null;
  const e = window;
  return e.AudioContext ?? e.webkitAudioContext ?? null;
}
function f2() {
  const e = c2();
  return e ? (Ln || (Ln = new e()), Ln.state === "suspended" && Ln.resume().catch(() => {
  }), Ln) : null;
}
const Ca = /* @__PURE__ */ new WeakMap();
function p2(e) {
  const t = f2();
  if (!t || e.getAudioTracks().length === 0) return null;
  let r = Ca.get(e);
  r || (r = { node: t.createMediaStreamSource(e), refs: 0 }, Ca.set(e, r)), r.refs += 1;
  const n = t.createAnalyser();
  n.fftSize = 1024, n.smoothingTimeConstant = 0.5, r.node.connect(n);
  let o = !1;
  return {
    analyser: n,
    release: () => {
      if (!o) {
        o = !0;
        try {
          r.node.disconnect(n);
        } catch {
        }
        if (r.refs -= 1, r.refs <= 0) {
          try {
            r.node.disconnect();
          } catch {
          }
          Ca.delete(e);
        }
      }
    }
  };
}
const Pr = {
  positive: { r: 92, g: 224, b: 150 },
  negative: { r: 255, g: 104, b: 104 },
  calm: { r: 104, g: 162, b: 255 }
}, d2 = {
  green: Pr.positive,
  red: Pr.negative,
  blue: Pr.calm
}, g2 = 0.7, m2 = 1.1, h2 = 0.6;
class v2 {
  constructor() {
    this.glow = { r: 0, g: 0, b: 0, amount: 0, t: 0, size: 0 };
  }
  /** Advance toward `target` (null: fade out). `still` jumps straight there. */
  step(t, r, n, o, i) {
    const a = this.glow, l = (u) => i ? 1 : 1 - Math.exp(-t / u), s = r ? 1 : 0;
    if (a.amount += (s - a.amount) * l(s > a.amount ? g2 : m2), r) {
      const u = a.amount < 0.03 ? 1 : l(h2);
      a.r += (r.r - a.r) * u, a.g += (r.g - a.g) * u, a.b += (r.b - a.b) * u;
    }
    return a.t = n, a.size = o, a;
  }
}
const Pf = (e, t) => {
  var r;
  return ((r = e.light) == null ? void 0 : r.r) ?? t * 0.28;
};
function y2(e, t, r) {
  const n = (Pf(e, t) * 0.7) ** 2, o = 0.9 * Math.min(1, Math.max(0, r.amount)), i = (a, l) => {
    const s = r.x - a, u = r.y - l, g = o * Math.exp(-(s * s + u * u) / n);
    return [a + s * g, l + u * g];
  };
  return {
    ...e,
    strokes: e.strokes.map((a) => {
      const l = a.pts.slice();
      for (let s = 0; s < l.length; s += 2) [l[s], l[s + 1]] = i(l[s], l[s + 1]);
      return { ...a, pts: l };
    }),
    dots: e.dots.map((a) => {
      const [l, s] = i(a.x, a.y);
      return { ...a, x: l, y: s };
    })
  };
}
const x2 = (e, t) => Math.min(1, Math.max(0, (0.8 * t - e) / (0.6 * t))), Pt = {
  move: 2,
  pull: 0.7,
  deform: 0.1,
  squash: 0.5,
  lens: 0.67,
  stretch: 1,
  split: 1,
  blur: 1,
  bounce: 1
};
function b2(e, t) {
  const r = Math.abs(e.move) + Math.abs(e.pull) + 2 * Math.abs(e.deform);
  return r === 0 ? 0 : Math.ceil(t * 0.36 * r) + 2;
}
class z2 {
  constructor() {
    this.x = 0, this.v = 0, this.landed = !1;
  }
  /**
   * How far the spring runs ahead of the press (+) or behind it (−). It
   * lags as the orb arrives, but only a rebound counts as behind: the orb
   * never backs off the edge before it has pressed into it.
   */
  step(t, r) {
    const n = Math.max(1, Math.ceil(r * 240)), o = r / n;
    for (let a = 0; a < n; a++)
      this.v += (15 * 15 * (t - this.x) - 2 * 0.3 * 15 * this.v) * o, this.x += this.v * o;
    const i = this.x - t;
    return t <= 0 ? this.landed = !1 : i >= 0 && (this.landed = !0), i < 0 && !this.landed ? 0 : i;
  }
}
function w2(e, t, r, n, o = [1 / 0, 1 / 0], i = 0) {
  if (Math.abs(t) < 2e-3 || n.move === 0 && n.pull === 0 && n.deform === 0) return e;
  const a = r / 2, l = r * 0.36, s = t < 0 ? -1 : 1, u = Math.abs(t), g = (T, X) => {
    const O = (T - a) / l, F = (X - a) / l, L = Math.max(0, Math.min(1, (O * s + 1) / 2)), S = Math.max(0, O * s);
    return t * l * (n.move + n.pull * L * L + n.deform * S * S * Math.exp(-F * F * 1.5));
  }, f = Math.max(0, Math.min(2, n.lens ?? 1)), d = l * 0.9, v = s > 0 ? o[1] : o[0], y = Number.isFinite(v) ? Math.min(d * 0.45, l * 0.3 * f * Math.max(0, n.stretch ?? 1)) : 0;
  let x = 1, w = 1 / 0, p = 1;
  if (Number.isFinite(v)) {
    w = s > 0 ? r + v : -v;
    const T = (X, O, F) => {
      p = Math.max(p, F);
      const L = g(X, O) * s;
      L > 1e-9 && (x = Math.min(x, Math.max(0, ((w - X) * s - F - y) / L)));
    };
    for (const X of e.dots) T(X.x, X.y, X.r);
    for (const X of e.strokes) for (let O = 0; O < X.pts.length; O += 2) T(X.pts[O], X.pts[O + 1], 1);
  }
  const c = x < 1 ? Math.min(1, (1 - x) / 0.35) : 0, m = c > 0 ? i * (n.bounce ?? 1) : 0, h = Math.min(1.4, c + Math.max(0, m)), b = l * 0.12 * Math.max(0, -m), z = w - s * p, k = z - s * y, $ = l * 0.55 * h * (n.squash ?? 0);
  let W = 1 / 0, M = -1 / 0, H = !0;
  const N = (T, X) => {
    const O = Math.max(0, Math.min(1, ((T - a) / l * s + 1) / 2)), F = 1 - 0.15 * n.deform * u * x * O;
    let L = T + g(T, X) * x + s * ($ * 0.5 - b), S = a + (X - a) * F;
    if ($ > 0) {
      const _ = (L - (k - s * $)) * s;
      if (_ > 0) {
        const E = _ / $, P = $ * (E / Math.sqrt(1 + E * E));
        L = k - s * $ + s * P, S = a + (S - a) * (1 + 0.18 * h * (n.squash ?? 0) * (P / $));
      }
    }
    return H && (k - L) * s < Math.max($, d * 0.3) && (W = Math.min(W, S), M = Math.max(M, S)), [L, S];
  };
  for (const T of e.dots)
    [T.x, T.y] = N(T.x, T.y);
  for (const T of e.strokes)
    for (let X = 0; X < T.pts.length; X += 2) {
      const [O, F] = N(T.pts[X], T.pts[X + 1]);
      T.pts[X] = O, T.pts[X + 1] = F;
    }
  if (c > 0 && M > W) {
    const T = f * h;
    e.contact = {
      side: s,
      x: z,
      y0: W,
      y1: M,
      depth: $,
      press: c,
      lens: T > 0.02 ? {
        zone: d,
        // drawn across the gap as it presses, all the way at full press
        gap: y * Math.min(1, h),
        flare: 0.22 * T * Math.max(0, n.stretch ?? 1),
        split: d * 0.1 * T * Math.max(0, n.split ?? 1),
        blur: d * 0.075 * T * Math.max(0, n.blur ?? 1),
        cy: a
      } : void 0
    };
  }
  if (H = !1, e.light) {
    const T = e.light;
    [T.cx, T.cy] = N(T.cx, T.cy);
    for (const X of T.spec) [X.x, X.y] = N(X.x, X.y);
  }
  return e;
}
const ct = Math.PI * 2;
function zr(e, t, r) {
  return e + (t - e) * r;
}
function ae(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function bo(e, t, r) {
  const n = ae((r - e) / (t - e));
  return n * n * (3 - 2 * n);
}
const Do = (e) => e < 1e-6 ? 1 : Math.sin(e) / e, $2 = Math.hypot(2.1, 1.3), k2 = Math.hypot(1.9, 1.7), S2 = Math.hypot(4.3 - 2.9, -3.7, -3.1), M2 = Math.hypot(4.3 + 2.9, 3.7, -3.1);
function Ts(e, t, r, n = 1) {
  const o = 1 / Math.max(0.05, n), i = 0.9 * r, a = -0.7 * r + 1.3, l = 2.1 * r, s = -1.6 * r, u = e * (0.55 * Math.sin(i) * Do($2 * o) + 0.45 * Math.sin(a) * Do(k2 * o)) + t * 0.5 * (Math.cos(l - s) * Do(S2 * o) - Math.cos(l + s) * Do(M2 * o));
  return (g, f, d) => (g *= o, f *= o, d *= o, e * (0.55 * Math.sin(2.1 * g + 1.3 * f + i) + 0.45 * Math.sin(1.7 * d - 1.9 * f + a)) + t * Math.sin(4.3 * g - 3.1 * d + l) * Math.sin(3.7 * f + 2.9 * g + s) - u);
}
function pr(e, t) {
  const r = Math.sin(e * 12.9898 + t * 78.233) * 43758.5453;
  return r - Math.floor(r);
}
function Gt(e, t, r) {
  const n = Math.sin(e * 127.1 + t * 311.7 + r * 74.7) * 43758.5453;
  return n - Math.floor(n);
}
function po(e, t, r) {
  const n = Math.floor(e), o = Math.floor(t), i = Math.floor(r);
  let a = e - n, l = t - o, s = r - i;
  a = a * a * (3 - 2 * a), l = l * l * (3 - 2 * l), s = s * s * (3 - 2 * s);
  const u = zr(Gt(n, o, i), Gt(n + 1, o, i), a), g = zr(Gt(n, o + 1, i), Gt(n + 1, o + 1, i), a), f = zr(Gt(n, o, i + 1), Gt(n + 1, o, i + 1), a), d = zr(Gt(n, o + 1, i + 1), Gt(n + 1, o + 1, i + 1), a);
  return zr(zr(u, g, l), zr(f, d, l), s);
}
function Ns(e, t) {
  const r = Math.PI * (3 - Math.sqrt(5)), n = 1 - 2 * (e + 0.5) / t, o = Math.sqrt(1 - n * n), i = e * r;
  return [o * Math.cos(i), n, o * Math.sin(i)];
}
function Qi(e, t, r, n, o) {
  const i = Math.sin(t), a = Math.cos(t), l = Math.sin(e), s = Math.cos(e);
  return (u, g, f) => {
    const d = u * s + f * l, v = -u * l + f * s, y = g * a - v * i, x = g * i + v * a;
    return [r + d * o, n - y * o, x];
  };
}
function zn(e, t = 0.6) {
  return (e / 200) ** t;
}
function wn(e, t, r = 0.3) {
  const n = [];
  for (const o of e)
    (o.a ?? 1) < 0.02 || (o.r = Math.max(r, o.r), n.push(o));
  return n.sort((o, i) => o.z - i.z), { dots: n, strokes: t };
}
const Ao = 32;
function E2(e, t = 0, r = 0, n = 1) {
  const o = e.r / 255, i = e.g / 255, a = e.b / 255, l = Math.max(o, i, a), s = Math.min(o, i, a);
  let u = (l + s) / 2, g = l === s ? 0 : (l - s) / (1 - Math.abs(2 * u - 1)), f = 0;
  if (l !== s) {
    const x = l - s;
    f = l === o ? (i - a) / x % 6 : l === i ? (a - o) / x + 2 : (o - i) / x + 4, f *= 60;
  }
  f = ((f + t) % 360 + 360) % 360, g = Math.min(1, g * (1 + r)), u = 0.5 + (u - 0.5) * (1 - 0.6 * r), u = Math.max(0, Math.min(1, u * n));
  const d = (x) => (x + f / 30) % 12, v = g * Math.min(u, 1 - u), y = (x) => u - v * Math.max(-1, Math.min(d(x) - 3, 9 - d(x), 1));
  return [Math.round(y(0) * 255), Math.round(y(8) * 255), Math.round(y(4) * 255)];
}
function C2(e) {
  const t = Math.max(0, Math.min(1, e.saturation)), r = Math.max(0, Math.min(1, e.neutral)), n = e.start ?? 0.1, o = Math.max(0.05, e.width ?? 0.6), i = [];
  for (let f = 0; f < Ao; f++) {
    const d = f / (Ao - 1), v = Math.max(0, Math.min(1, (d - n) / o)), y = v * v * (3 - 2 * v);
    i.push(t * (1 - r * (1 - y)));
  }
  const a = e.angle * Math.PI / 180, l = Math.cos(a), s = Math.sin(a), u = e.size / 2, g = e.size * 0.8;
  return {
    rgb: E2(e.accent, e.hue, Math.max(0, Math.min(1, e.vivid ?? 0)), e.brightness),
    mix: i,
    saturation: t,
    at: (f, d) => {
      const v = ((f - u) * l + (d - u) * s) / g + 0.5;
      return Math.max(0, Math.min(Ao - 1, Math.round(v * (Ao - 1))));
    }
  };
}
const _2 = [120, 232, 214], W2 = [64, 72, 255];
function n0(e, t, r) {
  e /= 255, t /= 255, r /= 255;
  const n = Math.max(e, t, r), o = Math.min(e, t, r), i = (n + o) / 2;
  if (n === o) return [0, 0, i];
  const a = n - o, l = i > 0.5 ? a / (2 - n - o) : a / (n + o);
  return [(n === e ? (t - r) / a + (t < r ? 6 : 0) : n === t ? (r - e) / a + 2 : (e - t) / a + 4) / 6, l, i];
}
function P2(e, t, r) {
  const n = (a) => (a + e * 12) % 12, o = t * Math.min(r, 1 - r), i = (a) => r - o * Math.max(-1, Math.min(n(a) - 3, 9 - n(a), 1));
  return [i(0) * 255, i(8) * 255, i(4) * 255];
}
const _a = (e) => (e /= 255) <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4, H2 = (e) => 255 * (e <= 31308e-7 ? 12.92 * e : 1.055 * Math.max(0, e) ** (1 / 2.4) - 0.055);
function Wi(e, t, r) {
  const [n, o, i] = [_a(e), _a(t), _a(r)], a = Math.cbrt(0.4122214708 * n + 0.5363325363 * o + 0.0514459929 * i), l = Math.cbrt(0.2119034982 * n + 0.6806995451 * o + 0.1073969566 * i), s = Math.cbrt(0.0883024619 * n + 0.2817188376 * o + 0.6299787005 * i);
  return [
    0.2104542553 * a + 0.793617785 * l - 0.0040720468 * s,
    1.9779984951 * a - 2.428592205 * l + 0.4505937099 * s,
    0.0259040371 * a + 0.7827717662 * l - 0.808675766 * s
  ];
}
function Ls(e, t, r) {
  const n = (e + 0.3963377774 * t + 0.2158037573 * r) ** 3, o = (e - 0.1055613458 * t - 0.0638541728 * r) ** 3, i = (e - 0.0894841775 * t - 1.291485548 * r) ** 3, a = (l) => Math.max(0, Math.min(255, H2(l)));
  return [
    a(4.0767416621 * n - 3.3077115913 * o + 0.2309699292 * i),
    a(-1.2684380046 * n + 2.6097574011 * o - 0.3413193965 * i),
    a(-0.0041960863 * n - 0.7034186147 * o + 1.707614701 * i)
  ];
}
const T2 = 146 / 360, N2 = [81, 136], o0 = 0.1;
function L2(e, t = N2) {
  const r = (t[0] + t[1]) / 720, n = (t[1] - t[0]) / 720, o = Math.abs((e - T2 + 1.5) % 1 - 0.5), i = Math.max(0, 1 - o / (40 / 360));
  return [e + (r - e) * i, o0 + (n - o0) * i];
}
function R2(e, t, r, n, o) {
  const i = n && n.amount > 5e-3 ? n : void 0;
  return e.map(([a, l, s, u]) => {
    if (r && (l += (r.r - l) * 0.85, s += (r.g - s) * 0.85, u += (r.b - u) * 0.85), i) {
      const [, f, d] = n0(l, s, u), [v, y] = L2(n0(i.r, i.g, i.b)[0], o), x = P2((v + y * Math.sin(2 * Math.PI * a) + 1) % 1, f, d), w = Wi(l, s, u), p = Wi(x[0], x[1], x[2]), c = i.amount;
      [l, s, u] = Ls(w[0] + (p[0] - w[0]) * c, w[1] + (p[1] - w[1]) * c, w[2] + (p[2] - w[2]) * c);
    }
    const g = t ? 1 : 0.82;
    return [a, l * g, s * g, u * g];
  });
}
function X2(e, t) {
  if (!t.hue && t.chroma === 1 && !t.warmth && t.contrast === 1) return e;
  const r = e.map(([, a, l, s]) => Wi(a, l, s)), n = r.reduce((a, [l]) => a + l, 0) / r.length, o = Math.cos(t.hue * Math.PI / 180), i = Math.sin(t.hue * Math.PI / 180);
  return e.map(([a], l) => {
    const [s, u, g] = r[l], f = Math.max(0, Math.min(1, n + (s - n) * t.contrast)), d = (u * o - g * i) * t.chroma + 0.02 * t.warmth, v = (u * i + g * o) * t.chroma + 0.07 * t.warmth;
    return [a, ...Ls(f, d, v)];
  });
}
function F2(e, t) {
  if (t <= 1) return e;
  const r = [];
  for (let n = 0; n < t; n++) for (const [o, i, a, l] of e) r.push([(o + n) / t, i, a, l]);
  return r;
}
const Wa = {
  hue: 0,
  chroma: 1,
  warmth: 0,
  contrast: 1,
  cycles: 1,
  glowSize: 1,
  bloom: 1,
  bloomSize: 1,
  soft: 1.5,
  core: 1
}, Hf = (e, t, r) => `rgb(${Math.round(e)},${Math.round(t)},${Math.round(r)})`;
function Y2(e, t = 36) {
  const r = e.filter(([u]) => u < 1), n = r.length;
  if (n < 3) return e;
  const o = r.map(([, u, g, f]) => Wi(u, g, f)), i = (u) => (u % n + n) % n, a = (u) => r[i(u)][0] + Math.floor(u / n), l = (u) => {
    const g = a(u + 1) - a(u - 1);
    return o[i(u + 1)].map((f, d) => (f - o[i(u - 1)][d]) / g);
  }, s = [];
  for (let u = 0; u <= t; u++) {
    const g = u / t;
    let f = -1;
    for (; f < n - 1 && a(f + 1) <= g; ) f++;
    const d = a(f + 1) - a(f), v = (g - a(f)) / d, y = v * v, x = y * v, w = o[i(f)], p = o[i(f + 1)], c = l(f), m = l(f + 1), h = [0, 1, 2].map(
      ($) => (2 * x - 3 * y + 1) * w[$] + (x - 2 * y + v) * d * c[$] + (-2 * x + 3 * y) * p[$] + (x - y) * d * m[$]
    ), [b, z, k] = Ls(h[0], h[1], h[2]);
    s.push([g, b, z, k]);
  }
  return s;
}
const Tf = typeof CanvasRenderingContext2D == "function" && "filter" in CanvasRenderingContext2D.prototype, i0 = /* @__PURE__ */ new WeakMap();
function Pa(e, t) {
  return (typeof OffscreenCanvas == "function" ? new OffscreenCanvas(e, t) : Object.assign(document.createElement("canvas"), { width: e, height: t })).getContext("2d");
}
function O2(e) {
  const { width: t, height: r } = e.canvas;
  let n = i0.get(e);
  return (!n || n.full.canvas.width !== t || n.full.canvas.height !== r) && (n = { full: Pa(t, r) }, Tf || (n.half = Pa(Math.ceil(t / 2), Math.ceil(r / 2)), n.quarter = Pa(Math.ceil(t / 4), Math.ceil(r / 4))), i0.set(e, n)), n.full.setTransform(1, 0, 0, 1, 0, 0), n.full.clearRect(0, 0, t, r), n.full.setTransform(e.getTransform()), n;
}
function Ha(e, t) {
  e.globalCompositeOperation = "copy", e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high", e.drawImage(t.canvas, 0, 0, e.canvas.width, e.canvas.height);
}
function I2(e, t, r, n) {
  const o = e.getTransform();
  e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.globalCompositeOperation = r, e.globalAlpha = 1, e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high", Tf || n <= 0 ? (n > 0 && (e.filter = `blur(${n * Math.hypot(o.a, o.b)}px)`), e.drawImage(t.full.canvas, 0, 0)) : t.half && t.quarter && (Ha(t.half, t.full), Ha(t.quarter, t.half), Ha(t.half, t.quarter), e.drawImage(t.half.canvas, 0, 0, t.half.canvas.width * 2, t.half.canvas.height * 2)), e.restore();
}
function a0(e, t, r) {
  const n = typeof e.createConicGradient == "function" ? e.createConicGradient(t.angle, t.cx, t.cy) : e.createLinearGradient(t.cx - t.r, t.cy - t.r, t.cx + t.r, t.cy + t.r);
  for (const [o, i, a, l] of r) n.addColorStop(ae(o), Hf(i, a, l));
  return n;
}
function D2(e, t, r, n, o, i) {
  var a;
  const l = { ...Wa };
  for (const h of Object.keys(Wa)) l[h] = ((a = r.look) == null ? void 0 : a[h]) ?? Wa[h];
  const s = F2(Y2(R2(X2(r.stops, l), n, o, i, r.green)), Math.round(l.cycles)), u = a0(e, r, s), g = t.strokes.map((h) => {
    const b = new Path2D(), z = h.pts.length >> 1;
    let k = 0;
    for (let $ = 0; $ < z; $++)
      $ === 0 ? b.moveTo(h.pts[0], h.pts[1]) : b.lineTo(h.pts[2 * $], h.pts[2 * $ + 1]), k += h.a[$];
    return h.closed && b.closePath(), { p: b, a: z ? k / z : 1, w: h.w };
  }), f = Math.max(1, g.length), d = r.intensity, v = n ? "lighter" : "source-over", y = (h, b, z = e) => {
    for (const k of g)
      z.lineWidth = h(k.w), z.globalAlpha = ae(b(k.a)), z.stroke(k.p);
  }, x = (h, b) => {
    h.lineCap = "round", h.lineJoin = "round", h.globalCompositeOperation = v, h.strokeStyle = b;
  }, w = O2(e), p = w.full;
  x(p, a0(p, r, s));
  const c = r.halo * d * (n ? 1 : 0.2) / f;
  for (const [h, b] of [
    [0.7, 0.045],
    [0.42, 0.075],
    [0.24, 0.11],
    [0.12, 0.16]
  ])
    y(
      () => r.r * h * l.glowSize,
      () => b * c,
      p
    );
  const m = d * (n ? 1 : 0.6) * l.bloom;
  for (const [h, b] of [
    [16, 0.05],
    [8, 0.11],
    [4, 0.2]
  ])
    y(
      (z) => z * h * l.bloomSize,
      (z) => b * m * z,
      p
    );
  if (I2(e, w, v, l.soft), e.save(), x(e, u), n && r.fringe > 0) {
    for (const [h, b, z] of [
      [1 + r.fringe, _2, 0.16],
      [1 - r.fringe, W2, 0.22]
    ])
      e.save(), e.translate(r.cx, r.cy), e.scale(h, h), e.translate(-r.cx, -r.cy), e.strokeStyle = Hf(b[0], b[1], b[2]), y(
        (k) => k * 1.4 / h,
        (k) => z * d * k
      ), e.restore();
    e.strokeStyle = u;
  }
  if (y(
    (h) => h,
    (h) => 0.7 * h * (0.75 + 0.25 * d) * l.core
  ), n)
    for (const h of r.spec) {
      const b = e.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
      b.addColorStop(0, "rgba(255,255,255,1)"), b.addColorStop(0.35, "rgba(255,255,255,0.45)"), b.addColorStop(1, "rgba(255,255,255,0)"), e.strokeStyle = b, y(
        (z) => z * 2.2,
        (z) => h.a * z
      );
    }
  e.restore();
}
const l0 = 6;
function A2(e, t) {
  const r = [
    [Pr.positive, e.positiveBrightness ?? 1],
    [Pr.negative, e.negativeBrightness ?? 1],
    [Pr.calm, e.calmBrightness ?? 1]
  ];
  let n = 0, o = 0;
  for (const [i, a] of r) {
    const l = Math.exp(-((t.r - i.r) ** 2 + (t.g - i.g) ** 2 + (t.b - i.b) ** 2) / 6e3);
    n += l * a, o += l;
  }
  return o > 1e-6 ? n / o : 1;
}
function Ta(e, t, r, n, o, i = 1) {
  const a = t ? 255 * (0.16 + 0.84 * e) : 255 * (0.1 + 0.6 * (1 - e));
  let l = a, s = a, u = a;
  if (n) {
    const f = (d) => t ? d * a / 255 : d + (255 - d) * (a / 255) * 0.7;
    l += (f(n.r) - l) * 0.85, s += (f(n.g) - s) * 0.85, u += (f(n.b) - u) * 0.85;
  }
  if (o) {
    const f = (r.colorBrightness ?? 1) * A2(r, o), d = (x) => t ? Math.min(255, x * (0.3 + 0.9 * e) * f + 90 * e ** 4) : Math.min(255, x * (0.45 + 0.55 * (1 - e)) * f), v = o.amount * i;
    l += (d(o.r) - l) * v, s += (d(o.g) - s) * v, u += (d(o.b) - u) * v;
    const y = r.saturation ?? 1;
    if (y !== 1) {
      const x = (l + s + u) / 3;
      l = x + (l - x) * y, s = x + (s - x) * y, u = x + (u - x) * y;
    }
  }
  const g = (f) => Math.round(Math.max(0, Math.min(255, f)));
  return `rgb(${g(l)},${g(s)},${g(u)})`;
}
function j2(e, t, r, n, o, i) {
  var a;
  const l = (w, p) => ae(0.5 + (w.a[p] - 0.5) * r.contrast), s = [];
  for (const w of t) {
    const p = w.pts.length >> 1, c = w.closed ? p : p - 1;
    for (let m = 0; m < c; m += l0) {
      const h = Math.min(c, m + l0);
      let b = 0;
      for (let k = m; k <= h; k++) b += ((a = w.z) == null ? void 0 : a[k % p]) ?? 0;
      const z = w.closed ? m - 1 : Math.max(0, m - 1);
      s.push({ s: w, from: z, to: h, z: b / (h - m + 1) });
    }
  }
  s.sort((w, p) => w.z - p.z);
  const u = i && i.amount > 5e-3 ? i : void 0;
  let g = 0, f = 0, d = 0;
  if (u) {
    for (const w of t)
      for (let p = 0; p < w.pts.length; p += 2)
        g += w.pts[p], f += w.pts[p + 1], d++;
    g /= d || 1, f /= d || 1;
  }
  const v = ((r.gradientAngle ?? 0) + (r.gradientSpin ?? 20) * (i?.t ?? 0)) * Math.PI / 180, y = ae(r.gradient ?? 1), x = (w, p) => {
    if (!u) return 1;
    const c = (Math.sin(Math.atan2(w.pts[2 * p + 1] - f, w.pts[2 * p] - g) + v) + 1) / 2;
    return 1 - y * (1 - bo(0, 1, c));
  };
  e.save(), e.lineCap = "butt", e.lineJoin = "round";
  for (const { s: w, from: p, to: c, z: m } of s) {
    const h = w.pts.length >> 1, b = (L) => (L % h + h) % h, z = new Path2D();
    for (let L = p; L <= c; L++) {
      const S = b(L);
      L === p ? z.moveTo(w.pts[2 * S], w.pts[2 * S + 1]) : z.lineTo(w.pts[2 * S], w.pts[2 * S + 1]);
    }
    const k = b(p), $ = b(c), W = r.depth ?? 0.15, M = w.w * (1 - W + W * m);
    e.globalCompositeOperation = "destination-out", e.strokeStyle = "#000", e.lineWidth = M * 1.35, e.stroke(z), e.globalCompositeOperation = "source-over";
    const H = w.pts[2 * k], N = w.pts[2 * k + 1], T = w.pts[2 * $], X = w.pts[2 * $ + 1];
    if (Math.hypot(T - H, X - N) > 0.5) {
      const L = e.createLinearGradient(H, N, T, X);
      L.addColorStop(0, Ta(l(w, k), n, r, o, u, x(w, k))), L.addColorStop(1, Ta(l(w, $), n, r, o, u, x(w, $))), e.strokeStyle = L;
    } else e.strokeStyle = Ta(l(w, k), n, r, o, u, x(w, k));
    e.lineWidth = M, e.stroke(z);
    let O = 0;
    for (let L = p; L <= c; L++) O += l(w, b(L));
    O /= c - p + 1;
    const F = ae(r.shine * (n ? 0.6 : 0.45) * O * O);
    F > 0.01 && (e.save(), e.translate(-0.17 * M, -0.19 * M), e.strokeStyle = `rgba(255,255,255,${F.toFixed(3)})`, e.lineWidth = M * 0.32, e.stroke(z), e.restore());
  }
  e.restore();
}
const B2 = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x + 1.0, 1.0 - aPos.y) * 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`, U2 = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uSize;
uniform float uWall, uSide, uZone, uGap, uFlare, uSplit, uBlur, uCy;
varying vec2 vUv;
const int TAPS = 16;
vec4 tap(vec2 p) { return texture2D(uTex, p / uSize); }
void main() {
  vec2 p = vUv * uSize;
  // 0 a zone back from the edge … 1 at it and past it
  float t = clamp(1.0 - (uWall - p.x) * uSide / uZone, 0.0, 1.0);
  if (t <= 0.0) { gl_FragColor = tap(p); return; }
  float w = t * t;
  // drawn out across the gap toward the edge, and opened a little taller
  float d = (uWall - p.x) * uSide + uGap * w;
  vec2 s = vec2(uWall - uSide * d, uCy + (p.y - uCy) / (1.0 + uFlare * w));
  // dispersion: red bent further out than blue, along the stretch and the flare
  vec2 split = vec2(uSide, 0.6 * (p.y - uCy) / uZone) * uSplit * w;
  // the blur grows toward the edge, drawn out along the stretch
  float b = uBlur * w;
  vec3 rgb = vec3(0.0);
  float a = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float f = float(i);
    float r = sqrt((f + 0.5) / float(TAPS)) * b;
    vec2 o = vec2(cos(f * 2.39996) * 1.8, sin(f * 2.39996)) * r;
    vec4 cr = tap(s + o + split);
    vec4 cg = tap(s + o);
    vec4 cb = tap(s + o - split);
    rgb += vec3(cr.r, cg.g, cb.b);
    a += max(cg.a, max(cr.a, cb.a));
  }
  gl_FragColor = vec4(rgb, a) / float(TAPS);
}`;
let jo;
function V2() {
  if (typeof document > "u") return null;
  const e = document.createElement("canvas"), t = e.getContext("webgl", { premultipliedAlpha: !0, antialias: !1, depth: !1 });
  if (!t) return null;
  const r = (s, u) => {
    const g = t.createShader(s);
    return t.shaderSource(g, u), t.compileShader(g), g;
  }, n = t.createProgram();
  if (t.attachShader(n, r(t.VERTEX_SHADER, B2)), t.attachShader(n, r(t.FRAGMENT_SHADER, U2)), t.linkProgram(n), !t.getProgramParameter(n, t.LINK_STATUS)) return null;
  t.useProgram(n);
  const o = t.createBuffer();
  t.bindBuffer(t.ARRAY_BUFFER, o), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
  const i = t.getAttribLocation(n, "aPos");
  t.enableVertexAttribArray(i), t.vertexAttribPointer(i, 2, t.FLOAT, !1, 0, 0);
  const a = t.createTexture();
  t.bindTexture(t.TEXTURE_2D, a), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
  const l = {};
  for (const s of ["uSize", "uWall", "uSide", "uZone", "uGap", "uFlare", "uSplit", "uBlur", "uCy"])
    l[s] = t.getUniformLocation(n, s);
  return { gl: t, canvas: e, source: document.createElement("canvas"), tex: a, u: l };
}
function Q2(e, t, r, n) {
  if (jo === void 0 && (jo = V2()), !jo) return !1;
  const { gl: o, canvas: i, source: a, tex: l, u: s } = jo, u = e.getTransform(), g = Math.hypot(u.a, u.b) || 1, f = e.canvas.width, d = e.canvas.height, v = u.a * r + u.e, y = n.zone * g, x = n.blur * g, w = Math.max(0, Math.floor(t > 0 ? v - y - 2 * x - 4 : 0)), p = Math.min(f, Math.ceil(t > 0 ? f : v + y + 2 * x + 4)) - w;
  if (p < 2 || d < 2) return !1;
  (a.width !== p || a.height !== d) && (a.width = p, a.height = d);
  const c = a.getContext("2d");
  return c.clearRect(0, 0, p, d), c.drawImage(e.canvas, w, 0, p, d, 0, 0, p, d), (i.width !== p || i.height !== d) && (i.width = p, i.height = d), o.viewport(0, 0, p, d), o.bindTexture(o.TEXTURE_2D, l), o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, a), o.uniform2f(s.uSize, p, d), o.uniform1f(s.uWall, v - w), o.uniform1f(s.uSide, t), o.uniform1f(s.uZone, y), o.uniform1f(s.uGap, n.gap * g), o.uniform1f(s.uFlare, n.flare), o.uniform1f(s.uSplit, n.split * g), o.uniform1f(s.uBlur, x), o.uniform1f(s.uCy, u.d * n.cy + u.f), o.clearColor(0, 0, 0, 0), o.clear(o.COLOR_BUFFER_BIT), o.drawArrays(o.TRIANGLE_STRIP, 0, 4), e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.globalCompositeOperation = "copy", e.beginPath(), e.rect(w, 0, p, d), e.clip(), e.drawImage(i, w, 0), e.restore(), !0;
}
function Nf(e, t, r, n) {
  const o = 2.2 / n.size, i = po(e * o + n.t * 0.11, t * o - n.t * 0.08, n.t * 0.07), a = bo(0.3, 0.75, i);
  return n.amount * (0.2 + 0.75 * a) * ae(1.3 - r);
}
function Lf(e, t, r, n, o, i = 0, a, l = 0) {
  const s = Math.round(t * 1e3) / 1e3, u = (y) => r ? y * (1 - e) : y + (255 - y) * e, g = (r ? 1 - e : e) * 255;
  let f = n ? u(n.r) : g, d = n ? u(n.g) : g, v = n ? u(n.b) : g;
  return a && l > 0 && (f += (u(a[0]) - f) * l, d += (u(a[1]) - d) * l, v += (u(a[2]) - v) * l), o && i > 0 && (f += (u(o.r) - f) * i, d += (u(o.g) - d) * i, v += (u(o.b) - v) * i), `rgba(${Math.round(f)},${Math.round(d)},${Math.round(v)},${s})`;
}
const s0 = 24, u0 = 8;
function q2(e, t, r, n, o, i) {
  const a = o && o.amount > 5e-3 ? o : void 0, l = i && i.saturation > 0 ? i : void 0, s = /* @__PURE__ */ new Map();
  for (const u of t) {
    const g = u.pts.length >> 1, f = u.closed ? g : g - 1;
    let d = "", v;
    for (let y = 0; y < f; y++) {
      const x = y + 1 === g ? 0 : y + 1, w = Math.round(ae((u.a[y] + u.a[x]) / 2) * s0);
      if (w === 0) {
        d = "";
        continue;
      }
      const p = a ? Math.round(
        Nf((u.pts[2 * y] + u.pts[2 * x]) / 2, (u.pts[2 * y + 1] + u.pts[2 * x + 1]) / 2, u.white, a) * u0
      ) : 0, c = l ? l.at((u.pts[2 * y] + u.pts[2 * x]) / 2, (u.pts[2 * y + 1] + u.pts[2 * x + 1]) / 2) : 0, m = `${w}|${u.white}|${Math.round(u.w * 20)}|${p}|${c}`;
      if (m !== d) {
        let h = s.get(m);
        h || (h = { path: new Path2D(), white: u.white, w: u.w, a: w / s0, gw: p / u0, ci: c }, s.set(m, h)), v = h, d = m, h.path.moveTo(u.pts[2 * y], u.pts[2 * y + 1]);
      }
      v.path.lineTo(u.pts[2 * x], u.pts[2 * x + 1]);
    }
  }
  e.lineCap = "round", e.lineJoin = "round";
  for (const u of s.values())
    e.strokeStyle = Lf(ae(u.white), u.a, r, n, a, u.gw, l?.rgb, l?.mix[u.ci]), e.lineWidth = u.w, e.stroke(u.path);
}
function G2(e, t, r, n, o, i, a = !1) {
  const l = o && o.amount > 5e-3 ? o : void 0, s = i && i.saturation > 0 ? i : void 0;
  for (const u of t) {
    const g = ae(u.white), f = l ? Nf(u.x, u.y, g, l) : 0, d = s ? s.at(u.x, u.y) : 0;
    if (e.fillStyle = Lf(g, ae(u.a ?? 1), r, n, l, f, s?.rgb, s?.mix[d]), a) {
      e.fillRect(u.x - u.r, u.y - u.r, 2 * u.r, 2 * u.r);
      continue;
    }
    e.beginPath(), e.arc(u.x, u.y, u.r, 0, ct), e.fill();
  }
}
function K2(e, t, r, n, o, i) {
  var a;
  const l = i && i.saturation > 0 && !t.light ? C2(i) : void 0;
  t.light ? D2(e, t, t.light, r, n, o) : t.tube ? j2(e, t.strokes, t.tube, r, n, o) : t.strokes.length && q2(e, t.strokes, r, n, o, l), G2(e, t.dots, r, n, o, l, t.square), (a = t.contact) != null && a.lens && Q2(e, t.contact.side, t.contact.x, t.contact.lens);
}
const Z2 = [
  [0, 255, 150, 90],
  [0.12, 255, 110, 120],
  [0.24, 255, 80, 170],
  [0.4, 190, 80, 255],
  [0.58, 90, 92, 255],
  [0.74, 60, 132, 255],
  // violet warms through magenta into the gold at the top, so the gold
  // fades in rather than meeting the violet at an edge
  [0.84, 170, 90, 255],
  [0.93, 240, 104, 165],
  [1, 255, 150, 90]
], J2 = (e, t, r, n) => {
  const o = e / 2, i = r.level, [a, l] = r.softBands, s = r.bands[2], u = r.drive, g = r.processing, f = 0.5 * i + 0.5 * r.soft, d = o * (n.radius ?? 0.56) * (1 + (n.zoom ?? 0.17) * r.soft) * (1 - 0.06 * g), v = n.deform ?? 1.45, y = 0.02 + (0.14 * a + 0.06 * i) * v, x = 0.01 + (0.07 * l + 0.03 * s) * v, w = Ts(y, x, u, n.deformRadius ?? 1.75), p = Math.max(0.6, (n.lineW ?? 1.85) * zn(e, 0.5)), c = Math.max(1, Math.round(n.rings ?? 6)), m = Math.max(24, Math.round(n.segs ?? 140)), h = n.lean ?? 0.91, b = n.ringGap ?? 0.02, z = [];
  let k = 0, $ = 0;
  for (let F = 0; F < c; F++) {
    const L = 0.16 * (0.5 + pr(F, 2.1)) * (F % 2 ? 1 : -1), S = Math.max(
      0.02,
      h * (0.2 + 0.8 * pr(F, 3.1)) + 0.03 * Math.sin(t * 0.27 + F * 1.3) + 0.08 * Math.sin(u * 0.35 + F * 1.7)
    ), _ = pr(F, 7.7) * ct + t * 0.05 * (F % 2 ? 1 : -1) + u * L, E = Math.sin(S) * Math.cos(_), P = Math.sin(S) * Math.sin(_), Y = Math.cos(S), D = Math.hypot(E, Y), I = Y / D, U = -E / D, G = P * U, ee = Y * I - E * U, ue = -P * I, ce = d * (1 + b * (F - (c - 1) / 2)), pe = Math.sin(S), Le = [], _e = [], A = [];
    for (let K = 0; K < m; K++) {
      const Z = K / m * ct, ve = Math.cos(Z), we = Math.sin(Z), de = I * ve + G * we, ye = ee * we, $e = U * ve + ue * we, We = w(de, ye, $e);
      Le.push(de, ye), _e.push(We), k += We, $++, A.push(0.62 + 0.38 * ae(($e / pe + 1) / 2));
    }
    z.push({ dirs: Le, f: _e, a: A, rk: ce });
  }
  const W = $ ? k / $ : 0;
  let M = 0, H = 0;
  for (const { dirs: F, f: L } of z)
    for (let S = 0; S < L.length; S++) {
      const _ = F[2 * S], E = F[2 * S + 1], P = Math.hypot(_, E) || 1;
      M += (L[S] - W) * (_ / P), H += (L[S] - W) * (E / P);
    }
  M = $ ? 2 * M / $ : 0, H = $ ? 2 * H / $ : 0;
  const N = z.map(({ dirs: F, f: L, a: S, rk: _ }) => {
    const E = [];
    for (let P = 0; P < L.length; P++) {
      const Y = F[2 * P], D = F[2 * P + 1], I = Math.hypot(Y, D) || 1, U = _ * (1 + L[P] - W - M * (Y / I) - H * (D / I));
      E.push(o + Y * U, o - D * U);
    }
    return { pts: E, a: S, white: 0, w: p, closed: !0 };
  }), T = 2.3 + 0.25 * Math.sin(t * 0.21) + 2 * r.spin, X = n.colorDrift ?? 1, O = {
    cx: o,
    cy: o,
    r: d,
    stops: Z2,
    // warm at the top, cool below, swaying rather than turning — the
    // spectrum flows with the voice but keeps its sense of up; processing
    // spins it all the way round
    angle: -Math.PI / 2 - 0.35 + (n.colorTurn ?? 0) * Math.PI / 180 + X * (0.5 * Math.sin(t * 0.07) + 0.4 * Math.sin(u * 0.2)) + r.spin,
    // processing lights the ring up: brighter bloom and a bigger halo
    intensity: (0.62 + 0.55 * f + 0.5 * g) * (n.brightness ?? 0.78),
    halo: (n.halo ?? 0.5) * (1 + 0.6 * g),
    spec: [
      {
        x: o + Math.cos(T) * d,
        y: o + Math.sin(T) * d,
        r: d * (0.5 + 0.25 * g) * (n.highlightSize ?? 1),
        a: (0.5 + 0.35 * f + 0.4 * g) * (n.highlight ?? 1.4)
      }
    ],
    fringe: (0.016 + 0.012 * f) * (n.fringe ?? 1),
    green: [n.greenFrom ?? 81, n.greenTo ?? 136],
    look: {
      hue: n.hue,
      chroma: n.chroma,
      warmth: n.warmth,
      contrast: n.contrast,
      cycles: n.colorCycles,
      glowSize: n.glowSize,
      // a fainter, wider, softer bloom than the painter's own
      bloom: n.bloom ?? 0.55,
      bloomSize: n.bloomSize ?? 1.4,
      soft: n.softness ?? 3.7,
      core: n.core
    }
  };
  return { ...wn([], N), light: O };
}, Rf = -0.45, Xf = 0.55, Ff = 0.7, eg = Math.hypot(Rf, Xf, Ff), tg = (e, t, r, n) => {
  const o = e / 2, i = r.processing, a = r.soft, l = r.softBands[1], s = o * (n.radius ?? 0.44) * (1 + (n.zoom ?? 0.08) * a) * (1 - 0.06 * i), u = n.deform ?? 1.85, g = Math.max(1, Math.round(n.rings ?? 2)), f = Math.max(48, Math.round(n.segs ?? 180)), d = Math.max(0.5, (n.lineW ?? 1.7) * zn(e, 0.6)), v = (n.tilt ?? 0.22) + (n.open ?? 0.75) * a, y = ae(n.restBend ?? 0.12), x = y + (1 - y) * ae(a * u), w = (n.twist ?? 1.69) * x, p = (n.wobble ?? 0.31) * x, c = r.drive * (n.pace ?? 2.1), m = 1 / Math.max(0.02, n.persp ?? 0), h = 1 - bo(0.1, 0.5, a), b = (n.idleSway ?? 0.18) * h, z = (n.idleDeform ?? 0.05) * h, k = (n.idleDrift ?? 0.03) * h, $ = o + s * k * Math.sin(0.9 * t + 0.6), W = o + s * k * Math.sin(0.7 * t + 2.1), M = [];
  for (let H = 0; H < g; H++) {
    const N = H * 2.399, T = v * (1 + 0.25 * Math.sin(0.17 * c + N)) + b * Math.sin(1.3 * t + 1.3 * N), X = H * ct / g + 0.23 * c * (H % 2 ? -1 : 1) + 0.4 * Math.sin(0.11 * c + N) + r.spin, O = Math.sin(T) * Math.cos(X), F = Math.sin(T) * Math.sin(X), L = Math.cos(T), S = Math.hypot(O, L) || 1, _ = L / S, E = -O / S, P = F * E, Y = L * _ - O * E, D = -F * _, I = 0.2 * w * Math.sin(0.29 * c + 1.3 + N), U = 0.37 * c + N, G = 0.07 * w * Math.sin(0.23 * c + 0.4 + N), ee = -0.31 * c + 2.1 + N, ue = 0.07 * p * Math.sin(0.33 * c + 0.4 + N), ce = 0.41 * c + N, pe = 0.04 * p * Math.sin(0.27 * c + 1 + N), Le = -0.35 * c + 0.8 + N, _e = 0.04 * u * l, A = 0.5 * c + N, K = z * Math.sin(1.1 * t + 0.7 + N), Z = 0.7 * t + N, ve = 0.6 * z * Math.sin(1.5 * t + 1.9 + N), we = -0.5 * t + N, de = 1 - (n.ringGap ?? 0.035) * H, ye = [], $e = [], We = [];
    for (let me = 0; me < f; me++) {
      const te = me / f * ct, qe = Math.cos(te), $t = Math.sin(te), At = de * (1 + ue * Math.cos(2 * te + ce) + pe * Math.cos(3 * te + Le) + _e * Math.cos(4 * te + A) + K * Math.cos(2 * te + Z) + ve * Math.cos(3 * te + we)), kt = de * (I * Math.sin(2 * te + U) + G * Math.sin(3 * te + ee));
      ye.push((_ * qe + P * $t) * At + O * kt), $e.push(Y * $t * At + F * kt), We.push((E * qe + D * $t) * At + L * kt);
    }
    const nt = [], xe = [], Qe = [];
    for (let me = 0; me < f; me++) {
      const te = m / (m - We[me]);
      nt.push($ + ye[me] * s * te, W - $e[me] * s * te);
      const qe = (me + 1) % f, $t = (me + f - 1) % f, At = ye[qe] - ye[$t], kt = $e[qe] - $e[$t], Ir = We[qe] - We[$t], Ge = Math.hypot(At, kt, Ir) || 1, St = (At * Rf + kt * Xf + Ir * Ff) / (Ge * eg), Dr = Math.sqrt(Math.max(0, 1 - St * St)), Ar = ae((We[me] + 1) / 2);
      xe.push(ae(0.12 + 0.6 * Dr * (0.55 + 0.45 * Ar) + 0.28 * Ar + 0.08 * a)), Qe.push(Ar * 2 - 1);
    }
    M.push({ pts: nt, a: xe, z: Qe, white: 0, w: d, closed: !0 });
  }
  return {
    dots: [],
    strokes: M,
    tube: {
      shine: n.shine ?? 1,
      // one even grey all round: the highlight alone gives it its roundness
      contrast: n.contrast ?? 0,
      depth: n.depthWidth ?? 0,
      // an emotion's colour as deep as it goes, a touch dark, fading most
      // of the way into the grey on one side of the orb, the fade holding
      // still; green a shade darker than the others
      saturation: n.colorSaturation ?? 2,
      gradient: n.colorGradient ?? 0.69,
      gradientAngle: n.gradientAngle ?? 0,
      gradientSpin: n.gradientSpin ?? 0,
      colorBrightness: n.colorBrightness ?? 0.9,
      positiveBrightness: n.positiveBrightness ?? 0.93,
      negativeBrightness: n.negativeBrightness ?? 1,
      calmBrightness: n.calmBrightness ?? 1
    }
  };
}, Yf = -0.45, Of = 0.55, If = 0.7, rg = Math.hypot(Yf, Of, If), ng = (e, t, r, n) => {
  const o = e / 2, i = r.level, [a, l, s] = r.bands, u = r.drive, g = r.processing, f = o * (n.radius ?? 0.72), d = f * (1 + (n.zoom ?? 0.3) * i) * (1 - 0.06 * g), v = n.rMul ?? 1, y = Math.max(4, Math.round(n.cells ?? 17)), x = 2 * f / y, w = x / 2 - Math.max(0.5, x * (n.gap ?? 0.24) / 2), p = Math.ceil(d * 1.25 / x), c = (n.turn ?? 0.12) * t + 0.1 * u + 0.5 * r.spin, m = Math.sin(c), h = Math.cos(c), b = Math.sin(0.35), z = Math.cos(0.35), k = n.shade ?? 0.7, $ = n.texture ?? 0.35, W = n.fade ?? 1.3, M = n.strength ?? 1.38, H = n.deform ?? 1.7, N = 0.012 + (0.09 * a + 0.03 * i) * H, T = (0.035 * l + 0.025 * s) * H, X = (_) => N * (0.55 * Math.sin(2 * _ + 0.9 * u) + 0.45 * Math.sin(3 * _ - 0.7 * u + 1.3)) + T * Math.sin(7 * _ + 2.3 * u) * Math.sin(5 * _ - 1.7 * u), O = 0.95 * Math.sin(t * 1.3), F = r.spectrum, L = F.length, S = [];
  for (let _ = -p; _ <= p; _++)
    for (let E = -p; E <= p; E++) {
      const P = o + E * x, Y = o + _ * x, D = (P - o) / d, I = -(Y - o) / d, U = X(Math.atan2(I, D)), G = Math.hypot(D, I) / (1 + U);
      if (G >= 1) continue;
      const ee = 1 / (1 + U), ue = D * ee, ce = I * ee, pe = Math.sqrt(Math.max(0, 1 - ue * ue - ce * ce)), Le = ae((ue * Yf + ce * Of + pe * If) / rg), _e = 1 - k + k * Le, A = ce * z + pe * b, K = -ce * b + pe * z, Z = ue * h - K * m, ve = ue * m + K * h, we = 0.65 * po(Z * 2.2 + u * 0.15, A * 2.2, ve * 2.2 - u * 0.1) + 0.35 * po(Z * 4.6 - u * 0.2, A * 4.6 + 7.3, ve * 4.6), de = 1 - $ + $ * bo(0.32, 0.68, we), ye = L ? F[Math.min(L - 1, Math.floor(G * L))] : i, $e = 0.35 * i + 0.85 * ye, We = Math.exp(-((ce - O) ** 2) / 0.01) * g, nt = 1 - 0.4 * W * (1 - pe), xe = (0.35 + 0.75 * _e * de + 0.3 * $e + 0.2 * We) * nt * v, Qe = 0.22 + 0.62 * _e * de + 0.22 * $e + 0.3 * We;
      S.push({
        x: P,
        y: Y,
        z: pe * d,
        r: w * Math.min(1, xe),
        white: ae(1 - Qe * M),
        a: ae((1 - 0.75 * W * (1 - Math.sqrt(pe))) * M)
      });
    }
  return { ...wn(S, [], n.rMin ?? 0.4), square: !0 };
}, og = (e, t, r, n) => {
  const o = e / 2, i = e / 2, a = 0.5 * r.level + 0.5 * r.soft, l = (1 + (n.swell ?? 0.49) * a) * (1 - 0.14 * r.processing), s = e / 2 * (n.radius ?? 0.56), u = n.persp ?? 0.25, g = Qi(t * 0.12 + r.drive * 0.03, 0.3, 0, 0, 1), f = zn(e, n.rsPow ?? 0.9) * (n.rMul ?? 1), d = [], v = n.orbitN ?? 12, y = n.particles ?? 6;
  for (let x = 0; x < v; x++) {
    const w = pr(x, 1.7), p = pr(x, 5.2), c = pr(x, 8.9), m = s * (0.45 + 0.52 * w), h = w * ct, b = Math.acos(2 * p - 1), z = Math.sin(b) * Math.cos(h), k = Math.cos(b), $ = Math.sin(b) * Math.sin(h);
    let W = -k, M = z;
    const H = Math.max(1e-6, Math.sqrt(W * W + M * M));
    W /= H, M /= H;
    const N = -$ * M, T = $ * W, X = z * M - k * W, O = (0.25 + 0.55 * c) * (c > 0.5 ? 1 : -1);
    for (let F = 0; F < y; F++) {
      const L = r.drive * O + F / y * ct + p * 6, S = Math.cos(L), _ = Math.sin(L), [E, P, Y] = g((W * S + N * _) * m, (M * S + T * _) * m, X * _ * m), D = ae((Y / s + 1) / 2), I = l / (1 - u * Y / s);
      d.push({
        x: o + E * I,
        y: i + P * I,
        z: Y,
        r: ((n.partR ?? 0.47) + (n.partRDepth ?? 0.65) * D) * f * I,
        white: 0.32 - 0.24 * D
      });
    }
  }
  return wn(d, [], n.rMin);
}, ig = (e, t, r, n) => {
  const o = e / 2, i = e / 2, a = r.soft, [l, s] = r.softBands, u = e / 2 * (n.radius ?? 0.66) * (1 + (n.zoom ?? 0.21) * r.level), g = r.drive, f = n.deform ?? 1, d = n.wave ?? 1, v = 0.015 + (0.1 * l + 0.05 * r.level) * f, y = 0.04 * s * f, x = Ts(v, y, g), w = 0.55 + 0.05 * Math.sin(t * 0.37), p = Math.cos(w), c = Math.sin(w);
  let m = 0;
  for (let E = 0; E < 48; E++) {
    const P = E / 48 * ct;
    m += x(Math.cos(P), Math.sin(P) * p, Math.sin(P) * c);
  }
  m /= 48;
  const h = (E, P, Y) => 1 + x(E, P, Y) - m, b = Qi(0, 0.3, o, i, 1), z = zn(e, n.rsPow ?? 0.6) * (n.rMul ?? 1), k = r.drive, $ = [], W = n.ghostN ?? 60;
  for (let E = 0; E < W; E++) {
    const P = Ns(E, W), Y = u * h(P[0], P[1], P[2]), [D, I, U] = b(P[0] * Y, P[1] * Y, P[2] * Y), G = (U / u + 1) / 2;
    $.push({ x: D, y: I, z: U, r: 0.65 * z, white: 0.78, a: 0.1 + 0.22 * G });
  }
  const M = -c, H = p, N = Math.max(1, Math.round(n.lanes ?? 10)), T = Math.max(8, Math.round(n.segs ?? 56)), X = r.processing, O = (n.laneGap ?? 0.062) * (1 + 0.25 * a) * (1 - 0.4 * X), F = k * 1.6, L = 0.15 * (0.55 + 0.9 * l * d) * (1 - 0.6 * X), S = 0.06 * (0.5 + 1.2 * s * d), _ = 0.05 + 0.05 * a;
  for (let E = 0; E < N; E++) {
    const P = (E - (N - 1) / 2) * O, Y = Math.abs(E - (N - 1) / 2) / Math.max(1, (N - 1) / 2);
    for (let D = 0; D < T; D++) {
      const I = D / T * ct, U = L * Math.sin(I * 3 - k * 0.95 + E * 0.18) + S * Math.sin(I * 5 + k * 0.6) + _ * Math.sin(I * 2 + t * 0.31 + Math.sin(t * 0.17) * 1.5), G = P + U, ee = Math.cos(I), ue = Math.sin(I), ce = ee, pe = ue * p + M * G, Le = ue * c + H * G, _e = Math.sqrt(ce * ce + pe * pe + Le * Le), A = u * h(ce / _e, pe / _e, Le / _e) / _e, [K, Z, ve] = b(ce * A, pe * A, Le * A), we = (ve / u + 1) / 2, de = Math.max(0, U) * a, ye = Math.atan2(Math.sin(I - F), Math.cos(I - F)), $e = Math.exp(-(ye * ye) / 0.18) * X;
      $.push({
        x: K,
        y: Z,
        z: ve,
        r: ((n.rBase ?? 0.49) + (n.rDepth ?? 0.78) * we) * (1 - 0.25 * Y) * (1 + 1.2 * de + 0.5 * $e) * z,
        white: 0.52 - 0.44 * we + 0.18 * Y - 0.3 * $e,
        a: 0.4 + 0.6 * we
      });
    }
  }
  return wn($, [], n.rMin);
}, ag = (e, t, r, n) => {
  const o = e / 2, i = r.level, [a, l] = r.softBands, s = r.bands[2], u = r.drive, g = o * (n.radius ?? 0.6) * (1 + (n.zoom ?? 0.06) * r.soft) * (1 - 0.08 * r.processing), f = Qi((n.yaw ?? 0.42) + 0.08 * Math.sin(t * 0.23), n.tilt ?? 0.32, o, o, 1), d = Math.max(0.4, (n.lineW ?? 0.6) * zn(e, 0.5)), v = (z) => 0.06 + 0.94 * ae((z / g + 1) / 2) ** 2, y = n.deform ?? 1, x = 0.02 + (0.14 * a + 0.06 * i) * y, w = 0.01 + (0.07 * l + 0.03 * s) * y, p = Ts(x, w, u), c = [], m = Math.max(24, Math.round(n.segs ?? 96)), h = Math.max(0, Math.round(n.limbs ?? 2));
  for (let z = 0; z < h; z++) {
    const k = 0.1 + 0.05 * Math.sin(t * 0.31 + z * 2.1), $ = t * 0.17 * (z % 2 ? 1 : -1) + z * 2.4, W = Math.sin(k) * Math.cos($), M = Math.sin(k) * Math.sin($), H = Math.cos(k), N = Math.hypot(W, H), T = H / N, X = -W / N, O = M * X, F = H * T - W * X, L = -M * T, S = [], _ = [];
    for (let E = 0; E < m; E++) {
      const P = E / m * ct, Y = T * Math.cos(P) + O * Math.sin(P), D = F * Math.sin(P), I = X * Math.cos(P) + L * Math.sin(P), U = g * (1 + 6e-3 * z + p(Y, D, I));
      S.push(o + Y * U, o - D * U), _.push(0.55 + 0.35 * ae((I / Math.sin(k) + 1) / 2));
    }
    c.push({ pts: S, a: _, white: 0, w: d, closed: !0 });
  }
  const b = Math.max(2, Math.round(n.circles ?? 8));
  for (let z = 0; z < b; z++) {
    const [k, $, W] = Ns(z, b), M = u * 0.16 * (0.5 + pr(z, 2.1)) * (z % 2 ? 1 : -1) + pr(z, 6.6) * ct, H = $ * Math.cos(M) - W * Math.sin(M), N = $ * Math.sin(M) + W * Math.cos(M), T = Math.max(1e-6, Math.hypot(N, k)), X = N / T, O = -k / T, F = H * O, L = N * X - k * O, S = -H * X, _ = [], E = [];
    for (let P = 0; P < m; P++) {
      const Y = P / m * ct, D = X * Math.cos(Y) + F * Math.sin(Y), I = L * Math.sin(Y), U = O * Math.cos(Y) + S * Math.sin(Y), G = g * (1 + p(D, I, U)), [ee, ue, ce] = f(D * G, I * G, U * G);
      _.push(ee, ue), E.push(v(ce));
    }
    c.push({ pts: _, a: E, white: 0, w: d, closed: !0 });
  }
  return wn([], c, n.rMin);
}, lg = (e, t, r, n) => {
  const o = e / 2, i = r.level, [a, l, s] = r.bands, u = r.drive, g = r.processing, f = o * (n.radius ?? 0.6) * (1 + (n.zoom ?? 0.1) * i) * (1 - 0.08 * g), d = 0.95 * Math.sin(t * 1.3), v = Qi(t * 0.14, 0.32, o, o, 1), y = zn(e, n.rsPow ?? 0.6) * (n.rMul ?? 1), x = Math.max(40, Math.round(n.dotN ?? 900)), w = n.cloudFreq ?? 2.3, p = n.deform ?? 1, c = 0.018 + (0.12 * a + 0.04 * i) * p, m = (0.045 * l + 0.03 * s) * p, h = [], b = [];
  let z = 0;
  for (let $ = 0; $ < x; $++) {
    const W = Ns($, x), [M, H, N] = W, T = 0.55 * Math.sin(2.1 * M + 1.3 * H + 0.9 * u) + 0.45 * Math.sin(1.7 * N - 1.9 * H - 0.7 * u + 1.3), X = Math.sin(5.3 * M - 4.1 * N + 2.3 * u) * Math.sin(4.7 * H + 3.1 * M - 1.7 * u), O = c * T + m * X;
    h.push(W), b.push(O), z += O / x;
  }
  const k = [];
  for (let $ = 0; $ < x; $++) {
    const [W, M, H] = h[$], N = b[$] - z, T = f * (1 + N), [X, O, F] = v(W * T, M * T, H * T), L = ae((F / f + 1) / 2), S = 0.65 * po(W * w + u * 0.21, M * w - u * 0.15, H * w + u * 0.1) + 0.35 * po(W * w * 2.1 - u * 0.29, M * w * 2.1 + 7.3, H * w * 2.1 + u * 0.24), _ = bo(0.34, 0.68, S), E = Math.exp(-((M - d) ** 2) / 0.012) * g, P = Math.max(0, N) / 0.16;
    k.push({
      x: X,
      y: O,
      z: F,
      r: ((n.rBase ?? 0.27) + (n.rDepth ?? 0.84) * L) * (0.22 + 0.95 * _ + 0.6 * E) * (1 + 0.5 * P) * y,
      white: 0.62 - 0.52 * L - 0.16 * _ - 0.3 * E,
      a: 0.3 + 0.7 * L
    });
  }
  return wn(k, [], n.rMin ?? 0.25);
}, sg = {
  orbit: og,
  sash: ig,
  signal: ag,
  swell: lg,
  pixel: ng,
  "aura-mono": tg,
  aura: J2
}, it = {
  orbit: {
    speed: 1.05,
    driveGain: 0.12,
    opts: { orbitN: 12, particles: 6 },
    counts: {}
  },
  sash: {
    speed: 1.5,
    driveGain: 0.8,
    gain: 1.1,
    opts: { lanes: 10, segs: 56, ghostN: 60 },
    counts: { segs: 0.45, ghostN: 0.8 }
  },
  signal: {
    speed: 1.6,
    driveGain: 2,
    opts: { circles: 8, segs: 96 },
    counts: { circles: 0.5, segs: 0.5 }
  },
  swell: {
    speed: 1.4,
    driveGain: 2.4,
    opts: { dotN: 900 },
    counts: { dotN: 1 }
  },
  pixel: {
    speed: 1.2,
    driveGain: 1.6,
    attack: 0.16,
    dotSize: 0.55,
    opts: { cells: 17 },
    counts: { cells: 0.5 }
  },
  "aura-mono": {
    speed: 1.2,
    // a voice spins it up a long way: waiting it drifts, speaking it turns
    // and morphs quickly
    driveGain: 4,
    // leans like the aura, the near side drawn out, but drifts further and
    // meets the edge with no lens
    lean: { move: 0.55, pull: 0.36, deform: 0.28, squash: 0, bounce: 0.92, lens: 0, stretch: 0, split: 0, blur: 1.24 },
    opts: { segs: 180 },
    counts: { segs: 0.5 }
  },
  aura: {
    speed: 1.6,
    driveGain: 2,
    voiceSpeed: 0.9,
    // barely drifts toward the voice: it leans, its near side drawn out and
    // bulging a touch; light meets the edge through a soft lens rather than
    // squashing on it
    lean: { move: 0.21, pull: 0.36, deform: 0.28, squash: 0, bounce: 0.92, lens: 0.49, stretch: 1.04, split: 1.01, blur: 1.24 },
    opts: { rings: 6, segs: 140 },
    counts: { segs: 0.5 }
  }
};
function ug(e, t, r = 1, n = 1) {
  const o = e in it ? e : "orbit", i = it[o], a = Math.min(1.4, Math.max(0.2, t / 200)) * Math.max(0.1, r), l = { ...i.opts };
  for (const [s, u] of Object.entries(i.counts)) {
    const g = l[s];
    g != null && (l[s] = Math.max(1, Math.round(g * a ** u)));
  }
  return n !== 1 && (l.rMul = Math.max(0.1, n)), { frame: sg[o], speed: i.speed, driveGain: i.driveGain, gain: i.gain ?? 1, opts: l };
}
function cg(e) {
  let t = e;
  for (; t; ) {
    const r = t.getAttribute("data-theme");
    if (r === "dark") return !0;
    if (r === "light") return !1;
    if (t.classList.contains("dark")) return !0;
    if (t.classList.contains("light")) return !1;
    t = t.parentElement;
  }
  return null;
}
function fg() {
  return typeof matchMedia > "u" || matchMedia("(prefers-color-scheme: dark)").matches;
}
function pg(e, t) {
  const [r, n] = B.useState(!0);
  return B.useEffect(() => {
    if (e === "dark") {
      n(!0);
      return;
    }
    if (e === "light") {
      n(!1);
      return;
    }
    const o = () => {
      const s = cg(t.current);
      n(s ?? fg());
    };
    o();
    const i = typeof matchMedia < "u" ? matchMedia("(prefers-color-scheme: dark)") : null, a = () => o();
    i?.addEventListener("change", a);
    let l = null;
    return typeof MutationObserver < "u" && t.current && (l = new MutationObserver(o), l.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-theme"],
      subtree: !0
    })), () => {
      i?.removeEventListener("change", a), l?.disconnect();
    };
  }, [e, t]), r;
}
function dg() {
  const [e, t] = B.useState(!1);
  return B.useEffect(() => {
    if (typeof matchMedia > "u") return;
    const r = matchMedia("(prefers-reduced-motion: reduce)");
    t(r.matches);
    const n = (o) => t(o.matches);
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
  }, []), e;
}
const Ht = 16, gg = 2.1, mg = 0.3, hg = 2.5, vg = 1.6, yg = 5, c0 = 2.2, f0 = [
  [80, 300],
  [300, 2e3],
  [2e3, 6e3]
], Na = 90, xg = 7e3, La = Math.PI * 2, Ra = 0.35, Xa = 0.9;
function Df(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Fa(e, t) {
  if (e <= t) return 0;
  const r = (e - t) / Math.max(1e-3, 1 - t);
  return Df((1 - Math.exp(-3 * r)) / (1 - Math.exp(-3)));
}
function wr(e, t, r, n, o) {
  const i = t > e ? n : o;
  return e + (t - e) * (1 - Math.exp(-r / Math.max(1e-3, i)));
}
class bg {
  constructor() {
    this.clock = 0, this.t = 0, this.drive = 0, this.level = 0, this.bands = [0, 0, 0], this.spectrum = new Float32Array(Ht), this.floor = new Float32Array(Ht + 3).fill(1), this.heard = 0, this.proc = 0, this.spin = 0, this.pan = 0, this.panVel = 0, this.raw = { level: 0, bands: [0, 0, 0], spectrum: new Float32Array(Ht) }, this.timeBuf = null, this.freqBuf = null, this.out = {
      level: 0,
      bands: [0, 0, 0],
      soft: 0,
      softBands: [0, 0, 0],
      spectrum: this.spectrum,
      drive: 0,
      processing: 0,
      spin: 0,
      pan: 0
    };
  }
  /** Read an analyser: RMS loudness, three voice bands and the spectrum. */
  readAnalyser(t, r, n) {
    (!this.timeBuf || this.timeBuf.length !== t.fftSize) && (this.timeBuf = new Float32Array(t.fftSize)), (!this.freqBuf || this.freqBuf.length !== t.frequencyBinCount) && (this.freqBuf = new Uint8Array(t.frequencyBinCount));
    const o = this.timeBuf, i = this.freqBuf;
    t.getFloatTimeDomainData(o);
    let a = 0;
    for (let f = 0; f < o.length; f++) a += o[f] * o[f];
    this.raw.level = Math.sqrt(a / o.length) * yg * r, t.getByteFrequencyData(i);
    const l = t.context.sampleRate / t.fftSize, s = (f, d) => {
      const v = Math.max(0, Math.floor(f / l)), y = Math.max(v, Math.min(i.length - 1, Math.ceil(d / l)));
      let x = 0;
      for (let w = v; w <= y; w++) x += i[w];
      return x / (y - v + 1) / 255;
    }, u = (f, d) => {
      const v = this.floor[f];
      return this.floor[f] = d < v ? d : v + (d - v) * (1 - Math.exp(-n / 8)), Math.max(0, d - this.floor[f]) / Math.max(0.05, 1 - this.floor[f]);
    };
    for (let f = 0; f < 3; f++)
      this.raw.bands[f] = u(f, s(f0[f][0], f0[f][1])) * c0 * r;
    const g = xg / Na;
    for (let f = 0; f < Ht; f++) {
      const d = Na * g ** (f / Ht), v = Na * g ** ((f + 1) / Ht);
      this.raw.spectrum[f] = u(3 + f, s(d, v)) * c0 * r;
    }
  }
  /**
   * Read a plain level. There is no spectrum behind it, so the bands and
   * slots are given a little independent life — slow, out-of-phase drifts
   * scaled by the level, with two formant-like humps wandering the
   * spectrum — so a level-driven orb still moves like a voice.
   */
  readLevel(t, r) {
    const n = Df(t) * r, o = this.clock;
    this.raw.level = n, this.raw.bands[0] = n, this.raw.bands[1] = n * (0.72 + 0.28 * Math.sin(o * 2.3)), this.raw.bands[2] = n * (0.6 + 0.4 * Math.sin(o * 3.7 + 2));
    const i = 0.28 + 0.1 * Math.sin(o * 2.3) + 0.05 * Math.sin(o * 5.1), a = 0.64 + 0.1 * Math.sin(o * 1.7 + 1);
    for (let l = 0; l < Ht; l++) {
      const s = l / (Ht - 1), u = Math.exp(-((s - i) ** 2) / 0.012) + 0.6 * Math.exp(-((s - a) ** 2) / 8e-3);
      this.raw.spectrum[l] = n * (0.25 + 0.75 * u) * (1 - 0.4 * s);
    }
  }
  /** Nothing to read: let every envelope settle. */
  readSilence() {
    this.raw.level = 0, this.raw.bands.fill(0), this.raw.spectrum.fill(0);
  }
  /** Advance by `dt` real seconds. `still` (reduced motion) holds the clocks. */
  step(t, r, n) {
    const { threshold: o, attack: i, release: a, rate: l } = r, s = this.proc = wr(this.proc, r.processing ? 1 : 0, t, 0.35, 0.5), u = r.calm + (1 - r.calm) * Math.min(1, Math.max(this.heard * 2.5, s));
    n || (this.clock += t, this.t += t * l * u * (1 + 0.5 * s));
    const g = Fa(this.raw.level, o);
    this.level = wr(this.level, g, t, i, a), this.heard = wr(this.heard, this.level, t, Ra, Xa);
    for (let c = 0; c < 3; c++)
      this.bands[c] = wr(this.bands[c], Fa(this.raw.bands[c], o * 0.6), t, i, a * 1.15);
    for (let c = 0; c < Ht; c++)
      this.spectrum[c] = wr(this.spectrum[c], Fa(this.raw.spectrum[c], o * 0.6), t, i, a);
    const f = this.clock, d = n ? 0.5 : 0.5 + 0.5 * Math.sin(La * f / 6), v = r.idle * d * (1 - s), y = this.out;
    y.level = this.level + (1 - this.level) * v;
    for (let c = 0; c < 3; c++) y.bands[c] = this.bands[c] + (1 - this.bands[c]) * v * 0.6;
    y.soft = wr(y.soft, y.level, t, Ra, Xa);
    for (let c = 0; c < 3; c++) y.softBands[c] = wr(y.softBands[c], y.bands[c], t, Ra, Xa);
    if (n || (this.drive += t * l * (u + r.driveGain * this.level + 1.3 * s)), y.drive = this.drive, y.processing = s, !n) {
      const c = Math.ceil(this.spin / La - 1e-6) * La, m = Math.min(mg, (c - this.spin) * 0.6);
      this.spin += t * (gg * l * s + m * (1 - s));
    }
    y.spin = this.spin;
    const x = Math.max(-1, Math.min(1, r.direction || 0)), w = this.heard > 0.06 && !r.processing ? x : 0, p = Math.abs(w) > Math.abs(this.pan) ? hg : vg;
    return this.panVel += (p * p * (w - this.pan) - 2 * p * this.panVel) * t, this.pan += this.panVel * t, y.pan = this.pan, y;
  }
}
function zg(e) {
  if (!e) return;
  const t = e.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (t) {
    let n = t[1];
    n.length === 3 && (n = n.replace(/./g, (i) => i + i));
    const o = parseInt(n, 16);
    return { r: o >> 16 & 255, g: o >> 8 & 255, b: o & 255 };
  }
  const r = e.trim().match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (r) return { r: Number(r[1]), g: Number(r[2]), b: Number(r[3]) };
}
const wg = {
  idle: "Waiting",
  listening: "Listening",
  speaking: "Speaking",
  processing: "Thinking"
}, $g = 0.55, kg = 1e3 / 62;
function Sg({
  type: e = "orbit",
  state: t = "listening",
  size: r = 160,
  stream: n,
  analyser: o,
  level: i,
  sensitivity: a = 0.85,
  threshold: l = 0.04,
  attack: s,
  release: u = 0.32,
  idle: g = 0.1,
  calm: f = 0.4,
  voiceSpeed: d,
  emotion: v = null,
  emotionColors: y,
  saturation: x = 2,
  accent: w = null,
  gradientAngle: p = 99,
  gradientSpin: c = 12,
  neutral: m = 1,
  colorBrightness: h = 1.02,
  colorHue: b = 0,
  gradientStart: z = 0.1,
  gradientWidth: k = 0.6,
  direction: $,
  directionMove: W,
  directionPull: M,
  directionDeform: H,
  directionSquash: N,
  directionLens: T,
  directionStretch: X,
  directionSplit: O,
  directionBlur: F,
  directionBounce: L,
  directionMargin: S,
  directionBounds: _,
  hoverBend: E = !1,
  theme: P = "auto",
  speed: Y = 1,
  paused: D = !1,
  color: I,
  dots: U = 1,
  dotSize: G,
  opts: ee,
  frame: ue,
  onLevel: ce,
  style: pe,
  "aria-label": Le,
  ..._e
}) {
  const A = B.useRef(null), K = pg(P, A), Z = dg(), ve = ee ? JSON.stringify(ee) : "", we = !!(n || o || i != null || t === "processing"), de = B.useRef(null);
  de.current || (de.current = new bg());
  const ye = B.useRef(null);
  ye.current || (ye.current = new v2());
  const $e = v ? y?.[v] ?? Pr[v] : null, We = {
    saturation: Math.min(1, x),
    vivid: Math.max(0, Math.min(1, x - 1)),
    brightness: h,
    hue: b,
    start: z,
    width: k,
    accent: w ? d2[w] : null,
    angle: p,
    spin: c,
    neutral: m,
    size: r
  }, nt = G ?? it[e in it ? e : "orbit"].dotSize ?? 1, xe = it[e in it ? e : "orbit"].lean ?? {}, Qe = S ?? it[e in it ? e : "orbit"].margin ?? 32, me = {
    state: t,
    level: i,
    analyser: o,
    sensitivity: a,
    threshold: l,
    attack: s ?? it[e in it ? e : "orbit"].attack ?? 0.06,
    release: u,
    idle: g,
    calm: f,
    voiceSpeed: d ?? it[e in it ? e : "orbit"].voiceSpeed ?? 1,
    onLevel: ce,
    emotionTint: $e,
    colors: We,
    direction: $,
    bounds: _,
    bend: E === !0 ? $g : typeof E == "number" ? Math.max(0, Math.min(1, E)) : 0,
    // each amount: the prop, else the type's own, else the shared default
    lean: {
      move: W ?? xe.move ?? Pt.move,
      pull: M ?? xe.pull ?? Pt.pull,
      deform: H ?? xe.deform ?? Pt.deform,
      squash: N ?? xe.squash ?? Pt.squash,
      lens: T ?? xe.lens ?? Pt.lens,
      stretch: X ?? xe.stretch ?? Pt.stretch,
      split: O ?? xe.split ?? Pt.split,
      blur: F ?? xe.blur ?? Pt.blur,
      bounce: L ?? xe.bounce ?? Pt.bounce
    }
  }, te = B.useRef(me);
  te.current = me;
  const qe = $ == null ? 0 : b2(me.lean, r), [$t, At] = B.useState([1 / 0, 1 / 0]), kt = Math.min(qe, $t[0]), Ir = Math.min(qe, $t[1]), Ge = qe ? kt + Qe : 0, St = qe ? Ir + Qe : 0, Dr = B.useRef({ x: 0, y: 0, over: !1 }), Ar = me.bend > 0 && !Z;
  B.useEffect(() => {
    const Ie = A.current;
    if (!Ar || !Ie || typeof matchMedia != "function" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const jt = (dt) => {
      if (dt.pointerType === "touch") return;
      const $n = Ie.getBoundingClientRect(), zo = (r + Ge + St) / ($n.width || 1);
      Dr.current = { x: (dt.clientX - $n.left) * zo - Ge, y: (dt.clientY - $n.top) * zo, over: !0 };
    }, yr = () => {
      Dr.current.over = !1;
    };
    return window.addEventListener("pointermove", jt, { passive: !0 }), document.documentElement.addEventListener("pointerleave", yr), () => {
      window.removeEventListener("pointermove", jt), document.documentElement.removeEventListener("pointerleave", yr), Dr.current.over = !1;
    };
  }, [Ar, r, Ge, St]);
  const qi = B.useRef(null);
  return B.useEffect(() => {
    if (!n) return;
    const Ie = p2(n);
    return qi.current = Ie?.analyser ?? null, () => {
      qi.current = null, Ie?.release();
    };
  }, [n]), B.useEffect(() => {
    const Ie = A.current;
    if (!Ie) return;
    const jt = Math.min(2, typeof devicePixelRatio < "u" && devicePixelRatio || 1);
    Ie.width = Math.round((r + Ge + St) * jt), Ie.height = Math.round(r * jt);
    const yr = Ie.getContext("2d");
    if (!yr) return;
    const dt = ug(e, r, U, nt), $n = ee ? { ...dt.opts, ...ee } : dt.opts, zo = ue ?? dt.frame, Vf = zg(I), Bt = de.current, Qf = ye.current, qf = new z2();
    let Xs = 0, kn = 0, Gi = r / 2, Ki = r / 2;
    const Gf = (Re, De, gt) => {
      var Q;
      yr.setTransform(jt, 0, 0, jt, Ge * jt, 0), yr.clearRect(-Ge, 0, r + Ge + St, r);
      const Ut = D || Z ? 0 : qf.step(Xs, gt);
      let ot = w2(zo(r, Bt.t, Re, $n), Re.pan, r, te.current.lean, [kt, Ir], Ut);
      Xs = ((Q = ot.contact) == null ? void 0 : Q.press) ?? 0;
      const xr = te.current.bend;
      if (xr > 0) {
        const Mn = Dr.current, As = Pf(ot, r), ep = te.current.state === "idle" || te.current.state === "processing", tp = Mn.over && ep && !D && !Z ? x2(Math.hypot(Mn.x - r / 2, Mn.y - r / 2) - As, As) : 0;
        kn += (tp - kn) * (1 - Math.exp(-gt / 0.14));
        const js = kn < 0.01 ? 1 : 1 - Math.exp(-gt / 0.05);
        Gi += (Mn.x - Gi) * js, Ki += (Mn.y - Ki) * js, kn > 2e-3 && (ot = y2(ot, r, { x: Gi, y: Ki, amount: kn * xr }));
      }
      const mt = te.current.colors, Vt = De.amount, Qt = mt.accent, Zf = Qt ? { r: Qt.r + (De.r - Qt.r) * Vt, g: Qt.g + (De.g - Qt.g) * Vt, b: Qt.b + (De.b - Qt.b) * Vt } : { r: De.r, g: De.g, b: De.b }, Jf = {
        ...mt,
        accent: Zf,
        saturation: mt.saturation * (Qt ? 1 : Vt),
        angle: mt.angle + mt.spin * Bt.clock
      };
      K2(yr, ot, K, Vf, ot.light || ot.tube ? De : void 0, Jf);
    };
    let Fs = -1 / 0;
    const Kf = (Re) => {
      var De, gt;
      if (!qe || Re - Fs < 500) return;
      Fs = Re;
      const Q = Ie.getBoundingClientRect().left + Ge, Ut = (gt = (De = te.current.bounds) == null ? void 0 : De.current) == null ? void 0 : gt.getBoundingClientRect(), ot = Ut ? Ut.left : 0, xr = Ut ? Ut.right : document.documentElement.clientWidth, mt = [
        Math.max(0, Math.floor(Q - ot - Qe)),
        Math.max(0, Math.floor(xr - Q - r - Qe))
      ];
      At((Vt) => Math.abs(Vt[0] - mt[0]) > 1 || Math.abs(Vt[1] - mt[1]) > 1 ? mt : Vt);
    };
    let wo = 0;
    const Ys = (Re) => {
      var De;
      Kf(Re);
      const gt = wo ? Math.min(0.05, (Re - wo) / 1e3) : 1 / 60;
      wo = Re;
      const Q = te.current, Ut = Q.state === "listening" || Q.state === "speaking", ot = qi.current ?? Q.analyser ?? null;
      Ut ? ot ? Bt.readAnalyser(ot, Q.sensitivity * dt.gain, gt) : Q.level != null ? Bt.readLevel(typeof Q.level == "function" ? Q.level() : Q.level, Q.sensitivity * dt.gain) : Bt.readSilence() : Bt.readSilence();
      const xr = Bt.step(
        gt,
        {
          sensitivity: Q.sensitivity,
          threshold: Q.threshold,
          attack: Q.attack,
          release: Q.release,
          idle: Q.idle,
          driveGain: dt.driveGain * Q.voiceSpeed,
          calm: Q.calm,
          rate: dt.speed * Y,
          processing: Q.state === "processing",
          direction: typeof Q.direction == "function" ? Q.direction() : Q.direction ?? 0
        },
        Z
      );
      (De = Q.onLevel) == null || De.call(Q, xr.level);
      const mt = Qf.step(gt, Q.emotionTint, Bt.clock, r, D || Z);
      Gf(xr, mt, gt);
    };
    if (Ys(performance.now()), D || Z && !we) return;
    let Zi = 0, $o = !1, Os = 0;
    const Is = (Re) => {
      $o && (Zi = requestAnimationFrame(Is), !(Re - Os < kg) && (Os = Re, Ys(Re)));
    }, Ji = () => {
      $o || ($o = !0, wo = 0, Zi = requestAnimationFrame(Is));
    }, ea = () => {
      $o = !1, cancelAnimationFrame(Zi);
    };
    let ta = !0;
    const Sn = typeof IntersectionObserver < "u" ? new IntersectionObserver(([Re]) => {
      ta = Re.isIntersecting, ta && document.visibilityState !== "hidden" ? Ji() : ea();
    }) : null;
    Sn?.observe(Ie);
    const Ds = () => {
      document.visibilityState === "hidden" ? ea() : ta && Ji();
    };
    return document.addEventListener("visibilitychange", Ds), Sn || Ji(), () => {
      ea(), Sn?.disconnect(), document.removeEventListener("visibilitychange", Ds);
    };
  }, [
    e,
    r,
    qe,
    kt,
    Ir,
    Ge,
    St,
    Qe,
    K,
    Y,
    D,
    Z,
    we,
    I,
    U,
    nt,
    ve,
    ue,
    D || Z ? v : null,
    D || Z ? `${x}|${w}|${p}|${c}|${m}|${h}|${b}|${z}|${k}` : null
  ]), /* @__PURE__ */ Sr.jsx(
    "canvas",
    {
      ref: A,
      role: "img",
      "aria-label": Le ?? wg[t],
      style: { width: r + Ge + St, height: r, display: "block", marginLeft: -Ge, marginRight: -St, ...pe },
      ..._e
    }
  );
}
const Mg = { ring: "aura", mono: "aura-mono" };
function Af({ type: e = "ring", ...t }) {
  return /* @__PURE__ */ Sr.jsx(Sg, { ...t, type: Mg[e] });
}
const Rs = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, Xr = /* @__PURE__ */ new Map(), Pi = (e) => Math.min(1, Math.max(0, Number(e) || 0));
let Hl, Tl = !1, Nl = null;
function jf() {
  return Pi(window.__kbOrbOutputLevel) > 0.035 ? "speaking" : Pi(window.__kbOrbInputLevel) > 0.025 ? "listening" : "idle";
}
function Bf() {
  return Math.max(Pi(window.__kbOrbInputLevel), Pi(window.__kbOrbOutputLevel));
}
function Eg(e) {
  if (e.classList.contains("voice-pill-expanded") || e.querySelector(":scope > .kb-libraries-border-beam-host")) return;
  const t = getComputedStyle(e).position === "static";
  t && e.classList.add("kb-libraries-border-beam-positioned");
  const r = document.createElement("div");
  r.className = "kb-libraries-border-beam-host", r.setAttribute("aria-hidden", "true"), e.prepend(r);
  const n = Math.max(12, parseFloat(getComputedStyle(e).borderTopLeftRadius) || 24), o = Ws(r);
  o.render(ni.createElement(u2, {
    size: "line",
    colorVariant: "ocean",
    theme: "dark",
    strength: 0.42,
    duration: 3.1,
    staticColors: !0,
    active: !Rs,
    borderRadius: n,
    className: "kb-libraries-border-beam",
    style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }
  }, ni.createElement("div", {
    "aria-hidden": !0,
    style: { width: "100%", height: "100%", borderRadius: `${n}px`, background: "transparent" }
  }))), Xr.set(r, { root: o, owner: e, type: "beam", positionedByLayer: t });
}
function Cg(e) {
  if (e.querySelector(":scope > .kb-libraries-voice-ring-host")) return;
  const t = document.createElement("span");
  t.className = "kb-libraries-voice-ring-host", t.setAttribute("aria-hidden", "true"), e.prepend(t);
  const r = Ws(t);
  let n = jf();
  r.render(ni.createElement(Af, {
    size: 60,
    state: n,
    level: Bf,
    theme: "dark",
    paused: Rs,
    sensitivity: 0.85
  })), Xr.set(t, { root: r, owner: e, type: "voice", currentState: n });
}
function _g() {
  const e = jf();
  for (const [t, r] of Xr)
    r.type !== "voice" || !t.isConnected || r.currentState === e || (r.currentState = e, r.root.render(ni.createElement(Af, {
      size: 60,
      state: e,
      level: Bf,
      theme: "dark",
      paused: Rs,
      sensitivity: 0.85
    })));
}
function Uf() {
  Tl = !1;
  for (const [e, t] of Xr)
    (!e.isConnected || !t.owner.isConnected) && (t.root.unmount(), t.positionedByLayer && t.owner.classList.remove("kb-libraries-border-beam-positioned"), Xr.delete(e));
  document.querySelectorAll(".input-bar:not(.voice-pill-expanded)").forEach(Eg), document.querySelectorAll(".voice-pill-trigger").forEach(Cg);
}
function Ll() {
  Tl || (Tl = !0, requestAnimationFrame(Uf));
}
function p0() {
  Uf(), Hl = new MutationObserver(Ll), Hl.observe(document.body, { childList: !0, subtree: !0 }), window.addEventListener("hashchange", Ll), Nl = window.setInterval(_g, 180);
}
function Wg() {
  Hl?.disconnect(), window.removeEventListener("hashchange", Ll), Nl !== null && window.clearInterval(Nl);
  for (const { root: e } of Xr.values()) e.unmount();
  Xr.clear();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", p0, { once: !0 }) : p0();
window.addEventListener("pagehide", Wg, { once: !0 });
