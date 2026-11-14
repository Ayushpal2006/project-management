# Photo to Notion-style sketch PROMPT carousel (14 Nov 2026)

TSB version of a photo-to-ink-illustration reference. 7 slides, 1080x1440 (3:4). User asked (14 Nov) to follow the reference layout closely: photo top half, ink sketch on white below, name top-left, IG handle top-right, bio bottom-left, page number bottom-right, frosted CTA card. The first "sketchbook" version is kept only as previews in project files v1-sketchbook/
Heading tweaked: "Photo to Notion-Style Sketch" + PROMPT in mint. Anton, Clash Display, Satoshi, Playfair italic for the CTA word.

Faces: YRM on 1, 2, 4, 6 (cover is front-facing, looking at camera); Sheetal didi on 3, 5 and 7 (CTA).
CTA: Comment "SKETCH" (word set by env CTA_WORD) + IG profile screenshot + save.

Build: `python3 -I prep.py . && node render.cjs out/`
- `people/before-0N-*.jpg`: the photos (local only).
- `after/after-0N-*.png`: the user's ChatGPT sketches (local only). Until they exist, `standin/` (rough auto line art) is used for layout previews.
- `ink/`: prep.py output (forest ink on transparent).
- Prompts: `CHATGPT_PROMPTS.md`. Mac drop folder: `The Skilled brains/Notion sketch prompt/` (before/, after/).
