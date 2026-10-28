(function () {
  const P = PaddyAlive; const $ = (id) => document.getElementById(id); const q = new URLSearchParams(location.search);
  const rigs = [
    new P.Rig($('figL'), { size: 312 }), new P.Rig($('figD'), { size: 312, dark: true }),
    new P.Rig($('r104L'), { size: 104 }), new P.Rig($('r104D'), { size: 104, dark: true }), new P.Rig($('r80L'), { size: 80 }), new P.Rig($('r80D'), { size: 80, dark: true }),
  ];
  const brain = new P.Brain({ seed: +(q.get('seed') || 11), onLog: (m) => log(m) });
  const LBL = { wave: 'Привет-взмах', smile: 'Улыбка', look: 'Осматривается', 'padel-toss': 'Подбросил мяч', 'padel-serve': 'Подача и удар', think: 'Думает', search: 'Ищет игру', flip: 'Листает', answer: 'Отвечает', joy: 'Радуется (непрочитанное)' };
  function log(m) { const el = $('log'); const d = document.createElement('div'); d.textContent = `${brain.time.toFixed(1).padStart(5)} с  ${m}`; el.prepend(d); while (el.children.length > 40) el.lastChild.remove(); }
  const idle = ['wave', 'smile', 'look', 'padel-toss', 'padel-serve']; const busy = ['think', 'search', 'flip', 'answer'];
  const mk = (id, names, fn, cls) => names.forEach((n) => { const b = document.createElement('button'); b.className = cls || ''; b.dataset.n = n; b.innerHTML = `${LBL[n]}<small>${P.ANIMS[n].dur ? P.ANIMS[n].dur + ' с' : 'цикл'}</small>`; b.onclick = () => fn(n); $(id).appendChild(b); });
  function mark() { document.querySelectorAll('#busyBtns button').forEach((b) => b.classList.toggle('on', brain.busyKind === b.dataset.n)); $('bIdle').classList.toggle('on', brain.mode === 'idle' && !brain.joyHold); $('bBusy').classList.toggle('on', brain.mode === 'busy'); $('bJoy').classList.toggle('on', brain.joyHold); }
  mk('idleBtns', idle, (n) => { brain.setJoy(false); brain.setBusy(null); brain.stopAll((i) => !i.a.busy, 0.15); brain.last = n; brain.start(n); brain.pauseLeft = 4; mark(); });
  mk('busyBtns', busy, (n) => { brain.setJoy(false); brain.setBusy(n); mark(); }, 'busy');
  $('bIdle').onclick = () => { brain.setJoy(false); brain.setBusy(null); mark(); };
  $('bBusy').onclick = () => { brain.setJoy(false); brain.setBusy(brain.busyKind || 'think'); mark(); };
  $('bJoy').onclick = () => { brain.setBusy(null); brain.setJoy(!brain.joyHold); mark(); };
  $('auto').onchange = (e) => { brain.auto = e.target.checked; };
  $('reduce').onchange = (e) => { brain.reduce = e.target.checked; brain.inst = []; log(e.target.checked ? 'Reduce Motion: вкл' : 'Reduce Motion: выкл'); };
  $('speed').oninput = (e) => { brain.speed = +e.target.value; $('spv').textContent = e.target.value + '×'; };

  // единый тик; пауза, когда вкладка скрыта или сцена вне экрана (правило экономии батареи)
  let last = performance.now(), visible = true, running = true;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe($('stage'));
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || !visible || !running) { last = now; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const s = brain.step(dt); for (const r of rigs) r.apply(s);
    const act = brain.inst.filter((i) => i.phase !== 'out').map((i) => LBL[i.a.name]).join(' + ');
    $('status').textContent = brain.reduce ? 'Reduce Motion: поза ' + (brain.mode === 'busy' ? 'think' : 'hello') + ', только моргание' : `${brain.mode === 'busy' ? 'занят: ' + LBL[brain.busyKind] : brain.joyHold ? 'удержание: joy' : 'покой'}${act && brain.mode === 'idle' && !brain.joyHold ? ' · сейчас: ' + act : ''}${brain.mode === 'idle' && !brain.joyHold && brain.auto && !act ? ' · следующий жест через ' + Math.max(0, brain.pauseLeft).toFixed(1) + ' с' : ''}`;
    const i0 = brain.inst[0]; document.querySelector('#bar i').style.width = i0 && i0.a.dur ? Math.min(100, (i0.t / i0.a.dur) * 100) + '%' : '0';
  }
  requestAnimationFrame(frame);

  /* --- API для ролика/раскадровок (headless) --- */
  window.__ui = { freeze() { running = false; }, showFrame(name, t) { running = false; const s = P.frameAt(name, t); for (const r of rigs) r.apply(s); },
    brainStep(dt) { running = false; const s = brain.step(dt); for (const r of rigs) r.apply(s); return { mode: brain.mode, act: brain.inst.filter((i) => i.phase !== 'out').map((i) => i.a.name), busy: brain.busyKind }; },
    brain, setBusy(k) { brain.setBusy(k); }, setOverlay(a, b) { $('overlay').innerHTML = `${a}<span>${b || ''}</span>`; } };
  if (q.get('view') === 'clip') document.body.classList.add('clip');
})();
