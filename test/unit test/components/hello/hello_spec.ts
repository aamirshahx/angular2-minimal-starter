import {
	it,
	inject,
	injectAsync,
	beforeEachProviders,
	TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import { HelloWorldComponent } from './../../../../app/components/hello/hello';

describe('Tab', () => {
	// provide our implementations or mocks to the dependency injector
	beforeEachProviders(() => [HelloWorldComponent]);

	it('should have return true', inject([HelloWorldComponent], (hello: HelloWorldComponent) => {
		expect(true).toEqual(true);
	}));
});
