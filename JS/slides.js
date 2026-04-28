document.addEventListener("DOMContentLoaded", function () {
  // Initialize all carousels
  document.querySelectorAll('.slideContainer').forEach(container => {
    const carouselId = container.getAttribute('data-carousel');
    showSlides(1, carouselId);
  });

  // Next/previous controls
  window.plusSlides = function(n, carouselId = 'carousel-1') {
    const container = document.querySelector(`[data-carousel="${carouselId}"]`);
    const slides = container.querySelectorAll('.slide');
    let slideIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none') + 1;
    showSlides(slideIndex + n, carouselId);
  };

  // Dot controls
  window.currentSlide = function(n, carouselId = 'carousel-1') {
    showSlides(n, carouselId);
  };

  function showSlides(n, carouselId) {
    const container = document.querySelector(`[data-carousel="${carouselId}"]`);
    const slides = container.querySelectorAll('.slide');
    const dotsContainer = document.querySelector(`[data-carousel="${carouselId}"].carousel-dots`);
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    
    if (n > slides.length) { n = 1; }
    if (n < 1) { n = slides.length; }
    
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n - 1].style.display = 'block';
    if (dots[n - 1]) dots[n - 1].classList.add('active');
  }

  // Cursor-based overlay navigation
  document.querySelectorAll('.navOverlay').forEach(overlay => {
    overlay.addEventListener("mousemove", function (e) {
      const rect = overlay.getBoundingClientRect();
      const midpoint = rect.width / 2;
      overlay.classList.remove("left-hover", "right-hover");

      if (e.clientX - rect.left < midpoint) {
        overlay.classList.add("left-hover");
      } else {
        overlay.classList.add("right-hover");
      }
    });

    overlay.addEventListener("click", function (e) {
      const rect = overlay.getBoundingClientRect();
      const midpoint = rect.width / 2;
      const carouselId = overlay.closest('.slideContainer').getAttribute('data-carousel');

      if (e.clientX - rect.left < midpoint) {
        plusSlides(-1, carouselId);
      } else {
        plusSlides(1, carouselId);
      }
    });
  });
});