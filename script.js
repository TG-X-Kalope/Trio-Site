// Toggle mobile menu
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');

  // Toggle hamburger icon to X
  const icon = document.getElementById('menu-icon');
  if (!menu.classList.contains('hidden')) {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
  } else {
    icon.innerHTML = `<path d="M4 6h16M4 12h16M4 18h16"></path>`;
  }
});



 document.addEventListener('DOMContentLoaded', () => {
      const slideContainer = document.querySelector('.slides');
      let slides = document.querySelectorAll('.slide');
      const controllers = document.querySelectorAll('.dot');

      let currentSlide = 1;
      let isTransitioning = false;
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let interval;

      // Clone first and last slides for infinite effect
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slides.length - 1].cloneNode(true);
      slideContainer.appendChild(firstClone);
      slideContainer.prepend(lastClone);
      slides = document.querySelectorAll('.slide');

      let slideWidth = window.innerWidth;
      slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

      // Resize handler
      window.addEventListener("resize", () => {
        slideWidth = window.innerWidth;
        slideContainer.style.transition = "none";
        slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      });

      function correctClonesIfNeeded() {
        slideContainer.style.transition = 'none';
        if (slides[currentSlide].isSameNode(firstClone)) {
          currentSlide = 1;
          slideContainer.style.transform = `translateX(-${slideWidth}px)`;
        } else if (slides[currentSlide].isSameNode(lastClone)) {
          currentSlide = slides.length - 2;
          slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
        isTransitioning = false;
        updateController();
      }

      slideContainer.addEventListener('transitionend', correctClonesIfNeeded);

      // Go to slide function
      function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        slideContainer.style.transition = 'transform 0.5s ease';
        slideContainer.style.transform = `translateX(-${index * slideWidth}px)`;
        currentSlide = index;
        updateController();

        setTimeout(() => {
          if (isTransitioning) correctClonesIfNeeded();
        }, 600);
      }

      // Auto slide
      function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(() => {
          if (!isDragging) goToSlide(currentSlide + 1);
        }, 4000);
      }
      function stopAutoSlide() {
        clearInterval(interval);
      }
      startAutoSlide();

      // Drag handlers
      function startDrag(x) {
        isDragging = true;
        startX = x;
        currentX = x;
        slideContainer.style.transition = 'none';
        stopAutoSlide();
      }
      function duringDrag(x) {
        currentX = x;
        const move = currentX - startX;
        const clampedMove = Math.max(-slideWidth, Math.min(move, slideWidth));
        const translateX = -currentSlide * slideWidth + clampedMove;
        slideContainer.style.transform = `translateX(${translateX}px)`;
      }
      function endDrag() {
        const moveX = currentX - startX;
        if (Math.abs(moveX) > slideWidth / 4) {
          if (moveX < 0) goToSlide(currentSlide + 1);
          else goToSlide(currentSlide - 1);
        } else {
          goToSlide(currentSlide);
        }
        isDragging = false;
        startAutoSlide();
      }

      // Mouse events
      slideContainer.addEventListener('mousedown', (e) => startDrag(e.clientX));
      slideContainer.addEventListener('mousemove', (e) => { if (isDragging) duringDrag(e.clientX); });
      slideContainer.addEventListener('mouseup', endDrag);
      slideContainer.addEventListener('mouseleave', () => { if (isDragging) endDrag(); });

      // Touch events
      slideContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
      slideContainer.addEventListener('touchmove', (e) => { if (isDragging) duringDrag(e.touches[0].clientX); });
      slideContainer.addEventListener('touchend', endDrag);

      // Wheel event for slide (optional)
      slideContainer.addEventListener("wheel", (e) => {
        if (isTransitioning || isDragging) return;
        stopAutoSlide();
        if (e.deltaX > 30) goToSlide(currentSlide + 1);
        else if (e.deltaX < -30) goToSlide(currentSlide - 1);
        startAutoSlide();
      });

      // Dot click navigation
   controllers.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = parseInt(btn.getAttribute("data-slide"));
    goToSlide(target); // already accounts for clones
  });
});


      // Update active dot style
function updateController() {
  let realIndex = currentSlide;

  if (slides[currentSlide].isSameNode(firstClone)) {
    realIndex = 0;
  } else if (slides[currentSlide].isSameNode(lastClone)) {
    realIndex = controllers.length - 1;
  } else {
    realIndex = currentSlide - 1;
  }

  controllers.forEach((btn, idx) => {
    // Remove all bg and opacity classes you use for both active and inactive states
    btn.classList.remove(
      "bg-gradient-to-r",
      "from-green-300",
      "to-blue-500",
      "bg-white/50",
      "opacity-70",
      "opacity-100"
    );

    if (idx === realIndex) {
      // Active dot: add gradient bg and full opacity
      btn.classList.add("bg-gradient-to-r", "from-green-300", "to-blue-500", "opacity-100");
    } else {
      // Inactive dot: add semi-transparent white bg and lower opacity
      btn.classList.add("bg-white/50", "opacity-70");
    }
  });
}





      updateController();
    });





    const sliderPositions = {};
const itemWidth = 224;

document.querySelectorAll('[data-slider]').forEach(button => {
  button.addEventListener('click', () => {
    const sliderName = button.getAttribute('data-slider');
    const direction = button.getAttribute('data-dir');
    const slider = document.getElementById(`${sliderName}-slider`);
    const container = slider.parentElement;

    if (!sliderPositions[sliderName]) sliderPositions[sliderName] = 0;

    const maxScroll = slider.scrollWidth - container.offsetWidth;

    if (direction === 'prev') {
      sliderPositions[sliderName] -= itemWidth;
      if (sliderPositions[sliderName] < 0) sliderPositions[sliderName] = 0;
    } else {
      sliderPositions[sliderName] += itemWidth;
      if (sliderPositions[sliderName] > maxScroll) sliderPositions[sliderName] = maxScroll;
    }

    slider.style.transform = `translateX(-${sliderPositions[sliderName]}px)`;
  });
});



//  const swiper = new Swiper('.testimonials-carousel', {
//     loop: false, // Important: disable loop for natural drag
//     grabCursor: true,
//     slidesPerView: 1.1,
//     spaceBetween: 20,
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     breakpoints: {
//       768: {
//         slidesPerView: 2,
//         spaceBetween: 30,
//       }
//     }
//   });


 const slider = document.getElementById('testimonial-slider');
const itemWidth2 = 336; // width of one card + gap, adjust if needed

let currentX = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

function setSliderPosition(x) {
  slider.style.transform = `translateX(${x}px)`;
  currentTranslate = x;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Arrow buttons functionality
document.querySelectorAll('[data-dir]').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-dir');
    const containerWidth = slider.parentElement.offsetWidth;
    const maxScroll = slider.scrollWidth - containerWidth;

    if (direction === 'prev') {
      currentX = clamp(currentX + itemWidth2, -0, 0); // no scrolling past 0
    } else {
      currentX = clamp(currentX - itemWidth2, -maxScroll, 0);
    }

    setSliderPosition(currentX);
  });
});

// Drag/swipe functionality
slider.addEventListener('mousedown', dragStart);
slider.addEventListener('touchstart', dragStart);

slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('touchend', dragEnd);

slider.addEventListener('mouseleave', dragEnd);

slider.addEventListener('mousemove', dragMove);
slider.addEventListener('touchmove', dragMove);

function dragStart(event) {
  isDragging = true;
  startX = getPositionX(event);
  prevTranslate = currentTranslate;
  slider.style.transition = 'none'; // disable transition during drag
  cancelAnimationFrame(animationID);
}

function dragMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  const deltaX = currentPosition - startX;
  let nextTranslate = prevTranslate + deltaX;

  // Clamp translate between maxScroll and 0
  const containerWidth = slider.parentElement.offsetWidth;
  const maxScroll = slider.scrollWidth - containerWidth;

  nextTranslate = clamp(nextTranslate, -maxScroll, 0);
  setSliderPosition(nextTranslate);
}

function dragEnd() {
  if (!isDragging) return;
  isDragging = false;
  slider.style.transition = 'transform 0.3s ease-in-out';

  // Snap to nearest card
  const containerWidth = slider.parentElement.offsetWidth;
  const maxScroll = slider.scrollWidth - containerWidth;

  // Round currentTranslate to nearest multiple of itemWidth
  let snappedX = Math.round(currentTranslate / itemWidth2) * itemWidth2;

  // Clamp snapped position
  snappedX = clamp(snappedX, -maxScroll, 0);

  currentX = snappedX;
  setSliderPosition(currentX);
}

function getPositionX(event) {
  return event.type.includes('touch')
    ? event.touches[0].clientX
    : event.clientX;
}
