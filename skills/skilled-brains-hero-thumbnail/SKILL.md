---
name: skilled-brains-hero-thumbnail
description: Use when making a YouTube thumbnail or the first (hero) slide of a Skilled Brains carousel, and when the user adds new approved hero thumbnails to learn from.
---

# Hero thumbnails

**Status: waiting for the user's approved hero thumbnails.** The user will add them to `brand/hero-thumbnails/`. Until then, follow the rules below and the brief.

## What a hero is

The single frame that makes someone stop scrolling: the YouTube thumbnail, the carousel's first slide, or a reel's cover. It must work at about 120 px tall.

## Rules

1. One face (from `skilled-brains-face-identity`, real photo, strong expression), one idea, at most 4 words of text.
2. Face on the upper phi line, text in the larger side it looks into (`skilled-brains-golden-ratio`).
3. Keep clear of the duration badge and grid crops (`skilled-brains-safe-zones`: `yt-thumbnail`, `ig-carousel`, `reel`).
4. Small logo icon in its approved colours (brief §2); one accent colour leads (`skilled-brains-color-type`).
5. Make 3 variants that differ in the idea (not just colour) so the user can pick or A/B test.

## When the user adds hero thumbnails

For each file added to `brand/hero-thumbnails/`:

1. Add a row to `brand/hero-thumbnails/INDEX.md`: file, where it was used, result if known (CTR, views), what makes it work.
2. After 3 or more, write the shared patterns into the "Learned patterns" section of that INDEX and, if lasting, into the brief (§3 colours, §4 typography or a new rule in §7).

## Where to render, and cleanup
Render in the cloud, not on the user's Mac; copy to the Mac only when the user says so. After the user finalises the piece, move its references, sources and intermediates on the Mac to the Trash and keep only the final file, skipping anything another task still uses. Full rule in `AGENTS.md` (Working preferences).
