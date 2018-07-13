/**
 * @file ToolsMenu.test.js
 * Contains tests for ToolsMenu.js.
 */

import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { createMount } from '@material-ui/core/test-utils';

import { ThemeProvider } from '../../hoc';
import ToolsMenu from './ToolsMenu.container';

const ThemedToolsMenu = ThemeProvider(ToolsMenu);

describe('<ToolsMenu />', () => {
  it('Matches its snapshot', () => {
    expect(
      createMount()(
        <Router initialEntries={['/experience/vreditor/test/test']}>
          <Route
            path="/experience/vreditor/:experienceSlug/:sceneSlug?"
            component={ThemedToolsMenu}
          />
        </Router>
      ).html()
    ).toMatchSnapshot();
  });
});
