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

  button.addEventListener('click', () => {
    const isOpen = button.classList.toggle('active');

    // zamykanie pozostałych sekcji
    document.querySelectorAll('.accordion-toggle').forEach(other => {
      if (other !== button) {
        other.classList.remove('active');
        other.setAttribute("aria-expanded", "false");
        // ustaw inline maxHeight na 0 aby zamknąć panel nawet gdy :target jest aktywne
        other.nextElementSibling.style.maxHeight = "0px";
      }
    });

    button.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      // Krótkie opóźnienie, aby układ miał czas się przeliczyć przed zmierzeniem wysokości
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      }, 30);
    } else {
      // ustaw maxHeight 0 aby zwinąć panel nawet gdy :target trzyma go otwartym
      content.style.maxHeight = "0px";
    }
  });
});

  // Auto-otwieranie akordeonu na podstawie fragmentu URL (np. #oprawa-oczu)
  function openAccordionForHash(hash) {
    if (!hash || hash === '#') return;
    const section = document.querySelector(hash);
    if (!section) return;
    const button = section.querySelector('.accordion-toggle');
    if (!button) return;

    // Zamknij inne sekcje i wymuś zamknięcie ich paneli
    document.querySelectorAll('.accordion-toggle').forEach(other => {
      if (other !== button) {
        other.classList.remove('active');
        other.setAttribute('aria-expanded', 'false');
        // ustaw na 0px, aby panel na pewno się zwinął, nawet jeśli :target jest aktywny
        other.nextElementSibling.style.maxHeight = "0px";
      }
    });

    const content = button.nextElementSibling;
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');

    // Wymuś rozwinięcie ustawiając zmierzoną wysokość (unikanie pozostawionego inline 0px)
    content.style.maxHeight = content.scrollHeight + "px";

    // Przewiń do widoku z uwzględnieniem offsetu nagłówka
    setTimeout(() => {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 60);
  }

  // Otwórz przy ładowaniu, jeśli istnieje hash
  if (location.hash) {
    openAccordionForHash(location.hash);
  }

  // Otwórz przy zmianie hash
  window.addEventListener('hashchange', () => {
    openAccordionForHash(location.hash);
  });

  // Upewnij się, że kliknięcie dowolnego linku z hashem otworzy odpowiedni akordeon (jeśli istnieje)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      // Krótkie opóźnienie, aby przeglądarka ustawiła hash i układ się ustabilizował
      setTimeout(() => openAccordionForHash(hash), 120);
    });
  });

 // Aktualizacja roku w stopce
    const currentYear = document.getElementById('current-year');
    currentYear.textContent = new Date().getFullYear();

/* ==========================
    COOKIE BANNER
========================== */
const cookieBanner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("cookie-accept");
const rejectBtn = document.getElementById("cookie-reject");

// Sprawdź, czy użytkownik już zaakceptował/rejected cookies
if (!localStorage.getItem("cookieConsent")) {
  cookieBanner.style.display = "block";
}

// Akceptuj
acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.style.display = "none";
});

// Odrzuć
rejectBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "rejected");
  cookieBanner.style.display = "none";
}); 

});


/* ==========================
   KONIEC PLIKU
========================== */
