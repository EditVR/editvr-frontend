/**
 * @file VREditor.test.js
 * Contains tests for VREditor.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import VREditor from './VREditor';

const ThemedVREditor = ThemeProvider(VREditor);

describe('<VREditor />', () => {
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
              <ThemedVREditor />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
