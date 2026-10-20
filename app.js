/* SEK Legacy Services — shared production behaviour */
(() => {
  const cfg = window.SEK_CONFIG || {};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  document.documentElement.dataset.js = 'true';
  const year = new Date().getFullYear();
  $$('[data-current-year]').forEach(el => el.textContent = year);
  $$('[data-sek-phone]').forEach(el => {
    el.textContent = el.dataset.sekPhoneLabel === 'false' ? (cfg.phoneDisplay || 'Phone unavailable') : `Phone: ${cfg.phoneDisplay || 'Not provided'}`;
    el.href = cfg.phoneTel ? `tel:${cfg.phoneTel}` : '#';
  });
  $$('[data-sek-email]').forEach(el => { el.textContent = `Email: ${cfg.email || ''}`; el.href = cfg.email ? `mailto:${cfg.email}` : '#'; });
  $$('[data-sek-hours]').forEach(el => el.textContent = cfg.hours || '');
  $$('[data-sek-social]').forEach(el => { const url = cfg.social?.[el.dataset.sekSocial]; if(url) { el.href=url; el.target='_blank'; el.rel='noopener noreferrer'; } else el.hidden=true; });
  const wa = $('#whatsappLink'); if(wa && cfg.whatsapp){ wa.href=`https://wa.me/${cfg.whatsapp.replace(/\D/g,'')}`; wa.hidden=false; }

  const toggle = $('.menu-toggle'), mobile = $('.mobile-nav');
  if(toggle && mobile){ toggle.setAttribute('aria-expanded','false'); toggle.addEventListener('click',()=>{ const open=mobile.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); }); $$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false')})); }

  const current = location.pathname.split('/').pop() || 'index.html';
  $$('a[data-nav]').forEach(a => { if(a.getAttribute('href')?.split('#')[0] === current) a.setAttribute('aria-current','page'); });

  const reveal = $$('.reveal');
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){ const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}); reveal.forEach(e=>io.observe(e)); } else reveal.forEach(e=>e.classList.add('in'));

  const setSubmitting = (form, busy) => { const b=form.querySelector('button[type=submit]'); if(!b)return; if(busy){b.disabled=true;b.dataset.original=b.textContent;b.textContent='Sending…'} else {b.disabled=false;b.textContent=b.dataset.original||'Submit'} };
  window.SEK = { $, $$, setSubmitting };
})();
