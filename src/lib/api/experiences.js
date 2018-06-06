/**
 * @file experiences.js
 * Exports methods that execute expereince-centric operations against the API.
 */

import { clientId } from '../../config';
import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_EXPERIENCES,
  API_TYPE_EXPERIENCES
} from '../../constants';

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

/**
 * Takes new experience data and POSTs it to the API.
 *
 * @param {object} experience - Object containing data for new experience.
 * @param {string} experience.title - Title of the new experience.
 * @param {string} experience.body - Description for the new experience.
 * @param {string} experience.field_experience_path - URL slug for new experience.
 * @param {object} user - Object containing information about the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const experiencesCreate = async (
  { title, field_experience_path, body = '' },
  { authentication }
) =>
  axiosInstance(authentication).post(API_ENDPOINT_EXPERIENCES, {
    data: {
      type: API_TYPE_EXPERIENCES,
      attributes: {
        title,
        field_experience_path,
        body: {
          value: body,
          format: 'plain_text',
          summary: ''
        }
      }
    }
  });

/**
 * Takes new experience data and POSTs it to the API.
 *
 * @param {object} experience
 *   Object containing information about the experience thats being updated.
 * @param {object} experience.id - Unique ID of experience being updated.
 * @param {string} experience.title - Title of this experience.
 * @param {string} experience.body - Description for this experience.
 * @param {string} experience.field_experience_path - URL slug for this experience.
 * @param {object} user - Object containing information about the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const experiencesEdit = async (
  { id, title, field_experience_path, body = '' },
  { authentication }
) =>
  axiosInstance(authentication).patch(`${API_ENDPOINT_EXPERIENCES}/${id}`, {
    data: {
      id,
      type: API_TYPE_EXPERIENCES,
      attributes: {
        title,
        field_experience_path,
        body: {
          value: body,
          format: 'plain_text',
          summary: ''
        }
      }
    }
  });
