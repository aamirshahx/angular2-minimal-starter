import 'es6-shim';
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';
import 'es7-reflect-metadata/dist/browser';
import { enableProdMode } from 'angular2/core';

if ('production' === process.env.NODE_ENV) {
	enableProdMode();
} else {
	Error['stackTraceLimit'] = Infinity;
	Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/http';
import 'angular2/core';
import 'rxjs';
