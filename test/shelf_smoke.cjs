// Shelf two-book flow smoke test
const { PUBLIC_HTML } = require("C:/Users/nima/nima-portfolio/pages/public.js");
const si = PUBLIC_HTML.indexOf("<script>") + 8, ei = PUBLIC_HTML.indexOf("</script>");
const js = PUBLIC_HTML.slice(si, ei);

const elMap = {};
function mkEl() {
  const L = {};
  return {
    className: "", style: { setProperty(k, v) { this[k] = v; } }, innerHTML: "", textContent: "", value: "", children: [],
    appendChild(c) { c.parentNode = this; this.children.push(c); return c },
    removeChild(c) { this.children = this.children.filter(x => x !== c) },
    querySelectorAll(sel) { return sel === ".pgn" ? [{ textContent: "" }, { textContent: "" }] : this.children.filter(c => c.className === "d") },
    classList: { _s: new Set(), add(...a) { a.forEach(x => this._s.add(x)) }, remove(...a) { a.forEach(x => this._s.delete(x)) }, contains(x) { return this._s.has(x) } },
    addEventListener(t, fn) { (L[t] = L[t] || []).push(fn) },
    dispatch(t, ev) { (L[t] || []).forEach(fn => fn(ev || {})) },
    getBoundingClientRect() { return { left: 0, width: 800 } },
    onclick: null, disabled: false, loading: "", alt: "", src: "", complete: false, naturalWidth: 0,
    offsetLeft: 100, offsetTop: 100, id: "",
  };
}
global.document = {
  getElementById(id) { return elMap[id] || (elMap[id] = mkEl()) },
  createElement() { return mkEl() },
  addEventListener() {}, body: { style: {} },
};
global.Image = function () { return mkEl() };
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ ok: true }) });
let T = 0;
global.performance = { now: () => T };
global.requestAnimationFrame = () => 1;
global.window = { AudioContext: null, webkitAudioContext: null };

eval(js);

PHOTOS = [
  { id: "1", key: "img:a", name: "shot1", cat: "photoCat", desc: "" },
  { id: "2", key: "img:b", name: "render1", cat: "archCat", desc: "" },
  { id: "3", key: "img:c", name: "shot2", cat: "photoCat", desc: "" },
];
CATS = [{ id: "photoCat", name: "Photography" }, { id: "archCat", name: "3D Art" }];
TITLE = "Nima Asbagh";

// build BOOKS the same way boot does
BOOKS = [
  { title: "Architecture", cat: "archCat", arch: true },
  { title: "Photobook", cat: "photoCat", arch: false },
];

setView("book");
const shelf = el("shelf");
console.log("shelf books rendered:", shelf.children.length, "(want 2)");
console.log("bookstage hidden (no open class):", el("bookwrap").className.indexOf("open") === -1);

// pick the architecture book
pickBook(BOOKS[0]);
console.log("after pick: BOOK_CUR:", BOOK_CUR.title, "| wrap open:", el("bookwrap").className.indexOf("open") > -1);
console.log("arch pages:", B_PAGES.length, "(cover+2 photos+fin=4... 1+2=3 odd, no fin)", B_PAGES.length === 3 ? "OK" : "check");
const frost = document.getElementById("frost");
console.log("frost has arch class:", frost.className.indexOf("arch") > -1);
const grains = frost.querySelectorAll(".d");
console.log("grains:", grains.length, "(want 90)");

// pick the photobook instead
pickBook(BOOKS[1]);
const frost2 = document.getElementById("frost");
console.log("photobook frost NOT arch:", frost2.className.indexOf("arch") === -1);

// wipe and flip
el("book").onclick({ stopPropagation() {}, clientX: 700 });
frost2.dispatch("animationend");
el("book").onclick({ stopPropagation() {}, clientX: 700 });
console.log("after open+flip: B_CUR:", B_CUR, "(want 1)");

// back to shelf
backToShelf();
console.log("back: BOOK_CUR null:", BOOK_CUR === null, "| wrap not open:", el("bookwrap").className.indexOf("open") === -1);
console.log("bback hidden:", el("bback").style.display === "none");
