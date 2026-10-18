import { useSyncExternalStore as e } from "react";
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function t(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function n(e, t = "|") {
	return e.map((e) => ce(e)).join(t);
}
function r(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var i = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function a(e) {
	return new i(e);
}
function o(e) {
	return e == null;
}
function s(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function c(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function l(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function u(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function d(e) {
	return u(e._zod.def) ?? e._zod.def.shape;
}
function f(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return l(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function p(e, t, n) {
	t in e ? l(e, t, n) : e[t] = n;
}
function m(e, t, n, r) {
	let i = d(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? f(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : p(e, a, r ? r(n.value, a) : n.value));
	}
}
function h(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? f(e, n, () => t[n]) : p(e, n, r.value));
	}
}
function g(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ee(e) {
	return JSON.stringify(e);
}
function te(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ne = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function re(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var ie = /* @__PURE__*/ a(() => {
	if (O.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function _(e) {
	if (re(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return re(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ae(e) {
	return _(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var oe = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]), se = /* @__PURE__*/ new Set([
	"string",
	"number",
	"bigint",
	"boolean",
	"symbol",
	"undefined"
]);
function v(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function y(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function b(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function ce(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function le(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
var ue = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, de = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function fe(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return m(i, e, pe(e, t)), y(e, g(n, {
		shape: i,
		checks: []
	}));
}
function pe(e, t) {
	let n = d(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function me(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(pe(e, t)), a = {};
	return m(a, e, Reflect.ownKeys(d(e)).filter((e) => !i.has(e))), y(e, g(n, {
		shape: a,
		checks: []
	}));
}
function he(e, t) {
	if (!_(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = d(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return y(e, g(e._zod.def, { shape: ge(e, t) }));
}
function ge(e, t) {
	let n = {};
	return m(n, e, Reflect.ownKeys(d(e))), h(n, t), n;
}
function _e(e, t) {
	if (!_(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return y(e, g(e._zod.def, { shape: ge(e, t) }));
}
function ve(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return m(n, e, Reflect.ownKeys(d(e))), m(n, t, Reflect.ownKeys(d(t))), y(e, g(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function ye(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(pe(t, n)) : void 0, o = {};
	return m(o, t, Reflect.ownKeys(d(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), y(t, g(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function be(e, t, n) {
	let r = n ? new Set(pe(t, n)) : void 0, i = {};
	return m(i, t, Reflect.ownKeys(d(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), y(t, g(t._zod.def, { shape: i }));
}
function x(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function xe(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Se(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Ce(e) {
	return typeof e == "string" ? e : e?.message;
}
function we(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function S(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Ce(e.inst?._zod.def?.error?.(e)) ?? Ce(a?.(e)) ?? Ce(t?.error?.(e)) ?? Ce(n.customError?.(e)) ?? Ce(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Te = /[\uD800-\uDBFF]/;
function Ee(e) {
	let t = e.length;
	if (!Te.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function De(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Oe(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function ke(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function Ae(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Ne(e, n, r.value);
	}
}
function C(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function je(e, t, n) {
	return C(e, t, n, !1);
}
function Me(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return C(this, n, r(this));
			},
			set(e) {
				C(this, n, e);
			}
		});
	}
	return t;
}
function Ne(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : C(this, t, n.bind(this));
		},
		set(e) {
			C(this, t, e);
		}
	});
}
function Pe(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var Fe, w = !1, Ie = {
	configurable: !0,
	get() {
		w = !0;
	}
};
function T(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Fe !== e._zod) {
		Fe = void 0;
		return;
	}
	Fe = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Ie);
			let e = w;
			w = !1;
			try {
				let r = n(this);
				return w ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), w ||= e, r;
			} catch (n) {
				throw delete this[t], w ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function Le(e, t, n, r) {
	let i = Pe(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
var Re = "~constantCatch";
function ze(e) {
	let t = () => e;
	return t[Re] = !0, t;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var Be, Ve = {
	value: void 0,
	enumerable: !1
}, He = "captureStackTrace" in Error ? Error : null;
function Ue(e) {
	let t = He;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return He = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function E(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Ve.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Ve);
			} finally {
				Ve.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Ae(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Ue(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var D = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, We = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(Be = globalThis).__zod_globalConfig ?? (Be.__zod_globalConfig = {});
var O = globalThis.__zod_globalConfig;
function k(e) {
	return e && Object.assign(O, e), O;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function Ge() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, r, 2), e.message;
}
function Ke(e) {
	this._zod.message = e;
}
var qe = {
	get: Ge,
	set: Ke,
	enumerable: !0,
	configurable: !0
}, Je = {
	value: void 0,
	enumerable: !1
}, Ye = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Xe = (e, t) => {
	e.name = "$ZodError", Je.value = t, Object.defineProperty(e, "issues", Je), Je.value = void 0, Object.defineProperty(e, "message", qe);
	let n = Object.getPrototypeOf(e);
	Ye.has(n) || (Ye.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, Ze = E("$ZodError", Xe);
E("$ZodError", Xe, void 0, { Parent: Error });
function Qe(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function $e(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? Qe(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function et(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function tt(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var nt = (e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new D();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => S(e, o, k())));
			throw ne(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, rt = (e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => S(e, o, k())));
			throw ne(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, it = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new D();
	return a.issues.length ? at(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
};
function at(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => S(e, n, k()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var ot = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? at(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, st = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), ct = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), lt = ((e, t, n) => {
	let r = e._zod.bag.validator;
	if (r !== void 0) {
		if (r(t) !== st) return !0;
		if (r.definite === !0 && n === void 0) return !1;
	}
	return ut(e, t, n);
});
function ut(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[ct] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new D();
	return a.issues.length === 0;
}
var dt = async (e, t, n) => {
	let r = n ? {
		...n,
		async: !0,
		abortEarly: !0
	} : {
		async: !0,
		abortEarly: !0
	}, i = e._zod.run({
		value: t,
		issues: []
	}, r);
	return i instanceof Promise && (i = await i), i.issues.length === 0;
}, ft = (e) => {
	let t = nt(e), n = (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return t(e, r, o, tt(n, a));
	};
	return n;
}, pt = (e) => {
	let t = nt(e), n = (e, r, i, a) => t(e, r, i, tt(n, a));
	return n;
}, mt = (e) => {
	let t = rt(e), n = async (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return await t(e, r, o, tt(n, a));
	};
	return n;
}, ht = (e) => {
	let t = rt(e), n = async (e, r, i, a) => await t(e, r, i, tt(n, a));
	return n;
}, gt = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return it(e)(t, n, i);
}, _t = (e) => (t, n, r) => it(e)(t, n, r), vt = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return ot(e)(t, n, i);
}, yt = (e) => async (t, n, r) => ot(e)(t, n, r), bt = /^[cC][0-9a-z]{6,}$/, xt = /^[0-9a-z]+$/, St = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Ct = /^[0-9a-vA-V]{20}$/, wt = /^[A-Za-z0-9]{27}$/, Tt = /^[a-zA-Z0-9_-]{21}$/;
function Et(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var Dt = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ot = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, kt = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, At = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, jt = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Mt() {
	return new RegExp(jt, "u");
}
var Nt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Pt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Ft = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, It = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Lt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Rt = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, zt = /^https?$/, Bt = /^\+[1-9]\d{6,14}$/, Vt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Ht(e) {
	return RegExp(`^${e}$`);
}
var Ut = /*@__PURE__*/ Ht(Vt);
function Wt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Gt(e) {
	return RegExp(`^${Wt(e)}$`);
}
function Kt(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Wt({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Wt({ precision: e.precision })}` : n;
	return RegExp(`^${Vt}T(?:${r})$`);
}
var qt = /^[\s\S]{0,}$/, Jt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, Yt = /^-?\d+$/, Xt = /^-?\d+(?:\.\d+)?$/, Zt = /^(?:true|false)$/i, Qt = /^null$/i, $t = /^[^A-Z]*$/, en = /^[^a-z]*$/, A = /*@__PURE__*/ E("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), tn = (e) => {
	let t = e.value;
	return !o(t) && t.length !== void 0;
}, nn = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, rn = /*@__PURE__*/ E("$ZodCheckLessThan", (e, t) => {
	A.init(e, t);
	let n = nn[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: nn[typeof r.value] ?? n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), an = /*@__PURE__*/ E("$ZodCheckGreaterThan", (e, t) => {
	A.init(e, t);
	let n = nn[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: nn[typeof r.value] ?? n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), on = /*@__PURE__*/ E("$ZodCheckMultipleOf", (e, t) => {
	A.init(e, t), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : c(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), sn = /*@__PURE__*/ E("$ZodCheckNumberFormat", (e, t) => {
	A.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = ue[t.format];
	e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), cn = /*@__PURE__*/ E("$ZodCheckMaxLength", (e, t) => {
	var n;
	A.init(e, t), (n = e._zod.def).when ?? (n.when = tn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Ee(r) : i) <= t.maximum) return;
		let a = De(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), ln = /*@__PURE__*/ E("$ZodCheckMinLength", (e, t) => {
	var n;
	A.init(e, t), (n = e._zod.def).when ?? (n.when = tn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Ee(r) : i) >= t.minimum) return;
		let a = De(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), un = /*@__PURE__*/ E("$ZodCheckLengthEquals", (e, t) => {
	var n;
	A.init(e, t), (n = e._zod.def).when ?? (n.when = tn), e._zod.check = (n) => {
		let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? Ee(r) : i;
		if (a === t.length) return;
		let o = De(r), s = a > t.length;
		n.issues.push({
			origin: o,
			...s ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), dn = /*@__PURE__*/ E("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	A.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), fn = /*@__PURE__*/ E("$ZodCheckRegex", (e, t) => {
	dn.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), pn = /*@__PURE__*/ E("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= $t, dn.init(e, t);
}), mn = /*@__PURE__*/ E("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= en, dn.init(e, t);
}), hn = /*@__PURE__*/ E("$ZodCheckIncludes", (e, t) => {
	A.init(e, t);
	let n = v(t.includes);
	t.pattern = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gn = /*@__PURE__*/ E("$ZodCheckStartsWith", (e, t) => {
	A.init(e, t);
	let n = RegExp(`^${v(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _n = /*@__PURE__*/ E("$ZodCheckEndsWith", (e, t) => {
	A.init(e, t);
	let n = RegExp(`.*${v(t.suffix)}$`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), vn = /*@__PURE__*/ E("$ZodCheckOverwrite", (e, t) => {
	A.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), yn = class {
	constructor(e = [], t = {}) {
		this.content = [], this.indent = 0, this.args = e, this.closed = t;
	}
	indented(e) {
		this.indent += 1;
		try {
			e(this);
		} finally {
			--this.indent;
		}
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.content ?? [""];
		return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
	}
}, bn = {
	major: 4,
	minor: 6,
	patch: 5
}, j = /*@__PURE__*/ E("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = bn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = x(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (xe(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new D();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (we(t.issues, n, e), i ||= x(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					we(t.issues, n, e), i ||= x(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (x(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new D();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new D();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return je(this, "~standard", Cn(this));
	},
	set "~standard"(e) {
		C(this, "~standard", e);
	}
}), xn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => S(e, t, k())) } : { value: e.value };
async function Sn(e, t) {
	let n = { async: !0 };
	return xn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Cn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return xn(r, n);
			} catch {}
			return Sn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var wn = /*@__PURE__*/ E("$ZodString", (e, t) => {
	j.init(e, t), e._zod.pattern = t.pattern ?? qt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), M = /*@__PURE__*/ E("$ZodStringFormat", (e, t) => {
	dn.init(e, t), wn.init(e, t);
}), Tn = /*@__PURE__*/ E("$ZodGUID", (e, t) => {
	t.pattern ??= Ot, M.init(e, t);
}), En = /*@__PURE__*/ E("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= kt(e);
	} else t.pattern ??= kt();
	M.init(e, t);
}), Dn = /*@__PURE__*/ E("$ZodEmail", (e, t) => {
	t.pattern ??= At, M.init(e, t);
});
function On(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function kn(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? On(e) || 2 : An(e, t);
}
function An(e, t) {
	if (!t.normalize && t.protocol?.source === zt.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			let t = URL;
			if (typeof t.parse == "function") return t.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
var jn = /[\t\n\r]/g;
function Mn(e) {
	return e.replace(jn, "");
}
function Nn(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Pn(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
var Fn = /*@__PURE__*/ E("$ZodURL", (e, t) => {
	M.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = kn(r, t);
			if (i === 1) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === 2) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === !0) {
				n.value = Mn(r);
				return;
			}
			t.hostname && !Nn(i, t.hostname) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), t.protocol && !Pn(i, t.protocol) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), n.value = t.normalize ? i.href : Mn(r);
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), In = /*@__PURE__*/ E("$ZodEmoji", (e, t) => {
	t.pattern ??= Mt(), M.init(e, t);
}), Ln = /*@__PURE__*/ E("$ZodNanoID", (e, t) => {
	if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
	t.pattern ??= t.length === void 0 ? Tt : Et(t.length), M.init(e, t);
}), Rn = /*@__PURE__*/ E("$ZodCUID", (e, t) => {
	t.pattern ??= bt, M.init(e, t);
}), zn = /*@__PURE__*/ E("$ZodCUID2", (e, t) => {
	t.pattern ??= xt, M.init(e, t);
}), Bn = /*@__PURE__*/ E("$ZodULID", (e, t) => {
	t.pattern ??= St, M.init(e, t);
}), Vn = /*@__PURE__*/ E("$ZodXID", (e, t) => {
	t.pattern ??= Ct, M.init(e, t);
}), Hn = /*@__PURE__*/ E("$ZodKSUID", (e, t) => {
	t.pattern ??= wt, M.init(e, t);
}), Un = /*@__PURE__*/ E("$ZodISODateTime", (e, t) => {
	t.pattern ??= Kt(t), M.init(e, t);
}), Wn = /*@__PURE__*/ E("$ZodISODate", (e, t) => {
	t.pattern ??= Ut, M.init(e, t);
}), Gn = /*@__PURE__*/ E("$ZodISOTime", (e, t) => {
	t.pattern ??= Gt(t), M.init(e, t);
}), Kn = /*@__PURE__*/ E("$ZodISODuration", (e, t) => {
	t.pattern ??= Dt, M.init(e, t);
}), qn = /*@__PURE__*/ E("$ZodIPv4", (e, t) => {
	t.pattern ??= Nt, M.init(e, t);
}), Jn = /^[0-9a-fA-F:.]+$/;
function Yn(e) {
	return Jn.test(e) ? On(`http://[${e}]`) : !1;
}
var Xn = /*@__PURE__*/ E("$ZodIPv6", (e, t) => {
	t.pattern ??= Pt, M.init(e, t), e._zod.check = (n) => {
		Yn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Zn = /*@__PURE__*/ E("$ZodCIDRv4", (e, t) => {
	t.pattern ??= Ft, M.init(e, t);
});
function Qn(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Yn(n);
}
var $n = /*@__PURE__*/ E("$ZodCIDRv6", (e, t) => {
	t.pattern ??= It, M.init(e, t), e._zod.check = (n) => {
		Qn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function er(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var tr = /^[0-9a-zA-Z+/]*={0,2}$/, nr = /*@__PURE__*/ E("$ZodBase64", (e, t) => {
	t.pattern ??= tr, M.init(e, t), e._zod.check = (n) => {
		er(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), rr = /^[A-Za-z0-9_-]*$/;
function ir(e) {
	if (!rr.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return er(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var ar = /*@__PURE__*/ E("$ZodBase64URL", (e, t) => {
	t.pattern ??= rr, M.init(e, t), e._zod.check = (n) => {
		ir(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), or = /*@__PURE__*/ E("$ZodE164", (e, t) => {
	t.pattern ??= Bt, M.init(e, t);
});
function sr(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var cr = /*@__PURE__*/ E("$ZodJWT", (e, t) => {
	M.init(e, t), e._zod.check = (n) => {
		sr(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), lr = /*@__PURE__*/ E("$ZodNumber", (e, t) => {
	j.init(e, t), e._zod.pattern = Xt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), ur = /*@__PURE__*/ E("$ZodNumberFormat", (e, t) => {
	sn.init(e, t), lr.init(e, t);
}), dr = /*@__PURE__*/ E("$ZodBoolean", (e, t) => {
	j.init(e, t), e._zod.pattern = Zt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), fr = /*@__PURE__*/ E("$ZodNull", (e, t) => {
	j.init(e, t), e._zod.pattern = Qt, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), pr = /*@__PURE__*/ E("$ZodUnknown", (e, t) => {
	j.init(e, t), e._zod.parse = (e) => e;
}), mr = /*@__PURE__*/ E("$ZodNever", (e, t) => {
	j.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function hr(e, t, n) {
	e.issues.length && t.issues.push(...Se(n, e.issues)), t.value[n] = e.value;
}
var gr = /*@__PURE__*/ E("$ZodArray", (e, t) => {
	j.init(e, t);
	let n = O.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => hr(t, r, e)));
			else if (hr(c, r, e), s && c.issues.length !== 0 && x(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function _r(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Se(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var vr = [];
function yr(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : vr, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = le(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function br(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (x(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => _r(e, n, i, t, d, f))) : _r(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var xr = /*@__PURE__*/ E("$ZodObject", (e, t) => {
	j.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = a(() => yr(t));
	T(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || l(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let o = re, s = t.catchall, c, u = O.memoizer;
	u?.attach(e), e._zod.parse = (t, n) => {
		c ??= i.value;
		let r = t.value;
		if (!o(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = u ? u.alloc(e, t, {}, n) : {};
		let a = [], l = c.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of c.allKeys) {
			if (d && t.issues.length !== f) {
				if (x(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = l[e], o = i._zod.optin, s = i._zod.optout, c = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			c instanceof Promise ? a.push(c.then((n) => _r(n, t, e, r, o, s))) : _r(c, t, e, r, o, s);
		}
		return s ? br(a, r, t, n, i.value, e, d === !0) : a.length ? Promise.all(a).then(() => t) : t;
	};
}), Sr = /*@__PURE__*/ E("$ZodObjectJIT", (e, t) => {
	xr.init(e, t);
	let n = e._zod.parse, r = a(() => yr(t)), i = O.memoizer, o = (t) => {
		let n = r.value, a = n.symbolKeys, o = new yn(["payload", "ctx"], {
			shape: t,
			inst: e,
			memo: i,
			syms: a
		}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		o.write("const input = payload.value;");
		let l = Object.create(null), u = 0;
		for (let e of n.allKeys) l[e] = `key_${u++}`;
		o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
		for (let e of n.allKeys) {
			if (e === "__proto__") continue;
			let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : ee(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
			if (o.write(`const ${n} = ${s(r)};`), f && p) {
				let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
				o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
			} else f ? (o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
      `), d === "defaulted" ? o.write(`newResult[${r}] = ${n}.value;`) : o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
		}
		return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
	}, s, c = re, l = !O.jitless, u = l && ie.value, d = t.catchall, f;
	e._zod.parse = (i, a) => {
		f ??= r.value;
		let p = i.value;
		return c(p) ? l && u && a?.async === !1 && a.jitless !== !0 ? (s ||= o(t.shape), i = s(i, a), d ? br([], p, i, a, f, e, a?.abortEarly === !0) : i) : n(i, a) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), i);
	};
});
function Cr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !x(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => S(e, r, k())))
	}), t);
}
var wr = /*@__PURE__*/ E("$ZodUnion", (e, t) => {
	j.init(e, t), T(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), T(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), T(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), T(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => s(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => Cr(t, r, e, i)) : Cr(o, r, e, i);
	};
});
function Tr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var Er = /*@__PURE__*/ E("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, wr.init(e, t);
	let n = e._zod.parse;
	T(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || l(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = u(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = a(() => Tr(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!re(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), Dr = /*@__PURE__*/ E("$ZodIntersection", (e, t) => {
	j.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => kr(e, t, n)) : kr(e, i, a);
	};
});
function Or(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (_(e) && _(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Or(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Or(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function kr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = Or(t.value, n.value);
	if (!c.valid) {
		if (x(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
var Ar = /*@__PURE__*/ E("$ZodRecord", (e, t) => {
	j.init(e, t);
	let n = O.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!_(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => S(e, i, k())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...Se(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...Se(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && Xt.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => S(e, i, k())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...Se(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...Se(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), jr = /*@__PURE__*/ E("$ZodEnum", (e, n) => {
	j.init(e, n);
	let r = t(n.entries), i = new Set(r);
	e._zod.values = i, T(e, "pattern", (e) => {
		let n = t(e.def.entries).filter((e) => oe.has(typeof e));
		return RegExp(n.length ? `^(${n.map((e) => v(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, n) => {
		let a = t.value;
		return i.has(a) || t.issues.push({
			code: "invalid_value",
			values: r,
			input: a,
			inst: e
		}), t;
	};
}), Mr = /*@__PURE__*/ E("$ZodLiteral", (e, t) => {
	j.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, T(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? v(e) : e ? v(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Nr = /*@__PURE__*/ E("$ZodTransform", (e, t) => {
	j.init(e, t), e._zod.optin = "optional", O.memoizer?.guard(e), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new We(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new D();
		return n.value = i, n;
	};
});
function Pr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Fr = /*@__PURE__*/ E("$ZodOptional", (e, t) => {
	j.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", T(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), T(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${s(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Pr(e, t)) : Pr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Ir = /*@__PURE__*/ E("$ZodExactOptional", (e, t) => {
	Fr.init(e, t), T(e, "values", (e) => e.def.innerType._zod.values), T(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Lr = /*@__PURE__*/ E("$ZodNullable", (e, t) => {
	j.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin), T(e, "optout", (e) => e.def.innerType._zod.optout), T(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${s(t.source)}|null)$`) : void 0;
	}), T(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Rr = /*@__PURE__*/ E("$ZodDefault", (e, t) => {
	j.init(e, t), e._zod.optin = "defaulted", T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => zr(e, t)) : zr(r, t);
	};
});
function zr(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Br = /*@__PURE__*/ E("$ZodPrefault", (e, t) => {
	j.init(e, t), e._zod.optin = "defaulted", T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Vr = /*@__PURE__*/ E("$ZodNonOptional", (e, t) => {
	j.init(e, t), T(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Hr(t, e)) : Hr(i, e);
	};
});
function Hr(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function Ur(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => S(e, r, k())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
var Wr = /*@__PURE__*/ E("$ZodCatch", (e, t) => {
	j.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), T(e, "optout", (e) => e.def.innerType._zod.optout), T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run({
			value: e.value,
			issues: []
		}, n);
		return r instanceof Promise ? r.then((r) => Ur(e, r, t, n)) : Ur(e, r, t, n);
	};
}), Gr = /*@__PURE__*/ E("$ZodPipe", (e, t) => {
	j.init(e, t), T(e, "values", (e) => e.def.in._zod.values), T(e, "optin", (e) => e.def.in._zod.optin), T(e, "optout", (e) => e.def.out._zod.optout), T(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Kr(e, t.in, n)) : Kr(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Kr(e, t.out, n)) : Kr(r, t.out, n);
	};
});
function Kr(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var qr = /*@__PURE__*/ E("$ZodReadonly", (e, t) => {
	j.init(e, t), T(e, "propValues", (e) => e.def.innerType._zod.propValues), T(e, "values", (e) => e.def.innerType._zod.values), T(e, "optin", (e) => e.def.innerType?._zod?.optin), T(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Jr) : Jr(r);
	};
});
function Jr(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function Yr(e) {
	let t = e._zod.def, n = t.pattern, r = !!t.format?.includes("int"), i, a;
	for (let e of t.checks ?? []) {
		let t = e._zod.def;
		t.pattern && (n = t.pattern), r ||= !!t.format?.includes("int");
		let o = t.minimum ?? t.length, s = t.maximum ?? t.length;
		o !== void 0 && (i === void 0 || o > i) && (i = o), s !== void 0 && (a === void 0 || s < a) && (a = s);
	}
	if (n) return n.source;
	if (i !== void 0 && a !== void 0 && i > a) return "(?!)";
	if (i !== void 0 || a !== void 0) return Jt({
		minimum: i,
		maximum: a
	}).source;
	let o = e._zod.pattern;
	return (r && o === Xt ? Yt : o)?.source;
}
function Xr(e) {
	let t = e._zod.def, n = e._zod.pattern?.source, r = t.innerType ?? e._zod.innerType;
	if (r) {
		let e = r._zod.pattern?.source, t = Xr(r);
		return n && e && t && t !== e ? n.replace(s(e), () => s(t)) : n;
	}
	if (t.options) {
		let e = t.options.map(Xr);
		if (e.every(Boolean)) return `^(${e.map((e) => s(e)).join("|")})$`;
	}
	return Yr(e);
}
var Zr = /*@__PURE__*/ E("$ZodTemplateLiteral", (e, t) => {
	j.init(e, t);
	let n = [];
	for (let e of t.parts) if (typeof e == "object" && e) {
		let t = Xr(e);
		if (!t) throw Error(`Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`);
		n.push(s(t));
	} else if (e === null || se.has(typeof e)) n.push(v(`${e}`));
	else throw Error(`Invalid template literal part: ${e}`);
	e._zod.pattern = RegExp(`^${n.join("")}$`), e._zod.parse = (n, r) => typeof n.value == "string" ? (e._zod.pattern.lastIndex = 0, e._zod.pattern.test(n.value) || n.issues.push({
		input: n.value,
		inst: e,
		code: "invalid_format",
		format: t.format ?? "template_literal",
		pattern: e._zod.pattern.source
	}), n) : (n.issues.push({
		input: n.value,
		inst: e,
		expected: "string",
		code: "invalid_type"
	}), n);
}), Qr = /*@__PURE__*/ E("$ZodCustom", (e, t) => {
	A.init(e, t), j.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => $r(t, n, r, e));
		$r(i, n, r, e);
	};
});
function $r(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(ke(e));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
var ei = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, ti = "~memo", ni = [];
function ri(e) {
	return typeof e == "object" && !!e;
}
function ii(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var ai = /*@__PURE__*/ new WeakMap(), oi = 0, si = 1, ci = 2;
function li(e, t, n) {
	let r = ai.get(e);
	if (r !== void 0) return r ? ci : oi;
	if (t.has(e)) return ci;
	t.add(e);
	let i = oi, a = (e) => {
		if (i !== ci && e?._zod) {
			let r = li(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = oi;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? si : o.value?._zod ? li(o.value, t, n) : oi;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = u(c);
			s(e ? o(e, !0) : si), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? li(r, t, !1) : si);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), ui(e, i);
}
function ui(e, t) {
	return t !== si && ai.set(e, t === ci), t;
}
function di(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var fi, pi = [], mi = {
	alloc(e, t, n) {
		let r = fi;
		if (!r) return n;
		fi = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), pi.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && gi(n, e.value)) throw new ei();
				return t(e, n);
			};
			e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
		});
	},
	attach(e) {
		var t;
		let n, r = !1, i, a;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, o = (s, c) => {
				if (n === void 0) {
					let i = li(e, /* @__PURE__ */ new Set(), !1);
					if (i === oi) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === ci || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!ri(l)) return t(s, c);
				let u = c[ti];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[ti] = u);
				let d;
				i === c ? d = a : (d = di(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...ii(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				fi = d;
				let p = pi.length, m = t(s, c);
				fi = void 0;
				let h = pi.length > p ? pi.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? ii(e.issues) : ni), e)) : (h && (h.issues = m.issues.length ? ii(m.issues) : ni), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function hi() {
	return mi;
}
function gi(e, t) {
	let n = e[ti]?.backEdges;
	return n !== void 0 && ri(t) && n.has(t);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var _i = () => {
	let e = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let r = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, i = { nan: "NaN" };
	function a(e, t) {
		return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : i[e] ?? e;
	}
	return (e) => {
		switch (e.code) {
			case "invalid_type": return `Invalid input: expected ${a(e.expected)}, received ${a(Oe(e.input), e.input)}`;
			case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${ce(e.values[0])}` : `Invalid option: expected one of ${n(e.values, "|")}`;
			case "too_big": {
				let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
			}
			case "too_small": {
				let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case "invalid_format": {
				let t = e;
				return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${r[t.format] ?? e.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${n(e.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${e.origin}`;
			case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element": return `Invalid value in ${e.origin}`;
			default: return "Invalid input";
		}
	};
};
function vi() {
	return { localeError: _i() };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var yi, bi = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function xi() {
	return new bi();
}
(yi = globalThis).__zod_globalRegistry ?? (yi.__zod_globalRegistry = xi());
var Si = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function Ci(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function wi(e, t) {
	return new e(Ci({
		type: "string",
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Ti(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ei(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Di(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Oi(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ki(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ai(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ji(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mi(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ni(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pi(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fi(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ii(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Li(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zi(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vi(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hi(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wi(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gi(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ki(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qi(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ji(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yi(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xi(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t) {
	return new e(Ci({
		type: "number",
		checks: [],
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Qi(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $i(e, t) {
	return new e({
		type: "boolean",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ea(e, t) {
	return new e({
		type: "null",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ta(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function na(e, t) {
	return new e({
		type: "never",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ra(e, t) {
	return new rn({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function ia(e, t) {
	return new rn({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function aa(e, t) {
	return new an({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function oa(e, t) {
	return new an({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function sa(e, t) {
	return new on({
		check: "multiple_of",
		...b(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function ca(e, t) {
	return new cn({
		check: "max_length",
		...b(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function la(e, t) {
	return new ln({
		check: "min_length",
		...b(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function ua(e, t) {
	return new un({
		check: "length_equals",
		...b(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function da(e, t) {
	return new fn({
		check: "string_format",
		format: "regex",
		...b(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function fa(e) {
	return new pn({
		check: "string_format",
		format: "lowercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function pa(e) {
	return new mn({
		check: "string_format",
		format: "uppercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ma(e, t) {
	return new hn({
		check: "string_format",
		format: "includes",
		...b(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function ha(e, t) {
	return new gn({
		check: "string_format",
		format: "starts_with",
		...b(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ga(e, t) {
	return new _n({
		check: "string_format",
		format: "ends_with",
		...b(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function _a(e) {
	return new vn({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function va(e) {
	return /* @__PURE__ */ _a((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function ya() {
	return /* @__PURE__ */ _a((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ba() {
	return /* @__PURE__ */ _a((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function xa() {
	return /* @__PURE__ */ _a((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Sa() {
	return /* @__PURE__ */ _a((e) => te(e));
}
// @__NO_SIDE_EFFECTS__
function Ca(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function wa(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Ta(e, t) {
	let n = /* @__PURE__ */ Ea((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(ke(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(ke(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Ea(e, t) {
	let n = new A({
		check: "custom",
		...b(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function Da(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && l(e, t, n[t]);
	return e;
}
function Oa(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Si,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function N(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function P(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, P(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Da(o.schema, c), t.io === "input" && F(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function ka(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Aa(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${ka(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + ka(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		r.count > 1 && e.reused === "ref" && a(n);
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function ja(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		ja(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
var Ma = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), Na = ["oneOf", "anyOf"];
function Pa(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Fa(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Ma.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Pa(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			l(n, r, e.length === 1 ? e[0] : Fa(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = Pa(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Ia(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Ma) if (t in e) return;
	let n = t.filter((e) => Na.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Fa(t);
	else {
		let e = n[0], i = Na.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Fa([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Da(e, r));
}
function La(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Da(i, s), Da(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) ja(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Ia(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Da(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, l(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: za(t, "input", e.processors),
					output: za(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function F(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return F(r.element, n);
	if (r.type === "set") return F(r.valueType, n);
	if (r.type === "lazy") return F(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return F(r.innerType, n);
	if (r.type === "intersection") return F(r.left, n) || F(r.right, n);
	if (r.type === "record" || r.type === "map") return F(r.keyType, n) || F(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : F(r.in, n) || F(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (F(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (F(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (F(e, n)) return !0;
		return !!(r.rest && F(r.rest, n));
	}
	return !1;
}
var Ra = (e, t = {}) => (n) => {
	let r = Oa({
		...n,
		processors: t
	});
	return P(e, r), Aa(r, e), La(r, e);
}, za = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Oa({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return P(e, o), Aa(o, e), La(o, e);
}, Ba = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, Va = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, Ha = (e, t) => {
	Ba(e, "minimum", t), Va(e, "maximum", t);
}, Ua = (e, t) => {
	e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
}, Wa = (e, t) => {
	e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
}, Ga = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, Ka = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, qa = (e, t) => Ba(e, "minimum", t.minimum), Ja = (e, t) => Va(e, "maximum", t.maximum), Ya = (e) => (t, n) => {
	Ka(t, n.format);
	let [r, i] = e[n.format];
	Ba(t, "minimum", r), Va(t, "maximum", i);
}, Xa = {
	greater_than: (e, t) => Ba(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => Va(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => Ua(e, t.value),
	number_format: Ya(ue),
	bigint_format: Ya(de),
	min_length: qa,
	max_length: Ja,
	length_equals: (e, t) => Ha(e, t.length),
	min_size: qa,
	max_size: Ja,
	size_equals: (e, t) => Ha(e, t.size),
	string_format: (e, t) => {
		Ka(e, t.format), t.pattern && Wa(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => Ga(e, t.mime)
};
function I(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) Xa[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && Ba(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && Ba(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && Va(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && Va(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && Ua(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && Ga(t, i.mime);
	for (let e of i.patterns ?? []) Wa(t, e);
	return t;
}
var Za = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, Qa = /* @__PURE__ */ new Map([[tr, Lt], [rr, Rt]]), $a = (e) => Qa.get(e) ?? e, eo = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = I(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Za[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map($a);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, to = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = I(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : N(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, no = (e, t, n, r) => {
	n.type = "boolean";
}, ro = (e, t, n, r) => {
	N(e, t, n, r, "BigInt cannot be represented in JSON Schema");
}, io = (e, t, n, r) => {
	N(e, t, n, r, "Symbols cannot be represented in JSON Schema");
}, ao = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, oo = (e, t, n, r) => {
	N(e, t, n, r, "Undefined cannot be represented in JSON Schema");
}, so = (e, t, n, r) => {
	N(e, t, n, r, "Void cannot be represented in JSON Schema");
}, co = (e, t, n, r) => {
	n.not = {};
}, lo = (e, t, n, r) => {}, uo = (e, t, n, r) => {}, fo = (e, t, n, r) => {
	N(e, t, n, r, "Date cannot be represented in JSON Schema");
}, po = (e, n, r, i) => {
	let a = e._zod.def, o = t(a.entries);
	if (o.length === 0) {
		r.not = {};
		return;
	}
	o.every((e) => typeof e == "number") && (r.type = "number"), o.every((e) => typeof e == "string") && (r.type = "string"), r.enum = o;
}, mo = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (N(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (N(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, ho = (e, t, n, r) => {
	N(e, t, n, r, "NaN cannot be represented in JSON Schema");
}, go = (e, t, n, r) => {
	let i = n, a = e._zod.pattern;
	if (!a) throw Error("Pattern not found in template literal");
	i.type = "string", i.pattern = a.source;
}, _o = (e, t, n, r) => {
	let i = n;
	i.type = "string", i.format = "binary", i.contentEncoding = "binary";
	let { minimum: a, maximum: o, mime: s } = I(e);
	a !== void 0 && (i.minLength = a), o !== void 0 && (i.maxLength = o), s && (s.length === 0 ? i.not = {} : s.length === 1 ? i.contentMediaType = s[0] : i.anyOf = s.map((e) => ({ contentMediaType: e })));
}, vo = (e, t, n, r) => {
	n.type = "boolean";
}, yo = (e, t, n, r) => {
	N(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, bo = (e, t, n, r) => {
	N(e, t, n, r, "Function types cannot be represented in JSON Schema");
}, xo = (e, t, n, r) => {
	N(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, So = (e, t, n, r) => {
	N(e, t, n, r, "Map cannot be represented in JSON Schema");
}, Co = (e, t, n, r) => {
	N(e, t, n, r, "Set cannot be represented in JSON Schema");
}, wo = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = I(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = P(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function To(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? To(t.out) : t.type === "catch" ? To(t.innerType) : e._zod.optin;
}
var Eo = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && N(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) l(i.properties, e, P(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	}));
	let s = [];
	for (let e of Object.keys(o)) {
		let n = a.shape[e];
		(t.io === "input" ? To(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = P(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Do = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => P(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Oo = (e, t, n, r) => {
	let i = e._zod.def, a = P(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = P(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
}, ko = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "array";
	let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => P(e, t, {
		...r,
		path: [
			...r.path,
			o,
			n
		]
	})), l = a.rest ? P(a.rest, t, {
		...r,
		path: [
			...r.path,
			s,
			...t.target === "openapi-3.0" ? [a.items.length] : []
		]
	}) : null, u = a.items.length;
	for (; u > 0;) {
		let e = a.items[u - 1];
		if (!(t.io === "input" ? To(e) !== void 0 : e._zod.optout === "optional")) break;
		u--;
	}
	let d = a.items.length, f = !a.rest;
	t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
	let { minimum: p, maximum: m } = I(e);
	typeof p == "number" && (i.minItems = p), typeof m == "number" && (i.maxItems = m);
};
function Ao(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Ao(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Ao(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? Xt : Yt).source), p) : p;
}
var jo = /* @__PURE__ */ new WeakMap();
function Mo(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of jo.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Ao(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var No = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = I(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = P(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) l(i.patternProperties, $a(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = P(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = jo.get(t);
			n || (n = [], jo.set(t, n), t.deferred.push(() => Mo(t))), n.push(e);
		}
		i.additionalProperties = P(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, u = t.io === "input" && To(a.valueType) !== void 0;
	if (c && !a.partial && !u) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, Po = (e, t, n, r) => {
	let i = e._zod.def, a = P(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Fo = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Io = Symbol();
function Lo(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (N(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Io) : JSON.parse(o);
}
var Ro = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = Lo(i.defaultValue, e, t, n, r);
	o !== Io && (n.default = o);
}, zo = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = Lo(i.defaultValue, e, t, n, r);
	o !== Io && (n._prefault = o);
}, Bo = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		N(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, Vo = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	P(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Ho = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Uo = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Wo = (e, t, n, r) => {
	let i = e._zod.def;
	P(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Go = {
	string: eo,
	number: to,
	boolean: no,
	bigint: ro,
	symbol: io,
	null: ao,
	undefined: oo,
	void: so,
	never: co,
	any: lo,
	unknown: uo,
	date: fo,
	enum: po,
	literal: mo,
	nan: ho,
	template_literal: go,
	file: _o,
	success: vo,
	custom: yo,
	function: bo,
	transform: xo,
	map: So,
	set: Co,
	array: wo,
	object: Eo,
	union: Do,
	intersection: Oo,
	tuple: ko,
	record: No,
	nullable: Po,
	nonoptional: Fo,
	default: Ro,
	prefault: zo,
	catch: Bo,
	pipe: Vo,
	readonly: Ho,
	promise: Uo,
	optional: Wo,
	lazy: (e, t, n, r) => {
		let i = e._zod.innerType;
		P(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}
};
function Ko(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Oa({
			...t,
			processors: Go
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			P(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			Aa(r, n), l(a, t, La(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Oa({
		...t,
		processors: Go
	});
	return P(e, n), Aa(n, e), La(n, e);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
var qo = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function Jo(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var L = /*@__PURE__*/ E("ZodError", (e, t) => {
	Ze.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	qo.has(n) || (qo.add(n), Jo(n, "format", (e) => (t) => et(e, t)), Jo(n, "flatten", (e) => (t) => $e(e, t)), Jo(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, r, 2);
	}), Jo(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, r, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, void 0, { Parent: Error }), Yo = /* @__PURE__ */ nt(L), Xo = /* @__PURE__ */ rt(L), Zo = /* @__PURE__ */ it(L), Qo = /* @__PURE__ */ ot(L), $o = /* @__PURE__ */ ft(L), es = /* @__PURE__ */ pt(L), ts = /* @__PURE__ */ mt(L), ns = /* @__PURE__ */ ht(L), rs = /* @__PURE__ */ gt(L), is = /* @__PURE__ */ _t(L), as = /* @__PURE__ */ vt(L), os = /* @__PURE__ */ yt(L);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function ss() {
	O.localeError || k(vi());
}
function cs() {
	O.memoizer || k({ memoizer: hi() });
}
var R = /*@__PURE__*/ E("ZodType", (e, t) => (ss(), j.init(e, t), e.def = t, e.type = t.type, e), {
	check(...e) {
		let t = this.def;
		return this.clone(g(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return y(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(wc(e, t));
	},
	superRefine(e, t) {
		return this.check(Tc(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ _a(e));
	},
	optional() {
		return ic(this);
	},
	exactOptional() {
		return oc(this);
	},
	nullable() {
		return cc(this);
	},
	nullish() {
		return ic(cc(this));
	},
	nonoptional(e) {
		return mc(this, e);
	},
	array() {
		return U(this);
	},
	or(e) {
		return G([this, e]);
	},
	and(e) {
		return Zs(this, e);
	},
	transform(e) {
		return vc(this, nc(e));
	},
	default(e) {
		return uc(this, e);
	},
	prefault(e) {
		return fc(this, e);
	},
	catch(e) {
		return gc(this, e);
	},
	pipe(e) {
		return vc(this, e);
	},
	readonly() {
		return bc(this);
	},
	describe(e) {
		let t = this.clone();
		return Si.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return Si.get(this);
		let t = this.clone();
		return Si.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	},
	get "~standard"() {
		return je(this, "~standard", {
			...Cn(this),
			jsonSchema: {
				input: za(this, "input"),
				output: za(this, "output")
			}
		});
	},
	set "~standard"(e) {
		C(this, "~standard", e);
	},
	parse: function e(t, n) {
		return Yo(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await Xo(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return Zo(this, e, t);
	},
	async safeParseAsync(e, t) {
		return Qo(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		C(this, "spa", e);
	},
	validate(e, t) {
		return lt(this, e, t);
	},
	validateAsync(e, t) {
		return dt(this, e, t);
	},
	encode: function e(t, n) {
		return $o(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return es(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await ts(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await ns(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return rs(this, e, t);
	},
	safeDecode(e, t) {
		return is(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return as(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return os(this, e, t);
	},
	toJSONSchema(e) {
		return Ra(this, {})(e);
	},
	get description() {
		return Si.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), ls = /*@__PURE__*/ E("_ZodString", (e, t) => {
	wn.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => eo(e, t, n, r);
}, /*@__PURE__*/ Me({
	format: (e) => I(e).format ?? null,
	minLength: (e) => I(e).minimum ?? null,
	maxLength: (e) => I(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(/* @__PURE__ */ da(...e));
	},
	includes(...e) {
		return this.check(/* @__PURE__ */ ma(...e));
	},
	startsWith(...e) {
		return this.check(/* @__PURE__ */ ha(...e));
	},
	endsWith(...e) {
		return this.check(/* @__PURE__ */ ga(...e));
	},
	min(...e) {
		return this.check(/* @__PURE__ */ la(...e));
	},
	max(...e) {
		return this.check(/* @__PURE__ */ ca(...e));
	},
	length(...e) {
		return this.check(/* @__PURE__ */ ua(...e));
	},
	nonempty(...e) {
		return this.check(/* @__PURE__ */ la(1, ...e));
	},
	lowercase(e) {
		return this.check(/* @__PURE__ */ fa(e));
	},
	uppercase(e) {
		return this.check(/* @__PURE__ */ pa(e));
	},
	trim() {
		return this.check(/* @__PURE__ */ ya());
	},
	normalize(...e) {
		return this.check(/* @__PURE__ */ va(...e));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ ba());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ xa());
	},
	slugify() {
		return this.check(/* @__PURE__ */ Sa());
	}
})), us = /*@__PURE__*/ E("ZodString", (e, t) => {
	wn.init(e, t), ls.init(e, t);
}, {
	email(e) {
		return this.check(/* @__PURE__ */ Ti(hs, e));
	},
	url(e) {
		return this.check(/* @__PURE__ */ ji(vs, e));
	},
	jwt(e) {
		return this.check(/* @__PURE__ */ Ki(Ns, e));
	},
	emoji(e) {
		return this.check(/* @__PURE__ */ Mi(ys, e));
	},
	guid(e) {
		return this.check(/* @__PURE__ */ Ei(gs, e));
	},
	uuid(e) {
		return this.check(/* @__PURE__ */ Di(_s, e));
	},
	uuidv4(e) {
		return this.check(/* @__PURE__ */ Oi(_s, e));
	},
	uuidv6(e) {
		return this.check(/* @__PURE__ */ ki(_s, e));
	},
	uuidv7(e) {
		return this.check(/* @__PURE__ */ Ai(_s, e));
	},
	nanoid(e) {
		return this.check(/* @__PURE__ */ Ni(bs, e));
	},
	cuid(e) {
		return this.check(/* @__PURE__ */ Pi(xs, e));
	},
	cuid2(e) {
		return this.check(/* @__PURE__ */ Fi(Ss, e));
	},
	ulid(e) {
		return this.check(/* @__PURE__ */ Ii(Cs, e));
	},
	base64(e) {
		return this.check(/* @__PURE__ */ Ui(As, e));
	},
	base64url(e) {
		return this.check(/* @__PURE__ */ Wi(js, e));
	},
	xid(e) {
		return this.check(/* @__PURE__ */ Li(ws, e));
	},
	ksuid(e) {
		return this.check(/* @__PURE__ */ Ri(Ts, e));
	},
	ipv4(e) {
		return this.check(/* @__PURE__ */ zi(Es, e));
	},
	ipv6(e) {
		return this.check(/* @__PURE__ */ Bi(Ds, e));
	},
	cidrv4(e) {
		return this.check(/* @__PURE__ */ Vi(Os, e));
	},
	cidrv6(e) {
		return this.check(/* @__PURE__ */ Hi(ks, e));
	},
	e164(e) {
		return this.check(/* @__PURE__ */ Gi(Ms, e));
	},
	datetime(e) {
		return this.check(/* @__PURE__ */ qi(ds, e));
	},
	date(e) {
		return this.check(/* @__PURE__ */ Ji(fs, e));
	},
	time(e) {
		return this.check(/* @__PURE__ */ Yi(ps, e));
	},
	duration(e) {
		return this.check(/* @__PURE__ */ Xi(ms, e));
	}
});
function z(e) {
	return /* @__PURE__ */ wi(us, e);
}
var B = /*@__PURE__*/ E("ZodStringFormat", (e, t) => {
	M.init(e, t), ls.init(e, t);
}), ds = /*@__PURE__*/ E("ZodISODateTime", (e, t) => {
	Un.init(e, t), B.init(e, t);
}), fs = /*@__PURE__*/ E("ZodISODate", (e, t) => {
	Wn.init(e, t), B.init(e, t);
}), ps = /*@__PURE__*/ E("ZodISOTime", (e, t) => {
	Gn.init(e, t), B.init(e, t);
}), ms = /*@__PURE__*/ E("ZodISODuration", (e, t) => {
	Kn.init(e, t), B.init(e, t);
}), hs = /*@__PURE__*/ E("ZodEmail", (e, t) => {
	Dn.init(e, t), B.init(e, t);
}), gs = /*@__PURE__*/ E("ZodGUID", (e, t) => {
	Tn.init(e, t), B.init(e, t);
}), _s = /*@__PURE__*/ E("ZodUUID", (e, t) => {
	En.init(e, t), B.init(e, t);
}), vs = /*@__PURE__*/ E("ZodURL", (e, t) => {
	Fn.init(e, t), B.init(e, t);
}), ys = /*@__PURE__*/ E("ZodEmoji", (e, t) => {
	In.init(e, t), B.init(e, t);
}), bs = /*@__PURE__*/ E("ZodNanoID", (e, t) => {
	Ln.init(e, t), B.init(e, t);
}), xs = /*@__PURE__*/ E("ZodCUID", (e, t) => {
	Rn.init(e, t), B.init(e, t);
}), Ss = /*@__PURE__*/ E("ZodCUID2", (e, t) => {
	zn.init(e, t), B.init(e, t);
}), Cs = /*@__PURE__*/ E("ZodULID", (e, t) => {
	Bn.init(e, t), B.init(e, t);
}), ws = /*@__PURE__*/ E("ZodXID", (e, t) => {
	Vn.init(e, t), B.init(e, t);
}), Ts = /*@__PURE__*/ E("ZodKSUID", (e, t) => {
	Hn.init(e, t), B.init(e, t);
}), Es = /*@__PURE__*/ E("ZodIPv4", (e, t) => {
	qn.init(e, t), B.init(e, t);
}), Ds = /*@__PURE__*/ E("ZodIPv6", (e, t) => {
	Xn.init(e, t), B.init(e, t);
}), Os = /*@__PURE__*/ E("ZodCIDRv4", (e, t) => {
	Zn.init(e, t), B.init(e, t);
}), ks = /*@__PURE__*/ E("ZodCIDRv6", (e, t) => {
	$n.init(e, t), B.init(e, t);
}), As = /*@__PURE__*/ E("ZodBase64", (e, t) => {
	nr.init(e, t), B.init(e, t);
}), js = /*@__PURE__*/ E("ZodBase64URL", (e, t) => {
	ar.init(e, t), B.init(e, t);
}), Ms = /*@__PURE__*/ E("ZodE164", (e, t) => {
	or.init(e, t), B.init(e, t);
}), Ns = /*@__PURE__*/ E("ZodJWT", (e, t) => {
	cr.init(e, t), B.init(e, t);
}), Ps = /*@__PURE__*/ E("ZodNumber", (e, t) => {
	lr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => to(e, t, n, r), e.isFinite = !0;
}, /*@__PURE__*/ Me({
	minValue: (e) => {
		let { minimum: t, exclusiveMinimum: n } = I(e);
		return Math.max(t ?? -Infinity, n ?? -Infinity);
	},
	maxValue: (e) => {
		let { maximum: t, exclusiveMaximum: n } = I(e);
		return Math.min(t ?? Infinity, n ?? Infinity);
	},
	isInt: (e) => {
		let { isInt: t, multipleOf: n } = I(e);
		return !!t || !!n?.some(Number.isSafeInteger);
	},
	format: (e) => I(e).format ?? null
}, {
	gt(e, t) {
		return this.check(/* @__PURE__ */ aa(e, t));
	},
	gte(e, t) {
		return this.check(/* @__PURE__ */ oa(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ oa(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ ra(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ ia(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ ia(e, t));
	},
	int(e) {
		return this.check(Is(e));
	},
	safe(e) {
		return this.check(Is(e));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ aa(0, e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ oa(0, e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ ra(0, e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ ia(0, e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ sa(e, t));
	},
	step(e, t) {
		return this.check(/* @__PURE__ */ sa(e, t));
	},
	finite() {
		return this;
	}
}));
function V(e) {
	return /* @__PURE__ */ Zi(Ps, e);
}
var Fs = /*@__PURE__*/ E("ZodNumberFormat", (e, t) => {
	ur.init(e, t), Ps.init(e, t);
});
function Is(e) {
	return /* @__PURE__ */ Qi(Fs, e);
}
var Ls = /*@__PURE__*/ E("ZodBoolean", (e, t) => {
	dr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => no(e, t, n, r);
});
function H(e) {
	return /* @__PURE__ */ $i(Ls, e);
}
var Rs = /*@__PURE__*/ E("ZodNull", (e, t) => {
	fr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => ao(e, t, n, r);
});
function zs(e) {
	return /* @__PURE__ */ ea(Rs, e);
}
var Bs = /*@__PURE__*/ E("ZodUnknown", (e, t) => {
	pr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Vs() {
	return /* @__PURE__ */ ta(Bs);
}
var Hs = /*@__PURE__*/ E("ZodNever", (e, t) => {
	mr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => co(e, t, n, r);
});
function Us(e) {
	return /* @__PURE__ */ na(Hs, e);
}
var Ws = /*@__PURE__*/ E("ZodArray", (e, t) => {
	cs(), gr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => wo(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(/* @__PURE__ */ la(e, t));
	},
	nonempty(e) {
		return this.check(/* @__PURE__ */ la(1, e));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ ca(e, t));
	},
	length(e, t) {
		return this.check(/* @__PURE__ */ ua(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function U(e, t) {
	return /* @__PURE__ */ Ca(Ws, e, t);
}
var Gs = /*@__PURE__*/ E("ZodObject", (e, t) => {
	cs(), Sr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Eo(e, t, n, r), Le(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return q(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(g(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(g(this._zod.def, { catchall: Vs() }));
	},
	loose() {
		return this.clone(g(this._zod.def, { catchall: Vs() }));
	},
	strict() {
		return this.clone(g(this._zod.def, { catchall: Us() }));
	},
	strip() {
		return this.clone(g(this._zod.def, { catchall: void 0 }));
	},
	extend(e) {
		return he(this, e);
	},
	safeExtend(e) {
		return _e(this, e);
	},
	merge(e) {
		return ve(this, e);
	},
	pick(e) {
		return fe(this, e);
	},
	omit(e) {
		return me(this, e);
	},
	partial(...e) {
		return ye(rc, this, e[0]);
	},
	exactPartial(...e) {
		return ye(ac, this, e[0], "exactPartial");
	},
	required(...e) {
		return be(pc, this, e[0]);
	}
});
function W(e, t) {
	return new Gs({
		type: "object",
		shape: e ?? {},
		...b(t)
	});
}
function Ks(e, t) {
	return new Gs({
		type: "object",
		shape: e,
		catchall: Vs(),
		...b(t)
	});
}
var qs = /*@__PURE__*/ E("ZodUnion", (e, t) => {
	wr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Do(e, t, n, r), e.options = t.options;
});
function G(e, t) {
	return new qs({
		type: "union",
		options: e,
		...b(t)
	});
}
var Js = /*@__PURE__*/ E("ZodDiscriminatedUnion", (e, t) => {
	qs.init(e, t), Er.init(e, t);
});
function Ys(e, t, n) {
	return new Js({
		type: "union",
		options: t,
		discriminator: e,
		...b(n)
	});
}
var Xs = /*@__PURE__*/ E("ZodIntersection", (e, t) => {
	Dr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oo(e, t, n, r);
});
function Zs(e, t) {
	return new Xs({
		type: "intersection",
		left: e,
		right: t
	});
}
var Qs = /*@__PURE__*/ E("ZodRecord", (e, t) => {
	cs(), Ar.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => No(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function K(e, t, n) {
	return !t || !t._zod ? new Qs({
		type: "record",
		keyType: z(),
		valueType: e,
		...b(t)
	}) : new Qs({
		type: "record",
		keyType: e,
		valueType: t,
		...b(n)
	});
}
var $s = /*@__PURE__*/ E("ZodEnum", (e, t) => {
	jr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => po(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new $s({
			...t,
			checks: [],
			...b(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new $s({
			...t,
			checks: [],
			...b(r),
			entries: i
		});
	};
});
function q(e, t) {
	return new $s({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...b(t)
	});
}
var ec = /*@__PURE__*/ E("ZodLiteral", (e, t) => {
	Mr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => mo(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function J(e, t) {
	return new ec({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...b(t)
	});
}
var tc = /*@__PURE__*/ E("ZodTransform", (e, t) => {
	cs(), Nr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => xo(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new We(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(ke(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(ke(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function nc(e) {
	return new tc({
		type: "transform",
		transform: e
	});
}
var rc = /*@__PURE__*/ E("ZodOptional", (e, t) => {
	Fr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ic(e) {
	return new rc({
		type: "optional",
		innerType: e
	});
}
var ac = /*@__PURE__*/ E("ZodExactOptional", (e, t) => {
	Ir.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function oc(e) {
	return new ac({
		type: "optional",
		innerType: e
	});
}
var sc = /*@__PURE__*/ E("ZodNullable", (e, t) => {
	Lr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Po(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function cc(e) {
	return new sc({
		type: "nullable",
		innerType: e
	});
}
var lc = /*@__PURE__*/ E("ZodDefault", (e, t) => {
	Rr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ro(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function uc(e, t) {
	return new lc({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var dc = /*@__PURE__*/ E("ZodPrefault", (e, t) => {
	Br.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => zo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function fc(e, t) {
	return new dc({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var pc = /*@__PURE__*/ E("ZodNonOptional", (e, t) => {
	Vr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function mc(e, t) {
	return new pc({
		type: "nonoptional",
		innerType: e,
		...b(t)
	});
}
var hc = /*@__PURE__*/ E("ZodCatch", (e, t) => {
	Wr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bo(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function gc(e, t) {
	return new hc({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : ze(t)
	});
}
var _c = /*@__PURE__*/ E("ZodPipe", (e, t) => {
	Gr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vo(e, t, n, r), e.in = t.in, e.out = t.out;
});
function vc(e, t) {
	return new _c({
		type: "pipe",
		in: e,
		out: t
	});
}
var yc = /*@__PURE__*/ E("ZodReadonly", (e, t) => {
	qr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ho(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function bc(e) {
	return new yc({
		type: "readonly",
		innerType: e
	});
}
var xc = /*@__PURE__*/ E("ZodTemplateLiteral", (e, t) => {
	Zr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => go(e, t, n, r);
});
function Sc(e, t) {
	return new xc({
		type: "template_literal",
		parts: e,
		...b(t)
	});
}
var Cc = /*@__PURE__*/ E("ZodCustom", (e, t) => {
	Qr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => yo(e, t, n, r);
});
function wc(e, t = {}) {
	return /* @__PURE__ */ wa(Cc, e, t);
}
function Tc(e, t) {
	return /* @__PURE__ */ Ta(e, t);
}
//#endregion
//#region ../shared/src/engenty/data-tables/columns.ts
var Ec = W({
	description: z().max(1024).optional(),
	edit: q(["inline", "popout"]).optional(),
	id: z().min(1).max(64).regex(/^[a-z][a-z0-9_]*$/, "column id must be a lowercase slug (a-z, 0-9, _)"),
	name: z().min(1).max(128),
	required: H().optional()
}), Dc = q([
	"integer",
	"decimal",
	"percent",
	"currency"
]), Oc = W({
	currency: z().regex(/^[A-Z]{3}$/, "currency must be an ISO 4217 code").optional(),
	fractionDigits: V().int().min(0).max(8).optional(),
	grouping: H().optional(),
	style: Dc
}).superRefine((e, t) => {
	e.style === "currency" && !e.currency && t.addIssue({
		code: "custom",
		message: "currency style needs an ISO 4217 code",
		path: ["currency"]
	}), e.style !== "currency" && e.currency && t.addIssue({
		code: "custom",
		message: "currency is only valid on currency columns",
		path: ["currency"]
	});
}), kc = q([
	"date",
	"datetime",
	"time"
]), Ac = q([
	"short",
	"medium",
	"long",
	"iso"
]), jc = q([
	"hours",
	"minutes",
	"seconds"
]), Mc = W({
	dateStyle: Ac.optional(),
	kind: kc,
	timePrecision: jc.optional()
}), Nc = q([
	"milliseconds",
	"seconds",
	"minutes",
	"hours",
	"days"
]), Pc = q([
	"hms",
	"hours",
	"minutes",
	"decimal-hours",
	"iso"
]), Fc = W({
	display: Pc,
	inputUnit: Nc
}), Ic = W({
	id: z().min(1).max(64),
	label: z().min(1).max(128)
}), Lc = W({
	allowCustom: H(),
	multiple: H().optional(),
	options: U(Ic).max(200)
}), Rc = W({ style: q([
	"single",
	"multiline",
	"markdown"
]).default("single") }), zc = U(Ys("type", [
	Ec.extend({
		format: Rc.optional(),
		type: J("text")
	}),
	Ec.extend({
		format: Oc,
		type: J("number")
	}),
	Ec.extend({
		format: Mc,
		type: J("date")
	}),
	Ec.extend({
		format: Fc,
		type: J("duration")
	}),
	Ec.extend({
		format: Lc,
		type: J("select")
	}),
	Ec.extend({ type: J("boolean") })
])).min(1).max(64).superRefine((e, t) => {
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.length; r++) {
		let i = e[r]?.id;
		i && (n.has(i) && t.addIssue({
			code: "custom",
			message: `duplicate column id "${i}"`,
			path: [r, "id"]
		}), n.add(i));
	}
});
W({
	description: z().optional(),
	edit: q(["inline", "popout"]).optional(),
	format: W({
		allowCustom: H().optional(),
		currency: z().optional(),
		dateStyle: q([
			"short",
			"medium",
			"long",
			"iso"
		]).optional(),
		display: Pc.optional(),
		fractionDigits: V().int().optional(),
		grouping: H().optional(),
		inputUnit: Nc.optional(),
		kind: kc.optional(),
		multiple: H().optional(),
		options: U(Ic).optional(),
		style: q([
			"single",
			"multiline",
			"markdown",
			"integer",
			"decimal",
			"percent",
			"currency"
		]).optional(),
		timePrecision: jc.optional()
	}).optional(),
	id: z(),
	name: z(),
	required: H().optional(),
	type: q([
		"text",
		"number",
		"date",
		"duration",
		"select",
		"boolean"
	])
}), W({ table_id: z().uuid() });
//#endregion
//#region ../shared/src/numbers.ts
function Bc(e, t = {}) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "string") return null;
	let n = t.units ? e.replace(/[^\d,.-]/g, "") : e.trim();
	if (!/^-?(\d+([.,]\d*)?|[.,]\d+)$/.test(n)) return null;
	let r = Number(n.replace(",", "."));
	return Number.isFinite(r) ? r : null;
}
function Vc(e) {
	return e > 0 ? e < 999500 ? `${Math.max(1, Math.round(e / 1e3))} KB` : e < 99995e4 ? `${(e / 1e6).toFixed(1)} MB` : `${(e / 1e9).toFixed(1)} GB` : "0 KB";
}
function Hc(e, t, n) {
	try {
		return new Intl.NumberFormat(n, {
			style: "currency",
			currency: t
		}).format(e);
	} catch {
		return `${e.toFixed(2)} ${t}`;
	}
}
var Uc = z().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/, "keys are letters, digits and _ and start with a letter"), Y = {
	label: z().min(1).optional(),
	description: z().optional()
}, Wc = [
	W({
		kind: J("text"),
		...Y,
		long: H().optional()
	}),
	W({
		kind: J("number"),
		...Y,
		unit: z().optional()
	}),
	W({
		kind: J("yesno"),
		...Y,
		yes: z().optional(),
		no: z().optional()
	}),
	W({
		kind: J("choice"),
		...Y,
		options: U(z().min(1)).min(2).max(40)
	}),
	W({
		kind: J("ref"),
		...Y,
		to: Uc
	})
], Gc = "text, number, yesno, choice, ref";
function Kc(e) {
	let t = e < 4 ? Kc(e + 1) : void 0, n = t ? Ys("kind", [...Wc, t], { error: `A list holds ${Gc} or object.` }) : Ys("kind", [...Wc], { error: `A list this deep holds ${Gc}: objects nest at most 4 deep.` }), r = W({
		kind: J("list"),
		...Y,
		of: n
	}), i = Ys("kind", [...Wc, r], { error: `"kind" is one of ${Gc}, list.` });
	return W({
		kind: J("object"),
		...Y,
		fields: K(Uc, i).refine((e) => Object.keys(e).length > 0, { message: "An object has fields." })
	});
}
function qc(e, t = []) {
	let n = [{
		shape: e,
		at: t
	}];
	for (let [r, i] of Object.entries(e.fields)) i.kind === "list" && i.of.kind === "object" && n.push(...qc(i.of, [
		...t,
		"fields",
		r,
		"of"
	]));
	return n;
}
function Jc(e, t) {
	let n = e.fields[t];
	return n?.kind !== "list" || n.of.kind !== "object" ? `"ref" to "${t}": that is no list of objects at the top of the schema.` : n.of.fields.id?.kind === "text" ? null : `"ref" to "${t}": its entries need an "id" text field to be pointed at.`;
}
var Yc = Kc(1).superRefine((e, t) => {
	let n = qc(e), r = n.reduce((e, t) => e + Object.keys(t.shape.fields).length, 0);
	r > 100 && t.addIssue({
		code: "custom",
		message: `A schema has at most 100 keys in all; this one has ${r}.`
	});
	for (let r of n) for (let [n, i] of Object.entries(r.shape.fields)) {
		let a = i.kind === "ref" ? i : i.kind === "list" && i.of.kind === "ref" ? i.of : null, o = a ? Jc(e, a.to) : null;
		o && t.addIssue({
			code: "custom",
			message: o,
			path: [
				...r.at,
				"fields",
				n
			]
		});
	}
});
function Xc(e) {
	let t = (e) => {
		let t = e.description ? { description: e.description } : {};
		switch (e.kind) {
			case "number": return {
				kind: "number",
				...t
			};
			case "list": return {
				kind: "list",
				...t,
				of: { kind: "text" }
			};
			case "yesno": return {
				kind: "yesno",
				...t
			};
			case "choice": return {
				kind: "choice",
				...t,
				options: e.options ?? []
			};
			case "score": return {
				kind: "score",
				...t,
				options: e.options ?? []
			};
			case "table": return {
				kind: "table",
				...t,
				...e.columns?.length ? { columns: e.columns } : {}
			};
			default: return {
				kind: "text",
				...t
			};
		}
	};
	return {
		kind: "object",
		fields: Object.fromEntries(e.map((e) => [e.id, t(e)]))
	};
}
function Zc(e) {
	return Object.entries(e.fields).find(([e, t]) => e !== "id" && t.kind === "text" && !t.long)?.[0];
}
function Qc(e, t) {
	return t.label ?? e;
}
function $c(e, t) {
	let n = t.description ?? (t.label ? "" : e), r = t.kind === "number" && t.unit ? `in ${t.unit}` : t.kind === "score" ? "lowest to highest" : t.kind === "ref" ? `the id of an entry of "${t.to}"` : "";
	return (n && r ? `${n} (${r})` : n || r) || void 0;
}
var el = G([
	z(),
	V(),
	zs()
]);
function tl(e, t = "data") {
	let n = $c(t, e), r = {
		...e.label ? { title: e.label } : {},
		...n ? { description: n } : {}
	};
	switch (e.kind) {
		case "text":
		case "ref": return z().meta(r);
		case "number": return V().meta(r);
		case "yesno": return H().meta(r);
		case "choice":
		case "score": return q(e.options).meta(r);
		case "list": return U(tl(e.of, t)).meta(r);
		case "object": return W(Object.fromEntries(Object.entries(e.fields).map(([e, t]) => [e, tl(t, e)]))).meta(r);
		case "table": return (e.columns?.length ? U(W(Object.fromEntries(e.columns.map((e) => [e, el])))) : W({
			columns: U(z()),
			rows: U(U(el))
		})).meta(r);
	}
}
function nl(e, t) {
	let n = Ko(tl(e), { target: "draft-2020-12" });
	return t && !e.label ? {
		...n,
		title: t
	} : n;
}
function rl(e, t) {
	let n = e;
	for (let e of t) if (n.kind === "object") {
		let t = n.fields[e];
		if (!t) return;
		n = t;
	} else if (n.kind === "list" && /^\d+$/.test(e)) n = n.of;
	else if (n.kind === "table") return /^\d+$/.test(e) ? "any" : void 0;
	else return;
	return n;
}
//#endregion
//#region ../shared/src/sharing.ts
var il = [
	"email",
	"slack",
	"browser"
], al = /^(storage|connector):[A-Za-z0-9][A-Za-z0-9_.-]{0,80}$/;
function ol(e) {
	return il.includes(e) || al.test(e);
}
//#endregion
//#region ../shared/src/store.ts
var sl = ["mail"];
function cl(e, t) {
	if (t.trim() === "") return null;
	switch (e.type) {
		case "number":
		case "duration": return Bc(t) ?? t;
		case "boolean": return t === "true";
		case "date": {
			if (e.format.kind !== "datetime") return t;
			let n = new Date(t);
			return Number.isNaN(n.getTime()) ? t : n.toISOString();
		}
		default: return t;
	}
}
//#endregion
//#region ../shared/src/surface.ts
var ll = [
	"Column",
	"Text",
	"List",
	"Row",
	"DetailGrid",
	"Badge",
	"Grid",
	"Metric",
	"Table",
	"Image",
	"BarChart",
	"LineChart",
	"DonutChart",
	"Actions",
	"Button",
	"Tabs",
	"Card",
	"Fold",
	"Group",
	"Chips",
	"Checklist",
	"Steps",
	"Link",
	"Callout"
], ul = /* @__PURE__ */ new Set([
	"Column",
	"List",
	"Grid",
	"Actions",
	"Card",
	"Fold",
	"Group"
]), dl = {
	Text: ["text"],
	Row: ["title"],
	DetailGrid: ["rows"],
	Badge: ["label"],
	Metric: ["label", "value"],
	Table: ["rows"],
	Image: ["src"],
	BarChart: ["points"],
	LineChart: ["points"],
	DonutChart: ["slices"],
	Button: ["label", "action"],
	Tabs: ["tabs"],
	Card: ["title"],
	Fold: ["title", "children"],
	Group: ["children", "by"],
	Chips: ["items"],
	Checklist: ["items"],
	Steps: ["items"],
	Link: [
		"title",
		"items",
		"value",
		"view"
	],
	Callout: ["text"]
}, fl = ["regenerate", "open"], pl = U(Ks({
	id: z().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,40}$/, "ids are letters, digits, _ and -"),
	component: q(ll),
	children: G([U(z()), W({
		path: z(),
		componentId: z()
	})]).optional()
})).min(1).max(200), ml = (e) => !(!e || typeof e != "object" || Array.isArray(e) || typeof e.path != "string");
function hl(e) {
	let t = e.children, n = Array.isArray(t) ? [...t] : t ? [t.componentId] : [], r = e.tabs;
	if (Array.isArray(r)) for (let e of r) {
		let t = e?.child;
		typeof t == "string" && n.push(t);
	}
	return n;
}
function gl(e) {
	let t = [], n = (e) => {
		ml(e) ? t.push(e.path) : Array.isArray(e) ? e.forEach(n) : e && typeof e == "object" && Object.values(e).forEach(n);
	};
	for (let [t, r] of Object.entries(e)) t !== "id" && t !== "component" && n(t === "children" && !Array.isArray(r) && ml(r) ? { path: r.path } : r);
	return t;
}
var _l = [
	"labelKey",
	"valueKey",
	"flagKey",
	"detailKey",
	"noteKey",
	"groupKey",
	"textKey",
	"minutesKey"
], vl = (e) => (e.startsWith("/") ? e.slice(1) : e).split(/[./]/).filter(Boolean).map((e) => e.replace(/~1/g, "/").replace(/~0/g, "~"));
function yl(e, t) {
	let n = [], r = /* @__PURE__ */ new Map(), i = (e, n) => e.startsWith("/") ? rl(t, vl(e)) : n === "any" ? "any" : n ? rl(n, vl(e)) : void 0, a = (e, t, r) => n.push({ message: !t.startsWith("/") && !r ? `"${e.id}" reads "${t}" outside a repeated entry; from the data it is "/${t.replace(/\./g, "/")}".` : `"${e.id}" reads "${t}", which no data provides.` }), o = (e, t, r) => {
		if (!ml(t)) return "any";
		let o = i(t.path, r);
		if (o === "any") return "any";
		if (o?.kind === "list") return o.of;
		if (o?.kind === "table") return o.columns?.length ? {
			kind: "object",
			fields: Object.fromEntries(o.columns.map((e) => [e, { kind: "text" }]))
		} : "any";
		o ? n.push({ message: `"${e.id}" reads "${t.path}" as a list; it is ${o.kind}.` }) : a(e, t.path, r);
	}, s = (e, t) => e === "any" || e === void 0 || e.kind !== "object" || t in e.fields, c = (t, l) => {
		let u = e.get(t), d = r.get(t) ?? /* @__PURE__ */ new Set();
		if (!u || d.has(l)) return;
		d.add(l), r.set(t, d);
		let f = u, p = [
			"items",
			"rows",
			"points",
			"slices"
		].find((e) => ml(f[e])), m = p ? o(u, f[p], l) : void 0;
		for (let e of _l) {
			let t = f[e];
			typeof t == "string" && m && !s(m, t) && n.push({ message: `"${u.id}": "${e}" names "${t}", which its entries do not have.` });
		}
		if (u.component === "Table" && Array.isArray(f.columns) && m) for (let e of f.columns) typeof e?.key == "string" && !s(m, e.key) && n.push({ message: `"${u.id}": no column "${e.key}" in its rows.` });
		let h = u.component === "Link" ? m : void 0;
		u.component === "Link" && typeof f.key == "string" && !s(h, f.key) && n.push({ message: `"${u.id}": its items have no "${f.key}".` });
		for (let [e, t] of Object.entries(f)) {
			if (e === "id" || e === "component" || e === "children" || e === p) continue;
			let n = u.component === "Link" && (e === "title" || e === "subtitle" || e === "meta") ? h : l, r = [], o = (e) => {
				ml(e) ? r.push(e.path) : Array.isArray(e) ? e.forEach(o) : e && typeof e == "object" && Object.values(e).forEach(o);
			};
			o(t);
			for (let e of r) i(e, n) === void 0 && a(u, e, n);
		}
		let g = u.children;
		if (Array.isArray(g)) for (let e of g) c(e, l);
		else if (g) {
			let e = o(u, { path: g.path }, l);
			e !== void 0 && (u.component === "Group" && typeof f.by == "string" && !s(e, f.by) && n.push({ message: `"${u.id}": "by" names "${f.by}", which its entries do not have.` }), c(g.componentId, e));
		}
		let ee = f.tabs;
		if (Array.isArray(ee)) for (let e of ee) {
			let t = e?.child;
			typeof t == "string" && c(t, l);
		}
		u.component === "Link" && typeof f.view == "string" && h !== void 0 && c(f.view, h);
	};
	return e.has("root") && c("root", void 0), n;
}
function bl(e, t) {
	let n = Array.isArray(t) ? t : void 0, r = pl.safeParse(e);
	if (!r.success) return r.error.issues.map((e) => ({ message: `${e.path.join(".")}: ${e.message}` }));
	let i = r.data, a = [], o = /* @__PURE__ */ new Map();
	for (let e of i) o.has(e.id) && a.push({ message: `Duplicate component id "${e.id}".` }), o.set(e.id, e);
	o.has("root") || a.push({ message: "A surface has a component with id \"root\"." });
	for (let e of i) {
		for (let t of dl[e.component] ?? []) e[t] === void 0 && a.push({ message: `${e.component} "${e.id}" needs "${t}".` });
		let t = e.action;
		t !== void 0 && !fl.includes(t) && a.push({ message: `"${e.id}": action is one of ${fl.join(", ")}.` });
		let r = e.children;
		r && !ul.has(e.component) && e.component !== "Table" && a.push({ message: `${e.component} "${e.id}" holds no children.` }), e.component === "Group" && (!r || Array.isArray(r)) && a.push({ message: `Group "${e.id}" repeats over a list: children { "path", "componentId" }.` });
		let i = e.tabs;
		e.component === "Tabs" && !(Array.isArray(i) && i.length >= 2) && a.push({ message: `Tabs "${e.id}" needs at least two tabs: [{ label, child }].` });
		let s = e.view, c = [...hl(e), ...typeof s == "string" ? [s] : []];
		for (let t of c) o.has(t) || a.push({ message: `"${e.id}" names a child "${t}" that is not there.` });
		if (n) for (let t of gl(e)) {
			let r = t.startsWith("/") ? t.split("/")[1] : null;
			r !== null && !n.includes(r) && a.push({ message: `"${e.id}" reads "${t}", which no data provides.` });
		}
	}
	let s = /* @__PURE__ */ new Set(), c = (e, t) => {
		if (t.has(e)) return !0;
		if (s.has(e)) return !1;
		s.add(e);
		let n = o.get(e), r = n ? hl(n) : [], i = new Set(t).add(e);
		return r.some((e) => c(e, i));
	};
	return o.has("root") && c("root", /* @__PURE__ */ new Set()) ? (a.push({ message: "Components hold each other in a loop." }), a) : t && !Array.isArray(t) ? [...a, ...yl(o, t)] : a;
}
function xl(e, t) {
	let n = e;
	for (let e of t.split("/").slice(1)) {
		if (typeof n != "object" || !n) return;
		n = n[e.replace(/~1/g, "/").replace(/~0/g, "~")];
	}
	return n;
}
function Sl(e, t, n) {
	return ml(e) ? Cl(e.path.startsWith("/") ? xl(t, e.path) : n === void 0 ? void 0 : xl(n, `/${e.path.replace(/\./g, "/")}`), e) : e;
}
function Cl(e, t) {
	let n = e, r = t.map;
	if (r && typeof r == "object" && !Array.isArray(r)) {
		let e = String(n);
		Object.hasOwn(r, e) && (n = r[e]);
	}
	return typeof t.format == "string" && n != null && n !== "" && (n = t.format.replace("{}", Array.isArray(n) ? n.join(", ") : String(n))), n;
}
//#endregion
//#region ../shared/src/definition.ts
var wl = [
	"round",
	"drop",
	"dome",
	"flame",
	"oval",
	"bean",
	"pebble",
	"sprout",
	"tower",
	"wedge"
], Tl = ["en", "de"], El = {
	en: "en-GB",
	de: "de-DE"
};
function Dl(e) {
	return typeof e == "string" && Tl.includes(e);
}
[.../* @__PURE__ */ new Set([
	"en",
	"de",
	...Object.values({
		AT: "de",
		BE: "nl",
		BG: "bg",
		CH: "de",
		CY: "el",
		CZ: "cs",
		DE: "de",
		DK: "da",
		EE: "et",
		ES: "es",
		FI: "fi",
		FR: "fr",
		GB: "en",
		GR: "el",
		HR: "hr",
		HU: "hu",
		IE: "en",
		IS: "is",
		IT: "it",
		LI: "de",
		LT: "lt",
		LU: "fr",
		LV: "lv",
		MC: "fr",
		MT: "en",
		NL: "nl",
		NO: "nb",
		PL: "pl",
		PT: "pt",
		RO: "ro",
		RS: "sr",
		SE: "sv",
		SI: "sl",
		SK: "sk",
		SM: "it",
		UA: "uk",
		VA: "it"
	})
])];
var Ol = /^[a-z]{2,3}$/;
function kl(e) {
	if (!Ol.test(e)) return !1;
	try {
		return !!new Intl.DisplayNames(["en"], {
			type: "language",
			fallback: "none"
		}).of(e);
	} catch {
		return !1;
	}
}
function Al(e) {
	return Dl(e) ? El[e] : e;
}
var jl = [
	"text",
	"textarea",
	"number",
	"select",
	"multiselect",
	"date",
	"email",
	"url",
	"toggle",
	"color",
	"image",
	"file",
	"items",
	"connection",
	"list",
	"location",
	"audio",
	"signature",
	"slot"
];
function Ml(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let { lat: t, lng: n, label: r } = e;
	return typeof t == "number" && typeof n == "number" || typeof r == "string" && r.trim().length > 0;
}
function Nl(e) {
	return !!(e && typeof e == "object" && typeof e.asset == "string" && e.asset);
}
var Pl = [
	"web_search",
	"web_fetch",
	"browser",
	"sandbox",
	"image",
	"http",
	"pages",
	"code"
], Fl = /^[a-z][a-z0-9-]{0,39}$/, Il = /^[a-z][a-z0-9_]{0,39}$/;
function Ll(e) {
	let [t, n, ...r] = e.split(".");
	return n !== void 0 && r.length === 0 && Fl.test(t) && Il.test(n) ? {
		plugin: t,
		tool: n
	} : null;
}
var Rl = [
	"classifier",
	"standard",
	"high",
	"highest"
];
[...Rl];
var zl = [
	"low",
	"medium",
	"high"
], Bl = [
	"image",
	"video",
	"voice",
	"document",
	"dashboard"
], Vl = [
	"png",
	"mp4",
	"mp3",
	"pdf",
	"docx",
	"html",
	"md",
	"txt",
	"csv",
	"xlsx",
	"json",
	"zip"
], Hl = [
	"1:1",
	"16:9",
	"9:16",
	"4:5",
	"3:2",
	"2:3"
], Ul = ["720p", "480p"], X = z().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/, "ids are letters, digits and _ and start with a letter"), Wl = W({
	id: X,
	label: z().min(1),
	kind: q([
		"text",
		"number",
		"money"
	])
}), Gl = W({
	field: z(),
	op: q([
		"equals",
		"notEquals",
		"in",
		"notEmpty",
		"empty",
		"gt",
		"lt",
		"contains"
	]),
	value: G([
		z(),
		V(),
		H(),
		U(z())
	]).optional()
}), Kl = G([Gl, U(Gl).min(1)]), ql = W({
	label: z().min(1),
	value: z().optional(),
	image: z().optional(),
	subtitle: z().optional(),
	meta: z().optional(),
	link: z().optional()
}), Jl = W({
	id: X,
	label: z().min(1),
	kind: q(jl),
	required: H().optional(),
	placeholder: z().optional(),
	help: z().optional(),
	options: U(z()).optional(),
	default: G([
		z(),
		V(),
		H(),
		U(z())
	]).optional(),
	columns: U(Wl).optional(),
	vat: W({
		rate: V().optional(),
		field: z().optional()
	}).optional(),
	currency: z().optional(),
	multiple: H().optional(),
	min: V().int().min(1).max(30).optional(),
	max: V().int().min(1).max(30).optional(),
	camera: H().optional(),
	video: H().optional(),
	listen: H().optional(),
	scan: H().optional(),
	connection: z().optional(),
	list: z().optional(),
	prefill: z().optional(),
	when: Kl.optional(),
	optionsFrom: z().optional(),
	cards: ql.optional(),
	ask: z().min(1).optional(),
	group: z().optional()
}), Yl = W({
	id: X,
	instructions: z().min(1),
	optional: H().optional()
}), Xl = W({
	when: Kl.optional(),
	ask: z().min(1).optional(),
	goto: z(),
	max: V().int().min(1).max(50).optional()
}).refine((e) => e.when === void 0 || e.ask === void 0, { message: "A branch has \"when\" or \"ask\", not both." }), Z = {
	id: X,
	title: z().min(1),
	description: z().optional(),
	next: U(Xl).optional()
}, Zl = W({
	id: X,
	kind: q([
		"text",
		"number",
		"list",
		"table",
		"yesno",
		"choice",
		"score"
	]),
	description: z().optional(),
	columns: U(z().min(1)).optional(),
	options: U(z().min(1)).min(2).max(40).optional()
}).refine((e) => e.kind !== "choice" && e.kind !== "score" || !!e.options?.length, {
	message: "A choice or score field lists its options.",
	path: ["options"]
}).refine((e) => e.kind !== "score" || (e.options?.length ?? 0) <= 10, {
	message: "A score has at most ten levels.",
	path: ["options"]
}), Ql = W({
	...Z,
	type: J("page"),
	fields: U(Jl).min(1),
	groups: U(Yl).max(6).optional(),
	cta: z().optional()
}), $l = Sc([
	z().regex(Fl),
	".",
	z().regex(Il)
]), eu = W({
	...Z,
	type: J("agent"),
	instructions: z().default(""),
	call: W({
		tool: $l,
		input: K(z(), Vs()).default({})
	}).optional(),
	tools: U(G([q(Pl), $l])).default([]),
	mcp: U(z()).optional(),
	connections: U(z()).optional(),
	output: W({
		format: q([
			"text",
			"markdown",
			"json"
		]),
		fields: U(Zl).optional(),
		schema: Yc.optional(),
		surface: G([H(), pl]).optional()
	}).default({ format: "markdown" }),
	model: q(Rl).optional(),
	effort: q(zl).optional(),
	each: z().optional(),
	working: z().optional()
}), tu = W({
	...Z,
	type: J("generate"),
	asset: q(Bl),
	prompt: z().min(1),
	options: W({
		aspectRatio: q(Hl).optional(),
		duration: V().optional(),
		resolution: q(Ul).optional(),
		style: z().optional(),
		template: q([
			"invoice",
			"offer",
			"briefing",
			"letter",
			"report",
			"free"
		]).optional()
	}).optional(),
	referenceImage: z().optional(),
	each: z().optional(),
	model: q(Rl).optional(),
	effort: q(zl).optional(),
	working: z().optional()
}), nu = W({
	...Z,
	type: J("widget"),
	entry: z().min(1),
	data: K(z(), z()).default({}),
	sample: z().optional(),
	layout: q(["fixed", "page"]).optional(),
	size: W({
		width: V().int().min(200).max(3840),
		height: V().int().min(200).max(3840)
	}).optional(),
	video: H().optional(),
	working: z().optional()
}), ru = [
	"16:9",
	"9:16",
	"1:1"
], iu = W({
	...Z,
	type: J("film"),
	brief: z().min(1),
	skills: U(z().min(1)).max(12).default(["hyperframes"]),
	kit: z().optional(),
	inputs: K(z(), z()).default({}),
	format: q(ru).default("16:9"),
	from: z().optional(),
	seconds: V().int().min(3).max(600).optional(),
	model: q(Rl).optional(),
	effort: q(zl).optional(),
	working: z().optional()
}), au = W({
	id: X,
	description: z().min(1),
	components: pl,
	group: z().optional(),
	required: H().optional()
}), ou = W({
	...Z,
	type: J("surface"),
	components: pl.optional(),
	candidates: U(au).max(16).optional(),
	groups: U(Yl).max(6).optional(),
	data: K(z(), z()).default({}),
	working: z().optional()
}).refine((e) => !!e.components != !!e.candidates, { message: "A surface step has either \"components\" or \"candidates\"." });
function su(e, t) {
	let n = new Set(t), r = e.filter((e) => n.has(e.id));
	return [{
		id: "root",
		component: "Column",
		children: r.map((e) => e.components[0]?.id ?? e.id)
	}, ...r.flatMap((e) => e.components)];
}
var cu = W({
	...Z,
	type: J("review"),
	show: U(z()).min(1),
	edit: H().optional(),
	regenerate: H().optional()
}), lu = W({
	from: z(),
	label: z().optional(),
	formats: U(q(Vl)).min(1)
}), uu = W({
	target: z().min(1),
	label: z().optional(),
	values: K(z(), z()).optional()
}), du = Ys("type", [
	Ql,
	eu,
	tu,
	nu,
	ou,
	iu,
	cu,
	W({
		...Z,
		type: J("result"),
		message: z().optional(),
		deliverables: U(lu),
		share: U(uu).max(12).optional()
	})
]);
function fu(e) {
	let t = e.output.fields ?? [];
	return !e.call && !e.output.schema && e.model === "classifier" && e.output.format === "json" && t.length > 0 && t.every((e) => e.kind === "yesno" || e.kind === "choice" || e.kind === "score") && !e.each && e.tools.length === 0 && !e.mcp?.length && !e.connections?.length;
}
function pu(e) {
	return e.output.schema ? e.output.schema : e.output.fields?.length ? Xc(e.output.fields) : void 0;
}
function mu(e) {
	return pu(e) ?? {
		kind: "object",
		fields: { data: {
			kind: "table",
			description: "The result as a table"
		} }
	};
}
function hu(e) {
	return Object.keys(pu(e)?.fields ?? {});
}
var gu = W({
	id: X,
	title: z().min(1),
	description: z().optional(),
	columns: zc,
	key: z().optional(),
	check: W({
		file: z().optional(),
		status: z().optional()
	}).optional(),
	shared: H().optional()
}), _u = W({
	id: X,
	kind: q(sl).optional(),
	connector: z().optional(),
	actions: U(z()).max(200).optional(),
	policy: K(z(), q(["allow", "ask"])).optional(),
	title: z().optional(),
	description: z().optional()
}), vu = W({
	version: J(1).default(1),
	title: z().min(1),
	description: z().default(""),
	avatar: q(wl).default("round"),
	intro: z().optional(),
	lang: z().regex(/^[a-z]{2}$/).optional(),
	lists: U(gu).max(12).optional(),
	connections: U(_u).max(12).optional(),
	steps: U(du).min(1)
}), yu = /^lists\.([a-zA-Z][a-zA-Z0-9_]*)$/;
function bu(e) {
	return e.match(yu)?.[1] ?? null;
}
function Q(e) {
	return e.trim().replace(/^\{\{\s*/, "").replace(/\s*\}\}$/, "");
}
var xu = /\{\{\s*([^}]+?)\s*\}\}/g;
function Su(e) {
	return [...e.matchAll(xu)].map((e) => e[1]);
}
function Cu(e, t) {
	let n = [], r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), u = (e) => `List "${e}" is shared: every run writes it, so the person running the wizard never sees it.`;
	e.lang && !kl(e.lang) && n.push({ message: `"${e.lang}" isn't a language code. Use a two-letter code such as "en", "de" or "it".` });
	for (let t of e.lists ?? []) {
		s.has(t.id) && n.push({ message: `Duplicate list id "${t.id}".` }), s.add(t.id), t.shared && (c.add(t.id), t.check && n.push({ message: `${u(t.id)} It cannot be checked row by row.` })), t.key && !t.columns.some((e) => e.id === t.key) && n.push({ message: `List "${t.id}": key "${t.key}" is not one of its columns.` });
		for (let [e, r] of Object.entries(t.check ?? {})) {
			let i = t.columns.find((e) => e.id === r);
			i ? e === "status" && i.type !== "select" && n.push({ message: `List "${t.id}": check.status "${r}" must be a select.` }) : n.push({ message: `List "${t.id}": check.${e} "${r}" is not one of its columns.` });
		}
	}
	for (let t of e.connections ?? []) l.has(t.id) && n.push({ message: `Duplicate connection id "${t.id}".` }), l.add(t.id), !!t.kind == !!t.connector && n.push({ message: `Connection "${t.id}" needs either "kind" or "connector", not both.` });
	for (let t of e.steps) if (r.has(t.id) && n.push({
		stepId: t.id,
		message: `Duplicate step id "${t.id}".`
	}), r.add(t.id), t.type === "page") for (let e of t.fields) {
		if (i.has(e.id) && n.push({
			stepId: t.id,
			message: `Duplicate field id "${e.id}".`
		}), i.add(e.id), (e.kind === "select" || e.kind === "multiselect" || e.kind === "slot") && !e.options?.length && !e.optionsFrom && n.push({
			stepId: t.id,
			message: `Field "${e.id}" needs options.`
		}), e.kind === "slot") {
			let r = (e.options ?? []).find((e) => !Iu(e));
			r !== void 0 && n.push({
				stepId: t.id,
				message: `Field "${e.id}": "${r}" is not a date and time with its offset, like "2026-10-12T09:00:00+02:00".`
			});
		}
		e.kind === "items" && !e.columns?.length && n.push({
			stepId: t.id,
			message: `Field "${e.id}" needs columns.`
		}), e.kind === "connection" && !l.has(e.connection ?? "") && n.push({
			stepId: t.id,
			message: `Field "${e.id}" needs "connection": the id of one of the wizard's connections.`
		}), e.kind === "list" && !s.has(e.list ?? "") ? n.push({
			stepId: t.id,
			message: `Field "${e.id}" needs "list": the id of one of the wizard's lists.`
		}) : e.kind === "list" && c.has(e.list ?? "") && n.push({
			stepId: t.id,
			message: `Field "${e.id}": ${u(e.list ?? "")}`
		}), (e.min !== void 0 || e.max !== void 0) && (e.kind !== "image" && e.kind !== "file" || !e.multiple ? n.push({
			stepId: t.id,
			message: `Field "${e.id}": "min" and "max" count the files of an image or file field with "multiple".`
		}) : e.min !== void 0 && e.max !== void 0 && e.min > e.max && n.push({
			stepId: t.id,
			message: `Field "${e.id}": min is larger than max.`
		})), e.scan && e.kind !== "text" && n.push({
			stepId: t.id,
			message: `Field "${e.id}": "scan" fills a text field; kind is "${e.kind}".`
		}), e.listen && e.kind !== "file" && n.push({
			stepId: t.id,
			message: `Field "${e.id}": "listen" belongs to a file field; kind is "${e.kind}".`
		}), e.video && e.kind !== "file" && n.push({
			stepId: t.id,
			message: `Field "${e.id}": "video" belongs to a file field; kind is "${e.kind}".`
		});
	}
	e.steps.at(-1)?.type !== "result" && n.push({ message: "The last step must be a result step." });
	let d = (e, t) => {
		for (let r of Su(t)) {
			let [t, i] = r.split(".");
			t === "steps" ? (!i || !a.has(i)) && n.push({
				stepId: e.id,
				message: `"{{${r}}}" refers to a step that has not run before "${e.id}".`
			}) : t === "brand" || t === "facts" || t === "today" || t === "notes" || (t === "item" || t === "index" || t === "count" ? (e.type !== "generate" && e.type !== "agent" || !e.each) && n.push({
				stepId: e.id,
				message: `"{{${r}}}" only exists in a generate or agent step with "each".`
			}) : t === "lists" ? (!i || !s.has(i)) && n.push({
				stepId: e.id,
				message: `"{{${r}}}" refers to an unknown list.`
			}) : o.has(t) || n.push({
				stepId: e.id,
				message: `"{{${r}}}" refers to a field that is not asked before "${e.id}".`
			}));
		}
	}, f = (t, n, r = !1) => {
		if (o.has(n)) return !0;
		let [i, c, l, ...u] = n.split(".");
		if (i === "lists") return l === "count" && u.length === 0 && s.has(c ?? "");
		let d = u.length === 1 && u[0] === "p";
		if (i !== "steps" || !l || u.length > 0 && !d || !(a.has(c) || r && c === t.id)) return !1;
		let f = e.steps.find((e) => e.id === c);
		return f?.type === "agent" && (!d || fu(f)) && (hu(f).includes(l) || !!f.each && l === "rows" && !d);
	}, p = (e, t) => (t.op === "gt" || t.op === "lt") && typeof t.value != "number" ? [{
		stepId: e,
		message: `"${t.op}" on "${t.field}" compares with a number value.`
	}] : t.op === "in" && !Array.isArray(t.value) ? [{
		stepId: e,
		message: `"in" on "${t.field}" needs a list of values.`
	}] : t.op !== "empty" && t.op !== "notEmpty" && t.value === void 0 ? [{
		stepId: e,
		message: `"${t.op}" on "${t.field}" needs a value.`
	}] : [], m = (t, n) => {
		let [r, i, o, s, ...l] = Q(t).split(".");
		if (r === "lists" && i && o && !s) {
			let t = e.lists?.find((e) => e.id === i);
			return t ? c.has(i) ? u(i) : t.columns.some((e) => e.id === o) ? null : `"optionsFrom": list "${i}" has no column "${o}".` : `"optionsFrom" names an unknown list "${i}".`;
		}
		if (r === "steps" && i && o && l.length === 0) {
			let t = a.has(i) ? e.steps.find((e) => e.id === i) : void 0;
			if (t?.type === "agent" && t.each && o === "rows") return s ? null : `"optionsFrom": "${i}.rows" is a table; name one of its columns.`;
			let r = t?.type === "agent" ? pu(t)?.fields[o] : void 0;
			if (!r) return `"optionsFrom" names "${i}.${o}", which is not an output of an earlier agent step.`;
			let c = r.kind === "table" ? r.columns?.length ? r.columns : void 0 : r.kind === "list" && r.of.kind === "object" ? Object.keys(r.of.fields) : null;
			if (c === null) return s || n ? s ? `"optionsFrom": "${i}.${o}" is not a table with the column "${s}".` : `"cards": "${i}.${o}" is not a table.` : r.kind === "list" ? null : `"optionsFrom": "${i}.${o}" is not a list (a table takes a column, or "cards").`;
			if (s) return !c || c.includes(s) ? null : `"optionsFrom": "${i}.${o}" is not a table with the column "${s}".`;
			if (n) {
				let e = Object.values(n).find((e) => c && !c.includes(e));
				return e ? `"cards": "${i}.${o}" has no column "${e}".` : null;
			}
			return `"optionsFrom": "${i}.${o}" is not a list (a table takes a column, or "cards").`;
		}
		return "\"optionsFrom\" is \"steps.<id>.<key>\", \"steps.<id>.<key>.<column>\" or \"lists.<id>.<column>\".";
	};
	for (let h of e.steps) {
		switch (h.type) {
			case "page": {
				let e = /* @__PURE__ */ new Set();
				for (let t of h.groups ?? []) e.has(t.id) && n.push({
					stepId: h.id,
					message: `Duplicate field group "${t.id}".`
				}), e.add(t.id), h.fields.some((e) => e.group === t.id) || n.push({
					stepId: h.id,
					message: `Field group "${t.id}" has no fields.`
				});
				h.fields.some((e) => e.ask || e.group) && h.fields.length > 12 && n.push({
					stepId: h.id,
					message: "A page whose fields are decided has at most 12 fields."
				});
				for (let t of h.fields) t.ask && t.group && n.push({
					stepId: h.id,
					message: `Field "${t.id}" has "ask" or "group", not both.`
				}), t.group && !e.has(t.group) && n.push({
					stepId: h.id,
					message: `Field "${t.id}" names an unknown group "${t.group}".`
				});
				for (let e of h.fields) {
					for (let t of ku(e.when)) !h.fields.some((n) => n.id === t.field && n.id !== e.id) && !f(h, t.field) && n.push({
						stepId: h.id,
						message: `Field "${e.id}": "when" reads "${t.field}", which is neither on this page nor known before it.`
					}), n.push(...p(h.id, t));
					if (e.optionsFrom) {
						let t = e.kind !== "select" && e.kind !== "multiselect" && e.kind !== "slot" ? `"optionsFrom" fills the choices of a select, multiselect or slot; kind is "${e.kind}".` : e.cards && e.kind === "slot" ? "\"cards\" draws the choices of a select or multiselect, not of a slot." : m(e.optionsFrom, e.cards);
						t && n.push({
							stepId: h.id,
							message: `Field "${e.id}": ${t}`
						});
					} else e.cards && n.push({
						stepId: h.id,
						message: `Field "${e.id}": "cards" needs "optionsFrom" naming a table output.`
					});
					if (e.prefill) {
						let t = Q(e.prefill);
						t.split(".")[0] === "steps" ? d(h, `{{${t}}}`) : n.push({
							stepId: h.id,
							message: `Field "${e.id}": prefill names an earlier step ("steps.<id>.<key>").`
						});
					}
					o.add(e.id);
				}
				break;
			}
			case "agent":
				d(h, h.instructions), h.call ? (d(h, JSON.stringify(h.call.input)), h.each && n.push({
					stepId: h.id,
					message: "A step with \"call\" runs once: no \"each\"."
				}), h.output.format !== "json" && n.push({
					stepId: h.id,
					message: "A step with \"call\" keeps the tool's answer: output format \"json\"."
				})) : h.instructions.trim() || n.push({
					stepId: h.id,
					message: "An AI step needs instructions."
				});
				for (let e of h.connections ?? []) l.has(e) || n.push({
					stepId: h.id,
					message: `Step uses unknown connection "${e}".`
				});
				if (h.output.surface && h.output.format !== "json" && n.push({
					stepId: h.id,
					message: "A step composes a view (\"surface\") of json output only."
				}), h.output.schema && (h.output.fields?.length && n.push({
					stepId: h.id,
					message: "Output has \"fields\" or \"schema\", not both."
				}), (h.output.format !== "json" || h.call) && n.push({
					stepId: h.id,
					message: h.call ? "A step with \"call\" keeps the tool's answer as it is: no \"schema\"." : "A \"schema\" describes json output: output format \"json\"."
				})), Array.isArray(h.output.surface)) for (let e of bl(h.output.surface, h.each ? ["rows"] : pu(h))) n.push({
					stepId: h.id,
					message: `View: ${e.message}`
				});
				if (h.each) {
					let e = Q(h.each), t = e.match(/^lists\.([a-zA-Z][a-zA-Z0-9_]*)$/)?.[1];
					t ? s.has(t) || n.push({
						stepId: h.id,
						message: `each names an unknown list "${t}".`
					}) : e.startsWith("steps.") && e.split(".").length === 3 ? d(h, `{{${e}}}`) : n.push({
						stepId: h.id,
						message: `each "${h.each}" is "steps.<id>.<key>" (a table or list output) or "lists.<id>".`
					});
				}
				break;
			case "generate":
				if (d(h, h.prompt), d(h, h.options?.style ?? ""), h.referenceImage && !o.has(h.referenceImage) && !a.has(h.referenceImage) && n.push({
					stepId: h.id,
					message: `referenceImage "${h.referenceImage}" is not an earlier field or step.`
				}), h.each) {
					let e = Q(h.each);
					h.asset !== "image" && h.asset !== "video" ? n.push({
						stepId: h.id,
						message: "\"each\" is for image and video steps."
					}) : e.startsWith("steps.") ? d(h, `{{${e}}}`) : !o.has(e) && !a.has(e) && n.push({
						stepId: h.id,
						message: `each "${h.each}" is not an earlier field, step or "steps.<id>.<key>".`
					});
				}
				break;
			case "widget":
				for (let [e, t] of Object.entries(h.data)) /^[A-Za-z_][A-Za-z0-9_]*$/.test(e) || n.push({
					stepId: h.id,
					message: `Widget data key "${e}" is not an identifier.`
				}), d(h, `{{${Q(t)}}}`);
				t && !t.includes(h.entry) && n.push({
					stepId: h.id,
					message: `Widget entry "${h.entry}" is not in the workspace.`
				}), t && h.sample && !t.includes(h.sample) && n.push({
					stepId: h.id,
					message: `Widget sample "${h.sample}" is not in the workspace.`
				});
				break;
			case "surface": {
				for (let [e, t] of Object.entries(h.data)) {
					/^[A-Za-z_][A-Za-z0-9_]*$/.test(e) || n.push({
						stepId: h.id,
						message: `Surface data key "${e}" is not an identifier.`
					});
					let r = bu(Q(t));
					r ? s.has(r) || n.push({
						stepId: h.id,
						message: `Surface data reads an unknown list "${r}".`
					}) : d(h, `{{${Q(t)}}}`);
				}
				let e = new Set((h.groups ?? []).map((e) => e.id));
				for (let t of h.candidates ?? []) t.components[0]?.id !== t.id && n.push({
					stepId: h.id,
					message: `Surface piece "${t.id}": its first component carries the piece's id.`
				}), t.group && !e.has(t.group) && n.push({
					stepId: h.id,
					message: `Surface piece "${t.id}" names an unknown group "${t.group}".`
				});
				let t = h.components ?? su(h.candidates ?? [], (h.candidates ?? []).map((e) => e.id));
				for (let e of bl(t, Object.keys(h.data))) n.push({
					stepId: h.id,
					message: `Surface: ${e.message}`
				});
				break;
			}
			case "film":
				d(h, h.brief);
				for (let [e, t] of Object.entries(h.inputs)) {
					/^[a-z][a-z0-9-]{0,40}$/.test(e) || n.push({
						stepId: h.id,
						message: `Film input "${e}" is not a folder name (lowercase letters, digits, -).`
					});
					let r = Q(t);
					r.startsWith("steps.") ? d(h, `{{${r}}}`) : o.has(r) || n.push({
						stepId: h.id,
						message: `Film input "${e}": "${t}" is not an earlier field or "steps.<id>".`
					});
				}
				if (h.from) {
					let t = Q(h.from).replace(/^steps\./, "");
					(!a.has(t) || e.steps.find((e) => e.id === t)?.type !== "film") && n.push({
						stepId: h.id,
						message: `Film from "${h.from}" is not an earlier film step ("steps.<id>").`
					});
				}
				h.kit && !h.kit.endsWith(".zip") ? n.push({
					stepId: h.id,
					message: `Film kit "${h.kit}" is a .zip.`
				}) : t && h.kit && !t.includes(h.kit) && n.push({
					stepId: h.id,
					message: `Film kit "${h.kit}" is not in the workspace.`
				});
				for (let e of h.skills) e.startsWith("skills/") && t && !t.includes(`${e}/SKILL.md`) && n.push({
					stepId: h.id,
					message: `Skill "${e}" has no SKILL.md in the workspace.`
				});
				break;
			case "review":
				for (let e of h.show) {
					let t = bu(e);
					(t ? !s.has(t) : !a.has(e)) ? n.push({
						stepId: h.id,
						message: `Review shows unknown ${t ? "list" : "step"} "${e}".`
					}) : t && c.has(t) && n.push({
						stepId: h.id,
						message: u(t)
					});
				}
				break;
			case "result":
				for (let e of h.deliverables) {
					let t = bu(e.from);
					(t ? !s.has(t) : !a.has(e.from)) ? n.push({
						stepId: h.id,
						message: `Deliverable from unknown ${t ? "list" : "step"} "${e.from}".`
					}) : t && c.has(t) && n.push({
						stepId: h.id,
						message: u(t)
					});
				}
				for (let e of h.share ?? []) {
					ol(e.target) || n.push({
						stepId: h.id,
						message: `Unknown share target "${e.target}": use email, slack, browser, storage:<connector> or connector:<connector>.`
					});
					for (let t of Object.values(e.values ?? {})) d(h, t);
				}
		}
		(h.next ?? []).filter(Du).length > 1 && n.push({
			stepId: h.id,
			message: "A step has at most one \"otherwise\" branch (one without \"when\" and \"ask\")."
		});
		for (let e of h.next ?? []) {
			e.goto !== "end" && !r.has(e.goto) && n.push({
				stepId: h.id,
				message: `Branch goes to unknown step "${e.goto}".`
			});
			for (let t of ku(e.when)) !i.has(t.field) && !f(h, t.field, !0) && n.push({
				stepId: h.id,
				message: `Branch reads unknown field "${t.field}".`
			}), n.push(...p(h.id, t));
		}
		a.add(h.id);
	}
	return n;
}
function wu(e, t) {
	let n = vu.safeParse(e);
	if (!n.success) return {
		ok: !1,
		issues: Eu(n.error, e)
	};
	let r = Cu(n.data, t);
	return {
		ok: !0,
		wizard: n.data,
		issues: r
	};
}
function Tu(e, t) {
	let n = e?.steps?.[t]?.id;
	return typeof n == "string" ? `steps[${t}] "${n}"` : `steps[${t}]`;
}
function Eu(e, t) {
	return e.issues.map((e) => {
		let [n, r, ...i] = e.path;
		return { message: `${(n === "steps" && typeof r == "number" ? [Tu(t, r), ...i].join(".") : e.path.join(".")) || "wizard"}: ${e.message}` };
	});
}
function Du(e) {
	return e.when === void 0 && e.ask === void 0;
}
function Ou(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
function ku(e) {
	return e === void 0 ? [] : Array.isArray(e) ? e : [e];
}
function Au(e, t) {
	let n = t[e.field];
	switch (e.op) {
		case "empty": return Ou(n);
		case "notEmpty": return !Ou(n);
		case "equals": return String(n) === String(e.value);
		case "notEquals": return String(n) !== String(e.value);
		case "in": return Array.isArray(e.value) && e.value.map(String).includes(String(n));
		case "gt":
		case "lt": {
			let t = Bc(n), r = Bc(e.value);
			return t !== null && r !== null && (e.op === "gt" ? t > r : t < r);
		}
		case "contains": return Array.isArray(n) ? n.map(String).includes(String(e.value)) : typeof n == "string" && e.value !== void 0 && n.toLowerCase().includes(String(e.value).toLowerCase());
	}
}
function ju(e, t) {
	return ku(e).every((e) => Au(e, t));
}
function Mu(e, t) {
	return e.when !== void 0 && ju(e.when, t);
}
function Nu(e) {
	return !!(e.ask || e.group);
}
function Pu(e, t, n) {
	let r = {
		...t,
		...n
	}, i = [];
	for (let t of e) ju(t.when, r) ? i.push(t) : delete r[t.id];
	return i;
}
var Fu = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
function Iu(e) {
	let t = Fu.exec(e.trim());
	if (!t) return null;
	let [, n, r, i, a, o] = t.map(Number), s = new Date(Date.UTC(n, r - 1, i, a, o));
	return s.getUTCMonth() !== r - 1 || s.getUTCDate() !== i || a > 23 || o > 59 || !Number.isFinite(Date.parse(e)) ? null : {
		day: `${t[1]}-${t[2]}-${t[3]}`,
		time: `${t[4]}:${t[5]}`,
		wall: s
	};
}
function Lu(e, t = "en") {
	let n = Iu(e);
	if (!n) return e;
	let r = Al(t);
	return `${n.wall.toLocaleDateString(r, {
		weekday: "long",
		timeZone: "UTC"
	})}, ${n.wall.toLocaleDateString(r, {
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	})}`;
}
function Ru(e, t, n) {
	let r = Array.isArray(t) ? t : [], i = (e.columns ?? []).filter((e) => e.kind !== "text"), a = r.map((e) => {
		let t = i.length ? i.reduce((t, n) => t * zu(e[n.id]), 1) : 0;
		return {
			...e,
			amount: Bu(t)
		};
	}), o = Bu(a.reduce((e, t) => e + t.amount, 0)), s = e.vat?.rate ?? 0;
	if (e.vat?.field) {
		let t = n[e.vat.field], r = Bc(t, { units: !0 });
		r !== null && (s = r);
	}
	let c = Bu(o * s / 100);
	return {
		rows: a,
		net: o,
		vatRate: s,
		vat: c,
		gross: Bu(o + c),
		currency: e.currency ?? "EUR"
	};
}
function zu(e) {
	return Bc(e) ?? 0;
}
function Bu(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region ../shared/src/texts.ts
var Vu = /* @__PURE__ */ new Map();
function Hu(e) {
	let t = Vu.get(e);
	return t || (t = new Intl.PluralRules(Al(e)), Vu.set(e, t)), t;
}
function Uu(e, t, n) {
	return typeof e == "string" ? e : typeof n == "number" ? e[Hu(t).select(n)] ?? e.other : e.other;
}
function Wu(e, t) {
	return typeof e == "number" ? e.toLocaleString(Al(t)) : Array.isArray(e) ? e.map((e) => Wu(e, t)).join(", ") : e;
}
function Gu(e, t, n) {
	return e.replace(/\{(\w+)\}/g, (e, r) => {
		let i = n?.[r];
		return i === void 0 ? e : Wu(i, t);
	});
}
function Ku(e, t, n, r) {
	let i = e[n][t] ?? e.en[t];
	return i === void 0 ? t : Gu(Uu(i, n, r?.count ?? r?.n), n, r);
}
function qu(e, t, n) {
	return Gu(Uu(e, t, n?.count ?? n?.n), t, n);
}
//#endregion
//#region ../shared/src/run.ts
var Ju = {
	entry: "Entry {n} of {total}",
	deciding: "Deciding what to do next…",
	choosingFields: "Choosing the right questions…",
	batchDone: "{done} of {total} done",
	editing: "Editing {n} of {total}",
	filming: "Filming {n} of {total}",
	clipsRendering: {
		one: "Rendering {count} clip – this takes a few minutes.",
		other: "Rendering {count} clips – this takes a few minutes."
	},
	videoRendering: "Rendering the video – this usually takes 1–3 minutes.",
	photo: "Looking at photo {n} of {total}",
	found: "{label}: {name}",
	listen: "Listening to “{label}”…",
	listenFailed: "“{label}” couldn’t be transcribed.",
	filmCutting: "Cutting the film – this takes about a minute.",
	filmProgress: "{pct} % cut",
	filmError: "The film reports: {detail}",
	widgetError: "The widget reports an error: {detail}",
	mcpConnected: "Connected to {names}",
	mcpUnreachable: "MCP server unreachable: {detail}",
	reads: "Reading {name}",
	readsMany: {
		one: "Reading {count} document",
		other: "Reading {count} documents"
	},
	opens: "Opening {name}",
	clicks: "Clicking in the browser",
	clicksOn: "Clicking “{name}”",
	types: "Typing in the browser",
	typesText: "Typing “{text}”",
	selects: "Choosing “{option}”",
	scrolls: "Scrolling",
	presses: "Pressing {key}",
	goesBack: "Going back a page",
	waitsForPage: "Waiting for the page",
	fastLoop: "Doing in the browser: {goal}",
	personDrives: "You’re driving the browser – the wizard waits",
	agentDrives: "The wizard carries on in the browser",
	looksAtPage: "Looking at the page",
	waitsForSignIn: "Waiting for you to sign in to {name}",
	downloads: "Downloading {name}",
	attaches: "Attaching {name}",
	runs: "Running: {command}",
	python: "Running Python",
	runsProgram: "Working through the data in one go",
	drawing: "Drawing an image",
	writesPage: "Writing the page “{title}”",
	searchesDocuments: "Searching the documents: {query}",
	searchesKnowledge: "Searching knowledge: {query} – {relevant} of {candidates} fit",
	listsKnowledge: "Listing knowledge",
	searchesMail: "Searching {label}",
	savesReceipts: {
		one: "Saving {count} receipt from {label}",
		other: "Saving {count} receipts from {label}"
	},
	remembers: "Remembering {title}",
	files: {
		one: "Filing {count} file",
		other: "Filing {count} files"
	},
	filmSetup: "Setting up the folder for the film",
	filmClient: "{client} is working on the film – this usually takes 10–40 minutes.",
	filmTask: "On the film: {task}",
	filmLooks: "Looking at frames of the film",
	filmFix: "The film didn’t render – Claude Code is fixing it",
	filmResume: "Picking the film up where it stopped",
	wizardUnavailable: "This wizard isn’t available right now.",
	translationFailed: "This wizard can’t be translated right now. It’s shown as it was written.",
	translationOff: "This wizard is only offered as it was written.",
	translationPlaceholder: "The translation of “{text}” needs every placeholder in curly brackets the original has.",
	wizardLimit: "This wizard has reached its limit for today. Try again tomorrow.",
	confirmHuman: "Confirm that you’re a person.",
	tooManyRuns: "You’ve started a lot of runs just now. Try again in an hour.",
	clientRefused: "This app may not start runs here.",
	clientLimit: "This app has started a lot of runs just now. Try again later.",
	runOver: "The run is over.",
	runBusy: "The wizard is working right now.",
	pageOutdated: "This page is out of date.",
	noStepBefore: "There is no step before this one.",
	checkFields: "Check the marked fields.",
	talkOff: "Live conversations aren’t turned on for this wizard.",
	talkKeyRefused: "The conversation couldn’t start: the OpenAI API key was refused.",
	talkFailed: "The conversation couldn’t start ({status}).",
	talkNoSecret: "The conversation couldn’t start: no access key came back.",
	tryLater: "Try again later.",
	recordingTooLarge: "The recording can be 10 MB at most.",
	fileTooLarge: "Choose a file of {mb} MB or less.",
	askClosed: "This question is no longer open.",
	noBrowser: "The wizard has no browser open right now.",
	notWaiting: "The wizard isn’t waiting for you right now.",
	pageActFailed: "That didn’t work on the page.",
	linkGone: "This link has expired or was withdrawn.",
	connected: "Connected. You can close this window.",
	connectFailed: "Connecting didn’t work. Try again.",
	connectCancelled: "Connecting was cancelled.",
	appleOff: "Apple Intelligence is turned off on this Mac. Turn it on in System Settings → Apple Intelligence & Siri.",
	appleLoading: "Apple is still loading the model for Apple Intelligence onto this Mac. Try again in a moment.",
	appleMissing: "The helper for Apple Intelligence (wizards-apple) is missing from this install.",
	appleOs: "Apple Intelligence needs macOS 26 or later.",
	appleDevice: "Apple Intelligence only works on a Mac with Apple silicon.",
	appleBusy: "Apple Intelligence isn’t taking more requests right now. Try again in a moment.",
	appleTooLong: "The text is too long for Apple Intelligence on this Mac (4,096 tokens for question and answer). Choose another model for this class under Settings → Models.",
	appleRefused: "Apple Intelligence turned the request down: Apple’s content rules don’t allow it.",
	appleLanguage: "Apple Intelligence doesn’t understand the language of this request.",
	appleFormat: "Apple Intelligence can’t answer in this format: {detail}",
	appleFailed: "Apple Intelligence: {detail}",
	appleNoFfmpeg: "Apple Intelligence can’t read {type}, and without ffmpeg the recording can’t be converted. Install ffmpeg or record as MP4 in the browser.",
	appleNotConverted: "Apple Intelligence couldn’t convert the recording: {detail}",
	connectorAlreadyExistsSpace: "The connector “{id}” already exists in this space.",
	connectorNotExist: "This connector doesn’t exist.",
	fieldMissing: "“{label}” is missing.",
	mailServerNotExist: "The mail server{host} doesn’t exist. Enter the IMAP server. For Gmail and Google Workspace, it’s imap.gmail.com.",
	mailServerNotResponding: "The mail server{host} isn’t responding. Check the IMAP server and port.",
	connectingNotWork: "Connecting didn’t work{host}: {detail}",
	connectEngentyAccountFirst: "Connect your engenty account first (Settings → Account). Then you can connect Google here.",
	engentyAccountNotReached: "Your engenty account can’t be reached right now. Try again later.",
	googleNoLongerAccepts: "Google no longer accepts this connection. Connect the account again.",
	googleNotConnectedThrough: "Google can’t be connected through your engenty account right now.",
	stepNeedsToolPlugin: "This step needs the tool “{id}”. The plugin “{plugin}” isn’t installed here.",
	clientNotSignedIn: "{name} isn’t signed in on this computer. Sign in under Settings → Models.",
	clientNotInstalled: "{name} isn’t installed on this computer. Install it under Settings → Models.",
	clientNoCredit: "The account {name} is signed in with has no credit or quota left.",
	clientAccountNotServed: "{name} no longer serves the account it is signed in with. Sign it in with another account, or choose another way under Settings → Models.",
	anthropicAccountClaudeCode: "The Anthropic account Claude Code is signed in with has no credit. Sign Claude Code in with your subscription under Settings → Models.",
	chatgptAccountCodexSigned: "The ChatGPT account Codex is signed in with has used up its quota. Try again later or choose another client.",
	builtTerminalNotAvailable: "The built-in terminal isn’t available on this computer. Run the command in your own terminal.",
	terminalNoLongerExists: "This terminal no longer exists.",
	imageTypeNotReadable: "Images of type {mime} can’t be read (PNG, JPEG and WebP work).",
	fileNotReadable: "“{name}” ({mime}) can’t be read.",
	creditsNotSignedIn: "This is set to run on credits, but you’re not signed in to an account.",
	accountNoLongerSigned: "The account is no longer signed in. Sign in again under Settings → Account.",
	modelNotUsedYet: "The model “{ref}” can’t be used yet. Add an API key under Settings → Models, or sign in to an account.",
	noModelForImages: "No model is set up for images.",
	noModelForVideos: "No model is set up for videos.",
	noModelForSpeech: "No model is set up for speech.",
	noOpenaiApiKey: "No OpenAI API key is set for voice conversations (Settings → Models).",
	modelNotAvailableAccount: "This model isn’t available with your account.",
	accountNoModelSet: "Your account has no model set up for this.",
	claudeCodeMakesFilms: "Claude Code makes films on this computer, using your subscription. Set it up as an AI subscription under Settings → Models.",
	macNeedsFfmpegTranscribe: "This Mac needs ffmpeg to transcribe recordings from Chrome or Firefox (WebM, Ogg). Safari and the app don’t. Install ffmpeg, e.g. with “brew install ffmpeg”.",
	fieldRequired: "Required",
	chooseAtLeast: "Choose at least {min}",
	chooseAtMost: "At most {max} – remove some",
	enterNumber: "Enter a number",
	invalidChoice: "Invalid choice",
	timeNotOffered: "This time isn’t offered",
	notValidEmailAddress: "Not a valid email address",
	notValidUrl: "Not a valid URL",
	wizardRunOutCredits: "This wizard has run out of credits for now. Try again later.",
	providerCreditLow: "Your credit with the model provider isn’t enough for this (videos need a minimum balance there). Top up there and try again.",
	aiServiceBusyRight: "The AI service is busy right now. Try again in a moment.",
	stepTookTooLong: "The step took too long. Try again.",
	aiServiceNotReached: "The AI service can’t be reached right now. Try again later.",
	notAvailableNow: "That isn’t available here right now.",
	fileNotFound: "File not found",
	connectFirst: "Connect first",
	noEntriesStepWork: "There are no entries for this step to work on.",
	stepNotReturnResult: "The step didn’t return a result.",
	documentNotCreated: "The document couldn’t be created.",
	stepMissingSourcesImages: "This step is missing its sources (images or scenes).",
	noTextReadAloud: "There is no text to read aloud.",
	wizardStillErrors: "The wizard still has errors.",
	noLanguageModelSet: "No language model is set up here.",
	creditsUsedUp: "Your credits are used up.",
	chooseFile: "Choose a file.",
	pageNotReached: "The page can’t be reached.",
	unknownEntry: "Unknown entry.",
	chooseWizardFileMb: "Choose a wizard file ({PACKAGE_EXTENSION}) of 30 MB or less.",
	recordingMbMost: "The recording can be 10 MB at most.",
	onlyFinishedResultsShared: "Only finished results can be shared.",
	gradientFailed: "Couldn’t make a gradient from that. Try describing it differently.",
	onlyOneSpaceAllowed: "Only one space is allowed here.",
	mostSpaces: {
		one: "You can have at most {count} space here.",
		other: "You can have at most {count} spaces here."
	},
	twoEntriesSameKey: "Two entries have the same key.",
	notDeleteLastSpace: "You can’t delete the last space.",
	notFound: "This doesn’t exist or was deleted.",
	categoryNeedsName: "A category needs a name.",
	unknownCategoryType: "Unknown type “{type}”.",
	spaceMostCategories: {
		one: "A space can have at most {count} category.",
		other: "A space can have at most {count} categories."
	},
	categoryAlreadyExists: "The category “{name}” already exists.",
	onlyChoiceCategoriesValues: "Only choice categories have values.",
	onlyValuesOneCategory: "Only values of one category can be merged.",
	templateNeedsNewerVersion: "This template needs a newer version of engenty wizards. Update engenty wizards first.",
	chatNotExist: "This chat doesn’t exist.",
	unknownRunner: "There’s no runner “{unknown}” here.",
	leastOneRunnerStay: "At least one runner has to stay on.",
	linkOpenRunnerTurned: "The link has to open a runner that’s turned on.",
	jobNotExistAlready: "This job doesn’t exist or has already finished.",
	accountAlreadySpace: "This account already has a space here.",
	accountAlreadySpaces: {
		one: "This account already has {count} space here.",
		other: "This account already has {count} spaces here."
	},
	roomMostPublishedWizards: {
		one: "There’s room for at most {count} published wizard here.",
		other: "There’s room for at most {count} published wizards here."
	},
	spaceIdAlreadyExists: "A space with this ID already exists here and didn’t come from your computer.",
	wizardIdAlreadyBelongs: "A wizard with this ID already belongs to another space here.",
	idAlreadyUse: "This ID is already in use here.",
	wizardNotSpace: "This wizard isn’t in the space.",
	invalidColumns: "Invalid columns.",
	spaceMostTables: {
		one: "A space can have at most {count} table.",
		other: "A space can have at most {count} tables."
	},
	tableBelongsOneWizard: "This table belongs to one of the wizard’s lists. Its columns come from the wizard.",
	entryAlreadyExists: "This entry already exists.",
	tableMostRows: {
		one: "A table can have at most {count} row.",
		other: "A table can have at most {count} rows."
	},
	spaceMostPages: {
		one: "A space can have at most {count} page.",
		other: "A space can have at most {count} pages."
	},
	pageNotSubpages: "This page can’t have subpages.",
	pageNotOwnSubpage: "A page can’t be its own subpage.",
	pageNeedsTitle: "A page needs a title.",
	unknownSpace: "There’s no space “{space}”.",
	noParentPage: "There’s no page with the key “{parent}” to put this page under.",
	onlyTeamAdmins: "Only team admins can do that. As a member, you can edit the wizards that already exist.",
	spaceEditedLocally: "You edit this space in engenty wizards on your computer, not here.",
	wizardsRunOncePublished: "Wizards run here once you publish them in engenty wizards on your computer. You build and edit them there.",
	logoImagePngSvg: "A logo is an image (PNG, SVG, JPEG, WebP).",
	patternImageSvgPng: "A pattern is an image (SVG, PNG, JPEG, WebP).",
	filesGoHere: "Images, videos, audio, PDFs, fonts, Lottie and 3D models go here. Texts to look things up in go under knowledge.",
	addressNotReached: "The address can’t be reached.",
	addressResponded: "The address responded with {status}.",
	addressLeadsWebPage: "The address leads to a web page, not an image.",
	addressFileTooLarge: "The file is too large.",
	onlyDocumentsIndex: "Only documents are in the index.",
	emptyTooLargeDocument: "“{name}” is empty or too large for a document.",
	spaceMostDocuments: {
		one: "A space can have at most {count} document.",
		other: "A space can have at most {count} documents."
	},
	accountSignedOut: "The account is signed out. Sign in again.",
	cloudNotReachedRight: "The cloud can’t be reached right now.",
	publishWizardFirst: "Publish the wizard first.",
	wizardJsonUnreadable: "This isn’t a wizard file: its wizard.json can’t be read.",
	wizardFileComesNewer: "This wizard file comes from a newer version, or it’s damaged. Update engenty wizards or export the wizard again.",
	fileOver5Mb: "{name} is larger than 5 MB.",
	wizardFileTooLarge: "The wizard file is too large: a workspace holds at most 200 files and 25 MB.",
	wizardFileNotOpened: "The wizard file can’t be opened. Export the wizard again and try once more.",
	wizardJsonMissing: "This isn’t a wizard file: wizard.json is missing.",
	notValidFilePath: "“{name}” isn’t a valid file path.",
	workspaceWizardFileLarger: "The workspace in the wizard file is larger than 25 MB.",
	unknownTemplate: "There’s no template “{starterId}”.",
	wizardChangedMeantime: "The wizard was changed in the meantime.",
	valueNotExist: "This value doesn’t exist.",
	nothingFiledUnderValue: "Nothing is filed under this value yet.",
	filmNotRenderedNeeds: "The film couldn’t be rendered. It needs ffmpeg and a timeline in the widget.",
	signInRefused: "The sign-in was refused{host}. Are the address and (app) password right? Gmail and Google Workspace need an app password and IMAP turned on.{answer}",
	serverSaid: " The server said: {answer}",
	viaAccountFailed: "Connecting through your engenty account didn’t work ({code}).",
	pluginInvalidInput: "“{id}” got invalid input: {path} – {problem}",
	filmClientStopped: "{name} stopped working on the film: {detail}. The work is saved. A new try carries on from there.",
	filmWorkSaved: "{problem} The work is saved. A new try carries on from there.",
	filmRenderFailed: "The film couldn’t be rendered: {detail}",
	commandNotStarted: "The command couldn’t start: {detail}",
	providerKeyMissing: "{provider} is chosen for {makes}, but no API key is set.",
	noModelFor: "No model is set up for {makes}.",
	noApiKeyFor: "No API key is set for {provider}.",
	freeTier: "Your AI Gateway key is on Vercel’s free tier, which doesn’t include {model}. Top up at Vercel ({url}) or choose another model under Settings → Models.",
	thisModel: "this model",
	quoted: "“{text}”",
	viewErrors: "The view has errors: {detail}",
	blockedSteps: "{steps}: {problem}",
	joined: "{first} {second}",
	stepFailed: "This step failed: {detail}",
	answersMissing: "Answers are missing or don’t fit: {answers}",
	fieldError: "{field} – {message}",
	templateNeedsPlugins: {
		one: "This template needs the plugin {plugins}: included with Pro on engenty.ai.",
		other: "This template needs the plugins {plugins}: included with Pro on engenty.ai."
	},
	pageMostChars: {
		one: "A page can have at most {count} character.",
		other: "A page can have at most {count} characters."
	},
	chooseFileUpTo: "Choose a file of {mb} MB or less.",
	roomMostFiles: {
		one: "There’s room for at most {count} file here.",
		other: "There’s room for at most {count} files here."
	},
	makesText: "text",
	makesImages: "images",
	makesVideos: "videos",
	makesSpeech: "speech",
	makesVoiceNotes: "voice notes"
}, Yu = {
	en: Ju,
	de: {
		entry: "Eintrag {n} von {total}",
		deciding: "Entscheidet, wie es weitergeht …",
		choosingFields: "Wählt die passenden Fragen …",
		batchDone: "{done} von {total} fertig",
		editing: "Bearbeitet {n} von {total}",
		filming: "Dreht {n} von {total}",
		clipsRendering: {
			one: "{count} Clip wird gerendert – das dauert einige Minuten.",
			other: "{count} Clips werden gerendert – das dauert einige Minuten."
		},
		videoRendering: "Das Video wird gerendert – das dauert meist 1–3 Minuten.",
		photo: "Sieht sich Foto {n} von {total} an",
		found: "{label}: {name}",
		listen: "Hört „{label}“ an …",
		listenFailed: "„{label}“ konnte nicht verschriftlicht werden.",
		filmCutting: "Der Film wird geschnitten – das dauert etwa eine Minute.",
		filmProgress: "{pct} % geschnitten",
		filmError: "Der Film meldet: {detail}",
		widgetError: "Das Widget meldet einen Fehler: {detail}",
		mcpConnected: "Verbunden mit {names}",
		mcpUnreachable: "MCP-Server nicht erreichbar: {detail}",
		reads: "Liest {name}",
		readsMany: {
			one: "Liest {count} Dokument",
			other: "Liest {count} Dokumente"
		},
		opens: "Öffnet {name}",
		clicks: "Klickt im Browser",
		clicksOn: "Klickt auf „{name}“",
		types: "Tippt im Browser",
		typesText: "Tippt „{text}“",
		selects: "Wählt „{option}“",
		scrolls: "Scrollt",
		presses: "Drückt {key}",
		goesBack: "Geht eine Seite zurück",
		waitsForPage: "Wartet auf die Seite",
		fastLoop: "Erledigt im Browser: {goal}",
		personDrives: "Du steuerst den Browser – der Wizard wartet",
		agentDrives: "Der Wizard macht im Browser weiter",
		looksAtPage: "Sieht sich die Seite an",
		waitsForSignIn: "Wartet auf deine Anmeldung bei {name}",
		downloads: "Lädt {name} herunter",
		attaches: "Hängt {name} an",
		runs: "Führt aus: {command}",
		runsProgram: "Arbeitet die Daten in einem Zug durch",
		python: "Führt Python aus",
		drawing: "Zeichnet ein Bild",
		writesPage: "Schreibt die Seite „{title}“",
		searchesDocuments: "Sucht in den Dokumenten: {query}",
		searchesKnowledge: "Sucht in Wissen: {query} – {relevant} von {candidates} passen",
		listsKnowledge: "Listet Wissen",
		searchesMail: "Durchsucht {label}",
		savesReceipts: {
			one: "Speichert {count} Beleg aus {label}",
			other: "Speichert {count} Belege aus {label}"
		},
		remembers: "Merkt sich {title}",
		files: {
			one: "Legt {count} Datei ab",
			other: "Legt {count} Dateien ab"
		},
		filmSetup: "Richtet den Arbeitsordner für den Film ein",
		filmClient: "{client} arbeitet am Film – das dauert meist 10–40 Minuten.",
		filmTask: "Am Film: {task}",
		filmLooks: "Sieht sich Bilder des Films an",
		filmFix: "Der Film ließ sich nicht rendern – Claude Code bessert nach",
		filmResume: "Macht dort weiter, wo der Film stehen geblieben ist",
		wizardUnavailable: "Dieser Wizard ist gerade nicht verfügbar.",
		translationFailed: "Dieser Wizard lässt sich gerade nicht übersetzen. Du siehst ihn so, wie er geschrieben wurde.",
		translationOff: "Diesen Wizard gibt es nur so, wie er geschrieben wurde.",
		translationPlaceholder: "Die Übersetzung von „{text}“ braucht jeden Platzhalter in geschweiften Klammern, den das Original hat.",
		wizardLimit: "Für heute ist das Limit dieses Wizards erreicht. Versuch es morgen wieder.",
		confirmHuman: "Bestätige kurz, dass du ein Mensch bist.",
		tooManyRuns: "Du hast gerade viele Läufe gestartet. Versuch es in einer Stunde wieder.",
		clientRefused: "Diese App darf hier keine Läufe starten.",
		clientLimit: "Diese App hat gerade viele Läufe gestartet. Versuch es später wieder.",
		runOver: "Der Lauf ist beendet.",
		runBusy: "Der Wizard arbeitet gerade.",
		pageOutdated: "Diese Seite ist nicht mehr aktuell.",
		noStepBefore: "Kein vorheriger Schritt.",
		checkFields: "Prüf die markierten Felder.",
		talkOff: "Live-Gespräche sind für diesen Wizard nicht eingeschaltet.",
		talkKeyRefused: "Das Gespräch ließ sich nicht starten: Der OpenAI-API-Key wurde abgelehnt.",
		talkFailed: "Das Gespräch ließ sich nicht starten ({status}).",
		talkNoSecret: "Das Gespräch ließ sich nicht starten: Es kam kein Zugang zurück.",
		tryLater: "Versuch es später noch einmal.",
		recordingTooLarge: "Die Aufnahme darf höchstens 10 MB groß sein.",
		fileTooLarge: "Wähl eine Datei bis {mb} MB.",
		askClosed: "Diese Frage ist nicht mehr offen.",
		noBrowser: "Der Wizard hat gerade keinen Browser offen.",
		notWaiting: "Der Wizard wartet gerade nicht auf dich.",
		pageActFailed: "Das hat auf der Seite nicht geklappt.",
		linkGone: "Dieser Link ist abgelaufen oder wurde zurückgezogen.",
		connected: "Verbunden. Du kannst dieses Fenster schließen.",
		connectFailed: "Verbinden hat nicht geklappt. Versuch es noch einmal.",
		connectCancelled: "Verbinden wurde abgebrochen.",
		appleOff: "Apple Intelligence ist auf diesem Mac ausgeschaltet. Schalte es unter Systemeinstellungen → Apple Intelligence & Siri ein.",
		appleLoading: "Apple lädt das Modell für Apple Intelligence noch auf diesen Mac. Versuch es gleich noch einmal.",
		appleMissing: "Der Helfer für Apple Intelligence (wizards-apple) fehlt in dieser Installation.",
		appleOs: "Apple Intelligence braucht macOS 26 oder neuer.",
		appleDevice: "Apple Intelligence gibt es nur auf einem Mac mit Apple Silicon.",
		appleBusy: "Apple Intelligence nimmt gerade keine weiteren Anfragen an. Versuch es gleich noch einmal.",
		appleTooLong: "Der Text ist zu lang für Apple Intelligence auf diesem Mac (4.096 Tokens für Frage und Antwort). Wähle unter Einstellungen → Modelle ein anderes Modell für diese Klasse.",
		appleRefused: "Apple Intelligence hat die Anfrage abgelehnt: Apples Inhaltsregeln lassen sie nicht zu.",
		appleLanguage: "Apple Intelligence versteht die Sprache dieser Anfrage nicht.",
		appleFormat: "Apple Intelligence kann dieses Antwortformat nicht liefern: {detail}",
		appleFailed: "Apple Intelligence: {detail}",
		appleNoFfmpeg: "Apple Intelligence liest {type} nicht, und ohne ffmpeg lässt sich die Aufnahme nicht umwandeln. Installiere ffmpeg oder nimm im Browser als MP4 auf.",
		appleNotConverted: "Apple Intelligence konnte die Aufnahme nicht umwandeln: {detail}",
		connectorAlreadyExistsSpace: "Den Connector „{id}“ gibt es in diesem Space schon.",
		connectorNotExist: "Diesen Connector gibt es nicht.",
		fieldMissing: "„{label}“ fehlt.",
		mailServerNotExist: "Den Mail-Server{host} gibt es nicht. Trag den IMAP-Server ein, bei Gmail und Google Workspace imap.gmail.com.",
		mailServerNotResponding: "Der Mail-Server{host} antwortet nicht. Prüf IMAP-Server und Port.",
		connectingNotWork: "Verbinden hat nicht geklappt{host}: {detail}",
		connectEngentyAccountFirst: "Verbinde zuerst dein engenty-Konto (Einstellungen → Konto). Dann kannst du Google hier verbinden.",
		engentyAccountNotReached: "Dein engenty-Konto ist gerade nicht erreichbar. Versuch es später noch einmal.",
		googleNoLongerAccepts: "Google nimmt diese Verbindung nicht mehr an. Verbinde das Konto neu.",
		googleNotConnectedThrough: "Google lässt sich über dein engenty-Konto gerade nicht verbinden.",
		stepNeedsToolPlugin: "Dieser Schritt braucht das Werkzeug „{id}“. Das Plugin „{plugin}“ ist hier nicht installiert.",
		clientNotSignedIn: "{name} ist auf diesem Computer nicht angemeldet. Melde dich unter Einstellungen → Modelle an.",
		clientNotInstalled: "{name} ist auf diesem Computer nicht installiert. Installiere es unter Einstellungen → Modelle.",
		clientNoCredit: "Das Konto, mit dem {name} angemeldet ist, hat kein Guthaben oder Kontingent mehr.",
		clientAccountNotServed: "{name} bedient das Konto, mit dem es angemeldet ist, nicht mehr. Melde es mit einem anderen Konto an oder wähle unter Einstellungen → Modelle einen anderen Weg.",
		anthropicAccountClaudeCode: "Das Anthropic-Konto, mit dem Claude Code angemeldet ist, hat kein Guthaben. Melde Claude Code unter Einstellungen → Modelle mit deinem Abo an.",
		chatgptAccountCodexSigned: "Das Kontingent des ChatGPT-Kontos, mit dem Codex angemeldet ist, ist aufgebraucht. Versuch es später noch einmal oder wähle einen anderen Client.",
		builtTerminalNotAvailable: "Das eingebaute Terminal ist auf diesem Computer nicht verfügbar. Führe den Befehl in deinem eigenen Terminal aus.",
		terminalNoLongerExists: "Dieses Terminal gibt es nicht mehr.",
		imageTypeNotReadable: "Bilder vom Typ {mime} lassen sich nicht lesen (PNG, JPEG und WebP gehen).",
		fileNotReadable: "„{name}“ ({mime}) lässt sich nicht lesen.",
		creditsNotSignedIn: "Dafür sind Credits gewählt, aber du bist mit keinem Konto angemeldet.",
		accountNoLongerSigned: "Das Konto ist nicht mehr angemeldet. Melde dich unter Einstellungen → Konto neu an.",
		modelNotUsedYet: "Das Modell „{ref}“ lässt sich noch nicht nutzen. Hinterleg unter Einstellungen → Modelle einen API-Key oder melde dich mit einem Konto an.",
		noModelForImages: "Für Bilder ist kein Modell eingerichtet.",
		noModelForVideos: "Für Videos ist kein Modell eingerichtet.",
		noModelForSpeech: "Für Sprachausgabe ist kein Modell eingerichtet.",
		noOpenaiApiKey: "Für Sprachgespräche ist kein OpenAI-API-Key hinterlegt (Einstellungen → Modelle).",
		modelNotAvailableAccount: "Dieses Modell gibt es mit deinem Konto nicht.",
		accountNoModelSet: "Dafür ist bei deinem Konto kein Modell eingerichtet.",
		claudeCodeMakesFilms: "Filme macht Claude Code auf diesem Computer mit deinem Abo. Richte es unter Einstellungen → Modelle als KI-Abo ein.",
		macNeedsFfmpegTranscribe: "Aufnahmen aus Chrome oder Firefox (WebM, Ogg) schreibt dieser Mac erst mit ffmpeg auf. Safari und die App brauchen es nicht. Installiere ffmpeg, z. B. mit „brew install ffmpeg“.",
		fieldRequired: "Pflichtfeld",
		chooseAtLeast: "Wähl mindestens {min} aus",
		chooseAtMost: "Höchstens {max} – entferne einige",
		enterNumber: "Gib eine Zahl ein",
		invalidChoice: "Ungültige Auswahl",
		timeNotOffered: "Dieser Termin wird nicht angeboten",
		notValidEmailAddress: "Keine gültige E-Mail-Adresse",
		notValidUrl: "Keine gültige URL",
		wizardRunOutCredits: "Dieser Wizard hat gerade kein Guthaben mehr. Versuch es später noch einmal.",
		providerCreditLow: "Das Guthaben beim Modellanbieter reicht dafür nicht aus (Videos brauchen dort ein Mindestguthaben). Lade dort auf und versuch es noch einmal.",
		aiServiceBusyRight: "Der KI-Dienst ist gerade ausgelastet. Versuch es gleich noch einmal.",
		stepTookTooLong: "Der Schritt hat zu lange gedauert. Versuch es noch einmal.",
		aiServiceNotReached: "Der KI-Dienst ist gerade nicht erreichbar. Versuch es später noch einmal.",
		notAvailableNow: "Das ist hier gerade nicht verfügbar.",
		fileNotFound: "Datei nicht gefunden",
		connectFirst: "Verbinde zuerst",
		noEntriesStepWork: "Es gibt keine Einträge, für die dieser Schritt arbeiten könnte.",
		stepNotReturnResult: "Der Schritt hat kein Ergebnis geliefert.",
		documentNotCreated: "Das Dokument konnte nicht erstellt werden.",
		stepMissingSourcesImages: "Für diesen Schritt fehlen die Vorlagen (Bilder oder Szenen).",
		noTextReadAloud: "Es gibt keinen Text zum Vorlesen.",
		wizardStillErrors: "Der Wizard hat noch Fehler.",
		noLanguageModelSet: "Hier ist kein Sprachmodell eingerichtet.",
		creditsUsedUp: "Dein Guthaben ist aufgebraucht.",
		chooseFile: "Wähl eine Datei.",
		pageNotReached: "Die Seite ist nicht erreichbar.",
		unknownEntry: "Unbekannter Eintrag.",
		chooseWizardFileMb: "Wähl eine Wizard-Datei ({PACKAGE_EXTENSION}) bis 30 MB.",
		recordingMbMost: "Die Aufnahme darf höchstens 10 MB groß sein.",
		onlyFinishedResultsShared: "Nur fertige Ergebnisse lassen sich teilen.",
		gradientFailed: "Daraus ließ sich kein Verlauf machen. Beschreib ihn anders.",
		onlyOneSpaceAllowed: "Hier ist nur ein Space möglich.",
		mostSpaces: {
			one: "Hier ist höchstens {count} Space möglich.",
			other: "Hier sind höchstens {count} Spaces möglich."
		},
		twoEntriesSameKey: "Zwei Einträge haben denselben Schlüssel.",
		notDeleteLastSpace: "Der letzte Space lässt sich nicht löschen.",
		notFound: "Das gibt es nicht oder nicht mehr.",
		categoryNeedsName: "Eine Kategorie braucht einen Namen.",
		unknownCategoryType: "Unbekannter Typ „{type}“.",
		spaceMostCategories: {
			one: "Ein Space hat höchstens {count} Kategorie.",
			other: "Ein Space hat höchstens {count} Kategorien."
		},
		categoryAlreadyExists: "Die Kategorie „{name}“ gibt es schon.",
		onlyChoiceCategoriesValues: "Werte gibt es nur bei Kategorien vom Typ Auswahl.",
		onlyValuesOneCategory: "Nur Werte einer Kategorie lassen sich zusammenführen.",
		templateNeedsNewerVersion: "Diese Vorlage braucht eine neuere Version von engenty wizards. Aktualisiere zuerst engenty wizards.",
		chatNotExist: "Diesen Chat gibt es nicht.",
		unknownRunner: "Einen Runner „{unknown}“ gibt es hier nicht.",
		leastOneRunnerStay: "Mindestens ein Runner muss eingeschaltet bleiben.",
		linkOpenRunnerTurned: "Der Link muss einen eingeschalteten Runner öffnen.",
		jobNotExistAlready: "Diesen Vorgang gibt es nicht, oder er ist schon beendet.",
		accountAlreadySpace: "Dieses Konto hat hier schon einen Space.",
		accountAlreadySpaces: {
			one: "Dieses Konto hat hier schon {count} Space.",
			other: "Dieses Konto hat hier schon {count} Spaces."
		},
		roomMostPublishedWizards: {
			one: "Hier hat höchstens {count} veröffentlichter Wizard Platz.",
			other: "Hier haben höchstens {count} veröffentlichte Wizards Platz."
		},
		spaceIdAlreadyExists: "Einen Space mit dieser Kennung gibt es hier schon, und er kommt nicht von deinem Computer.",
		wizardIdAlreadyBelongs: "Ein Wizard mit dieser Kennung gehört hier schon zu einem anderen Space.",
		idAlreadyUse: "Diese Kennung ist hier schon vergeben.",
		wizardNotSpace: "Diesen Wizard gibt es im Space nicht.",
		invalidColumns: "Ungültige Spalten.",
		spaceMostTables: {
			one: "Ein Space hat höchstens {count} Tabelle.",
			other: "Ein Space hat höchstens {count} Tabellen."
		},
		tableBelongsOneWizard: "Diese Tabelle gehört zu einer Liste des Wizards. Die Spalten kommen aus dem Wizard.",
		entryAlreadyExists: "Diesen Eintrag gibt es schon.",
		tableMostRows: {
			one: "Eine Tabelle hat höchstens {count} Zeile.",
			other: "Eine Tabelle hat höchstens {count} Zeilen."
		},
		spaceMostPages: {
			one: "Ein Space hat höchstens {count} Seite.",
			other: "Ein Space hat höchstens {count} Seiten."
		},
		pageNotSubpages: "Diese Seite kann keine Unterseiten haben.",
		pageNotOwnSubpage: "Eine Seite kann nicht ihre eigene Unterseite sein.",
		pageNeedsTitle: "Eine Seite braucht einen Titel.",
		unknownSpace: "Den Space „{space}“ gibt es nicht.",
		noParentPage: "Es gibt keine Seite mit dem Schlüssel „{parent}“, unter die diese Seite könnte.",
		onlyTeamAdmins: "Das dürfen nur Admins des Teams. Als Mitglied bearbeitest du die Wizards, die es schon gibt.",
		spaceEditedLocally: "Diesen Space bearbeitest du in engenty wizards auf deinem Computer, nicht hier.",
		wizardsRunOncePublished: "Hier laufen die Wizards, die du in engenty wizards auf deinem Computer veröffentlichst. Gebaut und bearbeitet wird dort.",
		logoImagePngSvg: "Ein Logo ist ein Bild (PNG, SVG, JPEG, WebP).",
		patternImageSvgPng: "Ein Muster ist ein Bild (SVG, PNG, JPEG, WebP).",
		filesGoHere: "Hierher gehören Bilder, Videos, Audio, PDFs, Schriften, Lottie und 3D-Modelle. Texte zum Nachschlagen gehören ins Wissen.",
		addressNotReached: "Die Adresse ist nicht erreichbar.",
		addressResponded: "Die Adresse antwortete mit {status}.",
		addressLeadsWebPage: "Unter der Adresse steht eine Webseite, kein Bild.",
		addressFileTooLarge: "Die Datei ist zu groß.",
		onlyDocumentsIndex: "Nur Dokumente stehen im Index.",
		emptyTooLargeDocument: "„{name}“ ist leer oder zu groß für ein Dokument.",
		spaceMostDocuments: {
			one: "Ein Space hat höchstens {count} Dokument.",
			other: "Ein Space hat höchstens {count} Dokumente."
		},
		accountSignedOut: "Das Konto ist abgemeldet. Melde dich neu an.",
		cloudNotReachedRight: "Die Cloud ist gerade nicht erreichbar.",
		publishWizardFirst: "Veröffentliche den Wizard zuerst.",
		wizardJsonUnreadable: "Das ist keine Wizard-Datei: Die wizard.json darin lässt sich nicht lesen.",
		wizardFileComesNewer: "Diese Wizard-Datei stammt aus einer neueren Version oder ist beschädigt. Aktualisiere engenty wizards oder exportiere den Wizard neu.",
		fileOver5Mb: "{name} ist größer als 5 MB.",
		wizardFileTooLarge: "Die Wizard-Datei ist zu groß: Ein Arbeitsbereich fasst höchstens 200 Dateien und 25 MB.",
		wizardFileNotOpened: "Die Wizard-Datei lässt sich nicht öffnen. Exportiere den Wizard neu und versuche es noch einmal.",
		wizardJsonMissing: "Das ist keine Wizard-Datei: Die wizard.json fehlt.",
		notValidFilePath: "„{name}“ ist kein gültiger Dateipfad.",
		workspaceWizardFileLarger: "Der Arbeitsbereich in der Wizard-Datei ist größer als 25 MB.",
		unknownTemplate: "Die Vorlage „{starterId}“ gibt es nicht.",
		wizardChangedMeantime: "Der Wizard wurde inzwischen geändert.",
		valueNotExist: "Diesen Wert gibt es nicht.",
		nothingFiledUnderValue: "Unter diesem Wert steht noch nichts.",
		filmNotRenderedNeeds: "Der Film ließ sich nicht rendern. Dafür braucht es ffmpeg und eine Zeitleiste im Widget.",
		signInRefused: "Anmeldung abgelehnt{host}. Stimmen Adresse und (App-)Passwort? Gmail und Google Workspace brauchen ein App-Passwort und eingeschaltetes IMAP.{answer}",
		serverSaid: " Antwort des Servers: {answer}",
		viaAccountFailed: "Verbinden über dein engenty-Konto hat nicht geklappt ({code}).",
		pluginInvalidInput: "„{id}“ bekam ungültige Angaben: {path} – {problem}",
		filmClientStopped: "{name} hat beim Film aufgehört: {detail}. Die Arbeit ist gespeichert. Ein neuer Versuch macht dort weiter.",
		filmWorkSaved: "{problem} Die Arbeit ist gespeichert. Ein neuer Versuch macht dort weiter.",
		filmRenderFailed: "Der Film ließ sich nicht rendern: {detail}",
		commandNotStarted: "Der Befehl konnte nicht starten: {detail}",
		providerKeyMissing: "Für {makes} ist {provider} gewählt, aber kein API-Key hinterlegt.",
		noModelFor: "Für {makes} ist kein Modell eingerichtet.",
		noApiKeyFor: "Für {provider} ist kein API-Key hinterlegt.",
		freeTier: "Dein AI-Gateway-Key nutzt bei Vercel die kostenlose Stufe, und die schließt {model} aus. Lade bei Vercel Guthaben auf ({url}) oder wähle unter Einstellungen → Modelle ein anderes Modell.",
		thisModel: "dieses Modell",
		quoted: "„{text}“",
		viewErrors: "Die Ansicht hat Fehler: {detail}",
		stepFailed: "Dieser Schritt hat nicht geklappt: {detail}",
		answersMissing: "Antworten fehlen oder passen nicht: {answers}",
		templateNeedsPlugins: {
			one: "Diese Vorlage braucht das Plugin {plugins}: bei Pro auf engenty.ai dabei.",
			other: "Diese Vorlage braucht die Plugins {plugins}: bei Pro auf engenty.ai dabei."
		},
		pageMostChars: "Eine Seite hat höchstens {count} Zeichen.",
		chooseFileUpTo: "Wähl eine Datei bis {mb} MB.",
		roomMostFiles: {
			one: "Hier hat höchstens {count} Datei Platz.",
			other: "Hier haben höchstens {count} Dateien Platz."
		},
		makesText: "Text",
		makesImages: "Bilder",
		makesVideos: "Videos",
		makesSpeech: "Sprachausgabe",
		makesVoiceNotes: "Sprachnotizen"
	}
};
function Xu(e, t, n) {
	return Array.isArray(e) ? e.map((e) => Xu(e, t, n)) : typeof e == "object" && e && "code" in e ? Zu(e, t, n) : e;
}
function Zu(e, t, n) {
	if (!(e.code in Ju)) return "";
	let r = {};
	for (let [i, a] of Object.entries(e.params ?? {})) r[i] = a === void 0 ? void 0 : Xu(a, t, n);
	let i = n?.[e.code];
	return i === void 0 ? Ku(Yu, e.code, Dl(t) ? t : "en", r) : qu(i, t, r);
}
var Qu = {
	en: {
		"result.translate": "Translate",
		"translation.working": "Translating…",
		"translation.machine": "Machine-translated",
		"translation.showOriginal": "Show original",
		"translation.showTranslated": "Show translation",
		"translation.failed": "This wizard can’t be translated right now.",
		"share.copied": "Copied",
		"surface.done": "{done} of {total}",
		"surface.allDone": "All done",
		"surface.close": "Close",
		"data.view": "View",
		"data.edit": "Edit",
		"data.json": "JSON",
		"data.modes": "Show the data as",
		"data.add": "Add {what}",
		"data.remove": "Remove",
		"data.missing": "{id} is missing",
		"data.yes": "Yes",
		"data.no": "No",
		"data.menu": "More",
		"data.open": "View and edit the data",
		"data.close": "Close the data",
		"data.save": "Save",
		"data.saved": "Saved",
		"data.schema": "JSON Schema",
		"data.copy": "Copy",
		"data.download": "Download",
		"run.closed": "Not available here right now. It needs {list}.",
		"slot.later": "Show later times",
		"slot.none": "No times are free right now.",
		"cards.open": "Details",
		"cards.picked": "Chosen ✓",
		"cards.pick": "Choose",
		"run.cls.text": "text",
		"run.cls.image": "images",
		"run.cls.video": "video",
		"run.cls.speech": "speech output",
		"run.cls.audio": "voice notes",
		"run.cls.account": "an engenty account",
		"run.next": "Continue",
		"run.back": "Back",
		"run.accept": "Looks good",
		"run.edit": "Edit",
		"run.pickItem": "No. {n}",
		"run.pickedItem": "No. {n} again",
		"run.regeneratePicked": "Only no. {n} will be redone.",
		"run.regenerateAll": "Applies to all. Tap a number to redo just that one.",
		"check.progress": "{done} of {total} checked",
		"check.onlyOpen": "Open only",
		"check.noFile": "There’s no file for this row.",
		"check.noPreview": "This file has no preview – open it with the link above.",
		"check.reopen": "Open again",
		"run.feedbackPlaceholder": "Something not right? Write what should be different…",
		"run.feedbackTarget": "What should change?",
		"run.feedbackPick": "Choose above what should change.",
		"ai.generated": "AI-generated",
		"ai.modified": "AI-modified",
		"ai.publish": "Made with AI: whoever publishes this has to label it as AI-generated (EU AI Act, Art. 50). The file already carries the marking in its metadata.",
		"run.regenerateGo": "Recreate",
		"run.retry": "Try again",
		"run.again": "Start over",
		"run.copy": "Copy text",
		"run.failed": "Something went wrong.",
		"run.notFound": "This wizard doesn’t exist or was deleted.",
		"run.working": "One moment…",
		"run.elapsed": "{s} s",
		"run.cancelled": "Cancelled.",
		"run.addRow": "Add row",
		"run.upload": "Choose a file or drop it here",
		"run.uploading": "Uploading…",
		"run.net": "Net",
		"run.vat": "VAT {r}%",
		"run.total": "Total",
		"run.uploadMore": "Another file",
		"run.camera": "Camera",
		"camera.title": "Take a picture",
		"camera.hint": "Hold it flat and well lit.",
		"camera.taken": "{n} taken",
		"camera.shoot": "Capture",
		"camera.done": "Done",
		"camera.denied": "The camera isn’t allowed for this page. Allow it in your browser’s site settings (the lock icon in the address bar) – or take the photo with your camera app.",
		"connect.go": "Connect",
		"connect.connected": "Connected through {name}",
		"connect.disconnect": "Disconnect",
		"connect.none": "This server has no provider for connecting accounts yet.",
		"connect.openLink": "Click here to open the sign-in in a new tab",
		"list.empty": "No entries yet.",
		"list.delete": "Delete row",
		"ask.typeInto": "Type into the page…",
		"ask.hide": "hidden",
		"ask.up": "Scroll up",
		"ask.down": "Scroll down",
		"ask.pictureHint": "This is the page the wizard has open, live. You can also click and type right in it.",
		"ask.remember": "Remember this sign-in for next time",
		"ask.private": "What you enter goes straight into the page. The AI never sees it. Remembered sign-ins are stored encrypted.",
		"ask.skip": "Skip",
		"ask.done": "I’m signed in",
		"ask.signIn": "Sign in",
		"ask.wants": "The wizard wants to run this in {service}:",
		"ask.allowRest": "Allow for the rest of this run",
		"ask.allow": "Allow",
		"ask.deny": "Don’t allow",
		"store.open": "What this wizard remembers",
		"store.title": "Kept for you",
		"store.explain": "This wizard keeps lists, files and connected accounts for your next run. Only you see them.",
		"store.empty": "Nothing kept yet.",
		"store.rows": {
			one: "{n} entry",
			other: "{n} entries"
		},
		"store.signIns": "Remembered sign-ins in the browser",
		"store.files": {
			one: "{n} file · {size}",
			other: "{n} files · {size}"
		},
		"store.delete": "Delete everything",
		"store.confirmDelete": "Yes, delete everything",
		"common.close": "Close",
		"run.uploadTouch": "Choose a file",
		"run.maxFiles": {
			one: "At most {n} fits here – the rest were left out.",
			other: "At most {n} fit here – the rest were left out."
		},
		"run.filesMin": "{n} of at least {min}",
		"run.filesOf": "{n} of at most {max}",
		"run.moveFile": "Move no. {n}",
		"run.moveFileHint": "Drag to change the order",
		"run.removeFile": "Remove",
		"run.awake": "The screen stays on while the wizard works.",
		"run.openFull": "Open full size",
		"run.yes": "Yes",
		"run.no": "No",
		"run.share": "Share",
		"run.shareNow": "Share now",
		"run.shareFile": "Share as a file or open in an app",
		"run.print": "Print",
		"camera.asking": "Your browser is about to ask for the camera. The picture stays in this wizard.",
		"camera.native": "Open the camera app",
		"camera.pick": "Choose a photo",
		"camera.torch": "Light",
		"camera.flip": "Switch camera",
		"camera.photo": "Photo",
		"camera.video": "Video",
		"camera.record": "Start recording",
		"camera.stop": "Stop recording",
		"camera.recording": "Recording – tap to stop.",
		"camera.clipHint": "A short clip, {s} seconds at most.",
		"camera.hintMany": "Capture page after page, then “Done”.",
		"scan.button": "Scan",
		"scan.title": "Scan a code",
		"scan.asking": "Your browser is about to ask for the camera – it only reads the code.",
		"scan.hint": "Hold the QR code or barcode inside the frame.",
		"scan.hintQr": "Hold the QR code inside the frame. This device doesn’t read barcodes here.",
		"scan.miss": "No code was found in the photo. Try closer and sharper.",
		"scan.fromPhoto": "Choose a photo of the code",
		"scan.typeInstead": "Type it instead",
		"location.use": "Use my location",
		"location.locating": "Finding your location…",
		"location.refining": "getting more accurate…",
		"location.accuracy": "accurate to about {m} m",
		"location.map": "Map",
		"location.remove": "Remove location",
		"location.why": "Your browser asks for your location. It’s only used for this wizard. You can also just type the address.",
		"location.denied": "Location isn’t allowed for this page. Allow it in your browser’s site settings (the lock icon in the address bar) – or type the address below.",
		"location.manual": "Type an address or place",
		"location.label": "Address or description of the place",
		"voice.start": "Record a voice note",
		"voice.stop": "Stop",
		"voice.recording": "Recording…",
		"voice.left": "{s} s left",
		"voice.again": "Record again",
		"voice.remove": "Delete",
		"voice.pick": "Choose an audio file",
		"voice.why": "Your browser asks for the microphone. The recording is turned into text afterwards.",
		"voice.denied": "The microphone isn’t allowed for this page. Allow it in your browser’s site settings – or record the note with your voice memo app and choose the file.",
		"voice.noRecorder": "This browser can’t record here. Record the note with your voice memo app and choose the file.",
		"sign.open": "Sign here",
		"sign.hint": "Sign with your finger",
		"sign.pad": "Signature pad",
		"sign.clear": "Clear",
		"sign.accept": "Use it",
		"sign.again": "Sign again",
		"sign.remove": "Remove signature",
		"notify.ask": "Tell me when it’s done",
		"notify.on": "We’ll let you know",
		"notify.why": "With a sound, a buzz or a notification. Your browser asks once for permission.",
		"notify.onHint": "You can switch apps – a notification brings you back.",
		"notify.quiet": "With a sound and a buzz while this page is open.",
		"notify.blocked": "Notifications are blocked for this page – you get a sound and a buzz while it’s open. You can allow them in your browser’s site settings.",
		"notify.done": "Your result is ready.",
		"notify.next": "The next step is ready – have a look.",
		"notify.needsYou": "The wizard needs you for a moment.",
		"common.offline": "No connection. Check your network and try again.",
		"common.retry": "Try again",
		"common.cancel": "Cancel",
		"run.start": "Let’s go",
		"run.unavailable": "This wizard isn’t available right now.",
		"run.resume": "Continue your last run",
		"output.preview": "Preview",
		"package.newer": "This wizard file comes from a newer version, or it’s damaged. Update engenty wizards or export the wizard again.",
		"package.badJson": "This isn’t a wizard file: its wizard.json can’t be read.",
		"package.unreadable": "The wizard file can’t be opened. Export the wizard again and try once more.",
		"package.noManifest": "This isn’t a wizard file: wizard.json is missing.",
		"browser.driving": "You’re in control of the browser – click and type in the page. The wizard waits.",
		"browser.handBack": "Hand back",
		"browser.takeOver": "Take over",
		"chat.above": "Answer above in the chat",
		"chat.badEmail": "That doesn’t look like an email address.",
		"chat.badNumber": "Enter a number.",
		"chat.badUrl": "That isn’t a valid address.",
		"chat.change": "Change",
		"chat.checked": "Checked",
		"chat.connected": "Connected",
		"chat.dictate": "Dictate (⌘⇧M)",
		"chat.dictateStop": "Stop dictating",
		"chat.file": "1 file",
		"chat.files": {
			one: "{n} file",
			other: "{n} files"
		},
		"chat.listening": "Listening…",
		"chat.micDenied": "The microphone isn’t allowed for this page. Allow it in your browser’s site settings.",
		"chat.placeholder": "Your answer…",
		"chat.readAloud": "Read aloud",
		"chat.readAloudOff": "Stop reading aloud",
		"chat.required": "I need an answer for this one.",
		"chat.rows": {
			one: "{n} row",
			other: "{n} rows"
		},
		"chat.send": "Send",
		"chat.skip": "Skip",
		"chat.skipped": "Skipped",
		"chat.transcribing": "Writing it down…",
		"chat.voice": "Voice note",
		"install.add": "Add to home screen",
		"install.app": "Open in the app",
		"install.bookmark": "Bookmark this wizard",
		"install.bookmark.mac": "Press ⌘ D to keep this wizard in your bookmarks.",
		"install.bookmark.pc": "Press Ctrl + D to keep this wizard in your bookmarks.",
		"install.ios": "Tap “Share” below, then “Add to Home Screen”.",
		"run.madeWith": "Made with engenty wizards",
		"run.orAs": "Or: {label}",
		"talk.camera": "Switch the camera on",
		"talk.cameraDenied": "The camera isn’t allowed for this page. Allow it in your browser’s site settings.",
		"talk.cameraOff": "Switch the camera off",
		"talk.connecting": "Connecting…",
		"talk.failed": "The conversation couldn’t start. Check your connection and try again.",
		"talk.hint": "Talk to the wizard – the screen follows along.",
		"talk.joinHint": "Your browser asks for the microphone when you start, and for the camera only when you switch it on. The chat beside it follows along and handles what voice can’t.",
		"talk.listening": "Listening",
		"talk.live": "In conversation",
		"talk.speaking": "Speaking",
		"talk.start": "Start talking",
		"talk.stop": "End the conversation",
		"video.cameraOff": "Camera off",
		"video.ended": "Call ended",
		"video.flip": "Switch camera",
		"video.hint": "Your browser asks for the microphone and camera when you join. The chat beside it follows along and handles what voice can’t.",
		"video.join": "Join",
		"video.leave": "Leave",
		"video.mute": "Mute",
		"video.rejoin": "Rejoin",
		"video.unmute": "Unmute",
		"video.you": "You",
		"nav.language": "Language"
	},
	de: {
		"result.translate": "Übersetzen",
		"translation.working": "Wird übersetzt …",
		"translation.machine": "Maschinell übersetzt",
		"translation.showOriginal": "Original zeigen",
		"translation.showTranslated": "Übersetzung zeigen",
		"translation.failed": "Dieser Wizard lässt sich gerade nicht übersetzen.",
		"share.copied": "Kopiert",
		"surface.done": "{done} von {total}",
		"surface.allDone": "Alles erledigt",
		"surface.close": "Schließen",
		"data.view": "Ansicht",
		"data.edit": "Bearbeiten",
		"data.json": "JSON",
		"data.modes": "Daten zeigen als",
		"data.add": "{what} hinzufügen",
		"data.remove": "Entfernen",
		"data.missing": "{id} fehlt",
		"data.yes": "Ja",
		"data.no": "Nein",
		"data.menu": "Mehr",
		"data.open": "Daten ansehen und bearbeiten",
		"data.close": "Daten schließen",
		"data.save": "Speichern",
		"data.saved": "Gespeichert",
		"data.schema": "JSON Schema",
		"data.copy": "Kopieren",
		"data.download": "Herunterladen",
		"run.closed": "Hier gerade nicht verfügbar, dafür fehlt: {list}",
		"slot.later": "Spätere Termine zeigen",
		"slot.none": "Gerade sind keine Termine frei.",
		"cards.open": "Details",
		"cards.picked": "Ausgewählt ✓",
		"cards.pick": "Auswählen",
		"run.cls.text": "Text",
		"run.cls.image": "Bilder",
		"run.cls.video": "Videos",
		"run.cls.speech": "Sprachausgabe",
		"run.cls.audio": "Sprachnotizen",
		"run.cls.account": "ein engenty-Konto",
		"run.next": "Weiter",
		"run.back": "Zurück",
		"run.accept": "Passt so",
		"run.edit": "Bearbeiten",
		"run.pickItem": "Nr. {n}",
		"run.pickedItem": "Nr. {n} neu",
		"run.regeneratePicked": "Nur Nr. {n} wird neu erstellt.",
		"run.regenerateAll": "Alle werden neu erstellt. Tippe oben auf eine Nummer, um nur einzelne zu erneuern.",
		"check.progress": "{done} von {total} geprüft",
		"check.onlyOpen": "Nur offene",
		"check.noFile": "Zu dieser Zeile gibt es keine Datei.",
		"check.noPreview": "Für diese Datei gibt es keine Vorschau – öffne sie mit dem Link oben.",
		"check.reopen": "Wieder öffnen",
		"run.feedbackPlaceholder": "Passt etwas nicht? Schreib, was anders sein soll …",
		"run.feedbackTarget": "Was soll sich ändern?",
		"run.feedbackPick": "Wähle oben, was sich ändern soll.",
		"ai.generated": "KI-generiert",
		"ai.modified": "Mit KI verändert",
		"ai.publish": "Mit KI erstellt: Wer das veröffentlicht, muss es als KI-generiert kennzeichnen (EU AI Act, Art. 50). Die Datei trägt die Kennzeichnung bereits in ihren Metadaten.",
		"run.regenerateGo": "Neu erstellen",
		"run.retry": "Erneut versuchen",
		"run.again": "Nochmal",
		"run.copy": "Text kopieren",
		"run.failed": "Da hat etwas nicht geklappt.",
		"run.notFound": "Diesen Wizard gibt es nicht, oder er wurde gelöscht.",
		"run.working": "Einen Moment …",
		"run.elapsed": "{s} s",
		"run.cancelled": "Abgebrochen.",
		"run.addRow": "Zeile hinzufügen",
		"run.upload": "Datei wählen oder hierher ziehen",
		"run.uploading": "Lädt hoch …",
		"run.net": "Netto",
		"run.vat": "USt. {r} %",
		"run.total": "Gesamt",
		"run.uploadMore": "Weitere Datei",
		"run.camera": "Kamera",
		"camera.title": "Mit der Kamera aufnehmen",
		"camera.hint": "Gerade und gut beleuchtet ins Bild halten.",
		"camera.taken": "{n} aufgenommen",
		"camera.shoot": "Aufnehmen",
		"camera.done": "Fertig",
		"camera.denied": "Die Kamera ist für diese Seite nicht freigegeben. Erlaube sie in den Website-Einstellungen deines Browsers (Schloss-Symbol in der Adresszeile) – oder nimm das Foto mit der Kamera-App auf.",
		"connect.go": "Verbinden",
		"connect.connected": "Verbunden über {name}",
		"connect.disconnect": "Trennen",
		"connect.none": "Auf diesem Server ist noch kein Anbieter zum Verbinden eingerichtet.",
		"connect.openLink": "Anmeldung in neuem Tab öffnen",
		"list.empty": "Noch keine Einträge.",
		"list.delete": "Zeile löschen",
		"ask.typeInto": "Text in die Seite tippen …",
		"ask.hide": "verdeckt",
		"ask.up": "Nach oben",
		"ask.down": "Nach unten",
		"ask.pictureHint": "Hier siehst du live die Seite, die der Wizard geöffnet hat. Du kannst auch direkt hineinklicken und tippen.",
		"ask.remember": "Anmeldung für nächstes Mal merken",
		"ask.private": "Was du eingibst, geht direkt in die Seite. Die KI bekommt es nicht zu sehen. Gemerkte Anmeldungen werden verschlüsselt gespeichert.",
		"ask.skip": "Überspringen",
		"ask.done": "Ich bin angemeldet",
		"ask.signIn": "Anmelden",
		"ask.wants": "Der Wizard möchte in {service} Folgendes ausführen:",
		"ask.allowRest": "Für den Rest dieses Laufs erlauben",
		"ask.allow": "Erlauben",
		"ask.deny": "Nicht erlauben",
		"store.open": "Was dieser Wizard sich merkt",
		"store.title": "Für dich gemerkt",
		"store.explain": "Dieser Wizard merkt sich Listen, Dateien und verbundene Konten für deinen nächsten Lauf. Nur du siehst sie.",
		"store.empty": "Noch nichts gespeichert.",
		"store.rows": {
			one: "{n} Eintrag",
			other: "{n} Einträge"
		},
		"store.signIns": "Gemerkte Anmeldungen im Browser",
		"store.files": {
			one: "{n} Datei · {size}",
			other: "{n} Dateien · {size}"
		},
		"store.delete": "Alles löschen",
		"store.confirmDelete": "Ja, alles löschen",
		"common.close": "Schließen",
		"run.uploadTouch": "Datei wählen",
		"run.maxFiles": {
			one: "Hier geht höchstens {n} Datei – die übrigen sind weggelassen.",
			other: "Hier gehen höchstens {n} Dateien – die übrigen sind weggelassen."
		},
		"run.filesMin": "{n} von mindestens {min}",
		"run.filesOf": "{n} von höchstens {max}",
		"run.moveFile": "Nr. {n} verschieben",
		"run.moveFileHint": "Ziehen, um die Reihenfolge zu ändern",
		"run.removeFile": "Entfernen",
		"run.awake": "Der Bildschirm bleibt an, solange der Wizard arbeitet.",
		"run.openFull": "Groß öffnen",
		"run.yes": "Ja",
		"run.no": "Nein",
		"run.share": "Teilen",
		"run.shareNow": "Jetzt teilen",
		"run.shareFile": "Als Datei teilen oder in einer App öffnen",
		"run.print": "Drucken",
		"camera.asking": "Dein Browser fragt gleich nach der Kamera. Das Bild bleibt in diesem Wizard.",
		"camera.native": "Kamera-App öffnen",
		"camera.pick": "Foto auswählen",
		"camera.torch": "Licht",
		"camera.flip": "Kamera wechseln",
		"camera.photo": "Foto",
		"camera.video": "Video",
		"camera.record": "Aufnahme starten",
		"camera.stop": "Aufnahme beenden",
		"camera.recording": "Nimmt auf – tippe zum Beenden.",
		"camera.clipHint": "Ein kurzer Clip, höchstens {s} Sekunden.",
		"camera.hintMany": "Seite für Seite aufnehmen, dann „Fertig“.",
		"scan.button": "Scannen",
		"scan.title": "Code scannen",
		"scan.asking": "Dein Browser fragt gleich nach der Kamera – sie liest nur den Code.",
		"scan.hint": "Halte den QR- oder Barcode in den Rahmen.",
		"scan.hintQr": "Halte den QR-Code in den Rahmen. Barcodes kann dieses Gerät hier nicht lesen.",
		"scan.miss": "Auf dem Foto war kein Code zu erkennen. Versuch es näher und schärfer.",
		"scan.fromPhoto": "Foto mit dem Code wählen",
		"scan.typeInstead": "Lieber eintippen",
		"location.use": "Meinen Standort verwenden",
		"location.locating": "Standort wird bestimmt …",
		"location.refining": "wird noch genauer …",
		"location.accuracy": "auf etwa {m} m genau",
		"location.map": "Karte",
		"location.remove": "Standort entfernen",
		"location.why": "Dein Browser fragt nach deinem Standort. Er wird nur für diesen Wizard verwendet. Du kannst auch einfach die Adresse eintippen.",
		"location.denied": "Der Standort ist für diese Seite nicht freigegeben. Erlaube ihn in den Website-Einstellungen deines Browsers (Schloss-Symbol in der Adresszeile) – oder tippe die Adresse unten ein.",
		"location.manual": "Adresse oder Ort eintippen",
		"location.label": "Adresse oder Beschreibung des Orts",
		"voice.start": "Sprachnotiz aufnehmen",
		"voice.stop": "Stopp",
		"voice.recording": "Aufnahme läuft …",
		"voice.left": "noch {s} s",
		"voice.again": "Neu aufnehmen",
		"voice.remove": "Löschen",
		"voice.pick": "Audiodatei wählen",
		"voice.why": "Dein Browser fragt nach dem Mikrofon. Die Aufnahme wird danach in Text umgewandelt.",
		"voice.denied": "Das Mikrofon ist für diese Seite nicht freigegeben. Erlaube es in den Website-Einstellungen deines Browsers – oder nimm die Notiz mit der Diktier-App auf und wähle die Datei.",
		"voice.noRecorder": "Dieser Browser kann hier nicht aufnehmen. Nimm die Notiz mit der Diktier-App auf und wähle die Datei.",
		"sign.open": "Hier unterschreiben",
		"sign.hint": "Mit dem Finger unterschreiben",
		"sign.pad": "Unterschriftsfeld",
		"sign.clear": "Löschen",
		"sign.accept": "Übernehmen",
		"sign.again": "Neu unterschreiben",
		"sign.remove": "Unterschrift entfernen",
		"notify.ask": "Bescheid geben, wenn es fertig ist",
		"notify.on": "Du bekommst Bescheid",
		"notify.why": "Mit Ton, Vibration oder einer Mitteilung. Dein Browser fragt dafür einmal um Erlaubnis.",
		"notify.onHint": "Du kannst die App wechseln – eine Mitteilung holt dich zurück.",
		"notify.quiet": "Mit Ton und Vibration, solange diese Seite offen ist.",
		"notify.blocked": "Mitteilungen sind für diese Seite blockiert – es gibt Ton und Vibration, solange sie offen ist. Erlauben kannst du sie in den Website-Einstellungen deines Browsers.",
		"notify.done": "Dein Ergebnis ist fertig.",
		"notify.next": "Es geht weiter – wirf einen Blick darauf.",
		"notify.needsYou": "Der Wizard braucht dich kurz.",
		"common.offline": "Keine Verbindung. Prüf dein Netz und versuch es noch einmal.",
		"common.retry": "Erneut versuchen",
		"common.cancel": "Abbrechen",
		"run.start": "Los geht’s",
		"run.unavailable": "Dieser Wizard ist gerade nicht verfügbar.",
		"run.resume": "Letzten Lauf fortsetzen",
		"output.preview": "Vorschau",
		"package.newer": "Diese Wizard-Datei stammt aus einer neueren Version oder ist beschädigt. Aktualisiere engenty wizards oder exportiere den Wizard neu.",
		"package.badJson": "Das ist keine Wizard-Datei: Die wizard.json darin lässt sich nicht lesen.",
		"package.unreadable": "Die Wizard-Datei lässt sich nicht öffnen. Exportiere den Wizard neu und versuche es noch einmal.",
		"package.noManifest": "Das ist keine Wizard-Datei: Die wizard.json fehlt.",
		"browser.driving": "Du steuerst den Browser – klick und tipp in die Seite. Der Wizard wartet.",
		"browser.handBack": "Zurückgeben",
		"browser.takeOver": "Übernehmen",
		"chat.above": "Antworte oben im Chat",
		"chat.badEmail": "Das sieht nicht nach einer E-Mail-Adresse aus.",
		"chat.badNumber": "Das sieht nicht nach einer Zahl aus.",
		"chat.badUrl": "Das sieht nicht nach einer Webadresse aus.",
		"chat.change": "Ändern",
		"chat.checked": "Geprüft",
		"chat.connected": "Verbunden",
		"chat.dictate": "Diktieren (⌘⇧M)",
		"chat.dictateStop": "Diktat beenden",
		"chat.file": "1 Datei",
		"chat.files": {
			one: "{n} Datei",
			other: "{n} Dateien"
		},
		"chat.listening": "Ich höre zu …",
		"chat.micDenied": "Das Mikrofon ist für diese Seite nicht freigegeben. Erlaube es in den Website-Einstellungen deines Browsers.",
		"chat.placeholder": "Deine Antwort …",
		"chat.readAloud": "Vorlesen",
		"chat.readAloudOff": "Vorlesen beenden",
		"chat.required": "Dafür brauche ich eine Antwort.",
		"chat.rows": {
			one: "{n} Zeile",
			other: "{n} Zeilen"
		},
		"chat.send": "Senden",
		"chat.skip": "Überspringen",
		"chat.skipped": "Übersprungen",
		"chat.transcribing": "Wird in Text umgewandelt …",
		"chat.voice": "Sprachnotiz",
		"install.add": "Zum Startbildschirm hinzufügen",
		"install.app": "In der App öffnen",
		"install.bookmark": "Als Lesezeichen speichern",
		"install.bookmark.mac": "Drücke ⌘ D, dann liegt dieser Wizard in deinen Lesezeichen.",
		"install.bookmark.pc": "Drücke Strg + D, dann liegt dieser Wizard in deinen Lesezeichen.",
		"install.ios": "Tippe unten auf „Teilen“ und dann auf „Zum Home-Bildschirm“.",
		"run.madeWith": "Erstellt mit engenty wizards",
		"run.orAs": "Oder: {label}",
		"talk.camera": "Kamera einschalten",
		"talk.cameraDenied": "Die Kamera ist für diese Seite nicht freigegeben. Erlaube sie in den Website-Einstellungen deines Browsers.",
		"talk.cameraOff": "Kamera ausschalten",
		"talk.connecting": "Verbindet …",
		"talk.failed": "Das Gespräch ließ sich nicht starten.",
		"talk.hint": "Sprich mit dem Wizard. Auf dem Bildschirm kannst du mitlesen.",
		"talk.joinHint": "Beim Start fragt dein Browser nach dem Mikrofon, nach der Kamera erst, wenn du sie einschaltest. Im Chat daneben kannst du mitlesen und eingeben, was sich schlecht sagen lässt.",
		"talk.listening": "Hört zu",
		"talk.live": "Im Gespräch",
		"talk.speaking": "Spricht",
		"talk.start": "Gespräch beginnen",
		"talk.stop": "Gespräch beenden",
		"video.cameraOff": "Kamera aus",
		"video.ended": "Anruf beendet",
		"video.flip": "Kamera wechseln",
		"video.hint": "Beim Beitreten fragt dein Browser nach Mikrofon und Kamera. Im Chat daneben kannst du mitlesen und eingeben, was sich schlecht sagen lässt.",
		"video.join": "Beitreten",
		"video.leave": "Verlassen",
		"video.mute": "Stummschalten",
		"video.rejoin": "Wieder beitreten",
		"video.unmute": "Stummschaltung aufheben",
		"video.you": "Du",
		"nav.language": "Sprache"
	}
}, $u = "en", $ = null, ed = 0, td = /* @__PURE__ */ new Set();
function nd() {
	ed += 1;
	for (let e of td) e();
}
function rd(e) {
	e !== $u && ($u = e, nd());
}
function id(e) {
	e !== $ && ($ = e, nd());
}
function ad() {
	return $;
}
function od() {
	return $?.lang ?? $u;
}
function sd() {
	return e((e) => (td.add(e), () => td.delete(e)), () => ed), od();
}
function cd(e) {
	return e.note && Zu(e.note, od(), $?.notes) || e.message;
}
var ld = {};
function ud(e) {
	ld = e ?? {};
}
function dd(e) {
	return ld[e] ?? e;
}
function fd(e, t) {
	let n = $?.runner[e];
	return $ && n !== void 0 ? qu(n, $.lang, t) : Ku(Qu, e, $ ? "en" : $u, t);
}
//#endregion
export { Qc as A, W as B, Pu as C, Su as D, mu as E, q as F, Vs as H, U as I, H as L, Zc as M, Vc as N, Sl as O, Hc as P, J as R, Mu as S, Iu as T, z as V, Du as _, ad as a, wu as b, id as c, Qu as d, ku as f, Ml as g, Nu as h, od as i, nl as j, cl as k, fd as l, Nl as m, cd as n, ud as o, Q as p, $u as r, rd as s, dd as t, sd as u, Ru as v, Lu as w, Ll as x, bu as y, V as z };

//# sourceMappingURL=i18n-DLDYAU9t.js.map