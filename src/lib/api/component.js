/**
 * @file component.js
 * Exports methods that execute API operations pertaining to components.
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINT_COMPONENT, API_TYPE_COMPONENT } from '../../constants';

/**
 * Takes updated component data and PATCHes it to the API.
 *
 * @param {object} component
 *   Object containing data for this updated scene.
 * @param {string} component.id
 *   ID of component being updated.
 * @param {string} component.title
 *   Updated title of the component.
 * @param {string} component.field_body
 *   Updated description for the scene.
 * @param {string} component.field_x
 *   X coordinate for this component's position.
 * @param {string} component.field_y
 *   Y coordinate for this component's position.
 * @param {string} component.field_z
 *   Z coordinate for this component's position.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const componentEdit = async (
  { id, title, field_body, field_x, field_y, field_z },
  { authentication }
) =>
  axiosInstance(authentication).patch(`${API_ENDPOINT_COMPONENT}/${id}`, {
    data: {
      id,
      type: API_TYPE_COMPONENT,
      attributes: {
        title,
        field_body,
        field_x,
        field_y,
        field_z
      }
    }
  });
