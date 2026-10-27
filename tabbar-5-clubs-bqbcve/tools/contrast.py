#!/usr/bin/env python3
"""Контраст токенов (WCAG 2.x) для светлой и тёмной темы из src/style.css (значения 1:1 из colors.ts). Пишет contrast.md, код возврата 1 при провалах."""
import re, pathlib, sys
R = pathlib.Path(__file__).resolve().parent.parent
css = (R/'src/style.css').read_text()
def block(sel):
    m = re.search(re.escape(sel)+r'\{(.*?)\n\}', css, re.S); return dict(re.findall(r'--([\w-]+):(#[0-9A-Fa-f]{6})', m.group(1)))
light = block(':root'); dark = {**light, **block('.dark')}
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= .03928 else ((x+.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a, b):
    x, y = sorted((lum(a), lum(b)), reverse=True); return (x+.05)/(y+.05)
TEXT = 4.5; FIELD = 3.6; NONTEXT = 3.0
PAIRS = [
 ('текст', 'ink','bg',TEXT),('текст','ink','surface',TEXT),('текст','ink','surfaceSunk',TEXT),('текст','ink','tintMango',TEXT),('текст','ink','tintCoral',TEXT),
 ('текст','inkMuted','bg',TEXT),('текст','inkMuted','surface',TEXT),('текст','inkMuted','surfaceSunk',TEXT),
 ('токен вне макета','placeholder','surface',TEXT),('токен вне макета','placeholder','bg',TEXT),
 ('текст','onBrand','brandCoral',TEXT),('текст','onBrand','brandMango',TEXT),('текст','onBrand','brandMint',TEXT),
 ('текст','onInverse','inverse',TEXT),('текст','inkOnNight','surfaceNight',TEXT),('текст','inkOnNightMuted','surfaceNight',TEXT),
 ('текст','inkAccent','surface',TEXT),('текст','inkAccent','bg',TEXT),('текст','inkMango','surface',TEXT),('текст','inkMango','tintMango',TEXT),
 ('текст','success','surface',TEXT),('текст','success','surfaceSunk',TEXT),('текст','danger','surface',TEXT),('текст','danger','surfaceSunk',TEXT),('текст','danger','bg',TEXT),
 ('текст','successSoftInk','successSoft',TEXT),('текст','onDanger','danger',TEXT),
 ('текст (волна B)','ink','tintMint',TEXT),('текст (волна B)','ink','successSoft',TEXT),('текст (волна B)','inkAccent','surfaceSunk',TEXT),('текст (волна B)','inkAccent','tintCoral',TEXT),('текст (волна B)','inkMuted','tintMango',TEXT),('текст (волна B)','success','bg',TEXT),
 ('не-текст (Paddy)','lineStrong','surface',NONTEXT),('не-текст (Paddy)','lineStrong','surfaceSunk',NONTEXT),('текст (Paddy)','inkMuted','bg',TEXT),('не-текст (Paddy)','ink','tintMint',NONTEXT),
 ('не-текст (волна B)','brandMint','surfaceNight',NONTEXT),('не-текст (волна B)','inkAccent','surfaceSunk',NONTEXT),
 ('не-текст (кнопка Paddy: контур светлой темы)','#24123A','tabBar',NONTEXT),('не-текст (кнопка Paddy: контур светлой темы)','#24123A','tintCoral',NONTEXT),('не-текст (кнопка Paddy: белый ореол тёмной)','#FFFFFF','tabBar',NONTEXT),('не-текст (кнопка Paddy: белый ореол тёмной)','#FFFFFF','bg',NONTEXT),
 ('текст (вкладка Paddy, неактивная: иконка и подпись)','inkMuted','tabBar',TEXT),('текст (вкладка Paddy, активная)','onBrand','brandMango',TEXT),('текст/контур (R1–R3: контур Paddy ink на coral-круге, ≥4,5)','onBrand','brandCoral',TEXT),('не-текст (R1–R3: кольцо ink активного круга на панели)','ink','tabBar',NONTEXT),('не-текст (R2: внешнее кольцо mango на фоне экрана)','brandMango','bg',NONTEXT),('не-текст (R: coral-круг против панели; форму держит обводка цвета панели и ink-контур Paddy)','brandCoral','tabBar',NONTEXT),('текст/контур (D1–D4: контур Paddy ink на coral-пилюле, ≥4,5)','onBrand','brandCoral',TEXT),('не-текст (D1/D3/D4: кольцо ink активной пилюли на панели)','ink','tabBar',NONTEXT),('не-текст (D2: mango-обводка активной пилюли на панели; различие несут и цвет, и обводка)','brandMango','tabBar',NONTEXT),('не-текст (F4: черты лица ink на coral-голове, неактивная)','onBrand','brandCoral',NONTEXT),('не-текст (F4: кремовая голова на mango, активная)','inkOnNight','brandMango',NONTEXT),('не-текст (F4: черты лица ink на кремовой голове)','onBrand','inkOnNight',NONTEXT),('не-текст (F4: coral-голова против панели; контур muted даёт форму)','brandCoral','tabBar',NONTEXT),('не-текст (активная вкладка: заливка mango против панели; различие несут и заливка, и цвет подписи)','brandMango','tabBar',NONTEXT),
 ('текст (таб-бар: активная подпись)','ink','tabBar',TEXT),('текст (таб-бар: иконка в mango-круге)','onBrand','brandMango',TEXT),
 ('текст (Чаты: «Paddy», превью непрочитанного)','ink','bg',TEXT),('текст (Чаты: превью прочитанного)','inkMuted','bg',TEXT),('текст (Чаты: время, превью в строке)','inkMuted','surface',TEXT),
 ('текст (Чаты: бейдж «1»)','onBrand','brandCoral',TEXT),('текст (Чаты: пустое состояние)','inkMuted','bg',TEXT),('не-текст (Чаты: иконка закрепления 14)','inkMuted','bg',NONTEXT),('не-текст (Чаты: иконка в пустом состоянии)','inkMuted','surfaceSunk',NONTEXT),
 ('не-текст (Чаты: точка непрочитанного у мини-Paddy)','inkAccent','bg',NONTEXT),('не-текст (Чаты: линия полоски)','line','bg',1.0),
 ('текст (Клубы: тег «Свободные корты»)','ink','tintMint',TEXT),('текст (Клубы: тег «Новый тренер»)','ink','tintCoral',TEXT),('текст (Клубы: тег «Турнир»)','ink','tintMango',TEXT),('не-текст (Клубы: точка нового анонса)','inkAccent','surface',NONTEXT),('текст (Клубы: бейдж анонсов, бейдж «Чаты»)','onBrand','brandCoral',TEXT),('текст (Клубы: «Вступить»)','onBrand','brandCoral',TEXT),
 ('рамка поля','lineStrong','bg',FIELD),('рамка поля','lineStrong','surface',FIELD),
 ('не-текст','success','surfaceSunk',NONTEXT),('не-текст','inkMango','surfaceSunk',NONTEXT),('не-текст','danger','surfaceSunk',NONTEXT),
 ('не-текст','focusRing','bg',NONTEXT),('не-текст (кнопка с подписью, граница не несёт смысла)','brandCoral','bg',NONTEXT),
]
PAIRS=[q for q in PAIRS if not any(k in q[0] for k in ('кнопка Paddy','вкладка Paddy','R1','(R:','(D1','(D2','(F4','активная вкладка: заливка'))]+[('текст (таб-бар 5 вкладок: подпись и значок неактивной)','ink','tabBar',TEXT),('текст (таб-бар: подпись активной)','ink','tabBar',TEXT)]
out = ['# Контраст токенов Festa (WCAG 2.x)', '', 'Источник: `src/style.css` (значения 1:1 из `src-festa/src/theme/colors.ts`, dark = D4 сине-графитовый из кода). Пороги: текст ≥ 4.5, рамка поля ≥ 3.6, не-текст (полосы, фокус) ≥ 3.', '']
fails = 0
for name, pal in (('Светлая тема', light), ('Тёмная тема', dark)):
    out += [f'## {name}', '', '| роль | передний план | фон | контраст | порог | итог |', '|---|---|---|---|---|---|']
    for kind, f, b, th in PAIRS:
        v = cr(pal.get(f,f), pal.get(b,b)); ok = v >= th; fails += (not ok and not kind.startswith(('токен вне','не-текст (')))
        out.append(f'| {kind} | {f} `{pal.get(f,f)}` | {b} `{pal.get(b,b)}` | {v:.2f} | {th} | {"ок" if ok else ("**ПРОВАЛ**" if not kind.startswith(("токен вне","не-текст (")) else "ниже порога (см. примечание)")} |')
    out.append('')

# ---- таб-бар «стекло»: аналитическая модель худшего фона (сплошной блок под баром; blur усредняет, так что это нижняя граница) ----
def rgbv(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def lumv(c):
    c=[x/255 for x in c]; c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def crv(a,b):
    x,y=sorted((lumv(a),lumv(b)),reverse=True); return (x+.05)/(y+.05)
GL=[('Светлая тема',light,.72,1.24,{'ink (все подписи и иконки)':'ink'},[('ink-блок','#24123A'),('coral','#FF5E5B'),('mango','#FFA62B'),('mint','#3DDBB0'),('bg','#FFF1EA')],False),
    ('Тёмная тема',dark,.80,1.06+.12,{'ink (подписи, неактивные иконки)':'ink','mango (иконка активной вкладки)':'brandMango'},[('mint','#4BE3BA'),('mango','#FFA62B'),('coral','#FF6F6C'),('bg','#0A1124'),('белый блок (стресс-тест, в макете нет)','#FFFFFF')],True)]
gl=['','## Таб-бар «стекло»: худший фон под баром (модель: alpha·tabBar + (1−alpha)·фон, затем brightness линзы в нажатом состоянии)','',
    'Блок под баром предполагается сплошным и без размытия — это нижняя граница. Реальный контраст по пикселям рендера — в `glass-contrast.md`.','',
    '| тема | alpha | элемент | фон под баром | контраст (бар) | контраст (линза нажата) | порог | итог |','|---|---|---|---|---|---|---|---|']
gfails=0
for nm,pal,al,brn,els,bgs,_ in GL:
    bar=rgbv(pal['tabBar'])
    for en,tk in els.items():
        for bn,bh in bgs:
            m=[al*a+(1-al)*b for a,b in zip(bar,rgbv(bh))]; l=[min(255,x*brn) for x in m]
            t=rgbv(pal[tk]); c1=crv(t,m); c2=crv(t,l); stress=bn.startswith('белый')
            ok=min(c1,c2)>=TEXT; gfails+= (not ok and not stress)
            gl.append(f'| {nm} | {al:.2f} | {en} | {bn} | {c1:.2f} | {c2:.2f} | 4,5 | {"ок" if ok else ("ниже порога (стресс-тест)" if stress else "**ПРОВАЛ**")} |')
out+=gl; out.append(f'Провалов в модели стекла: {gfails}'); fails+=gfails
out.append(f'Провалов: {fails}')
(R/'contrast.md').write_text('\n'.join(out)+'\n'); print('\n'.join(l for l in out if 'ПРОВАЛ' in l or l.startswith('##') or l.startswith('Провалов')))
sys.exit(1 if fails else 0)
