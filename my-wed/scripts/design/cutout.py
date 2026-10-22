"""Cut a realistic AI object out of its plain studio background (for kits drawn in a realistic style,
where colour-to-alpha would also eat white flowers and marble). Uses rembg's isnet-general-use model,
then pulls the edge in by 1px and repaints the edge pixels with the object's own colour, so no grey rim of
the studio background shows on the page. Then crops to the object. Output: WebP with alpha.
Run (in a Python env with rembg installed): python3 scripts/design/cutout.py <in> <out.webp>
"""

import sys

from PIL import Image, ImageFilter
from rembg import new_session, remove


def main(src, out):
    im = Image.open(src).convert("RGB")
    cut = remove(im, session=new_session("isnet-general-use"))
    alpha = cut.split()[-1].filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    # edge colour: the colour of the solid pixels just inside, spread outwards over the rim
    solid = alpha.point(lambda v: 255 if v > 230 else 0)
    inner = Image.composite(im, Image.new("RGB", im.size), solid)
    spread, weight = inner, solid
    for _ in range(4):
        spread = spread.filter(ImageFilter.MaxFilter(3))
        weight = weight.filter(ImageFilter.MaxFilter(3))
    # thin parts (candles, stems) have no solid core nearby: they keep their own colour
    rgb = Image.composite(im, Image.composite(spread, im, weight), solid)
    cut = Image.merge("RGBA", (*rgb.split(), alpha))
    box = cut.split()[-1].point(lambda v: 255 if v > 24 else 0).getbbox()
    cut.crop(box).save(out, quality=88, method=6)
    print(out, cut.crop(box).size)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    main(*sys.argv[1:])
