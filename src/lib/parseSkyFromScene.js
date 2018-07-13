/**
 * @file parseSkyFromScene.js
 * Exports a helper menthod that assists in fetching the sky for a scene.
 */

/**
 * Helper menthod that assists in fetching the sky for a scene.
 *
 * @param {object} scene
 *   Experience object, containing scenes.
 * @param {bool} thumbnail
 *   Boolean indicating whether or not the returned value should be a thumbnail.
 *
 * @returns {object}
 *   Object containing a url, and type properties that indicate the type of sky
 *   and the path to it's file.
 */
const parseSkyFromScene = (scene = null, thumbnail = false) => {
  let isThumbnail = thumbnail;
  let type = 'photosphere';
  let url = null;

  // If a scene is not given, or the given scene has no photosphere or
  // videosphere, return null.
  if (!scene || (!scene.field_photosphere && !scene.field_videosphere)) {
    return null;
  }

  // Default to parsing sky info from the photosphere field.
  let sky = scene.field_photosphere;

  // If a videosphere is provided instead, use that as the sky, and set
  // isThumbnail to false, as videospheres do not currently support thumbnails.
  if (scene.field_videosphere) {
    sky = scene.field_videosphere;
    isThumbnail = false;
    type = 'videosphere';
  }

  // If the expected result should point to a thumbnail file, parse the
  // thumbnail out of the sky's meta object...
  if (isThumbnail) {
    if (sky.meta.derivatives) {
      url = sky.meta.derivatives.sc;
    }
  }
  // ... Otherwise, just grab a link to the full asset.
  else {
    const self = new URL(sky.links.self);
    url = `${self.origin}${sky.url}`;
  }

  return { url, type };
};

export default parseSkyFromScene;
