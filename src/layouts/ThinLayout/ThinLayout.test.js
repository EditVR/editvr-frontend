/**
 * @file ThinLayout.test.js
 * Contains tests for ThinLayout.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ThinLayout from './ThinLayout';

describe('<ThinLayout />', () => {
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
            <ThinLayout>
              <div>child</div>
            </ThinLayout>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
