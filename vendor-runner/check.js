import { C as e, S as t, _ as n, b as r, c as i, d as a, h as o, l as s, n as c, o as l, t as u, u as d, v as f, w as p, x as m, y as h } from "./chunks/definition-dqKu0H5N.js";
//#region ../shared/src/fit.ts
var g = /* @__PURE__ */ new Set([
	"html",
	"md",
	"txt",
	"csv",
	"json"
]), _ = /* @__PURE__ */ new Set([
	"web_search",
	"browser",
	"sandbox",
	"image"
]), v = /* @__PURE__ */ new Set(["web_fetch", "http"]), y = /\{\{\s*memory\b/;
function b(e) {
	switch (e.type) {
		case "agent": return [e.instructions, e.call ? JSON.stringify(e.call.input) : ""];
		case "generate": return [e.prompt, e.options?.style ?? ""];
		case "film": return [e.brief];
		case "widget":
		case "surface": return Object.values(e.data).map((e) => `{{${c(e)}}}`);
		default: return [];
	}
}
function x(e, t) {
	return e.steps.slice(t + 1).some((e) => e.type === "agent" && !e.call || e.type === "generate" || e.type === "film");
}
function S(e, t) {
	let n = [], r = (t, r) => {
		let i = n.find((e) => e.need === t);
		i ? i.hard ||= r : n.push({
			stepId: e.id,
			need: t,
			hard: r
		});
	}, a = t.steps.indexOf(e);
	for (let t of b(e)) y.test(t) && r("memory", !0), o(t).some((e) => e.startsWith("lists.")) && r("lists", !0);
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
					case "file": x(t, a) ? r("field:file-read", !0) : r("field:file", !1);
				}
				n.optionsFrom && i(c(n.optionsFrom).split(".").slice(0, 2).join(".")) && r("lists", !0);
			}
			break;
		case "agent": {
			let t = e.call ? [...e.tools, e.call.tool] : e.tools;
			for (let e of t) {
				let t = d(e);
				t ? r(`plugin:${t.plugin}`, !0) : v.has(e) || (_.has(e) ? r(`tool:${e}`, !0) : r(`tool:${e}`, !1));
			}
			e.mcp?.length && r("mcp", !0), e.connections?.length && r("connections", !0), e.each && (i(c(e.each)) ? r("lists", !0) : r("each", !1));
			break;
		}
		case "generate":
			e.asset !== "document" && e.asset !== "dashboard" && r(`asset:${e.asset}`, !0);
			break;
		case "film":
			r("film", !0);
			break;
		case "widget":
			r(e.video ? "widget:video" : "widget", !0);
			break;
		case "surface":
			Object.values(e.data).some((e) => i(c(e))) && r("lists", !0);
			break;
		case "review":
			e.show.some((e) => i(e)) && r("lists", !0);
			break;
		case "result": for (let n of e.deliverables) {
			if (i(n.from)) {
				r("lists", !0);
				continue;
			}
			let e = t.steps.find((e) => e.id === n.from);
			if (e?.type !== "agent" && (e?.type !== "generate" || e.asset !== "document" && e.asset !== "dashboard")) continue;
			let a = n.formats.some((e) => g.has(e));
			for (let t of n.formats) g.has(t) || (t !== "pdf" || e?.type !== "agent") && r(`format:${t}`, t !== "pdf" && !a);
		}
	}
	return n;
}
function C(e) {
	let t = e.steps.flatMap((t) => S(t, e));
	e.lists?.length && !t.some((e) => e.need === "lists") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "lists",
		hard: !0
	}), e.connections?.length && !t.some((e) => e.need === "connections") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "connections",
		hard: !0
	});
	let n = E(e);
	return {
		fit: t.some((e) => e.hard && n.has(e.stepId)) ? "no" : t.length ? "less" : "full",
		notes: t
	};
}
function w(e) {
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
function T(e) {
	let t = C(e), n = E(e), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let e of t.notes) {
		if (e.need.startsWith("plugin:")) {
			a.add(e.need.slice(7));
			continue;
		}
		if (e.need.startsWith("format:")) {
			o.add(e.need.slice(7));
			continue;
		}
		let t = w(e.need);
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
function E(e) {
	return e.steps.length ? D(e, e.steps[0].id, {}) : /* @__PURE__ */ new Set();
}
function D(e, t, n) {
	let r = new Map(e.steps.map((e, t) => [e.id, t])), i = r.get(t) ?? 0, o = (t) => {
		let i = [];
		for (let o of e.steps[t].next ?? []) {
			if (l(o)) continue;
			let t = o.goto === "end" ? e.steps.length : r.get(o.goto) ?? -1;
			if (o.ask || !u(o.when).every((e) => e.field in n)) {
				t >= 0 && i.push(t);
				continue;
			}
			if (a(o, n)) return t >= 0 ? [...i, t] : i;
		}
		return i.push(O(e, t, r)), i;
	}, s = (t) => {
		if (t === i) return !1;
		let n = /* @__PURE__ */ new Set([i]), r = [i];
		for (; r.length;) {
			let i = r.shift();
			if (i >= e.steps.length) return !0;
			for (let e of o(i)) e !== t && !n.has(e) && (n.add(e), r.push(e));
		}
		return !1;
	};
	return new Set(e.steps.filter((e, t) => !s(t)).map((e) => e.id));
}
function O(e, t, n) {
	let r = e.steps[t].next?.find(l)?.goto;
	return r === void 0 ? t + 1 : r === "end" ? e.steps.length : n.get(r) ?? t + 1;
}
//#endregion
//#region ../shared/src/wizard-package.ts
var ee = "engenty-wizard", te = "wizard.json", k = "files/", A = ".wizard", j = "application/vnd.engenty.wizard+zip", M = "https://engenty.ai/schema/v1";
`${M}`, `${M}`, t({
	$schema: e().optional(),
	format: r(ee),
	version: r(1),
	exportedAt: e().optional(),
	definition: p(),
	connectors: f(t({
		id: e().max(60),
		name: e().max(120),
		domain: e().max(253).optional(),
		sourceKind: n(["openapi", "mcp"]).optional()
	})).max(50).default([]),
	mcpServers: f(t({
		id: e().max(31),
		name: e().max(60)
	})).max(10).default([]),
	knowledge: t({
		pages: m().int(),
		truncated: h()
	}).optional()
});
//#endregion
//#region ../../node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var N = Uint8Array, P = Uint16Array, ne = Int32Array, re = new N([
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
]), ie = new N([
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
]), ae = new N([
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
]), F = function(e, t) {
	for (var n = new P(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new ne(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, I = F(re, 2), oe = I.b, L = I.r;
oe[28] = 258, L[258] = 28;
var R = F(ie, 0), se = R.b;
R.r;
for (var z = new P(32768), B = 0; B < 32768; ++B) {
	var V = (B & 43690) >> 1 | (B & 21845) << 1;
	V = (V & 52428) >> 2 | (V & 13107) << 2, V = (V & 61680) >> 4 | (V & 3855) << 4, z[B] = ((V & 65280) >> 8 | (V & 255) << 8) >> 1;
}
for (var H = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new P(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new P(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new P(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[z[d] >> c] = l;
	} else for (s = new P(r), i = 0; i < r; ++i) e[i] && (s[i] = z[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), U = new N(288), B = 0; B < 144; ++B) U[B] = 8;
for (var B = 144; B < 256; ++B) U[B] = 9;
for (var B = 256; B < 280; ++B) U[B] = 7;
for (var B = 280; B < 288; ++B) U[B] = 8;
for (var W = new N(32), B = 0; B < 32; ++B) W[B] = 5;
var ce = /*#__PURE__*/ H(U, 9, 1), le = /*#__PURE__*/ H(W, 5, 1), G = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, K = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, q = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, ue = function(e) {
	return (e + 7) / 8 | 0;
}, J = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new N(e.subarray(t, n));
}, de = [
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
], Y = function(e, t, n) {
	var r = Error(t || de[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, Y), !n) throw r;
	return r;
}, fe = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new N(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new N(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new N(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = K(e, d, 1);
			var v = K(e, d + 1, 3);
			if (d += 3, !v) {
				var y = ue(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && Y(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = ce, m = le, h = 9, g = 5;
			else if (v == 2) {
				var S = K(e, d, 31) + 257, C = K(e, d + 10, 15) + 4, w = S + K(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new N(w), E = new N(19), D = 0; D < C; ++D) E[ae[D]] = K(e, d + D * 3, 7);
				d += C * 3;
				for (var O = G(E), ee = (1 << O) - 1, te = H(E, O, 1), D = 0; D < w;) {
					var k = te[K(e, d, ee)];
					d += k & 15;
					var y = k >> 4;
					if (y < 16) T[D++] = y;
					else {
						var A = 0, j = 0;
						for (y == 16 ? (j = 3 + K(e, d, 3), d += 2, A = T[D - 1]) : y == 17 ? (j = 3 + K(e, d, 7), d += 3) : y == 18 && (j = 11 + K(e, d, 127), d += 7); j--;) T[D++] = A;
					}
				}
				var M = T.subarray(0, S), P = T.subarray(S);
				h = G(M), g = G(P), p = H(M, h, 1), m = H(P, g, 1);
			} else Y(1);
			if (d > _) {
				c && Y(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var ne = (1 << h) - 1, F = (1 << g) - 1, I = d;; I = d) {
			var A = p[q(e, d) & ne], L = A >> 4;
			if (d += A & 15, d > _) {
				c && Y(0);
				break;
			}
			if (A || Y(2), L < 256) n[f++] = L;
			else if (L == 256) {
				I = d, p = null;
				break;
			} else {
				var R = L - 254;
				if (L > 264) {
					var D = L - 257, z = re[D];
					R = K(e, d, (1 << z) - 1) + oe[D], d += z;
				}
				var B = m[q(e, d) & F], V = B >> 4;
				B || Y(3), d += B & 15;
				var P = se[V];
				if (V > 3) {
					var z = ie[V];
					P += q(e, d) & (1 << z) - 1, d += z;
				}
				if (d > _) {
					c && Y(0);
					break;
				}
				s && l(f + 131072);
				var U = f + R;
				if (f < P) {
					var W = a - P, de = Math.min(P, U);
					for (W + f < 0 && Y(3); f < de; ++f) n[f] = r[W + f];
				}
				for (; f < U; ++f) n[f] = n[f - P];
			}
		}
		t.l = p, t.p = I, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? J(n, 0, f) : n.subarray(0, f);
}, pe = /*#__PURE__*/ new N(0), X = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, Z = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, Q = function(e, t) {
	return Z(e, t) + Z(e, t + 4) * 4294967296;
};
function me(e, t) {
	return fe(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var he = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	he.decode(pe, { stream: !0 });
} catch {}
var ge = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: J(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function _e(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (he) return he.decode(e);
	var i = ge(e), a = i.s, n = i.r;
	return n.length && Y(8), a;
}
var ve = function(e, t) {
	return t + 30 + X(e, t + 26) + X(e, t + 28);
}, ye = function(e, t, n) {
	var r = X(e, t + 28), i = X(e, t + 30), a = _e(e.subarray(t + 46, t + 46 + r), !(X(e, t + 8) & 2048)), o = t + 46 + r, s = be(e, o, i, n, Z(e, t + 20), Z(e, t + 24), Z(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		X(e, t + 10),
		c,
		l,
		a,
		o + i + X(e, t + 32),
		u
	];
}, be = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + X(e, t + 2)) if (X(e, t) == 1) return [
			s ? Q(e, t + 4 + 8 * c) : i,
			c ? Q(e, t + 4) : a,
			l ? Q(e, t + 4 + 8 * (c + s)) : o,
			1
		];
		r < 2 && Y(13);
	}
	return [
		i,
		a,
		o,
		0
	];
};
function xe(e, t) {
	for (var n = {}, r = e.length - 22; Z(e, r) != 101010256; --r) (!r || e.length - r > 65558) && Y(13);
	var i = X(e, r + 8);
	if (!i) return {};
	var a = Z(e, r + 16), o = Z(e, r - 20) == 117853008;
	if (o) {
		var s = Z(e, r - 12);
		o = Z(e, s) == 101075792, o && (i = Z(e, s + 32), a = Z(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = ye(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = ve(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = me(e.subarray(_, _ + f), { out: new N(p) }) : Y(14, "unknown compression type " + d) : n[m] = J(e, _, _ + f));
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
}, Se = {
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
function Ce(e) {
	return Se[e.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";
}
function we(e) {
	try {
		return JSON.parse(_e(e));
	} catch {
		throw new $("This is not a wizard package: wizard.json is not valid JSON.");
	}
}
function Te(e) {
	let t = e;
	return t?.format === "engenty-wizard" ? t.definition : e;
}
function Ee(e) {
	if (e[0] !== 80 || e[1] !== 75) return {
		definition: Te(we(e)),
		files: []
	};
	let t;
	try {
		t = xe(e, { filter: (e) => !e.name.endsWith("/") && !e.name.startsWith("__MACOSX/") && !/\/\./.test(e.name) });
	} catch {
		throw new $("The wizard package cannot be opened.");
	}
	let n = t[te];
	if (!n) throw new $("This is not a wizard package: wizard.json is missing.");
	let r = Object.entries(t).filter(([e]) => e.startsWith(k)).map(([e, t]) => ({
		path: e.slice(k.length),
		data: t,
		mime: Ce(e)
	}));
	return {
		definition: Te(we(n)),
		files: r
	};
}
function De(e) {
	let { definition: t, files: n } = Ee(e), r = s(t, n.map((e) => e.path));
	if (!r.ok) throw new $("This wizard package comes from a newer version, or it is damaged.", r.issues);
	return {
		definition: r.wizard,
		files: n,
		issues: r.issues,
		fit: T(r.wizard)
	};
}
//#endregion
export { A as PACKAGE_EXTENSION, j as PACKAGE_MIME, $ as PackageError, De as checkPackage, Ce as mimeOf, Ee as readPackage, T as standaloneEntry, C as standaloneFit };

//# sourceMappingURL=check.js.map