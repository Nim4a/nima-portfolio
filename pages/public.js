// Public portfolio page — minimal English (LTR), grid + virtual flip photobook
export const PUBLIC_HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portfolio</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='6' y='18' width='52' height='36' rx='8' fill='none' stroke='%23141412' stroke-width='5'/%3E%3Ccircle cx='32' cy='36' r='10' fill='none' stroke='%23141412' stroke-width='5'/%3E%3Cpath d='M22 18l6-8h8l6 8' fill='none' stroke='%23141412' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>
:root{--bg:#fafaf8;--tx:#141412;--mut:#8a8a85;--line:#e7e5e0;--pad:clamp(20px,5vw,72px)}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--tx);font-family:'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif;font-weight:300}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
::selection{background:#141412;color:#fafaf8}
header{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:16px var(--pad);background:rgba(250,250,248,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.logo{font-size:13px;letter-spacing:.3em;font-weight:500;text-transform:uppercase}
.hnav{display:flex;gap:26px;font-size:12px;letter-spacing:.08em;color:var(--mut);text-transform:uppercase}
.hnav a,.hnav button{background:none;border:none;cursor:pointer;font-family:inherit;color:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:0}
.hnav a:hover,.hnav button:hover{color:var(--tx)}
.hero{position:relative;padding:calc(var(--pad)*1.25) var(--pad) calc(var(--pad)*0.55)}
.hero::before{content:"";position:absolute;inset:-12% -6% auto -6%;height:130%;background:radial-gradient(closest-side at 28% 32%,rgba(20,20,18,.055),transparent 72%),radial-gradient(closest-side at 74% 58%,rgba(20,20,18,.04),transparent 70%);pointer-events:none}
.dust{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.dust i{position:absolute;bottom:-14px;width:3px;height:3px;border-radius:50%;background:rgba(20,20,18,.2);opacity:0;animation:float 9s linear infinite}
.dust i:nth-child(3n){width:2px;height:2px}
.dust i:nth-child(4n){animation-duration:14s}
.dust i:nth-child(5n){animation-duration:7.5s}
.dust i.g{width:6px;height:6px;background:radial-gradient(circle,rgba(20,20,18,.3),rgba(20,20,18,0) 72%);filter:blur(.6px);animation-duration:12s}
@keyframes float{0%{transform:translate(0,0) rotate(0);opacity:0}6%{opacity:1}88%{opacity:.6}100%{transform:translate(var(--dx,30px),-84vh) rotate(260deg);opacity:0}}
/* hero-hover mode: grains become square RGB pixels with glow */
.dust.px i{border-radius:0;background:var(--pc,rgba(20,20,18,.2))!important;width:4px!important;height:4px!important;box-shadow:0 0 7px 1px var(--pc,rgba(20,20,18,.2))}
.dust.px i.g{width:6px!important;height:6px!important}
@keyframes pixup{0%{filter:none}100%{filter:none}}
.hero::before{content:"";position:absolute;inset:-12% -6% auto -6%;height:130%;background:radial-gradient(closest-side at 28% 32%,rgba(20,20,18,.07),transparent 72%),radial-gradient(closest-side at 74% 58%,rgba(20,20,18,.055),transparent 70%);pointer-events:none;animation:breath 9s ease-in-out infinite alternate}
@keyframes breath{from{opacity:.65;transform:scale(1)}to{opacity:1;transform:scale(1.06)}}
.hero h1{font-size:clamp(40px,7.2vw,86px);font-weight:100;line-height:1.22;padding-bottom:.1em;margin-bottom:-.06em;letter-spacing:-.01em;white-space:nowrap;background:linear-gradient(105deg,#141412 0%,#141412 52%,#4a4a44 78%,#141412 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:rise .8s ease forwards,sheen 7s ease-in-out 1.2s infinite}
@keyframes sheen{0%{background-position:120% 0}50%{background-position:-40% 0}100%{background-position:120% 0}}
.hero p{margin-top:18px;color:var(--mut);font-size:clamp(14px,1.8vw,17px);letter-spacing:.06em;text-transform:uppercase}
.frow{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:10px 24px;padding:0 var(--pad) 26px;border-bottom:1px solid var(--line);margin-bottom:var(--pad);scroll-margin-top:70px}
.filters{display:flex;flex-wrap:wrap;gap:6px 26px}
.filters button{background:none;border:none;font-family:inherit;font-size:13px;letter-spacing:.04em;color:var(--mut);cursor:pointer;padding:6px 0;position:relative}
.filters button:hover{color:var(--tx)}
.filters button.on{color:var(--tx)}
.filters button.on:after{content:"";position:absolute;bottom:0;left:0;right:0;height:1.5px;background:var(--tx)}
.vtog{display:flex;gap:10px;align-items:baseline;font-size:12px;color:var(--mut);letter-spacing:.08em;text-transform:uppercase}
.vtog button{background:none;border:none;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);padding:0}
.vtog button.on{color:var(--tx);border-bottom:1.5px solid var(--tx)}
.vtog button:hover{color:var(--tx)}
/* grid view */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 var(--pad) var(--pad)}
@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.grid{grid-template-columns:1fr}}
.cell{position:relative;overflow:hidden;background:#eceae6;aspect-ratio:1;cursor:pointer}
.cell img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.cell:hover img{transform:scale(1.035)}
.cell .cap{position:absolute;inset-inline:0;bottom:0;padding:44px 14px 12px;background:linear-gradient(to top,rgba(0,0,0,.62),transparent);color:#fff;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:0;transition:opacity .3s}
.cell:hover .cap{opacity:1}
.empty{padding:90px var(--pad);text-align:center;color:var(--mut);font-size:14px;display:none}
/* book view */
.bookwrap{display:none;padding:0 var(--pad) var(--pad)}
.bookwrap.on{display:block}
.bookstage{position:relative;width:min(94vw,1060px);margin:0 auto}
.book{position:relative;width:100%;aspect-ratio:2/1.38;perspective:2600px;user-select:none;-webkit-user-select:none;touch-action:pan-y;cursor:pointer}
.book::before{content:"";position:absolute;top:-2%;bottom:-2%;left:50%;width:14px;transform:translateX(-50%);background:linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.10),rgba(0,0,0,0));z-index:0;pointer-events:none}
.bookwrap.on .book{animation:bookin 1.1s cubic-bezier(.22,.9,.3,1) both}
@keyframes bookin{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:none}}
.sheet{position:absolute;top:0;bottom:0;left:50%;width:50%;transform-style:preserve-3d;transform-origin:left center;transition:transform .8s cubic-bezier(.32,.02,.25,1),box-shadow .8s ease}
.sheet.flipped{transform:rotateY(-180deg);box-shadow:-14px 12px 34px rgba(20,20,18,.16)}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:#fdfdfb;display:flex;flex-direction:column;padding:20px 26px 14px;overflow:hidden}
.face.back{transform:rotateY(180deg)}
.face .im{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}
.face .im img{max-width:100%;max-height:100%;object-fit:contain}
.face .cap{height:32px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#9a9a95;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.face .cap b{font-weight:400;color:#6d6d68}
.face .pgn{position:absolute;bottom:6px;left:0;right:0;text-align:center;font-size:9px;letter-spacing:.2em;color:#b5b5b0}
.face.fr::after{content:"";position:absolute;top:0;bottom:0;left:0;width:26px;background:linear-gradient(to right,rgba(0,0,0,.075),rgba(0,0,0,0))}
.face.bk::after{content:"";position:absolute;top:0;bottom:0;right:0;width:26px;background:linear-gradient(to left,rgba(0,0,0,.075),rgba(0,0,0,0))}
.face.cover{background:#fdfdfb;align-items:center;justify-content:center}
.frost{position:absolute;inset:0;z-index:5;cursor:pointer;background:
 radial-gradient(ellipse 120px 90px at 30% 26%,rgba(253,253,251,.75),transparent 70%),
 radial-gradient(ellipse 150px 110px at 70% 62%,rgba(253,253,251,.7),transparent 70%),
 linear-gradient(160deg,rgba(232,229,222,.5),rgba(216,212,204,.62));
 opacity:1;transition:opacity 1.2s ease;backdrop-filter:blur(2.5px)}
.frost.sweep{animation:sweep 3s ease forwards}
@keyframes sweep{0%{opacity:1}30%{opacity:.9}100%{opacity:0}}
.frost.sweep .d{animation:none;will-change:transform,opacity}
.frost.off{opacity:0;pointer-events:none}
/* dense dust sitting on the cover */
.frost .d{position:absolute;border-radius:50%;background:rgba(20,20,18,.2);opacity:0;animation:dfloat 5s ease-in-out infinite}
.frost .d.big{background:radial-gradient(circle,rgba(20,20,18,.26),rgba(20,20,18,0) 72%)}
@keyframes dfloat{0%,100%{transform:translate(0,0)}50%{transform:translate(var(--wx,6px),var(--wy,-7px))}}
.frost.sweep{transition:none}
.frost .hint{position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#8a8a85;animation:pulse 2.2s ease-in-out infinite;transition:opacity .5s ease}
.frost.sweep .hint{opacity:0}
@keyframes pulse{0%,100%{opacity:.45}50%{opacity:1}}
.face.cover .cframe{position:absolute;inset:18px;border:1px solid #d8d6d0;pointer-events:none}
.face.cover .ct{position:relative;text-align:center}
.face.cover .ct h3{font-size:clamp(15px,2.6vw,26px);font-weight:300;letter-spacing:.55em;text-transform:uppercase;margin-right:-.55em}
.face.cover .ct p{margin-top:14px;font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:#9a9a95}
.face.cover .ct .yr{margin-top:34px;font-size:10px;letter-spacing:.3em;color:#b5b5b0}
.face.fin{align-items:center;justify-content:center}
.face.fin span{font-size:11px;letter-spacing:.5em;text-transform:uppercase;color:#9a9a95;margin-right:-.5em}
.bookbar{display:flex;justify-content:center;align-items:center;gap:26px;margin-top:22px}
.bookbar button{background:none;border:1px solid var(--line);color:var(--tx);font-family:inherit;font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:8px 20px;cursor:pointer;border-radius:2px}
.bookbar button:hover:not(:disabled){border-color:var(--tx)}
.bookbar button:disabled{opacity:.3;cursor:default}
.bookbar span{font-size:11px;letter-spacing:.18em;color:var(--mut);min-width:110px;text-align:center}
.bhint{text-align:center;margin-top:14px;font-size:10px;letter-spacing:.14em;color:#b5b5b0;text-transform:uppercase}
@media(max-width:640px){
  .book{aspect-ratio:1/1.42}
  .book::before{display:none}
  .face{padding:14px 16px 12px}
  /* MOBILE: single-page slide deck instead of the 3D spread.
     Each sheet carries its front page only; back face is repurposed as
     the "next" page sitting on top via z-index so the deck reads 1 page at a time. */
  .sheet{left:0;width:100%;transform:none!important;transform-origin:center;transition:transform .45s cubic-bezier(.3,.7,.3,1),opacity .4s ease}
  .sheet.flipped{transform:translateX(-108%)!important;opacity:0;pointer-events:none}
  .face.back{transform:none!important;position:absolute;inset:0;z-index:1}
  .sheet:not(.flipped) .face.back{display:none}
  .sheet.flipped .face.front{visibility:hidden}
}
/* loading shimmer + entrance */
.cell{background:linear-gradient(110deg,#eceae6 30%,#f4f2ee 50%,#eceae6 70%);background-size:200% 100%;animation:shim 1.8s linear infinite}
.cell.done{animation:none}
.cell img{opacity:0;transition:opacity .7s ease,transform .5s ease}
.cell img.ld{opacity:1}
.face .im{background:linear-gradient(110deg,#f0efec 30%,#f8f7f4 50%,#f0efec 70%);background-size:200% 100%;animation:shim 1.8s linear infinite}
.face .im.done{animation:none}
.face .im img{opacity:0;transition:opacity .7s ease}
.face .im img.ld{opacity:1}
@keyframes shim{to{background-position:-200% 0}}
.hero h1,.hero p{opacity:0;animation:rise .8s ease forwards}
.hero p{animation-delay:.15s}
@keyframes rise{from{transform:translateY(16px)}to{opacity:1;transform:none}}
.boot{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;gap:22px;align-items:center;justify-content:center;background:var(--bg);transition:opacity .6s}
.boot.off{opacity:0;pointer-events:none}
.ap{width:46px;height:46px;position:relative;animation:spin 2.4s linear infinite}
.ap b{position:absolute;top:0;left:50%;width:2.5px;height:13px;margin-left:-1.25px;background:var(--tx);border-radius:3px;transform-origin:50% 23px;opacity:.85}
.ap b:nth-child(2){transform:rotate(45deg)}
.ap b:nth-child(3){transform:rotate(90deg)}
.ap b:nth-child(4){transform:rotate(135deg)}
.ap b:nth-child(5){transform:rotate(180deg)}
.ap b:nth-child(6){transform:rotate(225deg)}
.ap b:nth-child(7){transform:rotate(270deg)}
.ap b:nth-child(8){transform:rotate(315deg)}
@keyframes spin{to{transform:rotate(360deg)}}
.boot p{font-size:10px;letter-spacing:.45em;text-transform:uppercase;color:#b5b5b0;margin-right:-.45em}
/* about / footer */
.about{display:grid;grid-template-columns:auto 1fr;gap:clamp(30px,5vw,72px);padding:var(--pad);border-top:1px solid var(--line);scroll-margin-top:70px;align-items:start}
.about .ahead{position:sticky;top:86px}
.about .ahead h2{font-size:13px;font-weight:400;letter-spacing:.24em;text-transform:uppercase;color:var(--mut)}
.about .pframe{position:relative;width:clamp(150px,18vw,220px);aspect-ratio:1;overflow:hidden;background:#eceae6;margin-top:22px}
.about .pframe img{width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .7s ease}
.about .pframe img.ld{opacity:1}
.about .abody{max-width:640px}
.about h2{font-size:13px;font-weight:400;letter-spacing:.24em;text-transform:uppercase;color:var(--mut)}
.about p{white-space:pre-wrap;color:#3f3f3c;line-height:2.05;font-size:15px;font-weight:300;max-width:640px}
.contactblk{margin-top:44px}
.contactblk h3{font-size:13px;font-weight:400;letter-spacing:.24em;text-transform:uppercase;color:var(--mut)}
.contactblk .cblurb{white-space:normal;margin-top:12px;color:#3f3f3c;line-height:1.9;font-size:14px;max-width:520px}
.contact{display:flex;flex-wrap:wrap;gap:14px 34px;margin-top:22px;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
.contact a{border-bottom:1px solid var(--line);padding-bottom:2px;color:#3f3f3c}
.contact a:hover{border-color:var(--tx);color:var(--tx)}
.contact a span{color:var(--mut);margin-left:7px}
footer{display:flex;justify-content:space-between;align-items:center;padding:20px var(--pad);border-top:1px solid var(--line);color:var(--mut);font-size:11px;letter-spacing:.1em;text-transform:uppercase}
.ftlinks{display:flex;gap:22px}
.ftlinks a{color:var(--mut);border-bottom:1px solid transparent;padding-bottom:1px}
.ftlinks a:hover{color:var(--tx);border-color:var(--tx)}
@media(max-width:560px){
  .about{grid-template-columns:1fr;gap:16px}
  header{padding:14px var(--pad)}
  .hnav{gap:16px}
  .hnav a,.hnav button{font-size:11px;letter-spacing:.05em}
  .logo{font-size:11px;letter-spacing:.22em}
  .hero{padding:calc(var(--pad)*1.2) var(--pad)}
  .hero h1{font-size:11.5vw;white-space:normal;line-height:1.06}
  .frow{flex-direction:column;align-items:flex-start;gap:14px}
  .vtog{width:100%;justify-content:flex-start}
  .grid{gap:10px}
  footer{flex-wrap:wrap;gap:10px 16px;justify-content:center;text-align:center}
  .ftlinks{order:3;width:100%;justify-content:center;gap:18px}
  footer span{flex:1;text-align:center}
  .lb .stage{padding:0 8px}
  .lb .meta{font-size:11px;padding:10px 16px 18px}
  .bookbar{gap:16px}
  .bookbar button{padding:8px 14px;font-size:10px}
  .contact{gap:10px 20px}
  .about p{font-size:14px;line-height:1.95}
  .contactblk .cblurb{font-size:13px}
}
/* bookshelf: two closed books — classic cloth hardcover, muted tones */
.shelf{display:none;justify-content:center;align-items:flex-end;gap:clamp(26px,6vw,90px);flex-wrap:wrap;padding:20px var(--pad) calc(var(--pad)*1.3)}
.bookwrap.on:not(.open) .shelf{display:flex}
.bookstage{display:none}
.bookwrap.open .bookstage{display:block}
.bookbar{display:none}
.bookwrap.open .bookbar{display:flex}
.bookwrap.on .sbook{animation:bookin 1s cubic-bezier(.22,.9,.3,1) both}
.sbook{position:relative;width:clamp(150px,18vw,205px);aspect-ratio:.66;cursor:pointer;transition:transform .45s ease}
.sbook:hover{transform:translateY(-8px)}
/* cloth cover: muted, light-washed cloth */
.sbook .sc{position:absolute;inset:0;background:#d8ccb6;box-shadow:0 26px 48px -22px rgba(20,20,18,.35);display:block}
.sbook.arch .sc{background:#c4ccd1}
.sbook.digital .sc{background:#cbc4d4}
.sbook .sc::before{content:"";position:absolute;inset:0;background:
 repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,rgba(0,0,0,.028) 1px 2px),
 repeating-linear-gradient(90deg,rgba(255,255,255,.038) 0 1px,rgba(0,0,0,.024) 1px 2px);
 background-size:3px 3px,3px 3px;mix-blend-mode:overlay}
.sbook .sc::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 90% 70% at 30% 22%,rgba(255,255,255,.16),transparent 65%),radial-gradient(ellipse 120% 100% at 75% 85%,rgba(0,0,0,.14),transparent 70%)}
/* spine: soft band */
.sbook .spine{position:absolute;top:0;bottom:0;right:0;width:11%;background:linear-gradient(90deg,rgba(0,0,0,.1),rgba(0,0,0,.26) 55%,rgba(0,0,0,.36));z-index:3}
.sbook .spine::before{content:"";position:absolute;top:0;bottom:0;left:24%;width:1px;background:rgba(255,255,255,.14)}
.sbook .spine::after{content:"";position:absolute;top:0;bottom:0;left:52%;width:1px;background:rgba(0,0,0,.22)}
/* embossed double frame */
.sbook .cframe{position:absolute;inset:11px;pointer-events:none;z-index:2}
.sbook .cframe::before{content:"";position:absolute;inset:0;border:1px solid rgba(255,255,255,.34)}
.sbook .cframe::after{content:"";position:absolute;inset:4px;border:1px solid rgba(0,0,0,.16)}
/* engraved vertical title — dark on light cloth */
.sbook h3{position:absolute;top:50%;left:47%;transform:translate(-50%,-50%) rotate(180deg);writing-mode:vertical-rl;font-size:clamp(14px,1.9vw,18px);font-weight:400;letter-spacing:.5em;margin:0;padding-left:.5em;white-space:nowrap;color:rgba(64,56,42,.82);text-shadow:0 1px 0 rgba(255,255,255,.35);z-index:2}
.sbook.arch h3{color:rgba(38,50,62,.82)}
.sbook.digital h3{color:rgba(56,46,74,.82)}
/* small year at the foot */
.sbook .yr{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-size:8.5px;letter-spacing:.32em;color:rgba(64,56,42,.55);z-index:2}
.sbook.arch .yr{color:rgba(38,50,62,.55)}
.sbook.digital .yr{color:rgba(56,46,74,.55)}
/* ribbon bookmark — soft muted tones */
.ribbon{position:absolute;bottom:-18px;left:15%;width:17px;height:52px;z-index:4;pointer-events:none;clip-path:polygon(0 0,100% 0,100% 100%,50% calc(100% - 9px),0 100%);background:linear-gradient(180deg,#cd6a5c,#a84a3d);box-shadow:0 5px 10px rgba(20,20,18,.26);transform:rotate(-3deg)}
.ribbon.blue{background:linear-gradient(180deg,#7ba3c4,#587e9e)}
.ribbon.olive{background:linear-gradient(180deg,#c2a94e,#9d8536)}
.shelfintro{text-align:center;padding:0 var(--pad) 4px;display:none}
.bookwrap.on:not(.open) .shelfintro{display:block}
.shelfintro p{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:#a9a9a3;margin-right:-.42em}
/* shelf line */
.shelf::after{content:"";display:block;width:min(86vw,760px);height:1px;background:linear-gradient(to right,transparent,#c9c6be 18%,#c9c6be 82%,transparent);margin:26px auto 0}
.face.cover{overflow:visible}
/* angular dust for the architecture book */
.frost.arch .d{border-radius:1px;background:rgba(35,48,66,.27);animation:dfloatA 5.5s ease-in-out infinite}
.frost.arch .d.big{background:rgba(35,48,66,.33)}
@keyframes dfloatA{0%,100%{transform:translate(0,0) rotate(var(--rot,0deg))}50%{transform:translate(var(--wx,6px),var(--wy,-7px)) rotate(calc(var(--rot,0deg) + 46deg))}}
/* pixels for the digital art book: RGB blocks that blink on/off */
.frost.dg .d{border-radius:0;background:var(--pc,#3a4226);width:3px;height:3px;animation:none}
.frost.dg .d.big{width:5px;height:5px}
@keyframes pixblink{
 0%{opacity:0}
 8%{opacity:.95}
 38%{opacity:.9}
 54%{opacity:0}
 100%{opacity:0}
}
@keyframes dfloatD{0%,100%{transform:translate(0,0)}50%{transform:translate(var(--wx,6px),var(--wy,-9px)) scale(1.3)}}
@media(max-width:560px){
  /* shelf: vertical stack of horizontal-facing books (titles read normally) */
  .shelf{flex-direction:column;align-items:center;gap:26px;padding-bottom:calc(var(--pad)*1.1)}
  .sbook{width:min(78vw,300px);aspect-ratio:1.45;cursor:pointer}
  .sbook .sc{display:flex;flex-direction:column;align-items:center;justify-content:center}
  .sbook .cframe{inset:12px}
  .sbook h3{position:static;transform:none;writing-mode:horizontal-tb;text-align:center;font-size:16px;letter-spacing:.34em;padding-left:.34em;margin-right:-.34em;white-space:normal;line-height:1.4}
  .sbook .yr{bottom:16px;font-size:9px;letter-spacing:.26em}
  .sbook .spine{width:8%}
  .ribbon{left:10%;width:16px;height:46px;bottom:-14px;transform:rotate(-3deg)}
  .shelfintro p{font-size:10px;letter-spacing:.3em;margin-right:-.3em}
  .shelf::after{margin:20px auto 0}
}
@media(max-width:640px){
  .bhint{font-size:11px;letter-spacing:.12em;color:#8a8a85}
  .bookbar{gap:12px;margin-top:16px}
  .bookbar button{padding:11px 18px;font-size:11px}
  /* clearer wipe hint on touch: bigger, pill, high contrast */
  .frost .hint{bottom:18px;font-size:11px;letter-spacing:.3em;color:#141412;background:rgba(253,253,251,.82);border:1px solid rgba(20,20,18,.25);border-radius:99px;padding:10px 18px;left:50%;right:auto;transform:translateX(-50%);white-space:nowrap}
  .frost{backdrop-filter:blur(1.2px)}
}
/* lightbox */
.lb{position:fixed;inset:0;z-index:50;background:rgba(10,10,9,.94);display:none;flex-direction:column}
.lb.open{display:flex}
.lb .bar{display:flex;justify-content:space-between;align-items:center;padding:16px var(--pad);color:#eee;font-size:12px;letter-spacing:.12em}
.lb .bar button{background:none;border:none;color:#eee;font-family:inherit;font-size:12px;letter-spacing:.12em;cursor:pointer;text-transform:uppercase}
.lb .stage{flex:1;display:flex;align-items:center;justify-content:center;padding:0 60px;min-height:0}
.lb .stage img{max-width:100%;max-height:100%;object-fit:contain}
.lb .meta{padding:14px var(--pad) 24px;color:#999;font-size:12px;text-align:center;line-height:1.9;letter-spacing:.04em}
.lb .meta b{color:#fff;font-weight:400;display:block;font-size:13px;text-transform:uppercase;letter-spacing:.12em}
.lb .nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:none;color:#fff;width:46px;height:46px;border-radius:50%;cursor:pointer;font-size:18px;transition:background .2s}
.lb .nav:hover{background:rgba(255,255,255,.2)}
.lb .prev{left:18px}
.lb .next{right:18px}
@media(max-width:560px){.lb .stage{padding:0 10px}.lb .nav{display:none}}
</style>
</head>
<body>
<div class="boot" id="boot"><div class="ap"><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div><p>loading</p></div>
<header>
  <div class="logo" id="hd-title">Portfolio</div>
  <nav class="hnav">
    <a href="#works">Works</a>
    <button id="nav-book">Photobook</button>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <section class="hero">
    <div class="dust" id="dust"></div>
    <h1 id="h-title"></h1>
    <p id="h-sub"></p>
  </section>
  <section id="works" class="frow">
    <nav class="filters" id="filters"></nav>
    <div class="vtog">
      <button id="vgrid" class="on">Grid</button>
      <span>·</span>
      <button id="vbook">Book</button>
    </div>
  </section>
  <div class="grid" id="grid"></div>
  <div class="empty" id="empty">No works in this category yet.</div>
  <section class="bookwrap" id="bookwrap">
    <div class="shelfintro" id="shelfintro"><p>Selected Works</p></div>
    <div class="shelf" id="shelf"></div>
    <div class="bookstage">
      <div class="book" id="book"></div>
    </div>
    <div class="bookbar">
      <button id="bback" style="display:none">‹ Shelf</button>
      <button id="bprev">‹ Prev</button>
      <span id="bpage"></span>
      <button id="bnext">Next ›</button>
    </div>
    <p class="bhint" id="bhint">Click a page or use arrow keys to flip</p>
  </section>
  <section class="about" id="about">
    <div class="ahead">
      <h2>About</h2>
      <div class="pframe" id="pframe"></div>
    </div>
    <div class="abody">
      <p id="about-text"></p>
      <div class="contactblk" id="contactblk">
        <h3>Contact Me</h3>
        <p class="cblurb">Whether you'd like to collaborate, discuss a project, or simply say hello, feel free to get in touch.</p>
        <div class="contact" id="contact"></div>
      </div>
    </div>
  </section>
</main>
<footer>
  <span id="ft-name"></span>
  <nav class="ftlinks" id="ftlinks"></nav>
  <span id="ft-year"></span>
</footer>
<div class="lb" id="lb">
  <div class="bar">
    <span id="lb-count"></span>
    <button onclick="closeLB()">Close ✕</button>
  </div>
  <div class="stage"><img id="lb-img" alt=""></div>
  <button class="nav prev" onclick="stepLB(-1)" aria-label="Previous">‹</button>
  <button class="nav next" onclick="stepLB(1)" aria-label="Next">›</button>
  <div class="meta" id="lb-meta"></div>
</div>
<script>
var PHOTOS=[],CATS=[],CUR="all",VIEW="grid",LB_LIST=[],LBI=0,TITLE="Portfolio";
var B_PAGES=[],B_ELS=[],B_CUR=0;
/* two virtual books: which category each reads */
var BOOKS=[],BOOK_CUR=null,BOOKS_DEF=[];
var COVER_OPEN=false,WIPING=false;
function el(id){return document.getElementById(id)}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}
function catName(id){for(var i=0;i<CATS.length;i++){if(String(CATS[i].id)===String(id))return CATS[i].name}return ""}
function curList(){return CUR==="all"?PHOTOS:PHOTOS.filter(function(p){return String(p.cat)===CUR})}
/* ── loading state ── */
var LD_N=0,LD_TOT=0;
function ldTick(){
  LD_N++;
  if(LD_N>=LD_TOT&&LD_TOT>0){
    var b=el("boot");
    if(b){b.classList.add("off");setTimeout(function(){if(b&&b.parentNode)b.parentNode.removeChild(b)},700)}
  }
}
function ldImg(img,cell,onDone){
  img.addEventListener("load",function(){if(cell)cell.classList.add("done");img.classList.add("ld");if(onDone)onDone()},{once:true});
  img.addEventListener("error",function(){if(cell)cell.classList.add("done");img.classList.add("ld");if(onDone)onDone()},{once:true});
  if(img.complete&&img.naturalWidth>0){if(cell)cell.classList.add("done");img.classList.add("ld");if(onDone)onDone()}
}
function mkDust(){
  var d=el("dust");if(!d)return;
  var RGB=["#c33b2e","#3f9d4f","#3b6fc3"];
  for(var i=0;i<28;i++){
    var s=document.createElement("i");
    s.style.left=(Math.random()*100)+"%";
    s.style.animationDelay=(Math.random()*9).toFixed(2)+"s";
    s.style.animationDuration=(7+Math.random()*8).toFixed(2)+"s";
    s.style.setProperty("--dx",((Math.random()*90-45)|0)+"px");
    /* each grain carries a latent RGB color, revealed on hero hover */
    var c=RGB[i%3];
    s.style.setProperty("--pc",c);
    s.style.animationName="float, pixup";
    s.style.animationIterationCount="infinite, infinite";
    s.style.animationDuration=s.style.animationDuration+", "+(2.2+Math.random()*2.6).toFixed(2)+"s";
    s.style.animationDelay=s.style.animationDelay+", "+(Math.random()*2).toFixed(2)+"s";
    if(i%6===0)s.className="g";
    d.appendChild(s);
  }
}
/* hero hover: grains morph into colored pixels */
(function(){
  var h=document.querySelector?document.querySelector(".hero"):null;
  if(!h)return;
  h.addEventListener("mouseenter",function(){el("dust").classList.add("px")});
  h.addEventListener("mouseleave",function(){el("dust").classList.remove("px")});
})();
mkDust();
/* ── bookshelf: two closed books on the home shelf ── */
function buildShelf(){
  var s=el("shelf");if(!s)return;
  s.innerHTML="";
  for(var i=0;i<BOOKS.length;i++){
    (function(b){
      var d=document.createElement("div");d.className="sbook"+(b.arch?" arch":b.digital?" digital":"");
      d.innerHTML='<div class="sc"><div class="cframe"></div><h3>'+esc(b.title)+'</h3><div class="yr">'+new Date().getFullYear()+'</div></div><div class="spine"></div><div class="ribbon'+(b.arch?" blue":b.digital?" olive":"")+'"></div>';
      d.onclick=function(){pickBook(b)};
      s.appendChild(d);
    })(BOOKS[i]);
  }
}
function pickBook(b){
  BOOK_CUR=b;
  COVER_OPEN=false;WIPING=false;
  var bw=el("bookwrap");
  bw.className="bookwrap on open";
  el("bback").style.display="";
  buildBook();
  el("bhint").textContent=isMobile()?(b.title+" — tap the cover, then swipe or use the arrows"):(b.title+" — click a page or use arrow keys to flip · Esc = shelf");
}
function backToShelf(){
  BOOK_CUR=null;COVER_OPEN=false;WIPING=false;B_ELS=[];B_PAGES=[];
  el("bback").style.display="none";
  el("bookwrap").className="bookwrap on";
  el("bhint").textContent=isMobile()?"Tap a book to open it":"Click a book to open it";
}
function bookList(){
  if(BOOK_CUR)return PHOTOS.filter(function(p){return String(p.cat)===String(BOOK_CUR.cat)});
  return curList();
}
/* ── view switching ── */
function setView(v){
  VIEW=v;
  el("vgrid").className=v==="grid"?"on":"";
  el("vbook").className=v==="book"?"on":"";
  el("grid").style.display=v==="grid"?"grid":"none";
  el("empty").style.display=(v==="grid"&&!curList().length)?"block":"none";
  el("bookwrap").className=v==="book"?("bookwrap on"+(BOOK_CUR?" open":"")):"bookwrap";
  if(v==="grid"){renderGrid()}
  else{if(!BOOK_CUR)buildShelf();else buildBook()}
}
el("vgrid").onclick=function(){setView("grid")};
el("vbook").onclick=function(){setView("book")};
el("nav-book").onclick=function(){setView("book");document.getElementById("works").scrollIntoView()};
/* ── filters ── */
function renderFilters(){
  var f=el("filters");f.innerHTML="";
  f.appendChild(mkBtn("All","all"));
  for(var i=0;i<CATS.length;i++)f.appendChild(mkBtn(CATS[i].name,String(CATS[i].id)));
}
function mkBtn(label,val){
  var b=document.createElement("button");
  b.textContent=label;
  if(CUR===val)b.className="on";
  b.onclick=function(){
    CUR=val;renderFilters();
    /* in book view the shelf books are category-bound — categories apply to grid */
    if(VIEW==="book")setView("grid");
    else{renderGrid();el("empty").style.display=!curList().length?"block":"none"}
  };
  return b
}
/* ── grid + lightbox ── */
function renderGrid(){
  var list=curList(),g=el("grid");g.innerHTML="";
  for(var j=0;j<list.length;j++){
    (function(p,idx){
      var d=document.createElement("div");d.className="cell";
      var im=document.createElement("img");im.loading="lazy";im.alt=p.name||"";im.src="/media/"+p.key;
      ldImg(im,d);
      var cap=document.createElement("div");cap.className="cap";cap.textContent=p.name||"";
      d.appendChild(im);d.appendChild(cap);
      d.onclick=function(){openLB(list,idx)};
      g.appendChild(d);
    })(list[j],j)
  }
}
function openLB(list,i){LB_LIST=list;LBI=i;el("lb").classList.add("open");document.body.style.overflow="hidden";drawLB()}
function closeLB(){el("lb").classList.remove("open");document.body.style.overflow=""}
function stepLB(d){if(!LB_LIST.length)return;LBI=(LBI+d+LB_LIST.length)%LB_LIST.length;drawLB()}
function drawLB(){
  var p=LB_LIST[LBI];if(!p)return;
  el("lb-img").src="/media/"+p.key;
  el("lb-count").textContent=(LBI+1)+" / "+LB_LIST.length;
  var h="";
  if(p.name)h+="<b>"+esc(p.name)+"</b>";
  var bits=[];
  if(catName(p.cat))bits.push(catName(p.cat));
  if(p.desc)bits.push(esc(p.desc));
  if(bits.length)h+=bits.join(" — ");
  el("lb-meta").innerHTML=h;
}
/* ── dust physics: cyclone vortex + gravity + drag + turbulence ── */
var P_DUST=[],P_RAF=null,P_END=0,P_T0=0,STAGE_W=800,STAGE_H=550;
function physicsBurst(){
  var frost=document.getElementById("frost");
  if(!frost)return;
  var r=frost.getBoundingClientRect();
  var ds=frost.querySelectorAll(".d");
  P_DUST=[];P_T0=performance.now();P_END=P_T0+3400;
  STAGE_W=r.width;STAGE_H=r.height;
  /* vortex center: middle of cover, slightly above */
  var CX=r.width/2,CY=r.height*0.42;
  for(var i=0;i<ds.length;i++){
    var el2=ds[i];
    /* kill blink/drift animations so physics owns the transform */
    el2.style.animation="none";
    var curOp=parseFloat(el2.style.opacity);
    if(!(curOp>0))curOp=.6;
    var x=el2.offsetLeft,y=el2.offsetTop;
    P_DUST.push({el:el2,x:x,y:y,vx:0,vy:0,
      m:0.55+Math.random()*0.9,
      o:curOp,
      spin:Math.random()*6.28});
  }
  if(!P_RAF)P_RAF=requestAnimationFrame(step);
}
function step(now){
  var alive=false;
  if(!P_DUST.length){P_RAF=null;return}
  if(!step.t0)step.t0=now;
  var dt=Math.min(0.05,(now-step.t0)/1000);step.t0=now;
  var el2p=(now-P_T0)/1000;                    /* seconds since burst */
  var G=620;                                   /* gravity px/s^2 */
  /* vortex strength ramps up then decays */
  var VS=1500*Math.min(1,el2p/0.25)*Math.exp(-el2p/1.6);
  var CX=STAGE_W/2,CY=STAGE_H*0.42;
  for(var i=0;i<P_DUST.length;i++){
    var p=P_DUST[i];
    if(now>P_END)continue;
    var rx=p.x-CX,ry=p.y-CY;
    var d=Math.max(26,Math.sqrt(rx*rx+ry*ry));
    /* tangential (swirl) + inward pull + vertical lift = cyclone */
    var tx=-ry/d,ty=rx/d;                     /* tangent unit vector */
    var swirl=VS*(0.5+0.5*p.m);
    var inward=VS*0.16;                        /* sucks grains toward axis */
    var lift=VS*0.55;                          /* carries them up */
    p.vx+=(tx*swirl-rx/d*inward)*dt;
    p.vy+=(ty*swirl-ry/d*inward-lift)*dt;
    /* turbulence */
    p.spin+=dt*4;
    p.vx+=(Math.sin(p.spin*1.7+i)*140)*dt;
    p.vy+=(Math.cos(p.spin*1.3+i*0.7)*90)*dt;
    /* gravity kicks in as vortex dies */
    p.vy+=G*Math.min(1,el2p/1.1)*dt;
    /* air drag */
    var f=Math.exp(-(1.05/p.m)*dt);
    p.vx*=f;p.vy*=f;
    p.x+=p.vx*dt;p.y+=p.vy*dt;
    /* fade near end of life */
    var op=p.o;
    if(now>P_END-1000)op*=Math.max(0,(P_END-now)/1000);
    if(d>STAGE_W*0.62)op*=0.6;
    p.el.style.transform="translate("+p.x.toFixed(1)+"px,"+p.y.toFixed(1)+"px)";
    p.el.style.opacity=op.toFixed(3);
    alive=true;
  }
  if(alive)P_RAF=requestAnimationFrame(step);
  else{P_RAF=null;step.t0=0}
}
/* ── soft wind sound (procedural, gentle airy gust) ── */
var SND_CTX=null;
function playWind(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    if(!SND_CTX)SND_CTX=new AC();
    if(SND_CTX.state==="suspended")SND_CTX.resume();
    var t0=SND_CTX.currentTime;
    var sr=SND_CTX.sampleRate;
    /* airy noise: light brown noise = soft breath of wind */
    var len=Math.floor(sr*2.8);
    var buf=SND_CTX.createBuffer(1,len,sr);
    var data=buf.getChannelData(0);
    var last=0;
    for(var i=0;i<len;i++){
      last=(last+(Math.random()*2-1)*0.05)*0.988;   /* very soft, rounded */
      data[i]=last*4.4;
    }
    var src=SND_CTX.createBufferSource();src.buffer=buf;
    src.playbackRate.value=0.85+Math.random()*0.2;
    /* lowpass -> gentle; bandpass sweep kept subtle */
    var lp=SND_CTX.createBiquadFilter();lp.type="lowpass";
    lp.frequency.setValueAtTime(500,t0);
    lp.frequency.linearRampToValueAtTime(1600,t0+0.6);   /* slow swell */
    lp.frequency.linearRampToValueAtTime(700,t0+2.6);    /* fade low */
    lp.Q.value=0.4;
    var g=SND_CTX.createGain();
    g.gain.setValueAtTime(0.0001,t0);
    g.gain.exponentialRampToValueAtTime(0.3,t0+0.5);     /* slow attack = breeze, not hit */
    g.gain.exponentialRampToValueAtTime(0.16,t0+1.4);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+2.7);
    /* slow LFO = natural ebb and flow of the gust */
    var lfo=SND_CTX.createOscillator();lfo.frequency.value=2.8;
    var lg=SND_CTX.createGain();lg.gain.value=0.06;
    lfo.connect(lg);lg.connect(g.gain);
    src.connect(lp);lp.connect(g);g.connect(SND_CTX.destination);
    src.start(t0);lfo.start(t0);
    src.stop(t0+2.8);lfo.stop(t0+2.8);
  }catch(e){}
}
/* ── page-flip sound: layered paper swish — different character every page ── */
function playFlip(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    if(!SND_CTX)SND_CTX=new AC();
    if(SND_CTX.state==="suspended")SND_CTX.resume();
    var t0=SND_CTX.currentTime;
    var sr=SND_CTX.sampleRate;
    /* per-page character */
    var rate=0.82+Math.random()*0.4;            /* playback speed */
    var dur=0.3+Math.random()*0.16;             /* swish length */
    var crack=0.02+Math.random()*0.05;          /* fiber crackle density */
    var len=Math.floor(sr*dur);
    /* layer 1: paper swish — softened noise + front-loaded crackles */
    var buf=SND_CTX.createBuffer(1,len,sr);
    var data=buf.getChannelData(0);
    var last=0;
    for(var i=0;i<len;i++){
      var ph=i/len;
      var env=Math.sin(Math.PI*Math.min(1,ph*1.2))*(1-ph*0.35);
      var white=Math.random()*2-1;
      last=(last+0.06*white)*0.98;              /* mellow, not hissy */
      var v=last*2.6*env;
      if(Math.random()<crack*(1-ph))v+=(Math.random()*2-1)*0.9*env;
      data[i]=v;
    }
    var src=SND_CTX.createBufferSource();src.buffer=buf;
    src.playbackRate.value=rate;
    var bp=SND_CTX.createBiquadFilter();bp.type="bandpass";bp.Q.value=0.7;
    var f1=700+Math.random()*500,f2=1900+Math.random()*900,f3=500+Math.random()*300;
    bp.frequency.setValueAtTime(f1,t0);
    bp.frequency.exponentialRampToValueAtTime(f2,t0+dur*0.4);
    bp.frequency.exponentialRampToValueAtTime(f3,t0+dur);
    var g=SND_CTX.createGain();
    var pk=0.22+Math.random()*0.14;
    g.gain.setValueAtTime(0.0001,t0);
    g.gain.exponentialRampToValueAtTime(pk,t0+0.04+Math.random()*0.03);
    g.gain.exponentialRampToValueAtTime(pk*0.35,t0+dur*0.55);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    src.connect(bp);bp.connect(g);g.connect(SND_CTX.destination);
    src.start(t0);src.stop(t0+dur);
    /* layer 2: soft landing thump — page settles */
    var th=SND_CTX.createOscillator();th.type="sine";
    var f0=95+Math.random()*45;
    th.frequency.setValueAtTime(f0*1.6,t0+dur*0.82);
    th.frequency.exponentialRampToValueAtTime(f0,t0+dur*1.05);
    var tg=SND_CTX.createGain();
    tg.gain.setValueAtTime(0.0001,t0+dur*0.8);
    tg.gain.exponentialRampToValueAtTime(0.14+Math.random()*0.07,t0+dur*0.9);
    tg.gain.exponentialRampToValueAtTime(0.0001,t0+dur*1.25);
    th.connect(tg);tg.connect(SND_CTX.destination);
    th.start(t0+dur*0.8);th.stop(t0+dur*1.3);
  }catch(e){}
}
/* ── virtual photobook ── */
function wipeFrost(){
  if(WIPING||COVER_OPEN)return;
  WIPING=true;
  var fr=document.getElementById("frost");
  if(fr){
    fr.classList.add("sweep");
    physicsBurst();
    playWind();
    fr.addEventListener("animationend",function(){COVER_OPEN=true;WIPING=false;if(fr.parentNode)fr.parentNode.removeChild(fr)},{once:true});
  }else{COVER_OPEN=true;WIPING=false}
}
function isMobile(){return window.matchMedia?window.matchMedia("(max-width:640px)").matches:window.innerWidth<=640}
function buildBook(){
  var list=bookList();
  B_PAGES=[{cover:true}];
  for(var i=0;i<list.length;i++)B_PAGES.push(list[i]);
  if(isMobile()){
    /* mobile: one page per sheet — a simple slide deck */
    if(B_PAGES.length%2===0)B_PAGES.push({fin:true});
    var bk0=el("book");bk0.innerHTML="";B_ELS=[];B_CUR=0;
    for(var m=0;m<B_PAGES.length;m++){
      var shm=document.createElement("div");shm.className="sheet";
      shm.appendChild(faceEl(B_PAGES[m],"fr front"));
      shm.appendChild(faceEl(null,"bk back"));
      bk0.appendChild(shm);B_ELS.push(shm);
    }
    updateZ();updateBar();
    return
  }
  if(B_PAGES.length%2===0)B_PAGES.push({fin:true});
  var n=Math.ceil(B_PAGES.length/2);
  var bk=el("book");bk.innerHTML="";B_ELS=[];B_CUR=0;
  for(var s=0;s<n;s++){
    var sh=document.createElement("div");sh.className="sheet";
    sh.appendChild(faceEl(B_PAGES[s*2],"fr front"));
    sh.appendChild(faceEl(B_PAGES[s*2+1],"bk back"));
    bk.appendChild(sh);B_ELS.push(sh);
  }
  updateZ();updateBar();
}
function faceEl(pg,cls){
  var f=document.createElement("div");f.className="face "+cls;
  if(!pg){return f}
  if(pg.cover){
    f.classList.add("cover");
    f.innerHTML='<div class="cframe"></div><div class="ct"><h3>'+esc(BOOK_CUR?BOOK_CUR.title:TITLE)+'</h3><p>Selected Works</p><div class="yr">'+new Date().getFullYear()+'</div></div>';
    if(!COVER_OPEN){
      var arch=BOOK_CUR&&BOOK_CUR.arch;
      var dg=BOOK_CUR&&BOOK_CUR.digital;
      var fr=document.createElement("div");fr.className="frost"+(arch?" arch":dg?" dg":"");fr.id="frost";
      var hint=document.createElement("div");hint.className="hint";hint.textContent="wipe to open";
      fr.appendChild(hint);
      for(var sp=0;sp<90;sp++){
        var dn=document.createElement("span");dn.className="d"+(sp%5===0?" big":"");
        var sz=(sp%5===0)?(5+Math.random()*4.5):(2+Math.random()*2.6);
        dn.style.width=sz.toFixed(1)+"px";dn.style.height=sz.toFixed(1)+"px";
        dn.style.left=(Math.random()*96)+"%";
        dn.style.top=(Math.random()*92)+"%";
        dn.style.opacity=(0.35+Math.random()*0.5).toFixed(2);
        dn.style.setProperty("--wx",((Math.random()*14-7)|0)+"px");
        dn.style.setProperty("--wy",((Math.random()*14-7)|0)+"px");
        dn.style.animationDelay=(Math.random()*5).toFixed(2)+"s";
        if(arch){
          /* angular blueprint-style grains */
          dn.style.setProperty("--rot",((Math.random()*90-45)|0)+"deg");
          dn.style.width=(sz*(sp%5===0?1.8:2.6)).toFixed(1)+"px";
          dn.style.height=(sz*(sp%5===0?0.5:0.8)).toFixed(1)+"px";
        }else if(dg){
          /* RGB pixels: square blocks in the 3 primary colors that blink */
          var RGB=["#c33b2e","#3f9d4f","#3b6fc3"];
          dn.style.setProperty("--pc",RGB[sp%3]);
          dn.style.background=RGB[sp%3];
          dn.style.width=(sp%5===0)?"5px":"3px";
          dn.style.height=dn.style.width;
          dn.style.opacity="0";
          dn.style.animation="pixblink "+(2+Math.random()*3).toFixed(2)+"s steps(1) "+(Math.random()*2).toFixed(2)+"s infinite";
        }
        /* scatter targets for the wipe — far into the air */
        var dir=Math.random()*Math.PI*2,pow=130+Math.random()*230;
        dn.style.setProperty("--bx",((Math.cos(dir)*pow)|0)+"px");
        dn.style.setProperty("--by",((Math.sin(dir)*pow*0.6-170)|0)+"px");
        dn.style.setProperty("--br",((Math.random()*720-360)|0)+"deg");
        dn.style.setProperty("--bt",(1.4+Math.random()*1.3).toFixed(2)+"s");
        dn.style.setProperty("--bd",(Math.random()*0.7).toFixed(2)+"s");
        fr.appendChild(dn);
      }
      fr.onclick=function(ev){ev.stopPropagation();wipeFrost()};
      f.appendChild(fr);
    }
    return f
  }
  if(pg.fin){f.classList.add("fin");f.innerHTML="<span>fin</span>";return f}
  var im=document.createElement("div");im.className="im";
  var img=document.createElement("img");img.loading="lazy";img.alt=pg.name||"";img.src="/media/"+pg.key;
  ldImg(img,im);
  im.appendChild(img);
  var cap=document.createElement("div");cap.className="cap";
  if(pg.name)cap.innerHTML="<b>"+esc(pg.name)+"</b>";
  if(catName(pg.cat))cap.innerHTML+=(cap.innerHTML?" &nbsp;·&nbsp; ":"")+esc(catName(pg.cat));
  var num=document.createElement("div");num.className="pgn";
  f.appendChild(im);f.appendChild(cap);f.appendChild(num);
  return f
}
function updateZ(){
  for(var i=0;i<B_ELS.length;i++){
    B_ELS[i].style.zIndex=B_ELS[i].classList.contains("flipped")?(100+i):(B_ELS.length-i);
  }
}
function pageNumberOf(idx){
  var pgs=B_ELS.length*2;
  return idx!=null&&idx<pgs?String(idx+1).padStart(2,"0"):""
}
function updateBar(){
  var n=B_PAGES.length;
  if(isMobile()){
    var pg=Math.min(B_CUR,n);
    el("bpage").textContent=(B_CUR===0)?("cover — "+(BOOK_CUR?BOOK_CUR.title:"")):(pg+" / "+n);
  }else{
    var x=Math.min(2*B_CUR+1,n),y=Math.min(2*B_CUR+2,n);
    el("bpage").textContent=(B_CUR===0)?("cover — "+(BOOK_CUR?BOOK_CUR.title:"")):(x+" – "+y+" / "+n);
  }
  el("bprev").disabled=B_CUR===0;
  el("bnext").disabled=B_CUR>=B_ELS.length;
  /* page numbers */
  for(var i=0;i<B_ELS.length;i++){
    var fr=B_ELS[i].querySelectorAll(".pgn"),bk=B_ELS[i].querySelectorAll(".pgn");
    if(fr.length===2){fr[0].textContent=pageNumberOf(isMobile()?i:i*2);fr[1].textContent=pageNumberOf(isMobile()?i+1:i*2+1)}
  }
}
function flip(dir){
  if(!COVER_OPEN||WIPING)return;
  var moved=false;
  if(dir>0&&B_CUR<B_ELS.length){
    var sh=B_ELS[B_CUR];sh.style.zIndex=999;sh.classList.add("flipped");B_CUR++;
    sh.addEventListener("transitionend",updateZ,{once:true});
    moved=true;
  }else if(dir<0&&B_CUR>0){
    var sh2=B_ELS[B_CUR-1];sh2.style.zIndex=999;sh2.classList.remove("flipped");B_CUR--;
    sh2.addEventListener("transitionend",updateZ,{once:true});
    moved=true;
  }
  if(moved)playFlip();
  updateBar();
}
el("bnext").onclick=function(e){e.stopPropagation();if(!COVER_OPEN)return;flip(1)};
el("bprev").onclick=function(e){e.stopPropagation();if(!COVER_OPEN)return;flip(-1)};
el("bback").onclick=function(e){e.stopPropagation();backToShelf()};
el("book").onclick=function(e){
  if(!COVER_OPEN){wipeFrost();return}
  var r=this.getBoundingClientRect();
  flip((e.clientX-r.left)>r.width/2?1:-1);
};
var TX0=null;
el("book").addEventListener("touchstart",function(e){TX0=e.touches[0].clientX},{passive:true});
el("book").addEventListener("touchend",function(e){
  if(TX0==null)return;
  var dx=e.changedTouches[0].clientX-TX0;TX0=null;
  if(!COVER_OPEN)return;
  if(Math.abs(dx)>40)flip(dx<0?1:-1);
},{passive:true});
document.addEventListener("keydown",function(e){
  if(VIEW==="book"&&document.getElementById("bookwrap").className.indexOf("on")>-1){
    if(!BOOK_CUR){/* on shelf: arrows pick a book */
      if(e.key==="ArrowRight"&&BOOKS.length)pickBook(BOOKS[0]);
      if(e.key==="ArrowLeft"&&BOOKS.length>1)pickBook(BOOKS[1]);
      return;
    }
    if(e.key==="ArrowRight"){if(COVER_OPEN)flip(1);else wipeFrost()}
    if(e.key==="ArrowLeft"&&COVER_OPEN)flip(-1);
    if(e.key==="Escape"&&COVER_OPEN)backToShelf();
  }
  if(el("lb").classList.contains("open")){
    if(e.key==="Escape")closeLB();
    if(e.key==="ArrowLeft")stepLB(-1);
    if(e.key==="ArrowRight")stepLB(1);
  }
});
/* ── boot ── */
Promise.all([
  fetch("/api/pub/photos").then(function(r){return r.json()}),
  fetch("/api/pub/cats").then(function(r){return r.json()}),
  fetch("/api/pub/meta").then(function(r){return r.json()})
]).then(function(res){
  PHOTOS=res[0].photos||[];
  CATS=res[1].cats||[];
  var m=res[2].meta||{};
  var title=m.title||"Portfolio";
  TITLE=title;
  document.title=title;
  el("hd-title").textContent="Portfolio";
  el("h-title").textContent=title;
  el("h-sub").textContent=m.subtitle||"";
  el("about-text").textContent=m.about||"";
  /* portrait in the About column: first photo named "Portrait" */
  var pf=el("pframe");
  if(pf){
    var por=null;
    for(var pi=0;pi<PHOTOS.length;pi++){
      if(PHOTOS[pi].name==="Portrait"){por=PHOTOS[pi];break}
    }
    if(por){
      var pim=document.createElement("img");
      pim.alt="Portrait";
      pim.src="/media/"+por.key;
      ldImg(pim,null);
      pf.appendChild(pim);
    }
  }
  el("ft-name").textContent="© "+title;
  el("ft-year").textContent=new Date().getFullYear();
  var c=el("contact");c.id="contact";
  var items=[];
  if(m.email)items.push(["Email","mailto:"+m.email,m.email]);
  if(m.instagram){var ig=String(m.instagram).split("/").pop().replace(/^@/,"");items.push(["Instagram","https://instagram.com/"+ig,"@"+ig])}
  if(m.telegram){var tg2=String(m.telegram).split("/").pop().replace(/^@/,"");items.push(["Telegram","https://t.me/"+tg2,"@"+tg2])}
  if(m.phone)items.push(["Call","tel:"+m.phone,m.phone]);
  for(var i=0;i<items.length;i++){
    var a=document.createElement("a");a.href=items[i][1];a.target="_blank";a.rel="noopener";
    a.textContent=items[i][0];
    if(items[i][2]){var sp=document.createElement("span");sp.textContent=items[i][2];a.appendChild(sp)}
    c.appendChild(a);
    var f=document.createElement("a");f.href=items[i][1];f.target="_blank";f.rel="noopener";f.textContent=items[i][0];
    el("ftlinks").appendChild(f)
  }
  renderFilters();
  /* define the shelf books from categories (photo=red, arch=blue, digital=olive) */
  BOOKS=[];
  var phCat=null,arCat=null,dgCat=null;
  for(var ci=0;ci<CATS.length;ci++){
    var nm=CATS[ci].name.toLowerCase();
    if(!phCat&&nm.indexOf("photo")>-1)phCat=CATS[ci];
    if(!arCat&&(nm.indexOf("3d")>-1||nm.indexOf("arch")>-1))arCat=CATS[ci];
    if(!dgCat&&nm.indexOf("digital")>-1)dgCat=CATS[ci];
  }
  if(arCat)BOOKS.push({title:"Architecture",cat:arCat.id,arch:true});
  if(dgCat)BOOKS.push({title:"Digital Art",cat:dgCat.id,arch:false,digital:true});
  if(phCat)BOOKS.push({title:"Photobook",cat:phCat.id,arch:false});
  if(!BOOKS.length&&CATS.length)BOOKS.push({title:"Photobook",cat:CATS[0].id,arch:false});
  setView("book");
  /* preload first shelf appearance, then fade the loader out */
  LD_TOT=1;LD_N=0;
  var fl=curList()[0];
  if(fl){
    var pre=new Image();
    pre.onload=ldTick;pre.onerror=ldTick;
    pre.src="/media/"+fl.key;
  }else{ldTick()}
});
</script>
</body>
</html>`;
