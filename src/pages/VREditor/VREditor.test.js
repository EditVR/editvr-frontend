/**
 * @file VREditor.test.js
 * Contains tests for VREditor.js.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from '../../hoc';
import VREditor from './VREditor.container';

const ThemedVREditor = ThemeProvider(VREditor);

describe('<VREditor />', () => {
  it('Matches its snapshot', () => {
    const store = configureStore()({
      loadingBar: {
        default: 0
      },
      user: {
        uid: '10',
        authentication: {
          accessToken: 'token',
          csrfToken: 'token'
        }
      },
      openExperience: {
        item: {
          title: 'test'
        }
      }
    });
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router initialEntries={['/experience/vreditor/test/test']}>
              <Route
                path="/experience/vreditor/:experienceSlug/:sceneSlug?"
                component={ThemedVREditor}
              />
            </Router>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
