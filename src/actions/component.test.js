/**
 * @file component.test.js
 * Contains tests for component.js.
 */

import { testSaga } from 'redux-saga-test-plan';

import { componentSelect } from './component';
import { COMPONENT_SELECT } from '../constants';

describe('actions->component', () => {
  it('component->componentSelect()', () => {
    const id = 'test';
    testSaga(componentSelect, { id })
      .next()
      .put({
        type: `${COMPONENT_SELECT}_SUCCESS`,
        payload: {
          id
        }
      })
      .next()
      .isDone();
  });
});
