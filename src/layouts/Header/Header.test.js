/**
 * @file Header.test.js
 * Contains tests for Header.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

describe('<Header />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<Header />).toJSON()).toMatchSnapshot();
  });
});
