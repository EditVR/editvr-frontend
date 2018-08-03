/**
 * @file ComponentCreateMenu.js
 * Exports a component that renders EditVR's component creation menu.
 */

/* globals AFRAME */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Button } from '@material-ui/core';

import {
  OPEN_EXPERIENCE_COMPONENT_CREATE,
  COMPONENT_TYPE_DIALOG
} from '../../constants';

class ComponentCreateMenu extends Component {
  static propTypes = {
    anchorElement: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    handleClose: PropTypes.func,
    depthIndex: PropTypes.number
  };

  static defaultProps = {
    anchorElement: false,
    handleClose: () => {},
    depthIndex: -4
  };

  /**
   * Helper method that grabs the camera's position/direction from A-Frame.
   */
  getCameraPosition = () => {
    const cameraEl = document.querySelector('a-scene').camera.el;
    const vector = new AFRAME.THREE.Vector3(0, 0, this.props.depthIndex);
    vector.applyQuaternion(cameraEl.object3D.quaternion);
    return vector;
  };

  /**
   * Dispatches an action that creates a Dialog component.
   */
  createDialog = () => {
    const {
      user,
      handleClose,
      dispatch,
      match: {
        params: { sceneSlug }
      }
    } = this.props;
    const { x: field_x, y: field_y, z: field_z } = this.getCameraPosition();
    dispatch({
      type: OPEN_EXPERIENCE_COMPONENT_CREATE,
      componentType: COMPONENT_TYPE_DIALOG,
      user,
      fields: {
        title: 'New Component',
        field_body: 'Please create information text for this component.',
        field_x,
        field_y,
        field_z
      },
      sceneSlug,
      successHandler: () => {
        handleClose();
      }
    });
  };

  render() {
    const { anchorElement, handleClose } = this.props;
    return (
      <Menu
        anchorEl={anchorElement || null}
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        <MenuItem onClick={this.createDialog}>Create a Dialog</MenuItem>
        <MenuItem>Create a Link</MenuItem>
        <MenuItem>Create a Sound</MenuItem>
      </Menu>
    );
  }
}

export default ComponentCreateMenu;
