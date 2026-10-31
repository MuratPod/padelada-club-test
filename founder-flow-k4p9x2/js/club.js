// padelada.club — макеты: меню, появление при прокрутке, «показать всех».
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  // 24.10: сайт только в тёмной теме — переключателя нет
  root.setAttribute('data-theme', 'dark');
  try { localStorage.removeItem('pd-theme'); } catch (e) {}

  var mast = document.querySelector('.mast');
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = !mast.classList.contains('is-open');
    mast.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? burger.dataset.labelClose : burger.dataset.labelOpen);
  });
  function onScroll() { mast.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  document.addEventListener('click', function (e) {
    var d = document.querySelector('.lang[open]');
    if (d && !d.contains(e.target)) d.removeAttribute('open');
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.r');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }
  var court = document.querySelector('.court');
  if (court && !reduce) court.classList.add('draw');

  document.querySelectorAll('[data-more]').forEach(function (b) {
    b.addEventListener('click', function () {
      b.closest('.group').querySelectorAll('tr[hidden]').forEach(function (tr) { tr.hidden = false; });
      b.closest('.more').remove();
    });
  });
})();

// ═══ Этап 2: состояния макета, фильтр комарок, вход кодом ═══
(function () {
  var st = document.documentElement.getAttribute('data-state');
  if (st) {
    document.querySelectorAll('[data-st]').forEach(function (el) { el.hidden = el.getAttribute('data-st').split(' ').indexOf(st) < 0; });
    document.querySelectorAll('[data-state-link]').forEach(function (a) { if (a.getAttribute('data-state-link') === st) a.setAttribute('aria-current', 'true'); });
  }
  // Комарки: поиск, регион, флажки, карта/список
  var q = document.querySelector('[data-zsearch]');
  if (q) {
    var reg = document.querySelector('[data-zregion]'), rows = [].slice.call(document.querySelectorAll('.zrows > li')), list = document.querySelector('.zrows'), empty = document.querySelector('[data-zempty]');
    var f = { tour: false, cap: false };
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, ''); };
    var hexes = [].slice.call(document.querySelectorAll('.hx'));
    if (st === 'empty') q.value = 'Benidorm';
    var run = function () {
      var v = norm(q.value.trim()), r = reg.value, n = 0, hit = {};
      rows.forEach(function (li) {
        var ok = (!v || norm(li.dataset.name).indexOf(v) >= 0) && (!r || li.dataset.region === r) && (!f.tour || li.dataset.tour === '1') && (!f.cap || li.dataset.cap === '1');
        li.hidden = !ok; if (ok) { n++; hit[li.dataset.name.split(' ').slice(0, -1).join(' ')] = 1; }
      });
      list.hidden = !n; empty.hidden = !!n;
      var any = v || r || f.tour || f.cap;
      hexes.forEach(function (h) { var on = !!hit[h.dataset.zone]; h.classList.toggle('is-dim', !!any && !on); h.classList.toggle('is-hit', !!any && on && !!v); });
    };
    q.addEventListener('input', run); reg.addEventListener('change', run);
    document.querySelectorAll('[data-zf]').forEach(function (b) { b.addEventListener('click', function () { var k = b.dataset.zf; f[k] = !f[k]; b.setAttribute('aria-pressed', f[k]); run(); }); });
    var vb = document.querySelector('[data-zview]'), zl = document.querySelector('.zl');
    if (vb) vb.addEventListener('click', function () { var on = !zl.classList.contains('is-map'); zl.classList.toggle('is-map', on); vb.setAttribute('aria-pressed', on); });
    run();
  }
  // Код: автопереход по ячейкам, вставка
  document.querySelectorAll('.otp').forEach(function (g) {
    var ins = [].slice.call(g.querySelectorAll('input'));
    ins.forEach(function (inp, i) {
      inp.addEventListener('input', function () { inp.value = inp.value.replace(/\D/g, '').slice(-1); if (inp.value && ins[i + 1]) ins[i + 1].focus(); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); });
      inp.addEventListener('paste', function (e) { var d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); d.split('').forEach(function (c, k) { if (ins[k]) ins[k].value = c; }); (ins[d.length] || ins[5]).focus(); });
    });
  });
  // Обратный отсчёт «Ещё раз через N с» (в макете — только на шаге «код»)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('[data-countdown]').forEach(function (b) {
    if (b.closest('[hidden]')) return;
    var s = +b.dataset.countdown, out = b.querySelector('[data-s]');
    var id = setInterval(function () { s--; if (out) out.textContent = s; if (s <= 0) { clearInterval(id); b.disabled = false; b.classList.add('is-on'); b.textContent = b.closest('form').parentNode.querySelector('[data-st=resend] .night__link').textContent; } }, 1000);
  });
})();

/* 24.10: запоминаем выбор языка — воркер читает cookie pd-lang на «/» */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[hreflang],.seg a[lang]');
  if (!a) return; var l = a.getAttribute('hreflang') || a.getAttribute('lang');
  if (/^(es|ca|en|ru|uk)$/.test(l || '')) document.cookie = 'pd-lang=' + l + ';path=/;max-age=31536000;samesite=lax';
});

/* 24.10: умная кнопка «Скачать» — iOS → App Store, Android → Google Play, иначе панель с QR */
(function () {
  var btn = document.querySelector('[data-dl]'), pop = document.getElementById('dlpop');
  if (!btn || !pop) return;
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/.test(ua);
  function close() { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', function (e) {
    var url = ios ? btn.getAttribute('data-ios') : android ? btn.getAttribute('data-android') : '';
    if (ios || android) { if (url) { e.preventDefault(); location.href = url; } return; } // ссылок ещё нет — ведём к блоку загрузки
    e.preventDefault(); pop.hidden = !pop.hidden; btn.setAttribute('aria-expanded', String(!pop.hidden));
    if (!pop.hidden) pop.querySelector('[data-dl-close]').focus();
  });
  pop.querySelector('[data-dl-close]').addEventListener('click', function () { close(); btn.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { close(); btn.focus(); } });
  document.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target) && e.target !== btn && !btn.contains(e.target)) close(); });
})();
