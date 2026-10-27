#!/usr/bin/env python3
import pathlib
R=pathlib.Path(__file__).resolve().parent.parent
def a(n): return f'<a href="png/{n}.png"><img loading="lazy" src="jpg/{n}.jpg" alt="{n}"><span>{n}</span></a>'
def sec(title,names,cls=''): return f'<h2>{title}</h2><div class="g {cls}">'+''.join(a(n) for n in names if (R/'png'/f'{n}.png').exists())+'</div>'
SC=['home','matches','chats','chats-unread','clubs-feed','clubs-scrolled','clubs-empty','profile']
h='<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Таб-бар на 5 вкладок · Клубы · кадры</title>\n<style>body{font:14px/1.4 system-ui,sans-serif;margin:16px;background:#f4f4f4;color:#111}h1{font-size:20px}h2{font-size:16px;margin:28px 0 8px}.g{display:flex;flex-wrap:wrap;gap:12px}a{display:block;width:240px;color:#333;text-decoration:none}a img{width:100%;border:1px solid #ccc;border-radius:4px;background:#fff}a span{display:block;font-size:11px;word-break:break-all}.w a{width:560px}.nav a{display:inline;width:auto}</style></head><body>'
h+='<h1>Таб-бар на 5 вкладок + экран «Клубы» · build 105</h1><p class="nav"><a href="index.html?s=60&st=feed">Интерактивный макет (Клубы)</a> · <a href="index.html?s=64&st=spec">Лист размеров</a> · <a href="SPEC.md">SPEC.md</a> · <a href="TABBAR-SPEC.md">TABBAR-SPEC.md</a> · <a href="contrast.md">contrast.md</a> · <a href="tabspec-table.md">таблица запасов</a> · <a href="metrics.json">metrics.json</a>. Клик по кадру открывает PNG 2x.</p>'
h+=sec('Панель крупно: 5 вкладок × активная (сверху вниз: Главная, Матчи, Чаты, Клубы, Профиль)',[f'tab5-bars-{d}-{t}' for d in ('17','se') for t in ('light','dark')],'w')
h+=sec('Лист размеров',['tab5-sheet-light','tab5-sheet-dark'],'w')
for d,dn in (('17','iPhone 17 · ru · светлая'),('se','iPhone SE · ru · светлая')): h+=sec(dn,[f'tab5-{d}-ru-{s}' for s in SC])
for d,dn in (('17','iPhone 17 · ru · тёмная'),('se','iPhone SE · ru · тёмная')): h+=sec(dn,[f'tab5-{d}-ru-{s}-dark' for s in SC])
for lg in ('es','ca','en','uk'):
    h+=sec(f'Языки: {lg} (светлая и тёмная; iPhone 17: Клубы, пусто, Чаты; SE: Клубы)',[f'tab5-17-{lg}-{s}{t}' for s in ('clubs-feed','clubs-empty','chats') for t in ('','-dark')]+[f'tab5-se-{lg}-clubs-feed{t}' for t in ('','-dark')])
(R/'gallery.html').write_text(h+'</body></html>')
