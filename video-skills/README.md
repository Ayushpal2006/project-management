# Video skills

The Claude Code skills used for The Skilled Brains video work. `skills.tsv` lists each skill's GitHub repo and the exact commit we use. A copy of each at that commit is kept in `vendor/` (all four are MIT-licensed; their licence files are kept alongside), so `install.sh` works offline on a fresh laptop. It installs them into `~/.claude/skills` (and `~/.codex/skills` if Codex is installed).

| Skill | Source | Installs as |
|-------|--------|-------------|
| 45 video effects | [Vibha-Ramprakash/claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects) | `effects` |
| Watch Skill (video understanding and verification) | [oxbshw/watch-skill](https://github.com/oxbshw/watch-skill) | `watch`, `watching-videos`, `the-loop` and 7 more |
| GSAP animation | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger` and 5 more |
| Three.js | [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills) | `threejs-fundamentals`, `threejs-animation` and 11 more |

## Install

From the repo root:

```bash
./video-skills/install.sh
```

Then do the two one-time setup steps those skills need:

```bash
# effects: Python packages for its rendering scripts
pip install numpy opencv-python pillow mediapipe

# watch-skill: the command-line tool and MCP server its skills call
uv tool install 'watch-skill[standard]'
claude mcp add watch-skill -- watch-skill serve
```

Restart Claude Code afterwards.

## Updating a skill

Change its commit in `skills.tsv` to a newer one from that repo, delete its folder in `vendor/` and copy in the files at the new commit (or just delete it, and `install.sh` downloads that commit instead), then commit so every machine gets the same version.

## Adding a skill

Add a line to `skills.tsv`. If the repo has one skill at a known path, give that path and a name in the last column. If it has a folder of skills, give the folder and `-`.
