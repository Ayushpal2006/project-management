# Put the real face from the before photo back onto a ChatGPT after (same framing), graded to match.
# Usage: python3 facefix.py people/before.jpg hq/after-2x.png out.png cx cy rx ry   (head ellipse in after pixels)
import sys,cv2,numpy as np
bf,af,of=sys.argv[1:4];cx,cy,rx,ry=map(int,sys.argv[4:8])
A=cv2.imread(af);B=cv2.imread(bf);H,W=A.shape[:2]
B=cv2.resize(B,(W,H),interpolation=cv2.INTER_AREA)
# align before -> after around the head (ECC affine on a local window)
x0,y0,x1,y1=max(cx-3*rx,0),max(cy-3*ry,0),min(cx+3*rx,W),min(cy+3*ry,H)
ga=cv2.cvtColor(A[y0:y1,x0:x1],cv2.COLOR_BGR2GRAY).astype(np.float32)
gb=cv2.cvtColor(B[y0:y1,x0:x1],cv2.COLOR_BGR2GRAY).astype(np.float32)
M=np.eye(2,3,dtype=np.float32)
try:
    _,M=cv2.findTransformECC(gb,ga,M,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,300,1e-6),None,5)
except cv2.error as e: print('ECC failed',e)
print('affine',M.round(4).tolist())
T=np.array([[1,0,x0],[0,1,y0],[0,0,1]],np.float32);Ti=np.linalg.inv(T)
Mf=(T@np.vstack([M,[0,0,1]])@Ti)[:2]
Bw=cv2.warpAffine(B,Mf,(W,H),flags=cv2.INTER_LINEAR|cv2.WARP_INVERSE_MAP,borderMode=cv2.BORDER_REFLECT)
# colour transfer in LAB from the after's head region
mask=np.zeros((H,W),np.float32);cv2.ellipse(mask,(cx,cy),(rx,ry),0,0,360,1,-1)
la=cv2.cvtColor(A,cv2.COLOR_BGR2LAB).astype(np.float32);lb=cv2.cvtColor(Bw,cv2.COLOR_BGR2LAB).astype(np.float32)
sm=np.zeros((H,W),np.uint8);cv2.ellipse(sm,(cx,cy+int(ry*.25)),(int(rx*.55),int(ry*.5)),0,0,360,1,-1);m=sm>0
for c in range(3):
    ma,sa=la[...,c][m].mean(),la[...,c][m].std();mb,sb=lb[...,c][m].mean(),lb[...,c][m].std()
    k=1.0
    lb[...,c]=(lb[...,c]-mb)*k+ma
Bc=cv2.cvtColor(np.clip(lb,0,255).astype(np.uint8),cv2.COLOR_LAB2BGR)
f=cv2.GaussianBlur(mask,(0,0),max(rx,ry)*0.18)[...,None]
out=(Bc*f+A*(1-f)).astype(np.uint8);cv2.imwrite(of,out);print('wrote',of)
