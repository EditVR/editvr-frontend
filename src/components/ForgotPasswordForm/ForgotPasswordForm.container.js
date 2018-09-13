/**
 * @file ForgotPasswordForm.container.js
 * Exports a redux-connected ForgotPasswordForm component.
 */

import { connect } from 'react-redux';

import ForgotPasswordForm from './ForgotPasswordForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user }) => ({
  user
});

export default connect(mapState, mapDispatchToProps)(ForgotPasswordForm);
