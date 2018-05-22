/**
 * @file Footer.test.js
 * Contains tests for Footer.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './Footer';

describe('<Footer />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<Footer />).toJSON()).toMatchSnapshot();
  });
});
