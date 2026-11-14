# Stand-in "after" for layout previews only (a quick warm/teal grade). The real afters come from ChatGPT (after/).
import sys,glob,os,numpy as np
from PIL import Image
for f in sorted(glob.glob('people/before-*.jpg')):
    im=Image.open(f).convert('RGB'); im.thumbnail((2000,2600))
    a=np.asarray(im).astype(np.float32)/255
    l=(a@np.array([.299,.587,.114]))[...,None]
    a=np.clip((a-.5)*1.12+.5+.02,0,1)                       # contrast, slight lift
    sh=np.clip(1-l*1.6,0,1); hi=np.clip((l-.45)*1.8,0,1)
    a=a+sh*np.array([-.04,.02,.035])+hi*np.array([.10,.045,-.06])   # teal shadows, amber highlights
    a=a*np.array([1.06,1.0,.9])                               # overall warmth
    g=a@np.array([.299,.587,.114]); a=g[...,None]+(a-g[...,None])*1.12
    out=os.path.join('standin',os.path.basename(f).replace('before','after').replace('.jpg','.jpg'))
    Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8)).save(out,quality=92); print(out)
