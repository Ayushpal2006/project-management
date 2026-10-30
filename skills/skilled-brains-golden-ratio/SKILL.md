---
name: skilled-brains-golden-ratio
description: Use when composing a Skilled Brains carousel slide, thumbnail or video frame, to place the face, headline and supporting elements on golden-ratio (phi) lines and size type on a phi scale.
---

# Golden-ratio layout

phi = 1.618. We use it three ways: where things go, how big type is, and how space is split. It is a guide for balance, not a cage: if a layout reads better a few pixels off, keep it readable.

## 1. Placement: the phi grid

Split each side at 0.382 and 0.618. The four crossing points are where the eye lands first.

| Format | Vertical lines (x) | Horizontal lines (y) |
|--------|--------------------|----------------------|
| 1080x1350 carousel | 413, 667 | 516, 834 |
| 1080x1920 reel / short | 413, 667 | 733, 1187 |
| 1920x1080 video | 733, 1187 | 413, 667 |
| 1280x720 thumbnail | 489, 791 | 275, 445 |

`node tools/overlay.js <format>` draws these (yellow) together with the safe zones.

- **Face:** eyes on the upper horizontal line (y = 0.382 of the height). Face centred on a vertical line, looking into the larger side of the frame.
- **Headline:** in the larger space the face looks into, its top-left on a crossing point, or centred on the lower horizontal line when the face is centred.
- **One dominant element per frame.** Everything else is at most 1/phi of its size.

## 2. Type scale

Step each size by phi from the body size. For a 1080-wide carousel with 28 px body:

| Role | Size |
|------|------|
| Caption / small label | 17 |
| Body | 28 |
| Sub-head | 45 |
| Headline | 73 |
| Hero word | 118 |
| Giant hero (one word) | 191 |

For video at 1920x1080, start from 36 px body (36, 58, 94, 152, 246). Line height 1.2 for headlines, 1.45 for body.

## 3. Space

- Split a slide into image and text blocks at 61.8 / 38.2, never 50 / 50.
- Margins and gaps step by phi too: 16, 26, 42, 68, 110.
- In a carousel, keep the same grid on every slide so swiping feels steady. Change content, not structure.

## Check before delivery

Overlay the grid on the render: is the face's eye line within ~20 px of the 0.382 line, is there one dominant element, and do the type sizes come from the scale above?
