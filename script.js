
  /* ============================================================
     NAVBAR – shrink on scroll & active link
  ============================================================ */
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Shrink navbar
    navbar.classList.toggle('scrolled', y > 60);

    // Back to top visibility
    document.getElementById('backToTop').classList.toggle('visible', y > 400);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  /* ============================================================
     BACK TO TOP
  ============================================================ */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     SCROLL REVEAL – IntersectionObserver
  ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ============================================================
     SMOOTH CLOSE NAVBAR ON MOBILE LINK CLICK
  ============================================================ */
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsNav = bootstrap.Collapse.getInstance(document.getElementById('navMenu'));
      if (bsNav) bsNav.hide();
    });
  });

  /* ============================================================
     COUNTER ANIMATION (stats strip)
  ============================================================ */
  function animateCounter(el, target, suffix, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(0)) + suffix;
    }, 16);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  const statData = [
    { value: 5000, suffix: '+' },
    { value: 8,    suffix: '+' },
    { value: 98,   suffix: '%' },
    { value: 24,   suffix: 'h' },
  ];

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach((el, i) => animateCounter(el, statData[i].value, statData[i].suffix));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) statsObserver.observe(statsStrip);

