"use strict";
// Individual functionality for header

import { ui } from './ui.js';
import jump from 'jump.js'

export const headerFunctionality = (function() {

	function init() {
		// Event listeners
		document.getElementById('main-header').addEventListener('click', headerFunctionality);
		document.getElementById('main-header').addEventListener('mousedown', headerFunctionality);
		document.getElementById('main-header').addEventListener('mouseup', headerFunctionality);

		// Function helpers
		// Header functionality
		function headerFunctionality(e) {

			// Active page / link
			ui.activePage(e);

			ui.smoothScroll(e, jump);

			e.stopPropagation();
		}
	}

	return {
		init
	}
})();