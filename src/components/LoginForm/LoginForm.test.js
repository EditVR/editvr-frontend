/**
 * @file LoginForm.test.js
 * Contains tests for LoginForm.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import LoginForm from './LoginForm.container';

describe('<LoginForm />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({});
    expect(
      renderer
        .create(
          <Provider store={store}>
            <LoginForm />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
