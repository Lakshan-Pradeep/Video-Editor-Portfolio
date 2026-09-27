const CONFIG={whatsapp:'947XXXXXXXX',email:'your@email.com',instagram:'https://instagram.com/yourusername',youtube:'https://youtube.com/@yourusername',facebook:'https://facebook.com/yourusername',tiktok:'https://tiktok.com/@yourusername'};
const msg=encodeURIComponent("Hi Lakshan, I found your video editing portfolio and I'd like to discuss a project.");

document.querySelectorAll('[data-wa]').forEach(a=>a.href=`https://wa.me/${CONFIG.whatsapp}?text=${msg}`);
document.querySelectorAll('[data-email]').forEach(a=>a.href=`mailto:${CONFIG.email}`);
const emailText=document.getElementById('emailText');if(emailText)emailText.textContent=CONFIG.email+' ↗';
document.querySelectorAll('[data-social]').forEach(a=>a.href=CONFIG[a.dataset.social]||'#');
document.getElementById('year').textContent=new Date().getFullYear();

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));

document.querySelectorAll('video').forEach(v=>{v.addEventListener('loadeddata',()=>{const fallback=v.parentElement.querySelector('.mediaFallback');if(fallback)fallback.style.display='none'});v.addEventListener('error',()=>{v.style.display='none'})});

const glow=document.querySelector('.cursorGlow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
