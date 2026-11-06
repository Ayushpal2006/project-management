# The Skilled Brains: shared project memory

This file is the source of truth for **both Codex and Claude Code** (Claude reads it through `CLAUDE.md`). If you learn a lasting fact about the brand, the team, the tools or the user's preferences, write it here or in `brand/BRAND_BRIEF.md` and commit it, so the next session on any laptop starts with it.

## What this is

**The Skilled Brains** (Instagram `@theskilledbrains`) is an Indian education brand making short, punchy videos and carousels that teach practical, high-income and AI skills to Indian students and early-career learners. Hinglish voiceover, English-only on-screen text.

Do not use or cite skilledbrains.com: it belongs to an unrelated firm.

## Start here, every time

1. Read `brand/BRAND_BRIEF.md` before making any brand content.
   For carousels, also read `brand/CONTENT_STRATEGY.md`: it says whose photo goes on the cover (the pillar owner) and the creative formula.
2. Pick the skills for the job from the table below and follow them.
3. Before anything is scheduled, run the pre-publish checklist in `skills/skilled-brains-carousel/SKILL.md`.

## Skills

All our skills are in `skills/`. Inside this repo Claude Code finds them through `.claude/skills` and Codex through `.agents/skills` (both link to `skills/`). Run `./video-skills/install.sh` to also install them for use outside the repo. If your tool doesn't load skills, read the `SKILL.md` directly.

| Skill | Use it when |
|-------|-------------|
| `skilled-brains-brand-brief` | Reading, generating or updating the brand brief |
| `skilled-brains-face-identity` | Any team member's face appears; building angles and identity grids |
| `skilled-brains-yrm-identity` | YRM (Yash Ranjan Mishra) appears anywhere; his full identity matrix |
| `skilled-brains-golden-ratio` | Composing any slide, thumbnail or frame; type sizes |
| `skilled-brains-safe-zones` | Laying out or checking anything for Instagram or YouTube |
| `skilled-brains-color-type` | Choosing or changing colours, colour theme or font pairing |
| `skilled-brains-reference-inspiration` | The user shares a post they like; making content from a reference without copying |
| `skilled-brains-hero-thumbnail` | YouTube thumbnails, carousel first slides, reel covers |
| `skilled-brains-carousel` | Publishing, scheduling or drafting through Zernio |
| `skilled-brains-motion-style` | Motion graphics and style frames for videos (house rules) |
| `skilled-brains-reference-look` | The editorial reference look for videos (wins over motion-style where they differ) |
| `skilled-brains-talking-head` | Talking-head videos (planned) |
| `skilled-brains-editing-tools` | B-roll sources and editing tools |

Third-party video skills (effects, watch-skill, GSAP, Three.js) are pinned in `video-skills/skills.tsv`.

## Repo map

| Path | What |
|------|------|
| `brand/BRAND_BRIEF.md` | The brand brief (master copy) |
| `brand/people/<slug>/identity.md` | Each person's face checklist and identity grid |
| `brand/assets/` | Logo, team photos, Shital's shoot, past carousels. Local only (not in git) while the repo is public. Copy the local `The Skilled brains/` folder's contents here. |
| `brand/CONTENT_STRATEGY.md` | Pillars, owners (who goes on the cover), creative formula, publishing system; source board in `brand/strategy/` |
| `brand/references/INDEX.md` | References the user liked and what we took from them |
| `brand/hero-thumbnails/` | Approved hero thumbnails (images local only) and what we learned |
| `carousel/` | Node tool that publishes carousels through Zernio |
| `tools/overlay.js` | Prints a phi-grid and safe-zone overlay for any format |
| `video-skills/` | Pinned third-party video skills and the installer |

## Team

| On screen | Name | Role |
|-----------|------|------|
| DSR | Digraj Singh Rajput | Founder |
| YRM | Yash Ranjan Mishra | Co-founder |
| Shital Didi | Shital / Sheetal | Co-founder, main thumbnail face |
| Smile | Ismail | Co-founder (`Ismail.png`) |
| Ujjwal | Ujjwal Jain | Editor / senior editor |

Yash (`Yash V.png`) is very likely **Yash Verma**, whom theskilledbrains.com lists as the instructor of Master Mobile Video Editing (checked 2026-11-03). Ask the user to confirm the photo is him.

## Hard rules

1. On-screen text is English only. One message per frame. No split screens, no lower thirds.
2. Faces must look like the real person in every carousel and video (`skilled-brains-face-identity`).
3. Golden-ratio layout and platform safe zones on every piece.
4. Take inspiration from references, never copy them.
5. Never publish without the user's explicit go-ahead. Zernio posts are drafts by default.
6. Never commit secrets (`carousel/.env`) and, while the repo is public, never commit photos of real people or other creators' work.
7. Never move, rename or delete the user's files without asking. The one standing exception is the Mac cleanup after a piece is final (see Working preferences).

## Working preferences

- **Carousel look (user, 2026-11-02; replaces the 2026-10-31 dark/light rule):** no dark/light alternation. Use one consistent white look: white ground, huge black numeral beside a condensed all-caps headline (Anton) with key words in a pink-to-orange gradient, a small centred top label with just "@theskilledbrains" (no topic words like "Reel Scripts" or "Communication Skills"), 7 slides max with the Comment + Follow CTA (real IG profile screenshot) on the last slide, ~~Digraj sir (DSR) as the cover figure when his photo is available~~ (replaced 2026-11-03: the pillar owner from `brand/CONTENT_STRATEGY.md` is the cover face; DSR only for founder or brand-wide posts), ~~and a 3D hero object per slide~~ (dropped by the Anti-AI rule below). Reference: `carousel/designs/reel-4-line-script`.
- **Anti-AI design direction (user, 2026-11-02; wins over the carousel look above where they conflict):** full rules and the 4-step blueprint workflow are in `brand/BRAND_BRIEF.md` §9. In short: asymmetric, strictly left-aligned layouts with deliberate negative space; aggressive display-vs-sans/mono type contrast using the existing brand fonts; a subtle 3-5% grain in the final edit; real photos, UI screenshots or hand-drawn elements only, never glossy 3D, claymorphism or studio-lit stock. Keep it clean, not a jungle. Brand colours and typography stay unchanged. Write a slide-by-slide blueprint before rendering, and hooks must avoid AI bait like "The secret to..." or "Stop doing X".
- **Vary the design (user, 2026-11-03):** don't make every carousel in the same design. Propose 2-3 fresh directions as style frames, get the user's pick, then build. See `brand/CONTENT_STRATEGY.md`.
- **Less text, more visuals; no audience labels (user, 2026-11-02):** keep each slide to a headline plus at most one short line or card, and let the visual (real photo, UI screenshot or hand-drawn element) carry it. Never write "students", "student", "learners", "learner" or any similar label for the audience (say "people" or drop the line).
- **Render in the cloud (user, 2026-10-31):** render videos and carousels in the cloud session, not on the user's Mac. Share previews from the cloud. Copy a file to the Mac only when the user says so.
- **Clean the Mac after a piece is final (user, 2026-10-31):** once the user finalises a video or carousel, clear its references, source files and intermediates (renders, frames, drafts) from the Mac and keep only the final file. Move them to the Trash, never hard-delete. Never touch files another running task is still using, and never touch `brand/assets/` or anything outside that piece's own working files.
- **Git:** commit and push straight to `main`. No feature branches or pull requests unless the user asks for one. When working from a cloud session, prefer running git on the user's own Mac terminal (Remote Control) so the push uses their setup.

## Tools

- **Publishing and scheduling:** Zernio (confirmed 2026-10-30; the user sometimes calls it "Journeyo"). Use `carousel/` (API key in `carousel/.env`) or the Zernio connector. As of 2026-10-30 the only connected account is YouTube `ayushpal-o9z`; Instagram is not connected yet.
- **Channels (confirmed 2026-11-04):** YouTube `youtube.com/channel/UCQepwC7BNXg-QLWDmYNtf1g` (started 1 Jul 2026), Instagram `@theskilledbrains`. Most Instagram Reels are cross-posts of YouTube Shorts, so the Short's captions double as the Reel's transcript.
- **Channel research:** `research/` holds the content database (`content_database.csv`/`.sqlite`, rebuilt by `research/build_db.py`), transcripts, tool report and progress log. Voice profiles for the `ig-*` and `yt-*` skill packs are in `~/.claude/instagram/voice.md` and `~/.claude/youtube/voice.md`. Scripts in the connected Drive are for other projects, not this brand.
- **Editing:** Premiere Pro and After Effects; deliver editable project files.
- **B-roll:** team Google Drive library first, see `skilled-brains-editing-tools`.

## Open questions for the user

- "OS" (installed) and "Real Studio" (for video): what they are and their links.
- The movie / image archive for B-roll: link.
- Whether the repo should become private, so team photos can be committed and a new laptop gets them with the clone.
- More photos of Smile (Ismail); role of Yash V; original logo files `1.jpg`-`8.jpg`.
