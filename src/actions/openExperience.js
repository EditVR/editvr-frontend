/**
 * @file experiences.js
 * Exports actions related to openExperience state.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE
} from '../constants';
import {
  openExperienceFetchForUser as getOpenExperienceForUser,
  openExperienceAttachScene,
  fileCreate,
  sceneCreate,
  sceneEdit,
  componentEdit
} from '../lib/api';
import actionGenerator from '../lib/actionGenerator';

/**
 * Dispatches an action that fetches an experience for a given name and user ID.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.experienceSlug - Slug of experience to load.
 * @param {object} payload.user - Object containing user data.
 * @param {object} payload.user.uid - ID of the current user.
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
  title,
  body = '',
  field_slug,
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
      const payload = {
        title,
        body,
        field_slug
      };
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
 * @param {string} payload.title
 *   Title of this new scene.
 * @param {string} payload.body
 *   Body describing this new scene.
 * @param {string} payload.field_slug
 *   URL slug describing this scene's URL segment.
 * @param {string} payload.experience
 *   Object containing experience that this scene will be attached to.
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
  user,
  title,
  body = '',
  field_slug,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_SCENE_EDIT,
    function* openExperienceSceneEditHandler() {
      const payload = {
        id,
        title,
        body,
        field_slug
      };

      const scene = yield call(sceneEdit, payload, user);
      yield put({
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`,
        payload: scene
      });
    },
    successHandler
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
 * Dispatches an action that updates a component in the currently open scene.
 *
 * @param {object} payload
 *   Payload for this saga action.
 * @param {string} payload.id
 *   ID of this component.
 * @param {string} payload.sceneSlug
 *   Slug of scene in which this component is located.
 * @param {string} payload.title
 *   Title of this component.
 * @param {string} payload.field_body
 *   Body describing this component.
 * @param {object} payload.user
 *   Object containing user data.
 * @param {string} payload.field_x
 *   X coordinate for this component's position.
 * @param {string} payload.field_y
 *   Y coordinate for this component's position.
 * @param {string} payload.field_z
 *   Z coordinate for this component's position.
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
  sceneSlug,
  user,
  title,
  field_body = '',
  field_x,
  field_y,
  field_z,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    OPEN_EXPERIENCE_COMPONENT_EDIT,
    function* openExperienceComponentEditHandler() {
      const payload = {
        id,
        title,
        field_body,
        field_x,
        field_y,
        field_z
      };

      const component = yield call(componentEdit, payload, user);
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
    OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
    openExperienceComponentFieldPresave
  );
  yield takeLatest(OPEN_EXPERIENCE_COMPONENT_EDIT, openExperienceComponentEdit);
}
