/**
 * @file Footer.js
 * Exports EditVR's primary footer.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

import FooterStyles from './Footer.style';
import footerLogo from '../../assets/4k-logo-reversed.svg';

const Footer = ({ classes }) => (
  <footer className={classes.wrapper}>
    <div className={classes.elements}>
      <a href="https://fourkitchens.com">
        <Typography type="body1" className={classes.text}>
          EditVR is a product of
        </Typography>
        <img src={footerLogo} alt="Four Kitchens" className={classes.logo} />
      </a>
    </div>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    elements: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(FooterStyles)(Footer);
