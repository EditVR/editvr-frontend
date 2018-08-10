/**
 * @file SceneCards.container.js
 * Exports a redux-connected SceneCards component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SceneCards from './SceneCards';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ openExperience, user }) => ({
  experience: openExperience,
  user
});

export default withRouter(connect(mapState, mapDispatchToProps)(SceneCards));
