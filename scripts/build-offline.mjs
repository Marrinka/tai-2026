import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const root=process.cwd();
const json=value=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
const mime={'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const assets={};
async function embed(url,file){assets[url]=`data:${mime[extname(file)]||'image/jpeg'};base64,${(await readFile(file)).toString('base64')}`}
async function localImages(directory){for(const item of await readdir(directory,{withFileTypes:true})){const file=resolve(directory,item.name);if(item.isDirectory())await localImages(file);else if(mime[extname(file)])await embed('/'+file.slice(resolve(root,'public').length+1),file)}}
await localImages(resolve(root,'public/images'));
const cached=JSON.parse(await readFile(resolve(root,'offline/media/manifest.json'),'utf8'));
for(const [url,file] of Object.entries(cached.files))await embed(url,resolve(root,'offline/media',file));
const output=await build({configFile:false,plugins:[react()],define:{'process.env.NODE_ENV':'"production"'},build:{write:false,lib:{entry:resolve(root,'offline/main.tsx'),name:'ThaiWinterOffline',formats:['iife']},minify:true,rollupOptions:{output:{inlineDynamicImports:true}}}});
const chunk=(Array.isArray(output)?output:[output]).flatMap(result=>result.output).find(item=>item.type==='chunk');
if(!chunk)throw Error('Offline bundle missing');
const css=(await readFile(resolve(root,'app/globals.css'),'utf8')).replace(/@import url\([^;]+;/g,'');
const html=`<!doctype html>
<html lang="ru" data-thai-offline="1"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="no-referrer"><title>Тёплый январь · автономная копия</title><style>${css.replace(/<\/style/gi,'<\\/style')}</style></head>
<body><div id="root"></div><noscript>Для открытия календаря и разделов включите JavaScript в браузере.</noscript>
<script id="thai-offline-state" type="application/json">null</script>
<script id="thai-offline-assets" type="application/json">${json(assets)}</script>
<script>${chunk.code.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
if(Buffer.byteLength(html)>24*1024*1024)throw Error('Offline HTML exceeds the hosting asset limit');
await mkdir(resolve(root,'public'),{recursive:true});
await writeFile(resolve(root,'public/offline-template.html'),html);
console.log(`Offline HTML: ${(Buffer.byteLength(html)/1024/1024).toFixed(1)} MB, ${Object.keys(assets).length} embedded photos; ${cached.missing.length} online-only photos.`);
