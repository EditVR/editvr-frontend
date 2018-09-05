/**
 * @file RegisterForm.js
 * Exports a component that allows users to register for an EditVR account.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';
import { withFormik } from 'formik';
import { string, object } from 'yup';

import { Message } from '../';
import RegisterFormStyles from './RegisterForm.style';
import {
  USER_LOG_IN,
  USER_REGISTER,
  FORM_BUTTON_LOGIN,
  FORM_BUTTON_REGISTER,
  FORM_INPUT_VALIDATION_REGEX_URL_SEGMENT,
  ERROR_API_REGISTER_FAILED_EMAIL,
  ERROR_API_REGISTER_FAILED_USERNAME
} from '../../constants';

const RegisterForm = ({
  classes,
  user: { error },
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur
}) => (
  <form onSubmit={handleSubmit}>
    {error && <Message type="error">{error}</Message>}
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
      helperText={errors.email ? errors.email : 'Enter your email address.'}
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
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    error: PropTypes.string
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.shape({
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }).isRequired,
  touched: PropTypes.shape({
    username: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool
  }).isRequired
};

RegisterForm.defaultProps = {
  isSubmitting: false,
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
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { dispatch } = props;
    const { username, email, password } = values;
    dispatch({
      type: USER_REGISTER,
      username,
      email,
      password,
      successHandler: () => {
        // After registration, log the user in.
        dispatch({
          type: USER_LOG_IN,
          username,
          password,
          successHandler: () => setSubmitting(false)
        });
      },
      errorHandler: error => {
        const message = error.toString();
        if (message.includes(ERROR_API_REGISTER_FAILED_EMAIL)) {
          setErrors({email: 'Email in use or invalid'});
        }
        else if (message.includes(ERROR_API_REGISTER_FAILED_USERNAME)) {
          setErrors({username: 'Username in use or invalid'});
        }
        setSubmitting(false);
      }
    });
  }
})(RegisterForm);

export default withStyles(RegisterFormStyles)(FormikRegisterForm);
