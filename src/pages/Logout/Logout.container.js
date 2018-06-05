/**
 * @file Logout.container.js
 * Exports a redux-connected Logout component.
 */

import { connect } from 'react-redux';
import Logout from './Logout';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapState = () => ({});

export default connect(mapState, mapDispatchToProps)(Logout);
