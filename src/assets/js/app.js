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

import { headerFunctionality } from './index/header.js';
import { showcaseFunctionality } from './index/showcase.js';
import { globalFunctionality } from './global.js';
import { servicesPage } from './services page/services.js';

globalFunctionality.init();

// Index page
headerFunctionality.init();
showcaseFunctionality.init();

// Services page
servicesPage.init();
