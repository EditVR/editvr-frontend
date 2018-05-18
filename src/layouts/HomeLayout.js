/**
 * @file Home.js
 * Exports a React component that renders EditVR's home page layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import ThemeProvider from './ThemeProvider';
import Footer from './Footer';
import Header from './Header';
import LayoutStyles from './Layout.style';

const Home = ({ children, classes }) => (
  <div id="layout__wrapper" className={classes.wrapper}>
    <div id="layout__center" className={classes.centerColumn}>
      <Header />
      {children}
      <Footer />
    </div>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    centerColumn: PropTypes.string.isRequired
  }).isRequired
};

Home.defaultProps = {
  children: null
};

const HomeLayout = ThemeProvider(withStyles(LayoutStyles)(Home));

export { HomeLayout };
