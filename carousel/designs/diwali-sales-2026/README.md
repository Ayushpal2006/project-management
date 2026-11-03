# Diwali Sales Campaign 2026 (3–7 Nov): conversion push banners

Five banners, each at 1024×512 (plus @2x) and 1080×1350. Copy table and QC: `CAMPAIGN_SHEET.md`. ChatGPT fallback: `CHATGPT_PROMPTS.md`.
Not the Diwali Skill Week set (`../diwali-skill-week`).

Build (all in the cloud):
1. Put the official `Logo.png` and the headshots `DSR.png`, `Ujjwal.png`, `Sheetal.png` and `Yash V.png` (from the Mac brand folder) in a folder, then run `python3 cutout.py <folder>`, which writes the gitignored `people/` cut-outs. For the logo, recolour `Logo.png` into `brand/logo-forest.png` and `brand/logo-ivory.png` (copies are in project files `brand-sync/logo/`).
2. Run `node ui/render-ui.cjs`, then `python3 composite.py`, which warps the UI screens onto the chroma-green screens of the `plates/d*-*.jpg` photos.
3. Run `node render.cjs [d1|d2|…]`, which writes to `out/`.

Plates and props (`plates/*-src.jpg`, `props/`) were made with Gemini 3 Pro Image and contain no people. Headlines use Poppins from Google Fonts.
