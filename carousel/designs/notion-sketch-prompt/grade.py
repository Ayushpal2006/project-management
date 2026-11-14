# Light editorial grade for the real photos (fallback until the ChatGPT studio photos land in studio/).
# Warmer whites, a touch more contrast, softer saturation, gentle top-to-bottom falloff. usage: python3 -I grade.py <design dir>
import sys, glob, os
from PIL import Image, ImageOps, ImageEnhance
import numpy as np
D = sys.argv[1]; os.makedirs(f"{D}/graded", exist_ok=True)
for f in sorted(glob.glob(f"{D}/people/before-0*.jpg")):
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB"); im.thumbnail((2400, 2400))
    im = ImageEnhance.Contrast(im).enhance(1.08); im = ImageEnhance.Color(im).enhance(0.92)
    a = np.asarray(im).astype(np.float32) / 255
    a = a ** 0.97                                     # lift mids slightly
    a[..., 0] *= 1.035; a[..., 2] *= 0.95             # warm
    h = a.shape[0]; v = np.linspace(1.0, 0.94, h)[:, None, None]; a *= v
    Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).save(f"{D}/graded/{os.path.basename(f)}", quality=94)
    print(os.path.basename(f))
