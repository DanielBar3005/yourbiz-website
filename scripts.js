document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');

  if (!menuToggle || !navList) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en un enlace
  document.querySelectorAll('.barra a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });

});

// --------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {

  const accordionItems = document.querySelectorAll('.accordion-item');

  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    if (!header) return;

    header.addEventListener('click', () => {
      // Cierra los demás ítems
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Alternar el ítem actual
      item.classList.toggle('active');
    });
  });

});

// --------------------------------------------------------------------------------------------------------------------

const track = document.getElementById('sliderTrack');
const wrapper = document.getElementById('sliderWrapper');
const dotsContainer = document.getElementById('sliderDots');
let currentIndex = 0;
let autoSlideInterval;
const AUTO_SLIDE_TIME = 3000;

// Configuración según tamaño de pantalla
function getCardsPerView() {
    if (window.innerWidth <= 650) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
}

function updateSlider() {
    const cardWidth = track.firstElementChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap);
    const moveDistance = (cardWidth + gap) * currentIndex;
    
    track.style.transform = `translateX(-${moveDistance}px)`;
    
    // Actualizar Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function moveSlider(direction) {
    const cardsPerView = getCardsPerView();
    const totalCards = track.children.length;
    const maxIndex = totalCards - cardsPerView;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    updateSlider();
}

function startAutoSlide() {

    stopAutoSlide(); // evita duplicados

    autoSlideInterval = setInterval(() => {
        const cardsPerView = getCardsPerView();
        const totalCards = track.children.length;
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // vuelve al inicio
        } else {
            currentIndex++;
        }
        updateSlider();
    }, AUTO_SLIDE_TIME);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}



// Crear Dots dinámicamente
function createDots() {
    dotsContainer.innerHTML = '';
    const cardsPerView = getCardsPerView();
    const totalCards = track.children.length;
    const numDots = totalCards - cardsPerView + 1;

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => {
            currentIndex = i;
            updateSlider();
        };
        dotsContainer.appendChild(dot);
    }
}

// --- Eventos de Arrastre (Mouse y Touch) ---
let isDragging = false, startX, scrollLeft, startPos;

wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startPos = currentIndex;
});

window.addEventListener('mouseup', () => isDragging = false);

wrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (startX - x);
    if (Math.abs(walk) > 50) {
        if (walk > 0) moveSlider(1);
        else moveSlider(-1);
        isDragging = false;
    }
});

// Soporte Touch
wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
});

wrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (startX - x);
    if (Math.abs(walk) > 50) {
        if (walk > 0) moveSlider(1);
        else moveSlider(-1);
        startX = x; // Reset para evitar saltos múltiples
    }
});

// Al redimensionar la ventana
window.addEventListener('resize', () => {
    currentIndex = 0;
    createDots();
    updateSlider();
});

// Animación de entrada inicial
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('testimonials-header');
    setTimeout(() => header.classList.add('visible'), 200);
    createDots();
    startAutoSlide();
});

wrapper.addEventListener('mouseenter', stopAutoSlide);
wrapper.addEventListener('mouseleave', startAutoSlide);
wrapper.addEventListener('touchstart', stopAutoSlide);
wrapper.addEventListener('touchend', startAutoSlide);


// -------------------------------------------------------------------------------------------------

 document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('active');
    });
  });

//   -------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05,
        rootMargin: "150px 0px -50px 0px"
    });

    const header = document.getElementById('main-header');
    if(header) observer.observe(header);

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`; // Delay más rápido (50ms) para sentirse más ágil
        observer.observe(card);
    });
});



