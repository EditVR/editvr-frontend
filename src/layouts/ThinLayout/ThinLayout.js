/**
 * @file ThinLayout.js
 * Exports a React component that renders EditVR's thin layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import { ThemeProvider } from '../../hoc';
import { Header, Footer } from '../';
import ThinLayoutStyles from './ThinLayout.style';

const ThinLayout = ({ children, classes }) => (
  <div id="layout__wrapper" className={classes.wrapper}>
    <div id="layout__thin-wrapper" className={classes.thinWrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  </div>
);

ThinLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    thinWrapper: PropTypes.string.isRequired
  }).isRequired
};

ThinLayout.defaultProps = {
  children: null
};

export default ThemeProvider(withStyles(ThinLayoutStyles)(ThinLayout));
