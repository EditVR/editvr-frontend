/**
 * @file App.js
 * Exports a React component that handles routing.
 */

import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { Home } from './pages';

import muiTheme from './styles/muiTheme';

const App = () => (
  <Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </MuiThemeProvider>
  </Fragment>
);

export default App;
