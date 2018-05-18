/**
 * @file App.test.js
 * Contains tests for App.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<App />).toJSON()).toMatchSnapshot();
  });
});
