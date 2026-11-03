# Diwali Skill Week push banners (3–8 Nov 2026)

Six 1024 × 512 push notification banners promoting all courses. Not a carousel: no numerals, CTAs or 7-slide rules.

- `plates/d0X.jpg`: photo plates (generated with Gemini 3 Pro Image, prompts in `CHATGPT_PROMPTS.md`). Device screens were left blank on purpose.
- `ui/*.html`: the screens put on the devices (AI workflow with ChatGPT / Gemini / Claude logos, phone editing timeline, monitor editor with YouTube + Instagram export icons). Logos from simple-icons.
- `python3 composite.py`: renders nothing itself; warps `ui/*.png` onto the plates into `plates/c0X.jpg`. Run `node ui/render-ui.cjs` first.
- `node render.cjs [prefix]`: writes `out/<id>.png|@2x.png`. Copy text and per-day settings are in `banners.json`.
- Logo: put the original file at `brand/logo.svg` or `brand/logo.png` in this folder (gitignored) and re-render; it appears top-left. Until then the banners render without it.
- Fonts: Clash Display Bold + Satoshi in gitignored `fonts/` (see the carousel fonts note in AGENTS memory).

Renders live in project files `diwali-skill-week/`; ChatGPT fallback in `diwali-skill-week/chatgpt-pack/`.
