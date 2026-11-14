from PIL import Image,ImageOps
import os
os.makedirs('out/pdfimg',exist_ok=True)
for k,f in {'before1':'people/before-01-cover.jpg','after1':'hq/after-01-cover-2x.png','before2':'people/before-02-jungle-path.jpg','after2':'hq/after-02-jungle-path-2x.png'}.items():
    im=ImageOps.exif_transpose(Image.open(f)).convert('RGB');im.thumbnail((1000,1000));im.save(f'out/pdfimg/{k}.jpg',quality=84)
