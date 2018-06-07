/**
 * @file ExperienceEdit.test.js
 * Contains tests for ExperienceEdit.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import ExperienceEdit from './ExperienceEdit.container';

const ThemedExperienceEdit = ThemeProvider(ExperienceEdit);

describe('<ExperienceEdit />', () => {
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
      },
      experiences: {
        items: [
          {
            id: '10',
            title: 'test',
            field_experience_path: 'test'
          }
        ]
      }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router initialEntries={['/experience/edit/test']}>
              <Route
                path="/experience/edit/:experienceSlug"
                component={ThemedExperienceEdit}
              />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
