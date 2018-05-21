/**
 * @file index.js
 * Exports all reducers.
 */

import { combineReducers } from 'redux';

import user from './user';

export default combineReducers({ user });
