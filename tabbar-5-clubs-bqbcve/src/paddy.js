/* ===== paddy-screen-v1: экран Paddy (40) и сравнение шапок A/B (41). Кликабельный прототип. ===== */
const PT={
 mic:['Mensaje de voz','Missatge de veu','Voice message','Голосовое сообщение','Голосове повідомлення'],
 snd:['Enviar','Envia','Send','Отправить','Надіслати'],
 btn:['Qué sé hacer','Què sé fer','What I can do','Что умею','Що вмію'],
 sh_t:['Qué sé hacer','Què sé fer','What I can do','Что я умею','Що я вмію'],
 c1t:['Buscar partida','Trobar partida','Find a game','Найти игру','Знайти гру'],
 c1d:['Partidos por nivel y hora','Partits per nivell i hora','Matches by level and time','Матчи по уровню и времени','Матчі за рівнем і часом'],
 c2t:['Crear Falta uno','Crear Falta un','Create a Falta uno','Создать Falta uno','Створити Falta uno'],
 c2d:['Aviso al que falta','Avís al que falta','Call the missing one','Позову недостающего','Покличу бракуючого'],
 c3t:['Reglas y marcador','Regles i marcador','Rules and score','Правила и счёт','Правила й рахунок'],
 c3d:['Reglas y cómo anotar','Regles i com anotar','Rules and scoring','Правила и как вести счёт','Правила й як вести рахунок'],
 c4t:['Mi nivel','El meu nivell','My rating','Мой рейтинг','Мій рейтинг'],
 c4d:['Tu nivel y su evolución','El teu nivell i evolució','Your level and trend','Ваш уровень и динамика','Ваш рівень і динаміка'],
 c5t:['Memoria','Memòria','Memory','Память','Пам’ять'],
 c5d:['Qué recuerdo de ti; puedes borrarlo','Què recordo de tu; pots esborrar-ho','What I remember; you can erase it','Что я помню о вас; можно стереть','Що я пам’ятаю про вас; можна стерти'],
 c6t:['Ajustes de Paddy','Ajustos de Paddy','Paddy settings','Настройки Paddy','Налаштування Paddy'],
 c6d:['Modo espera y resumen del día','Mode espera i resum del dia','Standby mode and daily digest','Режим ожидания и сводка дня','Режим очікування і зведення дня'],
 foot:['Paddy es un ayudante de IA y puede equivocarse: comprueba sus respuestas antes de actuar.','Paddy és un ajudant d’IA i es pot equivocar: comprova’n les respostes abans d’actuar.','Paddy is an AI helper and can make mistakes: check its answers before you act.','Paddy — ИИ-помощник и может ошибаться: проверяйте его ответы, прежде чем действовать.','Paddy — ШІ-помічник і може помилятися: перевіряйте його відповіді, перш ніж діяти.'],
 hint:['Aquí está todo lo que sé hacer','Aquí hi ha tot el que sé fer','Everything I can do is here','Здесь всё, что я умею','Тут усе, що я вмію'],
 yday:['Ayer','Ahir','Yesterday','Вчера','Вчора'],
 u1:['Apúntame el viernes a las 19:00','Apunta’m divendres a les 19:00','Sign me up for Friday at 7 pm','Запиши меня на пятницу в 19:00','Запиши мене на п’ятницю о 19:00'],
 p1:['He encontrado dos partidos en Palamós: 19:00 y 20:30. ¿Cuál te va mejor?','He trobat dos partits a Palamós: 19:00 i 20:30. Quin et va millor?','I found two matches in Palamós: 7:00 pm and 8:30 pm. Which suits you?','Нашёл два матча в Palamós: 19:00 и 20:30. Какой вам подходит?','Знайшов два матчі в Palamós: 19:00 і 20:30. Який вам підходить?'],
 u2:['19:00, gracias','19:00, gràcies','7 pm, thanks','19:00, спасибо','19:00, дякую'],
 p2:['Hecho: estás apuntado a las 19:00 en Club Pàdel Palamós.','Fet: estàs apuntat a les 19:00 al Club Pàdel Palamós.','Done: you’re signed up for 7:00 pm at Club Pàdel Palamós.','Готово: вы записаны на 19:00 в Club Pàdel Palamós.','Готово: ви записані на 19:00 у Club Pàdel Palamós.'],
 u3:['¿Jugamos igual el sábado?','Juguem igual dissabte?','Same again on Saturday?','Сыграем так же в субботу?','Зіграємо так само в суботу?'],
 p3:['Claro. Sueles jugar por la tarde en Club Pàdel Palamós, nivel 2,5. ¿Busco igual?','És clar. Sols jugar a la tarda al Club Pàdel Palamós, nivell 2,5. Ho busco igual?','Sure. You usually play in the evening at Club Pàdel Palamós, level 2.5. Search the same way?','Конечно. Вы обычно играете вечером в Club Pàdel Palamós, уровень 2,5. Искать так же?','Звісно. Ви зазвичай граєте ввечері в Club Pàdel Palamós, рівень 2,5. Шукати так само?'],
 mem:['De la memoria: club, nivel, hora','De la memòria: club, nivell, hora','From memory: club, level, time','Из памяти: клуб, уровень, время','З пам’яті: клуб, рівень, час'],
 r1:['Vale, busquemos partida. ¿Qué día y a qué hora?','Vinga, busquem partida. Quin dia i a quina hora?','Okay, let’s find a game. Which day and what time?','Хорошо, давайте найдём игру. На какой день и время?','Добре, знайдімо гру. На який день і час?'],
 r2:['Creamos un Falta uno. ¿Cuántos jugadores faltan y a qué hora?','Creem un Falta un. Quants jugadors falten i a quina hora?','Let’s create a Falta uno. How many players are missing, and when?','Создадим Falta uno. Сколько игроков не хватает и во сколько?','Створимо Falta uno. Скількох гравців бракує і о котрій?'],
 r3:['Pregúntame lo que quieras: saque, puntos, marcador. Te lo explico con un ejemplo.','Pregunta’m el que vulguis: servei, punts, marcador. T’ho explico amb un exemple.','Ask me anything: serve, points, scoring. I can explain with an example.','Спрашивайте про правила: подача, очки, счёт. Объясню на примере.','Питайте про правила: подача, очки, рахунок. Поясню на прикладі.'],
 r4:['Tu nivel ahora es 2,5. ¿Quieres ver de qué se compone?','El teu nivell ara és 2,5. Vols veure de què es compon?','Your rating is 2.5 right now. Want to see what it’s made of?','Ваш рейтинг сейчас 2,5. Хотите увидеть, из чего он сложился?','Ваш рейтинг зараз 2,5. Хочете побачити, із чого він склався?'],
 r5:['Recuerdo tu club, tu nivel y la hora que te va bien. ¿Borro algo?','Recordo el teu club, el teu nivell i l’hora que et va bé. Esborro alguna cosa?','I remember your club, your level and the time that suits you. Erase anything?','Я помню ваш клуб, уровень и удобное время. Что-то стереть?','Я пам’ятаю ваш клуб, рівень і зручний час. Щось стерти?'],
 r6:['Ajustes de Paddy: modo espera, memoria y resumen del día. ¿Qué abro?','Ajustos de Paddy: mode espera, memòria i resum del dia. Què obro?','Paddy settings: standby mode, memory and daily digest. What should I open?','Настройки Paddy: режим ожидания, память, сводка дня. Что открыть?','Налаштування Paddy: режим очікування, пам’ять, зведення дня. Що відкрити?'],
 gd:['Entendido. Puedo buscar partida, crear un Falta uno, explicar las reglas o mostrar tu nivel. ¿Qué eliges?','Entès. Puc buscar partida, crear un Falta un, explicar les regles o mostrar el teu nivell. Què tries?','Got it. I can find a game, create a Falta uno, explain the rules or show your rating. What would you like?','Понял вас. Могу найти игру, создать Falta uno, объяснить правила или показать рейтинг. Что выберете?','Зрозумів вас. Можу знайти гру, створити Falta uno, пояснити правила або показати рейтинг. Що оберете?'],
 demo:['Demo','Demo','Demo','Демо','Демо'],
};
const pt=k=>PT[k][LI[S.lang]];
const PICON=(new URLSearchParams(location.search).get('icon')==='sparkles')?'sparkles':'layout-grid';
const PCARDS=[null,['search','c1','r1','sport'],['user-round-plus','c2','r2','hello'],['book-open','c3','r3','think'],['trophy','c4','r4','joy'],['brain','c5','r5','think'],['settings','c6','r6','calm']];
S.pv={variant:'A',sheet:false,mode:'chat',extra:[],text:'',typing:false,hint:true,closing:false,load:false,skip:false,wave:false};
const PST={chat:{m:'chat'},sheet:{m:'chat',s:1},empty:{m:'empty'},offline:{m:'offline'},chatB:{m:'chat',v:'B'},sheetB:{m:'chat',s:1,v:'B'}};
function pDev(){const se=innerHeight<=700;document.body.classList.toggle('dse',se);document.body.classList.toggle('pillpeek',new URLSearchParams(location.search).get('pill')==='peek')}
window.addEventListener('resize',pDev);
function onSetView(o){
 pDev();if(typeof cOnSet==='function')cOnSet(o);
 if(o.screen!=='40'&&o.screen!=='41')return;
 const c=PST[o.state]||PST.chat;
 S.pv={variant:(o.variant==='B'||c.v==='B')?'B':'A',sheet:!!c.s,mode:c.m,extra:[],text:'',typing:false,hint:true,closing:false,load:false,skip:false,wave:false};
}
const pDate=k=>`<div style="align-self:center"><span class="tag" style="background:var(--surfaceSunk);color:var(--inkMuted)">${esc(k)}</span></div>`;
const pOwn=(txt,time='9:41')=>`<div class="mrow own"><div class="bub"><div class="tx">${esc(txt)}</div>${meta(time,true,'read')}</div></div>`;
const pPd=(body,emo,time='9:41')=>`<div class="mrow emo1">${emoSvg(emo,88,'pf')}<div class="bub pbd"><div class="nm">Paddy</div>${body}<div class="meta"><span>${time}</span></div></div></div>`;
const pTx=s=>`<div class="tx">${esc(s)}</div>`;
function pChips(){const L=[['users','pc_find','find'],['volleyball','pc_play','play'],['plus','o5_new','new']];
 return `<div class="pchips" role="group" aria-label="${esc(t('a_t'))}">${L.map(([i,k,a])=>`<button class="pill out" data-act="pchip:${a}">${ic(i,'i22')}<span>${esc(t(k))}</span></button>`).join('')}</div>`}
function pMsgsHtml(){
 const m=S.pv.mode;let h='';
 const hist3=()=>pDate(t('today'))+pOwn(pt('u3'),'9:38')+pPd(pTx(pt('p3'))+`<div class="rmn pmem">${ic('brain','i14')}<span>${esc(pt('mem'))}</span></div>`,'think','9:38');
 if(m==='empty'){
  h+=`<div class="phero" role="img" aria-label="Paddy">${emoSvg('hello',132,'')}</div>`+`<div class="mrow pgreet"><div class="bub pbd"><div class="nm">Paddy</div><b class="pgt">${esc(t('w_t'))}</b>${pTx(lt('w_msg'))}<div class="meta"><span>9:41</span></div></div></div>`+pChips();
 }else if(m==='offline'){
  h+=hist3()+pPd(`<b class="pgt">${esc(t('net_t'))}</b>${pTx(t('net_b'))}<div class="rmn">${ic('info','i14')}<span>${esc(t('ph_n'))}</span></div>`,'oops','9:41');
 }else{
  h+=pDate(pt('yday'))+pOwn(pt('u1'),'18:20')+pPd(pTx(pt('p2')),'joy','18:20')+hist3();
 }
 for(const x of S.pv.extra){
  if(x.own)h+=pOwn(x.text);
  else h+=pPd(pTx(x.key?pt(x.key):x.text),x.emo);
 }
 if(S.pv.typing)h+=`<div class="mrow emo1">${emoSvg('think',88,'pf')}<div class="bub typ" role="img" aria-label="${esc(t('typing_n',{n:'Paddy'}))}"><i></i><i></i><i></i></div></div>`;
 return h}
function pRefreshMsgs(){const el=document.querySelector('.pmsgs');if(el){el.innerHTML=pMsgsHtml();el.scrollTop=el.scrollHeight}}
function pReply(rp){S.pv.typing=true;pRefreshMsgs();const mode=S.pv.mode;
 setTimeout(()=>{S.pv.typing=false;S.pv.extra.push({pd:true,key:rp.key,emo:rp.emo});pRefreshMsgs()},BARE?0:900)}
function pReplyFor(x){const s=x.toLowerCase();
 if(/regl|rule|правил|счёт|счет|рахун|marcador|score|punt|очк/.test(s))return {key:'r3',emo:'think'};
 if(/nivel|nivell|level|rating|рейтинг|рівень|уровень/.test(s))return {key:'r4',emo:'joy'};
 if(/memor|памят|пам’ят|помн|recuer|record|remember/.test(s))return {key:'r5',emo:'think'};
 if(/partid|partit|match|матч|игр|гру|jug|joc|play|busc|шук|ищу|find|falta/.test(s))return {key:'r1',emo:'sport'};
 return {key:'gd',emo:'hello'}}
function pSend(){const f=document.querySelector('.pcomp .inf');const txt=(S.pv.text||'').trim();if(!txt||S.pv.mode==='offline')return;
 S.pv.extra.push({own:true,text:txt});S.pv.text='';if(f){f.value='';f.style.height='48px'}pSyncComp();pRefreshMsgs();pReply(pReplyFor(txt))}
const pRight=(typed,dis)=>`<button class="ibtn mic" ${dis?'disabled ':''}data-act="noop" aria-label="${esc(pt('mic'))}">${ic('mic','i22')}</button><button class="ibtn snd${typed?' on':''}" ${typed?'':'disabled aria-disabled="true" '}data-act="psend" aria-label="${esc(pt('snd'))}">${ic('arrow-up','i22')}</button>`;
function pSyncComp(){const r=document.querySelector('.pcomp .pr');if(r)r.innerHTML=pRight(!!S.pv.text&&S.pv.mode!=='offline',S.pv.mode==='offline')}
function pComp(dis){const ph=esc(dis?t('net_t'):t('ph'));
 return `<div class="pcomp"><textarea class="inf" rows="1" ${dis?'disabled ':''}placeholder="${ph}" aria-label="${ph}">${esc(S.pv.text)}</textarea><span class="pr">${pRight(!!S.pv.text&&!dis,dis)}</span></div>`}
function pHdr(v,mode,dead){
 const emo=mode==='offline'?'oops':mode==='empty'?'joy':'hello';
 const fig=emoSvg(emo,80,'');
 const left=v==='A'?`<div class="pfig${S.pv.wave?' wv':''}" data-act="pwave" role="img" aria-label="Paddy">${fig}</div>`
  :`<button class="pfig pbtn" data-act="psheet" aria-label="Paddy · ${esc(pt('btn'))}" aria-haspopup="dialog">${fig}</button>`;
 const right=v==='A'?`<button class="circ pglass" data-act="psheet" aria-label="${esc(pt('btn'))}" aria-haspopup="dialog" aria-expanded="${!!S.pv.sheet}">${ic(PICON,'i24')}</button>`
  :`<button class="circ pglass" data-act="pgear" aria-label="${esc(pt('c6t'))}">${ic('settings','i24')}</button>`;
 const h=`<header class="hdr phdr">${left}<div class="ttl"><h1 class="${disp('Paddy').trim()}">Paddy</h1><p>${esc(t('pd_sub'))}</p></div>${right}</header>`;
 return dead?h.replace(/data-act="[^"]*"/g,'data-act="noop"').replace(/ aria-expanded="[^"]*"/,''):h}
function pSheet(){
 if(!S.pv.sheet)return '';
 const cards=[1,2,3,4,5,6].map(n=>{const [i,c]=PCARDS[n];return `<button class="pcardx" data-act="pcard:${n}"><span class="pci ${c}" aria-hidden="true">${ic(i,'i24')}</span><b>${esc(pt('c'+n+'t'))}</b><small>${esc(pt('c'+n+'d'))}</small></button>`}).join('');
 return `<div class="pscrim" data-act="pclose"></div><div class="psheet" role="dialog" aria-modal="true" aria-label="${esc(pt('sh_t'))}"><div class="pgz"><div class="grab"></div><div class="sh-h"><h2 class="${disp(pt('sh_t')).trim()}">${esc(pt('sh_t'))}</h2>${closeX('pclose')}</div></div><div class="pgrid">${cards}</div><p class="pfoot">${esc(pt('foot'))}</p></div>`}
function pTabs(){return tabbar('paddy').replace('<nav class="tabs ','<nav class="tabs glass ').replace(/<div class="tab( on)?">([\s\S]*?)<\/div>/g,(m,a,b)=>`<button class="tab${a||''}" data-act="ptab">${b}</button>`)}
function pDemo(){
 const b=(on,a,l,al)=>`<button class="${on?'on':''}" data-act="${a}" aria-pressed="${on}"${al?` aria-label="${al}"`:''}>${l}</button>`;
 const v=S.pv.variant,m=S.pv.mode;
 return `<div class="pdemo" role="group" aria-label="Демо"><div class="sg">${b(v==='A','pvar:A','A','Вариант A')}${b(v==='B','pvar:B','B','Вариант B')}</div><div class="sg">${b(m==='chat','pstate:chat','Чат')}${b(m==='empty','pstate:empty','Пусто')}${b(m==='offline','pstate:offline','Нет сети')}</div></div>`}
function screen40(){
 const v=S.pv.variant,m=S.pv.mode,off=m==='offline';
 const hint=(v==='A'&&m==='empty'&&S.pv.hint&&!S.pv.sheet)?`<button class="phint" data-act="phintx"><span>${esc(pt('hint'))}</span></button>`:'';
 const net=off?`<div class="pnet" role="status">${rtBtn({act:'pretry',load:S.pv.load})}</div>`:'';
 return `${status()}${BARE?'':pDemo()}<div class="pscr">${pHdr(v,m)}<div class="pmsgs${hint?' pem':''}">${pMsgsHtml()}</div>${hint}</div>${net}${pComp(off)}${pTabs()}${pSheet()}`}
function screen41(){
 const sh=x=>`<div class="sh">${x}</div>`,cap=x=>`<div class="cap">${x}</div>`;
 const frm=v=>`<div class="pfrm">${pHdr(v,'chat',true)}</div>`;
 const why=[
  ['Видно ли, где функции','Одна видимая кнопка в углу, значок «сетка» читается как меню. Находят без подсказки.','Вход — сам Paddy, у него нет вида кнопки. Новичок не поймёт, что на него можно нажать.'],
  ['Что значит значок','Сетка — «список того, что умею». Настройки спрятаны внутри листа.','Шестерёнка — это «настройки приложения», по ней ждут переключатели, а не список умений.'],
  ['Нажатие на Paddy','Paddy живой: нажали — он машет. Ничего не ломается, случайный тап безвреден.','Нажатие открывает лист. Невидимая кнопка: для VoiceOver и новичка вход теряется.'],
  ['Первое открытие','В пустом чате подсказка «Здесь всё, что я умею» указывает на кнопку.','Подсказку некуда поставить: она бы указывала на самого Paddy.'],
  ['Настройки Paddy','Последняя карточка листа: один вход, нет второй кнопки.','Отдельная кнопка всегда на виду, но один из двух углов занят редким действием.'],
  ['Размер нажатия','Кнопка 48×48, фигурка не нажимается.','Фигурка 80×88 и шестерёнка 48×48: оба достаточно крупные.'],
 ];
 const items=why.map(([k,a,b])=>`<div class="pwhy"><b>${esc(k)}</b><p><i class="ab a">A</i>${esc(a)}</p><p><i class="ab">B</i>${esc(b)}</p></div>`).join('');
 return `${status()}${whdr('Шапка Paddy','Вариант A или B','','')}<div class="scr spec">${sh('A · кнопка «Что умею» · рекомендую')}${frm('A')}${cap('Paddy стоит слева и машет по нажатию. Справа одна стеклянная кнопка, лист открывается по ней.')}
 ${sh('B · шестерёнка и нажатие на Paddy')}${frm('B')}${cap('Шестерёнка справа ведёт в настройки Paddy, нажатие на Paddy открывает тот же лист.')}
 ${sh('Почему рекомендую A')}${items}${sh('Три варианта для решения')}<div class="suse"><span>A · рекомендую</span><span>B · вариант App Manager</span><span>Не менять: как в сборке 100</span></div></div>`}
Object.assign(WST,{'40':[['chat','Чат'],['sheet','Лист «Что умею»'],['empty','Пустой чат'],['offline','Нет сети'],['chatB','Шапка B'],['sheetB','Лист в B']],'41':[['cmp','Сравнение A и B']]});
Object.assign(SCR,{'40':()=>screen40(),'41':()=>screen41()});
SCRL.splice(0,SCRL.length,['40','Экран Paddy'],['41','Шапка: A или B']);
/* ---- действия ---- */
function pCloseSheet(after){
 const sh=document.querySelector('.psheet');if(!sh||S.pv.closing){S.pv.sheet=false;return}
 S.pv.closing=true;sh.classList.add('closing');const sc=document.querySelector('.pscrim');if(sc)sc.classList.add('closing');
 setTimeout(()=>{S.pv.closing=false;S.pv.sheet=false;render();if(after)after()},BARE?0:210)}
function pCard(n){
 const el=document.querySelector('.pcardx[data-act="pcard:'+n+'"]');if(el)el.classList.add('is-press');
 setTimeout(()=>pCloseSheet(()=>{const c=PCARDS[n];pReply({key:c[2],emo:c[3]})}),BARE?0:150)}
{const _w=waveAct;waveAct=function(k,p){
 switch(k){
  case 'psheet':if(S.pv.sheet){S.pv.skip=true;pCloseSheet();return true}S.pv.sheet=true;S.pv.hint=false;return true;
  case 'pclose':S.pv.skip=true;pCloseSheet();return true;
  case 'pwave':{S.pv.skip=true;const f=document.querySelector('.pfig');if(f){f.classList.remove('wv');void f.offsetWidth;f.classList.add('wv')}return true}
  case 'pcard':S.pv.skip=true;pCard(+p[0]);return true;
  case 'pchip':{S.pv.skip=true;const mp={find:['pc_find','r1','sport'],play:['pc_play','r1','sport'],new:['o5_new','r2','hello']}[p[0]];S.pv.extra.push({own:true,text:t(mp[0])});pRefreshMsgs();pReply({key:mp[1],emo:mp[2]});return true}
  case 'psend':S.pv.skip=true;pSend();return true;
  case 'pgear':S.pv.skip=true;pReply({key:'r6',emo:'calm'});return true;
  case 'ptab':toast();return true;
  case 'phintx':S.pv.hint=false;return true;
  case 'cpos':S.cv.pull=p[0]==='p';S.cv.sy=p[0]==='m'?-1:p[0]==='s'?360:0;return true;
  case 'cspr':S.cv.pull=false;S.cv.sy=0;S.cv.spr=true;return true;
  case 'cun':S.cv.unread=p[0]==='1';return true;
  case 'pvar':S.pv.variant=p[0]==='B'?'B':'A';S.pv.sheet=false;return true;
  case 'pstate':{const x=p[0];S.pv.mode=x;S.pv.extra=[];S.pv.sheet=false;S.pv.text='';S.pv.hint=true;S.pv.typing=false;S.pv.load=false;return true}
  case 'pretry':if(S.pv.load)return true;S.pv.load=true;setTimeout(()=>{S.pv.load=false;S.pv.mode='chat';render()},BARE?0:1400);return true;
 }
 return _w(k,p)}}
{const _r=render;let keyL='',topL=0;render=function(){
 if(S.pv&&S.pv.skip){S.pv.skip=false;return}
 const m0=document.querySelector('.pmsgs');if(m0)topL=m0.scrollTop;
 _r();
 const m=document.querySelector('.pmsgs');
 if(m){const key=S.screen+'|'+S.pv.mode+'|'+S.lang+'|'+S.theme+'|'+S.pv.variant;m.scrollTop=(key===keyL&&m0)?topL:m.scrollHeight;keyL=key}
 }}
/* ввод: не даём общему обработчику мессенджера (ST3) перехватить поле */
document.addEventListener('input',e=>{const f=e.target;if(!f.classList||!f.classList.contains('inf')||!f.closest('.pcomp'))return;
 e.stopImmediatePropagation();const had=!!S.pv.text;S.pv.text=f.value;f.style.height='auto';f.style.height=Math.max(48,Math.min(f.scrollHeight+2,136))+'px';if(had!==!!S.pv.text)pSyncComp()},true);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&S.pv.sheet){S.pv.skip=false;pCloseSheet();return}
 if(e.key==='Enter'&&!e.shiftKey&&e.target.classList&&e.target.classList.contains('inf')&&e.target.closest('.pcomp')){e.preventDefault();pSend()}},true);
/* свайп вниз по ручке и заголовку листа закрывает его */
{let sw=null;
 document.addEventListener('pointerdown',e=>{const g=e.target.closest('.pgz');if(!g||e.target.closest('button'))return;const sh=g.closest('.psheet');sw={y:e.clientY,t:Date.now(),sh,dy:0,sc:document.querySelector('.pscrim')};sh.style.animation='none';sh.style.transition='none';try{g.setPointerCapture(e.pointerId)}catch(_){}});
 document.addEventListener('pointermove',e=>{if(!sw)return;sw.dy=Math.max(0,e.clientY-sw.y);sw.sh.style.transform='translateY('+sw.dy+'px)';if(sw.sc)sw.sc.style.opacity=String(Math.max(0,1-sw.dy/400))});
 const end=()=>{if(!sw)return;const {sh,dy,t,sc}=sw;sw=null;const fast=dy>24&&(Date.now()-t)<260;
  if(dy>90||fast){sh.style.transition='transform .2s ease-in';sh.style.transform='translateY(100%)';if(sc){sc.style.transition='opacity .2s';sc.style.opacity='0'}setTimeout(()=>{S.pv.sheet=false;S.pv.closing=false;render()},200)}
  else{sh.style.transition='transform .2s ease-out';sh.style.transform='';if(sc){sc.style.opacity=''}}};
 document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end)}
/* панель демо: вариант A/B, состояние */
panelHtml=function(){
 const chip=(on,act,l)=>`<button class="chip${on?' on':''}" data-act="${act}">${l}</button>`;
 const v=S.pv.variant,m=S.pv.mode;
 return `<h3>Padelada 2.0 · экран Paddy</h3><p class="sub">Кликабельный прототип paddy-screen-v1: кнопка «Что умею» открывает лист (свайп вниз или тап вне листа закрывает), карточки отвечают сообщением Paddy, в поле можно писать.</p>
 <div class="grp" style="margin-top:0"><div class="lab">Экран</div><div class="chips">${SCRL.map(([id,l])=>chip(S.screen===id,'scr:'+id,l)).join('')}</div></div>
 ${S.screen==='40'?`<div class="grp"><div class="lab">Шапка</div><div class="chips">${chip(v==='A','pvar:A','A · кнопка «Что умею»')}${chip(v==='B','pvar:B','B · шестерёнка')}</div></div>
 <div class="grp"><div class="lab">Состояние</div><div class="chips">${chip(m==='chat','pstate:chat','Чат')}${chip(m==='empty','pstate:empty','Пустой чат')}${chip(m==='offline','pstate:offline','Нет сети')}</div></div>`:''}
 <div class="grp"><div class="lab">Тема</div><div class="chips">${chip(S.theme==='light','th:light','Светлая')}${chip(S.theme==='dark','th:dark','Тёмная')}</div></div>
 <div class="grp"><div class="lab">Язык</div><div class="chips">${LANGS.map(l=>chip(S.lang===l,'lg:'+l,l)).join('')}</div></div>`};
