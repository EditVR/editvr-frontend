/**
 * @file openExperience.test.js
 * Contains tests for openExperience.js.
 */

import { testSaga } from 'redux-saga-test-plan';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../constants';
import { openExperienceFetchForUser } from './openExperience';
import { openExperienceFetchForUser as getOpenExperienceForUser } from '../lib/api';

describe('actions->openExperience', () => {
  it('experiences->experiencesFetchForUser()', () => {
    const experienceSlug = 'test';
    const user = {
      uid: '1',
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };
    testSaga(openExperienceFetchForUser, { experienceSlug, user })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_LOADING`
      })
      .next()
      .call(getOpenExperienceForUser, experienceSlug, user)
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_SUCCESS`,
        payload: undefined
      })
      .next()
      // Next is executed twice here to step over the execution of an optional
      // successHandler method that this implementation doesn't utilize.
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });
});
