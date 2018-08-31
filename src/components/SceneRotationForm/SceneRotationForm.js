/**
 * @file SceneRotationForm.js
 * Exports a component that allows users to rotate the scene sky.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, mixed } from 'yup';
import { withFormik } from 'formik';
import { withStyles, TextField, Button } from '@material-ui/core';

import {
  FORM_BUTTON_INSERT_UPDATE,
  OPEN_EXPERIENCE_SCENE_FIELD_PRESAVE
} from '../../constants';
import { Message } from '../';

import SceneRotationFormStyles from './SceneRotationForm.style';

class SceneRotationForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        sceneSlug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    values: PropTypes.shape({
      field_sky_rotation_x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      field_sky_rotation_y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      field_sky_rotation_z: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    errors: PropTypes.shape({
      field_sky_rotation_x: PropTypes.string,
      field_sky_rotation_y: PropTypes.string,
      field_sky_rotation_z: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      field_sky_rotation_x: PropTypes.bool,
      field_sky_rotation_y: PropTypes.bool,
      field_sky_rotation_z: PropTypes.bool
    }).isRequired,
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired,
    experience: PropTypes.shape({
      error: PropTypes.string
    })
  };

  static defaultProps = {
    isSubmitting: false,
    experience: {
      error: null
    }
  };

  /**
   * Handles field changes.
   *
   * @param {object} event - Event object.
   * @param {object} event.target - Event's target field.
   */
  handleChange = ({ target: { id, value } }) => {
    this.presaveField(id, value);
    this.props.setFieldValue(id, value);
  };

  /**
   * Dispatches an action that updates the component's state.
   *
   * @param {string} fieldName - Name of field to be updated.
   * @param {string} fieldValue - New value for {fieldName}.
   */
  presaveField = (fieldName, fieldValue) => {
    const {
      dispatch,
      match: {
        params: { sceneSlug }
      }
    } = this.props;

    dispatch({
      type: OPEN_EXPERIENCE_SCENE_FIELD_PRESAVE,
      sceneSlug,
      fieldName,
      fieldValue
    });
  };

  /**
   * {@inheritdoc}
   */
  render() {
    const {
      experience: { error: apiError },
      classes,
      values,
      errors,
      touched,
      isSubmitting,
      handleBlur,
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {apiError && <Message>{apiError}</Message>}
        <TextField
          id="field_sky_rotation_x"
          label="Sky Rotation: X coordinate"
          type="number"
          required
          helperText={
            errors.field_sky_rotation_x
              ? errors.field_sky_rotation_x
              : 'Use this field to set the X value for this scenes sky rotation.'
          }
          value={values.field_sky_rotation_x}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_sky_rotation_x && touched.field_sky_rotation_x}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_sky_rotation_y"
          label="Sky Rotation: Y coordinate"
          type="number"
          required
          helperText={
            errors.field_sky_rotation_y
              ? errors.field_sky_rotation_y
              : 'Use this field to set the Y value for this scenes sky rotation.'
          }
          value={values.field_sky_rotation_y}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_sky_rotation_y && touched.field_sky_rotation_y}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_sky_rotation_z"
          label="Sky Rotation: Z coordinate"
          type="number"
          required
          helperText={
            errors.field_sky_rotation_z
              ? errors.field_sky_rotation_z
              : 'Use this field to set the Z value for this scenes sky rotation.'
          }
          value={values.field_sky_rotation_z}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_sky_rotation_z && touched.field_sky_rotation_z}
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
  }
}

const FormikSceneRotationForm = withFormik({
  displayName: 'SceneRotationForm',
  enableReinitialize: true,
  mapPropsToValues: props => {
    const {
      experience: { item: experience },
      match: {
        params: { sceneSlug }
      }
    } = props;

    const {
      field_sky_rotation_x,
      field_sky_rotation_y,
      field_sky_rotation_z
    } = experience.scenes ? experience.scenes[sceneSlug] : {};
    return {
      field_sky_rotation_x,
      field_sky_rotation_y,
      field_sky_rotation_z
    };
  },
  validationSchema: object().shape({
    field_sky_rotation_x: mixed(),
    field_sky_rotation_y: mixed(),
    field_sky_rotation_z: mixed()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const {
      dispatch,
      user,
      experience: { item: experience },
      match: {
        params: { sceneSlug }
      }
    } = props;
    const {
      field_sky_rotation_x,
      field_sky_rotation_y,
      field_sky_rotation_z
    } = values;
  }
})(SceneRotationForm);

export default withStyles(SceneRotationFormStyles)(FormikSceneRotationForm);
