/**
 * @file component.js
 * Exports actions related to components.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { COMPONENT_SELECT, COMPONENT_DELETE } from '../constants';

import {
  componentRemove
} from '../lib/api';

import actionGenerator from '../lib/actionGenerator';

/**
 * Sets the currently selected component.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.id - ID of the component that should be selected.
 */
export function* componentSelect({ id }) {
  yield put({
    type: `${COMPONENT_SELECT}_SUCCESS`,
    payload: {
      id
    }
  });
}

/**
 * Delete a component.
 *
 * @param {object} payload - Payload for this saga action.
 * @param {string} payload.id - ID of the component to be deleted.
 * @param {object} payload.user - Current user object with authentication.
 * @param {function} payload.successHandler - Function to be executed on success.
 * @param {function} payload.errorHandler - Function to be executed on error.
 */
export function* componentDelete({
  id,
  user,
  successHandler = () => {},
  errorHandler = () => {}
}) {
  yield* actionGenerator(
    COMPONENT_DELETE,
    function* componentDeleteHandler() {
      yield call(componentRemove, id, user);
      yield put({
        type: `${COMPONENT_DELETE}_SUCCESS`,
        payload: { id }
      });
    },
    successHandler,
    errorHandler
  );
}

export function* watchComponentActions() {
  yield takeLatest(COMPONENT_SELECT, componentSelect);
  yield takeLatest(COMPONENT_DELETE, componentDelete);
}
