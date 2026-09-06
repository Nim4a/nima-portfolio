// Syntax-check the inline <script> blocks of both served pages.
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

function extractScript(htmlFile) {
  const src = fs.readFileSync(htmlFile, "utf-8");
  const m = src.match(/<script>([\s\S]*?)<\/script>/);
  return m ? m[1] : "";
}

// The pages are ES modules exporting template literals; eval-import them via esbuild first
for (const f of ["worker.js", "pages/public.js", "pages/admin.js"]) {
  try {
    esbuild.buildSync({ entryPoints: [f], bundle: false, write: false, format: "esm" });
    console.log("ESM OK:", f);
  } catch (e) {
    console.log("ESM FAIL:", f, String(e.message).split("\n")[0]);
    process.exitCode = 1;
  }
}

// load modules through esbuild to get the HTML strings, then parse the inline JS
async function main() {
  for (const [mod, name] of [["pages/public.js", "public"], ["pages/admin.js", "admin"]]) {
    const out = await esbuild.build({ entryPoints: [mod], bundle: true, write: false, format: "cjs", platform: "node" });
    const code = out.outputFiles[0].text;
    const mod2 = { exports: {} };
    new Function("module", "exports", "require", code)(mod2, mod2.exports, require);
    const HTML = name === "public" ? mod2.exports.PUBLIC_HTML : mod2.exports.ADMIN_HTML;
    const js = extractScriptFromText(HTML);
    try {
      esbuild.transformSync(js, { loader: "js" });
      console.log("inline <script> OK:", name, `(${js.length} chars)`);
    } catch (e) {
      console.log("inline <script> FAIL:", name, String(e.message).split("\n").slice(0, 4).join(" | "));
      process.exitCode = 1;
    }
  }
}
function extractScriptFromText(html) {
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  return m ? m[1] : "";
}
main();
