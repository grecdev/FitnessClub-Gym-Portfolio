"use strict";

import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { headerFunctionality } from './header.js';
import { showcaseFunctionality } from './showcase.js';

headerFunctionality.init();

showcaseFunctionality.init();