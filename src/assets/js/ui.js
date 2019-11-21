import jump from 'jump.js';

class Ui {
	constructor() {
		// Ui elements
		this.header = document.getElementById('main-header');
		this.header_links = document.querySelector('#header-navbar .main-list');
		this.contact_form = document.querySelector('form[name="contact-form"]');
		// Buttons
		this.downArrow = document.querySelectorAll('.service-down-arrow');
		this.upArrow = document.querySelectorAll('.service-up-arrow');
		this.resetScroll_btn = document.getElementById('reset-btn');
		this.showMobile_menu = document.getElementById('show-mobile-menu');
		this.hideMobile_menu = document.getElementById('hide-mobile-menu');
		this.form_btn = document.getElementById('form-btn');
		// Menus
		this.mobile_menu = document.querySelector('.bar-menu-container');
		this.mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
		// Inputs
		this.letter_disabled = document.querySelectorAll('.letter-disabled');
		this.text_field = document.querySelectorAll('.text-field');
		this.name_input = document.getElementById('name-input');
		this.email_input = document.getElementById('email-input');
		this.phone_input = document.getElementById('phone-input');
		this.message_input = document.getElementById('message-input');
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
				this.mobile_menu.classList.remove('header-mobile-visible');

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
		if((e.type === 'scroll' || e.type === 'DOMContentLoaded') && !this.mobileDevice.test(navigator.userAgent)) {
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
		if(e.target.parentElement === this.showMobile_menu || e.target === this.showMobile_menu) this.mobile_menu.classList.add('header-mobile-visible');
		else if(e.target.parentElement === this.hideMobile_menu || e.target === this.hideMobile_menu) this.mobile_menu.classList.remove('header-mobile-visible');
	}

	disableLetters(e) {
		// Disable shift
		if(e.shiftKey) e.preventDefault();

		/* Available Keys:

			Numpad + normal keyboard numbers
			+ && - and parentheses
			Space && Ctrl + a && Backspace
			dot
			arrow keys
			Tab

		*/
		if(e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which === 189 || e.which === 187 || e.which === 8 || e.which === 32 || e.which === 17 || e.which === 107 || e.which === 109 || e.ctrlKey || e.which === 190 || e.which === 110 || e.which >= 37 && e.which <= 40 || e.which === 9 || e.which === 123 || e.which === 116 || e.which === 191) return true;
		else e.preventDefault();
	}

	regexValidation(e) {

		const regex = {
			/*
			email@gmail.com / ro / co / co.uk / fr
			email@yahoo.com / ro / co / co.uk / fr
			email@hotmail.com / ro / co / co.uk / fr
			email@aol.com / ro / co / co.uk / fr
			*/
			emailRegex: /^[\w\W]+\@{1}(gmail|yahoo|hotmail|aol)\.(com|ro|co|co\.uk|fr)+$/g,
			letterRegex: /^[aA-zZ\s-,]{3,}$/,
			/* 
			Phone format
			0777123456
			0777 123 456
			0777-123-456
			+44 123 456 789
			+40 123 456 789
			+40123456789
			+40-123-456-789
			(1234) 567 890
			(555) 555-1234
		*/
			phoneRegex: /^\+?(\(\+\d{2,3}\)?)?[\s-\.]?(\(?\d+\)?)[\s-\.]?(\d+)[\s-\.]?(\d+)$/g
		};

		if(e.type === 'blur') {

			if(e.target === this.name_input) {
				if(regex.letterRegex.test(this.name_input.value)) this.alert(null, 'success', false, e.target);
				else this.alert(`Name is invalid, please type again.`, 'error', false, e.target);
			}

			if(e.target === this.email_input) {
				if(regex.emailRegex.test(this.email_input.value)) this.alert(null, 'success', false, e.target);
				else this.alert(`Email is invalid, please type again.`, 'error', false, e.target);
			}

			if(e.target === this.phone_input) {
				if(regex.phoneRegex.test(this.phone_input.value)) this.alert(null, 'success', false, e.target);
				else this.alert(`Phone Number is invalid, please type again.`, 'error', false, e.target);
			}

			if(e.target === this.message_input && this.message_input.value.length > 0) this.alert(null, 'success', false, e.target);

			if(e.target.value === '') this.alert(`${e.target.placeholder} is empty, please fill the input.`, 'error', false, e.target);
		}

		if(e.type === 'submit') {
			// Submit variable state
			// Using this when we check for all inputs
			let submit;

			// This array is compared to the number of all inputs
			const filledInputs = [];

			this.text_field.forEach(input => {

				// If inputs are not corectly filled / blank
				if(!input.classList.contains('input-filled')) {

					// Display the alert
					this.alert('All inputs are required !', 'error', true, e.target);
					// Highlight the inputs
					input.classList.add('input-error');
					// Reset the wrong / blank inputs
					setTimeout(() => input.classList.remove('input-error'), 2000);
					// Don't submit the form
					submit = false;

				}
				// Get all the inputs that are correct
				else filledInputs.push(input);
			});

			// If the number of correct inputs is the same as all inputs that means all the inputs are correct filled :)
			if(filledInputs.length === this.text_field.length) {

				this.alert('Form has been successfully submited !', 'success', true, e.target);

				submit = true;
			}

			console.log('Form has been submited ?', submit);
			return submit;
		}
		
	}

	alert(message, alertType, multiple, target) {
		// message = obviously
		// alertType = success / error
		// multiple = true (when submiting the form and check all inputs) / false (single input)
		// target = when we need to use the event object

		// Create the alert element and add message
		const p = document.createElement('p');
		p.appendChild(document.createTextNode(message));

		if(alertType === 'error') {
			// Remove error, so we have only one
			document.querySelectorAll('.regex-alert').forEach(error => error.remove());

			// Add the error styling
			p.classList.add('regex-alert', 'text-center', 'regex-error');

			// Single input
			if(!multiple) {

				// If input is not valid remove the input correct validation class (input-filled);
				target.classList.remove('input-filled');
				target.classList.add('input-error');

				// For individual input add the regex error
				target.parentElement.insertAdjacentElement('beforeend', p);

				if(target.value === '') target.classList.remove('input-filled');
			} 
			else {
				// Add the regex alert to the DOM && other error styling to elements
				target.insertAdjacentElement('beforeend', p);
				this.form_btn.classList.add('input-error');

				// Reset the regex alert
				this.text_field.forEach(input => input.classList.remove('input-success'));
				
				setTimeout(() => {
					this.form_btn.classList.remove('input-error');
					p.remove();
				}, 2000);
			}
		}

		if(alertType === 'success') {
			// Remove error, so we have only one
			document.querySelectorAll('.regex-alert').forEach(error => error.remove());
			
			// Single input
			if(!multiple) {
				
				target.classList.remove('input-error');

				target.classList.add('input-success', 'input-filled');

				setTimeout(() => target.classList.remove('input-success'), 1000);

			}
			else {
				// Add the regex alert to the DOM && other error styling to elements
				target.insertAdjacentElement('beforeend', p);
				p.classList.add('regex-success', 'regex-alert');
				this.form_btn.classList.add('input-success');

				// Reset the regex alert
				this.text_field.forEach(input => {
					input.classList.remove('input-error', 'input-filled');

					input.value = '';
				});
				
				setTimeout(() => {
					this.form_btn.classList.remove('input-success');
					p.remove();
				}, 2000);
			}

		}
	}
}

export const ui = new Ui();