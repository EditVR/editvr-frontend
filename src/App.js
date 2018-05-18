/**
 * @file App.js
 * Exports a React component that handles routing.
 */

import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { Home } from './pages';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </Fragment>
);

export default App;
