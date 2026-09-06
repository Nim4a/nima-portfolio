// Physics sanity: simulate step() math headless, print trajectory shape
const { PUBLIC_HTML } = require("C:/Users/nima/nima-portfolio/pages/public.js");
const si = PUBLIC_HTML.indexOf("<script>") + 8, ei = PUBLIC_HTML.indexOf("</script>");
const js = PUBLIC_HTML.slice(si, ei);

// grab the physics section only
const p0 = js.indexOf("var P_DUST");
const p1 = js.indexOf("/* ── virtual photobook ── */");
const phys = js.slice(p0, p1);

// run it against fake DOM/perf
global.performance = { now: () => SIM_T * 1000 };
let SIM_T = 0;
global.requestAnimationFrame = (fn) => { RAFQ.push(fn); return 1; };
const RAFQ = [];
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
};

eval(phys);

// simulate ONE grain with the same formulas, 60fps
let x = 200, y = 100, vx = 120, vy = -380, m = 0.8, turb = 90, tphase = 0;
const G = 680, k = 1.15, dt = 1 / 60;
let peakY = y, peakT = 0, t = 0;
const samples = [];
for (let i = 0; i < 200; i++) {
  tphase += dt * 3.2;
  vx += (turb * Math.sin(tphase)) * dt;
  vy += (turb * Math.cos(tphase * 0.8) + G) * dt;
  const f = Math.exp(-(k / m) * dt);
  vx *= f; vy *= f;
  x += vx * dt; y += vy * dt;
  t += dt;
  if (y < peakY) { peakY = y; peakT = t; }
  if (i % 20 === 0) samples.push(`t=${t.toFixed(2)}s y=${y.toFixed(0)} vy=${vy.toFixed(0)}`);
}
console.log(samples.join("\n"));
console.log("apex at t =", peakT.toFixed(2), "s (should be >0.3 <1.5)");
console.log("final vy =", vy.toFixed(0), "px/s (terminal-ish, should be positive & < 700)");
console.log("still rising at first sample:", samples[0]);
