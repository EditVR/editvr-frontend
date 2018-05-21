/**
 * @file user.js
 * Exports methods that execute user-centric operations against the EditVR API.
 */

import qs from 'qs';
import { clientId } from '../../config';
import { axiosRequest } from './fetch';

/**
 * Fetches a user access token for a given username, password, and client ID.
 *
 * @param {string} username - Username of user to authenticate.
 * @param {string} password - Password of user to authenticate.
 *
 * @returns {object} - Promise that resolves a token or error.
 */
export const getAccessToken = async (username, password) => {
  const r = await axiosRequest(
    {
      method: 'post',
      url: 'oauth/token',
      data: qs.stringify({
        grant_type: 'password',
        client_id: clientId,
        username,
        password
      })
    },
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencode'
      }
    },
    false
  );

  return {
    accessToken: r.access_token || null,
    refreshToken: r.refresh_token || null,
    expiresIn: r.expires_in || null
  };
};

/**
 * Fetches a user access token for a given username, password, and client ID.
 *
 * @param {string} username - Username of user to authenticate.
 * @param {string} password - Password of user to authenticate.
 *
 * @returns {object} - Promise that resolves a token or error.
 */
export const getCsrfToken = async authentication =>
  axiosRequest(
    {
      method: 'get',
      url: 'rest/session/token'
    },
    authentication,
    {},
    false
  );
