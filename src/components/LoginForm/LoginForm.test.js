/**
 * @file LoginForm.test.js
 * Contains tests for LoginForm.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('Matches its snapshot', () => {
    expect(
      renderer
        .create(
          <LoginForm />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
