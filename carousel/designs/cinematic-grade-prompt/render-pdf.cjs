// Renders prompt-pack.html to a PDF (the public COMMENT "PROMPT" DM resource). Usage: node render-pdf.cjs [out.pdf]
const { chromium } = require("playwright");
const path = require("path");
const url = f => "file://" + path.join(__dirname, f);
// small JPEG copies keep the PDF light enough to send in DMs (made by: python3 pdf-images.py)
const IMG = {
  before1: url("out/pdfimg/before1.jpg"), after1: url("out/pdfimg/after1.jpg"),
  before2: url("out/pdfimg/before2.jpg"), after2: url("out/pdfimg/after2.jpg"),
};
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, "out/Cinematic-Grading-Prompt.pdf"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.addInitScript(m => { window.IMG = m; }, IMG);
  await page.goto(url("prompt-pack.html"), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.pdf({ path: out, width: "1080px", height: "1350px", printBackground: true });
  await browser.close();
  console.log(out);
})();
