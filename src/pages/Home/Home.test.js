/**
 * @file Home.test.js
 * Contains tests for Home.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import Home from './Home';

const ThemedHome = ThemeProvider(Home);

describe('<Dashboard />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(
          <Router>
            <ThemedHome />
          </Router>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
