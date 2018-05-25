/**
 * @file actionGenerator.js
 * Exports a method that assists in the generation of async actions.
 */

import { put } from 'redux-saga/effects';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

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
