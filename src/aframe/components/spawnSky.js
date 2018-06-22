/**
 * @file spawnSky.js
 * AFrame component responsible for the sky sound components.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

const spawnSky = {
  init: function init() {
    console.log(this);
  }
};

AFRAME.registerComponent(
  'spawn-sky',
  connectRedux(state => ({
    state
  }))(
    connectRouter(spawnSky, '/experience/vreditor/:experienceSlug/:sceneSlug')
  )
);
