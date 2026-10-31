---
name: skilled-brains-carousel
description: Use when the user wants to publish, schedule or draft Skilled Brains content (carousels on Instagram, LinkedIn and other platforms) through Zernio, the team's scheduling tool.
---

# Publishing and scheduling through Zernio

Zernio is the team's publishing and scheduling tool. The code lives in the `carousel/` folder of the `Ayushpal2006/project-management` repo. Work from that folder.

If the Zernio MCP connector is connected in this session, you can also use its tools (accounts, posts, queue, analytics). The same rules apply: draft by default, never guess an account ID, publish only on an explicit go-ahead.

## Before anything is scheduled

Run the pre-publish checklist on the final files:

1. Brand: matches `brand/BRAND_BRIEF.md` (palette anchor, fonts, voice).
2. Faces: pass the check in `skilled-brains-face-identity`.
3. Layout: phi grid and safe zones (`node tools/overlay.js ig-carousel`).
4. Originality: if it came from a reference, it passes `skilled-brains-reference-inspiration`.
5. Spelling: every on-screen word checked; on-screen text in English.

## Before posting (setup)

1. Make sure `carousel/.env` exists with `ZERNIO_API_KEY` set. If it doesn't, ask the user for their key and have them put it in `.env` themselves. Never write the key into any other file or commit it.
2. Run `npm install` if `node_modules` is missing.
3. Run `npm run accounts` to get the account IDs. Never guess an account ID. If there are several accounts on one platform, ask which one.

## Posting

Slides must be JPG, PNG, WebP or GIF files, at least two, passed in slide order.

```bash
npm run post -- --caption "Caption text" --account instagram:ACCOUNT_ID slide1.png slide2.png slide3.png
```

- No timing flag saves a draft in Zernio. This is the safe default.
- `--schedule 2026-11-01T10:00:00Z` schedules it. Use an ISO time in UTC, and convert from Asia/Kolkata if the user gives a local time.
- `--now` publishes real content immediately. Only use it when the user has explicitly said to publish now.
- Repeat `--account` to post the same carousel to several platforms.

Report the Zernio post ID the script prints.

## Where to render, and cleanup
Render in the cloud, not on the user's Mac; copy to the Mac only when the user says so. After the user finalises the piece, move its references, sources and intermediates on the Mac to the Trash and keep only the final file, skipping anything another task still uses. Full rule in `AGENTS.md` (Working preferences).
