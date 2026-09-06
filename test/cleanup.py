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

post("/api/login", {"password": "CHANGE_ME_ADMIN_PASSWORD"})
cats = json.loads(opener.open(U + "/api/pub/cats").read().decode())["cats"]
for c in cats:
    print("deleting", c["id"], c["name"], "->", post("/api/cats/delete", {"id": c["id"]})["ok"])
print("clean")
