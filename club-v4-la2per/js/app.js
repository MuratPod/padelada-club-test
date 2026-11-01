function toast(t){const e=document.getElementById('toast');e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2600)}
document.addEventListener('change',e=>{if(e.target.matches('.lang')&&e.target.value!=='es'){toast('Idioma '+e.target.value.toUpperCase()+': lo prepara Sites (ru/uk en «ты»)');e.target.value='es'}});
document.addEventListener('click',e=>{const b=e.target.closest('.tabs button');if(b){document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id===b.dataset.p));history.replaceState(0,'','#'+b.dataset.p)}});
window.addEventListener('load',()=>{const h=location.hash.slice(1);const b=document.querySelector('.tabs button[data-p="'+h+'"]');if(b)b.click()});
function worldSubmit(f){f.classList.add('hidden');document.getElementById('ok').classList.remove('hidden');toast('Solicitud enviada');return false}
function duties(){const all=[...document.querySelectorAll('.check input')].every(i=>i.checked);document.getElementById('acc').disabled=!all;document.getElementById('acc').style.opacity=all?1:.4}
function accept(){localStorage.setItem('fundador','1');location.href='cabina.html#miembros'}
window.addEventListener('hashchange',()=>{const b=document.querySelector('.tabs button[data-p="'+location.hash.slice(1)+'"]');if(b)b.click()});
