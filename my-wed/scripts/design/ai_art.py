"""Draw template art with an image model on Cloudflare Workers AI and turn its paper transparent:
white paper becomes fully transparent, watercolour washes half transparent, ink stays opaque, so the art
sits on any page background without a box and without cut-out edges. Output: WebP with alpha.
(Do not rely on `mix-blend-mode: multiply` instead: Zalo's iOS WebView shows the white paper.)

Keep one STYLE line per template and prefix it to every piece, so the whole kit looks painted by one hand.
Credentials come from the environment, never from the repo:
  CF_TOKEN    Workers AI API token
  CF_ACCOUNT  Cloudflare account id
  TOGETHER_API_KEY  optional fallback (Together AI, free FLUX.1 schnell) used when Cloudflare is out of
                    its daily quota or not configured

Run: python3 scripts/design/ai_art.py [--paper dark] <out.webp> <width> <height> "<style + subject prompt>" [model]
     python3 scripts/design/ai_art.py [--paper dark] --alpha <in.jpg> <out.webp>   (existing art -> transparent)
     python3 scripts/design/ai_art.py --mask <out.png> <width> <height> "<shape, e.g. tall portrait>"
  --paper dark: the art is drawn on a pure black background (lacquer, gold leaf); black becomes transparent.
  --mask: a painted shape for photo masks (alpha only), drips removed and cropped tight; the STYLE of the
          template's medium can be added to the shape text so the edge matches the art.
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


def to_alpha_dark(im, min_alpha=0.04):
    """Colour-to-alpha against black: alpha = brightest channel, colours un-mixed from black."""
    c = np.asarray(im.convert("RGB"), float) / 255
    a = c.max(-1, keepdims=True)
    a = np.where(a < min_alpha, 0, a)
    rgb = np.where(a > 0, c / np.maximum(a, 1e-6), 0)
    out = np.concatenate([np.clip(rgb, 0, 1), a], -1)
    return Image.fromarray((out * 255).round().astype("uint8"), "RGBA")


def to_mask(im):
    """Dark ink on white -> alpha shape; an opening removes drips and specks; cropped tight."""
    from PIL import ImageFilter

    g = np.asarray(im.convert("L"), float)
    a = Image.fromarray(np.clip((255 - g) * 1.4 - 30, 0, 255).astype("uint8"))
    a = a.resize((a.width // 2, a.height // 2), Image.LANCZOS)
    a = a.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(1))
    box = a.point(lambda v: 255 if v > 40 else 0).getbbox()
    a = a.crop((max(0, box[0] - 6), max(0, box[1] - 6), min(a.width, box[2] + 6), min(a.height, box[3] + 6)))
    out = Image.new("LA", a.size, 0)
    out.putalpha(a)
    return out


def save(im, out, paper="light"):
    im = to_alpha_dark(im) if paper == "dark" else to_alpha(im)
    im.save(out, quality=86, method=6) if out.endswith(".webp") else im.save(out, optimize=True)


MASK_PROMPT = (
    "A single loose painted shape in black ink on pure white paper, one large solid dark area filling most "
    "of the picture, irregular brush edges, no drips, the centre completely solid black. No objects, no text. "
)


def cloudflare(prompt, width, height, model=MODEL):
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
        raise RuntimeError(f"Workers AI error: {json.dumps(data)[:300]}")
    return Image.open(io.BytesIO(base64.b64decode(image)))


def together(prompt, width, height):
    """Fallback: Together AI's free FLUX.1 [schnell] endpoint (Apache 2.0). Needs TOGETHER_API_KEY."""
    model = os.environ.get("TOGETHER_MODEL", "black-forest-labs/FLUX.1-schnell-Free")
    body = {
        "model": model,
        "prompt": prompt,
        "width": width // 16 * 16,
        "height": height // 16 * 16,
        "steps": 4,
        "n": 1,
        "response_format": "b64_json",
    }
    raw = subprocess.run(
        [
            "curl", "-sS", "-m", "180", "https://api.together.xyz/v1/images/generations",
            "-H", f"Authorization: Bearer {os.environ['TOGETHER_API_KEY']}",
            "-H", "Content-Type: application/json", "-d", json.dumps(body),
        ],
        capture_output=True,
        check=True,
    ).stdout
    data = json.loads(raw)
    items = data.get("data") or []
    if not items or not items[0].get("b64_json"):
        raise RuntimeError(f"Together AI error: {json.dumps(data)[:300]}")
    return Image.open(io.BytesIO(base64.b64decode(items[0]["b64_json"])))


def generate(prompt, width, height, model=MODEL):
    """Cloudflare first (same model as the existing kits); Together AI when Cloudflare is out of quota
    or not configured and TOGETHER_API_KEY is set."""
    error = None
    if os.environ.get("CF_TOKEN") and os.environ.get("CF_ACCOUNT"):
        try:
            return cloudflare(prompt, width, height, model)
        except RuntimeError as e:
            error = e
    if os.environ.get("TOGETHER_API_KEY"):
        print("Cloudflare unavailable, using Together AI", file=sys.stderr)
        return together(prompt, width, height)
    raise SystemExit(str(error or "Set CF_TOKEN + CF_ACCOUNT or TOGETHER_API_KEY"))


if __name__ == "__main__":
    args = sys.argv[1:]
    paper = "light"
    if args[:2] == ["--paper", "dark"]:
        paper, args = "dark", args[2:]
    if len(args) == 3 and args[0] == "--alpha":
        save(Image.open(args[1]), args[2], paper)
    elif len(args) == 5 and args[0] == "--mask":
        im = generate(MASK_PROMPT + args[4], int(args[2]), int(args[3]))
        to_mask(im).save(args[1], optimize=True)
        print(args[1])
    elif len(args) >= 4:
        im = generate(args[3], int(args[1]), int(args[2]), args[4] if len(args) > 4 else MODEL)
        save(im, args[0], paper)
        print(args[0], im.size)
    else:
        print(__doc__)
        sys.exit(1)
