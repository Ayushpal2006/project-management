#!/usr/bin/env bash
# Installs every skill listed in skills.tsv, plus The Skilled Brains' own skills
# from skills/, into Claude Code's skills folder, and into Codex's too if Codex is
# installed. Safe to re-run: it reinstalls at the pinned commits.
#
# Inside this repo both tools already find skills/ through .claude/skills and
# .agents/skills; installing makes them available in any folder.
#
# Usage: ./video-skills/install.sh            # installs into ~/.claude/skills (+ ~/.codex/skills)
#        SKILLS_DIR=/some/path ./video-skills/install.sh
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(dirname "$here")"
skills_dir="${SKILLS_DIR:-$HOME/.claude/skills}"
cache="$(mktemp -d)"
trap 'rm -rf "$cache"' EXIT

mkdir -p "$skills_dir"

targets=("$skills_dir")
if [[ -z "${SKILLS_DIR:-}" && -d "$HOME/.codex" ]]; then
  mkdir -p "$HOME/.codex/skills"
  targets+=("$HOME/.codex/skills")
fi

install_folder() {
  local src="$1" name="$2" target
  for target in "${targets[@]}"; do
    rm -rf "${target:?}/$name"
    cp -R "$src" "$target/$name"
    rm -rf "$target/$name/.git"
  done
  echo "  installed $name"
}

while IFS=$'\t' read -r name repo commit path install_as; do
  [[ -z "$name" || "$name" == \#* ]] && continue
  if [[ -d "$here/vendor/$name" ]]; then
    # A copy at the pinned commit is committed in vendor/, so no network is needed.
    echo "$name (vendored copy of $repo @ ${commit:0:7})"
    checkout="$here/vendor/$name"
  else
    echo "$name ($repo @ ${commit:0:7})"
    checkout="$cache/$name"
    git init -q "$checkout"
    git -C "$checkout" fetch -q --depth 1 "$repo" "$commit"
    git -C "$checkout" checkout -q FETCH_HEAD
  fi

  if [[ "$install_as" == "-" ]]; then
    for skill in "$checkout/$path"/*/; do
      [[ -f "$skill/SKILL.md" ]] && install_folder "$skill" "$(basename "$skill")"
    done
  else
    install_folder "$checkout/$path" "$install_as"
  fi
done < "$here/skills.tsv"

echo "The Skilled Brains skills (this repo)"
for skill in "$repo_root/skills"/*/; do
  [[ -f "$skill/SKILL.md" ]] && install_folder "$skill" "$(basename "$skill")"
done

echo
echo "Done. Skills are in ${targets[*]}. Restart Claude Code / Codex to load them."
echo "Remaining one-time steps (see README.md): the effects Python packages and the watch-skill tool."
