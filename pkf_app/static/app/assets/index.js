function Vb(a, l) {
  for (var r = 0; r < l.length; r++) {
    const u = l[r];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const c in u)
        if (c !== "default" && !(c in a)) {
          const f = Object.getOwnPropertyDescriptor(u, c);
          f &&
            Object.defineProperty(
              a,
              c,
              f.get ? f : { enumerable: !0, get: () => u[c] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) u(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === "childList")
        for (const h of f.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && u(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function u(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = r(c);
    fetch(c.href, f);
  }
})();
function Xb(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var tf = { exports: {} },
  br = {};
var Hg;
function Gb() {
  if (Hg) return br;
  Hg = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function r(u, c, f) {
    var h = null;
    if (
      (f !== void 0 && (h = "" + f),
      c.key !== void 0 && (h = "" + c.key),
      "key" in c)
    ) {
      f = {};
      for (var g in c) g !== "key" && (f[g] = c[g]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: a, type: u, key: h, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return ((br.Fragment = l), (br.jsx = r), (br.jsxs = r), br);
}
var kg;
function Qb() {
  return (kg || ((kg = 1), (tf.exports = Gb())), tf.exports);
}
var v = Qb(),
  af = { exports: {} },
  we = {};
var qg;
function Zb() {
  if (qg) return we;
  qg = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    u = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    g = Symbol.for("react.forward_ref"),
    y = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    w = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    M = Symbol.iterator;
  function U(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (M && C[M]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var V = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Q = Object.assign,
    X = {};
  function P(C, k, K) {
    ((this.props = C),
      (this.context = k),
      (this.refs = X),
      (this.updater = K || V));
  }
  ((P.prototype.isReactComponent = {}),
    (P.prototype.setState = function (C, k) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, C, k, "setState");
    }),
    (P.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    }));
  function ee() {}
  ee.prototype = P.prototype;
  function te(C, k, K) {
    ((this.props = C),
      (this.context = k),
      (this.refs = X),
      (this.updater = K || V));
  }
  var Te = (te.prototype = new ee());
  ((Te.constructor = te), Q(Te, P.prototype), (Te.isPureReactComponent = !0));
  var be = Array.isArray;
  function Se() {}
  var se = { H: null, A: null, T: null, S: null },
    R = Object.prototype.hasOwnProperty;
  function Ae(C, k, K) {
    var F = K.ref;
    return {
      $$typeof: a,
      type: C,
      key: k,
      ref: F !== void 0 ? F : null,
      props: K,
    };
  }
  function Le(C, k) {
    return Ae(C.type, k, C.props);
  }
  function Pe(C) {
    return typeof C == "object" && C !== null && C.$$typeof === a;
  }
  function ve(C) {
    var k = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (K) {
        return k[K];
      })
    );
  }
  var ut = /\/+/g;
  function Ue(C, k) {
    return typeof C == "object" && C !== null && C.key != null
      ? ve("" + C.key)
      : k.toString(36);
  }
  function ye(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (
          (typeof C.status == "string"
            ? C.then(Se, Se)
            : ((C.status = "pending"),
              C.then(
                function (k) {
                  C.status === "pending" &&
                    ((C.status = "fulfilled"), (C.value = k));
                },
                function (k) {
                  C.status === "pending" &&
                    ((C.status = "rejected"), (C.reason = k));
                },
              )),
          C.status)
        ) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function _(C, k, K, F, me) {
    var pe = typeof C;
    (pe === "undefined" || pe === "boolean") && (C = null);
    var Me = !1;
    if (C === null) Me = !0;
    else
      switch (pe) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case a:
            case l:
              Me = !0;
              break;
            case w:
              return ((Me = C._init), _(Me(C._payload), k, K, F, me));
          }
      }
    if (Me)
      return (
        (me = me(C)),
        (Me = F === "" ? "." + Ue(C, 0) : F),
        be(me)
          ? ((K = ""),
            Me != null && (K = Me.replace(ut, "$&/") + "/"),
            _(me, k, K, "", function (Fn) {
              return Fn;
            }))
          : me != null &&
            (Pe(me) &&
              (me = Le(
                me,
                K +
                  (me.key == null || (C && C.key === me.key)
                    ? ""
                    : ("" + me.key).replace(ut, "$&/") + "/") +
                  Me,
              )),
            k.push(me)),
        1
      );
    Me = 0;
    var vt = F === "" ? "." : F + ":";
    if (be(C))
      for (var We = 0; We < C.length; We++)
        ((F = C[We]), (pe = vt + Ue(F, We)), (Me += _(F, k, K, pe, me)));
    else if (((We = U(C)), typeof We == "function"))
      for (C = We.call(C), We = 0; !(F = C.next()).done; )
        ((F = F.value), (pe = vt + Ue(F, We++)), (Me += _(F, k, K, pe, me)));
    else if (pe === "object") {
      if (typeof C.then == "function") return _(ye(C), k, K, F, me);
      throw (
        (k = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (k === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : k) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return Me;
  }
  function Z(C, k, K) {
    if (C == null) return C;
    var F = [],
      me = 0;
    return (
      _(C, F, "", "", function (pe) {
        return k.call(K, pe, me++);
      }),
      F
    );
  }
  function le(C) {
    if (C._status === -1) {
      var k = C._result;
      ((k = k()),
        k.then(
          function (K) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = K));
          },
          function (K) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = K));
          },
        ),
        C._status === -1 && ((C._status = 0), (C._result = k)));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ie =
      typeof reportError == "function"
        ? reportError
        : function (C) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var k = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == "object" &&
                  C !== null &&
                  typeof C.message == "string"
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(k)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", C);
              return;
            }
            console.error(C);
          },
    Ee = {
      map: Z,
      forEach: function (C, k, K) {
        Z(
          C,
          function () {
            k.apply(this, arguments);
          },
          K,
        );
      },
      count: function (C) {
        var k = 0;
        return (
          Z(C, function () {
            k++;
          }),
          k
        );
      },
      toArray: function (C) {
        return (
          Z(C, function (k) {
            return k;
          }) || []
        );
      },
      only: function (C) {
        if (!Pe(C))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return C;
      },
    };
  return (
    (we.Activity = b),
    (we.Children = Ee),
    (we.Component = P),
    (we.Fragment = r),
    (we.Profiler = c),
    (we.PureComponent = te),
    (we.StrictMode = u),
    (we.Suspense = y),
    (we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = se),
    (we.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return se.H.useMemoCache(C);
      },
    }),
    (we.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (we.cacheSignal = function () {
      return null;
    }),
    (we.cloneElement = function (C, k, K) {
      if (C == null)
        throw Error(
          "The argument must be a React element, but you passed " + C + ".",
        );
      var F = Q({}, C.props),
        me = C.key;
      if (k != null)
        for (pe in (k.key !== void 0 && (me = "" + k.key), k))
          !R.call(k, pe) ||
            pe === "key" ||
            pe === "__self" ||
            pe === "__source" ||
            (pe === "ref" && k.ref === void 0) ||
            (F[pe] = k[pe]);
      var pe = arguments.length - 2;
      if (pe === 1) F.children = K;
      else if (1 < pe) {
        for (var Me = Array(pe), vt = 0; vt < pe; vt++)
          Me[vt] = arguments[vt + 2];
        F.children = Me;
      }
      return Ae(C.type, me, F);
    }),
    (we.createContext = function (C) {
      return (
        (C = {
          $$typeof: h,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: f, _context: C }),
        C
      );
    }),
    (we.createElement = function (C, k, K) {
      var F,
        me = {},
        pe = null;
      if (k != null)
        for (F in (k.key !== void 0 && (pe = "" + k.key), k))
          R.call(k, F) &&
            F !== "key" &&
            F !== "__self" &&
            F !== "__source" &&
            (me[F] = k[F]);
      var Me = arguments.length - 2;
      if (Me === 1) me.children = K;
      else if (1 < Me) {
        for (var vt = Array(Me), We = 0; We < Me; We++)
          vt[We] = arguments[We + 2];
        me.children = vt;
      }
      if (C && C.defaultProps)
        for (F in ((Me = C.defaultProps), Me))
          me[F] === void 0 && (me[F] = Me[F]);
      return Ae(C, pe, me);
    }),
    (we.createRef = function () {
      return { current: null };
    }),
    (we.forwardRef = function (C) {
      return { $$typeof: g, render: C };
    }),
    (we.isValidElement = Pe),
    (we.lazy = function (C) {
      return { $$typeof: w, _payload: { _status: -1, _result: C }, _init: le };
    }),
    (we.memo = function (C, k) {
      return { $$typeof: m, type: C, compare: k === void 0 ? null : k };
    }),
    (we.startTransition = function (C) {
      var k = se.T,
        K = {};
      se.T = K;
      try {
        var F = C(),
          me = se.S;
        (me !== null && me(K, F),
          typeof F == "object" &&
            F !== null &&
            typeof F.then == "function" &&
            F.then(Se, ie));
      } catch (pe) {
        ie(pe);
      } finally {
        (k !== null && K.types !== null && (k.types = K.types), (se.T = k));
      }
    }),
    (we.unstable_useCacheRefresh = function () {
      return se.H.useCacheRefresh();
    }),
    (we.use = function (C) {
      return se.H.use(C);
    }),
    (we.useActionState = function (C, k, K) {
      return se.H.useActionState(C, k, K);
    }),
    (we.useCallback = function (C, k) {
      return se.H.useCallback(C, k);
    }),
    (we.useContext = function (C) {
      return se.H.useContext(C);
    }),
    (we.useDebugValue = function () {}),
    (we.useDeferredValue = function (C, k) {
      return se.H.useDeferredValue(C, k);
    }),
    (we.useEffect = function (C, k) {
      return se.H.useEffect(C, k);
    }),
    (we.useEffectEvent = function (C) {
      return se.H.useEffectEvent(C);
    }),
    (we.useId = function () {
      return se.H.useId();
    }),
    (we.useImperativeHandle = function (C, k, K) {
      return se.H.useImperativeHandle(C, k, K);
    }),
    (we.useInsertionEffect = function (C, k) {
      return se.H.useInsertionEffect(C, k);
    }),
    (we.useLayoutEffect = function (C, k) {
      return se.H.useLayoutEffect(C, k);
    }),
    (we.useMemo = function (C, k) {
      return se.H.useMemo(C, k);
    }),
    (we.useOptimistic = function (C, k) {
      return se.H.useOptimistic(C, k);
    }),
    (we.useReducer = function (C, k, K) {
      return se.H.useReducer(C, k, K);
    }),
    (we.useRef = function (C) {
      return se.H.useRef(C);
    }),
    (we.useState = function (C) {
      return se.H.useState(C);
    }),
    (we.useSyncExternalStore = function (C, k, K) {
      return se.H.useSyncExternalStore(C, k, K);
    }),
    (we.useTransition = function () {
      return se.H.useTransition();
    }),
    (we.version = "19.2.4"),
    we
  );
}
var Yg;
function Af() {
  return (Yg || ((Yg = 1), (af.exports = Zb())), af.exports);
}
var E = Af();
const $b = Xb(E),
  Kb = Vb({ __proto__: null, default: $b }, [E]);
var nf = { exports: {} },
  wr = {},
  lf = { exports: {} },
  rf = {};
var Vg;
function Jb() {
  return (
    Vg ||
      ((Vg = 1),
      (function (a) {
        function l(_, Z) {
          var le = _.length;
          _.push(Z);
          e: for (; 0 < le; ) {
            var ie = (le - 1) >>> 1,
              Ee = _[ie];
            if (0 < c(Ee, Z)) ((_[ie] = Z), (_[le] = Ee), (le = ie));
            else break e;
          }
        }
        function r(_) {
          return _.length === 0 ? null : _[0];
        }
        function u(_) {
          if (_.length === 0) return null;
          var Z = _[0],
            le = _.pop();
          if (le !== Z) {
            _[0] = le;
            e: for (var ie = 0, Ee = _.length, C = Ee >>> 1; ie < C; ) {
              var k = 2 * (ie + 1) - 1,
                K = _[k],
                F = k + 1,
                me = _[F];
              if (0 > c(K, le))
                F < Ee && 0 > c(me, K)
                  ? ((_[ie] = me), (_[F] = le), (ie = F))
                  : ((_[ie] = K), (_[k] = le), (ie = k));
              else if (F < Ee && 0 > c(me, le))
                ((_[ie] = me), (_[F] = le), (ie = F));
              else break e;
            }
          }
          return Z;
        }
        function c(_, Z) {
          var le = _.sortIndex - Z.sortIndex;
          return le !== 0 ? le : _.id - Z.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          a.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            g = h.now();
          a.unstable_now = function () {
            return h.now() - g;
          };
        }
        var y = [],
          m = [],
          w = 1,
          b = null,
          M = 3,
          U = !1,
          V = !1,
          Q = !1,
          X = !1,
          P = typeof setTimeout == "function" ? setTimeout : null,
          ee = typeof clearTimeout == "function" ? clearTimeout : null,
          te = typeof setImmediate < "u" ? setImmediate : null;
        function Te(_) {
          for (var Z = r(m); Z !== null; ) {
            if (Z.callback === null) u(m);
            else if (Z.startTime <= _)
              (u(m), (Z.sortIndex = Z.expirationTime), l(y, Z));
            else break;
            Z = r(m);
          }
        }
        function be(_) {
          if (((Q = !1), Te(_), !V))
            if (r(y) !== null) ((V = !0), Se || ((Se = !0), ve()));
            else {
              var Z = r(m);
              Z !== null && ye(be, Z.startTime - _);
            }
        }
        var Se = !1,
          se = -1,
          R = 5,
          Ae = -1;
        function Le() {
          return X ? !0 : !(a.unstable_now() - Ae < R);
        }
        function Pe() {
          if (((X = !1), Se)) {
            var _ = a.unstable_now();
            Ae = _;
            var Z = !0;
            try {
              e: {
                ((V = !1), Q && ((Q = !1), ee(se), (se = -1)), (U = !0));
                var le = M;
                try {
                  t: {
                    for (
                      Te(_), b = r(y);
                      b !== null && !(b.expirationTime > _ && Le());
                    ) {
                      var ie = b.callback;
                      if (typeof ie == "function") {
                        ((b.callback = null), (M = b.priorityLevel));
                        var Ee = ie(b.expirationTime <= _);
                        if (((_ = a.unstable_now()), typeof Ee == "function")) {
                          ((b.callback = Ee), Te(_), (Z = !0));
                          break t;
                        }
                        (b === r(y) && u(y), Te(_));
                      } else u(y);
                      b = r(y);
                    }
                    if (b !== null) Z = !0;
                    else {
                      var C = r(m);
                      (C !== null && ye(be, C.startTime - _), (Z = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (M = le), (U = !1));
                }
                Z = void 0;
              }
            } finally {
              Z ? ve() : (Se = !1);
            }
          }
        }
        var ve;
        if (typeof te == "function")
          ve = function () {
            te(Pe);
          };
        else if (typeof MessageChannel < "u") {
          var ut = new MessageChannel(),
            Ue = ut.port2;
          ((ut.port1.onmessage = Pe),
            (ve = function () {
              Ue.postMessage(null);
            }));
        } else
          ve = function () {
            P(Pe, 0);
          };
        function ye(_, Z) {
          se = P(function () {
            _(a.unstable_now());
          }, Z);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (a.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (R = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return M;
          }),
          (a.unstable_next = function (_) {
            switch (M) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = M;
            }
            var le = M;
            M = Z;
            try {
              return _();
            } finally {
              M = le;
            }
          }),
          (a.unstable_requestPaint = function () {
            X = !0;
          }),
          (a.unstable_runWithPriority = function (_, Z) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var le = M;
            M = _;
            try {
              return Z();
            } finally {
              M = le;
            }
          }),
          (a.unstable_scheduleCallback = function (_, Z, le) {
            var ie = a.unstable_now();
            switch (
              (typeof le == "object" && le !== null
                ? ((le = le.delay),
                  (le = typeof le == "number" && 0 < le ? ie + le : ie))
                : (le = ie),
              _)
            ) {
              case 1:
                var Ee = -1;
                break;
              case 2:
                Ee = 250;
                break;
              case 5:
                Ee = 1073741823;
                break;
              case 4:
                Ee = 1e4;
                break;
              default:
                Ee = 5e3;
            }
            return (
              (Ee = le + Ee),
              (_ = {
                id: w++,
                callback: Z,
                priorityLevel: _,
                startTime: le,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              le > ie
                ? ((_.sortIndex = le),
                  l(m, _),
                  r(y) === null &&
                    _ === r(m) &&
                    (Q ? (ee(se), (se = -1)) : (Q = !0), ye(be, le - ie)))
                : ((_.sortIndex = Ee),
                  l(y, _),
                  V || U || ((V = !0), Se || ((Se = !0), ve()))),
              _
            );
          }),
          (a.unstable_shouldYield = Le),
          (a.unstable_wrapCallback = function (_) {
            var Z = M;
            return function () {
              var le = M;
              M = Z;
              try {
                return _.apply(this, arguments);
              } finally {
                M = le;
              }
            };
          }));
      })(rf)),
    rf
  );
}
var Xg;
function Fb() {
  return (Xg || ((Xg = 1), (lf.exports = Jb())), lf.exports);
}
var of = { exports: {} },
  Bt = {};
var Gg;
function Pb() {
  if (Gg) return Bt;
  Gg = 1;
  var a = Af();
  function l(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        m += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return (
      "Minified React error #" +
      y +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var u = {
      d: {
        f: r,
        r: function () {
          throw Error(l(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function f(y, m, w) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: b == null ? null : "" + b,
      children: y,
      containerInfo: m,
      implementation: w,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, m) {
    if (y === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (Bt.createPortal = function (y, m) {
      var w =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(l(299));
      return f(y, m, null, w);
    }),
    (Bt.flushSync = function (y) {
      var m = h.T,
        w = u.p;
      try {
        if (((h.T = null), (u.p = 2), y)) return y();
      } finally {
        ((h.T = m), (u.p = w), u.d.f());
      }
    }),
    (Bt.preconnect = function (y, m) {
      typeof y == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        u.d.C(y, m));
    }),
    (Bt.prefetchDNS = function (y) {
      typeof y == "string" && u.d.D(y);
    }),
    (Bt.preinit = function (y, m) {
      if (typeof y == "string" && m && typeof m.as == "string") {
        var w = m.as,
          b = g(w, m.crossOrigin),
          M = typeof m.integrity == "string" ? m.integrity : void 0,
          U = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        w === "style"
          ? u.d.S(y, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: b,
              integrity: M,
              fetchPriority: U,
            })
          : w === "script" &&
            u.d.X(y, {
              crossOrigin: b,
              integrity: M,
              fetchPriority: U,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Bt.preinitModule = function (y, m) {
      if (typeof y == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var w = g(m.as, m.crossOrigin);
            u.d.M(y, {
              crossOrigin: w,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && u.d.M(y);
    }),
    (Bt.preload = function (y, m) {
      if (
        typeof y == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var w = m.as,
          b = g(w, m.crossOrigin);
        u.d.L(y, w, {
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Bt.preloadModule = function (y, m) {
      if (typeof y == "string")
        if (m) {
          var w = g(m.as, m.crossOrigin);
          u.d.m(y, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: w,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else u.d.m(y);
    }),
    (Bt.requestFormReset = function (y) {
      u.d.r(y);
    }),
    (Bt.unstable_batchedUpdates = function (y, m) {
      return y(m);
    }),
    (Bt.useFormState = function (y, m, w) {
      return h.H.useFormState(y, m, w);
    }),
    (Bt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (Bt.version = "19.2.4"),
    Bt
  );
}
var Qg;
function qp() {
  if (Qg) return of.exports;
  Qg = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (of.exports = Pb()), of.exports);
}
var Zg;
function Wb() {
  if (Zg) return wr;
  Zg = 1;
  var a = Fb(),
    l = Af(),
    r = qp();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (f(e) !== e) throw Error(u(188));
  }
  function m(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var s = o.alternate;
      if (s === null) {
        if (((i = o.return), i !== null)) {
          n = i;
          continue;
        }
        break;
      }
      if (o.child === s.child) {
        for (s = o.child; s; ) {
          if (s === n) return (y(o), e);
          if (s === i) return (y(o), t);
          s = s.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== i.return) ((n = o), (i = s));
      else {
        for (var d = !1, p = o.child; p; ) {
          if (p === n) {
            ((d = !0), (n = o), (i = s));
            break;
          }
          if (p === i) {
            ((d = !0), (i = o), (n = s));
            break;
          }
          p = p.sibling;
        }
        if (!d) {
          for (p = s.child; p; ) {
            if (p === n) {
              ((d = !0), (n = s), (i = o));
              break;
            }
            if (p === i) {
              ((d = !0), (i = s), (n = o));
              break;
            }
            p = p.sibling;
          }
          if (!d) throw Error(u(189));
        }
      }
      if (n.alternate !== i) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function w(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = w(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    M = Symbol.for("react.element"),
    U = Symbol.for("react.transitional.element"),
    V = Symbol.for("react.portal"),
    Q = Symbol.for("react.fragment"),
    X = Symbol.for("react.strict_mode"),
    P = Symbol.for("react.profiler"),
    ee = Symbol.for("react.consumer"),
    te = Symbol.for("react.context"),
    Te = Symbol.for("react.forward_ref"),
    be = Symbol.for("react.suspense"),
    Se = Symbol.for("react.suspense_list"),
    se = Symbol.for("react.memo"),
    R = Symbol.for("react.lazy"),
    Ae = Symbol.for("react.activity"),
    Le = Symbol.for("react.memo_cache_sentinel"),
    Pe = Symbol.iterator;
  function ve(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Pe && e[Pe]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var ut = Symbol.for("react.client.reference");
  function Ue(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ut ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Q:
        return "Fragment";
      case P:
        return "Profiler";
      case X:
        return "StrictMode";
      case be:
        return "Suspense";
      case Se:
        return "SuspenseList";
      case Ae:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case V:
          return "Portal";
        case te:
          return e.displayName || "Context";
        case ee:
          return (e._context.displayName || "Context") + ".Consumer";
        case Te:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case se:
          return (
            (t = e.displayName || null),
            t !== null ? t : Ue(e.type) || "Memo"
          );
        case R:
          ((t = e._payload), (e = e._init));
          try {
            return Ue(e(t));
          } catch {}
      }
    return null;
  }
  var ye = Array.isArray,
    _ = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = { pending: !1, data: null, method: null, action: null },
    ie = [],
    Ee = -1;
  function C(e) {
    return { current: e };
  }
  function k(e) {
    0 > Ee || ((e.current = ie[Ee]), (ie[Ee] = null), Ee--);
  }
  function K(e, t) {
    (Ee++, (ie[Ee] = e.current), (e.current = t));
  }
  var F = C(null),
    me = C(null),
    pe = C(null),
    Me = C(null);
  function vt(e, t) {
    switch ((K(pe, t), K(me, e), K(F, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? og(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = og(t)), (e = ug(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (k(F), K(F, e));
  }
  function We() {
    (k(F), k(me), k(pe));
  }
  function Fn(e) {
    e.memoizedState !== null && K(Me, e);
    var t = F.current,
      n = ug(t, e.type);
    t !== n && (K(me, e), K(F, n));
  }
  function Al(e) {
    (me.current === e && (k(F), k(me)),
      Me.current === e && (k(Me), (gr._currentValue = le)));
  }
  var Ai, Ct;
  function Qt(e) {
    if (Ai === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((Ai = (t && t[1]) || ""),
          (Ct =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Ai +
      e +
      Ct
    );
  }
  var jl = !1;
  function ji(e, t) {
    if (!e || jl) return "";
    jl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Y = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Y.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Y, []);
                } catch (L) {
                  var O = L;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (L) {
                  O = L;
                }
                e.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (L) {
                O = L;
              }
              (Y = e()) &&
                typeof Y.catch == "function" &&
                Y.catch(function () {});
            }
          } catch (L) {
            if (L && O && typeof L.stack == "string") return [L.stack, O.stack];
          }
          return [null, null];
        },
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name",
      );
      o &&
        o.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var s = i.DetermineComponentFrameRoot(),
        d = s[0],
        p = s[1];
      if (d && p) {
        var x = d.split(`
`),
          z = p.split(`
`);
        for (
          o = i = 0;
          i < x.length && !x[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; o < z.length && !z[o].includes("DetermineComponentFrameRoot"); )
          o++;
        if (i === x.length || o === z.length)
          for (
            i = x.length - 1, o = z.length - 1;
            1 <= i && 0 <= o && x[i] !== z[o];
          )
            o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (x[i] !== z[o]) {
            if (i !== 1 || o !== 1)
              do
                if ((i--, o--, 0 > o || x[i] !== z[o])) {
                  var H =
                    `
` + x[i].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      H.includes("<anonymous>") &&
                      (H = H.replace("<anonymous>", e.displayName)),
                    H
                  );
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      ((jl = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : "") ? Qt(n) : "";
  }
  function Ga(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Qt(e.type);
      case 16:
        return Qt("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Qt("Suspense Fallback")
          : Qt("Suspense");
      case 19:
        return Qt("SuspenseList");
      case 0:
      case 15:
        return ji(e.type, !1);
      case 11:
        return ji(e.type.render, !1);
      case 1:
        return ji(e.type, !0);
      case 31:
        return Qt("Activity");
      default:
        return "";
    }
  }
  function Gr(e) {
    try {
      var t = "",
        n = null;
      do ((t += Ga(e, n)), (n = e), (e = e.return));
      while (e);
      return t;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  var Mi = Object.prototype.hasOwnProperty,
    Ml = a.unstable_scheduleCallback,
    Ri = a.unstable_cancelCallback,
    Gu = a.unstable_shouldYield,
    Qu = a.unstable_requestPaint,
    qt = a.unstable_now,
    Qa = a.unstable_getCurrentPriorityLevel,
    gn = a.unstable_ImmediatePriority,
    Di = a.unstable_UserBlockingPriority,
    pn = a.unstable_NormalPriority,
    Aa = a.unstable_LowPriority,
    da = a.unstable_IdlePriority,
    Qr = a.log,
    Zu = a.unstable_setDisableYieldValue,
    Za = null,
    Yt = null;
  function jt(e) {
    if (
      (typeof Qr == "function" && Zu(e),
      Yt && typeof Yt.setStrictMode == "function")
    )
      try {
        Yt.setStrictMode(Za, e);
      } catch {}
  }
  var Lt = Math.clz32 ? Math.clz32 : $u,
    Zr = Math.log,
    $r = Math.LN2;
  function $u(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Zr(e) / $r) | 0)) | 0);
  }
  var Pn = 256,
    $a = 262144,
    Wn = 4194304;
  function ja(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
        return 64;
      case 128:
        return 128;
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Rl(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0,
      s = e.suspendedLanes,
      d = e.pingedLanes;
    e = e.warmLanes;
    var p = i & 134217727;
    return (
      p !== 0
        ? ((i = p & ~s),
          i !== 0
            ? (o = ja(i))
            : ((d &= p),
              d !== 0
                ? (o = ja(d))
                : n || ((n = p & ~e), n !== 0 && (o = ja(n)))))
        : ((p = i & ~s),
          p !== 0
            ? (o = ja(p))
            : d !== 0
              ? (o = ja(d))
              : n || ((n = i & ~e), n !== 0 && (o = ja(n)))),
      o === 0
        ? 0
        : t !== 0 &&
            t !== o &&
            (t & s) === 0 &&
            ((s = o & -o),
            (n = t & -t),
            s >= n || (s === 32 && (n & 4194048) !== 0))
          ? t
          : o
    );
  }
  function yn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Ku(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
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
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zi() {
    var e = Wn;
    return ((Wn <<= 1), (Wn & 62914560) === 0 && (Wn = 4194304), e);
  }
  function vn(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function _a(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Kr(e, t, n, i, o, s) {
    var d = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var p = e.entanglements,
      x = e.expirationTimes,
      z = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var H = 31 - Lt(n),
        Y = 1 << H;
      ((p[H] = 0), (x[H] = -1));
      var O = z[H];
      if (O !== null)
        for (z[H] = null, H = 0; H < O.length; H++) {
          var L = O[H];
          L !== null && (L.lane &= -536870913);
        }
      n &= ~Y;
    }
    (i !== 0 && Jr(e, i, 0),
      s !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(d & ~t)));
  }
  function Jr(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var i = 31 - Lt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (n & 261930)));
  }
  function Fr(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var i = 31 - Lt(n),
        o = 1 << i;
      ((o & t) | (e[i] & t) && (e[i] |= t), (n &= ~o));
    }
  }
  function S(e, t) {
    var n = t & -t;
    return (
      (n = (n & 42) !== 0 ? 1 : A(n)),
      (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    );
  }
  function A(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function N(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function G() {
    var e = Z.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : zg(e.type));
  }
  function $(e, t) {
    var n = Z.p;
    try {
      return ((Z.p = e), t());
    } finally {
      Z.p = n;
    }
  }
  var ae = Math.random().toString(36).slice(2),
    J = "__reactFiber$" + ae,
    W = "__reactProps$" + ae,
    I = "__reactContainer$" + ae,
    fe = "__reactEvents$" + ae,
    he = "__reactListeners$" + ae,
    ce = "__reactHandles$" + ae,
    ke = "__reactResources$" + ae,
    Re = "__reactMarker$" + ae;
  function Ie(e) {
    (delete e[J], delete e[W], delete e[fe], delete e[he], delete e[ce]);
  }
  function at(e) {
    var t = e[J];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[I] || n[J])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = gg(e); e !== null; ) {
            if ((n = e[J])) return n;
            e = gg(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function st(e) {
    if ((e = e[J] || e[I])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function He(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Tt(e) {
    var t = e[ke];
    return (
      t ||
        (t = e[ke] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function tt(e) {
    e[Re] = !0;
  }
  var bn = new Set(),
    Ma = {};
  function Mt(e, t) {
    (La(e, t), La(e + "Capture", t));
  }
  function La(e, t) {
    for (Ma[e] = t, e = 0; e < t.length; e++) bn.add(t[e]);
  }
  var In = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Ua = {},
    el = {};
  function Dl(e) {
    return Mi.call(el, e)
      ? !0
      : Mi.call(Ua, e)
        ? !1
        : In.test(e)
          ? (el[e] = !0)
          : ((Ua[e] = !0), !1);
  }
  function De(e, t, n) {
    if (Dl(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function dt(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Ut(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + i);
    }
  }
  function bt(e) {
    switch (typeof e) {
      case "bigint":
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
  function nt(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function zl(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var o = i.get,
        s = i.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (d) {
            ((n = "" + d), s.call(this, d));
          },
        }),
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (d) {
            n = "" + d;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Ol(e) {
    if (!e._valueTracker) {
      var t = nt(e) ? "checked" : "value";
      e._valueTracker = zl(e, t, "" + e[t]);
    }
  }
  function Pr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      i = "";
    return (
      e && (i = nt(e) ? (e.checked ? "true" : "false") : e.value),
      (e = i),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Wr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Uv = /[\n"\\]/g;
  function ha(e) {
    return e.replace(Uv, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Ju(e, t, n, i, o, s, d, p) {
    ((e.name = ""),
      d != null &&
      typeof d != "function" &&
      typeof d != "symbol" &&
      typeof d != "boolean"
        ? (e.type = d)
        : e.removeAttribute("type"),
      t != null
        ? d === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + bt(t))
          : e.value !== "" + bt(t) && (e.value = "" + bt(t))
        : (d !== "submit" && d !== "reset") || e.removeAttribute("value"),
      t != null
        ? Fu(e, d, bt(t))
        : n != null
          ? Fu(e, d, bt(n))
          : i != null && e.removeAttribute("value"),
      o == null && s != null && (e.defaultChecked = !!s),
      o != null &&
        (e.checked = o && typeof o != "function" && typeof o != "symbol"),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.name = "" + bt(p))
        : e.removeAttribute("name"));
  }
  function td(e, t, n, i, o, s, d, p) {
    if (
      (s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        typeof s != "boolean" &&
        (e.type = s),
      t != null || n != null)
    ) {
      if (!((s !== "submit" && s !== "reset") || t != null)) {
        Ol(e);
        return;
      }
      ((n = n != null ? "" + bt(n) : ""),
        (t = t != null ? "" + bt(t) : n),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((i = i ?? o),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (e.checked = p ? e.checked : !!i),
      (e.defaultChecked = !!i),
      d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (e.name = d),
      Ol(e));
  }
  function Fu(e, t, n) {
    (t === "number" && Wr(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function Nl(e, t, n, i) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        ((o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && i && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + bt(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          ((e[o].selected = !0), i && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ad(e, t, n) {
    if (
      t != null &&
      ((t = "" + bt(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + bt(n) : "";
  }
  function nd(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(u(92));
        if (ye(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (t = n));
    }
    ((n = bt(t)),
      (e.defaultValue = n),
      (i = e.textContent),
      i === n && i !== "" && i !== null && (e.value = i),
      Ol(e));
  }
  function _l(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Bv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function ld(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : i
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || Bv.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function id(e, t, n) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (((e = e.style), n != null)) {
      for (var i in n)
        !n.hasOwnProperty(i) ||
          (t != null && t.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? e.setProperty(i, "")
            : i === "float"
              ? (e.cssFloat = "")
              : (e[i] = ""));
      for (var o in t)
        ((i = t[o]), t.hasOwnProperty(o) && n[o] !== i && ld(e, o, i));
    } else for (var s in t) t.hasOwnProperty(s) && ld(e, s, t[s]);
  }
  function Pu(e) {
    if (e.indexOf("-") === -1) return !1;
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
  var Hv = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    kv =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ir(e) {
    return kv.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Ka() {}
  var Wu = null;
  function Iu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ll = null,
    Ul = null;
  function rd(e) {
    var t = st(e);
    if (t && (e = t.stateNode)) {
      var n = e[W] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Ju(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name,
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + ha("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var o = i[W] || null;
                if (!o) throw Error(u(90));
                Ju(
                  i,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name,
                );
              }
            }
            for (t = 0; t < n.length; t++)
              ((i = n[t]), i.form === e.form && Pr(i));
          }
          break e;
        case "textarea":
          ad(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && Nl(e, !!n.multiple, t, !1));
      }
    }
  }
  var es = !1;
  function od(e, t, n) {
    if (es) return e(t, n);
    es = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (
        ((es = !1),
        (Ll !== null || Ul !== null) &&
          (Yo(), Ll && ((t = Ll), (e = Ul), (Ul = Ll = null), rd(t), e)))
      )
        for (t = 0; t < e.length; t++) rd(e[t]);
    }
  }
  function Oi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[W] || null;
    if (i === null) return null;
    n = i[t];
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
        ((i = !i.disabled) ||
          ((e = e.type),
          (i = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !i));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var Ja = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ts = !1;
  if (Ja)
    try {
      var Ni = {};
      (Object.defineProperty(Ni, "passive", {
        get: function () {
          ts = !0;
        },
      }),
        window.addEventListener("test", Ni, Ni),
        window.removeEventListener("test", Ni, Ni));
    } catch {
      ts = !1;
    }
  var wn = null,
    as = null,
    eo = null;
  function ud() {
    if (eo) return eo;
    var e,
      t = as,
      n = t.length,
      i,
      o = "value" in wn ? wn.value : wn.textContent,
      s = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var d = n - e;
    for (i = 1; i <= d && t[n - i] === o[s - i]; i++);
    return (eo = o.slice(e, 1 < i ? 1 - i : void 0));
  }
  function to(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ao() {
    return !0;
  }
  function sd() {
    return !1;
  }
  function Zt(e) {
    function t(n, i, o, s, d) {
      ((this._reactName = n),
        (this._targetInst = o),
        (this.type = i),
        (this.nativeEvent = s),
        (this.target = d),
        (this.currentTarget = null));
      for (var p in e)
        e.hasOwnProperty(p) && ((n = e[p]), (this[p] = n ? n(s) : s[p]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? ao
          : sd),
        (this.isPropagationStopped = sd),
        this
      );
    }
    return (
      b(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ao));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ao));
        },
        persist: function () {},
        isPersistent: ao,
      }),
      t
    );
  }
  var tl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    no = Zt(tl),
    _i = b({}, tl, { view: 0, detail: 0 }),
    qv = Zt(_i),
    ns,
    ls,
    Li,
    lo = b({}, _i, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: rs,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Li &&
              (Li && e.type === "mousemove"
                ? ((ns = e.screenX - Li.screenX), (ls = e.screenY - Li.screenY))
                : (ls = ns = 0),
              (Li = e)),
            ns);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : ls;
      },
    }),
    cd = Zt(lo),
    Yv = b({}, lo, { dataTransfer: 0 }),
    Vv = Zt(Yv),
    Xv = b({}, _i, { relatedTarget: 0 }),
    is = Zt(Xv),
    Gv = b({}, tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Qv = Zt(Gv),
    Zv = b({}, tl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    $v = Zt(Zv),
    Kv = b({}, tl, { data: 0 }),
    fd = Zt(Kv),
    Jv = {
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
      MozPrintableKey: "Unidentified",
    },
    Fv = {
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
      224: "Meta",
    },
    Pv = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Wv(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Pv[e])
        ? !!t[e]
        : !1;
  }
  function rs() {
    return Wv;
  }
  var Iv = b({}, _i, {
      key: function (e) {
        if (e.key) {
          var t = Jv[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = to(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Fv[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: rs,
      charCode: function (e) {
        return e.type === "keypress" ? to(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? to(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    e0 = Zt(Iv),
    t0 = b({}, lo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    dd = Zt(t0),
    a0 = b({}, _i, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: rs,
    }),
    n0 = Zt(a0),
    l0 = b({}, tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    i0 = Zt(l0),
    r0 = b({}, lo, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    o0 = Zt(r0),
    u0 = b({}, tl, { newState: 0, oldState: 0 }),
    s0 = Zt(u0),
    c0 = [9, 13, 27, 32],
    os = Ja && "CompositionEvent" in window,
    Ui = null;
  Ja && "documentMode" in document && (Ui = document.documentMode);
  var f0 = Ja && "TextEvent" in window && !Ui,
    hd = Ja && (!os || (Ui && 8 < Ui && 11 >= Ui)),
    md = " ",
    gd = !1;
  function pd(e, t) {
    switch (e) {
      case "keyup":
        return c0.indexOf(t.keyCode) !== -1;
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
  function yd(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Bl = !1;
  function d0(e, t) {
    switch (e) {
      case "compositionend":
        return yd(t);
      case "keypress":
        return t.which !== 32 ? null : ((gd = !0), md);
      case "textInput":
        return ((e = t.data), e === md && gd ? null : e);
      default:
        return null;
    }
  }
  function h0(e, t) {
    if (Bl)
      return e === "compositionend" || (!os && pd(e, t))
        ? ((e = ud()), (eo = as = wn = null), (Bl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return hd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var m0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function vd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!m0[e.type] : t === "textarea";
  }
  function bd(e, t, n, i) {
    (Ll ? (Ul ? Ul.push(i) : (Ul = [i])) : (Ll = i),
      (t = Ko(t, "onChange")),
      0 < t.length &&
        ((n = new no("onChange", "change", null, n, i)),
        e.push({ event: n, listeners: t })));
  }
  var Bi = null,
    Hi = null;
  function g0(e) {
    tg(e, 0);
  }
  function io(e) {
    var t = He(e);
    if (Pr(t)) return e;
  }
  function wd(e, t) {
    if (e === "change") return t;
  }
  var xd = !1;
  if (Ja) {
    var us;
    if (Ja) {
      var ss = "oninput" in document;
      if (!ss) {
        var Sd = document.createElement("div");
        (Sd.setAttribute("oninput", "return;"),
          (ss = typeof Sd.oninput == "function"));
      }
      us = ss;
    } else us = !1;
    xd = us && (!document.documentMode || 9 < document.documentMode);
  }
  function Ed() {
    Bi && (Bi.detachEvent("onpropertychange", Cd), (Hi = Bi = null));
  }
  function Cd(e) {
    if (e.propertyName === "value" && io(Hi)) {
      var t = [];
      (bd(t, Hi, e, Iu(e)), od(g0, t));
    }
  }
  function p0(e, t, n) {
    e === "focusin"
      ? (Ed(), (Bi = t), (Hi = n), Bi.attachEvent("onpropertychange", Cd))
      : e === "focusout" && Ed();
  }
  function y0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return io(Hi);
  }
  function v0(e, t) {
    if (e === "click") return io(t);
  }
  function b0(e, t) {
    if (e === "input" || e === "change") return io(t);
  }
  function w0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var It = typeof Object.is == "function" ? Object.is : w0;
  function ki(e, t) {
    if (It(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var o = n[i];
      if (!Mi.call(t, o) || !It(e[o], t[o])) return !1;
    }
    return !0;
  }
  function Td(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ad(e, t) {
    var n = Td(e);
    e = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (((i = e + n.textContent.length), e <= t && i >= t))
          return { node: n, offset: t - e };
        e = i;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Td(n);
    }
  }
  function jd(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? jd(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Md(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Wr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Wr(e.document);
    }
    return t;
  }
  function cs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var x0 = Ja && "documentMode" in document && 11 >= document.documentMode,
    Hl = null,
    fs = null,
    qi = null,
    ds = !1;
  function Rd(e, t, n) {
    var i =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ds ||
      Hl == null ||
      Hl !== Wr(i) ||
      ((i = Hl),
      "selectionStart" in i && cs(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (qi && ki(qi, i)) ||
        ((qi = i),
        (i = Ko(fs, "onSelect")),
        0 < i.length &&
          ((t = new no("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: i }),
          (t.target = Hl))));
  }
  function al(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var kl = {
      animationend: al("Animation", "AnimationEnd"),
      animationiteration: al("Animation", "AnimationIteration"),
      animationstart: al("Animation", "AnimationStart"),
      transitionrun: al("Transition", "TransitionRun"),
      transitionstart: al("Transition", "TransitionStart"),
      transitioncancel: al("Transition", "TransitionCancel"),
      transitionend: al("Transition", "TransitionEnd"),
    },
    hs = {},
    Dd = {};
  Ja &&
    ((Dd = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete kl.animationend.animation,
      delete kl.animationiteration.animation,
      delete kl.animationstart.animation),
    "TransitionEvent" in window || delete kl.transitionend.transition);
  function nl(e) {
    if (hs[e]) return hs[e];
    if (!kl[e]) return e;
    var t = kl[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Dd) return (hs[e] = t[n]);
    return e;
  }
  var zd = nl("animationend"),
    Od = nl("animationiteration"),
    Nd = nl("animationstart"),
    S0 = nl("transitionrun"),
    E0 = nl("transitionstart"),
    C0 = nl("transitioncancel"),
    _d = nl("transitionend"),
    Ld = new Map(),
    ms =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  ms.push("scrollEnd");
  function Ra(e, t) {
    (Ld.set(e, t), Mt(t, [e]));
  }
  var ro =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    ma = [],
    ql = 0,
    gs = 0;
  function oo() {
    for (var e = ql, t = (gs = ql = 0); t < e; ) {
      var n = ma[t];
      ma[t++] = null;
      var i = ma[t];
      ma[t++] = null;
      var o = ma[t];
      ma[t++] = null;
      var s = ma[t];
      if (((ma[t++] = null), i !== null && o !== null)) {
        var d = i.pending;
        (d === null ? (o.next = o) : ((o.next = d.next), (d.next = o)),
          (i.pending = o));
      }
      s !== 0 && Ud(n, o, s);
    }
  }
  function uo(e, t, n, i) {
    ((ma[ql++] = e),
      (ma[ql++] = t),
      (ma[ql++] = n),
      (ma[ql++] = i),
      (gs |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function ps(e, t, n, i) {
    return (uo(e, t, n, i), so(e));
  }
  function ll(e, t) {
    return (uo(e, null, null, t), so(e));
  }
  function Ud(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var o = !1, s = e.return; s !== null; )
      ((s.childLanes |= n),
        (i = s.alternate),
        i !== null && (i.childLanes |= n),
        s.tag === 22 &&
          ((e = s.stateNode), e === null || e._visibility & 1 || (o = !0)),
        (e = s),
        (s = s.return));
    return e.tag === 3
      ? ((s = e.stateNode),
        o &&
          t !== null &&
          ((o = 31 - Lt(n)),
          (e = s.hiddenUpdates),
          (i = e[o]),
          i === null ? (e[o] = [t]) : i.push(t),
          (t.lane = n | 536870912)),
        s)
      : null;
  }
  function so(e) {
    if (50 < ur) throw ((ur = 0), (Tc = null), Error(u(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Yl = {};
  function T0(e, t, n, i) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ea(e, t, n, i) {
    return new T0(e, t, n, i);
  }
  function ys(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Fa(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ea(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Bd(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function co(e, t, n, i, o, s) {
    var d = 0;
    if (((i = e), typeof e == "function")) ys(e) && (d = 1);
    else if (typeof e == "string")
      d = Db(e, n, F.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case Ae:
          return (
            (e = ea(31, n, t, o)),
            (e.elementType = Ae),
            (e.lanes = s),
            e
          );
        case Q:
          return il(n.children, o, s, t);
        case X:
          ((d = 8), (o |= 24));
          break;
        case P:
          return (
            (e = ea(12, n, t, o | 2)),
            (e.elementType = P),
            (e.lanes = s),
            e
          );
        case be:
          return (
            (e = ea(13, n, t, o)),
            (e.elementType = be),
            (e.lanes = s),
            e
          );
        case Se:
          return (
            (e = ea(19, n, t, o)),
            (e.elementType = Se),
            (e.lanes = s),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case te:
                d = 10;
                break e;
              case ee:
                d = 9;
                break e;
              case Te:
                d = 11;
                break e;
              case se:
                d = 14;
                break e;
              case R:
                ((d = 16), (i = null));
                break e;
            }
          ((d = 29),
            (n = Error(u(130, e === null ? "null" : typeof e, ""))),
            (i = null));
      }
    return (
      (t = ea(d, n, t, o)),
      (t.elementType = e),
      (t.type = i),
      (t.lanes = s),
      t
    );
  }
  function il(e, t, n, i) {
    return ((e = ea(7, e, i, t)), (e.lanes = n), e);
  }
  function vs(e, t, n) {
    return ((e = ea(6, e, null, t)), (e.lanes = n), e);
  }
  function Hd(e) {
    var t = ea(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function bs(e, t, n) {
    return (
      (t = ea(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var kd = new WeakMap();
  function ga(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = kd.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Gr(t) }), kd.set(e, t), t);
    }
    return { value: e, source: t, stack: Gr(t) };
  }
  var Vl = [],
    Xl = 0,
    fo = null,
    Yi = 0,
    pa = [],
    ya = 0,
    xn = null,
    Ba = 1,
    Ha = "";
  function Pa(e, t) {
    ((Vl[Xl++] = Yi), (Vl[Xl++] = fo), (fo = e), (Yi = t));
  }
  function qd(e, t, n) {
    ((pa[ya++] = Ba), (pa[ya++] = Ha), (pa[ya++] = xn), (xn = e));
    var i = Ba;
    e = Ha;
    var o = 32 - Lt(i) - 1;
    ((i &= ~(1 << o)), (n += 1));
    var s = 32 - Lt(t) + o;
    if (30 < s) {
      var d = o - (o % 5);
      ((s = (i & ((1 << d) - 1)).toString(32)),
        (i >>= d),
        (o -= d),
        (Ba = (1 << (32 - Lt(t) + o)) | (n << o) | i),
        (Ha = s + e));
    } else ((Ba = (1 << s) | (n << o) | i), (Ha = e));
  }
  function ws(e) {
    e.return !== null && (Pa(e, 1), qd(e, 1, 0));
  }
  function xs(e) {
    for (; e === fo; )
      ((fo = Vl[--Xl]), (Vl[Xl] = null), (Yi = Vl[--Xl]), (Vl[Xl] = null));
    for (; e === xn; )
      ((xn = pa[--ya]),
        (pa[ya] = null),
        (Ha = pa[--ya]),
        (pa[ya] = null),
        (Ba = pa[--ya]),
        (pa[ya] = null));
  }
  function Yd(e, t) {
    ((pa[ya++] = Ba),
      (pa[ya++] = Ha),
      (pa[ya++] = xn),
      (Ba = t.id),
      (Ha = t.overflow),
      (xn = e));
  }
  var zt = null,
    lt = null,
    Be = !1,
    Sn = null,
    va = !1,
    Ss = Error(u(519));
  function En(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Vi(ga(t, e)), Ss);
  }
  function Vd(e) {
    var t = e.stateNode,
      n = e.type,
      i = e.memoizedProps;
    switch (((t[J] = e), (t[W] = i), n)) {
      case "dialog":
        (Oe("cancel", t), Oe("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < cr.length; n++) Oe(cr[n], t);
        break;
      case "source":
        Oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Oe("error", t), Oe("load", t));
        break;
      case "details":
        Oe("toggle", t);
        break;
      case "input":
        (Oe("invalid", t),
          td(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0,
          ));
        break;
      case "select":
        Oe("invalid", t);
        break;
      case "textarea":
        (Oe("invalid", t), nd(t, i.value, i.defaultValue, i.children));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      ig(t.textContent, n)
        ? (i.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)),
          i.onScroll != null && Oe("scroll", t),
          i.onScrollEnd != null && Oe("scrollend", t),
          i.onClick != null && (t.onclick = Ka),
          (t = !0))
        : (t = !1),
      t || En(e, !0));
  }
  function Xd(e) {
    for (zt = e.return; zt; )
      switch (zt.tag) {
        case 5:
        case 31:
        case 13:
          va = !1;
          return;
        case 27:
        case 3:
          va = !0;
          return;
        default:
          zt = zt.return;
      }
  }
  function Gl(e) {
    if (e !== zt) return !1;
    if (!Be) return (Xd(e), (Be = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || qc(e.type, e.memoizedProps))),
        (n = !n)),
      n && lt && En(e),
      Xd(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      lt = mg(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      lt = mg(e);
    } else
      t === 27
        ? ((t = lt), Bn(e.type) ? ((e = Qc), (Qc = null), (lt = e)) : (lt = t))
        : (lt = zt ? wa(e.stateNode.nextSibling) : null);
    return !0;
  }
  function rl() {
    ((lt = zt = null), (Be = !1));
  }
  function Es() {
    var e = Sn;
    return (
      e !== null &&
        (Ft === null ? (Ft = e) : Ft.push.apply(Ft, e), (Sn = null)),
      e
    );
  }
  function Vi(e) {
    Sn === null ? (Sn = [e]) : Sn.push(e);
  }
  var Cs = C(null),
    ol = null,
    Wa = null;
  function Cn(e, t, n) {
    (K(Cs, t._currentValue), (t._currentValue = n));
  }
  function Ia(e) {
    ((e._currentValue = Cs.current), k(Cs));
  }
  function Ts(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
          : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function As(e, t, n, i) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var s = o.dependencies;
      if (s !== null) {
        var d = o.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var p = s;
          s = o;
          for (var x = 0; x < t.length; x++)
            if (p.context === t[x]) {
              ((s.lanes |= n),
                (p = s.alternate),
                p !== null && (p.lanes |= n),
                Ts(s.return, n, e),
                i || (d = null));
              break e;
            }
          s = p.next;
        }
      } else if (o.tag === 18) {
        if (((d = o.return), d === null)) throw Error(u(341));
        ((d.lanes |= n),
          (s = d.alternate),
          s !== null && (s.lanes |= n),
          Ts(d, n, e),
          (d = null));
      } else d = o.child;
      if (d !== null) d.return = o;
      else
        for (d = o; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (((o = d.sibling), o !== null)) {
            ((o.return = d.return), (d = o));
            break;
          }
          d = d.return;
        }
      o = d;
    }
  }
  function Ql(e, t, n, i) {
    e = null;
    for (var o = t, s = !1; o !== null; ) {
      if (!s) {
        if ((o.flags & 524288) !== 0) s = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var d = o.alternate;
        if (d === null) throw Error(u(387));
        if (((d = d.memoizedProps), d !== null)) {
          var p = o.type;
          It(o.pendingProps.value, d.value) ||
            (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (o === Me.current) {
        if (((d = o.alternate), d === null)) throw Error(u(387));
        d.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
          (e !== null ? e.push(gr) : (e = [gr]));
      }
      o = o.return;
    }
    (e !== null && As(t, e, n, i), (t.flags |= 262144));
  }
  function ho(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!It(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function ul(e) {
    ((ol = e),
      (Wa = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Ot(e) {
    return Gd(ol, e);
  }
  function mo(e, t) {
    return (ol === null && ul(e), Gd(e, t));
  }
  function Gd(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Wa === null)) {
      if (e === null) throw Error(u(308));
      ((Wa = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Wa = Wa.next = t;
    return n;
  }
  var A0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, i) {
                  e.push(i);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                }));
            };
          },
    j0 = a.unstable_scheduleCallback,
    M0 = a.unstable_NormalPriority,
    wt = {
      $$typeof: te,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function js() {
    return { controller: new A0(), data: new Map(), refCount: 0 };
  }
  function Xi(e) {
    (e.refCount--,
      e.refCount === 0 &&
        j0(M0, function () {
          e.controller.abort();
        }));
  }
  var Gi = null,
    Ms = 0,
    Zl = 0,
    $l = null;
  function R0(e, t) {
    if (Gi === null) {
      var n = (Gi = []);
      ((Ms = 0),
        (Zl = zc()),
        ($l = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          },
        }));
    }
    return (Ms++, t.then(Qd, Qd), t);
  }
  function Qd() {
    if (--Ms === 0 && Gi !== null) {
      $l !== null && ($l.status = "fulfilled");
      var e = Gi;
      ((Gi = null), (Zl = 0), ($l = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function D0(e, t) {
    var n = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (o) {
          n.push(o);
        },
      };
    return (
      e.then(
        function () {
          ((i.status = "fulfilled"), (i.value = t));
          for (var o = 0; o < n.length; o++) (0, n[o])(t);
        },
        function (o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < n.length; o++)
            (0, n[o])(void 0);
        },
      ),
      i
    );
  }
  var Zd = _.S;
  _.S = function (e, t) {
    ((Rm = qt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        R0(e, t),
      Zd !== null && Zd(e, t));
  };
  var sl = C(null);
  function Rs() {
    var e = sl.current;
    return e !== null ? e : et.pooledCache;
  }
  function go(e, t) {
    t === null ? K(sl, sl.current) : K(sl, t.pool);
  }
  function $d() {
    var e = Rs();
    return e === null ? null : { parent: wt._currentValue, pool: e };
  }
  var Kl = Error(u(460)),
    Ds = Error(u(474)),
    po = Error(u(542)),
    yo = { then: function () {} };
  function Kd(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Jd(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Ka, Ka), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Pd(e), e);
      default:
        if (typeof t.status == "string") t.then(Ka, Ka);
        else {
          if (((e = et), e !== null && 100 < e.shellSuspendCounter))
            throw Error(u(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (i) {
                if (t.status === "pending") {
                  var o = t;
                  ((o.status = "fulfilled"), (o.value = i));
                }
              },
              function (i) {
                if (t.status === "pending") {
                  var o = t;
                  ((o.status = "rejected"), (o.reason = i));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Pd(e), e);
        }
        throw ((fl = t), Kl);
    }
  }
  function cl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((fl = n), Kl)
        : n;
    }
  }
  var fl = null;
  function Fd() {
    if (fl === null) throw Error(u(459));
    var e = fl;
    return ((fl = null), e);
  }
  function Pd(e) {
    if (e === Kl || e === po) throw Error(u(483));
  }
  var Jl = null,
    Qi = 0;
  function vo(e) {
    var t = Qi;
    return ((Qi += 1), Jl === null && (Jl = []), Jd(Jl, e, t));
  }
  function Zi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function bo(e, t) {
    throw t.$$typeof === M
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Wd(e) {
    function t(j, T) {
      if (e) {
        var D = j.deletions;
        D === null ? ((j.deletions = [T]), (j.flags |= 16)) : D.push(T);
      }
    }
    function n(j, T) {
      if (!e) return null;
      for (; T !== null; ) (t(j, T), (T = T.sibling));
      return null;
    }
    function i(j) {
      for (var T = new Map(); j !== null; )
        (j.key !== null ? T.set(j.key, j) : T.set(j.index, j), (j = j.sibling));
      return T;
    }
    function o(j, T) {
      return ((j = Fa(j, T)), (j.index = 0), (j.sibling = null), j);
    }
    function s(j, T, D) {
      return (
        (j.index = D),
        e
          ? ((D = j.alternate),
            D !== null
              ? ((D = D.index), D < T ? ((j.flags |= 67108866), T) : D)
              : ((j.flags |= 67108866), T))
          : ((j.flags |= 1048576), T)
      );
    }
    function d(j) {
      return (e && j.alternate === null && (j.flags |= 67108866), j);
    }
    function p(j, T, D, q) {
      return T === null || T.tag !== 6
        ? ((T = vs(D, j.mode, q)), (T.return = j), T)
        : ((T = o(T, D)), (T.return = j), T);
    }
    function x(j, T, D, q) {
      var de = D.type;
      return de === Q
        ? H(j, T, D.props.children, q, D.key)
        : T !== null &&
            (T.elementType === de ||
              (typeof de == "object" &&
                de !== null &&
                de.$$typeof === R &&
                cl(de) === T.type))
          ? ((T = o(T, D.props)), Zi(T, D), (T.return = j), T)
          : ((T = co(D.type, D.key, D.props, null, j.mode, q)),
            Zi(T, D),
            (T.return = j),
            T);
    }
    function z(j, T, D, q) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== D.containerInfo ||
        T.stateNode.implementation !== D.implementation
        ? ((T = bs(D, j.mode, q)), (T.return = j), T)
        : ((T = o(T, D.children || [])), (T.return = j), T);
    }
    function H(j, T, D, q, de) {
      return T === null || T.tag !== 7
        ? ((T = il(D, j.mode, q, de)), (T.return = j), T)
        : ((T = o(T, D)), (T.return = j), T);
    }
    function Y(j, T, D) {
      if (
        (typeof T == "string" && T !== "") ||
        typeof T == "number" ||
        typeof T == "bigint"
      )
        return ((T = vs("" + T, j.mode, D)), (T.return = j), T);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case U:
            return (
              (D = co(T.type, T.key, T.props, null, j.mode, D)),
              Zi(D, T),
              (D.return = j),
              D
            );
          case V:
            return ((T = bs(T, j.mode, D)), (T.return = j), T);
          case R:
            return ((T = cl(T)), Y(j, T, D));
        }
        if (ye(T) || ve(T))
          return ((T = il(T, j.mode, D, null)), (T.return = j), T);
        if (typeof T.then == "function") return Y(j, vo(T), D);
        if (T.$$typeof === te) return Y(j, mo(j, T), D);
        bo(j, T);
      }
      return null;
    }
    function O(j, T, D, q) {
      var de = T !== null ? T.key : null;
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return de !== null ? null : p(j, T, "" + D, q);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case U:
            return D.key === de ? x(j, T, D, q) : null;
          case V:
            return D.key === de ? z(j, T, D, q) : null;
          case R:
            return ((D = cl(D)), O(j, T, D, q));
        }
        if (ye(D) || ve(D)) return de !== null ? null : H(j, T, D, q, null);
        if (typeof D.then == "function") return O(j, T, vo(D), q);
        if (D.$$typeof === te) return O(j, T, mo(j, D), q);
        bo(j, D);
      }
      return null;
    }
    function L(j, T, D, q, de) {
      if (
        (typeof q == "string" && q !== "") ||
        typeof q == "number" ||
        typeof q == "bigint"
      )
        return ((j = j.get(D) || null), p(T, j, "" + q, de));
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case U:
            return (
              (j = j.get(q.key === null ? D : q.key) || null),
              x(T, j, q, de)
            );
          case V:
            return (
              (j = j.get(q.key === null ? D : q.key) || null),
              z(T, j, q, de)
            );
          case R:
            return ((q = cl(q)), L(j, T, D, q, de));
        }
        if (ye(q) || ve(q))
          return ((j = j.get(D) || null), H(T, j, q, de, null));
        if (typeof q.then == "function") return L(j, T, D, vo(q), de);
        if (q.$$typeof === te) return L(j, T, D, mo(T, q), de);
        bo(T, q);
      }
      return null;
    }
    function ne(j, T, D, q) {
      for (
        var de = null, qe = null, re = T, Ce = (T = 0), _e = null;
        re !== null && Ce < D.length;
        Ce++
      ) {
        re.index > Ce ? ((_e = re), (re = null)) : (_e = re.sibling);
        var Ye = O(j, re, D[Ce], q);
        if (Ye === null) {
          re === null && (re = _e);
          break;
        }
        (e && re && Ye.alternate === null && t(j, re),
          (T = s(Ye, T, Ce)),
          qe === null ? (de = Ye) : (qe.sibling = Ye),
          (qe = Ye),
          (re = _e));
      }
      if (Ce === D.length) return (n(j, re), Be && Pa(j, Ce), de);
      if (re === null) {
        for (; Ce < D.length; Ce++)
          ((re = Y(j, D[Ce], q)),
            re !== null &&
              ((T = s(re, T, Ce)),
              qe === null ? (de = re) : (qe.sibling = re),
              (qe = re)));
        return (Be && Pa(j, Ce), de);
      }
      for (re = i(re); Ce < D.length; Ce++)
        ((_e = L(re, j, Ce, D[Ce], q)),
          _e !== null &&
            (e &&
              _e.alternate !== null &&
              re.delete(_e.key === null ? Ce : _e.key),
            (T = s(_e, T, Ce)),
            qe === null ? (de = _e) : (qe.sibling = _e),
            (qe = _e)));
      return (
        e &&
          re.forEach(function (Vn) {
            return t(j, Vn);
          }),
        Be && Pa(j, Ce),
        de
      );
    }
    function ge(j, T, D, q) {
      if (D == null) throw Error(u(151));
      for (
        var de = null,
          qe = null,
          re = T,
          Ce = (T = 0),
          _e = null,
          Ye = D.next();
        re !== null && !Ye.done;
        Ce++, Ye = D.next()
      ) {
        re.index > Ce ? ((_e = re), (re = null)) : (_e = re.sibling);
        var Vn = O(j, re, Ye.value, q);
        if (Vn === null) {
          re === null && (re = _e);
          break;
        }
        (e && re && Vn.alternate === null && t(j, re),
          (T = s(Vn, T, Ce)),
          qe === null ? (de = Vn) : (qe.sibling = Vn),
          (qe = Vn),
          (re = _e));
      }
      if (Ye.done) return (n(j, re), Be && Pa(j, Ce), de);
      if (re === null) {
        for (; !Ye.done; Ce++, Ye = D.next())
          ((Ye = Y(j, Ye.value, q)),
            Ye !== null &&
              ((T = s(Ye, T, Ce)),
              qe === null ? (de = Ye) : (qe.sibling = Ye),
              (qe = Ye)));
        return (Be && Pa(j, Ce), de);
      }
      for (re = i(re); !Ye.done; Ce++, Ye = D.next())
        ((Ye = L(re, j, Ce, Ye.value, q)),
          Ye !== null &&
            (e &&
              Ye.alternate !== null &&
              re.delete(Ye.key === null ? Ce : Ye.key),
            (T = s(Ye, T, Ce)),
            qe === null ? (de = Ye) : (qe.sibling = Ye),
            (qe = Ye)));
      return (
        e &&
          re.forEach(function (Yb) {
            return t(j, Yb);
          }),
        Be && Pa(j, Ce),
        de
      );
    }
    function Fe(j, T, D, q) {
      if (
        (typeof D == "object" &&
          D !== null &&
          D.type === Q &&
          D.key === null &&
          (D = D.props.children),
        typeof D == "object" && D !== null)
      ) {
        switch (D.$$typeof) {
          case U:
            e: {
              for (var de = D.key; T !== null; ) {
                if (T.key === de) {
                  if (((de = D.type), de === Q)) {
                    if (T.tag === 7) {
                      (n(j, T.sibling),
                        (q = o(T, D.props.children)),
                        (q.return = j),
                        (j = q));
                      break e;
                    }
                  } else if (
                    T.elementType === de ||
                    (typeof de == "object" &&
                      de !== null &&
                      de.$$typeof === R &&
                      cl(de) === T.type)
                  ) {
                    (n(j, T.sibling),
                      (q = o(T, D.props)),
                      Zi(q, D),
                      (q.return = j),
                      (j = q));
                    break e;
                  }
                  n(j, T);
                  break;
                } else t(j, T);
                T = T.sibling;
              }
              D.type === Q
                ? ((q = il(D.props.children, j.mode, q, D.key)),
                  (q.return = j),
                  (j = q))
                : ((q = co(D.type, D.key, D.props, null, j.mode, q)),
                  Zi(q, D),
                  (q.return = j),
                  (j = q));
            }
            return d(j);
          case V:
            e: {
              for (de = D.key; T !== null; ) {
                if (T.key === de)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === D.containerInfo &&
                    T.stateNode.implementation === D.implementation
                  ) {
                    (n(j, T.sibling),
                      (q = o(T, D.children || [])),
                      (q.return = j),
                      (j = q));
                    break e;
                  } else {
                    n(j, T);
                    break;
                  }
                else t(j, T);
                T = T.sibling;
              }
              ((q = bs(D, j.mode, q)), (q.return = j), (j = q));
            }
            return d(j);
          case R:
            return ((D = cl(D)), Fe(j, T, D, q));
        }
        if (ye(D)) return ne(j, T, D, q);
        if (ve(D)) {
          if (((de = ve(D)), typeof de != "function")) throw Error(u(150));
          return ((D = de.call(D)), ge(j, T, D, q));
        }
        if (typeof D.then == "function") return Fe(j, T, vo(D), q);
        if (D.$$typeof === te) return Fe(j, T, mo(j, D), q);
        bo(j, D);
      }
      return (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
        ? ((D = "" + D),
          T !== null && T.tag === 6
            ? (n(j, T.sibling), (q = o(T, D)), (q.return = j), (j = q))
            : (n(j, T), (q = vs(D, j.mode, q)), (q.return = j), (j = q)),
          d(j))
        : n(j, T);
    }
    return function (j, T, D, q) {
      try {
        Qi = 0;
        var de = Fe(j, T, D, q);
        return ((Jl = null), de);
      } catch (re) {
        if (re === Kl || re === po) throw re;
        var qe = ea(29, re, null, j.mode);
        return ((qe.lanes = q), (qe.return = j), qe);
      }
    };
  }
  var dl = Wd(!0),
    Id = Wd(!1),
    Tn = !1;
  function zs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Os(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function An(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function jn(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (Ve & 2) !== 0)) {
      var o = i.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (i.pending = t),
        (t = so(e)),
        Ud(e, null, n),
        t
      );
    }
    return (uo(e, i, t, n), so(e));
  }
  function $i(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Fr(e, n));
    }
  }
  function Ns(e, t) {
    var n = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var o = null,
        s = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          (s === null ? (o = s = d) : (s = s.next = d), (n = n.next));
        } while (n !== null);
        s === null ? (o = s = t) : (s = s.next = t);
      } else o = s = t;
      ((n = {
        baseState: i.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  var _s = !1;
  function Ki() {
    if (_s) {
      var e = $l;
      if (e !== null) throw e;
    }
  }
  function Ji(e, t, n, i) {
    _s = !1;
    var o = e.updateQueue;
    Tn = !1;
    var s = o.firstBaseUpdate,
      d = o.lastBaseUpdate,
      p = o.shared.pending;
    if (p !== null) {
      o.shared.pending = null;
      var x = p,
        z = x.next;
      ((x.next = null), d === null ? (s = z) : (d.next = z), (d = x));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (p = H.lastBaseUpdate),
        p !== d &&
          (p === null ? (H.firstBaseUpdate = z) : (p.next = z),
          (H.lastBaseUpdate = x)));
    }
    if (s !== null) {
      var Y = o.baseState;
      ((d = 0), (H = z = x = null), (p = s));
      do {
        var O = p.lane & -536870913,
          L = O !== p.lane;
        if (L ? (Ne & O) === O : (i & O) === O) {
          (O !== 0 && O === Zl && (_s = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: p.tag,
                  payload: p.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var ne = e,
              ge = p;
            O = t;
            var Fe = n;
            switch (ge.tag) {
              case 1:
                if (((ne = ge.payload), typeof ne == "function")) {
                  Y = ne.call(Fe, Y, O);
                  break e;
                }
                Y = ne;
                break e;
              case 3:
                ne.flags = (ne.flags & -65537) | 128;
              case 0:
                if (
                  ((ne = ge.payload),
                  (O = typeof ne == "function" ? ne.call(Fe, Y, O) : ne),
                  O == null)
                )
                  break e;
                Y = b({}, Y, O);
                break e;
              case 2:
                Tn = !0;
            }
          }
          ((O = p.callback),
            O !== null &&
              ((e.flags |= 64),
              L && (e.flags |= 8192),
              (L = o.callbacks),
              L === null ? (o.callbacks = [O]) : L.push(O)));
        } else
          ((L = {
            lane: O,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            H === null ? ((z = H = L), (x = Y)) : (H = H.next = L),
            (d |= O));
        if (((p = p.next), p === null)) {
          if (((p = o.shared.pending), p === null)) break;
          ((L = p),
            (p = L.next),
            (L.next = null),
            (o.lastBaseUpdate = L),
            (o.shared.pending = null));
        }
      } while (!0);
      (H === null && (x = Y),
        (o.baseState = x),
        (o.firstBaseUpdate = z),
        (o.lastBaseUpdate = H),
        s === null && (o.shared.lanes = 0),
        (On |= d),
        (e.lanes = d),
        (e.memoizedState = Y));
    }
  }
  function eh(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function th(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) eh(n[e], t);
  }
  var Fl = C(null),
    wo = C(0);
  function ah(e, t) {
    ((e = sn), K(wo, e), K(Fl, t), (sn = e | t.baseLanes));
  }
  function Ls() {
    (K(wo, sn), K(Fl, Fl.current));
  }
  function Us() {
    ((sn = wo.current), k(Fl), k(wo));
  }
  var ta = C(null),
    ba = null;
  function Mn(e) {
    var t = e.alternate;
    (K(ht, ht.current & 1),
      K(ta, e),
      ba === null &&
        (t === null || Fl.current !== null || t.memoizedState !== null) &&
        (ba = e));
  }
  function Bs(e) {
    (K(ht, ht.current), K(ta, e), ba === null && (ba = e));
  }
  function nh(e) {
    e.tag === 22
      ? (K(ht, ht.current), K(ta, e), ba === null && (ba = e))
      : Rn();
  }
  function Rn() {
    (K(ht, ht.current), K(ta, ta.current));
  }
  function aa(e) {
    (k(ta), ba === e && (ba = null), k(ht));
  }
  var ht = C(0);
  function xo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || Xc(n) || Gc(n)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var en = 0,
    xe = null,
    Ke = null,
    xt = null,
    So = !1,
    Pl = !1,
    hl = !1,
    Eo = 0,
    Fi = 0,
    Wl = null,
    z0 = 0;
  function ct() {
    throw Error(u(321));
  }
  function Hs(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!It(e[n], t[n])) return !1;
    return !0;
  }
  function ks(e, t, n, i, o, s) {
    return (
      (en = s),
      (xe = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? qh : ec),
      (hl = !1),
      (s = n(i, o)),
      (hl = !1),
      Pl && (s = ih(t, n, i, o)),
      lh(e),
      s
    );
  }
  function lh(e) {
    _.H = Ii;
    var t = Ke !== null && Ke.next !== null;
    if (((en = 0), (xt = Ke = xe = null), (So = !1), (Fi = 0), (Wl = null), t))
      throw Error(u(300));
    e === null ||
      St ||
      ((e = e.dependencies), e !== null && ho(e) && (St = !0));
  }
  function ih(e, t, n, i) {
    xe = e;
    var o = 0;
    do {
      if ((Pl && (Wl = null), (Fi = 0), (Pl = !1), 25 <= o))
        throw Error(u(301));
      if (((o += 1), (xt = Ke = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((_.H = Yh), (s = t(n, i)));
    } while (Pl);
    return s;
  }
  function O0() {
    var e = _.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Pi(t) : t),
      (e = e.useState()[0]),
      (Ke !== null ? Ke.memoizedState : null) !== e && (xe.flags |= 1024),
      t
    );
  }
  function qs() {
    var e = Eo !== 0;
    return ((Eo = 0), e);
  }
  function Ys(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function Vs(e) {
    if (So) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      So = !1;
    }
    ((en = 0), (xt = Ke = xe = null), (Pl = !1), (Fi = Eo = 0), (Wl = null));
  }
  function Vt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (xt === null ? (xe.memoizedState = xt = e) : (xt = xt.next = e), xt);
  }
  function mt() {
    if (Ke === null) {
      var e = xe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var t = xt === null ? xe.memoizedState : xt.next;
    if (t !== null) ((xt = t), (Ke = e));
    else {
      if (e === null)
        throw xe.alternate === null ? Error(u(467)) : Error(u(310));
      ((Ke = e),
        (e = {
          memoizedState: Ke.memoizedState,
          baseState: Ke.baseState,
          baseQueue: Ke.baseQueue,
          queue: Ke.queue,
          next: null,
        }),
        xt === null ? (xe.memoizedState = xt = e) : (xt = xt.next = e));
    }
    return xt;
  }
  function Co() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pi(e) {
    var t = Fi;
    return (
      (Fi += 1),
      Wl === null && (Wl = []),
      (e = Jd(Wl, e, t)),
      (t = xe),
      (xt === null ? t.memoizedState : xt.next) === null &&
        ((t = t.alternate),
        (_.H = t === null || t.memoizedState === null ? qh : ec)),
      e
    );
  }
  function To(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Pi(e);
      if (e.$$typeof === te) return Ot(e);
    }
    throw Error(u(438, String(e)));
  }
  function Xs(e) {
    var t = null,
      n = xe.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var i = xe.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (t = {
              data: i.data.map(function (o) {
                return o.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Co()), (xe.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++) n[i] = Le;
    return (t.index++, n);
  }
  function tn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ao(e) {
    var t = mt();
    return Gs(t, Ke, e);
  }
  function Gs(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = n;
    var o = e.baseQueue,
      s = i.pending;
    if (s !== null) {
      if (o !== null) {
        var d = o.next;
        ((o.next = s.next), (s.next = d));
      }
      ((t.baseQueue = o = s), (i.pending = null));
    }
    if (((s = e.baseState), o === null)) e.memoizedState = s;
    else {
      t = o.next;
      var p = (d = null),
        x = null,
        z = t,
        H = !1;
      do {
        var Y = z.lane & -536870913;
        if (Y !== z.lane ? (Ne & Y) === Y : (en & Y) === Y) {
          var O = z.revertLane;
          if (O === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Y === Zl && (H = !0));
          else if ((en & O) === O) {
            ((z = z.next), O === Zl && (H = !0));
            continue;
          } else
            ((Y = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              x === null ? ((p = x = Y), (d = s)) : (x = x.next = Y),
              (xe.lanes |= O),
              (On |= O));
          ((Y = z.action),
            hl && n(s, Y),
            (s = z.hasEagerState ? z.eagerState : n(s, Y)));
        } else
          ((O = {
            lane: Y,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            x === null ? ((p = x = O), (d = s)) : (x = x.next = O),
            (xe.lanes |= Y),
            (On |= Y));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (x === null ? (d = s) : (x.next = p),
        !It(s, e.memoizedState) && ((St = !0), H && ((n = $l), n !== null)))
      )
        throw n;
      ((e.memoizedState = s),
        (e.baseState = d),
        (e.baseQueue = x),
        (i.lastRenderedState = s));
    }
    return (o === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function Qs(e) {
    var t = mt(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch,
      o = n.pending,
      s = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var d = (o = o.next);
      do ((s = e(s, d.action)), (d = d.next));
      while (d !== o);
      (It(s, t.memoizedState) || (St = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (n.lastRenderedState = s));
    }
    return [s, i];
  }
  function rh(e, t, n) {
    var i = xe,
      o = mt(),
      s = Be;
    if (s) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var d = !It((Ke || o).memoizedState, n);
    if (
      (d && ((o.memoizedState = n), (St = !0)),
      (o = o.queue),
      Ks(sh.bind(null, i, o, e), [e]),
      o.getSnapshot !== t || d || (xt !== null && xt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Il(9, { destroy: void 0 }, uh.bind(null, i, o, n, t), null),
        et === null)
      )
        throw Error(u(349));
      s || (en & 127) !== 0 || oh(i, t, n);
    }
    return n;
  }
  function oh(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = xe.updateQueue),
      t === null
        ? ((t = Co()), (xe.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function uh(e, t, n, i) {
    ((t.value = n), (t.getSnapshot = i), ch(t) && fh(e));
  }
  function sh(e, t, n) {
    return n(function () {
      ch(t) && fh(e);
    });
  }
  function ch(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !It(e, n);
    } catch {
      return !0;
    }
  }
  function fh(e) {
    var t = ll(e, 2);
    t !== null && Pt(t, e, 2);
  }
  function Zs(e) {
    var t = Vt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), hl)) {
        jt(!0);
        try {
          n();
        } finally {
          jt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function dh(e, t, n, i) {
    return ((e.baseState = n), Gs(e, Ke, typeof i == "function" ? i : tn));
  }
  function N0(e, t, n, i, o) {
    if (Ro(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var s = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (d) {
          s.listeners.push(d);
        },
      };
      (_.T !== null ? n(!0) : (s.isTransition = !1),
        i(s),
        (n = t.pending),
        n === null
          ? ((s.next = t.pending = s), hh(t, s))
          : ((s.next = n.next), (t.pending = n.next = s)));
    }
  }
  function hh(e, t) {
    var n = t.action,
      i = t.payload,
      o = e.state;
    if (t.isTransition) {
      var s = _.T,
        d = {};
      _.T = d;
      try {
        var p = n(o, i),
          x = _.S;
        (x !== null && x(d, p), mh(e, t, p));
      } catch (z) {
        $s(e, t, z);
      } finally {
        (s !== null && d.types !== null && (s.types = d.types), (_.T = s));
      }
    } else
      try {
        ((s = n(o, i)), mh(e, t, s));
      } catch (z) {
        $s(e, t, z);
      }
  }
  function mh(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            gh(e, t, i);
          },
          function (i) {
            return $s(e, t, i);
          },
        )
      : gh(e, t, n);
  }
  function gh(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      ph(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), hh(e, n))));
  }
  function $s(e, t, n) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((t.status = "rejected"), (t.reason = n), ph(t), (t = t.next));
      while (t !== i);
    }
    e.action = null;
  }
  function ph(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function yh(e, t) {
    return t;
  }
  function vh(e, t) {
    if (Be) {
      var n = et.formState;
      if (n !== null) {
        e: {
          var i = xe;
          if (Be) {
            if (lt) {
              t: {
                for (var o = lt, s = va; o.nodeType !== 8; ) {
                  if (!s) {
                    o = null;
                    break t;
                  }
                  if (((o = wa(o.nextSibling)), o === null)) {
                    o = null;
                    break t;
                  }
                }
                ((s = o.data), (o = s === "F!" || s === "F" ? o : null));
              }
              if (o) {
                ((lt = wa(o.nextSibling)), (i = o.data === "F!"));
                break e;
              }
            }
            En(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return (
      (n = Vt()),
      (n.memoizedState = n.baseState = t),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yh,
        lastRenderedState: t,
      }),
      (n.queue = i),
      (n = Bh.bind(null, xe, i)),
      (i.dispatch = n),
      (i = Zs(!1)),
      (s = Is.bind(null, xe, !1, i.queue)),
      (i = Vt()),
      (o = { state: t, dispatch: null, action: e, pending: null }),
      (i.queue = o),
      (n = N0.bind(null, xe, o, s, n)),
      (o.dispatch = n),
      (i.memoizedState = e),
      [t, n, !1]
    );
  }
  function bh(e) {
    var t = mt();
    return wh(t, Ke, e);
  }
  function wh(e, t, n) {
    if (
      ((t = Gs(e, t, yh)[0]),
      (e = Ao(tn)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var i = Pi(t);
      } catch (d) {
        throw d === Kl ? po : d;
      }
    else i = t;
    t = mt();
    var o = t.queue,
      s = o.dispatch;
    return (
      n !== t.memoizedState &&
        ((xe.flags |= 2048),
        Il(9, { destroy: void 0 }, _0.bind(null, o, n), null)),
      [i, s, e]
    );
  }
  function _0(e, t) {
    e.action = t;
  }
  function xh(e) {
    var t = mt(),
      n = Ke;
    if (n !== null) return wh(t, n, e);
    (mt(), (t = t.memoizedState), (n = mt()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = e), [t, i, !1]);
  }
  function Il(e, t, n, i) {
    return (
      (e = { tag: e, create: n, deps: i, inst: t, next: null }),
      (t = xe.updateQueue),
      t === null && ((t = Co()), (xe.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e)),
      e
    );
  }
  function Sh() {
    return mt().memoizedState;
  }
  function jo(e, t, n, i) {
    var o = Vt();
    ((xe.flags |= e),
      (o.memoizedState = Il(
        1 | t,
        { destroy: void 0 },
        n,
        i === void 0 ? null : i,
      )));
  }
  function Mo(e, t, n, i) {
    var o = mt();
    i = i === void 0 ? null : i;
    var s = o.memoizedState.inst;
    Ke !== null && i !== null && Hs(i, Ke.memoizedState.deps)
      ? (o.memoizedState = Il(t, s, n, i))
      : ((xe.flags |= e), (o.memoizedState = Il(1 | t, s, n, i)));
  }
  function Eh(e, t) {
    jo(8390656, 8, e, t);
  }
  function Ks(e, t) {
    Mo(2048, 8, e, t);
  }
  function L0(e) {
    xe.flags |= 4;
    var t = xe.updateQueue;
    if (t === null) ((t = Co()), (xe.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Ch(e) {
    var t = mt().memoizedState;
    return (
      L0({ ref: t, nextImpl: e }),
      function () {
        if ((Ve & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Th(e, t) {
    return Mo(4, 2, e, t);
  }
  function Ah(e, t) {
    return Mo(4, 4, e, t);
  }
  function jh(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Mh(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), Mo(4, 4, jh.bind(null, t, e), n));
  }
  function Js() {}
  function Rh(e, t) {
    var n = mt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && Hs(t, i[1]) ? i[0] : ((n.memoizedState = [e, t]), e);
  }
  function Dh(e, t) {
    var n = mt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && Hs(t, i[1])) return i[0];
    if (((i = e()), hl)) {
      jt(!0);
      try {
        e();
      } finally {
        jt(!1);
      }
    }
    return ((n.memoizedState = [i, t]), i);
  }
  function Fs(e, t, n) {
    return n === void 0 || ((en & 1073741824) !== 0 && (Ne & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = zm()), (xe.lanes |= e), (On |= e), n);
  }
  function zh(e, t, n, i) {
    return It(n, t)
      ? n
      : Fl.current !== null
        ? ((e = Fs(e, n, i)), It(e, t) || (St = !0), e)
        : (en & 42) === 0 || ((en & 1073741824) !== 0 && (Ne & 261930) === 0)
          ? ((St = !0), (e.memoizedState = n))
          : ((e = zm()), (xe.lanes |= e), (On |= e), t);
  }
  function Oh(e, t, n, i, o) {
    var s = Z.p;
    Z.p = s !== 0 && 8 > s ? s : 8;
    var d = _.T,
      p = {};
    ((_.T = p), Is(e, !1, t, n));
    try {
      var x = o(),
        z = _.S;
      if (
        (z !== null && z(p, x),
        x !== null && typeof x == "object" && typeof x.then == "function")
      ) {
        var H = D0(x, i);
        Wi(e, t, H, ia(e));
      } else Wi(e, t, i, ia(e));
    } catch (Y) {
      Wi(e, t, { then: function () {}, status: "rejected", reason: Y }, ia());
    } finally {
      ((Z.p = s),
        d !== null && p.types !== null && (d.types = p.types),
        (_.T = d));
    }
  }
  function U0() {}
  function Ps(e, t, n, i) {
    if (e.tag !== 5) throw Error(u(476));
    var o = Nh(e).queue;
    Oh(
      e,
      o,
      t,
      le,
      n === null
        ? U0
        : function () {
            return (_h(e), n(i));
          },
    );
  }
  function Nh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tn,
        lastRenderedState: le,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: tn,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function _h(e) {
    var t = Nh(e);
    (t.next === null && (t = e.alternate.memoizedState),
      Wi(e, t.next.queue, {}, ia()));
  }
  function Ws() {
    return Ot(gr);
  }
  function Lh() {
    return mt().memoizedState;
  }
  function Uh() {
    return mt().memoizedState;
  }
  function B0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = ia();
          e = An(n);
          var i = jn(t, e, n);
          (i !== null && (Pt(i, t, n), $i(i, t, n)),
            (t = { cache: js() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function H0(e, t, n) {
    var i = ia();
    ((n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ro(e)
        ? Hh(t, n)
        : ((n = ps(e, t, n, i)), n !== null && (Pt(n, e, i), kh(n, t, i))));
  }
  function Bh(e, t, n) {
    var i = ia();
    Wi(e, t, n, i);
  }
  function Wi(e, t, n, i) {
    var o = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ro(e)) Hh(t, o);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var d = t.lastRenderedState,
            p = s(d, n);
          if (((o.hasEagerState = !0), (o.eagerState = p), It(p, d)))
            return (uo(e, t, o, 0), et === null && oo(), !1);
        } catch {}
      if (((n = ps(e, t, o, i)), n !== null))
        return (Pt(n, e, i), kh(n, t, i), !0);
    }
    return !1;
  }
  function Is(e, t, n, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: zc(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ro(e))
    ) {
      if (t) throw Error(u(479));
    } else ((t = ps(e, n, i, 2)), t !== null && Pt(t, e, 2));
  }
  function Ro(e) {
    var t = e.alternate;
    return e === xe || (t !== null && t === xe);
  }
  function Hh(e, t) {
    Pl = So = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function kh(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Fr(e, n));
    }
  }
  var Ii = {
    readContext: Ot,
    use: To,
    useCallback: ct,
    useContext: ct,
    useEffect: ct,
    useImperativeHandle: ct,
    useLayoutEffect: ct,
    useInsertionEffect: ct,
    useMemo: ct,
    useReducer: ct,
    useRef: ct,
    useState: ct,
    useDebugValue: ct,
    useDeferredValue: ct,
    useTransition: ct,
    useSyncExternalStore: ct,
    useId: ct,
    useHostTransitionStatus: ct,
    useFormState: ct,
    useActionState: ct,
    useOptimistic: ct,
    useMemoCache: ct,
    useCacheRefresh: ct,
  };
  Ii.useEffectEvent = ct;
  var qh = {
      readContext: Ot,
      use: To,
      useCallback: function (e, t) {
        return ((Vt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Ot,
      useEffect: Eh,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          jo(4194308, 4, jh.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return jo(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        jo(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Vt();
        t = t === void 0 ? null : t;
        var i = e();
        if (hl) {
          jt(!0);
          try {
            e();
          } finally {
            jt(!1);
          }
        }
        return ((n.memoizedState = [i, t]), i);
      },
      useReducer: function (e, t, n) {
        var i = Vt();
        if (n !== void 0) {
          var o = n(t);
          if (hl) {
            jt(!0);
            try {
              n(t);
            } finally {
              jt(!1);
            }
          }
        } else o = t;
        return (
          (i.memoizedState = i.baseState = o),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: o,
          }),
          (i.queue = e),
          (e = e.dispatch = H0.bind(null, xe, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Vt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Zs(e);
        var t = e.queue,
          n = Bh.bind(null, xe, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: Js,
      useDeferredValue: function (e, t) {
        var n = Vt();
        return Fs(n, e, t);
      },
      useTransition: function () {
        var e = Zs(!1);
        return (
          (e = Oh.bind(null, xe, e.queue, !0, !1)),
          (Vt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var i = xe,
          o = Vt();
        if (Be) {
          if (n === void 0) throw Error(u(407));
          n = n();
        } else {
          if (((n = t()), et === null)) throw Error(u(349));
          (Ne & 127) !== 0 || oh(i, t, n);
        }
        o.memoizedState = n;
        var s = { value: n, getSnapshot: t };
        return (
          (o.queue = s),
          Eh(sh.bind(null, i, s, e), [e]),
          (i.flags |= 2048),
          Il(9, { destroy: void 0 }, uh.bind(null, i, s, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Vt(),
          t = et.identifierPrefix;
        if (Be) {
          var n = Ha,
            i = Ba;
          ((n = (i & ~(1 << (32 - Lt(i) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = Eo++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_"));
        } else ((n = z0++), (t = "_" + t + "r_" + n.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Ws,
      useFormState: vh,
      useActionState: vh,
      useOptimistic: function (e) {
        var t = Vt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = Is.bind(null, xe, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Xs,
      useCacheRefresh: function () {
        return (Vt().memoizedState = B0.bind(null, xe));
      },
      useEffectEvent: function (e) {
        var t = Vt(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((Ve & 2) !== 0) throw Error(u(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ec = {
      readContext: Ot,
      use: To,
      useCallback: Rh,
      useContext: Ot,
      useEffect: Ks,
      useImperativeHandle: Mh,
      useInsertionEffect: Th,
      useLayoutEffect: Ah,
      useMemo: Dh,
      useReducer: Ao,
      useRef: Sh,
      useState: function () {
        return Ao(tn);
      },
      useDebugValue: Js,
      useDeferredValue: function (e, t) {
        var n = mt();
        return zh(n, Ke.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ao(tn)[0],
          t = mt().memoizedState;
        return [typeof e == "boolean" ? e : Pi(e), t];
      },
      useSyncExternalStore: rh,
      useId: Lh,
      useHostTransitionStatus: Ws,
      useFormState: bh,
      useActionState: bh,
      useOptimistic: function (e, t) {
        var n = mt();
        return dh(n, Ke, e, t);
      },
      useMemoCache: Xs,
      useCacheRefresh: Uh,
    };
  ec.useEffectEvent = Ch;
  var Yh = {
    readContext: Ot,
    use: To,
    useCallback: Rh,
    useContext: Ot,
    useEffect: Ks,
    useImperativeHandle: Mh,
    useInsertionEffect: Th,
    useLayoutEffect: Ah,
    useMemo: Dh,
    useReducer: Qs,
    useRef: Sh,
    useState: function () {
      return Qs(tn);
    },
    useDebugValue: Js,
    useDeferredValue: function (e, t) {
      var n = mt();
      return Ke === null ? Fs(n, e, t) : zh(n, Ke.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Qs(tn)[0],
        t = mt().memoizedState;
      return [typeof e == "boolean" ? e : Pi(e), t];
    },
    useSyncExternalStore: rh,
    useId: Lh,
    useHostTransitionStatus: Ws,
    useFormState: xh,
    useActionState: xh,
    useOptimistic: function (e, t) {
      var n = mt();
      return Ke !== null
        ? dh(n, Ke, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: Xs,
    useCacheRefresh: Uh,
  };
  Yh.useEffectEvent = Ch;
  function tc(e, t, n, i) {
    ((t = e.memoizedState),
      (n = n(i, t)),
      (n = n == null ? t : b({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var ac = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var i = ia(),
        o = An(i);
      ((o.payload = t),
        n != null && (o.callback = n),
        (t = jn(e, o, i)),
        t !== null && (Pt(t, e, i), $i(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var i = ia(),
        o = An(i);
      ((o.tag = 1),
        (o.payload = t),
        n != null && (o.callback = n),
        (t = jn(e, o, i)),
        t !== null && (Pt(t, e, i), $i(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = ia(),
        i = An(n);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = jn(e, i, n)),
        t !== null && (Pt(t, e, n), $i(t, e, n)));
    },
  };
  function Vh(e, t, n, i, o, s, d) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, s, d)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ki(n, i) || !ki(o, s)
          : !0
    );
  }
  function Xh(e, t, n, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, i),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, i),
      t.state !== e && ac.enqueueReplaceState(t, t.state, null));
  }
  function ml(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t) i !== "ref" && (n[i] = t[i]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = b({}, n));
      for (var o in e) n[o] === void 0 && (n[o] = e[o]);
    }
    return n;
  }
  function Gh(e) {
    ro(e);
  }
  function Qh(e) {
    console.error(e);
  }
  function Zh(e) {
    ro(e);
  }
  function Do(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function $h(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  function nc(e, t, n) {
    return (
      (n = An(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Do(e, t);
      }),
      n
    );
  }
  function Kh(e) {
    return ((e = An(e)), (e.tag = 3), e);
  }
  function Jh(e, t, n, i) {
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var s = i.value;
      ((e.payload = function () {
        return o(s);
      }),
        (e.callback = function () {
          $h(t, n, i);
        }));
    }
    var d = n.stateNode;
    d !== null &&
      typeof d.componentDidCatch == "function" &&
      (e.callback = function () {
        ($h(t, n, i),
          typeof o != "function" &&
            (Nn === null ? (Nn = new Set([this])) : Nn.add(this)));
        var p = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: p !== null ? p : "",
        });
      });
  }
  function k0(e, t, n, i, o) {
    if (
      ((n.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && Ql(t, n, o, !0),
        (n = ta.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              ba === null ? Vo() : n.alternate === null && ft === 0 && (ft = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = o),
              i === yo
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([i])) : t.add(i),
                  Mc(e, i, o)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === yo
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([i]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([i])) : n.add(i)),
                  Mc(e, i, o)),
              !1
            );
        }
        throw Error(u(435, n.tag));
      }
      return (Mc(e, i, o), Vo(), !1);
    }
    if (Be)
      return (
        (t = ta.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = o),
            i !== Ss && ((e = Error(u(422), { cause: i })), Vi(ga(e, n))))
          : (i !== Ss && ((t = Error(u(423), { cause: i })), Vi(ga(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (o &= -o),
            (e.lanes |= o),
            (i = ga(i, n)),
            (o = nc(e.stateNode, i, o)),
            Ns(e, o),
            ft !== 4 && (ft = 2)),
        !1
      );
    var s = Error(u(520), { cause: i });
    if (
      ((s = ga(s, n)),
      or === null ? (or = [s]) : or.push(s),
      ft !== 4 && (ft = 2),
      t === null)
    )
      return !0;
    ((i = ga(i, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = o & -o),
            (n.lanes |= e),
            (e = nc(n.stateNode, i, e)),
            Ns(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (s = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (s !== null &&
                  typeof s.componentDidCatch == "function" &&
                  (Nn === null || !Nn.has(s)))))
          )
            return (
              (n.flags |= 65536),
              (o &= -o),
              (n.lanes |= o),
              (o = Kh(o)),
              Jh(o, e, n, i),
              Ns(n, o),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var lc = Error(u(461)),
    St = !1;
  function Nt(e, t, n, i) {
    t.child = e === null ? Id(t, null, n, i) : dl(t, e.child, n, i);
  }
  function Fh(e, t, n, i, o) {
    n = n.render;
    var s = t.ref;
    if ("ref" in i) {
      var d = {};
      for (var p in i) p !== "ref" && (d[p] = i[p]);
    } else d = i;
    return (
      ul(t),
      (i = ks(e, t, n, d, s, o)),
      (p = qs()),
      e !== null && !St
        ? (Ys(e, t, o), an(e, t, o))
        : (Be && p && ws(t), (t.flags |= 1), Nt(e, t, i, o), t.child)
    );
  }
  function Ph(e, t, n, i, o) {
    if (e === null) {
      var s = n.type;
      return typeof s == "function" &&
        !ys(s) &&
        s.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = s), Wh(e, t, s, i, o))
        : ((e = co(n.type, null, i, t, t.mode, o)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((s = e.child), !dc(e, o))) {
      var d = s.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : ki), n(d, i) && e.ref === t.ref)
      )
        return an(e, t, o);
    }
    return (
      (t.flags |= 1),
      (e = Fa(s, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Wh(e, t, n, i, o) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (ki(s, i) && e.ref === t.ref)
        if (((St = !1), (t.pendingProps = i = s), dc(e, o)))
          (e.flags & 131072) !== 0 && (St = !0);
        else return ((t.lanes = e.lanes), an(e, t, o));
    }
    return ic(e, t, n, i, o);
  }
  function Ih(e, t, n, i) {
    var o = i.children,
      s = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      i.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((s = s !== null ? s.baseLanes | n : n), e !== null)) {
          for (i = t.child = e.child, o = 0; i !== null; )
            ((o = o | i.lanes | i.childLanes), (i = i.sibling));
          i = o & ~s;
        } else ((i = 0), (t.child = null));
        return em(e, t, s, n, i);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && go(t, s !== null ? s.cachePool : null),
          s !== null ? ah(t, s) : Ls(),
          nh(t));
      else
        return (
          (i = t.lanes = 536870912),
          em(e, t, s !== null ? s.baseLanes | n : n, n, i)
        );
    } else
      s !== null
        ? (go(t, s.cachePool), ah(t, s), Rn(), (t.memoizedState = null))
        : (e !== null && go(t, null), Ls(), Rn());
    return (Nt(e, t, o, n), t.child);
  }
  function er(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function em(e, t, n, i, o) {
    var s = Rs();
    return (
      (s = s === null ? null : { parent: wt._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: n, cachePool: s }),
      e !== null && go(t, null),
      Ls(),
      nh(t),
      e !== null && Ql(e, t, i, !0),
      (t.childLanes = o),
      null
    );
  }
  function zo(e, t) {
    return (
      (t = No({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function tm(e, t, n) {
    return (
      dl(t, e.child, null, n),
      (e = zo(t, t.pendingProps)),
      (e.flags |= 2),
      aa(t),
      (t.memoizedState = null),
      e
    );
  }
  function q0(e, t, n) {
    var i = t.pendingProps,
      o = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Be) {
        if (i.mode === "hidden")
          return ((e = zo(t, i)), (t.lanes = 536870912), er(null, e));
        if (
          (Bs(t),
          (e = lt)
            ? ((e = hg(e, va)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: xn !== null ? { id: Ba, overflow: Ha } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Hd(e)),
                (n.return = t),
                (t.child = n),
                (zt = t),
                (lt = null)))
            : (e = null),
          e === null)
        )
          throw En(t);
        return ((t.lanes = 536870912), null);
      }
      return zo(t, i);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var d = s.dehydrated;
      if ((Bs(t), o))
        if (t.flags & 256) ((t.flags &= -257), (t = tm(e, t, n)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(u(558));
      else if (
        (St || Ql(e, t, n, !1), (o = (n & e.childLanes) !== 0), St || o)
      ) {
        if (
          ((i = et),
          i !== null && ((d = S(i, n)), d !== 0 && d !== s.retryLane))
        )
          throw ((s.retryLane = d), ll(e, d), Pt(i, e, d), lc);
        (Vo(), (t = tm(e, t, n)));
      } else
        ((e = s.treeContext),
          (lt = wa(d.nextSibling)),
          (zt = t),
          (Be = !0),
          (Sn = null),
          (va = !1),
          e !== null && Yd(t, e),
          (t = zo(t, i)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Fa(e.child, { mode: i.mode, children: i.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Oo(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function ic(e, t, n, i, o) {
    return (
      ul(t),
      (n = ks(e, t, n, i, void 0, o)),
      (i = qs()),
      e !== null && !St
        ? (Ys(e, t, o), an(e, t, o))
        : (Be && i && ws(t), (t.flags |= 1), Nt(e, t, n, o), t.child)
    );
  }
  function am(e, t, n, i, o, s) {
    return (
      ul(t),
      (t.updateQueue = null),
      (n = ih(t, i, n, o)),
      lh(e),
      (i = qs()),
      e !== null && !St
        ? (Ys(e, t, s), an(e, t, s))
        : (Be && i && ws(t), (t.flags |= 1), Nt(e, t, n, s), t.child)
    );
  }
  function nm(e, t, n, i, o) {
    if ((ul(t), t.stateNode === null)) {
      var s = Yl,
        d = n.contextType;
      (typeof d == "object" && d !== null && (s = Ot(d)),
        (s = new n(i, s)),
        (t.memoizedState =
          s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = ac),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = i),
        (s.state = t.memoizedState),
        (s.refs = {}),
        zs(t),
        (d = n.contextType),
        (s.context = typeof d == "object" && d !== null ? Ot(d) : Yl),
        (s.state = t.memoizedState),
        (d = n.getDerivedStateFromProps),
        typeof d == "function" && (tc(t, n, d, i), (s.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof s.getSnapshotBeforeUpdate == "function" ||
          (typeof s.UNSAFE_componentWillMount != "function" &&
            typeof s.componentWillMount != "function") ||
          ((d = s.state),
          typeof s.componentWillMount == "function" && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == "function" &&
            s.UNSAFE_componentWillMount(),
          d !== s.state && ac.enqueueReplaceState(s, s.state, null),
          Ji(t, i, s, o),
          Ki(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == "function" && (t.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      s = t.stateNode;
      var p = t.memoizedProps,
        x = ml(n, p);
      s.props = x;
      var z = s.context,
        H = n.contextType;
      ((d = Yl), typeof H == "object" && H !== null && (d = Ot(H)));
      var Y = n.getDerivedStateFromProps;
      ((H =
        typeof Y == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function"),
        (p = t.pendingProps !== p),
        H ||
          (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
            typeof s.componentWillReceiveProps != "function") ||
          ((p || z !== d) && Xh(t, s, i, d)),
        (Tn = !1));
      var O = t.memoizedState;
      ((s.state = O),
        Ji(t, i, s, o),
        Ki(),
        (z = t.memoizedState),
        p || O !== z || Tn
          ? (typeof Y == "function" && (tc(t, n, Y, i), (z = t.memoizedState)),
            (x = Tn || Vh(t, n, x, i, O, z, d))
              ? (H ||
                  (typeof s.UNSAFE_componentWillMount != "function" &&
                    typeof s.componentWillMount != "function") ||
                  (typeof s.componentWillMount == "function" &&
                    s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == "function" &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof s.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = i),
                (t.memoizedState = z)),
            (s.props = i),
            (s.state = z),
            (s.context = d),
            (i = x))
          : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
            (i = !1)));
    } else {
      ((s = t.stateNode),
        Os(e, t),
        (d = t.memoizedProps),
        (H = ml(n, d)),
        (s.props = H),
        (Y = t.pendingProps),
        (O = s.context),
        (z = n.contextType),
        (x = Yl),
        typeof z == "object" && z !== null && (x = Ot(z)),
        (p = n.getDerivedStateFromProps),
        (z =
          typeof p == "function" ||
          typeof s.getSnapshotBeforeUpdate == "function") ||
          (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
            typeof s.componentWillReceiveProps != "function") ||
          ((d !== Y || O !== x) && Xh(t, s, i, x)),
        (Tn = !1),
        (O = t.memoizedState),
        (s.state = O),
        Ji(t, i, s, o),
        Ki());
      var L = t.memoizedState;
      d !== Y ||
      O !== L ||
      Tn ||
      (e !== null && e.dependencies !== null && ho(e.dependencies))
        ? (typeof p == "function" && (tc(t, n, p, i), (L = t.memoizedState)),
          (H =
            Tn ||
            Vh(t, n, H, i, O, L, x) ||
            (e !== null && e.dependencies !== null && ho(e.dependencies)))
            ? (z ||
                (typeof s.UNSAFE_componentWillUpdate != "function" &&
                  typeof s.componentWillUpdate != "function") ||
                (typeof s.componentWillUpdate == "function" &&
                  s.componentWillUpdate(i, L, x),
                typeof s.UNSAFE_componentWillUpdate == "function" &&
                  s.UNSAFE_componentWillUpdate(i, L, x)),
              typeof s.componentDidUpdate == "function" && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof s.componentDidUpdate != "function" ||
                (d === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != "function" ||
                (d === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = L)),
          (s.props = i),
          (s.state = L),
          (s.context = x),
          (i = H))
        : (typeof s.componentDidUpdate != "function" ||
            (d === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != "function" ||
            (d === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return (
      (s = i),
      Oo(e, t),
      (i = (t.flags & 128) !== 0),
      s || i
        ? ((s = t.stateNode),
          (n =
            i && typeof n.getDerivedStateFromError != "function"
              ? null
              : s.render()),
          (t.flags |= 1),
          e !== null && i
            ? ((t.child = dl(t, e.child, null, o)),
              (t.child = dl(t, null, n, o)))
            : Nt(e, t, n, o),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = an(e, t, o)),
      e
    );
  }
  function lm(e, t, n, i) {
    return (rl(), (t.flags |= 256), Nt(e, t, n, i), t.child);
  }
  var rc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function oc(e) {
    return { baseLanes: e, cachePool: $d() };
  }
  function uc(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= la), e);
  }
  function im(e, t, n) {
    var i = t.pendingProps,
      o = !1,
      s = (t.flags & 128) !== 0,
      d;
    if (
      ((d = s) ||
        (d =
          e !== null && e.memoizedState === null ? !1 : (ht.current & 2) !== 0),
      d && ((o = !0), (t.flags &= -129)),
      (d = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Be) {
        if (
          (o ? Mn(t) : Rn(),
          (e = lt)
            ? ((e = hg(e, va)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: xn !== null ? { id: Ba, overflow: Ha } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Hd(e)),
                (n.return = t),
                (t.child = n),
                (zt = t),
                (lt = null)))
            : (e = null),
          e === null)
        )
          throw En(t);
        return (Gc(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = i.children;
      return (
        (i = i.fallback),
        o
          ? (Rn(),
            (o = t.mode),
            (p = No({ mode: "hidden", children: p }, o)),
            (i = il(i, o, n, null)),
            (p.return = t),
            (i.return = t),
            (p.sibling = i),
            (t.child = p),
            (i = t.child),
            (i.memoizedState = oc(n)),
            (i.childLanes = uc(e, d, n)),
            (t.memoizedState = rc),
            er(null, i))
          : (Mn(t), sc(t, p))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (s)
        t.flags & 256
          ? (Mn(t), (t.flags &= -257), (t = cc(e, t, n)))
          : t.memoizedState !== null
            ? (Rn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Rn(),
              (p = i.fallback),
              (o = t.mode),
              (i = No({ mode: "visible", children: i.children }, o)),
              (p = il(p, o, n, null)),
              (p.flags |= 2),
              (i.return = t),
              (p.return = t),
              (i.sibling = p),
              (t.child = i),
              dl(t, e.child, null, n),
              (i = t.child),
              (i.memoizedState = oc(n)),
              (i.childLanes = uc(e, d, n)),
              (t.memoizedState = rc),
              (t = er(null, i)));
      else if ((Mn(t), Gc(p))) {
        if (((d = p.nextSibling && p.nextSibling.dataset), d)) var z = d.dgst;
        ((d = z),
          (i = Error(u(419))),
          (i.stack = ""),
          (i.digest = d),
          Vi({ value: i, source: null, stack: null }),
          (t = cc(e, t, n)));
      } else if (
        (St || Ql(e, t, n, !1), (d = (n & e.childLanes) !== 0), St || d)
      ) {
        if (
          ((d = et),
          d !== null && ((i = S(d, n)), i !== 0 && i !== x.retryLane))
        )
          throw ((x.retryLane = i), ll(e, i), Pt(d, e, i), lc);
        (Xc(p) || Vo(), (t = cc(e, t, n)));
      } else
        Xc(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (lt = wa(p.nextSibling)),
            (zt = t),
            (Be = !0),
            (Sn = null),
            (va = !1),
            e !== null && Yd(t, e),
            (t = sc(t, i.children)),
            (t.flags |= 4096));
      return t;
    }
    return o
      ? (Rn(),
        (p = i.fallback),
        (o = t.mode),
        (x = e.child),
        (z = x.sibling),
        (i = Fa(x, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = x.subtreeFlags & 65011712),
        z !== null ? (p = Fa(z, p)) : ((p = il(p, o, n, null)), (p.flags |= 2)),
        (p.return = t),
        (i.return = t),
        (i.sibling = p),
        (t.child = i),
        er(null, i),
        (i = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = oc(n))
          : ((o = p.cachePool),
            o !== null
              ? ((x = wt._currentValue),
                (o = o.parent !== x ? { parent: x, pool: x } : o))
              : (o = $d()),
            (p = { baseLanes: p.baseLanes | n, cachePool: o })),
        (i.memoizedState = p),
        (i.childLanes = uc(e, d, n)),
        (t.memoizedState = rc),
        er(e.child, i))
      : (Mn(t),
        (n = e.child),
        (e = n.sibling),
        (n = Fa(n, { mode: "visible", children: i.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((d = t.deletions),
          d === null ? ((t.deletions = [e]), (t.flags |= 16)) : d.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function sc(e, t) {
    return (
      (t = No({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function No(e, t) {
    return ((e = ea(22, e, null, t)), (e.lanes = 0), e);
  }
  function cc(e, t, n) {
    return (
      dl(t, e.child, null, n),
      (e = sc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function rm(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    (i !== null && (i.lanes |= t), Ts(e.return, t, n));
  }
  function fc(e, t, n, i, o, s) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: o,
          treeForkCount: s,
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = i),
        (d.tail = n),
        (d.tailMode = o),
        (d.treeForkCount = s));
  }
  function om(e, t, n) {
    var i = t.pendingProps,
      o = i.revealOrder,
      s = i.tail;
    i = i.children;
    var d = ht.current,
      p = (d & 2) !== 0;
    if (
      (p ? ((d = (d & 1) | 2), (t.flags |= 128)) : (d &= 1),
      K(ht, d),
      Nt(e, t, i, n),
      (i = Be ? Yi : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && rm(e, n, t);
        else if (e.tag === 19) rm(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          ((e = n.alternate),
            e !== null && xo(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          fc(t, !1, o, n, s, i));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && xo(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        fc(t, !0, n, null, s, i);
        break;
      case "together":
        fc(t, !1, null, null, void 0, i);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function an(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (On |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Ql(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Fa(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = Fa(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function dc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && ho(e)));
  }
  function Y0(e, t, n) {
    switch (t.tag) {
      case 3:
        (vt(t, t.stateNode.containerInfo),
          Cn(t, wt, e.memoizedState.cache),
          rl());
        break;
      case 27:
      case 5:
        Fn(t);
        break;
      case 4:
        vt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Cn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Bs(t), null);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Mn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? im(e, t, n)
              : (Mn(t), (e = an(e, t, n)), e !== null ? e.sibling : null);
        Mn(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (
          ((i = (n & t.childLanes) !== 0),
          i || (Ql(e, t, n, !1), (i = (n & t.childLanes) !== 0)),
          o)
        ) {
          if (i) return om(e, t, n);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null &&
            ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          K(ht, ht.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Ih(e, t, n, t.pendingProps));
      case 24:
        Cn(t, wt, e.memoizedState.cache);
    }
    return an(e, t, n);
  }
  function um(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) St = !0;
      else {
        if (!dc(e, n) && (t.flags & 128) === 0) return ((St = !1), Y0(e, t, n));
        St = (e.flags & 131072) !== 0;
      }
    else ((St = !1), Be && (t.flags & 1048576) !== 0 && qd(t, Yi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (((e = cl(t.elementType)), (t.type = e), typeof e == "function"))
            ys(e)
              ? ((i = ml(e, i)), (t.tag = 1), (t = nm(null, t, e, i, n)))
              : ((t.tag = 0), (t = ic(null, t, e, i, n)));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === Te) {
                ((t.tag = 11), (t = Fh(null, t, e, i, n)));
                break e;
              } else if (o === se) {
                ((t.tag = 14), (t = Ph(null, t, e, i, n)));
                break e;
              }
            }
            throw ((t = Ue(e) || e), Error(u(306, t, "")));
          }
        }
        return t;
      case 0:
        return ic(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((i = t.type), (o = ml(i, t.pendingProps)), nm(e, t, i, o, n));
      case 3:
        e: {
          if ((vt(t, t.stateNode.containerInfo), e === null))
            throw Error(u(387));
          i = t.pendingProps;
          var s = t.memoizedState;
          ((o = s.element), Os(e, t), Ji(t, i, null, n));
          var d = t.memoizedState;
          if (
            ((i = d.cache),
            Cn(t, wt, i),
            i !== s.cache && As(t, [wt], n, !0),
            Ki(),
            (i = d.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: i, isDehydrated: !1, cache: d.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = lm(e, t, i, n);
              break e;
            } else if (i !== o) {
              ((o = ga(Error(u(424)), t)), Vi(o), (t = lm(e, t, i, n)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  lt = wa(e.firstChild),
                  zt = t,
                  Be = !0,
                  Sn = null,
                  va = !0,
                  n = Id(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((rl(), i === o)) {
              t = an(e, t, n);
              break e;
            }
            Nt(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Oo(e, t),
          e === null
            ? (n = bg(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : Be ||
                ((n = t.type),
                (e = t.pendingProps),
                (i = Jo(pe.current).createElement(n)),
                (i[J] = t),
                (i[W] = e),
                _t(i, n, e),
                tt(i),
                (t.stateNode = i))
            : (t.memoizedState = bg(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Fn(t),
          e === null &&
            Be &&
            ((i = t.stateNode = pg(t.type, t.pendingProps, pe.current)),
            (zt = t),
            (va = !0),
            (o = lt),
            Bn(t.type) ? ((Qc = o), (lt = wa(i.firstChild))) : (lt = o)),
          Nt(e, t, t.pendingProps.children, n),
          Oo(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Be &&
            ((o = i = lt) &&
              ((i = yb(i, t.type, t.pendingProps, va)),
              i !== null
                ? ((t.stateNode = i),
                  (zt = t),
                  (lt = wa(i.firstChild)),
                  (va = !1),
                  (o = !0))
                : (o = !1)),
            o || En(t)),
          Fn(t),
          (o = t.type),
          (s = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (i = s.children),
          qc(o, s) ? (i = null) : d !== null && qc(o, d) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((o = ks(e, t, O0, null, null, n)), (gr._currentValue = o)),
          Oo(e, t),
          Nt(e, t, i, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            Be &&
            ((e = n = lt) &&
              ((n = vb(n, t.pendingProps, va)),
              n !== null
                ? ((t.stateNode = n), (zt = t), (lt = null), (e = !0))
                : (e = !1)),
            e || En(t)),
          null
        );
      case 13:
        return im(e, t, n);
      case 4:
        return (
          vt(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = dl(t, null, i, n)) : Nt(e, t, i, n),
          t.child
        );
      case 11:
        return Fh(e, t, t.type, t.pendingProps, n);
      case 7:
        return (Nt(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Nt(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Nt(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (i = t.pendingProps),
          Cn(t, t.type, i.value),
          Nt(e, t, i.children, n),
          t.child
        );
      case 9:
        return (
          (o = t.type._context),
          (i = t.pendingProps.children),
          ul(t),
          (o = Ot(o)),
          (i = i(o)),
          (t.flags |= 1),
          Nt(e, t, i, n),
          t.child
        );
      case 14:
        return Ph(e, t, t.type, t.pendingProps, n);
      case 15:
        return Wh(e, t, t.type, t.pendingProps, n);
      case 19:
        return om(e, t, n);
      case 31:
        return q0(e, t, n);
      case 22:
        return Ih(e, t, n, t.pendingProps);
      case 24:
        return (
          ul(t),
          (i = Ot(wt)),
          e === null
            ? ((o = Rs()),
              o === null &&
                ((o = et),
                (s = js()),
                (o.pooledCache = s),
                s.refCount++,
                s !== null && (o.pooledCacheLanes |= n),
                (o = s)),
              (t.memoizedState = { parent: i, cache: o }),
              zs(t),
              Cn(t, wt, o))
            : ((e.lanes & n) !== 0 && (Os(e, t), Ji(t, null, null, n), Ki()),
              (o = e.memoizedState),
              (s = t.memoizedState),
              o.parent !== i
                ? ((o = { parent: i, cache: i }),
                  (t.memoizedState = o),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = o),
                  Cn(t, wt, i))
                : ((i = s.cache),
                  Cn(t, wt, i),
                  i !== o.cache && As(t, [wt], n, !0))),
          Nt(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function nn(e) {
    e.flags |= 4;
  }
  function hc(e, t, n, i, o) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (o & 335544128) === o))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Lm()) e.flags |= 8192;
        else throw ((fl = yo), Ds);
    } else e.flags &= -16777217;
  }
  function sm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Cg(t)))
      if (Lm()) e.flags |= 8192;
      else throw ((fl = yo), Ds);
  }
  function _o(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? zi() : 536870912), (e.lanes |= t), (ni |= t)));
  }
  function tr(e, t) {
    if (!Be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var i = null; n !== null; )
            (n.alternate !== null && (i = n), (n = n.sibling));
          i === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function it(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      i = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (i |= o.subtreeFlags & 65011712),
          (i |= o.flags & 65011712),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (i |= o.subtreeFlags),
          (i |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = n), t);
  }
  function V0(e, t, n) {
    var i = t.pendingProps;
    switch ((xs(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (it(t), null);
      case 1:
        return (it(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          t.memoizedState.cache !== i && (t.flags |= 2048),
          Ia(wt),
          We(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (Gl(t)
              ? nn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Es())),
          it(t),
          null
        );
      case 26:
        var o = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (nn(t),
              s !== null ? (it(t), sm(t, s)) : (it(t), hc(t, o, null, i, n)))
            : s
              ? s !== e.memoizedState
                ? (nn(t), it(t), sm(t, s))
                : (it(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== i && nn(t),
                it(t),
                hc(t, o, e, i, n)),
          null
        );
      case 27:
        if (
          (Al(t),
          (n = pe.current),
          (o = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== i && nn(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return (it(t), null);
          }
          ((e = F.current),
            Gl(t) ? Vd(t) : ((e = pg(o, i, n)), (t.stateNode = e), nn(t)));
        }
        return (it(t), null);
      case 5:
        if ((Al(t), (o = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== i && nn(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return (it(t), null);
          }
          if (((s = F.current), Gl(t))) Vd(t);
          else {
            var d = Jo(pe.current);
            switch (s) {
              case 1:
                s = d.createElementNS("http://www.w3.org/2000/svg", o);
                break;
              case 2:
                s = d.createElementNS("http://www.w3.org/1998/Math/MathML", o);
                break;
              default:
                switch (o) {
                  case "svg":
                    s = d.createElementNS("http://www.w3.org/2000/svg", o);
                    break;
                  case "math":
                    s = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o,
                    );
                    break;
                  case "script":
                    ((s = d.createElement("div")),
                      (s.innerHTML = "<script><\/script>"),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case "select":
                    ((s =
                      typeof i.is == "string"
                        ? d.createElement("select", { is: i.is })
                        : d.createElement("select")),
                      i.multiple
                        ? (s.multiple = !0)
                        : i.size && (s.size = i.size));
                    break;
                  default:
                    s =
                      typeof i.is == "string"
                        ? d.createElement(o, { is: i.is })
                        : d.createElement(o);
                }
            }
            ((s[J] = t), (s[W] = i));
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6) s.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ((d.child.return = d), (d = d.child));
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t) break e;
                d = d.return;
              }
              ((d.sibling.return = d.return), (d = d.sibling));
            }
            t.stateNode = s;
            e: switch ((_t(s, o, i), o)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && nn(t);
          }
        }
        return (
          it(t),
          hc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && nn(t);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(u(166));
          if (((e = pe.current), Gl(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (i = null),
              (o = zt),
              o !== null)
            )
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            ((e[J] = t),
              (e = !!(
                e.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                ig(e.nodeValue, n)
              )),
              e || En(t, !0));
          } else ((e = Jo(e).createTextNode(i)), (e[J] = t), (t.stateNode = e));
        }
        return (it(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((i = Gl(t)), n !== null)) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(u(557));
              e[J] = t;
            } else
              (rl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (it(t), (e = !1));
          } else
            ((n = Es()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (aa(t), t) : (aa(t), null);
          if ((t.flags & 128) !== 0) throw Error(u(558));
        }
        return (it(t), null);
      case 13:
        if (
          ((i = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((o = Gl(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(u(318));
              if (
                ((o = t.memoizedState),
                (o = o !== null ? o.dehydrated : null),
                !o)
              )
                throw Error(u(317));
              o[J] = t;
            } else
              (rl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (it(t), (o = !1));
          } else
            ((o = Es()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = o),
              (o = !0));
          if (!o) return t.flags & 256 ? (aa(t), t) : (aa(t), null);
        }
        return (
          aa(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = i !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((i = t.child),
                (o = null),
                i.alternate !== null &&
                  i.alternate.memoizedState !== null &&
                  i.alternate.memoizedState.cachePool !== null &&
                  (o = i.alternate.memoizedState.cachePool.pool),
                (s = null),
                i.memoizedState !== null &&
                  i.memoizedState.cachePool !== null &&
                  (s = i.memoizedState.cachePool.pool),
                s !== o && (i.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              _o(t, t.updateQueue),
              it(t),
              null)
        );
      case 4:
        return (We(), e === null && Lc(t.stateNode.containerInfo), it(t), null);
      case 10:
        return (Ia(t.type), it(t), null);
      case 19:
        if ((k(ht), (i = t.memoizedState), i === null)) return (it(t), null);
        if (((o = (t.flags & 128) !== 0), (s = i.rendering), s === null))
          if (o) tr(i, !1);
          else {
            if (ft !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = xo(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      tr(i, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      _o(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;
                  )
                    (Bd(n, e), (n = n.sibling));
                  return (
                    K(ht, (ht.current & 1) | 2),
                    Be && Pa(t, i.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            i.tail !== null &&
              qt() > ko &&
              ((t.flags |= 128), (o = !0), tr(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!o)
            if (((e = xo(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (o = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                _o(t, e),
                tr(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !s.alternate &&
                  !Be)
              )
                return (it(t), null);
            } else
              2 * qt() - i.renderingStartTime > ko &&
                n !== 536870912 &&
                ((t.flags |= 128), (o = !0), tr(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = i.last),
              e !== null ? (e.sibling = s) : (t.child = s),
              (i.last = s));
        }
        return i.tail !== null
          ? ((e = i.tail),
            (i.rendering = e),
            (i.tail = e.sibling),
            (i.renderingStartTime = qt()),
            (e.sibling = null),
            (n = ht.current),
            K(ht, o ? (n & 1) | 2 : n & 1),
            Be && Pa(t, i.treeForkCount),
            e)
          : (it(t), null);
      case 22:
      case 23:
        return (
          aa(t),
          Us(),
          (i = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== i && (t.flags |= 8192)
            : i && (t.flags |= 8192),
          i
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (it(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : it(t),
          (n = t.updateQueue),
          n !== null && _o(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (i = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (i = t.memoizedState.cachePool.pool),
          i !== n && (t.flags |= 2048),
          e !== null && k(sl),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Ia(wt),
          it(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function X0(e, t) {
    switch ((xs(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Ia(wt),
          We(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Al(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((aa(t), t.alternate === null)) throw Error(u(340));
          rl();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (aa(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          rl();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (k(ht), null);
      case 4:
        return (We(), null);
      case 10:
        return (Ia(t.type), null);
      case 22:
      case 23:
        return (
          aa(t),
          Us(),
          e !== null && k(sl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Ia(wt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cm(e, t) {
    switch ((xs(t), t.tag)) {
      case 3:
        (Ia(wt), We());
        break;
      case 26:
      case 27:
      case 5:
        Al(t);
        break;
      case 4:
        We();
        break;
      case 31:
        t.memoizedState !== null && aa(t);
        break;
      case 13:
        aa(t);
        break;
      case 19:
        k(ht);
        break;
      case 10:
        Ia(t.type);
        break;
      case 22:
      case 23:
        (aa(t), Us(), e !== null && k(sl));
        break;
      case 24:
        Ia(wt);
    }
  }
  function ar(e, t) {
    try {
      var n = t.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var s = n.create,
              d = n.inst;
            ((i = s()), (d.destroy = i));
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (p) {
      $e(t, t.return, p);
    }
  }
  function Dn(e, t, n) {
    try {
      var i = t.updateQueue,
        o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var s = o.next;
        i = s;
        do {
          if ((i.tag & e) === e) {
            var d = i.inst,
              p = d.destroy;
            if (p !== void 0) {
              ((d.destroy = void 0), (o = t));
              var x = n,
                z = p;
              try {
                z();
              } catch (H) {
                $e(o, x, H);
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (H) {
      $e(t, t.return, H);
    }
  }
  function fm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        th(t, n);
      } catch (i) {
        $e(e, e.return, i);
      }
    }
  }
  function dm(e, t, n) {
    ((n.props = ml(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      $e(e, t, i);
    }
  }
  function nr(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(i)) : (n.current = i);
      }
    } catch (o) {
      $e(e, t, o);
    }
  }
  function ka(e, t) {
    var n = e.ref,
      i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (o) {
          $e(e, t, o);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (o) {
          $e(e, t, o);
        }
      else n.current = null;
  }
  function hm(e) {
    var t = e.type,
      n = e.memoizedProps,
      i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (o) {
      $e(e, e.return, o);
    }
  }
  function mc(e, t, n) {
    try {
      var i = e.stateNode;
      (fb(i, e.type, n, t), (i[W] = t));
    } catch (o) {
      $e(e, e.return, o);
    }
  }
  function mm(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Bn(e.type)) ||
      e.tag === 4
    );
  }
  function gc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || mm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Bn(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function pc(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Ka)));
    else if (
      i !== 4 &&
      (i === 27 && Bn(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (pc(e, t, n), e = e.sibling; e !== null; )
        (pc(e, t, n), (e = e.sibling));
  }
  function Lo(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      i !== 4 &&
      (i === 27 && Bn(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (Lo(e, t, n), e = e.sibling; e !== null; )
        (Lo(e, t, n), (e = e.sibling));
  }
  function gm(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      (_t(t, i, n), (t[J] = e), (t[W] = n));
    } catch (s) {
      $e(e, e.return, s);
    }
  }
  var ln = !1,
    Et = !1,
    yc = !1,
    pm = typeof WeakSet == "function" ? WeakSet : Set,
    Rt = null;
  function G0(e, t) {
    if (((e = e.containerInfo), (Hc = au), (e = Md(e)), cs(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var o = i.anchorOffset,
              s = i.focusNode;
            i = i.focusOffset;
            try {
              (n.nodeType, s.nodeType);
            } catch {
              n = null;
              break e;
            }
            var d = 0,
              p = -1,
              x = -1,
              z = 0,
              H = 0,
              Y = e,
              O = null;
            t: for (;;) {
              for (
                var L;
                Y !== n || (o !== 0 && Y.nodeType !== 3) || (p = d + o),
                  Y !== s || (i !== 0 && Y.nodeType !== 3) || (x = d + i),
                  Y.nodeType === 3 && (d += Y.nodeValue.length),
                  (L = Y.firstChild) !== null;
              )
                ((O = Y), (Y = L));
              for (;;) {
                if (Y === e) break t;
                if (
                  (O === n && ++z === o && (p = d),
                  O === s && ++H === i && (x = d),
                  (L = Y.nextSibling) !== null)
                )
                  break;
                ((Y = O), (O = Y.parentNode));
              }
              Y = L;
            }
            n = p === -1 || x === -1 ? null : { start: p, end: x };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      kc = { focusedElem: e, selectionRange: n }, au = !1, Rt = t;
      Rt !== null;
    )
      if (
        ((t = Rt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (Rt = e));
      else
        for (; Rt !== null; ) {
          switch (((t = Rt), (s = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (n = 0; n < e.length; n++)
                  ((o = e[n]), (o.ref.impl = o.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                ((e = void 0),
                  (n = t),
                  (o = s.memoizedProps),
                  (s = s.memoizedState),
                  (i = n.stateNode));
                try {
                  var ne = ml(n.type, o);
                  ((e = i.getSnapshotBeforeUpdate(ne, s)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ge) {
                  $e(n, n.return, ge);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  Vc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Vc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Rt = e));
            break;
          }
          Rt = t.return;
        }
  }
  function ym(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (on(e, n), i & 4 && ar(5, n));
        break;
      case 1:
        if ((on(e, n), i & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (d) {
              $e(n, n.return, d);
            }
          else {
            var o = ml(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(o, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (d) {
              $e(n, n.return, d);
            }
          }
        (i & 64 && fm(n), i & 512 && nr(n, n.return));
        break;
      case 3:
        if ((on(e, n), i & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            th(e, t);
          } catch (d) {
            $e(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && i & 4 && gm(n);
      case 26:
      case 5:
        (on(e, n), t === null && i & 4 && hm(n), i & 512 && nr(n, n.return));
        break;
      case 12:
        on(e, n);
        break;
      case 31:
        (on(e, n), i & 4 && wm(e, n));
        break;
      case 13:
        (on(e, n),
          i & 4 && xm(e, n),
          i & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = I0.bind(null, n)), bb(e, n)))));
        break;
      case 22:
        if (((i = n.memoizedState !== null || ln), !i)) {
          ((t = (t !== null && t.memoizedState !== null) || Et), (o = ln));
          var s = Et;
          ((ln = i),
            (Et = t) && !s ? un(e, n, (n.subtreeFlags & 8772) !== 0) : on(e, n),
            (ln = o),
            (Et = s));
        }
        break;
      case 30:
        break;
      default:
        on(e, n);
    }
  }
  function vm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), vm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ie(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var rt = null,
    $t = !1;
  function rn(e, t, n) {
    for (n = n.child; n !== null; ) (bm(e, t, n), (n = n.sibling));
  }
  function bm(e, t, n) {
    if (Yt && typeof Yt.onCommitFiberUnmount == "function")
      try {
        Yt.onCommitFiberUnmount(Za, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Et || ka(n, t),
          rn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Et || ka(n, t);
        var i = rt,
          o = $t;
        (Bn(n.type) && ((rt = n.stateNode), ($t = !1)),
          rn(e, t, n),
          dr(n.stateNode),
          (rt = i),
          ($t = o));
        break;
      case 5:
        Et || ka(n, t);
      case 6:
        if (
          ((i = rt),
          (o = $t),
          (rt = null),
          rn(e, t, n),
          (rt = i),
          ($t = o),
          rt !== null)
        )
          if ($t)
            try {
              (rt.nodeType === 9
                ? rt.body
                : rt.nodeName === "HTML"
                  ? rt.ownerDocument.body
                  : rt
              ).removeChild(n.stateNode);
            } catch (s) {
              $e(n, t, s);
            }
          else
            try {
              rt.removeChild(n.stateNode);
            } catch (s) {
              $e(n, t, s);
            }
        break;
      case 18:
        rt !== null &&
          ($t
            ? ((e = rt),
              fg(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                n.stateNode,
              ),
              fi(e))
            : fg(rt, n.stateNode));
        break;
      case 4:
        ((i = rt),
          (o = $t),
          (rt = n.stateNode.containerInfo),
          ($t = !0),
          rn(e, t, n),
          (rt = i),
          ($t = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Dn(2, n, t), Et || Dn(4, n, t), rn(e, t, n));
        break;
      case 1:
        (Et ||
          (ka(n, t),
          (i = n.stateNode),
          typeof i.componentWillUnmount == "function" && dm(n, t, i)),
          rn(e, t, n));
        break;
      case 21:
        rn(e, t, n);
        break;
      case 22:
        ((Et = (i = Et) || n.memoizedState !== null), rn(e, t, n), (Et = i));
        break;
      default:
        rn(e, t, n);
    }
  }
  function wm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        fi(e);
      } catch (n) {
        $e(t, t.return, n);
      }
    }
  }
  function xm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        fi(e);
      } catch (n) {
        $e(t, t.return, n);
      }
  }
  function Q0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new pm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new pm()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Uo(e, t) {
    var n = Q0(e);
    t.forEach(function (i) {
      if (!n.has(i)) {
        n.add(i);
        var o = eb.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Kt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var o = n[i],
          s = e,
          d = t,
          p = d;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (Bn(p.type)) {
                ((rt = p.stateNode), ($t = !1));
                break e;
              }
              break;
            case 5:
              ((rt = p.stateNode), ($t = !1));
              break e;
            case 3:
            case 4:
              ((rt = p.stateNode.containerInfo), ($t = !0));
              break e;
          }
          p = p.return;
        }
        if (rt === null) throw Error(u(160));
        (bm(s, d, o),
          (rt = null),
          ($t = !1),
          (s = o.alternate),
          s !== null && (s.return = null),
          (o.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (Sm(t, e), (t = t.sibling));
  }
  var Da = null;
  function Sm(e, t) {
    var n = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Kt(t, e),
          Jt(e),
          i & 4 && (Dn(3, e, e.return), ar(3, e), Dn(5, e, e.return)));
        break;
      case 1:
        (Kt(t, e),
          Jt(e),
          i & 512 && (Et || n === null || ka(n, n.return)),
          i & 64 &&
            ln &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
        break;
      case 26:
        var o = Da;
        if (
          (Kt(t, e),
          Jt(e),
          i & 512 && (Et || n === null || ka(n, n.return)),
          i & 4)
        ) {
          var s = n !== null ? n.memoizedState : null;
          if (((i = e.memoizedState), n === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ((i = e.type),
                    (n = e.memoizedProps),
                    (o = o.ownerDocument || o));
                  t: switch (i) {
                    case "title":
                      ((s = o.getElementsByTagName("title")[0]),
                        (!s ||
                          s[Re] ||
                          s[J] ||
                          s.namespaceURI === "http://www.w3.org/2000/svg" ||
                          s.hasAttribute("itemprop")) &&
                          ((s = o.createElement(i)),
                          o.head.insertBefore(
                            s,
                            o.querySelector("head > title"),
                          )),
                        _t(s, i, n),
                        (s[J] = e),
                        tt(s),
                        (i = s));
                      break e;
                    case "link":
                      var d = Sg("link", "href", o).get(i + (n.href || ""));
                      if (d) {
                        for (var p = 0; p < d.length; p++)
                          if (
                            ((s = d[p]),
                            s.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              s.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              s.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              s.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            d.splice(p, 1);
                            break t;
                          }
                      }
                      ((s = o.createElement(i)),
                        _t(s, i, n),
                        o.head.appendChild(s));
                      break;
                    case "meta":
                      if (
                        (d = Sg("meta", "content", o).get(
                          i + (n.content || ""),
                        ))
                      ) {
                        for (p = 0; p < d.length; p++)
                          if (
                            ((s = d[p]),
                            s.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              s.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              s.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              s.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              s.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            d.splice(p, 1);
                            break t;
                          }
                      }
                      ((s = o.createElement(i)),
                        _t(s, i, n),
                        o.head.appendChild(s));
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  ((s[J] = e), tt(s), (i = s));
                }
                e.stateNode = i;
              } else Eg(o, e.type, e.stateNode);
            else e.stateNode = xg(o, i, e.memoizedProps);
          else
            s !== i
              ? (s === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : s.count--,
                i === null
                  ? Eg(o, e.type, e.stateNode)
                  : xg(o, i, e.memoizedProps))
              : i === null &&
                e.stateNode !== null &&
                mc(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Kt(t, e),
          Jt(e),
          i & 512 && (Et || n === null || ka(n, n.return)),
          n !== null && i & 4 && mc(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (Kt(t, e),
          Jt(e),
          i & 512 && (Et || n === null || ka(n, n.return)),
          e.flags & 32)
        ) {
          o = e.stateNode;
          try {
            _l(o, "");
          } catch (ne) {
            $e(e, e.return, ne);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((o = e.memoizedProps), mc(e, o, n !== null ? n.memoizedProps : o)),
          i & 1024 && (yc = !0));
        break;
      case 6:
        if ((Kt(t, e), Jt(e), i & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((i = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = i;
          } catch (ne) {
            $e(e, e.return, ne);
          }
        }
        break;
      case 3:
        if (
          ((Wo = null),
          (o = Da),
          (Da = Fo(t.containerInfo)),
          Kt(t, e),
          (Da = o),
          Jt(e),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            fi(t.containerInfo);
          } catch (ne) {
            $e(e, e.return, ne);
          }
        yc && ((yc = !1), Em(e));
        break;
      case 4:
        ((i = Da),
          (Da = Fo(e.stateNode.containerInfo)),
          Kt(t, e),
          Jt(e),
          (Da = i));
        break;
      case 12:
        (Kt(t, e), Jt(e));
        break;
      case 31:
        (Kt(t, e),
          Jt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), Uo(e, i))));
        break;
      case 13:
        (Kt(t, e),
          Jt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Ho = qt()),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), Uo(e, i))));
        break;
      case 22:
        o = e.memoizedState !== null;
        var x = n !== null && n.memoizedState !== null,
          z = ln,
          H = Et;
        if (
          ((ln = z || o),
          (Et = H || x),
          Kt(t, e),
          (Et = H),
          (ln = z),
          Jt(e),
          i & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = o ? t._visibility & -2 : t._visibility | 1,
              o && (n === null || x || ln || Et || gl(e)),
              n = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                x = n = t;
                try {
                  if (((s = x.stateNode), o))
                    ((d = s.style),
                      typeof d.setProperty == "function"
                        ? d.setProperty("display", "none", "important")
                        : (d.display = "none"));
                  else {
                    p = x.stateNode;
                    var Y = x.memoizedProps.style,
                      O =
                        Y != null && Y.hasOwnProperty("display")
                          ? Y.display
                          : null;
                    p.style.display =
                      O == null || typeof O == "boolean" ? "" : ("" + O).trim();
                  }
                } catch (ne) {
                  $e(x, x.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = o ? "" : x.memoizedProps;
                } catch (ne) {
                  $e(x, x.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                x = t;
                try {
                  var L = x.stateNode;
                  o ? dg(L, !0) : dg(x.stateNode, !1);
                } catch (ne) {
                  $e(x, x.return, ne);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (n === t && (n = null), (t = t.return));
            }
            (n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        i & 4 &&
          ((i = e.updateQueue),
          i !== null &&
            ((n = i.retryQueue),
            n !== null && ((i.retryQueue = null), Uo(e, n))));
        break;
      case 19:
        (Kt(t, e),
          Jt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), Uo(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Kt(t, e), Jt(e));
    }
  }
  function Jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (mm(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var o = n.stateNode,
              s = gc(e);
            Lo(e, s, o);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (_l(d, ""), (n.flags &= -33));
            var p = gc(e);
            Lo(e, p, d);
            break;
          case 3:
          case 4:
            var x = n.stateNode.containerInfo,
              z = gc(e);
            pc(e, z, x);
            break;
          default:
            throw Error(u(161));
        }
      } catch (H) {
        $e(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Em(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Em(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function on(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (ym(e, t.alternate, t), (t = t.sibling));
  }
  function gl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Dn(4, t, t.return), gl(t));
          break;
        case 1:
          ka(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && dm(t, t.return, n),
            gl(t));
          break;
        case 27:
          dr(t.stateNode);
        case 26:
        case 5:
          (ka(t, t.return), gl(t));
          break;
        case 22:
          t.memoizedState === null && gl(t);
          break;
        case 30:
          gl(t);
          break;
        default:
          gl(t);
      }
      e = e.sibling;
    }
  }
  function un(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate,
        o = e,
        s = t,
        d = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (un(o, s, n), ar(4, s));
          break;
        case 1:
          if (
            (un(o, s, n),
            (i = s),
            (o = i.stateNode),
            typeof o.componentDidMount == "function")
          )
            try {
              o.componentDidMount();
            } catch (z) {
              $e(i, i.return, z);
            }
          if (((i = s), (o = i.updateQueue), o !== null)) {
            var p = i.stateNode;
            try {
              var x = o.shared.hiddenCallbacks;
              if (x !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < x.length; o++)
                  eh(x[o], p);
            } catch (z) {
              $e(i, i.return, z);
            }
          }
          (n && d & 64 && fm(s), nr(s, s.return));
          break;
        case 27:
          gm(s);
        case 26:
        case 5:
          (un(o, s, n), n && i === null && d & 4 && hm(s), nr(s, s.return));
          break;
        case 12:
          un(o, s, n);
          break;
        case 31:
          (un(o, s, n), n && d & 4 && wm(o, s));
          break;
        case 13:
          (un(o, s, n), n && d & 4 && xm(o, s));
          break;
        case 22:
          (s.memoizedState === null && un(o, s, n), nr(s, s.return));
          break;
        case 30:
          break;
        default:
          un(o, s, n);
      }
      t = t.sibling;
    }
  }
  function vc(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && Xi(n)));
  }
  function bc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Xi(e)));
  }
  function za(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Cm(e, t, n, i), (t = t.sibling));
  }
  function Cm(e, t, n, i) {
    var o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (za(e, t, n, i), o & 2048 && ar(9, t));
        break;
      case 1:
        za(e, t, n, i);
        break;
      case 3:
        (za(e, t, n, i),
          o & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Xi(e))));
        break;
      case 12:
        if (o & 2048) {
          (za(e, t, n, i), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              d = s.id,
              p = s.onPostCommit;
            typeof p == "function" &&
              p(
                d,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (x) {
            $e(t, t.return, x);
          }
        } else za(e, t, n, i);
        break;
      case 31:
        za(e, t, n, i);
        break;
      case 13:
        za(e, t, n, i);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (d = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? za(e, t, n, i)
              : lr(e, t)
            : s._visibility & 2
              ? za(e, t, n, i)
              : ((s._visibility |= 2),
                ei(e, t, n, i, (t.subtreeFlags & 10256) !== 0 || !1)),
          o & 2048 && vc(d, t));
        break;
      case 24:
        (za(e, t, n, i), o & 2048 && bc(t.alternate, t));
        break;
      default:
        za(e, t, n, i);
    }
  }
  function ei(e, t, n, i, o) {
    for (
      o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var s = e,
        d = t,
        p = n,
        x = i,
        z = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (ei(s, d, p, x, o), ar(8, d));
          break;
        case 23:
          break;
        case 22:
          var H = d.stateNode;
          (d.memoizedState !== null
            ? H._visibility & 2
              ? ei(s, d, p, x, o)
              : lr(s, d)
            : ((H._visibility |= 2), ei(s, d, p, x, o)),
            o && z & 2048 && vc(d.alternate, d));
          break;
        case 24:
          (ei(s, d, p, x, o), o && z & 2048 && bc(d.alternate, d));
          break;
        default:
          ei(s, d, p, x, o);
      }
      t = t.sibling;
    }
  }
  function lr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          i = t,
          o = i.flags;
        switch (i.tag) {
          case 22:
            (lr(n, i), o & 2048 && vc(i.alternate, i));
            break;
          case 24:
            (lr(n, i), o & 2048 && bc(i.alternate, i));
            break;
          default:
            lr(n, i);
        }
        t = t.sibling;
      }
  }
  var ir = 8192;
  function ti(e, t, n) {
    if (e.subtreeFlags & ir)
      for (e = e.child; e !== null; ) (Tm(e, t, n), (e = e.sibling));
  }
  function Tm(e, t, n) {
    switch (e.tag) {
      case 26:
        (ti(e, t, n),
          e.flags & ir &&
            e.memoizedState !== null &&
            zb(n, Da, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ti(e, t, n);
        break;
      case 3:
      case 4:
        var i = Da;
        ((Da = Fo(e.stateNode.containerInfo)), ti(e, t, n), (Da = i));
        break;
      case 22:
        e.memoizedState === null &&
          ((i = e.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = ir), (ir = 16777216), ti(e, t, n), (ir = i))
            : ti(e, t, n));
        break;
      default:
        ti(e, t, n);
    }
  }
  function Am(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function rr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Rt = i), Mm(i, e));
        }
      Am(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (jm(e), (e = e.sibling));
  }
  function jm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (rr(e), e.flags & 2048 && Dn(9, e, e.return));
        break;
      case 3:
        rr(e);
        break;
      case 12:
        rr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Bo(e))
          : rr(e);
        break;
      default:
        rr(e);
    }
  }
  function Bo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Rt = i), Mm(i, e));
        }
      Am(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Dn(8, t, t.return), Bo(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Bo(t)));
          break;
        default:
          Bo(t);
      }
      e = e.sibling;
    }
  }
  function Mm(e, t) {
    for (; Rt !== null; ) {
      var n = Rt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Dn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Xi(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (Rt = i));
      else
        e: for (n = e; Rt !== null; ) {
          i = Rt;
          var o = i.sibling,
            s = i.return;
          if ((vm(i), i === n)) {
            Rt = null;
            break e;
          }
          if (o !== null) {
            ((o.return = s), (Rt = o));
            break e;
          }
          Rt = s;
        }
    }
  }
  var Z0 = {
      getCacheForType: function (e) {
        var t = Ot(wt),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return Ot(wt).controller.signal;
      },
    },
    $0 = typeof WeakMap == "function" ? WeakMap : Map,
    Ve = 0,
    et = null,
    ze = null,
    Ne = 0,
    Ze = 0,
    na = null,
    zn = !1,
    ai = !1,
    wc = !1,
    sn = 0,
    ft = 0,
    On = 0,
    pl = 0,
    xc = 0,
    la = 0,
    ni = 0,
    or = null,
    Ft = null,
    Sc = !1,
    Ho = 0,
    Rm = 0,
    ko = 1 / 0,
    qo = null,
    Nn = null,
    At = 0,
    _n = null,
    li = null,
    cn = 0,
    Ec = 0,
    Cc = null,
    Dm = null,
    ur = 0,
    Tc = null;
  function ia() {
    return (Ve & 2) !== 0 && Ne !== 0 ? Ne & -Ne : _.T !== null ? zc() : G();
  }
  function zm() {
    if (la === 0)
      if ((Ne & 536870912) === 0 || Be) {
        var e = $a;
        (($a <<= 1), ($a & 3932160) === 0 && ($a = 262144), (la = e));
      } else la = 536870912;
    return ((e = ta.current), e !== null && (e.flags |= 32), la);
  }
  function Pt(e, t, n) {
    (((e === et && (Ze === 2 || Ze === 9)) || e.cancelPendingCommit !== null) &&
      (ii(e, 0), Ln(e, Ne, la, !1)),
      _a(e, n),
      ((Ve & 2) === 0 || e !== et) &&
        (e === et &&
          ((Ve & 2) === 0 && (pl |= n), ft === 4 && Ln(e, Ne, la, !1)),
        qa(e)));
  }
  function Om(e, t, n) {
    if ((Ve & 6) !== 0) throw Error(u(327));
    var i = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || yn(e, t),
      o = i ? F0(e, t) : jc(e, t, !0),
      s = i;
    do {
      if (o === 0) {
        ai && !i && Ln(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), s && !K0(n))) {
          ((o = jc(e, t, !1)), (s = !1));
          continue;
        }
        if (o === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var d = 0;
          else
            ((d = e.pendingLanes & -536870913),
              (d = d !== 0 ? d : d & 536870912 ? 536870912 : 0));
          if (d !== 0) {
            t = d;
            e: {
              var p = e;
              o = or;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (ii(p, d).flags |= 256), (d = jc(p, d, !1)), d !== 2)) {
                if (wc && !x) {
                  ((p.errorRecoveryDisabledLanes |= s), (pl |= s), (o = 4));
                  break e;
                }
                ((s = Ft),
                  (Ft = o),
                  s !== null &&
                    (Ft === null ? (Ft = s) : Ft.push.apply(Ft, s)));
              }
              o = d;
            }
            if (((s = !1), o !== 2)) continue;
          }
        }
        if (o === 1) {
          (ii(e, 0), Ln(e, t, 0, !0));
          break;
        }
        e: {
          switch (((i = e), (s = o), s)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ln(i, t, la, !zn);
              break e;
            case 2:
              Ft = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((o = Ho + 300 - qt()), 10 < o)) {
            if ((Ln(i, t, la, !zn), Rl(i, 0, !0) !== 0)) break e;
            ((cn = t),
              (i.timeoutHandle = sg(
                Nm.bind(
                  null,
                  i,
                  n,
                  Ft,
                  qo,
                  Sc,
                  t,
                  la,
                  pl,
                  ni,
                  zn,
                  s,
                  "Throttled",
                  -0,
                  0,
                ),
                o,
              )));
            break e;
          }
          Nm(i, n, Ft, qo, Sc, t, la, pl, ni, zn, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    qa(e);
  }
  function Nm(e, t, n, i, o, s, d, p, x, z, H, Y, O, L) {
    if (
      ((e.timeoutHandle = -1),
      (Y = t.subtreeFlags),
      Y & 8192 || (Y & 16785408) === 16785408)
    ) {
      ((Y = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ka,
      }),
        Tm(t, s, Y));
      var ne =
        (s & 62914560) === s ? Ho - qt() : (s & 4194048) === s ? Rm - qt() : 0;
      if (((ne = Ob(Y, ne)), ne !== null)) {
        ((cn = s),
          (e.cancelPendingCommit = ne(
            Ym.bind(null, e, t, s, n, i, o, d, p, x, H, Y, null, O, L),
          )),
          Ln(e, s, d, !z));
        return;
      }
    }
    Ym(e, t, s, n, i, o, d, p, x);
  }
  function K0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var i = 0; i < n.length; i++) {
          var o = n[i],
            s = o.getSnapshot;
          o = o.value;
          try {
            if (!It(s(), o)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Ln(e, t, n, i) {
    ((t &= ~xc),
      (t &= ~pl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      i && (e.warmLanes |= t),
      (i = e.expirationTimes));
    for (var o = t; 0 < o; ) {
      var s = 31 - Lt(o),
        d = 1 << s;
      ((i[s] = -1), (o &= ~d));
    }
    n !== 0 && Jr(e, n, t);
  }
  function Yo() {
    return (Ve & 6) === 0 ? (sr(0), !1) : !0;
  }
  function Ac() {
    if (ze !== null) {
      if (Ze === 0) var e = ze.return;
      else ((e = ze), (Wa = ol = null), Vs(e), (Jl = null), (Qi = 0), (e = ze));
      for (; e !== null; ) (cm(e.alternate, e), (e = e.return));
      ze = null;
    }
  }
  function ii(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), mb(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (cn = 0),
      Ac(),
      (et = e),
      (ze = n = Fa(e.current, null)),
      (Ne = t),
      (Ze = 0),
      (na = null),
      (zn = !1),
      (ai = yn(e, t)),
      (wc = !1),
      (ni = la = xc = pl = On = ft = 0),
      (Ft = or = null),
      (Sc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var o = 31 - Lt(i),
          s = 1 << o;
        ((t |= e[o]), (i &= ~s));
      }
    return ((sn = t), oo(), n);
  }
  function _m(e, t) {
    ((xe = null),
      (_.H = Ii),
      t === Kl || t === po
        ? ((t = Fd()), (Ze = 3))
        : t === Ds
          ? ((t = Fd()), (Ze = 4))
          : (Ze =
              t === lc
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (na = t),
      ze === null && ((ft = 1), Do(e, ga(t, e.current))));
  }
  function Lm() {
    var e = ta.current;
    return e === null
      ? !0
      : (Ne & 4194048) === Ne
        ? ba === null
        : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0
          ? e === ba
          : !1;
  }
  function Um() {
    var e = _.H;
    return ((_.H = Ii), e === null ? Ii : e);
  }
  function Bm() {
    var e = _.A;
    return ((_.A = Z0), e);
  }
  function Vo() {
    ((ft = 4),
      zn || ((Ne & 4194048) !== Ne && ta.current !== null) || (ai = !0),
      ((On & 134217727) === 0 && (pl & 134217727) === 0) ||
        et === null ||
        Ln(et, Ne, la, !1));
  }
  function jc(e, t, n) {
    var i = Ve;
    Ve |= 2;
    var o = Um(),
      s = Bm();
    ((et !== e || Ne !== t) && ((qo = null), ii(e, t)), (t = !1));
    var d = ft;
    e: do
      try {
        if (Ze !== 0 && ze !== null) {
          var p = ze,
            x = na;
          switch (Ze) {
            case 8:
              (Ac(), (d = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ta.current === null && (t = !0);
              var z = Ze;
              if (((Ze = 0), (na = null), ri(e, p, x, z), n && ai)) {
                d = 0;
                break e;
              }
              break;
            default:
              ((z = Ze), (Ze = 0), (na = null), ri(e, p, x, z));
          }
        }
        (J0(), (d = ft));
        break;
      } catch (H) {
        _m(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Wa = ol = null),
      (Ve = i),
      (_.H = o),
      (_.A = s),
      ze === null && ((et = null), (Ne = 0), oo()),
      d
    );
  }
  function J0() {
    for (; ze !== null; ) Hm(ze);
  }
  function F0(e, t) {
    var n = Ve;
    Ve |= 2;
    var i = Um(),
      o = Bm();
    et !== e || Ne !== t
      ? ((qo = null), (ko = qt() + 500), ii(e, t))
      : (ai = yn(e, t));
    e: do
      try {
        if (Ze !== 0 && ze !== null) {
          t = ze;
          var s = na;
          t: switch (Ze) {
            case 1:
              ((Ze = 0), (na = null), ri(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (Kd(s)) {
                ((Ze = 0), (na = null), km(t));
                break;
              }
              ((t = function () {
                ((Ze !== 2 && Ze !== 9) || et !== e || (Ze = 7), qa(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              Kd(s)
                ? ((Ze = 0), (na = null), km(t))
                : ((Ze = 0), (na = null), ri(e, t, s, 7));
              break;
            case 5:
              var d = null;
              switch (ze.tag) {
                case 26:
                  d = ze.memoizedState;
                case 5:
                case 27:
                  var p = ze;
                  if (d ? Cg(d) : p.stateNode.complete) {
                    ((Ze = 0), (na = null));
                    var x = p.sibling;
                    if (x !== null) ze = x;
                    else {
                      var z = p.return;
                      z !== null ? ((ze = z), Xo(z)) : (ze = null);
                    }
                    break t;
                  }
              }
              ((Ze = 0), (na = null), ri(e, t, s, 5));
              break;
            case 6:
              ((Ze = 0), (na = null), ri(e, t, s, 6));
              break;
            case 8:
              (Ac(), (ft = 6));
              break e;
            default:
              throw Error(u(462));
          }
        }
        P0();
        break;
      } catch (H) {
        _m(e, H);
      }
    while (!0);
    return (
      (Wa = ol = null),
      (_.H = i),
      (_.A = o),
      (Ve = n),
      ze !== null ? 0 : ((et = null), (Ne = 0), oo(), ft)
    );
  }
  function P0() {
    for (; ze !== null && !Gu(); ) Hm(ze);
  }
  function Hm(e) {
    var t = um(e.alternate, e, sn);
    ((e.memoizedProps = e.pendingProps), t === null ? Xo(e) : (ze = t));
  }
  function km(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = am(n, t, t.pendingProps, t.type, void 0, Ne);
        break;
      case 11:
        t = am(n, t, t.pendingProps, t.type.render, t.ref, Ne);
        break;
      case 5:
        Vs(t);
      default:
        (cm(n, t), (t = ze = Bd(t, sn)), (t = um(n, t, sn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Xo(e) : (ze = t));
  }
  function ri(e, t, n, i) {
    ((Wa = ol = null), Vs(t), (Jl = null), (Qi = 0));
    var o = t.return;
    try {
      if (k0(e, o, t, n, Ne)) {
        ((ft = 1), Do(e, ga(n, e.current)), (ze = null));
        return;
      }
    } catch (s) {
      if (o !== null) throw ((ze = o), s);
      ((ft = 1), Do(e, ga(n, e.current)), (ze = null));
      return;
    }
    t.flags & 32768
      ? (Be || i === 1
          ? (e = !0)
          : ai || (Ne & 536870912) !== 0
            ? (e = !1)
            : ((zn = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = ta.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        qm(t, e))
      : Xo(t);
  }
  function Xo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        qm(t, zn);
        return;
      }
      e = t.return;
      var n = V0(t.alternate, t, sn);
      if (n !== null) {
        ze = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ze = t;
        return;
      }
      ze = t = e;
    } while (t !== null);
    ft === 0 && (ft = 5);
  }
  function qm(e, t) {
    do {
      var n = X0(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (ze = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ze = e;
        return;
      }
      ze = e = n;
    } while (e !== null);
    ((ft = 6), (ze = null));
  }
  function Ym(e, t, n, i, o, s, d, p, x) {
    e.cancelPendingCommit = null;
    do Go();
    while (At !== 0);
    if ((Ve & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= gs),
        Kr(e, n, s, d, p, x),
        e === et && ((ze = et = null), (Ne = 0)),
        (li = t),
        (_n = e),
        (cn = n),
        (Ec = s),
        (Cc = o),
        (Dm = i),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            tb(pn, function () {
              return (Zm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = _.T), (_.T = null), (o = Z.p), (Z.p = 2), (d = Ve), (Ve |= 4));
        try {
          G0(e, t, n);
        } finally {
          ((Ve = d), (Z.p = o), (_.T = i));
        }
      }
      ((At = 1), Vm(), Xm(), Gm());
    }
  }
  function Vm() {
    if (At === 1) {
      At = 0;
      var e = _n,
        t = li,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = _.T), (_.T = null));
        var i = Z.p;
        Z.p = 2;
        var o = Ve;
        Ve |= 4;
        try {
          Sm(t, e);
          var s = kc,
            d = Md(e.containerInfo),
            p = s.focusedElem,
            x = s.selectionRange;
          if (
            d !== p &&
            p &&
            p.ownerDocument &&
            jd(p.ownerDocument.documentElement, p)
          ) {
            if (x !== null && cs(p)) {
              var z = x.start,
                H = x.end;
              if ((H === void 0 && (H = z), "selectionStart" in p))
                ((p.selectionStart = z),
                  (p.selectionEnd = Math.min(H, p.value.length)));
              else {
                var Y = p.ownerDocument || document,
                  O = (Y && Y.defaultView) || window;
                if (O.getSelection) {
                  var L = O.getSelection(),
                    ne = p.textContent.length,
                    ge = Math.min(x.start, ne),
                    Fe = x.end === void 0 ? ge : Math.min(x.end, ne);
                  !L.extend && ge > Fe && ((d = Fe), (Fe = ge), (ge = d));
                  var j = Ad(p, ge),
                    T = Ad(p, Fe);
                  if (
                    j &&
                    T &&
                    (L.rangeCount !== 1 ||
                      L.anchorNode !== j.node ||
                      L.anchorOffset !== j.offset ||
                      L.focusNode !== T.node ||
                      L.focusOffset !== T.offset)
                  ) {
                    var D = Y.createRange();
                    (D.setStart(j.node, j.offset),
                      L.removeAllRanges(),
                      ge > Fe
                        ? (L.addRange(D), L.extend(T.node, T.offset))
                        : (D.setEnd(T.node, T.offset), L.addRange(D)));
                  }
                }
              }
            }
            for (Y = [], L = p; (L = L.parentNode); )
              L.nodeType === 1 &&
                Y.push({ element: L, left: L.scrollLeft, top: L.scrollTop });
            for (
              typeof p.focus == "function" && p.focus(), p = 0;
              p < Y.length;
              p++
            ) {
              var q = Y[p];
              ((q.element.scrollLeft = q.left), (q.element.scrollTop = q.top));
            }
          }
          ((au = !!Hc), (kc = Hc = null));
        } finally {
          ((Ve = o), (Z.p = i), (_.T = n));
        }
      }
      ((e.current = t), (At = 2));
    }
  }
  function Xm() {
    if (At === 2) {
      At = 0;
      var e = _n,
        t = li,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = _.T), (_.T = null));
        var i = Z.p;
        Z.p = 2;
        var o = Ve;
        Ve |= 4;
        try {
          ym(e, t.alternate, t);
        } finally {
          ((Ve = o), (Z.p = i), (_.T = n));
        }
      }
      At = 3;
    }
  }
  function Gm() {
    if (At === 4 || At === 3) {
      ((At = 0), Qu());
      var e = _n,
        t = li,
        n = cn,
        i = Dm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (At = 5)
        : ((At = 0), (li = _n = null), Qm(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (
        (o === 0 && (Nn = null),
        N(n),
        (t = t.stateNode),
        Yt && typeof Yt.onCommitFiberRoot == "function")
      )
        try {
          Yt.onCommitFiberRoot(Za, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((t = _.T), (o = Z.p), (Z.p = 2), (_.T = null));
        try {
          for (var s = e.onRecoverableError, d = 0; d < i.length; d++) {
            var p = i[d];
            s(p.value, { componentStack: p.stack });
          }
        } finally {
          ((_.T = t), (Z.p = o));
        }
      }
      ((cn & 3) !== 0 && Go(),
        qa(e),
        (o = e.pendingLanes),
        (n & 261930) !== 0 && (o & 42) !== 0
          ? e === Tc
            ? ur++
            : ((ur = 0), (Tc = e))
          : (ur = 0),
        sr(0));
    }
  }
  function Qm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Xi(t)));
  }
  function Go() {
    return (Vm(), Xm(), Gm(), Zm());
  }
  function Zm() {
    if (At !== 5) return !1;
    var e = _n,
      t = Ec;
    Ec = 0;
    var n = N(cn),
      i = _.T,
      o = Z.p;
    try {
      ((Z.p = 32 > n ? 32 : n), (_.T = null), (n = Cc), (Cc = null));
      var s = _n,
        d = cn;
      if (((At = 0), (li = _n = null), (cn = 0), (Ve & 6) !== 0))
        throw Error(u(331));
      var p = Ve;
      if (
        ((Ve |= 4),
        jm(s.current),
        Cm(s, s.current, d, n),
        (Ve = p),
        sr(0, !1),
        Yt && typeof Yt.onPostCommitFiberRoot == "function")
      )
        try {
          Yt.onPostCommitFiberRoot(Za, s);
        } catch {}
      return !0;
    } finally {
      ((Z.p = o), (_.T = i), Qm(e, t));
    }
  }
  function $m(e, t, n) {
    ((t = ga(n, t)),
      (t = nc(e.stateNode, t, 2)),
      (e = jn(e, t, 2)),
      e !== null && (_a(e, 2), qa(e)));
  }
  function $e(e, t, n) {
    if (e.tag === 3) $m(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          $m(t, e, n);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (Nn === null || !Nn.has(i)))
          ) {
            ((e = ga(n, e)),
              (n = Kh(2)),
              (i = jn(t, n, 2)),
              i !== null && (Jh(n, i, t, e), _a(i, 2), qa(i)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Mc(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new $0();
      var o = new Set();
      i.set(t, o);
    } else ((o = i.get(t)), o === void 0 && ((o = new Set()), i.set(t, o)));
    o.has(n) ||
      ((wc = !0), o.add(n), (e = W0.bind(null, e, t, n)), t.then(e, e));
  }
  function W0(e, t, n) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      et === e &&
        (Ne & n) === n &&
        (ft === 4 || (ft === 3 && (Ne & 62914560) === Ne && 300 > qt() - Ho)
          ? (Ve & 2) === 0 && ii(e, 0)
          : (xc |= n),
        ni === Ne && (ni = 0)),
      qa(e));
  }
  function Km(e, t) {
    (t === 0 && (t = zi()), (e = ll(e, t)), e !== null && (_a(e, t), qa(e)));
  }
  function I0(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), Km(e, n));
  }
  function eb(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode,
          o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (i !== null && i.delete(t), Km(e, n));
  }
  function tb(e, t) {
    return Ml(e, t);
  }
  var Qo = null,
    oi = null,
    Rc = !1,
    Zo = !1,
    Dc = !1,
    Un = 0;
  function qa(e) {
    (e !== oi &&
      e.next === null &&
      (oi === null ? (Qo = oi = e) : (oi = oi.next = e)),
      (Zo = !0),
      Rc || ((Rc = !0), nb()));
  }
  function sr(e, t) {
    if (!Dc && Zo) {
      Dc = !0;
      do
        for (var n = !1, i = Qo; i !== null; ) {
          if (e !== 0) {
            var o = i.pendingLanes;
            if (o === 0) var s = 0;
            else {
              var d = i.suspendedLanes,
                p = i.pingedLanes;
              ((s = (1 << (31 - Lt(42 | e) + 1)) - 1),
                (s &= o & ~(d & ~p)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((n = !0), Wm(i, s));
          } else
            ((s = Ne),
              (s = Rl(
                i,
                i === et ? s : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1,
              )),
              (s & 3) === 0 || yn(i, s) || ((n = !0), Wm(i, s)));
          i = i.next;
        }
      while (n);
      Dc = !1;
    }
  }
  function ab() {
    Jm();
  }
  function Jm() {
    Zo = Rc = !1;
    var e = 0;
    Un !== 0 && hb() && (e = Un);
    for (var t = qt(), n = null, i = Qo; i !== null; ) {
      var o = i.next,
        s = Fm(i, t);
      (s === 0
        ? ((i.next = null),
          n === null ? (Qo = o) : (n.next = o),
          o === null && (oi = n))
        : ((n = i), (e !== 0 || (s & 3) !== 0) && (Zo = !0)),
        (i = o));
    }
    ((At !== 0 && At !== 5) || sr(e), Un !== 0 && (Un = 0));
  }
  function Fm(e, t) {
    for (
      var n = e.suspendedLanes,
        i = e.pingedLanes,
        o = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var d = 31 - Lt(s),
        p = 1 << d,
        x = o[d];
      (x === -1
        ? ((p & n) === 0 || (p & i) !== 0) && (o[d] = Ku(p, t))
        : x <= t && (e.expiredLanes |= p),
        (s &= ~p));
    }
    if (
      ((t = et),
      (n = Ne),
      (n = Rl(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (i = e.callbackNode),
      n === 0 ||
        (e === t && (Ze === 2 || Ze === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && Ri(i),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || yn(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((i !== null && Ri(i), N(n))) {
        case 2:
        case 8:
          n = Di;
          break;
        case 32:
          n = pn;
          break;
        case 268435456:
          n = da;
          break;
        default:
          n = pn;
      }
      return (
        (i = Pm.bind(null, e)),
        (n = Ml(n, i)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      i !== null && i !== null && Ri(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Pm(e, t) {
    if (At !== 0 && At !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Go() && e.callbackNode !== n) return null;
    var i = Ne;
    return (
      (i = Rl(
        e,
        e === et ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      i === 0
        ? null
        : (Om(e, i, t),
          Fm(e, qt()),
          e.callbackNode != null && e.callbackNode === n
            ? Pm.bind(null, e)
            : null)
    );
  }
  function Wm(e, t) {
    if (Go()) return null;
    Om(e, t, !0);
  }
  function nb() {
    gb(function () {
      (Ve & 6) !== 0 ? Ml(gn, ab) : Jm();
    });
  }
  function zc() {
    if (Un === 0) {
      var e = Zl;
      (e === 0 && ((e = Pn), (Pn <<= 1), (Pn & 261888) === 0 && (Pn = 256)),
        (Un = e));
    }
    return Un;
  }
  function Im(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Ir("" + e);
  }
  function eg(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function lb(e, t, n, i, o) {
    if (t === "submit" && n && n.stateNode === o) {
      var s = Im((o[W] || null).action),
        d = i.submitter;
      d &&
        ((t = (t = d[W] || null)
          ? Im(t.formAction)
          : d.getAttribute("formAction")),
        t !== null && ((s = t), (d = null)));
      var p = new no("action", "action", null, i, o);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (Un !== 0) {
                  var x = d ? eg(o, d) : new FormData(o);
                  Ps(
                    n,
                    { pending: !0, data: x, method: o.method, action: s },
                    null,
                    x,
                  );
                }
              } else
                typeof s == "function" &&
                  (p.preventDefault(),
                  (x = d ? eg(o, d) : new FormData(o)),
                  Ps(
                    n,
                    { pending: !0, data: x, method: o.method, action: s },
                    s,
                    x,
                  ));
            },
            currentTarget: o,
          },
        ],
      });
    }
  }
  for (var Oc = 0; Oc < ms.length; Oc++) {
    var Nc = ms[Oc],
      ib = Nc.toLowerCase(),
      rb = Nc[0].toUpperCase() + Nc.slice(1);
    Ra(ib, "on" + rb);
  }
  (Ra(zd, "onAnimationEnd"),
    Ra(Od, "onAnimationIteration"),
    Ra(Nd, "onAnimationStart"),
    Ra("dblclick", "onDoubleClick"),
    Ra("focusin", "onFocus"),
    Ra("focusout", "onBlur"),
    Ra(S0, "onTransitionRun"),
    Ra(E0, "onTransitionStart"),
    Ra(C0, "onTransitionCancel"),
    Ra(_d, "onTransitionEnd"),
    La("onMouseEnter", ["mouseout", "mouseover"]),
    La("onMouseLeave", ["mouseout", "mouseover"]),
    La("onPointerEnter", ["pointerout", "pointerover"]),
    La("onPointerLeave", ["pointerout", "pointerover"]),
    Mt(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Mt(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Mt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Mt(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Mt(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Mt(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var cr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    ob = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(cr),
    );
  function tg(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n],
        o = i.event;
      i = i.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var d = i.length - 1; 0 <= d; d--) {
            var p = i[d],
              x = p.instance,
              z = p.currentTarget;
            if (((p = p.listener), x !== s && o.isPropagationStopped()))
              break e;
            ((s = p), (o.currentTarget = z));
            try {
              s(o);
            } catch (H) {
              ro(H);
            }
            ((o.currentTarget = null), (s = x));
          }
        else
          for (d = 0; d < i.length; d++) {
            if (
              ((p = i[d]),
              (x = p.instance),
              (z = p.currentTarget),
              (p = p.listener),
              x !== s && o.isPropagationStopped())
            )
              break e;
            ((s = p), (o.currentTarget = z));
            try {
              s(o);
            } catch (H) {
              ro(H);
            }
            ((o.currentTarget = null), (s = x));
          }
      }
    }
  }
  function Oe(e, t) {
    var n = t[fe];
    n === void 0 && (n = t[fe] = new Set());
    var i = e + "__bubble";
    n.has(i) || (ag(t, e, 2, !1), n.add(i));
  }
  function _c(e, t, n) {
    var i = 0;
    (t && (i |= 4), ag(n, e, i, t));
  }
  var $o = "_reactListening" + Math.random().toString(36).slice(2);
  function Lc(e) {
    if (!e[$o]) {
      ((e[$o] = !0),
        bn.forEach(function (n) {
          n !== "selectionchange" && (ob.has(n) || _c(n, !1, e), _c(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$o] || ((t[$o] = !0), _c("selectionchange", !1, t));
    }
  }
  function ag(e, t, n, i) {
    switch (zg(t)) {
      case 2:
        var o = Lb;
        break;
      case 8:
        o = Ub;
        break;
      default:
        o = Fc;
    }
    ((n = o.bind(null, t, n, e)),
      (o = void 0),
      !ts ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (o = !0),
      i
        ? o !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: o })
          : e.addEventListener(t, n, !0)
        : o !== void 0
          ? e.addEventListener(t, n, { passive: o })
          : e.addEventListener(t, n, !1));
  }
  function Uc(e, t, n, i, o) {
    var s = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var d = i.tag;
        if (d === 3 || d === 4) {
          var p = i.stateNode.containerInfo;
          if (p === o) break;
          if (d === 4)
            for (d = i.return; d !== null; ) {
              var x = d.tag;
              if ((x === 3 || x === 4) && d.stateNode.containerInfo === o)
                return;
              d = d.return;
            }
          for (; p !== null; ) {
            if (((d = at(p)), d === null)) return;
            if (((x = d.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              i = s = d;
              continue e;
            }
            p = p.parentNode;
          }
        }
        i = i.return;
      }
    od(function () {
      var z = s,
        H = Iu(n),
        Y = [];
      e: {
        var O = Ld.get(e);
        if (O !== void 0) {
          var L = no,
            ne = e;
          switch (e) {
            case "keypress":
              if (to(n) === 0) break e;
            case "keydown":
            case "keyup":
              L = e0;
              break;
            case "focusin":
              ((ne = "focus"), (L = is));
              break;
            case "focusout":
              ((ne = "blur"), (L = is));
              break;
            case "beforeblur":
            case "afterblur":
              L = is;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              L = cd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              L = Vv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              L = n0;
              break;
            case zd:
            case Od:
            case Nd:
              L = Qv;
              break;
            case _d:
              L = i0;
              break;
            case "scroll":
            case "scrollend":
              L = qv;
              break;
            case "wheel":
              L = o0;
              break;
            case "copy":
            case "cut":
            case "paste":
              L = $v;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              L = dd;
              break;
            case "toggle":
            case "beforetoggle":
              L = s0;
          }
          var ge = (t & 4) !== 0,
            Fe = !ge && (e === "scroll" || e === "scrollend"),
            j = ge ? (O !== null ? O + "Capture" : null) : O;
          ge = [];
          for (var T = z, D; T !== null; ) {
            var q = T;
            if (
              ((D = q.stateNode),
              (q = q.tag),
              (q !== 5 && q !== 26 && q !== 27) ||
                D === null ||
                j === null ||
                ((q = Oi(T, j)), q != null && ge.push(fr(T, q, D))),
              Fe)
            )
              break;
            T = T.return;
          }
          0 < ge.length &&
            ((O = new L(O, ne, null, n, H)),
            Y.push({ event: O, listeners: ge }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((O = e === "mouseover" || e === "pointerover"),
            (L = e === "mouseout" || e === "pointerout"),
            O &&
              n !== Wu &&
              (ne = n.relatedTarget || n.fromElement) &&
              (at(ne) || ne[I]))
          )
            break e;
          if (
            (L || O) &&
            ((O =
              H.window === H
                ? H
                : (O = H.ownerDocument)
                  ? O.defaultView || O.parentWindow
                  : window),
            L
              ? ((ne = n.relatedTarget || n.toElement),
                (L = z),
                (ne = ne ? at(ne) : null),
                ne !== null &&
                  ((Fe = f(ne)),
                  (ge = ne.tag),
                  ne !== Fe || (ge !== 5 && ge !== 27 && ge !== 6)) &&
                  (ne = null))
              : ((L = null), (ne = z)),
            L !== ne)
          ) {
            if (
              ((ge = cd),
              (q = "onMouseLeave"),
              (j = "onMouseEnter"),
              (T = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ge = dd),
                (q = "onPointerLeave"),
                (j = "onPointerEnter"),
                (T = "pointer")),
              (Fe = L == null ? O : He(L)),
              (D = ne == null ? O : He(ne)),
              (O = new ge(q, T + "leave", L, n, H)),
              (O.target = Fe),
              (O.relatedTarget = D),
              (q = null),
              at(H) === z &&
                ((ge = new ge(j, T + "enter", ne, n, H)),
                (ge.target = D),
                (ge.relatedTarget = Fe),
                (q = ge)),
              (Fe = q),
              L && ne)
            )
              t: {
                for (ge = ub, j = L, T = ne, D = 0, q = j; q; q = ge(q)) D++;
                q = 0;
                for (var de = T; de; de = ge(de)) q++;
                for (; 0 < D - q; ) ((j = ge(j)), D--);
                for (; 0 < q - D; ) ((T = ge(T)), q--);
                for (; D--; ) {
                  if (j === T || (T !== null && j === T.alternate)) {
                    ge = j;
                    break t;
                  }
                  ((j = ge(j)), (T = ge(T)));
                }
                ge = null;
              }
            else ge = null;
            (L !== null && ng(Y, O, L, ge, !1),
              ne !== null && Fe !== null && ng(Y, Fe, ne, ge, !0));
          }
        }
        e: {
          if (
            ((O = z ? He(z) : window),
            (L = O.nodeName && O.nodeName.toLowerCase()),
            L === "select" || (L === "input" && O.type === "file"))
          )
            var qe = wd;
          else if (vd(O))
            if (xd) qe = b0;
            else {
              qe = y0;
              var re = p0;
            }
          else
            ((L = O.nodeName),
              !L ||
              L.toLowerCase() !== "input" ||
              (O.type !== "checkbox" && O.type !== "radio")
                ? z && Pu(z.elementType) && (qe = wd)
                : (qe = v0));
          if (qe && (qe = qe(e, z))) {
            bd(Y, qe, n, H);
            break e;
          }
          (re && re(e, O, z),
            e === "focusout" &&
              z &&
              O.type === "number" &&
              z.memoizedProps.value != null &&
              Fu(O, "number", O.value));
        }
        switch (((re = z ? He(z) : window), e)) {
          case "focusin":
            (vd(re) || re.contentEditable === "true") &&
              ((Hl = re), (fs = z), (qi = null));
            break;
          case "focusout":
            qi = fs = Hl = null;
            break;
          case "mousedown":
            ds = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((ds = !1), Rd(Y, n, H));
            break;
          case "selectionchange":
            if (x0) break;
          case "keydown":
          case "keyup":
            Rd(Y, n, H);
        }
        var Ce;
        if (os)
          e: {
            switch (e) {
              case "compositionstart":
                var _e = "onCompositionStart";
                break e;
              case "compositionend":
                _e = "onCompositionEnd";
                break e;
              case "compositionupdate":
                _e = "onCompositionUpdate";
                break e;
            }
            _e = void 0;
          }
        else
          Bl
            ? pd(e, n) && (_e = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (_e = "onCompositionStart");
        (_e &&
          (hd &&
            n.locale !== "ko" &&
            (Bl || _e !== "onCompositionStart"
              ? _e === "onCompositionEnd" && Bl && (Ce = ud())
              : ((wn = H),
                (as = "value" in wn ? wn.value : wn.textContent),
                (Bl = !0))),
          (re = Ko(z, _e)),
          0 < re.length &&
            ((_e = new fd(_e, e, null, n, H)),
            Y.push({ event: _e, listeners: re }),
            Ce
              ? (_e.data = Ce)
              : ((Ce = yd(n)), Ce !== null && (_e.data = Ce)))),
          (Ce = f0 ? d0(e, n) : h0(e, n)) &&
            ((_e = Ko(z, "onBeforeInput")),
            0 < _e.length &&
              ((re = new fd("onBeforeInput", "beforeinput", null, n, H)),
              Y.push({ event: re, listeners: _e }),
              (re.data = Ce))),
          lb(Y, e, z, n, H));
      }
      tg(Y, t);
    });
  }
  function fr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ko(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var o = e,
        s = o.stateNode;
      if (
        ((o = o.tag),
        (o !== 5 && o !== 26 && o !== 27) ||
          s === null ||
          ((o = Oi(e, n)),
          o != null && i.unshift(fr(e, o, s)),
          (o = Oi(e, t)),
          o != null && i.push(fr(e, o, s))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function ub(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function ng(e, t, n, i, o) {
    for (var s = t._reactName, d = []; n !== null && n !== i; ) {
      var p = n,
        x = p.alternate,
        z = p.stateNode;
      if (((p = p.tag), x !== null && x === i)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        z === null ||
        ((x = z),
        o
          ? ((z = Oi(n, s)), z != null && d.unshift(fr(n, z, x)))
          : o || ((z = Oi(n, s)), z != null && d.push(fr(n, z, x)))),
        (n = n.return));
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var sb = /\r\n?/g,
    cb = /\u0000|\uFFFD/g;
  function lg(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        sb,
        `
`,
      )
      .replace(cb, "");
  }
  function ig(e, t) {
    return ((t = lg(t)), lg(e) === t);
  }
  function Je(e, t, n, i, o, s) {
    switch (n) {
      case "children":
        typeof i == "string"
          ? t === "body" || (t === "textarea" && i === "") || _l(e, i)
          : (typeof i == "number" || typeof i == "bigint") &&
            t !== "body" &&
            _l(e, "" + i);
        break;
      case "className":
        dt(e, "class", i);
        break;
      case "tabIndex":
        dt(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        dt(e, n, i);
        break;
      case "style":
        id(e, i, s);
        break;
      case "data":
        if (t !== "object") {
          dt(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "symbol" ||
          typeof i == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        ((i = Ir("" + i)), e.setAttribute(n, i));
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof s == "function" &&
            (n === "formAction"
              ? (t !== "input" && Je(e, t, "name", o.name, o, null),
                Je(e, t, "formEncType", o.formEncType, o, null),
                Je(e, t, "formMethod", o.formMethod, o, null),
                Je(e, t, "formTarget", o.formTarget, o, null))
              : (Je(e, t, "encType", o.encType, o, null),
                Je(e, t, "method", o.method, o, null),
                Je(e, t, "target", o.target, o, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        ((i = Ir("" + i)), e.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (e.onclick = Ka);
        break;
      case "onScroll":
        i != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (((n = i.__html), n != null)) {
            if (o.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "boolean" ||
          typeof i == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((n = Ir("" + i)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(n, "" + i)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0
          ? e.setAttribute(n, "")
          : i !== !1 &&
              i != null &&
              typeof i != "function" &&
              typeof i != "symbol"
            ? e.setAttribute(n, i)
            : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        !isNaN(i) &&
        1 <= i
          ? e.setAttribute(n, i)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
          ? e.removeAttribute(n)
          : e.setAttribute(n, i);
        break;
      case "popover":
        (Oe("beforetoggle", e), Oe("toggle", e), De(e, "popover", i));
        break;
      case "xlinkActuate":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        Ut(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        De(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Hv.get(n) || n), De(e, n, i));
    }
  }
  function Bc(e, t, n, i, o, s) {
    switch (n) {
      case "style":
        id(e, i, s);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (((n = i.__html), n != null)) {
            if (o.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? _l(e, i)
          : (typeof i == "number" || typeof i == "bigint") && _l(e, "" + i);
        break;
      case "onScroll":
        i != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Oe("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Ka);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ma.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((o = n.endsWith("Capture")),
              (t = n.slice(2, o ? n.length - 7 : void 0)),
              (s = e[W] || null),
              (s = s != null ? s[n] : null),
              typeof s == "function" && e.removeEventListener(t, s, o),
              typeof i == "function")
            ) {
              (typeof s != "function" &&
                s !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, i, o));
              break e;
            }
            n in e
              ? (e[n] = i)
              : i === !0
                ? e.setAttribute(n, "")
                : De(e, n, i);
          }
    }
  }
  function _t(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Oe("error", e), Oe("load", e));
        var i = !1,
          o = !1,
          s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var d = n[s];
            if (d != null)
              switch (s) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  o = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Je(e, t, s, d, n, null);
              }
          }
        (o && Je(e, t, "srcSet", n.srcSet, n, null),
          i && Je(e, t, "src", n.src, n, null));
        return;
      case "input":
        Oe("invalid", e);
        var p = (s = d = o = null),
          x = null,
          z = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var H = n[i];
            if (H != null)
              switch (i) {
                case "name":
                  o = H;
                  break;
                case "type":
                  d = H;
                  break;
                case "checked":
                  x = H;
                  break;
                case "defaultChecked":
                  z = H;
                  break;
                case "value":
                  s = H;
                  break;
                case "defaultValue":
                  p = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(u(137, t));
                  break;
                default:
                  Je(e, t, i, H, n, null);
              }
          }
        td(e, s, p, x, z, d, o, !1);
        return;
      case "select":
        (Oe("invalid", e), (i = d = s = null));
        for (o in n)
          if (n.hasOwnProperty(o) && ((p = n[o]), p != null))
            switch (o) {
              case "value":
                s = p;
                break;
              case "defaultValue":
                d = p;
                break;
              case "multiple":
                i = p;
              default:
                Je(e, t, o, p, n, null);
            }
        ((t = s),
          (n = d),
          (e.multiple = !!i),
          t != null ? Nl(e, !!i, t, !1) : n != null && Nl(e, !!i, n, !0));
        return;
      case "textarea":
        (Oe("invalid", e), (s = o = i = null));
        for (d in n)
          if (n.hasOwnProperty(d) && ((p = n[d]), p != null))
            switch (d) {
              case "value":
                i = p;
                break;
              case "defaultValue":
                o = p;
                break;
              case "children":
                s = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(u(91));
                break;
              default:
                Je(e, t, d, p, n, null);
            }
        nd(e, i, o, s);
        return;
      case "option":
        for (x in n)
          n.hasOwnProperty(x) &&
            ((i = n[x]), i != null) &&
            (x === "selected"
              ? (e.selected =
                  i && typeof i != "function" && typeof i != "symbol")
              : Je(e, t, x, i, n, null));
        return;
      case "dialog":
        (Oe("beforetoggle", e),
          Oe("toggle", e),
          Oe("cancel", e),
          Oe("close", e));
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < cr.length; i++) Oe(cr[i], e);
        break;
      case "image":
        (Oe("error", e), Oe("load", e));
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Oe("error", e), Oe("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in n)
          if (n.hasOwnProperty(z) && ((i = n[z]), i != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Je(e, t, z, i, n, null);
            }
        return;
      default:
        if (Pu(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((i = n[H]), i !== void 0 && Bc(e, t, H, i, n, void 0));
          return;
        }
    }
    for (p in n)
      n.hasOwnProperty(p) && ((i = n[p]), i != null && Je(e, t, p, i, n, null));
  }
  function fb(e, t, n, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var o = null,
          s = null,
          d = null,
          p = null,
          x = null,
          z = null,
          H = null;
        for (L in n) {
          var Y = n[L];
          if (n.hasOwnProperty(L) && Y != null)
            switch (L) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = Y;
              default:
                i.hasOwnProperty(L) || Je(e, t, L, null, i, Y);
            }
        }
        for (var O in i) {
          var L = i[O];
          if (((Y = n[O]), i.hasOwnProperty(O) && (L != null || Y != null)))
            switch (O) {
              case "type":
                s = L;
                break;
              case "name":
                o = L;
                break;
              case "checked":
                z = L;
                break;
              case "defaultChecked":
                H = L;
                break;
              case "value":
                d = L;
                break;
              case "defaultValue":
                p = L;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(u(137, t));
                break;
              default:
                L !== Y && Je(e, t, O, L, i, Y);
            }
        }
        Ju(e, d, p, x, z, H, s, o);
        return;
      case "select":
        L = d = p = O = null;
        for (s in n)
          if (((x = n[s]), n.hasOwnProperty(s) && x != null))
            switch (s) {
              case "value":
                break;
              case "multiple":
                L = x;
              default:
                i.hasOwnProperty(s) || Je(e, t, s, null, i, x);
            }
        for (o in i)
          if (
            ((s = i[o]),
            (x = n[o]),
            i.hasOwnProperty(o) && (s != null || x != null))
          )
            switch (o) {
              case "value":
                O = s;
                break;
              case "defaultValue":
                p = s;
                break;
              case "multiple":
                d = s;
              default:
                s !== x && Je(e, t, o, s, i, x);
            }
        ((t = p),
          (n = d),
          (i = L),
          O != null
            ? Nl(e, !!n, O, !1)
            : !!i != !!n &&
              (t != null ? Nl(e, !!n, t, !0) : Nl(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        L = O = null;
        for (p in n)
          if (
            ((o = n[p]),
            n.hasOwnProperty(p) && o != null && !i.hasOwnProperty(p))
          )
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                Je(e, t, p, null, i, o);
            }
        for (d in i)
          if (
            ((o = i[d]),
            (s = n[d]),
            i.hasOwnProperty(d) && (o != null || s != null))
          )
            switch (d) {
              case "value":
                O = o;
                break;
              case "defaultValue":
                L = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(u(91));
                break;
              default:
                o !== s && Je(e, t, d, o, i, s);
            }
        ad(e, O, L);
        return;
      case "option":
        for (var ne in n)
          ((O = n[ne]),
            n.hasOwnProperty(ne) &&
              O != null &&
              !i.hasOwnProperty(ne) &&
              (ne === "selected"
                ? (e.selected = !1)
                : Je(e, t, ne, null, i, O)));
        for (x in i)
          ((O = i[x]),
            (L = n[x]),
            i.hasOwnProperty(x) &&
              O !== L &&
              (O != null || L != null) &&
              (x === "selected"
                ? (e.selected =
                    O && typeof O != "function" && typeof O != "symbol")
                : Je(e, t, x, O, i, L)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ge in n)
          ((O = n[ge]),
            n.hasOwnProperty(ge) &&
              O != null &&
              !i.hasOwnProperty(ge) &&
              Je(e, t, ge, null, i, O));
        for (z in i)
          if (
            ((O = i[z]),
            (L = n[z]),
            i.hasOwnProperty(z) && O !== L && (O != null || L != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(u(137, t));
                break;
              default:
                Je(e, t, z, O, i, L);
            }
        return;
      default:
        if (Pu(t)) {
          for (var Fe in n)
            ((O = n[Fe]),
              n.hasOwnProperty(Fe) &&
                O !== void 0 &&
                !i.hasOwnProperty(Fe) &&
                Bc(e, t, Fe, void 0, i, O));
          for (H in i)
            ((O = i[H]),
              (L = n[H]),
              !i.hasOwnProperty(H) ||
                O === L ||
                (O === void 0 && L === void 0) ||
                Bc(e, t, H, O, i, L));
          return;
        }
    }
    for (var j in n)
      ((O = n[j]),
        n.hasOwnProperty(j) &&
          O != null &&
          !i.hasOwnProperty(j) &&
          Je(e, t, j, null, i, O));
    for (Y in i)
      ((O = i[Y]),
        (L = n[Y]),
        !i.hasOwnProperty(Y) ||
          O === L ||
          (O == null && L == null) ||
          Je(e, t, Y, O, i, L));
  }
  function rg(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function db() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0;
        i < n.length;
        i++
      ) {
        var o = n[i],
          s = o.transferSize,
          d = o.initiatorType,
          p = o.duration;
        if (s && p && rg(d)) {
          for (d = 0, p = o.responseEnd, i += 1; i < n.length; i++) {
            var x = n[i],
              z = x.startTime;
            if (z > p) break;
            var H = x.transferSize,
              Y = x.initiatorType;
            H &&
              rg(Y) &&
              ((x = x.responseEnd), (d += H * (x < p ? 1 : (p - z) / (x - z))));
          }
          if ((--i, (t += (8 * (s + d)) / (o.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var Hc = null,
    kc = null;
  function Jo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function og(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ug(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function qc(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Yc = null;
  function hb() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Yc
        ? !1
        : ((Yc = e), !0)
      : ((Yc = null), !1);
  }
  var sg = typeof setTimeout == "function" ? setTimeout : void 0,
    mb = typeof clearTimeout == "function" ? clearTimeout : void 0,
    cg = typeof Promise == "function" ? Promise : void 0,
    gb =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof cg < "u"
          ? function (e) {
              return cg.resolve(null).then(e).catch(pb);
            }
          : sg;
  function pb(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Bn(e) {
    return e === "head";
  }
  function fg(e, t) {
    var n = t,
      i = 0;
    do {
      var o = n.nextSibling;
      if ((e.removeChild(n), o && o.nodeType === 8))
        if (((n = o.data), n === "/$" || n === "/&")) {
          if (i === 0) {
            (e.removeChild(o), fi(t));
            return;
          }
          i--;
        } else if (
          n === "$" ||
          n === "$?" ||
          n === "$~" ||
          n === "$!" ||
          n === "&"
        )
          i++;
        else if (n === "html") dr(e.ownerDocument.documentElement);
        else if (n === "head") {
          ((n = e.ownerDocument.head), dr(n));
          for (var s = n.firstChild; s; ) {
            var d = s.nextSibling,
              p = s.nodeName;
            (s[Re] ||
              p === "SCRIPT" ||
              p === "STYLE" ||
              (p === "LINK" && s.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(s),
              (s = d));
          }
        } else n === "body" && dr(e.ownerDocument.body);
      n = o;
    } while (n);
    fi(t);
  }
  function dg(e, t) {
    var n = e;
    e = 0;
    do {
      var i = n.nextSibling;
      if (
        (n.nodeType === 1
          ? t
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (t
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        i && i.nodeType === 8)
      )
        if (((n = i.data), n === "/$")) {
          if (e === 0) break;
          e--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || e++;
      n = i;
    } while (n);
  }
  function Vc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Vc(n), Ie(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function yb(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var o = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[Re])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((s = e.getAttribute("rel")),
                s === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                s !== o.rel ||
                e.getAttribute("href") !==
                  (o.href == null || o.href === "" ? null : o.href) ||
                e.getAttribute("crossorigin") !==
                  (o.crossOrigin == null ? null : o.crossOrigin) ||
                e.getAttribute("title") !== (o.title == null ? null : o.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((s = e.getAttribute("src")),
                (s !== (o.src == null ? null : o.src) ||
                  e.getAttribute("type") !== (o.type == null ? null : o.type) ||
                  e.getAttribute("crossorigin") !==
                    (o.crossOrigin == null ? null : o.crossOrigin)) &&
                  s &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var s = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === s) return e;
      } else return e;
      if (((e = wa(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function vb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = wa(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function hg(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = wa(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Xc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Gc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function bb(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading") t();
    else {
      var i = function () {
        (t(), n.removeEventListener("DOMContentLoaded", i));
      };
      (n.addEventListener("DOMContentLoaded", i), (e._reactRetry = i));
    }
  }
  function wa(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Qc = null;
  function mg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return wa(e.nextSibling);
          t--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function gg(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else (n !== "/$" && n !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function pg(e, t, n) {
    switch (((t = Jo(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function dr(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ie(e);
  }
  var xa = new Map(),
    yg = new Set();
  function Fo(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var fn = Z.d;
  Z.d = { f: wb, r: xb, D: Sb, C: Eb, L: Cb, m: Tb, X: jb, S: Ab, M: Mb };
  function wb() {
    var e = fn.f(),
      t = Yo();
    return e || t;
  }
  function xb(e) {
    var t = st(e);
    t !== null && t.tag === 5 && t.type === "form" ? _h(t) : fn.r(e);
  }
  var ui = typeof document > "u" ? null : document;
  function vg(e, t, n) {
    var i = ui;
    if (i && typeof t == "string" && t) {
      var o = ha(t);
      ((o = 'link[rel="' + e + '"][href="' + o + '"]'),
        typeof n == "string" && (o += '[crossorigin="' + n + '"]'),
        yg.has(o) ||
          (yg.add(o),
          (e = { rel: e, crossOrigin: n, href: t }),
          i.querySelector(o) === null &&
            ((t = i.createElement("link")),
            _t(t, "link", e),
            tt(t),
            i.head.appendChild(t))));
    }
  }
  function Sb(e) {
    (fn.D(e), vg("dns-prefetch", e, null));
  }
  function Eb(e, t) {
    (fn.C(e, t), vg("preconnect", e, t));
  }
  function Cb(e, t, n) {
    fn.L(e, t, n);
    var i = ui;
    if (i && e && t) {
      var o = 'link[rel="preload"][as="' + ha(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((o += '[imagesrcset="' + ha(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (o += '[imagesizes="' + ha(n.imageSizes) + '"]'))
        : (o += '[href="' + ha(e) + '"]');
      var s = o;
      switch (t) {
        case "style":
          s = si(e);
          break;
        case "script":
          s = ci(e);
      }
      xa.has(s) ||
        ((e = b(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n,
        )),
        xa.set(s, e),
        i.querySelector(o) !== null ||
          (t === "style" && i.querySelector(hr(s))) ||
          (t === "script" && i.querySelector(mr(s))) ||
          ((t = i.createElement("link")),
          _t(t, "link", e),
          tt(t),
          i.head.appendChild(t)));
    }
  }
  function Tb(e, t) {
    fn.m(e, t);
    var n = ui;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script",
        o =
          'link[rel="modulepreload"][as="' + ha(i) + '"][href="' + ha(e) + '"]',
        s = o;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = ci(e);
      }
      if (
        !xa.has(s) &&
        ((e = b({ rel: "modulepreload", href: e }, t)),
        xa.set(s, e),
        n.querySelector(o) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(mr(s))) return;
        }
        ((i = n.createElement("link")),
          _t(i, "link", e),
          tt(i),
          n.head.appendChild(i));
      }
    }
  }
  function Ab(e, t, n) {
    fn.S(e, t, n);
    var i = ui;
    if (i && e) {
      var o = Tt(i).hoistableStyles,
        s = si(e);
      t = t || "default";
      var d = o.get(s);
      if (!d) {
        var p = { loading: 0, preload: null };
        if ((d = i.querySelector(hr(s)))) p.loading = 5;
        else {
          ((e = b({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = xa.get(s)) && Zc(e, n));
          var x = (d = i.createElement("link"));
          (tt(x),
            _t(x, "link", e),
            (x._p = new Promise(function (z, H) {
              ((x.onload = z), (x.onerror = H));
            })),
            x.addEventListener("load", function () {
              p.loading |= 1;
            }),
            x.addEventListener("error", function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Po(d, t, i));
        }
        ((d = { type: "stylesheet", instance: d, count: 1, state: p }),
          o.set(s, d));
      }
    }
  }
  function jb(e, t) {
    fn.X(e, t);
    var n = ui;
    if (n && e) {
      var i = Tt(n).hoistableScripts,
        o = ci(e),
        s = i.get(o);
      s ||
        ((s = n.querySelector(mr(o))),
        s ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = xa.get(o)) && $c(e, t),
          (s = n.createElement("script")),
          tt(s),
          _t(s, "link", e),
          n.head.appendChild(s)),
        (s = { type: "script", instance: s, count: 1, state: null }),
        i.set(o, s));
    }
  }
  function Mb(e, t) {
    fn.M(e, t);
    var n = ui;
    if (n && e) {
      var i = Tt(n).hoistableScripts,
        o = ci(e),
        s = i.get(o);
      s ||
        ((s = n.querySelector(mr(o))),
        s ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = xa.get(o)) && $c(e, t),
          (s = n.createElement("script")),
          tt(s),
          _t(s, "link", e),
          n.head.appendChild(s)),
        (s = { type: "script", instance: s, count: 1, state: null }),
        i.set(o, s));
    }
  }
  function bg(e, t, n, i) {
    var o = (o = pe.current) ? Fo(o) : null;
    if (!o) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = si(n.href)),
            (n = Tt(o).hoistableStyles),
            (i = n.get(t)),
            i ||
              ((i = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = si(n.href);
          var s = Tt(o).hoistableStyles,
            d = s.get(e);
          if (
            (d ||
              ((o = o.ownerDocument || o),
              (d = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(e, d),
              (s = o.querySelector(hr(e))) &&
                !s._p &&
                ((d.instance = s), (d.state.loading = 5)),
              xa.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                xa.set(e, n),
                s || Rb(o, e, n, d.state))),
            t && i === null)
          )
            throw Error(u(528, ""));
          return d;
        }
        if (t && i !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = ci(n)),
              (n = Tt(o).hoistableScripts),
              (i = n.get(t)),
              i ||
                ((i = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, e));
    }
  }
  function si(e) {
    return 'href="' + ha(e) + '"';
  }
  function hr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function wg(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Rb(e, t, n, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (i.loading = 1)
      : ((t = e.createElement("link")),
        (i.preload = t),
        t.addEventListener("load", function () {
          return (i.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (i.loading |= 2);
        }),
        _t(t, "link", n),
        tt(t),
        e.head.appendChild(t));
  }
  function ci(e) {
    return '[src="' + ha(e) + '"]';
  }
  function mr(e) {
    return "script[async]" + e;
  }
  function xg(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var i = e.querySelector('style[data-href~="' + ha(n.href) + '"]');
          if (i) return ((t.instance = i), tt(i), i);
          var o = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (i = (e.ownerDocument || e).createElement("style")),
            tt(i),
            _t(i, "style", o),
            Po(i, n.precedence, e),
            (t.instance = i)
          );
        case "stylesheet":
          o = si(n.href);
          var s = e.querySelector(hr(o));
          if (s) return ((t.state.loading |= 4), (t.instance = s), tt(s), s);
          ((i = wg(n)),
            (o = xa.get(o)) && Zc(i, o),
            (s = (e.ownerDocument || e).createElement("link")),
            tt(s));
          var d = s;
          return (
            (d._p = new Promise(function (p, x) {
              ((d.onload = p), (d.onerror = x));
            })),
            _t(s, "link", i),
            (t.state.loading |= 4),
            Po(s, n.precedence, e),
            (t.instance = s)
          );
        case "script":
          return (
            (s = ci(n.src)),
            (o = e.querySelector(mr(s)))
              ? ((t.instance = o), tt(o), o)
              : ((i = n),
                (o = xa.get(s)) && ((i = b({}, n)), $c(i, o)),
                (e = e.ownerDocument || e),
                (o = e.createElement("script")),
                tt(o),
                _t(o, "link", i),
                e.head.appendChild(o),
                (t.instance = o))
          );
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((i = t.instance), (t.state.loading |= 4), Po(i, n.precedence, e));
    return t.instance;
  }
  function Po(e, t, n) {
    for (
      var i = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        o = i.length ? i[i.length - 1] : null,
        s = o,
        d = 0;
      d < i.length;
      d++
    ) {
      var p = i[d];
      if (p.dataset.precedence === t) s = p;
      else if (s !== o) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Zc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function $c(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Wo = null;
  function Sg(e, t, n) {
    if (Wo === null) {
      var i = new Map(),
        o = (Wo = new Map());
      o.set(n, i);
    } else ((o = Wo), (i = o.get(n)), i || ((i = new Map()), o.set(n, i)));
    if (i.has(e)) return i;
    for (
      i.set(e, null), n = n.getElementsByTagName(e), o = 0;
      o < n.length;
      o++
    ) {
      var s = n[o];
      if (
        !(
          s[Re] ||
          s[J] ||
          (e === "link" && s.getAttribute("rel") === "stylesheet")
        ) &&
        s.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var d = s.getAttribute(t) || "";
        d = e + d;
        var p = i.get(d);
        p ? p.push(s) : i.set(d, [s]);
      }
    }
    return i;
  }
  function Eg(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function Db(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Cg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function zb(e, t, n, i) {
    if (
      n.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var o = si(i.href),
          s = t.querySelector(hr(o));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = Io.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = s),
            tt(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (i = wg(i)),
          (o = xa.get(o)) && Zc(i, o),
          (s = s.createElement("link")),
          tt(s));
        var d = s;
        ((d._p = new Promise(function (p, x) {
          ((d.onload = p), (d.onerror = x));
        })),
          _t(s, "link", i),
          (n.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = Io.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n)));
    }
  }
  var Kc = 0;
  function Ob(e, t) {
    return (
      e.stylesheets && e.count === 0 && tu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var i = setTimeout(function () {
              if ((e.stylesheets && tu(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Kc === 0 && (Kc = 62500 * db());
            var o = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && tu(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > Kc ? 50 : 800) + t,
            );
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(i), clearTimeout(o));
              }
            );
          }
        : null
    );
  }
  function Io() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) tu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var eu = null;
  function tu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (eu = new Map()),
        t.forEach(Nb, e),
        (eu = null),
        Io.call(e)));
  }
  function Nb(e, t) {
    if (!(t.state.loading & 4)) {
      var n = eu.get(e);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), eu.set(e, n));
        for (
          var o = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            s = 0;
          s < o.length;
          s++
        ) {
          var d = o[s];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") &&
            (n.set(d.dataset.precedence, d), (i = d));
        }
        i && n.set(null, i);
      }
      ((o = t.instance),
        (d = o.getAttribute("data-precedence")),
        (s = n.get(d) || i),
        s === i && n.set(null, o),
        n.set(d, o),
        this.count++,
        (i = Io.bind(this)),
        o.addEventListener("load", i),
        o.addEventListener("error", i),
        s
          ? s.parentNode.insertBefore(o, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(o, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var gr = {
    $$typeof: te,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0,
  };
  function _b(e, t, n, i, o, s, d, p, x) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = vn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = vn(0)),
      (this.hiddenUpdates = vn(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = o),
      (this.onCaughtError = s),
      (this.onRecoverableError = d),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function Tg(e, t, n, i, o, s, d, p, x, z, H, Y) {
    return (
      (e = new _b(e, t, n, d, x, z, H, Y, p)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = ea(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = js()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: i, isDehydrated: n, cache: t }),
      zs(s),
      e
    );
  }
  function Ag(e) {
    return e ? ((e = Yl), e) : Yl;
  }
  function jg(e, t, n, i, o, s) {
    ((o = Ag(o)),
      i.context === null ? (i.context = o) : (i.pendingContext = o),
      (i = An(t)),
      (i.payload = { element: n }),
      (s = s === void 0 ? null : s),
      s !== null && (i.callback = s),
      (n = jn(e, i, t)),
      n !== null && (Pt(n, e, t), $i(n, e, t)));
  }
  function Mg(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Jc(e, t) {
    (Mg(e, t), (e = e.alternate) && Mg(e, t));
  }
  function Rg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ll(e, 67108864);
      (t !== null && Pt(t, e, 67108864), Jc(e, 67108864));
    }
  }
  function Dg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ia();
      t = A(t);
      var n = ll(e, t);
      (n !== null && Pt(n, e, t), Jc(e, t));
    }
  }
  var au = !0;
  function Lb(e, t, n, i) {
    var o = _.T;
    _.T = null;
    var s = Z.p;
    try {
      ((Z.p = 2), Fc(e, t, n, i));
    } finally {
      ((Z.p = s), (_.T = o));
    }
  }
  function Ub(e, t, n, i) {
    var o = _.T;
    _.T = null;
    var s = Z.p;
    try {
      ((Z.p = 8), Fc(e, t, n, i));
    } finally {
      ((Z.p = s), (_.T = o));
    }
  }
  function Fc(e, t, n, i) {
    if (au) {
      var o = Pc(i);
      if (o === null) (Uc(e, t, i, nu, n), Og(e, i));
      else if (Hb(o, e, t, n, i)) i.stopPropagation();
      else if ((Og(e, i), t & 4 && -1 < Bb.indexOf(e))) {
        for (; o !== null; ) {
          var s = st(o);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var d = ja(s.pendingLanes);
                  if (d !== 0) {
                    var p = s;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; d; ) {
                      var x = 1 << (31 - Lt(d));
                      ((p.entanglements[1] |= x), (d &= ~x));
                    }
                    (qa(s), (Ve & 6) === 0 && ((ko = qt() + 500), sr(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = ll(s, 2)), p !== null && Pt(p, s, 2), Yo(), Jc(s, 2));
            }
          if (((s = Pc(i)), s === null && Uc(e, t, i, nu, n), s === o)) break;
          o = s;
        }
        o !== null && i.stopPropagation();
      } else Uc(e, t, i, null, n);
    }
  }
  function Pc(e) {
    return ((e = Iu(e)), Wc(e));
  }
  var nu = null;
  function Wc(e) {
    if (((nu = null), (e = at(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = g(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((nu = e), null);
  }
  function zg(e) {
    switch (e) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Qa()) {
          case gn:
            return 2;
          case Di:
            return 8;
          case pn:
          case Aa:
            return 32;
          case da:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ic = !1,
    Hn = null,
    kn = null,
    qn = null,
    pr = new Map(),
    yr = new Map(),
    Yn = [],
    Bb =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Og(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Hn = null;
        break;
      case "dragenter":
      case "dragleave":
        kn = null;
        break;
      case "mouseover":
      case "mouseout":
        qn = null;
        break;
      case "pointerover":
      case "pointerout":
        pr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yr.delete(t.pointerId);
    }
  }
  function vr(e, t, n, i, o, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: s,
          targetContainers: [o],
        }),
        t !== null && ((t = st(t)), t !== null && Rg(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function Hb(e, t, n, i, o) {
    switch (t) {
      case "focusin":
        return ((Hn = vr(Hn, e, t, n, i, o)), !0);
      case "dragenter":
        return ((kn = vr(kn, e, t, n, i, o)), !0);
      case "mouseover":
        return ((qn = vr(qn, e, t, n, i, o)), !0);
      case "pointerover":
        var s = o.pointerId;
        return (pr.set(s, vr(pr.get(s) || null, e, t, n, i, o)), !0);
      case "gotpointercapture":
        return (
          (s = o.pointerId),
          yr.set(s, vr(yr.get(s) || null, e, t, n, i, o)),
          !0
        );
    }
    return !1;
  }
  function Ng(e) {
    var t = at(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = h(n)), t !== null)) {
            ((e.blockedOn = t),
              $(e.priority, function () {
                Dg(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = g(n)), t !== null)) {
            ((e.blockedOn = t),
              $(e.priority, function () {
                Dg(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function lu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Pc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((Wu = i), n.target.dispatchEvent(i), (Wu = null));
      } else return ((t = st(n)), t !== null && Rg(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function _g(e, t, n) {
    lu(e) && n.delete(t);
  }
  function kb() {
    ((Ic = !1),
      Hn !== null && lu(Hn) && (Hn = null),
      kn !== null && lu(kn) && (kn = null),
      qn !== null && lu(qn) && (qn = null),
      pr.forEach(_g),
      yr.forEach(_g));
  }
  function iu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ic ||
        ((Ic = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, kb)));
  }
  var ru = null;
  function Lg(e) {
    ru !== e &&
      ((ru = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        ru === e && (ru = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            i = e[t + 1],
            o = e[t + 2];
          if (typeof i != "function") {
            if (Wc(i || n) === null) continue;
            break;
          }
          var s = st(n);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Ps(s, { pending: !0, data: o, method: n.method, action: i }, i, o));
        }
      }));
  }
  function fi(e) {
    function t(x) {
      return iu(x, e);
    }
    (Hn !== null && iu(Hn, e),
      kn !== null && iu(kn, e),
      qn !== null && iu(qn, e),
      pr.forEach(t),
      yr.forEach(t));
    for (var n = 0; n < Yn.length; n++) {
      var i = Yn[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Yn.length && ((n = Yn[0]), n.blockedOn === null); )
      (Ng(n), n.blockedOn === null && Yn.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var o = n[i],
          s = n[i + 1],
          d = o[W] || null;
        if (typeof s == "function") d || Lg(n);
        else if (d) {
          var p = null;
          if (s && s.hasAttribute("formAction")) {
            if (((o = s), (d = s[W] || null))) p = d.formAction;
            else if (Wc(o) !== null) continue;
          } else p = d.action;
          (typeof p == "function" ? (n[i + 1] = p) : (n.splice(i, 3), (i -= 3)),
            Lg(n));
        }
      }
  }
  function Ug() {
    function e(s) {
      s.canIntercept &&
        s.info === "react-transition" &&
        s.intercept({
          handler: function () {
            return new Promise(function (d) {
              return (o = d);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (o !== null && (o(), (o = null)), i || setTimeout(n, 20));
    }
    function n() {
      if (!i && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var i = !1,
        o = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(n, 100),
        function () {
          ((i = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            o !== null && (o(), (o = null)));
        }
      );
    }
  }
  function ef(e) {
    this._internalRoot = e;
  }
  ((ou.prototype.render = ef.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var n = t.current,
        i = ia();
      jg(n, i, e, t, null, null);
    }),
    (ou.prototype.unmount = ef.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (jg(e.current, 2, null, e, null, null), Yo(), (t[I] = null));
        }
      }));
  function ou(e) {
    this._internalRoot = e;
  }
  ou.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = G();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Yn.length && t !== 0 && t < Yn[n].priority; n++);
      (Yn.splice(n, 0, e), n === 0 && Ng(e));
    }
  };
  var Bg = l.version;
  if (Bg !== "19.2.4") throw Error(u(527, Bg, "19.2.4"));
  Z.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(u(188))
        : ((e = Object.keys(e).join(",")), Error(u(268, e)));
    return (
      (e = m(t)),
      (e = e !== null ? w(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var qb = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var uu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!uu.isDisabled && uu.supportsFiber)
      try {
        ((Za = uu.inject(qb)), (Yt = uu));
      } catch {}
  }
  return (
    (wr.createRoot = function (e, t) {
      if (!c(e)) throw Error(u(299));
      var n = !1,
        i = "",
        o = Gh,
        s = Qh,
        d = Zh;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (d = t.onRecoverableError)),
        (t = Tg(e, 1, !1, null, null, n, i, null, o, s, d, Ug)),
        (e[I] = t.current),
        Lc(e),
        new ef(t)
      );
    }),
    (wr.hydrateRoot = function (e, t, n) {
      if (!c(e)) throw Error(u(299));
      var i = !1,
        o = "",
        s = Gh,
        d = Qh,
        p = Zh,
        x = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (p = n.onRecoverableError),
          n.formState !== void 0 && (x = n.formState)),
        (t = Tg(e, 1, !0, t, n ?? null, i, o, x, s, d, p, Ug)),
        (t.context = Ag(null)),
        (n = t.current),
        (i = ia()),
        (i = A(i)),
        (o = An(i)),
        (o.callback = null),
        jn(n, o, i),
        (n = i),
        (t.current.lanes = n),
        _a(t, n),
        qa(t),
        (e[I] = t.current),
        Lc(e),
        new ou(t)
      );
    }),
    (wr.version = "19.2.4"),
    wr
  );
}
var $g;
function Ib() {
  if ($g) return nf.exports;
  $g = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (nf.exports = Wb()), nf.exports);
}
var ew = Ib();
var Yp = (a) => {
    throw TypeError(a);
  },
  tw = (a, l, r) => l.has(a) || Yp("Cannot " + r),
  uf = (a, l, r) => (
    tw(a, l, "read from private field"),
    r ? r.call(a) : l.get(a)
  ),
  aw = (a, l, r) =>
    l.has(a)
      ? Yp("Cannot add the same private member more than once")
      : l instanceof WeakSet
        ? l.add(a)
        : l.set(a, r),
  Kg = "popstate";
function Jg(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "pathname" in a &&
    "search" in a &&
    "hash" in a &&
    "state" in a &&
    "key" in a
  );
}
function nw(a = {}) {
  function l(u, c) {
    let f = c.state?.masked,
      { pathname: h, search: g, hash: y } = f || u.location;
    return jr(
      "",
      { pathname: h, search: g, hash: y },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default",
      f
        ? {
            pathname: u.location.pathname,
            search: u.location.search,
            hash: u.location.hash,
          }
        : void 0,
    );
  }
  function r(u, c) {
    return typeof c == "string" ? c : Va(c);
  }
  return iw(l, r, null, a);
}
function je(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function pt(a, l) {
  if (!a) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function lw() {
  return Math.random().toString(36).substring(2, 10);
}
function Fg(a, l) {
  return {
    usr: a.state,
    key: a.key,
    idx: l,
    masked: a.unstable_mask
      ? { pathname: a.pathname, search: a.search, hash: a.hash }
      : void 0,
  };
}
function jr(a, l, r = null, u, c) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? mn(l) : l),
    state: r,
    key: (l && l.key) || u || lw(),
    unstable_mask: c,
  };
}
function Va({ pathname: a = "/", search: l = "", hash: r = "" }) {
  return (
    l && l !== "?" && (a += l.charAt(0) === "?" ? l : "?" + l),
    r && r !== "#" && (a += r.charAt(0) === "#" ? r : "#" + r),
    a
  );
}
function mn(a) {
  let l = {};
  if (a) {
    let r = a.indexOf("#");
    r >= 0 && ((l.hash = a.substring(r)), (a = a.substring(0, r)));
    let u = a.indexOf("?");
    (u >= 0 && ((l.search = a.substring(u)), (a = a.substring(0, u))),
      a && (l.pathname = a));
  }
  return l;
}
function iw(a, l, r, u = {}) {
  let { window: c = document.defaultView, v5Compat: f = !1 } = u,
    h = c.history,
    g = "POP",
    y = null,
    m = w();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ""));
  function w() {
    return (h.state || { idx: null }).idx;
  }
  function b() {
    g = "POP";
    let X = w(),
      P = X == null ? null : X - m;
    ((m = X), y && y({ action: g, location: Q.location, delta: P }));
  }
  function M(X, P) {
    g = "PUSH";
    let ee = Jg(X) ? X : jr(Q.location, X, P);
    m = w() + 1;
    let te = Fg(ee, m),
      Te = Q.createHref(ee.unstable_mask || ee);
    try {
      h.pushState(te, "", Te);
    } catch (be) {
      if (be instanceof DOMException && be.name === "DataCloneError") throw be;
      c.location.assign(Te);
    }
    f && y && y({ action: g, location: Q.location, delta: 1 });
  }
  function U(X, P) {
    g = "REPLACE";
    let ee = Jg(X) ? X : jr(Q.location, X, P);
    m = w();
    let te = Fg(ee, m),
      Te = Q.createHref(ee.unstable_mask || ee);
    (h.replaceState(te, "", Te),
      f && y && y({ action: g, location: Q.location, delta: 0 }));
  }
  function V(X) {
    return Vp(X);
  }
  let Q = {
    get action() {
      return g;
    },
    get location() {
      return a(c, h);
    },
    listen(X) {
      if (y) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Kg, b),
        (y = X),
        () => {
          (c.removeEventListener(Kg, b), (y = null));
        }
      );
    },
    createHref(X) {
      return l(c, X);
    },
    createURL: V,
    encodeLocation(X) {
      let P = V(X);
      return { pathname: P.pathname, search: P.search, hash: P.hash };
    },
    push: M,
    replace: U,
    go(X) {
      return h.go(X);
    },
  };
  return Q;
}
function Vp(a, l = !1) {
  let r = "http://localhost";
  (typeof window < "u" &&
    (r =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    je(r, "No window.location.(origin|href) available to create URL"));
  let u = typeof a == "string" ? a : Va(a);
  return (
    (u = u.replace(/ $/, "%20")),
    !l && u.startsWith("//") && (u = r + u),
    new URL(u, r)
  );
}
var Cr,
  Pg = class {
    constructor(a) {
      if ((aw(this, Cr, new Map()), a)) for (let [l, r] of a) this.set(l, r);
    }
    get(a) {
      if (uf(this, Cr).has(a)) return uf(this, Cr).get(a);
      if (a.defaultValue !== void 0) return a.defaultValue;
      throw new Error("No value found for context");
    }
    set(a, l) {
      uf(this, Cr).set(a, l);
    }
  };
Cr = new WeakMap();
var rw = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function ow(a) {
  return rw.has(a);
}
var uw = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children",
]);
function sw(a) {
  return uw.has(a);
}
function cw(a) {
  return a.index === !0;
}
function Mr(a, l, r = [], u = {}, c = !1) {
  return a.map((f, h) => {
    let g = [...r, String(h)],
      y = typeof f.id == "string" ? f.id : g.join("-");
    if (
      (je(
        f.index !== !0 || !f.children,
        "Cannot specify children on an index route",
      ),
      je(
        c || !u[y],
        `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`,
      ),
      cw(f))
    ) {
      let m = { ...f, id: y };
      return ((u[y] = Wg(m, l(m))), m);
    } else {
      let m = { ...f, id: y, children: void 0 };
      return (
        (u[y] = Wg(m, l(m))),
        f.children && (m.children = Mr(f.children, l, g, u, c)),
        m
      );
    }
  });
}
function Wg(a, l) {
  return Object.assign(a, {
    ...l,
    ...(typeof l.lazy == "object" && l.lazy != null
      ? { lazy: { ...a.lazy, ...l.lazy } }
      : {}),
  });
}
function Xn(a, l, r = "/") {
  return Tr(a, l, r, !1);
}
function Tr(a, l, r, u) {
  let c = typeof l == "string" ? mn(l) : l,
    f = Ea(c.pathname || "/", r);
  if (f == null) return null;
  let h = Xp(a);
  dw(h);
  let g = null;
  for (let y = 0; g == null && y < h.length; ++y) {
    let m = Ew(f);
    g = xw(h[y], m, u);
  }
  return g;
}
function fw(a, l) {
  let { route: r, pathname: u, params: c } = a;
  return {
    id: r.id,
    pathname: u,
    params: c,
    data: l[r.id],
    loaderData: l[r.id],
    handle: r.handle,
  };
}
function Xp(a, l = [], r = [], u = "", c = !1) {
  let f = (h, g, y = c, m) => {
    let w = {
      relativePath: m === void 0 ? h.path || "" : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: g,
      route: h,
    };
    if (w.relativePath.startsWith("/")) {
      if (!w.relativePath.startsWith(u) && y) return;
      (je(
        w.relativePath.startsWith(u),
        `Absolute route path "${w.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (w.relativePath = w.relativePath.slice(u.length)));
    }
    let b = Na([u, w.relativePath]),
      M = r.concat(w);
    (h.children &&
      h.children.length > 0 &&
      (je(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`,
      ),
      Xp(h.children, l, M, b, y)),
      !(h.path == null && !h.index) &&
        l.push({ path: b, score: bw(b, h.index), routesMeta: M }));
  };
  return (
    a.forEach((h, g) => {
      if (h.path === "" || !h.path?.includes("?")) f(h, g);
      else for (let y of Gp(h.path)) f(h, g, !0, y);
    }),
    l
  );
}
function Gp(a) {
  let l = a.split("/");
  if (l.length === 0) return [];
  let [r, ...u] = l,
    c = r.endsWith("?"),
    f = r.replace(/\?$/, "");
  if (u.length === 0) return c ? [f, ""] : [f];
  let h = Gp(u.join("/")),
    g = [];
  return (
    g.push(...h.map((y) => (y === "" ? f : [f, y].join("/")))),
    c && g.push(...h),
    g.map((y) => (a.startsWith("/") && y === "" ? "/" : y))
  );
}
function dw(a) {
  a.sort((l, r) =>
    l.score !== r.score
      ? r.score - l.score
      : ww(
          l.routesMeta.map((u) => u.childrenIndex),
          r.routesMeta.map((u) => u.childrenIndex),
        ),
  );
}
var hw = /^:[\w-]+$/,
  mw = 3,
  gw = 2,
  pw = 1,
  yw = 10,
  vw = -2,
  Ig = (a) => a === "*";
function bw(a, l) {
  let r = a.split("/"),
    u = r.length;
  return (
    r.some(Ig) && (u += vw),
    l && (u += gw),
    r
      .filter((c) => !Ig(c))
      .reduce((c, f) => c + (hw.test(f) ? mw : f === "" ? pw : yw), u)
  );
}
function ww(a, l) {
  return a.length === l.length && a.slice(0, -1).every((u, c) => u === l[c])
    ? a[a.length - 1] - l[l.length - 1]
    : 0;
}
function xw(a, l, r = !1) {
  let { routesMeta: u } = a,
    c = {},
    f = "/",
    h = [];
  for (let g = 0; g < u.length; ++g) {
    let y = u[g],
      m = g === u.length - 1,
      w = f === "/" ? l : l.slice(f.length) || "/",
      b = vu(
        { path: y.relativePath, caseSensitive: y.caseSensitive, end: m },
        w,
      ),
      M = y.route;
    if (
      (!b &&
        m &&
        r &&
        !u[u.length - 1].route.index &&
        (b = vu(
          { path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 },
          w,
        )),
      !b)
    )
      return null;
    (Object.assign(c, b.params),
      h.push({
        params: c,
        pathname: Na([f, b.pathname]),
        pathnameBase: Aw(Na([f, b.pathnameBase])),
        route: M,
      }),
      b.pathnameBase !== "/" && (f = Na([f, b.pathnameBase])));
  }
  return h;
}
function vu(a, l) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [r, u] = Sw(a.path, a.caseSensitive, a.end),
    c = l.match(r);
  if (!c) return null;
  let f = c[0],
    h = f.replace(/(.)\/+$/, "$1"),
    g = c.slice(1);
  return {
    params: u.reduce((m, { paramName: w, isOptional: b }, M) => {
      if (w === "*") {
        let V = g[M] || "";
        h = f.slice(0, f.length - V.length).replace(/(.)\/+$/, "$1");
      }
      const U = g[M];
      return (
        b && !U ? (m[w] = void 0) : (m[w] = (U || "").replace(/%2F/g, "/")),
        m
      );
    }, {}),
    pathname: f,
    pathnameBase: h,
    pattern: a,
  };
}
function Sw(a, l = !1, r = !0) {
  pt(
    a === "*" || !a.endsWith("*") || a.endsWith("/*"),
    `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, "/*")}".`,
  );
  let u = [],
    c =
      "^" +
      a
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (h, g, y, m, w) => {
          if ((u.push({ paramName: g, isOptional: y != null }), y)) {
            let b = w.charAt(m + h.length);
            return b && b !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    a.endsWith("*")
      ? (u.push({ paramName: "*" }),
        (c += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (c += "\\/*$")
        : a !== "" && a !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, l ? void 0 : "i"), u]
  );
}
function Ew(a) {
  try {
    return a
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      pt(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`,
      ),
      a
    );
  }
}
function Ea(a, l) {
  if (l === "/") return a;
  if (!a.toLowerCase().startsWith(l.toLowerCase())) return null;
  let r = l.endsWith("/") ? l.length - 1 : l.length,
    u = a.charAt(r);
  return u && u !== "/" ? null : a.slice(r) || "/";
}
function Cw({ basename: a, pathname: l }) {
  return l === "/" ? a : Na([a, l]);
}
var Qp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  jf = (a) => Qp.test(a);
function Tw(a, l = "/") {
  let {
      pathname: r,
      search: u = "",
      hash: c = "",
    } = typeof a == "string" ? mn(a) : a,
    f;
  return (
    r
      ? ((r = r.replace(/\/\/+/g, "/")),
        r.startsWith("/") ? (f = ep(r.substring(1), "/")) : (f = ep(r, l)))
      : (f = l),
    { pathname: f, search: jw(u), hash: Mw(c) }
  );
}
function ep(a, l) {
  let r = l.replace(/\/+$/, "").split("/");
  return (
    a.split("/").forEach((c) => {
      c === ".." ? r.length > 1 && r.pop() : c !== "." && r.push(c);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function sf(a, l, r, u) {
  return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Zp(a) {
  return a.filter(
    (l, r) => r === 0 || (l.route.path && l.route.path.length > 0),
  );
}
function Du(a) {
  let l = Zp(a);
  return l.map((r, u) => (u === l.length - 1 ? r.pathname : r.pathnameBase));
}
function Dr(a, l, r, u = !1) {
  let c;
  typeof a == "string"
    ? (c = mn(a))
    : ((c = { ...a }),
      je(
        !c.pathname || !c.pathname.includes("?"),
        sf("?", "pathname", "search", c),
      ),
      je(
        !c.pathname || !c.pathname.includes("#"),
        sf("#", "pathname", "hash", c),
      ),
      je(!c.search || !c.search.includes("#"), sf("#", "search", "hash", c)));
  let f = a === "" || c.pathname === "",
    h = f ? "/" : c.pathname,
    g;
  if (h == null) g = r;
  else {
    let b = l.length - 1;
    if (!u && h.startsWith("..")) {
      let M = h.split("/");
      for (; M[0] === ".."; ) (M.shift(), (b -= 1));
      c.pathname = M.join("/");
    }
    g = b >= 0 ? l[b] : "/";
  }
  let y = Tw(c, g),
    m = h && h !== "/" && h.endsWith("/"),
    w = (f || h === ".") && r.endsWith("/");
  return (!y.pathname.endsWith("/") && (m || w) && (y.pathname += "/"), y);
}
var Na = (a) => a.join("/").replace(/\/\/+/g, "/"),
  Aw = (a) => a.replace(/\/+$/, "").replace(/^\/*/, "/"),
  jw = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  Mw = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a),
  zr = class {
    constructor(a, l, r, u = !1) {
      ((this.status = a),
        (this.statusText = l || ""),
        (this.internal = u),
        r instanceof Error
          ? ((this.data = r.toString()), (this.error = r))
          : (this.data = r));
    }
  };
function Rr(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.internal == "boolean" &&
    "data" in a
  );
}
function Or(a) {
  return (
    a
      .map((l) => l.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var $p =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Kp(a, l) {
  let r = a;
  if (typeof r != "string" || !Qp.test(r))
    return { absoluteURL: void 0, isExternal: !1, to: r };
  let u = r,
    c = !1;
  if ($p)
    try {
      let f = new URL(window.location.href),
        h = r.startsWith("//") ? new URL(f.protocol + r) : new URL(r),
        g = Ea(h.pathname, l);
      h.origin === f.origin && g != null
        ? (r = g + h.search + h.hash)
        : (c = !0);
    } catch {
      pt(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: u, isExternal: c, to: r };
}
var Qn = Symbol("Uninstrumented");
function Rw(a, l) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: [],
  };
  a.forEach((c) =>
    c({
      id: l.id,
      index: l.index,
      path: l.path,
      instrument(f) {
        let h = Object.keys(r);
        for (let g of h) f[g] && r[g].push(f[g]);
      },
    }),
  );
  let u = {};
  if (typeof l.lazy == "function" && r.lazy.length > 0) {
    let c = mi(r.lazy, l.lazy, () => {});
    c && (u.lazy = c);
  }
  if (typeof l.lazy == "object") {
    let c = l.lazy;
    ["middleware", "loader", "action"].forEach((f) => {
      let h = c[f],
        g = r[`lazy.${f}`];
      if (typeof h == "function" && g.length > 0) {
        let y = mi(g, h, () => {});
        y && (u.lazy = Object.assign(u.lazy || {}, { [f]: y }));
      }
    });
  }
  return (
    ["loader", "action"].forEach((c) => {
      let f = l[c];
      if (typeof f == "function" && r[c].length > 0) {
        let h = f[Qn] ?? f,
          g = mi(r[c], h, (...y) => tp(y[0]));
        g &&
          (c === "loader" && h.hydrate === !0 && (g.hydrate = !0),
          (g[Qn] = h),
          (u[c] = g));
      }
    }),
    l.middleware &&
      l.middleware.length > 0 &&
      r.middleware.length > 0 &&
      (u.middleware = l.middleware.map((c) => {
        let f = c[Qn] ?? c,
          h = mi(r.middleware, f, (...g) => tp(g[0]));
        return h ? ((h[Qn] = f), h) : c;
      })),
    u
  );
}
function Dw(a, l) {
  let r = { navigate: [], fetch: [] };
  if (
    (l.forEach((u) =>
      u({
        instrument(c) {
          let f = Object.keys(c);
          for (let h of f) c[h] && r[h].push(c[h]);
        },
      }),
    ),
    r.navigate.length > 0)
  ) {
    let u = a.navigate[Qn] ?? a.navigate,
      c = mi(r.navigate, u, (...f) => {
        let [h, g] = f;
        return {
          to:
            typeof h == "number" || typeof h == "string" ? h : h ? Va(h) : ".",
          ...ap(a, g ?? {}),
        };
      });
    c && ((c[Qn] = u), (a.navigate = c));
  }
  if (r.fetch.length > 0) {
    let u = a.fetch[Qn] ?? a.fetch,
      c = mi(r.fetch, u, (...f) => {
        let [h, , g, y] = f;
        return { href: g ?? ".", fetcherKey: h, ...ap(a, y ?? {}) };
      });
    c && ((c[Qn] = u), (a.fetch = c));
  }
  return a;
}
function mi(a, l, r) {
  return a.length === 0
    ? null
    : async (...u) => {
        let c = await Jp(a, r(...u), () => l(...u), a.length - 1);
        if (c.type === "error") throw c.value;
        return c.value;
      };
}
async function Jp(a, l, r, u) {
  let c = a[u],
    f;
  if (c) {
    let h,
      g = async () => (
        h
          ? console.error(
              "You cannot call instrumented handlers more than once",
            )
          : (h = Jp(a, l, r, u - 1)),
        (f = await h),
        je(f, "Expected a result"),
        f.type === "error" && f.value instanceof Error
          ? { status: "error", error: f.value }
          : { status: "success", error: void 0 }
      );
    try {
      await c(g, l);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    (h || (await g()), await h);
  } else
    try {
      f = { type: "success", value: await r() };
    } catch (h) {
      f = { type: "error", value: h };
    }
  return (
    f || {
      type: "error",
      value: new Error("No result assigned in instrumentation chain."),
    }
  );
}
function tp(a) {
  let { request: l, context: r, params: u, unstable_pattern: c } = a;
  return {
    request: zw(l),
    params: { ...u },
    unstable_pattern: c,
    context: Ow(r),
  };
}
function ap(a, l) {
  return {
    currentUrl: Va(a.state.location),
    ...("formMethod" in l ? { formMethod: l.formMethod } : {}),
    ...("formEncType" in l ? { formEncType: l.formEncType } : {}),
    ...("formData" in l ? { formData: l.formData } : {}),
    ...("body" in l ? { body: l.body } : {}),
  };
}
function zw(a) {
  return {
    method: a.method,
    url: a.url,
    headers: { get: (...l) => a.headers.get(...l) },
  };
}
function Ow(a) {
  if (_w(a)) {
    let l = { ...a };
    return (Object.freeze(l), l);
  } else return { get: (l) => a.get(l) };
}
var Nw = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function _w(a) {
  if (a === null || typeof a != "object") return !1;
  const l = Object.getPrototypeOf(a);
  return (
    l === Object.prototype ||
    l === null ||
    Object.getOwnPropertyNames(l).sort().join("\0") === Nw
  );
}
var Fp = ["POST", "PUT", "PATCH", "DELETE"],
  Lw = new Set(Fp),
  Uw = ["GET", ...Fp],
  Bw = new Set(Uw),
  Pp = new Set([301, 302, 303, 307, 308]),
  Hw = new Set([307, 308]),
  cf = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  kw = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  xr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  qw = (a) => ({ hasErrorBoundary: !!a.hasErrorBoundary }),
  Wp = "remix-router-transitions",
  Ip = Symbol("ResetLoaderData");
function Yw(a) {
  const l = a.window ? a.window : typeof window < "u" ? window : void 0,
    r =
      typeof l < "u" &&
      typeof l.document < "u" &&
      typeof l.document.createElement < "u";
  je(
    a.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let u = a.hydrationRouteProperties || [],
    c = a.mapRouteProperties || qw,
    f = c;
  if (a.unstable_instrumentations) {
    let S = a.unstable_instrumentations;
    f = (A) => ({ ...c(A), ...Rw(S.map((N) => N.route).filter(Boolean), A) });
  }
  let h = {},
    g = Mr(a.routes, f, void 0, h),
    y,
    m = a.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let w = a.dataStrategy || Zw,
    b = { ...a.future },
    M = null,
    U = new Set(),
    V = null,
    Q = null,
    X = null,
    P = a.hydrationData != null,
    ee = Xn(g, a.history.location, m),
    te = !1,
    Te = null,
    be,
    Se;
  if (ee == null && !a.patchRoutesOnNavigation) {
    let S = Sa(404, { pathname: a.history.location.pathname }),
      { matches: A, route: N } = su(g);
    ((be = !0), (Se = !be), (ee = A), (Te = { [N.id]: S }));
  } else if (
    (ee &&
      !a.hydrationData &&
      vn(ee, g, a.history.location.pathname).active &&
      (ee = null),
    ee)
  )
    if (ee.some((S) => S.route.lazy)) ((be = !1), (Se = !be));
    else if (!ee.some((S) => Mf(S.route))) ((be = !0), (Se = !be));
    else {
      let S = a.hydrationData ? a.hydrationData.loaderData : null,
        A = a.hydrationData ? a.hydrationData.errors : null,
        N = ee;
      if (A) {
        let G = ee.findIndex(($) => A[$.route.id] !== void 0);
        N = N.slice(0, G + 1);
      }
      ((Se = !1),
        (be = N.every((G) => {
          let $ = ey(G.route, S, A);
          return ((Se = Se || $.renderFallback), !$.shouldLoad);
        })));
    }
  else {
    ((be = !1), (Se = !be), (ee = []));
    let S = vn(null, g, a.history.location.pathname);
    S.active && S.matches && ((te = !0), (ee = S.matches));
  }
  let se,
    R = {
      historyAction: a.history.action,
      location: a.history.location,
      matches: ee,
      initialized: be,
      renderFallback: Se,
      navigation: cf,
      restoreScrollPosition: a.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (a.hydrationData && a.hydrationData.loaderData) || {},
      actionData: (a.hydrationData && a.hydrationData.actionData) || null,
      errors: (a.hydrationData && a.hydrationData.errors) || Te,
      fetchers: new Map(),
      blockers: new Map(),
    },
    Ae = "POP",
    Le = null,
    Pe = !1,
    ve,
    ut = !1,
    Ue = new Map(),
    ye = null,
    _ = !1,
    Z = !1,
    le = new Set(),
    ie = new Map(),
    Ee = 0,
    C = -1,
    k = new Map(),
    K = new Set(),
    F = new Map(),
    me = new Map(),
    pe = new Set(),
    Me = new Map(),
    vt,
    We = null;
  function Fn() {
    if (
      ((M = a.history.listen(({ action: S, location: A, delta: N }) => {
        if (vt) {
          (vt(), (vt = void 0));
          return;
        }
        pt(
          Me.size === 0 || N != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let G = Wn({
          currentLocation: R.location,
          nextLocation: A,
          historyAction: S,
        });
        if (G && N != null) {
          let $ = new Promise((ae) => {
            vt = ae;
          });
          (a.history.go(N * -1),
            $a(G, {
              state: "blocked",
              location: A,
              proceed() {
                ($a(G, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: A,
                }),
                  $.then(() => a.history.go(N)));
              },
              reset() {
                let ae = new Map(R.blockers);
                (ae.set(G, xr), Ct({ blockers: ae }));
              },
            }),
            Le?.resolve(),
            (Le = null));
          return;
        }
        return Ga(S, A);
      })),
      r)
    ) {
      c2(l, Ue);
      let S = () => f2(l, Ue);
      (l.addEventListener("pagehide", S),
        (ye = () => l.removeEventListener("pagehide", S)));
    }
    return (
      R.initialized || Ga("POP", R.location, { initialHydration: !0 }),
      se
    );
  }
  function Al() {
    (M && M(),
      ye && ye(),
      U.clear(),
      ve && ve.abort(),
      R.fetchers.forEach((S, A) => Za(A)),
      R.blockers.forEach((S, A) => Pn(A)));
  }
  function Ai(S) {
    return (U.add(S), () => U.delete(S));
  }
  function Ct(S, A = {}) {
    (S.matches &&
      (S.matches = S.matches.map(($) => {
        let ae = h[$.route.id],
          J = $.route;
        return J.element !== ae.element ||
          J.errorElement !== ae.errorElement ||
          J.hydrateFallbackElement !== ae.hydrateFallbackElement
          ? { ...$, route: ae }
          : $;
      })),
      (R = { ...R, ...S }));
    let N = [],
      G = [];
    (R.fetchers.forEach(($, ae) => {
      $.state === "idle" && (pe.has(ae) ? N.push(ae) : G.push(ae));
    }),
      pe.forEach(($) => {
        !R.fetchers.has($) && !ie.has($) && N.push($);
      }),
      [...U].forEach(($) =>
        $(R, {
          deletedFetchers: N,
          newErrors: S.errors ?? null,
          viewTransitionOpts: A.viewTransitionOpts,
          flushSync: A.flushSync === !0,
        }),
      ),
      N.forEach(($) => Za($)),
      G.forEach(($) => R.fetchers.delete($)));
  }
  function Qt(S, A, { flushSync: N } = {}) {
    let G =
        R.actionData != null &&
        R.navigation.formMethod != null &&
        Ht(R.navigation.formMethod) &&
        R.navigation.state === "loading" &&
        S.state?._isRedirect !== !0,
      $;
    A.actionData
      ? Object.keys(A.actionData).length > 0
        ? ($ = A.actionData)
        : ($ = null)
      : G
        ? ($ = R.actionData)
        : ($ = null);
    let ae = A.loaderData
        ? dp(R.loaderData, A.loaderData, A.matches || [], A.errors)
        : R.loaderData,
      J = R.blockers;
    J.size > 0 && ((J = new Map(J)), J.forEach((he, ce) => J.set(ce, xr)));
    let W = _ ? !1 : zi(S, A.matches || R.matches),
      I =
        Pe === !0 ||
        (R.navigation.formMethod != null &&
          Ht(R.navigation.formMethod) &&
          S.state?._isRedirect !== !0);
    (y && ((g = y), (y = void 0)),
      _ ||
        Ae === "POP" ||
        (Ae === "PUSH"
          ? a.history.push(S, S.state)
          : Ae === "REPLACE" && a.history.replace(S, S.state)));
    let fe;
    if (Ae === "POP") {
      let he = Ue.get(R.location.pathname);
      he && he.has(S.pathname)
        ? (fe = { currentLocation: R.location, nextLocation: S })
        : Ue.has(S.pathname) &&
          (fe = { currentLocation: S, nextLocation: R.location });
    } else if (ut) {
      let he = Ue.get(R.location.pathname);
      (he
        ? he.add(S.pathname)
        : ((he = new Set([S.pathname])), Ue.set(R.location.pathname, he)),
        (fe = { currentLocation: R.location, nextLocation: S }));
    }
    (Ct(
      {
        ...A,
        actionData: $,
        loaderData: ae,
        historyAction: Ae,
        location: S,
        initialized: !0,
        renderFallback: !1,
        navigation: cf,
        revalidation: "idle",
        restoreScrollPosition: W,
        preventScrollReset: I,
        blockers: J,
      },
      { viewTransitionOpts: fe, flushSync: N === !0 },
    ),
      (Ae = "POP"),
      (Pe = !1),
      (ut = !1),
      (_ = !1),
      (Z = !1),
      Le?.resolve(),
      (Le = null),
      We?.resolve(),
      (We = null));
  }
  async function jl(S, A) {
    if ((Le?.resolve(), (Le = null), typeof S == "number")) {
      Le || (Le = pp());
      let Ie = Le.promise;
      return (a.history.go(S), Ie);
    }
    let N = bf(R.location, R.matches, m, S, A?.fromRouteId, A?.relative),
      { path: G, submission: $, error: ae } = np(!1, N, A),
      J;
    A?.unstable_mask &&
      (J = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof A.unstable_mask == "string"
          ? mn(A.unstable_mask)
          : { ...R.location.unstable_mask, ...A.unstable_mask }),
      });
    let W = R.location,
      I = jr(W, G, A && A.state, void 0, J);
    I = { ...I, ...a.history.encodeLocation(I) };
    let fe = A && A.replace != null ? A.replace : void 0,
      he = "PUSH";
    fe === !0
      ? (he = "REPLACE")
      : fe === !1 ||
        ($ != null &&
          Ht($.formMethod) &&
          $.formAction === R.location.pathname + R.location.search &&
          (he = "REPLACE"));
    let ce =
        A && "preventScrollReset" in A ? A.preventScrollReset === !0 : void 0,
      ke = (A && A.flushSync) === !0,
      Re = Wn({ currentLocation: W, nextLocation: I, historyAction: he });
    if (Re) {
      $a(Re, {
        state: "blocked",
        location: I,
        proceed() {
          ($a(Re, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: I,
          }),
            jl(S, A));
        },
        reset() {
          let Ie = new Map(R.blockers);
          (Ie.set(Re, xr), Ct({ blockers: Ie }));
        },
      });
      return;
    }
    await Ga(he, I, {
      submission: $,
      pendingError: ae,
      preventScrollReset: ce,
      replace: A && A.replace,
      enableViewTransition: A && A.viewTransition,
      flushSync: ke,
      callSiteDefaultShouldRevalidate: A && A.unstable_defaultShouldRevalidate,
    });
  }
  function ji() {
    (We || (We = pp()), pn(), Ct({ revalidation: "loading" }));
    let S = We.promise;
    return R.navigation.state === "submitting"
      ? S
      : R.navigation.state === "idle"
        ? (Ga(R.historyAction, R.location, {
            startUninterruptedRevalidation: !0,
          }),
          S)
        : (Ga(Ae || R.historyAction, R.navigation.location, {
            overrideNavigation: R.navigation,
            enableViewTransition: ut === !0,
          }),
          S);
  }
  async function Ga(S, A, N) {
    (ve && ve.abort(),
      (ve = null),
      (Ae = S),
      (_ = (N && N.startUninterruptedRevalidation) === !0),
      Ku(R.location, R.matches),
      (Pe = (N && N.preventScrollReset) === !0),
      (ut = (N && N.enableViewTransition) === !0));
    let G = y || g,
      $ = N && N.overrideNavigation,
      ae =
        N?.initialHydration && R.matches && R.matches.length > 0 && !te
          ? R.matches
          : Xn(G, A, m),
      J = (N && N.flushSync) === !0;
    if (
      ae &&
      R.initialized &&
      !Z &&
      e2(R.location, A) &&
      !(N && N.submission && Ht(N.submission.formMethod))
    ) {
      Qt(A, { matches: ae }, { flushSync: J });
      return;
    }
    let W = vn(ae, G, A.pathname);
    if ((W.active && W.matches && (ae = W.matches), !ae)) {
      let { error: at, notFoundMatches: st, route: He } = ja(A.pathname);
      Qt(
        A,
        { matches: st, loaderData: {}, errors: { [He.id]: at } },
        { flushSync: J },
      );
      return;
    }
    ve = new AbortController();
    let I = hi(a.history, A, ve.signal, N && N.submission),
      fe = a.getContext ? await a.getContext() : new Pg(),
      he;
    if (N && N.pendingError)
      he = [Gn(ae).route.id, { type: "error", error: N.pendingError }];
    else if (N && N.submission && Ht(N.submission.formMethod)) {
      let at = await Gr(
        I,
        A,
        N.submission,
        ae,
        fe,
        W.active,
        N && N.initialHydration === !0,
        { replace: N.replace, flushSync: J },
      );
      if (at.shortCircuited) return;
      if (at.pendingActionResult) {
        let [st, He] = at.pendingActionResult;
        if (ra(He) && Rr(He.error) && He.error.status === 404) {
          ((ve = null),
            Qt(A, {
              matches: at.matches,
              loaderData: {},
              errors: { [st]: He.error },
            }));
          return;
        }
      }
      ((ae = at.matches || ae),
        (he = at.pendingActionResult),
        ($ = ff(A, N.submission)),
        (J = !1),
        (W.active = !1),
        (I = hi(a.history, I.url, I.signal)));
    }
    let {
      shortCircuited: ce,
      matches: ke,
      loaderData: Re,
      errors: Ie,
    } = await Mi(
      I,
      A,
      ae,
      fe,
      W.active,
      $,
      N && N.submission,
      N && N.fetcherSubmission,
      N && N.replace,
      N && N.initialHydration === !0,
      J,
      he,
      N && N.callSiteDefaultShouldRevalidate,
    );
    ce ||
      ((ve = null),
      Qt(A, { matches: ke || ae, ...hp(he), loaderData: Re, errors: Ie }));
  }
  async function Gr(S, A, N, G, $, ae, J, W = {}) {
    pn();
    let I = u2(A, N);
    if ((Ct({ navigation: I }, { flushSync: W.flushSync === !0 }), ae)) {
      let ce = await _a(G, A.pathname, S.signal);
      if (ce.type === "aborted") return { shortCircuited: !0 };
      if (ce.type === "error") {
        if (ce.partialMatches.length === 0) {
          let { matches: Re, route: Ie } = su(g);
          return {
            matches: Re,
            pendingActionResult: [Ie.id, { type: "error", error: ce.error }],
          };
        }
        let ke = Gn(ce.partialMatches).route.id;
        return {
          matches: ce.partialMatches,
          pendingActionResult: [ke, { type: "error", error: ce.error }],
        };
      } else if (ce.matches) G = ce.matches;
      else {
        let { notFoundMatches: ke, error: Re, route: Ie } = ja(A.pathname);
        return {
          matches: ke,
          pendingActionResult: [Ie.id, { type: "error", error: Re }],
        };
      }
    }
    let fe,
      he = gu(G, A);
    if (!he.route.action && !he.route.lazy)
      fe = {
        type: "error",
        error: Sa(405, {
          method: S.method,
          pathname: A.pathname,
          routeId: he.route.id,
        }),
      };
    else {
      let ce = gi(f, h, S, G, he, J ? [] : u, $),
        ke = await gn(S, ce, $, null);
      if (((fe = ke[he.route.id]), !fe)) {
        for (let Re of G)
          if (ke[Re.route.id]) {
            fe = ke[Re.route.id];
            break;
          }
      }
      if (S.signal.aborted) return { shortCircuited: !0 };
    }
    if (vl(fe)) {
      let ce;
      return (
        W && W.replace != null
          ? (ce = W.replace)
          : (ce =
              sp(
                fe.response.headers.get("Location"),
                new URL(S.url),
                m,
                a.history,
              ) ===
              R.location.pathname + R.location.search),
        await Qa(S, fe, !0, { submission: N, replace: ce }),
        { shortCircuited: !0 }
      );
    }
    if (ra(fe)) {
      let ce = Gn(G, he.route.id);
      return (
        (W && W.replace) !== !0 && (Ae = "PUSH"),
        { matches: G, pendingActionResult: [ce.route.id, fe, he.route.id] }
      );
    }
    return { matches: G, pendingActionResult: [he.route.id, fe] };
  }
  async function Mi(S, A, N, G, $, ae, J, W, I, fe, he, ce, ke) {
    let Re = ae || ff(A, J),
      Ie = J || W || gp(Re),
      at = !_ && !fe;
    if ($) {
      if (at) {
        let dt = Ml(ce);
        Ct(
          { navigation: Re, ...(dt !== void 0 ? { actionData: dt } : {}) },
          { flushSync: he },
        );
      }
      let De = await _a(N, A.pathname, S.signal);
      if (De.type === "aborted") return { shortCircuited: !0 };
      if (De.type === "error") {
        if (De.partialMatches.length === 0) {
          let { matches: Ut, route: bt } = su(g);
          return { matches: Ut, loaderData: {}, errors: { [bt.id]: De.error } };
        }
        let dt = Gn(De.partialMatches).route.id;
        return {
          matches: De.partialMatches,
          loaderData: {},
          errors: { [dt]: De.error },
        };
      } else if (De.matches) N = De.matches;
      else {
        let { error: dt, notFoundMatches: Ut, route: bt } = ja(A.pathname);
        return { matches: Ut, loaderData: {}, errors: { [bt.id]: dt } };
      }
    }
    let st = y || g,
      { dsMatches: He, revalidatingFetchers: Tt } = lp(
        S,
        G,
        f,
        h,
        a.history,
        R,
        N,
        Ie,
        A,
        fe ? [] : u,
        fe === !0,
        Z,
        le,
        pe,
        F,
        K,
        st,
        m,
        a.patchRoutesOnNavigation != null,
        ce,
        ke,
      );
    if (
      ((C = ++Ee),
      !a.dataStrategy &&
        !He.some((De) => De.shouldLoad) &&
        !He.some(
          (De) => De.route.middleware && De.route.middleware.length > 0,
        ) &&
        Tt.length === 0)
    ) {
      let De = Zr();
      return (
        Qt(
          A,
          {
            matches: N,
            loaderData: {},
            errors: ce && ra(ce[1]) ? { [ce[0]]: ce[1].error } : null,
            ...hp(ce),
            ...(De ? { fetchers: new Map(R.fetchers) } : {}),
          },
          { flushSync: he },
        ),
        { shortCircuited: !0 }
      );
    }
    if (at) {
      let De = {};
      if (!$) {
        De.navigation = Re;
        let dt = Ml(ce);
        dt !== void 0 && (De.actionData = dt);
      }
      (Tt.length > 0 && (De.fetchers = Ri(Tt)), Ct(De, { flushSync: he }));
    }
    Tt.forEach((De) => {
      (jt(De.key), De.controller && ie.set(De.key, De.controller));
    });
    let tt = () => Tt.forEach((De) => jt(De.key));
    ve && ve.signal.addEventListener("abort", tt);
    let { loaderResults: bn, fetcherResults: Ma } = await Di(He, Tt, S, G);
    if (S.signal.aborted) return { shortCircuited: !0 };
    (ve && ve.signal.removeEventListener("abort", tt),
      Tt.forEach((De) => ie.delete(De.key)));
    let Mt = cu(bn);
    if (Mt)
      return (
        await Qa(S, Mt.result, !0, { replace: I }),
        { shortCircuited: !0 }
      );
    if (((Mt = cu(Ma)), Mt))
      return (
        K.add(Mt.key),
        await Qa(S, Mt.result, !0, { replace: I }),
        { shortCircuited: !0 }
      );
    let { loaderData: La, errors: In } = fp(R, N, bn, ce, Tt, Ma);
    fe && R.errors && (In = { ...R.errors, ...In });
    let Ua = Zr(),
      el = $r(C),
      Dl = Ua || el || Tt.length > 0;
    return {
      matches: N,
      loaderData: La,
      errors: In,
      ...(Dl ? { fetchers: new Map(R.fetchers) } : {}),
    };
  }
  function Ml(S) {
    if (S && !ra(S[1])) return { [S[0]]: S[1].data };
    if (R.actionData)
      return Object.keys(R.actionData).length === 0 ? null : R.actionData;
  }
  function Ri(S) {
    return (
      S.forEach((A) => {
        let N = R.fetchers.get(A.key),
          G = Sr(void 0, N ? N.data : void 0);
        R.fetchers.set(A.key, G);
      }),
      new Map(R.fetchers)
    );
  }
  async function Gu(S, A, N, G) {
    jt(S);
    let $ = (G && G.flushSync) === !0,
      ae = y || g,
      J = bf(R.location, R.matches, m, N, A, G?.relative),
      W = Xn(ae, J, m),
      I = vn(W, ae, J);
    if ((I.active && I.matches && (W = I.matches), !W)) {
      da(S, A, Sa(404, { pathname: J }), { flushSync: $ });
      return;
    }
    let { path: fe, submission: he, error: ce } = np(!0, J, G);
    if (ce) {
      da(S, A, ce, { flushSync: $ });
      return;
    }
    let ke = a.getContext ? await a.getContext() : new Pg(),
      Re = (G && G.preventScrollReset) === !0;
    if (he && Ht(he.formMethod)) {
      await Qu(
        S,
        A,
        fe,
        W,
        ke,
        I.active,
        $,
        Re,
        he,
        G && G.unstable_defaultShouldRevalidate,
      );
      return;
    }
    (F.set(S, { routeId: A, path: fe }),
      await qt(S, A, fe, W, ke, I.active, $, Re, he));
  }
  async function Qu(S, A, N, G, $, ae, J, W, I, fe) {
    (pn(), F.delete(S));
    let he = R.fetchers.get(S);
    Aa(S, s2(I, he), { flushSync: J });
    let ce = new AbortController(),
      ke = hi(a.history, N, ce.signal, I);
    if (ae) {
      let nt = await _a(G, new URL(ke.url).pathname, ke.signal, S);
      if (nt.type === "aborted") return;
      if (nt.type === "error") {
        da(S, A, nt.error, { flushSync: J });
        return;
      } else if (nt.matches) G = nt.matches;
      else {
        da(S, A, Sa(404, { pathname: N }), { flushSync: J });
        return;
      }
    }
    let Re = gu(G, N);
    if (!Re.route.action && !Re.route.lazy) {
      let nt = Sa(405, { method: I.formMethod, pathname: N, routeId: A });
      da(S, A, nt, { flushSync: J });
      return;
    }
    ie.set(S, ce);
    let Ie = Ee,
      at = gi(f, h, ke, G, Re, u, $),
      st = await gn(ke, at, $, S),
      He = st[Re.route.id];
    if (!He) {
      for (let nt of at)
        if (st[nt.route.id]) {
          He = st[nt.route.id];
          break;
        }
    }
    if (ke.signal.aborted) {
      ie.get(S) === ce && ie.delete(S);
      return;
    }
    if (pe.has(S)) {
      if (vl(He) || ra(He)) {
        Aa(S, dn(void 0));
        return;
      }
    } else {
      if (vl(He))
        if ((ie.delete(S), C > Ie)) {
          Aa(S, dn(void 0));
          return;
        } else
          return (
            K.add(S),
            Aa(S, Sr(I)),
            Qa(ke, He, !1, { fetcherSubmission: I, preventScrollReset: W })
          );
      if (ra(He)) {
        da(S, A, He.error);
        return;
      }
    }
    let Tt = R.navigation.location || R.location,
      tt = hi(a.history, Tt, ce.signal),
      bn = y || g,
      Ma =
        R.navigation.state !== "idle"
          ? Xn(bn, R.navigation.location, m)
          : R.matches;
    je(Ma, "Didn't find any matches after fetcher action");
    let Mt = ++Ee;
    k.set(S, Mt);
    let La = Sr(I, He.data);
    R.fetchers.set(S, La);
    let { dsMatches: In, revalidatingFetchers: Ua } = lp(
      tt,
      $,
      f,
      h,
      a.history,
      R,
      Ma,
      I,
      Tt,
      u,
      !1,
      Z,
      le,
      pe,
      F,
      K,
      bn,
      m,
      a.patchRoutesOnNavigation != null,
      [Re.route.id, He],
      fe,
    );
    (Ua.filter((nt) => nt.key !== S).forEach((nt) => {
      let zl = nt.key,
        Ol = R.fetchers.get(zl),
        Pr = Sr(void 0, Ol ? Ol.data : void 0);
      (R.fetchers.set(zl, Pr),
        jt(zl),
        nt.controller && ie.set(zl, nt.controller));
    }),
      Ct({ fetchers: new Map(R.fetchers) }));
    let el = () => Ua.forEach((nt) => jt(nt.key));
    ce.signal.addEventListener("abort", el);
    let { loaderResults: Dl, fetcherResults: De } = await Di(In, Ua, tt, $);
    if (ce.signal.aborted) return;
    if (
      (ce.signal.removeEventListener("abort", el),
      k.delete(S),
      ie.delete(S),
      Ua.forEach((nt) => ie.delete(nt.key)),
      R.fetchers.has(S))
    ) {
      let nt = dn(He.data);
      R.fetchers.set(S, nt);
    }
    let dt = cu(Dl);
    if (dt) return Qa(tt, dt.result, !1, { preventScrollReset: W });
    if (((dt = cu(De)), dt))
      return (K.add(dt.key), Qa(tt, dt.result, !1, { preventScrollReset: W }));
    let { loaderData: Ut, errors: bt } = fp(R, Ma, Dl, void 0, Ua, De);
    ($r(Mt),
      R.navigation.state === "loading" && Mt > C
        ? (je(Ae, "Expected pending action"),
          ve && ve.abort(),
          Qt(R.navigation.location, {
            matches: Ma,
            loaderData: Ut,
            errors: bt,
            fetchers: new Map(R.fetchers),
          }))
        : (Ct({
            errors: bt,
            loaderData: dp(R.loaderData, Ut, Ma, bt),
            fetchers: new Map(R.fetchers),
          }),
          (Z = !1)));
  }
  async function qt(S, A, N, G, $, ae, J, W, I) {
    let fe = R.fetchers.get(S);
    Aa(S, Sr(I, fe ? fe.data : void 0), { flushSync: J });
    let he = new AbortController(),
      ce = hi(a.history, N, he.signal);
    if (ae) {
      let He = await _a(G, new URL(ce.url).pathname, ce.signal, S);
      if (He.type === "aborted") return;
      if (He.type === "error") {
        da(S, A, He.error, { flushSync: J });
        return;
      } else if (He.matches) G = He.matches;
      else {
        da(S, A, Sa(404, { pathname: N }), { flushSync: J });
        return;
      }
    }
    let ke = gu(G, N);
    ie.set(S, he);
    let Re = Ee,
      Ie = gi(f, h, ce, G, ke, u, $),
      st = (await gn(ce, Ie, $, S))[ke.route.id];
    if ((ie.get(S) === he && ie.delete(S), !ce.signal.aborted)) {
      if (pe.has(S)) {
        Aa(S, dn(void 0));
        return;
      }
      if (vl(st))
        if (C > Re) {
          Aa(S, dn(void 0));
          return;
        } else {
          (K.add(S), await Qa(ce, st, !1, { preventScrollReset: W }));
          return;
        }
      if (ra(st)) {
        da(S, A, st.error);
        return;
      }
      Aa(S, dn(st.data));
    }
  }
  async function Qa(
    S,
    A,
    N,
    {
      submission: G,
      fetcherSubmission: $,
      preventScrollReset: ae,
      replace: J,
    } = {},
  ) {
    (N || (Le?.resolve(), (Le = null)),
      A.response.headers.has("X-Remix-Revalidate") && (Z = !0));
    let W = A.response.headers.get("Location");
    (je(W, "Expected a Location header on the redirect Response"),
      (W = sp(W, new URL(S.url), m, a.history)));
    let I = jr(R.location, W, { _isRedirect: !0 });
    if (r) {
      let Ie = !1;
      if (A.response.headers.has("X-Remix-Reload-Document")) Ie = !0;
      else if (jf(W)) {
        const at = Vp(W, !0);
        Ie = at.origin !== l.location.origin || Ea(at.pathname, m) == null;
      }
      if (Ie) {
        J ? l.location.replace(W) : l.location.assign(W);
        return;
      }
    }
    ve = null;
    let fe =
        J === !0 || A.response.headers.has("X-Remix-Replace")
          ? "REPLACE"
          : "PUSH",
      { formMethod: he, formAction: ce, formEncType: ke } = R.navigation;
    !G && !$ && he && ce && ke && (G = gp(R.navigation));
    let Re = G || $;
    if (Hw.has(A.response.status) && Re && Ht(Re.formMethod))
      await Ga(fe, I, {
        submission: { ...Re, formAction: W },
        preventScrollReset: ae || Pe,
        enableViewTransition: N ? ut : void 0,
      });
    else {
      let Ie = ff(I, G);
      await Ga(fe, I, {
        overrideNavigation: Ie,
        fetcherSubmission: $,
        preventScrollReset: ae || Pe,
        enableViewTransition: N ? ut : void 0,
      });
    }
  }
  async function gn(S, A, N, G) {
    let $,
      ae = {};
    try {
      $ = await Kw(w, S, A, G, N, !1);
    } catch (J) {
      return (
        A.filter((W) => W.shouldLoad).forEach((W) => {
          ae[W.route.id] = { type: "error", error: J };
        }),
        ae
      );
    }
    if (S.signal.aborted) return ae;
    if (!Ht(S.method))
      for (let J of A) {
        if ($[J.route.id]?.type === "error") break;
        !$.hasOwnProperty(J.route.id) &&
          !R.loaderData.hasOwnProperty(J.route.id) &&
          (!R.errors || !R.errors.hasOwnProperty(J.route.id)) &&
          J.shouldCallHandler() &&
          ($[J.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${J.route.id}`,
            ),
          });
      }
    for (let [J, W] of Object.entries($))
      if (l2(W)) {
        let I = W.result;
        ae[J] = { type: "redirect", response: Ww(I, S, J, A, m) };
      } else ae[J] = await Pw(W);
    return ae;
  }
  async function Di(S, A, N, G) {
    let $ = gn(N, S, G, null),
      ae = Promise.all(
        A.map(async (I) => {
          if (I.matches && I.match && I.request && I.controller) {
            let he = (await gn(I.request, I.matches, G, I.key))[
              I.match.route.id
            ];
            return { [I.key]: he };
          } else
            return Promise.resolve({
              [I.key]: { type: "error", error: Sa(404, { pathname: I.path }) },
            });
        }),
      ),
      J = await $,
      W = (await ae).reduce((I, fe) => Object.assign(I, fe), {});
    return { loaderResults: J, fetcherResults: W };
  }
  function pn() {
    ((Z = !0),
      F.forEach((S, A) => {
        (ie.has(A) && le.add(A), jt(A));
      }));
  }
  function Aa(S, A, N = {}) {
    (R.fetchers.set(S, A),
      Ct(
        { fetchers: new Map(R.fetchers) },
        { flushSync: (N && N.flushSync) === !0 },
      ));
  }
  function da(S, A, N, G = {}) {
    let $ = Gn(R.matches, A);
    (Za(S),
      Ct(
        { errors: { [$.route.id]: N }, fetchers: new Map(R.fetchers) },
        { flushSync: (G && G.flushSync) === !0 },
      ));
  }
  function Qr(S) {
    return (
      me.set(S, (me.get(S) || 0) + 1),
      pe.has(S) && pe.delete(S),
      R.fetchers.get(S) || kw
    );
  }
  function Zu(S, A) {
    (jt(S, A?.reason), Aa(S, dn(null)));
  }
  function Za(S) {
    let A = R.fetchers.get(S);
    (ie.has(S) && !(A && A.state === "loading" && k.has(S)) && jt(S),
      F.delete(S),
      k.delete(S),
      K.delete(S),
      pe.delete(S),
      le.delete(S),
      R.fetchers.delete(S));
  }
  function Yt(S) {
    let A = (me.get(S) || 0) - 1;
    (A <= 0 ? (me.delete(S), pe.add(S)) : me.set(S, A),
      Ct({ fetchers: new Map(R.fetchers) }));
  }
  function jt(S, A) {
    let N = ie.get(S);
    N && (N.abort(A), ie.delete(S));
  }
  function Lt(S) {
    for (let A of S) {
      let N = Qr(A),
        G = dn(N.data);
      R.fetchers.set(A, G);
    }
  }
  function Zr() {
    let S = [],
      A = !1;
    for (let N of K) {
      let G = R.fetchers.get(N);
      (je(G, `Expected fetcher: ${N}`),
        G.state === "loading" && (K.delete(N), S.push(N), (A = !0)));
    }
    return (Lt(S), A);
  }
  function $r(S) {
    let A = [];
    for (let [N, G] of k)
      if (G < S) {
        let $ = R.fetchers.get(N);
        (je($, `Expected fetcher: ${N}`),
          $.state === "loading" && (jt(N), k.delete(N), A.push(N)));
      }
    return (Lt(A), A.length > 0);
  }
  function $u(S, A) {
    let N = R.blockers.get(S) || xr;
    return (Me.get(S) !== A && Me.set(S, A), N);
  }
  function Pn(S) {
    (R.blockers.delete(S), Me.delete(S));
  }
  function $a(S, A) {
    let N = R.blockers.get(S) || xr;
    je(
      (N.state === "unblocked" && A.state === "blocked") ||
        (N.state === "blocked" && A.state === "blocked") ||
        (N.state === "blocked" && A.state === "proceeding") ||
        (N.state === "blocked" && A.state === "unblocked") ||
        (N.state === "proceeding" && A.state === "unblocked"),
      `Invalid blocker state transition: ${N.state} -> ${A.state}`,
    );
    let G = new Map(R.blockers);
    (G.set(S, A), Ct({ blockers: G }));
  }
  function Wn({ currentLocation: S, nextLocation: A, historyAction: N }) {
    if (Me.size === 0) return;
    Me.size > 1 && pt(!1, "A router only supports one blocker at a time");
    let G = Array.from(Me.entries()),
      [$, ae] = G[G.length - 1],
      J = R.blockers.get($);
    if (
      !(J && J.state === "proceeding") &&
      ae({ currentLocation: S, nextLocation: A, historyAction: N })
    )
      return $;
  }
  function ja(S) {
    let A = Sa(404, { pathname: S }),
      N = y || g,
      { matches: G, route: $ } = su(N);
    return { notFoundMatches: G, route: $, error: A };
  }
  function Rl(S, A, N) {
    if (((V = S), (X = A), (Q = N || null), !P && R.navigation === cf)) {
      P = !0;
      let G = zi(R.location, R.matches);
      G != null && Ct({ restoreScrollPosition: G });
    }
    return () => {
      ((V = null), (X = null), (Q = null));
    };
  }
  function yn(S, A) {
    return (
      (Q &&
        Q(
          S,
          A.map((G) => fw(G, R.loaderData)),
        )) ||
      S.key
    );
  }
  function Ku(S, A) {
    if (V && X) {
      let N = yn(S, A);
      V[N] = X();
    }
  }
  function zi(S, A) {
    if (V) {
      let N = yn(S, A),
        G = V[N];
      if (typeof G == "number") return G;
    }
    return null;
  }
  function vn(S, A, N) {
    if (a.patchRoutesOnNavigation)
      if (S) {
        if (Object.keys(S[0].params).length > 0)
          return { active: !0, matches: Tr(A, N, m, !0) };
      } else return { active: !0, matches: Tr(A, N, m, !0) || [] };
    return { active: !1, matches: null };
  }
  async function _a(S, A, N, G) {
    if (!a.patchRoutesOnNavigation) return { type: "success", matches: S };
    let $ = S;
    for (;;) {
      let ae = y == null,
        J = y || g,
        W = h;
      try {
        await a.patchRoutesOnNavigation({
          signal: N,
          path: A,
          matches: $,
          fetcherKey: G,
          patch: (he, ce) => {
            N.aborted || ip(he, ce, J, W, f, !1);
          },
        });
      } catch (he) {
        return { type: "error", error: he, partialMatches: $ };
      } finally {
        ae && !N.aborted && (g = [...g]);
      }
      if (N.aborted) return { type: "aborted" };
      let I = Xn(J, A, m),
        fe = null;
      if (I) {
        if (Object.keys(I[0].params).length === 0)
          return { type: "success", matches: I };
        if (
          ((fe = Tr(J, A, m, !0)),
          !(fe && $.length < fe.length && Kr($, fe.slice(0, $.length))))
        )
          return { type: "success", matches: I };
      }
      if ((fe || (fe = Tr(J, A, m, !0)), !fe || Kr($, fe)))
        return { type: "success", matches: null };
      $ = fe;
    }
  }
  function Kr(S, A) {
    return (
      S.length === A.length && S.every((N, G) => N.route.id === A[G].route.id)
    );
  }
  function Jr(S) {
    ((h = {}), (y = Mr(S, f, void 0, h)));
  }
  function Fr(S, A, N = !1) {
    let G = y == null;
    (ip(S, A, y || g, h, f, N), G && ((g = [...g]), Ct({})));
  }
  return (
    (se = {
      get basename() {
        return m;
      },
      get future() {
        return b;
      },
      get state() {
        return R;
      },
      get routes() {
        return g;
      },
      get window() {
        return l;
      },
      initialize: Fn,
      subscribe: Ai,
      enableScrollRestoration: Rl,
      navigate: jl,
      fetch: Gu,
      revalidate: ji,
      createHref: (S) => a.history.createHref(S),
      encodeLocation: (S) => a.history.encodeLocation(S),
      getFetcher: Qr,
      resetFetcher: Zu,
      deleteFetcher: Yt,
      dispose: Al,
      getBlocker: $u,
      deleteBlocker: Pn,
      patchRoutes: Fr,
      _internalFetchControllers: ie,
      _internalSetRoutes: Jr,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(S) {
        Ct(S);
      },
    }),
    a.unstable_instrumentations &&
      (se = Dw(
        se,
        a.unstable_instrumentations.map((S) => S.router).filter(Boolean),
      )),
    se
  );
}
function Vw(a) {
  return (
    a != null &&
    (("formData" in a && a.formData != null) ||
      ("body" in a && a.body !== void 0))
  );
}
function bf(a, l, r, u, c, f) {
  let h, g;
  if (c) {
    h = [];
    for (let m of l)
      if ((h.push(m), m.route.id === c)) {
        g = m;
        break;
      }
  } else ((h = l), (g = l[l.length - 1]));
  let y = Dr(u || ".", Du(h), Ea(a.pathname, r) || a.pathname, f === "path");
  if (
    (u == null && ((y.search = a.search), (y.hash = a.hash)),
    (u == null || u === "" || u === ".") && g)
  ) {
    let m = Df(y.search);
    if (g.route.index && !m)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!g.route.index && m) {
      let w = new URLSearchParams(y.search),
        b = w.getAll("index");
      (w.delete("index"),
        b.filter((U) => U).forEach((U) => w.append("index", U)));
      let M = w.toString();
      y.search = M ? `?${M}` : "";
    }
  }
  return (
    r !== "/" && (y.pathname = Cw({ basename: r, pathname: y.pathname })),
    Va(y)
  );
}
function np(a, l, r) {
  if (!r || !Vw(r)) return { path: l };
  if (r.formMethod && !o2(r.formMethod))
    return { path: l, error: Sa(405, { method: r.formMethod }) };
  let u = () => ({ path: l, error: Sa(400, { type: "invalid-body" }) }),
    f = (r.formMethod || "get").toUpperCase(),
    h = ry(l);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Ht(f)) return u();
      let b =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce(
                (M, [U, V]) => `${M}${U}=${V}
`,
                "",
              )
            : String(r.body);
      return {
        path: l,
        submission: {
          formMethod: f,
          formAction: h,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: b,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!Ht(f)) return u();
      try {
        let b = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: l,
          submission: {
            formMethod: f,
            formAction: h,
            formEncType: r.formEncType,
            formData: void 0,
            json: b,
            text: void 0,
          },
        };
      } catch {
        return u();
      }
    }
  }
  je(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let g, y;
  if (r.formData) ((g = xf(r.formData)), (y = r.formData));
  else if (r.body instanceof FormData) ((g = xf(r.body)), (y = r.body));
  else if (r.body instanceof URLSearchParams) ((g = r.body), (y = cp(g)));
  else if (r.body == null) ((g = new URLSearchParams()), (y = new FormData()));
  else
    try {
      ((g = new URLSearchParams(r.body)), (y = cp(g)));
    } catch {
      return u();
    }
  let m = {
    formMethod: f,
    formAction: h,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0,
  };
  if (Ht(m.formMethod)) return { path: l, submission: m };
  let w = mn(l);
  return (
    a && w.search && Df(w.search) && g.append("index", ""),
    (w.search = `?${g}`),
    { path: Va(w), submission: m }
  );
}
function lp(a, l, r, u, c, f, h, g, y, m, w, b, M, U, V, Q, X, P, ee, te, Te) {
  let be = te ? (ra(te[1]) ? te[1].error : te[1].data) : void 0,
    Se = c.createURL(f.location),
    se = c.createURL(y),
    R;
  if (w && f.errors) {
    let ye = Object.keys(f.errors)[0];
    R = h.findIndex((_) => _.route.id === ye);
  } else if (te && ra(te[1])) {
    let ye = te[0];
    R = h.findIndex((_) => _.route.id === ye) - 1;
  }
  let Ae = te ? te[1].statusCode : void 0,
    Le = Ae && Ae >= 400,
    Pe = {
      currentUrl: Se,
      currentParams: f.matches[0]?.params || {},
      nextUrl: se,
      nextParams: h[0].params,
      ...g,
      actionResult: be,
      actionStatus: Ae,
    },
    ve = Or(h),
    ut = h.map((ye, _) => {
      let { route: Z } = ye,
        le = null;
      if (R != null && _ > R) le = !1;
      else if (Z.lazy) le = !0;
      else if (!Mf(Z)) le = !1;
      else if (w) {
        let { shouldLoad: k } = ey(Z, f.loaderData, f.errors);
        le = k;
      } else Xw(f.loaderData, f.matches[_], ye) && (le = !0);
      if (le !== null) return wf(r, u, a, ve, ye, m, l, le);
      let ie = !1;
      typeof Te == "boolean"
        ? (ie = Te)
        : Le
          ? (ie = !1)
          : (b ||
              Se.pathname + Se.search === se.pathname + se.search ||
              Se.search !== se.search ||
              Gw(f.matches[_], ye)) &&
            (ie = !0);
      let Ee = { ...Pe, defaultShouldRevalidate: ie },
        C = Ar(ye, Ee);
      return wf(r, u, a, ve, ye, m, l, C, Ee, Te);
    }),
    Ue = [];
  return (
    V.forEach((ye, _) => {
      if (w || !h.some((F) => F.route.id === ye.routeId) || U.has(_)) return;
      let Z = f.fetchers.get(_),
        le = Z && Z.state !== "idle" && Z.data === void 0,
        ie = Xn(X, ye.path, P);
      if (!ie) {
        if (ee && le) return;
        Ue.push({
          key: _,
          routeId: ye.routeId,
          path: ye.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (Q.has(_)) return;
      let Ee = gu(ie, ye.path),
        C = new AbortController(),
        k = hi(c, ye.path, C.signal),
        K = null;
      if (M.has(_)) (M.delete(_), (K = gi(r, u, k, ie, Ee, m, l)));
      else if (le) b && (K = gi(r, u, k, ie, Ee, m, l));
      else {
        let F;
        typeof Te == "boolean" ? (F = Te) : Le ? (F = !1) : (F = b);
        let me = { ...Pe, defaultShouldRevalidate: F };
        Ar(Ee, me) && (K = gi(r, u, k, ie, Ee, m, l, me));
      }
      K &&
        Ue.push({
          key: _,
          routeId: ye.routeId,
          path: ye.path,
          matches: K,
          match: Ee,
          request: k,
          controller: C,
        });
    }),
    { dsMatches: ut, revalidatingFetchers: Ue }
  );
}
function Mf(a) {
  return a.loader != null || (a.middleware != null && a.middleware.length > 0);
}
function ey(a, l, r) {
  if (a.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!Mf(a)) return { shouldLoad: !1, renderFallback: !1 };
  let u = l != null && a.id in l,
    c = r != null && r[a.id] !== void 0;
  if (!u && c) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof a.loader == "function" && a.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !u };
  let f = !u && !c;
  return { shouldLoad: f, renderFallback: f };
}
function Xw(a, l, r) {
  let u = !l || r.route.id !== l.route.id,
    c = !a.hasOwnProperty(r.route.id);
  return u || c;
}
function Gw(a, l) {
  let r = a.route.path;
  return (
    a.pathname !== l.pathname ||
    (r != null && r.endsWith("*") && a.params["*"] !== l.params["*"])
  );
}
function Ar(a, l) {
  if (a.route.shouldRevalidate) {
    let r = a.route.shouldRevalidate(l);
    if (typeof r == "boolean") return r;
  }
  return l.defaultShouldRevalidate;
}
function ip(a, l, r, u, c, f) {
  let h;
  if (a) {
    let m = u[a];
    (je(m, `No route found to patch children into: routeId = ${a}`),
      m.children || (m.children = []),
      (h = m.children));
  } else h = r;
  let g = [],
    y = [];
  if (
    (l.forEach((m) => {
      let w = h.find((b) => ty(m, b));
      w ? y.push({ existingRoute: w, newRoute: m }) : g.push(m);
    }),
    g.length > 0)
  ) {
    let m = Mr(g, c, [a || "_", "patch", String(h?.length || "0")], u);
    h.push(...m);
  }
  if (f && y.length > 0)
    for (let m = 0; m < y.length; m++) {
      let { existingRoute: w, newRoute: b } = y[m],
        M = w,
        [U] = Mr([b], c, [], {}, !0);
      Object.assign(M, {
        element: U.element ? U.element : M.element,
        errorElement: U.errorElement ? U.errorElement : M.errorElement,
        hydrateFallbackElement: U.hydrateFallbackElement
          ? U.hydrateFallbackElement
          : M.hydrateFallbackElement,
      });
    }
}
function ty(a, l) {
  return "id" in a && "id" in l && a.id === l.id
    ? !0
    : a.index === l.index &&
        a.path === l.path &&
        a.caseSensitive === l.caseSensitive
      ? (!a.children || a.children.length === 0) &&
        (!l.children || l.children.length === 0)
        ? !0
        : (a.children?.every((r, u) => l.children?.some((c) => ty(r, c))) ?? !1)
      : !1;
}
var rp = new WeakMap(),
  ay = ({ key: a, route: l, manifest: r, mapRouteProperties: u }) => {
    let c = r[l.id];
    if (
      (je(c, "No route found in manifest"),
      !c.lazy || typeof c.lazy != "object")
    )
      return;
    let f = c.lazy[a];
    if (!f) return;
    let h = rp.get(c);
    h || ((h = {}), rp.set(c, h));
    let g = h[a];
    if (g) return g;
    let y = (async () => {
      let m = ow(a),
        b = c[a] !== void 0 && a !== "hasErrorBoundary";
      if (m)
        (pt(
          !m,
          "Route property " +
            a +
            " is not a supported lazy route property. This property will be ignored.",
        ),
          (h[a] = Promise.resolve()));
      else if (b)
        pt(
          !1,
          `Route "${c.id}" has a static property "${a}" defined. The lazy property will be ignored.`,
        );
      else {
        let M = await f();
        M != null && (Object.assign(c, { [a]: M }), Object.assign(c, u(c)));
      }
      typeof c.lazy == "object" &&
        ((c.lazy[a] = void 0),
        Object.values(c.lazy).every((M) => M === void 0) && (c.lazy = void 0));
    })();
    return ((h[a] = y), y);
  },
  op = new WeakMap();
function Qw(a, l, r, u, c) {
  let f = r[a.id];
  if ((je(f, "No route found in manifest"), !a.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof a.lazy == "function") {
    let w = op.get(f);
    if (w) return { lazyRoutePromise: w, lazyHandlerPromise: w };
    let b = (async () => {
      je(typeof a.lazy == "function", "No lazy route function found");
      let M = await a.lazy(),
        U = {};
      for (let V in M) {
        let Q = M[V];
        if (Q === void 0) continue;
        let X = sw(V),
          ee = f[V] !== void 0 && V !== "hasErrorBoundary";
        X
          ? pt(
              !X,
              "Route property " +
                V +
                " is not a supported property to be returned from a lazy route function. This property will be ignored.",
            )
          : ee
            ? pt(
                !ee,
                `Route "${f.id}" has a static property "${V}" defined but its lazy function is also returning a value for this property. The lazy route property "${V}" will be ignored.`,
              )
            : (U[V] = Q);
      }
      (Object.assign(f, U), Object.assign(f, { ...u(f), lazy: void 0 }));
    })();
    return (
      op.set(f, b),
      b.catch(() => {}),
      { lazyRoutePromise: b, lazyHandlerPromise: b }
    );
  }
  let h = Object.keys(a.lazy),
    g = [],
    y;
  for (let w of h) {
    if (c && c.includes(w)) continue;
    let b = ay({ key: w, route: a, manifest: r, mapRouteProperties: u });
    b && (g.push(b), w === l && (y = b));
  }
  let m = g.length > 0 ? Promise.all(g).then(() => {}) : void 0;
  return (
    m?.catch(() => {}),
    y?.catch(() => {}),
    { lazyRoutePromise: m, lazyHandlerPromise: y }
  );
}
async function up(a) {
  let l = a.matches.filter((c) => c.shouldLoad),
    r = {};
  return (
    (await Promise.all(l.map((c) => c.resolve()))).forEach((c, f) => {
      r[l[f].route.id] = c;
    }),
    r
  );
}
async function Zw(a) {
  return a.matches.some((l) => l.route.middleware) ? ny(a, () => up(a)) : up(a);
}
function ny(a, l) {
  return $w(
    a,
    l,
    (u) => {
      if (r2(u)) throw u;
      return u;
    },
    a2,
    r,
  );
  function r(u, c, f) {
    if (f)
      return Promise.resolve(
        Object.assign(f.value, { [c]: { type: "error", result: u } }),
      );
    {
      let { matches: h } = a,
        g = Math.min(
          Math.max(
            h.findIndex((m) => m.route.id === c),
            0,
          ),
          Math.max(
            h.findIndex((m) => m.shouldCallHandler()),
            0,
          ),
        ),
        y = Gn(h, h[g].route.id).route.id;
      return Promise.resolve({ [y]: { type: "error", result: u } });
    }
  }
}
async function $w(a, l, r, u, c) {
  let {
      matches: f,
      request: h,
      params: g,
      context: y,
      unstable_pattern: m,
    } = a,
    w = f.flatMap((M) =>
      M.route.middleware ? M.route.middleware.map((U) => [M.route.id, U]) : [],
    );
  return await ly(
    { request: h, params: g, context: y, unstable_pattern: m },
    w,
    l,
    r,
    u,
    c,
  );
}
async function ly(a, l, r, u, c, f, h = 0) {
  let { request: g } = a;
  if (g.signal.aborted)
    throw g.signal.reason ?? new Error(`Request aborted: ${g.method} ${g.url}`);
  let y = l[h];
  if (!y) return await r();
  let [m, w] = y,
    b,
    M = async () => {
      if (b) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((b = { value: await ly(a, l, r, u, c, f, h + 1) }), b.value);
      } catch (U) {
        return ((b = { value: await f(U, m, b) }), b.value);
      }
    };
  try {
    let U = await w(a, M),
      V = U != null ? u(U) : void 0;
    return c(V)
      ? V
      : b
        ? (V ?? b.value)
        : ((b = { value: await M() }), b.value);
  } catch (U) {
    return await f(U, m, b);
  }
}
function iy(a, l, r, u, c) {
  let f = ay({
      key: "middleware",
      route: u.route,
      manifest: l,
      mapRouteProperties: a,
    }),
    h = Qw(u.route, Ht(r.method) ? "action" : "loader", l, a, c);
  return {
    middleware: f,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise,
  };
}
function wf(a, l, r, u, c, f, h, g, y = null, m) {
  let w = !1,
    b = iy(a, l, r, c, f);
  return {
    ...c,
    _lazyPromises: b,
    shouldLoad: g,
    shouldRevalidateArgs: y,
    shouldCallHandler(M) {
      return (
        (w = !0),
        y
          ? typeof m == "boolean"
            ? Ar(c, { ...y, defaultShouldRevalidate: m })
            : typeof M == "boolean"
              ? Ar(c, { ...y, defaultShouldRevalidate: M })
              : Ar(c, y)
          : g
      );
    },
    resolve(M) {
      let { lazy: U, loader: V, middleware: Q } = c.route,
        X = w || g || (M && !Ht(r.method) && (U || V)),
        P = Q && Q.length > 0 && !V && !U;
      return X && (Ht(r.method) || !P)
        ? Jw({
            request: r,
            unstable_pattern: u,
            match: c,
            lazyHandlerPromise: b?.handler,
            lazyRoutePromise: b?.route,
            handlerOverride: M,
            scopedContext: h,
          })
        : Promise.resolve({ type: "data", result: void 0 });
    },
  };
}
function gi(a, l, r, u, c, f, h, g = null) {
  return u.map((y) =>
    y.route.id !== c.route.id
      ? {
          ...y,
          shouldLoad: !1,
          shouldRevalidateArgs: g,
          shouldCallHandler: () => !1,
          _lazyPromises: iy(a, l, r, y, f),
          resolve: () => Promise.resolve({ type: "data", result: void 0 }),
        }
      : wf(a, l, r, Or(u), y, f, h, !0, g),
  );
}
async function Kw(a, l, r, u, c, f) {
  r.some((m) => m._lazyPromises?.middleware) &&
    (await Promise.all(r.map((m) => m._lazyPromises?.middleware)));
  let h = {
      request: l,
      unstable_pattern: Or(r),
      params: r[0].params,
      context: c,
      matches: r,
    },
    y = await a({
      ...h,
      fetcherKey: u,
      runClientMiddleware: (m) => {
        let w = h;
        return ny(w, () =>
          m({
            ...w,
            fetcherKey: u,
            runClientMiddleware: () => {
              throw new Error(
                "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
              );
            },
          }),
        );
      },
    });
  try {
    await Promise.all(
      r.flatMap((m) => [m._lazyPromises?.handler, m._lazyPromises?.route]),
    );
  } catch {}
  return y;
}
async function Jw({
  request: a,
  unstable_pattern: l,
  match: r,
  lazyHandlerPromise: u,
  lazyRoutePromise: c,
  handlerOverride: f,
  scopedContext: h,
}) {
  let g,
    y,
    m = Ht(a.method),
    w = m ? "action" : "loader",
    b = (M) => {
      let U,
        V = new Promise((P, ee) => (U = ee));
      ((y = () => U()), a.signal.addEventListener("abort", y));
      let Q = (P) =>
          typeof M != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${w}" [routeId: ${r.route.id}]`,
                ),
              )
            : M(
                {
                  request: a,
                  unstable_pattern: l,
                  params: r.params,
                  context: h,
                },
                ...(P !== void 0 ? [P] : []),
              ),
        X = (async () => {
          try {
            return { type: "data", result: await (f ? f((ee) => Q(ee)) : Q()) };
          } catch (P) {
            return { type: "error", result: P };
          }
        })();
      return Promise.race([X, V]);
    };
  try {
    let M = m ? r.route.action : r.route.loader;
    if (u || c)
      if (M) {
        let U,
          [V] = await Promise.all([
            b(M).catch((Q) => {
              U = Q;
            }),
            u,
            c,
          ]);
        if (U !== void 0) throw U;
        g = V;
      } else {
        await u;
        let U = m ? r.route.action : r.route.loader;
        if (U) [g] = await Promise.all([b(U), c]);
        else if (w === "action") {
          let V = new URL(a.url),
            Q = V.pathname + V.search;
          throw Sa(405, { method: a.method, pathname: Q, routeId: r.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (M) g = await b(M);
    else {
      let U = new URL(a.url),
        V = U.pathname + U.search;
      throw Sa(404, { pathname: V });
    }
  } catch (M) {
    return { type: "error", result: M };
  } finally {
    y && a.signal.removeEventListener("abort", y);
  }
  return g;
}
async function Fw(a) {
  let l = a.headers.get("Content-Type");
  return l && /\bapplication\/json\b/.test(l)
    ? a.body == null
      ? null
      : a.json()
    : a.text();
}
async function Pw(a) {
  let { result: l, type: r } = a;
  if (Rf(l)) {
    let u;
    try {
      u = await Fw(l);
    } catch (c) {
      return { type: "error", error: c };
    }
    return r === "error"
      ? {
          type: "error",
          error: new zr(l.status, l.statusText, u),
          statusCode: l.status,
          headers: l.headers,
        }
      : { type: "data", data: u, statusCode: l.status, headers: l.headers };
  }
  return r === "error"
    ? mp(l)
      ? l.data instanceof Error
        ? {
            type: "error",
            error: l.data,
            statusCode: l.init?.status,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0,
          }
        : {
            type: "error",
            error: t2(l),
            statusCode: Rr(l) ? l.status : void 0,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0,
          }
      : { type: "error", error: l, statusCode: Rr(l) ? l.status : void 0 }
    : mp(l)
      ? {
          type: "data",
          data: l.data,
          statusCode: l.init?.status,
          headers: l.init?.headers ? new Headers(l.init.headers) : void 0,
        }
      : { type: "data", data: l };
}
function Ww(a, l, r, u, c) {
  let f = a.headers.get("Location");
  if (
    (je(
      f,
      "Redirects returned/thrown from loaders/actions must have a Location header",
    ),
    !jf(f))
  ) {
    let h = u.slice(0, u.findIndex((g) => g.route.id === r) + 1);
    ((f = bf(new URL(l.url), h, c, f)), a.headers.set("Location", f));
  }
  return a;
}
function sp(a, l, r, u) {
  let c = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    "javascript:",
  ];
  if (jf(a)) {
    let f = a,
      h = f.startsWith("//") ? new URL(l.protocol + f) : new URL(f);
    if (c.includes(h.protocol)) throw new Error("Invalid redirect location");
    let g = Ea(h.pathname, r) != null;
    if (h.origin === l.origin && g) return h.pathname + h.search + h.hash;
  }
  try {
    let f = u.createURL(a);
    if (c.includes(f.protocol)) throw new Error("Invalid redirect location");
  } catch {}
  return a;
}
function hi(a, l, r, u) {
  let c = a.createURL(ry(l)).toString(),
    f = { signal: r };
  if (u && Ht(u.formMethod)) {
    let { formMethod: h, formEncType: g } = u;
    ((f.method = h.toUpperCase()),
      g === "application/json"
        ? ((f.headers = new Headers({ "Content-Type": g })),
          (f.body = JSON.stringify(u.json)))
        : g === "text/plain"
          ? (f.body = u.text)
          : g === "application/x-www-form-urlencoded" && u.formData
            ? (f.body = xf(u.formData))
            : (f.body = u.formData));
  }
  return new Request(c, f);
}
function xf(a) {
  let l = new URLSearchParams();
  for (let [r, u] of a.entries())
    l.append(r, typeof u == "string" ? u : u.name);
  return l;
}
function cp(a) {
  let l = new FormData();
  for (let [r, u] of a.entries()) l.append(r, u);
  return l;
}
function Iw(a, l, r, u = !1, c = !1) {
  let f = {},
    h = null,
    g,
    y = !1,
    m = {},
    w = r && ra(r[1]) ? r[1].error : void 0;
  return (
    a.forEach((b) => {
      if (!(b.route.id in l)) return;
      let M = b.route.id,
        U = l[M];
      if (
        (je(!vl(U), "Cannot handle redirect results in processLoaderData"),
        ra(U))
      ) {
        let V = U.error;
        if ((w !== void 0 && ((V = w), (w = void 0)), (h = h || {}), c))
          h[M] = V;
        else {
          let Q = Gn(a, M);
          h[Q.route.id] == null && (h[Q.route.id] = V);
        }
        (u || (f[M] = Ip),
          y || ((y = !0), (g = Rr(U.error) ? U.error.status : 500)),
          U.headers && (m[M] = U.headers));
      } else
        ((f[M] = U.data),
          U.statusCode && U.statusCode !== 200 && !y && (g = U.statusCode),
          U.headers && (m[M] = U.headers));
    }),
    w !== void 0 && r && ((h = { [r[0]]: w }), r[2] && (f[r[2]] = void 0)),
    { loaderData: f, errors: h, statusCode: g || 200, loaderHeaders: m }
  );
}
function fp(a, l, r, u, c, f) {
  let { loaderData: h, errors: g } = Iw(l, r, u);
  return (
    c
      .filter((y) => !y.matches || y.matches.some((m) => m.shouldLoad))
      .forEach((y) => {
        let { key: m, match: w, controller: b } = y;
        if (b && b.signal.aborted) return;
        let M = f[m];
        if ((je(M, "Did not find corresponding fetcher result"), ra(M))) {
          let U = Gn(a.matches, w?.route.id);
          ((g && g[U.route.id]) || (g = { ...g, [U.route.id]: M.error }),
            a.fetchers.delete(m));
        } else if (vl(M)) je(!1, "Unhandled fetcher revalidation redirect");
        else {
          let U = dn(M.data);
          a.fetchers.set(m, U);
        }
      }),
    { loaderData: h, errors: g }
  );
}
function dp(a, l, r, u) {
  let c = Object.entries(l)
    .filter(([, f]) => f !== Ip)
    .reduce((f, [h, g]) => ((f[h] = g), f), {});
  for (let f of r) {
    let h = f.route.id;
    if (
      (!l.hasOwnProperty(h) &&
        a.hasOwnProperty(h) &&
        f.route.loader &&
        (c[h] = a[h]),
      u && u.hasOwnProperty(h))
    )
      break;
  }
  return c;
}
function hp(a) {
  return a
    ? ra(a[1])
      ? { actionData: {} }
      : { actionData: { [a[0]]: a[1].data } }
    : {};
}
function Gn(a, l) {
  return (
    (l ? a.slice(0, a.findIndex((u) => u.route.id === l) + 1) : [...a])
      .reverse()
      .find((u) => u.route.hasErrorBoundary === !0) || a[0]
  );
}
function su(a) {
  let l =
    a.length === 1
      ? a[0]
      : a.find((r) => r.index || !r.path || r.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: l }],
    route: l,
  };
}
function Sa(
  a,
  { pathname: l, routeId: r, method: u, type: c, message: f } = {},
) {
  let h = "Unknown Server Error",
    g = "Unknown @remix-run/router error";
  return (
    a === 400
      ? ((h = "Bad Request"),
        u && l && r
          ? (g = `You made a ${u} request to "${l}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.`)
          : c === "invalid-body" && (g = "Unable to encode submission body"))
      : a === 403
        ? ((h = "Forbidden"), (g = `Route "${r}" does not match URL "${l}"`))
        : a === 404
          ? ((h = "Not Found"), (g = `No route matches URL "${l}"`))
          : a === 405 &&
            ((h = "Method Not Allowed"),
            u && l && r
              ? (g = `You made a ${u.toUpperCase()} request to "${l}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.`)
              : u && (g = `Invalid request method "${u.toUpperCase()}"`)),
    new zr(a || 500, h, new Error(g), !0)
  );
}
function cu(a) {
  let l = Object.entries(a);
  for (let r = l.length - 1; r >= 0; r--) {
    let [u, c] = l[r];
    if (vl(c)) return { key: u, result: c };
  }
}
function ry(a) {
  let l = typeof a == "string" ? mn(a) : a;
  return Va({ ...l, hash: "" });
}
function e2(a, l) {
  return a.pathname !== l.pathname || a.search !== l.search
    ? !1
    : a.hash === ""
      ? l.hash !== ""
      : a.hash === l.hash
        ? !0
        : l.hash !== "";
}
function t2(a) {
  return new zr(
    a.init?.status ?? 500,
    a.init?.statusText ?? "Internal Server Error",
    a.data,
  );
}
function a2(a) {
  return (
    a != null &&
    typeof a == "object" &&
    Object.entries(a).every(([l, r]) => typeof l == "string" && n2(r))
  );
}
function n2(a) {
  return (
    a != null &&
    typeof a == "object" &&
    "type" in a &&
    "result" in a &&
    (a.type === "data" || a.type === "error")
  );
}
function l2(a) {
  return Rf(a.result) && Pp.has(a.result.status);
}
function ra(a) {
  return a.type === "error";
}
function vl(a) {
  return (a && a.type) === "redirect";
}
function mp(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "type" in a &&
    "data" in a &&
    "init" in a &&
    a.type === "DataWithResponseInit"
  );
}
function Rf(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.headers == "object" &&
    typeof a.body < "u"
  );
}
function i2(a) {
  return Pp.has(a);
}
function r2(a) {
  return Rf(a) && i2(a.status) && a.headers.has("Location");
}
function o2(a) {
  return Bw.has(a.toUpperCase());
}
function Ht(a) {
  return Lw.has(a.toUpperCase());
}
function Df(a) {
  return new URLSearchParams(a).getAll("index").some((l) => l === "");
}
function gu(a, l) {
  let r = typeof l == "string" ? mn(l).search : l.search;
  if (a[a.length - 1].route.index && Df(r || "")) return a[a.length - 1];
  let u = Zp(a);
  return u[u.length - 1];
}
function gp(a) {
  let {
    formMethod: l,
    formAction: r,
    formEncType: u,
    text: c,
    formData: f,
    json: h,
  } = a;
  if (!(!l || !r || !u)) {
    if (c != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: void 0,
        json: void 0,
        text: c,
      };
    if (f != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: f,
        json: void 0,
        text: void 0,
      };
    if (h !== void 0)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: void 0,
        json: h,
        text: void 0,
      };
  }
}
function ff(a, l) {
  return l
    ? {
        state: "loading",
        location: a,
        formMethod: l.formMethod,
        formAction: l.formAction,
        formEncType: l.formEncType,
        formData: l.formData,
        json: l.json,
        text: l.text,
      }
    : {
        state: "loading",
        location: a,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function u2(a, l) {
  return {
    state: "submitting",
    location: a,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text,
  };
}
function Sr(a, l) {
  return a
    ? {
        state: "loading",
        formMethod: a.formMethod,
        formAction: a.formAction,
        formEncType: a.formEncType,
        formData: a.formData,
        json: a.json,
        text: a.text,
        data: l,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: l,
      };
}
function s2(a, l) {
  return {
    state: "submitting",
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text,
    data: l ? l.data : void 0,
  };
}
function dn(a) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: a,
  };
}
function c2(a, l) {
  try {
    let r = a.sessionStorage.getItem(Wp);
    if (r) {
      let u = JSON.parse(r);
      for (let [c, f] of Object.entries(u || {}))
        f && Array.isArray(f) && l.set(c, new Set(f || []));
    }
  } catch {}
}
function f2(a, l) {
  if (l.size > 0) {
    let r = {};
    for (let [u, c] of l) r[u] = [...c];
    try {
      a.sessionStorage.setItem(Wp, JSON.stringify(r));
    } catch (u) {
      pt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${u}).`,
      );
    }
  }
}
function pp() {
  let a,
    l,
    r = new Promise((u, c) => {
      ((a = async (f) => {
        u(f);
        try {
          await r;
        } catch {}
      }),
        (l = async (f) => {
          c(f);
          try {
            await r;
          } catch {}
        }));
    });
  return { promise: r, resolve: a, reject: l };
}
var xl = E.createContext(null);
xl.displayName = "DataRouter";
var Nr = E.createContext(null);
Nr.displayName = "DataRouterState";
var oy = E.createContext(!1);
function d2() {
  return E.useContext(oy);
}
var zf = E.createContext({ isTransitioning: !1 });
zf.displayName = "ViewTransition";
var uy = E.createContext(new Map());
uy.displayName = "Fetchers";
var h2 = E.createContext(null);
h2.displayName = "Await";
var ua = E.createContext(null);
ua.displayName = "Navigation";
var zu = E.createContext(null);
zu.displayName = "Location";
var Ta = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ta.displayName = "Route";
var Of = E.createContext(null);
Of.displayName = "RouteError";
var sy = "REACT_ROUTER_ERROR",
  m2 = "REDIRECT",
  g2 = "ROUTE_ERROR_RESPONSE";
function p2(a) {
  if (a.startsWith(`${sy}:${m2}:{`))
    try {
      let l = JSON.parse(a.slice(28));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string" &&
        typeof l.location == "string" &&
        typeof l.reloadDocument == "boolean" &&
        typeof l.replace == "boolean"
      )
        return l;
    } catch {}
}
function y2(a) {
  if (a.startsWith(`${sy}:${g2}:{`))
    try {
      let l = JSON.parse(a.slice(40));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string"
      )
        return new zr(l.status, l.statusText, l.data);
    } catch {}
}
function v2(a, { relative: l } = {}) {
  je(
    wi(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: r, navigator: u } = E.useContext(ua),
    { hash: c, pathname: f, search: h } = _r(a, { relative: l }),
    g = f;
  return (
    r !== "/" && (g = f === "/" ? r : Na([r, f])),
    u.createHref({ pathname: g, search: h, hash: c })
  );
}
function wi() {
  return E.useContext(zu) != null;
}
function sa() {
  return (
    je(
      wi(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    E.useContext(zu).location
  );
}
var cy =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function fy(a) {
  E.useContext(ua).static || E.useLayoutEffect(a);
}
function Sl() {
  let { isDataRoute: a } = E.useContext(Ta);
  return a ? _2() : b2();
}
function b2() {
  je(
    wi(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let a = E.useContext(xl),
    { basename: l, navigator: r } = E.useContext(ua),
    { matches: u } = E.useContext(Ta),
    { pathname: c } = sa(),
    f = JSON.stringify(Du(u)),
    h = E.useRef(!1);
  return (
    fy(() => {
      h.current = !0;
    }),
    E.useCallback(
      (y, m = {}) => {
        if ((pt(h.current, cy), !h.current)) return;
        if (typeof y == "number") {
          r.go(y);
          return;
        }
        let w = Dr(y, JSON.parse(f), c, m.relative === "path");
        (a == null &&
          l !== "/" &&
          (w.pathname = w.pathname === "/" ? l : Na([l, w.pathname])),
          (m.replace ? r.replace : r.push)(w, m.state, m));
      },
      [l, r, f, c, a],
    )
  );
}
var w2 = E.createContext(null);
function x2(a) {
  let l = E.useContext(Ta).outlet;
  return E.useMemo(
    () => l && E.createElement(w2.Provider, { value: a }, l),
    [l, a],
  );
}
function S2() {
  let { matches: a } = E.useContext(Ta),
    l = a[a.length - 1];
  return l ? l.params : {};
}
function _r(a, { relative: l } = {}) {
  let { matches: r } = E.useContext(Ta),
    { pathname: u } = sa(),
    c = JSON.stringify(Du(r));
  return E.useMemo(() => Dr(a, JSON.parse(c), u, l === "path"), [a, c, u, l]);
}
function E2(a, l, r) {
  je(
    wi(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: u } = E.useContext(ua),
    { matches: c } = E.useContext(Ta),
    f = c[c.length - 1],
    h = f ? f.params : {},
    g = f ? f.pathname : "/",
    y = f ? f.pathnameBase : "/",
    m = f && f.route;
  {
    let X = (m && m.path) || "";
    hy(
      g,
      !m || X.endsWith("*") || X.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${X}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${X}"> to <Route path="${X === "/" ? "*" : `${X}/*`}">.`,
    );
  }
  let w = sa(),
    b;
  b = w;
  let M = b.pathname || "/",
    U = M;
  if (y !== "/") {
    let X = y.replace(/^\//, "").split("/");
    U = "/" + M.replace(/^\//, "").split("/").slice(X.length).join("/");
  }
  let V = Xn(a, { pathname: U });
  return (
    pt(
      m || V != null,
      `No routes matched location "${b.pathname}${b.search}${b.hash}" `,
    ),
    pt(
      V == null ||
        V[V.length - 1].route.element !== void 0 ||
        V[V.length - 1].route.Component !== void 0 ||
        V[V.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ),
    M2(
      V &&
        V.map((X) =>
          Object.assign({}, X, {
            params: Object.assign({}, h, X.params),
            pathname: Na([
              y,
              u.encodeLocation
                ? u.encodeLocation(
                    X.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                  ).pathname
                : X.pathname,
            ]),
            pathnameBase:
              X.pathnameBase === "/"
                ? y
                : Na([
                    y,
                    u.encodeLocation
                      ? u.encodeLocation(
                          X.pathnameBase
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23"),
                        ).pathname
                      : X.pathnameBase,
                  ]),
          }),
        ),
      c,
      r,
    )
  );
}
function C2() {
  let a = N2(),
    l = Rr(a)
      ? `${a.status} ${a.statusText}`
      : a instanceof Error
        ? a.message
        : JSON.stringify(a),
    r = a instanceof Error ? a.stack : null,
    u = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: u },
    f = { padding: "2px 4px", backgroundColor: u },
    h = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", a),
    (h = E.createElement(
      E.Fragment,
      null,
      E.createElement("p", null, "💿 Hey developer 👋"),
      E.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        E.createElement("code", { style: f }, "ErrorBoundary"),
        " or",
        " ",
        E.createElement("code", { style: f }, "errorElement"),
        " prop on your route.",
      ),
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement("h2", null, "Unexpected Application Error!"),
      E.createElement("h3", { style: { fontStyle: "italic" } }, l),
      r ? E.createElement("pre", { style: c }, r) : null,
      h,
    )
  );
}
var T2 = E.createElement(C2, null),
  dy = class extends E.Component {
    constructor(a) {
      (super(a),
        (this.state = {
          location: a.location,
          revalidation: a.revalidation,
          error: a.error,
        }));
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, l) {
      return l.location !== a.location ||
        (l.revalidation !== "idle" && a.revalidation === "idle")
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : l.error,
            location: l.location,
            revalidation: a.revalidation || l.revalidation,
          };
    }
    componentDidCatch(a, l) {
      this.props.onError
        ? this.props.onError(a, l)
        : console.error(
            "React Router caught the following error during render",
            a,
          );
    }
    render() {
      let a = this.state.error;
      if (
        this.context &&
        typeof a == "object" &&
        a &&
        "digest" in a &&
        typeof a.digest == "string"
      ) {
        const r = y2(a.digest);
        r && (a = r);
      }
      let l =
        a !== void 0
          ? E.createElement(
              Ta.Provider,
              { value: this.props.routeContext },
              E.createElement(Of.Provider, {
                value: a,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? E.createElement(A2, { error: a }, l) : l;
    }
  };
dy.contextType = oy;
var df = new WeakMap();
function A2({ children: a, error: l }) {
  let { basename: r } = E.useContext(ua);
  if (
    typeof l == "object" &&
    l &&
    "digest" in l &&
    typeof l.digest == "string"
  ) {
    let u = p2(l.digest);
    if (u) {
      let c = df.get(l);
      if (c) throw c;
      let f = Kp(u.location, r);
      if ($p && !df.get(l))
        if (f.isExternal || u.reloadDocument)
          window.location.href = f.absoluteURL || f.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, {
              replace: u.replace,
            }),
          );
          throw (df.set(l, h), h);
        }
      return E.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${f.absoluteURL || f.to}`,
      });
    }
  }
  return a;
}
function j2({ routeContext: a, match: l, children: r }) {
  let u = E.useContext(xl);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = l.route.id),
    E.createElement(Ta.Provider, { value: a }, r)
  );
}
function M2(a, l = [], r) {
  let u = r?.state;
  if (a == null) {
    if (!u) return null;
    if (u.errors) a = u.matches;
    else if (l.length === 0 && !u.initialized && u.matches.length > 0)
      a = u.matches;
    else return null;
  }
  let c = a,
    f = u?.errors;
  if (f != null) {
    let w = c.findIndex((b) => b.route.id && f?.[b.route.id] !== void 0);
    (je(
      w >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`,
    ),
      (c = c.slice(0, Math.min(c.length, w + 1))));
  }
  let h = !1,
    g = -1;
  if (r && u) {
    h = u.renderFallback;
    for (let w = 0; w < c.length; w++) {
      let b = c[w];
      if (
        ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (g = w),
        b.route.id)
      ) {
        let { loaderData: M, errors: U } = u,
          V =
            b.route.loader &&
            !M.hasOwnProperty(b.route.id) &&
            (!U || U[b.route.id] === void 0);
        if (b.route.lazy || V) {
          (r.isStatic && (h = !0),
            g >= 0 ? (c = c.slice(0, g + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let y = r?.onError,
    m =
      u && y
        ? (w, b) => {
            y(w, {
              location: u.location,
              params: u.matches?.[0]?.params ?? {},
              unstable_pattern: Or(u.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return c.reduceRight((w, b, M) => {
    let U,
      V = !1,
      Q = null,
      X = null;
    u &&
      ((U = f && b.route.id ? f[b.route.id] : void 0),
      (Q = b.route.errorElement || T2),
      h &&
        (g < 0 && M === 0
          ? (hy(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (V = !0),
            (X = null))
          : g === M &&
            ((V = !0), (X = b.route.hydrateFallbackElement || null))));
    let P = l.concat(c.slice(0, M + 1)),
      ee = () => {
        let te;
        return (
          U
            ? (te = Q)
            : V
              ? (te = X)
              : b.route.Component
                ? (te = E.createElement(b.route.Component, null))
                : b.route.element
                  ? (te = b.route.element)
                  : (te = w),
          E.createElement(j2, {
            match: b,
            routeContext: { outlet: w, matches: P, isDataRoute: u != null },
            children: te,
          })
        );
      };
    return u && (b.route.ErrorBoundary || b.route.errorElement || M === 0)
      ? E.createElement(dy, {
          location: u.location,
          revalidation: u.revalidation,
          component: Q,
          error: U,
          children: ee(),
          routeContext: { outlet: null, matches: P, isDataRoute: !0 },
          onError: m,
        })
      : ee();
  }, null);
}
function Nf(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function R2(a) {
  let l = E.useContext(xl);
  return (je(l, Nf(a)), l);
}
function D2(a) {
  let l = E.useContext(Nr);
  return (je(l, Nf(a)), l);
}
function z2(a) {
  let l = E.useContext(Ta);
  return (je(l, Nf(a)), l);
}
function _f(a) {
  let l = z2(a),
    r = l.matches[l.matches.length - 1];
  return (
    je(
      r.route.id,
      `${a} can only be used on routes that contain a unique "id"`,
    ),
    r.route.id
  );
}
function O2() {
  return _f("useRouteId");
}
function N2() {
  let a = E.useContext(Of),
    l = D2("useRouteError"),
    r = _f("useRouteError");
  return a !== void 0 ? a : l.errors?.[r];
}
function _2() {
  let { router: a } = R2("useNavigate"),
    l = _f("useNavigate"),
    r = E.useRef(!1);
  return (
    fy(() => {
      r.current = !0;
    }),
    E.useCallback(
      async (c, f = {}) => {
        (pt(r.current, cy),
          r.current &&
            (typeof c == "number"
              ? await a.navigate(c)
              : await a.navigate(c, { fromRouteId: l, ...f })));
      },
      [a, l],
    )
  );
}
var yp = {};
function hy(a, l, r) {
  !l && !yp[a] && ((yp[a] = !0), pt(!1, r));
}
var vp = {};
function bp(a, l) {
  !a && !vp[l] && ((vp[l] = !0), console.warn(l));
}
var L2 = "useOptimistic",
  wp = Kb[L2],
  U2 = () => {};
function B2(a) {
  return wp ? wp(a) : [a, U2];
}
function H2(a) {
  let l = {
    hasErrorBoundary:
      a.hasErrorBoundary || a.ErrorBoundary != null || a.errorElement != null,
  };
  return (
    a.Component &&
      (a.element &&
        pt(
          !1,
          "You should not include both `Component` and `element` on your route - `Component` will be used.",
        ),
      Object.assign(l, {
        element: E.createElement(a.Component),
        Component: void 0,
      })),
    a.HydrateFallback &&
      (a.hydrateFallbackElement &&
        pt(
          !1,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
        ),
      Object.assign(l, {
        hydrateFallbackElement: E.createElement(a.HydrateFallback),
        HydrateFallback: void 0,
      })),
    a.ErrorBoundary &&
      (a.errorElement &&
        pt(
          !1,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
        ),
      Object.assign(l, {
        errorElement: E.createElement(a.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    l
  );
}
var k2 = ["HydrateFallback", "hydrateFallbackElement"],
  q2 = class {
    constructor() {
      ((this.status = "pending"),
        (this.promise = new Promise((a, l) => {
          ((this.resolve = (r) => {
            this.status === "pending" && ((this.status = "resolved"), a(r));
          }),
            (this.reject = (r) => {
              this.status === "pending" && ((this.status = "rejected"), l(r));
            }));
        })));
    }
  };
function Y2({
  router: a,
  flushSync: l,
  onError: r,
  unstable_useTransitions: u,
}) {
  u = d2() || u;
  let [f, h] = E.useState(a.state),
    [g, y] = B2(f),
    [m, w] = E.useState(),
    [b, M] = E.useState({ isTransitioning: !1 }),
    [U, V] = E.useState(),
    [Q, X] = E.useState(),
    [P, ee] = E.useState(),
    te = E.useRef(new Map()),
    Te = E.useCallback(
      (
        R,
        {
          deletedFetchers: Ae,
          newErrors: Le,
          flushSync: Pe,
          viewTransitionOpts: ve,
        },
      ) => {
        (Le &&
          r &&
          Object.values(Le).forEach((Ue) =>
            r(Ue, {
              location: R.location,
              params: R.matches[0]?.params ?? {},
              unstable_pattern: Or(R.matches),
            }),
          ),
          R.fetchers.forEach((Ue, ye) => {
            Ue.data !== void 0 && te.current.set(ye, Ue.data);
          }),
          Ae.forEach((Ue) => te.current.delete(Ue)),
          bp(
            Pe === !1 || l != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          ));
        let ut =
          a.window != null &&
          a.window.document != null &&
          typeof a.window.document.startViewTransition == "function";
        if (
          (bp(
            ve == null || ut,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
          ),
          !ve || !ut)
        ) {
          l && Pe
            ? l(() => h(R))
            : u === !1
              ? h(R)
              : E.startTransition(() => {
                  (u === !0 && y((Ue) => xp(Ue, R)), h(R));
                });
          return;
        }
        if (l && Pe) {
          l(() => {
            (Q && (U?.resolve(), Q.skipTransition()),
              M({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: ve.currentLocation,
                nextLocation: ve.nextLocation,
              }));
          });
          let Ue = a.window.document.startViewTransition(() => {
            l(() => h(R));
          });
          (Ue.finished.finally(() => {
            l(() => {
              (V(void 0), X(void 0), w(void 0), M({ isTransitioning: !1 }));
            });
          }),
            l(() => X(Ue)));
          return;
        }
        Q
          ? (U?.resolve(),
            Q.skipTransition(),
            ee({
              state: R,
              currentLocation: ve.currentLocation,
              nextLocation: ve.nextLocation,
            }))
          : (w(R),
            M({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: ve.currentLocation,
              nextLocation: ve.nextLocation,
            }));
      },
      [a.window, l, Q, U, u, y, r],
    );
  (E.useLayoutEffect(() => a.subscribe(Te), [a, Te]),
    E.useEffect(() => {
      b.isTransitioning && !b.flushSync && V(new q2());
    }, [b]),
    E.useEffect(() => {
      if (U && m && a.window) {
        let R = m,
          Ae = U.promise,
          Le = a.window.document.startViewTransition(async () => {
            (u === !1
              ? h(R)
              : E.startTransition(() => {
                  (u === !0 && y((Pe) => xp(Pe, R)), h(R));
                }),
              await Ae);
          });
        (Le.finished.finally(() => {
          (V(void 0), X(void 0), w(void 0), M({ isTransitioning: !1 }));
        }),
          X(Le));
      }
    }, [m, U, a.window, u, y]),
    E.useEffect(() => {
      U && m && g.location.key === m.location.key && U.resolve();
    }, [U, Q, g.location, m]),
    E.useEffect(() => {
      !b.isTransitioning &&
        P &&
        (w(P.state),
        M({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: P.currentLocation,
          nextLocation: P.nextLocation,
        }),
        ee(void 0));
    }, [b.isTransitioning, P]));
  let be = E.useMemo(
      () => ({
        createHref: a.createHref,
        encodeLocation: a.encodeLocation,
        go: (R) => a.navigate(R),
        push: (R, Ae, Le) =>
          a.navigate(R, {
            state: Ae,
            preventScrollReset: Le?.preventScrollReset,
          }),
        replace: (R, Ae, Le) =>
          a.navigate(R, {
            replace: !0,
            state: Ae,
            preventScrollReset: Le?.preventScrollReset,
          }),
      }),
      [a],
    ),
    Se = a.basename || "/",
    se = E.useMemo(
      () => ({
        router: a,
        navigator: be,
        static: !1,
        basename: Se,
        onError: r,
      }),
      [a, be, Se, r],
    );
  return E.createElement(
    E.Fragment,
    null,
    E.createElement(
      xl.Provider,
      { value: se },
      E.createElement(
        Nr.Provider,
        { value: g },
        E.createElement(
          uy.Provider,
          { value: te.current },
          E.createElement(
            zf.Provider,
            { value: b },
            E.createElement(
              G2,
              {
                basename: Se,
                location: g.location,
                navigationType: g.historyAction,
                navigator: be,
                unstable_useTransitions: u,
              },
              E.createElement(V2, {
                routes: a.routes,
                future: a.future,
                state: g,
                isStatic: !1,
                onError: r,
              }),
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function xp(a, l) {
  return {
    ...a,
    navigation: l.navigation.state !== "idle" ? l.navigation : a.navigation,
    revalidation: l.revalidation !== "idle" ? l.revalidation : a.revalidation,
    actionData:
      l.navigation.state !== "submitting" ? l.actionData : a.actionData,
    fetchers: l.fetchers,
  };
}
var V2 = E.memo(X2);
function X2({ routes: a, future: l, state: r, isStatic: u, onError: c }) {
  return E2(a, void 0, { state: r, isStatic: u, onError: c });
}
function my({ to: a, replace: l, state: r, relative: u }) {
  je(
    wi(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: c } = E.useContext(ua);
  pt(
    !c,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: f } = E.useContext(Ta),
    { pathname: h } = sa(),
    g = Sl(),
    y = Dr(a, Du(f), h, u === "path"),
    m = JSON.stringify(y);
  return (
    E.useEffect(() => {
      g(JSON.parse(m), { replace: l, state: r, relative: u });
    }, [g, m, u, l, r]),
    null
  );
}
function gy(a) {
  return x2(a.context);
}
function G2({
  basename: a = "/",
  children: l = null,
  location: r,
  navigationType: u = "POP",
  navigator: c,
  static: f = !1,
  unstable_useTransitions: h,
}) {
  je(
    !wi(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let g = a.replace(/^\/*/, "/"),
    y = E.useMemo(
      () => ({
        basename: g,
        navigator: c,
        static: f,
        unstable_useTransitions: h,
        future: {},
      }),
      [g, c, f, h],
    );
  typeof r == "string" && (r = mn(r));
  let {
      pathname: m = "/",
      search: w = "",
      hash: b = "",
      state: M = null,
      key: U = "default",
      unstable_mask: V,
    } = r,
    Q = E.useMemo(() => {
      let X = Ea(m, g);
      return X == null
        ? null
        : {
            location: {
              pathname: X,
              search: w,
              hash: b,
              state: M,
              key: U,
              unstable_mask: V,
            },
            navigationType: u,
          };
    }, [g, m, w, b, M, U, u, V]);
  return (
    pt(
      Q != null,
      `<Router basename="${g}"> is not able to match the URL "${m}${w}${b}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    Q == null
      ? null
      : E.createElement(
          ua.Provider,
          { value: y },
          E.createElement(zu.Provider, { children: l, value: Q }),
        )
  );
}
var pu = "get",
  yu = "application/x-www-form-urlencoded";
function Ou(a) {
  return typeof HTMLElement < "u" && a instanceof HTMLElement;
}
function Q2(a) {
  return Ou(a) && a.tagName.toLowerCase() === "button";
}
function Z2(a) {
  return Ou(a) && a.tagName.toLowerCase() === "form";
}
function $2(a) {
  return Ou(a) && a.tagName.toLowerCase() === "input";
}
function K2(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function J2(a, l) {
  return a.button === 0 && (!l || l === "_self") && !K2(a);
}
var fu = null;
function F2() {
  if (fu === null)
    try {
      (new FormData(document.createElement("form"), 0), (fu = !1));
    } catch {
      fu = !0;
    }
  return fu;
}
var P2 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function hf(a) {
  return a != null && !P2.has(a)
    ? (pt(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${yu}"`,
      ),
      null)
    : a;
}
function W2(a, l) {
  let r, u, c, f, h;
  if (Z2(a)) {
    let g = a.getAttribute("action");
    ((u = g ? Ea(g, l) : null),
      (r = a.getAttribute("method") || pu),
      (c = hf(a.getAttribute("enctype")) || yu),
      (f = new FormData(a)));
  } else if (Q2(a) || ($2(a) && (a.type === "submit" || a.type === "image"))) {
    let g = a.form;
    if (g == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let y = a.getAttribute("formaction") || g.getAttribute("action");
    if (
      ((u = y ? Ea(y, l) : null),
      (r = a.getAttribute("formmethod") || g.getAttribute("method") || pu),
      (c =
        hf(a.getAttribute("formenctype")) ||
        hf(g.getAttribute("enctype")) ||
        yu),
      (f = new FormData(g, a)),
      !F2())
    ) {
      let { name: m, type: w, value: b } = a;
      if (w === "image") {
        let M = m ? `${m}.` : "";
        (f.append(`${M}x`, "0"), f.append(`${M}y`, "0"));
      } else m && f.append(m, b);
    }
  } else {
    if (Ou(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((r = pu), (u = null), (c = yu), (h = a));
  }
  return (
    f && c === "text/plain" && ((h = f), (f = void 0)),
    { action: u, method: r.toLowerCase(), encType: c, formData: f, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Lf(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function I2(a, l, r, u) {
  let c =
    typeof a == "string"
      ? new URL(
          a,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : a;
  return (
    r
      ? c.pathname.endsWith("/")
        ? (c.pathname = `${c.pathname}_.${u}`)
        : (c.pathname = `${c.pathname}.${u}`)
      : c.pathname === "/"
        ? (c.pathname = `_root.${u}`)
        : l && Ea(c.pathname, l) === "/"
          ? (c.pathname = `${l.replace(/\/$/, "")}/_root.${u}`)
          : (c.pathname = `${c.pathname.replace(/\/$/, "")}.${u}`),
    c
  );
}
async function ex(a, l) {
  if (a.id in l) return l[a.id];
  try {
    let r = await import(a.module);
    return ((l[a.id] = r), r);
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${a.module}\`, reloading page...`,
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function tx(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === "preload" &&
        typeof a.imageSrcSet == "string" &&
        typeof a.imageSizes == "string"
      : typeof a.rel == "string" && typeof a.href == "string";
}
async function ax(a, l, r) {
  let u = await Promise.all(
    a.map(async (c) => {
      let f = l.routes[c.route.id];
      if (f) {
        let h = await ex(f, r);
        return h.links ? h.links() : [];
      }
      return [];
    }),
  );
  return rx(
    u
      .flat(1)
      .filter(tx)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" },
      ),
  );
}
function Sp(a, l, r, u, c, f) {
  let h = (y, m) => (r[m] ? y.route.id !== r[m].route.id : !0),
    g = (y, m) =>
      r[m].pathname !== y.pathname ||
      (r[m].route.path?.endsWith("*") && r[m].params["*"] !== y.params["*"]);
  return f === "assets"
    ? l.filter((y, m) => h(y, m) || g(y, m))
    : f === "data"
      ? l.filter((y, m) => {
          let w = u.routes[y.route.id];
          if (!w || !w.hasLoader) return !1;
          if (h(y, m) || g(y, m)) return !0;
          if (y.route.shouldRevalidate) {
            let b = y.route.shouldRevalidate({
              currentUrl: new URL(
                c.pathname + c.search + c.hash,
                window.origin,
              ),
              currentParams: r[0]?.params || {},
              nextUrl: new URL(a, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof b == "boolean") return b;
          }
          return !0;
        })
      : [];
}
function nx(a, l, { includeHydrateFallback: r } = {}) {
  return lx(
    a
      .map((u) => {
        let c = l.routes[u.route.id];
        if (!c) return [];
        let f = [c.module];
        return (
          c.clientActionModule && (f = f.concat(c.clientActionModule)),
          c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
          r &&
            c.hydrateFallbackModule &&
            (f = f.concat(c.hydrateFallbackModule)),
          c.imports && (f = f.concat(c.imports)),
          f
        );
      })
      .flat(1),
  );
}
function lx(a) {
  return [...new Set(a)];
}
function ix(a) {
  let l = {},
    r = Object.keys(a).sort();
  for (let u of r) l[u] = a[u];
  return l;
}
function rx(a, l) {
  let r = new Set();
  return (
    new Set(l),
    a.reduce((u, c) => {
      let f = JSON.stringify(ix(c));
      return (r.has(f) || (r.add(f), u.push({ key: f, link: c })), u);
    }, [])
  );
}
function py() {
  let a = E.useContext(xl);
  return (
    Lf(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    a
  );
}
function ox() {
  let a = E.useContext(Nr);
  return (
    Lf(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    a
  );
}
var Uf = E.createContext(void 0);
Uf.displayName = "FrameworkContext";
function yy() {
  let a = E.useContext(Uf);
  return (
    Lf(a, "You must render this element inside a <HydratedRouter> element"),
    a
  );
}
function ux(a, l) {
  let r = E.useContext(Uf),
    [u, c] = E.useState(!1),
    [f, h] = E.useState(!1),
    {
      onFocus: g,
      onBlur: y,
      onMouseEnter: m,
      onMouseLeave: w,
      onTouchStart: b,
    } = l,
    M = E.useRef(null);
  (E.useEffect(() => {
    if ((a === "render" && h(!0), a === "viewport")) {
      let Q = (P) => {
          P.forEach((ee) => {
            h(ee.isIntersecting);
          });
        },
        X = new IntersectionObserver(Q, { threshold: 0.5 });
      return (
        M.current && X.observe(M.current),
        () => {
          X.disconnect();
        }
      );
    }
  }, [a]),
    E.useEffect(() => {
      if (u) {
        let Q = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(Q);
        };
      }
    }, [u]));
  let U = () => {
      c(!0);
    },
    V = () => {
      (c(!1), h(!1));
    };
  return r
    ? a !== "intent"
      ? [f, M, {}]
      : [
          f,
          M,
          {
            onFocus: Er(g, U),
            onBlur: Er(y, V),
            onMouseEnter: Er(m, U),
            onMouseLeave: Er(w, V),
            onTouchStart: Er(b, U),
          },
        ]
    : [!1, M, {}];
}
function Er(a, l) {
  return (r) => {
    (a && a(r), r.defaultPrevented || l(r));
  };
}
function sx({ page: a, ...l }) {
  let { router: r } = py(),
    u = E.useMemo(() => Xn(r.routes, a, r.basename), [r.routes, a, r.basename]);
  return u ? E.createElement(fx, { page: a, matches: u, ...l }) : null;
}
function cx(a) {
  let { manifest: l, routeModules: r } = yy(),
    [u, c] = E.useState([]);
  return (
    E.useEffect(() => {
      let f = !1;
      return (
        ax(a, l, r).then((h) => {
          f || c(h);
        }),
        () => {
          f = !0;
        }
      );
    }, [a, l, r]),
    u
  );
}
function fx({ page: a, matches: l, ...r }) {
  let u = sa(),
    { future: c, manifest: f, routeModules: h } = yy(),
    { basename: g } = py(),
    { loaderData: y, matches: m } = ox(),
    w = E.useMemo(() => Sp(a, l, m, f, u, "data"), [a, l, m, f, u]),
    b = E.useMemo(() => Sp(a, l, m, f, u, "assets"), [a, l, m, f, u]),
    M = E.useMemo(() => {
      if (a === u.pathname + u.search + u.hash) return [];
      let Q = new Set(),
        X = !1;
      if (
        (l.forEach((ee) => {
          let te = f.routes[ee.route.id];
          !te ||
            !te.hasLoader ||
            ((!w.some((Te) => Te.route.id === ee.route.id) &&
              ee.route.id in y &&
              h[ee.route.id]?.shouldRevalidate) ||
            te.hasClientLoader
              ? (X = !0)
              : Q.add(ee.route.id));
        }),
        Q.size === 0)
      )
        return [];
      let P = I2(a, g, c.unstable_trailingSlashAwareDataRequests, "data");
      return (
        X &&
          Q.size > 0 &&
          P.searchParams.set(
            "_routes",
            l
              .filter((ee) => Q.has(ee.route.id))
              .map((ee) => ee.route.id)
              .join(","),
          ),
        [P.pathname + P.search]
      );
    }, [g, c.unstable_trailingSlashAwareDataRequests, y, u, f, w, l, a, h]),
    U = E.useMemo(() => nx(b, f), [b, f]),
    V = cx(b);
  return E.createElement(
    E.Fragment,
    null,
    M.map((Q) =>
      E.createElement("link", {
        key: Q,
        rel: "prefetch",
        as: "fetch",
        href: Q,
        ...r,
      }),
    ),
    U.map((Q) =>
      E.createElement("link", { key: Q, rel: "modulepreload", href: Q, ...r }),
    ),
    V.map(({ key: Q, link: X }) =>
      E.createElement("link", {
        key: Q,
        nonce: r.nonce,
        ...X,
        crossOrigin: X.crossOrigin ?? r.crossOrigin,
      }),
    ),
  );
}
function dx(...a) {
  return (l) => {
    a.forEach((r) => {
      typeof r == "function" ? r(l) : r != null && (r.current = l);
    });
  };
}
var hx =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  hx && (window.__reactRouterVersion = "7.13.1");
} catch {}
function mx(a, l) {
  return Yw({
    basename: l?.basename,
    getContext: l?.getContext,
    future: l?.future,
    history: nw({ window: l?.window }),
    hydrationData: l?.hydrationData || gx(),
    routes: a,
    mapRouteProperties: H2,
    hydrationRouteProperties: k2,
    dataStrategy: l?.dataStrategy,
    patchRoutesOnNavigation: l?.patchRoutesOnNavigation,
    window: l?.window,
    unstable_instrumentations: l?.unstable_instrumentations,
  }).initialize();
}
function gx() {
  let a = window?.__staticRouterHydrationData;
  return (a && a.errors && (a = { ...a, errors: px(a.errors) }), a);
}
function px(a) {
  if (!a) return null;
  let l = Object.entries(a),
    r = {};
  for (let [u, c] of l)
    if (c && c.__type === "RouteErrorResponse")
      r[u] = new zr(c.status, c.statusText, c.data, c.internal === !0);
    else if (c && c.__type === "Error") {
      if (c.__subType) {
        let f = window[c.__subType];
        if (typeof f == "function")
          try {
            let h = new f(c.message);
            ((h.stack = ""), (r[u] = h));
          } catch {}
      }
      if (r[u] == null) {
        let f = new Error(c.message);
        ((f.stack = ""), (r[u] = f));
      }
    } else r[u] = c;
  return r;
}
var vy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Nu = E.forwardRef(function (
    {
      onClick: l,
      discover: r = "render",
      prefetch: u = "none",
      relative: c,
      reloadDocument: f,
      replace: h,
      unstable_mask: g,
      state: y,
      target: m,
      to: w,
      preventScrollReset: b,
      viewTransition: M,
      unstable_defaultShouldRevalidate: U,
      ...V
    },
    Q,
  ) {
    let {
        basename: X,
        navigator: P,
        unstable_useTransitions: ee,
      } = E.useContext(ua),
      te = typeof w == "string" && vy.test(w),
      Te = Kp(w, X);
    w = Te.to;
    let be = v2(w, { relative: c }),
      Se = sa(),
      se = null;
    if (g) {
      let ye = Dr(
        g,
        [],
        Se.unstable_mask ? Se.unstable_mask.pathname : "/",
        !0,
      );
      (X !== "/" &&
        (ye.pathname = ye.pathname === "/" ? X : Na([X, ye.pathname])),
        (se = P.createHref(ye)));
    }
    let [R, Ae, Le] = ux(u, V),
      Pe = wx(w, {
        replace: h,
        unstable_mask: g,
        state: y,
        target: m,
        preventScrollReset: b,
        relative: c,
        viewTransition: M,
        unstable_defaultShouldRevalidate: U,
        unstable_useTransitions: ee,
      });
    function ve(ye) {
      (l && l(ye), ye.defaultPrevented || Pe(ye));
    }
    let ut = !(Te.isExternal || f),
      Ue = E.createElement("a", {
        ...V,
        ...Le,
        href: (ut ? se : void 0) || Te.absoluteURL || be,
        onClick: ut ? ve : l,
        ref: dx(Q, Ae),
        target: m,
        "data-discover": !te && r === "render" ? "true" : void 0,
      });
    return R && !te
      ? E.createElement(E.Fragment, null, Ue, E.createElement(sx, { page: be }))
      : Ue;
  });
Nu.displayName = "Link";
var yx = E.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: r = !1,
    className: u = "",
    end: c = !1,
    style: f,
    to: h,
    viewTransition: g,
    children: y,
    ...m
  },
  w,
) {
  let b = _r(h, { relative: m.relative }),
    M = sa(),
    U = E.useContext(Nr),
    { navigator: V, basename: Q } = E.useContext(ua),
    X = U != null && Tx(b) && g === !0,
    P = V.encodeLocation ? V.encodeLocation(b).pathname : b.pathname,
    ee = M.pathname,
    te =
      U && U.navigation && U.navigation.location
        ? U.navigation.location.pathname
        : null;
  (r ||
    ((ee = ee.toLowerCase()),
    (te = te ? te.toLowerCase() : null),
    (P = P.toLowerCase())),
    te && Q && (te = Ea(te, Q) || te));
  const Te = P !== "/" && P.endsWith("/") ? P.length - 1 : P.length;
  let be = ee === P || (!c && ee.startsWith(P) && ee.charAt(Te) === "/"),
    Se =
      te != null &&
      (te === P || (!c && te.startsWith(P) && te.charAt(P.length) === "/")),
    se = { isActive: be, isPending: Se, isTransitioning: X },
    R = be ? l : void 0,
    Ae;
  typeof u == "function"
    ? (Ae = u(se))
    : (Ae = [
        u,
        be ? "active" : null,
        Se ? "pending" : null,
        X ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Le = typeof f == "function" ? f(se) : f;
  return E.createElement(
    Nu,
    {
      ...m,
      "aria-current": R,
      className: Ae,
      ref: w,
      style: Le,
      to: h,
      viewTransition: g,
    },
    typeof y == "function" ? y(se) : y,
  );
});
yx.displayName = "NavLink";
var vx = E.forwardRef(
  (
    {
      discover: a = "render",
      fetcherKey: l,
      navigate: r,
      reloadDocument: u,
      replace: c,
      state: f,
      method: h = pu,
      action: g,
      onSubmit: y,
      relative: m,
      preventScrollReset: w,
      viewTransition: b,
      unstable_defaultShouldRevalidate: M,
      ...U
    },
    V,
  ) => {
    let { unstable_useTransitions: Q } = E.useContext(ua),
      X = Ex(),
      P = Cx(g, { relative: m }),
      ee = h.toLowerCase() === "get" ? "get" : "post",
      te = typeof g == "string" && vy.test(g),
      Te = (be) => {
        if ((y && y(be), be.defaultPrevented)) return;
        be.preventDefault();
        let Se = be.nativeEvent.submitter,
          se = Se?.getAttribute("formmethod") || h,
          R = () =>
            X(Se || be.currentTarget, {
              fetcherKey: l,
              method: se,
              navigate: r,
              replace: c,
              state: f,
              relative: m,
              preventScrollReset: w,
              viewTransition: b,
              unstable_defaultShouldRevalidate: M,
            });
        Q && r !== !1 ? E.startTransition(() => R()) : R();
      };
    return E.createElement("form", {
      ref: V,
      method: ee,
      action: P,
      onSubmit: u ? y : Te,
      ...U,
      "data-discover": !te && a === "render" ? "true" : void 0,
    });
  },
);
vx.displayName = "Form";
function bx(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function by(a) {
  let l = E.useContext(xl);
  return (je(l, bx(a)), l);
}
function wx(
  a,
  {
    target: l,
    replace: r,
    unstable_mask: u,
    state: c,
    preventScrollReset: f,
    relative: h,
    viewTransition: g,
    unstable_defaultShouldRevalidate: y,
    unstable_useTransitions: m,
  } = {},
) {
  let w = Sl(),
    b = sa(),
    M = _r(a, { relative: h });
  return E.useCallback(
    (U) => {
      if (J2(U, l)) {
        U.preventDefault();
        let V = r !== void 0 ? r : Va(b) === Va(M),
          Q = () =>
            w(a, {
              replace: V,
              unstable_mask: u,
              state: c,
              preventScrollReset: f,
              relative: h,
              viewTransition: g,
              unstable_defaultShouldRevalidate: y,
            });
        m ? E.startTransition(() => Q()) : Q();
      }
    },
    [b, w, M, r, u, c, l, a, f, h, g, y, m],
  );
}
var xx = 0,
  Sx = () => `__${String(++xx)}__`;
function Ex() {
  let { router: a } = by("useSubmit"),
    { basename: l } = E.useContext(ua),
    r = O2(),
    u = a.fetch,
    c = a.navigate;
  return E.useCallback(
    async (f, h = {}) => {
      let { action: g, method: y, encType: m, formData: w, body: b } = W2(f, l);
      if (h.navigate === !1) {
        let M = h.fetcherKey || Sx();
        await u(M, r, h.action || g, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: w,
          body: b,
          formMethod: h.method || y,
          formEncType: h.encType || m,
          flushSync: h.flushSync,
        });
      } else
        await c(h.action || g, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: w,
          body: b,
          formMethod: h.method || y,
          formEncType: h.encType || m,
          replace: h.replace,
          state: h.state,
          fromRouteId: r,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition,
        });
    },
    [u, c, l, r],
  );
}
function Cx(a, { relative: l } = {}) {
  let { basename: r } = E.useContext(ua),
    u = E.useContext(Ta);
  je(u, "useFormAction must be used inside a RouteContext");
  let [c] = u.matches.slice(-1),
    f = { ..._r(a || ".", { relative: l }) },
    h = sa();
  if (a == null) {
    f.search = h.search;
    let g = new URLSearchParams(f.search),
      y = g.getAll("index");
    if (y.some((w) => w === "")) {
      (g.delete("index"),
        y.filter((b) => b).forEach((b) => g.append("index", b)));
      let w = g.toString();
      f.search = w ? `?${w}` : "";
    }
  }
  return (
    (!a || a === ".") &&
      c.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (f.pathname = f.pathname === "/" ? r : Na([r, f.pathname])),
    Va(f)
  );
}
function Tx(a, { relative: l } = {}) {
  let r = E.useContext(zf);
  je(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: u } = by("useViewTransitionState"),
    c = _r(a, { relative: l });
  if (!r.isTransitioning) return !1;
  let f = Ea(r.currentLocation.pathname, u) || r.currentLocation.pathname,
    h = Ea(r.nextLocation.pathname, u) || r.nextLocation.pathname;
  return vu(c.pathname, h) != null || vu(c.pathname, f) != null;
}
var Ax = qp();
function jx(a) {
  return E.createElement(Y2, { flushSync: Ax.flushSync, ...a });
}
function _u(a = !0) {
  const l = a ? localStorage : sessionStorage,
    r = (m, w) => l.setItem(m, w),
    u = (m) => l.getItem(m);
  return {
    set: r,
    get: u,
    clear: () => l.clear(),
    setJson: (m, w) => {
      r(m, JSON.stringify(w));
    },
    getJson: (m) => {
      const w = u(m);
      return w ? JSON.parse(w) : null;
    },
    setNumber: (m, w) => {
      r(m, String(w));
    },
    getNumber: (m) => {
      const w = u(m);
      return w ? Number(w) : null;
    },
  };
}
const Mx = "/app/assets/logo_pkf_transparent-Cn1Ck-tT.png",
  Rx = "/app/assets/avatar-CIIo_SZT.jpg",
  Ep = "app_config",
  Cp = "web.lastConnectedUser",
  Sf = "app.pkf.menu",
  wy = E.createContext(null),
  Dx = ({ children: a }) => {
    const l = E.useRef(_u()).current,
      [r, u] = E.useState({ theme: "light", isLogged: !1 }),
      c = (f) => {
        u((h) => {
          const g = f(h);
          return (l.setJson(Ep, g), g);
        });
      };
    return (
      E.useEffect(() => {
        const f = l.getJson(Ep);
        f && u(f);
      }, []),
      v.jsx(wy.Provider, {
        value: { params: r, setParams: c, store: l },
        children: a,
      })
    );
  },
  El = () => {
    const a = E.useContext(wy);
    if (!a)
      throw new Error("useAppConfig must be used within AppConfigProvider");
    return a;
  },
  xy = E.createContext(null),
  zx = ({ children: a }) => {
    const { params: l, setParams: r } = El(),
      u = (f) => r((h) => ({ ...h, theme: f })),
      c = l.theme === "dark";
    return v.jsx(xy.Provider, {
      value: { theme: l.theme, isDark: c, setTheme: u },
      children: a,
    });
  },
  ot = () => {
    const a = E.useContext(xy);
    if (!a) throw new Error("useTheme must be used within ThemeProvider");
    return a;
  };
function Sy(a) {
  var l,
    r,
    u = "";
  if (typeof a == "string" || typeof a == "number") u += a;
  else if (typeof a == "object")
    if (Array.isArray(a)) {
      var c = a.length;
      for (l = 0; l < c; l++)
        a[l] && (r = Sy(a[l])) && (u && (u += " "), (u += r));
    } else for (r in a) a[r] && (u && (u += " "), (u += r));
  return u;
}
function oe() {
  for (var a, l, r = 0, u = "", c = arguments.length; r < c; r++)
    (a = arguments[r]) && (l = Sy(a)) && (u && (u += " "), (u += l));
  return u;
}
function Ey() {
  const { isDark: a } = ot();
  return v.jsxs("div", {
    className: oe("h-screen flex items-center justify-center flex-col", {
      "bg-dark text-white": a,
    }),
    children: [
      v.jsx("img", { src: Mx, alt: "logo", className: "w-25" }),
      v.jsx("h1", {
        className: "font-bold text-2xl",
        children: "PKF Monterrey",
      }),
      v.jsx("div", {
        className: "flex gap-1 mt-5",
        children: Array.from({ length: 5 }).map((l, r) =>
          v.jsx(
            "div",
            {
              className: oe("w-4 h-4 rounded-full animate-bounce", {
                "bg-white": a,
                "bg-dark": !a,
              }),
              style: { animationDelay: `${r * 0.15}s` },
            },
            r,
          ),
        ),
      }),
    ],
  });
}
function Ox(a = Date.now()) {
  const l = new Date(a),
    r = (u) => u.toString().padStart(2, "0");
  return `${l.getUTCFullYear()}-${r(l.getUTCMonth() + 1)}-${r(l.getUTCDate())} ${r(l.getUTCHours())}:${r(l.getUTCMinutes())}:${r(l.getUTCSeconds())}`;
}
function Nx(a = "") {
  const l = (c) =>
      a
        ? `${a}${c.startsWith("/") ? c : `/${c}`}`
        : `${c.startsWith("/") ? c : `/${c}`}`,
    r = async (c) => {
      const f = await c.json();
      return c.ok
        ? f
        : {
            jsonrpc: "2.0",
            result: { code: c.status, message: c.statusText, data: f },
          };
    },
    u = async (c, f) => {
      const h = await fetch(l(c), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      return r(h);
    };
  return {
    rpc: (c, f) => u(c, f),
    authenticate({ login: c, password: f, db: h }) {
      return u("/web/session/authenticate", {
        jsonrpc: "2.0",
        params: { db: h, login: c, password: f },
      });
    },
    call(c) {
      return u("/web/dataset/call_kw", {
        jsonrpc: "2.0",
        method: "call",
        params: c,
      });
    },
    session() {
      return u("/web/session/get_session_info", {});
    },
    async userInfo(c) {
      const f = _u();
      if (!c) {
        const y = f.getJson(Cp);
        if (y) return y[0];
      }
      const h = await this.session(),
        g = {
          login: h.result?.username ?? "",
          name: h.result?.name ?? "",
          userId: h.result?.uid ?? 0,
          partnerId: h.result?.partner_id ?? 0,
          partnerWriteDate: Ox(),
        };
      return (f.setJson(Cp, [g]), g);
    },
    avatar(c, f = "avatar_128") {
      const h = Math.ceil(Math.random() * 100 * 1e5);
      return `/web/image/res.users/${c}/${f}?unique=${h}`;
    },
    searchRead(c, f) {
      return this.call({
        model: c,
        method: "search_read",
        args: [],
        kwargs: f,
      });
    },
    read(c, f, h) {
      return this.call({
        model: c,
        method: "read",
        args: [f],
        kwargs: { fields: h },
      });
    },
  };
}
const Cy = E.createContext(null),
  _x = ({ children: a }) => {
    const l = E.useRef(Nx()).current;
    return v.jsx(Cy.Provider, { value: l, children: a });
  },
  Lx = () => {
    const a = E.useContext(Cy);
    if (!a) throw new Error("useOdoo must be used within OdooProvider");
    return a;
  },
  Ty = E.createContext(null),
  Ux = ({ children: a }) => {
    const l = Lx(),
      { setParams: r } = El(),
      [u, c] = E.useState(),
      f = async () => {
        try {
          const w = await l.userInfo(!0);
          return w?.login ? ((w.avatar = l.avatar(w.userId)), w) : null;
        } catch {
          return null;
        }
      },
      h = async () => {
        const w = await f();
        if (!w) {
          r((b) => ({ ...b, isLogged: !1 }));
          return;
        }
        (c(w), r((b) => ({ ...b, isLogged: !0 })));
      },
      g = async (w, b) => {
        const M = await fetch("/pkfmty/authenticate", {
          method: "post",
          body: JSON.stringify({ username: w, password: b }),
          headers: { "Content-Type": "application/json" },
        });
        if (!M.ok)
          throw (
            r((V) => ({ ...V, isLogged: !1 })),
            new Error(`Ocurro un error al iniciar sesión: ${M.statusText}`)
          );
        const U = await M.json();
        if (U.error)
          throw (r((V) => ({ ...V, isLogged: !1 })), new Error(U.message));
        return (r((V) => ({ ...V, isLogged: !0 })), await h(), U);
      },
      y = async () => {
        (await fetch("/web/session/logout"),
          c(void 0),
          r((w) => ({ ...w, isLogged: !1 })));
      },
      m = async () => {
        const w = await f(),
          b = !!w;
        return (r((M) => ({ ...M, isLogged: b })), w && c(w), b);
      };
    return (
      E.useEffect(() => {
        h();
      }, []),
      v.jsx(Ty.Provider, {
        value: { user: u, login: g, logout: y, checkSession: m },
        children: a,
      })
    );
  },
  Lr = () => {
    const a = E.useContext(Ty);
    if (!a) throw new Error("useAuth must be used within AuthProvider");
    return a;
  },
  Bx = (a, l) => {
    let r = l;
    const u = a.split(".");
    for (const c of u)
      if (r && c in r) r = r[c];
      else return;
    return r;
  },
  Ay = async (a) => {
    const l = (c) => (
        console.error(c),
        [
          {
            name: "dashboard",
            text: "Dashboard",
            icon: "fa fa-users-viewfinder",
            url: "/",
          },
        ]
      ),
      r = await fetch(a);
    if (!r.ok) return l(r.statusText);
    const u = await r.json();
    return u.error ? l(u.message) : u.data;
  },
  jy = async () => {
    const a = _u(),
      l = a.getJson(Sf);
    if (l !== null) return l;
    const r = await Ay("/pkfmty/menu");
    return (a.setJson(Sf, r), r);
  },
  Hx = async (a) => await Ay(`/pkfmty/menu/${a}/children`),
  kx = async (a) => {
    const r = _u().getJson(Sf);
    if (r) return r.some((u) => a.startsWith(u.url));
    await jy();
    try {
      const u = await fetch("/pkfmty/menu/check", {
        method: "POST",
        body: JSON.stringify({ path: a }),
        headers: { "content-type": "application/json" },
      });
      return u.ok ? !!(await u.json()).allowed : !1;
    } catch (u) {
      return (console.error("Error validating menu access:", u), !1);
    }
  };
function qx() {
  const a = sa(),
    [l, r] = E.useState(null),
    { checkSession: u } = Lr(),
    c = async () => {
      if (!(await u())) return r(!1);
      const h = await kx(a.pathname);
      r(h);
    };
  return (
    E.useEffect(() => {
      c();
    }, [a.pathname]),
    l === null
      ? v.jsx(Ey, {})
      : l
        ? v.jsx(gy, {})
        : v.jsx(my, { to: "/login", replace: !0 })
  );
}
function Yx() {
  const { checkSession: a } = Lr(),
    { setParams: l } = El(),
    r = sa(),
    [u, c] = E.useState(null);
  return (
    E.useEffect(() => {
      (a().then((f) => c(f)), l((f) => ({ ...f, lastUrl: r.pathname })));
    }, [r.pathname]),
    u === null
      ? v.jsx(Ey, {})
      : u
        ? v.jsx(my, { to: "/", replace: !0 })
        : v.jsx(gy, {})
  );
}
const Vx = E.forwardRef(({ variant: a = "default", className: l, ...r }, u) => {
    const c = () => {
      if (!a.startsWith("clear-")) return "";
      const f = a.replace("clear-", "");
      return `hover:bg-${f}-200 text-${f}-600`;
    };
    return v.jsx("button", {
      ref: u,
      className: oe(
        "p-2 w-auto rounded-sm cursor-pointer",
        "duration-300",
        c(),
        l,
      ),
      ...r,
      children: r.children,
    });
  }),
  Jn = E.forwardRef((a, l) => {
    const { variant: r = "default", className: u, ...c } = a;
    return r.startsWith("clear")
      ? v.jsx(Vx, { ...a })
      : v.jsx("button", {
          ref: l,
          className: oe(
            "p-2 min-w-40 rounded-sm cursor-pointer shadow-sm",
            "duration-300",
            {
              "bg-indigo-900 text-white active:bg-indigo-800 hover:bg-indigo-700":
                r === "primary",
              "bg-pink-900 text-white active:bg-pink-400 hover:bg-pink-700":
                r === "danger",
              "bg-gray-600 text-white active:bg-gray-400 hover:bg-gray-700":
                r === "secondary",
              "bg-gray-950 text-white active:bg-gray-800 hover:bg-gray-700":
                r === "dark",
              "text-gray-800 active:bg-gray-50 hover:bg-gray-100":
                r === "default",
            },
            u,
          ),
          ...c,
          children: c.children,
        });
  });
function Bf(a) {
  const l = E.useRef(null),
    r = E.useRef(null),
    [u, c] = E.useState(!1),
    [f, h] = E.useState("right"),
    [g, y] = E.useState("down");
  return (
    E.useEffect(() => {
      if (!u) return;
      const m = l.current,
        w = r.current;
      if (!m || !w) return;
      const b = m.getBoundingClientRect(),
        M = w.offsetWidth,
        U = w.offsetHeight;
      (b.left + M > window.innerWidth ? h("left") : h("right"),
        b.bottom + U > window.innerHeight ? y("up") : y("down"));
    }, [u]),
    E.useEffect(() => {
      if (!u) return;
      const m = (b) => {
          l.current?.contains(b.target) || c(!1);
        },
        w = (b) => {
          b.key === "Escape" && c(!1);
        };
      return (
        document.addEventListener("mousedown", m),
        window.addEventListener("keydown", w),
        () => {
          (document.removeEventListener("mousedown", m),
            window.removeEventListener("keydown", w));
        }
      );
    }, [u]),
    v.jsxs("div", {
      className: "relative inline-block",
      ref: l,
      children: [
        v.jsx("div", { onClick: () => c((m) => !m), children: a.children }),
        u &&
          v.jsx("div", {
            ref: r,
            className: oe(
              "absolute shadow-2xl w-40 z-50",
              {
                "bg-white text-gray-900": !a.isDark,
                "bg-gray-900 text-white": a.isDark,
              },
              {
                "left-0": f === "right",
                "right-0": f === "left",
                "top-full mt-1": g === "down",
                "bottom-full mb-1": g === "up",
              },
            ),
            children: v.jsx("ul", {
              children: a.items.map((m) =>
                v.jsxs(
                  "li",
                  {
                    className: oe(
                      "flex items-center gap-2",
                      "p-2 cursor-pointer text-[12px]",
                      {
                        "hover:bg-gray-700": a.isDark,
                        "hover:bg-gray-300": !a.isDark,
                      },
                    ),
                    onClick: () => {
                      (c(!1), a.onItemClick?.(m));
                    },
                    children: [
                      m.icon && v.jsx("i", { className: m.icon }),
                      m.text,
                    ],
                  },
                  m.name + "_mci",
                ),
              ),
            }),
          }),
      ],
    })
  );
}
const Xx = ({ icon: a, theme: l, ...r }) => {
  const u = l === "dark";
  return v.jsxs("div", {
    className: oe(
      "peer flex flex-row-reverse gap-2 items-center",
      "border p-2 mt-2 rounded-sm focus-within:border-blue-600",
      "focus-within:ring-1 focus-within:ring-blue-600",
      { "border-gray-300 text-gray-600": !u, "bg-gray-800 border-0": u },
    ),
    children: [
      v.jsx("input", {
        ...r,
        className: oe(
          "peer flex-1 outline-0",
          { "placeholder:text-gray-300": !u, "placeholder:text-gray-600": u },
          r.className,
        ),
      }),
      v.jsx("i", { className: oe(a, "peer-focus:text-blue-600") }),
    ],
  });
};
function Gx(a) {
  const {
    label: l,
    variant: r,
    containerClassName: u,
    theme: c,
    icon: f,
    ...h
  } = a;
  return v.jsxs("div", {
    className: "flex flex-col-reverse " + u,
    children: [
      v.jsx(Xx, { icon: f, theme: c, ...h }),
      l &&
        v.jsx("label", {
          htmlFor: h.id ?? h.name,
          className: oe(
            "peer-focus-within:text-blue-600",
            c === "dark" ? "text-gray-100" : "text-gray-600",
          ),
          children: l,
        }),
    ],
  });
}
const Qx = E.forwardRef((a, l) => {
  const {
      label: r,
      variant: u,
      theme: c,
      icon: f,
      containerClassName: h,
      ...g
    } = a,
    y = c === "dark",
    m = g.id ?? g.name,
    [w, b] = E.useState(!1),
    [M, U] = E.useState(g.defaultValue ?? ""),
    V = () => (g.type !== "password" ? g.type : w ? "text" : g.type),
    Q = () =>
      g.type !== "password" || M === ""
        ? null
        : v.jsx("i", {
            className: oe(
              "fa fa-regular fa-eye text-[12px] cursor-pointer",
              y ? "text-gray-100" : "text-gray-500",
            ),
            onClick: () => b((X) => !X),
          });
  return v.jsxs("div", {
    className: oe(
      "group relative flex items-center gap-2 mt-2 px-3 py-3 border-b transition-all duration-300",
      "focus-within:ring-b-1 focus-within:ring-blue-500 focus-within:border-b-blue-500",
      g.disabled
        ? y
          ? "bg-gray-700"
          : "bg-gray-200"
        : {
            "border-b-gray-300 bg-white": !y,
            "border-b-gray-700 bg-gray-800 text-white": y,
          },
      h,
    ),
    children: [
      f &&
        v.jsx("i", {
          className: oe(
            f,
            "transition-all duration-300 text-gray-400",
            "group-focus-within:text-blue-500 group-focus-within:scale-110",
          ),
        }),
      v.jsx("input", {
        ref: l,
        ...g,
        placeholder: " ",
        type: V(),
        className: oe(
          "peer w-full bg-transparent outline-none transition-all duration-300",
          "placeholder-transparent",
          g.className,
        ),
        onChange: (X) => {
          (U(X.currentTarget.value), g.onChange?.(X));
        },
      }),
      Q(),
      r &&
        v.jsx("label", {
          htmlFor: m,
          className: oe(
            "absolute left-10 top-2 text-sm transition-all duration-300 pointer-events-none",
            "peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500",
            {
              "peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs":
                g.type !== "date",
              "peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-0":
                g.type === "date",
            },
            g.disabled && "peer-not-placeholder-shown:hidden",
            { "text-gray-500": !y, "text-gray-400": y },
          ),
          children: r,
        }),
    ],
  });
});
function bu(a) {
  const { theme: l } = ot();
  return a.variant === "material"
    ? v.jsx(Qx, { ...a, theme: l })
    : v.jsx(Gx, { ...a, theme: l });
}
function Lu({ full: a, className: l, ...r }) {
  return v.jsx("div", {
    ...r,
    className: oe("w-full", { "md:w-5/6 m-auto": !a }, l),
    children: r.children,
  });
}
function My(a) {
  if (a.dataSource.length === 0)
    return v.jsx("ul", {
      children: v.jsx("li", {
        className: "p-4",
        children: Array.from({ length: 4 }).map((r, u) =>
          v.jsxs(
            "div",
            {
              className:
                "animate-pulse space-y-4 border-b border-b-gray-300 mb-4",
              children: [
                v.jsx("div", { className: "h-6 bg-gray-300 rounded w-1/3" }),
                v.jsx("div", { className: "h-4 bg-gray-300 rounded" }),
                v.jsx("div", { className: "h-4 bg-gray-300 rounded w-5/6" }),
                v.jsx("div", {
                  className: "h-4 bg-gray-300 rounded w-4/6 mb-2",
                }),
              ],
            },
            "skeleton_" + u,
          ),
        ),
      }),
    });
  const l = a.dataSource.map((r, u) =>
    v.jsx("li", { children: a.renderListItem(r) }, u),
  );
  return v.jsx("ul", { children: l });
}
function Ry(a) {
  return v.jsx("tbody", {
    children: Array.from({ length: 4 }).map((l, r) =>
      v.jsx(
        "tr",
        {
          className: "border-b border-b-gray-300",
          children: a.columns.map((u, c) =>
            u.visible === !1
              ? null
              : v.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    children: v.jsx("div", {
                      className: "animate-pulse h-3 bg-gray-200 rounded w-5/6",
                    }),
                  },
                  `cell_s_${u.name}_${r}_${c}`,
                ),
          ),
        },
        `s_row_${r}`,
      ),
    ),
  });
}
const Zx = ({ cols: a, message: l }) =>
  v.jsx("tbody", {
    children: v.jsx("tr", {
      children: v.jsx("td", {
        colSpan: a,
        className: "text-center  p-4 text-gray-600 italic",
        children: l ?? "No display data",
      }),
    }),
  });
function Dy(a) {
  if (a.loading === !0) return v.jsx(Ry, { ...a });
  if (a.dataSource.length === 0)
    return v.jsx(Zx, { cols: a.columns.length, message: a.noDataMessage });
  const l = (u, c) =>
      a.columns.map((f, h) =>
        f.visible === !1
          ? null
          : v.jsx(
              "td",
              {
                className: oe(
                  "px-4 py-3",
                  a.isDark ? "text-white" : "text-gray-700",
                ),
                children: f.element ? f.element(u, c) : Bx(f.name, u),
              },
              `cell_${f.name}_${c}_${h}`,
            ),
      ),
    r = a.dataSource.map((u, c) =>
      v.jsx(
        "tr",
        {
          className: oe(
            "transition-colors",
            a.rowPointer && "cursor-pointer",
            a.rowHover && {
              "hover:bg-gray-100": !a.isDark,
              "hover:bg-gray-800": a.isDark,
            },
          ),
          children: l(u, c),
        },
        `row_${c}`,
      ),
    );
  return v.jsx("tbody", { children: r });
}
function zy(a) {
  return v.jsx("thead", {
    className: "text-xs uppercase text-gray-500 sticky top-0",
    children: v.jsx("tr", {
      children: a.columns.map((l, r) =>
        l.visible !== !1
          ? v.jsx(
              "th",
              {
                className: oe(
                  "px-4 py-3 text-left font-medium border-b text-gray-400",
                  {
                    "border-b-gray-200 bg-gray-50": !a.isDark,
                    "border-b-gray-800 bg-gray-900": a.isDark,
                  },
                  l.className,
                ),
                children: l.text ?? l.name,
              },
              `head_${l.name}_${r}`,
            )
          : null,
      ),
    }),
  });
}
function Ur(a) {
  if (a.columns.length === 0)
    return v.jsx("div", {
      className: "italic p-4 text-gray-400",
      children: "Debe de definir las columnas",
    });
  const l = a.columns
    .map((r) => ({ ...r, visible: r.visible ?? !0 }))
    .filter((r) => r.visible);
  return l.length === 0
    ? null
    : v.jsxs("table", {
        className: "w-full",
        children: [
          v.jsx(zy, { columns: l, isDark: a.isDark }),
          v.jsx(Dy, { ...a, columns: l }),
        ],
      });
}
Ur.THead = zy;
Ur.TBody = Dy;
Ur.TBodySkeleton = Ry;
function Br(a) {
  const [l, r] = E.useState(!1);
  return (
    E.useEffect(() => {
      const u = window.matchMedia("(max-width: 768px)"),
        c = () => r(u.matches);
      return (
        c(),
        u.addEventListener("change", c),
        () => u.removeEventListener("change", c)
      );
    }, []),
    v.jsx("div", {
      className: a.className,
      children: l ? v.jsx(My, { ...a }) : v.jsx(Ur, { ...a }),
    })
  );
}
Br.Table = Ur;
Br.List = My;
function $x({ value: a, onChange: l, color: r }) {
  return v.jsx("button", {
    onClick: () => l(!a),
    className: oe(
      "relative inline-flex h-5 w-10 items-center rounded-full",
      "transition-colors duration-300",
      a
        ? {
            "bg-blue-600": r === "blue",
            "bg-green-600": r === "green",
            "bg-indigo-600": !r,
          }
        : "bg-gray-300",
    ),
    children: v.jsx("span", {
      className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${a ? "translate-x-6" : "translate-x-1"}`,
    }),
  });
}
function Oy(a, l, r) {
  if (typeof a == "function" ? a === l : a.has(l))
    return arguments.length < 3 ? l : r;
  throw new TypeError("Private element is not present on this object");
}
function Kx(a, l) {
  if (l.has(a))
    throw new TypeError(
      "Cannot initialize the same private elements twice on an object",
    );
}
function Tp(a, l) {
  return a.get(Oy(a, l));
}
function Jx(a, l, r) {
  (Kx(a, l), l.set(a, r));
}
function Fx(a, l, r) {
  return (a.set(Oy(a, l), r), r);
}
const Px = 100,
  ue = {},
  Wx = () => {
    ue.previousActiveElement instanceof HTMLElement
      ? (ue.previousActiveElement.focus(), (ue.previousActiveElement = null))
      : document.body && document.body.focus();
  },
  Ix = (a) =>
    new Promise((l) => {
      if (!a) return l();
      const r = window.scrollX,
        u = window.scrollY;
      ((ue.restoreFocusTimeout = setTimeout(() => {
        (Wx(), l());
      }, Px)),
        window.scrollTo(r, u));
    }),
  Ny = "swal2-",
  e1 = [
    "container",
    "shown",
    "height-auto",
    "iosfix",
    "popup",
    "modal",
    "no-backdrop",
    "no-transition",
    "toast",
    "toast-shown",
    "show",
    "hide",
    "close",
    "title",
    "html-container",
    "actions",
    "confirm",
    "deny",
    "cancel",
    "footer",
    "icon",
    "icon-content",
    "image",
    "input",
    "file",
    "range",
    "select",
    "radio",
    "checkbox",
    "label",
    "textarea",
    "inputerror",
    "input-label",
    "validation-message",
    "progress-steps",
    "active-progress-step",
    "progress-step",
    "progress-step-line",
    "loader",
    "loading",
    "styled",
    "top",
    "top-start",
    "top-end",
    "top-left",
    "top-right",
    "center",
    "center-start",
    "center-end",
    "center-left",
    "center-right",
    "bottom",
    "bottom-start",
    "bottom-end",
    "bottom-left",
    "bottom-right",
    "grow-row",
    "grow-column",
    "grow-fullscreen",
    "rtl",
    "timer-progress-bar",
    "timer-progress-bar-container",
    "scrollbar-measure",
    "icon-success",
    "icon-warning",
    "icon-info",
    "icon-question",
    "icon-error",
    "draggable",
    "dragging",
  ],
  B = e1.reduce((a, l) => ((a[l] = Ny + l), a), {}),
  t1 = ["success", "warning", "info", "question", "error"],
  wu = t1.reduce((a, l) => ((a[l] = Ny + l), a), {}),
  _y = "SweetAlert2:",
  Hf = (a) => a.charAt(0).toUpperCase() + a.slice(1),
  Xt = (a) => {
    console.warn(`${_y} ${typeof a == "object" ? a.join(" ") : a}`);
  },
  Cl = (a) => {
    console.error(`${_y} ${a}`);
  },
  Ap = [],
  a1 = (a) => {
    Ap.includes(a) || (Ap.push(a), Xt(a));
  },
  Ly = (a, l = null) => {
    a1(
      `"${a}" is deprecated and will be removed in the next major release.${l ? ` Use "${l}" instead.` : ""}`,
    );
  },
  Uu = (a) => (typeof a == "function" ? a() : a),
  kf = (a) => a && typeof a.toPromise == "function",
  Hr = (a) => (kf(a) ? a.toPromise() : Promise.resolve(a)),
  qf = (a) => a && Promise.resolve(a) === a,
  Gt = () => document.body.querySelector(`.${B.container}`),
  kr = (a) => {
    const l = Gt();
    return l ? l.querySelector(a) : null;
  },
  ca = (a) => kr(`.${a}`),
  Qe = () => ca(B.popup),
  xi = () => ca(B.icon),
  n1 = () => ca(B["icon-content"]),
  Uy = () => ca(B.title),
  Yf = () => ca(B["html-container"]),
  By = () => ca(B.image),
  Vf = () => ca(B["progress-steps"]),
  Bu = () => ca(B["validation-message"]),
  Xa = () => kr(`.${B.actions} .${B.confirm}`),
  Si = () => kr(`.${B.actions} .${B.cancel}`),
  Tl = () => kr(`.${B.actions} .${B.deny}`),
  l1 = () => ca(B["input-label"]),
  Ei = () => kr(`.${B.loader}`),
  qr = () => ca(B.actions),
  Hy = () => ca(B.footer),
  Hu = () => ca(B["timer-progress-bar"]),
  Xf = () => ca(B.close),
  i1 = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`,
  Gf = () => {
    const a = Qe();
    if (!a) return [];
    const l = a.querySelectorAll(
        '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])',
      ),
      r = Array.from(l).sort((f, h) => {
        const g = parseInt(f.getAttribute("tabindex") || "0"),
          y = parseInt(h.getAttribute("tabindex") || "0");
        return g > y ? 1 : g < y ? -1 : 0;
      }),
      u = a.querySelectorAll(i1),
      c = Array.from(u).filter((f) => f.getAttribute("tabindex") !== "-1");
    return [...new Set(r.concat(c))].filter((f) => Wt(f));
  },
  Qf = () =>
    hn(document.body, B.shown) &&
    !hn(document.body, B["toast-shown"]) &&
    !hn(document.body, B["no-backdrop"]),
  ku = () => {
    const a = Qe();
    return a ? hn(a, B.toast) : !1;
  },
  r1 = () => {
    const a = Qe();
    return a ? a.hasAttribute("data-loading") : !1;
  },
  fa = (a, l) => {
    if (((a.textContent = ""), l)) {
      const u = new DOMParser().parseFromString(l, "text/html"),
        c = u.querySelector("head");
      c &&
        Array.from(c.childNodes).forEach((h) => {
          a.appendChild(h);
        });
      const f = u.querySelector("body");
      f &&
        Array.from(f.childNodes).forEach((h) => {
          h instanceof HTMLVideoElement || h instanceof HTMLAudioElement
            ? a.appendChild(h.cloneNode(!0))
            : a.appendChild(h);
        });
    }
  },
  hn = (a, l) => {
    if (!l) return !1;
    const r = l.split(/\s+/);
    for (let u = 0; u < r.length; u++)
      if (!a.classList.contains(r[u])) return !1;
    return !0;
  },
  o1 = (a, l) => {
    Array.from(a.classList).forEach((r) => {
      !Object.values(B).includes(r) &&
        !Object.values(wu).includes(r) &&
        !Object.values(l.showClass || {}).includes(r) &&
        a.classList.remove(r);
    });
  },
  oa = (a, l, r) => {
    if ((o1(a, l), !l.customClass)) return;
    const u = l.customClass[r];
    if (u) {
      if (typeof u != "string" && !u.forEach) {
        Xt(
          `Invalid type of customClass.${r}! Expected string or iterable object, got "${typeof u}"`,
        );
        return;
      }
      Xe(a, u);
    }
  },
  qu = (a, l) => {
    if (!l) return null;
    switch (l) {
      case "select":
      case "textarea":
      case "file":
        return a.querySelector(`.${B.popup} > .${B[l]}`);
      case "checkbox":
        return a.querySelector(`.${B.popup} > .${B.checkbox} input`);
      case "radio":
        return (
          a.querySelector(`.${B.popup} > .${B.radio} input:checked`) ||
          a.querySelector(`.${B.popup} > .${B.radio} input:first-child`)
        );
      case "range":
        return a.querySelector(`.${B.popup} > .${B.range} input`);
      default:
        return a.querySelector(`.${B.popup} > .${B.input}`);
    }
  },
  ky = (a) => {
    if ((a.focus(), a.type !== "file")) {
      const l = a.value;
      ((a.value = ""), (a.value = l));
    }
  },
  qy = (a, l, r) => {
    !a ||
      !l ||
      (typeof l == "string" && (l = l.split(/\s+/).filter(Boolean)),
      l.forEach((u) => {
        Array.isArray(a)
          ? a.forEach((c) => {
              r ? c.classList.add(u) : c.classList.remove(u);
            })
          : r
            ? a.classList.add(u)
            : a.classList.remove(u);
      }));
  },
  Xe = (a, l) => {
    qy(a, l, !0);
  },
  Ca = (a, l) => {
    qy(a, l, !1);
  },
  Zn = (a, l) => {
    const r = Array.from(a.children);
    for (let u = 0; u < r.length; u++) {
      const c = r[u];
      if (c instanceof HTMLElement && hn(c, l)) return c;
    }
  },
  bl = (a, l, r) => {
    (r === `${parseInt(`${r}`)}` && (r = parseInt(r)),
      r || parseInt(`${r}`) === 0
        ? a.style.setProperty(l, typeof r == "number" ? `${r}px` : r)
        : a.style.removeProperty(l));
  },
  Dt = (a, l = "flex") => {
    a && (a.style.display = l);
  },
  kt = (a) => {
    a && (a.style.display = "none");
  },
  Zf = (a, l = "block") => {
    a &&
      new MutationObserver(() => {
        Yr(a, a.innerHTML, l);
      }).observe(a, { childList: !0, subtree: !0 });
  },
  jp = (a, l, r, u) => {
    const c = a.querySelector(l);
    c && c.style.setProperty(r, u);
  },
  Yr = (a, l, r = "flex") => {
    l ? Dt(a, r) : kt(a);
  },
  Wt = (a) =>
    !!(a && (a.offsetWidth || a.offsetHeight || a.getClientRects().length)),
  u1 = () => !Wt(Xa()) && !Wt(Tl()) && !Wt(Si()),
  Ef = (a) => a.scrollHeight > a.clientHeight,
  s1 = (a, l) => {
    let r = a;
    for (; r && r !== l; ) {
      if (Ef(r)) return !0;
      r = r.parentElement;
    }
    return !1;
  },
  Yy = (a) => {
    const l = window.getComputedStyle(a),
      r = parseFloat(l.getPropertyValue("animation-duration") || "0"),
      u = parseFloat(l.getPropertyValue("transition-duration") || "0");
    return r > 0 || u > 0;
  },
  $f = (a, l = !1) => {
    const r = Hu();
    r &&
      Wt(r) &&
      (l && ((r.style.transition = "none"), (r.style.width = "100%")),
      setTimeout(() => {
        ((r.style.transition = `width ${a / 1e3}s linear`),
          (r.style.width = "0%"));
      }, 10));
  },
  c1 = () => {
    const a = Hu();
    if (!a) return;
    const l = parseInt(window.getComputedStyle(a).width);
    (a.style.removeProperty("transition"), (a.style.width = "100%"));
    const r = parseInt(window.getComputedStyle(a).width),
      u = (l / r) * 100;
    a.style.width = `${u}%`;
  },
  f1 = () => typeof window > "u" || typeof document > "u",
  d1 = `
 <div aria-labelledby="${B.title}" aria-describedby="${B["html-container"]}" class="${B.popup}" tabindex="-1">
   <button type="button" class="${B.close}"></button>
   <ul class="${B["progress-steps"]}"></ul>
   <div class="${B.icon}"></div>
   <img class="${B.image}" />
   <h2 class="${B.title}" id="${B.title}"></h2>
   <div class="${B["html-container"]}" id="${B["html-container"]}"></div>
   <input class="${B.input}" id="${B.input}" />
   <input type="file" class="${B.file}" />
   <div class="${B.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${B.select}" id="${B.select}"></select>
   <div class="${B.radio}"></div>
   <label class="${B.checkbox}">
     <input type="checkbox" id="${B.checkbox}" />
     <span class="${B.label}"></span>
   </label>
   <textarea class="${B.textarea}" id="${B.textarea}"></textarea>
   <div class="${B["validation-message"]}" id="${B["validation-message"]}"></div>
   <div class="${B.actions}">
     <div class="${B.loader}"></div>
     <button type="button" class="${B.confirm}"></button>
     <button type="button" class="${B.deny}"></button>
     <button type="button" class="${B.cancel}"></button>
   </div>
   <div class="${B.footer}"></div>
   <div class="${B["timer-progress-bar-container"]}">
     <div class="${B["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, ""),
  h1 = () => {
    const a = Gt();
    return a
      ? (a.remove(),
        Ca(
          [document.documentElement, document.body],
          [B["no-backdrop"], B["toast-shown"], B["has-column"]],
        ),
        !0)
      : !1;
  },
  yl = () => {
    ue.currentInstance && ue.currentInstance.resetValidationMessage();
  },
  m1 = () => {
    const a = Qe();
    if (!a) return;
    const l = Zn(a, B.input),
      r = Zn(a, B.file),
      u = a.querySelector(`.${B.range} input`),
      c = a.querySelector(`.${B.range} output`),
      f = Zn(a, B.select),
      h = a.querySelector(`.${B.checkbox} input`),
      g = Zn(a, B.textarea);
    (l && (l.oninput = yl),
      r && (r.onchange = yl),
      f && (f.onchange = yl),
      h && (h.onchange = yl),
      g && (g.oninput = yl),
      u &&
        c &&
        ((u.oninput = () => {
          (yl(), (c.value = u.value));
        }),
        (u.onchange = () => {
          (yl(), (c.value = u.value));
        })));
  },
  g1 = (a) => {
    if (typeof a == "string") {
      const l = document.querySelector(a);
      if (!l) throw new Error(`Target element "${a}" not found`);
      return l;
    }
    return a;
  },
  p1 = (a) => {
    const l = Qe();
    l &&
      (l.setAttribute("role", a.toast ? "alert" : "dialog"),
      l.setAttribute("aria-live", a.toast ? "polite" : "assertive"),
      a.toast || l.setAttribute("aria-modal", "true"));
  },
  y1 = (a) => {
    window.getComputedStyle(a).direction === "rtl" &&
      (Xe(Gt(), B.rtl), (ue.isRTL = !0));
  },
  v1 = (a) => {
    const l = h1();
    if (f1()) {
      Cl("SweetAlert2 requires document to initialize");
      return;
    }
    const r = document.createElement("div");
    ((r.className = B.container),
      l && Xe(r, B["no-transition"]),
      fa(r, d1),
      (r.dataset.swal2Theme = a.theme));
    const u = g1(a.target || "body");
    (u.appendChild(r),
      a.topLayer && (r.setAttribute("popover", ""), r.showPopover()),
      p1(a),
      y1(u),
      m1());
  },
  Kf = (a, l) => {
    a instanceof HTMLElement
      ? l.appendChild(a)
      : typeof a == "object"
        ? b1(a, l)
        : a && fa(l, a);
  },
  b1 = (a, l) => {
    "jquery" in a ? w1(l, a) : fa(l, a.toString());
  },
  w1 = (a, l) => {
    if (((a.textContent = ""), 0 in l))
      for (let r = 0; r in l; r++) a.appendChild(l[r].cloneNode(!0));
    else a.appendChild(l.cloneNode(!0));
  },
  x1 = (a, l) => {
    const r = qr(),
      u = Ei();
    !r ||
      !u ||
      (!l.showConfirmButton && !l.showDenyButton && !l.showCancelButton
        ? kt(r)
        : Dt(r),
      oa(r, l, "actions"),
      S1(r, u, l),
      fa(u, l.loaderHtml || ""),
      oa(u, l, "loader"));
  };
function S1(a, l, r) {
  const u = Xa(),
    c = Tl(),
    f = Si();
  !u ||
    !c ||
    !f ||
    (gf(u, "confirm", r),
    gf(c, "deny", r),
    gf(f, "cancel", r),
    E1(u, c, f, r),
    r.reverseButtons &&
      (r.toast
        ? (a.insertBefore(f, u), a.insertBefore(c, u))
        : (a.insertBefore(f, l), a.insertBefore(c, l), a.insertBefore(u, l))));
}
function E1(a, l, r, u) {
  if (!u.buttonsStyling) {
    Ca([a, l, r], B.styled);
    return;
  }
  (Xe([a, l, r], B.styled),
    u.confirmButtonColor &&
      a.style.setProperty(
        "--swal2-confirm-button-background-color",
        u.confirmButtonColor,
      ),
    u.denyButtonColor &&
      l.style.setProperty(
        "--swal2-deny-button-background-color",
        u.denyButtonColor,
      ),
    u.cancelButtonColor &&
      r.style.setProperty(
        "--swal2-cancel-button-background-color",
        u.cancelButtonColor,
      ),
    mf(a),
    mf(l),
    mf(r));
}
function mf(a) {
  const l = window.getComputedStyle(a);
  if (l.getPropertyValue("--swal2-action-button-focus-box-shadow")) return;
  const r = l.backgroundColor.replace(
    /rgba?\((\d+), (\d+), (\d+).*/,
    "rgba($1, $2, $3, 0.5)",
  );
  a.style.setProperty(
    "--swal2-action-button-focus-box-shadow",
    l.getPropertyValue("--swal2-outline").replace(/ rgba\(.*/, ` ${r}`),
  );
}
function gf(a, l, r) {
  const u = Hf(l);
  (Yr(a, r[`show${u}Button`], "inline-block"),
    fa(a, r[`${l}ButtonText`] || ""),
    a.setAttribute("aria-label", r[`${l}ButtonAriaLabel`] || ""),
    (a.className = B[l]),
    oa(a, r, `${l}Button`));
}
const C1 = (a, l) => {
    const r = Xf();
    r &&
      (fa(r, l.closeButtonHtml || ""),
      oa(r, l, "closeButton"),
      Yr(r, l.showCloseButton),
      r.setAttribute("aria-label", l.closeButtonAriaLabel || ""));
  },
  T1 = (a, l) => {
    const r = Gt();
    r &&
      (A1(r, l.backdrop),
      j1(r, l.position),
      M1(r, l.grow),
      oa(r, l, "container"));
  };
function A1(a, l) {
  typeof l == "string"
    ? (a.style.background = l)
    : l || Xe([document.documentElement, document.body], B["no-backdrop"]);
}
function j1(a, l) {
  l &&
    (l in B
      ? Xe(a, B[l])
      : (Xt('The "position" parameter is not valid, defaulting to "center"'),
        Xe(a, B.center)));
}
function M1(a, l) {
  l && Xe(a, B[`grow-${l}`]);
}
var Ge = {
  innerParams: new WeakMap(),
  domCache: new WeakMap(),
  focusedElement: new WeakMap(),
};
const R1 = [
    "input",
    "file",
    "range",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ],
  D1 = (a, l) => {
    const r = Qe();
    if (!r) return;
    const u = Ge.innerParams.get(a),
      c = !u || l.input !== u.input;
    (R1.forEach((f) => {
      const h = Zn(r, B[f]);
      h && (N1(f, l.inputAttributes), (h.className = B[f]), c && kt(h));
    }),
      l.input && (c && z1(l), _1(l)));
  },
  z1 = (a) => {
    if (!a.input) return;
    if (!gt[a.input]) {
      Cl(
        `Unexpected type of input! Expected ${Object.keys(gt).join(" | ")}, got "${a.input}"`,
      );
      return;
    }
    const l = Vy(a.input);
    if (!l) return;
    const r = gt[a.input](l, a);
    (Dt(l),
      a.inputAutoFocus &&
        setTimeout(() => {
          ky(r);
        }));
  },
  O1 = (a) => {
    for (let l = 0; l < a.attributes.length; l++) {
      const r = a.attributes[l].name;
      ["id", "type", "value", "style"].includes(r) || a.removeAttribute(r);
    }
  },
  N1 = (a, l) => {
    const r = Qe();
    if (!r) return;
    const u = qu(r, a);
    if (u) {
      O1(u);
      for (const c in l) u.setAttribute(c, l[c]);
    }
  },
  _1 = (a) => {
    if (!a.input) return;
    const l = Vy(a.input);
    l && oa(l, a, "input");
  },
  Jf = (a, l) => {
    !a.placeholder &&
      l.inputPlaceholder &&
      (a.placeholder = l.inputPlaceholder);
  },
  Vr = (a, l, r) => {
    if (r.inputLabel) {
      const u = document.createElement("label"),
        c = B["input-label"];
      (u.setAttribute("for", a.id),
        (u.className = c),
        typeof r.customClass == "object" && Xe(u, r.customClass.inputLabel),
        (u.innerText = r.inputLabel),
        l.insertAdjacentElement("beforebegin", u));
    }
  },
  Vy = (a) => {
    const l = Qe();
    if (l) return Zn(l, B[a] || B.input);
  },
  xu = (a, l) => {
    ["string", "number"].includes(typeof l)
      ? (a.value = `${l}`)
      : qf(l) ||
        Xt(
          `Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof l}"`,
        );
  },
  gt = {};
gt.text =
  gt.email =
  gt.password =
  gt.number =
  gt.tel =
  gt.url =
  gt.search =
  gt.date =
  gt["datetime-local"] =
  gt.time =
  gt.week =
  gt.month =
    (a, l) => {
      const r = a;
      return (
        xu(r, l.inputValue),
        Vr(r, r, l),
        Jf(r, l),
        (r.type = l.input),
        r
      );
    };
gt.file = (a, l) => {
  const r = a;
  return (Vr(r, r, l), Jf(r, l), r);
};
gt.range = (a, l) => {
  const r = a,
    u = r.querySelector("input"),
    c = r.querySelector("output");
  return (
    u && (xu(u, l.inputValue), (u.type = l.input), Vr(u, a, l)),
    c && xu(c, l.inputValue),
    a
  );
};
gt.select = (a, l) => {
  const r = a;
  if (((r.textContent = ""), l.inputPlaceholder)) {
    const u = document.createElement("option");
    (fa(u, l.inputPlaceholder),
      (u.value = ""),
      (u.disabled = !0),
      (u.selected = !0),
      r.appendChild(u));
  }
  return (Vr(r, r, l), r);
};
gt.radio = (a) => {
  const l = a;
  return ((l.textContent = ""), a);
};
gt.checkbox = (a, l) => {
  const r = Qe();
  if (!r) throw new Error("Popup not found");
  const u = qu(r, "checkbox");
  if (!u) throw new Error("Checkbox input not found");
  ((u.value = "1"), (u.checked = !!l.inputValue));
  const f = a.querySelector("span");
  if (f) {
    const h = l.inputPlaceholder || l.inputLabel;
    h && fa(f, h);
  }
  return u;
};
gt.textarea = (a, l) => {
  const r = a;
  (xu(r, l.inputValue), Jf(r, l), Vr(r, r, l));
  const u = (c) =>
    parseInt(window.getComputedStyle(c).marginLeft) +
    parseInt(window.getComputedStyle(c).marginRight);
  return (
    setTimeout(() => {
      if ("MutationObserver" in window) {
        const c = Qe();
        if (!c) return;
        const f = parseInt(window.getComputedStyle(c).width),
          h = () => {
            if (!document.body.contains(r)) return;
            const g = r.offsetWidth + u(r),
              y = Qe();
            y && (g > f ? (y.style.width = `${g}px`) : bl(y, "width", l.width));
          };
        new MutationObserver(h).observe(r, {
          attributes: !0,
          attributeFilter: ["style"],
        });
      }
    }),
    r
  );
};
const L1 = (a, l) => {
    const r = Yf();
    r &&
      (Zf(r),
      oa(r, l, "htmlContainer"),
      l.html
        ? (Kf(l.html, r), Dt(r, "block"))
        : l.text
          ? ((r.textContent = l.text), Dt(r, "block"))
          : kt(r),
      D1(a, l));
  },
  U1 = (a, l) => {
    const r = Hy();
    r &&
      (Zf(r),
      Yr(r, !!l.footer, "block"),
      l.footer && Kf(l.footer, r),
      oa(r, l, "footer"));
  },
  B1 = (a, l) => {
    const r = Ge.innerParams.get(a),
      u = xi();
    if (!u) return;
    if (r && l.icon === r.icon) {
      (Rp(u, l), Mp(u, l));
      return;
    }
    if (!l.icon && !l.iconHtml) {
      kt(u);
      return;
    }
    if (l.icon && Object.keys(wu).indexOf(l.icon) === -1) {
      (Cl(
        `Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${l.icon}"`,
      ),
        kt(u));
      return;
    }
    (Dt(u),
      Rp(u, l),
      Mp(u, l),
      Xe(u, l.showClass && l.showClass.icon),
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", Xy));
  },
  Mp = (a, l) => {
    for (const [r, u] of Object.entries(wu)) l.icon !== r && Ca(a, u);
    (Xe(a, l.icon && wu[l.icon]), q1(a, l), Xy(), oa(a, l, "icon"));
  },
  Xy = () => {
    const a = Qe();
    if (!a) return;
    const l = window.getComputedStyle(a).getPropertyValue("background-color"),
      r = a.querySelectorAll(
        "[class^=swal2-success-circular-line], .swal2-success-fix",
      );
    for (let u = 0; u < r.length; u++) r[u].style.backgroundColor = l;
  },
  H1 = (a) => `
  ${a.animation ? '<div class="swal2-success-circular-line-left"></div>' : ""}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${a.animation ? '<div class="swal2-success-fix"></div>' : ""}
  ${a.animation ? '<div class="swal2-success-circular-line-right"></div>' : ""}
`,
  k1 = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`,
  Rp = (a, l) => {
    if (!l.icon && !l.iconHtml) return;
    let r = a.innerHTML,
      u = "";
    (l.iconHtml
      ? (u = Dp(l.iconHtml))
      : l.icon === "success"
        ? ((u = H1(l)), (r = r.replace(/ style=".*?"/g, "")))
        : l.icon === "error"
          ? (u = k1)
          : l.icon &&
            (u = Dp({ question: "?", warning: "!", info: "i" }[l.icon])),
      r.trim() !== u.trim() && fa(a, u));
  },
  q1 = (a, l) => {
    if (l.iconColor) {
      ((a.style.color = l.iconColor), (a.style.borderColor = l.iconColor));
      for (const r of [
        ".swal2-success-line-tip",
        ".swal2-success-line-long",
        ".swal2-x-mark-line-left",
        ".swal2-x-mark-line-right",
      ])
        jp(a, r, "background-color", l.iconColor);
      jp(a, ".swal2-success-ring", "border-color", l.iconColor);
    }
  },
  Dp = (a) => `<div class="${B["icon-content"]}">${a}</div>`,
  Y1 = (a, l) => {
    const r = By();
    if (r) {
      if (!l.imageUrl) {
        kt(r);
        return;
      }
      (Dt(r, ""),
        r.setAttribute("src", l.imageUrl),
        r.setAttribute("alt", l.imageAlt || ""),
        bl(r, "width", l.imageWidth),
        bl(r, "height", l.imageHeight),
        (r.className = B.image),
        oa(r, l, "image"));
    }
  };
let Ff = !1,
  Gy = 0,
  Qy = 0,
  Zy = 0,
  $y = 0;
const V1 = (a) => {
    (a.addEventListener("mousedown", Su),
      document.body.addEventListener("mousemove", Eu),
      a.addEventListener("mouseup", Cu),
      a.addEventListener("touchstart", Su),
      document.body.addEventListener("touchmove", Eu),
      a.addEventListener("touchend", Cu));
  },
  X1 = (a) => {
    (a.removeEventListener("mousedown", Su),
      document.body.removeEventListener("mousemove", Eu),
      a.removeEventListener("mouseup", Cu),
      a.removeEventListener("touchstart", Su),
      document.body.removeEventListener("touchmove", Eu),
      a.removeEventListener("touchend", Cu));
  },
  Su = (a) => {
    const l = Qe();
    if (!l) return;
    const r = xi();
    if (a.target === l || (r && r.contains(a.target))) {
      Ff = !0;
      const u = Ky(a);
      ((Gy = u.clientX),
        (Qy = u.clientY),
        (Zy = parseInt(l.style.insetInlineStart) || 0),
        ($y = parseInt(l.style.insetBlockStart) || 0),
        Xe(l, "swal2-dragging"));
    }
  },
  Eu = (a) => {
    const l = Qe();
    if (l && Ff) {
      let { clientX: r, clientY: u } = Ky(a);
      const c = r - Gy;
      ((l.style.insetInlineStart = `${Zy + (ue.isRTL ? -c : c)}px`),
        (l.style.insetBlockStart = `${$y + (u - Qy)}px`));
    }
  },
  Cu = () => {
    const a = Qe();
    ((Ff = !1), Ca(a, "swal2-dragging"));
  },
  Ky = (a) => {
    let l = 0,
      r = 0;
    return (
      a.type.startsWith("mouse")
        ? ((l = a.clientX), (r = a.clientY))
        : a.type.startsWith("touch") &&
          ((l = a.touches[0].clientX), (r = a.touches[0].clientY)),
      { clientX: l, clientY: r }
    );
  },
  G1 = (a, l) => {
    const r = Gt(),
      u = Qe();
    if (!(!r || !u)) {
      if (l.toast) {
        (bl(r, "width", l.width), (u.style.width = "100%"));
        const c = Ei();
        c && u.insertBefore(c, xi());
      } else bl(u, "width", l.width);
      (bl(u, "padding", l.padding),
        l.color && (u.style.color = l.color),
        l.background && (u.style.background = l.background),
        kt(Bu()),
        Q1(u, l),
        l.draggable && !l.toast
          ? (Xe(u, B.draggable), V1(u))
          : (Ca(u, B.draggable), X1(u)));
    }
  },
  Q1 = (a, l) => {
    const r = l.showClass || {};
    ((a.className = `${B.popup} ${Wt(a) ? r.popup : ""}`),
      l.toast
        ? (Xe([document.documentElement, document.body], B["toast-shown"]),
          Xe(a, B.toast))
        : Xe(a, B.modal),
      oa(a, l, "popup"),
      typeof l.customClass == "string" && Xe(a, l.customClass),
      l.icon && Xe(a, B[`icon-${l.icon}`]));
  },
  Z1 = (a, l) => {
    const r = Vf();
    if (!r) return;
    const { progressSteps: u, currentProgressStep: c } = l;
    if (!u || u.length === 0 || c === void 0) {
      kt(r);
      return;
    }
    (Dt(r),
      (r.textContent = ""),
      c >= u.length &&
        Xt(
          "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)",
        ),
      u.forEach((f, h) => {
        const g = $1(f);
        if (
          (r.appendChild(g),
          h === c && Xe(g, B["active-progress-step"]),
          h !== u.length - 1)
        ) {
          const y = K1(l);
          r.appendChild(y);
        }
      }));
  },
  $1 = (a) => {
    const l = document.createElement("li");
    return (Xe(l, B["progress-step"]), fa(l, a), l);
  },
  K1 = (a) => {
    const l = document.createElement("li");
    return (
      Xe(l, B["progress-step-line"]),
      a.progressStepsDistance && bl(l, "width", a.progressStepsDistance),
      l
    );
  },
  J1 = (a, l) => {
    const r = Uy();
    r &&
      (Zf(r),
      Yr(r, !!(l.title || l.titleText), "block"),
      l.title && Kf(l.title, r),
      l.titleText && (r.innerText = l.titleText),
      oa(r, l, "title"));
  },
  Jy = (a, l) => {
    var r;
    (G1(a, l),
      T1(a, l),
      Z1(a, l),
      B1(a, l),
      Y1(a, l),
      J1(a, l),
      C1(a, l),
      L1(a, l),
      x1(a, l),
      U1(a, l));
    const u = Qe();
    (typeof l.didRender == "function" && u && l.didRender(u),
      (r = ue.eventEmitter) === null || r === void 0 || r.emit("didRender", u));
  },
  F1 = () => Wt(Qe()),
  Fy = () => {
    var a;
    return (a = Xa()) === null || a === void 0 ? void 0 : a.click();
  },
  P1 = () => {
    var a;
    return (a = Tl()) === null || a === void 0 ? void 0 : a.click();
  },
  W1 = () => {
    var a;
    return (a = Si()) === null || a === void 0 ? void 0 : a.click();
  },
  Ci = Object.freeze({
    cancel: "cancel",
    backdrop: "backdrop",
    close: "close",
    esc: "esc",
    timer: "timer",
  }),
  Py = (a) => {
    if (a.keydownTarget && a.keydownHandlerAdded && a.keydownHandler) {
      const l = a.keydownHandler;
      (a.keydownTarget.removeEventListener("keydown", l, {
        capture: a.keydownListenerCapture,
      }),
        (a.keydownHandlerAdded = !1));
    }
  },
  I1 = (a, l, r) => {
    if ((Py(a), !l.toast)) {
      const u = (f) => tS(l, f, r);
      a.keydownHandler = u;
      const c = l.keydownListenerCapture ? window : Qe();
      if (c) {
        ((a.keydownTarget = c),
          (a.keydownListenerCapture = l.keydownListenerCapture));
        const f = u;
        (a.keydownTarget.addEventListener("keydown", f, {
          capture: a.keydownListenerCapture,
        }),
          (a.keydownHandlerAdded = !0));
      }
    }
  },
  Cf = (a, l) => {
    var r;
    const u = Gf();
    if (u.length) {
      ((a = a + l),
        a === -2 && (a = u.length - 1),
        a === u.length ? (a = 0) : a === -1 && (a = u.length - 1),
        u[a].focus());
      return;
    }
    (r = Qe()) === null || r === void 0 || r.focus();
  },
  Wy = ["ArrowRight", "ArrowDown"],
  eS = ["ArrowLeft", "ArrowUp"],
  tS = (a, l, r) => {
    a &&
      (l.isComposing ||
        l.keyCode === 229 ||
        (a.stopKeydownPropagation && l.stopPropagation(),
        l.key === "Enter"
          ? aS(l, a)
          : l.key === "Tab"
            ? nS(l)
            : [...Wy, ...eS].includes(l.key)
              ? lS(l.key)
              : l.key === "Escape" && iS(l, a, r)));
  },
  aS = (a, l) => {
    if (!Uu(l.allowEnterKey)) return;
    const r = Qe();
    if (!r || !l.input) return;
    const u = qu(r, l.input);
    if (
      a.target &&
      u &&
      a.target instanceof HTMLElement &&
      a.target.outerHTML === u.outerHTML
    ) {
      if (["textarea", "file"].includes(l.input)) return;
      (Fy(), a.preventDefault());
    }
  },
  nS = (a) => {
    const l = a.target,
      r = Gf();
    let u = -1;
    for (let c = 0; c < r.length; c++)
      if (l === r[c]) {
        u = c;
        break;
      }
    (a.shiftKey ? Cf(u, -1) : Cf(u, 1),
      a.stopPropagation(),
      a.preventDefault());
  },
  lS = (a) => {
    const l = qr(),
      r = Xa(),
      u = Tl(),
      c = Si();
    if (!l || !r || !u || !c) return;
    const f = [r, u, c];
    if (
      document.activeElement instanceof HTMLElement &&
      !f.includes(document.activeElement)
    )
      return;
    const h = Wy.includes(a) ? "nextElementSibling" : "previousElementSibling";
    let g = document.activeElement;
    if (g) {
      for (let y = 0; y < l.children.length; y++) {
        if (((g = g[h]), !g)) return;
        if (g instanceof HTMLButtonElement && Wt(g)) break;
      }
      g instanceof HTMLButtonElement && g.focus();
    }
  },
  iS = (a, l, r) => {
    (a.preventDefault(), Uu(l.allowEscapeKey) && r(Ci.esc));
  };
var yi = {
  swalPromiseResolve: new WeakMap(),
  swalPromiseReject: new WeakMap(),
};
const rS = () => {
    const a = Gt();
    Array.from(document.body.children).forEach((r) => {
      r.contains(a) ||
        (r.hasAttribute("aria-hidden") &&
          r.setAttribute(
            "data-previous-aria-hidden",
            r.getAttribute("aria-hidden") || "",
          ),
        r.setAttribute("aria-hidden", "true"));
    });
  },
  Iy = () => {
    Array.from(document.body.children).forEach((l) => {
      l.hasAttribute("data-previous-aria-hidden")
        ? (l.setAttribute(
            "aria-hidden",
            l.getAttribute("data-previous-aria-hidden") || "",
          ),
          l.removeAttribute("data-previous-aria-hidden"))
        : l.removeAttribute("aria-hidden");
    });
  },
  ev = typeof window < "u" && !!window.GestureEvent,
  oS = () => {
    if (ev && !hn(document.body, B.iosfix)) {
      const a = document.body.scrollTop;
      ((document.body.style.top = `${a * -1}px`),
        Xe(document.body, B.iosfix),
        uS());
    }
  },
  uS = () => {
    const a = Gt();
    if (!a) return;
    let l;
    ((a.ontouchstart = (r) => {
      l = sS(r);
    }),
      (a.ontouchmove = (r) => {
        l && (r.preventDefault(), r.stopPropagation());
      }));
  },
  sS = (a) => {
    const l = a.target,
      r = Gt(),
      u = Yf();
    return !r || !u || cS(a) || fS(a)
      ? !1
      : l === r ||
          (!Ef(r) &&
            l instanceof HTMLElement &&
            !s1(l, u) &&
            l.tagName !== "INPUT" &&
            l.tagName !== "TEXTAREA" &&
            !(Ef(u) && u.contains(l)));
  },
  cS = (a) =>
    !!(a.touches && a.touches.length && a.touches[0].touchType === "stylus"),
  fS = (a) => a.touches && a.touches.length > 1,
  dS = () => {
    if (hn(document.body, B.iosfix)) {
      const a = parseInt(document.body.style.top, 10);
      (Ca(document.body, B.iosfix),
        (document.body.style.top = ""),
        (document.body.scrollTop = a * -1));
    }
  },
  hS = () => {
    const a = document.createElement("div");
    ((a.className = B["scrollbar-measure"]), document.body.appendChild(a));
    const l = a.getBoundingClientRect().width - a.clientWidth;
    return (document.body.removeChild(a), l);
  };
let pi = null;
const mS = (a) => {
    pi === null &&
      (document.body.scrollHeight > window.innerHeight || a === "scroll") &&
      ((pi = parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue("padding-right"),
      )),
      (document.body.style.paddingRight = `${pi + hS()}px`));
  },
  gS = () => {
    pi !== null &&
      ((document.body.style.paddingRight = `${pi}px`), (pi = null));
  };
function tv(a, l, r, u) {
  (ku() ? zp(a, u) : (Ix(r).then(() => zp(a, u)), Py(ue)),
    ev
      ? (l.setAttribute("style", "display:none !important"),
        l.removeAttribute("class"),
        (l.innerHTML = ""))
      : l.remove(),
    Qf() && (gS(), dS(), Iy()),
    pS());
}
function pS() {
  Ca(
    [document.documentElement, document.body],
    [B.shown, B["height-auto"], B["no-backdrop"], B["toast-shown"]],
  );
}
function $n(a) {
  a = vS(a);
  const l = yi.swalPromiseResolve.get(this),
    r = yS(this);
  this.isAwaitingPromise ? a.isDismissed || (Xr(this), l(a)) : r && l(a);
}
const yS = (a) => {
  const l = Qe();
  if (!l) return !1;
  const r = Ge.innerParams.get(a);
  if (!r || hn(l, r.hideClass.popup)) return !1;
  (Ca(l, r.showClass.popup), Xe(l, r.hideClass.popup));
  const u = Gt();
  return (
    Ca(u, r.showClass.backdrop),
    Xe(u, r.hideClass.backdrop),
    bS(a, l, r),
    !0
  );
};
function av(a) {
  const l = yi.swalPromiseReject.get(this);
  (Xr(this), l && l(a));
}
const Xr = (a) => {
    a.isAwaitingPromise &&
      (delete a.isAwaitingPromise, Ge.innerParams.get(a) || a._destroy());
  },
  vS = (a) =>
    typeof a > "u"
      ? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
      : Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, a),
  bS = (a, l, r) => {
    var u;
    const c = Gt(),
      f = Yy(l);
    (typeof r.willClose == "function" && r.willClose(l),
      (u = ue.eventEmitter) === null || u === void 0 || u.emit("willClose", l),
      f && c
        ? wS(a, l, c, !!r.returnFocus, r.didClose)
        : c && tv(a, c, !!r.returnFocus, r.didClose));
  },
  wS = (a, l, r, u, c) => {
    ue.swalCloseEventFinishedCallback = tv.bind(null, a, r, u, c);
    const f = function (h) {
      if (h.target === l) {
        var g;
        ((g = ue.swalCloseEventFinishedCallback) === null ||
          g === void 0 ||
          g.call(ue),
          delete ue.swalCloseEventFinishedCallback,
          l.removeEventListener("animationend", f),
          l.removeEventListener("transitionend", f));
      }
    };
    (l.addEventListener("animationend", f),
      l.addEventListener("transitionend", f));
  },
  zp = (a, l) => {
    setTimeout(() => {
      var r;
      (typeof l == "function" && l.bind(a.params)(),
        (r = ue.eventEmitter) === null || r === void 0 || r.emit("didClose"),
        a._destroy && a._destroy());
    });
  },
  vi = (a) => {
    let l = Qe();
    if ((l || new Ru(), (l = Qe()), !l)) return;
    const r = Ei();
    (ku() ? kt(xi()) : xS(l, a),
      Dt(r),
      l.setAttribute("data-loading", "true"),
      l.setAttribute("aria-busy", "true"),
      l.focus());
  },
  xS = (a, l) => {
    const r = qr(),
      u = Ei();
    !r ||
      !u ||
      (!l && Wt(Xa()) && (l = Xa()),
      Dt(r),
      l &&
        (kt(l),
        u.setAttribute("data-button-to-replace", l.className),
        r.insertBefore(u, l)),
      Xe([a, r], B.loading));
  },
  SS = (a, l) => {
    l.input === "select" || l.input === "radio"
      ? jS(a, l)
      : ["text", "email", "number", "tel", "textarea"].some(
          (r) => r === l.input,
        ) &&
        (kf(l.inputValue) || qf(l.inputValue)) &&
        (vi(Xa()), MS(a, l));
  },
  ES = (a, l) => {
    const r = a.getInput();
    if (!r) return null;
    switch (l.input) {
      case "checkbox":
        return CS(r);
      case "radio":
        return TS(r);
      case "file":
        return AS(r);
      default:
        return l.inputAutoTrim ? r.value.trim() : r.value;
    }
  },
  CS = (a) => (a.checked ? 1 : 0),
  TS = (a) => (a.checked ? a.value : null),
  AS = (a) =>
    a.files && a.files.length
      ? a.getAttribute("multiple") !== null
        ? a.files
        : a.files[0]
      : null,
  jS = (a, l) => {
    const r = Qe();
    if (!r) return;
    const u = (c) => {
      l.input === "select"
        ? RS(r, Tu(c), l)
        : l.input === "radio" && DS(r, Tu(c), l);
    };
    kf(l.inputOptions) || qf(l.inputOptions)
      ? (vi(Xa()),
        Hr(l.inputOptions).then((c) => {
          (a.hideLoading(), u(c));
        }))
      : typeof l.inputOptions == "object"
        ? u(l.inputOptions)
        : Cl(
            `Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof l.inputOptions}`,
          );
  },
  MS = (a, l) => {
    const r = a.getInput();
    r &&
      (kt(r),
      Hr(l.inputValue)
        .then((u) => {
          ((r.value = l.input === "number" ? `${parseFloat(u) || 0}` : `${u}`),
            Dt(r),
            r.focus(),
            a.hideLoading());
        })
        .catch((u) => {
          (Cl(`Error in inputValue promise: ${u}`),
            (r.value = ""),
            Dt(r),
            r.focus(),
            a.hideLoading());
        }));
  };
function RS(a, l, r) {
  const u = Zn(a, B.select);
  if (!u) return;
  const c = (f, h, g) => {
    const y = document.createElement("option");
    ((y.value = g),
      fa(y, h),
      (y.selected = nv(g, r.inputValue)),
      f.appendChild(y));
  };
  (l.forEach((f) => {
    const h = f[0],
      g = f[1];
    if (Array.isArray(g)) {
      const y = document.createElement("optgroup");
      ((y.label = h),
        (y.disabled = !1),
        u.appendChild(y),
        g.forEach((m) => c(y, m[1], m[0])));
    } else c(u, g, h);
  }),
    u.focus());
}
function DS(a, l, r) {
  const u = Zn(a, B.radio);
  if (!u) return;
  l.forEach((f) => {
    const h = f[0],
      g = f[1],
      y = document.createElement("input"),
      m = document.createElement("label");
    ((y.type = "radio"),
      (y.name = B.radio),
      (y.value = h),
      nv(h, r.inputValue) && (y.checked = !0));
    const w = document.createElement("span");
    (fa(w, g),
      (w.className = B.label),
      m.appendChild(y),
      m.appendChild(w),
      u.appendChild(m));
  });
  const c = u.querySelectorAll("input");
  c.length && c[0].focus();
}
const Tu = (a) => {
    const l = [];
    return (
      a instanceof Map
        ? a.forEach((r, u) => {
            let c = r;
            (typeof c == "object" && (c = Tu(c)), l.push([u, c]));
          })
        : Object.keys(a).forEach((r) => {
            let u = a[r];
            (typeof u == "object" && (u = Tu(u)), l.push([r, u]));
          }),
      l
    );
  },
  nv = (a, l) =>
    !!l && l !== null && l !== void 0 && l.toString() === a.toString(),
  zS = (a) => {
    const l = Ge.innerParams.get(a);
    (a.disableButtons(), l.input ? lv(a, "confirm") : Wf(a, !0));
  },
  OS = (a) => {
    const l = Ge.innerParams.get(a);
    (a.disableButtons(), l.returnInputValueOnDeny ? lv(a, "deny") : Pf(a, !1));
  },
  NS = (a, l) => {
    (a.disableButtons(), l(Ci.cancel));
  },
  lv = (a, l) => {
    const r = Ge.innerParams.get(a);
    if (!r.input) {
      Cl(
        `The "input" parameter is needed to be set when using returnInputValueOn${Hf(l)}`,
      );
      return;
    }
    const u = a.getInput(),
      c = ES(a, r);
    r.inputValidator
      ? _S(a, c, l)
      : u && !u.checkValidity()
        ? (a.enableButtons(),
          a.showValidationMessage(r.validationMessage || u.validationMessage))
        : l === "deny"
          ? Pf(a, c)
          : Wf(a, c);
  },
  _S = (a, l, r) => {
    const u = Ge.innerParams.get(a);
    (a.disableInput(),
      Promise.resolve()
        .then(() => Hr(u.inputValidator(l, u.validationMessage)))
        .then((f) => {
          (a.enableButtons(),
            a.enableInput(),
            f
              ? a.showValidationMessage(f)
              : r === "deny"
                ? Pf(a, l)
                : Wf(a, l));
        }));
  },
  Pf = (a, l) => {
    const r = Ge.innerParams.get(a);
    (r.showLoaderOnDeny && vi(Tl()),
      r.preDeny
        ? ((a.isAwaitingPromise = !0),
          Promise.resolve()
            .then(() => Hr(r.preDeny(l, r.validationMessage)))
            .then((c) => {
              c === !1
                ? (a.hideLoading(), Xr(a))
                : a.close({ isDenied: !0, value: typeof c > "u" ? l : c });
            })
            .catch((c) => iv(a, c)))
        : a.close({ isDenied: !0, value: l }));
  },
  Op = (a, l) => {
    a.close({ isConfirmed: !0, value: l });
  },
  iv = (a, l) => {
    a.rejectPromise(l);
  },
  Wf = (a, l) => {
    const r = Ge.innerParams.get(a);
    (r.showLoaderOnConfirm && vi(),
      r.preConfirm
        ? (a.resetValidationMessage(),
          (a.isAwaitingPromise = !0),
          Promise.resolve()
            .then(() => Hr(r.preConfirm(l, r.validationMessage)))
            .then((c) => {
              Wt(Bu()) || c === !1
                ? (a.hideLoading(), Xr(a))
                : Op(a, typeof c > "u" ? l : c);
            })
            .catch((c) => iv(a, c)))
        : Op(a, l));
  };
function Au() {
  const a = Ge.innerParams.get(this);
  if (!a) return;
  const l = Ge.domCache.get(this);
  (kt(l.loader),
    ku() ? a.icon && Dt(xi()) : LS(l),
    Ca([l.popup, l.actions], B.loading),
    l.popup.removeAttribute("aria-busy"),
    l.popup.removeAttribute("data-loading"),
    (l.confirmButton.disabled = !1),
    (l.denyButton.disabled = !1),
    (l.cancelButton.disabled = !1));
  const r = Ge.focusedElement.get(this);
  (r instanceof HTMLElement &&
    document.activeElement === document.body &&
    r.focus(),
    Ge.focusedElement.delete(this));
}
const LS = (a) => {
  const l = a.loader.getAttribute("data-button-to-replace"),
    r = l ? a.popup.getElementsByClassName(l) : [];
  r.length ? Dt(r[0], "inline-block") : u1() && kt(a.actions);
};
function rv() {
  const a = Ge.innerParams.get(this),
    l = Ge.domCache.get(this);
  return l ? qu(l.popup, a.input) : null;
}
function ov(a, l, r) {
  const u = Ge.domCache.get(a);
  l.forEach((c) => {
    u[c].disabled = r;
  });
}
function uv(a, l) {
  const r = Qe();
  if (!(!r || !a))
    if (a.type === "radio") {
      const u = r.querySelectorAll(`[name="${B.radio}"]`);
      for (let c = 0; c < u.length; c++) u[c].disabled = l;
    } else a.disabled = l;
}
function sv() {
  ov(this, ["confirmButton", "denyButton", "cancelButton"], !1);
  const a = Ge.focusedElement.get(this);
  (a instanceof HTMLElement &&
    document.activeElement === document.body &&
    a.focus(),
    Ge.focusedElement.delete(this));
}
function cv() {
  (Ge.focusedElement.set(this, document.activeElement),
    ov(this, ["confirmButton", "denyButton", "cancelButton"], !0));
}
function fv() {
  uv(this.getInput(), !1);
}
function dv() {
  uv(this.getInput(), !0);
}
function hv(a) {
  const l = Ge.domCache.get(this),
    r = Ge.innerParams.get(this);
  (fa(l.validationMessage, a),
    (l.validationMessage.className = B["validation-message"]),
    r.customClass &&
      r.customClass.validationMessage &&
      Xe(l.validationMessage, r.customClass.validationMessage),
    Dt(l.validationMessage));
  const u = this.getInput();
  u &&
    (u.setAttribute("aria-invalid", "true"),
    u.setAttribute("aria-describedby", B["validation-message"]),
    ky(u),
    Xe(u, B.inputerror));
}
function mv() {
  const a = Ge.domCache.get(this);
  a.validationMessage && kt(a.validationMessage);
  const l = this.getInput();
  l &&
    (l.removeAttribute("aria-invalid"),
    l.removeAttribute("aria-describedby"),
    Ca(l, B.inputerror));
}
const Kn = {
    title: "",
    titleText: "",
    text: "",
    html: "",
    footer: "",
    icon: void 0,
    iconColor: void 0,
    iconHtml: void 0,
    template: void 0,
    toast: !1,
    draggable: !1,
    animation: !0,
    theme: "light",
    showClass: {
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      icon: "swal2-icon-show",
    },
    hideClass: {
      popup: "swal2-hide",
      backdrop: "swal2-backdrop-hide",
      icon: "swal2-icon-hide",
    },
    customClass: {},
    target: "body",
    color: void 0,
    backdrop: !0,
    heightAuto: !0,
    allowOutsideClick: !0,
    allowEscapeKey: !0,
    allowEnterKey: !0,
    stopKeydownPropagation: !0,
    keydownListenerCapture: !1,
    showConfirmButton: !0,
    showDenyButton: !1,
    showCancelButton: !1,
    preConfirm: void 0,
    preDeny: void 0,
    confirmButtonText: "OK",
    confirmButtonAriaLabel: "",
    confirmButtonColor: void 0,
    denyButtonText: "No",
    denyButtonAriaLabel: "",
    denyButtonColor: void 0,
    cancelButtonText: "Cancel",
    cancelButtonAriaLabel: "",
    cancelButtonColor: void 0,
    buttonsStyling: !0,
    reverseButtons: !1,
    focusConfirm: !0,
    focusDeny: !1,
    focusCancel: !1,
    returnFocus: !0,
    showCloseButton: !1,
    closeButtonHtml: "&times;",
    closeButtonAriaLabel: "Close this dialog",
    loaderHtml: "",
    showLoaderOnConfirm: !1,
    showLoaderOnDeny: !1,
    imageUrl: void 0,
    imageWidth: void 0,
    imageHeight: void 0,
    imageAlt: "",
    timer: void 0,
    timerProgressBar: !1,
    width: void 0,
    padding: void 0,
    background: void 0,
    input: void 0,
    inputPlaceholder: "",
    inputLabel: "",
    inputValue: "",
    inputOptions: {},
    inputAutoFocus: !0,
    inputAutoTrim: !0,
    inputAttributes: {},
    inputValidator: void 0,
    returnInputValueOnDeny: !1,
    validationMessage: void 0,
    grow: !1,
    position: "center",
    progressSteps: [],
    currentProgressStep: void 0,
    progressStepsDistance: void 0,
    willOpen: void 0,
    didOpen: void 0,
    didRender: void 0,
    willClose: void 0,
    didClose: void 0,
    didDestroy: void 0,
    scrollbarPadding: !0,
    topLayer: !1,
  },
  US = [
    "allowEscapeKey",
    "allowOutsideClick",
    "background",
    "buttonsStyling",
    "cancelButtonAriaLabel",
    "cancelButtonColor",
    "cancelButtonText",
    "closeButtonAriaLabel",
    "closeButtonHtml",
    "color",
    "confirmButtonAriaLabel",
    "confirmButtonColor",
    "confirmButtonText",
    "currentProgressStep",
    "customClass",
    "denyButtonAriaLabel",
    "denyButtonColor",
    "denyButtonText",
    "didClose",
    "didDestroy",
    "draggable",
    "footer",
    "hideClass",
    "html",
    "icon",
    "iconColor",
    "iconHtml",
    "imageAlt",
    "imageHeight",
    "imageUrl",
    "imageWidth",
    "preConfirm",
    "preDeny",
    "progressSteps",
    "returnFocus",
    "reverseButtons",
    "showCancelButton",
    "showCloseButton",
    "showConfirmButton",
    "showDenyButton",
    "text",
    "title",
    "titleText",
    "theme",
    "willClose",
  ],
  BS = { allowEnterKey: void 0 },
  HS = [
    "allowOutsideClick",
    "allowEnterKey",
    "backdrop",
    "draggable",
    "focusConfirm",
    "focusDeny",
    "focusCancel",
    "returnFocus",
    "heightAuto",
    "keydownListenerCapture",
  ],
  gv = (a) => Object.prototype.hasOwnProperty.call(Kn, a),
  pv = (a) => US.indexOf(a) !== -1,
  yv = (a) => BS[a],
  kS = (a) => {
    gv(a) || Xt(`Unknown parameter "${a}"`);
  },
  qS = (a) => {
    HS.includes(a) && Xt(`The parameter "${a}" is incompatible with toasts`);
  },
  YS = (a) => {
    const l = yv(a);
    l && Ly(a, l);
  },
  vv = (a) => {
    (a.backdrop === !1 &&
      a.allowOutsideClick &&
      Xt(
        '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`',
      ),
      a.theme &&
        ![
          "light",
          "dark",
          "auto",
          "minimal",
          "borderless",
          "bootstrap-4",
          "bootstrap-4-light",
          "bootstrap-4-dark",
          "bootstrap-5",
          "bootstrap-5-light",
          "bootstrap-5-dark",
          "material-ui",
          "material-ui-light",
          "material-ui-dark",
          "embed-iframe",
          "bulma",
          "bulma-light",
          "bulma-dark",
        ].includes(a.theme) &&
        Xt(`Invalid theme "${a.theme}"`));
    for (const l in a) (kS(l), a.toast && qS(l), YS(l));
  };
function bv(a) {
  const l = Gt(),
    r = Qe(),
    u = Ge.innerParams.get(this);
  if (!r || hn(r, u.hideClass.popup)) {
    Xt(
      "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.",
    );
    return;
  }
  const c = VS(a),
    f = Object.assign({}, u, c);
  (vv(f),
    l && (l.dataset.swal2Theme = f.theme),
    Jy(this, f),
    Ge.innerParams.set(this, f),
    Object.defineProperties(this, {
      params: {
        value: Object.assign({}, this.params, a),
        writable: !1,
        enumerable: !0,
      },
    }));
}
const VS = (a) => {
  const l = {};
  return (
    Object.keys(a).forEach((r) => {
      if (pv(r)) {
        const u = a;
        l[r] = u[r];
      } else Xt(`Invalid parameter to update: ${r}`);
    }),
    l
  );
};
function wv() {
  var a;
  const l = Ge.domCache.get(this),
    r = Ge.innerParams.get(this);
  if (!r) {
    xv(this);
    return;
  }
  (l.popup &&
    ue.swalCloseEventFinishedCallback &&
    (ue.swalCloseEventFinishedCallback(),
    delete ue.swalCloseEventFinishedCallback),
    typeof r.didDestroy == "function" && r.didDestroy(),
    (a = ue.eventEmitter) === null || a === void 0 || a.emit("didDestroy"),
    XS(this));
}
const XS = (a) => {
    (xv(a),
      delete a.params,
      delete ue.keydownHandler,
      delete ue.keydownTarget,
      delete ue.currentInstance);
  },
  xv = (a) => {
    a.isAwaitingPromise
      ? (pf(Ge, a), (a.isAwaitingPromise = !0))
      : (pf(yi, a),
        pf(Ge, a),
        delete a.isAwaitingPromise,
        delete a.disableButtons,
        delete a.enableButtons,
        delete a.getInput,
        delete a.disableInput,
        delete a.enableInput,
        delete a.hideLoading,
        delete a.disableLoading,
        delete a.showValidationMessage,
        delete a.resetValidationMessage,
        delete a.close,
        delete a.closePopup,
        delete a.closeModal,
        delete a.closeToast,
        delete a.rejectPromise,
        delete a.update,
        delete a._destroy);
  },
  pf = (a, l) => {
    for (const r in a) a[r].delete(l);
  };
var GS = Object.freeze({
  __proto__: null,
  _destroy: wv,
  close: $n,
  closeModal: $n,
  closePopup: $n,
  closeToast: $n,
  disableButtons: cv,
  disableInput: dv,
  disableLoading: Au,
  enableButtons: sv,
  enableInput: fv,
  getInput: rv,
  handleAwaitingPromise: Xr,
  hideLoading: Au,
  rejectPromise: av,
  resetValidationMessage: mv,
  showValidationMessage: hv,
  update: bv,
});
const QS = (a, l, r) => {
    a.toast ? ZS(a, l, r) : (KS(l), JS(l), FS(a, l, r));
  },
  ZS = (a, l, r) => {
    l.popup.onclick = () => {
      (a && ($S(a) || a.timer || a.input)) || r(Ci.close);
    };
  },
  $S = (a) =>
    !!(
      a.showConfirmButton ||
      a.showDenyButton ||
      a.showCancelButton ||
      a.showCloseButton
    );
let ju = !1;
const KS = (a) => {
    a.popup.onmousedown = () => {
      a.container.onmouseup = function (l) {
        ((a.container.onmouseup = () => {}),
          l.target === a.container && (ju = !0));
      };
    };
  },
  JS = (a) => {
    a.container.onmousedown = (l) => {
      (l.target === a.container && l.preventDefault(),
        (a.popup.onmouseup = function (r) {
          ((a.popup.onmouseup = () => {}),
            (r.target === a.popup ||
              (r.target instanceof HTMLElement &&
                a.popup.contains(r.target))) &&
              (ju = !0));
        }));
    };
  },
  FS = (a, l, r) => {
    l.container.onclick = (u) => {
      if (ju) {
        ju = !1;
        return;
      }
      u.target === l.container && Uu(a.allowOutsideClick) && r(Ci.backdrop);
    };
  },
  PS = (a) => typeof a == "object" && a !== null && "jquery" in a,
  Np = (a) => a instanceof Element || PS(a),
  WS = (a) => {
    const l = {};
    return (
      typeof a[0] == "object" && !Np(a[0])
        ? Object.assign(l, a[0])
        : ["title", "html", "icon"].forEach((r, u) => {
            const c = a[u];
            typeof c == "string" || Np(c)
              ? (l[r] = c)
              : c !== void 0 &&
                Cl(
                  `Unexpected type of ${r}! Expected "string" or "Element", got ${typeof c}`,
                );
          }),
      l
    );
  };
function IS(...a) {
  return new this(...a);
}
function eE(a) {
  class l extends this {
    _main(u, c) {
      return super._main(u, Object.assign({}, a, c));
    }
  }
  return l;
}
const tE = () => ue.timeout && ue.timeout.getTimerLeft(),
  Sv = () => {
    if (ue.timeout) return (c1(), ue.timeout.stop());
  },
  Ev = () => {
    if (ue.timeout) {
      const a = ue.timeout.start();
      return ($f(a), a);
    }
  },
  aE = () => {
    const a = ue.timeout;
    return a && (a.running ? Sv() : Ev());
  },
  nE = (a) => {
    if (ue.timeout) {
      const l = ue.timeout.increase(a);
      return ($f(l, !0), l);
    }
  },
  lE = () => !!(ue.timeout && ue.timeout.isRunning());
let _p = !1;
const Tf = {};
function iE(a = "data-swal-template") {
  ((Tf[a] = this),
    _p || (document.body.addEventListener("click", rE), (_p = !0)));
}
const rE = (a) => {
  for (let l = a.target; l && l !== document; l = l.parentNode)
    for (const r in Tf) {
      const u = l.getAttribute && l.getAttribute(r);
      if (u) {
        Tf[r].fire({ template: u });
        return;
      }
    }
};
class oE {
  constructor() {
    this.events = {};
  }
  _getHandlersByEventName(l) {
    return (
      typeof this.events[l] > "u" && (this.events[l] = []),
      this.events[l]
    );
  }
  on(l, r) {
    const u = this._getHandlersByEventName(l);
    u.includes(r) || u.push(r);
  }
  once(l, r) {
    const u = (...c) => {
      (this.removeListener(l, u), r.apply(this, c));
    };
    this.on(l, u);
  }
  emit(l, ...r) {
    this._getHandlersByEventName(l).forEach((u) => {
      try {
        u.apply(this, r);
      } catch (c) {
        console.error(c);
      }
    });
  }
  removeListener(l, r) {
    const u = this._getHandlersByEventName(l),
      c = u.indexOf(r);
    c > -1 && u.splice(c, 1);
  }
  removeAllListeners(l) {
    this.events[l] !== void 0 && (this.events[l].length = 0);
  }
  reset() {
    this.events = {};
  }
}
ue.eventEmitter = new oE();
const uE = (a, l) => {
    ue.eventEmitter && ue.eventEmitter.on(a, l);
  },
  sE = (a, l) => {
    ue.eventEmitter && ue.eventEmitter.once(a, l);
  },
  cE = (a, l) => {
    if (ue.eventEmitter) {
      if (!a) {
        ue.eventEmitter.reset();
        return;
      }
      l
        ? ue.eventEmitter.removeListener(a, l)
        : ue.eventEmitter.removeAllListeners(a);
    }
  };
var fE = Object.freeze({
  __proto__: null,
  argsToParams: WS,
  bindClickHandler: iE,
  clickCancel: W1,
  clickConfirm: Fy,
  clickDeny: P1,
  enableLoading: vi,
  fire: IS,
  getActions: qr,
  getCancelButton: Si,
  getCloseButton: Xf,
  getConfirmButton: Xa,
  getContainer: Gt,
  getDenyButton: Tl,
  getFocusableElements: Gf,
  getFooter: Hy,
  getHtmlContainer: Yf,
  getIcon: xi,
  getIconContent: n1,
  getImage: By,
  getInputLabel: l1,
  getLoader: Ei,
  getPopup: Qe,
  getProgressSteps: Vf,
  getTimerLeft: tE,
  getTimerProgressBar: Hu,
  getTitle: Uy,
  getValidationMessage: Bu,
  increaseTimer: nE,
  isDeprecatedParameter: yv,
  isLoading: r1,
  isTimerRunning: lE,
  isUpdatableParameter: pv,
  isValidParameter: gv,
  isVisible: F1,
  mixin: eE,
  off: cE,
  on: uE,
  once: sE,
  resumeTimer: Ev,
  showLoading: vi,
  stopTimer: Sv,
  toggleTimer: aE,
});
class dE {
  constructor(l, r) {
    ((this.callback = l),
      (this.remaining = r),
      (this.running = !1),
      this.start());
  }
  start() {
    return (
      this.running ||
        ((this.running = !0),
        (this.started = new Date()),
        (this.id = setTimeout(this.callback, this.remaining))),
      this.remaining
    );
  }
  stop() {
    return (
      this.started &&
        this.running &&
        ((this.running = !1),
        clearTimeout(this.id),
        (this.remaining -= new Date().getTime() - this.started.getTime())),
      this.remaining
    );
  }
  increase(l) {
    const r = this.running;
    return (
      r && this.stop(),
      (this.remaining += l),
      r && this.start(),
      this.remaining
    );
  }
  getTimerLeft() {
    return (this.running && (this.stop(), this.start()), this.remaining);
  }
  isRunning() {
    return this.running;
  }
}
const Cv = ["swal-title", "swal-html", "swal-footer"],
  hE = (a) => {
    const l =
      typeof a.template == "string"
        ? document.querySelector(a.template)
        : a.template;
    if (!l) return {};
    const r = l.content;
    return (
      xE(r),
      Object.assign(mE(r), gE(r), pE(r), yE(r), vE(r), bE(r), wE(r, Cv))
    );
  },
  mE = (a) => {
    const l = {};
    return (
      Array.from(a.querySelectorAll("swal-param")).forEach((u) => {
        wl(u, ["name", "value"]);
        const c = u.getAttribute("name"),
          f = u.getAttribute("value");
        !c ||
          !f ||
          (c in Kn && typeof Kn[c] == "boolean"
            ? (l[c] = f !== "false")
            : c in Kn && typeof Kn[c] == "object"
              ? (l[c] = JSON.parse(f))
              : (l[c] = f));
      }),
      l
    );
  },
  gE = (a) => {
    const l = {};
    return (
      Array.from(a.querySelectorAll("swal-function-param")).forEach((u) => {
        const c = u.getAttribute("name"),
          f = u.getAttribute("value");
        !c || !f || (l[c] = new Function(`return ${f}`)());
      }),
      l
    );
  },
  pE = (a) => {
    const l = {};
    return (
      Array.from(a.querySelectorAll("swal-button")).forEach((u) => {
        wl(u, ["type", "color", "aria-label"]);
        const c = u.getAttribute("type");
        if (!(!c || !["confirm", "cancel", "deny"].includes(c))) {
          if (
            ((l[`${c}ButtonText`] = u.innerHTML),
            (l[`show${Hf(c)}Button`] = !0),
            u.hasAttribute("color"))
          ) {
            const f = u.getAttribute("color");
            f !== null && (l[`${c}ButtonColor`] = f);
          }
          if (u.hasAttribute("aria-label")) {
            const f = u.getAttribute("aria-label");
            f !== null && (l[`${c}ButtonAriaLabel`] = f);
          }
        }
      }),
      l
    );
  },
  yE = (a) => {
    const l = {},
      r = a.querySelector("swal-image");
    return (
      r &&
        (wl(r, ["src", "width", "height", "alt"]),
        r.hasAttribute("src") && (l.imageUrl = r.getAttribute("src") || void 0),
        r.hasAttribute("width") &&
          (l.imageWidth = r.getAttribute("width") || void 0),
        r.hasAttribute("height") &&
          (l.imageHeight = r.getAttribute("height") || void 0),
        r.hasAttribute("alt") &&
          (l.imageAlt = r.getAttribute("alt") || void 0)),
      l
    );
  },
  vE = (a) => {
    const l = {},
      r = a.querySelector("swal-icon");
    return (
      r &&
        (wl(r, ["type", "color"]),
        r.hasAttribute("type") && (l.icon = r.getAttribute("type")),
        r.hasAttribute("color") && (l.iconColor = r.getAttribute("color")),
        (l.iconHtml = r.innerHTML)),
      l
    );
  },
  bE = (a) => {
    const l = {},
      r = a.querySelector("swal-input");
    r &&
      (wl(r, ["type", "label", "placeholder", "value"]),
      (l.input = r.getAttribute("type") || "text"),
      r.hasAttribute("label") && (l.inputLabel = r.getAttribute("label")),
      r.hasAttribute("placeholder") &&
        (l.inputPlaceholder = r.getAttribute("placeholder")),
      r.hasAttribute("value") && (l.inputValue = r.getAttribute("value")));
    const u = Array.from(a.querySelectorAll("swal-input-option"));
    return (
      u.length &&
        ((l.inputOptions = {}),
        u.forEach((c) => {
          wl(c, ["value"]);
          const f = c.getAttribute("value");
          if (!f) return;
          const h = c.innerHTML;
          l.inputOptions[f] = h;
        })),
      l
    );
  },
  wE = (a, l) => {
    const r = {};
    for (const u in l) {
      const c = l[u],
        f = a.querySelector(c);
      f && (wl(f, []), (r[c.replace(/^swal-/, "")] = f.innerHTML.trim()));
    }
    return r;
  },
  xE = (a) => {
    const l = Cv.concat([
      "swal-param",
      "swal-function-param",
      "swal-button",
      "swal-image",
      "swal-icon",
      "swal-input",
      "swal-input-option",
    ]);
    Array.from(a.children).forEach((r) => {
      const u = r.tagName.toLowerCase();
      l.includes(u) || Xt(`Unrecognized element <${u}>`);
    });
  },
  wl = (a, l) => {
    Array.from(a.attributes).forEach((r) => {
      l.indexOf(r.name) === -1 &&
        Xt([
          `Unrecognized attribute "${r.name}" on <${a.tagName.toLowerCase()}>.`,
          `${l.length ? `Allowed attributes are: ${l.join(", ")}` : "To set the value, use HTML within the element."}`,
        ]);
    });
  },
  Tv = 10,
  SE = (a) => {
    var l, r;
    const u = Gt(),
      c = Qe();
    if (!u || !c) return;
    (typeof a.willOpen == "function" && a.willOpen(c),
      (l = ue.eventEmitter) === null || l === void 0 || l.emit("willOpen", c));
    const h = window.getComputedStyle(document.body).overflowY;
    if (
      (TE(u, c, a),
      setTimeout(() => {
        EE(u, c);
      }, Tv),
      Qf() &&
        (CE(u, a.scrollbarPadding !== void 0 ? a.scrollbarPadding : !1, h),
        rS()),
      !ku() &&
        !ue.previousActiveElement &&
        (ue.previousActiveElement = document.activeElement),
      typeof a.didOpen == "function")
    ) {
      const g = a.didOpen;
      setTimeout(() => g(c));
    }
    (r = ue.eventEmitter) === null || r === void 0 || r.emit("didOpen", c);
  },
  Mu = (a) => {
    const l = Qe();
    if (!l || a.target !== l) return;
    const r = Gt();
    r &&
      (l.removeEventListener("animationend", Mu),
      l.removeEventListener("transitionend", Mu),
      (r.style.overflowY = "auto"),
      Ca(r, B["no-transition"]));
  },
  EE = (a, l) => {
    Yy(l)
      ? ((a.style.overflowY = "hidden"),
        l.addEventListener("animationend", Mu),
        l.addEventListener("transitionend", Mu))
      : (a.style.overflowY = "auto");
  },
  CE = (a, l, r) => {
    (oS(),
      l && r !== "hidden" && mS(r),
      setTimeout(() => {
        a.scrollTop = 0;
      }));
  },
  TE = (a, l, r) => {
    var u;
    ((u = r.showClass) !== null &&
      u !== void 0 &&
      u.backdrop &&
      Xe(a, r.showClass.backdrop),
      r.animation
        ? (l.style.setProperty("opacity", "0", "important"),
          Dt(l, "grid"),
          setTimeout(() => {
            var c;
            ((c = r.showClass) !== null &&
              c !== void 0 &&
              c.popup &&
              Xe(l, r.showClass.popup),
              l.style.removeProperty("opacity"));
          }, Tv))
        : Dt(l, "grid"),
      Xe([document.documentElement, document.body], B.shown),
      r.heightAuto &&
        r.backdrop &&
        !r.toast &&
        Xe([document.documentElement, document.body], B["height-auto"]));
  };
var Lp = {
  email: (a, l) =>
    /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(a)
      ? Promise.resolve()
      : Promise.resolve(l || "Invalid email address"),
  url: (a, l) =>
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
      a,
    )
      ? Promise.resolve()
      : Promise.resolve(l || "Invalid URL"),
};
function AE(a) {
  a.inputValidator ||
    (a.input === "email" && (a.inputValidator = Lp.email),
    a.input === "url" && (a.inputValidator = Lp.url));
}
function jE(a) {
  (!a.target ||
    (typeof a.target == "string" && !document.querySelector(a.target)) ||
    (typeof a.target != "string" && !a.target.appendChild)) &&
    (Xt('Target parameter is not valid, defaulting to "body"'),
    (a.target = "body"));
}
function ME(a) {
  (AE(a),
    a.showLoaderOnConfirm &&
      !a.preConfirm &&
      Xt(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`),
    jE(a),
    typeof a.title == "string" &&
      (a.title = a.title
        .split(
          `
`,
        )
        .join("<br />")),
    v1(a));
}
let Ya;
var du = new WeakMap();
class yt {
  constructor(...l) {
    if (
      (Jx(
        this,
        du,
        Promise.resolve({ isConfirmed: !1, isDenied: !1, isDismissed: !0 }),
      ),
      typeof window > "u")
    )
      return;
    Ya = this;
    const r = Object.freeze(this.constructor.argsToParams(l));
    ((this.params = r),
      (this.isAwaitingPromise = !1),
      Fx(du, this, this._main(Ya.params)));
  }
  _main(l, r = {}) {
    if ((vv(Object.assign({}, r, l)), ue.currentInstance)) {
      const f = yi.swalPromiseResolve.get(ue.currentInstance),
        { isAwaitingPromise: h } = ue.currentInstance;
      (ue.currentInstance._destroy(),
        h || f({ isDismissed: !0 }),
        Qf() && Iy());
    }
    ue.currentInstance = Ya;
    const u = DE(l, r);
    (ME(u),
      Object.freeze(u),
      ue.timeout && (ue.timeout.stop(), delete ue.timeout),
      clearTimeout(ue.restoreFocusTimeout));
    const c = zE(Ya);
    return (Jy(Ya, u), Ge.innerParams.set(Ya, u), RE(Ya, c, u));
  }
  then(l) {
    return Tp(du, this).then(l);
  }
  finally(l) {
    return Tp(du, this).finally(l);
  }
}
const RE = (a, l, r) =>
    new Promise((u, c) => {
      const f = (h) => {
        a.close({ isDismissed: !0, dismiss: h, isConfirmed: !1, isDenied: !1 });
      };
      (yi.swalPromiseResolve.set(a, u),
        yi.swalPromiseReject.set(a, c),
        (l.confirmButton.onclick = () => {
          zS(a);
        }),
        (l.denyButton.onclick = () => {
          OS(a);
        }),
        (l.cancelButton.onclick = () => {
          NS(a, f);
        }),
        (l.closeButton.onclick = () => {
          f(Ci.close);
        }),
        QS(r, l, f),
        I1(ue, r, f),
        SS(a, r),
        SE(r),
        OE(ue, r, f),
        NE(l, r),
        setTimeout(() => {
          l.container.scrollTop = 0;
        }));
    }),
  DE = (a, l) => {
    const r = hE(a),
      u = Object.assign({}, Kn, l, r, a);
    return (
      (u.showClass = Object.assign({}, Kn.showClass, u.showClass)),
      (u.hideClass = Object.assign({}, Kn.hideClass, u.hideClass)),
      u.animation === !1 &&
        ((u.showClass = { backdrop: "swal2-noanimation" }), (u.hideClass = {})),
      u
    );
  },
  zE = (a) => {
    const l = {
      popup: Qe(),
      container: Gt(),
      actions: qr(),
      confirmButton: Xa(),
      denyButton: Tl(),
      cancelButton: Si(),
      loader: Ei(),
      closeButton: Xf(),
      validationMessage: Bu(),
      progressSteps: Vf(),
    };
    return (Ge.domCache.set(a, l), l);
  },
  OE = (a, l, r) => {
    const u = Hu();
    (kt(u),
      l.timer &&
        ((a.timeout = new dE(() => {
          (r("timer"), delete a.timeout);
        }, l.timer)),
        l.timerProgressBar &&
          u &&
          (Dt(u),
          oa(u, l, "timerProgressBar"),
          setTimeout(() => {
            a.timeout && a.timeout.running && $f(l.timer);
          }))));
  },
  NE = (a, l) => {
    if (!l.toast) {
      if (!Uu(l.allowEnterKey)) {
        (Ly("allowEnterKey", "preConfirm: () => false"), a.popup.focus());
        return;
      }
      _E(a) || LE(a, l) || Cf(-1, 1);
    }
  },
  _E = (a) => {
    const l = Array.from(a.popup.querySelectorAll("[autofocus]"));
    for (const r of l)
      if (r instanceof HTMLElement && Wt(r)) return (r.focus(), !0);
    return !1;
  },
  LE = (a, l) =>
    l.focusDeny && Wt(a.denyButton)
      ? (a.denyButton.focus(), !0)
      : l.focusCancel && Wt(a.cancelButton)
        ? (a.cancelButton.focus(), !0)
        : l.focusConfirm && Wt(a.confirmButton)
          ? (a.confirmButton.focus(), !0)
          : !1;
yt.prototype.disableButtons = cv;
yt.prototype.enableButtons = sv;
yt.prototype.getInput = rv;
yt.prototype.disableInput = dv;
yt.prototype.enableInput = fv;
yt.prototype.hideLoading = Au;
yt.prototype.disableLoading = Au;
yt.prototype.showValidationMessage = hv;
yt.prototype.resetValidationMessage = mv;
yt.prototype.close = $n;
yt.prototype.closePopup = $n;
yt.prototype.closeModal = $n;
yt.prototype.closeToast = $n;
yt.prototype.rejectPromise = av;
yt.prototype.update = bv;
yt.prototype._destroy = wv;
Object.assign(yt, fE);
Object.keys(GS).forEach((a) => {
  yt[a] = function (...l) {
    if (Ya && Ya[a]) return Ya[a](...l);
  };
});
yt.DismissReason = Ci;
yt.version = "11.26.21";
const Ru = yt;
Ru.default = Ru;
typeof document < "u" &&
  (function (a, l) {
    var r = a.createElement("style");
    if ((a.getElementsByTagName("head")[0].appendChild(r), r.styleSheet))
      r.styleSheet.disabled || (r.styleSheet.cssText = l);
    else
      try {
        r.innerHTML = l;
      } catch {
        r.innerText = l;
      }
  })(
    document,
    ':root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-icon-animations: true;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem;container-name:swal2-popup}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:all}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}@container swal2-popup style(--swal2-icon-animations:true){.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}',
  );
function Yu() {
  const { theme: a } = ot();
  return {
    fire(l) {
      Ru.fire({ ...l, theme: a });
    },
    success(l, r) {
      this.fire({ icon: "success", title: l, text: r, theme: a });
    },
    error(l, r) {
      this.fire({ icon: "error", title: l, text: r, theme: a });
    },
  };
}
const UE = (a) => {
    const [l, r] = E.useState({}),
      [u, c] = E.useState(!1),
      { login: f } = Lr(),
      { params: h } = El(),
      g = Sl(),
      y = Yu(),
      m = (b) => {
        const { name: M, value: U } = b.target;
        r((V) => ({ ...V, [M]: U }));
      },
      w = async (b) => {
        (b.preventDefault(), c(!0));
        try {
          const M = await f(l.username, l.password);
          if (M.error)
            return M.type === "database"
              ? (window.location.href = "/web/login")
              : y.error("Error", M.message ?? "Ocurrio un error");
        } finally {
          c(!1);
        }
      };
    return (
      E.useEffect(() => {
        a.isLogging?.(u);
      }, [u]),
      E.useEffect(() => {
        h.isLogged && g("/");
      }, [h.isLogged]),
      v.jsxs("form", {
        onSubmit: w,
        className: "w-full",
        children: [
          v.jsx(bu, {
            label: "Usuario",
            icon: "fa fa-user",
            variant: "material",
            containerClassName: "mt-4 w-full",
            className: "text-[12px]",
            autoComplete: "off",
            name: "username",
            value: l.username ?? "",
            onChange: m,
            required: !0,
            disabled: u,
          }),
          v.jsx(bu, {
            label: "Contraseña",
            icon: "fa fa-key",
            type: "password",
            variant: "material",
            containerClassName: "mt-4 w-full",
            className: "text-[12px]",
            autoComplete: "off",
            name: "password",
            value: l.password ?? "",
            onChange: m,
            required: !0,
            disabled: u,
          }),
          v.jsx(Jn, {
            variant: "primary",
            className: "mt-8 w-full",
            children: v.jsxs("div", {
              className: "flex items-center justify-center gap-4",
              children: [
                "Iniciar Sesión",
                v.jsx("i", { className: "fa fa-key text-[10px]" }),
              ],
            }),
          }),
        ],
      })
    );
  },
  BE = () =>
    v.jsx("div", {
      className: oe(
        "flex items-center justify-center",
        "bg-pkf-blue/20 h-30 2xl:h-40 rounded-t-2xl",
      ),
      children: v.jsx("img", {
        src: "/web/image/res.company/1/logo/200x200",
        alt: "logo",
        className: "w-50",
      }),
    }),
  HE = () =>
    v.jsxs("div", {
      className:
        "h-18 2xl:h-30 flex items-center justify-center flex-col gap-2",
      children: [
        v.jsx("span", {
          className: "text-xl font-bold",
          children: "Acceso al sistema",
        }),
        v.jsx("span", {
          className: "text-gray-400 italic text-[12px]",
          children: "Por favor ingrese sus credenciales para continuar.",
        }),
      ],
    });
function Vu() {
  const [a, l] = E.useState(!1),
    { isDark: r } = ot();
  return v.jsxs("div", {
    className: oe(
      "relative flex flex-col w-5/6 h-[80%]",
      "sm:w-1/2 md:w-[40%] lg:w-[30%] 2xl:w-[25%]",
      "shadow-2xl rounded-2xl",
      r ? "bg-gray-900" : "bg-white",
    ),
    children: [
      v.jsx(BE, {}),
      v.jsx(HE, {}),
      v.jsx(Vu.Status, { status: a, isDark: r }),
      v.jsxs("div", {
        className:
          "flex flex-col items-center justify-center flex-1 p-4 rounded-b-2xl",
        children: [
          v.jsx(UE, { isLogging: l }),
          v.jsx(Jn, {
            variant: "dark",
            className: "mt-2 w-full",
            children: v.jsxs("div", {
              className: "flex items-center justify-center gap-4",
              children: [
                "Iniciar con tu cuenta de microsoft",
                v.jsx("i", { className: "fa-brands fa-windows text-[12px]" }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
Vu.Status = ({ status: a, isDark: l }) =>
  v.jsx("div", {
    className: oe("absolute w-full h-full top-0 left-0 z-10", !a && "hidden", {
      "bg-gray-700/50": l,
      "bg-white/50": !l,
    }),
  });
function Av(a) {
  const { isDark: l } = ot();
  return v.jsx("header", {
    className: oe("h-12 p-4 flex justify-between border-b", {
      "border-b-gray-100": !l,
      "border-b-gray-800": l,
    }),
    children: a.children,
  });
}
const If = () => {
  const { isDark: a, setTheme: l } = ot();
  return v.jsxs("div", {
    className: oe("flex flex-col h-screen", {
      "bg-gray-50": !a,
      "bg-dark text-white": a,
    }),
    children: [
      v.jsxs(Av, {
        children: [
          v.jsxs("div", {
            className: "flex gap-2 items-center",
            children: [
              v.jsx("img", {
                src: "/web/image/res.company/1/logo/200x200",
                alt: "logo",
                className: "w-10",
              }),
              v.jsx("span", {
                className: "font-bold text-[12px]",
                children: "PKF Monterrey",
              }),
            ],
          }),
          v.jsx("button", {
            onClick: () => l(a ? "light" : "dark"),
            className: "cursor-pointer",
            children: v.jsx("i", {
              className: oe("fa-regular", a ? "fa-moon" : "fa-sun"),
            }),
          }),
        ],
      }),
      v.jsx("main", {
        className: "flex flex-col flex-1 justify-center items-center",
        children: v.jsx(Vu, {}),
      }),
    ],
  });
};
If.Navbar = Av;
If.CardForm = Vu;
function kE(a) {
  return v.jsx("div", {
    className: "group grid grid-cols-3 gap-0.5 cursor-pointer",
    onClick: a.onClick,
    children: Array.from({ length: 9 }).map((l, r) =>
      v.jsx(
        "div",
        { className: "group-hover:bg-white/50 bg-white w-1 h-1" },
        "item_" + r,
      ),
    ),
  });
}
function Up(a) {
  const l = Sl(),
    r = El(),
    { isDark: u } = ot(),
    c = () => (
      a.externalLink && (window.location.href = a.url),
      r.setParams((f) => ({ ...f, currentMenu: a })),
      l(a.url)
    );
  return v.jsxs("li", {
    className: oe(
      "flex items-center gap-2 p-2 cursor-pointer",
      "duration-150 text-[12px]",
      u ? "hover:bg-gray-700" : "hover:bg-gray-200",
    ),
    onClick: c,
    children: [a.icon && v.jsx("i", { className: a.icon }), a.text],
  });
}
function qE() {
  const [a, l] = E.useState([]),
    r = async () => {
      const u = await jy();
      l(u);
    };
  return (
    E.useEffect(() => {
      r();
    }, []),
    a
  );
}
function YE() {
  const a = qE(),
    l = () =>
      a.map((r) => E.createElement(Up, { ...r, key: "menu-item_" + r.name }));
  return v.jsxs("ul", {
    children: [
      v.jsx(Up, {
        id: 0,
        name: "odoo",
        url: "/odoo",
        icon: "fa-solid fa-arrow-up-right-dots",
        text: "Aplicaciones",
        externalLink: !0,
      }),
      l(),
    ],
  });
}
function VE(a) {
  const [l, r] = E.useState(!1),
    { isDark: u } = ot();
  return (
    E.useEffect(() => {
      if ((r(a.show ?? !1), !l)) return a.onClose?.();
    }, [a.show, a.onClose]),
    v.jsx("div", {
      className: oe(
        "absolute mt-2",
        "w-[80%] md:w-[60%] lg:w-[25%] 2xl:w-[20%]",
        "h-[80%]",
        "duration-150 shadow-2xl",
        { "opacity-100 scale-100 z-50": l, "opacity-0 scale-95 -z-10": !l },
        u ? "bg-dark text-white" : "bg-white text-gray-900",
      ),
      children: v.jsx("nav", { children: v.jsx(YE, {}) }),
    })
  );
}
function XE() {
  const [a, l] = E.useState(!1),
    r = E.useRef(null);
  return (
    E.useEffect(() => {
      const u = (f) => {
          r.current && (r.current.contains(f.target) || l(!1));
        },
        c = (f) => {
          f.key === "Escape" && l(!1);
        };
      return (
        document.addEventListener("mousedown", u),
        window.addEventListener("keyup", c),
        () => {
          (document.removeEventListener("mousedown", u),
            window.removeEventListener("keyup", c));
        }
      );
    }, []),
    v.jsxs("div", {
      ref: r,
      children: [
        v.jsx(kE, { onClick: () => l((u) => !u) }),
        v.jsx(VE, { show: a }),
      ],
    })
  );
}
function GE(a) {
  return a.items
    ? v.jsx("nav", {
        children: v.jsx("ul", {
          children: a.items.map((l, r) =>
            v.jsx(
              "li",
              { onClick: () => l.onItemClick?.(l), children: l.text ?? l.name },
              `li_menu_${l.name}_${r}`,
            ),
          ),
        }),
      })
    : null;
}
function Oa(a) {
  return v.jsxs(Oa.Header, {
    children: [
      v.jsx(Oa.Menu, { title: a.title, menu: a.menu }),
      v.jsx(Oa.MenuChildren, {}),
      v.jsx(Oa.UserInfo, {}),
    ],
  });
}
Oa.Header = (a) => {
  const { isDark: l } = ot();
  return v.jsx("header", {
    className: oe(
      "h-15 md:h-13 ps-2 pe-2",
      "flex items-center justify-between text-white shadow-lg gap-2",
      { "bg-pkf-blue": !l, "bg-dark border-b border-gray-800": l },
    ),
    children: a.children,
  });
};
Oa.MenuChildren = () => {
  const [a, l] = E.useState([]),
    r = El(),
    u = sa();
  return (
    E.useEffect(() => {
      (async () => {
        const { currentMenu: f } = r.params;
        if (!f) return;
        const h = await Hx(f.id);
        l(h);
      })();
    }, [r.params.currentMenu, u]),
    v.jsx("ul", {
      className: "hidden sm:flex sm:items-start sm:flex-1 sm:ps-3",
      children: a.map((c) =>
        v.jsx(
          "li",
          {
            className: "text-sm hover:bg-pkf-dark-blue p-2 duration-300",
            children: v.jsx(Nu, { to: c.url, children: c.text }),
          },
          c.id,
        ),
      ),
    })
  );
};
Oa.Menu = (a) => {
  const l = El();
  return v.jsxs("div", {
    className: "flex gap-4",
    children: [
      v.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          v.jsx(XE, {}),
          v.jsx("h1", {
            className: "hover:bg-pkf-dark-blue p-2 duration-300",
            children: v.jsx(Nu, {
              to: l.params.currentMenu?.url ?? "/",
              children: a.title,
            }),
          }),
        ],
      }),
      v.jsx(GE, { items: a.menu }),
    ],
  });
};
Oa.TogleTheme = () => {
  const { isDark: a, setTheme: l } = ot();
  return v.jsx("button", {
    onClick: () => l(a ? "light" : "dark"),
    className: "cursor-pointer",
    children: v.jsx("i", {
      className: oe("fa-regular", a ? "fa-moon" : "fa-sun"),
    }),
  });
};
Oa.UserInfo = () => {
  const [a, l] = E.useState(null),
    { logout: r, user: u } = Lr(),
    c = [
      { name: "profile", text: "Mi Perfil", icon: "fa fa-user" },
      {
        name: "logout",
        text: "Cerrar Sessión",
        icon: "fa-solid fa-right-from-bracket",
      },
    ],
    f = (h) => {
      switch (h.name) {
        case "logout":
          r();
          break;
        case "profile":
          window.location.href = "/my/home";
          break;
        default:
          alert(h.name);
      }
    };
  return (
    E.useEffect(() => {
      u?.avatar && l(u?.avatar);
    }, [u]),
    v.jsxs("div", {
      className: "flex items-center gap-4",
      children: [
        v.jsx(Oa.TogleTheme, {}),
        v.jsx("span", { className: "text-[12px]", children: u?.name }),
        v.jsx(Bf, {
          items: c,
          onItemClick: f,
          children: v.jsx("img", {
            src: a ?? Rx,
            alt: "avatar",
            className: "w-8 rounded-full cursor-pointer",
          }),
        }),
      ],
    })
  );
};
function Ti(a) {
  const { isDark: l } = ot();
  return v.jsxs("div", {
    className: "relative flex flex-col h-screen bg-blue-400 overflow-hidden",
    children: [
      v.jsx(Oa, { title: a.navbarTitle }),
      v.jsx("main", {
        className: oe("flex-1 flex flex-col min-h-0", {
          "bg-dark text-white": l,
          "bg-gray-100": !a.bgClass && !l,
          [a.bgClass ?? ""]: a.bgClass && !l,
        }),
        children: a.children,
      }),
    ],
  });
}
function QE() {
  const a = sa();
  return v.jsx(Ti, {
    navbarTitle: "Not Found",
    children: v.jsx("div", {
      className: "flex flex-1 justify-center items-center",
      children: v.jsxs("h1", {
        className: "font-bold text-2xl italic",
        children: ['404 - "', a.pathname, '" Not Found'],
      }),
    }),
  });
}
const jv = E.createContext(null);
function ZE({ children: a }) {
  const [l, r] = E.useState([]),
    [u, c] = E.useState([]),
    f = { clientes: l, setClientes: r, snapClientes: u, setSnapClientes: c };
  return v.jsx(jv.Provider, { value: f, children: a });
}
const $E = () => {
    const a = E.useContext(jv);
    if (a === null)
      throw new Error(
        "useCarteraContext must be inside CarteraContextProvider.",
      );
    return a;
  },
  KE = ({ baseUrl: a, onFetching: l }) => {
    let r = a.startsWith("/") ? a : `/${a}`;
    const u = () => "/pkfmty/api/v1" + r,
      c = async (h, g) => {
        l?.(!0);
        try {
          const y = await fetch(h, {
            ...g,
            headers: { "content-type": "application/json", ...g.headers },
          });
          if (!y.ok) throw new Error(y.statusText);
          return y.headers.get("content-type")?.includes("application/json")
            ? await y.json()
            : { error: !1, data: await y.text(), message: "" };
        } finally {
          l?.(!1);
        }
      },
      f = (h) => {
        try {
          const g = u(),
            y = new URLSearchParams();
          return (
            Object.entries(h).forEach(([m, w]) => {
              y.append(m, String(w));
            }),
            `${g}?${y.toString()}`
          );
        } catch {
          return u();
        }
      };
    return {
      get(h, g) {
        const y = h ? f(h) : u();
        return c(y, { method: "get", signal: g });
      },
      delete(h, g) {
        const y = h ? f(h) : u();
        return c(y, { method: "delete", signal: g });
      },
      post(h, g) {
        return c(u(), {
          signal: g,
          method: "post",
          body: JSON.stringify(h ?? {}),
        });
      },
      put(h, g) {
        return c(u(), {
          signal: g,
          method: "put",
          body: JSON.stringify(h ?? {}),
        });
      },
      setBaseUrl: (h) => {
        r = h.startsWith("/") ? h : `/${h}`;
      },
    };
  };
function Xu(a) {
  const [l, r] = E.useState(!1),
    u = E.useMemo(() => KE({ baseUrl: a, onFetching: r }), [a]);
  return { fetching: l, ...u };
}
function JE(a) {
  return {
    cliente: a.cliente,
    clasificacion: a.clasificacion,
    totalFacturas: a.total_facturas,
    saldoPendienteTotal: a.saldo_total,
    saldoPendienteA30: a.saldo_a_30,
    saldoPendienteA60: a.saldo_a_60,
    saldoPendienteA90: a.saldo_a_90,
    saldoVencido: a.saldo_vencido,
  };
}
function ed() {
  const {
      clientes: a,
      setClientes: l,
      snapClientes: r,
      setSnapClientes: u,
    } = $E(),
    c = Xu("/comercial/clientes/saldos"),
    f = E.useCallback(async () => {
      const w = await c.get();
      if (w.error) throw new Error(w.message);
      const b = w.data.map(JE);
      (u(b), l(b));
    }, [c, l]),
    h = E.useCallback(
      (w) => {
        const b = r.filter(
          (M) =>
            M.cliente.nombre.toLowerCase().includes(w.toLowerCase()) ||
            M.cliente.rfc.toLowerCase().includes(w.toLowerCase()) ||
            M.clasificacion.valor.toLowerCase().includes(w.toLowerCase()),
        );
        l(b);
      },
      [l, r],
    ),
    g = E.useMemo(() => r.reduce((w, b) => w + b.saldoPendienteTotal, 0), [r]),
    y = E.useMemo(() => r.reduce((w, b) => w + b.saldoVencido, 0), [r]),
    m = E.useMemo(() => r.reduce((w, b) => w + b.totalFacturas, 0), [r]);
  return {
    clientes: a,
    total: g,
    pendiente: y,
    totalFacturas: m,
    get: f,
    search: h,
    snapClientes: r,
    fetching: c.fetching,
  };
}
function FE(a) {
  const l = ed();
  return v.jsx("div", {
    className: "p-2",
    children: v.jsxs("div", {
      className: oe("w-60 flex items-center rounded-sm", {
        "bg-gray-100": !a.isDark,
        "bg-gray-800": a.isDark,
      }),
      children: [
        v.jsx("i", {
          className: "fa fa-search ms-2 text-[10px] text-gray-300",
        }),
        v.jsx("input", {
          type: "search",
          placeholder: "Buscar cliente por nombre o rfc",
          onChange: (r) => l.search(r.target.value),
          className: oe("p-2 outline-0 text-[12px] w-full", {
            "text-gray-600": !a.isDark,
            "text-gray-50": a.isDark,
          }),
        }),
      ],
    }),
  });
}
function hu(a) {
  const { item: l, name: r, color: u } = a,
    c = Number(l[r]),
    f = c === 0,
    h = (y) => u === y && !f,
    { isDark: g } = ot();
  return g
    ? v.jsx("span", {
        className: oe("p-1 rounded-sm", {
          "text-green-100 bg-green-500": f,
          "text-blue-100 bg-blue-600": h("blue"),
          "text-gray-100 bg-gray-600": h("gray"),
          "text-yellow-100 bg-yellow-600": h("yellow"),
          "text-indigo-100 bg-indigo-600": h("indigo"),
          "text-red-100 bg-red-600": h("red"),
          "text-pink-100 bg-pink-600": h("pink"),
        }),
        children: c.toLocaleString("es-MX"),
      })
    : v.jsx("span", {
        className: oe("p-1 rounded-sm", {
          "text-green-500 bg-green-100": f,
          "text-blue-600 bg-blue-100": h("blue"),
          "text-gray-600 bg-gray-100": h("gray"),
          "text-yellow-600 bg-yellow-100": h("yellow"),
          "text-indigo-600 bg-indigo-100": h("indigo"),
          "text-red-600 bg-red-100": h("red"),
          "text-pink-600 bg-pink-100": h("pink"),
        }),
        children: c.toLocaleString("es-MX"),
      });
}
const Mv = ({ item: a, className: l }) => {
    const r = Sl();
    return v.jsx("span", {
      className: oe("cursor-pointer hover:text-gray-300 font-bold", l),
      onClick: () => r(`/clientes/${a.cliente.id}/detalle`),
      children: a.saldoPendienteTotal.toLocaleString("es-MX"),
    });
  },
  PE = [
    {
      name: "index",
      text: "No.",
      element: (a, l) => v.jsx("span", { children: (l ?? 0) + 1 }),
    },
    { name: "cliente.codigo", text: "No.Cliente" },
    { name: "cliente.nombre", text: "Razon Social" },
    { name: "cliente.rfc", text: "Rfc" },
    { name: "clasificacion.valor", text: "Grupo" },
    {
      name: "saldoPendienteA30",
      text: "30 días",
      element: (a) =>
        v.jsx(hu, { item: a, color: "blue", name: "saldoPendienteA30" }),
    },
    {
      name: "saldoPendienteA60",
      text: "60 días",
      element: (a) =>
        v.jsx(hu, { item: a, color: "yellow", name: "saldoPendienteA60" }),
    },
    {
      name: "saldoPendienteA90",
      text: "90 días",
      element: (a) =>
        v.jsx(hu, { item: a, color: "pink", name: "saldoPendienteA90" }),
    },
    {
      name: "saldoVencido",
      text: "Saldo Vencido",
      element: (a) =>
        v.jsx(hu, { item: a, color: "red", name: "saldoVencido" }),
    },
    {
      name: "saldoPendienteTotal",
      text: "Pendiente",
      element: (a) => v.jsx(Mv, { item: a }),
    },
  ],
  WE = ({ item: a }) =>
    v.jsxs("div", {
      className: "p-2 mt-4 border-b border-b-gray-300",
      children: [
        v.jsxs("div", {
          className: "flex justify-between items-start",
          children: [
            v.jsx("h1", { className: "text-lg", children: a.cliente.nombre }),
            v.jsxs("div", {
              className: "mt-4",
              children: [
                v.jsx("i", {
                  className:
                    "fa fa-dollar-sign bg-green-100 text-green-600 p-1 text-lg me-3 rounded-sm",
                }),
                v.jsx(Mv, { item: a, className: "text-lg" }),
              ],
            }),
          ],
        }),
        v.jsx("span", {
          className: "text-gray-400 text-sm",
          children: a.cliente.rfc,
        }),
      ],
    });
function IE() {
  const a = ed(),
    { isDark: l } = ot();
  return (
    E.useEffect(() => {
      a.get();
    }, []),
    v.jsx(Br, {
      dataSource: a.clientes ?? [],
      loading: a.fetching,
      columns: PE,
      isDark: l,
      className: "text-[12px] flex-1 overflow-y-auto scrollbar-hide w-full",
      renderListItem: (r) => v.jsx(WE, { item: r }),
    })
  );
}
function eC(a) {
  return v.jsx("span", {
    className: oe(
      `bg-${a.color}-100`,
      `text-${a.color}-600`,
      "rounded-md p-1",
      a.className,
    ),
    children: v.jsx("i", { className: a.icon }),
  });
}
const tC = (a) =>
  v.jsx("span", {
    className: oe(
      `bg-${a.color}-${a.isDark ? "600" : "50"}`,
      `text-${a.color}-${a.isDark ? "100" : "600"}`,
      "rounded-md p-1",
    ),
    children: a.text,
  });
function yf(a) {
  const { isDark: l } = ot();
  return v.jsxs("div", {
    className: oe("p-2 rounded-sm flex flex-col gap-1", {
      "bg-white": !l,
      "bg-gray-900": l,
    }),
    children: [
      v.jsxs("div", {
        className: "flex justify-between",
        children: [
          v.jsx(eC, { icon: a.icon, color: a.iconColor }),
          v.jsx(tC, { color: a.textColor, text: a.text ?? "", isDark: l }),
        ],
      }),
      v.jsx("div", {
        children: v.jsx("span", {
          className: oe("text-[12px]", {
            "text-gray-600": !l,
            "text-gray-200": l,
          }),
          children: a.title,
        }),
      }),
      v.jsx("div", {
        children: v.jsx("span", {
          className: oe("font-bold text-2xl", {
            "text-gray-900": !l,
            "text-gray-100": l,
          }),
          children: a.amnount,
        }),
      }),
    ],
  });
}
function Rv() {
  const a = ed();
  return v.jsxs("div", {
    className: "grid grid-cols-3 gap-4 mt-2",
    children: [
      v.jsx(yf, {
        icon: "fa-solid fa-money-bill-1",
        iconColor: "blue",
        textColor: "green",
        title: "Total cartera pendiente",
        amnount: a.total.toLocaleString("es-MX"),
      }),
      v.jsx(yf, {
        icon: "fa-solid fa-money-bill-1",
        iconColor: "blue",
        textColor: "green",
        title: "Total Vencido",
        amnount: a.pendiente.toLocaleString("es-mx"),
      }),
      v.jsx(yf, {
        icon: "fa-solid fa-money-bill-1",
        iconColor: "blue",
        textColor: "green",
        title: "Total Facturas",
        amnount: a.totalFacturas.toString(),
      }),
    ],
  });
}
function bi() {
  const { isDark: a } = ot();
  return v.jsx(ZE, {
    children: v.jsxs(Lu, {
      className: "flex-1 flex flex-col min-h-0",
      children: [
        v.jsx(Rv, {}),
        v.jsxs("div", {
          className: oe("mt-2 mb-2 flex flex-col flex-1 min-h-0", {
            "bg-white": !a,
            "bg-gray-900": a,
          }),
          children: [v.jsx(bi.Header, { isDark: a }), v.jsx(bi.Table, {})],
        }),
      ],
    }),
  });
}
bi.Header = FE;
bi.Table = IE;
bi.BannerCards = Rv;
function aC() {
  return v.jsx(Ti, {
    navbarTitle: "Edo Cuenta de Cliente",
    children: v.jsx(bi, {}),
  });
}
const nC = ({ isDark: a, hide: l }) =>
    l
      ? null
      : v.jsxs("div", {
          className: oe(
            a ? "bg-gray-600/30" : "bg-white/30",
            "absolute w-full h-full top-0 left-0 rounded-xl z-50",
            "flex justify-center items-center",
          ),
          children: [
            v.jsx("svg", {
              className: "mr-3 size-5 animate-pulse bg-gray-600 rounded-full",
              viewBox: "0 0 24 24",
            }),
            "Procesando archivo.....",
          ],
        }),
  mu = (a) =>
    v.jsxs("div", {
      children: [
        v.jsx("span", { className: "font-bold me-2", children: a.label }),
        v.jsx("span", {
          className: "flex items-end text-pkf-blue text-[12px]",
          children: a.value ?? "",
        }),
      ],
    });
function lC() {
  const [a, l] = E.useState({ file: null, send_to_client: !0 }),
    [r, u] = E.useState(!1),
    c = E.useRef(null),
    { isDark: f } = ot(),
    h = Yu(),
    g = (m) => {
      const w = m.target;
      for (const b of w.files ?? [])
        if (b.type === "application/x-zip-compressed") {
          l((M) => ({ ...M, file: b }));
          break;
        }
    },
    y = async () => {
      if (a.file)
        try {
          u(!0);
          const m = "/pkfmty/api/v1/comercial/clientes/envio-facturas",
            w = new FormData();
          (w.append("file", a.file),
            w.append("send_to_client", a.send_to_client ? "1" : "0"));
          const M = await (await fetch(m, { method: "POST", body: w })).json();
          if (M.error) return h.error("Ocurrio un error", M.message);
          h.success("Petición Exitosa", M.message);
        } catch (m) {
          h.error("Ocurrio un error", String(m));
        } finally {
          u(!1);
        }
    };
  return v.jsx(Ti, {
    navbarTitle: "Clientes",
    children: v.jsx("div", {
      className: oe(
        "flex justify-center items-center",
        "z-50 shadow-2xs",
        "w-full h-full top-0 left-0",
        "bg-gray-950/30",
      ),
      children: v.jsxs("div", {
        className: oe(
          f ? "bg-gray-600" : "bg-white",
          "relative w-[70%] h-[70%] rounded-xl p-4",
        ),
        children: [
          v.jsx(nC, { isDark: f, hide: !r }),
          v.jsx("input", {
            type: "file",
            name: "zip",
            id: "zip",
            className: "hidden",
            ref: c,
            accept: "application/x-zip-compressed",
            onChange: g,
          }),
          v.jsx("div", {
            children: v.jsxs(Jn, {
              variant: "primary",
              className: "me-4",
              onClick: () => c?.current?.click(),
              children: [
                v.jsx("i", { className: "fa-regular fa-file-zipper me-4" }),
                "Subir ZIP Facturas",
              ],
            }),
          }),
          v.jsxs("div", {
            className: oe("mt-4", !a.file && "hidden"),
            children: [
              v.jsx($x, {
                value: a.send_to_client,
                color: "blue",
                onChange: (m) => l((w) => ({ ...w, send_to_client: m })),
              }),
              v.jsx("label", {
                htmlFor: "to_client",
                className: "ms-3",
                children: "Enviar a cliente",
              }),
            ],
          }),
          v.jsxs("div", {
            className: oe("grid grid-cols-2 gap-2 mt-5", !a.file && "hidden"),
            children: [
              v.jsx(mu, { label: "Nombre", value: a.file?.name }),
              v.jsx(mu, { label: "Tamaño", value: String(a.file?.size) }),
              v.jsx(mu, { label: "Tipo", value: a.file?.type }),
              v.jsx(mu, {
                label: "Fecha Modificación",
                value: new Date(a.file?.lastModified ?? 0).toLocaleDateString(
                  "es-MX",
                ),
              }),
            ],
          }),
          v.jsx("div", {
            className: oe("mt-4", !a.file && "hidden"),
            children: v.jsx(Jn, {
              variant: "clear-green",
              onClick: y,
              children: "Procesar",
            }),
          }),
        ],
      }),
    }),
  });
}
function iC(a) {
  return {
    ...a,
    razonSocial: a.razon_social,
    fechaAlta: a.fecha_alta,
    fechaBaja: a.fecha_baja,
    moneda: { ...a.moneda, claveSat: a.moneda.clave_sat },
    facturas: a.facturas.map((l) => ({
      ...l,
      idDocumento: l.id_documento,
      serieFolio: l.serie_folio,
      fechaVencimiento: l.fecha_vencimiento,
    })),
  };
}
function rC(a) {
  const [l, r] = E.useState(),
    u = Xu(a ? `/comercial/clientes/saldos/${a}/detalle` : "");
  return (
    E.useEffect(() => {
      if (!a) return;
      (async () => {
        const f = await u.get();
        if (f.error) throw new Error(f.message);
        r(iC(f.data));
      })();
    }, [a]),
    { detalleSaldo: l, fetching: u.fetching }
  );
}
function Bp(a) {
  const { item: l, name: r, color: u } = a,
    c = Number(l[r]),
    f = c === 0,
    h = (y) => u === y && !f,
    { isDark: g } = ot();
  return g
    ? v.jsx("span", {
        className: oe("p-1 rounded-sm", {
          "text-green-100 bg-green-500": f,
          "text-blue-100 bg-blue-600": h("blue"),
          "text-gray-100 bg-gray-600": h("gray"),
          "text-yellow-100 bg-yellow-600": h("yellow"),
          "text-indigo-100 bg-indigo-600": h("indigo"),
          "text-red-100 bg-red-600": h("red"),
          "text-pink-100 bg-pink-600": h("pink"),
        }),
        children: c.toLocaleString("es-MX"),
      })
    : v.jsx("span", {
        className: oe("p-1 rounded-sm", {
          "text-green-500 bg-green-100": f,
          "text-blue-600 bg-blue-100": h("blue"),
          "text-gray-600 bg-gray-100": h("gray"),
          "text-yellow-600 bg-yellow-100": h("yellow"),
          "text-indigo-600 bg-indigo-100": h("indigo"),
          "text-red-600 bg-red-100": h("red"),
          "text-pink-600 bg-pink-100": h("pink"),
        }),
        children: c.toLocaleString("es-MX"),
      });
}
const vf = (a) =>
    v.jsxs("div", {
      className: "text-[10px] text-gray-500 italic",
      children: [
        v.jsx("strong", { className: "me-2", children: a.label }),
        a.value,
      ],
    }),
  Hp = (a) =>
    v.jsxs("span", {
      className: oe("flex justify-between", a.className),
      children: [
        v.jsx("strong", { children: a.label }),
        v.jsx("span", {
          children: a.amount.toLocaleString("es-MX", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        }),
      ],
    });
function Dv({ source: a }) {
  const { isDark: l } = ot(),
    r = Yu(),
    u = Xu(`/comercial/clientes/saldos/${a?.id ?? 0}/enviar`),
    c = Sl(),
    f = a?.facturas.reduce((m, w) => m + w.total, 0) ?? 0,
    h = a?.facturas.reduce((m, w) => m + w.pendiente, 0) ?? 0,
    g = f === 0 ? 0 : h / f,
    y = async () => {
      try {
        const m = await u.get();
        if (m.error) return r.error("Ocurrio un error", m.message);
        r.success("Mensaje", m.message);
      } catch (m) {
        r.error("Ocurrio un error", String(m));
      }
    };
  return v.jsxs("div", {
    className: oe("p-2 rounded-lg", { "bg-white": !l, "bg-gray-900": l }),
    children: [
      v.jsx("div", {
        children: v.jsx("i", {
          className: "fa fa-arrow-left text-[12px] cursor-pointer",
          onClick: () => c(-1),
        }),
      }),
      v.jsxs("div", {
        className: "flex justify-between",
        children: [
          v.jsxs("div", {
            children: [
              v.jsx("div", {
                children: v.jsx("h1", {
                  className: "font-bold text-lg",
                  children: a?.razonSocial,
                }),
              }),
              v.jsxs("div", {
                className: "flex gap-2",
                children: [
                  v.jsx(vf, { label: "Rfc:", value: a?.rfc }),
                  v.jsx(vf, { label: "Grupo:", value: a?.clasificacion.valor }),
                  v.jsx(vf, { label: "Correos:", value: a?.emails }),
                ],
              }),
              v.jsx("div", {
                className: "pt-4 pb-4",
                children: v.jsxs(Jn, {
                  variant: "primary",
                  onClick: () => y(),
                  disabled: u.fetching,
                  className: oe(
                    "text-[12px] flex gap-3 items-center",
                    u.fetching && "italic",
                  ),
                  children: [
                    v.jsx("i", { className: "fa fa-envelope-open" }),
                    u.fetching
                      ? "Enviando estado de cuenta."
                      : "Enviar Estado de Cuenta",
                  ],
                }),
              }),
            ],
          }),
          v.jsxs("div", {
            className: "w-60",
            children: [
              v.jsx("div", {
                children: v.jsx(Hp, {
                  label: "Total:",
                  amount: f,
                  className: "text-[14px]",
                }),
              }),
              v.jsx("div", {
                children: v.jsx(Hp, {
                  label: "Pendiente:",
                  amount: h,
                  className: oe({
                    "text-red-900": g > 0.6,
                    "text-amber-300": g > 0.2 && g < 0.6,
                    "text-green-600": g < 0.2,
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const kp = (a) =>
    a.toLocaleString("es-MX", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  di = (a) =>
    v.jsxs("div", {
      className: "flex justify-between min-w-30 mb-2",
      children: [
        v.jsx("span", { className: "font-bold me-2", children: a.label }),
        v.jsx("span", { children: a.value }),
      ],
    });
function oC({ item: a }) {
  return v.jsxs("div", {
    className: "p-2 border-b border-gray-300",
    children: [
      v.jsxs("div", {
        className: "flex justify-between",
        children: [
          v.jsxs("div", {
            className: "flex flex-col",
            children: [
              v.jsx("span", {
                className: "text-lg font-bold mb-2",
                children: a.serieFolio,
              }),
              v.jsx(di, { label: "Fecha:", value: a.fecha.split(" ")[0] }),
              v.jsx(di, { label: "UUID: ", value: a.uuid }),
              v.jsx(di, { label: "Estatus:", value: a.estatus }),
              v.jsx(di, { label: "observaciones:", value: a.observaciones }),
              v.jsx(di, { label: "Referencia:", value: a.referencia }),
              v.jsx(di, { label: "Segmento:", value: a.segmento }),
            ],
          }),
          v.jsxs("div", {
            children: [
              v.jsx("i", {
                className:
                  "fa fa-dollar-sign bg-green-100 text-green-600 p-1 text-lg me-3 rounded-sm",
              }),
              v.jsx("span", {
                className: "text-lg font-bold",
                children: kp(a.total),
              }),
            ],
          }),
        ],
      }),
      v.jsx("div", {
        className: "flex justify-end mt-2",
        children: v.jsxs("div", {
          className: "flex justify-between w-40 text-gray-500",
          children: [
            v.jsx("span", { children: "Pendiente:" }),
            v.jsx("span", { children: kp(a.pendiente) }),
          ],
        }),
      }),
    ],
  });
}
function zv() {
  const { id: a } = S2(),
    { isDark: l } = ot(),
    r = Number(a),
    { detalleSaldo: u } = rC(r);
  return v.jsxs(Lu, {
    className: "flex-1 flex flex-col mt-2 min-h-0",
    children: [
      v.jsx(Dv, { source: u }),
      v.jsx(Br, {
        isDark: l,
        columns: [
          {
            name: "fecha",
            text: "Fecha",
            element: (c) => v.jsx("span", { children: c.fecha.split(" ")[0] }),
          },
          { name: "serieFolio", text: "Folio" },
          { name: "uuid", text: "UUID" },
          { name: "segmento", text: "Segmento" },
          { name: "referencia", text: "Referencia" },
          { name: "observaciones", text: "Concepto" },
          {
            name: "total",
            text: "Total",
            element: (c) => v.jsx(Bp, { item: c, name: "total" }),
          },
          {
            name: "pendiente",
            text: "Pendiente",
            element: (c) => v.jsx(Bp, { item: c, name: "pendiente" }),
          },
        ],
        className: oe(
          "mt-4 flex-1 mb-2 overflow-y-auto scrollbar-hide text-[12px]",
          { "bg-white": !l, "bg-gray-900": l },
        ),
        dataSource: u?.facturas ?? [],
        renderListItem: (c) => v.jsx(oC, { item: c }),
      }),
    ],
  });
}
zv.Detalle = Dv;
function uC() {
  return v.jsx(Ti, { navbarTitle: "Clientes", children: v.jsx(zv, {}) });
}
const sC = () => {
  const a = new Date().toUTCString().replace("GMT", ""),
    { isDark: l } = ot();
  return v.jsxs("div", {
    className: oe(
      "shadow-2xl w-60 flex justify-between items-center gap-4 p-3",
      { "bg-white text-pkf-blue": !l, "bg-gray-900 text-white": l },
    ),
    children: [
      v.jsx("i", { className: "fa fa-calendar " }),
      v.jsx("span", { className: "text-[12px]", children: a }),
    ],
  });
};
function cC(a) {
  const { variant: l = "blue", icon: r, title: u, url: c } = a,
    f = Sl(),
    { isDark: h } = ot();
  return v.jsx("div", {
    className: oe("w-60 shadow-2xl p-2 rounded-sm cursor-pointer", {
      "bg-white hover:bg-gray-100": !h,
      "bg-gray-800 hover:bg-gray-600": h,
    }),
    onClick: () => f(c),
    children: v.jsxs("div", {
      className: "flex items-center gap-4",
      children: [
        v.jsx("span", {
          className: oe("p-2 text-[12px]", {
            "bg-blue-200": l === "blue",
            "bg-green-200": l === "green",
          }),
          children: v.jsx("i", {
            className: oe(r, {
              "text-blue-600": l === "blue",
              "text-green-600": l === "green",
            }),
          }),
        }),
        v.jsx("h5", { className: "text-[14px]", children: u }),
      ],
    }),
  });
}
const fC = () => {
    const a = Lr();
    return v.jsx(Ti, {
      navbarTitle: "Dashboard",
      children: v.jsxs(Lu, {
        className: "mt-5",
        children: [
          v.jsxs("div", {
            className:
              "flex justify-between items-center flex-col gap-2 md:flex-row",
            children: [
              v.jsxs("h2", {
                className: "text-xl",
                children: ["Bienvenido ", a.user?.name],
              }),
              v.jsx(sC, {}),
            ],
          }),
          v.jsx("div", {
            className: "mt-10",
            children: v.jsx(cC, {
              url: "/recibos-de-nomina",
              title: "Recibo de nominas",
              icon: "fa fa-receipt",
            }),
          }),
        ],
      }),
    });
  },
  Ov = E.createContext(null);
function dC({ children: a }) {
  const [l, r] = E.useState([]),
    u = Xu("/nominas/recibos"),
    c = async (f) => {
      const h = { limit: 50 };
      f && ((h.startdate = f.startdate), (h.enddate = f.enddate));
      const g = await u.get(h);
      if (g.error) return console.log(g.message);
      r(g.data);
    };
  return v.jsx(Ov.Provider, {
    value: { recibos: l, getRecibos: c, fetching: u.fetching },
    children: a,
  });
}
const Nv = (a = !0) => {
  const l = E.useContext(Ov);
  if (l === null)
    throw new Error("useRecibos must be inside the RecibosContextProvider");
  return (
    E.useEffect(() => {
      a && l.getRecibos();
    }, []),
    l
  );
};
function hC() {
  const [a, l] = E.useState({ startdate: "", enddate: "" }),
    r = Nv(!1),
    u = Yu(),
    c = () => {
      const g = new Date(),
        y = String(g.getMonth() + 1).padStart(2, "0");
      return `${g.getFullYear()}-${y}-${g.getDate()}`;
    },
    f = () => {
      const g = a.startdate || c(),
        y = a.enddate || c();
      if (y < g) {
        u.error(
          "Error en fechas",
          "La fecha final debe ser mayor o igual que la inicial",
        );
        return;
      }
      r.getRecibos({ startdate: g, enddate: y });
    },
    { isDark: h } = ot();
  return v.jsxs("div", {
    className: oe(
      "p-2 rounded-lg",
      "flex flex-col gap-3",
      "md:justify-between md:items-center md:flex-row",
      { "bg-white": !h, "bg-gray-900": h },
    ),
    children: [
      v.jsxs("div", {
        children: [
          v.jsx("h2", { className: "text-2xl font-bold", children: "Nominas" }),
          v.jsx("i", {
            className: "text-[10px] text-gray-400",
            children: "Módulo para gestionar tus recibos de nómina",
          }),
        ],
      }),
      v.jsxs("div", {
        className: "flex flex-col md:flex-row md:items-center gap-4",
        children: [
          v.jsx(bu, {
            variant: "material",
            type: "date",
            label: "Desde",
            className: "text-[12px]",
            onChange: (g) => l((y) => ({ ...y, startdate: g.target.value })),
          }),
          v.jsx(bu, {
            variant: "material",
            type: "date",
            label: "Hasta",
            className: "text-[12px]",
            onChange: (g) => l((y) => ({ ...y, enddate: g.target.value })),
          }),
          v.jsx(Jn, {
            className: "text-[12px]",
            variant: "clear-blue",
            onClick: f,
            children: "Filtrar",
          }),
        ],
      }),
    ],
  });
}
const _v = (a, l, r) => {
    const u = mC(l, a.name);
    if (a.name === "xml") {
      window.open(u.toString(), "_blank");
      return;
    }
    vC(u, r);
  },
  mC = (a, l) => {
    const r = new URL(
      "/pkfmty/api/v1/nominas/recibo/crear",
      window.location.origin,
    );
    return (
      r.searchParams.append("iddocumento", String(a)),
      r.searchParams.append("type", l),
      r
    );
  },
  gC = (a) => {
    const l = `
      html, body {
        margin:0;
        height:100%;
        overflow:hidden;
        font-family: Arial;
      }

      #loader {
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        background:white;
        z-index:10;
        font-size:18px;
      }

      iframe {
        border:none;
        width:100%;
        height:100%;
      }

      .spinner {
        border:6px solid #eee;
        border-top:6px solid #444;
        border-radius:50%;
        width:40px;
        height:40px;
        animation:spin 1s linear infinite;
        margin-right:10px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  `,
      r = a.document.createElement("style");
    return ((r.textContent = l), a.document.head.appendChild(r), a);
  },
  pC = (a) => {
    const l = a.document.createElement("div");
    l.id = "loader";
    const r = a.document.createElement("div");
    r.className = "spinner";
    const u = a.document.createElement("span");
    return (
      (u.textContent = "Generando PDF..."),
      l.appendChild(r),
      l.appendChild(u),
      l
    );
  },
  yC = (a, l, r) => {
    const u = a.document.createElement("iframe");
    return (
      (u.src = l.toString()),
      (u.onload = () => {
        r.style.display = "none";
      }),
      u
    );
  },
  vC = (a, l) => {
    let r = window.open("", "_blank");
    if (!r) return;
    ((r.document.title = "Recibo de Nómina - " + l), (r = gC(r)));
    const u = pC(r),
      c = yC(r, a, u);
    (r.document.body.appendChild(u), r.document.body.appendChild(c));
  },
  Lv = [
    { name: "pdf", text: "PDF", icon: "fa-regular fa-file-pdf" },
    { name: "xml", text: "XML", icon: "fa-regular fa-file" },
  ],
  bC = [
    { name: "iddocumento", visible: !1 },
    { name: "nombreemisor", text: "Emisor" },
    { name: "uuid", text: "UUID" },
    { name: "rfcemisor", text: "RFC Emisor" },
    { name: "nombreemisor", text: "Emisor" },
    {
      name: "total",
      text: "Total",
      element: (a) =>
        v.jsxs("span", {
          className: "bg-green-100 text-green-600 p-2 rounded-2xl text-[10px]",
          children: [
            "$",
            Number(a.total).toLocaleString("es-MX", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }),
          ],
        }),
    },
    {
      name: "action",
      text: "Acciones",
      element: (a) =>
        v.jsx(Bf, {
          items: Lv,
          onItemClick: (l) => _v(l, a.iddocumento, a.uuid),
          children: v.jsx(Jn, {
            variant: "clear-blue",
            className: "text-[12px]",
            children: "Ver Recibo",
          }),
        }),
    },
  ],
  wC = (a) => {
    const l = (r) =>
      v.jsxs("div", {
        className: "flex mb-2",
        children: [
          v.jsx("span", { className: "font-bold w-15", children: r.text }),
          v.jsx("span", { children: r.value }),
        ],
      });
    return v.jsxs("div", {
      className: "text-[12px] p-2 mb-2 border-b border-gray-300",
      children: [
        v.jsx(l, { text: "Fecha", value: a.fechaemision }),
        v.jsx(l, { text: "Emisor", value: a.nombreemisor }),
        v.jsx(l, { text: "RFC", value: a.rfcemisor }),
        v.jsx(l, { text: "UUID", value: a.uuid }),
        v.jsx(Bf, {
          items: Lv,
          onItemClick: (r) => _v(r, a.iddocumento, a.uuid),
          children: v.jsx(Jn, {
            variant: "clear-blue",
            className: "text-[12px]",
            children: "Ver Recibo",
          }),
        }),
      ],
    });
  };
function xC() {
  const a = Nv(),
    { isDark: l } = ot();
  return v.jsx(Br, {
    renderListItem: (r) => v.jsx(wC, { ...r }),
    dataSource: a.recibos,
    columns: bC,
    className: "text-[12px]",
    loading: a.fetching,
    isDark: l,
    noDataMessage: "No se encontraron recibos de nominas",
  });
}
function SC() {
  const { isDark: a } = ot();
  return v.jsx(Ti, {
    navbarTitle: "Recibo de nominas",
    children: v.jsx(dC, {
      children: v.jsxs(Lu, {
        className: "flex-1 flex flex-col mt-5 min-h-0 pe-4 ps-4 md:p-0",
        children: [
          v.jsx("div", { className: "mb-10", children: v.jsx(hC, {}) }),
          v.jsx("div", {
            className: oe(
              "flex-1 mb-5 rounded-sm overflow-y-auto scrollbar-hide",
              { "bg-gray-900": a, "bg-white": !a },
            ),
            children: v.jsx(xC, {}),
          }),
        ],
      }),
    }),
  });
}
const EC = [
    { path: "", element: v.jsx(aC, {}) },
    { path: ":id/detalle", element: v.jsx(uC, {}) },
    { path: "envio-facturas", element: v.jsx(lC, {}) },
  ],
  CC = [
    { path: "/", element: v.jsx(fC, {}) },
    { path: "/clientes", children: EC },
    { path: "/recibos-de-nomina", element: v.jsx(SC, {}) },
  ],
  TC = [
    {
      element: v.jsx(Yx, {}),
      children: [{ path: "/login", element: v.jsx(If, {}) }],
    },
    { path: "*", element: v.jsx(QE, {}) },
    { element: v.jsx(qx, {}), children: CC },
  ],
  AC = mx(TC, { basename: "/app" }),
  jC = ({ children: a }) =>
    v.jsx(_x, {
      children: v.jsx(Dx, {
        children: v.jsx(zx, { children: v.jsx(Ux, { children: a }) }),
      }),
    });
ew.createRoot(document.getElementById("root")).render(
  v.jsx(E.StrictMode, {
    children: v.jsx(jC, { children: v.jsx(jx, { router: AC }) }),
  }),
);
