# Progress log

## 2026-11-04, batch 1

**Done**
- Tool research: `TOOLS_REPORT.md`.
- YouTube inventory: all 112 uploads (28 long, 82 Shorts, 2 lives; 3 playlists), 1 Jul to 3 Nov 2026. Metadata in `youtube/meta/`, captions in `youtube/subs/`.
- Instagram: logged-out profile shows the newest 12 posts only (11 ours + 1 collab). Metadata for all 11 in `instagram/meta/`. 3 are Reels, and each one is a cross-post of a YouTube Short (matched on title and duration).
- Drive script search: nothing in the connected Drive matches a published Skilled Brains video. The scripts there belong to other projects. Every video is marked ORIGINAL SCRIPT NOT FOUND for now.
- Transcripts: YouTube auto-captions converted to `transcripts/YT_<id>.md` (each file labelled as a transcript, not a script).
- Analysis: full transcripts read for 13 videos (5 long, 8 Shorts). First 15 seconds watched frame by frame for 3 (smaltFr5nsw, 5WAzXIxt6L8, HsCPCWUpJGE) and the 3 Instagram Reels.
- Voice profiles written: `~/.claude/instagram/voice.md`, `~/.claude/youtube/voice.md`.
- Database: `content_database.csv` and `content_database.sqlite`, rebuilt by `build_db.py`.

**Pending**
- Captions for the rest of the 112 (download still running; re-run `build_db.py` after).
- Full Instagram list (needs Instagram login in Chrome).
- Watching the remaining videos and full per-video analysis.
- Master Content DNA document, scriptwriting system, monitoring workflow.

**Blocked / inaccessible**
- Instagram beyond the newest 12 posts: Chrome is logged out.
- 5 YouTube videos have no Hindi caption track: 3 have none, 1 is auto-tagged Punjabi and 1 Swahili (likely music or mis-detected). These need local transcription.

## 2026-11-04, batch 2

- All captions downloaded: 107 videos have YouTube Hindi captions; transcripts written for all of them.
- Whisper model installed (you approved; 547 MB). Ran it on the 5 videos with no Hindi track: 2 good transcripts, 3 are music only. See `transcripts_whisper/NOTES.md`.
- Instagram login is not possible for now (login-code problem). The full Instagram list stays parked; the 11 visible posts are in the database.
- Disk: 17 GB free on the Mac. Research folder 127 MB, model 560 MB. Audio is deleted after each transcription.

## 2026-11-04, batch 3: report

| Measure | Count |
|---|---|
| YouTube items discovered | 112 (28 long, 82 Shorts, 2 lives) |
| Instagram posts discovered | 11 of ours visible logged out (3 Reels, 8 carousels/posts) |
| Transcripts created | 109 YouTube (107 YouTube captions, 2 Whisper); 3 Reels covered by their YouTube twins |
| Original scripts found | 0 (Drive scripts belong to other projects) |
| Missing scripts recovered | 0 originals; transcripts are NOT scripts |
| Transcripts read in full | 13 |
| Openings and endings reviewed | all 28 long videos, about 40 Shorts |
| First 15 seconds watched frame by frame | 6 |
| Fully analysed (every field + full watch) | 0. Treat the database's analysis_status column as the truth |
| No speech to transcribe | 3 music-only Shorts (FvvuXEPUnGM, NU2C0kKdTnw, ehGzxaUZhVM) |
| Inaccessible | Instagram beyond the newest posts (no login) |

Deliverables: `MASTER_CONTENT_DNA.md` (also as a Claude Doc), `SCRIPTWRITING_SYSTEM.md`, `refresh.sh` (adds new uploads; tested, 0 new), `content_database.sqlite/.csv`, `transcripts/`, `transcripts_whisper/`, `TOOLS_REPORT.md`, voice profiles in `~/.claude/instagram/` and `~/.claude/youtube/`.
