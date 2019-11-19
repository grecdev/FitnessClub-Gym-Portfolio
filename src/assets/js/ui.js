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
		// For home page
		if(document.body.id === 'home-page') {
			// Section where we want to use smooth scroll
			const section = e.target.dataset.linkScroll;

			const scrollSpeed = 1000;

			// Event toggle state
			if(e.target.dataset.eventToggle === 'true') {
				jump(`#${section}`, {duration: scrollSpeed, offset: -50});

				// Toggle event state for all links (prevent multiple clicks trigger)
				document.querySelectorAll('[data-link-scroll]').forEach(link => link.setAttribute('data-event-toggle', 'false'));
				setTimeout(() => document.querySelectorAll('[data-link-scroll]').forEach(link => link.setAttribute('data-event-toggle', 'true')), scrollSpeed);
			}
		}

		// For services page to navigate trough sections
		if(location.pathname.includes('services')) {
			// Get the section
			let section = e.currentTarget.dataset.navigateSection;

			const scrollSpeed = 1800;

			if(e.currentTarget.dataset.eventToggle === 'true') {
				// Becuase body doesn't have hashtag
				if(section !== 'body') section = '#' + section;

				jump(section, { duration: scrollSpeed })

				// Toggle event state for all links (prevent multiple clicks trigger)
				document.querySelectorAll('[data-event-toggle]').forEach(link => link.setAttribute('data-event-toggle', 'false'));
				setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(link => link.setAttribute('data-event-toggle', 'true')), scrollSpeed);
			}
		}
	}

	// Header animation on scroll
	headerScroll() {
		// Get the scroll position
		const currentPosition = Math.floor(window.pageYOffset);
		
		// If we scroll show animation for home page
		if(document.body.id === 'home-page' && !window.matchMedia('(max-width: 767px)').matches) {
			// Make header visible / hidden
			if(currentPosition > 1) {

				ui.header.classList.remove('header-intro', 'header-fixed');
				ui.header.classList.add('header-scrolled');

			} else {

				ui.header.classList.remove('header-scrolled');
				ui.header.classList.add('header-fixed');
			}

			if(!window.matchMedia('(max-width: 1024px)').matches) {
				// Make header link active when section is in viewport for SERVICES section
				if(currentPosition >= 672 && currentPosition <= 1000) document.querySelector('#header-navbar .main-list').children[0].children[0].classList.add('active');
				else document.querySelector('#header-navbar .main-list').children[0].children[0].classList.remove('active');
	
				// Make header link active when section is in viewport for SUBSCRIPTION section
				if(currentPosition >= 1450 && currentPosition <= 1750) document.querySelector('#header-navbar .main-list').children[1].children[0].classList.add('active')
				else document.querySelector('#header-navbar .main-list').children[1].children[0].classList.remove('active');
			}
		}
		
		requestAnimationFrame(ui.headerScroll);
	}

	// Parallax scroll background images
	parallaxImage(e) {
		// Get all parallax background images
		// DOMContentLoaded => so the images are in the position, if we disable the DOMContentLoaded event the images will be in the position only when we scroll
		if(e.type === 'scroll' || e.type === 'DOMContentLoaded') {

			if(!window.matchMedia('(max-width: 768px)').matches && !window.matchMedia('(min-width: 812px) and (max-width: 824px)').matches) {
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
	}

	// Reset scroll btn
	resetScroll(e) {
		if(e.type === 'click' && e.currentTarget === ui.resetScroll_btn && e.currentTarget.dataset.eventToggle === 'true') {

			const scrollSpeed = 650;

			jump('body', { duration: scrollSpeed});

			// Event state, i use this because i don't want to trigger the animation on each click
			e.currentTarget.setAttribute('data-event-toggle', 'false');
			setTimeout(() => this.resetScroll_btn.setAttribute('data-event-toggle', 'true'), scrollSpeed);
		}
	}

	// Show / Hide mobile header menu
	mobileHeader(e) {
		// Click on icon or parent element
		if(e.target.parentElement === this.showMobile_menu || e.target === this.showMobile_menu) this.mobile_menu.classList.add('mobile-header-menu-visible');
		else if(e.target.parentElement === this.hideMobile_menu || e.target === this.hideMobile_menu) this.mobile_menu.classList.remove('mobile-header-menu-visible');
	}

	scrollFunctionality(e) {

		const currentPosition = Math.floor(window.pageYOffset);

		// Reset header animation on mobile devices
		if(e.type === 'DOMContentLoaded' || e.type === "scroll") {
			if(window.matchMedia('(max-width: 768px)').matches) {

				ui.header.classList.remove('header-intro', 'header-scrolled', 'header-fixed');

				ui.header.classList.add('mobile-header-visible');
			}
		}

		if(e.type === 'scroll') {
			// For pages that have the reset scroll button
			if(document.body.contains(this.resetScroll_btn)) {
				if(currentPosition >= 1172) this.resetScroll_btn.classList.add('reset-btn-visible')
				else this.resetScroll_btn.classList.remove('reset-btn-visible')
			}
		}

		requestAnimationFrame(ui.scrollFunctionality);
	}
}

export const ui = new Ui();