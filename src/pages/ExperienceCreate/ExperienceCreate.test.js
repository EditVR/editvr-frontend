/**
 * @file ExperienceCreate.test.js
 * Contains tests for ExperienceCreate.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import ExperienceCreate from './ExperienceCreate';

const ThemedExperienceCreate = ThemeProvider(ExperienceCreate);

describe('<ExperienceCreate />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      loadingBar: {
        default: 0
      },
      user: {
        authentication: {
          accessToken: 'token',
          csrfToken: 'token'
        }
      }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <ThemedExperienceCreate />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
