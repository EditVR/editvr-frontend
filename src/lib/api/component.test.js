/**
 * @file component.test.js
 * Contains tests for component.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import { API_ENDPOINT_COMPONENT, API_TYPE_COMPONENT } from '../../constants';
import { componentEdit } from './component';

describe('api->component', () => {
  it('component->componentEdit()', () => {
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

    componentEdit({ ...component, id }, user);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${API_ENDPOINT_COMPONENT}/${id}`,
      {
        data: {
          id,
          type: API_TYPE_COMPONENT,
          attributes: component
        }
      }
    );
  });
});
