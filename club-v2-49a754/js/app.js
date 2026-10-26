(function(){
'use strict';
var D=document,W=window,$=function(s,r){return(r||D).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))};
var reduce=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var page=D.body.getAttribute('data-page');

/* ---------- язык ---------- */
var qs=new URLSearchParams(location.search);
var lang=qs.get('lang');
if(LANGS.indexOf(lang)<0){try{lang=localStorage.getItem('pc_lang')}catch(e){}}
if(LANGS.indexOf(lang)<0){var nl=(navigator.language||'es').slice(0,2).toLowerCase();lang=LANGS.indexOf(nl)>=0?nl:'es'}
try{localStorage.setItem('pc_lang',lang)}catch(e){}
var T=I18N[lang];
function t(k,v){var s=T[k];if(s==null)s=I18N.es[k]||k;if(v)for(var n in v)s=s.replace('{'+n+'}',v[n]);return s}
D.documentElement.lang=lang;
function url(p,extra){var u=p+'?lang='+lang;if(extra)u+='&'+extra;return u}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}

/* ---------- платформа ---------- */
var plat=qs.get('platform');
if(['ios','android','desktop'].indexOf(plat)<0){
 var ua=navigator.userAgent||'';
 plat=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)?'ios':/Android/i.test(ua)?'android':'desktop';
}
var isMobile=plat!=='desktop';

/* ---------- иконки ---------- */
var IC={
 arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 left:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 right:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
 down:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
 globe:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
 search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 x:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};

/* ---------- перевод статического ---------- */
function translate(root){
 $$('[data-i18n]',root).forEach(function(e){e.textContent=t(e.getAttribute('data-i18n'))});
 $$('[data-i18n-html]',root).forEach(function(e){e.innerHTML=t(e.getAttribute('data-i18n-html'))});
 $$('[data-i18n-aria]',root).forEach(function(e){e.setAttribute('aria-label',t(e.getAttribute('data-i18n-aria')))});
 $$('[data-i18n-ph]',root).forEach(function(e){e.setAttribute('placeholder',t(e.getAttribute('data-i18n-ph')))});
}

/* ---------- шапка, подвал, диалог ---------- */
var home=page==='home'?'':'index.html';
function nav(h){return url('index.html')+'#'+h}
function buildChrome(){
 var cur=function(p){return page===p?' aria-current="page"':''};
 var path=location.pathname.split('/').pop()||'index.html';
 var extra=[];if(qs.get('id'))extra.push('id='+encodeURIComponent(qs.get('id')));if(qs.get('platform'))extra.push('platform='+qs.get('platform'));
 var names={es:'Español',ca:'Català',en:'English',ru:'Русский',uk:'Українська'};
 var menu=LANGS.map(function(l){return '<a href="'+path+'?lang='+l+(extra.length?'&'+extra.join('&'):'')+'" hreflang="'+l+'" lang="'+l+'"'+(l===lang?' aria-current="true"':'')+'>'+names[l]+'<small>'+l.toUpperCase()+'</small></a>'}).join('');
 $('#hdr').innerHTML='<div class="wrap hdr__in"><a class="brand" href="'+url('index.html')+'" aria-label="Club Padelada"><img src="assets/logo.svg" alt="Padelada" width="134" height="26"><span>Club</span></a>'+
 '<nav class="nav" aria-label="Menu"><a href="'+nav('club')+'">'+t('nav_club')+'</a><a href="'+nav('comarcas')+'">'+t('nav_comarcas')+'</a><a href="'+nav('agenda')+'">'+t('nav_agenda')+'</a><a href="'+nav('captains')+'">'+t('nav_captains')+'</a><a href="'+url('preguntas.html')+'"'+cur('faq')+'>'+t('nav_faq')+'</a></nav>'+
 '<div class="lang"><button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="'+t('lang_label')+'">'+IC.globe+'<span>'+lang.toUpperCase()+'</span></button><div class="lang__menu">'+menu+'</div></div>'+
 '<a class="btn btn--coral btn--sm" data-app href="#">'+t('download')+'</a></div>';
 $('#ftr').innerHTML='<div class="wrap"><div class="foot__brand"><img src="assets/logo.svg" alt="Padelada" width="124" height="24"><p>'+t('foot_line')+'</p></div>'+
 '<nav class="foot__nav" aria-label="Legal"><a href="'+LEGAL.terms.replace('{l}',lang)+'" rel="noopener">'+t('foot_terms')+'</a><a href="'+LEGAL.privacy.replace('{l}',lang)+'" rel="noopener">'+t('foot_priv')+'</a><a href="'+LEGAL.illegal.replace('{l}',lang)+'" rel="noopener">'+t('foot_illegal')+'</a><a href="'+LEGAL.mail+'">'+t('foot_contact')+'</a><a href="'+url('preguntas.html')+'">'+t('nav_faq')+'</a></nav>'+
 '<p>'+t('foot_op')+'</p><p>'+t('foot_demo')+'</p><p>'+t('foot_map')+'</p></div>';
 var lb=$('.lang__btn'),lw=$('.lang');
 lb.addEventListener('click',function(e){e.stopPropagation();var o=lw.classList.toggle('open');lb.setAttribute('aria-expanded',o)});
 D.addEventListener('click',function(e){if(!lw.contains(e.target)){lw.classList.remove('open');lb.setAttribute('aria-expanded','false')}});
 D.addEventListener('keydown',function(e){if(e.key==='Escape'){lw.classList.remove('open');lb.setAttribute('aria-expanded','false')}});
 $$('.lang__menu a').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem('pc_lang',a.getAttribute('hreflang'))}catch(e){}})});
 var hd=$('#hdr');function sc(){hd.classList.toggle('is-solid',W.scrollY>24)}sc();W.addEventListener('scroll',sc,{passive:true});
}
function badgeSrc(){
 var a=lang==='ca'||lang==='es'?'es':lang==='ru'?'ru':'en';
 var g=lang==='ca'?'es':lang;
 return{a:'assets/badges/apple-'+a+'-white.svg',g:'assets/badges/google-'+g+'.png'};
}
function storesHtml(){
 var b=badgeSrc();
 return '<a class="store" href="'+APP_LINKS.ios+'" target="_blank" rel="noopener"><img src="'+b.a+'" alt="App Store" height="52" width="156" loading="lazy"></a><a class="store store--g" href="'+APP_LINKS.android+'" target="_blank" rel="noopener"><img src="'+b.g+'" alt="Google Play" height="78" width="202" loading="lazy"></a>';
}
var dlg;
function buildDialog(){
 dlg=D.createElement('dialog');dlg.className='dl';dlg.setAttribute('aria-labelledby','dl-t');
 dlg.innerHTML='<button class="dl__x" type="button" aria-label="'+t('m_close')+'">'+IC.x+'</button><h2 id="dl-t">'+t('m_title')+'</h2><p>'+t('m_text')+'</p><img class="qrbox" src="assets/qr-app.svg" alt="QR" width="150" height="150"><div class="stores">'+storesHtml()+'</div>';
 D.body.appendChild(dlg);
 $('.dl__x',dlg).addEventListener('click',function(){dlg.close()});
 dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
}
function wireApp(){
 $$('[data-app]').forEach(function(a){
  if(isMobile){a.href=plat==='ios'?APP_LINKS.ios:APP_LINKS.android;a.target='_blank';a.rel='noopener'}
  else a.addEventListener('click',function(e){e.preventDefault();if(dlg.showModal)dlg.showModal();else window.open(APP_LINKS.ios,'_blank')});
 });
}

/* ---------- данные ---------- */
var PH={
 'girones':['girones-720','girones-1440',720,1440],'la-selva':['la-selva-720','la-selva-1440',720,1440],'segria':['segria-720','segria-1440',720,1440],
 'maresme':['maresme-720','maresme-1440',720,1440],'barcelones':['barcelones-720','barcelones-1440',720,1440],
 'alt-emporda':['alt-emporda-465','alt-emporda-930',465,930],'baix-emporda':['baix-emporda-800','baix-emporda-1600',800,1600],
 'court-indoor':['court-indoor-720','court-indoor-1440',720,1440],'court-net':['court-net-720','court-net-1440',720,1440],'court-racket':['court-racket-720','court-racket-1440',720,1440],
 'court-rackets':['court-rackets-720','court-rackets-1440',720,1440],'court-night':['court-night-720','court-night-1440',720,1440]
};
function img(key,sizes,alt,cls,eager){
 var p=PH[key];
 return '<img'+(cls?' class="'+cls+'"':'')+' src="assets/img/'+p[0]+'.webp" srcset="assets/img/'+p[0]+'.webp '+p[2]+'w, assets/img/'+p[1]+'.webp '+p[3]+'w" sizes="'+sizes+'" alt="'+esc(alt||'')+'"'+(eager?' fetchpriority="high"':' loading="lazy"')+' decoding="async">';
}
var BYID={};COMARCAS.forEach(function(c){BYID[c.id]=c});
function fmtDate(iso){
 var d=new Date(iso+'T12:00:00');
 return{day:d.getDate(),mon:new Intl.DateTimeFormat(LOCALES[lang],{month:'short'}).format(d).replace('.','')};
}
function evHtml(e){
 var c=BYID[e.comarca],d=fmtDate(e.date);
 var title=e.type==='tour'?t('ev_tour')+' · '+t('fmt_'+e.fmt):t('ev_open');
 return '<a class="ev rv" href="'+url('comarca.html','id='+e.comarca)+'"><div class="ev__d"><b>'+d.day+'</b><span>'+d.mon+'</span></div><div class="ev__t"><h3>'+title+'</h3><p>'+esc(e.club)+' · '+esc(c.name)+' · '+e.time+'</p></div><div class="ev__s" style="--f:'+Math.round((e.total-e.spots)/e.total*100)+'%"><i></i>'+t('spots',{n:e.spots})+'</div></a>';
}

/* ---------- анимации ---------- */
function initMotion(){
 var els=$$('.rv');
 if(!('IntersectionObserver' in W)||reduce){els.forEach(function(e){e.classList.add('in')})}
 else{
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(e){io.observe(e)});
 }
 if(reduce)return;
 var par=$$('[data-par]'),ticking=false;
 function frame(){
  ticking=false;var y=W.scrollY,vh=W.innerHeight;
  par.forEach(function(e){var r=e.parentNode.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;var k=parseFloat(e.getAttribute('data-par'));e.style.transform='translate3d(0,'+((r.top+r.height/2-vh/2)*-k).toFixed(1)+'px,0)'});
  cards.forEach(function(c){var r=c.getBoundingClientRect();if(r.right<0||r.left>W.innerWidth)return;c.style.setProperty('--px',(((r.left+r.width/2)-W.innerWidth/2)*-.05).toFixed(1)+'px')});
 }
 var cards=$$('.card');
 W.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
 W.addEventListener('resize',frame);
 var rl=$('.rail');if(rl)rl.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
 frame();
}

/* ---------- главная ---------- */
var RAIL=['girones','baix-emporda','segria','barcelones','maresme','alt-emporda','la-selva'];
var CLS={'girones':'card--wide','baix-emporda':'card--wide','segria':'card--tall','barcelones':'card--wide','maresme':'card--std','alt-emporda':'card--tall','la-selva':'card--std'};
function cardHtml(id){
 var c=BYID[id],tk=c.members>0;
 return '<a class="card '+CLS[id]+'" href="'+url('comarca.html','id='+id)+'" role="listitem">'+img(id,'(min-width:900px) 620px, 84vw',c.name)+
 '<div class="card__cap"><div><h3>'+esc(c.name)+'</h3><p class="meta"><span class="dot dot--'+(tk?'taken':'free')+'"></span><span>'+(tk?t('members',{n:c.members})+' · '+t('demo'):t('lg_free'))+'</span></p></div><span class="card__go" aria-hidden="true">'+IC.arrow+'</span></div></a>';
}
function initHome(){
 var rail=$('.rail');
 rail.innerHTML=RAIL.map(cardHtml).join('');
 var prev=$('#rprev'),next=$('#rnext');
 function step(){var c=$('.card',rail);return c?c.getBoundingClientRect().width+16:400}
 function upd(){prev.disabled=rail.scrollLeft<8;next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-8}
 prev.addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:reduce?'auto':'smooth'})});
 next.addEventListener('click',function(){rail.scrollBy({left:step(),behavior:reduce?'auto':'smooth'})});
 rail.addEventListener('scroll',upd,{passive:true});upd();
 /* поиск */
 var list=$('#pills'),inp=$('#q'),cnt=$('#cnt'),flt='all';
 var sorted=COMARCAS.slice().sort(function(a,b){return norm(a.name)<norm(b.name)?-1:1});
 function draw(){
  var q=norm(inp.value),n=0,h='';
  sorted.forEach(function(c){
   var tk=c.members>0;if(flt==='taken'&&!tk||flt==='free'&&tk)return;if(q&&norm(c.name).indexOf(q)<0)return;n++;
   h+='<a class="pill" href="'+url('comarca.html','id='+c.id)+'"><span class="dot dot--'+(tk?'taken':'free')+'"></span><span>'+esc(c.name)+'</span>'+(tk?'<small>'+c.members+'</small>':'')+'</a>';
  });
  list.innerHTML=h||'<p class="empty">'+t('find_empty')+'</p>';cnt.textContent=t('find_count',{n:n});
 }
 inp.addEventListener('input',draw);
 $$('.finder .seg button').forEach(function(b){b.addEventListener('click',function(){flt=b.getAttribute('data-f');$$('.finder .seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});draw()})});
 draw();
 /* афиша */
 var evs=$('#evs'),af='all';
 function drawEv(){
  var l=EVENTS.filter(function(e){return af==='all'||e.type===af}).sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0});
  evs.innerHTML=l.map(evHtml).join('');
  $$('.rv',evs).forEach(function(e){requestAnimationFrame(function(){e.classList.add('in')})});
 }
 $$('#agenda .seg button').forEach(function(b){b.addEventListener('click',function(){af=b.getAttribute('data-f');$$('#agenda .seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});drawEv()})});
 drawEv();
 $$('#evs .rv').forEach(function(e){e.classList.remove('rv')});
}

/* ---------- комарка ---------- */
function initComarca(){
 var id=qs.get('id'),c=BYID[id],main=$('#cmain');
 if(!c){main.innerHTML='<div class="nf"><div><h1 class="d">'+t('nf_t')+'</h1><a class="btn btn--coral" href="'+url('index.html')+'#comarcas">'+t('nf_l')+'</a></div></div>';return}
 var tk=c.members>0,key=c.photo||c.court;
 D.title=c.name+' — Club Padelada';
 var back='<a class="crumb" href="'+url('index.html')+'#comarcas">'+IC.left+'<span>'+t('c_back')+'</span></a>';
 var hero='<section class="chero kb"><div class="bgl" data-par="0.12">'+img(key,'100vw','',null,true)+'</div><div class="scrim"></div><div class="wrap">'+back+'<p class="eyebrow">'+(tk?t('c_crumb'):t('f_eyebrow'))+'</p><h1 class="d">'+esc(c.name)+'</h1><span class="badge"><span class="dot dot--'+(tk?'taken':'free')+'"></span>'+(tk?t('lg_taken'):t('lg_free'))+'</span></div></section>';
 var mapP='<div class="panel"><h2>'+t('c_map')+'</h2><div class="map" id="map" role="img" aria-label="'+esc(t('c_map_alt',{name:c.name}))+'"></div></div>';
 var body;
 var evl=EVENTS.filter(function(e){return e.comarca===id}).sort(function(a,b){return a.date<b.date?-1:1});
 if(tk){
  body='<div class="wrap cgrid">'+mapP+'<div class="stats"><div class="stat rv"><span>'+t('members_label')+' · '+t('demo')+'</span><b>'+c.members+'</b></div><div class="stat rv" style="--d:.1s"><span>'+t('c_stat_rank')+' · '+t('demo')+'</span><b>'+c.rank+'</b><small>'+t('c_rank_of',{n:TAKEN_TOTAL})+'</small></div><div class="stat rv" style="--d:.2s"><span>'+t('c_stat_events')+' · '+t('demo')+'</span><b>'+evl.length+'</b></div></div></div>'+
  '<section class="wrap cagenda"><h2 class="d rv">'+t('c_ag_title')+'</h2><div class="evs" id="cev">'+(evl.length?evl.map(evHtml).join(''):'<p class="empty">'+t('c_ag_empty')+'</p>')+'</div><div class="btns rv" style="margin-top:22px"><a class="btn btn--ghost" href="'+url('index.html')+'#agenda">'+t('c_ag_all')+IC.arrow+'</a></div></section>'+
  '<section class="wrap"><div class="cta rv"><div><h2>'+t('c_cta_title')+'</h2><p>'+t('c_note')+'</p></div><div class="btns"><a class="btn btn--coral" data-app href="#">'+t('c_login')+'</a><a class="btn btn--ghost" data-app href="#">'+t('c_app')+'</a></div></div></section>';
 }else{
  body='<div class="wrap cgrid">'+mapP+'<div class="panel"><h2>'+t('f_cond')+'</h2><ul class="cond"><li class="rv">'+t('f_c1')+'</li><li class="rv" style="--d:.1s">'+t('f_c2')+'</li><li class="rv" style="--d:.2s">'+t('f_c3')+'</li></ul><div class="btns" style="margin-top:24px"><a class="btn btn--coral" data-app href="#">'+t('f_cta')+IC.arrow+'</a></div><p class="note">'+t('f_note')+'</p></div></div>'+
  (evl.length?'<section class="wrap cagenda"><h2 class="d">'+t('c_ag_title')+'</h2><div class="evs">'+evl.map(evHtml).join('')+'</div></section>':'')+
  '<section class="wrap" style="margin-top:16px"><div class="btns"><a class="btn btn--ghost" href="'+url('index.html')+'#comarcas">'+t('f_other')+IC.arrow+'</a></div></section>';
 }
 main.innerHTML=hero+body;
 /* карта */
 fetch('shapes.json').then(function(r){return r.json()}).then(function(S){
  var me=S.f.filter(function(f){return f.id===id})[0];if(!me)return;
  var b=me.bb,w=b[2]-b[0],h=b[3]-b[1],cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;
  var vw=Math.max(w*1.9,h*1.9*4/3,60),vh=vw*3/4;
  var sv='<svg viewBox="'+(cx-vw/2).toFixed(1)+' '+(cy-vh/2).toFixed(1)+' '+vw.toFixed(1)+' '+vh.toFixed(1)+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
  S.f.forEach(function(f){if(f.id!==id)sv+='<path class="n" d="'+f.d+'"/>'});
  sv+='<path class="s s--'+(tk?'taken':'free')+'" d="'+me.d+'"/></svg>';
  $('#map').innerHTML=sv;
 }).catch(function(){});
}

/* ---------- FAQ ---------- */
function initFaq(){
 var h='';
 for(var i=1;i<=5;i++)h+='<div class="qa rv"><h2><button class="qa__q" type="button" aria-expanded="false" aria-controls="a'+i+'" id="q'+i+'"><span>'+t('q'+i)+'</span><i aria-hidden="true"></i></button></h2><div class="qa__a" id="a'+i+'" role="region" aria-labelledby="q'+i+'"><div><p>'+t('a'+i)+'</p></div></div></div>';
 $('#faq').innerHTML=h;
 $$('.qa__q').forEach(function(b){b.addEventListener('click',function(){var qa=b.closest('.qa'),o=!qa.classList.contains('open');qa.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})});
}

/* ---------- старт ---------- */
D.title=t('meta_'+(page==='home'?'home':page==='faq'?'faq':'comarca'));
var md=$('meta[name=description]');if(md)md.setAttribute('content',t(page==='home'?'hero_sub':'faq_sub'));
translate(D);
buildChrome();buildDialog();
if(page==='home')initHome();else if(page==='comarca')initComarca();else if(page==='faq')initFaq();
$$('a[data-lang-link]').forEach(function(a){a.href=url(a.getAttribute('data-lang-link'))+(a.getAttribute('data-hash')||'')});
translate(D);
var st=$('#stores');if(st)st.innerHTML=storesHtml();
wireApp();
initMotion();
})();
