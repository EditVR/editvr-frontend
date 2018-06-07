/**
 * @file VREditor.js
 * Exports a React component that render's EditVR's VREditor interface.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';

import { SceneCards } from '../../components';
import { OPEN_EXPERIENCE_FETCH_FOR_USER } from '../../constants';
import { VREditorLayout } from '../../layouts';
import VREditorStyles from './VREditor.style';

class VREditor extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      columnRight: PropTypes.string.isRequired,
      columnLeft: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      authentication: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        csrfToken: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    experience: PropTypes.shape({
      item: PropTypes.shape({
        title: PropTypes.string
      })
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        experienceSlug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    experience: {
      item: {
        title: false
      }
    }
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
    const {
      experience: { item: experience },
      classes
    } = this.props;
    return (
      <VREditorLayout
        title={
          experience.title
            ? `Editing ${experience.title} Experience`
            : 'Loading...'
        }
        leftAside={
          <Grid container align="stretch">
            <Grid
              item
              xs={3}
              id="column--left_aside"
              className={classes.columnLeft}
            />
            <Grid
              item
              xs={9}
              id="column--left_aside"
              className={classes.columnRight}
            >
              <SceneCards />
            </Grid>
          </Grid>
        }
        rightAside="Right Sidebar"
      >
        Hey there, this will soon be a VR scene.
      </VREditorLayout>
    );
  }
}

export default withStyles(VREditorStyles)(VREditor);
