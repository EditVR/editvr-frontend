/**
 * @file parseSceneFromExperience.js
 * Exports a helper method that assists in parsing a specific scene from a given experience.
 */

/**
 * Helper method that parses a scene, by it's slug, from a given experience.
 *
 * @param {object} experience - Experience object, containing scenes.
 * @param {array} experience.field_scenes - Array containing scene objects.
 * @param {string} sceneSlug - String specifying the slug of the scene to extract.
 *
 * @returns {object|null}
 *   Scene object from experience.field_scenes for the given sceneSlug, or null.
 */
const parseSceneFromExperience = (experience = {}, sceneSlug = null) => {
  // If no experience or scene is specified, return null.
  if (
    !experience ||
    !Object.prototype.hasOwnProperty.call(experience, 'field_scenes') ||
    !sceneSlug
  ) {
    return null;
  }

  // Filter the scene array, only include scenes with the correct slug.
  const scene = experience.field_scenes.find(s => s.field_slug === sceneSlug);

  if (!scene) {
    return null;
  }

  return scene;
};

export default parseSceneFromExperience;
