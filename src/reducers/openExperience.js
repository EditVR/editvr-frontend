/**
 * @file openExperience.js
 * Exports reducers pertaining to openExperience state.
 */

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE
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
      const sceneIndex = state.item.field_scenes.findIndex(
        s => s.field_slug === scene.field_slug
      );

      const newItem = Object.assign({}, state.item);
      const newScene = Object.assign({}, newItem.field_scenes[sceneIndex], {
        title,
        body,
        field_slug
      });

      newItem.field_scenes[sceneIndex] = newScene;

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

      // Find the index of the specified scene.
      const sceneIndex = state.item.field_scenes.findIndex(
        s => s.field_slug === sceneSlug
      );

      // Find the index of the specified component in the specified scene.
      const componentIndex = state.item.field_scenes[
        sceneIndex
      ].field_components.findIndex(c => c.id === component);

      // Create a new component based on the old one, and pass in a new value
      // for the field that is being pre-saved.
      const newItem = Object.assign({}, state.item);
      const newComponent = Object.assign(
        {},
        newItem.field_scenes[sceneIndex].field_components[componentIndex],
        {
          [fieldName]: fieldValue
        }
      );

      // Swap out the old component for the new.
      newItem.field_scenes[sceneIndex].field_components[
        componentIndex
      ] = newComponent;

      return {
        loading: false,
        error: null,
        item: newItem
      };
    }
    default:
      return state;
  }
}
