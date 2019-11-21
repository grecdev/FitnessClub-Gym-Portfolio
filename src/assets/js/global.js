"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (function() {

	function init() {
		// Event listeners
		window.addEventListener('scroll', scroll);
		
		document.addEventListener('DOMContentLoaded', load);

		// In case we have multiple fields that only requires numbers
		// Only need to add .letter-disabled class and everything works properly :)
		ui.letter_disabled.forEach(input => {

			input.addEventListener('keydown', (e) => {

				ui.disableLetters(e);

				e.stopPropagation();
			});

		});

		ui.text_field.forEach(input => {

			input.addEventListener('blur', (e) => {

				ui.regexValidation(e);

				e.stopPropagation();
			});

		});

		// Only on pages that have reset scroll btn
		if(document.body.contains(ui.resetScroll_btn)) ui.resetScroll_btn.addEventListener('click', resetScroll);

		// Function helpers
		function scroll(e) {
			// Header animation on scroll
			ui.headerAnimation(e);

			// Image parallax scrolling effect
			ui.parallaxImage(e);

			ui.resetScrollBtn(e);

			e.stopPropagation();
		}

		function load(e) {
			// Image parallax scrolling effect
			ui.parallaxImage(e);

			ui.headerAnimation(e);
			
			e.stopPropagation();
		}

		// Reset scroll
		function resetScroll(e) {

			// Reset scroll btn
			ui.resetScrollBtn(e);
			
			e.stopPropagation();
		}
	}

	return {
		init
	}
})();