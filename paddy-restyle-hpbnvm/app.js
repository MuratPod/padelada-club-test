const I=(n,c='')=>`<svg class="ico ${c}"><use href="#i-${n}"/></svg>`;
const NAMES={0:'Сейчас · плоский',1:'1 · Объёмный Paddy',2:'2 · Paddy в карточке',3:'3 · Стеклянный Paddy',4:'4 · Paddy как человек'};
const STY={0:'flat',1:'vol',2:'soft',3:'glass',4:'vol'};
/* тёмная тема для flat/soft: второй проход светлой обводки (как OutlineCtx в PoC) */
function outlined(svg){const m=svg.match(/^(<svg[^>]*>)(<defs>[\s\S]*?<\/defs>)([\s\S]*)<\/svg>$/);if(!m)return svg;
 const pass=m[3].replace(/stroke="#24123A"/g,'stroke="#FFF1EA"').replace(/stroke-width="([\d.]+)"/g,(_,w)=>`stroke-width="${+w+6}"`).replace(/fill="#[0-9A-Fa-f]{6}"/g,'fill="#FFF1EA"').replace(/<g data-layer="add">[\s\S]*?<\/g>/g,'');
 return m[1]+m[2]+`<g>${pass}</g>`+m[3]+'</svg>'}
function fig(d,t,pose='hello'){const s=paddySVG({style:STY[d],theme:t,pose});return t==='dark'&&(d===0||d===2)?outlined(s):s}
function face(d,t,vb){const s=paddySVG({style:STY[d],theme:t,head:true,vb});return t==='dark'&&(d===0||d===2)?outlined(s):s}
/* фон «фото» для аватара направления 4 и 2: только градиенты (статичный слой за SVG) */
function avBg(d,t){
 if(d===0) return t==='dark'?'#2A2234':'#FFE6DB';
 if(d===1) return t==='dark'?'radial-gradient(circle at 35% 28%,#3A3150,#1B1A2E 75%)':'radial-gradient(circle at 35% 28%,#FFFFFF,#FFE3D4 75%)';
 if(d===2) return t==='dark'?'linear-gradient(180deg,#1E2A55 0 52%,#1F5C8F 52% 100%)':'linear-gradient(180deg,#BFE3F7 0 52%,#3D8BD0 52% 100%)';
 if(d===3) return t==='dark'?'rgba(255,255,255,.08)':'rgba(255,255,255,.45)';
 return t==='dark'
  ?'radial-gradient(circle at 22% 24%,rgba(255,181,71,.55) 0 7%,transparent 8%),radial-gradient(circle at 80% 30%,rgba(255,94,91,.45) 0 9%,transparent 10%),radial-gradient(circle at 76% 80%,rgba(62,207,160,.35) 0 8%,transparent 9%),radial-gradient(circle at 50% 40%,#3B2E45,#141224 80%)'
  :'radial-gradient(circle at 20% 22%,rgba(255,255,255,.9) 0 7%,transparent 8%),radial-gradient(circle at 82% 28%,rgba(255,200,120,.8) 0 9%,transparent 10%),radial-gradient(circle at 78% 82%,rgba(62,207,160,.45) 0 8%,transparent 9%),radial-gradient(circle at 50% 35%,#FFF6E8,#F7B98E 85%)';
}
function avatar(d,t,sz,cls=''){
 const vb=d===4?'92 40 216 216':'70 8 260 260';
 const ring=d===0?`box-shadow:inset 0 0 0 ${Math.max(1.5,sz/26)}px #24123A`:d===4?'':d===3?'border:1px solid var(--glassLine);backdrop-filter:blur(14px)':'';
 const inner=`<div class="pav ${cls}" style="width:${sz}px;height:${sz}px;background:${avBg(d,t)};${ring}">${face(d,t,vb)}</div>`;
 if(d===4) return `<div class="pring" style="padding:${Math.max(2,sz/24)}px"><div class="pin" style="padding:${Math.max(1.5,sz/30)}px">${inner}</div></div>`;
 return inner}
function sb(se){return `<div class="sb"><span>9:41</span><span class="r"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8.5.4 10.6 10.6 0 0 0 1 3.4l1.2 1.3a9 9 0 0 1 6.3-2.5Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.2 7.2 0 0 0 8.5 4c-1.9 0-3.6.7-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c-.6 0-1.2.2-1.6.6L8.5 11.6l1.6-1.7c-.4-.4-1-.6-1.6-.6Z"/></svg><span class="bat"></span></span></div>`}
/* векторная сцена корта для направления 2 (статичные View/SVG за ригом) */
function court(t){const n=t==='dark';return `<svg class="court" viewBox="0 0 370 152" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sky${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n?'#141F45':'#FFD9B8'}"/><stop offset="1" stop-color="${n?'#28396E':'#FFF1E2'}"/></linearGradient><linearGradient id="fl${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n?'#1D4F86':'#4C9BDB'}"/><stop offset="1" stop-color="${n?'#143A66':'#2F7CC0'}"/></linearGradient><radialGradient id="lamp${t}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE9B0" stop-opacity="${n?.9:.0}"/><stop offset="1" stop-color="#FFE9B0" stop-opacity="0"/></radialGradient></defs>
<rect width="370" height="152" fill="url(#sky${t})"/>${n?'<circle cx="300" cy="18" r="46" fill="url(#lamp'+t+')"/><circle cx="120" cy="14" r="34" fill="url(#lamp'+t+')"/>':'<circle cx="320" cy="26" r="18" fill="#FFE2A6" opacity=".9"/>'}
<g stroke="${n?'rgba(255,255,255,.16)':'rgba(255,255,255,.7)'}" stroke-width="1.5">${[0,1,2,3,4,5,6,7,8,9].map(i=>`<line x1="${i*42}" y1="20" x2="${i*42}" y2="82"/>`).join('')}<line x1="0" y1="20" x2="370" y2="20"/></g>
<rect y="80" width="370" height="72" fill="url(#fl${t})"/><path d="M0 120 L370 108 M60 152 L150 82 M370 135 L260 82" stroke="rgba(255,255,255,.75)" stroke-width="2" fill="none"/>
<path d="M150 70 L370 64 L370 96 L150 92 Z" fill="none" stroke="${n?'rgba(255,255,255,.35)':'rgba(36,18,58,.35)'}" stroke-width="1"/><path d="M150 70 V92 M370 64" stroke="${n?'#E8E8F0':'#24123A'}" stroke-width="2"/><path d="M150 70 L370 64" stroke="#fff" stroke-width="2.5"/>
<ellipse cx="300" cy="140" rx="46" ry="7" fill="#000" opacity="${n?.4:.18}"/></svg>`}
const LINE='Готово: вы записаны на 19:00';
function block(d,t,se){const f=se?80:104;
 if(d===0) return `<div class="pblock"><div class="figw" style="width:${f}px;height:${f}px">${fig(0,t)}</div><div class="pname">Paddy</div><div class="pline">${LINE}</div><span class="pbadge" style="left:calc(50% + ${f/2-4}px);top:6px">1</span></div>`;
 if(d===1) return `<div class="pblock"><div class="figw" style="width:${f}px;height:${f}px">${fig(1,t)}</div><div class="pname">Paddy</div><div class="pline">${LINE}</div><span class="pbadge" style="left:calc(50% + ${f/2-4}px);top:6px">1</span></div>`;
 if(d===2) return `<div class="pcard">${court(t)}<div class="cfig" style="width:${se?118:140}px;height:${se?118:140}px">${fig(2,t)}</div><div class="tx"><div class="t1">Paddy <span class="ib">1</span></div><div class="t2">${LINE}</div></div><div class="chip">${I('message-circle')}Написать</div></div>`;
 if(d===3) return `<div class="pblock"><div class="gwrap" style="width:${f+22}px;height:${f+22}px"><div class="glens"></div><div class="figw" style="width:${f}px;height:${f}px;position:absolute;left:11px;top:8px">${fig(3,t)}</div></div><div class="pname" style="margin-top:-6px">Paddy</div><div class="pline">${LINE}</div><span class="pbadge" style="left:calc(50% + ${f/2+2}px);top:4px">1</span></div>`;
 return `<div class="pblock d4"><div style="position:relative">${avatar(4,t,se?72:92)}<span class="online"></span><span class="pbadge" style="right:-14px;top:-2px">1</span></div><div class="pname">Paddy</div><div class="pline">${LINE}</div></div>`;
}
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
 const hero=d===2?`<div class="c2">${court(t).replace('viewBox="0 0 370 152"','viewBox="60 0 250 152"')}<div class="cfig" style="left:50%;margin-left:-${se?70:84}px;right:auto;bottom:-6px;width:${se?140:168}px;height:${se?140:168}px">${fig(2,t,'joy')}</div></div>`
  :`<div style="position:relative;margin:${se?18:28}px auto 0;width:max-content">${avatar(d,t,A)}${d===4?'<span class="online big"></span>':''}</div>`;
 return `<div class="phone ${t} ${se?'se':''}"><div class="mesh"></div>${sb(se)}<div class="top8"><div class="cbtn">${I('chevron-left')}</div><span style="flex:1"></span><div class="cbtn">${I('house')}</div><div class="cbtn">${I('ellipsis')}</div></div>
 <h1 class="ttl8">Карточка Paddy</h1>
 <div class="pc8 d${d} ${light?'onwarm':''}" style="${cardBg(d,t)}">${hero}<div class="pn8">Paddy</div><div class="pd8">Постоянный член Padelada, помощник и всему голова</div><span class="ai big">ИИ</span></div>
 <div class="tiles8"><div><small>Уровень</small><b class="inf">∞</b></div><div><small>Играет</small><b>за всех</b></div><div><small>Клуб</small><b class="s">Padelada</b></div></div>
 <div class="btn8 p">Что умею</div><div class="btn8 o">Память Paddy</div></div>`}
function portrait(d,t){
 const inner=d===4?`<div style="position:relative">${avatar(4,t,300)}<span class="online" style="width:34px;height:34px;border-radius:17px;border-width:6px;right:26px;bottom:26px"></span></div>`
  :d===2?`<div class="pcard" style="width:520px;height:300px;margin:0;border-radius:36px">${court(t)}<div class="cfig" style="width:280px;height:280px;right:10px;bottom:-14px">${fig(2,t,'joy')}</div><div class="tx" style="right:270px;top:30px;left:30px"><div class="t1" style="font-size:32px;line-height:38px">Paddy</div><div class="t2" style="font-size:17px;line-height:23px">Найду игру, корт и партнёров</div></div></div>`
  :d===3?`<div class="gwrap" style="width:440px;height:440px"><div class="glens"></div><div class="figw" style="width:400px;height:400px;position:absolute;left:20px;top:12px">${fig(3,t,'joy')}</div></div>`
  :`<div class="figw" style="width:440px;height:440px">${fig(d,t,'joy')}</div>`;
 return `<div class="portrait ${t}"><div class="mesh"></div>${inner}<div class="cap2">Paddy<small>${NAMES[d]}</small></div></div>`}
window.R={chats,chat,card,portrait,avatar,NAMES};
