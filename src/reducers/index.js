/**
 * @file index.js
 * Exports all reducers.
 */

import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import user from './user';
import experiences from './experiences';

export default combineReducers({ user, experiences, loadingBar });
