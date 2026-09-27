/* =============================
   EDITABLE PORTFOLIO SETTINGS
   Change ONLY these values when needed.
   ============================= */
const CONFIG={
  whatsapp:'947XXXXXXXX',
  email:'your@email.com',
  instagram:'https://instagram.com/yourusername',
  youtube:'https://youtube.com/@yourusername',
  facebook:'https://facebook.com/yourusername',
  tiktok:'https://tiktok.com/@yourusername'
};

const msg=encodeURIComponent("Hi Lakshan, I found your video editing portfolio and I'd like to discuss a project.");

document.querySelectorAll('[data-wa]').forEach(a=>{
  a.href=`https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
  a.target='_blank';
  a.rel='noopener';
});
document.querySelectorAll('[data-email]').forEach(a=>a.href=`mailto:${CONFIG.email}`);
const emailText=document.getElementById('emailText');
if(emailText)emailText.textContent=CONFIG.email+' ↗';
document.querySelectorAll('[data-social]').forEach(a=>{
  a.href=CONFIG[a.dataset.social]||'#';
  a.target='_blank';
  a.rel='noopener';
});
const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

/* Page loader: keeps the quick portfolio reveal on every fresh visit. */
window.addEventListener('load',()=>{
  setTimeout(()=>document.querySelector('.pageLoader')?.classList.add('done'),650);
  startTyping();
});

/* Type the large hero headline instead of showing it as static text. */
function startTyping(){
  const title=document.querySelector('.heroTitle');
  const lines=[...document.querySelectorAll('.typingLine')];
  if(!title||!lines.length)return;
  let lineIndex=0;
  let charIndex=0;
  const speed=65;
  const typeNext=()=>{
    const line=lines[lineIndex];
    const text=line.dataset.typing||'';
    if(charIndex<text.length){
      line.textContent=text.slice(0,charIndex+1);
      charIndex++;
      setTimeout(typeNext,speed);
    }else if(lineIndex<lines.length-1){
      lineIndex++;
      charIndex=0;
      setTimeout(typeNext,180);
    }else{
      setTimeout(()=>title.classList.add('typingDone'),500);
    }
  };
  lines.forEach(line=>line.textContent='');
  setTimeout(typeNext,350);
}

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

/* Reveal sections as they enter the viewport. */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((e,i)=>{
  e.style.transitionDelay=Math.min(i*45,300)+'ms';
  io.observe(e);
});

/* Soft cursor glow. */
const glow=document.querySelector('.cursorGlow');
window.addEventListener('pointermove',e=>{
  if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}
});

/* Active navigation: the current section is highlighted while scrolling. */
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav nav a')];
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>activeObserver.observe(s));
