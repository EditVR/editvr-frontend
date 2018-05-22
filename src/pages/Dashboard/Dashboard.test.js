/**
 * @file Dashboard.test.js
 * Contains tests for Dashboard.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '../../hoc';
import Dashboard from './Dashboard';

const ThemedDashboard = ThemeProvider(Dashboard);

describe('<Dashboard />', () => {
  it('Matches its snapshot', () => {
    expect(renderer.create(<ThemedDashboard />).toJSON()).toMatchSnapshot();
  });
});
