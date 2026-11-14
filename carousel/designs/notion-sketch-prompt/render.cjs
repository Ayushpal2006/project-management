// Renders slides.html at 2160x2880 (2x of 1080x1440, 3:4). Usage: python3 -I grade.py . && python3 -I prep.py . && node render.cjs [outDir]
// Photos: people/before-0N-*.jpg. Sketches: ink/ink-0N.png (made by prep.py from after/ or standin/).
// CTA word: env CTA_WORD (default SKETCH).
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const names = ["cover", "teaching", "thinking", "dsr-desk", "pointing-up", "dsr-window", "cta"];
const url = f => "file://" + path.join(__dirname, f);
const IMG = { ctaWord: process.env.CTA_WORD || "SKETCH" };
for (let n = 1; n <= 7; n++) {
  // photo: studio/ (ChatGPT studio version) > graded/ (grade.py) > people/ (original)
  for (const dir of ["studio", "graded", "people"]) {
    const d = path.join(__dirname, dir);
    const b = fs.existsSync(d) && fs.readdirSync(d).find(f => f.startsWith(`before-0${n}-`) || f.startsWith(`studio-0${n}-`));
    if (b) { IMG["before" + n] = url(`${dir}/${b}`); break; }
  }
  IMG["ink" + n] = url(`ink/ink-0${n}.png`);
}
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "out"));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: +(process.env.SCALE || 2) });
  await page.addInitScript(m => { window.IMG = m; }, IMG);
  for (let i = 1; i <= names.length; i++) {
    await page.goto(url("slides.html") + `#s${i}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
})();
