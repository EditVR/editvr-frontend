/**
 * @file NotFound.js
 * Exports a React component that render's EditVR's NotFound route.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

import { ThemeProvider } from '../../hoc';
import NotFoundStyles from './NotFound.style';

const NotFound = ({ classes: { wrapper, text } }) => (
  <div className={wrapper}>
    <Typography className={text} variant="headline">
      Not Found
    </Typography>
    <Typography className={text}>
      The page you requested does not exist.
    </Typography>
  </div>
);

NotFound.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default ThemeProvider(withStyles(NotFoundStyles)(NotFound));
