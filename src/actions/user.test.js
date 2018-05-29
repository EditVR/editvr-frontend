/**
 * @file user.test.js
 * Contains tests for user.js.
 */

import { testSaga } from 'redux-saga-test-plan';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

import { userLogIn, userLogOut, userSetRole } from './user';
import { getAccessToken, getCsrfToken } from '../lib/api';
import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR
} from '../constants';

describe('actions->user', () => {
  it('user->userLogIn()', () => {
    const username = 'test';
    const password = 'test';
    testSaga(userLogIn, { username, password })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${USER_LOG_IN}_LOADING`,
        payload: {},
        loading: true,
        error: null
      })
      .next()
      .call(getAccessToken, username, password)
      .next()
      .call(getCsrfToken, undefined)
      .next()
      .put({
        type: `${USER_LOG_IN}_SUCCESS`,
        payload: {
          created: Date.now(),
          username,
          accessToken: undefined,
          refreshToken: undefined,
          csrfToken: undefined,
          expiresIn: undefined,
          role: USER_ROLE_EDITOR
        },
        loading: false,
        error: null
      })
      .next()
      .put(hideLoading());
  });

  it('user->userLogOut()', () => {
    testSaga(userLogOut)
      .next()
      .put({
        type: USER_LOG_OUT,
        payload: {},
        loading: false,
        error: null
      })
      .next()
      .isDone();
  });

  it('user->userSetRole()', () => {
    testSaga(userSetRole, USER_ROLE_EDITOR)
      .next()
      .put({
        type: USER_SET_ROLE,
        payload: {
          role: USER_ROLE_EDITOR
        },
        loading: false,
        error: null
      })
      .next()
      .isDone();
  });
});
