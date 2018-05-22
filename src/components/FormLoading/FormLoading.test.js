/**
 * @file FormLoading.test.js
 * Contains tests for FormLoading.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '../../hoc';
import FormLoading from './FormLoading';

const ThemedFormLoading = ThemeProvider(FormLoading);

describe('<FormLoading />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<ThemedFormLoading />).toJSON()).toMatchSnapshot();
  });
});
