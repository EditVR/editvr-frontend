/**
 * @file Loading.style.js
 * Exports Loading component styles.
 */

export default theme => ({
  wrapper: {
    background: theme.palette.background.default,
    height: '100vh',
    maxHeight: '100%'
  },
  spinner: {
    flexGrow: 1
  },
  title: {
    paddingTop: 200,
    textAlign: 'center'
  }
});
