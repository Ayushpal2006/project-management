---
name: skilled-brains-face-identity
description: Use whenever a Skilled Brains carousel, thumbnail or video shows a team member's face, and when adding or updating someone's photos, angles or identity grid. Keeps every face true to the real person.
---

# Face identity: same person, every time

The audience must recognise DSR, Shital Didi and the rest instantly, in every carousel and every video. A face that looks "almost right" breaks trust, so resemblance beats style every time.

## Where each person lives

```
brand/people/<slug>/
  identity.md     what makes this face this face (committed)
  photos/         source photos, best first (local only while the repo is public)
  grid/           the identity grid images (local only while the repo is public)
```

Slugs: `dsr`, `yrm`, `shital`, `smile`, `ujjwal`. Copy `brand/people/_template/` for a new person.

## Rules

1. **Real photos first.** Build faces from the person's real photos (cut-outs, crops, grades). Only use AI image generation for a face when no real photo fits, and then always pass at least 3 grid images as references.
2. **Never change the face itself.** Keep face shape, skin tone, eye shape, nose, jaw, hairline, beard and glasses as they are. No skin lightening, no slimming, no "beautify". Grading the whole image is fine; reshaping the person is not.
3. **Match the angle, don't invent one.** Pick the grid image whose angle matches the layout. If no photo has the angle you need, change the layout or ask for a new photo. Don't mirror a face to fake an angle unless `identity.md` says the face is symmetric enough and there's no text on clothing.
4. **Same person, same look within a piece.** In one carousel or video, keep the same hairstyle, outfit and lighting family unless the story needs a change.
5. **Check before delivery** (below). If any check fails, redo it; don't ship a near-miss.

## The identity grid (angles)

A 3x3 sheet per person, from real photos, same lighting where possible:

| | Left | Centre | Right |
|---|------|--------|-------|
| **Top** | 3/4 left, chin up | front, chin up | 3/4 right, chin up |
| **Middle** | profile left | **front, neutral (master)** | profile right |
| **Bottom** | 3/4 left, talking | front, smiling | 3/4 right, talking |

To build or refresh one:

1. Go through `photos/` and pick the sharpest image for each cell (face at least 400 px tall, eyes open, no heavy filter).
2. Crop each to a square with the eyes on the upper phi line (0.382 from the top), face filling ~60% of the height.
3. Save as `grid/<row>-<col>.jpg` (for example `grid/middle-centre.jpg`) and also as one 3x3 sheet `grid/sheet.jpg`.
4. Fill the "Grid" table in `identity.md`, naming the source photo for each cell and marking empty cells. Empty cells are a photo request for the person, not something to fake.

## Pre-delivery resemblance check

For every face in the piece, compare side by side with `grid/middle-centre.jpg` and answer each line in `identity.md`'s "Must match" list. Also:

- Would a follower recognise them at thumbnail size (about 120 px tall)?
- Skin tone within the same range as the master photo?
- Glasses, beard, hairline, moles or other marks present and on the correct side?

If a face-similarity tool is installed (for example InsightFace or `face_recognition`), also compare embeddings with the master and report the score, but the human checks above decide.

## Photos and privacy

While the GitHub repo is public, photos stay out of git (`.gitignore` covers `brand/people/*/photos/` and `brand/people/*/grid/`). Sync them from the team's Drive or the local `The Skilled brains` folder. If the repo becomes private, the user can choose to commit them.
