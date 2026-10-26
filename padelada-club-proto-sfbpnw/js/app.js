/* Club Padelada — прототип сайта (SPA, hash-роуты). Без библиотек. Статусы/члены/места/афиша — ДЕМО (js/demo.js + генератор ниже). */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const LANGS=['es','ca','en','ru','uk'], LINKS=window.APP_LINKS;
const qs=new URLSearchParams(location.search);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

/* ---------- платформа ---------- */
function detectPlatform(){
  const o=qs.get('platform'); if(['ios','android','desktop'].includes(o)) return o;
  const ua=navigator.userAgent||'';
  if(/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)) return 'ios';
  if(/Android/.test(ua)) return 'android';
  return 'desktop';
}
const PLATFORM=detectPlatform();

/* ---------- язык ---------- */
function pickLang(){
  const q=qs.get('lang'); if(LANGS.includes(q)) return q;
  try{const s=localStorage.getItem('pc-lang'); if(LANGS.includes(s)) return s}catch(e){}
  const n=(navigator.language||'es').slice(0,2).toLowerCase(); return LANGS.includes(n)?n:'es';
}
let lang=pickLang(), T=window.I18N[lang];
function setLang(l){
  lang=l; T=window.I18N[l];
  try{localStorage.setItem('pc-lang',l)}catch(e){}
  const u=new URL(location.href); u.searchParams.set('lang',l); history.replaceState(null,'',u);
  applyStatic(); render(false);
}
function applyStatic(){
  document.documentElement.lang=T.htmlLang;
  $$('[data-i18n]').forEach(el=>{el.textContent=T[el.dataset.i18n]??el.textContent});
  $('#lang-cur').textContent=T.short; $('#lang-btn').setAttribute('aria-label',T.lang_aria);
  $('#demo-note').hidden=!window.DEMO_FLAG;
  $('#lang-menu').innerHTML=LANGS.map(c=>`<button role="menuitemradio" aria-checked="${c===lang}" data-l="${c}"><b>${window.I18N[c].short}</b>${window.I18N[c].name}</button>`).join('');
  $('#sheet-x').textContent=T.close;
}
{const lg=$('#lang'),b=$('#lang-btn');
 b.addEventListener('click',()=>{const o=lg.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 $('#lang-menu').addEventListener('click',e=>{const t=e.target.closest('[data-l]'); if(t){lg.classList.remove('open');b.setAttribute('aria-expanded',false);setLang(t.dataset.l)}});
 document.addEventListener('click',e=>{if(!lg.contains(e.target)){lg.classList.remove('open');b.setAttribute('aria-expanded',false)}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){lg.classList.remove('open');closeSheet()}});
}

/* ---------- данные ---------- */
let MAP=null, BY={};
const mapP=fetch('data/map.json').then(r=>r.json()).then(d=>{MAP=d;d.features.forEach(f=>BY[f.id]=f);return d});
const occ=id=>window.DEMO_OCC&&window.DEMO_OCC[id];
const statusOf=id=>occ(id)?'occ':'free';
const kindLabel=f=>f.kind==='provincia'?T.kind_provincia:T.kind_comarca;

/* ---------- иконки ---------- */
const I={
 search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 plus:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
 minus:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
 reset:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
 back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>'
};

/* ---------- кнопки приложения ---------- */
function storeLabel(p){return p==='ios'?T.store_ios:T.store_android}
function captainButtons(){
  if(PLATFORM==='desktop'){
    return ['ios','android'].map((p,i)=>`<a class="btn ${i?'btn-line':'btn-cta'}" href="${LINKS[p]}" target="_blank" rel="noopener">${T.cta_captain}<small>${T.open_in} ${storeLabel(p)}</small></a>`).join('');
  }
  return `<a class="btn btn-cta" href="${LINKS[PLATFORM]}" target="_blank" rel="noopener">${T.cta_captain}<small>${T.open_in} ${storeLabel(PLATFORM)}</small></a>`;
}
function appBtn(label,cls){
  if(PLATFORM==='desktop') return `<button class="btn ${cls}" data-app>${label}</button>`;
  return `<a class="btn ${cls}" href="${LINKS[PLATFORM]}" target="_blank" rel="noopener">${label}</a>`;
}
let lastFocus=null;
function openSheet(){
  lastFocus=document.activeElement;
  $('#sheet-t').textContent=T.sheet_title; $('#sheet-p').textContent=T.sheet_text;
  $('#sheet-b').innerHTML=['ios','android'].map((p,i)=>`<a class="btn ${i?'btn-line':'btn-cta'}" href="${LINKS[p]}" target="_blank" rel="noopener">${storeLabel(p)}</a>`).join('');
  $('#scrim').classList.add('on'); const s=$('#sheet'); s.classList.add('on'); s.setAttribute('aria-hidden','false');
  setTimeout(()=>$('#sheet-b a').focus(),60);
}
function closeSheet(){
  const s=$('#sheet'); if(!s.classList.contains('on')) return;
  s.classList.remove('on'); s.setAttribute('aria-hidden','true'); $('#scrim').classList.remove('on');
  if(lastFocus) lastFocus.focus();
}
$('#scrim').addEventListener('click',closeSheet); $('#sheet-x').addEventListener('click',closeSheet);
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-app]'); if(!b) return;
  e.preventDefault();
  if(PLATFORM==='desktop') openSheet(); else window.open(LINKS[PLATFORM],'_blank','noopener');
});

/* ---------- карта (главная) ---------- */
function pathsHTML(first){
  return MAP.features.map(f=>{
    const s=statusOf(f.id), d=Math.round(f.cx/1000*520+((f.cy*7)%60));
    return `<path class="cz ${s}${first?' intro':''}" d="${f.d}" data-id="${f.id}" tabindex="0" role="link" aria-label="${esc(T.region_aria.replace('{name}',f.name).replace('{status}',s==='occ'?T.status_occ:T.status_free))}"${first?` style="--d:${d}"`:''}/>`;
  }).join('');
}
let firstMount=true, mv=null;
function easeIO(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
class MapView{
  constructor(box){
    this.box=box; this.svg=$('svg',box); this.base={x:0,y:0,w:1000,h:MAP.viewBox[3]};
    this.vb={...this.base}; this.ptrs=new Map(); this.moved=false; this.anim=0; this.leaving=false;
    this.hl=$('.hl',box); this.tip=$('.tip',box);
    this.bind(); this.apply();
  }
  apply(){const v=this.vb;this.svg.setAttribute('viewBox',`${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)}`);this.box.classList.toggle('zoomed',v.w<this.base.w*.98)}
  ratio(){const r=this.box.getBoundingClientRect();return r.width/Math.max(1,r.height)}
  clamp(v){
    const ar=this.ratio(); v.w=Math.min(this.base.w*1.0,Math.max(this.base.w/12,v.w)); v.h=v.w/ar;
    if(v.h>this.base.h*1.0&&v.w<this.base.w){}
    const cx=Math.min(this.base.w,Math.max(0,v.x+v.w/2)), cy=Math.min(this.base.h,Math.max(0,v.y+v.h/2));
    v.x=cx-v.w/2; v.y=cy-v.h/2; return v;
  }
  home(){ // вся Испания, вписать в контейнер
    const ar=this.ratio(), b=this.base; let w=b.w, h=w/ar;
    if(h<b.h){h=b.h;w=h*ar}
    return {x:b.x+b.w/2-w/2,y:b.y+b.h/2-h/2,w,h};
  }
  tween(to,dur=520,done){
    cancelAnimationFrame(this.anim);
    if(RM){this.vb=to;this.apply();done&&done();return}
    const from={...this.vb},t0=performance.now();
    const step=t=>{const k=Math.min(1,(t-t0)/dur),e=easeIO(k);
      this.vb={x:from.x+(to.x-from.x)*e,y:from.y+(to.y-from.y)*e,w:from.w+(to.w-from.w)*e,h:from.h+(to.h-from.h)*e};this.apply();
      if(k<1)this.anim=requestAnimationFrame(step);else done&&done()};
    this.anim=requestAnimationFrame(step);
  }
  zoomBy(f,cx,cy){
    const v=this.vb; if(cx==null){cx=v.x+v.w/2;cy=v.y+v.h/2}
    const nw=Math.min(this.base.w,Math.max(this.base.w/12,v.w/f)), k=nw/v.w;
    const to={x:cx-(cx-v.x)*k,y:cy-(cy-v.y)*k,w:nw,h:v.h*k};
    return to;
  }
  toUnits(cx,cy){const m=this.svg.getScreenCTM();if(!m)return{x:0,y:0};const p=new DOMPoint(cx,cy).matrixTransform(m.inverse());return{x:p.x,y:p.y}}
  focusOn(f,cb){
    this.box.classList.add('focus'); const el=this.svg.querySelector(`.cz[data-id="${f.id}"]`); el&&el.classList.add('sel');
    const ar=this.ratio(),bb=f.bb,bw=bb[2]-bb[0],bh=bb[3]-bb[1];
    let w=Math.max(bw*2.1,60),h=w/ar; if(h<bh*2.1){h=bh*2.1;w=h*ar}
    const to={x:(bb[0]+bb[2])/2-w/2,y:(bb[1]+bb[3])/2-h/2,w,h};
    this.tween(to,RM?0:520,cb);
  }
  showHL(el,e){
    const f=BY[el.dataset.id]; if(!f) return;
    this.hl.setAttribute('d',f.d); this.hl.setAttribute('class','hl on '+statusOf(f.id));
    if(e&&e.pointerType==='mouse'){
      const r=this.box.getBoundingClientRect();
      this.tip.innerHTML=`<b>${esc(f.name)}</b><i>${statusOf(f.id)==='occ'?T.status_occ:T.status_free}</i>`;
      this.tip.style.left=(e.clientX-r.left)+'px'; this.tip.style.top=(e.clientY-r.top)+'px'; this.tip.classList.add('on');
    }
  }
  hideHL(){this.hl.setAttribute('class','hl');this.tip.classList.remove('on')}
  bind(){
    const box=this.box;
    box.addEventListener('pointerover',e=>{const c=e.target.closest('.cz'); if(c&&!this.drag) this.showHL(c,e)});
    box.addEventListener('pointermove',e=>{
      const c=e.target.closest('.cz');
      if(c&&e.pointerType==='mouse'&&!this.drag){this.showHL(c,e)}
      if(!this.ptrs.has(e.pointerId)) return;
      const p=this.ptrs.get(e.pointerId), px=p.x, py=p.y; p.x=e.clientX; p.y=e.clientY;
      if(this.ptrs.size===2){ // pinch
        const [a,b]=[...this.ptrs.values()],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(this.pd){const mid=this.toUnits((a.x+b.x)/2,(a.y+b.y)/2);this.vb=this.clamp(this.zoomBy(d/this.pd,mid.x,mid.y));this.apply();this.moved=true}
        this.pd=d;return;
      }
      if(!this.drag){ if(Math.hypot(e.clientX-p.sx,e.clientY-p.sy)<6) return; if(!box.classList.contains('zoomed')&&e.pointerType!=='mouse') return; this.drag=true;this.moved=true;box.classList.add('drag');try{box.setPointerCapture(e.pointerId)}catch(_){} this.hideHL()}
      const m=this.svg.getScreenCTM(); if(!m) return;
      this.vb.x-=(e.clientX-px)/m.a; this.vb.y-=(e.clientY-py)/m.d; this.vb=this.clamp(this.vb); this.apply();
    });
    box.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse') this.hideHL()});
    box.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;this.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY});if(this.ptrs.size===1)this.moved=false;this.pd=0});
    const up=e=>{
      const had=this.ptrs.delete(e.pointerId); this.pd=0;
      if(!had) return;
      if(this.ptrs.size===0){
        const wasDrag=this.drag||this.moved; this.drag=false; box.classList.remove('drag');
        if(!wasDrag&&e.type==='pointerup'){const c=e.target.closest&&e.target.closest('.cz'); if(c) this.go(c.dataset.id)}
      }
    };
    box.addEventListener('pointerup',up); box.addEventListener('pointercancel',up);
    box.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('cz')){e.preventDefault();this.go(e.target.dataset.id)}});
    box.addEventListener('focusin',e=>{const c=e.target.closest&&e.target.closest('.cz'); if(c) this.showHL(c)});
    box.addEventListener('focusout',()=>this.hideHL());
    box.addEventListener('wheel',e=>{
      if(!(e.ctrlKey||e.metaKey)) return; e.preventDefault();
      const u=this.toUnits(e.clientX,e.clientY); this.vb=this.clamp(this.zoomBy(Math.exp(-e.deltaY*.01),u.x,u.y)); this.apply();
    },{passive:false});
    box.addEventListener('dblclick',e=>{const u=this.toUnits(e.clientX,e.clientY);this.tween(this.clamp(this.zoomBy(2,u.x,u.y)),320)});
    window.addEventListener('resize',this.onresize=()=>{if(this.box.isConnected&&this.vb.w>=this.base.w*.98){this.vb=this.home();this.apply()}});
  }
  go(id){
    if(this.leaving) return; this.leaving=true; this.hideHL();
    const f=BY[id]; this.focusOn(f,()=>{location.hash='#/comarca/'+id});
  }
  destroy(){window.removeEventListener('resize',this.onresize);cancelAnimationFrame(this.anim)}
}

function homeHTML(first){
  const words=T.h1.split(' ').map((w,i)=>`<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ');
  const ins=MAP.inset;
  return `<section class="hero"><div class="hero-in">
   <div class="hero-text">
    <h1 aria-label="${esc(T.h1)}">${words}</h1>
    <div class="hero-foot">
     <div class="legend" role="group" aria-label="${esc(T.legend_aria)}"><span><i class="sw free"></i>${T.legend_free}</span><span><i class="sw occ"></i>${T.legend_occ}</span></div>
     <div class="search" role="search">
      <label class="glass search-box">${I.search}<span class="sr">${T.search_aria}</span>
       <input id="q" type="text" role="combobox" aria-expanded="false" aria-controls="ql" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(T.search_ph)}"></label>
      <ul class="search-list" id="ql" role="listbox" hidden></ul>
     </div>
    </div>
   </div>
   <div class="map-stage">
    <div class="map" id="map"><svg role="group" aria-label="${esc(T.map_aria)}" viewBox="0 0 1000 ${MAP.viewBox[3]}" preserveAspectRatio="xMidYMid meet">
      <g>${pathsHTML(first)}</g><rect class="inset-frame" x="${ins[0]}" y="${ins[1]}" width="${ins[2]}" height="${ins[3]}" rx="10"/><path class="hl" d=""/></svg>
     <div class="tip" aria-hidden="true"></div></div>
    <div class="zoom">
     <button class="zbtn glass" data-z="in" aria-label="${esc(T.zoom_in)}">${I.plus}</button>
     <button class="zbtn glass" data-z="out" aria-label="${esc(T.zoom_out)}">${I.minus}</button>
     <button class="zbtn glass" data-z="reset" aria-label="${esc(T.zoom_reset)}">${I.reset}</button>
    </div>
   </div></div></section>`;
}
function mountHome(){
  const box=$('#map'); mv=new MapView(box); mv.vb=mv.home(); mv.apply();
  $$('.zbtn').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.z; if(k==='reset') mv.tween(mv.home(),500); else mv.tween(mv.clamp(mv.zoomBy(k==='in'?1.8:1/1.8)),360);
  }));
  // поиск
  const q=$('#q'),ql=$('#ql'); let sel=-1,res=[];
  function draw(){
    const v=norm(q.value.trim()); if(!v){ql.hidden=true;q.setAttribute('aria-expanded','false');return}
    res=MAP.features.filter(f=>norm(f.name).includes(v)).sort((a,b)=>(norm(b.name).startsWith(v)-norm(a.name).startsWith(v))||a.name.localeCompare(b.name)).slice(0,6);
    sel=res.length?0:-1;
    ql.innerHTML=res.length?res.map((f,i)=>`<li role="option" id="o${i}" data-id="${f.id}" aria-selected="${i===sel}"><span style="display:flex;align-items:center;gap:12px"><i class="dot ${statusOf(f.id)}" style="background-color:${statusOf(f.id)==='occ'?'':'transparent'}"></i>${esc(f.name)}</span><i>${esc(f.region)}</i></li>`).join(''):`<li class="none" role="option" aria-disabled="true">${T.no_results}</li>`;
    ql.hidden=false;q.setAttribute('aria-expanded','true');
  }
  function mark(){$$('li[role=option]',ql).forEach((li,i)=>li.setAttribute('aria-selected',i===sel));q.setAttribute('aria-activedescendant',sel>=0?'o'+sel:'')}
  q.addEventListener('input',draw);
  q.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(res.length-1,sel+1);mark()}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);mark()}
    else if(e.key==='Enter'&&res[sel]){e.preventDefault();mv.go(res[sel].id)}
    else if(e.key==='Escape'){ql.hidden=true;q.setAttribute('aria-expanded','false')}
  });
  ql.addEventListener('pointerdown',e=>{e.preventDefault();const li=e.target.closest('li[data-id]'); if(li) mv.go(li.dataset.id)});
  q.addEventListener('blur',()=>setTimeout(()=>{ql.hidden=true},120));
}

/* ---------- ДЕМО: афиша (генератор) ---------- */
function rng(seed){let a=0;for(const c of seed)a=(a*31+c.charCodeAt(0))>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const VENUES=['Pistas centrales','Club Mirador','Pàdel Sol Indoor','Pistas del Río','Club La Alameda','Pàdel Llevant','Pistas Can Pujol','Club Ribera'];
const TIMES=['09:30','10:00','18:30','19:30','20:00','20:30'];
function eventsFor(f){
  const r=rng(f.id), n=3+Math.floor(r()*3), days=[];
  while(days.length<n){const d=1+Math.floor(r()*24); if(!days.includes(d)) days.push(d)}
  days.sort((a,b)=>a-b);
  const types=['pairs','americano','open'];
  return days.map(d=>{
    const dt=new Date(); dt.setDate(dt.getDate()+d); const lo=1+Math.floor(r()*8)/2+0, hi=Math.min(7,lo+1);
    return {date:dt,time:TIMES[Math.floor(r()*TIMES.length)],type:types[Math.floor(r()*3)],venue:VENUES[Math.floor(r()*VENUES.length)],lo,hi,spots:1+Math.floor(r()*8)};
  });
}
function plural(n){
  const c=new Intl.PluralRules(T.htmlLang).select(n), k='spots_'+c;
  return (T[k]||T.spots_other).replace('{n}',n);
}
const nf1=n=>n.toLocaleString(T.htmlLang,{minimumFractionDigits:1,maximumFractionDigits:1});

/* ---------- страница комарки ---------- */
function miniMapHTML(f,s){
  const bb=f.bb,bw=bb[2]-bb[0],bh=bb[3]-bb[1],c=[(bb[0]+bb[2])/2,(bb[1]+bb[3])/2];
  const size=Math.max(bw,bh*1.15,34)*2.3, vb=[c[0]-size/2,c[1]-size/2,size,size];
  const nb=MAP.features.filter(g=>g.id!==f.id&&g.bb[2]>vb[0]&&g.bb[0]<vb[0]+size&&g.bb[3]>vb[1]&&g.bb[1]<vb[1]+size)
    .map(g=>`<a href="#/comarca/${g.id}" aria-label="${esc(g.name)}"><path class="nb" d="${g.d}"/></a>`).join('');
  return `<svg viewBox="${vb.map(v=>v.toFixed(1)).join(' ')}" role="img" aria-label="${esc(f.name)}" data-vb='${JSON.stringify(vb)}'><g>${nb}</g><path class="me ${s}" d="${f.d}"/></svg>`;
}
function comarcaHTML(f){
  const s=statusOf(f.id), o=occ(f.id);
  const chip=`<span class="chip ${s}">${s==='occ'?T.status_occ:T.status_free}</span>`;
  const head=`${chip}<h1 class="rv">${esc(f.name)}</h1><p class="kind rv" style="--rd:1">${esc(f.region)} · ${kindLabel(f)}</p>`;
  let body='';
  if(s==='free'){
    body=`<p class="lead rv" style="--rd:2">${T.free_lead}</p>
     <div class="captain-cta rv" style="--rd:3">${captainButtons()}</div>
     <div class="cond glass rv" style="--rd:4"><h2>${T.cond_title}</h2><ul>${T.cond.map((c,i)=>`<li><b>${i+1}</b><span>${c}</span></li>`).join('')}</ul></div>`;
  }else{
    body=`<div class="stats rv" style="--rd:2">
      <div class="stat glass"><span class="num">${o[0]}</span><span>${T.stat_members}</span></div>
      <div class="stat glass"><span class="num rank">#${o[1]}</span><span>${T.stat_rank}</span></div></div>
     <div class="join glass rv" style="--rd:3"><p>${T.join_line}</p>
      <div class="btn-row">${appBtn(T.cta_app,'btn-cta')}${appBtn(T.cta_login,'btn-line')}</div></div>`;
  }
  const ev=s==='occ'?`<section class="ev"><h2 class="rv">${T.ev_title}</h2><p class="sub rv" style="--rd:1">${T.ev_sub}</p><div class="ev-list">${
    eventsFor(f).map((e,i)=>{
      const day=e.date.toLocaleDateString(T.htmlLang,{day:'numeric'}), mon=e.date.toLocaleDateString(T.htmlLang,{month:'short'}).replace('.',''), wd=e.date.toLocaleDateString(T.htmlLang,{weekday:'short'}).replace('.','');
      return `<button class="evc glass rv" style="--rd:${i%3}" data-app><span class="evd"><b>${day}</b><span>${mon}</span></span>
       <span class="evt"><strong>${T.ev_types[e.type]}</strong><span>${wd} · ${e.time} · ${e.venue}, ${esc(f.name)}</span></span>
       <span class="evm"><span class="pill">${T.ev_level} ${nf1(e.lo)}–${nf1(e.hi)}</span><span class="pill spots">${plural(e.spots)}</span><span class="pill go">${T.ev_in_app}</span></span></button>`}).join('')
  }</div></section>`:'';
  return `<div class="wrap cpage"><a class="back" href="#/" aria-label="${esc(T.back_aria)}">${I.back}${T.back}</a>
   <div class="cgrid"><div class="cmap-card glass" id="cmap">${miniMapHTML(f,s)}</div><div class="cinfo">${head}${body}</div></div>${ev}</div>`;
}
function fitMini(){
  const card=$('#cmap'); if(!card) return; const svg=$('svg',card); if(!svg) return;
  const vb=JSON.parse(svg.dataset.vb), r=card.getBoundingClientRect(), ar=r.width/Math.max(1,r.height);
  const cx=vb[0]+vb[2]/2, cy=vb[1]+vb[3]/2; let w=vb[2],h=vb[3];
  if(ar>1){w=h*ar}else{h=w/ar}
  svg.setAttribute('viewBox',`${(cx-w/2).toFixed(1)} ${(cy-h/2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
}
window.addEventListener('resize',fitMini);

/* ---------- FAQ ---------- */
function faqHTML(){
  return `<div class="wrap"><div class="faq"><p class="eyebrow rv">Club Padelada</p><h1 class="rv" style="--rd:1">${T.faq_title}</h1><p class="sub rv" style="--rd:2">${T.faq_sub}</p>
  ${T.faq.map((q,i)=>`<div class="acc rv${i===0?' open':''}" style="--rd:${Math.min(i+2,5)}"><h2 style="font-size:inherit;font-family:inherit;font-weight:inherit;letter-spacing:0"><button class="acc-q" aria-expanded="${i===0}" aria-controls="a${i}" id="q${i}"><span>${q[0]}</span>${I.plus}</button></h2>
   <div class="acc-a" id="a${i}" role="region" aria-labelledby="q${i}"><div><p>${q[1]}</p></div></div></div>`).join('')}</div></div>`;
}
function mountFaq(){
  $$('.acc-q').forEach(b=>b.addEventListener('click',()=>{const a=b.closest('.acc'),o=a.classList.toggle('open');b.setAttribute('aria-expanded',o)}));
}

/* ---------- роутер ---------- */
const view=$('#view');
function reveal(){
  const els=$$('.rv',view); if(RM||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px',threshold:.05});
  els.forEach(e=>io.observe(e));
}
async function render(animate=true){
  await mapP;
  if(mv){mv.destroy();mv=null}
  closeSheet();
  const h=(location.hash||'#/').replace(/^#/,''), seg=h.split('/').filter(Boolean);
  const draw=()=>{
    let html='',title=T.title,cur='';
    if(seg[0]==='comarca'){
      const f=BY[seg[1]];
      if(f){html=comarcaHTML(f);title=`${f.name} · Padelada Club`}
      else html=`<div class="wrap nf"><p>${T.notfound}</p><a class="btn btn-cta" href="#/">${T.notfound_btn}</a></div>`;
    }else if(seg[0]==='faq'){html=faqHTML();title=`${T.faq_title} · Padelada Club`;cur='faq'}
    else{html=homeHTML(firstMount);cur='map'}
    view.innerHTML=html; document.title=title; window.scrollTo(0,0);
    $('#nl-map').classList.toggle('cur',cur==='map'); $('#nl-faq').classList.toggle('cur',cur==='faq');
    if(cur==='map'){mountHome();firstMount=false}
    else if(cur==='faq')mountFaq();
    else fitMini();
    reveal();
    view.classList.remove('out');
  };
  if(animate&&!RM&&view.innerHTML){view.classList.add('out');setTimeout(draw,200)}else draw();
}
window.addEventListener('hashchange',()=>render(true));
applyStatic(); render(false);
window.__PC={get lang(){return lang},get platform(){return PLATFORM}};
})();
