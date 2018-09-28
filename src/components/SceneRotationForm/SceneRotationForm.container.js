/**
 * @file SceneRotatinForm.container.js
 * Exports a redux-connected SceneRotationForm component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SceneRotationForm from './SceneRotationForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ openExperience, user }) => ({
  user,
  experience: openExperience
});

export default connect(mapState, mapDispatchToProps)(
  withRouter(SceneRotationForm)
);
