/**
 * @file DashboardLayout.style.js
 * Exports styling that's shared across many layouts.
 */

export default theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: 200,
    textAlign: 'left'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    maxWidth: 600
  },
  logo: {
    height: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5
  }
});
