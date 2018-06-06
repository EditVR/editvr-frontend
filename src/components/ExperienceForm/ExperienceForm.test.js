/**
 * @file ExperienceForm.test.js
 * Contains tests for ExperienceForm.js.
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ExperienceForm from './ExperienceForm.container';

describe('<ExperienceForm />', () => {
  it('Matches its snapshot', () => {
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
});
