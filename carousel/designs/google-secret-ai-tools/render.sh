#!/bin/bash
# Renders slides 02-06 of the Google secret AI tools carousel at 3072x3840 (same size as the cover)
# into output/imagegen/google-secret-ai-tools-carousel/. Slide 01 is the existing cover image.
# Logos and photos live in that output folder's assets/ and stay out of git.
set -e
cd "$(dirname "$0")"
ROOT="$(cd ../../.. && pwd)"
OUT="${OUT:-$ROOT/output/imagegen/google-secret-ai-tools-carousel}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="file://$PWD/slides.html"
mkdir -p "$OUT"
cp "$ROOT/output/imagegen/google-secret-ai-tools-cover-4k.png" "$OUT/01-cover.png"
names=(x x stitch opal antigravity pomelli cta)
for n in 2 3 4 5 6; do
  f="$OUT/0$n-${names[$n]}.png"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=2.844444 --window-size=1080,1350 --virtual-time-budget=8000 \
    --screenshot="$f" "$HTML#s$n" 2>/dev/null
  echo "$f"
done
