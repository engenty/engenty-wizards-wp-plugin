import { B as e, D as t, F as n, H as r, I as i, L as a, R as o, S as s, V as c, _ as l, b as u, f as d, l as f, p, x as m, y as h, z as g } from "./chunks/i18n-DLDYAU9t.js";
//#region ../shared/src/fit.ts
var _ = /* @__PURE__ */ new Set([
	"html",
	"md",
	"txt",
	"csv",
	"json"
]), v = /* @__PURE__ */ new Set(["code"]), y = /* @__PURE__ */ new Set([
	"web_search",
	"browser",
	"sandbox",
	"image"
]), b = /* @__PURE__ */ new Set(["web_fetch", "http"]), x = /\{\{\s*memory\b/;
function S(e) {
	switch (e.type) {
		case "agent": return [e.instructions, e.call ? JSON.stringify(e.call.input) : ""];
		case "generate": return [e.prompt, e.options?.style ?? ""];
		case "film": return [e.brief];
		case "widget":
		case "surface": return Object.values(e.data).map((e) => `{{${p(e)}}}`);
		default: return [];
	}
}
function C(e, t) {
	return e.steps.slice(t + 1).some((e) => e.type === "agent" && !e.call || e.type === "generate" || e.type === "film");
}
function ee(e, n) {
	let r = [], i = (t, n) => {
		let i = r.find((e) => e.need === t);
		i ? i.hard ||= n : r.push({
			stepId: e.id,
			need: t,
			hard: n
		});
	}, a = n.steps.indexOf(e);
	for (let n of S(e)) x.test(n) && i("memory", !0), t(n).some((e) => e.startsWith("lists.")) && i("lists", !0);
	switch (e.type) {
		case "page":
			for (let t of e.fields) {
				switch (t.kind) {
					case "audio":
						i("field:audio", !!t.required);
						break;
					case "connection":
						i("field:connection", !0);
						break;
					case "slot":
						i("field:slot", !0);
						break;
					case "list":
						i("lists", !0);
						break;
					case "location":
						i("field:location", !1);
						break;
					case "image":
						i("field:image", !1);
						break;
					case "file": C(n, a) ? i("field:file-read", !0) : i("field:file", !1);
				}
				t.optionsFrom && h(p(t.optionsFrom).split(".").slice(0, 2).join(".")) && i("lists", !0);
			}
			break;
		case "agent": {
			let t = e.call ? [...e.tools, e.call.tool] : e.tools;
			for (let e of t) {
				let t = m(e);
				t ? i(`plugin:${t.plugin}`, !0) : b.has(e) || v.has(e) || (y.has(e) ? i(`tool:${e}`, !0) : i(`tool:${e}`, !1));
			}
			e.mcp?.length && i("mcp", !0), e.connections?.length && i("connections", !0), e.each && (h(p(e.each)) ? i("lists", !0) : i("each", !1));
			break;
		}
		case "generate":
			e.asset !== "document" && e.asset !== "dashboard" && i(`asset:${e.asset}`, !0);
			break;
		case "film":
			i("film", !0);
			break;
		case "widget":
			i(e.video ? "widget:video" : "widget", !0);
			break;
		case "surface":
			Object.values(e.data).some((e) => h(p(e))) && i("lists", !0);
			break;
		case "review":
			e.show.some((e) => h(e)) && i("lists", !0);
			break;
		case "result": for (let t of e.deliverables) {
			if (h(t.from)) {
				i("lists", !0);
				continue;
			}
			let e = n.steps.find((e) => e.id === t.from);
			if (e?.type !== "agent" && (e?.type !== "generate" || e.asset !== "document" && e.asset !== "dashboard")) continue;
			let r = t.formats.some((e) => _.has(e));
			for (let n of t.formats) _.has(n) || (n !== "pdf" || e?.type !== "agent") && i(`format:${n}`, n !== "pdf" && !r);
		}
	}
	return r;
}
function w(e) {
	let t = e.steps.flatMap((t) => ee(t, e));
	e.lists?.length && !t.some((e) => e.need === "lists") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "lists",
		hard: !0
	}), e.connections?.length && !t.some((e) => e.need === "connections") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "connections",
		hard: !0
	});
	let n = D(e);
	return {
		fit: t.some((e) => e.hard && n.has(e.stepId)) ? "no" : t.length ? "less" : "full",
		notes: t
	};
}
function T(e) {
	switch (e) {
		case "tool:web_search":
		case "tool:web_fetch": return "web";
		case "tool:browser": return "browser";
		case "tool:sandbox": return "code";
		case "tool:image":
		case "asset:image": return "image";
		case "asset:video":
		case "film":
		case "widget:video": return "video";
		case "asset:voice": return "speech";
		case "field:audio": return "listening";
		case "tool:http":
		case "mcp":
		case "connections":
		case "field:connection": return "connectors";
		case "field:image":
		case "field:file":
		case "field:file-read": return "documents";
		default: return null;
	}
}
function E(e) {
	let t = w(e), n = D(e), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let e of t.notes) {
		if (e.need.startsWith("plugin:")) {
			a.add(e.need.slice(7));
			continue;
		}
		if (e.need.startsWith("format:")) {
			o.add(e.need.slice(7));
			continue;
		}
		let t = T(e.need);
		t && (e.hard && n.has(e.stepId) ? r.add(t) : i.add(t));
	}
	for (let e of r) i.delete(e);
	return {
		...t,
		missing: [...r],
		optional: [...i],
		needs: [...a].sort(),
		without: [...o]
	};
}
function D(e) {
	return e.steps.length ? te(e, e.steps[0].id, {}) : /* @__PURE__ */ new Set();
}
function te(e, t, n) {
	let r = new Map(e.steps.map((e, t) => [e.id, t])), i = r.get(t) ?? 0, a = (t) => {
		let i = [];
		for (let a of e.steps[t].next ?? []) {
			if (l(a)) continue;
			let t = a.goto === "end" ? e.steps.length : r.get(a.goto) ?? -1;
			if (a.ask || !d(a.when).every((e) => e.field in n)) {
				t >= 0 && i.push(t);
				continue;
			}
			if (s(a, n)) return t >= 0 ? [...i, t] : i;
		}
		return i.push(ne(e, t, r)), i;
	}, o = (t) => {
		if (t === i) return !1;
		let n = /* @__PURE__ */ new Set([i]), r = [i];
		for (; r.length;) {
			let i = r.shift();
			if (i >= e.steps.length) return !0;
			for (let e of a(i)) e !== t && !n.has(e) && (n.add(e), r.push(e));
		}
		return !1;
	};
	return new Set(e.steps.filter((e, t) => !o(t)).map((e) => e.id));
}
function ne(e, t, n) {
	let r = e.steps[t].next?.find(l)?.goto;
	return r === void 0 ? t + 1 : r === "end" ? e.steps.length : n.get(r) ?? t + 1;
}
//#endregion
//#region ../shared/src/wizard-package.ts
var O = "engenty-wizard", k = "wizard.json", A = "files/", j = ".wizard", M = "application/vnd.engenty.wizard+zip", N = "https://engenty.ai/schema/v1";
`${N}`, `${N}`, e({
	$schema: c().optional(),
	format: o(O),
	version: o(1),
	exportedAt: c().optional(),
	definition: r(),
	connectors: i(e({
		id: c().max(60),
		name: c().max(120),
		domain: c().max(253).optional(),
		sourceKind: n(["openapi", "mcp"]).optional()
	})).max(50).default([]),
	mcpServers: i(e({
		id: c().max(31),
		name: c().max(60)
	})).max(10).default([]),
	knowledge: e({
		pages: g().int(),
		truncated: a()
	}).optional()
});
//#endregion
//#region ../../node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var P = Uint8Array, F = Uint16Array, I = Int32Array, re = new P([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), ie = new P([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), ae = new P([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), L = function(e, t) {
	for (var n = new F(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new I(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, R = L(re, 2), oe = R.b, z = R.r;
oe[28] = 258, z[258] = 28;
var B = L(ie, 0), se = B.b;
B.r;
for (var V = new F(32768), H = 0; H < 32768; ++H) {
	var U = (H & 43690) >> 1 | (H & 21845) << 1;
	U = (U & 52428) >> 2 | (U & 13107) << 2, U = (U & 61680) >> 4 | (U & 3855) << 4, V[H] = ((U & 65280) >> 8 | (U & 255) << 8) >> 1;
}
for (var W = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new F(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new F(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new F(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[V[d] >> c] = l;
	} else for (s = new F(r), i = 0; i < r; ++i) e[i] && (s[i] = V[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), G = new P(288), H = 0; H < 144; ++H) G[H] = 8;
for (var H = 144; H < 256; ++H) G[H] = 9;
for (var H = 256; H < 280; ++H) G[H] = 7;
for (var H = 280; H < 288; ++H) G[H] = 8;
for (var ce = new P(32), H = 0; H < 32; ++H) ce[H] = 5;
var le = /*#__PURE__*/ W(G, 9, 1), ue = /*#__PURE__*/ W(ce, 5, 1), K = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, q = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, J = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, de = function(e) {
	return (e + 7) / 8 | 0;
}, Y = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new P(e.subarray(t, n));
}, fe = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], X = function(e, t, n) {
	var r = Error(t || fe[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, X), !n) throw r;
	return r;
}, pe = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new P(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new P(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new P(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = q(e, d, 1);
			var v = q(e, d + 1, 3);
			if (d += 3, !v) {
				var y = de(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && X(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = le, m = ue, h = 9, g = 5;
			else if (v == 2) {
				var S = q(e, d, 31) + 257, C = q(e, d + 10, 15) + 4, ee = S + q(e, d + 5, 31) + 1;
				d += 14;
				for (var w = new P(ee), T = new P(19), E = 0; E < C; ++E) T[ae[E]] = q(e, d + E * 3, 7);
				d += C * 3;
				for (var D = K(T), te = (1 << D) - 1, ne = W(T, D, 1), E = 0; E < ee;) {
					var O = ne[q(e, d, te)];
					d += O & 15;
					var y = O >> 4;
					if (y < 16) w[E++] = y;
					else {
						var k = 0, A = 0;
						for (y == 16 ? (A = 3 + q(e, d, 3), d += 2, k = w[E - 1]) : y == 17 ? (A = 3 + q(e, d, 7), d += 3) : y == 18 && (A = 11 + q(e, d, 127), d += 7); A--;) w[E++] = k;
					}
				}
				var j = w.subarray(0, S), M = w.subarray(S);
				h = K(j), g = K(M), p = W(j, h, 1), m = W(M, g, 1);
			} else X(1);
			if (d > _) {
				c && X(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var N = (1 << h) - 1, F = (1 << g) - 1, I = d;; I = d) {
			var k = p[J(e, d) & N], L = k >> 4;
			if (d += k & 15, d > _) {
				c && X(0);
				break;
			}
			if (k || X(2), L < 256) n[f++] = L;
			else if (L == 256) {
				I = d, p = null;
				break;
			} else {
				var R = L - 254;
				if (L > 264) {
					var E = L - 257, z = re[E];
					R = q(e, d, (1 << z) - 1) + oe[E], d += z;
				}
				var B = m[J(e, d) & F], V = B >> 4;
				B || X(3), d += B & 15;
				var M = se[V];
				if (V > 3) {
					var z = ie[V];
					M += J(e, d) & (1 << z) - 1, d += z;
				}
				if (d > _) {
					c && X(0);
					break;
				}
				s && l(f + 131072);
				var H = f + R;
				if (f < M) {
					var U = a - M, G = Math.min(M, H);
					for (U + f < 0 && X(3); f < G; ++f) n[f] = r[U + f];
				}
				for (; f < H; ++f) n[f] = n[f - M];
			}
		}
		t.l = p, t.p = I, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Y(n, 0, f) : n.subarray(0, f);
}, me = /*#__PURE__*/ new P(0), Z = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, Q = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, he = function(e, t) {
	return Q(e, t) + Q(e, t + 4) * 4294967296;
};
function ge(e, t) {
	return pe(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var _e = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	_e.decode(me, { stream: !0 });
} catch {}
var ve = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: Y(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function ye(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (_e) return _e.decode(e);
	var i = ve(e), a = i.s, n = i.r;
	return n.length && X(8), a;
}
var be = function(e, t) {
	return t + 30 + Z(e, t + 26) + Z(e, t + 28);
}, xe = function(e, t, n) {
	var r = Z(e, t + 28), i = Z(e, t + 30), a = ye(e.subarray(t + 46, t + 46 + r), !(Z(e, t + 8) & 2048)), o = t + 46 + r, s = Se(e, o, i, n, Q(e, t + 20), Q(e, t + 24), Q(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		Z(e, t + 10),
		c,
		l,
		a,
		o + i + Z(e, t + 32),
		u
	];
}, Se = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + Z(e, t + 2)) if (Z(e, t) == 1) return [
			s ? he(e, t + 4 + 8 * c) : i,
			c ? he(e, t + 4) : a,
			l ? he(e, t + 4 + 8 * (c + s)) : o,
			1
		];
		r < 2 && X(13);
	}
	return [
		i,
		a,
		o,
		0
	];
};
function Ce(e, t) {
	for (var n = {}, r = e.length - 22; Q(e, r) != 101010256; --r) (!r || e.length - r > 65558) && X(13);
	var i = Z(e, r + 8);
	if (!i) return {};
	var a = Q(e, r + 16), o = Q(e, r - 20) == 117853008;
	if (o) {
		var s = Q(e, r - 12);
		o = Q(e, s) == 101075792, o && (i = Q(e, s + 32), a = Q(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = xe(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = be(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = ge(e.subarray(_, _ + f), { out: new P(p) }) : X(14, "unknown compression type " + d) : n[m] = Y(e, _, _ + f));
	}
	return n;
}
//#endregion
//#region src/check.ts
var $ = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.issues = t;
	}
}, we = {
	html: "text/html",
	htm: "text/html",
	css: "text/css",
	js: "text/javascript",
	json: "application/json",
	md: "text/markdown",
	txt: "text/plain",
	csv: "text/csv",
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	gif: "image/gif",
	svg: "image/svg+xml",
	pdf: "application/pdf",
	zip: "application/zip",
	mp3: "audio/mpeg",
	mp4: "video/mp4",
	woff2: "font/woff2"
};
function Te(e) {
	return we[e.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";
}
function Ee(e) {
	try {
		return JSON.parse(ye(e));
	} catch {
		throw new $(f("package.badJson"));
	}
}
function De(e) {
	let t = e;
	return t?.format === "engenty-wizard" ? t.definition : e;
}
function Oe(e) {
	if (e[0] !== 80 || e[1] !== 75) return {
		definition: De(Ee(e)),
		files: []
	};
	let t;
	try {
		t = Ce(e, { filter: (e) => !e.name.endsWith("/") && !e.name.startsWith("__MACOSX/") && !/\/\./.test(e.name) });
	} catch {
		throw new $(f("package.unreadable"));
	}
	let n = t[k];
	if (!n) throw new $(f("package.noManifest"));
	let r = Object.entries(t).filter(([e]) => e.startsWith(A)).map(([e, t]) => ({
		path: e.slice(A.length),
		data: t,
		mime: Te(e)
	}));
	return {
		definition: De(Ee(n)),
		files: r
	};
}
function ke(e) {
	let { definition: t, files: n } = Oe(e), r = u(t, n.map((e) => e.path));
	if (!r.ok) throw new $(f("package.newer"), r.issues);
	return {
		definition: r.wizard,
		files: n,
		issues: r.issues,
		fit: E(r.wizard)
	};
}
//#endregion
export { j as PACKAGE_EXTENSION, M as PACKAGE_MIME, $ as PackageError, ke as checkPackage, Te as mimeOf, Oe as readPackage, E as standaloneEntry, w as standaloneFit };

//# sourceMappingURL=check.js.map