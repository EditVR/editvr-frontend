/**
 * @file axios.js
 * Exports an Axios mock.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

// jest-mock-axios does not yet support the patch method. Support for this may
// be coming soon (see https://github.com/knee-cola/jest-mock-axios/pull/12).
// For now, mocking patch requests in the same way that post requests are
// mocked works just fine.
// TODO: When jest-axios-mock PR#12 is merged and jest-axios-mock is updated,
// remove the following line.
mockAxios.patch = mockAxios.post;

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
