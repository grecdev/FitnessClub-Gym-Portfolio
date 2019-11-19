"use strict";

import { ui } from "../ui.js";

// Services page functionality
export const servicesPage = (() => {

	function init() {
		// Section smooth scroll navigation
		// Go downwards
		ui.downArrow.forEach(arrow => {
			arrow.addEventListener('click', e => {

				ui.smoothScroll(e);
				e.stopPropagation();
			});
		});

		// Go upwards
		ui.upArrow.forEach(arrow => {
			arrow.addEventListener('click', e => {

				ui.smoothScroll(e);
				e.stopPropagation();
			});
		});

	}

	return {
		init
	}
})();