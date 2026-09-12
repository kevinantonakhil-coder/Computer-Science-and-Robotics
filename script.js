const photos=[
 {file:'WhatsApp Image 2026-09-11 at 4.13.56 PM.jpeg',cat:'stem',label:'Scratch / First steps'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.56 PM (1).jpeg',cat:'computer-science',label:'Creative coding'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.56 PM (2).jpeg',cat:'computer-science',label:'Collaborative making'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.56 PM (3).jpeg',cat:'stem',label:'Build together'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.57 PM.jpeg',cat:'computer-science',label:'Digital storytelling'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.57 PM (1).jpeg',cat:'computer-science',label:'Interface design'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.57 PM (2).jpeg',cat:'computer-science',label:'Code in context'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.57 PM (3).jpeg',cat:'computer-science',label:'Prototype review'},
 {file:'WhatsApp Image 2026-09-11 at 4.13.57 PM (4).jpeg',cat:'computer-science',label:'Ideas on screen'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.55 PM.jpeg',cat:'computer-science',label:'Peer learning'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.55 PM (1).jpeg',cat:'stem',label:'Design challenge'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.57 PM.jpeg',cat:'stem',label:'Learning by making'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.57 PM (1).jpeg',cat:'stem',label:'Test and iterate'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.59 PM.jpeg',cat:'computer-science',label:'Digital fluency'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.59 PM (1).jpeg',cat:'computer-science',label:'A closer look'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.59 PM (2).jpeg',cat:'computer-science',label:'Debugging together'},
 {file:'WhatsApp Image 2026-09-11 at 4.15.59 PM (3).jpeg',cat:'computer-science',label:'Hands-on code'},
 {file:'WhatsApp Image 2026-09-11 at 4.16.00 PM (1).jpeg',cat:'robotics',label:'Electronics lab'},
 {file:'WhatsApp Image 2026-09-11 at 4.16.00 PM (2).jpeg',cat:'robotics',label:'Build and connect'},
 {file:'WhatsApp Image 2026-09-11 at 4.16.00 PM (3).jpeg',cat:'robotics',label:'Team engineering'}
];
window.addEventListener('load',()=>{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('opening-active');setTimeout(()=>document.body.classList.remove('opening-active'),4300)}});
const mediaPath=file=>'media/'+encodeURIComponent(file);
const tile=(item,index)=>`<button class="gallery-tile" data-index="${index}" aria-label="Open ${item.label}"><img loading="lazy" src="${mediaPath(item.file)}" alt="${item.label}"><span class="tile-label">${item.label}</span></button>`;
const robotics=document.querySelector('#robotics-gallery');
const roboticsItems=photos.filter(p=>p.cat==='robotics'||p.cat==='stem').slice(0,4);
robotics.innerHTML=roboticsItems.map(item=>tile(item,photos.indexOf(item))).join('');
const grid=document.querySelector('#gallery-grid');
function render(filter='all'){const items=filter==='all'?photos:photos.filter(p=>p.cat===filter);grid.innerHTML=items.map(item=>tile(item,photos.indexOf(item))).join('');grid.querySelectorAll('.gallery-tile').forEach(btn=>btn.addEventListener('click',()=>openLightbox(Number(btn.dataset.index))));}
render();
document.querySelectorAll('.filter-bar button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter-bar .active').classList.remove('active');button.classList.add('active');render(button.dataset.filter)}));
const lightbox=document.querySelector('#lightbox'),lightboxImg=lightbox.querySelector('img'),caption=lightbox.querySelector('figcaption');let activeIndex=0;
function openLightbox(index){activeIndex=index;const item=photos[index];lightboxImg.src=mediaPath(item.file);lightboxImg.alt=item.label;caption.textContent=item.label;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function step(dir){activeIndex=(activeIndex+dir+photos.length)%photos.length;openLightbox(activeIndex)}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>step(-1));lightbox.querySelector('.lightbox-next').addEventListener('click',()=>step(1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
const header=document.querySelector('.site-header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>25),{passive:true});
document.querySelectorAll('a[href="#top"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'',window.location.pathname+window.location.search)}));
const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.mobile-menu');toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();e.target.reset();e.target.querySelector('.form-status').textContent='Thanks — your enquiry is ready for the school team.'});
