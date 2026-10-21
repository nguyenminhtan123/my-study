"""Measure the colour mix of screenshots (mockup strip or template shots): the 6 main colours and
their share, plus the checks from docs/design-guide.md (background share, muted main colour,
background that is not flat). Run: python3 scripts/design/palette.py <image> [<image> ...]
"""

import colorsys
import sys

import numpy as np
from PIL import Image


def main(paths):
    # drop the right 15% of each image: floating buttons live there
    pixels = []
    for path in paths:
        im = Image.open(path).convert("RGB")
        w, h = im.size
        im = im.crop((0, 0, int(w * 0.85), h)).resize((200, max(1, int(200 * h / w))))
        pixels.append(np.asarray(im).reshape(-1, 3))
    px = np.concatenate(pixels)
    img = Image.fromarray(px.reshape(-1, 1, 3).astype("uint8"))
    q = img.quantize(6, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:18]
    counts = np.bincount(np.asarray(q).ravel(), minlength=6)
    share = counts / counts.sum()

    rows = []
    for i in np.argsort(-counts):
        r, g, b = pal[i * 3 : i * 3 + 3]
        hue, light, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        rows.append((share[i], f"#{r:02x}{g:02x}{b:02x}", light, sat))
        print(f"  #{r:02x}{g:02x}{b:02x}  {share[i] * 100:5.1f}%  sáng {light:.2f}  bão hoà {sat:.2f}")

    # group the background shades (close to the most common colour) together
    base = np.array(pal[np.argmax(counts) * 3 : np.argmax(counts) * 3 + 3], float)
    near = np.linalg.norm(px - base, axis=1) < 40
    bg = near.mean()
    spread = px[near].std(axis=0).mean()
    accents = [r for r in rows if r[0] >= 0.03 and np.linalg.norm(np.array([int(r[1][i : i + 2], 16) for i in (1, 3, 5)]) - base) >= 40]
    main_sat = accents[0][3] if accents else 0

    print()
    print(f"  Nền (các sắc gần màu chủ đạo): {bg * 100:.0f}%   (mục tiêu 65-90%; nhóm E mảng màu: 30-50%)")
    print(f"  Độ dao động màu nền: {spread:.1f}   (mục tiêu >= 1.5: nền có vân, không phẳng)")
    print(f"  Bão hoà màu chính: {main_sat:.2f}   (mục tiêu <= 0.45: màu trầm như mẫu tham chiếu 0.14-0.30)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1:])
