/**
 * @file file.test.js
 * Contains tests for file.js.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mockAxios from 'jest-mock-axios';

import { fileImageCreate, fileVideoCreate, fileCreate } from './file';
import {
  API_ENDPOINT_FILE_IMAGE,
  API_ENDPOINT_FILE_VIDEO,
  API_TYPE_FILE_IMAGE,
  API_TYPE_FILE_VIDEO
} from '../../constants';

afterEach(() => mockAxios.reset());

describe('api->file', () => {
  it('file->fileImageCreate()', () => {
    const data = 'test';
    const uri = 'private://my-image.png';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    fileImageCreate(data, uri, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_FILE_IMAGE, {
      data: {
        type: API_TYPE_FILE_IMAGE,
        attributes: {
          data,
          uri
        }
      }
    });
  });

  it('file->fileVideoCreate()', () => {
    const data = 'test';
    const uri = 'private://my-image.mp4';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    fileVideoCreate(data, uri, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_FILE_VIDEO, {
      data: {
        type: API_TYPE_FILE_VIDEO,
        attributes: {
          data,
          uri
        }
      }
    });
  });

  it('file->fileCreate(image)', () => {
    const data = 'data:image/png;base64,test';
    const uri = 'private://my-image.mp4';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    fileCreate(data, uri, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_FILE_IMAGE, {
      data: {
        type: API_TYPE_FILE_IMAGE,
        attributes: {
          data: 'test',
          uri
        }
      }
    });
  });

  it('file->fileCreate(video)', () => {
    const data = 'data:video/mp4;base64,test';
    const uri = 'private://my-image.mp4';
    const authentication = {
      accessToken: 'test',
      csrfToken: 'test'
    };

    fileCreate(data, uri, authentication);
    expect(mockAxios.post).toHaveBeenCalledWith(API_ENDPOINT_FILE_VIDEO, {
      data: {
        type: API_TYPE_FILE_VIDEO,
        attributes: {
          data: 'test',
          uri
        }
      }
    });
  });
});
