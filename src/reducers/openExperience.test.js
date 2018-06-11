/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import reducer from './openExperience';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../constants';

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
});
