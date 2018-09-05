/**
 * @file Message.js
 * Exports a component that renders a given form message.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

import MessageStyles from './Message.style';

const Message = ({ children, classes, type }) =>
  children ? (
    <Typography
      variant="subheading"
      className={classNames(classes.message, {
        [classes.error]: type === 'error',
        [classes.info]: type === 'info'
      })}
    >
      {children}
    </Typography>
  ) : null;

Message.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    message: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
  }).isRequired,
  type: PropTypes.oneOf(['error', 'info'])
};

Message.defaultProps = {
  children: null,
  type: 'info'
};

export default withStyles(MessageStyles)(Message);
