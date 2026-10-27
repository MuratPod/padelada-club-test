#!/usr/bin/env python3
"""Кадры: png/ (2x) и jpg/ (780 px). Имена: tab5-{17|se}-{lang}-{screen}[-dark]. Плюс листы: tab5-bars-{17|se}-{light|dark} (крупные планы панели, 5 активных вкладок) и tab5-sheet-{light|dark}."""
import pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
import sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from states import SCREENS
R=pathlib.Path(__file__).resolve().parent.parent; PNG=R/'png'; JPG=R/'jpg'; PNG.mkdir(exist_ok=True); JPG.mkdir(exist_ok=True)
DEV={'17':(393,852),'se':(375,667)}
jobs=[]
for th in ('light','dark'):
    for d in DEV:
        for sc in SCREENS: jobs.append((d,'ru',th,sc))
    for lg in ('es','ca','en','uk'):
        for sc in ('clubs-feed','clubs-empty','chats'): jobs.append(('17',lg,th,sc))
        jobs.append(('se',lg,th,'clubs-feed'))
nm=lambda d,lg,th,sc:f'tab5-{d}-{lg}-{sc}'+('-dark' if th=='dark' else '')
def save(f):
    im=Image.open(f).convert('RGB'); im=im.resize((780,int(im.height*780/im.width)),Image.LANCZOS); im.save(JPG/(f.stem+'.jpg'),quality=88)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pgs={}
    for d,(w,h) in DEV.items():
        pg=b.new_context(viewport={'width':w,'height':h},device_scale_factor=2).new_page(); pg.goto((R/'index.html').as_uri()+'?bare=1'); pg.wait_for_function('window.__ready===true && window.__fonts===true')
        pg.add_style_tag(content='*{animation:none!important}'); pgs[d]=pg
    def view(pg,sid,st,lg,th): 
        pg.evaluate('()=>{S.cv.unread=false}'); pg.evaluate('o=>window.setView(o)',{'screen':sid,'state':st,'lang':lg,'theme':th}); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(250)
    for d,lg,th,sc in jobs:
        f=PNG/(nm(d,lg,th,sc)+'.png')
        sid,st=SCREENS[sc]; pg=pgs[d]; view(pg,sid,st,lg,th)
        pg.screenshot(path=str(f)); save(f)
    # крупные планы панели: 5 вкладок × активная, нижние 120 pt
    for d,(w,h) in DEV.items():
        for th in ('light','dark'):
            pg=pgs[d]; strips=[]
            for sc in ('home','matches','chats','clubs-feed','profile'):
                sid,st=SCREENS[sc]; view(pg,sid,st,'ru',th); t=f'/tmp/_s_{d}_{th}_{sc}.png'
                pg.screenshot(path=t,clip={'x':0,'y':h-124,'width':w,'height':124}); strips.append(Image.open(t).convert('RGB'))
            o=Image.new('RGB',(strips[0].width,sum(s.height for s in strips)))
            y=0
            for s in strips: o.paste(s,(0,y)); y+=s.height
            f=PNG/f'tab5-bars-{d}-{th}.png'; o.save(f); save(f)
    # лист размеров
    for th in ('light','dark'):
        pg=b.new_context(viewport={'width':430,'height':2600},device_scale_factor=1.5).new_page(); pg.goto((R/'index.html').as_uri()+'?bare=1'); pg.wait_for_function('window.__ready===true && window.__fonts===true')
        pg.add_style_tag(content='*{animation:none!important}'); view(pg,'64','spec','ru',th)
        f=PNG/f'tab5-sheet-{th}.png'; pg.screenshot(path=str(f)); save(f)
    b.close()
import glob,os
for t in glob.glob('/tmp/_s_*.png'): os.remove(t)
print('rendered',len(jobs))
