/**
 * @file parseSceneFromExperience.test.js
 * Contains tests for parseSceneFromExperience.js.
 */

import parseSceneFromExperience from './parseSceneFromExperience';

describe('lib->parseSceneFromExperience()', () => {
  it('Can parse a scene out of an experience object.', () => {
    const sceneSlug = 'test';
    const scene = {
      field_slug: sceneSlug
    };
    const experience = {
      field_scenes: [scene]
    };

    const parsed = parseSceneFromExperience(experience, sceneSlug);
    expect(parsed).toEqual(scene);
  });

  it('Returns null if no experience or scene is provided.', () => {
    const parsed = parseSceneFromExperience();
    expect(parsed).toBe(null);
  });

  it('Returns null if no scenes exist on the experience.', () => {
    const parsed = parseSceneFromExperience({}, 'test');
    expect(parsed).toBe(null);
  });

  it('Returns null if no scene is specified.', () => {
    const parsed = parseSceneFromExperience({
      field_scenes: [{ field_slug: 'test' }]
    });
    expect(parsed).toBe(null);
  });

  it('Returns null if the specified scene does not exist within the given experience.', () => {
    const parsed = parseSceneFromExperience(
      {
        field_scenes: [{ field_slug: 'test' }]
      },
      'chicken_mcnugget'
    );
    expect(parsed).toBe(null);
  });
});
