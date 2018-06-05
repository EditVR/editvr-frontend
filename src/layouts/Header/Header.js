/**
 * @file Header.js
 * Exports EditVR's primary header.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import HeaderStyles from './Header.style';
import EditVRLogo from '../../assets/editvr-logo.svg';

const Header = ({ classes }) => (
  <header className={classes.wrapper}>
    <img src={EditVRLogo} alt="EditVR logo" className={classes.logo} />
  </header>
);

Header.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(HeaderStyles)(Header);
