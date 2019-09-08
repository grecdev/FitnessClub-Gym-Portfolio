import jump from 'jump.js';

class Ui {
	constructor() {
		// Ui elements
		this.header = document.getElementById('main-header');
		// Buttons
		this.downArrow = document.querySelectorAll('.service-down-arrow');
		this.upArrow = document.querySelectorAll('.service-up-arrow');
	}

	// Active link / page
	activePage(e) {
		if(e.type === 'click') {
			// If click on links make active
			if(e.target.hasAttribute('data-navbar-link')) {
		
				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
				
				// Make page / link active
				e.target.classList.add('active');

				// Click on icon
			} else if(e.target.parentElement.hasAttribute('data-navbar-link')) {

				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
				
				// Make page / link active
				e.target.parentElement.classList.add('active');

			}

			// If we click on logo
			if(e.target.parentElement.parentElement.parentElement.classList.contains('logo') || e.target.parentElement.parentElement.classList.contains('logo')) {
				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
			}
		}
	
		if(e.type === 'mousedown') {
			// Pressing click animation
			if(e.target.parentElement.tagName === 'LI' && e.target.hasAttribute('data-navbar-link')) { 

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.classList.add('shrink-link');

				// Click on icon
			} else if(e.target.parentElement.parentElement.tagName === 'LI' && e.target.parentElement.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.parentElement.classList.add('shrink-link');

			}

			// Releasing click animation
		} else if(e.type === 'mouseup') {
			
			if(e.target.parentElement.tagName === 'LI' && e.target.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.classList.remove('shrink-link');

				// Click on icon
			} else if(e.target.parentElement.parentElement.tagName === 'LI' && e.target.parentElement.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.parentElement.classList.remove('shrink-link');

			}
		}
	}

	// Smooth scroll click
	smoothScroll(e) {
		// Prevent default => so we don't overwrite header animations
		if(e.type === 'click') {
			// For home page
			if(e.target.getAttribute('href') === '#services-section') {
				jump('#services-section', { duration: 600, offset: -50 });
				e.preventDefault();
			}

			else if(e.target.getAttribute('href') === '#subscription') {
				jump('#subscription', { duration: 600 });
				e.preventDefault();
			}

			else if(e.target.parentElement.getAttribute('href') === '#' || e.target.parentElement.parentElement.getAttribute('href') === '#') {
				jump('body', { duration: 600});
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
		if(document.URL.includes('index') && document.body.contains(ui.header)) {
			if(currentPosition > 0) {
				ui.header.classList.remove('header-intro', 'header-fixed');
				ui.header.classList.add('header-scrolled');
			} else {
				ui.header.classList.remove('header-scrolled');
				ui.header.classList.add('header-fixed');
			}
		}
		
		requestAnimationFrame(ui.headerScroll);
	}

	// Check the page we are on so the header should be always visible
	headerPageVisible() { if(!document.URL.includes('index') && document.body.contains(this.header)) this.header.classList.add('header-visible') }

	parallaxImage() {
		// Get all parallax background images
		const backgroundImages = document.querySelectorAll('.parallax-image');

		backgroundImages.forEach(image => {
			// Get the position of each image on Y / top axis
			let pos = Math.floor(image.getBoundingClientRect().top) / 3;
			
			// Set the style
			image.style.backgroundPosition = `center ${pos}px`;
		});
	}
}

export const ui = new Ui();