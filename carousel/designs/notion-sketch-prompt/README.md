# Photo to Notion-style sketch PROMPT carousel (14 Nov 2026)

TSB version of a photo-to-ink-illustration reference (adapted, not copied). 7 slides, 1080x1350.
Direction: sketchbook. Ivory paper with a faint dot grid, the forest-green ink sketch is the hero, the real photo is taped on as a polaroid with mint washi tape, one mint arrow. Clash Display + Anton headline, Satoshi body, Silkscreen chips.

Faces: YRM on 1, 2, 4, 6 (cover is front-facing, looking at camera); Sheetal didi on 3 and 5 and the CTA.
CTA: Comment "SKETCH" (word set by env CTA_WORD) + IG profile screenshot + save.

Build: `python3 -I prep.py . && node render.cjs out/`
- `people/before-0N-*.jpg`: the photos (local only).
- `after/after-0N-*.png`: the user's ChatGPT sketches (local only). Until they exist, `standin/` (rough auto line art) is used for layout previews.
- `ink/`: prep.py output (forest ink on transparent).
- Prompts: `CHATGPT_PROMPTS.md`. Mac drop folder: `The Skilled brains/Notion sketch prompt/` (before/, after/).
