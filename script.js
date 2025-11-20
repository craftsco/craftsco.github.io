document.addEventListener("DOMContentLoaded", () => {
  // prvky
  const hamburgerEl = document.querySelector('.hamburger');
  const iconEl = hamburgerEl ? hamburgerEl.querySelector('i') : null;
  const nav = document.querySelector('.nav-links');

  // pomocné fce
  const isMobile = () => window.innerWidth <= 900;

  function forceShowNavForMobile() {
    if (isMobile()) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'center';
    }
  }

  function restoreNavDisplay() {
    nav.style.display = '';
    nav.style.flexDirection = '';
    nav.style.alignItems = '';
  }

  function openMenu() {
    nav.classList.add('show');
    hamburgerEl.classList.add('open');

    if (iconEl) {
      if (iconEl.classList.contains('fa-bars')) {
        iconEl.classList.remove('fa-bars');
        iconEl.classList.add('fa-times');
      } else if (!iconEl.classList.contains('fa-times')) {
        iconEl.classList.add('fa-times');
      }
    }

    if (isMobile()) forceShowNavForMobile();
  }

  function closeMenu() {
    nav.classList.remove('show');
    hamburgerEl.classList.remove('open');

    if (iconEl) {
      if (iconEl.classList.contains('fa-times')) {
        iconEl.classList.remove('fa-times');
        iconEl.classList.add('fa-bars');
      } else if (!iconEl.classList.contains('fa-bars')) {
        iconEl.classList.add('fa-bars');
      }
    }

    restoreNavDisplay();
  }

  // inicializace hamburger menu
  if (!hamburgerEl || !nav) {
    console.warn('Hamburger nebo nav-links nenalezeno - menu JS přeskočeno.');
  } else {
    hamburgerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (nav.classList.contains('show')) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburgerEl.contains(e.target) && nav.classList.contains('show')) {
        closeMenu();
      }
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('show')) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (!isMobile() && nav.classList.contains('show')) {
        closeMenu();
      } else if (isMobile() && nav.classList.contains('show')) {
        forceShowNavForMobile();
      }
    });
  }

  // ======== LIGHTBOX ========
  const imgs = Array.from(document.querySelectorAll('.gallery-grid img, .zoomable'));
  const lb = document.getElementById('lightbox');
  if (lb && imgs.length > 0) {
    const lbImg = lb.querySelector('img');
    const lbCap = lb.querySelector('.lb-caption');
    let idx = 0;

    function show(i) {
      idx = i;
      // Použít data-full pokud existuje, jinak fallback na src
      lbImg.src = imgs[i].dataset.full || imgs[i].src;
      lbCap.textContent = imgs[i].alt || '';
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    imgs.forEach((img, i) => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        show(i);
      });
    });

    const lbClose = lb.querySelector('.lb-close');
    const lbPrev = lb.querySelector('.lb-prev');
    const lbNext = lb.querySelector('.lb-next');

    if (lbClose) lbClose.onclick = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
    if (lbPrev) lbPrev.onclick = () => show((idx - 1 + imgs.length) % imgs.length);
    if (lbNext) lbNext.onclick = () => show((idx + 1) % imgs.length);

    lb.addEventListener('click', e => {
      if (e.target === lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ======== SCROLL ANIMACE ========
  const animatedElements = document.querySelectorAll('.animate');
  if (animatedElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.15 });
    animatedElements.forEach(el => observer.observe(el));
  }

  // ======== SLIDER ========
  const sliderImage = document.getElementById("slider-image");
  if (sliderImage) {
    const sliderImages = [
      "images/gal1.jpg",
      "images/gal2.jpg",
      "images/gal3.jpg",
      "images/gal4.jpg",
      "images/gal5.jpg",
      "images/gal6.jpg",
      "images/gal7.jpg",
      "images/gal8.jpg",
      "images/gal9.jpg",
      "images/gal10.jpg",
      "images/gal11.jpg",
      "images/gal12.jpg"
    ];
    let currentIndex = 0;
    setInterval(() => {
      sliderImage.classList.add("fade-out");
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        sliderImage.src = sliderImages[currentIndex];
        sliderImage.classList.remove("fade-out");
      }, 900);
    }, 4000);
  }

  // ==========================================================
  //  ████  AUTOMATICKÝ ROK VE FOOTERU  ████
  // ==========================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================
  //  ████  KONTAKTNÍ FORMULÁŘ → OTEVŘÍT EMAIL KLIENTA  ████
  // ==========================================================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent("Kontakt z webu – Crafts Co.");
      const body = encodeURIComponent(
        `Jméno: ${name}
Email: ${email}
Telefon: ${phone}

Zpráva:
${message}`
      );

      const mailtoUrl = `mailto:stejfova@crafts-co.cz?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
    });
  }

}); // ← sem patří konec DOMContentLoaded
