# Turns each sketch (black ink on white) into forest-green ink on transparent, so it sits on the ivory paper.
# Source per slot: after/after-0N-*.png|jpg (the user's ChatGPT output) wins, else standin/ (layout preview only).
# usage: python3 -I prep.py <design dir>
import sys, glob, os
from PIL import Image, ImageOps
D = sys.argv[1]; os.makedirs(f"{D}/ink", exist_ok=True)
FOREST = (1, 40, 22)
for n in range(1, 8):
    src = (sorted(glob.glob(f"{D}/after/after-0{n}-*")) or sorted(glob.glob(f"{D}/standin/after-0{n}-*")))
    if not src: continue
    im = ImageOps.exif_transpose(Image.open(src[0])).convert("L")
    # whiten the paper: anything lighter than ~88% becomes fully transparent
    a = im.point(lambda v: 0 if v > 225 else min(255, int((225 - v) * 255 / 170)))
    bbox = a.point(lambda v: 255 if v > 40 else 0).getbbox()
    out = Image.new("RGBA", im.size, FOREST + (0,)); out.putalpha(a)
    if bbox: out = out.crop(bbox)
    out.save(f"{D}/ink/ink-0{n}.png"); print(n, os.path.relpath(src[0], D), out.size)
