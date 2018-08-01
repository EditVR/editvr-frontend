/**
 * @file axiosInstance.js
 * Exports a method that assists in communicating with EditVR's API.
 */

import axios from 'axios';
import Jsona, { JsonPropertiesMapper } from 'jsona';

import { apiURL } from '../../config';
import {
  ERROR_API_CONNECTION_FAILED,
  ERROR_API_FORBIDDEN,
  ERROR_API_GENERAL,
  ERROR_API_NOT_FOUND,
  ERROR_API_LOGIN_FAILED,
  ERROR_API_BAD_REQUEST,
  ERROR_API_UNPROCESSABLE_ENTITY,
  AXIOS_ERROR_NETWORK,
  AXIOS_ERROR_400,
  AXIOS_ERROR_401,
  AXIOS_ERROR_403,
  AXIOS_ERROR_404,
  AXIOS_ERROR_422
} from '../../constants';

/**
 * Property mapper that assists mapping scenes and components by slug and id.
 */
class EditVRJsonPropertiesMapper extends JsonPropertiesMapper {
  setRelationships(model, relationships) {
    switch (model.type) {
      // If we're de-serializing an experience, ensure the field_scenes prop
      // is an object keyed by scene slugs.
      case 'node--experience': {
        /* eslint-disable-next-line no-param-reassign */
        model.scenes = {};
        if (
          relationships.field_scenes &&
          relationships.field_scenes.length > 0
        ) {
          relationships.field_scenes.forEach(scene => {
            /* eslint-disable-next-line no-param-reassign */
            model.scenes[scene.field_slug] = scene;
          });
        }
        break;
      }
      // If we're de-serializing a scene, ensure the field_components prop is
      // an object keyed by the component's id.
      case 'node--scene': {
        /* eslint-disable-next-line no-param-reassign */
        model.components = {};
        if (
          relationships.field_components &&
          relationships.field_components.length > 0
        ) {
          relationships.field_components.forEach(component => {
            /* eslint-disable-next-line no-param-reassign */
            model.components[component.id] = component;
          });
        }
        break;
      }
      default:
        break;
    }

    super.setRelationships(model, relationships);
  }
}

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
const axiosInstance = (
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

  // If an access token is specified, add it to the header.
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // If a csrfToken is specified, add it to the header.
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  // If the format is set to jsonapi, add content-type headers.
  if (format === 'jsonapi') {
    config.headers['Content-Type'] = 'application/vnd.api+json';
  }

  // Generate an axios instance.
  const instance = axios.create(config);

  // Add an interceptor that cleans up and denormalizes API responses, and
  // throws coherent errors.
  instance.interceptors.response.use(
    response => {
      let r = response;

      if (r.data) {
        r = r.data;
      }

      if (format === 'jsonapi') {
        const formatter = new Jsona({
          jsonPropertiesMapper: new EditVRJsonPropertiesMapper()
        });
        r = formatter.deserialize(r);
      }

      return r;
    },
    error => {
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
        case AXIOS_ERROR_422: {
          throw new Error(ERROR_API_UNPROCESSABLE_ENTITY);
        }
        default:
          throw new Error(ERROR_API_GENERAL);
      }
    }
  );

  return instance;
};

export default axiosInstance;
