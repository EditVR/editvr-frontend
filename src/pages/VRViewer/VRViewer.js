/**
 * @file VRViewer.js
 * Exports a React component that render's EditVR's experience viewer.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../../constants';
import Scene from '../../aframe/entities/scene';
import { Loading } from '../../components';

class VRViewer extends Component {
  static propTypes = {
    experience: PropTypes.shape({
      scenes: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string
        })
      )
    }),
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        username: PropTypes.string.isRequired,
        experienceSlug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    experience: {}
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
    const {
      experience,
      match: {
        params: { sceneSlug }
      }
    } = this.props;

    if (!experience) {
      return <Loading />;
    }

    if (experience.scenes && !experience.scenes[sceneSlug]) {
      return <Redirect to="/404" />;
    }

    return <Scene />;
  }
}

export default VRViewer;
