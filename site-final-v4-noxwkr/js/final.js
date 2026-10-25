/* Padelada — прототип главной, v4 (финал навигации + правки Sites Manager): нижняя панель + горизонтальный свайп экранов.
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
  let lang = 'ru';

  /* ---------- дополнительные строки (только для навигации/переключателя) ---------- */
  const EXTRA = {
    es: { navApp: 'App', navRating: 'Ranking', barLabel: 'Secciones', swHint: 'Desliza', swPrev: 'Anterior', swNext: 'Siguiente' },
    ca: { navApp: 'App', navRating: 'Rànquing', barLabel: 'Seccions', swHint: 'Llisca', swPrev: 'Anterior', swNext: 'Següent' },
    en: { navApp: 'App', navRating: 'Rating', barLabel: 'Sections', swHint: 'Swipe', swPrev: 'Previous', swNext: 'Next' },
    ru: { navApp: 'Приложение', navRating: 'Рейтинг', barLabel: 'Разделы', swHint: 'Листайте', swPrev: 'Назад', swNext: 'Вперёд' },
    uk: { navApp: 'Застосунок', navRating: 'Рейтинг', barLabel: 'Розділи', swHint: 'Гортайте', swPrev: 'Назад', swNext: 'Далі' },
  };
  LANGS.forEach(l => { I18N[l] = Object.assign({}, I18N[l], EXTRA[l]); });

  /* ---------- Картинки: в едином файле — data: URI (ключ data-k), иначе обычные src. Шаблон {L} + data-langs: нет языка — берём первый (es) ---------- */
  const ASSETS = window.PD_ASSETS;
  const pickL = (im, l) => { const ls = (im.dataset.langs || '').split(',').filter(Boolean); return ls.length ? (ls.includes(l) ? l : ls[0]) : null; };
  function applyImgs(l) {
    if (ASSETS) {
      $$('img[data-k]').forEach(im => {
        const L = pickL(im, l) || l, k = im.dataset.k.replace('{L}', L);
        const u = ASSETS.d[ASSETS.a[k]];
        if (u && im.getAttribute('src') !== u) im.src = u;
      });
      return;
    }
    $$('img[data-tpl]').forEach(im => {
      const L = pickL(im, l), main = im.dataset.tpl.replace('{L}', L);
      if (im.getAttribute('src') !== main) im.src = main;
      if (im.dataset.tplSm) im.srcset = im.dataset.tplSm.replace('{L}', L) + ' ' + im.dataset.wSm + 'w, ' + main + ' ' + im.dataset.w + 'w';
    });
  }

  /* ---------- Сцены: исходные .stage служат шаблоном, затем заменяются лентой свайпа ---------- */
  const scenes = $$('.scene').map(el => {
    const steps = $$('.step', el);
    return { el, id: el.id, n: steps.length, steps, stage: $('.stage', el), dev: $('.dev-in', el), pin: $('.pin', el),
      cur: 0, top: 0, h: 0, track: null, slides: [], sdots: [], hint: null, arrows: [] };
  });
  const byId = Object.fromEntries(scenes.map(s => [s.id, s]));
  const hero = $('.hero-sec'), heroIn = $('#heroIn'), peek = $('.peek');
  const RATING = 3.5;   // v4: значение на экране «Мой уровень» (3,5); число и маркер рядом со шкалой должны совпадать с ним
  let rVal = RATING;
  let heroH = 0;

  const fmt = v => v.toFixed(1).replace('.', lang === 'en' ? '.' : ',');

  function setStep(sc, i, origin) {
    i = clamp(i, 0, sc.n - 1);
    if (sc.cur !== i) {
      sc.cur = i;
      sc.sdots.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      sc.arrows.forEach((b, k) => { b.disabled = k === 0 ? i === 0 : i === sc.n - 1; });
    }
    if (sc.track && origin !== 'swipe') {
      const w = sc.track.clientWidth;
      if (w) sc.track.scrollTo({ left: i * w, behavior: (origin === 'user' || origin === 'jump') && !rm ? 'smooth' : 'auto' });
    }
  }

  const ioRv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ioRv.unobserve(e.target); } }), { threshold: .2 });
  $$('[data-reveal]').forEach(el => ioRv.observe(el));

  /* ---------- Прокрутка: только чтение scrollY (passive) ---------- */
  const tabs = $$('#tabbar [data-tab]'), links = $$('#navLinks > a[data-go]');
  const TAB_OF = { story: 'story', reloj: 'reloj', messenger: 'story', qr: 'story', rating: 'rating', org: 'org', club: 'org' };
  const LINK_OF = { story: null, reloj: 'reloj', messenger: 'messenger', qr: null, org: 'org', club: null, rating: null };
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
      tabs.forEach(t => { const on = TAB_OF[aid] === t.dataset.tab; t.classList.toggle('on', on); if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      links.forEach(a => a.classList.toggle('cur', !!LINK_OF[aid] && LINK_OF[aid] === a.dataset.go.split(':')[0]));
    }
    // сдвиг прокрутки из-за смены размеров окна (адресная строка, поворот) — не жест пользователя: шапку не трогаем
    if (performance.now() < resizeUntil) { lastY = y; acc = 0; return; }
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
  let rt, resizeUntil = 0;
  const onResize = () => { resizeUntil = performance.now() + 450; clearTimeout(rt); rt = setTimeout(() => { measure(); update(); syncTracks(); }, 120); };
  addEventListener('resize', onResize); addEventListener('orientationchange', onResize);
  deskQ.addEventListener && deskQ.addEventListener('change', () => { desk = deskQ.matches; if (desk && menu.classList.contains('open')) closeMenu(); onResize(); });
  rmQ.addEventListener && rmQ.addEventListener('change', () => { rm = rmQ.matches; });

  /* ---------- Переходы по якорям: нативный smooth scroll, пользователь может перебить касанием ---------- */
  function goTo(id, st) {
    const sc = byId[id];
    const y = id === 'top' ? 0 : sc ? Math.round(sc.top) : null;
    if (y == null) return;
    scrollTo({ top: y, behavior: rm ? 'auto' : 'smooth' });
    if (sc && st != null && sc.n > 1 && sc.cur !== st) setStep(sc, st, 'jump');
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
    e.preventDefault();
    setStep(sc, sc.cur + (e.key === 'ArrowRight' ? 1 : -1), 'user');
  });

  /* ---------- Горизонтальный свайп (scroll-snap) ---------- */
  const stripIds = el => { el.removeAttribute('id'); $$('[id]', el).forEach(n => n.removeAttribute('id')); return el; };
  const chev = d => '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  function buildSwipe() {
    const pillsT = $('#pills'), meterT = $('#meter');
    scenes.forEach(sc => {
      const track = document.createElement('div');
      track.className = 'swipe'; track.setAttribute('role', 'group'); track.tabIndex = -1;
      sc.track = track;
      for (let i = 0; i < sc.n; i++) {
        const slide = document.createElement('div'); slide.className = 'slide';
        const copy = document.createElement('div'); copy.className = 'copy';
        const art = sc.steps[i].cloneNode(true); art.classList.add('on'); art.removeAttribute('aria-hidden'); copy.appendChild(art);
        if (sc.id === 'qr') { const p = stripIds(pillsT.cloneNode(true)); p.className = 'pills sw-pills'; $$('.pill', p).forEach(x => x.classList.toggle('on', i >= 1)); $('b', p).textContent = i >= 1 ? '4' : '0'; copy.appendChild(p); }
        if (sc.id === 'rating') { const m = stripIds(meterT.cloneNode(true)); m.classList.add('sw-meter'); const t = $('.num span', m), mk = $('.mk', m); t.className = 'sw-rnum'; t.textContent = fmt(RATING); mk.style.left = (RATING / 7 * 100).toFixed(2) + '%'; copy.appendChild(m); }
        const dev = stripIds(sc.dev.cloneNode(true)); dev.removeAttribute('style');
        const keep = $$('.shot', dev).filter(im => (im.dataset.on || '').split(' ').includes(String(i)))[0];
        $$('.shot', dev).forEach(im => { if (im !== keep) im.remove(); });
        $$('.phone,.watch', dev).forEach(b => { if (!$('.shot', b)) b.remove(); });   // сцена с разными устройствами (часы + iPhone): оставляем только нужное
        if (keep) { keep.classList.add('on'); keep.removeAttribute('loading'); keep.dataset.on = String(i); }
        const device = document.createElement('div'); device.className = 'device'; device.appendChild(dev);
        slide.append(copy, device); track.appendChild(slide); sc.slides.push(slide);
      }
      sc.pin.appendChild(track);
      if (sc.n > 1) {
        const dd = document.createElement('div'); dd.className = 'dots sw-dots'; dd.setAttribute('role', 'tablist');
        for (let i = 0; i < sc.n; i++) {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'dot' + (i === 0 ? ' on' : ''); b.setAttribute('role', 'tab');
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
    scenes.forEach(sc => { sc.steps = sc.slides.map(s => $('.step', s)); sc.stage.remove(); sc.stage = null; sc.dev = null; });
    setLang(lang, false, true);
  }
  // Подгонка ленты только при смене ширины (поворот, ресайз окна). Смена высоты (адресная строка Safari) ленту не трогает.
  function syncTracks() {
    scenes.forEach(sc => {
      const t = sc.track; if (!t) return; const w = t.clientWidth;
      if (w && w !== sc.w) { sc.w = w; t.scrollTo({ left: Math.max(0, sc.cur) * w, behavior: 'auto' }); }
    });
  }

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
    $$('a[data-href]').forEach(a => { a.href = a.dataset.href; });
    scenes.forEach(sc => {
      const lab = (b, i) => b.setAttribute('aria-label', (i + 1) + '/' + sc.n + ' — ' + ($('h2', sc.steps[i]) || {}).textContent);
      sc.sdots.forEach(lab);
    });
    $$('.sw-rnum').forEach(n => { n.textContent = fmt(rVal); });
    activeId = null;
    document.title = 'Padelada — ' + (d.title || '');
    if (persist) {
      try { localStorage.setItem('pd-lang', l); } catch (e) {}
      try { const u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u); } catch (e) {}
    }
    if (!quiet) requestAnimationFrame(() => { measure(); update(); });
  }

  /* ---------- v4: рейтинг — маркер «едет» по шкале, число плавно считается до реального значения экрана (3,5) ----------
     Один раз, когда сцена входит в кадр. Пока сцены нет в кадре, шкала стоит на 2,8 (начало графика «Мой уровень»), никогда не 0,0.
     Без IntersectionObserver / при prefers-reduced-motion — сразу 3,5. Прокрутку и свайп не трогает. */
  const RSTART = 2.8;
  function setMeter(v) {
    rVal = v;
    $$('.sw-rnum').forEach(n => { n.textContent = fmt(v); });
    $$('.sw-meter .mk').forEach(m => { m.style.left = (v / 7 * 100).toFixed(2) + '%'; });
  }
  function armMeter() {
    const sc = byId.rating;
    if (!sc || rmQ.matches || !('IntersectionObserver' in window)) return;
    setMeter(RSTART);
    let t0 = 0;
    const step = now => {
      if (!t0) t0 = now;
      const k = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
      setMeter(RSTART + (RATING - RSTART) * e);
      if (k < 1) requestAnimationFrame(step); else setMeter(RATING);
    };
    const io = new IntersectionObserver(es => {
      if (es.some(e => e.isIntersecting)) { io.disconnect(); requestAnimationFrame(step); }
    }, { threshold: 0.2 });
    io.observe(sc.el);
  }

  /* ---------- старт ---------- */
  let initial = 'ru';
  try { const q = new URLSearchParams(location.search); initial = q.get('lang') || localStorage.getItem('pd-lang') || 'ru'; } catch (e) {}
  buildSwipe();
  setLang(initial, false, true);
  armMeter();
  const boot = () => {
    measure(); update();
    heroIn.classList.add('in'); peek.classList.add('in');
    const h = location.hash.slice(1);
    const map = { torneo: ['org', 5], reloj: ['reloj'], messenger: ['messenger', 0], org: ['org', 0], club: ['club'], qr: ['qr'], rating: ['rating'], story: ['story', 0] };
    if (map[h]) { const sc = byId[map[h][0]]; if (sc) { scrollTo(0, Math.round(sc.top)); if (map[h][1] != null) setStep(sc, map[h][1], 'auto'); update(); } }
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
  addEventListener('load', () => { measure(); update(); });
  if (window.ResizeObserver) new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { measure(); update(); }, 60); }).observe($('#main'));
  window.__pd = {
    measure, update, goTo, setLang,
    get hideToggles() { return hideToggles; },
    get navHidden() { return navHidden; },
    get scenes() { return scenes.map(s => ({ id: s.id, top: s.top, h: s.h, n: s.n, cur: s.cur })); },
  };
})();
