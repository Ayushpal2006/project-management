const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [n,w,h] of [['laptop',1700,1000],['phone',720,1600],['monitor',1750,1000]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('file://'+__dirname+'/'+n+'.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/'+n+'.png'});}
await b.close()})()
