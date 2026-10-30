---
name: skilled-brains-safe-zones
description: Use when laying out or checking any Skilled Brains carousel slide, reel, short, long video or thumbnail, so text, faces and logos stay clear of platform buttons and crops.
---

# Safe zones for carousels and video

Every frame has two areas: the **safe area**, where all text, faces, logos and numbers must sit, and the **UI zones**, where the platform draws buttons, captions or crops. Backgrounds and B-roll can run under UI zones. Nothing that has to be read or recognised can.

Get the exact numbers and an overlay for any format:

```bash
node tools/overlay.js --list
node tools/overlay.js ig-carousel > /tmp/overlay.svg   # red = UI zones, green dashed = safe area, yellow = phi lines
node tools/overlay.js reel --json                      # numbers only
```

`tools/overlay.js` is the single source for the numbers. If a platform moves its buttons, update it there and in the table below.

## The zones (measured 2026-10-30)

| Format | Size | Keep clear |
|--------|------|------------|
| Instagram carousel (our default) | 1080x1350, 4:5 | 80 px margin all round. The profile grid shows a 3:4 centre crop, so slide 1 must work with ~34 px cut off each side. |
| Instagram square | 1080x1080 | 80 px margin. |
| Reel / Story | 1080x1920, 9:16 | Top 220 px (username, audio). Bottom 420 px (caption). Right 140 px from y=900 down (buttons). The grid cover is the centre 1080x1440, so the cover frame's title must sit between y=240 and y=1680. |
| YouTube Short | 1080x1920 | Top 190 px, bottom 400 px, right 160 px from y=860 down. |
| YouTube long video | 1920x1080 | 5% title-safe margin (96 px). Bottom 120 px hides under the player controls on hover. Last 5-20 s: leave room for end-screen cards. |
| YouTube thumbnail | 1280x720 | Bottom-right 170x80 (duration badge). Top-right corner (hover icons). |

## Rules

1. Faces: eyes inside the safe area and on or near the upper phi line (see `skilled-brains-golden-ratio`). Never let a UI zone cover the face or mouth.
2. Text: every word inside the safe area. Captions on reels sit above the bottom 420 px, never in it.
3. Carousel slide 1 doubles as the grid thumbnail: test it at the 3:4 crop and at phone size (about 360 px wide) before calling it done.
4. Logo / handle: inside the safe area, small, same corner on every slide of a carousel.
5. Before delivering, overlay the guide on the final render (or a screenshot of it) and check nothing readable touches red.
