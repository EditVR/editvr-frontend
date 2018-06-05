/**
 * @file ThinLayout.js
 * Exports a React component that renders EditVR's thin layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import LoadingBar from 'react-redux-loading-bar';

import { ThemeProvider } from '../../hoc';
import { Header, Footer } from '../';
import ThinLayoutStyles from './ThinLayout.style';

const ThinLayout = ({ title, children, classes }) => (
  <div id="layout__wrapper" className={classes.wrapper}>
    <LoadingBar style={{ backgroundColor: '#FFFFFF' }} />
    <div id="layout__thin-wrapper" className={classes.thinWrapper}>
      <Header />
      {title && <Typography variant="headline">{title}</Typography>}
      {children}
      <Footer />
    </div>
  </div>
);

ThinLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    thinWrapper: PropTypes.string.isRequired
  }).isRequired
};

ThinLayout.defaultProps = {
  children: null,
  title: null
};

export default ThemeProvider(withStyles(ThinLayoutStyles)(ThinLayout));
