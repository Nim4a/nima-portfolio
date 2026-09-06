import urllib.request, json, http.cookiejar, uuid, sys

U = "https://nima-portfolio.nima64301.workers.dev"
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
opener.addheaders = [("User-Agent", "Mozilla/5.0"), ("Content-Type", "application/json; charset=utf-8")]

def post(path, obj):
    data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
    try:
        r = opener.open(urllib.request.Request(U + path, data=data, method="POST"))
        return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode("utf-8"))

def get(path):
    r = opener.open(U + path)
    return json.loads(r.read().decode("utf-8"))

# login
print("login:", post("/api/login", {"password": "CHANGE_ME_ADMIN_PASSWORD"})["ok"])

# categories
for name in ["عکاسی", "سه‌بعدی", "نقاشی"]:
    res = post("/api/cats", {"name": name})
    if not res["ok"]:
        print("cat exists (skip):", name)
        continue
    print("cat:", name, "->", res["ok"], res.get("cat", {}).get("slug", res.get("error")))

cats = get("/api/pub/cats")["cats"]
print("pub cats:", json.dumps([c["name"] for c in cats], ensure_ascii=False))

# settings
meta = post("/api/meta", {
    "title": "نیما — پورتفولیو",
    "subtitle": "عکاس و هنرمند بصری",
    "about": "این متن نمونه است؛ از پنل مدیریت قابل ویرایش است.",
    "email": "you@example.com",
    "instagram": "nima",
    "telegram": "nima",
})
print("meta saved:", meta["ok"])

# upload a real generated test image (PNG, red 800x600)
import zlib, struct
def png(w, h, rgb):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))

img = png(800, 600, (180, 60, 60))
print("test png bytes:", len(img))

# multipart upload
boundary = uuid.uuid4().hex
body = (
    f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"test.png\"\r\n"
    f"Content-Type: image/png\r\n\r\n"
).encode() + img + (
    f"\r\n--{boundary}\r\nContent-Disposition: form-data; name=\"cat\"\r\n\r\n{cats[0]['id']}\r\n"
    f"--{boundary}\r\nContent-Disposition: form-data; name=\"name\"\r\n\r\nعکس آزمایشی\r\n"
    f"--{boundary}\r\nContent-Disposition: form-data; name=\"desc\"\r\n\r\nتست اولین آپلود\r\n"
    f"--{boundary}--\r\n"
).encode()
req = urllib.request.Request(U + "/api/upload", data=body, method="POST",
    headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
res = json.loads(opener.open(req).read().decode("utf-8"))
print("upload:", res["ok"], "->", res.get("photo", {}).get("key"))

# verify media serving
key = res["photo"]["key"]
r = opener.open(U + "/media/" + key)
data = r.read()
print("media fetch:", r.status, r.headers["Content-Type"], len(data), "bytes; png-magic:", data[:4] == b"\x89PNG")

# public photos API
photos = get("/api/pub/photos")
print("pub photos:", json.dumps(photos, ensure_ascii=False)[:300])
