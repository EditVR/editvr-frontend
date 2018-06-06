/**
 * @file actionGenerator.js
 * Exports a generator that assists in the construction of async saga actions.
 */

import { put, call } from 'redux-saga/effects';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

/**
 * Generator that handles loading/error states.
 *
 * @param {string} type - This action's machine-friendly name.
 * @param {function} actionHandler - Generator function containing loaders.
 * @param {function} successHandler - Optional function that handles successes.
 *
 * @returns {undefined} nothing.
 */
export default function* actionGenerator(
  type,
  actionHandler,
  successHandler = () => {}
) {
  yield put(resetLoading());
  yield put(showLoading());
  yield put({
    type: `${type}_LOADING`
  });

  try {
    yield* actionHandler();
    yield call(successHandler);
  } catch (error) {
    yield put({
      type: `${type}_FAIL`,
      payload: {
        error: error.toString()
      }
    });
  } finally {
    yield put(hideLoading());
  }
}
