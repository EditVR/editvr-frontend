/**
 * @file Logout.test.js
 * Contains tests for Logout.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import Logout from './Logout.container';

describe('<Logout />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      user: {
        uid: '1',
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      }
    });
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router>
              <Logout />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
