const I=(n,c='')=>`<svg class="ico ${c}"><use href="#i-${n}"/></svg>`;
const NAMES={1:'A · Минимум',2:'B · Улыбка и ножка',3:'C · Мягкий объём',4:'D · Голова-аватар'};
const VV={1:'A',2:'B',3:'C',4:'D'};
function fig(d,t,pose='idle',ball=false){return simpleSVG({v:VV[d],theme:t,pose,ball})}
function avBg(d,t){
 if(d===4) return t==='dark'?'radial-gradient(circle at 35% 28%,#3F7F73,#1E4A47 80%)':'radial-gradient(circle at 35% 28%,#CFF5E6,#8FDCC4 85%)';
 return t==='dark'?'radial-gradient(circle at 35% 28%,#34304A,#1B1A2E 80%)':'radial-gradient(circle at 35% 28%,#FFFFFF,#FFE6DB 85%)'}
function avatar(d,t,sz){
 const inner=d===4?simpleSVG({v:'D',theme:t,head:true,vb:'40 22 320 320'}):simpleSVG({v:VV[d],theme:t,head:true,vb:'52 20 296 296'});
 return `<div class="pav" style="width:${sz}px;height:${sz}px;background:${avBg(d,t)}">${inner}</div>`}
function sb(se){return `<div class="sb"><span>9:41</span><span class="r"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8.5.4 10.6 10.6 0 0 0 1 3.4l1.2 1.3a9 9 0 0 1 6.3-2.5Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.2 7.2 0 0 0 8.5 4c-1.9 0-3.6.7-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c-.6 0-1.2.2-1.6.6L8.5 11.6l1.6-1.7c-.4-.4-1-.6-1.6-.6Z"/></svg><span class="bat"></span></span></div>`}
/* векторная сцена корта для направления 2 (статичные View/SVG за ригом) */
function court(t){const n=t==='dark';return `<svg class="court" viewBox="0 0 370 152" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sky${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n?'#141F45':'#FFD9B8'}"/><stop offset="1" stop-color="${n?'#28396E':'#FFF1E2'}"/></linearGradient><linearGradient id="fl${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n?'#1D4F86':'#4C9BDB'}"/><stop offset="1" stop-color="${n?'#143A66':'#2F7CC0'}"/></linearGradient><radialGradient id="lamp${t}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE9B0" stop-opacity="${n?.9:.0}"/><stop offset="1" stop-color="#FFE9B0" stop-opacity="0"/></radialGradient></defs>
<rect width="370" height="152" fill="url(#sky${t})"/>${n?'<circle cx="300" cy="18" r="46" fill="url(#lamp'+t+')"/><circle cx="120" cy="14" r="34" fill="url(#lamp'+t+')"/>':'<circle cx="320" cy="26" r="18" fill="#FFE2A6" opacity=".9"/>'}
<g stroke="${n?'rgba(255,255,255,.16)':'rgba(255,255,255,.7)'}" stroke-width="1.5">${[0,1,2,3,4,5,6,7,8,9].map(i=>`<line x1="${i*42}" y1="20" x2="${i*42}" y2="82"/>`).join('')}<line x1="0" y1="20" x2="370" y2="20"/></g>
<rect y="80" width="370" height="72" fill="url(#fl${t})"/><path d="M0 120 L370 108 M60 152 L150 82 M370 135 L260 82" stroke="rgba(255,255,255,.75)" stroke-width="2" fill="none"/>
<path d="M150 70 L370 64 L370 96 L150 92 Z" fill="none" stroke="${n?'rgba(255,255,255,.35)':'rgba(36,18,58,.35)'}" stroke-width="1"/><path d="M150 70 V92 M370 64" stroke="${n?'#E8E8F0':'#24123A'}" stroke-width="2"/><path d="M150 70 L370 64" stroke="#fff" stroke-width="2.5"/>
</svg>`}
const LINE='Готово: вы записаны на 19:00';
function block(d,t,se){const f=se?104:128;
 const who=d===4?`<div class="cav" style="width:${se?76:92}px;height:${se?76:92}px">${avatar(4,t,se?76:92)}</div>`:`<div class="cfig" style="width:${f}px;height:${f}px">${fig(d,t,'idle',true)}</div>`;
 return `<div class="pcard">${court(t)}${who}<div class="tx"><div class="t1">Paddy <span class="ib">1</span></div><div class="t2">${LINE}</div></div><div class="chip">${I('message-circle')}Написать</div></div>`}
const ROWS=[
 {av:I('map-pin'),n:'Baix Empordà',p:'Núria: Кто завтра играет в Паламосе?',t:'9:32',b:'12'},
 {av:I('users'),n:'Pàdel dijous',p:'Marc печатает…',typ:1,t:'9:15',b:'3'},
 {img:'img/av3.jpg',n:'Elena Ruiz',p:'Отлично, увидимся там.',cc:1,t:'Вчера'},
 {img:'img/av2.jpg',n:'Jordi Puig',p:'Perfecte, hi som a les 19:00',cc:1,t:'Вчера'},
 {img:'img/av1.jpg',n:'Laia Ferrer',p:'Доброе утро! Сегодня есть корты',t:'Вчера',b:'1'},
 {img:'img/av4.jpg',n:'Marc Vidal',p:'Gràcies per la partida!',t:'24/10'},
 {av:I('trophy'),n:'Torneig de Nadal',p:'Запись открыта до 30 ноября',t:'24/10'}];
function row(r){const av=r.html?r.html:r.img?`<div class="av"><img src="${r.img}"></div>`:`<div class="av">${r.av}</div>`;
 return `<div class="row ${r.cls||''}">${av}<div class="rc"><div class="rn">${r.n}</div><div class="rp ${r.typ?'typing':''}">${r.cc?`<span class="cc">${I('check-check')}</span>`:''}${r.p}</div></div><div class="rm"><span class="rt">${r.t}</span>${r.b?`<span class="rb">${r.b}</span>`:'<span style="height:24px"></span>'}</div></div>`}
function tabbar(){const c=[['house','Главная'],['volleyball','Матчи'],['message-circle','Чаты',1],['users','Клубы'],['user-round','Профиль']];
 return `<div class="tab">${c.map(([i,l,on])=>on?`<div class="cell c"><div class="lens"></div>${I(i)}<span class="lb">${l}</span><span class="tb">15</span></div>`:`<div class="cell">${I(i)}<span>${l}</span></div>`).join('')}</div><div class="home"></div>`}
function chats(d,t,se){
 return `<div class="phone ${t} ${se?'se':''}"><div class="mesh"></div>${sb(se)}<div class="hdr"><h1>Чаты</h1><div class="hbtns"><div class="cbtn">${I('search')}</div><div class="cbtn">${I('square-pen')}</div></div></div><div class="scroll">${block(d,t,se)}<div class="list">${ROWS.map(row).join('')}</div></div>${tabbar()}</div>`}
const CAP='Помощник и всему голова';
function chat(d,t,se){
 return `<div class="phone ${t} ${se?'se':''}"><div class="mesh"></div>${sb(se)}<div class="chdr8"><div class="cbtn">${I('chevron-left')}</div><div class="cap8">${avatar(d,t,40)}<div class="ct"><div class="nm">Paddy</div><div class="st">${CAP}</div></div><span class="ai">ИИ</span></div><div class="cbtn">${I('house')}</div><div class="cbtn">${I('ellipsis')}</div></div>
 <div class="msgs8"><div class="pill">Мой рейтинг</div><div class="hint">Остальное — в «Что умею»</div>
 <div class="bub8">Я Paddy, помощник Padelada. Приложение совсем новое, поэтому возможны ошибки. Давайте за минуту настроим самое нужное.</div>
 <div class="me8">Найди игру на субботу вечером</div>
 <div class="bub8">Нашёл 2 игры в Club Pàdel Palamós, уровень 2,5–3,0. Записать на 19:30?</div>
 <div class="typing8">${avatar(d,t,26)}<span class="dots"><i></i><i></i><i></i></span><span class="tl">Paddy ищет корт…</span></div></div>
 <div class="comp8"><span class="pl">${I('plus')}</span><span class="ph">Сообщение</span><span class="mic">${I('mic')}</span></div><div class="home"></div></div>`}
function cardBg(d,t){
 if(d===0) return 'background:linear-gradient(160deg,#FFB067,#F7914A)';
 if(d===1) return t==='dark'?'background:radial-gradient(90% 70% at 30% 20%,#FFB067,#E96F3E 70%,#B84B2C);box-shadow:0 18px 40px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.35)':'background:radial-gradient(90% 70% at 30% 20%,#FFC487,#F7914A 70%,#EA7A3B);box-shadow:0 18px 40px rgba(230,110,50,.28),inset 0 1px 0 rgba(255,255,255,.6)';
 if(d===2) return t==='dark'?'background:linear-gradient(180deg,#143A66,#0E2340)':'background:linear-gradient(180deg,#2F7CC0,#1F5C8F)';
 if(d===3) return 'background:var(--glass);border:1px solid var(--glassLine);backdrop-filter:blur(24px) saturate(1.4);box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.7)';
 return 'background:var(--surface);box-shadow:var(--shadow);border:1px solid var(--line)';
}
function card(d,t,se){const A=se?104:128;const light=d===2||d<=1;
 const hero=true?`<div class="c2">${court(t).replace('viewBox="0 0 370 152"','viewBox="60 0 250 152"')}${d===4?`<div class="cfig" style="left:50%;margin-left:-${se?52:62}px;right:auto;bottom:${se?30:44}px">${avatar(4,t,se?104:124)}</div>`:`<div class="cfig" style="left:50%;margin-left:-${se?70:84}px;right:auto;bottom:-6px;width:${se?140:168}px;height:${se?140:168}px">${fig(d,t,'idle',true)}</div>`}</div>`
  :`<div style="position:relative;margin:${se?18:28}px auto 0;width:max-content">${avatar(d,t,A)}${d===4?'<span class="online big"></span>':''}</div>`;
 return `<div class="phone ${t} ${se?'se':''}"><div class="mesh"></div>${sb(se)}<div class="top8"><div class="cbtn">${I('chevron-left')}</div><span style="flex:1"></span><div class="cbtn">${I('house')}</div><div class="cbtn">${I('ellipsis')}</div></div>
 <h1 class="ttl8">Карточка Paddy</h1>
 <div class="pc8 d2" style="${cardBg(2,t)}">${hero}<div class="pn8">Paddy</div><div class="pd8">Постоянный член Padelada, помощник и всему голова</div><span class="ai big">ИИ</span></div>
 <div class="tiles8"><div><small>Уровень</small><b class="inf">∞</b></div><div><small>Играет</small><b>за всех</b></div><div><small>Клуб</small><b class="s">Padelada</b></div></div>
 <div class="btn8 p">Что умею</div><div class="btn8 o">Память Paddy</div></div>`}
function portrait(d,t){
 const who=d===4?`<div class="cav" style="width:230px;height:230px;right:40px;bottom:34px">${avatar(4,t,230)}</div>`:`<div class="cfig" style="width:280px;height:280px;right:6px;bottom:-12px">${fig(d,t,'idle',true)}</div>`;
 return `<div class="portrait ${t}"><div class="mesh"></div><div class="pcard" style="width:540px;height:320px;margin:0;border-radius:36px">${court(t)}${who}<div class="tx" style="right:300px;top:30px;left:30px"><div class="t1" style="font-size:32px;line-height:38px">Paddy</div><div class="t2" style="font-size:17px;line-height:23px">Найду игру, корт и партнёров</div></div></div><div class="cap2">Paddy<small>${NAMES[d]}</small></div></div>`}
function poses(d,t){return `<div class="poses ${t}">${['idle','joy','think'].map(p=>`<div class="ps"><div style="width:150px;height:150px">${fig(d,t,p,p==='idle')}</div><small>${{idle:'покой + мяч',joy:'радость ^^',think:'думает'}[p]}</small></div>`).join('')}<div class="ps"><div style="width:150px;height:150px;display:grid;place-items:center">${avatar(d,t,96)}</div><small>аватар 40–96</small></div></div>`}
window.R={chats,chat,card,portrait,poses,avatar,NAMES};
