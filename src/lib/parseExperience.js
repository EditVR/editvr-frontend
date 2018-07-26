/**
 * @file parseExperience.js
 * Exports a helper method that assists in parsing out a specific experience.
 */

/**
 * Helper method that parses an experience, by it's slug, from an experiences array.
 *
 * @param {object} experiences
 *   Object containing experiences.
 * @param {array} experiences.items
 *   Array containing experiences.
 * @param {string} experience.items[].field_experience_path
 *   String slug of this experience item.
 * @param {string} experienceSlug
 *   String specifying the slug of the experience to extract.
 *
 * @returns {object|null}
 *   Experience object, or null.
 */
const parseExperience = (experiences = {}, experienceSlug = null) => {
  if (
    !experiences ||
    !Object.prototype.hasOwnProperty.call(experiences, 'items') ||
    !experiences.items ||
    experiences.items.length <= 0 ||
    !experienceSlug
  ) {
    return null;
  }

  // Filter the experience items and only include experiences with the correct
  // slug value.
  const experience = experiences.items.find(
    item => item.field_experience_path === experienceSlug
  );

  if (!experience) {
    return null;
  }

  return experience;
};

export default parseExperience;
