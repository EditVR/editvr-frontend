/**
 * @file Login.test.js
 * Contains tests for Login.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import Login from './Login';

const ThemedLogin = ThemeProvider(Login);

describe('<Login />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      loadingBar: {
        default: 0
      },
      user: {
        error: null
      }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <ThemedLogin />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
