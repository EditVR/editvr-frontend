/**
 * @file SceneForm.js
 * Exports a component that allows users to operate on scenes.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, withStyles } from '@material-ui/core';
import { FileUpload } from '@material-ui/icons';
import Dropzone from 'react-dropzone';

import {
  FORM_BUTTON_INSERT_UPDATE,
  OPEN_EXPERIENCE_SCENE_CREATE,
  OPEN_EXPERIENCE_FETCH_FOR_USER
} from '../../constants';
import SceneFormStyles from './SceneForm.style';
import { Message } from '../';

class SceneForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        experienceSlug: PropTypes.string.isRequired
      }).isRequired
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

  static defaultProps = {
    submitHandler: false
  };

  state = {
    previewImage: null,
    previewVideo: null,
    validationError: null
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
  };

  /**
   * Handles submit event.
   *
   * @param {object} event - Object containing form data.
   */
  handleSubmit = event => {
    event.preventDefault();

    // Validate input, and exit if input isn't valid.
    if (!this.isValid(event)) {
      return;
    }

    const {
      dispatch,
      user,
      experience: { item: experience },
      history,
      match: {
        params: { experienceSlug }
      }
    } = this.props;

    // Extract the file data and construct a payload object.
    const file = event.target[0].files[0];
    const sceneSlug = event.target[2].value;
    const payload = {
      type: OPEN_EXPERIENCE_SCENE_CREATE,
      fileName: file.name,
      title: event.target[1].value,
      field_slug: sceneSlug,
      body: event.target[3].value,
      experience,
      user,
      successHandler: () => {
        // After a new scene is added, we need to re-load the open experience
        // so that all the new scene fields can be pulled in.
        dispatch({
          type: OPEN_EXPERIENCE_FETCH_FOR_USER,
          experienceSlug,
          user
        });

        // Redirect to the newly created scene.
        history.push(
          `/experience/vreditor/${
            experience.field_experience_path
          }/${sceneSlug}`
        );
      }
    };

    // Read the uploaded file into a base64 string, and dispatch payload.
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      payload.fileData = reader.result;
      dispatch(payload);
    };
  };

  /**
   * Handles validating input.
   *
   * @param {object} event - Object containing form data.
   */
  isValid = event => {
    const file = event.target[0].files[0];

    if (!file) {
      this.setState({
        validationError: 'You must upload a scene sky image or video.'
      });
      return false;
    }

    return true;
  };

  /**
   * {@inheritdoc}
   */
  render() {
    const {
      submitHandler,
      classes,
      user: { username },
      experience: { error, item: experience }
    } = this.props;

    const { previewImage, previewVideo, validationError } = this.state;

    // If this form is being rendered when the openExperience state has not
    // yet been loaded, render nothing.
    if (!experience.field_scenes) {
      return null;
    }

    const { field_experience_path: experienceSlug } = experience;

    return (
      <form onSubmit={submitHandler || this.handleSubmit}>
        {error && <Message>{error}</Message>}
        {validationError && <Message>{validationError}</Message>}
        <Dropzone onDrop={this.previewFile} className={classes.dropzone}>
          <FileUpload className={classes.dropzoneIcon} />
          <Typography variant="body1" className={classes.dropzoneParagraph}>
            Drag images and drop them here, or click here to upload scene sky
            images (jpg, png) or videos (mp4).
          </Typography>
        </Dropzone>
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
        <TextField
          id="title"
          label="Title"
          type="text"
          required
          helperText="Enter a user-friendly title for your scene."
          className={classes.textField}
        />
        <TextField
          id="field_slug"
          label="URL Path"
          type="text"
          required
          helperText={`Enter a url-friendly name for your scene. For example, if you enter 'my-scene', your scene will be published at: /view/${username}/${experienceSlug}/my-scene`}
          className={classes.textField}
        />
        <TextField
          id="body"
          label="Description"
          type="text"
          multiline
          required
          rows={6}
          helperText="Describe your experience so people will know what to expect before they enter your scene."
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

export default withStyles(SceneFormStyles)(SceneForm);
