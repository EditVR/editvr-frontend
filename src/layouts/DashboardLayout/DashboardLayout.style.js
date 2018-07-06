/**
 * @file DashboardLayout.style.js
 * Exports styling for the DashboardLayout component.
 */

export default theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    minHeight: 'calc(100vh)'
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: 200,
    textAlign: 'left',
    maxHeight: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    maxWidth: 600
  },
  logo: {
    height: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5
  }
});
