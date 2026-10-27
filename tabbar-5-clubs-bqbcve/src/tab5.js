/* ===== tabbar-5-clubs-v1: таб-бар на 5 вкладок + экраны Клубы (60), Матчи (61), Профиль (62), лист размеров (64) ===== */
const KT={
 tab_clubs:['Clubes','Clubs','Clubs','Клубы','Клуби'],
 unr_a:['{n} sin leer','{n} sense llegir','{n} unread','{n} непрочитанных','{n} непрочитаних'],
 ann_h:['Anuncios','Anuncis','Announcements','Анонсы','Анонси'],
 my_h:['Mis clubes','Els meus clubs','My clubs','Мои клубы','Мої клуби'],
 find_a:['Buscar club','Cercar club','Find a club','Найти клуб','Знайти клуб'],
 find_b:['Buscar club','Trobar club','Find a club','Найти клуб','Знайти клуб'],
 k_tour:['Torneo','Torneig','Tournament','Турнир','Турнір'],
 k_court:['Pistas libres','Pistes lliures','Free courts','Свободные корты','Вільні корти'],
 k_coach:['Nuevo entrenador','Nou entrenador','New coach','Новый тренер','Новий тренер'],
 today:['Hoy','Avui','Today','Сегодня','Сьогодні'],
 yday:['Ayer','Ahir','Yesterday','Вчера','Вчора'],
 new_a:['{n} anuncios nuevos','{n} anuncis nous','{n} new announcements','Новых анонсов: {n}','Нових анонсів: {n}'],
 a1t:['Torneo de Navidad: abiertas las inscripciones','Torneig de Nadal: obertes les inscripcions','Christmas tournament: sign-ups are open','Рождественский турнир: открыта запись','Різдвяний турнір: відкрито запис'],
 a1b:['Parejas mixtas, 19 y 20 de diciembre. Inscripción hasta el 30 de noviembre.','Parelles mixtes, 19 i 20 de desembre. Inscripció fins al 30 de novembre.','Mixed pairs, December 19–20. Register by November 30.','Смешанные пары, 19 и 20 декабря. Запись до 30 ноября.','Змішані пари, 19 і 20 грудня. Запис до 30 листопада.'],
 a2t:['Pistas libres el viernes por la tarde','Pistes lliures divendres a la tarda','Free courts on Friday afternoon','Свободные корты в пятницу вечером','Вільні корти в п’ятницю ввечері'],
 a2b:['3 pistas libres de 17:00 a 20:00. Reserva desde la app.','3 pistes lliures de 17:00 a 20:00. Reserva des de l’app.','3 courts free from 5:00 to 8:00 pm. Book in the app.','3 корта свободны с 17:00 до 20:00. Бронируйте в приложении.','3 корти вільні з 17:00 до 20:00. Бронюйте в застосунку.'],
 a3t:['Nuevo entrenador: Jordi Puig','Nou entrenador: Jordi Puig','New coach: Jordi Puig','Новый тренер: Jordi Puig','Новий тренер: Jordi Puig'],
 a3b:['Clases de iniciación e intermedio, martes y jueves.','Classes d’iniciació i nivell mitjà, dimarts i dijous.','Classes for beginner and intermediate levels, Tuesdays and Thursdays.','Занятия для начинающих и среднего уровня, по вторникам и четвергам.','Заняття для початківців і середнього рівня, по вівторках і четвергах.'],
 a4t:['Liga de invierno: quedan 4 plazas','Lliga d’hivern: queden 4 places','Winter league: 4 spots left','Зимняя лига: осталось 4 места','Зимова ліга: залишилось 4 місця'],
 a4b:['Categoría mixta, jueves por la noche. Empieza el 5 de noviembre.','Categoria mixta, dijous al vespre. Comença el 5 de novembre.','Mixed category, Thursday evenings. Starts November 5.','Смешанная категория, по четвергам вечером. Старт 5 ноября.','Змішана категорія, по четвергах увечері. Старт 5 листопада.'],
 ke_t:['Aún no estás en ningún club','Encara no ets a cap club','You’re not in a club yet','Вы пока не состоите в клубе','Ви ще не в жодному клубі'],
 ke_b:['Únete a un club y verás aquí sus anuncios: torneos, pistas libres y novedades.','Uneix-te a un club i veuràs aquí els seus anuncis: torneigs, pistes lliures i novetats.','Join a club to see its announcements here: tournaments, free courts and news.','Вступите в клуб, и здесь появятся его анонсы: турниры, свободные корты и новости.','Вступіть до клубу, і тут з’являться його анонси: турніри, вільні корти та новини.'],
 ke_inv:['Tengo una invitación','Tinc una invitació','I have an invite','У меня есть приглашение','У мене є запрошення'],
 ke_near:['Clubes cerca de ti','Clubs a prop teu','Clubs near you','Клубы рядом','Клуби поруч'],
 join:['Unirme','Unir-me','Join','Вступить','Вступити'],
 m_up:['Próximos','Pròxims','Upcoming','Предстоящие','Майбутні'],
 m_past:['Jugados','Jugats','Played','Сыгранные','Зіграні'],
 m_need:['Falta uno','Falta un','Needs 1','Нужен 1','Потрібен 1'],
 m_full:['Completo','Complet','Full','Полный','Повний'],
 court:['Pista','Pista','Court','Корт','Корт'],
 tmr:['Mañana','Demà','Tomorrow','Завтра','Завтра'],
 lvl:['Nivel','Nivell','Level','Уровень','Рівень'],
 p_stats:['Estadísticas','Estadístiques','Statistics','Статистика','Статистика'],
 p_set:['Ajustes','Configuració','Settings','Настройки','Налаштування'],
 p_lang:['Idioma','Idioma','Language','Язык','Мова'],
 p_sub:['Palamós · nivel 3,5','Palamós · nivell 3,5','Palamós · level 3.5','Паламос · уровень 3,5','Паламос · рівень 3,5'],
};
Object.assign(T,KT);
const kt=(k,p)=>t(k,p);
const PLU={es:['jugador','jugadores'],ca:['jugador','jugadors'],en:['player','players']};
function nPl(n){const L=S.lang;if(PLU[L])return n+' '+PLU[L][n===1?0:1];
 const m10=n%10,m100=n%100;const f=(m10===1&&m100!==11)?0:(m10>=2&&m10<=4&&(m100<10||m100>=20))?1:2;
 return n+' '+(L==='ru'?['игрок','игрока','игроков']:['гравець','гравці','гравців'])[f]}
const dist=s=>S.lang==='en'?s.replace(',','.'):s;
const unreadTotal=()=>15+((S.cv&&S.cv.unread)?1:0);
function tabbar(active,opt){
 opt=opt||{};const n=opt.badge===undefined?unreadTotal():opt.badge;
 const L=[['home','house','tab_home','30'],['matches','volleyball','tab_matches','61'],['chats','message-circle','tab_chats','50'],['clubs','users-round','tab_clubs','60'],['profile','user-round','tab_profile','62']];
 return `<nav class="tabs glass t5" aria-label="tabs">${L.map(([id,i,k,s])=>{const on=id===active,c=id==='chats';
  const bd=c&&n>0?`<b class="tbd" aria-hidden="true">${n>99?'99+':n}</b>`:'';
  const al=c&&n>0?` aria-label="${esc(t(k)+', '+t('unr_a',{n}))}"`:'';
  return `<button class="tab${c?' ctr':''}${on?' on':''}" data-act="${on||opt.stat?'noop':'scr:'+s}"${on?' aria-current="page"':''}${al}>${ic(i,c?'i28':'i22')}<span>${esc(t(k))}</span>${bd}</button>`}).join('')}</nav>`}
/* ---- Клубы ---- */
const CLUBS=[
 {n:'Club Pàdel Palamós',loc:'Palamós · Baix Empordà',pl:186,nw:2,c:'t2'},
 {n:'Pàdel Sant Feliu',loc:'Sant Feliu · Baix Empordà',pl:94,nw:1,c:'t3'},
 {n:'Padel Indoor Girona',loc:'Girona · Gironès',pl:312,nw:0,c:'t1'},
];
function when(d){const L=S.lang;if(d==='t')return t('today')+', 9:10';if(d==='y')return t('yday');return dfmt(new Date(2026,9,d))}
function aCard(k,club,ico,when_,ti,bo,unr){
 const c=CLUBS.find(x=>x.n===club);
 return `<button class="acard" data-act="noop"><span class="ah"><span class="av ${c.c}" aria-hidden="true">${ic('volleyball')}</span><span class="an"><b>${esc(club)}</b><small>${esc(when_)}</small></span>${unr?`<i class="nd" role="img" aria-label="${esc(t('new_a',{n:1}))}"></i>`:''}</span><span class="kd t-${k}">${ic(ico)}${esc(t('k_'+k))}</span><h3>${esc(t(ti))}</h3><p>${esc(t(bo))}</p></button>`}
function kFeed(){return aCard('tour','Club Pàdel Palamós','trophy',when('t'),'a1t','a1b',1)+aCard('court','Pàdel Sant Feliu','clock',when('y'),'a2t','a2b',1)+aCard('coach','Club Pàdel Palamós','user-round-plus',when(24),'a3t','a3b',0)+aCard('tour','Padel Indoor Girona','trophy',when(22),'a4t','a4b',0)}
function kRow(c){return `<button class="krow" data-act="noop"><span class="kav ${c.c}" aria-hidden="true">${ic('volleyball','i24')}</span><span class="lb"><b>${esc(c.n)}</b><small>${esc(c.loc)}</small><em>${ic('users')}<span>${esc(nPl(c.pl))}</span></em></span><span class="rt">${c.nw?`<span class="bdg" role="img" aria-label="${esc(t('new_a',{n:c.nw}))}">${c.nw}</span>`:''}${ic('chevron-right')}</span></button>`}
function screen60(){
 const emp=S.wst==='empty';
 const hdr=`<div class="hdr chdr kh"><div class="ttl"><h1 class="${disp(t('tab_clubs')).trim()}">${esc(t('tab_clubs'))}</h1></div><button class="circ" data-act="noop" aria-label="${esc(t('find_a'))}">${ic('search','i24')}</button></div>`;
 let body;
 if(emp){
  const nr=(c,d,pl)=>`<button class="krow" data-act="noop"><span class="kav ${c.c}" aria-hidden="true">${ic('volleyball','i24')}</span><span class="lb"><b>${esc(c.n)}</b><small>${esc(c.loc.split(' · ')[0])}</small><em>${ic('map-pin')}<span>${esc(dist(d))}</span></em></span><span class="rt"><span class="pill pri join">${esc(t('join'))}</span></span></button>`;
  body=`<div class="kemp"><span class="ke" aria-hidden="true">${ic('users-round')}</span><h2 class="${disp(t('ke_t')).trim()}">${esc(t('ke_t'))}</h2><p>${esc(t('ke_b'))}</p><button class="pill pri" data-act="noop">${ic('search','i24')}<span>${esc(t('find_b'))}</span></button><button class="pill out" data-act="noop">${ic('ticket','i24')}<span>${esc(t('ke_inv'))}</span></button></div>
  <div class="ksec k2"><h2 class="${disp(t('ke_near')).trim()}">${esc(t('ke_near'))}</h2></div>${nr(CLUBS[0],'1,2 km')}${nr(CLUBS[1],'6 km')}`;
 }else body=`<div class="ksec"><h2 class="${disp(t('ann_h')).trim()}">${esc(t('ann_h'))}</h2></div>${kFeed()}<div class="ksec k2" id="kmy"><h2 class="${disp(t('my_h')).trim()}">${esc(t('my_h'))}</h2></div>${CLUBS.map(kRow).join('')}<button class="pill out kfind" data-act="noop">${ic('search','i24')}<span>${esc(t('find_b'))}</span></button>`;
 return `${status()}${hdr}<div class="scr kl" id="kscr">${body}</div>${tabbar('clubs')}`}
/* ---- Матчи ---- */
function screen61(){
 const wd=d=>new Intl.DateTimeFormat(S.lang,{weekday:'short',day:'numeric',month:'short'}).format(d);
 const pa=(names,free)=>`<span class="mp">${names.map(x=>`<span class="avatar ${avCol(x)}" aria-hidden="true">${ini(x)}</span>`).join('')}${free?`<span class="slot" aria-hidden="true">${ic('plus')}</span>`:''}</span>`;
 const mc=(ti,club,court,names,free)=>`<button class="mcard" data-act="noop"><span class="mt"><b class="${disp(ti).trim()}">${esc(ti)}</b><span class="mtag${free?'':' ok'}">${esc(t(free?'m_need':'m_full'))}</span></span><span class="mm">${esc(club)} · ${esc(t('court'))} ${court}</span>${pa(names,free)}</button>`;
 const hdr=`<div class="hdr chdr kh"><div class="ttl"><h1 class="${disp(t('tab_matches')).trim()}">${esc(t('tab_matches'))}</h1></div><button class="circ" data-act="noop" aria-label="${esc(t('find_a'))}">${ic('plus','i24')}</button></div>`;
 return `${status()}${hdr}<div class="scr ml"><div class="seg mseg" role="tablist"><button class="on" data-act="noop">${esc(t('m_up'))}</button><button data-act="noop">${esc(t('m_past'))}</button></div>${mc(t('today')+', 19:00','Club Pàdel Palamós',2,['Núria Camps','Marc Soler','Pau Roca'],1)}${mc(t('tmr')+', 10:30','Pàdel Sant Feliu',1,['Elena Ruiz','Jordi Puig','Laia Serra','Marta Vidal'],0)}${mc(wd(new Date(2026,9,31))+', 11:00','Padel Indoor Girona',3,['Marc Soler','Pau Roca','Jordi Puig'],1)}</div>${tabbar('matches')}`}
/* ---- Профиль ---- */
function screen62(){
 const row=(i,k)=>`<button class="prow" data-act="noop">${ic(i,'i24')}<span>${esc(t(k))}</span>${ic('chevron-right','i24')}</button>`;
 const hdr=`<div class="hdr chdr kh"><div class="ttl"><h1 class="${disp(t('tab_profile')).trim()}">${esc(t('tab_profile'))}</h1></div><button class="circ" data-act="noop" aria-label="${esc(t('p_set'))}">${ic('settings','i24')}</button></div>`;
 return `${status()}${hdr}<div class="scr pl"><div class="pfh"><span class="avatar a1" aria-hidden="true">M</span><h2>Murat</h2><p>${esc(t('p_sub'))}</p></div><div class="pfs"><div><b>24</b><span>${esc(t('tab_matches'))}</span></div><div><b>3,5</b><span>${esc(t('lvl'))}</span></div><div><b>3</b><span>${esc(t('tab_clubs'))}</span></div></div>${row('users-round','my_h')}${row('trophy','p_stats')}${row('languages','p_lang')}${row('settings','p_set')}</div>${tabbar('profile')}`}
/* ---- лист размеров ---- */
const fm=x=>String(x).replace('.',',');
function screen64(){
 const sh=s=>`<div class="sh">${s}</div>`;
 const bk=`<i class="b c" style="left:-10px;top:-8px;width:130px;height:62px"></i><i class="b n" style="left:112px;top:-8px;width:120px;height:62px"></i><i class="b m" style="left:226px;top:-8px;width:220px;height:62px"></i><i class="b k" style="left:20px;top:60px;width:100px;height:12px"></i>`;
 const frame=(W,a,badge)=>{const s=Math.min(1,((document.getElementById('app')||{clientWidth:440}).clientWidth-32)/W);return `<div class="tbo" style="height:${Math.round(112*s)+8}px"><div class="tbfit" style="width:${W}px;transform:scale(${s.toFixed(3)})"><div class="wl">${W} pt${badge!==undefined?' · '+(badge||'без бейджа'):''}</div><div class="tbw" style="width:${W}px;container-type:inline-size">${bk}${tabbar(a,{badge:badge,stat:1})}</div></div></div>`};
 let tab='';
 if(typeof TBM!=='undefined'&&TBM&&TBM.rows5){
  tab=`<table><tr><th>W</th><th>ячейка</th><th>Чаты</th><th>шрифт</th><th>край ячейки</th><th>контур</th></tr>`+TBM.rows5.map(r=>`<tr><td>${r.W}</td><td>${fm(r.cell)}</td><td>${r.ctr}</td><td>${r.font}</td><td class="${r.cedge>=4?'ok':'bad'}">${fm(r.cedge)}</td><td class="${r.outl>=5?'ok':'bad'}">${fm(r.outl)}</td></tr>`).join('')+`</table>`}
 const kv=(k,v)=>`<div class="skv"><span>${k}</span><b>${v}</b></div>`;
 const vals=`<div class="card">${kv('Капсула','72 pt · радиус 999')}${kv('Поля / отступ','12 (W<340: 8) / 14')}${kv('Ячейка','(W − 24 − 28 − 68) / 4')}${kv('«Чаты» (центр)','68 × 72, линза 64 × 52')}${kv('Линза «Чаты»','y −4…48, радиус 26; значок 28')}${kv('Остальные','линза 44, значок 22')}${kv('Подпись','Golos 600, 12/14 (W<375: 11/14)')}${kv('Бейдж','мин. 18+4 × 24, coral, ink')}</div>`;
 return `${status()}${whdr('Таб-бар: 5 вкладок','Размеры и запасы','','')}<div class="scr spec tbsh t5sh">${sh('Значения')}${vals}${sh('Живые бары')}${frame(360,'home')}${frame(375,'matches')}${frame(390,'chats',15)}${frame(430,'clubs')}${frame(390,'profile')}${sh('Бейдж «Чаты»')}${frame(390,'clubs',0)}${frame(390,'clubs',3)}${frame(390,'clubs',99)}${frame(390,'clubs',120)}${sh('Запасы, pt')}${tab}</div>`}
/* ---- реестр, демо-панель ---- */
Object.assign(WST,{'60':[['feed','Лента'],['scrolled','Прокручено'],['empty','Пусто (новичок)']],'61':[['up','Предстоящие']],'62':[['me','Профиль']],'64':[['spec','Лист']]});
const _h=SCR['30'];
Object.assign(SCR,{'30':()=>{S.wst='glass';return screen30().replace('<button class="hrow" data-act="noop">','<button class="hrow" data-act="scr:60">').replace('class="avatar a1 hav" data-act="noop"','class="avatar a1 hav" data-act="scr:62"')},'60':screen60,'61':screen61,'62':screen62,'64':screen64});
WST['30']=[['glass','Главная']];
SCRL.length=0;SCRL.push(['30','Главная'],['61','Матчи'],['50','Чаты'],['60','Клубы'],['62','Профиль'],['64','Таб-бар: размеры']);
function panelHtml(){
 const chip=(on,act,l)=>`<button class="chip${on?' on':''}" data-act="${act}">${l}</button>`;
 let st='';if(S.screen==='60')st=WST['60'].map(([k,l])=>chip(S.wst===k,'wst:'+k,l)).join('');
 return `<h3>Padelada 2.0 · Таб-бар на 5 вкладок · Клубы</h3><p class="sub">Решение Мурата 27.10: Главная, Матчи, Чаты (центр, крупнее, бейдж), Клубы, Профиль. Кнопки Paddy в панели нет: Paddy первый в «Чатах». Только падел.</p>
 <div class="grp" style="margin-top:0"><div class="lab">Экран</div><div class="chips">${SCRL.map(([id,l])=>chip(S.screen===id,'scr:'+id,l)).join('')}</div></div>
 ${st?`<div class="grp"><div class="lab">Состояние</div><div class="chips">${st}</div></div>`:''}
 <div class="grp"><div class="lab">Тема</div><div class="chips">${chip(S.theme==='light','th:light','Светлая')}${chip(S.theme==='dark','th:dark','Тёмная')}</div></div>
 <div class="grp"><div class="lab">Язык</div><div class="chips">${LANGS.map(l=>chip(S.lang===l,'lg:'+l,l)).join('')}</div></div>`}
{const _r=render;render=function(){const key=S.screen+'|'+S.wst;const ch=key!==S._lk;S._lk=key;_r();
 if(ch&&S.screen!=='50'){const sc=document.querySelector('#app .scr');if(sc)sc.scrollTop=0}
 const k=document.getElementById('kscr'),h=document.querySelector('.hdr.kh');
 if(k&&h){if(S.wst==='scrolled'&&!k._init){k._init=1;const m=document.getElementById('kmy');k.scrollTop=m?m.offsetTop-12:300}
  h.classList.toggle('sc',k.scrollTop>4);k.addEventListener('scroll',()=>h.classList.toggle('sc',k.scrollTop>4),{passive:true})}
 if(S.screen==='64'){const sc=document.querySelector('#app .scr');if(sc)sc.scrollTop=0}}}
