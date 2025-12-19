document.addEventListener("DOMContentLoaded", () => {

/* ==========================
   HAMBURGER MENU
========================== */
const toggleBtn = document.querySelector('.header__toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__list a');
const icon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', () => {
  const isOpen = toggleBtn.classList.toggle('open');
  navList.classList.toggle('active');

  toggleBtn.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

// zamykanie po kliknięciu w link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute("aria-expanded", "false");
    icon.classList.replace("fa-xmark", "fa-bars");
  });
});


/* ==========================
   HERO SLIDER
========================== */
const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;
const interval = 5000;

function showSlide(i) {
  slides.forEach((slide, idx) =>
    slide.classList.toggle('hero__slide--active', idx === i)
  );
}

if (slides.length > 0) {
  showSlide(0);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, interval);
}


/* ==========================
   BACK TO TOP BUTTON
========================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 300);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ==========================
    AKORDEON W CENNIKU
========================== */
document.querySelectorAll('.accordion-toggle').forEach(button => {
  const content = button.nextElementSibling;

  // ustaw aria
  button.setAttribute("aria-expanded", "false");
  content.style.maxHeight = "0px";

  button.addEventListener('click', () => {
    const isOpen = button.classList.toggle('active');

    // zamykanie pozostałych sekcji
    document.querySelectorAll('.accordion-toggle').forEach(other => {
      if (other !== button) {
        other.classList.remove('active');
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.style.maxHeight = "0px";
      }
    });

    button.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0px";
    }
  });
});

});


/* ==========================
   KONIEC PLIKU
========================== */
