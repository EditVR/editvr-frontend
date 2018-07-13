/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import reducer from './openExperience';

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT
} from '../constants';

describe('reducers->openExperience', () => {
  it('Should return the initial state by default', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_FETCH_FOR_USER}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_FETCH_FOR_USER}_FAIL`, () => {
    const error = 'Error: failed to fetch experiences.';
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_FETCH_FOR_USER}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_FETCH_FOR_USER}_SUCCESS`,
        loading: false,
        error: null,
        payload: [
          {
            id: 1,
            title: 'example experience'
          }
        ]
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_CREATE}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_CREATE}_FAIL`, () => {
    const error = 'Error: failed to create scene.';
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_CREATE}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_SCENE_CREATE}_SUCCESS`,
        loading: false,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_EDIT}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_EDIT}_FAIL`, () => {
    const error = 'Error: failed to update scene.';
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_SCENE_EDIT}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`, () => {
    expect(
      reducer(
        {
          item: {
            field_scenes: [
              {
                title: 'old title',
                field_slug: 'my-test'
              }
            ]
          }
        },
        {
          type: `${OPEN_EXPERIENCE_SCENE_EDIT}_SUCCESS`,
          loading: false,
          error: null,
          payload: {
            title: 'test',
            body: {
              value: 'test description'
            },
            field_slug: 'my-test'
          }
        }
      )
    ).toMatchSnapshot();
  });
});
