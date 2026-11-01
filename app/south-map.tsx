'use client';
import {useEffect,useRef,useState} from 'react';
import {southNodes,southLegs,SouthLayer} from './south-data';

const colors:Record<SouthLayer,string>={andaman:'#276657',samui:'#8662a8',shared:'#bc7545',outing:'#2c859f'};
const layerLabels:Record<SouthLayer,string>={andaman:'Через Липе',samui:'Через Самуи',shared:'Общая часть',outing:'Дневные выезды'};
function leaflet():Promise<any>{
 if((window as any).L)return Promise.resolve((window as any).L);
 if(!document.getElementById('leaflet-css')){const css=document.createElement('link');css.id='leaflet-css';css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';css.crossOrigin='';document.head.appendChild(css);}
 return new Promise((resolve,reject)=>{let script=document.getElementById('leaflet-js') as HTMLScriptElement|null;const fresh=!script;if(!script){script=document.createElement('script');script.id='leaflet-js';script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.crossOrigin='';}
  const cleanup=()=>{clearTimeout(timer);script?.removeEventListener('load',ready);script?.removeEventListener('error',failed);};
  const ready=()=>{cleanup();(window as any).L?resolve((window as any).L):reject(new Error('Карта недоступна'));};const failed=()=>{cleanup();reject(new Error('Карта недоступна'));};const timer=setTimeout(failed,15000);
  script.addEventListener('load',ready);script.addEventListener('error',failed);if(fresh)document.head.appendChild(script);
 });
}
export default function SouthMap(){
 const element=useRef<HTMLDivElement>(null),map=useRef<any>(null),layers=useRef<Record<string,any>>({}),markers=useRef<Record<string,any>>({});
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading'),[tileError,setTileError]=useState(false),[visible,setVisible]=useState<Record<SouthLayer,boolean>>({andaman:true,samui:true,shared:true,outing:true}),[selected,setSelected]=useState('');
 function fit(){map.current?.fitBounds(southNodes.map(n=>n.point),{padding:[32,32],maxZoom:8});}
 useEffect(()=>{let cancelled=false,resize:ResizeObserver|undefined;
  leaflet().then(L=>{if(cancelled||!element.current)return;const m=L.map(element.current,{scrollWheelZoom:false,zoomSnap:.25,zoomDelta:.5});map.current=m;
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(m).on('tileerror',()=>{if(!cancelled)setTileError(true);});
   Object.keys(colors).forEach(key=>{layers.current[key]=L.layerGroup().addTo(m);});
   southLegs.forEach(leg=>{const from=southNodes.find(n=>n.id===leg.from)!,to=southNodes.find(n=>n.id===leg.to)!;const line=L.polyline([from.point,...(leg.via||[]),to.point],{color:colors[leg.layer],weight:leg.layer==='outing'?3:4,opacity:.85,dashArray:leg.layer==='outing'?'2 7':'8 9',lineCap:'round'}).addTo(layers.current[leg.layer]);
    const popup=document.createElement('div');popup.className='south-popup';const title=document.createElement('strong');title.textContent=`${from.name} → ${to.name}`;popup.appendChild(title);const time=document.createElement('p');time.textContent=`${leg.mode} · ${leg.time}`;popup.appendChild(time);const note=document.createElement('p');note.textContent=leg.note;popup.appendChild(note);const link=document.createElement('a');link.href=leg.source;link.target='_blank';link.rel='noreferrer';link.textContent='Источник / уточнить путь ↗';popup.appendChild(link);line.bindPopup(popup);line.bindTooltip(`${leg.mode} · ${leg.time}`,{sticky:true});
    if(leg.label)L.tooltip({permanent:true,direction:'center',className:'south-map-label',opacity:1}).setLatLng(leg.label).setContent(leg.time).addTo(layers.current[leg.layer]);
   });
   southNodes.forEach(node=>{const symbol=node.kind==='base'?'●':node.kind==='outing'?'◇':'↗';const icon=L.divIcon({className:`south-pin ${node.kind}${node.id==='samui'?' samui':''}`,html:`<span>${symbol}</span>`,iconSize:[26,26],iconAnchor:[13,13]});const marker=L.marker(node.point,{icon,title:node.name,alt:node.name,keyboard:true,riseOnHover:true}).addTo(m);markers.current[node.id]=marker;
    const popup=document.createElement('div');popup.className='south-popup';const title=document.createElement('strong');title.textContent=node.name;popup.appendChild(title);const text=document.createElement('p');text.textContent=node.note;popup.appendChild(text);
    if(node.place){const button=document.createElement('button');button.type='button';button.textContent='Чем заняться и где ночевать ↓';button.addEventListener('click',()=>document.getElementById(`south-place-${node.place}`)?.scrollIntoView({behavior:'smooth',block:'start'}));popup.appendChild(button);}
    const link=document.createElement('a');link.href=`https://www.google.com/maps/search/?api=1&query=${node.point.join(',')}`;link.target='_blank';link.rel='noreferrer';link.textContent='Ориентир в Google Maps ↗';popup.appendChild(link);marker.bindPopup(popup);marker.bindTooltip(node.name,{direction:'top',offset:[0,-12]});marker.on('click',()=>setSelected(node.id));
   });fit();setStatus('ready');resize=new ResizeObserver(()=>m.invalidateSize({pan:false}));resize.observe(element.current);
  }).catch(()=>{if(!cancelled)setStatus('error');});return()=>{cancelled=true;resize?.disconnect();map.current?.remove();map.current=null;layers.current={};markers.current={};};
 },[]);
 useEffect(()=>{if(!map.current)return;Object.entries(layers.current).forEach(([key,layer])=>{if(visible[key as SouthLayer])layer.addTo(map.current);else map.current.removeLayer(layer);});},[visible,status]);
 function focus(id:string){setSelected(id);const node=southNodes.find(n=>n.id===id);if(node&&map.current){map.current.setView(node.point,Math.max(map.current.getZoom(),9));markers.current[id]?.openPopup();}}
 return <>
  <div className="south-map-controls" role="group" aria-label="Слои маршрутов">{(Object.keys(colors) as SouthLayer[]).map(key=><label key={key} style={{'--route-color':colors[key]} as React.CSSProperties}><input type="checkbox" checked={visible[key]} onChange={e=>setVisible({...visible,[key]:e.target.checked})}/><i/>{layerLabels[key]}</label>)}</div>
  <div className="south-map-frame"><div className="south-map" ref={element} aria-label="Карта юга Таиланда: основной маршрут, Самуи и дневные выезды"/>{status!=='ready'&&<div className="bkk-map-message" role={status==='error'?'alert':'status'}>{status==='error'?'Карта не загрузилась. Все переезды, время и ссылки доступны в списке ниже.':'Загружаем карту юга Таиланда…'}</div>}{status==='ready'&&<button className="bkk-map-reset" onClick={fit}>Весь юг Таиланда</button>}{tileError&&status==='ready'&&<p className="bkk-tile-warning">Часть подложки не загрузилась; точки и линии доступны.</p>}</div>
  <div className="south-map-points" role="group" aria-label="Места на карте">{southNodes.map(n=><button key={n.id} className={selected===n.id?'active':''} aria-pressed={selected===n.id} onClick={()=>focus(n.id)} disabled={status!=='ready'}>{n.name}</button>)}</div>
  <p className="south-fine">На карте оба варианта и все обсуждаемые выезды. Нажмите на точку или пунктир: появятся описание, способ передвижения и время. Линии — схема связей, не навигация по дорогам и не точный морской курс. Точки — ориентиры, не выбранные отели. Время экскурсий обозначает всю программу; переезды с пометкой «планировать» — оценки с запасом.</p>
 </>;
}
