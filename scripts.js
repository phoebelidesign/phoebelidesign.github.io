document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  window.plusSlides = function(n) {
    showSlides(slideIndex += n);
  };

  // Dot controls
  window.currentSlide = function(n) {
    showSlides(slideIndex = n);
  };

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides.length > 0) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  // Cursor-based overlay navigation
  const overlay = document.getElementById("navOverlay");

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

    if (e.clientX - rect.left < midpoint) {
      plusSlides(-1);
    } else {
      plusSlides(1);
    }
  });
});