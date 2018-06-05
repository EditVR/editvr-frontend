/**
 * @file Loading.style.js
 * Exports Loading component styles.
 */

export default theme => ({
  wrapper: {
    background: theme.palette.grays['500'],
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
