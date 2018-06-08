/**
 * @file SceneForm.container.js
 * Exports a redux-connected SceneForm component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SceneForm from './SceneForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ openExperience, user }) => ({
  user,
  experience: openExperience
});

export default connect(mapState, mapDispatchToProps)(withRouter(SceneForm));
