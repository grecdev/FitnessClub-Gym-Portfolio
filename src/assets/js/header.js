"use strict";
// Individual functionality for header

import { ui } from './ui.js';
import jump from 'jump.js'

export const headerFunctionality = (function() {

	function init() {
		// Event listeners
		ui.header.addEventListener('click', headerFunctionality);
		ui.header.addEventListener('mousedown', headerFunctionality);
		ui.header.addEventListener('mouseup', headerFunctionality);

		// Function helpers
		// Header functionality
		function headerFunctionality(e) {

			// Active page / link
			ui.activePage(e);

			// Smooth navigation
			ui.smoothScroll(e, jump);

			e.stopPropagation();
		}
	}

	return {
		init
	}
})();