/**
 * @file RegisterForm.container.js
 * Exports a redux-connected RegisterForm component.
 */

import { connect } from 'react-redux';

import RegisterForm from './RegisterForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = ({ user }) => ({
  user
});

export default connect(mapState, mapDispatchToProps)(RegisterForm);
