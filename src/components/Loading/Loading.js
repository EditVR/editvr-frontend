/**
 * @file Loading.js
 * Exports a component that renders an indeterminate loading spinner.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Typography, withStyles } from '@material-ui/core';

import { ThemeProvider } from '../../hoc';
import LoadingStyles from './Loading.style';

const Loading = ({ classes: { wrapper, spinner, title } }) => (
  <div className={wrapper}>
    <LinearProgress className={spinner} />
    <Typography className={title} variant="headline">
      Loading...
    </Typography>
  </div>
);

Loading.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    spinner: PropTypes.string.isRequired
  }).isRequired
};

export default ThemeProvider(withStyles(LoadingStyles)(Loading));
