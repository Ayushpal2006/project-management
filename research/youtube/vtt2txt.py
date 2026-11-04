import sys,re
def conv(p):
    out=[];last=''
    for line in open(p,encoding='utf-8'):
        line=line.strip()
        if not line or '-->' in line or line.startswith(('WEBVTT','Kind:','Language:')) or re.match(r'^\d+$',line): continue
        line=re.sub(r'<[^>]+>','',line)
        if line!=last and (not out or line not in out[-1]): out.append(line)
        last=line
    return ' '.join(out)
for p in sys.argv[1:]: print(conv(p))
