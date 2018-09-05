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

const mapState = ({ openExperience, user, component }) => ({
  experience: openExperience,
  component,
  user
});

export default withRouter(connect(mapState, mapDispatchToProps)(VREditor));
