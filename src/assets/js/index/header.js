"use strict";
// Individual functionality for header

import { ui } from '../ui.js';

export const headerFunctionality = (function() {

	function init() {
		// Event listeners
		// Because on the login page we don't have any header and errors will occur :)
		if(document.body.contains(ui.header)) {
			ui.header.addEventListener('click', headerFunctionality);
			ui.header.addEventListener('mousedown', headerFunctionality);
			ui.header.addEventListener('mouseup', headerFunctionality);
		}

		// Function helpers
		// Header functionality
		function headerFunctionality(e) {

			// Active page / link
			ui.activePage(e);

			// Smooth navigation
			ui.smoothScroll(e);
			
			e.stopPropagation();
		}
	}

	return {
		init
	}
})();