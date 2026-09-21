"""Regression coverage for exact bytes, bounded writes and atomic publication.
These tests are local fakes. The separately gated CI probe exercises the real API.
"""
import base64
import copy
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import struct
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('gallery_publish', Path(__file__).with_name('publish.py'))
p = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p)

HEAD = 'a' * 40
NEW = 'b' * 40
TREE = 'c' * 40
CONCURRENT = 'd' * 40
SHA = 'e' * 64


def webp(payload=b'1234567890'):
    chunk = b'VP8 ' + struct.pack('<I', len(payload)) + payload + (b'\0' if len(payload) % 2 else b'')
    return b'RIFF' + struct.pack('<I', 4 + len(chunk)) + b'WEBP' + chunk


def fixture():
    image = 'static/gallery/images/2026/09/2026-09-19-' + SHA[:12] + '.webp'
    cover_path = image[:-5] + '-cover.webp'
    old_cover, new_cover, preview = webp(b'old-cover-xxxxxxxx'), webp(b'new-cover-xxxxxxxx'), webp(b'preview-xxxxxxxxxx')
    old_cat = {'schema':1, 'collection':'danyow-image-archive', 'entries':[
        {'id':'old', 'category':'background', 'created_on':None, 'original':{'sha256':'f'*64}, 'order':0}]}
    new_cat = copy.deepcopy(old_cat)
    new_cat['entries'].append({'category':'background', 'generated':True, 'created_on':'2026-09-19',
        'original':{'sha256':SHA}, 'image':{'path':image[7:], 'bytes':len(preview), 'sha256':p.digest(preview)}})
    manifest = {'schema':1, 'files':{'dusk-cover.webp':{'bytes':len(old_cover),'sha256':p.digest(old_cover)},
                                   'unchanged.svg':{'bytes':4,'sha256':'f'*64}}}
    new_manifest = copy.deepcopy(manifest)
    new_manifest['files']['dusk-cover.webp'] = {'bytes':len(new_cover),'sha256':p.digest(new_cover)}
    readme = ('<p align="center"><img src="' + p.COVER + '" width="100%" alt="原头像"></p>\n姓名和座右铭保持原样\n').encode()
    before = {image:None, cover_path:None, p.COVER:old_cover, p.MANIFEST:json.dumps(manifest).encode(),
              p.CATALOG:json.dumps(old_cat).encode(), 'README.md':readme}
    files = {image:preview, cover_path:new_cover, p.COVER:new_cover, p.MANIFEST:json.dumps(new_manifest).encode(),
             p.CATALOG:json.dumps(new_cat).encode(), 'README.md':p.SRC.sub(
             b'src="'+p.COVER.encode()+b'?v='+p.digest(new_cover)[:16].encode()+b'"', readme)}
    previous = {key:p.digest(data) if data is not None else None for key,data in before.items()}
    return before, files, previous


class FakeAPI:
    def __init__(self, corrupt=False, text_mode=False, move_head=False, lose_response=False, readback_corrupt=False):
        self.head = HEAD
        self.blobs = {}
        self.calls = []
        self.corrupt, self.text_mode, self.move_head = corrupt, text_mode, move_head
        self.lose_response, self.readback_corrupt = lose_response, readback_corrupt

    def __call__(self, method, route, payload=None):
        self.calls.append((method, route, payload))
        if '/git/ref/heads/' in route:
            return {'ref':'refs/heads/main','object':{'type':'commit','sha':self.head}}
        if route.endswith('/git/blobs'):
            assert payload['encoding'] == 'base64'
            data = base64.b64decode(payload['content'], validate=True)
            if self.corrupt:
                data = data[:-1]
            if self.text_mode:
                data = payload['content'].encode()
            sha = p.git_blob_sha(data)
            self.blobs[sha] = data
            return {'sha':sha}
        if '/git/blobs/' in route:
            sha = route.rsplit('/',1)[1]
            data = self.blobs[sha]
            if self.readback_corrupt:
                data = data[:-1] + bytes([data[-1]^1])
            return {'sha':sha,'encoding':'base64','size':len(data),'content':base64.encodebytes(data).decode()}
        if route.endswith('/git/trees'):
            return {'sha':TREE}
        if route.endswith('/git/commits'):
            if self.move_head:
                self.head = CONCURRENT
            return {'sha':NEW,'tree':{'sha':TREE},'parents':[{'sha':HEAD}]}
        if '/git/refs/heads/' in route:
            assert payload['force'] is False
            if self.head != HEAD:
                raise p.PublicationError('GITHUB_HTTP_422')
            self.head = payload['sha']
            if self.lose_response:
                raise p.PublicationError('GITHUB_NETWORK_FAILURE')
            return {'ref':'refs/heads/main','object':{'sha':self.head}}
        raise AssertionError((method,route))


class BlobTests(unittest.TestCase):
    def test_known_git_hash(self):
        self.assertEqual(p.git_blob_sha(b'hello\n'), 'ce013625030ba8dba906f756967f9e9ca394464a')

    def test_all_byte_values_and_long_image_like_payload_roundtrip(self):
        for data in [bytes(range(256)), webp(bytes(range(256))*900), bytes(range(256))*8192]:
            with self.subTest(bytes=len(data)):
                api = FakeAPI()
                self.assertEqual(p.put_verified_blob(api,p.SOURCE,data),p.git_blob_sha(data))
                self.assertEqual(api.blobs[p.git_blob_sha(data)],data)

    def test_base64_is_decoded_once_not_saved_as_text(self):
        with self.assertRaisesRegex(p.PublicationError,'UPLOAD_SHA_MISMATCH'):
            p.put_verified_blob(FakeAPI(text_mode=True),p.SOURCE,bytes(range(256))*600)

    def test_truncated_upload_rejected(self):
        with self.assertRaisesRegex(p.PublicationError,'UPLOAD_SHA_MISMATCH'):
            p.put_verified_blob(FakeAPI(corrupt=True),p.SOURCE,b'\xff\x00'*50000)

    def test_corrupted_readback_rejected(self):
        with self.assertRaisesRegex(p.PublicationError,'BLOB_BYTES_MISMATCH'):
            p.put_verified_blob(FakeAPI(readback_corrupt=True),p.SOURCE,bytes(range(256)))

    def test_readback_rejects_wrong_size_encoding_and_sha(self):
        data = b'\xff\xfe\x80\x00'
        base = {'sha':p.git_blob_sha(data),'encoding':'base64','content':base64.b64encode(data).decode(),'size':len(data)}
        for changes in [{'size':99},{'size':True},{'encoding':'utf-8'},{'sha':HEAD},{'content':'@@@'}]:
            with self.subTest(changes=changes), self.assertRaises(p.PublicationError):
                p.decode_blob({**base,**changes},p.git_blob_sha(data))

    def test_github_multiline_base64_accepted(self):
        data = bytes(range(256))
        result = {'sha':p.git_blob_sha(data),'encoding':'base64','size':len(data),'content':base64.encodebytes(data).decode()}
        self.assertEqual(p.decode_blob(result,p.git_blob_sha(data)),data)

    def test_hash_not_sha256(self):
        self.assertNotEqual(p.git_blob_sha(b'example'),p.digest(b'example'))

    def test_redirects_refused(self):
        with self.assertRaisesRegex(p.PublicationError,'REDIRECT_REFUSED'):
            p.NoRedirect().redirect_request(None,None,302,'',{},'https://example.com')

    def test_only_fixed_github_repos_allowed(self):
        api = p.GitHubAPI('test-not-a-real-token')
        for route in ['/repos/other/repo/git/blobs','/repos/danyow/danyow/../private','https://github.com','/repos/danyow/danyow/git/blobs?x=y']:
            with self.assertRaises(p.PublicationError): api('GET',route)

    def test_program_forms_large_http_json_body(self):
        api = p.GitHubAPI('test-not-a-real-token')
        data = bytes(range(256))*900
        class Response:
            def __enter__(self):return self
            def __exit__(self,*args):pass
            def read(self,n):return b'{"sha":"'+p.git_blob_sha(data).encode()+b'"}'
        class Opener:
            def open(self,request,timeout):
                self.request = request
                return Response()
        api._opener = Opener()
        api('POST','/repos/'+p.SOURCE+'/git/blobs',{'content':base64.b64encode(data).decode(),'encoding':'base64'})
        self.assertEqual(base64.b64decode(json.loads(api._opener.request.data)['content']),data)
        api('GET','/repos/'+p.SOURCE+'/compare/'+HEAD+'...'+NEW)


class ContractTests(unittest.TestCase):
    def test_valid_six_file_transition(self):
        before, files, _ = fixture()
        p.validate_transition(before,files)

    def test_changing_motto_or_avatar_alt_is_refused(self):
        before, files, _ = fixture()
        for extra in [b' new bio',b'\n']:
            bad = {**files,'README.md':files['README.md']+extra}
            with self.assertRaisesRegex(p.PublicationError,'README_COPY'):
                p.validate_transition(before,bad)

    def test_history_deletion_is_refused(self):
        before, files, _ = fixture()
        cat = json.loads(files[p.CATALOG]);cat['entries'].pop(0)
        files[p.CATALOG] = json.dumps(cat).encode()
        with self.assertRaisesRegex(p.PublicationError,'APPEND_ONLY'):p.validate_transition(before,files)

    def test_archive_overwrite_refused(self):
        before, files, _ = fixture()
        before[next(p for p in files if p.startswith('static/'))] = b'old'
        with self.assertRaisesRegex(p.PublicationError,'ARCHIVE_OVERWRITE'):p.validate_transition(before,files)

    def test_other_asset_change_refused(self):
        before, files, _ = fixture()
        manifest = json.loads(files[p.MANIFEST]);manifest['files']['unchanged.svg']['bytes'] = 3
        files[p.MANIFEST] = json.dumps(manifest).encode()
        with self.assertRaisesRegex(p.PublicationError,'UNRELATED_ASSET'):p.validate_transition(before,files)

    def test_mismatched_cover_archive_refused(self):
        before, files, _ = fixture()
        files[next(k for k in files if k.startswith('static/') and k.endswith('-cover.webp'))] = b'wrong'
        with self.assertRaisesRegex(p.PublicationError,'ARCHIVED_COVER'):p.validate_transition(before,files)

    def test_tampered_webp_container_refused(self):
        before, files, _ = fixture()
        preview_path = next(k for k in files if k.startswith('static/') and not k.endswith('-cover.webp'))
        files[preview_path] = files[preview_path][:-1]
        with self.assertRaises(p.PublicationError):p.validate_transition(before,files)

    def test_bundle_reads_raw_bytes_and_verifies_all_files(self):
        _, files, previous = fixture()
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp); plan = []
            for rel,data in files.items():
                dst=root/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(data)
                plan.append({'path':rel,'bytes':len(data),'sha256':p.digest(data),'expected_previous_sha256':previous[rel]})
            (root/'upload-plan.json').write_text(json.dumps({'schema':1,'files':plan}))
            self.assertEqual(p.load_bundle(root),(files,previous))
            (root/p.COVER).write_bytes(b'corrupt')
            with self.assertRaisesRegex(p.PublicationError,'BUNDLE_SIZE'):p.load_bundle(root)

    def test_symlink_and_parent_escape_refused(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp);(root/'real').write_bytes(b'x');(root/'link').symlink_to(root/'real')
            for rel in ['link','../outside','/tmp/file','a/../real','a\\real']:
                with self.assertRaises(p.PublicationError):p.safe_file(root,rel)

    def test_duplicate_json_keys_refused(self):
        with self.assertRaisesRegex(p.PublicationError,'DUPLICATE_JSON_KEY'):
            p.parse_json('{"path":1,"path":2}')


class AtomicTests(unittest.TestCase):
    def test_all_blobs_verified_before_single_ref_change(self):
        _, files, _ = fixture();api=FakeAPI()
        result = p.commit_files(api,p.SOURCE,'main',HEAD,TREE,files,'test')
        self.assertEqual(result['unique_blobs_verified'],5)
        self.assertEqual(api.head,NEW)
        self.assertEqual(sum(c[0]=='PATCH' for c in api.calls),1)
        self.assertEqual(api.calls[-2][0],'PATCH')

    def test_invalid_uploaded_bytes_never_reach_tree_or_branch(self):
        _, files, _ = fixture();api=FakeAPI(corrupt=True)
        with self.assertRaises(p.PublicationError):p.commit_files(api,p.SOURCE,'main',HEAD,TREE,files,'test')
        self.assertFalse(any(c[0]=='PATCH' or c[1].endswith('/git/trees') for c in api.calls))

    def test_concurrent_commit_is_not_overwritten(self):
        _, files, _ = fixture();api=FakeAPI(move_head=True)
        with self.assertRaisesRegex(p.PublicationError,'STALE_HEAD'):p.commit_files(api,p.SOURCE,'main',HEAD,TREE,files,'test')
        self.assertEqual(api.head,CONCURRENT)
        self.assertFalse(any(c[0]=='PATCH' for c in api.calls))

    def test_lost_ref_response_is_reconciled_not_retried(self):
        _, files, _ = fixture();api=FakeAPI(lose_response=True)
        result=p.commit_files(api,p.SOURCE,'main',HEAD,TREE,files,'test')
        self.assertEqual(result['commit'],NEW)
        self.assertEqual(sum(c[0]=='PATCH' for c in api.calls),1)

    def test_already_applied_bundle_does_not_recommit(self):
        _, files, previous = fixture();api=FakeAPI()
        with patch.object(p,'tree_files',return_value=(TREE,{})), patch.object(p,'read_tree_file',side_effect=lambda a,r,t,n:files[n]):
            result=p.publish_bundle(api,files,previous,HEAD)
        self.assertTrue(result['already_present'])
        self.assertFalse(any(c[0]!='GET' for c in api.calls))

    def test_remote_file_changed_fails_before_upload(self):
        before, files, previous = fixture();api=FakeAPI();before['README.md']+=b' manual edit'
        with patch.object(p,'tree_files',return_value=(TREE,{})), patch.object(p,'read_tree_file',side_effect=lambda a,r,t,n:before[n]):
            with self.assertRaisesRegex(p.PublicationError,'REMOTE_FILE_CHANGED'):p.publish_bundle(api,files,previous,HEAD)
        self.assertFalse(any(c[0]!='GET' for c in api.calls))


if __name__ == '__main__':
    unittest.main(verbosity=2)
