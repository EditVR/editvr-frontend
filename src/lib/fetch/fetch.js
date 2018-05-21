/**
 * @file fetch.js
 * Exports a method that assists in communicating with EditVR's API.
 */

import axios from 'axios';
import Jsona from 'jsona';

import { apiURL } from '../../config';
import {
  ERROR_API_CONNECTION_FAILED,
  ERROR_API_FORBIDDEN,
  ERROR_API_GENERAL,
  ERROR_API_NOT_FOUND,
  ERROR_API_LOGIN_FAILED,
  ERROR_API_BAD_REQUEST,
  AXIOS_ERROR_NETWORK,
  AXIOS_ERROR_400,
  AXIOS_ERROR_401,
  AXIOS_ERROR_403,
  AXIOS_ERROR_404
} from '../../constants';

/**
 * Creates an Axios instance configured to connect to the EditVR API.
 *
 * @param {object} authentication - Auth config for this method.
 * @param {string} authentication.accessToken - Access token for this request.
 * @param {string} authentication.csrfToken - CSRF-Token token for this request.
 * @param {string} format - API format. Default is jsonapi.
 *
 * @returns {object} - Axios instance.
 */
export const axiosInstance = (
  { accessToken = null, csrfToken = null } = {},
  format = 'jsonapi'
) => {
  const config = {
    baseURL: `${apiURL}/${format || ''}`,
    timeout: 30 * 1000,
    headers: {},
    withCredentials: false,
    crossdomain: true
  };

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  if (format === 'jsonapi') {
    config.headers['Content-Type'] = 'application/vnd.api+json';
  }

  return axios.create(config);
};

/**
 * Generic request exec helper that handles throwing errors and parsing output.
 *
 * @param {object} request - Axios request configuration object.
 * @param {string} authentication.accessToken - Access token for this request.
 * @param {string} authentication.csrfToken - CSRF-Token token for this request.
 * @param {string} format - API format. Default is jsonapi.
 *
 * {@see https://www.npmjs.com/package/axios#request-config}.
 *
 * @returns {object} - Response object.
 */
export const axiosRequest = async (
  request,
  authentication = {},
  headers = {},
  format = 'jsonapi'
) => {
  // Catch errors and map to friendly errors.
  const response = await axiosInstance(authentication, format)(
    request,
    headers
  ).catch(error => {
    switch (error.toString()) {
      case AXIOS_ERROR_NETWORK: {
        throw new Error(ERROR_API_CONNECTION_FAILED);
      }
      case AXIOS_ERROR_400: {
        throw new Error(ERROR_API_BAD_REQUEST);
      }
      case AXIOS_ERROR_401: {
        throw new Error(ERROR_API_LOGIN_FAILED);
      }
      case AXIOS_ERROR_403: {
        throw new Error(ERROR_API_FORBIDDEN);
      }
      case AXIOS_ERROR_404: {
        throw new Error(ERROR_API_NOT_FOUND);
      }
      default:
        throw new Error(ERROR_API_GENERAL);
    }
  });

  let { data } = response;
  if (format === 'jsonapi') {
    const denormalizer = new Jsona();
    data = denormalizer.deserialize(response.data);
  }

  return data;
};
