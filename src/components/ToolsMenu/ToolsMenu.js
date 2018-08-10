/**
 * @file ToolsMenu.js
 * Exports a component that renders EditVR's tools.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Button, Tooltip } from '@material-ui/core';
import { OpenWith, TouchApp, PanTool } from '@material-ui/icons';

import {
  MODE_COMPONENT_SELECTING,
  MODE_COMPONENT_PLACING
} from '../../constants';
import ToolsMenuStyles from './ToolsMenu.style';

const ToolsMenu = ({
  classes,
  history: {
    location: { pathname: location }
  },
  match: {
    params: { experienceSlug, sceneSlug }
  }
}) => {
  const basePath = `/experience/vreditor/${experienceSlug}`;
  const previewPath = `${basePath}/${sceneSlug !== 'scene' ? sceneSlug : ''}`;
  const selectingPath = `${basePath}/${sceneSlug}/${MODE_COMPONENT_SELECTING}`;
  const placingPath = `${basePath}/${sceneSlug}/${MODE_COMPONENT_PLACING}`;

  if (!sceneSlug || sceneSlug === 'scene') {
    return null;
  }

  return (
    <Fragment>
      <Tooltip title="Preview" placement="right-start">
        <Button
          className={classes.toolButton}
          variant="fab"
          component={Link}
          disabled={location === previewPath}
          color="primary"
          to={previewPath}
        >
          <OpenWith />
        </Button>
      </Tooltip>
      <Tooltip title="Select components for editing" placement="right-start">
        <Button
          className={classes.toolButton}
          variant="fab"
          component={Link}
          disabled={location === selectingPath}
          color="primary"
          to={selectingPath}
        >
          <TouchApp />
        </Button>
      </Tooltip>
      <Tooltip
        title="Position components by dragging and dropping them"
        placement="right-start"
      >
        <Button
          className={classes.toolButton}
          variant="fab"
          component={Link}
          disabled={location === placingPath}
          color="primary"
          to={placingPath}
        >
          <PanTool />
        </Button>
      </Tooltip>
    </Fragment>
  );
};

ToolsMenu.propTypes = {
  classes: PropTypes.shape({
    toolButton: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      experienceSlug: PropTypes.string.isRequired,
      sceneSlug: PropTypes.string
    }).isRequired
  }).isRequired
};

ToolsMenu.defaultProps = {};

export default withStyles(ToolsMenuStyles)(ToolsMenu);
