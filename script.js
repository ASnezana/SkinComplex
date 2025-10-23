/* ==========================
   HAMBURGER MENU
========================== */
const toggleBtn = document.querySelector('.header__toggle');
const navList = document.querySelector('.nav__list');

toggleBtn.addEventListener('click', () => {
  navList.classList.toggle('active');
  // animacja hamburgera (zmiana ikony)
  toggleBtn.classList.toggle('open');
  const icon = toggleBtn.querySelector('i');
  if (toggleBtn.classList.contains('open')) {
    icon.classList.replace('fa-bars', 'fa-xmark');
  } else {
    icon.classList.replace('fa-xmark', 'fa-bars');
  }
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
