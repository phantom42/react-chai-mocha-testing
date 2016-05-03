import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// set up testing environment to run like a browser in the command line
// sets up fake document instance
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// sets up fake window instance
global.window = global.document.defaultView;
// tell jquery to use fake instances instead of trying to find real ones
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state){
  // props for passing directly into component
  // state = application state to inject into redux store
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass { ...props } />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); //actually produces html
}

// build helper for simulating events
//.fn injects the function to all jquery objects
$.fn.simulate = function(eventName, value){
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

// setup chai-jquery
chaiJquery(chai, chai.util, $); // from docs

export { renderComponent, expect };