/**
 * @file VREditor.container.js
 * Exports a redux-connected VREditor component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VREditor from './VREditor';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ openExperience, user }) => ({
  experience: openExperience,
  user
});

export default connect(mapState, mapDispatchToProps)(withRouter(VREditor));
