/**
 * @file parseComponentFromScene.test.js
 * Contains tests for parseComponentFromScene.js.
 */

import parseComponentFromScene from './parseComponentFromScene';

describe('lib->parseComponentFromScene()', () => {
  it('Can parse a component out of a scene object.', () => {
    const id = 'test';
    const component = { id };
    const scene = {
      field_components: [component]
    };

    const parsed = parseComponentFromScene(scene, id);
    expect(parsed).toEqual(component);
  });

  it('Returns null if no scene or component ID is provided.', () => {
    const parsed = parseComponentFromScene();
    expect(parsed).toBe(null);
  });

  it('Returns null if no components exist on the scene.', () => {
    const parsed = parseComponentFromScene({}, 'test');
    expect(parsed).toBe(null);
  });

  it('Returns null if no component ID is specified.', () => {
    const parsed = parseComponentFromScene({
      field_components: [{ id: 'test' }]
    });
    expect(parsed).toBe(null);
  });

  it('Returns null if the specified component does not exist within the given scene.', () => {
    const parsed = parseComponentFromScene(
      {
        field_components: [{ id: 'test' }]
      },
      'chicken_mcnugget'
    );
    expect(parsed).toBe(null);
  });
});
