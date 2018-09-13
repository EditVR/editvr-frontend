/**
 * @file user.js
 * Exports actions related to user.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR,
  USER_REGISTER
} from '../constants';
import { getAccessToken, getCsrfToken, registerUserAccount } from '../lib/api';
import actionGenerator from '../lib/actionGenerator';

/**
 * Dispatches actions that grab an access and CSRF token for the specified user.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.username - Name of the user that should be authenticated.
 * @param {string} payload.password - Password of user that should be authenticated.
 * @param {string} payload.created - Optional creation date for this authentication.
 * @param {function} payload.successHandler - Function to be executed on success.
 */
export function* userLogIn({
  username,
  password,
  created = Date.now(),
  successHandler = () => {}
}) {
  yield* actionGenerator(
    USER_LOG_IN,
    function* userLogInHandler() {
      const auth = yield call(getAccessToken, username, password);
      const { accessToken, refreshToken, expiresIn } = auth || {};
      const csrfToken = yield call(getCsrfToken, accessToken);
      yield put({
        type: `${USER_LOG_IN}_SUCCESS`,
        payload: {
          created,
          username,
          accessToken,
          refreshToken,
          csrfToken,
          expiresIn,
          role: USER_ROLE_EDITOR
        }
      });
    },
    successHandler
  );
}

/**
 * Logs the current user out.
 */
export function* userLogOut() {
  yield put({
    type: `${USER_LOG_OUT}_SUCCESS`
  });
}

/**
 * Registers a user.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.username - Name of the user that will be registered.
 * @param {string} payload.email - Email of the user that will be registered.
 * @param {string} payload.password - Password of user that will be registered.
 * @param {function} payload.successHandler - Function to be executed on success.
 * @param {function} payload.errorHandler - Function to be executed on error.
 */
export function* userRegister({
  username,
  email,
  password,
  successHandler = () => {},
  errorHandler = () => {},
}) {
  yield* actionGenerator(
    USER_REGISTER,
    function* userRegisterHandler() {
      yield call(registerUserAccount, username, email, password);
      yield put({
        type: `${USER_REGISTER}_SUCCESS`,
        payload: {
          username,
          email
        }
      });
    },
    successHandler,
    errorHandler
  );
}

/**
 * Sets the user role.
 *
 * @param {string} role - Role that should be assigned to the current user.
 */
export function* userSetRole(role) {
  yield put({
    type: `${USER_SET_ROLE}_SUCCESS`,
    payload: {
      role
    }
  });
}

export function* watchUserActions() {
  yield takeLatest(USER_LOG_IN, userLogIn);
  yield takeLatest(USER_LOG_OUT, userLogOut);
  yield takeLatest(USER_SET_ROLE, userSetRole);
  yield takeLatest(USER_REGISTER, userRegister);
}
