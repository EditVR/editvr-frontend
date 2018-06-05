/**
 * @file DashboardLayout.test.js
 * Contains tests for DashboardLayout.js.
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import DashboardLayout from './DashboardLayout';

describe('<DashboardLayout />', () => {
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
            <Router>
              <DashboardLayout>
                <div>child</div>
              </DashboardLayout>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
