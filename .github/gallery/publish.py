"""Publish prepare.py's six-file bundle without routing image bytes through an LLM.

Python 3.11+ and Node 22. No upload SDK, image API or additional hosting is used.
Authentication stays in the operator environment, never in a bundle or a receipt.
"""
from __future__ import annotations

import argparse
import base64
import copy
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import struct
import subprocess
import tempfile
import urllib.error
import urllib.request

SOURCE = 'danyow/danyow'
PUBLISHER = 'danyow/danyow.github.io'
COVER = '.github/profile/assets/dusk-cover.webp'
MANIFEST = '.github/profile/assets/manifest.json'
CATALOG = 'gallery/catalog.json'
REFERENCE = '.github/profile/reference/approved-cover.webp'
REFERENCE_HASH = 'f13c86daacba6ac8e5a5d0b7bc4e87d19a09fcadebf1e690298a14cfbbe57502'
FIXED = {COVER, MANIFEST, CATALOG, 'README.md'}
ARCHIVE = re.compile(r'static/gallery/images/(\d{4})/(\d{2})/(\d{4}-\d{2}-\d{2})-([a-f0-9]{12})(-cover)?\.webp')
SRC = re.compile(rb'src="\.github/profile/assets/dusk-cover\.webp(?:\?v=[a-f0-9]{16})?"')
HEX40 = re.compile(r'[a-f0-9]{40}')
HEX64 = re.compile(r'[a-f0-9]{64}')
MAX_FILE = 4_000_000
MAX_RESPONSE = 12_000_000


class PublicationError(RuntimeError):
    """A bounded, non-secret diagnostic that may be returned to the operator."""


def require(condition: bool, code: str) -> None:
    if not condition:
        raise PublicationError(code)


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(b'blob ' + str(len(data)).encode('ascii') + b'\0' + data).hexdigest()


def unique_object(pairs: list) -> dict:
    result = {}
    for key, value in pairs:
        require(key not in result, 'DUPLICATE_JSON_KEY')
        result[key] = value
    return result


def parse_json(data: bytes | str) -> dict:
    try:
        result = json.loads(data, object_pairs_hook=unique_object)
    except (UnicodeError, ValueError) as exc:
        raise PublicationError('INVALID_JSON') from exc
    require(isinstance(result, dict), 'EXPECTED_JSON_OBJECT')
    return result


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise PublicationError('GITHUB_REDIRECT_REFUSED')


class GitHubAPI:
    """Programmatic JSON transport. Only fixed github.com API routes are allowed."""

    def __init__(self, token: str):
        require(bool(token) and not re.search(r'\s', token), 'GITHUB_TOKEN_REQUIRED')
        self._token = token
        self._opener = urllib.request.build_opener(NoRedirect())

    def __call__(self, method: str, route: str, payload: dict | None = None) -> dict:
        require(method in {'GET', 'POST', 'PATCH'}, 'METHOD_NOT_ALLOWED')
        require(route.startswith(('/repos/' + SOURCE + '/', '/repos/' + PUBLISHER + '/'))
                and not re.search(r'[\s#?\\]', route) and '..' not in route.split('/'), 'API_ROUTE_NOT_ALLOWED')
        body = None if payload is None else json.dumps(payload, ensure_ascii=True).encode('utf-8')
        request = urllib.request.Request('https://api.github.com' + route, data=body, method=method,
            headers={'Authorization': 'Bearer ' + self._token, 'Accept': 'application/vnd.github+json',
                     'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28',
                     'User-Agent': 'danyow-gallery-file-publisher'})
        try:
            with self._opener.open(request, timeout=45) as response:
                data = response.read(MAX_RESPONSE + 1)
                require(len(data) <= MAX_RESPONSE, 'API_RESPONSE_TOO_LARGE')
                return parse_json(data)
        except urllib.error.HTTPError as exc:
            # Never log a response body, Authorization header or temporary file URL.
            raise PublicationError('GITHUB_HTTP_' + str(exc.code)) from None
        except (urllib.error.URLError, TimeoutError, OSError):
            raise PublicationError('GITHUB_NETWORK_FAILURE') from None


def decode_blob(value: dict, expected: str) -> bytes:
    require(bool(HEX40.fullmatch(expected)), 'INVALID_BLOB_SHA')
    require(value.get('sha') == expected and value.get('encoding') == 'base64', 'BLOB_METADATA_MISMATCH')
    encoded = value.get('content')
    require(isinstance(encoded, str) and len(encoded) <= MAX_RESPONSE, 'INVALID_BASE64_BODY')
    try:
        # GitHub's JSON blob representation inserts line breaks. Decode bytes, not UTF-8.
        data = base64.b64decode(re.sub(r'[\r\n\t ]', '', encoded), validate=True)
    except (ValueError, UnicodeError):
        raise PublicationError('INVALID_BLOB_BASE64') from None
    require(type(value.get('size')) is int and value['size'] == len(data), 'BLOB_SIZE_MISMATCH')
    require(len(data) <= MAX_FILE and git_blob_sha(data) == expected, 'BLOB_BYTES_MISMATCH')
    return data


def put_verified_blob(api, repo: str, data: bytes) -> str:
    require(isinstance(data, bytes) and 0 < len(data) <= MAX_FILE, 'BLOB_SIZE_OUT_OF_RANGE')
    expected = git_blob_sha(data)
    result = api('POST', f'/repos/{repo}/git/blobs',
                 {'content': base64.b64encode(data).decode('ascii'), 'encoding': 'base64'})
    require(result.get('sha') == expected, 'UPLOAD_SHA_MISMATCH')
    readback = decode_blob(api('GET', f'/repos/{repo}/git/blobs/{expected}'), expected)
    require(readback == data and digest(readback) == digest(data), 'UPLOAD_READBACK_MISMATCH')
    return expected


def branch_head(api, repo: str, branch: str) -> str:
    value = api('GET', f'/repos/{repo}/git/ref/heads/{branch}')
    require(value.get('ref') == 'refs/heads/' + branch and value.get('object', {}).get('type') == 'commit',
            'INVALID_BRANCH_REFERENCE')
    sha = value['object'].get('sha', '')
    require(bool(HEX40.fullmatch(sha)), 'INVALID_BRANCH_SHA')
    return sha


def tree_files(api, repo: str, commit_sha: str) -> tuple[str, dict]:
    require(bool(HEX40.fullmatch(commit_sha)), 'INVALID_COMMIT_SHA')
    commit = api('GET', f'/repos/{repo}/git/commits/{commit_sha}')
    require(commit.get('sha') == commit_sha, 'COMMIT_MISMATCH')
    tree_sha = commit.get('tree', {}).get('sha', '')
    require(bool(HEX40.fullmatch(tree_sha)), 'INVALID_TREE_SHA')
    # Walk only these known directories rather than accepting an arbitrary URL.
    files = {}
    def visit(sha: str, prefix: str) -> None:
        value = api('GET', f'/repos/{repo}/git/trees/{sha}')
        require(value.get('sha') == sha and not value.get('truncated'), 'TREE_INCOMPLETE')
        for item in value.get('tree', []):
            name = item.get('path', '')
            require(isinstance(name, str) and name and '/' not in name and name not in {'.', '..'}, 'UNSAFE_TREE_PATH')
            rel = prefix + name
            if item.get('type') == 'tree':
                # Read the profile/gallery directories and publisher deployment folder only.
                if rel in {'.github', '.github/gallery', '.github/profile', '.github/profile/assets', 'gallery', 'static', 'static/gallery',
                           'static/gallery/images', 'deployment'} or rel.startswith('static/gallery/images/'):
                    visit(item['sha'], rel + '/')
            else:
                files[rel] = item
    visit(tree_sha, '')
    return tree_sha, files


def read_tree_file(api, repo: str, tree: dict, name: str) -> bytes | None:
    item = tree.get(name)
    if item is None:
        return None
    require(item.get('type') == 'blob' and item.get('mode') == '100644', 'NOT_A_REGULAR_FILE')
    return decode_blob(api('GET', f'/repos/{repo}/git/blobs/{item["sha"]}'), item['sha'])


def safe_file(root: Path, rel: str) -> Path:
    require(isinstance(rel, str) and rel and '\\' not in rel and not rel.startswith('/')
            and all(p not in {'', '.', '..'} for p in rel.split('/')), 'UNSAFE_BUNDLE_PATH')
    current = root
    for part in rel.split('/'):
        current = current / part
        require(not current.is_symlink(), 'SYMLINK_NOT_ALLOWED')
    require(current.is_file(), 'BUNDLE_FILE_MISSING')
    return current


def load_bundle(directory: Path) -> tuple[dict[str, bytes], dict[str, str | None]]:
    root = directory.resolve()
    plan = parse_json(safe_file(root, 'upload-plan.json').read_bytes())
    require(set(plan) == {'schema', 'files'} and plan['schema'] == 1
            and isinstance(plan['files'], list) and len(plan['files']) == 6, 'INVALID_UPLOAD_PLAN')
    files, previous = {}, {}
    for item in plan['files']:
        require(isinstance(item, dict) and set(item) == {'path', 'bytes', 'sha256', 'expected_previous_sha256'}, 'INVALID_PLAN_ENTRY')
        rel = item['path']
        require(isinstance(rel, str) and (rel in FIXED or bool(ARCHIVE.fullmatch(rel))) and rel not in files,
                'WRITE_OUTSIDE_GALLERY_CONTRACT')
        require(type(item['bytes']) is int and 0 < item['bytes'] <= MAX_FILE, 'BUNDLE_FILE_TOO_LARGE')
        path = safe_file(root, rel)
        require(path.stat().st_size == item['bytes'], 'BUNDLE_SIZE_MISMATCH')
        data = path.read_bytes()
        require(digest(data) == item['sha256'], 'BUNDLE_HASH_MISMATCH')
        prior = item['expected_previous_sha256']
        require(prior is None or isinstance(prior, str) and bool(HEX64.fullmatch(prior)), 'INVALID_PREVIOUS_HASH')
        files[rel], previous[rel] = data, prior
    require(FIXED <= files.keys() and sum(map(len, files.values())) <= 8_000_000, 'BUNDLE_CONTRACT')
    return files, previous


def validate_transition(before: dict, files: dict) -> None:
    require(set(files) == set(before) and FIXED <= files.keys() and len(files) == 6, 'SIX_FILES_REQUIRED')
    archives = set(files) - FIXED
    require(len(archives) == 2 and all(ARCHIVE.fullmatch(p) for p in archives), 'INVALID_ARCHIVE_PAIR')
    require(all(before[p] is None for p in archives), 'ARCHIVE_OVERWRITE_REFUSED')
    require(all(isinstance(before[p], bytes) for p in FIXED), 'CURRENT_FILE_MISSING')
    old_cat, new_cat = parse_json(before[CATALOG]), parse_json(files[CATALOG])
    require(set(old_cat) == set(new_cat) == {'schema', 'collection', 'entries'}
            and old_cat['schema'] == new_cat['schema'] == 1
            and old_cat['collection'] == new_cat['collection'] == 'danyow-image-archive', 'CATALOG_HEADER_CHANGED')
    require(isinstance(new_cat['entries'], list) and new_cat['entries'][:-1] == old_cat['entries']
            and len(new_cat['entries']) == len(old_cat['entries']) + 1, 'HISTORY_MUST_BE_APPEND_ONLY')
    entry = new_cat['entries'][-1]
    day, original = entry.get('created_on'), entry.get('original', {})
    require(entry.get('category') == 'background' and entry.get('generated') is True
            and isinstance(day, str) and bool(re.fullmatch(r'\d{4}-\d{2}-\d{2}', day))
            and bool(HEX64.fullmatch(original.get('sha256', ''))), 'NOT_A_DAILY_BACKGROUND')
    require(not any(e['original']['sha256'] == original['sha256'] or
                    e['category'] == 'background' and e['created_on'] == day for e in old_cat['entries']),
            'DUPLICATE_DAY_OR_ORIGINAL')
    image = entry.get('image', {})
    expected_image = f'static/gallery/images/{day[:4]}/{day[5:7]}/{day}-{original["sha256"][:12]}.webp'
    expected_cover = expected_image[:-5] + '-cover.webp'
    require(archives == {expected_image, expected_cover} and image.get('path') == expected_image[7:], 'ARCHIVE_PATH_MISMATCH')
    require(files[expected_cover] == files[COVER], 'ARCHIVED_COVER_MISMATCH')
    require(image.get('bytes') == len(files[expected_image]) and image.get('sha256') == digest(files[expected_image]), 'PREVIEW_HASH_MISMATCH')
    for rel in [expected_image, COVER]:
        data = files[rel]
        require(len(data) >= 30 and data[:4] == b'RIFF' and data[8:12] == b'WEBP'
                and struct.unpack('<I', data[4:8])[0] + 8 == len(data), 'INVALID_WEBP_BYTES')
    require(len(files[expected_image]) <= 120000 and len(files[COVER]) <= 70000, 'UNCHANGED_IMAGE_BUDGET_EXCEEDED')
    old_manifest = parse_json(before[MANIFEST])
    require(old_manifest['files']['dusk-cover.webp'] == {'bytes': len(before[COVER]), 'sha256': digest(before[COVER])},
            'OLD_COVER_INTEGRITY')
    wanted = copy.deepcopy(old_manifest)
    wanted['files']['dusk-cover.webp'] = {'bytes': len(files[COVER]), 'sha256': digest(files[COVER])}
    require(parse_json(files[MANIFEST]) == wanted, 'UNRELATED_ASSET_CHANGE')
    require(len(SRC.findall(before['README.md'])) == 1, 'README_REFERENCE_AMBIGUOUS')
    expected_readme = SRC.sub(b'src="' + COVER.encode() + b'?v=' + digest(files[COVER])[:16].encode() + b'"', before['README.md'])
    require(files['README.md'] == expected_readme, 'README_COPY_OR_LAYOUT_CHANGED')


def commit_files(api, repo: str, branch: str, head: str, tree_sha: str, files: dict, message: str) -> dict:
    require(branch_head(api, repo, branch) == head, 'STALE_HEAD_REPREPARE')
    blobs, verified = {}, {}
    for rel, data in sorted(files.items()):
        wanted = git_blob_sha(data)
        # The archived cover and active cover intentionally have identical bytes.
        if wanted not in verified:
            verified[wanted] = put_verified_blob(api, repo, data)
        blobs[rel] = verified[wanted]
    tree = api('POST', f'/repos/{repo}/git/trees', {'base_tree': tree_sha, 'tree': [
        {'path': rel, 'mode': '100644', 'type': 'blob', 'sha': sha} for rel, sha in sorted(blobs.items())]})
    new_tree = tree.get('sha', '')
    require(bool(HEX40.fullmatch(new_tree)), 'TREE_WRITE_FAILED')
    commit = api('POST', f'/repos/{repo}/git/commits', {'message': message, 'tree': new_tree, 'parents': [head]})
    sha = commit.get('sha', '')
    require(bool(HEX40.fullmatch(sha)) and commit.get('tree', {}).get('sha') == new_tree
            and [p.get('sha') for p in commit.get('parents', [])] == [head], 'COMMIT_WRITE_MISMATCH')
    require(branch_head(api, repo, branch) == head, 'STALE_HEAD_REPREPARE')
    try:
        api('PATCH', f'/repos/{repo}/git/refs/heads/{branch}', {'sha': sha, 'force': False})
    except PublicationError:
        # A lost HTTP response does not prove a failed branch update. Never blindly retry PATCH.
        observed = branch_head(api, repo, branch)
        if observed != sha:
            raise PublicationError('REF_UPDATE_UNCONFIRMED_CHECK_COMMIT_' + sha) from None
    observed = branch_head(api, repo, branch)
    if observed != sha:
        status = api('GET', f'/repos/{repo}/compare/{sha}...{observed}').get('status')
        require(status in {'ahead', 'identical'}, 'PUBLISHED_COMMIT_NOT_ON_BRANCH')
    return {'repository': repo, 'commit': sha, 'files': len(files), 'unique_blobs_verified': len(verified),
            'source_committed': True, 'public_verified': False}


def publish_bundle(api, files: dict, previous: dict, expected_head: str) -> dict:
    require(bool(HEX40.fullmatch(expected_head)), 'EXPECTED_HEAD_REQUIRED')
    observed = branch_head(api, SOURCE, 'main')
    tree_sha, tree = tree_files(api, SOURCE, observed)
    before = {p: read_tree_file(api, SOURCE, tree, p) for p in files}
    if all(before[p] == files[p] for p in files):
        return {'repository': SOURCE, 'commit': observed, 'files': 6, 'already_present': True,
                'source_committed': True, 'public_verified': False}
    require(observed == expected_head, 'STALE_HEAD_REPREPARE')
    for rel, data in before.items():
        require((digest(data) if data is not None else None) == previous[rel], 'REMOTE_FILE_CHANGED_REPREPARE')
    validate_transition(before, files)
    entry = parse_json(files[CATALOG])['entries'][-1]
    return commit_files(api, SOURCE, 'main', observed, tree_sha, files,
                        'chore(profile): publish verified cover for ' + entry['created_on'])


def request_deployment(source_api, deploy_api, source_commit: str) -> dict:
    require(bool(HEX40.fullmatch(source_commit)), 'INVALID_SOURCE_COMMIT')
    head = branch_head(deploy_api, PUBLISHER, 'master')
    tree_sha, tree = tree_files(deploy_api, PUBLISHER, head)
    current = read_tree_file(deploy_api, PUBLISHER, tree, 'deployment/source.json')
    require(current is not None, 'DEPLOY_REQUEST_MISSING')
    request = parse_json(current)
    require(set(request) == {'schema', 'repository', 'branch', 'source_sha'}
            and request['schema'] == 1 and request['repository'] == SOURCE and request['branch'] == 'main'
            and bool(HEX40.fullmatch(request['source_sha'])), 'DEPLOY_REQUEST_CONTRACT_CHANGED')
    old = request['source_sha']
    status = source_api('GET', f'/repos/{SOURCE}/compare/{old}...{source_commit}').get('status')
    if status in {'behind', 'identical'}:
        return {'request_commit': head, 'source_commit': old, 'request_already_contains_source': True}
    require(status == 'ahead', 'DEPLOY_REQUEST_ANCESTRY_CONFLICT')
    latest = branch_head(source_api, SOURCE, 'main')
    require(source_api('GET', f'/repos/{SOURCE}/compare/{source_commit}...{latest}').get('status') in {'ahead', 'identical'},
            'SOURCE_NO_LONGER_ON_MAIN')
    request['source_sha'] = source_commit
    result = commit_files(deploy_api, PUBLISHER, 'master', head, tree_sha,
                          {'deployment/source.json': (json.dumps(request, indent=2) + '\n').encode()},
                          'Publish verified gallery source ' + source_commit)
    return {'request_commit': result['commit'], 'source_commit': source_commit, 'public_verified': False}


def validate_in_checkout(root: Path, bundle_files: dict, expected_head: str) -> None:
    actual = subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip()
    require(actual == expected_head, 'CHECKOUT_HEAD_MISMATCH')
    dirty = subprocess.check_output(['git', '-C', str(root), 'status', '--porcelain', '--untracked-files=no'], text=True)
    require(not dirty, 'CHECKOUT_MUST_BE_CLEAN')
    with tempfile.TemporaryDirectory(prefix='danyow-gallery-validation-') as temp:
        # A worktree provides exact committed source, not untracked or hand-edited validators.
        stage = Path(temp) / 'checkout'
        subprocess.run(['git', '-C', str(root), 'worktree', 'add', '--detach', str(stage), expected_head], check=True, stdout=subprocess.DEVNULL)
        try:
            for rel, data in bundle_files.items():
                dest = stage / rel
                dest.parent.mkdir(parents=True, exist_ok=True)
                require(not dest.is_symlink(), 'SYMLINK_NOT_ALLOWED')
                dest.write_bytes(data)
            for cmd in [
                ['node', '.github/gallery/check.mjs'], ['node', '.github/profile/check.mjs'],
                ['node', '--test', 'tests/gallery.test.mjs', 'tests/gallery-profile.test.mjs']]:
                subprocess.run(cmd, cwd=stage, check=True, timeout=120, stdout=subprocess.DEVNULL)
        finally:
            subprocess.run(['git', '-C', str(root), 'worktree', 'remove', '--force', str(stage)], check=True, stdout=subprocess.DEVNULL)


def probe(api, reference: Path) -> dict:
    data = reference.read_bytes()
    require(digest(data) == REFERENCE_HASH, 'PROBE_REFERENCE_CHANGED')
    # Valid RIFF JUNK chunk: exercises long arbitrary binary transport without making fake artwork.
    junk = bytes(range(256)) * 768
    large = b'RIFF' + struct.pack('<I', len(data) - 8 + 8 + len(junk)) + data[8:] + b'JUNK' + struct.pack('<I', len(junk)) + junk
    results = []
    for label, content in [('approved-cover', data), ('large-webp-transport-fixture', large)]:
        sha = put_verified_blob(api, SOURCE, content)
        results.append({'label': label, 'bytes': len(content), 'base64_characters': 4*((len(content)+2)//3),
                        'git_blob_sha': sha, 'sha256': digest(content), 'byte_for_byte_readback': True})
    return {'probe': 'passed', 'transport': 'programmatic-GitHub-REST', 'branch_changed': False,
            'generated_new_art': False, 'fixtures': results}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2])
    parser.add_argument('--bundle', type=Path)
    parser.add_argument('--expected-head')
    parser.add_argument('--apply', action='store_true', help='Actually upload and atomically advance main.')
    parser.add_argument('--request-deploy', action='store_true', help='Also advance the existing publisher request.')
    parser.add_argument('--probe', action='store_true', help='Only create and read unreferenced test blobs; no branches change.')
    args = parser.parse_args()
    state = {'source_committed': False, 'deployment_requested': False, 'public_verified': False}
    try:
        if args.probe:
            require(not args.bundle and not args.apply and not args.request_deploy, 'PROBE_OPTIONS_CONFLICT')
            result = probe(GitHubAPI(os.environ.get('GALLERY_GITHUB_TOKEN') or os.environ.get('GITHUB_TOKEN', '')),
                           args.root / REFERENCE)
        else:
            require(args.bundle is not None and bool(HEX40.fullmatch(args.expected_head or '')), 'BUNDLE_AND_EXPECTED_HEAD_REQUIRED')
            require(not args.request_deploy or args.apply, 'DEPLOY_REQUIRES_APPLY')
            files, previous = load_bundle(args.bundle)
            before = {p: (args.root/p).read_bytes() if (args.root/p).is_file() else None for p in files}
            for p in files:
                require((digest(before[p]) if before[p] is not None else None) == previous[p], 'LOCAL_SNAPSHOT_CHANGED')
            validate_transition(before, files)
            validate_in_checkout(args.root, files, args.expected_head)
            result = {'validated': True, 'source_committed': False, 'public_verified': False}
            if args.apply:
                source_api = GitHubAPI(os.environ.get('GALLERY_GITHUB_TOKEN') or os.environ.get('GITHUB_TOKEN', ''))
                # Fail before changing source when publisher authorization was requested but not supplied.
                deploy_api = GitHubAPI(os.environ.get('GALLERY_DEPLOY_TOKEN', '')) if args.request_deploy else None
                result = publish_bundle(source_api, files, previous, args.expected_head)
                state.update(result)
                if deploy_api:
                    result['deployment'] = request_deployment(source_api, deploy_api, result['commit'])
                    result['deployment_requested'] = True
        print(json.dumps(result, ensure_ascii=False))
    except (PublicationError, subprocess.SubprocessError, OSError, KeyError, TypeError, ValueError) as exc:
        code = str(exc) if isinstance(exc, PublicationError) else type(exc).__name__
        print(json.dumps({'error': code, **state}, ensure_ascii=False))
        raise SystemExit(1) from None


if __name__ == '__main__':
    main()
