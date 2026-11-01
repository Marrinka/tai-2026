'use client';
import {useState} from 'react';
import {ArrowUpRight,Check,Clock,MapPin,Plus,Ship,Footprints,Car,Wallet} from 'lucide-react';
import {money,Plan,TripEvent} from './data';
import BangkokRouteMap from './bangkok-route-map';
import {routeStops,routeLegs,dayBudget,formatTHB,routeChecked,directions} from './bangkok-route-data';
import photos from './bangkok-photos.json';

const modeNames={walk:'Пешком',taxi:'Такси',boat:'Лодка'};
const modeIcons={walk:Footprints,taxi:Car,boat:Ship};
const mapLink=(point:number[])=>`https://www.google.com/maps/search/?api=1&query=${point.join(',')}`;
function Source({href,children}:{href:string;children:React.ReactNode}){return <a href={href} className="source" target="_blank" rel="noreferrer">{children}<ArrowUpRight size={13}/></a>}

export default function BangkokDay({plan,disabled,onAdd,onFlights}:{plan:Plan;disabled:boolean;onAdd:(event:TripEvent)=>Promise<boolean>;onFlights:()=>void}){
 const [selected,setSelected]=useState(''),[date,setDate]=useState(''),[adding,setAdding]=useState(false);
 const saved=plan.events.find(e=>e.activityId==='bangkok-city-day'&&e.date===date);
 const validDate=/^\d{4}-\d{2}-\d{2}$/.test(date)&&date>='2026-12-19'&&date<='2027-02-05';
 const otherTransport:[number,number]=[0,1].map(i=>routeLegs.filter(l=>!l.costIncluded).reduce((n,l)=>n+l.cost[i],0)) as [number,number];
 function showOnMap(id:string){setSelected(id);document.getElementById('bangkok-route-map')?.scrollIntoView({behavior:'smooth',block:'center'});}
 async function add(){
  if(disabled||adding||saved||!validDate)return;setAdding(true);
  try{await onAdd({id:crypto.randomUUID(),activityId:'bangkok-city-day',date,time:'07:30',title:'Бангкок за день: BARTELS, два парка, храм и река',category:'Экскурсии',price:2400,done:false,note:routeStops.map((s,i)=>`${i+1}. ${s.time} — ${s.name}`).join('\n')+`\nВремя ориентировочное. Все суммы на двоих. В событии только дворец: 1 000 THB × плановые 2,4 ₽/THB = 2 400 ₽. Полный дневной резерв ${formatTHB(dayBudget)} включает еду, лодки и такси. Они относятся к общим статьям бюджета поездки и повторно не добавляются; уточните их после выбора меню и транспорта. BARTELS — филиал Asok. Asiatique можно пропустить. Отель, аэропорт, перелёт и колесо обозрения отдельно. Две ночи в Бангкоке: до и после прогулки. Проверено ${routeChecked}.`});}finally{setAdding(false);}
 }
 return <div className="bkk-city">
  <div className="page-head"><span className="eyebrow">ОДИН ПОЛНЫЙ ДЕНЬ · ДВЕ НОЧИ</span><h1>Бангкок, остановка за остановкой</h1><p>Завтрак в BARTELS, два парка, храм, тайская еда и вечерние улицы. Ночью прилетаем и спим, весь день гуляем, снова ночуем — утром отправляемся к морю.</p></div>
  <div className="bkk-day-summary"><div><Clock size={19}/><span>07:30–21:30<strong>Насыщенный день</strong></span></div><div><MapPin size={19}/><span>9 остановок<strong>Без возвращения в отель</strong></span></div><div><Wallet size={19}/><span>{formatTHB(dayBudget)}<strong>Плановый резерв на двоих</strong></span></div></div>
  <section className="bkk-map-section" aria-labelledby="bkk-map-title"><div className="section-heading"><div><span className="eyebrow">МАРШРУТ ПО ГОРОДУ</span><h2 id="bkk-map-title">От первого кофе до огней у реки</h2></div><span className="bkk-map-hint">Нажмите на точку — увидите фото и остановку</span></div>
   <div className="bkk-map-legend"><span className="walk"><Footprints size={14}/> Пешком</span><span className="taxi"><Car size={14}/> Такси</span><span className="boat"><Ship size={14}/> Лодка / переправа</span><small>Время рядом с линиями — ориентир</small></div>
   <BangkokRouteMap selected={selected} onSelect={setSelected}/>
   <div className="bkk-stop-index" aria-label="Выбрать остановку на карте">{routeStops.map((s,i)=><button key={s.id} className={selected===s.id?'active':''} onClick={()=>showOnMap(s.id)} aria-pressed={selected===s.id}><b>{i+1}</b>{s.short}</button>)}</div>
   <p className="bkk-map-caption">Пунктир показывает схему движения по основным улицам и реке, а не пошаговую навигацию. Точки парков и районов — ориентиры посещения. Время и цены переездов оценочные; пробки, очереди и расписание лодок могут их изменить. Ссылки на навигацию есть у каждого перехода.</p>
  </section>
  <div className="bkk-day-note"><Clock size={18}/><p>Раннее начало подходит, если удалось поспать после прилёта. Если в номер попадёте только в 02:00–03:00, сдвиньте завтрак и сократите один парк или финальный рынок. Отель и поездки в аэропорт в дневной бюджет не входят.</p></div>
  <div className="section-heading"><div><span className="eyebrow">В ТОМ ЖЕ ПОРЯДКЕ, ЧТО НА КАРТЕ</span><h2>Наш день в деталях</h2></div><span className="muted">Все суммы — за двоих</span></div>
  <ol className="bkk-photo-timeline">{routeStops.map((stop,index)=>{
   const photo=photos[stop.id as keyof typeof photos],leg=routeLegs.find(l=>l.from===stop.id),Icon=leg?modeIcons[leg.mode]:Footprints;
   return <li key={stop.id} id={`bkk-stop-${stop.id}`}>
    <article className={`bkk-photo-card${selected===stop.id?' selected':''}`}>
     <figure><a href={photo.url} target="_blank" rel="noreferrer" aria-label={`Открыть фото: ${stop.name}`}><img src={photo.url} alt={photo.alt} loading="lazy" width="1280" height="853"/></a><span className="bkk-photo-number">{index+1<10?'0':''}{index+1}</span><figcaption><a href={photo.source} target="_blank" rel="noreferrer">{photo.artist}</a> · {photo.licenseUrl?<a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a>:photo.license}{stop.id==='boat'&&<span>Пример речного транспорта; конкретное судно не выбрано.</span>}</figcaption></figure>
     <div className="bkk-photo-content"><div className="bkk-photo-top"><span className="eyebrow">ОСТАНОВКА {index+1} / {routeStops.length}</span><button className="text-button" onClick={()=>showOnMap(stop.id)}><MapPin size={13}/> На нашей карте</button></div><h3>{stop.name}</h3><p>{stop.description}</p>
      <div className="bkk-place-facts"><div><span><Clock size={14}/> ВРЕМЯ НА МЕСТЕ</span><strong>{stop.time}</strong><small>{stop.duration}{stop.id==='boat'?' · плюс подход и ожидание':''}</small></div><div><span><Wallet size={14}/> ЗАЛОЖИТЬ НА ДВОИХ</span><strong>{stop.cost[1]===0?'Бесплатно':formatTHB(stop.cost)}</strong><small>{stop.costType}</small></div></div>
      <p className="bkk-cost-note">{stop.costNote}</p><details><summary>Что учесть на месте</summary><p>{stop.tip}</p></details>
      <div className="bkk-card-sources">{stop.sources.map(s=><Source key={s.url} href={s.url}>{s.label}</Source>)}<Source href={mapLink(stop.point)}>Точка в Google Maps</Source></div>
     </div>
    </article>
    {leg&&<div className={`bkk-transfer ${leg.mode}`}><Icon size={19}/><div><strong>{modeNames[leg.mode]}{leg.from==='iconsiam'?' + пешком':''} · {leg.time}</strong><p>{leg.note}</p><small>{leg.costIncluded?'Бюджет уже в карточке кораблика':leg.cost[1]===0?'Без отдельной платы':`Резерв на двоих: ${formatTHB(leg.cost)}`}</small></div><Source href={directions(stop.point,routeStops[index+1].point,leg.mode)}>Проверить путь</Source></div>}
   </li>;
  })}</ol>
  <section className="bkk-budget-section" aria-labelledby="bkk-budget-title"><div><span className="eyebrow">БЮДЖЕТ ДНЯ · НА ДВОИХ</span><h2 id="bkk-budget-title">{formatTHB(dayBudget)}</h2><p>Около {money(dayBudget[0]*2.4)}–{money(dayBudget[1]*2.4)} при плановых 2,4 ₽/THB. Курс условный; меню и такси — оценки, а не забронированные тарифы.</p><ul><li>Все суммы карточек: {formatTHB([dayBudget[0]-otherTransport[0],dayBudget[1]-otherTransport[1]])}.</li><li>Остальные переезды: {formatTHB(otherTransport)}.</li><li>Кораблик уже включён в карточки и повторно не прибавляется.</li></ul><p>Без отеля, аэропортов, перелёта к морю, колеса обозрения и сувениров. Если закончить в Чайнатауне, резерв уменьшится на 380–700 THB за счёт Asiatique и дороги к нему.</p></div>
   <div className="bkk-add"><label>Дата прогулки<input type="date" min="2026-12-19" max="2027-02-05" value={date} onChange={e=>setDate(e.target.value)}/></label><button className={saved?'chosen':'primary'} disabled={disabled||adding||!validDate||!!saved} onClick={add}>{saved?<Check size={16}/>:<Plus size={16}/>} {saved?'Уже в календаре':adding?'Сохраняем…':'Добавить день в календарь'}</button><small>{saved?`На эту дату уже сохранено событие «${saved.title}». Его можно изменить в календаре. `:'Добавятся расписание и 2 400 ₽ за вход во дворец. '}Еда и транспорт уже относятся к общим статьям бюджета поездки: проверьте их размер в «Расходах», чтобы учесть этот день без двойного счёта.</small><button className="text-button" onClick={onFlights}>Выбрать перелёт через Бангкок <ArrowUpRight size={14}/></button></div>
  </section>
  <details className="bkk-extra"><summary>Кофе с высоты — сохранить как идею</summary><p><Source href="https://arabicathailand.com/locations/arabica-bangkok-empire-tower/">% Arabica в Empire Tower, 55-й этаж</Source> остаётся дополнительной идеей на 45–60 минут. В этот насыщенный день и его бюджет не включена. Чтобы добавить её, лучше заменить одну из остановок.</p></details>
  <p className="muted bkk-small">Источники проверены {routeChecked}. Схема маршрута и все временные интервалы — для планирования. Даты перелётов, жилья и существующие события не изменяются автоматически.</p>
 </div>;
}
