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

// 1. Fitur Load More di Halaman Utama (Section GALERI PILIHAN)
const homeWorkGrid = document.getElementById('home-work-grid');
const homeLoadMoreBtn = document.getElementById('home-load-more');
const homeAllLoadedMsg = document.getElementById('home-all-loaded');

if (homeWorkGrid && homeLoadMoreBtn) {
  const homeExtraItems = [
    {
      img: "assets/assets1.jpg",
      title: "Sweet Anniversary",
      subtitle: "Hadiah hari jadi istimewa",
      num: "04"
    },
    {
      img: "assets/assets3.jpg",
      title: "Graduation Celebration",
      subtitle: "Momen wisuda & gelar baru",
      num: "05"
    },
    {
      img: "assets/assets4.jpg",
      title: "Holiday Memory",
      subtitle: "Kenangan liburan seru",
      num: "06"
    }
  ];

  let homeLoaded = false;

  homeLoadMoreBtn.addEventListener('click', () => {
    if (homeLoaded) return;
    homeLoadMoreBtn.classList.add('loading');
    homeLoadMoreBtn.disabled = true;

    setTimeout(() => {
      homeExtraItems.forEach(item => {
        const article = document.createElement('article');
        article.className = 'work-card reveal visible';
        article.innerHTML = `
          <div class="sample-art">
            <img src="${item.img}" alt="${item.title} — Karikatur Digital" class="sample-image" />
          </div>
          <div class="work-meta">
            <div><b>${item.title}</b><span>${item.subtitle}</span></div>
            <span class="work-number">${item.num}</span>
          </div>
        `;
        homeWorkGrid.appendChild(article);
      });

      homeLoaded = true;
      homeLoadMoreBtn.classList.remove('loading');
      homeLoadMoreBtn.style.display = 'none';
      if (homeAllLoadedMsg) homeAllLoadedMsg.style.display = 'block';
    }, 350);
  });
}

// 2. Fitur Load More di Halaman Galeri (galeri.html)
const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const allLoadedMsg = document.getElementById('all-loaded-msg');

if (galleryGrid && loadMoreBtn) {
  const additionalImages = [
    "assets/assets2.jpg",
    "assets/assets1.jpg",
    "assets/assets4.jpg",
    "assets/assets3.jpg",
    "assets/assets2.jpg",
    "assets/assets1.jpg"
  ];

  let currentIndex = 0;
  const itemsPerBatch = 3;

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
