/**
 * @file shallowEqual.js
 * Exports a shallowEqual object comparison helper function.
 * {@see https://github.com/reduxjs/react-redux/blob/1d6d9bd8f2fdd6537a026e68422455873bf69a9a/src/utils/shallowEqual.js}.
 */

const hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }

  /* eslint-disable-next-line no-self-compare */
  return x !== x && y !== y;
}

export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
