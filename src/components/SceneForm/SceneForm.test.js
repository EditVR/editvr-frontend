/**
 * @file SceneForm.test.js
 * Contains tests for SceneForm.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import SceneForm from './SceneForm.container';

const ThemedSceneForm = ThemeProvider(SceneForm);

describe('<SceneForm />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        error: null,
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      },
      openExperience: {
        item: {
          field_experience_path: 'test',
          scenes: {
            test: {
              id: '10'
            }
          }
        }
      }
    });

    expect(
      createMount()(
        <Provider store={store}>
          <Router initialEntries={['/experience/vreditor/test/test']}>
            <Route
              path="/experience/vreditor/:experienceSlug/:sceneSlug?"
              component={ThemedSceneForm}
            />
          </Router>
        </Provider>
      ).html()
    ).toMatchSnapshot();
  });
});
