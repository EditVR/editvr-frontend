/**
 * @file component.js
 * Exports reducers pertaining to component state.
 */

import { COMPONENT_SELECT } from '../constants';

/**
 * Default user state.
 */
const defaultState = {
  id: null
};

/**
 * Contains reducers for each component-related state action.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Object containing a payload from a reducable action.
 *
 * @returns {object} - New state object with modifications detailed in action.
 */
export default function component(state = defaultState, action) {
  switch (action.type) {
    /**
     * Reducer that handles component selection.
     */
    case `${COMPONENT_SELECT}_SUCCESS`: {
      const { id } = action.payload;
      return { id };
    }

    /**
     * Default reducer that returns defaulted state.
     */
    default:
      return state;
  }
}
