import base64
import copy
import json
from pathlib import Path
import tempfile
import unittest
import publish as p
import package_upload as pack
import receive_upload as receive
from test_publish import fixture, HEAD


def make_bundle(root):
    _, files, previous=fixture()
    plan=[]
    for rel,data in files.items():
        dest=root/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
        plan.append({'path':rel,'bytes':len(data),'sha256':p.digest(data),'expected_previous_sha256':previous[rel]})
    (root/'upload-plan.json').write_text(json.dumps({'schema':1,'files':plan}))
    return files,previous


class TransportTests(unittest.TestCase):
    def context(self):
        temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup)
        root=Path(temp.name);bundle=root/'bundle';bundle.mkdir()
        files,previous=make_bundle(bundle)
        packet=root/'packet';result=pack.package(bundle,HEAD,packet)
        request=json.loads((packet/'incoming.json').read_text())
        blobs={part['sha']:base64.b64decode((packet/part['file']).read_bytes(),validate=True) for part in result['unique_chunks']}
        calls=[]
        def api(method,route,payload=None):
            self.assertEqual(method,'GET');calls.append(route)
            sha=route.rsplit('/',1)[-1];data=blobs[sha]
            return {'sha':sha,'encoding':'base64','size':len(data),'content':base64.encodebytes(data).decode()}
        output=root/'receive';output.mkdir()
        return files,previous,request,blobs,api,output,calls

    def test_exact_six_file_roundtrip(self):
        files,previous,request,_,api,out,calls=self.context()
        self.assertEqual(receive.reconstruct(api,request,out),(files,previous))
        self.assertEqual(len(calls),len(set(calls)))

    def test_missing_chunk_is_rejected(self):
        _,_,request,_,api,out,_=self.context();request['files'][0]['chunks']=[]
        with self.assertRaises(p.PublicationError):receive.reconstruct(api,request,out)

    def test_wrong_chunk_size_is_rejected(self):
        _,_,request,_,api,out,_=self.context();request['files'][0]['chunks'][0]['bytes']+=1
        with self.assertRaisesRegex(p.PublicationError,'CHUNK_SIZE'):receive.reconstruct(api,request,out)

    def test_wrong_whole_file_hash_is_rejected(self):
        _,_,request,_,api,out,_=self.context();request['files'][0]['sha256']='0'*64
        with self.assertRaisesRegex(p.PublicationError,'REASSEMBLED'):receive.reconstruct(api,request,out)

    def test_chunk_bytes_corruption_rejected(self):
        _,_,request,blobs,api,out,_=self.context();sha=request['files'][0]['chunks'][0]['sha'];blobs[sha]=blobs[sha][:-1]
        with self.assertRaises(p.PublicationError):receive.reconstruct(api,request,out)

    def test_extra_files_or_workflow_injection_rejected(self):
        _,_,request,_,api,out,_=self.context();request['files'][0]['path']='.github/workflows/evil.yml'
        with self.assertRaisesRegex(p.PublicationError,'OUTSIDE_GALLERY'):receive.reconstruct(api,request,out)

    def test_extra_command_or_url_field_rejected(self):
        _,_,request,_,api,out,_=self.context();request['command']='curl malicious'
        with self.assertRaisesRegex(p.PublicationError,'INVALID_UPLOAD_REQUEST'):receive.reconstruct(api,request,out)

    def test_repeated_or_extra_chunks_rejected(self):
        _,_,request,_,api,out,_=self.context();request['files'][0]['chunks']*=2
        with self.assertRaisesRegex(p.PublicationError,'EXTRA_CHUNK_DATA'):receive.reconstruct(api,request,out)

    def test_request_branch_is_content_addressed(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp);bundle=root/'bundle';bundle.mkdir();make_bundle(bundle)
            result=pack.package(bundle,HEAD,root/'out')
            self.assertEqual(result['branch'],'gallery-upload/'+p.digest((root/'out/incoming.json').read_bytes())[:20])
            self.assertTrue(all(e['bytes']<=8192 for e in result['unique_chunks']))

    def test_no_lossy_reencode_in_transport(self):
        # Simulates both actual-size payload lengths; all original byte values survive.
        for size in [41838,100898,120000]:
            data=(bytes(range(256))*((size+255)//256))[:size]
            parts=[data[i:i+pack.CHUNK_BYTES] for i in range(0,len(data),pack.CHUNK_BYTES)]
            readback=b''.join(base64.b64decode(base64.b64encode(part),validate=True) for part in parts)
            self.assertEqual(data,readback)
            self.assertEqual(p.digest(data),p.digest(readback))

if __name__=='__main__':
    unittest.main(verbosity=2)
