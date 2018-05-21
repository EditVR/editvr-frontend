/**
 * @file FormMessage.js
 * Exports a component that renders a given form message.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const FormMessage = ({ children }) => (
  <Fragment>
    {children && <Typography variant="subheading">{children}</Typography>}
  </Fragment>
);

FormMessage.propTypes = {
  children: PropTypes.node
};

FormMessage.defaultProps = {
  children: null
};

export default FormMessage;
