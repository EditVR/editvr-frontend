/**
 * @file popper.js.js
 * Mocks Popper.js (library name includes the .js, hence the double .js.js extension on this file).
 * Popper.js is used by Material-UI to support tooltips.
 */

export default class Popper {
  static placements = [
    'auto',
    'auto-end',
    'auto-start',
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start'
  ];

  constructor() {
    return {
      destroy: () => {},
      scheduleUpdate: () => {}
    };
  }
}
