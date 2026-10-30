#!/usr/bin/env bash
# Installs every skill listed in skills.tsv, plus the carousel skill, into
# Claude Code's skills folder. Safe to re-run: it reinstalls at the pinned commits.
#
# Usage: ./video-skills/install.sh            # installs into ~/.claude/skills
#        SKILLS_DIR=/some/path ./video-skills/install.sh
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(dirname "$here")"
skills_dir="${SKILLS_DIR:-$HOME/.claude/skills}"
cache="$(mktemp -d)"
trap 'rm -rf "$cache"' EXIT

mkdir -p "$skills_dir"

install_folder() {
  local src="$1" name="$2"
  rm -rf "${skills_dir:?}/$name"
  cp -R "$src" "$skills_dir/$name"
  rm -rf "$skills_dir/$name/.git"
  echo "  installed $name"
}

while IFS=$'\t' read -r name repo commit path install_as; do
  [[ -z "$name" || "$name" == \#* ]] && continue
  echo "$name ($repo @ ${commit:0:7})"
  checkout="$cache/$name"
  git init -q "$checkout"
  git -C "$checkout" fetch -q --depth 1 "$repo" "$commit"
  git -C "$checkout" checkout -q FETCH_HEAD

  if [[ "$install_as" == "-" ]]; then
    for skill in "$checkout/$path"/*/; do
      [[ -f "$skill/SKILL.md" ]] && install_folder "$skill" "$(basename "$skill")"
    done
  else
    install_folder "$checkout/$path" "$install_as"
  fi
done < "$here/skills.tsv"

echo "carousel (this repo)"
install_folder "$repo_root/carousel/skill" "skilled-brains-carousel"

echo
echo "Done. Skills are in $skills_dir. Restart Claude Code to load them."
echo "Remaining one-time steps (see README.md): the effects Python packages and the watch-skill tool."
