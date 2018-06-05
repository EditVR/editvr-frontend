/**
 * @file Home.js
 * Exports a React component that renders EditVR's home page.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { ThinLayout } from '../../layouts';
import HomeStyles from './Home.style';

const Home = ({ classes }) => (
  <ThinLayout>
    <Typography type="body1">
      <b>EditVR is a free, open-source WebVR editor</b> that lets you produce
      interactive and affordable 360 tours and VR stories. EditVR makes
      immersive experiences available to everyone using devices they already
      own. Nothing to buy, download, or install!
    </Typography>

    <NavLink to="/login">
      <Button className={classes.button} variant="raised" color="primary">
        Login
      </Button>
    </NavLink>
    <NavLink to="/register">
      <Button className={classes.button} variant="raised" color="primary">
        Register
      </Button>
    </NavLink>
  </ThinLayout>
);

Home.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(HomeStyles)(Home);
