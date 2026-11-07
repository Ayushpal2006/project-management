// Renders the Diwali AI GIFs carousel.
//   node render.cjs [outDir] [CTA_WORD]
// Output: 0N-*.png stills (2160x2700) for every slide, plus 0N-*.mp4 (1080x1350, 24 fps, 4 s loop x2: real photo -> sparkle reveal -> animated art)
// and 0N-*.gif (540x675) for the animated slides 1-3. Needs (gitignored): art/ (ChatGPT PNGs),
// people/ (real photos), assets/ (logo, IG profile screenshot), optional fonts/. Effect positions: fx.json.
const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
const { execFileSync } = require("child_process");
const here = (...p) => path.join(__dirname, ...p);
const has = f => fs.existsSync(here(f)) ? { src: f } : null;
const names = ["cover", "same-photo", "now-it-moves", "cta"];
const IMG = {
  art1: has("art/clean-01.png") || has("art/art-01-cover-yrm.png"), art2: has("art/clean-02.png") || has("art/art-02-sheetal.png"), art3: has("art/clean-03.png") || has("art/art-03-yrm-balcony.png"),
  cta1: has("art/art-01-cover-yrm.png"), cta2: has("art/art-02-sheetal.png"), cta3: has("art/art-03-yrm-balcony.png"),
  before1: { src: "people/yrm-cover.jpg", pos: "center 30%" }, before2: { src: "people/sheetal.jpg", pos: "center 30%" },
  before3: { src: "people/yrm-balcony.jpg", pos: "center 40%" },
};
const FX = fs.existsSync(here("fx.json")) ? JSON.parse(fs.readFileSync(here("fx.json"))) : {};
for (const k of Object.keys(FX)) if (k.startsWith("_")) delete FX[k];
const POS = FX.pos || {}; delete FX.pos; const REVEAL = FX.reveal || {}; delete FX.reveal; for (const k in POS) if (IMG[k]) IMG[k].pos = POS[k];
// sprites cut by prep_sprites.py (motion settings per sprite live in fx.json "sprites")
const SPR = fs.existsSync(here("art/sprites.json")) ? JSON.parse(fs.readFileSync(here("art/sprites.json"))) : {};
const SPRFX = FX.sprites || {}; delete FX.sprites;
for (const k in SPR) Object.assign(SPR[k], { src: `art/sp-${k}.png` }, SPRFX[k] || {});
const SEC = 4, ONLY = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;
(async () => {
  const out = path.resolve(process.argv[2] || here("out")); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const mk = async (dsf, anim) => { const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: dsf });
    await p.addInitScript(([img, fx, rv, spr, anim, cta]) => { window.IMG = img; window.FX = fx; window.REVEAL = rv; window.SPR = spr; window.ANIM = anim; if (cta) window.CTA = cta; }, [IMG, FX, REVEAL, SPR, !!anim, process.argv[3] || ""]);
    await p.goto("file://" + here("slides.html"), { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready); await p.evaluate(() => window.SPR_READY); return p; };
  const still = await mk(2), vid = process.env.STILLS ? null : await mk(1, true);
  const CLIP = { s1: { x: 200, y: 250, width: 680, height: 900 }, s2: { x: 60, y: 80, width: 640, height: 850 }, s3: { x: 150, y: 90, width: 700, height: 930 } };
  const CTAF = {}, GF = 12, N = GF * SEC;  // GIFs: 12 fps, full 1080x1350
  const ff = (...a) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...a]);
  const gif = (dir, out) => ff("-framerate", String(GF), "-i", path.join(dir, "f%03d.png"), "-vf", "split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle", "-loop", "0", out);
  for (let i = 1; i <= 4; i++) {
    if (ONLY && !ONLY.includes(i)) continue;
    const id = "s" + i, base = path.join(out, `0${i}-${names[i - 1]}`);
    await still.evaluate(([id]) => { show(id); setT(id, .6); }, [id]); await still.waitForTimeout(150);
    await still.screenshot({ path: base + ".png" }); console.log(base + ".png");
    if (!vid) continue;
    const fr = path.join(out, "frames", id); fs.rmSync(fr, { recursive: true, force: true }); fs.mkdirSync(fr, { recursive: true });
    await vid.evaluate(([id, f]) => { show(id); window.CTAF = f; }, [id, CTAF]);
    if (CLIP[id]) { CTAF["cta" + i] = []; fs.mkdirSync(path.join(fr, "cta"), { recursive: true }); }
    for (let f = 0; f < N; f++) {
      await vid.evaluate(([id, t]) => setT(id, t), [id, f / N]);
      await vid.screenshot({ path: path.join(fr, `f${String(f).padStart(3, "0")}.png`) });
      if (CLIP[id]) { const cp = path.join(fr, "cta", `c${String(f).padStart(3, "0")}.png`);
        await vid.evaluate(() => document.body.classList.add("artonly")); await vid.screenshot({ path: cp, clip: CLIP[id] });
        await vid.evaluate(() => document.body.classList.remove("artonly")); CTAF["cta" + i].push("file://" + cp); }
    }
    gif(fr, base + ".gif");
    // MP4 copy for Instagram (it doesn't take GIF uploads): 2 loops
    ff("-stream_loop", "1", "-framerate", String(GF), "-i", path.join(fr, "f%03d.png"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-r", "24", "-movflags", "+faststart", base + ".mp4");
    console.log(base + ".gif / .mp4");
  }
  await b.close();
})();
