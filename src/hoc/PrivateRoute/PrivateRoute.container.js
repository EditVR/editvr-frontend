/**
 * @file PrivateRoute.container.js
 * Exports a redux-connected PrivateRoute component.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  authentication: state.user.authentication
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
