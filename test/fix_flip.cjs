// fix flip gate: flip() itself must respect COVER_OPEN
const fs = require("fs");
const p = "C:/Users/nima/nima-portfolio/pages/public.js";
let src = fs.readFileSync(p, "utf8");
const oldFlip = "function flip(dir){\n  if(dir>0&&B_CUR<B_ELS.length){";
const newFlip = "function flip(dir){\n  if(!COVER_OPEN||WIPING)return;\n  if(dir>0&&B_CUR<B_ELS.length){";
if (!src.includes(oldFlip)) { console.error("pattern not found"); process.exit(1); }
src = src.replace(oldFlip, newFlip);
fs.writeFileSync(p, src);
console.log("flip() gated on COVER_OPEN/WIPING");
