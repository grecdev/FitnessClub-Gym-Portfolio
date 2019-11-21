"use strict";

import { ui } from '../ui.js';

export const contactPage = (function () {

	function init() {
		
		if(location.pathname.includes('contact')) {

			ui.contact_form.addEventListener('submit', (e) => {
		
				ui.regexValidation(e);
		
				e.preventDefault();
				e.stopPropagation();
			});
		
		}

	}

	return {
		init
	}
})();

