/**
 * @file App.js
 * Exports a React component that handles routing.
 */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { Home, Login, Dashboard } from '../../pages';
import { PrivateRoute, PublicRoute } from '../../hoc';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute
          exact
          path="/login"
          redirectTo="/dashboard"
          component={Login}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          redirectTo="/login"
          component={Dashboard}
        />
      </Switch>
    </Router>
  </Fragment>
);

export default App;
