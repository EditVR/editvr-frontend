/**
 * @file scene.js
 * Exports main AFrame scene.
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import aframe from 'aframe/src';

import registerClickDrag from '../components/clickDrag';

require('@editvr/aframe-dialog-popup-component');
require('@editvr/aframe-simple-link-component');
require('aframe-look-at-component');
require('../components/spawnSky');
require('../components/spawnComponents');
require('../components/dialogPopup.container');
require('../components/simpleLink.container');
require('../components/isEditable');
require('../components/isDraggable');

registerClickDrag(aframe);

export default () => (
  <a-scene
    embedded
    spawn-components=""
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
