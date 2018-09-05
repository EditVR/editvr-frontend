/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import reducer from './openExperience';

import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
  OPEN_EXPERIENCE_COMPONENT_EDIT,
  OPEN_EXPERIENCE_COMPONENT_CREATE
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
            scenes: {
              test: {
                title: 'old title',
                field_slug: 'test'
              }
            }
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
            field_slug: 'test'
          }
        }
      )
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE}_SUCCESS`, () => {
    expect(
      reducer(
        {
          item: {
            scenes: {
              test: {
                field_slug: 'test',
                components: {
                  test: {
                    id: 'test',
                    title: 'My Old Value'
                  }
                }
              }
            }
          }
        },
        {
          type: `${OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE}_SUCCESS`,
          loading: false,
          error: null,
          payload: {
            sceneSlug: 'test',
            component: 'test',
            fieldName: 'title',
            fieldValue: 'My New Value'
          }
        }
      )
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_EDIT}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_EDIT}_FAIL`, () => {
    const error = 'Error: failed to update component.';
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_EDIT}_SUCCESS`, () => {
    const id = 10;
    const sceneSlug = 'testScene';
    expect(
      reducer(
        {
          item: {
            scenes: {
              [sceneSlug]: {
                field_slug: sceneSlug,
                components: {
                  [id]: {
                    id,
                    title: 'My Old Value'
                  }
                }
              }
            }
          }
        },
        {
          type: `${OPEN_EXPERIENCE_COMPONENT_EDIT}_SUCCESS`,
          loading: false,
          error: null,
          payload: {
            id,
            sceneSlug,
            field_body: 'test body',
            title: 'My New Slug',
            field_x: 0,
            field_y: 0,
            field_z: 0
          }
        }
      )
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_CREATE}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_CREATE}_FAIL`, () => {
    const error = 'Error: failed to create component.';
    expect(
      reducer(undefined, {
        type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${OPEN_EXPERIENCE_COMPONENT_CREATE}_SUCCESS`, () => {
    const sceneSlug = 'testScene';
    expect(
      reducer(
        {
          item: {
            scenes: {
              [sceneSlug]: {
                field_slug: sceneSlug,
                components: {}
              }
            }
          }
        },
        {
          type: `${OPEN_EXPERIENCE_COMPONENT_CREATE}_SUCCESS`,
          loading: false,
          error: null,
          payload: {
            sceneSlug,
            component: {
              id: '10'
            }
          }
        }
      )
    ).toMatchSnapshot();
  });
});
