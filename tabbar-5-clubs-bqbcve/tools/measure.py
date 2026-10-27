#!/usr/bin/env python3
"""Измерение настоящего рендера панели на 5 вкладок: ширины 360..430, 5 языков, обе темы не важны (геометрия). Границы подписей — по Range (advance, без боковых полей глифа, поэтому запас занижен на ≈0,5 pt).
Выход: src/tabspec.json (rows5), tabspec-table.md, metrics.json (геометрия экранов)."""
import json, math, pathlib
from playwright.sync_api import sync_playwright
R = pathlib.Path(__file__).resolve().parent.parent
LANGS=['ru','uk','es','ca','en']; WIDTHS=[360,375,390,393,414,430]
JS="""()=>{const nav=document.querySelector('#app .tabs.glass');const n=nav.getBoundingClientRect();
 const cells=[...nav.querySelectorAll('.tab')];
 const o=cells.map(c=>{const sp=c.querySelector('span');const r=document.createRange();r.selectNodeContents(sp);const t=r.getBoundingClientRect();const cr=c.getBoundingClientRect();const ic=c.querySelector('.i').getBoundingClientRect();
  const cs=getComputedStyle(c,'::before');
  return {txt:sp.textContent,tl:t.left-n.left,tr:t.right-n.left,tw:t.width,cl:cr.left-n.left,cr:cr.right-n.left,ch:cr.height,fs:parseFloat(getComputedStyle(sp).fontSize),lh:parseFloat(getComputedStyle(sp).lineHeight),icw:ic.width,ich:ic.height,lensw:parseFloat(cs.width),lensh:parseFloat(cs.height),lenstop:parseFloat(cs.top),sw:sp.scrollWidth,cw:sp.clientWidth,ttop:t.top-n.top,tbot:t.bottom-n.top}});
 const b=nav.querySelector('.tbd');const br=b?b.getBoundingClientRect():null;
 return {bar:{w:n.width,h:n.height,left:n.left,bottom:window.innerHeight-n.bottom},cells:o,badge:br?[br.width,br.height,br.left-n.left,br.top-n.top]:null}}"""
rows=[]; detail=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for W in WIDTHS:
        H=667 if W==375 else 852
        pg=b.new_context(viewport={'width':W,'height':H},device_scale_factor=1).new_page(); pg.goto((R/'index.html').as_uri()+'?bare=1'); pg.wait_for_function('window.__ready===true && window.__fonts===true')
        agg=dict(cedge=99,gap=99,outl=99)
        for lg in LANGS:
            pg.evaluate('o=>window.setView(o)',{'screen':'60','state':'feed','lang':lg,'theme':'light'}); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(40)
            d=pg.evaluate(JS); bar=d['bar']; cs=d['cells']; Rr=bar['h']/2; base=61
            for i,c in enumerate(cs):
                agg['cedge']=min(agg['cedge'],c['tl']-c['cl'],c['cr']-c['tr'])
                if c['sw']>c['cw']+0.5: agg['cedge']=-99
                if i in (0,4):
                    il,ir=c['tl'],c['tr']; dx=(Rr-il) if i==0 else (ir-(bar['w']-Rr))
                    cl=Rr-math.hypot(max(dx,0),base-Rr) if dx>0 else Rr-abs(base-Rr)
                    agg['outl']=min(agg['outl'],cl)
            for i in range(4): agg['gap']=min(agg['gap'],cs[i+1]['tl']-cs[i]['tr'])
        c0,c2=cs[0],cs[2]
        rows.append(dict(W=W,cell=round(c0['cr']-c0['cl'],2),ctr=f"{c2['cr']-c2['cl']:g}×{c2['ch']:g}",font=f"{int(c0['fs'])}/{int(c0['lh'])}",cedge=round(agg['cedge'],1),gap=round(agg['gap'],1),outl=round(agg['outl'],1),
          margin=round(bar['left'],1),bottom=round(bar['bottom'],1),barw=round(bar['w'],1),tapmin=f"{min(c['cr']-c['cl'] for c in cs):g}×{cs[0]['ch']:g}",lens=[c2['lensw'],c2['lensh'],c2['lenstop']],icon=[c2['icw'],c2['ich']],ilab=[c0['icw'],c0['ich']],lab=[round(c2['ttop'],1),round(c2['tbot'],1)]))
        pg.context.close()
    # бейдж и экранные замеры (iPhone 17)
    pg=b.new_context(viewport={'width':393,'height':852},device_scale_factor=1).new_page(); pg.goto((R/'index.html').as_uri()+'?bare=1'); pg.wait_for_function('window.__ready===true && window.__fonts===true')
    bd={}
    for n_ in (1,15,99):
        pg.evaluate('o=>window.setView(o)',{'screen':'64','state':'spec','lang':'ru','theme':'light'})
        bd[n_]=pg.evaluate("(n)=>{const r=[...document.querySelectorAll('.tbd')].find(e=>e.textContent==String(n));if(!r)return null;const q=r.getBoundingClientRect();return [q.width,q.height]}",n_)
    scr={}
    for dev,(w,h) in {'17':(393,852),'se':(375,667)}.items():
        pg2=b.new_context(viewport={'width':w,'height':h},device_scale_factor=1).new_page(); pg2.goto((R/'index.html').as_uri()+'?bare=1'); pg2.wait_for_function('window.__ready===true && window.__fonts===true')
        s={}
        for lg in ('ru',):
            pg2.evaluate('o=>window.setView(o)',{'screen':'60','state':'feed','lang':lg,'theme':'light'}); pg2.wait_for_timeout(60)
            s['feed']=pg2.evaluate("""()=>{const q=(sel)=>[...document.querySelectorAll(sel)].map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.width*10)/10,Math.round(r.height*10)/10]});
              const hd=document.querySelector('.hdr.kh').getBoundingClientRect();return {hdr:[hd.width,hd.height],acard:q('.acard'),krow:q('.krow'),kav:q('.krow .kav'),av:q('.acard .av'),ksec:q('.ksec'),circ:q('.hdr .circ'),bdg:q('.krow .bdg'),tabs:q('.tabs')}}""")
            pg2.evaluate('o=>window.setView(o)',{'screen':'60','state':'empty','lang':lg,'theme':'light'}); pg2.wait_for_timeout(60)
            s['empty']=pg2.evaluate("""()=>{const q=(sel)=>[...document.querySelectorAll(sel)].map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.width*10)/10,Math.round(r.height*10)/10]});
              return {ke:q('.kemp .ke'),pill:q('.kemp .pill'),krow:q('.krow'),join:q('.krow .join'),h2:q('.kemp h2'),p:q('.kemp p')}}""")
        scr[dev]=s
        pg2.context.close()
    b.close()
json.dump({'rows5':rows,'badge':bd,'screens':scr},open(R/'src/tabspec.json','w'),ensure_ascii=False,indent=1)
json.dump({'rows5':rows,'badge':bd,'screens':scr},open(R/'metrics.json','w'),ensure_ascii=False,indent=1)
md='| W, pt | поля | бар | ячейка | «Чаты» | шрифт | тап (мин.) | до края ячейки | между подписями | до контура капсулы |\n|---|---|---|---|---|---|---|---|---|---|\n'
for r in rows: md+=f"| {r['W']} | {r['margin']:g} | {r['barw']:g} | {r['cell']:g} | {r['ctr']} | {r['font']} | {r['tapmin']} | {r['cedge']:g} | {r['gap']:g} | {r['outl']:g} |\n"
(R/'tabspec-table.md').write_text(md); print(md); print(bd); print(json.dumps(rows[3]))
