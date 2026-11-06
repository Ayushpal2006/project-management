// Renders prompt-pack.html to an A4 PDF. Usage: node render-pdf.cjs out/prompt-pack.pdf
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const out = path.resolve(process.argv[2] || "out/Diwali-Prompt-Pack.pdf");
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname, "prompt-pack.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: out, format: "A4", printBackground: true });
  await b.close();
  console.log(out);
})();
