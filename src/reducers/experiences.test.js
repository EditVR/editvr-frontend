/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import reducer from './experiences';
import {
  EXPERIENCES_FETCH_FOR_USER,
  EXPERIENCES_CREATE,
  EXPERIENCES_EDIT
} from '../constants';

describe('reducers->experiences', () => {
  it('Should return the initial state by default', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_FETCH_FOR_USER}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_FETCH_FOR_USER}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_FETCH_FOR_USER}_FAIL`, () => {
    const error = 'Error: failed to fetch experiences.';
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_FETCH_FOR_USER}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`,
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

  it(`Should handle ${EXPERIENCES_CREATE}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_CREATE}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_CREATE}_FAIL`, () => {
    const error = 'Error: failed to fetch experiences.';
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_CREATE}_FAIL`,
        loading: false,
        payload: {
          error
        }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_CREATE}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_CREATE}_SUCCESS`,
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

  it(`Should handle ${EXPERIENCES_EDIT}_LOADING`, () => {
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_EDIT}_LOADING`,
        loading: true,
        error: null,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_EDIT}_FAIL`, () => {
    const error = 'Error: failed to fetch experiences.';
    expect(
      reducer(undefined, {
        type: `${EXPERIENCES_EDIT}_FAIL`,
        loading: false,
        payload: { error }
      })
    ).toMatchSnapshot();
  });

  it(`Should handle ${EXPERIENCES_EDIT}_SUCCESS`, () => {
    // Pass in mock state, this will assert that this reducer is injecting
    // the updated experience at the right index.
    const state = {
      items: [
        {
          id: 0
        },
        {
          id: 3
        },
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    };

    expect(
      reducer(state, {
        type: `${EXPERIENCES_EDIT}_SUCCESS`,
        loading: false,
        error: null,
        payload: {
          id: 1,
          title: 'example experience'
        }
      })
    ).toMatchSnapshot();
  });
});
