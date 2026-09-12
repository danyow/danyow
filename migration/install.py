"""One-time migration from Docusaurus to a pinned Retypeset fork."""
from pathlib import Path
import shutil, json, re, sys
root = Path.cwd()
theme = Path(sys.argv[1]).resolve()
assert (theme / 'LICENSE').exists()
originals = {str(p): p.read_bytes() for d in ['note', 'docs', 'blog', 'ai-engine-watch/reports'] for p in (root/d).rglob('*') if p.is_file()}
shutil.rmtree(root/'src')
for name in ['src/components/Header.astro','src/components/Footer.astro','src/styles/global.css','src/styles/markdown.css','src/types/index.d.ts','src/env.d.ts','uno.config.ts','tsconfig.json']:
    p=root/name; p.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(theme/name,p)
shutil.copy2(theme/'LICENSE',root/'LICENSE-Retypeset')
for name in ['babel.config.js','docusaurus.config.js','sidebars.js','crowdin.yml','yarn.lock']:
    (root/name).unlink(missing_ok=True)
shutil.rmtree(root/'.idea',ignore_errors=True)
for p in (root/'scripts').glob('*'):
    if p.is_file() and p.name != 'build-ai-engine-archive.cjs': p.unlink()
p=root/'uno.config.ts'; t=p.read_text()
for key,value in {'title':"['Georgia', 'Songti SC', 'STSong', 'Noto Serif CJK SC', 'serif']",'navbar':"['Georgia', 'PingFang SC', 'Microsoft YaHei', 'sans-serif']",'time':"['Georgia', 'ui-serif', 'serif']",'serif':"['Georgia', 'Songti SC', 'STSong', 'Noto Serif CJK SC', 'serif']"}.items():
    t=re.sub(key+r': \[.*?\],',key+': '+value+',',t)
p.write_text(t)
p=root/'src/types/index.d.ts'; t=p.read_text(); p.write_text("import type { Language } from '@/i18n/config'\n\n"+t[t.index('export interface ThemeConfig'):])
p=root/'src/components/Footer.astro'; t=p.read_text(); t=re.sub(r"\s*'data-umami-event[^\n]*\n",'\n',t); t=re.sub(r' data-umami-event[^=]*="[^"]*"','',t); p.write_text(t)
exec((root/'migration/site.py').read_text(), {'__name__':'__main__'})
exec((root/'migration/content.py').read_text(), {'__name__':'__main__'})
p=root/'package.json'; package=json.loads(p.read_text()); package['devDependencies']['typescript']='5.9.3'; p.write_text(json.dumps(package,ensure_ascii=False,indent=2)+'\n')
(root/'tsconfig.json').write_text(json.dumps({'extends':'astro/tsconfigs/strict','compilerOptions':{'baseUrl':'.','paths':{'@/*':['src/*']},'resolveJsonModule':True},'include':['.astro/types.d.ts','src/**/*','astro.config.ts','uno.config.ts'],'exclude':['node_modules','dist','_migration-upstream','migration']},indent=2)+'\n')
for name,content in originals.items():
    assert Path(name).read_bytes()==content, 'Original content changed: '+name
print('Original Markdown preserved:',len(originals))
