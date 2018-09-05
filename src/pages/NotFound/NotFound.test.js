/**
 * @file NotFound.test.js
 * Contains tests for NotFound.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<NotFound />).toJSON()).toMatchSnapshot();
  });
});
