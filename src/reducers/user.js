/**
 * @file user.js
 * Exports reducers pertaining to user state.
 */

import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_ANONYMOUS
} from '../constants';

const defaultState = {
  username: null,
  uid: null,
  loading: false,
  error: null,
  authentication: {
    accessToken: null,
    expiresIn: null,
    refreshToken: null,
    created: null,
    csrfToken: null,
    role: USER_ROLE_ANONYMOUS
  }
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case `${USER_LOG_IN}_SUCCESS`: {
      const {
        accessToken = null,
        expiresIn = null,
        refreshToken = null,
        created = null,
        username = null,
        csrfToken = null,
        role = USER_ROLE_ANONYMOUS
      } = action.payload;

      const { error, loading } = action;

      // Parse UID out of access token.
      let uid = null;
      if (accessToken) {
        uid = JSON.parse(atob(accessToken.split('.')[1])).sub;
      }

      return {
        username,
        uid,
        loading,
        error,
        authentication: {
          accessToken,
          refreshToken,
          csrfToken,
          expiresIn,
          created,
          role
        }
      };
    }
    case `${USER_LOG_IN}_FAIL`:
    case `${USER_LOG_IN}_LOADING`: {
      const { error, loading } = action;
      return Object.assign({}, defaultState, {
        loading,
        error
      });
    }
    case USER_LOG_OUT: {
      return {
        authentication: {
          accessToken: false
        }
      };
    }
    case USER_SET_ROLE: {
      const { role } = action;
      return Object.assign({}, state, {
        authentication: {
          role
        }
      });
    }
    default:
      return state;
  }
}
