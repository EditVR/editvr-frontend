/**
 * @file FormMessage.js
 * Exports a component that renders a given form message.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const FormMessage = ({ children }) =>
  children ? <Typography variant="subheading">{children}</Typography> : null;

FormMessage.propTypes = {
  children: PropTypes.node
};

FormMessage.defaultProps = {
  children: null
};

export default FormMessage;
