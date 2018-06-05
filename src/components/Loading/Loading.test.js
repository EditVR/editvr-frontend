/**
 * @file Loading.test.js
 * Contains tests for Loading.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '../../hoc';
import Loading from './Loading';

const ThemedLoading = ThemeProvider(Loading);

describe('<Loading />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<ThemedLoading />).toJSON()).toMatchSnapshot();
  });
});
