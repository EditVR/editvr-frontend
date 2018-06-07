/**
 * @file VREditorLayout.test.js
 * Contains tests for VREditorLayout.js.
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import VREditorLayout from './VREditorLayout';

describe('<VREditorLayout />', () => {
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
              <VREditorLayout
                title="Edit Test Experience"
                leftAside="Left Sidebar"
                rightAside="Right Sidebar"
              >
                Middle Area (for VR scenes woot!).
              </VREditorLayout>
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
