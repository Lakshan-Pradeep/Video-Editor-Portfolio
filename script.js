const CONFIG={whatsapp:'947XXXXXXXX',email:'your@email.com',instagram:'https://instagram.com/yourusername',youtube:'https://youtube.com/@yourusername',facebook:'https://facebook.com/yourusername',tiktok:'https://tiktok.com/@yourusername'};
const msg=encodeURIComponent("Hi Lakshan, I found your video editing portfolio and I'd like to discuss a project.");

document.querySelectorAll('[data-wa]').forEach(a=>a.href=`https://wa.me/${CONFIG.whatsapp}?text=${msg}`);
document.querySelectorAll('[data-email]').forEach(a=>a.href=`mailto:${CONFIG.email}`);
const emailText=document.getElementById('emailText');if(emailText)emailText.textContent=CONFIG.email+' ↗';
document.querySelectorAll('[data-social]').forEach(a=>a.href=CONFIG[a.dataset.social]||'#');
document.getElementById('year').textContent=new Date().getFullYear();

window.addEventListener('load',()=>{setTimeout(()=>document.querySelector('.pageLoader')?.classList.add('done'),650)});

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((e,i)=>{e.style.transitionDelay=Math.min(i*45,300)+'ms';io.observe(e)});

const glow=document.querySelector('.cursorGlow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});

// Smooth active navigation state while scrolling.
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav nav a')];
const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>activeObserver.observe(s));
