/**
 * @file App.test.js
 * Contains tests for App.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
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
            <App />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
