/**
 * @file index.js
 * Exports all sagas.
 */

import { all } from 'redux-saga/effects';

import { watchUserActions } from './user';
import { watchExperiencesActions } from './experiences';
import { watchOpenExperienceActions } from './openExperience';

export default function* rootSaga() {
  yield all([
    watchUserActions(),
    watchExperiencesActions(),
    watchOpenExperienceActions()
  ]);
}
