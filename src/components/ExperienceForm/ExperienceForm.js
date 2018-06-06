/**
 * @file ExperienceForm.js
 * Exports a component that allows users to operate on experiences.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

import { Message } from '../';
import ExperienceFormStyles from './ExperienceForm.style';
import { EXPERIENCES_CREATE } from '../../constants';

class ExperienceForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    experienceSlug: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    classes: PropTypes.shape({
      textField: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
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

  static defaultProps = {
    submitHandler: false,
    experienceSlug: false,
    experiences: {
      error: null,
      items: []
    }
  };

  /**
   * Handles a creating an experience.
   *
   * @param {object} event - Submit event object.
   */
  handleCreate = event => {
    event.preventDefault();
    const {
      dispatch,
      user,
      history: { push }
    } = this.props;
    dispatch({
      type: EXPERIENCES_CREATE,
      user,
      title: event.target[0].value,
      field_experience_path: event.target[1].value,
      body: event.target[2].value,
      successHandler: () => push('/dashboard')
    });
  };

  /**
   * {@inheretdoc}
   */
  render() {
    const {
      classes,
      submitHandler,
      experienceSlug,
      experiences: { error, items }
    } = this.props;

    // If this is an editorial form, grab the existing experience.
    const experience = experienceSlug
      ? items.find(item => item.field_experience_path === experienceSlug)
      : false;

    return (
      <form onSubmit={submitHandler || this.handleCreate}>
        {error && <Message>{error}</Message>}
        <TextField
          id="title"
          label="Title"
          type="text"
          required
          helperText="Enter a user-friendly title for your experience."
          defaultValue={experience ? experience.title : ''}
          className={classes.textField}
        />
        <TextField
          id="field_experience_path"
          label="URL Path"
          type="text"
          required
          helperText="Enter a name for your experience. For example, if you enter 'my-new-experience', your experience will be published to /experience/my-new-experience."
          defaultValue={experience ? experience.field_experience_path : ''}
          className={classes.textField}
        />
        <TextField
          id="body"
          label="Description"
          type="text"
          multiline
          required
          rows={6}
          helperText="Describe your experience so people will know what to expect before they enter your experience."
          defaultValue={
            experience && experience.body ? experience.body.value : ''
          }
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

export default withStyles(ExperienceFormStyles)(ExperienceForm);
