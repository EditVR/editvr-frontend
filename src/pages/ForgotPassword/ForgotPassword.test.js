/**
 * @file Register.test.js
 * Contains tests for Register.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import ForgotPassword from './ForgotPassword';

const ThemedForgotPassword = ThemeProvider(ForgotPassword);

describe('<ForgotPassword />', () => {
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
              <ThemedForgotPassword />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
