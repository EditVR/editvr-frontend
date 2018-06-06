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

/**
 * Default user state.
 */
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

/**
 * Contains reducers for each user-related state action.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Object containing a payload from a reducable action.
 *
 * @returns {object} - New state object with modifications detailed in action.
 */
export default function user(state = defaultState, action) {
  switch (action.type) {
    /**
     * Reducer that handles user login actions.
     */
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

      // Parse UID out of access token.
      let uid = null;
      if (accessToken) {
        uid = JSON.parse(atob(accessToken.split('.')[1])).sub;
      }

      return {
        username,
        uid,
        loading: false,
        error: null,
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

    /**
     * Reducer that handles login failure actions.
     */
    case `${USER_LOG_IN}_FAIL`: {
      return { ...state, loading: false, error: action.payload.error };
    }

    /**
     * Reducer that handles login loading actions.
     */
    case `${USER_LOG_IN}_LOADING`: {
      return { ...state, error: null, loading: true };
    }

    /**
     * Reducer that handles user logout actions.
     */
    case `${USER_LOG_OUT}_SUCCESS`: {
      return defaultState;
    }

    /**
     * Reducer that handles setting a user's role.
     */
    case `${USER_SET_ROLE}_SUCCESS`: {
      const { role } = action.payload;
      return { ...state, authentication: { ...state.authentication, role } };
    }

    /**
     * Default reducer that returns defaulted state.
     */
    default:
      return state;
  }
}
