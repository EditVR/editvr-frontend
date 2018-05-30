/**
 * @file experiences.js
 * Exports reducers pertaining to experience state.
 */

import { EXPERIENCES_FETCH_FOR_USER } from '../constants';

/**
 * Default experience state.
 */
const defaultState = {
  loading: false,
  error: null,
  items: []
};

/**
 * Contains reducers for each experience-related state action.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Object containing a payload from a reducable action.
 *
 * @returns {object} - New state object with modifications detailed in action.
 */
export default function experiences(state = defaultState, action) {
  switch (action.type) {
    /**
     * Reducer that handles experience success actions.
     */
    case `${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`: {
      return {
        loading: false,
        error: null,
        items: action.payload
      };
    }
    case `${EXPERIENCES_FETCH_FOR_USER}_LOADING`: {
      return {
        loading: true,
        error: null,
        items: []
      };
    }
    case `${EXPERIENCES_FETCH_FOR_USER}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        items: []
      };
    }
    default:
      return state;
  }
}
