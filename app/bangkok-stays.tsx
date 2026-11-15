'use client';
import React,{useState} from 'react';
import {ArrowUpRight,Check,Clock,MapPin,House,Wallet,ArrowRight,Image as ImageIcon} from 'lucide-react';
import {bangkokStays,money,Plan,Stay} from './data';

function Link({href,children}:{href:string;children:React.ReactNode}){return <a className="source" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14}/></a>}
function Photo({stay,onOpen}:{stay:Stay;onOpen:()=>void}){const [failed,setFailed]=useState(false);return <button className="image-button" aria-label={'Фотографии '+stay.name} onClick={onOpen}>{failed?<div className="photo-fallback"><ImageIcon/><span>Открыть фото в источнике</span></div>:<img src={stay.photos[0]} alt={'Номер в '+stay.name} loading="lazy" onError={()=>setFailed(true)}/>}<span className="photo-count">{stay.photos.length} фото <ArrowUpRight size={14}/></span><span className="image-tag">{stay.type}</span></button>}

export default function BangkokStays({plan,disabled,onSelect,onPrice,onGallery,onRoute,onBudget}:{plan:Plan;disabled:boolean;onSelect:(id?:string)=>void;onPrice:(stay:Stay)=>void;onGallery:(stay:Stay)=>void;onRoute:()=>void;onBudget:()=>void}){
 const selected=bangkokStays.find(s=>s.id===plan.stays.bangkok);
 function showCard(id:string){document.getElementById('stay-'+id)?.scrollIntoView({behavior:'smooth',block:'start'})}
 return <section className="bkk-stays">
  <div className="stay-location-heading"><span className="eyebrow">ДВЕ НОЧИ ПЕРЕД МОРЕМ</span><h2>Бангкок</h2><p>Прилетаем вечером 22 декабря, гуляем 23-го, выезжаем утром 24-го. Здесь важны комфортный сон, поздний заезд и близость к началу прогулки.</p></div>
  <div className="bkk-stay-summary"><div><small>ДАТЫ</small><strong>22–24 декабря 2026</strong><span>2 ночи · 2 взрослых</span></div><div><small>ХОТИМ УЛОЖИТЬСЯ</small><strong>4 000–5 000 ₽</strong><span>Максимум 6 000 ₽ за всё проживание</span></div><div><small>БЛИЖЕ К НАЧАЛУ ПРОГУЛКИ</small><strong>Суан Пхлу, Сатхон</strong><button className="text-button" onClick={onRoute}>К завтраку в BARTELS пешком <ArrowRight size={14}/></button></div></div>
  <div className="bkk-stay-intro"><p><b>Mybed Sathorn — новый кандидат рядом со стартом.</b> Номер с окном, круглосуточная стойка и 4 525 ₽ за две ночи по проверенному тарифу. Он невозвратный. Остальные варианты собраны ниже в одном списке для сравнения.</p><p className="muted">Цены за 22–24 декабря 2026, две ночи и двоих; проверка 1 ноября. Рейтинги указаны по соответствующим площадкам и не равны нашей оценке. Бронирований нет.</p></div>
  <details className="stay-comparison"><summary>Сравнить все {bangkokStays.length} вариантов Бангкока</summary><div className="bkk-comparison-wrap"><table className="bkk-comparison"><caption>Бангкок — быстрое сравнение</caption><thead><tr><th>Вариант</th><th>За 2 ночи</th><th>Что учесть</th></tr></thead><tbody>{bangkokStays.map(s=><tr key={s.id}><td><button onClick={()=>showCard(s.id)}><b>{s.name}</b><small>{s.rating}</small></button></td><td>{s.price!==null?money(s.price):s.quote?money(s.quote)+'*':'Уточнить'}</td><td>{s.summary||s.assessment||s.description}</td></tr>)}</tbody></table></div></details>
  <div className="bkk-stay-selection"><Wallet size={19}/><div>{selected?<><b>В плане: {selected.name}</b><span>{money(plan.overrides['stay:'+selected.id]??selected.price??0)} добавлено в расходы</span></>:<><b>Жильё в Бангкоке ещё не выбрано</b><span>Эти две ночи пока не включены в сумму поездки.</span></>}</div>{selected&&<button className="text-button" disabled={disabled} onClick={()=>onSelect()}>Убрать выбор</button>}<button className="secondary" onClick={onBudget}>Расходы <ArrowRight size={14}/></button></div>
  <div className="stay-grid bkk-stay-grid">{bangkokStays.map(s=>{
   const active=plan.stays.bangkok===s.id,override=plan.overrides['stay:'+s.id],amount=override??s.price;
   const directions='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(s.mapQuery)+'&destination='+encodeURIComponent('BARTELS Sathorn Bangkok')+'&travelmode='+(s.mapMode||'walking');
   return <article className={'stay-card '+(active?'selected':'')} key={s.id} id={'stay-'+s.id}>
    <Photo stay={s} onOpen={()=>onGallery(s)}/><div className="stay-content">
     <div className="bkk-stay-badges"><span>{s.badge}</span><small>{s.platform}</small></div>
     <small className="eyebrow">{s.area}</small><h2>{s.name}</h2><div className="bkk-stay-rating">{s.rating}</div><p>{s.description}</p>{s.assessment&&<p className="bkk-assessment"><b>Для нашей поездки:</b> {s.assessment}</p>}
     <dl className="bkk-room-facts"><div><dt>Кровать</dt><dd>{s.bed}</dd></div><div><dt>Санузел</dt><dd>{s.bath}</dd></div></dl>
     <div className="feature-tags">{s.features.map(f=><span key={f}><Check size={12}/>{f}</span>)}</div>
     <div className="bkk-stay-detail"><MapPin size={16}/><p>{s.route} {s.mapQuery&&<Link href={directions}>{s.mapLabel||'Пеший маршрут'}</Link>}</p></div>
     <div className="bkk-stay-detail"><Clock size={16}/><p>{s.arrival}</p></div>
     <details className="bkk-stay-conditions"><summary>Что учесть для спокойного сна и заезда</summary><ul>{s.unverified.map(x=><li key={x}>{x}</li>)}</ul><p>{s.note}</p>{s.sources?.map(source=><Link key={source.url} href={source.url}>{source.label}</Link>)}{s.official&&<Link href={s.official}>Официальный сайт отеля</Link>}<p className="muted">Фото из объявления; конкретный номер и расположение санузла сверить перед оплатой.</p></details>
     <div className="stay-price"><strong>{amount!==null?money(amount):money(s.quote!)+'*'}</strong><small>{s.priceLabel}</small><span className={'status-dot '+(amount!==null?'verified':'')}>{override!==undefined?'Ваша подтверждённая сумма':s.status}</span></div>
     {s.price===null&&<p className="bkk-price-condition">* 5 825 ₽ — показанный тариф после входа в Booking. Доступность этой цены для вас ещё не подтверждена.</p>}
     <div className="card-actions"><button disabled={disabled} aria-label={(active?'Выбран ':amount===null?'Указать цену ':'Выбрать ')+s.name} className={active?'chosen':'primary'} onClick={()=>amount===null?onPrice(s):onSelect(s.id)}>{active?<><Check size={15}/> Выбрано</>:amount===null?'Подтвердить свою цену':'Выбрать в план'}</button><Link href={s.url}>{s.platform==='Сайт отеля'?'Сайт отеля':'Открыть на '+s.platform}</Link></div>
     <button disabled={disabled} className="text-button bkk-edit-price" onClick={()=>onPrice(s)}>Уточнить сумму</button>
    </div>
   </article>
  })}</div>
  <div className="notice amber"><House size={20}/><p><b>Ночь после Бангкока — в поезде.</b> Выселяемся 24 декабря и вечером садимся на поезд № 85. В Ао Нанге нужно семь ночей с 25 декабря до 1 января. Выбор номера в Бангкоке добавляет в бюджет две ночи.</p></div>
  <div className="note-card"><h3>Как расположение влияет на наш день</h3><p>Нам важен утренний BARTELS Sathorn, затем Люмпини и метро к дворцу. Суан Пхлу позволяет начать пешком. Жильё у Saphan Taksin удобнее для вечернего возвращения, а Тонгло добавляет переезды в обе стороны. После Asiatique около 23:00 заложите отдельный запас на возвращение в отель: бесплатная лодка довозит до Sathorn Pier, а не до Суан Пхлу.</p><button className="text-button" onClick={onRoute}>Весь день на карте <ArrowRight size={15}/></button></div>
  <details className="bkk-rejected"><summary>Что проверили, но не включили в основной выбор</summary><p><Link href="https://www.airbnb.com/rooms/37902536?check_in=2026-12-22&check_out=2026-12-24&adults=2&currency=RUB">Hap@Sathorn · 4 725 ₽</Link> — 4,59/5, 63 отзыва; есть жалобы на слышимость, санузел в карточке указан как общий, хотя отзывы говорят о собственном. Для комфортного сна предпочла бы варианты выше.</p><p><Link href="https://www.airbnb.com/rooms/1412787494605386911?check_in=2026-12-22&check_out=2026-12-24&adults=2&currency=RUB">Ease Room 7 · 8 209 ₽</Link> — выше лимита, частный санузел снаружи комнаты. Room 3 за 10 213 ₽ тоже дороже бюджета и с двухъярусными кроватями.</p></details>
 </section>
}
