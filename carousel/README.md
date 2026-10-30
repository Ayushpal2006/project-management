# Carousel

Publishes image carousels (multi-image posts) to Instagram, LinkedIn and other platforms through [Zernio](https://zernio.com).

## Setup

Requires Node.js 18 or newer. Run everything below from this `carousel/` folder.

```bash
cd carousel
npm install
cp .env.example .env
```

Open `.env` and set `ZERNIO_API_KEY` to your key from the Zernio dashboard. `.env` is gitignored, so never put the key anywhere else in the repo.

Before posting, connect your social accounts in the Zernio dashboard.

## Find your account IDs

```bash
npm run accounts
```

This is read-only. It prints each connected account's platform and ID, which you pass to `--account` below.

## Post a carousel

```bash
# Save as a draft in Zernio (the default)
npm run post -- --caption "5 tips for better notes" --account instagram:ACCOUNT_ID slides/1.png slides/2.png slides/3.png

# Schedule it
npm run post -- --caption "..." --account instagram:ACCOUNT_ID --schedule 2026-11-01T10:00:00Z slides/*.png

# Publish right away (this posts real content)
npm run post -- --caption "..." --account instagram:ACCOUNT_ID --account linkedin:ACCOUNT_ID --now slides/*.png
```

Slides are uploaded to Zernio media storage in order, then attached to one post. Supported formats are JPG, PNG, WebP and GIF, and a carousel needs at least two images.

## Claude skill

`skill/SKILL.md` teaches Claude Code how to use these scripts. `../video-skills/install.sh` installs it as `skilled-brains-carousel`, so you can just ask Claude to "post these slides as a carousel".

## Using it from code

```js
import { createCarouselPost } from './src/carousel.js';

const post = await createCarouselPost({
  caption: '5 tips for better notes',
  imagePaths: ['slides/1.png', 'slides/2.png'],
  accounts: [{ platform: 'instagram', accountId: 'ACCOUNT_ID' }],
  scheduledFor: '2026-11-01T10:00:00Z', // omit for a draft
});
```

See the [Zernio API docs](https://zernio.com/llms.txt) for analytics, inbox and other endpoints.
