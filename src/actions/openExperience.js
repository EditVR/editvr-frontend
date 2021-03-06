/**
 * @file experiences.js
 * Exports actions related to openExperience state.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_CREATE,
  OPEN_EXPERIENCE_COMPONENT_DELETE,
  OPEN_EXPERIENCE_COMPONENT_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
  OPEN_EXPERIENCE_SCENE_FIELD_PRESAVE
} from '../constants';
import {
  openExperienceFetchForUser as getOpenExperienceForUser,
  openExperienceAttachScene,
  fileCreate,
  sceneCreate,
  sceneEdit,
  componentEdit,
  componentCreate,
  componentRemove,
  sceneAttachComponent
} from '../lib/api';
import actionGenerator from '../lib/actionGenerator';

/**
 * Dispatches an action that fetches an experience for a given name and user ID.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.experienceSlug - Slug of experience to load.
 * @param {object} payload.user - Object containing user data.
 * @param {object} payload.user.uid - ID of the current user.
 * @param {object} payload.user.username - Name of the current user (optional).
 * @param {object} payload.user.authentication - Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export function* openExperienceFetchForUser({ user, experienceSlug }) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_FETCH_FOR_USER,
    function* openExperienceFetchForUserHandler() {
      const experience = yield call(
        getOpenExperienceForUser,
        experienceSlug,
        user
      );
      yield put({
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_SUCCESS`,
        payload: experience
      });
    }
  );
}

/**
 * Dispatches an action that generates a new scene in the current openExperience.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {object} fields
 *   Fields values for the scene being created.
 * @param {string} payload.title
 *   Title of this new scene.
 * @param {string} payload.body
 *   Body describing this new scene.
 * @param {string} payload.field_slug
 *   URL slug describing this scene's URL segment.
 * @param {string} payload.experience
 *   Object containing experience that this scene will be attached to.
 * @param {string} payload.fileData
 *   Base64 file data for this scene's sky file.
 * @param {string} payload.fileName
 *   String name of file.
 * @param {object} payload.user
 *   Object containing user data.
 * @param {object} payload.user.authentication
 *   Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 */
export function* openExperienceSceneCreate({
  user,
  fields,
  experience,
  fileData,
  fileName,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_SCENE_CREATE,
    function* openExperienceSceneCreateHandler() {
      // Calculate file URI, and then create the file.
      const uri = `private://sceneSkies/${fileName}`;
      const file = yield call(fileCreate, fileData, uri, user);

      // Generate scene payload based on the type of file that was just
      // generated, and then create the scene.
      const skyField = file.filemime.startsWith('video')
        ? 'field_videosphere'
        : 'field_photosphere';

      const payload = fields;
      payload[skyField] = file.id;
      const scene = yield call(sceneCreate, payload, user);

      // Attach the newly-created scene to it's experience.
      const updatedExperience = yield call(
        openExperienceAttachScene,
        experience,
        scene.id,
        user
      );
      yield put({
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_SUCCESS`,
        payload: updatedExperience
      });
    },
    successHandler
  );
}

/**
 * Dispatches an action that updates a scene in the current openExperience.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {string} payload.id
 *   ID of this scene.
 * @param {object} payload.fields
 *   Object containing fields that should be updated.
 * @param {object} payload.user
 *   Object containing user data.
 * @param {object} payload.user.authentication
 *   Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 */
export function* openExperienceSceneEdit({
  id,
  fields,
  user,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_SCENE_EDIT,
    function* openExperienceSceneEditHandler() {
      const scene = yield call(sceneEdit, id, fields, user);
      yield put({
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`,
        payload: scene
      });
    },
    successHandler
  );
}

/**
 * Dispatches an action that creates a new component.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {object} payload.componentType
 *   Type of component that's being created. (constant COMPONENT_TYPE_DIALOG).
 * @param {object} payload.fields
 *   Object who's keys are field names, and values are new values for the field.
 * @param {object} payload.relationships
 *   Optional object that should specify any relationships this component needs.
 * @param {object} payload.scene
 *   Slug of scene in which this component is located.
 * @param {object} payload.user
 *   Object containing user data.
 * @param {object} payload.user.authentication
 *   Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 */
export function* openExperienceComponentCreate({
  scene,
  componentType,
  user,
  fields,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_COMPONENT_CREATE,
    function* openExperienceComponentCreateHandler() {
      const component = yield call(
        componentCreate,
        componentType,
        fields,
        user
      );
      yield call(sceneAttachComponent, scene, component.id, user);
      yield put({
        type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_SUCCESS`,
        payload: {
          component,
          sceneSlug: scene.field_slug
        }
      });
    },
    successHandler
  );
}

/**
 * Delete a component.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {object} payload.sceneSlug
 *   Scene slug in which this component is located.
 * @param {string} payload.id
 *   ID of the component to be deleted.
 * @param {object} payload.user
 *   Current user object with authentication.
 * @param {function} payload.successHandler
 *   Function to be executed on success.
 * @param {function} payload.errorHandler
 *   Function to be executed on error.
 */
export function* openExperienceComponentDelete({
  sceneSlug,
  id,
  user,
  successHandler = () => {},
  errorHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_COMPONENT_DELETE,
    function* openExperienceComponentDeleteHandler() {
      yield call(componentRemove, id, user);
      yield put({
        type: `${OPEN_EXPERIENCE_COMPONENT_DELETE}_SUCCESS`,
        payload: { sceneSlug, id }
      });
    },
    successHandler,
    errorHandler
  );
}

/**
 * Handles pre-saving a component within the current openExperience.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.sceneSlug - Slug of scene containing component.
 * @param {string} payload.component - ID of component to be presaved.
 * @param {string} payload.fieldName - Name of field who's value is changing.
 * @param {string} payload.fieldValue - New value for {fieldName}.
 */
export function* openExperienceComponentFieldPresave(payload) {
  yield put({
    type: `${OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE}_SUCCESS`,
    payload
  });
}

/**
 * Handles pre-saving a scene within the current openExperience.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.sceneSlug - Slug of scene containing component.
 * @param {string} payload.fieldName - Name of field who's value is changing.
 * @param {string} payload.fieldValue - New value for {fieldName}.
 */
export function* openExperienceSceneFieldPresave(payload) {
  yield put({
    type: `${OPEN_EXPERIENCE_SCENE_FIELD_PRESAVE}_SUCCESS`,
    payload
  });
}

/**
 * Dispatches an action that updates a component in the currently open scene.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {object} payload.componentType
 *   Type of component that's being updated. (constant COMPONENT_TYPE_DIALOG).
 * @param {string} payload.id
 *   ID of this component.
 * @param {object} payload.fields
 *   Object who's keys are field names, and values are new values for the field.
 * @param {string} payload.sceneSlug
 *   Slug of scene in which this component is located.
 * @param {object} payload.user
 *   Object containing user data.
 * @param {object} payload.user.authentication
 *   Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 */
export function* openExperienceComponentEdit({
  id,
  componentType,
  sceneSlug,
  user,
  fields,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_COMPONENT_EDIT,
    function* openExperienceComponentEditHandler() {
      const payload = {
        id,
        ...fields
      };

      const component = yield call(componentEdit, componentType, payload, user);
      yield put({
        type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_SUCCESS`,
        payload: {
          ...component,
          sceneSlug
        }
      });
    },
    successHandler
  );
}

export function* watchOpenExperienceActions() {
  yield takeLatest(OPEN_EXPERIENCE_FETCH_FOR_USER, openExperienceFetchForUser);
  yield takeLatest(OPEN_EXPERIENCE_SCENE_CREATE, openExperienceSceneCreate);
  yield takeLatest(OPEN_EXPERIENCE_SCENE_EDIT, openExperienceSceneEdit);
  yield takeLatest(
    OPEN_EXPERIENCE_COMPONENT_CREATE,
    openExperienceComponentCreate
  );
  yield takeLatest(
    OPEN_EXPERIENCE_COMPONENT_DELETE,
    openExperienceComponentDelete
  );
  yield takeLatest(
    OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
    openExperienceComponentFieldPresave
  );
  yield takeLatest(
    OPEN_EXPERIENCE_SCENE_FIELD_PRESAVE,
    openExperienceSceneFieldPresave
  );
  yield takeLatest(OPEN_EXPERIENCE_COMPONENT_EDIT, openExperienceComponentEdit);
}
