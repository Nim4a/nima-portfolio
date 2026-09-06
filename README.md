# Nima Portfolio — Cloudflare Worker

A minimal photographer/artist portfolio served entirely by a single Cloudflare Worker.
No static hosting, no database — metadata in Workers KV, images as KV blobs.

**Live:** https://nima-portfolio.nima64301.workers.dev

## Features

- **Virtual flip photobook** — three hardcovers on a shelf (Photography / Digital Art / Architecture), each opens into a 3D page-flipping book with:
  - frost/dust on the cover — wipe it away with a click (real particle physics: vortex + gravity + drag + turbulence)
  - procedural sound (Web Audio, no assets): soft wind on wipe, layered paper swish per page flip — every page sounds different
  - per-book cover dust styles: soft grains (Photobook), RGB blinking pixels (Digital Art), angular blueprint fragments (Architecture)
- **Grid gallery** with category filters and keyboard-navigable lightbox
- **Minimal light theme** — famous-photographer-portfolio aesthetic, magical details: floating dust in the hero that turns into glowing RGB pixels on hover, sheen on the title, breathing light halos
- **Admin panel** (`/admin`) — password login, drag & drop upload, categories, site settings, reorder
- English UI, RTL-free, system font stack

## Architecture

```
worker.js          — router: pages, public read-only API, admin API (session cookie), /media/<key> blob serving
pages/public.js    — public site (HTML/CSS/JS in one template literal)
pages/admin.js     — admin dashboard
wrangler.toml      — KV bindings (PF_META, PF_MEDIA) + ADMIN_PASSWORD var
test/*.cjs         — headless smoke tests (stub DOM: book flip logic, shelf flow, cyclone physics)
```

### KV data model (PF_META)

```
meta:site           { title, subtitle, about, email, instagram, telegram, phone }
meta:cats           [{ id, name, slug }]
meta:photo:<id>     { id, name, cat, desc, key, type, size, created }
meta:index:photos   [id, ...]  (display order — reorder = rewrite the array)
session:<token>     login session (30d TTL)
```

Images live in **PF_MEDIA** as `img:<8hex>` keys, served from `/media/img:...`
with immutable cache headers (read back with `type:"arrayBuffer"` — a bare
`get()` corrupts binary as UTF-8).

## Deploy

```bash
export CLOUDFLARE_API_TOKEN=<token> CLOUDFLARE_ACCOUNT_ID=<account>
npx wrangler kv namespace create PF_META    # paste id into wrangler.toml
npx wrangler kv namespace create PF_MEDIA
npx wrangler deploy
```

## Admin

- URL: `/admin`
- Password: set `ADMIN_PASSWORD` var in `wrangler.toml`
- Upload: drag & drop, pick a category, reorder from the list

## Tests

```bash
node test/book_smoke.cjs     # page pairing + flip logic
node test/shelf_smoke.cjs    # shelf → pick book → wipe → flip → back
node test/cyclone_smoke.cjs  # dust vortex physics sanity
```
