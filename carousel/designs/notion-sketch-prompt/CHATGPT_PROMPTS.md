# Photo to Notion-style sketch PROMPT: ChatGPT pack

Seven sketches to make in ChatGPT (image generation). For each one: open a **new chat**, upload the photo, paste the master prompt, then add that photo's extra line.

**Mac folder:** `/Users/ayush/Downloads/Project Management /The Skilled brains/Notion sketch prompt/`
- Photos to upload are in `before/`
- Save each result in `after/` with the exact filename below (PNG). If ChatGPT can't save there, download it and drag it into `after/`.

## Master prompt (also the DM resource for the CTA)

```
Turn the person in this photo into a Notion-style illustration.

Style: clean hand-drawn black ink line art, like the people illustrations on Notion's website. Confident, slightly uneven pen outlines, minimal interior detail, solid flat black fills only on hair, dark clothing and shoes. No grey shading, no gradients, no colour, no hatching.

Likeness: keep the face clearly recognisable as this exact person: same face shape, hairstyle and hairline, glasses (if any), beard or moustache, skin texture left white, same expression. Keep the same clothes, the same pose and any object they hold.

Composition: the full figure exactly as posed in the photo, centred, with 6% white margin on every side. Add 2 or 3 tiny hand-drawn emotion/motion marks near the head. Drop the background completely.

Output: pure white #FFFFFF background, nothing else in the frame, no text, no signature, no border, no shadow. Portrait 2:3, 1024 x 1536 PNG.
```

## The seven images

| # | Upload (in before/) | Extra line to add | Save as (in after/) |
|---|---|---|---|
| 1 | `before-01-cover.jpg` (YRM, leaning on rail, smiling) | Show him from head to shoes even though the photo cuts at the knees: black trousers, white sneakers, leaning back with both elbows on a simple railing drawn in 3-4 lines. He looks straight at the viewer and smiles. | `after-01-cover.png` |
| 2 | `before-02-teaching.jpg` (YRM pointing at a screen) | Keep the raised pointing hand. Draw the screen behind him as a simple outlined rectangle with 3 short lines on it, nothing more. | `after-02-teaching.png` |
| 3 | `before-03-thinking.jpg` (Sheetal didi, hand on chin, looking up) | Half body. Keep the thoughtful upward look, hand on chin, long open hair as a solid black shape with a few white strand lines, small hoop earrings, wrist watch. Add a tiny hand-drawn question mark near her head. | `after-03-thinking.png` |
| 4 | `before-04-arms-crossed.jpg` (YRM, arms crossed) | Full body, arms crossed, confident head tilt. Overshirt open over a tee, light trousers, sneakers. No screen. | `after-04-arms-crossed.png` |
| 5 | `before-05-pointing-up.jpg` (Sheetal didi, both index fingers up) | Waist up. Both hands up, index fingers pointing to the sky, big smile, long open hair as a solid black shape. Add 3 small spark marks above the fingers. | `after-05-pointing-up.png` |
| 6 | `before-06-creators-hq.jpg` (YRM standing, hands in pockets) | Full body, hands in pockets, relaxed stance, cream overshirt over a white tee, light trousers, sneakers. No sign or background. | `after-06-creators-hq.png` |
| 7 | `before-07-cta.jpg` (Sheetal didi smiling, holding a card) | Waist up. Big smile, one hand holding up a small blank card, long open hair as a solid black shape. | `after-07-cta.png` |

## After you save them

Tell the thread "sketches are in". The thread stages `after/` into this design folder, runs `python3 -I prep.py .` (turns the black ink forest green on the ivory paper) and `node render.cjs`. Nothing else in the design changes.

## Tips
- If the face drifts, reply in the same chat: "Make the face look more like the photo: same jaw, nose, eyes and glasses. Keep everything else."
- If ChatGPT adds grey shading or a background: "Pure black ink on pure white only, remove all grey and background."
