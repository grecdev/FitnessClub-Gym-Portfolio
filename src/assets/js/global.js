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

			ui.scrollFunctionality(e);
			
			e.stopPropagation();
		}

		function load(e) {
			// Image parallax scrolling effect
			ui.parallaxImage(e);

			ui.scrollFunctionality(e);

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