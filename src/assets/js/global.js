"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (function() {

	function init() {
		// Event listeners
		window.addEventListener('scroll', scroll);
		
		document.addEventListener('DOMContentLoaded', load);

		// Function helpers
		function scroll(e) {

			// Scroll animation for header
			ui.headerScroll();

			requestAnimationFrame(ui.headerScroll);

			// Image parallax scrolling effect
			ui.parallaxImage();
			
			e.stopPropagation();
		}

		function load(e) {
			
			// Check the page we are on so the header should be always visible
			ui.headerPageVisible();
			
			e.stopPropagation();
		}
	}

	return {
		init
	}
})();