/**
 * @file ForgotPasswordForm.test.js
 * Contains tests for ForgotPasswordForm.js.
 */

import React from 'react';
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
      renderer.create(<ForgotPasswordForm store={store} />).toJSON()
    ).toMatchSnapshot();
  });
});
