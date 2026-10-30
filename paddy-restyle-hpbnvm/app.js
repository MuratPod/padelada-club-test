const I=(n,c='')=>`<svg class="ico ${c}"><use href="#i-${n}"/></svg>`;
const Q=new URLSearchParams(location.search);
let D=+(Q.get('d')??1), T=Q.get('t')||'light';
const AV={0:t=>`img/${t==='dark'?'joy-dark':'joy'}.svg`,1:()=>'img/d1-head.png',2:t=>`img/d2-avatar-${t==='dark'?'night':'day'}.jpg`,3:t=>`img/d3-avatar-${t}.jpg`,4:()=>'img/d4-avatar.jpg'};
const avStyle={0:'background:var(--tint);padding:2px',1:'background:var(--tint)',2:'',3:'',4:''};
const NAMES={0:'Сейчас · плоский',1:'1 · Объёмный Paddy',2:'2 · Paddy в карточке',3:'3 · Стеклянный Paddy',4:'4 · Paddy как человек'};
function sb(){return `<div class="sb"><span>9:41</span><span class="r"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8.5.4 10.6 10.6 0 0 0 1 3.4l1.2 1.3a9 9 0 0 1 6.3-2.5Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.2 7.2 0 0 0 8.5 4c-1.9 0-3.6.7-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c-.6 0-1.2.2-1.6.6L8.5 11.6l1.6-1.7c-.4-.4-1-.6-1.6-.6Z"/></svg><span class="bat"></span></span></div>`}
function scene(t){const u=`img/d2-card-court-${t==='dark'?'night':'day'}.jpg`;return `<div class="bgb" style="background-image:url(${u})"></div><img class="sharp" src="${u}">`}
function block(d,t){
 if(d===0) return `<div class="pblock"><img class="fig104" src="${AV[0](t)}"><div class="pname">Paddy</div><div class="pline">Готово: вы записаны на 19:00</div><span class="pbadge" style="left:236px;top:6px">1</span></div>`;
 if(d===1) return `<div class="pblock"><div class="floor"></div><img class="d1fig" src="img/d1-wave-web.png"><div class="pname">Paddy</div><div class="pline">Готово: вы записаны на 19:00</div><span class="pbadge" style="left:236px;top:4px">1</span></div>`;
 if(d===2) return `<div class="pcard">${scene(t)}<div class="tx"><div class="t1">Paddy <span class="ib">1</span></div><div class="t2">Готово: вы записаны на 19:00</div></div><div class="chip">${I('message-circle')}Написать</div></div>`;
 if(d===3) return `<div class="pblock"><div class="gstage"><div class="plate"></div><img src="img/d3-glass-${t}.jpg"></div><div class="pname">Paddy</div><div class="pline">Готово: вы записаны на 19:00</div><span class="pbadge" style="left:240px;top:2px">1</span></div>`;
 return '';
}
const ROWS=[
 {av:I('map-pin'),n:'Baix Empordà',p:'Núria: Кто завтра играет в Паламосе?',t:'9:32',b:'12'},
 {av:I('users'),n:'Pàdel dijous',p:'Marc печатает…',typ:1,t:'9:15',b:'3'},
 {img:'img/av3.jpg',n:'Elena Ruiz',p:'Отлично, увидимся там.',cc:1,t:'Вчера'},
 {img:'img/av2.jpg',n:'Jordi Puig',p:'Perfecte, hi som a les 19:00',cc:1,t:'Вчера'},
 {img:'img/av1.jpg',n:'Laia Ferrer',p:'Доброе утро! Сегодня есть корты',t:'Вчера',b:'1'},
 {img:'img/av4.jpg',n:'Marc Vidal',p:'Gràcies per la partida!',t:'24/10'},
 {av:I('trophy'),n:'Torneig de Nadal',p:'Запись открыта до 30 ноября',t:'24/10'}];
function row(r){const av=r.img?`<div class="av"><img src="${r.img}"></div>`:`<div class="av">${r.av}</div>`;
 return `<div class="row ${r.cls||''}">${av}<div class="rc"><div class="rn">${r.n}</div><div class="rp ${r.typ?'typing':''}">${r.cc?`<span class="cc">${I('check-check')}</span>`:''}${r.p}</div></div><div class="rm"><span class="rt">${r.t}</span>${r.b?`<span class="rb">${r.b}</span>`:'<span style="height:24px"></span>'}</div></div>`}
function tabbar(){const c=[['house','Главная'],['volleyball','Матчи'],['message-circle','Чаты',1],['users','Клубы'],['user-round','Профиль']];
 return `<div class="tab">${c.map(([i,l,on])=>on?`<div class="cell c"><div class="lens"></div>${I(i)}<span class="lb">${l}</span><span class="tb">15</span></div>`:`<div class="cell">${I(i)}<span>${l}</span></div>`).join('')}</div><div class="home"></div>`}
function chats(d,t){
 let rows=ROWS.slice();
 if(d===4) rows=[{img:AV[4](t),n:'Paddy',p:'Готово: вы записаны на 19:00',t:'9:40',b:'1',cls:'paddyrow'},...rows];
 return `<div class="phone ${t}"><div class="mesh"></div>${sb()}<div class="hdr"><h1>Чаты</h1><div class="hbtns"><div class="cbtn">${I('search')}</div><div class="cbtn">${I('square-pen')}</div></div></div><div class="scroll">${block(d,t)}<div class="list">${rows.map(row).join('')}</div></div>${tabbar()}</div>`}
function avatar(d,t,cls=''){return `<div class="av ${cls}" style="${avStyle[d]}"><img src="${AV[d](t)}" style="${d===0?'object-fit:contain':''}"></div>`}
function chat(d,t){
 const a=avatar(d,t);
 return `<div class="phone ${t}"><div class="mesh"></div>${sb()}<div class="chdr"><div class="cbtn">${I('chevron-left')}</div><div class="cap">${a.replace('class="av ','class="av ')}<div><div class="nm">Paddy</div><div class="st">в сети</div></div></div><div class="cbtn">${I('ellipsis-vertical')}</div></div>
 <div class="starts"><div class="scard"><span class="ic">${I('sparkles')}</span>Что умею</div><div class="scard"><span class="ic">${I('brain')}</span>Память Paddy</div></div>
 <div class="msgs"><div class="day">Сегодня</div><div class="me">Найди игру на субботу вечером<div class="tm">9:38</div></div>
 <div class="inr">${avatar(d,t)}<div class="bub"><b>Paddy</b>Нашёл 2 игры в Club Pàdel Palamós, уровень 2,5–3,0.<div class="game">Сб · 18:00 · нужен 1<span class="go">Я играю</span></div><div class="game">Сб · 19:30 · нужны 2<span class="go">Я играю</span></div><div class="tm">9:39</div></div></div>
 <div class="me">Запиши на 19:30<div class="tm">9:40</div></div>
 <div class="inr">${avatar(d,t)}<div class="bub"><b>Paddy</b>Готово: вы записаны на 19:30.<div class="tm">9:40</div></div></div></div>
 <div class="comp"><span class="pl">${I('plus')}</span><span class="ph">Сообщение</span><span class="mic">${I('mic')}</span></div><div class="home"></div></div>`}
function portrait(d,t){
 let inner='';
 if(d===0) inner=`<img src="${AV[0](t)}" style="width:400px;height:400px;margin-top:-40px">`;
 if(d===1) inner=`<div style="position:relative;margin-top:-40px"><div class="floor" style="top:392px;width:300px;height:36px;margin-left:-150px"></div><img class="d1fig" src="img/d1-wave-web.png" style="height:420px;margin:0"></div>`;
 if(d===2) inner=`<div class="pcard big" style="margin:0;width:540px;height:304px;border-radius:36px;margin-top:-60px">${scene(t)}<div class="tx" style="right:260px;top:28px;left:28px"><div class="t1" style="font-size:30px;line-height:36px">Paddy</div><div class="t2" style="font-size:17px;line-height:23px">Найду игру, корт и партнёров</div></div><div class="chip" style="left:28px;bottom:26px">${I('message-circle')}Написать</div></div>`;
 if(d===3) inner=`<div class="gstage" style="width:440px;height:420px;margin-top:-40px"><div class="plate" style="height:110px;bottom:-14px"></div><img src="img/d3-glass-${t}.jpg" style="width:430px;height:430px;margin-left:-215px;top:-20px"></div>`;
 if(d===4) inner=`<div style="position:relative;margin-top:-50px"><div class="ring" style="padding:5px"><div class="in" style="padding:6px"><img src="img/d4-portrait.jpg" style="width:340px;height:340px"></div></div><span class="online" style="width:34px;height:34px;border-radius:17px;border-width:6px;right:22px;bottom:22px;border-color:var(--bg)"></span></div>`;
 return `<div class="portrait ${t}"><div class="mesh"></div>${inner}<div class="cap2">Paddy<small>${NAMES[d]}</small></div></div>`}
window.R={chats,chat,portrait,NAMES};
