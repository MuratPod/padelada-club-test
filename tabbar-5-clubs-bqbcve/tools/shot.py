import sys,pathlib,json
from playwright.sync_api import sync_playwright
R=pathlib.Path(__file__).resolve().parent.parent
W,H,scr,st,lg,th,out=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7]
extra=sys.argv[8] if len(sys.argv)>8 else ''
var=sys.argv[9] if len(sys.argv)>9 else None
sc=sys.argv[10] if len(sys.argv)>10 else None
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_context(viewport={'width':W,'height':H},device_scale_factor=3).new_page()
    pg.goto((R/'index.html').as_uri()+'?bare=1'+extra); pg.wait_for_function('window.__ready===true && window.__fonts===true')
    pg.evaluate('o=>window.setView(o)',{'screen':scr,'state':st,'lang':lg,'theme':th,'variant':var,'scroll':sc}); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(150)
    pg.screenshot(path=out); b.close()
