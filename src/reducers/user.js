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

export default function user(state = { authentication: {} }, action) {
  switch (action.type) {
    case USER_LOG_IN: {
      const {
        accessToken = null,
        expiresIn = null,
        refreshToken = null,
        created = null,
        username = null,
        csrfToken = null,
        role = USER_ROLE_ANONYMOUS
      } = action;

      // Parse UID out of access token.
      let uid = null;
      if (accessToken) {
        uid = JSON.parse(atob(accessToken.split('.')[1])).sub;
      }

      return {
        username,
        uid,
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
