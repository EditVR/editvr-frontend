/**
 * @file RegisterForm.js
 * Exports a component that allows users to register for an EditVR account.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

import { Message } from '../';
import RegisterFormStyles from './RegisterForm.style';
import { USER_REGISTER } from '../../constants';

class RegisterForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      error: PropTypes.string
    })
  };

  static defaultProps = {
    submitHandler: false,
    user: {
      error: null
    }
  };

  /**
   * Handles a login form submit action.
   *
   * @param {object} event - Submit event object.
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({
      type: USER_REGISTER,
      email: event.target[0].value,
      password: event.target[1].value
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const {
      classes,
      submitHandler,
      user: { error }
    } = this.props;
    return (
      <form onSubmit={submitHandler || this.handleSubmit}>
        {error && <Message>{error}</Message>}
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          className={classes.textField}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          className={classes.textField}
        />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Register & Login &gt;
        </Button>
      </form>
    );
  }
}

export default withStyles(RegisterFormStyles)(RegisterForm);
