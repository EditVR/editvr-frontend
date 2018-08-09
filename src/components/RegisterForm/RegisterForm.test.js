/**
 * @file RegisterForm.test.js
 * Contains tests for RegisterForm.js.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
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

  it('Executes its submit handler as expected.', () => {
    const submitFn = jest.fn();
    const store = configureStore()({
      user: {
        error: null
      }
    });

    const wrapper = mount(
      shallow(
        shallow(<RegisterForm submitHandler={submitFn} store={store} />).get(0)
      ).get(0)
    );

    wrapper.find('form').simulate('submit');
    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
