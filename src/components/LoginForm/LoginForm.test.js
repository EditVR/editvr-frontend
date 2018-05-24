/**
 * @file LoginForm.test.js
 * Contains tests for LoginForm.js.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
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

  it('Handles input correctly.', () => {
    const wrapper = mount(
      shallow(shallow(<LoginForm store={configureStore()({})} />).get(0)).get(0)
    );

    const username = wrapper.find('TextField').find('input#username');
    username.instance().value = 'test';
    username.simulate('change');

    const password = wrapper.find('TextField').find('input#password');
    password.instance().value = 'test';
    password.simulate('change');

    expect(wrapper.state('username')).toBe('test');
    expect(wrapper.state('password')).toBe('test');
  });

  it('Executes its submit handler as expected.', () => {
    const submitFn = jest.fn();
    const wrapper = mount(
      shallow(
        shallow(
          <LoginForm submitHandler={submitFn} store={configureStore()({})} />
        ).get(0)
      ).get(0)
    );

    wrapper.find('form').simulate('submit');
    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
