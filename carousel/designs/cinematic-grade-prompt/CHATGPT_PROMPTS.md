# Cinematic colour grading prompt: ChatGPT pack

Carousel: "Cinematic Colour Grading PROMPT" (TSB version of a before/after grading reference).
Before photos are YRM's own (Drive "YRM photos": Bali trip + New iphone 17). They stay out of git.

## How to run it

1. Open ChatGPT (image generation on). New chat for each photo.
2. Upload ONE before photo from `before/`.
3. Paste the MASTER PROMPT below, unchanged.
4. Download the result as PNG and save it in `after/` with the matching name:

| Upload | Save the result as |
|---|---|
| `before/before-01-cover.jpg` (beach, overcast) | `after/after-01-cover.png` |
| `before/before-02-jungle-path.jpg` (village path) | `after/after-02-jungle-path.png` |
| `before/before-03-museum.jpg` (Museum of the Future) | `after/after-03-museum.png` |
| `before/before-04-cliff.jpg` (Kelingking cliff) | `after/after-04-cliff.png` |

Mac folder: `/Users/ayush/Downloads/Project Management /The Skilled brains/Cinematic grading prompt/`
If ChatGPT can't save there, download the PNG and drag it into that `after/` folder yourself.
If the face changes even slightly, hit regenerate. The face must stay his.

## MASTER PROMPT (this is also the prompt people get when they comment)

```
Edit this exact photo. Do not create a new image.

Keep everything about the person 100% identical: same face, same facial features, same skin tone, same expression, same hair, same sunglasses, same clothes, same pose, same body shape, same position in the frame. Keep the same background, the same objects and the same camera angle and framing. Do not add or remove people, objects or text.

Only change the light and the colour, like a professional film colourist:

- Light: turn it into golden hour, about 40 minutes before sunset. Warm, low sunlight coming from one side, with soft long shadows and a gentle warm rim light on the hair, shoulders and edges of the clothes.
- Atmosphere: add a light natural haze in the background and soft visible sun rays where the light passes through trees, buildings or clouds. Keep it subtle and believable.
- Sky: if the sky is grey, flat or overexposed, replace it with a late-afternoon sky: soft blue fading to warm peach near the horizon, with a few scattered clouds lit gold underneath.
- Colour grade: warm amber and honey highlights, deep teal-green shadows, rich but natural greens, skin tones warm and true to life (never orange). Slightly lifted blacks, gentle film-style contrast, smooth highlight roll-off, no clipped whites.
- Finish: shot on a full-frame cinema camera with a 35mm lens, shallow but natural depth of field, very fine film grain, crisp detail. Photorealistic, like a still from a premium travel film.

Output: portrait orientation, the same framing as the original, highest resolution available, PNG.
```

## Notes for the carousel

- The after must be the SAME photo, only relit and graded. If ChatGPT moves him, changes the face or adds things, regenerate.
- Afters land in `after/` and are wired into slides automatically by `render.cjs` (falls back to the stand-in preview if a file is missing).
