/**
 * @file Message.style.js
 * Exports Message component styles.
 */

import red from '@material-ui/core/colors/red';

export default theme => ({
  message: {
    marginTop: theme.spacing.unit
  },
  error: {
    color: red[500]
  },
  info: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
});
