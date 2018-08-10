/**
 * @file RegisterForm.test.js
 * Contains tests for RegisterForm.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import RegisterForm from './RegisterForm.container';

describe('<RegisterForm />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        error: null
      }
    });

    expect(
      renderer.create(<RegisterForm store={store} />).toJSON()
    ).toMatchSnapshot();
  });
});
