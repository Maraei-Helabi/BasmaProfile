// تفعيل Splide.js على سلايدر الهيرو
document.addEventListener('DOMContentLoaded', function() {
	new Splide('.hero-splide', {
		type: 'fade',
		rewind: true,
		autoplay: true,
		interval: 3000,
		speed: 1200,
		pauseOnHover: false,
		pauseOnFocus: false,
		arrows: false,
		pagination: false
	}).mount();
});
// --------------------------------------------------------

// تفعيل Splide.js على سلايدر فريق العمل
document.addEventListener('DOMContentLoaded', function() {
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
			pauseOnFocus: false
		},
		breakpoints: {
			1300: { perPage: 2 },
			696: { perPage: 2 },
			370: { perPage: 1 }
		}
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
			typeof window.SplideExtensions !== 'undefined' ? window.SplideExtensions : null,
			typeof window.splideExtensions !== 'undefined' ? window.splideExtensions : null
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
			root.addEventListener('mouseenter', () => splide.Components.AutoScroll.pause());
			root.addEventListener('mouseleave', () => splide.Components.AutoScroll.play());
			console.info('AutoScroll component is available and hover handlers attached.');
		} else {
			console.warn('splide.Components.AutoScroll not available — AutoScroll غير نشط.');
		}
	}, 50);

	// أخيراً: لو حبيت تجهّز mount ثابت (بدل fallback)، استخدم:
	// splide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
});

// --------------------------------------------------------
// Massge section

// Vision & Message Section Functionality
const visionItems = document.querySelectorAll('.vision-item');
const messageItems = document.querySelectorAll('.message-item');
const centerImage = document.getElementById('centerImage');
const circleProgress = document.getElementById('circleProgress');
const backgroundImages = document.querySelectorAll('.vision-background img');
const dots = document.querySelectorAll('.dot');

// إذا لم تتوفر العناصر الأساسية، لا تنفذ أي كود خاص بالقسم
if (
	visionItems?.length &&
	messageItems?.length &&
	centerImage &&
	circleProgress &&
	backgroundImages?.length &&
	dots?.length &&
	document.querySelector('.vision-message-section')
) {

let currentIndex = 0;
const totalItems = visionItems.length;

// Function to update active content and keep section centered
function updateContent(index, scrollToSection = true) {
   // Remove active class from all items
   visionItems?.forEach?.((item) => item.classList.remove('active'));
   messageItems?.forEach?.((item) => item.classList.remove('active'));
   dots?.forEach?.((dot) => dot.classList.remove('active'));

   // Add active class to current items
   visionItems?.[index]?.classList?.add('active');
   messageItems?.[index]?.classList?.add('active');
   dots?.[index]?.classList?.add('active');

   // Update center image
   const newImage = visionItems?.[index]?.getAttribute?.('data-image');
   if (centerImage && newImage) centerImage.src = newImage;

   // Add fade effect to image
   if (centerImage) {
	   centerImage.style.opacity = '0';
	   setTimeout(() => {
		   centerImage.style.opacity = '1';
	   }, 100);
   }

   // Update progress circle based on index and RTL direction
   const progressDegrees = index / (totalItems - 1) * 360;
   const isRTL = document.documentElement.dir === 'rtl';

   if (circleProgress) {
	   if (isRTL) {
		   // For RTL, flip the circle progress direction
		   circleProgress.style.transform = `rotate(${progressDegrees - 45}deg) scaleX(-1)`;
	   } else {
		   // For LTR, use normal direction
		   circleProgress.style.transform = `rotate(${progressDegrees - 45}deg)`;
	   }
   }

   // Update background image immediately
   backgroundImages?.forEach?.((img, i) => {
	   if (i === index) {
		   img.style.opacity = '0.3';
	   } else {
		   img.style.opacity = '0';
	   }
   });

   // Keep section centered in viewport when changing cards
   if (scrollToSection && visionSection) {
	   visionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
   }
}

// Scroll-based content change - Fixed position until last item
let scrollTimeout;
let lastScrollTop = 0;
let sectionStart = 0;
let sectionEnd = 0;

// Get section boundaries
function getSectionBoundaries() {
   const section = document.querySelector('.vision-message-section');
   if (section) {
	   sectionStart = section.offsetTop;
	   sectionEnd = sectionStart + section.offsetHeight;
   }
}

// Initialize section boundaries
getSectionBoundaries();

window.addEventListener('scroll', function() {
	clearTimeout(scrollTimeout);

	scrollTimeout = setTimeout(function() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Only change content when within the section boundaries
		if (scrollTop >= sectionStart && scrollTop <= sectionEnd) {
			const sectionProgress = (scrollTop - sectionStart) / (sectionEnd - sectionStart);
			const newIndex = Math.floor(sectionProgress * totalItems);

			// Update progress circle based on RTL direction
			const progressDegrees = sectionProgress * 360;
			const isRTL = document.documentElement.dir === 'rtl';

			if (isRTL) {
				// For RTL, flip the circle progress direction
				circleProgress.style.transform = `rotate(${progressDegrees - 45}deg) scaleX(-1)`;
			} else {
				// For LTR, use normal direction
				circleProgress.style.transform = `rotate(${progressDegrees - 45}deg)`;
			}

			// Update background image during scroll - only change when content changes
			const currentBgIndex = Math.floor(sectionProgress * totalItems);
			if (currentBgIndex !== currentIndex && currentBgIndex < totalItems) {
				backgroundImages.forEach((img, i) => {
					if (i === currentBgIndex) {
						img.style.opacity = '0.3';
					} else {
						img.style.opacity = '0';
					}
				});
			}

			// لا تغير currentIndex أبداً عند دخول القسم، فقط عند سكرول فعلي عبر عجلة أو سحب أو أسهم أو نقاط
			// لذلك احذف أي تغيير تلقائي هنا
		}

		lastScrollTop = scrollTop;
	}, 100);
});

// Recalculate boundaries on window resize
window.addEventListener('resize', getSectionBoundaries);

// Click on dots to navigate
dots?.forEach?.((dot, index) => {
   dot?.addEventListener?.('click', function() {
	   currentIndex = index;
	   updateContent(currentIndex);
   });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
   if (!visionItems?.length) return;
   if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
	   if (currentIndex < totalItems - 1) {
		   currentIndex++;
		   updateContent(currentIndex);
	   }
   } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
	   if (currentIndex > 0) {
		   currentIndex--;
		   updateContent(currentIndex);
	   }
   }
});

// Touch/swipe support for mobile
let touchStartY = 0;
let touchEndY = 0;

// Mouse wheel navigation for vision-message-section (like Splide Mouse Wheel)
let wheelSleep = 600; // ms
let lastWheelTime = 0;
const visionSection = document.querySelector('.vision-message-section');
if (visionSection) {
   visionSection.addEventListener(
	   'wheel',
	   function(e) {
		   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		   if (scrollTop < sectionStart || scrollTop > sectionEnd) return;

		   const now = Date.now();
		   if (now - lastWheelTime < wheelSleep) {
			   e.preventDefault();
			   return;
		   }

		   // Lock user inside section until last slide
		   if (e.deltaY > 0) {
			   // Scroll down: next card
			   if (currentIndex < totalItems - 1) {
				   currentIndex++;
				   updateContent(currentIndex, true);
				   e.preventDefault();
				   lastWheelTime = now;
			   } else {
				   // عند آخر سلايد، اسمح بالخروج فقط إذا كان السكرول للأسفل
				   // لا تمنع السكرول، اتركه طبيعي
				   lastWheelTime = 0;
			   }
		   } else if (e.deltaY < 0) {
			   // Scroll up: previous card
			   if (currentIndex > 0) {
				   currentIndex--;
				   updateContent(currentIndex, true);
				   e.preventDefault();
				   lastWheelTime = now;
			   } else {
				   // عند أول سلايد، اسمح بالخروج فقط إذا كان السكرول للأعلى
				   // لا تمنع السكرول، اتركه طبيعي
				   lastWheelTime = 0;
			   }
		   }
		   // إذا لم يكن في أول أو آخر سلايد، امنع السكرول خارج القسم
		   if (currentIndex > 0 && currentIndex < totalItems - 1) {
			   e.preventDefault();
		   }
	   },
	   { passive: false }
   );
}

document.addEventListener('touchstart', function(e) {
   touchStartY = e.changedTouches?.[0]?.screenY ?? 0;
});

document.addEventListener('touchend', function(e) {
   touchEndY = e.changedTouches?.[0]?.screenY ?? 0;
   handleSwipe();
});

function handleSwipe() {
   const swipeThreshold = 50;
   const diff = touchStartY - touchEndY;

   if (Math.abs(diff) > swipeThreshold) {
	   if (diff > 0) {
		   // Swipe up
		   if (currentIndex < totalItems - 1) {
			   currentIndex++;
			   updateContent(currentIndex);
		   } // عند آخر سلايد، اسمح بالخروج من القسم بالسحب للأعلى
	   } else {
		   // Swipe down
		   if (currentIndex > 0) {
			   currentIndex--;
			   updateContent(currentIndex);
		   } // عند أول سلايد، اسمح بالخروج من القسم بالسحب للأسفل
	   }
   }
}

// Scroll to section and show first card when entering section by scroll
// تم تعطيل انتقال القسم تلقائياً للسلايد الأول عند دخول القسم بالسكرول

// Initialize first content (without scroll)
// updateContent(0, false);
}
