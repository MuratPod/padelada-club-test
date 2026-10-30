/* Упрощённый Paddy в духе ботиков Grok Bot: одна мягкая форма, маленькое лицо, без обводки и перфорации.
   Группы для живой анимации 107 (только matrix/opacity у G, d не анимируется) помечены data-g. */
let _su=0;
const SIL='M200 44 C268 44 318 98 318 166 C318 226 276 266 224 278 L176 278 C124 266 82 226 82 166 C82 98 132 44 200 44 Z'; // овальная дека с мягким горлом
function simpleSVG(o={}){
 const v=o.v||'A', dark=o.theme==='dark', pose=o.pose||'idle', u='s'+(++_su), head=!!o.head;
 const INK=dark?'#1C0E2E':'#24123A';
 const C={A:{deck:'#FF8A73',handle:'#F27360'},B:{deck:'#FF9A6E',handle:'#EE7A55'},C:{deck:`url(#${u}g)`,handle:'#E9744F'},D:{deck:`url(#${u}g)`,handle:'#E9744F'}}[v];
 const capsule=v==='C'||v==='D';
 const eyeY=v==='A'?168:164, ex=[172,228];
 const eyes=pose==='joy'
  ? `<path d="M${ex[0]-14} ${eyeY+6} Q${ex[0]} ${eyeY-12} ${ex[0]+14} ${eyeY+6} M${ex[1]-14} ${eyeY+6} Q${ex[1]} ${eyeY-12} ${ex[1]+14} ${eyeY+6}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`
  : ex.map(x=>capsule?`<rect x="${x-9}" y="${eyeY-18}" width="18" height="36" rx="9" fill="${INK}"/>`:`<circle cx="${x}" cy="${eyeY}" r="12" fill="${INK}"/>`).join('')
    +(v!=='A'?ex.map(x=>`<circle cx="${x+3}" cy="${eyeY-(capsule?9:5)}" r="${capsule?3.6:3.4}" fill="#fff" opacity=".9"/>`).join(''):'');
 const smile=v==='A'?'':(pose==='joy'
  ? `<path d="M186 198 Q200 218 214 198 Z" fill="${INK}"/>`
  : `<path d="M190 200 Q200 209 210 200" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`);
 const blush=v==='A'?'':`<g data-g="blush" opacity="${pose==='joy'?.75:.45}"><ellipse cx="146" cy="196" rx="15" ry="9" fill="#FF5E7A"/><ellipse cx="254" cy="196" rx="15" ry="9" fill="#FF5E7A"/></g>`;
 const shine=v==='A'?'':`<g data-layer="static"><path d="M128 120 C138 92 160 74 188 68" fill="none" stroke="#fff" stroke-width="${v==='B'?10:14}" stroke-linecap="round" opacity="${v==='B'?.45:.55}"/>${v!=='B'?'<circle cx="122" cy="146" r="6" fill="#fff" opacity=".5"/>':''}</g>`;
 const spots=v==='C'?`<g data-layer="static" fill="#FFF1EA" opacity=".28"><circle cx="200" cy="92" r="11"/><circle cx="256" cy="112" r="9"/><circle cx="276" cy="160" r="8"/></g>`:'';
 const shade=(v==='C'||v==='D')?`<path d="M300 196 C288 236 258 262 222 274" fill="none" stroke="#C94A3A" stroke-width="16" stroke-linecap="round" opacity=".18" data-layer="static"/>`:'';
 const defs=`<defs><radialGradient id="${u}g" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#FFB68A"/><stop offset=".55" stop-color="#FF8B6A"/><stop offset="1" stop-color="#F0695A"/></radialGradient>
  <radialGradient id="${u}f" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${dark?'#000':'#7A2814'}" stop-opacity="${dark?.5:.18}"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>`;
 const think=pose==='think'?`<g data-g="think">${[0,1,2].map(i=>`<circle cx="${262+i*22}" cy="${70-i*14}" r="${7+i*2}" fill="${dark?'#FFF1EA':'#24123A'}" opacity="${.35+i*.25}"/>`).join('')}</g>`:'';
 const face=`<g data-g="eyes">${eyes}</g><g data-g="mouth">${smile}</g>${blush}`;
 const deck=`<g data-g="deck"><path d="${SIL}" fill="${C.deck}"/>${shade}${spots}${shine}${face}</g>`;
 if(head){ // вариант D: только лицо в круге; фон задаёт контейнер
   return `<svg viewBox="${o.vb||'70 40 260 260'}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%">${defs}${deck}</svg>`;}
 // ручка: A — короткая ручка, B/C — «ножка» с мягким расширением
 const handle=v==='A'?`<rect x="178" y="262" width="44" height="66" rx="18" fill="${C.handle}"/>`
  :`<path d="M178 262 H222 V314 C222 326 238 330 238 340 C238 350 162 350 162 340 C162 330 178 326 178 314 Z" fill="#FFB347"/><path d="M178 262 H222 V280 H178 Z" fill="${C.handle}"/>`;
 const hands=v==='C'?(pose==='joy'
   ?`<g data-g="handL"><circle cx="76" cy="150" r="17" fill="#FF9A76"/></g><g data-g="handR"><circle cx="324" cy="150" r="17" fill="#FF9A76"/></g>`
   :`<g data-g="handL"><circle cx="78" cy="220" r="16" fill="#FF9A76"/></g><g data-g="handR"><circle cx="322" cy="220" r="16" fill="#FF9A76"/></g>`):'';
 const ball=o.ball?`<g data-g="ball"><circle cx="336" cy="330" r="22" fill="#D7F05A"/><path d="M322 314 Q338 330 322 346 M350 314 Q334 330 350 346" fill="none" stroke="#fff" stroke-width="3.5" opacity=".9"/></g>`:'';
 const lift=pose==='joy'?'translate(0 -14)':'';
 return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;overflow:visible">${defs}<g data-g="shadow"><ellipse cx="200" cy="356" rx="${pose==='joy'?66:78}" ry="11" fill="url(#${u}f)"/></g><g data-g="body" transform="${lift}"><g data-g="handle">${handle}</g>${hands}${deck}</g>${think}${ball}</svg>`;
}
window.simpleSVG=simpleSVG;
