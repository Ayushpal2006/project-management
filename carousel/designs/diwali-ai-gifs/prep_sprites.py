"""Cut the moving parts out of each ChatGPT grain art so the page can animate them.

For every region in REGIONS: build a mask of the object (pixels that differ from the local background),
save it as a transparent sprite, and inpaint the hole in a "clean plate" copy of the art.
Writes art/clean-0N.png, art/sp-<name>.png and art/sprites.json (boxes in ART pixels, 1024x1536).
Run: python3 -I prep_sprites.py   (needs opencv-contrib-python-headless, numpy, pillow)
"""
import json, os, sys
import cv2, numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ART = {1: "art/art-01-cover-yrm.png", 2: "art/art-02-sheetal.png", 3: "art/art-03-yrm-balcony.png"}
# name: (art, x0, y0, x1, y1, mode, extra)  boxes in art px
REGIONS = {
    "s1-lanL": (1, 0, 580, 185, 960, "swing", {"split": "L"}),
    "s1-lanS": (1, 188, 600, 282, 990, "swing", {"split": "S"}),
    "s1-lanR": (1, 880, 560, 1024, 1000, "swing", {}),
    "s2-garland": (2, 0, 0, 1024, 240, "wave", {"nohair": True}),
    "s3-lan1": (3, 650, 140, 810, 300, "bob", {}),
    "s3-lan2": (3, 270, 210, 360, 320, "bob", {}),
    "s3-lan3": (3, 110, 320, 210, 430, "bob", {}),
    "s3-lan4": (3, 840, 320, 920, 410, "bob", {}),
    "s3-fwL": (3, 40, 20, 310, 260, "bloom", {"keep": True}),
    "s3-fwR": (3, 780, 30, 1000, 230, "bloom", {"keep": True}),
}

def main():
    out = {}
    plates = {k: cv2.imread(os.path.join(HERE, v), cv2.IMREAD_COLOR) for k, v in ART.items()}
    holes = {k: np.zeros(p.shape[:2], np.uint8) for k, p in plates.items()}
    for name, (a, bx0, by0, bx1, by1, mode, ex) in REGIONS.items():
        img = plates[a]; H, W = img.shape[:2]
        # work in a padded box, then keep only the components whose centre sits inside the given box
        x0, y0, x1, y1 = max(0, bx0 - 60), max(0, by0 - 40), min(W, bx1 + 60), min(H, by1 + 40)
        crop = img[y0:y1, x0:x1].astype(np.int16)
        bg = np.median(np.concatenate([crop[:4].reshape(-1, 3), crop[-4:].reshape(-1, 3), crop[:, :4].reshape(-1, 3), crop[:, -4:].reshape(-1, 3)]), 0)
        m = (np.abs(crop - bg).sum(2) > 60).astype(np.uint8)
        if ex.get("nohair"):
            m[crop.sum(2) < 250] = 0
            m[150 - y0:, 205 - x0:530 - x0] = 0  # keep her hair out of the garland sprite
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
        n, lab, st, cen = cv2.connectedComponentsWithStats(m)
        keep = np.zeros_like(m)
        for i in range(1, n):
            cx, cy = cen[i][0] + x0, cen[i][1] + y0
            if st[i, cv2.CC_STAT_AREA] > 150 and bx0 <= cx <= bx1 and by0 <= cy <= by1: keep[lab == i] = 1
        m = cv2.dilate(keep, np.ones((5, 5), np.uint8))
        # the two left cover lanterns touch: split them along the big lantern's outline
        if ex.get("split") == "L": m[:770 - y0, 200 - x0:] = 0; m[770 - y0:, 150 - x0:] = 0
        if ex.get("split") == "S": m[:, :150 - x0] = 0; m[:770 - y0, :200 - x0] = 0
        alpha = cv2.GaussianBlur((m * 255).astype(np.uint8), (5, 5), 0)
        cv2.imwrite(os.path.join(HERE, f"art/sp-{name}.png"), np.dstack([img[y0:y1, x0:x1], alpha]))
        if not ex.get("keep"):
            holes[a][y0:y1, x0:x1] |= cv2.dilate(m, np.ones((9, 9), np.uint8))
        out[name] = {"art": a, "box": [x0, y0, x1 - x0, y1 - y0], "mode": mode}
    rng = np.random.default_rng(3)
    for a, img in plates.items():
        clean = cv2.inpaint(img, holes[a], 9, cv2.INPAINT_TELEA)
        # put grain back into the filled areas so they match the print texture
        noise = rng.normal(0, 9, img.shape[:2])[..., None]
        filled = holes[a][..., None].astype(bool)
        clean = np.where(filled, np.clip(clean + noise, 0, 255), clean).astype(np.uint8)
        cv2.imwrite(os.path.join(HERE, f"art/clean-0{a}.png"), clean)
    json.dump(out, open(os.path.join(HERE, "art/sprites.json"), "w"), indent=1)
    print("ok", list(out))

if __name__ == "__main__":
    main()
