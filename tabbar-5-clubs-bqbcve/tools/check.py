#!/usr/bin/env python3
"""Проверка вёрстки (tabbar-5-clubs-v1): ширины 375/393/430 (+360), все экраны × состояния × темы × языки.
Ищет: горизонтальный скролл, элементы за краем, обрезанный текст, тап-цели < 48, перекрытия подписей панели, обрезку подписей, положение линзы «Чаты» (64×52), выход подписей за ячейку."""
import argparse, pathlib, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent)); from states import SCREENS
R = pathlib.Path(__file__).resolve().parent.parent
ap=argparse.ArgumentParser(); ap.add_argument('--widths',default='360,375,393,430'); a=ap.parse_args()
LANGS=['es','ca','en','ru','uk']
JS=r"""()=>{const out=[];const W=document.documentElement.clientWidth;const app=document.getElementById('app');
 const nm=e=>{let s=e.tagName.toLowerCase();if(e.className&&typeof e.className==='string')s+='.'+e.className.trim().split(/\s+/).join('.');return s+' «'+(e.textContent||'').trim().slice(0,24)+'»'};
 if(document.documentElement.scrollWidth>W) out.push('H-SCROLL doc');
 const scr=app.querySelector('.scr');if(scr&&scr.scrollWidth>scr.clientWidth) out.push('H-SCROLL .scr');
 app.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return;if(e.closest('svg')&&e.tagName!=='svg')return;
  if(r.right>W+.5||r.left<-.5) out.push('OFFSCREEN '+nm(e)+' '+r.left.toFixed(0)+'..'+r.right.toFixed(0));
  const cs=getComputedStyle(e);
  if((cs.overflow==='hidden'||cs.overflowX==='hidden')&&e.scrollWidth>e.clientWidth+1&&!e.classList.contains('app')&&!e.classList.contains('phone')) out.push('CLIP-X '+nm(e)+' '+e.scrollWidth+'>'+e.clientWidth);
  if(e.matches('button,.tab,.circ,.pill,[data-act]')&&!e.closest('.pdemo')&&!e.matches('.demo-btn,.cdot,.nd')&&(r.height<47.5||r.width<47.5)) out.push('TAP<48 '+nm(e)+' '+r.width.toFixed(1)+'x'+r.height.toFixed(1));
 });
 const nav=app.querySelector('.tabs.glass');if(nav){const n=nav.getBoundingClientRect();const tabs=[...nav.querySelectorAll('.tab')];
  if(tabs.length!==5) out.push('TABS count '+tabs.length);
  if(nav.querySelector('.pdx')) out.push('PADDY button still in bar');
  if(Math.abs(n.height-72)>.5) out.push('BAR height '+n.height);
  let prev=-1e9;tabs.forEach((c,i)=>{const sp=c.querySelector('span');const rg=document.createRange();rg.selectNodeContents(sp);const t=rg.getBoundingClientRect();const cr=c.getBoundingClientRect();
   if(sp.scrollWidth>sp.clientWidth+.5) out.push('LABEL clipped '+sp.textContent);
   if(t.left<cr.left+3.9||t.right>cr.right-3.9) out.push('LABEL near cell edge '+sp.textContent+' '+(t.left-cr.left).toFixed(1)+'/'+(cr.right-t.right).toFixed(1));
   if(t.height>15) out.push('LABEL wraps '+sp.textContent);
   if(t.left<prev+8) out.push('LABELS too close '+sp.textContent);prev=t.right;
   if(i===2){if(Math.abs(cr.width-68)>.6||Math.abs(cr.height-72)>.5) out.push('CENTER cell '+cr.width+'x'+cr.height);
     const cl=getComputedStyle(c,'::before');if(parseFloat(cl.width)!==64||parseFloat(cl.height)!==52) out.push('LENS size '+cl.width+' '+cl.height);}
   else if(Math.abs(cr.width-68)<.5&&false) {}
  });
  const tb=app.querySelectorAll('.tabs');if(tb.length>1) out.push('several bars');
  if(n.bottom>window.innerHeight+.5) out.push('BAR below viewport');
  const exp=document.body.classList.contains('dse')?12:20;if(Math.abs(window.innerHeight-n.bottom-exp)>.5) out.push('BAR bottom '+(window.innerHeight-n.bottom));
 } else out.push('NO BAR');
 return out;}"""
bad=0; total=0
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for w in [int(x) for x in a.widths.split(',')]:
        pg=b.new_context(viewport={'width':w,'height':(667 if w==375 else 852)},device_scale_factor=1).new_page(); pg.goto((R/'index.html').as_uri()+'?bare=1'); pg.wait_for_function('window.__ready===true && window.__fonts===true')
        for sc,(sid,st) in SCREENS.items():
            for th in ('light','dark'):
                for lg in LANGS:
                    pg.evaluate("()=>{S.cv.unread=false}"); pg.evaluate('o=>window.setView(o)',{'screen':sid,'state':st,'lang':lg,'theme':th}); pg.wait_for_timeout(30)
                    res=pg.evaluate(JS); total+=1
                    if res: bad+=1; print(f'[{w}] {sc}/{lg}/{th}:'); [print('   ',r) for r in res[:6]]
        pg.context.close()
    b.close()
print(f'checked {total} views, with problems: {bad}')
sys.exit(1 if bad else 0)
