/**
 * @file file.js
 * Exports methods that execute operations pertaining files.
 */

import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_FILE_IMAGE,
  API_ENDPOINT_FILE_VIDEO,
  API_TYPE_FILE_IMAGE,
  API_TYPE_FILE_VIDEO
} from '../../constants';

/**
 *
 * Creates an image file object.
 *
 * @param {string} data - Base64 data string for file.
 * @param {string} uri - Path to this file's destination (private://path.png)
 * @param {object} user - Object containing information about the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const fileImageCreate = async (data, uri, { authentication }) =>
  axiosInstance(authentication).post(API_ENDPOINT_FILE_IMAGE, {
    data: {
      type: API_TYPE_FILE_IMAGE,
      attributes: { data, uri }
    }
  });

/**
 * Creates a video file object.
 *
 * @param {string} data - Base64 data string for file.
 * @param {string} uri - Path to this file's destination (private://path.mp4)
 * @param {object} user - Object containing information about the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const fileVideoCreate = async (data, uri, { authentication }) =>
  axiosInstance(authentication).post(API_ENDPOINT_FILE_VIDEO, {
    data: {
      type: API_TYPE_FILE_VIDEO,
      attributes: { data, uri }
    }
  });

/**
 * Creates an image, or video file depending on the type of the passed-in data.
 *
 * @param {string} data - Base64 data string for file.
 * @param {string} uri - Path to this file's destination (private://path.mp4)
 * @param {object} user - Object containing information about the current user.
 * @param {object} user.authentication - Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const fileCreate = async (data, uri, user) => {
  const [fileInfo, base64Data] = data.split(',');
  const fileType = `file--${fileInfo.match(/data:([a-zA-Z0-9]+)/)[1]}`;

  switch (fileType) {
    case API_TYPE_FILE_IMAGE: {
      return fileImageCreate(base64Data, uri, user);
    }
    case API_TYPE_FILE_VIDEO: {
      return fileVideoCreate(base64Data, uri, user);
    }
    default:
      return fileImageCreate(base64Data, uri, user);
  }
};
