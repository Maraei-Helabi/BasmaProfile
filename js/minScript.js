// تفعيل Splide.js على سلايدر الهيرو
document.addEventListener('DOMContentLoaded', function() {
	new Splide('.hero-splide', {
		type: 'fade',
		rewind: true,
		autoplay: true,
		interval: 5000,
		speed: 1200,
		pauseOnHover: false,
		pauseOnFocus: false,
		arrows: false,
		pagination: false
	}).mount();
});
