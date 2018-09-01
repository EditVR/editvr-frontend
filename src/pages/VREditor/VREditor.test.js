/**
 * @file VREditor.test.js
 * Contains tests for VREditor.js.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { createMount } from '@material-ui/core/test-utils';
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
        username: 'bender',
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
      createMount()(
        <Provider store={store}>
          <Router initialEntries={['/experience/vreditor/test']}>
            <Route
              path="/experience/vreditor/:experienceSlug"
              component={ThemedVREditor}
            />
          </Router>
        </Provider>
      ).html()
    ).toMatchSnapshot();
  });
});
