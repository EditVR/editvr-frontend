/**
 * @file experiences.js
 * Exports methods that execute expereince-centric operations against the API.
 */

import { clientId } from '../../config';
import axiosInstance from './axiosInstance';
import { API_ENDPOINT_EXPERIENCES } from '../../constants';

/**
 * Fetches a list of experiences that are owned by the current user.
 *
 * @param {object} user - Object containing information about the current user.
 * @param {string} user.uid - ID of the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const experiencesFetchForUser = async ({ uid, authentication }) =>
  axiosInstance(authentication).get(API_ENDPOINT_EXPERIENCES, {
    params: {
      'filter[uid.uid][value]': uid,
      _consumer_id: clientId
    }
  });
