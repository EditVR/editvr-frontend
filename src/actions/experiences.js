/**
 * @file experiences.js
 * Exports actions related to experiences.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  EXPERIENCES_FETCH_FOR_USER,
  EXPERIENCES_CREATE,
  EXPERIENCES_EDIT
} from '../constants';
import {
  experiencesFetchForUser as getExperiencesForUser,
  experiencesCreate as postExperiences,
  experiencesEdit as patchExperiences
} from '../lib/api';
import actionGenerator from '../lib/actionGenerator';

/**
 * Dispatches an action that fetches a list of experiences for the current user.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {object} payload.user - Object containing user data.
 * @param {object} payload.user.uid - ID of the current user.
 * @param {object} payload.user.authentication - Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export function* experiencesFetchForUser({ user }) {
  yield* actionGenerator(
    EXPERIENCES_FETCH_FOR_USER,
    function* experiencesFetchForUserHandler() {
      const experiences = yield call(getExperiencesForUser, user);
      yield put({
        type: `${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`,
        payload: experiences
      });
    }
  );
}

/**
 * Creates a new experience.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.title - Title of the new experience.
 * @param {string} payload.body - Description for the new experience.
 * @param {string} payload.field_experience_path - URL slug for new experience.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 * @param {object} payload.user - Object containing user data.
 * @param {object} payload.user.authentication - Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export function* experiencesCreate({
  user,
  title,
  body = '',
  field_experience_path,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    EXPERIENCES_CREATE,
    function* experienceCreateHandler() {
      const experience = yield call(
        postExperiences,
        { title, body, field_experience_path },
        user
      );
      yield put({
        type: `${EXPERIENCES_CREATE}_SUCCESS`,
        payload: experience
      });
    },
    successHandler
  );
}

/**
 * Edits an existing experience
 *
 * @param {object} payload - Payload for this saga action.
 * @param {object} payload.id - Unique ID of experience being updated.
 * @param {string} payload.title - Title of this experience.
 * @param {string} payload.body - Description for this experience.
 * @param {string} payload.field_experience_path - URL slug for this experience.
 * @param {function} payload.successHandler
 *   Function to be executed if/when this action succeeds.
 * @param {object} payload.user - Object containing user data.
 * @param {object} payload.user.authentication - Object containing auth data.
 * @param {string} payload.user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} payload.user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export function* experiencesEdit({
  id,
  user,
  title,
  body = '',
  field_experience_path,
  successHandler = () => {}
}) {
  yield* actionGenerator(
    EXPERIENCES_EDIT,
    function* experienceEditHandler() {
      const experience = yield call(
        patchExperiences,
        { id, title, body, field_experience_path },
        user
      );

      yield put({
        type: `${EXPERIENCES_EDIT}_SUCCESS`,
        payload: experience
      });
    },
    successHandler
  );
}

export function* watchExperiencesActions() {
  yield takeLatest(EXPERIENCES_FETCH_FOR_USER, experiencesFetchForUser);
  yield takeLatest(EXPERIENCES_CREATE, experiencesCreate);
  yield takeLatest(EXPERIENCES_EDIT, experiencesEdit);
}
