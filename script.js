// Mobile menu & Nav
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Scroll Reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Dynamic Year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Fitur Load More di Halaman Galeri (galeri.html)
const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const allLoadedMsg = document.getElementById('all-loaded-msg');

if (galleryGrid && loadMoreBtn) {
  // Seluruh 41 foto lanjutan (karya-10 s/d karya-50) dari total 50 foto
  const additionalImages = Array.from({ length: 41 }, (_, i) => {
    const num = String(i + 10).padStart(2, '0');
    return `assets/karya-${num}.jpg`;
  });

  let currentIndex = 0;
  const itemsPerBatch = 6;

  function createCardElement(imgSrc) {
    const article = document.createElement('article');
    article.className = 'gallery-card loaded';
    article.innerHTML = `
      <div class="gallery-img-wrap">
        <img src="${imgSrc}" alt="Karya Karikatur Karikaria" loading="lazy" />
      </div>
    `;
    return article;
  }

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      const nextBatch = additionalImages.slice(currentIndex, currentIndex + itemsPerBatch);
      nextBatch.forEach(src => {
        const card = createCardElement(src);
        galleryGrid.appendChild(card);
      });

      currentIndex += itemsPerBatch;
      loadMoreBtn.classList.remove('loading');
      loadMoreBtn.disabled = false;

      if (currentIndex >= additionalImages.length) {
        loadMoreBtn.style.display = 'none';
        if (allLoadedMsg) allLoadedMsg.style.display = 'block';
      }
    }, 350);
  });
}
