/**
 * @file VREditor.style.js
 * Exports VREditor component styles.
 */

export default theme => ({
  columnRight: {
    padding: theme.spacing.unit * 2,
    height: 'calc(100vh - 64px)',
    maxHeight: 'calc(100vh - 64px)',
    userSelect: 'none',
    overflowY: 'scroll'
  },
  columnLeft: {
    padding: theme.spacing.unit * 2,
    userSelect: 'none'
  }
});
