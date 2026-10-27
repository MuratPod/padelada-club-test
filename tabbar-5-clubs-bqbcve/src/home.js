/* ===== home-error-v1: экраны 30 (Главная), 31 (Paddy: нет сети), 32 (спецификация «Повторить») ===== */
const HT={
 greet:['Hola, Murat','Hola, Murat','Hi, Murat','Привет, Murat','Привіт, Murat'],
 search:['Falta uno · Busco jugadores','Falta un · Busco jugadors','Falta uno · Looking for players','Falta uno · Ищу игроков','Falta uno · Шукаю гравців'],
 myclub:['Mi club','El meu club','My club','Мой клуб','Мій клуб'],
 myclub_s:['Tus clubes y comunidades','Els teus clubs i comunitats','Your clubs and communities','Ваши клубы и сообщества','Ваші клуби та спільноти'],
 find:['Buscar club','Trobar club','Find a club','Найти клуб','Знайти клуб'],
 cta:['Juego ahora','Jugo ara','Playing now','Играю сейчас','Граю зараз'],
 where:['Dónde jugar','On jugar','Where to play','Где сыграть','Де зіграти'],
 all:['Ver todo','Veure-ho tot','See all','Все','Усі'],
 c1:['4 pistas libres hoy','4 pistes lliures avui','4 courts free today','4 корта свободно сегодня','4 корти вільні сьогодні'],
 c2:['2 pistas libres hoy','2 pistes lliures avui','2 courts free today','2 корта свободно сегодня','2 корти вільні сьогодні'],
 c3:['3 pistas libres hoy','3 pistes lliures avui','3 courts free today','3 корта свободно сегодня','3 корти вільні сьогодні'],
 c4:['1 pista libre hoy','1 pista lliure avui','1 court free today','1 корт свободен сегодня','1 корт вільний сьогодні'],
 c5:['5 pistas libres hoy','5 pistes lliures avui','5 courts free today','5 кортов свободно сегодня','5 кортів вільні сьогодні'],
 e_t:['No se pudo cargar','No s’ha pogut carregar','Couldn’t load','Не удалось загрузить','Не вдалося завантажити'],
 e_b:['Comprueba la conexión e inténtalo de nuevo.','Comprova la connexió i torna-ho a provar.','Check your connection and try again.','Проверьте соединение и повторите попытку.','Перевірте з’єднання й повторіть спробу.'],
 off:['Sin conexión','Sense connexió','No connection','Нет подключения','Немає підключення'],
 rt:['Reintentar','Reintenta','Retry','Повторить','Повторити'],
 profile:['Perfil','Perfil','Profile','Профиль','Профіль'],
};
const ht=k=>HT[k][LI[S.lang]];
const RTL=['Повторить','Повторити','Reintentar','Reintenta','Retry'];
T.net_retry=HT.rt;/* единый «Повторить» и на экране Paddy без сети */
const rtBtn=(o={})=>{const lab=o.label||ht('rt');const cls='pill pri retry'+(o.lg?' lg':'')+(o.cls?' '+o.cls:'');
 return `<button class="${cls}" ${o.load?'disabled aria-busy="true"':''} data-act="${o.act||'noop'}">${ic('refresh-cw',o.load?'spin':'')}<span>${esc(lab)}</span></button>`};
function hplate(off){
 const load=!!S.hLoad;
 return `<section class="hplate" role="alert"><span class="pi" aria-hidden="true">${ic(off?'wifi-off':'cloud-off')}</span><h3 class="${disp(ht('e_t')).trim()}">${esc(ht('e_t'))}</h3><p>${esc(ht('e_b'))}</p>${rtBtn({act:'hretry',load})}</section>`}
function screen30(){
 const st=S.wst||'ok';const err=st==='error',off=st==='offline';const gl=S.tabs==='glass'||st==='glass';
 const hdr=`<div class="hdr hh"><div class="ttl"><h1 class="${disp(ht('greet')).trim()}">${esc(ht('greet'))}</h1></div><button class="avatar a1 hav" data-act="noop" aria-label="${esc(ht('profile'))}">M</button></div>`;
 const search=`<button class="hs" data-act="noop">${ic('search','i24')}<span>${esc(ht('search'))}</span></button>`;
 const club=`<section class="hcard hclub"><button class="hrow" data-act="noop"><span class="lb"><b>${esc(ht('myclub'))}</b><small>${esc(ht('myclub_s'))}</small></span>${ic('chevron-right','i24')}</button><button class="hrow" data-act="noop"><span class="lb"><b>${esc(ht('find'))}</b></span>${ic('chevron-right','i24')}</button></section>`;
 const cta=off?`<button class="pill grey cta hcta" disabled data-act="noop">${ic('timer','i24')}<span>${esc(ht('cta'))}</span></button>`
   :`<button class="pill pri cta hcta" data-act="noop">${ic('timer','i24')}<span>${esc(ht('cta'))}</span></button>`;
 const card=(ico,cls,nm,sub,fr)=>`<button class="pcard" data-act="noop"><span class="ci ${cls}" aria-hidden="true">${ic(ico,'i24')}</span><span class="lb"><b>${esc(nm)}</b><small>${esc(sub)}</small><em>${esc(fr)}</em></span>${ic('chevron-right','i24')}</button>`;
 const where=err||off
  ?`<div class="hsec"><h2 class="${disp(ht('where')).trim()}">${esc(ht('where'))}</h2></div>${hplate(off)}`
  :`<div class="hsec"><h2 class="${disp(ht('where')).trim()}">${esc(ht('where'))}</h2><button class="hall" data-act="noop">${esc(ht('all'))}</button></div>${card('volleyball','','Club Pàdel Palamós','Palamós · 1,2 km',ht('c1'))}${card('volleyball','m','Pàdel Sant Feliu','Sant Feliu de Guíxols · 6 km',ht('c2'))}${gl?card('volleyball','','Padel Indoor Girona','Girona · 38 km',ht('c3'))+card('volleyball','m','Club Esportiu Calonge','Calonge · 11 km',ht('c4'))+card('volleyball','','Pàdel Platja d’Aro','Platja d’Aro · 9 km',ht('c5'))+card('volleyball','m','Padel Club Begur','Begur · 24 km',ht('c2'))+card('volleyball','','Pàdel Torroella','Torroella de Montgrí · 31 km',ht('c3'))+card('volleyball','m','Club Padel Roses','Roses · 52 km',ht('c4')):''}`;
 const ban=off?`<div class="hbn" role="status">${ic('wifi-off')}<span>${esc(ht('off'))}</span></div>`:'';
 return `${status()}${ban}${hdr}<div class="scr${gl?' gl':''}">${search}${club}${cta}${where}</div>${gl?tabbar('home').replace('<nav class="tabs ','<nav class="tabs glass '):tabbar('home')}`}
function screen31(){S.wst='offline';return screen8()}
function screen32(){
 const L=S.lang,lab=ht('rt');
 const sh=s=>`<div class="sh">${s}</div>`;
 const kv=(k,v)=>`<div class="skv"><span>${k}</span><b>${v}</b></div>`;
 const sw=c=>`<i class="swc" style="background:${c}"></i>`;
 const states=`<div class="sgrid">
  <div><button class="pill pri retry" data-act="noop">${ic('refresh-cw')}<span>${esc(lab)}</span></button><span class="sl">Обычная</span></div>
  <div><button class="pill pri retry is-press" data-act="noop" tabindex="-1">${ic('refresh-cw')}<span>${esc(lab)}</span></button><span class="sl">Нажата · scale .96, без тени</span></div>
  <div><button class="pill pri retry is-load" disabled aria-busy="true">${ic('refresh-cw','spin')}<span>${esc(lab)}</span></button><span class="sl">Загрузка · неактивна, иконка крутится</span></div>
  <div><button class="pill pri retry is-focus" data-act="noop" tabindex="-1">${ic('refresh-cw')}<span>${esc(lab)}</span></button><span class="sl">Фокус · кольцо 2 px, отступ 2 px</span></div></div>`;
 const sizes=`<div class="sgrid"><div><button class="pill pri retry" data-act="noop">${ic('refresh-cw')}<span>${esc(lab)}</span></button><span class="sl">48 · обычный случай</span></div>
  <div><button class="pill pri retry lg" data-act="noop">${ic('refresh-cw')}<span>${esc(lab)}</span></button><span class="sl">56 · единственное действие на экране</span></div></div>`;
 const params=`<div class="card">${kv('Фон',sw('#FF5E5B')+'coral #FF5E5B')}${kv('Текст и иконка',sw('#24123A')+'onBrand #24123A · 5,73:1')}${kv('Иконка','refresh-cw · 20 px · stroke 2')}${kv('Шрифт','Golos Text 700 · 15/18')}${kv('Высота','min 48 · 56 на весь экран')}${kv('Радиус','999 (пилюля)')}${kv('Тень','shadowCoral · только светлая; в тёмной нет')}${kv('Загрузка','surfaceSunk · inkMuted · aria-busy')}</div>`;
 const use=`<div class="suse"><span>Главная</span><span>Чат Paddy</span><span>Списки</span><span>Чаты</span><span>Матчи</span></div>`;
 const langs=`<div class="slang">${RTL.map(x=>`<button class="pill pri retry" data-act="noop" tabindex="-1">${ic('refresh-cw')}<span>${x}</span></button>`).join('')}</div>`;
 return `${status()}${whdr('Повторить','Единый компонент для всего приложения','','')}<div class="scr spec">${sh('Состояния')}${states}${sh('Размеры')}${sizes}${sh('Параметры')}${params}${sh('Где используется')}${use}${sh('Подписи: ru · uk · es · ca · en')}${langs}</div>`}
function screen33(){
 const nb=h=>h.replace(/data-act="[^"]*"/g,'data-act="noop"');
 const sh=x=>`<div class="sh">${x}</div>`,cap=x=>`<div class="cap">${x}</div>`;
 if(S.wst==='glass-vs-round'){
  const gl=(a,pr)=>nb(tabbar(a)).replace('<nav class="tabs ','<nav class="tabs glass ').replace(pr?new RegExp('(<div class="tab)("><svg[^>]*><use href="#i-'+pr+'")'):/$^/,'$1 is-press$2');
  const rd=a=>nb(tabbar(a));
  const bz=(k)=>({
   a:`<i class="b c" style="left:-10px;top:-8px;width:120px;height:64px"></i><i class="b n" style="left:104px;top:-8px;width:110px;height:64px"></i><i class="b m" style="left:208px;top:-8px;width:150px;height:64px"></i><i class="b k" style="left:20px;top:70px;width:90px;height:14px"></i><i class="b o c" style="left:250px;top:62px;width:44px;height:44px"></i><i class="b o n" style="left:302px;top:62px;width:44px;height:44px"></i><i class="b o k" style="left:150px;top:60px;width:44px;height:44px"></i>`,
   b:`<span class="tx" style="left:14px;top:6px">Padelada · Palamós</span><i class="b m" style="left:14px;top:50px;width:170px;height:80px"></i><i class="b k" style="left:196px;top:50px;width:90px;height:80px"></i><i class="b c" style="left:298px;top:50px;width:90px;height:80px"></i><i class="b n" style="left:60px;top:96px;width:260px;height:30px"></i>`
  })[k];
  const box=(inner,k)=>`<div class="tgbox">${bz(k)}${inner}</div>`;
  return `${status()}${whdr('Таб-бар','Круг mango и стекло поверх пёстрого контента','','')}<div class="scr tcmp">${sh('Круг mango · утверждён')}${box(rd('home'),'a')}${cap('Бар непрозрачный: контент под ним скрыт')}
  ${sh('Стекло · Главная активна')}${box(gl('home'),'a')}${cap('Бар blur 22 px + saturate 1,4, линза 44 px с кромкой и дугой')}
  ${sh('Стекло · Чаты активна')}${box(gl('chats'),'b')}${cap('Пёстрый фон: coral, mango, mint, ink, текст 28 px')}
  ${sh('Стекло · нажата «Матчи»')}${box(gl('x','volleyball'),'a')}${cap(':active — линза ×1,12 и ярче (180 мс, пружина)')}
  ${sh('Стекло · бар 340 px')}<div class="w340">${box(gl('profile'),'b')}</div></div>`}
 const old=a=>nb(tabbar(a)).replace('<nav class="tabs ','<nav class="tabs old ');
 const nw=a=>nb(tabbar(a));
 return `${status()}${whdr('Таб-бар','Овал → круг у активной вкладки','','')}<div class="scr tcmp">${sh('Было · овал')}${old('home')}${cap('Главная активна: mango-пилюля 1,25× шире соседей')}
 ${sh('Стало · круг 40 px')}${nw('home')}${nw('matches')}${nw('chats')}${nw('profile')}${cap('Круг вокруг иконки, подпись под ним, бар 64 px')}
 ${sh('Стало · бар 340 px')}<div class="w340">${nw('home')}${nw('profile')}</div>${sh('Было · бар 340 px')}<div class="w340">${old('home')}</div></div>`}
Object.assign(WST,{'33':[['cmp','Овал и круг'],['glass-vs-round','Стекло и круг']],'30':[['ok','Норма'],['error','Ошибка загрузки'],['offline','Нет подключения'],['glass','Стекло + скролл']],'31':[['offline','Paddy без сети']],'32':[['spec','Спецификация']]});
Object.assign(SCR,{'33':()=>screen33(),'30':()=>screen30(),'31':()=>screen31(),'32':()=>screen32()});
SCRL.splice(0,SCRL.length,['30','Главная'],['31','Paddy: нет сети'],['32','«Повторить»: спецификация'],['33','Таб-бар: сравнение']);
{const _wa=waveAct;waveAct=function(k,p){if(k==='hretry'){if(S.hLoad)return true;S.hLoad=true;clearTimeout(S._ht);S._ht=setTimeout(()=>{S.hLoad=false;S.wst='ok';render()},1400);return true}return _wa(k,p)}}
/* переключатель таб-бара «круг mango / стекло» (панель + ?tabs=glass), прокрутка под бар в состоянии «Стекло + скролл» */
S.tabs=(new URLSearchParams(location.search).get('tabs')==='glass')?'glass':'round';
{const _wa2=waveAct;waveAct=function(k,p){if(k==='tbs'){S.tabs=p[0]==='glass'?'glass':'round';return true}return _wa2(k,p)}}
{const _r=render;render=function(){_r();const key=S.screen+'|'+S.wst+'|'+S.lang+'|'+S.theme;
 if(S.screen==='30'&&S.wst==='glass'&&S._gk!==key){const sc=document.querySelector('#app .scr');if(sc)sc.scrollTop=170}
 S._gk=key}}

/* ===== экран 34: «Таб-бар: размеры» (v2): размеры поверх Главной со скроллом + лист значений и запасов ===== */
/*@@TBM@@*/
const fmt1=n=>(Math.round(n*10)/10).toString().replace('.',',');
function screen34(){
 const nb=h=>h.replace(/data-act="[^"]*"/g,'data-act="noop"');
 const sh=x=>`<div class="sh">${x}</div>`;
 if(S.wst==='sheet'){
  const gl=a=>nb(tabbar(a)).replace('<nav class="tabs ','<nav class="tabs glass ');
  const bk=`<i class="b c" style="left:-10px;top:-8px;width:130px;height:62px"></i><i class="b n" style="left:112px;top:-8px;width:120px;height:62px"></i><i class="b m" style="left:226px;top:-8px;width:220px;height:62px"></i><i class="b k" style="left:20px;top:60px;width:100px;height:12px"></i>`;
  const frame=(W,a)=>{const s=Math.min(1,((document.getElementById('app')||{clientWidth:440}).clientWidth-32)/W);return `<div class="tbo" style="height:${Math.round(112*s)+8}px"><div class="tbfit" style="width:${W}px;transform:scale(${s.toFixed(3)})"><div class="wl">${W} pt</div><div class="tbw" style="width:${W}px">${bk}${gl(a)}</div></div></div>`};
  let tab='';
  if(TBM){
   tab=`<table><tr><th>Ширина</th><th>Ячейка</th><th>Шрифт</th><th>край ячейки</th><th>меж. подп.</th><th>контур</th></tr>`+TBM.rows.map(r=>`<tr><td>${r.W}</td><td>${fmt1(r.cell)}</td><td>${r.font}</td><td class="${r.cedge>=4?'ok':'bad'}">${fmt1(r.cedge)}</td><td class="${r.gap>=6?'ok':'bad'}">${fmt1(r.gap)}</td><td class="${r.outl>=5?'ok':'bad'}">${fmt1(r.outl)}</td></tr>`).join('')+`</table>`;
   tab+=sh('Ширина подписей, pt · 600')+`<table><tr><th>Язык</th><th>12 pt</th><th>11 pt</th></tr>`+Object.keys(TBM.tw).map(l=>`<tr><td>${l}</td><td>${TBM.tw[l]['12'].map(fmt1).join(' · ')}</td><td>${TBM.tw[l]['11'].map(fmt1).join(' · ')}</td></tr>`).join('')+`</table>`;
  }
  const kv=(k,v)=>`<div class="skv"><span>${k}</span><b>${v}</b></div>`;
  const vals=`<div class="card">${kv('Капсула','72 pt · радиус 999')}${kv('Поля слева/справа','12 pt (при ширине < 340: 8)')}${kv('Внутренний отступ','14 pt')}${kv('Ячейка','(W − 2·поле − 2·14 − 64) / 4')}${kv('Paddy D1','64 × 48, по центру')}${kv('Вертикаль','6 · линза 44 · подпись 14 · 8')}${kv('Подпись','Golos 600 · 12/14 (W < 375: 11/14)')}${kv('Низ','max(12, safe − 14)')}${kv('Низ контента','72 + низ + 16')}</div>`;
  return `${status()}${whdr('Таб-бар: размеры','v2 · замечания к TestFlight 101','','')}<div class="scr spec tbsh">${sh('Значения')}${vals}${sh('Живые бары по ширинам')}${frame(320,'home')}${frame(360,'profile')}${frame(390,'matches')}${frame(430,'chats')}${sh('Запасы по измерению, pt')}${tab}</div>`}
 const w=S.wst;S.wst='glass';const h=screen30();S.wst=w;
 return `${h}<div class="hind"></div><div class="tbann"></div>`}
function tbAnnotate(){
 const app=document.getElementById('app'),box=app&&app.querySelector('.tbann'),nav=app&&app.querySelector('.tabs.glass');if(!box||!nav)return;
 const A=app.getBoundingClientRect(),B=nav.getBoundingClientRect(),cs=[...nav.querySelectorAll('.tab:not(.pdx)')].map(e=>e.getBoundingClientRect());
 const rx=x=>x-A.left,ry=y=>y-A.top,col='#FFA62B',col2='#FF5E5B';let s='',c='';
 const ln=(x1,y1,x2,y2,k=col)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${k}" stroke-width="2"/>`;
 const vd=(x,y1,y2,k=col)=>ln(x,y1,x,y2,k)+ln(x-5,y1,x+5,y1,k)+ln(x-5,y2,x+5,y2,k);
 const hd=(x1,x2,y,k=col)=>ln(x1,y,x2,y,k)+ln(x1,y-5,x1,y+5,k)+ln(x2,y-5,x2,y+5,k);
 const chip=(x,y,t)=>`<div class="ch" style="left:${x}px;top:${y}px">${t}</div>`;
 const W=A.width,bt=ry(B.top),bb=ry(B.bottom),bl=rx(B.left),br=rx(B.right),f=parseFloat(getComputedStyle(nav.querySelector('.tab:not(.pdx) span')).fontSize);
 const bot=Math.round((A.bottom-B.bottom)*10)/10,mg=bl;
 /* высота */ s+=vd(W-6,bt,bb);c+=chip(W-52,bt-30,'высота '+fmt1(B.height))+ln(W-6,bt-12,W-6,bt-2,col);
 /* низ */ s+=vd(26,bb,ry(A.bottom));c+=chip(70,bb+(bot-18)/2,fmt1(bot)+' pt');
 /* поля */ s+=hd(0,bl,bt+B.height/2,col2)+hd(br,W,bt+B.height/2,col2);c+=chip(Math.max(bl/2,14),bt+B.height/2-9-0,fmt1(mg));
 /* ячейка */ const cy=bt-6,cc=rx(cs[2].left+cs[2].width/2);s+=hd(rx(cs[2].left),rx(cs[2].right),cy,col2)+ln(cc,bt-34,cc,cy,col2);c+=chip(cc,bt-52,'ячейка '+fmt1(cs[2].width));
 /* подпись */ const lc=rx(cs[3].left+cs[3].width/2);s+=ln(lc,ry(cs[3].top)+66,lc,bb+4,col);c+=chip(Math.min(lc,W-52),bb+(bot-18)/2,fmt1(f)+'/14 · 600');
 /* низ контента */ s+=`<line x1="0" y1="${bt-16}" x2="${W}" y2="${bt-16}" stroke="${col}" stroke-width="1.5" stroke-dasharray="5 4"/>`;c+=chip(118,bt-16-9,'контент заканчивается +16');
 box.innerHTML=`<svg viewBox="0 0 ${W} ${A.height}" preserveAspectRatio="none">${s}</svg>${c}`}
Object.assign(WST,{'34':[['spec','Размеры'],['sheet','Лист']]});
Object.assign(SCR,{'34':()=>screen34()});
SCRL.push(['34','Таб-бар: размеры']);
{const _r2=render;render=function(){_r2();
 if(S.screen==='34'&&S.wst==='spec'){const sc=document.querySelector('#app .scr');if(sc)sc.scrollTop=170;tbAnnotate()}}}
