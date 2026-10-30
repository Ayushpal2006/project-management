---
name: skilled-brains-brand-brief
description: Use before making any Skilled Brains content (read the brief), and when the user asks to generate, rebuild or update the brand brief, or shares new references, photos, colours or fonts that should change it.
---

# The brand brief

`brand/BRAND_BRIEF.md` is the one document that says who The Skilled Brains are, who they speak to, how they sound and how they look. Every carousel, thumbnail and video starts by reading it.

## Reading it (every piece of work)

Read the brief before planning. Pull out: audience, tone, the content pillar this piece belongs to, palette, fonts, and the people who will appear. If the piece would break a rule in the brief, say so before making it.

## Generating it (from scratch, or a full rebuild)

Gather first, then write. Sources, in order of trust:

1. What the user says in this conversation.
2. The existing brief and its changelog.
3. Our own published content (Instagram and YouTube links the user gives you; log them in `brand/references/INDEX.md` with tag `own`).
4. Brand assets in `brand/assets/` (logo, team photos) and identity files in `brand/people/`.
5. References the user liked (`brand/references/INDEX.md`).

Do not use skilledbrains.com: it is a different company.

The brief has these sections. Keep the numbering, because other skills and files point at sections by number (for example "brief §7"):

1. **Identity**: who we are, audience, language, promise.
2. **Logo usage**: variants, clear space, minimum size, misuse.
3. **Colours**: 3a logo colours (sampled hex), 3b approved video motion palette.
4. **Typography**: fonts per role.
5. **Tone of voice**.
6. **Team**: each person, role, look, how to use them; link to `brand/people/<slug>/identity.md`.
7. **Reference index**: every brand asset file (logos, team photos, Shital's shoot with expressions, B-roll, our published carousels), with description and best use. Paths are relative to `brand/assets/`. Inspiration from other creators goes in `brand/references/INDEX.md` instead.
8. **How to update**, with **Open questions**.
- **Changelog** at the end.

Mark anything you are guessing with `(unconfirmed)` and list it at the end as questions for the user. Don't present guesses as facts.

## Updating it

Triggered by: a new reference, a new or changed team member, new photos, a colour or font change, new tools, or feedback on published work. Follow the brief's own §8 steps too (re-inventory `brand/assets/`, look at every new image, mark anyone you can't identify as unconfirmed, never move or rename the user's files).

1. Change only the sections affected. Don't rewrite the voice of sections you aren't changing.
2. Add a changelog line: `YYYY-MM-DD: what changed (why / source)`.
3. Update the matching skill or file if the change is a rule (colours: `skilled-brains-color-type`; people: `brand/people/`; references: `brand/references/INDEX.md`).
4. Commit with a message like `Brand brief: add Smile's photos and grid`, and push, so every machine and both Claude Code and Codex get it.
