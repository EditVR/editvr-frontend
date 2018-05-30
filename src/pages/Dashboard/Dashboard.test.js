/**
 * @file Dashboard.test.js
 * Contains tests for Dashboard.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import Dashboard from './Dashboard.container';

const ThemedDashboard = ThemeProvider(Dashboard);

describe('<Dashboard />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        uid: '1',
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      },
      experiences: {
        loading: false,
        error: null,
        items: [
          {
            title: 'test experience',
            body: {
              value: 'this is a test experience'
            },
            field_experience_path: 'test'
          }
        ]
      },
      loadingBar: {
        default: 0
      }
    });
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <ThemedDashboard />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
