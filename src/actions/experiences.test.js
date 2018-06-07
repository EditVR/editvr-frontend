/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import { testSaga } from 'redux-saga-test-plan';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

import { EXPERIENCES_FETCH_FOR_USER } from '../constants';
import { experiencesFetchForUser } from './experiences';
import { experiencesFetchForUser as getExperiencesForUser } from '../lib/api';

describe('actions->experiences', () => {
  it('experiences->experiencesFetchForUser()', () => {
    const state = {
      uid: '1',
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };
    testSaga(experiencesFetchForUser, { user: state })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${EXPERIENCES_FETCH_FOR_USER}_LOADING`
      })
      .next()
      .call(getExperiencesForUser, state)
      .next()
      .put({
        type: `${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`,
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
