/**
 * @file shallowEqual.test.js
 * Tests for shallowEqual.js.
 */

import shallowEqual from './shallowEqual';

describe('aframe->utils->shallowEqual()', () => {
  it('Returns true if the objects are literally the same.', () => {
    const test = {};
    expect(shallowEqual(test, test)).toBe(true);
  });

  it('Returns false if either input is null.', () => {
    const test = {};
    expect(shallowEqual(null, test)).toBe(false);
    expect(shallowEqual(test, null)).toBe(false);
  });

  it('Returns true if both inputs are null.', () => {
    expect(shallowEqual(null, null)).toBe(true);
  });

  it('Returns false if object lengths are different.', () => {
    const testA = { test: '' };
    const testB = { ...testA, testTwo: '' };
    expect(shallowEqual(testA, testB)).toBe(false);
  });

  it('Returns false if objects are the same length, but have different properties.', () => {
    const testA = { propertyOne: '' };
    const testB = { propertyTwo: '' };
    expect(shallowEqual(testA, testB)).toBe(false);
  });

  it('Returns false if objects are the same length and have the same properties, but those properties have different values.', () => {
    const testA = { propertyOne: 'valueOne' };
    const testB = { propertyOne: 'valueTwo' };
    expect(shallowEqual(testA, testB)).toBe(false);
  });
});
