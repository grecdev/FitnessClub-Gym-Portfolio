"use strict";
// Individual functionality for header

import { ui } from '../ui.js';

export const headerFunctionality = (function() {

	function init() {
		// Event listeners
		// Because on the login page we don't have any header and errors will occur :)
		if(document.body.contains(ui.header)) ui.header.addEventListener('click', headerFunctionality)

		// Function helpers
		// Header functionality
		function headerFunctionality(e) {
			
			// Smooth navigation
			ui.smoothScroll(e);

			// Show / Hide mobile header
			ui.mobileHeader(e);
			
			e.stopPropagation();
		}
	}

	return {
		init
	}
})();