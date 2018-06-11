/**
 * @file VREditorLayout.style.js
 * Exports styling for the VREditorLayout component.
 */

export default theme => ({
  wrapper: {
    height: '100%',
    paddingTop: theme.spacing.unit * 8
  },
  aside: {
    backgroundColor: theme.palette.background.default
  },
  middle: {
    background: theme.palette.primary['600'],
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden'
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    height: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 3
  }
});
