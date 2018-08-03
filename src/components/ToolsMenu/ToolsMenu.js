/**
 * @file ToolsMenu.js
 * Exports a component that renders EditVR's tools.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles, Button, Tooltip } from '@material-ui/core';
import { OpenWith, TouchApp, PanTool, AddCircle } from '@material-ui/icons';

import {
  MODE_COMPONENT_SELECTING,
  MODE_COMPONENT_PLACING
} from '../../constants';
import ToolsMenuStyles from './ToolsMenu.style';
import { ComponentCreateMenu } from '../';

class ToolsMenu extends Component {
  state = {
    componentMenuIsOpen: false
  };

  /**
   * Helper method that opens the component menu.
   *
   * @param {object} event - Object of event spawned to call this method.
   */
  openComponentMenu = event => {
    this.setState({ componentMenuAnchor: event.currentTarget });
  };

  /**
   * Helper method that closes the component menu.
   */
  closeComponentMenu = event => {
    this.setState({ componentMenuAnchor: false });
  };

  /**
   * {@inheritdoc}
   */
  render() {
    const {
      classes,
      history: {
        location: { pathname: location }
      },
      match: {
        params: { experienceSlug, sceneSlug }
      }
    } = this.props;
    const basePath = `/experience/vreditor/${experienceSlug}`;
    const previewPath = `${basePath}/${sceneSlug !== 'scene' ? sceneSlug : ''}`;
    const selectingPath = `${basePath}/${sceneSlug}/${MODE_COMPONENT_SELECTING}`;
    const placingPath = `${basePath}/${sceneSlug}/${MODE_COMPONENT_PLACING}`;

    if (!sceneSlug || sceneSlug === 'scene') {
      return null;
    }

    return (
      <div className={classes.wrapper}>
        <Tooltip title="Preview" placement="right">
          <Button
            className={classNames(classes.button, classes.link)}
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
            className={classNames(classes.button, classes.link)}
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
          placement="right"
        >
          <Button
            className={classNames(classes.button, classes.link)}
            variant="fab"
            component={Link}
            disabled={location === placingPath}
            color="primary"
            to={placingPath}
          >
            <PanTool />
          </Button>
        </Tooltip>
        <Tooltip title="Create a new component" placement="right">
          <Button
            className={classes.button}
            variant="fab"
            color="primary"
            onClick={this.openComponentMenu}
          >
            <AddCircle />
          </Button>
        </Tooltip>
        <ComponentCreateMenu
          anchorElement={this.state.componentMenuAnchor}
          handleClose={this.closeComponentMenu}
        />
      </div>
    );
  }
}

ToolsMenu.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired
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
