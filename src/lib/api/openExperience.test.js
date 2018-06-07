/**
 * @file openExperience.test.js
 * Contains tests for openExperience.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import { openExperienceFetchForUser } from './openExperience';
import { clientId } from '../../config';
import { API_ENDPOINT_EXPERIENCES } from '../../constants';

afterEach(() => mockAxios.reset());

describe('api->openExperience', () => {
  it('experiences->openExperienceFetchForUser()', () => {
    const uid = '1';
    const experienceSlug = 'test';
    openExperienceFetchForUser(experienceSlug, {
      uid,
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    });

    expect(mockAxios.get).toHaveBeenCalledWith(API_ENDPOINT_EXPERIENCES, {
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
  });
});
