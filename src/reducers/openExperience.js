/**
 * @file openExperience.js
 * Exports reducers pertaining to openExperience state.
 */

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE
} from '../constants';

/**
 * Default experience state.
 */
const defaultState = {
  loading: false,
  error: null,
  item: {}
};

/**
 * Contains reducers for each open experience-related state action.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Object containing a payload from a reducable action.
 *
 * @returns {object} - New state object with modifications detailed in action.
 */
export default function openExperiences(state = defaultState, action) {
  switch (action.type) {
    /**
     * Reducer that handles experience fetch success actions.
     */
    case `${OPEN_EXPERIENCE_FETCH_FOR_USER}_SUCCESS`: {
      return {
        loading: false,
        error: null,
        item: action.payload[0]
      };
    }

    /**
     * Reducer that handles experience fetch loading actions.
     */
    case `${OPEN_EXPERIENCE_FETCH_FOR_USER}_LOADING`: {
      return {
        loading: true,
        error: null,
        item: {}
      };
    }

    /**
     * Reducer that handles experience fetch failure actions.
     */
    case `${OPEN_EXPERIENCE_FETCH_FOR_USER}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        item: {}
      };
    }

    /**
     * Reducer that handles scene create success actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_CREATE}_SUCCESS`: {
      return {
        loading: false,
        error: null,
        item: state.item
      };
    }

    /**
     * Reducer that handles scene create loading actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_CREATE}_LOADING`: {
      return {
        loading: true,
        error: null,
        item: state.item
      };
    }

    /**
     * Reducer that handles scene create failure actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_CREATE}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        item: state.item
      };
    }
    default:
      return state;
  }
}
