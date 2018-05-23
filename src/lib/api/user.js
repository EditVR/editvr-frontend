/**
 * @file user.js
 * Exports methods that execute user-centric operations against the EditVR API.
 */

import qs from 'qs';
import { clientId } from '../../config';
import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_USER_LOGIN,
  API_ENDPOINT_XCSRF_TOKEN
} from '../../constants';

/**
 * Fetches a user access token for a given username, password, and client ID.
 *
 * @param {string} username - Username of user to authenticate.
 * @param {string} password - Password of user to authenticate.
 *
 * @returns {object} - Promise that resolves a token or error.
 */
export const getAccessToken = async (username, password) => {
  const instance = axiosInstance({}, false);
  const r = await instance.post(
    API_ENDPOINT_USER_LOGIN,
    qs.stringify({
      grant_type: 'password',
      client_id: clientId,
      username,
      password
    })
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
  axiosInstance(authentication, false).get(API_ENDPOINT_XCSRF_TOKEN);
