# The Skilled Brains: shared project memory

This file is the source of truth for **both Codex and Claude Code** (Claude reads it through `CLAUDE.md`). If you learn a lasting fact about the brand, the team, the tools or the user's preferences, write it here or in `brand/BRAND_BRIEF.md` and commit it, so the next session on any laptop starts with it.

## What this is

**The Skilled Brains** (Instagram `@theskilledbrains`) is an Indian education brand making short, punchy videos and carousels that teach practical, high-income and AI skills to Indian students and early-career learners. Hinglish voiceover, English-only on-screen text.

Do not use or cite skilledbrains.com: it belongs to an unrelated firm.

## Start here, every time

1. Read `brand/BRAND_BRIEF.md` before making any brand content.
2. Pick the skills for the job from the table below and follow them.
3. Before anything is scheduled, run the pre-publish checklist in `skills/skilled-brains-carousel/SKILL.md`.

## Skills

All our skills are in `skills/`. Inside this repo Claude Code finds them through `.claude/skills` and Codex through `.agents/skills` (both link to `skills/`). Run `./video-skills/install.sh` to also install them for use outside the repo. If your tool doesn't load skills, read the `SKILL.md` directly.

| Skill | Use it when |
|-------|-------------|
| `skilled-brains-brand-brief` | Reading, generating or updating the brand brief |
| `skilled-brains-face-identity` | Any team member's face appears; building angles and identity grids |
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

Also in the photos, role unconfirmed: Yash (`Yash V.png`). Use them in team posts only until the user confirms.

## Hard rules

1. On-screen text is English only. One message per frame. No split screens, no lower thirds.
2. Faces must look like the real person in every carousel and video (`skilled-brains-face-identity`).
3. Golden-ratio layout and platform safe zones on every piece.
4. Take inspiration from references, never copy them.
5. Never publish without the user's explicit go-ahead. Zernio posts are drafts by default.
6. Never commit secrets (`carousel/.env`) and, while the repo is public, never commit photos of real people or other creators' work.
7. Never move, rename or delete the user's files without asking. The one standing exception is the Mac cleanup after a piece is final (see Working preferences).

## Working preferences

- **Render in the cloud (user, 2026-10-31):** render videos and carousels in the cloud session, not on the user's Mac. Share previews from the cloud. Copy a file to the Mac only when the user says so.
- **Clean the Mac after a piece is final (user, 2026-10-31):** once the user finalises a video or carousel, clear its references, source files and intermediates (renders, frames, drafts) from the Mac and keep only the final file. Move them to the Trash, never hard-delete. Never touch files another running task is still using, and never touch `brand/assets/` or anything outside that piece's own working files.
- **Git:** commit and push straight to `main`. No feature branches or pull requests unless the user asks for one. When working from a cloud session, prefer running git on the user's own Mac terminal (Remote Control) so the push uses their setup.

## Tools

- **Publishing and scheduling:** Zernio (confirmed 2026-10-30; the user sometimes calls it "Journeyo"). Use `carousel/` (API key in `carousel/.env`) or the Zernio connector. As of 2026-10-30 the only connected account is YouTube `ayushpal-o9z`; Instagram is not connected yet.
- **Editing:** Premiere Pro and After Effects; deliver editable project files.
- **B-roll:** team Google Drive library first, see `skilled-brains-editing-tools`.

## Open questions for the user

- Instagram and YouTube channel links, so past content can be studied and logged.
- "OS" (installed) and "Real Studio" (for video): what they are and their links.
- The movie / image archive for B-roll: link.
- Whether the repo should become private, so team photos can be committed and a new laptop gets them with the clone.
- More photos of Smile (Ismail); role of Yash V; original logo files `1.jpg`-`8.jpg`.
