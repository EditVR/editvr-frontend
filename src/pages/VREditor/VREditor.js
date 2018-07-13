/**
 * @file VREditor.js
 * Exports a React component that render's EditVR's VREditor interface.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import { SceneCards, SceneForm, ToolsMenu } from '../../components';
import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  MODE_SCENE_CREATE,
  MODE_SCENE_EDIT
} from '../../constants';
import parseSceneFromExperience from '../../lib/parseSceneFromExperience';
import Scene from '../../aframe/entities/scene';
import { VREditorLayout } from '../../layouts';
import VREditorStyles from './VREditor.style';

class VREditor extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      columnRight: PropTypes.string.isRequired,
      columnLeft: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      buttonIcon: PropTypes.string.isRequired
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
        experienceSlug: PropTypes.string.isRequired,
        editorMode: PropTypes.string
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
      match: {
        params: { sceneSlug, editorMode }
      },
      experience: { item: experience },
      classes
    } = this.props;

    // If no experience is provided, redirect to the dashboard.
    if (!experience) {
      return <Redirect to="/dashboard" />;
    }

    const {
      title,
      field_experience_path: path,
      field_scenes: scenes
    } = experience;

    // The main column defaults to showing instructions to create or select a scene
    let mainColumn = <Scene />;

    // If the editor mode is scene creation, show the scene form.
    if (editorMode === MODE_SCENE_CREATE) {
      mainColumn = (
        <div className={classes.mainColumn}>
          <Typography variant="headline">Create a Scene</Typography>
          <SceneForm />
        </div>
      );
    }

    // If the editor mode is scene edit, return the scene form.
    if (editorMode === MODE_SCENE_EDIT) {
      const scene = parseSceneFromExperience(experience, sceneSlug);
      if (scene) {
        mainColumn = (
          <div className={classes.mainColumn}>
            <Typography variant="headline">{`Edit ${scene.title}`}</Typography>
            <SceneForm sceneSlug={sceneSlug} />
          </div>
        );
      }
    }

    // If no scene slug is selected, or if the editor is in it's default mode
    // and the sceneSlug is 'scene', tell the user to select or add a scene.
    if (!sceneSlug || (!editorMode && sceneSlug === 'scene')) {
      mainColumn = (
        <div className={classes.mainColumn}>
          <Typography variant="headline">
            Select or create a scene to continue.
          </Typography>
        </div>
      );
    }

    return (
      <VREditorLayout
        title={experience.title ? `Editing ${title} Experience` : 'Loading...'}
        leftAside={
          <Grid container align="stretch">
            <Grid
              item
              xs={3}
              id="column--left_aside"
              className={classes.columnLeft}
            >
              <Typography variant="title">Tools</Typography>
              <ToolsMenu />
            </Grid>
            <Grid
              item
              xs={9}
              id="column--left_aside"
              className={classes.columnRight}
            >
              <Typography variant="title">Scenes</Typography>
              {scenes && (
                <Button
                  variant="raised"
                  color="primary"
                  component={Link}
                  className={classes.button}
                  to={`/experience/vreditor/${path}/scene/${MODE_SCENE_CREATE}`}
                >
                  Create
                  <AddBox className={classes.buttonIcon} />
                </Button>
              )}
              <SceneCards />
            </Grid>
          </Grid>
        }
        rightAside="Right Sidebar"
      >
        {mainColumn}
      </VREditorLayout>
    );
  }
}

export default withStyles(VREditorStyles)(VREditor);
