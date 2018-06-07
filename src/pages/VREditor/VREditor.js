/**
 * @file VREditor.js
 * Exports a React component that render's EditVR's VREditor interface.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../../constants';
import { VREditorLayout } from '../../layouts';

class VREditor extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      authentication: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        csrfToken: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        experienceSlug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  /**
   * {@inheritdoc}
   */
  componentWillMount() {
    const {
      dispatch,
      user,
      match: {
        params: { experienceSlug }
      }
    } = this.props;
    dispatch({
      type: OPEN_EXPERIENCE_FETCH_FOR_USER,
      experienceSlug,
      user
    });
  }

  /**
   * {@inheritdoc}
   */
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
