/**
 * @file parseExperience.test.js
 * Contains tests for parseSceneFromExperience.js.
 */

import parseExperience from './parseExperience';

describe('lib->parseExperience()', () => {
  it('Can parse an experience out of an experiences array based on the slug.', () => {
    const experienceSlug = 'test';
    const experiences = {
      items: [
        {
          field_experience_path: experienceSlug
        }
      ]
    };

    const parsed = parseExperience(experiences, experienceSlug);
    expect(parsed).toEqual(experiences.items[0]);
  });

  it('Returns null if no experiences or experienceSlug is provided.', () => {
    const parsed = parseExperience();
    expect(parsed).toBe(null);
  });

  it('Returns null if no experiences exist.', () => {
    const parsed = parseExperience({}, 'test');
    expect(parsed).toBe(null);
  });

  it('Returns null if no experience is specified.', () => {
    const parsed = parseExperience({
      items: [{ field_experience_path: 'test' }]
    });
    expect(parsed).toBe(null);
  });

  it('Returns null if the specified experience does not exist within the given experience list.', () => {
    const parsed = parseExperience(
      {
        items: [{ field_experience_path: 'test' }]
      },
      'chicken_mcnugget'
    );
    expect(parsed).toBe(null);
  });
});
