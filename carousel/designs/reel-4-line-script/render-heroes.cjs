// Renders the 3D heroes to heroes/<name>.png (transparent, 2160x2000). Run before render.cjs.
// Needs: npm i three@0.169.0 (in this folder) and the preinstalled Playwright Chromium.
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "../../..");
const types = { ".html": "text/html", ".js": "text/javascript", ".ttf": "font/ttf", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const heroes = (process.argv[2] || "phone,watch,hook,grid,keys,save,bubble").split(",");
(async () => {
  const port = server.address().port;
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1000 } });
  page.on("console", m => m.type() === "error" && console.error(m.text()));
  page.on("pageerror", e => console.error(e.message));
  for (const h of heroes) {
    await page.goto(`http://localhost:${port}/carousel/designs/reel-4-line-script/heroes/hero.html?h=${h}`);
    await page.waitForFunction(() => window.__done === true, null, { timeout: 60000 });
    const data = await page.evaluate(() => document.querySelector("canvas").toDataURL("image/png"));
    const out = path.join(__dirname, "heroes", `${h}.png`);
    fs.writeFileSync(out, Buffer.from(data.split(",")[1], "base64"));
    console.log(out);
  }
  await browser.close(); server.close();
})();
