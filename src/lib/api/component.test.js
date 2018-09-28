/**
 * @file component.test.js
 * Contains tests for component.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import {
  API_ENDPOINT_COMPONENT,
  API_TYPE_COMPONENT,
  API_TYPE_SCENE,
  COMPONENT_TYPE_LINK,
  COMPONENT_TYPE_DIALOG
} from '../../constants';
import { componentEdit } from './component';

describe('api->component', () => {
  it('component->componentEdit(COMPONENT_TYPE_DIALOG)', () => {
    const id = 10;
    const component = {
      title: 'test title',
      field_body: 'test body',
      field_x: 1,
      field_y: 1,
      field_z: 1
    };
    const user = {
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    };

    componentEdit(COMPONENT_TYPE_DIALOG, { ...component, id }, user);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${API_ENDPOINT_COMPONENT}/${id}`,
      {
        data: {
          id,
          type: API_TYPE_COMPONENT,
          attributes: component,
          relationships: {}
        }
      }
    );
  });

  it('component->componentEdit(COMPONENT_TYPE_LINK)', () => {
    const id = 10;
    const component = {
      title: 'test title',
      field_x: 1,
      field_y: 1,
      field_z: 1
    };

    const field_scene_link = {
      id: '10'
    };
    const user = {
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    };

    componentEdit(
      COMPONENT_TYPE_LINK,
      { ...component, id, field_scene_link },
      user
    );
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${API_ENDPOINT_COMPONENT}/${id}`,
      {
        data: {
          id,
          type: API_TYPE_COMPONENT,
          attributes: component,
          relationships: {
            field_scene_link: {
              data: {
                id: '10',
                type: API_TYPE_SCENE
              }
            }
          }
        }
      }
    );
  });
});
