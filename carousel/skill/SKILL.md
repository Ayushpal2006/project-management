---
name: skilled-brains-carousel
description: Use when the user wants to post, schedule or draft an image carousel for The Skilled Brains on Instagram, LinkedIn or another platform through Zernio.
---

# Publishing carousels through Zernio

The code lives in the `carousel/` folder of the `Ayushpal2006/project-management` repo. Work from that folder.

## Before posting

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
