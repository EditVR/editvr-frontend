/**
 * @file ExperienceCreateForm.container.js
 * Exports a redux-connected ExperienceCreateForm component.
 */

import { connect } from 'react-redux';

import ExperienceCreateForm from './ExperienceCreateForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, experiences }) => ({
  user,
  experiences
});

export default connect(mapState, mapDispatchToProps)(ExperienceCreateForm);
