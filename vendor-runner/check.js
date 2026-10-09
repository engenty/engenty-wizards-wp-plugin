import { c as e, d as t, h as n, l as r, n as i, o as a, t as o, u as s } from "./chunks/definition-c4zYmQVf.js";
//#region ../shared/src/fit.ts
var c = /* @__PURE__ */ new Set([
	"html",
	"md",
	"txt",
	"csv",
	"json"
]), l = /* @__PURE__ */ new Set([
	"web_search",
	"web_fetch",
	"browser",
	"sandbox",
	"image",
	"http"
]), u = /\{\{\s*memory\b/;
function d(e) {
	switch (e.type) {
		case "agent": return [e.instructions, e.call ? JSON.stringify(e.call.input) : ""];
		case "generate": return [e.prompt, e.options?.style ?? ""];
		case "film": return [e.brief];
		case "widget":
		case "surface": return Object.values(e.data).map((e) => `{{${i(e)}}}`);
		default: return [];
	}
}
function f(e, t) {
	return e.steps.slice(t + 1).some((e) => e.type === "agent" && !e.call || e.type === "generate" || e.type === "film");
}
function p(t, r) {
	let a = [], o = (e, n) => {
		let r = a.find((t) => t.need === e);
		r ? r.hard ||= n : a.push({
			stepId: t.id,
			need: e,
			hard: n
		});
	}, p = r.steps.indexOf(t);
	for (let e of d(t)) u.test(e) && o("memory", !0), n(e).some((e) => e.startsWith("lists.")) && o("lists", !0);
	switch (t.type) {
		case "page":
			for (let n of t.fields) {
				switch (n.kind) {
					case "audio":
						o("field:audio", !!n.required);
						break;
					case "connection":
						o("field:connection", !0);
						break;
					case "slot":
						o("field:slot", !0);
						break;
					case "list":
						o("lists", !0);
						break;
					case "location":
						o("field:location", !1);
						break;
					case "image":
						o("field:image", !1);
						break;
					case "file": f(r, p) ? o("field:file-read", !0) : o("field:file", !1);
				}
				n.optionsFrom && e(i(n.optionsFrom).split(".").slice(0, 2).join(".")) && o("lists", !0);
			}
			break;
		case "agent": {
			let n = t.call ? [...t.tools, t.call.tool] : t.tools;
			for (let e of n) {
				let t = s(e);
				t ? o(`plugin:${t.plugin}`, !0) : l.has(e) ? o(`tool:${e}`, !0) : o(`tool:${e}`, !1);
			}
			t.mcp?.length && o("mcp", !0), t.connections?.length && o("connections", !0), t.each && (e(i(t.each)) ? o("lists", !0) : o("each", !1));
			break;
		}
		case "generate":
			t.asset !== "document" && t.asset !== "dashboard" && o(`asset:${t.asset}`, !0);
			break;
		case "film":
			o("film", !0);
			break;
		case "widget":
			o(t.video ? "widget:video" : "widget", !0);
			break;
		case "surface":
			Object.values(t.data).some((t) => e(i(t))) && o("lists", !0);
			break;
		case "review":
			t.show.some((t) => e(t)) && o("lists", !0);
			break;
		case "result": for (let n of t.deliverables) {
			if (e(n.from)) {
				o("lists", !0);
				continue;
			}
			let t = r.steps.find((e) => e.id === n.from);
			if (t?.type !== "agent" && (t?.type !== "generate" || t.asset !== "document" && t.asset !== "dashboard")) continue;
			let i = n.formats.some((e) => c.has(e));
			for (let e of n.formats) c.has(e) || o(`format:${e}`, e !== "pdf" && !i);
		}
	}
	return a;
}
function m(e) {
	let t = e.steps.flatMap((t) => p(t, e));
	e.lists?.length && !t.some((e) => e.need === "lists") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "lists",
		hard: !0
	}), e.connections?.length && !t.some((e) => e.need === "connections") && t.push({
		stepId: e.steps[0]?.id ?? "",
		need: "connections",
		hard: !0
	});
	let n = _(e);
	return {
		fit: t.some((e) => e.hard && n.has(e.stepId)) ? "no" : t.length ? "less" : "full",
		notes: t
	};
}
function h(e) {
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
function g(e) {
	let t = m(e), n = _(e), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let e of t.notes) {
		if (e.need.startsWith("plugin:")) {
			a.add(e.need.slice(7));
			continue;
		}
		if (e.need.startsWith("format:")) {
			o.add(e.need.slice(7));
			continue;
		}
		let t = h(e.need);
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
function _(e) {
	return e.steps.length ? v(e, e.steps[0].id, {}) : /* @__PURE__ */ new Set();
}
function v(e, n, r) {
	let i = new Map(e.steps.map((e, t) => [e.id, t])), s = i.get(n) ?? 0, c = (n) => {
		let s = [];
		for (let c of e.steps[n].next ?? []) {
			if (a(c)) continue;
			let n = c.goto === "end" ? e.steps.length : i.get(c.goto) ?? -1;
			if (c.ask || !o(c.when).every((e) => e.field in r)) {
				n >= 0 && s.push(n);
				continue;
			}
			if (t(c, r)) return n >= 0 ? [...s, n] : s;
		}
		return s.push(y(e, n, i)), s;
	}, l = (t) => {
		if (t === s) return !1;
		let n = /* @__PURE__ */ new Set([s]), r = [s];
		for (; r.length;) {
			let i = r.shift();
			if (i >= e.steps.length) return !0;
			for (let e of c(i)) e !== t && !n.has(e) && (n.add(e), r.push(e));
		}
		return !1;
	};
	return new Set(e.steps.filter((e, t) => !l(t)).map((e) => e.id));
}
function y(e, t, n) {
	let r = e.steps[t].next?.find(a)?.goto;
	return r === void 0 ? t + 1 : r === "end" ? e.steps.length : n.get(r) ?? t + 1;
}
//#endregion
//#region ../../node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var b = Uint8Array, x = Uint16Array, S = Int32Array, ee = new b([
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
]), C = new b([
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
]), te = new b([
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
]), w = function(e, t) {
	for (var n = new x(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new S(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, T = w(ee, 2), ne = T.b, E = T.r;
ne[28] = 258, E[258] = 28;
var D = w(C, 0), re = D.b;
D.r;
for (var O = new x(32768), k = 0; k < 32768; ++k) {
	var A = (k & 43690) >> 1 | (k & 21845) << 1;
	A = (A & 52428) >> 2 | (A & 13107) << 2, A = (A & 61680) >> 4 | (A & 3855) << 4, O[k] = ((A & 65280) >> 8 | (A & 255) << 8) >> 1;
}
for (var j = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new x(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new x(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new x(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[O[d] >> c] = l;
	} else for (s = new x(r), i = 0; i < r; ++i) e[i] && (s[i] = O[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), M = new b(288), k = 0; k < 144; ++k) M[k] = 8;
for (var k = 144; k < 256; ++k) M[k] = 9;
for (var k = 256; k < 280; ++k) M[k] = 7;
for (var k = 280; k < 288; ++k) M[k] = 8;
for (var N = new b(32), k = 0; k < 32; ++k) N[k] = 5;
var ie = /*#__PURE__*/ j(M, 9, 1), ae = /*#__PURE__*/ j(N, 5, 1), P = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, F = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, I = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, oe = function(e) {
	return (e + 7) / 8 | 0;
}, L = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new b(e.subarray(t, n));
}, R = [
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
], z = function(e, t, n) {
	var r = Error(t || R[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, z), !n) throw r;
	return r;
}, B = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new b(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new b(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new b(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = F(e, d, 1);
			var v = F(e, d + 1, 3);
			if (d += 3, !v) {
				var y = oe(d) + 4, x = e[y - 4] | e[y - 3] << 8, S = y + x;
				if (S > i) {
					c && z(0);
					break;
				}
				s && l(f + x), n.set(e.subarray(y, S), f), t.b = f += x, t.p = d = S * 8, t.f = u;
				continue;
			}
			if (v == 1) p = ie, m = ae, h = 9, g = 5;
			else if (v == 2) {
				var w = F(e, d, 31) + 257, T = F(e, d + 10, 15) + 4, E = w + F(e, d + 5, 31) + 1;
				d += 14;
				for (var D = new b(E), O = new b(19), k = 0; k < T; ++k) O[te[k]] = F(e, d + k * 3, 7);
				d += T * 3;
				for (var A = P(O), M = (1 << A) - 1, N = j(O, A, 1), k = 0; k < E;) {
					var R = N[F(e, d, M)];
					d += R & 15;
					var y = R >> 4;
					if (y < 16) D[k++] = y;
					else {
						var B = 0, V = 0;
						for (y == 16 ? (V = 3 + F(e, d, 3), d += 2, B = D[k - 1]) : y == 17 ? (V = 3 + F(e, d, 7), d += 3) : y == 18 && (V = 11 + F(e, d, 127), d += 7); V--;) D[k++] = B;
					}
				}
				var H = D.subarray(0, w), U = D.subarray(w);
				h = P(H), g = P(U), p = j(H, h, 1), m = j(U, g, 1);
			} else z(1);
			if (d > _) {
				c && z(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var W = (1 << h) - 1, se = (1 << g) - 1, G = d;; G = d) {
			var B = p[I(e, d) & W], K = B >> 4;
			if (d += B & 15, d > _) {
				c && z(0);
				break;
			}
			if (B || z(2), K < 256) n[f++] = K;
			else if (K == 256) {
				G = d, p = null;
				break;
			} else {
				var q = K - 254;
				if (K > 264) {
					var k = K - 257, J = ee[k];
					q = F(e, d, (1 << J) - 1) + ne[k], d += J;
				}
				var Y = m[I(e, d) & se], X = Y >> 4;
				Y || z(3), d += Y & 15;
				var U = re[X];
				if (X > 3) {
					var J = C[X];
					U += I(e, d) & (1 << J) - 1, d += J;
				}
				if (d > _) {
					c && z(0);
					break;
				}
				s && l(f + 131072);
				var Z = f + q;
				if (f < U) {
					var Q = a - U, ce = Math.min(U, Z);
					for (Q + f < 0 && z(3); f < ce; ++f) n[f] = r[Q + f];
				}
				for (; f < Z; ++f) n[f] = n[f - U];
			}
		}
		t.l = p, t.p = G, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? L(n, 0, f) : n.subarray(0, f);
}, V = /*#__PURE__*/ new b(0), H = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, U = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, W = function(e, t) {
	return U(e, t) + U(e, t + 4) * 4294967296;
};
function se(e, t) {
	return B(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var G = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	G.decode(V, { stream: !0 });
} catch {}
var K = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: L(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function q(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (G) return G.decode(e);
	var i = K(e), a = i.s, n = i.r;
	return n.length && z(8), a;
}
var J = function(e, t) {
	return t + 30 + H(e, t + 26) + H(e, t + 28);
}, Y = function(e, t, n) {
	var r = H(e, t + 28), i = H(e, t + 30), a = q(e.subarray(t + 46, t + 46 + r), !(H(e, t + 8) & 2048)), o = t + 46 + r, s = X(e, o, i, n, U(e, t + 20), U(e, t + 24), U(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		H(e, t + 10),
		c,
		l,
		a,
		o + i + H(e, t + 32),
		u
	];
}, X = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + H(e, t + 2)) if (H(e, t) == 1) return [
			s ? W(e, t + 4 + 8 * c) : i,
			c ? W(e, t + 4) : a,
			l ? W(e, t + 4 + 8 * (c + s)) : o,
			1
		];
		r < 2 && z(13);
	}
	return [
		i,
		a,
		o,
		0
	];
};
function Z(e, t) {
	for (var n = {}, r = e.length - 22; U(e, r) != 101010256; --r) (!r || e.length - r > 65558) && z(13);
	var i = H(e, r + 8);
	if (!i) return {};
	var a = U(e, r + 16), o = U(e, r - 20) == 117853008;
	if (o) {
		var s = U(e, r - 12);
		o = U(e, s) == 101075792, o && (i = U(e, s + 32), a = U(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = Y(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = J(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = se(e.subarray(_, _ + f), { out: new b(p) }) : z(14, "unknown compression type " + d) : n[m] = L(e, _, _ + f));
	}
	return n;
}
//#endregion
//#region src/check.ts
var Q = "engenty-wizard", ce = "wizard.json", le = "files/", ue = ".wizard", de = "application/vnd.engenty.wizard+zip", $ = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.issues = t;
	}
}, fe = {
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
function pe(e) {
	return fe[e.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";
}
function me(e) {
	try {
		return JSON.parse(q(e));
	} catch {
		throw new $("Das ist kein Wizard-Paket: wizard.json ist kein gültiges JSON.");
	}
}
function he(e) {
	let t = e;
	return t?.format === Q ? t.definition : e;
}
function ge(e) {
	if (e[0] !== 80 || e[1] !== 75) return {
		definition: he(me(e)),
		files: []
	};
	let t;
	try {
		t = Z(e, { filter: (e) => !e.name.endsWith("/") && !e.name.startsWith("__MACOSX/") && !/\/\./.test(e.name) });
	} catch {
		throw new $("Das Wizard-Paket lässt sich nicht öffnen.");
	}
	let n = t[ce];
	if (!n) throw new $("Das ist kein Wizard-Paket: wizard.json fehlt.");
	let r = Object.entries(t).filter(([e]) => e.startsWith(le)).map(([e, t]) => ({
		path: e.slice(6),
		data: t,
		mime: pe(e)
	}));
	return {
		definition: he(me(n)),
		files: r
	};
}
function _e(e) {
	let { definition: t, files: n } = ge(e), i = r(t, n.map((e) => e.path));
	if (!i.ok) throw new $("Dieses Wizard-Paket stammt aus einer neueren Version oder ist beschädigt.", i.issues);
	return {
		definition: i.wizard,
		files: n,
		issues: i.issues,
		fit: g(i.wizard)
	};
}
//#endregion
export { ue as PACKAGE_EXTENSION, de as PACKAGE_MIME, $ as PackageError, _e as checkPackage, pe as mimeOf, ge as readPackage, g as standaloneEntry, m as standaloneFit };

//# sourceMappingURL=check.js.map