/* Padelada — прототип главной, 4 варианта навигации.
   Принципы: страница — обычный документ. Никаких sticky-сцен, scroll-jacking, preventDefault на wheel/touch,
   transform на body/html. Сцены — блоки 100svh. Скролл-обработчик только читает scrollY (passive) и пишет классы/transform у fixed-элементов. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.add('js');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const rmQ = matchMedia('(prefers-reduced-motion: reduce)');
  const deskQ = matchMedia('(min-width:900px)');
  let rm = rmQ.matches, desk = deskQ.matches;
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  const I18N = window.PD_I18N || {};
  const LANGS = ['es', 'ca', 'en', 'ru', 'uk'];
  let lang = 'ru', variant = 1;

  /* ---------- дополнительные строки (только для навигации/переключателя) ---------- */
  const EXTRA = {
    es: { navApp: 'App', navRating: 'Ranking', barLabel: 'Secciones', vWord: 'Variante', vLabel: 'Variante de navegación', swHint: 'Desliza', swPrev: 'Anterior', swNext: 'Siguiente' },
    ca: { navApp: 'App', navRating: 'Rànquing', barLabel: 'Seccions', vWord: 'Variant', vLabel: 'Variant de navegació', swHint: 'Llisca', swPrev: 'Anterior', swNext: 'Següent' },
    en: { navApp: 'App', navRating: 'Rating', barLabel: 'Sections', vWord: 'Option', vLabel: 'Navigation option', swHint: 'Swipe', swPrev: 'Previous', swNext: 'Next' },
    ru: { navApp: 'Приложение', navRating: 'Рейтинг', barLabel: 'Разделы', vWord: 'Вариант', vLabel: 'Вариант навигации', swHint: 'Листайте', swPrev: 'Назад', swNext: 'Вперёд' },
    uk: { navApp: 'Застосунок', navRating: 'Рейтинг', barLabel: 'Розділи', vWord: 'Варіант', vLabel: 'Варіант навігації', swHint: 'Гортайте', swPrev: 'Назад', swNext: 'Далі' },
  };
  LANGS.forEach(l => { I18N[l] = Object.assign({}, I18N[l], EXTRA[l]); });

  /* ---------- Картинки: в едином файле — data: URI, иначе обычные src ---------- */
  const ASSETS = window.PD_ASSETS;
  function applyImgs(l) {
    if (ASSETS) {
      $$('img[data-k]').forEach(im => {
        const k = im.dataset.k.replace('{L}', l), k2 = im.dataset.k.replace('{L}', 'es');
        const u = ASSETS.d[ASSETS.a[k] || ASSETS.a[k2]];
        if (u && im.getAttribute('src') !== u) im.src = u;
      });
      return;
    }
    $$('.wscreen .shot[data-src]').forEach(im => { im.src = im.dataset.src.replace('{L}', l); });
    $$('img[src*="club-card-"]').forEach(im => {
      im.src = im.getAttribute('src').replace(/club-card-(es|ca|en|ru|uk)/, 'club-card-' + l);
      const ss = im.getAttribute('srcset'); if (ss) im.setAttribute('srcset', ss.replace(/club-card-(es|ca|en|ru|uk)/g, 'club-card-' + l));
    });
  }

  /* ---------- Сцены ---------- */
  const scenes = $$('.scene').map(el => {
    const steps = $$('.step', el);
    return { el, id: el.id, n: steps.length, steps, shots: $$('.shot', el), dotsEl: $('.dots', el), dots: [], dev: $('.dev-in', el),
      pin: $('.pin', el), cur: -1, top: 0, h: 0, vis: false, timer: 0, manual: false, track: null, slides: [], sdots: [], hint: null, arrows: [] };
  });
  const byId = Object.fromEntries(scenes.map(s => [s.id, s]));
  const hero = $('.hero-sec'), heroIn = $('#heroIn'), peek = $('.peek');
  const qr = byId.qr, rating = byId.rating;
  const pills = $$('.pill'), qrN = $('#qrN'), rNum = $('#rNum'), rMk = $('#rMk');
  const RATING = 3.1;
  let ratingVal = 0;
  let heroH = 0;

  scenes.forEach(sc => {
    if (sc.n > 1) for (let i = 0; i < sc.n; i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dot'; b.setAttribute('role', 'tab');
      b.addEventListener('click', () => { sc.manual = true; stopAuto(sc); setStep(sc, i, 'user'); });
      sc.dotsEl.appendChild(b); sc.dots.push(b);
    }
    // касание телефона/часов — следующий экран (варианты 1–3)
    if (sc.n > 1) sc.dev.addEventListener('click', () => {
      if (variant === 4) return;
      sc.manual = true; stopAuto(sc); setStep(sc, (sc.cur + 1) % sc.n, 'user');
    });
  });

  const fmt = v => v.toFixed(1).replace('.', lang === 'en' ? '.' : ',');
  function ratingDraw() {
    const t = fmt(ratingVal);
    if (rNum.textContent !== t) rNum.textContent = t;
    rMk.style.left = (ratingVal / 7 * 100).toFixed(2) + '%';
  }
  let ratingRaf = 0;
  function ratingAnim(to) {
    cancelAnimationFrame(ratingRaf);
    if (rm) { ratingVal = to; ratingDraw(); return; }
    const from = ratingVal, t0 = performance.now(), d = 1300;
    (function tick(now) {
      const k = clamp((now - t0) / d); ratingVal = from + (to - from) * easeOut(k); ratingDraw();
      if (k < 1) ratingRaf = requestAnimationFrame(tick);
    })(t0);
  }
  let qrTimer = 0, qrCount = 0;
  function qrSet(n) {
    qrCount = n; pills.forEach((p, k) => p.classList.toggle('on', k < n));
    if (qrN.textContent !== String(n)) qrN.textContent = n;
  }
  function qrAnim(target) {
    clearInterval(qrTimer);
    if (rm || target === 0) { qrSet(target); return; }
    qrTimer = setInterval(() => { if (qrCount < target) qrSet(qrCount + 1); else clearInterval(qrTimer); }, 360);
  }

  function setStep(sc, i, origin) {
    i = clamp(i, 0, sc.n - 1);
    if (sc.cur !== i) {
      sc.cur = i;
      sc.steps.forEach((el, k) => { el.classList.toggle('on', k === i); el.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      sc.shots.forEach(im => { im.classList.toggle('on', (im.dataset.on || '').split(' ').includes(String(i))); });
      sc.dots.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      sc.sdots.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      sc.arrows.forEach((b, k) => { b.disabled = k === 0 ? i === 0 : i === sc.n - 1; });
      if (sc === qr) qrAnim(i >= 1 ? 4 : 0);
    }
    if (sc.track && origin !== 'swipe') {
      const w = sc.track.clientWidth;
      if (w) sc.track.scrollTo({ left: i * w, behavior: origin === 'user' && !rm ? 'smooth' : 'auto' });
    }
  }

  /* ---------- Автосмена экранов, пока сцена на экране (варианты 1–3) ---------- */
  function stopAuto(sc) { clearInterval(sc.timer); sc.timer = 0; }
  function startAuto(sc) {
    if (sc.timer || sc.n < 2 || rm || variant === 4 || sc.manual || document.hidden) return;
    sc.timer = setInterval(() => { if (variant === 4 || document.hidden) return; setStep(sc, (sc.cur + 1) % sc.n, 'auto'); }, 3400);
  }
  document.addEventListener('visibilitychange', () => scenes.forEach(sc => document.hidden ? stopAuto(sc) : (sc.vis && startAuto(sc))));

  /* ---------- IntersectionObserver: появление блоков, автосмена, числа ---------- */
  const ioScene = new IntersectionObserver(es => es.forEach(e => {
    const sc = byId[e.target.id];
    if (e.isIntersecting) {
      if (!sc.el.classList.contains('in')) {
        sc.el.classList.add('in');
        if (sc === rating) setTimeout(() => ratingAnim(RATING), 250);
      }
    }
  }), { threshold: .25 });
  const ioVis = new IntersectionObserver(es => es.forEach(e => {
    const sc = byId[e.target.id];
    const on = e.isIntersecting && e.intersectionRatio >= .6;
    sc.vis = on;
    if (on) { startAuto(sc); if (sc === rating && ratingVal < .1 && sc.el.classList.contains('in')) ratingAnim(RATING); }
    else { stopAuto(sc); if (e.intersectionRatio === 0) { sc.manual = false; if (sc === rating) { ratingVal = 0; ratingDraw(); } if (sc === qr) qrSet(sc.cur >= 1 ? qrCount : 0); } }
  }), { threshold: [0, .6] });
  scenes.forEach(sc => { ioScene.observe(sc.el); ioVis.observe(sc.el); });
  const ioRv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ioRv.unobserve(e.target); } }), { threshold: .2 });
  $$('[data-reveal]').forEach(el => ioRv.observe(el));

  /* ---------- Прокрутка: только чтение scrollY (passive) ---------- */
  const segs = $$('.seg'), fills = segs.map(s => $('b', s)), strip = $('#strip'), stripCur = $('#stripCur');
  const tabs = $$('#tabbar [data-tab]'), links = $$('#navLinks > a[data-go]');
  const TAB_OF = { story: 'story', qr: 'story', reloj: 'reloj', rating: 'rating', org: 'org', club: 'org' };
  const LINK_OF = { story: 'story', qr: 'story', reloj: 'reloj', org: 'org', club: null, rating: null };
  let ticking = false, lastY = scrollY, acc = 0, navHidden = false, activeId = null, hideToggles = 0;

  function measure() {
    const sy = scrollY;
    scenes.forEach(sc => { const r = sc.el.getBoundingClientRect(); sc.top = r.top + sy; sc.h = r.height; });
    heroH = hero.getBoundingClientRect().height;
  }
  function setNavHidden(h) {
    if (h === navHidden) return;
    navHidden = h; hideToggles++;
    nav.classList.toggle('hide', h); root.classList.toggle('nav-hid', h);
    if (h) closePops();
  }
  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight, center = y + vh * .5;
    // активная сцена — та, что под центром экрана
    let act = null;
    for (const sc of scenes) if (center >= sc.top && center < sc.top + sc.h) { act = sc; break; }
    const aid = act ? act.id : null;
    if (aid !== activeId) {
      activeId = aid;
      segs.forEach(s => { const on = s.dataset.sc === aid; s.classList.toggle('on', on); if (on) s.setAttribute('aria-current', 'true'); else s.removeAttribute('aria-current'); });
      tabs.forEach(t => { const on = TAB_OF[aid] === t.dataset.tab; t.classList.toggle('on', on); if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      links.forEach(a => a.classList.toggle('cur', LINK_OF[aid] === a.dataset.go));
      const on = segs.find(s => s.dataset.sc === aid); stripCur.textContent = on ? $('span', on).textContent : '';
    }
    root.classList.toggle('at-hero', y < heroH * .55);
    if (variant === 2) segs.forEach((s, i) => {
      const sc = byId[s.dataset.sc]; const p = clamp((center - sc.top) / sc.h);
      fills[i].style.transform = 'scaleX(' + p.toFixed(3) + ')';
    });
    // шапка (телефон): прячется вниз, возвращается вверх; гистерезис, игнор «резинки» у краёв
    if (desk || menu.classList.contains('open')) { setNavHidden(false); lastY = y; acc = 0; return; }
    const max = root.scrollHeight - innerHeight;
    if (y < 0 || y > max + 1) { lastY = y; return; }
    const dy = y - lastY; lastY = y;
    if (dy === 0) return;
    if ((dy > 0) !== (acc > 0)) acc = 0;
    acc += dy;
    if (y < 64) { setNavHidden(false); acc = 0; }
    else if (acc > 32) { setNavHidden(true); acc = 0; }
    else if (acc < -14) { setNavHidden(false); acc = 0; }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  // resize: только пересчёт координат, scrollTo не вызываем (адресная строка Safari не должна «двигать» страницу)
  let rt;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { measure(); update(); if (variant === 4) syncTracks(); }, 120); };
  addEventListener('resize', onResize); addEventListener('orientationchange', onResize);
  deskQ.addEventListener && deskQ.addEventListener('change', () => { desk = deskQ.matches; if (desk && menu.classList.contains('open')) closeMenu(); onResize(); });
  rmQ.addEventListener && rmQ.addEventListener('change', () => { rm = rmQ.matches; });

  /* ---------- Переходы по якорям: нативный smooth scroll, пользователь может перебить касанием ---------- */
  function goTo(id, st) {
    const sc = byId[id];
    const y = id === 'top' ? 0 : sc ? Math.round(sc.top) : null;
    if (y == null) return;
    scrollTo({ top: y, behavior: rm ? 'auto' : 'smooth' });
    if (sc && st != null && sc.n > 1 && sc.cur !== st) { sc.manual = true; stopAuto(sc); setStep(sc, st, 'jump'); }
  }
  $$('[data-go]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const [id, st] = a.dataset.go.split(':');
    const inMenu = menu.contains(a);
    closePops(); if (inMenu) closeMenu();
    goTo(id, st == null ? null : +st);
    try { history.replaceState(null, '', location.pathname + location.search + '#' + (id === 'top' ? '' : id)); } catch (e) {}
  }));
  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest('select,input,textarea')) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const sc = byId[activeId]; if (!sc || sc.n < 2) return;
    e.preventDefault(); sc.manual = true; stopAuto(sc);
    setStep(sc, sc.cur + (e.key === 'ArrowRight' ? 1 : -1), 'user');
  });

  /* ---------- Вариант 4: горизонтальный свайп (scroll-snap) ---------- */
  let swipeBuilt = false;
  const stripIds = el => { el.removeAttribute('id'); $$('[id]', el).forEach(n => n.removeAttribute('id')); return el; };
  const chev = d => '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  function buildSwipe() {
    if (swipeBuilt) return; swipeBuilt = true;
    scenes.forEach(sc => {
      const track = document.createElement('div');
      track.className = 'swipe'; track.setAttribute('role', 'group'); track.tabIndex = -1;
      sc.track = track;
      for (let i = 0; i < sc.n; i++) {
        const slide = document.createElement('div'); slide.className = 'slide';
        const copy = document.createElement('div'); copy.className = 'copy';
        const art = sc.steps[i].cloneNode(true); art.classList.add('on'); art.removeAttribute('aria-hidden'); copy.appendChild(art);
        if (sc === qr) { const p = stripIds($('#pills').cloneNode(true)); p.className = 'pills sw-pills'; $$('.pill', p).forEach(x => x.classList.toggle('on', i >= 1)); $('b', p).textContent = i >= 1 ? '4' : '0'; copy.appendChild(p); }
        if (sc === rating) { const m = stripIds($('#meter').cloneNode(true)); m.classList.add('sw-meter'); const t = $('.num span', m), mk = $('.mk', m); t.className = 'sw-rnum'; t.textContent = fmt(RATING); mk.style.left = (RATING / 7 * 100).toFixed(2) + '%'; copy.appendChild(m); }
        const dev = stripIds(sc.dev.cloneNode(true)); dev.removeAttribute('style');
        const keep = $$('.shot', dev).filter(im => (im.dataset.on || '').split(' ').includes(String(i)))[0];
        $$('.shot', dev).forEach(im => { if (im !== keep) im.remove(); });
        if (keep) { keep.classList.add('on'); keep.removeAttribute('loading'); keep.dataset.on = String(i); }
        const device = document.createElement('div'); device.className = 'device'; device.appendChild(dev);
        slide.append(copy, device); track.appendChild(slide); sc.slides.push(slide);
      }
      sc.pin.appendChild(track);
      if (sc.n > 1) {
        const dd = document.createElement('div'); dd.className = 'dots sw-dots'; dd.setAttribute('role', 'tablist');
        for (let i = 0; i < sc.n; i++) {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'dot' + (i === sc.cur ? ' on' : ''); b.setAttribute('role', 'tab');
          b.addEventListener('click', () => setStep(sc, i, 'user')); dd.appendChild(b); sc.sdots.push(b);
        }
        const hint = document.createElement('p'); hint.className = 'sw-hint'; hint.innerHTML = '‹ <span data-i18n="swHint"></span> ›'; sc.hint = hint;
        const prev = document.createElement('button'), next = document.createElement('button');
        prev.type = next.type = 'button'; prev.className = 'sw-arr sw-prev'; next.className = 'sw-arr sw-next';
        prev.innerHTML = chev('M12.5 4.5 7 10l5.5 5.5'); next.innerHTML = chev('m7.5 4.5 5.5 5.5-5.5 5.5');
        prev.dataset.i18nLabel = 'swPrev'; next.dataset.i18nLabel = 'swNext';
        prev.addEventListener('click', () => setStep(sc, sc.cur - 1, 'user')); next.addEventListener('click', () => setStep(sc, sc.cur + 1, 'user'));
        sc.arrows = [prev, next];
        sc.pin.append(dd, hint, prev, next);
        let raf = 0;
        track.addEventListener('scroll', () => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0; const w = track.clientWidth; if (!w) return;
            const i = Math.round(track.scrollLeft / w);
            if (i !== sc.cur) { setStep(sc, i, 'swipe'); hint.classList.add('off'); }
          });
        }, { passive: true });
        sc.arrows[0].disabled = sc.cur <= 0; sc.arrows[1].disabled = sc.cur >= sc.n - 1;
      }
    });
    setLang(lang, false, true);
  }
  function syncTracks() { scenes.forEach(sc => { if (sc.track && sc.track.clientWidth) sc.track.scrollTo({ left: Math.max(0, sc.cur) * sc.track.clientWidth, behavior: 'auto' }); }); }

  /* ---------- Переключатель вариантов ---------- */
  const vsw = $('#vsw');
  function setVariant(n, persist) {
    n = clamp(parseInt(n, 10) || 1, 1, 4);
    variant = n; root.dataset.nav = String(n);
    $$('[data-v]', vsw).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === n)));
    if (n === 4) { buildSwipe(); scenes.forEach(stopAuto); }
    else scenes.forEach(sc => { if (sc.vis) startAuto(sc); });
    if (persist) {
      try { localStorage.setItem('pd-nav', String(n)); } catch (e) {}
      try { const u = new URL(location.href); u.searchParams.set('nav', String(n)); history.replaceState(null, '', u); } catch (e) {}
    }
    requestAnimationFrame(() => { measure(); update(); if (n === 4) syncTracks(); });
  }
  $$('[data-v]', vsw).forEach(b => b.addEventListener('click', () => setVariant(b.dataset.v, true)));

  /* ---------- Меню: dropdown «Padelada», языки, полноэкранное мобильное ---------- */
  const dd = $('#dd'), ddBtn = $('#ddBtn'), langBox = $('#lang'), langBtn = $('#langBtn');
  function closePops() {
    dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', 'false');
    langBox.classList.remove('open'); langBtn.setAttribute('aria-expanded', 'false');
  }
  ddBtn.addEventListener('click', e => {
    e.stopPropagation();
    const o = !dd.classList.contains('open'); closePops();
    dd.classList.toggle('open', o); ddBtn.setAttribute('aria-expanded', String(o));
  });
  let ddT; dd.addEventListener('mouseenter', () => { if (!desk) return; clearTimeout(ddT); closePops(); dd.classList.add('open'); ddBtn.setAttribute('aria-expanded', 'true'); });
  dd.addEventListener('mouseleave', () => { if (!desk) return; ddT = setTimeout(closePops, 160); });
  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    const o = !langBox.classList.contains('open'); closePops();
    langBox.classList.toggle('open', o); langBtn.setAttribute('aria-expanded', String(o));
  });
  $$('#langMenu [data-lang]').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang, true); closePops(); langBtn.focus({ preventScroll: true }); }));
  document.addEventListener('click', e => { if (!e.target.closest('#dd,#lang')) closePops(); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (menu.classList.contains('open')) { closeMenu(); burger.focus({ preventScroll: true }); }
    closePops();
  });
  function openMenu() {
    closePops(); setNavHidden(false);
    menu.classList.add('open'); menu.removeAttribute('inert'); menu.setAttribute('aria-hidden', 'false');
    nav.classList.add('menu-open'); root.classList.add('menu-on'); document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true'); setBurgerLabel();
    const f = $('.menu-in a', menu); f && setTimeout(() => f.focus({ preventScroll: true }), 80);
  }
  function closeMenu() {
    menu.classList.remove('open'); menu.setAttribute('inert', ''); menu.setAttribute('aria-hidden', 'true');
    nav.classList.remove('menu-open'); root.classList.remove('menu-on'); document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false'); setBurgerLabel();
  }
  const setBurgerLabel = () => { const d = I18N[lang] || {}; burger.setAttribute('aria-label', (burger.getAttribute('aria-expanded') === 'true' ? d.menuClose : d.menuOpen) || 'Menu'); };
  burger.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());

  /* ---------- i18n ---------- */
  function setLang(l, persist, quiet) {
    if (!LANGS.includes(l)) l = 'ru';
    lang = l; const d = I18N[l] || {};
    root.lang = l;
    $$('[data-i18n]').forEach(el => { if (d[el.dataset.i18n] != null) el.textContent = d[el.dataset.i18n]; });
    $$('[data-i18n-alt]').forEach(el => { el.alt = d[el.dataset.i18nAlt] || ''; });
    $$('[data-i18n-label]').forEach(el => { if (el.id !== 'burger' && d[el.dataset.i18nLabel]) el.setAttribute('aria-label', d[el.dataset.i18nLabel]); });
    setBurgerLabel();
    $('#langCur').textContent = l.toUpperCase();
    $$('#langMenu [data-lang]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === l)));
    applyImgs(l);
    const pre = l === 'es' ? '/' : '/' + l + '/';
    $$('a[data-path]').forEach(a => { a.href = 'https://padelada.com' + pre + a.dataset.path; });
    scenes.forEach(sc => {
      const lab = (b, i) => b.setAttribute('aria-label', (i + 1) + '/' + sc.n + ' — ' + ($('h2', sc.steps[i]) || {}).textContent);
      sc.dots.forEach(lab); sc.sdots.forEach(lab);
    });
    $$('.sw-rnum').forEach(n => { n.textContent = fmt(RATING); });
    ratingDraw();
    activeId = null;
    document.title = 'Padelada — ' + (d.title || '');
    if (persist) {
      try { localStorage.setItem('pd-lang', l); } catch (e) {}
      try { const u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u); } catch (e) {}
    }
    if (!quiet) requestAnimationFrame(() => { measure(); update(); });
  }

  /* ---------- старт ---------- */
  let initial = 'ru', vInit = '1';
  try {
    const q = new URLSearchParams(location.search);
    initial = q.get('lang') || localStorage.getItem('pd-lang') || 'ru';
    vInit = q.get('nav') || localStorage.getItem('pd-nav') || '1';
  } catch (e) {}
  scenes.forEach(sc => setStep(sc, 0, 'init'));
  qrSet(0);
  setLang(initial, false, true);
  setVariant(vInit, false);
  const boot = () => {
    measure(); update();
    heroIn.classList.add('in'); peek.classList.add('in');
    const h = location.hash.slice(1);
    const map = { torneo: ['org', 2], reloj: ['reloj'], org: ['org', 0], club: ['club'], qr: ['qr'], rating: ['rating'], story: ['story', 0] };
    if (map[h]) { const sc = byId[map[h][0]]; if (sc) { scrollTo(0, Math.round(sc.top)); if (map[h][1] != null) setStep(sc, map[h][1], 'jump'); update(); } }
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
  addEventListener('load', () => { measure(); update(); });
  window.__pd = {
    measure, update, goTo, setLang, setVariant,
    get variant() { return variant; },
    get hideToggles() { return hideToggles; },
    get navHidden() { return navHidden; },
    get scenes() { return scenes.map(s => ({ id: s.id, top: s.top, h: s.h, n: s.n, cur: s.cur, vis: s.vis })); },
  };
})();
