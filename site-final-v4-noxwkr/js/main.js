/* Padelada — прототип главной v2. Один scroll-движок: scroll + rAF, без зависимостей и CDN. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.add('js');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const rmQ = matchMedia('(prefers-reduced-motion: reduce)');
  const deskQ = matchMedia('(min-width:900px)');
  let rm = rmQ.matches, desk = deskQ.matches, vh = innerHeight, vw = innerWidth;
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  const I18N = window.PD_I18N || {};
  const LANGS = ['es', 'ca', 'en', 'ru', 'uk'];
  let lang = 'ru';

  /* ---------- Сцены ---------- */
  const scenes = $$('.scene').map(el => {
    const steps = $$('.step', el), n = steps.length;
    const dotsEl = $('.dots', el), dots = [];
    const sc = {
      el, kind: el.dataset.scene, id: el.id, n, steps, dots, shots: $$('.shot', el), pin: $('.pin', el), dev: $('.dev-in', el),
      copy: $('.copy', el), lead: parseFloat(el.dataset.lead || 0), cur: -1, top: 0, h: 0, pinH: 0, travel: 0, leadPx: 0,
    };
    if (n > 1) for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dot'; b.setAttribute('role', 'tab');
      b.addEventListener('click', () => goTo(sc.id, i));
      dotsEl.appendChild(b); dots.push(b);
    }
    return sc;
  });
  const byId = Object.fromEntries(scenes.map(s => [s.id, s]));
  const story = byId.story, heroIn = $('#heroIn');
  const qr = byId.qr, rating = byId.rating;
  const pills = $$('.pill'), qrN = $('#qrN');
  const rNum = $('#rNum'), rMk = $('#rMk');
  const revealEls = $$('[data-reveal]').map(el => ({ el, top: 0 }));
  const RATING = 3.1;
  let tx0 = 0, ty0 = 0, s0 = .82;

  function measure() {
    rm = rmQ.matches; desk = deskQ.matches; vh = innerHeight; vw = root.clientWidth;
    root.classList.toggle('rm', rm);
    const sy = scrollY;
    scenes.forEach(sc => {
      sc.dev.style.transform = 'none'; sc.dev.style.opacity = '';
      const r = sc.el.getBoundingClientRect();
      sc.top = r.top + sy; sc.h = r.height; sc.pinH = sc.pin.offsetHeight;
      sc.travel = Math.max(1, sc.h - sc.pinH); sc.leadPx = sc.lead * sc.pinH;
    });
    // геометрия «въезда» телефона в hero
    const ph = $('.phone', story.dev), pr = story.pin.getBoundingClientRect(), r = ph.getBoundingClientRect();
    const cx = r.left + r.width / 2 - pr.left, cy = r.top + r.height / 2 - pr.top;
    tx0 = desk ? (pr.width / 2 - cx) : 0;
    const peek = clamp(story.pinH * .15, 74, 130);
    ty0 = (story.pinH - peek + r.height * s0 / 2) - cy;
    revealEls.forEach(o => { o.el.classList.remove('in'); o.top = o.el.getBoundingClientRect().top + sy; });
    cur_ = -1;
  }
  let cur_ = -1;

  function setStep(sc, i) {
    if (sc.cur === i) return; sc.cur = i;
    sc.steps.forEach((el, k) => { el.classList.toggle('on', k === i); el.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    sc.shots.forEach(im => { const on = (im.dataset.on || '').split(' ').includes(String(i)); im.classList.toggle('on', on); });
    sc.dots.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
  }

  const fmt = v => v.toFixed(1).replace('.', lang === 'en' ? '.' : ',');
  let lastY = 0, navHidden = false, ticking = false;

  function update() {
    ticking = false;
    const y = Math.max(0, scrollY);
    scenes.forEach(sc => {
      const rel = y - sc.top;
      if (rel < -vh - 40 || rel > sc.h + 40) return;
      if (sc === story) {
        const lead = sc.leadPx;
        const th = rm ? (rel >= lead * .5 ? 1 : 0) : clamp(rel / lead);
        const a = clamp(th / .62), b = clamp((th - .5) / .5);
        if (!rm) {
          const ea = easeOut(a), s = s0 + (1 - s0) * ea, tx = tx0 * (1 - easeInOut(b)), ty = ty0 * (1 - ea);
          sc.dev.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${s.toFixed(4)})`;
          sc.dev.style.opacity = '';
          const ho = clamp(1 - a * 1.7);
          heroIn.style.opacity = ho.toFixed(3);
          heroIn.style.transform = `translate3d(0,${(-a * 46).toFixed(1)}px,0)`;
          heroIn.style.visibility = ho <= 0 ? 'hidden' : 'visible';
          sc.copy.style.opacity = b.toFixed(3);
          sc.copy.style.transform = `translate3d(0,${((1 - b) * 20).toFixed(1)}px,0)`;
          sc.copy.style.visibility = b <= 0 ? 'hidden' : 'visible';
        } else {
          const show = th >= 1;
          sc.dev.style.transform = 'none'; sc.dev.style.opacity = show ? '1' : '0';
          heroIn.style.opacity = show ? '0' : '1'; heroIn.style.transform = 'none'; heroIn.style.visibility = show ? 'hidden' : 'visible';
          sc.copy.style.opacity = show ? '1' : '0'; sc.copy.style.transform = 'none'; sc.copy.style.visibility = show ? 'visible' : 'hidden';
        }
        const t = clamp((rel - lead) / Math.max(1, sc.travel - lead));
        setStep(sc, Math.min(sc.n - 1, Math.floor(t * sc.n)));
        return;
      }
      const e = clamp(1 - (sc.top - y) / vh);
      const t = clamp(rel / sc.travel);
      if (!rm) {
        const ee = easeOut(e);
        sc.dev.style.transform = `translate3d(0,${((1 - ee) * vh * .08).toFixed(1)}px,0) scale(${(.9 + .1 * ee).toFixed(4)})`;
        sc.dev.style.opacity = clamp(e * 1.9).toFixed(3);
        sc.copy.style.opacity = clamp((e - .2) / .55).toFixed(3);
        sc.copy.style.transform = `translate3d(0,${((1 - ee) * 24).toFixed(1)}px,0)`;
      } else { sc.dev.style.transform = 'none'; sc.dev.style.opacity = ''; sc.copy.style.opacity = ''; sc.copy.style.transform = ''; }
      const step = Math.min(sc.n - 1, Math.floor(t * sc.n));
      setStep(sc, step);
      if (sc === qr) {
        let n = rm ? (step >= 1 ? 4 : 0) : (t < .3 ? 0 : Math.min(4, Math.floor((t - .3) / .08) + 1));
        pills.forEach((p, k) => p.classList.toggle('on', k < n));
        if (qrN.textContent !== String(n)) qrN.textContent = n;
      }
      if (sc === rating) {
        const c = rm ? 1 : clamp((rel + vh * .35) / (sc.travel * .5 + vh * .35));
        const v = RATING * easeOut(c);
        const txt = fmt(v); if (rNum.textContent !== txt) rNum.textContent = txt;
        rMk.style.left = (v / 7 * 100).toFixed(2) + '%';
      }
    });
    // ступенчатое появление блоков
    revealEls.forEach(o => { if (y + vh * .92 > o.top) o.el.classList.add('in'); });
    // шапка: на мобильном прячется при прокрутке вниз, возвращается вверх
    if (!desk && !menu.classList.contains('open')) {
      const dy = y - lastY;
      if (y < 80 || dy < -4) navHidden = false; else if (dy > 4) { navHidden = true; closePops(); }
    } else navHidden = false;
    nav.classList.toggle('hide', navHidden);
    lastY = y;
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  let rt, lastW = innerWidth, lastH = innerHeight;
  const onResize = () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 140) return; // адресная строка мобильного браузера
      lastW = innerWidth; lastH = innerHeight; relayout();
    }, 90);
  };
  addEventListener('resize', onResize); addEventListener('orientationchange', onResize);
  rmQ.addEventListener && rmQ.addEventListener('change', () => relayout());
  function relayout() { const y = scrollY; measure(); update(); if (desk && menu.classList.contains('open')) closeMenu(); scrollTo(0, y); update(); }

  /* ---------- Прокрутка к сценам (единый rAF-твин) ---------- */
  let anim = 0;
  const stopAnim = () => { anim++; };
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(ev => addEventListener(ev, stopAnim, { passive: true }));
  function animateTo(y) {
    y = Math.max(0, Math.round(y));
    const id = ++anim, from = scrollY, dist = y - from;
    if (rm || Math.abs(dist) < 4) { scrollTo(0, y); update(); return; }
    const dur = clamp(520 + Math.abs(dist) * .18, 600, 1500), t0 = performance.now();
    (function tick(now) {
      if (id !== anim) return;
      const k = clamp((now - t0) / dur);
      scrollTo(0, from + dist * easeInOut(k));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  function yFor(id, i) {
    if (id === 'top') return 0;
    const sc = byId[id]; if (!sc) return null;
    const from = sc.leadPx, span = sc.travel - from;
    const step = i == null ? 0 : i;
    return sc.top + from + (step + .5) / sc.n * span;
  }
  function goTo(id, i, push) {
    const y = yFor(id, i); if (y == null) return;
    animateTo(y);
    if (push) try { history.replaceState(null, '', location.pathname + location.search + '#' + (id === 'top' ? '' : id)); } catch (e) {}
  }
  $$('[data-go]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const [id, st] = a.dataset.go.split(':');
    const inMenu = menu.contains(a);
    closePops(); if (inMenu) closeMenu(true);
    goTo(id, st == null ? null : +st, true);
  }));
  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest('select,input,textarea')) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const y = scrollY, sc = scenes.find(s => y >= s.top + s.leadPx - 2 && y <= s.top + s.travel + 2);
    if (!sc || sc.n < 2) return;
    e.preventDefault();
    goTo(sc.id, clamp(sc.cur + (e.key === 'ArrowRight' ? 1 : -1), 0, sc.n - 1));
  });

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
  $$('#langMenu [data-lang]').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang, true); closePops(); langBtn.focus(); }));
  document.addEventListener('click', e => { if (!e.target.closest('#dd,#lang')) closePops(); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (menu.classList.contains('open')) { closeMenu(); burger.focus(); }
    closePops();
  });
  function openMenu() {
    closePops();
    menu.classList.add('open'); menu.removeAttribute('inert'); menu.setAttribute('aria-hidden', 'false');
    nav.classList.add('menu-open'); document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true'); setBurgerLabel();
    const f = $('.menu-in a', menu); f && setTimeout(() => f.focus({ preventScroll: true }), 80);
  }
  function closeMenu(instantFocus) {
    menu.classList.remove('open'); menu.setAttribute('inert', ''); menu.setAttribute('aria-hidden', 'true');
    nav.classList.remove('menu-open'); document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false'); setBurgerLabel();
  }
  const setBurgerLabel = () => { const d = I18N[lang] || {}; burger.setAttribute('aria-label', (burger.getAttribute('aria-expanded') === 'true' ? d.menuClose : d.menuOpen) || 'Menu'); };
  burger.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());

  /* ---------- i18n ---------- */
  function setLang(l, persist) {
    if (!LANGS.includes(l)) l = 'ru';
    lang = l; const d = I18N[l] || {};
    root.lang = l;
    $$('[data-i18n]').forEach(el => { if (d[el.dataset.i18n] != null) el.textContent = d[el.dataset.i18n]; });
    $$('[data-i18n-alt]').forEach(el => { el.alt = d[el.dataset.i18nAlt] || ''; });
    $$('[data-i18n-label]').forEach(el => { if (el.id !== 'burger' && d[el.dataset.i18nLabel]) el.setAttribute('aria-label', d[el.dataset.i18nLabel]); });
    setBurgerLabel();
    $('#langCur').textContent = l.toUpperCase();
    $$('#langMenu [data-lang]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === l)));
    // локализованные экраны: часы (v11-watch) и карта клуба
    $$('.wscreen .shot[data-src]').forEach(im => { im.src = im.dataset.src.replace('{L}', l); });
    $$('img[src*="club-card-"]').forEach(im => {
      im.src = im.getAttribute('src').replace(/club-card-(es|ca|en|ru|uk)/, 'club-card-' + l);
      const ss = im.getAttribute('srcset'); if (ss) im.setAttribute('srcset', ss.replace(/club-card-(es|ca|en|ru|uk)/g, 'club-card-' + l));
    });
    // ссылки на существующие страницы padelada.com (испанский — без префикса)
    const pre = l === 'es' ? '/' : '/' + l + '/';
    $$('a[data-path]').forEach(a => { a.href = 'https://padelada.com' + pre + a.dataset.path; });
    scenes.forEach(sc => sc.dots.forEach((b, i) => { b.setAttribute('aria-label', (i + 1) + '/' + sc.n + ' — ' + ($('h2', sc.steps[i]) || {}).textContent); }));
    document.title = 'Padelada — ' + (d.title || '');
    if (persist) {
      try { localStorage.setItem('pd-lang', l); } catch (e) {}
      try { const u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u); } catch (e) {}
    }
    if (rNum && rating) rNum.textContent = fmt(0);
    requestAnimationFrame(() => { const y = scrollY; measure(); update(); });
  }

  /* ---------- старт ---------- */
  let initial = 'ru';
  try { initial = new URLSearchParams(location.search).get('lang') || localStorage.getItem('pd-lang') || 'ru'; } catch (e) {}
  setLang(initial, false);
  const boot = () => {
    measure(); update();
    heroIn.classList.add('in');
    const h = location.hash.slice(1);
    const map = { torneo: ['org', 2], reloj: ['reloj'], org: ['org', 0], club: ['club'], qr: ['qr'], rating: ['rating'], story: ['story', 0] };
    if (map[h]) { const y = yFor(map[h][0], map[h][1]); if (y != null) { scrollTo(0, Math.round(y)); update(); } }
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
  addEventListener('load', () => { const y = scrollY; measure(); scrollTo(0, y); update(); });
  window.__pd = {
    measure, update, goTo, yFor, setLang,
    get scenes() { return scenes.map(s => ({ id: s.id, top: s.top, h: s.h, pinH: s.pinH, travel: s.travel, leadPx: s.leadPx, n: s.n, cur: s.cur })); },
    get state() { return { rm, desk, vh, tx0, ty0, lang, navHidden }; },
  };
})();
