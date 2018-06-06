/**
 * @file ExperienceCreateForm.js
 * Exports a component that allows users to create an EditVR experience.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

import { Message } from '../';
import ExperienceCreateFormStyles from './ExperienceCreateForm.style';
import { EXPERIENCES_CREATE } from '../../constants';

class ExperienceCreateForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      authentication: PropTypes.shape({
        accessToken: PropTypes.string.isRequired,
        csrfToken: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    experiences: PropTypes.shape({
      error: PropTypes.string
    })
  };

  static defaultProps = {
    submitHandler: false,
    experiences: {
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
    const { dispatch, user } = this.props;
    dispatch({
      type: EXPERIENCES_CREATE,
      user,
      title: event.target[0].value,
      field_experience_path: event.target[1].value
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const {
      classes,
      submitHandler,
      experiences: { error }
    } = this.props;
    return (
      <form onSubmit={submitHandler || this.handleSubmit}>
        {error && <Message>{error}</Message>}
        <TextField
          id="title"
          label="Title"
          type="text"
          required
          helperText="Enter a user-friendly title for your experience."
          className={classes.textField}
        />
        <TextField
          id="field_experience_path"
          label="URL Path"
          type="text"
          required
          helperText="Enter a name for your experience. For example, if you enter 'my-new-experience', your experience will be published to /experience/my-new-experience."
          className={classes.textField}
        />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Create
        </Button>
      </form>
    );
  }
}

export default withStyles(ExperienceCreateFormStyles)(ExperienceCreateForm);
