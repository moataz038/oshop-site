#!/usr/bin/env python3
"""Render the KB monogram and welcome artwork used by the local web preview."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import shutil

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "brand"
SCALE = 3
GOLD_TOP = (244, 223, 155)
GOLD_MID = (199, 166, 84)
GOLD_DARK = (142, 109, 47)
DARK_TOP = (37, 35, 27)
DARK_BOTTOM = (18, 18, 15)


def font_path(bold: bool = True) -> str:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).is_file():
            return candidate
    raise RuntimeError("No suitable serif font found for the KB mark")


def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def vertical_gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int], alpha: int = 255) -> Image.Image:
    width, height = size
    image = Image.new("RGBA", size)
    pixels = image.load()
    for y in range(height):
        rgb = lerp(top, bottom, y / max(1, height - 1))
        for x in range(width):
            pixels[x, y] = (*rgb, alpha)
    return image


def render_mark(size: int = 512, white: bool = False) -> Image.Image:
    s = SCALE
    w = h = size * s
    image = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(image)
    pad = 18 * s
    radius = 112 * s
    d.rounded_rectangle((pad, pad, w - pad, h - pad), radius=radius, fill=(18, 18, 15, 255), outline=(199, 166, 84, 255), width=8 * s)
    d.rounded_rectangle((34 * s, 34 * s, w - 34 * s, h - 34 * s), radius=96 * s, outline=(224, 199, 127, 75), width=2 * s)
    # Crown, base, and the three lit points.
    crown = [(174, 151), (169, 114), (212, 142), (256, 92), (300, 142), (343, 114), (338, 151), (362, 186), (150, 186)]
    d.polygon([(x * s, y * s) for x, y in crown], fill=(210, 177, 98, 255))
    d.rectangle((150 * s, 194 * s, 362 * s, 206 * s), fill=(199, 166, 84, 255))
    for x, y in ((169, 111), (256, 91), (343, 111)):
        r = 8 * s
        d.ellipse((x * s-r, y * s-r, x * s+r, y * s+r), fill=(250, 237, 198, 255))
    # Give the initials a restrained engraved shadow and a vertical gold sheen.
    font = ImageFont.truetype(font_path(), 211 * s)
    bbox = d.textbbox((0, 0), "KB", font=font, stroke_width=0)
    text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (w - text_w) // 2 - bbox[0] - 4 * s
    y = 218 * s - bbox[1]
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.text((x + 3*s, y + 5*s), "KB", font=font, fill=255, stroke_width=0)
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shadow.putalpha(mask.filter(ImageFilter.GaussianBlur(5*s)))
    image.alpha_composite(shadow)
    text_mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(text_mask).text((x, y), "KB", font=font, fill=255, stroke_width=0)
    gold = vertical_gradient((w, h), GOLD_TOP, GOLD_DARK)
    image.alpha_composite(Image.composite(gold, Image.new("RGBA", (w, h), (0, 0, 0, 0)), text_mask))
    d = ImageDraw.Draw(image)
    d.line((198*s, 407*s, 314*s, 407*s), fill=(199, 166, 84, 240), width=3*s)
    d.polygon([(256*s, 397*s), (265*s, 407*s), (256*s, 417*s), (247*s, 407*s)], fill=(244, 223, 155, 255))
    if white:
        # Keep the same frame and crown, but switch the monogram to warm ivory.
        d = ImageDraw.Draw(image)
        d.text((x, y), "KB", font=font, fill=(255, 250, 240, 255), stroke_width=0)
    return image.resize((size, size), Image.Resampling.LANCZOS)


def render_hero(mark: Image.Image) -> Image.Image:
    size = (1200, 587)
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((355, 18, 845, 568), fill=(196, 160, 76, 64))
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    canvas = glow
    badge = mark.resize((548, 548), Image.Resampling.LANCZOS)
    # A soft, warm shadow anchors the mark while preserving transparency.
    shadow_alpha = badge.getchannel("A").filter(ImageFilter.GaussianBlur(14))
    shadow = Image.new("RGBA", badge.size, (0, 0, 0, 0))
    shadow.putalpha(shadow_alpha.point(lambda a: round(a * .34)))
    canvas.alpha_composite(shadow, (326, 26))
    canvas.alpha_composite(badge, (326, 10))
    return canvas


def main() -> None:
    BRAND.mkdir(exist_ok=True)
    mark = render_mark()
    mark.save(BRAND / "kb-mark.png", optimize=True)
    render_mark(white=True).save(BRAND / "kb-mark-white.png", optimize=True)
    hero = render_hero(mark)
    hero.save(BRAND / "kb-hero.webp", "WEBP", quality=94, method=6)
    shutil.copy2(BRAND / "kb-mark.png", BRAND / "favicon.png")
    print("Rendered brand/kb-mark.png, kb-mark-white.png, kb-hero.webp, and favicon.png")


if __name__ == "__main__":
    main()
