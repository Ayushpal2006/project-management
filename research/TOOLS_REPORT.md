# Tools and skills report

Researched 2026-11-04 for the channel research and scriptwriting project. "Usable now" means it
works with what is already installed and permitted on this Mac. Nothing new was installed.

## Already on this Mac and in use

| Tool | Link | What it does here | Open source / licence | Usable now |
|---|---|---|---|---|
| yt-dlp 2026.08.19 | github.com/yt-dlp/yt-dlp | Lists the whole channel, pulls metadata and YouTube captions, and downloads single public Instagram Reels without login | Yes, Unlicense | Yes. Used for all 112 YouTube items and 11 Instagram posts |
| FFmpeg / ffprobe | ffmpeg.org | Cuts clips, makes frame contact sheets for watching hooks, extracts audio | Yes, LGPL/GPL | Yes. Used for the first-15-second frame sheets |
| whisper.cpp (`whisper-cli`) | github.com/ggml-org/whisper.cpp | Local, offline transcription on Apple Silicon (Metal) | Yes, MIT | Yes. Model `ggml-large-v3-turbo-q5_0` (547 MB, checksum verified) downloaded 2026-11-04 with your OK, kept in `~/.cache/whisper-models/`. Used for the 5 videos with no Hindi caption track |
| `watch` skill | already in ~/.claude/skills | Downloads a video, extracts deduped frames, OCRs and transcribes, then indexes it | Third-party, pinned in `video-skills/skills.tsv` | Yes, for deeper per-video watching |
| Instagram agent skill pack (13 `ig-*` skills) | github.com/Jakeschincariol/instagram-agent-skill | Reel scripts, captions, viral research, audit; reads `~/.claude/instagram/voice.md` | Yes, MIT | Installed by the other thread. voice.md now filled |
| YouTube agent skill pack (11 `yt-*` skills) | github.com/Jakeschincariol/youtube-agent-skill | Scripts with hook scoring, packaging, retention reading, Shorts, SEO; reads `~/.claude/youtube/voice.md` | Yes, MIT (4.5K stars, last push 2026-09-16) | Now loads in this session. I read its 6 Python scripts: standard library only, no network calls, no shell execution. voice.md now filled |
| Google Drive connector | already connected | Searching for original scripts | n/a | Yes |
| Claude in Chrome | already connected | Uses your browser sessions for Instagram and YouTube Studio | n/a | Yes, but Chrome is **logged out of Instagram** |
| Apify connector | already connected | Has Instagram profile and Reel scrapers | Paid platform (pay per result) | Connected, but **not used**: running Actors costs money, needs your OK |

## Transcription: what to use for Hinglish

| Option | Hinglish quality | Cost | Notes |
|---|---|---|---|
| YouTube auto-captions (`hi-orig`) | Good for words, poor for script: English words come out in Devanagari ("एडिटिंग", "क्लाइंट"), numbers sometimes dropped | Free | Hindi track available for 107 of 112 videos. Used as the default first pass |
| Whisper large-v3 (via whisper.cpp) | Decent on Hindi, still writes English loanwords in Devanagari; no official flag for mixed script | Free, local | Needs a ~1.6 GB model download |
| Trelis "Tara" / "Whisper Hinglish Preview" (Whisper large-v3 fine-tunes) | Best open-weights results on code-switched benchmarks in their makers' own tests; Tara writes English in Latin and Hindi in Devanagari | Free weights on Hugging Face | Research-grade, numbers self-reported. Worth a side-by-side test on 3 of our videos |
| Gemini (2.5 or later) | Strong on Hinglish and can output romanised Hinglish directly | Free tier / paid API | Means uploading our audio to Google. Fine for published videos; needs your OK for anything unpublished |
| Sarvam, ElevenLabs Scribe, Deepgram Nova-3 multilingual | Commercial leaders on code-switching in vendor tables | Paid API | Only if quality on the free route is not enough |

Recommendation: keep YouTube captions as the free first pass for published videos, and for
Instagram-only Reels (no YouTube twin) add one local model so nothing leaves the Mac.

## Researched but not recommended now

- **YouTube transcript MCP servers** (kimtaeyoon83/mcp-server-youtube-transcript, ergut/youtube-transcript-mcp, others): they wrap the same captions yt-dlp already gets. No gain.
- **faster-whisper / WhisperX**: good on NVIDIA GPUs; on Apple Silicon whisper.cpp is the faster local route, and WhisperX's speaker diarisation needs a Hugging Face token. Revisit only if we need speaker labels on multi-person skits.
- **YouTube Data API**: only adds what yt-dlp already gives for public videos. YouTube Studio analytics (retention, CTR) are better read from your logged-in Studio in Chrome.

## Needs your approval

1. **Log in to Instagram in Chrome** (you do the login; not possible as of 2026-11-04, a login-code problem). Without it I only see the newest 12 posts. With it I can list every Reel through your own session. Free, no new permissions.
2. ~~Download one Whisper model~~ Done 2026-11-04 (you approved). Took the 547 MB compressed model instead of the 1.6 GB one to save disk space.
3. **Optional: Apify Instagram scraper** as a fallback if you'd rather not log in. Paid per result (typically a few dollars for a few hundred posts), and it sends the profile name to Apify.
4. **Optional: monitoring.** A weekly scheduled task that re-runs `research/build_db.py` after a yt-dlp refresh to catch new uploads. Free, local; needs your OK to create.

Sources: [Trelis Whisper Hinglish Preview](https://huggingface.co/Trelis/whisper-hinglish-preview), [Trelis Tara](https://huggingface.co/Trelis/tara), [Hindi code-switching review](https://convertaudiototext.com/blog/hindi-transcription-code-switching), [faster-whisper vs whisper.cpp vs WhisperX, 2026](https://dev.to/jovan_chan_9500711396d4e6/faster-whisper-vs-whispercpp-vs-whisperx-2026-o29), [YouTube transcript MCP listing](https://lobehub.com/mcp?q=YouTube), [youtube-agent-skill](https://github.com/Jakeschincariol/youtube-agent-skill).
