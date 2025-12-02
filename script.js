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
    AKORDEON W CENNIKU
========================== */

document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    // opcjonalnie: zamykanie innych sekcji
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
      if(btn !== button) btn.classList.remove('active');
    });
    document.querySelectorAll('.accordion-content').forEach(content => {
      if(content !== button.nextElementSibling) content.style.display = 'none';
    });

    // otwiera/zamyka aktualną sekcję
    const content = button.nextElementSibling;
    const isActive = button.classList.toggle('active');
    content.style.display = isActive ? 'block' : 'none';
  });
});
/* ==========================
   KONIEC PLIKU
========================== */
