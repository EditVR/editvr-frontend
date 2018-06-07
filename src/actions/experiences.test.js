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

import {
  EXPERIENCES_FETCH_FOR_USER,
  EXPERIENCES_CREATE,
  EXPERIENCES_EDIT
} from '../constants';
import {
  experiencesFetchForUser,
  experiencesCreate,
  experiencesEdit
} from './experiences';
import {
  experiencesFetchForUser as getExperiencesForUser,
  experiencesCreate as postExperiences,
  experiencesEdit as patchExperiences
} from '../lib/api';

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

  it('experiences->experiencesCreate()', () => {
    const user = {
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    };
    const data = {
      title: 'test',
      body: 'test',
      field_experience_path: 'test'
    };
    const successHandler = jest.fn();
    testSaga(experiencesCreate, { ...data, user, successHandler })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${EXPERIENCES_CREATE}_LOADING`
      })
      .next()
      .call(postExperiences, data, user)
      .next()
      .put({
        type: `${EXPERIENCES_CREATE}_SUCCESS`,
        payload: undefined
      })
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('experiences->experiencesEdit()', () => {
    const user = {
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    };
    const data = {
      id: '10',
      title: 'test',
      body: 'test',
      field_experience_path: 'test'
    };
    const successHandler = jest.fn();
    testSaga(experiencesEdit, { ...data, user, successHandler })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${EXPERIENCES_EDIT}_LOADING`
      })
      .next()
      .call(patchExperiences, data, user)
      .next()
      .put({
        type: `${EXPERIENCES_EDIT}_SUCCESS`,
        payload: undefined
      })
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });
});
