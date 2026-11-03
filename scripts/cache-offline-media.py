"""Refresh the public listing photos embedded in HTML exports; no user plan data."""
import concurrent.futures, hashlib, json, pathlib, re, urllib.request
root=pathlib.Path(__file__).resolve().parent.parent
urls=set()
for file in (root/'app').glob('*.json'):
 def walk(obj,key=''):
  if isinstance(obj,dict):
   for k,v in obj.items(): walk(v,k)
  elif isinstance(obj,list):
   for v in obj: walk(v,key)
  elif isinstance(obj,str) and obj.startswith('https://') and (key in ('photo','photos') or (file.name=='bangkok-photos.json' and key=='url')): urls.add(obj)
 walk(json.loads(file.read_text()))
urls.update(re.findall(r"https://cf\.bstatic\.com/[^']+",(root/'app/data.ts').read_text()))
folder=root/'offline/media';folder.mkdir(exist_ok=True)
def cache(url):
 name=hashlib.sha256(url.encode()).hexdigest()[:20]
 existing=list(folder.glob(name+'.*'))
 if existing:return url,existing[0].name,None
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=25) as response:
   kind=response.headers.get_content_type();data=response.read(6*1024*1024)
  if not kind.startswith('image/') or not data:raise ValueError('Not an image')
  suffix={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/svg+xml':'.svg'}.get(kind)
  if not suffix:raise ValueError('Unsupported image')
  (folder/(name+suffix)).write_bytes(data)
  return url,name+suffix,None
 except Exception as e:return url,None,str(e)
files={};missing=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
 for url,name,error in pool.map(cache,sorted(urls)):
  if name:files[url]=name
  else:missing.append(url);print('Could not cache:',url,error)
(folder/'manifest.json').write_text(json.dumps({'files':files,'missing':missing},ensure_ascii=False,indent=2)+'\n')
print('Cached',len(files),'photos; online only:',len(missing))
