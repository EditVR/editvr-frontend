/**
 * @file file.test.js
 * Contains tests for file.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import { sceneCreate } from './scene';
import {
  API_ENDPOINT_SCENE,
  API_TYPE_SCENE,
  API_TYPE_FILE_IMAGE,
  API_TYPE_FILE_VIDEO
} from '../../constants';

afterEach(() => mockAxios.reset());

describe('api->scene', () => {
  it('scene->sceneCreate(photosphere)', () => {
    const scene = {
      title: 'test',
      field_slug: 'test'
    };
    const body = 'test';
    const field_photosphere = '10';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    sceneCreate({ ...scene, body, field_photosphere }, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_SCENE, {
      data: {
        type: API_TYPE_SCENE,
        attributes: {
          ...scene,
          body: {
            value: body,
            format: 'plain_text',
            summary: ''
          }
        },
        relationships: {
          field_photosphere: {
            data: {
              id: field_photosphere,
              type: API_TYPE_FILE_IMAGE
            }
          }
        }
      }
    });
  });

  it('scene->sceneCreate(videosphere)', () => {
    const scene = {
      title: 'test',
      field_slug: 'test'
    };
    const body = 'test';
    const field_videosphere = '10';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    sceneCreate({ ...scene, body, field_videosphere }, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_SCENE, {
      data: {
        type: API_TYPE_SCENE,
        attributes: {
          ...scene,
          body: {
            value: body,
            format: 'plain_text',
            summary: ''
          }
        },
        relationships: {
          field_videosphere: {
            data: {
              id: field_videosphere,
              type: API_TYPE_FILE_VIDEO
            }
          }
        }
      }
    });
  });
});
