let slideIndex = 0;
const slides = document.querySelectorAll('.hero img');

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  slideIndex = (n + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

// Automatically advance slides every 3 seconds (adjust as needed)
setInterval(nextSlide, 1000);
