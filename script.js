/* ==========================
   HAMBURGER MENU - płynna animacja obrotu
========================== */
const toggleBtn = document.querySelector('.header__toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__list a');

toggleBtn.addEventListener('click', () => {
  navList.classList.toggle('active');         // pokaz/ukryj menu
  toggleBtn.classList.toggle('open');         // klasa open dla animacji

  const icon = toggleBtn.querySelector('i');
  if (toggleBtn.classList.contains('open')) {
    icon.classList.replace('fa-bars', 'fa-xmark');  // hamburger → X
  } else {
    icon.classList.replace('fa-xmark', 'fa-bars');  // X → hamburger
    icon.style.transform = 'rotate(-90deg)';        // obrót w przeciwną stronę
    setTimeout(() => { icon.style.transform = 'rotate(0deg)'; }, 10); 
    // reset transform po małym delay, żeby CSS mógł animować ponownie
  }
});

// Zamknięcie menu po kliknięciu w link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    toggleBtn.classList.remove('open');
    const icon = toggleBtn.querySelector('i');
    icon.classList.replace('fa-xmark', 'fa-bars');
    icon.style.transform = 'rotate(0deg)';  // reset transform
  });
});





/* ==========================
   HERO SLIDER
========================== */
const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;
const slideInterval = 5000; // co 5 sekund

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('hero__slide--active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Start slidera
if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, slideInterval);
}



/* ==========================
   BACK TO TOP BUTTON
========================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ==========================
   LIGHTBOX DO GALERII
========================== */

 const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox.querySelector('img');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryImages = document.querySelectorAll('.gallery__grid img');

  // Otwieranie lightboxa
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    });
  });

  // Zamknięcie po kliknięciu X lub tła
  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation(); // żeby kliknięcie w X nie liczyło się jako kliknięcie w tło
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });