"""Prepare an atomic Git update bundle from a genuinely generated PNG.
This script transforms existing image bytes; it is NOT an image generator.
Requires Pillow. It never edits the source checkout or deletes historical art.
"""
from __future__ import annotations
import argparse
import datetime as dt
import hashlib
import io
import json
from pathlib import Path
import re
from zoneinfo import ZoneInfo
from PIL import Image, ImageDraw, ImageOps

COVER = '.github/profile/assets/dusk-cover.webp'
MANIFEST = '.github/profile/assets/manifest.json'
REFERENCE = '.github/profile/reference/approved-cover.webp'
REFERENCE_HASH = 'f13c86daacba6ac8e5a5d0b7bc4e87d19a09fcadebf1e690298a14cfbbe57502'
SRC = re.compile(r'src="\.github/profile/assets/dusk-cover\.webp(?:\?v=[a-f0-9]{16})?"')

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def encode(image: Image.Image, budget: int) -> bytes:
    for quality in (86, 78, 68, 56, 44, 32):
        stream = io.BytesIO()
        image.save(stream, 'WEBP', quality=quality, method=6)
        data = stream.getvalue()
        if len(data) <= budget:
            return data
    raise ValueError('IMAGE_EXCEEDS_BUDGET: keep the existing cover')

def compose(scene: Image.Image, reference: Image.Image) -> Image.Image:
    if reference.size != (1120, 418):
        raise ValueError('REFERENCE_SIZE_CHANGED')
    # Preserve the same composition and exact circular avatar reference.
    canvas = ImageOps.fit(scene.convert('RGB'), (1120, 418), method=Image.Resampling.LANCZOS, centering=(0.5, 0.10))
    fade = Image.new('L', canvas.size)
    pixels = [round(255 * min(1.0, max(0.0, (y-235)/175))**1.6) for y in range(418)]
    fade.putdata([a for a in pixels for _ in range(1120)])
    canvas.paste(Image.new('RGB', canvas.size, '#0d1117'), (0, 0), fade)
    avatar = reference.crop((476, 216, 644, 384)).convert('RGB')
    mask = Image.new('L', (168, 168))
    ImageDraw.Draw(mask).ellipse((0, 0, 167, 167), fill=255)
    canvas.paste(avatar, (476, 216), mask)
    return canvas

def prepare(root: Path, image_path: Path, day: str, title: str, caption: str) -> dict[str, bytes]:
    date = dt.date.fromisoformat(day)
    if date.isoformat() != day or date > dt.datetime.now(ZoneInfo('Asia/Shanghai')).date():
        raise ValueError('INVALID_GENERATION_DATE')
    for text in (title, caption):
        if not text.strip() or len(text) > 160 or re.search(r'[<>\x00-\x1f]', text):
            raise ValueError('INVALID_PUBLIC_TEXT')
    original = image_path.read_bytes()
    if len(original) > 50_000_000:
        raise ValueError('INPUT_TOO_LARGE')
    with Image.open(io.BytesIO(original)) as opened:
        if opened.format != 'PNG' or min(opened.size) < 480 or max(opened.size) > 10000 or getattr(opened, 'n_frames', 1) != 1:
            raise ValueError('EXPECTED_GENERATED_STATIC_PNG')
        original_size = opened.size
        scene = ImageOps.exif_transpose(opened).convert('RGB')
    cat = json.loads((root/'gallery/catalog.json').read_text())
    if any(e['created_on'] == day and e['category'] == 'background' for e in cat['entries']):
        raise ValueError('DAY_ALREADY_ARCHIVED: resume publication instead of generating again')
    if any(e['original']['sha256'] == digest(original) for e in cat['entries']):
        raise ValueError('DUPLICATE_ORIGINAL')
    reference_bytes = (root/REFERENCE).read_bytes()
    if digest(reference_bytes) != REFERENCE_HASH:
        raise ValueError('APPROVED_REFERENCE_CHANGED')
    reference = Image.open(io.BytesIO(reference_bytes)).convert('RGB')
    old_cover = (root/COVER).read_bytes()
    manifest = json.loads((root/MANIFEST).read_text())
    if manifest['files']['dusk-cover.webp'] != {'bytes':len(old_cover), 'sha256':digest(old_cover)}:
        raise ValueError('CURRENT_COVER_INTEGRITY')
    preview = scene.copy()
    preview.thumbnail((1448, 1448), Image.Resampling.LANCZOS)
    preview_data = encode(preview, 120000)
    cover_data = encode(compose(scene, reference), 70000)
    short = digest(original)[:12]
    image_rel = f'gallery/images/{date:%Y/%m}/{day}-{short}.webp'
    cover_rel = f'gallery/images/{date:%Y/%m}/{day}-{short}-cover.webp'
    for rel in (image_rel, cover_rel):
        if (root/'static'/rel).exists():
            raise ValueError('REFUSE_ARCHIVE_OVERWRITE')
    cat['entries'].append({
        'id': f'daily-{day}-{short}', 'title':title.strip(), 'category':'background', 'caption':caption.strip(),
        'created_on':day, 'archived_on':dt.datetime.now(ZoneInfo('Asia/Shanghai')).date().isoformat(), 'generated':True,
        'original':{'sha256':digest(original),'bytes':len(original),'width':original_size[0],'height':original_size[1]},
        'image':{'path':image_rel,'sha256':digest(preview_data),'bytes':len(preview_data),'width':preview.width,'height':preview.height,'format':'image/webp','representation':'optimized-preview'},
        'order':max(e['order'] for e in cat['entries'])+1,
    })
    readme = (root/'README.md').read_text()
    if len(SRC.findall(readme)) != 1:
        raise ValueError('PROFILE_COVER_REFERENCE_CHANGED')
    # Only this one source attribute changes. Every other character is retained.
    next_readme = SRC.sub('src="'+COVER+'?v='+digest(cover_data)[:16]+'"', readme)
    manifest['files']['dusk-cover.webp']={'bytes':len(cover_data),'sha256':digest(cover_data)}
    dump=lambda value: (json.dumps(value, ensure_ascii=False, indent=2)+'\n').encode()
    return {'static/'+image_rel:preview_data, 'static/'+cover_rel:cover_data, COVER:cover_data,
            MANIFEST:dump(manifest), 'gallery/catalog.json':dump(cat), 'README.md':next_readme.encode()}

def main() -> None:
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[2])
    parser.add_argument('--input',type=Path,required=True)
    parser.add_argument('--date',required=True)
    parser.add_argument('--title',required=True)
    parser.add_argument('--caption',required=True)
    parser.add_argument('--out',type=Path,required=True)
    args=parser.parse_args()
    root=args.root.resolve(); out=args.out.resolve()
    if out == root or root in out.parents or out.exists():
        raise ValueError('OUTPUT_MUST_BE_A_NEW_DIRECTORY_OUTSIDE_CHECKOUT')
    files=prepare(root,args.input,args.date,args.title,args.caption)
    out.mkdir(parents=True)
    plan=[]
    for rel,data in files.items():
        dest=out/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
        existing=root/rel
        plan.append({'path':rel,'bytes':len(data),'sha256':digest(data),
                     'expected_previous_sha256':digest(existing.read_bytes()) if existing.exists() else None})
    (out/'upload-plan.json').write_text(json.dumps({'schema':1,'files':plan},indent=2)+'\n')
    print(json.dumps({'prepared':True,'files':len(files),'directory':str(out),'committed':False}))
if __name__ == '__main__':
    main()
