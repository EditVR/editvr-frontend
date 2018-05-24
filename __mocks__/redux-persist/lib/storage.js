/**
 * @file storage.js
 * Exports redux-persist/lib/storage.js mock.
 */

export default {
  getItem: jest.fn(() => Promise.resolve({}))
};
