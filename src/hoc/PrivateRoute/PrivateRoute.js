/**
 * @file PrivateRoute.js
 * Exports a route handler that makes a given page private.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  authentication,
  location,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const { accessToken, csrfToken, created, expiresIn } = authentication;

      // If the access token does not exist, or the token has expired, false.
      let isAuthenticated = true;
      if (
        !accessToken ||
        !csrfToken ||
        Date.now() - created > expiresIn * 1000
      ) {
        isAuthenticated = false;
      }

      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect push to={redirectTo} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string
  }).isRequired,
  authentication: PropTypes.shape({
    accessToken: PropTypes.string,
    created: PropTypes.number,
    expiresIn: PropTypes.number
  })
};

PrivateRoute.defaultProps = {
  authentication: {}
};

export default PrivateRoute;
