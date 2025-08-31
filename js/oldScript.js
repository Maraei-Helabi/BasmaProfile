// Language selector functionality
document.querySelectorAll('.lang-btn').forEach((btn) => {
	btn.addEventListener('click', function() {
		document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
		this.classList.add('active');
	});
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function(e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
	const navbar = document.querySelector('.navbar');
	if (window.scrollY > 50) {
		navbar.style.backgroundColor = 'rgb(196 205 223 / 95%)';
	} else {
		navbar.style.backgroundColor = 'rgb(177 187 207 / 58%)';
	}
});

// // Team Slider Functionality
// const teamSlider = document.querySelector('.team-slider');

// // Clone slides for infinite loop effect
// function cloneSlides() {
// 	const slides = teamSlider.querySelectorAll('.team-slide:not(.clone)');
// 	const isRTL = document.documentElement.dir === 'rtl';

// 	// Clear any existing clones first
// 	const existingClones = teamSlider.querySelectorAll('.team-slide.clone');
// 	existingClones.forEach((clone) => clone.remove());

// 	// Clone slides for both RTL and LTR
// 	slides.forEach((slide) => {
// 		const clone = slide.cloneNode(true);
// 		clone.classList.add('clone');
// 		teamSlider.appendChild(clone);
// 	});
// }

// // Initialize slider
// cloneSlides();

// // Reinitialize sliders after a short delay to ensure proper RTL setup
// setTimeout(() => {
// 	cloneSlides();
// }, 100);

// // Pause animation on hover
// teamSlider.addEventListener('mouseenter', function() {
// 	this.style.animationPlayState = 'paused';
// });

// teamSlider.addEventListener('mouseleave', function() {
// 	this.style.animationPlayState = 'running';
// });

// // Pause animation when hovering over individual team members
// const teamMembers = document.querySelectorAll('.team-member');
// teamMembers.forEach((member) => {
// 	member.addEventListener('mouseenter', function() {
// 		teamSlider.style.animationPlayState = 'paused';
// 	});

// 	member.addEventListener('mouseleave', function() {
// 		teamSlider.style.animationPlayState = 'running';
// 	});
// });

// Vision & Message Section Functionality
const visionItems = document.querySelectorAll('.vision-item');
const messageItems = document.querySelectorAll('.message-item');
const centerImage = document.getElementById('centerImage');
const circleProgress = document.getElementById('circleProgress');
const backgroundImages = document.querySelectorAll('.vision-background img');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalItems = visionItems.length;

// Function to update active content and keep section centered
function updateContent(index, scrollToSection = true) {
	// Remove active class from all items
	visionItems.forEach((item) => item.classList.remove('active'));
	messageItems.forEach((item) => item.classList.remove('active'));
	dots.forEach((dot) => dot.classList.remove('active'));

	// Add active class to current items
	visionItems[index].classList.add('active');
	messageItems[index].classList.add('active');
	dots[index].classList.add('active');

	// Update center image
	const newImage = visionItems[index].getAttribute('data-image');
	centerImage.src = newImage;

	// Add fade effect to image
	centerImage.style.opacity = '0';
	setTimeout(() => {
		centerImage.style.opacity = '1';
	}, 100);

	// Update progress circle based on index and RTL direction
	const progressDegrees = index / (totalItems - 1) * 360;
	const isRTL = document.documentElement.dir === 'rtl';

	if (isRTL) {
		// For RTL, flip the circle progress direction
		circleProgress.style.transform = `rotate(${progressDegrees - 45}deg) scaleX(-1)`;
	} else {
		// For LTR, use normal direction
		circleProgress.style.transform = `rotate(${progressDegrees - 45}deg)`;
	}

	// Update background image immediately
	backgroundImages.forEach((img, i) => {
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
dots.forEach((dot, index) => {
	dot.addEventListener('click', function() {
		currentIndex = index;
		updateContent(currentIndex);
	});
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
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
	visionSection.addEventListener('wheel', function(e) {
		// Only handle wheel if inside section boundaries
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop < sectionStart || scrollTop > sectionEnd) return;

		const now = Date.now();
		if (now - lastWheelTime < wheelSleep) {
			e.preventDefault();
			return;
		}

		// Determine direction
		if (e.deltaY > 0) {
			// Scroll down: next card
			if (currentIndex < totalItems - 1) {
	currentIndex++;
	updateContent(currentIndex, true);
	e.preventDefault();
	lastWheelTime = now;
			} else {
				// At last card, allow normal scroll
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
				// At first card, allow normal scroll
				lastWheelTime = 0;
			}
		}
	}, { passive: false });
}

document.addEventListener('touchstart', function(e) {
	touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
	touchEndY = e.changedTouches[0].screenY;
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
			}
		} else {
			// Swipe down
			if (currentIndex > 0) {
				currentIndex--;
				updateContent(currentIndex);
			}
		}
	}
}

// Scroll to section and show first card when entering section by scroll
// تم تعطيل انتقال القسم تلقائياً للسلايد الأول عند دخول القسم بالسكرول

// Initialize first content (without scroll)
// updateContent(0, false);

// Partners Scrolling Functionality
const partnersScroll = document.querySelector('.partners-scroll');

// Clone partner logos for infinite loop effect
function clonePartners() {
	const logos = partnersScroll.querySelectorAll('.partner-logo:not(.clone)');
	const isRTL = document.documentElement.dir === 'rtl';

	// Clear any existing clones first
	const existingClones = partnersScroll.querySelectorAll('.partner-logo.clone');
	existingClones.forEach((clone) => clone.remove());

	// Clone logos for both RTL and LTR
	logos.forEach((logo) => {
		const clone = logo.cloneNode(true);
		clone.classList.add('clone');
		partnersScroll.appendChild(clone);
	});
}

// Initialize partners scroll
clonePartners();

// Reinitialize partners after a short delay to ensure proper RTL setup
setTimeout(() => {
	clonePartners();
}, 100);

// Ensure sliders are working properly
function ensureSlidersWork() {
	const isRTL = document.documentElement.dir === 'rtl';
	if (isRTL) {
		// Force RTL animations
		teamSlider.style.animation = 'slideRTL 30s linear infinite';
		partnersScroll.style.animation = 'scrollPartnersRTL 40s linear infinite';
	}
}

// Apply after everything is loaded
setTimeout(ensureSlidersWork, 300);

// Pause animation on hover
partnersScroll.addEventListener('mouseenter', function() {
	this.style.animationPlayState = 'paused';
});

partnersScroll.addEventListener('mouseleave', function() {
	this.style.animationPlayState = 'running';
});

// Pause animation when hovering over individual partner logos
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach((logo) => {
	logo.addEventListener('mouseenter', function() {
		partnersScroll.style.animationPlayState = 'paused';
	});

	logo.addEventListener('mouseleave', function() {
		partnersScroll.style.animationPlayState = 'running';
	});
});

// FAQ Section Functionality
const faqCards = document.querySelectorAll('.faq-card');
const faqItems = document.querySelectorAll('.faq-item');

// Function to update active FAQ
function updateFAQ(selectedFaq) {
	// Remove active class from all cards and items
	faqCards.forEach((card) => card.classList.remove('active'));
	faqItems.forEach((item) => item.classList.remove('active'));

	// Add active class to selected card and item
	const selectedCard = document.querySelector(`[data-faq="${selectedFaq}"]`);
	const selectedItem = document.querySelector(`.faq-item[data-faq="${selectedFaq}"]`);

	if (selectedCard) selectedCard.classList.add('active');
	if (selectedItem) selectedItem.classList.add('active');
}

// Add click event listeners to FAQ cards
faqCards.forEach((card) => {
	card.addEventListener('click', function() {
		const faqId = this.getAttribute('data-faq');
		updateFAQ(faqId);
	});
});

// Add hover event listeners to FAQ cards
faqCards.forEach((card) => {
	card.addEventListener('mouseenter', function() {
		const faqId = this.getAttribute('data-faq');
		updateFAQ(faqId);
	});
});

// Initialize with first FAQ active (default)
updateFAQ('1');

// Company Works Section - Show One Image at a Time
const workItems = document.querySelectorAll('.work-item');
let currentWorkIndex = 0;
let isAnimating = false;

// Function to show only one work item at a time
function showWorkItem(index) {
	if (isAnimating) return;
	isAnimating = true;

	// Animate out current text if there is one
	const currentVisibleItem = workItems[currentWorkIndex];
	if (currentVisibleItem && currentVisibleItem !== workItems[index]) {
		const currentWorkTitle = currentVisibleItem.querySelector('.work-title');
		if (currentWorkTitle) {
			currentWorkTitle.classList.remove('animate-in');
			currentWorkTitle.classList.add('animate-out');
		}
	}

	// Hide all work items first
	workItems.forEach((item, i) => {
		item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
		if (i === index) {
			// Show current item
			item.style.opacity = '1';
			item.style.transform = 'scale(1)';
			item.style.visibility = 'visible';
			item.style.zIndex = '10';
		} else {
			// Hide other items
			item.style.opacity = '0';
			item.style.transform = 'scale(0.8)';
			item.style.visibility = 'hidden';
			item.style.zIndex = '1';
		}
	});

	// Show title over the current image with animation
	const currentWorkItem = workItems[index];
	if (currentWorkItem) {
		const workTitle = currentWorkItem.querySelector('.work-title');
		if (workTitle) {
			// Remove any existing animation classes
			workTitle.classList.remove('animate-out');
			// Add animation class with a small delay for smooth transition
			setTimeout(() => {
				workTitle.classList.add('animate-in');
			}, 200);
		}
	}

	// Auto-advance to next item after delay
	setTimeout(() => {
		currentWorkIndex = (currentWorkIndex + 1) % workItems.length;
		isAnimating = false;

		// Show next item
		setTimeout(() => {
			showWorkItem(currentWorkIndex);
		}, 1000);
	}, 4000);
}

// Function to reset all work items to normal size
function resetWorkItems() {
	workItems.forEach((item, i) => {
		item.style.transition = 'all 0.5s ease';
		item.style.opacity = i === 0 ? '1' : '0';
		item.style.transform = i === 0 ? 'scale(1)' : 'scale(0.8)';
		item.style.visibility = i === 0 ? 'visible' : 'hidden';
		item.style.zIndex = i === 0 ? '10' : '1';

		const workTitle = item.querySelector('.work-title');
		if (workTitle) {
			workTitle.classList.remove('animate-in', 'animate-out');
			if (i === 0) {
				workTitle.classList.add('animate-in');
			}
		}
	});
}

// Initialize work items
function initWorkItems() {
	workItems.forEach((item, index) => {
		const workTitle = item.querySelector('.work-title');
		if (workTitle) {
			// Remove any existing animation classes
			workTitle.classList.remove('animate-in', 'animate-out');
			// Set initial state for non-first items
			if (index !== 0) {
				workTitle.style.opacity = '0';
				workTitle.style.transform = 'translateY(20px)';
			}
		}
	});

	// Start the animation sequence
	setTimeout(() => {
		showWorkItem(currentWorkIndex);
	}, 1000);
}

// Pause animation on hover
workItems.forEach((item) => {
	item.addEventListener('mouseenter', function() {
		isAnimating = true;
	});

	item.addEventListener('mouseleave', function() {
		isAnimating = false;
		setTimeout(() => {
			showWorkItem(currentWorkIndex);
		}, 500);
	});

	// Click to manually show specific item
	item.addEventListener('click', function() {
		const clickedIndex = Array.from(workItems).indexOf(item);
		if (clickedIndex !== -1) {
			currentWorkIndex = clickedIndex;
			showWorkItem(currentWorkIndex);
		}
	});
});

// Escape key to reset to normal view
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		resetWorkItems();
	}
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
	initWorkItems();
});

// Pause/resume on scroll
let workScrollTimeout;
window.addEventListener('scroll', function() {
	clearTimeout(workScrollTimeout);
	isAnimating = true;

	workScrollTimeout = setTimeout(() => {
		isAnimating = false;
		showWorkItem(currentWorkIndex);
	}, 1000);
});

// Initialize AOS (Animate On Scroll)
AOS.init({
	duration: 1000,
	easing: 'ease-in-out-cubic',
	once: true,
	mirror: false,
	offset: 50,
	delay: 0,
	disable: 'mobile',
	startEvent: 'DOMContentLoaded',
	initClassName: 'aos-init',
	animatedClassName: 'aos-animate',
	useClassNames: false,
	disableMutationObserver: false,
	debounceDelay: 50,
	throttleDelay: 99
});

// Refresh AOS on window resize
window.addEventListener('resize', function() {
	AOS.refresh();
});

// Refresh AOS on orientation change
window.addEventListener('orientationchange', function() {
	setTimeout(function() {
		AOS.refresh();
	}, 500);
});

// Enhanced Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach((dropdown) => {
		const dropdownMenu = dropdown.querySelector('.dropdown-menu');
		const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

		// Desktop hover functionality
		if (window.innerWidth > 991) {
			// Show dropdown on hover
			dropdown.addEventListener('mouseenter', function() {
				this.classList.add('show');
				dropdownMenu.classList.add('show');
			});

			// Hide dropdown when leaving
			dropdown.addEventListener('mouseleave', function() {
				setTimeout(() => {
					if (!this.matches(':hover')) {
						this.classList.remove('show');
						dropdownMenu.classList.remove('show');
					}
				}, 200);
			});

			// Keep dropdown open when hovering over menu
			dropdownMenu.addEventListener('mouseenter', function() {
				dropdown.classList.add('show');
				this.classList.add('show');
			});

			dropdownMenu.addEventListener('mouseleave', function() {
				setTimeout(() => {
					if (!dropdown.matches(':hover') && !this.matches(':hover')) {
						dropdown.classList.remove('show');
						this.classList.remove('show');
					}
				}, 200);
			});

			// Prevent default click on desktop
			dropdownToggle.addEventListener('click', function(e) {
				e.preventDefault();
			});
		}

		// Mobile click functionality
		if (window.innerWidth <= 991) {
			dropdownToggle.addEventListener('click', function(e) {
				e.preventDefault();
				const isOpen = dropdown.classList.contains('show');

				// Close all other dropdowns
				dropdowns.forEach((d) => d.classList.remove('show'));

				if (!isOpen) {
					dropdown.classList.add('show');
					dropdownMenu.classList.add('show');
				} else {
					dropdown.classList.remove('show');
					dropdownMenu.classList.remove('show');
				}
			});
		}
	});

	// Close dropdowns when clicking outside
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.dropdown')) {
			dropdowns.forEach((dropdown) => {
				dropdown.classList.remove('show');
				const dropdownMenu = dropdown.querySelector('.dropdown-menu');
				dropdownMenu.classList.remove('show');
			});
		}
	});

	// Handle window resize
	window.addEventListener('resize', function() {
		dropdowns.forEach((dropdown) => {
			dropdown.classList.remove('show');
			const dropdownMenu = dropdown.querySelector('.dropdown-menu');
			dropdownMenu.classList.remove('show');
		});
	});
});

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
	const langBtn = document.querySelector('.lang-btn');
	const htmlElement = document.documentElement;

	// Function to update button text and language
	function updateLanguageToggle() {
		const currentLang = htmlElement.getAttribute('lang') || 'ar';
		const currentDir = htmlElement.getAttribute('dir') || 'rtl';

		if (currentLang === 'ar' || currentDir === 'rtl') {
			// Currently in Arabic, show English toggle
			langBtn.setAttribute('data-lang', 'en');
			langBtn.setAttribute('aria-label', 'English');
			langBtn.querySelector('.lang-text').textContent = 'English';
			langBtn.querySelector('.lang-flag').textContent = '🇺🇸';
		} else {
			// Currently in English, show Arabic toggle
			langBtn.setAttribute('data-lang', 'ar');
			langBtn.setAttribute('aria-label', 'العربية');
			langBtn.querySelector('.lang-text').textContent = 'العربية';
			langBtn.querySelector('.lang-flag').textContent = '🇸🇦';
		}
	}

	langBtn.addEventListener('click', function() {
		const currentLang = htmlElement.getAttribute('lang') || 'ar';
		const currentDir = htmlElement.getAttribute('dir') || 'rtl';

		if (currentLang === 'ar' || currentDir === 'rtl') {
			// Switch to English
			htmlElement.setAttribute('dir', 'ltr');
			htmlElement.setAttribute('lang', 'en');
			document.title = 'BASMA Company - Your Dream Home';
		} else {
			// Switch to Arabic
			htmlElement.setAttribute('dir', 'rtl');
			htmlElement.setAttribute('lang', 'ar');
			document.title = 'شركة بسمة - منزل أحلامك';
		}

		// Store language preference
		localStorage.setItem('preferred-language', htmlElement.getAttribute('lang'));

		// Update button to show opposite language
		updateLanguageToggle();
	});

	// Load saved language preference and update button
	const savedLang = localStorage.getItem('preferred-language');
	if (savedLang && savedLang === 'en') {
		htmlElement.setAttribute('dir', 'ltr');
		htmlElement.setAttribute('lang', 'en');
		document.title = 'BASMA Company - Your Dream Home';
	}

	// Update button text based on current language
	updateLanguageToggle();
});
