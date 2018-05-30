/**
 * @file Message.js
 * Exports a component that renders a given form message.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Message = ({ children }) => (
  <Fragment>
    {children && <Typography variant="subheading">{children}</Typography>}
  </Fragment>
);

Message.propTypes = {
  children: PropTypes.node
};

Message.defaultProps = {
  children: null
};

export default Message;
