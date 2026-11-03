// Renders the slides at 2160x2700 (2x of 1080x1350) with Playwright.
// Usage: node render.cjs [outDir]   (default: ../../../output/30-day-page-growth)
// Fonts: put Satoshi-Medium/Bold/Black.woff2 and Silkscreen.woff2 in ./fonts (gitignored). DSR cut-out in ./people/dsr-cutout.png (gitignored).
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const names = ["cover", "mistake", "outliers", "why-it-worked", "pattern", "50-50-rule", "loop-cta"];
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "../../../output/30-day-page-growth"));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const url = "file://" + path.join(__dirname, "slides.html");
  for (let i = 1; i <= names.length; i++) {
    await page.goto(`${url}#s${i}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
})();
