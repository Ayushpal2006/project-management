# Scriptwriting system

How Claude writes a new Skilled Brains script when you give it a topic. Sources, in priority
order:

1. `research/content_database.sqlite` and `research/transcripts/` (what we have actually published)
2. `research/MASTER_CONTENT_DNA.md` (how we sound)
3. `brand/BRAND_BRIEF.md` and the `skilled-brains-*` skills (visual and brand rules)
4. `~/.claude/youtube/voice.md` and `~/.claude/instagram/voice.md`, read by the `yt-*` and `ig-*` packs

The skill packs are tools. Where their generic advice conflicts with points 1 and 2, our own
content wins, and the script notes the conflict.

## Steps

1. **Topic, viewer and presenter.** Name the one viewer (see voice.md) and who will say it:
   Digraj Sir, Sheetal Didi, Ujjwal, Yash or a skit. The presenter changes the opening, the
   phrases and the sign-off (DNA, "Presenter differences").
2. **Have we covered it?** Search the database:
   ```bash
   sqlite3 research/content_database.sqlite "select content_id,title,views,transcript_file from content where title like '%editing%' or notes like '%editing%' order by cast(views as int) desc"
   grep -l "क्लाइंट" research/transcripts/*.md   # search spoken words in Devanagari
   ```
3. **Read the closest 2 or 3 transcripts.** Note what we already said, so the new script adds
   something and doesn't repeat it.
4. **Pick the format** from DNA section 14 (roadmap, ranked list, founder story, lecture,
   skit into offer, tip Short, carousel).
5. **Research and verify facts.** Every number needs a source or must come from our own proof
   list (voice.md, "Proof I can use"). Anything unverified is marked `{{check}}`.
6. **Hooks.** Write 3 to 5 openings using DNA section 5, then score them with the pack's
   scorer (`/yt-script` runs `hookscore.py`; `/ig-reel` has its own). Keep the hook first and
   the name intro after it.
7. **Write the script** with `/yt-script` (long video) or `/ig-reel` (Reel or Short), in
   Hinglish voiceover with English on-screen text, at the presenter's pace (about 190 wpm
   long, 220 wpm Shorts).
8. **Add a story beat and a demo** where the topic allows: a confession, our own number, a
   screen recording or before/after.
9. **Retention pass.** An open loop in the first minute, bad-to-best ordering, new
   information every few lines (DNA section 11). `/yt-retention` once Studio data exists.
10. **CTA.** One main ask matched to the piece (DNA section 13), plus the Instagram keyword
    if it's a Reel.
11. **Human pass.** Run `/ig-human` over the draft, then check it against DNA section 16.
    Read it aloud: if a line is something the presenter would never say, rewrite it.
12. **Package.** `/yt-package` for title and thumbnail text, `/yt-seo` for the description,
    `/ig-caption` for Instagram. Then the pre-publish checklist in
    `skills/skilled-brains-carousel/SKILL.md`. Nothing is published without your go-ahead.

## Output format

Same table layout the team already uses in Drive: Time | Visual | On-screen text (English) |
Voiceover (Hinglish, Roman script), then title options, description, and "check before you
record".
