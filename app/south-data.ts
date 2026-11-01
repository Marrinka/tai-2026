export type SouthPoint = [number, number];
export type SouthSource = {label:string;url:string};
export type SouthPlace = {id:string;name:string;tag:string;nights:string;intro:string;activities:string[];advice:string;sources:SouthSource[]};
export const southChecked='1 ноября 2026';
export const southSources={
 boats:'https://bundhayaspeedboat.com/routes',
 samui:'https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360',
 weather:'https://ubonmet.tmd.go.th/files/MetInfo/climate_normal.pdf',
 ferry:'https://lomprayah.com/time-table?lang=en',
 climbing:'https://krabirailayclimbing.com/climbing-tours/',
 similan:'https://www.khaolakexplorer.com/snorkeling-daytrips/similan-islands-snorkeling/',
 park:'https://www.thainationalparks.com/mu-ko-similan-national-park',
 lipe:'https://www.thainationalparks.com/tarutao-national-marine-park',
 panyee:'https://www.thic.or.th/en/tourist/detail/tourist/14',
 bungalow:'https://www.booking.com/hotel/th/jamesbond-bungalow.html',
};
export const southPlaces:SouthPlace[]=[
 {id:'krabi',name:'Краби и Рейли',tag:'СКАЛЫ · КАЯКИ · ОСТРОВА',nights:'5 ночей · 25–30 декабря',intro:'Плотная остановка: первая тренировка уже в день приезда, ещё три занятия, Хонг, каяки и отдельная программа на каждый вечер.',activities:['Четыре тренировки на скалах Рейли с инструктором; программу и нагрузку согласовать со школой.','Острова Хонг: лагуна, пляжи и панорамная смотровая.','Каяки в манграх Ао Талане; время выезда подобрать по приливу.','Пхра Нанг, прогулки между бухтами, вечерние рынки и массаж.'],advice:'Для этого расписания выбираем базу в Ао Нанге: отсюда удобнее вечерние выезды, каяки и кулинарная школа. На Рейли ездим на лодке; возврат после занятий в 18:00 согласуем заранее. У Spider Rock полдня в группе — 1 500 ฿ с человека; четыре занятия на двоих — 12 000 ฿ без скидки за пакет.',sources:[{label:'Школа и цены',url:southSources.climbing},{label:'Ао Талане · TAT',url:'https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/ao-tha-len-thalane-bay-tha-pom'},{label:'Хонг · TAT',url:'https://api-tourismproduct.tourismthailand.org/uploads/2025/10/ebook/All_Eng_Green_Tourism_compress/file/10c2f106-3262-4f29-9477-2be9a055ae0e.pdf'}]},
 {id:'lipe',name:'Ко Липе',tag:'РЫБЫ · РИФЫ · ПЛЯЖИ',nights:'Лучше 4 ночи',intro:'Главный кандидат ради прозрачной воды и снорклинга. Дорога долгая: четыре ночи дадут три полных дня на месте.',activities:['Лодочная прогулка со снорклингом вокруг островов Аданг–Рави.','Sunrise Beach, прогулки между пляжами и закат на западной стороне.','Ко Аданг: смотровая с видом на Липе, пляжи и природа — при открытых тропах.','По желанию — пробное погружение с инструктором вместо ещё одной лодочной прогулки.'],advice:'Ко Липе — туристическая база для знакомства с окружающими островами парка Тарутао. Сам остров Тарутао находится отдельно. На Липе много отелей и лодок; за более дикой природой выезжаем на соседние острова. Одним днём из Краби не планируем.',sources:[{label:'Парк и Ко Аданг',url:southSources.lipe},{label:'Снорклинг вокруг Липе',url:'https://www.visit-thailand.org/islands/21-koh-lipe/snorkelling-and-diving-koh-lipe'},{label:'Как добраться',url:southSources.boats}]},
 {id:'phi',name:'Пхи-Пхи',tag:'МАЙЯ-БЭЙ · ЛАГУНЫ · СМОТРОВАЯ',nights:'2 ночи',intro:'Ночуем на Пхи-Пхи-Дон, а на Пхи-Пхи-Ле выезжаем на лодке. Две ночи позволяют выбрать раннее время экскурсии.',activities:['В день приезда — смотровая, пляж и ужин.','На полный день — Майя-Бэй, лагуна Пиле и снорклинг на разрешённых участках.','На следующее утро — продолжение пути к Пхукету и Као Лаку.'],advice:'В самой Майя-Бэй купание запрещено. Пхи-Пхи очень посещаемы: красивые пейзажи не означают уединение. Для спокойного сна выбираем номер с учётом расстояния до пляжных баров. Однодневный тур возможен, но ночёвки дают больше свободы.',sources:[{label:'Пхи-Пхи-Дон · TAT',url:'https://www.tourismthailand.org/Attraction/phi-phi-don-island'},{label:'Правила Майя-Бэй',url:'https://www.timeout.com/bangkok/news/thailand-famous-maya-bay-reopens-092926'},{label:'Лодки между островами',url:southSources.boats}]},
 {id:'similan',name:'Симиланские острова',tag:'СНОРКЛИНГ · БЕЛЫЙ ПЕСОК · ВАЛУНЫ',nights:'День на островах · 2–3 ночи в Као Лаке',intro:'Для первого знакомства достаточно насыщенной дневной экскурсии из Као Лака: рифы, пляжи и смотровая Sail Rock.',activities:['Несколько остановок для снорклинга и купания.','Пляжи среди гранитных валунов и короткий подъём на смотровую.','Ранний выезд: у проверенного оператора забор из отеля около 05:00–05:45, возвращение на причал около 16:00.'],advice:'Ночёвки на самих островах в палатках и бунгало закрыты. Многодневный формат возможен с проживанием на судне, обычно с акцентом на дайвинг или снорклинг. Для нас предпочтителен дневной тур; после сокращения Краби дату выезда и резерв на погоду уточним в общем маршруте.',sources:[{label:'Программа и цены',url:southSources.similan},{label:'Размещение и правила парка',url:southSources.park},{label:'Пример ночёвки на судне',url:'https://www.tisland.travel/en/blog/similany-otkryvayutsya-15-oktyabrya-2026'}]},
 {id:'panyee',name:'Ко Паньи и залив Пхангнга',tag:'ДЕРЕВНЯ НА СВАЯХ · ЖИЗНЬ У ВОДЫ',nights:'1 ночь · необязательная остановка',intro:'Вероятнее всего, друзья имели в виду Ко Паньи: дома на сваях у высокой скалы, улочки, мечеть и футбольное поле на воде.',activities:['Лодочная прогулка по заливу Пхангнга; маршрут и остановки согласуем с оператором.','Деревня, рыбные рестораны и вечер после отъезда дневных групп.','Утро у воды и переезд на Пхукет; до 10 января приезжаем на рабочую базу.'],advice:'Переночевать можно: есть Jamesbond Bungalow Koh Panyee. Номер на наши даты не подтверждён. Сначала проверим свежие фото, комфорт сна, ужин и лодки в обе стороны. Если речь о плавучих домиках на озере среди скал — это, вероятно, Чео Лан: отдельное место, в этот маршрут не включено.',sources:[{label:'О деревне',url:southSources.panyee},{label:'Jamesbond Bungalow',url:southSources.bungalow}]},
 {id:'samui',name:'Самуи',tag:'АЛЬТЕРНАТИВА ЛИПЕ · ДРУГОЕ ПОБЕРЕЖЬЕ',nights:'Минимум 3 ночи · лучше 4',intro:'Самый сильный повод для нас — морской парк Ангтхонг с островами, смотровыми и каяками. Ещё один день можно посвятить самому Самуи.',activities:['Ангтхонг: полноценная экскурсия на день, лагуны, смотровые и каяки.','Пляжи Ламай и Чавенг, Большой Будда, Ват Плай Лаем и водопад На Муанг.','Бопхут / Fisherman’s Village: прогулка, кафе и ужин на берегу.','Кулинарный мастер-класс, SUP, каяк или массаж между выездами.'],advice:'В конце декабря Самуи обычно дождливее Андаманского побережья; в январе становится суше. Это климатическая закономерность, не прогноз. Если выбираем Самуи, ставим его сразу после поезда до Сураттхани и заменяем им Липе: так сохраняем время на четыре тренировки.',sources:[{label:'Самуи · TAT',url:southSources.samui},{label:'Климатические нормы TMD',url:southSources.weather},{label:'Паром + наземный переезд',url:southSources.ferry}]}
];
export type SouthStop={place:string;dates:string;nights:number;name:string;plan:string};
export const southRoutes:Record<'andaman'|'samui',SouthStop[]>={
 andaman:[
  {place:'krabi',dates:'25–30 декабря',nights:5,name:'Краби / Рейли',plan:'Четыре тренировки, Хонг и каяки. Пять вечеров: гастрорынок, файер-шоу, Краби-Таун, массаж и кулинарный мастер-класс.'},
  {place:'lipe',dates:'Следом · даты уточняем',nights:4,name:'Ко Липе',plan:'Три полных дня: снорклинг, Ко Аданг и пляжи.'},
  {place:'phi',dates:'После Липе',nights:2,name:'Пхи-Пхи-Дон',plan:'Смотровая и ранняя лодочная прогулка к Пхи-Пхи-Ле.'},
  {place:'similan',dates:'После Пхи-Пхи',nights:2,name:'Као Лак',plan:'Переезд, затем дневная экскурсия на Симиланы. Оставим возможность сдвинуть морской день.'},
  {place:'panyee',dates:'Перед Пхукетом',nights:1,name:'Ко Паньи · по желанию',plan:'Залив Пхангнга и ночь в деревне, если понравится и подтвердится жильё.'}
 ],
 samui:[
  {place:'samui',dates:'25–28 декабря',nights:3,name:'Самуи',plan:'Парк Ангтхонг и знакомство с островом. Следим за погодой.'},
  {place:'krabi',dates:'28 дек — 4 янв',nights:7,name:'Краби / Рейли',plan:'Четыре занятия на скалах, Хонг, каяки и Новый год. Даты занятий уточним.'},
  {place:'phi',dates:'4–6 января',nights:2,name:'Пхи-Пхи-Дон',plan:'Смотровая, Майя-Бэй, лагуна Пиле и снорклинг.'},
  {place:'similan',dates:'6–9 января',nights:3,name:'Као Лак',plan:'Симиланы 7-го или 8-го, один день запаса.'},
  {place:'panyee',dates:'9–10 января',nights:1,name:'Ко Паньи · по желанию',plan:'Деревня и залив. Ночёвка зависит от выбранного жилья.'}
 ]
};
export type SouthNode={id:string;name:string;point:SouthPoint;kind:'base'|'outing'|'transit';place?:string;note:string};
export const southNodes:SouthNode[]=[
 {id:'surat',name:'Сураттхани · вокзал',point:[9.022,99.231],kind:'transit',note:'25 декабря утром: прибытие поезда № 85 из Бангкока. Дальше — Краби или Самуи.'},
 {id:'krabi',name:'Ао Нанг · база в Краби',point:[8.033,98.824],kind:'base',place:'krabi',note:'25–30 декабря, пять ночей: четыре занятия на Рейли, Хонг, каяки и занятые вечера.'},
 {id:'railay',name:'Рейли и Пхра Нанг',point:[8.01,98.838],kind:'outing',place:'krabi',note:'Четыре тренировки по полдня и пляжи.'},
 {id:'hong',name:'Острова Хонг',point:[8.079,98.679],kind:'outing',place:'krabi',note:'Лагуна, пляжи и смотровая; отдельный экскурсионный день.'},
 {id:'thalane',name:'Ао Талане · каяки',point:[8.142,98.747],kind:'outing',place:'krabi',note:'Мангры и скалы; маршрут зависит от прилива.'},
 {id:'lipe',name:'Ко Липе',point:[6.488,99.305],kind:'base',place:'lipe',note:'Четыре ночи в основном сценарии; снорклинг и пляжи.'},
 {id:'adang',name:'Ко Аданг',point:[6.516,99.303],kind:'outing',place:'lipe',note:'Лодка с Липе, смотровая и природа. Доступность троп уточнить.'},
 {id:'phi',name:'Пхи-Пхи-Дон',point:[7.739,98.771],kind:'base',place:'phi',note:'Две ночи; здесь выбираем отель.'},
 {id:'maya',name:'Пхи-Пхи-Ле · Майя-Бэй',point:[7.679,98.766],kind:'outing',place:'phi',note:'Дневная лодочная прогулка. В самой Майя-Бэй купание запрещено.'},
 {id:'phuket',name:'Пхукет · причал Рассада',point:[7.872,98.415],kind:'transit',note:'Пересадка на автомобиль до Као Лака. С 10 января — рабочая база на Пхукете; район жилья ещё выбираем.'},
 {id:'khaolak',name:'Као Лак',point:[8.646,98.251],kind:'base',place:'similan',note:'Здесь ночуем перед дневной экскурсией на Симиланы и после неё.'},
 {id:'similan',name:'Симиланские острова',point:[8.652,97.645],kind:'outing',place:'similan',note:'Дневной тур со снорклингом; ночёвки на суше закрыты.'},
 {id:'panyee',name:'Ко Паньи',point:[8.336,98.503],kind:'base',place:'panyee',note:'Деревня на сваях. Одна ночь по желанию и при подтверждении жилья.'},
 {id:'bond',name:'Залив Пхангнга · Ко Тапу',point:[8.275,98.501],kind:'outing',place:'panyee',note:'Один из возможных пунктов прогулки по заливу; состав тура ещё не выбран.'},
 {id:'samui',name:'Самуи',point:[9.537,99.935],kind:'base',place:'samui',note:'Альтернатива Ко Липе. На карте — ориентир у Натона, район жилья не выбран.'},
 {id:'angthong',name:'Парк Ангтхонг',point:[9.634,99.668],kind:'outing',place:'samui',note:'Отдельная экскурсия с Самуи: острова, виды и каяки.'}
];
export type SouthLayer='andaman'|'samui'|'shared'|'outing';
export type SouthLeg={id:string;from:string;to:string;layer:SouthLayer;mode:string;time:string;note:string;source:string;via?:SouthPoint[];label?:SouthPoint};
export const southLegs:SouthLeg[]=[
 {id:'surat-krabi',from:'surat',to:'krabi',layer:'andaman',mode:'Наземный трансфер',time:'Планировать 3–4 ч',note:'Оценка для планирования, не выбранный рейс. После прибытия поезда оставить запас на задержку и ожидание транспорта.',source:'https://www.google.com/maps/dir/?api=1&origin=Surat+Thani+Railway+Station&destination=Ao+Nang&travelmode=driving',via:[[8.89,99.06],[8.59,98.81]],label:[8.83,98.82]},
 {id:'krabi-lipe',from:'krabi',to:'lipe',layer:'andaman',mode:'Скоростная лодка',time:'5 ч 20 мин',note:'Опубликованное время Bundhaya, сезонный маршрут. От 2 400 ฿/чел. Возможны промежуточные остановки и смена лодки; предлагаемый рейс 30 декабря не подтверждён.',source:southSources.boats,via:[[7.65,99.02],[7.27,99.15],[6.82,99.2]],label:[7.25,99.32]},
 {id:'lipe-phi',from:'lipe',to:'phi',layer:'andaman',mode:'Скоростная лодка',time:'Около 4 ч',note:'Опубликованный маршрут Bundhaya, от 2 350 ฿/чел. Дату после сокращения Краби ещё уточняем; расписание и места нужно подтвердить.',source:southSources.boats,via:[[7.05,98.99],[7.55,98.96]],label:[6.97,98.74]},
 {id:'surat-samui',from:'surat',to:'samui',layer:'samui',mode:'Трансфер + паром',time:'Планировать 4–6 ч',note:'Оценка от вокзала до места проживания с ожиданием парома. Проезд через Донсак показан схематически; конкретный перевозчик не выбран.',source:southSources.ferry,via:[[9.14,99.35],[9.325,99.737]],label:[9.18,99.91]},
 {id:'samui-krabi',from:'samui',to:'krabi',layer:'samui',mode:'Паром + наземный трансфер',time:'Планировать 6–8 ч',note:'Оценка от отеля до отеля. Время зависит от причала, пересадок и ожидания; проверяем комбинированный билет Lomprayah или другого перевозчика.',source:southSources.ferry,via:[[9.325,99.737],[9.12,99.35],[8.82,99.15],[8.42,99.05]],label:[8.56,99.64]},
 {id:'krabi-phi',from:'krabi',to:'phi',layer:'samui',mode:'Скоростная лодка',time:'Около 50 мин',note:'Связка Краби → Пхи-Пхи в сценарии с Самуи, от 1 000 ฿/чел. Расписание на дату уточнить.',source:southSources.boats},
 {id:'phi-phuket',from:'phi',to:'phuket',layer:'shared',mode:'Скоростная лодка',time:'Около 1 ч',note:'По опубликованному маршруту Bundhaya, от 800 ฿/чел. Затем отдельный автомобильный трансфер в Као Лак.',source:southSources.boats,label:[7.73,98.52]},
 {id:'phuket-khaolak',from:'phuket',to:'khaolak',layer:'shared',mode:'Наземный трансфер',time:'Планировать 2,5–3,5 ч',note:'Оценка от причала Рассада до Као Лака. Весь переезд с Пхи-Пхи лучше занять половиной дня, с запасом на посадку и пересадку.',source:'https://www.google.com/maps/dir/?api=1&origin=Rassada+Pier&destination=Khao+Lak&travelmode=driving',via:[[8.2,98.3],[8.4,98.26]]},
 {id:'khaolak-panyee',from:'khaolak',to:'panyee',layer:'shared',mode:'Автомобиль + лодка',time:'Планировать 2–3 ч',note:'Оценка без экскурсионных остановок. Трансфер до причала и лодку в деревню согласовать с хозяином жилья; дата ночёвки и наличие номера не подтверждены.',source:southSources.bungalow,via:[[8.5,98.45],[8.41,98.51]]},
 {id:'panyee-phuket',from:'panyee',to:'phuket',layer:'shared',mode:'Лодка + автомобиль',time:'Планировать 2–3 ч',note:'Оценка до Пхукета с ожиданием лодки; до выбранного отеля время будет зависеть от района. Приезжаем 10 января, проверяем интернет.',source:southSources.bungalow,via:[[8.41,98.51],[8.26,98.41],[8.19,98.3],[8.02,98.37]]},
 {id:'railay-outing',from:'krabi',to:'railay',layer:'outing',mode:'Лодка + тренировка',time:'Четыре занятия по полдня',note:'Переход Ао Нанг — Рейли короткий, но добавляем ожидание лодки и подход к школе. Расписание занятий предварительное.',source:southSources.climbing},
 {id:'hong-outing',from:'krabi',to:'hong',layer:'outing',mode:'Лодочная экскурсия',time:'Выделить день',note:'Пляж, лагуна и смотровая. Время перехода зависит от лодки и причала; тур пока не выбран.',source:'https://api-tourismproduct.tourismthailand.org/uploads/2025/10/ebook/All_Eng_Green_Tourism_compress/file/10c2f106-3262-4f29-9477-2be9a055ae0e.pdf'},
 {id:'thalane-outing',from:'krabi',to:'thalane',layer:'outing',mode:'Наземный трансфер + каяки',time:'Полдня или день',note:'Длительность и доступность проходов в манграх зависят от прилива и программы.',source:'https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/ao-tha-len-thalane-bay-tha-pom'},
 {id:'adang-outing',from:'lipe',to:'adang',layer:'outing',mode:'Лодка + прогулка',time:'Полдня или день',note:'Смотровая, пляжи и природа. Проверить открытие троп и согласовать обратную лодку.',source:southSources.lipe},
 {id:'maya-outing',from:'phi',to:'maya',layer:'outing',mode:'Лодочная экскурсия',time:'Выделить день',note:'Ранний выезд к Пхи-Пхи-Ле, Майя-Бэй, лагуна Пиле и снорклинг на разрешённых участках. Ночуем на Пхи-Пхи-Дон.',source:'https://www.tourismthailand.org/Attraction/phi-phi-don-island'},
 {id:'similan-outing',from:'khaolak',to:'similan',layer:'outing',mode:'Трансфер к причалу + лодка',time:'Полный день',note:'Около 1–1,5 ч на скоростной лодке в одну сторону, зависит от причала и моря. Ранний забор из отеля; ночуем в Као Лаке.',source:southSources.similan,via:[[8.571,98.226]],label:[8.58,97.94]},
 {id:'bay-outing',from:'panyee',to:'bond',layer:'outing',mode:'Прогулка по заливу',time:'Полдня или день',note:'Ко Тапу показан как возможная остановка. Конкретную программу залива и цену согласуем позже.',source:southSources.panyee},
 {id:'angthong-outing',from:'samui',to:'angthong',layer:'outing',mode:'Лодка + прогулки / каяки',time:'Полный день',note:'Выезд с Самуи при подходящей погоде и открытом парке. В основной маршрут через Липе не входит.',source:southSources.samui}
];
export const southCostItems=[
 {name:'Четыре занятия скалолазанием',baht:12000,note:'4 × 2 человека × 1 500 ฿',source:southSources.climbing},
 {name:'Симиланы · ранний дневной тур',baht:8200,note:'2 × 4 100 ฿ · сбор парка включён',source:southSources.similan},
 {name:'Ао Нанг → Ко Липе',baht:4800,note:'От 2 × 2 400 ฿',source:southSources.boats},
 {name:'Ко Липе → Пхи-Пхи',baht:4700,note:'От 2 × 2 350 ฿',source:southSources.boats},
 {name:'Пхи-Пхи → Пхукет',baht:1600,note:'От 2 × 800 ฿',source:southSources.boats}
];
