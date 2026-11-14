# Photo to Notion-style sketch PROMPT carousel (14 Nov 2026)

TSB version of a photo-to-ink-illustration reference. 7 slides, 1080x1440 (3:4). User asked (14 Nov) to follow the reference layout closely: photo top half, ink sketch on white below, name top-left, IG handle top-right, bio bottom-left, page number bottom-right, frosted CTA card. The first "sketchbook" version is kept only as previews in project files v1-sketchbook/
Heading tweaked: "Photo to Notion-Style Sketch" + PROMPT in mint. Brand name written once per slide (the handle); top-left names the person in the photo (user, 14 Nov). Type tracked tight like the reference. Photos: studio/ (ChatGPT studio versions on brand-colour backdrops) > graded/ (grade.py) > people/.

Faces: YRM on 1 and 2 (cover front-facing), Digraj sir (DSR) on 4 and 6 (photos pulled from the web 14 Nov, user asked; copies in project files people/dsr/), Sheetal didi on 3, 5 and 7.
CTA: Comment "SKETCH" (word set by env CTA_WORD) + IG profile screenshot + save.

Build: `python3 -I prep.py . && node render.cjs out/`
- `people/before-0N-*.jpg`: the photos (local only).
- `after/after-0N-*.png`: the user's ChatGPT sketches (local only). Until they exist, `standin/` (rough auto line art) is used for layout previews.
- `ink/`: prep.py output (forest ink on transparent).
- Prompts: `CHATGPT_PROMPTS.md`. Mac drop folder: `The Skilled brains/Notion sketch prompt/` (before/, after/).
