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
		this.mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
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
	headerAnimation(e) {
		// Get the scroll position
		const currentPosition = Math.floor(window.pageYOffset);

		if((e.type === 'scroll' || e.type === 'DOMContentLoaded') && !this.mobileDevice.test(navigator.userAgent)) {

			// If we scroll show animation for home page
			if(document.body.id === 'home-page' && !this.mobileDevice.test(navigator.userAgent)) {

				// Make header visible / hidden
				if(currentPosition > 1) ui.header.classList.add('header-fixed');
				else ui.header.classList.remove('header-fixed');
	
				if(!this.mobileDevice.test(navigator.userAgent)) {

					// Make header link active when section is in viewport for SERVICES section
					if(currentPosition >= 650 && currentPosition <= 1000) document.querySelector('#header-desktop .main-list').children[0].children[0].classList.add('active');
					else document.querySelector('#header-desktop .main-list').children[0].children[0].classList.remove('active');
		
					// Make header link active when section is in viewport for SUBSCRIPTION section
					if(currentPosition >= 1450 && currentPosition <= 1750) document.querySelector('#header-desktop .main-list').children[1].children[0].classList.add('active')
					else document.querySelector('#header-desktop .main-list').children[1].children[0].classList.remove('active');
				}
			}
			
			requestAnimationFrame(ui.headerAnimation);
		}

		if(e.type === 'DOMContentLoaded') {

			// On Desktop devices and home page enable header intro animation
			if(!this.mobileDevice.test(navigator.userAgent) && document.body.id === 'home-page') setTimeout(() => this.header.classList.add('header-intro'), 1000);

			// On mobile devices disable header intro animation
			if(this.mobileDevice.test(navigator.userAgent) && document.body.contains(this.header)) this.header.classList.add('header-fixed');
		}

	}

	// Parallax scroll background images
	parallaxImage(e) {
		// Get all parallax background images
		// DOMContentLoaded => so the images are in the position, if we disable the DOMContentLoaded event the images will be in the position only when we scroll
		if(e.type === 'scroll' || e.type === 'DOMContentLoaded') {

			if(this.mobileDevice.test(navigator.userAgent)) {
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
	resetScrollBtn(e) {
		if(e.type === 'click' && e.currentTarget === ui.resetScroll_btn && e.currentTarget.dataset.eventToggle === 'true') {

			const scrollSpeed = 650;

			jump('body', { duration: scrollSpeed});

			// Event state, i use this because i don't want to trigger the animation on each click
			e.currentTarget.setAttribute('data-event-toggle', 'false');
			setTimeout(() => this.resetScroll_btn.setAttribute('data-event-toggle', 'true'), scrollSpeed);
		}

		if(e.type === 'scroll') {
			const currentPosition = Math.floor(window.pageYOffset);

			let enablePosition;

			if(document.body.id === 'home-page') enablePosition = 950;
			else if(location.pathname.includes('services')) enablePosition = 1100;

			// For pages that have the reset scroll button
			if(document.body.contains(this.resetScroll_btn)) {
				if(currentPosition >= enablePosition) this.resetScroll_btn.classList.add('reset-btn-visible');
				else this.resetScroll_btn.classList.remove('reset-btn-visible');
			}
	
			requestAnimationFrame(ui.resetScrollBtn);
		}
	}

	// Show / Hide mobile header menu
	mobileHeader(e) {
		// Click on icon or parent element
		if(e.target.parentElement === this.showMobile_menu || e.target === this.showMobile_menu) this.mobile_menu.classList.add('test');
		else if(e.target.parentElement === this.hideMobile_menu || e.target === this.hideMobile_menu) this.mobile_menu.classList.remove('test');
	}

	showcaseAnimation(e) {

		console.log('showcaseAnimation');

	}
}

export const ui = new Ui();