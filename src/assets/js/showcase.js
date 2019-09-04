"use strict";
// Individual functionality for header

import { ui } from './ui.js';

export const showcaseFunctionality = (() => {

	function init() {
		// Event Listeners
		document.querySelector('.showcase-selection').addEventListener('click', slide);
		document.querySelector('.showcase-selection').addEventListener('mouseover', slide);
		document.querySelector('.showcase-selection').addEventListener('mouseout', slide);

		// Function helpers
		function slide(e) {

			// Active slider
			ui.activeSlider(e);

			// Change slider
			ui.changeSlider(e);

			e.stopPropagation();
		}
	}
	
	return {
		init
	}
})();