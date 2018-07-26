/**
 * @file VREditor.js
 * Exports a React component that render's EditVR's VREditor interface.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { AddBox, OpenWith, TouchApp } from '@material-ui/icons';

import {
  SceneCards,
  SceneForm,
  ToolsMenu,
  ComponentForm
} from '../../components';
import {
  OPEN_EXPERIENCE_FETCH_FOR_USER,
  MODE_SCENE_CREATE,
  MODE_SCENE_EDIT,
  MODE_COMPONENT_SELECTING
} from '../../constants';
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
    }).isRequired,
    component: PropTypes.shape({
      id: PropTypes.string
    })
  };

  static defaultProps = {
    experience: {
      item: {
        title: false
      }
    },
    component: {
      id: null
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
      component: { id: component },
      classes
    } = this.props;

    // If no experience is provided, redirect to the dashboard.
    if (!experience) {
      return <Redirect to="/dashboard" />;
    }

    const { title, field_experience_path: path, scenes } = experience;

    const scene = sceneSlug && scenes ? scenes[sceneSlug] : null;
    // TODO: The logic for determining what to render in the main and right
    // columns should likely be extracted from this file and placed into another
    // component, just to make this component less cluttered. This isn't a
    // difficult thing to do, and this component isn't yet too messy, so for now
    // holding the logic in here will do.

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

    // Default right column to a preview message.
    let rightColumn = (
      <Fragment>
        <Typography variant="title" className={classes.columnRightTitle}>
          Previewing
          <OpenWith className={classes.columnRightIcon} />
        </Typography>
        <Typography>
          You are currently previewing your scene. You can use your mouse to
          grab the scene area, and drag it around to view different portions of
          your scene.
        </Typography>
      </Fragment>
    );

    // If the current mode is selecting, but no component has been selected,
    // show selection documentation in the right column.
    if (editorMode === MODE_COMPONENT_SELECTING && !component) {
      rightColumn = (
        <Fragment>
          <Typography variant="title" className={classes.columnRightTitle}>
            Selecting
            <TouchApp className={classes.columnRightIcon} />
          </Typography>
          <Typography>
            You are currently in the selecting mode. You can use your mouse to
            select components. Upon being selected, a component will be opened
            in this pane and you can edit its properties.
          </Typography>
        </Fragment>
      );
    }

    // If the current mode is selecting, and a component has been selected,
    // show the component editorial form.
    if (editorMode === MODE_COMPONENT_SELECTING && component) {
      const selected = scene ? scene.components[component] : null;
      if (selected) {
        rightColumn = (
          <Fragment>
            <Typography variant="title" className={classes.columnRightTitle}>
              Edit {selected.title}
            </Typography>
            <ComponentForm id={component} />
          </Fragment>
        );
      }
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
        rightAside={<div className={classes.columnRight}>{rightColumn}</div>}
      >
        {mainColumn}
      </VREditorLayout>
    );
  }
}

export default withStyles(VREditorStyles)(VREditor);
