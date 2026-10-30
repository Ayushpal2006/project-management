# The Skilled Brains: carousel and video toolkit

Everything needed to make and publish The Skilled Brains content with Claude Code, in one repo. Clone it on any computer or cloud machine, follow the setup below, and you can carry on where you left off.

| Folder | What's in it |
|--------|--------------|
| [`carousel/`](carousel/) | Publishes image carousels to Instagram, LinkedIn and other platforms through [Zernio](https://zernio.com), plus a Claude skill for it |
| [`video-skills/`](video-skills/) | Pinned references to the Claude Code video skills (effects, Watch Skill, GSAP, Three.js) and a script that installs them |

## Setup on a new machine

You need [git](https://git-scm.com), [Node.js](https://nodejs.org) 18+, Python 3, [uv](https://docs.astral.sh/uv/) and [Claude Code](https://claude.com/claude-code).

**1. Get the repo**

```bash
git clone https://github.com/Ayushpal2006/project-management.git
cd project-management
```

**2. Install the skills** (video skills and the carousel skill, into `~/.claude/skills`)

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

**4. Restart Claude Code** so it picks up the new skills.

## What you do yourself vs. what's automated

These steps need you, because they involve your accounts and secrets:

- **Zernio API key.** Copy it from the [Zernio dashboard](https://zernio.com) into `carousel/.env` on each machine. That file is gitignored, so the key never goes to GitHub. If the key is ever exposed, for example by pasting it into a chat, rotate it in the dashboard and update `.env`.
- **Connecting social accounts.** Link Instagram, LinkedIn and the rest inside the Zernio dashboard. Posts can't publish until accounts are connected.
- **Approving anything that publishes.** Carousels are saved as drafts unless you ask to schedule or publish them.

Everything else is scripted or handled by Claude: installing skills at the same versions, uploading slides, creating posts, and looking up account IDs.

## Keeping machines in sync

Commit changes here and `git pull` on the other machine. If `video-skills/skills.tsv` changed, re-run `./video-skills/install.sh`. If `carousel/package.json` changed, run `npm install` in `carousel/`.
