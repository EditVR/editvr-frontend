/**
 * @file ForgotPasswordForm.js
 * Exports a component that allows users to reset their EditVR account password.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles, Typography } from '@material-ui/core';
import { withFormik } from 'formik';
import { string, object } from 'yup';

import { Message } from '../';
import ForgotPasswordFormStyles from './ForgotPasswordForm.style';
import {
  USER_RESET_PASSWORD,
  FORM_BUTTON_RESET_PASSWORD,
  ERROR_API_USER_EMAIL_NOT_FOUND
} from '../../constants';

const ForgotPasswordForm = ({
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
    <Typography type="body1">
      To re-set your password, please enter the email associated with your
      EditVR account in the form below, and click Reset Password. Once you do
      this, you will be redirected to the Login page, and an email will be sent
      to your email address with further instructions.
    </Typography>
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
        errors.email
          ? errors.email
          : 'Enter the email address for your account.'
      }
    />
    <Button
      variant="raised"
      color="primary"
      type="submit"
      className={classes.button}
    >
      {`${FORM_BUTTON_RESET_PASSWORD}`}
    </Button>
  </form>
);

ForgotPasswordForm.propTypes = {
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
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool
  }).isRequired
};

ForgotPasswordForm.defaultProps = {
  isSubmitting: false,
  user: {
    error: null
  }
};

const FormikForgotPasswordForm = withFormik({
  displayName: 'ForgotPasswordForm',
  enableReinitialize: true,
  validationSchema: object().shape({
    email: string()
      .email()
      .required()
      .min(3)
      .max(100)
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const {
      dispatch,
      history: { push }
    } = props;
    const { email } = values;
    dispatch({
      type: USER_RESET_PASSWORD,
      email,
      successHandler: () => {
        setSubmitting(false);
        push('/login');
      },
      errorHandler: error => {
        const message = error.toString();
        if (message.includes(ERROR_API_USER_EMAIL_NOT_FOUND)) {
          setErrors({ email: 'Account matching email not found.' });
        }
        setSubmitting(false);
      }
    });
  }
})(ForgotPasswordForm);

export default withStyles(ForgotPasswordFormStyles)(FormikForgotPasswordForm);
