"""Receive a bounded data-only upload request in a trusted GitHub Actions checkout.

All executable code is checked out from main, never from the upload branch.
The request contains Git blob IDs, not code, shell commands, URLs or credentials.
"""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import tempfile
import publish as p
from package_upload import CHUNK_BYTES

REQUEST_PATH = '.github/gallery/incoming.json'


def reconstruct(api, request: dict, directory: Path) -> tuple[dict, dict]:
    p.require(set(request) == {'schema','kind','source_head','files'} and request['schema']==1
              and request['kind']=='danyow-gallery-binary-upload'
              and bool(p.HEX40.fullmatch(request.get('source_head',''))), 'INVALID_UPLOAD_REQUEST')
    entries=request['files']
    p.require(isinstance(entries,list) and len(entries)==6, 'SIX_FILES_REQUIRED')
    cache, plan, names = {}, [], set()
    total = 0
    for item in entries:
        p.require(isinstance(item,dict) and set(item)=={'path','bytes','sha256','expected_previous_sha256','chunks'},
                  'INVALID_TRANSPORT_ENTRY')
        rel=item['path']
        p.require(isinstance(rel,str) and (rel in p.FIXED or p.ARCHIVE.fullmatch(rel)) and rel not in names,
                  'WRITE_OUTSIDE_GALLERY_CONTRACT')
        names.add(rel)
        p.require(type(item['bytes']) is int and 0<item['bytes']<=400000 and
                  isinstance(item['sha256'],str) and p.HEX64.fullmatch(item['sha256']), 'INVALID_TRANSPORT_SIZE')
        total += item['bytes']
        p.require(total<=800000, 'TRANSPORT_BUDGET_EXCEEDED')
        parts=item['chunks']
        p.require(isinstance(parts,list) and 1<=len(parts)<=64, 'INVALID_CHUNK_COUNT')
        output=bytearray()
        for part in parts:
            p.require(isinstance(part,dict) and set(part)=={'sha','bytes'} and
                      isinstance(part['sha'],str) and p.HEX40.fullmatch(part['sha']) and
                      type(part['bytes']) is int and 0<part['bytes']<=CHUNK_BYTES, 'INVALID_CHUNK')
            sha=part['sha']
            if sha not in cache:
                p.require(len(cache)<128, 'TOO_MANY_UNIQUE_CHUNKS')
                cache[sha]=p.decode_blob(api('GET',f'/repos/{p.SOURCE}/git/blobs/{sha}'),sha)
            p.require(len(cache[sha])==part['bytes'], 'CHUNK_SIZE_MISMATCH')
            output.extend(cache[sha])
            p.require(len(output)<=item['bytes'], 'EXTRA_CHUNK_DATA')
        data=bytes(output)
        p.require(len(data)==item['bytes'] and p.digest(data)==item['sha256'], 'REASSEMBLED_FILE_MISMATCH')
        dest=directory/rel
        dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes(data)
        plan.append({k:v for k,v in item.items() if k!='chunks'})
    (directory/'upload-plan.json').write_text(json.dumps({'schema':1,'files':plan},indent=2)+'\n')
    return p.load_bundle(directory)


def receive(api, root: Path, request_sha: str, branch: str) -> dict:
    p.require(p.HEX40.fullmatch(request_sha) and bool(__import__('re').fullmatch(r'gallery-upload/[a-f0-9]{20}',branch)),
              'INVALID_REQUEST_REFERENCE')
    p.require(p.branch_head(api,p.SOURCE,branch)==request_sha, 'UPLOAD_BRANCH_MOVED')
    _, tree=p.tree_files(api,p.SOURCE,request_sha)
    data=p.read_tree_file(api,p.SOURCE,tree,REQUEST_PATH)
    p.require(data is not None and len(data)<=64000, 'UPLOAD_REQUEST_MISSING_OR_OVERSIZED')
    p.require(branch=='gallery-upload/'+p.digest(data)[:20], 'REQUEST_BRANCH_HASH_MISMATCH')
    request=p.parse_json(data)
    commit=api('GET',f'/repos/{p.SOURCE}/git/commits/{request_sha}')
    p.require([a.get('sha') for a in commit.get('parents',[])]==[request.get('source_head')], 'REQUEST_PARENT_MISMATCH')
    with tempfile.TemporaryDirectory(prefix='danyow-verified-upload-') as temp:
        files, previous=reconstruct(api,request,Path(temp))
        current=p.branch_head(api,p.SOURCE,'main')
        # Rerun after a successful/ambiguous update: reconcile without overwriting anything.
        if current!=request['source_head']:
            result=p.publish_bundle(api,files,previous,request['source_head'])
            p.require(result.get('already_present'), 'STALE_HEAD_REPREPARE')
            return result
        p.validate_in_checkout(root,files,current)
        return p.publish_bundle(api,files,previous,current)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--request-sha',required=True)
    parser.add_argument('--branch',required=True)
    parser.add_argument('--receipt',type=Path,required=True)
    args=parser.parse_args()
    result={'source_committed':False,'public_verified':False}
    try:
        p.require(os.environ.get('GITHUB_REPOSITORY')==p.SOURCE and os.environ.get('GITHUB_EVENT_NAME')=='push',
                  'TRUSTED_REPOSITORY_PUSH_REQUIRED')
        root=Path(__file__).resolve().parents[2]
        api=p.GitHubAPI(os.environ.get('GITHUB_TOKEN',''))
        result=receive(api,root,args.request_sha,args.branch)
        result['request_commit']=args.request_sha
        if os.environ.get('GITHUB_OUTPUT'):
            with open(os.environ['GITHUB_OUTPUT'],'a') as output:
                output.write('source_commit='+result['commit']+'\n')
    except (p.PublicationError,OSError,KeyError,TypeError,ValueError) as exc:
        result['error']=str(exc) if isinstance(exc,p.PublicationError) else type(exc).__name__
    args.receipt.parent.mkdir(parents=True,exist_ok=True)
    args.receipt.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
    if 'error' in result:
        raise SystemExit(1)

if __name__=='__main__':
    main()
