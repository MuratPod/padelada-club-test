/* padelada.club — сюжетные страницы (24.10) */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  /* 24.10: только тёмная тема — светлые варианты видео больше не запрашиваются */
  function theme() { return 'dark'; }

  /* видео первого экрана: только превью ?video=1 до «да» Мурата (24.10). Файлы в R2 через воркер: /media/v1/… */
  var hero = new URLSearchParams(location.search).get('video') === '1' && document.querySelector('.st-hero:not(.st-hero--wide)');
  if (hero) (function () {
    var mob = window.matchMedia('(max-width:600px), (orientation:portrait)');
    var probe = document.createElement('video');
    var ext = probe.canPlayType('video/webm; codecs="vp9"') === 'probably' ? 'webm' : 'mp4';
    var media = document.createElement('div'); media.className = 'st-hero__media'; media.setAttribute('aria-hidden', 'true');
    var img = document.createElement('img'); img.className = 'st-hero__poster'; img.alt = ''; img.decoding = 'async'; img.setAttribute('fetchpriority', 'high');
    var shade = document.createElement('div'); shade.className = 'st-hero__shade'; shade.setAttribute('aria-hidden', 'true');
    media.appendChild(img); hero.insertBefore(shade, hero.firstChild); hero.insertBefore(media, hero.firstChild);
    hero.classList.add('has-video');
    var vid = null, cur = '';
    function stop() { if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.remove(); vid = null; } }
    function apply() {
      var th = theme(), m = mob.matches, key = th + (m ? '-720x1280' : '-1080');
      /* тёмная вертикаль — v2 (свободнее кадр: лицо в верхних 40 %, ниже чёрный, 24.10 10:07) */
      var M = '/padelada-club-test/media/' + (th === 'dark' && m ? 'v2' : 'v1') + '/hero-';
      hero.setAttribute('data-vtheme', th); hero.classList.toggle('is-mob', m);
      img.src = M + th + (m ? '-m' : '') + '-poster.jpg';
      if (reduce.matches) { stop(); cur = ''; return; }
      if (key === cur && vid) return; cur = key; stop();
      vid = document.createElement('video'); vid.className = 'st-hero__video';
      vid.muted = true; vid.defaultMuted = true; vid.loop = true; vid.autoplay = true; vid.playsInline = true;
      ['muted', 'loop', 'autoplay', 'playsinline', 'disablepictureinpicture', 'disableremoteplayback'].forEach(function (a) { vid.setAttribute(a, ''); });
      vid.setAttribute('preload', 'metadata'); vid.setAttribute('poster', img.src); vid.setAttribute('tabindex', '-1');
      vid.addEventListener('playing', function () { this.classList.add('is-on'); });
      vid.addEventListener('error', function () { this.remove(); });
      vid.src = M + key + '.' + ext; media.appendChild(vid);
      var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {});
    }
    apply();
    [mob, reduce].forEach(function (q) { q.addEventListener ? q.addEventListener('change', apply) : q.addListener(apply); });
    /* превью не теряется при смене языка */
    document.querySelectorAll('.lang__list a, a[href$="index.html"]').forEach(function (a) { var h = a.getAttribute('href'); if (h && h.indexOf('?') < 0) a.setAttribute('href', h.replace(/(index\.html)?(#.*)?$/, function (_, f, hs) { return (f || '') + '?video=1' + (hs || ''); })); });
  })();

  /* — «до / после клуба» — */
  document.querySelectorAll('[data-look]').forEach(function (sec) {
    sec.querySelectorAll('[data-look-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        sec.setAttribute('data-look', b.getAttribute('data-look-set'));
        sec.querySelectorAll('[data-look-set]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
  });

  /* — «Основатель — N из 16» — */
  function setPend(root, n) {
    root.querySelectorAll('[data-zn-pend]').forEach(function (x) { x.textContent = n; });
    root.querySelectorAll('.st-pend .st-seats i').forEach(function (x, i) { x.className = i < n ? 'on' : ''; });
  }

  /* — карта: панель по наведению / фокусу — */
  var panel = document.querySelector('[data-mpanel]');
  if (panel) {
    var on = panel.querySelector('[data-mp=on]'), em = panel.querySelector('[data-mp=empty]'), sel = null;
    function show(a) {
      if (sel) sel.classList.remove('is-sel'); sel = a; a.classList.add('is-sel');
      var name = a.getAttribute('data-z'), n = +a.getAttribute('data-n');
      var box = n ? on : em; on.hidden = !n; em.hidden = !!n;
      box.querySelectorAll('[data-mp-name],[data-mp-zone]').forEach(function (x) { x.textContent = name; });
      if (n) { on.querySelector('[data-mp-n]').textContent = a.getAttribute('aria-label').split(' — ')[1]; on.querySelector('[data-mp-href]').href = a.getAttribute('href'); }
      var pd = on.querySelector('[data-mp-pend]'); if (pd) { pd.hidden = !(n && n < 16); if (n && n < 16) setPend(pd, n); }
    }
    document.querySelectorAll('.cmap .mz').forEach(function (a) {
      a.addEventListener('mouseenter', function () { show(a); });
      a.addEventListener('focus', function () { show(a); });
    });
    var first = document.querySelector('.cmap .mz[data-z="Baix Empordà"]'); if (first) show(first);
  }
  var find = document.querySelector('[data-zfind]');
  if (find) {
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, ''); };
    find.addEventListener('input', function () {
      var q = norm(find.value.trim()), any = false;
      document.querySelectorAll('[data-zn]').forEach(function (li) { var ok = !q || norm(li.getAttribute('data-zn')).indexOf(q) > -1; li.hidden = !ok; any = any || ok; });
      document.querySelector('[data-znone]').hidden = any;
    });
  }

  /* — комарка из ?z= (макет) — */
  var qs = new URLSearchParams(location.search), z = qs.get('z');
  if (z) {
    document.querySelectorAll('[data-zname]').forEach(function (x) { x.textContent = z; });
    document.querySelectorAll('[data-zcap]').forEach(function (x) { x.hidden = true; });
    document.title = z + ' · Club Padelada';
  } else {
    var sh = document.querySelector('.st-zhero[data-st="' + (qs.get('state') || 'base') + '"] h1');
    if (sh) document.title = sh.textContent.trim() + ' · Club Padelada';
  }
  var n = qs.get('n'); if (n) {
    document.querySelectorAll('[data-zn]').forEach(function (x) { if (x.tagName === 'B') x.textContent = n; });
    var yz = document.querySelector('.st-zhero[data-st=young]'); if (yz && +n < 16) setPend(yz, +n);
    var yb = document.querySelector('div[data-st=young] .st-plusline');
    if (yb && +n < 16) { var free = 16 - +n; yb.querySelectorAll('[data-free]').forEach(function (x) { x.textContent = free; }); yb.querySelectorAll('.st-seats i').forEach(function (x, i) { x.className = i < +n ? 'on' : ''; }); }
  }

})();
/* 24.10 17:05: видео первого экрана (общий план) — при prefers-reduced-motion только постер */
(function () {
  var v = document.querySelector('.st-hero__wv'); if (!v) return;
  /* телефон и планшет: картинка заканчивается над подписью CLUB PADELADA, фигура не заходит под заголовок */
  var hs = document.querySelector('.st-hero--wide'), k = hs && hs.querySelector('.st-kicker--hero'), mq = window.matchMedia('(max-width:899px)');
  function fit() { if (!hs || !k) return; if (!mq.matches) { hs.style.removeProperty('--hw-h'); return; } hs.style.setProperty('--hw-h', Math.max(220, Math.round(k.getBoundingClientRect().top - hs.getBoundingClientRect().top - 6)) + 'px'); }
  fit(); window.addEventListener('resize', fit); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var r = window.matchMedia('(prefers-reduced-motion: reduce)');
  function f() { if (r.matches) { v.pause(); v.removeAttribute('autoplay'); v.preload = 'none'; } else { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
  v.addEventListener('playing', function () { v.classList.add('is-on'); });
  v.addEventListener('error', function () { v.remove(); }, true);
  f(); if (r.addEventListener) r.addEventListener('change', f);
})();
