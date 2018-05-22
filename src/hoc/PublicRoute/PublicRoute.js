/**
 * @file PublicRoute.js
 * Exports a route handler that makes a given page exclusively public.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  authentication,
  location,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const { accessToken, created, expiresIn } = authentication;

      // If the access token does not exist, or the token has expired, false.
      let isAuthenticated = true;
      if (!accessToken || Date.now() - created > expiresIn * 1000) {
        isAuthenticated = false;
      }

      return isAuthenticated ? (
        <Redirect push to={redirectTo} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

PublicRoute.propTypes = {
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

PublicRoute.defaultProps = {
  authentication: {}
};

export default PublicRoute;
