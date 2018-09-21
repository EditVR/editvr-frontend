/**
 * @file LoginForm.test.js
 * Contains tests for LoginForm.js.
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm.container';

describe('<LoginForm />', () => {
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
            <LoginForm store={store} />
          </Router>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('Executes its submit handler as expected.', () => {
    const submitFn = jest.fn();
    const store = configureStore()({
      user: {
        error: null
      }
    });

    const wrapper = mount(
      <Router>
        <LoginForm submitHandler={submitFn} store={store} />
      </Router>
    );

    wrapper.find('form').simulate('submit');
    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
