# 30-day page growth carousel (planner look): ChatGPT fallback prompts

Use these when you want ChatGPT (image generation) to make a slide instead of the HTML render.

## Where the files are

- **Cloud project files (Library):** `/mnt/project-files/30-day-page-growth-carousel/`
  - `01-cover.png` … `07-loop-cta.png`: the planner renders. Upload one as the layout reference for its slide.
  - `chatgpt-pack/sheetal-shush.jpg` (cover), `sheetal-headache.jpg` (slide 2), `sheetal-thinking.jpg` (slide 4): Sheetal's real shoot photos. This is a Content Creation carousel, her pillar (see `brand/CONTENT_STRATEGY.md`).
  - `chatgpt-pack/ig-profile.png`: the real @theskilledbrains profile screenshot (slide 7).
  - `v1-angled-panel/`: the first version, kept for reference.
- **Repo (after `git pull` on the Mac):** `carousel/designs/30-day-page-growth/` holds this file, `slides.html`, `render.cjs` and `directions.html` (the 3 style frames). Sheetal's originals are on the Mac in `The Skilled brains/sheetal didi thumbnail images/` (DSC00095, DSC00075, DSC00160).

## How to use

1. Open a new ChatGPT chat. Paste the **Style block** first.
2. For each slide, upload the files listed, then paste that slide's prompt.
3. If text comes out misspelled, reply: "Keep everything, only fix the text to read exactly: …".
4. Ask for 4:5 portrait (1080×1350). If it gives 2:3, crop the top and bottom evenly.

## Style block (paste once at the top)

```
You are designing slides for an Instagram carousel for "The Skilled Brains" (@theskilledbrains), an Indian brand that teaches practical AI, content and freelancing skills.
Format: 4:5 portrait, 1080x1350. Keep all text 80 px inside the edges.
Look: a planner / notebook page, raw and human, not AI-looking.
- Background: warm off-white paper (#FAF7F2) with a faint grey dot grid and subtle film grain (about 5%).
- Headlines: a bold wide geometric display font (like Clash Display), black, sentence case, with one key word filled with a pink-to-orange gradient (#E8338F to #FF4466 to #FF7A1A). Strictly left-aligned, asymmetric, with empty space. Nothing centred.
- Big numbers and day ranges: a heavy italic high-contrast serif (like Playfair Display Black Italic) in the same gradient.
- A hand-drawn black-ink calendar grid is the running motif: white day cells with thick black lines, numbers top-left in bold sans, finished days crossed out with a rough pink-to-orange marker X.
- Real photos sit in white polaroid frames, slightly tilted, held by a strip of translucent yellow tape.
- Small labels in a tiny pixel/mono font: "@theskilledbrains" top-left plus a grey section word, and a page number like "02 / 07" top-right.
- Body copy: short, bold, clean geometric sans in black, with a yellow highlighter stroke behind the key phrase.
- Rough hand-drawn marks only: marker circles, arrows, ticks, question marks.
Never use: glossy 3D icons, claymorphism, emojis as graphics, neon glows, stock photos, extra logos, extra text, the words "students" or "learners".
Spell every word exactly as given.
```

## Slide prompts

### 1. Cover (upload `01-cover.png` + `sheetal-shush.jpg`)
```
Make slide 1 from the first image's layout. Use the second image as the woman's real face and pose (finger on lips, "shh"); keep her face, hair and outfit exactly as in the photo.
Top left, huge: "Don't" / "post yet." with "yet." in the gradient.
Below: "Do this for 21 days first." with "21" in the italic serif.
Top right: her photo in a white polaroid tilted 5 degrees with yellow tape, caption in tiny mono "shh. not yet."
Bottom: a 30-day calendar grid (7 columns); days 1 to 21 crossed out with pink-orange marker X's, day 22 circled with a tiny "post!" label. Tiny mono "swipe for the plan →" bottom right.
```

### 2. The mistake (upload `02-mistake.png` + `sheetal-headache.jpg`)
```
Make slide 2 from the first image's layout. Label "the mistake", page "02 / 07".
Headline: "Post on day 1." / "Hope." ("Hope." in gradient).
Body: "Most beginners do this. Guessing is the slowest way to grow." with yellow highlight on the second sentence.
Left: a single big calendar cell "1" circled in marker with a tiny "post" label, a hand-drawn black arrow pointing right, and tiny mono "day 1: post and pray".
Right: the woman from the second photo (hands on her head, frustrated) in a taped polaroid, two hand-drawn gradient question marks above it, and a small taped card of three plain reel tiles showing 41, 63 and 28 views.
```

### 3. Days 1-7: find the outliers (upload `03-outliers.png`)
```
Make slide 3 from this layout. Label "week 1", page "03 / 07".
Huge italic serif gradient "1–7", then headline "Find the" / "outliers."
A one-row calendar strip of days 1 to 7 on pale yellow, days 1-3 crossed out.
Left list: "Pick 5 creators in your niche." "Spot videos with way more views than usual." "Save 20 of them." (last one highlighted).
Right: a taped polaroid of an Instagram reels grid with view counts 14K, 9K, 2.1M, 11K, 8K, 12K; the 2.1M reel circled in gradient marker.
```

### 4. Why did this one work? (upload `04-why-it-worked.png` + `sheetal-thinking.jpg`)
```
Make slide 4 from the first image's layout. Label "week 1", page "04 / 07".
Huge italic serif gradient "?", then headline "Why did this" / "one work?"
Left: tiny mono "check:" then a hand-drawn checklist, each box ticked in gradient marker: "Topic", "Hook (first 3 sec)", "Thumbnail / first frame", "Length", "Format".
Right: a taped polaroid that looks like a paused Reel of the woman from the second photo (finger on temple, thinking): a progress bar near the start, "0:03 / 0:28" and "▶ 2.1M views" circled in gradient marker, tiny caption "the outlier".
```

### 5. Days 8-21: find the pattern (upload `05-pattern.png`)
```
Make slide 5 from this layout. Label "weeks 2-3", page "05 / 07".
Huge italic serif gradient "8–21", then headline "Find the" / "pattern."
A two-row calendar of days 8 to 21, days 8-10 crossed out.
Body: "What do your 20 saved videos have in common?"
Tiny mono "pick one format:" then three yellow sticky notes, slightly tilted: "before/after", "3 tips in 30 sec", "myth vs truth". A gradient marker circle around "before/after". A loose hand-drawn black arrow from the calendar down to the notes.
```

### 6. Days 22-30: the 50/50 rule (upload `06-50-50-rule.png`)
```
Make slide 6 from this layout. Label "days 22-30", page "06 / 07".
Huge italic serif gradient "22–30", then headline "Start posting." / "50/50 rule." (second line in gradient).
A calendar of days 22 to 30 (5 columns). Each day cell has a tiny tag that alternates: a black "proven" tag and a pink-outlined "test" tag.
Below, two columns: a black serif "50%" with a black "proven" tag and "Your proven format. Same structure, new topic."; a gradient serif "50%" with a pink "test" tag and "Test something new to find your next winner."
```

### 7. The loop + Comment + Follow (upload `07-loop-cta.png` + `ig-profile.png`)
```
Make slide 7 from the first image's layout. Use the second image exactly as it is (the real Instagram profile screenshot); do not redraw or change its text, numbers or logo.
Label "the loop", page "07 / 07".
Top left, four lines: "Better research" / "→ better decisions" / "→ better content" / "→ faster growth." (last words in gradient), with a hand-drawn gradient arrow on the right curving back up to the top, closing the loop.
Then big: "Comment "PLAN"" ("PLAN" in gradient), and "for the free 30-day tracker." with yellow highlight.
The profile screenshot in a wide taped polaroid tilted -2 degrees, a gradient marker oval around its blue Follow button, caption "us, every week". To the right, "+ Follow" with a hand-drawn black arrow pointing at the button.
```

## Other cover hooks (swap into slide 1)

1. **DON'T POST YET · Do this for 21 days first** (used)
2. STARTING A PAGE FROM ZERO? · The 30-day plan that beats guessing
3. MOST NEW CREATORS GUESS. · Smart ones copy what already works
