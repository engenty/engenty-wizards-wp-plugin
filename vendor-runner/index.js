import { n as e } from "./chunks/rolldown-runtime-DtPi1Y-2.js";
import { a as t, f as n, g as r, i, m as a, p as o, r as s, s as c } from "./chunks/definition-dqKu0H5N.js";
import { createContext as l, createElement as u, forwardRef as d, useContext as f, useEffect as p, useLayoutEffect as m, useMemo as h, useRef as g, useState as _, useSyncExternalStore as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var S = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function C(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: S(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var ee = (e) => {
	let t = "", n = !1;
	for (let r of e) {
		if (r === "-" || r === "_" || r <= " ") {
			n = t.length > 0;
			continue;
		}
		t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1;
	}
	return t;
}, w = (e) => {
	let t = ee(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, T = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), E = {
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
function D(e) {
	return e != null;
}
function O(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? E.width, a = e.size ?? e.height ?? E.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? T(...c) : T("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? E["stroke-width"]) * Number(e.size ?? e.width ?? E.width) / Number(t.size ?? t.width ?? E.width) : t.strokeWidth ?? E["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(E).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && D(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && D(t.width) && { [r("width")]: t.width },
			..."height" in t && D(t.height) && { [r("height")]: t.height },
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
function te(e, t = {}) {
	return O(e, {
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
var ne = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, k = l({}), A = () => f(k), j = d(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: d = {
	node: l,
	aliases: [],
	size: 24
}, ...f }, p) => {
	let { size: m = 24, strokeWidth: h = 2, absoluteStrokeWidth: g = !1, nonScalingStroke: _ = !1, color: v = "currentColor", className: y = "" } = A() ?? {}, b = !!c || ne(f), [x, S, C = []] = te(d, {
		color: e ?? v,
		width: n ?? t ?? m,
		height: r ?? t ?? m,
		strokeWidth: i ?? h,
		absoluteStrokeWidth: a ?? g,
		nonScalingStroke: o ?? _,
		className: T(y, s),
		hasA11yProp: b,
		attributes: f
	});
	return u(x, {
		ref: p,
		...S
	}, [...C.map(([e, t]) => u(e, t)), ...Array.isArray(c) ? c : [c]]);
});
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function M(e, t = [], n = []) {
	let r = typeof e == "string" ? C(e, t, n) : e, i = d(({ className: e, ...t }, n) => u(j, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = w(r.name)), i;
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-react@1.49.0_@types+react@19.3.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs
var re = {
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
re.node;
var ie = M(re), ae = {
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
ae.node;
var oe = M(ae), N = {
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
N.node;
var se = M(N), ce = {
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
ce.node;
var le = M(ce), ue = {
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
ue.node;
var de = M(ue), fe = {
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
fe.node;
var pe = M(fe), me = {
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
me.node;
var he = M(me), P = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
P.node;
var ge = M(P), F = {
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
F.node;
var _e = M(F), ve = {
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
ve.node;
var ye = M(ve), be = {
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
be.node;
var xe = M(be), Se = {
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
Se.node;
var Ce = M(Se), we = {
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
we.node;
var Te = M(we), Ee = {
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
Ee.node;
var De = M(Ee), Oe = {
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
Oe.node;
var ke = M(Oe), Ae = {
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
Ae.node;
var je = M(Ae), Me = {
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
Me.node;
var Ne = M(Me), Pe = {
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
Pe.node;
var Fe = M(Pe), Ie = {
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
Ie.node;
var Le = M(Ie), Re = {
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
Re.node;
var ze = M(Re), Be = {
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
Be.node;
var Ve = M(Be), He = {
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
He.node;
var Ue = M(He), We = {
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
We.node;
var Ge = M(We), Ke = {
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
Ke.node;
var qe = M(Ke), Je = {
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
Je.node;
var Ye = M(Je), Xe = {
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
Xe.node;
var Ze = M(Xe), Qe = {
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
Qe.node;
var $e = M(Qe), et = {
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
et.node;
var tt = M(et), nt = {
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
nt.node;
var rt = M(nt), it = {
	name: "paperclip",
	size: 24,
	node: [["path", {
		d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
		key: "1miecu"
	}]]
};
it.node;
var at = M(it), ot = {
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
ot.node;
var st = M(ot), I = {
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
I.node;
var ct = M(I), lt = {
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
lt.node;
var ut = M(lt), dt = {
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
dt.node;
var ft = M(dt), pt = {
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
pt.node;
var mt = M(pt), ht = {
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
ht.node;
var gt = M(ht), _t = {
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
_t.node;
var vt = M(_t), yt = {
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
yt.node;
var bt = M(yt), xt = {
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
xt.node;
var St = M(xt), Ct = {
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
Ct.node;
var wt = M(Ct), Tt = {
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
Tt.node;
var Et = M(Tt), Dt = {
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
Dt.node;
var Ot = M(Dt), kt = {
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
kt.node;
var At = M(kt), jt = {
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
jt.node;
var Mt = M(jt), Nt = {
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
Nt.node;
var Pt = M(Nt), Ft = {
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
Ft.node;
var It = M(Ft), Lt = {
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
Lt.node;
var Rt = M(Lt), zt = {
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
zt.node;
var Bt = M(zt), Vt = {
	entry: {
		de: "Eintrag {n} von {total}",
		en: "Entry {n} of {total}"
	},
	deciding: {
		de: "Entscheidet, wie es weitergeht …",
		en: "Deciding how to go on …"
	},
	choosingFields: {
		de: "Wählt die passenden Fragen …",
		en: "Choosing the right questions …"
	},
	batchDone: {
		de: "{done} von {total} fertig",
		en: "{done} of {total} done"
	},
	editing: {
		de: "Bearbeitet {n} von {total}",
		en: "Editing {n} of {total}"
	},
	filming: {
		de: "Dreht {n} von {total}",
		en: "Filming {n} of {total}"
	},
	clipsRendering: {
		de: "{count} Clips werden gerendert – das dauert einige Minuten.",
		en: "Rendering {count} clips – this takes a few minutes."
	},
	videoRendering: {
		de: "Das Video wird gerendert – das dauert meist 1–3 Minuten.",
		en: "Rendering the video – this usually takes 1–3 minutes."
	},
	photo: {
		de: "Sieht sich Foto {n} von {total} an",
		en: "Looking at photo {n} of {total}"
	},
	listen: {
		de: "Hört „{label}“ an …",
		en: "Listening to “{label}” …"
	},
	listenFailed: {
		de: "„{label}“ konnte nicht verschriftlicht werden.",
		en: "“{label}” could not be written down."
	},
	filmCutting: {
		de: "Der Film wird geschnitten – das dauert etwa eine Minute.",
		en: "Cutting the film – this takes about a minute."
	},
	filmProgress: {
		de: "{pct} % geschnitten",
		en: "{pct} % cut"
	},
	filmError: {
		de: "Der Film meldet: {detail}",
		en: "The film reports: {detail}"
	},
	widgetError: {
		de: "Das Widget meldet einen Fehler: {detail}",
		en: "The widget reports an error: {detail}"
	},
	mcpConnected: {
		de: "Verbunden mit {names}",
		en: "Connected to {names}"
	},
	mcpUnreachable: {
		de: "MCP-Server nicht erreichbar: {detail}",
		en: "MCP server unreachable: {detail}"
	},
	reads: {
		de: "Liest {name}",
		en: "Reading {name}"
	},
	readsMany: {
		de: "Liest {count} Dokumente",
		en: "Reading {count} documents"
	},
	opens: {
		de: "Öffnet {name}",
		en: "Opening {name}"
	},
	clicks: {
		de: "Klickt im Browser",
		en: "Clicking in the browser"
	},
	clicksOn: {
		de: "Klickt auf „{name}“",
		en: "Clicking “{name}”"
	},
	types: {
		de: "Tippt im Browser",
		en: "Typing in the browser"
	},
	typesText: {
		de: "Tippt „{text}“",
		en: "Typing “{text}”"
	},
	selects: {
		de: "Wählt „{option}“",
		en: "Choosing “{option}”"
	},
	scrolls: {
		de: "Scrollt",
		en: "Scrolling"
	},
	presses: {
		de: "Drückt {key}",
		en: "Pressing {key}"
	},
	goesBack: {
		de: "Geht eine Seite zurück",
		en: "Going back a page"
	},
	waitsForPage: {
		de: "Wartet auf die Seite",
		en: "Waiting for the page"
	},
	fastLoop: {
		de: "Erledigt im Browser: {goal}",
		en: "Doing in the browser: {goal}"
	},
	personDrives: {
		de: "Du steuerst den Browser – der Wizard wartet",
		en: "You are driving the browser – the wizard waits"
	},
	agentDrives: {
		de: "Der Wizard macht im Browser weiter",
		en: "The wizard carries on in the browser"
	},
	looksAtPage: {
		de: "Sieht sich die Seite an",
		en: "Looking at the page"
	},
	waitsForSignIn: {
		de: "Wartet auf deine Anmeldung bei {name}",
		en: "Waiting for you to sign in at {name}"
	},
	downloads: {
		de: "Lädt {name} herunter",
		en: "Downloading {name}"
	},
	runs: {
		de: "Führt aus: {command}",
		en: "Running: {command}"
	},
	python: {
		de: "Führt Python aus",
		en: "Running Python"
	},
	drawing: {
		de: "Zeichnet ein Bild",
		en: "Drawing an image"
	},
	writesPage: {
		de: "Schreibt die Seite „{title}“",
		en: "Writing the page “{title}”"
	},
	searchesDocuments: {
		de: "Sucht in den Dokumenten: {query}",
		en: "Searching the documents: {query}"
	},
	searchesKnowledge: {
		de: "Sucht in Wissen: {query} – {relevant} von {candidates} passen",
		en: "Searching the knowledge: {query} – {relevant} of {candidates} fit"
	},
	listsKnowledge: {
		de: "Listet Wissen",
		en: "Listing the knowledge"
	},
	searchesMail: {
		de: "Durchsucht {label}",
		en: "Searching {label}"
	},
	savesReceipts: {
		de: "Speichert {count} Belege aus {label}",
		en: "Saving {count} receipts from {label}"
	},
	remembers: {
		de: "Merkt sich {title}",
		en: "Remembering {title}"
	},
	files: {
		de: "Legt {count} Dateien ab",
		en: "Filing {count} files"
	},
	filmSetup: {
		de: "Richtet den Arbeitsordner für den Film ein",
		en: "Setting up the folder for the film"
	},
	filmClient: {
		de: "{client} arbeitet am Film – das dauert meist 10–40 Minuten.",
		en: "{client} is working on the film – this usually takes 10–40 minutes."
	},
	filmTask: {
		de: "Am Film: {task}",
		en: "On the film: {task}"
	},
	filmLooks: {
		de: "Sieht sich Bilder des Films an",
		en: "Looking at frames of the film"
	},
	filmFix: {
		de: "Der Film ließ sich nicht rendern – Claude Code bessert nach",
		en: "The film did not render – Claude Code is fixing it"
	},
	filmResume: {
		de: "Macht dort weiter, wo der Film stehen geblieben ist",
		en: "Picking the film up where it stopped"
	},
	wizardUnavailable: {
		de: "Dieser Wizard ist gerade nicht verfügbar.",
		en: "This wizard is not available right now."
	},
	wizardLimit: {
		de: "Für heute ist das Limit dieses Wizards erreicht. Bitte morgen wieder versuchen.",
		en: "This wizard has reached its limit for today. Try again tomorrow."
	},
	confirmHuman: {
		de: "Bitte bestätige kurz, dass du ein Mensch bist.",
		en: "Please confirm that you are a person."
	},
	tooManyRuns: {
		de: "Du hast gerade viele Durchläufe gestartet. Bitte versuche es in einer Stunde wieder.",
		en: "You started many runs just now. Try again in an hour."
	},
	runOver: {
		de: "Der Durchlauf ist beendet.",
		en: "The run is over."
	},
	runBusy: {
		de: "Der Wizard arbeitet gerade.",
		en: "The wizard is working right now."
	},
	pageOutdated: {
		de: "Diese Seite ist nicht mehr aktuell.",
		en: "This page is out of date."
	},
	noStepBefore: {
		de: "Kein vorheriger Schritt.",
		en: "There is no step before this one."
	},
	checkFields: {
		de: "Bitte die markierten Felder prüfen.",
		en: "Please check the marked fields."
	},
	talkOff: {
		de: "Live-Gespräche sind für diesen Wizard nicht eingeschaltet.",
		en: "Live conversations are not switched on for this wizard."
	},
	talkKeyRefused: {
		de: "Das Gespräch ließ sich nicht starten: Der OpenAI API Key wurde abgelehnt.",
		en: "The conversation could not be started: the OpenAI API key was refused."
	},
	talkFailed: {
		de: "Das Gespräch ließ sich nicht starten ({status}).",
		en: "The conversation could not be started ({status})."
	},
	talkNoSecret: {
		de: "Das Gespräch ließ sich nicht starten: Es kam kein Zugang zurück.",
		en: "The conversation could not be started: no secret came back."
	},
	tryLater: {
		de: "Bitte später noch einmal.",
		en: "Try again later."
	},
	recordingTooLarge: {
		de: "Bitte eine Aufnahme bis 10 MB.",
		en: "A recording of up to 10 MB, please."
	},
	fileTooLarge: {
		de: "Bitte eine Datei bis {mb} MB wählen.",
		en: "Choose a file of up to {mb} MB, please."
	},
	askClosed: {
		de: "Diese Frage ist nicht mehr offen.",
		en: "This question is no longer open."
	},
	noBrowser: {
		de: "Der Wizard hat gerade keinen Browser offen.",
		en: "The wizard has no browser open right now."
	},
	notWaiting: {
		de: "Der Wizard wartet gerade nicht auf dich.",
		en: "The wizard is not waiting for you right now."
	},
	pageActFailed: {
		de: "Das hat auf der Seite nicht geklappt.",
		en: "That did not work on the page."
	},
	linkGone: {
		de: "Dieser Link ist abgelaufen oder wurde zurückgezogen.",
		en: "This link has expired or was withdrawn."
	},
	connected: {
		de: "Verbunden. Du kannst dieses Fenster schließen.",
		en: "Connected. You can close this window."
	},
	connectFailed: {
		de: "Verbinden hat nicht geklappt. Bitte noch einmal versuchen.",
		en: "Connecting did not work. Try again."
	},
	connectCancelled: {
		de: "Verbinden wurde abgebrochen.",
		en: "Connecting was cancelled."
	},
	appleOff: {
		de: "Apple Intelligence ist auf diesem Mac ausgeschaltet. Einschalten unter Systemeinstellungen → Apple Intelligence & Siri.",
		en: "Apple Intelligence is switched off on this Mac. Switch it on in System Settings → Apple Intelligence & Siri."
	},
	appleLoading: {
		de: "Apple lädt das Modell für Apple Intelligence noch auf diesen Mac. Gleich noch einmal versuchen.",
		en: "Apple is still loading the model for Apple Intelligence onto this Mac. Try again in a moment."
	},
	appleMissing: {
		de: "Der Helfer für Apple Intelligence (wizards-apple) fehlt in dieser Installation.",
		en: "The helper for Apple Intelligence (wizards-apple) is missing from this installation."
	},
	appleOs: {
		de: "Apple Intelligence braucht macOS 26 oder neuer.",
		en: "Apple Intelligence needs macOS 26 or later."
	},
	appleDevice: {
		de: "Apple Intelligence gibt es nur auf einem Mac mit Apple Silicon.",
		en: "Apple Intelligence is only there on a Mac with Apple silicon."
	},
	appleBusy: {
		de: "Apple Intelligence nimmt gerade keine weiteren Anfragen an. Gleich noch einmal versuchen.",
		en: "Apple Intelligence takes no more requests right now. Try again in a moment."
	},
	appleTooLong: {
		de: "Apple Intelligence: Der Text ist zu lang für das Modell auf diesem Mac (4.096 Tokens für Frage und Antwort). Diese Klasse in den Einstellungen unter „Modelle“ auf ein anderes Modell legen.",
		en: "Apple Intelligence: the text is too long for the model on this Mac (4,096 tokens for question and answer). Put this class on another model under “Models” in the settings."
	},
	appleRefused: {
		de: "Apple Intelligence hat die Anfrage abgelehnt: Apples Inhaltsregeln lassen sie nicht zu.",
		en: "Apple Intelligence turned the request down: Apple's content rules do not allow it."
	},
	appleLanguage: {
		de: "Apple Intelligence versteht die Sprache dieser Anfrage nicht.",
		en: "Apple Intelligence does not understand the language of this request."
	},
	appleFormat: {
		de: "Apple Intelligence kann dieses Antwortformat nicht liefern: {detail}",
		en: "Apple Intelligence cannot answer in this format: {detail}"
	},
	appleFailed: {
		de: "Apple Intelligence: {detail}",
		en: "Apple Intelligence: {detail}"
	},
	appleNoFfmpeg: {
		de: "Apple Intelligence liest {type} nicht; ohne ffmpeg bleibt die Aufnahme so. ffmpeg installieren oder im Browser als MP4 aufnehmen.",
		en: "Apple Intelligence cannot read {type}, and without ffmpeg the recording stays as it is. Install ffmpeg or record as MP4 in the browser."
	},
	appleNotConverted: {
		de: "Apple Intelligence: die Aufnahme ließ sich nicht wandeln: {detail}",
		en: "Apple Intelligence: the recording could not be converted: {detail}"
	}
};
function Ht(e, t) {
	let n = Vt[e.code];
	return n ? n[t].replace(/\{(\w+)\}/g, (t, n) => e.params?.[n] === void 0 ? t : String(e.params[n])) : "";
}
//#endregion
//#region src/i18n.ts
var Ut = {
	"share.copied": "Kopiert",
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
	"run.regeneratePicked": "Neu erstellt wird nur Nr. {n}.",
	"run.regenerateAll": "Alle werden neu erstellt. Tippe oben auf eine Nummer, um nur einzelne zu erneuern.",
	"check.progress": "{done} von {total} geprüft",
	"check.onlyOpen": "Nur offene",
	"check.noFile": "Zu dieser Zeile gibt es keine Datei.",
	"check.noPreview": "Für diese Datei gibt es keine Vorschau – öffne sie mit dem Link oben.",
	"check.reopen": "Wieder offen",
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
	"run.notFound": "Diesen Wizard gibt es nicht (mehr).",
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
	"connect.openLink": "Hier klicken, um die Anmeldung in einem neuen Tab zu öffnen",
	"list.empty": "Noch keine Einträge.",
	"list.delete": "Zeile löschen",
	"ask.typeInto": "Text in die Seite tippen …",
	"ask.hide": "verdeckt",
	"ask.up": "Nach oben",
	"ask.down": "Nach unten",
	"ask.pictureHint": "Das ist die Seite, die der Wizard geöffnet hat, live. Du kannst auch direkt hineinklicken und tippen.",
	"ask.remember": "Anmeldung für nächstes Mal merken",
	"ask.private": "Was du eingibst, geht direkt in die Seite. Die KI bekommt es nicht zu sehen. Gemerkte Anmeldungen werden verschlüsselt gespeichert.",
	"ask.skip": "Überspringen",
	"ask.done": "Ich bin angemeldet",
	"ask.signIn": "Anmelden",
	"ask.wants": "Der Wizard möchte in {service} Folgendes ausführen:",
	"ask.allowRest": "Für den Rest dieses Durchlaufs erlauben",
	"ask.allow": "Erlauben",
	"ask.deny": "Nicht erlauben",
	"store.open": "Was dieser Wizard sich merkt",
	"store.title": "Gespeichert für dich",
	"store.explain": "Dieser Wizard merkt sich Listen, Dateien und verbundene Konten für deinen nächsten Durchlauf. Nur du siehst sie.",
	"store.empty": "Noch nichts gespeichert.",
	"store.rows": "{n} Einträge",
	"store.signIns": "Gemerkte Anmeldungen im Browser",
	"store.files": "{n} Dateien · {size}",
	"store.delete": "Alles löschen",
	"store.confirmDelete": "Wirklich alles löschen",
	"common.close": "Schließen",
	"run.uploadTouch": "Datei wählen",
	"run.maxFiles": "Hier gehen höchstens {n} – die übrigen habe ich weggelassen.",
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
	"scan.hint": "Halte den QR- oder Strichcode in den Rahmen.",
	"scan.hintQr": "Halte den QR-Code in den Rahmen. Strichcodes liest dieses Gerät hier nicht.",
	"scan.miss": "Auf dem Foto war kein Code zu erkennen. Versuch es näher und schärfer.",
	"scan.fromPhoto": "Foto mit dem Code wählen",
	"scan.typeInstead": "Lieber eintippen",
	"location.use": "Meinen Standort übernehmen",
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
	"common.offline": "Keine Verbindung. Prüfe dein Netz und versuch es noch einmal.",
	"common.retry": "Erneut versuchen",
	"common.cancel": "Abbrechen",
	"run.start": "Los geht's",
	"run.unavailable": "Dieser Wizard ist gerade nicht verfügbar.",
	"run.resume": "Letzten Durchlauf fortsetzen"
}, Wt = {
	"share.copied": "Copied",
	"run.closed": "Not available here right now, it needs: {list}",
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
	"run.regeneratePicked": "Only no. {n} will be made again.",
	"run.regenerateAll": "Applies to all. Tap a number to change single ones only.",
	"check.progress": "{done} of {total} checked",
	"check.onlyOpen": "Open only",
	"check.noFile": "There is no file for this row.",
	"check.noPreview": "This file has no preview – open it with the link above.",
	"check.reopen": "Open again",
	"run.feedbackPlaceholder": "Something not right? Write what should be different …",
	"run.feedbackTarget": "What should change?",
	"run.feedbackPick": "Pick above what should change.",
	"ai.generated": "AI generated",
	"ai.modified": "AI modified",
	"ai.publish": "Made with AI: whoever publishes this has to label it as AI-generated (EU AI Act, Art. 50). The file already carries the marking in its metadata.",
	"run.regenerateGo": "Recreate",
	"run.retry": "Try again",
	"run.again": "Start over",
	"run.copy": "Copy text",
	"run.failed": "Something went wrong.",
	"run.notFound": "This wizard does not exist (anymore).",
	"run.working": "One moment …",
	"run.elapsed": "{s} s",
	"run.cancelled": "Cancelled.",
	"run.addRow": "Add row",
	"run.upload": "Choose a file or drop it here",
	"run.uploading": "Uploading …",
	"run.net": "Net",
	"run.vat": "VAT {r} %",
	"run.total": "Total",
	"run.uploadMore": "Another file",
	"run.camera": "Camera",
	"camera.title": "Take a picture",
	"camera.hint": "Hold it flat and well lit.",
	"camera.taken": "{n} taken",
	"camera.shoot": "Capture",
	"camera.done": "Done",
	"camera.denied": "The camera is not allowed for this page. Allow it in your browser's site settings (the lock icon in the address bar) — or take the photo with your camera app.",
	"connect.go": "Connect",
	"connect.connected": "Connected through {name}",
	"connect.disconnect": "Disconnect",
	"connect.none": "No provider is set up for connecting on this server yet.",
	"connect.openLink": "Click here to open the sign-in in a new tab",
	"list.empty": "No entries yet.",
	"list.delete": "Delete row",
	"ask.typeInto": "Type into the page …",
	"ask.hide": "hidden",
	"ask.up": "Scroll up",
	"ask.down": "Scroll down",
	"ask.pictureHint": "This is the page the wizard has open, live. You can also click and type right in it.",
	"ask.remember": "Remember this sign-in for next time",
	"ask.private": "What you enter goes straight into the page. The AI never sees it. Remembered sign-ins are stored encrypted.",
	"ask.skip": "Skip",
	"ask.done": "I am signed in",
	"ask.signIn": "Sign in",
	"ask.wants": "The wizard wants to run this in {service}:",
	"ask.allowRest": "Allow for the rest of this run",
	"ask.allow": "Allow",
	"ask.deny": "Don't allow",
	"store.open": "What this wizard remembers",
	"store.title": "Kept for you",
	"store.explain": "This wizard keeps lists, files and connected accounts for your next run. Only you see them.",
	"store.empty": "Nothing kept yet.",
	"store.rows": "{n} entries",
	"store.signIns": "Remembered sign-ins in the browser",
	"store.files": "{n} files · {size}",
	"store.delete": "Delete everything",
	"store.confirmDelete": "Really delete everything",
	"common.close": "Close",
	"run.uploadTouch": "Choose a file",
	"run.maxFiles": "At most {n} fit here – I left out the rest.",
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
	"camera.recording": "Recording — tap to stop.",
	"camera.clipHint": "A short clip, {s} seconds at most.",
	"camera.hintMany": "Capture page after page, then “Done”.",
	"scan.button": "Scan",
	"scan.title": "Scan a code",
	"scan.asking": "Your browser is about to ask for the camera — it only reads the code.",
	"scan.hint": "Hold the QR code or barcode inside the frame.",
	"scan.hintQr": "Hold the QR code inside the frame. This device does not read barcodes here.",
	"scan.miss": "No code was found in the photo. Try closer and sharper.",
	"scan.fromPhoto": "Choose a photo of the code",
	"scan.typeInstead": "Type it instead",
	"location.use": "Use my location",
	"location.locating": "Finding your location …",
	"location.refining": "getting more exact …",
	"location.accuracy": "exact to about {m} m",
	"location.map": "Map",
	"location.remove": "Remove location",
	"location.why": "Your browser asks for your location. It is only used for this wizard. You can also just type the address.",
	"location.denied": "Location is not allowed for this page. Allow it in your browser's site settings (the lock icon in the address bar) — or type the address below.",
	"location.manual": "Type an address or place",
	"location.label": "Address or description of the place",
	"voice.start": "Record a voice note",
	"voice.stop": "Stop",
	"voice.recording": "Recording …",
	"voice.left": "{s} s left",
	"voice.again": "Record again",
	"voice.remove": "Delete",
	"voice.pick": "Choose an audio file",
	"voice.why": "Your browser asks for the microphone. The recording is turned into text afterwards.",
	"voice.denied": "The microphone is not allowed for this page. Allow it in your browser's site settings — or record the note with your voice memo app and choose the file.",
	"voice.noRecorder": "This browser cannot record here. Record the note with your voice memo app and choose the file.",
	"sign.open": "Sign here",
	"sign.hint": "Sign with your finger",
	"sign.pad": "Signature pad",
	"sign.clear": "Clear",
	"sign.accept": "Use it",
	"sign.again": "Sign again",
	"sign.remove": "Remove signature",
	"notify.ask": "Tell me when it is done",
	"notify.on": "You will be told",
	"notify.why": "With a sound, a buzz or a notification. Your browser asks once for permission.",
	"notify.onHint": "You can switch apps — a notification brings you back.",
	"notify.quiet": "With a sound and a buzz while this page is open.",
	"notify.blocked": "Notifications are blocked for this page — you get a sound and a buzz while it is open. You can allow them in your browser's site settings.",
	"notify.done": "Your result is ready.",
	"notify.next": "It goes on — have a look.",
	"notify.needsYou": "The wizard needs you for a moment.",
	"common.offline": "No connection. Check your network and try again.",
	"common.retry": "Try again",
	"common.cancel": "Cancel",
	"run.start": "Let's go",
	"run.unavailable": "This wizard is not available right now.",
	"run.resume": "Continue your last run"
}, Gt = {
	de: Ut,
	en: Wt
}, L = "de", Kt = Ut, qt = /* @__PURE__ */ new Set();
function Jt(e) {
	if (e !== L) {
		L = e, Kt = e === "de" ? Ut : Wt;
		for (let e of qt) e();
	}
}
function Yt() {
	return v((e) => (qt.add(e), () => qt.delete(e)), () => L);
}
function Xt(e) {
	return e.note && Ht(e.note, L) || e.message;
}
function R(e, t) {
	let n = Kt[e] ?? Ut[e] ?? e;
	for (let [e, r] of Object.entries(t ?? {})) n = n.replace(`{${e}}`, String(r));
	return n;
}
//#endregion
//#region src/api.ts
var Zt = class extends Error {
	status;
	body;
	constructor(e, t, n) {
		super(e), this.status = t, this.body = n;
	}
};
function Qt(e) {
	return e instanceof Zt && e.status === 0;
}
function $t(e) {
	try {
		return JSON.parse(e);
	} catch {
		return { error: e };
	}
}
function en(e, t = {}, n) {
	async function r(r, i, a) {
		let o = await fetch(e(i), {
			method: r,
			credentials: "include",
			headers: {
				...t,
				...a !== void 0 && !(a instanceof FormData) ? { "content-type": "application/json" } : {}
			},
			body: a === void 0 ? void 0 : a instanceof FormData ? a : JSON.stringify(a)
		}).catch(() => {
			throw new Zt(R("common.offline"), 0, null);
		}), s = await o.text(), c = s ? $t(s) : null;
		if (!o.ok) throw o.status >= 500 && n?.(`${r} ${i} answered ${o.status}: ${c?.error ?? ""}`), new Zt(c?.error ?? c?.message ?? o.statusText, o.status, c);
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
var tn = {
	can: () => !1,
	call: (e) => Promise.reject(/* @__PURE__ */ Error(`the app cannot ${e}`)),
	tell: () => void 0,
	download: () => !1
}, nn = null;
function rn(e) {
	nn = e, z = en(e.withBase, e.headers, e.onServerError), Jt(e.lang);
}
function an() {
	if (!nn) throw Error("configureRunner() first");
	return nn;
}
var z = en((e) => e), on = (e) => an().withBase(e), sn = (e) => an().asset(e), B = (e) => an().runBase(e), cn = (e) => (nn?.app ?? tn).can(e), ln = (e, t) => (nn?.app ?? tn).call(e, t), un = (e, t) => (nn?.app ?? tn).tell(e, t), dn = (e, t, n) => (nn?.app ?? tn).download(e, t, n), fn = () => nn?.standalone === !0;
//#endregion
//#region src/ui.tsx
function V(...e) {
	return e.filter(Boolean).join(" ");
}
var pn = {
	primary: "bg-primary text-primary-foreground hover:brightness-[1.06] active:brightness-95 shadow-[0_1px_0_oklch(0%_0_0/0.08)]",
	secondary: "bg-card text-ink border border-border hover:bg-paper-2",
	ghost: "text-ink-2 hover:text-ink hover:bg-accent",
	quiet: "bg-paper-2 text-ink hover:bg-paper-3",
	danger: "text-rose hover:bg-rose-tint"
}, H = d(function({ variant: e = "primary", size: t = "md", busy: n, className: r, children: i, disabled: a, ...o }, s) {
	return /* @__PURE__ */ x("button", {
		ref: s,
		type: "button",
		disabled: a || n,
		className: V("inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background,filter,color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50", t === "sm" && "h-8 px-3 text-[0.8125rem] coarse:h-11 coarse:px-4", t === "md" && "h-10 px-4 text-sm coarse:h-11", t === "lg" && "h-12 px-6 text-[0.9375rem]", pn[e], r),
		...o,
		children: [n ? /* @__PURE__ */ b(wn, { className: "size-4" }) : null, i]
	});
});
function mn({ label: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ b("button", {
		type: "button",
		"aria-label": e,
		title: e,
		className: V("inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-3 transition hover:bg-accent hover:text-ink disabled:opacity-40 coarse:size-11", t),
		...r,
		children: n
	});
}
var hn = "rounded-lg border border-input bg-card px-3.5 text-[0.9375rem] text-ink shadow-[inset_0_1px_0_oklch(0%_0_0/0.02)] outline-none transition placeholder:text-ink-4 focus:border-focus focus:ring-4 focus:ring-focus-glow disabled:opacity-60";
function gn(e) {
	return /(^|\s)w-/.test(e ?? "") ? null : "w-full";
}
var _n = d(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ b("input", {
		ref: n,
		className: V(hn, gn(e), "h-11", e),
		...t
	});
});
function vn(e) {
	return /* @__PURE__ */ b("input", {
		type: "color",
		className: "swatch size-11 shrink-0 cursor-pointer rounded-lg border border-input bg-card p-1",
		...e
	});
}
var yn = d(function({ className: e, minRows: t = 3, maxRows: n = 14, onChange: r, ...i }, a) {
	let o = g(null), s = () => {
		let e = o.current;
		if (!e) return;
		let r = Number.parseFloat(getComputedStyle(e).lineHeight) || 22;
		e.style.height = "auto";
		let i = r * n + 20;
		e.style.height = `${Math.min(Math.max(e.scrollHeight, r * t + 20), i)}px`, e.style.overflowY = e.scrollHeight > i ? "auto" : "hidden";
	};
	return m(s), /* @__PURE__ */ b("textarea", {
		ref: (e) => {
			o.current = e, typeof a == "function" ? a(e) : a && (a.current = e);
		},
		className: V(hn, gn(e), "resize-none py-2.5 leading-[1.5]", e),
		onChange: (e) => {
			s(), r?.(e);
		},
		...i
	});
});
function bn({ value: e, onChange: t, options: n, className: r, placeholder: i }) {
	return /* @__PURE__ */ x("div", {
		className: V("relative", r),
		children: [/* @__PURE__ */ x("select", {
			value: e,
			onChange: (e) => t(e.target.value),
			className: V(hn, "h-11 w-full appearance-none pr-9"),
			children: [i === void 0 ? null : /* @__PURE__ */ b("option", {
				value: "",
				children: i
			}), n.map((e) => /* @__PURE__ */ b("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value))]
		}), /* @__PURE__ */ b("svg", {
			className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-4 text-ink-3",
			viewBox: "0 0 16 16",
			fill: "none",
			children: /* @__PURE__ */ b("path", {
				d: "M4 6l4 4 4-4",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})]
	});
}
function xn({ value: e, onChange: t, options: n, multi: r, disabled: i }) {
	let a = new Set(Array.isArray(e) ? e : e ? [e] : []);
	return /* @__PURE__ */ b("div", {
		className: "flex flex-wrap gap-2",
		children: n.map((e) => {
			let o = a.has(e);
			return /* @__PURE__ */ b("button", {
				type: "button",
				"aria-pressed": o,
				disabled: i?.includes(e),
				onClick: () => {
					if (r) {
						let r = new Set(a);
						o ? r.delete(e) : r.add(e), t(n.filter((e) => r.has(e)));
					} else t(e);
				},
				className: V("h-10 rounded-full border px-4 text-sm transition disabled:pointer-events-none disabled:opacity-60 disabled:line-through coarse:h-11", o ? "border-ember bg-ember-tint text-ink" : "border-input bg-card text-ink-2 hover:border-ink-4 hover:text-ink"),
				children: e
			}, e);
		})
	});
}
function Sn({ checked: e, onChange: t, label: n, disabled: r }) {
	return /* @__PURE__ */ b("button", {
		type: "button",
		role: "switch",
		"aria-checked": e,
		"aria-label": n,
		disabled: r,
		onClick: () => t(!e),
		className: V("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] disabled:pointer-events-none disabled:opacity-60", e ? "bg-primary" : "bg-paper-3"),
		children: /* @__PURE__ */ b("span", { className: V("inline-block size-5 rounded-full bg-white shadow-sm transition-transform", e ? "translate-x-[22px]" : "translate-x-[2px]") })
	});
}
function Cn({ children: e, hint: t, required: n }) {
	return /* @__PURE__ */ x("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ x("div", {
			className: "font-medium text-[0.875rem] text-ink",
			children: [e, n ? /* @__PURE__ */ b("span", {
				className: "ml-1 text-ember",
				children: "*"
			}) : null]
		}), t ? /* @__PURE__ */ b("div", {
			className: "mt-0.5 text-[0.8125rem] text-ink-3",
			children: t
		}) : null]
	});
}
function wn({ className: e }) {
	return /* @__PURE__ */ x("svg", {
		className: V("size-5 animate-spin", e),
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ b("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			stroke: "currentColor",
			strokeOpacity: "0.2",
			strokeWidth: "3"
		}), /* @__PURE__ */ b("path", {
			d: "M21 12a9 9 0 0 0-9-9",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round"
		})]
	});
}
function Tn({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ b("div", {
		className: V("rounded-xl bg-card shadow-soft ring-1 ring-border-soft", e),
		...n,
		children: t
	});
}
function En({ open: e, onClose: t, title: n, children: r, wide: i, bare: a, height: o = "auto" }) {
	let s = g(null);
	return p(() => {
		let t = s.current;
		t && (e && !t.open ? (t.showModal(), t.querySelector("[data-autofocus]")?.focus()) : !e && t.open && t.close());
	}, [e]), p(() => {
		let t = s.current;
		if (!t || !e || a || o === "tall") return;
		let n = 0, r = () => {
			n = Math.max(n, t.getBoundingClientRect().height), t.style.minHeight = `${Math.min(n, window.innerHeight - 32)}px`;
		}, i = new ResizeObserver(r);
		return i.observe(t), window.addEventListener("resize", r), () => {
			i.disconnect(), window.removeEventListener("resize", r), t.style.minHeight = "";
		};
	}, [
		e,
		a,
		o
	]), /* @__PURE__ */ b("dialog", {
		ref: s,
		onClose: t,
		onClick: (e) => {
			e.target === s.current && t();
		},
		className: V("m-auto p-0 text-ink backdrop:bg-[oklch(20%_0.01_60/0.28)] backdrop:backdrop-blur-[2px]", "max-sm:m-0 max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:max-w-none", a ? "w-[calc(100%-48px)] overflow-visible bg-transparent" : "max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] overflow-y-auto overscroll-contain rounded-2xl bg-card shadow-overlay max-sm:rounded-none max-sm:pt-[env(safe-area-inset-top)] max-sm:pb-[env(safe-area-inset-bottom)]", i === "page" ? "sm:max-w-4xl" : i ? "sm:max-w-2xl" : "sm:max-w-md", !a && o === "tall" && "sm:h-[min(calc(100dvh-32px),56rem)]"),
		children: e && a ? r : e ? /* @__PURE__ */ x("div", {
			className: "p-5 sm:p-7",
			children: [n ? /* @__PURE__ */ x("div", {
				className: "mb-5 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ b("h2", {
					className: "min-w-0 font-display font-semibold text-xl",
					children: n
				}), /* @__PURE__ */ b(mn, {
					label: R("common.close"),
					onClick: t,
					className: "-mt-1.5 -mr-2",
					children: /* @__PURE__ */ b("svg", {
						viewBox: "0 0 16 16",
						fill: "none",
						className: "size-4",
						"aria-hidden": "true",
						children: /* @__PURE__ */ b("path", {
							d: "M4 4l8 8M12 4l-8 8",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				})]
			}) : null, r]
		}) : null
	});
}
function Dn({ text: e }) {
	return e.split(/(https?:\/\/[^\s)]+)/).map((e, t) => t % 2 ? /* @__PURE__ */ b("a", {
		href: e,
		target: "_blank",
		rel: "noreferrer",
		className: "font-medium text-ink underline underline-offset-2",
		children: new URL(e).host
	}, e) : e);
}
//#endregion
//#region src/browser-live.tsx
var On = 250;
function kn({ runId: e, driving: t, caption: n, action: r, hint: i, className: a, onBroken: o }) {
	let s = g(null), c = g(null), [l, u] = _(""), [d, f] = _(!1), [m, h] = _(null), v = async (t) => {
		h(null);
		try {
			await z.post(`${B(e)}/browser/act`, t);
		} catch (e) {
			h(e.message);
		}
	};
	return p(() => {
		t && c.current?.scrollIntoView({
			block: "nearest",
			behavior: "smooth"
		});
	}, [t]), p(() => {
		let n = s.current;
		if (!(n && t)) return;
		let r = 0, i = null, a = (t) => {
			t.preventDefault(), r += t.deltaY, i ??= setTimeout(() => {
				i = null;
				let t = Math.max(-2e3, Math.min(2e3, Math.round(r)));
				r = 0, t && z.post(`${B(e)}/browser/act`, {
					type: "scroll",
					dy: t
				}).catch(() => void 0);
			}, On);
		};
		return n.addEventListener("wheel", a, { passive: !1 }), () => {
			n.removeEventListener("wheel", a), i && clearTimeout(i);
		};
	}, [t, e]), /* @__PURE__ */ x("div", {
		className: a,
		children: [/* @__PURE__ */ x("div", {
			className: V("relative aspect-[1280/900] w-full overflow-hidden rounded-xl bg-paper-2 ring-1", t ? "ring-2 ring-ember" : "ring-border-soft"),
			children: [
				/* @__PURE__ */ b("img", {
					ref: s,
					src: on(`${B(e)}/browser/live`),
					alt: "",
					draggable: !1,
					onClick: (e) => {
						if (!t) return;
						let n = e.currentTarget.getBoundingClientRect();
						v({
							type: "click",
							fx: Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)),
							fy: Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))
						});
					},
					onError: o,
					className: V("size-full object-cover object-top", t && "cursor-pointer")
				}),
				r ? /* @__PURE__ */ b("div", {
					className: "absolute top-2 right-2",
					children: r
				}) : null,
				n && !t ? /* @__PURE__ */ x("div", {
					className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/75 to-transparent px-3 pt-8 pb-2 text-[0.8125rem] text-white",
					children: [/* @__PURE__ */ b(rt, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ b("span", {
						className: "truncate",
						children: n
					})]
				}) : null
			]
		}), t ? /* @__PURE__ */ x("div", {
			ref: c,
			className: "mt-1.5",
			children: [
				i ? /* @__PURE__ */ b("p", {
					className: "mb-1.5 text-[0.8125rem] text-ink-3",
					children: i
				}) : null,
				/* @__PURE__ */ x("div", {
					className: "flex flex-wrap items-center gap-1.5 rounded-xl bg-card p-2 ring-1 ring-border-soft",
					children: [
						/* @__PURE__ */ b(_n, {
							type: d ? "password" : "text",
							autoComplete: "off",
							value: l,
							placeholder: R("ask.typeInto"),
							onChange: (e) => u(e.target.value),
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), v({
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
						/* @__PURE__ */ b("button", {
							type: "button",
							onClick: () => f((e) => !e),
							className: V("h-9 shrink-0 rounded-md px-2.5 text-[0.75rem] coarse:h-11 coarse:px-3.5", d ? "bg-ember-veil text-ink" : "text-ink-3 hover:bg-paper-2"),
							children: R("ask.hide")
						}),
						/* @__PURE__ */ b(An, {
							label: "Enter",
							onClick: () => void v({
								type: "key",
								key: "Enter"
							}),
							children: /* @__PURE__ */ b(ye, { className: "size-4" })
						}),
						/* @__PURE__ */ b(An, {
							label: R("ask.up"),
							onClick: () => void v({
								type: "scroll",
								dy: -500
							}),
							children: /* @__PURE__ */ b(le, { className: "size-4" })
						}),
						/* @__PURE__ */ b(An, {
							label: R("ask.down"),
							onClick: () => void v({
								type: "scroll",
								dy: 500
							}),
							children: /* @__PURE__ */ b(ie, { className: "size-4" })
						})
					]
				}),
				m ? /* @__PURE__ */ b("p", {
					className: "mt-1.5 text-[0.8125rem] text-rose",
					children: m
				}) : null
			]
		}) : null]
	});
}
function An({ label: e, onClick: t, children: n }) {
	return /* @__PURE__ */ b("button", {
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
function jn({ runId: e, ask: t }) {
	return t.kind === "confirm" ? /* @__PURE__ */ b(Mn, {
		runId: e,
		ask: t
	}) : /* @__PURE__ */ b(Nn, {
		runId: e,
		ask: t
	});
}
function Mn({ runId: e, ask: t }) {
	let [n, r] = _(!1), [i, a] = _(!1), [o, s] = _(null), c = async (n) => {
		a(!0), s(null);
		try {
			await z.post(`${B(e)}/ask/${t.id}`, n);
		} catch (e) {
			s(e.message), a(!1);
		}
	}, l = t.action.destructive ? Pt : ct;
	return /* @__PURE__ */ x("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ x("div", {
				className: "mb-5 flex items-start gap-3",
				children: [/* @__PURE__ */ b("div", {
					className: V("flex size-10 shrink-0 items-center justify-center rounded-full", t.action.destructive ? "bg-rose-tint text-rose" : "bg-ember-tint text-ember-strong"),
					children: /* @__PURE__ */ b(l, { className: "size-5" })
				}), /* @__PURE__ */ x("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ b("p", {
						className: "text-[0.8125rem] text-ink-3",
						children: R("ask.wants", { service: t.service })
					}), /* @__PURE__ */ b("h2", {
						className: "font-display font-semibold text-[1.25rem] leading-snug tracking-tight",
						children: t.reason
					})]
				})]
			}),
			/* @__PURE__ */ b("pre", {
				className: "max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-paper-2 p-4 text-[0.8125rem] leading-relaxed ring-1 ring-border-soft",
				children: t.input
			}),
			/* @__PURE__ */ x("div", {
				className: "mt-5 flex items-center gap-4",
				children: [/* @__PURE__ */ b(Sn, {
					checked: n,
					onChange: r,
					label: R("ask.allowRest")
				}), /* @__PURE__ */ b("span", {
					className: "flex-1 text-[0.8125rem] text-ink-2",
					children: R("ask.allowRest")
				})]
			}),
			o ? /* @__PURE__ */ b("div", {
				className: "mt-3 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
				children: o
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "action-bar mt-6 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ b(H, {
					variant: "ghost",
					disabled: i,
					onClick: () => void c({ type: "skip" }),
					children: R("ask.deny")
				}), /* @__PURE__ */ b(H, {
					busy: i,
					onClick: () => void c({
						type: "done",
						remember: n
					}),
					children: R("ask.allow")
				})]
			})
		]
	});
}
function Nn({ runId: e, ask: t }) {
	let [n, r] = _({}), [i, a] = _(!1), [o, s] = _(!1), [c, l] = _(null), u = async (n) => {
		s(!0), l(null);
		try {
			await z.post(`${B(e)}/ask/${t.id}`, n);
		} catch (e) {
			l(e.message), s(!1);
		}
	}, d = t.fields.some((e) => n[e.id]);
	return /* @__PURE__ */ x("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ x("div", {
				className: "mb-5 flex items-start gap-3",
				children: [/* @__PURE__ */ b("div", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember-strong",
					children: /* @__PURE__ */ b(Ye, { className: "size-5" })
				}), /* @__PURE__ */ x("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ b("h2", {
						className: "font-display font-semibold text-[1.25rem] leading-snug tracking-tight",
						children: t.reason
					}), /* @__PURE__ */ x("p", {
						className: "mt-0.5 truncate text-[0.8125rem] text-ink-3",
						children: [t.site.host, t.site.title ? ` · ${t.site.title}` : ""]
					})]
				})]
			}),
			/* @__PURE__ */ b(kn, {
				runId: e,
				driving: !0
			}),
			/* @__PURE__ */ b("p", {
				className: "mt-2 text-[0.75rem] text-ink-4",
				children: R("ask.pictureHint")
			}),
			t.fields.length ? /* @__PURE__ */ x("form", {
				className: "mt-5 flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault(), u({
						type: "fill",
						values: n,
						remember: i
					});
				},
				children: [t.fields.map((e, i) => /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b(Cn, { children: e.label }), /* @__PURE__ */ b(_n, {
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
				})] }, e.id)), /* @__PURE__ */ b("button", {
					type: "submit",
					hidden: !0
				})]
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "mt-5 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ b(Sn, {
					checked: i,
					onChange: a,
					label: R("ask.remember")
				}), /* @__PURE__ */ b("span", {
					className: "flex-1 text-[0.8125rem] text-ink-2",
					children: R("ask.remember")
				})]
			}),
			/* @__PURE__ */ x("p", {
				className: "mt-3 flex items-start gap-2 text-[0.8125rem] text-ink-3",
				children: [
					/* @__PURE__ */ b(wt, { className: "mt-0.5 size-4 shrink-0 text-moss" }),
					" ",
					R("ask.private")
				]
			}),
			c ? /* @__PURE__ */ b("div", {
				className: "mt-3 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
				children: c
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "action-bar mt-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ b(H, {
					variant: "ghost",
					disabled: o,
					onClick: () => void u({ type: "skip" }),
					children: R("ask.skip")
				}), /* @__PURE__ */ x("div", {
					className: "flex flex-wrap gap-2",
					children: [t.fields.length ? /* @__PURE__ */ b(H, {
						variant: "secondary",
						disabled: o,
						onClick: () => void u({
							type: "done",
							remember: i
						}),
						children: R("ask.done")
					}) : null, t.fields.length ? /* @__PURE__ */ b(H, {
						busy: o,
						disabled: !d,
						onClick: () => void u({
							type: "fill",
							values: n,
							remember: i
						}),
						children: R("ask.signIn")
					}) : /* @__PURE__ */ b(H, {
						busy: o,
						onClick: () => void u({
							type: "done",
							remember: i
						}),
						children: R("ask.done")
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/device.ts
var Pn = typeof window < "u" && window.matchMedia?.("(pointer: coarse)").matches === !0, Fn = typeof navigator < "u" && !!navigator.mediaDevices?.getUserMedia;
function In() {
	p(() => {
		let e = window.visualViewport;
		if (!e) return;
		let t = document.documentElement, n = () => {
			let n = e.scale > 1.01 ? 0 : window.innerHeight - e.height - e.offsetTop, r = n > 80;
			t.style.setProperty("--kb", r ? `${Math.round(n)}px` : "0px"), t.classList.toggle("keyboard-open", r);
		};
		return n(), e.addEventListener("resize", n), e.addEventListener("scroll", n), () => {
			e.removeEventListener("resize", n), e.removeEventListener("scroll", n), t.style.removeProperty("--kb"), t.classList.remove("keyboard-open");
		};
	}, []);
}
function Ln(e) {
	let [t, n] = _(!1);
	return p(() => {
		if (e && cn("keepAwake")) return un("keepAwake", !0), n(!0), () => {
			un("keepAwake", !1), n(!1);
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
var Rn = "wz.notify", zn = /* @__PURE__ */ new Set(), Bn = null;
function Vn() {
	try {
		return localStorage.getItem(Rn) === "1";
	} catch {
		return !1;
	}
}
function Hn(e) {
	try {
		e ? localStorage.setItem(Rn, "1") : localStorage.removeItem(Rn);
	} catch {}
	for (let e of zn) e();
}
var Un = typeof window < "u" && "Notification" in window, Wn = null;
function Gn() {
	return Vn() ? cn("notify") ? Wn === !1 ? "quiet" : "on" : Un && Notification.permission === "granted" ? "on" : "quiet" : "off";
}
function Kn() {
	return v((e) => (zn.add(e), () => zn.delete(e)), Gn, () => "off");
}
function qn() {
	return cn("notify") ? Wn === !1 : Un && Notification.permission === "denied";
}
async function Jn() {
	if (Hn(!0), cn("notify")) {
		Wn = !cn("notifyPermission") || await ln("notifyPermission").catch(() => !1);
		for (let e of zn) e();
		return Gn();
	}
	try {
		Bn ??= new AudioContext(), Bn.resume();
	} catch {
		Bn = null;
	}
	if (Un && Notification.permission === "default") try {
		await Notification.requestPermission();
	} catch {}
	if (Un && Notification.permission === "granted") {
		let e = an().serviceWorker;
		e && await navigator.serviceWorker?.register(e).catch(() => void 0);
	}
	for (let e of zn) e();
	return Gn();
}
function Yn() {
	Hn(!1);
}
function Xn() {
	let e = Bn;
	if (e?.state !== "running") return;
	let t = e.currentTime;
	for (let [n, r] of [660, 880].entries()) {
		let i = e.createOscillator(), a = e.createGain();
		i.frequency.value = r, a.gain.setValueAtTime(0, t + n * .16), a.gain.linearRampToValueAtTime(.18, t + n * .16 + .02), a.gain.exponentialRampToValueAtTime(.001, t + n * .16 + .32), i.connect(a).connect(e.destination), i.start(t + n * .16), i.stop(t + n * .16 + .34);
	}
}
async function Zn(e) {
	if (!Vn()) return;
	if (cn("notify")) {
		un("notify", e);
		return;
	}
	if (document.visibilityState === "visible") {
		Xn(), navigator.vibrate?.([
			120,
			60,
			120
		]);
		return;
	}
	if (!Un || Notification.permission !== "granted") return;
	let t = {
		body: e.body,
		tag: e.tag,
		icon: sn("icons/icon-192.png"),
		badge: sn("icons/icon-192.png"),
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
function Qn() {
	if (typeof navigator > "u" || !navigator.canShare) return !1;
	try {
		return navigator.canShare({ files: [new File(["x"], "x.pdf", { type: "application/pdf" })] });
	} catch {
		return !1;
	}
}
//#endregion
//#region src/camera.tsx
async function $n(e, t = 2400) {
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
function er() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-");
}
function tr(e) {
	let t = e?.name;
	return t === "NotFoundError" || t === "OverconstrainedError" ? "missing" : t === "NotReadableError" || t === "AbortError" ? "busy" : "denied";
}
function nr(e) {
	return !!e?.getCapabilities?.()?.torch;
}
function rr(e, t, n = !1) {
	let r = g(null), [i, a] = _(null), [o, s] = _(null), [c, l] = _(1), [u, d] = _(!1), [f, m] = _(!1);
	return p(() => {
		if (!e) return;
		let r = null, i = !1;
		s(null), a(null), d(!1), m(!1);
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
			let e = r.getVideoTracks()[0], t = () => !i && d(nr(e));
			t(), setTimeout(t, 600);
			let s = await navigator.mediaDevices.enumerateDevices().catch(() => []);
			i || l(s.filter((e) => e.kind === "videoinput").length);
		})().catch((e) => !i && s(tr(e))), () => {
			i = !0;
			for (let e of r?.getTracks() ?? []) e.stop();
		};
	}, [
		e,
		t,
		n
	]), p(() => {
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
				await t?.applyConstraints({ advanced: [{ torch: e }] }), m(e);
			} catch {
				d(!1);
			}
		},
		mirrored: i?.getVideoTracks()[0]?.getSettings().facingMode === "user"
	};
}
function ir({ open: e, onClose: t, label: n, children: r }) {
	let i = g(null);
	return p(() => {
		let t = i.current;
		t && (e && !t.open ? t.showModal() : !e && t.open && t.close());
	}, [e]), /* @__PURE__ */ b("dialog", {
		ref: i,
		onClose: t,
		"aria-label": n,
		className: "media-sheet",
		children: e ? /* @__PURE__ */ b("div", {
			className: "flex h-full flex-col",
			children: r
		}) : null
	});
}
function ar({ label: e, onClick: t, active: n, children: r }) {
	return /* @__PURE__ */ b("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"aria-pressed": n,
		onClick: t,
		className: V("flex size-11 shrink-0 items-center justify-center rounded-full transition", n ? "bg-white text-black" : "bg-white/12 text-white hover:bg-white/20"),
		children: r
	});
}
function or({ title: e, onClose: t, camera: n, onFlip: r }) {
	return /* @__PURE__ */ b("div", {
		className: "safe-top",
		children: /* @__PURE__ */ x("div", {
			className: "flex items-center gap-2 px-3 py-2",
			children: [
				/* @__PURE__ */ b(ar, {
					label: R("common.close"),
					onClick: t,
					children: /* @__PURE__ */ b(Bt, { className: "size-5" })
				}),
				/* @__PURE__ */ b("div", {
					className: "min-w-0 flex-1 truncate text-center font-medium text-[0.9375rem]",
					children: e
				}),
				n.torchable ? /* @__PURE__ */ b(ar, {
					label: R("camera.torch"),
					active: n.torch,
					onClick: () => void n.setTorch(!n.torch),
					children: n.torch ? /* @__PURE__ */ b(Le, { className: "size-5" }) : /* @__PURE__ */ b(Fe, { className: "size-5" })
				}) : null,
				n.stream && (n.cameras > 1 || Pn) ? /* @__PURE__ */ b(ar, {
					label: R("camera.flip"),
					onClick: r,
					children: /* @__PURE__ */ b(At, { className: "size-5" })
				}) : /* @__PURE__ */ b("span", { className: "size-11" })
			]
		})
	});
}
function sr({ camera: e, asking: t, children: n, actions: r }) {
	return /* @__PURE__ */ x("div", {
		className: "relative min-h-0 flex-1 overflow-hidden",
		children: [/* @__PURE__ */ b("video", {
			ref: e.video,
			autoPlay: !0,
			playsInline: !0,
			muted: !0,
			className: V("absolute inset-0 size-full object-contain", e.mirrored && "-scale-x-100")
		}), e.error ? /* @__PURE__ */ x("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black px-8 text-center",
			children: [/* @__PURE__ */ b("p", {
				className: "max-w-sm text-[0.9375rem] text-white/85 leading-relaxed",
				children: R(`camera.${e.error}`)
			}), r]
		}) : e.stream ? n : /* @__PURE__ */ x("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-white/75",
			children: [/* @__PURE__ */ b(wn, {}), /* @__PURE__ */ b("p", {
				className: "max-w-xs text-[0.875rem] leading-relaxed",
				children: t
			})]
		})]
	});
}
var cr = 30;
function lr() {
	if (typeof MediaRecorder < "u") return [
		"video/mp4;codecs=avc1.42E01E,mp4a.40.2",
		"video/mp4",
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm"
	].find((e) => MediaRecorder.isTypeSupported(e));
}
var ur = !!lr();
function dr({ open: e, multiple: t, video: n, onClose: r, onCapture: i, onNative: a }) {
	let [o, s] = _("environment"), [c, l] = _("photo"), [u, d] = _(0), [f, m] = _(!1), [h, v] = _(null), y = g(null), S = rr(e, o, c === "video");
	p(() => {
		e && (d(0), l("photo"), v(null));
	}, [e]);
	let C = async (e) => {
		m(!0);
		try {
			await i(e), d((e) => e + 1), t || r();
		} finally {
			m(!1);
		}
	}, ee = async () => {
		let e = S.video.current;
		if (!e?.videoWidth) return;
		let t = document.createElement("canvas");
		t.width = e.videoWidth, t.height = e.videoHeight, t.getContext("2d")?.drawImage(e, 0, 0);
		let n = await new Promise((e) => t.toBlob(e, "image/jpeg", .9));
		n && await C(new File([n], `foto-${er()}.jpg`, { type: "image/jpeg" }));
	}, w = () => {
		y.current?.state === "recording" && y.current.stop();
	}, T = () => {
		let e = lr();
		if (!S.stream || !e) return;
		let t = [], n = new MediaRecorder(S.stream, {
			mimeType: e,
			videoBitsPerSecond: 25e5,
			audioBitsPerSecond: 96e3
		});
		n.ondataavailable = (e) => e.data.size && t.push(e.data), n.onstop = () => {
			v(null), y.current = null;
			let n = e.split(";")[0];
			if (t.length) {
				let e = n === "video/mp4" ? "mp4" : "webm";
				C(new File(t, `video-${er()}.${e}`, { type: n }));
			}
		}, y.current = n, n.start(1e3), v(0);
	};
	p(() => {
		if (h === null) return;
		if (h >= cr) {
			y.current?.state === "recording" && y.current.stop();
			return;
		}
		let e = setTimeout(() => v((e) => e === null ? null : e + 1), 1e3);
		return () => clearTimeout(e);
	}, [h]), p(() => {
		!e && y.current && (y.current.onstop = null, y.current.stop(), y.current = null);
	}, [e]);
	let E = (e) => `0:${String(e).padStart(2, "0")}`;
	return /* @__PURE__ */ x(ir, {
		open: e,
		onClose: r,
		label: R("camera.title"),
		children: [
			/* @__PURE__ */ b(or, {
				title: h === null ? u ? R("camera.taken", { n: u }) : R("camera.title") : `${E(h)} / ${E(cr)}`,
				onClose: r,
				camera: S,
				onFlip: () => s((e) => e === "environment" ? "user" : "environment")
			}),
			/* @__PURE__ */ b(sr, {
				camera: S,
				asking: R("camera.asking"),
				actions: /* @__PURE__ */ x("div", {
					className: "flex flex-col gap-2",
					children: [a ? /* @__PURE__ */ x(fr, {
						onClick: () => {
							r(), a();
						},
						children: [
							/* @__PURE__ */ b(he, { className: "size-4" }),
							" ",
							R(Pn ? "camera.native" : "camera.pick")
						]
					}) : null, /* @__PURE__ */ b(fr, {
						quiet: !0,
						onClick: r,
						children: R("common.close")
					})]
				})
			}),
			/* @__PURE__ */ x("div", {
				className: V("safe-bottom px-4 pt-3", S.error && "invisible"),
				children: [n && ur && h === null ? /* @__PURE__ */ b("div", {
					className: "mb-3 flex justify-center gap-1 text-[0.8125rem]",
					children: ["photo", "video"].map((e) => /* @__PURE__ */ b("button", {
						type: "button",
						"aria-pressed": c === e,
						onClick: () => l(e),
						className: V("h-9 rounded-full px-4 font-medium transition", c === e ? "bg-white text-black" : "text-white/70 hover:text-white"),
						children: R(e === "photo" ? "camera.photo" : "camera.video")
					}, e))
				}) : null, /* @__PURE__ */ x("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
					children: [
						/* @__PURE__ */ b("span", {
							className: "text-[0.8125rem] text-white/70 leading-snug",
							children: h === null ? c === "video" ? R("camera.clipHint", { s: cr }) : R(t ? "camera.hintMany" : "camera.hint") : R("camera.recording")
						}),
						/* @__PURE__ */ b("button", {
							type: "button",
							"aria-label": R(c === "photo" ? "camera.shoot" : h === null ? "camera.record" : "camera.stop"),
							disabled: !S.stream || f,
							onClick: () => c === "photo" ? void ee() : h === null ? T() : w(),
							className: "flex size-[72px] items-center justify-center rounded-full border-4 border-white transition active:scale-95 disabled:opacity-40",
							children: f ? /* @__PURE__ */ b(wn, { className: "text-white" }) : c === "photo" ? /* @__PURE__ */ b("span", { className: "size-[54px] rounded-full bg-white" }) : h === null ? /* @__PURE__ */ b("span", {
								className: "flex size-[54px] items-center justify-center rounded-full bg-[#e5484d]",
								children: /* @__PURE__ */ b(Rt, { className: "size-6 text-white" })
							}) : /* @__PURE__ */ b("span", { className: "size-7 rounded-md bg-[#e5484d]" })
						}),
						/* @__PURE__ */ b("div", {
							className: "flex justify-end",
							children: t && u && h === null ? /* @__PURE__ */ x(fr, {
								onClick: r,
								children: [
									/* @__PURE__ */ b(ge, { className: "size-4" }),
									" ",
									R("camera.done")
								]
							}) : null
						})
					]
				})]
			})
		]
	});
}
function fr({ onClick: e, quiet: t, children: n }) {
	return /* @__PURE__ */ b("button", {
		type: "button",
		onClick: e,
		className: V("inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-medium text-[0.875rem] transition", t ? "text-white/75 hover:text-white" : "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region ../shared/src/engenty/data-tables/columns-format.ts
var pr = 36e5, mr = 6e4, hr = 1e3;
function gr(e) {
	return e.fractionDigits === void 0 ? e.style === "integer" ? 0 : 2 : e.fractionDigits;
}
function _r(e, t, n = "en") {
	if (typeof e != "number" || !Number.isFinite(e)) return "";
	let r = gr(t), i = t.grouping !== !1;
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
function vr(e, t, n = "en") {
	if (typeof e != "string" || e.length === 0) return "";
	if (t.kind === "time") return yr(e, t.timePrecision ?? "minutes");
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
function yr(e, t) {
	let [n = "0", r = "00", i = "00"] = e.split(":");
	return t === "hours" ? `${n.padStart(2, "0")}:00` : t === "minutes" ? `${n.padStart(2, "0")}:${r.padStart(2, "0")}` : `${n.padStart(2, "0")}:${r.padStart(2, "0")}:${i.padStart(2, "0")}`;
}
function br(e, t) {
	if (typeof e != "number" || !Number.isFinite(e)) return "";
	let n = Math.max(0, Math.round(e));
	if (t.display === "iso") return xr(n);
	if (t.display === "minutes") return `${Math.round(n / mr)} min`;
	if (t.display === "hours") return `${(n / pr).toFixed(2)} h`;
	if (t.display === "decimal-hours") return (n / pr).toFixed(2);
	let r = Math.floor(n / pr), i = Math.floor(n % pr / mr), a = Math.floor(n % mr / hr);
	return `${r}:${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function xr(e) {
	let t = Math.floor(e / pr), n = Math.floor(e % pr / mr), r = Math.floor(e % mr / hr);
	return `${t >= 24 ? `P${Math.floor(t / 24)}D` : "P"}T${t % 24}H${n}M${r}S`;
}
function Sr(e, t, n = "en") {
	if (t == null) return "";
	switch (e.type) {
		case "number": return _r(t, e.format, n);
		case "date": return vr(t, e.format, n);
		case "duration": return br(t, e.format);
		case "boolean": return t === !0 ? "true" : t === !1 ? "false" : "";
		case "select": return Cr(e, t);
		default: return String(t);
	}
}
function Cr(e, t) {
	let n = Array.isArray(t) ? t : [t], r = e.format.options.reduce((e, t) => (e[t.id] = t.label, e), {});
	return n.filter((e) => typeof e == "string" && e.length > 0).map((e) => r[e] ?? e).join(", ");
}
//#endregion
//#region src/location.tsx
var wr = 25, Tr = 9e3;
function Er(e) {
	return e.code === e.PERMISSION_DENIED ? "denied" : e.code === e.TIMEOUT ? "timeout" : "unavailable";
}
function Dr({ value: e, runId: n, placeholder: r, onChange: i, onBusy: a }) {
	let o = t(e) ? e : null, [s, c] = _(!1), [l, u] = _(null), d = g(null), f = g(!!o?.label), m = g(o);
	m.current = o;
	let h = o?.lat !== void 0 && o.lng !== void 0, v = typeof navigator < "u" && "geolocation" in navigator, y = () => {
		d.current !== null && (navigator.geolocation.clearWatch(d.current), d.current = null), c(!1), a?.(!1);
	};
	p(() => () => {
		d.current !== null && navigator.geolocation.clearWatch(d.current);
	}, []);
	let S = async (e, t) => {
		try {
			let { label: r } = await z.post(`${B(n)}/geocode`, {
				lat: e,
				lng: t,
				language: L
			}), a = m.current;
			r && !f.current && a?.lat === e && a.lng === t && i({
				...a,
				label: r
			});
		} catch {}
	}, C = () => {
		u(null), c(!0), a?.(!0);
		let e = Date.now(), t = Infinity;
		d.current = navigator.geolocation.watchPosition((n) => {
			let { latitude: r, longitude: a, accuracy: o } = n.coords;
			if (o < t) {
				t = o;
				let e = Math.round(r * 1e6) / 1e6, n = Math.round(a * 1e6) / 1e6, s = f.current ? m.current?.label : void 0, c = {
					lat: e,
					lng: n,
					accuracy: Math.round(o),
					...s ? { label: s } : {}
				};
				m.current = c, i(c);
			}
			if (t <= wr || Date.now() - e > Tr) {
				y();
				let e = m.current;
				e?.lat !== void 0 && e.lng !== void 0 && S(e.lat, e.lng);
			}
		}, (e) => {
			y(), t === Infinity && u(Er(e));
		}, {
			enableHighAccuracy: !0,
			timeout: 15e3,
			maximumAge: 1e4
		});
	}, ee = (e) => {
		f.current = e.trim().length > 0;
		let t = {
			...h ? o : {},
			label: e
		};
		i(h || e.trim() ? t : void 0);
	};
	return /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-3",
		children: [h ? /* @__PURE__ */ x("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ b("div", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-moss-tint text-moss",
					children: /* @__PURE__ */ b(Ze, { className: "size-5" })
				}),
				/* @__PURE__ */ x("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ x("div", {
						className: "truncate font-medium text-[0.9375rem] tabular-nums",
						children: [
							o.lat?.toFixed(5),
							", ",
							o.lng?.toFixed(5)
						]
					}), /* @__PURE__ */ x("div", {
						className: "flex flex-wrap items-center gap-x-3 text-[0.8125rem] text-ink-3",
						children: [/* @__PURE__ */ b("span", { children: s ? R("location.refining") : o.accuracy ? R("location.accuracy", { m: o.accuracy }) : null }), /* @__PURE__ */ x("a", {
							href: `https://www.openstreetmap.org/?mlat=${o.lat}&mlon=${o.lng}#map=17/${o.lat}/${o.lng}`,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 underline-offset-2 hover:text-ink hover:underline coarse:-my-3 coarse:min-h-11 coarse:min-w-11",
							children: [
								R("location.map"),
								" ",
								/* @__PURE__ */ b(De, { className: "size-3" })
							]
						})]
					})]
				}),
				/* @__PURE__ */ b(mn, {
					label: R("location.remove"),
					onClick: () => {
						y(), f.current = !1, i(void 0);
					},
					children: /* @__PURE__ */ b(Bt, { className: "size-4" })
				})
			]
		}) : v ? /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ x(H, {
			variant: "secondary",
			size: "lg",
			busy: s,
			onClick: C,
			className: "w-full sm:w-auto",
			children: [s ? null : /* @__PURE__ */ b(qe, { className: "size-4" }), R(s ? "location.locating" : "location.use")]
		}), l ? /* @__PURE__ */ b("p", {
			className: "mt-2 rounded-lg bg-amber-tint px-3 py-2 text-[0.8125rem] text-ink-2 leading-relaxed",
			children: R(`location.${l}`)
		}) : /* @__PURE__ */ b("p", {
			className: "mt-2 text-[0.8125rem] text-ink-3 leading-relaxed",
			children: R("location.why")
		})] }) : null, /* @__PURE__ */ b(_n, {
			value: o?.label ?? "",
			placeholder: r ?? R(h ? "location.label" : "location.manual"),
			autoComplete: "street-address",
			enterKeyHint: "done",
			"aria-label": R("location.manual"),
			onChange: (e) => ee(e.target.value)
		})]
	});
}
//#endregion
//#region src/scan.tsx
var Or = null;
function kr() {
	return Or ??= (async () => {
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
	})(), Or;
}
function Ar({ open: e, onClose: t, onResult: n }) {
	let r = g(n);
	r.current = n;
	let i = g(t);
	return i.current = t, p(() => {
		e && ln("scan").then((e) => {
			e && r.current(e);
		}).catch(() => void 0).finally(() => i.current());
	}, [e]), null;
}
function jr(e) {
	return cn("scan") ? /* @__PURE__ */ b(Ar, { ...e }) : /* @__PURE__ */ b(Mr, { ...e });
}
function Mr({ open: e, onClose: t, onResult: n }) {
	let [r, i] = _("environment"), [a, o] = _(!1), [s, c] = _(!1), l = g(null), u = rr(e, r), d = g(n);
	d.current = n;
	let f = g(t);
	f.current = t, p(() => {
		e && (c(!1), kr().then((e) => o(e.qrOnly)));
	}, [e]), p(() => {
		if (!e || !u.stream) return;
		let t = !1, n, r = async () => {
			let e = u.video.current;
			if (!t && e && e.readyState >= 2 && e.videoWidth) {
				let n = await (await kr()).detect(e).catch(() => null);
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
	let m = async (e) => {
		if (!e) return;
		c(!1);
		let r = await createImageBitmap(e).catch(() => null), i = r ? await (await kr()).detect(r).catch(() => null) : null;
		i ? (n(i), t()) : c(!0);
	};
	return /* @__PURE__ */ x(ir, {
		open: e,
		onClose: t,
		label: R("scan.title"),
		children: [
			/* @__PURE__ */ b(or, {
				title: R("scan.title"),
				onClose: t,
				camera: u,
				onFlip: () => i((e) => e === "environment" ? "user" : "environment")
			}),
			/* @__PURE__ */ b(sr, {
				camera: u,
				asking: R("scan.asking"),
				actions: /* @__PURE__ */ x("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ x(fr, {
						onClick: () => l.current?.click(),
						children: [
							/* @__PURE__ */ b(Ue, { className: "size-4" }),
							" ",
							R("scan.fromPhoto")
						]
					}), /* @__PURE__ */ b(fr, {
						quiet: !0,
						onClick: t,
						children: R("scan.typeInstead")
					})]
				}),
				children: /* @__PURE__ */ b("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ b("div", { className: "aspect-square w-[min(68%,320px)] rounded-3xl border-2 border-white/90 shadow-[0_0_0_100vmax_rgb(0_0_0/0.35)]" })
				})
			}),
			/* @__PURE__ */ x("div", {
				className: "safe-bottom flex flex-col items-center gap-3 px-5 pt-3 text-center",
				children: [/* @__PURE__ */ b("p", {
					className: "text-[0.8125rem] text-white/75 leading-snug",
					children: R(s ? "scan.miss" : a ? "scan.hintQr" : "scan.hint")
				}), u.stream ? /* @__PURE__ */ x(fr, {
					quiet: !0,
					onClick: () => l.current?.click(),
					children: [
						/* @__PURE__ */ b(Ue, { className: "size-4" }),
						" ",
						R("scan.fromPhoto")
					]
				}) : null]
			}),
			/* @__PURE__ */ b("input", {
				ref: l,
				type: "file",
				hidden: !0,
				accept: "image/*",
				onChange: (e) => {
					m(e.target.files?.[0]), e.target.value = "";
				}
			})
		]
	});
}
//#endregion
//#region src/signature.tsx
var Nr = "#1d1a17", Pr = {
	width: 1200,
	height: 480
};
function Fr(e, t, n, r, i) {
	e.lineCap = "round", e.lineJoin = "round", e.strokeStyle = Nr, e.fillStyle = Nr, e.lineWidth = i;
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
function Ir({ strokes: e, onStrokes: t }) {
	let n = g(null), r = g(null), i = g(e);
	i.current = e;
	let a = () => {
		let e = n.current, t = e?.getContext("2d");
		if (!e || !t) return;
		let a = window.devicePixelRatio || 1, o = Math.round(e.clientWidth * a), s = Math.round(e.clientHeight * a);
		(e.width !== o || e.height !== s) && (e.width = o, e.height = s), t.clearRect(0, 0, o, s), Fr(t, r.current ? [...i.current, r.current] : i.current, o, s, 2.4 * a);
	};
	p(() => {
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
	return /* @__PURE__ */ x("div", {
		className: "relative overflow-hidden rounded-xl bg-white ring-1 ring-input",
		children: [
			/* @__PURE__ */ b("canvas", {
				ref: n,
				"aria-label": R("sign.pad"),
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
			/* @__PURE__ */ b("div", { className: "pointer-events-none absolute inset-x-6 bottom-[22%] border-[#1d1a17]/25 border-b" }),
			e.length ? null : /* @__PURE__ */ b("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center text-[#1d1a17]/40 text-[0.875rem]",
				children: R("sign.hint")
			})
		]
	});
}
async function Lr(e) {
	let t = document.createElement("canvas");
	t.width = Pr.width, t.height = Pr.height;
	let n = t.getContext("2d");
	if (!n) return null;
	Fr(n, e, Pr.width, Pr.height, 7);
	let r = await new Promise((e) => t.toBlob(e, "image/png"));
	return r ? new File([r], "unterschrift.png", { type: "image/png" }) : null;
}
function Rr({ label: e, value: t, runId: n, onChange: r }) {
	let [i, a] = _(!1), [o, s] = _([]), [c, l] = _(!1), [u, d] = _(null), f = typeof t == "string" && t ? t : null, p = async () => {
		l(!0), d(null);
		try {
			let e = await Lr(o);
			if (!e) return;
			r((await z.upload(`${B(n)}/uploads`, e)).id), a(!1);
		} catch (e) {
			d(e.message);
		} finally {
			l(!1);
		}
	};
	return /* @__PURE__ */ x("div", { children: [f ? /* @__PURE__ */ x("div", {
		className: "flex items-center gap-3 rounded-xl bg-card p-2 ring-1 ring-input",
		children: [/* @__PURE__ */ b("button", {
			type: "button",
			onClick: () => {
				s([]), a(!0);
			},
			className: "min-w-0 flex-1 rounded-lg bg-white px-3",
			"aria-label": R("sign.again"),
			children: /* @__PURE__ */ b("img", {
				src: on(`${B(n)}/assets/${f}`),
				alt: e,
				className: "mx-auto h-20 object-contain"
			})
		}), /* @__PURE__ */ b(mn, {
			label: R("sign.remove"),
			onClick: () => r(void 0),
			children: /* @__PURE__ */ b(Bt, { className: "size-4" })
		})]
	}) : /* @__PURE__ */ x("button", {
		type: "button",
		onClick: () => {
			s([]), a(!0);
		},
		className: "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-input border-dashed bg-card px-4 py-7 text-[0.875rem] text-ink-3 transition hover:border-ember hover:text-ink",
		children: [/* @__PURE__ */ b(st, { className: "size-6" }), R("sign.open")]
	}), /* @__PURE__ */ x(En, {
		open: i,
		onClose: () => a(!1),
		title: e,
		wide: !0,
		children: [
			/* @__PURE__ */ b(Ir, {
				strokes: o,
				onStrokes: s
			}),
			u ? /* @__PURE__ */ b("p", {
				className: "mt-2 text-[0.8125rem] text-rose",
				children: u
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "mt-5 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ x(H, {
					variant: "ghost",
					disabled: !o.length || c,
					onClick: () => s([]),
					children: [
						/* @__PURE__ */ b(Te, { className: "size-4" }),
						" ",
						R("sign.clear")
					]
				}), /* @__PURE__ */ b(H, {
					busy: c,
					disabled: !o.length,
					onClick: () => void p(),
					children: R("sign.accept")
				})]
			})
		]
	})] });
}
//#endregion
//#region src/store.tsx
function zr({ runId: e, connectionId: t, connector: n, onCancel: r }) {
	let [i, a] = _({}), [o, s] = _(!1), [c, l] = _(null), u = async () => {
		s(!0), l(null);
		try {
			await z.post(`${B(e)}/connections/${t}/credentials/${n.id}`, { values: i });
		} catch (e) {
			l(e.message);
		} finally {
			s(!1);
		}
	};
	return /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-input",
		children: [
			(n.fields ?? []).map((e) => /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b(Cn, { children: e.label }), /* @__PURE__ */ b(_n, {
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
			n.hint ? /* @__PURE__ */ b("p", {
				className: "text-[0.8125rem] text-ink-3",
				children: n.hint
			}) : null,
			c ? /* @__PURE__ */ b("p", {
				className: "text-[0.8125rem] text-rose",
				children: c
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ b(H, {
					variant: "ghost",
					size: "sm",
					onClick: r,
					children: R("common.cancel")
				}), /* @__PURE__ */ b(H, {
					size: "sm",
					busy: o,
					onClick: () => void u(),
					children: R("connect.go")
				})]
			})
		]
	});
}
function Br({ runId: e, connection: t }) {
	let [n, r] = _(null), [i, a] = _(null), [o, s] = _(null);
	if (!t) return null;
	if (t.account) {
		let n = t.connectors.find((e) => e.id === t.account?.connector)?.name ?? "";
		return /* @__PURE__ */ x("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ b("div", {
					className: "flex size-10 items-center justify-center rounded-full bg-moss-tint text-moss",
					children: /* @__PURE__ */ b(ge, { className: "size-5" })
				}),
				/* @__PURE__ */ x("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ b("div", {
						className: "truncate font-medium text-[0.9375rem]",
						children: t.account.label
					}), /* @__PURE__ */ b("div", {
						className: "text-[0.8125rem] text-ink-3",
						children: R("connect.connected", { name: n })
					})]
				}),
				/* @__PURE__ */ b(mn, {
					label: R("connect.disconnect"),
					onClick: () => void z.del(`${B(e)}/connections/${t.id}`),
					children: /* @__PURE__ */ b(It, { className: "size-4" })
				})
			]
		});
	}
	let c = async (n) => {
		if (s(null), a(null), cn("signIn")) {
			try {
				let { url: r } = await z.post(`${B(e)}/connections/${t.id}/oauth/${n.id}`);
				await ln("signIn", { url: r });
			} catch (e) {
				s(e.message);
			}
			return;
		}
		let r = window.open("about:blank", "wizard-connect", "width=540,height=700");
		try {
			let { url: i } = await z.post(`${B(e)}/connections/${t.id}/oauth/${n.id}`);
			r ? r.location.replace(i) : a(i);
		} catch (e) {
			r?.close(), s(e.message);
		}
	}, l = t.connectors.find((e) => e.id === n);
	return t.connectors.length ? /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ b("div", {
				className: "flex flex-wrap gap-2",
				children: t.connectors.map((e) => /* @__PURE__ */ x("button", {
					type: "button",
					onClick: () => e.auth === "oauth2" ? void c(e) : r(n === e.id ? null : e.id),
					className: V("inline-flex h-11 items-center gap-2 rounded-full px-4 font-medium text-[0.875rem] ring-1 transition", n === e.id ? "bg-ember-veil text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink hover:ring-ember"),
					children: [
						/* @__PURE__ */ b(Ge, { className: "size-4" }),
						" ",
						e.name
					]
				}, e.id))
			}),
			l ? /* @__PURE__ */ b(zr, {
				runId: e,
				connectionId: t.id,
				connector: l,
				onCancel: () => r(null)
			}) : null,
			i ? /* @__PURE__ */ b("a", {
				href: i,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[0.875rem] text-ember underline",
				children: R("connect.openLink")
			}) : null,
			o ? /* @__PURE__ */ b("p", {
				className: "text-[0.8125rem] text-rose",
				children: o
			}) : null
		]
	}) : /* @__PURE__ */ b("p", {
		className: "text-[0.875rem] text-ink-3",
		children: R("connect.none")
	});
}
function Vr(e) {
	return e == null ? "" : Array.isArray(e) ? e.join(", ") : String(e);
}
function Hr(e, t) {
	if (t.trim() === "") return null;
	if (e.type === "number") {
		let e = Number(t.replace(/\s/g, "").replace(",", "."));
		return Number.isFinite(e) ? e : t;
	}
	return e.type === "boolean" ? t === "true" : t;
}
function Ur({ column: e, value: t, boxed: n, onCommit: r }) {
	let [i, a] = _(Vr(t));
	p(() => a(Vr(t)), [t]);
	let o = V("w-full min-w-0 rounded-md border border-transparent px-2 text-[0.8125rem] outline-none focus:border-ember focus:bg-card", n ? "h-11 bg-paper-2" : "h-9 bg-transparent hover:bg-paper-2 coarse:h-11");
	return e.type === "boolean" ? /* @__PURE__ */ b("label", {
		className: "flex size-9 cursor-pointer items-center justify-center coarse:size-11",
		children: /* @__PURE__ */ b("input", {
			type: "checkbox",
			"aria-label": e.name,
			checked: t === !0,
			onChange: (e) => r(e.target.checked),
			className: "size-4 accent-[var(--ember)] coarse:size-6"
		})
	}) : e.type === "select" && !e.format.multiple && !e.format.allowCustom ? /* @__PURE__ */ x("select", {
		value: i,
		onChange: (e) => r(e.target.value || null),
		className: o,
		children: [/* @__PURE__ */ b("option", { value: "" }), e.format.options.map((e) => /* @__PURE__ */ b("option", {
			value: e.id,
			children: e.label
		}, e.id))]
	}) : /* @__PURE__ */ b("input", {
		"aria-label": e.name,
		type: e.type === "date" && e.format.kind === "date" ? "date" : "text",
		inputMode: e.type === "number" ? "decimal" : void 0,
		enterKeyHint: "done",
		autoComplete: "off",
		value: i,
		onChange: (e) => a(e.target.value),
		onBlur: () => {
			i !== Vr(t) && r(Hr(e, i));
		},
		onKeyDown: (e) => {
			e.key === "Enter" && (e.preventDefault(), e.target.blur());
		},
		className: V(o, e.type === "number" && "text-right tabular-nums")
	});
}
function Wr({ runId: e, list: t, editable: n }) {
	let { def: r, rows: i } = t, [a, o] = _(null), [s, c] = _({}), l = `${B(e)}/lists/${r.id}/rows`, u = async (e) => {
		o(null);
		try {
			await e();
		} catch (e) {
			o(e instanceof Zt ? e.message : String(e));
		}
	}, d = () => u(async () => {
		await z.post(l, { cells: s }), c({});
	}), f = Object.values(s).some((e) => e != null && e !== "");
	if (!i.length && !n) return /* @__PURE__ */ b("p", {
		className: "text-[0.875rem] text-ink-3",
		children: R("list.empty")
	});
	let p = (e, t) => t === 0 || e.type === "text" && e.format?.style === "multiline", m = (e, t, n) => void u(() => z.patch(`${l}/${e}`, { cells: { [t]: n } }));
	return /* @__PURE__ */ x("div", { children: [
		/* @__PURE__ */ x("div", {
			className: "flex flex-col gap-2 sm:hidden",
			children: [i.map((e) => /* @__PURE__ */ x("div", {
				className: "rounded-lg bg-paper p-2 ring-1 ring-border-soft",
				children: [/* @__PURE__ */ b("div", {
					className: "grid grid-cols-2 gap-x-2 gap-y-1.5",
					children: r.columns.map((t, r) => /* @__PURE__ */ x("div", {
						className: V("min-w-0", p(t, r) && "col-span-2"),
						children: [/* @__PURE__ */ b("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: t.name
						}), n ? /* @__PURE__ */ b(Ur, {
							boxed: !0,
							column: t,
							value: e.cells[t.id],
							onCommit: (n) => m(e.id, t.id, n)
						}) : /* @__PURE__ */ b("div", {
							className: V("break-words px-1 text-[0.875rem]", t.type === "number" && "tabular-nums"),
							children: Sr(t, e.cells[t.id], L) || "—"
						})]
					}, t.id))
				}), n ? /* @__PURE__ */ b("div", {
					className: "mt-1 flex justify-end",
					children: /* @__PURE__ */ b(mn, {
						label: R("list.delete"),
						onClick: () => void u(() => z.del(`${l}/${e.id}`)),
						children: /* @__PURE__ */ b(Mt, { className: "size-4" })
					})
				}) : null]
			}, e.id)), n ? /* @__PURE__ */ x("div", {
				className: "rounded-lg border border-input border-dashed p-2",
				children: [/* @__PURE__ */ b("div", {
					className: "grid grid-cols-2 gap-x-2 gap-y-1.5",
					children: r.columns.map((e, t) => /* @__PURE__ */ x("div", {
						className: V("min-w-0", p(e, t) && "col-span-2"),
						children: [/* @__PURE__ */ b("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: e.name
						}), /* @__PURE__ */ b(Ur, {
							boxed: !0,
							column: e,
							value: s[e.id],
							onCommit: (t) => c((n) => ({
								...n,
								[e.id]: t
							}))
						})]
					}, e.id))
				}), /* @__PURE__ */ b("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ x(H, {
						variant: "secondary",
						size: "sm",
						onClick: () => f ? void d() : void 0,
						children: [
							/* @__PURE__ */ b(ft, { className: "size-4" }),
							" ",
							R("run.addRow")
						]
					})
				})]
			}) : null]
		}),
		/* @__PURE__ */ b("div", {
			className: "hidden overflow-x-auto rounded-lg ring-1 ring-border-soft sm:block",
			children: /* @__PURE__ */ x("table", {
				className: "w-full text-[0.8125rem]",
				children: [/* @__PURE__ */ b("thead", {
					className: "bg-paper-2 text-ink-2",
					children: /* @__PURE__ */ x("tr", { children: [r.columns.map((e) => /* @__PURE__ */ b("th", {
						className: "whitespace-nowrap px-3 py-2 text-left font-medium",
						children: e.name
					}, e.id)), n ? /* @__PURE__ */ b("th", { className: "w-10" }) : null] })
				}), /* @__PURE__ */ x("tbody", { children: [i.map((e) => /* @__PURE__ */ x("tr", {
					className: "border-border-soft border-t align-top",
					children: [r.columns.map((t) => /* @__PURE__ */ b("td", {
						className: V("min-w-[7.5rem]", n ? "px-1 py-0.5" : "px-3 py-2"),
						children: n ? /* @__PURE__ */ b(Ur, {
							column: t,
							value: e.cells[t.id],
							onCommit: (n) => m(e.id, t.id, n)
						}) : /* @__PURE__ */ b("span", {
							className: V(t.type === "number" && "tabular-nums"),
							children: Sr(t, e.cells[t.id], L)
						})
					}, t.id)), n ? /* @__PURE__ */ b("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ b(mn, {
							label: R("list.delete"),
							className: "size-9",
							onClick: () => void u(() => z.del(`${l}/${e.id}`)),
							children: /* @__PURE__ */ b(Mt, { className: "size-3.5" })
						})
					}) : null]
				}, e.id)), n ? /* @__PURE__ */ x("tr", {
					className: "border-border-soft border-t bg-paper",
					children: [r.columns.map((e) => /* @__PURE__ */ b("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ b(Ur, {
							column: e,
							value: s[e.id],
							onCommit: (t) => c((n) => ({
								...n,
								[e.id]: t
							}))
						})
					}, e.id)), /* @__PURE__ */ b("td", {
						className: "px-1 py-0.5",
						children: /* @__PURE__ */ b(mn, {
							label: R("run.addRow"),
							className: "size-9",
							onClick: () => f ? void d() : void 0,
							children: /* @__PURE__ */ b(ft, { className: "size-4" })
						})
					})]
				}) : null] })]
			})
		}),
		a ? /* @__PURE__ */ b("p", {
			className: "mt-2 text-[0.8125rem] text-rose",
			children: a
		}) : null
	] });
}
function Gr(e, t, n) {
	let r = t.split("/").map(encodeURIComponent).join("/");
	return on(`${B(e)}/store/files/${r}${n ? "?inline=1" : ""}`);
}
var Kr = [
	"bg-paper-3 text-ink-3",
	"bg-moss-tint text-moss",
	"bg-rose-tint text-rose",
	"bg-ember-tint text-ember-strong"
];
function qr({ runId: e, list: t }) {
	let { def: n, rows: r } = t, i = n.columns.find((e) => e.id === n.check?.file), a = n.columns.find((e) => e.id === n.check?.status), o = a?.type === "select" ? a.format.options : [], s = o[0]?.id, c = (e) => a ? String(e.cells[a.id] ?? s ?? "") : "", l = (e) => !a || c(e) === s, [u, d] = _(() => (r.find(l) ?? r[0])?.id ?? null), [f, p] = _(!1), [m, h] = _(null), g = `${B(e)}/lists/${n.id}/rows`, v = r.find((e) => e.id === u) ?? r[0], S = f ? r.filter((e) => l(e) || e.id === v?.id) : r, C = r.filter((e) => !l(e)).length, ee = n.columns.filter((e) => e !== i && e !== a), w = ee.filter((e) => e.id !== n.key), T = w.find((e) => e.type === "text") ?? w[0], E = w.filter((e) => e !== T), D = async (e, t) => {
		h(null);
		try {
			await z.patch(`${g}/${e}`, { cells: t });
		} catch (e) {
			h(e instanceof Zt ? e.message : String(e));
		}
	}, O = (e) => {
		let t = S.findIndex((e) => e.id === v?.id), n = S[Math.min(S.length - 1, Math.max(0, t + e))];
		n && d(n.id);
	}, te = async (e) => {
		if (!v || !a) return;
		let t = r.findIndex((e) => e.id === v.id), n = [...r.slice(t + 1), ...r.slice(0, t)].find(l);
		await D(v.id, { [a.id]: e }), n && e !== s && d(n.id);
	}, ne = (e) => {
		e.target.closest("input, textarea, select") || (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), O(e.key === "ArrowDown" ? 1 : -1)) : /^[1-9]$/.test(e.key) && o[Number(e.key)] && (e.preventDefault(), te(o[Number(e.key)].id)));
	};
	if (!r.length) return /* @__PURE__ */ b("p", {
		className: "text-[0.875rem] text-ink-3",
		children: R("list.empty")
	});
	let k = i && v ? String(v.cells[i.id] ?? "").trim() : "", A = k.split(".").pop()?.toLowerCase() ?? "", j = (e) => Kr[Math.min(Math.max(0, o.findIndex((t) => t.id === c(e))), 3)];
	return /* @__PURE__ */ x("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]",
		onKeyDown: ne,
		children: [/* @__PURE__ */ x("div", {
			className: "flex min-h-0 flex-col",
			children: [/* @__PURE__ */ x("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ b("span", {
					className: "text-[0.8125rem] text-ink-3 tabular-nums",
					children: R("check.progress", {
						done: C,
						total: r.length
					})
				}), a ? /* @__PURE__ */ b("button", {
					type: "button",
					"aria-pressed": f,
					onClick: () => p((e) => !e),
					className: V("inline-flex h-8 items-center rounded-full px-3 text-[0.8125rem] ring-1 transition coarse:h-11", f ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink"),
					children: R("check.onlyOpen")
				}) : null]
			}), /* @__PURE__ */ b("ul", {
				className: "flex max-h-[38vh] flex-col gap-1.5 overflow-y-auto p-0.5 pr-1 lg:max-h-[calc(100vh-15rem)]",
				children: S.map((e) => /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": e.id === v?.id,
					className: V("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ring-1 transition", e.id === v?.id ? "bg-card shadow-soft ring-ember" : "bg-paper ring-border-soft hover:bg-card"),
					children: [/* @__PURE__ */ x("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ b("span", {
							className: "block truncate font-medium text-[0.875rem]",
							children: T && Sr(T, e.cells[T.id], L) || "—"
						}), /* @__PURE__ */ b("span", {
							className: "block truncate text-[0.75rem] text-ink-3 tabular-nums",
							children: E.slice(0, 2).map((t) => Sr(t, e.cells[t.id], L)).filter(Boolean).join(" · ")
						})]
					}), a ? /* @__PURE__ */ b("span", {
						className: V("shrink-0 rounded-full px-2 py-0.5 font-medium text-[0.6875rem]", j(e)),
						children: o.find((t) => t.id === c(e))?.label ?? c(e)
					}) : null]
				}) }, e.id))
			})]
		}), v ? /* @__PURE__ */ x("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				o.length > 1 ? /* @__PURE__ */ x("div", {
					className: "flex flex-wrap gap-2",
					children: [o.slice(1).map((e, t) => /* @__PURE__ */ x(H, {
						size: "md",
						variant: c(v) === e.id ? "primary" : "secondary",
						onClick: () => void te(e.id),
						children: [
							c(v) === e.id ? /* @__PURE__ */ b(ge, { className: "size-4" }) : null,
							e.label,
							/* @__PURE__ */ b("kbd", {
								className: "ml-1 hidden rounded bg-black/10 px-1.5 text-[0.6875rem] lg:inline",
								children: t + 1
							})
						]
					}, e.id)), c(v) === s ? null : /* @__PURE__ */ b(H, {
						size: "md",
						variant: "ghost",
						onClick: () => void te(s ?? ""),
						children: R("check.reopen")
					})]
				}) : null,
				/* @__PURE__ */ b("div", {
					className: "overflow-hidden rounded-lg bg-paper-2 ring-1 ring-border-soft",
					children: k ? /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ x("div", {
						className: "flex items-center gap-2 border-border-soft border-b bg-card px-3 py-2 text-[0.8125rem]",
						children: [
							/* @__PURE__ */ b(je, { className: "size-3.5 shrink-0 text-ink-3" }),
							/* @__PURE__ */ b("span", {
								className: "min-w-0 flex-1 truncate",
								children: k.split("/").pop()
							}),
							/* @__PURE__ */ b("a", {
								href: Gr(e, k, A === "pdf"),
								target: "_blank",
								rel: "noreferrer",
								className: "shrink-0 text-ink-2 underline-offset-2 hover:text-ink hover:underline",
								children: R("run.openFull")
							})
						]
					}), A === "pdf" ? /* @__PURE__ */ b("iframe", {
						title: k,
						src: `${Gr(e, k, !0)}#toolbar=0&navpanes=0&view=FitH`,
						className: "h-[46vh] w-full border-0 bg-white lg:h-[calc(100vh-27rem)] lg:min-h-[360px]"
					}, k) : [
						"png",
						"jpg",
						"jpeg",
						"webp"
					].includes(A) ? /* @__PURE__ */ b("div", {
						className: "flex max-h-[46vh] justify-center overflow-auto bg-white lg:max-h-[calc(100vh-27rem)]",
						children: /* @__PURE__ */ b("img", {
							src: Gr(e, k, !0),
							alt: k,
							className: "max-w-full object-contain"
						}, k)
					}) : /* @__PURE__ */ b("p", {
						className: "px-4 py-10 text-center text-[0.875rem] text-ink-3",
						children: R("check.noPreview")
					})] }) : /* @__PURE__ */ b("p", {
						className: "px-4 py-14 text-center text-[0.875rem] text-ink-3",
						children: R("check.noFile")
					})
				}),
				/* @__PURE__ */ b("div", {
					className: "grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3",
					children: ee.map((e) => /* @__PURE__ */ x("div", {
						className: V("min-w-0", e.type === "text" && e.format?.style === "multiline" && "col-span-full"),
						children: [/* @__PURE__ */ b("div", {
							className: "px-1 pb-0.5 text-[0.6875rem] text-ink-3",
							children: e.name
						}), /* @__PURE__ */ b(Ur, {
							boxed: !0,
							column: e,
							value: v.cells[e.id],
							onCommit: (t) => void D(v.id, { [e.id]: t })
						})]
					}, e.id))
				}),
				m ? /* @__PURE__ */ b("p", {
					className: "text-[0.8125rem] text-rose",
					children: m
				}) : null
			]
		}) : null]
	});
}
var Jr = {
	xlsx: "Excel",
	csv: "CSV",
	json: "JSON",
	md: "Markdown",
	zip: "ZIP"
};
function Yr({ runId: e, list: t }) {
	return /* @__PURE__ */ b("div", {
		className: "flex flex-wrap gap-2",
		children: t.formats.map((n) => /* @__PURE__ */ b("a", {
			href: on(`${B(e)}/lists/${t.def.id}/download?format=${n}`),
			className: "inline-flex h-9 items-center rounded-full bg-paper-2 px-3.5 font-medium text-[0.8125rem] text-ink-2 transition hover:bg-paper-3 hover:text-ink coarse:h-11 coarse:px-4",
			children: Jr[n] ?? n
		}, n))
	});
}
function Xr(e) {
	return e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`;
}
function Zr({ runId: e }) {
	let [t, n] = _(!1), [r, i] = _(null), [a, o] = _(!1);
	p(() => {
		t && (o(!1), z.get(`${B(e)}/store`).then(i));
	}, [t, e]);
	let s = r && !r.files.length && !r.connections.length && !r.keepsSignIns && r.lists.every((e) => !e.rows);
	return /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ x("button", {
		type: "button",
		onClick: () => n(!0),
		className: "inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-4 transition hover:text-ink-2 coarse:min-h-11",
		children: [
			/* @__PURE__ */ b(xe, { className: "size-3.5" }),
			" ",
			R("store.open")
		]
	}), /* @__PURE__ */ b(En, {
		open: t,
		onClose: () => n(!1),
		title: R("store.title"),
		wide: !0,
		children: r ? /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-5 text-[0.875rem]",
			children: [
				/* @__PURE__ */ b("p", {
					className: "text-ink-3",
					children: R("store.explain")
				}),
				s ? /* @__PURE__ */ b("p", {
					className: "text-ink-2",
					children: R("store.empty")
				}) : null,
				r.lists.some((e) => e.rows) ? /* @__PURE__ */ b("ul", {
					className: "flex flex-col gap-1",
					children: r.lists.filter((e) => e.rows).map((e) => /* @__PURE__ */ x("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ b("span", { children: e.title }), /* @__PURE__ */ b("span", {
							className: "text-ink-3 tabular-nums",
							children: R("store.rows", { n: e.rows })
						})]
					}, e.id))
				}) : null,
				r.connections.map((e) => /* @__PURE__ */ x("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ b(Ge, { className: "size-4 text-ink-3" }),
						" ",
						e.account?.label
					]
				}, e.id)),
				r.keepsSignIns ? /* @__PURE__ */ x("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ b(ge, { className: "size-4 text-ink-3" }),
						" ",
						R("store.signIns")
					]
				}) : null,
				r.files.length ? /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("div", {
					className: "mb-1 text-ink-3",
					children: R("store.files", {
						n: r.files.length,
						size: Xr(r.files.reduce((e, t) => e + t.size, 0))
					})
				}), /* @__PURE__ */ b("ul", {
					className: "max-h-56 overflow-y-auto rounded-lg ring-1 ring-border-soft",
					children: r.files.map((t) => /* @__PURE__ */ b("li", {
						className: "border-border-soft border-b last:border-0",
						children: /* @__PURE__ */ x("a", {
							href: on(`${B(e)}/store/files/${t.path}`),
							className: "flex items-center gap-2 px-3 py-2 text-[0.8125rem] hover:bg-paper-2 coarse:min-h-11",
							title: t.source ?? void 0,
							children: [
								/* @__PURE__ */ b(je, { className: "size-3.5 shrink-0 text-ink-3" }),
								/* @__PURE__ */ b("span", {
									className: "min-w-0 flex-1 truncate",
									children: t.path
								}),
								/* @__PURE__ */ b("span", {
									className: "text-ink-4 tabular-nums",
									children: Xr(t.size)
								})
							]
						})
					}, t.path))
				})] }) : null,
				/* @__PURE__ */ x("div", {
					className: "flex items-center justify-between gap-3 pt-1",
					children: [s ? /* @__PURE__ */ b("span", {}) : a ? /* @__PURE__ */ x(H, {
						variant: "secondary",
						onClick: async () => {
							await z.del(`${B(e)}/store`), i(await z.get(`${B(e)}/store`)), o(!1);
						},
						children: [
							/* @__PURE__ */ b(Mt, { className: "size-4" }),
							" ",
							R("store.confirmDelete")
						]
					}) : /* @__PURE__ */ x(H, {
						variant: "ghost",
						onClick: () => o(!0),
						children: [
							/* @__PURE__ */ b(Mt, { className: "size-4" }),
							" ",
							R("store.delete")
						]
					}), /* @__PURE__ */ b(H, {
						onClick: () => n(!1),
						children: R("common.close")
					})]
				})
			]
		}) : /* @__PURE__ */ b("div", {
			className: "flex justify-center py-8 text-ink-4",
			children: /* @__PURE__ */ b(wn, {})
		})
	})] });
}
//#endregion
//#region src/voice.tsx
var Qr = 300;
function $r() {
	if (typeof MediaRecorder < "u") return (cn("transcribe") ? [
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
async function ei(e, t) {
	if (cn("transcribe")) try {
		let n = await ln("transcribe", {
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
function ti(e) {
	return `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`;
}
function ni({ value: e, runId: t, onChange: n, onBusy: r }) {
	let i = s(e) ? e : null, [a, o] = _(null), [c, l] = _(0), [u, d] = _(!1), [f, m] = _(null), [h, v] = _(!1), [y, S] = _(null), C = g(null), ee = g(null), w = $r(), T = Fn && !!w;
	p(() => () => {
		C.current && (C.current.recorder.onstop = null, C.current.stop());
	}, []), p(() => () => {
		y && URL.revokeObjectURL(y.url);
	}, [y]);
	let E = async (e, i) => {
		d(!0), r?.(!0), m(null);
		try {
			let r = await z.upload(`${B(t)}/uploads`, e);
			S({
				asset: r.id,
				url: URL.createObjectURL(e)
			});
			let { lang: a } = an(), o = await ei(e, a);
			n({
				asset: r.id,
				lang: a,
				...i === void 0 ? {} : { seconds: i },
				...o === void 0 ? {} : { transcript: o }
			});
		} catch (e) {
			m(e.message);
		} finally {
			d(!1), r?.(!1);
		}
	}, D = async () => {
		m(null), v(!1);
		let e;
		try {
			e = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: !0,
				noiseSuppression: !0
			} });
		} catch {
			v(!0);
			return;
		}
		let t = [], n = new MediaRecorder(e, {
			mimeType: w,
			audioBitsPerSecond: 48e3
		}), i = Date.now(), a = new AudioContext(), s = a.createAnalyser();
		s.fftSize = 256, a.createMediaStreamSource(e).connect(s);
		let c = new Uint8Array(s.fftSize), u = 0, d = () => {
			s.getByteTimeDomainData(c);
			let e = 0;
			for (let t of c) e = Math.max(e, Math.abs(t - 128));
			if (l(Math.min(1, e / 64)), o((Date.now() - i) / 1e3), (Date.now() - i) / 1e3 >= Qr) {
				f();
				return;
			}
			u = requestAnimationFrame(d);
		}, f = () => {
			cancelAnimationFrame(u), n.state !== "inactive" && n.stop();
			for (let t of e.getTracks()) t.stop();
			a.close().catch(() => void 0), C.current = null, o(null), l(0);
		};
		n.ondataavailable = (e) => e.data.size && t.push(e.data), n.onstop = () => {
			let e = (n.mimeType || w || "audio/webm").split(";")[0], r = e === "audio/mp4" ? "m4a" : e === "audio/ogg" ? "ogg" : "webm", a = Math.max(1, Math.round((Date.now() - i) / 1e3));
			E(new File(t, `sprachnotiz-${er()}.${r}`, { type: e }), a);
		}, C.current = {
			recorder: n,
			stop: f
		}, r?.(!0), n.start(1e3), u = requestAnimationFrame(d);
	}, O = a !== null, te = /* @__PURE__ */ x(H, {
		variant: "secondary",
		onClick: () => ee.current?.click(),
		children: [
			/* @__PURE__ */ b(ke, { className: "size-4" }),
			" ",
			R("voice.pick")
		]
	});
	return /* @__PURE__ */ x("div", { children: [
		O ? /* @__PURE__ */ x("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-ember",
			children: [
				/* @__PURE__ */ x("span", {
					className: "relative flex size-11 shrink-0 items-center justify-center",
					children: [/* @__PURE__ */ b("span", {
						className: "absolute inset-0 rounded-full bg-rose-tint transition-transform duration-75",
						style: { transform: `scale(${.7 + c * .5})` }
					}), /* @__PURE__ */ b("span", { className: "relative size-3.5 animate-pulse-dot rounded-full bg-rose" })]
				}),
				/* @__PURE__ */ x("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ b("div", {
						className: "font-medium text-[0.9375rem] tabular-nums",
						children: ti(a)
					}), /* @__PURE__ */ b("div", {
						className: "text-[0.8125rem] text-ink-3",
						children: a > 270 ? R("voice.left", { s: Math.ceil(Qr - a) }) : R("voice.recording")
					})]
				}),
				/* @__PURE__ */ x(H, {
					onClick: () => C.current?.stop(),
					children: [
						/* @__PURE__ */ b(Ot, { className: "size-3.5 fill-current" }),
						" ",
						R("voice.stop")
					]
				})
			]
		}) : u ? /* @__PURE__ */ x("div", {
			className: "flex items-center gap-3 rounded-xl bg-card p-4 text-[0.875rem] text-ink-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ b(wn, { className: "size-4" }),
				" ",
				R("run.uploading")
			]
		}) : i ? /* @__PURE__ */ x("div", {
			className: "rounded-xl bg-card p-3 ring-1 ring-input",
			children: [
				/* @__PURE__ */ b("audio", {
					controls: !0,
					preload: "metadata",
					src: y?.asset === i.asset ? y.url : `${B(t)}/assets/${i.asset}`,
					className: "h-11 w-full"
				}),
				i.transcript ? /* @__PURE__ */ b("p", {
					className: "mt-2 whitespace-pre-wrap px-1 text-[0.875rem] text-ink-2 leading-relaxed",
					children: i.transcript
				}) : null,
				/* @__PURE__ */ x("div", {
					className: "mt-2 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ b("span", {
						className: "px-1 text-[0.8125rem] text-ink-3",
						children: i.seconds ? ti(i.seconds) : null
					}), /* @__PURE__ */ x("div", {
						className: "flex gap-1",
						children: [T ? /* @__PURE__ */ x(H, {
							variant: "ghost",
							size: "sm",
							onClick: () => void D(),
							children: [
								/* @__PURE__ */ b(vt, { className: "size-3.5" }),
								" ",
								R("voice.again")
							]
						}) : null, /* @__PURE__ */ b(H, {
							variant: "ghost",
							size: "sm",
							onClick: () => n(void 0),
							children: R("voice.remove")
						})]
					})]
				})
			]
		}) : /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ x("div", {
			className: "flex flex-wrap gap-2",
			children: [T ? /* @__PURE__ */ x(H, {
				variant: "secondary",
				size: "lg",
				onClick: () => void D(),
				className: "w-full sm:w-auto",
				children: [
					/* @__PURE__ */ b(tt, { className: "size-4" }),
					" ",
					R("voice.start")
				]
			}) : te, T && h ? te : null]
		}), h ? /* @__PURE__ */ b("p", {
			className: "mt-2 rounded-lg bg-amber-tint px-3 py-2 text-[0.8125rem] text-ink-2 leading-relaxed",
			children: R("voice.denied")
		}) : /* @__PURE__ */ b("p", {
			className: "mt-2 text-[0.8125rem] text-ink-3 leading-relaxed",
			children: R(T ? "voice.why" : "voice.noRecorder")
		})] }),
		/* @__PURE__ */ b("input", {
			ref: ee,
			type: "file",
			hidden: !0,
			accept: "audio/*",
			capture: !0,
			onChange: (e) => {
				let t = e.target.files?.[0];
				e.target.value = "", t && E(t, void 0);
			}
		}),
		f ? /* @__PURE__ */ b("div", {
			className: "mt-2 text-[0.8125rem] text-rose",
			children: f
		}) : null
	] });
}
//#endregion
//#region src/fields.tsx
function ri(e, t) {
	try {
		return new Intl.NumberFormat(void 0, {
			style: "currency",
			currency: t
		}).format(e);
	} catch {
		return `${e.toFixed(2)} ${t}`;
	}
}
function ii({ field: e, value: t, values: n, onChange: r }) {
	let i = e.columns ?? [], a = Array.isArray(t) && t.length ? t : [{}], o = c(e, a, n), s = (e, t, n) => {
		r(a.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, l = i.map((e) => e.kind === "text" && e === i[0] ? "minmax(0,3fr)" : "minmax(0,1fr)").join(" ");
	return /* @__PURE__ */ x("div", {
		className: "rounded-xl bg-card p-2 ring-1 ring-input",
		children: [
			/* @__PURE__ */ b("div", {
				className: "hidden gap-2 px-2 pt-1 pb-2 text-[0.75rem] text-ink-3 sm:grid",
				style: { gridTemplateColumns: `${l} 36px` },
				children: i.map((e) => /* @__PURE__ */ b("div", {
					className: e.kind === "text" ? "" : "text-right",
					children: e.label
				}, e.id))
			}),
			/* @__PURE__ */ b("div", {
				className: "flex flex-col gap-2",
				children: a.map((e, t) => /* @__PURE__ */ x("div", {
					className: "grid grid-cols-6 gap-2 rounded-lg bg-paper p-2 sm:bg-transparent sm:p-0 sm:[grid-template-columns:var(--cols)]",
					style: { "--cols": `${l} 36px` },
					children: [i.map((n, r) => /* @__PURE__ */ x("label", {
						className: V("flex min-w-0 flex-col gap-1 sm:col-span-1", r === 0 ? "col-span-5" : i.length - 1 <= 2 ? "col-span-3" : "col-span-2"),
						children: [/* @__PURE__ */ b("span", {
							className: "px-0.5 text-[0.6875rem] text-ink-3 sm:hidden",
							children: n.label
						}), /* @__PURE__ */ b("input", {
							"aria-label": n.label,
							placeholder: n.label,
							inputMode: n.kind === "text" ? "text" : "decimal",
							autoComplete: "off",
							value: String(e[n.id] ?? ""),
							onChange: (e) => s(t, n.id, e.target.value),
							className: V("h-11 w-full min-w-0 rounded-md border border-transparent bg-paper-2 px-2.5 text-[0.875rem] outline-none placeholder:text-transparent focus:border-focus focus:bg-card sm:placeholder:text-ink-4", n.kind !== "text" && "text-right tabular-nums")
						})]
					}, n.id)), /* @__PURE__ */ b(mn, {
						label: R("list.delete"),
						onClick: () => r(a.filter((e, n) => n !== t)),
						className: "order-first col-start-6 row-start-1 size-11 justify-self-end self-end sm:order-none sm:col-start-auto sm:row-start-auto",
						children: /* @__PURE__ */ b(Mt, { className: "size-4" })
					})]
				}, t))
			}),
			/* @__PURE__ */ x("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-3 px-2 pb-1",
				children: [/* @__PURE__ */ x("button", {
					type: "button",
					onClick: () => r([...a, {}]),
					className: "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] text-ink-2 hover:bg-accent coarse:h-11",
					children: [
						/* @__PURE__ */ b(ft, { className: "size-4" }),
						" ",
						R("run.addRow")
					]
				}), /* @__PURE__ */ x("div", {
					className: "text-right text-[0.8125rem] tabular-nums",
					children: [
						/* @__PURE__ */ x("div", {
							className: "text-ink-3",
							children: [
								R("run.net"),
								" ",
								ri(o.net, o.currency)
							]
						}),
						o.vatRate ? /* @__PURE__ */ x("div", {
							className: "text-ink-3",
							children: [
								R("run.vat", { r: o.vatRate }),
								" ",
								ri(o.vat, o.currency)
							]
						}) : null,
						/* @__PURE__ */ x("div", {
							className: "font-semibold text-[0.9375rem] text-ink",
							children: [
								R("run.total"),
								" ",
								ri(o.gross, o.currency)
							]
						})
					]
				})]
			})
		]
	});
}
function ai(e) {
	return !!e?.closest("input, textarea, [contenteditable='true']");
}
function oi({ field: e, value: t, runId: n, onChange: r, onBusy: i }) {
	let a = g(null), o = g(null), s = g(null), c = g(null), [l, u] = _(!1), [d, f] = _({}), [m, h] = _(null), [v, y] = _(!1), [S, C] = _(!1), [ee, w] = _(null), T = g(null), E = (e) => {
		T.current = e, w(e);
	}, D = e.kind === "image", O = !!e.multiple, te = O ? e.max ?? 30 : 1, ne = D || !!e.camera || !!e.video, k = !D && !!e.video, A = Array.isArray(t) ? t : typeof t == "string" && t ? [t] : [], j = g(A);
	j.current = A;
	let M = A.length < te, re = async (e) => {
		let t = (D ? e.filter((e) => e.type.startsWith("image/")) : e).sort((e, t) => e.name.localeCompare(t.name, void 0, { numeric: !0 }));
		if (!t.length) return;
		let a = te - (O ? j.current.length : 0);
		u(!0), i?.(!0), h(t.length > a && O ? R("run.maxFiles", { n: te }) : null);
		try {
			for (let e of t.slice(0, Math.max(0, a))) {
				let t = await $n(e), i = await z.upload(`${B(n)}/uploads`, t);
				f((e) => ({
					...e,
					[i.id]: {
						name: i.name,
						mime: i.mime
					}
				}));
				let a = O ? [...j.current, i.id] : i.id;
				j.current = O ? a : [i.id], r(a);
			}
		} catch (e) {
			h(e.message);
		} finally {
			u(!1), i?.(!1);
		}
	}, ie = g(re);
	ie.current = re;
	let ae = (e) => {
		let t = A.filter((t) => t !== e);
		r(O ? t : void 0);
	}, oe = (e, t) => {
		let n = j.current.indexOf(e), i = Math.min(j.current.length - 1, Math.max(0, t));
		if (n < 0 || n === i) return;
		let a = j.current.filter((t) => t !== e);
		a.splice(i, 0, e), j.current = a, r(a);
	}, N = O && A.length > 1;
	p(() => {
		if (!M) return;
		let e = (e) => {
			let t = Array.from(e.clipboardData?.files ?? []), n = a.current;
			if (!t.length || !n || ai(document.activeElement)) return;
			let r = document.querySelectorAll("[data-upload-field]");
			(n.matches(":hover") || n.contains(document.activeElement) || r.length === 1) && (e.preventDefault(), ie.current(t));
		};
		return document.addEventListener("paste", e), () => document.removeEventListener("paste", e);
	}, [M]);
	let se = V("flex flex-col items-center justify-center gap-2 rounded-xl border border-input border-dashed bg-card px-3 text-[0.875rem] text-ink-3 transition hover:border-ember hover:text-ink", A.length ? "py-4" : "py-8");
	return /* @__PURE__ */ x("div", {
		ref: a,
		"data-upload-field": "",
		onDragOver: (e) => {
			M && (e.preventDefault(), C(!0));
		},
		onDragLeave: () => C(!1),
		onDrop: (e) => {
			C(!1), M && (e.preventDefault(), re(Array.from(e.dataTransfer.files)));
		},
		children: [
			A.length ? /* @__PURE__ */ b("div", {
				className: "mb-2 flex flex-col gap-2",
				children: A.map((e, t) => {
					let r = d[e], i = r?.mime ?? (D ? "image/" : "");
					return /* @__PURE__ */ x("div", {
						"data-file-id": e,
						className: V("flex items-center gap-3 rounded-xl bg-card p-2 ring-1 ring-input transition-shadow", ee === e && "relative z-10 shadow-elevated ring-2 ring-ember"),
						children: [
							N ? /* @__PURE__ */ x("button", {
								type: "button",
								"aria-label": R("run.moveFile", { n: t + 1 }),
								title: R("run.moveFileHint"),
								className: V("-mr-1 flex h-14 w-9 shrink-0 touch-none flex-col items-center justify-center gap-0.5 rounded-lg text-ink-3 hover:bg-paper-2 hover:text-ink", ee === e ? "cursor-grabbing" : "cursor-grab"),
								onPointerDown: (t) => {
									try {
										t.currentTarget.setPointerCapture(t.pointerId);
									} catch {}
									E(e);
								},
								onPointerMove: (t) => {
									if (T.current !== e) return;
									let n = document.elementFromPoint(t.clientX, t.clientY)?.closest("[data-file-id]"), r = n?.getAttribute("data-file-id");
									r && r !== e && a.current?.contains(n ?? null) && oe(e, j.current.indexOf(r));
								},
								onPointerUp: () => E(null),
								onPointerCancel: () => E(null),
								onKeyDown: (n) => {
									(n.key === "ArrowUp" || n.key === "ArrowDown") && (n.preventDefault(), oe(e, t + (n.key === "ArrowUp" ? -1 : 1)));
								},
								children: [/* @__PURE__ */ b("span", {
									className: "font-medium text-[0.75rem] tabular-nums",
									children: t + 1
								}), /* @__PURE__ */ b(ze, { className: "size-4" })]
							}) : null,
							i.startsWith("image/") ? /* @__PURE__ */ b("img", {
								src: on(`${B(n)}/assets/${e}`),
								alt: "",
								className: "size-14 rounded-lg object-cover"
							}) : /* @__PURE__ */ b("div", {
								className: "flex size-12 shrink-0 items-center justify-center rounded-lg bg-paper-2",
								children: i.startsWith("video/") ? /* @__PURE__ */ b(Ne, { className: "size-5 text-ink-3" }) : /* @__PURE__ */ b(at, { className: "size-5 text-ink-3" })
							}),
							/* @__PURE__ */ b("div", {
								className: "min-w-0 flex-1 truncate text-[0.875rem]",
								children: r?.name ?? "✓"
							}),
							/* @__PURE__ */ b(mn, {
								label: R("run.removeFile"),
								onClick: () => ae(e),
								children: /* @__PURE__ */ b(Bt, { className: "size-4" })
							})
						]
					}, e);
				})
			}) : null,
			M ? /* @__PURE__ */ x("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ x("button", {
						type: "button",
						onClick: () => o.current?.click(),
						className: V(se, "min-w-[9rem] flex-1 px-4", S && "border-ember text-ink"),
						children: [b(D ? Ve : at, { className: "size-6" }), l ? R("run.uploading") : A.length ? R("run.uploadMore") : R(Pn ? "run.uploadTouch" : "run.upload")]
					}),
					ne ? /* @__PURE__ */ x("button", {
						type: "button",
						onClick: () => Fn ? y(!0) : s.current?.click(),
						className: V(se, "w-28"),
						children: [/* @__PURE__ */ b(he, { className: "size-6" }), R("run.camera")]
					}) : null,
					k && !(Fn && ur) ? /* @__PURE__ */ x("button", {
						type: "button",
						onClick: () => c.current?.click(),
						className: V(se, "w-28"),
						children: [/* @__PURE__ */ b(Rt, { className: "size-6" }), R("camera.video")]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ b("input", {
				ref: o,
				type: "file",
				hidden: !0,
				multiple: O,
				accept: D ? "image/*" : void 0,
				onChange: (e) => {
					re(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}),
			/* @__PURE__ */ b("input", {
				ref: s,
				type: "file",
				hidden: !0,
				accept: "image/*",
				capture: "environment",
				onChange: (e) => {
					re(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}),
			k ? /* @__PURE__ */ b("input", {
				ref: c,
				type: "file",
				hidden: !0,
				accept: "video/*",
				capture: "environment",
				onChange: (e) => {
					re(Array.from(e.target.files ?? [])), e.target.value = "";
				}
			}) : null,
			/* @__PURE__ */ b(dr, {
				open: v,
				multiple: O,
				video: k,
				onClose: () => y(!1),
				onCapture: (e) => re([e]),
				onNative: () => s.current?.click()
			}),
			O && (e.min || e.max) ? /* @__PURE__ */ b("div", {
				className: "mt-2 text-[0.8125rem] text-ink-3 tabular-nums",
				children: e.min && A.length < e.min ? R("run.filesMin", {
					n: A.length,
					min: e.min
				}) : e.max ? R("run.filesOf", {
					n: A.length,
					max: e.max
				}) : null
			}) : null,
			m ? /* @__PURE__ */ b("div", {
				className: "mt-2 text-[0.8125rem] text-rose",
				children: m
			}) : null
		]
	});
}
function si(e) {
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
function ci({ field: e, value: t, onChange: n }) {
	let [r, i] = _(!1);
	return /* @__PURE__ */ x("div", {
		className: "flex gap-2",
		children: [
			/* @__PURE__ */ b(_n, {
				value: t,
				placeholder: e.placeholder,
				autoCapitalize: "off",
				autoCorrect: "off",
				spellCheck: !1,
				onChange: (e) => n(e.target.value)
			}),
			/* @__PURE__ */ x("button", {
				type: "button",
				onClick: () => i(!0),
				className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-input bg-card px-3.5 font-medium text-[0.875rem] text-ink-2 transition hover:border-ember hover:text-ink",
				children: [
					/* @__PURE__ */ b(bt, { className: "size-4" }),
					" ",
					R("scan.button")
				]
			}),
			/* @__PURE__ */ b(jr, {
				open: r,
				onClose: () => i(!1),
				onResult: n
			})
		]
	});
}
var li = 4;
function ui(e) {
	let t = /* @__PURE__ */ new Map(), n = e.map((e) => ({
		value: e,
		slot: a(e)
	})).filter((e) => e.slot).sort((e, t) => Date.parse(e.value) - Date.parse(t.value));
	for (let { value: e, slot: r } of n) {
		if (!r) continue;
		let n = t.get(r.day) ?? {
			label: o(e, L),
			times: []
		};
		n.times.push({
			value: e,
			time: r.time
		}), t.set(r.day, n);
	}
	return [...t.values()];
}
function di({ name: e, label: t, options: n, value: r, onChange: i, disabled: a }) {
	let o = ui(n), s = o.findIndex((e) => e.times.some((e) => e.value === r)), [c, l] = _(s >= li);
	if (!o.length) return /* @__PURE__ */ b("p", {
		className: "text-[0.875rem] text-ink-3",
		children: R("slot.none")
	});
	let u = c ? o : o.slice(0, li);
	return /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ x("fieldset", {
			className: "flex min-w-0 flex-col gap-4",
			children: [/* @__PURE__ */ b("legend", {
				className: "sr-only",
				children: t
			}), u.map((t) => /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("div", {
				className: "mb-2 font-medium text-[0.75rem] text-ink-3",
				children: t.label
			}), /* @__PURE__ */ b("div", {
				className: "flex flex-wrap gap-2",
				children: t.times.map((n) => /* @__PURE__ */ x("label", {
					className: "relative",
					children: [/* @__PURE__ */ b("input", {
						type: "radio",
						name: `slot-${e}`,
						value: n.value,
						checked: n.value === r,
						disabled: a.has(n.value),
						"aria-label": `${t.label}, ${n.time}`,
						onChange: () => i(n.value),
						className: "peer sr-only"
					}), /* @__PURE__ */ b("span", {
						className: V("inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm tabular-nums transition coarse:h-11", "border-input bg-card text-ink-2 hover:border-ink-4 hover:text-ink", "peer-checked:border-ember peer-checked:bg-ember-tint peer-checked:text-ink", "peer-disabled:pointer-events-none peer-disabled:line-through peer-disabled:opacity-60", "peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus-line) peer-focus-visible:outline-solid"),
						children: n.time
					})]
				}, n.value))
			})] }, t.label))]
		}), o.length > u.length ? /* @__PURE__ */ b("button", {
			type: "button",
			onClick: () => l(!0),
			className: "self-start text-[0.8125rem] text-ink-3 underline-offset-4 transition hover:text-ink hover:underline coarse:min-h-11",
			children: R("slot.later")
		}) : null]
	});
}
function fi({ cards: e, value: t, multi: n, runId: r, onChange: i, disabled: a }) {
	let o = new Set(n ? Array.isArray(t) ? t.map(String) : [] : t == null || t === "" ? [] : [String(t)]), s = (e) => {
		i(n ? o.has(e) ? [...o].filter((t) => t !== e) : [...o, e] : o.has(e) ? "" : e);
	}, c = (e) => /^(https?:|data:|\/)/.test(e) ? e : on(`/api/runs/${r}/assets/${e}`);
	return /* @__PURE__ */ b("div", {
		className: "grid gap-3",
		style: { gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr))" },
		children: e.map((e) => {
			let t = o.has(e.value), n = a.has(e.value);
			return /* @__PURE__ */ x("div", {
				className: V("flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border-soft transition", t && "ring-2 ring-ember", n && "opacity-50"),
				children: [e.image ? /* @__PURE__ */ b("img", {
					src: c(e.image),
					alt: "",
					className: "aspect-square w-full object-cover"
				}) : null, /* @__PURE__ */ x("div", {
					className: "flex flex-1 flex-col gap-1 p-3",
					children: [
						/* @__PURE__ */ b("div", {
							className: "font-medium text-[0.9375rem] leading-snug",
							children: e.label
						}),
						e.subtitle ? /* @__PURE__ */ b("div", {
							className: "text-[0.8125rem] text-ink-3 leading-snug",
							children: e.subtitle
						}) : null,
						e.meta ? /* @__PURE__ */ b("div", {
							className: "mt-auto pt-1 font-display font-semibold text-[0.9375rem] tabular-nums",
							children: e.meta
						}) : null,
						/* @__PURE__ */ x("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ b("button", {
								type: "button",
								"aria-pressed": t,
								disabled: n,
								onClick: () => s(e.value),
								className: V("inline-flex h-9 flex-1 items-center justify-center rounded-full px-3 text-[0.8125rem] transition coarse:h-11", t ? "bg-ember text-ember-on" : "bg-paper-2 text-ink-2 hover:text-ink"),
								children: R(t ? "cards.picked" : "cards.pick")
							}), e.link ? /* @__PURE__ */ b("a", {
								href: e.link,
								target: "_blank",
								rel: "noopener",
								className: "inline-flex h-9 items-center rounded-full px-3 text-[0.8125rem] text-ink-2 ring-1 ring-border-soft hover:text-ink coarse:h-11",
								children: R("cards.open")
							}) : null]
						})
					]
				})]
			}, e.value);
		})
	});
}
function pi({ field: e, value: t, values: n, runId: r, view: i, onChange: a, onBusy: o, error: s, closed: c }) {
	let l = t == null ? "" : String(t), u = new Set(c?.values.map(String)), d;
	switch (e.kind) {
		case "textarea":
			d = /* @__PURE__ */ b(yn, {
				value: l,
				placeholder: e.placeholder,
				autoCapitalize: "sentences",
				enterKeyHint: "enter",
				onChange: (e) => a(e.target.value)
			});
			break;
		case "number":
			d = /* @__PURE__ */ b(_n, {
				inputMode: "decimal",
				autoComplete: "off",
				value: l,
				placeholder: e.placeholder,
				onChange: (e) => a(e.target.value)
			});
			break;
		case "select": {
			let n = e.options ?? [], o = i?.cards?.[e.id];
			d = o?.length ? /* @__PURE__ */ b(fi, {
				cards: o,
				value: t,
				multi: !1,
				runId: r,
				onChange: a,
				disabled: u
			}) : n.length <= 5 && n.every((e) => e.length <= 28) ? /* @__PURE__ */ b(xn, {
				value: l,
				options: n,
				onChange: a,
				disabled: [...u]
			}) : /* @__PURE__ */ b(bn, {
				value: l,
				placeholder: "—",
				onChange: a,
				options: n.map((e) => ({
					value: e,
					label: e,
					disabled: u.has(e)
				}))
			});
			break;
		}
		case "slot":
			d = /* @__PURE__ */ b(di, {
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
			d = n?.length ? /* @__PURE__ */ b(fi, {
				cards: n,
				value: t,
				multi: !0,
				runId: r,
				onChange: a,
				disabled: u
			}) : /* @__PURE__ */ b(xn, {
				multi: !0,
				value: Array.isArray(t) ? t : [],
				options: e.options ?? [],
				onChange: a
			});
			break;
		}
		case "date":
			d = /* @__PURE__ */ b(_n, {
				type: "date",
				value: l,
				onChange: (e) => a(e.target.value),
				className: "w-full sm:w-56"
			});
			break;
		case "email":
			d = /* @__PURE__ */ b(_n, {
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
			d = /* @__PURE__ */ b(_n, {
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
			d = /* @__PURE__ */ b(Sn, {
				checked: t === !0,
				onChange: a,
				label: e.label,
				disabled: u.has(String(t !== !0))
			});
			break;
		case "color":
			d = /* @__PURE__ */ x("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ b(vn, {
					value: l || "#e0531b",
					onChange: (e) => a(e.target.value)
				}), /* @__PURE__ */ b(_n, {
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
			d = /* @__PURE__ */ b(oi, {
				field: e,
				value: t,
				runId: r,
				onChange: a,
				onBusy: o
			});
			break;
		case "items":
			d = /* @__PURE__ */ b(ii, {
				field: e,
				value: t,
				values: n,
				onChange: a
			});
			break;
		case "connection":
			d = /* @__PURE__ */ b(Br, {
				runId: r,
				connection: i?.connections.find((t) => t.id === e.connection)
			});
			break;
		case "list": {
			let t = i?.lists.find((t) => t.def.id === e.list);
			d = t ? /* @__PURE__ */ b(Wr, {
				runId: r,
				list: t,
				editable: !0
			}) : null;
			break;
		}
		case "location":
			d = /* @__PURE__ */ b(Dr, {
				value: t,
				runId: r,
				placeholder: e.placeholder,
				onChange: a,
				onBusy: o
			});
			break;
		case "audio":
			d = c ? null : /* @__PURE__ */ b(ni, {
				value: t,
				runId: r,
				onChange: a,
				onBusy: o
			});
			break;
		case "signature":
			d = /* @__PURE__ */ b(Rr, {
				label: e.label,
				value: t,
				runId: r,
				onChange: a
			});
			break;
		default: d = e.scan ? /* @__PURE__ */ b(ci, {
			field: e,
			value: l,
			onChange: a
		}) : /* @__PURE__ */ b(_n, {
			...si(e),
			value: l,
			placeholder: e.placeholder,
			onChange: (e) => a(e.target.value)
		});
	}
	return /* @__PURE__ */ x("div", { children: [
		e.kind === "toggle" ? /* @__PURE__ */ x("div", {
			className: "flex items-start justify-between gap-6",
			children: [/* @__PURE__ */ b(Cn, {
				hint: e.help,
				children: e.label
			}), d]
		}) : /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ b(Cn, {
			hint: e.help,
			required: e.required,
			children: e.label
		}), d] }),
		c ? /* @__PURE__ */ b("div", {
			className: "mt-1.5 text-[0.8125rem] text-ink-3",
			children: R("run.closed", { list: c.classes.map((e) => R(`run.cls.${mi(e)}`)).join(", ") })
		}) : null,
		s ? /* @__PURE__ */ b("div", {
			className: "mt-1.5 text-[0.8125rem] text-rose",
			children: s
		}) : null
	] });
}
function mi(e) {
	return e in hi ? hi[e] : e === "account" ? "account" : "text";
}
var hi = {
	classifier: "text",
	standard: "text",
	high: "text",
	highest: "text",
	image: "image",
	video: "video",
	speech: "speech",
	audio: "audio"
};
//#endregion
//#region ../../node_modules/.pnpm/dompurify@3.4.16/node_modules/dompurify/dist/purify.es.mjs
function gi(e, t) {
	this.v = e, this.k = t;
}
function _i(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function vi(e) {
	if (Array.isArray(e)) return e;
}
function yi(e, t) {
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
function bi() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function xi(e, t) {
	return vi(e) || yi(e, t) || Si(e, t) || bi();
}
function Si(e, t) {
	if (e) {
		if (typeof e == "string") return _i(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _i(e, t) : void 0;
	}
}
function Ci(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof gi;
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
Ci.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, Ci.prototype.next = function(e) {
	return this._invoke("next", e);
}, Ci.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, Ci.prototype.return = function(e) {
	return this._invoke("return", e);
};
var wi = Object.entries, Ti = Object.setPrototypeOf, Ei = Object.isFrozen, Di = Object.getPrototypeOf, Oi = Object.getOwnPropertyDescriptor, U = Object.freeze, W = Object.seal, ki = Object.create, Ai = typeof Reflect < "u" && Reflect, ji = Ai.apply, Mi = Ai.construct;
U ||= function(e) {
	return e;
}, W ||= function(e) {
	return e;
}, ji ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Mi ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Ni = q(Array.prototype.forEach);
Array.prototype.indexOf;
var Pi = q(Array.prototype.lastIndexOf), Fi = q(Array.prototype.pop), Ii = q(Array.prototype.push);
Array.prototype.slice;
var Li = q(Array.prototype.splice), Ri = Array.isArray, zi = q(String.prototype.toLowerCase), Bi = q(String.prototype.toString), Vi = q(String.prototype.match), Hi = q(String.prototype.replace), Ui = q(String.prototype.indexOf), Wi = q(String.prototype.trim), Gi = q(Number.prototype.toString), Ki = q(Boolean.prototype.toString), qi = typeof BigInt > "u" ? null : q(BigInt.prototype.toString), Ji = typeof Symbol > "u" ? null : q(Symbol.prototype.toString), G = q(Object.prototype.hasOwnProperty), Yi = q(Object.prototype.toString), K = q(RegExp.prototype.test), Xi = Zi(TypeError);
function q(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return ji(e, t, n);
	};
}
function Zi(e) {
	return function() {
		return Mi(e, [...arguments]);
	};
}
function J(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : zi;
	if (Ti && Ti(e, null), !Ri(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Ei(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Qi(e) {
	for (let t = 0; t < e.length; t++) G(e, t) || (e[t] = null);
	return e;
}
function Y(e) {
	let t = ki(null);
	for (let r of wi(e)) {
		var n = xi(r, 2);
		let i = n[0], a = n[1];
		G(e, i) && (t[i] = Ri(a) ? Qi(a) : a && typeof a == "object" && a.constructor === Object ? Y(a) : a);
	}
	return t;
}
function $i(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Gi(e);
		case "boolean": return Ki(e);
		case "bigint": return qi ? qi(e) : "0";
		case "symbol": return Ji ? Ji(e) : "Symbol()";
		case "undefined": return Yi(e);
		case "function":
		case "object": {
			if (e === null) return Yi(e);
			let t = e, n = ea(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Yi(e);
			}
			return Yi(e);
		}
		default: return Yi(e);
	}
}
function ea(e, t) {
	for (; e !== null;) {
		let n = Oi(e, t);
		if (n) {
			if (n.get) return q(n.get);
			if (typeof n.value == "function") return q(n.value);
		}
		e = Di(e);
	}
	function n() {
		return null;
	}
	return n;
}
function ta(e) {
	try {
		return K(e, ""), !0;
	} catch {
		return !1;
	}
}
var na = U(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), ra = U(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), ia = U([
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
]), aa = U([
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
]), oa = U(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), sa = U([
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
]), ca = U(["#text"]), la = U(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), ua = U(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), da = U(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), fa = U([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), pa = W(/{{[\w\W]*|^[\w\W]*}}/g), ma = W(/<%[\w\W]*|^[\w\W]*%>/g), ha = W(/\${[\w\W]*/g), ga = W(/^data-[\-\w.\u00B7-\uFFFF]+$/), _a = W(/^aria-[\-\w]+$/), va = W(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), ya = W(/^(?:\w+script|data):/i), ba = W(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), xa = W(/^html$/i), Sa = W(/^[a-z][.\w]*(-[.\w]+)+$/i), Ca = W(/<[/\w!]/g), wa = W(/<[/\w]/g), Ta = W(/<\/no(script|embed|frames)/i), Ea = W(/\/>/i), Da = {
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
}, Oa = [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
], ka = U(J({}, Oa)), Aa = function() {
	let e = {};
	return Ni(Oa, (t) => {
		e[t] = W(RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
	}), U(e);
}(), ja = function() {
	return typeof window > "u" ? null : window;
}, Ma = function(e, t) {
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
}, Na = function() {
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
}, Pa = function(e, t, n, r) {
	return G(e, t) && Ri(e[t]) ? J(r.base ? Y(r.base) : {}, e[t], r.transform) : n;
}, Fa = function(e, t, n) {
	let r = G(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? Y(r) : n();
};
function Ia() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ja(), t = (e) => Ia(e);
	if (t.version = "3.4.16", t.removed = [], !e || !e.document || e.document.nodeType !== Da.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = ea(d, "cloneNode"), p = ea(d, "remove"), m = ea(d, "removeAttributeNode"), h = ea(d, "nextSibling"), g = ea(d, "childNodes"), _ = ea(d, "parentNode"), v = ea(d, "shadowRoot"), y = ea(d, "attributes"), b = o && o.prototype ? ea(o.prototype, "nodeType") : null, x = o && o.prototype ? ea(o.prototype, "nodeName") : null, S = o && o.prototype ? ea(o.prototype, "ownerDocument") : null, C = function(e) {
		return b ? b(e) : e.nodeType;
	}, ee = function(e) {
		return x ? x(e) : e.nodeName;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let w, T = "", E, D = !1, O = 0, te = function() {
		if (O > 0) throw Xi("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, ne = function(e) {
		te(), O++;
		try {
			return w.createHTML(e);
		} finally {
			O--;
		}
	}, k = function(e) {
		te(), O++;
		try {
			return w.createScriptURL(e);
		} finally {
			O--;
		}
	}, A = function() {
		return D ||= (E = Ma(u, i), !0), E;
	}, j = n, M = j.implementation, re = j.createNodeIterator, ie = j.createDocumentFragment, ae = j.getElementsByTagName, oe = r.importNode, N = Na();
	t.isSupported = typeof wi == "function" && typeof _ == "function" && M && M.createHTMLDocument !== void 0;
	let se = pa, ce = ma, le = ha, ue = ga, de = _a, fe = ya, pe = ba, me = Sa, he = va, P = null, ge = J({}, [
		...na,
		...ra,
		...ia,
		...oa,
		...ca
	]), F = null, _e = J({}, [
		...la,
		...ua,
		...da,
		...fa
	]), ve = Object.seal(ki(null, {
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
	})), ye = null, be = null, xe = Object.seal(ki(null, {
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
	})), Se = !0, Ce = !0, we = !1, Te = !0, Ee = !1, De = !0, Oe = !1, ke = !1, Ae = null, je = null, Me = !1, Ne = !1, Pe = !1, Fe = !1, Ie = !0, Le = !1, Re = "user-content-", ze = !0, Be = !1, Ve = {}, He = null, Ue = J({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), We = null, Ge = J({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Ke = null, qe = J({}, [
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
	]), Je = "http://www.w3.org/1998/Math/MathML", Ye = "http://www.w3.org/2000/svg", Xe = "http://www.w3.org/1999/xhtml", Ze = Xe, Qe = !1, $e = null, et = J({}, [
		Je,
		Ye,
		Xe
	], Bi), tt = U([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), nt = J({}, tt), rt = U(["annotation-xml"]), it = J({}, rt), at = J({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), ot = null, st = ["application/xhtml+xml", "text/html"], I = null, ct = null, lt = n.createElement("form"), ut = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, dt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (ct && ct === e) return;
		(!e || typeof e != "object") && (e = {}), e = Y(e), ot = st.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, I = ot === "application/xhtml+xml" ? Bi : zi, P = Pa(e, "ALLOWED_TAGS", ge, { transform: I }), F = Pa(e, "ALLOWED_ATTR", _e, { transform: I }), $e = Pa(e, "ALLOWED_NAMESPACES", et, { transform: Bi }), Ke = Pa(e, "ADD_URI_SAFE_ATTR", qe, {
			transform: I,
			base: qe
		}), We = Pa(e, "ADD_DATA_URI_TAGS", Ge, {
			transform: I,
			base: Ge
		}), He = Pa(e, "FORBID_CONTENTS", Ue, { transform: I }), ye = Pa(e, "FORBID_TAGS", Y({}), { transform: I }), be = Pa(e, "FORBID_ATTR", Y({}), { transform: I }), Ve = G(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? Y(e.USE_PROFILES) : e.USE_PROFILES : !1, Se = e.ALLOW_ARIA_ATTR !== !1, Ce = e.ALLOW_DATA_ATTR !== !1, we = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Te = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ee = e.SAFE_FOR_TEMPLATES || !1, De = e.SAFE_FOR_XML !== !1, Oe = e.WHOLE_DOCUMENT || !1, Ne = e.RETURN_DOM || !1, Pe = e.RETURN_DOM_FRAGMENT || !1, Fe = e.RETURN_TRUSTED_TYPE || !1, Me = e.FORCE_BODY || !1, Ie = e.SANITIZE_DOM !== !1, Le = e.SANITIZE_NAMED_PROPS || !1, ze = e.KEEP_CONTENT !== !1, Be = e.IN_PLACE || !1, he = ta(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : va, Ze = typeof e.NAMESPACE == "string" ? e.NAMESPACE : Xe, nt = Fa(e, "MATHML_TEXT_INTEGRATION_POINTS", () => J({}, tt)), it = Fa(e, "HTML_INTEGRATION_POINTS", () => J({}, rt));
		let t = Fa(e, "CUSTOM_ELEMENT_HANDLING", () => ki(null));
		if (ve = ki(null), G(t, "tagNameCheck") && ut(t.tagNameCheck) && (ve.tagNameCheck = t.tagNameCheck), G(t, "attributeNameCheck") && ut(t.attributeNameCheck) && (ve.attributeNameCheck = t.attributeNameCheck), G(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (ve.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), W(ve), Ee && (Ce = !1), Pe && (Ne = !0), Ve && (P = J({}, ca), F = ki(null), Ve.html === !0 && (J(P, na), J(F, la)), Ve.svg === !0 && (J(P, ra), J(F, ua), J(F, fa)), Ve.svgFilters === !0 && (J(P, ia), J(F, ua), J(F, fa)), Ve.mathMl === !0 && (J(P, oa), J(F, da), J(F, fa))), xe.tagCheck = null, xe.attributeCheck = null, G(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? xe.tagCheck = e.ADD_TAGS : Ri(e.ADD_TAGS) && (P === ge && (P = Y(P)), J(P, e.ADD_TAGS, I))), G(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? xe.attributeCheck = e.ADD_ATTR : Ri(e.ADD_ATTR) && (F === _e && (F = Y(F)), J(F, e.ADD_ATTR, I))), G(e, "ADD_FORBID_CONTENTS") && Ri(e.ADD_FORBID_CONTENTS) && (He === Ue && (He = Y(He)), J(He, e.ADD_FORBID_CONTENTS, I)), ze && (P["#text"] = !0), Oe && J(P, [
			"html",
			"head",
			"body"
		]), P.table && (J(P, ["tbody"]), delete ye.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw Xi("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw Xi("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = w;
			w = e.TRUSTED_TYPES_POLICY;
			try {
				T = ne("");
			} catch (e) {
				throw w = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (w = void 0, T = "") : (w === void 0 && (w = A()), w && typeof T == "string" && (T = ne("")));
		U && U(e), ct = e;
	}, ft = J({}, [
		...ra,
		...ia,
		...aa
	]), pt = J({}, [...oa, ...sa]), mt = function(e, t, n) {
		return t.namespaceURI === Xe ? e === "svg" : t.namespaceURI === Je ? e === "svg" && (n === "annotation-xml" || nt[n]) : !!ft[e];
	}, ht = function(e, t, n) {
		return t.namespaceURI === Xe ? e === "math" : t.namespaceURI === Ye ? e === "math" && it[n] : !!pt[e];
	}, gt = function(e, t, n) {
		return t.namespaceURI === Ye && !it[n] || t.namespaceURI === Je && !nt[n] ? !1 : !pt[e] && (at[e] || !ft[e]);
	}, _t = function(e) {
		let t = _(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ze,
			tagName: "template"
		});
		let n = zi(e.tagName), r = zi(t.tagName);
		return $e[e.namespaceURI] ? e.namespaceURI === Ye ? mt(n, t, r) : e.namespaceURI === Je ? ht(n, t, r) : e.namespaceURI === Xe ? gt(n, t, r) : !!(ot === "application/xhtml+xml" && $e[e.namespaceURI]) : !1;
	}, vt = function(e) {
		Ii(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw Xi("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, yt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, bt = function(e) {
		Ct(e);
		let t = g(e);
		if (t) {
			let e = [];
			Ni(t, (t) => {
				Ii(e, t);
			}), Ni(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = y(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && yt(e, r, i);
		}
	}, xt = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Ii(t.removed, {
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
			if (Ne || Pe) try {
				vt(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, St = function(e) {
		let t = y(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || F[I(i)] || yt(e, r, i);
		}
	}, Ct = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			C(e) === Da.element && St(e);
			let n = g(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, wt = function(e, t) {
		return De ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Tt = function(e) {
		if (!De) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = C(e);
			if (n === Da.processingInstruction || n === Da.comment && K(wa, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === Da.element) {
				let t = e, n = I(ee(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && wt("for", n) && t.removeAttribute("for");
				} catch {}
			}
			let r = g(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, Et = function(e) {
		let t = null, r = null;
		if (Me) e = "<remove></remove>" + e;
		else {
			let t = Vi(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		ot === "application/xhtml+xml" && Ze === Xe && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = w ? ne(e) : e;
		if (Ze === Xe) try {
			t = new l().parseFromString(i, ot);
		} catch {}
		if (!t || !t.documentElement) {
			t = M.createDocument(Ze, "template", null);
			try {
				t.documentElement.innerHTML = Qe ? T : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ze === Xe ? ae.call(t, Oe ? "html" : "body")[0] : Oe ? t.documentElement : a;
	}, Dt = function(e) {
		let t = S ? S(e) : e.ownerDocument;
		return re.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Ot = function(e) {
		return e = Hi(e, se, " "), e = Hi(e, ce, " "), e = Hi(e, le, " "), e;
	}, kt = function(e) {
		e.normalize();
		let t = S ? S(e) : e.ownerDocument, n = re.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Ot(r.data), r = n.nextNode();
		let i = e.querySelectorAll?.call(e, "template");
		i && Ni(i, (e) => {
			jt(e.content) && kt(e.content);
		});
	}, At = function(e) {
		let t = x ? x(e) : null;
		return typeof t != "string" || I(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== y(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== b(e) || e.childNodes !== g(e);
	}, jt = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return b(e) === Da.documentFragment;
		} catch {
			return !1;
		}
	}, Mt = function(e) {
		if (!b || typeof e != "object" || !e) return !1;
		try {
			return typeof b(e) == "number";
		} catch {
			return !1;
		}
	};
	function Nt(e, n, r) {
		e.length !== 0 && Ni(e, (e) => {
			e.call(t, n, r, ct);
		});
	}
	let Pt = function(e, t) {
		return !!(De && e.hasChildNodes() && !Mt(e.firstElementChild) && K(Ca, e.textContent) && K(Ca, e.innerHTML) || De && e.namespaceURI === Xe && ka[t] && (Mt(e.firstElementChild) || typeof e.textContent == "string" && K(Aa[t], e.textContent)) || e.nodeType === Da.processingInstruction || De && e.nodeType === Da.comment && K(wa, e.data));
	}, Ft = function(e, t) {
		return e instanceof RegExp ? K(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, It = function(e, t, n) {
		if (!ye[t] && Ht(t) && Ft(ve.tagNameCheck, t)) return !1;
		if (ze && !He[t]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return vt(e), !0;
	}, Lt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? Y(t) : t;
	}, Rt = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Be && Ct(e), !0);
	}, zt = function(e, n) {
		if (Nt(N.beforeSanitizeElements, e, null), Rt(e, n)) return !0;
		if (At(e)) return vt(e), !0;
		let r = I(ee(e));
		if (P = Lt(N.uponSanitizeElement, P, ge, Ae), Nt(N.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: P
		}), Rt(e, n)) return !0;
		if (Pt(e, r)) return vt(e), !0;
		if (ye[r] || !(xe.tagCheck instanceof Function && xe.tagCheck(r)) && !P[r]) {
			let t = It(e, r, n);
			return t === !1 && (Nt(N.afterSanitizeElements, e, null), Rt(e, n)) ? !0 : t;
		}
		if (C(e) === Da.element && !_t(e) || (r === "noscript" || r === "noembed" || r === "noframes") && K(Ta, e.innerHTML)) return vt(e), !0;
		if (Ee && e.nodeType === Da.text) {
			let n = Ot(e.textContent);
			e.textContent !== n && (Ii(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return Nt(N.afterSanitizeElements, e, null), Rt(e, n);
	}, Bt = function(e, t, r) {
		if (be[t] || wt(t, e) || Ie && (t === "id" || t === "name") && (r in n || r in lt)) return !1;
		let i = F[t] || xe.attributeCheck instanceof Function && xe.attributeCheck(t, e);
		return Ce && K(ue, t) || Se && K(de, t) ? !0 : i ? Ke[t] || K(he, Hi(r, pe, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Ui(r, "data:") === 0 && We[e] || we && !K(fe, Hi(r, pe, "")) ? !0 : !r : Ht(e) && Ft(ve.tagNameCheck, e) && Ft(ve.attributeNameCheck, t, e) || t === "is" && ve.allowCustomizedBuiltInElements && Ft(ve.tagNameCheck, r);
	}, Vt = J({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Ht = function(e) {
		return !Vt[zi(e)] && K(me, e);
	}, Ut = function(e, t, n, r) {
		if (w && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return ne(r);
			case "TrustedScriptURL": return k(r);
		}
		return r;
	}, Wt = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !At(e) || (vt(e), !1);
		} catch {
			return xt(t, e), !1;
		}
	}, Gt = function(e, n) {
		if (Nt(N.beforeSanitizeAttributes, e, null), Rt(e, n)) return;
		let r = e.attributes;
		if (!r || At(e)) return;
		F = Lt(N.uponSanitizeAttribute, F, _e, je);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: F,
			forceKeepAttr: void 0
		}, a = r.length, o = I(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = I(s), d = l, f = s === "value" ? d : Wi(d), p = !1;
			if (i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, Nt(N.uponSanitizeAttribute, e, i), f = i.attrValue, Le && (u === "id" || u === "name") && Ui(f, Re) !== 0 && (xt(s, e, n), f = Re + f, p = !0), De && K(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, f)) {
				xt(s, e, n);
				continue;
			}
			if (u === "attributename" && Vi(f, "href")) {
				xt(s, e, n);
				continue;
			}
			if (!i.forceKeepAttr) {
				if (!i.keepAttr) {
					xt(s, e, n);
					continue;
				}
				if (!Te && K(Ea, f)) {
					xt(s, e, n);
					continue;
				}
				if (Ee && (f = Ot(f)), !Bt(o, u, f)) {
					xt(s, e, n);
					continue;
				}
				f = Ut(o, u, c, f), f !== d && Wt(e, s, c, f) && p && Fi(t.removed);
			}
		}
		Nt(N.afterSanitizeAttributes, e, null), Rt(e, n);
	}, L = function(e) {
		let t = null, n = Dt(e);
		for (Nt(N.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (Nt(N.uponSanitizeShadowNode, t, null), zt(t, e), Gt(t, e), jt(t.content) && L(t.content), C(t) === Da.element) {
			let e = v(t);
			jt(e) && (Kt(e), L(e));
		}
		Nt(N.afterSanitizeShadowDOM, e, null);
	}, Kt = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				L(e.shadow);
				continue;
			}
			let n = e.node, r = C(n) === Da.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = x ? x(n) : null;
				if (typeof e == "string" && I(e) === "template") {
					let e = n.content;
					jt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = v(n);
				jt(e) && t.push({
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
		if (Qe = !e, Qe && (e = "<!-->"), typeof e != "string" && !Mt(e) && (e = $i(e), typeof e != "string")) throw Xi("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		ke ? (P = Ae, F = je) : dt(n), (N.uponSanitizeElement.length > 0 || N.uponSanitizeAttribute.length > 0) && (P = Y(P)), N.uponSanitizeAttribute.length > 0 && (F = Y(F)), t.removed = [];
		let c = Be && typeof e != "string" && Mt(e);
		if (c) {
			Tt(e);
			let t = ee(e);
			if (typeof t == "string") {
				let n = I(t);
				if (!P[n] || ye[n]) throw bt(e), Xi("root node is forbidden and cannot be sanitized in-place");
			}
			if (At(e)) throw bt(e), Xi("root node is clobbered and cannot be sanitized in-place");
			try {
				Kt(e);
			} catch (t) {
				throw bt(e), t;
			}
		} else if (Mt(e)) i = Et("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === Da.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Kt(i);
		else {
			if (!Ne && !Ee && !Oe && e.indexOf("<") === -1) return w && Fe ? ne(e) : e;
			if (i = Et(e), !i) return Ne ? null : Fe ? T : "";
		}
		i && Me && vt(i.firstChild);
		let l = c ? e : i;
		try {
			let e = Dt(l);
			for (; o = e.nextNode();) zt(o, l), Gt(o, l), jt(o.content) && L(o.content);
		} catch (n) {
			throw c && (bt(e), Ni(t.removed, (e) => {
				e.element && Ct(e.element);
			})), n;
		}
		if (c) {
			let n = !1;
			if (Ni(t.removed, (t) => {
				t.element && (t.element === e && (n = !0), Ct(t.element));
			}), n) throw Xi("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Ee && kt(e), e;
		}
		if (Ne) {
			if (Ee && kt(i), Pe) for (s = ie.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (F.shadowroot || F.shadowrootmode) && (s = oe.call(r, s, !0)), s;
		}
		let u = Oe ? i.outerHTML : i.innerHTML;
		return Oe && P["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && K(xa, i.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u), Ee && (u = Ot(u)), w && Fe ? ne(u) : u;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		dt(e), ke = !0, Ae = P, je = F;
	}, t.clearConfig = function() {
		ct = null, ke = !1, Ae = null, je = null, w = E, T = "";
	}, t.isValidAttribute = function(e, t, n) {
		ct || dt({});
		let r = I(e), i = I(t);
		return Bt(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && G(N, e) && Ii(N[e], t);
	}, t.removeHook = function(e, t) {
		if (G(N, e)) {
			if (t !== void 0) {
				let n = Pi(N[e], t);
				return n === -1 ? void 0 : Li(N[e], n, 1)[0];
			}
			return Fi(N[e]);
		}
	}, t.removeHooks = function(e) {
		G(N, e) && (N[e] = []);
	}, t.removeAllHooks = function() {
		N = Na();
	}, t;
}
var La = Ia();
//#endregion
//#region ../../node_modules/.pnpm/marked@18.0.14/node_modules/marked/lib/marked.esm.js
function Ra() {
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
var za = Ra();
function Ba(e) {
	za = e;
}
var Va = { exec: () => null };
function Ha(e) {
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
var Ua = ((e = "") => {
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
	nextBulletRegex: Ha((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: Ha((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: Ha((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: Ha((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: Ha((e) => RegExp(`^ {0,${e}}(?:</?(?:${io})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")),
	blockquoteBeginRegex: Ha((e) => RegExp(`^ {0,${e}}>`))
}, Wa = /^(?:[ \t]*(?:\n|$))+/, Ga = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ka = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, qa = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ja = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Ya = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Xa = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Za = X(Xa).replace(/bull/g, Ya).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Qa = X(Xa).replace(/bull/g, Ya).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), $a = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, eo = /^[^\n]+/, to = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, no = X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", to).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ro = X(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Ya).getRegex(), io = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ao = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, oo = X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ao).replace("tag", io).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), so = (e) => X($a).replace("hr", qa).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", io).getRegex(), co = so(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), lo = so(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), uo = {
	blockquote: X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", lo).getRegex(),
	code: Ga,
	def: no,
	fences: Ka,
	heading: Ja,
	hr: qa,
	html: oo,
	lheading: Za,
	list: ro,
	newline: Wa,
	paragraph: co,
	table: Va,
	text: eo
}, fo = X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", qa).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", io).getRegex(), po = {
	...uo,
	lheading: Qa,
	table: fo,
	paragraph: X($a).replace("hr", qa).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", fo).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", io).getRegex()
}, mo = {
	...uo,
	html: X("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", ao).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Va,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: X($a).replace("hr", qa).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Za).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ho = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, go = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _o = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, vo = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, yo = /[\p{P}\p{S}]/u, bo = /[\s\p{P}\p{S}]/u, xo = /[^\s\p{P}\p{S}]/u, So = X(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, bo).getRegex(), Co = /[\p{Pi}\p{Ps}"']/u, wo = /(?!~)[\p{P}\p{S}]/u, To = /(?!~)[\s\p{P}\p{S}]/u, Eo = /(?:[^\s\p{P}\p{S}]|~)/u, Do = X(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Ua ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Oo = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, ko = X(Oo, "u").replace(/punct/g, yo).getRegex(), Ao = X(Oo, "u").replace(/punct/g, wo).getRegex(), jo = X(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Co).replace(/punct/g, yo).getRegex(), Mo = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", No = X(Mo, "gu").replace(/notPunctSpace/g, xo).replace(/punctSpace/g, bo).replace(/punct/g, yo).getRegex(), Po = X(Mo, "gu").replace(/notPunctSpace/g, Eo).replace(/punctSpace/g, To).replace(/punct/g, wo).getRegex(), Fo = X("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, xo).replace(/punctSpace/g, bo).replace(/punct/g, yo).getRegex(), Io = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, xo).replace(/punctSpace/g, bo).replace(/punct/g, yo).getRegex(), Lo = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, xo).replace(/punctSpace/g, bo).replace(/punct/g, yo).getRegex(), Ro = X(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, yo).getRegex(), zo = X("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, xo).replace(/punctSpace/g, bo).replace(/punct/g, yo).getRegex(), Bo = X(/\\(punct)/, "gu").replace(/punct/g, yo).getRegex(), Vo = X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ho = X(ao).replace("(?:-->|$)", "-->").getRegex(), Uo = X("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ho).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Wo = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, Go = X(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Wo).getRegex(), Ko = X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", Go).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), qo = X(/^!?\[(label)\]\[(ref)\]/).replace("label", Go).replace("ref", to).getRegex(), Jo = X(/^!?\[(ref)\](?:\[\])?/).replace("ref", to).getRegex(), Yo = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Xo = X(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Wo).getRegex(), Zo = X("reflink|nolink(?!\\()", "g").replace("reflink", X(/^!?\[(label)\]\[(ref)\]/).replace("label", Xo).replace("ref", Yo).getRegex()).replace("nolink", X(/^!?\[(ref)\](?:\[\])?/).replace("ref", Yo).getRegex()).getRegex(), Qo = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, $o = X(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), es = {
	_backpedal: Va,
	anyPunctuation: Bo,
	autolink: Vo,
	blockSkip: Do,
	br: _o,
	code: go,
	del: Va,
	delLDelim: Va,
	delRDelim: Va,
	emStrongLDelim: ko,
	emStrongRDelimAst: No,
	emStrongRDelimUnd: Io,
	escape: ho,
	link: Ko,
	nolink: Jo,
	punctuation: So,
	reflink: qo,
	reflinkSearch: Zo,
	tag: Uo,
	text: vo,
	url: Va
}, ts = {
	...es,
	emStrongLDelim: jo,
	emStrongRDelimAst: Fo,
	emStrongRDelimUnd: Lo,
	link: X(/^!?\[(label)\]\((.*?)\)/).replace("label", Go).getRegex(),
	reflink: X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Go).getRegex()
}, ns = {
	...es,
	emStrongRDelimAst: Po,
	emStrongLDelim: Ao,
	delLDelim: Ro,
	delRDelim: zo,
	url: X(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", $o).replace("protocol", Qo).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: X(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Qo).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
}, rs = {
	...ns,
	br: X(_o).replace("{2,}", "*").getRegex(),
	text: X(ns.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, is = {
	normal: uo,
	gfm: po,
	pedantic: mo
}, as = {
	normal: es,
	gfm: ns,
	breaks: rs,
	pedantic: ts
}, os = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, ss = (e) => os[e];
function cs(e, t) {
	if (t) {
		if (Z.escapeTest.test(e)) return e.replace(Z.escapeReplace, ss);
	} else if (Z.escapeTestNoEncode.test(e)) return e.replace(Z.escapeReplaceNoEncode, ss);
	return e;
}
function ls(e) {
	return e.replace(Z.numericCharacterReference, (e, t, n) => {
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : String.fromCodePoint(r);
	});
}
function us(e) {
	try {
		e = encodeURI(e).replace(Z.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function ds(e, t) {
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
function fs(e, t, n) {
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
function ps(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && Z.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function ms(e) {
	return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function hs(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function gs(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function _s(e, t, n, r, i) {
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
function vs(e, t, n) {
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
function ys(e, t, n, r) {
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
var bs = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || za;
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
			let e = this.options.pedantic ? t[0] : ps(t[0]);
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
			let e = t[0], n = vs(e, t[3] || "", this.rules);
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
				let t = fs(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: fs(t[0], "\n"),
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
			raw: fs(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = fs(t[0], "\n").split("\n"), n = "", r = "", i = [];
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
				let c = t[2].split("\n", 1)[0], l = t[1].length, u = this.options.pedantic ? gs(c, l) : c.replace(this.rules.other.leadingSpaceTab, (e) => gs(e, l)), d = e.split("\n", 1)[0], f = !u.trim(), p = 0;
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
			let e = ps(t[0]);
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
			let e = ms(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: fs(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = ds(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: fs(t[0], "\n"),
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
			for (let e of i) a.rows.push(ds(e, a.header.length).map((e, t) => ({
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
				raw: fs(t[0], "\n"),
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
			if (!this.options.pedantic && ys(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = fs(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = hs(t[2], "()");
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
			return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? i.slice(1) : i.slice(1, -1)), _s(t, {
				href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
				title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && ys(e, n[1], r, this.rules)) return;
			let i = t[ms((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return _s(n, i, n[0], this.lexer, this.rules);
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
				text: e ? t[0] : ls(t[0]),
				escaped: e
			};
		}
	}
}, xs = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || za, this.options.tokenizer = this.options.tokenizer || new bs(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			top: !0
		};
		let t = {
			other: Z,
			block: is.normal,
			inline: as.normal
		};
		this.options.pedantic ? (t.block = is.pedantic, t.inline = as.pedantic) : this.options.gfm && (t.block = is.gfm, t.inline = this.options.breaks ? as.breaks : as.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: is,
			inline: as
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
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, ms(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let e = this.tokenizer.rules.inline.reflinkSearch, t = (n) => {
				let r = n.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, ms(n.slice(r + 1, -1)))) return n;
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
}, Ss = class {
	options;
	parser;
	constructor(e) {
		this.options = e || za;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(Z.notSpaceStart)?.[0], i = e ? e.replace(Z.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + cs(r) + "\">" + (n ? i : cs(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : cs(i, !0)) + "</code></pre>\n";
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
		return `<code>${cs(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? cs(n, !0) : this.parser.parseInline(r), o = us(e);
		if (o === null) return a;
		e = cs(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + cs(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = us(e);
		if (i === null) return cs(n);
		e = i;
		let a = `<img src="${cs(e)}" alt="${cs(n)}"`;
		return t && (a += ` title="${cs(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : cs(e.text);
	}
}, Cs = class {
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
}, ws = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || za, this.options.renderer = this.options.renderer || new Ss(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Cs();
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
}, Ts = class {
	options;
	block;
	constructor(e) {
		this.options = e || za;
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
		return e ? xs.lex : xs.lexInline;
	}
	provideParser(e = this.block) {
		return e ? ws.parse : ws.parseInline;
	}
}, Es = new class {
	defaults = Ra();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = ws;
	Renderer = Ss;
	TextRenderer = Cs;
	Lexer = xs;
	Tokenizer = bs;
	Hooks = Ts;
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
				let t = this.defaults.renderer || new Ss(this.defaults);
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
				let t = this.defaults.tokenizer || new bs(this.defaults);
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
				let t = this.defaults.hooks || new Ts();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = Ts.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && Ts.passThroughHooksRespectAsync.has(n)) return (async () => {
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
		return xs.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return ws.parse(e, t ?? this.defaults);
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
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? xs.lex : xs.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? ws.parse : ws.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? xs.lex : xs.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? ws.parse : ws.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + cs(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Q(e, t) {
	return Es.parse(e, t);
}
Q.options = Q.setOptions = function(e) {
	return Es.setOptions(e), Q.defaults = Es.defaults, Ba(Q.defaults), Q;
}, Q.getDefaults = Ra, Q.defaults = za;
function Ds(...e) {
	return Es.use(...e), Q.defaults = Es.defaults, Ba(Q.defaults), Q;
}
Q.use = Ds, Q.walkTokens = function(e, t) {
	return Es.walkTokens(e, t);
}, Q.parseInline = Es.parseInline, Q.Parser = ws, Q.parser = ws.parse, Q.Renderer = Ss, Q.TextRenderer = Cs, Q.Lexer = xs, Q.lexer = xs.lex, Q.Tokenizer = bs, Q.Hooks = Ts, Q.parse = Q, Q.options, Q.setOptions, Q.walkTokens, Q.parseInline, ws.parse, xs.lex;
//#endregion
//#region src/pdf.ts
var Os = "#282623", ks = "#81807e", As = "#1a5fb4", js = "#dbd9d6", Ms = 483.28, Ns = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	"#39": "'",
	nbsp: "\xA0"
};
function Ps(e) {
	return e.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? Number.parseInt(t.slice(2), 16) : Number(t.slice(1));
			return Number.isFinite(n) ? String.fromCodePoint(n) : e;
		}
		return Ns[t.toLowerCase()] ?? e;
	});
}
function Fs(e) {
	return Ps(e.replace(/<[^>]+>/g, "")).trim();
}
function Is(e, t = {}) {
	let n = [];
	for (let r of e ?? []) switch (r.type) {
		case "text": {
			let e = r.tokens;
			e?.length ? n.push(...Is(e, t)) : n.push({
				...t,
				text: Ps(r.text)
			});
			break;
		}
		case "escape":
			n.push({
				...t,
				text: Ps(r.text)
			});
			break;
		case "strong":
			n.push(...Is(r.tokens, {
				...t,
				bold: !0
			}));
			break;
		case "em":
			n.push(...Is(r.tokens, {
				...t,
				italics: !0
			}));
			break;
		case "del":
			n.push(...Is(r.tokens, {
				...t,
				decoration: "lineThrough"
			}));
			break;
		case "codespan":
			n.push({
				...t,
				text: Ps(r.text),
				color: "#3d3b38"
			});
			break;
		case "link": {
			let e = r;
			n.push(...Is(e.tokens, {
				...t,
				link: e.href,
				color: As,
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
				text: Fs(r.text)
			});
			break;
		default: "tokens" in r && Array.isArray(r.tokens) ? n.push(...Is(r.tokens, t)) : "text" in r && typeof r.text == "string" && n.push({
			...t,
			text: Ps(r.text)
		});
	}
	return n;
}
function Ls(e) {
	let t = Bs(e);
	if (t.length === 1 && typeof t[0] == "object" && "style" in t[0]) {
		let { style: e, ...n } = t[0];
		return n;
	}
	return t.length === 1 ? t[0] : { stack: t };
}
function Rs(e, t) {
	return {
		text: Is(e.tokens),
		alignment: e.align ?? "left",
		...t ? { style: "th" } : {}
	};
}
var zs = {
	hLineWidth: () => .5,
	vLineWidth: () => 0,
	hLineColor: () => js,
	paddingTop: () => 4,
	paddingBottom: () => 4
};
function Bs(e) {
	let t = [];
	for (let n of e) switch (n.type) {
		case "space": break;
		case "heading": {
			let e = n.depth;
			t.push({
				text: Is(n.tokens),
				style: e <= 1 ? "h1" : e === 2 ? "h2" : "h3"
			});
			break;
		}
		case "paragraph":
			t.push({
				text: Is(n.tokens),
				style: "p"
			});
			break;
		case "text":
			t.push({
				text: Is([n]),
				style: "p"
			});
			break;
		case "list": {
			let e = n, r = e.items.map((e) => Ls(e.tokens));
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
					body: [e.header.map((e) => Rs(e, !0)), ...e.rows.map((e) => e.map((e) => Rs(e, !1)))]
				},
				layout: zs,
				style: "table"
			});
			break;
		}
		case "code":
			t.push({
				text: Ps(n.text),
				style: "code",
				preserveLeadingSpaces: !0
			});
			break;
		case "blockquote":
			t.push({
				stack: Bs(n.tokens),
				style: "quote"
			});
			break;
		case "hr":
			t.push({
				canvas: [{
					type: "line",
					x1: 0,
					y1: 0,
					x2: Ms,
					y2: 0,
					lineWidth: .5,
					lineColor: js
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
			let e = Fs(n.text);
			e && t.push({
				text: e,
				style: "p"
			});
			break;
		}
		default: "tokens" in n && Array.isArray(n.tokens) ? t.push({
			text: Is(n.tokens),
			style: "p"
		}) : "text" in n && typeof n.text == "string" && t.push({
			text: Ps(n.text),
			style: "p"
		});
	}
	return t;
}
function Vs(e) {
	return Bs(Q.lexer(e));
}
function Hs(e, t = (e) => e) {
	if (!e || typeof e != "object") return [{
		text: JSON.stringify(e, null, 2) ?? "",
		style: "code"
	}];
	let n = [];
	for (let [r, i] of Object.entries(e)) if (n.push({
		text: t(r),
		style: "label"
	}), typeof i == "boolean") n.push({
		text: R(i ? "run.yes" : "run.no"),
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
			layout: zs,
			style: "table"
		});
	} else n.push({
		text: JSON.stringify(i, null, 2),
		style: "code"
	});
	return n;
}
function Us(e) {
	let t = e.json !== void 0 && e.json !== null ? Hs(e.json, e.label) : Vs(e.text ?? ""), n = e.foot ?? "";
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
			color: Os
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
				color: ks,
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
				color: ks,
				fontSize: 8.5
			}, {
				text: `${e} / ${t}`,
				alignment: "right",
				color: ks,
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
var Ws = { Roboto: {
	normal: "Roboto-Regular.ttf",
	bold: "Roboto-Medium.ttf",
	italics: "Roboto-Italic.ttf",
	bolditalics: "Roboto-MediumItalic.ttf"
} }, Gs = null;
function Ks() {
	return Gs ??= Promise.all([import("./chunks/pdfmake-CQ3pcUTC.js").then((t) => /* @__PURE__ */ e(t.default, 1)), import("./chunks/vfs_fonts-CnGkRg9W.js").then((t) => /* @__PURE__ */ e(t.default, 1))]).then(([e, t]) => {
		let n = e.default;
		return n.addVirtualFileSystem(t.default), n.addFonts(Ws), n;
	}).catch((e) => {
		throw Gs = null, e;
	}), Gs;
}
function qs(e) {
	return e.replace(/[\\/:*?"<>|]+|\p{Cc}+/gu, "-").replace(/\s+/g, " ").trim() || "result";
}
async function Js(e) {
	let t = await (await Ks()).createPdf(Us(e)).getBlob();
	return new File([t], `${qs(e.title)}.pdf`, { type: "application/pdf" });
}
//#endregion
//#region src/surface.tsx
var $ = (e) => e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e), Ys = (e) => {
	let t = typeof e == "number" ? e : Number(String(e ?? "").replace(",", "."));
	return Number.isFinite(t) ? t : 0;
};
function Xs(e, t) {
	let n = $(e);
	return n ? /^(https?:|data:|\/)/.test(n) ? n : t(n) : null;
}
function Zs(e, t, n, i) {
	return r(e[t], n.data, i);
}
function Qs(e, t, n) {
	let r = $(t) || "label", i = $(n) || "value";
	return Array.isArray(e) ? e.map((e) => ({
		label: $(e?.[r]),
		value: Ys(e?.[i])
	})) : [];
}
function $s({ c: e, ctx: t, row: n }) {
	let i = e.children;
	if (!i) return null;
	if (Array.isArray(i)) return /* @__PURE__ */ b(y, { children: i.map((e) => /* @__PURE__ */ b(oc, {
		id: e,
		ctx: t,
		row: n
	}, e)) });
	let a = r({ path: i.path }, t.data, n);
	return /* @__PURE__ */ b(y, { children: (Array.isArray(a) ? a : []).map((e, n) => /* @__PURE__ */ b(oc, {
		id: i.componentId,
		ctx: t,
		row: e
	}, n)) });
}
var ec = {
	success: "bg-moss-tint text-moss",
	warning: "bg-amber-tint text-ink-2",
	default: "bg-paper-2 text-ink-2"
};
function tc({ data: e }) {
	let t = Math.max(1, ...e.map((e) => e.value));
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-1.5",
		children: e.map((e, n) => /* @__PURE__ */ x("div", {
			className: "grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-2",
			children: [
				/* @__PURE__ */ b("span", {
					className: "truncate text-[0.8125rem] text-ink-2",
					children: e.label
				}),
				/* @__PURE__ */ b("span", {
					className: "h-2.5 rounded-full bg-paper-2",
					children: /* @__PURE__ */ b("span", {
						className: "block h-full rounded-full bg-ember",
						style: { width: `${e.value / t * 100}%` }
					})
				}),
				/* @__PURE__ */ b("span", {
					className: "text-[0.8125rem] tabular-nums",
					children: e.value.toLocaleString()
				})
			]
		}, n))
	});
}
function nc({ data: e }) {
	if (e.length < 2) return /* @__PURE__ */ b(tc, { data: e });
	let t = Math.max(...e.map((e) => e.value)), n = Math.min(...e.map((e) => e.value)), r = t - n || 1, i = e.map((t, i) => [i / (e.length - 1) * 312 + 4, 116 - (t.value - n) / r * 112]);
	return /* @__PURE__ */ x("figure", { children: [/* @__PURE__ */ x("svg", {
		viewBox: "0 0 320 120",
		className: "w-full text-ember",
		role: "img",
		children: [/* @__PURE__ */ b("polyline", {
			points: i.map(([e, t]) => `${e},${t}`).join(" "),
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinejoin: "round"
		}), i.map(([t, n], r) => /* @__PURE__ */ b("circle", {
			cx: t,
			cy: n,
			r: "3",
			fill: "currentColor",
			children: /* @__PURE__ */ b("title", { children: `${e[r].label}: ${e[r].value}` })
		}, r))]
	}), /* @__PURE__ */ x("figcaption", {
		className: "mt-1 flex justify-between text-[0.75rem] text-ink-3",
		children: [/* @__PURE__ */ b("span", { children: e[0].label }), /* @__PURE__ */ b("span", { children: e.at(-1)?.label })]
	})] });
}
var rc = [
	"var(--color-ember)",
	"var(--color-cobalt)",
	"var(--color-moss)",
	"var(--color-amber)",
	"var(--color-ink-3)"
];
function ic({ data: e }) {
	let t = e.reduce((e, t) => e + Math.max(0, t.value), 0) || 1, n = 0, r = 2 * Math.PI * 40;
	return /* @__PURE__ */ x("div", {
		className: "flex items-center gap-4",
		children: [/* @__PURE__ */ b("svg", {
			viewBox: "0 0 100 100",
			className: "size-28 shrink-0 -rotate-90",
			role: "img",
			children: e.map((e, i) => {
				let a = Math.max(0, e.value) / t * r, o = /* @__PURE__ */ b("circle", {
					cx: "50",
					cy: "50",
					r: 40,
					fill: "none",
					stroke: rc[i % rc.length],
					strokeWidth: "16",
					strokeDasharray: `${a} ${r - a}`,
					strokeDashoffset: -n,
					children: /* @__PURE__ */ b("title", { children: `${e.label}: ${e.value}` })
				}, i);
				return n += a, o;
			})
		}), /* @__PURE__ */ b("ul", {
			className: "flex flex-col gap-1 text-[0.8125rem]",
			children: e.map((e, t) => /* @__PURE__ */ x("li", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ b("span", {
						className: "size-2.5 rounded-full",
						style: { background: rc[t % rc.length] }
					}),
					/* @__PURE__ */ b("span", {
						className: "text-ink-2",
						children: e.label
					}),
					/* @__PURE__ */ b("span", {
						className: "tabular-nums",
						children: e.value.toLocaleString()
					})
				]
			}, t))
		})]
	});
}
function ac({ title: e, children: t }) {
	return /* @__PURE__ */ x("div", {
		className: "rounded-xl bg-card p-4 ring-1 ring-border-soft",
		children: [e ? /* @__PURE__ */ b("div", {
			className: "mb-3 font-medium text-[0.875rem]",
			children: e
		}) : null, t]
	});
}
function oc({ id: e, ctx: t, row: n }) {
	let i = t.byId.get(e);
	if (!i) return null;
	let a = (e) => Zs(i, e, t, n);
	switch (i.component) {
		case "Column": return /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-4",
			children: /* @__PURE__ */ b($s, {
				c: i,
				ctx: t,
				row: n
			})
		});
		case "Text": {
			let e = $(a("variant")) || "body";
			return /* @__PURE__ */ b("p", {
				className: V(e === "h3" && "font-display font-semibold text-[1.25rem] leading-tight", e === "h4" && "font-semibold text-[1rem]", e === "body" && "text-[0.9375rem] leading-relaxed", e === "muted" && "text-[0.8125rem] text-ink-3"),
				children: $(a("text"))
			});
		}
		case "List": return /* @__PURE__ */ b("div", {
			className: "flex flex-col divide-y divide-border-soft overflow-hidden rounded-xl bg-card ring-1 ring-border-soft",
			children: /* @__PURE__ */ b($s, {
				c: i,
				ctx: t,
				row: n
			})
		});
		case "Row": {
			let e = Xs(a("image"), t.assetUrl), n = $(a("badge"));
			return /* @__PURE__ */ x("div", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					e ? /* @__PURE__ */ b("img", {
						src: e,
						alt: "",
						className: "size-10 shrink-0 rounded-lg object-cover"
					}) : null,
					/* @__PURE__ */ x("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ b("div", {
							className: "truncate text-[0.9375rem]",
							children: $(a("title"))
						}), a("subtitle") ? /* @__PURE__ */ b("div", {
							className: "truncate text-[0.8125rem] text-ink-3",
							children: $(a("subtitle"))
						}) : null]
					}),
					a("meta") ? /* @__PURE__ */ b("span", {
						className: "shrink-0 text-[0.8125rem] text-ink-3 tabular-nums",
						children: $(a("meta"))
					}) : null,
					n ? /* @__PURE__ */ b("span", {
						className: V("shrink-0 rounded-full px-2 py-0.5 text-[0.75rem]", ec.default),
						children: n
					}) : null
				]
			});
		}
		case "DetailGrid": {
			let e = a("rows");
			return /* @__PURE__ */ b("dl", {
				className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl bg-card p-4 text-[0.875rem] ring-1 ring-border-soft",
				children: (Array.isArray(e) ? e : []).map((e, i) => /* @__PURE__ */ x("div", {
					className: "contents",
					children: [/* @__PURE__ */ b("dt", {
						className: "text-ink-3",
						children: $(r(e?.label, t.data, n))
					}), /* @__PURE__ */ b("dd", {
						className: "break-words",
						children: $(r(e?.value, t.data, n))
					})]
				}, i))
			});
		}
		case "Badge": return /* @__PURE__ */ b("span", {
			className: V("inline-flex w-fit rounded-full px-2.5 py-0.5 text-[0.75rem]", ec[$(a("tone"))] ?? ec.default),
			children: $(a("label"))
		});
		case "Grid": {
			let e = Math.min(4, Math.max(1, Ys(a("columns")) || 2));
			return /* @__PURE__ */ b("div", {
				className: "grid gap-3",
				style: { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${e > 2 ? 9 : 12}rem), 1fr))` },
				children: /* @__PURE__ */ b($s, {
					c: i,
					ctx: t,
					row: n
				})
			});
		}
		case "Metric": return /* @__PURE__ */ x("div", {
			className: "rounded-xl bg-card p-4 ring-1 ring-border-soft",
			children: [
				/* @__PURE__ */ b("div", {
					className: "text-[0.75rem] text-ink-3 uppercase tracking-[0.06em]",
					children: $(a("label"))
				}),
				/* @__PURE__ */ b("div", {
					className: "mt-1 font-display font-semibold text-[1.5rem] tabular-nums",
					children: $(a("value"))
				}),
				a("caption") ? /* @__PURE__ */ b("div", {
					className: "text-[0.8125rem] text-ink-3",
					children: $(a("caption"))
				}) : null
			]
		});
		case "Table": {
			let e = a("rows"), t = Array.isArray(e) ? e : [], n = a("columns"), r = Array.isArray(n) ? n.map((e) => ({
				key: $(e?.key),
				label: $(e?.label ?? e?.key)
			})) : [...new Set(t.flatMap((e) => Object.keys(e ?? {})))].map((e) => ({
				key: e,
				label: e
			}));
			return /* @__PURE__ */ b("div", {
				className: "overflow-x-auto rounded-xl ring-1 ring-border-soft",
				children: /* @__PURE__ */ x("table", {
					className: "w-full text-[0.8125rem]",
					children: [/* @__PURE__ */ b("thead", {
						className: "bg-paper-2 text-ink-2",
						children: /* @__PURE__ */ b("tr", { children: r.map((e) => /* @__PURE__ */ b("th", {
							className: "px-3 py-2 text-left font-medium",
							children: e.label
						}, e.key)) })
					}), /* @__PURE__ */ b("tbody", { children: t.map((e, t) => /* @__PURE__ */ b("tr", {
						className: "border-border-soft border-t",
						children: r.map((t) => /* @__PURE__ */ b("td", {
							className: "px-3 py-2 tabular-nums",
							children: $(e?.[t.key])
						}, t.key))
					}, t)) })]
				})
			});
		}
		case "Image": {
			let e = Xs(a("src"), t.assetUrl);
			return e ? /* @__PURE__ */ b("img", {
				src: e,
				alt: $(a("alt")),
				className: "w-full rounded-xl"
			}) : null;
		}
		case "BarChart": return /* @__PURE__ */ b(ac, {
			title: $(a("title")),
			children: /* @__PURE__ */ b(tc, { data: Qs(a("points"), a("labelKey"), a("valueKey")) })
		});
		case "LineChart": return /* @__PURE__ */ b(ac, {
			title: $(a("title")),
			children: /* @__PURE__ */ b(nc, { data: Qs(a("points"), a("labelKey"), a("valueKey")) })
		});
		case "DonutChart": return /* @__PURE__ */ b(ac, {
			title: $(a("title")),
			children: /* @__PURE__ */ b(ic, { data: Qs(a("slices"), a("labelKey"), a("valueKey")) })
		});
		case "Actions": return /* @__PURE__ */ b("div", {
			className: "flex flex-wrap gap-2",
			children: /* @__PURE__ */ b($s, {
				c: i,
				ctx: t,
				row: n
			})
		});
		case "Button": {
			let e = $(a("action"));
			return !t.onAction && e !== "open" ? null : /* @__PURE__ */ b("button", {
				type: "button",
				onClick: () => {
					let n = a("target");
					if (e === "open") {
						let e = Xs(n, t.assetUrl);
						e && window.open(e, "_blank", "noopener");
						return;
					}
					t.onAction?.({
						action: e,
						target: n
					});
				},
				className: "inline-flex h-9 items-center rounded-full bg-paper-2 px-4 text-[0.875rem] text-ink-2 hover:text-ink coarse:h-11",
				children: $(a("label"))
			});
		}
	}
	return null;
}
function sc({ surface: e, assetUrl: t, onAction: n }) {
	let r = {
		byId: new Map(e.components.map((e) => [e.id, e])),
		data: e.data,
		assetUrl: t,
		onAction: n
	};
	return /* @__PURE__ */ b(oc, {
		id: "root",
		ctx: r
	});
}
//#endregion
//#region src/outputs.tsx
function cc({ text: e, className: t }) {
	let n = h(() => La.sanitize(Q.parse(e, { async: !1 })), [e]);
	return /* @__PURE__ */ b("div", {
		className: V("prose-zen", t),
		dangerouslySetInnerHTML: { __html: n }
	});
}
function lc({ src: e, page: t, height: n, fit: r }) {
	let i = g(null), [a, o] = _(0);
	p(() => {
		let e = i.current;
		if (!e) return;
		let t = new ResizeObserver(() => o(e.clientWidth));
		return t.observe(e), o(e.clientWidth), () => t.disconnect();
	}, []);
	let [s, c] = _(null);
	p(() => {
		let t = !0;
		return fetch(e, { credentials: "include" }).then((e) => e.ok ? e.text() : "").then((n) => t && c({
			src: e,
			text: n
		})), () => {
			t = !1;
		};
	}, [e]);
	let l = t ?? Math.max(a, 900), u = a ? r ? a / l : Math.min(1, a / l) : 1;
	return /* @__PURE__ */ x("div", {
		ref: i,
		className: "relative overflow-hidden rounded-lg bg-white ring-1 ring-border-soft",
		style: { height: n * u },
		children: [s?.src === e ? /* @__PURE__ */ b("iframe", {
			title: "preview",
			srcDoc: s.text,
			sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox",
			className: "absolute top-0 left-0 origin-top-left border-0",
			style: {
				width: l,
				height: n,
				transform: `scale(${u})`
			}
		}, e) : /* @__PURE__ */ b("div", { className: "absolute inset-0 animate-pulse bg-paper-2" }), /* @__PURE__ */ b("a", {
			href: e,
			target: "_blank",
			rel: "noreferrer",
			className: "absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-card/90 text-ink-2 shadow-soft ring-1 ring-border-soft backdrop-blur hover:text-ink coarse:size-11",
			"aria-label": R("run.openFull"),
			children: /* @__PURE__ */ b($e, { className: "size-4" })
		})]
	});
}
var uc = {
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
function dc({ icon: e, tone: t, size: n, className: r }) {
	let i = uc[e], a = n / i.h;
	return /* @__PURE__ */ b("img", {
		src: sn(`ai-labels/${i.file}-${t}.svg`),
		alt: "",
		draggable: !1,
		className: V("pointer-events-none absolute max-w-none select-none", r),
		style: {
			width: i.box * a,
			height: 566.93 * a,
			left: -i.x * a,
			top: -i.y * a
		}
	});
}
function fc({ ai: e, className: t }) {
	let [n, r] = _(!1);
	if (!e) return null;
	let i = uc[e], a = t === "static", o = a ? [["black", "dark:hidden"], ["white", "hidden dark:block"]] : [["white", ""]];
	return /* @__PURE__ */ b("button", {
		type: "button",
		"aria-label": R(e === "edited" ? "ai.modified" : "ai.generated"),
		"aria-expanded": n,
		"data-open": n,
		onClick: () => r((e) => !e),
		className: V("group block cursor-default overflow-hidden rounded-full backdrop-blur-md transition-[width] duration-200", "w-[var(--ai-disc)] hover:w-[var(--ai-long)] focus-visible:w-[var(--ai-long)] data-[open=true]:w-[var(--ai-long)]", a ? "relative" : V("absolute shadow-[0_1px_3px_rgba(0,0,0,0.25)]", t ?? "bottom-2 left-2")),
		style: {
			height: 18,
			"--ai-disc": "18px",
			"--ai-long": `${i.w / i.h * 18}px`
		},
		children: o.map(([t, r]) => /* @__PURE__ */ x("span", {
			className: r,
			children: [/* @__PURE__ */ b(dc, {
				icon: "disc",
				tone: t,
				size: 18,
				className: V("transition-opacity duration-200", n ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0")
			}), /* @__PURE__ */ b(dc, {
				icon: e,
				tone: t,
				size: 18,
				className: V("transition-opacity duration-200", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")
			})]
		}, t))
	});
}
function pc(e, t) {
	return e.type === "agent" ? e.output.fields?.find((e) => e.id === t)?.description ?? t : t;
}
function mc({ step: e, json: t }) {
	return !t || typeof t != "object" ? /* @__PURE__ */ b("pre", {
		className: "text-[0.8125rem]",
		children: JSON.stringify(t, null, 2)
	}) : /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-4",
		children: Object.entries(t).map(([t, n]) => /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("div", {
			className: "mb-1 font-medium text-[0.75rem] text-ink-3 uppercase tracking-[0.06em]",
			children: pc(e, t)
		}), typeof n == "boolean" ? /* @__PURE__ */ b("div", {
			className: "text-[0.9375rem]",
			children: R(n ? "run.yes" : "run.no")
		}) : typeof n == "string" || typeof n == "number" ? /* @__PURE__ */ b("div", {
			className: "whitespace-pre-wrap text-[0.9375rem]",
			children: String(n)
		}) : Array.isArray(n) && n.every((e) => typeof e != "object") ? /* @__PURE__ */ b("ul", {
			className: "list-disc pl-5 text-[0.875rem]",
			children: n.map((e, t) => /* @__PURE__ */ b("li", {
				className: "break-words",
				children: String(e)
			}, t))
		}) : Array.isArray(n) && n.length && typeof n[0] == "object" ? /* @__PURE__ */ b(hc, { rows: n }) : /* @__PURE__ */ b("pre", {
			className: "overflow-auto rounded-lg bg-paper-2 p-3 text-[0.75rem]",
			children: JSON.stringify(n, null, 2)
		})] }, t))
	});
}
function hc({ rows: e }) {
	let t = [...new Set(e.flatMap((e) => Object.keys(e)))];
	return /* @__PURE__ */ b("div", {
		className: "overflow-x-auto rounded-lg ring-1 ring-border-soft",
		children: /* @__PURE__ */ x("table", {
			className: "w-full text-[0.8125rem]",
			children: [/* @__PURE__ */ b("thead", {
				className: "bg-paper-2 text-ink-2",
				children: /* @__PURE__ */ b("tr", { children: t.map((e) => /* @__PURE__ */ b("th", {
					className: "px-3 py-2 text-left font-medium",
					children: e
				}, e)) })
			}), /* @__PURE__ */ b("tbody", { children: e.map((e, n) => /* @__PURE__ */ b("tr", {
				className: "border-border-soft border-t",
				children: t.map((t) => /* @__PURE__ */ b("td", {
					className: "px-3 py-2 tabular-nums",
					children: e[t] === null || e[t] === void 0 ? "" : String(e[t])
				}, t))
			}, n)) })]
		})
	});
}
function gc({ text: e }) {
	let [t, n] = _(!1);
	return /* @__PURE__ */ x("button", {
		type: "button",
		onClick: () => {
			navigator.clipboard.writeText(e), n(!0), setTimeout(() => n(!1), 1500);
		},
		className: "inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 text-[0.8125rem] text-ink-2 hover:text-ink coarse:h-11 coarse:px-4",
		children: [b(t ? ge : _e, { className: "size-3.5" }), R(t ? "share.copied" : "run.copy")]
	});
}
function _c({ base: e, step: t, output: n, editable: r, draft: i, onDraft: a, picked: o, onPick: s, onSurfaceAction: c }) {
	if (!n) return null;
	let l = (t) => on(`${e}/assets/${t}`);
	if (n.surface) return /* @__PURE__ */ b(sc, {
		surface: n.surface,
		assetUrl: l,
		onAction: c
	});
	if (t.type === "widget" || t.type === "film") {
		let e = n.assets?.find((e) => e.kind === "video");
		if (e) {
			let r = n.assets?.find((e) => e.kind === "poster"), i = t.type === "film" ? t.format === "9:16" : (t.size?.height ?? 0) > (t.size?.width ?? 1);
			return /* @__PURE__ */ x("div", {
				className: V("relative mx-auto", i ? "w-fit" : "w-full"),
				children: [/* @__PURE__ */ b("video", {
					src: l(e.id),
					poster: r ? l(r.id) : void 0,
					controls: !0,
					playsInline: !0,
					className: V("rounded-lg bg-black ring-1 ring-border-soft", i ? "max-h-[76vh]" : "w-full")
				}), /* @__PURE__ */ b(fc, {
					ai: e.ai,
					className: "top-2 right-2"
				})]
			});
		}
		if (t.type === "film") return null;
		let r = n.assets?.find((e) => e.mime === "text/html"), i = t.size ?? {
			width: 1280,
			height: 720
		};
		return r ? /* @__PURE__ */ b(lc, {
			src: l(r.id),
			page: i.width,
			height: i.height,
			fit: !0
		}) : null;
	}
	if (t.type === "generate") {
		let e = n.assets?.[0];
		if (!e) return null;
		if (t.asset === "voice") return /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ b("audio", {
					src: l(e.id),
					controls: !0,
					className: "w-full"
				}),
				/* @__PURE__ */ b(fc, {
					ai: e.ai,
					className: "static"
				}),
				n.text ? /* @__PURE__ */ b("p", {
					className: "text-[0.875rem] text-ink-2 leading-relaxed",
					children: n.text
				}) : null
			]
		});
		if ((n.assets?.length ?? 0) > 1 && (t.asset === "image" || t.asset === "video")) {
			let e = t.options?.aspectRatio === "9:16" || t.options?.aspectRatio === "2:3";
			return /* @__PURE__ */ b("div", {
				className: V("grid gap-3", e ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"),
				children: n.assets?.map((e, n) => {
					let r = o?.includes(n);
					return /* @__PURE__ */ x("figure", {
						className: V("relative overflow-hidden rounded-lg bg-paper-2 ring-1 ring-border-soft", r && "ring-2 ring-ember"),
						children: [
							t.asset === "image" ? /* @__PURE__ */ b("img", {
								src: l(e.id),
								alt: `${t.title} ${n + 1}`,
								className: "w-full"
							}) : /* @__PURE__ */ b("video", {
								src: l(e.id),
								controls: !0,
								playsInline: !0,
								loop: !0,
								className: "w-full"
							}),
							s ? /* @__PURE__ */ x("button", {
								type: "button",
								"aria-pressed": r,
								onClick: () => s(n),
								className: V("absolute top-2 left-2 inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-medium text-[0.75rem] shadow-soft backdrop-blur coarse:h-11", r ? "bg-ember text-ember-on" : "bg-card/90 text-ink-2 hover:text-ink"),
								children: [r ? /* @__PURE__ */ b(ge, { className: "size-3.5" }) : null, R(r ? "run.pickedItem" : "run.pickItem", { n: n + 1 })]
							}) : /* @__PURE__ */ b("span", {
								className: "absolute top-2 left-2 rounded-full bg-card/90 px-2.5 py-1 font-medium text-[0.75rem] text-ink-2",
								children: n + 1
							}),
							/* @__PURE__ */ b(fc, {
								ai: e.ai,
								className: t.asset === "image" ? "bottom-2 left-2" : "top-2 right-2"
							})
						]
					}, e.id);
				})
			});
		}
		if (t.asset === "image") return /* @__PURE__ */ x("div", {
			className: "relative",
			children: [/* @__PURE__ */ b("img", {
				src: l(e.id),
				alt: t.title,
				className: "w-full rounded-lg bg-paper-2 ring-1 ring-border-soft"
			}), /* @__PURE__ */ b(fc, { ai: e.ai })]
		});
		if (t.asset === "video") {
			let n = t.options?.aspectRatio === "9:16";
			return /* @__PURE__ */ x("div", {
				className: V("relative mx-auto", n ? "w-fit" : "w-full"),
				children: [/* @__PURE__ */ b("video", {
					src: l(e.id),
					controls: !0,
					playsInline: !0,
					loop: !0,
					className: V("rounded-lg bg-black ring-1 ring-border-soft", n ? "max-h-[70vh]" : "w-full")
				}), /* @__PURE__ */ b(fc, {
					ai: e.ai,
					className: "top-2 left-2"
				})]
			});
		}
		return t.asset === "document" ? /* @__PURE__ */ b(lc, {
			src: l(e.id),
			page: 820,
			height: 1100
		}) : /* @__PURE__ */ b(lc, {
			src: l(e.id),
			page: null,
			height: 760
		});
	}
	if (t.type === "agent") {
		let e = n.assets?.filter((e) => e.kind !== "file" && e.mime.startsWith("image/")) ?? [], o = n.assets?.filter((e) => e.kind === "file") ?? [];
		return /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-4",
			children: [
				t.output.format === "json" && n.json !== void 0 ? /* @__PURE__ */ b(mc, {
					step: t,
					json: n.json
				}) : r ? /* @__PURE__ */ b(yn, {
					value: i ?? n.text ?? "",
					onChange: (e) => a?.(e.target.value),
					minRows: 4,
					maxRows: 24
				}) : t.output.format === "markdown" ? /* @__PURE__ */ b(cc, { text: n.text ?? "" }) : /* @__PURE__ */ b("div", {
					className: "whitespace-pre-wrap text-[1rem] leading-relaxed",
					children: n.text
				}),
				e.map((e) => /* @__PURE__ */ x("div", {
					className: "relative",
					children: [/* @__PURE__ */ b("img", {
						src: l(e.id),
						alt: "",
						className: "w-full rounded-lg ring-1 ring-border-soft"
					}), /* @__PURE__ */ b(fc, { ai: e.ai })]
				}, e.id)),
				o.length ? /* @__PURE__ */ b("ul", {
					className: "overflow-hidden rounded-lg ring-1 ring-border-soft",
					children: o.map((e) => /* @__PURE__ */ b("li", {
						className: "border-border-soft border-b last:border-0",
						children: /* @__PURE__ */ x("a", {
							href: l(e.id),
							download: e.name,
							onClick: (t) => dn(t, l(e.id), e.name),
							className: "flex items-center gap-2 px-3 py-2 text-[0.8125rem] hover:bg-paper-2 coarse:min-h-11",
							children: [/* @__PURE__ */ b(je, { className: "size-3.5 shrink-0 text-ink-3" }), /* @__PURE__ */ b("span", {
								className: "min-w-0 flex-1 truncate",
								children: e.name
							})]
						})
					}, e.id))
				}) : null,
				t.output.format !== "json" && !r && n.text ? /* @__PURE__ */ b("div", { children: /* @__PURE__ */ b(gc, { text: n.text }) }) : null
			]
		});
	}
	return null;
}
var vc = {
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
function yc(e, t) {
	return (e.headers.get("content-disposition") ?? "").match(/filename="([^"]+)"/)?.[1] ?? t;
}
function bc(e) {
	let t = URL.createObjectURL(e), n = document.createElement("a");
	n.href = t, n.download = e.name, n.rel = "noopener", document.body.append(n), n.click(), n.remove(), setTimeout(() => URL.revokeObjectURL(t), 6e4);
}
function xc({ url: e, format: t, title: n, make: r }) {
	let [i, a] = _("idle"), o = g(null), s = async () => {
		if (cn("share") && !r) {
			a("busy"), await ln("share", {
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
					o.current = new File([r], yc(n, `download.${t}`), { type: r.type.split(";")[0] });
				}
			}
			let i = {
				files: [o.current],
				title: n
			};
			if (!navigator.canShare(i)) {
				r ? bc(o.current) : location.href = e, a("idle");
				return;
			}
			await navigator.share(i), a("idle");
		} catch (e) {
			a(o.current && e.name === "NotAllowedError" ? "ready" : "idle");
		}
	};
	return /* @__PURE__ */ x("button", {
		type: "button",
		onClick: () => void s(),
		disabled: i === "busy",
		"aria-label": R("run.shareFile"),
		title: R("run.shareFile"),
		className: V("inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-medium text-[0.8125rem] transition coarse:h-11 coarse:px-4", i === "ready" ? "bg-ember-tint text-ink ring-1 ring-ember" : "bg-paper-2 text-ink-2 hover:bg-paper-3 hover:text-ink"),
		children: [b(i === "busy" ? wn : St, { className: "size-3.5" }), R(i === "ready" ? "run.shareNow" : "run.share")]
	});
}
var Sc = cn("share") || Qn();
function Cc({ base: e, stepId: t, formats: n, title: r, step: i, output: a, foot: o }) {
	let s = (n) => on(`${e}/steps/${t}/download?format=${n}`), [c, l] = _(!1), u = g(null), d = fn() && i?.type === "agent" && a && (a.text || a.json !== void 0) ? {
		title: r ?? i.title,
		text: a.text,
		json: i.output.format === "json" ? a.json : void 0,
		label: (e) => pc(i, e),
		foot: o
	} : null, f = async () => {
		if (!d) throw Error("nothing written");
		return u.current ??= await Js(d), u.current;
	}, p = async () => {
		l(!0);
		try {
			bc(await f());
		} catch (e) {
			console.warn(`pdf: ${e.message}`), n.includes("html") && window.open(s("html"), "_blank", "noopener");
		} finally {
			l(!1);
		}
	}, m = (e) => V("inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 font-medium text-[0.8125rem] transition coarse:h-11 coarse:px-4", e === 0 ? "bg-primary text-primary-foreground hover:brightness-105" : "bg-paper-2 text-ink-2 hover:bg-paper-3 hover:text-ink"), h = (e) => e === "pdf" && d !== null;
	return /* @__PURE__ */ x("div", {
		className: "flex flex-wrap gap-2",
		children: [n.map((e, t) => h(e) ? /* @__PURE__ */ x("button", {
			type: "button",
			onClick: () => void p(),
			disabled: c,
			className: m(t),
			children: [c ? /* @__PURE__ */ b(wn, { className: "size-3.5" }) : t === 0 ? /* @__PURE__ */ b(Ce, { className: "size-3.5" }) : null, vc[e]]
		}, e) : e === "html" && fn() ? /* @__PURE__ */ x("a", {
			href: s(e),
			target: "_blank",
			rel: "noopener",
			className: m(t),
			children: [t === 0 ? /* @__PURE__ */ b(mt, { className: "size-3.5" }) : null, R("run.print")]
		}, e) : /* @__PURE__ */ x("a", {
			href: s(e),
			onClick: (t) => dn(t, s(e)),
			className: m(t),
			children: [t === 0 ? /* @__PURE__ */ b(Ce, { className: "size-3.5" }) : null, vc[e]]
		}, e)), Sc && n.length ? /* @__PURE__ */ b(xc, {
			url: s(n[0]),
			format: n[0],
			title: r,
			make: h(n[0]) ? f : void 0
		}, s(n[0])) : null]
	});
}
//#endregion
//#region src/RunnerView.tsx
function wc({ view: e }) {
	let t = Math.round(Math.min(e.progress.done, e.progress.total) / Math.max(1, e.progress.total) * 100);
	return /* @__PURE__ */ b("div", {
		className: "h-[3px] w-full bg-paper-2",
		children: /* @__PURE__ */ b("div", {
			className: "h-full bg-ember transition-[width] duration-700 ease-out",
			style: { width: `${t}%` }
		})
	});
}
function Tc({ title: e, description: t, kicker: n }) {
	return /* @__PURE__ */ x("div", {
		className: "mb-8",
		children: [
			n ? /* @__PURE__ */ b("p", {
				className: "mb-4 text-[0.9375rem] text-ink-2 leading-relaxed",
				children: n
			}) : null,
			/* @__PURE__ */ b("h1", {
				className: "font-display font-semibold text-[1.75rem] leading-[1.15] tracking-tight sm:text-[2rem]",
				children: e
			}),
			t ? /* @__PURE__ */ b("p", {
				className: "mt-2 text-[0.9375rem] text-ink-3 leading-relaxed",
				children: t
			}) : null
		]
	});
}
function Ec(e, t) {
	let n = {};
	for (let r of e.fields) n[r.id] = t.values[r.id] ?? t.prefill?.[r.id] ?? r.default ?? (r.kind === "multiselect" ? [] : void 0);
	return n;
}
function Dc(e) {
	return Array.from(e.querySelectorAll("input:not([type=\"hidden\"], [type=\"file\"], [type=\"checkbox\"], [type=\"color\"], [type=\"range\"], [disabled]), textarea:not([disabled])")).filter((e) => !e.closest("dialog") && e.offsetParent !== null);
}
function Oc({ view: e, run: t, step: r }) {
	let [a, o] = _(() => Ec(r, e)), [s, c] = _(/* @__PURE__ */ new Set()), l = g(null), u = e.progress.done === 0, d = h(() => r.fields.filter((t) => !i(t) || e.decidedFields?.includes(t.id)).map((t) => e.options?.[t.id]?.length ? {
		...t,
		options: e.options[t.id]
	} : t), [
		r.fields,
		e.options,
		e.decidedFields
	]), f = n(d, e.known ?? {}, a), m = () => void t.submitPage(r.id, a);
	return p(() => {
		if (!l.current) return;
		let e = Dc(l.current).filter((e) => e instanceof HTMLInputElement);
		for (let [t, n] of e.entries()) (n.dataset.hint || !n.hasAttribute("enterkeyhint")) && (n.dataset.hint = "1", n.setAttribute("enterkeyhint", t === e.length - 1 ? "go" : "next"));
	}), /* @__PURE__ */ x("form", {
		ref: l,
		className: "animate-rise",
		onSubmit: (e) => {
			e.preventDefault(), s.size || m();
		},
		onKeyDown: (e) => {
			let t = e.target;
			if (e.key !== "Enter" || e.defaultPrevented || e.nativeEvent.isComposing || !(t instanceof HTMLInputElement) || t.closest("dialog")) return;
			let n = Dc(e.currentTarget), r = n[n.indexOf(t) + 1];
			r && (e.preventDefault(), r.focus());
		},
		children: [
			/* @__PURE__ */ b(Tc, {
				title: r.title,
				description: r.description,
				kicker: u ? e.wizard.intro : null
			}),
			/* @__PURE__ */ b("div", {
				className: "flex flex-col gap-7",
				children: f.map((n) => /* @__PURE__ */ b(pi, {
					field: n,
					value: a[n.id],
					values: a,
					runId: e.id,
					view: e,
					error: t.fieldErrors[n.id],
					closed: e.closed?.[n.id],
					onChange: (e) => o((t) => ({
						...t,
						[n.id]: e
					})),
					onBusy: (e) => c((t) => {
						if (t.has(n.id) === e) return t;
						let r = new Set(t);
						return e ? r.add(n.id) : r.delete(n.id), r;
					})
				}, n.id))
			}),
			/* @__PURE__ */ b(kc, {
				view: e,
				run: t,
				sticky: !0,
				children: /* @__PURE__ */ x(H, {
					type: "submit",
					size: "lg",
					busy: t.busy,
					disabled: s.size > 0,
					children: [
						r.cta || R("run.next"),
						" ",
						/* @__PURE__ */ b(se, { className: "size-4" })
					]
				})
			})
		]
	});
}
function kc({ view: e, run: t, sticky: n, children: r }) {
	return /* @__PURE__ */ x("div", {
		className: V("mt-10 flex items-center justify-between gap-3", n && "action-bar"),
		children: [e.canBack ? /* @__PURE__ */ x(H, {
			variant: "ghost",
			onClick: () => void t.back(),
			disabled: t.busy,
			children: [
				/* @__PURE__ */ b(oe, { className: "size-4" }),
				" ",
				R("run.back")
			]
		}) : /* @__PURE__ */ b("span", {}), r]
	});
}
function Ac() {
	let e = Kn(), [t, n] = _(!1), r = e !== "off";
	return /* @__PURE__ */ x("div", {
		className: "mt-6 flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ x("button", {
			type: "button",
			"aria-pressed": r,
			disabled: t,
			onClick: async () => {
				if (r) {
					Yn();
					return;
				}
				n(!0), await Jn(), n(!1);
			},
			className: V("inline-flex h-11 items-center gap-2 rounded-full px-4 font-medium text-[0.875rem] ring-1 transition", r ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink hover:ring-ink-4"),
			children: [r ? /* @__PURE__ */ b(de, { className: "size-4 text-ember-strong" }) : /* @__PURE__ */ b(pe, { className: "size-4" }), R(r ? "notify.on" : "notify.ask")]
		}), /* @__PURE__ */ b("p", {
			className: "max-w-xs text-[0.75rem] text-ink-4 leading-relaxed",
			children: R(e === "off" ? "notify.why" : e === "on" ? "notify.onHint" : qn() ? "notify.blocked" : "notify.quiet")
		})]
	});
}
function jc({ view: e, compact: t, awake: n }) {
	let r = h(() => {
		let t = [...e.events].reverse().find((t) => t.type === "step_started" && t.stepId === e.step?.id);
		return t ? new Date(t.at).getTime() : Date.now();
	}, [e.events, e.step?.id]), [i, a] = _(Date.now());
	p(() => {
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, []);
	let o = [...e.events].reverse().find((t) => t.type === "step_started" && t.stepId === e.step?.id)?.message ?? e.step?.title ?? R("run.working"), s = e.events.filter((e) => (e.type === "tool" || e.type === "info") && new Date(e.at).getTime() >= r - 500), c = s.slice(-4), { Mascot: l } = an(), u = [...new Set(s.map((e) => e.asset).filter((e) => !!e))], d = [...s].reverse().find((e) => e.asset)?.asset;
	return /* @__PURE__ */ x("div", {
		className: "flex animate-rise flex-col items-center pt-6 text-center",
		children: [
			/* @__PURE__ */ b(l, {
				kind: e.wizard.avatar,
				size: t ? 130 : 170,
				fluffy: !0
			}),
			/* @__PURE__ */ b("h2", {
				className: "mt-4 font-display font-semibold text-[1.375rem] tracking-tight",
				children: o
			}),
			/* @__PURE__ */ b("div", {
				className: "mt-1 text-[0.8125rem] text-ink-4 tabular-nums",
				children: R("run.elapsed", { s: Math.max(0, Math.round((i - r) / 1e3)) })
			}),
			u.length ? /* @__PURE__ */ b("div", {
				className: "mt-5 flex max-w-full flex-wrap justify-center gap-2",
				children: u.slice(-8).map((t) => /* @__PURE__ */ b("img", {
					src: on(`${B(e.id)}/assets/${t}`),
					alt: "",
					className: V("size-16 animate-rise rounded-lg bg-paper-2 object-cover ring-1 ring-border-soft transition sm:size-20", t === d ? "ring-2 ring-ember" : "opacity-70")
				}, t))
			}) : null,
			/* @__PURE__ */ b("div", {
				className: "mt-6 flex min-h-[7rem] w-full max-w-sm flex-col gap-1.5",
				children: c.map((e, t) => /* @__PURE__ */ x("div", {
					className: V("flex items-center justify-center gap-2 text-[0.8125rem] transition-opacity", t === c.length - 1 ? "text-ink-2" : "text-ink-4"),
					children: [t === c.length - 1 ? /* @__PURE__ */ b(Et, { className: "size-3.5 animate-breathe text-ember" }) : null, /* @__PURE__ */ b("span", {
						className: "truncate",
						children: Xt(e)
					})]
				}, e.id))
			}),
			t ? null : /* @__PURE__ */ b(Ac, {}),
			n ? /* @__PURE__ */ b("p", {
				className: "mt-3 text-[0.75rem] text-ink-4",
				children: R("run.awake")
			}) : null
		]
	});
}
function Mc(e) {
	let t = g({
		running: !1,
		since: 0,
		ask: null
	});
	p(() => {
		if (!e) return;
		let n = t.current, r = e.status === "running", i = r ? n.running ? n.since : Date.now() : 0, a = (t) => {
			document.visibilityState !== "visible" && !document.title.startsWith("● ") && (document.title = `● ${document.title}`), Zn({
				title: e.wizard.title,
				body: t,
				tag: e.id
			});
		};
		r && e.ask && e.ask.id !== n.ask ? a(R("notify.needsYou")) : !r && n.running && Date.now() - n.since > 8e3 && a(e.status === "failed" ? R("run.failed") : e.status === "done" ? R("notify.done") : R("notify.next")), t.current = {
			running: r,
			since: i,
			ask: e.ask?.id ?? null
		};
	}, [e]), p(() => {
		let e = () => {
			document.visibilityState === "visible" && document.title.startsWith("● ") && (document.title = document.title.slice(2));
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []);
}
function Nc({ view: e, run: t, step: n }) {
	let [r, i] = _({}), [a, o] = _({}), [s, c] = _(""), l = e.shown.filter((e) => e.output), [u, d] = _(l.length === 1 ? l[0].step.id : null), [f, p] = _({}), m = g(null), h = l.find((e) => e.step.id === u), v = h?.step.type === "generate" && (h.output?.assets?.length ?? 0) > 1, y = () => {
		h && s.trim() && t.regenerate(n.id, h.step.id, s.trim(), f[h.step.id]);
	};
	return /* @__PURE__ */ x("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ b(Tc, {
				title: n.title,
				description: n.description
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-col gap-6",
				children: [
					e.shown.filter((e) => e.output).map(({ step: t, output: s }) => {
						let c = !!n.edit && t.type === "agent" && t.output.format !== "json";
						return /* @__PURE__ */ x("section", { children: [/* @__PURE__ */ x("div", {
							className: "mb-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ b("h3", {
								className: "font-medium text-[0.8125rem] text-ink-3 uppercase tracking-[0.06em]",
								children: t.title
							}), /* @__PURE__ */ b("div", {
								className: "flex items-center",
								children: c && !a[t.id] ? /* @__PURE__ */ x("button", {
									type: "button",
									onClick: () => o((e) => ({
										...e,
										[t.id]: !0
									})),
									className: "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] text-ink-2 hover:bg-accent hover:text-ink coarse:h-11",
									children: [
										/* @__PURE__ */ b(ut, { className: "size-3.5" }),
										" ",
										R("run.edit")
									]
								}) : null
							})]
						}), /* @__PURE__ */ b(_c, {
							base: `${B(e.id)}`,
							step: t,
							output: s,
							editable: c && a[t.id],
							draft: r[t.id],
							onDraft: (e) => i((n) => ({
								...n,
								[t.id]: e
							})),
							picked: f[t.id],
							onPick: n.regenerate ? (e) => {
								d(t.id), p((n) => {
									let r = n[t.id] ?? [];
									return {
										...n,
										[t.id]: r.includes(e) ? r.filter((t) => t !== e) : [...r, e]
									};
								}), m.current?.focus();
							} : void 0,
							onSurfaceAction: n.regenerate ? () => {
								d(t.id), m.current?.focus();
							} : void 0
						})] }, t.id);
					}),
					e.lists.map((t) => /* @__PURE__ */ x("section", { children: [/* @__PURE__ */ b("h3", {
						className: "mb-2 font-medium text-[0.8125rem] text-ink-3 uppercase tracking-[0.06em]",
						children: t.def.title
					}), t.def.check ? /* @__PURE__ */ b(qr, {
						runId: e.id,
						list: t
					}) : /* @__PURE__ */ b(Wr, {
						runId: e.id,
						list: t,
						editable: !0
					})] }, t.def.id)),
					n.regenerate && l.length ? /* @__PURE__ */ x(Tn, {
						className: "p-3",
						children: [
							l.length > 1 ? /* @__PURE__ */ x("div", {
								className: "flex flex-wrap items-center gap-1.5 px-1 pb-2",
								children: [/* @__PURE__ */ b("span", {
									className: "mr-1 text-[0.8125rem] text-ink-3",
									children: R("run.feedbackTarget")
								}), l.map(({ step: e }) => /* @__PURE__ */ b("button", {
									type: "button",
									"aria-pressed": u === e.id,
									onClick: () => {
										d(e.id), m.current?.focus();
									},
									className: V("inline-flex h-8 items-center rounded-full px-3 text-[0.8125rem] ring-1 transition coarse:h-11", u === e.id ? "bg-ember-tint text-ink ring-ember" : "bg-card text-ink-2 ring-input hover:text-ink"),
									children: e.title
								}, e.id))]
							}) : null,
							/* @__PURE__ */ b(yn, {
								ref: m,
								minRows: 2,
								maxRows: 8,
								value: s,
								placeholder: R("run.feedbackPlaceholder"),
								onChange: (e) => c(e.target.value),
								onKeyDown: (e) => {
									e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), y());
								},
								className: "border-0 bg-transparent shadow-none focus:ring-0"
							}),
							/* @__PURE__ */ x("div", {
								className: "flex items-center justify-between gap-3 px-1 pt-1",
								children: [/* @__PURE__ */ b("span", {
									className: "min-w-0 text-[0.75rem] text-ink-3",
									children: v ? f[h.step.id]?.length ? R("run.regeneratePicked", { n: [...f[h.step.id]].sort((e, t) => e - t).map((e) => e + 1).join(", ") }) : R("run.regenerateAll") : !h && s.trim() ? R("run.feedbackPick") : null
								}), /* @__PURE__ */ x(H, {
									size: "sm",
									variant: "secondary",
									busy: t.busy,
									disabled: !s.trim() || !h,
									onClick: y,
									children: [
										/* @__PURE__ */ b(gt, { className: "size-3.5" }),
										" ",
										R("run.regenerateGo")
									]
								})]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ b(kc, {
				view: e,
				run: t,
				sticky: !0,
				children: /* @__PURE__ */ x(H, {
					size: "lg",
					busy: t.busy,
					onClick: () => void t.accept(n.id, Object.keys(r).length ? r : void 0),
					children: [
						R("run.accept"),
						" ",
						/* @__PURE__ */ b(se, { className: "size-4" })
					]
				})
			})
		]
	});
}
function Pc({ view: e, run: t, step: n, onRestart: r }) {
	let i = e.shown.filter((e) => e.output), { Mascot: a, ShareResultButton: o } = an();
	return /* @__PURE__ */ x("div", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ x("div", {
				className: "mb-8 flex flex-wrap items-center gap-x-4 gap-y-5",
				children: [
					/* @__PURE__ */ b(a, {
						kind: e.wizard.avatar,
						size: 64
					}),
					/* @__PURE__ */ x("div", {
						className: "min-w-0 flex-1 basis-[12rem]",
						children: [/* @__PURE__ */ b("h1", {
							className: "text-balance font-display font-semibold text-[1.75rem] leading-tight tracking-tight sm:text-[2rem]",
							children: n.title
						}), n.message ? /* @__PURE__ */ b("p", {
							className: "mt-1 text-[0.9375rem] text-ink-3",
							children: n.message
						}) : null]
					}),
					o && e.shown.some((e) => e.output) ? /* @__PURE__ */ b("div", {
						className: "max-sm:basis-full",
						children: /* @__PURE__ */ b(o, {
							runId: e.id,
							title: `${n.title} · ${e.wizard.title}`,
							initial: e.shareUrl ? {
								url: e.shareUrl,
								expiresAt: e.expiresAt
							} : null
						})
					}) : null
				]
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-col gap-6",
				children: [i.map(({ step: t, output: n, formats: r, label: i }) => /* @__PURE__ */ x(Tn, {
					className: "p-4 sm:p-5",
					children: [
						/* @__PURE__ */ x("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ b("h3", {
								className: "font-display font-semibold text-[1.0625rem]",
								children: i ?? t.title
							}), /* @__PURE__ */ b(Cc, {
								base: `${B(e.id)}`,
								stepId: t.id,
								formats: r,
								title: i ?? t.title,
								step: t,
								output: n ?? void 0,
								foot: `${e.wizard.title} · ${(/* @__PURE__ */ new Date()).toLocaleDateString(an().lang)}`
							})]
						}),
						/* @__PURE__ */ b(_c, {
							base: `${B(e.id)}`,
							step: t,
							output: n
						}),
						n?.assets?.some((e) => e.ai) ? /* @__PURE__ */ b("p", {
							className: "mt-3 text-[0.75rem] text-ink-3 leading-relaxed",
							children: R("ai.publish")
						}) : null
					]
				}, t.id)), e.lists.map((t) => /* @__PURE__ */ x(Tn, {
					className: "p-4 sm:p-5",
					children: [/* @__PURE__ */ x("div", {
						className: "mb-3 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ b("h3", {
							className: "font-display font-semibold text-[1.0625rem]",
							children: t.label ?? t.def.title
						}), /* @__PURE__ */ b(Yr, {
							runId: e.id,
							list: t
						})]
					}), /* @__PURE__ */ b(Wr, {
						runId: e.id,
						list: t,
						editable: !0
					})]
				}, t.def.id))]
			}),
			/* @__PURE__ */ b(kc, {
				view: e,
				run: t,
				children: r ? /* @__PURE__ */ x(H, {
					variant: "secondary",
					onClick: r,
					children: [
						/* @__PURE__ */ b(vt, { className: "size-4" }),
						" ",
						R("run.again")
					]
				}) : /* @__PURE__ */ b("span", {})
			})
		]
	});
}
function Fc({ view: e, run: t }) {
	let { Mascot: n } = an();
	return /* @__PURE__ */ x("div", {
		className: "flex animate-rise flex-col items-center pt-8 text-center",
		children: [
			/* @__PURE__ */ b(n, {
				kind: e.wizard.avatar,
				size: 90
			}),
			/* @__PURE__ */ b("h2", {
				className: "mt-4 font-display font-semibold text-[1.375rem]",
				children: R("run.failed")
			}),
			/* @__PURE__ */ b("p", {
				className: "mt-2 max-w-md text-[0.9375rem] text-ink-3",
				children: /* @__PURE__ */ b(Dn, { text: e.error ?? "" })
			}),
			/* @__PURE__ */ x("div", {
				className: "mt-8 flex gap-3",
				children: [e.canBack ? /* @__PURE__ */ x(H, {
					variant: "ghost",
					onClick: () => void t.back(),
					children: [
						/* @__PURE__ */ b(oe, { className: "size-4" }),
						" ",
						R("run.back")
					]
				}) : null, /* @__PURE__ */ x(H, {
					onClick: () => void t.retry(),
					busy: t.busy,
					children: [
						/* @__PURE__ */ b(vt, { className: "size-4" }),
						" ",
						R("run.retry")
					]
				})]
			})
		]
	});
}
function Ic({ run: e, compact: t, onRestart: n, onView: r, stickyProgress: i }) {
	let { view: a } = e;
	p(() => {
		r?.(a);
	}, [a, r]), In();
	let o = Ln(a?.status === "running" && !a.ask);
	if (Mc(a), e.notFound) return /* @__PURE__ */ b("div", {
		className: "py-24 text-center text-ink-3",
		children: R("run.notFound")
	});
	if (!a) return /* @__PURE__ */ b("div", {
		className: "flex justify-center py-24 text-ink-4",
		children: /* @__PURE__ */ b(wn, {})
	});
	let s = a.step, c = null;
	if (a.status === "running" && a.ask) c = /* @__PURE__ */ b(jn, {
		runId: a.id,
		ask: a.ask
	}, a.ask.id);
	else if (a.status === "running") c = /* @__PURE__ */ b(jc, {
		view: a,
		compact: t,
		awake: o
	});
	else if (a.status === "failed") c = /* @__PURE__ */ b(Fc, {
		view: a,
		run: e
	});
	else if (a.status === "cancelled") c = /* @__PURE__ */ b("div", {
		className: "py-24 text-center text-ink-3",
		children: R("run.cancelled")
	});
	else if (s?.type === "page") c = /* @__PURE__ */ b(Oc, {
		view: a,
		run: e,
		step: s
	}, s.id);
	else if (s?.type === "review") {
		let t = a.shown.map((e) => e.output?.at ?? "").join("|");
		c = /* @__PURE__ */ b(Nc, {
			view: a,
			run: e,
			step: s
		}, `${s.id}:${t}`);
	} else s?.type === "result" && (c = /* @__PURE__ */ b(Pc, {
		view: a,
		run: e,
		step: s,
		onRestart: n
	}));
	let l = s?.type === "review" && a.status === "waiting_input" && a.lists.some((e) => e.def.check);
	return /* @__PURE__ */ x("div", {
		className: "flex min-h-full flex-col",
		children: [i ? /* @__PURE__ */ b("div", {
			className: "sticky top-0 z-10",
			children: /* @__PURE__ */ b(wc, { view: a })
		}) : /* @__PURE__ */ b(wc, { view: a }), /* @__PURE__ */ x("div", {
			className: V("safe-x mx-auto w-full flex-1", l ? "max-w-[1240px] py-8" : t ? "max-w-[620px] py-8" : "max-w-[640px] py-8 sm:py-16"),
			children: [
				c,
				e.error && a.status !== "failed" ? /* @__PURE__ */ b("div", {
					className: "mt-4 rounded-lg bg-rose-tint px-4 py-3 text-[0.875rem] text-rose",
					children: e.error
				}) : null,
				a.keeps && a.status !== "running" ? /* @__PURE__ */ b("div", {
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ b(Zr, { runId: a.id })
				}) : null
			]
		})]
	});
}
//#endregion
export { fc as AiBadge, Zt as ApiError, jn as AskPanel, Cc as DownloadButtons, vc as FORMAT_LABEL, pi as FieldInput, lc as HtmlFrame, qr as ListCheck, Yr as ListDownloads, Wr as ListTable, kn as LiveBrowser, cc as Markdown, _c as OutputView, Gt as RUNNER_TEXTS, Ic as RunnerBody, Zr as StoreButton, sc as SurfaceView, z as api, Qn as canShareFiles, Fn as canUseMedia, rn as configureRunner, en as createApi, Xt as eventText, Ec as initialValues, Qt as isOffline, Pn as isTouch, an as runnerEnv, Jt as setRunnerLang, $n as shrinkImage, R as t, si as textHints, Mc as useDoneSignal, In as useKeyboardInset, Kn as useNotifyState, Yt as useRunnerLang, Ln as useWakeLock };

//# sourceMappingURL=index.js.map