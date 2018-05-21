/**
 * @file FormLoading.js
 * Exports a component that renders an indeterminate loading spinner for forms.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, withStyles } from '@material-ui/core';

import FormLoadingStyles from './FormLoading.style';

const FormLoading = ({ classes: { spinner } }) => (
  <CircularProgress className={spinner} size={32} />
);

FormLoading.propTypes = {
  classes: PropTypes.shape({
    spinner: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(FormLoadingStyles)(FormLoading);
