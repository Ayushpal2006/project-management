#!/bin/zsh
# Add newly published YouTube videos to the content database.
# Run by hand:  zsh "research/refresh.sh"
# Free and local. Downloads metadata and captions only, never video.
set -eu
R="${0:A:h}"
Y="$R/youtube"
CH="https://www.youtube.com/channel/UCQepwC7BNXg-QLWDmYNtf1g"
: > "$Y/ids_new.tsv"
for tab in videos shorts streams; do
  yt-dlp --flat-playlist --print id "$CH/$tab" 2>/dev/null | while read -r id; do
    grep -q "	$id\$" "$Y/ids.tsv" || printf "%s\t%s\n" "$tab" "$id" >> "$Y/ids_new.tsv"
  done
done
n=$(wc -l < "$Y/ids_new.tsv" | tr -d ' ')
echo "$n new uploads"
if [ "$n" -gt 0 ]; then
  cut -f2 "$Y/ids_new.tsv" | sed 's#^#https://www.youtube.com/watch?v=#' > "$Y/urls_new.txt"
  yt-dlp -a "$Y/urls_new.txt" --skip-download --write-info-json --no-write-playlist-metafiles \
    --write-subs --write-auto-subs --sub-langs "hi-orig,en-orig,en-US-orig" --sub-format vtt \
    --sleep-requests 1 -o "$Y/meta/%(id)s.%(ext)s" >/dev/null 2>&1 || true
  mv "$Y"/meta/*.vtt "$Y/subs/" 2>/dev/null || true
  cat "$Y/ids_new.tsv" >> "$Y/ids.tsv"
  cut -f2 "$Y/ids_new.tsv" >> "$R/PENDING_ANALYSIS.txt"
fi
python3 "$R/build_db.py"
echo "New IDs needing analysis are listed in research/PENDING_ANALYSIS.txt"
