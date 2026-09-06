import { PUBLIC_HTML } from "./pages/public.js";
import { ADMIN_HTML } from "./pages/admin.js";

// ══════════════════════════════════════════════════════════
//  Nima Portfolio — Cloudflare Worker
//  KV-only: PF_META (metadata) + PF_MEDIA (image blobs)
//  Admin: /admin — password login, upload, categories, settings
// ══════════════════════════════════════════════════════════

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
const ADMIN_PASS_DEFAULT = "change-me-please";
const SESSION_COOKIE = "pf_session";
const MAX_BYTES = 24 * 1024 * 1024; // KV value hard limit is 25MB; leave headroom

// ─── Auth ─────────────────────────────────────────────────
function getCookie(req, name) {
  const c = req.headers.get("Cookie") || "";
  const m = c.match(new RegExp(`${name}=([^;]+)`));
  return m ? m[1] : null;
}

async function makeSession(env) {
  const token = crypto.randomUUID().replace(/-/g, "");
  await env.PF_META.put(`session:${token}`, Date.now().toString(), { expirationTtl: 60 * 60 * 24 * 30 });
  return token;
}

async function checkAuth(req, env) {
  const token = getCookie(req, SESSION_COOKIE);
  if (!token) return false;
  const val = await env.PF_META.get(`session:${token}`);
  return !!val;
}

// ─── KV data model (PF_META) ─────────────────────────────
//  meta:site           { title, subtitle, about, email, instagram, telegram, phone }
//  meta:cats          [{ id, name, slug }]
//  meta:photo:<id>    { id, name, cat, desc, key, size, w, h, created }
//  meta:index:photos  [id, ...]  (newest first)
//  session:<token>    login session (30d TTL)

async function kvGet(env, key) {
  return await env.PF_META.get(key, "json");
}

async function kvPut(env, key, val) {
  await env.PF_META.put(key, JSON.stringify(val));
}

// ─── API ──────────────────────────────────────────────────
const api = {
  async login(req, env) {
    const { password } = await req.json().catch(() => ({}));
    if (password && password === (env.ADMIN_PASSWORD || ADMIN_PASS_DEFAULT)) {
      const token = await makeSession(env);
      return new Response(JSON.stringify({ ok: true }), {
        headers: {
          ...JSON_HEADERS,
          "Set-Cookie": `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        },
      });
    }
    return new Response(JSON.stringify({ ok: false }), { status: 401, headers: JSON_HEADERS });
  },

  async logout(req, env) {
    const token = getCookie(req, SESSION_COOKIE);
    if (token) await env.PF_META.delete(`session:${token}`);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...JSON_HEADERS, "Set-Cookie": `${SESSION_COOKIE}=; Path=/; Max-Age=0` },
    });
  },

  async me(req, env) {
    return new Response(JSON.stringify({ ok: await checkAuth(req, env) }), { headers: JSON_HEADERS });
  },

  async getMeta(req, env) {
    const meta = (await kvGet(env, "meta:site")) || {};
    return new Response(JSON.stringify({ ok: true, meta }), { headers: JSON_HEADERS });
  },

  async saveMeta(req, env) {
    const body = await req.json().catch(() => ({}));
    const meta = (await kvGet(env, "meta:site")) || {};
    for (const k of ["title", "subtitle", "about", "email", "instagram", "telegram", "phone"]) {
      if (body[k] !== undefined) meta[k] = String(body[k]).slice(0, 3000);
    }
    await kvPut(env, "meta:site", meta);
    return new Response(JSON.stringify({ ok: true, meta }), { headers: JSON_HEADERS });
  },

  async getCats(req, env) {
    const cats = (await kvGet(env, "meta:cats")) || [];
    return new Response(JSON.stringify({ ok: true, cats }), { headers: JSON_HEADERS });
  },

  async addCat(req, env) {
    const { name } = await req.json().catch(() => ({}));
    if (!name || !String(name).trim()) return new Response(JSON.stringify({ ok: false, error: "name required" }), { status: 400, headers: JSON_HEADERS });
    const cats = (await kvGet(env, "meta:cats")) || [];
    if (cats.length >= 24) return new Response(JSON.stringify({ ok: false, error: "too many" }), { status: 400, headers: JSON_HEADERS });
    const nm = String(name).trim().slice(0, 60);
    const slug = nm.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, "-").replace(/^-+|-+$/g, "");
    if (cats.some(c => c.slug === slug || c.name === nm)) return new Response(JSON.stringify({ ok: false, error: "exists" }), { status: 400, headers: JSON_HEADERS });
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    cats.push({ id, name: nm, slug: slug || id });
    await kvPut(env, "meta:cats", cats);
    return new Response(JSON.stringify({ ok: true, cat: cats[cats.length - 1], cats }), { headers: JSON_HEADERS });
  },

  async delCat(req, env) {
    const { id } = await req.json().catch(() => ({}));
    let cats = (await kvGet(env, "meta:cats")) || [];
    cats = cats.filter(c => String(c.id) !== String(id));
    await kvPut(env, "meta:cats", cats);
    return new Response(JSON.stringify({ ok: true, cats }), { headers: JSON_HEADERS });
  },

  async listPhotos(req, env) {
    const idx = (await kvGet(env, "meta:index:photos")) || [];
    const photos = [];
    for (const id of idx) {
      const p = await kvGet(env, `meta:photo:${id}`);
      if (p) photos.push(p);
    }
    return new Response(JSON.stringify({ ok: true, photos }), { headers: JSON_HEADERS });
  },

  async upload(req, env) {
    const form = await req.formData().catch(() => null);
    if (!form) return new Response(JSON.stringify({ ok: false, error: "form data" }), { status: 400, headers: JSON_HEADERS });
    const file = form.get("file");
    if (!file || typeof file === "string") return new Response(JSON.stringify({ ok: false, error: "no file" }), { status: 400, headers: JSON_HEADERS });
    if (file.size > MAX_BYTES) return new Response(JSON.stringify({ ok: false, error: "max 24MB" }), { status: 400, headers: JSON_HEADERS });
    const type = file.type || "image/jpeg";
    if (!/^image\//.test(type)) return new Response(JSON.stringify({ ok: false, error: "images only" }), { status: 400, headers: JSON_HEADERS });

    const id = crypto.randomUUID().slice(0, 8);
    const key = `img:${id}`;
    await env.PF_MEDIA.put(key, file.stream(), { metadata: { type } });
    const photo = {
      id, key,
      name: String(form.get("name") || file.name || "").replace(/\.[^.]+$/, "").slice(0, 200),
      cat: String(form.get("cat") || ""),
      desc: String(form.get("desc") || "").slice(0, 500),
      type,
      size: file.size,
      created: Date.now(),
    };
    await kvPut(env, `meta:photo:${id}`, photo);
    const idx = (await kvGet(env, "meta:index:photos")) || [];
    idx.unshift(id);
    await kvPut(env, "meta:index:photos", idx);
    return new Response(JSON.stringify({ ok: true, photo }), { headers: JSON_HEADERS });
  },

  async editPhoto(req, env) {
    const { id, name, cat, desc } = await req.json().catch(() => ({}));
    const photo = await kvGet(env, `meta:photo:${id}`);
    if (!photo) return new Response(JSON.stringify({ ok: false, error: "not found" }), { status: 404, headers: JSON_HEADERS });
    if (name !== undefined) photo.name = String(name).slice(0, 200);
    if (desc !== undefined) photo.desc = String(desc).slice(0, 500);
    if (cat !== undefined) photo.cat = String(cat).slice(0, 40);
    await kvPut(env, `meta:photo:${id}`, photo);
    return new Response(JSON.stringify({ ok: true, photo }), { headers: JSON_HEADERS });
  },

  async delPhoto(req, env) {
    const { id } = await req.json().catch(() => ({}));
    const photo = await kvGet(env, `meta:photo:${id}`);
    if (photo) {
      await env.PF_MEDIA.delete(photo.key);
      await env.PF_META.delete(`meta:photo:${id}`);
      let idx = (await kvGet(env, "meta:index:photos")) || [];
      idx = idx.filter(x => x !== id);
      await kvPut(env, "meta:index:photos", idx);
    }
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  },

  async reorder(req, env) {
    const { photos } = await req.json().catch(() => ({}));
    if (!Array.isArray(photos)) return new Response(JSON.stringify({ ok: false, error: "bad data" }), { status: 400, headers: JSON_HEADERS });
    await kvPut(env, "meta:index:photos", photos.slice(0, 500).map(String));
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  },
};

// ─── Router ───────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const p = url.pathname;

    // media: serve image blobs from PF_MEDIA with immutable caching
    if (p.startsWith("/media/")) {
      const key = p.slice("/media/".length);
      if (!/^img:[a-f0-9]+$/.test(key)) return new Response("404", { status: 404 });
      const obj = await env.PF_MEDIA.getWithMetadata(key, { type: "arrayBuffer" });
      if (!obj || !obj.value) return new Response("404", { status: 404 });
      const h = new Headers();
      h.set("Content-Type", (obj.metadata && obj.metadata.type) || "image/jpeg");
      h.set("Cache-Control", "public, max-age=31536000, immutable");
      return new Response(obj.value, { headers: h });
    }

    // pages
    if (p === "/" || p === "/index.html") {
      return new Response(PUBLIC_HTML, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
    }
    if (p === "/admin" || p === "/admin.html") {
      return new Response(ADMIN_HTML, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
    }
    if (p === "/favicon.ico") {
      return new Response(null, { status: 204, headers: { "Cache-Control": "public, max-age=86400" } });
    }

    // public API (read-only)
    if (request.method === "GET") {
      if (p === "/api/pub/photos") return api.listPhotos(request, env);
      if (p === "/api/pub/cats") return api.getCats(request, env);
      if (p === "/api/pub/meta") return api.getMeta(request, env);
    }

    // auth endpoints
    if (p === "/api/login" && request.method === "POST") return api.login(request, env);
    if (p === "/api/logout") return api.logout(request, env);
    if (p === "/api/me") return api.me(request, env);

    // admin API (auth required)
    if (p.startsWith("/api/")) {
      if (!(await checkAuth(request, env))) {
        return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401, headers: JSON_HEADERS });
      }
      const POST = request.method === "POST";
      if (p === "/api/photos" && request.method === "GET") return api.listPhotos(request, env);
      if (p === "/api/upload" && POST) return api.upload(request, env);
      if (p === "/api/photo" && POST) return api.editPhoto(request, env);
      if (p === "/api/photo/delete" && POST) return api.delPhoto(request, env);
      if (p === "/api/cats" && request.method === "GET") return api.getCats(request, env);
      if (p === "/api/cats" && POST) return api.addCat(request, env);
      if (p === "/api/cats/delete" && POST) return api.delCat(request, env);
      if (p === "/api/meta" && request.method === "GET") return api.getMeta(request, env);
      if (p === "/api/meta" && POST) return api.saveMeta(request, env);
      if (p === "/api/reorder" && POST) return api.reorder(request, env);
      return new Response(JSON.stringify({ ok: false, error: "not found" }), { status: 404, headers: JSON_HEADERS });
    }

    return new Response("404", { status: 404 });
  },
};
