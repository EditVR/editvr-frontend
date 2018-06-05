/**
 * @file muiTheme.js
 * Exports Material UI theme object.
 */
import { createMuiTheme } from '@material-ui/core';
import './muiTheme.css';

// require('typeface-roboto');

export default createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
  },
  palette: {
    type: 'dark',
    primary: {
      50: '#e0f1f6',
      100: '#b3dbe9',
      200: '#80c3da',
      300: '#4dabcb',
      400: '#2699bf',
      500: '#0087b4',
      600: '#007fad',
      700: '#0074a4',
      800: '#006a9c',
      900: '#00578c',
      A100: '#b8e0ff',
      A200: '#85c9ff',
      A400: '#52b3ff',
      A700: '#00456F',
      contrastDefaultColor: 'dark'
    },
    secondary: {
      50: '#e2f3ea',
      100: '#b8e1ca',
      200: '#88cda6',
      300: '#58b982',
      400: '#35aa68',
      500: '#119b4d',
      600: '#0f9346',
      700: '#0c893d',
      800: '#0a7f34',
      900: '#056d25',
      A100: '#9dffb4',
      A200: '#6aff8d',
      A400: '#37ff66',
      A700: '#1eff53',
      contrastDefaultColor: 'dark'
    },
    grays: {
      300: '#7E7E7E',
      500: '#4A4A4A',
      600: '#3E3E3E',
      700: '#2C2C2C',
      contrastDefaultColor: 'dark'
    }
  }
});
