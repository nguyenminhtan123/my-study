"""Lighter captions: a hook only while the meadow is empty, then one short label per section at the top edge."""
import json, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont
out, tf = sys.argv[1:3]
t = json.load(open(tf))
W, H = 1080, 1920
BLACK = "/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"
EXTRA = "/usr/share/fonts/opentype/inter/InterDisplay-ExtraBold.otf"
SEMI = "/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf"

def shadowed(rows, y0, gap=22):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d, ds = ImageDraw.Draw(img), ImageDraw.Draw(sh); y = y0; pos = []
    for s, f, col in rows:
        b = d.textbbox((0, 0), s, font=f); x = (W - (b[2] - b[0])) // 2 - b[0]
        pos.append((x, y - b[1], s, f, col)); ds.text((x, y - b[1] + 5), s, font=f, fill=(0, 0, 0, 210)); y += (b[3] - b[1]) + gap
    img = Image.alpha_composite(img, sh.filter(ImageFilter.GaussianBlur(12))); d = ImageDraw.Draw(img)
    for x, yy, s, f, col in pos: d.text((x, yy), s, font=f, fill=col)
    return img

def label(s, y=150, size=40):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); f = ImageFont.truetype(EXTRA, size)
    b = d.textbbox((0, 0), s, font=f); w, h = b[2] - b[0], b[3] - b[1]; x = (W - w) // 2
    d.rounded_rectangle((x - 30, y - 18, x + w + 30, y + h + 22), 30, fill=(255, 255, 255, 228))
    d.text((x - b[0], y - b[1]), s, font=f, fill=(196, 64, 100)); return img

hook = shadowed([("POV: khách mở thiệp cưới", ImageFont.truetype(BLACK, 80), (255, 255, 255)),
                 ("của bạn ngay trong Zalo", ImageFont.truetype(BLACK, 80), (255, 220, 230))], 760)
end = Image.new("RGBA", (W, H), (18, 24, 18, 215))
end = Image.alpha_composite(end, shadowed([("Mở bằng Zalo", ImageFont.truetype(BLACK, 100), (255, 255, 255)),
                                           ("không cần tải app", ImageFont.truetype(BLACK, 100), (255, 214, 226)),
                                           ("", ImageFont.truetype(SEMI, 20), (0, 0, 0)),
                                           ("Mẫu 2 · Nắng đồng hoa", ImageFont.truetype(EXTRA, 56), (255, 255, 255)),
                                           ("Nhắn tin để chọn mẫu nhé", ImageFont.truetype(SEMI, 46), (235, 235, 230))], 720))
caps = [(hook, 0.0, 2.0), (label("Tên hai họ, địa điểm"), t[1], t[2]), (label("Đếm ngược tới ngày cưới"), t[2], t[3]),
        (label("Album ảnh cưới"), t[3], t[4]), (label("Khách xác nhận tham dự"), t[4], t[5]), (end, t[5] + 0.8, t[6] + 2.2)]
inputs, chain, last = [], [], "b0"
for i, (im, a, b) in enumerate(caps):
    p = f"{out}/cap2_{i}.png"; im.save(p); inputs.append(p); n = i + 1
    chain.append(f"[{n}:v]format=rgba,fade=in:st={a:.2f}:d=0.25:alpha=1,fade=out:st={max(a, b - 0.25):.2f}:d=0.25:alpha=1[c{n}]")
    chain.append(f"[{last}][c{n}]overlay=0:0:enable='between(t,{a:.2f},{b:.2f})'[v{n}]"); last = f"v{n}"
json.dump({"inputs": inputs, "filter": ";".join(chain), "out": last, "end": t[6] + 2.2, "blur": t[5] + 0.8}, open(f"{out}/caps2.json", "w"))
