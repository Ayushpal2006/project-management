"""Warp the UI screens onto the blank device screens in the photo plates -> plates/c0X.jpg"""
import cv2, numpy as np
def warp(plate, ui, quad, out, inset=0, glare=0.10):
    P=cv2.imread(f'plates/{plate}').astype(np.float32)
    U=cv2.imread(f'ui/{ui}').astype(np.float32)
    h,w=U.shape[:2]
    src=np.float32([[0,0],[w,0],[w,h],[0,h]]); dst=np.float32(quad)
    M=cv2.getPerspectiveTransform(src,dst)
    W=cv2.warpPerspective(U,M,(P.shape[1],P.shape[0]),flags=cv2.INTER_AREA)
    m=cv2.warpPerspective(np.ones((h,w),np.float32),M,(P.shape[1],P.shape[0]))
    m=cv2.GaussianBlur(m,(3,3),0)[...,None]
    # keep the plate's natural light falloff on the screen: modulate by plate luminance relative to its mean on the screen
    L=cv2.cvtColor(P.astype(np.uint8),cv2.COLOR_BGR2GRAY).astype(np.float32)
    mean=(L*m[...,0]).sum()/m.sum(); shade=np.clip(L/mean,0.85,1.12)[...,None]
    W=W*(1-glare)+W*shade*glare*1.0 + (P-P*0)*0  # mild
    W=W*(0.94+0.06*shade)
    O=P*(1-m)+W*m
    cv2.imwrite(f'plates/{out}',np.clip(O,0,255).astype(np.uint8),[cv2.IMWRITE_JPEG_QUALITY,95])
warp('d04.jpg','laptop.png',[[1308,562],[1970,494],[2040,1000],[1380,1118]],'c04.jpg')
warp('d05.jpg','phone.png',[[1826,412],[2050,452],[1958,978],[1731,927]],'c05.jpg')
warp('d06.jpg','monitor.png',[[2343,527],[2752,524],[2752,1002],[2352,1006]],'c06.jpg')
import shutil
for n in ('03','07','08'): shutil.copy(f'plates/d{n}.jpg', f'plates/c{n}.jpg')
