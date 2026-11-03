const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [n,w,h] of [['laptop',1440,900],['phone',1080,2340],['monitor',1000,1150]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('file://'+__dirname+'/'+n+'.html');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/'+n+'.png'});}
await b.close()})()
