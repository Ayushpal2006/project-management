// Renders slides.html at 2160x2700 (2x of 1080x1350). Usage: node render.cjs [outDir]
// Afters: hq/ (EDSR x2 upscale of after/) wins, then after/after-0N-*.png (user's ChatGPT output); otherwise standin/after-0N-*.jpg (layout preview only).
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const names = ["cover", "before-path", "after-path", "before-museum", "after-museum", "cliff-split", "cta"];
const keys = { 1: "cover", 2: "jungle-path", 3: "museum", 4: "cliff" };
const url = f => "file://" + path.join(__dirname, f);
function find(dir, stem) {
  const d = path.join(__dirname, dir);
  if (!fs.existsSync(d)) return null;
  const f = fs.readdirSync(d).find(n => n.startsWith(stem + ".") || n.startsWith(stem));
  return f ? `${dir}/${f}` : null;
}
const IMG = {}, used = {};
for (const [n, k] of Object.entries(keys)) {
  IMG["before" + n] = url(`people/before-0${n}-${k}.jpg`);
  const a = find("hq", `after-0${n}-${k}-2x`) || find("after", `after-0${n}-${k}`) || find("standin", `after-0${n}-${k}`);
  IMG["after" + n] = url(a); used[n] = a;
}
console.log("afters:", used);
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "out"));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: +(process.env.SCALE || 2) });
  await page.addInitScript(m => { window.IMG = m; }, IMG);
  for (let i = 1; i <= names.length; i++) {
    await page.goto(url("slides.html") + `#s${i}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
})();
