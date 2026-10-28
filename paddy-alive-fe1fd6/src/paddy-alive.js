/* Paddy alive v1 — риг и «мозг» анимации. Геометрия 1:1 из parts.tsx / scene.tsx / RacketStatic.tsx (viewBox 400, joy и hello).
   Один общий тик, вся поза = объект чисел; каждая анимация = функция pose(t) -> частичная поза; движок смешивает её с покоем по весу. */
(function (g) {
  const C = { ink: '#24123A', coral: '#FF5E5B', cream: '#FFF1EA', amber: '#FFA62B', white: '#FFFFFF', mint: '#3DDBB0' };
  const OUTLINE_R = 6;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
  const E = {
    lin: (t) => t, in: (t) => t * t, out: (t) => 1 - (1 - t) * (1 - t), io: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    cub: (t) => 1 - Math.pow(1 - t, 3), in3: (t) => t * t * t, back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  };
  /** Кусочная кривая: keys = [[t, v, ease]], ease относится к отрезку, который заканчивается в этом ключе. */
  function track(t, k) {
    if (t <= k[0][0]) return k[0][1];
    for (let i = 1; i < k.length; i++) if (t <= k[i][0]) { const [t0, v0] = k[i - 1], [t1, v1, e] = k[i]; return lerp(v0, v1, (E[e || 'io'])((t - t0) / (t1 - t0))); }
    return k[k.length - 1][1];
  }
  const mix = (a, b, w) => {
    if (typeof a === 'number') return a + (b - a) * w;
    if (Array.isArray(a)) return a.map((x, i) => mix(x, b[i], w));
    const o = { ...a }; for (const k in b) o[k] = mix(a[k], b[k], w); return o;
  };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const rad = (d) => (d * Math.PI) / 180;
  const pulse = (u) => { u = ((u % 1) + 1) % 1; return u < 0.5 ? Math.sin(u * 2 * Math.PI) ** 2 : 0; };
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* ---------- руки: [sx,sy, cx,cy, ex,ey, hx,hy] — плечо, контрольная точка, конец руки, центр кисти ---------- */
  const SH = { L: [180, 262], R: [220, 260] };
  const ARM = {
    restL: [180, 262, 130, 268, 122, 304, 122, 308], restR: [220, 260, 318, 262, 328, 204, 329, 198],
    joyL: [180, 260, 92, 262, 76, 196, 75, 190], joyR: [220, 260, 308, 262, 324, 196, 325, 190],
    thinkR: [220, 262, 290, 272, 270, 224, 266, 218],
  };
  function arm(side, hx, hy, bx, by) {
    const [sx, sy] = SH[side]; const mx = (sx + hx) / 2 + bx, my = (sy + hy) / 2 + by;
    let dx = hx - mx, dy = hy - my; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    return [sx, sy, mx, my, hx - dx * 6, hy - dy * 6, hx, hy];
  }
  const armMix = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));

  const REST = {
    lift: 0, bob: 0, lean: 0, sx: 1, sy: 1,
    tilt: 0, hdx: 0, hdy: 0, th: 0, lookX: 0, lookY: 0, blink: 1, joy: 0, o: 1,
    aL: ARM.restL, aR: ARM.restR, fL: [0, 0], fR: [0, 0],
    ball: [336, 348, 0, 1, 1], ballFront: 1,
    waves: 1, wdx: 0, wdy: 0,
    bubble: 0, tailT: 0, tailA: 0, dots: [1, 1, 1], dotsY: [0, 0, 0],
    mag: 0, mx: 300, my: 246, mr: 0, book: 0, page: 0,
    sp: 0, spt: 0, imp: [0, 0, 0], sw: [0, 0, 0],
  };

  /* ---------- Рендер ---------- */
  let UID = 0;
  function Rig(host, { dark = false, size = 104 } = {}) {
    this.dark = dark; this.id = 'pk' + ++UID; this.cache = {};
    host.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="${size}" height="${size}" role="img" aria-label="Paddy" style="display:block;overflow:visible">${dark ? this.pass(true) : ''}${this.pass(false)}</svg>`;
    this.svg = host.firstChild; this.q = {};
    this.svg.querySelectorAll('[data-k]').forEach((n) => { (this.q[n.dataset.k] ||= []).push(n); });
  }
  const OUTER = 'M200 40 C264 40 314 90 314 150 C314 206 272 230 238 248 L162 248 C128 230 86 206 86 150 C86 90 136 40 200 40 Z';
  const INNER = 'M200 64 C252 64 292 102 292 150 C292 192 260 212 234 226 L166 226 C140 212 108 192 108 150 C108 102 148 64 200 64 Z';
  const DOTS = [[112, 84], [146, 84], [180, 84], [214, 84], [248, 84], [282, 84], [129, 118], [265, 118], [299, 118], [112, 152], [282, 152], [129, 186], [299, 186], [112, 220], [146, 220], [180, 220], [214, 220], [248, 220], [282, 220]];
  const SPARKS = [{ cx: 58, cy: 92, r: 16, fill: C.amber }, { cx: 350, cy: 70, r: 20, fill: C.coral }, { cx: 354, cy: 226, r: 12, fill: C.mint }, { cx: 46, cy: 200, r: 10, fill: C.coral }];

  Rig.prototype.pass = function (out) {
    const id = this.id; const rnd = 'stroke-linejoin="round" stroke-linecap="round"';
    const A = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
    // фигура: в outline-проходе каждая заливка = cream, обводка +2*OUTLINE_R (как dilate() в parts.tsx)
    const sh = (tag, a, key, inner = false) => {
      if (out) {
        if (inner) return '';
        const w = a.stroke && a.stroke !== 'none' ? +(a['stroke-width'] || 1) : 0;
        a = { ...a, fill: a.fill === 'none' ? 'none' : C.cream, stroke: C.cream, 'stroke-width': w + 2 * OUTLINE_R, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
        delete a.opacity;
      }
      return `<${tag} ${key ? `data-k="${key}"` : ''} ${A(a)}${tag === 'g' ? '' : '/'}>`.replace('/>', '/>');
    };
    const limb = (key, d) => sh('path', { d, fill: 'none', stroke: C.ink, 'stroke-width': 12, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, key);
    const hand = (key) => sh('circle', { cx: 0, cy: 0, r: 14, fill: C.white, stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, key);
    const ball = (k) => `<g data-k="${k}">${sh('circle', { cx: 336, cy: 348, r: 30, fill: C.amber, stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' })}${out ? '' : `<path d="M319.5 324 Q333 348 319.5 372 M352.5 324 Q339 348 352.5 372" fill="none" stroke="${C.cream}" stroke-width="4" stroke-linecap="round"/>`}</g>`;
    const P = (o) => ({ ...o, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
    let s = `<g data-k="${out ? 'outRoot' : 'root'}">`;
    // ноги
    s += limb('legL', 'M189 302 V328') + limb('legR', 'M211 302 V328');
    s += `<g data-k="shoeL">${sh('ellipse', P({ cx: 172, cy: 338, rx: 25, ry: 12, fill: C.coral, stroke: C.ink, 'stroke-width': 5 }))}</g><g data-k="shoeR">${sh('ellipse', P({ cx: 228, cy: 338, rx: 25, ry: 12, fill: C.coral, stroke: C.ink, 'stroke-width': 5 }))}</g>`;
    s += `<g data-k="upper">`;
    s += limb('armL', 'M0 0') + limb('armR', 'M0 0');
    // торс и ручка
    s += sh('path', P({ d: 'M160 246 L240 246 L218 272 L182 272 Z', fill: C.coral, stroke: C.ink, 'stroke-width': 6 }));
    s += sh('path', P({ d: 'M184 252 H216 L200 270 Z', fill: C.cream, stroke: C.ink, 'stroke-width': 4 }));
    s += sh('rect', P({ x: 180, y: 268, width: 40, height: 38, rx: 12, fill: C.amber, stroke: C.ink, 'stroke-width': 6 }));
    s += sh('path', P({ d: 'M182 282 L218 274 M182 296 L218 288', fill: 'none', stroke: C.ink, 'stroke-width': 4 }));
    s += sh('path', { d: 'M200 304 Q248 320 236 282', fill: 'none', stroke: C.coral, 'stroke-width': 5, 'stroke-linecap': 'round' });
    // дека
    s += `<g transform="translate(200 248) scale(1.1) translate(-200 -248)"><g data-k="head">`;
    s += sh('path', P({ d: OUTER, fill: C.coral, stroke: C.ink, 'stroke-width': 7 }));
    if (!out) {
      s += `<clipPath id="${id}"><path d="${INNER}"/></clipPath>`;
      s += `<path d="${INNER}" fill="${C.cream}" stroke="${C.amber}" stroke-width="10" stroke-linejoin="round"/><path d="${INNER}" fill="none" stroke="${C.ink}" stroke-width="4" ${rnd}/>`;
      s += `<g clip-path="url(#${id})">${DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${C.coral}"/>`).join('')}</g>`;
      for (const [k, cx] of [['L', 166], ['R', 234]]) {
        s += `<g data-k="eyes${k}"><circle cx="${cx}" cy="148" r="22" fill="${C.white}" stroke="${C.ink}" stroke-width="5" ${rnd}/><circle data-k="pup${k}" cx="${cx}" cy="148" r="11.44" fill="${C.ink}"/><circle data-k="glint${k}" cx="${cx + 4.004}" cy="143.996" r="3.2032" fill="${C.white}"/></g>`;
      }
      s += `<g data-k="joyEyes" opacity="0"><path d="M144 155.7 Q166 126 188 155.7" fill="none" stroke="${C.ink}" stroke-width="7" ${rnd}/><path d="M212 155.7 Q234 126 256 155.7" fill="none" stroke="${C.ink}" stroke-width="7" ${rnd}/></g>`;
      s += `<path data-k="brow" d="M216.4 109.9 Q234 99.9 251.6 111.9" fill="none" stroke="${C.ink}" stroke-width="6" ${rnd} opacity="0"/>`;
      s += `<path data-k="mFill" d="" fill="${C.ink}" stroke="${C.ink}" stroke-width="5" ${rnd}/><path data-k="mLine" d="" fill="none" stroke="${C.ink}" stroke-width="7" ${rnd}/><ellipse data-k="tongue" cx="200" cy="205.48" rx="13.44" ry="4.2" fill="${C.coral}"/>`;
    }
    s += `</g></g>`; // head, scale
    if (!out) s += '';
    // книжка (между головой и кистями)
    const pg = (x) => `<rect x="${x}" y="-22" width="38" height="44" rx="4" fill="${C.white}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>`;
    const lines = (x) => [-12, -3, 6, 15].map((y, i) => `<path d="M${x + 6} ${y} H${x + 32 - (i % 2) * 8}" stroke="${C.ink}" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>`).join('');
    if (out) s += `<g data-k="book" opacity="0">${sh('rect', P({ x: -42, y: -26, width: 84, height: 52, rx: 7, fill: C.amber, stroke: C.ink, 'stroke-width': 5 }))}</g>`;
    else s += `<g data-k="book" opacity="0"><rect x="-42" y="-26" width="84" height="52" rx="7" fill="${C.amber}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>${pg(-38)}${pg(0)}${lines(-38)}${lines(0)}<path d="M0 -22 V22" stroke="${C.ink}" stroke-width="4"/><g data-k="sheet">${pg(0)}${lines(0)}</g></g>`;
    s += hand('handL') + hand('handR');
    s += `</g>`; // upper
    s += `</g>`; // root
    return s;
  };
  Rig.prototype.pass2 = null;

  // верхний слой: мяч, реквизит. Мяч до рук/после рук: два слоя (держит — кисть поверх мяча)
  const origPass = Rig.prototype.pass;
  Rig.prototype.pass = function (out) {
    const rnd = 'stroke-linejoin="round" stroke-linecap="round"';
    const body = origPass.call(this, out);
    const A = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
    const sh = (tag, a) => {
      if (out) { const w = a.stroke && a.stroke !== 'none' ? +(a['stroke-width'] || 1) : 0; a = { ...a, fill: a.fill === 'none' ? 'none' : C.cream, stroke: C.cream, 'stroke-width': w + 2 * OUTLINE_R, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }; }
      return `<${tag} ${A(a)}/>`;
    };
    const ball = (k) => `<g data-k="${k}">${sh('circle', { cx: 0, cy: 0, r: 30, fill: C.amber, stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' })}${out ? '' : `<path d="M-16.5 -24 Q-3 0 -16.5 24 M16.5 -24 Q3 0 16.5 24" fill="none" stroke="${C.cream}" stroke-width="4" stroke-linecap="round"/>`}</g>`;
    let top = '';
    top += `<g data-k="ballBackWrap">${ball('ballB')}</g>`;
    top += body;
    top += `<g data-k="ballFrontWrap">${ball('ballF')}</g>`;
    // волны приветствия
    top += `<g data-k="waves">${sh('path', { d: 'M349 178 Q359 190 349 204 M361 170 Q377 190 363 212', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' })}</g>`;
    // лупа
    top += `<g data-k="magWrap"><g data-k="mag">${sh('path', { d: 'M0 0 L18 -24', fill: 'none', stroke: C.ink, 'stroke-width': 13, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' })}${out ? '' : `<path d="M0 0 L18 -24" fill="none" stroke="${C.amber}" stroke-width="6" stroke-linecap="round"/>`}${sh('circle', { cx: 36, cy: -50, r: 25, fill: C.white, 'fill-opacity': 0.55, stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' })}${out ? '' : `<path d="M22 -52 Q24 -64 36 -68" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round"/>`}</g></g>`;
    // облако: думает / печатает
    top += `<g data-k="bubble">`;
    top += `<g data-k="tailT">${sh('circle', { cx: 314, cy: 110, r: 8, fill: C.white, stroke: C.ink, 'stroke-width': 4 })}${sh('circle', { cx: 326, cy: 94, r: 11, fill: C.white, stroke: C.ink, 'stroke-width': 4 })}</g>`;
    top += `<g data-k="tailA">${sh('path', { d: 'M322 76 L310 106 L342 86 Z', fill: C.white, stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' })}</g>`;
    top += `<g transform="translate(344 58)">${sh('circle', { r: 32, fill: C.white, stroke: C.ink, 'stroke-width': 5 })}${[-14, 0, 14].map((x, i) => (out ? '' : `<circle data-k="dot${i}" cx="${x}" cy="0" r="4.5" fill="${C.ink}"/>`)).join('')}</g></g>`;
    // искры joy / радость
    top += `<g data-k="sparks">${SPARKS.map((k, i) => `<g data-k="spark${i}">${sh('path', { d: `M0 ${-k.r} Q0 0 ${k.r} 0 Q0 0 0 ${k.r} Q0 0 ${-k.r} 0 Q0 0 0 ${-k.r} Z`, fill: k.fill, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' })}</g>`).join('')}</g>`;
    // след замаха и вспышка удара
    top += `<g data-k="swoosh"><path data-k="sw1" d="" fill="none" stroke="${out ? C.cream : C.ink}" stroke-width="${out ? 15 : 5}" ${rnd}/><path data-k="sw2" d="" fill="none" stroke="${out ? C.cream : C.ink}" stroke-width="${out ? 13 : 3.5}" ${rnd}/></g>`;
    top += `<g data-k="imp">${sh('path', { d: 'M0 -24 Q0 0 24 0 Q0 0 0 24 Q0 0 -24 0 Q0 0 0 -24 Z', fill: C.amber, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' })}</g>`;
    return top;
  };

  function setA(r, key, name, val) {
    const nodes = r.q[key]; if (!nodes) return;
    const ck = key + '|' + name; if (r.cache[ck] === val) return; r.cache[ck] = val;
    for (const n of nodes) n.setAttribute(name, val);
  }
  const f = (v) => (Math.round(v * 100) / 100).toString();
  const armD = (a) => `M${f(a[0])} ${f(a[1])} Q${f(a[2])} ${f(a[3])} ${f(a[4])} ${f(a[5])}`;
  const tr = (x, y) => `translate(${f(x)} ${f(y)})`;

  Rig.prototype.apply = function (s) {
    const r = this; const setT = (k, v) => setA(r, k, 'transform', v);
    for (const k of ['root', 'outRoot']) setT(k, `${tr(0, s.lift)} translate(200 340) scale(${f(s.sx)} ${f(s.sy)}) translate(-200 -340)`);
    setT('upper', `${tr(0, s.bob)} rotate(${f(s.lean)} 200 304)`);
    setA(r, 'armL', 'd', armD(s.aL)); setA(r, 'armR', 'd', armD(s.aR));
    setT('handL', tr(s.aL[6], s.aL[7])); setT('handR', tr(s.aR[6], s.aR[7]));
    // ноги: бёдра неподвижны, стопа сдвигается
    setA(r, 'legL', 'd', `M189 302 L${f(189 + s.fL[0])} ${f(328 + s.fL[1])}`); setA(r, 'legR', 'd', `M211 302 L${f(211 + s.fR[0])} ${f(328 + s.fR[1])}`);
    setT('shoeL', tr(s.fL[0], s.fL[1])); setT('shoeR', tr(s.fR[0], s.fR[1]));
    // голова
    setT('head', `${tr(s.hdx, s.hdy)} rotate(${f(s.tilt)} 200 150)`);
    // глаза: зрачок, блик, моргание, ^^
    let lx = s.lookX * 10, ly = s.lookY * 10; const ll = Math.hypot(lx, ly); if (ll > 10.4) { lx *= 10.4 / ll; ly *= 10.4 / ll; }
    for (const [k, cx] of [['L', 166], ['R', 234]]) {
      setA(r, 'pup' + k, 'cx', f(cx + lx)); setA(r, 'pup' + k, 'cy', f(148 + ly));
      setA(r, 'glint' + k, 'cx', f(cx + lx + 4.004)); setA(r, 'glint' + k, 'cy', f(148 + ly - 4.004));
      setT('eyes' + k, `translate(0 148) scale(1 ${f(Math.max(0.08, s.blink * (1 - clamp(2 * s.joy))))}) translate(0 -148)`); setA(r, 'eyes' + k, 'opacity', s.joy > 0.99 ? 0 : 1);
    }
    setT('joyEyes', `translate(0 148) scale(1 ${f(Math.max(0.08, clamp(2 * s.joy - 1) * lerp(s.blink, 1, clamp(2 * s.joy - 1))))}) translate(0 -148)`); setA(r, 'joyEyes', 'opacity', s.joy > 0.5 ? 1 : 0);
    setA(r, 'brow', 'opacity', f(s.th));
    // рот
    const t = s.th; const x0 = lerp(168, 182.4, t), y0 = lerp(194, 197, t), cx = lerp(200, 200, t), cy = lerp(222, 201, t), x1 = lerp(232, 224, t), y1 = lerp(194, 186.3, t);
    const mxm = (x0 + x1) / 2, mym = (y0 + y1) / 2; const o = clamp(s.o);
    const ux = lerp(cx, mxm, o), uy = lerp(cy, mym, o);
    setA(r, 'mLine', 'd', `M${f(x0)} ${f(y0)} Q${f(cx)} ${f(cy)} ${f(x1)} ${f(y1)}`); setA(r, 'mLine', 'stroke-width', f(lerp(7, 5, o)));
    setA(r, 'mFill', 'd', o < 0.03 ? '' : `M${f(x0)} ${f(y0)} Q${f(cx)} ${f(cy)} ${f(x1)} ${f(y1)} Q${f(ux)} ${f(uy)} ${f(x0)} ${f(y0)} Z`);
    setA(r, 'tongue', 'opacity', f(clamp((o - 0.55) / 0.3) * (1 - t)));
    // мяч (два слоя по z)
    const b = s.ball; const bt = `translate(${f(b[0])} ${f(b[1])}) scale(${f(b[3])} ${f(b[4])}) rotate(${f(b[2])})`;
    setT('ballB', bt); setT('ballF', bt); setA(r, 'ballBackWrap', 'opacity', s.ballFront > 0.5 ? 0 : 1); setA(r, 'ballFrontWrap', 'opacity', s.ballFront > 0.5 ? 1 : 0);
    // волны приветствия: идут за правой кистью
    setT('waves', tr(s.wdx, s.wdy)); setA(r, 'waves', 'opacity', f(clamp(s.waves)));
    // лупа
    setA(r, 'magWrap', 'opacity', f(clamp(s.mag))); setT('mag', `${tr(s.mx, s.my)} rotate(${f(s.mr)}) scale(${f(0.6 + 0.4 * clamp(s.mag))})`);
    // книжка
    setA(r, 'book', 'opacity', f(clamp(s.book * 1.5))); setT('book', `translate(108 296) scale(${f(1.25 * (0.5 + 0.5 * clamp(s.book)))})`);
    const pc = Math.cos(Math.PI * clamp(s.page)); setT('sheet', `scale(${f(pc)} 1)`);
    // облако
    setA(r, 'bubble', 'opacity', f(clamp(s.bubble * 1.4))); setT('bubble', `translate(330 100) scale(${f(0.2 + 0.8 * clamp(s.bubble))}) translate(-330 -100)`);
    setA(r, 'tailT', 'opacity', f(clamp(s.tailT))); setA(r, 'tailA', 'opacity', f(clamp(s.tailA)));
    for (let i = 0; i < 3; i++) { setA(r, 'dot' + i, 'opacity', f(s.dots[i])); setA(r, 'dot' + i, 'cy', f(s.dotsY[i])); }
    // искры
    SPARKS.forEach((k, i) => { const a = clamp(s.sp) * (1 - 0.14 * (0.5 - 0.5 * Math.sin(s.spt * 5.2 + i * 1.7))); setT('spark' + i, `translate(${k.cx} ${k.cy}) scale(${f(Math.max(0.001, a))})`); });
    setA(r, 'sparks', 'opacity', f(clamp(s.sp * 1.5)));
    // след замаха (углы в градусах от вертикали вокруг бедра (200,304))
    const [a0, a1, ao] = s.sw; setA(r, 'swoosh', 'opacity', f(clamp(ao)));
    if (ao > 0.01) {
      const arc = (R, A0, A1) => { const p = (A) => `${f(200 + R * Math.sin(rad(A)))} ${f(304 - R * Math.cos(rad(A)))}`; return `M${p(A0)} A${R} ${R} 0 0 ${A1 > A0 ? 1 : 0} ${p(A1)}`; };
      setA(r, 'sw1', 'd', arc(288, a0, a1)); setA(r, 'sw2', 'd', arc(300, a0 + (a1 - a0) * 0.3, a1 - 2));
    }
    // вспышка удара
    setT('imp', `translate(${f(s.imp[0])} ${f(s.imp[1])}) scale(${f(Math.max(0.001, s.imp[2]))}) rotate(${f(s.imp[2] * 40)})`); setA(r, 'imp', 'opacity', f(clamp(s.imp[2] * 3)));
  };

  /* ---------- Анимации ---------- */
  const W = (s, x, y) => { const a = rad(s.lean), dx = x - 200, dy = y - 304; return [200 + dx * Math.cos(a) - dy * Math.sin(a), 304 + dx * Math.sin(a) + dy * Math.cos(a) + s.bob]; }; // из системы «верх тела» в мир
  const dotsFn = (t, period = 1.26) => [0, 1, 2].map((i) => 0.3 + 0.7 * pulse((t / period) - i / 3 + 0.25) );

  // мяч: подбор рукой, подброс, ловля. Все координаты — мир.
  const PICK = { x: 338, ytop: 322 }; // кисть над мячом
  function tossFlight(t, t0, t1, y0, yap) { const u = clamp((t - t0) / (t1 - t0)); return y0 - (y0 - yap) * (1 - (2 * u - 1) ** 2); }
  function bounceTo(t, t0, x0, y0, x1, yfloor, drop) { // падение с (x0,y0) на пол yfloor, два отскока
    const g = 2400; const tf = Math.sqrt((2 * (yfloor - y0)) / g); const u = t - t0; if (u < 0) return [x0, y0, 1, 1];
    const lx = x1 + (x0 - x1) * Math.max(0, 1 - u / 1.0);
    if (u < tf) return [lx, y0 + 0.5 * g * u * u, 1, 1];
    let v = g * tf * 0.38, uu = u - tf, y = yfloor; // первый отскок
    const tb1 = (2 * v) / g; if (uu < tb1) { y = yfloor - (v * uu - 0.5 * g * uu * uu); return [lx, y, 1, 1]; }
    uu -= tb1; v *= 0.45; const tb2 = (2 * v) / g; if (uu < tb2) { y = yfloor - (v * uu - 0.5 * g * uu * uu); return [lx, y, 1, 1]; }
    return [lx, yfloor, 1, 1];
  }
  function ballRoll(u) { return u * 400; }

  const ANIMS = {};
  const def = (name, o) => { ANIMS[name] = { name, in: 0.35, out: 0.4, loop: false, ...o }; };

  def('wave', { title: 'Привет-взмах', dur: 2.6, in: 0.3, out: 0.4, pose(t) {
    const k = track(t, [[0, 0], [0.35, 1, 'out'], [2.15, 1], [2.6, 0]]);
    const ph = 2 * Math.PI * 1.75 * t; const hx = 337 + 11 * Math.sin(ph) * k, hy = 178 + 3 * Math.cos(ph * 2) * k;
    return {
      aR: arm('R', hx, hy, 40, 34), waves: 0.65 + 0.35 * Math.sin(ph + 1.2), wdx: hx - 329, wdy: hy - 198,
      tilt: 4.5 * k, hdy: -1 * k, lookX: 0.35 * k, lookY: -0.15 * k, o: 1, lean: 1.8 * k * Math.sin(ph * 0.5 + 0.4) + 1.5 * k,
      aL: arm('L', 122, 308 + 2 * Math.sin(ph), -27 * 0.78, -27 * 0.63),
    };
  } });

  def('smile', { title: 'Улыбка', dur: 1.9, in: 0.2, out: 0.35, pose(t) {
    const j = track(t, [[0, 0], [0.18, 1, 'out'], [1.35, 1], [1.7, 0, 'io']]);
    const hop = track(t, [[0, 0], [0.12, 0], [0.3, -7, 'out'], [0.5, 0, 'in'], [0.62, 0.7, 'out'], [0.8, 0, 'io']]);
    const tl = track(t, [[0, 0], [0.3, 7, 'out'], [0.9, -4], [1.4, 6], [1.9, 0]]);
    const k = sm(1 - Math.abs(0.5 - t / 1.9) * 2 + 0.4);
    return {
      joy: j, o: 1, lift: hop, tilt: tl, bob: 0, lookX: 0, lookY: 0, sy: hop > 0 ? 0.985 : 1, sx: hop > 0 ? 1.01 : 1, th: 0,
      aR: armMix(ARM.restR, arm('R', 326, 190, 40, 34), 0.45 * j), aL: armMix(ARM.restL, arm('L', 100, 270, -26, -10), 0.4 * j), waves: 1 - j,
    };
  } });

  def('look', { title: 'Осматривается', dur: 3.8, in: 0.3, out: 0.45, pose(t) {
    const lx = track(t, [[0, 0], [0.5, 0], [0.68, -1, 'out'], [1.45, -1], [1.63, 1, 'out'], [2.35, 1], [2.52, 0.55, 'out'], [3.35, 0.55], [3.55, 0, 'out']]);
    const ly = track(t, [[0, 0], [1.6, 0.05], [2.52, -0.85, 'out'], [3.3, -0.85], [3.5, 0, 'out'], [3.8, 0]]);
    const bl = track(t, [[0, 1], [1.4, 1], [1.46, 0.08, 'lin'], [1.58, 1, 'lin'], [3.8, 1]]);
    return { lookX: lx, lookY: ly, hdx: lx * 3.5, tilt: lx * 4.5 - ly * 2.5, lean: lx * 1.2, blink: bl, o: 0.55, aR: armMix(ARM.restR, arm('R', 326, 206, 40, 34), 0.35), waves: 0.4, th: 0 };
  } });

  // --- подача / жонглирование ---
  function padelPose(t, serve) {
    const out = {};
    const ball = [336, 348, 0, 1, 1]; let hand = null; let front = 1; let lean = 0;
    const joyK = serve ? track(t, [[0, 0], [0.95, 0], [1.4, 1, 'out'], [2.15, 1], [2.7, 0]]) : 0;
    // фаза 1 — тянется к мячу (0..0.5), 2 — несёт (..0.95)
    const reach = track(t, [[0, 0], [0.5, 1, 'io']]);
    const carry = track(t, [[0.5, 0], [0.95, 1, 'io']]);
    lean = track(t, [[0, 0], [0.5, 7, 'out'], [0.95, 1, 'io'], [1.0, 1]]);
    let hx = lerp(329, PICK.x, reach), hy = lerp(198, PICK.ytop, reach);
    hx = lerp(hx, 350, carry); hy = lerp(hy, 236, carry);
    let ballMode = 'ground';
    if (serve) {
      // t: 0.95 — выпуск; апекс 1.55; замах 1.0..1.6 назад, удар 1.75; мяч после удара — падение с отскоком
      const rel = 0.95, apex = 1.55, hit = 1.72;
      if (t < rel) { ballMode = t < 0.5 ? 'ground' : 'hand'; }
      else if (t < hit) { ballMode = 'air'; }
      else ballMode = 'bounce';
      lean = track(t, [[0, 0], [0.5, 7, 'out'], [0.95, 1, 'io'], [1.55, -12, 'io'], [1.72, 18, 'in'], [1.9, 24, 'out'], [2.6, -2, 'io'], [3.0, 0]]);
      if (ballMode === 'air') { const y = tossFlight(t, rel, apex, 250, 58); const yy = t <= apex ? y : 58 + (84 - 58) * ((t - apex) / (hit - apex)) ** 2; ball[0] = 352 + 4 * ((t - rel) / (hit - rel)); ball[1] = yy; ball[2] = ballRoll(t - rel) * 0.5; }
      if (ballMode === 'bounce') {
        const u = t - hit, gg = 2400, vy0 = -380; let x = lerp(352, 369, clamp(u / 0.35)), y = 84 + vy0 * u + 0.5 * gg * u * u; let sqz = 1;
        const tf = (-vy0 + Math.sqrt(vy0 * vy0 + 2 * gg * (348 - 84))) / gg; // момент касания пола
        if (u >= tf) { const uu = u - tf; let v = 520; const tb1 = (2 * v) / gg; x = lerp(369, 336, clamp(u / (tf + 0.5))); if (uu < tb1) y = 348 - (v * uu - 0.5 * gg * uu * uu); else { const u2 = uu - tb1, v2 = 230, tb2 = (2 * v2) / gg; y = u2 < tb2 ? 348 - (v2 * u2 - 0.5 * gg * u2 * u2) : 348; x = 336; } }
        else x = lerp(352, 369, clamp(u / 0.35));
        ball[0] = x; ball[1] = y; ball[2] = 360 + ballRoll(u) * 1.6;
        const sq = track(t, [[hit, 0.62], [hit + 0.08, 1, 'out']]); ball[3] = 1 + (1 - sq) * 0.45; ball[4] = sq;
        if (u >= tf && u < tf + 0.07) { ball[3] = 1.18; ball[4] = 0.82; }
      }
      // кисть: после выпуска правая рука уходит вверх (замах)
      const upR = track(t, [[0.95, 0], [1.4, 1, 'out'], [2.2, 1], [2.8, 0]]);
      const ar = armMix(arm('R', hx, hy, 40, 34), ARM.joyR, upR); const al = armMix(ARM.restL, ARM.joyL, track(t, [[1.0, 0], [1.4, 1, 'out'], [2.2, 1], [2.8, 0, 'io']]));
      out.aR = ar; out.aL = al;
      out.sw = [-12 + (lean + 12) * 0 , lean, track(t, [[1.6, 0], [1.72, 0.9, 'out'], [2.0, 0.9], [2.15, 0, 'io']])];
      out.sw = [track(t, [[1.6, 2], [1.9, 8]]), lean, track(t, [[1.62, 0], [1.74, 1, 'out'], [1.98, 1], [2.18, 0, 'io']])];
      out.imp = [352, 96, track(t, [[1.7, 0], [1.76, 1, 'out'], [1.95, 0, 'in']])];
      out.joy = track(t, [[0, 0], [2.3, 0], [2.5, 1, 'out'], [3.0, 1], [3.2, 0]]); out.o = 1; out.sp = track(t, [[2.4, 0], [2.6, 0.8, 'out'], [3.0, 0.8], [3.2, 0]]);
      out.lookX = track(t, [[0, 0], [0.2, 0.7, 'out'], [0.9, 0.8], [1.0, 0.4], [1.5, 0.3], [1.72, 0.7, 'out'], [2.3, 0.6], [2.5, 0, 'out']]);
      out.lookY = track(t, [[0, 0], [0.2, 0.6, 'out'], [0.9, 0.5], [1.1, -0.9, 'io'], [1.72, -0.5], [2.1, 0.5, 'io'], [2.5, 0.2], [2.7, 0]]);
      out.tilt = track(t, [[0, 0], [1.1, 3, 'io'], [1.72, -2, 'in'], [2.2, 5, 'out'], [3.0, 0]]);
      out.sy = 1; out.waves = 0; out.lean = lean;
      out.lift = track(t, [[1.72, 0], [1.82, -5, 'out'], [2.05, 0, 'in']]);
      out.hdy = track(t, [[0, 0], [1.55, 0], [1.72, 3, 'io'], [2.0, 0]]);
    } else {
      // жонглирование: два подброса и ловля, мяч возвращается на место
      const r1 = 0.95, c1 = 1.55, r2 = 1.75, c2 = 2.55, put = 2.65;
      if (t < 0.5) ballMode = 'ground'; else if (t < r1) ballMode = 'hand'; else if (t < c1) ballMode = 'air1'; else if (t < r2) ballMode = 'hand2'; else if (t < c2) ballMode = 'air2'; else if (t < put) ballMode = 'hand3'; else ballMode = 'put';
      lean = track(t, [[0, 0], [0.5, 7, 'out'], [0.95, 1, 'io'], [2.5, 0, 'io'], [2.8, 2], [3.3, 0]]);
      const holdBall = (hh) => { const w = W({ lean, bob: 0 }, hh[0], hh[1]); return [w[0], w[1] + 25]; };
      const flick = (t, r, d) => track(t, [[r - 0.12, 0], [r, 1, 'out'], [r + d, 0, 'io']]);
      hand = [hx, hy];
      if (t >= r1 && t < c2) { // рука подкидывает и следит снизу вверх
        const up = Math.max(flick(t, r1, 0.5), flick(t, r2, 0.5));
        hand = [350, 236 - 38 * up];
      }
      const hw = (h) => W({ lean, bob: 0 }, h[0], h[1]);
      if (ballMode === 'hand' || ballMode === 'hand2' || ballMode === 'hand3') { const w = hw(hand); ball[0] = w[0]; ball[1] = w[1] + 25; ball[2] = 0; }
      if (ballMode === 'air1') { ball[0] = 352; ball[1] = tossFlight(t, r1, c1, 262, 104); ball[2] = (t - r1) * 300; }
      if (ballMode === 'air2') { ball[0] = 352; ball[1] = tossFlight(t, r2, c2, 262, 56); ball[2] = (t - r2) * 300; }
      if (ballMode === 'put') { const u = clamp((t - put) / 0.5); const w = hw([lerp(350, PICK.x, u), lerp(236, PICK.ytop, u)]); ball[0] = lerp(w[0], 336, u); ball[1] = lerp(w[1] + 25, 348, E.out(u)); }
      let hy2 = hy, hx2 = hx;
      if (t >= put) { const u = clamp((t - put) / 0.5); hx2 = lerp(350, 329, u); hy2 = lerp(236, 198, u); hand = [hx2, hy2]; if (t - put > 0.5) hand = [329, 198]; }
      // кисть ловит сверху: идёт к мячу
      let H = hand;
      const catching = (t > r1 + 0.28 && t < c1) || (t > r2 + 0.28 && t < c2);
      if (catching) { const apexT = (t < c1 ? (r1 + c1) / 2 : (r2 + c2) / 2); const cU = clamp((t - apexT) / 0.25); H = [lerp(hand[0], ball[0], cU * 0.9), lerp(hand[1], Math.min(hand[1], ball[1] - 26), cU)]; }
      if (t >= c1 - 0.02 && t < r2 || t >= c2 - 0.02 && t < put + 0.01) { /* пойман: кисть над мячом */ H = [ball[0], ball[1] - 25]; const lw = W({ lean: -lean, bob: 0 }, 0, 0); void lw; }
      out.aR = arm('R', H[0] - 0, H[1], 40, 34);
      if (ballMode === 'hand' || ballMode === 'hand2' || ballMode === 'hand3') out.aR = arm('R', hand[0], hand[1], 40, 34);
      front = 0;
      out.ballFront = 0;
      out.lookX = track(t, [[0, 0], [0.2, 0.7, 'out'], [0.9, 0.7], [1.2, 0.5], [2.6, 0.5], [2.9, 0]]);
      const ly = ballMode === 'air1' ? -0.8 : ballMode === 'air2' ? -0.95 : 0.5;
      out.lookY = lerp(0, ly, track(t, [[0, 0], [0.2, 1, 'out'], [3.1, 1], [3.3, 0]]));
      out.tilt = track(t, [[0, 0], [0.5, 4, 'out'], [1.2, -2], [2.4, 3], [3.3, 0]]);
      out.joy = track(t, [[0, 0], [2.6, 0], [2.8, 1, 'out'], [3.2, 1], [3.4, 0]]); out.o = 1; out.waves = 0; out.lean = lean;
      out.aL = armMix(ARM.restL, arm('L', 100, 290, -26, -12), track(t, [[0.4, 0], [0.8, 1, 'out'], [2.8, 1], [3.2, 0]]));
    }
    // мяч на земле до подбора — не двигаем; после подбора — ball
    out.ball = ball;
    if (serve) out.ballFront = (t >= 0.5 && t < 1.05) ? 0 : (t >= 1.72 && t < 2.55 ? 0 : 1);
    else out.ballFront = 0;
    return out;
  }
  def('padel-toss', { title: 'Подбросил мяч (жонглирует)', dur: 3.5, in: 0.12, out: 0.2, pose: (t) => padelPose(t, false) });
  def('padel-serve', { title: 'Подача и удар', dur: 3.3, in: 0.12, out: 0.2, pose: (t) => padelPose(t, true) });

  // --- занят ---
  def('think', { title: 'Думает', dur: 0, loop: true, in: 0.5, out: 0.5, busy: true, pose(t) {
    const tk = Math.max(0, Math.sin(2 * Math.PI * 1.35 * t)) ** 2;
    const lx = 0.62 + 0.28 * Math.sin(2 * Math.PI * t / 4.3); const ly = -0.8 + 0.12 * Math.sin(2 * Math.PI * t / 2.9 + 1);
    const hand = [266, 218 + 2.5 * tk];
    const aR = ARM.thinkR.slice(); aR[7] = hand[1]; aR[5] = 224 + 2.5 * tk;
    return {
      th: 1, tilt: -5 + 1.6 * Math.sin(2 * Math.PI * t / 3.3), lookX: lx, lookY: ly, o: 0, aR, waves: 0, bubble: 1, tailT: 1, tailA: 0, dots: dotsFn(t), lean: 1.2 * Math.sin(2 * Math.PI * t / 5.2),
      fR: [0, -3.5 * pulse(t / 2.1 + 0.1)],
    };
  } });

  def('search', { title: 'Ищет игру (ходит с лупой)', dur: 0, loop: true, in: 0.5, out: 0.5, busy: true, pose(t) {
    const step = 2 * Math.PI * t / 0.55; const A = Math.sin(2 * Math.PI * t / 2.6); const A2 = Math.cos(2 * Math.PI * t / 2.6);
    const hx = 298 + 20 * A, hy = 250 - 10 * A2;
    const mr = 8 * A;
    const ls = Math.max(0, Math.sin(step)), rs = Math.max(0, -Math.sin(step));
    return {
      lean: 3.5, bob: -2 * Math.abs(Math.sin(step)), fL: [5 * Math.sin(step), -8 * ls], fR: [-5 * Math.sin(step), -8 * rs],
      aR: arm('R', hx, hy, 22, 34), mag: 1, mx: hx + 2, my: hy - 2, mr,
      aL: arm('L', 112 + 6 * Math.sin(step), 306 - 4 * Math.cos(step), -22, -14), waves: 0,
      lookX: 0.75 + 0.2 * A, lookY: -0.35 + 0.15 * A2, tilt: 2 + 2.5 * A, o: 0.4 + 0.1 * Math.sin(step), th: 0, hdy: -1 * Math.abs(Math.sin(step)),
    };
  } });

  def('flip', { title: 'Листает', dur: 0, loop: true, in: 0.5, out: 0.5, busy: true, pose(t) {
    const T = 2.5; const u = (t % T) / T;
    const p = track(u, [[0, 0], [0.26, 1, 'io']]);
    const back = track(u, [[0.26, 0], [0.56, 1, 'io']]); // кисть возвращается к правому краю
    const hx = u < 0.26 ? 108 + 47 * Math.cos(Math.PI * p) : lerp(62, 160, back);
    const hy = u < 0.26 ? 300 - 26 * Math.sin(Math.PI * p) : 300 - 22 * Math.sin(Math.PI * back);
    const sc = ((t * 1.6) % 1);
    return {
      book: 1, page: u < 0.26 ? p : 1, aL: arm('L', 60, 324, -20, 4), aR: arm('R', hx, hy, 6, 22), waves: 0,
      lookX: -0.55 + 1.1 * sc, lookY: 0.8, tilt: 4 + 1.2 * Math.sin(2 * Math.PI * t / 3.1), lean: 1.5, o: 0, th: 0, hdy: 1.5, bob: 0.6 * Math.sin(2 * Math.PI * t / 2.4),
    };
  } });

  def('answer', { title: 'Отвечает (говорит)', dur: 0, loop: true, in: 0.45, out: 0.45, busy: true, pose(t) {
    const gate = sm((Math.sin(2 * Math.PI * t / 2.7) + 0.55) * 1.4);
    const syl = Math.abs(Math.sin(2 * Math.PI * 2.4 * t + 0.9 * Math.sin(2 * Math.PI * 0.7 * t)));
    const o = 0.12 + 0.88 * syl * gate + 0.0;
    const ph = 2 * Math.PI * 1.15 * t;
    const typ = [0, 1, 2].map((i) => 0.35 + 0.65 * pulse(t / 1.05 - i * 0.22));
    return {
      o, tilt: 2.4 * Math.sin(ph) * gate, hdy: -1.6 * Math.abs(Math.sin(ph)) * gate, lookX: 0.15 * Math.sin(2 * Math.PI * t / 1.9), lookY: -0.05, th: 0,
      aR: arm('R', 312 + 9 * Math.sin(ph + 0.5), 228 - 8 * gate * Math.abs(Math.sin(ph)), 40, 34), waves: 0, aL: arm('L', 118 + 4 * Math.sin(ph), 304 - 3 * gate, -26, -12),
      bubble: 1, tailA: 1, tailT: 0, dots: typ, dotsY: typ.map((v) => -4.5 * (v - 0.35) / 0.65), lean: 1.2 * Math.sin(ph / 2),
    };
  } });

  def('joy', { title: 'Радуется (непрочитанное, удержание)', dur: 0, loop: true, in: 0.4, out: 0.4, hold: true, pose(t) {
    const hop = -3 * Math.abs(Math.sin(2 * Math.PI * 1.1 * t)); const sw = Math.sin(2 * Math.PI * t / 2.4);
    return {
      lift: -8 + hop, joy: 1, o: 1, aL: arm('L', 75, 190 + 4 * sw, -0, 0).map((v, i) => [180, 260, 92, 262 + 3 * sw, 76, 196 + 4 * sw, 75, 190 + 4 * sw][i]),
      aR: [220, 260, 308, 262 - 3 * sw, 324, 196 - 4 * sw, 325, 190 - 4 * sw], waves: 0, sp: 1, spt: t, ball: [336, 340, 0, 1, 1], lean: 2.4 * sw, tilt: 0,
    };
  } });

  /* ---------- Мозг: покой + расписание + занят ---------- */
  const IDLE_W = { look: 4, smile: 3, wave: 2, 'padel-toss': 1.2, 'padel-serve': 0.8 };
  const COOLDOWN = { wave: 30, smile: 12, look: 8, 'padel-toss': 25, 'padel-serve': 40 };
  const PAUSE = [3, 8];

  function Brain({ seed = 7, reduce = false, onLog } = {}) {
    this.rand = rng(seed); this.reduce = reduce; this.log = onLog || (() => {}); this.time = 0; this.inst = [];
    this.mode = 'idle'; this.busyKind = null; this.joyHold = false; this.auto = true; this.last = null; this.lastAt = {};
    this.nextBlink = 1.2 + this.rand() * 2; this.blinkT = -1; this.dbl = false;
    this.glance = [0, 0]; this.glanceTo = [0, 0]; this.nextGlance = 1 + this.rand() * 2; this.glanceUntil = 0;
    this.pauseLeft = 2.0; this.state = clone(REST); this.postBusyGrin = false; this.speed = 1;
  }
  const weighted = (r, items) => { let sum = 0; for (const [, w] of items) sum += w; let x = r() * sum; for (const [k, w] of items) { if ((x -= w) <= 0) return k; } return items[0][0]; };
  Brain.prototype.start = function (name, opts = {}) {
    const a = ANIMS[name]; const inst = { a, t: 0, w: 0, phase: 'in', fast: !!opts.fast }; this.inst.push(inst); this.lastAt[name] = this.time; this.log(`▶ ${name}`); return inst;
  };
  Brain.prototype.stopAll = function (filter, outDur) { for (const i of this.inst) if (filter(i) && i.phase !== 'out') { i.phase = 'out'; i.outDur = outDur ?? i.a.out; } };
  Brain.prototype.setBusy = function (kind) {
    if (this.reduce) { this.mode = kind ? 'busy' : 'idle'; this.busyKind = kind; return; }
    if (kind) {
      this.stopAll((i) => !i.a.busy && !i.a.hold, 0.25);
      this.stopAll((i) => i.a.busy && i.a.name !== kind, 0.35);
      if (!this.inst.some((i) => i.a.name === kind && i.phase !== 'out')) { const n = this.start(kind); if (this.busyKind) n.inSpeed = 1 / 0.35; }
      this.mode = 'busy'; this.busyKind = kind; this.log(`занят: ${kind}`);
    } else if (this.mode === 'busy') {
      this.stopAll((i) => i.a.busy); this.mode = 'idle'; const was = this.busyKind; this.busyKind = null; this.pauseLeft = 1.6; this.postBusyGrin = true; this.log(`покой (был: ${was})`);
    }
  };
  Brain.prototype.setJoy = function (on) { this.joyHold = on; if (on) { this.stopAll((i) => !i.a.hold, 0.25); if (!this.inst.some((i) => i.a.name === 'joy' && i.phase !== 'out')) this.start('joy'); } else this.stopAll((i) => i.a.name === 'joy'); };
  Brain.prototype.pick = function () {
    const cand = Object.entries(IDLE_W).filter(([k]) => k !== this.last && (this.time - (this.lastAt[k] ?? -999)) > COOLDOWN[k]);
    if (!cand.length) return 'look'; return weighted(this.rand, cand);
  };
  Brain.prototype.step = function (dt) {
    dt *= this.speed; this.time += dt; const T = this.time; const s = clone(REST);
    // --- фон: дыхание, наклон головы, лёгкий дрейф (всегда, кроме Reduce Motion) ---
    const wAct = Math.max(0, ...this.inst.map((i) => i.w)); const amb = this.reduce ? 0 : 1 - 0.75 * sm(wAct);
    if (!this.reduce) {
      const br = Math.sin(2 * Math.PI * T / 3.6);
      s.bob += 1.1 * br * amb; s.hdy += -0.8 * br * amb; s.tilt += (1.3 * Math.sin(2 * Math.PI * T / 6.7) + 0.7 * Math.sin(2 * Math.PI * T / 2.9)) * amb;
      s.lean += 0.9 * Math.sin(2 * Math.PI * T / 5.3) * amb; s.sx = 1 - 0.002 * br * amb; s.sy = 1 + 0.003 * br * amb;
      // кисть «живёт»: покачивание и волны дышат
      const hw = Math.sin(2 * Math.PI * T / 1.9); s.aR = ARM.restR.slice(); s.aR[6] += 2.2 * hw * amb; s.aR[7] += 1.6 * Math.cos(2 * Math.PI * T / 1.9) * amb; s.aR[4] += 1.6 * hw * amb; s.aR[5] += 1.2 * Math.cos(2 * Math.PI * T / 1.9) * amb;
      s.waves = 0.8 + 0.2 * hw; s.wdx = 2.2 * hw * amb; s.wdy = 1.6 * Math.cos(2 * Math.PI * T / 1.9) * amb;
      // взгляд: случайные взгляды в стороны
      if (T > this.nextGlance) { if (this.glanceUntil < T) { const a = this.rand(); this.glanceTo = a < 0.28 ? [0, 0] : [(this.rand() * 2 - 1) * 0.65, (this.rand() * 2 - 1) * 0.35]; this.glanceUntil = T + 0.8 + this.rand() * 1.4; this.nextGlance = this.glanceUntil + 0.6 + this.rand() * 2.4; } }
      const k = 1 - Math.exp(-dt / 0.07); this.glance = [lerp(this.glance[0], this.glanceTo[0], k), lerp(this.glance[1], this.glanceTo[1], k)];
      s.lookX = this.glance[0] * amb; s.lookY = this.glance[1] * amb; s.hdx = s.lookX * 1.8;
    }
    // --- моргание (при Reduce Motion — только оно, раз в 6–10 с, без движения) ---
    if (this.blinkT < 0 && T > this.nextBlink) { this.blinkT = 0; this.dbl = !this.reduce && this.rand() < 0.18; }
    let bl = 1; if (this.blinkT >= 0) { this.blinkT += dt; const u = this.blinkT; bl = u < 0.07 ? lerp(1, 0.08, u / 0.07) : u < 0.11 ? 0.08 : u < 0.22 ? lerp(0.08, 1, (u - 0.11) / 0.11) : 1; if (u >= (this.dbl ? 0.5 : 0.22)) { if (this.dbl && u < 0.5) { /* ждём второго */ } if (u >= 0.22 && this.dbl && u < 0.29) bl = 1; if (this.dbl && u >= 0.29 && u < 0.5) { const v = u - 0.29; bl = v < 0.07 ? lerp(1, 0.08, v / 0.07) : v < 0.11 ? 0.08 : v < 0.21 ? lerp(0.08, 1, (v - 0.11) / 0.1) : 1; } if (u >= (this.dbl ? 0.5 : 0.22)) { this.blinkT = -1; this.nextBlink = T + (this.reduce ? 6 + this.rand() * 4 : 2.2 + this.rand() * 3.4); } } }
    // --- планировщик пауз ---
    if (this.auto && this.mode === 'idle' && !this.reduce && !this.joyHold && !this.inst.some((i) => !i.a.hold)) {
      this.pauseLeft -= dt;
      if (this.pauseLeft <= 0) {
        let name; if (this.postBusyGrin) { name = 'smile'; this.postBusyGrin = false; } else name = this.pick();
        this.last = name; this.start(name); this.pauseLeft = PAUSE[0] + this.rand() * (PAUSE[1] - PAUSE[0]);
      }
    }
    // --- жесты ---
    let st = s;
    for (const i of this.inst) {
      i.t += dt;
      if (i.phase === 'in') { i.w += dt * (i.inSpeed || 1 / i.a.in); if (i.w >= 1) { i.w = 1; i.phase = 'on'; } }
      if (i.phase === 'on' && !i.a.loop && i.t >= i.a.dur - i.a.out) i.phase = 'out';
      if (i.phase === 'out') { i.w -= dt / (i.outDur || i.a.out); }
      if (i.a.loop === false && i.t >= i.a.dur) i.w = 0;
      if (i.w <= 0 && i.phase !== 'in') i.dead = true;
      const pose = i.a.pose(i.t); const w = (i.a.loop || true) ? sm(i.w) : 1;
      const ww = i.a.loop ? w : (i.a.dur ? sm(clamp(i.t / i.a.in)) * sm(clamp((i.a.dur - i.t) / i.a.out)) : w);
      st = this.applyPose(st, pose, ww, i.a);
    }
    this.inst = this.inst.filter((i) => !i.dead);
    st.blink = Math.min(st.blink, bl);
    if (this.reduce) { st = clone(REST); st.blink = bl; if (this.mode === 'busy') { st = mix(st, ANIMS.think.pose(0), 1); st.dots = [1, 1, 1]; st.lean = 0; } }
    this.state = st; return st;
  };
  Brain.prototype.applyPose = function (st, pose, w, a) { const p = { ...pose }; delete p._cyc; return mix(st, p, w); };

  /* Детерминированный кадр для раскадровки/видео: фон без случайностей + одна анимация в момент t. */
  function frameAt(name, t, { ambTime = 1.3 } = {}) {
    const a = ANIMS[name]; const s = clone(REST); const T = ambTime + t;
    const br = Math.sin(2 * Math.PI * T / 3.6); s.bob += 1.1 * br; s.hdy -= 0.8 * br; s.tilt += 1.3 * Math.sin(2 * Math.PI * T / 6.7);
    const hw = Math.sin(2 * Math.PI * T / 1.9); s.aR = ARM.restR.slice(); s.aR[6] += 2.2 * hw; s.aR[7] += 1.6 * Math.cos(2 * Math.PI * T / 1.9); s.waves = 0.8 + 0.2 * hw;
    let w; if (a.loop) w = sm(clamp(t / a.in)); else w = sm(clamp(t / a.in)) * sm(clamp((a.dur - t) / a.out));
    const p = a.pose(t); delete p._cyc;
    const st = mix(s, p, w);
    const u = (T % 2.9); st.blink = Math.min(st.blink, u < 0.07 ? lerp(1, 0.08, u / 0.07) : u < 0.11 ? 0.08 : u < 0.22 ? lerp(0.08, 1, (u - 0.11) / 0.11) : 1);
    return st;
  }

  g.PaddyAlive = { Rig, Brain, ANIMS, REST, frameAt, C, IDLE_W, COOLDOWN, PAUSE };
})(window);
