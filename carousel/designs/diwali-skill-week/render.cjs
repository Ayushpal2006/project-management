// Renders the six 1024x512 push banners. node render.cjs [id-prefix]
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
const B=JSON.parse(fs.readFileSync(__dirname+'/banners.json')); const only=process.argv[2];
const logo=['logo.svg','logo.png'].map(f=>path.join(__dirname,'brand',f)).find(fs.existsSync);
const S=1024/2752;
const cards=[['AI SKILLS',1361,252,'#C9A45C'],['EDITING',1543,372,'#C9A45C'],['CONTENT',1726,500,'#012816'],['GROWTH',1911,630,'#F5EFE4']];
function html(b){
 const ink=b.dark?'#F5EFE4':'#012816';
 const lab=cards.map(([t,x,y,c])=>`<span class="cl" style="left:${x*S}px;top:${y*S}px;color:${c}">${t}</span>`).join('');
 return `<html><head><style>
@font-face{font-family:Clash;src:url(fonts/ClashDisplay-Bold.woff2)}
@font-face{font-family:Satoshi;src:url(fonts/Satoshi-Regular.woff2);font-weight:400}
@font-face{font-family:Satoshi;src:url(fonts/Satoshi-Bold.woff2);font-weight:700}
*{margin:0;box-sizing:border-box}
body{width:1024px;height:512px;overflow:hidden;position:relative;background:${b.dark?'#140D08':'#EFE6D8'};font-family:Satoshi}
.stage{position:absolute;left:${b.dx||0}px;top:${-b.off}px;width:1024px;height:${1536*S}px;background:url(plates/${b.plate}) 0 0/100% 100%}
.scrim{position:absolute;inset:0;background:${b.dark?'linear-gradient(90deg,rgba(14,9,6,.55),rgba(14,9,6,0) 60%)':'linear-gradient(90deg,rgba(245,239,228,.92) 0,rgba(245,239,228,.75) 30%,rgba(245,239,228,0) 52%)'}}
.grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:${b.dark?'screen':'multiply'};background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.top{position:absolute;left:56px;top:46px;display:flex;align-items:center;gap:14px}
.logo{height:40px;width:auto;display:block}
.tag{font:700 11.5px Satoshi;letter-spacing:.22em;color:${ink};opacity:.85}
.tag b{color:#B8862F;margin-left:10px}
.rule{width:28px;height:1.5px;background:#B8862F}
h1{position:absolute;left:54px;bottom:${b.small?92:70}px;font:400 ${b.dark?66:52}px/0.98 Clash;letter-spacing:.005em;word-spacing:.14em;color:${ink}}
h1 em{font-style:normal;color:${b.dark?'#D9A441':'#C2601A'}}
.small{position:absolute;left:56px;bottom:62px;font:400 15px Satoshi;letter-spacing:.06em;color:${ink};opacity:.85}
.cl{position:absolute;font:700 ${42*S}px Satoshi;letter-spacing:.18em}
</style></head><body><div class="stage">${b.cards?lab:''}</div><div class="scrim"></div>
<div class="top">${logo?`<img class="logo" src="${path.relative(__dirname,logo)}">`:''}<span class="tag">DIWALI SKILL WEEK<b>${b.date}</b></span></div>
<h1>${b.lines.join('<br>')}</h1>${b.small?`<div class="small">${b.small}</div>`:''}<div class="grain"></div></body></html>`;}
(async()=>{const br=await chromium.launch(); fs.mkdirSync(__dirname+'/out',{recursive:true});
for(const b of B){ if(only&&!b.id.startsWith(only))continue;
 const f=__dirname+`/.${b.id}.html`; fs.writeFileSync(f,html(b));
 for(const s of [1,2]){const p=await br.newPage({viewport:{width:1024,height:512},deviceScaleFactor:s});
  await p.goto('file://'+f); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({path:__dirname+`/out/${b.id}${s==2?'@2x':''}.png`}); await p.close();}
 console.log(b.id);}
await br.close();})();
