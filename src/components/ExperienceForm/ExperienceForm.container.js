/**
 * @file ExperienceForm.container.js
 * Exports a redux-connected ExperienceForm component.
 */

import { connect } from 'react-redux';

import ExperienceForm from './ExperienceForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, experiences }) => ({
  user,
  experiences
});

export default connect(mapState, mapDispatchToProps)(ExperienceForm);
