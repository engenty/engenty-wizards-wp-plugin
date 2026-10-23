import { l as e } from "./chunks/i18n-DHKrgXZE.js";
import { forwardRef as t, useEffect as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/ui.tsx
function c(...e) {
	return e.filter(Boolean).join(" ");
}
var l = {
	primary: "bg-primary text-primary-foreground hover:brightness-[1.06] active:brightness-95 shadow-[0_1px_0_oklch(0%_0_0/0.08)]",
	secondary: "bg-card text-ink border border-border hover:bg-paper-2",
	ghost: "text-ink-2 hover:text-ink hover:bg-accent",
	quiet: "bg-paper-2 text-ink hover:bg-paper-3",
	danger: "text-rose hover:bg-rose-tint"
}, u = t(function({ variant: e = "primary", size: t = "md", busy: n, className: r, children: i, disabled: a, ...u }, d) {
	return /* @__PURE__ */ s("button", {
		ref: d,
		type: "button",
		"data-variant": e,
		disabled: a || n,
		className: c("inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background,filter,color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50", t === "sm" && "h-8 px-3 text-[0.8125rem] coarse:h-11 coarse:px-4", t === "md" && "h-10 px-4 text-sm coarse:h-11", t === "lg" && "h-12 px-6 text-[0.9375rem]", l[e], e === "primary" && "wizard-button", r),
		...u,
		children: [n ? /* @__PURE__ */ o(C, { className: "size-4" }) : null, i]
	});
});
function d({ label: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ o("button", {
		type: "button",
		"aria-label": e,
		title: e,
		className: c("inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-3 transition hover:bg-accent hover:text-ink disabled:opacity-40 coarse:size-11", t),
		...r,
		children: n
	});
}
var f = "wizard-field rounded-lg border border-input bg-card px-3.5 text-[0.9375rem] text-ink shadow-[inset_0_1px_0_oklch(0%_0_0/0.02)] outline-none transition placeholder:text-ink-4 focus:border-focus focus:ring-4 focus:ring-focus-glow disabled:opacity-60";
function p(e) {
	return /(^|\s)w-/.test(e ?? "") ? null : "w-full";
}
var m = t(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ o("input", {
		ref: n,
		className: c(f, p(e), "h-11", e),
		...t
	});
});
function h(e) {
	return /* @__PURE__ */ o("input", {
		type: "color",
		className: "swatch size-11 shrink-0 cursor-pointer rounded-lg border border-input bg-card p-1",
		...e
	});
}
var g = t(function({ className: e, minRows: t = 3, maxRows: n = 14, onChange: a, ...s }, l) {
	let u = i(null), d = () => {
		let e = u.current;
		if (!e) return;
		let r = Number.parseFloat(getComputedStyle(e).lineHeight) || 22;
		e.style.height = "auto";
		let i = r * n + 20;
		e.style.height = `${Math.min(Math.max(e.scrollHeight, r * t + 20), i)}px`, e.style.overflowY = e.scrollHeight > i ? "auto" : "hidden";
	};
	return r(d), /* @__PURE__ */ o("textarea", {
		ref: (e) => {
			u.current = e, typeof l == "function" ? l(e) : l && (l.current = e);
		},
		className: c(f, p(e), "resize-none py-2.5 leading-[1.5]", e),
		onChange: (e) => {
			d(), a?.(e);
		},
		...s
	});
});
function _({ value: e, onChange: t, options: n, className: r, placeholder: i }) {
	return /* @__PURE__ */ s("div", {
		className: c("relative", r),
		children: [/* @__PURE__ */ s("select", {
			value: e,
			onChange: (e) => t(e.target.value),
			className: c(f, "h-11 w-full appearance-none pr-9"),
			children: [i === void 0 ? null : /* @__PURE__ */ o("option", {
				value: "",
				children: i
			}), n.map((e) => /* @__PURE__ */ o("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value))]
		}), /* @__PURE__ */ o("svg", {
			className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-4 text-ink-3",
			viewBox: "0 0 16 16",
			fill: "none",
			children: /* @__PURE__ */ o("path", {
				d: "M4 6l4 4 4-4",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})]
	});
}
function v({ value: e, onChange: t, options: n, multi: r, disabled: i, label: a }) {
	let s = new Set(Array.isArray(e) ? e : e ? [e] : []);
	return /* @__PURE__ */ o("div", {
		className: "flex flex-wrap gap-2",
		children: n.map((e) => {
			let l = s.has(e);
			return /* @__PURE__ */ o("button", {
				type: "button",
				"aria-pressed": l,
				disabled: i?.includes(e),
				onClick: () => {
					if (r) {
						let r = new Set(s);
						l ? r.delete(e) : r.add(e), t(n.filter((e) => r.has(e)));
					} else t(e);
				},
				className: c("h-10 rounded-full border px-4 text-sm transition disabled:pointer-events-none disabled:opacity-60 disabled:line-through coarse:h-11", l ? "border-ember bg-ember-tint text-ink" : "border-input bg-card text-ink-2 hover:border-ink-4 hover:text-ink"),
				children: a ? a(e) : e
			}, e);
		})
	});
}
var y = "cubic-bezier(0.3, 0.7, 0.2, 1)";
function b({ value: e, onChange: t, options: n, label: l }) {
	let u = i(/* @__PURE__ */ new Map()), [d, f] = a(null);
	return r(() => {
		let t = u.current.get(e);
		if (!t) return;
		let n = () => f({
			x: t.offsetLeft,
			w: t.offsetWidth
		});
		n();
		let r = new ResizeObserver(n);
		return r.observe(t), () => r.disconnect();
	}, [e]), /* @__PURE__ */ s("div", {
		role: "tablist",
		"aria-label": l,
		className: "relative inline-flex items-center rounded-full bg-paper-2 p-0.5 ring-1 ring-border-soft",
		children: [d ? /* @__PURE__ */ o("span", {
			"aria-hidden": "true",
			className: "absolute top-0.5 bottom-0.5 left-0 rounded-full bg-card shadow-sm motion-reduce:transition-none",
			style: {
				width: d.w,
				transform: `translateX(${d.x}px)`,
				transition: `transform 300ms ${y}, width 300ms ${y}`
			}
		}) : null, n.map((n) => {
			let r = n.id === e;
			return /* @__PURE__ */ o("button", {
				ref: (e) => {
					e ? u.current.set(n.id, e) : u.current.delete(n.id);
				},
				type: "button",
				role: "tab",
				"aria-selected": r,
				onClick: () => t(n.id),
				className: c("relative h-8 whitespace-nowrap rounded-full px-4 font-medium text-[0.875rem] transition-colors motion-reduce:transition-none coarse:h-9", r ? "text-ink" : "text-ink-3 hover:text-ink-2"),
				children: n.label
			}, n.id);
		})]
	});
}
function x({ checked: e, onChange: t, label: n, disabled: r }) {
	return /* @__PURE__ */ o("button", {
		type: "button",
		role: "switch",
		"aria-checked": e,
		"aria-label": n,
		disabled: r,
		onClick: () => t(!e),
		className: c("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] disabled:pointer-events-none disabled:opacity-60", e ? "bg-primary" : "bg-paper-3"),
		children: /* @__PURE__ */ o("span", { className: c("inline-block size-5 rounded-full bg-white shadow-sm transition-transform", e ? "translate-x-[22px]" : "translate-x-[2px]") })
	});
}
function S({ children: e, hint: t, required: n }) {
	return /* @__PURE__ */ s("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ s("div", {
			className: "font-medium text-[0.875rem] text-ink",
			children: [e, n ? /* @__PURE__ */ o("span", {
				className: "ml-1 text-ember",
				children: "*"
			}) : null]
		}), t ? /* @__PURE__ */ o("div", {
			className: "mt-0.5 text-[0.8125rem] text-ink-3",
			children: t
		}) : null]
	});
}
function C({ className: e }) {
	return /* @__PURE__ */ s("svg", {
		className: c("size-5 animate-spin", e),
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ o("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			stroke: "currentColor",
			strokeOpacity: "0.2",
			strokeWidth: "3"
		}), /* @__PURE__ */ o("path", {
			d: "M21 12a9 9 0 0 0-9-9",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round"
		})]
	});
}
function w({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ o("div", {
		className: c("wizard-card rounded-xl bg-card shadow-soft ring-1 ring-border-soft", e),
		...n,
		children: t
	});
}
function T({ children: e, tone: t = "neutral", icon: n, title: r }) {
	return /* @__PURE__ */ s("span", {
		title: r,
		className: c("inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 font-medium text-[0.75rem]", t === "neutral" && "bg-paper-2 text-ink-2", t === "live" && "bg-moss-tint text-moss", t === "warn" && "bg-amber-tint text-ink-2", t === "ember" && "bg-ember-tint text-ember-strong"),
		children: [n ?? (t === "live" ? /* @__PURE__ */ o("span", { className: "size-1.5 rounded-full bg-moss" }) : null), e]
	});
}
function E({ open: t, onClose: r, title: a, children: l, wide: u, bare: f, height: p = "auto" }) {
	let m = i(null);
	return n(() => {
		let e = m.current;
		e && (t && !e.open ? (e.showModal(), e.querySelector("[data-autofocus]")?.focus()) : !t && e.open && e.close());
	}, [t]), n(() => {
		let e = m.current;
		if (!e || !t || f || p === "tall") return;
		let n = 0, r = () => {
			n = Math.max(n, e.getBoundingClientRect().height), e.style.minHeight = `${Math.min(n, window.innerHeight - 32)}px`;
		}, i = new ResizeObserver(r);
		return i.observe(e), window.addEventListener("resize", r), () => {
			i.disconnect(), window.removeEventListener("resize", r), e.style.minHeight = "";
		};
	}, [
		t,
		f,
		p
	]), /* @__PURE__ */ o("dialog", {
		ref: m,
		onClose: r,
		onClick: (e) => {
			e.target === m.current && r();
		},
		className: c("m-auto p-0 text-ink backdrop:bg-[oklch(20%_0.01_60/0.28)] backdrop:backdrop-blur-[2px]", "max-sm:m-0 max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:max-w-none", f ? "w-[calc(100%-48px)] overflow-visible bg-transparent" : "max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] overflow-y-auto overscroll-contain rounded-2xl bg-card shadow-overlay max-sm:rounded-none max-sm:pt-[env(safe-area-inset-top)] max-sm:pb-[env(safe-area-inset-bottom)]", u === "page" ? "sm:max-w-4xl" : u ? "sm:max-w-2xl" : "sm:max-w-md", !f && p === "tall" && "sm:h-[min(calc(100dvh-32px),56rem)]"),
		children: t && f ? l : t ? /* @__PURE__ */ s("div", {
			className: "p-5 sm:p-7",
			children: [a ? /* @__PURE__ */ s("div", {
				className: "mb-5 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ o("h2", {
					className: "min-w-0 font-display font-semibold text-xl",
					children: a
				}), /* @__PURE__ */ o(d, {
					label: e("common.close"),
					onClick: r,
					className: "-mt-1.5 -mr-2",
					children: /* @__PURE__ */ o("svg", {
						viewBox: "0 0 16 16",
						fill: "none",
						className: "size-4",
						"aria-hidden": "true",
						children: /* @__PURE__ */ o("path", {
							d: "M4 4l8 8M12 4l-8 8",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				})]
			}) : null, l]
		}) : null
	});
}
function D({ children: e }) {
	return /* @__PURE__ */ o("div", {
		className: "py-16 text-center text-ink-3",
		children: e
	});
}
function O({ text: e }) {
	return e.split(/(https?:\/\/[^\s)]+)/).map((e, t) => t % 2 ? /* @__PURE__ */ o("a", {
		href: e,
		target: "_blank",
		rel: "noreferrer",
		className: "font-medium text-ink underline underline-offset-2",
		children: new URL(e).host
	}, e) : e);
}
//#endregion
export { u as Button, w as Card, T as Chip, E as Dialog, D as Empty, d as IconButton, m as Input, S as Label, O as LinkedText, v as Segmented, _ as Select, C as Spinner, h as Swatch, x as Switch, b as Tabs, g as Textarea, c as cn };

//# sourceMappingURL=ui.js.map