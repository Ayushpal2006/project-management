"""Rebuild the content database from research/youtube/meta, subs and research/instagram/meta.
Run: python3 research/build_db.py   (safe to re-run; originals are never touched)"""
import json, glob, os, re, csv, sqlite3, datetime, subprocess, sys
R = os.path.dirname(os.path.abspath(__file__))
Y, I = R + '/youtube', R + '/instagram'
sys.path.insert(0, Y)
def vtt(p):
    out, last = [], ''
    for line in open(p, encoding='utf-8'):
        line = line.strip()
        if not line or '-->' in line or line.startswith(('WEBVTT', 'Kind:', 'Language:')): continue
        line = re.sub(r'<[^>]+>', '', line)
        if line != last and (not out or line not in out[-1]): out.append(line)
        last = line
    return ' '.join(out)
kind = dict(reversed(l.strip().split('\t')) for l in open(Y + '/ids.tsv'))
PRES = [('Ujjwal', r'ujjwal'), ('Sheetal', r'sheetal|shital'), ('Digraj', r'digraj|dsr'), ('Yash', r'yash')]
TOPIC = [('Video editing', r'edit|after effects|premiere|capcut'), ('AI', r'\bai\b|chatgpt|gemini|faceless'),
         ('YouTube/Instagram growth', r'youtube|instagram|channel|reel'), ('Personality/mindset', r'personality|journey|risk|life|motivat'),
         ('Careers/earning', r'earn|money|skill|roadmap|crorepati|₹|lakh'), ('Brand/offer', r'offer|launch|workshop|batch|cohort|surprise|mentor')]
TOOLS = r'CapCut|Premiere Pro|After Effects|DaVinci|ChatGPT|Gemini|ElevenLabs|Eleven Labs|Canva|Midjourney|HeyGen|Kling|Veo|Runway|Claude|Perplexity|NotebookLM'
os.makedirs(R + '/transcripts', exist_ok=True)
def intro(p):
    if not p: return ''
    t = vtt(p)[:2500]
    m = re.search(r'(मेरा नाम(?: है)?|माय नेम इज|दिस इज) ([^\s।,]+(?: [^\s।,]+)?)', t)
    return m.group(0) if m else ''
rows = []
today = datetime.date.today().isoformat()
for f in sorted(glob.glob(Y + '/meta/*.info.json')):
    d = json.load(open(f)); vid = d['id']; text = (d.get('title') or '') + ' ' + (d.get('description') or '')
    subs = sorted(glob.glob(f'{Y}/subs/{vid}.*.vtt'))
    best = next((s for s in subs if s.endswith('.hi-orig.vtt')), None) or next((s for s in subs if 'orig' in s), None)
    tr = 'Available (YouTube auto-captions)' if best else ('Pending download' if d.get('automatic_captions') else 'None on YouTube')
    if best:
        body = vtt(best).replace('[संगीत]', '')
        with open(f'{R}/transcripts/YT_{vid}.md', 'w') as fh:
            fh.write(f"# {d['title']}\n\n- URL: https://www.youtube.com/watch?v={vid}\n- Source: YouTube auto-generated captions ({os.path.basename(best).split('.',1)[1][:-4]})\n"
                     f"- Retrieved: {today}\n- Confidence: medium. Hindi ASR writes English words in Devanagari; names, tool names and numbers can be wrong (e.g. '₹ लाख' with the figure dropped). Not reviewed against the video unless noted.\n"
                     f"- This is a transcript, NOT an original script.\n\n{body}\n")
    wt = f'{R}/transcripts_whisper/{vid}.txt'
    if not best and os.path.exists(f'{R}/transcripts/YT_{vid}.md') and os.path.exists(wt):
        tr = 'Available (Whisper, local)'
    opening = vtt(best)[:220] if best else (open(wt, encoding='utf-8', errors='ignore').read()[:220] if tr.startswith('Available (Whisper') else '')
    cta = []
    if re.search(r'workshop', text, re.I): cta.append('Workshop')
    if re.search(r'batch|bundle|course', text, re.I): cta.append('Course/batch link')
    if re.search(r'subscribe', vtt(best) if best else '', re.I): cta.append('Subscribe')
    rows.append(dict(content_id='YT-' + vid, platform='YouTube ' + {'videos': 'Long', 'shorts': 'Short', 'streams': 'Live'}[kind.get(vid, 'videos')],
        title=d.get('title'), url='https://www.youtube.com/watch?v=' + vid, date=d.get('upload_date'), duration_s=d.get('duration'),
        views=d.get('view_count'), likes=d.get('like_count'), comments=d.get('comment_count'),
        presenter_mentioned=', '.join(p for p, rx in PRES if re.search(rx, text, re.I)) or 'Unconfirmed',
        self_intro=intro(best),
        topic=next((t for t, rx in TOPIC if re.search(rx, d.get('title') or '', re.I)), 'Other'),
        tools=', '.join(sorted(set(m.group(0) for m in re.finditer(TOOLS, text, re.I)))),
        chapters=len(d.get('chapters') or []), original_script='ORIGINAL SCRIPT NOT FOUND', transcript=tr,
        transcript_file=f'transcripts/YT_{vid}.md' if best or tr.startswith('Available (Whisper') else '', language='Hinglish' if best and 'hi' in best else '',
        hook_opening=opening, cta=', '.join(cta), cross_post='', analysis_status='Pending', notes=''))
# Instagram
ig = []
for f in sorted(glob.glob(I + '/meta/*.info.json')):
    d = json.load(open(f))
    if d.get('_type') == 'playlist' or '/p/' in (d.get('webpage_url') or '') and d.get('_type') != 'video': fmt = 'Carousel/post'
    else: fmt = 'Reel'
    if d['id'].startswith('DfHQ') and d['id'] != 'DfHQ8RxFEgx': continue  # slides of the DfHQ8RxFEgx carousel
    cap = (d.get('description') or '').strip()
    kw = re.search(r'[Cc]omment\s*[“"]?([A-Za-z]+)', cap)
    ig.append(dict(content_id='IG-' + d['id'], platform='Instagram ' + fmt, title=cap.split('\n')[0][:90], url=d.get('webpage_url'), date=d.get('upload_date'),
        duration_s=d.get('duration'), views=None, likes=d.get('like_count'), comments=d.get('comment_count'), presenter_mentioned='', self_intro='', topic='', tools='', chapters=0,
        original_script='ORIGINAL SCRIPT NOT FOUND', transcript='', transcript_file='', language='', hook_opening='', cta=('Comment keyword: ' + kw.group(1)) if kw else '',
        cross_post='', analysis_status='Pending', notes=cap.replace('\n', ' / ')))
MATCH = {'IG-DejwEx5NwTg': 'YT-X5sIQYgWJmY', 'IG-Dellr6ftrTT': 'YT-HsCPCWUpJGE', 'IG-DezGFocNbDf': 'YT-JTDlutnL5mw'}
by = {r['content_id']: r for r in rows}
for r in ig:
    if r['content_id'] in MATCH:
        y = by[MATCH[r['content_id']]]; y['cross_post'] = r['content_id']; r['cross_post'] = y['content_id']
        for k in ('presenter_mentioned', 'self_intro', 'topic', 'transcript_file', 'language', 'hook_opening'): r[k] = y[k]
        r['transcript'] = 'Available via YouTube cross-post (matched on title + duration)'
        r['duration_s'] = y['duration_s']
DONE = {'YT-smaltFr5nsw', 'YT-5WAzXIxt6L8', 'YT-HsCPCWUpJGE', 'YT-VUWCfrdouhc', 'YT-1UgkV_Saooo', 'YT-Omq4CCAW1FI',
        'YT-EgLiGX_kO-k', 'YT-X5sIQYgWJmY', 'YT-JTDlutnL5mw', 'YT-dXIKTI5ZB-8', 'YT-jwuoAO1NLsg', 'YT-kcsOP5ZnkqQ', 'YT-Vw9hWlEcXFY'}
WATCHED = {'YT-smaltFr5nsw', 'YT-5WAzXIxt6L8', 'YT-HsCPCWUpJGE', 'IG-DejwEx5NwTg', 'IG-Dellr6ftrTT', 'IG-DezGFocNbDf'}
for r in rows + ig:
    if r['content_id'] in DONE or r['cross_post'] in DONE:
        r['analysis_status'] = 'Transcript read' + ('; first 15s watched' if r['content_id'] in WATCHED else '')
all_rows = rows + ig
all_rows.sort(key=lambda r: (r['platform'].split()[0], r['date'] or ''))
with open(R + '/content_database.csv', 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=all_rows[0].keys()); w.writeheader(); w.writerows(all_rows)
db = sqlite3.connect(R + '/content_database.sqlite'); db.execute('DROP TABLE IF EXISTS content')
cols = list(all_rows[0].keys()); db.execute(f"CREATE TABLE content ({', '.join(c + ' TEXT' for c in cols)})")
db.executemany(f"INSERT INTO content VALUES ({','.join('?' * len(cols))})", [[str(r[c]) if r[c] is not None else None for c in cols] for r in all_rows])
db.commit()
print(len(rows), 'YouTube rows;', len(ig), 'Instagram rows;', sum(1 for r in rows if r['transcript_file']), 'YT transcripts written')
