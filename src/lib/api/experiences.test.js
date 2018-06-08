/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import {
  experiencesFetchForUser,
  experiencesCreate,
  experiencesEdit
} from './experiences';
import { clientId } from '../../config';
import { API_ENDPOINT_EXPERIENCE, API_TYPE_EXPERIENCE } from '../../constants';

afterEach(() => mockAxios.reset());

describe('api->experiences', () => {
  it('experiences->experiencesFetchForUser()', () => {
    const uid = '1';
    experiencesFetchForUser({
      uid,
      authentication: {
        accessToken: 'test',
        csrfToken: 'test'
      }
    });

    expect(mockAxios.get).toHaveBeenCalledWith(API_ENDPOINT_EXPERIENCE, {
      params: {
        'filter[uid.uid][value]': uid,
        _consumer_id: clientId
      }
    });
  });

  it('experiences->experiencesCreate()', () => {
    const title = 'test';
    const field_experience_path = 'test';
    const body = 'test';

    experiencesCreate(
      {
        title,
        field_experience_path,
        body
      },
      {
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      }
    );

    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_EXPERIENCE, {
      data: {
        type: API_TYPE_EXPERIENCE,
        attributes: {
          title,
          field_experience_path,
          body: {
            value: body,
            format: 'plain_text',
            summary: ''
          }
        }
      }
    });
  });

  it('experiences->experiencesEdit()', () => {
    const id = '10';
    const title = 'test';
    const field_experience_path = 'test';
    const body = 'test';

    experiencesEdit(
      {
        id,
        title,
        field_experience_path,
        body
      },
      {
        authentication: {
          accessToken: 'test',
          csrfToken: 'test'
        }
      }
    );

    expect(mockAxios.post).toHaveBeenCalledWith(
      `${API_ENDPOINT_EXPERIENCE}/${id}`,
      {
        data: {
          id,
          type: API_TYPE_EXPERIENCE,
          attributes: {
            title,
            field_experience_path,
            body: {
              value: body,
              format: 'plain_text',
              summary: ''
            }
          }
        }
      }
    );
  });
});
