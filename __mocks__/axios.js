/**
 * @file axios.js
 * Exports an Axios mock.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

export default {
  ...mockAxios,
  create: jest.fn(() => ({
    ...mockAxios,
    interceptors: {
      request: {
        use: jest.fn()
      },
      response: {
        use: jest.fn()
      }
    }
  }))
};
