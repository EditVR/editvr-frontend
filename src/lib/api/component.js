/**
 * @file component.js
 * Exports methods that execute API operations pertaining to components.
 */

import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_COMPONENT,
  API_TYPE_SCENE,
  API_TYPE_COMPONENT,
  COMPONENT_TYPE_LINK,
  COMPONENT_TYPE_DIALOG
} from '../../constants';

/**
 * Creates a brand new component.
 *
 * @param {object} componentType
 *   Type of component that's being created. (constant COMPONENT_TYPE_DIALOG).
 * @param {object} component
 *   Object containing data for this updated scene.
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
 * @param {object} component.field_scene_link
 *   Optional scene object that this component should link to.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const componentCreate = async (
  componentType,
  {
    id,
    title,
    field_body = null,
    field_x,
    field_y,
    field_z,
    field_scene_link = null
  },
  { authentication }
) => {
  const attributes = {
    title,
    field_component_type: componentType,
    field_x,
    field_y,
    field_z
  };

  const relationships = {};

  // If this is a link component, add the relationship to the destination scene.
  if (componentType === COMPONENT_TYPE_LINK && field_scene_link) {
    relationships.field_scene_link = {
      data: {
        type: API_TYPE_SCENE,
        id: field_scene_link.id
      }
    };
  }

  // If this is a dialog component, add the body field.
  if (componentType === COMPONENT_TYPE_DIALOG) {
    attributes.field_body = field_body;
  }

  const component = await axiosInstance(authentication).post(
    API_ENDPOINT_COMPONENT,
    {
      data: {
        id,
        type: API_TYPE_COMPONENT,
        attributes,
        relationships
      }
    }
  );

  // If a scene link was specified, re-attach it and save ourselves a second
  // request to fetch that relationship separately.
  if (field_scene_link) {
    component.field_scene_link = field_scene_link;
  }

  return component;
};

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
