import jump from 'jump.js';

class Ui {
	constructor() {
		// Ui elements
		this.header = document.getElementById('main-header');
		this.header_links = document.querySelector('#header-navbar .main-list');
		// Buttons
		this.downArrow = document.querySelectorAll('.service-down-arrow');
		this.upArrow = document.querySelectorAll('.service-up-arrow');
		this.resetScroll_btn = document.getElementById('reset-btn');
		this.showMobile_menu = document.getElementById('show-mobile-menu');
		this.hideMobile_menu = document.getElementById('hide-mobile-menu');
		// Menus
		this.mobile_menu = document.querySelector('.bar-menu-container');
	}

	// Smooth scroll click
	smoothScroll(e) {
		if(e.type === 'click') {
			// For home page
			if(e.target.getAttribute('href') === '#services-section') {
				// Close mobile header menu
				this.mobile_menu.classList.remove('mobile-header-menu-visible')
				jump('#services-section', { duration: 600, offset: -50 });

				// Prevent default => so we don't overwrite header animations
				e.preventDefault();
			}

			else if(e.target.getAttribute('href') === '#subscription') {
				// Close mobile header menu
				this.mobile_menu.classList.remove('mobile-header-menu-visible')
				jump('#subscription', { duration: 600 });

				// Prevent default => so we don't overwrite header animations
				e.preventDefault();
			}

			else if(e.target.parentElement.getAttribute('href') === '#' || e.target.parentElement.parentElement.getAttribute('href') === '#') {
				jump('body', { duration: 600});
				
				// Prevent default => so we don't overwrite header animations
				e.preventDefault();
			}

			// For services page to navigate trough sections
			// Go downards
			if(e.currentTarget.getAttribute('href') === '#pool-area-down') { jump('#pool-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#equipment-area-down') { jump('#equipment-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#boxing-area-down') { jump('#boxing-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#trainer-area-down') { jump('#trainer-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#dancing-area-down') { jump('#dancing-area', { duration: 1800 }) }

			// Go upwards
			if(e.currentTarget.getAttribute('href') === '#trainer-area-up') { jump('#trainer-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#boxing-area-up') { jump('#boxing-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#equipment-area-up') { jump('#equipment-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#pool-area-up') { jump('#pool-area', { duration: 1800 }) }
			else if(e.currentTarget.getAttribute('href') === '#services-showcase-up') { jump('body', { duration: 1800 }) }
		}
	}

	// Header animation on scroll
	headerScroll() {
		// Get the scroll position
		const currentPosition = Math.floor(pageYOffset);
		
		// If we scroll show animation for home page
		if(window.location.pathname === '/' || window.location.pathname.includes('index')) {
			// Make header visible / hidden
			if(currentPosition > 2 && window.matchMedia('(max-width: 767px)').matches === false) {
				ui.header.classList.remove('header-intro', 'header-fixed');
				ui.header.classList.add('header-scrolled');
			} else if(currentPosition < 1 && window.matchMedia('(max-width: 767px)').matches === false){
				ui.header.classList.remove('header-scrolled');
				ui.header.classList.add('header-fixed');
			}

			// Make header link active when section is in viewport
			if(currentPosition >= 672 && currentPosition <= 775 && window.matchMedia('(max-width: 768px)').matches === false) {

				document.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
				document.querySelector('#header-navbar .main-list').children[0].children[0].classList.add('active');

			} else document.querySelector('#header-navbar .main-list').children[0].children[0].classList.remove('active');

			// Make header link active when section is in viewport
			if(currentPosition >= 1553 && currentPosition <= 1726 && window.matchMedia('(max-width: 768px)').matches === false) {
				
				document.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
				document.querySelector('#header-navbar .main-list').children[1].children[0].classList.add('active')

			} else document.querySelector('#header-navbar .main-list').children[1].children[0].classList.remove('active');
		}
		
		requestAnimationFrame(ui.headerScroll);
	}

	// Check the page we are on so the header should be always visible
	headerPageVisible() { if(window.location.pathname !== '/' && !window.location.pathname.includes('index') && document.body.contains(this.header)) this.header.classList.add('header-visible') }

	// Parallax scroll background images
	parallaxImage() {
		// Get all parallax background images
		if(window.matchMedia('(max-width: 768px)').matches === false && window.matchMedia('(min-width: 812px) and (max-width: 824px)').matches === false) {
			const backgroundImages = document.querySelectorAll('.parallax-image');
	
			backgroundImages.forEach(image => {
				// Get the position of each image on Y / top axis
				let pos = Math.floor(image.getBoundingClientRect().top) / 3;
				
				// Set the style
				image.style.backgroundPosition = `center ${pos}px`;
			});
	
			requestAnimationFrame(ui.parallaxImage);
		}
	}

	// Reset scroll btn
	resetScroll(e) {
		if(e.type === 'scroll') {

			if(document.body.contains(this.resetScroll_btn)) {
				const currentPosition = Math.floor(window.pageYOffset);
		
				if(currentPosition >= 1172) this.resetScroll_btn.classList.add('reset-btn-visible')
				else this.resetScroll_btn.classList.remove('reset-btn-visible')
		
				requestAnimationFrame(ui.parallaxImage);
			}

		}

		else if(e.type === 'click' && e.currentTarget === ui.resetScroll_btn) jump('body', { duration: 600})
	}

	// Show / Hide mobile header menu
	mobileHeader(e) {

		if(e.type === 'click') {
			// IF we click on icon or button itself
			if(e.target.parentElement === this.showMobile_menu || e.target === this.showMobile_menu) this.mobile_menu.classList.add('mobile-header-menu-visible');
			else if(e.target.parentElement === this.hideMobile_menu || e.target === this.hideMobile_menu) this.mobile_menu.classList.remove('mobile-header-menu-visible');
		}

		// Reset header animation on mobile
		if(e.type === 'scroll' || e.type === 'DOMContentLoaded') {

			if(window.matchMedia('(min-width: 768px)').matches === false) {
	
				ui.header.classList.remove('header-intro', 'header-scrolled', 'header-fixed');
	
				ui.header.classList.add('mobile-header-visible');
			}
			
		}

	}
}

export const ui = new Ui();