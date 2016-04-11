import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// use describe to group together similar tests
//descriptive string. does not need to match anything
describe('App', () => {

	// use 'it' to test a single attribute of a target
	// explanation of test
	it('shows the correct text', () =>{

		// create an instance of app
		const component = renderComponent(App);

		// use expect to make an assertion about a target
		expect(component).to.contain('React simple starter');
	}); 

	
}); 

