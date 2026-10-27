#!/usr/bin/env python3
"""Собирает самодостаточный index.html: CSS + JS + шрифты (base64 woff2) + иконки Lucide (SVG-спрайт). Без сети."""
import base64, re, pathlib, sys
R = pathlib.Path(__file__).resolve().parent.parent
LUC = pathlib.Path('/workspace/paddy-est/repo/node_modules/lucide-react-native/dist/esm/icons')
ICONS = ['wifi-off','circle-pause','power-off','refresh-cw','mic','arrow-up','plus','image','video','file','map-pin','sticker','x','check','lock','languages','chevron-left','star',
 'message-circle','audio-lines','audio-waveform','volume-2','volume-x','info','circle-alert','circle-x','triangle-alert','rotate-ccw','house',
 'user-round','users','volleyball','clock','bot','keyboard','play','settings-2',
 'mic-off','badge-check','circle','pin','pin-off','bell-off','check-check','reply','forward','pencil','trash','flag','copy','megaphone','shield-check','user-round-x','search','send','thumbs-up','heart','phone','camera','speech','square','contact','flame','handshake','trophy','circle-check','settings','log-out','ban','square-pen','user-round-plus','message-square','brain','eye','shield','mail','user-round-check','hand','ellipsis','chevron-right','ellipsis-vertical','users-round','ticket','timer','cloud-off','sparkles','layout-grid','book-open','settings','chevron-down','sliders-horizontal']
def sym(name):
    src = (LUC / f'{name}.mjs').read_text()
    body = re.search(r'node:\s*\[(.*)\]\s*\};', src, re.S).group(1)
    out = ''
    for tag, attrs in re.findall(r'"(path|circle|rect|line|polyline|polygon|ellipse)",\s*\{(.*?)\}', body, re.S):
        a = ' '.join(f'{k}="{v}"' for k, v in re.findall(r'(\w+):\s*"([^"]*)"', attrs) if k != 'key')
        out += f'<{tag} {a}/>'
    return f'<symbol id="i-{name}" viewBox="0 0 24 24">{out}</symbol>'
def font(face, file, weight):
    b = base64.b64encode((R/'fonts'/file).read_bytes()).decode()
    return f"@font-face{{font-family:'{face}';font-weight:{weight};font-style:normal;font-display:block;src:url(data:font/woff2;base64,{b}) format('woff2')}}"
fonts = '\n'.join([font('Golos Text','GolosText_400Regular.woff2',400), font('Golos Text','GolosText_500Medium.woff2',500),
  font('Golos Text','GolosText_600SemiBold.woff2',600), font('Golos Text','GolosText_700Bold.woff2',700), font('Montserrat Alternates','MontserratAlternates_800ExtraBold.woff2',800),
  font('Montserrat','Montserrat_800ExtraBold.woff2',800)])
# своя иконка-силуэт Paddy в стиле Lucide (24×24, stroke 2, round): голова-дека, глаза, улыбка, ручка, ножки
PADDY_ICON = '<symbol id="i-paddy" viewBox="0 0 24 24"><ellipse cx="12" cy="8" rx="6.6" ry="6.9"/><path d="M9.4 9.6q2.6 2.2 5.2 0"/><path d="M9.4 6.4h.01"/><path d="M14.6 6.4h.01"/><path d="M12 14.9V18"/><path d="M12 18l-3 3.8"/><path d="M12 18l3 3.8"/></symbol><symbol id="i-paddy1" viewBox="0 0 24 24"><ellipse cx="12" cy="8" rx="6.6" ry="6.9"/><path d="M9.4 9.6q2.6 2.2 5.2 0"/><path d="M9.4 6.4h.01"/><path d="M14.6 6.4h.01"/><path d="M12 14.9V18"/><path d="M12 18l-3 3.8"/><path d="M12 18l3 3.8"/></symbol><symbol id="i-paddy2" viewBox="0 0 24 24"><ellipse cx="12" cy="7.5" rx="6.5" ry="6" style="fill:var(--pd-head,none)"/><path d="M9.8 6.8h.01" style="stroke:var(--pd-face,currentColor)"/><path d="M14.2 6.8h.01" style="stroke:var(--pd-face,currentColor)"/><path d="M10 9.3q2 1.6 4 0" style="stroke:var(--pd-face,currentColor)"/><path d="M12 13.5V17"/><path d="M12 17l-2.6 4.5"/><path d="M12 17l2.6 4.5"/><path d="M5.6 11.2q-2.4 1.3-1.8 4"/><path d="M18.4 11.2q2.6-.3 2.4-4"/></symbol><symbol id="i-paddy3" viewBox="0 0 24 24"><ellipse cx="12" cy="9.2" rx="7.4" ry="7.8" style="fill:var(--pd-head,none)"/><path d="M9.4 8.4h.01" style="stroke:var(--pd-face,currentColor)"/><path d="M14.6 8.4h.01" style="stroke:var(--pd-face,currentColor)"/><path d="M9.6 11.9q2.4 2 4.8 0" style="stroke:var(--pd-face,currentColor)"/><path d="M12 17V22.2"/></symbol>'
sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' + ''.join(sym(i) for i in ICONS) + PADDY_ICON + '</svg>'
css = (R/'src/style.css').read_text()+(R/'src/home.css').read_text()+(R/'src/paddy.css').read_text()+(R/'src/chats.css').read_text()+(R/'src/tab5.css').read_text(); js = (R/'src/app.js').read_text().replace('/*@@WAVEB@@*/', (R/'src/waveb.js').read_text()).replace('/*@@HOME@@*/', (R/'src/home.js').read_text()+'\n'+(R/'src/paddy.js').read_text()+'\n'+(R/'src/chats.js').read_text()+'\n'+(R/'src/tab5.js').read_text())
import json
SV = pathlib.Path('/workspace/paddy-looks/racket-v2/svg')
def svg(n):
    s = (SV/n).read_text()
    return re.sub(r'\s+role="img" aria-label="[^"]*"', ' aria-hidden="true" focusable="false"', s)
paddy = {'av': svg('avatar.svg'), 'hello': svg('hello.svg'), 'helloD': svg('hello-dark.svg')}
for k in ('joy','think','oops','sport'):
    paddy[k] = svg('../stickers/'+k+'.svg'); paddy[k+'D'] = svg('../stickers/'+k+'-dark.svg')

P3 = R/'src'/'paddy3'
for k in ('calm','count','sleep'):
    for suf,dk in (('','') ,('-dark','D')):
        paddy[k+dk] = re.sub(r'\s+role="img" aria-label="[^"]*"', ' aria-hidden="true" focusable="false"', (P3/(k+suf+'.svg')).read_text())
def tabv(n, simple):
    s = svg(n)
    s = re.sub(r'<circle cx="336" cy="348" r="30".*?/><path d="M319\.5 324\.0[^>]*/>', '', s, flags=re.S)   # мяч
    s = re.sub(r'<path d="M349 178 Q359 190[^>]*/>', '', s)                                              # «волны» руки
    if simple:
        s = re.sub(r'<g clip-path="url\(#uk1\)">.*?</g>', '', s, flags=re.S)                             # точки струн
        s = re.sub(r'<path d="M200 304 Q248 320 236 282"[^>]*/>', '', s)                                  # хвостик
        s = s.replace('viewBox="0 0 400 400"', 'viewBox="64 6 288 322"')
    else:
        s = s.replace('viewBox="0 0 400 400"', 'viewBox="66 10 286 346"')
    return s
paddy.update({'tabF': tabv('hello.svg', False), 'tabFD': tabv('hello-dark.svg', False), 'tabC': tabv('hello.svg', True), 'tabCD': tabv('hello-dark.svg', True)})
tbm = (R/'src/tabspec.json').read_text() if (R/'src/tabspec.json').exists() else 'null'
js = js.replace('/*@@TBM@@*/', 'const TBM=' + tbm + ';')
js = js.replace('/*@@PADDY@@*/', 'const PADDY=' + json.dumps(paddy, ensure_ascii=False) + ';')
html = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><title>Padelada · Таб-бар на 5 вкладок · Клубы</title>
<style>{fonts}
{css}</style></head>
<body>{sprite}
<div class="stage"><div class="phone"><div class="app" id="app"></div></div><aside class="panel" id="panel"></aside></div>
<script>{js}</script></body></html>'''
(R/'index.html').write_text(html)
print('index.html', len(html.encode())//1024, 'KB')
