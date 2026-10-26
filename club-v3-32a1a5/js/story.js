/* Club Padelada v3: карта, список комарок, страница комарки, подгонка первого экрана */
(function () {
  var qs = new URLSearchParams(location.search);

  /* — карта: панель по наведению / фокусу — */
  var panel = document.querySelector('[data-mpanel]');
  if (panel) {
    var on = panel.querySelector('[data-mp=on]'), em = panel.querySelector('[data-mp=empty]'), sel = null;
    var show = function (a) {
      if (sel) sel.classList.remove('is-sel'); sel = a; a.classList.add('is-sel');
      var name = a.getAttribute('data-z'), n = +a.getAttribute('data-n');
      on.hidden = !n; em.hidden = !!n;
      (n ? on : em).querySelectorAll('[data-mp-name]').forEach(function (x) { x.textContent = name; });
      if (n) { on.querySelector('[data-mp-n]').textContent = a.getAttribute('aria-label').split(' — ')[1]; on.querySelector('[data-mp-href]').href = a.getAttribute('href'); }
    };
    document.querySelectorAll('.cmap .mz').forEach(function (a) {
      a.addEventListener('mouseenter', function () { show(a); });
      a.addEventListener('focus', function () { show(a); });
    });
    var first = document.querySelector('.cmap .mz[data-z="Baix Empordà"]'); if (first) show(first);
  }

  /* — поиск по списку комарок — */
  var find = document.querySelector('[data-zfind]');
  if (find) {
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, ''); };
    find.addEventListener('input', function () {
      var q = norm(find.value.trim()), any = false;
      document.querySelectorAll('[data-zn]').forEach(function (li) { var ok = !q || norm(li.getAttribute('data-zn')).indexOf(q) > -1; li.hidden = !ok; any = any || ok; });
      document.querySelector('[data-znone]').hidden = any;
    });
  }

  /* — страница комарки: название, число членов клуба, фото, турниры — */
  var C = window.V3C;
  if (C) {
    var z = qs.get('z'), n = qs.get('n'), state = document.documentElement.getAttribute('data-state');
    var pl = function (k, f) {
      if (C.l === 'ru' || C.l === 'uk') { var a = Math.abs(k) % 100, d = a % 10; return f[(a >= 11 && a <= 19) ? 2 : d === 1 ? 0 : (d >= 2 && d <= 4) ? 1 : 2]; }
      return k === 1 ? f[0] : f[1];
    };
    if (z) {
      document.querySelectorAll('[data-zname]').forEach(function (x) { x.textContent = z; });
      document.title = C.title.replace('{z}', z);
      var h = document.querySelector('.st-zhero[data-st="' + state + '"]');
      if (h) {
        var img = h.querySelector('[data-zph]');
        if (img) {
          var src = C.phs[z];
          if (!src) { var s = 0; for (var i = 0; i < z.length; i++) s += z.charCodeAt(i); src = C.fb[s % C.fb.length]; }
          if (img.getAttribute('src') !== src) {
            img.classList.remove('is-in');
            if (/-1200\.webp$/.test(src)) { img.sizes = '(max-width:640px) 60vw, 100vw'; img.srcset = src.replace('-1200.', '-720.') + ' 720w, ' + src + ' 1200w'; } else img.removeAttribute('srcset');
            img.src = src;
          }
          if (C.lq && C.lq[src]) h.style.setProperty('--lq', 'url(' + C.lq[src] + ')');
          h.classList.add('lq');
        }
        if (n !== null && +n > 0) {
          var k = +n, st = h.querySelector('[data-zstats]');
          if (st) st.innerHTML = '<span class="st-zstat">' + k + ' ' + pl(k, C.mfmt) + '</span> <span class="demo">' + C.demo + '</span>';
        }
      }
      var box = document.querySelector('div[data-st="' + state + '"] [data-tours]');
      if (box && state !== 'empty') {
        var t = C.tours[z];
        if (!t) t = (state === 'young' ? C.generic1 : C.generic3).split('{z}').join(z);
        box.innerHTML = t.replace(/ class="r d\d"/g, '');
      }
      if (state === 'young' && n !== null) {
        var kk = Math.max(0, Math.min(15, +n)), yh = document.querySelector('[data-young-h]');
        if (yh) yh.textContent = C.yh.replace('{k}', kk);
        document.querySelectorAll('.v3-young .st-seats i').forEach(function (x, i) { x.className = i < kk ? 'on' : ''; });
      }
    }
  }

  /* — страница комарки: карта с положением комарки и место в рейтинге комарок — */
  if (window.V3C && window.V3C.zl) {
    (function () {
      var C = window.V3C, Z = C.zl, qs2 = new URLSearchParams(location.search), z2 = qs2.get('z');
      var host = document.querySelector('[data-zmap]'); if (!host) return;
      var st2 = document.documentElement.getAttribute('data-state'), nm = z2 || 'Baix Empordà';
      var nn = qs2.get('n'); nn = nn !== null && !isNaN(+nn) ? +nn : (C.rk[nm] !== undefined ? C.rk[nm] : 0);
      if (st2 === 'empty') nn = 0;
      var rv = document.querySelector('[data-zrank-v]'), rb = document.querySelector('[data-zrank]');
      if (rv) {
        var dm = rb.querySelector('.demo'); if (dm) dm.textContent = C.demo;
        if (nn > 0) {
          var r = 1, key; for (key in C.rk) if (key !== nm && C.rk[key] > nn) r++;
          rv.textContent = r + ' ' + Z.of + ' ' + Z.total;
        } else { rb.querySelector('.v3-zloc__l').textContent = Z.none; rv.textContent = ''; if (dm) dm.hidden = true; }
      }
      fetch(Z.map).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (t) {
        host.innerHTML = t;
        var svg = host.querySelector('svg'); if (!svg) return;
        svg.setAttribute('class', 'zmap'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
        svg.querySelectorAll('path').forEach(function (p) { if (p.getAttribute('data-z') === nm) { p.setAttribute('class', 'is-here'); svg.appendChild(p); } });
        host.classList.add('is-in');
      }).catch(function () { host.hidden = true; });
    })();
  }

  /* — переключатель языка сохраняет параметры страницы (z, state, n) — */
  document.querySelectorAll('a[hreflang],.seg a[lang]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h && !/^(https?:|mailto:|#)/.test(h) && (location.search || location.hash)) a.setAttribute('href', h.split('#')[0].split('?')[0] + location.search + location.hash);
  });

  /* — первый экран: на телефоне и планшете картинка заканчивается над подписью CLUB PADELADA — */
  var hs = document.querySelector('.st-hero--wide');
  if (hs && hs.querySelector('.st-hero__wm')) {
    var kick = hs.querySelector('.st-kicker--hero'), mq = window.matchMedia('(max-width:899px)');
    var fit = function () { if (!kick) return; if (!mq.matches) { hs.style.removeProperty('--hw-h'); return; } hs.style.setProperty('--hw-h', Math.max(220, Math.round(kick.getBoundingClientRect().top - hs.getBoundingClientRect().top - 6)) + 'px'); };
    fit(); window.addEventListener('resize', fit); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }
})();
