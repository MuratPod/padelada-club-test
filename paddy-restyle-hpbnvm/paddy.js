/* Векторный Paddy: те же части и геометрия, что в PoC (viewBox 400, parts.tsx / PaddyRig.tsx).
   Стили = направления. Новые слои помечены data-layer="add" — они статичны и живут ВНУТРИ существующих групп рига
   (кроме тени на полу d1: своя группа, matrix/opacity). Никаких filter и анимации d. */
const OUTER='M200 40 C264 40 314 90 314 150 C314 206 272 230 238 248 L162 248 C128 230 86 206 86 150 C86 90 136 40 200 40 Z';
const INNER='M200 64 C252 64 292 102 292 150 C292 192 260 212 234 226 L166 226 C140 212 108 192 108 150 C108 102 148 64 200 64 Z';
const HOLES=[[112,84],[146,84],[180,84],[214,84],[248,84],[282,84],[129,118],[265,118],[299,118],[112,152],[282,152],[129,186],[299,186],[112,220],[146,220],[180,220],[214,220],[248,220],[282,220]];
const HEADT='translate(200 248) scale(1.1) translate(-200 -248)';
let _uid=0;
function paddySVG(o={}){
 const st=o.style||'flat', dark=o.theme==='dark', head=!!o.head, pose=o.pose||'hello', u='p'+(++_uid);
 const INK='#24123A';
 const S={ // параметры материала
  flat:{ol:INK,olW:7,limb:INK,limbW:12,deck:'#FF5E5B',inner:'#FFF1EA',hole:'#FF5E5B',hand:'#FFFFFF',handOl:INK,eyeOl:INK},
  vol:{ol:'#B9302D',olW:2.5,limb:dark?'#4A2E66':'#3A2152',limbW:12,deck:`url(#${u}gD)`,inner:`url(#${u}gF)`,hole:`url(#${u}gH)`,hand:`url(#${u}gW)`,handOl:'none',eyeOl:'#3A2152'},
  soft:{ol:INK,olW:4,limb:INK,limbW:11,deck:'#FF5E5B',inner:'#FFF1EA',hole:'#FF5E5B',hand:'#FFFFFF',handOl:INK,eyeOl:INK},
  glass:{ol:dark?'rgba(255,255,255,.55)':'rgba(255,255,255,.95)',olW:3,limb:dark?'rgba(255,241,234,.7)':'rgba(58,33,82,.5)',limbW:12,deck:dark?'rgba(255,120,100,.42)':'rgba(255,120,100,.22)',inner:dark?'rgba(255,241,234,.80)':'rgba(255,255,255,.62)',hole:dark?'rgba(255,255,255,.22)':'rgba(255,94,91,.30)',hand:'rgba(255,255,255,.7)',handOl:'rgba(255,255,255,.95)',eyeOl:INK}
 }[st];
 const add=(s)=>`<g data-layer="add">${s}</g>`;
 const defs=`<defs><clipPath id="${u}k"><path d="${INNER}"/></clipPath><clipPath id="${u}o"><path d="${OUTER}"/></clipPath>
  <linearGradient id="${u}gD" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#FF8A78"/><stop offset=".45" stop-color="#FF5E5B"/><stop offset="1" stop-color="#D63E3C"/></linearGradient>
  <radialGradient id="${u}gF" cx=".42" cy=".35" r=".75"><stop offset="0" stop-color="#FFFBF7"/><stop offset=".7" stop-color="#FFEDE3"/><stop offset="1" stop-color="#F6D4C4"/></radialGradient>
  <radialGradient id="${u}gH" cx=".42" cy=".38" r=".6"><stop offset="0" stop-color="#9E2A28"/><stop offset=".75" stop-color="#C9403D"/><stop offset="1" stop-color="#F08A7E"/></radialGradient>
  <radialGradient id="${u}gW" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EBDDD6"/></radialGradient>
  <radialGradient id="${u}gE" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".8" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E9DCE3"/></radialGradient>
  <radialGradient id="${u}gB" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFD27A"/><stop offset=".6" stop-color="#FFA62B"/><stop offset="1" stop-color="#E0861A"/></radialGradient>
  <linearGradient id="${u}gS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7C70"/><stop offset="1" stop-color="#D9443F"/></linearGradient>
  <radialGradient id="${u}gFl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${dark?'#000':'#7A2814'}" stop-opacity="${dark?'.55':'.22'}"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
 </defs>`;
 const P=(d,f,s,w,x='')=>`<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${x}/>`;
 const limb=(d)=>P(d,'none',S.limb,S.limbW)+(st==='vol'?add(P(d,'none','rgba(255,255,255,.28)',3.5,'transform="translate(-2.2 -2.6)"')):'')+(st==='glass'?add(P(d,'none','rgba(255,255,255,.9)',3,'transform="translate(-2 -2)"')):'');
 const hand=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="14" fill="${S.hand}" stroke="${S.handOl}" stroke-width="${st==='vol'?0:4}"/>`+(st==='vol'?add(`<circle cx="${cx-4}" cy="${cy-5}" r="4" fill="#fff" opacity=".9"/>`):'');
 // --- голова (группа matHead / matUpper) ---
 const eyes=pose==='joy'
  ? P('M144 155.7 Q166 126 188 155.7','none',INK,7)+P('M212 155.7 Q234 126 256 155.7','none',INK,7)
  : [166,234].map(cx=>`<circle cx="${cx}" cy="148" r="22" fill="${st==='vol'?`url(#${u}gE)`:'#FFFFFF'}" stroke="${S.eyeOl}" stroke-width="${st==='vol'?3.5:5}"/><circle cx="${cx+2}" cy="149" r="11.44" fill="${INK}"/><circle cx="${cx+6}" cy="145" r="3.2" fill="#fff"/>`).join('');
 const mouth=P('M168 194 Q200 222 232 194 Z',INK,INK,5)+'<ellipse cx="200" cy="205.48" rx="13.44" ry="4.2" fill="#FF5E5B"/>';
 let deck=P(OUTER,S.deck,S.ol,S.olW);
 if(st==='vol') deck+=add(`<g clip-path="url(#${u}o)">${P('M104 118 C112 74 152 48 196 46','none','rgba(255,255,255,.75)',9)}${P('M300 170 C296 206 262 230 232 246','none','rgba(120,20,20,.25)',14)}</g>`)+ (dark?add(P('M300 120 C312 160 296 200 262 228','none','rgba(255,181,71,.7)',3)):'');
 if(st==='glass') deck+=add(`<g clip-path="url(#${u}o)">${P('M100 124 C108 76 150 48 198 46','none','rgba(255,255,255,.95)',6)}${P('M296 176 C290 206 262 228 234 244','none','rgba(255,181,71,.7)',4)}</g>`);
 const innerRing=st==='glass'?P(INNER,S.inner,'rgba(255,181,71,.85)',4):P(INNER,S.inner,'#FFA62B',st==='vol'?7:10);
 const innerInk=st==='flat'||st==='soft'?P(INNER,'none',INK,st==='soft'?3:4):'';
 const holes=`<g clip-path="url(#${u}k)">${HOLES.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="${S.hole}"/>`).join('')}${st==='vol'?add(P('M126 100 C150 74 196 68 236 76','none','rgba(255,255,255,.6)',8)):''}</g>`;
 const headG=`<g transform="${HEADT}">${deck}${innerRing}${innerInk}${holes}<g data-g="eyes">${eyes}</g><g data-g="mouth">${mouth}</g></g>`;
 if(head) return `<svg viewBox="${o.vb||'66 14 268 268'}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%">${defs}${headG}</svg>`;
 // --- тело ---
 const armL=pose==='joy'?'M180 260 Q92 262 76 196':'M180 262 Q130 268 122 304', armR=pose==='joy'?'M220 260 Q308 262 324 196':'M220 260 Q318 262 328 204';
 const hL=pose==='joy'?[75,190]:[122,308], hR=pose==='joy'?[325,190]:[329,198];
 const shoe=(cx)=>`<ellipse cx="${cx}" cy="338" rx="25" ry="12" fill="${st==='vol'?`url(#${u}gS)`:st==='glass'?'rgba(255,94,91,.45)':'#FF5E5B'}" stroke="${st==='vol'?'none':st==='glass'?'rgba(255,255,255,.9)':INK}" stroke-width="${st==='flat'?5:3}"/>`+(st==='vol'?add(`<path d="M${cx-22} 343 Q${cx} 352 ${cx+22} 343" fill="none" stroke="#FFF1EA" stroke-width="4" stroke-linecap="round"/><ellipse cx="${cx-6}" cy="332" rx="9" ry="3" fill="#fff" opacity=".55"/>`):'');
 const torso=P('M160 246 L240 246 L218 272 L182 272 Z',S.deck,S.ol,st==='flat'?6:S.olW)+P('M184 252 H216 L200 270 Z',dark&&st==='glass'?'rgba(10,17,36,.6)':(st==='glass'?'rgba(255,255,255,.4)':'#FFF1EA'),S.ol,st==='flat'?4:2)
  +`<rect x="180" y="268" width="40" height="38" rx="12" fill="${st==='vol'?`url(#${u}gB)`:st==='glass'?'rgba(255,166,43,.55)':'#FFA62B'}" stroke="${st==='vol'?'#B9302D':S.ol}" stroke-width="${st==='flat'?6:2.5}"/>`
  +P('M182 282 L218 274 M182 296 L218 288','none',st==='vol'?'#C8761A':(st==='glass'?'rgba(255,255,255,.9)':INK),st==='flat'?4:3)+P('M200 304 Q248 320 236 282','none','#FF5E5B',5);
 const ball=`<circle cx="336" cy="348" r="30" fill="${st==='vol'?`url(#${u}gB)`:st==='glass'?'rgba(255,166,43,.5)':'#FFA62B'}" stroke="${st==='vol'?'none':st==='glass'?'rgba(255,255,255,.9)':INK}" stroke-width="${st==='flat'?5:3}"/>`+P('M319.5 324.0 Q333.0 348 319.5 372.0 M352.5 324.0 Q339.0 348 352.5 372.0','none','#FFF1EA',4)+(st==='vol'?add('<ellipse cx="326" cy="334" rx="8" ry="5" fill="#fff" opacity=".6"/>'):'');
 const floor=st==='vol'?`<g data-g="floor" data-layer="add"><ellipse cx="200" cy="352" rx="92" ry="14" fill="url(#${u}gFl)"/><ellipse cx="336" cy="380" rx="34" ry="7" fill="url(#${u}gFl)"/></g>`:'';
 const waves=pose==='hello'?P('M349 178 Q359 190 349 204 M361 170 Q377 190 363 212','none',st==='glass'?'rgba(255,255,255,.9)':(st==='vol'?S.limb:INK),5):'';
 const sparks=pose==='joy'?[[58,92,16,'#FFA62B'],[350,70,20,'#FF5E5B'],[354,226,12,'#3DDBB0'],[46,200,10,'#FF5E5B']].map(([x,y,r,f])=>`<path transform="translate(${x} ${y})" d="M0 ${-r} Q0 0 ${r} 0 Q0 0 0 ${r} Q0 0 ${-r} 0 Q0 0 0 ${-r} Z" fill="${f}" stroke="${st==='vol'?'none':INK}" stroke-width="4"/>`).join(''):'';
 const lift=pose==='joy'?'translate(0 -8)':'';
 // тёмная тема: «стикерная» обводка как у текущего Paddy — только для flat/soft
 const sticker=dark&&(st==='flat'||st==='soft')?'style="paint-order:stroke"':'';
 return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;overflow:visible" ${sticker}>${defs}${floor}<g transform="${lift}"><g data-g="legL">${limb('M189 302 V328')}${shoe(172)}</g><g data-g="legR">${limb('M211 302 V328')}${shoe(228)}</g><g data-g="armL">${limb(armL)}${hand(...hL)}</g><g data-g="armR">${limb(armR)}${hand(...hR)}${waves}</g><g data-g="body">${torso}</g>${headG}</g>${ball}${sparks}</svg>`;
}
window.paddySVG=paddySVG;
