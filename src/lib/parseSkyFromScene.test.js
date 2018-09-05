/**
 * @file parseSkyFromScene.test.js
 * Contains tests for parseSkyFromScene.js.
 */

import parseSkyFromScene from './parseSkyFromScene';

describe('lib->parseSkyFromScene()', () => {
  it('Can parse a full sized photosphere out of a scene', () => {
    const scene = {
      field_photosphere: {
        url: '/sites/default/files/skies/mysky.jpg',
        links: {
          self: 'http://editvr.io/file--image/image-id'
        }
      }
    };

    expect(parseSkyFromScene(scene)).toEqual({
      type: 'photosphere',
      url: 'http://editvr.io/sites/default/files/skies/mysky.jpg'
    });
  });

  it('Can parse a full sized videosphere out of a scene', () => {
    const scene = {
      field_videosphere: {
        url: '/sites/default/files/skies/mysky.mp4',
        links: {
          self: 'http://editvr.io/file--video/video-id'
        }
      }
    };

    expect(parseSkyFromScene(scene)).toEqual({
      type: 'videosphere',
      url: 'http://editvr.io/sites/default/files/skies/mysky.mp4'
    });
  });

  it('Can parse a thumbnail sized photosphere out of a scene', () => {
    const scene = {
      field_photosphere: {
        url: '/sites/default/files/skies/mysky.jpg',
        links: {
          self: 'http://editvr.io/file--image/image-id'
        },
        meta: {
          derivatives: {
            sc: 'http://editvr.io/sites/default/files/skies/thumbnail/mysky.jpg'
          }
        }
      }
    };

    expect(parseSkyFromScene(scene, true)).toEqual({
      type: 'photosphere',
      url: 'http://editvr.io/sites/default/files/skies/thumbnail/mysky.jpg'
    });
  });

  it('Defaults to returning the full sky url when asked to return the thumbnail for a videosphere', () => {
    const scene = {
      field_videosphere: {
        url: '/sites/default/files/skies/mysky.mp4',
        links: {
          self: 'http://editvr.io/file--video/video-id'
        }
      }
    };

    expect(parseSkyFromScene(scene, true)).toEqual({
      type: 'videosphere',
      url: 'http://editvr.io/sites/default/files/skies/mysky.mp4'
    });
  });
});
