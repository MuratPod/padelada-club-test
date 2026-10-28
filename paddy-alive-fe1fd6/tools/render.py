import sys, os, subprocess, shutil, json
from playwright.sync_api import sync_playwright
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
FPS=24
D={'wave':2.6,'smile':1.9,'look':3.8,'padel-toss':3.5,'padel-serve':3.3,'think':4,'search':5.2,'flip':5,'answer':4,'joy':3}
TITLE={'wave':'Привет-взмах','smile':'Улыбка','look':'Осматривается','padel-toss':'Подбросил мяч','padel-serve':'Подача и удар','think':'Думает','search':'Ищет игру','flip':'Листает','answer':'Отвечает','joy':'Радуется (непрочитанное)'}
KIND={'wave':'покой','smile':'покой','look':'покой','padel-toss':'покой','padel-serve':'покой','think':'занят','search':'занят','flip':'занят','answer':'занят','joy':'удержание'}
TMP='/tmp/paddy_frames'
def ff(args): subprocess.run(['ffmpeg','-y','-loglevel','error']+args,check=True)
def main(what):
    os.makedirs(f'{ROOT}/video/gif',exist_ok=True); os.makedirs(f'{ROOT}/png',exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=b.new_page(viewport={'width':680,'height':440})
        if 'story' in what:
            pg2=b.new_page(viewport={'width':1700,'height':900}); pg2.goto(f'file://{ROOT}/storyboards.html'); pg2.wait_for_timeout(500)
            for k in D: pg2.locator(f'#sb-{k}').screenshot(path=f'{ROOT}/png/storyboard-{k}.png')
        if 'clips' in what:
            pg.goto(f'file://{ROOT}/index.html?view=clip'); pg.wait_for_timeout(300); pg.evaluate('__ui.freeze()')
            for k,d in D.items():
                shutil.rmtree(TMP,ignore_errors=True); os.makedirs(TMP)
                n=int(d*FPS)
                for i in range(n):
                    t=i/FPS; pg.evaluate('([k,t,a,b])=>{__ui.showFrame(k,t);__ui.setOverlay(a,b)}',[k,t,TITLE[k],f'{KIND[k]} · t = {t:.1f} с']); pg.screenshot(path=f'{TMP}/f{i:04d}.png')
                ff(['-framerate',str(FPS),'-i',f'{TMP}/f%04d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{ROOT}/video/clip-{k}.mp4'])
                ff(['-framerate',str(FPS),'-i',f'{TMP}/f%04d.png','-vf','fps=16,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4',f'{ROOT}/video/gif/{k}.gif'])
                print('clip',k,n)
            lst=f'{TMP}/list.txt'; open(lst,'w').write(''.join(f"file '{ROOT}/video/clip-{k}.mp4'\n" for k in D))
            ff(['-f','concat','-safe','0','-i',lst,'-c','copy',f'{ROOT}/video/paddy-alive-reel.mp4'])
            for k in D: os.remove(f'{ROOT}/video/clip-{k}.mp4')
        if 'auto' in what:
            pg.goto(f'file://{ROOT}/index.html?view=clip&seed=11'); pg.wait_for_timeout(300); pg.evaluate('__ui.freeze()')
            shutil.rmtree(TMP,ignore_errors=True); os.makedirs(TMP)
            script=[(16,'think'),(21.5,'search'),(27,'flip'),(32,'answer'),(37.5,None)]; total=46; si=0; log=[]
            for i in range(int(total*FPS)):
                t=i/FPS
                if si<len(script) and t>=script[si][0]:
                    pg.evaluate('(k)=>__ui.setBusy(k)',script[si][1]); log.append((round(t,1),script[si][1])); si+=1
                r=pg.evaluate('(dt)=>__ui.brainStep(dt)',1/FPS)
                if r['mode']=='busy': a,bt='Занят: '+TITLE[r['busy']],'авто-режим · t = %.0f с'%t
                else:
                    a=' + '.join(TITLE[x] for x in r['act']) or 'Покой'; bt='покой (авто-жесты) · t = %.0f с'%t
                pg.evaluate('([a,b])=>__ui.setOverlay(a,b)',[a,bt]); pg.screenshot(path=f'{TMP}/f{i:04d}.png')
            ff(['-framerate',str(FPS),'-i',f'{TMP}/f%04d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','22',f'{ROOT}/video/paddy-alive-auto.mp4'])
            print('auto script',log)
        b.close()
    shutil.rmtree(TMP,ignore_errors=True)
main(sys.argv[1:] or ['story','clips','auto'])
