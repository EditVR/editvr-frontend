/**
 * @file ComponentForm.container.js
 * Exports a redux-connected ComponentForm component.
 */

import { connect } from 'react-redux';

import ComponentForm from './ComponentForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, openExperience }) => ({
  user,
  experience: openExperience
});

export default connect(mapState, mapDispatchToProps)(ComponentForm);
