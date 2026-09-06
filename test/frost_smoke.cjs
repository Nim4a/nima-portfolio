// Frost + two-stage open behavior smoke test (stub DOM, module import)
const { PUBLIC_HTML } = require("C:/Users/nima/nima-portfolio/pages/public.js");
const si = PUBLIC_HTML.indexOf("<script>") + 8, ei = PUBLIC_HTML.indexOf("</script>");
const js = PUBLIC_HTML.slice(si, ei);

const elMap = {};
function mkEl() {
  const listeners = {};
  return {
    className: "", style: { setProperty() {} }, innerHTML: "", textContent: "", value: "",
    children: [], id: "", parentNode: null,
    appendChild(c) { c.parentNode = this; this.children.push(c); return c; },
    removeChild(c) { this.children = this.children.filter(x => x !== c); },
    querySelectorAll() { return [{ textContent: "" }, { textContent: "" }]; },
    classList: {
      _s: new Set(),
      add(...a) { a.forEach(x => this._s.add(x)) },
      remove(...a) { a.forEach(x => this._s.delete(x)) },
      contains(x) { return this._s.has(x) },
    },
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn) },
    dispatch(t, ev) { (listeners[t] || []).forEach(fn => fn(ev || {})) },
    getBoundingClientRect() { return { left: 0, width: 100 } },
    onclick: null, disabled: false, loading: "", alt: "", src: "",
    complete: false, naturalWidth: 0,
  };
}
global.document = {
  getElementById(id) { return elMap[id] || (elMap[id] = mkEl()) },
  createElement() { return mkEl() },
  addEventListener() {},
  body: { style: {} },
};
global.Image = function () { return mkEl() };
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ ok: true }) });

eval(js);

PHOTOS = Array.from({ length: 6 }, (_, i) => ({ id: String(i), key: "img:x" + i, name: "p" + i, cat: "c1", desc: "" }));
CATS = [{ id: "c1", name: "Photography", slug: "photo" }];
TITLE = "Nima Asbagh";
CUR = "all";

buildBook();

// 1) frost exists on cover before open
let frost = document.getElementById("frost");
console.log("frost present initially:", !!frost);
console.log("COVER_OPEN initially:", COVER_OPEN);

// 2) flip attempts gated before wipe
flip(1);
console.log("flip gated (B_CUR still 0):", B_CUR === 0);

// 3) click 1 = wipe
el("book").onclick({ stopPropagation() {}, clientX: 90 });
console.log("click1 -> WIPING:", WIPING, "| COVER_OPEN (before animend):", COVER_OPEN);

// 4) simulate animationend
frost = document.getElementById("frost");
// our stub addEventListener stored the animationend handler; fire it
frost.dispatch("animationend");
console.log("after animationend -> COVER_OPEN:", COVER_OPEN, "| WIPING:", WIPING);

// 5) click 2 = flip opens the book
el("book").onclick({ stopPropagation() {}, clientX: 90 });
console.log("click2 -> B_CUR:", B_CUR, "(should be 1)");

// 6) rebuild (e.g. category change) keeps cover open, no frost
buildBook();
console.log("rebuild -> frost absent:", !document.getElementById("frost"), "| COVER_OPEN persists:", COVER_OPEN);
