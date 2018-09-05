/**
 * @file component.test.js
 * Contains tests for component.js.
 */

import reducer from './component';
import { COMPONENT_SELECT } from '../constants';

describe('reducers->component', () => {
  it(`Should handle ${COMPONENT_SELECT}_SUCCESS`, () => {
    expect(
      reducer(undefined, {
        type: `${COMPONENT_SELECT}_SUCCESS`,
        payload: {
          id: 'test'
        }
      })
    ).toMatchSnapshot();
  });
});
