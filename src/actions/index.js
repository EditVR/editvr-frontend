/**
 * @file index.js
 * Exports all sagas.
 */

import { all } from 'redux-saga/effects';

import { watchUserActions } from './user';
import { watchExperiencesActions } from './experiences';

export default function* rootSaga() {
  yield all([watchUserActions(), watchExperiencesActions()]);
}
