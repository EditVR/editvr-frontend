/**
 * @file scene.js
 * Exports methods that execute operations pertaining scenes.
 */

import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_SCENE,
  API_TYPE_SCENE,
  API_TYPE_FILE_IMAGE,
  API_TYPE_FILE_VIDEO
} from '../../constants';

/**
 * Takes new scene data and POSTs it to the API.
 *
 * @param {object} scene
 *   Object containing data for the new scene.
 * @param {string} scene.title
 *   Title of the new scene.
 * @param {string} scene.body
 *   Description for the new scene.
 * @param {string} scene.field_slug
 *   URL slug for new scene.
 * @param {string} scene.field_photosphere
 *   ID of this scene's photosphere file.
 * @param {string} scene.field_videosphere
 *   ID of this scene's videosphere file.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const sceneCreate = async (
  {
    title,
    field_slug,
    body = '',
    field_photosphere = null,
    field_videosphere = null
  },
  { authentication }
) => {
  // Assemble relationships required for this request.
  const relationships = {};

  // If a photosphere is provided, attach it to the request.
  if (field_photosphere) {
    relationships.field_photosphere = {
      data: {
        id: field_photosphere,
        type: API_TYPE_FILE_IMAGE
      }
    };
  }

  // If a videosphere is provided, attach it to the request.
  if (field_videosphere) {
    relationships.field_videosphere = {
      data: {
        id: field_videosphere,
        type: API_TYPE_FILE_VIDEO
      }
    };
  }

  return axiosInstance(authentication).post(API_ENDPOINT_SCENE, {
    data: {
      type: API_TYPE_SCENE,
      attributes: {
        title,
        field_slug,
        body: {
          value: body,
          format: 'plain_text',
          summary: ''
        }
      },
      relationships
    }
  });
};

/**
 * Takes updated scene data and PATCHes it to the API.
 *
 * @param {object} scene
 *   Object containing data for this updated scene.
 * @param {string} scene.id
 *   ID of scene being updated.
 * @param {string} scene.title
 *   Updated title of the scene.
 * @param {string} scene.body
 *   Updated description for the scene.
 * @param {string} scene.field_slug
 *   Updated URL slug for scene.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const sceneEdit = async (
  { id, title, field_slug, body = '' },
  { authentication }
) =>
  axiosInstance(authentication).patch(`${API_ENDPOINT_SCENE}/${id}`, {
    data: {
      id,
      type: API_TYPE_SCENE,
      attributes: {
        title,
        field_slug,
        body: {
          value: body,
          format: 'plain_text',
          summary: ''
        }
      }
    }
  });
