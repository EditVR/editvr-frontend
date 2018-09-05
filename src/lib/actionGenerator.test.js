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
    const successHandler = jest.fn();
    const type = 'STUB_SAGA';
    testSaga(
      actionGenerator,
      type,
      function* actionStub() {
        yield call(action, 'test');
      },
      successHandler
    )
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${type}_LOADING`
      })
      .next()
      .call(action, 'test')
      .next()
      .call(successHandler)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('Yields any error it catches.', () => {
    const errorHandler = jest.fn();
    const error = 'everything is broken!';
    const type = 'STUB_SAGA';

    testSaga(
      actionGenerator,
      type,
      function* errorStub() {
        throw new Error(error);
      },
      () => {},
      errorHandler
    )
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${type}_LOADING`
      })
      .next()
      .put({
        type: `${type}_FAIL`,
        payload: {
          error: `Error: ${error}`
        }
      })
      .next()
      .call(errorHandler, `Error: ${error}`)
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });
});
