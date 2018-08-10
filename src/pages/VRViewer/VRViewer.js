/**
 * @file VRViewer.js
 * Exports a React component that render's EditVR's experience viewer.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../../constants';
import Scene from '../../aframe/entities/scene';

class VRViewer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        username: PropTypes.string.isRequired,
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
      match: {
        params: { username, experienceSlug }
      }
    } = this.props;
    dispatch({
      type: OPEN_EXPERIENCE_FETCH_FOR_USER,
      experienceSlug,
      user: {
        username
      }
    });
  }

  /**
   * {@inheritdoc}
   */
  render() {
    return <Scene />;
  }
}

export default VRViewer;
