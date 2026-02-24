/*
  Interactivity for e‑Portfolio:
  - Auto year
  - Lightbox for images (click any img[data-lightbox])
  - Smooth scroll for hash links
  - Optional: mark current nav link
  - Collapsible references are native <details>; no JS required
*/
(function () {
  // Auto year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Mark active nav based on URL
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) a.setAttribute('aria-current','page');
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.pushState(null,'',href);
      }
    });
  });

  // Lightbox
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<img alt="Lightbox image" />';
  document.body.appendChild(overlay);
  const imgEl = overlay.querySelector('img');
  const close = ()=> overlay.classList.remove('show');
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') close(); });
  document.querySelectorAll('img[data-lightbox]').forEach(img=>{
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=>{
      imgEl.src = img.src;
      imgEl.alt = img.alt || 'Preview';
      overlay.classList.add('show');
    });
  });
})(); 

