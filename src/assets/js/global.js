"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (function() {

	function init() {
		// Event listeners
		window.addEventListener('scroll', scroll);
		
		document.addEventListener('DOMContentLoaded', load);

		// Only on pages that have reset scroll btn
		if(document.body.contains(ui.resetScroll_btn)) ui.resetScroll_btn.addEventListener('click', resetScroll);

		// Function helpers
		function scroll(e) {
			// Header animation on scroll
			ui.headerScroll(e);

			// Image parallax scrolling effect
			ui.parallaxImage(e);

			// Reset scroll btn
			ui.resetScroll(e);

			// Reset header animation
			ui.mobileHeader(e);
			
			e.stopPropagation();
		}

		function load(e) {
			
			// Check the page we are on so the header should be always visible
			ui.headerPageVisible();

			// Image parallax scrolling effect
			ui.parallaxImage(e);

			// Reset header animation
			ui.mobileHeader(e);

			e.stopPropagation();
		}

		// Reset scroll
		function resetScroll(e) {

			// Reset scroll btn
			ui.resetScroll(e);
			
			e.stopPropagation();
		}
	}

	return {
		init
	}
})();