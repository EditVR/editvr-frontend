/**
 * @file ToolsMenu.test.js
 * Contains tests for ToolsMenu.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';

import { ThemeProvider } from '../../hoc';
import ToolsMenu from './ToolsMenu.container';

const ThemedToolsMenu = ThemeProvider(ToolsMenu);

describe('<ToolsMenu />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      },
      openExperience: {
        item: {
          title: 'test',
          field_experience_path: 'test',
          scenes: {
            test: {
              id: '10',
              field_slug: 'test'
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
              component={ThemedToolsMenu}
            />
          </Router>
        </Provider>
      ).html()
    ).toMatchSnapshot();
  });
});
