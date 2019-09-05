"use strict";

import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { headerFunctionality } from './header.js';
import { showcaseFunctionality } from './showcase.js';
import { globalFunctionality } from './global.js';


globalFunctionality.init();

headerFunctionality.init();

showcaseFunctionality.init();