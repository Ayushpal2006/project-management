// Diwali Sales Campaign 2026: push banners (1024x512) + portrait (1080x1350).
// node render.cjs [day-prefix]   e.g. node render.cjs d1
// Needs (gitignored): people/*.png cut-outs (python3 cutout.py <photo dir>),
// brand/logo-forest.png + brand/logo-ivory.png (made from the official Logo.png), props/*.png.
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
const only=process.argv[2];
const icon=(f,fill)=>fs.readFileSync(path.join(__dirname,'icons',f),'utf8').replace(/<title>.*?<\/title>/,'').replace('<svg ',`<svg fill="${fill}" `);
const C={ivory:'#F6F0E4',paper:'#FBF8F1',forest:'#012816',forest2:'#0B3A22',mint:'#00D579',gold:'#B8862F',gold2:'#D9A441',orange:'#C2601A',ink:'#1B1B1B'};

// Tiny hand-built UI glyphs (no 3D, no stock icons)
const phoneGlyph=`<svg viewBox="0 0 40 56"><rect x="6" y="2" width="28" height="52" rx="6" fill="${C.ink}"/><rect x="9" y="7" width="22" height="22" rx="2" fill="#E9B872"/><circle cx="20" cy="18" r="5" fill="#C2601A"/><rect x="9" y="33" width="22" height="3" rx="1.5" fill="${C.mint}"/><rect x="9" y="38" width="15" height="3" rx="1.5" fill="#F2A541"/><rect x="9" y="43" width="19" height="3" rx="1.5" fill="#7D8CF0"/><rect x="18" y="31" width="1.6" height="17" fill="#fff"/></svg>`;
const speakGlyph=`<svg viewBox="0 0 56 56"><circle cx="20" cy="20" r="8" fill="none" stroke="${C.forest}" stroke-width="3.2"/><path d="M6 46c1.5-9 7-13 14-13s12.5 4 14 13" fill="none" stroke="${C.forest}" stroke-width="3.2" stroke-linecap="round"/><path d="M36 10h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-8l-5 4v-4h-1a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" fill="${C.gold2}"/><rect x="39" y="15" width="10" height="2.2" rx="1.1" fill="#fff"/><rect x="39" y="19" width="6" height="2.2" rx="1.1" fill="#fff"/></svg>`;

const GRAIN=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const base=(w,h)=>`<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=block" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:${C.ivory};font-family:Poppins;color:${C.forest}}
.grain{position:absolute;inset:0;opacity:.045;mix-blend-mode:multiply;background:${GRAIN};pointer-events:none;z-index:50}
.logo{position:absolute;display:block}
h1{font-weight:800;letter-spacing:-.01em;line-height:.98;text-transform:uppercase}
h1 em{font-style:normal;color:${C.orange}}
.sub{font-weight:500;color:${C.forest};opacity:.82}
.sub i{font-style:normal;color:${C.gold};padding:0 .35em}
.cta{position:absolute;display:inline-flex;align-items:center;background:${C.forest};color:${C.ivory};font-weight:700;letter-spacing:.08em;border-radius:999px;white-space:nowrap}
.cta b{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:${C.mint};color:${C.forest};font-weight:800}
.tile{position:absolute;background:${C.paper};border:1px solid rgba(1,40,22,.12);border-radius:14px;box-shadow:0 1px 0 rgba(1,40,22,.04),0 10px 24px -14px rgba(1,40,22,.35);display:flex;align-items:center}
.tile .ic svg{width:100%;height:100%;display:block}
.tile span{font-weight:600;color:${C.forest};line-height:1.1}
.cap{position:absolute;font-weight:600;color:${C.ivory};letter-spacing:.02em}
.cap small{display:block;font-weight:400;opacity:.75;letter-spacing:.04em}
.ph{position:absolute;display:block}
</style>`;

const D1tiles=[
 ['ChatGPT',icon('openai.svg','#111')],
 ['Gemini',icon('googlegemini.svg','#4C7BF0')],
 ['Claude',icon('claude.svg','#D97757')],
 ['Mobile Editing',phoneGlyph],
 ['Personality Development',speakGlyph],
];


const plate=(f,w,x,y,extra='')=>`<div class="plate" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${w*1536/2752}px;background:url(plates/${f}) 0 0/100% 100%;${extra}"></div>`;
const cap=(name,role,st,size=13,dark=true)=>`<div class="cap" style="${st};font-size:${size}px;background:${dark?'rgba(1,40,22,.86)':'rgba(251,248,241,.92)'};color:${dark?C.ivory:C.forest};padding:${size*.5}px ${size*1.05}px;border-radius:${size*.75}px;border:1px solid rgba(217,164,65,.55);z-index:20">${name}<small>${role}</small></div>`;
const disc=(src,d,st,ring=C.gold2,bg=C.forest)=>`<div style="position:absolute;${st};width:${d}px;height:${d}px;border-radius:50%;overflow:hidden;background:${bg};box-shadow:0 0 0 ${Math.max(2,d/45)}px ${ring},0 12px 24px -10px rgba(0,0,0,.35);z-index:15"><img src="${src}" style="position:absolute;left:50%;top:6%;width:118%;transform:translateX(-50%)"></div>`;
const logos=(sz,gap)=>[['openai.svg','#111','ChatGPT'],['googlegemini.svg','#4C7BF0','Gemini'],['claude.svg','#D97757','Claude']].map(([f,c,t],i)=>`${i?`<i style="font-style:normal;color:${C.gold};padding:0 ${gap*.6}px">•</i>`:''}<span style="display:inline-flex;align-items:center;gap:${gap*.5}px"><span style="display:inline-block;width:${sz}px;height:${sz}px">${icon(f,c).replace('<svg ','<svg width="100%" height="100%" ')}</span>${t}</span>`).join('');
const vframes=(w,gap,st)=>`<div style="position:absolute;${st};display:flex;gap:${gap}px;z-index:6">${['v-gift.jpg','v-marigold.jpg','v-cards.jpg'].map((f,i)=>`<div style="width:${w}px;height:${w*16/9}px;border-radius:${w*.12}px;background:url(ui/thumbs/${f}) center/cover;box-shadow:0 0 0 ${Math.max(2,w/30)}px #fff,0 10px 20px -10px rgba(0,0,0,.4);transform:rotate(${[-4,2,-2][i]}deg)"></div>`).join('')}</div>`;


// Three Growth Bundle panels: [label, inner visual]
const growthPanels=k=>[
 ['Professional<br>Editing',`<div style="position:absolute;inset:0;background:url(ui/thumbs/h-studio.jpg) center/cover"></div><div style="position:absolute;left:8%;right:8%;bottom:8%;display:grid;gap:4px">${[['#7D8CF0',70],['#F2A541',90],['#00D579',55]].map(([c,w])=>`<i style="display:block;height:${k*6}px;width:${w}%;border-radius:3px;background:${c}"></i>`).join('')}</div>`],
 ['AI<br>Skills',`<div style="position:absolute;inset:0;padding:12%;display:flex;flex-direction:column;gap:${k*6}px;justify-content:center">${[['openai.svg','#fff'],['googlegemini.svg','#8FB1FF'],['claude.svg','#E8936F']].map(([f,c],i)=>`<div style="display:flex;align-items:center;gap:${k*6}px;background:rgba(255,255,255,.07);border-radius:${k*8}px;padding:${k*7}px"><span style="width:${k*16}px;height:${k*16}px;flex:none">${icon(f,c).replace('<svg ','<svg width="100%" height="100%" ')}</span><i style="display:block;height:${k*4}px;flex:1;border-radius:3px;background:rgba(246,240,228,.35);max-width:${[80,60,70][i]}%"></i></div>`).join('')}</div>`],
 ['Creator<br>Growth',`<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><defs><linearGradient id="g${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9A441" stop-opacity=".45"/><stop offset="1" stop-color="#D9A441" stop-opacity="0"/></linearGradient></defs>${[25,50,75].map(y=>`<line x1="0" x2="100" y1="${y}" y2="${y}" stroke="rgba(246,240,228,.12)" stroke-width=".6"/>`).join('')}<path d="M0 86 L18 78 L34 80 L50 62 L66 56 L82 34 L100 18 L100 100 L0 100Z" fill="url(#g${k})"/><path d="M0 86 L18 78 L34 80 L50 62 L66 56 L82 34 L100 18" fill="none" stroke="#D9A441" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg><div style="position:absolute;left:10%;top:10%;display:flex;gap:${k*6}px"><span style="width:${k*18}px;height:${k*18}px">${icon('youtube.svg','#FF3B30').replace('<svg ','<svg width="100%" height="100%" ')}</span><span style="width:${k*18}px;height:${k*18}px">${icon('instagram.svg','#F6F0E4').replace('<svg ','<svg width="100%" height="100%" ')}</span></div>`],
];

const banners={
// ---------------- DAY 1 · 3 NOV · FOUNDATION BUNDLE ----------------
'd1-foundation-bundle':{
 land:()=>`${base(1024,512)}<style>
  .panel{position:absolute;left:688px;top:28px;width:308px;height:484px;border-radius:154px 154px 0 0;background:radial-gradient(120% 70% at 50% 18%,${C.forest2} 0,${C.forest} 70%)}
  .ring{position:absolute;left:700px;top:40px;width:284px;height:472px;border-radius:142px 142px 0 0;border:1.2px solid rgba(217,164,65,.55);border-bottom:none}
  .glow{position:absolute;left:600px;top:250px;width:420px;height:300px;background:radial-gradient(closest-side,rgba(242,165,65,.28),rgba(242,165,65,0));}
  h1{position:absolute;left:52px;top:104px;font-size:54px}
  .sub{position:absolute;left:54px;top:226px;font-size:14.5px}
  .tile{width:112px;height:92px;flex-direction:column;justify-content:center;gap:8px;padding:0 8px;text-align:center}
  .tile .ic{width:32px;height:32px}
  .tile span{font-size:11px}
  .cta{left:52px;top:412px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px}
  .cta b{width:34px;height:34px;font-size:18px}
  .cap{left:716px;top:446px;font-size:13px}
 </style>
 <img class="logo" src="brand/logo-forest.png" style="left:52px;top:38px;height:40px">
 <h1>Build your<br><em>foundation</em></h1>
 <div class="sub">AI<i>•</i>Mobile Editing<i>•</i>Personality Development</div>
 ${D1tiles.map(([t,s],i)=>`<div class="tile" style="left:${52+i*122}px;top:280px"><div class="ic">${s}</div><span>${t.replace(' Development','<br>Development').replace('Mobile ','Mobile<br>')}</span></div>`).join('')}
 <div class="cta">EXPLORE THE BUNDLE <b>→</b></div>
 <div class="glow"></div><div class="panel" style="overflow:hidden"><img class="ph" src="people/dsr.png" style="left:-22px;bottom:0;height:418px"></div><div class="ring"></div>
 <img class="ph" src="props/diya.png" style="left:592px;top:430px;height:66px;filter:drop-shadow(0 8px 8px rgba(80,40,10,.25))">
 <div class="cap" style="background:rgba(1,40,22,.82);padding:7px 14px;border-radius:10px;border:1px solid rgba(217,164,65,.5)">Digraj Sir<small>Founder · Personality Development</small></div>
 <div class="grain"></div>`,
 port:()=>`${base(1080,1350)}<style>
  .panel{position:absolute;left:492px;top:560px;width:540px;height:790px;border-radius:270px 270px 0 0;background:radial-gradient(120% 70% at 50% 18%,${C.forest2} 0,${C.forest} 70%)}
  .ring{position:absolute;left:510px;top:578px;width:504px;height:772px;border-radius:252px 252px 0 0;border:2px solid rgba(217,164,65,.55);border-bottom:none}
  .glow{position:absolute;left:300px;top:900px;width:780px;height:500px;background:radial-gradient(closest-side,rgba(242,165,65,.26),rgba(242,165,65,0));}
  h1{position:absolute;left:72px;top:190px;font-size:112px}
  .sub{position:absolute;left:76px;top:440px;font-size:28px}
  .tile{left:72px;width:372px;height:96px;gap:20px;padding:0 22px}
  .tile .ic{width:48px;height:48px;flex:none}
  .tile span{font-size:24px}
  .cta{left:72px;top:1210px;height:80px;padding:0 10px 0 36px;font-size:23px;gap:20px}
  .cta b{width:60px;height:60px;font-size:30px}
  .cap{left:520px;top:1230px;font-size:24px}
 </style>
 <img class="logo" src="brand/logo-forest.png" style="left:72px;top:72px;height:66px">
 <h1>Build your<br><em>foundation</em></h1>
 <div class="sub">AI<i>•</i>Mobile Editing<i>•</i>Personality Development</div>
 <div class="glow"></div><div class="panel" style="overflow:hidden"><img class="ph" src="people/dsr.png" style="left:-40px;bottom:0;height:720px"></div><div class="ring"></div>
 ${D1tiles.map(([t,s],i)=>`<div class="tile" style="top:${560+i*118}px"><div class="ic">${s}</div><span>${t}</span></div>`).join('')}
 <img class="ph" src="props/marigold.png" style="right:-70px;top:-60px;height:300px;transform:rotate(18deg)">
 <img class="ph" src="props/diya.png" style="left:420px;top:1110px;height:92px;filter:drop-shadow(0 10px 10px rgba(80,40,10,.25));z-index:5">
 <div class="cta">EXPLORE THE BUNDLE <b>→</b></div>
 <div class="cap" style="left:auto;right:56px;top:1236px;text-align:right;background:rgba(1,40,22,.82);padding:12px 22px;border-radius:14px;border:1.5px solid rgba(217,164,65,.5)">Digraj Sir<small>Founder · Personality Development</small></div>
 <div class="grain"></div>`,
},
// ---------------- DAY 2 · 4 NOV · AI COURSES ----------------
'd2-ai-courses':{
 land:()=>`${base(1024,512)}<style>body{background:#F8F1E2}
  h1{position:absolute;left:48px;top:84px;font-size:44px;white-space:nowrap}
  .sub{position:absolute;left:50px;top:146px;font-size:15px;display:flex;align-items:center}
  .cta{left:48px;top:420px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px}.cta b{width:34px;height:34px;font-size:18px}
  .side{position:absolute;left:790px;top:0;width:234px;height:512px;background:radial-gradient(110% 60% at 50% 30%,${C.forest2},${C.forest});border-radius:28px 0 0 28px;overflow:hidden}
 </style>
 ${plate('c-d2-laptop.jpg',1001,-112,-6)}
 <img class="logo" src="brand/logo-forest.png" style="left:48px;top:30px;height:38px">
 <h1>Learn AI <em>the practical way</em></h1>
 <div class="sub">${logos(16,14)}</div>
 <div class="side"><img class="ph" src="people/dsr.png" style="left:-46px;bottom:0;height:400px"></div>
 ${cap('Digraj Sir','Founder','left:806px;top:452px',12.5)}
 <div class="cta">START LEARNING <b>→</b></div>
 <div class="grain"></div>`,
 port:()=>`${base(1080,1350)}<style>body{background:#F8F1E2}
  h1{position:absolute;left:72px;top:180px;font-size:104px}
  .sub{position:absolute;left:76px;top:404px;font-size:30px;display:flex;align-items:center}
  .band{position:absolute;left:0;right:0;top:1100px;bottom:0;background:${C.forest}}
  .cta{left:72px;top:1196px;height:84px;padding:0 12px 0 40px;font-size:24px;gap:22px;background:${C.ivory};color:${C.forest}}.cta b{width:60px;height:60px;font-size:30px}
 </style>
 ${plate('c-d2-laptop.jpg',1561,-470,212)}
 <div class="band"></div>
 <img class="logo" src="brand/logo-forest.png" style="left:72px;top:72px;height:66px">
 <h1>Learn AI the<br><em>practical way</em></h1>
 <div class="sub">${logos(32,26)}</div>
 <img class="ph" src="people/dsr.png" style="right:-60px;bottom:0;height:560px;z-index:8">
 ${cap('Digraj Sir','Founder','right:40px;top:1250px',22)}
 <div class="cta">START LEARNING <b>→</b></div>
 <div class="grain"></div>`,
},
// ---------------- DAY 3 · 5 NOV · MOBILE EDITING ----------------
'd3-mobile-editing':{
 land:()=>`${base(1024,512)}<style>body{background:#F0DFC8}
  h1{position:absolute;left:48px;top:92px;font-size:52px}
  .sub{position:absolute;left:50px;top:210px;font-size:15px}
  .cta{left:48px;top:420px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px}.cta b{width:34px;height:34px;font-size:18px}
  .card{position:absolute;left:770px;top:44px;width:226px;height:468px;border-radius:26px 26px 0 0;background:radial-gradient(110% 60% at 50% 25%,${C.forest2},${C.forest});overflow:hidden}
  .arw{position:absolute;left:240px;top:296px;width:250px;height:2px;background:repeating-linear-gradient(90deg,${C.orange} 0 8px,transparent 8px 14px);z-index:6}
  .arw:after{content:'';position:absolute;right:-4px;top:-6px;border:7px solid transparent;border-left:10px solid ${C.orange}}
 </style>
 ${plate('c-d3-phone.jpg',1087,30,-48,'-webkit-mask:linear-gradient(90deg,transparent 0,transparent 27%,#000 40%)')}
 <img class="logo" src="brand/logo-forest.png" style="left:48px;top:30px;height:38px">
 <h1>Edit like<br>a <em>creator</em></h1>
 <div class="sub">All You Need Is Your Phone</div>
 ${vframes(50,10,'left:52px;top:252px')}
 <div class="arw"></div>
 <div class="card"><img class="ph" src="people/dsr.png" style="left:-40px;bottom:0;height:392px"></div>
 ${cap('Digraj Sir','Founder','left:786px;top:452px',12.5)}
 <div class="cta">LEARN MOBILE EDITING <b>→</b></div>
 <div class="grain"></div>`,
 port:()=>`${base(1080,1350)}<style>body{background:#EFDDC4}
  h1{position:absolute;left:72px;top:176px;font-size:112px}
  .sub{position:absolute;left:76px;top:420px;font-size:30px}
  .cta{left:72px;top:1220px;height:80px;padding:0 10px 0 36px;font-size:23px;gap:20px}.cta b{width:60px;height:60px;font-size:30px}
  .card{position:absolute;left:640px;top:820px;width:440px;height:530px;border-radius:40px 0 0 0;background:radial-gradient(110% 60% at 50% 25%,${C.forest2},${C.forest});overflow:hidden}
  .arw{position:absolute;left:90px;top:1030px;width:2px;height:120px}
 </style>
 ${plate('c-d3-phone.jpg',1700,-440,330,'-webkit-mask:linear-gradient(180deg,transparent 0,#000 10%)')}
 <img class="logo" src="brand/logo-forest.png" style="left:72px;top:72px;height:66px">
 <h1>Edit like<br>a <em>creator</em></h1>
 <div class="sub">All You Need Is Your Phone</div>
 ${vframes(84,14,'left:690px;top:520px')}
 <div style="position:absolute;left:640px;top:690px;font:800 80px Poppins;color:${C.orange};z-index:7;transform:rotate(45deg)">↓</div>
 <div class="card"><img class="ph" src="people/dsr.png" style="left:-40px;bottom:0;height:500px"></div>
 ${cap('Digraj Sir','Founder','right:36px;top:1240px',21)}
 <div class="cta">LEARN MOBILE EDITING <b>→</b></div>
 <div class="grain"></div>`,
},
// ---------------- DAY 4 · 6 NOV · GROWTH BUNDLE ----------------
'd4-growth-bundle':{
 land:()=>`${base(1024,512)}<style>body{background:#F4EDDF}
  h1{position:absolute;left:48px;top:98px;font-size:50px}
  .sub{position:absolute;left:50px;top:214px;font-size:15px}
  .cta{left:48px;top:420px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px}.cta b{width:34px;height:34px;font-size:18px}
  .pn{position:absolute;top:96px;width:118px;height:330px;border-radius:16px;background:${C.forest};overflow:hidden;box-shadow:0 18px 30px -18px rgba(1,40,22,.6)}
  .pn .vis{position:absolute;left:8px;right:8px;top:8px;height:200px;border-radius:10px;overflow:hidden;background:#0B3A22}
  .pn .lb{position:absolute;left:12px;right:10px;bottom:16px;color:${C.ivory};font:700 15px/1.15 Poppins}
  .pn .lb:before{content:'';display:block;width:22px;height:2px;background:${C.gold2};margin-bottom:9px}
  .dsr{position:absolute;left:800px;top:0;width:224px;height:512px;overflow:hidden;background:linear-gradient(180deg,#E9DCC3,#DCC9A6)}
 </style>
 <img class="logo" src="brand/logo-forest.png" style="left:48px;top:30px;height:38px">
 <h1>Go beyond<br><em>the basics</em></h1>
 <div class="sub">Editing<i>•</i>AI<i>•</i>Content Creation</div>
 ${growthPanels(1).map((v,i)=>`<div class="pn" style="left:${400+i*130}px;top:${[96,72,96][i]}px"><div class="vis">${v[1]}</div><div class="lb">${v[0]}</div></div>`).join('')}
 <div class="dsr"><img class="ph" src="people/dsr.png" style="left:-60px;bottom:0;height:420px"></div>
 <div style="position:absolute;left:800px;top:0;width:2px;height:512px;background:${C.gold2}"></div>
 ${cap('Digraj Sir','Founder','left:812px;top:452px',12.5)}
 <div class="cta">EXPLORE GROWTH BUNDLE <b>→</b></div>
 <div class="grain"></div>`,
 port:()=>`${base(1080,1350)}<style>body{background:#F4EDDF}
  h1{position:absolute;left:72px;top:176px;font-size:112px}
  .sub{position:absolute;left:76px;top:420px;font-size:30px}
  .cta{left:72px;top:1220px;height:80px;padding:0 10px 0 36px;font-size:23px;gap:20px}.cta b{width:60px;height:60px;font-size:30px}
  .pn{position:absolute;left:72px;width:470px;height:196px;border-radius:24px;background:${C.forest};overflow:hidden;box-shadow:0 18px 30px -18px rgba(1,40,22,.6)}
  .pn .vis{position:absolute;left:12px;top:12px;bottom:12px;width:240px;border-radius:16px;overflow:hidden;background:#0B3A22}
  .pn .lb{position:absolute;left:280px;right:16px;top:50%;transform:translateY(-50%);color:${C.ivory};font:700 30px/1.15 Poppins}
  .pn .lb:before{content:'';display:block;width:36px;height:3px;background:${C.gold2};margin-bottom:14px}
  .dsr{position:absolute;left:580px;top:540px;width:500px;height:810px;border-radius:250px 0 0 0;overflow:hidden;background:linear-gradient(180deg,#E9DCC3,#DCC9A6)}
 </style>
 <img class="logo" src="brand/logo-forest.png" style="left:72px;top:72px;height:66px">
 <h1>Go beyond<br><em>the basics</em></h1>
 <div class="sub">Editing<i>•</i>AI<i>•</i>Content Creation</div>
 ${growthPanels(2).map((v,i)=>`<div class="pn" style="top:${560+i*214}px"><div class="vis">${v[1]}</div><div class="lb">${v[0]}</div></div>`).join('')}
 <div class="dsr"><img class="ph" src="people/dsr.png" style="left:-70px;bottom:0;height:720px"></div>
 ${cap('Digraj Sir','Founder','right:36px;top:1240px',21)}
 <img class="ph" src="props/marigold.png" style="right:-60px;top:-50px;height:260px;transform:rotate(-12deg)">
 <div class="cta">EXPLORE GROWTH BUNDLE <b>→</b></div>
 <div class="grain"></div>`,
},
// ---------------- DAY 5 · 7 NOV · 3-MONTH COHORT ----------------
'd5-editing-cohort':{
 land:()=>`${base(1024,512)}<style>body{background:#16140f;color:${C.ivory}}
  h1{position:absolute;left:48px;top:92px;font-size:38px;color:${C.ivory};line-height:1.02}
  h1 em{color:${C.gold2}}
  .sub{position:absolute;left:50px;top:190px;font-size:15px;color:${C.ivory};opacity:.85;letter-spacing:.02em}
  .cta{left:48px;top:420px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px;background:${C.gold2};color:#1A1205}.cta b{width:34px;height:34px;font-size:18px;background:${C.forest};color:${C.mint}}
  .vig{position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,12,9,.92) 0,rgba(14,12,9,.7) 34%,rgba(14,12,9,0) 58%),radial-gradient(60% 60% at 70% 80%,rgba(217,164,65,.14),transparent)}
 </style>
 ${plate('c-d5-workstation.jpg',1024,40,-34)}
 <div class="vig"></div>
 <img class="logo" src="brand/logo-ivory.png" style="left:48px;top:30px;height:38px">
 <h1>Your video editing<br>journey <em>starts here</em></h1>
 <div class="sub">3-Month Video Editing Cohort</div>
 <img class="ph" src="people/dsr.png" style="left:410px;bottom:0;height:380px;filter:drop-shadow(-6px 0 18px rgba(217,164,65,.28)) brightness(.96);z-index:8">
 ${cap('Digraj Singh Rajput','Founder &amp; Lead Mentor','left:440px;top:446px',12.5)}
 <div class="cta">EXPLORE THE COHORT <b>→</b></div>
 <div class="grain" style="mix-blend-mode:screen;opacity:.05"></div>`,
 port:()=>`${base(1080,1350)}<style>body{background:#1b1e1b;color:${C.ivory}}
  h1{position:absolute;left:72px;top:170px;font-size:84px;color:${C.ivory};line-height:1.0}
  h1 em{color:${C.gold2}}
  .sub{position:absolute;left:76px;top:440px;font-size:30px;color:${C.ivory};opacity:.85}
  .cta{left:72px;top:1220px;height:80px;padding:0 10px 0 36px;font-size:23px;gap:20px;background:${C.gold2};color:#1A1205}.cta b{width:60px;height:60px;font-size:30px;background:${C.forest};color:${C.mint}}
  .vig{position:absolute;inset:0;background:linear-gradient(180deg,#1b1e1b 0,#1b1e1b 36%,rgba(27,30,27,0) 50%),linear-gradient(0deg,rgba(14,12,9,.85) 0,rgba(14,12,9,0) 30%)}
 </style>
 ${plate('c-d5-workstation.jpg',2000,-1120,330)}
 <div class="vig"></div>
 <img class="logo" src="brand/logo-ivory.png" style="left:72px;top:72px;height:66px">
 <h1>Your video<br>editing journey<br><em>starts here</em></h1>
 <div class="sub">3-Month Video Editing Cohort</div>
 <img class="ph" src="people/dsr.png" style="left:-40px;bottom:0;height:640px;filter:drop-shadow(8px 0 26px rgba(217,164,65,.3)) brightness(.96);z-index:8">
 ${cap('Digraj Singh Rajput','Founder &amp; Lead Mentor','left:72px;top:1112px',21)}
 <div class="cta" style="left:auto;right:40px;top:1250px;height:72px;font-size:21px">EXPLORE THE COHORT <b style="width:54px;height:54px">→</b></div>
 <div class="grain" style="mix-blend-mode:screen;opacity:.05"></div>`,
},

};


// ---------------- COHORT UPSELL (standalone, 3 Nov brief) ----------------
banners['u1-cohort-upsell']={
 land:()=>`${base(1024,512)}<style>body{background:#F4ECDE}
  h1{position:absolute;left:48px;top:100px;font-size:44px;line-height:1.0}
  .sub{position:absolute;left:50px;top:258px;font-size:15px}
  .cta{left:48px;top:420px;height:48px;padding:0 8px 0 24px;font-size:14px;gap:14px}.cta b{width:34px;height:34px;font-size:18px}
  .side{position:absolute;left:790px;top:36px;width:234px;height:476px;border-radius:30px 0 0 0;background:radial-gradient(110% 60% at 50% 25%,${C.forest2},${C.forest});overflow:hidden;z-index:4}
 </style>
 ${plate('c-u1-desk.jpg',977,-112,-33)}
 <svg style="position:absolute;left:286px;top:268px;z-index:5" width="70" height="56" viewBox="0 0 70 56"><path d="M6 50 C 8 22, 30 10, 60 12" fill="none" stroke="${C.orange}" stroke-width="2.2" stroke-dasharray="5 5" stroke-linecap="round"/><path d="M52 5 L62 12 L52 19" fill="none" stroke="${C.orange}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
 <img class="logo" src="brand/logo-forest.png" style="left:48px;top:30px;height:38px">
 <h1>From basic<br>editing to<br><em>pro skills</em></h1>
 <div class="sub">3-Month Video Editing Cohort</div>
 <div class="side"><img class="ph" src="people/dsr.png" style="left:-14px;bottom:0;height:300px;filter:brightness(.97)"></div>
 <img class="ph" src="people/ujjwal.png" style="left:612px;bottom:0;height:372px;z-index:8;filter:drop-shadow(10px 0 18px rgba(1,40,22,.35))">
 ${cap('Ujjwal Jain','Senior Video Editor &amp; Mentor','left:628px;top:450px',12)}
 ${cap('Digraj Sir','Founder','right:16px;top:150px',11)}
 <div class="cta">EXPLORE THE COHORT <b>→</b></div>
 <div class="grain"></div>`,
};

(async()=>{const br=await chromium.launch(); fs.mkdirSync(__dirname+'/out',{recursive:true});
for(const [id,b] of Object.entries(banners)){ if(only&&!id.startsWith(only))continue;
 for(const [k,w,h] of [['land',1024,512],['port',1080,1350]]){ if(!b[k])continue;
  const f=__dirname+`/.${id}-${k}.html`; fs.writeFileSync(f,`<html><head><meta charset="utf-8">${b[k]()}</head></html>`.replace('</style>','</style></head><body>').replace(/<\/head><\/html>$/,'</body></html>'));
  const p=await br.newPage({viewport:{width:w,height:h},deviceScaleFactor:k=='land'?2:1});
  await p.goto('file://'+f,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
  const name=`${id}-${w}x${h}`;
  await p.screenshot({path:__dirname+`/out/${name}${k=='land'?'@2x':''}.png`});
  if(k=='land'){const p1=await br.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});await p1.goto('file://'+f,{waitUntil:'networkidle'});await p1.evaluate(()=>document.fonts.ready);await p1.waitForTimeout(300);await p1.screenshot({path:__dirname+`/out/${name}.png`});await p1.close();}
  await p.close(); console.log(name);}}
await br.close();})();
