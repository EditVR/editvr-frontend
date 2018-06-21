/**
 * @file redux.js
 * AFrame system that connects AFrame to Redux store.
 */

/* global AFRAME */

import { store } from '../../lib/reduxStore';

AFRAME.registerSystem('redux-store', {
  schema: {},
  init: () => {
    
  }
});
