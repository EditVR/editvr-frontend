/**
 * @file Header.style.js
 * Exports Header component styles.
 */

export default theme => ({
  wrapper: {
    animation: 'logoBackground 5s linear infinite',
    background: 'linear-gradient(to left top, cyan, magenta, yellow)',
    borderRadius: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 4,
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`
  },
  logo: {
    filter: 'drop-shadow( 0px 1px 8px rgba(0,0,0,0.6) )',
    maxWidth: '100%'
  }
});
