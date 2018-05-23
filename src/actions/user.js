/**
 * @file user.js
 * Exports actions related to user.
 */

import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR
} from '../constants';
import { getAccessToken, getCsrfToken } from '../lib/api';

/**
 * Dispatches actions that grab an access and CSRF token for the specified user.
 *
 * @param {string} username - Name of the user that should be authenticated.
 * @param {string} password - Password of user that should be authenticated.
 */
export const logUserIn = (username, password) => async dispatch => {
  const { accessToken, refreshToken, expiresIn } = await getAccessToken(
    username,
    password
  );
  const csrfToken = await getCsrfToken({ accessToken });
  return dispatch({
    type: USER_LOG_IN,
    created: Date.now(),
    username,
    accessToken,
    refreshToken,
    csrfToken,
    expiresIn,
    role: USER_ROLE_EDITOR
  });
};

/**
 * Logs the current user out.
 */
export const logUserOut = () => ({
  type: USER_LOG_OUT
});

/**
 * Sets the user role.
 *
 * @param {string} role - Role that should be assigned to the current user.
 */
export const setUserRole = role => ({
  type: USER_SET_ROLE,
  role
});
