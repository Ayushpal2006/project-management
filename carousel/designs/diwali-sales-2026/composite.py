"""Warp ui/*.png onto the chroma-green screens of plates/*.jpg -> plates/c-*.jpg. Run `node ui/render-ui.cjs` first."""
import cv2, numpy as np
from screens import find
def warp(plate, ui, out, inset=3, k=0, src=None):
    P=cv2.imread(f'plates/{src or plate}').astype(np.float32); q,m=find(plate,k)
    U=cv2.imread(f'ui/{ui}').astype(np.float32); h,w=U.shape[:2]
    c=np.mean(q,0); q2=[list(np.array(p)+(c-np.array(p))/np.linalg.norm(c-np.array(p))*0) for p in q]
    M=cv2.getPerspectiveTransform(np.float32([[0,0],[w,0],[w,h],[0,h]]),np.float32(q2))
    W=cv2.warpPerspective(U,M,(P.shape[1],P.shape[0]),flags=cv2.INTER_AREA,borderMode=cv2.BORDER_REPLICATE)
    mk=cv2.dilate(m,np.ones((5,5),np.uint8)).astype(np.float32)/255; mk=cv2.GaussianBlur(mk,(3,3),0)[...,None]
    O=P*(1-mk)+W*0.97*mk
    # kill green spill around the screen edge / on nearby surfaces
    hsv=cv2.cvtColor(np.clip(O,0,255).astype(np.uint8),cv2.COLOR_BGR2HSV)
    ring=cv2.dilate(m,np.ones((61,61),np.uint8))>0
    g=(hsv[...,0]>38)&(hsv[...,0]<88)&(hsv[...,1]>70)&ring&(m==0)
    O8=np.clip(O,0,255).astype(np.uint8); gray=cv2.cvtColor(O8,cv2.COLOR_BGR2GRAY)
    O8[g]=np.stack([gray]*3,-1)[g]
    cv2.imwrite(f'plates/{out}',O8,[cv2.IMWRITE_JPEG_QUALITY,95])
warp('d2-laptop.jpg','laptop.png','c-d2-laptop.jpg')
warp('d3-phone.jpg','phone.png','c-d3-phone.jpg')
warp('d5-workstation.jpg','monitor.png','c-d5-workstation.jpg')
warp('u1-desk.jpg','monitor-pro.png','c-u1-desk.jpg',k=0)
warp('u1-desk.jpg','phone-basic.png','c-u1-desk.jpg',k=1,src='c-u1-desk.jpg')
