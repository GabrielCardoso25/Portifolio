// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Portfolio Carousel
const slider = document.querySelector('.portfolio-items');
const cards = document.querySelectorAll('.portfolio-card');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentSlide = 0;
const cardWidth = cards[0].offsetWidth;
const gap = 32; // Gap between cards (2rem)
const totalSlides = cards.length;
const slidesPerView = window.innerWidth >= 768 ? 3 : 1;
const maxSlides = totalSlides - slidesPerView;

// Add active class to visible cards
function updateActiveCards() {
  cards.forEach((card, index) => {
    if (index >= currentSlide && index < currentSlide + slidesPerView) {
      card.classList.add('active');
      // Add a slight delay to each card's animation
      card.style.transitionDelay = `${(index - currentSlide) * 0.1}s`;
    } else {
      card.classList.remove('active');
      card.style.transitionDelay = '0s';
    }
  });
}

function updateSliderPosition() {
  const offset = currentSlide * (cardWidth + gap);
  slider.style.transform = `translateX(-${offset}px)`;
  
  // Update button states
  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide >= maxSlides;
  
  // Update button opacity for visual feedback
  prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
  nextButton.style.opacity = currentSlide >= maxSlides ? '0.5' : '1';

  // Update active cards
  updateActiveCards();
}

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // minimum distance for a swipe
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentSlide < maxSlides) {
      // Swipe left
      currentSlide++;
    } else if (diff < 0 && currentSlide > 0) {
      // Swipe right
      currentSlide--;
    }
    updateSliderPosition();
  }
}

nextButton.addEventListener('click', () => {
  if (currentSlide < maxSlides) {
    currentSlide++;
    updateSliderPosition();
  }
});

prevButton.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSliderPosition();
  }
});

// Update carousel on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;
    if (newSlidesPerView !== slidesPerView) {
      currentSlide = Math.min(currentSlide, totalSlides - newSlidesPerView);
      updateSliderPosition();
    }
  }, 250);
});

// Initialize carousel
updateSliderPosition();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});