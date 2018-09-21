/**
 * @file ForgotPasswordForm.test.js
 * Contains tests for ForgotPasswordForm.js.
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ForgotPasswordForm from './ForgotPasswordForm.container';

describe('<ForgotPasswordForm />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        error: null
      }
    });

    expect(
      renderer
        .create(
          <Router>
            <ForgotPasswordForm store={store} />
          </Router>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
