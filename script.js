/* =============================
   EDITABLE PORTFOLIO SETTINGS
   Change ONLY these values when needed.
   ============================= */
const CONFIG={
  whatsapp:'94755571232',
  email:'your@email.com',
  instagram:'https://instagram.com/yourusername',
  youtube:'https://youtube.com/@yourusername',
  facebook:'https://facebook.com/yourusername',
  tiktok:'https://tiktok.com/@yourusername'
};

const dynamicStyle=document.createElement('style');
dynamicStyle.textContent=`
  .heroTitle .typingLine:first-child{color:#fff!important}
  .heroTitle .typingLine.accent{color:#9b63ff!important}
  .heroTitle .typingLine:after{background:#9b63ff}
  .nav nav a{cursor:pointer}
  .nav nav a:hover{transform:translateY(-1px)}

  .aboutImg{max-height:none!important;aspect-ratio:auto!important}
  .aboutImg img{width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;object-position:center top!important;transform:none!important}
  .socialIcon{font-size:9px!important;opacity:.9}
  .projectMedia.emptyProject{transition:transform .45s ease,background .45s ease}
  .project:hover .projectMedia.emptyProject{transform:scale(1.01)}
  .service,.expertiseCard,.project,.process>div,.toolCloud span,.tools span{will-change:transform}

  /* HERO LOCK: typing text must NEVER resize/reflow the image column. */
  .hero{
    align-items:start!important;
    grid-template-columns:minmax(0,1fr) minmax(0,.9fr)!important;
  }
  .heroCopy{min-width:0!important;width:100%!important}
  .heroTitle{
    height:1.88em!important;
    min-height:1.88em!important;
    overflow:visible!important;
    max-width:100%!important;
  }
  .typingLine{
    display:inline-block!important;
    white-space:nowrap!important;
    max-width:100%!important;
  }
  .heroVisual{
    align-self:start!important;
    height:650px!important;
    min-height:650px!important;
    min-width:0!important;
  }
  .heroVisual .portrait{flex:none!important}

  /* Keep the two hero lines inside their own column at all desktop widths. */
  @media(min-width:851px){
    .heroTitle{font-size:clamp(50px,5.45vw,82px)!important}
  }
  @media(max-width:850px){
    .hero{grid-template-columns:minmax(0,1fr)!important}
    .heroVisual{height:540px!important;min-height:540px!important}
  }
  @media(max-width:560px){
    .heroVisual{height:500px!important;min-height:500px!important}
    .heroTitle{font-size:clamp(42px,13vw,60px)!important}
  }
`;
document.head.appendChild(dynamicStyle);

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

window.addEventListener('load',()=>{
  setTimeout(()=>document.querySelector('.pageLoader')?.classList.add('done'),850);
  startTyping();
});

/* First line types once in white. Second line types + deletes continuously in purple. */
function startTyping(){
  const title=document.querySelector('.heroTitle');
  const first=document.querySelector('.typingLine:first-child');
  const second=document.querySelector('.typingLine.accent');
  if(!title||!first||!second)return;

  const firstText=first.dataset.typing||'I make videos';
  const secondText=second.dataset.typing||'worth watching.';
  const typeSpeed=62;
  const deleteSpeed=42;

  first.textContent='';
  second.textContent='';
  title.classList.remove('typingDone');

  let i=0;
  const typeFirst=()=>{
    if(i<firstText.length){
      first.textContent=firstText.slice(0,i+1);
      i++;
      setTimeout(typeFirst,typeSpeed);
    }else setTimeout(typeSecond,220);
  };

  let j=0;
  let deleting=false;
  const typeSecond=()=>{
    if(!deleting){
      second.textContent=secondText.slice(0,j+1);
      j++;
      if(j<secondText.length)setTimeout(typeSecond,typeSpeed);
      else setTimeout(()=>{deleting=true;typeSecond()},1100);
    }else{
      second.textContent=secondText.slice(0,j-1);
      j--;
      if(j>0)setTimeout(typeSecond,deleteSpeed);
      else{deleting=false;setTimeout(typeSecond,300)}
    }
  };

  setTimeout(typeFirst,350);
}

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

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

document.querySelectorAll('.services .service,.expertiseGrid .expertiseCard,.process>div,.workGrid .project').forEach((el,i)=>{
  el.style.transitionDelay=Math.min(i*70,420)+'ms';
});

const glow=document.querySelector('.cursorGlow');
window.addEventListener('pointermove',e=>{
  if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}
});

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

navLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    navLinks.forEach(item=>item.classList.remove('active'));
    link.classList.add('active');
  });
});
