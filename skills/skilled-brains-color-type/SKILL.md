---
name: skilled-brains-color-type
description: Use when choosing or checking colours, a colour theme, or a font pairing for any Skilled Brains carousel, thumbnail or video, and when the user changes the brand colours or fonts.
---

# Colour theme and font pairing

The current palette and fonts live in `brand/BRAND_BRIEF.md` (colour and typography sections). This skill is how to use and change them. If the brief and this file disagree, the brief wins; then fix this file.

## Colours

**Brand greens (from the logo):** deep forest `#012816` and neon mint `#00D579`, plus the alt pair dark forest `#14281C` and sage mint `#7ED088` (brief §3a). Per the brief, the greens are for **logo moments** (logo, intro, outro, end card, profile picture), not a general accent.

**Motion / graphics palette (brief §3b):** near-black base with grain (`#0B0B0C` to `#111111`), primary accents hot pink, lemon yellow and white; secondary sets violet + electric blue or orange + cream; premium/data variant muted gold, olive, brown. `skilled-brains-reference-look` adds: pick one palette per video from the footage, and cream paper `#EEEAE0` is an allowed ground.

Build each piece's palette with the 60-30-10 rule:

| Share | Role | Default |
|-------|------|---------|
| 60% | Ground (background) | near-black with grain, or cream paper |
| 30% | Secondary (cards, shapes, B-roll grade) | a muted tone from the footage or a §3b secondary set |
| 10% | Accent (the one thing that matters) | one §3b primary accent (hot pink, lemon yellow) |

Rules:

1. **One accent leads per frame.** If two things are highlighted, nothing is.
2. **Contrast:** text must reach WCAG AA (4.5:1 for body, 3:1 for headlines at 45 px and up). White body text on near-black. Check with a contrast checker before delivery.
3. **The logo keeps its own colours.** Never recolour the mark in pink or yellow, and only use the approved pairs in brief §2.
4. **Faces are not recoloured.** Grade the scene, never shift skin tones (see `skilled-brains-face-identity`).
5. Take layout and motion from references, never their colours (see `skilled-brains-reference-inspiration`).
6. The user plans to revise the colour theme. Until they do, the brief's §3 is the rule.

## Font pairing

A pairing is one **display** face for hooks and hero words, one **text** face for body and captions, and optionally one **accent** face for numbers or labels. Never more than three in one piece.

Current pairings (brief §4):

| Use | Display | Text | Accent |
|-----|---------|------|--------|
| Carousels and thumbnails | Clash Display | Satoshi | Playfair Display (numbers) |
| Talking-head captions (Tharun-style) | Kurdis, ALL CAPS hero words | Nunito Black | none |
| Data / premium | Playfair Display | Satoshi | STIX Two Text (formulas) |
| Pill labels | | | Silkscreen |

How to pair a new font:

1. Contrast in **structure**, harmony in **proportion**: pair a geometric or condensed display face with a humanist or neutral sans, or a serif with a sans, with similar x-heights.
2. Test the hook line at phone size (360 px wide): hero word readable in under a second?
3. Check Hinglish words and Indian names render well (no awkward ligatures or missing glyphs); on-screen text is English per house rules.
4. Confirm the licence allows commercial social use, and keep the font files (or their download links) listed in the brief so a new machine can install them.

## When the user changes colours or fonts

1. Update §3 (colours) or §4 (typography) of `brand/BRAND_BRIEF.md` with the new values and the reason, and add a changelog line.
2. Update the tables in this file.
3. Note any existing templates that now use old values, and list them for the user instead of silently changing published work.
