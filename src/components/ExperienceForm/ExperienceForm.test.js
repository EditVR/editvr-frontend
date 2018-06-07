/**
 * @file ExperienceForm.test.js
 * Contains tests for ExperienceForm.js.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ExperienceForm from './ExperienceForm.container';

describe('<ExperienceForm />', () => {
  it('Can be a Create form for Experiences', () => {
    const store = configureStore()({
      user: {
        error: null,
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      }
    });

    expect(
      renderer
        .create(
          <Router>
            <ExperienceForm store={store} />
          </Router>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('Can be an Edit form for Experiences', () => {
    const store = configureStore()({
      user: {
        error: null,
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      },
      experiences: {
        items: [
          {
            id: '10',
            title: 'test',
            body: {
              value: 'test'
            },
            field_experience_path: 'test'
          }
        ]
      }
    });

    expect(
      renderer
        .create(
          <Router>
            <ExperienceForm store={store} experienceSlug="test" />
          </Router>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('Executes its submit handler as expected.', () => {
    const submitFn = jest.fn();
    const store = configureStore()({
      user: {
        error: null,
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      }
    });

    const wrapper = mount(
      shallow(
        shallow(
          <Provider store={store}>
            <Router>
              <ExperienceForm submitHandler={submitFn} store={store} />
            </Router>
          </Provider>
        ).get(0)
      ).get(0)
    );

    wrapper.find('form').simulate('submit');
    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
