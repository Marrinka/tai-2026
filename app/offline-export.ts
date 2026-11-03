import type {Plan} from './data';

export type OfflineView = {section:string;region:string;month:number;day:string};
export type OfflineSnapshot = {version:1;id:string;createdAt:string;plan:Plan;view:OfflineView};
const stateId = 'thai-offline-state';
let originalTemplate:string|undefined;

// Escape JSON for a script *data* element, including user-authored event notes.
export function safeJSON(value:unknown){
 return JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
}
export function readOfflineSnapshot():OfflineSnapshot|null{
 if(typeof document==='undefined')return null;
 const text=document.getElementById(stateId)?.textContent;
 if(!text)return null;
 try{const value=JSON.parse(text);return value?.version===1&&value.id&&value.plan&&value.view?value:null}catch{return null}
}
export function rememberOfflineTemplate(){
 originalTemplate='<!doctype html>\n'+document.documentElement.outerHTML;
}
export function offlineStorageKey(snapshot:OfflineSnapshot){return 'thai-winter-offline:'+snapshot.id}
export function putSnapshot(template:string,snapshot:OfflineSnapshot){
 const marker=/<script id="thai-offline-state" type="application\/json">[\s\S]*?<\/script>/;
 if(!template.includes('data-thai-offline="1"')||!marker.test(template))throw Error('Не удалось подготовить HTML-копию. Обновите сайт и попробуйте ещё раз.');
 return template.replace(marker,()=>`<script id="${stateId}" type="application/json">${safeJSON(snapshot)}</script>`);
}
export async function downloadOffline(plan:Plan,view:OfflineView){
 const snapshot:OfflineSnapshot={version:1,id:crypto.randomUUID(),createdAt:new Date().toISOString(),plan:structuredClone(plan),view:{...view}};
 let template=originalTemplate;
 if(!template){
  const response=await fetch('/offline-template.html',{cache:'no-cache'});
  if(!response.ok)throw Error('Не удалось скачать HTML-копию. Проверьте интернет и попробуйте ещё раз.');
  template=await response.text();
 }
 const html=putSnapshot(template,snapshot);
 const link=document.createElement('a'),url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}));
 link.href=url;link.download=`thailand-winter-${snapshot.createdAt.slice(0,10)}-${snapshot.createdAt.slice(11,19).replaceAll(':','')}.html`;
 document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
