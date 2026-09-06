// Mobile deck build sanity: isMobile()=true -> one page per sheet, bar shows "1 / n"
const { PUBLIC_HTML } = require("C:/Users/nima/nima-portfolio/pages/public.js");
const si = PUBLIC_HTML.indexOf("<script>") + 8, ei = PUBLIC_HTML.indexOf("</script>");
const js = PUBLIC_HTML.slice(si, ei);

const elMap = {};
function mkEl() {
  return {
    className: "", style: { setProperty() {} }, innerHTML: "", textContent: "", value: "",
    children: [], appendChild(c) { this.children.push(c); return c },
    removeChild(c) { this.children = this.children.filter(x => x !== c) },
    querySelectorAll(sel) { return sel === ".pgn" ? [{ textContent: "" }, { textContent: "" }] : [] },
    classList: { _s: new Set(), add(...a) { a.forEach(x => this._s.add(x)) }, remove(...a) { a.forEach(x => this._s.delete(x)) }, contains(x) { return this._s.has(x) } },
    addEventListener() {}, dispatch() {},
    getBoundingClientRect() { return { left: 0, width: 400 } },
    onclick: null, disabled: false, loading: "", alt: "", src: "", complete: false, naturalWidth: 0,
    offsetLeft: 50, offsetTop: 50,
  };
}
global.document = {
  getElementById(id) { return elMap[id] || (elMap[id] = mkEl()) },
  createElement() { return mkEl() },
  addEventListener() {}, body: { style: {} },
  querySelector: () => null,
};
global.window = { matchMedia: (q) => ({ matches: q.includes("640") }), innerWidth: 390, AudioContext: null };
global.Image = function () { return mkEl() };
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ ok: true }) });
global.performance = { now: () => 0 };
global.requestAnimationFrame = () => 1;

eval(js);

PHOTOS = [
  { id: "1", key: "img:a", name: "p1", cat: "c1", desc: "" },
  { id: "2", key: "img:b", name: "p2", cat: "c1", desc: "" },
  { id: "3", key: "img:c", name: "p3", cat: "c1", desc: "" },
];
CATS = [{ id: "c1", name: "Photography" }];
BOOKS = [{ title: "Photobook", cat: "c1", arch: false }];
BOOK_CUR = BOOKS[0];
COVER_OPEN = true;

buildBook();
console.log("isMobile:", isMobile());
console.log("sheets:", B_ELS.length, "(pages:", B_PAGES.length, ") — should be EQUAL on mobile");
const sheet0 = B_ELS[0];
const fronts = sheet0.children.filter(c => c.className.indexOf("front") > -1);
const backs = sheet0.children.filter(c => c.className.indexOf("back") > -1);
console.log("sheet0 has empty back face:", backs.length === 1 && backs[0].children.length === 0);
updateBar();
console.log("bar text @cover:", el("bpage").textContent);
flip(1);
console.log("bar after 1 flip:", el("bpage").textContent, "(want: 1 / 4)");
console.log("B_CUR:", B_CUR);
flip(1);
console.log("bar after 2 flips:", el("bpage").textContent, "(want: 2 / 4)");
