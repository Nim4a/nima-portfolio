// Cyclone physics sanity: one grain headless, print trajectory
const { PUBLIC_HTML } = require("C:/Users/nima/nima-portfolio/pages/public.js");
const si = PUBLIC_HTML.indexOf("<script>") + 8, ei = PUBLIC_HTML.indexOf("</script>");
const js = PUBLIC_HTML.slice(si, ei);

const p0 = js.indexOf("var P_DUST");
const p1 = js.indexOf("/* ── wind sound effect");
const phys = js.slice(p0, p1);

global.window = { AudioContext: null, webkitAudioContext: null };
let T = 0;
global.performance = { now: () => T };
const RAFQ = [];
global.requestAnimationFrame = (fn) => { RAFQ.push(fn); return 1; };
global.document = { getElementById: () => null, querySelectorAll: () => [] };

eval(phys);

// run step() math manually for one grain at the cover center-ish
let x = 300, y = 200, vx = 0, vy = 0, m = 0.8, spin = 0, i = 0;

let t = 0;
const dt = 1 / 60;
let minY = y, maxXspread = 0;
const samples = [];
for (let s = 0; s < 210; s++) {
  t += dt;
  const el2p = t;
  const G = 620;
  const VS = 1500 * Math.min(1, el2p / 0.25) * Math.exp(-el2p / 1.6);
  const CX = STAGE_W / 2, CY = STAGE_H * 0.42;
  const rx = x - CX, ry = y - CY;
  const d = Math.max(26, Math.sqrt(rx * rx + ry * ry));
  const tx = -ry / d, ty = rx / d;
  const swirl = VS * (0.5 + 0.5 * m);
  const inward = VS * 0.16;
  const lift = VS * 0.55;
  vx += (tx * swirl - rx / d * inward) * dt;
  vy += (ty * swirl - ry / d * inward - lift) * dt;
  spin += dt * 4;
  vx += (Math.sin(spin * 1.7 + i) * 140) * dt;
  vy += (Math.cos(spin * 1.3 + i * 0.7) * 90) * dt;
  vy += G * Math.min(1, el2p / 1.1) * dt;
  const f = Math.exp(-(1.05 / m) * dt);
  vx *= f; vy *= f;
  x += vx * dt; y += vy * dt;
  minY = Math.min(minY, y);
  maxXspread = Math.max(maxXspread, Math.abs(x - CX));
  if (s % 30 === 0) samples.push(`t=${t.toFixed(2)} x=${x.toFixed(0)} y=${y.toFixed(0)} spd=${Math.sqrt(vx*vx+vy*vy).toFixed(0)}`);
}
console.log(samples.join("\n"));
console.log("rises:", minY < 150 ? "YES (grain lifts up)" : "NO");
console.log("max height gain:", (200 - minY).toFixed(0), "px above start");
console.log("spread from axis:", maxXspread.toFixed(0), "px (should be > 100)");
