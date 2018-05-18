/**
 * @file ThemeProvider.js
 * Exports a HOC ThemeProvider component that attaches children their MUI theme.
 */

import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';

import muiTheme from '../styles/muiTheme';

const ThemeProvider = WrappedComponent => props => (
  <MuiThemeProvider theme={muiTheme}>
    <WrappedComponent {...props} />
  </MuiThemeProvider>
);

export default ThemeProvider;
