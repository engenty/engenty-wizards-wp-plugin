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
	if (D.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
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
var Fe, Ie = !1, Le = {
	configurable: !0,
	get() {
		Ie = !0;
	}
};
function w(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Fe !== e._zod) {
		Fe = void 0;
		return;
	}
	Fe = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Le);
			let e = Ie;
			Ie = !1;
			try {
				let r = n(this);
				return Ie ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Ie ||= e, r;
			} catch (n) {
				throw delete this[t], Ie ||= e, n;
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
function Re(e, t, n, r) {
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
var ze = "~constantCatch";
function Be(e) {
	let t = () => e;
	return t[ze] = !0, t;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var Ve, He = {
	value: void 0,
	enumerable: !1
}, Ue = "captureStackTrace" in Error ? Error : null;
function We(e) {
	let t = Ue;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Ue = null, new e();
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
function T(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			He.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", He);
			} finally {
				He.value = void 0;
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
		let t = r?.Parent ? We(u) : this;
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
var E = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, Ge = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(Ve = globalThis).__zod_globalConfig ?? (Ve.__zod_globalConfig = {});
var D = globalThis.__zod_globalConfig;
function O(e) {
	return e && Object.assign(D, e), D;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function Ke() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, r, 2), e.message;
}
function qe(e) {
	this._zod.message = e;
}
var Je = {
	get: Ke,
	set: qe,
	enumerable: !0,
	configurable: !0
}, Ye = {
	value: void 0,
	enumerable: !1
}, Xe = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Ze = (e, t) => {
	e.name = "$ZodError", Ye.value = t, Object.defineProperty(e, "issues", Ye), Ye.value = void 0, Object.defineProperty(e, "message", Je);
	let n = Object.getPrototypeOf(e);
	Xe.has(n) || (Xe.add(n), Object.defineProperty(n, "toString", {
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
}, Qe = T("$ZodError", Ze);
T("$ZodError", Ze, void 0, { Parent: Error });
function $e(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function et(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? $e(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function tt(e, t = (e) => e.message) {
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
function nt(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var rt = (e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new E();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => S(e, o, O())));
			throw ne(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, it = (e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => S(e, o, O())));
			throw ne(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, at = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new E();
	return a.issues.length ? ot(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
};
function ot(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => S(e, n, O()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var st = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? ot(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, ct = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), lt = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), ut = ((e, t, n) => {
	let r = e._zod.bag.validator;
	if (r !== void 0) {
		if (r(t) !== ct) return !0;
		if (r.definite === !0 && n === void 0) return !1;
	}
	return dt(e, t, n);
});
function dt(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[lt] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new E();
	return a.issues.length === 0;
}
var ft = async (e, t, n) => {
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
}, pt = (e) => {
	let t = rt(e), n = (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return t(e, r, o, nt(n, a));
	};
	return n;
}, mt = (e) => {
	let t = rt(e), n = (e, r, i, a) => t(e, r, i, nt(n, a));
	return n;
}, ht = (e) => {
	let t = it(e), n = async (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return await t(e, r, o, nt(n, a));
	};
	return n;
}, gt = (e) => {
	let t = it(e), n = async (e, r, i, a) => await t(e, r, i, nt(n, a));
	return n;
}, _t = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return at(e)(t, n, i);
}, vt = (e) => (t, n, r) => at(e)(t, n, r), yt = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return st(e)(t, n, i);
}, bt = (e) => async (t, n, r) => st(e)(t, n, r), xt = /^[cC][0-9a-z]{6,}$/, St = /^[0-9a-z]+$/, Ct = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, wt = /^[0-9a-vA-V]{20}$/, Tt = /^[A-Za-z0-9]{27}$/, Et = /^[a-zA-Z0-9_-]{21}$/;
function Dt(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var Ot = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, kt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, At = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, jt = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Mt = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Nt() {
	return new RegExp(Mt, "u");
}
var Pt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ft = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, It = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Lt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Rt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, zt = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, Bt = /^https?$/, Vt = /^\+[1-9]\d{6,14}$/, Ht = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Ut(e) {
	return RegExp(`^${e}$`);
}
var Wt = /*@__PURE__*/ Ut(Ht);
function Gt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Kt(e) {
	return RegExp(`^${Gt(e)}$`);
}
function qt(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Gt({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Gt({ precision: e.precision })}` : n;
	return RegExp(`^${Ht}T(?:${r})$`);
}
var Jt = /^[\s\S]{0,}$/, Yt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, Xt = /^-?\d+$/, Zt = /^-?\d+(?:\.\d+)?$/, Qt = /^(?:true|false)$/i, $t = /^null$/i, en = /^[^A-Z]*$/, tn = /^[^a-z]*$/, k = /*@__PURE__*/ T("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), nn = (e) => {
	let t = e.value;
	return !o(t) && t.length !== void 0;
}, rn = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, an = /*@__PURE__*/ T("$ZodCheckLessThan", (e, t) => {
	k.init(e, t);
	let n = rn[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: rn[typeof r.value] ?? n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), on = /*@__PURE__*/ T("$ZodCheckGreaterThan", (e, t) => {
	k.init(e, t);
	let n = rn[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: rn[typeof r.value] ?? n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), sn = /*@__PURE__*/ T("$ZodCheckMultipleOf", (e, t) => {
	k.init(e, t), e._zod.check = (n) => {
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
}), cn = /*@__PURE__*/ T("$ZodCheckNumberFormat", (e, t) => {
	k.init(e, t), t.format = t.format || "float64";
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
}), ln = /*@__PURE__*/ T("$ZodCheckMaxLength", (e, t) => {
	var n;
	k.init(e, t), (n = e._zod.def).when ?? (n.when = nn), e._zod.check = (n) => {
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
}), un = /*@__PURE__*/ T("$ZodCheckMinLength", (e, t) => {
	var n;
	k.init(e, t), (n = e._zod.def).when ?? (n.when = nn), e._zod.check = (n) => {
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
}), dn = /*@__PURE__*/ T("$ZodCheckLengthEquals", (e, t) => {
	var n;
	k.init(e, t), (n = e._zod.def).when ?? (n.when = nn), e._zod.check = (n) => {
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
}), fn = /*@__PURE__*/ T("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	k.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
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
}), pn = /*@__PURE__*/ T("$ZodCheckRegex", (e, t) => {
	fn.init(e, t), e._zod.check = (n) => {
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
}), mn = /*@__PURE__*/ T("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= en, fn.init(e, t);
}), hn = /*@__PURE__*/ T("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= tn, fn.init(e, t);
}), gn = /*@__PURE__*/ T("$ZodCheckIncludes", (e, t) => {
	k.init(e, t);
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
}), _n = /*@__PURE__*/ T("$ZodCheckStartsWith", (e, t) => {
	k.init(e, t);
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
}), vn = /*@__PURE__*/ T("$ZodCheckEndsWith", (e, t) => {
	k.init(e, t);
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
}), yn = /*@__PURE__*/ T("$ZodCheckOverwrite", (e, t) => {
	k.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), bn = class {
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
}, xn = {
	major: 4,
	minor: 6,
	patch: 5
}, A = /*@__PURE__*/ T("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = xn;
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
				if (s instanceof Promise && r?.async === !1) throw new E();
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
				if (a.async === !1) throw new E();
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
				if (a.async === !1) throw new E();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return je(this, "~standard", wn(this));
	},
	set "~standard"(e) {
		C(this, "~standard", e);
	}
}), Sn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => S(e, t, O())) } : { value: e.value };
async function Cn(e, t) {
	let n = { async: !0 };
	return Sn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function wn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Sn(r, n);
			} catch {}
			return Cn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Tn = /*@__PURE__*/ T("$ZodString", (e, t) => {
	A.init(e, t), e._zod.pattern = t.pattern ?? Jt, e._zod.parse = (n, r) => {
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
}), j = /*@__PURE__*/ T("$ZodStringFormat", (e, t) => {
	fn.init(e, t), Tn.init(e, t);
}), En = /*@__PURE__*/ T("$ZodGUID", (e, t) => {
	t.pattern ??= kt, j.init(e, t);
}), Dn = /*@__PURE__*/ T("$ZodUUID", (e, t) => {
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
		t.pattern ??= At(e);
	} else t.pattern ??= At();
	j.init(e, t);
}), On = /*@__PURE__*/ T("$ZodEmail", (e, t) => {
	t.pattern ??= jt, j.init(e, t);
});
function kn(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function An(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? kn(e) || 2 : jn(e, t);
}
function jn(e, t) {
	if (!t.normalize && t.protocol?.source === Bt.source && !/^https?:\/\//i.test(e)) return 1;
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
var Mn = /[\t\n\r]/g;
function Nn(e) {
	return e.replace(Mn, "");
}
function Pn(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Fn(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
var In = /*@__PURE__*/ T("$ZodURL", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = An(r, t);
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
				n.value = Nn(r);
				return;
			}
			t.hostname && !Pn(i, t.hostname) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), t.protocol && !Fn(i, t.protocol) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), n.value = t.normalize ? i.href : Nn(r);
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
}), Ln = /*@__PURE__*/ T("$ZodEmoji", (e, t) => {
	t.pattern ??= Nt(), j.init(e, t);
}), Rn = /*@__PURE__*/ T("$ZodNanoID", (e, t) => {
	if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
	t.pattern ??= t.length === void 0 ? Et : Dt(t.length), j.init(e, t);
}), zn = /*@__PURE__*/ T("$ZodCUID", (e, t) => {
	t.pattern ??= xt, j.init(e, t);
}), Bn = /*@__PURE__*/ T("$ZodCUID2", (e, t) => {
	t.pattern ??= St, j.init(e, t);
}), Vn = /*@__PURE__*/ T("$ZodULID", (e, t) => {
	t.pattern ??= Ct, j.init(e, t);
}), Hn = /*@__PURE__*/ T("$ZodXID", (e, t) => {
	t.pattern ??= wt, j.init(e, t);
}), Un = /*@__PURE__*/ T("$ZodKSUID", (e, t) => {
	t.pattern ??= Tt, j.init(e, t);
}), Wn = /*@__PURE__*/ T("$ZodISODateTime", (e, t) => {
	t.pattern ??= qt(t), j.init(e, t);
}), Gn = /*@__PURE__*/ T("$ZodISODate", (e, t) => {
	t.pattern ??= Wt, j.init(e, t);
}), Kn = /*@__PURE__*/ T("$ZodISOTime", (e, t) => {
	t.pattern ??= Kt(t), j.init(e, t);
}), qn = /*@__PURE__*/ T("$ZodISODuration", (e, t) => {
	t.pattern ??= Ot, j.init(e, t);
}), Jn = /*@__PURE__*/ T("$ZodIPv4", (e, t) => {
	t.pattern ??= Pt, j.init(e, t);
}), Yn = /^[0-9a-fA-F:.]+$/;
function Xn(e) {
	return Yn.test(e) ? kn(`http://[${e}]`) : !1;
}
var Zn = /*@__PURE__*/ T("$ZodIPv6", (e, t) => {
	t.pattern ??= Ft, j.init(e, t), e._zod.check = (n) => {
		Xn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Qn = /*@__PURE__*/ T("$ZodCIDRv4", (e, t) => {
	t.pattern ??= It, j.init(e, t);
});
function $n(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Xn(n);
}
var er = /*@__PURE__*/ T("$ZodCIDRv6", (e, t) => {
	t.pattern ??= Lt, j.init(e, t), e._zod.check = (n) => {
		$n(n.value) || n.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function tr(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var nr = /^[0-9a-zA-Z+/]*={0,2}$/, rr = /*@__PURE__*/ T("$ZodBase64", (e, t) => {
	t.pattern ??= nr, j.init(e, t), e._zod.check = (n) => {
		tr(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), ir = /^[A-Za-z0-9_-]*$/;
function ar(e) {
	if (!ir.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return tr(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var or = /*@__PURE__*/ T("$ZodBase64URL", (e, t) => {
	t.pattern ??= ir, j.init(e, t), e._zod.check = (n) => {
		ar(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), sr = /*@__PURE__*/ T("$ZodE164", (e, t) => {
	t.pattern ??= Vt, j.init(e, t);
});
function cr(e, t = null) {
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
var lr = /*@__PURE__*/ T("$ZodJWT", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		cr(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), ur = /*@__PURE__*/ T("$ZodNumber", (e, t) => {
	A.init(e, t), e._zod.pattern = Zt, e._zod.parse = (n, r) => {
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
}), dr = /*@__PURE__*/ T("$ZodNumberFormat", (e, t) => {
	cn.init(e, t), ur.init(e, t);
}), fr = /*@__PURE__*/ T("$ZodBoolean", (e, t) => {
	A.init(e, t), e._zod.pattern = Qt, e._zod.parse = (n, r) => {
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
}), pr = /*@__PURE__*/ T("$ZodNull", (e, t) => {
	A.init(e, t), e._zod.pattern = $t, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), mr = /*@__PURE__*/ T("$ZodUnknown", (e, t) => {
	A.init(e, t), e._zod.parse = (e) => e;
}), hr = /*@__PURE__*/ T("$ZodNever", (e, t) => {
	A.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function gr(e, t, n) {
	e.issues.length && t.issues.push(...Se(n, e.issues)), t.value[n] = e.value;
}
var _r = /*@__PURE__*/ T("$ZodArray", (e, t) => {
	A.init(e, t);
	let n = D.memoizer;
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
			if (c instanceof Promise) o.push(c.then((t) => gr(t, r, e)));
			else if (gr(c, r, e), s && c.issues.length !== 0 && x(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function vr(e, t, n, r, i, a) {
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
var yr = [];
function br(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : yr, i = r.length ? [...t, ...r] : t;
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
function xr(e, t, n, r, i, a, o) {
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
		a instanceof Promise ? e.push(a.then((e) => vr(e, n, i, t, d, f))) : vr(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Sr = /*@__PURE__*/ T("$ZodObject", (e, t) => {
	A.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = a(() => br(t));
	w(e, "propValues", (e) => {
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
	let o = re, s = t.catchall, c, u = D.memoizer;
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
			c instanceof Promise ? a.push(c.then((n) => vr(n, t, e, r, o, s))) : vr(c, t, e, r, o, s);
		}
		return s ? xr(a, r, t, n, i.value, e, d === !0) : a.length ? Promise.all(a).then(() => t) : t;
	};
}), Cr = /*@__PURE__*/ T("$ZodObjectJIT", (e, t) => {
	Sr.init(e, t);
	let n = e._zod.parse, r = a(() => br(t)), i = D.memoizer, o = (t) => {
		let n = r.value, a = n.symbolKeys, o = new bn(["payload", "ctx"], {
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
	}, s, c = re, l = !D.jitless, u = l && ie.value, d = t.catchall, f;
	e._zod.parse = (i, a) => {
		f ??= r.value;
		let p = i.value;
		return c(p) ? l && u && a?.async === !1 && a.jitless !== !0 ? (s ||= o(t.shape), i = s(i, a), d ? xr([], p, i, a, f, e, a?.abortEarly === !0) : i) : n(i, a) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), i);
	};
});
function wr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !x(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => S(e, r, O())))
	}), t);
}
var Tr = /*@__PURE__*/ T("$ZodUnion", (e, t) => {
	A.init(e, t), w(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), w(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), w(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), w(e, "pattern", (e) => {
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
		return a ? Promise.all(o).then((t) => wr(t, r, e, i)) : wr(o, r, e, i);
	};
});
function Er(e) {
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
var Dr = /*@__PURE__*/ T("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, Tr.init(e, t);
	let n = e._zod.parse;
	w(e, "propValues", (e) => {
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
	let r = a(() => Er(t));
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
}), Or = /*@__PURE__*/ T("$ZodIntersection", (e, t) => {
	A.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Ar(e, t, n)) : Ar(e, i, a);
	};
});
function kr(e, t) {
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
			let r = kr(e[n], t[n]);
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
			let i = e[r], a = t[r], o = kr(i, a);
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
function Ar(e, t, n) {
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
	let c = kr(t.value, n.value);
	if (!c.valid) {
		if (x(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
var jr = /*@__PURE__*/ T("$ZodRecord", (e, t) => {
	A.init(e, t);
	let n = D.memoizer;
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
						issues: s.issues.map((e) => S(e, i, O())),
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
				if (typeof n == "string" && Zt.test(n) && l.issues.length) {
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
						issues: l.issues.map((e) => S(e, i, O())),
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
}), Mr = /*@__PURE__*/ T("$ZodEnum", (e, n) => {
	A.init(e, n);
	let r = t(n.entries), i = new Set(r);
	e._zod.values = i, w(e, "pattern", (e) => {
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
}), Nr = /*@__PURE__*/ T("$ZodLiteral", (e, t) => {
	A.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, w(e, "pattern", (e) => {
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
}), Pr = /*@__PURE__*/ T("$ZodTransform", (e, t) => {
	A.init(e, t), e._zod.optin = "optional", D.memoizer?.guard(e), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new Ge(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new E();
		return n.value = i, n;
	};
});
function Fr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Ir = /*@__PURE__*/ T("$ZodOptional", (e, t) => {
	A.init(e, t), w(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", w(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), w(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${s(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Fr(e, t)) : Fr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Lr = /*@__PURE__*/ T("$ZodExactOptional", (e, t) => {
	Ir.init(e, t), w(e, "values", (e) => e.def.innerType._zod.values), w(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Rr = /*@__PURE__*/ T("$ZodNullable", (e, t) => {
	A.init(e, t), w(e, "optin", (e) => e.def.innerType._zod.optin), w(e, "optout", (e) => e.def.innerType._zod.optout), w(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${s(t.source)}|null)$`) : void 0;
	}), w(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), zr = /*@__PURE__*/ T("$ZodDefault", (e, t) => {
	A.init(e, t), e._zod.optin = "defaulted", w(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Br(e, t)) : Br(r, t);
	};
});
function Br(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Vr = /*@__PURE__*/ T("$ZodPrefault", (e, t) => {
	A.init(e, t), e._zod.optin = "defaulted", w(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Hr = /*@__PURE__*/ T("$ZodNonOptional", (e, t) => {
	A.init(e, t), w(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Ur(t, e)) : Ur(i, e);
	};
});
function Ur(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function Wr(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => S(e, r, O())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
var Gr = /*@__PURE__*/ T("$ZodCatch", (e, t) => {
	A.init(e, t), w(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), w(e, "optout", (e) => e.def.innerType._zod.optout), w(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run({
			value: e.value,
			issues: []
		}, n);
		return r instanceof Promise ? r.then((r) => Wr(e, r, t, n)) : Wr(e, r, t, n);
	};
}), Kr = /*@__PURE__*/ T("$ZodPipe", (e, t) => {
	A.init(e, t), w(e, "values", (e) => e.def.in._zod.values), w(e, "optin", (e) => e.def.in._zod.optin), w(e, "optout", (e) => e.def.out._zod.optout), w(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => qr(e, t.in, n)) : qr(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => qr(e, t.out, n)) : qr(r, t.out, n);
	};
});
function qr(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var Jr = /*@__PURE__*/ T("$ZodPreprocess", (e, t) => {
	Kr.init(e, t);
}), Yr = /*@__PURE__*/ T("$ZodReadonly", (e, t) => {
	A.init(e, t), w(e, "propValues", (e) => e.def.innerType._zod.propValues), w(e, "values", (e) => e.def.innerType._zod.values), w(e, "optin", (e) => e.def.innerType?._zod?.optin), w(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Xr) : Xr(r);
	};
});
function Xr(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function Zr(e) {
	let t = e._zod.def, n = t.pattern, r = !!t.format?.includes("int"), i, a;
	for (let e of t.checks ?? []) {
		let t = e._zod.def;
		t.pattern && (n = t.pattern), r ||= !!t.format?.includes("int");
		let o = t.minimum ?? t.length, s = t.maximum ?? t.length;
		o !== void 0 && (i === void 0 || o > i) && (i = o), s !== void 0 && (a === void 0 || s < a) && (a = s);
	}
	if (n) return n.source;
	if (i !== void 0 && a !== void 0 && i > a) return "(?!)";
	if (i !== void 0 || a !== void 0) return Yt({
		minimum: i,
		maximum: a
	}).source;
	let o = e._zod.pattern;
	return (r && o === Zt ? Xt : o)?.source;
}
function Qr(e) {
	let t = e._zod.def, n = e._zod.pattern?.source, r = t.innerType ?? e._zod.innerType;
	if (r) {
		let e = r._zod.pattern?.source, t = Qr(r);
		return n && e && t && t !== e ? n.replace(s(e), () => s(t)) : n;
	}
	if (t.options) {
		let e = t.options.map(Qr);
		if (e.every(Boolean)) return `^(${e.map((e) => s(e)).join("|")})$`;
	}
	return Zr(e);
}
var $r = /*@__PURE__*/ T("$ZodTemplateLiteral", (e, t) => {
	A.init(e, t);
	let n = [];
	for (let e of t.parts) if (typeof e == "object" && e) {
		let t = Qr(e);
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
}), ei = /*@__PURE__*/ T("$ZodCustom", (e, t) => {
	k.init(e, t), A.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => ti(t, n, r, e));
		ti(i, n, r, e);
	};
});
function ti(e, t, n, r) {
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
var ni = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, ri = "~memo", ii = [];
function ai(e) {
	return typeof e == "object" && !!e;
}
function oi(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var si = /*@__PURE__*/ new WeakMap(), ci = 0, li = 1, ui = 2;
function di(e, t, n) {
	let r = si.get(e);
	if (r !== void 0) return r ? ui : ci;
	if (t.has(e)) return ui;
	t.add(e);
	let i = ci, a = (e) => {
		if (i !== ui && e?._zod) {
			let r = di(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = ci;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? li : o.value?._zod ? di(o.value, t, n) : ci;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = u(c);
			s(e ? o(e, !0) : li), a(c.catchall);
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
			s(r ? di(r, t, !1) : li);
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
	return t.delete(e), fi(e, i);
}
function fi(e, t) {
	return t !== li && si.set(e, t === ui), t;
}
function pi(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var mi, hi = [], gi = {
	alloc(e, t, n) {
		let r = mi;
		if (!r) return n;
		mi = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), hi.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && vi(n, e.value)) throw new ni();
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
					let i = di(e, /* @__PURE__ */ new Set(), !1);
					if (i === ci) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === ui || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!ai(l)) return t(s, c);
				let u = c[ri];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[ri] = u);
				let d;
				i === c ? d = a : (d = pi(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...oi(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				mi = d;
				let p = hi.length, m = t(s, c);
				mi = void 0;
				let h = hi.length > p ? hi.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? oi(e.issues) : ii), e)) : (h && (h.issues = m.issues.length ? oi(m.issues) : ii), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function _i() {
	return gi;
}
function vi(e, t) {
	let n = e[ri]?.backEdges;
	return n !== void 0 && ai(t) && n.has(t);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var yi = () => {
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
function bi() {
	return { localeError: yi() };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var xi, Si = class {
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
function Ci() {
	return new Si();
}
(xi = globalThis).__zod_globalRegistry ?? (xi.__zod_globalRegistry = Ci());
var wi = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function Ti(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Ei(e, t) {
	return new e(Ti({
		type: "string",
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Di(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Oi(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
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
		version: "v4",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ji(e, t) {
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
function Mi(e, t) {
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
function Ni(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pi(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fi(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ii(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Li(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zi(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vi(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hi(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wi(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gi(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ki(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qi(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ji(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yi(e, t) {
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
function Xi(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qi(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $i(e, t) {
	return new e(Ti({
		type: "number",
		checks: [],
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ea(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ta(e, t) {
	return new e({
		type: "boolean",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function na(e, t) {
	return new e({
		type: "null",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ra(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function ia(e, t) {
	return new e({
		type: "never",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function aa(e, t) {
	return new an({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function oa(e, t) {
	return new an({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function sa(e, t) {
	return new on({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function ca(e, t) {
	return new on({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function la(e, t) {
	return new sn({
		check: "multiple_of",
		...b(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function ua(e, t) {
	return new ln({
		check: "max_length",
		...b(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function da(e, t) {
	return new un({
		check: "min_length",
		...b(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function fa(e, t) {
	return new dn({
		check: "length_equals",
		...b(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function pa(e, t) {
	return new pn({
		check: "string_format",
		format: "regex",
		...b(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function ma(e) {
	return new mn({
		check: "string_format",
		format: "lowercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ha(e) {
	return new hn({
		check: "string_format",
		format: "uppercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ga(e, t) {
	return new gn({
		check: "string_format",
		format: "includes",
		...b(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function _a(e, t) {
	return new _n({
		check: "string_format",
		format: "starts_with",
		...b(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function va(e, t) {
	return new vn({
		check: "string_format",
		format: "ends_with",
		...b(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ya(e) {
	return new yn({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function ba(e) {
	return /* @__PURE__ */ ya((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function xa() {
	return /* @__PURE__ */ ya((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Sa() {
	return /* @__PURE__ */ ya((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Ca() {
	return /* @__PURE__ */ ya((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function wa() {
	return /* @__PURE__ */ ya((e) => te(e));
}
// @__NO_SIDE_EFFECTS__
function Ta(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Ea(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Da(e, t) {
	let n = /* @__PURE__ */ Oa((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(ke(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(ke(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Oa(e, t) {
	let n = new k({
		check: "custom",
		...b(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function ka(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && l(e, t, n[t]);
	return e;
}
function Aa(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? wi,
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
function M(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function N(e, t, n = {
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
		a && (o.ref ||= a, N(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && ka(o.schema, c), t.io === "input" && P(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function ja(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Ma(e, t) {
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
				ref: `${i("__shared")}#/${r}/${ja(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + ja(a)
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
function Na(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Na(e);
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
var Pa = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), Fa = ["oneOf", "anyOf"];
function Ia(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function La(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Pa.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Ia(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			l(n, r, e.length === 1 ? e[0] : La(e) ?? { allOf: e });
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
			let t = Ia(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Ra(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Pa) if (t in e) return;
	let n = t.filter((e) => Fa.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = La(t);
	else {
		let e = n[0], i = Fa.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => La([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, ka(e, r));
}
function za(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : ka(i, s), ka(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
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
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Na(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Ra(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	ka(i, n.defId ? n.schema : n.def ?? n.schema);
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
					input: Va(t, "input", e.processors),
					output: Va(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function P(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return P(r.element, n);
	if (r.type === "set") return P(r.valueType, n);
	if (r.type === "lazy") return P(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return P(r.innerType, n);
	if (r.type === "intersection") return P(r.left, n) || P(r.right, n);
	if (r.type === "record" || r.type === "map") return P(r.keyType, n) || P(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : P(r.in, n) || P(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (P(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (P(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (P(e, n)) return !0;
		return !!(r.rest && P(r.rest, n));
	}
	return !1;
}
var Ba = (e, t = {}) => (n) => {
	let r = Aa({
		...n,
		processors: t
	});
	return N(e, r), Ma(r, e), za(r, e);
}, Va = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Aa({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return N(e, o), Ma(o, e), za(o, e);
}, F = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, Ha = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, Ua = (e, t) => {
	F(e, "minimum", t), Ha(e, "maximum", t);
}, Wa = (e, t) => {
	e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
}, Ga = (e, t) => {
	e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
}, Ka = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, qa = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, Ja = (e, t) => F(e, "minimum", t.minimum), Ya = (e, t) => Ha(e, "maximum", t.maximum), Xa = (e) => (t, n) => {
	qa(t, n.format);
	let [r, i] = e[n.format];
	F(t, "minimum", r), Ha(t, "maximum", i);
}, Za = {
	greater_than: (e, t) => F(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => Ha(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => Wa(e, t.value),
	number_format: Xa(ue),
	bigint_format: Xa(de),
	min_length: Ja,
	max_length: Ya,
	length_equals: (e, t) => Ua(e, t.length),
	min_size: Ja,
	max_size: Ya,
	size_equals: (e, t) => Ua(e, t.size),
	string_format: (e, t) => {
		qa(e, t.format), t.pattern && Ga(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => Ka(e, t.mime)
};
function I(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) Za[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && F(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && F(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && Ha(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && Ha(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && Wa(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && Ka(t, i.mime);
	for (let e of i.patterns ?? []) Ga(t, e);
	return t;
}
var Qa = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, $a = /* @__PURE__ */ new Map([[nr, Rt], [ir, zt]]), eo = (e) => $a.get(e) ?? e, to = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = I(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Qa[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map(eo);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, no = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = I(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : M(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, ro = (e, t, n, r) => {
	n.type = "boolean";
}, io = (e, t, n, r) => {
	M(e, t, n, r, "BigInt cannot be represented in JSON Schema");
}, ao = (e, t, n, r) => {
	M(e, t, n, r, "Symbols cannot be represented in JSON Schema");
}, oo = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, so = (e, t, n, r) => {
	M(e, t, n, r, "Undefined cannot be represented in JSON Schema");
}, co = (e, t, n, r) => {
	M(e, t, n, r, "Void cannot be represented in JSON Schema");
}, lo = (e, t, n, r) => {
	n.not = {};
}, uo = (e, t, n, r) => {}, fo = (e, t, n, r) => {}, po = (e, t, n, r) => {
	M(e, t, n, r, "Date cannot be represented in JSON Schema");
}, mo = (e, n, r, i) => {
	let a = e._zod.def, o = t(a.entries);
	if (o.length === 0) {
		r.not = {};
		return;
	}
	o.every((e) => typeof e == "number") && (r.type = "number"), o.every((e) => typeof e == "string") && (r.type = "string"), r.enum = o;
}, ho = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (M(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (M(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, go = (e, t, n, r) => {
	M(e, t, n, r, "NaN cannot be represented in JSON Schema");
}, _o = (e, t, n, r) => {
	let i = n, a = e._zod.pattern;
	if (!a) throw Error("Pattern not found in template literal");
	i.type = "string", i.pattern = a.source;
}, vo = (e, t, n, r) => {
	let i = n;
	i.type = "string", i.format = "binary", i.contentEncoding = "binary";
	let { minimum: a, maximum: o, mime: s } = I(e);
	a !== void 0 && (i.minLength = a), o !== void 0 && (i.maxLength = o), s && (s.length === 0 ? i.not = {} : s.length === 1 ? i.contentMediaType = s[0] : i.anyOf = s.map((e) => ({ contentMediaType: e })));
}, yo = (e, t, n, r) => {
	n.type = "boolean";
}, bo = (e, t, n, r) => {
	M(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, xo = (e, t, n, r) => {
	M(e, t, n, r, "Function types cannot be represented in JSON Schema");
}, So = (e, t, n, r) => {
	M(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Co = (e, t, n, r) => {
	M(e, t, n, r, "Map cannot be represented in JSON Schema");
}, wo = (e, t, n, r) => {
	M(e, t, n, r, "Set cannot be represented in JSON Schema");
}, To = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = I(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = N(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function Eo(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Eo(t.out) : t.type === "catch" ? Eo(t.innerType) : e._zod.optin;
}
var Do = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && M(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) l(i.properties, e, N(o[e], t, {
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
		(t.io === "input" ? Eo(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = N(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Oo = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => N(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, ko = (e, t, n, r) => {
	let i = e._zod.def, a = N(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = N(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
}, Ao = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "array";
	let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => N(e, t, {
		...r,
		path: [
			...r.path,
			o,
			n
		]
	})), l = a.rest ? N(a.rest, t, {
		...r,
		path: [
			...r.path,
			s,
			...t.target === "openapi-3.0" ? [a.items.length] : []
		]
	}) : null, u = a.items.length;
	for (; u > 0;) {
		let e = a.items[u - 1];
		if (!(t.io === "input" ? Eo(e) !== void 0 : e._zod.optout === "optional")) break;
		u--;
	}
	let d = a.items.length, f = !a.rest;
	t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
	let { minimum: p, maximum: m } = I(e);
	typeof p == "number" && (i.minItems = p), typeof m == "number" && (i.maxItems = m);
};
function jo(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = jo(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => jo(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? Zt : Xt).source), p) : p;
}
var Mo = /* @__PURE__ */ new WeakMap();
function No(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Mo.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = jo(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var Po = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = I(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = N(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) l(i.patternProperties, eo(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = N(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = Mo.get(t);
			n || (n = [], Mo.set(t, n), t.deferred.push(() => No(t))), n.push(e);
		}
		i.additionalProperties = N(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, u = t.io === "input" && Eo(a.valueType) !== void 0;
	if (c && !a.partial && !u) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, Fo = (e, t, n, r) => {
	let i = e._zod.def, a = N(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Io = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Lo = Symbol();
function Ro(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (M(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Lo) : JSON.parse(o);
}
var zo = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = Ro(i.defaultValue, e, t, n, r);
	o !== Lo && (n.default = o);
}, Bo = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = Ro(i.defaultValue, e, t, n, r);
	o !== Lo && (n._prefault = o);
}, Vo = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		M(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, Ho = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	N(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Uo = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Wo = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Go = (e, t, n, r) => {
	let i = e._zod.def;
	N(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ko = {
	string: to,
	number: no,
	boolean: ro,
	bigint: io,
	symbol: ao,
	null: oo,
	undefined: so,
	void: co,
	never: lo,
	any: uo,
	unknown: fo,
	date: po,
	enum: mo,
	literal: ho,
	nan: go,
	template_literal: _o,
	file: vo,
	success: yo,
	custom: bo,
	function: xo,
	transform: So,
	map: Co,
	set: wo,
	array: To,
	object: Do,
	union: Oo,
	intersection: ko,
	tuple: Ao,
	record: Po,
	nullable: Fo,
	nonoptional: Io,
	default: zo,
	prefault: Bo,
	catch: Vo,
	pipe: Ho,
	readonly: Uo,
	promise: Wo,
	optional: Go,
	lazy: (e, t, n, r) => {
		let i = e._zod.innerType;
		N(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}
};
function qo(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Aa({
			...t,
			processors: Ko
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			N(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			Ma(r, n), l(a, t, za(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Aa({
		...t,
		processors: Ko
	});
	return N(e, n), Ma(n, e), za(n, e);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
var Jo = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function Yo(e, t, n) {
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
var L = /*@__PURE__*/ T("ZodError", (e, t) => {
	Qe.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	Jo.has(n) || (Jo.add(n), Yo(n, "format", (e) => (t) => tt(e, t)), Yo(n, "flatten", (e) => (t) => et(e, t)), Yo(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, r, 2);
	}), Yo(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, r, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, void 0, { Parent: Error }), Xo = /* @__PURE__ */ rt(L), Zo = /* @__PURE__ */ it(L), Qo = /* @__PURE__ */ at(L), $o = /* @__PURE__ */ st(L), es = /* @__PURE__ */ pt(L), ts = /* @__PURE__ */ mt(L), ns = /* @__PURE__ */ ht(L), rs = /* @__PURE__ */ gt(L), is = /* @__PURE__ */ _t(L), as = /* @__PURE__ */ vt(L), os = /* @__PURE__ */ yt(L), ss = /* @__PURE__ */ bt(L);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function cs() {
	D.localeError || O(bi());
}
function ls() {
	D.memoizer || O({ memoizer: _i() });
}
var R = /*@__PURE__*/ T("ZodType", (e, t) => (cs(), A.init(e, t), e.def = t, e.type = t.type, e), {
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
		return this.check(Ec(e, t));
	},
	superRefine(e, t) {
		return this.check(Dc(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ ya(e));
	},
	optional() {
		return ac(this);
	},
	exactOptional() {
		return sc(this);
	},
	nullable() {
		return lc(this);
	},
	nullish() {
		return ac(lc(this));
	},
	nonoptional(e) {
		return hc(this, e);
	},
	array() {
		return U(this);
	},
	or(e) {
		return G([this, e]);
	},
	and(e) {
		return Qs(this, e);
	},
	transform(e) {
		return yc(this, rc(e));
	},
	default(e) {
		return dc(this, e);
	},
	prefault(e) {
		return pc(this, e);
	},
	catch(e) {
		return _c(this, e);
	},
	pipe(e) {
		return yc(this, e);
	},
	readonly() {
		return Sc(this);
	},
	describe(e) {
		let t = this.clone();
		return wi.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return wi.get(this);
		let t = this.clone();
		return wi.add(t, e[0]), t;
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
			...wn(this),
			jsonSchema: {
				input: Va(this, "input"),
				output: Va(this, "output")
			}
		});
	},
	set "~standard"(e) {
		C(this, "~standard", e);
	},
	parse: function e(t, n) {
		return Xo(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await Zo(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return Qo(this, e, t);
	},
	async safeParseAsync(e, t) {
		return $o(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		C(this, "spa", e);
	},
	validate(e, t) {
		return ut(this, e, t);
	},
	validateAsync(e, t) {
		return ft(this, e, t);
	},
	encode: function e(t, n) {
		return es(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return ts(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await ns(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await rs(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return is(this, e, t);
	},
	safeDecode(e, t) {
		return as(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return os(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return ss(this, e, t);
	},
	toJSONSchema(e) {
		return Ba(this, {})(e);
	},
	get description() {
		return wi.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), us = /*@__PURE__*/ T("_ZodString", (e, t) => {
	Tn.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => to(e, t, n, r);
}, /*@__PURE__*/ Me({
	format: (e) => I(e).format ?? null,
	minLength: (e) => I(e).minimum ?? null,
	maxLength: (e) => I(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(/* @__PURE__ */ pa(...e));
	},
	includes(...e) {
		return this.check(/* @__PURE__ */ ga(...e));
	},
	startsWith(...e) {
		return this.check(/* @__PURE__ */ _a(...e));
	},
	endsWith(...e) {
		return this.check(/* @__PURE__ */ va(...e));
	},
	min(...e) {
		return this.check(/* @__PURE__ */ da(...e));
	},
	max(...e) {
		return this.check(/* @__PURE__ */ ua(...e));
	},
	length(...e) {
		return this.check(/* @__PURE__ */ fa(...e));
	},
	nonempty(...e) {
		return this.check(/* @__PURE__ */ da(1, ...e));
	},
	lowercase(e) {
		return this.check(/* @__PURE__ */ ma(e));
	},
	uppercase(e) {
		return this.check(/* @__PURE__ */ ha(e));
	},
	trim() {
		return this.check(/* @__PURE__ */ xa());
	},
	normalize(...e) {
		return this.check(/* @__PURE__ */ ba(...e));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ Sa());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ Ca());
	},
	slugify() {
		return this.check(/* @__PURE__ */ wa());
	}
})), ds = /*@__PURE__*/ T("ZodString", (e, t) => {
	Tn.init(e, t), us.init(e, t);
}, {
	email(e) {
		return this.check(/* @__PURE__ */ Di(gs, e));
	},
	url(e) {
		return this.check(/* @__PURE__ */ Ni(ys, e));
	},
	jwt(e) {
		return this.check(/* @__PURE__ */ Ji(Ps, e));
	},
	emoji(e) {
		return this.check(/* @__PURE__ */ Pi(bs, e));
	},
	guid(e) {
		return this.check(/* @__PURE__ */ Oi(_s, e));
	},
	uuid(e) {
		return this.check(/* @__PURE__ */ ki(vs, e));
	},
	uuidv4(e) {
		return this.check(/* @__PURE__ */ Ai(vs, e));
	},
	uuidv6(e) {
		return this.check(/* @__PURE__ */ ji(vs, e));
	},
	uuidv7(e) {
		return this.check(/* @__PURE__ */ Mi(vs, e));
	},
	nanoid(e) {
		return this.check(/* @__PURE__ */ Fi(xs, e));
	},
	cuid(e) {
		return this.check(/* @__PURE__ */ Ii(Ss, e));
	},
	cuid2(e) {
		return this.check(/* @__PURE__ */ Li(Cs, e));
	},
	ulid(e) {
		return this.check(/* @__PURE__ */ Ri(ws, e));
	},
	base64(e) {
		return this.check(/* @__PURE__ */ Gi(js, e));
	},
	base64url(e) {
		return this.check(/* @__PURE__ */ Ki(Ms, e));
	},
	xid(e) {
		return this.check(/* @__PURE__ */ zi(Ts, e));
	},
	ksuid(e) {
		return this.check(/* @__PURE__ */ Bi(Es, e));
	},
	ipv4(e) {
		return this.check(/* @__PURE__ */ Vi(Ds, e));
	},
	ipv6(e) {
		return this.check(/* @__PURE__ */ Hi(Os, e));
	},
	cidrv4(e) {
		return this.check(/* @__PURE__ */ Ui(ks, e));
	},
	cidrv6(e) {
		return this.check(/* @__PURE__ */ Wi(As, e));
	},
	e164(e) {
		return this.check(/* @__PURE__ */ qi(Ns, e));
	},
	datetime(e) {
		return this.check(/* @__PURE__ */ Yi(fs, e));
	},
	date(e) {
		return this.check(/* @__PURE__ */ Xi(ps, e));
	},
	time(e) {
		return this.check(/* @__PURE__ */ Zi(ms, e));
	},
	duration(e) {
		return this.check(/* @__PURE__ */ Qi(hs, e));
	}
});
function z(e) {
	return /* @__PURE__ */ Ei(ds, e);
}
var B = /*@__PURE__*/ T("ZodStringFormat", (e, t) => {
	j.init(e, t), us.init(e, t);
}), fs = /*@__PURE__*/ T("ZodISODateTime", (e, t) => {
	Wn.init(e, t), B.init(e, t);
}), ps = /*@__PURE__*/ T("ZodISODate", (e, t) => {
	Gn.init(e, t), B.init(e, t);
}), ms = /*@__PURE__*/ T("ZodISOTime", (e, t) => {
	Kn.init(e, t), B.init(e, t);
}), hs = /*@__PURE__*/ T("ZodISODuration", (e, t) => {
	qn.init(e, t), B.init(e, t);
}), gs = /*@__PURE__*/ T("ZodEmail", (e, t) => {
	On.init(e, t), B.init(e, t);
}), _s = /*@__PURE__*/ T("ZodGUID", (e, t) => {
	En.init(e, t), B.init(e, t);
}), vs = /*@__PURE__*/ T("ZodUUID", (e, t) => {
	Dn.init(e, t), B.init(e, t);
}), ys = /*@__PURE__*/ T("ZodURL", (e, t) => {
	In.init(e, t), B.init(e, t);
}), bs = /*@__PURE__*/ T("ZodEmoji", (e, t) => {
	Ln.init(e, t), B.init(e, t);
}), xs = /*@__PURE__*/ T("ZodNanoID", (e, t) => {
	Rn.init(e, t), B.init(e, t);
}), Ss = /*@__PURE__*/ T("ZodCUID", (e, t) => {
	zn.init(e, t), B.init(e, t);
}), Cs = /*@__PURE__*/ T("ZodCUID2", (e, t) => {
	Bn.init(e, t), B.init(e, t);
}), ws = /*@__PURE__*/ T("ZodULID", (e, t) => {
	Vn.init(e, t), B.init(e, t);
}), Ts = /*@__PURE__*/ T("ZodXID", (e, t) => {
	Hn.init(e, t), B.init(e, t);
}), Es = /*@__PURE__*/ T("ZodKSUID", (e, t) => {
	Un.init(e, t), B.init(e, t);
}), Ds = /*@__PURE__*/ T("ZodIPv4", (e, t) => {
	Jn.init(e, t), B.init(e, t);
}), Os = /*@__PURE__*/ T("ZodIPv6", (e, t) => {
	Zn.init(e, t), B.init(e, t);
}), ks = /*@__PURE__*/ T("ZodCIDRv4", (e, t) => {
	Qn.init(e, t), B.init(e, t);
}), As = /*@__PURE__*/ T("ZodCIDRv6", (e, t) => {
	er.init(e, t), B.init(e, t);
}), js = /*@__PURE__*/ T("ZodBase64", (e, t) => {
	rr.init(e, t), B.init(e, t);
}), Ms = /*@__PURE__*/ T("ZodBase64URL", (e, t) => {
	or.init(e, t), B.init(e, t);
}), Ns = /*@__PURE__*/ T("ZodE164", (e, t) => {
	sr.init(e, t), B.init(e, t);
}), Ps = /*@__PURE__*/ T("ZodJWT", (e, t) => {
	lr.init(e, t), B.init(e, t);
}), Fs = /*@__PURE__*/ T("ZodNumber", (e, t) => {
	ur.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => no(e, t, n, r), e.isFinite = !0;
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
		return this.check(/* @__PURE__ */ sa(e, t));
	},
	gte(e, t) {
		return this.check(/* @__PURE__ */ ca(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ ca(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ aa(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ oa(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ oa(e, t));
	},
	int(e) {
		return this.check(Ls(e));
	},
	safe(e) {
		return this.check(Ls(e));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ sa(0, e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ ca(0, e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ aa(0, e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ oa(0, e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ la(e, t));
	},
	step(e, t) {
		return this.check(/* @__PURE__ */ la(e, t));
	},
	finite() {
		return this;
	}
}));
function V(e) {
	return /* @__PURE__ */ $i(Fs, e);
}
var Is = /*@__PURE__*/ T("ZodNumberFormat", (e, t) => {
	dr.init(e, t), Fs.init(e, t);
});
function Ls(e) {
	return /* @__PURE__ */ ea(Is, e);
}
var Rs = /*@__PURE__*/ T("ZodBoolean", (e, t) => {
	fr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => ro(e, t, n, r);
});
function H(e) {
	return /* @__PURE__ */ ta(Rs, e);
}
var zs = /*@__PURE__*/ T("ZodNull", (e, t) => {
	pr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => oo(e, t, n, r);
});
function Bs(e) {
	return /* @__PURE__ */ na(zs, e);
}
var Vs = /*@__PURE__*/ T("ZodUnknown", (e, t) => {
	mr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Hs() {
	return /* @__PURE__ */ ra(Vs);
}
var Us = /*@__PURE__*/ T("ZodNever", (e, t) => {
	hr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => lo(e, t, n, r);
});
function Ws(e) {
	return /* @__PURE__ */ ia(Us, e);
}
var Gs = /*@__PURE__*/ T("ZodArray", (e, t) => {
	ls(), _r.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => To(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(/* @__PURE__ */ da(e, t));
	},
	nonempty(e) {
		return this.check(/* @__PURE__ */ da(1, e));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ ua(e, t));
	},
	length(e, t) {
		return this.check(/* @__PURE__ */ fa(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function U(e, t) {
	return /* @__PURE__ */ Ta(Gs, e, t);
}
var Ks = /*@__PURE__*/ T("ZodObject", (e, t) => {
	ls(), Cr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Do(e, t, n, r), Re(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return q(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(g(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(g(this._zod.def, { catchall: Hs() }));
	},
	loose() {
		return this.clone(g(this._zod.def, { catchall: Hs() }));
	},
	strict() {
		return this.clone(g(this._zod.def, { catchall: Ws() }));
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
		return ye(ic, this, e[0]);
	},
	exactPartial(...e) {
		return ye(oc, this, e[0], "exactPartial");
	},
	required(...e) {
		return be(mc, this, e[0]);
	}
});
function W(e, t) {
	return new Ks({
		type: "object",
		shape: e ?? {},
		...b(t)
	});
}
function qs(e, t) {
	return new Ks({
		type: "object",
		shape: e,
		catchall: Hs(),
		...b(t)
	});
}
var Js = /*@__PURE__*/ T("ZodUnion", (e, t) => {
	Tr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oo(e, t, n, r), e.options = t.options;
});
function G(e, t) {
	return new Js({
		type: "union",
		options: e,
		...b(t)
	});
}
var Ys = /*@__PURE__*/ T("ZodDiscriminatedUnion", (e, t) => {
	Js.init(e, t), Dr.init(e, t);
});
function Xs(e, t, n) {
	return new Ys({
		type: "union",
		options: t,
		discriminator: e,
		...b(n)
	});
}
var Zs = /*@__PURE__*/ T("ZodIntersection", (e, t) => {
	Or.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => ko(e, t, n, r);
});
function Qs(e, t) {
	return new Zs({
		type: "intersection",
		left: e,
		right: t
	});
}
var $s = /*@__PURE__*/ T("ZodRecord", (e, t) => {
	ls(), jr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Po(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function K(e, t, n) {
	return !t || !t._zod ? new $s({
		type: "record",
		keyType: z(),
		valueType: e,
		...b(t)
	}) : new $s({
		type: "record",
		keyType: e,
		valueType: t,
		...b(n)
	});
}
var ec = /*@__PURE__*/ T("ZodEnum", (e, t) => {
	Mr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => mo(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new ec({
			...t,
			checks: [],
			...b(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new ec({
			...t,
			checks: [],
			...b(r),
			entries: i
		});
	};
});
function q(e, t) {
	return new ec({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...b(t)
	});
}
var tc = /*@__PURE__*/ T("ZodLiteral", (e, t) => {
	Nr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => ho(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function J(e, t) {
	return new tc({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...b(t)
	});
}
var nc = /*@__PURE__*/ T("ZodTransform", (e, t) => {
	ls(), Pr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => So(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new Ge(e.constructor.name);
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
function rc(e) {
	return new nc({
		type: "transform",
		transform: e
	});
}
var ic = /*@__PURE__*/ T("ZodOptional", (e, t) => {
	Ir.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Go(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ac(e) {
	return new ic({
		type: "optional",
		innerType: e
	});
}
var oc = /*@__PURE__*/ T("ZodExactOptional", (e, t) => {
	Lr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Go(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function sc(e) {
	return new oc({
		type: "optional",
		innerType: e
	});
}
var cc = /*@__PURE__*/ T("ZodNullable", (e, t) => {
	Rr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function lc(e) {
	return new cc({
		type: "nullable",
		innerType: e
	});
}
var uc = /*@__PURE__*/ T("ZodDefault", (e, t) => {
	zr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => zo(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function dc(e, t) {
	return new uc({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var fc = /*@__PURE__*/ T("ZodPrefault", (e, t) => {
	Vr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function pc(e, t) {
	return new fc({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var mc = /*@__PURE__*/ T("ZodNonOptional", (e, t) => {
	Hr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Io(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function hc(e, t) {
	return new mc({
		type: "nonoptional",
		innerType: e,
		...b(t)
	});
}
var gc = /*@__PURE__*/ T("ZodCatch", (e, t) => {
	Gr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vo(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function _c(e, t) {
	return new gc({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Be(t)
	});
}
var vc = /*@__PURE__*/ T("ZodPipe", (e, t) => {
	Kr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ho(e, t, n, r), e.in = t.in, e.out = t.out;
});
function yc(e, t) {
	return new vc({
		type: "pipe",
		in: e,
		out: t
	});
}
var bc = /*@__PURE__*/ T("ZodPreprocess", (e, t) => {
	vc.init(e, t), Jr.init(e, t);
}), xc = /*@__PURE__*/ T("ZodReadonly", (e, t) => {
	Yr.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Uo(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Sc(e) {
	return new xc({
		type: "readonly",
		innerType: e
	});
}
var Cc = /*@__PURE__*/ T("ZodTemplateLiteral", (e, t) => {
	$r.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => _o(e, t, n, r);
});
function wc(e, t) {
	return new Cc({
		type: "template_literal",
		parts: e,
		...b(t)
	});
}
var Tc = /*@__PURE__*/ T("ZodCustom", (e, t) => {
	ei.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => bo(e, t, n, r);
});
function Ec(e, t = {}) {
	return /* @__PURE__ */ Ea(Tc, e, t);
}
function Dc(e, t) {
	return /* @__PURE__ */ Da(e, t);
}
function Oc(e, t) {
	return new bc({
		type: "pipe",
		in: rc(e),
		out: t
	});
}
//#endregion
//#region ../shared/src/engenty/data-tables/columns.ts
var kc = W({
	description: z().max(1024).optional(),
	edit: q(["inline", "popout"]).optional(),
	id: z().min(1).max(64).regex(/^[a-z][a-z0-9_]*$/, "column id must be a lowercase slug (a-z, 0-9, _)"),
	name: z().min(1).max(128),
	required: H().optional()
}), Ac = q([
	"integer",
	"decimal",
	"percent",
	"currency"
]), jc = W({
	currency: z().regex(/^[A-Z]{3}$/, "currency must be an ISO 4217 code").optional(),
	fractionDigits: V().int().min(0).max(8).optional(),
	grouping: H().optional(),
	style: Ac
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
}), Mc = q([
	"date",
	"datetime",
	"time"
]), Nc = q([
	"short",
	"medium",
	"long",
	"iso"
]), Pc = q([
	"hours",
	"minutes",
	"seconds"
]), Fc = W({
	dateStyle: Nc.optional(),
	kind: Mc,
	timePrecision: Pc.optional()
}), Ic = q([
	"milliseconds",
	"seconds",
	"minutes",
	"hours",
	"days"
]), Lc = q([
	"hms",
	"hours",
	"minutes",
	"decimal-hours",
	"iso"
]), Rc = W({
	display: Lc,
	inputUnit: Ic
}), zc = W({
	id: z().min(1).max(64),
	label: z().min(1).max(128)
}), Bc = W({
	allowCustom: H(),
	multiple: H().optional(),
	options: U(zc).max(200)
}), Vc = W({ style: q([
	"single",
	"multiline",
	"markdown"
]).default("single") }), Hc = U(Xs("type", [
	kc.extend({
		format: Vc.optional(),
		type: J("text")
	}),
	kc.extend({
		format: jc,
		type: J("number")
	}),
	kc.extend({
		format: Fc,
		type: J("date")
	}),
	kc.extend({
		format: Rc,
		type: J("duration")
	}),
	kc.extend({
		format: Bc,
		type: J("select")
	}),
	kc.extend({ type: J("boolean") })
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
		display: Lc.optional(),
		fractionDigits: V().int().optional(),
		grouping: H().optional(),
		inputUnit: Ic.optional(),
		kind: Mc.optional(),
		multiple: H().optional(),
		options: U(zc).optional(),
		style: q([
			"single",
			"multiline",
			"markdown",
			"integer",
			"decimal",
			"percent",
			"currency"
		]).optional(),
		timePrecision: Pc.optional()
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
function Uc(e, t = {}) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "string") return null;
	let n = t.units ? e.replace(/[^\d,.-]/g, "") : e.trim();
	if (!/^-?(\d+([.,]\d*)?|[.,]\d+)$/.test(n)) return null;
	let r = Number(n.replace(",", "."));
	return Number.isFinite(r) ? r : null;
}
function Wc(e) {
	return e > 0 ? e < 999500 ? `${Math.max(1, Math.round(e / 1e3))} KB` : e < 99995e4 ? `${(e / 1e6).toFixed(1)} MB` : `${(e / 1e9).toFixed(1)} GB` : "0 KB";
}
function Gc(e, t, n) {
	try {
		return new Intl.NumberFormat(n, {
			style: "currency",
			currency: t
		}).format(e);
	} catch {
		return `${e.toFixed(2)} ${t}`;
	}
}
var Kc = z().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/, "keys are letters, digits and _ and start with a letter"), Y = {
	label: z().min(1).optional(),
	description: z().optional()
}, qc = [
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
		to: Kc
	})
], Jc = "text, number, yesno, choice, ref";
function Yc(e) {
	let t = e < 4 ? Yc(e + 1) : void 0, n = t ? Xs("kind", [...qc, t], { error: `A list holds ${Jc} or object.` }) : Xs("kind", [...qc], { error: `A list this deep holds ${Jc}: objects nest at most 4 deep.` }), r = W({
		kind: J("list"),
		...Y,
		of: n
	}), i = Xs("kind", [...qc, r], { error: `"kind" is one of ${Jc}, list.` });
	return W({
		kind: J("object"),
		...Y,
		fields: K(Kc, i).refine((e) => Object.keys(e).length > 0, { message: "An object has fields." })
	});
}
function Xc(e, t = []) {
	let n = [{
		shape: e,
		at: t
	}];
	for (let [r, i] of Object.entries(e.fields)) i.kind === "list" && i.of.kind === "object" && n.push(...Xc(i.of, [
		...t,
		"fields",
		r,
		"of"
	]));
	return n;
}
function Zc(e, t) {
	let n = e.fields[t];
	return n?.kind !== "list" || n.of.kind !== "object" ? `"ref" to "${t}": that is no list of objects at the top of the schema.` : n.of.fields.id?.kind === "text" ? null : `"ref" to "${t}": its entries need an "id" text field to be pointed at.`;
}
var Qc = Yc(1).superRefine((e, t) => {
	let n = Xc(e), r = n.reduce((e, t) => e + Object.keys(t.shape.fields).length, 0);
	r > 100 && t.addIssue({
		code: "custom",
		message: `A schema has at most 100 keys in all; this one has ${r}.`
	});
	for (let r of n) for (let [n, i] of Object.entries(r.shape.fields)) {
		let a = i.kind === "ref" ? i : i.kind === "list" && i.of.kind === "ref" ? i.of : null, o = a ? Zc(e, a.to) : null;
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
function $c(e) {
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
function el(e) {
	return Object.entries(e.fields).find(([e, t]) => e !== "id" && t.kind === "text" && !t.long)?.[0];
}
function tl(e, t) {
	return t.label ?? e;
}
function nl(e, t) {
	let n = t.description ?? (t.label ? "" : e), r = t.kind === "number" && t.unit ? `in ${t.unit}` : t.kind === "score" ? "lowest to highest" : t.kind === "ref" ? `the id of an entry of "${t.to}"` : "";
	return (n && r ? `${n} (${r})` : n || r) || void 0;
}
var rl = G([
	z(),
	V(),
	Bs()
]);
function il(e, t = "data") {
	let n = nl(t, e), r = {
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
		case "list": return U(il(e.of, t)).meta(r);
		case "object": return W(Object.fromEntries(Object.entries(e.fields).map(([e, t]) => [e, il(t, e)]))).meta(r);
		case "table": return (e.columns?.length ? U(W(Object.fromEntries(e.columns.map((e) => [e, rl])))) : W({
			columns: U(z()),
			rows: U(U(rl))
		})).meta(r);
	}
}
function al(e, t) {
	let n = qo(il(e), { target: "draft-2020-12" });
	return t && !e.label ? {
		...n,
		title: t
	} : n;
}
function ol(e, t) {
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
var sl = [
	"email",
	"slack",
	"browser"
], cl = /^(storage|connector):[A-Za-z0-9][A-Za-z0-9_.-]{0,80}$/;
function ll(e) {
	return sl.includes(e) || cl.test(e);
}
//#endregion
//#region ../shared/src/store.ts
var ul = ["mail"];
function dl(e, t) {
	if (t.trim() === "") return null;
	switch (e.type) {
		case "number":
		case "duration": return Uc(t) ?? t;
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
var fl = [
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
], pl = /* @__PURE__ */ new Set([
	"Column",
	"List",
	"Grid",
	"Actions",
	"Card",
	"Fold",
	"Group"
]), ml = {
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
}, hl = ["regenerate", "open"], gl = U(qs({
	id: z().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,40}$/, "ids are letters, digits, _ and -"),
	component: q(fl),
	children: G([U(z()), W({
		path: z(),
		componentId: z()
	})]).optional()
})).min(1).max(200), _l = (e) => !(!e || typeof e != "object" || Array.isArray(e) || typeof e.path != "string");
function vl(e) {
	let t = e.children, n = Array.isArray(t) ? [...t] : t ? [t.componentId] : [], r = e.tabs;
	if (Array.isArray(r)) for (let e of r) {
		let t = e?.child;
		typeof t == "string" && n.push(t);
	}
	return n;
}
function yl(e) {
	let t = [], n = (e) => {
		_l(e) ? t.push(e.path) : Array.isArray(e) ? e.forEach(n) : e && typeof e == "object" && Object.values(e).forEach(n);
	};
	for (let [t, r] of Object.entries(e)) t !== "id" && t !== "component" && n(t === "children" && !Array.isArray(r) && _l(r) ? { path: r.path } : r);
	return t;
}
var bl = [
	"labelKey",
	"valueKey",
	"flagKey",
	"detailKey",
	"noteKey",
	"groupKey",
	"textKey",
	"minutesKey"
], xl = (e) => (e.startsWith("/") ? e.slice(1) : e).split(/[./]/).filter(Boolean).map((e) => e.replace(/~1/g, "/").replace(/~0/g, "~"));
function Sl(e, t) {
	let n = [], r = /* @__PURE__ */ new Map(), i = (e, n) => e.startsWith("/") ? ol(t, xl(e)) : n === "any" ? "any" : n ? ol(n, xl(e)) : void 0, a = (e, t, r) => n.push({ message: !t.startsWith("/") && !r ? `"${e.id}" reads "${t}" outside a repeated entry; from the data it is "/${t.replace(/\./g, "/")}".` : `"${e.id}" reads "${t}", which no data provides.` }), o = (e, t, r) => {
		if (!_l(t)) return "any";
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
		].find((e) => _l(f[e])), m = p ? o(u, f[p], l) : void 0;
		for (let e of bl) {
			let t = f[e];
			typeof t == "string" && m && !s(m, t) && n.push({ message: `"${u.id}": "${e}" names "${t}", which its entries do not have.` });
		}
		if (u.component === "Table" && Array.isArray(f.columns) && m) for (let e of f.columns) typeof e?.key == "string" && !s(m, e.key) && n.push({ message: `"${u.id}": no column "${e.key}" in its rows.` });
		let h = u.component === "Link" ? m : void 0;
		u.component === "Link" && typeof f.key == "string" && !s(h, f.key) && n.push({ message: `"${u.id}": its items have no "${f.key}".` });
		for (let [e, t] of Object.entries(f)) {
			if (e === "id" || e === "component" || e === "children" || e === p) continue;
			let n = u.component === "Link" && (e === "title" || e === "subtitle" || e === "meta") ? h : l, r = [], o = (e) => {
				_l(e) ? r.push(e.path) : Array.isArray(e) ? e.forEach(o) : e && typeof e == "object" && Object.values(e).forEach(o);
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
function Cl(e, t) {
	let n = Array.isArray(t) ? t : void 0, r = gl.safeParse(e);
	if (!r.success) return r.error.issues.map((e) => ({ message: `${e.path.join(".")}: ${e.message}` }));
	let i = r.data, a = [], o = /* @__PURE__ */ new Map();
	for (let e of i) o.has(e.id) && a.push({ message: `Duplicate component id "${e.id}".` }), o.set(e.id, e);
	o.has("root") || a.push({ message: "A surface has a component with id \"root\"." });
	for (let e of i) {
		for (let t of ml[e.component] ?? []) e[t] === void 0 && a.push({ message: `${e.component} "${e.id}" needs "${t}".` });
		let t = e.action;
		t !== void 0 && !hl.includes(t) && a.push({ message: `"${e.id}": action is one of ${hl.join(", ")}.` });
		let r = e.children;
		r && !pl.has(e.component) && e.component !== "Table" && a.push({ message: `${e.component} "${e.id}" holds no children.` }), e.component === "Group" && (!r || Array.isArray(r)) && a.push({ message: `Group "${e.id}" repeats over a list: children { "path", "componentId" }.` });
		let i = e.tabs;
		e.component === "Tabs" && !(Array.isArray(i) && i.length >= 2) && a.push({ message: `Tabs "${e.id}" needs at least two tabs: [{ label, child }].` });
		let s = e.view, c = [...vl(e), ...typeof s == "string" ? [s] : []];
		for (let t of c) o.has(t) || a.push({ message: `"${e.id}" names a child "${t}" that is not there.` });
		if (n) for (let t of yl(e)) {
			let r = t.startsWith("/") ? t.split("/")[1] : null;
			r !== null && !n.includes(r) && a.push({ message: `"${e.id}" reads "${t}", which no data provides.` });
		}
	}
	let s = /* @__PURE__ */ new Set(), c = (e, t) => {
		if (t.has(e)) return !0;
		if (s.has(e)) return !1;
		s.add(e);
		let n = o.get(e), r = n ? vl(n) : [], i = new Set(t).add(e);
		return r.some((e) => c(e, i));
	};
	return o.has("root") && c("root", /* @__PURE__ */ new Set()) ? (a.push({ message: "Components hold each other in a loop." }), a) : t && !Array.isArray(t) ? [...a, ...Sl(o, t)] : a;
}
function wl(e, t) {
	let n = e;
	for (let e of t.split("/").slice(1)) {
		if (typeof n != "object" || !n) return;
		n = n[e.replace(/~1/g, "/").replace(/~0/g, "~")];
	}
	return n;
}
function Tl(e, t, n) {
	return _l(e) ? El(e.path.startsWith("/") ? wl(t, e.path) : n === void 0 ? void 0 : wl(n, `/${e.path.replace(/\./g, "/")}`), e) : e;
}
function El(e, t) {
	let n = e, r = t.map;
	if (r && typeof r == "object" && !Array.isArray(r)) {
		let e = String(n);
		Object.hasOwn(r, e) && (n = r[e]);
	}
	return typeof t.format == "string" && n != null && n !== "" && (n = t.format.replace("{}", Array.isArray(n) ? n.join(", ") : String(n))), n;
}
//#endregion
//#region ../shared/src/definition.ts
var Dl = [
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
], Ol = [
	"witch",
	"devil",
	"bat",
	"pumpkin"
], kl = /^(@[a-z0-9-]{1,39}\/)?[a-z0-9][a-z0-9-]{0,47}$/, Al = ["en", "de"], jl = {
	en: "en-GB",
	de: "de-DE"
};
function Ml(e) {
	return typeof e == "string" && Al.includes(e);
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
var Nl = /^[a-z]{2,3}$/;
function Pl(e) {
	if (!Nl.test(e)) return !1;
	try {
		return !!new Intl.DisplayNames(["en"], {
			type: "language",
			fallback: "none"
		}).of(e);
	} catch {
		return !1;
	}
}
function Fl(e) {
	return Ml(e) ? jl[e] : e;
}
var Il = [
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
function Ll(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let { lat: t, lng: n, label: r } = e;
	return typeof t == "number" && typeof n == "number" || typeof r == "string" && r.trim().length > 0;
}
function Rl(e) {
	return !!(e && typeof e == "object" && typeof e.asset == "string" && e.asset);
}
var zl = [
	"web_search",
	"web_fetch",
	"browser",
	"sandbox",
	"image",
	"http",
	"pages",
	"code"
], Bl = /^[a-z][a-z0-9-]{0,39}$/, Vl = /^[a-z][a-z0-9_]{0,39}$/;
function Hl(e) {
	let [t, n, ...r] = e.split(".");
	return n !== void 0 && r.length === 0 && Bl.test(t) && Vl.test(n) ? {
		plugin: t,
		tool: n
	} : null;
}
var Ul = [
	"classifier",
	"low",
	"standard",
	"high"
];
[...Ul];
var Wl = [
	"low",
	"medium",
	"high"
], Gl = [
	"image",
	"video",
	"voice",
	"document",
	"dashboard"
], Kl = [
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
], ql = [
	"1:1",
	"16:9",
	"9:16",
	"4:5",
	"3:2",
	"2:3"
], Jl = ["720p", "480p"], X = z().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/, "ids are letters, digits and _ and start with a letter"), Yl = W({
	id: X,
	label: z().min(1),
	kind: q([
		"text",
		"number",
		"money"
	])
}), Xl = W({
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
}), Zl = G([Xl, U(Xl).min(1)]), Ql = W({
	label: z().min(1),
	value: z().optional(),
	image: z().optional(),
	subtitle: z().optional(),
	meta: z().optional(),
	link: z().optional()
}), $l = W({
	id: X,
	label: z().min(1),
	kind: q(Il),
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
	columns: U(Yl).optional(),
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
	when: Zl.optional(),
	optionsFrom: z().optional(),
	cards: Ql.optional(),
	ask: z().min(1).optional(),
	group: z().optional()
}), eu = W({
	id: X,
	instructions: z().min(1),
	optional: H().optional()
}), tu = W({
	when: Zl.optional(),
	ask: z().min(1).optional(),
	goto: z(),
	max: V().int().min(1).max(50).optional()
}).refine((e) => e.when === void 0 || e.ask === void 0, { message: "A branch has \"when\" or \"ask\", not both." }), Z = {
	id: X,
	title: z().min(1),
	description: z().optional(),
	next: U(tu).optional()
}, nu = W({
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
}), ru = W({
	...Z,
	type: J("page"),
	fields: U($l).min(1),
	groups: U(eu).max(6).optional(),
	cta: z().optional()
}), iu = wc([
	z().regex(Bl),
	".",
	z().regex(Vl)
]), au = W({
	...Z,
	type: J("agent"),
	instructions: z().default(""),
	call: W({
		tool: iu,
		input: K(z(), Hs()).default({})
	}).optional(),
	tools: U(G([q(zl), iu])).default([]),
	mcp: U(z()).optional(),
	connections: U(z()).optional(),
	output: W({
		format: q([
			"text",
			"markdown",
			"json"
		]),
		fields: U(nu).optional(),
		schema: Qc.optional(),
		surface: G([H(), gl]).optional()
	}).default({ format: "markdown" }),
	model: q(Ul).optional(),
	effort: q(Wl).optional(),
	each: z().optional(),
	working: z().optional()
}), ou = W({
	...Z,
	type: J("generate"),
	asset: q(Gl),
	prompt: z().min(1),
	options: W({
		aspectRatio: q(ql).optional(),
		duration: V().optional(),
		resolution: q(Jl).optional(),
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
	model: q(Ul).optional(),
	effort: q(Wl).optional(),
	working: z().optional()
}), su = W({
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
}), cu = [
	"16:9",
	"9:16",
	"1:1"
], lu = W({
	...Z,
	type: J("motion-graphics"),
	brief: z().min(1),
	skills: U(z().min(1)).max(12).default(["hyperframes"]),
	kit: z().optional(),
	inputs: K(z(), z()).default({}),
	format: q(cu).default("16:9"),
	from: z().optional(),
	seconds: V().int().min(3).max(600).optional(),
	model: q(Ul).optional(),
	effort: q(Wl).optional(),
	working: z().optional()
}), uu = W({
	id: X,
	description: z().min(1),
	components: gl,
	group: z().optional(),
	required: H().optional()
}), du = W({
	...Z,
	type: J("surface"),
	components: gl.optional(),
	candidates: U(uu).max(16).optional(),
	groups: U(eu).max(6).optional(),
	data: K(z(), z()).default({}),
	working: z().optional()
}).refine((e) => !!e.components != !!e.candidates, { message: "A surface step has either \"components\" or \"candidates\"." });
function fu(e, t) {
	let n = new Set(t), r = e.filter((e) => n.has(e.id));
	return [{
		id: "root",
		component: "Column",
		children: r.map((e) => e.components[0]?.id ?? e.id)
	}, ...r.flatMap((e) => e.components)];
}
var pu = W({
	...Z,
	type: J("review"),
	show: U(z()).min(1),
	edit: H().optional(),
	regenerate: H().optional()
}), mu = W({
	from: z(),
	label: z().optional(),
	formats: U(q(Kl)).min(1)
}), hu = W({
	target: z().min(1),
	label: z().optional(),
	values: K(z(), z()).optional()
}), gu = Xs("type", [
	ru,
	au,
	ou,
	su,
	du,
	lu,
	pu,
	W({
		...Z,
		type: J("result"),
		message: z().optional(),
		deliverables: U(mu),
		share: U(hu).max(12).optional()
	})
]);
function _u(e) {
	let t = e.output.fields ?? [];
	return !e.call && !e.output.schema && e.model === "classifier" && e.output.format === "json" && t.length > 0 && t.every((e) => e.kind === "yesno" || e.kind === "choice" || e.kind === "score") && !e.each && e.tools.length === 0 && !e.mcp?.length && !e.connections?.length;
}
function vu(e) {
	return e.output.schema ? e.output.schema : e.output.fields?.length ? $c(e.output.fields) : void 0;
}
function yu(e) {
	return vu(e) ?? {
		kind: "object",
		fields: { data: {
			kind: "table",
			description: "The result as a table"
		} }
	};
}
function bu(e) {
	return Object.keys(vu(e)?.fields ?? {});
}
var xu = W({
	id: X,
	title: z().min(1),
	description: z().optional(),
	columns: Hc,
	key: z().optional(),
	check: W({
		file: z().optional(),
		status: z().optional()
	}).optional(),
	shared: H().optional()
}), Su = W({
	id: X,
	kind: q(ul).optional(),
	connector: z().optional(),
	actions: U(z()).max(200).optional(),
	policy: K(z(), q(["allow", "ask"])).optional(),
	title: z().optional(),
	description: z().optional()
}), Cu = {
	standard: "low",
	high: "standard",
	highest: "high"
};
function wu(e, t = 1) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let n = e, r = n.version ?? t;
	if (r === 2) return n.version === void 0 ? {
		...n,
		version: r
	} : n;
	if (r !== 1) return e;
	let i = Array.isArray(n.steps) ? n.steps.map((e) => {
		let t = e?.model;
		return typeof t == "string" && Cu[t] ? {
			...e,
			model: Cu[t]
		} : e;
	}) : n.steps;
	return {
		...n,
		version: 2,
		steps: i
	};
}
var Tu = Oc((e) => wu(e), W({
	version: J(2).default(2),
	title: z().min(1),
	description: z().default(""),
	avatar: q(Dl).default("round"),
	costume: q(Ol).optional(),
	intro: z().optional(),
	lang: z().regex(/^[a-z]{2}$/).optional(),
	lists: U(xu).max(12).optional(),
	connections: U(Su).max(12).optional(),
	themes: U(z().regex(kl)).max(8).optional(),
	steps: U(gu).min(1)
})), Eu = /^lists\.([a-zA-Z][a-zA-Z0-9_]*)$/;
function Du(e) {
	return e.match(Eu)?.[1] ?? null;
}
function Q(e) {
	return e.trim().replace(/^\{\{\s*/, "").replace(/\s*\}\}$/, "");
}
var Ou = /\{\{\s*([^}]+?)\s*\}\}/g;
function ku(e) {
	return [...e.matchAll(Ou)].map((e) => e[1]);
}
function Au(e, t) {
	let n = [], r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), u = (e) => `List "${e}" is shared: every run writes it, so the person running the wizard never sees it.`;
	e.lang && !Pl(e.lang) && n.push({ message: `"${e.lang}" isn't a language code. Use a two-letter code such as "en", "de" or "it".` }), e.themes && new Set(e.themes).size !== e.themes.length && n.push({ message: "A theme is named twice in themes." });
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
			let r = (e.options ?? []).find((e) => !Uu(e));
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
		for (let r of ku(t)) {
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
		return f?.type === "agent" && (!d || _u(f)) && (bu(f).includes(l) || !!f.each && l === "rows" && !d);
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
			let r = t?.type === "agent" ? vu(t)?.fields[o] : void 0;
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
					for (let t of Iu(e.when)) !h.fields.some((n) => n.id === t.field && n.id !== e.id) && !f(h, t.field) && n.push({
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
				})), Array.isArray(h.output.surface)) for (let e of Cl(h.output.surface, h.each ? ["rows"] : vu(h))) n.push({
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
					let r = Du(Q(t));
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
				let t = h.components ?? fu(h.candidates ?? [], (h.candidates ?? []).map((e) => e.id));
				for (let e of Cl(t, Object.keys(h.data))) n.push({
					stepId: h.id,
					message: `Surface: ${e.message}`
				});
				break;
			}
			case "motion-graphics":
				d(h, h.brief);
				for (let [e, t] of Object.entries(h.inputs)) {
					/^[a-z][a-z0-9-]{0,40}$/.test(e) || n.push({
						stepId: h.id,
						message: `Motion-graphics input "${e}" is not a folder name (lowercase letters, digits, -).`
					});
					let r = Q(t);
					r.startsWith("steps.") ? d(h, `{{${r}}}`) : o.has(r) || n.push({
						stepId: h.id,
						message: `Motion-graphics input "${e}": "${t}" is not an earlier field or "steps.<id>".`
					});
				}
				if (h.from) {
					let t = Q(h.from).replace(/^steps\./, "");
					(!a.has(t) || e.steps.find((e) => e.id === t)?.type !== "motion-graphics") && n.push({
						stepId: h.id,
						message: `Motion-graphics "from" "${h.from}" is not an earlier motion-graphics step ("steps.<id>").`
					});
				}
				h.kit && !h.kit.endsWith(".zip") ? n.push({
					stepId: h.id,
					message: `Motion-graphics kit "${h.kit}" is a .zip.`
				}) : t && h.kit && !t.includes(h.kit) && n.push({
					stepId: h.id,
					message: `Motion-graphics kit "${h.kit}" is not in the workspace.`
				});
				for (let e of h.skills) e.startsWith("skills/") && t && !t.includes(`${e}/SKILL.md`) && n.push({
					stepId: h.id,
					message: `Skill "${e}" has no SKILL.md in the workspace.`
				});
				break;
			case "review":
				for (let e of h.show) {
					let t = Du(e);
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
					let t = Du(e.from);
					(t ? !s.has(t) : !a.has(e.from)) ? n.push({
						stepId: h.id,
						message: `Deliverable from unknown ${t ? "list" : "step"} "${e.from}".`
					}) : t && c.has(t) && n.push({
						stepId: h.id,
						message: u(t)
					});
				}
				for (let e of h.share ?? []) {
					ll(e.target) || n.push({
						stepId: h.id,
						message: `Unknown share target "${e.target}": use email, slack, browser, storage:<connector> or connector:<connector>.`
					});
					for (let t of Object.values(e.values ?? {})) d(h, t);
				}
		}
		(h.next ?? []).filter(Pu).length > 1 && n.push({
			stepId: h.id,
			message: "A step has at most one \"otherwise\" branch (one without \"when\" and \"ask\")."
		});
		for (let e of h.next ?? []) {
			e.goto !== "end" && !r.has(e.goto) && n.push({
				stepId: h.id,
				message: `Branch goes to unknown step "${e.goto}".`
			});
			for (let t of Iu(e.when)) !i.has(t.field) && !f(h, t.field, !0) && n.push({
				stepId: h.id,
				message: `Branch reads unknown field "${t.field}".`
			}), n.push(...p(h.id, t));
		}
		a.add(h.id);
	}
	return n;
}
function ju(e, t) {
	let n = Tu.safeParse(e);
	if (!n.success) return {
		ok: !1,
		issues: Nu(n.error, e)
	};
	let r = Au(n.data, t);
	return {
		ok: !0,
		wizard: n.data,
		issues: r
	};
}
function Mu(e, t) {
	let n = e?.steps?.[t]?.id;
	return typeof n == "string" ? `steps[${t}] "${n}"` : `steps[${t}]`;
}
function Nu(e, t) {
	return e.issues.map((e) => {
		let [n, r, ...i] = e.path;
		return { message: `${(n === "steps" && typeof r == "number" ? [Mu(t, r), ...i].join(".") : e.path.join(".")) || "wizard"}: ${e.message}` };
	});
}
function Pu(e) {
	return e.when === void 0 && e.ask === void 0;
}
function Fu(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
function Iu(e) {
	return e === void 0 ? [] : Array.isArray(e) ? e : [e];
}
function Lu(e, t) {
	let n = t[e.field];
	switch (e.op) {
		case "empty": return Fu(n);
		case "notEmpty": return !Fu(n);
		case "equals": return String(n) === String(e.value);
		case "notEquals": return String(n) !== String(e.value);
		case "in": return Array.isArray(e.value) && e.value.map(String).includes(String(n));
		case "gt":
		case "lt": {
			let t = Uc(n), r = Uc(e.value);
			return t !== null && r !== null && (e.op === "gt" ? t > r : t < r);
		}
		case "contains": return Array.isArray(n) ? n.map(String).includes(String(e.value)) : typeof n == "string" && e.value !== void 0 && n.toLowerCase().includes(String(e.value).toLowerCase());
	}
}
function Ru(e, t) {
	return Iu(e).every((e) => Lu(e, t));
}
function zu(e, t) {
	return e.when !== void 0 && Ru(e.when, t);
}
function Bu(e) {
	return !!(e.ask || e.group);
}
function Vu(e, t, n) {
	let r = {
		...t,
		...n
	}, i = [];
	for (let t of e) Ru(t.when, r) ? i.push(t) : delete r[t.id];
	return i;
}
var Hu = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
function Uu(e) {
	let t = Hu.exec(e.trim());
	if (!t) return null;
	let [, n, r, i, a, o] = t.map(Number), s = new Date(Date.UTC(n, r - 1, i, a, o));
	return s.getUTCMonth() !== r - 1 || s.getUTCDate() !== i || a > 23 || o > 59 || !Number.isFinite(Date.parse(e)) ? null : {
		day: `${t[1]}-${t[2]}-${t[3]}`,
		time: `${t[4]}:${t[5]}`,
		wall: s
	};
}
function Wu(e, t = "en") {
	let n = Uu(e);
	if (!n) return e;
	let r = Fl(t);
	return `${n.wall.toLocaleDateString(r, {
		weekday: "long",
		timeZone: "UTC"
	})}, ${n.wall.toLocaleDateString(r, {
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	})}`;
}
function Gu(e, t, n) {
	let r = Array.isArray(t) ? t : [], i = (e.columns ?? []).filter((e) => e.kind !== "text"), a = r.map((e) => {
		let t = i.length ? i.reduce((t, n) => t * Ku(e[n.id]), 1) : 0;
		return {
			...e,
			amount: qu(t)
		};
	}), o = qu(a.reduce((e, t) => e + t.amount, 0)), s = e.vat?.rate ?? 0;
	if (e.vat?.field) {
		let t = n[e.vat.field], r = Uc(t, { units: !0 });
		r !== null && (s = r);
	}
	let c = qu(o * s / 100);
	return {
		rows: a,
		net: o,
		vatRate: s,
		vat: c,
		gross: qu(o + c),
		currency: e.currency ?? "EUR"
	};
}
function Ku(e) {
	return Uc(e) ?? 0;
}
function qu(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region ../shared/src/texts.ts
var Ju = /* @__PURE__ */ new Map();
function Yu(e) {
	let t = Ju.get(e);
	return t || (t = new Intl.PluralRules(Fl(e)), Ju.set(e, t)), t;
}
function Xu(e, t, n) {
	return typeof e == "string" ? e : typeof n == "number" ? e[Yu(t).select(n)] ?? e.other : e.other;
}
function Zu(e, t) {
	return typeof e == "number" ? e.toLocaleString(Fl(t)) : Array.isArray(e) ? e.map((e) => Zu(e, t)).join(", ") : e;
}
function Qu(e, t, n) {
	return e.replace(/\{(\w+)\}/g, (e, r) => {
		let i = n?.[r];
		return i === void 0 ? e : Zu(i, t);
	});
}
function $u(e, t, n, r) {
	let i = e[n][t] ?? e.en[t];
	return i === void 0 ? t : Qu(Xu(i, n, r?.count ?? r?.n), n, r);
}
function ed(e, t, n) {
	return Qu(Xu(e, t, n?.count ?? n?.n), t, n);
}
//#endregion
//#region ../shared/src/run.ts
var td = {
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
	motionCutting: "Rendering the video – this takes about a minute.",
	motionProgress: "{pct} % rendered",
	motionError: "The video reports: {detail}",
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
	motionSetup: "Setting up the folder for the video",
	motionClient: "{client} is working on the video – this usually takes 10–40 minutes.",
	motionTask: "On the video: {task}",
	motionLooks: "Looking at frames of the video",
	motionFix: "The video didn’t render – Claude Code is fixing it",
	motionResume: "Picking the video up where it stopped",
	wizardUnavailable: "This wizard isn’t available right now.",
	translationFailed: "This wizard can’t be translated right now. It’s shown as it was written.",
	translationOff: "This wizard is only offered as it was written.",
	translationPlaceholder: "The translation of “{text}” needs every placeholder in curly brackets the original has.",
	wizardLimit: "This wizard has reached its limit for today. Try again tomorrow.",
	guestBudget: "This page has reached its limit for today. Try again tomorrow.",
	wizardPaused: "This wizard is paused for now. Try again later.",
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
	uploadNotPicture: "This file isn’t a picture that can be read. Choose a PNG, JPEG, WebP or GIF.",
	uploadPictureTooLarge: "This picture is too large. Choose one of {mp} megapixels or less.",
	uploadNotItsType: "This file holds something other than its type says. Choose the file again.",
	uploadSvgNotUsable: "This SVG can’t be used. Save it again as a plain SVG, or choose a PNG.",
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
	claudeCodeMakesMotion: "Claude Code makes motion graphics on this computer, using your subscription. Set it up as an AI subscription under Settings → Models.",
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
	pageSlugInvalid: "A page address holds lower-case letters a–z, digits and hyphens.",
	pageSlugTaken: "Another space of your organization has this address.",
	pageTaken: "The page is already at “{space}”.",
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
	onlyOrganizationAdmins: "Only organization admins can do that. As a member, you can edit the wizards that already exist.",
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
	syncUpdateHere: "The cloud runs a newer version than this computer. Update engenty wizards, then your changes arrive in the cloud again.",
	syncUpdateCloud: "This computer runs a newer version than the cloud. Your changes arrive there once the cloud is updated.",
	syncSpaceNotInCloud: "This space isn’t in the cloud.",
	syncOtherSpace: "In the cloud this belongs to another space.",
	syncChangeRefused: "The cloud doesn’t take this change: {detail}",
	syncFileMissing: "A file of this change hasn’t arrived in the cloud yet. It’s sent again.",
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
	itemChangedMeantime: "This was changed elsewhere in the meantime.",
	valueNotExist: "This value doesn’t exist.",
	nothingFiledUnderValue: "Nothing is filed under this value yet.",
	motionNotRenderedNeeds: "The video couldn’t be rendered. It needs ffmpeg and a timeline in the widget.",
	signInRefused: "The sign-in was refused{host}. Are the address and (app) password right? Gmail and Google Workspace need an app password and IMAP turned on.{answer}",
	serverSaid: " The server said: {answer}",
	viaAccountFailed: "Connecting through your engenty account didn’t work ({code}).",
	pluginInvalidInput: "“{id}” got invalid input: {path} – {problem}",
	motionClientStopped: "{name} stopped working on the video: {detail}. The work is saved. A new try carries on from there.",
	motionWorkSaved: "{problem} The work is saved. A new try carries on from there.",
	motionRenderFailed: "The video couldn’t be rendered: {detail}",
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
	fontSourceNoFont: "{family} needs a font file of the space: choose a .woff2 from the assets.",
	roomMostFiles: {
		one: "There’s room for at most {count} file here.",
		other: "There’s room for at most {count} files here."
	},
	makesText: "text",
	makesImages: "images",
	makesVideos: "videos",
	makesSpeech: "speech",
	makesVoiceNotes: "voice notes"
}, nd = {
	en: td,
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
		motionCutting: "Das Video wird gerendert – das dauert etwa eine Minute.",
		motionProgress: "{pct} % gerendert",
		motionError: "Das Video meldet: {detail}",
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
		motionSetup: "Richtet den Arbeitsordner für das Video ein",
		motionClient: "{client} arbeitet am Video – das dauert meist 10–40 Minuten.",
		motionTask: "Am Video: {task}",
		motionLooks: "Sieht sich Bilder des Videos an",
		motionFix: "Das Video ließ sich nicht rendern – Claude Code bessert nach",
		motionResume: "Macht dort weiter, wo das Video stehen geblieben ist",
		wizardUnavailable: "Dieser Wizard ist gerade nicht verfügbar.",
		translationFailed: "Dieser Wizard lässt sich gerade nicht übersetzen. Du siehst ihn so, wie er geschrieben wurde.",
		translationOff: "Diesen Wizard gibt es nur so, wie er geschrieben wurde.",
		translationPlaceholder: "Die Übersetzung von „{text}“ braucht jeden Platzhalter in geschweiften Klammern, den das Original hat.",
		wizardLimit: "Für heute ist das Limit dieses Wizards erreicht. Versuch es morgen wieder.",
		guestBudget: "Für heute ist das Limit dieser Seite erreicht. Versuch es morgen wieder.",
		wizardPaused: "Dieser Wizard ist gerade pausiert. Versuch es später wieder.",
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
		uploadNotPicture: "Diese Datei ist kein lesbares Bild. Wähl ein PNG, JPEG, WebP oder GIF.",
		uploadPictureTooLarge: "Dieses Bild ist zu groß. Wähl eins mit höchstens {mp} Megapixeln.",
		uploadNotItsType: "In dieser Datei steckt etwas anderes, als ihr Typ sagt. Wähl die Datei noch einmal.",
		uploadSvgNotUsable: "Dieses SVG geht nicht. Speicher es neu als einfaches SVG oder wähl ein PNG.",
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
		claudeCodeMakesMotion: "Motion-Grafik macht Claude Code auf diesem Computer mit deinem Abo. Richte es unter Einstellungen → Modelle als KI-Abo ein.",
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
		pageSlugInvalid: "Eine Seitenadresse besteht aus Kleinbuchstaben a–z, Ziffern und Bindestrichen.",
		pageSlugTaken: "Ein anderer Space deiner Organisation hat diese Adresse.",
		pageTaken: "Die Seite ist schon bei „{space}“.",
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
		onlyOrganizationAdmins: "Das dürfen nur Admins der Organisation. Als Mitglied bearbeitest du die Wizards, die es schon gibt.",
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
		syncUpdateHere: "Die Cloud hat eine neuere Version als dieser Computer. Aktualisiere engenty wizards, dann kommen deine Änderungen wieder in der Cloud an.",
		syncUpdateCloud: "Dieser Computer hat eine neuere Version als die Cloud. Deine Änderungen kommen dort an, sobald die Cloud aktualisiert ist.",
		syncSpaceNotInCloud: "Diesen Space gibt es in der Cloud nicht.",
		syncOtherSpace: "In der Cloud gehört das zu einem anderen Space.",
		syncChangeRefused: "Diese Änderung nimmt die Cloud nicht an: {detail}",
		syncFileMissing: "Eine Datei dieser Änderung ist noch nicht in der Cloud angekommen. Sie wird noch einmal gesendet.",
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
		itemChangedMeantime: "Das wurde inzwischen anderswo geändert.",
		valueNotExist: "Diesen Wert gibt es nicht.",
		nothingFiledUnderValue: "Unter diesem Wert steht noch nichts.",
		motionNotRenderedNeeds: "Das Video ließ sich nicht rendern. Dafür braucht es ffmpeg und eine Zeitleiste im Widget.",
		signInRefused: "Anmeldung abgelehnt{host}. Stimmen Adresse und (App-)Passwort? Gmail und Google Workspace brauchen ein App-Passwort und eingeschaltetes IMAP.{answer}",
		serverSaid: " Antwort des Servers: {answer}",
		viaAccountFailed: "Verbinden über dein engenty-Konto hat nicht geklappt ({code}).",
		pluginInvalidInput: "„{id}“ bekam ungültige Angaben: {path} – {problem}",
		motionClientStopped: "{name} hat beim Video aufgehört: {detail}. Die Arbeit ist gespeichert. Ein neuer Versuch macht dort weiter.",
		motionWorkSaved: "{problem} Die Arbeit ist gespeichert. Ein neuer Versuch macht dort weiter.",
		motionRenderFailed: "Das Video ließ sich nicht rendern: {detail}",
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
		fontSourceNoFont: "{family} braucht eine Schriftdatei des Space: Wähl eine .woff2 aus den Assets.",
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
function rd(e, t, n) {
	return Array.isArray(e) ? e.map((e) => rd(e, t, n)) : typeof e == "object" && e && "code" in e ? id(e, t, n) : e;
}
function id(e, t, n) {
	if (!(e.code in td)) return "";
	let r = {};
	for (let [i, a] of Object.entries(e.params ?? {})) r[i] = a === void 0 ? void 0 : rd(a, t, n);
	let i = n?.[e.code];
	return i === void 0 ? $u(nd, e.code, Ml(t) ? t : "en", r) : ed(i, t, r);
}
var ad = {
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
}, od = "en", $ = null, sd = 0, cd = /* @__PURE__ */ new Set();
function ld() {
	sd += 1;
	for (let e of cd) e();
}
function ud(e) {
	e !== od && (od = e, ld());
}
function dd(e) {
	e !== $ && ($ = e, ld());
}
function fd() {
	return $;
}
function pd() {
	return $?.lang ?? od;
}
function md() {
	return e((e) => (cd.add(e), () => cd.delete(e)), () => sd), pd();
}
function hd(e) {
	return e.note && id(e.note, pd(), $?.notes) || e.message;
}
var gd = {};
function _d(e) {
	gd = e ?? {};
}
function vd(e) {
	return gd[e] ?? e;
}
function yd(e, t) {
	let n = $?.runner[e];
	return $ && n !== void 0 ? ed(n, $.lang, t) : $u(ad, e, $ ? "en" : od, t);
}
//#endregion
export { dl as A, V as B, zu as C, yu as D, Uu as E, Gc as F, z as H, q as I, U as L, al as M, el as N, ku as O, Wc as P, H as R, Hl as S, Wu as T, G as U, W as V, Hs as W, Ll as _, fd as a, Du as b, dd as c, ad as d, kl as f, Bu as g, Rl as h, pd as i, tl as j, Tl as k, yd as l, Q as m, hd as n, _d as o, Iu as p, od as r, ud as s, vd as t, md as u, Pu as v, Vu as w, ju as x, Gu as y, J as z };

//# sourceMappingURL=i18n-DHKrgXZE.js.map