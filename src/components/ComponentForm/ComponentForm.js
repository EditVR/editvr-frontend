/**
 * @file ComponentForm.js
 * Exports a component that allows users to operate on scene components.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { string, object, mixed } from 'yup';
import { withFormik } from 'formik';
import { withStyles, TextField, Button } from '@material-ui/core';

import {
  COMPONENT_SELECT,
  FORM_BUTTON_INSERT_UPDATE,
  OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
  OPEN_EXPERIENCE_COMPONENT_EDIT
} from '../../constants';
import { Message } from '../';
import ComponentFormStyles from './ComponentForm.style';

class ComponentForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedComponent: PropTypes.string.isRequired,
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
      title: PropTypes.string,
      field_body: PropTypes.string,
      field_x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      field_y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      field_z: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    errors: PropTypes.shape({
      title: PropTypes.string,
      field_body: PropTypes.string,
      field_x: PropTypes.string,
      field_y: PropTypes.string,
      field_z: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      title: PropTypes.bool,
      field_body: PropTypes.bool,
      field_x: PropTypes.bool,
      field_y: PropTypes.bool,
      field_z: PropTypes.bool
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
   * Dispatches an action that updates the component's state.
   *
   * @param {string} fieldName - Name of field to be updated.
   * @param {string} fieldValue - New value for {fieldName}.
   */
  presaveField = (fieldName, fieldValue) => {
    const {
      dispatch,
      selectedComponent,
      match: {
        params: { sceneSlug }
      }
    } = this.props;

    dispatch({
      type: OPEN_EXPERIENCE_COMPONENT_FIELD_PRESAVE,
      sceneSlug,
      component: selectedComponent,
      fieldName,
      fieldValue
    });
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
   * {@inheritdoc}
   */
  render() {
    const {
      classes,
      values,
      errors,
      touched,
      isSubmitting,
      handleBlur,
      handleSubmit,
      experience: { error: apiError }
    } = this.props;

    return (
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
              : 'Enter a user-friendly title for your component.'
          }
          value={values.title}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.title && touched.title}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_body"
          label="Body"
          type="text"
          required
          multiline
          helperText={
            errors.field_body
              ? errors.field_body
              : 'Enter a body for your component.'
          }
          value={values.field_body}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_body && touched.field_body}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_x"
          label="Position: X coordinate"
          type="number"
          required
          helperText={
            errors.field_x
              ? errors.field_x
              : 'Use this field to set the positional X coordinate for this component'
          }
          value={values.field_x}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_x && touched.field_x}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_y"
          label="Position: Y coordinate"
          type="number"
          required
          helperText={
            errors.field_y
              ? errors.field_y
              : 'Use this field to set the positional Y coordinate for this component'
          }
          value={values.field_y}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_y && touched.field_y}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_z"
          label="Position: Z coordinate"
          type="number"
          required
          helperText={
            errors.field_z
              ? errors.field_z
              : 'Use this field to set the positional Z coordinate for this component'
          }
          value={values.field_z}
          onChange={this.handleChange}
          onBlur={handleBlur}
          error={!!errors.field_z && touched.field_z}
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

const FormikComponentForm = withFormik({
  displayName: 'ComponentForm',
  enableReinitialize: true,
  mapPropsToValues: props => {
    const {
      experience: { item: experience },
      match: {
        params: { sceneSlug }
      },
      selectedComponent
    } = props;
    const scene = experience.scenes ? experience.scenes[sceneSlug] : null;
    const component = scene ? scene.components[selectedComponent] : null;

    const values = {
      title: '',
      field_body: '',
      field_x: 0,
      field_y: 0,
      field_z: 0
    };

    if (component) {
      const { title, field_body, field_x, field_y, field_z } = component;
      Object.assign(values, {
        title,
        field_body,
        field_x,
        field_y,
        field_z
      });
    }

    return values;
  },
  validationSchema: object().shape({
    title: string()
      .required()
      .min(3)
      .max(50),
    field_body: string()
      .required()
      .min(3)
      .max(200),
    field_x: mixed(),
    field_y: mixed(),
    field_z: mixed()
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const {
      dispatch,
      user,
      selectedComponent,
      match: {
        params: { sceneSlug }
      }
    } = props;
    const { title, field_body, field_x, field_y, field_z } = values;
    dispatch({
      type: OPEN_EXPERIENCE_COMPONENT_EDIT,
      id: selectedComponent,
      user,
      title,
      field_body,
      field_x,
      field_y,
      field_z,
      sceneSlug,
      successHandler: () => {
        setSubmitting(false);
        // Dispatch an action that de-selects the current component.
        dispatch({
          type: COMPONENT_SELECT,
          id: null
        });
      }
    });
  }
})(ComponentForm);

export default withStyles(ComponentFormStyles)(FormikComponentForm);
