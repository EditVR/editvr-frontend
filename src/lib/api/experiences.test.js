/**
 * @file experiences.test.js
 * Contains tests for experiences.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import { experiencesFetchForUser } from './experiences';
import { clientId } from '../../config';
import { API_ENDPOINT_EXPERIENCES } from '../../constants';

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

    expect(mockAxios.get).toHaveBeenCalledWith(API_ENDPOINT_EXPERIENCES, {
      params: {
        'filter[uid.uid][value]': uid,
        _consumer_id: clientId
      }
    });
  });
});
