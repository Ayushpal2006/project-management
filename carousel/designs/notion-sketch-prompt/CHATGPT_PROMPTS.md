# Photo to Notion-style sketch PROMPT: ChatGPT pack (v2, matches the reference)

Each slide needs **two images**, made in **one ChatGPT chat per slide** (7 chats):
- **Step A, studio photo:** your real phone photo turned into an editorial studio photo (like the reference's top half). Same person, same clothes and pose, a seamless backdrop in a brand colour.
- **Step B, sketch:** in the same chat, the studio photo turned into the Notion-style ink sketch (the bottom half).

**Mac folder:** `/Users/ayush/Downloads/Project Management /The Skilled brains/Notion sketch prompt/`
- Upload from `before/`
- Save Step A in `studio/` and Step B in `after/`, with the exact names in the table. If ChatGPT can't save there, download and drag the files in.

If you skip Step A, the slide uses your original photo with a light grade. Step B is required.

## Step A prompt (paste with the photo, then add the slide's backdrop line)

```
Recreate this exact photo as a high-end editorial studio portrait.

Keep the person 100% identical: same face, face shape, skin tone, hairstyle, glasses, beard/moustache, expression, body and the same clothes and pose. Do not beautify, slim, or change age. This is a real person and must stay recognisable.

Studio: one seamless paper backdrop (colour given below), soft large key light from the front-left, gentle fill, soft natural shadow on the floor, slight warm film tone, crisp focus, 85mm lens look, eye-level camera. The person fills about 70% of the frame height with clean space around them.

No text, no logos, no props that are not in my photo.
Landscape 3:2, 1536 x 1024 PNG.
```

## Step B prompt (send in the same chat, right after Step A)

```
Now turn the person in that studio photo into a Notion-style illustration.

Style: clean hand-drawn black ink line art, like the people illustrations on Notion's website. Confident pen outlines with varied weight, solid flat black fills on hair, dark clothing and shoes, crisp detail on folds, glasses, watch and shoes. No grey shading, no gradients, no colour.

Likeness: keep the face clearly recognisable as this exact person (same face shape, hairstyle, glasses, beard or moustache, expression). Same clothes, same pose, same objects.

Composition: the full figure as posed, centred, 6% white margin on every side. Add 2 or 3 tiny hand-drawn emotion/motion marks near the head. No background at all.

Output: pure white #FFFFFF background, no text, no signature, no border, no shadow. Portrait 2:3, 1024 x 1536 PNG.
```

## The seven slides

| # | Upload (before/) | Step A backdrop line | Step B extra line | Save Step A (studio/) | Save Step B (after/) |
|---|---|---|---|---|---|
| 1 | `before-01-cover.jpg` YRM leaning, smiling | Backdrop: deep forest green #012816. He leans back on a simple black metal studio rail, looking straight at the camera, smiling. Show him from head to shoes. | Head to shoes, leaning back on a simple railing drawn in a few lines, looking at the viewer. | `studio-01-cover.png` | `after-01-cover.png` |
| 2 | `before-02-teaching.jpg` YRM pointing | Backdrop: clean white #FFFFFF. Keep the raised pointing hand; replace the TV with nothing (he points at empty space). | Keep the raised pointing hand. | `studio-02-teaching.png` | `after-02-teaching.png` |
| 3 | `before-03-thinking.jpg` Sheetal didi, hand on chin | Backdrop: sage green #7ED088. Half body, hand on chin, looking up thoughtfully. | Half body. Long open hair as a solid black shape with a few white strand lines; small hoop earrings; wrist watch. Add a tiny question mark near her head. | `studio-03-thinking.png` | `after-03-thinking.png` |
| 4 | `before-04-arms-crossed.jpg` YRM arms crossed | Backdrop: warm ivory #F6F0E4. Full body, arms crossed, confident head tilt; remove the screen. | Full body, arms crossed, overshirt open over a tee, sneakers. | `studio-04-arms-crossed.png` | `after-04-arms-crossed.png` |
| 5 | `before-05-pointing-up.jpg` Sheetal didi, fingers up | Backdrop: dark forest #14281C hand-painted canvas texture (like an old-master studio backdrop). Waist up, both index fingers up, big smile. | Waist up, both index fingers up, big smile, 3 small spark marks above the fingers. | `studio-05-pointing-up.png` | `after-05-pointing-up.png` |
| 6 | `before-06-creators-hq.jpg` YRM, hands in pockets | Backdrop: soft light grey #E9ECEA. Full body, hands in pockets, relaxed; no sign. | Full body, hands in pockets, cream overshirt over a white tee, light trousers, sneakers. | `studio-06-creators-hq.png` | `after-06-creators-hq.png` |
| 7 | `before-07-cta.jpg` Sheetal didi smiling with a card | Backdrop: soft light grey #E9ECEA. Waist up, big smile, holding up a small blank card. | Waist up, big smile, one hand holding up a small blank card. | `studio-07-cta.png` | `after-07-cta.png` |

The backdrops use only brand colours (forest #012816, dark forest #14281C, sage #7ED088, ivory #F6F0E4, white, light grey), so the brand brief doesn't change.

## Tips
- If the face drifts in Step A: "The face must match my photo exactly: same jaw, nose, eyes, glasses and skin tone. Keep everything else."
- If Step B adds grey or a background: "Pure black ink on pure white only. Remove all grey and background."

## The DM resource
The Step B prompt is the one people get when they comment "SKETCH".

## After you save them
Tell the thread "images are in". The thread stages `studio/` and `after/` into this design, runs `grade.py`, `prep.py` and `render.cjs`, and nothing else in the layout changes.
