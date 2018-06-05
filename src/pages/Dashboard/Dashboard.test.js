/**
 * @file Dashboard.test.js
 * Contains tests for Dashboard.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../../hoc';
import Dashboard from './Dashboard';

const ThemedDashboard = ThemeProvider(Dashboard);

describe('<Dashboard />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      loadingBar: {
        default: 0
      }
    });
    expect(
      renderer
        .create(
          <Provider store={store}>
            <ThemedDashboard />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
