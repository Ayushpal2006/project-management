// Renders the 7 slides at 2160x2700 (2x of 1080x1350) with Playwright.
// Usage: node render.cjs [outDir]   (default: ../../../output/reel-4-line-script)
// Fonts: put ClashDisplay-Bold.woff2, Satoshi-*.woff2, Silkscreen-Regular.ttf, PlayfairDisplay.ttf in ./fonts
// (gitignored; Fontshare licence). Without them the page falls back to the Fontshare / Google Fonts CDN.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const names = ["cover", "before", "hook", "problem", "value", "cta", "after"];
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "../../../output/reel-4-line-script"));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const url = "file://" + path.join(__dirname, "slides.html");
  for (let i = 1; i <= 7; i++) {
    await page.goto(`${url}#s${i}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
})();
