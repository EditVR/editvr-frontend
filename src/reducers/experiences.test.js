/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

import reducer from './experiences';
import { EXPERIENCES_FETCH_FOR_USER } from '../constants';

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
        error,
        payload: {}
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
});
