/**
 * @file axiosInstance.test.js
 * Contains tests for axiosInstance.js
 */

import axiosInstance from './axiosInstance';
import { apiURL } from '../../config';

// Do not mock axios for this test. The tests in this file test to ensure the
// configuration logic in axiosInstance works as expected, which requires that
// axios not be mocked.
jest.unmock('axios');

describe('api->axiosInstance()', () => {
  it('Can generate an Axios instance..', () => {
    const instance = axiosInstance();
    expect(instance.interceptors.response.handlers).not.toEqual([]);
    expect(
      {}.hasOwnProperty.call(instance.defaults.headers, 'Authorization')
    ).toBeFalsy();
    expect(
      {}.hasOwnProperty.call(instance.defaults.headers, 'X-CSRF-Token')
    ).toBeFalsy();
    expect(instance.defaults.headers['Content-Type']).toBe(
      'application/vnd.api+json'
    );
    expect(instance.defaults.baseURL).toBe(`${apiURL}/jsonapi`);
  });

  it('Can accept authentication credentials.', () => {
    const instance = axiosInstance({
      accessToken: 'stub',
      csrfToken: 'stub'
    });

    expect(instance.defaults.baseURL).toBe(`${apiURL}/jsonapi`);
    expect(instance.defaults.headers['X-CSRF-Token']).toBe('stub');
    expect(instance.defaults.headers.Authorization).toBe('Bearer stub');
  });

  it('Can work on API resources that are not within jsonapi.', () => {
    const instance = axiosInstance({}, false);
    expect(instance.defaults.headers['Content-Type']).toBeFalsy();
    expect(instance.defaults.baseURL).toBe(`${apiURL}/`);
  });
});
