/**
 * @file DashboardLayout.js
 * Exports a React component that renders EditVR's dashboard layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  withStyles,
  AppBar,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { ExitToApp, PanoramaWideAngle } from '@material-ui/icons';
import LoadingBar from 'react-redux-loading-bar';

import { ThemeProvider } from '../../hoc';
import DashboardLayoutStyles from './DashboardLayout.style';
import EditVRLogo from '../../assets/editvr-logo.svg';

const DashboardLayout = ({ title, children, classes }) => (
  <div id="layout__wrapper" className={classes.wrapper}>
    <LoadingBar style={{ backgroundColor: '#FFFFFF' }} />
    <AppBar className={classes.appBar}>
      <Toolbar>
        <img src={EditVRLogo} alt="EditVR logo" className={classes.logo} />
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <PanoramaWideAngle />
          </ListItemIcon>
          <ListItemText>Experiences</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </Drawer>
    <main className={classes.content}>
      {title && <Typography variant="headline">{title}</Typography>}
      {children}
    </main>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
};

DashboardLayout.defaultProps = {
  children: null,
  title: null
};

export default ThemeProvider(
  withStyles(DashboardLayoutStyles)(DashboardLayout)
);
