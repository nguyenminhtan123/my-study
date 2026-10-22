"""Lay a template's art kit on its page background for the owner to review (step 2 of new-template).
Transparent pieces are composited normally, exactly as the page will show them.
Run: python3 scripts/design/board.py <art dir> <out.jpg> [background image or #hex]
"""

import glob
import os
import sys

from PIL import Image, ImageDraw


def main(art, out, bg="#f6ecd6"):
    files = sorted(f for f in glob.glob(os.path.join(art, "*")) if f.endswith((".webp", ".png")) and "wash" not in f)
    cell, cols = 360, 3
    rows = (len(files) + cols - 1) // cols
    w, h = cell * cols + 20, (cell + 30) * rows + 20
    if bg.startswith("#"):
        board = Image.new("RGB", (w, h), bg)
    else:
        tile = Image.open(bg).convert("RGB")
        board = Image.new("RGB", (w, h))
        for x in range(0, w, tile.width):
            for y in range(0, h, tile.height):
                board.paste(tile, (x, y))
    draw = ImageDraw.Draw(board)
    for i, f in enumerate(files):
        im = Image.open(f).convert("RGBA")
        im.thumbnail((cell - 20, cell - 20))
        x = 10 + (i % cols) * cell + (cell - im.width) // 2
        y = 10 + (i // cols) * (cell + 30)
        board.paste(im, (x, y), im)
        draw.text((10 + (i % cols) * cell + 6, y + cell - 4), os.path.basename(f), fill=(120, 80, 60))
    board.save(out, quality=88)
    print(out, len(files), "pieces")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    main(*sys.argv[1:4])
