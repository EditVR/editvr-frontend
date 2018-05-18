/**
 * @file LoginForm.js
 * Exports a component that allows users to log into EditVR.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

import LoginFormStyles from './LoginForm.style';

class LoginForm extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    username: null,
    password: null,
    apiLoading: false,
    apiMessage: null
  };

  /**
   * Handles field update action.
   *
   * @param {object} event - Field update event.
   */
  handleFieldUpdate = event => {
    const state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  };

  /**
   * Handles a login form submit action.
   *
   * @param {object} event - Submit event object.
   */
  handleSubmit = event => {};

  /**
   * {@inheretdoc}
   */
  render() {
    const { classes } = this.props;
    const { apiLoading, apiMessage } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="username"
          label="Username"
          type="text"
          required
          onChange={this.handleFieldUpdate}
          className={classes.textField}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          onChange={this.handleFieldUpdate}
          className={classes.textField}
        />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Log In
        </Button>
      </form>
    );
  }
}

export default withStyles(LoginFormStyles)(LoginForm);
