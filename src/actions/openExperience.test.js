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
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
  OPEN_EXPERIENCE_COMPONENT_EDIT,
  OPEN_EXPERIENCE_COMPONENT_CREATE,
  COMPONENT_TYPE_DIALOG
} from '../constants';
import {
  openExperienceFetchForUser,
  openExperienceSceneCreate,
  openExperienceSceneEdit,
  openExperienceComponentFieldPresave,
  openExperienceComponentEdit,
  openExperienceComponentCreate
} from './openExperience';
import {
  openExperienceFetchForUser as getOpenExperienceForUser,
  openExperienceAttachScene,
  fileCreate,
  sceneCreate,
  sceneEdit,
  componentEdit,
  componentCreate,
  sceneAttachComponent
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

  it('openExperience->openExperienceSceneCreate()', () => {
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
        scenes: {},
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
      .next({
        filemime: 'image/png'
      })
      .call(
        sceneCreate,
        {
          title,
          body,
          field_slug,
          field_photosphere: undefined
        },
        user
      )
      .next({
        id: '10'
      })
      .call(openExperienceAttachScene, experience, '10', user)
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

  it('openExperience->openExperienceSceneEdit()', () => {
    const id = '10';
    const title = 'test';
    const field_slug = 'test';
    const body = 'test';
    const user = {
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };
    const successHandler = jest.fn();

    const payload = {
      id,
      title,
      body,
      field_slug,
      user,
      successHandler
    };

    testSaga(openExperienceSceneEdit, payload)
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_LOADING`
      })
      .next()
      .call(
        sceneEdit,
        {
          id,
          title,
          body,
          field_slug
        },
        user
      )
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`,
        payload: undefined
      })
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('openExperience->openExperienceComponentFieldPresave', () => {
    const payload = {
      sceneSlug: 'test',
      component: 'testComponent',
      fieldValue: 'value',
      fieldName: 'field_test'
    };
    testSaga(openExperienceComponentFieldPresave, payload)
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE}_SUCCESS`,
        payload
      })
      .next()
      .isDone();
  });

  it('openExperience->openExperienceComponentCreate', () => {
    const successHandler = jest.fn();
    const componentType = 'panelimage';
    const newComponent = {
      id: '20'
    };
    const scene = {
      id: '10',
      field_slug: 'test',
      components: {}
    };
    const fields = {
      field_body: 'test body',
      title: 'test title',
      field_x: 0,
      field_y: 0,
      field_z: 0
    };
    const user = {
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };

    testSaga(openExperienceComponentCreate, {
      scene,
      componentType,
      fields,
      successHandler,
      user
    })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_LOADING`
      })
      .next()
      .call(componentCreate, componentType, fields, user)
      .next(newComponent)
      .call(sceneAttachComponent, scene, newComponent.id, user)
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_SUCCESS`,
        payload: {
          component: newComponent,
          sceneSlug: scene.field_slug
        }
      })
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('openExperience->openExperienceComponentEdit', () => {
    const successHandler = jest.fn();
    const id = 10;
    const sceneSlug = 'test';
    const fields = {
      field_body: 'test body',
      title: 'test title',
      field_x: 0,
      field_y: 0,
      field_z: 0
    };
    const user = {
      authentication: { accessToken: 'test', csrfToken: 'test' }
    };

    testSaga(openExperienceComponentEdit, {
      fields,
      id,
      successHandler,
      user,
      sceneSlug,
      componentType: COMPONENT_TYPE_DIALOG
    })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_LOADING`
      })
      .next()
      .call(componentEdit, COMPONENT_TYPE_DIALOG, { ...fields, id }, user)
      .next()
      .put({
        type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_SUCCESS`,
        payload: {
          sceneSlug
        }
      })
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });
});
