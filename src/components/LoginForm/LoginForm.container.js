/**
 * @file LoginForm.container.js
 * Exports a redux-connected LoginForm component.
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from './LoginForm';
import * as userActions from '../../actions/user';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

const mapState = () => ({});

export default connect(mapState, mapDispatchToProps)(LoginForm);
