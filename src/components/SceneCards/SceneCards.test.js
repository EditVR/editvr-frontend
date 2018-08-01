/**
 * @file SceneCards.test.js
 * Contains tests for SceneCards.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';

import { ThemeProvider } from '../../hoc';
import SceneCards from './SceneCards.container';

const ThemedSceneCards = ThemeProvider(SceneCards);

describe('<SceneCards />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      openExperience: {
        item: {
          title: 'test',
          field_experience_path: 'test',
          scenes: {
            test: {
              id: '10',
              title: 'test',
              field_slug: 'test',
              field_photosphere: {
                meta: {
                  derivatives: {
                    sc: 'https://image.path'
                  }
                }
              }
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
              component={ThemedSceneCards}
            />
          </Router>
        </Provider>
      ).html()
    ).toMatchSnapshot();
  });
});
