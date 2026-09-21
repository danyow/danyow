"""Build small verified transport packets when a connector has no file input.

This is a fallback to publish.py's direct file transport, not an image encoder.
No resizing or compression is performed. Only existing WebP/JSON/README bytes travel.
"""
from __future__ import annotations
import argparse
import base64
import json
from pathlib import Path
import publish as p

CHUNK_BYTES = 8192


def package(bundle: Path, source_head: str, out: Path) -> dict:
    p.require(bool(p.HEX40.fullmatch(source_head)), 'INVALID_SOURCE_HEAD')
    p.require(not out.exists(), 'OUTPUT_ALREADY_EXISTS')
    files, previous = p.load_bundle(bundle)
    chunks, entries = {}, []
    for rel, data in sorted(files.items()):
        parts = []
        for start in range(0, len(data), CHUNK_BYTES):
            part = data[start:start+CHUNK_BYTES]
            sha = p.git_blob_sha(part)
            chunks[sha] = part
            parts.append({'sha':sha,'bytes':len(part)})
        entries.append({'path':rel,'bytes':len(data),'sha256':p.digest(data),
                        'expected_previous_sha256':previous[rel],'chunks':parts})
    request = {'schema':1,'kind':'danyow-gallery-binary-upload','source_head':source_head,'files':entries}
    encoded = (json.dumps(request, ensure_ascii=False, indent=2)+'\n').encode()
    p.require(len(encoded) <= 64000 and len(chunks) <= 128, 'TRANSPORT_BUDGET_EXCEEDED')
    out.mkdir(parents=True)
    (out/'chunks').mkdir()
    for sha, data in chunks.items():
        (out/'chunks'/(sha+'.base64')).write_text(base64.b64encode(data).decode('ascii'), encoding='ascii')
    (out/'incoming.json').write_bytes(encoded)
    result = {'schema':1,'request_sha256':p.digest(encoded),'source_head':source_head,
              'branch':'gallery-upload/'+p.digest(encoded)[:20],
              'unique_chunks':[{'sha':s,'bytes':len(d),'file':'chunks/'+s+'.base64'} for s,d in chunks.items()],
              'files':len(files),'total_file_bytes':sum(map(len,files.values())),
              'unique_transport_bytes':sum(map(len,chunks.values()))}
    (out/'transport-plan.json').write_text(json.dumps(result,indent=2)+'\n')
    return result


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--bundle',type=Path,required=True)
    parser.add_argument('--source-head',required=True)
    parser.add_argument('--out',type=Path,required=True)
    args=parser.parse_args()
    result=package(args.bundle,args.source_head,args.out)
    print(json.dumps({'packaged':True,'branch':result['branch'],'files':result['files'],
                      'chunks':len(result['unique_chunks']),'uploaded':False}))

if __name__=='__main__':
    main()
