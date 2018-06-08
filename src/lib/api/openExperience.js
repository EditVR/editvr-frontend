/**
 * @file openExperience.js
 * Exports methods that execute operations pertaining to the VR Experience that
 * is currently open, in the editor or in the viewer.
 */

import { clientId } from '../../config';
import axiosInstance from './axiosInstance';
import {
  API_ENDPOINT_EXPERIENCE,
  API_TYPE_EXPERIENCE,
  API_TYPE_SCENE
} from '../../constants';

/**
 * Fetches a single experience object by slug and user ID.
 *
 * @param {string} experienceSlug
 *   Slug of experience to load.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {string} user.id
 *   ID of the authoring user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const openExperienceFetchForUser = async (
  experienceSlug,
  { uid, authentication }
) =>
  axiosInstance(authentication).get(API_ENDPOINT_EXPERIENCE, {
    params: {
      include: [
        'field_ambient',
        'field_scenes',
        'field_initial_scene',
        'field_scenes.field_components',
        'field_scenes.field_components.field_scene_link',
        'field_scenes.field_components.field_image',
        'field_scenes.field_components.field_component_sound',
        'field_scenes.field_photosphere',
        'field_scenes.field_slug'
      ].join(','),
      'filter[uid.uid][value]': uid,
      'filter[field_experience_path][value]': experienceSlug,
      _consumer_id: clientId
    }
  });

/**
 * Updates a given experience object and attaches a given scene.
 *
 * @param {object} experience
 *   Experience object to which a new scene will be attached.
 * @param {string} sceneId
 *   ID of scene that should be attached to the specified experience.
 * @param {object} user
 *   Object containing information about the current user.
 * @param {object} user.authentication
 *   Object containing auth data.
 * @param {string} user.authentication.accessToken
 *   Access token for the current user.
 * @param {string} user.authentication.csrfToken
 *   CSRF token for the current user.
 */
export const openExperienceAttachScene = async (
  experience,
  sceneId,
  { authentication }
) => {
  const relationships = {
    field_scenes: {
      data: [
        ...experience.field_scenes.map(scene => ({
          id: scene.id,
          type: API_TYPE_SCENE
        })),
        { id: sceneId, type: API_TYPE_SCENE }
      ]
    }
  };

  return axiosInstance(authentication).patch(
    `${API_ENDPOINT_EXPERIENCE}/${experience.id}`,
    {
      data: {
        id: experience.id,
        type: API_TYPE_EXPERIENCE,
        relationships
      }
    }
  );
};
