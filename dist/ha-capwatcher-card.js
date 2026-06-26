/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, ie = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, oe = Symbol(), fe = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ie && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = fe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && fe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const je = (s) => new ke(typeof s == "string" ? s : s + "", void 0, oe), S = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new ke(t, s, oe);
}, Ie = (s, e) => {
  if (ie) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = W.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, ge = ie ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return je(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: We, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: Ve, getOwnPropertySymbols: Ze, getPrototypeOf: qe } = Object, $ = globalThis, ye = $.trustedTypes, Ge = ye ? ye.emptyScript : "", ee = $.reactiveElementPolyfillSupport, T = (s, e) => s, V = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ge : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, ne = (s, e) => !Be(s, e), _e = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && We(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = Fe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, r = [...Ve(t), ...Ze(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(ge(i));
    } else e !== void 0 && t.push(ge(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ie(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var n;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : V).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = r.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : V;
      this._$Em = i;
      const p = a.fromAttribute(t, l.type);
      this[i] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, n) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[e]), r ?? (r = l.getPropertyOptions(e)), !((r.hasChanged ?? ne)(n, t) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: l } = o, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[T("elementProperties")] = /* @__PURE__ */ new Map(), C[T("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: C }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, ve = (s) => s, Z = L.trustedTypes, $e = Z ? Z.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ne = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Ue = "?" + v, Je = `<${Ue}>`, A = document, H = () => A.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", ae = Array.isArray, Ke = (s) => ae(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, be = />/g, b = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, we = /"/g, Me = /^(?:script|style|textarea|title)$/i, Te = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), c = Te(1), Ae = Te(2), P = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function Le(s, e) {
  if (!ae(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const Ye = (s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = M;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let p, u, d = -1, y = 0;
    for (; y < a.length && (o.lastIndex = y, u = o.exec(a), u !== null); ) y = o.lastIndex, o === M ? u[1] === "!--" ? o = me : u[1] !== void 0 ? o = be : u[2] !== void 0 ? (Me.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = b) : u[3] !== void 0 && (o = b) : o === b ? u[0] === ">" ? (o = i ?? M, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, p = u[1], o = u[3] === void 0 ? b : u[3] === '"' ? we : xe) : o === we || o === xe ? o = b : o === me || o === be ? o = M : (o = b, i = void 0);
    const _ = o === b && s[l + 1].startsWith("/>") ? " " : "";
    n += o === M ? a + Je : d >= 0 ? (r.push(p), a.slice(0, d) + Ne + a.slice(d) + v + _) : a + v + (d === -2 ? l : _);
  }
  return [Le(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class R {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [p, u] = Ye(e, t);
    if (this.el = R.createElement(p, r), x.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = x.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Ne)) {
          const y = u[o++], _ = i.getAttribute(d).split(v), B = /([.?@])?(.*)/.exec(y);
          a.push({ type: 1, index: n, name: B[2], strings: _, ctor: B[1] === "." ? Qe : B[1] === "?" ? et : B[1] === "@" ? tt : K }), i.removeAttribute(d);
        } else d.startsWith(v) && (a.push({ type: 6, index: n }), i.removeAttribute(d));
        if (Me.test(i.tagName)) {
          const d = i.textContent.split(v), y = d.length - 1;
          if (y > 0) {
            i.textContent = Z ? Z.emptyScript : "";
            for (let _ = 0; _ < y; _++) i.append(d[_], H()), x.nextNode(), a.push({ type: 2, index: ++n });
            i.append(d[y], H());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ue) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(v, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += v.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = A.createElement("template");
    return r.innerHTML = e, r;
  }
}
function O(s, e, t = s, r) {
  var o, l;
  if (e === P) return e;
  let i = r !== void 0 ? (o = t._$Co) == null ? void 0 : o[r] : t._$Cl;
  const n = z(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = O(s, i._$AS(s, e.values), i, r)), e;
}
class Xe {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    x.currentNode = i;
    let n = x.nextNode(), o = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let p;
        a.type === 2 ? p = new I(n, n.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (p = new st(n, this, e)), this._$AV.push(p), a = r[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = x.nextNode(), o++);
    }
    return x.currentNode = A, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class I {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = O(this, e, t), z(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ke(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = R.createElement(Le(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const o = new Xe(i, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Se.get(e.strings);
    return t === void 0 && Se.set(e.strings, t = new R(e)), t;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new I(this.O(H()), this.O(H()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ve(e).nextSibling;
      ve(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = O(this, e, t, 0), o = !z(e) || e !== this._$AH && e !== P, o && (this._$AH = e);
    else {
      const l = e;
      let a, p;
      for (e = n[0], a = 0; a < n.length - 1; a++) p = O(this, l[r + a], t, a), p === P && (p = this._$AH[a]), o || (o = !z(p) || p !== this._$AH[a]), p === h ? e = h : e !== h && (e += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qe extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class et extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class tt extends K {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? h) === P) return;
    const r = this._$AH, i = e === h && r !== h || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== h && (r === h || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class st {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const se = L.litHtmlPolyfillSupport;
se == null || se(R, I), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.3");
const rt = (s, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new I(e.insertBefore(H(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class g extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return P;
  }
}
var Oe;
g._$litElement$ = !0, g.finalized = !0, (Oe = w.litElementHydrateSupport) == null || Oe.call(w, { LitElement: g });
const re = w.litElementPolyfillSupport;
re == null || re({ LitElement: g });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: ne }, ot = (s = it, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function f(s) {
  return (e, t) => typeof t == "object" ? ot(s, e, t) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function le(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
const Y = ["extreme", "severe", "warning", "watch", "info"], Ee = {
  extreme: { color: "#9b1c1c", background: "#f9e0e0", label: "EXTREME" },
  severe: { color: "#FF181E", background: "#fde8e8", label: "SEVERE" },
  warning: { color: "#FF8918", background: "#fef3e2", label: "WARNING" },
  watch: { color: "#FFEB18", background: "#e8f0fd", label: "WATCH" },
  info: { color: "#8b95a1", background: null, label: "INFO" }
};
function ce(s) {
  return Ee[s] ?? Ee.info;
}
function q(s) {
  return Y.indexOf(s);
}
function nt(s, e) {
  return q(s) - q(e);
}
function at(s, e) {
  return q(s) <= q(e);
}
function lt(s) {
  return Y.includes(s.state) && typeof s.attributes.headline == "string" && typeof s.attributes.feed_name == "string";
}
function ct(s, e) {
  const t = e.min_severity ?? "info", r = Object.values(s).filter(lt).filter((o) => at(o.state, t)).map((o) => o), i = e.sort_by ?? "severity";
  r.sort((o, l) => {
    if (i === "severity") return nt(o.state, l.state);
    if (i === "issued") {
      const a = o.attributes.issued ?? "";
      return (l.attributes.issued ?? "").localeCompare(a);
    }
    return i === "feed_name" ? (o.attributes.feed_name ?? "").localeCompare(l.attributes.feed_name ?? "") : 0;
  });
  const n = e.max_alerts;
  return n != null ? r.slice(0, n) : r;
}
function He(s, e) {
  return `sensor.ha_capwatcher_${s}_${e}`;
}
function dt(s, e) {
  var i;
  const t = He(e, "highest_severity"), r = (i = s[t]) == null ? void 0 : i.state;
  return Y.includes(r ?? "") ? r : null;
}
function pt(s, e) {
  var r;
  const t = He(e, "alert_count");
  return ((r = s[t]) == null ? void 0 : r.last_updated) ?? null;
}
const ze = "ha_capwatcher_dismissed";
function X() {
  try {
    return JSON.parse(localStorage.getItem(ze) ?? "{}");
  } catch {
    return {};
  }
}
function de(s) {
  localStorage.setItem(ze, JSON.stringify(s));
}
function ht(s, e) {
  const t = X();
  t[s] = e, de(t);
}
function Ce(s, e) {
  return X()[s] === e;
}
function ut(s) {
  const e = X();
  delete e[s], de(e);
}
function ft(s, e) {
  const t = X();
  let r = !1;
  for (const i of Object.keys(t))
    (!s.has(i) || e[i] !== t[i]) && (delete t[i], r = !0);
  r && de(t);
}
function F(s) {
  if (!s) return "";
  try {
    return new Date(s).toLocaleString(void 0, {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return s;
  }
}
function gt(s) {
  if (!s) return "";
  try {
    return new Date(s).toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return s;
  }
}
var yt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, Re = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? _t(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && yt(e, t, i), i;
};
let G = class extends g {
  constructor() {
    super(...arguments), this.severity = "info";
  }
  render() {
    const s = ce(this.severity);
    return c`
      <span
        class="badge ${this.severity}"
        style="background:${s.color}"
      >${s.label}</span>
    `;
  }
};
G.styles = S`
    :host { display: inline-block; }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #fff;
      white-space: nowrap;
    }
    /* watch uses dark text — yellow badge needs it for contrast */
    .badge.watch { color: #1a1a1a; }
  `;
Re([
  f()
], G.prototype, "severity", 2);
G = Re([
  E("cap-severity-badge")
], G);
var vt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, Q = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? $t(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && vt(e, t, i), i;
};
const mt = "M103,11 L111,22 L128,43 L131,28 L153,62 L193,80 L168,123 L136,157 L108,151 L120,114 L133,88 L130,65 Z", bt = "M103,140 L128,161 L162,211 L103,206 L77,230 L72,247 L37,267 L51,271 L39,215 L46,204 L85,172 L92,161 Z", xt = "M55,271 L65,280 L48,280 Z";
function Pe(s, e) {
  const t = (e - 166) * 15.38, r = (Math.abs(s) - 34) * 21.54;
  return [Math.round(t * 10) / 10, Math.round(r * 10) / 10];
}
function wt(s) {
  const e = s.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*)\s+(\d+\.?\d*)$/);
  if (e) {
    const r = parseFloat(e[1]), i = parseFloat(e[2]), n = parseFloat(e[3]), [o, l] = Pe(r, i), a = n / 111 * 21.54;
    return { type: "circle", circle: [o, l, Math.max(a, 3)] };
  }
  const t = s.trim().split(/\s+/);
  if (t.length >= 3) {
    const r = [];
    for (const i of t) {
      const [n, o] = i.split(",");
      if (!n || !o) return null;
      const l = parseFloat(n), a = parseFloat(o);
      if (isNaN(l) || isNaN(a)) return null;
      r.push(Pe(l, a));
    }
    return { type: "polygon", points: r };
  }
  return null;
}
let k = class extends g {
  constructor() {
    super(...arguments), this.geometryPolygon = null, this.severityColor = "#8b95a1", this.severityBackground = null;
  }
  render() {
    const s = this.geometryPolygon ? wt(this.geometryPolygon) : null, e = this.severityBackground ?? `${this.severityColor}33`, t = s ? s.type === "circle" && s.circle ? Ae`<circle
            class="alert-area"
            cx=${s.circle[0]} cy=${s.circle[1]} r=${s.circle[2]}
            fill=${e} stroke=${this.severityColor}
          />` : s.type === "polygon" && s.points ? Ae`<polygon
            class="alert-area"
            points=${s.points.map((r) => r.join(",")).join(" ")}
            fill=${e} stroke=${this.severityColor}
          />` : "" : "";
    return c`
      <div class="map-wrap">
        <svg viewBox="0 0 200 290" xmlns="http://www.w3.org/2000/svg">
          <path class="land" d=${mt} />
          <path class="land" d=${bt} />
          <path class="land" d=${xt} />
          ${t}
        </svg>
      </div>
    `;
  }
};
k.styles = S`
    :host { display: block; }
    .map-wrap {
      display: flex;
      justify-content: center;
      padding: 8px 0;
    }
    svg {
      width: 100px;
      height: 140px;
      overflow: visible;
    }
    .land { fill: var(--secondary-background-color, #e5e7eb); stroke: var(--divider-color, #9ca3af); stroke-width: 0.5; }
    .alert-area { stroke-width: 1.5; }
  `;
Q([
  f()
], k.prototype, "geometryPolygon", 2);
Q([
  f()
], k.prototype, "severityColor", 2);
Q([
  f()
], k.prototype, "severityBackground", 2);
k = Q([
  E("cap-nz-minimap")
], k);
var At = Object.defineProperty, St = Object.getOwnPropertyDescriptor, pe = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? St(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && At(e, t, i), i;
};
let D = class extends g {
  constructor() {
    super(...arguments), this.showGeometry = !1;
  }
  render() {
    const s = this.alert.attributes;
    return c`
      <div class="detail">
        <div class="meta-grid">
          ${s.issued ? c`
            <span class="meta-label">Issued</span>
            <span class="meta-value">${F(s.issued)}</span>
          ` : ""}
          ${s.onset ? c`
            <span class="meta-label">From</span>
            <span class="meta-value">${F(s.onset)}</span>
          ` : ""}
          ${s.expires ? c`
            <span class="meta-label">Until</span>
            <span class="meta-value">${F(s.expires)}</span>
          ` : ""}
          ${s.area ? c`
            <span class="meta-label">Area</span>
            <span class="meta-value">${s.area}</span>
          ` : ""}
          ${s.urgency ? c`
            <span class="meta-label">Urgency</span>
            <span class="meta-value">${s.urgency}</span>
          ` : ""}
          ${s.certainty ? c`
            <span class="meta-label">Certainty</span>
            <span class="meta-value">${s.certainty}</span>
          ` : ""}
          ${s.category ? c`
            <span class="meta-label">Category</span>
            <span class="meta-value">${s.category}</span>
          ` : ""}
          ${s.source ? c`
            <span class="meta-label">Source</span>
            <span class="meta-value">${s.source}</span>
          ` : ""}
        </div>

        ${s.description ? c`
          <div class="description">${s.description}</div>
        ` : ""}

        ${s.instructions ? c`
          <div class="instructions">
            <div class="instructions-label">Instructions</div>
            ${s.instructions}
          </div>
        ` : ""}

        ${this.showGeometry && s.geometry_polygon ? c`
          <cap-nz-minimap
            .geometryPolygon=${s.geometry_polygon}
            .severityColor=${s.severity_color}
            .severityBackground=${s.severity_background}
          ></cap-nz-minimap>
        ` : ""}

        ${s.cap_url ? c`
          <a class="source-link" href=${s.cap_url} target="_blank" rel="noopener">
            View full alert ↗
          </a>
        ` : ""}
      </div>
    `;
  }
};
D.styles = S`
    :host { display: block; }
    .detail {
      padding: 0 12px 12px 12px;
      font-size: 13px;
      color: var(--primary-text-color, #111827);
      line-height: 1.5;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 2px 12px;
      margin-bottom: 10px;
    }
    .meta-label {
      color: var(--secondary-text-color, #6b7280);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding-top: 1px;
    }
    .meta-value {
      font-size: 13px;
    }
    .description {
      margin: 8px 0;
      white-space: pre-wrap;
      font-size: 13px;
    }
    .instructions {
      margin: 8px 0;
      padding: 8px 10px;
      background: var(--secondary-background-color, #f3f4f6);
      border-left: 3px solid var(--primary-color, #1d4ed8);
      border-radius: 0 4px 4px 0;
      white-space: pre-wrap;
      font-size: 13px;
    }
    .instructions-label {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color, #6b7280);
    }
    .source-link {
      display: inline-block;
      margin-top: 8px;
      font-size: 12px;
      color: var(--primary-color, #1d4ed8);
      text-decoration: none;
    }
    .source-link:hover { text-decoration: underline; }
  `;
pe([
  f({ attribute: !1 })
], D.prototype, "alert", 2);
pe([
  f({ type: Boolean })
], D.prototype, "showGeometry", 2);
D = pe([
  E("cap-alert-detail")
], D);
var Et = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, U = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Ct(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && Et(e, t, i), i;
};
let m = class extends g {
  constructor() {
    super(...arguments), this.showGeometry = !1, this.showAcknowledge = !0, this._expanded = !1, this._dismissed = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._dismissed = Ce(this.alert.entity_id, this.alert.state);
  }
  updated(s) {
    s.has("alert") && (this._dismissed = Ce(this.alert.entity_id, this.alert.state));
  }
  _toggleExpand(s) {
    s.stopPropagation(), this._expanded = !this._expanded;
  }
  _toggleDismiss(s) {
    s.stopPropagation(), this._dismissed ? (ut(this.alert.entity_id), this._dismissed = !1) : (ht(this.alert.entity_id, this.alert.state), this._dismissed = !0);
  }
  render() {
    const s = this.alert.attributes, e = ce(this.alert.state), t = s.issued ? F(s.issued) : null;
    return c`
      <div class="row ${this._dismissed ? "dismissed" : ""}">
        <div class="row-header" @click=${this._toggleExpand}>
          <div class="severity-stripe" style="background:${e.color}"></div>
          <div class="header-content">
            <div class="headline">${s.headline}</div>
            <div class="sub">
              <cap-severity-badge severity=${this.alert.state}></cap-severity-badge>
              ${s.area ? c`<span>${s.area}</span>` : ""}
              ${t ? c`<span>${t}</span>` : ""}
              <span>${s.feed_name}</span>
            </div>
          </div>
          <div class="row-actions">
            ${this.showAcknowledge ? c`
              <button class="ack-btn ${this._dismissed ? "active" : ""}"
                      @click=${this._toggleDismiss}
                      title="${this._dismissed ? "Restore" : "Acknowledge"}">
                ${this._dismissed ? "Acknowledged" : "Acknowledge"}
              </button>
            ` : ""}
            <button class="expand-btn" title="${this._expanded ? "Collapse" : "Expand"}">
              ${this._expanded ? "▲" : "▼"}
            </button>
          </div>
        </div>

        ${this._expanded ? c`
          <div class="detail-wrap">
            <cap-alert-detail
              .alert=${this.alert}
              .showGeometry=${this.showGeometry}
            ></cap-alert-detail>
          </div>
        ` : ""}
      </div>
    `;
  }
};
m.styles = S`
    :host { display: block; }
    .row {
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
      border: 1px solid var(--divider-color, #e5e7eb);
      background: var(--secondary-background-color, transparent);
      transition: border-color 0.2s;
    }
    .row.dismissed {
      opacity: 0.45;
    }
    .row-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }
    .row-header:hover {
      background: var(--divider-color, #e5e7eb);
    }
    .severity-stripe {
      width: 4px;
      border-radius: 2px;
      align-self: stretch;
      flex-shrink: 0;
    }
    .header-content {
      flex: 1;
      min-width: 0;
    }
    .headline {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color, #111827);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .sub {
      font-size: 11px;
      color: var(--secondary-text-color, #6b7280);
      margin-top: 2px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .row-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--secondary-text-color, #6b7280);
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
    }
    .ack-btn {
      background: transparent;
      border: 1px solid var(--divider-color, #9ca3af);
      border-radius: 4px;
      cursor: pointer;
      padding: 3px 8px;
      font-size: 11px;
      color: var(--secondary-text-color, #6b7280);
      white-space: nowrap;
    }
    .ack-btn:hover {
      border-color: var(--primary-color, #1d4ed8);
      color: var(--primary-color, #1d4ed8);
    }
    .ack-btn.active {
      background: var(--divider-color, #e5e7eb);
      color: var(--primary-text-color, #111827);
    }
    .detail-wrap {
      border-top: 1px solid var(--divider-color, #e5e7eb);
    }
  `;
U([
  f({ attribute: !1 })
], m.prototype, "alert", 2);
U([
  f({ type: Boolean })
], m.prototype, "showGeometry", 2);
U([
  f({ type: Boolean })
], m.prototype, "showAcknowledge", 2);
U([
  le()
], m.prototype, "_expanded", 2);
U([
  le()
], m.prototype, "_dismissed", 2);
m = U([
  E("cap-alert-row")
], m);
var Pt = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, De = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Ot(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && Pt(e, t, i), i;
};
let J = class extends g {
  constructor() {
    super(...arguments), this.lastUpdated = null;
  }
  render() {
    const s = this.lastUpdated ? gt(this.lastUpdated) : null;
    return c`
      <div class="no-alerts">
        <span class="icon">✓</span>
        <div class="text">
          <span class="label">No active alerts</span>
          ${s ? c`<span class="sub">Last checked: ${s}</span>` : ""}
        </div>
      </div>
    `;
  }
};
J.styles = S`
    :host { display: block; }
    .no-alerts {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      color: var(--secondary-text-color, #6b7280);
    }
    .icon {
      font-size: 22px;
      color: #22c55e;
      flex-shrink: 0;
    }
    .text {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #111827);
    }
    .sub {
      font-size: 12px;
      color: var(--secondary-text-color, #6b7280);
      margin-top: 2px;
    }
  `;
De([
  f()
], J.prototype, "lastUpdated", 2);
J = De([
  E("cap-no-alerts-state")
], J);
var kt = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, he = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Nt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && kt(e, t, i), i;
};
let j = class extends g {
  static getConfigElement() {
    return Promise.resolve().then(() => Tt), document.createElement("ha-capwatcher-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:ha-capwatcher-card", entry: "", title: "NZ Weather Alerts" };
  }
  setConfig(s) {
    if (!s.entry) throw new Error("entry is required in card config");
    this._config = {
      show_header: !0,
      max_alerts: 10,
      min_severity: "info",
      sort_by: "severity",
      show_geometry: !1,
      show_acknowledge: !0,
      ...s
    };
  }
  _getAlerts() {
    if (!this.hass || !this._config) return [];
    const s = this.hass.states;
    return ct(s, this._config.entry, {
      minSeverity: this._config.min_severity,
      sortBy: this._config.sort_by,
      maxAlerts: this._config.max_alerts
    });
  }
  updated() {
    if (!this.hass || !this._config) return;
    const s = this._getAlerts(), e = new Set(s.map((r) => r.entity_id)), t = {};
    for (const r of s) t[r.entity_id] = r.state;
    ft(e, t);
  }
  render() {
    var o;
    if (!this._config) return h;
    if (!this._config.entry)
      return c`<ha-card><div class="error">Configuration error: entry name required.</div></ha-card>`;
    const s = this._getAlerts(), e = dt(s), t = e ? ce(e) : null, r = pt(((o = this.hass) == null ? void 0 : o.states) ?? {}, this._config.entry), i = this._config.show_header !== !1, n = this._config.title ?? "NZ Weather Alerts";
    return c`
      <ha-card>
        ${i ? c`
          <div class="card-header">
            <div class="title-wrap">
              ${t ? c`
                <div class="severity-dot" style="background:${t.color}"></div>
              ` : ""}
              <span class="card-title">${n}</span>
            </div>
            ${s.length > 0 ? c`
              <span class="count-badge">${s.length}</span>
            ` : ""}
          </div>
        ` : ""}

        <div class="content">
          ${s.length === 0 ? c`<cap-no-alerts-state .lastUpdated=${r}></cap-no-alerts-state>` : s.map((l) => c`
                <cap-alert-row
                  .alert=${l}
                  .showGeometry=${this._config.show_geometry ?? !1}
                  .showAcknowledge=${this._config.show_acknowledge ?? !0}
                ></cap-alert-row>
              `)}
        </div>
      </ha-card>
    `;
  }
};
j.styles = S`
    :host { display: block; }
    ha-card {
      display: block;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 8px;
      border-bottom: 1px solid var(--divider-color, #e5e7eb);
    }
    .title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color, #111827);
    }
    .severity-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .count-badge {
      font-size: 11px;
      padding: 1px 6px;
      border-radius: 10px;
      background: var(--secondary-background-color, #e5e7eb);
      color: var(--secondary-text-color, #6b7280);
      font-weight: 600;
    }
    .content {
      padding: 12px;
    }
    .error {
      padding: 16px;
      color: var(--error-color, #dc2626);
      font-size: 13px;
    }
  `;
he([
  f({ attribute: !1 })
], j.prototype, "hass", 2);
he([
  le()
], j.prototype, "_config", 2);
j = he([
  E("ha-capwatcher-card")
], j);
window.customCards ?? (window.customCards = []);
window.customCards.push({
  type: "ha-capwatcher-card",
  name: "HA-CAPWatcher Card",
  description: "Displays NZ CAP weather alerts from the HA-CAPWatcher integration",
  preview: !0,
  documentationURL: "https://github.com/AlastairSpencer/HA_CAPWatcher_Card"
});
var Ut = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, ue = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Mt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && Ut(e, t, i), i;
};
let N = class extends g {
  setConfig(s) {
    this._config = s;
  }
  _fire(s, e) {
    if (!this._config) return;
    const t = { ...this._config, [s]: e };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 }));
  }
  _onInput(s, e) {
    this._fire(e, s.target.value);
  }
  _onNumber(s, e) {
    const t = parseInt(s.target.value, 10);
    isNaN(t) || this._fire(e, t);
  }
  _onCheck(s, e) {
    this._fire(e, s.target.checked);
  }
  render() {
    if (!this._config) return c``;
    const s = this._config;
    return c`
      <div class="row">
        <label for="entry">Feed entry name</label>
        <input id="entry" type="text" .value=${s.entry ?? ""}
               @change=${(e) => this._onInput(e, "entry")} />
        <span class="hint">The name of the HA-CAPWatcher integration entry (required)</span>
      </div>

      <div class="row">
        <label for="title">Card title</label>
        <input id="title" type="text" .value=${s.title ?? ""}
               placeholder="NZ Weather Alerts"
               @change=${(e) => this._onInput(e, "title")} />
      </div>

      <div class="row">
        <label for="max_alerts">Max alerts shown</label>
        <input id="max_alerts" type="number" min="1" max="20"
               .value=${String(s.max_alerts ?? 10)}
               @change=${(e) => this._onNumber(e, "max_alerts")} />
      </div>

      <div class="row">
        <label for="min_severity">Minimum severity</label>
        <select id="min_severity" .value=${s.min_severity ?? "info"}
                @change=${(e) => this._onInput(e, "min_severity")}>
          ${Y.map((e) => c`<option value=${e} ?selected=${s.min_severity === e}>${e}</option>`)}
        </select>
      </div>

      <div class="row">
        <label for="sort_by">Sort alerts by</label>
        <select id="sort_by" .value=${s.sort_by ?? "severity"}
                @change=${(e) => this._onInput(e, "sort_by")}>
          <option value="severity" ?selected=${(s.sort_by ?? "severity") === "severity"}>Severity</option>
          <option value="issued" ?selected=${s.sort_by === "issued"}>Issued time</option>
          <option value="feed_name" ?selected=${s.sort_by === "feed_name"}>Feed name</option>
        </select>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show NZ map</span>
          <input type="checkbox" .checked=${s.show_geometry ?? !1}
                 @change=${(e) => this._onCheck(e, "show_geometry")} />
        </div>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show acknowledge button</span>
          <input type="checkbox" .checked=${s.show_acknowledge ?? !0}
                 @change=${(e) => this._onCheck(e, "show_acknowledge")} />
        </div>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show card header</span>
          <input type="checkbox" .checked=${s.show_header ?? !0}
                 @change=${(e) => this._onCheck(e, "show_header")} />
        </div>
      </div>
    `;
  }
};
N.styles = S`
    :host { display: block; padding: 16px; }
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    input[type="text"],
    input[type="number"],
    select {
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #d1d5db);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #111827);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color, #1d4ed8);
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .toggle-label { font-size: 14px; color: var(--primary-text-color, #111827); }
    input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; }
    .hint { font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-top: 2px; }
  `;
ue([
  f({ attribute: !1 })
], N.prototype, "hass", 2);
ue([
  f({ attribute: !1 })
], N.prototype, "_config", 2);
N = ue([
  E("ha-capwatcher-card-editor")
], N);
const Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HACAPWatcherCardEditor() {
    return N;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  j as HACAPWatcherCard
};
