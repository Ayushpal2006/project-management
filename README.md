# The Skilled Brains: carousel and video toolkit

Everything needed to make and publish The Skilled Brains content with **Claude Code or Codex**, in one repo: the brand brief, each person's face identity, the layout rules, the skills, and the publishing tool. Clone it on any laptop, follow the setup below, and both tools start with the full brand knowledge from day zero.

| Path | What's in it |
|------|--------------|
| [`AGENTS.md`](AGENTS.md) | Shared memory and rules for Codex and Claude Code (`CLAUDE.md` points to it). Start here. |
| [`brand/`](brand/) | Brand brief, people and identity grids, reference index, hero thumbnails |
| [`skills/`](skills/) | Our skills: brand brief, face identity, golden ratio, safe zones, colour and fonts, reference inspiration, hero thumbnails, publishing, motion style, talking head, editing tools |
| [`tools/overlay.js`](tools/overlay.js) | Prints a golden-ratio and safe-zone overlay for any format |
| [`carousel/`](carousel/) | Publishes image carousels to Instagram, LinkedIn and other platforms through [Zernio](https://zernio.com) |
| [`video-skills/`](video-skills/) | Pinned references to the third-party video skills (effects, Watch Skill, GSAP, Three.js) and a script that installs everything |

## Setup on a new machine

You need [git](https://git-scm.com), [Node.js](https://nodejs.org) 18+, Python 3, [uv](https://docs.astral.sh/uv/), and [Claude Code](https://claude.com/claude-code) and/or [Codex](https://developers.openai.com/codex).

**1. Get the repo**

```bash
git clone https://github.com/Ayushpal2006/project-management.git
cd project-management
```

**2. Install the skills** (our skills and the video skills, into `~/.claude/skills`, and `~/.codex/skills` if Codex is installed). Inside the repo both tools already see `skills/` without this step; installing makes them work in any folder.

```bash
./video-skills/install.sh
pip install numpy opencv-python pillow mediapipe
uv tool install 'watch-skill[standard]'
claude mcp add watch-skill -- watch-skill serve
```

**3. Set up the carousel tool**

```bash
cd carousel
npm install
cp .env.example .env
```

Put your Zernio API key in `carousel/.env`. Then check it works:

```bash
npm run accounts
```

**4. Bring in the brand assets.** Photos of the team and the logo are not in git while the repo is public. Copy the contents of the `The Skilled brains` folder (from the old laptop or the team Drive) into `brand/assets/`, so paths in the brief resolve.

**5. Restart Claude Code / Codex** so it picks up the skills. Open it in the repo folder; it reads `AGENTS.md` automatically.

## What you do yourself vs. what's automated

These steps need you, because they involve your accounts and secrets:

- **Zernio API key.** Copy it from the [Zernio dashboard](https://zernio.com) into `carousel/.env` on each machine. That file is gitignored, so the key never goes to GitHub. If the key is ever exposed, for example by pasting it into a chat, rotate it in the dashboard and update `.env`.
- **Connecting social accounts.** Link Instagram, LinkedIn and the rest inside the Zernio dashboard. Posts can't publish until accounts are connected.
- **Approving anything that publishes.** Carousels are saved as drafts unless you ask to schedule or publish them.

Everything else is scripted or handled by Claude: installing skills at the same versions, uploading slides, creating posts, and looking up account IDs.

## Keeping machines in sync

When you or an agent learns something lasting (a new reference, a colour change, new photos), it goes into `AGENTS.md`, `brand/` or a skill, and gets committed. Then `git pull` on the other machine. If `video-skills/skills.tsv` changed, re-run `./video-skills/install.sh`. If `carousel/package.json` changed, run `npm install` in `carousel/`.
