/**
 * @file ThinLayout.style.js
 * Exports styling for the ThinLayout component.
 */

export default theme => ({
  wrapper: {
    background: theme.palette.background.default,
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
