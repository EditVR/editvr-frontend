/**
 * @file Home.test.js
 * Contains tests for Home.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import Home from './Home';

const ThemedHome = ThemeProvider(Home);

describe('<Dashboard />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      loadingBar: {
        default: 0
      }
    });
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <ThemedHome />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
