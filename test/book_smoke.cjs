const html = require("fs").readFileSync(process.env.TMP + "/site.html", "utf8");
const si = html.indexOf("<script>") + 8, ei = html.indexOf("</script>");
let js = html.slice(si, ei);

const elMap = {};
function mkEl() {
  return {
    className: "", style: { setProperty(k, v) { this[k] = v; } }, innerHTML: "", textContent: "", value: "", children: [],
    appendChild(c) { this.children.push(c); },
    querySelectorAll() { return [{ textContent: "" }, { textContent: "" }]; },
    classList: { add() {}, remove() {}, contains() { return false; } },
    addEventListener() {}, scrollIntoView() {},
    getBoundingClientRect() { return { left: 0, width: 100 }; },
    onclick: null,
  };
}
global.document = {
  getElementById(id) { return elMap[id] || (elMap[id] = mkEl()); },
  createElement() { return mkEl(); },
  addEventListener() {},
  body: { style: {} },
};
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ ok: true }) });

eval(js);

PHOTOS = [{ id: "1", key: "img:1dffb0e2", name: "Test", cat: "c1", desc: "" }];
CATS = [{ id: "c1", name: "Photography", slug: "photo" }];
CUR = "all";

buildBook();
console.log("sheets:", B_ELS.length, "pages:", B_PAGES.length,
  "cover-first:", !!B_PAGES[0].cover, "fin-last:", !!B_PAGES[B_PAGES.length - 1].fin);
flip(1); console.log("after flip1 B_CUR:", B_CUR);
flip(1); console.log("after flip2 B_CUR:", B_CUR);
flip(-1); flip(-1); console.log("after 2x back B_CUR:", B_CUR);

// 29-photo sanity: pages = 1 cover + 29 + maybe fin = 30/31
PHOTOS = Array.from({ length: 29 }, (_, i) => ({ id: String(i), key: "img:x" + i, name: "p" + i, cat: "c1", desc: "" }));
buildBook();
console.log("29 photos -> pages:", B_PAGES.length, "sheets:", B_ELS.length);
// filter change re-build
CUR = "c1";
buildBook();
console.log("filtered book pages:", B_PAGES.length);
