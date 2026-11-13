// node guide-pdf.cjs <out.pdf> [pngDir]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.resolve(__dirname, 'guide.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.pdf({ path: process.argv[2], width: '794px', height: '1123px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  if (process.argv[3]) {
    const els = await p.$$('.page');
    for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(process.argv[3], 'g' + String(i + 1).padStart(2, '0') + '.png') });
  }
  await b.close();
})();
