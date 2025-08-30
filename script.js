document.addEventListener('DOMContentLoaded', () => {
  // ===== Mobile Menu Toggle =====
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  if (btn && menu && icon) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      icon.innerHTML = menu.classList.contains('hidden')
        ? `<path d="M4 6h16M4 12h16M4 18h16"></path>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
    });
  }

  // ===== Mobile Services Accordion Toggle =====
  const mobileServicesBtn = document.getElementById("mobile-services-btn");
  const mobileServicesMenu = document.getElementById("mobile-services-menu");

  if (mobileServicesBtn && mobileServicesMenu) {
    mobileServicesBtn.addEventListener("click", () => {
      mobileServicesMenu.classList.toggle("hidden");
    });
  }

  // ===== Desktop Services Dropdown Toggle =====
  const servicesBtn = document.getElementById("services-btn");
  const servicesMenu = document.getElementById("services-menu");
  const servicesArrow = document.getElementById("services-arrow");

  if (servicesBtn && servicesMenu) {
    servicesBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent document click
      servicesMenu.classList.toggle("hidden");
      servicesArrow.classList.toggle("rotate-180"); // optional arrow rotation
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!servicesBtn.contains(e.target) && !servicesMenu.contains(e.target)) {
        servicesMenu.classList.add("hidden");
        servicesArrow.classList.remove("rotate-180");
      }
    });
  }

  // ===== Active Page Highlight =====
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href")?.replace("./", "");
    if (!href) return;

    const [linkPath, linkHash] = href.split("#");
    let isActive = false;

    const servicePages = [
      "ev-service.html",
      "cor-empl-transport.html",
      "evCharging.html",
      "weekend-travel.html",
      "ev-logistic.html"
    ];

    // Highlight Services parent if current page is in services
    if (servicePages.includes(currentPath)) {
      document.querySelectorAll(".nav-link").forEach(btn => {
        if (btn.textContent.trim() === "Services") {
          btn.classList.add("text-[var(--color-primary)]", "font-semibold");
        }
      });
    }

    // Home
    if (linkPath === "index.html" && currentPath === "index.html" && (!currentHash || currentHash === "")) {
      isActive = true;
    }
    // Services section on homepage
    else if (linkHash === "service" && currentPath === "index.html" && currentHash === "#service") {
      isActive = true;
    }
    // Other pages
    else if (linkPath && linkPath !== "index.html" && currentPath === linkPath) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add("text-[var(--color-primary)]", "font-semibold");
    }
  });





  // ===== Main Hero Slider =====
  // ----- Slider (Fixed Smooth Version) -----
const slideContainer = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
const controllers = document.querySelectorAll('.dot');

if (slideContainer && slides.length) {
  let currentSlide = 1;
  let isTransitioning = false;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let interval;

  // Clone first & last for infinite loop
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

  // Clone correction after transition
  function correctClonesIfNeeded() {
    if (slides[currentSlide].isSameNode(firstClone)) {
      slideContainer.style.transition = 'none';
      currentSlide = 1;
      slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    } else if (slides[currentSlide].isSameNode(lastClone)) {
      slideContainer.style.transition = 'none';
      currentSlide = slides.length - 2;
      slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    isTransitioning = false;
    updateController();
  }

  slideContainer.addEventListener('transitionend', correctClonesIfNeeded);

  // Go to specific slide
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    slideContainer.style.transition = 'transform 0.6s ease-in-out';
    slideContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    currentSlide = index;
    updateController();
  }

  // Dots update
  function updateController() {
    let realIndex;
    if (slides[currentSlide].isSameNode(firstClone)) realIndex = 0;
    else if (slides[currentSlide].isSameNode(lastClone)) realIndex = controllers.length - 1;
    else realIndex = currentSlide - 1;

    controllers.forEach((btn, idx) => {
      btn.classList.remove("bg-gradient-to-r", "from-green-300", "to-blue-500", "bg-white/50", "opacity-70", "opacity-100");
      if (idx === realIndex) {
        btn.classList.add("bg-gradient-to-r", "from-green-300", "to-blue-500", "opacity-100");
      } else {
        btn.classList.add("bg-white/50", "opacity-70");
      }
    });
  }

  // Auto slide
  function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!isDragging) goToSlide(currentSlide + 1);
    }, 4000);
  }
  function stopAutoSlide() { clearInterval(interval); }

  startAutoSlide();

  // --- Drag support ---
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
    const translateX = -currentSlide * slideWidth + move;
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

  // Wheel navigation
  slideContainer.addEventListener("wheel", (e) => {
    if (isTransitioning || isDragging) return;
    stopAutoSlide();
    if (e.deltaX > 30) goToSlide(currentSlide + 1);
    else if (e.deltaX < -30) goToSlide(currentSlide - 1);
    startAutoSlide();
  });

  // Dot click
  controllers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute("data-slide"), 10);
      if (isNaN(target)) return;
      stopAutoSlide();
      goToSlide(target + 1); // offset by 1 because of clone
      startAutoSlide();
    });
  });

  updateController();
}

  // ===== Recognition Logo Slider (Arrow Scroll) =====
  const sliderPositions = {};
const recognitionItemWidth = 224;

document.querySelectorAll('[data-slider]').forEach(button => {
  const sliderName = button.getAttribute('data-slider');
  if (sliderName === 'recognition') {
    button.addEventListener('click', () => {
      const direction = button.getAttribute('data-dir');
      const slider = document.getElementById(`${sliderName}-slider-track`); // updated ID
      const container = slider.parentElement;

      if (!sliderPositions[sliderName]) sliderPositions[sliderName] = 0;
      const maxScroll = slider.scrollWidth - container.offsetWidth;

      if (direction === 'prev') {
        sliderPositions[sliderName] -= recognitionItemWidth;
        if (sliderPositions[sliderName] < 0) sliderPositions[sliderName] = 0;
      } else {
        sliderPositions[sliderName] += recognitionItemWidth;
        if (sliderPositions[sliderName] > maxScroll) sliderPositions[sliderName] = maxScroll;
      }

      slider.style.transform = `translateX(-${sliderPositions[sliderName]}px)`;
    });
  }
});


  // ===== Testimonial Slider (Arrow + Drag) =====
  const testimonialSlider = document.getElementById('testimonial-slider');
  const testimonialItemWidth = 336;
  let currentX = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;

  if (testimonialSlider) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const setSliderPosition = (x) => {
      testimonialSlider.style.transform = `translateX(${x}px)`;
      currentTranslate = x;
    };

    document.querySelectorAll('[data-slider]').forEach(button => {
      if (button.getAttribute('data-slider') === 'testimonial') {
        const direction = button.getAttribute('data-dir');
        button.addEventListener('click', () => {
          const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.parentElement.offsetWidth;

          if (direction === 'prev') {
            currentX = clamp(currentX + testimonialItemWidth, -0, 0);
          } else {
            currentX = clamp(currentX - testimonialItemWidth, -maxScroll, 0);
          }

          setSliderPosition(currentX);
        });
      }
    });

    const getPositionX = (e) => e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

    const dragStart = (event) => {
      isDragging = true;
      startX = getPositionX(event);
      prevTranslate = currentTranslate;
      testimonialSlider.style.transition = 'none';
    };

    const dragMove = (event) => {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      const deltaX = currentPosition - startX;
      const nextTranslate = clamp(
        prevTranslate + deltaX,
        -testimonialSlider.scrollWidth + testimonialSlider.parentElement.offsetWidth,
        0
      );
      setSliderPosition(nextTranslate);
    };

    const dragEnd = () => {
      isDragging = false;
      testimonialSlider.style.transition = 'transform 0.3s ease-in-out';
      const snapped = Math.round(currentTranslate / testimonialItemWidth) * testimonialItemWidth;
      const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.parentElement.offsetWidth;
      currentX = clamp(snapped, -maxScroll, 0);
      setSliderPosition(currentX);
    };

    testimonialSlider.addEventListener('mousedown', dragStart);
    testimonialSlider.addEventListener('touchstart', dragStart);
    testimonialSlider.addEventListener('mouseup', dragEnd);
    testimonialSlider.addEventListener('touchend', dragEnd);
    testimonialSlider.addEventListener('mouseleave', dragEnd);
    testimonialSlider.addEventListener('mousemove', dragMove);
    testimonialSlider.addEventListener('touchmove', dragMove);
  }
});
