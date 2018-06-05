/**
 * @file experiences.js
 * Exports actions related to experiences.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { EXPERIENCES_FETCH_FOR_USER } from '../constants';
import { experiencesFetchForUser as getExperiencesForUser } from '../lib/api';
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

export function* watchExperiencesActions() {
  yield takeLatest(EXPERIENCES_FETCH_FOR_USER, experiencesFetchForUser);
}
