/**
 * @file SceneForm.js
 * Exports a component that allows users to operate on scenes.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, withStyles } from '@material-ui/core';
import { FileUpload } from '@material-ui/icons';
import { withFormik } from 'formik';
import { string, object } from 'yup';
import Dropzone from 'react-dropzone';

import {
  FORM_BUTTON_INSERT_UPDATE,
  FORM_INPUT_VALIDATION_REGEX_URL_SEGMENT,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_SCENE_EDIT,
  OPEN_EXPERIENCE_FETCH_FOR_USER
} from '../../constants';
import parseSceneFromExperience from '../../lib/parseSceneFromExperience';
import SceneFormStyles from './SceneForm.style';
import { Message } from '../';

class SceneForm extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    values: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      field_slug: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      field_slug: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      body: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    }).isRequired,
    touched: PropTypes.shape({
      title: PropTypes.bool,
      field_slug: PropTypes.bool,
      body: PropTypes.bool
    }).isRequired,
    experience: PropTypes.shape({
      item: PropTypes.shape({
        field_experience_path: PropTypes.string,
        field_scenes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired
          })
        )
      }).isRequired
    }).isRequired,
    user: PropTypes.shape({
      authentication: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        csrfToken: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  state = {
    previewImage: null,
    previewVideo: null
  };

  /**
   * Sets previewImage and previewVideo state.
   */
  previewFile = files => {
    const file = files[0];
    let state = {
      previewImage: file.preview,
      previewVideo: null
    };

    if (file.type.startsWith('video')) {
      state = {
        previewImage: null,
        previewVideo: file.preview
      };
    }

    this.setState(state);
    this.props.setFieldValue('fileName', file.name);

    // Read the file into a binary string and set the sky field.
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.props.setFieldValue('sky', reader.result);
    };
  };

  /**
   * {@inheritdoc}
   */
  render() {
    const {
      classes,
      user: { username },
      experience: { error: apiError, item: experience },
      values,
      errors,
      touched,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur
    } = this.props;

    const { previewImage, previewVideo } = this.state;

    // If this form is being rendered when the openExperience state has not
    // yet been loaded, render nothing.
    if (!experience.field_scenes) {
      return null;
    }

    const { field_experience_path: experienceSlug } = experience;

    return (
      <form onSubmit={handleSubmit}>
        {apiError && <Message>{apiError}</Message>}
        <Dropzone onDrop={this.previewFile} className={classes.dropzone}>
          <FileUpload className={classes.dropzoneIcon} />
          <Typography variant="body1" className={classes.dropzoneParagraph}>
            Drag images and drop them here, or click here to upload scene sky
            images (jpg, png) or videos (mp4). These images or videos should be
            equirectangular.
          </Typography>
        </Dropzone>
        {!previewImage &&
          values.skyUrl && (
            <img
              src={values.skyUrl}
              className={classes.previewImage}
              alt="Preview of this scene's sky"
            />
          )}
        {previewImage && (
          <img
            src={previewImage}
            className={classes.previewImage}
            alt="Preview of this scene's sky"
          />
        )}
        {previewVideo && (
          <video controls className={classes.previewImage} src={previewVideo} />
        )}
        {errors.sky && <Message type="error">{errors.sky}</Message>}
        <TextField
          id="title"
          label="Title"
          type="text"
          required
          helperText={
            errors.title
              ? errors.title
              : 'Enter a user-friendly title for your scene.'
          }
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.title && touched.title}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <TextField
          id="field_slug"
          label="URL Path"
          type="text"
          required
          helperText={
            errors.field_slug
              ? errors.field_slug
              : `Enter a url-friendly name for your scene. For example, if you enter 'my-scene', your scene will be published at: /view/${username}/${experienceSlug}/my-scene`
          }
          value={values.field_slug}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.field_slug && touched.field_slug}
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
              : 'Describe your experience so people will know what to expect before they enter your scene.'
          }
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.body && touched.body}
          disabled={isSubmitting}
          className={classes.textField}
        />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          className={classes.button}
        >
          {FORM_BUTTON_INSERT_UPDATE}
        </Button>
      </form>
    );
  }
}

const FormikSceneForm = withFormik({
  displayName: 'SceneForm',
  enableReinitialize: true,
  mapPropsToValues: ({ sceneSlug, experience: { item: experience } }) => {
    const scene = parseSceneFromExperience(experience, sceneSlug);

    const values = {
      title: '',
      field_slug: '',
      body: '',
      sky: null,
      skyUrl: null,
      fileName: null
    };

    if (scene) {
      const {
        title,
        field_slug,
        body,
        field_photosphere,
        field_videosphere
      } = scene;
      const sky = field_videosphere || field_photosphere;
      const url = new URL(sky.links.self);
      const skyUrl = `${url.origin}${sky.url}`;

      Object.assign(values, {
        title,
        field_slug,
        body: body ? body.value : '',
        skyUrl,
        sky: skyUrl
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
    sky: string()
      .required('You must upload an equirectangular image or video file.')
      .nullable(),
    field_slug: string()
      .required()
      .min(3)
      .max(100)
      .matches(FORM_INPUT_VALIDATION_REGEX_URL_SEGMENT, {
        message:
          'Value must be URL-friendly. No spaces, no special characters, just letters, numbers, and dashes'
      })
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { title, field_slug, body, sky, fileName } = values;
    const {
      dispatch,
      user,
      sceneSlug,
      experience: { item: experience },
      history: { push },
      match: {
        params: { experienceSlug }
      }
    } = props;

    // Extract the file data and construct a payload object.
    dispatch({
      type: sceneSlug
        ? OPEN_EXPERIENCE_SCENE_EDIT
        : OPEN_EXPERIENCE_SCENE_CREATE,
      title,
      body,
      field_slug,
      experience,
      user,
      fileData: sky,
      fileName: `${user.username}-${fileName}`,
      successHandler: () => {
        setSubmitting(false);
        dispatch({
          type: OPEN_EXPERIENCE_FETCH_FOR_USER,
          experienceSlug,
          user
        });

        // Redirect to the newly created scene.
        push(
          `/experience/vreditor/${
            experience.field_experience_path
          }/${field_slug}`
        );
      }
    });
  }
})(SceneForm);

export default withStyles(SceneFormStyles)(FormikSceneForm);
