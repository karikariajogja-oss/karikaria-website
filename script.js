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
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Dynamic Year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Gallery Interactive Features (Filter & Load More)
const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const allLoadedMsg = document.getElementById('all-loaded-msg');

if (galleryGrid && loadMoreBtn) {
  const additionalItems = [
    {
      title: "Dokter & Tenaga Medis",
      desc: "Karikatur profesi kesehatan berkarakter khas",
      tag: "Profesi",
      category: "career",
      img: "assets/assets2.jpg"
    },
    {
      title: "Sunset Romantic Walk",
      desc: "Suasana romantis senja berdua bersama pasangan",
      tag: "Couple",
      category: "couple",
      img: "assets/assets3.jpg"
    },
    {
      title: "Golden Jubilee Reunion",
      desc: "Momen emas kakek nenek & keluarga besar",
      tag: "Family",
      category: "family",
      img: "assets/assets4.jpg"
    },
    {
      title: "Tech Geek & Gamer",
      desc: "Hobi gaming & setup komputer favorit",
      tag: "Personal",
      category: "personal",
      img: "assets/assets1.jpg"
    },
    {
      title: "Sarjana & Magister",
      desc: "Karikatur toga wisudawan penuh prestasi",
      tag: "Wisuda",
      category: "graduation",
      img: "assets/assets3.jpg"
    },
    {
      title: "Corporate Team Farewell",
      desc: "Hadiah kenang-kenangan pensiun & mutasi kantor",
      tag: "Karir",
      category: "career",
      img: "assets/assets4.jpg"
    }
  ];

  let currentIndex = 0;
  const itemsPerBatch = 3;
  let currentFilter = 'all';

  function createCardElement(item) {
    const article = document.createElement('article');
    article.className = 'gallery-card loaded';
    article.dataset.category = item.category;

    if (currentFilter !== 'all' && item.category !== currentFilter) {
      article.classList.add('hidden');
    }

    const waMsg = encodeURIComponent(`Halo Karikaria, saya tertarik pesan konsep ${item.title}`);
    article.innerHTML = `
      <div class="gallery-img-wrap">
        <span class="gallery-tag">${item.tag}</span>
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="gallery-info">
        <div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
        <a href="https://wa.me/628xxxxxxxxxx?text=${waMsg}" target="_blank" rel="noopener" class="gallery-order-btn" title="Pesan Konsep Ini" aria-label="Pesan Konsep Ini">↗</a>
      </div>
    `;
    return article;
  }

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      const nextBatch = additionalItems.slice(currentIndex, currentIndex + itemsPerBatch);
      nextBatch.forEach(item => {
        const card = createCardElement(item);
        galleryGrid.appendChild(card);
      });

      currentIndex += itemsPerBatch;
      loadMoreBtn.classList.remove('loading');
      loadMoreBtn.disabled = false;

      if (currentIndex >= additionalItems.length) {
        loadMoreBtn.style.display = 'none';
        if (allLoadedMsg) allLoadedMsg.style.display = 'block';
      }
    }, 350);
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;

      const cards = galleryGrid.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        if (currentFilter === 'all' || card.dataset.category === currentFilter) {
          card.classList.remove('hidden');
          card.classList.add('loaded');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
