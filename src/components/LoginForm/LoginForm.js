/**
 * @file LoginForm.js
 * Exports a component that allows users to log into EditVR.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

import { FormLoading, FormMessage } from '../';
import LoginFormStyles from './LoginForm.style';

class LoginForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      logUserIn: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    submitHandler: false
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
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ apiLoading: true });
    const { username, password } = this.state;
    const {
      actions: { logUserIn }
    } = this.props;

    logUserIn(username, password).catch(error => {
      this.setState({ apiLoading: false, apiMessage: error.toString() });
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const { classes, submitHandler } = this.props;
    const { apiLoading, apiMessage } = this.state;

    return (
      <form onSubmit={submitHandler || this.handleSubmit}>
        {apiMessage && <FormMessage>{apiMessage}</FormMessage>}
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
        {apiLoading && <FormLoading />}
      </form>
    );
  }
}

export default withStyles(LoginFormStyles)(LoginForm);
