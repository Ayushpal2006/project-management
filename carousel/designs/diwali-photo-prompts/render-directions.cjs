// Renders the style frames in directions.html at 1080x1350 (2x). Usage: node render-directions.cjs outDir
const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
(async () => {
  const out = path.resolve(process.argv[2] || "out/directions"); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2400, height: 1500 }, deviceScaleFactor: 1 });
  await p.goto("file://" + path.join(__dirname, "directions.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  for (const id of ["a1","a2","b1","b2","c1","c2"]) { await p.locator("#"+id).screenshot({ path: path.join(out, id + ".png") }); console.log(id); }
  await b.close();
})();
