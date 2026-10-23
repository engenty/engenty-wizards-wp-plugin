import { n as e } from "./chunks/rolldown-runtime-DtPi1Y-2.js";
import { A as t, D as n, E as r, F as i, M as a, N as o, P as s, T as c, _ as l, a as u, c as d, d as f, g as p, h as m, i as h, j as g, k as _, l as v, n as y, o as b, r as x, s as S, t as C, u as w, w as T, y as E } from "./chunks/i18n-DHKrgXZE.js";
import { Button as D, Card as ee, Dialog as O, IconButton as te, Input as k, Label as A, LinkedText as ne, Segmented as re, Select as ie, Spinner as ae, Swatch as oe, Switch as se, Tabs as ce, Textarea as j, cn as M } from "./ui.js";
import { createContext as le, createElement as ue, forwardRef as de, useContext as fe, useEffect as N, useId as pe, useMemo as me, useRef as P, useState as F, useSyncExternalStore as he } from "react";
import { Fragment as I, jsx as L, jsxs as R } from "react/jsx-runtime";
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var ge = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function _e(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: ge(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var ve = (e) => {
	let t = "", n = !1;
	for (let r of e) {
		if (r === "-" || r === "_" || r <= " ") {
			n = t.length > 0;
			continue;
		}
		t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1;
	}
	return t;
}, ye = (e) => {
	let t = ve(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, be = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), xe = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function Se(e) {
	return e != null;
}
function Ce(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? xe.width, a = e.size ?? e.height ?? xe.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? be(...c) : be("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? xe["stroke-width"]) * Number(e.size ?? e.width ?? xe.width) / Number(t.size ?? t.width ?? xe.width) : t.strokeWidth ?? xe["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(xe).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && Se(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && Se(t.width) && { [r("width")]: t.width },
			..."height" in t && Se(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function we(e, t = {}) {
	return Ce(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var Te = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Ee = le({}), De = () => fe(Ee), Oe = de(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = De() ?? {}, y = !!c || Te(d), [b, x, S = []] = we(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: be(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return ue(b, {
		ref: f,
		...x
	}, [...S.map(([e, t]) => ue(e, t)), ...Array.isArray(c) ? c : [c]]);
});
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function z(e, t = [], n = []) {
	let r = typeof e == "string" ? _e(e, t, n) : e, i = de(({ className: e, ...t }, n) => ue(Oe, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = ye(r.name)), i;
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs
var ke = {
	name: "arrow-down",
	size: 24,
	node: [["path", {
		d: "M12 5v14",
		key: "s699le"
	}], ["path", {
		d: "m19 12-7 7-7-7",
		key: "1idqje"
	}]]
};
ke.node;
var Ae = z(ke), je = {
	name: "arrow-left",
	size: 24,
	node: [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]
};
je.node;
var Me = z(je), Ne = {
	name: "arrow-right",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]
};
Ne.node;
var Pe = z(Ne), Fe = {
	name: "arrow-up",
	size: 24,
	node: [["path", {
		d: "m5 12 7-7 7 7",
		key: "hav0vg"
	}], ["path", {
		d: "M12 19V5",
		key: "x0mq9r"
	}]]
};
Fe.node;
var Ie = z(Fe), Le = {
	name: "bell-ring",
	size: 24,
	node: [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M22 8c0-2.3-.8-4.3-2-6",
			key: "5bb3ad"
		}],
		["path", {
			d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
			key: "11g9vi"
		}],
		["path", {
			d: "M4 2C2.8 3.7 2 5.7 2 8",
			key: "tap9e0"
		}]
	]
};
Le.node;
var Re = z(Le), ze = {
	name: "bell",
	size: 24,
	node: [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]
};
ze.node;
var Be = z(ze), Ve = {
	name: "braces",
	size: 24,
	node: [["path", {
		d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
		key: "ezmyqa"
	}], ["path", {
		d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
		key: "e1hn23"
	}]],
	aliases: ["curly-braces"]
};
Ve.node;
var He = z(Ve), Ue = {
	name: "camera",
	size: 24,
	node: [["path", {
		d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
		key: "18u6gg"
	}], ["circle", {
		cx: "12",
		cy: "13",
		r: "3",
		key: "1vg3eu"
	}]]
};
Ue.node;
var We = z(Ue), Ge = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
Ge.node;
var B = z(Ge), Ke = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
Ke.node;
var qe = z(Ke), Je = {
	name: "clock",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}]]
};
Je.node;
var Ye = z(Je), Xe = {
	name: "copy",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]
};
Xe.node;
var Ze = z(Xe), Qe = {
	name: "corner-down-left",
	size: 24,
	node: [["path", {
		d: "M20 4v7a4 4 0 0 1-4 4H4",
		key: "6o5b7l"
	}], ["path", {
		d: "m9 10-5 5 5 5",
		key: "1kshq7"
	}]]
};
Qe.node;
var $e = z(Qe), et = {
	name: "database",
	size: 24,
	node: [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 21 19V5",
			key: "1wlel7"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 21 12",
			key: "mv7ke4"
		}]
	]
};
et.node;
var tt = z(et), nt = {
	name: "download",
	size: 24,
	node: [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]
};
nt.node;
var V = z(nt), rt = {
	name: "ellipsis-vertical",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "1",
			key: "lyex9k"
		}]
	],
	aliases: ["more-vertical"]
};
rt.node;
var it = z(rt), at = {
	name: "eraser",
	size: 24,
	node: [["path", {
		d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
		key: "g5wo59"
	}], ["path", {
		d: "m5.082 11.09 8.828 8.828",
		key: "1wx5vj"
	}]]
};
at.node;
var ot = z(at), st = {
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
};
st.node;
var ct = z(st), lt = {
	name: "file-headphone",
	size: 24,
	node: [
		["path", {
			d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
			key: "1vfytu"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
			key: "1etmh7"
		}]
	],
	aliases: ["file-audio", "file-audio-2"]
};
lt.node;
var ut = z(lt), dt = {
	name: "file-text",
	size: 24,
	node: [
		["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M10 9H8",
			key: "b1mrlr"
		}],
		["path", {
			d: "M16 13H8",
			key: "t4e002"
		}],
		["path", {
			d: "M16 17H8",
			key: "z1uh3a"
		}]
	]
};
dt.node;
var ft = z(dt), pt = {
	name: "film",
	size: 24,
	node: [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 3v18",
			key: "bbkbws"
		}],
		["path", {
			d: "M3 7.5h4",
			key: "zfgn84"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["path", {
			d: "M3 16.5h4",
			key: "1230mu"
		}],
		["path", {
			d: "M17 3v18",
			key: "in4fa5"
		}],
		["path", {
			d: "M17 7.5h4",
			key: "myr1c1"
		}],
		["path", {
			d: "M17 16.5h4",
			key: "go4c1d"
		}]
	]
};
pt.node;
var mt = z(pt), ht = {
	name: "flashlight-off",
	size: 24,
	node: [
		["path", {
			d: "M11.652 6H18",
			key: "voqkpr"
		}],
		["path", {
			d: "M12 13v1",
			key: "176q98"
		}],
		["path", {
			d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6",
			key: "dzyf92"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007",
			key: "1hvcfn"
		}]
	]
};
ht.node;
var gt = z(ht), _t = {
	name: "flashlight",
	size: 24,
	node: [
		["path", {
			d: "M12 13v1",
			key: "176q98"
		}],
		["path", {
			d: "M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z",
			key: "17vh7j"
		}],
		["path", {
			d: "M6 6h12",
			key: "n6hhss"
		}]
	]
};
_t.node;
var vt = z(_t), yt = {
	name: "grip-vertical",
	size: 24,
	node: [
		["circle", {
			cx: "9",
			cy: "12",
			r: "1",
			key: "1vctgf"
		}],
		["circle", {
			cx: "9",
			cy: "5",
			r: "1",
			key: "hp0tcf"
		}],
		["circle", {
			cx: "9",
			cy: "19",
			r: "1",
			key: "fkjjf6"
		}],
		["circle", {
			cx: "15",
			cy: "12",
			r: "1",
			key: "1tmaij"
		}],
		["circle", {
			cx: "15",
			cy: "5",
			r: "1",
			key: "19l28e"
		}],
		["circle", {
			cx: "15",
			cy: "19",
			r: "1",
			key: "f4zoj3"
		}]
	]
};
yt.node;
var bt = z(yt), xt = {
	name: "image-plus",
	size: 24,
	node: [
		["path", {
			d: "M16 5h6",
			key: "1vod17"
		}],
		["path", {
			d: "M19 2v6",
			key: "4bpg5p"
		}],
		["path", {
			d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
			key: "1ue2ih"
		}],
		["path", {
			d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
			key: "1xmnt7"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]
};
xt.node;
var St = z(xt), Ct = {
	name: "image-up",
	size: 24,
	node: [
		["path", {
			d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
			key: "9csbqa"
		}],
		["path", {
			d: "m14 19.5 3-3 3 3",
			key: "9vmjn0"
		}],
		["path", {
			d: "M17 22v-5.5",
			key: "1aa6fl"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]
};
Ct.node;
var wt = z(Ct), Tt = {
	name: "languages",
	size: 24,
	node: [
		["path", {
			d: "m5 8 6 6",
			key: "1wu5hv"
		}],
		["path", {
			d: "m4 14 6-6 2-3",
			key: "1k1g8d"
		}],
		["path", {
			d: "M2 5h12",
			key: "or177f"
		}],
		["path", {
			d: "M7 2h1",
			key: "1t2jsx"
		}],
		["path", {
			d: "m22 22-5-10-5 10",
			key: "don7ne"
		}],
		["path", {
			d: "M14 18h6",
			key: "1m8k6r"
		}]
	]
};
Tt.node;
var Et = z(Tt), Dt = {
	name: "lightbulb",
	size: 24,
	node: [
		["path", {
			d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
			key: "1gvzjb"
		}],
		["path", {
			d: "M9 18h6",
			key: "x1upvd"
		}],
		["path", {
			d: "M10 22h4",
			key: "ceow96"
		}]
	]
};
Dt.node;
var Ot = z(Dt), kt = {
	name: "link-2",
	size: 24,
	node: [
		["path", {
			d: "M9 17H7A5 5 0 0 1 7 7h2",
			key: "8i5ue5"
		}],
		["path", {
			d: "M15 7h2a5 5 0 1 1 0 10h-2",
			key: "1b9ql8"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}]
	]
};
kt.node;
var At = z(kt), jt = {
	name: "locate-fixed",
	size: 24,
	node: [
		["line", {
			x1: "2",
			x2: "5",
			y1: "12",
			y2: "12",
			key: "bvdh0s"
		}],
		["line", {
			x1: "19",
			x2: "22",
			y1: "12",
			y2: "12",
			key: "1tbv5k"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "2",
			y2: "5",
			key: "11lu5j"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "19",
			y2: "22",
			key: "x3vr5v"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "7",
			key: "fim9np"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}]
	]
};
jt.node;
var Mt = z(jt), Nt = {
	name: "lock-keyhole",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "16",
			r: "1",
			key: "1au0dj"
		}],
		["rect", {
			x: "3",
			y: "10",
			width: "18",
			height: "12",
			rx: "2",
			key: "6s8ecr"
		}],
		["path", {
			d: "M7 10V7a5 5 0 0 1 10 0v3",
			key: "1pqi11"
		}]
	]
};
Nt.node;
var Pt = z(Nt), Ft = {
	name: "map-pin",
	size: 24,
	node: [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]]
};
Ft.node;
var It = z(Ft), Lt = {
	name: "maximize-2",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "m21 3-7 7",
			key: "1l2asr"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M9 21H3v-6",
			key: "wtvkvv"
		}]
	]
};
Lt.node;
var Rt = z(Lt), zt = {
	name: "mic",
	size: 24,
	node: [
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M19 10v2a7 7 0 0 1-14 0v-2",
			key: "1vc78b"
		}],
		["rect", {
			x: "9",
			y: "2",
			width: "6",
			height: "13",
			rx: "3",
			key: "s6n7sd"
		}]
	]
};
zt.node;
var Bt = z(zt), Vt = {
	name: "mouse-pointer-click",
	size: 24,
	node: [
		["path", {
			d: "M14 4.1 12 6",
			key: "ita8i4"
		}],
		["path", {
			d: "m5.1 8-2.9-.8",
			key: "1go3kf"
		}],
		["path", {
			d: "m6 12-1.9 2",
			key: "mnht97"
		}],
		["path", {
			d: "M7.2 2.2 8 5.1",
			key: "1cfko1"
		}],
		["path", {
			d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
			key: "s0h3yz"
		}]
	]
};
Vt.node;
var Ht = z(Vt), Ut = {
	name: "paperclip",
	size: 24,
	node: [["path", {
		d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
		key: "1miecu"
	}]]
};
Ut.node;
var Wt = z(Ut), Gt = {
	name: "pen-line",
	size: 24,
	node: [["path", {
		d: "M13 21h8",
		key: "1jsn5i"
	}], ["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}]],
	aliases: ["edit-3"]
};
Gt.node;
var Kt = z(Gt), qt = {
	name: "pencil-line",
	size: 24,
	node: [
		["path", {
			d: "M13 21h8",
			key: "1jsn5i"
		}],
		["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}],
		["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}]
	]
};
qt.node;
var Jt = z(qt), Yt = {
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
};
Yt.node;
var Xt = z(Yt), Zt = {
	name: "plus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]
};
Zt.node;
var Qt = z(Zt), $t = {
	name: "printer",
	size: 24,
	node: [
		["path", {
			d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
			key: "143wyd"
		}],
		["path", {
			d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
			key: "1itne7"
		}],
		["rect", {
			x: "6",
			y: "14",
			width: "12",
			height: "8",
			rx: "1",
			key: "1ue0tg"
		}]
	]
};
$t.node;
var en = z($t), tn = {
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
};
tn.node;
var nn = z(tn), rn = {
	name: "rotate-ccw",
	size: 24,
	node: [["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}], ["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}]]
};
rn.node;
var an = z(rn), on = {
	name: "scan-line",
	size: 24,
	node: [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}]
	]
};
on.node;
var sn = z(on), cn = {
	name: "share-2",
	size: 24,
	node: [
		["circle", {
			cx: "18",
			cy: "5",
			r: "3",
			key: "gq8acd"
		}],
		["circle", {
			cx: "6",
			cy: "12",
			r: "3",
			key: "w7nqdw"
		}],
		["circle", {
			cx: "18",
			cy: "19",
			r: "3",
			key: "1xt0gg"
		}],
		["line", {
			x1: "8.59",
			x2: "15.42",
			y1: "13.51",
			y2: "17.49",
			key: "47mynk"
		}],
		["line", {
			x1: "15.41",
			x2: "8.59",
			y1: "6.51",
			y2: "10.49",
			key: "1n3mei"
		}]
	]
};
cn.node;
var ln = z(cn), un = {
	name: "share",
	size: 24,
	node: [
		["path", {
			d: "M12 2v13",
			key: "1km8f5"
		}],
		["path", {
			d: "m16 6-4-4-4 4",
			key: "13yo43"
		}],
		["path", {
			d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
			key: "1b2hhj"
		}]
	]
};
un.node;
var dn = z(un), fn = {
	name: "shield-check",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]
};
fn.node;
var pn = z(fn), mn = {
	name: "sparkles",
	size: 24,
	node: [
		["path", {
			d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
			key: "1s2grr"
		}],
		["path", {
			d: "M20 2v4",
			key: "1rf3ol"
		}],
		["path", {
			d: "M22 4h-4",
			key: "gwowj6"
		}],
		["circle", {
			cx: "4",
			cy: "20",
			r: "2",
			key: "6kqj1y"
		}]
	],
	aliases: ["stars"]
};
mn.node;
var hn = z(mn), gn = {
	name: "square",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}]]
};
gn.node;
var _n = z(gn), vn = {
	name: "switch-camera",
	size: 24,
	node: [
		["path", {
			d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5",
			key: "mtk2lu"
		}],
		["path", {
			d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5",
			key: "120jsl"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "m18 22-3-3 3-3",
			key: "kgdoj7"
		}],
		["path", {
			d: "m6 2 3 3-3 3",
			key: "1fnbkv"
		}]
	]
};
vn.node;
var yn = z(vn), bn = {
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
};
bn.node;
var xn = z(bn), Sn = {
	name: "triangle-alert",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle"]
};
Sn.node;
var Cn = z(Sn), wn = {
	name: "unplug",
	size: 24,
	node: [
		["path", {
			d: "m19 5 3-3",
			key: "yk6iyv"
		}],
		["path", {
			d: "m2 22 3-3",
			key: "19mgm9"
		}],
		["path", {
			d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
			key: "goz73y"
		}],
		["path", {
			d: "M7.5 13.5 10 11",
			key: "7xgeeb"
		}],
		["path", {
			d: "M10.5 16.5 13 14",
			key: "10btkg"
		}],
		["path", {
			d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
			key: "1snsnr"
		}]
	]
};
wn.node;
var Tn = z(wn), En = {
	name: "video",
	size: 24,
	node: [["path", {
		d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
		key: "ftymec"
	}], ["rect", {
		x: "2",
		y: "6",
		width: "14",
		height: "12",
		rx: "2",
		key: "158x01"
	}]]
};
En.node;
var Dn = z(En), On = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
On.node;
var kn = z(On), An = class extends Error {
	status;
	body;
	constructor(e, t, n) {
		super(e), this.status = t, this.body = n;
	}
};
function jn(e) {
	return e instanceof An && e.status === 0;
}
function Mn(e) {
	try {
		return JSON.parse(e);
	} catch {
		return { error: e };
	}
}
function Nn(e, t = {}, n) {
	async function r(r, i, a) {
		let o = await fetch(e(i), {
			method: r,
			credentials: "include",
			headers: {
				"accept-language": x,
				...t,
				...a !== void 0 && !(a instanceof FormData) ? { "content-type": "application/json" } : {}
			},
			body: a === void 0 ? void 0 : a instanceof FormData ? a : JSON.stringify(a)
		}).catch(() => {
			throw new An(v("common.offline"), 0, null);
		}), s = await o.text(), c = s ? Mn(s) : null;
		if (!o.ok) throw o.status >= 500 && n?.(`${r} ${i} answered ${o.status}: ${c?.error ?? ""}`), new An(c?.error ?? c?.message ?? o.statusText, o.status, c);
		return c;
	}
	return {
		get: (e) => r("GET", e),
		post: (e, t) => r("POST", e, t ?? {}),
		put: (e, t) => r("PUT", e, t),
		patch: (e, t) => r("PATCH", e, t),
		del: (e) => r("DELETE", e),
		upload: (e, t) => {
			let n = new FormData();
			return n.set("file", t), r("POST", e, n);
		}
	};
}
//#endregion
//#region src/env.ts
var Pn = {
	can: () => !1,
	call: (e) => Promise.reject(/* @__PURE__ */ Error(`the app cannot ${e}`)),
	tell: () => void 0,
	download: () => !1
}, Fn = null;
function In(e) {
	Fn = e, H = Nn(e.withBase, e.headers, e.onServerError), S(e.lang);
}
function Ln() {
	if (!Fn) throw Error("configureRunner() first");
	return Fn;
}
var H = Nn((e) => e), Rn = (e) => Ln().withBase(e), zn = (e) => Ln().asset(e), U = (e) => Ln().runBase(e), Bn = (e) => (Fn?.app ?? Pn).can(e), Vn = (e, t) => (Fn?.app ?? Pn).call(e, t), Hn = (e, t) => (Fn?.app ?? Pn).tell(e, t), Un = (e, t, n) => (Fn?.app ?? Pn).download(e, t, n), Wn = () => Fn?.standalone === !0, Gn = 250;
function Kn({ runId: e, driving: t, caption: n, action: r, hint: i, className: a, onBroken: o }) {
	let s = P(null), c = P(null), [l, u] = F(""), [d, f] = F(!1), [p, m] = F(null), h = async (t) => {
		m(null);
		try {
			await H.post(`${U(e)}/browser/act`, t);
		} catch (e) {
			m(e.message);
		}
	};
	return N(() => {
		t && c.current?.scrollIntoView({
			block: "nearest",
			behavior: "smooth"
		});
	}, [t]), N(() => {
		let n = s.current;
		if (!(n && t)) return;
		let r = 0, i = null, a = (t) => {
			t.preventDefault(), r += t.deltaY, i ??= setTimeout(() => {
				i = null;
				let t = Math.max(-2e3, Math.min(2e3, Math.round(r)));
				r = 0, t && H.post(`${U(e)}/browser/act`, {
					type: "scroll",
					dy: t
				}).catch(() => void 0);
			}, Gn);
		};
		return n.addEventListener("wheel", a, { passive: !1 }), () => {
			n.removeEventListener("wheel", a), i && clearTimeout(i);
		};
	}, [t, e]), /* @__PURE__ */ R("div", {
		className: a,
		children: [/* @__PURE__ */ R("div", {
			className: M("relative aspect-[1280/900] w-full overflow-hidden rounded-xl bg-paper-2 ring-1", t ? "ring-2 ring-ember" : "ring-border-soft"),
			children: [
				/* @__PURE__ */ L("img", {
					ref: s,
					src: Rn(`${U(e)}/browser/live`),
					alt: "",
					draggable: !1,
					onClick: (e) => {
						if (!t) return;
						let n = e.currentTarget.getBoundingClientRect();
						h({
							type: "click",
							fx: Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)),
							fy: Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))
						});
					},
					onError: o,
					className: M("size-full object-cover object-top", t && "cursor-pointer")
				}),
				r ? /* @__PURE__ */ L("div", {
					className: "absolute top-2 right-2",
					children: r
				}) : null,
				n && !t ? /* @__PURE__ */ R("div", {
					className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/75 to-transparent px-3 pt-8 pb-2 text-[0.8125rem] text-white",
					children: [/* @__PURE__ */ L(Ht, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ L("span", {
						className: "truncate",
						children: n
					})]
				}) : null
			]
		}), t ? /* @__PURE__ */ R("div", {
			ref: c,
			className: "mt-1.5",
			children: [
				i ? /* @__PURE__ */ L("p", {
					className: "mb-1.5 text-[0.8125rem] text-ink-3",
					children: i
				}) : null,
				/* @__PURE__ */ R("div", {
					className: "flex flex-wrap items-center gap-1.5 rounded-xl bg-card p-2 ring-1 ring-border-soft",
					children: [
						/* @__PURE__ */ L(k, {
							type: d ? "password" : "text",
							autoComplete: "off",
							value: l,
							placeholder: v("ask.typeInto"),
							onChange: (e) => u(e.target.value),
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), h({
									type: "type",
									text: l
								}).then(() => u("")));
							},
							autoCapitalize: "off",
							autoCorrect: "off",
							spellCheck: !1,
							enterKeyHint: "send",
							className: "h-9 min-w-[9rem] flex-1 basis-full text-[0.8125rem] sm:basis-0 coarse:h-11"
						}),
						/* @__PURE__ */ L("button", {
							type: "button",
							onClick: () => f((e) => !e),
							className: M("h-9 shrink-0 rounded-md px-2.5 text-[0.75rem] coarse:h-11 coarse:px-3.5", d ? "bg-ember-veil text-ink" : "text-ink-3 hover:bg-paper-2"),
							children: v("ask.hide")
						}),
						/* @__PURE__ */ L(qn, {
							label: "Enter",
							onClick: () => void h({
								type: "key",
								key: "Enter"
							}),
							children: /* @__PURE__ */ L($e, { className: "size-4" })
						}),
						/* @__PURE__ */ L(qn, {
							label: v("ask.up"),
							onClick: () => void h({
								type: "scroll",
								dy: -500
							}),
							children: /* @__PURE__ */ L(Ie, { className: "size-4" })
						}),
						/* @__PURE__ */ L(qn, {
							label: v("ask.down"),
							onClick: () => void h({
								type: "scroll",
								dy: 500
							}),
							children: /* @__PURE__ */ L(Ae, { className: "size-4" })
						})
					]
				}),
				p ? /* @__PURE__ */ L("p", {
					className: "mt-1.5 text-[0.8125rem] text-rose",
					children: p
				}) : null
			]
		}) : null]
	});
}
function qn({ label: e, onClick: t, children: n }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		"aria-label": e,
		title: e,
		onClick: t,
		className: "flex size-9 shrink-0 items-center justify-center rounded-md text-ink-3 hover:bg-paper-2 hover:text-ink coarse:size-11",
		children: n
	});
}
//#endregion
//#region src/AskPanel.tsx
function Jn({ runId: e, ask: t }) {
	return t.kind === "confirm" ? /* @__PURE__ */ L(Yn, {
		runId: e,
		ask: t
	}) : /* @__PURE__ */ L(Xn, {
		runId: e,
		ask: t
	});
}
function Yn({ runId: e, ask: t }) {
	let [n, r] = F(!1), [i, a] = F(!1), [o, s] = F(null), c = async (n) => {
		a(!0), s(null);
		try {
			await H.post(`${U(e)}/ask/${t.id}`, n);
		} catch (e) {
			s(e.message), a(!1);
		}
	}, l = t.action.destructive ? Cn : Jt;
	return /* @__PURE__ */ R("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ R("div", {
				className: "mb-5 flex items-start gap-3",
				children: [/* @__PURE__ */ L("div", {
					className: M("flex size-10 shrink-0 items-center justify-center rounded-full", t.action.destructive ? "bg-rose-tint text-rose" : "bg-ember-tint text-ember-strong"),
					children: /* @__PURE__ */ L(l, { className: "size-5" })
				}), /* @__PURE__ */ R("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ L("p", {
						className: "text-[0.8125rem] text-ink-3",
						children: v("ask.wants", { service: t.service })
					}), /* @__PURE__ */ L("h2", {
						className: "wizard-heading font-display font-semibold text-[1.25rem] leading-snug tracking-tight",
						children: t.reason
					})]
				})]
			}),
			/* @__PURE__ */ L("pre", {
				className: "max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-paper-2 p-4 text-[0.8125rem] leading-relaxed ring-1 ring-border-soft",
				children: t.input
			}),
			t.once ? null : /* @__PURE__ */ R("div", {
				className: "mt-5 flex items-center gap-4",
				children: [/* @__PURE__ */ L(se, {
					checked: n,
					onChange: r,
					label: v("ask.allowRest")
				}), /* @__PURE__ */ L("span", {
					className: "flex-1 text-[0.8125rem] text-ink-2",
					children: v("ask.allowRest")
				})]
			}),
			o ? /* @__PURE__ */ L("div", {
				className: "mt-3 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
				children: o
			}) : null,
			/* @__PURE__ */ R("div", {
				className: "action-bar mt-6 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ L(D, {
					variant: "ghost",
					disabled: i,
					onClick: () => void c({ type: "skip" }),
					children: v("ask.deny")
				}), /* @__PURE__ */ L(D, {
					busy: i,
					onClick: () => void c({
						type: "done",
						remember: n
					}),
					children: v("ask.allow")
				})]
			})
		]
	});
}
function Xn({ runId: e, ask: t }) {
	let [n, r] = F({}), [i, a] = F(!1), [o, s] = F(!1), [c, l] = F(null), u = async (n) => {
		s(!0), l(null);
		try {
			await H.post(`${U(e)}/ask/${t.id}`, n);
		} catch (e) {
			l(e.message), s(!1);
		}
	}, d = t.fields.some((e) => n[e.id]);
	return /* @__PURE__ */ R("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ R("div", {
				className: "mb-5 flex items-start gap-3",
				children: [/* @__PURE__ */ L("div", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember-strong",
					children: /* @__PURE__ */ L(Pt, { className: "size-5" })
				}), /* @__PURE__ */ R("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ L("h2", {
						className: "wizard-heading font-display font-semibold text-[1.25rem] leading-snug tracking-tight",
						children: t.reason
					}), /* @__PURE__ */ R("p", {
						className: "mt-0.5 truncate text-[0.8125rem] text-ink-3",
						children: [t.site.host, t.site.title ? ` · ${t.site.title}` : ""]
					})]
				})]
			}),
			/* @__PURE__ */ L(Kn, {
				runId: e,
				driving: !0
			}),
			/* @__PURE__ */ L("p", {
				className: "mt-2 text-[0.75rem] text-ink-4",
				children: v("ask.pictureHint")
			}),
			t.fields.length ? /* @__PURE__ */ R("form", {
				className: "mt-5 flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault(), u({
						type: "fill",
						values: n,
						remember: i
					});
				},
				children: [t.fields.map((e, i) => /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ L(A, { children: e.label }), /* @__PURE__ */ L(k, {
					autoFocus: i === 0,
					type: e.secret ? "password" : "text",
					autoComplete: "off",
					autoCapitalize: "off",
					autoCorrect: "off",
					spellCheck: !1,
					enterKeyHint: i === t.fields.length - 1 ? "go" : "next",
					value: n[e.id] ?? "",
					onChange: (t) => r((n) => ({
						...n,
						[e.id]: t.target.value
					}))
				})] }, e.id)), /* @__PURE__ */ L("button", {
					type: "submit",
					hidden: !0
				})]
			}) : null,
			/* @__PURE__ */ R("div", {
				className: "mt-5 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ L(se, {
					checked: i,
					onChange: a,
					label: v("ask.remember")
				}), /* @__PURE__ */ L("span", {
					className: "flex-1 text-[0.8125rem] text-ink-2",
					children: v("ask.remember")
				})]
			}),
			/* @__PURE__ */ R("p", {
				className: "mt-3 flex items-start gap-2 text-[0.8125rem] text-ink-3",
				children: [
					/* @__PURE__ */ L(pn, { className: "mt-0.5 size-4 shrink-0 text-moss" }),
					" ",
					v("ask.private")
				]
			}),
			c ? /* @__PURE__ */ L("div", {
				className: "mt-3 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
				children: c
			}) : null,
			/* @__PURE__ */ R("div", {
				className: "action-bar mt-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ L(D, {
					variant: "ghost",
					disabled: o,
					onClick: () => void u({ type: "skip" }),
					children: v("ask.skip")
				}), /* @__PURE__ */ R("div", {
					className: "flex flex-wrap gap-2",
					children: [t.fields.length ? /* @__PURE__ */ L(D, {
						variant: "secondary",
						disabled: o,
						onClick: () => void u({
							type: "done",
							remember: i
						}),
						children: v("ask.done")
					}) : null, t.fields.length ? /* @__PURE__ */ L(D, {
						busy: o,
						disabled: !d,
						onClick: () => void u({
							type: "fill",
							values: n,
							remember: i
						}),
						children: v("ask.signIn")
					}) : /* @__PURE__ */ L(D, {
						busy: o,
						onClick: () => void u({
							type: "done",
							remember: i
						}),
						children: v("ask.done")
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/device.ts
var Zn = typeof window < "u" && window.matchMedia?.("(pointer: coarse)").matches === !0, Qn = typeof navigator < "u" && !!navigator.mediaDevices?.getUserMedia;
function $n() {
	N(() => {
		let e = window.visualViewport;
		if (!e) return;
		let t = document.documentElement, n = () => {
			let e = document.activeElement;
			t.classList.contains("keyboard-open") && e instanceof HTMLElement && e !== document.body && requestAnimationFrame(() => e.scrollIntoView({ block: "nearest" }));
		}, r = () => {
			let r = e.scale > 1.01 ? 0 : window.innerHeight - e.height - e.offsetTop, i = r > 80, a = i && !t.classList.contains("keyboard-open");
			t.style.setProperty("--kb", i ? `${Math.round(r)}px` : "0px"), t.classList.toggle("keyboard-open", i), a && n();
		};
		return r(), e.addEventListener("resize", r), e.addEventListener("scroll", r), document.addEventListener("focusin", n), () => {
			e.removeEventListener("resize", r), e.removeEventListener("scroll", r), document.removeEventListener("focusin", n), t.style.removeProperty("--kb"), t.classList.remove("keyboard-open");
		};
	}, []);
}
function er(e) {
	let [t, n] = F(!1);
	return N(() => {
		if (e && Bn("keepAwake")) return Hn("keepAwake", !0), n(!0), () => {
			Hn("keepAwake", !1), n(!1);
		};
		if (!e || !("wakeLock" in navigator)) return;
		let t = null, r = !1, i = async () => {
			if (!(r || t || document.visibilityState !== "visible")) try {
				let e = await navigator.wakeLock.request("screen");
				if (r) {
					e.release().catch(() => void 0);
					return;
				}
				t = e, n(!0), e.addEventListener("release", () => {
					t === e && (t = null, n(!1));
				});
			} catch {}
		};
		return i(), document.addEventListener("visibilitychange", i), () => {
			r = !0, document.removeEventListener("visibilitychange", i), t?.release().catch(() => void 0), t = null, n(!1);
		};
	}, [e]), t;
}
var tr = "wz.notify", nr = /* @__PURE__ */ new Set(), rr = null;
function ir() {
	try {
		return localStorage.getItem(tr) === "1";
	} catch {
		return !1;
	}
}
function ar(e) {
	try {
		e ? localStorage.setItem(tr, "1") : localStorage.removeItem(tr);
	} catch {}
	for (let e of nr) e();
}
var or = typeof window < "u" && "Notification" in window, sr = null;
function cr() {
	return ir() ? Bn("notify") ? sr === !1 ? "quiet" : "on" : or && Notification.permission === "granted" ? "on" : "quiet" : "off";
}
function lr() {
	return he((e) => (nr.add(e), () => nr.delete(e)), cr, () => "off");
}
function ur() {
	return Bn("notify") ? sr === !1 : or && Notification.permission === "denied";
}
async function dr() {
	if (ar(!0), Bn("notify")) {
		sr = !Bn("notifyPermission") || await Vn("notifyPermission").catch(() => !1);
		for (let e of nr) e();
		return cr();
	}
	try {
		rr ??= new AudioContext(), rr.resume();
	} catch {
		rr = null;
	}
	if (or && Notification.permission === "default") try {
		await Notification.requestPermission();
	} catch {}
	if (or && Notification.permission === "granted") {
		let e = Ln().serviceWorker;
		e && await navigator.serviceWorker?.register(e).catch(() => void 0);
	}
	for (let e of nr) e();
	return cr();
}
function fr() {
	ar(!1);
}
function pr() {
	let e = rr;
	if (e?.state !== "running") return;
	let t = e.currentTime;
	for (let [n, r] of [660, 880].entries()) {
		let i = e.createOscillator(), a = e.createGain();
		i.frequency.value = r, a.gain.setValueAtTime(0, t + n * .16), a.gain.linearRampToValueAtTime(.18, t + n * .16 + .02), a.gain.exponentialRampToValueAtTime(.001, t + n * .16 + .32), i.connect(a).connect(e.destination), i.start(t + n * .16), i.stop(t + n * .16 + .34);
	}
}
async function mr(e) {
	if (!ir()) return;
	if (Bn("notify")) {
		Hn("notify", e);
		return;
	}
	if (document.visibilityState === "visible") {
		pr(), navigator.vibrate?.([
			120,
			60,
			120
		]);
		return;
	}
	if (!or || Notification.permission !== "granted") return;
	let t = {
		body: e.body,
		tag: e.tag,
		icon: zn("icons/icon-192.png"),
		badge: zn("icons/icon-192.png"),
		data: { url: location.href }
	};
	try {
		let n = await navigator.serviceWorker?.getRegistration();
		if (n?.active) {
			await n.showNotification(e.title, t);
			return;
		}
	} catch {}
	try {
		new Notification(e.title, t);
	} catch {}
}
function hr() {
	if (typeof navigator > "u" || !navigator.canShare) return !1;
	try {
		return navigator.canShare({ files: [new File(["x"], "x.pdf", { type: "application/pdf" })] });
	} catch {
		return !1;
	}
}
//#endregion
//#region src/camera.tsx
async function gr(e, t = 2400) {
	if (!/^image\/(jpeg|png|webp)$/.test(e.type) || e.size < 12e5) return e;
	try {
		let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = document.createElement("canvas");
		i.width = Math.round(n.width * r), i.height = Math.round(n.height * r), i.getContext("2d")?.drawImage(n, 0, 0, i.width, i.height);
		let a = await new Promise((e) => i.toBlob(e, "image/jpeg", .86));
		return a && a.size < e.size ? new File([a], `${e.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg" }) : e;
	} catch {
		return e;
	}
}
function _r() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-");
}
function vr(e) {
	let t = e?.name;
	return t === "NotFoundError" || t === "OverconstrainedError" ? "missing" : t === "NotReadableError" || t === "AbortError" ? "busy" : "denied";
}
function yr(e) {
	return !!e?.getCapabilities?.()?.torch;
}
function br(e, t, n = !1) {
	let r = P(null), [i, a] = F(null), [o, s] = F(null), [c, l] = F(1), [u, d] = F(!1), [f, p] = F(!1);
	return N(() => {
		if (!e) return;
		let r = null, i = !1;
		s(null), a(null), d(!1), p(!1);
		let o = {
			facingMode: { ideal: t },
			width: { ideal: 2560 },
			height: { ideal: 1440 }
		};
		return (async () => {
			if (!navigator.mediaDevices?.getUserMedia) throw new DOMException("no camera api", "NotAllowedError");
			try {
				r = await navigator.mediaDevices.getUserMedia({
					video: o,
					audio: n
				});
			} catch (e) {
				if (!n) throw e;
				r = await navigator.mediaDevices.getUserMedia({ video: o });
			}
			if (i) {
				for (let e of r.getTracks()) e.stop();
				return;
			}
			a(r);
			let e = r.getVideoTracks()[0], t = () => !i && d(yr(e));
			t(), setTimeout(t, 600);
			let s = await navigator.mediaDevices.enumerateDevices().catch(() => []);
			i || l(s.filter((e) => e.kind === "videoinput").length);
		})().catch((e) => !i && s(vr(e))), () => {
			i = !0;
			for (let e of r?.getTracks() ?? []) e.stop();
		};
	}, [
		e,
		t,
		n
	]), N(() => {
		r.current && i && (r.current.srcObject = i);
	}, [i]), {
		video: r,
		stream: i,
		error: o,
		cameras: c,
		torchable: u,
		torch: f,
		setTorch: async (e) => {
			let t = i?.getVideoTracks()[0];
			try {
				await t?.applyConstraints({ advanced: [{ torch: e }] }), p(e);
			} catch {
				d(!1);
			}
		},
		mirrored: i?.getVideoTracks()[0]?.getSettings().facingMode === "user"
	};
}
function xr({ open: e, onClose: t, label: n, children: r }) {
	let i = P(null);
	return N(() => {
		let t = i.current;
		t && (e && !t.open ? t.showModal() : !e && t.open && t.close());
	}, [e]), /* @__PURE__ */ L("dialog", {
		ref: i,
		onClose: t,
		"aria-label": n,
		className: "media-sheet",
		children: e ? /* @__PURE__ */ L("div", {
			className: "flex h-full flex-col",
			children: r
		}) : null
	});
}
function Sr({ label: e, onClick: t, active: n, children: r }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"aria-pressed": n,
		onClick: t,
		className: M("flex size-11 shrink-0 items-center justify-center rounded-full transition", n ? "bg-white text-black" : "bg-white/12 text-white hover:bg-white/20"),
		children: r
	});
}
function Cr({ title: e, onClose: t, camera: n, onFlip: r }) {
	return /* @__PURE__ */ L("div", {
		className: "safe-top",
		children: /* @__PURE__ */ R("div", {
			className: "flex items-center gap-2 px-3 py-2",
			children: [
				/* @__PURE__ */ L(Sr, {
					label: v("common.close"),
					onClick: t,
					children: /* @__PURE__ */ L(kn, { className: "size-5" })
				}),
				/* @__PURE__ */ L("div", {
					className: "min-w-0 flex-1 truncate text-center font-medium text-[0.9375rem]",
					children: e
				}),
				n.torchable ? /* @__PURE__ */ L(Sr, {
					label: v("camera.torch"),
					active: n.torch,
					onClick: () => void n.setTorch(!n.torch),
					children: n.torch ? /* @__PURE__ */ L(vt, { className: "size-5" }) : /* @__PURE__ */ L(gt, { className: "size-5" })
				}) : null,
				n.stream && (n.cameras > 1 || Zn) ? /* @__PURE__ */ L(Sr, {
					label: v("camera.flip"),
					onClick: r,
					children: /* @__PURE__ */ L(yn, { className: "size-5" })
				}) : /* @__PURE__ */ L("span", { className: "size-11" })
			]
		})
	});
}
function wr({ camera: e, asking: t, children: n, actions: r }) {
	return /* @__PURE__ */ R("div", {
		className: "relative min-h-0 flex-1 overflow-hidden",
		children: [/* @__PURE__ */ L("video", {
			ref: e.video,
			autoPlay: !0,
			playsInline: !0,
			muted: !0,
			className: M("absolute inset-0 size-full object-contain", e.mirrored && "-scale-x-100")
		}), e.error ? /* @__PURE__ */ R("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black px-8 text-center",
			children: [/* @__PURE__ */ L("p", {
				className: "max-w-sm text-[0.9375rem] text-white/85 leading-relaxed",
				children: v(`camera.${e.error}`)
			}), r]
		}) : e.stream ? n : /* @__PURE__ */ R("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-white/75",
			children: [/* @__PURE__ */ L(ae, {}), /* @__PURE__ */ L("p", {
				className: "max-w-xs text-[0.875rem] leading-relaxed",
				children: t
			})]
		})]
	});
}
var Tr = 30;
function Er() {
	if (typeof MediaRecorder < "u") return [
		"video/mp4;codecs=avc1.42E01E,mp4a.40.2",
		"video/mp4",
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm"
	].find((e) => MediaRecorder.isTypeSupported(e));
}
var Dr = !!Er();
function Or({ open: e, multiple: t, video: n, onClose: r, onCapture: i, onNative: a }) {
	let [o, s] = F("environment"), [c, l] = F("photo"), [u, d] = F(0), [f, p] = F(!1), [m, h] = F(null), g = P(null), _ = br(e, o, c === "video");
	N(() => {
		e && (d(0), l("photo"), h(null));
	}, [e]);
	let y = async (e) => {
		p(!0);
		try {
			await i(e), d((e) => e + 1), t || r();
		} finally {
			p(!1);
		}
	}, b = async () => {
		let e = _.video.current;
		if (!e?.videoWidth) return;
		let t = document.createElement("canvas");
		t.width = e.videoWidth, t.height = e.videoHeight, t.getContext("2d")?.drawImage(e, 0, 0);
		let n = await new Promise((e) => t.toBlob(e, "image/jpeg", .9));
		n && await y(new File([n], `foto-${_r()}.jpg`, { type: "image/jpeg" }));
	}, x = () => {
		g.current?.state === "recording" && g.current.stop();
	}, S = () => {
		let e = Er();
		if (!_.stream || !e) return;
		let t = [], n = new MediaRecorder(_.stream, {
			mimeType: e,
			videoBitsPerSecond: 25e5,
			audioBitsPerSecond: 96e3
		});
		n.ondataavailable = (e) => e.data.size && t.push(e.data), n.onstop = () => {
			h(null), g.current = null;
			let n = e.split(";")[0];
			if (t.length) {
				let e = n === "video/mp4" ? "mp4" : "webm";
				y(new File(t, `video-${_r()}.${e}`, { type: n }));
			}
		}, g.current = n, n.start(1e3), h(0);
	};
	N(() => {
		if (m === null) return;
		if (m >= Tr) {
			g.current?.state === "recording" && g.current.stop();
			return;
		}
		let e = setTimeout(() => h((e) => e === null ? null : e + 1), 1e3);
		return () => clearTimeout(e);
	}, [m]), N(() => {
		!e && g.current && (g.current.onstop = null, g.current.stop(), g.current = null);
	}, [e]);
	let C = (e) => `0:${String(e).padStart(2, "0")}`;
	return /* @__PURE__ */ R(xr, {
		open: e,
		onClose: r,
		label: v("camera.title"),
		children: [
			/* @__PURE__ */ L(Cr, {
				title: m === null ? u ? v("camera.taken", { n: u }) : v("camera.title") : `${C(m)} / ${C(Tr)}`,
				onClose: r,
				camera: _,
				onFlip: () => s((e) => e === "environment" ? "user" : "environment")
			}),
			/* @__PURE__ */ L(wr, {
				camera: _,
				asking: v("camera.asking"),
				actions: /* @__PURE__ */ R("div", {
					className: "flex flex-col gap-2",
					children: [a ? /* @__PURE__ */ R(kr, {
						onClick: () => {
							r(), a();
						},
						children: [
							/* @__PURE__ */ L(We, { className: "size-4" }),
							" ",
							v(Zn ? "camera.native" : "camera.pick")
						]
					}) : null, /* @__PURE__ */ L(kr, {
						quiet: !0,
						onClick: r,
						children: v("common.close")
					})]
				})
			}),
			/* @__PURE__ */ R("div", {
				className: M("safe-bottom px-4 pt-3", _.error && "invisible"),
				children: [n && Dr && m === null ? /* @__PURE__ */ L("div", {
					className: "mb-3 flex justify-center gap-1 text-[0.8125rem]",
					children: ["photo", "video"].map((e) => /* @__PURE__ */ L("button", {
						type: "button",
						"aria-pressed": c === e,
						onClick: () => l(e),
						className: M("h-9 rounded-full px-4 font-medium transition", c === e ? "bg-white text-black" : "text-white/70 hover:text-white"),
						children: v(e === "photo" ? "camera.photo" : "camera.video")
					}, e))
				}) : null, /* @__PURE__ */ R("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
					children: [
						/* @__PURE__ */ L("span", {
							className: "text-[0.8125rem] text-white/70 leading-snug",
							children: m === null ? c === "video" ? v("camera.clipHint", { s: Tr }) : v(t ? "camera.hintMany" : "camera.hint") : v("camera.recording")
						}),
						/* @__PURE__ */ L("button", {
							type: "button",
							"aria-label": v(c === "photo" ? "camera.shoot" : m === null ? "camera.record" : "camera.stop"),
							disabled: !_.stream || f,
							onClick: () => c === "photo" ? void b() : m === null ? S() : x(),
							className: "flex size-[72px] items-center justify-center rounded-full border-4 border-white transition active:scale-95 disabled:opacity-40",
							children: f ? /* @__PURE__ */ L(ae, { className: "text-white" }) : c === "photo" ? /* @__PURE__ */ L("span", { className: "size-[54px] rounded-full bg-white" }) : m === null ? /* @__PURE__ */ L("span", {
								className: "flex size-[54px] items-center justify-center rounded-full bg-[#e5484d]",
								children: /* @__PURE__ */ L(Dn, { className: "size-6 text-white" })
							}) : /* @__PURE__ */ L("span", { className: "size-7 rounded-md bg-[#e5484d]" })
						}),
						/* @__PURE__ */ L("div", {
							className: "flex justify-end",
							children: t && u && m === null ? /* @__PURE__ */ R(kr, {
								onClick: r,
								children: [
									/* @__PURE__ */ L(B, { className: "size-4" }),
									" ",
									v("camera.done")
								]
							}) : null
						})
					]
				})]
			})
		]
	});
}
function kr({ onClick: e, quiet: t, children: n }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: e,
		className: M("inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-medium text-[0.875rem] transition", t ? "text-white/75 hover:text-white" : "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/data.tsx
var Ar = "w-full min-w-0 rounded-md bg-transparent px-2 py-1.5 text-[0.875rem] outline-none transition placeholder:text-ink-4 hover:bg-accent focus:bg-paper focus:ring-1 focus:ring-ring", jr = "font-medium text-[0.6875rem] text-ink-3 uppercase tracking-[0.08em]", Mr = (e) => !!e && typeof e == "object" && !Array.isArray(e);
function Nr(e, t, n) {
	if (!t.length) return n;
	let [r, ...i] = t;
	if (Array.isArray(e)) {
		let t = [...e];
		return t[r] = Nr(t[r], i, n), t;
	}
	let a = e ?? {};
	return {
		...a,
		[r]: Nr(a[r], i, n)
	};
}
function Pr(e, t) {
	let n = e?.length ? e : [...new Set(t.filter(Mr).flatMap((e) => Object.keys(e)))];
	return {
		kind: "object",
		fields: Object.fromEntries(n.map((e) => [e, { kind: "text" }]))
	};
}
var Fr = (e) => e.kind !== "object" && e.kind !== "table" && (e.kind !== "list" || e.of.kind !== "object") && !(e.kind === "text" && e.long), Ir = (e) => Object.values(e.fields).every(Fr), Lr = (e) => Object.values(e.fields).every((e) => e.kind !== "table" && (e.kind !== "list" || e.of.kind !== "object"));
function Rr(e, t) {
	let n = o(e);
	return n ? String(t[n] ?? "") : "";
}
function zr({ text: e }) {
	return /* @__PURE__ */ L("span", {
		className: "whitespace-pre-wrap",
		children: e
	});
}
function Br({ shape: e, value: t, path: n, ctx: r, cell: i }) {
	switch (e.kind) {
		case "text": return r.edit ? e.long ? /* @__PURE__ */ L("textarea", {
			className: M(Ar, "field-sizing-content max-h-60 resize-none"),
			value: String(t ?? ""),
			onChange: (e) => r.set(n, e.target.value)
		}) : /* @__PURE__ */ L("input", {
			className: Ar,
			value: String(t ?? ""),
			onChange: (e) => r.set(n, e.target.value)
		}) : /* @__PURE__ */ L(zr, { text: t == null ? "" : String(t) });
		case "number": return r.edit ? /* @__PURE__ */ R("span", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ L("input", {
				type: "number",
				className: M(Ar, "text-right tabular-nums", i && "w-20"),
				value: t == null ? "" : Number(t),
				onChange: (e) => r.set(n, e.target.value === "" ? null : Number(e.target.value))
			}), e.unit ? /* @__PURE__ */ L("span", {
				className: "text-[0.8125rem] text-ink-3",
				children: e.unit
			}) : null]
		}) : /* @__PURE__ */ L("span", {
			className: "tabular-nums",
			children: t == null ? "" : `${t}${e.unit ? ` ${e.unit}` : ""}`
		});
		case "yesno": {
			let i = t ? e.yes ?? v("data.yes") : e.no ?? v("data.no");
			return r.edit ? /* @__PURE__ */ R("label", {
				className: "flex items-center gap-2 px-2 py-1.5 text-[0.8125rem] text-ink-2",
				children: [/* @__PURE__ */ L("input", {
					type: "checkbox",
					checked: !!t,
					onChange: (e) => r.set(n, e.target.checked),
					className: "size-4 accent-[var(--second)]"
				}), i]
			}) : /* @__PURE__ */ L("span", {
				className: M("inline-flex rounded-full px-2 py-0.5 text-[0.75rem]", t ? "bg-second-tint text-second" : "bg-paper-2 text-ink-3"),
				children: i
			});
		}
		case "choice":
		case "score": return r.edit ? /* @__PURE__ */ L("select", {
			className: Ar,
			value: String(t ?? ""),
			onChange: (e) => r.set(n, e.target.value),
			children: [.../* @__PURE__ */ new Set([String(t ?? ""), ...e.options])].map((e) => /* @__PURE__ */ L("option", {
				value: e,
				children: e
			}, e))
		}) : /* @__PURE__ */ L("span", { children: String(t ?? "") });
		case "ref": {
			let i = r.shape.fields[e.to], a = i?.kind === "list" && i.of.kind === "object" ? i.of : {
				kind: "object",
				fields: {}
			}, o = (Array.isArray(r.root[e.to]) ? r.root[e.to] : []).filter(Mr), s = o.find((e) => e.id === t);
			return r.edit ? /* @__PURE__ */ R("select", {
				className: Ar,
				value: String(t ?? ""),
				onChange: (e) => r.set(n, e.target.value),
				children: [s ? null : /* @__PURE__ */ L("option", {
					value: String(t ?? ""),
					children: String(t ?? "")
				}), o.map((e) => /* @__PURE__ */ L("option", {
					value: String(e.id),
					children: Rr(a, e) || String(e.id)
				}, String(e.id)))]
			}) : s ? /* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => r.open(String(s.id)),
				className: "inline-flex items-center gap-1 text-left text-ember-strong hover:underline",
				children: [/* @__PURE__ */ L(At, { className: "size-3.5 shrink-0" }), Rr(a, s) || String(s.id)]
			}) : /* @__PURE__ */ L("span", {
				className: "text-rose",
				children: v("data.missing", { id: String(t ?? "") })
			});
		}
		case "table": {
			let i = Array.isArray(t) ? t : [];
			return /* @__PURE__ */ L(Wr, {
				shape: Pr(e.columns, i),
				value: i,
				path: n,
				ctx: r
			});
		}
		case "list":
			if (e.of.kind === "object") {
				let i = e.of, a = Ir(i) ? Wr : Lr(i) ? Gr : Kr;
				return /* @__PURE__ */ L(a, {
					shape: i,
					value: t,
					path: n,
					ctx: r
				});
			}
			return /* @__PURE__ */ L(Vr, {
				value: t,
				path: n,
				ctx: r
			});
		case "object": return /* @__PURE__ */ L(qr, {
			shape: e,
			value: t,
			path: n,
			ctx: r
		});
	}
}
function Vr({ value: e, path: t, ctx: n }) {
	let r = Array.isArray(e) ? e.map(String) : [], [i, a] = F("");
	return /* @__PURE__ */ R("span", {
		className: "flex flex-wrap items-center gap-1",
		children: [r.map((e, i) => /* @__PURE__ */ R("span", {
			className: "inline-flex items-center gap-1 rounded-full bg-paper-2 px-2 py-0.5 text-[0.75rem]",
			children: [e, n.edit ? /* @__PURE__ */ L("button", {
				type: "button",
				"aria-label": v("data.remove"),
				onClick: () => n.set(t, r.filter((e, t) => t !== i)),
				className: "text-ink-3 hover:text-ink",
				children: /* @__PURE__ */ L(kn, { className: "size-3" })
			}) : null]
		}, `${e}-${i}`)), n.edit ? /* @__PURE__ */ L("input", {
			className: "w-20 rounded-full bg-transparent px-2 py-0.5 text-[0.75rem] outline-none ring-1 ring-border-soft focus:ring-ring",
			placeholder: "+",
			value: i,
			onChange: (e) => a(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && i.trim() && (e.preventDefault(), n.set(t, [...r, i.trim()]), a(""));
			}
		}) : null]
	});
}
var Hr = (e) => (Array.isArray(e) ? e : []).filter(Mr), Ur = (e) => e.fields.id ? { id: `n${Date.now().toString(36)}` } : {};
function Wr({ shape: e, value: t, path: n, ctx: r }) {
	let i = Hr(t), a = Object.entries(e.fields);
	return /* @__PURE__ */ R("div", {
		className: "overflow-x-auto rounded-lg ring-1 ring-border-soft",
		children: [/* @__PURE__ */ R("table", {
			className: "w-full border-collapse text-[0.8125rem]",
			children: [/* @__PURE__ */ L("thead", {
				className: "bg-paper-2 text-ink-2",
				children: /* @__PURE__ */ R("tr", { children: [a.map(([e, t]) => /* @__PURE__ */ L("th", {
					className: "whitespace-nowrap px-3 py-2 text-left font-medium",
					children: g(e, t)
				}, e)), r.edit ? /* @__PURE__ */ L("th", { className: "w-8" }) : null] })
			}), /* @__PURE__ */ L("tbody", { children: i.map((e, t) => /* @__PURE__ */ R("tr", {
				className: "group border-border-soft border-t",
				children: [a.map(([i, a]) => /* @__PURE__ */ L("td", {
					className: M("align-top", r.edit ? "p-0.5" : "px-3 py-2"),
					children: /* @__PURE__ */ L(Br, {
						shape: a,
						value: e[i],
						path: [
							...n,
							t,
							i
						],
						ctx: r,
						cell: !0
					})
				}, i)), r.edit ? /* @__PURE__ */ L("td", {
					className: "p-0.5 align-middle",
					children: /* @__PURE__ */ L(Yr, { onClick: () => r.set(n, i.filter((e, n) => n !== t)) })
				}) : null]
			}, t)) })]
		}), r.edit ? /* @__PURE__ */ L(Xr, {
			what: e.label,
			onClick: () => r.set(n, [...i, Ur(e)])
		}) : null]
	});
}
function Gr({ shape: e, value: t, path: n, ctx: r }) {
	let i = Hr(t), a = Object.entries(e.fields), o = a.filter(([, e]) => e.kind === "text" && e.long), s = a.filter(([, e]) => !(e.kind === "text" && e.long));
	return /* @__PURE__ */ R("div", {
		className: "overflow-hidden rounded-lg ring-1 ring-border-soft",
		children: [/* @__PURE__ */ L("ol", { children: i.map((e, t) => /* @__PURE__ */ R("li", {
			className: "grid grid-cols-[1.75rem_1fr_auto] items-start gap-2 border-border-soft border-t px-3 py-2 first:border-0",
			children: [
				/* @__PURE__ */ L("span", {
					className: "pt-1.5 font-display font-semibold text-ember-strong tabular-nums",
					children: t + 1
				}),
				/* @__PURE__ */ L("div", {
					className: M("flex min-w-0 flex-col", !r.edit && "pt-1"),
					children: o.map(([i, a]) => /* @__PURE__ */ L(Br, {
						shape: a,
						value: e[i],
						path: [
							...n,
							t,
							i
						],
						ctx: r
					}, i))
				}),
				/* @__PURE__ */ R("div", {
					className: M("flex items-center gap-2 text-[0.8125rem] text-ink-3", !r.edit && "pt-1"),
					children: [s.map(([i, a]) => /* @__PURE__ */ L(Br, {
						shape: a,
						value: e[i],
						path: [
							...n,
							t,
							i
						],
						ctx: r,
						cell: !0
					}, i)), r.edit ? /* @__PURE__ */ L(Yr, { onClick: () => r.set(n, i.filter((e, n) => n !== t)) }) : null]
				})
			]
		}, t)) }), r.edit ? /* @__PURE__ */ L(Xr, {
			what: e.label,
			onClick: () => r.set(n, [...i, Ur(e)])
		}) : null]
	});
}
function Kr({ shape: e, value: t, path: n, ctx: r }) {
	let i = Hr(t), a = Object.entries(e.fields), s = o(e), c = a.filter(([e, t]) => e !== s && e !== "id" && (t.kind === "text" && !t.long || t.kind === "number" || t.kind === "choice")), l = a.filter(([, e]) => e.kind === "list" && e.of.kind === "object");
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-2",
		children: [i.map((t, a) => {
			let o = typeof t.id == "string" ? t.id : void 0;
			return /* @__PURE__ */ R("details", {
				id: o ? `${r.scope}-${o}` : void 0,
				className: "group rounded-xl bg-card ring-1 ring-border-soft open:ring-ink-4/40",
				children: [/* @__PURE__ */ R("summary", {
					className: "flex cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden",
					children: [
						/* @__PURE__ */ L(qe, { className: "size-4 shrink-0 text-ink-3 transition-transform group-open:rotate-90" }),
						/* @__PURE__ */ R("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ L("span", {
								className: "block truncate font-medium text-[0.9375rem]",
								children: Rr(e, t) || `${e.label ?? ""} ${a + 1}`.trim()
							}), /* @__PURE__ */ R("span", {
								className: "flex flex-wrap gap-x-2 text-[0.75rem] text-ink-3",
								children: [c.map(([e, n]) => t[e] === void 0 || t[e] === "" ? null : /* @__PURE__ */ L("span", { children: n.kind === "number" && n.unit ? `${t[e]} ${n.unit}` : String(t[e]) }, e)), l.map(([e, n]) => /* @__PURE__ */ R("span", { children: [
									Array.isArray(t[e]) ? t[e].length : 0,
									" ",
									g(e, n)
								] }, e))]
							})]
						}),
						r.edit ? /* @__PURE__ */ L(Yr, { onClick: () => r.set(n, i.filter((e, t) => t !== a)) }) : null
					]
				}), /* @__PURE__ */ L("div", {
					className: "border-border-soft border-t px-4 py-4",
					children: /* @__PURE__ */ L(qr, {
						shape: e,
						value: t,
						path: [...n, a],
						ctx: r
					})
				})]
			}, a);
		}), r.edit ? /* @__PURE__ */ L(Xr, {
			what: e.label,
			onClick: () => r.set(n, [...i, Ur(e)])
		}) : null]
	});
}
function qr({ shape: e, value: t, path: n, ctx: r }) {
	let i = Mr(t) ? t : {}, a = (e) => e.kind === "list" || e.kind === "object" || e.kind === "table" || e.kind === "text" && !!e.long;
	return /* @__PURE__ */ L("div", {
		className: "grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-x-4 gap-y-4",
		children: Object.entries(e.fields).map(([e, t]) => /* @__PURE__ */ L(Jr, {
			title: g(e, t),
			wide: a(t),
			count: Array.isArray(i[e]) ? i[e].length : null,
			children: /* @__PURE__ */ L(Br, {
				shape: t,
				value: i[e],
				path: [...n, e],
				ctx: r
			})
		}, e))
	});
}
function Jr({ title: e, wide: t, count: n, children: r }) {
	return /* @__PURE__ */ R("div", {
		className: M("flex min-w-0 flex-col gap-1.5 text-[0.875rem]", t && "col-span-full"),
		children: [/* @__PURE__ */ R("span", {
			className: jr,
			children: [e, n === null ? null : /* @__PURE__ */ L("span", {
				className: "ml-1 text-ink-4",
				children: n
			})]
		}), r]
	});
}
function Yr({ onClick: e }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		"aria-label": v("data.remove"),
		onClick: (t) => {
			t.preventDefault(), e();
		},
		className: "grid size-7 place-items-center rounded-md text-ink-3 hover:bg-accent hover:text-rose",
		children: /* @__PURE__ */ L(xn, { className: "size-3.5" })
	});
}
function Xr({ what: e, onClick: t }) {
	return /* @__PURE__ */ R("button", {
		type: "button",
		onClick: t,
		className: "flex w-full items-center gap-1.5 border-border-soft border-t px-3 py-2 text-[0.8125rem] text-ink-3 hover:bg-accent hover:text-ink",
		children: [
			/* @__PURE__ */ L(Qt, { className: "size-3.5" }),
			" ",
			v("data.add", { what: e ?? "" }).trim()
		]
	});
}
function Zr({ shape: e, value: t, onChange: n, mode: r, onMode: i, modes: a = [
	"view",
	"edit",
	"json"
], start: o }) {
	let s = n ? a : a.filter((e) => e !== "edit"), [c, l] = F(o && s.includes(o) ? o : s[0] ?? "view"), u = r ?? c, d = i ?? l, f = pe().replace(/[^a-zA-Z0-9_-]/g, ""), p = {
		root: t,
		shape: e,
		edit: u === "edit" && !!n,
		scope: f,
		set: (e, r) => n?.(Nr(t, e, r)),
		open: (e) => {
			let t = document.getElementById(`${f}-${e}`);
			t && (t.open = !0, t.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}));
		}
	}, m = Object.entries(e.fields);
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ R("div", {
			className: "flex flex-wrap items-center justify-between gap-2 border-border-soft border-b px-3 py-2",
			children: [/* @__PURE__ */ L("div", {
				className: "flex min-w-0 flex-wrap gap-1",
				children: m.length > 1 ? m.map(([e, n]) => /* @__PURE__ */ R("a", {
					href: `#${f}-part-${e}`,
					className: "rounded-full px-2.5 py-1 text-[0.8125rem] text-ink-2 hover:bg-accent",
					children: [g(e, n), Array.isArray(t[e]) ? /* @__PURE__ */ L("span", {
						className: "ml-1 text-ink-4 tabular-nums",
						children: t[e].length
					}) : null]
				}, e)) : null
			}), s.length > 1 ? /* @__PURE__ */ L(ce, {
				value: u,
				onChange: d,
				label: v("data.modes"),
				options: s.map((e) => ({
					id: e,
					label: v(`data.${e}`)
				}))
			}) : null]
		}), u === "json" ? /* @__PURE__ */ L("pre", {
			className: "max-h-[36rem] overflow-auto p-4 font-mono text-[0.75rem] text-ink-2 leading-relaxed",
			children: JSON.stringify(t, null, 2)
		}) : /* @__PURE__ */ L("div", {
			className: "flex flex-col gap-7 p-4 sm:p-5",
			children: m.map(([e, n]) => /* @__PURE__ */ R("section", {
				id: `${f}-part-${e}`,
				className: "flex scroll-mt-4 flex-col gap-2",
				children: [/* @__PURE__ */ R("h3", {
					className: "flex items-baseline gap-2 font-display font-semibold text-[1rem]",
					children: [g(e, n), Array.isArray(t[e]) ? /* @__PURE__ */ L("span", {
						className: "font-normal font-sans text-[0.8125rem] text-ink-4 tabular-nums",
						children: t[e].length
					}) : null]
				}), /* @__PURE__ */ L("div", {
					className: "text-[0.9375rem] leading-relaxed",
					children: /* @__PURE__ */ L(Br, {
						shape: n,
						value: t[e],
						path: [e],
						ctx: p
					})
				})]
			}, e))
		})]
	});
}
function Qr({ items: e }) {
	let [t, n] = F(!1), r = P(null);
	return N(() => {
		if (!t) return;
		let e = (e) => {
			r.current?.contains(e.target) || n(!1);
		}, i = (e) => e.key === "Escape" && n(!1);
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", i), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", i);
		};
	}, [t]), /* @__PURE__ */ R("div", {
		ref: r,
		className: "relative",
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			"aria-label": v("data.menu"),
			title: v("data.menu"),
			"aria-haspopup": "menu",
			"aria-expanded": t,
			onClick: () => n((e) => !e),
			className: M("grid size-8 place-items-center rounded-full text-ink-3 transition hover:bg-accent hover:text-ink coarse:size-11", t && "bg-accent text-ink"),
			children: /* @__PURE__ */ L(it, { className: "size-4" })
		}), t ? /* @__PURE__ */ L("div", {
			role: "menu",
			className: "absolute top-full right-0 z-50 mt-1 w-60 animate-rise rounded-xl bg-card p-1.5 shadow-overlay ring-1 ring-border-soft",
			children: e.map((e) => /* @__PURE__ */ R("button", {
				type: "button",
				role: "menuitem",
				className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.875rem] text-ink-2 transition hover:bg-accent hover:text-ink",
				onClick: () => {
					n(!1), e.onClick();
				},
				children: [e.icon, e.label]
			}, e.label))
		}) : null]
	});
}
function $r(e) {
	return e.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "output";
}
function ei({ shape: e, title: t, open: n, onClose: r }) {
	let [i, o] = F(!1), s = n ? JSON.stringify(a(e, t), null, 2) : "";
	return /* @__PURE__ */ L(O, {
		open: n,
		onClose: r,
		title: `${v("data.schema")} · ${t}`,
		wide: !0,
		height: "tall",
		children: /* @__PURE__ */ R("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3",
			children: [/* @__PURE__ */ L("pre", {
				className: "min-h-0 flex-1 overflow-auto rounded-lg bg-paper-2 p-3 font-mono text-[0.75rem] text-ink-2 leading-relaxed",
				children: s
			}), /* @__PURE__ */ R("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => {
						navigator.clipboard.writeText(s), o(!0), setTimeout(() => o(!1), 1500);
					},
					className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 text-[0.8125rem] text-ink-2 hover:text-ink coarse:h-11 coarse:px-4",
					children: [L(i ? B : Ze, { className: "size-3.5" }), v(i ? "share.copied" : "data.copy")]
				}), /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => {
						let e = URL.createObjectURL(new Blob([s], { type: "application/schema+json" })), n = document.createElement("a");
						n.href = e, n.download = `${$r(t)}.schema.json`, n.click(), setTimeout(() => URL.revokeObjectURL(e), 1e3);
					},
					className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 text-[0.8125rem] text-ink-2 hover:text-ink coarse:h-11 coarse:px-4",
					children: [
						/* @__PURE__ */ L(V, { className: "size-3.5" }),
						" ",
						v("data.download")
					]
				})]
			})]
		})
	});
}
function ti(e) {
	let t = e;
	return t.type === "agent" && t.output.format === "json" && !t.each && !t.call;
}
function ni({ runId: e, step: t, output: r, header: i, children: a }) {
	let o = n(t), [s, c] = F(!1), [l, u] = F(!1), [d, f] = F(null), [p, m] = F(!1), [h, g] = F(null), _ = d ?? (Mr(r.json) ? r.json : {}), y = async () => {
		if (d) {
			m(!0), g(null);
			try {
				await H.put(`${U(e)}/outputs/${t.id}`, { json: d }), f(null), c(!1);
			} catch (e) {
				g(e.message);
			} finally {
				m(!1);
			}
		}
	}, b = /* @__PURE__ */ L(Qr, { items: [{
		label: v(s ? "data.close" : "data.open"),
		icon: /* @__PURE__ */ L(tt, { className: "size-4 shrink-0" }),
		onClick: () => {
			c((e) => !e), f(null);
		}
	}, {
		label: v("data.schema"),
		icon: /* @__PURE__ */ L(He, { className: "size-4 shrink-0" }),
		onClick: () => u(!0)
	}] });
	return /* @__PURE__ */ R(I, { children: [
		i(b),
		s ? /* @__PURE__ */ R("div", {
			className: "overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
			children: [/* @__PURE__ */ L(Zr, {
				shape: o,
				value: _,
				onChange: f
			}), d ? /* @__PURE__ */ R("div", {
				className: "flex items-center justify-end gap-2 border-border-soft border-t px-3 py-2",
				children: [
					h ? /* @__PURE__ */ L("span", {
						className: "mr-auto text-[0.8125rem] text-rose",
						children: h
					}) : null,
					/* @__PURE__ */ L(D, {
						variant: "ghost",
						size: "sm",
						onClick: () => f(null),
						children: v("common.cancel")
					}),
					/* @__PURE__ */ L(D, {
						size: "sm",
						busy: p,
						onClick: () => void y(),
						children: v("data.save")
					})
				]
			}) : null]
		}) : a,
		/* @__PURE__ */ L(ei, {
			shape: o,
			title: t.title,
			open: l,
			onClose: () => u(!1)
		})
	] });
}
//#endregion
//#region src/location.tsx
var ri = 25, ii = 9e3;
function ai(e) {
	return e.code === e.PERMISSION_DENIED ? "denied" : e.code === e.TIMEOUT ? "timeout" : "unavailable";
}
function oi({ value: e, runId: t, placeholder: n, onChange: r, onBusy: i }) {
	let a = l(e) ? e : null, [o, s] = F(!1), [c, u] = F(null), d = P(null), f = P(!!a?.label), p = P(a);
	p.current = a;
	let m = a?.lat !== void 0 && a.lng !== void 0, h = typeof navigator < "u" && "geolocation" in navigator, g = () => {
		d.current !== null && (navigator.geolocation.clearWatch(d.current), d.current = null), s(!1), i?.(!1);
	};
	N(() => () => {
		d.current !== null && navigator.geolocation.clearWatch(d.current);
	}, []);
	let _ = async (e, n) => {
		try {
			let { label: i } = await H.post(`${U(t)}/geocode`, {
				lat: e,
				lng: n,
				language: x
			}), a = p.current;
			i && !f.current && a?.lat === e && a.lng === n && r({
				...a,
				label: i
			});
		} catch {}
	}, y = () => {
		u(null), s(!0), i?.(!0);
		let e = Date.now(), t = Infinity;
		d.current = navigator.geolocation.watchPosition((n) => {
			let { latitude: i, longitude: a, accuracy: o } = n.coords;
			if (o < t) {
				t = o;
				let e = Math.round(i * 1e6) / 1e6, n = Math.round(a * 1e6) / 1e6, s = f.current ? p.current?.label : void 0, c = {
					lat: e,
					lng: n,
					accuracy: Math.round(o),
					...s ? { label: s } : {}
				};
				p.current = c, r(c);
			}
			if (t <= ri || Date.now() - e > ii) {
				g();
				let e = p.current;
				e?.lat !== void 0 && e.lng !== void 0 && _(e.lat, e.lng);
			}
		}, (e) => {
			g(), t === Infinity && u(ai(e));
		}, {
			enableHighAccuracy: !0,
			timeout: 15e3,
			maximumAge: 1e4
		});
	}, b = (e) => {
		f.current = e.trim().length > 0;
		let t = {
			...m ? a : {},
			label: e
		};
		r(m || e.trim() ? t : void 0);
	};
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-3",
		children: [m ? /* @__PURE__ */ R("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ L("div", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-moss-tint text-moss",
					children: /* @__PURE__ */ L(It, { className: "size-5" })
				}),
				/* @__PURE__ */ R("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ R("div", {
						className: "truncate font-medium text-[0.9375rem] tabular-nums",
						children: [
							a.lat?.toFixed(5),
							", ",
							a.lng?.toFixed(5)
						]
					}), /* @__PURE__ */ R("div", {
						className: "flex flex-wrap items-center gap-x-3 text-[0.8125rem] text-ink-3",
						children: [/* @__PURE__ */ L("span", { children: o ? v("location.refining") : a.accuracy ? v("location.accuracy", { m: a.accuracy }) : null }), /* @__PURE__ */ R("a", {
							href: `https://www.openstreetmap.org/?mlat=${a.lat}&mlon=${a.lng}#map=17/${a.lat}/${a.lng}`,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 underline-offset-2 hover:text-ink hover:underline coarse:-my-3 coarse:min-h-11 coarse:min-w-11",
							children: [
								v("location.map"),
								" ",
								/* @__PURE__ */ L(ct, { className: "size-3" })
							]
						})]
					})]
				}),
				/* @__PURE__ */ L(te, {
					label: v("location.remove"),
					onClick: () => {
						g(), f.current = !1, r(void 0);
					},
					children: /* @__PURE__ */ L(kn, { className: "size-4" })
				})
			]
		}) : h ? /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ R(D, {
			variant: "secondary",
			size: "lg",
			busy: o,
			onClick: y,
			className: "w-full sm:w-auto",
			children: [o ? null : /* @__PURE__ */ L(Mt, { className: "size-4" }), v(o ? "location.locating" : "location.use")]
		}), c ? /* @__PURE__ */ L("p", {
			className: "mt-2 rounded-lg bg-amber-tint px-3 py-2 text-[0.8125rem] text-ink-2 leading-relaxed",
			children: v(`location.${c}`)
		}) : /* @__PURE__ */ L("p", {
			className: "mt-2 text-[0.8125rem] text-ink-3 leading-relaxed",
			children: v("location.why")
		})] }) : null, /* @__PURE__ */ L(k, {
			value: a?.label ?? "",
			placeholder: n ?? v(m ? "location.label" : "location.manual"),
			autoComplete: "street-address",
			enterKeyHint: "done",
			"aria-label": v("location.manual"),
			onChange: (e) => b(e.target.value)
		})]
	});
}
//#endregion
//#region src/scan.tsx
var si = null;
function ci() {
	return si ??= (async () => {
		let e = window.BarcodeDetector;
		if (e) try {
			let t = await e.getSupportedFormats();
			if (t.includes("qr_code")) {
				let n = new e({ formats: t });
				return {
					qrOnly: !1,
					detect: async (e) => (await n.detect(e))[0]?.rawValue || null
				};
			}
		} catch {}
		let { default: t } = await import("./chunks/qr-scanner.min-BKVcIdn3.js"), n = t.createQrEngine();
		return {
			qrOnly: !0,
			detect: async (e) => {
				try {
					return (await t.scanImage(e, {
						qrEngine: n,
						returnDetailedScanResult: !0
					})).data || null;
				} catch {
					return null;
				}
			}
		};
	})(), si;
}
function li({ open: e, onClose: t, onResult: n }) {
	let r = P(n);
	r.current = n;
	let i = P(t);
	return i.current = t, N(() => {
		e && Vn("scan").then((e) => {
			e && r.current(e);
		}).catch(() => void 0).finally(() => i.current());
	}, [e]), null;
}
function ui(e) {
	return Bn("scan") ? /* @__PURE__ */ L(li, { ...e }) : /* @__PURE__ */ L(di, { ...e });
}
function di({ open: e, onClose: t, onResult: n }) {
	let [r, i] = F("environment"), [a, o] = F(!1), [s, c] = F(!1), l = P(null), u = br(e, r), d = P(n);
	d.current = n;
	let f = P(t);
	f.current = t, N(() => {
		e && (c(!1), ci().then((e) => o(e.qrOnly)));
	}, [e]), N(() => {
		if (!e || !u.stream) return;
		let t = !1, n, r = async () => {
			let e = u.video.current;
			if (!t && e && e.readyState >= 2 && e.videoWidth) {
				let n = await (await ci()).detect(e).catch(() => null);
				if (n && !t) {
					navigator.vibrate?.(60), d.current(n), f.current();
					return;
				}
			}
			t || (n = setTimeout(r, 200));
		};
		return r(), () => {
			t = !0, clearTimeout(n);
		};
	}, [
		e,
		u.stream,
		u.video
	]);
	let p = async (e) => {
		if (!e) return;
		c(!1);
		let r = await createImageBitmap(e).catch(() => null), i = r ? await (await ci()).detect(r).catch(() => null) : null;
		i ? (n(i), t()) : c(!0);
	};
	return /* @__PURE__ */ R(xr, {
		open: e,
		onClose: t,
		label: v("scan.title"),
		children: [
			/* @__PURE__ */ L(Cr, {
				title: v("scan.title"),
				onClose: t,
				camera: u,
				onFlip: () => i((e) => e === "environment" ? "user" : "environment")
			}),
			/* @__PURE__ */ L(wr, {
				camera: u,
				asking: v("scan.asking"),
				actions: /* @__PURE__ */ R("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ R(kr, {
						onClick: () => l.current?.click(),
						children: [
							/* @__PURE__ */ L(wt, { className: "size-4" }),
							" ",
							v("scan.fromPhoto")
						]
					}), /* @__PURE__ */ L(kr, {
						quiet: !0,
						onClick: t,
						children: v("scan.typeInstead")
					})]
				}),
				children: /* @__PURE__ */ L("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ L("div", { className: "aspect-square w-[min(68%,320px)] rounded-3xl border-2 border-white/90 shadow-[0_0_0_100vmax_rgb(0_0_0/0.35)]" })
				})
			}),
			/* @__PURE__ */ R("div", {
				className: "safe-bottom flex flex-col items-center gap-3 px-5 pt-3 text-center",
				children: [/* @__PURE__ */ L("p", {
					className: "text-[0.8125rem] text-white/75 leading-snug",
					children: v(s ? "scan.miss" : a ? "scan.hintQr" : "scan.hint")
				}), u.stream ? /* @__PURE__ */ R(kr, {
					quiet: !0,
					onClick: () => l.current?.click(),
					children: [
						/* @__PURE__ */ L(wt, { className: "size-4" }),
						" ",
						v("scan.fromPhoto")
					]
				}) : null]
			}),
			/* @__PURE__ */ L("input", {
				ref: l,
				type: "file",
				hidden: !0,
				accept: "image/*",
				onChange: (e) => {
					p(e.target.files?.[0]), e.target.value = "";
				}
			})
		]
	});
}
//#endregion
//#region src/signature.tsx
var fi = "#1d1a17", pi = {
	width: 1200,
	height: 480
};
function mi(e, t, n, r, i) {
	e.lineCap = "round", e.lineJoin = "round", e.strokeStyle = fi, e.fillStyle = fi, e.lineWidth = i;
	for (let a of t) {
		if (a.length === 1) {
			e.beginPath(), e.arc(a[0].x * n, a[0].y * r, i / 2, 0, Math.PI * 2), e.fill();
			continue;
		}
		e.beginPath(), e.moveTo(a[0].x * n, a[0].y * r);
		for (let t = 1; t < a.length - 1; t++) {
			let i = a[t], o = a[t + 1];
			e.quadraticCurveTo(i.x * n, i.y * r, (i.x + o.x) / 2 * n, (i.y + o.y) / 2 * r);
		}
		let t = a[a.length - 1];
		e.lineTo(t.x * n, t.y * r), e.stroke();
	}
}
function hi({ strokes: e, onStrokes: t }) {
	let n = P(null), r = P(null), i = P(e);
	i.current = e;
	let a = () => {
		let e = n.current, t = e?.getContext("2d");
		if (!e || !t) return;
		let a = window.devicePixelRatio || 1, o = Math.round(e.clientWidth * a), s = Math.round(e.clientHeight * a);
		(e.width !== o || e.height !== s) && (e.width = o, e.height = s), t.clearRect(0, 0, o, s), mi(t, r.current ? [...i.current, r.current] : i.current, o, s, 2.4 * a);
	};
	N(() => {
		a();
		let e = n.current;
		if (!e) return;
		let t = new ResizeObserver(a);
		return t.observe(e), () => t.disconnect();
	}, [e]);
	let o = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		return {
			x: Math.min(1, Math.max(0, (e.clientX - t.left) / t.width)),
			y: Math.min(1, Math.max(0, (e.clientY - t.top) / t.height))
		};
	};
	return /* @__PURE__ */ R("div", {
		className: "relative overflow-hidden rounded-xl bg-white ring-1 ring-input",
		children: [
			/* @__PURE__ */ L("canvas", {
				ref: n,
				"aria-label": v("sign.pad"),
				className: "block aspect-[5/2] w-full cursor-crosshair touch-none select-none",
				onPointerDown: (e) => {
					e.currentTarget.setPointerCapture(e.pointerId), r.current = [o(e)], a();
				},
				onPointerMove: (e) => {
					r.current && (r.current.push(o(e)), a());
				},
				onPointerUp: () => {
					if (r.current) {
						let e = r.current;
						r.current = null, t([...i.current, e]);
					}
				},
				onPointerCancel: () => {
					r.current = null, a();
				}
			}),
			/* @__PURE__ */ L("div", { className: "pointer-events-none absolute inset-x-6 bottom-[22%] border-[#1d1a17]/25 border-b" }),
			e.length ? null : /* @__PURE__ */ L("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center text-[#1d1a17]/40 text-[0.875rem]",
				children: v("sign.hint")
			})
		]
	});
}
async function gi(e) {
	let t = document.createElement("canvas");
	t.width = pi.width, t.height = pi.height;
	let n = t.getContext("2d");
	if (!n) return null;
	mi(n, e, pi.width, pi.height, 7);
	let r = await new Promise((e) => t.toBlob(e, "image/png"));
	return r ? new File([r], "unterschrift.png", { type: "image/png" }) : null;
}
function _i({ label: e, value: t, runId: n, onChange: r }) {
	let [i, a] = F(!1), [o, s] = F([]), [c, l] = F(!1), [u, d] = F(null), f = typeof t == "string" && t ? t : null, p = async () => {
		l(!0), d(null);
		try {
			let e = await gi(o);
			if (!e) return;
			r((await H.upload(`${U(n)}/uploads`, e)).id), a(!1);
		} catch (e) {
			d(e.message);
		} finally {
			l(!1);
		}
	};
	return /* @__PURE__ */ R("div", { children: [f ? /* @__PURE__ */ R("div", {
		className: "flex items-center gap-3 rounded-xl bg-card p-2 ring-1 ring-input",
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			onClick: () => {
				s([]), a(!0);
			},
			className: "min-w-0 flex-1 rounded-lg bg-white px-3",
			"aria-label": v("sign.again"),
			children: /* @__PURE__ */ L("img", {
				src: Rn(`${U(n)}/assets/${f}`),
				alt: e,
				className: "mx-auto h-20 object-contain"
			})
		}), /* @__PURE__ */ L(te, {
			label: v("sign.remove"),
			onClick: () => r(void 0),
			children: /* @__PURE__ */ L(kn, { className: "size-4" })
		})]
	}) : /* @__PURE__ */ R("button", {
		type: "button",
		onClick: () => {
			s([]), a(!0);
		},
		className: "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-input border-dashed bg-card px-4 py-7 text-[0.875rem] text-ink-3 transition hover:border-ember hover:text-ink",
		children: [/* @__PURE__ */ L(Kt, { className: "size-6" }), v("sign.open")]
	}), /* @__PURE__ */ R(O, {
		open: i,
		onClose: () => a(!1),
		title: e,
		wide: !0,
		children: [
			/* @__PURE__ */ L(hi, {
				strokes: o,
				onStrokes: s
			}),
			u ? /* @__PURE__ */ L("p", {
				className: "mt-2 text-[0.8125rem] text-rose",
				children: u
			}) : null,
			/* @__PURE__ */ R("div", {
				className: "mt-5 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ R(D, {
					variant: "ghost",
					disabled: !o.length || c,
					onClick: () => s([]),
					children: [
						/* @__PURE__ */ L(ot, { className: "size-4" }),
						" ",
						v("sign.clear")
					]
				}), /* @__PURE__ */ L(D, {
					busy: c,
					disabled: !o.length,
					onClick: () => void p(),
					children: v("sign.accept")
				})]
			})
		]
	})] });
}
//#endregion
//#region ../shared/src/engenty/data-tables/columns-format.ts
var vi = 36e5, yi = 6e4, bi = 1e3;
function xi(e) {
	return e.fractionDigits === void 0 ? e.style === "integer" ? 0 : 2 : e.fractionDigits;
}
function Si(e, t, n = "en") {
	if (typeof e != "number" || !Number.isFinite(e)) return "";
	let r = xi(t), i = t.grouping !== !1;
	return t.style === "percent" ? new Intl.NumberFormat(n, {
		maximumFractionDigits: r,
		minimumFractionDigits: r,
		style: "percent",
		useGrouping: i
	}).format(e) : t.style === "currency" && t.currency ? new Intl.NumberFormat(n, {
		currency: t.currency,
		maximumFractionDigits: r,
		minimumFractionDigits: r,
		style: "currency",
		useGrouping: i
	}).format(e) : new Intl.NumberFormat(n, {
		maximumFractionDigits: r,
		minimumFractionDigits: r,
		useGrouping: i
	}).format(e);
}
function Ci(e, t, n = "en") {
	if (typeof e != "string" || e.length === 0) return "";
	if (t.kind === "time") return wi(e, t.timePrecision ?? "minutes");
	if (t.dateStyle === "iso") return t.kind === "date" ? e.slice(0, 10) : e;
	let r = t.kind === "date" ? /* @__PURE__ */ new Date(`${e}T00:00:00`) : new Date(e);
	if (Number.isNaN(r.getTime())) return e;
	let i = t.dateStyle ?? "medium";
	if (t.kind === "date") return new Intl.DateTimeFormat(n, { dateStyle: i }).format(r);
	let a = t.timePrecision ?? "minutes";
	return new Intl.DateTimeFormat(n, {
		dateStyle: i,
		timeStyle: a === "hours" ? "short" : "medium"
	}).format(r);
}
function wi(e, t) {
	let [n = "0", r = "00", i = "00"] = e.split(":");
	return t === "hours" ? `${n.padStart(2, "0")}:00` : t === "minutes" ? `${n.padStart(2, "0")}:${r.padStart(2, "0")}` : `${n.padStart(2, "0")}:${r.padStart(2, "0")}:${i.padStart(2, "0")}`;
}
function Ti(e, t) {
	if (typeof e != "number" || !Number.isFinite(e)) return "";
	let n = Math.max(0, Math.round(e));
	if (t.display === "iso") return Ei(n);
	if (t.display === "minutes") return `${Math.round(n / yi)} min`;
	if (t.display === "hours") return `${(n / vi).toFixed(2)} h`;
	if (t.display === "decimal-hours") return (n / vi).toFixed(2);
	let r = Math.floor(n / vi), i = Math.floor(n % vi / yi), a = Math.floor(n % yi / bi);
	return `${r}:${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function Ei(e) {
	let t = Math.floor(e / vi), n = Math.floor(e % vi / yi), r = Math.floor(e % yi / bi);
	return `${t >= 24 ? `P${Math.floor(t / 24)}D` : "P"}T${t % 24}H${n}M${r}S`;
}
function Di(e, t, n = "en") {
	if (t == null) return "";
	switch (e.type) {
		case "number": return Si(t, e.format, n);
		case "date": return Ci(t, e.format, n);
		case "duration": return Ti(t, e.format);
		case "boolean": return t === !0 ? "true" : t === !1 ? "false" : "";
		case "select": return Oi(e, t);
		default: return String(t);
	}
}
function Oi(e, t) {
	let n = Array.isArray(t) ? t : [t], r = e.format.options.reduce((e, t) => (e[t.id] = t.label, e), {});
	return n.filter((e) => typeof e == "string" && e.length > 0).map((e) => r[e] ?? e).join(", ");
}
//#endregion
//#region src/store.tsx
function ki({ runId: e, connectionId: t, connector: n, onCancel: r }) {
	let [i, a] = F({}), [o, s] = F(!1), [c, l] = F(null), u = async () => {
		s(!0), l(null);
		try {
			await H.post(`${U(e)}/connections/${t}/credentials/${n.id}`, { values: i });
		} catch (e) {
			l(e.message);
		} finally {
			s(!1);
		}
	};
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-input",
		children: [
			(n.fields ?? []).map((e) => /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ L(A, { children: e.label }), /* @__PURE__ */ L(k, {
				type: e.secret ? "password" : "text",
				autoComplete: "off",
				value: i[e.key] ?? "",
				placeholder: e.placeholder,
				onChange: (t) => a((n) => ({
					...n,
					[e.key]: t.target.value
				})),
				onKeyDown: (e) => {
					e.key === "Enter" && (e.preventDefault(), u());
				}
			})] }, e.key)),
			n.hint ? /* @__PURE__ */ L("p", {
				className: "text-[0.8125rem] text-ink-3",
				children: n.hint
			}) : null,
			c ? /* @__PURE__ */ L("p", {
				className: "text-[0.8125rem] text-rose",
				children: c
			}) : null,
			/* @__PURE__ */ R("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ L(D, {
					variant: "ghost",
					size: "sm",
					onClick: r,
					children: v("common.cancel")
				}), /* @__PURE__ */ L(D, {
					size: "sm",
					busy: o,
					onClick: () => void u(),
					children: v("connect.go")
				})]
			})
		]
	});
}
function Ai({ runId: e, connection: t }) {
	let [n, r] = F(null), [i, a] = F(null), [o, s] = F(null);
	if (!t) return null;
	if (t.account) {
		let n = t.connectors.find((e) => e.id === t.account?.connector)?.name ?? "";
		return /* @__PURE__ */ R("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ L("div", {
					className: "flex size-10 items-center justify-center rounded-full bg-moss-tint text-moss",
					children: /* @__PURE__ */ L(B, { className: "size-5" })
				}),
				/* @__PURE__ */ R("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ L("div", {
						className: "truncate font-medium text-[0.9375rem]",
						children: t.account.label
					}), /* @__PURE__ */ L("div", {
						className: "text-[0.8125rem] text-ink-3",
						children: v("connect.connected", { name: n })
					})]
				}),
				/* @__PURE__ */ L(te, {
					label: v("connect.disconnect"),
					onClick: () => void H.del(`${U(e)}/connections/${t.id}`),
					children: /* @__PURE__ */ L(Tn, { className: "size-4" })
				})
			]
		});
	}
	let c = async (n) => {
		if (s(null), a(null), Bn("signIn")) {
			try {
				let { url: r } = await H.post(`${U(e)}/connections/${t.id}/oauth/${n.id}`);
				await Vn("signIn", { url: r });
			} catch (e) {
				s(e.message);
			}
			return;
		}
		let r = window.open("about:blank", "wizard-connect", "width=540,height=700");
		try {
			let { url: i } = await H.post(`${U(e)}/connections/${t.id}/oauth/${n.id}`);
			r ? r.location.replace(i) : a(i);
		} catch (e) {
			r?.close(), s(e.message);
		}
	}, l = t.connectors.find((e) => e.id === n);
	return t.connectors.length ? /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ L("div", {
				className: "flex flex-wrap gap-2",
				children: t.connectors.map((e) => /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => e.auth === "oauth2" ? void c(e) : r(n === e.id ? null : e.id),
					className: M("inline-flex h-11 items-center gap-2 rounded-full px-4 font-medium text-[0.875rem] ring-1 transition", n === e.id ? "bg-ember-veil text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink hover:ring-ember"),
					children: [
						/* @__PURE__ */ L(At, { className: "size-4" }),
						" ",
						e.name
					]
				}, e.id))
			}),
			l ? /* @__PURE__ */ L(ki, {
				runId: e,
				connectionId: t.id,
				connector: l,
				onCancel: () => r(null)
			}) : null,
			i ? /* @__PURE__ */ L("a", {
				href: i,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[0.875rem] text-ember underline",
				children: v("connect.openLink")
			}) : null,
			o ? /* @__PURE__ */ L("p", {
				className: "text-[0.8125rem] text-rose",
				children: o
			}) : null
		]
	}) : /* @__PURE__ */ L("p", {
		className: "text-[0.875rem] text-ink-3",
		children: v("connect.none")
	});
}
function ji(e) {
	return e == null ? "" : Array.isArray(e) ? e.join(", ") : String(e);
}
function Mi({ column: e, value: n, boxed: r, onCommit: i }) {
	let [a, o] = F(ji(n));
	N(() => o(ji(n)), [n]);
	let s = M("w-full min-w-0 rounded-md border border-transparent px-2 text-[0.8125rem] outline-none focus:border-ember focus:bg-card", r ? "h-11 bg-paper-2" : "h-9 bg-transparent hover:bg-paper-2 coarse:h-11");
	return e.type === "boolean" ? /* @__PURE__ */ L("label", {
		className: "flex size-9 cursor-pointer items-center justify-center coarse:size-11",
		children: /* @__PURE__ */ L("input", {
			type: "checkbox",
			"aria-label": e.name,
			checked: n === !0,
			onChange: (e) => i(e.target.checked),
			className: "size-4 accent-[var(--ember)] coarse:size-6"
		})
	}) : e.type === "select" && !e.format.multiple && !e.format.allowCustom ? /* @__PURE__ */ R("select", {
		value: a,
		onChange: (e) => i(e.target.value || null),
		className: s,
		children: [/* @__PURE__ */ L("option", { value: "" }), e.format.options.map((e) => /* @__PURE__ */ L("option", {
			value: e.id,
			children: e.label
		}, e.id))]
	}) : /* @__PURE__ */ L("input", {
		"aria-label": e.name,
		type: e.type === "date" && e.format.kind === "date" ? "date" : "text",
		inputMode: e.type === "number" ? "decimal" : void 0,
		enterKeyHint: "done",
		autoComplete: "off",
		value: a,
		onChange: (e) => o(e.target.value),
		onBlur: () => {
			a !== ji(n) && i(t(e, a));
		},
		onKeyDown: (e) => {
			e.key === "Enter" && (e.preventDefault(), e.target.blur());
		},
		className: M(s, e.type === "number" && "text-right tabular-nums")
	});
}
function Ni({ runId: e, list: t, editable: n }) {
	let { def: r, rows: i } = t, [a, o] = F(null), [s, c] = F({}), l = `${U(e)}/lists/${r.id}/rows`, u = async (e) => {
		o(null);
		try {
			await e();
		} catch (e) {
			o(e instanceof An ? e.message : String(e));
		}
	}, d = () => u(async () => {
		await H.post(l, { cells: s }), c({});
	}), f = Object.values(s).some((e) => e != null && e !== "");
	if (!i.length && !n) return /* @__PURE__ */ L("p", {
		className: "text-[0.875rem] text-ink-3",
		children: v("list.empty")
	});
	let p = (e, t) => t === 0 || e.type === "text" && e.format?.style === "multiline", m = (e, t, n) => void u(() => H.patch(`${l}/${e}`, { cells: { [t]: n } }));
	return /* @__PURE__ */ R("div", { children: [
		/* @__PURE__ */ R("div", {
			className: "flex flex-col gap-2 sm:hidden",
			children: [i.map((e) => /* @__PURE__ */ R("div", {
				className: "rounded-lg bg-paper p-2 ring-1 ring-border-soft",
				children: [/* @__PURE__ */ L("div", {
					className: "grid grid-cols-2 gap-x-2 gap-y-1.5",
					children: r.columns.map((t, r) => /* @__PURE__ */ R("div", {
						className: M("min-w-0", p(t, r) && "col-span-2"),
						children: [/* @__PURE__ */ L("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: t.name
						}), n ? /* @__PURE__ */ L(Mi, {
							boxed: !0,
							column: t,
							value: e.cells[t.id],
							onCommit: (n) => m(e.id, t.id, n)
						}) : /* @__PURE__ */ L("div", {
							className: M("break-words px-1 text-[0.875rem]", t.type === "number" && "tabular-nums"),
							children: Di(t, e.cells[t.id], x) || "—"
						})]
					}, t.id))
				}), n ? /* @__PURE__ */ L("div", {
					className: "mt-1 flex justify-end",
					children: /* @__PURE__ */ L(te, {
						label: v("list.delete"),
						onClick: () => void u(() => H.del(`${l}/${e.id}`)),
						children: /* @__PURE__ */ L(xn, { className: "size-4" })
					})
				}) : null]
			}, e.id)), n ? /* @__PURE__ */ R("div", {
				className: "rounded-lg border border-input border-dashed p-2",
				children: [/* @__PURE__ */ L("div", {
					className: "grid grid-cols-2 gap-x-2 gap-y-1.5",
					children: r.columns.map((e, t) => /* @__PURE__ */ R("div", {
						className: M("min-w-0", p(e, t) && "col-span-2"),
						children: [/* @__PURE__ */ L("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: e.name
						}), /* @__PURE__ */ L(Mi, {
							boxed: !0,
							column: e,
							value: s[e.id],
							onCommit: (t) => c((n) => ({
								...n,
								[e.id]: t
							}))
						})]
					}, e.id))
				}), /* @__PURE__ */ L("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ R(D, {
						variant: "secondary",
						size: "sm",
						onClick: () => f ? void d() : void 0,
						children: [
							/* @__PURE__ */ L(Qt, { className: "size-4" }),
							" ",
							v("run.addRow")
						]
					})
				})]
			}) : null]
		}),
		/* @__PURE__ */ L("div", {
			className: "hidden overflow-x-auto rounded-lg ring-1 ring-border-soft sm:block",
			children: /* @__PURE__ */ R("table", {
				className: "w-full text-[0.8125rem]",
				children: [/* @__PURE__ */ L("thead", {
					className: "bg-paper-2 text-ink-2",
					children: /* @__PURE__ */ R("tr", { children: [r.columns.map((e) => /* @__PURE__ */ L("th", {
						className: "whitespace-nowrap px-3 py-2 text-left font-medium",
						children: e.name
					}, e.id)), n ? /* @__PURE__ */ L("th", { className: "w-10" }) : null] })
				}), /* @__PURE__ */ R("tbody", { children: [i.map((e) => /* @__PURE__ */ R("tr", {
					className: "border-border-soft border-t align-top",
					children: [r.columns.map((t) => /* @__PURE__ */ L("td", {
						className: M("min-w-[7.5rem]", n ? "px-1 py-0.5" : "px-3 py-2"),
						children: n ? /* @__PURE__ */ L(Mi, {
							column: t,
							value: e.cells[t.id],
							onCommit: (n) => m(e.id, t.id, n)
						}) : /* @__PURE__ */ L("span", {
							className: M(t.type === "number" && "tabular-nums"),
							children: Di(t, e.cells[t.id], x)
						})
					}, t.id)), n ? /* @__PURE__ */ L("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ L(te, {
							label: v("list.delete"),
							className: "size-9",
							onClick: () => void u(() => H.del(`${l}/${e.id}`)),
							children: /* @__PURE__ */ L(xn, { className: "size-3.5" })
						})
					}) : null]
				}, e.id)), n ? /* @__PURE__ */ R("tr", {
					className: "border-border-soft border-t bg-paper",
					children: [r.columns.map((e) => /* @__PURE__ */ L("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ L(Mi, {
							column: e,
							value: s[e.id],
							onCommit: (t) => c((n) => ({
								...n,
								[e.id]: t
							}))
						})
					}, e.id)), /* @__PURE__ */ L("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ L(te, {
							label: v("run.addRow"),
							className: "size-9",
							onClick: () => f ? void d() : void 0,
							children: /* @__PURE__ */ L(Qt, { className: "size-4" })
						})
					})]
				}) : null] })]
			})
		}),
		a ? /* @__PURE__ */ L("p", {
			className: "mt-2 text-[0.8125rem] text-rose",
			children: a
		}) : null
	] });
}
function Pi(e, t, n) {
	let r = t.split("/").map(encodeURIComponent).join("/");
	return Rn(`${U(e)}/store/files/${r}${n ? "?inline=1" : ""}`);
}
var Fi = [
	"bg-paper-3 text-ink-3",
	"bg-moss-tint text-moss",
	"bg-rose-tint text-rose",
	"bg-ember-tint text-ember-strong"
];
function Ii({ runId: e, list: t }) {
	let { def: n, rows: r } = t, i = n.columns.find((e) => e.id === n.check?.file), a = n.columns.find((e) => e.id === n.check?.status), o = a?.type === "select" ? a.format.options : [], s = o[0]?.id, c = (e) => a ? String(e.cells[a.id] ?? s ?? "") : "", l = (e) => !a || c(e) === s, [u, d] = F(() => (r.find(l) ?? r[0])?.id ?? null), [f, p] = F(!1), [m, h] = F(null), g = `${U(e)}/lists/${n.id}/rows`, _ = r.find((e) => e.id === u) ?? r[0], y = f ? r.filter((e) => l(e) || e.id === _?.id) : r, b = r.filter((e) => !l(e)).length, S = n.columns.filter((e) => e !== i && e !== a), C = S.filter((e) => e.id !== n.key), w = C.find((e) => e.type === "text") ?? C[0], T = C.filter((e) => e !== w), E = async (e, t) => {
		h(null);
		try {
			await H.patch(`${g}/${e}`, { cells: t });
		} catch (e) {
			h(e instanceof An ? e.message : String(e));
		}
	}, ee = (e) => {
		let t = y.findIndex((e) => e.id === _?.id), n = y[Math.min(y.length - 1, Math.max(0, t + e))];
		n && d(n.id);
	}, O = async (e) => {
		if (!_ || !a) return;
		let t = r.findIndex((e) => e.id === _.id), n = [...r.slice(t + 1), ...r.slice(0, t)].find(l);
		await E(_.id, { [a.id]: e }), n && e !== s && d(n.id);
	}, te = (e) => {
		e.target.closest("input, textarea, select") || (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), ee(e.key === "ArrowDown" ? 1 : -1)) : /^[1-9]$/.test(e.key) && o[Number(e.key)] && (e.preventDefault(), O(o[Number(e.key)].id)));
	};
	if (!r.length) return /* @__PURE__ */ L("p", {
		className: "text-[0.875rem] text-ink-3",
		children: v("list.empty")
	});
	let k = i && _ ? String(_.cells[i.id] ?? "").trim() : "", A = k.split(".").pop()?.toLowerCase() ?? "", ne = (e) => Fi[Math.min(Math.max(0, o.findIndex((t) => t.id === c(e))), 3)];
	return /* @__PURE__ */ R("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]",
		onKeyDown: te,
		children: [/* @__PURE__ */ R("div", {
			className: "flex min-h-0 flex-col",
			children: [/* @__PURE__ */ R("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ L("span", {
					className: "text-[0.8125rem] text-ink-3 tabular-nums",
					children: v("check.progress", {
						done: b,
						total: r.length
					})
				}), a ? /* @__PURE__ */ L("button", {
					type: "button",
					"aria-pressed": f,
					onClick: () => p((e) => !e),
					className: M("inline-flex h-8 items-center rounded-full px-3 text-[0.8125rem] ring-1 transition coarse:h-11", f ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink"),
					children: v("check.onlyOpen")
				}) : null]
			}), /* @__PURE__ */ L("ul", {
				className: "flex max-h-[38vh] flex-col gap-1.5 overflow-y-auto p-0.5 pr-1 lg:max-h-[calc(100vh-15rem)]",
				children: y.map((e) => /* @__PURE__ */ L("li", { children: /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": e.id === _?.id,
					className: M("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ring-1 transition", e.id === _?.id ? "bg-card shadow-soft ring-ember" : "bg-paper ring-border-soft hover:bg-card"),
					children: [/* @__PURE__ */ R("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ L("span", {
							className: "block truncate font-medium text-[0.875rem]",
							children: w && Di(w, e.cells[w.id], x) || "—"
						}), /* @__PURE__ */ L("span", {
							className: "block truncate text-[0.75rem] text-ink-3 tabular-nums",
							children: T.slice(0, 2).map((t) => Di(t, e.cells[t.id], x)).filter(Boolean).join(" · ")
						})]
					}), a ? /* @__PURE__ */ L("span", {
						className: M("shrink-0 rounded-full px-2 py-0.5 font-medium text-[0.6875rem]", ne(e)),
						children: o.find((t) => t.id === c(e))?.label ?? c(e)
					}) : null]
				}) }, e.id))
			})]
		}), _ ? /* @__PURE__ */ R("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				o.length > 1 ? /* @__PURE__ */ R("div", {
					className: "flex flex-wrap gap-2",
					children: [o.slice(1).map((e, t) => /* @__PURE__ */ R(D, {
						size: "md",
						variant: c(_) === e.id ? "primary" : "secondary",
						onClick: () => void O(e.id),
						children: [
							c(_) === e.id ? /* @__PURE__ */ L(B, { className: "size-4" }) : null,
							e.label,
							/* @__PURE__ */ L("kbd", {
								className: "ml-1 hidden rounded bg-black/10 px-1.5 text-[0.6875rem] lg:inline",
								children: t + 1
							})
						]
					}, e.id)), c(_) === s ? null : /* @__PURE__ */ L(D, {
						size: "md",
						variant: "ghost",
						onClick: () => void O(s ?? ""),
						children: v("check.reopen")
					})]
				}) : null,
				/* @__PURE__ */ L("div", {
					className: "overflow-hidden rounded-lg bg-paper-2 ring-1 ring-border-soft",
					children: k ? /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("div", {
						className: "flex items-center gap-2 border-border-soft border-b bg-card px-3 py-2 text-[0.8125rem]",
						children: [
							/* @__PURE__ */ L(ft, { className: "size-3.5 shrink-0 text-ink-3" }),
							/* @__PURE__ */ L("span", {
								className: "min-w-0 flex-1 truncate",
								children: k.split("/").pop()
							}),
							/* @__PURE__ */ L("a", {
								href: Pi(e, k, A === "pdf"),
								target: "_blank",
								rel: "noreferrer",
								className: "shrink-0 text-ink-2 underline-offset-2 hover:text-ink hover:underline",
								children: v("run.openFull")
							})
						]
					}), A === "pdf" ? /* @__PURE__ */ L("iframe", {
						title: k,
						src: `${Pi(e, k, !0)}#toolbar=0&navpanes=0&view=FitH`,
						className: "h-[46vh] w-full border-0 bg-white lg:h-[calc(100vh-27rem)] lg:min-h-[360px]"
					}, k) : [
						"png",
						"jpg",
						"jpeg",
						"webp"
					].includes(A) ? /* @__PURE__ */ L("div", {
						className: "flex max-h-[46vh] justify-center overflow-auto bg-white lg:max-h-[calc(100vh-27rem)]",
						children: /* @__PURE__ */ L("img", {
							src: Pi(e, k, !0),
							alt: k,
							className: "max-w-full object-contain"
						}, k)
					}) : /* @__PURE__ */ L("p", {
						className: "px-4 py-10 text-center text-[0.875rem] text-ink-3",
						children: v("check.noPreview")
					})] }) : /* @__PURE__ */ L("p", {
						className: "px-4 py-14 text-center text-[0.875rem] text-ink-3",
						children: v("check.noFile")
					})
				}),
				/* @__PURE__ */ L("div", {
					className: "grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3",
					children: S.map((e) => /* @__PURE__ */ R("div", {
						className: M("min-w-0", e.type === "text" && e.format?.style === "multiline" && "col-span-full"),
						children: [/* @__PURE__ */ L("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: e.name
						}), /* @__PURE__ */ L(Mi, {
							boxed: !0,
							column: e,
							value: _.cells[e.id],
							onCommit: (t) => void E(_.id, { [e.id]: t })
						})]
					}, e.id))
				}),
				m ? /* @__PURE__ */ L("p", {
					className: "text-[0.8125rem] text-rose",
					children: m
				}) : null
			]
		}) : null]
	});
}
var Li = {
	xlsx: "Excel",
	csv: "CSV",
	json: "JSON",
	md: "Markdown",
	zip: "ZIP"
};
function Ri({ runId: e, list: t }) {
	return /* @__PURE__ */ L("div", {
		className: "flex flex-wrap gap-2",
		children: t.formats.map((n) => /* @__PURE__ */ L("a", {
			href: Rn(`${U(e)}/lists/${t.def.id}/download?format=${n}`),
			className: "inline-flex h-9 items-center rounded-full bg-paper-2 px-3.5 font-medium text-[0.8125rem] text-ink-2 transition hover:bg-paper-3 hover:text-ink coarse:h-11 coarse:px-4",
			children: Li[n] ?? n
		}, n))
	});
}
function zi({ runId: e }) {
	let [t, n] = F(!1), [r, i] = F(null), [a, o] = F(!1);
	N(() => {
		t && (o(!1), H.get(`${U(e)}/store`).then(i));
	}, [t, e]);
	let c = r && !r.files.length && !r.connections.length && !r.keepsSignIns && r.lists.every((e) => !e.rows);
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("button", {
		type: "button",
		onClick: () => n(!0),
		className: "inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-4 transition hover:text-ink-2 coarse:min-h-11",
		children: [
			/* @__PURE__ */ L(tt, { className: "size-3.5" }),
			" ",
			v("store.open")
		]
	}), /* @__PURE__ */ L(O, {
		open: t,
		onClose: () => n(!1),
		title: v("store.title"),
		wide: !0,
		children: r ? /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-5 text-[0.875rem]",
			children: [
				/* @__PURE__ */ L("p", {
					className: "text-ink-3",
					children: v("store.explain")
				}),
				c ? /* @__PURE__ */ L("p", {
					className: "text-ink-2",
					children: v("store.empty")
				}) : null,
				r.lists.some((e) => e.rows) ? /* @__PURE__ */ L("ul", {
					className: "flex flex-col gap-1",
					children: r.lists.filter((e) => e.rows).map((e) => /* @__PURE__ */ R("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ L("span", { children: e.title }), /* @__PURE__ */ L("span", {
							className: "text-ink-3 tabular-nums",
							children: v("store.rows", { n: e.rows })
						})]
					}, e.id))
				}) : null,
				r.connections.map((e) => /* @__PURE__ */ R("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ L(At, { className: "size-4 text-ink-3" }),
						" ",
						e.account?.label
					]
				}, e.id)),
				r.keepsSignIns ? /* @__PURE__ */ R("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ L(B, { className: "size-4 text-ink-3" }),
						" ",
						v("store.signIns")
					]
				}) : null,
				r.files.length ? /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ L("div", {
					className: "mb-1 text-ink-3",
					children: v("store.files", {
						n: r.files.length,
						size: s(r.files.reduce((e, t) => e + t.size, 0))
					})
				}), /* @__PURE__ */ L("ul", {
					className: "max-h-56 overflow-y-auto rounded-lg ring-1 ring-border-soft",
					children: r.files.map((t) => /* @__PURE__ */ L("li", {
						className: "border-border-soft border-b last:border-0",
						children: /* @__PURE__ */ R("a", {
							href: Rn(`${U(e)}/store/files/${t.path}`),
							className: "flex items-center gap-2 px-3 py-2 text-[0.8125rem] hover:bg-paper-2 coarse:min-h-11",
							title: t.source ?? void 0,
							children: [
								/* @__PURE__ */ L(ft, { className: "size-3.5 shrink-0 text-ink-3" }),
								/* @__PURE__ */ L("span", {
									className: "min-w-0 flex-1 truncate",
									children: t.path
								}),
								/* @__PURE__ */ L("span", {
									className: "text-ink-4 tabular-nums",
									children: s(t.size)
								})
							]
						})
					}, t.path))
				})] }) : null,
				/* @__PURE__ */ R("div", {
					className: "flex items-center justify-between gap-3 pt-1",
					children: [c ? /* @__PURE__ */ L("span", {}) : a ? /* @__PURE__ */ R(D, {
						variant: "secondary",
						onClick: async () => {
							await H.del(`${U(e)}/store`), i(await H.get(`${U(e)}/store`)), o(!1);
						},
						children: [
							/* @__PURE__ */ L(xn, { className: "size-4" }),
							" ",
							v("store.confirmDelete")
						]
					}) : /* @__PURE__ */ R(D, {
						variant: "ghost",
						onClick: () => o(!0),
						children: [
							/* @__PURE__ */ L(xn, { className: "size-4" }),
							" ",
							v("store.delete")
						]
					}), /* @__PURE__ */ L(D, {
						onClick: () => n(!1),
						children: v("common.close")
					})]
				})
			]
		}) : /* @__PURE__ */ L("div", {
			className: "flex justify-center py-8 text-ink-4",
			children: /* @__PURE__ */ L(ae, {})
		})
	})] });
}
//#endregion
//#region src/voice.tsx
var Bi = 300;
function Vi() {
	if (typeof MediaRecorder < "u") return (Bn("transcribe") ? [
		"audio/mp4",
		"audio/webm;codecs=opus",
		"audio/webm",
		"audio/ogg;codecs=opus"
	] : [
		"audio/webm;codecs=opus",
		"audio/mp4",
		"audio/webm",
		"audio/ogg;codecs=opus"
	]).find((e) => MediaRecorder.isTypeSupported(e));
}
async function Hi(e, t) {
	if (Bn("transcribe")) try {
		let n = await Vn("transcribe", {
			audio: await new Promise((t, n) => {
				let r = new FileReader();
				r.onload = () => t(String(r.result).split(",")[1] ?? ""), r.onerror = () => n(r.error), r.readAsDataURL(e);
			}),
			mime: e.type,
			lang: t
		});
		return typeof n?.text == "string" ? n.text : void 0;
	} catch {
		return;
	}
}
function Ui(e) {
	return `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`;
}
function Wi({ value: e, runId: t, onChange: n, onBusy: r }) {
	let i = m(e) ? e : null, [a, o] = F(null), [s, c] = F(0), [l, u] = F(!1), [d, f] = F(null), [p, h] = F(!1), [g, _] = F(null), y = P(null), b = P(null), x = Vi(), S = Qn && !!x;
	N(() => () => {
		y.current && (y.current.recorder.onstop = null, y.current.stop());
	}, []), N(() => () => {
		g && URL.revokeObjectURL(g.url);
	}, [g]);
	let C = async (e, i) => {
		u(!0), r?.(!0), f(null);
		try {
			let r = await H.upload(`${U(t)}/uploads`, e);
			_({
				asset: r.id,
				url: URL.createObjectURL(e)
			});
			let { lang: a } = Ln(), o = await Hi(e, a);
			n({
				asset: r.id,
				lang: a,
				...i === void 0 ? {} : { seconds: i },
				...o === void 0 ? {} : { transcript: o }
			});
		} catch (e) {
			f(e.message);
		} finally {
			u(!1), r?.(!1);
		}
	}, w = async () => {
		f(null), h(!1);
		let e;
		try {
			e = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: !0,
				noiseSuppression: !0
			} });
		} catch {
			h(!0);
			return;
		}
		let t = [], n = new MediaRecorder(e, {
			mimeType: x,
			audioBitsPerSecond: 48e3
		}), i = Date.now(), a = new AudioContext(), s = a.createAnalyser();
		s.fftSize = 256, a.createMediaStreamSource(e).connect(s);
		let l = new Uint8Array(s.fftSize), u = 0, d = () => {
			s.getByteTimeDomainData(l);
			let e = 0;
			for (let t of l) e = Math.max(e, Math.abs(t - 128));
			if (c(Math.min(1, e / 64)), o((Date.now() - i) / 1e3), (Date.now() - i) / 1e3 >= Bi) {
				p();
				return;
			}
			u = requestAnimationFrame(d);
		}, p = () => {
			cancelAnimationFrame(u), n.state !== "inactive" && n.stop();
			for (let t of e.getTracks()) t.stop();
			a.close().catch(() => void 0), y.current = null, o(null), c(0);
		};
		n.ondataavailable = (e) => e.data.size && t.push(e.data), n.onstop = () => {
			let e = (n.mimeType || x || "audio/webm").split(";")[0], r = e === "audio/mp4" ? "m4a" : e === "audio/ogg" ? "ogg" : "webm", a = Math.max(1, Math.round((Date.now() - i) / 1e3));
			C(new File(t, `sprachnotiz-${_r()}.${r}`, { type: e }), a);
		}, y.current = {
			recorder: n,
			stop: p
		}, r?.(!0), n.start(1e3), u = requestAnimationFrame(d);
	}, T = a !== null, E = /* @__PURE__ */ R(D, {
		variant: "secondary",
		onClick: () => b.current?.click(),
		children: [
			/* @__PURE__ */ L(ut, { className: "size-4" }),
			" ",
			v("voice.pick")
		]
	});
	return /* @__PURE__ */ R("div", { children: [
		T ? /* @__PURE__ */ R("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-ember",
			children: [
				/* @__PURE__ */ R("span", {
					className: "relative flex size-11 shrink-0 items-center justify-center",
					children: [/* @__PURE__ */ L("span", {
						className: "absolute inset-0 rounded-full bg-rose-tint transition-transform duration-75",
						style: { transform: `scale(${.7 + s * .5})` }
					}), /* @__PURE__ */ L("span", { className: "relative size-3.5 animate-pulse-dot rounded-full bg-rose" })]
				}),
				/* @__PURE__ */ R("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ L("div", {
						className: "font-medium text-[0.9375rem] tabular-nums",
						children: Ui(a)
					}), /* @__PURE__ */ L("div", {
						className: "text-[0.8125rem] text-ink-3",
						children: a > 270 ? v("voice.left", { s: Math.ceil(Bi - a) }) : v("voice.recording")
					})]
				}),
				/* @__PURE__ */ R(D, {
					onClick: () => y.current?.stop(),
					children: [
						/* @__PURE__ */ L(_n, { className: "size-3.5 fill-current" }),
						" ",
						v("voice.stop")
					]
				})
			]
		}) : l ? /* @__PURE__ */ R("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-4 text-[0.875rem] text-ink-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ L(ae, { className: "size-4" }),
				" ",
				v("run.uploading")
			]
		}) : i ? /* @__PURE__ */ R("div", {
			className: "rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ L("audio", {
					controls: !0,
					preload: "metadata",
					src: g?.asset === i.asset ? g.url : `${U(t)}/assets/${i.asset}`,
					className: "h-11 w-full"
				}),
				i.transcript ? /* @__PURE__ */ L("p", {
					className: "mt-2 whitespace-pre-wrap px-1 text-[0.875rem] text-ink-2 leading-relaxed",
					children: i.transcript
				}) : null,
				/* @__PURE__ */ R("div", {
					className: "mt-2 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ L("span", {
						className: "px-1 text-[0.8125rem] text-ink-3",
						children: i.seconds ? Ui(i.seconds) : null
					}), /* @__PURE__ */ R("div", {
						className: "flex gap-1",
						children: [S ? /* @__PURE__ */ R(D, {
							variant: "ghost",
							size: "sm",
							onClick: () => void w(),
							children: [
								/* @__PURE__ */ L(an, { className: "size-3.5" }),
								" ",
								v("voice.again")
							]
						}) : null, /* @__PURE__ */ L(D, {
							variant: "ghost",
							size: "sm",
							onClick: () => n(void 0),
							children: v("voice.remove")
						})]
					})]
				})
			]
		}) : /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ R("div", {
			className: "flex flex-wrap gap-2",
			children: [S ? /* @__PURE__ */ R(D, {
				variant: "secondary",
				size: "lg",
				onClick: () => void w(),
				className: "w-full sm:w-auto",
				children: [
					/* @__PURE__ */ L(Bt, { className: "size-4" }),
					" ",
					v("voice.start")
				]
			}) : E, S && p ? E : null]
		}), p ? /* @__PURE__ */ L("p", {
			className: "mt-2 rounded-lg bg-amber-tint px-3 py-2 text-[0.8125rem] text-ink-2 leading-relaxed",
			children: v("voice.denied")
		}) : /* @__PURE__ */ L("p", {
			className: "mt-2 text-[0.8125rem] text-ink-3 leading-relaxed",
			children: v(S ? "voice.why" : "voice.noRecorder")
		})] }),
		/* @__PURE__ */ L("input", {
			ref: b,
			type: "file",
			hidden: !0,
			accept: "audio/*",
			capture: !0,
			onChange: (e) => {
				let t = e.target.files?.[0];
				e.target.value = "", t && C(t, void 0);
			}
		}),
		d ? /* @__PURE__ */ L("div", {
			className: "mt-2 text-[0.8125rem] text-rose",
			children: d
		}) : null
	] });
}
//#endregion
//#region src/fields.tsx
function Gi({ field: e, value: t, values: n, onChange: r }) {
	let a = e.columns ?? [], o = Array.isArray(t) && t.length ? t : [{}], s = E(e, o, n), c = (e, t, n) => {
		r(o.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, l = a.map((e) => e.kind === "text" && e === a[0] ? "minmax(0,3fr)" : "minmax(0,1fr)").join(" ");
	return /* @__PURE__ */ R("div", {
		className: "rounded-xl bg-card p-2 ring-1 ring-input",
		children: [
			/* @__PURE__ */ L("div", {
				className: "hidden gap-2 px-2 pt-1 pb-2 text-[0.75rem] text-ink-3 sm:grid",
				style: { gridTemplateColumns: `${l} 36px` },
				children: a.map((e) => /* @__PURE__ */ L("div", {
					className: e.kind === "text" ? "" : "text-right",
					children: e.label
				}, e.id))
			}),
			/* @__PURE__ */ L("div", {
				className: "flex flex-col gap-2",
				children: o.map((e, t) => /* @__PURE__ */ R("div", {
					className: "grid grid-cols-6 gap-2 rounded-lg bg-paper p-2 sm:bg-transparent sm:p-0 sm:[grid-template-columns:var(--cols)]",
					style: { "--cols": `${l} 36px` },
					children: [a.map((n, r) => /* @__PURE__ */ R("label", {
						className: M("flex min-w-0 flex-col gap-1 sm:col-span-1", r === 0 ? "col-span-5" : a.length - 1 <= 2 ? "col-span-3" : "col-span-2"),
						children: [/* @__PURE__ */ L("span", {
							className: "px-0.5 text-[0.6875rem] text-ink-3 sm:hidden",
							children: n.label
						}), /* @__PURE__ */ L("input", {
							"aria-label": n.label,
							placeholder: n.label,
							inputMode: n.kind === "text" ? "text" : "decimal",
							autoComplete: "off",
							value: String(e[n.id] ?? ""),
							onChange: (e) => c(t, n.id, e.target.value),
							className: M("h-11 w-full min-w-0 rounded-md border border-transparent bg-paper-2 px-2.5 text-[0.875rem] outline-none placeholder:text-transparent focus:border-focus focus:bg-card sm:placeholder:text-ink-4", n.kind !== "text" && "text-right tabular-nums")
						})]
					}, n.id)), /* @__PURE__ */ L(te, {
						label: v("list.delete"),
						onClick: () => r(o.filter((e, n) => n !== t)),
						className: "order-first col-start-6 row-start-1 size-11 justify-self-end self-end sm:order-none sm:col-start-auto sm:row-start-auto",
						children: /* @__PURE__ */ L(xn, { className: "size-4" })
					})]
				}, t))
			}),
			/* @__PURE__ */ R("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-3 px-2 pb-1",
				children: [/* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => r([...o, {}]),
					className: "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] text-ink-2 hover:bg-accent coarse:h-11",
					children: [
						/* @__PURE__ */ L(Qt, { className: "size-4" }),
						" ",
						v("run.addRow")
					]
				}), /* @__PURE__ */ R("div", {
					className: "text-right text-[0.8125rem] tabular-nums",
					children: [
						/* @__PURE__ */ R("div", {
							className: "text-ink-3",
							children: [
								v("run.net"),
								" ",
								i(s.net, s.currency, x)
							]
						}),
						s.vatRate ? /* @__PURE__ */ R("div", {
							className: "text-ink-3",
							children: [
								v("run.vat", { r: s.vatRate }),
								" ",
								i(s.vat, s.currency, x)
							]
						}) : null,
						/* @__PURE__ */ R("div", {
							className: "font-semibold text-[0.9375rem] text-ink",
							children: [
								v("run.total"),
								" ",
								i(s.gross, s.currency, x)
							]
						})
					]
				})]
			})
		]
	});
}
function Ki(e) {
	return !!e?.closest("input, textarea, [contenteditable='true']");
}
function qi({ field: e, value: t, runId: n, onChange: r, onBusy: i }) {
	let a = P(null), o = P(null), s = P(null), c = P(null), [l, u] = F(!1), [d, f] = F({}), [p, m] = F(null), [h, g] = F(!1), [_, y] = F(!1), [b, x] = F(null), S = P(null), C = (e) => {
		S.current = e, x(e);
	}, w = e.kind === "image", T = !!e.multiple, E = T ? e.max ?? 30 : 1, D = w || !!e.camera || !!e.video, ee = !w && !!e.video, O = Array.isArray(t) ? t : typeof t == "string" && t ? [t] : [], k = P(O);
	k.current = O;
	let A = O.length < E, ne = async (e) => {
		let t = (w ? e.filter((e) => e.type.startsWith("image/")) : e).sort((e, t) => e.name.localeCompare(t.name, void 0, { numeric: !0 }));
		if (!t.length) return;
		let a = E - (T ? k.current.length : 0);
		u(!0), i?.(!0), m(t.length > a && T ? v("run.maxFiles", { n: E }) : null);
		try {
			for (let e of t.slice(0, Math.max(0, a))) {
				let t = await gr(e), i = await H.upload(`${U(n)}/uploads`, t);
				f((e) => ({
					...e,
					[i.id]: {
						name: i.name,
						mime: i.mime
					}
				}));
				let a = T ? [...k.current, i.id] : i.id;
				k.current = T ? a : [i.id], r(a);
			}
		} catch (e) {
			m(e.message);
		} finally {
			u(!1), i?.(!1);
		}
	}, re = P(ne);
	re.current = ne;
	let ie = (e) => {
		let t = O.filter((t) => t !== e);
		r(T ? t : void 0);
	}, ae = (e, t) => {
		let n = k.current.indexOf(e), i = Math.min(k.current.length - 1, Math.max(0, t));
		if (n < 0 || n === i) return;
		let a = k.current.filter((t) => t !== e);
		a.splice(i, 0, e), k.current = a, r(a);
	}, oe = T && O.length > 1;
	N(() => {
		if (!A) return;
		let e = (e) => {
			let t = Array.from(e.clipboardData?.files ?? []), n = a.current;
			if (!t.length || !n || Ki(document.activeElement)) return;
			let r = document.querySelectorAll("[data-upload-field]");
			(n.matches(":hover") || n.contains(document.activeElement) || r.length === 1) && (e.preventDefault(), re.current(t));
		};
		return document.addEventListener("paste", e), () => document.removeEventListener("paste", e);
	}, [A]);
	let se = M("flex flex-col items-center justify-center gap-2 rounded-xl border border-input border-dashed bg-card px-3 text-[0.875rem] text-ink-3 transition hover:border-ember hover:text-ink", O.length ? "py-4" : "py-8");
	return /* @__PURE__ */ R("div", {
		ref: a,
		"data-upload-field": "",
		onDragOver: (e) => {
			A && (e.preventDefault(), y(!0));
		},
		onDragLeave: () => y(!1),
		onDrop: (e) => {
			y(!1), A && (e.preventDefault(), ne(Array.from(e.dataTransfer.files)));
		},
		children: [
			O.length ? /* @__PURE__ */ L("div", {
				className: "mb-2 flex flex-col gap-2",
				children: O.map((e, t) => {
					let r = d[e], i = r?.mime ?? (w ? "image/" : "");
					return /* @__PURE__ */ R("div", {
						"data-file-id": e,
						className: M("flex items-center gap-3 rounded-xl bg-card p-2 ring-1 ring-input transition-shadow", b === e && "relative z-10 shadow-elevated ring-2 ring-ember"),
						children: [
							oe ? /* @__PURE__ */ R("button", {
								type: "button",
								"aria-label": v("run.moveFile", { n: t + 1 }),
								title: v("run.moveFileHint"),
								className: M("-mr-1 flex h-14 w-9 shrink-0 touch-none flex-col items-center justify-center gap-0.5 rounded-lg text-ink-3 hover:bg-paper-2 hover:text-ink", b === e ? "cursor-grabbing" : "cursor-grab"),
								onPointerDown: (t) => {
									try {
										t.currentTarget.setPointerCapture(t.pointerId);
									} catch {}
									C(e);
								},
								onPointerMove: (t) => {
									if (S.current !== e) return;
									let n = document.elementFromPoint(t.clientX, t.clientY)?.closest("[data-file-id]"), r = n?.getAttribute("data-file-id");
									r && r !== e && a.current?.contains(n ?? null) && ae(e, k.current.indexOf(r));
								},
								onPointerUp: () => C(null),
								onPointerCancel: () => C(null),
								onKeyDown: (n) => {
									(n.key === "ArrowUp" || n.key === "ArrowDown") && (n.preventDefault(), ae(e, t + (n.key === "ArrowUp" ? -1 : 1)));
								},
								children: [/* @__PURE__ */ L("span", {
									className: "font-medium text-[0.75rem] tabular-nums",
									children: t + 1
								}), /* @__PURE__ */ L(bt, { className: "size-4" })]
							}) : null,
							i.startsWith("image/") ? /* @__PURE__ */ L("img", {
								src: Rn(`${U(n)}/assets/${e}`),
								alt: "",
								className: "size-14 rounded-lg object-cover"
							}) : /* @__PURE__ */ L("div", {
								className: "flex size-12 shrink-0 items-center justify-center rounded-lg bg-paper-2",
								children: i.startsWith("video/") ? /* @__PURE__ */ L(mt, { className: "size-5 text-ink-3" }) : /* @__PURE__ */ L(Wt, { className: "size-5 text-ink-3" })
							}),
							/* @__PURE__ */ L("div", {
								className: "min-w-0 flex-1 truncate text-[0.875rem]",
								children: r?.name ?? "✓"
							}),
							/* @__PURE__ */ L(te, {
								label: v("run.removeFile"),
								onClick: () => ie(e),
								children: /* @__PURE__ */ L(kn, { className: "size-4" })
							})
						]
					}, e);
				})
			}) : null,
			A ? /* @__PURE__ */ R("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ R("button", {
						type: "button",
						onClick: () => o.current?.click(),
						className: M(se, "min-w-[9rem] flex-1 px-4", _ && "border-ember text-ink"),
						children: [L(w ? St : Wt, { className: "size-6" }), l ? v("run.uploading") : O.length ? v("run.uploadMore") : v(Zn ? "run.uploadTouch" : "run.upload")]
					}),
					D ? /* @__PURE__ */ R("button", {
						type: "button",
						onClick: () => Qn ? g(!0) : s.current?.click(),
						className: M(se, "w-28"),
						children: [/* @__PURE__ */ L(We, { className: "size-6" }), v("run.camera")]
					}) : null,
					ee && !(Qn && Dr) ? /* @__PURE__ */ R("button", {
						type: "button",
						onClick: () => c.current?.click(),
						className: M(se, "w-28"),
						children: [/* @__PURE__ */ L(Dn, { className: "size-6" }), v("camera.video")]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ L("input", {
				ref: o,
				type: "file",
				hidden: !0,
				multiple: T,
				accept: w ? "image/*" : void 0,
				onChange: (e) => {
					ne(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}),
			/* @__PURE__ */ L("input", {
				ref: s,
				type: "file",
				hidden: !0,
				accept: "image/*",
				capture: "environment",
				onChange: (e) => {
					ne(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}),
			ee ? /* @__PURE__ */ L("input", {
				ref: c,
				type: "file",
				hidden: !0,
				accept: "video/*",
				capture: "environment",
				onChange: (e) => {
					ne(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}) : null,
			/* @__PURE__ */ L(Or, {
				open: h,
				multiple: T,
				video: ee,
				onClose: () => g(!1),
				onCapture: (e) => ne([e]),
				onNative: () => s.current?.click()
			}),
			T && (e.min || e.max) ? /* @__PURE__ */ L("div", {
				className: "mt-2 text-[0.8125rem] text-ink-3 tabular-nums",
				children: e.min && O.length < e.min ? v("run.filesMin", {
					n: O.length,
					min: e.min
				}) : e.max ? v("run.filesOf", {
					n: O.length,
					max: e.max
				}) : null
			}) : null,
			p ? /* @__PURE__ */ L("div", {
				className: "mt-2 text-[0.8125rem] text-rose",
				children: p
			}) : null
		]
	});
}
function Ji(e) {
	let t = `${e.id} ${e.label}`.toLowerCase();
	return /telefon|phone|handy|mobil(?!it)|\btel\b|rückruf/.test(t) ? {
		type: "tel",
		inputMode: "tel",
		autoComplete: "tel"
	} : /\bplz\b|postleitzahl|postal|zip/.test(t) ? {
		inputMode: "numeric",
		autoComplete: "postal-code"
	} : /iban/.test(t) ? {
		autoCapitalize: "characters",
		autoCorrect: "off",
		spellCheck: !1
	} : /vorname|first.?name/.test(t) ? {
		autoComplete: "given-name",
		autoCapitalize: "words"
	} : /nachname|last.?name|surname/.test(t) ? {
		autoComplete: "family-name",
		autoCapitalize: "words"
	} : /firma|unternehmen|company|organi[sz]ation/.test(t) ? {
		autoComplete: "organization",
		autoCapitalize: "words"
	} : /straße|strasse|street|anschrift|adresse|address/.test(t) ? {
		autoComplete: "street-address",
		autoCapitalize: "words"
	} : /\b(ort|stadt|city|town)\b/.test(t) ? {
		autoComplete: "address-level2",
		autoCapitalize: "words"
	} : /\bname\b|ansprechp/.test(t) ? {
		autoComplete: "name",
		autoCapitalize: "words"
	} : { autoCapitalize: "sentences" };
}
function Yi({ field: e, value: t, onChange: n }) {
	let [r, i] = F(!1);
	return /* @__PURE__ */ R("div", {
		className: "flex gap-2",
		children: [
			/* @__PURE__ */ L(k, {
				value: t,
				placeholder: e.placeholder,
				autoCapitalize: "off",
				autoCorrect: "off",
				spellCheck: !1,
				onChange: (e) => n(e.target.value)
			}),
			/* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => i(!0),
				className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-input bg-card px-3.5 font-medium text-[0.875rem] text-ink-2 transition hover:border-ember hover:text-ink",
				children: [
					/* @__PURE__ */ L(sn, { className: "size-4" }),
					" ",
					v("scan.button")
				]
			}),
			/* @__PURE__ */ L(ui, {
				open: r,
				onClose: () => i(!1),
				onResult: n
			})
		]
	});
}
var Xi = 4;
function Zi(e) {
	let t = /* @__PURE__ */ new Map(), n = e.map((e) => ({
		value: e,
		slot: r(e)
	})).filter((e) => e.slot).sort((e, t) => Date.parse(e.value) - Date.parse(t.value));
	for (let { value: e, slot: r } of n) {
		if (!r) continue;
		let n = t.get(r.day) ?? {
			label: c(e, x),
			times: []
		};
		n.times.push({
			value: e,
			time: r.time
		}), t.set(r.day, n);
	}
	return [...t.values()];
}
function Qi({ name: e, label: t, options: n, value: r, onChange: i, disabled: a }) {
	let o = Zi(n), s = o.findIndex((e) => e.times.some((e) => e.value === r)), [c, l] = F(s >= Xi);
	if (!o.length) return /* @__PURE__ */ L("p", {
		className: "text-[0.875rem] text-ink-3",
		children: v("slot.none")
	});
	let u = c ? o : o.slice(0, Xi);
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ R("fieldset", {
			className: "flex min-w-0 flex-col gap-4",
			children: [/* @__PURE__ */ L("legend", {
				className: "sr-only",
				children: t
			}), u.map((t) => /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ L("div", {
				className: "mb-2 font-medium text-[0.75rem] text-ink-3",
				children: t.label
			}), /* @__PURE__ */ L("div", {
				className: "flex flex-wrap gap-2",
				children: t.times.map((n) => /* @__PURE__ */ R("label", {
					className: "relative",
					children: [/* @__PURE__ */ L("input", {
						type: "radio",
						name: `slot-${e}`,
						value: n.value,
						checked: n.value === r,
						disabled: a.has(n.value),
						"aria-label": `${t.label}, ${n.time}`,
						onChange: () => i(n.value),
						className: "peer sr-only"
					}), /* @__PURE__ */ L("span", {
						className: M("inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm tabular-nums transition coarse:h-11", "border-input bg-card text-ink-2 hover:border-ink-4 hover:text-ink", "peer-checked:border-ember peer-checked:bg-ember-tint peer-checked:text-ink", "peer-disabled:pointer-events-none peer-disabled:line-through peer-disabled:opacity-60", "peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus-line) peer-focus-visible:outline-solid"),
						children: n.time
					})]
				}, n.value))
			})] }, t.label))]
		}), o.length > u.length ? /* @__PURE__ */ L("button", {
			type: "button",
			onClick: () => l(!0),
			className: "self-start text-[0.8125rem] text-ink-3 underline-offset-4 transition hover:text-ink hover:underline coarse:min-h-11",
			children: v("slot.later")
		}) : null]
	});
}
function $i({ cards: e, value: t, multi: n, runId: r, onChange: i, disabled: a }) {
	let o = new Set(n ? Array.isArray(t) ? t.map(String) : [] : t == null || t === "" ? [] : [String(t)]), s = (e) => {
		i(n ? o.has(e) ? [...o].filter((t) => t !== e) : [...o, e] : o.has(e) ? "" : e);
	}, c = (e) => /^(https?:|data:|\/)/.test(e) ? e : Rn(`/api/runs/${r}/assets/${e}`);
	return /* @__PURE__ */ L("div", {
		className: "grid gap-3",
		style: { gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr))" },
		children: e.map((e) => {
			let t = o.has(e.value), n = a.has(e.value);
			return /* @__PURE__ */ R("div", {
				className: M("flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border-soft transition", t && "ring-2 ring-ember", n && "opacity-50"),
				children: [e.image ? /* @__PURE__ */ L("img", {
					src: c(e.image),
					alt: "",
					className: "aspect-square w-full object-cover"
				}) : null, /* @__PURE__ */ R("div", {
					className: "flex flex-1 flex-col gap-1 p-3",
					children: [
						/* @__PURE__ */ L("div", {
							className: "font-medium text-[0.9375rem] leading-snug",
							children: e.label
						}),
						e.subtitle ? /* @__PURE__ */ L("div", {
							className: "text-[0.8125rem] text-ink-3 leading-snug",
							children: e.subtitle
						}) : null,
						e.meta ? /* @__PURE__ */ L("div", {
							className: "mt-auto pt-1 font-display font-semibold text-[0.9375rem] tabular-nums",
							children: e.meta
						}) : null,
						/* @__PURE__ */ R("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ L("button", {
								type: "button",
								"aria-pressed": t,
								disabled: n,
								onClick: () => s(e.value),
								className: M("inline-flex h-9 flex-1 items-center justify-center rounded-full px-3 text-[0.8125rem] transition coarse:h-11", t ? "bg-ember text-ember-on" : "bg-paper-2 text-ink-2 hover:text-ink"),
								children: v(t ? "cards.picked" : "cards.pick")
							}), e.link ? /* @__PURE__ */ L("a", {
								href: e.link,
								target: "_blank",
								rel: "noopener",
								className: "inline-flex h-9 items-center rounded-full px-3 text-[0.8125rem] text-ink-2 ring-1 ring-border-soft hover:text-ink coarse:h-11",
								children: v("cards.open")
							}) : null]
						})
					]
				})]
			}, e.value);
		})
	});
}
function ea({ field: e, value: t, values: n, runId: r, view: i, onChange: a, onBusy: o, error: s, closed: c }) {
	let l = t == null ? "" : String(t), u = new Set(c?.values.map(String)), d;
	switch (e.kind) {
		case "textarea":
			d = /* @__PURE__ */ L(j, {
				value: l,
				placeholder: e.placeholder,
				autoCapitalize: "sentences",
				enterKeyHint: "enter",
				onChange: (e) => a(e.target.value)
			});
			break;
		case "number":
			d = /* @__PURE__ */ L(k, {
				inputMode: "decimal",
				autoComplete: "off",
				value: l,
				placeholder: e.placeholder,
				onChange: (e) => a(e.target.value)
			});
			break;
		case "select": {
			let n = e.options ?? [], o = i?.cards?.[e.id];
			d = o?.length ? /* @__PURE__ */ L($i, {
				cards: o,
				value: t,
				multi: !1,
				runId: r,
				onChange: a,
				disabled: u
			}) : n.length <= 5 && n.every((e) => e.length <= 28) ? /* @__PURE__ */ L(re, {
				value: l,
				options: n,
				onChange: a,
				disabled: [...u],
				label: C
			}) : /* @__PURE__ */ L(ie, {
				value: l,
				placeholder: "—",
				onChange: a,
				options: n.map((e) => ({
					value: e,
					label: C(e),
					disabled: u.has(e)
				}))
			});
			break;
		}
		case "slot":
			d = /* @__PURE__ */ L(Qi, {
				name: e.id,
				label: e.label,
				options: e.options ?? [],
				value: l,
				onChange: a,
				disabled: u
			});
			break;
		case "multiselect": {
			let n = i?.cards?.[e.id];
			d = n?.length ? /* @__PURE__ */ L($i, {
				cards: n,
				value: t,
				multi: !0,
				runId: r,
				onChange: a,
				disabled: u
			}) : /* @__PURE__ */ L(re, {
				multi: !0,
				value: Array.isArray(t) ? t : [],
				options: e.options ?? [],
				onChange: a,
				label: C
			});
			break;
		}
		case "date":
			d = /* @__PURE__ */ L(k, {
				type: "date",
				value: l,
				onChange: (e) => a(e.target.value),
				className: "w-full sm:w-56"
			});
			break;
		case "email":
			d = /* @__PURE__ */ L(k, {
				type: "email",
				inputMode: "email",
				autoComplete: "email",
				autoCapitalize: "off",
				autoCorrect: "off",
				spellCheck: !1,
				value: l,
				placeholder: e.placeholder,
				onChange: (e) => a(e.target.value)
			});
			break;
		case "url":
			d = /* @__PURE__ */ L(k, {
				type: "url",
				inputMode: "url",
				autoComplete: "url",
				autoCapitalize: "off",
				autoCorrect: "off",
				spellCheck: !1,
				value: l,
				placeholder: e.placeholder ?? "https://",
				onChange: (e) => a(e.target.value)
			});
			break;
		case "toggle":
			d = /* @__PURE__ */ L(se, {
				checked: t === !0,
				onChange: a,
				label: e.label,
				disabled: u.has(String(t !== !0))
			});
			break;
		case "color":
			d = /* @__PURE__ */ R("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ L(oe, {
					value: l || "#e0531b",
					onChange: (e) => a(e.target.value)
				}), /* @__PURE__ */ L(k, {
					value: l,
					placeholder: "#e0531b",
					autoCapitalize: "off",
					autoCorrect: "off",
					spellCheck: !1,
					onChange: (e) => a(e.target.value),
					className: "w-36"
				})]
			});
			break;
		case "image":
		case "file":
			d = /* @__PURE__ */ L(qi, {
				field: e,
				value: t,
				runId: r,
				onChange: a,
				onBusy: o
			});
			break;
		case "items":
			d = /* @__PURE__ */ L(Gi, {
				field: e,
				value: t,
				values: n,
				onChange: a
			});
			break;
		case "connection":
			d = /* @__PURE__ */ L(Ai, {
				runId: r,
				connection: i?.connections.find((t) => t.id === e.connection)
			});
			break;
		case "list": {
			let t = i?.lists.find((t) => t.def.id === e.list);
			d = t ? /* @__PURE__ */ L(Ni, {
				runId: r,
				list: t,
				editable: !0
			}) : null;
			break;
		}
		case "location":
			d = /* @__PURE__ */ L(oi, {
				value: t,
				runId: r,
				placeholder: e.placeholder,
				onChange: a,
				onBusy: o
			});
			break;
		case "audio":
			d = c ? null : /* @__PURE__ */ L(Wi, {
				value: t,
				runId: r,
				onChange: a,
				onBusy: o
			});
			break;
		case "signature":
			d = /* @__PURE__ */ L(_i, {
				label: e.label,
				value: t,
				runId: r,
				onChange: a
			});
			break;
		default: d = e.scan ? /* @__PURE__ */ L(Yi, {
			field: e,
			value: l,
			onChange: a
		}) : /* @__PURE__ */ L(k, {
			...Ji(e),
			value: l,
			placeholder: e.placeholder,
			onChange: (e) => a(e.target.value)
		});
	}
	return /* @__PURE__ */ R("div", { children: [
		e.kind === "toggle" ? /* @__PURE__ */ R("div", {
			className: "flex items-start justify-between gap-6",
			children: [/* @__PURE__ */ L(A, {
				hint: e.help,
				children: e.label
			}), d]
		}) : /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L(A, {
			hint: e.help,
			required: e.required,
			children: e.label
		}), d] }),
		c ? /* @__PURE__ */ L("div", {
			className: "mt-1.5 text-[0.8125rem] text-ink-3",
			children: v("run.closed", { list: c.classes.map((e) => v(`run.cls.${ta(e)}`)).join(", ") })
		}) : null,
		s ? /* @__PURE__ */ L("div", {
			className: "mt-1.5 text-[0.8125rem] text-rose",
			children: s
		}) : null
	] });
}
function ta(e) {
	return e in na ? na[e] : e === "account" ? "account" : "text";
}
var na = {
	classifier: "text",
	low: "text",
	standard: "text",
	high: "text",
	image: "image",
	video: "video",
	speech: "speech",
	audio: "audio"
}, ra = 3e3, ia = /* @__PURE__ */ new Set();
function aa(e, t, n) {
	let r = `${e.family}\n${e.url}`;
	if (ia.has(r)) return;
	ia.add(r);
	let i = !1, a = setTimeout(() => i || n(), ra), o = () => {
		i = !0, clearTimeout(a);
	}, s = () => {
		o(), n();
	};
	if (e.stylesheet) {
		let n = document.createElement("link");
		n.rel = "stylesheet", n.href = t, n.onerror = s, n.onload = () => {
			document.fonts.load(`1em "${e.family.replace(/"/g, "")}"`).then((e) => e.length ? o() : s(), s);
		}, document.head.append(n);
		return;
	}
	new FontFace(e.family, `url("${t.replace(/["\\\n]/g, encodeURIComponent)}")`, {
		display: "swap",
		weight: "100 900"
	}).load().then((e) => {
		document.fonts.add(e), o();
	}, s);
}
//#endregion
//#region ../../node_modules/.pnpm/dompurify@3.4.16/node_modules/dompurify/dist/purify.es.mjs
function oa(e, t) {
	this.v = e, this.k = t;
}
function sa(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ca(e) {
	if (Array.isArray(e)) return e;
}
function la(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function ua() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function da(e, t) {
	return ca(e) || la(e, t) || fa(e, t) || ua();
}
function fa(e, t) {
	if (e) {
		if (typeof e == "string") return sa(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? sa(e, t) : void 0;
	}
}
function pa(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof oa;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
pa.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, pa.prototype.next = function(e) {
	return this._invoke("next", e);
}, pa.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, pa.prototype.return = function(e) {
	return this._invoke("return", e);
};
var ma = Object.entries, ha = Object.setPrototypeOf, ga = Object.isFrozen, _a = Object.getPrototypeOf, va = Object.getOwnPropertyDescriptor, W = Object.freeze, G = Object.seal, ya = Object.create, ba = typeof Reflect < "u" && Reflect, xa = ba.apply, Sa = ba.construct;
W ||= function(e) {
	return e;
}, G ||= function(e) {
	return e;
}, xa ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Sa ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Ca = J(Array.prototype.forEach);
Array.prototype.indexOf;
var wa = J(Array.prototype.lastIndexOf), Ta = J(Array.prototype.pop), Ea = J(Array.prototype.push);
Array.prototype.slice;
var Da = J(Array.prototype.splice), Oa = Array.isArray, ka = J(String.prototype.toLowerCase), Aa = J(String.prototype.toString), ja = J(String.prototype.match), Ma = J(String.prototype.replace), Na = J(String.prototype.indexOf), Pa = J(String.prototype.trim), Fa = J(Number.prototype.toString), Ia = J(Boolean.prototype.toString), La = typeof BigInt > "u" ? null : J(BigInt.prototype.toString), Ra = typeof Symbol > "u" ? null : J(Symbol.prototype.toString), K = J(Object.prototype.hasOwnProperty), za = J(Object.prototype.toString), q = J(RegExp.prototype.test), Ba = Va(TypeError);
function J(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return xa(e, t, n);
	};
}
function Va(e) {
	return function() {
		return Sa(e, [...arguments]);
	};
}
function Y(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ka;
	if (ha && ha(e, null), !Oa(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (ga(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Ha(e) {
	for (let t = 0; t < e.length; t++) K(e, t) || (e[t] = null);
	return e;
}
function Ua(e) {
	let t = ya(null);
	for (let r of ma(e)) {
		var n = da(r, 2);
		let i = n[0], a = n[1];
		K(e, i) && (t[i] = Oa(a) ? Ha(a) : a && typeof a == "object" && a.constructor === Object ? Ua(a) : a);
	}
	return t;
}
function Wa(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Fa(e);
		case "boolean": return Ia(e);
		case "bigint": return La ? La(e) : "0";
		case "symbol": return Ra ? Ra(e) : "Symbol()";
		case "undefined": return za(e);
		case "function":
		case "object": {
			if (e === null) return za(e);
			let t = e, n = Ga(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : za(e);
			}
			return za(e);
		}
		default: return za(e);
	}
}
function Ga(e, t) {
	for (; e !== null;) {
		let n = va(e, t);
		if (n) {
			if (n.get) return J(n.get);
			if (typeof n.value == "function") return J(n.value);
		}
		e = _a(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Ka(e) {
	try {
		return q(e, ""), !0;
	} catch {
		return !1;
	}
}
var qa = W(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Ja = W(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), Ya = W([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), Xa = W([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Za = W(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Qa = W([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), $a = W(["#text"]), eo = W(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), to = W(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), no = W(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), ro = W([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), io = G(/{{[\w\W]*|^[\w\W]*}}/g), ao = G(/<%[\w\W]*|^[\w\W]*%>/g), oo = G(/\${[\w\W]*/g), so = G(/^data-[\-\w.\u00B7-\uFFFF]+$/), co = G(/^aria-[\-\w]+$/), lo = G(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), uo = G(/^(?:\w+script|data):/i), fo = G(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), po = G(/^html$/i), mo = G(/^[a-z][.\w]*(-[.\w]+)+$/i), ho = G(/<[/\w!]/g), go = G(/<[/\w]/g), _o = G(/<\/no(script|embed|frames)/i), vo = G(/\/>/i), yo = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, bo = [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
], xo = W(Y({}, bo)), So = function() {
	let e = {};
	return Ca(bo, (t) => {
		e[t] = G(RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
	}), W(e);
}(), Co = function() {
	return typeof window > "u" ? null : window;
}, wo = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, To = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, Eo = function(e, t, n, r) {
	return K(e, t) && Oa(e[t]) ? Y(r.base ? Ua(r.base) : {}, e[t], r.transform) : n;
}, Do = function(e, t, n) {
	let r = K(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? Ua(r) : n();
};
function Oo() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Co(), t = (e) => Oo(e);
	if (t.version = "3.4.16", t.removed = [], !e || !e.document || e.document.nodeType !== yo.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = Ga(d, "cloneNode"), p = Ga(d, "remove"), m = Ga(d, "removeAttributeNode"), h = Ga(d, "nextSibling"), g = Ga(d, "childNodes"), _ = Ga(d, "parentNode"), v = Ga(d, "shadowRoot"), y = Ga(d, "attributes"), b = o && o.prototype ? Ga(o.prototype, "nodeType") : null, x = o && o.prototype ? Ga(o.prototype, "nodeName") : null, S = o && o.prototype ? Ga(o.prototype, "ownerDocument") : null, C = function(e) {
		return b ? b(e) : e.nodeType;
	}, w = function(e) {
		return x ? x(e) : e.nodeName;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let T, E = "", D, ee = !1, O = 0, te = function() {
		if (O > 0) throw Ba("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, k = function(e) {
		te(), O++;
		try {
			return T.createHTML(e);
		} finally {
			O--;
		}
	}, A = function(e) {
		te(), O++;
		try {
			return T.createScriptURL(e);
		} finally {
			O--;
		}
	}, ne = function() {
		return ee ||= (D = wo(u, i), !0), D;
	}, re = n, ie = re.implementation, ae = re.createNodeIterator, oe = re.createDocumentFragment, se = re.getElementsByTagName, ce = r.importNode, j = To();
	t.isSupported = typeof ma == "function" && typeof _ == "function" && ie && ie.createHTMLDocument !== void 0;
	let M = io, le = ao, ue = oo, de = so, fe = co, N = uo, pe = fo, me = mo, P = lo, F = null, he = Y({}, [
		...qa,
		...Ja,
		...Ya,
		...Za,
		...$a
	]), I = null, L = Y({}, [
		...eo,
		...to,
		...no,
		...ro
	]), R = Object.seal(ya(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), ge = null, _e = null, ve = Object.seal(ya(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), ye = !0, be = !0, xe = !1, Se = !0, Ce = !1, we = !0, Te = !1, Ee = !1, De = null, Oe = null, z = !1, ke = !1, Ae = !1, je = !1, Me = !0, Ne = !1, Pe = "user-content-", Fe = !0, Ie = !1, Le = {}, Re = null, ze = Y({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Be = null, Ve = Y({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), He = null, Ue = Y({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), We = "http://www.w3.org/1998/Math/MathML", Ge = "http://www.w3.org/2000/svg", B = "http://www.w3.org/1999/xhtml", Ke = B, qe = !1, Je = null, Ye = Y({}, [
		We,
		Ge,
		B
	], Aa), Xe = W([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), Ze = Y({}, Xe), Qe = W(["annotation-xml"]), $e = Y({}, Qe), et = Y({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), tt = null, nt = ["application/xhtml+xml", "text/html"], V = null, rt = null, it = n.createElement("form"), at = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, ot = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (rt && rt === e) return;
		(!e || typeof e != "object") && (e = {}), e = Ua(e), tt = nt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, V = tt === "application/xhtml+xml" ? Aa : ka, F = Eo(e, "ALLOWED_TAGS", he, { transform: V }), I = Eo(e, "ALLOWED_ATTR", L, { transform: V }), Je = Eo(e, "ALLOWED_NAMESPACES", Ye, { transform: Aa }), He = Eo(e, "ADD_URI_SAFE_ATTR", Ue, {
			transform: V,
			base: Ue
		}), Be = Eo(e, "ADD_DATA_URI_TAGS", Ve, {
			transform: V,
			base: Ve
		}), Re = Eo(e, "FORBID_CONTENTS", ze, { transform: V }), ge = Eo(e, "FORBID_TAGS", Ua({}), { transform: V }), _e = Eo(e, "FORBID_ATTR", Ua({}), { transform: V }), Le = K(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? Ua(e.USE_PROFILES) : e.USE_PROFILES : !1, ye = e.ALLOW_ARIA_ATTR !== !1, be = e.ALLOW_DATA_ATTR !== !1, xe = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Se = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ce = e.SAFE_FOR_TEMPLATES || !1, we = e.SAFE_FOR_XML !== !1, Te = e.WHOLE_DOCUMENT || !1, ke = e.RETURN_DOM || !1, Ae = e.RETURN_DOM_FRAGMENT || !1, je = e.RETURN_TRUSTED_TYPE || !1, z = e.FORCE_BODY || !1, Me = e.SANITIZE_DOM !== !1, Ne = e.SANITIZE_NAMED_PROPS || !1, Fe = e.KEEP_CONTENT !== !1, Ie = e.IN_PLACE || !1, P = Ka(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : lo, Ke = typeof e.NAMESPACE == "string" ? e.NAMESPACE : B, Ze = Do(e, "MATHML_TEXT_INTEGRATION_POINTS", () => Y({}, Xe)), $e = Do(e, "HTML_INTEGRATION_POINTS", () => Y({}, Qe));
		let t = Do(e, "CUSTOM_ELEMENT_HANDLING", () => ya(null));
		if (R = ya(null), K(t, "tagNameCheck") && at(t.tagNameCheck) && (R.tagNameCheck = t.tagNameCheck), K(t, "attributeNameCheck") && at(t.attributeNameCheck) && (R.attributeNameCheck = t.attributeNameCheck), K(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (R.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), G(R), Ce && (be = !1), Ae && (ke = !0), Le && (F = Y({}, $a), I = ya(null), Le.html === !0 && (Y(F, qa), Y(I, eo)), Le.svg === !0 && (Y(F, Ja), Y(I, to), Y(I, ro)), Le.svgFilters === !0 && (Y(F, Ya), Y(I, to), Y(I, ro)), Le.mathMl === !0 && (Y(F, Za), Y(I, no), Y(I, ro))), ve.tagCheck = null, ve.attributeCheck = null, K(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? ve.tagCheck = e.ADD_TAGS : Oa(e.ADD_TAGS) && (F === he && (F = Ua(F)), Y(F, e.ADD_TAGS, V))), K(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? ve.attributeCheck = e.ADD_ATTR : Oa(e.ADD_ATTR) && (I === L && (I = Ua(I)), Y(I, e.ADD_ATTR, V))), K(e, "ADD_FORBID_CONTENTS") && Oa(e.ADD_FORBID_CONTENTS) && (Re === ze && (Re = Ua(Re)), Y(Re, e.ADD_FORBID_CONTENTS, V)), Fe && (F["#text"] = !0), Te && Y(F, [
			"html",
			"head",
			"body"
		]), F.table && (Y(F, ["tbody"]), delete ge.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw Ba("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw Ba("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = T;
			T = e.TRUSTED_TYPES_POLICY;
			try {
				E = k("");
			} catch (e) {
				throw T = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (T = void 0, E = "") : (T === void 0 && (T = ne()), T && typeof E == "string" && (E = k("")));
		W && W(e), rt = e;
	}, st = Y({}, [
		...Ja,
		...Ya,
		...Xa
	]), ct = Y({}, [...Za, ...Qa]), lt = function(e, t, n) {
		return t.namespaceURI === B ? e === "svg" : t.namespaceURI === We ? e === "svg" && (n === "annotation-xml" || Ze[n]) : !!st[e];
	}, ut = function(e, t, n) {
		return t.namespaceURI === B ? e === "math" : t.namespaceURI === Ge ? e === "math" && $e[n] : !!ct[e];
	}, dt = function(e, t, n) {
		return t.namespaceURI === Ge && !$e[n] || t.namespaceURI === We && !Ze[n] ? !1 : !ct[e] && (et[e] || !st[e]);
	}, ft = function(e) {
		let t = _(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ke,
			tagName: "template"
		});
		let n = ka(e.tagName), r = ka(t.tagName);
		return Je[e.namespaceURI] ? e.namespaceURI === Ge ? lt(n, t, r) : e.namespaceURI === We ? ut(n, t, r) : e.namespaceURI === B ? dt(n, t, r) : !!(tt === "application/xhtml+xml" && Je[e.namespaceURI]) : !1;
	}, pt = function(e) {
		Ea(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw Ba("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, mt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, ht = function(e) {
		vt(e);
		let t = g(e);
		if (t) {
			let e = [];
			Ca(t, (t) => {
				Ea(e, t);
			}), Ca(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = y(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && mt(e, r, i);
		}
	}, gt = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Ea(t.removed, {
			attribute: r || null,
			from: n
		});
		try {
			r ? m(n, r) : n.removeAttribute(e);
		} catch {
			try {
				n.removeAttribute(e);
			} catch {}
		}
		if (e === "is") {
			if (ke || Ae) try {
				pt(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, _t = function(e) {
		let t = y(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || I[V(i)] || mt(e, r, i);
		}
	}, vt = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			C(e) === yo.element && _t(e);
			let n = g(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, yt = function(e, t) {
		return we ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, bt = function(e) {
		if (!we) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = C(e);
			if (n === yo.processingInstruction || n === yo.comment && q(go, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === yo.element) {
				let t = e, n = V(w(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && yt("for", n) && t.removeAttribute("for");
				} catch {}
			}
			let r = g(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, xt = function(e) {
		let t = null, r = null;
		if (z) e = "<remove></remove>" + e;
		else {
			let t = ja(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		tt === "application/xhtml+xml" && Ke === B && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = T ? k(e) : e;
		if (Ke === B) try {
			t = new l().parseFromString(i, tt);
		} catch {}
		if (!t || !t.documentElement) {
			t = ie.createDocument(Ke, "template", null);
			try {
				t.documentElement.innerHTML = qe ? E : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ke === B ? se.call(t, Te ? "html" : "body")[0] : Te ? t.documentElement : a;
	}, St = function(e) {
		let t = S ? S(e) : e.ownerDocument;
		return ae.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Ct = function(e) {
		return e = Ma(e, M, " "), e = Ma(e, le, " "), e = Ma(e, ue, " "), e;
	}, wt = function(e) {
		e.normalize();
		let t = S ? S(e) : e.ownerDocument, n = ae.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Ct(r.data), r = n.nextNode();
		let i = e.querySelectorAll?.call(e, "template");
		i && Ca(i, (e) => {
			Et(e.content) && wt(e.content);
		});
	}, Tt = function(e) {
		let t = x ? x(e) : null;
		return typeof t != "string" || V(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== y(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== b(e) || e.childNodes !== g(e);
	}, Et = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return b(e) === yo.documentFragment;
		} catch {
			return !1;
		}
	}, Dt = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return typeof b(e) == "number";
		} catch {
			return !1;
		}
	};
	function Ot(e, n, r) {
		e.length !== 0 && Ca(e, (e) => {
			e.call(t, n, r, rt);
		});
	}
	let kt = function(e, t) {
		return !!(we && e.hasChildNodes() && !Dt(e.firstElementChild) && q(ho, e.textContent) && q(ho, e.innerHTML) || we && e.namespaceURI === B && xo[t] && (Dt(e.firstElementChild) || typeof e.textContent == "string" && q(So[t], e.textContent)) || e.nodeType === yo.processingInstruction || we && e.nodeType === yo.comment && q(go, e.data));
	}, At = function(e, t) {
		return e instanceof RegExp ? q(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, jt = function(e, t, n) {
		if (!ge[t] && Lt(t) && At(R.tagNameCheck, t)) return !1;
		if (Fe && !Re[t]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return pt(e), !0;
	}, Mt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? Ua(t) : t;
	}, Nt = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ie && vt(e), !0);
	}, Pt = function(e, n) {
		if (Ot(j.beforeSanitizeElements, e, null), Nt(e, n)) return !0;
		if (Tt(e)) return pt(e), !0;
		let r = V(w(e));
		if (F = Mt(j.uponSanitizeElement, F, he, De), Ot(j.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: F
		}), Nt(e, n)) return !0;
		if (kt(e, r)) return pt(e), !0;
		if (ge[r] || !(ve.tagCheck instanceof Function && ve.tagCheck(r)) && !F[r]) {
			let t = jt(e, r, n);
			return t === !1 && (Ot(j.afterSanitizeElements, e, null), Nt(e, n)) ? !0 : t;
		}
		if (C(e) === yo.element && !ft(e) || (r === "noscript" || r === "noembed" || r === "noframes") && q(_o, e.innerHTML)) return pt(e), !0;
		if (Ce && e.nodeType === yo.text) {
			let n = Ct(e.textContent);
			e.textContent !== n && (Ea(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return Ot(j.afterSanitizeElements, e, null), Nt(e, n);
	}, Ft = function(e, t, r) {
		if (_e[t] || yt(t, e) || Me && (t === "id" || t === "name") && (r in n || r in it)) return !1;
		let i = I[t] || ve.attributeCheck instanceof Function && ve.attributeCheck(t, e);
		return be && q(de, t) || ye && q(fe, t) ? !0 : i ? He[t] || q(P, Ma(r, pe, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Na(r, "data:") === 0 && Be[e] || xe && !q(N, Ma(r, pe, "")) ? !0 : !r : Lt(e) && At(R.tagNameCheck, e) && At(R.attributeNameCheck, t, e) || t === "is" && R.allowCustomizedBuiltInElements && At(R.tagNameCheck, r);
	}, It = Y({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Lt = function(e) {
		return !It[ka(e)] && q(me, e);
	}, Rt = function(e, t, n, r) {
		if (T && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return k(r);
			case "TrustedScriptURL": return A(r);
		}
		return r;
	}, zt = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Tt(e) || (pt(e), !1);
		} catch {
			return gt(t, e), !1;
		}
	}, Bt = function(e, n) {
		if (Ot(j.beforeSanitizeAttributes, e, null), Nt(e, n)) return;
		let r = e.attributes;
		if (!r || Tt(e)) return;
		I = Mt(j.uponSanitizeAttribute, I, L, Oe);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: I,
			forceKeepAttr: void 0
		}, a = r.length, o = V(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = V(s), d = l, f = s === "value" ? d : Pa(d), p = !1;
			if (i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, Ot(j.uponSanitizeAttribute, e, i), f = i.attrValue, Ne && (u === "id" || u === "name") && Na(f, Pe) !== 0 && (gt(s, e, n), f = Pe + f, p = !0), we && q(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, f)) {
				gt(s, e, n);
				continue;
			}
			if (u === "attributename" && ja(f, "href")) {
				gt(s, e, n);
				continue;
			}
			if (!i.forceKeepAttr) {
				if (!i.keepAttr) {
					gt(s, e, n);
					continue;
				}
				if (!Se && q(vo, f)) {
					gt(s, e, n);
					continue;
				}
				if (Ce && (f = Ct(f)), !Ft(o, u, f)) {
					gt(s, e, n);
					continue;
				}
				f = Rt(o, u, c, f), f !== d && zt(e, s, c, f) && p && Ta(t.removed);
			}
		}
		Ot(j.afterSanitizeAttributes, e, null), Nt(e, n);
	}, Vt = function(e) {
		let t = null, n = St(e);
		for (Ot(j.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (Ot(j.uponSanitizeShadowNode, t, null), Pt(t, e), Bt(t, e), Et(t.content) && Vt(t.content), C(t) === yo.element) {
			let e = v(t);
			Et(e) && (Ht(e), Vt(e));
		}
		Ot(j.afterSanitizeShadowDOM, e, null);
	}, Ht = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				Vt(e.shadow);
				continue;
			}
			let n = e.node, r = C(n) === yo.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = x ? x(n) : null;
				if (typeof e == "string" && V(e) === "template") {
					let e = n.content;
					Et(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = v(n);
				Et(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (qe = !e, qe && (e = "<!-->"), typeof e != "string" && !Dt(e) && (e = Wa(e), typeof e != "string")) throw Ba("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Ee ? (F = De, I = Oe) : ot(n), (j.uponSanitizeElement.length > 0 || j.uponSanitizeAttribute.length > 0) && (F = Ua(F)), j.uponSanitizeAttribute.length > 0 && (I = Ua(I)), t.removed = [];
		let c = Ie && typeof e != "string" && Dt(e);
		if (c) {
			bt(e);
			let t = w(e);
			if (typeof t == "string") {
				let n = V(t);
				if (!F[n] || ge[n]) throw ht(e), Ba("root node is forbidden and cannot be sanitized in-place");
			}
			if (Tt(e)) throw ht(e), Ba("root node is clobbered and cannot be sanitized in-place");
			try {
				Ht(e);
			} catch (t) {
				throw ht(e), t;
			}
		} else if (Dt(e)) i = xt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === yo.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Ht(i);
		else {
			if (!ke && !Ce && !Te && e.indexOf("<") === -1) return T && je ? k(e) : e;
			if (i = xt(e), !i) return ke ? null : je ? E : "";
		}
		i && z && pt(i.firstChild);
		let l = c ? e : i;
		try {
			let e = St(l);
			for (; o = e.nextNode();) Pt(o, l), Bt(o, l), Et(o.content) && Vt(o.content);
		} catch (n) {
			throw c && (ht(e), Ca(t.removed, (e) => {
				e.element && vt(e.element);
			})), n;
		}
		if (c) {
			let n = !1;
			if (Ca(t.removed, (t) => {
				t.element && (t.element === e && (n = !0), vt(t.element));
			}), n) throw Ba("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Ce && wt(e), e;
		}
		if (ke) {
			if (Ce && wt(i), Ae) for (s = oe.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (I.shadowroot || I.shadowrootmode) && (s = ce.call(r, s, !0)), s;
		}
		let u = Te ? i.outerHTML : i.innerHTML;
		return Te && F["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && q(po, i.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u), Ce && (u = Ct(u)), T && je ? k(u) : u;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		ot(e), Ee = !0, De = F, Oe = I;
	}, t.clearConfig = function() {
		rt = null, Ee = !1, De = null, Oe = null, T = D, E = "";
	}, t.isValidAttribute = function(e, t, n) {
		rt || ot({});
		let r = V(e), i = V(t);
		return Ft(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && K(j, e) && Ea(j[e], t);
	}, t.removeHook = function(e, t) {
		if (K(j, e)) {
			if (t !== void 0) {
				let n = wa(j[e], t);
				return n === -1 ? void 0 : Da(j[e], n, 1)[0];
			}
			return Ta(j[e]);
		}
	}, t.removeHooks = function(e) {
		K(j, e) && (j[e] = []);
	}, t.removeAllHooks = function() {
		j = To();
	}, t;
}
var ko = Oo();
//#endregion
//#region ../../node_modules/.pnpm/marked@18.0.14/node_modules/marked/lib/marked.esm.js
function Ao() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var jo = Ao();
function Mo(e) {
	jo = e;
}
var No = { exec: () => null };
function Po(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function X(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(Z.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var Fo = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), Z = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	leadingSpaceTab: /^[ \t]+/,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/g,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: Po((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: Po((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: Po((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: Po((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: Po((e) => RegExp(`^ {0,${e}}(?:</?(?:${Xo})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")),
	blockquoteBeginRegex: Po((e) => RegExp(`^ {0,${e}}>`))
}, Io = /^(?:[ \t]*(?:\n|$))+/, Lo = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ro = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, zo = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Bo = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Vo = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Ho = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Uo = X(Ho).replace(/bull/g, Vo).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Wo = X(Ho).replace(/bull/g, Vo).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Go = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Ko = /^[^\n]+/, qo = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Jo = X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", qo).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Yo = X(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Vo).getRegex(), Xo = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Zo = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qo = X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Zo).replace("tag", Xo).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), $o = (e) => X(Go).replace("hr", zo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xo).getRegex(), es = $o(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), ts = $o(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), ns = {
	blockquote: X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ts).getRegex(),
	code: Lo,
	def: Jo,
	fences: Ro,
	heading: Bo,
	hr: zo,
	html: Qo,
	lheading: Uo,
	list: Yo,
	newline: Io,
	paragraph: es,
	table: No,
	text: Ko
}, rs = X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", zo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xo).getRegex(), is = {
	...ns,
	lheading: Wo,
	table: rs,
	paragraph: X(Go).replace("hr", zo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", rs).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xo).getRegex()
}, as = {
	...ns,
	html: X("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", Zo).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: No,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: X(Go).replace("hr", zo).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Uo).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, os = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ss = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, cs = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, ls = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, us = /[\p{P}\p{S}]/u, ds = /[\s\p{P}\p{S}]/u, fs = /[^\s\p{P}\p{S}]/u, ps = X(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ds).getRegex(), ms = /[\p{Pi}\p{Ps}"']/u, hs = /(?!~)[\p{P}\p{S}]/u, gs = /(?!~)[\s\p{P}\p{S}]/u, _s = /(?:[^\s\p{P}\p{S}]|~)/u, vs = X(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Fo ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), ys = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, bs = X(ys, "u").replace(/punct/g, us).getRegex(), xs = X(ys, "u").replace(/punct/g, hs).getRegex(), Ss = X(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, ms).replace(/punct/g, us).getRegex(), Cs = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", ws = X(Cs, "gu").replace(/notPunctSpace/g, fs).replace(/punctSpace/g, ds).replace(/punct/g, us).getRegex(), Ts = X(Cs, "gu").replace(/notPunctSpace/g, _s).replace(/punctSpace/g, gs).replace(/punct/g, hs).getRegex(), Es = X("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fs).replace(/punctSpace/g, ds).replace(/punct/g, us).getRegex(), Ds = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, fs).replace(/punctSpace/g, ds).replace(/punct/g, us).getRegex(), Os = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fs).replace(/punctSpace/g, ds).replace(/punct/g, us).getRegex(), ks = X(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, us).getRegex(), As = X("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fs).replace(/punctSpace/g, ds).replace(/punct/g, us).getRegex(), js = X(/\\(punct)/, "gu").replace(/punct/g, us).getRegex(), Ms = X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ns = X(Zo).replace("(?:-->|$)", "-->").getRegex(), Ps = X("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ns).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Fs = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, Is = X(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Fs).getRegex(), Ls = X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", Is).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Rs = X(/^!?\[(label)\]\[(ref)\]/).replace("label", Is).replace("ref", qo).getRegex(), zs = X(/^!?\[(ref)\](?:\[\])?/).replace("ref", qo).getRegex(), Bs = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Vs = X(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Fs).getRegex(), Hs = X("reflink|nolink(?!\\()", "g").replace("reflink", X(/^!?\[(label)\]\[(ref)\]/).replace("label", Vs).replace("ref", Bs).getRegex()).replace("nolink", X(/^!?\[(ref)\](?:\[\])?/).replace("ref", Bs).getRegex()).getRegex(), Us = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Ws = X(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), Gs = {
	_backpedal: No,
	anyPunctuation: js,
	autolink: Ms,
	blockSkip: vs,
	br: cs,
	code: ss,
	del: No,
	delLDelim: No,
	delRDelim: No,
	emStrongLDelim: bs,
	emStrongRDelimAst: ws,
	emStrongRDelimUnd: Ds,
	escape: os,
	link: Ls,
	nolink: zs,
	punctuation: ps,
	reflink: Rs,
	reflinkSearch: Hs,
	tag: Ps,
	text: ls,
	url: No
}, Ks = {
	...Gs,
	emStrongLDelim: Ss,
	emStrongRDelimAst: Es,
	emStrongRDelimUnd: Os,
	link: X(/^!?\[(label)\]\((.*?)\)/).replace("label", Is).getRegex(),
	reflink: X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Is).getRegex()
}, qs = {
	...Gs,
	emStrongRDelimAst: Ts,
	emStrongLDelim: xs,
	delLDelim: ks,
	delRDelim: As,
	url: X(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", Ws).replace("protocol", Us).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: X(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Us).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
}, Js = {
	...qs,
	br: X(cs).replace("{2,}", "*").getRegex(),
	text: X(qs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Ys = {
	normal: ns,
	gfm: is,
	pedantic: as
}, Xs = {
	normal: Gs,
	gfm: qs,
	breaks: Js,
	pedantic: Ks
}, Zs = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, Qs = (e) => Zs[e];
function $s(e, t) {
	if (t) {
		if (Z.escapeTest.test(e)) return e.replace(Z.escapeReplace, Qs);
	} else if (Z.escapeTestNoEncode.test(e)) return e.replace(Z.escapeReplaceNoEncode, Qs);
	return e;
}
function ec(e) {
	return e.replace(Z.numericCharacterReference, (e, t, n) => {
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : String.fromCodePoint(r);
	});
}
function tc(e) {
	try {
		e = encodeURI(e).replace(Z.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function nc(e, t) {
	let n = e.replace(Z.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(Z.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(Z.slashPipe, "|");
	return n;
}
function rc(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function ic(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && Z.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function ac(e) {
	return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function oc(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function sc(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function cc(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1"), c = e[0].charAt(0) === "!";
	r.state.inLink = !0;
	let l = r.state.linkEmitted, u = r.state.inRawBlock;
	r.state.linkEmitted = !1;
	let d = r.inlineTokens(s), f = r.state.linkEmitted;
	if (r.state.linkEmitted = l, r.state.inLink = !1, !c) {
		if (f) {
			r.state.inRawBlock = u;
			return;
		}
		r.state.linkEmitted = !0;
	}
	return {
		type: c ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: d
	};
}
function lc(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return e.slice(Math.min(r.length, i.length));
	}).join("\n");
}
function uc(e, t, n, r) {
	if (!t.includes("<")) return !1;
	for (let i = 0; i < t.length; i++) {
		if (t[i] === "\\") {
			i++;
			continue;
		}
		if (t[i] === "`") {
			let e = r.inline.code.exec(t.slice(i));
			if (e) {
				i += e[0].length - 1;
				continue;
			}
		}
		if (t[i] !== "<") continue;
		let a = e.slice(n + i), o = r.inline.tag.exec(a) || r.inline.autolink.exec(a);
		if (o) {
			if (o[0].length > t.length - i) return !0;
			i += o[0].length - 1;
		}
	}
	return !1;
}
var dc = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || jo;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : ic(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = lc(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = rc(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: rc(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: rc(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = rc(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o = 0;
				for (; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = e.join("\n"), o = t.raw + "\n" + a.replace(this.rules.other.blockquoteSetextReplace2, ""), s = this.blockquote(o);
					i[i.length - 1] = s;
					let c = o.substring(s.raw.length).replace(/^\n/, ""), l = c ? c.split("\n").length : 0, d = l ? e.slice(0, -l) : e;
					d.length > 0 && (n = `${n}
${d.join("\n")}`), r = r.substring(0, r.length - t.text.length) + s.text;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = t[2].split("\n", 1)[0], l = t[1].length, u = this.options.pedantic ? sc(c, l) : c.replace(this.rules.other.leadingSpaceTab, (e) => sc(e, l)), d = e.split("\n", 1)[0], f = !u.trim(), p = 0;
				if (this.options.pedantic ? (p = 2, s = u.trimStart()) : f ? p = l + 1 : (p = u.search(this.rules.other.nonSpaceChar), p = p > 4 ? 1 : p, s = u.slice(p), p += l), f && this.rules.other.blankLine.test(d) && (r += d + "\n", e = e.substring(d.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(p), n = this.rules.other.hrRegex(p), i = this.rules.other.fencesBeginRegex(p), a = this.rules.other.headingBeginRegex(p), o = this.rules.other.htmlBeginRegex(p), c = this.rules.other.blockquoteBeginRegex(p);
					for (; e;) {
						let l = e.split("\n", 1)[0], m;
						if (d = l, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), m = d) : m = d.replace(this.rules.other.leadingSpaceTab, (e) => e.replace(this.rules.other.tabCharGlobal, "    ")), i.test(d) || a.test(d) || o.test(d) || c.test(d) || t.test(d) || n.test(d)) break;
						if (m.search(this.rules.other.nonSpaceChar) >= p || !d.trim()) s += "\n" + m.slice(p);
						else {
							if (f || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(u) || a.test(u) || n.test(u)) break;
							s += "\n" + d;
						}
						f = !d.trim(), r += l + "\n", e = e.substring(l.length + 1), u = m.slice(p);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0)), i.items.push({
					type: "list_item",
					raw: r,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(s),
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e of i.items) if (this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []), !i.loose) {
				let t = e.tokens.filter((e) => e.type === "space");
				i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			for (let e of i.items) {
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, i.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
			}
			if (i.loose) for (let e of i.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = ic(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = ac(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: rc(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = nc(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: rc(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(nc(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: rc(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && uc(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = rc(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = oc(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let i = t[2], a = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(i);
				e && (i = e[1], a = e[3]);
			} else a = t[3] ? t[3].slice(1, -1) : "";
			return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? i.slice(1) : i.slice(1, -1)), cc(t, {
				href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
				title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && uc(e, n[1], r, this.rules)) return;
			let i = t[ac((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return cc(n, i, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let i = [...r[0]].length - 1, a, o, s = i, c = 0, l = r[0][0], u = n === l, d = l === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (r = d.exec(t)) !== null;) {
				if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
				if (o = [...a].length, r[3] || r[4]) {
					s += o;
					continue;
				}
				if (r[5] || r[6]) {
					if (i % 3 && !((i + o) % 3)) {
						c += o;
						continue;
					}
					if (u) break;
				}
				if (s -= o, s > 0) continue;
				o = Math.min(o, o + s + c);
				let t = [...r[0]][0].length, n = e.slice(0, i + r.index + t + o);
				if (Math.min(i, o) % 2) {
					let e = n.slice(1, -1);
					return {
						type: "em",
						raw: n,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = n.slice(2, -2);
				return {
					type: "strong",
					raw: n,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: e ? t[0] : ec(t[0]),
				escaped: e
			};
		}
	}
}, fc = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || jo, this.options.tokenizer = this.options.tokenizer || new dc(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			top: !0
		};
		let t = {
			other: Z,
			block: Ys.normal,
			inline: Xs.normal
		};
		this.options.pedantic ? (t.block = Ys.pedantic, t.inline = Xs.pedantic) : this.options.gfm && (t.block = Ys.gfm, t.inline = this.options.breaks ? Xs.breaks : Xs.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Ys,
			inline: Xs
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(Z.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(Z.tabCharGlobal, "    ").replace(Z.spaceLine, ""));
		let r = 1 / 0;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (i = this.tokenizer.fences(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.heading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.hr(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.blockquote(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.list(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.html(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if (i = this.tokenizer.table(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.lheading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
				continue;
			}
			if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let e = t[0], n = e.lastIndexOf("[");
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, ac(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let e = this.tokenizer.rules.inline.reflinkSearch, t = (n) => {
				let r = n.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, ac(n.slice(r + 1, -1)))) return n;
				if (r > 1 && n.charAt(0) !== "!") {
					let i = n.slice(1, r - 1);
					if (this.linkInText(i)) return "[" + i.replace(e, t) + "][" + "a".repeat(n.length - r - 2) + "]";
				}
				return "[" + "a".repeat(n.length - 2) + "]";
			};
			n = n.replace(e, t);
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (e) => "+".repeat(e.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (e, t, n) => {
			let r = n ? n.length : 0;
			return e.slice(0, r) + "[" + "a".repeat(e.length - r - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let r = !1, i = "", a = 1 / 0;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((n) => (o = n.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
			if (o = this.tokenizer.escape(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.tag(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.link(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let n = t.at(-1);
				o.type === "text" && n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (o = this.tokenizer.emStrong(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.codespan(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.br(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.del(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.autolink(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (!this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, pc = class {
	options;
	parser;
	constructor(e) {
		this.options = e || jo;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(Z.notSpaceStart)?.[0], i = e ? e.replace(Z.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + $s(r) + "\">" + (n ? i : $s(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : $s(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${$s(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? $s(n, !0) : this.parser.parseInline(r), o = tc(e);
		if (o === null) return a;
		e = $s(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + $s(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = tc(e);
		if (i === null) return $s(n);
		e = i;
		let a = `<img src="${$s(e)}" alt="${$s(n)}"`;
		return t && (a += ` title="${$s(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : $s(e.text);
	}
}, mc = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, hc = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || jo, this.options.renderer = this.options.renderer || new pc(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new mc();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, gc = class {
	options;
	block;
	constructor(e) {
		this.options = e || jo;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? fc.lex : fc.lexInline;
	}
	provideParser(e = this.block) {
		return e ? hc.parse : hc.parseInline;
	}
}, _c = new class {
	defaults = Ao();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = hc;
	Renderer = pc;
	TextRenderer = mc;
	Lexer = fc;
	Tokenizer = dc;
	Hooks = gc;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new pc(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new dc(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new gc();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = gc.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && gc.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return fc.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return hc.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? fc.lex : fc.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? hc.parse : hc.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? fc.lex : fc.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? hc.parse : hc.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + $s(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Q(e, t) {
	return _c.parse(e, t);
}
Q.options = Q.setOptions = function(e) {
	return _c.setOptions(e), Q.defaults = _c.defaults, Mo(Q.defaults), Q;
}, Q.getDefaults = Ao, Q.defaults = jo;
function vc(...e) {
	return _c.use(...e), Q.defaults = _c.defaults, Mo(Q.defaults), Q;
}
Q.use = vc, Q.walkTokens = function(e, t) {
	return _c.walkTokens(e, t);
}, Q.parseInline = _c.parseInline, Q.Parser = hc, Q.parser = hc.parse, Q.Renderer = pc, Q.TextRenderer = mc, Q.Lexer = fc, Q.lexer = fc.lex, Q.Tokenizer = dc, Q.Hooks = gc, Q.parse = Q, Q.options, Q.setOptions, Q.walkTokens, Q.parseInline, hc.parse, fc.lex;
//#endregion
//#region src/json-view.tsx
var yc = (e) => e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e), bc = "mb-1.5 font-medium text-[0.75rem] text-ink-3 uppercase tracking-[0.06em]";
function xc(e, t) {
	if (e?.kind === "object") return e;
	let n = [...new Set(t.flatMap((e) => Object.keys(e ?? {})))];
	return {
		kind: "object",
		fields: Object.fromEntries(n.map((e) => {
			let n = t.map((t) => t?.[e]).filter((e) => e != null), r = n.every((e) => typeof e == "number") ? "number" : n.every((e) => typeof e == "boolean") ? "yesno" : "text", i = r === "text" && n.some((e) => String(e).length > 80);
			return [e, r === "text" ? {
				kind: r,
				long: i
			} : { kind: r }];
		}))
	};
}
function Sc(e) {
	let t = Object.values(e.fields), n = t.filter((e) => e.kind === "number").length;
	return n >= 3 && n > t.length / 2;
}
function Cc(e, t, n) {
	if (t == null || t === "") return "";
	switch (e.kind) {
		case "number": return `${typeof t == "number" ? t.toLocaleString(x) : yc(t)}${e.unit ? ` ${e.unit}` : ""}`;
		case "yesno": return t ? e.yes ?? v("run.yes") : e.no ?? v("run.no");
		case "ref": {
			let r = n[e.to], i = Array.isArray(r) ? r.find((e) => e && yc(e.id) === yc(t)) : void 0;
			return yc(i ? i.title ?? i.name ?? i.label ?? t : t);
		}
		default: return yc(t);
	}
}
function wc({ items: e }) {
	return /* @__PURE__ */ L("div", {
		className: "flex flex-wrap gap-1.5",
		children: e.map((e, t) => /* @__PURE__ */ L("span", {
			className: "rounded-full bg-card px-2.5 py-0.5 text-[0.8125rem] text-ink-2 ring-1 ring-border-soft",
			children: e
		}, t))
	});
}
function Tc({ of: e, values: t, root: n }) {
	let r = t.map((t) => Cc(e, t, n)).filter(Boolean);
	return r.every((e) => e.length <= 32) ? /* @__PURE__ */ L(wc, { items: r }) : /* @__PURE__ */ L("ul", {
		className: "flex list-disc flex-col gap-1 pl-5 text-[0.9375rem]",
		children: r.map((e, t) => /* @__PURE__ */ L("li", {
			className: "break-words",
			children: e
		}, t))
	});
}
function Ec({ shape: e, rows: t, root: n }) {
	let r = Object.entries(e.fields);
	return /* @__PURE__ */ L("div", {
		className: "overflow-x-auto rounded-lg ring-1 ring-border-soft",
		children: /* @__PURE__ */ R("table", {
			className: "w-full text-[0.8125rem]",
			children: [/* @__PURE__ */ L("thead", {
				className: "bg-paper-2 text-ink-2",
				children: /* @__PURE__ */ L("tr", { children: r.map(([e, t]) => /* @__PURE__ */ L("th", {
					className: M("whitespace-nowrap px-3 py-2 text-left font-medium", t.kind === "number" && "text-right"),
					children: g(e, t)
				}, e)) })
			}), /* @__PURE__ */ L("tbody", { children: t.map((e, t) => /* @__PURE__ */ L("tr", {
				className: "border-border-soft border-t",
				children: r.map(([t, r]) => /* @__PURE__ */ L("td", {
					className: M("px-3 py-2 tabular-nums", r.kind === "number" && "text-right"),
					children: Cc(r, e?.[t], n)
				}, t))
			}, t)) })]
		})
	});
}
function Dc({ shape: e, rows: t, root: n }) {
	let r = Object.entries(e.fields), i = r.find(([, e]) => e.kind === "text" && e.long)?.[0] ?? o(e), a = r.filter(([e, t]) => e !== i && e !== "id" && t.kind !== "list"), s = !!r.find(([, e]) => e.kind === "text" && e.long);
	return /* @__PURE__ */ L(s ? "ol" : "ul", {
		className: "flex flex-col gap-1.5 text-[0.875rem]",
		children: t.map((e, t) => {
			let r = [i ? yc(e?.[i]) : "", ...a.map(([t, r]) => Cc(r, e?.[t], n))].filter(Boolean);
			return /* @__PURE__ */ R("li", {
				className: M(s && "grid grid-cols-[1.25rem_1fr] gap-1.5"),
				children: [s ? /* @__PURE__ */ L("span", {
					className: "font-semibold text-ember tabular-nums",
					children: t + 1
				}) : null, /* @__PURE__ */ R("span", { children: [r[0], r.length > 1 ? /* @__PURE__ */ R("span", {
					className: "text-ink-3",
					children: [" · ", r.slice(1).join(" · ")]
				}) : null] })]
			}, t);
		})
	});
}
function Oc({ fields: e, entry: t }) {
	let n = e.flatMap(([e, n]) => {
		if (n.kind !== "yesno" || t[e] === void 0 || t[e] === null) return [];
		let r = t[e] ? n.yes ?? g(e, n) : n.no;
		return r ? [{
			k: e,
			words: r,
			on: !!t[e]
		}] : [];
	});
	return n.length ? /* @__PURE__ */ L("span", {
		className: "flex shrink-0 flex-wrap justify-end gap-1",
		children: n.map((e) => /* @__PURE__ */ L("span", {
			className: M("rounded-full px-2 py-0.5 text-[0.75rem]", e.on ? "bg-second-tint text-second" : "bg-ember-tint text-ember-strong"),
			children: e.words
		}, e.k))
	}) : null;
}
function kc({ shape: e, rows: t, root: n }) {
	let r = Object.entries(e.fields).filter(([e]) => e !== "id"), i = o(e), a = r.filter(([, e]) => e.kind === "yesno"), s = r.filter(([e, t]) => e !== i && t.kind !== "yesno");
	return /* @__PURE__ */ L("div", {
		className: "divide-y divide-border-soft overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
		children: t.map((e, t) => /* @__PURE__ */ R("div", {
			className: "flex items-center gap-3 px-4 py-2.5",
			children: [/* @__PURE__ */ R("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ L("div", {
					className: "text-[0.9375rem]",
					children: i ? yc(e?.[i]) : ""
				}), /* @__PURE__ */ L("div", {
					className: "text-[0.8125rem] text-ink-3",
					children: s.map(([t, r]) => Cc(r, e?.[t], n)).filter(Boolean).join(" · ")
				})]
			}), /* @__PURE__ */ L(Oc, {
				fields: a,
				entry: e ?? {}
			})]
		}, t))
	});
}
function Ac({ shape: e, entry: t, root: n }) {
	let r = Object.entries(e.fields).filter(([e]) => e !== "id"), i = o(e), a = r.find(([, e]) => e.kind === "text" && e.long), s = r.filter(([e, t]) => e !== i && e !== a?.[0] && (t.kind === "number" || t.kind === "choice" || t.kind === "score" || t.kind === "ref" || t.kind === "text" && !t.long)), c = r.filter(([, e]) => e.kind === "yesno"), l = r.filter(([e, t]) => t.kind === "text" && t.long && e !== a?.[0]), u = r.filter(([, e]) => e.kind === "list" || e.kind === "table");
	return /* @__PURE__ */ R("article", {
		className: "flex flex-col gap-2 rounded-xl bg-card p-4 ring-1 ring-border-soft",
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ L("h4", {
					className: "text-balance font-display font-semibold text-[1.0625rem] leading-snug",
					children: i ? yc(t[i]) : ""
				}), /* @__PURE__ */ L(Oc, {
					fields: c,
					entry: t
				})]
			}),
			a ? /* @__PURE__ */ L("p", {
				className: "text-[0.875rem] text-ink-3 leading-relaxed",
				children: yc(t[a[0]])
			}) : null,
			s.length ? /* @__PURE__ */ L("div", {
				className: "flex flex-wrap gap-1.5",
				children: s.map(([e, r]) => Cc(r, t[e], n)).filter(Boolean).map((e, t) => /* @__PURE__ */ L("span", {
					className: "rounded-full bg-paper-2 px-2 py-0.5 text-[0.75rem] text-ink-2",
					children: e
				}, t))
			}) : null,
			l.map(([e, n]) => t[e] ? /* @__PURE__ */ R("p", {
				className: "text-[0.875rem] leading-relaxed",
				children: [/* @__PURE__ */ R("span", {
					className: "text-ink-3",
					children: [g(e, n), ": "]
				}), yc(t[e])]
			}, e) : null),
			u.map(([e, r]) => {
				let i = t[e];
				return !Array.isArray(i) || !i.length ? null : /* @__PURE__ */ R("div", {
					className: "border-border-soft border-t pt-2",
					children: [/* @__PURE__ */ L("div", {
						className: bc,
						children: g(e, r)
					}), r.kind === "list" && r.of.kind !== "object" ? /* @__PURE__ */ L(Tc, {
						of: r.of,
						values: i,
						root: n
					}) : /* @__PURE__ */ L(Dc, {
						shape: xc(r.kind === "list" ? r.of : void 0, i),
						rows: i,
						root: n
					})]
				}, e);
			})
		]
	});
}
function jc({ of: e, rows: t, root: n }) {
	let r = xc(e, t);
	return Sc(r) ? /* @__PURE__ */ L(Ec, {
		shape: r,
		rows: t,
		root: n
	}) : Object.values(r.fields).some((e) => e.kind === "list" || e.kind === "table" || e.kind === "text" && e.long) ? /* @__PURE__ */ L("div", {
		className: "grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-3",
		children: t.map((e, t) => /* @__PURE__ */ L(Ac, {
			shape: r,
			entry: e ?? {},
			root: n
		}, t))
	}) : /* @__PURE__ */ L(kc, {
		shape: r,
		rows: t,
		root: n
	});
}
function Mc({ step: e, json: t }) {
	if (!t || typeof t != "object" || Array.isArray(t)) return /* @__PURE__ */ L("pre", {
		className: "text-[0.8125rem]",
		children: JSON.stringify(t, null, 2)
	});
	let r = t, i = n(e);
	return /* @__PURE__ */ L("div", {
		className: "flex flex-col gap-5",
		children: Object.entries(r).map(([e, t]) => {
			let n = i.fields[e], a = n ? g(e, n) : e, o;
			if (Array.isArray(t) && t.length && t.every((e) => e && typeof e == "object")) o = /* @__PURE__ */ L(jc, {
				of: n?.kind === "list" ? n.of : void 0,
				rows: t,
				root: r
			});
			else if (Array.isArray(t)) o = /* @__PURE__ */ L(Tc, {
				of: n?.kind === "list" ? n.of : { kind: "text" },
				values: t,
				root: r
			});
			else if (t && typeof t == "object") o = /* @__PURE__ */ L("pre", {
				className: "overflow-auto rounded-lg bg-paper-2 p-3 text-[0.75rem]",
				children: JSON.stringify(t, null, 2)
			});
			else {
				let e = n && n.kind !== "list" && n.kind !== "table" ? n : { kind: "text" };
				o = /* @__PURE__ */ L("div", {
					className: "whitespace-pre-wrap text-[0.9375rem] leading-relaxed",
					children: Cc(e, t, r)
				});
			}
			return /* @__PURE__ */ R("section", { children: [/* @__PURE__ */ L("div", {
				className: bc,
				children: a
			}), o] }, e);
		})
	});
}
//#endregion
//#region src/pdf.ts
var Nc = "#282623", Pc = "#81807e", Fc = "#1a5fb4", Ic = "#dbd9d6", Lc = 483.28, Rc = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	"#39": "'",
	nbsp: "\xA0"
};
function zc(e) {
	return e.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? Number.parseInt(t.slice(2), 16) : Number(t.slice(1));
			return Number.isFinite(n) ? String.fromCodePoint(n) : e;
		}
		return Rc[t.toLowerCase()] ?? e;
	});
}
function Bc(e) {
	return zc(e.replace(/<[^>]+>/g, "")).trim();
}
function Vc(e, t = {}) {
	let n = [];
	for (let r of e ?? []) switch (r.type) {
		case "text": {
			let e = r.tokens;
			e?.length ? n.push(...Vc(e, t)) : n.push({
				...t,
				text: zc(r.text)
			});
			break;
		}
		case "escape":
			n.push({
				...t,
				text: zc(r.text)
			});
			break;
		case "strong":
			n.push(...Vc(r.tokens, {
				...t,
				bold: !0
			}));
			break;
		case "em":
			n.push(...Vc(r.tokens, {
				...t,
				italics: !0
			}));
			break;
		case "del":
			n.push(...Vc(r.tokens, {
				...t,
				decoration: "lineThrough"
			}));
			break;
		case "codespan":
			n.push({
				...t,
				text: zc(r.text),
				color: "#3d3b38"
			});
			break;
		case "link": {
			let e = r;
			n.push(...Vc(e.tokens, {
				...t,
				link: e.href,
				color: Fc,
				decoration: "underline"
			}));
			break;
		}
		case "image":
			n.push({
				...t,
				text: r.text
			});
			break;
		case "br":
			n.push({
				...t,
				text: "\n"
			});
			break;
		case "html":
			n.push({
				...t,
				text: Bc(r.text)
			});
			break;
		default: "tokens" in r && Array.isArray(r.tokens) ? n.push(...Vc(r.tokens, t)) : "text" in r && typeof r.text == "string" && n.push({
			...t,
			text: zc(r.text)
		});
	}
	return n;
}
function Hc(e) {
	let t = Gc(e);
	if (t.length === 1 && typeof t[0] == "object" && "style" in t[0]) {
		let { style: e, ...n } = t[0];
		return n;
	}
	return t.length === 1 ? t[0] : { stack: t };
}
function Uc(e, t) {
	return {
		text: Vc(e.tokens),
		alignment: e.align ?? "left",
		...t ? { style: "th" } : {}
	};
}
var Wc = {
	hLineWidth: () => .5,
	vLineWidth: () => 0,
	hLineColor: () => Ic,
	paddingTop: () => 4,
	paddingBottom: () => 4
};
function Gc(e) {
	let t = [];
	for (let n of e) switch (n.type) {
		case "space": break;
		case "heading": {
			let e = n.depth;
			t.push({
				text: Vc(n.tokens),
				style: e <= 1 ? "h1" : e === 2 ? "h2" : "h3"
			});
			break;
		}
		case "paragraph":
			t.push({
				text: Vc(n.tokens),
				style: "p"
			});
			break;
		case "text":
			t.push({
				text: Vc([n]),
				style: "p"
			});
			break;
		case "list": {
			let e = n, r = e.items.map((e) => Hc(e.tokens));
			t.push(e.ordered ? {
				ol: r,
				style: "list",
				start: Number(e.start) || 1
			} : {
				ul: r,
				style: "list"
			});
			break;
		}
		case "table": {
			let e = n;
			if (!e.header.length) break;
			t.push({
				table: {
					headerRows: 1,
					widths: e.header.map(() => "*"),
					body: [e.header.map((e) => Uc(e, !0)), ...e.rows.map((e) => e.map((e) => Uc(e, !1)))]
				},
				layout: Wc,
				style: "table"
			});
			break;
		}
		case "code":
			t.push({
				text: zc(n.text),
				style: "code",
				preserveLeadingSpaces: !0
			});
			break;
		case "blockquote":
			t.push({
				stack: Gc(n.tokens),
				style: "quote"
			});
			break;
		case "hr":
			t.push({
				canvas: [{
					type: "line",
					x1: 0,
					y1: 0,
					x2: Lc,
					y2: 0,
					lineWidth: .5,
					lineColor: Ic
				}],
				margin: [
					0,
					6,
					0,
					12
				]
			});
			break;
		case "html": {
			let e = Bc(n.text);
			e && t.push({
				text: e,
				style: "p"
			});
			break;
		}
		default: "tokens" in n && Array.isArray(n.tokens) ? t.push({
			text: Vc(n.tokens),
			style: "p"
		}) : "text" in n && typeof n.text == "string" && t.push({
			text: zc(n.text),
			style: "p"
		});
	}
	return t;
}
function Kc(e) {
	return Gc(Q.lexer(e));
}
function qc(e, t = (e) => e) {
	if (!e || typeof e != "object") return [{
		text: JSON.stringify(e, null, 2) ?? "",
		style: "code"
	}];
	let n = [];
	for (let [r, i] of Object.entries(e)) if (n.push({
		text: t(r),
		style: "label"
	}), typeof i == "boolean") n.push({
		text: v(i ? "run.yes" : "run.no"),
		style: "p"
	});
	else if (typeof i == "string" || typeof i == "number") n.push({
		text: String(i),
		style: "p"
	});
	else if (Array.isArray(i) && i.every((e) => typeof e != "object")) n.push({
		ul: i.map((e) => String(e)),
		style: "list"
	});
	else if (Array.isArray(i) && i.length && typeof i[0] == "object") {
		let e = i, t = [...new Set(e.flatMap((e) => Object.keys(e)))];
		n.push({
			table: {
				headerRows: 1,
				widths: t.map(() => "*"),
				body: [t.map((e) => ({
					text: e,
					style: "th"
				})), ...e.map((e) => t.map((t) => ({ text: e[t] === null || e[t] === void 0 ? "" : String(e[t]) })))]
			},
			layout: Wc,
			style: "table"
		});
	} else n.push({
		text: JSON.stringify(i, null, 2),
		style: "code"
	});
	return n;
}
function Jc(e) {
	let t = e.json !== void 0 && e.json !== null ? qc(e.json, e.label) : Kc(e.text ?? ""), n = e.foot ?? "";
	return {
		info: { title: e.title },
		pageSize: "A4",
		pageMargins: [
			56,
			60,
			56,
			64
		],
		defaultStyle: {
			font: "Roboto",
			fontSize: 10.5,
			lineHeight: 1.3,
			color: Nc
		},
		styles: {
			title: {
				fontSize: 20,
				bold: !0,
				lineHeight: 1.15,
				margin: [
					0,
					0,
					0,
					16
				]
			},
			h1: {
				fontSize: 15,
				bold: !0,
				margin: [
					0,
					14,
					0,
					6
				]
			},
			h2: {
				fontSize: 13,
				bold: !0,
				margin: [
					0,
					12,
					0,
					5
				]
			},
			h3: {
				fontSize: 11,
				bold: !0,
				margin: [
					0,
					10,
					0,
					4
				]
			},
			p: { margin: [
				0,
				0,
				0,
				7
			] },
			list: { margin: [
				0,
				0,
				0,
				7
			] },
			table: { margin: [
				0,
				2,
				0,
				10
			] },
			th: {
				bold: !0,
				fillColor: "#f3f1ee"
			},
			label: {
				fontSize: 8,
				bold: !0,
				color: Pc,
				characterSpacing: .6,
				margin: [
					0,
					8,
					0,
					2
				]
			},
			code: {
				fontSize: 9,
				color: "#3d3b38",
				margin: [
					0,
					0,
					0,
					8
				]
			},
			quote: {
				italics: !0,
				color: "#5d5b58",
				margin: [
					14,
					0,
					0,
					8
				]
			}
		},
		content: [{
			text: e.title,
			style: "title"
		}, ...t],
		footer: (e, t) => ({
			columns: [{
				text: n,
				color: Pc,
				fontSize: 8.5
			}, {
				text: `${e} / ${t}`,
				alignment: "right",
				color: Pc,
				fontSize: 8.5
			}],
			margin: [
				56,
				26,
				56,
				0
			]
		})
	};
}
var Yc = { Roboto: {
	normal: "Roboto-Regular.ttf",
	bold: "Roboto-Medium.ttf",
	italics: "Roboto-Italic.ttf",
	bolditalics: "Roboto-MediumItalic.ttf"
} }, Xc = null;
function Zc() {
	return Xc ??= Promise.all([import("./chunks/pdfmake-CQ3pcUTC.js").then((t) => /* @__PURE__ */ e(t.default, 1)), import("./chunks/vfs_fonts-CnGkRg9W.js").then((t) => /* @__PURE__ */ e(t.default, 1))]).then(([e, t]) => {
		let n = e.default;
		return n.addVirtualFileSystem(t.default), n.addFonts(Yc), n;
	}).catch((e) => {
		throw Xc = null, e;
	}), Xc;
}
function Qc(e) {
	return e.replace(/[\\/:*?"<>|]+|\p{Cc}+/gu, "-").replace(/\s+/g, " ").trim() || "result";
}
async function $c(e) {
	let t = await (await Zc()).createPdf(Jc(e)).getBlob();
	return new File([t], `${Qc(e.title)}.pdf`, { type: "application/pdf" });
}
//#endregion
//#region src/surface.tsx
var $ = (e) => e == null ? "" : typeof e == "boolean" ? v(e ? "run.yes" : "run.no") : typeof e == "object" ? JSON.stringify(e) : String(e), el = (e) => {
	let t = typeof e == "number" ? e : Number(String(e ?? "").replace(",", "."));
	return Number.isFinite(t) ? t : 0;
};
function tl(e, t) {
	let n = $(e);
	return n ? /^(https?:|data:|\/)/.test(n) ? n : t(n) : null;
}
function nl(e, t, n, r) {
	return _(e[t], n.data, r);
}
function rl(e, t, n) {
	let r = $(t) || "label", i = $(n) || "value";
	return Array.isArray(e) ? e.map((e) => ({
		label: $(e?.[r]),
		value: el(e?.[i])
	})) : [];
}
function il({ c: e, ctx: t, row: n }) {
	let r = e.children;
	if (!r) return null;
	if (Array.isArray(r)) return /* @__PURE__ */ L(I, { children: r.map((e) => /* @__PURE__ */ L(bl, {
		id: e,
		ctx: t,
		row: n
	}, e)) });
	let i = _({ path: r.path }, t.data, n);
	return /* @__PURE__ */ L(I, { children: (Array.isArray(i) ? i : []).map((e, n) => /* @__PURE__ */ L(bl, {
		id: r.componentId,
		ctx: t,
		row: e
	}, n)) });
}
var al = {
	success: "bg-second-tint text-second",
	warning: "bg-amber-tint text-ink-2",
	accent: "bg-ember-tint text-ember-strong",
	default: "bg-paper-2 text-ink-2"
}, ol = (e) => Array.isArray(e) ? e : [];
function sl(e, t) {
	return typeof e != "object" || !e ? t === "" ? e : void 0 : e[t];
}
function cl(e, t) {
	if (typeof e != "object" || !e) return $(e);
	let n = e;
	return $(t ? n[t] : n.label ?? n.name ?? n.title ?? n.text);
}
function ll(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(sl(n, t));
		r.set(e, [...r.get(e) ?? [], n]);
	}
	let i = (e) => {
		let t = n.indexOf(e);
		return t < 0 ? n.length : t;
	};
	return [...r.entries()].sort((e, t) => i(e[0]) - i(t[0]));
}
var ul = (e) => e ? `${$(e)} ${x === "de" ? "Min" : "min"}` : "";
function dl({ items: e }) {
	return e.length ? /* @__PURE__ */ L("div", {
		className: "flex flex-wrap gap-1.5",
		children: e.map((e, t) => /* @__PURE__ */ L("span", {
			className: "rounded-full bg-paper-2 px-2 py-0.5 text-[0.75rem] text-ink-2",
			children: e
		}, t))
	}) : null;
}
function fl(e, t, n) {
	let r = e.meta;
	return (Array.isArray(r) ? r : [r]).map((e) => $(_(e, t.data, n))).filter(Boolean);
}
function pl({ c: e, ctx: t, row: n }) {
	let [r, i] = F("0"), a = ol(e.tabs), o = a.map((e, r) => {
		let i = _(e?.count, t.data, n), a = Array.isArray(i) ? i.length : i, o = $(_(e?.label, t.data, n));
		return {
			id: String(r),
			label: a == null || a === "" ? o : `${o} (${$(a)})`
		};
	}), s = a[Number(r)]?.child;
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ L("div", {
			className: "sticky top-2 z-10 max-w-full self-start overflow-x-auto rounded-full",
			children: /* @__PURE__ */ L(ce, {
				value: r,
				onChange: i,
				options: o
			})
		}), typeof s == "string" ? /* @__PURE__ */ L(bl, {
			id: s,
			ctx: t,
			row: n
		}) : null]
	});
}
function ml({ c: e, ctx: t, row: n }) {
	let r = (r) => nl(e, r, t, n), [i, a] = F(!1), o = ol(r("items")), s = $(r("labelKey")), c = $(r("detailKey")) || "amount", l = $(r("noteKey")), u = $(r("noteFormat")), d = $(r("groupKey")), f = ol(r("groupOrder")).map($), p = t.state[e.id] ?? {}, m = (e, t) => `${t}:${cl(e, s)}`, h = o.filter((e, t) => p[m(e, t)]).length, g = o.map((e, t) => ({
		item: e,
		i: t
	})), _ = d ? ll(o, d, f).map(([e]) => [e, g.filter(({ item: t }) => $(sl(t, d)) === e)]) : [["", g]], y = (e) => $(sl(e, c)), b = r("noteMap"), x = (e) => {
		let t = l ? sl(e, l) : void 0;
		if (typeof t == "boolean") return $((b && typeof b == "object" ? b[String(t)] : "") ?? "");
		let n = Array.isArray(t) ? t.map($).join(", ") : $(t);
		return n && u ? u.replace("{}", n) : n;
	};
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ R("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ L("div", {
					className: "h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2",
					children: /* @__PURE__ */ L("div", {
						className: "h-full rounded-full bg-second transition-[width] duration-300",
						style: { width: `${o.length ? h / o.length * 100 : 0}%` }
					})
				}),
				/* @__PURE__ */ L("span", {
					className: "text-[0.8125rem] text-ink-3 tabular-nums",
					children: h === o.length && o.length ? v("surface.allDone") : v("surface.done", {
						done: h,
						total: o.length
					})
				}),
				r("share") === !1 ? null : /* @__PURE__ */ R("button", {
					type: "button",
					onClick: async () => {
						let e = _.map(([e, t]) => {
							let n = t.filter(({ item: e, i: t }) => !p[m(e, t)]).map(({ item: e }) => `☐ ${cl(e, s)}${y(e) ? ` – ${y(e)}` : ""}`);
							return n.length ? [e, ...n].filter(Boolean).join("\n") : "";
						}).filter(Boolean).join("\n\n");
						try {
							navigator.share ? await navigator.share({ text: e }) : (await navigator.clipboard.writeText(e), a(!0), setTimeout(() => a(!1), 1600));
						} catch {}
					},
					className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 text-[0.8125rem] text-ink-2 hover:text-ink coarse:h-10",
					children: [L(i ? B : ln, { className: "size-3.5" }), v(i ? "share.copied" : "run.share")]
				})
			]
		}), _.map(([n, r]) => /* @__PURE__ */ R("section", {
			className: "rounded-xl bg-card px-4 py-1 ring-1 ring-border-soft",
			children: [n ? /* @__PURE__ */ L("h4", {
				className: "pt-3 pb-1 font-semibold text-[0.6875rem] text-second uppercase tracking-[0.14em]",
				children: n
			}) : null, r.map(({ item: n, i: r }) => {
				let i = m(n, r), a = !!p[i], o = x(n);
				return /* @__PURE__ */ R("label", {
					className: "flex cursor-pointer items-start gap-3 border-border-soft border-b border-dashed py-2.5 last:border-0",
					children: [/* @__PURE__ */ L("input", {
						type: "checkbox",
						checked: a,
						onChange: () => t.setState(e.id, {
							...p,
							[i]: !a
						}),
						className: "mt-0.5 size-[1.125rem] shrink-0 accent-[var(--second)] coarse:size-6"
					}), /* @__PURE__ */ R("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ R("span", {
							className: M("text-[0.9375rem]", a && "text-ink-3 line-through"),
							children: [cl(n, s), y(n) ? /* @__PURE__ */ R("span", {
								className: "text-ink-3",
								children: [" · ", y(n)]
							}) : null]
						}), o ? /* @__PURE__ */ L("span", {
							className: "block text-[0.75rem] text-ink-3",
							children: o
						}) : null]
					})]
				}, i);
			})]
		}, n))]
	});
}
function hl({ data: e }) {
	let t = Math.max(1, ...e.map((e) => e.value));
	return /* @__PURE__ */ L("div", {
		className: "flex flex-col gap-1.5",
		children: e.map((e, n) => /* @__PURE__ */ R("div", {
			className: "grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-2",
			children: [
				/* @__PURE__ */ L("span", {
					className: "truncate text-[0.8125rem] text-ink-2",
					children: e.label
				}),
				/* @__PURE__ */ L("span", {
					className: "h-2.5 rounded-full bg-paper-2",
					children: /* @__PURE__ */ L("span", {
						className: "block h-full rounded-full bg-ember",
						style: { width: `${e.value / t * 100}%` }
					})
				}),
				/* @__PURE__ */ L("span", {
					className: "text-[0.8125rem] tabular-nums",
					children: e.value.toLocaleString(x)
				})
			]
		}, n))
	});
}
function gl({ data: e }) {
	if (e.length < 2) return /* @__PURE__ */ L(hl, { data: e });
	let t = Math.max(...e.map((e) => e.value)), n = Math.min(...e.map((e) => e.value)), r = t - n || 1, i = e.map((t, i) => [i / (e.length - 1) * 312 + 4, 116 - (t.value - n) / r * 112]);
	return /* @__PURE__ */ R("figure", { children: [/* @__PURE__ */ R("svg", {
		viewBox: "0 0 320 120",
		className: "w-full text-ember",
		role: "img",
		children: [/* @__PURE__ */ L("polyline", {
			points: i.map(([e, t]) => `${e},${t}`).join(" "),
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinejoin: "round"
		}), i.map(([t, n], r) => /* @__PURE__ */ L("circle", {
			cx: t,
			cy: n,
			r: "3",
			fill: "currentColor",
			children: /* @__PURE__ */ L("title", { children: `${e[r].label}: ${e[r].value}` })
		}, r))]
	}), /* @__PURE__ */ R("figcaption", {
		className: "mt-1 flex justify-between text-[0.75rem] text-ink-3",
		children: [/* @__PURE__ */ L("span", { children: e[0].label }), /* @__PURE__ */ L("span", { children: e.at(-1)?.label })]
	})] });
}
var _l = [
	"var(--color-ember)",
	"var(--color-cobalt)",
	"var(--color-moss)",
	"var(--color-amber)",
	"var(--color-ink-3)"
];
function vl({ data: e }) {
	let t = e.reduce((e, t) => e + Math.max(0, t.value), 0) || 1, n = 0, r = 2 * Math.PI * 40;
	return /* @__PURE__ */ R("div", {
		className: "flex items-center gap-4",
		children: [/* @__PURE__ */ L("svg", {
			viewBox: "0 0 100 100",
			className: "size-28 shrink-0 -rotate-90",
			role: "img",
			children: e.map((e, i) => {
				let a = Math.max(0, e.value) / t * r, o = /* @__PURE__ */ L("circle", {
					cx: "50",
					cy: "50",
					r: 40,
					fill: "none",
					stroke: _l[i % _l.length],
					strokeWidth: "16",
					strokeDasharray: `${a} ${r - a}`,
					strokeDashoffset: -n,
					children: /* @__PURE__ */ L("title", { children: `${e.label}: ${e.value}` })
				}, i);
				return n += a, o;
			})
		}), /* @__PURE__ */ L("ul", {
			className: "flex flex-col gap-1 text-[0.8125rem]",
			children: e.map((e, t) => /* @__PURE__ */ R("li", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ L("span", {
						className: "size-2.5 rounded-full",
						style: { background: _l[t % _l.length] }
					}),
					/* @__PURE__ */ L("span", {
						className: "text-ink-2",
						children: e.label
					}),
					/* @__PURE__ */ L("span", {
						className: "tabular-nums",
						children: e.value.toLocaleString(x)
					})
				]
			}, t))
		})]
	});
}
function yl({ title: e, children: t }) {
	return /* @__PURE__ */ R("div", {
		className: "rounded-xl bg-card p-4 ring-1 ring-border-soft",
		children: [e ? /* @__PURE__ */ L("div", {
			className: "mb-3 font-medium text-[0.875rem]",
			children: e
		}) : null, t]
	});
}
function bl({ id: e, ctx: t, row: n }) {
	let r = t.byId.get(e);
	if (!r) return null;
	let i = (e) => nl(r, e, t, n);
	switch (r.component) {
		case "Column": return /* @__PURE__ */ L("div", {
			className: "flex flex-col gap-4",
			children: /* @__PURE__ */ L(il, {
				c: r,
				ctx: t,
				row: n
			})
		});
		case "Text": {
			let e = $(i("variant")) || "body";
			return /* @__PURE__ */ L("p", {
				className: M(e === "h3" && "font-display font-semibold text-[1.25rem] leading-tight", e === "h4" && "font-semibold text-[1rem]", e === "lead" && "font-display text-[1.0625rem] text-ink-2 leading-relaxed", e === "body" && "text-[0.9375rem] leading-relaxed", e === "muted" && "text-[0.8125rem] text-ink-3"),
				children: $(i("text"))
			});
		}
		case "List": return /* @__PURE__ */ L("div", {
			className: "flex flex-col divide-y divide-border-soft overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
			children: /* @__PURE__ */ L(il, {
				c: r,
				ctx: t,
				row: n
			})
		});
		case "Row": {
			let e = tl(i("image"), t.assetUrl), n = $(i("badge"));
			return /* @__PURE__ */ R("div", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					e ? /* @__PURE__ */ L("img", {
						src: e,
						alt: "",
						className: "size-10 shrink-0 rounded-lg object-cover"
					}) : null,
					/* @__PURE__ */ R("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ L("div", {
							className: "truncate text-[0.9375rem]",
							children: $(i("title"))
						}), i("subtitle") ? /* @__PURE__ */ L("div", {
							className: "truncate text-[0.8125rem] text-ink-3",
							children: $(i("subtitle"))
						}) : null]
					}),
					i("meta") ? /* @__PURE__ */ L("span", {
						className: "shrink-0 text-[0.8125rem] text-ink-3 tabular-nums",
						children: $(i("meta"))
					}) : null,
					n ? /* @__PURE__ */ L("span", {
						className: M("shrink-0 rounded-full px-2 py-0.5 text-[0.75rem]", al[$(i("badgeTone"))] ?? al.default),
						children: n
					}) : null
				]
			});
		}
		case "DetailGrid": {
			let e = i("rows");
			return /* @__PURE__ */ L("dl", {
				className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl bg-card p-4 text-[0.875rem] ring-1 ring-border-soft",
				children: (Array.isArray(e) ? e : []).map((e, r) => /* @__PURE__ */ R("div", {
					className: "contents",
					children: [/* @__PURE__ */ L("dt", {
						className: "text-ink-3",
						children: $(_(e?.label, t.data, n))
					}), /* @__PURE__ */ L("dd", {
						className: "break-words",
						children: $(_(e?.value, t.data, n))
					})]
				}, r))
			});
		}
		case "Badge": return /* @__PURE__ */ L("span", {
			className: M("inline-flex w-fit rounded-full px-2.5 py-0.5 text-[0.75rem]", al[$(i("tone"))] ?? al.default),
			children: $(i("label"))
		});
		case "Grid": {
			let e = Math.min(4, Math.max(1, el(i("columns")) || 2)), a = Math.min(24, Math.max(6, el(i("min")) || (e > 2 ? 9 : 12)));
			return /* @__PURE__ */ L("div", {
				className: "grid gap-3",
				style: { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${a}rem), 1fr))` },
				children: /* @__PURE__ */ L(il, {
					c: r,
					ctx: t,
					row: n
				})
			});
		}
		case "Metric": return /* @__PURE__ */ R("div", {
			className: "rounded-xl bg-card p-4 ring-1 ring-border-soft",
			children: [
				/* @__PURE__ */ L("div", {
					className: "text-[0.75rem] text-ink-3 uppercase tracking-[0.06em]",
					children: $(i("label"))
				}),
				/* @__PURE__ */ L("div", {
					className: "mt-1 font-display font-semibold text-[1.5rem] tabular-nums",
					children: $(i("value"))
				}),
				i("caption") ? /* @__PURE__ */ L("div", {
					className: "text-[0.8125rem] text-ink-3",
					children: $(i("caption"))
				}) : null
			]
		});
		case "Table": {
			let e = i("rows"), t = Array.isArray(e) ? e : [], n = i("columns"), r = Array.isArray(n) ? n.map((e) => ({
				key: $(e?.key),
				label: $(e?.label ?? e?.key)
			})) : [...new Set(t.flatMap((e) => Object.keys(e ?? {})))].map((e) => ({
				key: e,
				label: e
			}));
			return /* @__PURE__ */ L("div", {
				className: "overflow-x-auto rounded-xl ring-1 ring-border-soft",
				children: /* @__PURE__ */ R("table", {
					className: "w-full text-[0.8125rem]",
					children: [/* @__PURE__ */ L("thead", {
						className: "bg-paper-2 text-ink-2",
						children: /* @__PURE__ */ L("tr", { children: r.map((e) => /* @__PURE__ */ L("th", {
							className: "px-3 py-2 text-left font-medium",
							children: e.label
						}, e.key)) })
					}), /* @__PURE__ */ L("tbody", { children: t.map((e, t) => /* @__PURE__ */ L("tr", {
						className: "border-border-soft border-t",
						children: r.map((t) => /* @__PURE__ */ L("td", {
							className: "px-3 py-2 tabular-nums",
							children: $(e?.[t.key])
						}, t.key))
					}, t)) })]
				})
			});
		}
		case "Image": {
			let e = tl(i("src"), t.assetUrl);
			return e ? /* @__PURE__ */ L("img", {
				src: e,
				alt: $(i("alt")),
				className: "w-full rounded-xl"
			}) : null;
		}
		case "BarChart": return /* @__PURE__ */ L(yl, {
			title: $(i("title")),
			children: /* @__PURE__ */ L(hl, { data: rl(i("points"), i("labelKey"), i("valueKey")) })
		});
		case "LineChart": return /* @__PURE__ */ L(yl, {
			title: $(i("title")),
			children: /* @__PURE__ */ L(gl, { data: rl(i("points"), i("labelKey"), i("valueKey")) })
		});
		case "DonutChart": return /* @__PURE__ */ L(yl, {
			title: $(i("title")),
			children: /* @__PURE__ */ L(vl, { data: rl(i("slices"), i("labelKey"), i("valueKey")) })
		});
		case "Actions": return /* @__PURE__ */ L("div", {
			className: "flex flex-wrap gap-2",
			children: /* @__PURE__ */ L(il, {
				c: r,
				ctx: t,
				row: n
			})
		});
		case "Button": {
			let e = $(i("action"));
			return !t.onAction && e !== "open" ? null : /* @__PURE__ */ L("button", {
				type: "button",
				onClick: () => {
					let n = i("target");
					if (e === "open") {
						let e = tl(n, t.assetUrl);
						e && window.open(e, "_blank", "noopener");
						return;
					}
					t.onAction?.({
						action: e,
						target: n
					});
				},
				className: "inline-flex h-9 items-center rounded-full bg-paper-2 px-4 text-[0.875rem] text-ink-2 hover:text-ink coarse:h-11",
				children: $(i("label"))
			});
		}
		case "Tabs": return /* @__PURE__ */ L(pl, {
			c: r,
			ctx: t,
			row: n
		});
		case "Card": {
			let e = tl(i("image"), t.assetUrl), a = $(i("eyebrow")), o = $(i("subtitle"));
			return /* @__PURE__ */ R("article", {
				className: "overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
				children: [
					e ? /* @__PURE__ */ L("img", {
						src: e,
						alt: "",
						className: "aspect-[16/9] w-full object-cover"
					}) : null,
					/* @__PURE__ */ R("div", {
						className: M("flex flex-col gap-1.5 px-4 py-3.5", r.children && "bg-paper-2/60"),
						children: [
							a ? /* @__PURE__ */ L("div", {
								className: "font-medium text-[0.6875rem] text-ink-3 uppercase tracking-[0.14em]",
								children: a
							}) : null,
							/* @__PURE__ */ L("h3", {
								className: "text-balance font-display font-semibold text-[1.1875rem] leading-snug",
								children: $(i("title"))
							}),
							o ? /* @__PURE__ */ L("p", {
								className: "text-[0.875rem] text-ink-3 leading-relaxed",
								children: o
							}) : null,
							/* @__PURE__ */ L(dl, { items: fl(r, t, n) })
						]
					}),
					r.children ? /* @__PURE__ */ L("div", {
						className: "flex flex-col gap-3 border-border-soft border-t px-4 py-3.5 empty:hidden",
						children: /* @__PURE__ */ L(il, {
							c: r,
							ctx: t,
							row: n
						})
					}) : null
				]
			});
		}
		case "Fold": return /* @__PURE__ */ R("details", {
			open: !!i("open"),
			className: "group border-border-soft border-t pt-3 first:border-0 first:pt-0",
			children: [/* @__PURE__ */ R("summary", {
				className: "flex cursor-pointer list-none items-center justify-between gap-3 font-display font-semibold text-[1rem] [&::-webkit-details-marker]:hidden",
				children: [$(i("title")), /* @__PURE__ */ L(qe, { className: "size-4 text-ink-3 transition-transform group-open:rotate-90 motion-reduce:transition-none" })]
			}), /* @__PURE__ */ L("div", {
				className: "flex flex-col gap-3 pt-3",
				children: /* @__PURE__ */ L(il, {
					c: r,
					ctx: t,
					row: n
				})
			})]
		});
		case "Group": {
			let e = r.children;
			if (!e || Array.isArray(e)) return null;
			let a = ol(_({ path: e.path }, t.data, n));
			return /* @__PURE__ */ L("div", {
				className: "flex flex-col gap-5",
				children: ll(a, $(i("by")), ol(i("order")).map($)).map(([n, r]) => /* @__PURE__ */ R("section", {
					className: "flex flex-col gap-2",
					children: [n ? /* @__PURE__ */ L("h4", {
						className: "font-semibold text-[0.6875rem] text-second uppercase tracking-[0.14em]",
						children: n
					}) : null, r.map((n, r) => /* @__PURE__ */ L(bl, {
						id: e.componentId,
						ctx: t,
						row: n
					}, r))]
				}, n))
			});
		}
		case "Chips": {
			let e = $(i("labelKey")), t = $(i("flagKey")), n = $(i("flag")), r = $(i("title"));
			return /* @__PURE__ */ R("div", {
				className: "flex flex-col gap-2",
				children: [r ? /* @__PURE__ */ L("div", {
					className: "text-[0.8125rem] text-ink-3",
					children: r
				}) : null, /* @__PURE__ */ L("div", {
					className: "flex flex-wrap gap-1.5",
					children: ol(i("items")).map((r, i) => {
						let a = !!(t && sl(r, t));
						return /* @__PURE__ */ R("span", {
							className: M("rounded-full px-2.5 py-1 text-[0.8125rem]", a ? "bg-amber-tint font-medium text-ink ring-1 ring-amber/60" : "bg-card text-ink-2 ring-1 ring-border-soft"),
							children: [cl(r, e), a && n ? ` · ${n}` : ""]
						}, i);
					})
				})]
			});
		}
		case "Checklist": return /* @__PURE__ */ L(ml, {
			c: r,
			ctx: t,
			row: n
		});
		case "Steps": {
			let e = $(i("textKey")) || "text", t = $(i("minutesKey")) || "minutes";
			return /* @__PURE__ */ L("ol", {
				className: "flex flex-col gap-3",
				children: ol(i("items")).map((n, r) => {
					let i = $(typeof n == "object" ? sl(n, e) : n), a = ul(sl(n, t));
					return /* @__PURE__ */ R("li", {
						className: "grid grid-cols-[1.5rem_1fr] gap-2",
						children: [/* @__PURE__ */ L("span", {
							className: "font-display font-semibold text-[1.125rem] text-ember leading-snug",
							children: r + 1
						}), /* @__PURE__ */ R("span", {
							className: "text-[0.9375rem] leading-relaxed",
							children: [i, a ? /* @__PURE__ */ R("span", {
								className: "ml-1.5 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-paper-2 px-2 py-0.5 align-[1px] text-[0.75rem] text-ink-2",
								children: [/* @__PURE__ */ L(Ye, { className: "size-3" }), a]
							}) : null]
						})]
					}, r);
				})
			});
		}
		case "Link": {
			let e = $(i("key")) || "id", n = $(i("value")), a = ol(i("items")).find((t) => $(sl(t, e)) === n), o = r.view;
			if (a === void 0) return null;
			let s = (e) => _(r[e], t.data, a), c = $(i("eyebrow")), l = fl(r, t, a);
			return /* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => typeof o == "string" && t.open(o, a),
				className: M("group flex w-full items-center gap-3 text-left", $(i("look")) === "card" ? "rounded-xl bg-card p-4 ring-1 ring-border-soft hover:ring-ink-4" : "-mx-2 w-[calc(100%+1rem)] rounded-lg px-2 py-2 hover:bg-paper-2/70 coarse:py-3"),
				children: [/* @__PURE__ */ R("span", {
					className: "min-w-0 flex-1",
					children: [
						c ? /* @__PURE__ */ L("span", {
							className: "block font-semibold text-[0.6875rem] text-second uppercase tracking-[0.14em]",
							children: c
						}) : null,
						/* @__PURE__ */ L("span", {
							className: "block font-display font-semibold text-[1rem] leading-snug group-hover:text-ember",
							children: $(s("title"))
						}),
						s("subtitle") ? /* @__PURE__ */ L("span", {
							className: "block text-[0.8125rem] text-ink-3",
							children: $(s("subtitle"))
						}) : null,
						l.length ? /* @__PURE__ */ R("span", {
							className: "mt-0.5 flex items-center gap-1 text-[0.75rem] text-ink-3",
							children: [/* @__PURE__ */ L(Ye, { className: "size-3" }), l.join(" · ")]
						}) : null
					]
				}), /* @__PURE__ */ L(qe, { className: "size-4 shrink-0 text-ink-3" })]
			});
		}
		case "Callout": {
			let e = $(i("tone")) || "tip", t = $(i("title"));
			return /* @__PURE__ */ R("div", {
				className: M("flex gap-2.5 rounded-xl px-4 py-3 text-[0.875rem] leading-relaxed", e === "tip" && "bg-second-tint", e === "note" && "bg-paper-2", e === "warning" && "bg-amber-tint"),
				children: [/* @__PURE__ */ L(Ot, { className: M("mt-0.5 size-4 shrink-0", e === "tip" ? "text-second" : "text-ink-3") }), /* @__PURE__ */ R("p", { children: [t ? /* @__PURE__ */ R("b", {
					className: "font-semibold",
					children: [t, " "]
				}) : null, $(i("text"))] })]
			});
		}
	}
	return null;
}
function xl({ surface: e, assetUrl: t, onAction: n, initial: r, onState: i }) {
	let [a, o] = F(r ?? {}), [s, c] = F(null), l = {
		byId: new Map(e.components.map((e) => [e.id, e])),
		data: e.data,
		assetUrl: t,
		onAction: n,
		state: a,
		setState: (e, t) => {
			let n = {
				...a,
				[e]: t
			};
			o(n), i?.(n);
		},
		open: (e, t) => c({
			view: e,
			row: t
		})
	};
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L(bl, {
		id: "root",
		ctx: l
	}), /* @__PURE__ */ L(O, {
		open: s !== null,
		onClose: () => c(null),
		height: "tall",
		children: s ? /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ L(bl, {
				id: s.view,
				ctx: l,
				row: s.row
			}), /* @__PURE__ */ L("button", {
				type: "button",
				onClick: () => c(null),
				className: "h-10 self-center rounded-full bg-paper-2 px-5 text-[0.875rem] text-ink-2 hover:text-ink",
				children: v("surface.close")
			})]
		}) : null
	})] });
}
//#endregion
//#region src/outputs.tsx
function Sl({ text: e, className: t }) {
	let n = me(() => ko.sanitize(Q.parse(e, { async: !1 })), [e]);
	return /* @__PURE__ */ L("div", {
		className: M("prose-zen", t),
		dangerouslySetInnerHTML: { __html: n }
	});
}
function Cl({ src: e, page: t, height: n, fit: r, flow: i, state: a, onState: o }) {
	let s = P(null), [c, l] = F(n), [u] = F(() => a ?? {}), d = P(o);
	d.current = o, N(() => {
		let e = (e) => {
			if (!s.current || e.source !== s.current.contentWindow) return;
			let t = e.data;
			if (t?.wizard === "height" && typeof t.height == "number") l(Math.min(2e4, Math.max(120, Math.ceil(t.height))));
			else if (t?.wizard === "state" && t.state && typeof t.state == "object") d.current?.(t.state);
			else if (t?.wizard === "share" && typeof t.text == "string") {
				let e = t.text.slice(0, 1e4);
				navigator.share ? navigator.share({ text: e }).catch(() => void 0) : navigator.clipboard?.writeText(e).catch(() => void 0);
			}
		};
		return window.addEventListener("message", e), () => window.removeEventListener("message", e);
	}, []);
	let f = P(null), [p, m] = F(0);
	N(() => {
		let e = f.current;
		if (!e) return;
		let t = new ResizeObserver(() => m(e.clientWidth));
		return t.observe(e), m(e.clientWidth), () => t.disconnect();
	}, []);
	let [h, g] = F(null);
	N(() => {
		let t = !0;
		return fetch(e, { credentials: "include" }).then((e) => e.ok ? e.text() : "").then((n) => t && g({
			src: e,
			text: n
		})), () => {
			t = !1;
		};
	}, [e]);
	let _ = i ? p || 360 : t ?? Math.max(p, 900), y = i ? 1 : p ? r ? p / _ : Math.min(1, p / _) : 1, b = i ? c : n, x = i && h ? `<script>window.__WIZARD_STATE=${JSON.stringify(u).replace(/</g, "\\u003c")}<\/script>${h.text}` : h?.text;
	return /* @__PURE__ */ R("div", {
		ref: f,
		className: M("relative overflow-hidden", !i && "rounded-lg bg-white ring-1 ring-border-soft"),
		style: { height: b * y },
		children: [h?.src === e ? /* @__PURE__ */ L("iframe", {
			ref: s,
			title: v("output.preview"),
			srcDoc: x,
			sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox",
			className: "absolute top-0 left-0 origin-top-left border-0",
			style: {
				width: _,
				height: b,
				transform: `scale(${y})`
			}
		}, e) : /* @__PURE__ */ L("div", { className: "absolute inset-0 animate-pulse bg-paper-2" }), i ? null : /* @__PURE__ */ L("a", {
			href: e,
			target: "_blank",
			rel: "noreferrer",
			className: "absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-card/90 text-ink-2 shadow-soft ring-1 ring-border-soft backdrop-blur hover:text-ink coarse:size-11",
			"aria-label": v("run.openFull"),
			children: /* @__PURE__ */ L(Rt, { className: "size-4" })
		})]
	});
}
var wl = {
	disc: {
		file: "ai",
		box: 566.93,
		x: 89.28,
		y: 100.72,
		w: 365.49,
		h: 365.49
	},
	generated: {
		file: "ai-generated",
		box: 1789.84,
		x: 207.3,
		y: 144.36,
		w: 1384.24,
		h: 266.41
	},
	edited: {
		file: "ai-modified",
		box: 1700.79,
		x: 231.11,
		y: 144.36,
		w: 1230.56,
		h: 266.41
	}
};
function Tl({ icon: e, tone: t, size: n, className: r }) {
	let i = wl[e], a = n / i.h;
	return /* @__PURE__ */ L("img", {
		src: zn(`ai-labels/${i.file}-${t}.svg`),
		alt: "",
		draggable: !1,
		className: M("pointer-events-none absolute max-w-none select-none", r),
		style: {
			width: i.box * a,
			height: 566.93 * a,
			left: -i.x * a,
			top: -i.y * a
		}
	});
}
function El({ ai: e, className: t }) {
	let [n, r] = F(!1);
	if (!e) return null;
	let i = wl[e], a = t === "static", o = a ? [["black", "dark:hidden"], ["white", "hidden dark:block"]] : [["white", ""]];
	return /* @__PURE__ */ L("button", {
		type: "button",
		"aria-label": v(e === "edited" ? "ai.modified" : "ai.generated"),
		"aria-expanded": n,
		"data-open": n,
		onClick: () => r((e) => !e),
		className: M("group block cursor-default overflow-hidden rounded-full backdrop-blur-md transition-[width] duration-200", "w-[var(--ai-disc)] hover:w-[var(--ai-long)] focus-visible:w-[var(--ai-long)] data-[open=true]:w-[var(--ai-long)]", a ? "relative" : M("absolute shadow-[0_1px_3px_rgba(0,0,0,0.25)]", t ?? "bottom-2 left-2")),
		style: {
			height: 18,
			"--ai-disc": "18px",
			"--ai-long": `${i.w / i.h * 18}px`
		},
		children: o.map(([t, r]) => /* @__PURE__ */ R("span", {
			className: r,
			children: [/* @__PURE__ */ L(Tl, {
				icon: "disc",
				tone: t,
				size: 18,
				className: M("transition-opacity duration-200", n ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0")
			}), /* @__PURE__ */ L(Tl, {
				icon: e,
				tone: t,
				size: 18,
				className: M("transition-opacity duration-200", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")
			})]
		}, t))
	});
}
function Dl(e, t) {
	let r = e.type === "agent" ? n(e).fields[t] : void 0;
	return r ? g(t, r) : t;
}
function Ol({ text: e }) {
	let [t, n] = F(!1);
	return /* @__PURE__ */ R("button", {
		type: "button",
		onClick: () => {
			navigator.clipboard.writeText(e), n(!0), setTimeout(() => n(!1), 1500);
		},
		className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 text-[0.8125rem] text-ink-2 hover:text-ink coarse:h-11 coarse:px-4",
		children: [L(t ? B : Ze, { className: "size-3.5" }), v(t ? "share.copied" : "run.copy")]
	});
}
function kl({ base: e, step: t, output: n, editable: r, draft: i, onDraft: a, picked: o, onPick: s, onSurfaceAction: c, onView: l }) {
	if (!n) return null;
	let u = (t) => Rn(`${e}/assets/${t}`);
	if (n.surface) return /* @__PURE__ */ L(xl, {
		surface: n.surface,
		assetUrl: u,
		onAction: c,
		initial: n.view,
		onState: l
	});
	if (t.type === "widget" || t.type === "motion-graphics") {
		let e = n.assets?.find((e) => e.kind === "video");
		if (e) {
			let r = n.assets?.find((e) => e.kind === "poster"), i = t.type === "motion-graphics" ? t.format === "9:16" : (t.size?.height ?? 0) > (t.size?.width ?? 1), a = /* @__PURE__ */ R("div", {
				className: M("relative mx-auto", i ? "w-fit" : "w-full"),
				children: [/* @__PURE__ */ L("video", {
					src: u(e.id),
					poster: r ? u(r.id) : void 0,
					controls: !0,
					playsInline: !0,
					className: M("rounded-lg bg-black ring-1 ring-border-soft", i ? "max-h-[76vh]" : "w-full")
				}), /* @__PURE__ */ L(El, {
					ai: e.ai,
					className: "top-2 right-2"
				})]
			});
			return t.type === "motion-graphics" && n.text ? /* @__PURE__ */ R("div", {
				className: "flex flex-col gap-4",
				children: [a, /* @__PURE__ */ L(Sl, {
					text: n.text,
					className: "text-[0.875rem] text-ink-2"
				})]
			}) : a;
		}
		if (t.type === "motion-graphics") return null;
		let r = n.assets?.find((e) => e.mime === "text/html"), i = t.size ?? {
			width: 1280,
			height: 720
		};
		return r ? /* @__PURE__ */ L(Cl, {
			src: u(r.id),
			page: i.width,
			height: i.height,
			fit: !0,
			flow: t.layout === "page",
			state: n.view,
			onState: l
		}) : null;
	}
	if (t.type === "generate") {
		let e = n.assets?.[0];
		if (!e) return null;
		if (t.asset === "voice") return /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ L("audio", {
					src: u(e.id),
					controls: !0,
					className: "w-full"
				}),
				/* @__PURE__ */ L(El, {
					ai: e.ai,
					className: "static"
				}),
				n.text ? /* @__PURE__ */ L("p", {
					className: "text-[0.875rem] text-ink-2 leading-relaxed",
					children: n.text
				}) : null
			]
		});
		if ((n.assets?.length ?? 0) > 1 && (t.asset === "image" || t.asset === "video")) {
			let e = t.options?.aspectRatio === "9:16" || t.options?.aspectRatio === "2:3";
			return /* @__PURE__ */ L("div", {
				className: M("grid gap-3", e ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"),
				children: n.assets?.map((e, n) => {
					let r = o?.includes(n);
					return /* @__PURE__ */ R("figure", {
						className: M("relative overflow-hidden rounded-lg bg-paper-2 ring-1 ring-border-soft", r && "ring-2 ring-ember"),
						children: [
							t.asset === "image" ? /* @__PURE__ */ L("img", {
								src: u(e.id),
								alt: `${t.title} ${n + 1}`,
								className: "w-full"
							}) : /* @__PURE__ */ L("video", {
								src: u(e.id),
								controls: !0,
								playsInline: !0,
								loop: !0,
								className: "w-full"
							}),
							s ? /* @__PURE__ */ R("button", {
								type: "button",
								"aria-pressed": r,
								onClick: () => s(n),
								className: M("absolute top-2 left-2 inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-medium text-[0.75rem] shadow-soft backdrop-blur coarse:h-11", r ? "bg-ember text-ember-on" : "bg-card/90 text-ink-2 hover:text-ink"),
								children: [r ? /* @__PURE__ */ L(B, { className: "size-3.5" }) : null, v(r ? "run.pickedItem" : "run.pickItem", { n: n + 1 })]
							}) : /* @__PURE__ */ L("span", {
								className: "absolute top-2 left-2 rounded-full bg-card/90 px-2.5 py-1 font-medium text-[0.75rem] text-ink-2",
								children: n + 1
							}),
							/* @__PURE__ */ L(El, {
								ai: e.ai,
								className: t.asset === "image" ? "bottom-2 left-2" : "top-2 right-2"
							})
						]
					}, e.id);
				})
			});
		}
		if (t.asset === "image") return /* @__PURE__ */ R("div", {
			className: "relative",
			children: [/* @__PURE__ */ L("img", {
				src: u(e.id),
				alt: t.title,
				className: "w-full rounded-lg bg-paper-2 ring-1 ring-border-soft"
			}), /* @__PURE__ */ L(El, { ai: e.ai })]
		});
		if (t.asset === "video") {
			let n = t.options?.aspectRatio === "9:16";
			return /* @__PURE__ */ R("div", {
				className: M("relative mx-auto", n ? "w-fit" : "w-full"),
				children: [/* @__PURE__ */ L("video", {
					src: u(e.id),
					controls: !0,
					playsInline: !0,
					loop: !0,
					className: M("rounded-lg bg-black ring-1 ring-border-soft", n ? "max-h-[70vh]" : "w-full")
				}), /* @__PURE__ */ L(El, {
					ai: e.ai,
					className: "top-2 left-2"
				})]
			});
		}
		return t.asset === "document" ? /* @__PURE__ */ L(Cl, {
			src: u(e.id),
			page: 820,
			height: 1100
		}) : /* @__PURE__ */ L(Cl, {
			src: u(e.id),
			page: null,
			height: 760
		});
	}
	if (t.type === "agent") {
		let e = n.assets?.filter((e) => e.kind !== "file" && e.mime.startsWith("image/")) ?? [], o = n.assets?.filter((e) => e.kind === "file") ?? [];
		return /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-4",
			children: [
				t.output.format === "json" && n.json !== void 0 ? /* @__PURE__ */ L(Mc, {
					step: t,
					json: n.json
				}) : r ? /* @__PURE__ */ L(j, {
					value: i ?? n.text ?? "",
					onChange: (e) => a?.(e.target.value),
					minRows: 4,
					maxRows: 24
				}) : t.output.format === "markdown" ? /* @__PURE__ */ L(Sl, { text: n.text ?? "" }) : /* @__PURE__ */ L("div", {
					className: "whitespace-pre-wrap text-[1rem] leading-relaxed",
					children: n.text
				}),
				e.map((e) => /* @__PURE__ */ R("div", {
					className: "relative",
					children: [/* @__PURE__ */ L("img", {
						src: u(e.id),
						alt: "",
						className: "w-full rounded-lg ring-1 ring-border-soft"
					}), /* @__PURE__ */ L(El, { ai: e.ai })]
				}, e.id)),
				o.length ? /* @__PURE__ */ L("ul", {
					className: "overflow-hidden rounded-lg ring-1 ring-border-soft",
					children: o.map((e) => /* @__PURE__ */ L("li", {
						className: "border-border-soft border-b last:border-0",
						children: /* @__PURE__ */ R("a", {
							href: u(e.id),
							download: e.name,
							onClick: (t) => Un(t, u(e.id), e.name),
							className: "flex items-center gap-2 px-3 py-2 text-[0.8125rem] hover:bg-paper-2 coarse:min-h-11",
							children: [/* @__PURE__ */ L(ft, { className: "size-3.5 shrink-0 text-ink-3" }), /* @__PURE__ */ L("span", {
								className: "min-w-0 flex-1 truncate",
								children: e.name
							})]
						})
					}, e.id))
				}) : null,
				t.output.format !== "json" && !r && n.text ? /* @__PURE__ */ L("div", { children: /* @__PURE__ */ L(Ol, { text: n.text }) }) : null
			]
		});
	}
	return null;
}
var Al = {
	png: "PNG",
	mp4: "MP4",
	mp3: "MP3",
	pdf: "PDF",
	docx: "Word",
	html: "HTML",
	md: "Markdown",
	txt: "Text",
	csv: "CSV",
	xlsx: "Excel",
	json: "JSON",
	zip: "ZIP"
};
function jl(e, t) {
	return (e.headers.get("content-disposition") ?? "").match(/filename="([^"]+)"/)?.[1] ?? t;
}
function Ml(e) {
	let t = URL.createObjectURL(e), n = document.createElement("a");
	n.href = t, n.download = e.name, n.rel = "noopener", document.body.append(n), n.click(), n.remove(), setTimeout(() => URL.revokeObjectURL(t), 6e4);
}
function Nl({ url: e, format: t, title: n, make: r }) {
	let [i, a] = F("idle"), o = P(null), s = async () => {
		if (Bn("share") && !r) {
			a("busy"), await Vn("share", {
				url: new URL(e, location.href).href,
				title: n
			}).catch(() => void 0), a("idle");
			return;
		}
		try {
			if (!o.current) {
				if (a("busy"), r) o.current = await r();
				else {
					let n = await fetch(e, { credentials: "include" });
					if (!n.ok) throw Error(String(n.status));
					let r = await n.blob();
					o.current = new File([r], jl(n, `download.${t}`), { type: r.type.split(";")[0] });
				}
			}
			let i = {
				files: [o.current],
				title: n
			};
			if (!navigator.canShare(i)) {
				r ? Ml(o.current) : location.href = e, a("idle");
				return;
			}
			await navigator.share(i), a("idle");
		} catch (e) {
			a(o.current && e.name === "NotAllowedError" ? "ready" : "idle");
		}
	};
	return /* @__PURE__ */ R("button", {
		type: "button",
		onClick: () => void s(),
		disabled: i === "busy",
		"aria-label": v("run.shareFile"),
		title: v("run.shareFile"),
		className: M("inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-medium text-[0.8125rem] transition coarse:h-11 coarse:px-4", i === "ready" ? "bg-ember-tint text-ink ring-1 ring-ember" : "bg-paper-2 text-ink-2 hover:bg-paper-3 hover:text-ink"),
		children: [L(i === "busy" ? ae : dn, { className: "size-3.5" }), v(i === "ready" ? "run.shareNow" : "run.share")]
	});
}
var Pl = Bn("share") || hr();
function Fl({ base: e, stepId: t, formats: n, title: r, step: i, output: a, foot: o }) {
	let s = (n) => Rn(`${e}/steps/${t}/download?format=${n}`), [c, l] = F(!1), u = P(null), d = Wn() && i?.type === "agent" && a && (a.text || a.json !== void 0) ? {
		title: r ?? i.title,
		text: a.text,
		json: i.output.format === "json" ? a.json : void 0,
		label: (e) => Dl(i, e),
		foot: o
	} : null, f = async () => {
		if (!d) throw Error("nothing written");
		return u.current ??= await $c(d), u.current;
	}, p = async () => {
		l(!0);
		try {
			Ml(await f());
		} catch (e) {
			console.warn(`pdf: ${e.message}`), n.includes("html") && window.open(s("html"), "_blank", "noopener");
		} finally {
			l(!1);
		}
	}, m = (e) => M("inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 font-medium text-[0.8125rem] transition coarse:h-11 coarse:px-4", e === 0 ? "bg-primary text-primary-foreground hover:brightness-105" : "bg-paper-2 text-ink-2 hover:bg-paper-3 hover:text-ink"), h = (e) => e === "pdf" && d !== null;
	return /* @__PURE__ */ R("div", {
		className: "flex flex-wrap gap-2",
		children: [n.map((e, t) => h(e) ? /* @__PURE__ */ R("button", {
			type: "button",
			onClick: () => void p(),
			disabled: c,
			className: m(t),
			children: [c ? /* @__PURE__ */ L(ae, { className: "size-3.5" }) : t === 0 ? /* @__PURE__ */ L(V, { className: "size-3.5" }) : null, Al[e]]
		}, e) : e === "html" && Wn() ? /* @__PURE__ */ R("a", {
			href: s(e),
			target: "_blank",
			rel: "noopener",
			className: m(t),
			children: [t === 0 ? /* @__PURE__ */ L(en, { className: "size-3.5" }) : null, v("run.print")]
		}, e) : /* @__PURE__ */ R("a", {
			href: s(e),
			onClick: (t) => Un(t, s(e)),
			className: m(t),
			children: [t === 0 ? /* @__PURE__ */ L(V, { className: "size-3.5" }) : null, Al[e]]
		}, e)), Pl && n.length ? /* @__PURE__ */ L(Nl, {
			url: s(n[0]),
			format: n[0],
			title: r,
			make: h(n[0]) ? f : void 0
		}, s(n[0])) : null]
	});
}
//#endregion
//#region src/RunnerView.tsx
function Il({ view: e }) {
	let t = Math.round(Math.min(e.progress.done, e.progress.total) / Math.max(1, e.progress.total) * 100);
	return /* @__PURE__ */ L("div", {
		className: "h-[3px] w-full bg-paper-2",
		children: /* @__PURE__ */ L("div", {
			className: "h-full bg-ember transition-[width] duration-700 ease-out",
			style: { width: `${t}%` }
		})
	});
}
var Ll = (e, t) => (n) => {
	H.put(`${U(e)}/views/${t}`, { state: n }).catch(() => void 0);
};
function Rl({ title: e, description: t, kicker: n }) {
	return /* @__PURE__ */ R("div", {
		className: "kb-title mb-8",
		children: [
			n ? /* @__PURE__ */ L("p", {
				className: "kb-hide mb-4 text-[0.9375rem] text-ink-2 leading-relaxed",
				children: n
			}) : null,
			/* @__PURE__ */ L("h1", {
				className: "wizard-title font-display font-semibold text-[1.75rem] leading-[1.15] tracking-tight sm:text-[2rem]",
				children: e
			}),
			t ? /* @__PURE__ */ L("p", {
				className: "kb-hide mt-2 text-[0.9375rem] text-ink-3 leading-relaxed",
				children: t
			}) : null
		]
	});
}
function zl(e, t) {
	let n = {};
	for (let r of e.fields) n[r.id] = t.values[r.id] ?? t.prefill?.[r.id] ?? r.default ?? (r.kind === "multiselect" ? [] : void 0);
	return n;
}
function Bl(e) {
	return Array.from(e.querySelectorAll("input:not([type=\"hidden\"], [type=\"file\"], [type=\"checkbox\"], [type=\"color\"], [type=\"range\"], [disabled]), textarea:not([disabled])")).filter((e) => !e.closest("dialog") && e.offsetParent !== null);
}
function Vl({ view: e, run: t, step: n }) {
	let [r, i] = F(() => zl(n, e)), [a, o] = F(/* @__PURE__ */ new Set()), s = P(null), c = e.progress.done === 0, l = me(() => n.fields.filter((t) => !p(t) || e.decidedFields?.includes(t.id)).map((t) => e.options?.[t.id]?.length ? {
		...t,
		options: e.options[t.id]
	} : t), [
		n.fields,
		e.options,
		e.decidedFields
	]), u = T(l, e.known ?? {}, r), d = () => void t.submitPage(n.id, r);
	return N(() => {
		if (!s.current) return;
		let e = Bl(s.current).filter((e) => e instanceof HTMLInputElement);
		for (let [t, n] of e.entries()) (n.dataset.hint || !n.hasAttribute("enterkeyhint")) && (n.dataset.hint = "1", n.setAttribute("enterkeyhint", t === e.length - 1 ? "go" : "next"));
	}), /* @__PURE__ */ R("form", {
		ref: s,
		className: "animate-rise",
		onSubmit: (e) => {
			e.preventDefault(), a.size || d();
		},
		onKeyDown: (e) => {
			let t = e.target;
			if (e.key !== "Enter" || e.defaultPrevented || e.nativeEvent.isComposing || !(t instanceof HTMLInputElement) || t.closest("dialog")) return;
			let n = Bl(e.currentTarget), r = n[n.indexOf(t) + 1];
			r && (e.preventDefault(), r.focus());
		},
		children: [
			/* @__PURE__ */ L(Rl, {
				title: n.title,
				description: n.description,
				kicker: c ? e.wizard.intro : null
			}),
			/* @__PURE__ */ L("div", {
				className: "flex flex-col gap-7",
				children: u.map((n) => /* @__PURE__ */ L(ea, {
					field: n,
					value: r[n.id],
					values: r,
					runId: e.id,
					view: e,
					error: t.fieldErrors[n.id],
					closed: e.closed?.[n.id],
					onChange: (e) => i((t) => ({
						...t,
						[n.id]: e
					})),
					onBusy: (e) => o((t) => {
						if (t.has(n.id) === e) return t;
						let r = new Set(t);
						return e ? r.add(n.id) : r.delete(n.id), r;
					})
				}, n.id))
			}),
			/* @__PURE__ */ L(Hl, {
				view: e,
				run: t,
				sticky: !0,
				children: /* @__PURE__ */ R(D, {
					type: "submit",
					size: "lg",
					busy: t.busy,
					disabled: a.size > 0,
					children: [
						n.cta || v("run.next"),
						" ",
						/* @__PURE__ */ L(Pe, { className: "size-4" })
					]
				})
			})
		]
	});
}
function Hl({ view: e, run: t, sticky: n, children: r }) {
	return /* @__PURE__ */ R("div", {
		className: M("mt-10 flex items-center justify-between gap-3", n && "action-bar"),
		children: [e.canBack ? /* @__PURE__ */ R(D, {
			variant: "ghost",
			onClick: () => void t.back(),
			disabled: t.busy,
			children: [
				/* @__PURE__ */ L(Me, { className: "size-4" }),
				" ",
				v("run.back")
			]
		}) : /* @__PURE__ */ L("span", {}), r]
	});
}
function Ul() {
	let e = lr(), [t, n] = F(!1), r = e !== "off";
	return /* @__PURE__ */ R("div", {
		className: "mt-6 flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ R("button", {
			type: "button",
			"aria-pressed": r,
			disabled: t,
			onClick: async () => {
				if (r) {
					fr();
					return;
				}
				n(!0), await dr(), n(!1);
			},
			className: M("inline-flex h-11 items-center gap-2 rounded-full px-4 font-medium text-[0.875rem] ring-1 transition", r ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink hover:ring-ink-4"),
			children: [r ? /* @__PURE__ */ L(Re, { className: "size-4 text-ember-strong" }) : /* @__PURE__ */ L(Be, { className: "size-4" }), v(r ? "notify.on" : "notify.ask")]
		}), /* @__PURE__ */ L("p", {
			className: "max-w-xs text-[0.75rem] text-ink-4 leading-relaxed",
			children: v(e === "off" ? "notify.why" : e === "on" ? "notify.onHint" : ur() ? "notify.blocked" : "notify.quiet")
		})]
	});
}
function Wl({ view: e, compact: t, awake: n }) {
	let r = me(() => {
		let t = [...e.events].reverse().find((t) => t.type === "step_started" && t.stepId === e.step?.id);
		return t ? new Date(t.at).getTime() : Date.now();
	}, [e.events, e.step?.id]), [i, a] = F(Date.now());
	N(() => {
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, []);
	let o = [...e.events].reverse().find((t) => t.type === "step_started" && t.stepId === e.step?.id)?.message ?? e.step?.title ?? v("run.working"), s = e.events.filter((e) => (e.type === "tool" || e.type === "info") && new Date(e.at).getTime() >= r - 500), c = s.slice(-4), { Mascot: l } = Ln(), u = [...new Set(s.map((e) => e.asset).filter((e) => !!e))], d = [...s].reverse().find((e) => e.asset)?.asset;
	return /* @__PURE__ */ R("div", {
		className: "flex animate-rise flex-col items-center pt-6 text-center",
		children: [
			/* @__PURE__ */ L(l, {
				kind: e.wizard.avatar,
				costume: e.wizard.costume,
				size: t ? 130 : 170,
				fluffy: !0
			}),
			/* @__PURE__ */ L("h2", {
				className: "wizard-heading mt-4 font-display font-semibold text-[1.375rem] tracking-tight",
				children: o
			}),
			/* @__PURE__ */ L("div", {
				className: "mt-1 text-[0.8125rem] text-ink-4 tabular-nums",
				children: v("run.elapsed", { s: Math.max(0, Math.round((i - r) / 1e3)) })
			}),
			u.length ? /* @__PURE__ */ L("div", {
				className: "mt-5 flex max-w-full flex-wrap justify-center gap-2",
				children: u.slice(-8).map((t) => /* @__PURE__ */ L("img", {
					src: Rn(`${U(e.id)}/assets/${t}`),
					alt: "",
					className: M("size-16 animate-rise rounded-lg bg-paper-2 object-cover ring-1 ring-border-soft transition sm:size-20", t === d ? "ring-2 ring-ember" : "opacity-70")
				}, t))
			}) : null,
			/* @__PURE__ */ L("div", {
				className: "mt-6 flex min-h-[7rem] w-full max-w-sm flex-col gap-1.5",
				children: c.map((e, t) => /* @__PURE__ */ R("div", {
					className: M("flex items-center justify-center gap-2 text-[0.8125rem] transition-opacity", t === c.length - 1 ? "text-ink-2" : "text-ink-4"),
					children: [t === c.length - 1 ? /* @__PURE__ */ L(hn, { className: "size-3.5 animate-breathe text-ember" }) : null, /* @__PURE__ */ L("span", {
						className: "truncate",
						children: y(e)
					})]
				}, e.id))
			}),
			t ? null : /* @__PURE__ */ L(Ul, {}),
			n ? /* @__PURE__ */ L("p", {
				className: "mt-3 text-[0.75rem] text-ink-4",
				children: v("run.awake")
			}) : null
		]
	});
}
function Gl(e) {
	let t = P({
		running: !1,
		since: 0,
		ask: null
	});
	N(() => {
		if (!e) return;
		let n = t.current, r = e.status === "running", i = r ? n.running ? n.since : Date.now() : 0, a = (t) => {
			document.visibilityState !== "visible" && !document.title.startsWith("● ") && (document.title = `● ${document.title}`), mr({
				title: e.wizard.title,
				body: t,
				tag: e.id
			});
		};
		r && e.ask && e.ask.id !== n.ask ? a(v("notify.needsYou")) : !r && n.running && Date.now() - n.since > 8e3 && a(e.status === "failed" ? v("run.failed") : e.status === "done" ? v("notify.done") : v("notify.next")), t.current = {
			running: r,
			since: i,
			ask: e.ask?.id ?? null
		};
	}, [e]), N(() => {
		let e = () => {
			document.visibilityState === "visible" && document.title.startsWith("● ") && (document.title = document.title.slice(2));
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []);
}
function Kl({ view: e, run: t, step: r, studio: i }) {
	let [a, o] = F({}), [s, c] = F({}), [l, u] = F(""), d = e.shown.filter((e) => e.output), [f, p] = F(d.length === 1 ? d[0].step.id : null), [m, h] = F({}), g = P(null), _ = d.find((e) => e.step.id === f), y = _?.step.type === "generate" && (_.output?.assets?.length ?? 0) > 1, b = () => {
		_ && l.trim() && t.regenerate(r.id, _.step.id, l.trim(), m[_.step.id]);
	};
	return /* @__PURE__ */ R("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ L(Rl, {
				title: r.title,
				description: r.description
			}),
			/* @__PURE__ */ R("div", {
				className: "flex flex-col gap-6",
				children: [
					e.shown.filter((e) => e.output).map(({ step: t, output: l }) => {
						let u = ti(t) ? t : null, d = !!r.edit && t.type === "agent" && (t.output.format !== "json" || !!u), f = a[t.id], _ = (e) => /* @__PURE__ */ R("div", {
							className: "mb-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ L("h3", {
								className: "font-medium text-[0.8125rem] text-ink-3 uppercase tracking-[0.06em]",
								children: t.title
							}), /* @__PURE__ */ R("div", {
								className: "flex items-center",
								children: [d && !s[t.id] ? /* @__PURE__ */ R("button", {
									type: "button",
									onClick: () => c((e) => ({
										...e,
										[t.id]: !0
									})),
									className: "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] text-ink-2 hover:bg-accent hover:text-ink coarse:h-11",
									children: [
										/* @__PURE__ */ L(Xt, { className: "size-3.5" }),
										" ",
										v("run.edit")
									]
								}) : null, e]
							})]
						}), y = u && l && d && s[t.id] ? /* @__PURE__ */ L("div", {
							className: "overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
							children: /* @__PURE__ */ L(Zr, {
								shape: n(u),
								value: f && typeof f == "object" ? f : l.json ?? {},
								onChange: (e) => o((n) => ({
									...n,
									[t.id]: e
								})),
								start: "edit"
							})
						}) : /* @__PURE__ */ L(kl, {
							base: `${U(e.id)}`,
							step: t,
							output: l,
							onView: Ll(e.id, t.id),
							editable: d && s[t.id] && !u,
							draft: typeof f == "string" ? f : void 0,
							onDraft: (e) => o((n) => ({
								...n,
								[t.id]: e
							})),
							picked: m[t.id],
							onPick: r.regenerate ? (e) => {
								p(t.id), h((n) => {
									let r = n[t.id] ?? [];
									return {
										...n,
										[t.id]: r.includes(e) ? r.filter((t) => t !== e) : [...r, e]
									};
								}), g.current?.focus();
							} : void 0,
							onSurfaceAction: r.regenerate ? () => {
								p(t.id), g.current?.focus();
							} : void 0
						});
						return /* @__PURE__ */ L("section", { children: i && u && l ? /* @__PURE__ */ L(ni, {
							runId: e.id,
							step: u,
							output: l,
							header: _,
							children: y
						}) : /* @__PURE__ */ R(I, { children: [_(null), y] }) }, t.id);
					}),
					e.lists.map((t) => /* @__PURE__ */ R("section", { children: [/* @__PURE__ */ L("h3", {
						className: "mb-2 font-medium text-[0.8125rem] text-ink-3 uppercase tracking-[0.06em]",
						children: t.def.title
					}), t.def.check ? /* @__PURE__ */ L(Ii, {
						runId: e.id,
						list: t
					}) : /* @__PURE__ */ L(Ni, {
						runId: e.id,
						list: t,
						editable: !0
					})] }, t.def.id)),
					r.regenerate && d.length ? /* @__PURE__ */ R(ee, {
						className: "p-3",
						children: [
							d.length > 1 ? /* @__PURE__ */ R("div", {
								className: "flex flex-wrap items-center gap-1.5 px-1 pb-2",
								children: [/* @__PURE__ */ L("span", {
									className: "mr-1 text-[0.8125rem] text-ink-3",
									children: v("run.feedbackTarget")
								}), d.map(({ step: e }) => /* @__PURE__ */ L("button", {
									type: "button",
									"aria-pressed": f === e.id,
									onClick: () => {
										p(e.id), g.current?.focus();
									},
									className: M("inline-flex h-8 items-center rounded-full px-3 text-[0.8125rem] ring-1 transition coarse:h-11", f === e.id ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink"),
									children: e.title
								}, e.id))]
							}) : null,
							/* @__PURE__ */ L(j, {
								ref: g,
								minRows: 2,
								maxRows: 8,
								value: l,
								placeholder: v("run.feedbackPlaceholder"),
								onChange: (e) => u(e.target.value),
								onKeyDown: (e) => {
									e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
								},
								className: "border-0 bg-transparent shadow-none focus:ring-0"
							}),
							/* @__PURE__ */ R("div", {
								className: "flex items-center justify-between gap-3 px-1 pt-1",
								children: [/* @__PURE__ */ L("span", {
									className: "min-w-0 text-[0.75rem] text-ink-3",
									children: y ? m[_.step.id]?.length ? v("run.regeneratePicked", { n: [...m[_.step.id]].sort((e, t) => e - t).map((e) => e + 1).join(", ") }) : v("run.regenerateAll") : !_ && l.trim() ? v("run.feedbackPick") : null
								}), /* @__PURE__ */ R(D, {
									size: "sm",
									variant: "secondary",
									busy: t.busy,
									disabled: !l.trim() || !_,
									onClick: b,
									children: [
										/* @__PURE__ */ L(nn, { className: "size-3.5" }),
										" ",
										v("run.regenerateGo")
									]
								})]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ L(Hl, {
				view: e,
				run: t,
				sticky: !0,
				children: /* @__PURE__ */ R(D, {
					size: "lg",
					busy: t.busy,
					onClick: () => void t.accept(r.id, Object.keys(a).length ? a : void 0),
					children: [
						v("run.accept"),
						" ",
						/* @__PURE__ */ L(Pe, { className: "size-4" })
					]
				})
			})
		]
	});
}
function ql({ view: e, run: t, step: n, onRestart: r, studio: i }) {
	let a = e.shown.filter((e) => e.output), { Mascot: o, ShareResultButton: s, RunEnd: c } = Ln();
	return /* @__PURE__ */ R("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ R("div", {
				className: "mb-8 flex flex-wrap items-center gap-x-4 gap-y-5",
				children: [
					/* @__PURE__ */ L(o, {
						kind: e.wizard.avatar,
						costume: e.wizard.costume,
						size: 64
					}),
					/* @__PURE__ */ R("div", {
						className: "min-w-0 flex-1 basis-[12rem]",
						children: [/* @__PURE__ */ L("h1", {
							className: "wizard-title text-balance font-display font-semibold text-[1.75rem] leading-tight tracking-tight sm:text-[2rem]",
							children: n.title
						}), n.message ? /* @__PURE__ */ L("p", {
							className: "mt-1 text-[0.9375rem] text-ink-3",
							children: n.message
						}) : null]
					}),
					s && e.shown.some((e) => e.output) ? /* @__PURE__ */ L("div", {
						className: "max-sm:basis-full",
						children: /* @__PURE__ */ L(s, {
							view: e,
							title: `${n.title} · ${e.wizard.title}`
						})
					}) : null
				]
			}),
			/* @__PURE__ */ R("div", {
				className: "flex flex-col gap-6",
				children: [a.map(({ step: n, output: r, formats: a, label: o }) => {
					let s = (t) => /* @__PURE__ */ R("div", {
						className: "mb-3 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ L("h3", {
							className: "font-display font-semibold text-[1.0625rem]",
							children: o ?? n.title
						}), /* @__PURE__ */ R("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ L(Fl, {
								base: `${U(e.id)}`,
								stepId: n.id,
								formats: a,
								title: o ?? n.title,
								step: n,
								output: r ?? void 0,
								foot: `${e.wizard.title} · ${(/* @__PURE__ */ new Date()).toLocaleDateString(Ln().lang)}`
							}), t]
						})]
					}), c = /* @__PURE__ */ L(Yl, {
						view: e,
						run: t,
						step: n,
						output: r,
						onView: Ll(e.id, n.id)
					});
					return /* @__PURE__ */ R(ee, {
						className: "p-4 sm:p-5",
						children: [i && ti(n) && r ? /* @__PURE__ */ L(ni, {
							runId: e.id,
							step: n,
							output: r,
							header: s,
							children: c
						}) : /* @__PURE__ */ R(I, { children: [s(null), c] }), r?.assets?.some((e) => e.ai) ? /* @__PURE__ */ L("p", {
							className: "mt-3 text-[0.75rem] text-ink-3 leading-relaxed",
							children: v("ai.publish")
						}) : null]
					}, n.id);
				}), e.lists.map((t) => /* @__PURE__ */ R(ee, {
					className: "p-4 sm:p-5",
					children: [/* @__PURE__ */ R("div", {
						className: "mb-3 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ L("h3", {
							className: "font-display font-semibold text-[1.0625rem]",
							children: t.label ?? t.def.title
						}), /* @__PURE__ */ L(Ri, {
							runId: e.id,
							list: t
						})]
					}), /* @__PURE__ */ L(Ni, {
						runId: e.id,
						list: t,
						editable: !0
					})]
				}, t.def.id))]
			}),
			c && !i ? /* @__PURE__ */ L(c, { view: e }) : null,
			/* @__PURE__ */ L(Hl, {
				view: e,
				run: t,
				children: r ? /* @__PURE__ */ R(D, {
					variant: "secondary",
					onClick: r,
					children: [
						/* @__PURE__ */ L(an, { className: "size-4" }),
						" ",
						v("run.again")
					]
				}) : /* @__PURE__ */ L("span", {})
			})
		]
	});
}
function Jl({ view: e, run: t }) {
	let { Mascot: n, RunEnd: r } = Ln();
	return /* @__PURE__ */ R("div", {
		className: "flex animate-rise flex-col items-center pt-8 text-center",
		children: [
			/* @__PURE__ */ L(n, {
				kind: e.wizard.avatar,
				costume: e.wizard.costume,
				size: 90
			}),
			/* @__PURE__ */ L("h2", {
				className: "wizard-heading mt-4 font-display font-semibold text-[1.375rem]",
				children: v("run.failed")
			}),
			/* @__PURE__ */ L("p", {
				className: "mt-2 max-w-md text-[0.9375rem] text-ink-3",
				children: /* @__PURE__ */ L(ne, { text: e.error ?? "" })
			}),
			/* @__PURE__ */ R("div", {
				className: "mt-8 flex gap-3",
				children: [e.canBack ? /* @__PURE__ */ R(D, {
					variant: "ghost",
					onClick: () => void t.back(),
					children: [
						/* @__PURE__ */ L(Me, { className: "size-4" }),
						" ",
						v("run.back")
					]
				}) : null, /* @__PURE__ */ R(D, {
					onClick: () => void t.retry(),
					busy: t.busy,
					children: [
						/* @__PURE__ */ L(an, { className: "size-4" }),
						" ",
						v("run.retry")
					]
				})]
			}),
			r ? /* @__PURE__ */ L(r, {
				view: e,
				failed: !0
			}) : null
		]
	});
}
function Yl({ view: e, run: t, step: n, output: r, onView: i }) {
	let [a, o] = F(!1), [s, c] = F(!1), l = U(e.id), u = e.translation?.results[n.id];
	if (!(e.translation && r?.text && t.translateResult)) return /* @__PURE__ */ L(kl, {
		base: l,
		step: n,
		output: r,
		onView: i
	});
	let d = u && !a ? {
		...r,
		text: u
	} : r;
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L(kl, {
		base: l,
		step: n,
		output: d,
		onView: i
	}), /* @__PURE__ */ L("div", {
		className: "mt-3 flex items-center gap-3 text-[0.8125rem] text-ink-3",
		children: u ? /* @__PURE__ */ R(I, { children: [a ? null : /* @__PURE__ */ L("span", { children: v("translation.machine") }), /* @__PURE__ */ L("button", {
			type: "button",
			className: "underline-offset-4 hover:text-ink hover:underline coarse:min-h-11",
			onClick: () => o((e) => !e),
			children: v(a ? "translation.showTranslated" : "translation.showOriginal")
		})] }) : /* @__PURE__ */ R(D, {
			size: "sm",
			variant: "secondary",
			busy: s,
			onClick: async () => {
				c(!0), await t.translateResult?.(n.id), c(!1);
			},
			children: [
				/* @__PURE__ */ L(Et, { className: "size-4" }),
				" ",
				v(s ? "translation.working" : "result.translate")
			]
		})
	})] });
}
function Xl({ run: e, compact: t, onRestart: n, onView: r, stickyProgress: i, studio: a }) {
	let { view: o } = e;
	b(o?.translation?.labels), N(() => {
		r?.(o);
	}, [o, r]), $n();
	let s = er(o?.status === "running" && !o.ask);
	if (Gl(o), e.notFound) return /* @__PURE__ */ L("div", {
		className: "py-24 text-center text-ink-3",
		children: v("run.notFound")
	});
	if (!o) return /* @__PURE__ */ L("div", {
		className: "flex justify-center py-24 text-ink-4",
		children: /* @__PURE__ */ L(ae, {})
	});
	let c = o.step, l = null;
	if (o.status === "running" && o.ask) l = /* @__PURE__ */ L(Jn, {
		runId: o.id,
		ask: o.ask
	}, o.ask.id);
	else if (o.status === "running") l = /* @__PURE__ */ L(Wl, {
		view: o,
		compact: t,
		awake: s
	});
	else if (o.status === "failed") l = /* @__PURE__ */ L(Jl, {
		view: o,
		run: e
	});
	else if (o.status === "cancelled") l = /* @__PURE__ */ L("div", {
		className: "py-24 text-center text-ink-3",
		children: v("run.cancelled")
	});
	else if (c?.type === "page") l = /* @__PURE__ */ L(Vl, {
		view: o,
		run: e,
		step: c
	}, c.id);
	else if (c?.type === "review") {
		let t = o.shown.map((e) => e.output?.at ?? "").join("|");
		l = /* @__PURE__ */ L(Kl, {
			view: o,
			run: e,
			step: c,
			studio: a
		}, `${c.id}:${t}`);
	} else c?.type === "result" && (l = /* @__PURE__ */ L(ql, {
		view: o,
		run: e,
		step: c,
		onRestart: n,
		studio: a
	}));
	let u = c?.type === "review" && o.status === "waiting_input" && o.lists.some((e) => e.def.check);
	return /* @__PURE__ */ R("div", {
		className: "flex min-h-full flex-col",
		children: [i ? /* @__PURE__ */ L("div", {
			className: "sticky top-0 z-10",
			children: /* @__PURE__ */ L(Il, { view: o })
		}) : /* @__PURE__ */ L(Il, { view: o }), /* @__PURE__ */ R("div", {
			className: M("safe-x kb-tight mx-auto w-full flex-1", u ? "max-w-[1240px] py-8" : t ? "max-w-[620px] py-8" : "max-w-[640px] py-8 sm:py-16"),
			children: [
				l,
				e.error && o.status !== "failed" ? /* @__PURE__ */ L("div", {
					className: "mt-4 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
					children: e.error
				}) : null,
				o.keeps && o.status !== "running" ? /* @__PURE__ */ L("div", {
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ L(zi, { runId: o.id })
				}) : null
			]
		})]
	});
}
//#endregion
export { El as AiBadge, An as ApiError, Jn as AskPanel, Ai as ConnectionField, Zr as DataEditor, Qr as DataMenu, Fl as DownloadButtons, Al as FORMAT_LABEL, ea as FieldInput, Cl as HtmlFrame, ei as JsonSchemaDialog, Ii as ListCheck, Ri as ListDownloads, Ni as ListTable, Kn as LiveBrowser, Sl as Markdown, kl as OutputView, f as RUNNER_TEXTS, Xl as RunnerBody, zi as StoreButton, ni as StudioData, xl as SurfaceView, H as api, hr as canShareFiles, Qn as canUseMedia, C as choiceLabel, In as configureRunner, Nn as createApi, ti as editableData, y as eventText, zl as initialValues, jn as isOffline, Zn as isTouch, aa as loadBrandFace, Ln as runnerEnv, h as runnerLangCode, u as runnerTable, Mn as safeJson, b as setChoiceLabels, S as setRunnerLang, d as setRunnerTable, gr as shrinkImage, v as t, Ji as textHints, Gl as useDoneSignal, $n as useKeyboardInset, lr as useNotifyState, w as useRunnerLang, er as useWakeLock };

//# sourceMappingURL=index.js.map