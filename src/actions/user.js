/**
 * @file user.js
 * Exports actions related to user.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR
} from '../constants';
import { getAccessToken, getCsrfToken } from '../lib/api';
import actionGenerator from '../lib/actionGenerator';

/**
 * Dispatches actions that grab an access and CSRF token for the specified user.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.username - Name of the user that should be authenticated.
 * @param {string} payload.password - Password of user that should be authenticated.
 */
export function* userLogIn({ username, password }) {
  yield* actionGenerator(USER_LOG_IN, function* userLogInHandler() {
    const auth = yield call(getAccessToken, username, password);
    const { accessToken, refreshToken, expiresIn } = auth || {};
    const csrfToken = yield call(getCsrfToken, accessToken);
    yield put({
      type: `${USER_LOG_IN}_SUCCESS`,
      payload: {
        created: Date.now(),
        username,
        accessToken,
        refreshToken,
        csrfToken,
        expiresIn,
        role: USER_ROLE_EDITOR
      }
    });
  });
}

/**
 * Logs the current user out.
 */
export function* userLogOut() {
  yield put({
    type: USER_LOG_OUT
  });
}

/**
 * Sets the user role.
 *
 * @param {string} role - Role that should be assigned to the current user.
 */
export function* userSetRole(role) {
  yield put({
    type: USER_SET_ROLE,
    payload: {
      role
    }
  });
}

export function* watchUserActions() {
  yield takeLatest(USER_LOG_IN, userLogIn);
  yield takeLatest(USER_LOG_OUT, userLogIn);
  yield takeLatest(USER_SET_ROLE, userLogIn);
}
