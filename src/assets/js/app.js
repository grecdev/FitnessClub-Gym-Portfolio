"use strict";

/* 
	For development:
	1. SASS > CSS
	2. CSS > JS
	3. JS > DOM

	For production:
	1. SASS > CSS
	2. CSS > JS
	3. CSS > CSS.min and link in html file
*/ 
import "../css/style.scss";

// Fetch for Safari 6.1+ / Internet Explorer 10+ => https://github.com/github/fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

import { headerFunctionality } from './index_page/header.js';
import { globalFunctionality } from './global.js';
import { servicesPage } from './services_page/services.js';
import { contactPage } from './contact_page/contact.js';

globalFunctionality.init();

// Index page
headerFunctionality.init();

servicesPage.init();
contactPage.init();
