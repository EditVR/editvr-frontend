/**
 * @file Layout.style.js
 * Exports styling that's shared across many layouts.
 */

export default theme => ({
  wrapper: {
    background: theme.palette.grays['500'],
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflowX: 'scroll'
  },
  thinWrapper: {
    padding: '0 1rem',
    maxWidth: 600,
    margin: '0 auto',
    paddingTop: '10%'
  }
});
