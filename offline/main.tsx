import React from 'react';
import {createRoot} from 'react-dom/client';
import Planner from '../app/planner';
import {places,activities,stays} from '../app/data';
import photos from '../app/bangkok-photos.json';
import {rememberOfflineTemplate,readOfflineSnapshot} from '../app/offline-export';

// Keep the clean document for subsequent exports, before React or maps change it.
rememberOfflineTemplate();
const assets:Record<string,string>=JSON.parse(document.getElementById('thai-offline-assets')!.textContent!);
function embed(value:unknown){
 if(!value||typeof value!=='object')return;
 for(const [key,item] of Object.entries(value)){
  if(typeof item==='string'&&assets[item]) (value as Record<string,unknown>)[key]=assets[item];
  else embed(item);
 }
}
[places,activities,stays,photos].forEach(embed);
createRoot(document.getElementById('root')!).render(readOfflineSnapshot()?<Planner/>:<p>Чтобы сохранить ваш план, откройте сайт и нажмите «Скачать HTML».</p>);
