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

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE
} from '../constants';
import {
  openExperienceFetchForUser,
  openExperienceSceneCreate
} from './openExperience';
import {
  openExperienceFetchForUser as getOpenExperienceForUser,
  openExperienceAttachScene,
  fileCreate,
  sceneCreate
} from '../lib/api';

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

  it('experiences->openExperienceSceneCreate()', () => {
    const fileData = 'test';
    const fileName = 'test';
    const title = 'test';
    const field_slug = 'test';
    const body = 'test';
    const uri = `private://sceneSkies/${fileName}`;
    const user = {
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };
    const successHandler = jest.fn();
    const experience = {
      item: {
        field_scenes: [],
        field_experience_path: 'test'
      }
    };

    const payload = {
      title,
      body,
      field_slug,
      fileData,
      fileName,
      user,
      experience,
      successHandler
    };

    testSaga(openExperienceSceneCreate, payload)
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_LOADING`
      })
      .next()
      .call(fileCreate, fileData, uri, user)
      .next()
      .call(sceneCreate, {
        title,
        body,
        field_slug,
        field_photosphere: undefined
      })
      .next()
      .call(openExperienceAttachScene, experience, undefined, user)
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_SUCCESS`,
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
