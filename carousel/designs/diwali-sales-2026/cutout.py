# Cut out team headshots (gitignored people/ folder). python3 cutout.py <src-dir>
import sys, os
from rembg import remove, new_session
from PIL import Image
s = new_session("isnet-general-use")
src = sys.argv[1]
for name, f in [("dsr","DSR.png"),("ujjwal","Ujjwal.png"),("sheetal","Sheetal.png"),("yash-verma","Yash V.png")]:
    im = Image.open(os.path.join(src, f)).convert("RGB")
    out = remove(im, session=s, post_process_mask=True)
    out.save(f"people/{name}.png"); print(name, out.size)
