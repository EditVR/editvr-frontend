/**
 * @file PublicRoute.test.js
 * Contains tests for PublicRoute.js.
 */

import React, { Fragment } from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PublicRoute from './PublicRoute.container';

describe('<PublicRoute />', () => {
  it('If a user is not authenticated, PublicRoute will render its specified component.', () => {
    const store = configureStore()({
      user: {
        authentication: {}
      }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router initialEntries={['/dashboard']}>
              <Fragment>
                <PublicRoute
                  path="/dashboard"
                  component={() => <div>test component</div>}
                />
              </Fragment>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('If a user is authenticated, PublicRoute will redirect to the user dashboard.', () => {
    const store = configureStore()({
      user: {
        authentication: {
          accessToken: 'stub',
          refreshToken: 'stub',
          csrfToken: 'stub',
          expiresIn: 30000,
          created: Date.now()
        }
      }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router initialEntries={['/dashboard']}>
              <Fragment>
                <PublicRoute
                  path="/dashboard"
                  component={() => <div>test component</div>}
                />
              </Fragment>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
