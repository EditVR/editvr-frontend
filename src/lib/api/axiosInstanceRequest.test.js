/**
 * @file axiosInstanceRequest.test.js
 * Contains tests for axiosInstance.js that involve mocking requests.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import axiosInstance from './axiosInstance';
import { API_ENDPOINT_XCSRF_TOKEN } from '../../constants';

afterEach(() => mockAxios.reset());

describe('fetch->axiosInstance()->{method}()', () => {
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
