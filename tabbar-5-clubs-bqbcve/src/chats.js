/* ===== chats-pinned-paddy-v1: экран «Чаты» с закреплённым Paddy в полный рост (screen 50) ===== */
const CT={
 prv_u:['Queda 1 hueco hoy a las 19:00','Queda 1 lloc avui a les 19:00','1 spot left today at 7:00 pm','Сегодня в 19:00 освободилось место','Сьогодні о 19:00 звільнилося місце'],
 prv_r:['Hecho: estás apuntado a las 19:00','Fet: estàs apuntat a les 19:00','Done: you’re signed up for 7:00 pm','Готово: вы записаны на 19:00','Готово: ви записані на 19:00'],
 new_a:['1 mensaje nuevo','1 missatge nou','1 new message','1 новое сообщение','1 нове повідомлення'],
 open_a:['Abrir chat con Paddy','Obrir xat amb Paddy','Open chat with Paddy','Открыть чат с Paddy','Відкрити чат із Paddy'],
 e_t:['Aún no tienes chats','Encara no tens xats','No chats yet','Пока нет чатов','Ще немає чатів'],
 e_b:['Cuando juegues con alguien o te unas a un club, los chats aparecerán aquí. Mientras, Paddy te echa una mano.','Quan juguis amb algú o t’uneixis a un club, els xats apareixeran aquí. Mentrestant, Paddy et dona un cop de mà.','When you play with someone or join a club, your chats will show up here. Until then, Paddy can help.','Когда вы сыграете с кем-то или вступите в клуб, чаты появятся здесь. А пока вам поможет Paddy.','Коли ви зіграєте з кимось або вступите в клуб, чати з’являться тут. А поки вам допоможе Paddy.'],
 e_c:['Escribir a Paddy','Escriure a Paddy','Message Paddy','Написать Paddy','Написати Paddy'],
 srch:['Buscar','Cercar','Search','Поиск','Пошук'],
};
Object.assign(T,CT);
const cpt=k=>CT[k][LI[S.lang]];
S.cv={v:'2',unread:false,empty:false,sy:0,pull:false,spr:false,fhh:()=>{const p=document.querySelector('.cpin');return p?p.offsetHeight:160}};
function cOnSet(o){
 if(o.screen!=='50')return;
 const st=o.state||'read';
 S.cv={fhh:S.cv.fhh,v:'2',unread:/unread/.test(st),empty:st==='empty',sy:/scrolled/.test(st)?(+(o.scroll||0)||360):/mid/.test(st)?-1:0,pull:/pull/.test(st),spr:false};
}
const cDot=()=>`<span class="cdot" aria-hidden="true"></span>`;
function cFull(){
 const u=S.cv.unread;
 return `<span class="cfull"><span class="cpf">${emoSvg(u?'joy':'hello',104,'')}${u?`<span class="bdg cb" aria-hidden="true">1</span>`:''}</span><span class="cpl"><b class="cpn">Paddy</b></span>${S.cv.empty?'':`<span class="cpv">${esc(cpt(u?'prv_u':'prv_r'))}</span>`}</span>`}
function cMini(){const u=S.cv.unread;return `<span class="cmin"><span class="cmf">${emoSvg('hello',40,'')}${u?cDot():''}</span><b class="cpn sm">Paddy</b></span>`}
function cPin(){
 const v=S.cv.v,u=S.cv.unread;
 const al=`Paddy${u?', '+cpt('new_a'):''}`;
 const btn=`<button class="cpb" data-act="go:40:chat" aria-label="${esc(al)}">${cFull()}${v==='1'?cMini():''}</button>`;
 return `<div class="cpin v${v}${u?' unr':''}${S.cv.empty?' emp':''}">${btn}</div>`}
function cRows(){
 const o=[];
 o.push(crow({av:iav('map-pin','t1'),name:'Baix Empordà',pin:true,prev:'Núria: '+T.m1[S.lang],time:'9:32',bdg:12,act:'go:3:empty'}));
 o.push(crow({av:iav('users','t3'),name:'Pàdel dijous',prev:t('typing_n',{n:'Marc'}),ty:true,time:'9:15',bdg:3,act:'go:2:chat'}));
 o.push(crow({av:iav('volleyball','t2'),name:'Club Pàdel Palamós',muted:true,prev:lt('pv_club'),time:'8:40',bdg:4}));
 o.push(crow({av:avt('Elena Ruiz','cav'),name:'Elena Ruiz',tk:true,prev:lt('pv_elena'),time:lt('yday')}));
 o.push(crow({av:avt('Jordi Puig','cav'),name:'Jordi Puig',tk:true,prev:'Perfecte, hi som a les 19:00',time:lt('yday')}));
 o.push(crow({av:iav('trophy','t2'),name:'Torneig de Nadal',prev:'Marta: Ja hi ha 12 parelles apuntades',time:'24/10'}));
 o.push(crow({av:avt('Marta Vidal','cav'),name:'Marta Vidal',prev:'Gràcies per la partida!',time:'23/10'}));
 o.push(crow({av:iav('users','t1'),name:'Pàdel Girona indoor',muted:true,prev:'Laia: ¿Alguien tiene pelotas?',time:'22/10'}));
 o.push(crow({av:avt('Pau Roca','cav'),name:'Pau Roca',prev:'Te paso el número de la pista',time:'20/10'}));
 o.push(crow({av:avt('Laia Serra','cav'),name:'Laia Serra',tk:true,prev:'Ens veiem dissabte',time:'18/10'}));
 return o.join('')}
function cEmpty(){return `<div class="cemp"><span class="cei">${ic('message-circle','i32')}</span><h2 class="${disp(cpt('e_t')).trim()}">${esc(cpt('e_t'))}</h2><p>${esc(cpt('e_b'))}</p><button class="pill out" data-act="go:40:chat">${esc(cpt('e_c'))}</button></div>`}
function screen50(){
 const v=S.cv.v;
 const left=v==='3'?`<button class="cmh" data-act="go:40:chat" aria-label="${esc(cpt('open_a'))}"><span class="cmf">${emoSvg('hello',44,'')}${S.cv.unread?cDot():''}</span></button>`:'';
 const right=`<button class="circ" data-act="noop" aria-label="${esc(cpt('srch'))}">${ic('search','i24')}</button><button class="circ" data-act="noop" aria-label="${esc(t('c_newchat'))}">${ic('square-pen','i24')}</button>`;
 const hdr=`<div class="hdr chdr v${v}">${left}<div class="ttl"><h1 class="${disp(t('tab_chats')).trim()}">${esc(t('tab_chats'))}</h1></div>${right}</div>`;
 const body=S.cv.empty?cEmpty():cRows();
 const tabs=tabbar('chats').replace('<nav class="tabs ','<nav class="tabs glass ');
 setTimeout(cAfter,0);
 return `${status()}${BARE?'':cDemo()}${hdr}${v==='1'?cPin():''}<div class="scr clist cl${v}" id="cscr">${v!=='1'?cPin():''}<div class="clx">${body}</div></div>${tabs}`}
function cDemo(){
 const b=(on,a,l)=>`<button class="${on?'on':''}" data-act="${a}" aria-pressed="${on}">${l}</button>`;
 const y=S.cv.sy,pos=S.cv.pull?'p':y===0?'t':y<0||y<S.cv.fhh()?'m':'s';
 return `<div class="pdemo" role="group" aria-label="Демо"><div class="sg">${b(!S.cv.unread,'cun:0','Прочитано')}${b(S.cv.unread,'cun:1','Непрочитано')}</div><div class="sg">${b(pos==='t','cpos:t','Вверху')}${b(pos==='m','cpos:m','Mid')}${b(pos==='s','cpos:s','Прокручено')}${b(pos==='p','cpos:p','Pull')}</div><div class="sg"><button data-act="cspr">Пружина ▶</button></div></div>`}
function cAfter(){
 const sc=document.getElementById('cscr');if(!sc)return;
 const pin=sc.querySelector('.cpin');let y=S.cv.sy;if(y<0)y=Math.round(pin.offsetHeight*0.3/4)*4;
 sc.scrollTop=y;S.cv.sy=sc.scrollTop;
 sc.classList.toggle('pull',!!S.cv.pull);
 if(S.cv.spr){sc.classList.add('spring');S.cv.spr=false;setTimeout(()=>sc.classList.remove('spring'),900)}
 if(!sc._cb){sc._cb=1;sc.addEventListener('scroll',()=>{S.cv.sy=sc.scrollTop},{passive:true})}
}
function cUpd(){}
Object.assign(WST,{'50':[['read','Вверху (прочитано)'],['unread','Вверху (непрочитано)'],['mid','Mid-scroll'],['scrolled','Прокручено'],['pull','Pull-down'],['empty','Пусто']]});
Object.assign(SCR,{'50':()=>screen50()});
