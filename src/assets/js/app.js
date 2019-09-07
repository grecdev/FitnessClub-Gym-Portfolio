"use strict";

import "../css/style.scss";

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