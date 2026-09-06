// Admin dashboard HTML — English (login + upload + categories + settings)
export const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portfolio — Admin</title>
<style>
:root{--bg:#fafaf8;--tx:#141412;--mut:#8a8a85;--line:#e7e5e0;--ac:#141412;--err:#c0392b;--card:#fff}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--tx);font-family:'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif;font-weight:300;font-size:14px}
input,textarea,select,button{font-family:inherit;font-size:14px}
.wrap{max-width:680px;margin:0 auto;padding:36px 20px 80px}
h1{font-size:22px;font-weight:300;letter-spacing:.06em;margin-bottom:6px}
.sub{color:var(--mut);font-size:13px;margin-bottom:30px}
h2{font-size:12px;font-weight:500;color:var(--mut);letter-spacing:.22em;margin:38px 0 12px;text-transform:uppercase}
.f{margin-bottom:12px}
.f label{display:block;font-size:11px;color:var(--mut);letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px}
.f input,.f textarea{width:100%;border:1px solid var(--line);background:var(--card);padding:9px 12px;border-radius:4px;outline:none;color:var(--tx);font-weight:300}
.f input:focus,.f textarea:focus{border-color:var(--tx)}
.f textarea{min-height:90px;resize:vertical}
.btn{background:var(--tx);color:var(--bg);border:none;padding:10px 24px;border-radius:4px;cursor:pointer;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.btn:hover{opacity:.85}
.btn.sm{padding:6px 14px;font-size:11px}
.btn.ghost{background:none;color:var(--tx);border:1px solid var(--line)}
.btn.danger{background:none;color:var(--err);border:1px solid var(--err)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--tx);color:var(--bg);padding:10px 22px;border-radius:4px;font-size:12px;letter-spacing:.06em;opacity:0;transition:opacity .3s;pointer-events:none;z-index:99}
.toast.show{opacity:1}
.login{max-width:340px;margin:16vh auto 0}
.row{display:flex;gap:10px}
.row>*{flex:1}
.zone{border:1.5px dashed var(--line);border-radius:8px;padding:36px 16px;text-align:center;color:var(--mut);cursor:pointer;transition:.2s;background:var(--card)}
.zone.drag{border-color:var(--tx);color:var(--tx)}
.zone b{display:block;font-weight:500;color:var(--tx);margin-bottom:4px}
.zone span{font-size:12px}
.preview{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.preview .ph{width:76px;height:76px;border-radius:4px;object-fit:cover;border:1px solid var(--line);cursor:pointer}
.q{border:1px solid var(--line);border-radius:6px;background:var(--card);padding:14px;display:flex;gap:12px;align-items:flex-start;margin-bottom:10px}
.q img{width:64px;height:64px;border-radius:4px;object-fit:cover;flex-shrink:0;background:#eceae6}
.q .body{flex:1;min-width:0}
.q .body .nm{font-size:13px;margin-bottom:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.q .body input,.q .body select{border:1px solid var(--line);border-radius:4px;padding:5px 8px;font-size:12px;background:var(--bg);color:var(--tx);margin-bottom:6px;max-width:100%}
.q .body input{width:100%}
.q .ops{display:flex;flex-direction:column;gap:6px}
.q .ops button{background:none;border:none;cursor:pointer;color:var(--mut);font-size:11px;padding:3px 0;text-align:right}
.q .ops button:hover{color:var(--tx)}
.q .ops button.del:hover{color:var(--err)}
.catlist{display:flex;flex-direction:column;gap:8px}
.catitem{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:4px;background:var(--card);padding:9px 14px}
.catitem .nm{font-size:13px}
.catitem .sl{font-size:11px;color:var(--mut);margin-left:8px}
.catitem button{background:none;border:none;color:var(--err);cursor:pointer;font-size:12px}
.hidden{display:none!important}
.top{display:flex;justify-content:space-between;align-items:center}
.top a{color:var(--mut);font-size:12px;text-decoration:none;border-bottom:1px solid var(--line)}
#cnt{font-size:12px;color:var(--mut);margin-top:4px}
</style>
</head>
<body>
<div class="wrap">

<div id="login" class="login">
  <h1>Admin Login</h1>
  <p class="sub">Portfolio</p>
  <div class="f"><input type="password" id="pass" placeholder="Password" onkeydown="if(event.key==='Enter')login()"></div>
  <button class="btn" style="width:100%" onclick="login()">Sign in</button>
  <p id="lerr" class="sub hidden" style="color:var(--err)">Wrong password</p>
</div>

<div id="dash" class="hidden">
  <div class="top">
    <h1>Dashboard</h1>
    <div style="display:flex;gap:16px;align-items:center">
      <a href="/" target="_blank">View site ↗</a>
      <button class="btn ghost sm" onclick="logout()">Log out</button>
    </div>
  </div>
  <p class="sub" id="stat"></p>

  <h2>Upload</h2>
  <div class="zone" id="zone">
    <b>Drag &amp; drop images</b>
    <span>or click to browse — JPG / PNG / WebP / GIF, up to 24 MB each</span>
    <input type="file" id="file" accept="image/*" multiple class="hidden">
  </div>
  <div class="preview" id="preview"></div>
  <div class="f" style="margin-top:14px"><label>Default category for new uploads</label>
    <select id="up-cat"></select>
  </div>
  <button class="btn" onclick="uploadAll()">Upload</button>
  <span id="upstat" class="sub"></span>

  <h2>Works <span id="pc" style="color:var(--tx)"></span></h2>
  <div id="plist"></div>

  <h2>Categories</h2>
  <div class="catlist" id="catlist"></div>
  <div class="row" style="margin-top:12px">
    <div class="f" style="margin:0"><input id="newcat" placeholder="New category name (e.g. Photography, 3D, Painting)"></div>
    <button class="btn sm" style="align-self:flex-start" onclick="addCat()">Add</button>
  </div>

  <h2>Site Settings</h2>
  <div class="f"><label>Site title</label><input id="m-title" placeholder="Your name / studio"></div>
  <div class="f"><label>Subtitle (short line under the title)</label><input id="m-subtitle" placeholder="Photographer &amp; Visual Artist"></div>
  <div class="f"><label>About me</label><textarea id="m-about" placeholder="A few lines about you..."></textarea></div>
  <div class="f"><label>Email</label><input id="m-email" placeholder="you@example.com"></div>
  <div class="f"><label>Instagram (handle)</label><input id="m-instagram" placeholder="username"></div>
  <div class="f"><label>Telegram (handle)</label><input id="m-telegram" placeholder="username"></div>
  <div class="f"><label>Phone</label><input id="m-phone" placeholder="+98912..."></div>
  <button class="btn" onclick="saveMeta()">Save settings</button>

</div>
</div>
<div class="toast" id="toast"></div>
<script>
var PHOTOS=[],CATS=[],QUEUE=[];
function el(id){return document.getElementById(id)}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}
function toast(msg){
  var t=el("toast");t.textContent=msg;t.classList.add("show");
  setTimeout(function(){t.classList.remove("show")},2200);
}
function api(path,body,method){
  return fetch(path,body?{
    method:method||"POST",
    headers:body instanceof FormData?{}:{"Content-Type":"application/json"},
    body:body instanceof FormData?body:JSON.stringify(body)
  }:undefined).then(function(r){
    if(r.status===401&&path!=="/api/login"){location.reload();throw new Error("unauthorized")}
    return r.json();
  });
}
function login(){
  api("/api/login",{password:el("pass").value}).then(function(res){
    if(res.ok)location.reload();
    else el("lerr").classList.remove("hidden");
  });
}
function logout(){api("/api/logout",{}).then(function(){location.reload()})}
function loadAll(){
  Promise.all([
    api("/api/cats"),
    api("/api/photos"),
    fetch("/api/meta").then(function(r){return r.json()})
  ]).then(function(res){
    CATS=res[0].cats||[];
    PHOTOS=res[1].photos||[];
    var m=res[2].meta||{};
    el("m-title").value=m.title||"";
    el("m-subtitle").value=m.subtitle||"";
    el("m-about").value=m.about||"";
    el("m-email").value=m.email||"";
    el("m-instagram").value=m.instagram||"";
    el("m-telegram").value=m.telegram||"";
    el("m-phone").value=m.phone||"";
    renderCats();renderPhotos();renderCatPicker();
    el("stat").textContent=PHOTOS.length+" works — "+CATS.length+" categories";
  });
}
function renderCats(){
  var c=el("catlist");c.innerHTML="";
  if(!CATS.length){c.innerHTML='<p class="sub">No categories yet. Create a few: Photography, 3D, Painting…</p>';return}
  for(var i=0;i<CATS.length;i++){
    (function(cat){
      var d=document.createElement("div");
      d.className="catitem";
      d.innerHTML='<span><span class="nm">'+esc(cat.name)+'</span><span class="sl">'+esc(cat.slug)+'</span></span>';
      var b=document.createElement("button");
      b.textContent="Delete";
      b.onclick=function(){
        if(!confirm('Delete "'+cat.name+'"? Photos in it will lose their category.'))return;
        api("/api/cats/delete",{id:cat.id}).then(function(res){if(res.ok){CATS=res.cats;renderCats();renderCatPicker();toast("Deleted")}});
      };
      d.appendChild(b);
      c.appendChild(d);
    })(CATS[i]);
  }
}
function renderCatPicker(){
  var s=el("up-cat");s.innerHTML='<option value="">No category</option>';
  for(var i=0;i<CATS.length;i++){
    var o=document.createElement("option");
    o.value=String(CATS[i].id);
    o.textContent=CATS[i].name;
    s.appendChild(o);
  }
  var list=el("plist").querySelectorAll("select");
  for(var j=0;j<list.length;j++){
    var cur=list[j].getAttribute("data-cur");
    list[j].innerHTML=s.innerHTML;
    list[j].value=cur;
  }
}
function renderPhotos(){
  var p=el("plist");p.innerHTML="";
  el("pc").textContent=PHOTOS.length?"("+PHOTOS.length+")":"";
  if(!PHOTOS.length){p.innerHTML='<p class="sub">Nothing uploaded yet.</p>';return}
  for(var i=0;i<PHOTOS.length;i++){
    (function(ph,idx){
      var d=document.createElement("div");
      d.className="q";
      d.innerHTML='<img loading="lazy" src="/media/'+ph.key+'"><div class="body"><div class="nm">'+esc(ph.name||"—")+'</div></div>';
      var body=d.querySelector(".body");
      var nm=document.createElement("input");
      nm.value=ph.name||"";
      nm.placeholder="Title";
      nm.onchange=function(){api("/api/photo",{id:ph.id,name:nm.value}).then(function(r){if(r.ok)toast("Saved")})};
      var sel=document.createElement("select");
      sel.setAttribute("data-cur",String(ph.cat||""));
      var html='<option value="">No category</option>';
      for(var k=0;k<CATS.length;k++){
        html+='<option value="'+CATS[k].id+'">'+esc(CATS[k].name)+'</option>';
      }
      sel.innerHTML=html;
      sel.value=String(ph.cat||"");
      sel.onchange=function(){
        api("/api/photo",{id:ph.id,cat:sel.value}).then(function(r){if(r.ok){ph.cat=sel.value;toast("Saved")}});
      };
      var ds=document.createElement("input");
      ds.value=ph.desc||"";
      ds.placeholder="Short description (optional)";
      ds.onchange=function(){api("/api/photo",{id:ph.id,desc:ds.value}).then(function(r){if(r.ok)toast("Saved")})};
      body.appendChild(nm);body.appendChild(sel);body.appendChild(ds);
      var ops=document.createElement("div");
      ops.className="ops";
      var up=document.createElement("button");
      up.textContent="↑ Up";
      up.onclick=function(){move(idx,-1)};
      var del=document.createElement("button");
      del.className="del";
      del.textContent="Delete";
      del.onclick=function(){
        if(!confirm("Delete this image?"))return;
        api("/api/photo/delete",{id:ph.id}).then(function(){loadAll();toast("Deleted")});
      };
      ops.appendChild(up);ops.appendChild(del);
      d.appendChild(ops);
      p.appendChild(d);
    })(PHOTOS[i],i);
  }
}
function move(idx,dir){
  var j=idx+dir;
  if(j<0||j>=PHOTOS.length)return;
  var t=PHOTOS[idx];PHOTOS[idx]=PHOTOS[j];PHOTOS[j]=t;
  api("/api/reorder",{photos:PHOTOS.map(function(p){return p.id})}).then(function(r){
    if(r.ok){renderPhotos();toast("Moved")}
  });
}
function addCat(){
  var name=el("newcat").value.trim();
  if(!name)return toast("Enter a category name");
  api("/api/cats",{name:name}).then(function(res){
    if(res.ok){CATS=res.cats;el("newcat").value="";renderCats();renderCatPicker();toast("Category added")}
    else toast(res.error==="slug exists"?"A category with this name exists":"Error");
  });
}
function saveMeta(){
  api("/api/meta",{
    title:el("m-title").value,
    subtitle:el("m-subtitle").value,
    about:el("m-about").value,
    email:el("m-email").value,
    instagram:el("m-instagram").value,
    telegram:el("m-telegram").value,
    phone:el("m-phone").value
  }).then(function(res){if(res.ok)toast("Settings saved")});
}
// upload queue
var zone=el("zone"),fileInput=el("file");
zone.onclick=function(){fileInput.click()};
fileInput.onchange=function(){addFiles(fileInput.files)};
["dragover","dragenter"].forEach(function(ev){zone.addEventListener(ev,function(e){e.preventDefault();zone.classList.add("drag")})});
["dragleave","drop"].forEach(function(ev){zone.addEventListener(ev,function(e){e.preventDefault();zone.classList.remove("drag")})});
zone.addEventListener("drop",function(e){addFiles(e.dataTransfer.files)});
function addFiles(files){
  for(var i=0;i<files.length;i++){
    if(/^image\\//.test(files[i].type))QUEUE.push(files[i]);
  }
  renderQueue();
}
function renderQueue(){
  var p=el("preview");p.innerHTML="";
  for(var i=0;i<QUEUE.length;i++){
    (function(f,idx){
      var im=document.createElement("img");
      im.src=URL.createObjectURL(f);
      im.className="ph";
      im.title=f.name;
      im.onclick=function(){QUEUE.splice(idx,1);renderQueue()};
      p.appendChild(im);
    })(QUEUE[i],i);
  }
}
function uploadAll(){
  if(!QUEUE.length)return toast("No images selected");
  var cat=el("up-cat").value;
  var i=0;
  el("upstat").textContent="";
  (function next(){
    if(i>=QUEUE.length){QUEUE=[];renderQueue();loadAll();toast("Upload complete");el("upstat").textContent="";return}
    var f=QUEUE[i];
    el("upstat").textContent="Uploading "+(i+1)+" of "+QUEUE.length+"…";
    var fd=new FormData();
    fd.append("file",f);
    fd.append("cat",cat);
    fd.append("name",f.name.replace(/\\.[^.]+$/,""));
    fetch("/api/upload",{method:"POST",body:fd}).then(function(r){return r.json()}).then(function(res){
      i++;next();
    }).catch(function(){i++;next()});
  })();
}
// init: check auth
fetch("/api/me").then(function(r){return r.json()}).then(function(res){
  if(res.ok){
    el("login").classList.add("hidden");
    el("dash").classList.remove("hidden");
    loadAll();
  }
});
</script>
</body>
</html>`;
