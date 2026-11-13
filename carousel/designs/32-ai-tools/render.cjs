// Renders slides.html at 2160x2700 (2x of 1080x1350). Usage: node render.cjs [outDir]
// Needs local (gitignored) fonts/, people/sheetal-cut.png and logos/ (see slides.html header).
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const names = ["cover", "video-design", "writing-voice", "research-presentations", "coding-organised", "cta"];
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "../../../output/32-ai-tools"));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: +(process.env.SCALE || 2) });
  for (let i = 1; i <= names.length; i++) {
    await page.goto("file://" + path.join(__dirname, "slides.html") + `#s${i}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
})();
