// Renders the Diwali AI GIFs carousel.
//   node render.cjs [outDir] [CTA_WORD]
// Output: 0N-*.png stills (2160x2700) for every slide, plus 0N-*.mp4 (1080x1350, 24 fps, 3 s loop x2)
// and 0N-*.gif (540x675) for the animated slides 1-3. Needs (gitignored): art/ (ChatGPT PNGs),
// people/ (real photos), assets/ (logo, IG profile screenshot), optional fonts/. Effect positions: fx.json.
const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
const { execFileSync } = require("child_process");
const here = (...p) => path.join(__dirname, ...p);
const has = f => fs.existsSync(here(f)) ? { src: f } : null;
const names = ["cover", "same-photo", "now-it-moves", "cta"];
const IMG = {
  art1: has("art/art-01-cover-yrm.png"), art2: has("art/art-02-sheetal.png"), art3: has("art/art-03-yrm-balcony.png"),
  before1: { src: "people/yrm-cover.jpg", pos: "center 30%" }, before2: { src: "people/sheetal.jpg", pos: "center 30%" },
  before3: { src: "people/yrm-balcony.jpg", pos: "center 40%" },
};
const FX = fs.existsSync(here("fx.json")) ? JSON.parse(fs.readFileSync(here("fx.json"))) : {};
for (const k of Object.keys(FX)) if (k.startsWith("_")) delete FX[k];
const POS = FX.pos || {}; delete FX.pos; for (const k in POS) if (IMG[k]) IMG[k].pos = POS[k];
const FPS = 24, SEC = 3, ONLY = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;
(async () => {
  const out = path.resolve(process.argv[2] || here("out")); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const mk = async dsf => { const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: dsf });
    await p.addInitScript(([img, fx, cta]) => { window.IMG = img; window.FX = fx; if (cta) window.CTA = cta; }, [IMG, FX, process.argv[3] || ""]);
    await p.goto("file://" + here("slides.html"), { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready); return p; };
  const still = await mk(2), vid = process.env.STILLS ? null : await mk(1);
  for (let i = 1; i <= 4; i++) {
    if (ONLY && !ONLY.includes(i)) continue;
    const id = "s" + i, base = path.join(out, `0${i}-${names[i - 1]}`);
    await still.evaluate(([id]) => { show(id); setT(id, .6); }, [id]); await still.waitForTimeout(150);
    await still.screenshot({ path: base + ".png" }); console.log(base + ".png");
    if (!vid || i === 4) continue;
    const fr = path.join(out, "frames", id); fs.rmSync(fr, { recursive: true, force: true }); fs.mkdirSync(fr, { recursive: true });
    await vid.evaluate(([id]) => show(id), [id]);
    for (let f = 0; f < FPS * SEC; f++) {
      await vid.evaluate(([id, t]) => setT(id, t), [id, f / (FPS * SEC)]);
      await vid.screenshot({ path: path.join(fr, `f${String(f).padStart(3, "0")}.png`) });
    }
    const ff = (...a) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...a]);
    // MP4 for Instagram: loop the 3 s cycle twice (6 s), H.264 high quality
    ff("-stream_loop", "1", "-framerate", String(FPS), "-i", path.join(fr, "f%03d.png"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-preset", "slow", "-movflags", "+faststart", base + ".mp4");
    // GIF for WhatsApp: 540 px wide, 12 fps, shared palette
    ff("-framerate", String(FPS), "-i", path.join(fr, "f%03d.png"), "-vf", "fps=12,scale=540:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=sierra2_4a", "-loop", "0", base + ".gif");
    console.log(base + ".mp4 / .gif");
  }
  await b.close();
})();
