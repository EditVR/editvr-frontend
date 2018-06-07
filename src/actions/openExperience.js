/**
 * @file experiences.js
 * Exports actions related to openExperience state.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../constants';
import { openExperienceFetchForUser as getOpenExperienceForUser } from '../lib/api';
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

export function* watchOpenExperienceActions() {
  yield takeLatest(OPEN_EXPERIENCE_FETCH_FOR_USER, openExperienceFetchForUser);
}
