/**
 * @file App.js
 * Exports a React component that handles routing.
 */

import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import {
  Home,
  Login,
  Logout,
  Register,
  Dashboard,
  ExperienceCreate,
  ExperienceEdit,
  VREditor,
  VRViewer,
  NotFound
} from '../../pages';
import { PrivateRoute, PublicRoute } from '../../hoc';
import history from '../../lib/routerHistory';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/404" component={NotFound} />
        <PublicRoute
          exact
          path="/login"
          redirectTo="/dashboard"
          component={Login}
        />
        <PublicRoute
          exact
          path="/register"
          redirectTo="/dashboard"
          component={Register}
        />
        <PrivateRoute exact path="/logout" redirectTo="/" component={Logout} />
        <PrivateRoute
          exact
          path="/dashboard"
          redirectTo="/login"
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path="/experience/create"
          redirectTo="/login"
          component={ExperienceCreate}
        />
        <PrivateRoute
          exact
          path="/experience/edit/:experienceSlug"
          redirectTo="/login"
          component={ExperienceEdit}
        />
        <PrivateRoute
          exact
          path="/experience/vreditor/:experienceSlug/:sceneSlug?/:editorMode?"
          redirectTo="/login"
          component={VREditor}
        />
        <Route
          exact
          path="/experience/:username/:experienceSlug/:sceneSlug"
          component={VRViewer}
        />
      </Switch>
    </Router>
  </Fragment>
);

export default App;
