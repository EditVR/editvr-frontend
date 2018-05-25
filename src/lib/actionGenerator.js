/**
 * @file actionGenerator.js
 * Exports a generator that assists in the construction of async saga actions.
 */

import { put } from 'redux-saga/effects';
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
 *
 * @returns {undefined} nothing.
 */
export default function* actionGenerator(type, actionHandler) {
  try {
    yield put(resetLoading());
    yield put(showLoading());
    yield put({
      type: `${type}_LOADING`,
      payload: {},
      loading: true,
      error: null
    });
    yield* actionHandler();
  } catch (error) {
    yield put({
      type: `${type}_ERROR`,
      payload: {},
      loading: false,
      error: error.toString()
    });
  } finally {
    yield put(hideLoading());
  }
}
