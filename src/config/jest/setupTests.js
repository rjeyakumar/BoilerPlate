/* eslint-disable import/no-extraneous-dependencies */

import 'isomorphic-fetch';
import localStorage from 'mock-local-storage'

global.window = document.defaultView;
global.navigator = window.navigator;
global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;
global.fetch = require('jest-fetch-mock');
