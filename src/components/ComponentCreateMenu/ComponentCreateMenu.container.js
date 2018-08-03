/**
 * @file ComponentCreateMenu.container.js
 * Exports a redux-connected ComponentCreateMenu component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ComponentCreateMenu from './ComponentCreateMenu';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, openExperience }) => ({
  user,
  experience: openExperience
});

export default withRouter(
  connect(mapState, mapDispatchToProps)(ComponentCreateMenu)
);
