/**
 * @file Message.js
 * Exports a component that renders a given form message.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Message = ({ children }) =>
  children ? <Typography variant="subheading">{children}</Typography> : null;

Message.propTypes = {
  children: PropTypes.node
};

Message.defaultProps = {
  children: null
};

export default Message;
