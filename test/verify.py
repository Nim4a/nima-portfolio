import urllib.request, json, http.cookiejar

U = "https://nima-portfolio.nima64301.workers.dev"
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
opener.addheaders = [("User-Agent", "Mozilla/5.0")]

def post(path, obj):
    data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
    try:
        r = opener.open(urllib.request.Request(U + path, data=data, method="POST", headers={"Content-Type": "application/json; charset=utf-8"}))
        return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode("utf-8"))

def get(path):
    return json.loads(opener.open(U + path).read().decode("utf-8"))

# 1) public page sanity: no leaked placeholders / syntax junk
html = opener.open(U + "/").read().decode("utf-8")
issues = []
for bad in ["JSO_HEADERS", " photographers", "claarDescription", "undefined", "NaN", "rekt"]:
    if bad in html:
        issues.append(bad)
print("public page placeholder check:", "OK" if not issues else issues)
print("public page bytes:", len(html))

admin = opener.open(U + "/admin").read().decode("utf-8")
issues2 = []
for bad in ["JSO_HEADERS", " photographers", "claarDescription", "meta-get", "/tabs"]:
    if bad in admin:
        issues2.append(bad)
print("admin page placeholder check:", "OK" if not issues2 else issues2)
print("admin page bytes:", len(admin))

# 2) unauthorized guard: /api/photos without cookie must be 401
try:
    opener2 = urllib.request.build_opener()
    opener2.addheaders = [("User-Agent", "Mozilla/5.0")]
    opener2.open(U + "/api/photos")
    print("auth guard: FAIL (200 without login)")
except urllib.error.HTTPError as e:
    print("auth guard:", "OK (401)" if e.code == 401 else f"FAIL ({e.code})")

# 3) upload without auth must fail
try:
    req = urllib.request.Request(U + "/api/upload", data=b"x", method="POST")
    opener2.open(req)
    print("upload guard: FAIL")
except urllib.error.HTTPError as e:
    print("upload guard:", "OK (401)" if e.code == 401 else f"FAIL ({e.code})")

# 4) media path traversal guard
try:
    opener2.open(U + "/media/..%2f..%2fetc%2fpasswd")
    print("media guard: FAIL")
except urllib.error.HTTPError as e:
    print("media traversal guard:", "OK (" + str(e.code) + ")")

# 5) admin flows: edit photo, reorder, cat dup, delete
post("/api/login", {"password": "CHANGE_ME_ADMIN_PASSWORD"})
cats = get("/api/pub/cats")["cats"]
photos = get("/api/pub/photos")["photos"]
assert cats and photos, "need cats and photos"
pid = photos[0]["id"]

r = post("/api/photo", {"id": pid, "name": "عکس آزمایشی ۲", "desc": "توضیح جدید", "cat": cats[1]["id"]})
print("edit photo:", r["ok"], "-", r["photo"]["name"], "in", r["photo"]["cat"])
p2 = get("/api/pub/photos")["photos"][0]
print("verify edit:", "OK" if p2["name"] == "عکس آزمایشی ۲" and p2["cat"] == cats[1]["id"] else "FAIL")

r = post("/api/cats", {"name": "عکاسی"})
print("dup cat rejected:", "OK" if not r["ok"] else "FAIL")

r = post("/api/reorder", {"photos": [pid]})
print("reorder:", r["ok"], "| count now:", len(get("/api/pub/photos")["photos"]))

# cleanup test photo
print("cleanup:", post("/api/photo/delete", {"id": pid})["ok"], "| photos left:", len(get("/api/pub/photos")["photos"]))
