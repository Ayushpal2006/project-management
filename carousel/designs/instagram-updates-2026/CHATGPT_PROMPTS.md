# Instagram 2026 updates carousel: ChatGPT fallback prompts

Use these when you want ChatGPT (image generation) to make a slide instead of the HTML render.

## Where the files are

- **Cloud project files (Library):** `/mnt/project-files/instagram-updates-2026-carousel/`
  - `01-cover.png` … `07-save-comment-follow.png`: the v2 renders. Upload one as the layout reference for its slide.
  - `chatgpt-pack/dsr-headshot.png`: Digraj sir's photo (cover only).
  - `chatgpt-pack/ig-profile.png`: the real @theskilledbrains profile screenshot (slide 7).
- **Repo (after `git pull` on the Mac):** `carousel/designs/instagram-updates-2026/` holds this file, `slides.html` and `render.cjs`. The IG screenshot is at `carousel/designs/reel-4-line-script/assets/ig-profile.png`.

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
- A huge black numeral sits to the left of the headline on update slides.
- Small top-left label in a tiny pixel/mono font: "@theskilledbrains".
- Body copy: short, bold, clean geometric sans, white on the gradient panel.
- Visuals: a realistic black smartphone showing a clean, accurate Instagram screen, tilted about 5 degrees and cut off by the bottom edge. Add a few rough hand-drawn white or gradient marker strokes (circles, arrows, underlines) like a person drew on it.
- A subtle film grain over everything (about 5%).
Never use: glossy 3D icons, claymorphism, emojis as graphics, neon glows, stock photos, extra logos, extra text, the words "students" or "learners".
Spell every word exactly as given.
```

## Slide prompts

### 1. Cover (upload `01-cover.png` + `dsr-headshot.png`)
```
Make slide 1, using the first image as the layout and the second as the man's real face. Keep his face, beard, hair and black polo exactly as in the photo, smiling, cut out cleanly, standing on the right half of the gradient panel and cropped by the bottom edge.
Top left, huge: "INSTAGRAM" in black, and below it "CHANGED." in the pink-to-orange gradient, bigger.
On the gradient panel, left side, huge white: "DID" / "YOU?".
A hand-drawn white arrow under it pointing right, and tiny mono text "5 updates. swipe."
```

### 2. Hashtags (upload `02-hashtags.png`)
```
Make slide 2 from this layout.
Huge black numeral "1". Headline: "HASHTAGS" (black) / "CAPPED AT 5" (gradient).
On the panel, tiny mono "since dec 2025", then white bold: "Pick 3 to 5 that say what the post is about."
Phone screen: an Instagram post by "theskilledbrains" (verified), caption "5 rules that changed this year." with exactly five blue hashtags #instagramtips #contentcreator #reels #socialmedia #creatorgrowth, and a sixth grey "#explorepage" crossed out with a hand-drawn gradient line. Small mono note on the panel: "6th tag? not allowed."
```

### 3. Sends (upload `03-sends.png`)
```
Make slide 3 from this layout.
Numeral "2". Headline: "SENDS" (gradient) / "BEAT LIKES" (black).
Panel: tiny mono "top ranking signal", then white bold: "Make posts people DM to a friend."
Phone screen: an Instagram post with the like, comment, share (paper plane) and save icons large and clear. Draw a rough gradient marker circle around the paper-plane share icon and a white hand-drawn arrow from the text to it.
```

### 4. Reorder (upload `04-reorder.png`)
```
Make slide 4 from this layout.
Numeral "3". Headline: "REORDER" (black) / "AFTER POSTING" (gradient).
Panel: tiny mono "new in 2026", then white bold: "Weak first slide? Long-press. Drag. Done."
Phone screen: Instagram's "Edit carousel" screen with "Done" in blue and a 2x2 grid of slide thumbnails; one slot is an empty dashed pink outline, and that thumbnail is lifted out of the phone, tilted, with a shadow, as if being dragged.
```

### 5. Trial Reels (upload `05-trial-reels.png`)
```
Make slide 5 from this layout.
Numeral "4". Headline: "TRIAL REELS" (black) / "ON SCHEDULE" (gradient).
Panel: tiny mono "test before you post", then white bold: "Non-followers see it first. Now you can schedule it."
Phone screen: Instagram "New reel" share screen with a small reel thumbnail, a "Trial" row with subtext "Shown to non-followers first" and a toggle switched on, a "Schedule" row showing "Tomorrow, 7:30 PM", and a blue "Schedule" button. Rough gradient marker circle around the toggle.
```

### 6. Original (upload `06-original.png`)
```
Make slide 6 from this layout.
Numeral "5". Headline: "ORIGINAL" (gradient) / "GETS PUSHED" (black).
Panel: tiny mono "reposts lose reach", then white bold: "Mostly reposts? You stop getting recommended."
Phone screen: the theskilledbrains Instagram profile grid of carousel covers. Over the phone, a slightly rotated white sticker with the word "ORIGINAL" in the gradient condensed font, edged with a rough hand-drawn gradient rectangle, like a rubber stamp.
```

### 7. Save + Comment + Follow (upload `07-save-comment-follow.png` + `ig-profile.png`)
```
Make slide 7 from the first image's layout. Use the second image exactly as it is (the real Instagram profile screenshot); do not redraw or change its text, numbers or logo.
Top left: "SAVE THIS" huge in gradient, below it "BEFORE YOUR NEXT POST" in black.
On the gradient panel in white: "COMMENT" and then "“RULES”" in black, then the line "I'll DM you the full 2026 checklist."
Place the profile screenshot on a white card tilted -2 degrees, with a rough gradient marker oval around its blue Follow button. To the right, white "+ FOLLOW" with a hand-drawn white arrow pointing to the button.
```

## Other cover hooks (swap into slide 1)

1. **Instagram changed. Did you?** (used)
2. Your 2024 Instagram playbook just expired.
3. Same effort, less reach? Instagram changed 5 things.
4. Instagram rewrote 5 rules this year.
5. 5 Instagram changes that decide your reach in 2026.
