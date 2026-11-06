// Renders slides.html at 2160x2700 (2x of 1080x1350).
// Usage: node render.cjs [outDir] [CTA_WORD]
// Needs (all gitignored): fonts/ (Clash Display Bold, Satoshi), brand/ logos, people/ before photos,
// after/after-0N-*.png (the user's ChatGPT renders). Missing after PNGs fall back to the stand-in plates/.
const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
const names = ["cover", "living-room", "sparkler", "marigold-doorway", "star-lantern", "cta"];
const here = (...p) => path.join(__dirname, ...p);
const pick = (...c) => { for (const f of c) if (f && fs.existsSync(here(f))) return { src: f }; return null; };
const after = (n) => pick(...fs.readdirSync(here("after")).filter(f => f.startsWith(`after-0${n}`)).map(f => "after/" + f));
const IMG = {
  before1: { ...pick("people/yrm-cover.jpg"), pos: "center 30%" },
  before2: { ...pick("people/sheetal-candid-smile.jpg"), pos: "center 25%" },
  before3: { ...pick("people/yrm-3.jpg"), pos: "center 30%" },
  before4: { ...pick("people/sheetal-candid-look-away.jpg"), pos: "center 25%" },
  before5: { ...pick("people/yrm-1.jpg"), pos: "center 30%" },
  after1: after(1), after2: after(2), after3: after(3), after4: after(4), after5: after(5),
};
for (const k in IMG) if (IMG[k] && !IMG[k].src) IMG[k] = null;
(async () => {
  const out = path.resolve(process.argv[2] || here("out/slides")); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await p.addInitScript(([img, cta]) => { window.IMG = img; if (cta) window.CTA = cta; }, [IMG, process.argv[3] || ""]);
  for (let i = 1; i <= names.length; i++) {
    await p.goto("file://" + here("slides.html") + "#s" + i, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const f = path.join(out, `0${i}-${names[i - 1]}.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
