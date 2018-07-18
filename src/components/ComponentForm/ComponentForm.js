/**
 * @file ComponentForm.js
 * Exports a component that allows users to operate on scene components.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core';

import ComponentFormStyles from './ComponentForm.style';

const ComponentForm = ({ id }) => <form>{id}</form>;

ComponentForm.propTypes = {
  id: PropTypes.string.isRequired
};

const FormikComponentForm = withFormik({
  displayName: 'ComponentForm',
  enableReinitialize: true
})(ComponentForm);

export default withStyles(ComponentFormStyles)(FormikComponentForm);
