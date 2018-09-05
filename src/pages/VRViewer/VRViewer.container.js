/**
 * @file VRViewer.container.js
 * Exports a redux-connected VRViewer component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VRViewer from './VRViewer';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ openExperience }) => ({
  experience: openExperience.item
});

export default withRouter(connect(mapState, mapDispatchToProps)(VRViewer));
