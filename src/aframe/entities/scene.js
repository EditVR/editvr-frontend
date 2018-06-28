/**
 * @file scene.js
 * Exports main AFrame scene.
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import aframe from 'aframe/src';

require('aframe-look-at-component');
require('../components/spawnSky');
require('../components/spawnLinks');
require('../components/navLink');

export default () => (
  <a-scene
    embedded
    spawn-links=""
    inspector="url: https://aframe.io/releases/0.4.0/aframe-inspector.min.js"
  >
    <a-entity id="camera" look-controls="false" cursor="rayOrigin: mouse" />
    <a-sky spawn-sky="" />
  </a-scene>
);
