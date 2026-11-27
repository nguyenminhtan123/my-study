"""Make TikTok caption overlays (1080x1920 transparent PNGs) and print the ffmpeg filter that lays them on the video.
python captions.py <outdir> <times.json>"""
import json
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

out, times_file = sys.argv[1:3]
t = json.load(open(times_file))
W, H = 1080, 1920
BLACK = "/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"
SEMI = "/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf"
EXTRA = "/usr/share/fonts/opentype/inter/InterDisplay-ExtraBold.otf"


def pill(lines, size, y, font=EXTRA, fg=(40, 28, 30), bg=(255, 255, 255, 236), pad=(46, 26), gap=14, accent=None):
    """White rounded label, centred, TikTok-style; `accent` = index of a line drawn in pink."""
    f = ImageFont.truetype(font, size)
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    boxes = [d.textbbox((0, 0), s, font=f) for s in lines]
    lh = [b[3] - b[1] for b in boxes]
    tw = max(b[2] - b[0] for b in boxes)
    th = sum(lh) + gap * (len(lines) - 1)
    x0 = (W - tw) // 2 - pad[0]
    rect = (x0, y, x0 + tw + 2 * pad[0], y + th + 2 * pad[1])
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((rect[0], rect[1] + 10, rect[2], rect[3] + 10), 34, fill=(0, 0, 0, 90))
    img = Image.alpha_composite(img, sh.filter(ImageFilter.GaussianBlur(16)))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle(rect, 34, fill=bg)
    yy = y + pad[1]
    for i, (s, b) in enumerate(zip(lines, boxes)):
        w = b[2] - b[0]
        d.text(((W - w) // 2 - b[0], yy - b[1]), s, font=f, fill=(214, 74, 110) if i == accent else fg)
        yy += lh[i] + gap
    return img


def hook():
    """Big two-line hook in white with a soft dark shadow, over the opening."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    f = ImageFont.truetype(BLACK, 86)
    f2 = ImageFont.truetype(BLACK, 92)
    lines = [("Khách mở thiệp cưới", f, (255, 255, 255)), ("của bạn sẽ thấy", f, (255, 255, 255)), ("thế này 👇".replace("👇", "").strip() + "...", f2, (255, 214, 226))]
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ds = ImageDraw.Draw(sh)
    d = ImageDraw.Draw(img)
    y = 300
    pos = []
    for s, ft, col in lines:
        b = d.textbbox((0, 0), s, font=ft)
        x = (W - (b[2] - b[0])) // 2 - b[0]
        pos.append((x, y - b[1], s, ft, col))
        ds.text((x, y - b[1] + 6), s, font=ft, fill=(0, 0, 0, 200))
        y += (b[3] - b[1]) + 26
    img = Image.alpha_composite(img, sh.filter(ImageFilter.GaussianBlur(14)))
    d = ImageDraw.Draw(img)
    for x, yy, s, ft, col in pos:
        d.text((x, yy), s, font=ft, fill=col, stroke_width=2, stroke_fill=(0, 0, 0, 120))
    return img


def endcard():
    img = Image.new("RGBA", (W, H), (18, 24, 18, 222))
    d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(BLACK, 94)
    f2 = ImageFont.truetype(EXTRA, 54)
    f3 = ImageFont.truetype(SEMI, 44)
    rows = [("Mở ngay trong Zalo", f1, (255, 255, 255)), ("không cần tải app", f1, (255, 214, 226)), ("", f2, None),
            ("Mẫu 2 · Nắng đồng hoa", f2, (255, 255, 255)), ("Nhắn tin để chọn mẫu cho đám cưới của bạn", f3, (235, 235, 230))]
    y = 720
    for s, ft, col in rows:
        if not s:
            y += 60
            continue
        b = d.textbbox((0, 0), s, font=ft)
        d.text(((W - (b[2] - b[0])) // 2 - b[0], y - b[1]), s, font=ft, fill=col)
        y += (b[3] - b[1]) + 30
    return img


caps = [
    (hook(), 0.0, 3.4),
    (pill(["Video nền chuyển động", "ảnh cưới bay vào khung kính"], 50, 1500, accent=1), 3.4, t[1]),
    (pill(["Đủ thông tin hai họ", "và tên từng khách mời"], 50, 1520, accent=1), t[1], t[2]),
    (pill(["Lịch & đếm ngược", "tới ngày cưới"], 52, 1520, accent=1), t[2], t[3]),
    (pill(["Album ảnh cưới", "của hai bạn"], 52, 1530, accent=1), t[3], t[4]),
    (pill(["Khách xác nhận tham dự", "ngay trong thiệp"], 50, 1500, accent=1), t[4], t[5]),
    (endcard(), t[5] + 1.0, t[6] + 2.5),
]
inputs, chain = [], []
last = "0:v"
for i, (im, a, b) in enumerate(caps):
    p = f"{out}/cap{i}.png"
    im.save(p)
    inputs.append(p)
    n = i + 1
    chain.append(f"[{n}:v]format=rgba,fade=in:st={a:.2f}:d=0.35:alpha=1,fade=out:st={max(a, b - 0.3):.2f}:d=0.3:alpha=1[c{n}]")
    chain.append(f"[{last}][c{n}]overlay=0:0:enable='between(t,{a:.2f},{b:.2f})'[v{n}]")
    last = f"v{n}"
json.dump({"inputs": inputs, "filter": ";".join(chain), "out": last, "end": t[6] + 2.5}, open(f"{out}/caps.json", "w"))
print("ok", len(inputs))
