/**
 * @file scene.js
 * Exports main AFrame scene.
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import aframe from 'aframe';

require('../components/spawnSky');

export default () => (
  <a-scene
    embedded
    inspector="url: https://aframe.io/releases/0.4.0/aframe-inspector.min.js"
  >
    <a-sky spawn-sky="" />
  </a-scene>
);
