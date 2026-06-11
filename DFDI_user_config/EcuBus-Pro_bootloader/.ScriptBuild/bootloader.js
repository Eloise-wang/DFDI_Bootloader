var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../../APP_Software/EcuBus-Pro/resources/app.asar.unpacked/resources/lib/js/index.js
var require_js = __commonJS({
  "../../../../APP_Software/EcuBus-Pro/resources/app.asar.unpacked/resources/lib/js/index.js"(exports2) {
    init_init();
    (() => {
      var e = { 775(e2, t2) {
        t2.parse = t2.decode = function(e3) {
          var t3 = {}, r3 = t3, s3 = null, i3 = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
          return e3.split(/[\r\n]+/g).forEach(function(e4, n3, o) {
            if (e4 && !e4.match(/^\s*[;#]/)) {
              var c = e4.match(i3);
              if (c) {
                if (void 0 !== c[1]) return "__proto__" === (s3 = a(c[1])) ? void (r3 = {}) : void (r3 = t3[s3] = t3[s3] || {});
                var u = a(c[2]);
                if ("__proto__" !== u) {
                  var l = !c[3] || a(c[4]);
                  switch (l) {
                    case "true":
                    case "false":
                    case "null":
                      l = JSON.parse(l);
                  }
                  if (u.length > 2 && "[]" === u.slice(-2)) {
                    if ("__proto__" === (u = u.substring(0, u.length - 2))) return;
                    r3[u] ? Array.isArray(r3[u]) || (r3[u] = [r3[u]]) : r3[u] = [];
                  }
                  Array.isArray(r3[u]) ? r3[u].push(l) : r3[u] = l;
                }
              }
            }
          }), Object.keys(t3).filter(function(e4, r4, s4) {
            if (!t3[e4] || "object" != typeof t3[e4] || Array.isArray(t3[e4])) return false;
            var i4 = n2(e4), a2 = t3, o = i4.pop(), c = o.replace(/\\\./g, ".");
            return i4.forEach(function(e5, t4, r5) {
              "__proto__" !== e5 && (a2[e5] && "object" == typeof a2[e5] || (a2[e5] = {}), a2 = a2[e5]);
            }), (a2 !== t3 || c !== o) && (a2[c] = t3[e4], true);
          }).forEach(function(e4, r4, n3) {
            delete t3[e4];
          }), t3;
        }, t2.stringify = t2.encode = function e3(t3, s3) {
          var a2 = [], o = "";
          "string" == typeof s3 ? s3 = { section: s3, whitespace: false } : (s3 = s3 || {}).whitespace = true === s3.whitespace;
          var c = s3.whitespace ? " = " : "=";
          return Object.keys(t3).forEach(function(e4, n3, s4) {
            var u = t3[e4];
            u && Array.isArray(u) ? u.forEach(function(t4) {
              o += i2(e4 + "[]") + c + i2(t4) + "\n";
            }) : u && "object" == typeof u ? a2.push(e4) : o += i2(e4) + c + i2(u) + r2;
          }), s3.section && o.length && (o = "[" + i2(s3.section) + "]" + r2 + o), a2.forEach(function(i3, a3, c2) {
            var u = n2(i3).join("\\."), l = (s3.section ? s3.section + "." : "") + u, f = e3(t3[i3], { section: l, whitespace: s3.whitespace });
            o.length && f.length && (o += r2), o += f;
          }), o;
        }, t2.safe = i2, t2.unsafe = a;
        var r2 = "undefined" != typeof process ? "\r\n" : "\n";
        function n2(e3) {
          return e3.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map(function(e4) {
            return e4.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
          });
        }
        function s2(e3) {
          return '"' === e3.charAt(0) && '"' === e3.slice(-1) || "'" === e3.charAt(0) && "'" === e3.slice(-1);
        }
        function i2(e3) {
          return "string" != typeof e3 || e3.match(/[=\r\n]/) || e3.match(/^\[/) || e3.length > 1 && s2(e3) || e3 !== e3.trim() ? JSON.stringify(e3) : e3.replace(/;/g, "\\;").replace(/#/g, "\\#");
        }
        function a(e3, t3) {
          if (!s2(e3 = (e3 || "").trim())) {
            for (var r3 = false, n3 = "", i3 = 0, a2 = e3.length; i3 < a2; i3++) {
              var o = e3.charAt(i3);
              if (r3) -1 !== "\\;#".indexOf(o) ? n3 += o : n3 += "\\" + o, r3 = false;
              else {
                if (-1 !== ";#".indexOf(o)) break;
                "\\" === o ? r3 = true : n3 += o;
              }
            }
            return r3 && (n3 += "\\"), n3.trim();
          }
          "'" === e3.charAt(0) && (e3 = e3.substr(1, e3.length - 2));
          try {
            e3 = JSON.parse(e3);
          } catch (e4) {
          }
          return e3;
        }
      }, 543(e2, t2, r2) {
        var n2;
        e2 = r2.nmd(e2), function() {
          var s2, i2 = "Expected a function", a = "__lodash_hash_undefined__", o = "__lodash_placeholder__", c = 32, u = 128, l = 1 / 0, f = 9007199254740991, d = NaN, h = 4294967295, p = [["ary", u], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", c], ["partialRight", 64], ["rearg", 256]], m = "[object Arguments]", v = "[object Array]", b = "[object Boolean]", g = "[object Date]", y = "[object Error]", _ = "[object Function]", E = "[object GeneratorFunction]", I = "[object Map]", w = "[object Number]", T = "[object Object]", S = "[object Promise]", N = "[object RegExp]", R = "[object Set]", O = "[object String]", A = "[object Symbol]", D = "[object WeakMap]", C = "[object ArrayBuffer]", L = "[object DataView]", U = "[object Float32Array]", k = "[object Float64Array]", x = "[object Int8Array]", B = "[object Int16Array]", M = "[object Int32Array]", j = "[object Uint8Array]", P = "[object Uint8ClampedArray]", $ = "[object Uint16Array]", V = "[object Uint32Array]", G = /\b__p \+= '';/g, F = /\b(__p \+=) '' \+/g, z = /(__e\(.*?\)|\b__t\)) \+\n'';/g, W = /&(?:amp|lt|gt|quot|#39);/g, q = /[&<>"']/g, Y = RegExp(W.source), H = RegExp(q.source), K = /<%-([\s\S]+?)%>/g, X = /<%([\s\S]+?)%>/g, Q = /<%=([\s\S]+?)%>/g, J = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Z = /^\w*$/, ee = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, te = /[\\^$.*+?()[\]{}|]/g, re = RegExp(te.source), ne = /^\s+/, se = /\s/, ie = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ae = /\{\n\/\* \[wrapped with (.+)\] \*/, oe = /,? & /, ce = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ue = /[()=,{}\[\]\/\s]/, le = /\\(\\)?/g, fe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, de = /\w*$/, he = /^[-+]0x[0-9a-f]+$/i, pe = /^0b[01]+$/i, me = /^\[object .+?Constructor\]$/, ve = /^0o[0-7]+$/i, be = /^(?:0|[1-9]\d*)$/, ge = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, ye = /($^)/, _e = /['\n\r\u2028\u2029\\]/g, Ee = "\\ud800-\\udfff", Ie = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", we = "\\u2700-\\u27bf", Te = "a-z\\xdf-\\xf6\\xf8-\\xff", Se = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ne = "\\ufe0e\\ufe0f", Re = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Oe = "[" + Ee + "]", Ae = "[" + Re + "]", De = "[" + Ie + "]", Ce = "\\d+", Le = "[" + we + "]", Ue = "[" + Te + "]", ke = "[^" + Ee + Re + Ce + we + Te + Se + "]", xe = "\\ud83c[\\udffb-\\udfff]", Be = "[^" + Ee + "]", Me = "(?:\\ud83c[\\udde6-\\uddff]){2}", je = "[\\ud800-\\udbff][\\udc00-\\udfff]", Pe = "[" + Se + "]", $e = "\\u200d", Ve = "(?:" + Ue + "|" + ke + ")", Ge = "(?:" + Pe + "|" + ke + ")", Fe = "(?:['\u2019](?:d|ll|m|re|s|t|ve))?", ze = "(?:['\u2019](?:D|LL|M|RE|S|T|VE))?", We = "(?:" + De + "|" + xe + ")?", qe = "[" + Ne + "]?", Ye = qe + We + "(?:" + $e + "(?:" + [Be, Me, je].join("|") + ")" + qe + We + ")*", He = "(?:" + [Le, Me, je].join("|") + ")" + Ye, Ke = "(?:" + [Be + De + "?", De, Me, je, Oe].join("|") + ")", Xe = RegExp("['\u2019]", "g"), Qe = RegExp(De, "g"), Je = RegExp(xe + "(?=" + xe + ")|" + Ke + Ye, "g"), Ze = RegExp([Pe + "?" + Ue + "+" + Fe + "(?=" + [Ae, Pe, "$"].join("|") + ")", Ge + "+" + ze + "(?=" + [Ae, Pe + Ve, "$"].join("|") + ")", Pe + "?" + Ve + "+" + Fe, Pe + "+" + ze, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Ce, He].join("|"), "g"), et = RegExp("[" + $e + Ee + Ie + Ne + "]"), tt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, rt = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], nt = -1, st = {};
          st[U] = st[k] = st[x] = st[B] = st[M] = st[j] = st[P] = st[$] = st[V] = true, st[m] = st[v] = st[C] = st[b] = st[L] = st[g] = st[y] = st[_] = st[I] = st[w] = st[T] = st[N] = st[R] = st[O] = st[D] = false;
          var it = {};
          it[m] = it[v] = it[C] = it[L] = it[b] = it[g] = it[U] = it[k] = it[x] = it[B] = it[M] = it[I] = it[w] = it[T] = it[N] = it[R] = it[O] = it[A] = it[j] = it[P] = it[$] = it[V] = true, it[y] = it[_] = it[D] = false;
          var at = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, ot = parseFloat, ct = parseInt, ut = "object" == typeof global && global && global.Object === Object && global, lt = "object" == typeof self && self && self.Object === Object && self, ft = ut || lt || Function("return this")(), dt = t2 && !t2.nodeType && t2, ht = dt && e2 && !e2.nodeType && e2, pt = ht && ht.exports === dt, mt = pt && ut.process, vt = function() {
            try {
              return ht && ht.require && ht.require("util").types || mt && mt.binding && mt.binding("util");
            } catch (e3) {
            }
          }(), bt = vt && vt.isArrayBuffer, gt = vt && vt.isDate, yt = vt && vt.isMap, _t = vt && vt.isRegExp, Et = vt && vt.isSet, It = vt && vt.isTypedArray;
          function wt(e3, t3, r3) {
            switch (r3.length) {
              case 0:
                return e3.call(t3);
              case 1:
                return e3.call(t3, r3[0]);
              case 2:
                return e3.call(t3, r3[0], r3[1]);
              case 3:
                return e3.call(t3, r3[0], r3[1], r3[2]);
            }
            return e3.apply(t3, r3);
          }
          function Tt(e3, t3, r3, n3) {
            for (var s3 = -1, i3 = null == e3 ? 0 : e3.length; ++s3 < i3; ) {
              var a2 = e3[s3];
              t3(n3, a2, r3(a2), e3);
            }
            return n3;
          }
          function St(e3, t3) {
            for (var r3 = -1, n3 = null == e3 ? 0 : e3.length; ++r3 < n3 && false !== t3(e3[r3], r3, e3); ) ;
            return e3;
          }
          function Nt(e3, t3) {
            for (var r3 = null == e3 ? 0 : e3.length; r3-- && false !== t3(e3[r3], r3, e3); ) ;
            return e3;
          }
          function Rt(e3, t3) {
            for (var r3 = -1, n3 = null == e3 ? 0 : e3.length; ++r3 < n3; ) if (!t3(e3[r3], r3, e3)) return false;
            return true;
          }
          function Ot(e3, t3) {
            for (var r3 = -1, n3 = null == e3 ? 0 : e3.length, s3 = 0, i3 = []; ++r3 < n3; ) {
              var a2 = e3[r3];
              t3(a2, r3, e3) && (i3[s3++] = a2);
            }
            return i3;
          }
          function At(e3, t3) {
            return !(null == e3 || !e3.length) && Pt(e3, t3, 0) > -1;
          }
          function Dt(e3, t3, r3) {
            for (var n3 = -1, s3 = null == e3 ? 0 : e3.length; ++n3 < s3; ) if (r3(t3, e3[n3])) return true;
            return false;
          }
          function Ct(e3, t3) {
            for (var r3 = -1, n3 = null == e3 ? 0 : e3.length, s3 = Array(n3); ++r3 < n3; ) s3[r3] = t3(e3[r3], r3, e3);
            return s3;
          }
          function Lt(e3, t3) {
            for (var r3 = -1, n3 = t3.length, s3 = e3.length; ++r3 < n3; ) e3[s3 + r3] = t3[r3];
            return e3;
          }
          function Ut(e3, t3, r3, n3) {
            var s3 = -1, i3 = null == e3 ? 0 : e3.length;
            for (n3 && i3 && (r3 = e3[++s3]); ++s3 < i3; ) r3 = t3(r3, e3[s3], s3, e3);
            return r3;
          }
          function kt(e3, t3, r3, n3) {
            var s3 = null == e3 ? 0 : e3.length;
            for (n3 && s3 && (r3 = e3[--s3]); s3--; ) r3 = t3(r3, e3[s3], s3, e3);
            return r3;
          }
          function xt(e3, t3) {
            for (var r3 = -1, n3 = null == e3 ? 0 : e3.length; ++r3 < n3; ) if (t3(e3[r3], r3, e3)) return true;
            return false;
          }
          var Bt = Ft("length");
          function Mt(e3, t3, r3) {
            var n3;
            return r3(e3, function(e4, r4, s3) {
              if (t3(e4, r4, s3)) return n3 = r4, false;
            }), n3;
          }
          function jt(e3, t3, r3, n3) {
            for (var s3 = e3.length, i3 = r3 + (n3 ? 1 : -1); n3 ? i3-- : ++i3 < s3; ) if (t3(e3[i3], i3, e3)) return i3;
            return -1;
          }
          function Pt(e3, t3, r3) {
            return t3 == t3 ? function(e4, t4, r4) {
              for (var n3 = r4 - 1, s3 = e4.length; ++n3 < s3; ) if (e4[n3] === t4) return n3;
              return -1;
            }(e3, t3, r3) : jt(e3, Vt, r3);
          }
          function $t(e3, t3, r3, n3) {
            for (var s3 = r3 - 1, i3 = e3.length; ++s3 < i3; ) if (n3(e3[s3], t3)) return s3;
            return -1;
          }
          function Vt(e3) {
            return e3 != e3;
          }
          function Gt(e3, t3) {
            var r3 = null == e3 ? 0 : e3.length;
            return r3 ? qt(e3, t3) / r3 : d;
          }
          function Ft(e3) {
            return function(t3) {
              return null == t3 ? s2 : t3[e3];
            };
          }
          function zt(e3) {
            return function(t3) {
              return null == e3 ? s2 : e3[t3];
            };
          }
          function Wt(e3, t3, r3, n3, s3) {
            return s3(e3, function(e4, s4, i3) {
              r3 = n3 ? (n3 = false, e4) : t3(r3, e4, s4, i3);
            }), r3;
          }
          function qt(e3, t3) {
            for (var r3, n3 = -1, i3 = e3.length; ++n3 < i3; ) {
              var a2 = t3(e3[n3]);
              a2 !== s2 && (r3 = r3 === s2 ? a2 : r3 + a2);
            }
            return r3;
          }
          function Yt(e3, t3) {
            for (var r3 = -1, n3 = Array(e3); ++r3 < e3; ) n3[r3] = t3(r3);
            return n3;
          }
          function Ht(e3) {
            return e3 ? e3.slice(0, fr(e3) + 1).replace(ne, "") : e3;
          }
          function Kt(e3) {
            return function(t3) {
              return e3(t3);
            };
          }
          function Xt(e3, t3) {
            return Ct(t3, function(t4) {
              return e3[t4];
            });
          }
          function Qt(e3, t3) {
            return e3.has(t3);
          }
          function Jt(e3, t3) {
            for (var r3 = -1, n3 = e3.length; ++r3 < n3 && Pt(t3, e3[r3], 0) > -1; ) ;
            return r3;
          }
          function Zt(e3, t3) {
            for (var r3 = e3.length; r3-- && Pt(t3, e3[r3], 0) > -1; ) ;
            return r3;
          }
          var er = zt({ \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }), tr = zt({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" });
          function rr(e3) {
            return "\\" + at[e3];
          }
          function nr(e3) {
            return et.test(e3);
          }
          function sr(e3) {
            var t3 = -1, r3 = Array(e3.size);
            return e3.forEach(function(e4, n3) {
              r3[++t3] = [n3, e4];
            }), r3;
          }
          function ir(e3, t3) {
            return function(r3) {
              return e3(t3(r3));
            };
          }
          function ar(e3, t3) {
            for (var r3 = -1, n3 = e3.length, s3 = 0, i3 = []; ++r3 < n3; ) {
              var a2 = e3[r3];
              a2 !== t3 && a2 !== o || (e3[r3] = o, i3[s3++] = r3);
            }
            return i3;
          }
          function or(e3) {
            var t3 = -1, r3 = Array(e3.size);
            return e3.forEach(function(e4) {
              r3[++t3] = e4;
            }), r3;
          }
          function cr(e3) {
            var t3 = -1, r3 = Array(e3.size);
            return e3.forEach(function(e4) {
              r3[++t3] = [e4, e4];
            }), r3;
          }
          function ur(e3) {
            return nr(e3) ? function(e4) {
              for (var t3 = Je.lastIndex = 0; Je.test(e4); ) ++t3;
              return t3;
            }(e3) : Bt(e3);
          }
          function lr(e3) {
            return nr(e3) ? function(e4) {
              return e4.match(Je) || [];
            }(e3) : function(e4) {
              return e4.split("");
            }(e3);
          }
          function fr(e3) {
            for (var t3 = e3.length; t3-- && se.test(e3.charAt(t3)); ) ;
            return t3;
          }
          var dr = zt({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }), hr = function e3(t3) {
            var r3, n3 = (t3 = null == t3 ? ft : hr.defaults(ft.Object(), t3, hr.pick(ft, rt))).Array, se2 = t3.Date, Ee2 = t3.Error, Ie2 = t3.Function, we2 = t3.Math, Te2 = t3.Object, Se2 = t3.RegExp, Ne2 = t3.String, Re2 = t3.TypeError, Oe2 = n3.prototype, Ae2 = Ie2.prototype, De2 = Te2.prototype, Ce2 = t3["__core-js_shared__"], Le2 = Ae2.toString, Ue2 = De2.hasOwnProperty, ke2 = 0, xe2 = (r3 = /[^.]+$/.exec(Ce2 && Ce2.keys && Ce2.keys.IE_PROTO || "")) ? "Symbol(src)_1." + r3 : "", Be2 = De2.toString, Me2 = Le2.call(Te2), je2 = ft._, Pe2 = Se2("^" + Le2.call(Ue2).replace(te, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), $e2 = pt ? t3.Buffer : s2, Ve2 = t3.Symbol, Ge2 = t3.Uint8Array, Fe2 = $e2 ? $e2.allocUnsafe : s2, ze2 = ir(Te2.getPrototypeOf, Te2), We2 = Te2.create, qe2 = De2.propertyIsEnumerable, Ye2 = Oe2.splice, He2 = Ve2 ? Ve2.isConcatSpreadable : s2, Ke2 = Ve2 ? Ve2.iterator : s2, Je2 = Ve2 ? Ve2.toStringTag : s2, et2 = function() {
              try {
                var e4 = ci(Te2, "defineProperty");
                return e4({}, "", {}), e4;
              } catch (e5) {
              }
            }(), at2 = t3.clearTimeout !== ft.clearTimeout && t3.clearTimeout, ut2 = se2 && se2.now !== ft.Date.now && se2.now, lt2 = t3.setTimeout !== ft.setTimeout && t3.setTimeout, dt2 = we2.ceil, ht2 = we2.floor, mt2 = Te2.getOwnPropertySymbols, vt2 = $e2 ? $e2.isBuffer : s2, Bt2 = t3.isFinite, zt2 = Oe2.join, pr = ir(Te2.keys, Te2), mr = we2.max, vr = we2.min, br = se2.now, gr = t3.parseInt, yr = we2.random, _r = Oe2.reverse, Er = ci(t3, "DataView"), Ir = ci(t3, "Map"), wr = ci(t3, "Promise"), Tr = ci(t3, "Set"), Sr = ci(t3, "WeakMap"), Nr = ci(Te2, "create"), Rr = Sr && new Sr(), Or = {}, Ar = Bi(Er), Dr = Bi(Ir), Cr = Bi(wr), Lr = Bi(Tr), Ur = Bi(Sr), kr = Ve2 ? Ve2.prototype : s2, xr = kr ? kr.valueOf : s2, Br = kr ? kr.toString : s2;
            function Mr(e4) {
              if (Za(e4) && !Ga(e4) && !(e4 instanceof Vr)) {
                if (e4 instanceof $r) return e4;
                if (Ue2.call(e4, "__wrapped__")) return Mi(e4);
              }
              return new $r(e4);
            }
            var jr = /* @__PURE__ */ function() {
              function e4() {
              }
              return function(t4) {
                if (!Ja(t4)) return {};
                if (We2) return We2(t4);
                e4.prototype = t4;
                var r4 = new e4();
                return e4.prototype = s2, r4;
              };
            }();
            function Pr() {
            }
            function $r(e4, t4) {
              this.__wrapped__ = e4, this.__actions__ = [], this.__chain__ = !!t4, this.__index__ = 0, this.__values__ = s2;
            }
            function Vr(e4) {
              this.__wrapped__ = e4, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = h, this.__views__ = [];
            }
            function Gr(e4) {
              var t4 = -1, r4 = null == e4 ? 0 : e4.length;
              for (this.clear(); ++t4 < r4; ) {
                var n4 = e4[t4];
                this.set(n4[0], n4[1]);
              }
            }
            function Fr(e4) {
              var t4 = -1, r4 = null == e4 ? 0 : e4.length;
              for (this.clear(); ++t4 < r4; ) {
                var n4 = e4[t4];
                this.set(n4[0], n4[1]);
              }
            }
            function zr(e4) {
              var t4 = -1, r4 = null == e4 ? 0 : e4.length;
              for (this.clear(); ++t4 < r4; ) {
                var n4 = e4[t4];
                this.set(n4[0], n4[1]);
              }
            }
            function Wr(e4) {
              var t4 = -1, r4 = null == e4 ? 0 : e4.length;
              for (this.__data__ = new zr(); ++t4 < r4; ) this.add(e4[t4]);
            }
            function qr(e4) {
              var t4 = this.__data__ = new Fr(e4);
              this.size = t4.size;
            }
            function Yr(e4, t4) {
              var r4 = Ga(e4), n4 = !r4 && Va(e4), s3 = !r4 && !n4 && qa(e4), i3 = !r4 && !n4 && !s3 && oo(e4), a2 = r4 || n4 || s3 || i3, o2 = a2 ? Yt(e4.length, Ne2) : [], c2 = o2.length;
              for (var u2 in e4) !t4 && !Ue2.call(e4, u2) || a2 && ("length" == u2 || s3 && ("offset" == u2 || "parent" == u2) || i3 && ("buffer" == u2 || "byteLength" == u2 || "byteOffset" == u2) || mi(u2, c2)) || o2.push(u2);
              return o2;
            }
            function Hr(e4) {
              var t4 = e4.length;
              return t4 ? e4[Wn(0, t4 - 1)] : s2;
            }
            function Kr(e4, t4) {
              return Ci(Ns(e4), sn(t4, 0, e4.length));
            }
            function Xr(e4) {
              return Ci(Ns(e4));
            }
            function Qr(e4, t4, r4) {
              (r4 !== s2 && !ja(e4[t4], r4) || r4 === s2 && !(t4 in e4)) && rn(e4, t4, r4);
            }
            function Jr(e4, t4, r4) {
              var n4 = e4[t4];
              Ue2.call(e4, t4) && ja(n4, r4) && (r4 !== s2 || t4 in e4) || rn(e4, t4, r4);
            }
            function Zr(e4, t4) {
              for (var r4 = e4.length; r4--; ) if (ja(e4[r4][0], t4)) return r4;
              return -1;
            }
            function en(e4, t4, r4, n4) {
              return ln(e4, function(e5, s3, i3) {
                t4(n4, e5, r4(e5), i3);
              }), n4;
            }
            function tn(e4, t4) {
              return e4 && Rs(t4, Do(t4), e4);
            }
            function rn(e4, t4, r4) {
              "__proto__" == t4 && et2 ? et2(e4, t4, { configurable: true, enumerable: true, value: r4, writable: true }) : e4[t4] = r4;
            }
            function nn(e4, t4) {
              for (var r4 = -1, i3 = t4.length, a2 = n3(i3), o2 = null == e4; ++r4 < i3; ) a2[r4] = o2 ? s2 : So(e4, t4[r4]);
              return a2;
            }
            function sn(e4, t4, r4) {
              return e4 == e4 && (r4 !== s2 && (e4 = e4 <= r4 ? e4 : r4), t4 !== s2 && (e4 = e4 >= t4 ? e4 : t4)), e4;
            }
            function an(e4, t4, r4, n4, i3, a2) {
              var o2, c2 = 1 & t4, u2 = 2 & t4, l2 = 4 & t4;
              if (r4 && (o2 = i3 ? r4(e4, n4, i3, a2) : r4(e4)), o2 !== s2) return o2;
              if (!Ja(e4)) return e4;
              var f2 = Ga(e4);
              if (f2) {
                if (o2 = function(e5) {
                  var t5 = e5.length, r5 = new e5.constructor(t5);
                  return t5 && "string" == typeof e5[0] && Ue2.call(e5, "index") && (r5.index = e5.index, r5.input = e5.input), r5;
                }(e4), !c2) return Ns(e4, o2);
              } else {
                var d2 = fi(e4), h2 = d2 == _ || d2 == E;
                if (qa(e4)) return _s(e4, c2);
                if (d2 == T || d2 == m || h2 && !i3) {
                  if (o2 = u2 || h2 ? {} : hi(e4), !c2) return u2 ? function(e5, t5) {
                    return Rs(e5, li(e5), t5);
                  }(e4, function(e5, t5) {
                    return e5 && Rs(t5, Co(t5), e5);
                  }(o2, e4)) : function(e5, t5) {
                    return Rs(e5, ui(e5), t5);
                  }(e4, tn(o2, e4));
                } else {
                  if (!it[d2]) return i3 ? e4 : {};
                  o2 = function(e5, t5, r5) {
                    var n5, s3 = e5.constructor;
                    switch (t5) {
                      case C:
                        return Es(e5);
                      case b:
                      case g:
                        return new s3(+e5);
                      case L:
                        return function(e6, t6) {
                          var r6 = t6 ? Es(e6.buffer) : e6.buffer;
                          return new e6.constructor(r6, e6.byteOffset, e6.byteLength);
                        }(e5, r5);
                      case U:
                      case k:
                      case x:
                      case B:
                      case M:
                      case j:
                      case P:
                      case $:
                      case V:
                        return Is(e5, r5);
                      case I:
                        return new s3();
                      case w:
                      case O:
                        return new s3(e5);
                      case N:
                        return function(e6) {
                          var t6 = new e6.constructor(e6.source, de.exec(e6));
                          return t6.lastIndex = e6.lastIndex, t6;
                        }(e5);
                      case R:
                        return new s3();
                      case A:
                        return n5 = e5, xr ? Te2(xr.call(n5)) : {};
                    }
                  }(e4, d2, c2);
                }
              }
              a2 || (a2 = new qr());
              var p2 = a2.get(e4);
              if (p2) return p2;
              a2.set(e4, o2), so(e4) ? e4.forEach(function(n5) {
                o2.add(an(n5, t4, r4, n5, e4, a2));
              }) : eo(e4) && e4.forEach(function(n5, s3) {
                o2.set(s3, an(n5, t4, r4, s3, e4, a2));
              });
              var v2 = f2 ? s2 : (l2 ? u2 ? ti : ei : u2 ? Co : Do)(e4);
              return St(v2 || e4, function(n5, s3) {
                v2 && (n5 = e4[s3 = n5]), Jr(o2, s3, an(n5, t4, r4, s3, e4, a2));
              }), o2;
            }
            function on(e4, t4, r4) {
              var n4 = r4.length;
              if (null == e4) return !n4;
              for (e4 = Te2(e4); n4--; ) {
                var i3 = r4[n4], a2 = t4[i3], o2 = e4[i3];
                if (o2 === s2 && !(i3 in e4) || !a2(o2)) return false;
              }
              return true;
            }
            function cn(e4, t4, r4) {
              if ("function" != typeof e4) throw new Re2(i2);
              return Ri(function() {
                e4.apply(s2, r4);
              }, t4);
            }
            function un(e4, t4, r4, n4) {
              var s3 = -1, i3 = At, a2 = true, o2 = e4.length, c2 = [], u2 = t4.length;
              if (!o2) return c2;
              r4 && (t4 = Ct(t4, Kt(r4))), n4 ? (i3 = Dt, a2 = false) : t4.length >= 200 && (i3 = Qt, a2 = false, t4 = new Wr(t4));
              e: for (; ++s3 < o2; ) {
                var l2 = e4[s3], f2 = null == r4 ? l2 : r4(l2);
                if (l2 = n4 || 0 !== l2 ? l2 : 0, a2 && f2 == f2) {
                  for (var d2 = u2; d2--; ) if (t4[d2] === f2) continue e;
                  c2.push(l2);
                } else i3(t4, f2, n4) || c2.push(l2);
              }
              return c2;
            }
            Mr.templateSettings = { escape: K, evaluate: X, interpolate: Q, variable: "", imports: { _: Mr } }, Mr.prototype = Pr.prototype, Mr.prototype.constructor = Mr, $r.prototype = jr(Pr.prototype), $r.prototype.constructor = $r, Vr.prototype = jr(Pr.prototype), Vr.prototype.constructor = Vr, Gr.prototype.clear = function() {
              this.__data__ = Nr ? Nr(null) : {}, this.size = 0;
            }, Gr.prototype.delete = function(e4) {
              var t4 = this.has(e4) && delete this.__data__[e4];
              return this.size -= t4 ? 1 : 0, t4;
            }, Gr.prototype.get = function(e4) {
              var t4 = this.__data__;
              if (Nr) {
                var r4 = t4[e4];
                return r4 === a ? s2 : r4;
              }
              return Ue2.call(t4, e4) ? t4[e4] : s2;
            }, Gr.prototype.has = function(e4) {
              var t4 = this.__data__;
              return Nr ? t4[e4] !== s2 : Ue2.call(t4, e4);
            }, Gr.prototype.set = function(e4, t4) {
              var r4 = this.__data__;
              return this.size += this.has(e4) ? 0 : 1, r4[e4] = Nr && t4 === s2 ? a : t4, this;
            }, Fr.prototype.clear = function() {
              this.__data__ = [], this.size = 0;
            }, Fr.prototype.delete = function(e4) {
              var t4 = this.__data__, r4 = Zr(t4, e4);
              return !(r4 < 0 || (r4 == t4.length - 1 ? t4.pop() : Ye2.call(t4, r4, 1), --this.size, 0));
            }, Fr.prototype.get = function(e4) {
              var t4 = this.__data__, r4 = Zr(t4, e4);
              return r4 < 0 ? s2 : t4[r4][1];
            }, Fr.prototype.has = function(e4) {
              return Zr(this.__data__, e4) > -1;
            }, Fr.prototype.set = function(e4, t4) {
              var r4 = this.__data__, n4 = Zr(r4, e4);
              return n4 < 0 ? (++this.size, r4.push([e4, t4])) : r4[n4][1] = t4, this;
            }, zr.prototype.clear = function() {
              this.size = 0, this.__data__ = { hash: new Gr(), map: new (Ir || Fr)(), string: new Gr() };
            }, zr.prototype.delete = function(e4) {
              var t4 = ai(this, e4).delete(e4);
              return this.size -= t4 ? 1 : 0, t4;
            }, zr.prototype.get = function(e4) {
              return ai(this, e4).get(e4);
            }, zr.prototype.has = function(e4) {
              return ai(this, e4).has(e4);
            }, zr.prototype.set = function(e4, t4) {
              var r4 = ai(this, e4), n4 = r4.size;
              return r4.set(e4, t4), this.size += r4.size == n4 ? 0 : 1, this;
            }, Wr.prototype.add = Wr.prototype.push = function(e4) {
              return this.__data__.set(e4, a), this;
            }, Wr.prototype.has = function(e4) {
              return this.__data__.has(e4);
            }, qr.prototype.clear = function() {
              this.__data__ = new Fr(), this.size = 0;
            }, qr.prototype.delete = function(e4) {
              var t4 = this.__data__, r4 = t4.delete(e4);
              return this.size = t4.size, r4;
            }, qr.prototype.get = function(e4) {
              return this.__data__.get(e4);
            }, qr.prototype.has = function(e4) {
              return this.__data__.has(e4);
            }, qr.prototype.set = function(e4, t4) {
              var r4 = this.__data__;
              if (r4 instanceof Fr) {
                var n4 = r4.__data__;
                if (!Ir || n4.length < 199) return n4.push([e4, t4]), this.size = ++r4.size, this;
                r4 = this.__data__ = new zr(n4);
              }
              return r4.set(e4, t4), this.size = r4.size, this;
            };
            var ln = Ds(gn), fn = Ds(yn, true);
            function dn(e4, t4) {
              var r4 = true;
              return ln(e4, function(e5, n4, s3) {
                return r4 = !!t4(e5, n4, s3);
              }), r4;
            }
            function hn(e4, t4, r4) {
              for (var n4 = -1, i3 = e4.length; ++n4 < i3; ) {
                var a2 = e4[n4], o2 = t4(a2);
                if (null != o2 && (c2 === s2 ? o2 == o2 && !ao(o2) : r4(o2, c2))) var c2 = o2, u2 = a2;
              }
              return u2;
            }
            function pn(e4, t4) {
              var r4 = [];
              return ln(e4, function(e5, n4, s3) {
                t4(e5, n4, s3) && r4.push(e5);
              }), r4;
            }
            function mn(e4, t4, r4, n4, s3) {
              var i3 = -1, a2 = e4.length;
              for (r4 || (r4 = pi), s3 || (s3 = []); ++i3 < a2; ) {
                var o2 = e4[i3];
                t4 > 0 && r4(o2) ? t4 > 1 ? mn(o2, t4 - 1, r4, n4, s3) : Lt(s3, o2) : n4 || (s3[s3.length] = o2);
              }
              return s3;
            }
            var vn = Cs(), bn = Cs(true);
            function gn(e4, t4) {
              return e4 && vn(e4, t4, Do);
            }
            function yn(e4, t4) {
              return e4 && bn(e4, t4, Do);
            }
            function _n(e4, t4) {
              return Ot(t4, function(t5) {
                return Ka(e4[t5]);
              });
            }
            function En(e4, t4) {
              for (var r4 = 0, n4 = (t4 = vs(t4, e4)).length; null != e4 && r4 < n4; ) e4 = e4[xi(t4[r4++])];
              return r4 && r4 == n4 ? e4 : s2;
            }
            function In(e4, t4, r4) {
              var n4 = t4(e4);
              return Ga(e4) ? n4 : Lt(n4, r4(e4));
            }
            function wn(e4) {
              return null == e4 ? e4 === s2 ? "[object Undefined]" : "[object Null]" : Je2 && Je2 in Te2(e4) ? function(e5) {
                var t4 = Ue2.call(e5, Je2), r4 = e5[Je2];
                try {
                  e5[Je2] = s2;
                  var n4 = true;
                } catch (e6) {
                }
                var i3 = Be2.call(e5);
                return n4 && (t4 ? e5[Je2] = r4 : delete e5[Je2]), i3;
              }(e4) : function(e5) {
                return Be2.call(e5);
              }(e4);
            }
            function Tn(e4, t4) {
              return e4 > t4;
            }
            function Sn(e4, t4) {
              return null != e4 && Ue2.call(e4, t4);
            }
            function Nn(e4, t4) {
              return null != e4 && t4 in Te2(e4);
            }
            function Rn(e4, t4, r4) {
              for (var i3 = r4 ? Dt : At, a2 = e4[0].length, o2 = e4.length, c2 = o2, u2 = n3(o2), l2 = 1 / 0, f2 = []; c2--; ) {
                var d2 = e4[c2];
                c2 && t4 && (d2 = Ct(d2, Kt(t4))), l2 = vr(d2.length, l2), u2[c2] = !r4 && (t4 || a2 >= 120 && d2.length >= 120) ? new Wr(c2 && d2) : s2;
              }
              d2 = e4[0];
              var h2 = -1, p2 = u2[0];
              e: for (; ++h2 < a2 && f2.length < l2; ) {
                var m2 = d2[h2], v2 = t4 ? t4(m2) : m2;
                if (m2 = r4 || 0 !== m2 ? m2 : 0, !(p2 ? Qt(p2, v2) : i3(f2, v2, r4))) {
                  for (c2 = o2; --c2; ) {
                    var b2 = u2[c2];
                    if (!(b2 ? Qt(b2, v2) : i3(e4[c2], v2, r4))) continue e;
                  }
                  p2 && p2.push(v2), f2.push(m2);
                }
              }
              return f2;
            }
            function On(e4, t4, r4) {
              var n4 = null == (e4 = Ti(e4, t4 = vs(t4, e4))) ? e4 : e4[xi(Hi(t4))];
              return null == n4 ? s2 : wt(n4, e4, r4);
            }
            function An(e4) {
              return Za(e4) && wn(e4) == m;
            }
            function Dn(e4, t4, r4, n4, i3) {
              return e4 === t4 || (null == e4 || null == t4 || !Za(e4) && !Za(t4) ? e4 != e4 && t4 != t4 : function(e5, t5, r5, n5, i4, a2) {
                var o2 = Ga(e5), c2 = Ga(t5), u2 = o2 ? v : fi(e5), l2 = c2 ? v : fi(t5), f2 = (u2 = u2 == m ? T : u2) == T, d2 = (l2 = l2 == m ? T : l2) == T, h2 = u2 == l2;
                if (h2 && qa(e5)) {
                  if (!qa(t5)) return false;
                  o2 = true, f2 = false;
                }
                if (h2 && !f2) return a2 || (a2 = new qr()), o2 || oo(e5) ? Js(e5, t5, r5, n5, i4, a2) : function(e6, t6, r6, n6, s3, i5, a3) {
                  switch (r6) {
                    case L:
                      if (e6.byteLength != t6.byteLength || e6.byteOffset != t6.byteOffset) return false;
                      e6 = e6.buffer, t6 = t6.buffer;
                    case C:
                      return !(e6.byteLength != t6.byteLength || !i5(new Ge2(e6), new Ge2(t6)));
                    case b:
                    case g:
                    case w:
                      return ja(+e6, +t6);
                    case y:
                      return e6.name == t6.name && e6.message == t6.message;
                    case N:
                    case O:
                      return e6 == t6 + "";
                    case I:
                      var o3 = sr;
                    case R:
                      var c3 = 1 & n6;
                      if (o3 || (o3 = or), e6.size != t6.size && !c3) return false;
                      var u3 = a3.get(e6);
                      if (u3) return u3 == t6;
                      n6 |= 2, a3.set(e6, t6);
                      var l3 = Js(o3(e6), o3(t6), n6, s3, i5, a3);
                      return a3.delete(e6), l3;
                    case A:
                      if (xr) return xr.call(e6) == xr.call(t6);
                  }
                  return false;
                }(e5, t5, u2, r5, n5, i4, a2);
                if (!(1 & r5)) {
                  var p2 = f2 && Ue2.call(e5, "__wrapped__"), _2 = d2 && Ue2.call(t5, "__wrapped__");
                  if (p2 || _2) {
                    var E2 = p2 ? e5.value() : e5, S2 = _2 ? t5.value() : t5;
                    return a2 || (a2 = new qr()), i4(E2, S2, r5, n5, a2);
                  }
                }
                return !!h2 && (a2 || (a2 = new qr()), function(e6, t6, r6, n6, i5, a3) {
                  var o3 = 1 & r6, c3 = ei(e6), u3 = c3.length;
                  if (u3 != ei(t6).length && !o3) return false;
                  for (var l3 = u3; l3--; ) {
                    var f3 = c3[l3];
                    if (!(o3 ? f3 in t6 : Ue2.call(t6, f3))) return false;
                  }
                  var d3 = a3.get(e6), h3 = a3.get(t6);
                  if (d3 && h3) return d3 == t6 && h3 == e6;
                  var p3 = true;
                  a3.set(e6, t6), a3.set(t6, e6);
                  for (var m2 = o3; ++l3 < u3; ) {
                    var v2 = e6[f3 = c3[l3]], b2 = t6[f3];
                    if (n6) var g2 = o3 ? n6(b2, v2, f3, t6, e6, a3) : n6(v2, b2, f3, e6, t6, a3);
                    if (!(g2 === s2 ? v2 === b2 || i5(v2, b2, r6, n6, a3) : g2)) {
                      p3 = false;
                      break;
                    }
                    m2 || (m2 = "constructor" == f3);
                  }
                  if (p3 && !m2) {
                    var y2 = e6.constructor, _3 = t6.constructor;
                    y2 == _3 || !("constructor" in e6) || !("constructor" in t6) || "function" == typeof y2 && y2 instanceof y2 && "function" == typeof _3 && _3 instanceof _3 || (p3 = false);
                  }
                  return a3.delete(e6), a3.delete(t6), p3;
                }(e5, t5, r5, n5, i4, a2));
              }(e4, t4, r4, n4, Dn, i3));
            }
            function Cn(e4, t4, r4, n4) {
              var i3 = r4.length, a2 = i3, o2 = !n4;
              if (null == e4) return !a2;
              for (e4 = Te2(e4); i3--; ) {
                var c2 = r4[i3];
                if (o2 && c2[2] ? c2[1] !== e4[c2[0]] : !(c2[0] in e4)) return false;
              }
              for (; ++i3 < a2; ) {
                var u2 = (c2 = r4[i3])[0], l2 = e4[u2], f2 = c2[1];
                if (o2 && c2[2]) {
                  if (l2 === s2 && !(u2 in e4)) return false;
                } else {
                  var d2 = new qr();
                  if (n4) var h2 = n4(l2, f2, u2, e4, t4, d2);
                  if (!(h2 === s2 ? Dn(f2, l2, 3, n4, d2) : h2)) return false;
                }
              }
              return true;
            }
            function Ln(e4) {
              return !(!Ja(e4) || (t4 = e4, xe2 && xe2 in t4)) && (Ka(e4) ? Pe2 : me).test(Bi(e4));
              var t4;
            }
            function Un(e4) {
              return "function" == typeof e4 ? e4 : null == e4 ? rc : "object" == typeof e4 ? Ga(e4) ? jn(e4[0], e4[1]) : Mn(e4) : fc(e4);
            }
            function kn(e4) {
              if (!_i(e4)) return pr(e4);
              var t4 = [];
              for (var r4 in Te2(e4)) Ue2.call(e4, r4) && "constructor" != r4 && t4.push(r4);
              return t4;
            }
            function xn(e4, t4) {
              return e4 < t4;
            }
            function Bn(e4, t4) {
              var r4 = -1, s3 = za(e4) ? n3(e4.length) : [];
              return ln(e4, function(e5, n4, i3) {
                s3[++r4] = t4(e5, n4, i3);
              }), s3;
            }
            function Mn(e4) {
              var t4 = oi(e4);
              return 1 == t4.length && t4[0][2] ? Ii(t4[0][0], t4[0][1]) : function(r4) {
                return r4 === e4 || Cn(r4, e4, t4);
              };
            }
            function jn(e4, t4) {
              return bi(e4) && Ei(t4) ? Ii(xi(e4), t4) : function(r4) {
                var n4 = So(r4, e4);
                return n4 === s2 && n4 === t4 ? No(r4, e4) : Dn(t4, n4, 3);
              };
            }
            function Pn(e4, t4, r4, n4, i3) {
              e4 !== t4 && vn(t4, function(a2, o2) {
                if (i3 || (i3 = new qr()), Ja(a2)) !function(e5, t5, r5, n5, i4, a3, o3) {
                  var c3 = Si(e5, r5), u2 = Si(t5, r5), l2 = o3.get(u2);
                  if (l2) Qr(e5, r5, l2);
                  else {
                    var f2 = a3 ? a3(c3, u2, r5 + "", e5, t5, o3) : s2, d2 = f2 === s2;
                    if (d2) {
                      var h2 = Ga(u2), p2 = !h2 && qa(u2), m2 = !h2 && !p2 && oo(u2);
                      f2 = u2, h2 || p2 || m2 ? Ga(c3) ? f2 = c3 : Wa(c3) ? f2 = Ns(c3) : p2 ? (d2 = false, f2 = _s(u2, true)) : m2 ? (d2 = false, f2 = Is(u2, true)) : f2 = [] : ro(u2) || Va(u2) ? (f2 = c3, Va(c3) ? f2 = vo(c3) : Ja(c3) && !Ka(c3) || (f2 = hi(u2))) : d2 = false;
                    }
                    d2 && (o3.set(u2, f2), i4(f2, u2, n5, a3, o3), o3.delete(u2)), Qr(e5, r5, f2);
                  }
                }(e4, t4, o2, r4, Pn, n4, i3);
                else {
                  var c2 = n4 ? n4(Si(e4, o2), a2, o2 + "", e4, t4, i3) : s2;
                  c2 === s2 && (c2 = a2), Qr(e4, o2, c2);
                }
              }, Co);
            }
            function $n(e4, t4) {
              var r4 = e4.length;
              if (r4) return mi(t4 += t4 < 0 ? r4 : 0, r4) ? e4[t4] : s2;
            }
            function Vn(e4, t4, r4) {
              t4 = t4.length ? Ct(t4, function(e5) {
                return Ga(e5) ? function(t5) {
                  return En(t5, 1 === e5.length ? e5[0] : e5);
                } : e5;
              }) : [rc];
              var n4 = -1;
              t4 = Ct(t4, Kt(ii()));
              var s3 = Bn(e4, function(e5, r5, s4) {
                var i3 = Ct(t4, function(t5) {
                  return t5(e5);
                });
                return { criteria: i3, index: ++n4, value: e5 };
              });
              return function(e5) {
                var t5 = e5.length;
                for (e5.sort(function(e6, t6) {
                  return function(e7, t7, r5) {
                    for (var n5 = -1, s4 = e7.criteria, i3 = t7.criteria, a2 = s4.length, o2 = r5.length; ++n5 < a2; ) {
                      var c2 = ws(s4[n5], i3[n5]);
                      if (c2) return n5 >= o2 ? c2 : c2 * ("desc" == r5[n5] ? -1 : 1);
                    }
                    return e7.index - t7.index;
                  }(e6, t6, r4);
                }); t5--; ) e5[t5] = e5[t5].value;
                return e5;
              }(s3);
            }
            function Gn(e4, t4, r4) {
              for (var n4 = -1, s3 = t4.length, i3 = {}; ++n4 < s3; ) {
                var a2 = t4[n4], o2 = En(e4, a2);
                r4(o2, a2) && Xn(i3, vs(a2, e4), o2);
              }
              return i3;
            }
            function Fn(e4, t4, r4, n4) {
              var s3 = n4 ? $t : Pt, i3 = -1, a2 = t4.length, o2 = e4;
              for (e4 === t4 && (t4 = Ns(t4)), r4 && (o2 = Ct(e4, Kt(r4))); ++i3 < a2; ) for (var c2 = 0, u2 = t4[i3], l2 = r4 ? r4(u2) : u2; (c2 = s3(o2, l2, c2, n4)) > -1; ) o2 !== e4 && Ye2.call(o2, c2, 1), Ye2.call(e4, c2, 1);
              return e4;
            }
            function zn(e4, t4) {
              for (var r4 = e4 ? t4.length : 0, n4 = r4 - 1; r4--; ) {
                var s3 = t4[r4];
                if (r4 == n4 || s3 !== i3) {
                  var i3 = s3;
                  mi(s3) ? Ye2.call(e4, s3, 1) : cs(e4, s3);
                }
              }
              return e4;
            }
            function Wn(e4, t4) {
              return e4 + ht2(yr() * (t4 - e4 + 1));
            }
            function qn(e4, t4) {
              var r4 = "";
              if (!e4 || t4 < 1 || t4 > f) return r4;
              do {
                t4 % 2 && (r4 += e4), (t4 = ht2(t4 / 2)) && (e4 += e4);
              } while (t4);
              return r4;
            }
            function Yn(e4, t4) {
              return Oi(wi(e4, t4, rc), e4 + "");
            }
            function Hn(e4) {
              return Hr(Po(e4));
            }
            function Kn(e4, t4) {
              var r4 = Po(e4);
              return Ci(r4, sn(t4, 0, r4.length));
            }
            function Xn(e4, t4, r4, n4) {
              if (!Ja(e4)) return e4;
              for (var i3 = -1, a2 = (t4 = vs(t4, e4)).length, o2 = a2 - 1, c2 = e4; null != c2 && ++i3 < a2; ) {
                var u2 = xi(t4[i3]), l2 = r4;
                if ("__proto__" === u2 || "constructor" === u2 || "prototype" === u2) return e4;
                if (i3 != o2) {
                  var f2 = c2[u2];
                  (l2 = n4 ? n4(f2, u2, c2) : s2) === s2 && (l2 = Ja(f2) ? f2 : mi(t4[i3 + 1]) ? [] : {});
                }
                Jr(c2, u2, l2), c2 = c2[u2];
              }
              return e4;
            }
            var Qn = Rr ? function(e4, t4) {
              return Rr.set(e4, t4), e4;
            } : rc, Jn = et2 ? function(e4, t4) {
              return et2(e4, "toString", { configurable: true, enumerable: false, value: Zo(t4), writable: true });
            } : rc;
            function Zn(e4) {
              return Ci(Po(e4));
            }
            function es(e4, t4, r4) {
              var s3 = -1, i3 = e4.length;
              t4 < 0 && (t4 = -t4 > i3 ? 0 : i3 + t4), (r4 = r4 > i3 ? i3 : r4) < 0 && (r4 += i3), i3 = t4 > r4 ? 0 : r4 - t4 >>> 0, t4 >>>= 0;
              for (var a2 = n3(i3); ++s3 < i3; ) a2[s3] = e4[s3 + t4];
              return a2;
            }
            function ts(e4, t4) {
              var r4;
              return ln(e4, function(e5, n4, s3) {
                return !(r4 = t4(e5, n4, s3));
              }), !!r4;
            }
            function rs(e4, t4, r4) {
              var n4 = 0, s3 = null == e4 ? n4 : e4.length;
              if ("number" == typeof t4 && t4 == t4 && s3 <= 2147483647) {
                for (; n4 < s3; ) {
                  var i3 = n4 + s3 >>> 1, a2 = e4[i3];
                  null !== a2 && !ao(a2) && (r4 ? a2 <= t4 : a2 < t4) ? n4 = i3 + 1 : s3 = i3;
                }
                return s3;
              }
              return ns(e4, t4, rc, r4);
            }
            function ns(e4, t4, r4, n4) {
              var i3 = 0, a2 = null == e4 ? 0 : e4.length;
              if (0 === a2) return 0;
              for (var o2 = (t4 = r4(t4)) != t4, c2 = null === t4, u2 = ao(t4), l2 = t4 === s2; i3 < a2; ) {
                var f2 = ht2((i3 + a2) / 2), d2 = r4(e4[f2]), h2 = d2 !== s2, p2 = null === d2, m2 = d2 == d2, v2 = ao(d2);
                if (o2) var b2 = n4 || m2;
                else b2 = l2 ? m2 && (n4 || h2) : c2 ? m2 && h2 && (n4 || !p2) : u2 ? m2 && h2 && !p2 && (n4 || !v2) : !p2 && !v2 && (n4 ? d2 <= t4 : d2 < t4);
                b2 ? i3 = f2 + 1 : a2 = f2;
              }
              return vr(a2, 4294967294);
            }
            function ss(e4, t4) {
              for (var r4 = -1, n4 = e4.length, s3 = 0, i3 = []; ++r4 < n4; ) {
                var a2 = e4[r4], o2 = t4 ? t4(a2) : a2;
                if (!r4 || !ja(o2, c2)) {
                  var c2 = o2;
                  i3[s3++] = 0 === a2 ? 0 : a2;
                }
              }
              return i3;
            }
            function is(e4) {
              return "number" == typeof e4 ? e4 : ao(e4) ? d : +e4;
            }
            function as(e4) {
              if ("string" == typeof e4) return e4;
              if (Ga(e4)) return Ct(e4, as) + "";
              if (ao(e4)) return Br ? Br.call(e4) : "";
              var t4 = e4 + "";
              return "0" == t4 && 1 / e4 == -1 / 0 ? "-0" : t4;
            }
            function os(e4, t4, r4) {
              var n4 = -1, s3 = At, i3 = e4.length, a2 = true, o2 = [], c2 = o2;
              if (r4) a2 = false, s3 = Dt;
              else if (i3 >= 200) {
                var u2 = t4 ? null : qs(e4);
                if (u2) return or(u2);
                a2 = false, s3 = Qt, c2 = new Wr();
              } else c2 = t4 ? [] : o2;
              e: for (; ++n4 < i3; ) {
                var l2 = e4[n4], f2 = t4 ? t4(l2) : l2;
                if (l2 = r4 || 0 !== l2 ? l2 : 0, a2 && f2 == f2) {
                  for (var d2 = c2.length; d2--; ) if (c2[d2] === f2) continue e;
                  t4 && c2.push(f2), o2.push(l2);
                } else s3(c2, f2, r4) || (c2 !== o2 && c2.push(f2), o2.push(l2));
              }
              return o2;
            }
            function cs(e4, t4) {
              var r4 = -1, n4 = (t4 = vs(t4, e4)).length;
              if (!n4) return true;
              for (var s3 = null == e4 || "object" != typeof e4 && "function" != typeof e4; ++r4 < n4; ) {
                var i3 = t4[r4];
                if ("string" == typeof i3) {
                  if ("__proto__" === i3 && !Ue2.call(e4, "__proto__")) return false;
                  if ("constructor" === i3 && r4 + 1 < n4 && "string" == typeof t4[r4 + 1] && "prototype" === t4[r4 + 1]) {
                    if (s3 && 0 === r4) continue;
                    return false;
                  }
                }
              }
              var a2 = Ti(e4, t4);
              return null == a2 || delete a2[xi(Hi(t4))];
            }
            function us(e4, t4, r4, n4) {
              return Xn(e4, t4, r4(En(e4, t4)), n4);
            }
            function ls(e4, t4, r4, n4) {
              for (var s3 = e4.length, i3 = n4 ? s3 : -1; (n4 ? i3-- : ++i3 < s3) && t4(e4[i3], i3, e4); ) ;
              return r4 ? es(e4, n4 ? 0 : i3, n4 ? i3 + 1 : s3) : es(e4, n4 ? i3 + 1 : 0, n4 ? s3 : i3);
            }
            function fs2(e4, t4) {
              var r4 = e4;
              return r4 instanceof Vr && (r4 = r4.value()), Ut(t4, function(e5, t5) {
                return t5.func.apply(t5.thisArg, Lt([e5], t5.args));
              }, r4);
            }
            function ds(e4, t4, r4) {
              var s3 = e4.length;
              if (s3 < 2) return s3 ? os(e4[0]) : [];
              for (var i3 = -1, a2 = n3(s3); ++i3 < s3; ) for (var o2 = e4[i3], c2 = -1; ++c2 < s3; ) c2 != i3 && (a2[i3] = un(a2[i3] || o2, e4[c2], t4, r4));
              return os(mn(a2, 1), t4, r4);
            }
            function hs(e4, t4, r4) {
              for (var n4 = -1, i3 = e4.length, a2 = t4.length, o2 = {}; ++n4 < i3; ) {
                var c2 = n4 < a2 ? t4[n4] : s2;
                r4(o2, e4[n4], c2);
              }
              return o2;
            }
            function ps(e4) {
              return Wa(e4) ? e4 : [];
            }
            function ms(e4) {
              return "function" == typeof e4 ? e4 : rc;
            }
            function vs(e4, t4) {
              return Ga(e4) ? e4 : bi(e4, t4) ? [e4] : ki(bo(e4));
            }
            var bs = Yn;
            function gs(e4, t4, r4) {
              var n4 = e4.length;
              return r4 = r4 === s2 ? n4 : r4, !t4 && r4 >= n4 ? e4 : es(e4, t4, r4);
            }
            var ys = at2 || function(e4) {
              return ft.clearTimeout(e4);
            };
            function _s(e4, t4) {
              if (t4) return e4.slice();
              var r4 = e4.length, n4 = Fe2 ? Fe2(r4) : new e4.constructor(r4);
              return e4.copy(n4), n4;
            }
            function Es(e4) {
              var t4 = new e4.constructor(e4.byteLength);
              return new Ge2(t4).set(new Ge2(e4)), t4;
            }
            function Is(e4, t4) {
              var r4 = t4 ? Es(e4.buffer) : e4.buffer;
              return new e4.constructor(r4, e4.byteOffset, e4.length);
            }
            function ws(e4, t4) {
              if (e4 !== t4) {
                var r4 = e4 !== s2, n4 = null === e4, i3 = e4 == e4, a2 = ao(e4), o2 = t4 !== s2, c2 = null === t4, u2 = t4 == t4, l2 = ao(t4);
                if (!c2 && !l2 && !a2 && e4 > t4 || a2 && o2 && u2 && !c2 && !l2 || n4 && o2 && u2 || !r4 && u2 || !i3) return 1;
                if (!n4 && !a2 && !l2 && e4 < t4 || l2 && r4 && i3 && !n4 && !a2 || c2 && r4 && i3 || !o2 && i3 || !u2) return -1;
              }
              return 0;
            }
            function Ts(e4, t4, r4, s3) {
              for (var i3 = -1, a2 = e4.length, o2 = r4.length, c2 = -1, u2 = t4.length, l2 = mr(a2 - o2, 0), f2 = n3(u2 + l2), d2 = !s3; ++c2 < u2; ) f2[c2] = t4[c2];
              for (; ++i3 < o2; ) (d2 || i3 < a2) && (f2[r4[i3]] = e4[i3]);
              for (; l2--; ) f2[c2++] = e4[i3++];
              return f2;
            }
            function Ss(e4, t4, r4, s3) {
              for (var i3 = -1, a2 = e4.length, o2 = -1, c2 = r4.length, u2 = -1, l2 = t4.length, f2 = mr(a2 - c2, 0), d2 = n3(f2 + l2), h2 = !s3; ++i3 < f2; ) d2[i3] = e4[i3];
              for (var p2 = i3; ++u2 < l2; ) d2[p2 + u2] = t4[u2];
              for (; ++o2 < c2; ) (h2 || i3 < a2) && (d2[p2 + r4[o2]] = e4[i3++]);
              return d2;
            }
            function Ns(e4, t4) {
              var r4 = -1, s3 = e4.length;
              for (t4 || (t4 = n3(s3)); ++r4 < s3; ) t4[r4] = e4[r4];
              return t4;
            }
            function Rs(e4, t4, r4, n4) {
              var i3 = !r4;
              r4 || (r4 = {});
              for (var a2 = -1, o2 = t4.length; ++a2 < o2; ) {
                var c2 = t4[a2], u2 = n4 ? n4(r4[c2], e4[c2], c2, r4, e4) : s2;
                u2 === s2 && (u2 = e4[c2]), i3 ? rn(r4, c2, u2) : Jr(r4, c2, u2);
              }
              return r4;
            }
            function Os(e4, t4) {
              return function(r4, n4) {
                var s3 = Ga(r4) ? Tt : en, i3 = t4 ? t4() : {};
                return s3(r4, e4, ii(n4, 2), i3);
              };
            }
            function As(e4) {
              return Yn(function(t4, r4) {
                var n4 = -1, i3 = r4.length, a2 = i3 > 1 ? r4[i3 - 1] : s2, o2 = i3 > 2 ? r4[2] : s2;
                for (a2 = e4.length > 3 && "function" == typeof a2 ? (i3--, a2) : s2, o2 && vi(r4[0], r4[1], o2) && (a2 = i3 < 3 ? s2 : a2, i3 = 1), t4 = Te2(t4); ++n4 < i3; ) {
                  var c2 = r4[n4];
                  c2 && e4(t4, c2, n4, a2);
                }
                return t4;
              });
            }
            function Ds(e4, t4) {
              return function(r4, n4) {
                if (null == r4) return r4;
                if (!za(r4)) return e4(r4, n4);
                for (var s3 = r4.length, i3 = t4 ? s3 : -1, a2 = Te2(r4); (t4 ? i3-- : ++i3 < s3) && false !== n4(a2[i3], i3, a2); ) ;
                return r4;
              };
            }
            function Cs(e4) {
              return function(t4, r4, n4) {
                for (var s3 = -1, i3 = Te2(t4), a2 = n4(t4), o2 = a2.length; o2--; ) {
                  var c2 = a2[e4 ? o2 : ++s3];
                  if (false === r4(i3[c2], c2, i3)) break;
                }
                return t4;
              };
            }
            function Ls(e4) {
              return function(t4) {
                var r4 = nr(t4 = bo(t4)) ? lr(t4) : s2, n4 = r4 ? r4[0] : t4.charAt(0), i3 = r4 ? gs(r4, 1).join("") : t4.slice(1);
                return n4[e4]() + i3;
              };
            }
            function Us(e4) {
              return function(t4) {
                return Ut(Xo(Go(t4).replace(Xe, "")), e4, "");
              };
            }
            function ks(e4) {
              return function() {
                var t4 = arguments;
                switch (t4.length) {
                  case 0:
                    return new e4();
                  case 1:
                    return new e4(t4[0]);
                  case 2:
                    return new e4(t4[0], t4[1]);
                  case 3:
                    return new e4(t4[0], t4[1], t4[2]);
                  case 4:
                    return new e4(t4[0], t4[1], t4[2], t4[3]);
                  case 5:
                    return new e4(t4[0], t4[1], t4[2], t4[3], t4[4]);
                  case 6:
                    return new e4(t4[0], t4[1], t4[2], t4[3], t4[4], t4[5]);
                  case 7:
                    return new e4(t4[0], t4[1], t4[2], t4[3], t4[4], t4[5], t4[6]);
                }
                var r4 = jr(e4.prototype), n4 = e4.apply(r4, t4);
                return Ja(n4) ? n4 : r4;
              };
            }
            function xs(e4) {
              return function(t4, r4, n4) {
                var i3 = Te2(t4);
                if (!za(t4)) {
                  var a2 = ii(r4, 3);
                  t4 = Do(t4), r4 = function(e5) {
                    return a2(i3[e5], e5, i3);
                  };
                }
                var o2 = e4(t4, r4, n4);
                return o2 > -1 ? i3[a2 ? t4[o2] : o2] : s2;
              };
            }
            function Bs(e4) {
              return Zs(function(t4) {
                var r4 = t4.length, n4 = r4, a2 = $r.prototype.thru;
                for (e4 && t4.reverse(); n4--; ) {
                  var o2 = t4[n4];
                  if ("function" != typeof o2) throw new Re2(i2);
                  if (a2 && !c2 && "wrapper" == ni(o2)) var c2 = new $r([], true);
                }
                for (n4 = c2 ? n4 : r4; ++n4 < r4; ) {
                  var u2 = ni(o2 = t4[n4]), l2 = "wrapper" == u2 ? ri(o2) : s2;
                  c2 = l2 && gi(l2[0]) && 424 == l2[1] && !l2[4].length && 1 == l2[9] ? c2[ni(l2[0])].apply(c2, l2[3]) : 1 == o2.length && gi(o2) ? c2[u2]() : c2.thru(o2);
                }
                return function() {
                  var e5 = arguments, n5 = e5[0];
                  if (c2 && 1 == e5.length && Ga(n5)) return c2.plant(n5).value();
                  for (var s3 = 0, i3 = r4 ? t4[s3].apply(this, e5) : n5; ++s3 < r4; ) i3 = t4[s3].call(this, i3);
                  return i3;
                };
              });
            }
            function Ms(e4, t4, r4, i3, a2, o2, c2, l2, f2, d2) {
              var h2 = t4 & u, p2 = 1 & t4, m2 = 2 & t4, v2 = 24 & t4, b2 = 512 & t4, g2 = m2 ? s2 : ks(e4);
              return function u2() {
                for (var y2 = arguments.length, _2 = n3(y2), E2 = y2; E2--; ) _2[E2] = arguments[E2];
                if (v2) var I2 = si(u2), w2 = function(e5, t5) {
                  for (var r5 = e5.length, n4 = 0; r5--; ) e5[r5] === t5 && ++n4;
                  return n4;
                }(_2, I2);
                if (i3 && (_2 = Ts(_2, i3, a2, v2)), o2 && (_2 = Ss(_2, o2, c2, v2)), y2 -= w2, v2 && y2 < d2) {
                  var T2 = ar(_2, I2);
                  return zs(e4, t4, Ms, u2.placeholder, r4, _2, T2, l2, f2, d2 - y2);
                }
                var S2 = p2 ? r4 : this, N2 = m2 ? S2[e4] : e4;
                return y2 = _2.length, l2 ? _2 = function(e5, t5) {
                  for (var r5 = e5.length, n4 = vr(t5.length, r5), i4 = Ns(e5); n4--; ) {
                    var a3 = t5[n4];
                    e5[n4] = mi(a3, r5) ? i4[a3] : s2;
                  }
                  return e5;
                }(_2, l2) : b2 && y2 > 1 && _2.reverse(), h2 && f2 < y2 && (_2.length = f2), this && this !== ft && this instanceof u2 && (N2 = g2 || ks(N2)), N2.apply(S2, _2);
              };
            }
            function js(e4, t4) {
              return function(r4, n4) {
                return function(e5, t5, r5, n5) {
                  return gn(e5, function(e6, s3, i3) {
                    t5(n5, r5(e6), s3, i3);
                  }), n5;
                }(r4, e4, t4(n4), {});
              };
            }
            function Ps(e4, t4) {
              return function(r4, n4) {
                var i3;
                if (r4 === s2 && n4 === s2) return t4;
                if (r4 !== s2 && (i3 = r4), n4 !== s2) {
                  if (i3 === s2) return n4;
                  "string" == typeof r4 || "string" == typeof n4 ? (r4 = as(r4), n4 = as(n4)) : (r4 = is(r4), n4 = is(n4)), i3 = e4(r4, n4);
                }
                return i3;
              };
            }
            function $s(e4) {
              return Zs(function(t4) {
                return t4 = Ct(t4, Kt(ii())), Yn(function(r4) {
                  var n4 = this;
                  return e4(t4, function(e5) {
                    return wt(e5, n4, r4);
                  });
                });
              });
            }
            function Vs(e4, t4) {
              var r4 = (t4 = t4 === s2 ? " " : as(t4)).length;
              if (r4 < 2) return r4 ? qn(t4, e4) : t4;
              var n4 = qn(t4, dt2(e4 / ur(t4)));
              return nr(t4) ? gs(lr(n4), 0, e4).join("") : n4.slice(0, e4);
            }
            function Gs(e4) {
              return function(t4, r4, i3) {
                return i3 && "number" != typeof i3 && vi(t4, r4, i3) && (r4 = i3 = s2), t4 = fo(t4), r4 === s2 ? (r4 = t4, t4 = 0) : r4 = fo(r4), function(e5, t5, r5, s3) {
                  for (var i4 = -1, a2 = mr(dt2((t5 - e5) / (r5 || 1)), 0), o2 = n3(a2); a2--; ) o2[s3 ? a2 : ++i4] = e5, e5 += r5;
                  return o2;
                }(t4, r4, i3 = i3 === s2 ? t4 < r4 ? 1 : -1 : fo(i3), e4);
              };
            }
            function Fs(e4) {
              return function(t4, r4) {
                return "string" == typeof t4 && "string" == typeof r4 || (t4 = mo(t4), r4 = mo(r4)), e4(t4, r4);
              };
            }
            function zs(e4, t4, r4, n4, i3, a2, o2, u2, l2, f2) {
              var d2 = 8 & t4;
              t4 |= d2 ? c : 64, 4 & (t4 &= ~(d2 ? 64 : c)) || (t4 &= -4);
              var h2 = [e4, t4, i3, d2 ? a2 : s2, d2 ? o2 : s2, d2 ? s2 : a2, d2 ? s2 : o2, u2, l2, f2], p2 = r4.apply(s2, h2);
              return gi(e4) && Ni(p2, h2), p2.placeholder = n4, Ai(p2, e4, t4);
            }
            function Ws(e4) {
              var t4 = we2[e4];
              return function(e5, r4) {
                if (e5 = mo(e5), (r4 = null == r4 ? 0 : vr(ho(r4), 292)) && Bt2(e5)) {
                  var n4 = (bo(e5) + "e").split("e");
                  return +((n4 = (bo(t4(n4[0] + "e" + (+n4[1] + r4))) + "e").split("e"))[0] + "e" + (+n4[1] - r4));
                }
                return t4(e5);
              };
            }
            var qs = Tr && 1 / or(new Tr([, -0]))[1] == l ? function(e4) {
              return new Tr(e4);
            } : oc;
            function Ys(e4) {
              return function(t4) {
                var r4 = fi(t4);
                return r4 == I ? sr(t4) : r4 == R ? cr(t4) : function(e5, t5) {
                  return Ct(t5, function(t6) {
                    return [t6, e5[t6]];
                  });
                }(t4, e4(t4));
              };
            }
            function Hs(e4, t4, r4, a2, l2, f2, d2, h2) {
              var p2 = 2 & t4;
              if (!p2 && "function" != typeof e4) throw new Re2(i2);
              var m2 = a2 ? a2.length : 0;
              if (m2 || (t4 &= -97, a2 = l2 = s2), d2 = d2 === s2 ? d2 : mr(ho(d2), 0), h2 = h2 === s2 ? h2 : ho(h2), m2 -= l2 ? l2.length : 0, 64 & t4) {
                var v2 = a2, b2 = l2;
                a2 = l2 = s2;
              }
              var g2 = p2 ? s2 : ri(e4), y2 = [e4, t4, r4, a2, l2, v2, b2, f2, d2, h2];
              if (g2 && function(e5, t5) {
                var r5 = e5[1], n4 = t5[1], s3 = r5 | n4, i3 = s3 < 131, a3 = n4 == u && 8 == r5 || n4 == u && 256 == r5 && e5[7].length <= t5[8] || 384 == n4 && t5[7].length <= t5[8] && 8 == r5;
                if (!i3 && !a3) return e5;
                1 & n4 && (e5[2] = t5[2], s3 |= 1 & r5 ? 0 : 4);
                var c2 = t5[3];
                if (c2) {
                  var l3 = e5[3];
                  e5[3] = l3 ? Ts(l3, c2, t5[4]) : c2, e5[4] = l3 ? ar(e5[3], o) : t5[4];
                }
                (c2 = t5[5]) && (l3 = e5[5], e5[5] = l3 ? Ss(l3, c2, t5[6]) : c2, e5[6] = l3 ? ar(e5[5], o) : t5[6]), (c2 = t5[7]) && (e5[7] = c2), n4 & u && (e5[8] = null == e5[8] ? t5[8] : vr(e5[8], t5[8])), null == e5[9] && (e5[9] = t5[9]), e5[0] = t5[0], e5[1] = s3;
              }(y2, g2), e4 = y2[0], t4 = y2[1], r4 = y2[2], a2 = y2[3], l2 = y2[4], !(h2 = y2[9] = y2[9] === s2 ? p2 ? 0 : e4.length : mr(y2[9] - m2, 0)) && 24 & t4 && (t4 &= -25), t4 && 1 != t4) _2 = 8 == t4 || 16 == t4 ? function(e5, t5, r5) {
                var i3 = ks(e5);
                return function a3() {
                  for (var o2 = arguments.length, c2 = n3(o2), u2 = o2, l3 = si(a3); u2--; ) c2[u2] = arguments[u2];
                  var f3 = o2 < 3 && c2[0] !== l3 && c2[o2 - 1] !== l3 ? [] : ar(c2, l3);
                  return (o2 -= f3.length) < r5 ? zs(e5, t5, Ms, a3.placeholder, s2, c2, f3, s2, s2, r5 - o2) : wt(this && this !== ft && this instanceof a3 ? i3 : e5, this, c2);
                };
              }(e4, t4, h2) : t4 != c && 33 != t4 || l2.length ? Ms.apply(s2, y2) : function(e5, t5, r5, s3) {
                var i3 = 1 & t5, a3 = ks(e5);
                return function t6() {
                  for (var o2 = -1, c2 = arguments.length, u2 = -1, l3 = s3.length, f3 = n3(l3 + c2), d3 = this && this !== ft && this instanceof t6 ? a3 : e5; ++u2 < l3; ) f3[u2] = s3[u2];
                  for (; c2--; ) f3[u2++] = arguments[++o2];
                  return wt(d3, i3 ? r5 : this, f3);
                };
              }(e4, t4, r4, a2);
              else var _2 = function(e5, t5, r5) {
                var n4 = 1 & t5, s3 = ks(e5);
                return function t6() {
                  return (this && this !== ft && this instanceof t6 ? s3 : e5).apply(n4 ? r5 : this, arguments);
                };
              }(e4, t4, r4);
              return Ai((g2 ? Qn : Ni)(_2, y2), e4, t4);
            }
            function Ks(e4, t4, r4, n4) {
              return e4 === s2 || ja(e4, De2[r4]) && !Ue2.call(n4, r4) ? t4 : e4;
            }
            function Xs(e4, t4, r4, n4, i3, a2) {
              return Ja(e4) && Ja(t4) && (a2.set(t4, e4), Pn(e4, t4, s2, Xs, a2), a2.delete(t4)), e4;
            }
            function Qs(e4) {
              return ro(e4) ? s2 : e4;
            }
            function Js(e4, t4, r4, n4, i3, a2) {
              var o2 = 1 & r4, c2 = e4.length, u2 = t4.length;
              if (c2 != u2 && !(o2 && u2 > c2)) return false;
              var l2 = a2.get(e4), f2 = a2.get(t4);
              if (l2 && f2) return l2 == t4 && f2 == e4;
              var d2 = -1, h2 = true, p2 = 2 & r4 ? new Wr() : s2;
              for (a2.set(e4, t4), a2.set(t4, e4); ++d2 < c2; ) {
                var m2 = e4[d2], v2 = t4[d2];
                if (n4) var b2 = o2 ? n4(v2, m2, d2, t4, e4, a2) : n4(m2, v2, d2, e4, t4, a2);
                if (b2 !== s2) {
                  if (b2) continue;
                  h2 = false;
                  break;
                }
                if (p2) {
                  if (!xt(t4, function(e5, t5) {
                    if (!Qt(p2, t5) && (m2 === e5 || i3(m2, e5, r4, n4, a2))) return p2.push(t5);
                  })) {
                    h2 = false;
                    break;
                  }
                } else if (m2 !== v2 && !i3(m2, v2, r4, n4, a2)) {
                  h2 = false;
                  break;
                }
              }
              return a2.delete(e4), a2.delete(t4), h2;
            }
            function Zs(e4) {
              return Oi(wi(e4, s2, Fi), e4 + "");
            }
            function ei(e4) {
              return In(e4, Do, ui);
            }
            function ti(e4) {
              return In(e4, Co, li);
            }
            var ri = Rr ? function(e4) {
              return Rr.get(e4);
            } : oc;
            function ni(e4) {
              for (var t4 = e4.name + "", r4 = Or[t4], n4 = Ue2.call(Or, t4) ? r4.length : 0; n4--; ) {
                var s3 = r4[n4], i3 = s3.func;
                if (null == i3 || i3 == e4) return s3.name;
              }
              return t4;
            }
            function si(e4) {
              return (Ue2.call(Mr, "placeholder") ? Mr : e4).placeholder;
            }
            function ii() {
              var e4 = Mr.iteratee || nc;
              return e4 = e4 === nc ? Un : e4, arguments.length ? e4(arguments[0], arguments[1]) : e4;
            }
            function ai(e4, t4) {
              var r4, n4, s3 = e4.__data__;
              return ("string" == (n4 = typeof (r4 = t4)) || "number" == n4 || "symbol" == n4 || "boolean" == n4 ? "__proto__" !== r4 : null === r4) ? s3["string" == typeof t4 ? "string" : "hash"] : s3.map;
            }
            function oi(e4) {
              for (var t4 = Do(e4), r4 = t4.length; r4--; ) {
                var n4 = t4[r4], s3 = e4[n4];
                t4[r4] = [n4, s3, Ei(s3)];
              }
              return t4;
            }
            function ci(e4, t4) {
              var r4 = function(e5, t5) {
                return null == e5 ? s2 : e5[t5];
              }(e4, t4);
              return Ln(r4) ? r4 : s2;
            }
            var ui = mt2 ? function(e4) {
              return null == e4 ? [] : (e4 = Te2(e4), Ot(mt2(e4), function(t4) {
                return qe2.call(e4, t4);
              }));
            } : pc, li = mt2 ? function(e4) {
              for (var t4 = []; e4; ) Lt(t4, ui(e4)), e4 = ze2(e4);
              return t4;
            } : pc, fi = wn;
            function di(e4, t4, r4) {
              for (var n4 = -1, s3 = (t4 = vs(t4, e4)).length, i3 = false; ++n4 < s3; ) {
                var a2 = xi(t4[n4]);
                if (!(i3 = null != e4 && r4(e4, a2))) break;
                e4 = e4[a2];
              }
              return i3 || ++n4 != s3 ? i3 : !!(s3 = null == e4 ? 0 : e4.length) && Qa(s3) && mi(a2, s3) && (Ga(e4) || Va(e4));
            }
            function hi(e4) {
              return "function" != typeof e4.constructor || _i(e4) ? {} : jr(ze2(e4));
            }
            function pi(e4) {
              return Ga(e4) || Va(e4) || !!(He2 && e4 && e4[He2]);
            }
            function mi(e4, t4) {
              var r4 = typeof e4;
              return !!(t4 = null == t4 ? f : t4) && ("number" == r4 || "symbol" != r4 && be.test(e4)) && e4 > -1 && e4 % 1 == 0 && e4 < t4;
            }
            function vi(e4, t4, r4) {
              if (!Ja(r4)) return false;
              var n4 = typeof t4;
              return !!("number" == n4 ? za(r4) && mi(t4, r4.length) : "string" == n4 && t4 in r4) && ja(r4[t4], e4);
            }
            function bi(e4, t4) {
              if (Ga(e4)) return false;
              var r4 = typeof e4;
              return !("number" != r4 && "symbol" != r4 && "boolean" != r4 && null != e4 && !ao(e4)) || Z.test(e4) || !J.test(e4) || null != t4 && e4 in Te2(t4);
            }
            function gi(e4) {
              var t4 = ni(e4), r4 = Mr[t4];
              if ("function" != typeof r4 || !(t4 in Vr.prototype)) return false;
              if (e4 === r4) return true;
              var n4 = ri(r4);
              return !!n4 && e4 === n4[0];
            }
            (Er && fi(new Er(new ArrayBuffer(1))) != L || Ir && fi(new Ir()) != I || wr && fi(wr.resolve()) != S || Tr && fi(new Tr()) != R || Sr && fi(new Sr()) != D) && (fi = function(e4) {
              var t4 = wn(e4), r4 = t4 == T ? e4.constructor : s2, n4 = r4 ? Bi(r4) : "";
              if (n4) switch (n4) {
                case Ar:
                  return L;
                case Dr:
                  return I;
                case Cr:
                  return S;
                case Lr:
                  return R;
                case Ur:
                  return D;
              }
              return t4;
            });
            var yi = Ce2 ? Ka : mc;
            function _i(e4) {
              var t4 = e4 && e4.constructor;
              return e4 === ("function" == typeof t4 && t4.prototype || De2);
            }
            function Ei(e4) {
              return e4 == e4 && !Ja(e4);
            }
            function Ii(e4, t4) {
              return function(r4) {
                return null != r4 && r4[e4] === t4 && (t4 !== s2 || e4 in Te2(r4));
              };
            }
            function wi(e4, t4, r4) {
              return t4 = mr(t4 === s2 ? e4.length - 1 : t4, 0), function() {
                for (var s3 = arguments, i3 = -1, a2 = mr(s3.length - t4, 0), o2 = n3(a2); ++i3 < a2; ) o2[i3] = s3[t4 + i3];
                i3 = -1;
                for (var c2 = n3(t4 + 1); ++i3 < t4; ) c2[i3] = s3[i3];
                return c2[t4] = r4(o2), wt(e4, this, c2);
              };
            }
            function Ti(e4, t4) {
              return t4.length < 2 ? e4 : En(e4, es(t4, 0, -1));
            }
            function Si(e4, t4) {
              if (("constructor" !== t4 || "function" != typeof e4[t4]) && "__proto__" != t4) return e4[t4];
            }
            var Ni = Di(Qn), Ri = lt2 || function(e4, t4) {
              return ft.setTimeout(e4, t4);
            }, Oi = Di(Jn);
            function Ai(e4, t4, r4) {
              var n4 = t4 + "";
              return Oi(e4, function(e5, t5) {
                var r5 = t5.length;
                if (!r5) return e5;
                var n5 = r5 - 1;
                return t5[n5] = (r5 > 1 ? "& " : "") + t5[n5], t5 = t5.join(r5 > 2 ? ", " : " "), e5.replace(ie, "{\n/* [wrapped with " + t5 + "] */\n");
              }(n4, function(e5, t5) {
                return St(p, function(r5) {
                  var n5 = "_." + r5[0];
                  t5 & r5[1] && !At(e5, n5) && e5.push(n5);
                }), e5.sort();
              }(function(e5) {
                var t5 = e5.match(ae);
                return t5 ? t5[1].split(oe) : [];
              }(n4), r4)));
            }
            function Di(e4) {
              var t4 = 0, r4 = 0;
              return function() {
                var n4 = br(), i3 = 16 - (n4 - r4);
                if (r4 = n4, i3 > 0) {
                  if (++t4 >= 800) return arguments[0];
                } else t4 = 0;
                return e4.apply(s2, arguments);
              };
            }
            function Ci(e4, t4) {
              var r4 = -1, n4 = e4.length, i3 = n4 - 1;
              for (t4 = t4 === s2 ? n4 : t4; ++r4 < t4; ) {
                var a2 = Wn(r4, i3), o2 = e4[a2];
                e4[a2] = e4[r4], e4[r4] = o2;
              }
              return e4.length = t4, e4;
            }
            var Li, Ui, ki = (Li = La(function(e4) {
              var t4 = [];
              return 46 === e4.charCodeAt(0) && t4.push(""), e4.replace(ee, function(e5, r4, n4, s3) {
                t4.push(n4 ? s3.replace(le, "$1") : r4 || e5);
              }), t4;
            }, function(e4) {
              return 500 === Ui.size && Ui.clear(), e4;
            }), Ui = Li.cache, Li);
            function xi(e4) {
              if ("string" == typeof e4 || ao(e4)) return e4;
              var t4 = e4 + "";
              return "0" == t4 && 1 / e4 == -1 / 0 ? "-0" : t4;
            }
            function Bi(e4) {
              if (null != e4) {
                try {
                  return Le2.call(e4);
                } catch (e5) {
                }
                try {
                  return e4 + "";
                } catch (e5) {
                }
              }
              return "";
            }
            function Mi(e4) {
              if (e4 instanceof Vr) return e4.clone();
              var t4 = new $r(e4.__wrapped__, e4.__chain__);
              return t4.__actions__ = Ns(e4.__actions__), t4.__index__ = e4.__index__, t4.__values__ = e4.__values__, t4;
            }
            var ji = Yn(function(e4, t4) {
              return Wa(e4) ? un(e4, mn(t4, 1, Wa, true)) : [];
            }), Pi = Yn(function(e4, t4) {
              var r4 = Hi(t4);
              return Wa(r4) && (r4 = s2), Wa(e4) ? un(e4, mn(t4, 1, Wa, true), ii(r4, 2)) : [];
            }), $i = Yn(function(e4, t4) {
              var r4 = Hi(t4);
              return Wa(r4) && (r4 = s2), Wa(e4) ? un(e4, mn(t4, 1, Wa, true), s2, r4) : [];
            });
            function Vi(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              if (!n4) return -1;
              var s3 = null == r4 ? 0 : ho(r4);
              return s3 < 0 && (s3 = mr(n4 + s3, 0)), jt(e4, ii(t4, 3), s3);
            }
            function Gi(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              if (!n4) return -1;
              var i3 = n4 - 1;
              return r4 !== s2 && (i3 = ho(r4), i3 = r4 < 0 ? mr(n4 + i3, 0) : vr(i3, n4 - 1)), jt(e4, ii(t4, 3), i3, true);
            }
            function Fi(e4) {
              return null != e4 && e4.length ? mn(e4, 1) : [];
            }
            function zi(e4) {
              return e4 && e4.length ? e4[0] : s2;
            }
            var Wi = Yn(function(e4) {
              var t4 = Ct(e4, ps);
              return t4.length && t4[0] === e4[0] ? Rn(t4) : [];
            }), qi = Yn(function(e4) {
              var t4 = Hi(e4), r4 = Ct(e4, ps);
              return t4 === Hi(r4) ? t4 = s2 : r4.pop(), r4.length && r4[0] === e4[0] ? Rn(r4, ii(t4, 2)) : [];
            }), Yi = Yn(function(e4) {
              var t4 = Hi(e4), r4 = Ct(e4, ps);
              return (t4 = "function" == typeof t4 ? t4 : s2) && r4.pop(), r4.length && r4[0] === e4[0] ? Rn(r4, s2, t4) : [];
            });
            function Hi(e4) {
              var t4 = null == e4 ? 0 : e4.length;
              return t4 ? e4[t4 - 1] : s2;
            }
            var Ki = Yn(Xi);
            function Xi(e4, t4) {
              return e4 && e4.length && t4 && t4.length ? Fn(e4, t4) : e4;
            }
            var Qi = Zs(function(e4, t4) {
              var r4 = null == e4 ? 0 : e4.length, n4 = nn(e4, t4);
              return zn(e4, Ct(t4, function(e5) {
                return mi(e5, r4) ? +e5 : e5;
              }).sort(ws)), n4;
            });
            function Ji(e4) {
              return null == e4 ? e4 : _r.call(e4);
            }
            var Zi = Yn(function(e4) {
              return os(mn(e4, 1, Wa, true));
            }), ea = Yn(function(e4) {
              var t4 = Hi(e4);
              return Wa(t4) && (t4 = s2), os(mn(e4, 1, Wa, true), ii(t4, 2));
            }), ta = Yn(function(e4) {
              var t4 = Hi(e4);
              return t4 = "function" == typeof t4 ? t4 : s2, os(mn(e4, 1, Wa, true), s2, t4);
            });
            function ra(e4) {
              if (!e4 || !e4.length) return [];
              var t4 = 0;
              return e4 = Ot(e4, function(e5) {
                if (Wa(e5)) return t4 = mr(e5.length, t4), true;
              }), Yt(t4, function(t5) {
                return Ct(e4, Ft(t5));
              });
            }
            function na(e4, t4) {
              if (!e4 || !e4.length) return [];
              var r4 = ra(e4);
              return null == t4 ? r4 : Ct(r4, function(e5) {
                return wt(t4, s2, e5);
              });
            }
            var sa = Yn(function(e4, t4) {
              return Wa(e4) ? un(e4, t4) : [];
            }), ia = Yn(function(e4) {
              return ds(Ot(e4, Wa));
            }), aa = Yn(function(e4) {
              var t4 = Hi(e4);
              return Wa(t4) && (t4 = s2), ds(Ot(e4, Wa), ii(t4, 2));
            }), oa = Yn(function(e4) {
              var t4 = Hi(e4);
              return t4 = "function" == typeof t4 ? t4 : s2, ds(Ot(e4, Wa), s2, t4);
            }), ca = Yn(ra), ua = Yn(function(e4) {
              var t4 = e4.length, r4 = t4 > 1 ? e4[t4 - 1] : s2;
              return r4 = "function" == typeof r4 ? (e4.pop(), r4) : s2, na(e4, r4);
            });
            function la(e4) {
              var t4 = Mr(e4);
              return t4.__chain__ = true, t4;
            }
            function fa(e4, t4) {
              return t4(e4);
            }
            var da = Zs(function(e4) {
              var t4 = e4.length, r4 = t4 ? e4[0] : 0, n4 = this.__wrapped__, i3 = function(t5) {
                return nn(t5, e4);
              };
              return !(t4 > 1 || this.__actions__.length) && n4 instanceof Vr && mi(r4) ? ((n4 = n4.slice(r4, +r4 + (t4 ? 1 : 0))).__actions__.push({ func: fa, args: [i3], thisArg: s2 }), new $r(n4, this.__chain__).thru(function(e5) {
                return t4 && !e5.length && e5.push(s2), e5;
              })) : this.thru(i3);
            }), ha = Os(function(e4, t4, r4) {
              Ue2.call(e4, r4) ? ++e4[r4] : rn(e4, r4, 1);
            }), pa = xs(Vi), ma = xs(Gi);
            function va(e4, t4) {
              return (Ga(e4) ? St : ln)(e4, ii(t4, 3));
            }
            function ba(e4, t4) {
              return (Ga(e4) ? Nt : fn)(e4, ii(t4, 3));
            }
            var ga = Os(function(e4, t4, r4) {
              Ue2.call(e4, r4) ? e4[r4].push(t4) : rn(e4, r4, [t4]);
            }), ya = Yn(function(e4, t4, r4) {
              var s3 = -1, i3 = "function" == typeof t4, a2 = za(e4) ? n3(e4.length) : [];
              return ln(e4, function(e5) {
                a2[++s3] = i3 ? wt(t4, e5, r4) : On(e5, t4, r4);
              }), a2;
            }), _a = Os(function(e4, t4, r4) {
              rn(e4, r4, t4);
            });
            function Ea(e4, t4) {
              return (Ga(e4) ? Ct : Bn)(e4, ii(t4, 3));
            }
            var Ia = Os(function(e4, t4, r4) {
              e4[r4 ? 0 : 1].push(t4);
            }, function() {
              return [[], []];
            }), wa = Yn(function(e4, t4) {
              if (null == e4) return [];
              var r4 = t4.length;
              return r4 > 1 && vi(e4, t4[0], t4[1]) ? t4 = [] : r4 > 2 && vi(t4[0], t4[1], t4[2]) && (t4 = [t4[0]]), Vn(e4, mn(t4, 1), []);
            }), Ta = ut2 || function() {
              return ft.Date.now();
            };
            function Sa(e4, t4, r4) {
              return t4 = r4 ? s2 : t4, t4 = e4 && null == t4 ? e4.length : t4, Hs(e4, u, s2, s2, s2, s2, t4);
            }
            function Na(e4, t4) {
              var r4;
              if ("function" != typeof t4) throw new Re2(i2);
              return e4 = ho(e4), function() {
                return --e4 > 0 && (r4 = t4.apply(this, arguments)), e4 <= 1 && (t4 = s2), r4;
              };
            }
            var Ra = Yn(function(e4, t4, r4) {
              var n4 = 1;
              if (r4.length) {
                var s3 = ar(r4, si(Ra));
                n4 |= c;
              }
              return Hs(e4, n4, t4, r4, s3);
            }), Oa = Yn(function(e4, t4, r4) {
              var n4 = 3;
              if (r4.length) {
                var s3 = ar(r4, si(Oa));
                n4 |= c;
              }
              return Hs(t4, n4, e4, r4, s3);
            });
            function Aa(e4, t4, r4) {
              var n4, a2, o2, c2, u2, l2, f2 = 0, d2 = false, h2 = false, p2 = true;
              if ("function" != typeof e4) throw new Re2(i2);
              function m2(t5) {
                var r5 = n4, i3 = a2;
                return n4 = a2 = s2, f2 = t5, c2 = e4.apply(i3, r5);
              }
              function v2(e5) {
                var r5 = e5 - l2;
                return l2 === s2 || r5 >= t4 || r5 < 0 || h2 && e5 - f2 >= o2;
              }
              function b2() {
                var e5 = Ta();
                if (v2(e5)) return g2(e5);
                u2 = Ri(b2, function(e6) {
                  var r5 = t4 - (e6 - l2);
                  return h2 ? vr(r5, o2 - (e6 - f2)) : r5;
                }(e5));
              }
              function g2(e5) {
                return u2 = s2, p2 && n4 ? m2(e5) : (n4 = a2 = s2, c2);
              }
              function y2() {
                var e5 = Ta(), r5 = v2(e5);
                if (n4 = arguments, a2 = this, l2 = e5, r5) {
                  if (u2 === s2) return function(e6) {
                    return f2 = e6, u2 = Ri(b2, t4), d2 ? m2(e6) : c2;
                  }(l2);
                  if (h2) return ys(u2), u2 = Ri(b2, t4), m2(l2);
                }
                return u2 === s2 && (u2 = Ri(b2, t4)), c2;
              }
              return t4 = mo(t4) || 0, Ja(r4) && (d2 = !!r4.leading, o2 = (h2 = "maxWait" in r4) ? mr(mo(r4.maxWait) || 0, t4) : o2, p2 = "trailing" in r4 ? !!r4.trailing : p2), y2.cancel = function() {
                u2 !== s2 && ys(u2), f2 = 0, n4 = l2 = a2 = u2 = s2;
              }, y2.flush = function() {
                return u2 === s2 ? c2 : g2(Ta());
              }, y2;
            }
            var Da = Yn(function(e4, t4) {
              return cn(e4, 1, t4);
            }), Ca = Yn(function(e4, t4, r4) {
              return cn(e4, mo(t4) || 0, r4);
            });
            function La(e4, t4) {
              if ("function" != typeof e4 || null != t4 && "function" != typeof t4) throw new Re2(i2);
              var r4 = function() {
                var n4 = arguments, s3 = t4 ? t4.apply(this, n4) : n4[0], i3 = r4.cache;
                if (i3.has(s3)) return i3.get(s3);
                var a2 = e4.apply(this, n4);
                return r4.cache = i3.set(s3, a2) || i3, a2;
              };
              return r4.cache = new (La.Cache || zr)(), r4;
            }
            function Ua(e4) {
              if ("function" != typeof e4) throw new Re2(i2);
              return function() {
                var t4 = arguments;
                switch (t4.length) {
                  case 0:
                    return !e4.call(this);
                  case 1:
                    return !e4.call(this, t4[0]);
                  case 2:
                    return !e4.call(this, t4[0], t4[1]);
                  case 3:
                    return !e4.call(this, t4[0], t4[1], t4[2]);
                }
                return !e4.apply(this, t4);
              };
            }
            La.Cache = zr;
            var ka = bs(function(e4, t4) {
              var r4 = (t4 = 1 == t4.length && Ga(t4[0]) ? Ct(t4[0], Kt(ii())) : Ct(mn(t4, 1), Kt(ii()))).length;
              return Yn(function(n4) {
                for (var s3 = -1, i3 = vr(n4.length, r4); ++s3 < i3; ) n4[s3] = t4[s3].call(this, n4[s3]);
                return wt(e4, this, n4);
              });
            }), xa = Yn(function(e4, t4) {
              var r4 = ar(t4, si(xa));
              return Hs(e4, c, s2, t4, r4);
            }), Ba = Yn(function(e4, t4) {
              var r4 = ar(t4, si(Ba));
              return Hs(e4, 64, s2, t4, r4);
            }), Ma = Zs(function(e4, t4) {
              return Hs(e4, 256, s2, s2, s2, t4);
            });
            function ja(e4, t4) {
              return e4 === t4 || e4 != e4 && t4 != t4;
            }
            var Pa = Fs(Tn), $a = Fs(function(e4, t4) {
              return e4 >= t4;
            }), Va = An(/* @__PURE__ */ function() {
              return arguments;
            }()) ? An : function(e4) {
              return Za(e4) && Ue2.call(e4, "callee") && !qe2.call(e4, "callee");
            }, Ga = n3.isArray, Fa = bt ? Kt(bt) : function(e4) {
              return Za(e4) && wn(e4) == C;
            };
            function za(e4) {
              return null != e4 && Qa(e4.length) && !Ka(e4);
            }
            function Wa(e4) {
              return Za(e4) && za(e4);
            }
            var qa = vt2 || mc, Ya = gt ? Kt(gt) : function(e4) {
              return Za(e4) && wn(e4) == g;
            };
            function Ha(e4) {
              if (!Za(e4)) return false;
              var t4 = wn(e4);
              return t4 == y || "[object DOMException]" == t4 || "string" == typeof e4.message && "string" == typeof e4.name && !ro(e4);
            }
            function Ka(e4) {
              if (!Ja(e4)) return false;
              var t4 = wn(e4);
              return t4 == _ || t4 == E || "[object AsyncFunction]" == t4 || "[object Proxy]" == t4;
            }
            function Xa(e4) {
              return "number" == typeof e4 && e4 == ho(e4);
            }
            function Qa(e4) {
              return "number" == typeof e4 && e4 > -1 && e4 % 1 == 0 && e4 <= f;
            }
            function Ja(e4) {
              var t4 = typeof e4;
              return null != e4 && ("object" == t4 || "function" == t4);
            }
            function Za(e4) {
              return null != e4 && "object" == typeof e4;
            }
            var eo = yt ? Kt(yt) : function(e4) {
              return Za(e4) && fi(e4) == I;
            };
            function to(e4) {
              return "number" == typeof e4 || Za(e4) && wn(e4) == w;
            }
            function ro(e4) {
              if (!Za(e4) || wn(e4) != T) return false;
              var t4 = ze2(e4);
              if (null === t4) return true;
              var r4 = Ue2.call(t4, "constructor") && t4.constructor;
              return "function" == typeof r4 && r4 instanceof r4 && Le2.call(r4) == Me2;
            }
            var no = _t ? Kt(_t) : function(e4) {
              return Za(e4) && wn(e4) == N;
            }, so = Et ? Kt(Et) : function(e4) {
              return Za(e4) && fi(e4) == R;
            };
            function io(e4) {
              return "string" == typeof e4 || !Ga(e4) && Za(e4) && wn(e4) == O;
            }
            function ao(e4) {
              return "symbol" == typeof e4 || Za(e4) && wn(e4) == A;
            }
            var oo = It ? Kt(It) : function(e4) {
              return Za(e4) && Qa(e4.length) && !!st[wn(e4)];
            }, co = Fs(xn), uo = Fs(function(e4, t4) {
              return e4 <= t4;
            });
            function lo(e4) {
              if (!e4) return [];
              if (za(e4)) return io(e4) ? lr(e4) : Ns(e4);
              if (Ke2 && e4[Ke2]) return function(e5) {
                for (var t5, r4 = []; !(t5 = e5.next()).done; ) r4.push(t5.value);
                return r4;
              }(e4[Ke2]());
              var t4 = fi(e4);
              return (t4 == I ? sr : t4 == R ? or : Po)(e4);
            }
            function fo(e4) {
              return e4 ? (e4 = mo(e4)) === l || e4 === -1 / 0 ? 17976931348623157e292 * (e4 < 0 ? -1 : 1) : e4 == e4 ? e4 : 0 : 0 === e4 ? e4 : 0;
            }
            function ho(e4) {
              var t4 = fo(e4), r4 = t4 % 1;
              return t4 == t4 ? r4 ? t4 - r4 : t4 : 0;
            }
            function po(e4) {
              return e4 ? sn(ho(e4), 0, h) : 0;
            }
            function mo(e4) {
              if ("number" == typeof e4) return e4;
              if (ao(e4)) return d;
              if (Ja(e4)) {
                var t4 = "function" == typeof e4.valueOf ? e4.valueOf() : e4;
                e4 = Ja(t4) ? t4 + "" : t4;
              }
              if ("string" != typeof e4) return 0 === e4 ? e4 : +e4;
              e4 = Ht(e4);
              var r4 = pe.test(e4);
              return r4 || ve.test(e4) ? ct(e4.slice(2), r4 ? 2 : 8) : he.test(e4) ? d : +e4;
            }
            function vo(e4) {
              return Rs(e4, Co(e4));
            }
            function bo(e4) {
              return null == e4 ? "" : as(e4);
            }
            var go = As(function(e4, t4) {
              if (_i(t4) || za(t4)) Rs(t4, Do(t4), e4);
              else for (var r4 in t4) Ue2.call(t4, r4) && Jr(e4, r4, t4[r4]);
            }), yo = As(function(e4, t4) {
              Rs(t4, Co(t4), e4);
            }), _o = As(function(e4, t4, r4, n4) {
              Rs(t4, Co(t4), e4, n4);
            }), Eo = As(function(e4, t4, r4, n4) {
              Rs(t4, Do(t4), e4, n4);
            }), Io = Zs(nn), wo = Yn(function(e4, t4) {
              e4 = Te2(e4);
              var r4 = -1, n4 = t4.length, i3 = n4 > 2 ? t4[2] : s2;
              for (i3 && vi(t4[0], t4[1], i3) && (n4 = 1); ++r4 < n4; ) for (var a2 = t4[r4], o2 = Co(a2), c2 = -1, u2 = o2.length; ++c2 < u2; ) {
                var l2 = o2[c2], f2 = e4[l2];
                (f2 === s2 || ja(f2, De2[l2]) && !Ue2.call(e4, l2)) && (e4[l2] = a2[l2]);
              }
              return e4;
            }), To = Yn(function(e4) {
              return e4.push(s2, Xs), wt(Uo, s2, e4);
            });
            function So(e4, t4, r4) {
              var n4 = null == e4 ? s2 : En(e4, t4);
              return n4 === s2 ? r4 : n4;
            }
            function No(e4, t4) {
              return null != e4 && di(e4, t4, Nn);
            }
            var Ro = js(function(e4, t4, r4) {
              null != t4 && "function" != typeof t4.toString && (t4 = Be2.call(t4)), e4[t4] = r4;
            }, Zo(rc)), Oo = js(function(e4, t4, r4) {
              null != t4 && "function" != typeof t4.toString && (t4 = Be2.call(t4)), Ue2.call(e4, t4) ? e4[t4].push(r4) : e4[t4] = [r4];
            }, ii), Ao = Yn(On);
            function Do(e4) {
              return za(e4) ? Yr(e4) : kn(e4);
            }
            function Co(e4) {
              return za(e4) ? Yr(e4, true) : function(e5) {
                if (!Ja(e5)) return function(e6) {
                  var t5 = [];
                  if (null != e6) for (var r5 in Te2(e6)) t5.push(r5);
                  return t5;
                }(e5);
                var t4 = _i(e5), r4 = [];
                for (var n4 in e5) ("constructor" != n4 || !t4 && Ue2.call(e5, n4)) && r4.push(n4);
                return r4;
              }(e4);
            }
            var Lo = As(function(e4, t4, r4) {
              Pn(e4, t4, r4);
            }), Uo = As(function(e4, t4, r4, n4) {
              Pn(e4, t4, r4, n4);
            }), ko = Zs(function(e4, t4) {
              var r4 = {};
              if (null == e4) return r4;
              var n4 = false;
              t4 = Ct(t4, function(t5) {
                return t5 = vs(t5, e4), n4 || (n4 = t5.length > 1), t5;
              }), Rs(e4, ti(e4), r4), n4 && (r4 = an(r4, 7, Qs));
              for (var s3 = t4.length; s3--; ) cs(r4, t4[s3]);
              return r4;
            }), xo = Zs(function(e4, t4) {
              return null == e4 ? {} : function(e5, t5) {
                return Gn(e5, t5, function(t6, r4) {
                  return No(e5, r4);
                });
              }(e4, t4);
            });
            function Bo(e4, t4) {
              if (null == e4) return {};
              var r4 = Ct(ti(e4), function(e5) {
                return [e5];
              });
              return t4 = ii(t4), Gn(e4, r4, function(e5, r5) {
                return t4(e5, r5[0]);
              });
            }
            var Mo = Ys(Do), jo = Ys(Co);
            function Po(e4) {
              return null == e4 ? [] : Xt(e4, Do(e4));
            }
            var $o = Us(function(e4, t4, r4) {
              return t4 = t4.toLowerCase(), e4 + (r4 ? Vo(t4) : t4);
            });
            function Vo(e4) {
              return Ko(bo(e4).toLowerCase());
            }
            function Go(e4) {
              return (e4 = bo(e4)) && e4.replace(ge, er).replace(Qe, "");
            }
            var Fo = Us(function(e4, t4, r4) {
              return e4 + (r4 ? "-" : "") + t4.toLowerCase();
            }), zo = Us(function(e4, t4, r4) {
              return e4 + (r4 ? " " : "") + t4.toLowerCase();
            }), Wo = Ls("toLowerCase"), qo = Us(function(e4, t4, r4) {
              return e4 + (r4 ? "_" : "") + t4.toLowerCase();
            }), Yo = Us(function(e4, t4, r4) {
              return e4 + (r4 ? " " : "") + Ko(t4);
            }), Ho = Us(function(e4, t4, r4) {
              return e4 + (r4 ? " " : "") + t4.toUpperCase();
            }), Ko = Ls("toUpperCase");
            function Xo(e4, t4, r4) {
              return e4 = bo(e4), (t4 = r4 ? s2 : t4) === s2 ? function(e5) {
                return tt.test(e5);
              }(e4) ? function(e5) {
                return e5.match(Ze) || [];
              }(e4) : function(e5) {
                return e5.match(ce) || [];
              }(e4) : e4.match(t4) || [];
            }
            var Qo = Yn(function(e4, t4) {
              try {
                return wt(e4, s2, t4);
              } catch (e5) {
                return Ha(e5) ? e5 : new Ee2(e5);
              }
            }), Jo = Zs(function(e4, t4) {
              return St(t4, function(t5) {
                t5 = xi(t5), rn(e4, t5, Ra(e4[t5], e4));
              }), e4;
            });
            function Zo(e4) {
              return function() {
                return e4;
              };
            }
            var ec = Bs(), tc = Bs(true);
            function rc(e4) {
              return e4;
            }
            function nc(e4) {
              return Un("function" == typeof e4 ? e4 : an(e4, 1));
            }
            var sc = Yn(function(e4, t4) {
              return function(r4) {
                return On(r4, e4, t4);
              };
            }), ic = Yn(function(e4, t4) {
              return function(r4) {
                return On(e4, r4, t4);
              };
            });
            function ac(e4, t4, r4) {
              var n4 = Do(t4), s3 = _n(t4, n4);
              null != r4 || Ja(t4) && (s3.length || !n4.length) || (r4 = t4, t4 = e4, e4 = this, s3 = _n(t4, Do(t4)));
              var i3 = !(Ja(r4) && "chain" in r4 && !r4.chain), a2 = Ka(e4);
              return St(s3, function(r5) {
                var n5 = t4[r5];
                e4[r5] = n5, a2 && (e4.prototype[r5] = function() {
                  var t5 = this.__chain__;
                  if (i3 || t5) {
                    var r6 = e4(this.__wrapped__);
                    return (r6.__actions__ = Ns(this.__actions__)).push({ func: n5, args: arguments, thisArg: e4 }), r6.__chain__ = t5, r6;
                  }
                  return n5.apply(e4, Lt([this.value()], arguments));
                });
              }), e4;
            }
            function oc() {
            }
            var cc = $s(Ct), uc = $s(Rt), lc = $s(xt);
            function fc(e4) {
              return bi(e4) ? Ft(xi(e4)) : /* @__PURE__ */ function(e5) {
                return function(t4) {
                  return En(t4, e5);
                };
              }(e4);
            }
            var dc = Gs(), hc = Gs(true);
            function pc() {
              return [];
            }
            function mc() {
              return false;
            }
            var vc, bc = Ps(function(e4, t4) {
              return e4 + t4;
            }, 0), gc = Ws("ceil"), yc = Ps(function(e4, t4) {
              return e4 / t4;
            }, 1), _c = Ws("floor"), Ec = Ps(function(e4, t4) {
              return e4 * t4;
            }, 1), Ic = Ws("round"), wc = Ps(function(e4, t4) {
              return e4 - t4;
            }, 0);
            return Mr.after = function(e4, t4) {
              if ("function" != typeof t4) throw new Re2(i2);
              return e4 = ho(e4), function() {
                if (--e4 < 1) return t4.apply(this, arguments);
              };
            }, Mr.ary = Sa, Mr.assign = go, Mr.assignIn = yo, Mr.assignInWith = _o, Mr.assignWith = Eo, Mr.at = Io, Mr.before = Na, Mr.bind = Ra, Mr.bindAll = Jo, Mr.bindKey = Oa, Mr.castArray = function() {
              if (!arguments.length) return [];
              var e4 = arguments[0];
              return Ga(e4) ? e4 : [e4];
            }, Mr.chain = la, Mr.chunk = function(e4, t4, r4) {
              t4 = (r4 ? vi(e4, t4, r4) : t4 === s2) ? 1 : mr(ho(t4), 0);
              var i3 = null == e4 ? 0 : e4.length;
              if (!i3 || t4 < 1) return [];
              for (var a2 = 0, o2 = 0, c2 = n3(dt2(i3 / t4)); a2 < i3; ) c2[o2++] = es(e4, a2, a2 += t4);
              return c2;
            }, Mr.compact = function(e4) {
              for (var t4 = -1, r4 = null == e4 ? 0 : e4.length, n4 = 0, s3 = []; ++t4 < r4; ) {
                var i3 = e4[t4];
                i3 && (s3[n4++] = i3);
              }
              return s3;
            }, Mr.concat = function() {
              var e4 = arguments.length;
              if (!e4) return [];
              for (var t4 = n3(e4 - 1), r4 = arguments[0], s3 = e4; s3--; ) t4[s3 - 1] = arguments[s3];
              return Lt(Ga(r4) ? Ns(r4) : [r4], mn(t4, 1));
            }, Mr.cond = function(e4) {
              var t4 = null == e4 ? 0 : e4.length, r4 = ii();
              return e4 = t4 ? Ct(e4, function(e5) {
                if ("function" != typeof e5[1]) throw new Re2(i2);
                return [r4(e5[0]), e5[1]];
              }) : [], Yn(function(r5) {
                for (var n4 = -1; ++n4 < t4; ) {
                  var s3 = e4[n4];
                  if (wt(s3[0], this, r5)) return wt(s3[1], this, r5);
                }
              });
            }, Mr.conforms = function(e4) {
              return function(e5) {
                var t4 = Do(e5);
                return function(r4) {
                  return on(r4, e5, t4);
                };
              }(an(e4, 1));
            }, Mr.constant = Zo, Mr.countBy = ha, Mr.create = function(e4, t4) {
              var r4 = jr(e4);
              return null == t4 ? r4 : tn(r4, t4);
            }, Mr.curry = function e4(t4, r4, n4) {
              var i3 = Hs(t4, 8, s2, s2, s2, s2, s2, r4 = n4 ? s2 : r4);
              return i3.placeholder = e4.placeholder, i3;
            }, Mr.curryRight = function e4(t4, r4, n4) {
              var i3 = Hs(t4, 16, s2, s2, s2, s2, s2, r4 = n4 ? s2 : r4);
              return i3.placeholder = e4.placeholder, i3;
            }, Mr.debounce = Aa, Mr.defaults = wo, Mr.defaultsDeep = To, Mr.defer = Da, Mr.delay = Ca, Mr.difference = ji, Mr.differenceBy = Pi, Mr.differenceWith = $i, Mr.drop = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              return n4 ? es(e4, (t4 = r4 || t4 === s2 ? 1 : ho(t4)) < 0 ? 0 : t4, n4) : [];
            }, Mr.dropRight = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              return n4 ? es(e4, 0, (t4 = n4 - (t4 = r4 || t4 === s2 ? 1 : ho(t4))) < 0 ? 0 : t4) : [];
            }, Mr.dropRightWhile = function(e4, t4) {
              return e4 && e4.length ? ls(e4, ii(t4, 3), true, true) : [];
            }, Mr.dropWhile = function(e4, t4) {
              return e4 && e4.length ? ls(e4, ii(t4, 3), true) : [];
            }, Mr.fill = function(e4, t4, r4, n4) {
              var i3 = null == e4 ? 0 : e4.length;
              return i3 ? (r4 && "number" != typeof r4 && vi(e4, t4, r4) && (r4 = 0, n4 = i3), function(e5, t5, r5, n5) {
                var i4 = e5.length;
                for ((r5 = ho(r5)) < 0 && (r5 = -r5 > i4 ? 0 : i4 + r5), (n5 = n5 === s2 || n5 > i4 ? i4 : ho(n5)) < 0 && (n5 += i4), n5 = r5 > n5 ? 0 : po(n5); r5 < n5; ) e5[r5++] = t5;
                return e5;
              }(e4, t4, r4, n4)) : [];
            }, Mr.filter = function(e4, t4) {
              return (Ga(e4) ? Ot : pn)(e4, ii(t4, 3));
            }, Mr.flatMap = function(e4, t4) {
              return mn(Ea(e4, t4), 1);
            }, Mr.flatMapDeep = function(e4, t4) {
              return mn(Ea(e4, t4), l);
            }, Mr.flatMapDepth = function(e4, t4, r4) {
              return r4 = r4 === s2 ? 1 : ho(r4), mn(Ea(e4, t4), r4);
            }, Mr.flatten = Fi, Mr.flattenDeep = function(e4) {
              return null != e4 && e4.length ? mn(e4, l) : [];
            }, Mr.flattenDepth = function(e4, t4) {
              return null != e4 && e4.length ? mn(e4, t4 = t4 === s2 ? 1 : ho(t4)) : [];
            }, Mr.flip = function(e4) {
              return Hs(e4, 512);
            }, Mr.flow = ec, Mr.flowRight = tc, Mr.fromPairs = function(e4) {
              for (var t4 = -1, r4 = null == e4 ? 0 : e4.length, n4 = {}; ++t4 < r4; ) {
                var s3 = e4[t4];
                n4[s3[0]] = s3[1];
              }
              return n4;
            }, Mr.functions = function(e4) {
              return null == e4 ? [] : _n(e4, Do(e4));
            }, Mr.functionsIn = function(e4) {
              return null == e4 ? [] : _n(e4, Co(e4));
            }, Mr.groupBy = ga, Mr.initial = function(e4) {
              return null != e4 && e4.length ? es(e4, 0, -1) : [];
            }, Mr.intersection = Wi, Mr.intersectionBy = qi, Mr.intersectionWith = Yi, Mr.invert = Ro, Mr.invertBy = Oo, Mr.invokeMap = ya, Mr.iteratee = nc, Mr.keyBy = _a, Mr.keys = Do, Mr.keysIn = Co, Mr.map = Ea, Mr.mapKeys = function(e4, t4) {
              var r4 = {};
              return t4 = ii(t4, 3), gn(e4, function(e5, n4, s3) {
                rn(r4, t4(e5, n4, s3), e5);
              }), r4;
            }, Mr.mapValues = function(e4, t4) {
              var r4 = {};
              return t4 = ii(t4, 3), gn(e4, function(e5, n4, s3) {
                rn(r4, n4, t4(e5, n4, s3));
              }), r4;
            }, Mr.matches = function(e4) {
              return Mn(an(e4, 1));
            }, Mr.matchesProperty = function(e4, t4) {
              return jn(e4, an(t4, 1));
            }, Mr.memoize = La, Mr.merge = Lo, Mr.mergeWith = Uo, Mr.method = sc, Mr.methodOf = ic, Mr.mixin = ac, Mr.negate = Ua, Mr.nthArg = function(e4) {
              return e4 = ho(e4), Yn(function(t4) {
                return $n(t4, e4);
              });
            }, Mr.omit = ko, Mr.omitBy = function(e4, t4) {
              return Bo(e4, Ua(ii(t4)));
            }, Mr.once = function(e4) {
              return Na(2, e4);
            }, Mr.orderBy = function(e4, t4, r4, n4) {
              return null == e4 ? [] : (Ga(t4) || (t4 = null == t4 ? [] : [t4]), Ga(r4 = n4 ? s2 : r4) || (r4 = null == r4 ? [] : [r4]), Vn(e4, t4, r4));
            }, Mr.over = cc, Mr.overArgs = ka, Mr.overEvery = uc, Mr.overSome = lc, Mr.partial = xa, Mr.partialRight = Ba, Mr.partition = Ia, Mr.pick = xo, Mr.pickBy = Bo, Mr.property = fc, Mr.propertyOf = function(e4) {
              return function(t4) {
                return null == e4 ? s2 : En(e4, t4);
              };
            }, Mr.pull = Ki, Mr.pullAll = Xi, Mr.pullAllBy = function(e4, t4, r4) {
              return e4 && e4.length && t4 && t4.length ? Fn(e4, t4, ii(r4, 2)) : e4;
            }, Mr.pullAllWith = function(e4, t4, r4) {
              return e4 && e4.length && t4 && t4.length ? Fn(e4, t4, s2, r4) : e4;
            }, Mr.pullAt = Qi, Mr.range = dc, Mr.rangeRight = hc, Mr.rearg = Ma, Mr.reject = function(e4, t4) {
              return (Ga(e4) ? Ot : pn)(e4, Ua(ii(t4, 3)));
            }, Mr.remove = function(e4, t4) {
              var r4 = [];
              if (!e4 || !e4.length) return r4;
              var n4 = -1, s3 = [], i3 = e4.length;
              for (t4 = ii(t4, 3); ++n4 < i3; ) {
                var a2 = e4[n4];
                t4(a2, n4, e4) && (r4.push(a2), s3.push(n4));
              }
              return zn(e4, s3), r4;
            }, Mr.rest = function(e4, t4) {
              if ("function" != typeof e4) throw new Re2(i2);
              return Yn(e4, t4 = t4 === s2 ? t4 : ho(t4));
            }, Mr.reverse = Ji, Mr.sampleSize = function(e4, t4, r4) {
              return t4 = (r4 ? vi(e4, t4, r4) : t4 === s2) ? 1 : ho(t4), (Ga(e4) ? Kr : Kn)(e4, t4);
            }, Mr.set = function(e4, t4, r4) {
              return null == e4 ? e4 : Xn(e4, t4, r4);
            }, Mr.setWith = function(e4, t4, r4, n4) {
              return n4 = "function" == typeof n4 ? n4 : s2, null == e4 ? e4 : Xn(e4, t4, r4, n4);
            }, Mr.shuffle = function(e4) {
              return (Ga(e4) ? Xr : Zn)(e4);
            }, Mr.slice = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              return n4 ? (r4 && "number" != typeof r4 && vi(e4, t4, r4) ? (t4 = 0, r4 = n4) : (t4 = null == t4 ? 0 : ho(t4), r4 = r4 === s2 ? n4 : ho(r4)), es(e4, t4, r4)) : [];
            }, Mr.sortBy = wa, Mr.sortedUniq = function(e4) {
              return e4 && e4.length ? ss(e4) : [];
            }, Mr.sortedUniqBy = function(e4, t4) {
              return e4 && e4.length ? ss(e4, ii(t4, 2)) : [];
            }, Mr.split = function(e4, t4, r4) {
              return r4 && "number" != typeof r4 && vi(e4, t4, r4) && (t4 = r4 = s2), (r4 = r4 === s2 ? h : r4 >>> 0) ? (e4 = bo(e4)) && ("string" == typeof t4 || null != t4 && !no(t4)) && !(t4 = as(t4)) && nr(e4) ? gs(lr(e4), 0, r4) : e4.split(t4, r4) : [];
            }, Mr.spread = function(e4, t4) {
              if ("function" != typeof e4) throw new Re2(i2);
              return t4 = null == t4 ? 0 : mr(ho(t4), 0), Yn(function(r4) {
                var n4 = r4[t4], s3 = gs(r4, 0, t4);
                return n4 && Lt(s3, n4), wt(e4, this, s3);
              });
            }, Mr.tail = function(e4) {
              var t4 = null == e4 ? 0 : e4.length;
              return t4 ? es(e4, 1, t4) : [];
            }, Mr.take = function(e4, t4, r4) {
              return e4 && e4.length ? es(e4, 0, (t4 = r4 || t4 === s2 ? 1 : ho(t4)) < 0 ? 0 : t4) : [];
            }, Mr.takeRight = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              return n4 ? es(e4, (t4 = n4 - (t4 = r4 || t4 === s2 ? 1 : ho(t4))) < 0 ? 0 : t4, n4) : [];
            }, Mr.takeRightWhile = function(e4, t4) {
              return e4 && e4.length ? ls(e4, ii(t4, 3), false, true) : [];
            }, Mr.takeWhile = function(e4, t4) {
              return e4 && e4.length ? ls(e4, ii(t4, 3)) : [];
            }, Mr.tap = function(e4, t4) {
              return t4(e4), e4;
            }, Mr.throttle = function(e4, t4, r4) {
              var n4 = true, s3 = true;
              if ("function" != typeof e4) throw new Re2(i2);
              return Ja(r4) && (n4 = "leading" in r4 ? !!r4.leading : n4, s3 = "trailing" in r4 ? !!r4.trailing : s3), Aa(e4, t4, { leading: n4, maxWait: t4, trailing: s3 });
            }, Mr.thru = fa, Mr.toArray = lo, Mr.toPairs = Mo, Mr.toPairsIn = jo, Mr.toPath = function(e4) {
              return Ga(e4) ? Ct(e4, xi) : ao(e4) ? [e4] : Ns(ki(bo(e4)));
            }, Mr.toPlainObject = vo, Mr.transform = function(e4, t4, r4) {
              var n4 = Ga(e4), s3 = n4 || qa(e4) || oo(e4);
              if (t4 = ii(t4, 4), null == r4) {
                var i3 = e4 && e4.constructor;
                r4 = s3 ? n4 ? new i3() : [] : Ja(e4) && Ka(i3) ? jr(ze2(e4)) : {};
              }
              return (s3 ? St : gn)(e4, function(e5, n5, s4) {
                return t4(r4, e5, n5, s4);
              }), r4;
            }, Mr.unary = function(e4) {
              return Sa(e4, 1);
            }, Mr.union = Zi, Mr.unionBy = ea, Mr.unionWith = ta, Mr.uniq = function(e4) {
              return e4 && e4.length ? os(e4) : [];
            }, Mr.uniqBy = function(e4, t4) {
              return e4 && e4.length ? os(e4, ii(t4, 2)) : [];
            }, Mr.uniqWith = function(e4, t4) {
              return t4 = "function" == typeof t4 ? t4 : s2, e4 && e4.length ? os(e4, s2, t4) : [];
            }, Mr.unset = function(e4, t4) {
              return null == e4 || cs(e4, t4);
            }, Mr.unzip = ra, Mr.unzipWith = na, Mr.update = function(e4, t4, r4) {
              return null == e4 ? e4 : us(e4, t4, ms(r4));
            }, Mr.updateWith = function(e4, t4, r4, n4) {
              return n4 = "function" == typeof n4 ? n4 : s2, null == e4 ? e4 : us(e4, t4, ms(r4), n4);
            }, Mr.values = Po, Mr.valuesIn = function(e4) {
              return null == e4 ? [] : Xt(e4, Co(e4));
            }, Mr.without = sa, Mr.words = Xo, Mr.wrap = function(e4, t4) {
              return xa(ms(t4), e4);
            }, Mr.xor = ia, Mr.xorBy = aa, Mr.xorWith = oa, Mr.zip = ca, Mr.zipObject = function(e4, t4) {
              return hs(e4 || [], t4 || [], Jr);
            }, Mr.zipObjectDeep = function(e4, t4) {
              return hs(e4 || [], t4 || [], Xn);
            }, Mr.zipWith = ua, Mr.entries = Mo, Mr.entriesIn = jo, Mr.extend = yo, Mr.extendWith = _o, ac(Mr, Mr), Mr.add = bc, Mr.attempt = Qo, Mr.camelCase = $o, Mr.capitalize = Vo, Mr.ceil = gc, Mr.clamp = function(e4, t4, r4) {
              return r4 === s2 && (r4 = t4, t4 = s2), r4 !== s2 && (r4 = (r4 = mo(r4)) == r4 ? r4 : 0), t4 !== s2 && (t4 = (t4 = mo(t4)) == t4 ? t4 : 0), sn(mo(e4), t4, r4);
            }, Mr.clone = function(e4) {
              return an(e4, 4);
            }, Mr.cloneDeep = function(e4) {
              return an(e4, 5);
            }, Mr.cloneDeepWith = function(e4, t4) {
              return an(e4, 5, t4 = "function" == typeof t4 ? t4 : s2);
            }, Mr.cloneWith = function(e4, t4) {
              return an(e4, 4, t4 = "function" == typeof t4 ? t4 : s2);
            }, Mr.conformsTo = function(e4, t4) {
              return null == t4 || on(e4, t4, Do(t4));
            }, Mr.deburr = Go, Mr.defaultTo = function(e4, t4) {
              return null == e4 || e4 != e4 ? t4 : e4;
            }, Mr.divide = yc, Mr.endsWith = function(e4, t4, r4) {
              e4 = bo(e4), t4 = as(t4);
              var n4 = e4.length, i3 = r4 = r4 === s2 ? n4 : sn(ho(r4), 0, n4);
              return (r4 -= t4.length) >= 0 && e4.slice(r4, i3) == t4;
            }, Mr.eq = ja, Mr.escape = function(e4) {
              return (e4 = bo(e4)) && H.test(e4) ? e4.replace(q, tr) : e4;
            }, Mr.escapeRegExp = function(e4) {
              return (e4 = bo(e4)) && re.test(e4) ? e4.replace(te, "\\$&") : e4;
            }, Mr.every = function(e4, t4, r4) {
              var n4 = Ga(e4) ? Rt : dn;
              return r4 && vi(e4, t4, r4) && (t4 = s2), n4(e4, ii(t4, 3));
            }, Mr.find = pa, Mr.findIndex = Vi, Mr.findKey = function(e4, t4) {
              return Mt(e4, ii(t4, 3), gn);
            }, Mr.findLast = ma, Mr.findLastIndex = Gi, Mr.findLastKey = function(e4, t4) {
              return Mt(e4, ii(t4, 3), yn);
            }, Mr.floor = _c, Mr.forEach = va, Mr.forEachRight = ba, Mr.forIn = function(e4, t4) {
              return null == e4 ? e4 : vn(e4, ii(t4, 3), Co);
            }, Mr.forInRight = function(e4, t4) {
              return null == e4 ? e4 : bn(e4, ii(t4, 3), Co);
            }, Mr.forOwn = function(e4, t4) {
              return e4 && gn(e4, ii(t4, 3));
            }, Mr.forOwnRight = function(e4, t4) {
              return e4 && yn(e4, ii(t4, 3));
            }, Mr.get = So, Mr.gt = Pa, Mr.gte = $a, Mr.has = function(e4, t4) {
              return null != e4 && di(e4, t4, Sn);
            }, Mr.hasIn = No, Mr.head = zi, Mr.identity = rc, Mr.includes = function(e4, t4, r4, n4) {
              e4 = za(e4) ? e4 : Po(e4), r4 = r4 && !n4 ? ho(r4) : 0;
              var s3 = e4.length;
              return r4 < 0 && (r4 = mr(s3 + r4, 0)), io(e4) ? r4 <= s3 && e4.indexOf(t4, r4) > -1 : !!s3 && Pt(e4, t4, r4) > -1;
            }, Mr.indexOf = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              if (!n4) return -1;
              var s3 = null == r4 ? 0 : ho(r4);
              return s3 < 0 && (s3 = mr(n4 + s3, 0)), Pt(e4, t4, s3);
            }, Mr.inRange = function(e4, t4, r4) {
              return t4 = fo(t4), r4 === s2 ? (r4 = t4, t4 = 0) : r4 = fo(r4), function(e5, t5, r5) {
                return e5 >= vr(t5, r5) && e5 < mr(t5, r5);
              }(e4 = mo(e4), t4, r4);
            }, Mr.invoke = Ao, Mr.isArguments = Va, Mr.isArray = Ga, Mr.isArrayBuffer = Fa, Mr.isArrayLike = za, Mr.isArrayLikeObject = Wa, Mr.isBoolean = function(e4) {
              return true === e4 || false === e4 || Za(e4) && wn(e4) == b;
            }, Mr.isBuffer = qa, Mr.isDate = Ya, Mr.isElement = function(e4) {
              return Za(e4) && 1 === e4.nodeType && !ro(e4);
            }, Mr.isEmpty = function(e4) {
              if (null == e4) return true;
              if (za(e4) && (Ga(e4) || "string" == typeof e4 || "function" == typeof e4.splice || qa(e4) || oo(e4) || Va(e4))) return !e4.length;
              var t4 = fi(e4);
              if (t4 == I || t4 == R) return !e4.size;
              if (_i(e4)) return !kn(e4).length;
              for (var r4 in e4) if (Ue2.call(e4, r4)) return false;
              return true;
            }, Mr.isEqual = function(e4, t4) {
              return Dn(e4, t4);
            }, Mr.isEqualWith = function(e4, t4, r4) {
              var n4 = (r4 = "function" == typeof r4 ? r4 : s2) ? r4(e4, t4) : s2;
              return n4 === s2 ? Dn(e4, t4, s2, r4) : !!n4;
            }, Mr.isError = Ha, Mr.isFinite = function(e4) {
              return "number" == typeof e4 && Bt2(e4);
            }, Mr.isFunction = Ka, Mr.isInteger = Xa, Mr.isLength = Qa, Mr.isMap = eo, Mr.isMatch = function(e4, t4) {
              return e4 === t4 || Cn(e4, t4, oi(t4));
            }, Mr.isMatchWith = function(e4, t4, r4) {
              return r4 = "function" == typeof r4 ? r4 : s2, Cn(e4, t4, oi(t4), r4);
            }, Mr.isNaN = function(e4) {
              return to(e4) && e4 != +e4;
            }, Mr.isNative = function(e4) {
              if (yi(e4)) throw new Ee2("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
              return Ln(e4);
            }, Mr.isNil = function(e4) {
              return null == e4;
            }, Mr.isNull = function(e4) {
              return null === e4;
            }, Mr.isNumber = to, Mr.isObject = Ja, Mr.isObjectLike = Za, Mr.isPlainObject = ro, Mr.isRegExp = no, Mr.isSafeInteger = function(e4) {
              return Xa(e4) && e4 >= -9007199254740991 && e4 <= f;
            }, Mr.isSet = so, Mr.isString = io, Mr.isSymbol = ao, Mr.isTypedArray = oo, Mr.isUndefined = function(e4) {
              return e4 === s2;
            }, Mr.isWeakMap = function(e4) {
              return Za(e4) && fi(e4) == D;
            }, Mr.isWeakSet = function(e4) {
              return Za(e4) && "[object WeakSet]" == wn(e4);
            }, Mr.join = function(e4, t4) {
              return null == e4 ? "" : zt2.call(e4, t4);
            }, Mr.kebabCase = Fo, Mr.last = Hi, Mr.lastIndexOf = function(e4, t4, r4) {
              var n4 = null == e4 ? 0 : e4.length;
              if (!n4) return -1;
              var i3 = n4;
              return r4 !== s2 && (i3 = (i3 = ho(r4)) < 0 ? mr(n4 + i3, 0) : vr(i3, n4 - 1)), t4 == t4 ? function(e5, t5, r5) {
                for (var n5 = r5 + 1; n5--; ) if (e5[n5] === t5) return n5;
                return n5;
              }(e4, t4, i3) : jt(e4, Vt, i3, true);
            }, Mr.lowerCase = zo, Mr.lowerFirst = Wo, Mr.lt = co, Mr.lte = uo, Mr.max = function(e4) {
              return e4 && e4.length ? hn(e4, rc, Tn) : s2;
            }, Mr.maxBy = function(e4, t4) {
              return e4 && e4.length ? hn(e4, ii(t4, 2), Tn) : s2;
            }, Mr.mean = function(e4) {
              return Gt(e4, rc);
            }, Mr.meanBy = function(e4, t4) {
              return Gt(e4, ii(t4, 2));
            }, Mr.min = function(e4) {
              return e4 && e4.length ? hn(e4, rc, xn) : s2;
            }, Mr.minBy = function(e4, t4) {
              return e4 && e4.length ? hn(e4, ii(t4, 2), xn) : s2;
            }, Mr.stubArray = pc, Mr.stubFalse = mc, Mr.stubObject = function() {
              return {};
            }, Mr.stubString = function() {
              return "";
            }, Mr.stubTrue = function() {
              return true;
            }, Mr.multiply = Ec, Mr.nth = function(e4, t4) {
              return e4 && e4.length ? $n(e4, ho(t4)) : s2;
            }, Mr.noConflict = function() {
              return ft._ === this && (ft._ = je2), this;
            }, Mr.noop = oc, Mr.now = Ta, Mr.pad = function(e4, t4, r4) {
              e4 = bo(e4);
              var n4 = (t4 = ho(t4)) ? ur(e4) : 0;
              if (!t4 || n4 >= t4) return e4;
              var s3 = (t4 - n4) / 2;
              return Vs(ht2(s3), r4) + e4 + Vs(dt2(s3), r4);
            }, Mr.padEnd = function(e4, t4, r4) {
              e4 = bo(e4);
              var n4 = (t4 = ho(t4)) ? ur(e4) : 0;
              return t4 && n4 < t4 ? e4 + Vs(t4 - n4, r4) : e4;
            }, Mr.padStart = function(e4, t4, r4) {
              e4 = bo(e4);
              var n4 = (t4 = ho(t4)) ? ur(e4) : 0;
              return t4 && n4 < t4 ? Vs(t4 - n4, r4) + e4 : e4;
            }, Mr.parseInt = function(e4, t4, r4) {
              return r4 || null == t4 ? t4 = 0 : t4 && (t4 = +t4), gr(bo(e4).replace(ne, ""), t4 || 0);
            }, Mr.random = function(e4, t4, r4) {
              if (r4 && "boolean" != typeof r4 && vi(e4, t4, r4) && (t4 = r4 = s2), r4 === s2 && ("boolean" == typeof t4 ? (r4 = t4, t4 = s2) : "boolean" == typeof e4 && (r4 = e4, e4 = s2)), e4 === s2 && t4 === s2 ? (e4 = 0, t4 = 1) : (e4 = fo(e4), t4 === s2 ? (t4 = e4, e4 = 0) : t4 = fo(t4)), e4 > t4) {
                var n4 = e4;
                e4 = t4, t4 = n4;
              }
              if (r4 || e4 % 1 || t4 % 1) {
                var i3 = yr();
                return vr(e4 + i3 * (t4 - e4 + ot("1e-" + ((i3 + "").length - 1))), t4);
              }
              return Wn(e4, t4);
            }, Mr.reduce = function(e4, t4, r4) {
              var n4 = Ga(e4) ? Ut : Wt, s3 = arguments.length < 3;
              return n4(e4, ii(t4, 4), r4, s3, ln);
            }, Mr.reduceRight = function(e4, t4, r4) {
              var n4 = Ga(e4) ? kt : Wt, s3 = arguments.length < 3;
              return n4(e4, ii(t4, 4), r4, s3, fn);
            }, Mr.repeat = function(e4, t4, r4) {
              return t4 = (r4 ? vi(e4, t4, r4) : t4 === s2) ? 1 : ho(t4), qn(bo(e4), t4);
            }, Mr.replace = function() {
              var e4 = arguments, t4 = bo(e4[0]);
              return e4.length < 3 ? t4 : t4.replace(e4[1], e4[2]);
            }, Mr.result = function(e4, t4, r4) {
              var n4 = -1, i3 = (t4 = vs(t4, e4)).length;
              for (i3 || (i3 = 1, e4 = s2); ++n4 < i3; ) {
                var a2 = null == e4 ? s2 : e4[xi(t4[n4])];
                a2 === s2 && (n4 = i3, a2 = r4), e4 = Ka(a2) ? a2.call(e4) : a2;
              }
              return e4;
            }, Mr.round = Ic, Mr.runInContext = e3, Mr.sample = function(e4) {
              return (Ga(e4) ? Hr : Hn)(e4);
            }, Mr.size = function(e4) {
              if (null == e4) return 0;
              if (za(e4)) return io(e4) ? ur(e4) : e4.length;
              var t4 = fi(e4);
              return t4 == I || t4 == R ? e4.size : kn(e4).length;
            }, Mr.snakeCase = qo, Mr.some = function(e4, t4, r4) {
              var n4 = Ga(e4) ? xt : ts;
              return r4 && vi(e4, t4, r4) && (t4 = s2), n4(e4, ii(t4, 3));
            }, Mr.sortedIndex = function(e4, t4) {
              return rs(e4, t4);
            }, Mr.sortedIndexBy = function(e4, t4, r4) {
              return ns(e4, t4, ii(r4, 2));
            }, Mr.sortedIndexOf = function(e4, t4) {
              var r4 = null == e4 ? 0 : e4.length;
              if (r4) {
                var n4 = rs(e4, t4);
                if (n4 < r4 && ja(e4[n4], t4)) return n4;
              }
              return -1;
            }, Mr.sortedLastIndex = function(e4, t4) {
              return rs(e4, t4, true);
            }, Mr.sortedLastIndexBy = function(e4, t4, r4) {
              return ns(e4, t4, ii(r4, 2), true);
            }, Mr.sortedLastIndexOf = function(e4, t4) {
              if (null != e4 && e4.length) {
                var r4 = rs(e4, t4, true) - 1;
                if (ja(e4[r4], t4)) return r4;
              }
              return -1;
            }, Mr.startCase = Yo, Mr.startsWith = function(e4, t4, r4) {
              return e4 = bo(e4), r4 = null == r4 ? 0 : sn(ho(r4), 0, e4.length), t4 = as(t4), e4.slice(r4, r4 + t4.length) == t4;
            }, Mr.subtract = wc, Mr.sum = function(e4) {
              return e4 && e4.length ? qt(e4, rc) : 0;
            }, Mr.sumBy = function(e4, t4) {
              return e4 && e4.length ? qt(e4, ii(t4, 2)) : 0;
            }, Mr.template = function(e4, t4, r4) {
              var n4 = Mr.templateSettings;
              r4 && vi(e4, t4, r4) && (t4 = s2), e4 = bo(e4), t4 = _o({}, t4, n4, Ks);
              var i3, a2, o2 = _o({}, t4.imports, n4.imports, Ks), c2 = Do(o2), u2 = Xt(o2, c2), l2 = 0, f2 = t4.interpolate || ye, d2 = "__p += '", h2 = Se2((t4.escape || ye).source + "|" + f2.source + "|" + (f2 === Q ? fe : ye).source + "|" + (t4.evaluate || ye).source + "|$", "g"), p2 = "//# sourceURL=" + (Ue2.call(t4, "sourceURL") ? (t4.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++nt + "]") + "\n";
              e4.replace(h2, function(t5, r5, n5, s3, o3, c3) {
                return n5 || (n5 = s3), d2 += e4.slice(l2, c3).replace(_e, rr), r5 && (i3 = true, d2 += "' +\n__e(" + r5 + ") +\n'"), o3 && (a2 = true, d2 += "';\n" + o3 + ";\n__p += '"), n5 && (d2 += "' +\n((__t = (" + n5 + ")) == null ? '' : __t) +\n'"), l2 = c3 + t5.length, t5;
              }), d2 += "';\n";
              var m2 = Ue2.call(t4, "variable") && t4.variable;
              if (m2) {
                if (ue.test(m2)) throw new Ee2("Invalid `variable` option passed into `_.template`");
              } else d2 = "with (obj) {\n" + d2 + "\n}\n";
              d2 = (a2 ? d2.replace(G, "") : d2).replace(F, "$1").replace(z, "$1;"), d2 = "function(" + (m2 || "obj") + ") {\n" + (m2 ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i3 ? ", __e = _.escape" : "") + (a2 ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d2 + "return __p\n}";
              var v2 = Qo(function() {
                return Ie2(c2, p2 + "return " + d2).apply(s2, u2);
              });
              if (v2.source = d2, Ha(v2)) throw v2;
              return v2;
            }, Mr.times = function(e4, t4) {
              if ((e4 = ho(e4)) < 1 || e4 > f) return [];
              var r4 = h, n4 = vr(e4, h);
              t4 = ii(t4), e4 -= h;
              for (var s3 = Yt(n4, t4); ++r4 < e4; ) t4(r4);
              return s3;
            }, Mr.toFinite = fo, Mr.toInteger = ho, Mr.toLength = po, Mr.toLower = function(e4) {
              return bo(e4).toLowerCase();
            }, Mr.toNumber = mo, Mr.toSafeInteger = function(e4) {
              return e4 ? sn(ho(e4), -9007199254740991, f) : 0 === e4 ? e4 : 0;
            }, Mr.toString = bo, Mr.toUpper = function(e4) {
              return bo(e4).toUpperCase();
            }, Mr.trim = function(e4, t4, r4) {
              if ((e4 = bo(e4)) && (r4 || t4 === s2)) return Ht(e4);
              if (!e4 || !(t4 = as(t4))) return e4;
              var n4 = lr(e4), i3 = lr(t4);
              return gs(n4, Jt(n4, i3), Zt(n4, i3) + 1).join("");
            }, Mr.trimEnd = function(e4, t4, r4) {
              if ((e4 = bo(e4)) && (r4 || t4 === s2)) return e4.slice(0, fr(e4) + 1);
              if (!e4 || !(t4 = as(t4))) return e4;
              var n4 = lr(e4);
              return gs(n4, 0, Zt(n4, lr(t4)) + 1).join("");
            }, Mr.trimStart = function(e4, t4, r4) {
              if ((e4 = bo(e4)) && (r4 || t4 === s2)) return e4.replace(ne, "");
              if (!e4 || !(t4 = as(t4))) return e4;
              var n4 = lr(e4);
              return gs(n4, Jt(n4, lr(t4))).join("");
            }, Mr.truncate = function(e4, t4) {
              var r4 = 30, n4 = "...";
              if (Ja(t4)) {
                var i3 = "separator" in t4 ? t4.separator : i3;
                r4 = "length" in t4 ? ho(t4.length) : r4, n4 = "omission" in t4 ? as(t4.omission) : n4;
              }
              var a2 = (e4 = bo(e4)).length;
              if (nr(e4)) {
                var o2 = lr(e4);
                a2 = o2.length;
              }
              if (r4 >= a2) return e4;
              var c2 = r4 - ur(n4);
              if (c2 < 1) return n4;
              var u2 = o2 ? gs(o2, 0, c2).join("") : e4.slice(0, c2);
              if (i3 === s2) return u2 + n4;
              if (o2 && (c2 += u2.length - c2), no(i3)) {
                if (e4.slice(c2).search(i3)) {
                  var l2, f2 = u2;
                  for (i3.global || (i3 = Se2(i3.source, bo(de.exec(i3)) + "g")), i3.lastIndex = 0; l2 = i3.exec(f2); ) var d2 = l2.index;
                  u2 = u2.slice(0, d2 === s2 ? c2 : d2);
                }
              } else if (e4.indexOf(as(i3), c2) != c2) {
                var h2 = u2.lastIndexOf(i3);
                h2 > -1 && (u2 = u2.slice(0, h2));
              }
              return u2 + n4;
            }, Mr.unescape = function(e4) {
              return (e4 = bo(e4)) && Y.test(e4) ? e4.replace(W, dr) : e4;
            }, Mr.uniqueId = function(e4) {
              var t4 = ++ke2;
              return bo(e4) + t4;
            }, Mr.upperCase = Ho, Mr.upperFirst = Ko, Mr.each = va, Mr.eachRight = ba, Mr.first = zi, ac(Mr, (vc = {}, gn(Mr, function(e4, t4) {
              Ue2.call(Mr.prototype, t4) || (vc[t4] = e4);
            }), vc), { chain: false }), Mr.VERSION = "4.17.23", St(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e4) {
              Mr[e4].placeholder = Mr;
            }), St(["drop", "take"], function(e4, t4) {
              Vr.prototype[e4] = function(r4) {
                r4 = r4 === s2 ? 1 : mr(ho(r4), 0);
                var n4 = this.__filtered__ && !t4 ? new Vr(this) : this.clone();
                return n4.__filtered__ ? n4.__takeCount__ = vr(r4, n4.__takeCount__) : n4.__views__.push({ size: vr(r4, h), type: e4 + (n4.__dir__ < 0 ? "Right" : "") }), n4;
              }, Vr.prototype[e4 + "Right"] = function(t5) {
                return this.reverse()[e4](t5).reverse();
              };
            }), St(["filter", "map", "takeWhile"], function(e4, t4) {
              var r4 = t4 + 1, n4 = 1 == r4 || 3 == r4;
              Vr.prototype[e4] = function(e5) {
                var t5 = this.clone();
                return t5.__iteratees__.push({ iteratee: ii(e5, 3), type: r4 }), t5.__filtered__ = t5.__filtered__ || n4, t5;
              };
            }), St(["head", "last"], function(e4, t4) {
              var r4 = "take" + (t4 ? "Right" : "");
              Vr.prototype[e4] = function() {
                return this[r4](1).value()[0];
              };
            }), St(["initial", "tail"], function(e4, t4) {
              var r4 = "drop" + (t4 ? "" : "Right");
              Vr.prototype[e4] = function() {
                return this.__filtered__ ? new Vr(this) : this[r4](1);
              };
            }), Vr.prototype.compact = function() {
              return this.filter(rc);
            }, Vr.prototype.find = function(e4) {
              return this.filter(e4).head();
            }, Vr.prototype.findLast = function(e4) {
              return this.reverse().find(e4);
            }, Vr.prototype.invokeMap = Yn(function(e4, t4) {
              return "function" == typeof e4 ? new Vr(this) : this.map(function(r4) {
                return On(r4, e4, t4);
              });
            }), Vr.prototype.reject = function(e4) {
              return this.filter(Ua(ii(e4)));
            }, Vr.prototype.slice = function(e4, t4) {
              e4 = ho(e4);
              var r4 = this;
              return r4.__filtered__ && (e4 > 0 || t4 < 0) ? new Vr(r4) : (e4 < 0 ? r4 = r4.takeRight(-e4) : e4 && (r4 = r4.drop(e4)), t4 !== s2 && (r4 = (t4 = ho(t4)) < 0 ? r4.dropRight(-t4) : r4.take(t4 - e4)), r4);
            }, Vr.prototype.takeRightWhile = function(e4) {
              return this.reverse().takeWhile(e4).reverse();
            }, Vr.prototype.toArray = function() {
              return this.take(h);
            }, gn(Vr.prototype, function(e4, t4) {
              var r4 = /^(?:filter|find|map|reject)|While$/.test(t4), n4 = /^(?:head|last)$/.test(t4), i3 = Mr[n4 ? "take" + ("last" == t4 ? "Right" : "") : t4], a2 = n4 || /^find/.test(t4);
              i3 && (Mr.prototype[t4] = function() {
                var t5 = this.__wrapped__, o2 = n4 ? [1] : arguments, c2 = t5 instanceof Vr, u2 = o2[0], l2 = c2 || Ga(t5), f2 = function(e5) {
                  var t6 = i3.apply(Mr, Lt([e5], o2));
                  return n4 && d2 ? t6[0] : t6;
                };
                l2 && r4 && "function" == typeof u2 && 1 != u2.length && (c2 = l2 = false);
                var d2 = this.__chain__, h2 = !!this.__actions__.length, p2 = a2 && !d2, m2 = c2 && !h2;
                if (!a2 && l2) {
                  t5 = m2 ? t5 : new Vr(this);
                  var v2 = e4.apply(t5, o2);
                  return v2.__actions__.push({ func: fa, args: [f2], thisArg: s2 }), new $r(v2, d2);
                }
                return p2 && m2 ? e4.apply(this, o2) : (v2 = this.thru(f2), p2 ? n4 ? v2.value()[0] : v2.value() : v2);
              });
            }), St(["pop", "push", "shift", "sort", "splice", "unshift"], function(e4) {
              var t4 = Oe2[e4], r4 = /^(?:push|sort|unshift)$/.test(e4) ? "tap" : "thru", n4 = /^(?:pop|shift)$/.test(e4);
              Mr.prototype[e4] = function() {
                var e5 = arguments;
                if (n4 && !this.__chain__) {
                  var s3 = this.value();
                  return t4.apply(Ga(s3) ? s3 : [], e5);
                }
                return this[r4](function(r5) {
                  return t4.apply(Ga(r5) ? r5 : [], e5);
                });
              };
            }), gn(Vr.prototype, function(e4, t4) {
              var r4 = Mr[t4];
              if (r4) {
                var n4 = r4.name + "";
                Ue2.call(Or, n4) || (Or[n4] = []), Or[n4].push({ name: t4, func: r4 });
              }
            }), Or[Ms(s2, 2).name] = [{ name: "wrapper", func: s2 }], Vr.prototype.clone = function() {
              var e4 = new Vr(this.__wrapped__);
              return e4.__actions__ = Ns(this.__actions__), e4.__dir__ = this.__dir__, e4.__filtered__ = this.__filtered__, e4.__iteratees__ = Ns(this.__iteratees__), e4.__takeCount__ = this.__takeCount__, e4.__views__ = Ns(this.__views__), e4;
            }, Vr.prototype.reverse = function() {
              if (this.__filtered__) {
                var e4 = new Vr(this);
                e4.__dir__ = -1, e4.__filtered__ = true;
              } else (e4 = this.clone()).__dir__ *= -1;
              return e4;
            }, Vr.prototype.value = function() {
              var e4 = this.__wrapped__.value(), t4 = this.__dir__, r4 = Ga(e4), n4 = t4 < 0, s3 = r4 ? e4.length : 0, i3 = function(e5, t5, r5) {
                for (var n5 = -1, s4 = r5.length; ++n5 < s4; ) {
                  var i4 = r5[n5], a3 = i4.size;
                  switch (i4.type) {
                    case "drop":
                      e5 += a3;
                      break;
                    case "dropRight":
                      t5 -= a3;
                      break;
                    case "take":
                      t5 = vr(t5, e5 + a3);
                      break;
                    case "takeRight":
                      e5 = mr(e5, t5 - a3);
                  }
                }
                return { start: e5, end: t5 };
              }(0, s3, this.__views__), a2 = i3.start, o2 = i3.end, c2 = o2 - a2, u2 = n4 ? o2 : a2 - 1, l2 = this.__iteratees__, f2 = l2.length, d2 = 0, h2 = vr(c2, this.__takeCount__);
              if (!r4 || !n4 && s3 == c2 && h2 == c2) return fs2(e4, this.__actions__);
              var p2 = [];
              e: for (; c2-- && d2 < h2; ) {
                for (var m2 = -1, v2 = e4[u2 += t4]; ++m2 < f2; ) {
                  var b2 = l2[m2], g2 = b2.iteratee, y2 = b2.type, _2 = g2(v2);
                  if (2 == y2) v2 = _2;
                  else if (!_2) {
                    if (1 == y2) continue e;
                    break e;
                  }
                }
                p2[d2++] = v2;
              }
              return p2;
            }, Mr.prototype.at = da, Mr.prototype.chain = function() {
              return la(this);
            }, Mr.prototype.commit = function() {
              return new $r(this.value(), this.__chain__);
            }, Mr.prototype.next = function() {
              this.__values__ === s2 && (this.__values__ = lo(this.value()));
              var e4 = this.__index__ >= this.__values__.length;
              return { done: e4, value: e4 ? s2 : this.__values__[this.__index__++] };
            }, Mr.prototype.plant = function(e4) {
              for (var t4, r4 = this; r4 instanceof Pr; ) {
                var n4 = Mi(r4);
                n4.__index__ = 0, n4.__values__ = s2, t4 ? i3.__wrapped__ = n4 : t4 = n4;
                var i3 = n4;
                r4 = r4.__wrapped__;
              }
              return i3.__wrapped__ = e4, t4;
            }, Mr.prototype.reverse = function() {
              var e4 = this.__wrapped__;
              if (e4 instanceof Vr) {
                var t4 = e4;
                return this.__actions__.length && (t4 = new Vr(this)), (t4 = t4.reverse()).__actions__.push({ func: fa, args: [Ji], thisArg: s2 }), new $r(t4, this.__chain__);
              }
              return this.thru(Ji);
            }, Mr.prototype.toJSON = Mr.prototype.valueOf = Mr.prototype.value = function() {
              return fs2(this.__wrapped__, this.__actions__);
            }, Mr.prototype.first = Mr.prototype.head, Ke2 && (Mr.prototype[Ke2] = function() {
              return this;
            }), Mr;
          }();
          ft._ = hr, (n2 = function() {
            return hr;
          }.call(t2, r2, t2, e2)) === s2 || (e2.exports = n2);
        }.call(this);
      }, 80(e2, t2, r2) {
        e2 = r2.nmd(e2);
        try {
          process.dlopen(e2, r2(928).join(__dirname, r2.p, "sa.node"));
        } catch (e3) {
          throw new Error("node-loader:\n" + e3);
        }
      }, 216(e2, t2, r2) {
        "use strict";
        var n2, s2, i2, a;
        r2.d(t2, { A8: () => s2, aU: () => n2, tQ: () => i2 }), r2(543), function(e3) {
          e3.STANDARD = "STANDARD", e3.EXTENDED = "EXTENDED";
        }(n2 || (n2 = {})), function(e3) {
          e3.PHYSICAL = "PHYSICAL", e3.FUNCTIONAL = "FUNCTIONAL";
        }(s2 || (s2 = {})), function(e3) {
          e3.NORMAL = "NORMAL", e3.FIXED_NORMAL = "NORMAL_FIXED", e3.EXTENDED = "EXTENDED", e3.MIXED = "MIXED", e3.ENHANCED = "ENHANCED";
        }(i2 || (i2 = {})), function(e3) {
          e3[e3.CAN_BUS_ERROR = 0] = "CAN_BUS_ERROR", e3[e3.CAN_READ_TIMEOUT = 1] = "CAN_READ_TIMEOUT", e3[e3.CAN_BUS_BUSY = 2] = "CAN_BUS_BUSY", e3[e3.CAN_BUS_CLOSED = 3] = "CAN_BUS_CLOSED", e3[e3.CAN_INTERNAL_ERROR = 4] = "CAN_INTERNAL_ERROR", e3[e3.CAN_PARAM_ERROR = 5] = "CAN_PARAM_ERROR", e3[e3.CAN_DRIVER_SILENT = 6] = "CAN_DRIVER_SILENT";
        }(a || (a = {})), a.CAN_BUS_ERROR, a.CAN_READ_TIMEOUT, a.CAN_BUS_BUSY, a.CAN_INTERNAL_ERROR, a.CAN_BUS_CLOSED, a.CAN_PARAM_ERROR, a.CAN_DRIVER_SILENT, Error;
      }, 229(e2, t2, r2) {
        "use strict";
        r2.r(t2), r2.d(t2, { CRC: () => s2 });
        const n2 = class {
          static Reflect8(e3) {
            for (var t3 = 0, r3 = 0; r3 < 8; r3++) e3 & 1 << r3 && (t3 |= 1 << 7 - r3 & 255);
            return t3;
          }
          static Reflect16(e3) {
            for (var t3 = 0, r3 = 0; r3 < 16; r3++) e3 & 1 << r3 && (t3 |= 1 << 15 - r3 & 65535);
            return t3;
          }
          static Reflect32(e3) {
            for (var t3 = 0, r3 = 0; r3 < 32; r3++) e3 & 1 << r3 && (t3 |= 1 << 31 - r3 & 4294967295);
            return t3 >>> 0;
          }
          static ReflectGeneric(e3, t3) {
            for (var r3 = 0, n3 = 0; n3 < t3; n3++) e3 & 1 << n3 && (r3 |= 1 << t3 - 1 - n3);
            return 32 === t3 ? r3 >>> 0 : r3;
          }
        };
        class s2 {
          _width;
          _name;
          _polynomial;
          _initialVal;
          _finalXorVal;
          _inputReflected;
          _resultReflected;
          static _list;
          _crcTable;
          _castMask;
          _msbMask;
          get width() {
            return this._width;
          }
          set width(e3) {
            switch (this._width = e3, e3) {
              case 8:
                this._castMask = 255;
                break;
              case 16:
                this._castMask = 65535;
                break;
              case 32:
                this._castMask = 4294967295;
                break;
              default:
                throw "Invalid CRC width";
            }
            this._msbMask = 1 << e3 - 1;
          }
          get name() {
            return this._name;
          }
          set name(e3) {
            this._name = e3;
          }
          get polynomial() {
            return this._polynomial;
          }
          set polynomial(e3) {
            this._polynomial = e3;
          }
          get initial() {
            return this._initialVal;
          }
          set initial(e3) {
            this._initialVal = e3;
          }
          get finalXor() {
            return this._finalXorVal;
          }
          set finalXor(e3) {
            this._finalXorVal = e3;
          }
          get inputReflected() {
            return this._inputReflected;
          }
          set inputReflected(e3) {
            this._inputReflected = e3;
          }
          get resultReflected() {
            return this._resultReflected;
          }
          set resultReflected(e3) {
            this._resultReflected = e3;
          }
          constructor(e3, t3, r3, n3, s3, i2, a) {
            this.width = t3, this.name = e3, this.polynomial = r3, this.initial = n3, this.finalXor = s3, this.inputReflected = i2, this.resultReflected = a;
          }
          static buildInCrc(e3) {
            return this.defaults.find((t3) => t3.name === e3);
          }
          static get defaults() {
            return this._list || (this._list = [new s2("CRC8", 8, 7, 0, 0, false, false), new s2("CRC8_SAE_J1850", 8, 29, 255, 255, false, false), new s2("CRC8_SAE_J1850_ZERO", 8, 29, 0, 0, false, false), new s2("CRC8_8H2F", 8, 47, 255, 255, false, false), new s2("CRC8_CDMA2000", 8, 155, 255, 0, false, false), new s2("CRC8_DARC", 8, 57, 0, 0, true, true), new s2("CRC8_DVB_S2", 8, 213, 0, 0, false, false), new s2("CRC8_EBU", 8, 29, 255, 0, true, true), new s2("CRC8_ICODE", 8, 29, 253, 0, false, false), new s2("CRC8_ITU", 8, 7, 0, 85, false, false), new s2("CRC8_MAXIM", 8, 49, 0, 0, true, true), new s2("CRC8_ROHC", 8, 7, 255, 0, true, true), new s2("CRC8_WCDMA", 8, 155, 0, 0, true, true), new s2("CRC16_CCIT_ZERO", 16, 4129, 0, 0, false, false), new s2("CRC16_ARC", 16, 32773, 0, 0, true, true), new s2("CRC16_AUG_CCITT", 16, 4129, 7439, 0, false, false), new s2("CRC16_BUYPASS", 16, 32773, 0, 0, false, false), new s2("CRC16_CCITT_FALSE", 16, 4129, 65535, 0, false, false), new s2("CRC16_CDMA2000", 16, 51303, 65535, 0, false, false), new s2("CRC16_DDS_110", 16, 32773, 32781, 0, false, false), new s2("CRC16_DECT_R", 16, 1417, 0, 1, false, false), new s2("CRC16_DECT_X", 16, 1417, 0, 0, false, false), new s2("CRC16_DNP", 16, 15717, 0, 65535, true, true), new s2("CRC16_EN_13757", 16, 15717, 0, 65535, false, false), new s2("CRC16_GENIBUS", 16, 4129, 65535, 65535, false, false), new s2("CRC16_MAXIM", 16, 32773, 0, 65535, true, true), new s2("CRC16_MCRF4XX", 16, 4129, 65535, 0, true, true), new s2("CRC16_RIELLO", 16, 4129, 45738, 0, true, true), new s2("CRC16_T10_DIF", 16, 35767, 0, 0, false, false), new s2("CRC16_TELEDISK", 16, 41111, 0, 0, false, false), new s2("CRC16_TMS37157", 16, 4129, 35308, 0, true, true), new s2("CRC16_USB", 16, 32773, 65535, 65535, true, true), new s2("CRC16_A", 16, 4129, 50886, 0, true, true), new s2("CRC16_KERMIT", 16, 4129, 0, 0, true, true), new s2("CRC16_MODBUS", 16, 32773, 65535, 0, true, true), new s2("CRC16_X_25", 16, 4129, 65535, 65535, true, true), new s2("CRC16_XMODEM", 16, 4129, 0, 0, false, false), new s2("CRC32", 32, 79764919, 4294967295, 4294967295, true, true), new s2("CRC32_BZIP2", 32, 79764919, 4294967295, 4294967295, false, false), new s2("CRC32_C", 32, 517762881, 4294967295, 4294967295, true, true), new s2("CRC32_D", 32, 2821953579, 4294967295, 4294967295, true, true), new s2("CRC32_MPEG2", 32, 79764919, 4294967295, 0, false, false), new s2("CRC32_POSIX", 32, 79764919, 0, 4294967295, false, false), new s2("CRC32_Q", 32, 2168537515, 0, 0, false, false), new s2("CRC32_JAMCRC", 32, 79764919, 4294967295, 0, true, true), new s2("CRC32_XFER", 32, 175, 0, 0, false, false)]), this._list;
          }
          makeCrcTable() {
            this._crcTable = new Array(256);
            for (var e3 = 0; e3 < 256; e3++) {
              for (var t3 = e3 << this._width - 8 & this._castMask, r3 = 0; r3 < 8; r3++) t3 = 0 != (t3 & this._msbMask) ? (t3 << 1 ^ this._polynomial) & this._castMask : t3 << 1 & this._castMask;
              this._crcTable[e3] = (t3 & this._castMask) >>> 0;
            }
          }
          makeCrcTableReversed() {
            this._crcTable = new Array(256);
            for (var e3 = 0; e3 < 256; e3++) {
              for (var t3 = n2.Reflect8(e3) << this._width - 8 & this._castMask, r3 = 0; r3 < 8; r3++) t3 = 0 != (t3 & this._msbMask) ? (t3 << 1 ^ this._polynomial) & this._castMask : t3 << 1 & this._castMask;
              t3 = n2.ReflectGeneric(t3, this.width), this._crcTable[e3] = (t3 & this._castMask) >>> 0;
            }
          }
          compute(e3) {
            this._crcTable || this.makeCrcTable();
            for (var t3 = this._initialVal, r3 = 0; r3 < e3.length; r3++) {
              var s3 = 255 & e3[r3];
              this.inputReflected && (s3 = n2.Reflect8(s3));
              var i2 = (t3 = (t3 ^ s3 << this._width - 8) & this._castMask) >>> this.width - 8 & 255;
              t3 = ((t3 = t3 << 8 & this._castMask) ^ this._crcTable[i2]) & this._castMask;
            }
            return this.resultReflected && (t3 = n2.ReflectGeneric(t3, this.width)), ((t3 ^ this._finalXorVal) & this._castMask) >>> 0;
          }
          computeBuffer(e3) {
            let t3 = this.compute(e3);
            if (8 === this.width) return Buffer.from([t3]);
            if (16 === this.width) {
              let e4 = Buffer.alloc(2);
              return e4.writeUInt16BE(65535 & t3, 0), e4;
            }
            if (32 === this.width) {
              let e4 = Buffer.alloc(4);
              return e4.writeUInt32BE(t3 >>> 0, 0), e4;
            }
            throw new Error("Unsupported length");
          }
          get table() {
            return this._crcTable;
          }
        }
      }, 531(e2, t2, r2) {
        "use strict";
        r2.d(t2, { tQ: () => W.tQ, A8: () => W.A8, aU: () => W.aU, bJ: () => qe, tH: () => He, Bu: () => Ye, re: () => V, b3: () => P, Bz: () => $, Ny: () => ct, ZS: () => vt, sT: () => Ie, _G: () => we, J0: () => Je, FN: () => Qe, Pl: () => Pe, Km: () => Me, vA: () => Z(), gM: () => je, rK: () => Be, q0: () => Ge, cG: () => bt, bH: () => X, od: () => K, V1: () => rt, sd: () => it, Nz: () => dt, Qb: () => ft, Ln: () => lt, ZE: () => ht, CG: () => et, U6: () => Ne, YX: () => ut, hf: () => at, nr: () => pt, fw: () => tt, gc: () => Ze, OG: () => nt, TX: () => st, w5: () => ot, t6: () => xe, m4: () => Re });
        const n2 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), i2 = /* @__PURE__ */ new WeakMap(), a = Symbol("anyProducer"), o = Promise.resolve(), c = Symbol("listenerAdded"), u = Symbol("listenerRemoved");
        let l = false, f = false;
        const d = (e3) => "string" == typeof e3 || "symbol" == typeof e3 || "number" == typeof e3;
        function h(e3) {
          if (!d(e3)) throw new TypeError("`eventName` must be a string, symbol, or number");
        }
        function p(e3) {
          if ("function" != typeof e3) throw new TypeError("listener must be a function");
        }
        function m(e3, t3) {
          const r3 = s2.get(e3);
          if (r3.has(t3)) return r3.get(t3);
        }
        function v(e3, t3) {
          const r3 = d(t3) ? t3 : a, n3 = i2.get(e3);
          if (n3.has(r3)) return n3.get(r3);
        }
        function b(e3, t3) {
          t3 = Array.isArray(t3) ? t3 : [t3];
          let r3 = false, n3 = () => {
          }, s3 = [];
          const a2 = { enqueue(e4) {
            s3.push(e4), n3();
          }, finish() {
            r3 = true, n3();
          } };
          for (const r4 of t3) {
            let t4 = v(e3, r4);
            t4 || (t4 = /* @__PURE__ */ new Set(), i2.get(e3).set(r4, t4)), t4.add(a2);
          }
          return { async next() {
            return s3 ? 0 === s3.length ? r3 ? (s3 = void 0, this.next()) : (await new Promise((e4) => {
              n3 = e4;
            }), this.next()) : { done: false, value: await s3.shift() } : { done: true };
          }, async return(r4) {
            s3 = void 0;
            for (const r5 of t3) {
              const t4 = v(e3, r5);
              t4 && (t4.delete(a2), 0 === t4.size) && i2.get(e3).delete(r5);
            }
            return n3(), arguments.length > 0 ? { done: true, value: await r4 } : { done: true };
          }, [Symbol.asyncIterator]() {
            return this;
          } };
        }
        function g(e3) {
          if (void 0 === e3) return I;
          if (!Array.isArray(e3)) throw new TypeError("`methodNames` must be an array of strings");
          for (const t3 of e3) if (!I.includes(t3)) {
            if ("string" != typeof t3) throw new TypeError("`methodNames` element must be a string");
            throw new Error(`${t3} is not Emittery method`);
          }
          return e3;
        }
        const y = (e3) => e3 === c || e3 === u;
        function _(e3, t3, r3) {
          if (y(t3)) try {
            l = true, e3.emit(t3, r3);
          } finally {
            l = false;
          }
        }
        class E {
          static mixin(e3, t3) {
            return t3 = g(t3), (r3) => {
              if ("function" != typeof r3) throw new TypeError("`target` must be function");
              for (const e4 of t3) if (void 0 !== r3.prototype[e4]) throw new Error(`The property \`${e4}\` already exists on \`target\``);
              Object.defineProperty(r3.prototype, e3, { enumerable: false, get: function() {
                return Object.defineProperty(this, e3, { enumerable: false, value: new E() }), this[e3];
              } });
              const n3 = (t4) => function(...r4) {
                return this[e3][t4](...r4);
              };
              for (const e4 of t3) Object.defineProperty(r3.prototype, e4, { enumerable: false, value: n3(e4) });
              return r3;
            };
          }
          static get isDebugEnabled() {
            if ("object" != typeof globalThis.process?.env) return f;
            const { env: e3 } = globalThis.process ?? { env: {} };
            return "emittery" === e3.DEBUG || "*" === e3.DEBUG || f;
          }
          static set isDebugEnabled(e3) {
            f = e3;
          }
          constructor(e3 = {}) {
            n2.set(this, /* @__PURE__ */ new Set()), s2.set(this, /* @__PURE__ */ new Map()), i2.set(this, /* @__PURE__ */ new Map()), i2.get(this).set(a, /* @__PURE__ */ new Set()), this.debug = e3.debug ?? {}, void 0 === this.debug.enabled && (this.debug.enabled = false), this.debug.logger || (this.debug.logger = (e4, t3, r3, n3) => {
              try {
                n3 = JSON.stringify(n3);
              } catch {
                n3 = `Object with the following keys failed to stringify: ${Object.keys(n3).join(",")}`;
              }
              "symbol" != typeof r3 && "number" != typeof r3 || (r3 = r3.toString());
              const s3 = /* @__PURE__ */ new Date(), i3 = `${s3.getHours()}:${s3.getMinutes()}:${s3.getSeconds()}.${s3.getMilliseconds()}`;
              console.log(`[${i3}][emittery:${e4}][${t3}] Event Name: ${r3}
	data: ${n3}`);
            });
          }
          logIfDebugEnabled(e3, t3, r3) {
            (E.isDebugEnabled || this.debug.enabled) && this.debug.logger(e3, this.debug.name, t3, r3);
          }
          on(e3, t3, { signal: r3 } = {}) {
            p(t3), e3 = Array.isArray(e3) ? e3 : [e3];
            for (const r4 of e3) {
              h(r4);
              let e4 = m(this, r4);
              e4 || (e4 = /* @__PURE__ */ new Set(), s2.get(this).set(r4, e4)), e4.add(t3), this.logIfDebugEnabled("subscribe", r4, void 0), y(r4) || _(this, c, { eventName: r4, listener: t3 });
            }
            const n3 = () => {
              this.off(e3, t3), r3?.removeEventListener("abort", n3);
            };
            return r3?.addEventListener("abort", n3, { once: true }), r3?.aborted && n3(), n3;
          }
          off(e3, t3) {
            p(t3), e3 = Array.isArray(e3) ? e3 : [e3];
            for (const r3 of e3) {
              h(r3);
              const e4 = m(this, r3);
              e4 && (e4.delete(t3), 0 === e4.size) && s2.get(this).delete(r3), this.logIfDebugEnabled("unsubscribe", r3, void 0), y(r3) || _(this, u, { eventName: r3, listener: t3 });
            }
          }
          once(e3, t3) {
            if (void 0 !== t3 && "function" != typeof t3) throw new TypeError("predicate must be a function");
            let r3;
            const n3 = new Promise((n4) => {
              r3 = this.on(e3, (e4) => {
                t3 && !t3(e4) || (r3(), n4(e4));
              });
            });
            return n3.off = r3, n3;
          }
          events(e3) {
            e3 = Array.isArray(e3) ? e3 : [e3];
            for (const t3 of e3) h(t3);
            return b(this, e3);
          }
          async emit(e3, t3) {
            if (h(e3), y(e3) && !l) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
            this.logIfDebugEnabled("emit", e3, t3), function(e4, t4, r4) {
              const n3 = i2.get(e4);
              if (n3.has(t4)) for (const e5 of n3.get(t4)) e5.enqueue(r4);
              if (n3.has(a)) {
                const e5 = Promise.all([t4, r4]);
                for (const t5 of n3.get(a)) t5.enqueue(e5);
              }
            }(this, e3, t3);
            const r3 = m(this, e3) ?? /* @__PURE__ */ new Set(), s3 = n2.get(this), c2 = [...r3], u2 = y(e3) ? [] : [...s3];
            await o, await Promise.all([...c2.map(async (e4) => {
              if (r3.has(e4)) return e4(t3);
            }), ...u2.map(async (r4) => {
              if (s3.has(r4)) return r4(e3, t3);
            })]);
          }
          async emitSerial(e3, t3) {
            if (h(e3), y(e3) && !l) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
            this.logIfDebugEnabled("emitSerial", e3, t3);
            const r3 = m(this, e3) ?? /* @__PURE__ */ new Set(), s3 = n2.get(this), i3 = [...r3], a2 = [...s3];
            await o;
            for (const e4 of i3) r3.has(e4) && await e4(t3);
            for (const r4 of a2) s3.has(r4) && await r4(e3, t3);
          }
          onAny(e3, { signal: t3 } = {}) {
            p(e3), this.logIfDebugEnabled("subscribeAny", void 0, void 0), n2.get(this).add(e3), _(this, c, { listener: e3 });
            const r3 = () => {
              this.offAny(e3), t3?.removeEventListener("abort", r3);
            };
            return t3?.addEventListener("abort", r3, { once: true }), t3?.aborted && r3(), r3;
          }
          anyEvent() {
            return b(this);
          }
          offAny(e3) {
            p(e3), this.logIfDebugEnabled("unsubscribeAny", void 0, void 0), _(this, u, { listener: e3 }), n2.get(this).delete(e3);
          }
          clearListeners(e3) {
            e3 = Array.isArray(e3) ? e3 : [e3];
            for (const t3 of e3) if (this.logIfDebugEnabled("clear", t3, void 0), d(t3)) {
              const e4 = m(this, t3);
              e4 && e4.clear();
              const r3 = v(this, t3);
              if (r3) {
                for (const e5 of r3) e5.finish();
                r3.clear();
              }
            } else {
              n2.get(this).clear();
              for (const [e4, t4] of s2.get(this).entries()) t4.clear(), s2.get(this).delete(e4);
              for (const [e4, t4] of i2.get(this).entries()) {
                for (const e5 of t4) e5.finish();
                t4.clear(), i2.get(this).delete(e4);
              }
            }
          }
          listenerCount(e3) {
            e3 = Array.isArray(e3) ? e3 : [e3];
            let t3 = 0;
            for (const r3 of e3) if (d(r3)) t3 += n2.get(this).size + (m(this, r3)?.size ?? 0) + (v(this, r3)?.size ?? 0) + (v(this)?.size ?? 0);
            else {
              void 0 !== r3 && h(r3), t3 += n2.get(this).size;
              for (const e4 of s2.get(this).values()) t3 += e4.size;
              for (const e4 of i2.get(this).values()) t3 += e4.size;
            }
            return t3;
          }
          bindMethods(e3, t3) {
            if ("object" != typeof e3 || null === e3) throw new TypeError("`target` must be an object");
            t3 = g(t3);
            for (const r3 of t3) {
              if (void 0 !== e3[r3]) throw new Error(`The property \`${r3}\` already exists on \`target\``);
              Object.defineProperty(e3, r3, { enumerable: false, value: this[r3].bind(this) });
            }
          }
        }
        const I = Object.getOwnPropertyNames(E.prototype).filter((e3) => "constructor" !== e3);
        Object.defineProperty(E, "listenerAdded", { value: c, writable: false, enumerable: true, configurable: false }), Object.defineProperty(E, "listenerRemoved", { value: u, writable: false, enumerable: true, configurable: false });
        var w = r2(982), T = r2.n(w);
        const S = { randomUUID: T().randomUUID }, N = new Uint8Array(256);
        let R = N.length;
        function O() {
          return R > N.length - 16 && (T().randomFillSync(N), R = 0), N.slice(R, R += 16);
        }
        const A = [];
        for (let e3 = 0; e3 < 256; ++e3) A.push((e3 + 256).toString(16).slice(1));
        const D = function(e3, t3, r3) {
          if (S.randomUUID && !t3 && !e3) return S.randomUUID();
          const n3 = (e3 = e3 || {}).random || (e3.rng || O)();
          if (n3[6] = 15 & n3[6] | 64, n3[8] = 63 & n3[8] | 128, t3) {
            r3 = r3 || 0;
            for (let e4 = 0; e4 < 16; ++e4) t3[r3 + e4] = n3[e4];
            return t3;
          }
          return function(e4, t4 = 0) {
            return A[e4[t4 + 0]] + A[e4[t4 + 1]] + A[e4[t4 + 2]] + A[e4[t4 + 3]] + "-" + A[e4[t4 + 4]] + A[e4[t4 + 5]] + "-" + A[e4[t4 + 6]] + A[e4[t4 + 7]] + "-" + A[e4[t4 + 8]] + A[e4[t4 + 9]] + "-" + A[e4[t4 + 10]] + A[e4[t4 + 11]] + A[e4[t4 + 12]] + A[e4[t4 + 13]] + A[e4[t4 + 14]] + A[e4[t4 + 15]];
          }(n3);
        };
        function C(e3, t3) {
          return !(!e3 || (!t3.includes("job") || e3.startsWith("0x")) && (!t3.includes("uds") || !e3.startsWith("0x")));
        }
        function L(e3) {
          return Buffer.from(e3.value);
        }
        const U = 65536;
        function k(e3, t3) {
          const r3 = Buffer.alloc(t3);
          return e3.copy(r3, 0, 0, e3.length), r3;
        }
        function x(e3) {
          let t3 = 0, r3 = Buffer.alloc(U);
          for (const n3 of e3) {
            const e4 = L(n3), s3 = Math.ceil(n3.bitLen / 8);
            t3 + s3 > U && (r3 = k(r3, 2 * (t3 + s3))), e4.copy(r3, t3), t3 += s3;
          }
          return r3.subarray(0, t3);
        }
        function B(e3) {
          return Buffer.concat([Buffer.from([Number(e3.serviceId)]), x(e3.params)]);
        }
        function M(e3) {
          const t3 = Buffer.alloc(U);
          return e3.isNegativeResponse ? (t3[0] = 127, t3[1] = Number(e3.serviceId), t3[2] = e3.nrc || 0, t3.subarray(0, 3)) : Buffer.concat([Buffer.from([Number(e3.serviceId) + 64]), x(e3.respParams)]);
        }
        function j(e3, t3) {
          const r3 = Math.ceil(e3.bitLen / 8);
          if (t3.length > r3) throw new Error(`value length ${t3.length} should less than ${r3}`);
          switch (e3.type) {
            case "NUM": {
              let n3 = 0;
              for (let e4 = 0; e4 < r3; e4++) n3 = n3 << 8 | t3.readUInt8(e4);
              e3.phyValue = n3, e3.value = t3;
              break;
            }
            case "ARRAY":
              e3.phyValue = function(e4) {
                const t4 = [];
                for (let r4 = 0; r4 < e4.length; r4 += 2) t4.push(e4.substring(r4, r4 + 2));
                return t4.join(" ");
              }(t3.toString("hex").padStart(2 * r3, "0")), e3.value = t3;
              break;
            case "ASCII":
              e3.phyValue = t3.toString("ascii"), e3.value = t3;
              break;
            case "UNICODE":
              e3.phyValue = t3.toString("utf-8"), e3.value = t3;
              break;
            case "FLOAT":
              e3.phyValue = t3.readFloatBE(0), e3.value = t3;
              break;
            case "DOUBLE":
              e3.phyValue = t3.readDoubleBE(0), e3.value = t3;
          }
          e3.value = t3;
        }
        var P, $, V, G, F, z, W = r2(216), q = r2(167), Y = r2(543);
        !function(e3) {
          e3.SEND = "SEND", e3.RECV = "RECV", e3.RECV_AUTO_LEN = "RECV_AUTO_LEN";
        }(P || (P = {})), function(e3) {
          e3.MASTER = "MASTER", e3.SLAVE = "SLAVE";
        }($ || ($ = {})), function(e3) {
          e3.CLASSIC = "CLASSIC", e3.ENHANCED = "ENHANCED";
        }(V || (V = {})), function(e3) {
          e3[e3.LIN_BUS_ERROR = 0] = "LIN_BUS_ERROR", e3[e3.LIN_READ_TIMEOUT = 1] = "LIN_READ_TIMEOUT", e3[e3.LIN_BUS_BUSY = 2] = "LIN_BUS_BUSY", e3[e3.LIN_BUS_CLOSED = 3] = "LIN_BUS_CLOSED", e3[e3.LIN_INTERNAL_ERROR = 4] = "LIN_INTERNAL_ERROR", e3[e3.LIN_PARAM_ERROR = 5] = "LIN_PARAM_ERROR";
        }(G || (G = {})), G.LIN_BUS_ERROR, G.LIN_READ_TIMEOUT, G.LIN_BUS_BUSY, G.LIN_INTERNAL_ERROR, G.LIN_BUS_CLOSED, G.LIN_PARAM_ERROR, Error, function(e3) {
          e3.PHYSICAL = "PHYSICAL", e3.FUNCTIONAL = "FUNCTIONAL";
        }(F || (F = {})), function(e3) {
          e3.DIAG_ONLY = "DIAG_ONLY", e3.DIAG_INTERLEAVED = "DIAG_INTERLEAVED";
        }(z || (z = {}));
        const H = [128, 193, 66, 3, 196, 133, 6, 71, 8, 73, 202, 139, 76, 13, 142, 207, 80, 17, 146, 211, 20, 85, 214, 151, 216, 153, 26, 91, 156, 221, 94, 31, 32, 97, 226, 163, 100, 37, 166, 231, 168, 233, 106, 43, 236, 173, 46, 111, 240, 177, 50, 115, 180, 245, 118, 55, 120, 57, 186, 251, 60, 125, 254, 191];
        function K(e3) {
          return H[e3];
        }
        function X(e3, t3, r3) {
          let n3 = 0;
          if (t3 === V.CLASSIC) {
            for (let t4 = 0; t4 < e3.length; t4++) n3 += e3[t4], n3 = (255 & n3) + (n3 >> 8);
            n3 = 255 & ~n3;
          } else {
            if (void 0 === r3) throw new Error("pid required for enhanced checksum");
            n3 = r3;
            for (let t4 = 0; t4 < e3.length; t4++) n3 += e3[t4], n3 = (255 & n3) + (n3 >> 8);
            n3 = 255 - n3;
          }
          return n3;
        }
        function Q(e3, t3) {
          const r3 = Buffer.alloc(t3.frameSize);
          for (const n3 of t3.signals) {
            const t4 = (0, Y.cloneDeep)(e3.signals[n3.name]);
            if (t4) if ("ByteArray" === t4.singleType) {
              const e4 = null != t4.value ? t4.value : t4.initValue, s3 = Math.ceil(t4.signalSizeBits / 8);
              e4.reverse();
              for (let t5 = 0; t5 < s3 && t5 < e4.length; t5++) {
                const s4 = n3.offset + 8 * t5, i3 = Math.floor(s4 / 8), a2 = s4 % 8;
                0 === a2 ? r3[i3] = e4[t5] : (r3[i3] |= e4[t5] << a2 & 255, i3 + 1 < r3.length && (r3[i3 + 1] = e4[t5] >> 8 - a2 & 255));
              }
            } else {
              let e4 = null != t4.value ? t4.value : t4.initValue;
              for (let s3 = 0; s3 < t4.signalSizeBits; s3++) {
                const t5 = n3.offset + s3, i3 = Math.floor(t5 / 8), a2 = t5 % 8;
                i3 < r3.length && (r3[i3] &= ~(1 << a2), 1 & ~e4 || (r3[i3] |= 1 << a2), e4 >>= 1);
              }
            }
          }
          return r3;
        }
        const J = require("node:assert");
        var Z = r2.n(J);
        function ee(e3, t3, r3) {
          const n3 = { numVal: void 0, strVal: void 0, usedEncode: void 0 };
          for (const r4 of t3) switch (r4.type) {
            case "physicalValue":
              if (r4.physicalValue) {
                const { minValue: t4, maxValue: s3, scale: i3, offset: a2 } = r4.physicalValue;
                if (e3 >= t4 && e3 <= s3) {
                  const t5 = Number((i3 * e3 + a2).toFixed(3)), s4 = r4.physicalValue.textInfo ? `${t5}${r4.physicalValue.textInfo}` : void 0;
                  n3.numVal = t5, n3.strVal = s4, n3.usedEncode = r4;
                }
              }
              break;
            case "logicalValue":
              r4.logicalValue && r4.logicalValue.signalValue === e3 && (n3.strVal = r4.logicalValue.textInfo || "", n3.usedEncode = r4);
              break;
            case "bcdValue":
              n3.numVal = e3.toString().split("").map(Number).reduce((e4, t4) => e4 << 4 | t4, 0), n3.usedEncode = r4;
              break;
            case "asciiValue":
              n3.strVal = e3.toString(), n3.usedEncode = r4;
          }
          return n3;
        }
        function te(e3, t3, r3) {
          for (const n3 of e3.signals) {
            const e4 = r3.signals[n3.name];
            if (!e4) continue;
            let s3 = 0;
            const i3 = n3.offset, a2 = e4.signalSizeBits;
            if ("ByteArray" === e4.singleType) {
              const r4 = Math.floor(i3 / 8), n4 = Math.ceil(a2 / 8), o2 = i3 % 8;
              if (0 === o2) {
                const i4 = Buffer.alloc(8);
                for (let e5 = 0; e5 < n4 && r4 + e5 < t3.length; e5++) i4[e5] = t3[r4 + e5];
                a2 <= 8 ? s3 = i4[0] : a2 <= 16 ? s3 = i4.readUInt16BE(0) : a2 <= 24 ? s3 = i4.readUInt16BE(0) << 8 | i4[2] : a2 <= 32 ? s3 = i4.readUInt32BE(0) : (s3 = i4.subarray(0, n4).toString("hex"), e4.value = Array.prototype.slice.call(i4.subarray(0, n4), 0));
              } else {
                let i4 = Buffer.alloc(8);
                for (let e5 = 0; e5 < n4 && r4 + e5 < t3.length; e5++) {
                  const n5 = t3[r4 + e5], s4 = r4 + e5 + 1 < t3.length ? t3[r4 + e5 + 1] : 0;
                  i4[e5] = 255 & (n5 >> o2 | s4 << 8 - o2);
                }
                i4 = i4.subarray(0, n4), i4 = i4.reverse(), a2 <= 8 ? s3 = i4[0] : a2 <= 16 ? s3 = i4.readUInt16BE(0) : a2 <= 24 ? s3 = i4.readUInt16BE(0) << 8 | i4[2] : a2 <= 32 ? s3 = i4.readUInt32BE(0) : (s3 = i4.subarray(0, n4).toString("hex"), e4.value = Array.prototype.slice.call(i4.subarray(0, n4), 0));
              }
              "number" == typeof s3 && (s3 &= (1 << a2) - 1, e4.value = s3), e4.physValue = s3;
            } else {
              let n4 = 0;
              for (let e5 = 0; e5 < a2; e5++) {
                const r4 = i3 + e5, s4 = Math.floor(r4 / 8), a3 = r4 % 8;
                s4 < t3.length && t3[s4] & 1 << a3 && (n4 |= 1 << e5);
              }
              e4.value = n4, e4.physValue = n4;
              for (const t4 of Object.keys(r3.signalRep)) if (r3.signalRep[t4].includes(e4.signalName)) {
                const s4 = r3.signalEncodeTypes[t4], { numVal: i4, strVal: a3, usedEncode: o2 } = ee(n4, s4.encodingTypes);
                o2 && (e4.physValueEnum = a3, void 0 !== i4 && (e4.physValue = i4));
                break;
              }
            }
          }
        }
        function re(e3) {
          return Math.pow(2, e3) - 1;
        }
        function ne(e3, t3) {
          let r3 = Math.round((e3 - Number(t3.offset)) / Number(t3.factor));
          const n3 = re(t3.bit_length);
          return t3.is_signed ? r3 < 0 ? (s3 = r3, i3 = t3.bit_length, r3 = s3 >= 0 ? s3 : 1 + ~-s3 & (1 << i3) - 1) : r3 > n3 / 2 && (r3 = Math.floor(n3 / 2)) : r3 = Math.min(Math.max(r3, 0), n3), r3;
          var s3, i3;
        }
        function se(e3) {
          if (void 0 === e3.value) return;
          const t3 = e3.values[e3.value];
          if (t3) e3.physValue = t3;
          else if (e3.is_float) if (64 === e3.bit_length) {
            const t4 = new ArrayBuffer(8), r3 = new DataView(t4), n3 = BigInt(e3.value);
            r3.setUint32(0, Number(0xffffffffn & n3), true), r3.setUint32(4, Number(n3 >> 32n), true);
            const s3 = r3.getFloat64(0, true);
            e3.physValue = Number.isInteger(s3) ? `${s3}.0` : s3.toString();
          } else {
            const t4 = new ArrayBuffer(4), r3 = new DataView(t4);
            r3.setUint32(0, Number(e3.value), true);
            const n3 = r3.getFloat32(0, true);
            e3.physValue = Number.isInteger(n3) ? `${n3}.0` : n3.toString();
          }
          else {
            const t4 = function(e4, t5) {
              let r3 = e4;
              var n3, s3;
              return t5.is_signed && e4 > re(t5.bit_length) / 2 && (r3 = (n3 = e4) & 1 << (s3 = t5.bit_length) - 1 ? -(1 + ~n3 & (1 << s3) - 1) : n3), r3 * Number(t5.factor) + Number(t5.offset);
            }(Number(e3.value), e3);
            e3.physValue = t4.toString(), e3.min != e3.max && (t4 < Number(e3.min) ? (e3.value = ne(Number(e3.min), e3).toString(), e3.physValue = e3.min) : t4 > Number(e3.max) && (e3.value = ne(Number(e3.max), e3).toString(), e3.physValue = e3.max));
          }
        }
        function ie(e3, t3) {
          const r3 = Date.now();
          if (void 0 === e3.physValue) return;
          for (const [t4, r4] of Object.entries(e3.values)) if (r4 === e3.physValue) return void (e3.value = t4);
          if (e3.is_float) if (32 === e3.bit_length) {
            const t4 = new ArrayBuffer(4), r4 = new DataView(t4);
            r4.setFloat32(0, Number(e3.physValue), true), e3.value = r4.getUint32(0, true).toString();
          } else {
            const t4 = new ArrayBuffer(8), r4 = new DataView(t4);
            r4.setFloat64(0, Number(e3.physValue), true), e3.value = r4.getUint32(0, true).toString();
          }
          else {
            let t4 = e3.physValue;
            e3.min != e3.max && (Number(t4) < Number(e3.min) ? t4 = e3.min : Number(t4) > Number(e3.max) && (t4 = e3.max), t4 !== e3.physValue && (e3.physValue = t4)), e3.value = ne(Number(t4), e3).toString();
          }
          const n3 = Date.now();
          console.log("updateSignalPhys", n3 - r3);
        }
        function ae(e3, t3) {
          return e3.mux_val_grp && e3.mux_val_grp.length > 0 ? e3.mux_val_grp.some((e4) => t3 >= e4[0] && t3 <= e4[1]) : void 0 !== e3.mux_value && null !== e3.mux_value && e3.mux_value === t3;
        }
        function oe(e3, t3, r3) {
          const n3 = e3.signals || [], s3 = {}, i3 = n3.filter((e4) => e4.is_multiplexer), a2 = (e4) => {
            if (!e4.muxer_for_signal) return 0;
            const t4 = n3.find((t5) => t5.name === e4.muxer_for_signal);
            return t4 ? a2(t4) + 1 : 0;
          };
          i3.sort((e4, t4) => a2(e4) - a2(t4)).forEach((e4) => {
            const r4 = e4.muxer_for_signal;
            if (r4) {
              const n4 = s3[r4];
              void 0 !== n4 && ae(e4, n4) && (ce(e4, t3), s3[e4.name] = Number(e4.value));
            } else ce(e4, t3), s3[e4.name] = Number(e4.value);
          }), n3.forEach((e4) => {
            if (e4.is_multiplexer) return;
            const r4 = e4.muxer_for_signal;
            if (!r4) return void ce(e4, t3);
            const n4 = s3[r4];
            void 0 !== n4 && ae(e4, n4) && ce(e4, t3);
          });
        }
        function ce(e3, t3, r3) {
          let n3 = 0;
          if (e3.is_big_endian) {
            let r4 = e3.start_bit, s4 = e3.bit_length, i4 = 0;
            for (; s4 > 0; ) {
              const e4 = Math.floor(r4 / 8), a2 = r4 % 8;
              if (e4 < 0 || e4 >= t3.length) break;
              n3 |= (t3[e4] >> a2 & 1) << i4, s4--, i4++, 7 === a2 ? r4 -= 15 : r4++;
            }
          } else {
            let r4 = Math.floor(e3.start_bit / 8), s4 = e3.start_bit % 8, i4 = e3.bit_length, a2 = 0;
            for (; i4 > 0 && r4 < t3.length; ) {
              const e4 = Math.min(8 - s4, i4), o2 = (1 << e4) - 1;
              n3 |= (t3[r4] >> s4 & o2) << a2, i4 -= e4, a2 += e4, r4 += 1, s4 = 0;
            }
          }
          e3.is_float || e3.is_signed || (n3 >>>= 0);
          let s3 = n3;
          if (n3 > Math.pow(2, e3.bit_length) - 1) return;
          e3.is_float ? s3 = 32 === e3.bit_length ? new Float32Array(new Uint32Array([s3]).buffer)[0] : new Float64Array(new Uint32Array([s3]).buffer)[0] : e3.is_signed && n3 & 1 << e3.bit_length - 1 && (s3 = -(1 + (~n3 & (1 << e3.bit_length - 1) - 1))), s3 = s3 * Number(e3.factor) + Number(e3.offset), e3.value = n3.toString(), e3.is_float ? e3.physValue = Number.isInteger(s3) ? `${s3}.0` : s3.toString() : e3.physValue = s3.toString();
          const i3 = e3.values[e3.value];
          i3 && (e3.physValue = i3);
        }
        function ue(e3) {
          const t3 = Buffer.alloc(e3.length), r3 = e3.signals || [], n3 = {}, s3 = r3.filter((e4) => e4.is_multiplexer), i3 = (e4) => {
            if (!e4.muxer_for_signal) return 0;
            const t4 = r3.find((t5) => t5.name === e4.muxer_for_signal);
            return t4 ? i3(t4) + 1 : 0;
          };
          return s3.sort((e4, t4) => i3(e4) - i3(t4)).forEach((e4) => {
            if (void 0 === e4.value) return;
            const r4 = e4.muxer_for_signal;
            if (r4) {
              const s4 = n3[r4];
              void 0 !== s4 && ae(e4, s4) && (le(e4, t3), n3[e4.name] = Number(e4.value));
            } else le(e4, t3), n3[e4.name] = Number(e4.value);
          }), r3.forEach((e4) => {
            if (e4.is_multiplexer) return;
            if (void 0 === e4.value) return;
            const r4 = e4.muxer_for_signal;
            if (!r4) return void le(e4, t3);
            const s4 = n3[r4];
            void 0 !== s4 && ae(e4, s4) && le(e4, t3);
          }), t3;
        }
        function le(e3, t3) {
          let r3 = Number(e3.value);
          if (void 0 === r3) return;
          const n3 = Math.pow(2, e3.bit_length) - 1;
          if (r3 = Math.min(r3, n3), e3.is_big_endian) {
            let n4 = e3.start_bit, s3 = e3.bit_length, i3 = 0;
            for (; s3 > 0; ) {
              const e4 = Math.floor(n4 / 8), a2 = n4 % 8;
              if (e4 < 0 || e4 >= t3.length) break;
              const o2 = r3 >> i3 & 1, c2 = 1 << a2;
              t3[e4] &= ~c2, o2 && (t3[e4] |= c2), s3--, i3++, 7 === a2 ? n4 -= 15 : n4++;
            }
          } else {
            let n4 = Math.floor(e3.start_bit / 8), s3 = e3.start_bit % 8, i3 = e3.bit_length, a2 = 0;
            for (; i3 > 0 && !(n4 >= t3.length); ) {
              const e4 = Math.min(8 - s3, i3), o2 = (1 << e4) - 1, c2 = r3 >> a2 & o2;
              t3[n4] &= ~(o2 << s3), t3[n4] |= c2 << s3, i3 -= e4, a2 += e4, n4 += 1, s3 = 0;
            }
          }
        }
        function fe(e3, t3, r3) {
          const n3 = e3.signals[t3];
          if (n3) {
            const s3 = null != n3.value ? n3.value : n3.initValue;
            (0, Y.isEqual)(s3, r3) || (n3.update = true);
            const i3 = Object.entries(e3.signalRep).find(([e4, r4]) => r4.includes(t3))?.[0];
            if ("string" == typeof r3) {
              if (!i3) throw new Error(`Signal ${t3} does not have encoding type`);
              n3.physValue = r3;
              const s4 = function(e4, t4) {
                for (const r4 of t4) switch (r4.type) {
                  case "physicalValue":
                    if (r4.physicalValue && !Number.isNaN(Number(e4))) {
                      const { minValue: t5, maxValue: n4, scale: s5, offset: i4 } = r4.physicalValue, a2 = (Number(e4) - i4) / s5;
                      if (a2 >= t5 && a2 <= n4) return { value: Math.round(a2), usedEncode: r4 };
                    }
                    break;
                  case "logicalValue":
                    if (r4.logicalValue) {
                      if ("string" == typeof e4 && r4.logicalValue.textInfo === e4) return { value: r4.logicalValue.signalValue, usedEncode: r4 };
                      if ("number" == typeof e4 && r4.logicalValue.signalValue === e4) return { value: r4.logicalValue.signalValue, usedEncode: r4 };
                    }
                    break;
                  case "bcdValue":
                    return { value: parseInt(Number(e4).toString(16), 10), usedEncode: r4 };
                  case "asciiValue":
                    if ("string" == typeof e4) return { value: parseInt(e4, 10), usedEncode: r4 };
                }
                return {};
              }(r3, e3.signalEncodeTypes[i3].encodingTypes);
              n3.value = s4.value;
            } else if (n3.value = r3, i3 && "number" == typeof r3) {
              const t4 = ee(r3, e3.signalEncodeTypes[i3].encodingTypes);
              n3.physValue = t4.numVal?.toString();
            }
          }
        }
        function de(e3, t3) {
          let r3 = false;
          const n3 = Object.values(global.vars).find((t4) => t4.name == e3 && null != t4.value);
          if (n3) {
            if (null == n3.value) return { found: false, target: n3 };
            "number" != n3.value.type || Number.isNaN(Number(t3)) ? ("string" == n3.value.type && "string" == typeof t3 || "array" == n3.value.type && Array.isArray(t3)) && (n3.value.value = t3, r3 = true) : (n3.value.value = Number(t3), r3 = true);
          }
          return { found: r3, target: n3 };
        }
        r2(928), require("child_process");
        const he = require("node:test");
        var pe, me, ve, be, ge, ye, _e;
        !function(e3) {
          e3[e3.REQUEST = 0] = "REQUEST", e3[e3.REQUEST_NO_RETURN = 1] = "REQUEST_NO_RETURN", e3[e3.NOTIFICATION = 2] = "NOTIFICATION", e3[e3.RESPONSE = 128] = "RESPONSE", e3[e3.REQUEST_ACK = 64] = "REQUEST_ACK", e3[e3.NOTIFICATION_ACK = 66] = "NOTIFICATION_ACK", e3[e3.ERROR = 129] = "ERROR", e3[e3.RESPONSE_ACK = 192] = "RESPONSE_ACK", e3[e3.ERROR_ACK = 193] = "ERROR_ACK", e3[e3.UNKNOWN = 255] = "UNKNOWN";
        }(pe || (pe = {})), pe.REQUEST, pe.REQUEST_NO_RETURN, pe.NOTIFICATION, pe.RESPONSE, pe.REQUEST_ACK, pe.NOTIFICATION_ACK, pe.ERROR, pe.RESPONSE_ACK, pe.ERROR_ACK, pe.UNKNOWN;
        class Ee {
          msg;
          constructor(e3) {
            this.msg = e3;
          }
          setPayload(e3) {
            this.msg.payload = e3;
          }
        }
        class Ie extends Ee {
          msg;
          constructor(e3) {
            if (e3.messageType != pe.REQUEST) throw new Error("SomeipMessageRequest must be SomeipMessageType.REQUEST");
            super(e3), this.msg = e3;
          }
        }
        class we extends Ee {
          msg;
          constructor(e3) {
            if (e3.messageType != pe.RESPONSE) throw new Error("SomeipMessageResponse must be SomeipMessageType.RESPONSE");
            super(e3), this.msg = e3;
          }
          static fromSomeipRequest(e3, t3 = Buffer.from([])) {
            const r3 = new we({ ...e3.msg, messageType: pe.RESPONSE });
            return r3.setPayload(t3), r3;
          }
        }
        !function(e3) {
          e3[e3.ACTIVE = 0] = "ACTIVE", e3[e3.START = 1] = "START", e3[e3.WAIT = 2] = "WAIT", e3[e3.RELEASE = 3] = "RELEASE", e3[e3.PREEMPT = 4] = "PREEMPT", e3[e3.TERMINATE = 5] = "TERMINATE";
        }(me || (me = {})), function(e3) {
          e3[e3.START = 0] = "START", e3[e3.STOP = 1] = "STOP";
        }(ve || (ve = {})), function(e3) {
          e3[e3.INVOCATION = 0] = "INVOCATION", e3[e3.TERMINATION = 1] = "TERMINATION";
        }(be || (be = {})), function(e3) {
          e3[e3.TASK = 0] = "TASK", e3[e3.ISR = 1] = "ISR", e3[e3.SPINLOCK = 2] = "SPINLOCK", e3[e3.RESOURCE = 3] = "RESOURCE", e3[e3.HOOK = 4] = "HOOK", e3[e3.SERVICE = 5] = "SERVICE", e3[e3.RUNABLE = 6] = "RUNABLE", e3[e3.LINE = -1] = "LINE";
        }(ge || (ge = {})), function(e3) {
          e3[e3.LOCKED = 0] = "LOCKED", e3[e3.UNLOCKED = 1] = "UNLOCKED";
        }(ye || (ye = {})), function(e3) {
          e3[e3.START = 0] = "START", e3[e3.STOP = 1] = "STOP";
        }(_e || (_e = {})), me.ACTIVE, me.START, me.WAIT, me.RELEASE, me.PREEMPT, me.TERMINATE, ge.TASK, ge.ISR, ge.SPINLOCK, ge.RESOURCE, ge.HOOK, ge.SERVICE, ge.LINE, ge.RUNABLE, ve.START, ve.STOP, be.INVOCATION, be.TERMINATION;
        const Te = [{ type: "system", id: "EventLoopDelay.min", name: "EventLoopDelayMin", parentId: "EventLoopDelay", desc: "Minimum event loop delay - lower values indicate better performance", value: { type: "number", initValue: 0, unit: "ms" } }, { type: "system", id: "EventLoopDelay.max", name: "EventLoopDelayMax", desc: "Maximum event loop delay - higher values indicate potential performance issues", parentId: "EventLoopDelay", value: { type: "number", initValue: 0, unit: "ms" } }, { type: "system", id: "EventLoopDelay.avg", name: "EventLoopDelayAvg", desc: "Average event loop delay - a good balance between performance and stability", parentId: "EventLoopDelay", value: { type: "number", initValue: 0, unit: "ms" } }], Se = {};
        function Ne(e3) {
          Object.assign(Se, e3);
        }
        function Re(e3) {
          !q.isMainThread && q.parentPort && q.parentPort.postMessage({ type: "event", payload: (0, Y.cloneDeep)(e3) });
        }
        !q.isMainThread && q.parentPort && (q.parentPort.on("message", async (e3) => {
          if (e3 && "rpc" === e3.type) {
            const { id: t3, method: r3, params: n3 } = e3;
            try {
              const e4 = Se[r3];
              if (!e4) throw new Error(`Method ${r3} not found, valid method:${Object.keys(Se)}`);
              const s3 = e4(...n3);
              if (-1 === t3) return void (s3 instanceof Promise && await s3);
              if (s3 instanceof Promise) {
                const e5 = await s3;
                q.parentPort?.postMessage({ type: "rpc_response", id: t3, result: e5 });
              } else q.parentPort?.postMessage({ type: "rpc_response", id: t3, result: s3 });
            } catch (e4) {
              -1 !== t3 && q.parentPort?.postMessage({ type: "rpc_response", id: t3, error: e4 });
            }
          }
        }), Se.methods = () => Object.keys(Se));
        let Oe = "true" == process.env.ONLY, Ae = () => {
        }, De = () => {
        };
        const Ce = new Promise((e3, t3) => {
          Ae = e3, De = t3;
        });
        let Le = 0;
        const Ue = {};
        async function ke(e3) {
          try {
            return await e3();
          } catch (e4) {
            if (e4 instanceof Error) {
              const t3 = e4.stack?.split("\n"), r3 = t3?.find((e5) => /\d+:\d+/.test(e5));
              throw new Error(`${e4.message}, pos: ${r3}`);
            }
            throw e4;
          }
        }
        function xe(e3, t3) {
          Ve(e3, async (r3) => {
            if (!Oe) {
              try {
                await Ce;
              } catch (e4) {
                console.error(`Util.Init function failed: ${e4}`), process.exit(-1);
              }
              Oe = true;
            }
            if (r3.before(async () => {
              1 == Ue[Le] ? console.log(`<<< TEST START ${e3}>>>`) : r3.skip();
            }), r3.after(() => {
              console.log(`<<< TEST END ${e3}>>>`), Le++;
            }), 1 == Ue[Le]) return ke(t3);
            r3.skip();
          });
        }
        function Be(e3) {
          (0, he.beforeEach)(async () => {
            if (true === Ue[Le]) return ke(e3);
          });
        }
        function Me(e3) {
          (0, he.afterEach)(async () => {
            if (true === Ue[Le]) return ke(e3);
          });
        }
        function je(e3) {
          (0, he.before)(async () => {
            if (Object.values(Ue).some((e4) => true === e4)) return ke(e3);
          });
        }
        function Pe(e3) {
          (0, he.after)(async () => {
            if (Object.values(Ue).some((e4) => true === e4)) return ke(e3);
          });
        }
        xe.skip = function(e3, t3) {
          Ve(e3, (t4) => {
            t4.before(() => {
              console.log(`<<< TEST START ${e3}>>>`);
            }), t4.after(() => {
              console.log(`<<< TEST END ${e3}>>>`), Le++;
            }), t4.skip();
          });
        };
        const $e = "true" == process.env.ONLY ? he.describe.only : he.describe, Ve = "true" == process.env.ONLY ? he.test.only : he.test;
        function Ge(e3, t3) {
          $e(e3, async (e4) => (je(() => {
            Le++;
          }), ke(t3)));
        }
        const Fe = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map();
        global.cmdId = 0;
        class We {
          service;
          params;
          isRequest;
          testerName;
          constructor(e3, t3, r3) {
            this.testerName = e3, this.service = t3, this.isRequest = r3, this.params = r3 ? this.service.params : this.service.respParams;
          }
          valueOf() {
            return this.isRequest ? B(this.service).toString("hex") : M(this.service).toString("hex");
          }
          async changeService() {
            await this.asyncEmit("set", { service: this.service, isRequest: this.isRequest, testerName: this.testerName }), ze.set(this.getServiceName(), this.service);
          }
          On(e3, t3) {
            Je.On(`${this.getServiceName()}.${e3}`, t3);
          }
          Once(e3, t3) {
            Je.OnOnce(`${this.getServiceName()}.${e3}`, t3);
          }
          Off(e3, t3) {
            Je.Off(`${this.getServiceName()}.${e3}`, t3);
          }
          async asyncEmit(e3, t3) {
            return new Promise((r3, n3) => {
              Re({ id: global.cmdId, event: e3, data: t3 }), Fe.set(global.cmdId, { resolve: r3, reject: n3 }), global.cmdId++;
            });
          }
          getServiceName() {
            return `${this.testerName}.${this.service.name}`;
          }
          getServiceDesc() {
            return this.service.desc;
          }
          diagGetParameter(e3) {
            const t3 = this.params.find((t4) => t4.name === e3);
            if (t3) return t3.phyValue;
            throw new Error(`param ${e3} not found in ${this.isRequest ? "DiagRequest" : "DiagResponse"} ${this.service.name}`);
          }
          diagGetParameterRaw(e3) {
            const t3 = this.params.find((t4) => t4.name === e3);
            if (t3) return Buffer.from(t3.value);
            throw new Error(`param ${e3} not found in ${this.isRequest ? "DiagRequest" : "DiagResponse"} ${this.service.name}`);
          }
          diagGetParameterSize(e3) {
            const t3 = this.params.find((t4) => t4.name === e3);
            if (t3) return t3.bitLen;
            throw new Error(`param ${e3} not found in DiagRequest ${this.service.name}`);
          }
          diagGetParameterNames() {
            return this.params.map((e3) => e3.name);
          }
          diagSetParameterSize(e3, t3) {
            const r3 = this.params.find((t4) => t4.name === e3);
            if (!r3) throw new Error(`param ${e3} not found in DiagRequest ${this.service.name}`);
            !function(e4, t4) {
              const r4 = Math.ceil(t4 / 8), n3 = Math.ceil(e4.bitLen / 8), s3 = Math.min(r4, n3);
              e4.bitLen = t4;
              const i3 = Buffer.alloc(r4).fill(0);
              e4.value.copy(i3, 0, 0, s3), e4.value = i3;
            }(r3, t3);
          }
          diagSetParameter(e3, t3) {
            const r3 = this.params.find((t4) => t4.name === e3);
            if (!r3) throw new Error(`param ${e3} not found in DiagRequest ${this.service.name}`);
            !function(e4, t4) {
              switch (e4.type) {
                case "NUM":
                  {
                    if (t4.toString().includes(" ")) {
                      if (t4 = t4.toString().replace(/ /g, "").toUpperCase(), !/^[0-9a-fA-F]+$/.test(t4)) throw new Error("value should be a hex string");
                      t4 = "0x" + t4;
                    }
                    const r4 = Number(t4);
                    if (Number.isNaN(r4)) throw new Error("value should be a number");
                    const n3 = Math.floor(e4.bitLen / 8), s3 = Math.pow(2, 8 * n3);
                    if (!(r4 >= 0 && r4 < s3)) throw new Error(`value should be in [0,${s3 - 1}]`);
                    e4.phyValue = r4, e4.value = Buffer.alloc(n3);
                    for (let t5 = 0; t5 < n3; t5++) e4.value.writeUInt8(r4 >> 8 * t5 & 255, n3 - t5 - 1);
                  }
                  break;
                case "ARRAY":
                  {
                    const r4 = Math.floor(e4.bitLen / 8);
                    if (!t4) {
                      e4.phyValue = "", e4.value = Buffer.alloc(0);
                      break;
                    }
                    if (!/^[0-9a-fA-F]{2}( [0-9a-fA-F]{2})*$/.test(t4.toString())) throw new Error("value should be a 00 F4 33 5a");
                    const n3 = t4.toString().split(" ");
                    if (n3.length > r4) throw new Error(`value length ${n3.length} should less than ${r4}`);
                    for (let e5 = 0; e5 < n3.length; e5++) {
                      const t5 = Number("0x" + n3[e5]);
                      if (Number.isNaN(t5)) throw new Error("value should be a 00 F4 33 5a");
                      if (t5 < 0 && t5 >= 256) throw new Error(`value[${e5}] should be in [0,255]`);
                    }
                    e4.phyValue = t4.toString(), e4.value = Buffer.from(n3.map((e5) => parseInt(e5, 16)));
                  }
                  break;
                case "FILE":
                case "ASCII": {
                  const r4 = Math.floor(e4.bitLen / 8);
                  if (t4.toString().length > r4) throw new Error(`value length ${t4.toString().length} should less than ${r4}`);
                  e4.phyValue = t4.toString(), e4.value = Buffer.from(t4.toString(), "ascii");
                  break;
                }
                case "UNICODE": {
                  const r4 = Math.floor(e4.bitLen / 8), n3 = Buffer.from(t4.toString(), "utf-8");
                  if (n3.length > r4) throw new Error(`value length ${n3.length} should less than ${r4}`);
                  e4.phyValue = t4.toString(), e4.value = n3;
                  break;
                }
                case "FLOAT":
                  {
                    const r4 = Number(t4);
                    if (Number.isNaN(r4)) throw new Error("value should be a number");
                    if (r4 === 1 / 0 || r4 === -1 / 0) throw new Error("value should not be Infinity");
                    const n3 = Buffer.alloc(4).fill(0);
                    n3.writeFloatBE(r4, 0), e4.phyValue = r4, e4.value = n3;
                  }
                  break;
                case "DOUBLE": {
                  const r4 = Number(t4);
                  if (Number.isNaN(r4)) throw new Error("value should be a number");
                  if (r4 === 1 / 0 || r4 === -1 / 0) throw new Error("value should not be Infinity");
                  const n3 = Buffer.alloc(8).fill(0);
                  n3.writeDoubleBE(r4, 0), e4.phyValue = r4, e4.value = n3;
                  break;
                }
              }
            }(r3, t3);
          }
          diagSetParameterRaw(e3, t3) {
            const r3 = this.params.find((t4) => t4.name === e3);
            if (!r3) throw new Error(`param ${e3} not found in DiagRequest ${this.service.name}`);
            j(r3, t3);
          }
          async outputDiag(e3, t3) {
            return await this.asyncEmit("sendDiag", { device: e3, address: t3, service: this.service, isReq: this.isRequest, testerName: this.testerName });
          }
          diagSetRaw(e3) {
            !function(e4, t3, r3) {
              if (!t3 || 0 === t3.length) return;
              if (127 == t3[0]) {
                if (!r3) {
                  if (t3[1] != Number(e4.serviceId)) throw new Error(`serviceId not match, expect ${e4.serviceId} but got 0x${t3[1].toString(16)}`);
                  e4.isNegativeResponse = true, e4.nrc = t3[2];
                }
                return;
              }
              let n3 = t3[0];
              if (r3 || (n3 -= 64), n3 != Number(e4.serviceId)) throw new Error(`serviceId not match, expect ${e4.serviceId} but got 0x${n3.toString(16)}`);
              const s3 = r3 ? e4.params : e4.respParams;
              s3.length > 0 && "__left" == s3[s3.length - 1].name && s3.pop();
              let i3 = 1;
              for (const e5 of s3) {
                const r4 = Math.ceil(e5.bitLen / 8);
                if (i3 < t3.length) {
                  const n4 = t3.subarray(i3, i3 + r4);
                  if (n4.length < r4) return;
                  j(e5, n4);
                }
                i3 += r4;
              }
              if (i3 < t3.length) {
                const e5 = { id: D(), name: "__left", type: "ARRAY", value: Buffer.alloc(0), phyValue: "", bitLen: 8 * (t3.length - i3) };
                j(e5, t3.subarray(i3)), s3.push(e5);
              }
            }(this.service, e3, this.isRequest);
          }
          diagGetRaw() {
            return this.isRequest ? B(this.service) : M(this.service);
          }
        }
        class qe extends We {
          constructor(e3, t3) {
            super(e3, (0, Y.cloneDeep)(t3), true);
          }
          from(e3) {
            const t3 = e3.split(".")[0], r3 = ze.get(e3);
            if (r3 && C(r3.serviceId, ["job"])) return new qe(t3, r3);
            throw new Error(`job ${e3} not found`);
          }
        }
        class Ye extends We {
          addr;
          constructor(e3, t3, r3) {
            super(e3, (0, Y.cloneDeep)(t3), false), this.addr = r3;
          }
          getUdsAddress() {
            return this.addr;
          }
          static from(e3) {
            const t3 = e3.split(".")[0], r3 = ze.get(e3);
            if (r3 && C(r3.serviceId, ["uds"])) return new Ye(t3, r3);
            throw new Error(`service ${e3} not found`);
          }
          static fromDiagRequest(e3) {
            return new Ye(e3.testerName, e3.service);
          }
          diagIsPositiveResponse() {
            return !this.service.isNegativeResponse;
          }
          diagGetResponseCode() {
            return this.diagIsPositiveResponse() ? void 0 : this.service.nrc;
          }
        }
        class He extends We {
          addr;
          constructor(e3, t3, r3) {
            super(e3, (0, Y.cloneDeep)(t3), true), this.addr = r3;
          }
          getUdsAddress() {
            return this.addr;
          }
          static from(e3) {
            const t3 = e3.split(".")[0], r3 = ze.get(e3);
            if (r3) return new He(t3, r3);
            throw new Error(`service ${e3} not found`);
          }
        }
        function Ke(e3) {
          const t3 = e3.database ? global.dataSet.database.can[e3.database] : void 0, r3 = (0, Y.cloneDeep)(t3?.messages.find((t4) => t4.id === e3.id));
          if (t3 && r3) {
            oe(r3, e3.data), e3.signals = {};
            for (const t4 of Object.values(r3.signals)) e3.signals[t4.name] = new Proxy(t4, { set(e4, t5, r4) {
              const n3 = Reflect.set(e4, t5, r4);
              return "value" === t5 && se(e4), "physValue" === t5 && ie(e4), n3;
            } });
          }
          return new Proxy(e3, { get: (e4, t4) => "data" === t4 && r3 ? ue(r3) : Reflect.get(e4, t4), set: (e4, n3, s3) => ("data" === n3 && t3 && r3 && oe(r3, s3), Reflect.set(e4, n3, s3)) });
        }
        function Xe(e3) {
          const t3 = e3.database ? global.dataSet.database.lin[e3.database] : void 0, r3 = e3.name ? t3?.frames[e3.name] : void 0;
          if (t3 && r3) {
            te(r3, e3.data, t3), e3.signals = {};
            for (const n3 of Object.values(r3.signals)) e3.signals[n3.name] = new Proxy(n3, { set(e4, r4, s3) {
              const i3 = Reflect.set(e4, r4, s3);
              return "value" === r4 && fe(t3, n3.name, s3), "physValue" === r4 && fe(t3, n3.name, String(s3)), i3;
            } });
          }
          return new Proxy(e3, { get: (e4, n3) => "data" === n3 && r3 && t3 ? Q(t3, r3) : Reflect.get(e4, n3), set: (e4, n3, s3) => ("data" === n3 && t3 && r3 && te(r3, s3, t3), Reflect.set(e4, n3, s3)) });
        }
        class Qe {
          isMain = q.isMainThread;
          event = new E();
          funcMap = /* @__PURE__ */ new Map();
          testerName;
          Register(e3, t3) {
            this.isMain || Ne({ [e3]: async (...e4) => {
              const r3 = e4.map((e5) => e5 instanceof Uint8Array ? Buffer.from(e5) : e5), n3 = await t3(...r3);
              if (Array.isArray(n3)) {
                if (n3.every((e5) => e5 instanceof He || e5 instanceof qe)) return n3.map((e5) => e5.service);
                throw new Error("return value must be array of DiagRequest");
              }
              throw new Error("return value must be array of DiagRequest");
            } });
          }
          async workerOn(e3, t3) {
            if (this.event.listenerCount(e3) > 0) {
              if (await this.event.emit(e3, t3), e3.endsWith(".send") || e3.endsWith(".recv")) {
                const r3 = e3.split(".");
                r3[1] = "*", await this.event.emit(r3.join("."), t3);
              }
              return true;
            }
            if (e3.endsWith(".send") || e3.endsWith(".recv")) {
              const r3 = e3.split(".");
              return r3[1] = "*", this.event.listenerCount(r3.join(".")) > 0 && (await this.event.emit(r3.join("."), t3), true);
            }
            return false;
          }
          OnCan(e3, t3) {
            true === e3 ? this.event.on("can", t3) : this.event.on(`can.${e3}`, t3);
          }
          OnSignal(e3, t3) {
            this.event.on(e3, t3);
          }
          OnSignalOnce(e3, t3) {
            this.event.once(e3).then(t3);
          }
          OffSignal(e3, t3) {
            this.event.off(e3, t3);
          }
          getTesterName() {
            return this.testerName;
          }
          OnCanOnce(e3, t3) {
            true === e3 ? this.event.once("can").then(t3) : this.event.once(`can.${e3}`).then(t3);
          }
          OffCan(e3, t3) {
            true === e3 ? this.event.off("can", t3) : this.event.off(`can.${e3}`, t3);
          }
          OnLinOnce(e3, t3) {
            true === e3 ? this.event.once("lin").then(t3) : this.event.once(`lin.${e3}`).then(t3);
          }
          OnLin(e3, t3) {
            true === e3 ? this.event.on("lin", t3) : this.event.on(`lin.${e3}`, t3);
          }
          OffLin(e3, t3) {
            true === e3 ? this.event.off("lin", t3) : this.event.off(`lin.${e3}`, t3);
          }
          OnSomeipMessage(e3, t3) {
            true === e3 ? this.event.on("someip", t3) : this.event.on(`someip.${e3}`, t3);
          }
          OffSomeipMessage(e3, t3) {
            true === e3 ? this.event.off("someip", t3) : this.event.off(`someip.${e3}`, t3);
          }
          OnSomeipMessageOnce(e3, t3) {
            true === e3 ? this.event.once("someip").then(t3) : this.event.once(`someip.${e3}`).then(t3);
          }
          OnKey(e3, t3) {
            (e3 = e3.slice(0, 1)) && this.event.on(`keyDown${e3}`, t3);
          }
          OnKeyOnce(e3, t3) {
            (e3 = e3.slice(0, 1)) && this.event.once(`keyDown${e3}`).then(t3);
          }
          OffKey(e3, t3) {
            (e3 = e3.slice(0, 1)) && this.event.off(`keyDown${e3}`, t3);
          }
          OnVar(e3, t3) {
            e3 && this.event.on(`varUpdate${e3}`, t3);
          }
          OnVarOnce(e3, t3) {
            e3 && this.event.once(`varUpdate${e3}`).then(t3);
          }
          OffVar(e3, t3) {
            e3 && this.event.off(`varUpdate${e3}`, t3);
          }
          OnOnce(e3, t3) {
            if (e3.endsWith(".send")) {
              const r3 = async (r4) => {
                const n3 = e3.split(".")[0], s3 = new He(n3, r4.service, r4.addr);
                await t3(s3);
              };
              this.event.once(e3).then(r3);
            } else {
              if (!e3.endsWith(".recv")) throw new Error(`event ${e3} not support`);
              {
                const r3 = async (r4) => {
                  const n3 = e3.split(".")[0], s3 = new Ye(n3, r4.service, r4.addr);
                  await t3(s3);
                };
                this.event.once(e3).then(r3);
              }
            }
          }
          On(e3, t3) {
            if (e3.endsWith(".send")) {
              const r3 = async (r4) => {
                const n3 = e3.split(".")[0], s3 = new He(n3, r4.service, r4.addr);
                await t3(s3);
              };
              this.event.on(e3, r3), this.funcMap.set(t3, r3);
            } else {
              if (!e3.endsWith(".recv")) throw new Error(`event ${e3} not support`);
              {
                const r3 = async (r4) => {
                  const n3 = e3.split(".")[0], s3 = new Ye(n3, r4.service, r4.addr);
                  await t3(s3);
                };
                this.event.on(e3, r3), this.funcMap.set(t3, r3);
              }
            }
          }
          Off(e3, t3) {
            const r3 = this.funcMap.get(t3);
            r3 && this.event.off(e3, r3);
          }
          start(e3, t3, r3, n3) {
            if (global.dataSet = e3, this.testerName = r3, global.vars = {}, global.dataSet) {
              const e4 = (0, Y.cloneDeep)(global.dataSet.vars), t4 = function(e5, t5, r4) {
                const n4 = { Statistics: { type: "system", id: "Statistics", name: "Statistics" }, OsTrace: { type: "system", id: "OsTrace", name: "OsTrace" } };
                for (const t6 of Object.values(e5)) {
                  const e6 = { BusLoad: { min: 0, max: 100, unit: "%" }, BusLoadMin: { min: 0, max: 100, unit: "%" }, BusLoadMax: { min: 0, max: 100, unit: "%" }, BusLoadAvg: { min: 0, max: 100, unit: "%" }, FrameSentFreq: { min: 0, max: 100, unit: "f/s" }, FrameRecvFreq: { min: 0, max: 100, unit: "f/s" }, FrameFreq: { min: 0, max: 100, unit: "f/s" }, SentCnt: { min: 0 }, RecvCnt: { min: 0 } };
                  if ("can" === t6.type && t6.canDevice) {
                    n4[`Statistics.${t6.canDevice.id}`] = { type: "system", id: `Statistics.${t6.canDevice.id}`, name: t6.canDevice.name, parentId: "Statistics" };
                    for (const r5 of Object.keys(e6)) {
                      const s3 = e6[r5];
                      n4[`Statistics.${t6.canDevice.id}.${r5}`] = { type: "system", id: `Statistics.${t6.canDevice.id}.${r5}`, name: `${r5}`, parentId: `Statistics.${t6.canDevice.id}`, value: { type: "number", initValue: 0, min: s3.min, max: s3.max, unit: s3.unit } };
                    }
                  }
                }
                for (const e6 of Object.values(t5)) if (n4[`Statistics.${e6.id}`] = { type: "system", id: `Statistics.${e6.id}`, name: e6.name, parentId: "Statistics", desc: "UDS Tester" }, e6.seqList.length > 0) for (const [t6, r5] of e6.seqList.entries()) n4[`Statistics.${e6.id}.${t6}`] = { type: "system", id: `Statistics.${e6.id}.${t6}`, name: `Seq #${t6}`, parentId: `Statistics.${e6.id}`, value: { type: "number", initValue: 0, min: 0, max: 100, unit: "%" }, desc: "UDS sequence download progress" };
                for (const e6 of Object.values(r4)) {
                  const t6 = { DelayTimeMin: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u6210\u529F\uFF08Start\uFF09\u5230\u4EFB\u52A1\u8FD0\u884C\uFF08Runninng\uFF09\u7684\u6700\u5C0F\u65F6\u95F4" }, DelayTimeMax: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u6210\u529F\uFF08Start\uFF09\u5230\u4EFB\u52A1\u8FD0\u884C\uFF08Runninng\uFF09\u7684\u6700\u5927\u65F6\u95F4" }, DelayTimeAvg: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u6210\u529F\uFF08Start\uFF09\u5230\u4EFB\u52A1\u8FD0\u884C\uFF08Runninng\uFF09\u7684\u5E73\u5747\u65F6\u95F4" }, ActivationIntervalMin: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u95F4\u9694\u6700\u5C0F\u65F6\u95F4" }, ActivationIntervalMax: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u95F4\u9694\u6700\u5927\u65F6\u95F4" }, ActivationIntervalAvg: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6FC0\u6D3B\u95F4\u9694\u5E73\u5747\u65F6\u95F4" }, ExecutionTimeMin: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6267\u884C\u65F6\u95F4\u6700\u5C0F\u65F6\u95F4" }, ExecutionTimeMax: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6267\u884C\u65F6\u95F4\u6700\u5927\u65F6\u95F4" }, ExecutionTimeAvg: { type: "number", min: 0, unit: "us", desc: "\u4EFB\u52A1\u6267\u884C\u65F6\u95F4\u5E73\u5747\u65F6\u95F4" }, StartCount: { type: "number", min: 0, desc: "\u4EFB\u52A1\u5F00\u59CB\u6B21\u6570" }, Status: { type: "number", desc: "Task\u5F53\u524D\u72B6\u6001", max: 5, min: 0, enum: [{ name: "Active", value: me.ACTIVE }, { name: "Start", value: me.START }, { name: "Wait", value: me.WAIT }, { name: "Release", value: me.RELEASE }, { name: "Preempt", value: me.PREEMPT }, { name: "Terminate", value: me.TERMINATE }] }, ActiveCount: { type: "number", min: 0, desc: "\u4EFB\u52A1\u6FC0\u6D3B\u6B21\u6570" }, TaskLost: { type: "number", min: 0, max: 100, unit: "%", desc: "(Task\u88AB\u6FC0\u6D3B\u6B21\u6570-Task\u8FD0\u884C\u6B21\u6570)/Task\u88AB\u6FC0\u6D3B\u6B21\u6570" }, JitterMax: { type: "number", unit: "%", desc: "\u6700\u5927Jitter\u503C\uFF08\u5F53\u524D\u6FC0\u6D3B\u95F4\u9694-\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694\uFF09/\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694\uFF0C\u57FA\u4E8E\u7EDD\u5BF9\u503C\u6BD4\u8F83" }, JitterMin: { type: "number", unit: "%", desc: "\u6700\u5C0FJitter\u503C\uFF08\u5F53\u524D\u6FC0\u6D3B\u95F4\u9694-\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694\uFF09/\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694\uFF0C\u57FA\u4E8E\u7EDD\u5BF9\u503C\u6BD4\u8F83" }, Jitter: { type: "number", unit: "%", desc: "\u5F53\u524DJitter\u503C\uFF08\u5F53\u524D\u6FC0\u6D3B\u95F4\u9694-\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694\uFF09/\u7406\u8BBA\u6FC0\u6D3B\u95F4\u9694" } }, r5 = { ExecutionTimeMin: { type: "number", min: 0, unit: "us", desc: "ISR\u6267\u884C\u65F6\u95F4\u6700\u5C0F\u65F6\u95F4" }, ExecutionTimeMax: { type: "number", min: 0, unit: "us", desc: "ISR\u6267\u884C\u65F6\u95F4\u6700\u5927\u65F6\u95F4" }, ExecutionTimeAvg: { type: "number", min: 0, unit: "us", desc: "ISR\u6267\u884C\u65F6\u95F4\u5E73\u5747\u65F6\u95F4" }, RunCount: { type: "number", min: 0, desc: "ISR\u8FD0\u884C\u6B21\u6570" }, Status: { type: "number", desc: "ISR\u5F53\u524D\u72B6\u6001", max: 1, min: 0, enum: [{ name: "Start", value: ve.START }, { name: "Stop", value: ve.STOP }] }, CallIntervalMin: { type: "number", min: 0, unit: "us", desc: "ISR\u8C03\u7528\u95F4\u9694\u6700\u5C0F\u65F6\u95F4" }, CallIntervalMax: { type: "number", min: 0, unit: "us", desc: "ISR\u8C03\u7528\u95F4\u9694\u6700\u5927\u65F6\u95F4" }, CallIntervalAvg: { type: "number", min: 0, unit: "us", desc: "ISR\u8C03\u7528\u95F4\u9694\u5E73\u5747\u65F6\u95F4" } }, s3 = { Status: { type: "number", desc: "Resource\u5F53\u524D\u72B6\u6001", max: 1, min: 0, enum: [{ name: "Start", value: _e.START }, { name: "Stop", value: _e.STOP }] }, AcquireCount: { type: "number", min: 0, desc: "Resource\u83B7\u53D6\u6B21\u6570" }, ReleaseCount: { type: "number", min: 0, desc: "Resource\u91CA\u653E\u6B21\u6570" } }, i3 = { Count: { type: "number", min: 0, desc: "Service\u8C03\u7528\u6B21\u6570" }, LastStatus: { type: "number", min: 0, desc: "Service\u6700\u540E\u72B6\u6001" } }, a2 = { Count: { type: "number", min: 0, desc: "Hook\u89E6\u53D1\u6B21\u6570" }, LastStatus: { type: "number", min: 0, desc: "Hook\u6700\u540E\u72B6\u6001\u53C2\u6570" }, LastTriggerTime: { type: "number", min: 0, unit: "us", desc: "Hook\u6700\u540E\u4E00\u6B21\u89E6\u53D1\u76F8\u5BF9\u65F6\u95F4" } };
                  n4[`OsTrace.${e6.id}`] = { type: "system", id: `OsTrace.${e6.id}`, name: e6.name, parentId: "OsTrace" };
                  let o2 = 0;
                  n4[`OsTrace.${e6.id}.Task`] = { type: "system", id: `OsTrace.${e6.id}.Task`, name: "Task", parentId: `OsTrace.${e6.id}` }, n4[`OsTrace.${e6.id}.ISR`] = { type: "system", id: `OsTrace.${e6.id}.ISR`, name: "ISR", parentId: `OsTrace.${e6.id}` };
                  for (const s4 of e6.coreConfigs) if (o2 = Math.max(o2, s4.coreId + 1), s4.type == ge.TASK) {
                    n4[`OsTrace.${e6.id}.Task.${s4.type}_${s4.id}_${s4.coreId}`] = { type: "system", id: `OsTrace.${e6.id}.Task.${s4.type}_${s4.id}_${s4.coreId}`, name: s4.name, parentId: `OsTrace.${e6.id}.Task` };
                    for (const r6 of Object.keys(t6)) {
                      const i4 = t6[r6], a3 = `OsTrace.${e6.id}.Task.${s4.type}_${s4.id}_${s4.coreId}.${r6}`;
                      n4[a3] = { type: "system", id: a3, name: `${r6}`, parentId: `OsTrace.${e6.id}.Task.${s4.type}_${s4.id}_${s4.coreId}`, value: { type: i4.type, min: i4.min, max: i4.max, unit: i4.unit, enum: i4.enum }, desc: i4.desc };
                    }
                  } else if (s4.type == ge.ISR) {
                    n4[`OsTrace.${e6.id}.ISR.${s4.type}_${s4.id}_${s4.coreId}`] = { type: "system", id: `OsTrace.${e6.id}.ISR.${s4.type}_${s4.id}_${s4.coreId}`, name: s4.name, parentId: `OsTrace.${e6.id}.ISR` };
                    for (const t7 of Object.keys(r5)) {
                      const i4 = r5[t7], a3 = `OsTrace.${e6.id}.ISR.${s4.type}_${s4.id}_${s4.coreId}.${t7}`;
                      n4[a3] = { type: "system", id: a3, name: `${t7}`, parentId: `OsTrace.${e6.id}.ISR.${s4.type}_${s4.id}_${s4.coreId}`, value: { type: i4.type, min: i4.min, max: i4.max, unit: i4.unit, enum: i4.enum }, desc: i4.desc };
                    }
                  }
                  n4[`OsTrace.${e6.id}.Resource`] = { type: "system", id: `OsTrace.${e6.id}.Resource`, name: "Resource", parentId: `OsTrace.${e6.id}` };
                  for (const t7 of e6.resourceConfigs || []) {
                    const r6 = `OsTrace.${e6.id}.Resource.${ge.RESOURCE}_${t7.id}_${t7.coreId}`;
                    n4[r6] = { type: "system", id: r6, name: t7.name, parentId: `OsTrace.${e6.id}.Resource` };
                    for (const t8 of Object.keys(s3)) {
                      const i4 = s3[t8], a3 = `OsTrace.${e6.id}.Resource.${r6}.${t8}`;
                      n4[a3] = { type: "system", id: a3, name: `${t8}`, parentId: r6, value: { type: i4.type, min: i4.min, max: i4.max, unit: i4.unit, enum: i4.enum }, desc: i4.desc };
                    }
                  }
                  n4[`OsTrace.${e6.id}.Service`] = { type: "system", id: `OsTrace.${e6.id}.Service`, name: "Service", parentId: `OsTrace.${e6.id}` };
                  for (const t7 of e6.serviceConfigs || []) {
                    const r6 = `OsTrace.${e6.id}.Service.${ge.SERVICE}_${t7.id}_0`;
                    n4[r6] = { type: "system", id: r6, name: t7.name, parentId: `OsTrace.${e6.id}.Service` };
                    for (const t8 of Object.keys(i3)) {
                      const s4 = i3[t8], a3 = `OsTrace.${e6.id}.Service.${r6}.${t8}`;
                      n4[a3] = { type: "system", id: a3, name: `${t8}`, parentId: r6, value: { type: s4.type, min: s4.min, max: s4.max, unit: s4.unit, enum: s4.enum }, desc: s4.desc };
                    }
                  }
                  n4[`OsTrace.${e6.id}.Hook`] = { type: "system", id: `OsTrace.${e6.id}.Hook`, name: "Hook", parentId: `OsTrace.${e6.id}` };
                  for (const t7 of e6.hostConfigs || []) {
                    const r6 = `OsTrace.${e6.id}.Hook.${ge.HOOK}_${t7.id}_0`;
                    n4[r6] = { type: "system", id: r6, name: t7.name, parentId: `OsTrace.${e6.id}.Hook` };
                    for (const t8 of Object.keys(a2)) {
                      const s4 = a2[t8], i4 = `OsTrace.${e6.id}.Hook.${r6}.${t8}`;
                      n4[i4] = { type: "system", id: i4, name: `${t8}`, parentId: r6, value: { type: s4.type, min: s4.min, max: s4.max, unit: s4.unit, enum: s4.enum }, desc: s4.desc };
                    }
                  }
                  for (let t7 = 0; t7 < o2; t7++) {
                    n4[`OsTrace.${e6.id}.Core${t7}`] = { type: "system", id: `OsTrace.${e6.id}.Core${t7}`, name: `Core${t7}`, parentId: `OsTrace.${e6.id}` };
                    const r6 = { LoadPercent: { type: "number", min: 0, max: 100, unit: "%", desc: "Core\u8D1F\u8F7D\u767E\u5206\u6BD4" }, TotalTime: { type: "number", min: 0, unit: "ms", desc: "Core\u603B\u65F6\u95F4" } };
                    for (const s4 of Object.keys(r6)) {
                      const i4 = r6[s4], a3 = `OsTrace.${e6.id}.Core${t7}.${s4}`;
                      n4[a3] = { type: "system", id: a3, name: `${s4}`, parentId: `OsTrace.${e6.id}.Core${t7}`, value: { type: i4.type, min: i4.min, max: i4.max, unit: i4.unit }, desc: i4.desc };
                    }
                  }
                }
                n4.EventLoopDelay = { type: "system", id: "EventLoopDelay", name: "EventLoopDelay" };
                for (const e6 of Te) n4[e6.id] = e6;
                return n4;
              }(global.dataSet.devices, global.dataSet.tester, global.dataSet.database.orti);
              for (const r4 of Object.values(t4)) e4[r4.id] = (0, Y.cloneDeep)(r4);
              for (const t5 of Object.keys(e4)) {
                const r4 = e4[t5];
                if (r4.value) {
                  const t6 = [];
                  let n4 = r4;
                  for (; n4.parentId; ) {
                    const r5 = e4[n4.parentId];
                    if (!r5) break;
                    t6.unshift(r5.name), n4 = r5;
                  }
                  t6.push(r4.name), r4.name = t6.join(".");
                }
                global.vars[t5] = r4;
              }
            }
            for (const e4 of Object.keys(t3)) {
              const r4 = t3[e4];
              for (const e5 of r4.params) e5.value = Buffer.from(e5.value);
              for (const e5 of r4.respParams) e5.value = Buffer.from(e5.value);
              ze.set(e4, r4);
            }
            n3 && Object.assign(Ue, n3);
          }
          async canMsg(e3) {
            if (e3.data = Buffer.from(e3.data), (e3 = Ke(e3)).signals) {
              const t3 = global.dataSet.database.can[e3.database].name;
              for (const r3 of Object.values(e3.signals)) await this.event.emit(`${t3}.${r3.name}`, r3);
            }
            await this.event.emit(`can.${e3.id}`, e3), await this.event.emit("can", e3);
          }
          async linMsg(e3) {
            if (e3.data = Buffer.from(e3.data), (e3 = Xe(e3)).signals) {
              const t3 = global.dataSet.database.lin[e3.database].name;
              for (const r3 of Object.values(e3.signals)) await this.event.emit(`${t3}.${r3.signalName}`, r3);
            }
            await this.event.emit(`lin.${e3.frameId}`, e3), await this.event.emit("lin", e3);
          }
          async someipMsg(e3) {
            let t3;
            if (e3.messageType == pe.REQUEST) t3 = new Ie(e3);
            else {
              if (e3.messageType != pe.RESPONSE) throw new Error(`someip message type not supported: ${e3.messageType}`);
              t3 = new we(e3);
            }
            const r3 = t3.msg;
            r3.payload = Buffer.from(r3.payload), await this.event.emit(`someip.${r3.service.toString(16).padStart(4, "0")}.*.*`, t3), await this.event.emit(`someip.${r3.service.toString(16).padStart(4, "0")}.${r3.instance.toString(16).padStart(4, "0")}.*`, t3), await this.event.emit(`someip.${r3.service.toString(16).padStart(4, "0")}.${r3.instance.toString(16).padStart(4, "0")}.${r3.method.toString(16).padStart(4, "0")}`, t3), await this.event.emit("someip", t3);
          }
          async keyDown(e3) {
            await this.event.emit(`keyDown${e3}`, e3), await this.event.emit("keyDown*", e3);
          }
          async varUpdate(e3) {
            if (Array.isArray(e3)) {
              const t3 = [];
              for (const r3 of e3) de(r3.name, r3.value), t3.push(this.event.emit(`varUpdate${r3.name}`, r3)), t3.push(this.event.emit("varUpdate*", r3));
              await Promise.all(t3);
            } else de(e3.name, e3.value), await this.event.emit(`varUpdate${e3.name}`, e3), await this.event.emit("varUpdate*", e3);
          }
          evnetDone(e3, t3) {
            const r3 = Fe.get(e3);
            r3 && (t3 ? t3.err ? r3.reject(new Error(t3.err)) : r3.resolve(t3.data) : r3.resolve(), Fe.delete(e3));
          }
          constructor() {
            this.isMain || (Ne({ __on: this.workerOn.bind(this), __start: this.start.bind(this), __eventDone: this.evnetDone.bind(this) }), this.event.on("__canMsg", this.canMsg.bind(this)), this.event.on("__linMsg", this.linMsg.bind(this)), this.event.on("__someipMsg", this.someipMsg.bind(this)), this.event.on("__keyDown", this.keyDown.bind(this)), this.event.on("__varUpdate", this.varUpdate.bind(this)), this.event.on("__serialPortData", this.handleSerialPortData.bind(this)), this.event.on("__serialPortError", this.handleSerialPortError.bind(this)), this.event.on("__serialPortClose", this.handleSerialPortClose.bind(this)));
          }
          handleSerialPortData(e3) {
            const t3 = mt.get(e3.id);
            t3 && t3.emit("data", Buffer.from(e3.data));
          }
          handleSerialPortError(e3) {
            const t3 = mt.get(e3.id);
            t3 && t3.emit("error", new Error(e3.error));
          }
          handleSerialPortClose(e3) {
            const t3 = mt.get(e3.id);
            t3 && t3.emit("close"), mt.delete(e3.id);
          }
          Init(e3) {
            this.event.clearListeners("__varFc"), "test" == process.env.MODE ? this.event.on("__varFc", async () => {
              try {
                await e3(), Ae();
              } catch (e4) {
                De(e4);
              }
            }) : this.event.on("__varFc", e3);
          }
          End(e3) {
            this.event.clearListeners("__end"), this.event.on("__end", e3);
          }
        }
        const Je = new Qe();
        function Ze(e3) {
          Ne({ __setTxPending: (t3) => (t3.data = Buffer.from(t3.data), t3 = Ke(t3), e3(t3)) });
        }
        async function et(e3) {
          const t3 = new Promise((t4, r3) => {
            Re({ id: global.cmdId, event: "output", data: e3 instanceof Ee ? e3.msg : e3 }), Fe.set(global.cmdId, { resolve: t4, reject: r3 }), global.cmdId++;
          });
          return await t3;
        }
        async function tt(e3, t3) {
          const r3 = new Promise((r4, n3) => {
            try {
              !function(e4) {
                const t4 = e4.signal.split("."), r5 = Object.values(global.dataSet.database.can).find((e5) => e5.name == t4[0]);
                if (r5) {
                  const n4 = t4[1];
                  let s3;
                  for (const e5 of r5.messages) {
                    for (const t5 of e5.signals) if (t5.name == n4) {
                      s3 = t5;
                      break;
                    }
                    if (s3) break;
                  }
                  if (!s3) throw new Error(`Signal ${n4} not found`);
                  if ("string" == typeof e4.value) s3.physValue = e4.value, ie(s3);
                  else {
                    if (Array.isArray(e4.value)) throw new Error("Can not set array value");
                    s3.value = e4.value.toString(), se(s3);
                  }
                } else {
                  const r6 = Object.values(global.dataSet.database.lin).find((e5) => e5.name == t4[0]);
                  if (r6) {
                    const n4 = t4[1];
                    if (!r6.signals[n4]) throw new Error(`Signal ${n4} not found`);
                    fe(r6, n4, e4.value);
                  }
                }
              }({ signal: e3, value: t3 });
            } catch (e4) {
              return void n3(e4);
            }
            Re({ id: global.cmdId, event: "setSignal", data: { signal: e3, value: t3 } }), Fe.set(global.cmdId, { resolve: r4, reject: n3 }), global.cmdId++;
          });
          return await r3;
        }
        function rt(e3) {
          const t3 = e3.split("."), r3 = Object.values(global.dataSet.database.can).find((e4) => e4.name == t3[0]);
          if (r3) {
            const e4 = t3[1];
            let n3;
            for (const t4 of Object.values(r3.messages)) {
              for (const r4 of Object.values(t4.signals)) if (r4.name == e4) {
                n3 = r4;
                break;
              }
              if (n3) break;
            }
            if (!n3) throw new Error(`Signal ${e4} not found`);
            return n3;
          }
          {
            const e4 = Object.values(global.dataSet.database.lin).find((e5) => e5.name == t3[0]);
            if (e4) {
              const r4 = t3[1], n3 = e4.signals[r4];
              if (!n3) throw new Error(`Signal ${r4} not found`);
              return n3;
            }
          }
          throw new Error(`Signal ${e3} not found`);
        }
        function nt(e3, t3) {
          const { found: r3, target: n3 } = de(e3, t3);
          r3 && n3 && Re({ event: "varApi", data: { method: "setVar", name: e3, value: t3 } });
        }
        function st(e3) {
          const t3 = [];
          for (const [r3, n3] of Object.entries(e3)) {
            const { found: e4, target: s3 } = de(r3, n3);
            e4 && s3 && t3.push({ name: r3, value: n3 });
          }
          t3.length > 0 && Re({ event: "varApi", data: { method: "setVars", vars: t3 } });
        }
        function it(e3) {
          return function(e4) {
            const t3 = Object.values(global.vars).find((t4) => t4.name == e4);
            if (t3 && t3.value) {
              if ("number" == t3.value.type) return null == t3.value.value ? Number(t3.value.initValue) : Number(t3.value.value);
              if ("string" == t3.value.type) return null == t3.value.value ? t3.value.initValue || "" : t3.value.value || "";
              if ("array" == t3.value.type) return null == t3.value.value ? (t3.value.initValue || []).map((e5) => Number(e5)) : (t3.value.value || []).map((e5) => Number(e5));
            }
            throw new Error(`var ${e4} not found`);
          }(e3);
        }
        async function at(e3, t3) {
          const r3 = new Promise((r4, n3) => {
            Re({ id: global.cmdId, event: "runUdsSeq", data: { device: t3, name: e3 } }), Fe.set(global.cmdId, { resolve: r4, reject: n3 }), global.cmdId++;
          });
          return await r3;
        }
        async function ot(e3, t3) {
          const r3 = new Promise((r4, n3) => {
            Re({ id: global.cmdId, event: "stopUdsSeq", data: { device: t3, name: e3 } }), Fe.set(global.cmdId, { resolve: r4, reject: n3 }), global.cmdId++;
          });
          return await r3;
        }
        async function ct(e3, t3) {
        }
        async function* ut(e3) {
          for await (const t3 of e3) "test:start" !== t3.type && "test:pass" !== t3.type && "test:fail" !== t3.type && "test:dequeue" !== t3.type || (Re({ event: "test", id: global.cmdId, data: t3 }), global.cmdId++);
        }
        async function lt(e3, t3, r3, n3) {
          const s3 = new Promise((s4, i3) => {
            Re({ id: global.cmdId, event: "linApi", data: { method: "startSch", device: r3, schName: e3, activeCtrl: n3, slot: t3 } }), Fe.set(global.cmdId, { resolve: s4, reject: i3 }), global.cmdId++;
          });
          return await s3;
        }
        async function ft(e3, t3) {
          const r3 = new Promise((r4, n3) => {
            Re({ id: global.cmdId, event: "linApi", data: { method: "powerCtrl", device: t3, power: e3 } }), Fe.set(global.cmdId, { resolve: r4, reject: n3 }), global.cmdId++;
          });
          return await r3;
        }
        async function dt(e3, t3) {
          const r3 = 55e5;
          let n3 = 0, s3 = 1, i3 = r3 / (1 * Math.pow(2, 1)), a2 = Math.abs(e3 - i3);
          for (let t4 = 0; t4 <= 7; t4++) for (let o3 = 1; o3 <= 32; o3++) {
            const c2 = r3 / (Math.pow(2, t4 + 1) * o3), u2 = Math.abs(e3 - c2);
            u2 < a2 && (a2 = u2, n3 = t4, s3 = o3, i3 = c2);
          }
          const o2 = new Promise((e4, r4) => {
            Re({ id: global.cmdId, event: "linApi", data: { method: "baudRateCtrl", device: t3, lincableCustomBaudRatePrescale: n3, lincableCustomBaudRateBitMap: s3 } }), Fe.set(global.cmdId, { resolve: e4, reject: r4 }), global.cmdId++;
          });
          return await o2;
        }
        async function ht(e3) {
          const t3 = new Promise((t4, r3) => {
            Re({ id: global.cmdId, event: "linApi", data: { method: "stopSch", device: e3 } }), Fe.set(global.cmdId, { resolve: t4, reject: r3 }), global.cmdId++;
          });
          return await t3;
        }
        async function pt(e3) {
          const t3 = new Promise((t4, r3) => {
            Re({ id: global.cmdId, event: "pwmApi", data: { method: "setDuty", duty: e3.duty, device: e3.device } }), Fe.set(global.cmdId, { resolve: t4, reject: r3 }), global.cmdId++;
          });
          return await t3;
        }
        global.Util = Je, Je.Init(() => {
          Ae();
        });
        const mt = /* @__PURE__ */ new Map();
        class vt extends E {
          _id;
          _options;
          _isOpen = false;
          constructor(e3) {
            super(), this._options = e3, this._id = e3.path;
          }
          get id() {
            return this._id;
          }
          get isOpen() {
            return this._isOpen;
          }
          async open() {
            if (this._isOpen) throw new Error(`SerialPort '${this._id}' is already open`);
            const e3 = new Promise((e4, t3) => {
              Re({ id: global.cmdId, event: "serialPortApi", data: { method: "open", options: this._options } }), Fe.set(global.cmdId, { resolve: e4, reject: t3 }), global.cmdId++;
            });
            await e3, this._isOpen = true, mt.set(this._id, this);
          }
          async close() {
            if (!this._isOpen) throw new Error(`SerialPort '${this._id}' is not open`);
            const e3 = new Promise((e4, t3) => {
              Re({ id: global.cmdId, event: "serialPortApi", data: { method: "close", id: this._id } }), Fe.set(global.cmdId, { resolve: e4, reject: t3 }), global.cmdId++;
            });
            await e3, this._isOpen = false, mt.delete(this._id);
          }
          async write(e3) {
            if (!this._isOpen) throw new Error(`SerialPort '${this._id}' is not open`);
            const t3 = new Promise((t4, r3) => {
              Re({ id: global.cmdId, event: "serialPortApi", data: { method: "write", id: this._id, data: Buffer.isBuffer(e3) ? Array.from(e3) : e3 } }), Fe.set(global.cmdId, { resolve: t4, reject: r3 }), global.cmdId++;
            });
            return await t3;
          }
          static async list() {
            const e3 = new Promise((e4, t3) => {
              Re({ id: global.cmdId, event: "serialPortApi", data: { method: "list" } }), Fe.set(global.cmdId, { resolve: e4, reject: t3 }), global.cmdId++;
            });
            return await e3;
          }
        }
        function bt(e3, t3, r3) {
          if ("lin" == e3) {
            const e4 = Object.values(global.dataSet.database.lin).find((e5) => e5.name == t3);
            if (e4) {
              const t4 = e4.frames[r3];
              if (t4) {
                let r4 = P.RECV;
                t4.publishedBy === e4.node.master.nodeName && (r4 = P.SEND);
                const n3 = 60 === t4.id || 61 === t4.id ? V.CLASSIC : V.ENHANCED;
                return { frameId: t4.id, data: Q(e4, t4), direction: r4, checksumType: n3, database: e4.id, name: t4.name };
              }
              {
                const t5 = e4.eventTriggeredFrames[r3];
                if (t5) {
                  const r4 = t5.frameNames[0], n3 = e4.frames[r4];
                  if (n3) return Xe({ frameId: t5.frameId, data: Buffer.alloc(n3.frameSize + 1), direction: P.RECV, checksumType: V.CLASSIC, database: e4.id, name: t5.name, isEvent: true });
                }
              }
              throw new Error(`frame ${r3} not found`);
            }
            throw new Error(`database ${t3} not found`);
          }
          if ("can" == e3) {
            const e4 = Object.values(global.dataSet.database.can).find((e5) => e5.name == t3);
            if (e4) {
              const t4 = Object.values(e4.messages).find((e5) => e5.name === r3);
              if (t4) return Ke({ id: t4.id, name: t4.name, dir: "OUT", data: ue(t4), msgType: { idType: t4.is_extended_frame ? W.aU.EXTENDED : W.aU.STANDARD, brs: false, canfd: t4.is_fd || false, remote: false }, database: e4.id });
              throw new Error(`CAN message ${r3} not found`);
            }
            throw new Error(`CAN database ${t3} not found`);
          }
          throw new Error(`database type ${e3} not supported`);
        }
      }, 170(e2, t2, r2) {
        const n2 = r2(394), { EdsError: s2, DataObject: i2, Eds: a } = r2(800), { ObjectType: o, AccessType: c, DataType: u } = r2(727), { EmcyType: l, EmcyCode: f, EmcyMessage: d, LssError: h, LssMode: p, NmtState: m, SdoCode: v, SdoError: b } = r2(811), { typeToRaw: g, rawToType: y, dateToTime: _, timeToDate: E } = r2(251);
        e2.exports = { Device: n2, DataObject: i2, Eds: a, EdsError: s2, SdoError: b, SdoCode: v, EmcyMessage: d, EmcyCode: f, EmcyType: l, AccessType: c, DataType: u, LssError: h, LssMode: p, NmtState: m, ObjectType: o, typeToRaw: g, rawToType: y, dateToTime: _, timeToDate: E };
      }, 394(e2, t2, r2) {
        const n2 = r2(434), { deprecate: s2 } = r2(23), { Emcy: i2 } = r2(421), { Lss: a } = r2(21), { Nmt: o, NmtState: c } = r2(688), { Pdo: u } = r2(298), { SdoClient: l } = r2(233), { SdoServer: f } = r2(269), { Sync: d } = r2(632), { Time: h } = r2(378), { Eds: p, EdsError: m } = r2(800);
        e2.exports = class extends n2 {
          constructor(e3 = {}) {
            if (super(), this._stateListener = null, this._resetListener = null, "string" == typeof e3.eds ? this.eds = p.fromFile(e3.eds) : this.eds = e3.eds || new p(), !p.isEds(this.eds)) throw new m("bad Eds");
            this.protocol = { emcy: new i2(this.eds), lss: new a(this.eds), nmt: new o(this.eds), pdo: new u(this.eds), sdoClient: new l(this.eds), sdoServer: new f(this.eds), sync: new d(this.eds), time: new h(this.eds) };
            for (const e4 of Object.values(this.protocol)) e4.addListener("message", (e5) => this.emit("message", e5));
            if (void 0 !== e3.id) {
              if (e3.id < 1 || e3.id > 127) throw RangeError("id must be in range [1-127]");
              this.id = e3.id;
            }
            e3.loopback && this.addListener("message", (e4) => {
              setImmediate(() => this.receive(e4));
            }), void 0 === e3.enableLss && (e3.enableLss = this.eds.lssSupported), e3.enableLss && (this.lss.addListener("changeDeviceId", (e4) => this.id = e4), this.lss.start());
          }
          get dataObjects() {
            return this.eds.dataObjects;
          }
          get id() {
            return this._id;
          }
          set id(e3) {
            this._id = e3, this.nmt.deviceId = e3;
          }
          get state() {
            return this.nmt.state;
          }
          get emcy() {
            return this.protocol.emcy;
          }
          get lss() {
            return this.protocol.lss;
          }
          get nmt() {
            return this.protocol.nmt;
          }
          get pdo() {
            return this.protocol.pdo;
          }
          get sdo() {
            return this.protocol.sdoClient;
          }
          get sdoServer() {
            return this.protocol.sdoServer;
          }
          get sync() {
            return this.protocol.sync;
          }
          get time() {
            return this.protocol.time;
          }
          receive(e3) {
            if (0 == e3.id) this.nmt.receive(e3);
            else for (const t3 of Object.values(this.protocol)) t3.receive(e3);
          }
          start() {
            if (!this.id) throw new Error("id must be set");
            this._resetListener || (this._resetListener = (e3) => this._reset(e3), this.nmt.addListener("reset", this._resetListener)), this._stateListener || (this._stateListener = (e3) => this._changeState(e3), this.nmt.addListener("changeState", this._stateListener)), this.nmt.start();
          }
          stop() {
            try {
              this.nmt.removeListener("reset", this._resetListener), this._resetListener = null, this.nmt.removeListener("changeState", this._stateListener), this._stateListener = null;
            } catch (e3) {
            }
            for (const e3 of Object.values(this.protocol)) e3.stop();
          }
          mapRemoteNode(e3 = {}) {
            let t3 = e3.eds;
            if ("string" == typeof t3 && (t3 = p.fromFile(t3)), !e3.skipEmcy) {
              const e4 = t3.getEmcyCobId();
              e4 && this.eds.addEmcyConsumer(e4);
            }
            if (!e3.skipNmt) {
              const r3 = t3.getHeartbeatProducerTime();
              if (r3) {
                if (!e3.id) throw new ReferenceError("id required to map NMT");
                this.eds.addHeartbeatConsumer(e3.id, 2 * r3);
              }
            }
            if (!e3.skipSdo) for (const r3 of t3.getSdoServerParameters()) {
              const t4 = r3.deviceId;
              if (t4 > 0 && t4 !== this.id) continue;
              if (!e3.id) throw new ReferenceError("id required to map SDO");
              const n3 = r3.cobIdRx, s3 = r3.cobIdTx;
              this.eds.addSdoClientParameter(e3.id, n3, s3);
            }
            if (!e3.skipPdo) {
              let r3 = e3.dataStart || 8192;
              if (r3 < 8192) throw new RangeError("dataStart must be >= 0x2000");
              const n3 = [];
              for (const e4 of t3.getTransmitPdos()) {
                const s3 = [];
                for (let i3 of e4.dataObjects) {
                  for (; void 0 !== this.eds.getEntry(r3); ) {
                    if (r3 >= 65535) throw new RangeError("dataIndex must be <= 0xFFFF");
                    r3 += 1;
                  }
                  const e5 = i3.subIndex;
                  if (null !== e5 && (i3 = t3.getEntry(i3.index)), !n3[i3.index]) {
                    n3[i3.index] = r3, this.eds.addEntry(r3, i3);
                    for (let e6 = 1; e6 < i3.subNumber; ++e6) this.eds.addSubEntry(r3, e6, i3[e6]);
                  }
                  e5 ? s3.push(this.eds.getSubEntry(n3[i3.index], e5)) : s3.push(this.eds.getEntry(n3[i3.index]));
                }
                e4.dataObjects = s3, this.eds.addReceivePdo(e4);
              }
            }
          }
          getValue(e3) {
            const t3 = this.eds.getEntry(e3);
            if (!t3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            return t3.value;
          }
          getValueArray(e3, t3) {
            const r3 = this.eds.getSubEntry(e3, t3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            return r3.value;
          }
          getRaw(e3) {
            const t3 = this.eds.getEntry(e3);
            if (!t3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            return t3.raw;
          }
          getRawArray(e3, t3) {
            const r3 = this.eds.getSubEntry(e3, t3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            return r3.raw;
          }
          getScale(e3) {
            const t3 = this.eds.getEntry(e3);
            if (!t3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            return t3.scaleFactor;
          }
          getScaleArray(e3, t3) {
            const r3 = this.eds.getSubEntry(e3, t3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            return r3.scaleFactor;
          }
          setValue(e3, t3) {
            const r3 = this.eds.getEntry(e3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            r3.value = t3;
          }
          setValueArray(e3, t3, r3) {
            const n3 = this.eds.getSubEntry(e3, t3);
            if (!n3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            n3.value = r3;
          }
          setRaw(e3, t3) {
            const r3 = this.eds.getEntry(e3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            r3.raw = t3;
          }
          setRawArray(e3, t3, r3) {
            const n3 = this.eds.getSubEntry(e3, t3);
            if (!n3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            n3.raw = r3;
          }
          setScale(e3, t3) {
            const r3 = this.eds.getEntry(e3);
            if (!r3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3} does not exist`);
            r3.scaleFactor = t3;
          }
          setScaleArray(e3, t3, r3) {
            const n3 = this.eds.getSubEntry(e3, t3);
            if (!n3) throw "number" == typeof e3 && (e3 = "0x" + e3.toString(16)), new m(`entry ${e3}[${t3}] does not exist`);
            n3.scaleFactor = r3;
          }
          _reset(e3 = false) {
            e3 && this.eds.reset(), setImmediate(() => {
              this.stop(), this.start();
            });
          }
          _changeState(e3) {
            switch (e3) {
              case c.PRE_OPERATIONAL:
                this.emcy.start(), this.sdo.start(), this.sdoServer.start(), this.sync.start(), this.time.start(), this.pdo.stop();
                break;
              case c.OPERATIONAL:
                this.emcy.start(), this.sdo.start(), this.sdoServer.start(), this.sync.start(), this.time.start(), this.pdo.start();
                break;
              case c.INITIALIZING:
              case c.STOPPED:
                this.emcy.stop(), this.sdo.stop(), this.sdoServer.stop(), this.sync.stop(), this.time.stop(), this.pdo.stop();
            }
          }
        };
      }, 800(e2, t2, r2) {
        const { EOL: n2 } = r2(857), s2 = r2(434), i2 = r2(896), a = r2(775), { ObjectType: o, AccessType: c, DataType: u } = r2(727), l = r2(463), f = r2(165);
        function d(e3, t3) {
          const r3 = e3.includes("PM");
          e3 = e3.replace("AM", "").replace("PM", "");
          let [n3, s3] = e3.split(":"), [i3, a2, o2] = t3.split("-");
          return n3 = parseInt(n3), s3 = parseInt(s3), i3 = parseInt(i3), a2 = parseInt(a2), o2 = parseInt(o2), r3 && (n3 += 12), new Date(o2, i3 - 1, a2, n3, s3);
        }
        function h(e3) {
          return { parameterName: e3.ParameterName, subNumber: parseInt(e3.SubNumber) || void 0, objectType: parseInt(e3.ObjectType) || void 0, dataType: parseInt(e3.DataType) || void 0, lowLimit: parseInt(e3.LowLimit) || void 0, highLimit: parseInt(e3.HighLimit) || void 0, accessType: e3.AccessType, defaultValue: e3.DefaultValue, pdoMapping: e3.PDOMapping, objFlags: parseInt(e3.ObjFlags) || void 0, compactSubObj: parseInt(e3.CompactSubObj) || void 0 };
        }
        function p(e3) {
          if (!v.isDataObject(e3)) throw new TypeError("entry is not a DataObject");
          let t3 = {};
          return t3.ParameterName = e3.parameterName, t3.ObjectType = `0x${e3.objectType.toString(16)}`, void 0 !== e3.subNumber && (t3.SubNumber = `0x${e3.subNumber.toString(16)}`), void 0 !== e3.dataType && (t3.DataType = `0x${e3.dataType.toString(16)}`), void 0 !== e3.lowLimit && (t3.LowLimit = e3.lowLimit.toString()), void 0 !== e3.highLimit && (t3.HighLimit = e3.highLimit.toString()), void 0 !== e3.accessType && (t3.AccessType = e3.accessType), void 0 !== e3.defaultValue && (t3.DefaultValue = e3.defaultValue.toString()), void 0 !== e3.pdoMapping && (t3.PDOMapping = e3.pdoMapping ? "1" : "0"), void 0 !== e3.objFlags && (t3.ObjFlags = e3.objFlags.toString()), void 0 !== e3.compactSubObj && (t3.CompactSubObj = e3.compactSubObj ? "1" : "0"), t3;
        }
        class m extends Error {
          constructor(e3) {
            super(e3), this.name = this.constructor.name, Error.captureStackTrace(this, this.constructor);
          }
        }
        class v extends s2 {
          constructor(e3, t3) {
            if (super(), Object.assign(this, t3), this.parent = null, this.key = e3, void 0 === this.key) throw new ReferenceError("key must be defined");
            if (void 0 === this.parameterName) throw new m("parameterName is mandatory for DataObject");
            switch (void 0 === this.objectType && (this.objectType = o.VAR), this.objectType) {
              case o.DEFTYPE:
              case o.VAR:
                if (void 0 === this.dataType) throw new m("dataType is mandatory for type " + this.objectTypeString);
                if (void 0 !== this.compactSubObj) throw new m("compactSubObj is not supported for type " + this.objectTypeString);
                if (void 0 === this.accessType && (this.accessType = c.READ_WRITE), void 0 === this.pdoMapping && (this.pdoMapping = false), void 0 !== this.highLimit && void 0 !== this.lowLimit && this.highLimit < this.lowLimit) throw new m("highLimit may not be less lowLimit");
                this._raw = f(this.defaultValue, this.dataType);
                break;
              case o.DEFSTRUCT:
              case o.ARRAY:
              case o.RECORD:
                if (this.compactSubObj) {
                  if (void 0 === this.dataType) throw new m("dataType is mandatory for compact type " + this.objectTypeString);
                  void 0 === this.accessType && (this.accessType = c.READ_WRITE), void 0 === this.pdoMapping && (this.pdoMapping = false);
                } else {
                  if (void 0 !== this.dataType) throw new m("dataType is not supported for type " + this.objectTypeString);
                  if (void 0 !== this.accessType) throw new m("accessType is not supported for type " + this.objectTypeString);
                  if (void 0 !== this.defaultValue) throw new m("defaultValue is not supported for type " + this.objectTypeString);
                  if (void 0 !== this.pdoMapping) throw new m("pdoMapping is not supported for type " + this.objectTypeString);
                  if (void 0 !== this.lowLimit) throw new m("lowLimit is not supported for type " + this.objectTypeString);
                  if (void 0 !== this.highLimit) throw new m("highLimit is not supported for type " + this.objectTypeString);
                }
                this._subObjects = [], Object.defineProperty(this, "_subObjects", { enumerable: false }), this.addSubObject(0, { parameterName: "Max sub-index", objectType: o.VAR, dataType: u.UNSIGNED8, accessType: c.READ_WRITE });
                break;
              case o.DOMAIN:
                if (void 0 !== this.pdoMapping) throw new m("pdoMapping is not supported for type " + this.objectTypeString);
                if (void 0 !== this.lowLimit) throw new m("lowLimit is not supported for type " + this.objectTypeString);
                if (void 0 !== this.highLimit) throw new m("highLimit is not supported for type " + this.objectTypeString);
                if (void 0 !== this.compactSubObj) throw new m("compactSubObj is not supported for type " + this.objectTypeString);
                void 0 === this.dataType && (this.dataType = u.DOMAIN), void 0 === this.accessType && (this.accessType = c.READ_WRITE);
                break;
              default:
                throw new m(`objectType not supported (${this.objectType})`);
            }
          }
          get index() {
            return parseInt(this.key.split("sub")[0], 16);
          }
          get subIndex() {
            const e3 = this.key.split("sub");
            return e3.length < 2 ? null : parseInt(e3[1], 16);
          }
          get objectTypeString() {
            switch (this.objectType) {
              case o.NULL:
                return "NULL";
              case o.DOMAIN:
                return "DOMAIN";
              case o.DEFTYPE:
                return "DEFTYPE";
              case o.DEFSTRUCT:
                return "DEFSTRUCT";
              case o.VAR:
                return "VAR";
              case o.ARRAY:
                return "ARRAY";
              case o.RECORD:
                return "RECORD";
              default:
                return "UNKNOWN";
            }
          }
          get dataTypeString() {
            switch (this.dataType) {
              case u.BOOLEAN:
                return "BOOLEAN";
              case u.INTEGER8:
                return "INTEGER8";
              case u.INTEGER16:
                return "INTEGER16";
              case u.INTEGER32:
                return "INTEGER32";
              case u.UNSIGNED8:
                return "UNSIGNED8";
              case u.UNSIGNED16:
                return "UNSIGNED16";
              case u.UNSIGNED32:
                return "UNSIGNED32";
              case u.REAL32:
                return "REAL32";
              case u.VISIBLE_STRING:
                return "VISIBLE_STRING";
              case u.OCTET_STRING:
                return "OCTET_STRING";
              case u.UNICODE_STRING:
                return "UNICODE_STRING";
              case u.TIME_OF_DAY:
                return "TIME_OF_DAY";
              case u.TIME_DIFFERENCE:
                return "TIME_DIFFERENCE";
              case u.DOMAIN:
                return "DOMAIN";
              case u.REAL64:
                return "REAL64";
              case u.INTEGER24:
                return "INTEGER24";
              case u.INTEGER40:
                return "INTEGER40";
              case u.INTEGER48:
                return "INTEGER48";
              case u.INTEGER56:
                return "INTEGER56";
              case u.INTEGER64:
                return "INTEGER64";
              case u.UNSIGNED24:
                return "UNSIGNED24";
              case u.UNSIGNED40:
                return "UNSIGNED40";
              case u.UNSIGNED48:
                return "UNSIGNED48";
              case u.UNSIGNED56:
                return "UNSIGNED56";
              case u.UNSIGNED64:
                return "UNSIGNED64";
              case u.PDO_PARAMETER:
                return "PDO_PARAMETER";
              case u.PDO_MAPPING:
                return "PDO_MAPPING";
              case u.SDO_PARAMETER:
                return "SDO_PARAMETER";
              case u.IDENTITY:
                return "IDENTITY";
              default:
                return "UNKNOWN";
            }
          }
          get size() {
            if (!this.subNumber) return this.raw.length;
            let e3 = 0;
            for (let t3 = 1; t3 <= this._subObjects[0].value; ++t3) void 0 !== this._subObjects[t3] && (e3 += this._subObjects[t3].size);
            return e3;
          }
          get raw() {
            if (!this.subNumber) return this._raw;
            const e3 = [];
            for (let t3 = 1; t3 <= this._subObjects[0].value; ++t3) void 0 !== this._subObjects[t3] && e3.push(this._subObjects[t3].raw);
            return e3;
          }
          set raw(e3) {
            if (this.subNumber) throw new m("not supported for type " + this.objectTypeString);
            null == e3 && (e3 = f(0, this.dataType)), this.raw && 0 == Buffer.compare(e3, this.raw) || (this._raw = e3, this._emitUpdate());
          }
          get value() {
            if (!this.subNumber) return l(this.raw, this.dataType, this.scaleFactor);
            const e3 = [];
            for (let t3 = 1; t3 <= this._subObjects[0].value; ++t3) void 0 !== this._subObjects[t3] && e3.push(this._subObjects[t3].value);
            return e3;
          }
          set value(e3) {
            if (this.subNumber) throw new m("not supported for type " + this.objectTypeString);
            this.raw = f(e3, this.dataType, this.scaleFactor);
          }
          static isDataObject(e3) {
            return e3 instanceof v;
          }
          valueOf() {
            return this.value;
          }
          toString() {
            return "[" + this.key + "]";
          }
          at(e3) {
            if (!this._subObjects) throw new TypeError("not an Array type");
            return this._subObjects[e3];
          }
          addSubObject(e3, t3) {
            if (!this._subObjects) throw new TypeError("not an Array type");
            const r3 = this.key + "sub" + e3, n3 = new v(r3, t3);
            n3.parent = this, this._subObjects[e3] = n3, Object.prototype.hasOwnProperty.call(this, e3) || Object.defineProperty(this, e3, { get: () => this.at(e3) }), this._subObjects[0].value < e3 && this._subObjects[0]._raw.writeUInt8(e3), this.subNumber = 1;
            for (let e4 = 1; e4 <= this._subObjects[0].value; ++e4) void 0 !== this._subObjects[e4] && (this.subNumber += 1);
            return n3;
          }
          removeSubObject(e3) {
            if (!this._subObjects) throw new TypeError("not an Array type");
            const t3 = this._subObjects[e3];
            if (delete this._subObjects[e3], e3 >= this._subObjects[0].value) {
              for (let t4 = e3; t4 >= 0; --t4) if (void 0 !== this._subObjects[t4]) {
                this._subObjects[0]._raw.writeUInt8(t4);
                break;
              }
            }
            this.subNumber = 1;
            for (let e4 = 1; e4 <= this._subObjects[0].value; ++e4) void 0 !== this._subObjects[e4] && (this.subNumber += 1);
            return t3;
          }
          _emitUpdate(e3) {
            this.parent ? this.parent._emitUpdate(this) : this.emit("update", e3 || this);
          }
        }
        class b extends s2 {
          constructor(e3 = {}) {
            if (super(), this.fileInfo = { EDSVersion: "4.0" }, this.deviceInfo = { SimpleBootUpMaster: 0, SimpleBootUpSlave: 0, Granularity: 8, DynamicChannelsSupported: 0, CompactPDO: 0, GroupMessaging: 0 }, this.dummyUsage = {}, this._dataObjects = {}, this.comments = [], this.nameLookup = {}, "object" == typeof e3) {
              this.fileName = e3.fileName || "", this.fileVersion = e3.fileVersion || 1, this.fileRevision = e3.fileRevision || 1, this.description = e3.description || "", this.creationDate = e3.creationDate || /* @__PURE__ */ new Date(), this.createdBy = e3.createdBy || "node-canopen", this.vendorName = e3.vendorName || "", this.vendorNumber = e3.vendorNumber || 0, this.productName = e3.productName || "", this.productNumber = e3.productNumber || 0, this.revisionNumber = e3.revisionNumber || 0, this.orderCode = e3.orderCode || "", this.baudRates = e3.baudRates || [], this.lssSupported = e3.lssSupported || false;
              for (const [e4, t3] of Object.entries(u)) this.addEntry(t3, { parameterName: e4, objectType: o.DEFTYPE, dataType: u[e4], accessType: c.READ_WRITE });
              this.addEntry(4096, { parameterName: "Device type", objectType: o.VAR, dataType: u.UNSIGNED32, accessType: c.READ_ONLY }), this.setErrorRegister(0), this.setIdentity({ vendorId: e3.vendorNumber, productCode: e3.productNumber, revisionNumber: e3.revisionNumber, serialNumber: 0 });
            } else "string" == typeof e3 && this.load(e3);
          }
          get dataObjects() {
            const e3 = {};
            for (const t3 of this.values()) e3[t3.index] = t3;
            return e3;
          }
          [Symbol.iterator]() {
            return this.values();
          }
          get fileName() {
            return this.fileInfo.FileName;
          }
          set fileName(e3) {
            this.fileInfo.FileName = String(e3);
          }
          get fileVersion() {
            return this.fileInfo.FileVersion;
          }
          set fileVersion(e3) {
            this.fileInfo.FileVersion = Number(e3);
          }
          get fileRevision() {
            return this.fileInfo.FileRevision;
          }
          set fileRevision(e3) {
            this.fileInfo.FileRevision = Number(e3);
          }
          get description() {
            return this.fileInfo.Description;
          }
          set description(e3) {
            this.fileInfo.Description = String(e3);
          }
          get creationDate() {
            return d(this.fileInfo.CreationTime, this.fileInfo.CreationDate);
          }
          set creationDate(e3) {
            const t3 = e3.getHours().toString().padStart(2, "0") + ":" + e3.getMinutes().toString().padStart(2, "0"), r3 = (e3.getMonth() + 1).toString().padStart(2, "0") + "-" + e3.getDate().toString().padStart(2, "0") + "-" + e3.getFullYear().toString();
            this.fileInfo.CreationTime = t3, this.fileInfo.CreationDate = r3;
          }
          get createdBy() {
            return this.fileInfo.CreatedBy;
          }
          set createdBy(e3) {
            this.fileInfo.CreatedBy = String(e3);
          }
          get modificationDate() {
            return d(this.fileInfo.ModificationTime, this.fileInfo.ModificationDate);
          }
          set modificationDate(e3) {
            const t3 = e3.getHours().toString().padStart(2, "0") + ":" + e3.getMinutes().toString().padStart(2, "0"), r3 = (e3.getMonth() + 1).toString().padStart(2, "0") + "-" + e3.getDate().toString().padStart(2, "0") + "-" + e3.getFullYear().toString();
            this.fileInfo.ModificationTime = t3, this.fileInfo.ModificationDate = r3;
          }
          get modifiedBy() {
            return this.fileInfo.ModifiedBy;
          }
          set modifiedBy(e3) {
            this.fileInfo.ModifiedBy = String(e3);
          }
          get vendorName() {
            return this.deviceInfo.VendorName;
          }
          set vendorName(e3) {
            this.deviceInfo.VendorName = String(e3);
          }
          get vendorNumber() {
            return this.deviceInfo.VendorNumber;
          }
          set vendorNumber(e3) {
            this.deviceInfo.VendorNumber = Number(e3);
          }
          get productName() {
            return this.deviceInfo.ProductName;
          }
          set productName(e3) {
            this.deviceInfo.ProductName = String(e3);
          }
          get productNumber() {
            return this.deviceInfo.ProductNumber;
          }
          set productNumber(e3) {
            this.deviceInfo.ProductNumber = Number(e3);
          }
          get revisionNumber() {
            return this.deviceInfo.RevisionNumber;
          }
          set revisionNumber(e3) {
            this.deviceInfo.RevisionNumber = Number(e3);
          }
          get orderCode() {
            return this.deviceInfo.OrderCode;
          }
          set orderCode(e3) {
            this.deviceInfo.OrderCode = String(e3);
          }
          get baudRates() {
            let e3 = [];
            return parseInt(this.deviceInfo.BaudRate_10) && e3.push(1e4), parseInt(this.deviceInfo.BaudRate_20) && e3.push(2e4), parseInt(this.deviceInfo.BaudRate_50) && e3.push(5e4), parseInt(this.deviceInfo.BaudRate_125) && e3.push(125e3), parseInt(this.deviceInfo.BaudRate_250) && e3.push(25e4), parseInt(this.deviceInfo.BaudRate_500) && e3.push(5e5), parseInt(this.deviceInfo.BaudRate_800) && e3.push(8e5), parseInt(this.deviceInfo.BaudRate_1000) && e3.push(1e6), e3;
          }
          set baudRates(e3) {
            this.deviceInfo.BaudRate_10 = e3.includes(1e4) ? "1" : "0", this.deviceInfo.BaudRate_20 = e3.includes(2e4) ? "1" : "0", this.deviceInfo.BaudRate_50 = e3.includes(5e4) ? "1" : "0", this.deviceInfo.BaudRate_125 = e3.includes(125e3) ? "1" : "0", this.deviceInfo.BaudRate_250 = e3.includes(25e4) ? "1" : "0", this.deviceInfo.BaudRate_500 = e3.includes(5e5) ? "1" : "0", this.deviceInfo.BaudRate_800 = e3.includes(8e5) ? "1" : "0", this.deviceInfo.BaudRate_1000 = e3.includes(1e6) ? "1" : "0";
          }
          get simpleBootUpMaster() {
            return !!parseInt(this.deviceInfo.SimpleBootUpMaster);
          }
          set simpleBootUpMaster(e3) {
            this.deviceInfo.SimpleBootUpMaster = e3 ? 1 : 0;
          }
          get simpleBootUpSlave() {
            return !!parseInt(this.deviceInfo.SimpleBootUpSlave);
          }
          set simpleBootUpSlave(e3) {
            this.deviceInfo.SimpleBootUpSlave = e3 ? 1 : 0;
          }
          get granularity() {
            return parseInt(this.deviceInfo.Granularity);
          }
          set granularity(e3) {
            this.deviceInfo.Granularity = e3;
          }
          get dynamicChannelsSupported() {
            return !!parseInt(this.deviceInfo.DynamicChannelsSupported);
          }
          set dynamicChannelsSupported(e3) {
            this.deviceInfo.DynamicChannelsSupported = e3 ? 1 : 0;
          }
          get groupMessaging() {
            return !!parseInt(this.deviceInfo.GroupMessaging);
          }
          set groupMessaging(e3) {
            this.deviceInfo.GroupMessaging = e3 ? 1 : 0;
          }
          get nrOfRXPDO() {
            let e3 = 0;
            for (let t3 of Object.keys(this._dataObjects)) t3 = parseInt(t3, 16), t3 >= 5120 && t3 <= 5631 && e3++;
            return e3;
          }
          get nrOfTXPDO() {
            let e3 = 0;
            for (let t3 of Object.keys(this._dataObjects)) t3 = parseInt(t3, 16), t3 >= 6144 && t3 <= 6655 && e3++;
            return e3;
          }
          get lssSupported() {
            return !!this.deviceInfo.LSS_Supported;
          }
          set lssSupported(e3) {
            this.deviceInfo.LSS_Supported = e3 ? 1 : 0;
          }
          static isEds(e3) {
            return e3 instanceof b;
          }
          static fromFile(e3) {
            const t3 = new b();
            return t3.load(e3), t3;
          }
          load(e3) {
            const t3 = a.parse(i2.readFileSync(e3, "utf-8"));
            this._dataObjects = {}, this.nameLookup = {}, this.fileInfo = t3.FileInfo, this.deviceInfo = t3.DeviceInfo, this.dummyUsage = t3.DummyUsage, this.comments = t3.Comments;
            const r3 = Object.entries(t3), n3 = RegExp("^[0-9A-Fa-f]{4}$"), s3 = RegExp("^([0-9A-Fa-f]{4})sub([0-9A-Fa-f]+)$");
            r3.filter(([e4]) => n3.test(e4)).forEach(([e4, t4]) => {
              const r4 = parseInt(e4, 16);
              this.addEntry(r4, h(t4));
            }), r3.filter(([e4]) => s3.test(e4)).forEach(([e4, t4]) => {
              let [r4, n4] = e4.split("sub");
              r4 = parseInt(r4, 16), n4 = parseInt(n4, 16), this.addSubEntry(r4, n4, h(t4));
            });
          }
          save(e3, t3 = {}) {
            e3 || (e3 = this.fileName), this.modificationDate = t3.modificationDate || /* @__PURE__ */ new Date(), this.modifiedBy = t3.modifiedBy || "", this.deviceInfo.NrOfTXPDO = this.nrOfTXPDO, this.deviceInfo.NrOfRXPDO = this.nrOfRXPDO;
            const r3 = i2.openSync(e3, "w");
            this._write(r3, a.encode(this.fileInfo, { section: "FileInfo" })), this._write(r3, a.encode(this.deviceInfo, { section: "DeviceInfo" })), this._write(r3, a.encode(this.dummyUsage, { section: "DummyUsage" })), this._write(r3, a.encode(this.comments, { section: "Comments" }));
            let n3 = {}, s3 = 0, o2 = {}, c2 = 0, u2 = {}, l2 = 0;
            for (const e4 of this.keys()) {
              let t4 = parseInt(e4, 16);
              [4096, 4097, 4120].includes(t4) ? (s3 += 1, n3[s3] = "0x" + e4) : t4 >= 4096 && t4 < 8191 ? (c2 += 1, o2[c2] = "0x" + e4) : t4 >= 8192 && t4 < 24575 ? (l2 += 1, u2[l2] = "0x" + e4) : t4 >= 24576 && t4 < 65535 && (c2 += 1, o2[c2] = "0x" + e4);
            }
            n3.SupportedObjects = s3, this._write(r3, a.encode(n3, { section: "MandatoryObjects" })), this._writeObjects(r3, n3), o2.SupportedObjects = c2, this._write(r3, a.encode(o2, { section: "OptionalObjects" })), this._writeObjects(r3, o2), u2.SupportedObjects = l2, this._write(r3, a.encode(u2, { section: "ManufacturerObjects" })), this._writeObjects(r3, u2), i2.closeSync(r3);
          }
          keys() {
            return Object.keys(this._dataObjects).values();
          }
          values() {
            return Object.values(this._dataObjects).values();
          }
          entries() {
            return Object.entries(this._dataObjects).values();
          }
          reset() {
            for (const e3 of this.values()) e3.objectType === o.VAR && (e3.value = e3.defaultValue);
          }
          findEntry(e3) {
            let t3 = this.nameLookup[e3];
            return void 0 !== t3 ? t3 : [];
          }
          getEntry(e3) {
            let t3 = null;
            if ("string" == typeof e3) {
              if (t3 = this.findEntry(e3), t3.length > 1) throw new m("duplicate entry");
              t3 = t3[0];
            } else {
              const r3 = e3.toString(16).padStart(4, "0");
              t3 = this._dataObjects[r3];
            }
            return t3;
          }
          addEntry(e3, t3) {
            if ("number" != typeof e3) throw new TypeError("index must be a number");
            const r3 = e3.toString(16).padStart(4, "0");
            if (void 0 !== this._dataObjects[r3]) throw new m(`${r3} already exists`);
            const n3 = new v(r3, t3);
            return this.emit("newEntry", n3), this._dataObjects[r3] = n3, void 0 === this.nameLookup[n3.parameterName] && (this.nameLookup[n3.parameterName] = []), this.nameLookup[n3.parameterName].push(n3), n3;
          }
          removeEntry(e3) {
            const t3 = this.getEntry(e3);
            if (void 0 === t3) throw new m(`${e3.toString(16)} does not exist`);
            return this.nameLookup[t3.parameterName].splice(this.nameLookup[t3.parameterName].indexOf(t3), 1), 0 == this.nameLookup[t3.parameterName].length && delete this.nameLookup[t3.parameterName], delete this._dataObjects[t3.key], this.emit("removeEntry", t3), t3;
          }
          getSubEntry(e3, t3) {
            const r3 = this.getEntry(e3);
            if (void 0 === r3) throw new m(`${e3.toString(16)} does not exist`);
            if (void 0 === r3.subNumber) throw new m(`${e3.toString(16)} does not support sub objects`);
            return r3[t3] || null;
          }
          addSubEntry(e3, t3, r3) {
            const n3 = this.getEntry(e3);
            if (void 0 === n3) throw new m(`${e3.toString(16)} does not exist`);
            if (void 0 === n3.subNumber) throw new m(`${e3.toString(16)} does not support sub objects`);
            return n3.addSubObject(t3, r3);
          }
          removeSubEntry(e3, t3) {
            const r3 = this.getEntry(e3);
            if (t3 < 1) throw new m("subIndex must be >= 1");
            if (void 0 === r3) throw new m(`${e3.toString(16)} does not exist`);
            if (void 0 === r3.subNumber) throw new m(`${e3.toString(16)} does not support sub objects`);
            void 0 !== r3[t3] && r3.removeSubObject(t3);
          }
          getErrorRegister() {
            const e3 = this.getEntry(4097);
            return e3 ? e3.value : null;
          }
          setErrorRegister(e3) {
            let t3 = this.getEntry(4097);
            if (void 0 === t3 && (t3 = this.addEntry(4097, { parameterName: "Error register", objectType: o.VAR, dataType: u.UNSIGNED8, accessType: c.READ_ONLY })), "object" != typeof e3) t3.value = e3;
            else {
              let r3 = t3.value;
              void 0 !== e3.generic && (e3.generic ? r3 |= 1 : r3 &= -2), void 0 !== e3.current && (e3.current ? r3 |= 2 : r3 &= -3), void 0 !== e3.voltage && (e3.voltage ? r3 |= 4 : r3 &= -5), void 0 !== e3.temperature && (e3.temperature ? r3 |= 8 : r3 &= -9), void 0 !== e3.communication && (e3.communication ? r3 |= 16 : r3 &= -17), void 0 !== e3.device && (e3.device ? r3 |= 32 : r3 &= -33), void 0 !== e3.manufacturer && (e3.manufacturer ? r3 |= 128 : r3 &= -129), t3.value = r3;
            }
          }
          getStatusRegister() {
            const e3 = this.getEntry(4098);
            return e3 ? e3.value : null;
          }
          setStatusRegister(e3, t3 = {}) {
            let r3 = this.getEntry(4098);
            void 0 === r3 && (r3 = this.addEntry(4098, { parameterName: "Manufacturer status register", objectType: o.VAR, dataType: u.UNSIGNED32, accessType: c.READ_ONLY })), r3.value = e3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getErrorHistory() {
            const e3 = [], t3 = this.getEntry(4099);
            if (t3) {
              const r3 = t3[0].value;
              for (let n3 = 1; n3 <= r3; ++n3) {
                const r4 = t3.at(n3), s3 = r4.raw.readUInt16LE(0), i3 = r4.raw.readUInt16LE(2);
                s3 && e3.push({ code: s3, info: i3 });
              }
            }
            return e3;
          }
          pushErrorHistory(e3, t3) {
            const r3 = this.getEntry(4099);
            if (!r3) throw new m();
            const n3 = r3[0].value;
            if (n3 > 1) for (let e4 = n3; e4 > 1; --e4) r3.at(e4).raw = r3.at(e4 - 1).raw;
            const s3 = Buffer.alloc(4);
            s3.writeUInt16LE(e3, 0), t3 && ("number" == typeof t3 ? s3.writeUInt16LE(t3, 2) : (Buffer.isBuffer(t3) || (t3 = Buffer.from(t3)), t3.copy(s3, 2))), r3.at(1).raw = s3;
          }
          setErrorHistoryLength(e3, t3 = {}) {
            if (void 0 === e3 || e3 < 0) throw new m("error field size must >= 0");
            let r3 = this.getEntry(4099);
            for (void 0 === r3 && (r3 = this.addEntry(4099, { parameterName: "Pre-defined error field", objectType: o.ARRAY })); e3 < r3.subNumber - 1; ) this.removeSubEntry(4099, r3.subNumber - 1);
            for (; e3 > r3.subNumber - 1; ) {
              const e4 = r3.subNumber;
              this.addSubEntry(4099, e4, { parameterName: `Standard error field ${e4}`, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE });
            }
          }
          getSyncCobId() {
            const e3 = this.getEntry(4101);
            return e3 ? 2047 & e3.raw.readUInt16LE() : null;
          }
          setSyncCobId(e3, t3 = {}) {
            if (!e3) throw new m("COB-ID SYNC may not be 0");
            let r3 = this.getEntry(4101);
            r3 || (r3 = this.addEntry(4101, { dataType: u.UNSIGNED32, parameterName: "COB-ID SYNC", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            n3.writeUInt16LE(2047 & e3), r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getSyncGenerationEnable() {
            const e3 = this.getEntry(4101);
            return !!(e3 && 64 & e3.raw[3]);
          }
          setSyncGenerationEnable(e3, t3 = {}) {
            let r3 = this.getEntry(4101);
            r3 || (r3 = this.addEntry(4101, { dataType: u.UNSIGNED32, parameterName: "COB-ID SYNC", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            e3 ? n3[3] |= 64 : n3[3] &= -65, r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getSyncCyclePeriod() {
            const e3 = this.getEntry(4102);
            return e3 ? e3.value : null;
          }
          setSyncCyclePeriod(e3, t3 = {}) {
            if (!e3) throw new m("communication cycle period may not be 0");
            let r3 = this.getEntry(4102);
            r3 || (r3 = this.addEntry(4102, { dataType: u.UNSIGNED32, parameterName: "Communication cycle period", accessType: t3.accessType || c.READ_WRITE })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getDeviceName() {
            const e3 = this.getEntry(4104);
            return e3 ? e3.value : "";
          }
          setDeviceName(e3, t3 = {}) {
            let r3 = this.getEntry(4104);
            void 0 === r3 && (r3 = this.addEntry(4104, { parameterName: "Manufacturer device name", objectType: o.VAR, dataType: u.VISIBLE_STRING, accessType: c.CONSTANT })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getHardwareVersion() {
            const e3 = this.getEntry(4105);
            return e3 ? e3.value : "";
          }
          setHardwareVersion(e3, t3 = {}) {
            let r3 = this.getEntry(4105);
            void 0 === r3 && (r3 = this.addEntry(4105, { parameterName: "Manufacturer hardware version", objectType: o.VAR, dataType: u.VISIBLE_STRING, accessType: c.CONSTANT })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getSoftwareVersion() {
            const e3 = this.getEntry(4106);
            return e3 ? e3.value : "";
          }
          setSoftwareVersion(e3, t3 = {}) {
            let r3 = this.getEntry(4106);
            void 0 === r3 && (r3 = this.addEntry(4106, { parameterName: "Manufacturer software version", objectType: o.VAR, dataType: u.VISIBLE_STRING, accessType: c.CONSTANT })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getTimeCobId() {
            const e3 = this.getEntry(4114);
            return e3 ? 2047 & e3.raw.readUInt16LE() : null;
          }
          setTimeCobId(e3, t3 = {}) {
            if (!e3) throw new m("COB-ID TIME may not be 0");
            let r3 = this.getEntry(4114);
            r3 || (r3 = this.addEntry(4114, { dataType: u.UNSIGNED32, parameterName: "COB-ID TIME", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            n3.writeUInt16LE(2047 & e3), r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getTimeProducerEnable() {
            const e3 = this.getEntry(4114);
            return !!(e3 && 64 & e3.raw[3]);
          }
          setTimeProducerEnable(e3, t3 = {}) {
            let r3 = this.getEntry(4114);
            r3 || (r3 = this.addEntry(4114, { dataType: u.UNSIGNED32, parameterName: "COB-ID TIME", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            e3 ? n3[3] |= 64 : n3[3] &= -65, r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getTimeConsumerEnable() {
            const e3 = this.getEntry(4114);
            return !!(e3 && 128 & e3.raw[3]);
          }
          setTimeConsumerEnable(e3, t3 = {}) {
            let r3 = this.getEntry(4114);
            r3 || (r3 = this.addEntry(4114, { dataType: u.UNSIGNED32, parameterName: "COB-ID TIME", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            e3 ? n3[3] |= 128 : n3[3] &= -129, r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getEmcyCobId() {
            const e3 = this.getEntry(4116);
            return e3 ? 2047 & e3.raw.readUInt16LE() : null;
          }
          setEmcyCobId(e3, t3 = {}) {
            let r3 = this.getEntry(4116);
            r3 || (r3 = this.addEntry(4116, { dataType: u.UNSIGNED32, parameterName: "COB-ID EMCY", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            n3.writeUInt16LE(2047 & e3), r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getEmcyValid() {
            const e3 = this.getEntry(4116);
            return !(!e3 || 128 & e3.raw[3]);
          }
          setEmcyValid(e3, t3 = {}) {
            let r3 = this.getEntry(4116);
            r3 || (r3 = this.addEntry(4116, { dataType: u.UNSIGNED32, parameterName: "COB-ID EMCY", accessType: t3.accessType || c.READ_WRITE }));
            const n3 = Buffer.from(r3.raw);
            e3 ? n3[3] |= 128 : n3[3] &= -129, r3.raw = n3, t3.saveDefault && (r3.defaultValue = r3.value);
          }
          getEmcyInhibitTime() {
            const e3 = this.getEntry(4117);
            return e3 ? e3.value : null;
          }
          setEmcyInhibitTime(e3, t3 = {}) {
            let r3 = this.getEntry(4117);
            r3 || (r3 = this.addEntry(4117, { dataType: u.UNSIGNED16, parameterName: "Inhibit time EMCY", accessType: t3.accessType || c.READ_WRITE })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getHeartbeatConsumers() {
            const e3 = [], t3 = this.getEntry(4118);
            if (t3) {
              const r3 = t3[0].value;
              for (let n3 = 1; n3 <= r3; ++n3) {
                const r4 = t3.at(n3);
                if (!r4) continue;
                const s3 = r4.raw.readUInt16LE(0), i3 = r4.raw.readUInt8(2);
                i3 > 0 && i3 <= 127 && e3.push({ deviceId: i3, heartbeatTime: s3 });
              }
            }
            return e3;
          }
          addHeartbeatConsumer(e3, t3, r3 = {}) {
            if (e3 < 1 || e3 > 127) throw RangeError("deviceId must be in range [1-127]");
            if (t3 < 0 || t3 > 65535) throw RangeError("timeout must be in range [0-65535]");
            let n3 = this.getEntry(4118);
            void 0 === n3 && (n3 = this.addEntry(4118, { objectType: o.ARRAY, parameterName: "Consumer heartbeat time" }));
            for (let t4 = 1; t4 <= n3[0].value; ++t4) {
              const r4 = n3.at(t4);
              if (r4 && r4.raw.readUInt8(2) === e3) throw e3 = "0x" + e3.toString(16), new m(`consumer for ${e3} already exists`);
            }
            let s3 = r3.subIndex;
            if (!s3) {
              for (let e4 = 1; e4 <= 255; ++e4) if (void 0 === n3[e4]) {
                s3 = e4;
                break;
              }
            }
            if (!s3) throw new m("NMT consumer entry full");
            const i3 = this.addSubEntry(4118, s3, { parameterName: `Device 0x${e3.toString(16)}`, dataType: u.UNSIGNED32, accessType: r3.accessType || c.READ_WRITE }), a2 = Buffer.alloc(4);
            a2.writeUInt16LE(t3, 0), a2.writeUInt8(e3, 2), i3.raw = a2, r3.saveDefault && (i3.defaultValue = i3.value);
          }
          removeHeartbeatConsumer(e3) {
            const t3 = this.getEntry(4118);
            if (void 0 !== t3) {
              const r3 = t3[0].value;
              for (let n3 = 1; n3 <= r3; ++n3) {
                const r4 = t3.at(n3);
                if (void 0 !== r4 && r4.raw.readUInt8(2) === e3) {
                  t3.removeSubObject(n3);
                  break;
                }
              }
            }
          }
          getHeartbeatProducerTime() {
            const e3 = this.getEntry(4119);
            return e3 ? e3.value : null;
          }
          setHeartbeatProducerTime(e3, t3 = {}) {
            let r3 = this.getEntry(4119);
            r3 || (r3 = this.addEntry(4119, { dataType: u.UNSIGNED32, parameterName: "Producer heartbeat time", accessType: t3.accessType || c.READ_WRITE })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getIdentity() {
            const e3 = this.getEntry(4120);
            return e3 ? { vendorId: e3[1].value, productCode: e3[2].value, revisionNumber: e3[3].value, serialNumber: e3[4].value } : null;
          }
          setIdentity(e3, t3 = {}) {
            let r3 = this.getEntry(4120);
            r3 || (r3 = this.addEntry(4120, { parameterName: "Identity object", objectType: o.RECORD }), r3.addSubObject(1, { parameterName: "Vendor-ID", dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_ONLY }), r3.addSubObject(2, { parameterName: "Product code", objectType: o.VAR, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_ONLY }), r3.addSubObject(3, { parameterName: "Revision number", objectType: o.VAR, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_ONLY }), r3.addSubObject(4, { parameterName: "Serial number", objectType: o.VAR, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_ONLY })), void 0 !== e3.vendorId && (r3[1].value = e3.vendorId, t3.saveDefault && (r3[1].defaultValue = e3.vendorId)), void 0 !== e3.productCode && (r3[2].value = e3.productCode, t3.saveDefault && (r3[2].defaultValue = e3.productCode)), void 0 !== e3.revisionNumber && (r3[3].value = e3.revisionNumber, t3.saveDefault && (r3[3].defaultValue = e3.revisionNumber)), void 0 !== e3.serialNumber && (r3[4].value = e3.serialNumber, t3.saveDefault && (r3[4].defaultValue = e3.serialNumber));
          }
          getSyncOverflow() {
            const e3 = this.getEntry(4121);
            return e3 ? e3.value : null;
          }
          setSyncOverflow(e3, t3 = {}) {
            e3 &= 255;
            let r3 = this.getEntry(4121);
            r3 || (r3 = this.addEntry(4121, { dataType: u.UNSIGNED8, parameterName: "Synchronous counter overflow value", accessType: t3.accessType || c.READ_WRITE, defaultValue: e3 })), r3.value = e3, t3.saveDefault && (r3.defaultValue = e3);
          }
          getEmcyConsumers() {
            const e3 = [], t3 = this.getEntry(4136);
            if (t3) {
              const r3 = t3[0].value;
              for (let n3 = 1; n3 <= r3; ++n3) {
                const r4 = t3.at(n3);
                r4 && (r4.value >> 31 || e3.push(2047 & r4.value));
              }
            }
            return e3;
          }
          addEmcyConsumer(e3, t3 = {}) {
            if (e3 > 2047) throw RangeError("CAN extended frames not supported");
            let r3 = this.getEntry(4136);
            r3 || (r3 = this.addEntry(4136, { objectType: o.ARRAY, parameterName: t3.parameterName || "Emergency consumer object" }));
            for (let t4 = 1; t4 <= r3[0].value; ++t4) {
              const r4 = this.getSubEntry(4136, t4);
              if (r4 && r4.raw.readUInt16LE() === e3) throw e3 = "0x" + e3.toString(16), new m(`EMCY consumer ${e3} already exists`);
            }
            let n3 = t3.subIndex;
            if (!n3) {
              for (let e4 = 1; e4 <= 255; ++e4) if (void 0 === r3[e4]) {
                n3 = e4;
                break;
              }
            }
            if (!n3) throw new m("entry full");
            const s3 = this.addSubEntry(4136, n3, { parameterName: `Emergency consumer ${n3}`, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE });
            s3.value = e3, t3.saveDefault && (s3.defaultValue = e3);
          }
          removeEmcyConsumer(e3) {
            const t3 = this.getEntry(4136);
            if (void 0 !== t3) for (let r3 = 1; r3 <= t3._subObjects[0].value; ++r3) {
              const n3 = t3._subObjects[r3];
              if (void 0 === n3) continue;
              const s3 = n3.value;
              if (!(s3 >> 31) && (2047 & s3) === e3) {
                t3.removeSubObject(r3);
                break;
              }
            }
          }
          getSdoServerParameters() {
            const e3 = [];
            for (let [t3, r3] of this.entries()) {
              if (t3 = parseInt(t3, 16), t3 < 4608 || t3 > 4735) continue;
              const n3 = this._parseSdoParameter(r3);
              n3 && e3.push({ cobIdRx: n3[0], cobIdTx: n3[1], deviceId: n3[2] });
            }
            return e3;
          }
          addSdoServerParameter(e3, t3 = 1408, r3 = 1536, n3 = {}) {
            if (e3 < 0 || e3 > 127) throw RangeError("deviceId must be in range [0-127]");
            let s3 = n3.index;
            if (s3) {
              if (this.getEntry(n3.index)) throw new m(`index ${n3.index} already in use`);
            } else for (s3 = 4608; s3 <= 4735 && void 0 !== this.getEntry(s3); ++s3) ;
            const i3 = this.addEntry(s3, { objectType: o.RECORD, parameterName: n3.parameterName || "SDO server parameter" }), a2 = i3.addSubObject(1, { parameterName: "COB-ID client to server", dataType: u.UNSIGNED32, accessType: n3.accessType || c.READ_WRITE }), l2 = i3.addSubObject(2, { parameterName: "COB-ID server to client", dataType: u.UNSIGNED32, accessType: n3.accessType || c.READ_WRITE }), f2 = i3.addSubObject(3, { parameterName: "Node-ID of the SDO client", dataType: u.UNSIGNED8, accessType: n3.accessType || c.READ_WRITE });
            a2.value = r3, l2.value = t3, f2.value = e3, n3.saveDefault && (a2.defaultValue = r3, l2.defaultValue = t3, f2.defaultValue = e3), this.emit("newSdoClient", { deviceId: e3, cobIdRx: r3, cobIdTx: t3 });
          }
          removeSdoServerParameter(e3) {
            for (let [t3, r3] of this.entries()) {
              if (t3 = parseInt(t3, 16), t3 < 4608 || t3 > 4735) continue;
              const n3 = this._parseSdoParameter(r3);
              if (n3 && n3[2] === e3) {
                this.removeEntry(t3), this.emit("removeSdoClient", { cobIdRx: n3[0], cobIdTx: n3[1], deviceId: n3[2] });
                break;
              }
            }
          }
          getSdoClientParameters() {
            const e3 = [];
            for (let [t3, r3] of this.entries()) {
              if (t3 = parseInt(t3, 16), t3 < 4736 || t3 > 4863) continue;
              const n3 = this._parseSdoParameter(r3);
              n3 && e3.push({ cobIdTx: n3[0], cobIdRx: n3[1], deviceId: n3[2] });
            }
            return e3;
          }
          addSdoClientParameter(e3, t3 = 1536, r3 = 1408, n3 = {}) {
            if (!e3 || e3 < 1 || e3 > 127) throw new RangeError("deviceId must be in range [1-127]");
            let s3 = n3.index;
            if (s3) {
              if (this.getEntry(n3.index)) throw new m(`index ${n3.index} already in use`);
            } else for (s3 = 4736; s3 <= 4863 && void 0 !== this.getEntry(s3); ++s3) ;
            const i3 = this.addEntry(s3, { objectType: o.RECORD, parameterName: n3.parameterName || "SDO client parameter" }), a2 = i3.addSubObject(1, { parameterName: "COB-ID client to server", dataType: u.UNSIGNED32, accessType: n3.accessType || c.READ_WRITE }), l2 = i3.addSubObject(2, { parameterName: "COB-ID server to client", dataType: u.UNSIGNED32, accessType: n3.accessType || c.READ_WRITE }), f2 = i3.addSubObject(3, { parameterName: "Node-ID of the SDO server", dataType: u.UNSIGNED8, accessType: n3.accessType || c.READ_WRITE });
            a2.value = t3, l2.value = r3, f2.value = e3, n3.saveDefault && (a2.defaultValue = t3, l2.defaultValue = r3, f2.defaultValue = e3), this.emit("newSdoServer", { deviceId: e3, cobIdRx: r3, cobIdTx: t3 });
          }
          removeSdoClientParameter(e3) {
            for (let [t3, r3] of this.entries()) {
              if (t3 = parseInt(t3, 16), t3 < 4736 || t3 > 4863) continue;
              const n3 = this._parseSdoParameter(r3);
              if (n3 && n3[2] === e3) {
                this.removeEntry(t3), this.emit("removeSdoServer", { cobIdTx: n3[0], cobIdRx: n3[1], deviceId: n3[2] });
                break;
              }
            }
          }
          getReceivePdos() {
            const e3 = [];
            for (let t3 of this.keys()) {
              if (t3 = parseInt(t3, 16), t3 < 5120 || t3 > 5631) continue;
              const r3 = this._parsePdo(t3);
              r3 && (delete r3.syncStart, e3.push(r3));
            }
            return e3;
          }
          addReceivePdo(e3, t3 = {}) {
            for (let [t4, r4] of this.entries()) {
              if (t4 = parseInt(t4, 16), t4 < 5120 || t4 > 5631) continue;
              const n4 = r4.at(1);
              if (n4 && n4.value === e3.cobId) {
                const t5 = "0x" + e3.cobId.toString(16);
                throw new m(`RPDO ${t5} already exists`);
              }
            }
            let r3 = t3.index;
            if (r3) {
              if (this.getEntry(t3.index)) throw new m(`index ${t3.index} already in use`);
            } else for (r3 = 5120; r3 <= 5631 && void 0 !== this.getEntry(r3); ++r3) ;
            if (r3 < 5120 || r3 > 5631) throw new RangeError("index must be in range [0x1400-0x15FF]");
            let n3 = "RPDO communication parameter", s3 = "RPDO mapping parameter";
            t3.parameterName && (Array.isArray(t3.parameterName) ? (n3 = t3.parameterName[0] || n3, s3 = t3.parameterName[1] || s3) : n3 = t3.parameterName || n3);
            const i3 = this.addEntry(r3, { objectType: o.RECORD, parameterName: n3 }), a2 = i3.addSubObject(1, { parameterName: "COB-ID used by RPDO", dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE });
            a2.value = e3.cobId, t3.saveDefault && (a2.defaultValue = a2.value);
            const l2 = i3.addSubObject(2, { parameterName: "transmission type", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE });
            l2.value = e3.transmissionType || 254, t3.saveDefault && (l2.defaultValue = l2.value);
            const f2 = i3.addSubObject(3, { parameterName: "inhibit time", dataType: u.UNSIGNED16, accessType: t3.accessType || c.READ_WRITE });
            f2.value = e3.inhibitTime || 0, t3.saveDefault && (f2.defaultValue = f2.value), i3.addSubObject(4, { parameterName: "compatibility entry", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE }), i3.addSubObject(5, { parameterName: "event timer", dataType: u.UNSIGNED16, accessType: t3.accessType || c.READ_WRITE }), i3.addSubObject(6, { parameterName: "SYNC start value", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE });
            const d2 = this.addEntry(r3 + 512, { objectType: o.RECORD, parameterName: s3 });
            for (let r4 = 0; r4 < e3.dataObjects.length; ++r4) {
              const n4 = e3.dataObjects[r4], s4 = n4.index << 16 | n4.subIndex << 8 | n4.size << 3, i4 = d2.addSubObject(r4 + 1, { parameterName: `Mapped object ${r4 + 1}`, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE, defaultValue: s4 });
              i4.value = s4, t3.saveDefault && (i4.defaultValue = s4);
            }
            this.emit("newRpdo", this._parsePdo(r3)), this.deviceInfo.NrOfRXPDO = this.nrOfRXPDO;
          }
          removeReceivePdo(e3) {
            for (let t3 of this.keys()) {
              if (t3 = parseInt(t3, 16), t3 < 5120 || t3 > 5631) continue;
              const r3 = this._parsePdo(t3);
              if (r3.cobId === e3) return this.removeEntry(t3), this.removeEntry(t3 + 512), this.deviceInfo.NrOfRXPDO = this.nrOfRXPDO, this.emit("removeTpdo", r3), r3;
            }
            return null;
          }
          getTransmitPdos() {
            const e3 = [];
            for (let t3 of this.keys()) {
              if (t3 = parseInt(t3, 16), t3 < 6144 || t3 > 6655) continue;
              const r3 = this._parsePdo(t3);
              r3 && e3.push(r3);
            }
            return e3;
          }
          addTransmitPdo(e3, t3 = {}) {
            for (let [t4, r4] of this.entries()) {
              if (t4 = parseInt(t4, 16), t4 < 6144 || t4 > 6655) continue;
              const n4 = r4.at(1);
              if (n4 && n4.value === e3.cobId) {
                const t5 = "0x" + e3.cobId.toString(16);
                throw new m(`TPDO ${t5} already exists`);
              }
            }
            let r3 = t3.index;
            if (r3) {
              if (this.getEntry(t3.index)) throw new m(`index ${t3.index} already in use`);
            } else for (r3 = 6144; r3 <= 6655 && void 0 !== this.getEntry(r3); ++r3) ;
            if (r3 < 6144 || r3 > 6655) throw new RangeError("index must be in range [0x1800-0x19FF]");
            let n3 = "TPDO communication parameter", s3 = "TPDO mapping parameter";
            t3.parameterName && (Array.isArray(t3.parameterName) ? (n3 = t3.parameterName[0] || n3, s3 = t3.parameterName[1] || s3) : n3 = t3.parameterName || n3);
            const i3 = this.addEntry(r3, { objectType: o.RECORD, parameterName: n3 }), a2 = i3.addSubObject(1, { parameterName: "COB-ID used by TPDO", dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE });
            a2.value = e3.cobId, t3.saveDefault && (a2.defaultValue = a2.value);
            const l2 = i3.addSubObject(2, { parameterName: "transmission type", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE });
            l2.value = e3.transmissionType || 254, t3.saveDefault && (l2.defaultValue = l2.value);
            const f2 = i3.addSubObject(3, { parameterName: "inhibit time", dataType: u.UNSIGNED16, accessType: t3.accessType || c.READ_WRITE });
            f2.value = e3.inhibitTime || 0, t3.saveDefault && (f2.defaultValue = f2.value), i3.addSubObject(4, { parameterName: "compatibility entry", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE });
            const d2 = i3.addSubObject(5, { parameterName: "event timer", dataType: u.UNSIGNED16, accessType: t3.accessType || c.READ_WRITE });
            d2.value = e3.eventTime || 0, t3.saveDefault && (d2.defaultValue = d2.value);
            const h2 = i3.addSubObject(6, { parameterName: "SYNC start value", dataType: u.UNSIGNED8, accessType: t3.accessType || c.READ_WRITE });
            h2.value = e3.syncStart || 0, t3.saveDefault && (h2.defaultValue = h2.value);
            const p2 = this.addEntry(r3 + 512, { objectType: o.RECORD, parameterName: s3 });
            for (let r4 = 0; r4 < e3.dataObjects.length; ++r4) {
              const n4 = e3.dataObjects[r4], s4 = n4.index << 16 | n4.subIndex << 8 | n4.size << 3, i4 = p2.addSubObject(r4 + 1, { parameterName: `Mapped object ${r4 + 1}`, dataType: u.UNSIGNED32, accessType: t3.accessType || c.READ_WRITE, defaultValue: s4 });
              i4.value = s4, t3.saveDefault && (i4.defaultValue = s4);
            }
            this.deviceInfo.NrOfTXPDO = this.nrOfTXPDO, this.emit("newTpdo", this._parsePdo(r3));
          }
          removeTransmitPdo(e3) {
            for (let t3 of this.keys()) {
              if (t3 = parseInt(t3, 16), t3 < 6144 || t3 > 6655) continue;
              const r3 = this._parsePdo(t3);
              if (r3.cobId === e3) return this.removeEntry(t3), this.removeEntry(t3 + 512), this.deviceInfo.NrOfTXPDO = this.nrOfTXPDO, this.emit("removeTpdo", r3), r3;
            }
            return null;
          }
          _parsePdo(e3) {
            const t3 = this.getEntry(e3);
            if (!t3) throw e3 = "0x" + e3.toString(16), new m(`missing communication parameter (${e3})`);
            const r3 = this.getEntry(e3 + 512);
            if (!r3) throw e3 = "0x" + (e3 + 512).toString(16), new m(`missing mapping parameter (${e3})`);
            if (void 0 === t3[1]) throw new m("missing PDO COB-ID");
            let n3 = t3[1].value;
            if (!n3 || 1 == (n3 >> 31 & 1)) return;
            if (1 == (n3 >> 29 & 1)) throw new m("CAN extended frames are not supported");
            if (n3 &= 2047, void 0 === t3[2]) throw new m("missing PDO transmission type");
            let s3 = { cobId: n3, transmissionType: t3[2].value, inhibitTime: void 0 !== t3[3] ? t3[3].value : 0, eventTime: void 0 !== t3[5] ? t3[5].value : 0, syncStart: void 0 !== t3[6] ? t3[6].value : 0, dataObjects: [], dataSize: 0 };
            if (254 == r3[0].value) throw new m("SAM-MPDO not supported");
            if (255 == r3[0].value) throw new m("DAM-MPDO not supported");
            if (r3[0].value > 64) throw new m(`invalid PDO mapping value (${r3[0].value})`);
            for (let e4 = 1; e4 <= r3[0].value; ++e4) {
              if (0 == r3[e4].raw.length) continue;
              const t4 = r3[e4].raw.readUInt8(0), n4 = r3[e4].raw.readUInt8(1), i3 = r3[e4].raw.readUInt16LE(2);
              let a2 = this.getEntry(i3);
              a2 && (n4 && (a2 = a2[n4]), s3.dataObjects.push(a2), s3.dataSize += t4 / 8);
            }
            return s3;
          }
          _parseSdoParameter(e3) {
            let t3 = [];
            const r3 = e3[1];
            if (!r3) return null;
            const n3 = e3[2];
            if (!n3) return null;
            const s3 = r3.value;
            if (!s3 || 1 == (s3 >> 29 & 1)) throw new m("CAN extended frames are not supported");
            t3[0] = 2047 & s3;
            const i3 = n3.value;
            if (!i3 || 1 == (i3 >> 29 & 1)) throw new m("CAN extended frames are not supported");
            t3[1] = 2047 & i3;
            const a2 = e3[3];
            return t3[2] = a2 ? a2.value : 0, t3;
          }
          _write(e3, t3) {
            const r3 = new RegExp("=null", "g");
            (t3 = t3.replace(r3, "=")).length > 0 && i2.writeSync(e3, t3 + n2);
          }
          _writeObjects(e3, t3) {
            for (const [r3, n3] of Object.entries(t3)) {
              if ("SupportedObjects" == r3) continue;
              const t4 = parseInt(n3, 16), s3 = this._dataObjects[t4.toString(16)], i3 = t4.toString(16);
              this._write(e3, a.encode(p(s3), { section: i3 }));
              for (let t5 = 0; t5 < s3.subNumber; t5++) if (s3[t5]) {
                const r4 = i3 + "sub" + t5, n4 = s3[t5];
                this._write(e3, a.encode(p(n4), { section: r4 }));
              }
            }
          }
        }
        e2.exports = { EdsError: m, DataObject: v, Eds: b };
      }, 786(e2, t2, r2) {
        const { CRC: n2 } = r2(229);
        e2.exports = function(e3) {
          return n2.buildInCrc("CRC16_CCIT_ZERO").compute(e3);
        };
      }, 642(e2, t2, r2) {
        const n2 = r2(23), s2 = 4417632e5;
        e2.exports = { timeToDate: function(e3, t3) {
          return new Date(864e5 * e3 + t3 + s2);
        }, dateToTime: function(e3) {
          n2.types.isDate(e3) || (e3 = new Date(e3));
          let t3 = e3.getTime() - s2;
          t3 < 0 && (t3 = 0);
          const r3 = Math.floor(t3 / 864e5);
          return { days: r3, ms: t3 - 864e5 * r3 };
        } };
      }, 251(e2, t2, r2) {
        const n2 = r2(786), s2 = r2(463), i2 = r2(165), { dateToTime: a, timeToDate: o } = r2(642);
        e2.exports = { calculateCrc: n2, rawToType: s2, typeToRaw: i2, dateToTime: a, timeToDate: o };
      }, 463(e2, t2, r2) {
        const { DataType: n2 } = r2(727), { timeToDate: s2 } = r2(642);
        e2.exports = function(e3, t3, r3 = 1) {
          switch ("string" == typeof t3 && (t3 = n2[t3]), t3) {
            case n2.BOOLEAN:
              return !!e3.readUInt8();
            case n2.INTEGER8:
              return e3.readInt8() * r3;
            case n2.INTEGER16:
              return e3.readInt16LE() * r3;
            case n2.INTEGER24:
              return e3.readIntLE(0, 3) * r3;
            case n2.INTEGER32:
              return e3.readInt32LE() * r3;
            case n2.INTEGER40:
              return e3.readIntLE(0, 5) * r3;
            case n2.INTEGER48:
              return e3.readIntLE(0, 6) * r3;
            case n2.INTEGER64:
              return e3.readBigInt64LE() * BigInt(r3);
            case n2.UNSIGNED8:
              return e3.readUInt8() * r3;
            case n2.UNSIGNED16:
              return e3.readUInt16LE() * r3;
            case n2.UNSIGNED24:
              return e3.readUIntLE(0, 3) * r3;
            case n2.UNSIGNED32:
              return e3.readUInt32LE() * r3;
            case n2.UNSIGNED40:
              return e3.readUIntLE(0, 5) * r3;
            case n2.UNSIGNED48:
              return e3.readUIntLE(0, 6) * r3;
            case n2.UNSIGNED64:
              return e3.readBigUInt64LE() * BigInt(r3);
            case n2.REAL32:
              return e3.readFloatLE() * r3;
            case n2.REAL64:
              return e3.readDoubleLE() * r3;
            case n2.VISIBLE_STRING:
            case n2.UNICODE_STRING:
              return function(e4) {
                const t4 = (e4 = e4.toString()).indexOf("\0");
                return -1 != t4 && (e4 = e4.substring(0, t4)), e4;
              }(e3);
            case n2.TIME_OF_DAY:
            case n2.TIME_DIFFERENCE:
              return function(e4) {
                const t4 = e4.readUInt32LE(0), r4 = e4.readUInt16LE(4);
                return s2(r4, t4);
              }(e3);
            default:
              return e3;
          }
        };
      }, 165(e2, t2, r2) {
        const { DataType: n2 } = r2(727), { dateToTime: s2 } = r2(642);
        e2.exports = function(e3, t3, r3 = 1) {
          let i2;
          switch (null == e3 && (e3 = 0), "string" == typeof t3 && (t3 = n2[t3]), t3) {
            case n2.BOOLEAN:
              i2 = Buffer.from(e3 ? [1] : [0]);
              break;
            case n2.INTEGER8:
              i2 = Buffer.alloc(1), i2.writeInt8(e3 / r3);
              break;
            case n2.UNSIGNED8:
              i2 = Buffer.alloc(1), i2.writeUInt8(e3 / r3);
              break;
            case n2.INTEGER16:
              i2 = Buffer.alloc(2), i2.writeInt16LE(e3 / r3);
              break;
            case n2.UNSIGNED16:
              i2 = Buffer.alloc(2), i2.writeUInt16LE(e3 / r3);
              break;
            case n2.INTEGER24:
              i2 = Buffer.alloc(3), i2.writeIntLE(e3 / r3, 0, 3);
              break;
            case n2.UNSIGNED24:
              i2 = Buffer.alloc(3), i2.writeUIntLE(e3 / r3, 0, 3);
              break;
            case n2.INTEGER32:
              i2 = Buffer.alloc(4), i2.writeInt32LE(e3 / r3);
              break;
            case n2.UNSIGNED32:
              i2 = Buffer.alloc(4), i2.writeUInt32LE(e3 / r3);
              break;
            case n2.INTEGER40:
              i2 = Buffer.alloc(5), i2.writeIntLE(e3 / r3, 0, 5);
              break;
            case n2.UNSIGNED40:
              i2 = Buffer.alloc(5), i2.writeUIntLE(e3 / r3, 0, 5);
              break;
            case n2.INTEGER48:
              i2 = Buffer.alloc(6), i2.writeIntLE(e3 / r3, 0, 6);
              break;
            case n2.UNSIGNED48:
              i2 = Buffer.alloc(6), i2.writeUIntLE(e3 / r3, 0, 6);
              break;
            case n2.INTEGER56:
            case n2.INTEGER64:
              "bigint" != typeof e3 && (e3 = BigInt(e3)), i2 = Buffer.alloc(8), i2.writeBigInt64LE(e3 / BigInt(r3));
              break;
            case n2.UNSIGNED56:
            case n2.UNSIGNED64:
              "bigint" != typeof e3 && (e3 = BigInt(e3)), i2 = Buffer.alloc(8), i2.writeBigUInt64LE(e3 / BigInt(r3));
              break;
            case n2.REAL32:
              i2 = Buffer.alloc(4), i2.writeFloatLE(e3 / r3);
              break;
            case n2.REAL64:
              i2 = Buffer.alloc(8), i2.writeDoubleLE(e3 / r3);
              break;
            case n2.VISIBLE_STRING:
              i2 = function(e4) {
                let t4 = e4 ? Buffer.from(e4) : Buffer.alloc(0);
                const r4 = t4.indexOf("\0");
                return -1 != r4 && (t4 = t4.subarray(0, r4)), t4;
              }(e3);
              break;
            case n2.OCTET_STRING:
            case n2.UNICODE_STRING:
              i2 = e3 ? Buffer.from(e3) : Buffer.alloc(0);
              break;
            case n2.TIME_OF_DAY:
            case n2.TIME_DIFFERENCE:
              i2 = function(e4) {
                const t4 = Buffer.alloc(6), { days: r4, ms: n3 } = s2(e4);
                return t4.writeUInt16LE(r4, 4), t4.writeUInt32LE(n3, 0), t4;
              }(e3);
          }
          return i2;
        };
      }, 421(e2, t2, r2) {
        const n2 = r2(371), { DataObject: s2, Eds: i2, EdsError: a } = r2(800), { deprecate: o } = r2(23), c = { ERROR_RESET: 0, GENERIC_ERROR: 4096, CURRENT_GENERAL: 8192, CURRENT_INPUT: 8448, CURRENT_INTERNAL: 8704, CURRENT_OUTPUT: 8960, VOLTAGE_GENERAL: 12288, VOLTAGE_MAINS: 12544, VOLTAGE_INTERNAL: 12800, VOLTAGE_OUTPUT: 13056, TEMPERATURE_GENERAL: 16384, TEMPERATURE_AMBIENT: 16640, TEMPERATURE_DEVICE: 16896, HARDWARE: 20480, SOFTWARE_GENERAL: 24576, SOFTWARE_INTERNAL: 24832, SOFTWARE_USER: 25088, SOFTWARE_DATA: 25344, MODULES: 28672, MONITORING: 32768, COMMUNICATION: 33024, PROTOCOL: 33280, EXTERNAL: 36864, ADDITIONAL_FUNCTIONS: 61440, DEVICE_SPECIFIC: 65280 }, u = { CAN_OVERRUN: 16 | c.COMMUNICATION, BUS_PASSIVE: 32 | c.COMMUNICATION, HEARTBEAT: 48 | c.COMMUNICATION, BUS_OFF_RECOVERED: 64 | c.COMMUNICATION, CAN_ID_COLLISION: 80 | c.COMMUNICATION, PDO_LENGTH: 16 | c.PROTOCOL, PDO_LENGTH_EXCEEDED: 32 | c.PROTOCOL, DAM_MPDO: 48 | c.PROTOCOL, SYNC_LENGTH: 64 | c.PROTOCOL, RPDO_TIMEOUT: 80 | c.PROTOCOL, TIME_LENGTH: 96 | c.PROTOCOL };
        class l {
          constructor(...e3) {
            if (e3 = "object" == typeof e3[0] ? e3[0] : { code: e3[0], register: e3[1], info: e3[2] }, this.code = e3.code, this.register = e3.register || 0, this.info = Buffer.alloc(5), e3.info) {
              if (!Buffer.isBuffer(e3.info) || e3.info.length > 5) throw TypeError("info must be a Buffer of length [0-5]");
              e3.info.copy(this.info);
            }
          }
          toString() {
            switch (this.code) {
              case u.CAN_OVERRUN:
                return "CAN overrun";
              case u.BUS_PASSIVE:
                return "CAN in error passive mode";
              case u.HEARTBEAT:
                return "Life guard or heartbeat error";
              case u.BUS_OFF_RECOVERED:
                return "Recovered from bus off";
              case u.CAN_ID_COLLISION:
                return "CAN-ID collision";
              case u.PDO_LENGTH:
                return "PDO not processed due to length error";
              case u.PDO_LENGTH_EXCEEDED:
                return "PDO length exceeded";
              case u.DAM_MPDO:
                return "DAM MPDO not processed, destination object not available";
              case u.SYNC_LENGTH:
                return "Unexpected SYNC data length";
              case u.RPDO_TIMEOUT:
                return "RPDO timeout";
              case u.TIME_LENGTH:
                return "Unexpected TIME data length";
            }
            switch (65280 & this.code) {
              case c.ERROR_RESET:
                return "Error reset";
              case c.GENERIC_ERROR:
                return "Generic error";
              case c.CURRENT_GENERAL:
                return "Current error";
              case c.CURRENT_INPUT:
                return "Current, CANopen device input side";
              case c.CURRENT_INTERNAL:
                return "Current inside the CANopen device";
              case c.CURRENT_OUTPUT:
                return "Current, CANopen device output side";
              case c.VOLTAGE_GENERAL:
                return "Voltage error";
              case c.VOLTAGE_MAINS:
                return "Voltage mains";
              case c.VOLTAGE_INTERNAL:
                return "Voltage inside the CANopen device";
              case c.VOLTAGE_OUTPUT:
                return "Voltage output";
              case c.TEMPERATURE_GENERAL:
                return "Temperature error";
              case c.TEMPERATURE_AMBIENT:
                return "Ambient temperature";
              case c.HARDWARE:
                return "CANopen device hardware";
              case c.SOFTWARE_GENERAL:
                return "CANopen device software";
              case c.SOFTWARE_INTERNAL:
                return "Internal software";
              case c.SOFTWARE_USER:
                return "User software";
              case c.SOFTWARE_DATA:
                return "Data set";
              case c.MODULES:
                return "Additional modules";
              case c.MONITORING:
                return "Monitoring error";
              case c.COMMUNICATION:
                return "Communication error";
              case c.PROTOCOL:
                return "Protocol error";
              case c.EXTERNAL:
                return "External error";
              case c.ADDITIONAL_FUNCTIONS:
                return "Additional functions";
              case c.DEVICE_SPECIFIC:
                return "CANopen device specific";
            }
            return `Unknown error (0x${this.code.toString(16)})`;
          }
          toBuffer() {
            let e3 = Buffer.alloc(8);
            return e3.writeUInt16LE(this.code), e3.writeUInt8(this.register, 2), this.info.copy(e3, 3), e3;
          }
          static isMessage(e3) {
            return e3 instanceof l;
          }
        }
        e2.exports = { EmcyType: c, EmcyCode: u, EmcyMessage: l, Emcy: class extends n2 {
          constructor(e3) {
            super(e3), this.sendQueue = [], this.sendTimer = null, this.consumers = [], this._valid = false, this._cobId = null;
          }
          get register() {
            return this.eds.getErrorRegister();
          }
          set register(e3) {
            this.eds.setErrorRegister(e3);
          }
          get valid() {
            return this.eds.getEmcyValid();
          }
          set valid(e3) {
            this.eds.setEmcyValid(e3);
          }
          get cobId() {
            return this.eds.getEmcyCobId();
          }
          set cobId(e3) {
            this.eds.setEmcyCobId(e3);
          }
          get inhibitTime() {
            return this.eds.getEmcyInhibitTime();
          }
          set inhibitTime(e3) {
            this.eds.setEmcyInhibitTime(e3);
          }
          write(...e3) {
            if (!this._valid) throw new a("EMCY production is disabled");
            if (!this._cobId) throw new a("COB-ID EMCY may not be 0");
            let t3, r3;
            "object" == typeof e3[0] ? (t3 = e3.code, r3 = e3.info) : (t3 = e3[0], r3 = e3[1]);
            const n3 = this.eds.getErrorRegister(), s3 = new l({ code: t3, register: n3, info: r3 });
            this.sendTimer ? this.sendQueue.push([this._cobId, s3.toBuffer()]) : this.send(this._cobId, s3.toBuffer());
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4116);
              e3 && this._addEntry(e3);
              const t3 = this.eds.getEntry(4117);
              t3 && this._addEntry(t3);
              const r3 = this.eds.getEntry(4136);
              r3 && this._addEntry(r3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4116);
              e3 && this._removeEntry(e3);
              const t3 = this.eds.getEntry(4117);
              t3 && this._removeEntry(t3);
              const r3 = this.eds.getEntry(4136);
              r3 && this._removeEntry(r3), super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            if (8 == t3.length) {
              for (let r3 of this.consumers) if (e3 === r3) {
                this.emit("emergency", { cobId: e3, em: new l({ code: t3.readUInt16LE(0), register: t3.readUInt8(2), info: t3.subarray(3) }) });
                break;
              }
            }
          }
          _addEntry(e3) {
            switch (e3.index) {
              case 4116:
                this.addUpdateCallback(e3, (e4) => this._parse1014(e4)), this._parse1014(e3);
                break;
              case 4117:
                this.addUpdateCallback(e3, (e4) => this._parse1015(e4)), this._parse1015(e3);
                break;
              case 4136:
                this.addUpdateCallback(e3, (e4) => this._parse1028(e4)), this._parse1028(e3);
            }
          }
          _removeEntry(e3) {
            switch (e3.index) {
              case 4116:
                this.removeUpdateCallback(e3), this._clear1014();
                break;
              case 4117:
                this.removeUpdateCallback(e3), this._clear1015();
                break;
              case 4136:
                this.removeUpdateCallback(e3), this._clear1028();
            }
          }
          _parse1014(e3) {
            const t3 = e3.value, r3 = t3 >> 31 & 1, n3 = 2047 & t3;
            1 & ~(t3 >> 29) ? (this._valid = !r3, this._cobId = n3) : this._clear1014();
          }
          _clear1014() {
            this._valid = false, this._cobId = null;
          }
          _parse1015(e3) {
            this._clear1015();
            const t3 = e3.value;
            if (t3) {
              const e4 = t3 / 10;
              this.sendTimer = setInterval(() => {
                if (this.sendQueue.length > 0) {
                  const [e5, t4] = this.sendQueue.shift();
                  this.send(e5, t4);
                }
              }, e4);
            } else for (; this.sendQueue.length > 0; ) {
              const [e4, t4] = this.sendQueue.shift();
              this.send(e4, t4);
            }
          }
          _clear1015() {
            clearInterval(this.sendTimer), this.sendTimer = null;
          }
          _parse1028() {
            this.consumers = this.eds.getEmcyConsumers();
          }
          _clear1028() {
            this.consumers = [];
          }
        } };
      }, 811(e2, t2, r2) {
        const n2 = r2(371), { EmcyType: s2, EmcyCode: i2, EmcyMessage: a } = r2(421), { LssError: o, LssMode: c } = r2(21), { NmtState: u } = r2(688), { SdoCode: l, SdoError: f } = r2(135);
        e2.exports = { Protocol: n2, SdoError: f, SdoCode: l, EmcyMessage: a, EmcyCode: i2, EmcyType: s2, LssError: o, LssMode: c, NmtState: u };
      }, 21(e2, t2, r2) {
        const n2 = r2(371), { Eds: s2 } = r2(800), { deprecate: i2 } = r2(23);
        function a(e3, t3, r3) {
          return (e3 = (e3 & r3) >>> 0) == (t3 & r3) >>> 0;
        }
        const o = 81, c = { OPERATION: 0, CONFIGURATION: 1 };
        class u extends Error {
          constructor(...e3) {
            super((e3 = "object" == typeof e3[0] ? e3[0] : { message: e3[0], code: e3[1], info: e3[2] }).message), this.code = e3.code, this.info = e3.info, this.name = this.constructor.name, Error.captureStackTrace(this, this.constructor);
          }
        }
        e2.exports = { LssMode: c, LssError: u, Lss: class extends n2 {
          constructor(e3) {
            super(e3), this._mode = c.OPERATION, this.pending = {}, this.select = [], this.scanState = 0, this.identity = { vendorId: null, productCode: null, revisionNumber: null, serialNumber: null };
          }
          get mode() {
            return this._mode;
          }
          get vendorId() {
            return this.eds.getSubEntry(4120, 1).value;
          }
          set vendorId(e3) {
            this.eds.getSubEntry(4120, 1).value = e3;
          }
          get productCode() {
            return this.eds.getSubEntry(4120, 2).value;
          }
          set productCode(e3) {
            this.eds.getSubEntry(4120, 2).value = e3;
          }
          get revisionNumber() {
            return this.eds.getSubEntry(4120, 3).value;
          }
          set revisionNumber(e3) {
            this.eds.getSubEntry(4120, 3).value = e3;
          }
          get serialNumber() {
            return this.eds.getSubEntry(4120, 4).value;
          }
          set serialNumber(e3) {
            this.eds.getSubEntry(4120, 4).value = e3;
          }
          setMode(e3) {
            e3 !== this._mode && (this._mode = e3, this.emit("changeMode", e3));
          }
          async fastscan(e3 = {}) {
            let t3 = e3.vendorId, r3 = e3.productCode, n3 = e3.revisionNumber, s3 = e3.serialNumber, i3 = e3.timeout || 20, a2 = false;
            if (await new Promise((e4) => {
              const t4 = setTimeout(() => {
                a2 = true, e4();
              }, i3);
              this.pending[79] = { resolve: e4, timer: t4 }, this._sendLssRequest(o, Buffer.from([0, 0, 0, 0, 128]));
            }), a2) return null;
            if (void 0 === t3) {
              t3 = 0;
              for (let e4 = 31; e4 >= 0; --e4) await new Promise((r4) => {
                const n4 = setTimeout(() => {
                  t3 = (t3 | 1 << e4 >>> 0) >>> 0, r4();
                }, i3), s4 = Buffer.alloc(7);
                s4.writeUInt32LE(t3), s4[4] = e4, s4[5] = 0, s4[6] = 0, this.pending[79] = { resolve: r4, timer: n4 }, this._sendLssRequest(o, s4);
              });
            }
            if (await new Promise((e4, r4) => {
              const n4 = setTimeout(() => {
                r4(new u("unverified vendorId", 255, 0));
              }, i3), s4 = Buffer.alloc(7);
              s4.writeUInt32LE(t3), s4[4] = 0, s4[5] = 0, s4[6] = 1, this.pending[79] = { resolve: e4, timer: n4 }, this._sendLssRequest(o, s4);
            }), void 0 === r3) {
              r3 = 0;
              for (let e4 = 31; e4 >= 0; --e4) await new Promise((t4) => {
                const n4 = setTimeout(() => {
                  r3 = (r3 | 1 << e4 >>> 0) >>> 0, t4();
                }, i3), s4 = Buffer.alloc(7);
                s4.writeUInt32LE(r3), s4[4] = e4, s4[5] = 1, s4[6] = 1, this.pending[79] = { resolve: t4, timer: n4 }, this._sendLssRequest(o, s4);
              });
            }
            if (await new Promise((e4, t4) => {
              const n4 = setTimeout(() => {
                t4(new u("unverified productCode", 255, 0));
              }, i3), s4 = Buffer.alloc(7);
              s4.writeUInt32LE(r3), s4[4] = 0, s4[5] = 1, s4[6] = 2, this.pending[79] = { resolve: e4, timer: n4 }, this._sendLssRequest(o, s4);
            }), void 0 === n3) {
              n3 = 0;
              for (let e4 = 31; e4 >= 0; --e4) await new Promise((t4) => {
                const r4 = setTimeout(() => {
                  n3 = (n3 | 1 << e4 >>> 0) >>> 0, t4();
                }, i3), s4 = Buffer.alloc(7);
                s4.writeUInt32LE(n3), s4[4] = e4, s4[5] = 2, s4[6] = 2, this.pending[79] = { resolve: t4, timer: r4 }, this._sendLssRequest(o, s4);
              });
            }
            if (await new Promise((e4, t4) => {
              const r4 = setTimeout(() => {
                t4(new u("unverified revisionNumber", 255, 0));
              }, i3), s4 = Buffer.alloc(7);
              s4.writeUInt32LE(n3), s4[4] = 0, s4[5] = 2, s4[6] = 3, this.pending[79] = { resolve: e4, timer: r4 }, this._sendLssRequest(o, s4);
            }), void 0 === s3) {
              s3 = 0;
              for (let e4 = 31; e4 >= 0; --e4) await new Promise((t4) => {
                const r4 = setTimeout(() => {
                  s3 = (s3 | 1 << e4 >>> 0) >>> 0, t4();
                }, i3), n4 = Buffer.alloc(7);
                n4.writeUInt32LE(s3), n4[4] = e4, n4[5] = 3, n4[6] = 3, this.pending[79] = { resolve: t4, timer: r4 }, this._sendLssRequest(o, n4);
              });
            }
            return await new Promise((e4, t4) => {
              const r4 = setTimeout(() => {
                t4(new u("unverified serialNumber", 255, 0));
              }, i3), n4 = Buffer.alloc(7);
              n4.writeUInt32LE(s3), n4[4] = 0, n4[5] = 3, n4[6] = 0, this.pending[79] = { resolve: e4, timer: r4 }, this._sendLssRequest(o, n4);
            }), { vendorId: t3, productCode: r3, revisionNumber: n3, serialNumber: s3 };
          }
          switchModeGlobal(e3) {
            if (void 0 === e3) throw ReferenceError("mode not defined");
            this._sendLssRequest(4, Buffer.from([e3]));
          }
          switchModeSelective(...e3) {
            return e3 = "object" == typeof e3[0] ? e3[0] : { vendorId: e3[0], productCode: e3[1], revisionNumber: e3[2], serialNumber: e3[3], timeout: e3[4] }, new Promise((t3, r3) => {
              const n3 = setTimeout(() => {
                r3(new u("timeout"));
              }, e3.timeout);
              this.pending[68] = { resolve: t3, timer: n3 };
              const s3 = Buffer.alloc(4);
              s3.writeUInt32LE(e3.vendorId), this._sendLssRequest(64, s3), s3.writeUInt32LE(e3.productCode), this._sendLssRequest(65, s3), s3.writeUInt32LE(e3.revisionNumber), this._sendLssRequest(66, s3), s3.writeUInt32LE(e3.serialNumber), this._sendLssRequest(67, s3);
            });
          }
          async configureNodeId(e3, t3 = 20) {
            const r3 = await new Promise((r4, n4) => {
              const s3 = setTimeout(() => {
                n4(new u("timeout"));
              }, t3);
              this.pending[17] = { resolve: r4, timer: s3 }, this._sendLssRequest(17, Buffer.from([e3]));
            });
            let n3 = "";
            switch (r3[0]) {
              case 0:
                return;
              case 1:
                n3 = "Node-ID out of range";
                break;
              case 255:
                n3 = "Implementation specific error";
                break;
              default:
                n3 = "Unsupported error code";
            }
            throw new u(n3, r3[0], r3[1]);
          }
          async configureBitTiming(e3, t3, r3 = 20) {
            const n3 = await new Promise((n4, s4) => {
              const i3 = setTimeout(() => {
                s4(new u("timeout"));
              }, r3);
              this.pending[19] = { resolve: n4, timer: i3 }, this._sendLssRequest(19, Buffer.from([e3, t3]));
            });
            let s3 = "";
            switch (n3[0]) {
              case 0:
                return;
              case 1:
                s3 = "Bit timing not supported";
                break;
              case 255:
                s3 = "Implementation specific error";
                break;
              default:
                s3 = "Unsupported error code";
            }
            throw new u(s3, n3[0], n3[1]);
          }
          activateBitTiming(e3) {
            const t3 = Buffer.alloc(2);
            t3.writeUInt16LE(e3), this._sendLssRequest(21, t3);
          }
          async storeConfiguration(e3 = 20) {
            const t3 = await new Promise((t4, r4) => {
              const n3 = setTimeout(() => {
                r4(new u("timeout"));
              }, e3);
              this.pending[23] = { resolve: t4, timer: n3 }, this._sendLssRequest(23);
            });
            let r3 = "";
            switch (t3[0]) {
              case 0:
                return;
              case 1:
                r3 = "Store configuration not supported";
                break;
              case 2:
                r3 = "Storage media access error";
                break;
              case 255:
                r3 = "Implementation specific error";
                break;
              default:
                r3 = "Unsupported error code";
            }
            throw new u(r3, t3[0], t3[1]);
          }
          async inquireVendorId(e3 = 20) {
            return (await new Promise((t3, r3) => {
              const n3 = setTimeout(() => r3(new u("timeout")), e3);
              this.pending[90] = { resolve: t3, timer: n3 }, this._sendLssRequest(90);
            })).readUInt32LE();
          }
          async inquireProductCode(e3 = 20) {
            return (await new Promise((t3, r3) => {
              const n3 = setTimeout(() => r3(new u("timeout")), e3);
              this.pending[91] = { resolve: t3, timer: n3 }, this._sendLssRequest(91);
            })).readUInt32LE();
          }
          async inquireRevisionNumber(e3 = 20) {
            return (await new Promise((t3, r3) => {
              const n3 = setTimeout(() => r3(new u("timeout")), e3);
              this.pending[92] = { resolve: t3, timer: n3 }, this._sendLssRequest(92);
            })).readUInt32LE();
          }
          async inquireSerialNumber(e3 = 20) {
            return (await new Promise((t3, r3) => {
              const n3 = setTimeout(() => r3(new u("timeout")), e3);
              this.pending[93] = { resolve: t3, timer: n3 }, this._sendLssRequest(93);
            })).readUInt32LE();
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4120);
              e3 && this._addEntry(e3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4120);
              e3 && this._removeEntry(e3), super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            if (2020 === e3) {
              const e4 = t3[0];
              void 0 !== this.pending[e4] && (clearTimeout(this.pending[e4].timer), this.pending[e4].resolve(t3.slice(1)));
            } else if (2021 === e3) {
              const e4 = t3[0];
              if (e4 === o) {
                const e5 = t3[5], r4 = t3[6], n4 = t3[7];
                if (128 === e5) this.scanState = 0, this._sendLssResponse(79);
                else if (this.scanState === r4) {
                  if (e5 > 31 || r4 > 3 || n4 > 3) return;
                  const s3 = t3.readUInt32LE(1), i3 = 4294967295 << e5 >>> 0;
                  let o2 = false;
                  switch (r4) {
                    case 0:
                      o2 = a(this.identity.vendorId, s3, i3);
                      break;
                    case 1:
                      o2 = a(this.identity.productCode, s3, i3);
                      break;
                    case 2:
                      o2 = a(this.identity.revisionNumber, s3, i3);
                      break;
                    case 3:
                      o2 = a(this.identity.serialNumber, s3, i3);
                  }
                  o2 && (this.scanState = n4, 0 === e5 && n4 < r4 && this.setMode(c.CONFIGURATION), this._sendLssResponse(79));
                }
                return;
              }
              switch (e4) {
                case 4:
                  return this.setMode(t3[1]), void (this.select = []);
                case 64:
                  return void (this.select[0] = t3.readUInt32LE(1));
                case 65:
                  return void (this.select[1] = t3.readUInt32LE(1));
                case 66:
                  return void (this.select[2] = t3.readUInt32LE(1));
                case 67:
                  return this.select[3] = t3.readUInt32LE(1), r3 = this.identity, void ((n3 = this.select)[0] === r3.vendorId && n3[1] === r3.productCode && n3[2] === r3.revisionNumber && n3[3] === r3.serialNumber && this.setMode(c.CONFIGURATION));
              }
              if (this.mode !== c.CONFIGURATION) return;
              switch (e4) {
                case 17:
                  try {
                    this.emit("changeDeviceId", t3[1]), this._sendLssResponse(e4, 0);
                  } catch {
                    this._sendLssResponse(e4, 1);
                  }
                  return;
                case 19:
                case 23:
                  return void this._sendLssResponse(e4, 1);
                case 90:
                  return void this._sendLssResponse(e4, this.identity.vendorId);
                case 91:
                  return void this._sendLssResponse(e4, this.identity.productCode);
                case 92:
                  return void this._sendLssResponse(e4, this.identity.revisionNumber);
                case 93:
                  return void this._sendLssResponse(e4, this.identity.serialNumber);
              }
            }
            var r3, n3;
          }
          _addEntry(e3) {
            4120 === e3.index && (this.addUpdateCallback(e3, (e4) => this._parse1018(e4)), this._parse1018(e3));
          }
          _removeEntry(e3) {
            4120 === e3.index && (this.removeUpdateCallback(e3), this._clear1018());
          }
          _parse1018(e3) {
            if (!e3) return;
            const t3 = e3.subIndex;
            if (null === t3) {
              const t4 = e3[0].value;
              for (let r3 = 1; r3 <= t4; ++r3) this._parse1018(e3.at(r3));
            } else switch (t3) {
              case 1:
                this.identity.vendorId = e3.value;
                break;
              case 2:
                this.identity.productCode = e3.value;
                break;
              case 3:
                this.identity.revisionNumber = e3.value;
                break;
              case 4:
                this.identity.serialNumber = e3.value;
            }
          }
          _clear1018() {
            this.identity = { vendorId: null, productCode: null, revisionNumber: null, serialNumber: null };
          }
          _sendLssRequest(e3, t3) {
            const r3 = Buffer.alloc(8);
            r3[0] = e3, void 0 !== t3 && t3.copy(r3, 1), this.send(2021, r3);
          }
          _sendLssResponse(e3, t3, r3 = 0) {
            const n3 = Buffer.alloc(8);
            n3[0] = e3, n3[1] = t3, n3[2] = r3, this.send(2020, n3);
          }
        } };
      }, 688(e2, t2, r2) {
        const n2 = r2(371), { DataObject: s2, Eds: i2 } = r2(800), { deprecate: a } = r2(23), o = { INITIALIZING: 0, PRE_OPERATIONAL: 127, OPERATIONAL: 5, STOPPED: 4 };
        e2.exports = { NmtState: o, Nmt: class extends n2 {
          constructor(e3) {
            super(e3), this.deviceId = null, this.consumers = {}, this.heartbeatTimer = null, this._state = o.INITIALIZING;
          }
          get state() {
            return this._state;
          }
          get timers() {
            let e3 = {};
            for (const [t3, r3] of Object.entries(this.consumers)) e3[t3] = r3.timer;
            return e3;
          }
          get producerTime() {
            return this.getHeartbeatProducerTime();
          }
          set producerTime(e3) {
            this.eds.setHeartbeatProducerTime(e3);
          }
          setState(e3) {
            e3 !== this._state && (this._state = e3, this.emit("changeState", e3));
          }
          getConsumerTime(e3) {
            const t3 = this.eds.getEntry(4118);
            if (t3) {
              const r3 = t3[0].value;
              for (let n3 = 1; n3 <= r3; ++n3) {
                const r4 = t3.at(n3);
                if (r4 && e3 === r4.raw.readUInt8(2)) return r4.raw.readUInt16LE(0);
              }
            }
            return null;
          }
          async getNodeState(...e3) {
            let t3, r3;
            if ("object" == typeof e3[0] ? (t3 = e3.deviceId, r3 = e3.timeout) : (t3 = e3[0], r3 = e3[1]), !t3 || t3 === this.deviceId) return this.state;
            if (!r3 && this.consumers[t3]) return this.consumers[t3].state;
            let n3 = this.getConsumerTime(t3);
            if (null === n3) throw new ReferenceError(`NMT consumer ${t3} does not exist`);
            return r3 || (r3 = 2 * n3), new Promise((e4) => {
              const s3 = Date.now();
              let i3 = null, a2 = null;
              i3 = setTimeout(() => {
                const r4 = this.consumers[t3];
                r4 && r4.last > s3 ? e4(r4.state) : e4(null), clearInterval(a2);
              }, r3), a2 = setInterval(() => {
                const r4 = this.consumers[t3];
                r4 && r4.last > s3 && (clearTimeout(i3), clearInterval(a2), e4(r4.state));
              }, n3 / 2);
            });
          }
          startNode(e3) {
            this._sendNmt(e3, 1);
          }
          stopNode(e3) {
            this._sendNmt(e3, 2);
          }
          enterPreOperational(e3) {
            this._sendNmt(e3, 128);
          }
          resetNode(e3) {
            this._sendNmt(e3, 129);
          }
          resetCommunication(e3) {
            this._sendNmt(e3, 130);
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4118);
              e3 && this._addEntry(e3);
              const t3 = this.eds.getEntry(4119);
              t3 && this._addEntry(t3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), super.start(), this.setState(o.PRE_OPERATIONAL);
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4118);
              e3 && this._removeEntry(e3);
              const t3 = this.eds.getEntry(4119);
              t3 && this._removeEntry(t3), this.setState(o.INITIALIZING), super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            if (2047 & e3) {
              if (!(1792 & ~e3)) {
                const r3 = 127 & e3, n3 = this.consumers[r3];
                if (n3) {
                  n3.last = Date.now();
                  const e4 = t3[0];
                  e4 !== n3.state && (n3.state = e4, this.emit("heartbeat", { deviceId: r3, state: e4 })), n3.timer ? n3.timer.refresh() : n3.timer = setTimeout(() => {
                    n3.state = null, n3.timer = null, this.emit("timeout", r3);
                  }, n3.interval);
                }
              }
            } else {
              const e4 = t3[1];
              0 != e4 && e4 != this.deviceId || this._handleNmt(t3[0]);
            }
          }
          _addEntry(e3) {
            switch (e3.index) {
              case 4118:
                this.addUpdateCallback(e3, (e4) => this._parse1016(e4)), this._parse1016(e3);
                break;
              case 4119:
                this.addUpdateCallback(e3, (e4) => this._parse1017(e4)), this._parse1017(e3);
            }
          }
          _removeEntry(e3) {
            switch (e3.index) {
              case 4118:
                this.removeUpdateCallback(e3), this._clear1016();
                break;
              case 4119:
                this.removeUpdateCallback(e3), this._clear1017();
            }
          }
          _parse1016(e3) {
            if (!e3) return;
            const t3 = e3.subIndex;
            if (null === t3) {
              const t4 = e3[0].value;
              for (let r3 = 1; r3 <= t4; ++r3) this._parse1016(e3.at(r3));
            } else if (t3 > 0) {
              const t4 = e3.raw.readUInt8(2);
              if (t4 > 0) {
                this.consumers[t4] && clearInterval(this.consumers[t4].timer);
                const r3 = e3.raw.readUInt16LE();
                this.consumers[t4] = { state: null, interval: r3, timer: null };
              }
            }
          }
          _clear1016() {
            for (const e3 of Object.values(this.consumers)) clearTimeout(e3.timer);
            this.consumers = {};
          }
          _parse1017(e3) {
            this._clear1017();
            const t3 = e3.value;
            t3 > 0 && (this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), t3));
          }
          _clear1017() {
            clearInterval(this.heartbeatTimer), this.heartbeatTimer = null;
          }
          _sendNmt(e3, t3) {
            void 0 !== e3 ? (e3 || this._handleNmt(t3), this.send(0, Buffer.from([t3, e3]))) : this._handleNmt(t3);
          }
          _sendHeartbeat() {
            this.deviceId && this.deviceId < 128 && this.send(1792 + this.deviceId, Buffer.from([this.state]));
          }
          _handleNmt(e3) {
            switch (e3) {
              case 1:
                this.setState(o.OPERATIONAL);
                break;
              case 2:
                this.setState(o.STOPPED);
                break;
              case 128:
                this.setState(o.PRE_OPERATIONAL);
                break;
              case 129:
              case 130:
                this.setState(o.INITIALIZING), this._emitReset(true);
            }
          }
          _emitReset(e3) {
            this.emit("reset", e3);
          }
        } };
      }, 298(e2, t2, r2) {
        const n2 = r2(371), { DataObject: s2, Eds: i2, EdsError: a } = r2(800), { deprecate: o } = r2(23);
        e2.exports = { Pdo: class extends n2 {
          constructor(e3) {
            super(e3), this.receiveMap = {}, this.transmitMap = {}, this.eventTimers = {}, this.events = [], this.syncTpdo = {}, this.syncCobId = null, this.updateFlags = {};
          }
          write(e3) {
            const t3 = this.transmitMap[e3];
            if (!t3) throw new a(`TPDO 0x${e3.toString(16)} not mapped.`);
            const r3 = Buffer.alloc(t3.dataSize);
            let n3 = 0;
            for (const e4 of t3.dataObjects) e4.raw.copy(r3, n3), n3 += e4.raw.length;
            this.send(e3, r3);
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4101);
              e3 && this._addEntry(e3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), this.receiveMap = {};
              for (const e4 of this.eds.getReceivePdos()) this._addRpdo(e4);
              this.addEdsCallback("newRpdo", (e4) => this._addRpdo(e4)), this.addEdsCallback("removeRpdo", (e4) => this._removeRpdo(e4)), this.transmitMap = {};
              for (const e4 of this.eds.getTransmitPdos()) this._addTpdo(e4);
              this.addEdsCallback("newTpdo", (e4) => this._addTpdo(e4)), this.addEdsCallback("removeTpdo", (e4) => this._removeTpdo(e4)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4101);
              e3 && this._removeEntry(e3), this.removeEdsCallback("newRpdo"), this.removeEdsCallback("removeRpdo");
              for (const e4 of this.eds.getReceivePdos()) this._removeRpdo(e4);
              this.removeEdsCallback("newTpdo"), this.removeEdsCallback("removeTpdo");
              for (const e4 of this.eds.getTransmitPdos()) this._removeTpdo(e4);
              super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            if ((2047 & e3) === this.syncCobId) {
              const e4 = t3[1];
              for (const t4 of Object.values(this.syncTpdo)) t4.started ? 0 == t4.transmissionType ? this.write(t4.cobId, true) : ++t4.counter >= t4.transmissionType && (this.write(t4.cobId), t4.counter = 0) : e4 >= t4.syncStart && (t4.started = true, t4.counter = 0);
              return;
            }
            const r3 = this.receiveMap[e3];
            if (r3) {
              let e4 = 0, n3 = false;
              for (const s3 of r3.dataObjects) {
                const r4 = s3.size;
                if (t3.length < e4 + r4) continue;
                const i3 = s3.value;
                t3.copy(s3.raw, 0, e4, e4 + r4), e4 += s3.raw.length, n3 || i3 === s3.value || (n3 = true);
              }
              n3 && this._emitPdo(r3);
            }
          }
          _addEntry(e3) {
            4101 === e3.index && (this.addUpdateCallback(e3, (e4) => this._parse1005(e4)), this._parse1005(e3));
          }
          _removeEntry(e3) {
            4101 === e3.index && (this.removeUpdateCallback(e3), this._clear1005());
          }
          _parse1005(e3) {
            const t3 = e3.value, r3 = 2047 & t3;
            1 & ~(t3 >> 29) ? this.syncCobId = r3 : this._clear1005();
          }
          _clear1005() {
            this.syncCobId = null;
          }
          _addRpdo(e3) {
            this.receiveMap[e3.cobId] = e3;
          }
          _removeRpdo(e3) {
            delete this.receiveMap[e3.cobId];
          }
          _addTpdo(e3) {
            if (this.transmitMap[e3.cobId] = e3, e3.transmissionType < 241) e3.syncStart || (e3.started = true, e3.counter = 0), this.syncTpdo[e3.cobId] = e3;
            else if (254 == e3.transmissionType) if (e3.eventTime > 0) {
              const t3 = setInterval(() => this.write(e3.cobId), e3.eventTime);
              this.eventTimers[e3.cobId] = t3;
            } else if (e3.inhibitTime > 0) {
              this.updateFlags[e3.cobId] = false, this.eventTimers[e3.cobId] = setInterval(() => {
                this.updateFlags[e3.cobId] && (this.updateFlags[e3.cobId] = false, this.write(e3.cobId));
              }, e3.inhibitTime);
              for (const t3 of e3.dataObjects) {
                const r3 = e3.cobId.toString(16) + ":" + t3.key, n3 = () => {
                  this.updateFlags[e3.cobId] = true;
                };
                this.addUpdateCallback(t3, n3, r3);
              }
            } else for (const t3 of e3.dataObjects) {
              const r3 = e3.cobId.toString(16) + ":" + t3.key, n3 = () => {
                this.write(e3.cobId);
              };
              this.addUpdateCallback(t3, n3, r3);
            }
          }
          _removeTpdo(e3) {
            if (e3.transmissionType < 241) delete this.syncTpdo[e3.cobId];
            else if (254 == e3.transmissionType) if (e3.eventTime > 0) clearInterval(this.eventTimers[e3.cobId]), delete this.eventTimers[e3.cobId];
            else if (e3.inhibitTime > 0) {
              clearInterval(this.eventTimers[e3.cobId]), delete this.eventTimers[e3.cobId], delete this.updateFlags[e3.cobId];
              for (const t3 of e3.dataObjects) {
                const r3 = e3.cobId.toString(16) + ":" + t3.key;
                this.removeUpdateCallback(t3, r3);
              }
            } else for (const t3 of e3.dataObjects) {
              const r3 = e3.cobId.toString(16) + ":" + t3.key;
              this.removeUpdateCallback(t3, r3);
            }
            delete this.transmitMap[e3.cobId];
          }
          _emitPdo(e3) {
            this.emit("pdo", e3);
          }
        } };
      }, 371(e2, t2, r2) {
        const n2 = r2(434), { Eds: s2 } = r2(800);
        e2.exports = class extends n2 {
          constructor(e3) {
            if (super(), !s2.isEds(e3)) throw new TypeError("not an Eds");
            this.eds = e3, this.started = false, this.callbacks = {};
          }
          start() {
            this.started = true, this.emit("start");
          }
          stop() {
            this.started = false, this.emit("stop");
          }
          receive(e3) {
          }
          send(e3, t3) {
            void 0 === t3 && (t3 = Buffer.alloc(0)), this.emit("message", { id: e3, data: t3 });
          }
          addEdsCallback(e3, t3) {
            if (this.callbacks[e3]) throw new Error(e3 + " already exists");
            this.callbacks[e3] = t3, this.eds.addListener(e3, t3);
          }
          removeEdsCallback(e3) {
            this.eds.removeListener(e3, this.callbacks[e3]), delete this.callbacks[e3];
          }
          addUpdateCallback(e3, t3, r3 = "") {
            if (r3 || (r3 = e3.key), this.callbacks[r3]) throw new Error(r3 + " already exists");
            this.callbacks[r3] = t3, e3.addListener("update", t3);
          }
          removeUpdateCallback(e3, t3 = "") {
            t3 || (t3 = e3.key), e3.removeListener("update", this.callbacks[t3]), delete this.callbacks[t3];
          }
        };
      }, 135(e2, t2, r2) {
        const n2 = r2(434), s2 = { TOGGLE_BIT: 84082688, TIMEOUT: 84148224, BAD_COMMAND: 84148225, BAD_BLOCK_SIZE: 84148226, BAD_BLOCK_SEQUENCE: 84148227, BAD_BLOCK_CRC: 84148228, OUT_OF_MEMORY: 84148229, UNSUPPORTED_ACCESS: 100728832, WRITE_ONLY: 100728833, READ_ONLY: 100728834, OBJECT_UNDEFINED: 100794368, OBJECT_NOT_MAPPABLE: 100925505, MAP_LENGTH: 100925506, PARAMETER_INCOMPATIBILITY: 100925507, DEVICE_INCOMPATIBILITY: 100925511, HARDWARE_ERROR: 101056512, BAD_LENGTH: 101122064, DATA_LONG: 101122066, DATA_SHORT: 101122067, BAD_SUB_INDEX: 101253137, BAD_VALUE: 101253168, VALUE_HIGH: 101253169, VALUE_LOW: 101253170, RANGE_ERROR: 101253174, SDO_NOT_AVAILBLE: 101318691, GENERAL_ERROR: 134217728, DATA_TRANSFER: 134217760, LOCAL_CONTROL: 134217761, DEVICE_STATE: 134217762, OD_ERROR: 134217763, NO_DATA: 134217764 };
        class i2 extends Error {
          constructor(e3, t3, r3 = null) {
            const n3 = function(e4) {
              switch (e4) {
                case s2.TOGGLE_BIT:
                  return "Toggle bit not altered";
                case s2.TIMEOUT:
                  return "SDO protocol timed out";
                case s2.BAD_COMMAND:
                  return "Command specifier not valid or unknown";
                case s2.BAD_BLOCK_SIZE:
                  return "Invalid block size in block mode";
                case s2.BAD_BLOCK_SEQUENCE:
                  return "Invalid sequence number in block mode";
                case s2.BAD_BLOCK_CRC:
                  return "CRC error in block mode";
                case s2.OUT_OF_MEMORY:
                  return "Out of memory";
                case s2.UNSUPPORTED_ACCESS:
                  return "Unsupported access to an object";
                case s2.WRITE_ONLY:
                  return "Attempt to read a write only object";
                case s2.READ_ONLY:
                  return "Attempt to write a read only object";
                case s2.OBJECT_UNDEFINED:
                  return "Object does not exist";
                case s2.OBJECT_NOT_MAPPABLE:
                  return "Object cannot be mapped to the PDO";
                case s2.MAP_LENGTH:
                  return "Number and length of object to be mapped exceeds PDO length";
                case s2.PARAMETER_INCOMPATIBILITY:
                  return "General parameter incompatibility reasons";
                case s2.DEVICE_INCOMPATIBILITY:
                  return "General internal incompatibility in device";
                case s2.HARDWARE_ERROR:
                  return "Access failed due to hardware error";
                case s2.BAD_LENGTH:
                  return "Data type does not match: length of service parameter does not match";
                case s2.DATA_LONG:
                  return "Data type does not match: length of service parameter too high";
                case s2.DATA_SHORT:
                  return "Data type does not match: length of service parameter too short";
                case s2.BAD_SUB_INDEX:
                  return "Sub index does not exist";
                case s2.BAD_VALUE:
                  return "Invalid value for download parameter";
                case s2.VALUE_HIGH:
                  return "Value range of parameter written too high";
                case s2.VALUE_LOW:
                  return "Value range of parameter written too low";
                case s2.RANGE_ERROR:
                  return "Maximum value is less than minimum value";
                case s2.SDO_NOT_AVAILBLE:
                  return "Resource not available: SDO connection";
                case s2.GENERAL_ERROR:
                  return "General error";
                case s2.DATA_TRANSFER:
                  return "Data cannot be transferred or stored to application";
                case s2.LOCAL_CONTROL:
                  return "Data cannot be transferred or stored to application because of local control";
                case s2.DEVICE_STATE:
                  return "Data cannot be transferred or stored to application because of present device state";
                case s2.OD_ERROR:
                  return "Object dictionary not present or dynamic generation failed";
                case s2.NO_DATA:
                  return "No data available";
                default:
                  return `Unknown error (0x${e4.toString(16).padStart(8, "0")})`;
              }
            }(e3);
            let i3 = t3;
            "number" == typeof t3 && (i3 = `0x${t3.toString(16)}`), null !== r3 && (i3 += `.${r3.toString()}`), super(`${n3} [${i3}]`), this.code = e3, this.name = this.constructor.name, Error.captureStackTrace(this, this.constructor);
          }
        }
        e2.exports = { ClientCommand: { DOWNLOAD_SEGMENT: 0, DOWNLOAD_INITIATE: 1, UPLOAD_INITIATE: 2, UPLOAD_SEGMENT: 3, ABORT: 4, BLOCK_UPLOAD: 5, BLOCK_DOWNLOAD: 6 }, ServerCommand: { UPLOAD_SEGMENT: 0, DOWNLOAD_SEGMENT: 1, UPLOAD_INITIATE: 2, DOWNLOAD_INITIATE: 3, ABORT: 4, BLOCK_DOWNLOAD: 5, BLOCK_UPLOAD: 6 }, SdoCode: s2, SdoError: i2, SdoTransfer: class extends n2 {
          constructor(e3) {
            super(), this._resolve = e3.resolve, this._reject = e3.reject, this.index = e3.index, this.subIndex = e3.subIndex, this.timeout = e3.timeout, this.cobId = e3.cobId, this.data = e3.data || Buffer.alloc(0), this.size = this.data.length, this.blockInterval = e3.blockInterval, this.active = false, this.toggle = 0, this.timer = null, this.blockTimer = null, this.blockDownload = false, this.blockFinished = false, this.blockSequence = 0, this.blockCrc = false;
          }
          reset() {
            clearTimeout(this.timer), clearInterval(this.blockTimer), this.active = false, this.timer = null, this.blockTimer = null, this.blockTransfer = false, this.blockFinished = false, this.blockSequence = 0, this.blockCrc = false;
          }
          start() {
            this.active = true, this.timeout && (this.timer = setTimeout(() => this.abort(s2.TIMEOUT), this.timeout));
          }
          refresh() {
            this.timeout && null != this.timer && this.timer.refresh();
          }
          resolve(e3) {
            this.reset(), this._resolve && this._resolve(e3);
          }
          reject(e3) {
            this.reset(), this._reject && this._reject(new i2(e3, this.index, this.subIndex));
          }
          abort(e3) {
            this.emit("abort", e3);
          }
        } };
      }, 233(e2, t2, r2) {
        const n2 = r2(371), { DataObject: s2, Eds: i2 } = r2(800), { DataType: a } = r2(727), { SdoCode: o, SdoTransfer: c, ClientCommand: u, ServerCommand: l } = r2(135), f = r2(786), d = r2(463), h = r2(165), { deprecate: p } = r2(23);
        class m {
          constructor() {
            this.queue = [], this.pending = false;
          }
          push(e3) {
            return new Promise((t3, r3) => {
              this.queue.push({ start: e3, resolve: t3, reject: r3 }), this.pop();
            });
          }
          pop() {
            if (this.pending) return;
            const e3 = this.queue.shift();
            e3 && (this.pending = true, e3.start().then((t3) => {
              this.pending = false, e3.resolve(t3), this.pop();
            }).catch((t3) => {
              this.pending = false, e3.reject(t3), this.pop();
            }));
          }
        }
        e2.exports = { SdoClient: class extends n2 {
          constructor(e3) {
            super(e3), this.sdoServers = [], this.transfers = {}, this._blockSize = 127;
          }
          get blockSize() {
            return this._blockSize;
          }
          setBlockSize(e3) {
            if (e3 < 1 || e3 > 127) throw RangeError("blockSize must be in range [1-127]");
            this._blockSize = e3;
          }
          async upload(e3) {
            const t3 = e3.deviceId || e3.serverId, r3 = e3.index, n3 = e3.subIndex || null, s3 = e3.timeout || 30, i3 = e3.dataType || null, a2 = e3.blockTransfer || false, o2 = e3.blockInterval, u2 = e3.cobIdRx || null;
            let l2 = this._getServer({ deviceId: t3, cobIdRx: u2 });
            if (!l2) {
              const e4 = t3.toString(16);
              throw new ReferenceError(`SDO server 0x${e4} not mapped`);
            }
            if (void 0 === r3) throw ReferenceError("index must be defined");
            const f2 = await l2.queue.push(() => new Promise((e4, t4) => {
              const i4 = new c({ resolve: e4, reject: t4, index: r3, subIndex: n3, timeout: s3, blockInterval: o2, cobId: l2.cobIdTx });
              this.transfers[l2.cobIdRx] = i4;
              const u3 = Buffer.alloc(8);
              u3.writeUInt16LE(r3, 1), u3.writeUInt8(n3, 3), i4.addListener("abort", (e5) => this._abortTransfer(i4, e5)), i4.start(), a2 ? this._blockUploadStart(i4) : this._uploadStart(i4);
            }));
            return d(f2, i3);
          }
          async download(e3) {
            const t3 = e3.deviceId || e3.serverId, r3 = e3.index, n3 = e3.subIndex || null, i3 = e3.timeout || 30, a2 = e3.dataType || null, o2 = e3.blockTransfer || false, u2 = e3.blockInterval, l2 = e3.cobIdRx || null;
            let f2 = this._getServer({ deviceId: t3, cobIdRx: l2 });
            if (void 0 === f2) {
              const e4 = t3.toString(16);
              throw new ReferenceError(`SDO server 0x${e4} not mapped`);
            }
            if (void 0 === r3) throw ReferenceError("index must be defined");
            let d2 = e3.data;
            if (!Buffer.isBuffer(d2)) if (s2.isDataObject(d2)) d2 = d2.raw;
            else {
              if (!a2) throw ReferenceError("dataType must be defined");
              if (d2 = h(d2, a2), void 0 === d2) throw TypeError(`unknown dataType ${a2}`);
            }
            await f2.queue.push(() => new Promise((e4, t4) => {
              const s3 = new c({ cobId: f2.cobIdTx, resolve: e4, reject: t4, index: r3, subIndex: n3, data: d2, timeout: i3, blockInterval: u2 });
              this.transfers[f2.cobIdRx] = s3;
              const a3 = Buffer.alloc(8);
              a3.writeUInt16LE(r3, 1), a3.writeUInt8(n3, 3), s3.addListener("abort", (e5) => this._abortTransfer(s3, e5)), s3.start(), o2 ? this._blockDownloadStart(s3) : this._downloadStart(s3);
            }));
          }
          start() {
            if (!this.started) {
              this.sdoServers = [];
              for (const e3 of this.eds.getSdoClientParameters()) this._addServer(e3);
              this.addEdsCallback("newSdoServer", (e3) => this._addServer(e3)), this.addEdsCallback("removeSdoServer", (e3) => this._removeServer(e3)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newSdoServer"), this.removeEdsCallback("removeSdoServer");
              for (const e3 of this.eds.getSdoClientParameters()) this._removeServer(e3);
              super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            const r3 = this.transfers[e3];
            if (void 0 !== r3 && r3.active) if (r3.blockTransfer) {
              if ((127 & t3[0]) === r3.blockSequence + 1 && (r3.data = Buffer.concat([r3.data, t3.slice(1)]), r3.blockSequence++, 128 & t3[0] && (r3.blockFinished = true, r3.blockTransfer = false)), r3.blockSequence > 127) return void this._abortTransfer(r3, o.BAD_BLOCK_SEQUENCE);
              if (r3.refresh(), r3.blockFinished || r3.blockSequence == this.blockSize) {
                const e4 = u.BLOCK_UPLOAD << 5 | 2, t4 = Buffer.alloc(8);
                t4.writeUInt8(e4), t4.writeInt8(r3.blockSequence, 1), t4.writeUInt8(this.blockSize, 2), r3.blockSequence = 0, this.send(r3.cobId, t4);
              }
            } else switch (t3[0] >> 5) {
              case l.UPLOAD_SEGMENT:
                this._uploadSegment(r3, t3);
                break;
              case l.DOWNLOAD_SEGMENT:
                this._downloadSegment(r3, t3);
                break;
              case l.UPLOAD_INITIATE:
                this._uploadInitiate(r3, t3);
                break;
              case l.DOWNLOAD_INITIATE:
                this._downloadInitiate(r3);
                break;
              case l.ABORT:
                this._abortTransfer(r3, t3.readUInt32LE(4));
                break;
              case l.BLOCK_DOWNLOAD:
                switch (3 & t3[0]) {
                  case 0:
                    this._blockDownloadInitiate(r3, t3);
                    break;
                  case 1:
                    this._blockDownloadEnd(r3);
                    break;
                  case 2:
                    this._blockDownloadConfirm(r3, t3);
                }
                break;
              case l.BLOCK_UPLOAD:
                this._blockUpload(r3, t3);
                break;
              default:
                this._abortTransfer(r3, o.BAD_COMMAND);
            }
          }
          _getServer({ deviceId: e3, cobIdRx: t3 }) {
            for (const r3 of this.sdoServers) if (r3.deviceId === e3 && (!t3 || t3 === r3.cobIdRx)) return r3;
            return null;
          }
          _addServer({ deviceId: e3, cobIdTx: t3, cobIdRx: r3 }) {
            this.sdoServers.push({ deviceId: e3, cobIdTx: t3, cobIdRx: r3, queue: new m() });
          }
          _removeServer({ deviceId: e3, cobIdRx: t3 }) {
            const r3 = this.transfers[t3];
            r3 && (r3.active && this._abortTransfer(r3, o.DEVICE_STATE), delete this.transfers[t3]);
            const n3 = [];
            for (const r4 of this.sdoServers) (r4.deviceId !== e3 || t3 && t3 !== r4.cobIdRx) && n3.push(r4);
            this.sdoServers = n3;
          }
          _uploadStart(e3) {
            const t3 = Buffer.alloc(8);
            t3.writeUInt16LE(e3.index, 1), t3.writeUInt8(e3.subIndex, 3), t3.writeUInt8(u.UPLOAD_INITIATE << 5), this.send(e3.cobId, t3);
          }
          _uploadInitiate(e3, t3) {
            if (2 & t3[0]) {
              const r3 = 1 & t3[0] ? 4 - (t3[0] >> 2 & 3) : 4;
              e3.resolve(t3.slice(4, 4 + r3));
            } else {
              const r3 = Buffer.alloc(8);
              r3.writeUInt8(u.UPLOAD_SEGMENT << 5), 1 & t3[0] && (e3.size = t3.readUInt32LE(4)), e3.refresh(), this.send(e3.cobId, r3);
            }
          }
          _uploadSegment(e3, t3) {
            if (!e3.active) return;
            if ((16 & t3[0]) != e3.toggle << 4) return void this._abortTransfer(e3, o.TOGGLE_BIT);
            const r3 = 7 - (t3[0] >> 1 & 7), n3 = t3.slice(1, r3 + 1), s3 = e3.data.length + r3, i3 = Buffer.concat([e3.data, n3], s3);
            if (1 & t3[0]) {
              if (e3.size != s3) return void this._abortTransfer(e3, o.BAD_LENGTH);
              e3.resolve(i3);
            } else {
              e3.toggle ^= 1, e3.data = i3, e3.refresh();
              const t4 = Buffer.alloc(8), r4 = u.UPLOAD_SEGMENT << 5 | e3.toggle << 4;
              t4.writeUInt8(r4), this.send(e3.cobId, t4);
            }
          }
          _downloadStart(e3) {
            const t3 = Buffer.alloc(8);
            t3.writeUInt16LE(e3.index, 1), t3.writeUInt8(e3.subIndex, 3);
            const r3 = e3.data.length;
            if (r3 > 4) {
              const e4 = u.DOWNLOAD_INITIATE << 5 | 1;
              t3.writeUInt8(e4), t3.writeUInt32LE(r3, 4);
            } else {
              const n3 = u.DOWNLOAD_INITIATE << 5 | 4 - r3 << 2 | 3;
              t3.writeUInt8(n3), e3.data.copy(t3, 4);
            }
            this.send(e3.cobId, t3);
          }
          _downloadInitiate(e3) {
            if (e3.size <= 4) return void e3.resolve();
            const t3 = Buffer.alloc(8);
            e3.size = Math.min(7, e3.data.length), e3.data.copy(t3, 1, 0, e3.size), e3.refresh();
            let r3 = u.DOWNLOAD_SEGMENT << 5 | 7 - e3.size << 1;
            e3.data.length == e3.size && (r3 |= 1), t3.writeUInt8(r3), this.send(e3.cobId, t3);
          }
          _downloadSegment(e3, t3) {
            if (!e3.active) return;
            if ((16 & t3[0]) != e3.toggle << 4) return void this._abortTransfer(e3, o.TOGGLE_BIT);
            if (e3.size == e3.data.length) return void e3.resolve();
            const r3 = Buffer.alloc(8), n3 = Math.min(7, e3.data.length - e3.size);
            e3.data.copy(r3, 1, e3.size, e3.size + n3), e3.toggle ^= 1, e3.size += n3, e3.refresh();
            let s3 = u.DOWNLOAD_SEGMENT << 5 | e3.toggle << 4 | 7 - n3 << 1;
            e3.size == e3.data.length && (s3 |= 1), r3.writeUInt8(s3), this.send(e3.cobId, r3);
          }
          _blockDownloadStart(e3) {
            const t3 = Buffer.alloc(8);
            t3.writeUInt16LE(e3.index, 1), t3.writeUInt8(e3.subIndex, 3);
            const r3 = 6 | u.BLOCK_DOWNLOAD << 5;
            t3.writeUInt8(r3), t3.writeUInt32LE(e3.data.length, 4), this.send(e3.cobId, t3);
          }
          _blockDownloadProcess(e3) {
            if (!e3.active) return;
            const t3 = Buffer.alloc(8), r3 = 7 * (e3.blockSequence + e3.blockCount * e3.blockSize);
            t3[0] = ++e3.blockSequence, r3 + 7 >= e3.data.length && (t3[0] |= 128, e3.blockFinished = true), e3.data.copy(t3, 1, r3, r3 + 7), e3.refresh(), !e3.blockFinished && e3.blockSequence < e3.blockSize && (0 === e3.blockInterval ? setImmediate(() => this._blockDownloadProcess(e3)) : setTimeout(() => this._blockDownloadProcess(e3), e3.blockInterval || 1)), this.send(e3.cobId, t3);
          }
          _blockDownloadInitiate(e3, t3) {
            e3.blockCrc = !!(4 & t3[0]), e3.blockSize = t3[4], e3.blockCount = 0, e3.blockSequence = 0, e3.blockFinished = false, e3.blockSize < 1 || e3.blockSize > 127 ? this._abortTransfer(e3, o.BAD_BLOCK_SIZE) : this._blockDownloadProcess(e3);
          }
          _blockDownloadConfirm(e3, t3) {
            if (t3[1] === e3.blockSequence && (e3.blockCount += 1, e3.blockSequence = 0, e3.blockFinished)) {
              const t4 = Buffer.alloc(8);
              let r3 = u.BLOCK_DOWNLOAD << 5 | 1;
              const n3 = e3.data.length % 7;
              if (n3 && (r3 |= 7 - n3 << 2), t4.writeUInt8(r3), e3.blockCrc) {
                const r4 = f(e3.data);
                t4.writeUInt16LE(r4, 1);
              }
              return e3.refresh(), void this.send(e3.cobId, t4);
            }
            e3.blockSize = t3[2], e3.blockSize < 1 || e3.blockSize > 127 ? this._abortTransfer(e3, o.BAD_BLOCK_SIZE) : this._blockDownloadProcess(e3);
          }
          _blockDownloadEnd(e3) {
            e3.resolve();
          }
          _blockUploadStart(e3) {
            const t3 = Buffer.alloc(8);
            t3.writeUInt16LE(e3.index, 1), t3.writeUInt8(e3.subIndex, 3);
            const r3 = u.BLOCK_UPLOAD << 5 | 4;
            t3.writeUInt8(r3), t3.writeUInt16LE(this.blockSize, 4), this.send(e3.cobId, t3);
          }
          _blockUpload(e3, t3) {
            if (e3.blockFinished) {
              const r3 = t3[0] >> 2 & 7;
              if (r3) {
                const t4 = e3.data.length - r3;
                e3.data = e3.data.slice(0, t4);
              }
              if (e3.data.length < e3.size) return void this._abortTransfer(e3, o.DATA_SHORT);
              if (e3.data.length > e3.size) return void this._abortTransfer(e3, o.DATA_LONG);
              if (e3.blockCrc && t3.readUInt16LE(1) !== f(e3.data)) return void this._abortTransfer(e3, o.BAD_BLOCK_CRC);
              const n3 = u.BLOCK_UPLOAD << 5 | 1, s3 = Buffer.alloc(8);
              s3.writeUInt8(n3), this.send(e3.cobId, s3), e3.resolve(e3.data);
            } else {
              e3.index = t3.readUInt16LE(1), e3.subIndex = t3.readUInt8(3), e3.size = t3.readUInt32LE(4), e3.data = Buffer.alloc(0), e3.blockTransfer = true, e3.blockSequence = 0, e3.blockFinished = false, e3.blockCrc = !!(4 & t3[0]), e3.refresh();
              const r3 = u.BLOCK_UPLOAD << 5 | 3, n3 = Buffer.alloc(8);
              n3.writeUInt8(r3), this.send(e3.cobId, n3);
            }
          }
          _abortTransfer(e3, t3) {
            const r3 = Buffer.alloc(8);
            r3.writeUInt8(128), r3.writeUInt16LE(e3.index, 1), r3.writeUInt8(e3.subIndex, 3), r3.writeUInt32LE(t3, 4), this.send(e3.cobId, r3), e3.reject(t3);
          }
        } };
      }, 269(e2, t2, r2) {
        const n2 = r2(371), { DataObject: s2, Eds: i2 } = r2(800), { AccessType: a } = r2(727), { SdoCode: o, SdoTransfer: c, ClientCommand: u, ServerCommand: l } = r2(135), f = r2(786), d = r2(463), { deprecate: h } = r2(23);
        e2.exports = { SdoServer: class extends n2 {
          constructor(e3) {
            super(e3), this.transfers = {}, this._blockSize = 127, this._blockInterval = null;
          }
          get blockSize() {
            return this._blockSize;
          }
          get blockInterval() {
            return this._blockInterval;
          }
          setBlockSize(e3) {
            if (e3 < 1 || e3 > 127) throw RangeError("blockSize must be in range [1-127]");
            this._blockSize = e3;
          }
          setBlockInterval(e3) {
            if (e3 < 0) throw RangeError("blockInterval must be positive or zero");
            this._blockInterval = e3;
          }
          start() {
            if (!this.started) {
              this.transfers = {};
              for (const e3 of this.eds.getSdoServerParameters()) this._addClient(e3);
              this.addEdsCallback("newSdoClient", (e3) => this._addClient(e3)), this.addEdsCallback("removeSdoClient", (e3) => this._removeClient(e3)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newSdoClient"), this.removeEdsCallback("removeSdoClient");
              for (const e3 of this.eds.getSdoServerParameters()) this._removeClient(e3);
              super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            const r3 = this.transfers[e3];
            if (void 0 !== r3) if (r3.blockTransfer) {
              if ((127 & t3[0]) === r3.blockSequence + 1 && (r3.data = Buffer.concat([r3.data, t3.slice(1)]), r3.blockSequence++, 128 & t3[0] && (r3.blockFinished = true, r3.blockTransfer = false)), r3.blockSequence > 127) return void this._abortTransfer(r3, o.BAD_BLOCK_SEQUENCE);
              if (r3.refresh(), r3.blockFinished || r3.blockSequence == this.blockSize) {
                const e4 = l.BLOCK_DOWNLOAD << 5 | 2, t4 = Buffer.alloc(8);
                t4.writeUInt8(e4), t4.writeInt8(r3.blockSequence, 1), t4.writeUInt8(this.blockSize, 2), r3.blockSequence = 0, this.send(r3.cobId, t4);
              }
            } else switch (t3[0] >> 5) {
              case u.DOWNLOAD_SEGMENT:
                this._downloadSegment(r3, t3);
                break;
              case u.DOWNLOAD_INITIATE:
                this._downloadInitiate(r3, t3);
                break;
              case u.UPLOAD_INITIATE:
                this._uploadInitiate(r3, t3);
                break;
              case u.UPLOAD_SEGMENT:
                this._uploadSegment(r3, t3);
                break;
              case u.ABORT:
                r3.reject();
                break;
              case u.BLOCK_UPLOAD:
                switch (3 & t3[0]) {
                  case 0:
                    this._blockUploadInitiate(r3, t3);
                    break;
                  case 1:
                    this._blockUploadEnd(r3);
                    break;
                  case 2:
                    this._blockUploadConfirm(r3, t3);
                    break;
                  case 3:
                    this._blockUploadProcess(r3);
                }
                break;
              case u.BLOCK_DOWNLOAD:
                this._blockDownload(r3, t3);
                break;
              default:
                this._abortTransfer(r3, o.BAD_COMMAND);
            }
          }
          _addClient({ cobIdTx: e3, cobIdRx: t3 }) {
            this.transfers[t3] = new c({ cobId: e3 });
          }
          _removeClient({ cobIdRx: e3 }) {
            const t3 = this.transfers[e3];
            t3 && (t3.active && this._abortTransfer(t3, o.DEVICE_STATE), delete this.transfers[e3]);
          }
          _downloadInitiate(e3, t3) {
            e3.index = t3.readUInt16LE(1), e3.subIndex = t3.readUInt8(3);
            const r3 = Buffer.alloc(8);
            if (2 & t3[0]) {
              let n3 = this.eds.getEntry(e3.index);
              if (void 0 === n3) return void this._abortTransfer(e3, o.OBJECT_UNDEFINED);
              if (n3.subNumber > 0 && (n3 = n3[e3.subIndex], void 0 === n3)) return void this._abortTransfer(e3, o.BAD_SUB_INDEX);
              if (n3.accessType == a.CONSTANT || n3.accessType == a.READ_ONLY) return void this._abortTransfer(e3, o.READ_ONLY);
              const s3 = 1 & t3[0] ? 4 - (t3[0] >> 2 & 3) : 4, i3 = Buffer.alloc(s3);
              t3.copy(i3, 0, 4, s3 + 4);
              const c2 = d(i3, n3.dataType);
              if (void 0 !== n3.highLimit && c2 > n3.highLimit) return void this._abortTransfer(e3, o.VALUE_HIGH);
              if (void 0 !== n3.lowLimit && c2 < n3.lowLimit) return void this._abortTransfer(e3, o.VALUE_LOW);
              n3.raw = i3, r3.writeUInt8(l.DOWNLOAD_INITIATE << 5), r3.writeUInt16LE(e3.index, 1), r3.writeUInt8(e3.subIndex, 3);
            } else e3.data = Buffer.alloc(0), e3.size = 0, e3.toggle = 0, e3.start(), r3.writeUInt8(l.DOWNLOAD_INITIATE << 5), r3.writeUInt16LE(e3.index, 1), r3.writeUInt8(e3.subIndex, 3);
            this.send(e3.cobId, r3);
          }
          _uploadInitiate(e3, t3) {
            e3.index = t3.readUInt16LE(1), e3.subIndex = t3.readUInt8(3);
            let r3 = this.eds.getEntry(e3.index);
            if (void 0 === r3) return void this._abortTransfer(e3, o.OBJECT_UNDEFINED);
            if (r3.subNumber > 0 && (r3 = r3[e3.subIndex], void 0 === r3)) return void this._abortTransfer(e3, o.BAD_SUB_INDEX);
            if (r3.accessType == a.WRITE_ONLY) return void this._abortTransfer(e3, o.WRITE_ONLY);
            const n3 = Buffer.alloc(8);
            if (r3.size <= 4) {
              const t4 = l.UPLOAD_INITIATE << 5 | 4 - r3.size << 2 | 2;
              n3.writeUInt8(t4, 0), n3.writeUInt16LE(e3.index, 1), n3.writeUInt8(e3.subIndex, 3), r3.raw.copy(n3, 4), r3.size < 4 && (n3[0] |= 4 - r3.size << 2 | 1);
            } else {
              e3.data = Buffer.from(r3.raw), e3.size = 0, e3.toggle = 0, e3.start();
              const t4 = l.UPLOAD_INITIATE << 5 | 1;
              n3.writeUInt8(t4, 0), n3.writeUInt16LE(e3.index, 1), n3.writeUInt8(e3.subIndex, 3), n3.writeUInt32LE(e3.data.length, 4);
            }
            this.send(e3.cobId, n3);
          }
          _uploadSegment(e3, t3) {
            if ((16 & t3[0]) != e3.toggle << 4) return void this._abortTransfer(e3, o.TOGGLE_BIT);
            const r3 = Buffer.alloc(8);
            let n3 = Math.min(7, e3.data.length - e3.size);
            e3.data.copy(r3, 1, e3.size, e3.size + n3);
            let s3 = e3.toggle << 4 | 7 - n3 << 1;
            e3.size == e3.data.length && (s3 |= 1, e3.resolve()), r3.writeUInt8(s3, 0), e3.toggle ^= 1, e3.size += n3, e3.refresh(), this.send(e3.cobId, r3);
          }
          _downloadSegment(e3, t3) {
            if ((16 & t3[0]) != e3.toggle << 4) return void this._abortTransfer(e3, o.TOGGLE_BIT);
            const r3 = 7 - (t3[0] >> 1 & 7), n3 = t3.slice(1, r3 + 1), s3 = e3.data.length + r3;
            if (e3.data = Buffer.concat([e3.data, n3], s3), 1 & t3[0]) {
              let t4 = this.eds.getEntry(e3.index);
              if (void 0 === t4) return void this._abortTransfer(e3, o.OBJECT_UNDEFINED);
              if (t4.subNumber > 0 && (t4 = t4[e3.subIndex], void 0 === t4)) return void this._abortTransfer(e3, o.BAD_SUB_INDEX);
              if (t4.accessType == a.CONSTANT || t4.accessType == a.READ_ONLY) return void this._abortTransfer(e3, o.READ_ONLY);
              const r4 = Buffer.alloc(s3);
              e3.data.copy(r4);
              const n4 = d(r4, t4.dataType);
              if (void 0 !== t4.highLimit && n4 > t4.highLimit) return void this._abortTransfer(e3, o.VALUE_HIGH);
              if (void 0 !== t4.lowLimit && n4 < t4.lowLimit) return void this._abortTransfer(e3, o.VALUE_LOW);
              t4.raw = r4, e3.resolve();
            }
            const i3 = Buffer.alloc(8), c2 = l.DOWNLOAD_SEGMENT << 5 | e3.toggle << 4;
            i3.writeUInt8(c2), e3.toggle ^= 1, e3.refresh(), this.send(e3.cobId, i3);
          }
          _blockUploadProcess(e3) {
            if (!e3.active) return;
            const t3 = Buffer.alloc(8), r3 = 7 * (e3.blockSequence + e3.blockCount * e3.blockSize);
            t3[0] = ++e3.blockSequence, r3 + 7 >= e3.data.length && (t3[0] |= 128, e3.blockFinished = true), e3.data.copy(t3, 1, r3, r3 + 7), e3.refresh(), !e3.blockFinished && e3.blockSequence < e3.blockSize && (0 === this._blockInterval ? setImmediate(() => this._blockUploadProcess(e3)) : setTimeout(() => this._blockUploadProcess(e3), this._blockInterval || 1)), this.send(e3.cobId, t3);
          }
          _blockUploadInitiate(e3, t3) {
            e3.index = t3.readUInt16LE(1), e3.subIndex = t3.readUInt8(3), e3.blockSize = t3.readUInt32LE(4), e3.blockCrc = !!(4 & t3[0]);
            let r3 = this.eds.getEntry(e3.index);
            if (void 0 === r3) return void this._abortTransfer(e3, o.OBJECT_UNDEFINED);
            if (r3.subNumber > 0 && (r3 = r3[e3.subIndex], void 0 === r3)) return void this._abortTransfer(e3, o.BAD_SUB_INDEX);
            if (r3.accessType == a.WRITE_ONLY) return void this._abortTransfer(e3, o.WRITE_ONLY);
            e3.data = Buffer.from(r3.raw), e3.size = 0, e3.blockCount = 0, e3.blockSequence = 0, e3.blockFinished = false, e3.start();
            const n3 = 6 | l.BLOCK_UPLOAD << 5, s3 = Buffer.alloc(8);
            s3.writeUInt8(n3), s3.writeUInt16LE(e3.index, 1), s3.writeUInt8(e3.subIndex, 3), s3.writeUInt32LE(e3.data.length, 4), this.send(e3.cobId, s3);
          }
          _blockUploadConfirm(e3, t3) {
            if (t3[1] === e3.blockSequence && (e3.blockCount += 1, e3.blockSequence = 0, e3.blockFinished)) {
              const t4 = Buffer.alloc(8);
              let r3 = l.BLOCK_UPLOAD << 5 | 1;
              const n3 = e3.data.length % 7;
              if (n3 && (r3 |= 7 - n3 << 2), t4.writeUInt8(r3), e3.blockCrc) {
                const r4 = f(e3.data);
                t4.writeUInt16LE(r4, 1);
              }
              return e3.refresh(), void this.send(e3.cobId, t4);
            }
            e3.blockSize = t3[2], e3.blockSize < 1 || e3.blockSize > 127 ? this._abortTransfer(e3, o.BAD_BLOCK_SIZE) : this._blockUploadProcess(e3);
          }
          _blockUploadEnd(e3) {
            e3.resolve();
          }
          _blockDownload(e3, t3) {
            if (e3.blockFinished) {
              const r3 = t3[0] >> 2 & 7;
              if (r3) {
                const t4 = e3.data.length - r3;
                e3.data = e3.data.slice(0, t4);
              }
              if (e3.data.length < e3.size) return void this._abortTransfer(e3, o.DATA_SHORT);
              if (e3.data.length > e3.size) return void this._abortTransfer(e3, o.DATA_LONG);
              if (e3.blockCrc && t3.readUInt16LE(1) !== f(e3.data)) return void this._abortTransfer(e3, o.BAD_BLOCK_CRC);
              let n3 = this.eds.getEntry(e3.index);
              if (void 0 === n3) return void this._abortTransfer(e3, o.OBJECT_UNDEFINED);
              if (n3.subNumber > 0 && (n3 = n3[e3.subIndex], void 0 === n3)) return void this._abortTransfer(e3, o.BAD_SUB_INDEX);
              if (n3.accessType == a.CONSTANT || n3.accessType == a.READ_ONLY) return void this._abortTransfer(e3, o.READ_ONLY);
              const s3 = d(e3.data, n3.dataType);
              if (void 0 !== n3.highLimit && s3 > n3.highLimit) return void this._abortTransfer(e3, o.VALUE_HIGH);
              if (void 0 !== n3.lowLimit && s3 < n3.lowLimit) return void this._abortTransfer(e3, o.VALUE_LOW);
              n3.raw = e3.data;
              const i3 = l.BLOCK_DOWNLOAD << 5 | 1, c2 = Buffer.alloc(8);
              c2.writeUInt8(i3), this.send(e3.cobId, c2), e3.resolve();
            } else {
              e3.index = t3.readUInt16LE(1), e3.subIndex = t3.readUInt8(3), e3.size = t3.readUInt32LE(4), e3.data = Buffer.alloc(0), e3.blockTransfer = true, e3.blockSequence = 0, e3.blockFinished = false, e3.blockCrc = !!(4 & t3[0]);
              const r3 = l.BLOCK_DOWNLOAD << 5 | 4, n3 = Buffer.alloc(8);
              n3.writeUInt8(r3), n3.writeUInt16LE(e3.index, 1), n3.writeUInt8(e3.subIndex, 3), n3.writeUInt8(this.blockSize, 4), e3.start(), this.send(e3.cobId, n3);
            }
          }
          _abortTransfer(e3, t3) {
            const r3 = Buffer.alloc(8);
            r3.writeUInt8(128), r3.writeUInt16LE(e3.index, 1), r3.writeUInt8(e3.subIndex, 3), r3.writeUInt32LE(t3, 4), this.send(e3.cobId, r3), e3.reject(t3);
          }
        } };
      }, 632(e2, t2, r2) {
        const n2 = r2(371), { Eds: s2, EdsError: i2 } = r2(800), { deprecate: a } = r2(23);
        e2.exports = { Sync: class extends n2 {
          constructor(e3) {
            super(e3), this.syncCounter = 0, this.syncTimer = null, this._overflow = 0, this._cobId = null, this._generate = false;
          }
          get generate() {
            return this.eds.getSyncGenerationEnable();
          }
          set generate(e3) {
            this.eds.setSyncGenerationEnable(e3);
          }
          get cobId() {
            return this.eds.getSyncCobId();
          }
          set cobId(e3) {
            this.eds.setSyncCobId(e3);
          }
          get cyclePeriod() {
            return this.eds.getSyncCyclePeriod();
          }
          set cyclePeriod(e3) {
            this.eds.setSyncCyclePeriod(e3);
          }
          get overflow() {
            return this.eds.getSyncOverflow();
          }
          set overflow(e3) {
            this.eds.setSyncOverflow(e3);
          }
          write(e3 = null) {
            if (!this._generate) throw new i2("SYNC generation is disabled");
            if (!this._cobId) throw new i2("COB-ID SYNC may not be 0");
            null !== e3 ? this.send(this._cobId, Buffer.from([e3])) : this.send(this._cobId);
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4101);
              e3 && this._addEntry(e3);
              const t3 = this.eds.getEntry(4102);
              t3 && this._addEntry(t3);
              const r3 = this.eds.getEntry(4121);
              r3 && this._addEntry(r3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4101);
              e3 && this._removeEntry(e3);
              const t3 = this.eds.getEntry(4102);
              t3 && this._removeEntry(t3);
              const r3 = this.eds.getEntry(4121);
              r3 && this._removeEntry(r3), super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            this._cobId === e3 && (t3 && (t3 = t3[0]), this.emit("sync", t3));
          }
          _addEntry(e3) {
            switch (e3.index) {
              case 4101:
                this.addUpdateCallback(e3, (e4) => this._parse1005(e4)), this._parse1005(e3);
                break;
              case 4102:
                this.addUpdateCallback(e3, (e4) => this._parse1006(e4)), this._parse1006(e3);
                break;
              case 4121:
                this.addUpdateCallback(e3, (e4) => this._parse1019(e4)), this._parse1019(e3);
            }
          }
          _removeEntry(e3) {
            switch (e3.index) {
              case 4101:
                this.removeUpdateCallback(e3), this._clear1005();
                break;
              case 4102:
                this.removeUpdateCallback(e3), this._clear1006();
                break;
              case 4121:
                this.removeUpdateCallback(e3), this._clear1019();
            }
          }
          _parse1005(e3) {
            const t3 = e3.value, r3 = t3 >> 30 & 1, n3 = 2047 & t3;
            1 & ~(t3 >> 29) ? (this._generate = !!r3, this._cobId = n3) : this._clear1005();
          }
          _clear1005() {
            this._generate = false, this._cobId = null;
          }
          _parse1006(e3) {
            this._clear1006();
            const t3 = e3.value;
            t3 > 0 && (this.syncTimer = setInterval(() => {
              this._generate && this._cobId && (this._overflow > 0 ? (this.syncCounter += 1, this.syncCounter > this._overflow && (this.syncCounter = 1), this.send(this._cobId, Buffer.from([this.syncCounter]))) : this.send(this._cobId, Buffer.alloc(0)));
            }, t3 / 1e3));
          }
          _clear1006() {
            clearInterval(this.syncTimer), this.syncTimer = null;
          }
          _parse1019(e3) {
            this._overflow = e3.value;
          }
          _clear1019() {
            this._overflow = 0;
          }
        } };
      }, 378(e2, t2, r2) {
        const n2 = r2(371), { Eds: s2, EdsError: i2 } = r2(800), { DataType: a } = r2(727), o = r2(463), c = r2(165), { deprecate: u } = r2(23);
        e2.exports = { Time: class extends n2 {
          constructor(e3) {
            super(e3), this._consume = false, this._produce = false, this._cobId = null;
          }
          get produce() {
            return this.eds.getTimeProducerEnable();
          }
          set produce(e3) {
            this.eds.setTimeProducerEnable(e3);
          }
          get consume() {
            return this.eds.getTimeConsumerEnable();
          }
          set consume(e3) {
            this.eds.setTimeConsumerEnable(e3);
          }
          get cobId() {
            return this.eds.getTimeCobId();
          }
          set cobId(e3) {
            this.eds.setTimeCobId(e3);
          }
          write(e3) {
            if (!this._produce) throw new i2("TIME production is disabled");
            if (!this._cobId) throw new i2("COB-ID TIME may not be 0");
            e3 || (e3 = /* @__PURE__ */ new Date()), this.send(this._cobId, c(e3, a.TIME_OF_DAY));
          }
          start() {
            if (!this.started) {
              const e3 = this.eds.getEntry(4114);
              e3 && this._addEntry(e3), this.addEdsCallback("newEntry", (e4) => this._addEntry(e4)), this.addEdsCallback("removeEntry", (e4) => this._removeEntry(e4)), super.start();
            }
          }
          stop() {
            if (this.started) {
              this.removeEdsCallback("newEntry"), this.removeEdsCallback("removeEntry");
              const e3 = this.eds.getEntry(4114);
              e3 && this._removeEntry(e3), super.stop();
            }
          }
          receive({ id: e3, data: t3 }) {
            if (this._consume && this._cobId === e3) {
              const e4 = o(t3, a.TIME_OF_DAY);
              this.emit("time", e4);
            }
          }
          _addEntry(e3) {
            4114 === e3.index && (this.addUpdateCallback(e3, (e4) => this._parse1012(e4)), this._parse1012(e3));
          }
          _removeEntry(e3) {
            4114 === e3.index && (this.removeUpdateCallback(e3), this._clear1012());
          }
          _parse1012(e3) {
            const t3 = e3.value, r3 = t3 >> 31 & 1, n3 = t3 >> 30 & 1, s3 = 2047 & t3;
            1 & ~(t3 >> 29) ? (this._consume = !!r3, this._produce = !!n3, this._cobId = s3) : this._clear1012();
          }
          _clear1012() {
            this._consume = false, this._produce = false, this._cobId = null;
          }
        } };
      }, 727(e2, t2) {
        e2.exports = { ObjectType: { NULL: 0, DOMAIN: 2, DEFTYPE: 5, DEFSTRUCT: 6, VAR: 7, ARRAY: 8, RECORD: 9 }, AccessType: { READ_WRITE: "rw", WRITE_ONLY: "wo", READ_ONLY: "ro", CONSTANT: "const" }, DataType: { BOOLEAN: 1, INTEGER8: 2, INTEGER16: 3, INTEGER32: 4, UNSIGNED8: 5, UNSIGNED16: 6, UNSIGNED32: 7, REAL32: 8, VISIBLE_STRING: 9, OCTET_STRING: 10, UNICODE_STRING: 11, TIME_OF_DAY: 12, TIME_DIFFERENCE: 13, DOMAIN: 15, REAL64: 17, INTEGER24: 16, INTEGER40: 18, INTEGER48: 19, INTEGER56: 20, INTEGER64: 21, UNSIGNED24: 22, UNSIGNED40: 24, UNSIGNED48: 25, UNSIGNED56: 26, UNSIGNED64: 27, PDO_PARAMETER: 32, PDO_MAPPING: 33, SDO_PARAMETER: 34, IDENTITY: 35 } };
      }, 982(e2) {
        "use strict";
        e2.exports = require("crypto");
      }, 434(e2) {
        "use strict";
        e2.exports = require("events");
      }, 896(e2) {
        "use strict";
        e2.exports = require("fs");
      }, 857(e2) {
        "use strict";
        e2.exports = require("os");
      }, 928(e2) {
        "use strict";
        e2.exports = require("path");
      }, 23(e2) {
        "use strict";
        e2.exports = require("util");
      }, 167(e2) {
        "use strict";
        e2.exports = require("worker_threads");
      } }, t = {};
      function r(n2) {
        var s2 = t[n2];
        if (void 0 !== s2) return s2.exports;
        var i2 = t[n2] = { id: n2, loaded: false, exports: {} };
        return e[n2].call(i2.exports, i2, i2.exports, r), i2.loaded = true, i2.exports;
      }
      r.n = (e2) => {
        var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return r.d(t2, { a: t2 }), t2;
      }, r.d = (e2, t2) => {
        for (var n2 in t2) r.o(t2, n2) && !r.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
      }, r.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, r.nmd = (e2) => (e2.paths = [], e2.children || (e2.children = []), e2), r.p = "";
      var n = {};
      (() => {
        "use strict";
        r.r(n), r.d(n, { CAN_ADDR_FORMAT: () => e2.tQ, CAN_ADDR_TYPE: () => e2.A8, CAN_ID_TYPE: () => e2.aU, CMAC: () => p, CRC: () => i2.CRC, DiagJob: () => e2.bJ, DiagRequest: () => e2.tH, DiagResponse: () => e2.Bu, HexMemoryMap: () => k, LinChecksumType: () => e2.re, LinDirection: () => e2.b3, LinMode: () => e2.Bz, RegisterEthVirtualEntity: () => e2.Ny, S19MemoryMap: () => x, SecureAccessDll: () => s2, SerialPortClient: () => e2.ZS, SomeipMessageRequest: () => e2.sT, SomeipMessageResponse: () => e2._G, Util: () => e2.J0, UtilClass: () => e2.FN, after: () => e2.Pl, afterEach: () => e2.Km, assert: () => e2.vA, before: () => e2.gM, beforeEach: () => e2.rK, canopen: () => B, describe: () => e2.q0, fingerprintFromCanMessages: () => w, fuzz: () => O, getFrameFromDB: () => e2.cG, getLinCheckSum: () => e2.bH, getPID: () => e2.od, getSignal: () => e2.V1, getVar: () => e2.sd, linBaudRateCtrl: () => e2.Nz, linPowerCtrl: () => e2.Qb, linStartScheduler: () => e2.Ln, linStopScheduler: () => e2.ZE, output: () => e2.CG, registerWorker: () => e2.U6, reporter: () => e2.YX, runUdsSeq: () => e2.hf, setPwmDuty: () => e2.nr, setSignal: () => e2.fw, setTxPending: () => e2.gc, setVar: () => e2.OG, setVars: () => e2.TX, stopUdsSeq: () => e2.w5, test: () => e2.t6, workerEmit: () => e2.m4 });
        var e2 = r(531);
        let t2;
        t2 = r(80);
        class s2 {
          _ref;
          constructor(e3) {
            if (this._ref = new t2.SeedKey(), this.loadDll(e3), !this._ref.IsLoaded()) throw new Error("Failed to load DLL");
          }
          GenerateKeyExOpt(e3, r2, n2, s3, i3) {
            const a2 = new t2.UINT8_ARRAY(e3.length);
            for (let t3 = 0; t3 < e3.length; t3++) a2.setitem(t3, e3.readUInt8(t3));
            const o2 = new t2.INT8_ARRAY(n2.length);
            for (let e4 = 0; e4 < n2.length; e4++) o2.setitem(e4, n2.readInt8(e4));
            const c2 = new t2.INT8_ARRAY(s3.length);
            for (let e4 = 0; e4 < s3.length; e4++) c2.setitem(e4, s3.readInt8(e4));
            const u2 = new t2.UINT8_ARRAY(i3.length);
            for (let e4 = 0; e4 < i3.length; e4++) u2.setitem(e4, i3.readUInt8(e4));
            const l2 = new t2.UINT32_PTR();
            l2.assign(i3.length);
            const f2 = this._ref.GenerateKeyExOpt(a2.cast(), e3.length, r2, o2.cast(), c2.cast(), u2.cast(), i3.length, l2.cast());
            if (0 == f2) {
              const e4 = Buffer.alloc(l2.value());
              for (let t3 = 0; t3 < l2.value(); t3++) e4[t3] = u2.getitem(t3);
              return e4;
            }
            throw new Error(`GenerateKeyExOpt failed with error code ${f2}`);
          }
          GenerateKeyEx(e3, r2, n2, s3) {
            const i3 = new t2.UINT8_ARRAY(e3.length);
            for (let t3 = 0; t3 < e3.length; t3++) i3.setitem(t3, e3.readUInt8(t3));
            const a2 = new t2.INT8_ARRAY(n2.length);
            for (let e4 = 0; e4 < n2.length; e4++) a2.setitem(e4, n2.readInt8(e4));
            const o2 = new t2.UINT8_ARRAY(s3.length);
            for (let e4 = 0; e4 < s3.length; e4++) o2.setitem(e4, s3.readUInt8(e4));
            const c2 = new t2.UINT32_PTR();
            c2.assign(s3.length);
            const u2 = this._ref.GenerateKeyEx(i3.cast(), e3.length, r2, a2.cast(), o2.cast(), s3.length, c2.cast());
            if (0 == u2) {
              const e4 = Buffer.alloc(c2.value());
              for (let t3 = 0; t3 < c2.value(); t3++) e4[t3] = o2.getitem(t3);
              return e4;
            }
            throw new Error(`GenerateKeyEx failed with error code ${u2}`);
          }
          loadDll(e3) {
            this._ref.LoadDLL(e3);
          }
        }
        var i2 = r(229), a = r(982), o = r.n(a);
        const c = Buffer.from("00000000000000000000000000000000", "hex"), u = Buffer.from("00000000000000000000000000000087", "hex"), l = 16;
        function f(e3) {
          const t3 = Buffer.alloc(e3.length), r2 = e3.length - 1;
          for (let n2 = 0; n2 < r2; n2++) t3[n2] = e3[n2] << 1, 128 & e3[n2 + 1] && (t3[n2] += 1);
          return t3[r2] = e3[r2] << 1, t3;
        }
        function d(e3, t3) {
          const r2 = Math.min(e3.length, t3.length), n2 = Buffer.alloc(r2);
          for (let s3 = 0; s3 < r2; s3++) n2[s3] = e3[s3] ^ t3[s3];
          return n2;
        }
        function h(e3, t3) {
          const r2 = { 16: "aes-128-cbc", 24: "aes-192-cbc", 32: "aes-256-cbc" };
          if (!r2[e3.length]) throw new Error("Keys must be 128, 192, or 256 bits in length.");
          const n2 = o().createCipheriv(r2[e3.length], e3, c), s3 = n2.update(t3);
          return n2.final(), s3;
        }
        function p(e3, t3) {
          const r2 = function(e4) {
            const t4 = h(e4, c);
            let r3 = f(t4);
            128 & t4[0] && (r3 = d(r3, u));
            let n3 = f(r3);
            return 128 & r3[0] && (n3 = d(n3, u)), { subkey1: r3, subkey2: n3 };
          }(e3);
          let n2, s3, i3, a2 = Math.ceil(t3.length / l);
          0 === a2 ? (a2 = 1, n2 = false) : n2 = t3.length % l === 0, i3 = a2 - 1, s3 = n2 ? d(m(t3, i3), r2.subkey1) : d(function(e4, t4) {
            const r3 = Buffer.alloc(l), n3 = t4 * l, s4 = e4.length;
            return r3.fill(0), e4.copy(r3, 0, n3, s4), r3[s4 - n3] = 128, r3;
          }(t3, i3), r2.subkey2);
          let o2, p2 = Buffer.from("00000000000000000000000000000000", "hex");
          for (let r3 = 0; r3 < i3; r3++) o2 = d(p2, m(t3, r3)), p2 = h(e3, o2);
          return o2 = d(s3, p2), h(e3, o2);
        }
        function m(e3, t3) {
          const r2 = Buffer.alloc(l), n2 = t3 * l, s3 = n2 + l;
          return e3.copy(r2, 0, n2, s3), r2;
        }
        var v = r(216);
        const b = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], g = ["0", "1", "5", "9"], y = ["0", "9"], _ = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], E = ["0", "1", "9", "A", "B", "F"], I = ["0", "F"];
        function w(e3, t3) {
          const r2 = {};
          for (const t4 of e3) {
            if (!t4.data || Array.isArray(t4.data) && 0 === t4.data.length) continue;
            const e4 = t4.msgType?.idType === v.aU.EXTENDED ? t4.id.toString(16).toUpperCase().padStart(8, "0") : t4.id.toString(16).toUpperCase().padStart(3, "0"), n2 = (Buffer.isBuffer(t4.data) ? t4.data : Buffer.from(t4.data)).toString("hex").toUpperCase();
            n2.length < 2 || (e4 in r2 ? r2[e4].length < n2.length && (r2[e4] = "".padStart(n2.length, "0")) : r2[e4] = "".padStart(n2.length, "0"));
          }
          for (const t4 of e3) {
            if (!t4.data || Array.isArray(t4.data) && 0 === t4.data.length) continue;
            const e4 = t4.msgType?.idType === v.aU.EXTENDED ? t4.id.toString(16).toUpperCase().padStart(8, "0") : t4.id.toString(16).toUpperCase().padStart(3, "0"), n2 = (Buffer.isBuffer(t4.data) ? t4.data : Buffer.from(t4.data)).toString("hex").toUpperCase();
            if (n2.length < 2) continue;
            const s3 = [...r2[e4]];
            for (let e5 = 0; e5 < n2.length; e5++) {
              const t5 = n2[e5];
              "0" !== t5 && (b.includes(t5) ? "H" !== s3[e5] && (s3[e5] = "N") : s3[e5] = "H");
            }
            r2[e4] = s3.join("");
          }
          return { description: t3, date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "."), version: "2", fingerprints: r2 };
        }
        function T(e3) {
          const t3 = [];
          for (let r2 = 0; r2 < e3.length; r2 += 2) t3.push(parseInt(e3.slice(r2, r2 + 2), 16));
          return Buffer.from(t3);
        }
        function S(e3, t3) {
          let r2 = 0;
          for (const t4 of e3) "H" === t4 ? r2 += 2 : "N" === t4 && (r2 += 1);
          const n2 = [];
          for (const s3 of e3) if ("0" === s3) n2.push(["0"]);
          else if ("N" === s3) t3.adaptive && r2 > 9 ? n2.push(y) : t3.adaptive && r2 > 5 || t3.quick ? n2.push(g) : t3.superQuick ? n2.push(y) : n2.push(b);
          else {
            if ("H" !== s3) throw new Error(`Unknown template char: ${s3}`);
            t3.adaptive && r2 > 9 ? n2.push(I) : t3.adaptive && r2 > 5 || t3.quick ? n2.push(E) : t3.superQuick ? n2.push(I) : n2.push(_);
          }
          return n2;
        }
        function N(e3) {
          return e3.reduce((e4, t3) => e4 * t3.length, 1);
        }
        function* R(e3) {
          const t3 = e3.length, r2 = new Array(t3).fill(0);
          for (; ; ) {
            yield e3.map((e4, t4) => e4[r2[t4]]).join("");
            let n2 = t3 - 1;
            for (; n2 >= 0 && (r2[n2]++, !(r2[n2] < e3[n2].length)); ) r2[n2] = 0, n2--;
            if (n2 < 0) break;
          }
        }
        async function* O(t3) {
          const r2 = "fingerprints" in (n2 = t3.fingerprint) && "object" == typeof n2.fingerprints ? n2.fingerprints : n2;
          var n2;
          let s3 = r2;
          if (t3.canId) {
            if (!(t3.canId in r2)) throw new Error(`CAN ID ${t3.canId} not in fingerprint`);
            s3 = { [t3.canId]: r2[t3.canId] };
          }
          const i3 = t3.timing ?? 20, a2 = Object.entries(s3);
          let o2 = false;
          for (let r3 = 0; r3 < a2.length && !o2; r3++) {
            const [n3, s4] = a2[r3], c2 = S(s4, { quick: t3.quick, superQuick: t3.superQuick, adaptive: t3.adaptive }), u2 = N(c2);
            await t3.onCanIdStart?.(n3, s4);
            let l2 = 0;
            for (const s5 of R(c2)) {
              if (o2) break;
              const c3 = T(s5), f2 = { id: parseInt(n3, 16), dir: "OUT", data: c3, msgType: { idType: 8 === n3.length ? v.aU.EXTENDED : v.aU.STANDARD, brs: false, canfd: false, remote: false } }, d2 = { canId: n3, payload: s5, frame: f2, frameIndex: l2, totalFramesInCanId: u2, canIdIndex: r3, totalCanIds: a2.length };
              false !== await t3.onBeforeSend?.(d2) ? (await (0, e2.CG)(f2), await new Promise((e3) => setTimeout(e3, i3)), false === await t3.onAfterSend?.(d2) && (o2 = true), l2++, yield { canId: n3, payload: s5, frame: f2 }) : l2++;
            }
            await t3.onCanIdEnd?.(n3, l2);
          }
        }
        const A = /:([0-9A-Fa-f]{8,})([0-9A-Fa-f]{2})(?:\r\n|\r|\n|)/g;
        function D(e3) {
          return 255 & -e3.reduce((e4, t3) => e4 + t3, 0);
        }
        function C(e3, t3) {
          return 255 & -(e3.reduce((e4, t4) => e4 + t4, 0) + t3.reduce((e4, t4) => e4 + t4, 0));
        }
        function L(e3) {
          return e3.toString(16).toUpperCase().padStart(2, "0");
        }
        function U(e3, t3 = 10) {
          return parseInt(e3, t3) >>> 0 & 4294967295;
        }
        Number.isInteger = Number.isInteger || function(e3) {
          return "number" == typeof e3 && isFinite(e3) && Math.floor(e3) === e3;
        };
        class k {
          _blocks;
          constructor(e3) {
            if (this._blocks = /* @__PURE__ */ new Map(), e3 && Symbol.iterator in e3) for (const t3 of e3) {
              if (!Array.isArray(t3) || 2 !== t3.length) throw new Error("First parameter to HexMemoryMap constructor must be an iterable of [addr, bytes] or undefined");
              this.set(t3[0], t3[1]);
            }
            else if ("object" == typeof e3) {
              if (e3) {
                const t3 = Object.keys(e3);
                for (const r2 of t3) this.set(U(r2), e3[r2]);
              }
            } else if (null != e3) throw new Error("First parameter to HexMemoryMap constructor must be an iterable of [addr, bytes] or undefined");
          }
          set(e3, t3) {
            if (!Number.isInteger(e3)) throw new Error("Address passed to HexMemoryMap is not an integer");
            if (e3 < 0) throw new Error("Address passed to HexMemoryMap is negative");
            if (!(t3 instanceof Buffer)) throw new Error("Bytes passed to HexMemoryMap are not an Buffer");
            return this._blocks.set(e3, t3);
          }
          get(e3) {
            return this._blocks.get(e3);
          }
          clear() {
            return this._blocks.clear();
          }
          delete(e3) {
            return this._blocks.delete(e3);
          }
          entries() {
            return this._blocks.entries();
          }
          forEach(e3, t3) {
            return this._blocks.forEach(e3, t3);
          }
          has(e3) {
            return this._blocks.has(e3);
          }
          keys() {
            return this._blocks.keys();
          }
          values() {
            return this._blocks.values();
          }
          get size() {
            return this._blocks.size;
          }
          [Symbol.iterator]() {
            return this._blocks[Symbol.iterator]();
          }
          static fromHex(e3, t3 = 1 / 0) {
            const r2 = new k();
            let n2, s3 = 0, i3 = 0, a2 = 0;
            for (A.lastIndex = 0; null !== (n2 = A.exec(e3)); ) {
              if (i3++, s3 !== n2.index) throw new Error("Malformed hex file: Could not parse between characters " + s3 + " and " + n2.index + ' ("' + e3.substring(s3, Math.min(n2.index, s3 + 16)).trim() + '")');
              s3 = A.lastIndex;
              const [, o2, c2] = n2, u2 = Buffer.from(o2.match(/[\da-f]{2}/gi)?.map((e4) => U(e4, 16)) || []), l2 = u2[0];
              if (l2 + 4 !== u2.length) throw new Error("Mismatched record length at record " + i3 + " (" + n2[0].trim() + "), expected " + l2 + " data bytes but actual length is " + (u2.length - 4));
              const f2 = D(u2);
              if (U(c2, 16) !== f2) throw new Error("Checksum failed at record " + i3 + " (" + n2[0].trim() + "), should be " + f2.toString(16));
              const d2 = (u2[1] << 8) + u2[2], h2 = u2[3], p2 = u2.subarray(4);
              if (0 === h2) {
                if (r2.has(a2 + d2)) throw new Error("Duplicated data at record " + i3 + " (" + n2[0].trim() + ")");
                if (d2 + p2.length > 65536) throw new Error("Data at record " + i3 + " (" + n2[0].trim() + ") wraps over 0xFFFF. This would trigger ambiguous behaviour. Please restructure your data so that for every record the data offset plus the data length do not exceed 0xFFFF.");
                r2.set(a2 + d2, p2);
              } else {
                if (0 !== d2) throw new Error("Record " + i3 + " (" + n2[0].trim() + ") must have 0000 as data offset.");
                switch (h2) {
                  case 1:
                    if (s3 !== e3.length) throw new Error("There is data after an EOF record at record " + i3);
                    return r2.join(t3);
                  case 2:
                    a2 = (p2[0] << 8) + p2[1] << 4 >>> 0;
                    break;
                  case 3:
                  case 5:
                    break;
                  case 4:
                    a2 = (p2[0] << 8) + p2[1] << 16 >>> 0;
                    break;
                  default:
                    throw new Error("Invalid record type 0x" + L(h2) + " at record " + i3 + " (should be between 0x00 and 0x05)");
                }
              }
            }
            throw i3 ? new Error("No EOF record at end of file") : new Error("Malformed .hex file, could not parse any registers");
          }
          join(e3 = 1 / 0) {
            const t3 = Array.from(this.keys()).sort((e4, t4) => e4 - t4), r2 = /* @__PURE__ */ new Map();
            let n2 = -1, s3 = -1;
            for (let i4 = 0, a3 = t3.length; i4 < a3; i4++) {
              const a4 = t3[i4], o3 = this.get(t3[i4]).length;
              if (s3 === a4 && s3 - n2 < e3) r2.set(n2, r2.get(n2) + o3), s3 += o3;
              else {
                if (!(s3 <= a4)) throw new Error("Overlapping data around address 0x" + a4.toString(16));
                r2.set(a4, o3), n2 = a4, s3 = a4 + o3;
              }
            }
            const i3 = new k();
            let a2, o2 = -1;
            for (let e4 = 0, n3 = t3.length; e4 < n3; e4++) {
              const n4 = t3[e4];
              r2.has(n4) && (a2 = Buffer.alloc(r2.get(n4)), i3.set(n4, a2), o2 = n4), a2.set(this.get(n4), n4 - o2);
            }
            return i3;
          }
          static overlapHexMemoryMaps(e3) {
            const t3 = /* @__PURE__ */ new Set();
            for (const [, r3] of e3) for (const [e4, n3] of r3) t3.add(e4), t3.add(e4 + n3.length);
            const r2 = Array.from(t3.values()).sort((e4, t4) => e4 - t4), n2 = /* @__PURE__ */ new Map();
            for (let t4 = 0, s3 = r2.length - 1; t4 < s3; t4++) {
              const s4 = r2[t4], i3 = r2[t4 + 1], a2 = [];
              for (const [t5, r3] of e3) {
                const e4 = Array.from(r3.keys()).reduce((e5, t6) => t6 > s4 ? e5 : Math.max(e5, t6), -1);
                if (-1 !== e4) {
                  const n3 = r3.get(e4), o2 = s4 - e4, c2 = i3 - e4;
                  o2 < n3.length && a2.push([t5, n3.subarray(o2, c2)]);
                }
              }
              a2.length && n2.set(s4, a2);
            }
            return n2;
          }
          static flattenOverlaps(e3) {
            return new k(Array.from(e3.entries()).map(([e4, t3]) => [e4, t3[t3.length - 1][1]]));
          }
          paginate(e3 = 1024, t3 = 255) {
            if (e3 <= 0) throw new Error("Page size must be greater than zero");
            const r2 = new k();
            let n2;
            const s3 = Array.from(this.keys()).sort((e4, t4) => e4 - t4);
            for (let i3 = 0, a2 = s3.length; i3 < a2; i3++) {
              const a3 = s3[i3], o2 = this.get(a3), c2 = o2.length, u2 = a3 + c2;
              for (let s4 = a3 - a3 % e3; s4 < u2; s4 += e3) {
                n2 = r2.get(s4), n2 || (n2 = Buffer.alloc(e3), n2.fill(t3), r2.set(s4, n2));
                const i4 = s4 - a3;
                let u3;
                i4 <= 0 ? (u3 = o2.subarray(0, Math.min(e3 + i4, c2)), n2.set(u3, -i4)) : (u3 = o2.subarray(i4, i4 + Math.min(e3, c2 - i4)), n2.set(u3, 0));
              }
            }
            return r2;
          }
          getUint32(e3, t3) {
            const r2 = Array.from(this.keys());
            for (let n2 = 0, s3 = r2.length; n2 < s3; n2++) {
              const s4 = r2[n2], i3 = this.get(s4), a2 = i3.length;
              if (s4 <= e3 && e3 + 4 <= s4 + a2) return new DataView(i3.buffer, e3 - s4, 4).getUint32(0, t3);
            }
          }
          asHexString(e3 = 16) {
            let t3 = 0, r2 = -65536;
            const n2 = [];
            if (e3 <= 0) throw new Error("Size of record must be greater than zero");
            if (e3 > 255) throw new Error("Size of record must be less than 256");
            const s3 = Buffer.alloc(6), i3 = Buffer.alloc(4), a2 = Array.from(this.keys()).sort((e4, t4) => e4 - t4);
            for (let o2 = 0, c2 = a2.length; o2 < c2; o2++) {
              const c3 = a2[o2], u2 = this.get(c3);
              if (!(u2 instanceof Buffer)) throw new Error("Block at offset " + c3 + " is not an Buffer");
              if (c3 < 0) throw new Error("Block at offset " + c3 + " has a negative thus invalid address");
              const l2 = u2.length;
              if (!l2) continue;
              if (c3 > r2 + 65535 && (r2 = c3 - c3 % 65536, t3 = 0, s3[0] = 2, s3[1] = 0, s3[2] = 0, s3[3] = 4, s3[4] = r2 >> 24, s3[5] = r2 >> 16, n2.push(":" + Array.prototype.map.call(s3, L).join("") + L(D(s3)))), c3 < r2 + t3) throw new Error("Block starting at 0x" + c3.toString(16) + " overlaps with a previous block.");
              t3 = c3 % 65536;
              let f2 = 0;
              const d2 = c3 + l2;
              if (d2 > 4294967295) throw new Error("Data cannot be over 0xFFFFFFFF");
              for (; r2 + t3 < d2; ) {
                t3 > 65535 && (r2 += 65536, t3 = 0, s3[0] = 2, s3[1] = 0, s3[2] = 0, s3[3] = 4, s3[4] = r2 >> 24, s3[5] = r2 >> 16, n2.push(":" + Array.prototype.map.call(s3, L).join("") + L(D(s3))));
                let a3 = -1;
                for (; t3 < 65536 && a3; ) if (a3 = Math.min(e3, d2 - r2 - t3, 65536 - t3), a3) {
                  i3[0] = a3, i3[1] = t3 >> 8, i3[2] = t3, i3[3] = 0;
                  const e4 = u2.subarray(f2, f2 + a3);
                  n2.push(":" + Array.prototype.map.call(i3, L).join("") + Array.prototype.map.call(e4, L).join("") + L(C(i3, e4))), f2 += a3, t3 += a3;
                }
              }
            }
            return n2.push(":00000001FF"), n2.join("\n");
          }
          clone() {
            const e3 = new k();
            for (const [t3, r2] of this) e3.set(t3, Buffer.from(r2));
            return e3;
          }
          static fromPaddedBuffer(e3, t3 = 255, r2 = 64) {
            if (!(e3 instanceof Buffer)) throw new Error("Bytes passed to fromPaddedBuffer are not an Buffer");
            const n2 = new k();
            let s3 = 0, i3 = -1, a2 = 0, o2 = false;
            const c2 = e3.length;
            for (let u2 = 0; u2 < c2; u2++) e3[u2] === t3 ? (s3++, s3 >= r2 && (-1 !== i3 && n2.set(a2, e3.subarray(a2, i3 + 1)), o2 = true)) : (o2 && (o2 = false, a2 = u2), i3 = u2, s3 = 0);
            return o2 || -1 === i3 || n2.set(a2, e3.subarray(a2, c2)), n2;
          }
          slice(e3, t3 = 1 / 0) {
            if (t3 < 0) throw new Error("Length of the slice cannot be negative");
            const r2 = new k();
            for (const [n2, s3] of this) {
              const i3 = s3.length;
              if (n2 + i3 >= e3 && n2 < e3 + t3) {
                const a2 = Math.max(e3, n2), o2 = Math.min(e3 + t3, n2 + i3) - a2, c2 = a2 - n2;
                o2 > 0 && r2.set(a2, s3.subarray(c2, c2 + o2));
              }
            }
            return r2;
          }
          slicePad(e3, t3, r2 = 255) {
            if (t3 < 0) throw new Error("Length of the slice cannot be negative");
            const n2 = Buffer.alloc(t3, r2);
            for (const [r3, s3] of this) {
              const i3 = s3.length;
              if (r3 + i3 >= e3 && r3 < e3 + t3) {
                const a2 = Math.max(e3, r3), o2 = Math.min(e3 + t3, r3 + i3) - a2, c2 = a2 - r3;
                o2 > 0 && n2.set(s3.subarray(c2, c2 + o2), a2 - e3);
              }
            }
            return n2;
          }
          contains(e3) {
            for (const [t3, r2] of e3) {
              const e4 = r2.length, n2 = this.slice(t3, e4).join().get(t3);
              if (!n2 || n2.length !== e4) return false;
              for (const e5 in r2) if (r2[e5] !== n2[e5]) return false;
            }
            return true;
          }
        }
        class x {
          _blocks;
          constructor(e3) {
            if (this._blocks = /* @__PURE__ */ new Map(), e3 && Symbol.iterator in e3) for (const t3 of e3) {
              if (!Array.isArray(t3) || 2 !== t3.length) throw new Error("First parameter to S19MemoryMap constructor must be an iterable of [addr, bytes] or undefined");
              this.set(t3[0], t3[1]);
            }
            else if ("object" == typeof e3) {
              if (e3) {
                const t3 = Object.keys(e3);
                for (const r2 of t3) this.set(U(r2), e3[r2]);
              }
            } else if (null != e3) throw new Error("First parameter to S19MemoryMap constructor must be an iterable of [addr, bytes] or undefined");
          }
          set(e3, t3) {
            if (!Number.isInteger(e3)) throw new Error("Address passed to S19MemoryMap is not an integer");
            if (e3 < 0) throw new Error("Address passed to S19MemoryMap is negative");
            if (!(t3 instanceof Buffer)) throw new Error("Bytes passed to S19MemoryMap are not an Buffer");
            return this._blocks.set(e3, t3);
          }
          get(e3) {
            return this._blocks.get(e3);
          }
          clear() {
            return this._blocks.clear();
          }
          delete(e3) {
            return this._blocks.delete(e3);
          }
          entries() {
            return this._blocks.entries();
          }
          forEach(e3, t3) {
            return this._blocks.forEach(e3, t3);
          }
          has(e3) {
            return this._blocks.has(e3);
          }
          keys() {
            return this._blocks.keys();
          }
          values() {
            return this._blocks.values();
          }
          get size() {
            return this._blocks.size;
          }
          [Symbol.iterator]() {
            return this._blocks[Symbol.iterator]();
          }
          static fromS19(e3, t3 = 1 / 0) {
            const r2 = new x(), n2 = e3.split(/\r?\n/);
            let s3 = 0, i3 = 0;
            for (const e4 of n2) {
              const t4 = e4.trim();
              if (!t4) continue;
              if (s3++, !t4.startsWith("S")) throw new Error(`Line ${s3} does not start with 'S': "${t4}"`);
              if (t4.length < 4) throw new Error(`Line ${s3} is too short: "${t4}"`);
              const n3 = U(t4[1]), a2 = t4.substr(2, 2), o2 = U(a2, 16);
              if (isNaN(o2)) throw new Error(`Invalid length field in line ${s3}: "${a2}"`);
              const c2 = 4 + 2 * o2;
              if (t4.length !== c2) throw new Error(`Line ${s3} has incorrect length. Expected ${c2}, got ${t4.length}: "${t4}"`);
              const u2 = t4.substr(4);
              let l2 = o2;
              for (let e5 = 0; e5 < u2.length - 2; e5 += 2) l2 += U(u2.substr(e5, 2), 16);
              l2 = 255 & ~l2;
              const f2 = U(u2.substr(u2.length - 2), 16);
              if (l2 !== f2) throw new Error(`Checksum mismatch in line ${s3}. Expected ${l2.toString(16).toUpperCase().padStart(2, "0")}, got ${f2.toString(16).toUpperCase().padStart(2, "0")}`);
              switch (n3) {
                case 0:
                case 5:
                case 6:
                  break;
                case 1:
                  {
                    const e5 = U(u2.substr(0, 4), 16), t5 = u2.substr(4, u2.length - 6);
                    if (t5.length % 2 != 0) throw new Error(`Invalid data bytes length in line ${s3}: "${t5}"`);
                    const n4 = Buffer.from(t5.match(/.{2}/g)?.map((e6) => U(e6, 16)) || []);
                    n4.length > 0 && r2.set(e5, n4);
                  }
                  break;
                case 2:
                  {
                    const e5 = U(u2.substr(0, 6), 16), t5 = u2.substr(6, u2.length - 8);
                    if (t5.length % 2 != 0) throw new Error(`Invalid data bytes length in line ${s3}: "${t5}"`);
                    const n4 = Buffer.from(t5.match(/.{2}/g)?.map((e6) => U(e6, 16)) || []);
                    n4.length > 0 && r2.set(e5, n4);
                  }
                  break;
                case 3:
                  {
                    const e5 = U(u2.substr(0, 8), 16), t5 = u2.substr(8, u2.length - 10);
                    if (t5.length % 2 != 0) throw new Error(`Invalid data bytes length in line ${s3}: "${t5}"`);
                    const n4 = Buffer.from(t5.match(/.{2}/g)?.map((e6) => U(e6, 16)) || []);
                    n4.length > 0 && r2.set(e5, n4);
                  }
                  break;
                case 7:
                  i3 = U(u2.substr(0, 8), 16);
                  break;
                case 8:
                  i3 = U(u2.substr(0, 6), 16);
                  break;
                case 9:
                  i3 = U(u2.substr(0, 4), 16);
                  break;
                default:
                  throw new Error(`Unsupported record type S${n3} in line ${s3}`);
              }
            }
            return r2.join(t3);
          }
          join(e3 = 1 / 0) {
            const t3 = Array.from(this.keys()).sort((e4, t4) => e4 - t4), r2 = /* @__PURE__ */ new Map();
            let n2 = -1, s3 = -1;
            for (let i4 = 0, a3 = t3.length; i4 < a3; i4++) {
              const a4 = t3[i4], o3 = this.get(t3[i4]).length;
              if (s3 === a4 && s3 - n2 < e3) r2.set(n2, r2.get(n2) + o3), s3 += o3;
              else {
                if (!(s3 <= a4)) throw new Error("Overlapping data around address 0x" + a4.toString(16));
                r2.set(a4, o3), n2 = a4, s3 = a4 + o3;
              }
            }
            const i3 = new x();
            let a2, o2 = -1;
            for (let e4 = 0, n3 = t3.length; e4 < n3; e4++) {
              const n4 = t3[e4];
              r2.has(n4) && (a2 = Buffer.alloc(r2.get(n4)), i3.set(n4, a2), o2 = n4), a2.set(this.get(n4), n4 - o2);
            }
            return i3;
          }
          static overlapS19MemoryMaps(e3) {
            const t3 = /* @__PURE__ */ new Set();
            for (const [, r3] of e3) for (const [e4, n3] of r3) t3.add(e4), t3.add(e4 + n3.length);
            const r2 = Array.from(t3.values()).sort((e4, t4) => e4 - t4), n2 = /* @__PURE__ */ new Map();
            for (let t4 = 0, s3 = r2.length - 1; t4 < s3; t4++) {
              const s4 = r2[t4], i3 = r2[t4 + 1], a2 = [];
              for (const [t5, r3] of e3) {
                const e4 = Array.from(r3.keys()).reduce((e5, t6) => t6 > s4 ? e5 : Math.max(e5, t6), -1);
                if (-1 !== e4) {
                  const n3 = r3.get(e4), o2 = s4 - e4, c2 = i3 - e4;
                  o2 < n3.length && a2.push([t5, n3.subarray(o2, c2)]);
                }
              }
              a2.length && n2.set(s4, a2);
            }
            return n2;
          }
          static flattenOverlaps(e3) {
            return new x(Array.from(e3.entries()).map(([e4, t3]) => [e4, t3[t3.length - 1][1]]));
          }
          paginate(e3 = 1024, t3 = 255) {
            if (e3 <= 0) throw new Error("Page size must be greater than zero");
            const r2 = new x();
            let n2;
            const s3 = Array.from(this.keys()).sort((e4, t4) => e4 - t4);
            for (let i3 = 0, a2 = s3.length; i3 < a2; i3++) {
              const a3 = s3[i3], o2 = this.get(a3), c2 = o2.length, u2 = a3 + c2;
              for (let s4 = a3 - a3 % e3; s4 < u2; s4 += e3) {
                n2 = r2.get(s4), n2 || (n2 = Buffer.alloc(e3), n2.fill(t3), r2.set(s4, n2));
                const i4 = s4 - a3;
                let u3;
                i4 <= 0 ? (u3 = o2.subarray(0, Math.min(e3 + i4, c2)), n2.set(u3, -i4)) : (u3 = o2.subarray(i4, i4 + Math.min(e3, c2 - i4)), n2.set(u3, 0));
              }
            }
            return r2;
          }
          getUint32(e3, t3) {
            const r2 = Array.from(this.keys());
            for (let n2 = 0, s3 = r2.length; n2 < s3; n2++) {
              const s4 = r2[n2], i3 = this.get(s4), a2 = i3.length;
              if (s4 <= e3 && e3 + 4 <= s4 + a2) return new DataView(i3.buffer, e3 - s4, 4).getUint32(0, t3);
            }
          }
          asS19String(e3 = 16) {
            if (e3 <= 0) throw new Error("Size of record must be greater than zero");
            if (e3 > 255) throw new Error("Size of record must be less than 256");
            const t3 = [], r2 = Buffer.from("ECB S19 export");
            let n2 = "S0";
            n2 += (2 + r2.length + 1).toString(16).toUpperCase().padStart(2, "0"), n2 += "0000", n2 += Array.from(r2).map((e4) => e4.toString(16).toUpperCase().padStart(2, "0")).join("");
            let s3 = 2 + r2.length + 1 + 0 + 0;
            for (const e4 of r2) s3 += e4;
            s3 = 255 & ~s3, n2 += s3.toString(16).toUpperCase().padStart(2, "0"), t3.push(n2);
            let i3 = 0;
            const a2 = Array.from(this.keys()).sort((e4, t4) => e4 - t4), o2 = a2.length > 0 ? Math.max(...a2.map((e4) => e4 + (this.get(e4)?.length || 0))) : 0;
            let c2 = "S1", u2 = 2;
            o2 > 16777215 ? (c2 = "S3", u2 = 4) : o2 > 65535 && (c2 = "S2", u2 = 3);
            for (const r3 of a2) {
              const n3 = this.get(r3);
              if (!n3 || 0 === n3.length) continue;
              let s4 = r3;
              for (let r4 = 0; r4 < n3.length; r4 += e3) {
                const a3 = Math.min(e3, n3.length - r4), o3 = n3.subarray(r4, r4 + a3);
                let l3 = c2;
                const f3 = u2 + 1 + a3;
                l3 += f3.toString(16).toUpperCase().padStart(2, "0"), l3 += s4.toString(16).toUpperCase().padStart(2 * u2, "0"), l3 += Array.from(o3).map((e4) => e4.toString(16).toUpperCase().padStart(2, "0")).join("");
                let d3 = f3;
                "S3" === c2 ? (d3 += s4 >> 24 & 255, d3 += s4 >> 16 & 255) : "S2" === c2 && (d3 += s4 >> 16 & 255), d3 += s4 >> 8 & 255, d3 += 255 & s4;
                for (const e4 of o3) d3 += e4;
                d3 = 255 & ~d3, l3 += d3.toString(16).toUpperCase().padStart(2, "0"), t3.push(l3), s4 += a3, i3++;
              }
            }
            if (i3 <= 65535) {
              let e4 = "S5";
              e4 += "03", e4 += i3.toString(16).toUpperCase().padStart(4, "0");
              let r3 = 3 + (i3 >> 8 & 255) + (255 & i3);
              r3 = 255 & ~r3, e4 += r3.toString(16).toUpperCase().padStart(2, "0"), t3.push(e4);
            }
            let l2 = "S3" === c2 ? "S7" : "S2" === c2 ? "S8" : "S9";
            const f2 = u2, d2 = f2 + 1;
            l2 += d2.toString(16).toUpperCase().padStart(2, "0"), l2 += "0000".padStart(2 * f2, "0");
            let h2 = d2;
            for (let e4 = 0; e4 < f2; e4++) h2 += 0;
            return h2 = 255 & ~h2, l2 += h2.toString(16).toUpperCase().padStart(2, "0"), t3.push(l2), t3.join("\n");
          }
          clone() {
            const e3 = new x();
            for (const [t3, r2] of this) e3.set(t3, Buffer.from(r2));
            return e3;
          }
          static fromPaddedBuffer(e3, t3 = 255, r2 = 64) {
            if (!(e3 instanceof Buffer)) throw new Error("Bytes passed to fromPaddedBuffer are not an Buffer");
            const n2 = new x();
            let s3 = 0, i3 = -1, a2 = 0, o2 = false;
            const c2 = e3.length;
            for (let u2 = 0; u2 < c2; u2++) e3[u2] === t3 ? (s3++, s3 >= r2 && (-1 !== i3 && n2.set(a2, e3.subarray(a2, i3 + 1)), o2 = true)) : (o2 && (o2 = false, a2 = u2), i3 = u2, s3 = 0);
            return o2 || -1 === i3 || n2.set(a2, e3.subarray(a2, c2)), n2;
          }
          slice(e3, t3 = 1 / 0) {
            if (t3 < 0) throw new Error("Length of the slice cannot be negative");
            const r2 = new x();
            for (const [n2, s3] of this) {
              const i3 = s3.length;
              if (n2 + i3 >= e3 && n2 < e3 + t3) {
                const a2 = Math.max(e3, n2), o2 = Math.min(e3 + t3, n2 + i3) - a2, c2 = a2 - n2;
                o2 > 0 && r2.set(a2, s3.subarray(c2, c2 + o2));
              }
            }
            return r2;
          }
          slicePad(e3, t3, r2 = 255) {
            if (t3 < 0) throw new Error("Length of the slice cannot be negative");
            const n2 = Buffer.alloc(t3, r2);
            for (const [r3, s3] of this) {
              const i3 = s3.length;
              if (r3 + i3 >= e3 && r3 < e3 + t3) {
                const a2 = Math.max(e3, r3), o2 = Math.min(e3 + t3, r3 + i3) - a2, c2 = a2 - r3;
                o2 > 0 && n2.set(s3.subarray(c2, c2 + o2), a2 - e3);
              }
            }
            return n2;
          }
          contains(e3) {
            for (const [t3, r2] of e3) {
              const e4 = r2.length, n2 = this.slice(t3, e4).join().get(t3);
              if (!n2 || n2.length !== e4) return false;
              for (const e5 in r2) if (r2[e5] !== n2[e5]) return false;
            }
            return true;
          }
        }
        var B = r(170);
      })();
      var s = exports2;
      for (var i in n) s[i] = n[i];
      n.__esModule && Object.defineProperty(s, "__esModule", { value: true });
    })();
  }
});

// ../../../../APP_Software/EcuBus-Pro/resources/app.asar.unpacked/resources/lib/js/init.js
var import_ECB;
var init_init = __esm({
  "../../../../APP_Software/EcuBus-Pro/resources/app.asar.unpacked/resources/lib/js/init.js"() {
    import_ECB = __toESM(require_js());
  }
});

// bootloader.ts
init_init();
var import_crypto = __toESM(require("crypto"));
var import_ECB2 = __toESM(require_js());
var import_path = __toESM(require("path"));
var import_promises = __toESM(require("fs/promises"));
var PACKAGE_MAGIC = "DFPK";
var PACKAGE_VERSION = 1;
var PACKAGE_HEADER_SIZE = 12;
var SLOT_A = 0;
var crc = new import_ECB2.CRC("self", 16, 15717, 0, 65535, true, true);
var maxChunkSize = void 0;
var content = void 0;
var pendingCrcResult = void 0;
var currentPackage = void 0;
var currentImage = void 0;
var needRequestDownload = false;
var fileList = [import_path.default.join(process.env.PROJECT_ROOT, "bin", "DFDI_APP.bin")];
function sha256Of(data) {
  return import_crypto.default.createHash("sha256").update(data).digest("hex");
}
function parseUpgradePackage(filePath, raw) {
  if (raw.length < PACKAGE_HEADER_SIZE) {
    throw new Error(`upgrade package too small: ${filePath}`);
  }
  const magic = raw.subarray(0, 4).toString("ascii");
  if (magic !== PACKAGE_MAGIC) {
    throw new Error(`invalid package magic: ${magic}`);
  }
  const version = raw.readUInt32BE(4);
  if (version !== PACKAGE_VERSION) {
    throw new Error(`unsupported package version: ${version}`);
  }
  const manifestLength = raw.readUInt32BE(8);
  const manifestStart = PACKAGE_HEADER_SIZE;
  const manifestEnd = manifestStart + manifestLength;
  if (manifestEnd > raw.length) {
    throw new Error(`manifest length out of range: ${manifestLength}`);
  }
  const manifest = JSON.parse(raw.subarray(manifestStart, manifestEnd).toString("utf8"));
  if (manifest.format !== PACKAGE_MAGIC || manifest.version !== PACKAGE_VERSION || !Array.isArray(manifest.images)) {
    throw new Error("invalid manifest content");
  }
  for (const image of manifest.images) {
    const dataEnd = image.dataOffset + image.dataSize;
    if (dataEnd > raw.length) {
      throw new Error(`image ${image.slotName} exceeds package size`);
    }
  }
  return { manifest, raw, filePath };
}
function getImageBySlot(pkg, slotType) {
  const image = pkg.manifest.images.find((item) => item.slotType === slotType);
  if (!image) {
    throw new Error(`package does not contain slot ${slotType}`);
  }
  return image;
}
function loadImagePayload(pkg, image) {
  const payload = pkg.raw.subarray(image.dataOffset, image.dataOffset + image.dataSize);
  const calcSha256 = sha256Of(payload);
  if (calcSha256.toLowerCase() !== image.sha256.toLowerCase()) {
    throw new Error(`sha256 mismatch for slot ${image.slotName}`);
  }
  return payload;
}
function buildRequestDownloadPdu(addr, size) {
  const pdu = Buffer.alloc(11);
  pdu.writeUInt8(52, 0);
  pdu.writeUInt8(0, 1);
  pdu.writeUInt8(68, 2);
  pdu.writeUInt32BE(addr >>> 0, 3);
  pdu.writeUInt32BE(size >>> 0, 7);
  return pdu;
}
Util.Init(async () => {
  const req = import_ECB2.DiagRequest.from("Tester_1.RoutineControl491");
  req.diagSetParameter("routineControlType", 1);
  await req.changeService();
  const resp = import_ECB2.DiagResponse.from("Tester_1.RoutineControl491");
  resp.diagSetParameter("routineControlType", 1);
  await resp.changeService();
});
Util.On("Tester_1.RoutineControl491.recv", (v) => {
  const raw = v.diagGetRaw();
  if (v.diagIsPositiveResponse()) {
    console.log(`[BOOTLOADER] RC491 resp+: ${raw.toString("hex").toUpperCase()}`);
    if (raw.length >= 6 && raw[0] === 113 && raw[1] === 1 && raw[2] === 255 && raw[3] === 0) {
      console.log(`[BOOTLOADER] erase result=${raw[4]} targetSlot=${raw[5]}`);
    }
  } else {
    console.log(`[BOOTLOADER] RC491 resp-: NRC=0x${v.diagGetResponseCode().toString(16)} raw=${raw.toString("hex").toUpperCase()}`);
  }
});
Util.On("Tester_1.RoutineControl490.recv", (v) => {
  const raw = v.diagGetRaw();
  if (v.diagIsPositiveResponse()) {
    console.log(`[BOOTLOADER] RC490 resp+: ${raw.toString("hex").toUpperCase()}`);
  } else {
    console.log(`[BOOTLOADER] RC490 resp-: NRC=0x${v.diagGetResponseCode().toString(16)} raw=${raw.toString("hex").toUpperCase()}`);
  }
});
Util.On("Tester_1.SecurityAccess390.recv", async (v) => {
  const data = v.diagGetParameterRaw("securitySeed");
  const cipher = import_crypto.default.createCipheriv(
    "aes-128-cbc",
    Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
    Buffer.alloc(16, 0)
  );
  const encrypted = cipher.update(data);
  cipher.final();
  const req = import_ECB2.DiagRequest.from("Tester_1.SecurityAccess391");
  req.diagSetParameterSize("data", 128);
  req.diagSetParameterRaw("data", encrypted);
  await req.changeService();
});
Util.Register("Tester_1.JobFunction0", async () => {
  const filePath = fileList.shift();
  if (filePath) {
    currentPackage = parseUpgradePackage(filePath, await import_promises.default.readFile(filePath));
    console.log(`[BOOTLOADER] start job: package=${currentPackage.filePath}`);
    console.log(`[BOOTLOADER] package images=${currentPackage.manifest.images.length}`);
    const list = [];
    content = void 0;
    currentImage = void 0;
    pendingCrcResult = void 0;
    maxChunkSize = void 0;
    needRequestDownload = false;
    const eraseReq = import_ECB2.DiagRequest.from("Tester_1.RoutineControl491");
    eraseReq.diagSetParameter("routineIdentifier", 65280);
    eraseReq.diagSetParameterSize("routineControlOptionRecord", 0);
    console.log("[BOOTLOADER] erase: routine=0xFF00");
    eraseReq.On("recv", async (resp) => {
      const raw = resp.diagGetRaw();
      if (!resp.diagIsPositiveResponse()) {
        return;
      }
      if (raw.length < 6 || raw[0] !== 113 || raw[1] !== 1 || raw[2] !== 255 || raw[3] !== 0) {
        return;
      }
      if (raw[4] !== 0) {
        throw new Error(`erase routine failed, status=${raw[4]}`);
      }
      const targetSlot = raw[5];
      currentImage = getImageBySlot(currentPackage, targetSlot);
      content = loadImagePayload(currentPackage, currentImage);
      pendingCrcResult = crc.compute(content);
      if (pendingCrcResult !== currentImage.crc16) {
        throw new Error(
          `package crc16 mismatch for slot ${currentImage.slotName}: manifest=0x${currentImage.crc16.toString(16)} calc=0x${pendingCrcResult.toString(16)}`
        );
      }
      console.log(
        `[BOOTLOADER] selected slot=${currentImage.slotName} addr=0x${currentImage.loadAddress.toString(16)} size=${content.length} crc=0x${pendingCrcResult.toString(16)}`
      );
      needRequestDownload = true;
    });
    list.push(eraseReq);
    return list;
  } else {
    return [];
  }
});
Util.Register("Tester_1.JobFunction1", () => {
  if (needRequestDownload) {
    if (!currentImage || !content) {
      throw new Error("request download without selected image");
    }
    const serviceName = currentImage.slotType === SLOT_A ? "Tester_1.RequestDownload520_A" : "Tester_1.RequestDownload520_B";
    const r34 = import_ECB2.DiagRequest.from(serviceName);
    const raw = buildRequestDownloadPdu(currentImage.loadAddress, content.length);
    r34.diagSetRaw(raw);
    console.log(
      `[BOOTLOADER] R34 send raw=${raw.toString("hex").toUpperCase()} slot=${currentImage.slotName} addr=0x${currentImage.loadAddress.toString(
        16
      )} size=${content.length}`
    );
    r34.On("recv", (resp) => {
      const respRaw = resp.diagGetRaw().toString("hex").toUpperCase();
      if (resp.diagIsPositiveResponse()) {
        console.log(`[BOOTLOADER] R34 resp+: ${respRaw}`);
      } else {
        console.log(`[BOOTLOADER] R34 resp-: NRC=0x${resp.diagGetResponseCode().toString(16)} raw=${respRaw}`);
      }
      const buf = resp.diagGetParameterRaw("maxNumberOfBlockLength");
      const hex = buf.toString("hex").toUpperCase();
      if (buf.length >= 2) {
        maxChunkSize = buf.readUInt16BE(0);
      } else if (buf.length === 1) {
        maxChunkSize = buf.readUInt8(0);
      } else {
        maxChunkSize = void 0;
      }
      console.log(`[BOOTLOADER] maxNumberOfBlockLength raw=${hex} val=${maxChunkSize}`);
    });
    needRequestDownload = false;
    return [r34];
  }
  if (maxChunkSize == void 0 || maxChunkSize <= 2) {
    return [];
  }
  if (content) {
    maxChunkSize -= 2;
    if (maxChunkSize & 7) {
      maxChunkSize -= maxChunkSize & 7;
    }
    const numChunks = Math.ceil(content.length / maxChunkSize);
    const list = [];
    for (let i = 0; i < numChunks; i++) {
      const start = i * maxChunkSize;
      const end = Math.min(start + maxChunkSize, content.length);
      const chunk = content.subarray(start, end);
      const transferRequest = import_ECB2.DiagRequest.from("Tester_1.TransferData540");
      transferRequest.diagSetParameterSize("transferRequestParameterRecord", chunk.length * 8);
      transferRequest.diagSetParameterRaw("transferRequestParameterRecord", chunk);
      const blockSequenceCounter = Buffer.alloc(1);
      blockSequenceCounter.writeUInt8(i + 1 & 255);
      transferRequest.diagSetParameterRaw("blockSequenceCounter", blockSequenceCounter);
      list.push(transferRequest);
    }
    const r37 = import_ECB2.DiagRequest.from("Tester_1.RequestTransferExit550");
    r37.diagSetParameterSize("transferRequestParameterRecord", 0);
    list.push(r37);
    if (pendingCrcResult != void 0) {
      const crcReq = import_ECB2.DiagRequest.from("Tester_1.RoutineControl490");
      const crcBuffer = Buffer.alloc(4);
      crcBuffer.writeUInt16BE(pendingCrcResult, 2);
      crcReq.diagSetParameterSize("routineControlOptionRecord", 4 * 8);
      crcReq.diagSetParameterRaw("routineControlOptionRecord", crcBuffer);
      console.log(`[BOOTLOADER] checksum: crc=0x${pendingCrcResult.toString(16)}`);
      list.push(crcReq);
    }
    if (fileList.length == 0) {
      const dependencyReq = import_ECB2.DiagRequest.from("Tester_1.RoutineControl491");
      dependencyReq.diagSetParameter("routineIdentifier", 65281);
      dependencyReq.diagSetParameterSize("routineControlOptionRecord", 0);
      console.log("[BOOTLOADER] dependency: routine=0xFF01");
      list.push(dependencyReq);
    }
    content = void 0;
    currentImage = void 0;
    currentPackage = void 0;
    maxChunkSize = void 0;
    pendingCrcResult = void 0;
    return list;
  } else {
    return [];
  }
});
/*! For license information please see index.js.LICENSE.txt */
//# sourceMappingURL=bootloader.js.map
