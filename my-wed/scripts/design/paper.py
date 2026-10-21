"""Seamless paper / wall textures for template backgrounds (tiles repeat without seams).
Noise is filtered in Fourier space, so it is periodic by construction; fibres wrap around the edges.
Run: python3 scripts/design/paper.py <out.jpg> <r,g,b> [wash=0.012] [fibres=900] [size=512]
  wash: strength of the soft blotches (0.005 almost flat paper, 0.04 lime-washed wall)
"""

import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def noise(rng, n, scale):
    f = np.fft.fft2(rng.standard_normal((n, n)))
    k = np.sqrt(np.fft.fftfreq(n)[:, None] ** 2 + np.fft.fftfreq(n)[None, :] ** 2)
    out = np.real(np.fft.ifft2(f * np.exp(-((k * scale) ** 2))))
    return out / out.std()


def paper(out, base, wash=0.012, fibres=900, n=512, seed=26):
    rng = np.random.default_rng(seed)
    blot = 0.55 * noise(rng, n, 40) + 0.3 * noise(rng, n, 12) + 0.15 * noise(rng, n, 3)
    img = np.clip(np.array(base, float)[None, None, :] * (1 + wash * blot[..., None]), 0, 255)
    im = Image.fromarray(img.astype(np.uint8)).convert("RGBA")
    light = tuple(min(255, c + 18) for c in base)
    dark = tuple(max(0, int(c * 0.8)) for c in base)
    layer = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for i in range(fibres):
        x, y = rng.uniform(0, n, 2)
        a = rng.uniform(0, np.pi * 2)
        length = rng.uniform(6, 34)
        pts = [
            (x + np.cos(a + 0.4 * np.sin(t)) * t, y + np.sin(a + 0.4 * np.sin(t)) * t)
            for t in np.linspace(0, length, 8)
        ]
        col = (light if i % 3 else dark) + (int(rng.uniform(25, 70)),)
        for dx in (-n, 0, n):
            for dy in (-n, 0, n):
                draw.line([(px + dx, py + dy) for px, py in pts], fill=col, width=1)
    im = Image.alpha_composite(im, layer.filter(ImageFilter.GaussianBlur(0.4))).convert("RGB")
    im.save(out, quality=82)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    rgb = tuple(int(v) for v in sys.argv[2].split(","))
    args = [float(a) for a in sys.argv[3:]]
    paper(
        sys.argv[1],
        rgb,
        wash=args[0] if len(args) > 0 else 0.012,
        fibres=int(args[1]) if len(args) > 1 else 900,
        n=int(args[2]) if len(args) > 2 else 512,
    )
