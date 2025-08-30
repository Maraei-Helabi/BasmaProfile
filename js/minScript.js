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
