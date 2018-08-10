/**
 * @file RegisterForm.js
 * Exports a component that allows users to register for an EditVR account.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';
import { withFormik } from 'formik';
import { string, object } from 'yup';

import { Message } from '../';
import RegisterFormStyles from './RegisterForm.style';
import {
  USER_REGISTER,
  FORM_BUTTON_LOGIN,
  FORM_BUTTON_REGISTER,
  FORM_INPUT_VALIDATION_REGEX_URL_SEGMENT
} from '../../constants';

const RegisterForm = ({
  classes,
  user: { error },
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur
}) => (
  <form onSubmit={handleSubmit}>
    {error && <Message>{error}</Message>}
    <TextField
      required
      id="username"
      label="Username"
      type="text"
      className={classes.textField}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!errors.username && touched.username}
      disabled={isSubmitting}
      helperText={
        errors.username ? errors.username : 'Enter a URL-friendly username.'
      }
    />
    <TextField
      required
      id="email"
      label="Email"
      type="email"
      className={classes.textField}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!errors.email && touched.email}
      disabled={isSubmitting}
      helperText={
        errors.email ? errors.email : 'Enter your email address.'
      }
    />
    <TextField
      required
      id="password"
      label="Password"
      type="password"
      className={classes.textField}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!errors.password && touched.password}
      disabled={isSubmitting}
      helperText={
        errors.password
          ? errors.password
          : 'Enter a nice, long, unique password.'
      }
    />
    <Button
      variant="raised"
      color="primary"
      type="submit"
      className={classes.button}
    >
      {`${FORM_BUTTON_REGISTER} & ${FORM_BUTTON_LOGIN}`}
    </Button>
  </form>
);

RegisterForm.propTypes = {
  submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    error: PropTypes.string
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  values: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    field_experience_path: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    field_experience_path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }).isRequired,
  touched: PropTypes.shape({
    title: PropTypes.bool,
    field_experience_path: PropTypes.bool,
    body: PropTypes.bool
  }).isRequired
};

RegisterForm.defaultProps = {
  user: {
    error: null
  }
};

const FormikRegisterForm = withFormik({
  displayName: 'RegisterForm',
  enableReinitialize: true,
  validationSchema: object().shape({
    username: string()
      .required()
      .min(3)
      .max(100)
      .matches(FORM_INPUT_VALIDATION_REGEX_URL_SEGMENT, {
        message:
          'Value must be URL-friendly. No spaces, no special characters, just letters, numbers, and dashes'
      }),
    email: string()
      .email()
      .required()
      .min(3)
      .max(100),
    password: string()
      .required()
      .min(3)
      .max(24)
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { user, dispatch } = props;
    const { username, email, password } = values;
    dispatch({
      type: USER_REGISTER,
      username,
      email,
      password
    });
  }
})(RegisterForm);

export default withStyles(RegisterFormStyles)(FormikRegisterForm);
