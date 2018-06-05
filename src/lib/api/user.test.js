/**
 * @file user.test.js
 * Contains tests for user.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';
import qs from 'qs';

import { getAccessToken, getCsrfToken } from './user';
import { clientId } from '../../config';
import {
  API_ENDPOINT_USER_LOGIN,
  API_ENDPOINT_XCSRF_TOKEN
} from '../../constants';

afterEach(() => mockAxios.reset());

describe('User API Calls', () => {
  it('user->getAccessToken()', () => {
    getAccessToken('username', 'password');
    expect(mockAxios.post).toHaveBeenCalledWith(
      API_ENDPOINT_USER_LOGIN,
      qs.stringify({
        grant_type: 'password',
        client_id: clientId,
        username: 'username',
        password: 'password'
      })
    );
  });

  it('user->getAccessToken()', () => {
    getCsrfToken({ accessToken: 'accessToken', csrfToken: 'csrfToken' });
    expect(mockAxios.get).toHaveBeenCalledWith(API_ENDPOINT_XCSRF_TOKEN);
  });
});
