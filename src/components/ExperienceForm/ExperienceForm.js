/**
 * @file ExperienceForm.js
 * Exports a component that allows users to operate on experiences.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { string, object } from 'yup';
import { TextField, Button, withStyles } from '@material-ui/core';

import { Message } from '../';
import ExperienceFormStyles from './ExperienceForm.style';
import parseExperience from '../../lib/parseExperience';
import {
  EXPERIENCES_CREATE,
  EXPERIENCES_EDIT,
  FORM_BUTTON_INSERT_UPDATE
} from '../../constants';

const ExperienceForm = ({
  classes,
  experiences: { error: apiError },
  user: { username },
  values,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange
}) => (
  <form onSubmit={handleSubmit}>
    {apiError && <Message>{apiError}</Message>}
    <TextField
      id="title"
      label="Title"
      type="text"
      required
      helperText={
        errors.title
          ? errors.title
          : 'Enter a user-friendly title for your experience.'
      }
      defaultValue={values.title}
      onChange={handleChange}
      error={!!errors.title}
      disabled={isSubmitting}
      className={classes.textField}
    />
    <TextField
      id="field_experience_path"
      label="URL Path"
      type="text"
      required
      helperText={
        errors.field_experience_path
          ? errors.field_experience_path
          : `Enter a url-friendly name for your experience. For example, if you enter 'my-experience', your experience will be published to /view/${username}/experience/my-experience.`
      }
      defaultValue={values.field_experience_path}
      onChange={handleChange}
      error={!!errors.field_experience_path}
      disabled={isSubmitting}
      className={classes.textField}
    />
    <TextField
      id="body"
      label="Description"
      type="text"
      multiline
      required
      rows={6}
      helperText={
        errors.body
          ? errors.body
          : 'Describe your experience so people will know what to expect before they enter your experience.'
      }
      defaultValue={values.body}
      onChange={handleChange}
      error={!!errors.body}
      disabled={isSubmitting}
      className={classes.textField}
    />
    <Button
      variant="raised"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      className={classes.button}
    >
      {FORM_BUTTON_INSERT_UPDATE}
    </Button>
  </form>
);

ExperienceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
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
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    authentication: PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      csrfToken: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  experiences: PropTypes.shape({
    error: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.PropTypes.shape({
          value: PropTypes.string
        }),
        field_experience_path: PropTypes.string.isRequired
      })
    )
  })
};

ExperienceForm.defaultProps = {
  isSubmitting: false,
  experiences: {
    error: null,
    items: []
  }
};

const FormikExperienceForm = withFormik({
  mapPropsToValues: props => {
    const { experienceSlug, experiences } = props;
    const experience = parseExperience(experiences, experienceSlug);

    const values = {
      title: '',
      field_experience_path: '',
      body: ''
    };

    if (experience) {
      const {
        title,
        field_experience_path,
        body: { value: body }
      } = experience;
      Object.assign(values, {
        title,
        field_experience_path,
        body
      });
    }

    return values;
  },
  validationSchema: object().shape({
    title: string()
      .required()
      .min(3)
      .max(50),
    body: string()
      .required()
      .min(3)
      .max(200),
    field_experience_path: string()
      .required()
      .min(3)
      .max(100)
      .matches(/^[a-zA-Z0-9_-]*$/, {
        message:
          'Value must be URL-friendly. No spaces, no special characters, just letters, numbers, and dashes'
      })
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { title, field_experience_path, body } = values;
    const {
      dispatch,
      experienceSlug,
      user,
      experiences,
      history: { push }
    } = props;
    const experience = parseExperience(experiences, experienceSlug);
    dispatch({
      type: experience ? EXPERIENCES_EDIT : EXPERIENCES_CREATE,
      user,
      id: experience ? experience.id : null,
      title,
      field_experience_path,
      body,
      successHandler: () => {
        setSubmitting(false);
        push('/dashboard');
      }
    });
  }
})(ExperienceForm);

export default withStyles(ExperienceFormStyles)(FormikExperienceForm);
