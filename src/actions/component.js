/**
 * @file component.js
 * Exports actions related to components.
 */

import { put, takeLatest } from 'redux-saga/effects';

import { COMPONENT_SELECT } from '../constants';

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

export function* watchComponentActions() {
  yield takeLatest(COMPONENT_SELECT, componentSelect);
}
