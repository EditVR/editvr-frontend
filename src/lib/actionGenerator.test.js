/**
 * @file actionGenerator.test.js
 * Contains tests for actionGenerator.js
 */

/* eslint require-yield: 0 */

import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

import actionGenerator from './actionGenerator';

describe('lib->actionGenerator()', () => {
  it('Generates a saga that yields the correct state changes.', () => {
    const action = jest.fn();
    const type = 'STUB_SAGA';
    testSaga(actionGenerator, type, function* actionStub() {
      yield call(action, 'test');
    })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${type}_LOADING`,
        payload: {},
        loading: true,
        error: null
      })
      .next()
      .call(action, 'test')
      .next()
      .put(hideLoading());
  });

  it('Yields any error it catches.', () => {
    const error = 'everything is broken!';
    const type = 'STUB_SAGA';

    testSaga(actionGenerator, type, function* errorStub() {
      throw new Error(error);
    })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${type}_LOADING`,
        payload: {},
        loading: true,
        error: null
      })
      .next()
      .put({
        type: `${type}_ERROR`,
        payload: {},
        loading: false,
        error: `Error: ${error}`
      })
      .next()
      .put(hideLoading());
  });
});
