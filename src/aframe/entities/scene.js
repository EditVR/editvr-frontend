/**
 * @file scene.js
 * Exports main AFrame scene.
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import aframe from 'aframe/src';

require('@editvr/aframe-dialog-popup-component');
require('aframe-look-at-component');
require('../components/spawnSky');
require('../components/spawnLinks');
require('../components/spawnDialogs');
require('../components/navLink');
require('../components/isEditable');

export default () => (
  <a-scene
    embedded
    spawn-links=""
    spawn-dialogs=""
    inspector="url: https://aframe.io/releases/0.4.0/aframe-inspector.min.js"
  >
    <a-camera
      id="camera"
      wasd-controls-enabled="false"
      cursor="rayOrigin: mouse"
    />
    <a-sky spawn-sky="" />
  </a-scene>
);
