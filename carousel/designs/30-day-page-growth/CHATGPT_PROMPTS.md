# 30-day page growth carousel: ChatGPT fallback prompts

Use these when you want ChatGPT (image generation) to make a slide instead of the HTML render.

## Where the files are

- **Cloud project files (Library):** `/mnt/project-files/30-day-page-growth-carousel/`
  - `01-cover.png` … `07-loop-cta.png`: the HTML renders. Upload one as the layout reference for its slide.
  - `chatgpt-pack/dsr-headshot.png`: Digraj sir's photo (slides 1 and 4).
  - `chatgpt-pack/ig-profile.png`: the real @theskilledbrains profile screenshot (slide 7).
  - `chatgpt-pack/CHATGPT_PROMPTS.md`: this file.
- **Repo (after `git pull` on the Mac):** `carousel/designs/30-day-page-growth/` holds this file, `slides.html` and `render.cjs`. The IG screenshot is at `carousel/designs/reel-4-line-script/assets/ig-profile.png`.

## How to use

1. Open a new ChatGPT chat. Paste the **Style block** first.
2. For each slide, upload the files listed, then paste that slide's prompt.
3. If text comes out misspelled, reply: "Keep everything, only fix the text to read exactly: …".
4. Ask for 4:5 portrait (1080×1350). If it gives 2:3, crop the top and bottom evenly.

## Style block (paste once at the top)

```
You are designing slides for an Instagram carousel for "The Skilled Brains" (@theskilledbrains), an Indian brand that teaches practical AI, content and freelancing skills.
Format: 4:5 portrait, 1080x1350. Keep all text 80 px inside the edges.
Look: editorial poster, raw and human, not AI-looking.
- Top half: clean white background. Bottom half: a bold pink-to-orange gradient panel (#E8338F to #FF4466 to #FF7A1A) with a slightly angled top edge (higher on the right).
- Headlines: very large condensed all-caps sans (like Anton), black, with the key words filled with the same pink-to-orange gradient. Strictly left-aligned, asymmetric, with lots of empty space. Nothing centred.
- A huge black numeral sits to the left of the headline on step slides.
- Small top-left label in a tiny pixel/mono font: "@theskilledbrains" plus a grey section word.
- Body copy: short, bold, clean geometric sans, white on the gradient panel.
- Visuals: a realistic black smartphone showing a clean, accurate Instagram screen, tilted about 5 degrees and cut off by the bottom edge. Add a few rough hand-drawn white or gradient marker strokes (circles, arrows, underlines) like a person drew on it.
- A subtle film grain over everything (about 5%).
Never use: glossy 3D icons, claymorphism, emojis as graphics, neon glows, stock photos, extra logos, extra text, the words "students" or "learners".
Spell every word exactly as given.
```

## Slide prompts

### 1. Cover (upload `01-cover.png` + `dsr-headshot.png`)
```
Make slide 1, using the first image as the layout and the second as the man's real face. Keep his face, beard, hair and black polo exactly as in the photo, smiling, cut out cleanly, on the right half of the gradient panel and cropped by the bottom edge.
Top-left label: "@theskilledbrains  the 30-day plan".
Top left, huge: "DON'T" in black, and below it "POST YET." in the pink-to-orange gradient.
On the gradient panel, left side, white: "DO THIS FOR", then a giant "21", then "DAYS FIRST".
Tiny white mono text at the bottom left: "swipe for the plan →".
```

### 2. The mistake (upload `02-mistake.png`)
```
Make slide 2 from this layout. Label: "the mistake".
Headline top left: "POST ON DAY 1." (black) / "HOPE." (gradient, bigger).
Panel: tiny mono "what most beginners do", then white bold: "Guessing is the slowest way to grow." with a rough white underline.
Phone screen: a brand-new Instagram profile "my_new_page" on the Reels tab, six plain pale tiles with tiny view counts (41, 63, 28, 35, 19, 52). Two big hand-drawn gradient question marks over the grid.
```

### 3. Days 1-7: find the outliers (upload `03-outliers.png`)
```
Make slide 3 from this layout. Label: "days 1-7".
Huge black numeral "1". Headline: "FIND THE" (black) / "OUTLIERS" (gradient).
Panel, white bold numbered list: "1 Pick 5 creators in your niche." "2 Spot videos with way more views than usual." "3 Save 20 of them."
Phone screen: a creator's Reels tab "creator_in_your_niche" with six reels showing 14K, 9.2K, 11K, 2.1M, 8.7K, 12K views. A rough white-and-gradient marker circle around the 2.1M reel, and "SAVE IT." in white condensed caps beside the phone.
```

### 4. Why did this one work? (upload `04-why-it-worked.png` + `dsr-headshot.png`)
```
Make slide 4 from the first image's layout. Label: "days 1-7".
A huge black "?" as the numeral. Headline: "WHY DID" (black) / "THIS ONE" / "WORK?" (gradient).
Panel: tiny mono "ask one question. check:", then a white checklist with ticks: "Topic", "Hook (first 3 sec)", "Thumbnail or first frame", "Length", "Format".
Phone screen: a full-screen Reel of the man from the second photo (keep his real face), with a progress bar near the start, "0:03 / 0:28" circled in a rough gradient marker, and "▶ 2.1M views".
```

### 5. Days 8-21: find the pattern (upload `05-pattern.png`)
```
Make slide 5 from this layout. Label: "days 8-21".
Numeral "2". Headline: "FIND THE" (black) / "PATTERN" (gradient).
Panel: tiny mono "days 8-21", then white bold: "What do your 20 saved videos have in common?" Below it, tiny mono "pick one format:" and three white pill stickers, slightly tilted: "before/after", "3 tips in 30 sec", "myth vs truth". A rough black marker oval around "before/after".
Phone screen: Instagram "Saved" collection, "20 reels", a 4-column grid where about half the tiles carry a small "b/a" tag, showing the pattern.
```

### 6. Days 22-30: the 50/50 rule (upload `06-50-50-rule.png`)
```
Make slide 6 from this layout. Label: "days 22-30".
Numeral "3". Headline: "START POSTING" (black) / "50/50 RULE" (gradient).
Panel: tiny mono "days 22-30", then a big white "50%" with "Your proven format. Same structure, new topic." and a big black "50%" with "Test something new to find your next winner."
Phone screen: the profile "my_page" on the Reels tab; tiles alternate small black "proven" tags and white "test" tags. A rough gradient marker circle around one "test" tile.
```

### 7. The loop + Comment + Follow (upload `07-loop-cta.png` + `ig-profile.png`)
```
Make slide 7 from the first image's layout. Use the second image exactly as it is (the real Instagram profile screenshot); do not redraw or change its text, numbers or logo.
Label: "the loop". Top left, black condensed caps, four lines: "BETTER RESEARCH" / "→ BETTER DECISIONS" / "→ BETTER CONTENT" / "→ FASTER GROWTH" (last line in gradient). A hand-drawn gradient arrow on the right curving from the last line back up to the first, closing the loop.
On the gradient panel in white: "COMMENT" and then "“PLAN”" in black, then the line "for the free 30-day tracker."
Place the profile screenshot on a white card tilted -2 degrees, with a rough gradient marker oval around its blue Follow button. To the right, white "+ FOLLOW" with a hand-drawn white arrow pointing to the button.
```

## Other cover hooks (swap into slide 1)

1. **DON'T POST YET · Do this for 21 days first** (used)
2. STARTING A PAGE FROM ZERO? · The 30-day plan that beats guessing
3. MOST NEW CREATORS GUESS. · Smart ones copy what already works
