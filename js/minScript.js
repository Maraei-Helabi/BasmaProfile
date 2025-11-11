// تفعيل Splide.js على سلايدر الهيرو
document.addEventListener('DOMContentLoaded', function () {
  new Splide('.hero-splide', {
    type: 'fade',
    rewind: true,
    autoplay: true,
    interval: 3000,
    speed: 1200,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    pagination: false,
  }).mount();
});

// ==== Capsules Section (Why Capsules®? Inspired, GSAP ScrollTrigger) ====
// document.addEventListener('DOMContentLoaded', function () {
// 	if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
// 	const section = document.querySelector('.capsules-section');
// 	if (!section) return;
// 	const cards = Array.from(section.querySelectorAll('.capsules-card'));
// 	const images = Array.from(section.querySelectorAll('.capsules-image'));
// 	if (cards.length < 2 || images.length < 2) return;

// 	// إظهار أول كارد وصورة
// 	cards[0].classList.add('active');
// 	images[0].classList.add('active');

// 	// إعداد ScrollTrigger
// 	gsap.registerPlugin(ScrollTrigger);
// 	let current = 0;
// 	ScrollTrigger.create({
// 		trigger: section,
// 		start: 'center center', // يبدأ التفاعل عندما يكون القسم في منتصف الشاشة
// 		// end يجب أن يكون (عدد الكروت - 1) × ارتفاع القسم، حتى لا يتمدد pin أكثر من اللازم
// 		end: () => `+=${section.offsetHeight * (cards.length - 1)}`,
// 		pin: true,
// 		pinSpacing: true,
// 		scrub: 1,
// 		anticipatePin: 1,
// 		onUpdate: self => {
// 			// توزيع التقدم بالتساوي على الكروت
// 			const total = cards.length - 1;
// 			const idx = Math.min(total, Math.max(0, Math.round(self.progress * total)));
// 			if (idx !== current) {
// 				cards.forEach((c, i) => c.classList.toggle('active', i === idx));
// 				images.forEach((img, i) => img.classList.toggle('active', i === idx));
// 				current = idx;
// 			}
// 		}
// 	});
// });
// Projects Vertical Splide Slider Init + Wheel Exit/Entry Logic
// document.addEventListener('DOMContentLoaded', function () {
// 	var projectsSection = document.querySelector('.projects-vertical-slider-section');
// 	var projectsSplide = document.querySelector('.projects-vertical-splide');
// 	if (projectsSplide && projectsSection) {
// 		var splide = new Splide(projectsSplide, {
// 			direction: 'ttb',
// 			height: '100vh',
// 			wheel: true,
// 			pagination: true,
// 			arrows: false,
// 			snap: true,
// 			drag: true,
// 			perPage: 1,
// 			perMove: 1,
// 			speed: 900,
// 			easing: 'cubic-bezier(0.77,0,0.175,1)',
// 			waitForTransition: true,
// 			classes: {
// 				slide: 'splide__slide project-slide',
// 			},
// 		});
// 		splide.on('move', function (newIndex) {
// 			// عند تغيير السلايد، غيّر خلفية السكشن حسب data-image
// 			var slides = projectsSplide.querySelectorAll('.project-slide');
// 			var activeSlide = slides[newIndex];
// 			if (activeSlide) {
// 				var bg = activeSlide.dataset.image;
// 				if (bg) {
// 					projectsSection.style.backgroundImage = 'url("' + bg + '")';
// 					projectsSection.style.backgroundSize = 'cover';
// 					projectsSection.style.backgroundPosition = 'center';
// 					projectsSection.style.backgroundRepeat = 'no-repeat';
// 				}
// 			}
// 		});
// 		// عند التحميل الأول، عيّن الخلفية
// 		splide.on('mounted', function () {
// 			var slides = projectsSplide.querySelectorAll('.project-slide');
// 			var activeSlide = slides[0];
// 			if (activeSlide) {
// 				var bg = activeSlide.dataset.image;
// 				if (bg) {
// 					projectsSection.style.backgroundImage = 'url("' + bg + '")';
// 					projectsSection.style.backgroundSize = 'cover';
// 					projectsSection.style.backgroundPosition = 'center';
// 					projectsSection.style.backgroundRepeat = 'no-repeat';
// 				}
// 			}
// 		});
// 		splide.mount();

// 		// Wheel navigation: only exit after user is ALREADY at last/first slide and scrolls again
// 		let wheelSleep = 700;
// 		let lastWheelTime = 0;
// 		let atEdge = null; // 'last' | 'first' | null
// 		projectsSection.addEventListener('wheel', function (e) {
// 			const now = Date.now();
// 			if (now - lastWheelTime < wheelSleep) return;
// 			const atFirst = splide.index === 0;
// 			const atLast = splide.index === splide.length - 1;
// 			if (e.deltaY > 0) {
// 				if (atLast) {
// 					if (atEdge === 'last') {
// 						lastWheelTime = now;
// 						let next = projectsSection.nextElementSibling;
// 						while (next && next.offsetHeight < 10) next = next.nextElementSibling;
// 						if (next) {
// 							next.scrollIntoView({ behavior: 'smooth', block: 'start' });
// 						}
// 						atEdge = null;
// 					} else {
// 						atEdge = 'last';
// 						lastWheelTime = now;
// 						// امنع السكرول الافتراضي حتى لا يخرج مباشرة
// 						e.preventDefault();
// 					}
// 				} else {
// 					atEdge = null;
// 				}
// 			} else if (e.deltaY < 0) {
// 				if (atFirst) {
// 					if (atEdge === 'first') {
// 						lastWheelTime = now;
// 						let prev = projectsSection.previousElementSibling;
// 						while (prev && prev.offsetHeight < 10) prev = prev.previousElementSibling;
// 						if (prev) {
// 							prev.scrollIntoView({ behavior: 'smooth', block: 'end' });
// 						}
// 						atEdge = null;
// 					} else {
// 						atEdge = 'first';
// 						lastWheelTime = now;
// 						e.preventDefault();
// 					}
// 				} else {
// 					atEdge = null;
// 				}
// 			}
// 		}, { passive: false });

// 		// إذا دخلت القسم من الأسفل (سكرول لأعلى)، ابدأ من آخر سلايد
// 		let lastScrollY = window.scrollY;
// 		window.addEventListener('scroll', function () {
// 			const rect = projectsSection.getBoundingClientRect();
// 			// إذا دخلت القسم من الأسفل (سكرول لأعلى)
// 			if (rect.bottom > 0 && rect.top < window.innerHeight && window.scrollY < lastScrollY) {
// 				if (rect.bottom > window.innerHeight && rect.top < 10) {
// 					// إذا كان السلايدر ظاهر بالكامل تقريباً
// 					if (splide.index !== splide.length - 1) {
// 						splide.go(splide.length - 1);
// 					}
// 				}
// 			}
// 			lastScrollY = window.scrollY;
// 		});
// 	}
// });
// --------------------------------------------------------

// تفعيل Splide.js على سلايدر فريق العمل
document.addEventListener('DOMContentLoaded', function () {
  // خيارات Splide
  var options = {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    direction: 'rtl',
    perPage: 3,
    gap: '1rem',
    pagination: false,
    arrows: false,
    autoScroll: {
      speed: 1.2,
      pauseOnHover: true,
      pauseOnFocus: false,
    },
    breakpoints: {
      1300: { perPage: 2 },
      696: { perPage: 2 },
      370: { perPage: 1 },
    },
  };

  var splide = new Splide('.team-splide', options);

  // --- محاولة تركيب AutoScroll بعد التحقق من أماكن التسجيل المختلفة ---
  // يحاول إيجاد Registry للإكستنشن في أكثر من مكان (fallbacks)
  function findExtensions() {
    const cand = [
      typeof window.splide !== 'undefined' ? window.splide.Extensions : null,
      typeof window.Splide !== 'undefined' ? window.Splide.Extensions : null,
      typeof window.splide !== 'undefined' ? window.splide.extensions : null,
      typeof window.Splide !== 'undefined' ? window.Splide.extensions : null,
      typeof window.SplideExtensions !== 'undefined'
        ? window.SplideExtensions
        : null,
      typeof window.splideExtensions !== 'undefined'
        ? window.splideExtensions
        : null,
    ];
    for (let e of cand) if (e) return e;
    return null;
  }

  var ext = findExtensions();
  if (ext && ext.AutoScroll) {
    console.info('AutoScroll extension found — mounting via ext.AutoScroll');
    splide.mount({ AutoScroll: ext.AutoScroll });
  } else if (typeof window.splide !== 'undefined' && window.splide.Extensions) {
    console.info('Mounting window.splide.Extensions (fallback)');
    splide.mount(window.splide.Extensions);
  } else {
    console.warn(
      'AutoScroll extension NOT found. Mounting Splide without AutoScroll as fallback.'
    );
    splide.mount(); // mount but no AutoScroll
  }

  // إذا تم تركيب AutoScroll، نربط إيقاف/تشغيل عند الهوفر (احتياطي)
  setTimeout(() => {
    if (splide.Components && splide.Components.AutoScroll) {
      const root = splide.root;
      root.addEventListener('mouseenter', () =>
        splide.Components.AutoScroll.pause()
      );
      root.addEventListener('mouseleave', () =>
        splide.Components.AutoScroll.play()
      );
      console.info(
        'AutoScroll component is available and hover handlers attached.'
      );
    } else {
      console.warn(
        'splide.Components.AutoScroll not available — AutoScroll غير نشط.'
      );
    }
  }, 50);

  // أخيراً: لو حبيت تجهّز mount ثابت (بدل fallback)، استخدم:
  // splide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
});

// works --- Discover Section (GSAP Horizontal Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const discoverSection = document.querySelector('.discover-section');
  if (!discoverSection) return;

  const container = discoverSection.querySelector('.discover-track-container');
  const track = discoverSection.querySelector('.discover-track');
  const cards = gsap.utils.toArray(track.querySelectorAll('.discover-card'));

  if (!container || !track || cards.length === 0) return;

  // Set initial position: start from the rightmost position (last card visible)
  const getScrollAmount = () => {
    const trackWidth = track.scrollWidth;
    const containerWidth = container.offsetWidth;
    return trackWidth - containerWidth;
  };

  // Set initial position to show first card on the right
  gsap.set(track, { x: -getScrollAmount() });

  // Create the horizontal scroll animation (move from left to right, showing cards in order)
  gsap.to(track, {
    x: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: discoverSection,
      start: 'top top',
      end: () => `+=${getScrollAmount() + window.innerHeight}`,
      pin: container,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
});

// === إحصائيات: أنميشن عداد عند ظهور القسم ===
document.addEventListener('DOMContentLoaded', function () {
  function animateCount(el, target, duration = 1800) {
    let start = 0;
    let startTime = null;
    target = +target;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  let statsAnimated = false;
  function handleStatsAnimation() {
    if (statsAnimated) return;
    const section = document.getElementById('stats-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;
      section.querySelectorAll('.stat-number').forEach((num) => {
        animateCount(num, num.getAttribute('data-target'));
      });
    }
  }
  window.addEventListener('scroll', handleStatsAnimation);
  handleStatsAnimation();
});

// تفعيل Splide على قسم ماذا قالوا عنا
document.addEventListener('DOMContentLoaded', function () {
  var testimonialsSplide = document.querySelector('.testimonials-splide');
  if (testimonialsSplide) {
    new Splide(testimonialsSplide, {
      type: 'loop',
      perPage: 1,
      gap: '24px',
      autoplay: true,
      interval: 4000,
      pagination: true,
      arrows: true,
      direction: 'rtl',
    }).mount();
  }
});

// testimonials
// document.addEventListener('DOMContentLoaded', function () {
// 	new Splide('.testimonials-splide', {
// 		type: 'loop',
// 		perPage: 2,
// 		perMove: 1,
// 		gap: '1.5rem',
// 		autoplay: false,
// 		interval: 4000,
// 		pauseOnHover: true,
// 		pauseOnFocus: false,
// 		direction: 'rtl', // مضاف لتوافق اللغة العربية
// 		breakpoints: {
// 			992: {
// 				perPage: 1,
// 				gap: '0.5rem',
// 				padding: '0',
// 			},
// 		},
// 	}).mount();
// });

// === Media Gallery Splide Sliders ===
document.addEventListener('DOMContentLoaded', function () {
  // Photos Slider
  const photosSlider = document.querySelector('#mediaPhotosSlider');
  if (photosSlider) {
    new Splide('#mediaPhotosSlider', {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: '20px',
      padding: '10px',
      direction: 'rtl',
      pagination: false,
      arrows: true,
      autoplay: false,
      speed: 800,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      breakpoints: {
        1400: { perPage: 3 },
        992: { perPage: 2 },
        768: { perPage: 2 },
        576: { perPage: 1 },
      },
    }).mount();
  }

  // Videos Slider
  const videosSlider = document.querySelector('#mediaVideosSlider');
  if (videosSlider) {
    new Splide('#mediaVideosSlider', {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: '20px',
      padding: '10px',
      direction: 'rtl',
      pagination: false,
      arrows: true,
      autoplay: false,
      speed: 800,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      breakpoints: {
        1400: { perPage: 3 },
        992: { perPage: 2 },
        768: { perPage: 2 },
        576: { perPage: 1 },
      },
    }).mount();
  }

  // Video Modal Functionality
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoLinks = document.querySelectorAll('.media-icon-video');
  const videoCards = document.querySelectorAll('.video-card');

  // Function to get YouTube embed URL
  function getYouTubeEmbedUrl(url) {
    let videoId = '';

    // Handle different YouTube URL formats
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  // Function to open video modal
  function openVideoModal(videoUrl) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    videoIframe.src = embedUrl;
    const modal = new bootstrap.Modal(videoModal);
    modal.show();
  }

  // Add click event to all video links (play button in icons)
  videoLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const videoUrl = this.getAttribute('href');
      openVideoModal(videoUrl);
    });
  });

  // Add click event to video cards (click anywhere on the card)
  videoCards.forEach((card) => {
    card.addEventListener('click', function (e) {
      // Don't trigger if clicking on the link icon
      if (!e.target.closest('.media-icon-link')) {
        const videoUrl = this.getAttribute('data-video-url');
        if (videoUrl) {
          openVideoModal(videoUrl);
        }
      }
    });

    // Add pointer cursor to video cards
    card.style.cursor = 'pointer';
  });

  // Clear video when modal is closed
  if (videoModal) {
    videoModal.addEventListener('hidden.bs.modal', function () {
      videoIframe.src = '';
    });
  }
});
