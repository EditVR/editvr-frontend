/**
 * @file VREditor.js
 * Exports a React component that render's EditVR's VREditor interface.
 */

import React, { Component } from 'react';

import { VREditorLayout } from '../../layouts';

class VREditor extends Component {
  componentWillMount() {
    // Eventually, this will load an experience object from the API.
  }
  render() {
    return (
      <VREditorLayout
        title="Edit Example Experience"
        leftAside="Left Sidebar"
        rightAside="Right Sidebar"
      >
        Hey there, this will soon be a VR scene.
      </VREditorLayout>
    );
  }
}

export default VREditor;
