/**
 * @file Dashboard.container.js
 * Exports a redux-connected Dashboard component.
 */

import { connect } from 'react-redux';

import Dashboard from './Dashboard';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user, experiences }) => ({
  user,
  experiences
});

export default connect(mapState, mapDispatchToProps)(Dashboard);
