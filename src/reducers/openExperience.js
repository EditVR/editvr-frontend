/**
 * @file openExperience.js
 * Exports reducers pertaining to openExperience state.
 */

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
  OPEN_EXPERIENCE_COMPONENT_EDIT
} from '../constants';

/**
 * Default experience state.
 */
const defaultState = {
  loading: false,
  error: null,
  item: null
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

    /**
     * Reducer that handles scene edit success actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`: {
      const { payload: scene } = action;
      const {
        title,
        body: { value: body },
        field_slug
      } = scene;

      const newItem = Object.assign({}, state.item);
      const newScene = Object.assign({}, newItem.scenes[field_slug], {
        title,
        body,
        field_slug
      });

      newItem.scenes[field_slug] = newScene;
      return {
        loading: false,
        error: null,
        item: newItem
      };
    }

    /**
     * Reducer that handles scene edit loading actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_EDIT}_LOADING`: {
      return {
        loading: true,
        error: null,
        item: state.item
      };
    }

    /**
     * Reducer that handles scene edit failure actions.
     */
    case `${OPEN_EXPERIENCE_SCENE_EDIT}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        item: state.item
      };
    }

    /**
     * Reducer that handles component field presaves.
     */
    case `${OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE}_SUCCESS`: {
      const { fieldName, fieldValue, sceneSlug, component } = action.payload;
      // Create a new component based on the old one, and pass in a new value
      // for the field that is being pre-saved.
      const newItem = Object.assign({}, state.item);
      const newComponent = Object.assign(
        {},
        newItem.scenes[sceneSlug].components[component],
        {
          [fieldName]: fieldValue
        }
      );

      // Swap out the old component for the new.
      newItem.scenes[sceneSlug].components[component] = newComponent;
      return {
        loading: false,
        error: null,
        item: newItem
      };
    }

    /**
     * Reducer that handles component edit loading actions.
     */
    case `${OPEN_EXPERIENCE_COMPONENT_EDIT}_LOADING`: {
      return {
        loading: true,
        error: null,
        item: state.item
      };
    }

    /**
     * Reducer that handles component field edits.
     */
    case `${OPEN_EXPERIENCE_COMPONENT_EDIT}_SUCCESS`: {
      const {
        id,
        field_x,
        field_y,
        field_z,
        title,
        field_body,
        sceneSlug
      } = action.payload;

      const newItem = Object.assign({}, state.item);
      const newComponent = Object.assign(
        {},
        newItem.scenes[sceneSlug].components[id],
        {
          title,
          field_body,
          field_x,
          field_y,
          field_z
        }
      );

      // Swap out the old component for the new.
      newItem.scenes[sceneSlug].components[id] = newComponent;
      return {
        loading: false,
        error: null,
        item: newItem
      };
    }

    /**
     * Reducer that handles component field edit failure.
     */
    case `${OPEN_EXPERIENCE_COMPONENT_EDIT}_FAIL`: {
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
