/**
 * @file App.js
 * Exports a React component that handles routing.
 */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { Home, Login } from '../../pages';
import { PrivateRoute, PublicRoute } from '../../hoc';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Home} />
      </Fragment>
    </Router>
  </Fragment>
);

export default App;
