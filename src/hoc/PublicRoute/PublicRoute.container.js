/**
 * @file PublicRoute.container.js
 * Exports a redux-connected PublicRoute component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PublicRoute from './PublicRoute';

const mapStateToProps = state => ({
  authentication: state.user.authentication
});

export default connect(mapStateToProps)(withRouter(PublicRoute));
