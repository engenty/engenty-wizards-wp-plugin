import { B as e, C as t, H as n, I as r, L as i, O as a, R as o, S as s, U as c, V as l, W as u, b as d, f, l as p, m, p as h, v as g, x as _, z as v } from "./chunks/i18n-DHKrgXZE.js";
//#region ../shared/src/fit.ts
var y = /* @__PURE__ */ new Set([
	"html",
	"md",
	"txt",
	"csv",
	"json"
]), b = /* @__PURE__ */ new Set(["code"]), x = /* @__PURE__ */ new Set([
	"web_search",
	"browser",
	"sandbox",
	"image"
]), S = /* @__PURE__ */ new Set(["web_fetch", "http"]), C = /\{\{\s*memory\b/;
function w(e) {
	switch (e.type) {
		case "agent": return [e.instructions, e.call ? JSON.stringify(e.call.input) : ""];
		case "generate": return [e.prompt, e.options?.style ?? ""];
		case "motion-graphics": return [e.brief];
		case "widget":
		case "surface": return Object.values(e.data).map((e) => `{{${m(e)}}}`);
		default: return [];
	}
}
function T(e, t) {
	return e.steps.slice(t + 1).some((e) => e.type === "agent" && !e.call || e.type === "generate" || e.type === "motion-graphics");
}
function E(e, t) {
	let n = [], r = (t, r) => {
		let i = n.find((e) => e.need === t);
		i ? i.hard ||= r : n.push({
			stepId: e.id,
			need: t,
			hard: r
		});
	}, i = t.steps.indexOf(e);
	for (let t of w(e)) C.test(t) && r("memory", !0), a(t).some((e) => e.startsWith("lists.")) && r("lists", !0);
	switch (e.type) {
		case "page":
			for (let n of e.fields) {
				switch (n.kind) {
					case "audio":
						r("field:audio", !!n.required);
						break;
					case "connection":
						r("field:connection", !0);
						break;
					case "slot":
						r("field:slot", !0);
						break;
					case "list":
						r("lists", !0);
						break;
					case "location":
						r("field:location", !1);
						break;
					case "image":
						r("field:image", !1);
						break;
					case "file": T(t, i) ? r("field:file-read", !0) : r("field:file", !1);
				}
				n.optionsFrom && d(m(n.optionsFrom).split(".").slice(0, 2).join(".")) && r("lists", !0);
			}
			break;
		case "agent": {
			let t = e.call ? [...e.tools, e.call.tool] : e.tools;
			for (let e of t) {
				let t = s(e);
				t ? r(`plugin:${t.plugin}`, !0) : S.has(e) || b.has(e) || (x.has(e) ? r(`tool:${e}`, !0) : r(`tool:${e}`, !1));
			}
			e.mcp?.length && r("mcp", !0), e.connections?.length && r("connections", !0), e.each && (d(m(e.each)) ? r("lists", !0) : r("each", !1));
			break;
		}
		case "generate":
			e.asset !== "document" && e.asset !== "dashboard" && r(`asset:${e.asset}`, !0);
			break;
		case "motion-graphics":
			r("motion-graphics", !0);
			break;
		case "widget":
			r(e.video ? "widget:video" : "widget", !0);
			break;
		case "surface":
			Object.values(e.data).some((e) => d(m(e))) && r("lists", !0);
			break;
		case "review":
			e.show.some((e) => d(e)) && r("lists", !0);
			break;
		case "result": for (let n of e.deliverables) {
			if (d(n.from)) {
				r("lists", !0);
				continue;
			}
			let e = t.steps.find((e) => e.id === n.from);
			if (e?.type !== "agent" && (e?.type !== "generate" || e.asset !== "document" && e.asset !== "dashboard")) continue;
			let i = n.formats.some((e) => y.has(e));
			for (let t of n.formats) y.has(t) || (t !== "pdf" || e?.type !== "agent") && r(`format:${t}`, t !== "pdf" && !i);
		}
	}
	return n;
}
function D(e) {
	let t = e.steps.flatMap((t) => E(t, e));
	e.lists?.length && !t.some((e) => e.need === "lists") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "lists",
		hard: !0
	}), e.connections?.length && !t.some((e) => e.need === "connections") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "connections",
		hard: !0
	});
	let n = ee(e);
	return {
		fit: t.some((e) => e.hard && n.has(e.stepId)) ? "no" : t.length ? "less" : "full",
		notes: t
	};
}
function O(e) {
	switch (e) {
		case "tool:web_search":
		case "tool:web_fetch": return "web";
		case "tool:browser": return "browser";
		case "tool:sandbox": return "code";
		case "tool:image":
		case "asset:image": return "image";
		case "asset:video":
		case "motion-graphics":
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
function k(e) {
	let t = D(e), n = ee(e), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let e of t.notes) {
		if (e.need.startsWith("plugin:")) {
			a.add(e.need.slice(7));
			continue;
		}
		if (e.need.startsWith("format:")) {
			o.add(e.need.slice(7));
			continue;
		}
		let t = O(e.need);
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
function ee(e) {
	return e.steps.length ? te(e, e.steps[0].id, {}) : /* @__PURE__ */ new Set();
}
function te(e, n, r) {
	let i = new Map(e.steps.map((e, t) => [e.id, t])), a = i.get(n) ?? 0, o = (n) => {
		let a = [];
		for (let o of e.steps[n].next ?? []) {
			if (g(o)) continue;
			let n = o.goto === "end" ? e.steps.length : i.get(o.goto) ?? -1;
			if (o.ask || !h(o.when).every((e) => e.field in r)) {
				n >= 0 && a.push(n);
				continue;
			}
			if (t(o, r)) return n >= 0 ? [...a, n] : a;
		}
		return a.push(A(e, n, i)), a;
	}, s = (t) => {
		if (t === a) return !1;
		let n = /* @__PURE__ */ new Set([a]), r = [a];
		for (; r.length;) {
			let i = r.shift();
			if (i >= e.steps.length) return !0;
			for (let e of o(i)) e !== t && !n.has(e) && (n.add(e), r.push(e));
		}
		return !1;
	};
	return new Set(e.steps.filter((e, t) => !s(t)).map((e) => e.id));
}
function A(e, t, n) {
	let r = e.steps[t].next?.find(g)?.goto;
	return r === void 0 ? t + 1 : r === "end" ? e.steps.length : n.get(r) ?? t + 1;
}
//#endregion
//#region ../shared/src/theme.ts
var j = [
	"brand",
	"host",
	"default"
];
[...j];
var M = n().regex(/^#[0-9a-fA-F]{6}$/, "a colour as #rrggbb"), N = l({
	accent: M.optional(),
	background: M.optional(),
	text: M.optional()
}).extend({ scheme: r(["light", "dark"]) }), ne = l({
	radius: r([
		"sharp",
		"soft",
		"round"
	]).optional(),
	cards: r([
		"solid",
		"outline",
		"glass"
	]).optional(),
	headings: r(["normal", "uppercase"]).optional()
}), re = l({ id: n().min(1).max(40) }).catchall(c([
	n().max(40),
	e(),
	o()
])), P = n().min(1).max(60).regex(/^[A-Za-z0-9 -]+$/, "a font by its family name, or brand"), F = l({
	id: n().regex(f, "a theme id: lowercase letters, digits and dashes"),
	name: n().min(1).max(80),
	version: n().regex(/^\d+\.\d+\.\d+$/).default("1.0.0"),
	base: r(j).default("brand"),
	colors: i(N).min(1).max(2).refine((e) => new Set(e.map((e) => e.scheme)).size === e.length, { message: "Each scheme once: light, dark." }).optional(),
	fonts: l({
		heading: P.optional(),
		text: P.optional()
	}).optional(),
	shape: ne.optional(),
	effects: i(re).max(8).optional()
}), I = "engenty-wizard", L = "wizard.json", R = "files/", z = ".wizard", B = "application/vnd.engenty.wizard+zip", V = "https://engenty.ai/schema/v2";
`${V}`, `${V}`, l({
	$schema: n().optional(),
	format: v(I),
	version: v(1),
	exportedAt: n().optional(),
	definition: u(),
	connectors: i(l({
		id: n().max(60),
		name: n().max(120),
		domain: n().max(253).optional(),
		sourceKind: r(["openapi", "mcp"]).optional()
	})).max(50).default([]),
	mcpServers: i(l({
		id: n().max(31),
		name: n().max(60)
	})).max(10).default([]),
	themes: i(F).max(8).default([]),
	knowledge: l({
		pages: e().int(),
		truncated: o()
	}).optional()
});
//#endregion
//#region ../../node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var H = Uint8Array, U = Uint16Array, ie = Int32Array, ae = new H([
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
]), oe = new H([
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
]), se = new H([
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
]), ce = function(e, t) {
	for (var n = new U(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new ie(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, le = ce(ae, 2), ue = le.b, de = le.r;
ue[28] = 258, de[258] = 28;
var fe = ce(oe, 0), pe = fe.b;
fe.r;
for (var W = new U(32768), G = 0; G < 32768; ++G) {
	var K = (G & 43690) >> 1 | (G & 21845) << 1;
	K = (K & 52428) >> 2 | (K & 13107) << 2, K = (K & 61680) >> 4 | (K & 3855) << 4, W[G] = ((K & 65280) >> 8 | (K & 255) << 8) >> 1;
}
for (var q = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new U(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new U(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new U(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[W[d] >> c] = l;
	} else for (s = new U(r), i = 0; i < r; ++i) e[i] && (s[i] = W[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), J = new H(288), G = 0; G < 144; ++G) J[G] = 8;
for (var G = 144; G < 256; ++G) J[G] = 9;
for (var G = 256; G < 280; ++G) J[G] = 7;
for (var G = 280; G < 288; ++G) J[G] = 8;
for (var me = new H(32), G = 0; G < 32; ++G) me[G] = 5;
var he = /*#__PURE__*/ q(J, 9, 1), ge = /*#__PURE__*/ q(me, 5, 1), _e = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, Y = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, ve = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, ye = function(e) {
	return (e + 7) / 8 | 0;
}, be = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new H(e.subarray(t, n));
}, xe = [
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
	var r = Error(t || xe[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, X), !n) throw r;
	return r;
}, Se = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new H(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new H(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new H(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = Y(e, d, 1);
			var v = Y(e, d + 1, 3);
			if (d += 3, !v) {
				var y = ye(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && X(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = he, m = ge, h = 9, g = 5;
			else if (v == 2) {
				var S = Y(e, d, 31) + 257, C = Y(e, d + 10, 15) + 4, w = S + Y(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new H(w), E = new H(19), D = 0; D < C; ++D) E[se[D]] = Y(e, d + D * 3, 7);
				d += C * 3;
				for (var O = _e(E), k = (1 << O) - 1, ee = q(E, O, 1), D = 0; D < w;) {
					var te = ee[Y(e, d, k)];
					d += te & 15;
					var y = te >> 4;
					if (y < 16) T[D++] = y;
					else {
						var A = 0, j = 0;
						for (y == 16 ? (j = 3 + Y(e, d, 3), d += 2, A = T[D - 1]) : y == 17 ? (j = 3 + Y(e, d, 7), d += 3) : y == 18 && (j = 11 + Y(e, d, 127), d += 7); j--;) T[D++] = A;
					}
				}
				var M = T.subarray(0, S), N = T.subarray(S);
				h = _e(M), g = _e(N), p = q(M, h, 1), m = q(N, g, 1);
			} else X(1);
			if (d > _) {
				c && X(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var ne = (1 << h) - 1, re = (1 << g) - 1, P = d;; P = d) {
			var A = p[ve(e, d) & ne], F = A >> 4;
			if (d += A & 15, d > _) {
				c && X(0);
				break;
			}
			if (A || X(2), F < 256) n[f++] = F;
			else if (F == 256) {
				P = d, p = null;
				break;
			} else {
				var I = F - 254;
				if (F > 264) {
					var D = F - 257, L = ae[D];
					I = Y(e, d, (1 << L) - 1) + ue[D], d += L;
				}
				var R = m[ve(e, d) & re], z = R >> 4;
				R || X(3), d += R & 15;
				var N = pe[z];
				if (z > 3) {
					var L = oe[z];
					N += ve(e, d) & (1 << L) - 1, d += L;
				}
				if (d > _) {
					c && X(0);
					break;
				}
				s && l(f + 131072);
				var B = f + I;
				if (f < N) {
					var V = a - N, U = Math.min(N, B);
					for (V + f < 0 && X(3); f < U; ++f) n[f] = r[V + f];
				}
				for (; f < B; ++f) n[f] = n[f - N];
			}
		}
		t.l = p, t.p = P, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? be(n, 0, f) : n.subarray(0, f);
}, Ce = /*#__PURE__*/ new H(0), Z = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, Q = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, we = function(e, t) {
	return Q(e, t) + Q(e, t + 4) * 4294967296;
};
function Te(e, t) {
	return Se(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var Ee = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Ee.decode(Ce, { stream: !0 });
} catch {}
var De = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: be(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function Oe(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (Ee) return Ee.decode(e);
	var i = De(e), a = i.s, n = i.r;
	return n.length && X(8), a;
}
var ke = function(e, t) {
	return t + 30 + Z(e, t + 26) + Z(e, t + 28);
}, Ae = function(e, t, n) {
	var r = Z(e, t + 28), i = Z(e, t + 30), a = Oe(e.subarray(t + 46, t + 46 + r), !(Z(e, t + 8) & 2048)), o = t + 46 + r, s = je(e, o, i, n, Q(e, t + 20), Q(e, t + 24), Q(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		Z(e, t + 10),
		c,
		l,
		a,
		o + i + Z(e, t + 32),
		u
	];
}, je = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + Z(e, t + 2)) if (Z(e, t) == 1) return [
			s ? we(e, t + 4 + 8 * c) : i,
			c ? we(e, t + 4) : a,
			l ? we(e, t + 4 + 8 * (c + s)) : o,
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
function Me(e, t) {
	for (var n = {}, r = e.length - 22; Q(e, r) != 101010256; --r) (!r || e.length - r > 65558) && X(13);
	var i = Z(e, r + 8);
	if (!i) return {};
	var a = Q(e, r + 16), o = Q(e, r - 20) == 117853008;
	if (o) {
		var s = Q(e, r - 12);
		o = Q(e, s) == 101075792, o && (i = Q(e, s + 32), a = Q(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = Ae(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = ke(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = Te(e.subarray(_, _ + f), { out: new H(p) }) : X(14, "unknown compression type " + d) : n[m] = be(e, _, _ + f));
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
}, Ne = {
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
function Pe(e) {
	return Ne[e.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";
}
function Fe(e) {
	try {
		return JSON.parse(Oe(e));
	} catch {
		throw new $(p("package.badJson"));
	}
}
function Ie(e) {
	let t = e;
	return t?.format === "engenty-wizard" ? t.definition : e;
}
function Le(e) {
	if (e[0] !== 80 || e[1] !== 75) return {
		definition: Ie(Fe(e)),
		files: []
	};
	let t;
	try {
		t = Me(e, { filter: (e) => !e.name.endsWith("/") && !e.name.startsWith("__MACOSX/") && !/\/\./.test(e.name) });
	} catch {
		throw new $(p("package.unreadable"));
	}
	let n = t[L];
	if (!n) throw new $(p("package.noManifest"));
	let r = Object.entries(t).filter(([e]) => e.startsWith(R)).map(([e, t]) => ({
		path: e.slice(R.length),
		data: t,
		mime: Pe(e)
	}));
	return {
		definition: Ie(Fe(n)),
		files: r
	};
}
function Re(e) {
	let { definition: t, files: n } = Le(e), r = _(t, n.map((e) => e.path));
	if (!r.ok) throw new $(p("package.newer"), r.issues);
	return {
		definition: r.wizard,
		files: n,
		issues: r.issues,
		fit: k(r.wizard)
	};
}
//#endregion
export { z as PACKAGE_EXTENSION, B as PACKAGE_MIME, $ as PackageError, Re as checkPackage, Pe as mimeOf, Le as readPackage, k as standaloneEntry, D as standaloneFit };

//# sourceMappingURL=check.js.map