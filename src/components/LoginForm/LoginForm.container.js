/**
 * @file LoginForm.container.js
 * Exports a redux-connected LoginForm component.
 */

import { connect } from 'react-redux';

import LoginForm from './LoginForm';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = () => ({});

export default connect(mapState, mapDispatchToProps)(LoginForm);
