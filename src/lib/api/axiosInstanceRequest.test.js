/**
 * @file axiosInstanceRequest.test.js
 * Contains tests for axiosInstance.js that involve mocking requests.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import axiosInstance from './axiosInstance';
import { API_ENDPOINT_XCSRF_TOKEN } from '../../constants';

afterEach(() => mockAxios.reset());

describe('api->axiosInstance()->{method}()', () => {
  // TODO: Eventually, we need to add tests for axiosInstance's error handling.
  // However, jest-mock-axios does not support interceptors at the moment. This
  // means that, since our error handling is (correctly) done in an interceptor,
  // we will need to fork jest-mock-axios and PR support for interceptors before
  // we can test our error handling.
  it('Can execute requests.', () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();

    axiosInstance({}, false)
      .get(API_ENDPOINT_XCSRF_TOKEN)
      .then(thenFn)
      .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_ENDPOINT_XCSRF_TOKEN);

    mockAxios.mockResponse({ data: 'mock-token' });
    expect(thenFn).toHaveBeenCalledWith({
      config: {},
      data: 'mock-token',
      headers: {},
      status: 200,
      statusText: 'OK'
    });

    expect(catchFn).not.toHaveBeenCalled();
  });
});
