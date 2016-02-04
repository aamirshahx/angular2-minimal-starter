import { bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';

import { HelloWorldComponent } from './components/hello/hello';

let providers: Array<any> = [
	HTTP_PROVIDERS
];

bootstrap(HelloWorldComponent, []);
