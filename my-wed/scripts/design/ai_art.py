"""Draw template art with an image model on Cloudflare Workers AI and turn its paper transparent:
white paper becomes fully transparent, watercolour washes half transparent, ink stays opaque, so the art
sits on any page background without a box and without cut-out edges. Output: WebP with alpha.
(Do not rely on `mix-blend-mode: multiply` instead: Zalo's iOS WebView shows the white paper.)

Keep one STYLE line per template and prefix it to every piece, so the whole kit looks painted by one hand.
Credentials come from the environment, never from the repo:
  CF_TOKEN    Workers AI API token
  CF_ACCOUNT  Cloudflare account id

Run: python3 scripts/design/ai_art.py <out.webp> <width> <height> "<style + subject prompt>" [model]
     python3 scripts/design/ai_art.py --alpha <in.jpg> <out.webp>   (existing art on paper -> transparent)
Default model: @cf/black-forest-labs/flux-2-klein-4b (Apache 2.0, outputs usable commercially).
"""

import base64
import io
import json
import os
import subprocess
import sys

import numpy as np
from PIL import Image

MODEL = "@cf/black-forest-labs/flux-2-klein-4b"


def whiten(im):
    """Scale colours so the paper (sampled on the border) becomes white; washes and ink keep their tone."""
    a = np.asarray(im.convert("RGB"), float)
    border = np.concatenate(
        [a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3), a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)]
    )
    out = np.clip(a / np.percentile(border, 60, axis=0) * 255, 0, 255)
    out = np.where(out.mean(-1, keepdims=True) > 246, 255, out)
    return Image.fromarray(out.astype("uint8"))


def to_alpha(im, min_alpha=0.04):
    """Colour-to-alpha against white (after whiten): alpha = how far the darkest channel is from white;
    colours are un-mixed from white so the pixel looks the same composited over white."""
    c = np.asarray(whiten(im), float) / 255
    a = (1 - c).max(-1, keepdims=True)
    a = np.where(a < min_alpha, 0, a)
    rgb = np.where(a > 0, 1 - (1 - c) / np.maximum(a, 1e-6), 1)
    out = np.concatenate([np.clip(rgb, 0, 1), a], -1)
    return Image.fromarray((out * 255).round().astype("uint8"), "RGBA")


def save(im, out):
    im = to_alpha(im)
    im.save(out, quality=86, method=6) if out.endswith(".webp") else im.save(out, optimize=True)


def generate(prompt, width, height, model=MODEL):
    token, account = os.environ["CF_TOKEN"], os.environ["CF_ACCOUNT"]
    url = f"https://api.cloudflare.com/client/v4/accounts/{account}/ai/run/{model}"
    auth = ["-H", f"Authorization: Bearer {token}"]
    if "flux-2" in model:  # FLUX.2 takes multipart form fields
        args = ["-F", f"prompt={prompt}", "-F", f"width={width}", "-F", f"height={height}"]
    else:
        body = {"prompt": prompt, "width": width, "height": height}
        args = ["-H", "Content-Type: application/json", "-d", json.dumps(body)]
    raw = subprocess.run(["curl", "-sS", "-m", "180", *auth, *args, url], capture_output=True, check=True).stdout
    if raw[:3] == b"\xff\xd8\xff" or raw[:4] == b"\x89PNG":
        return Image.open(io.BytesIO(raw))
    data = json.loads(raw)
    image = (data.get("result") or {}).get("image")
    if not image:
        raise SystemExit(f"Workers AI error: {json.dumps(data)[:300]}")
    return Image.open(io.BytesIO(base64.b64decode(image)))


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) == 3 and args[0] == "--alpha":
        save(Image.open(args[1]), args[2])
    elif len(args) >= 4:
        im = generate(args[3], int(args[1]), int(args[2]), args[4] if len(args) > 4 else MODEL)
        save(im, args[0])
        print(args[0], im.size)
    else:
        print(__doc__)
        sys.exit(1)
