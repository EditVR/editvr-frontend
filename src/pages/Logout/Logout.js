/**
 * @file Logout.js
 * Exports a React component that handles requests to /logout.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

import { USER_LOG_OUT } from '../../constants';

class Logout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  /**
   * {@inheritdoc}
   */
  componentWillMount() {
    this.props.dispatch({ type: USER_LOG_OUT });
  }

  /**
   * {@inheritdoc}
   */
  render() {
    return null;
  }
}

export default Logout;
