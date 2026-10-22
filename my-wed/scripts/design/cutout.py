"""Cut a realistic AI object out of its plain studio background (for kits drawn in a realistic style,
where colour-to-alpha would also eat white flowers and marble). Uses rembg's isnet-general-use model,
then crops to the object. Output: WebP with alpha.
Run (in a Python env with rembg installed): python3 scripts/design/cutout.py <in> <out.webp>
"""

import sys

from PIL import Image
from rembg import new_session, remove


def main(src, out):
    im = Image.open(src).convert("RGB")
    cut = remove(im, session=new_session("isnet-general-use"))
    box = cut.split()[-1].point(lambda v: 255 if v > 24 else 0).getbbox()
    cut.crop(box).save(out, quality=88, method=6)
    print(out, cut.crop(box).size)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    main(*sys.argv[1:])
