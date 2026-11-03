"""Find the chroma-green screen in each plate and report its corner quad + mask (used by composite.py)."""
import cv2, numpy as np, json, sys
def find(plate):
    P=cv2.imread(f'plates/{plate}'); hsv=cv2.cvtColor(P,cv2.COLOR_BGR2HSV)
    m=cv2.inRange(hsv,(40,120,90),(85,255,255))
    n,lab,st,_=cv2.connectedComponentsWithStats(m); i=1+np.argmax(st[1:,4]); m=(lab==i).astype(np.uint8)*255
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); c=max(cs,key=cv2.contourArea)
    pts=c[:,0,:].astype(np.float32); s=pts.sum(1); d=pts[:,0]-pts[:,1]
    q=[pts[np.argmin(s)],pts[np.argmax(d)],pts[np.argmax(s)],pts[np.argmin(d)]]  # tl,tr,br,bl
    return [list(map(float,p)) for p in q], m
if __name__=='__main__':
    for p in sys.argv[1:]:
        q,m=find(p); w=np.hypot(*np.subtract(q[1],q[0])); h=np.hypot(*np.subtract(q[3],q[0])); print(p,[[round(a) for a in x] for x in q],'ratio',round(w/h,3),round(w),round(h))
