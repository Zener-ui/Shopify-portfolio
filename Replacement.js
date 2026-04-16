document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // CURSOR
  // ===============================
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mx = 0, my = 0, rx = 0, ry = 0;

  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animCursor() {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';

      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;

      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      requestAnimationFrame(animCursor);
    }

    animCursor();

    document.querySelectorAll('a, button, .project-card, .service-card, .tcard')
      .forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.style.width = '52px';
          ring.style.height = '52px';
          ring.style.borderColor = 'rgba(149,191,71,0.6)';
        });

        el.addEventListener('mouseleave', () => {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'rgba(149,191,71,0.45)';
        });
      });
  }

  // ===============================
  // SCROLL REVEAL
  // ===============================
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));

  // ===============================
  // NAV + BACK TOP
  // ===============================
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const bt = document.getElementById('backTop');

    if (nav) {
      window.scrollY > 50
        ? nav.classList.add('scrolled')
        : nav.classList.remove('scrolled');
    }

    if (bt) {
      window.scrollY > 400
        ? bt.classList.add('show')
        : bt.classList.remove('show');
    }
  });

  // ===============================
  // MOBILE MENU
  // ===============================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  window.closeMobile = function () {
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  // ===============================
  // FILTER
  // ===============================
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {

      document.querySelectorAll('.filter-btn')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const filter = btn.dataset.filter;

      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? 'block' : 'none';
      });
    });
  });

  // ===============================
  // PROJECT DATA (REAL LINKS FIXED)
  // ===============================
  const projects = [
    {
      title: 'Brandshirt Australia',
      category: 'Fashion',
      img: 'Images/fashion.jpg',
      desc: 'Licensed shirt fashion brand built from scratch with editorial storytelling and seamless checkout.',
      live: "https://bandshirtsaustralia.com",
      results: [
        { num: '+187%', label: 'Revenue Growth' },
        { num: '4.8%', label: 'Conversion Rate' },
        { num: '3.2x', label: 'ROAS' }
      ],
      tags: ['Custom Theme', 'Klaviyo', 'Lookbook', 'Checkout Optimization']
    },

    {
      title: 'MYCHELLE',
      category: 'Beauty',
      img: 'Images/beauty.jpg',
      desc: 'Clean beauty skincare brand with subscriptions, quiz-based recommendations, and loyalty system.',
      live: "https://www.mychelle.com",
      results: [
        { num: '$450K', label: 'Year 1 Revenue' },
        { num: '62%', label: 'Repeat Buyers' },
        { num: '5.1%', label: 'Conversion Rate' }
      ],
      tags: ['Subscriptions', 'Skin Quiz', 'Loyalty Program', 'Klaviyo']
    },

    {
      title: 'Maven Living',
      category: 'Lifestyle',
      img: 'Images/Music (1).jpg',
      desc: 'Music merch and lifestyle store with bundle system and improved product discovery.',
      live: "https://evergreenfoliage.com",
      results: [
        { num: '+240%', label: 'Traffic Growth' },
        { num: '+95%', label: 'AOV' },
        { num: '14wks', label: 'Build Time' }
      ],
      tags: ['Bundles', 'UX Redesign', 'Inventory Sync', 'SEO']
    },

    {
      title: 'Azure Promise',
      category: 'Lifestyle',
      img: 'Images/azure.jpg',
      desc: 'Premium lifestyle and wellness brand store.',
      live: "https://azurepromise.com",
      results: [
        { num: 'Premium', label: 'Brand Tier' },
        { num: 'High', label: 'Engagement' },
        { num: 'Fast', label: 'Performance' }
      ],
      tags: ['Luxury UI', 'Performance', 'Brand Story']
    },

    {
      title: 'Camille Brinch',
      category: 'Fashion',
      img: 'Images/camille.jpg',
      desc: 'Minimal luxury jewelry and fashion brand store.',
      live: "https://camillebrinch.com",
      results: [
        { num: 'Luxury', label: 'Positioning' },
        { num: 'Strong', label: 'Conversion' },
        { num: 'Global', label: 'Reach' }
      ],
      tags: ['Jewelry', 'Luxury Design', 'Brand Identity']
    }
  ];

  // ===============================
  // MODAL
  // ===============================
  function openModal(index) {
    const p = projects[index];
    if (!p) return;

    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalCategory').textContent = p.category;
    document.getElementById('modalDesc').textContent = p.desc;

    document.getElementById('modalResults').innerHTML =
      p.results.map(r =>
        `<div class="modal-stat"><strong>${r.num}</strong><span>${r.label}</span></div>`
      ).join('');

    document.getElementById('modalTags').innerHTML =
      p.tags.map(t => `<span class="ptag">${t}</span>`).join('');

    // ===============================
    // LIVE DEMO BUTTON (UPDATED)
    // ===============================
    const link = document.getElementById('modalLink');
    if (link) {
      link.href = p.live || "#";
      link.target = "_blank";
      link.innerHTML = `
        <i class="fas fa-eye"></i>
        View Live Demo
        <span class="live-dot"></span>
      `;
    }

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.openModal = openModal;

  window.closeModal = function () {
    document.getElementById('modalOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.closeModalOutside = function (e) {
    const overlay = document.getElementById('modalOverlay');
    if (e.target === overlay) closeModal();
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ===============================
  // CONTACT FORM
  // ===============================
  window.handleSubmit = function (e) {
    e.preventDefault();

    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    e.target.reset();
  };

  // ===============================
  // COUNTER
  // ===============================
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = String(target).includes('.');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    let current = 0;
    const steps = 60;
    const increment = target / steps;

    const interval = setInterval(() => {
      current += increment;

      el.textContent =
        prefix +
        (isDecimal ? current.toFixed(1) : Math.floor(current)) +
        suffix;

      if (current >= target) {
        el.textContent = prefix + target + suffix;
        clearInterval(interval);
      }
    }, 2000 / steps);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains('counted')) {
        e.target.classList.add('counted');
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]')
    .forEach(el => statObserver.observe(el));

});