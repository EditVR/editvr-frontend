/**
 * @file reduxStore.test.js
 * Contains tests for reduxStore.js.
 */

import { store, persistor } from './reduxStore';

describe('reduxStore()', () => {
  it('Returns correctly constructed store and persistor objects.', () => {
    expect(store).toMatchSnapshot();
    expect(persistor).toMatchSnapshot();
  });
});
