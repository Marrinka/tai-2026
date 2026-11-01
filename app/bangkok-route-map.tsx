'use client';
import {useEffect,useRef,useState} from 'react';
import {routeStops,routeLegs} from './bangkok-route-data';
import photos from './bangkok-photos.json';

const colors={walk:'#387457',taxi:'#b46d3b',boat:'#287aa0'};
const modeName={walk:'пешком',taxi:'такси',boat:'лодка'};
const pinAnchor=(id:string)=>id==='boat'?[38,16]:id==='benjakitti'?[16,8]:[16,16];
function leaflet():Promise<any>{
 if((window as any).L)return Promise.resolve((window as any).L);
 if(!document.getElementById('leaflet-css')){const style=document.createElement('link');style.id='leaflet-css';style.rel='stylesheet';style.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';style.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';style.crossOrigin='';document.head.appendChild(style);}
 return new Promise((resolve,reject)=>{
  let script=document.getElementById('leaflet-js') as HTMLScriptElement|null;
  const fresh=!script;if(!script){script=document.createElement('script');script.id='leaflet-js';script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.crossOrigin='';}
  const timer=setTimeout(()=>{cleanup();reject(new Error('Карта не загрузилась'));},15000);
  const ready=()=>{cleanup();(window as any).L?resolve((window as any).L):reject(new Error('Карта недоступна'));};
  const failed=()=>{cleanup();reject(new Error('Карта недоступна'));};
  const cleanup=()=>{clearTimeout(timer);script?.removeEventListener('load',ready);script?.removeEventListener('error',failed);};
  script.addEventListener('load',ready);script.addEventListener('error',failed);if(fresh)document.head.appendChild(script);
 });
}
export default function BangkokRouteMap({selected,onSelect}:{selected:string;onSelect:(id:string)=>void}){
 const element=useRef<HTMLDivElement>(null),map=useRef<any>(null),markers=useRef<Record<string,any>>({}),selection=useRef(onSelect);
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading'),[tileError,setTileError]=useState(false);
 selection.current=onSelect;
 function fit(){if(map.current){map.current.closePopup();map.current.fitBounds(routeStops.map(s=>s.point),{padding:[48,55],maxZoom:13});}}
 useEffect(()=>{
  let cancelled=false,resize:ResizeObserver|undefined;
  leaflet().then(L=>{
   if(cancelled||!element.current)return;
   const m=L.map(element.current,{scrollWheelZoom:false,zoomControl:true});map.current=m;
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(m);
   tiles.on('tileerror',()=>{if(!cancelled)setTileError(true);});
   routeLegs.forEach(leg=>{
    L.polyline(leg.path,{color:colors[leg.mode],weight:4,opacity:.9,dashArray:'7 9',lineCap:'round'}).addTo(m).bindPopup(`<strong>${modeName[leg.mode]} · ${leg.time}</strong><p>${leg.note}</p>`);
    L.tooltip({permanent:true,direction:'center',className:`bkk-leg-label ${leg.mode}`,opacity:1,interactive:false}).setLatLng(leg.label).setContent(`${leg.time} <span>· ${modeName[leg.mode]}</span>`).addTo(m);
   });
   routeStops.forEach((stop,i)=>{
    const icon=L.divIcon({className:'bkk-route-pin',html:`<span>${i+1}</span>`,iconSize:[32,32],iconAnchor:pinAnchor(stop.id)});
    const pin=L.marker(stop.point,{icon,title:`${i+1}. ${stop.name}`,alt:`${i+1}. ${stop.name}`,keyboard:true,riseOnHover:true}).addTo(m);
    pin.bindTooltip(`${i+1}. ${stop.name}`,{direction:'top',offset:[0,-17]});
    const popup=document.createElement('div');popup.className='bkk-map-popup';
    const photo=photos[stop.id as keyof typeof photos];const img=document.createElement('img');img.src=photo.url;img.alt=photo.alt;popup.appendChild(img);
    const title=document.createElement('strong');title.textContent=stop.name;popup.appendChild(title);
    const time=document.createElement('p');time.textContent=`${stop.time} · ${stop.duration}`;popup.appendChild(time);
    const link=document.createElement('a');link.href=`#bkk-stop-${stop.id}`;link.textContent='Фото и описание ↓';link.addEventListener('click',event=>{event.preventDefault();document.getElementById(`bkk-stop-${stop.id}`)?.scrollIntoView({behavior:'smooth',block:'start'});});popup.appendChild(link);
    pin.bindPopup(popup);pin.on('click',()=>selection.current(stop.id));markers.current[stop.id]=pin;
   });
   fit();setStatus('ready');
   resize=new ResizeObserver(()=>{m.invalidateSize({pan:false});});resize.observe(element.current);
  }).catch(()=>{if(!cancelled)setStatus('error');});
  return()=>{cancelled=true;resize?.disconnect();map.current?.remove();map.current=null;markers.current={};};
 },[]);
 useEffect(()=>{
  const L=(window as any).L;if(!map.current||!L)return;
  routeStops.forEach((s,i)=>markers.current[s.id]?.setIcon(L.divIcon({className:`bkk-route-pin${s.id===selected?' selected':''}`,html:`<span>${i+1}</span>`,iconSize:[32,32],iconAnchor:pinAnchor(s.id)})));
  if(selected){const stop=routeStops.find(s=>s.id===selected);if(stop){map.current.panTo(stop.point);markers.current[selected]?.openPopup();}}
 },[selected,status]);
 return <div className="bkk-map-frame" id="bangkok-route-map">
  <div className="bkk-route-map" ref={element} aria-label="Карта однодневного маршрута по Бангкоку"/>
  {status==='loading'&&<div className="bkk-map-message" role="status">Загружаем карту Бангкока…</div>}
  {status==='error'&&<div className="bkk-map-message" role="alert">Карта временно недоступна. Маршрут, время переездов и ссылки на карты есть в карточках ниже.</div>}
  {status==='ready'&&<button className="bkk-map-reset" onClick={fit}>Весь маршрут</button>}
  {tileError&&status==='ready'&&<p className="bkk-tile-warning">Часть карты не загрузилась. Точки и маршрут доступны.</p>}
 </div>;
}
