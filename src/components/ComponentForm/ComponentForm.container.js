/**
 * @file ComponentForm.container.js
 * Exports a redux-connected ComponentForm component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ComponentForm from './ComponentForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, openExperience, component }) => ({
  user,
  selectedComponent: component.id,
  experience: openExperience
});

export default connect(mapState, mapDispatchToProps)(withRouter(ComponentForm));
