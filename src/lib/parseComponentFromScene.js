/**
 * @file parseComponentFromScene.js
 * Exports a helper method that assists in parsing a specific component from a given scene.
 */

/**
 * Helper method that parses a component, by it's id, from a given scene.
 *
 * @param {object} scene - Scene object, containing components.
 * @param {array} scene.field_components - Array containing component objects.
 * @param {string} id - String ID of the component to be extracted.
 *
 * @returns {object|null}
 *   Component object for the specified ID, or null if none is found.
 */
const parseComponentFromScene = (scene = {}, id = null) => {
  // If no scene or component ID are specified, return null.
  if (
    !scene ||
    !Object.prototype.hasOwnProperty.call(scene, 'field_components') ||
    !id
  ) {
    return null;
  }

  // Filter the component array, only include components with the specified ID.
  const component = scene.field_components.filter(c => c.id === id);

  // If no component is found, return null.
  if (!component || component.length < 1) {
    return null;
  }

  return component[0];
};

export default parseComponentFromScene;
