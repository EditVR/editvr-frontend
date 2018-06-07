/**
 * @file VREditorLayout.js
 * Exports a React component that renders EditVR's VREditor layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import LoadingBar from 'react-redux-loading-bar';

import { ThemeProvider } from '../../hoc';
import VREditorLayoutStyles from './VREditorLayout.style';
import EditVRLogo from '../../assets/editvr-logo.svg';

const VREditorLayout = ({
  title,
  children,
  leftAside,
  rightAside,
  classes
}) => (
  <Grid
    container
    id="editor__wrapper"
    align="stretch"
    className={classes.wrapper}
  >
    <LoadingBar style={{ backgroundColor: '#FFFFFF' }} />
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Back to Dashboard"
          component={Link}
          to="/dashboard"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <img src={EditVRLogo} alt="EditVR logo" className={classes.logo} />
        <Typography variant="title">{title}</Typography>
      </Toolbar>
    </AppBar>
    <Grid item xs={3} className={classes.aside}>
      {leftAside}
    </Grid>
    <Grid item xs={6} className={classes.middle}>
      {children}
    </Grid>
    <Grid item xs={3} className={classes.aside}>
      {rightAside}
    </Grid>
  </Grid>
);

VREditorLayout.propTypes = {
  children: PropTypes.node,
  leftAside: PropTypes.node,
  rightAside: PropTypes.node,
  title: PropTypes.string,
  classes: PropTypes.shape({
    aside: PropTypes.string.isRequired,
    middle: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
};

VREditorLayout.defaultProps = {
  children: null,
  leftAside: null,
  rightAside: null,
  title: null
};

export default ThemeProvider(withStyles(VREditorLayoutStyles)(VREditorLayout));
