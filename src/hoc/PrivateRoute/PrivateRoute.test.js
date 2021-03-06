/**
 * @file PrivateRoute.test.js
 * Contains tests for LoginForm.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Switch } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PrivateRoute from './PrivateRoute.container';

describe('<PrivateRoute />', () => {
  it('If a user is authenticated, PrivateRoute will render its specified component.', () => {
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
              <Switch>
                <PrivateRoute
                  path="/dashboard"
                  redirectTo="/login"
                  component={() => <div>test component</div>}
                />
              </Switch>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('If a user is not authenticated, PrivateRoute will redirect users to the specified redirect route.', () => {
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
              <Switch>
                <PrivateRoute
                  path="/dashboard"
                  redirectTo="/login"
                  component={() => <div>test component</div>}
                />
              </Switch>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
