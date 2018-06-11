/**
 * @file SceneCards.style.js
 * Exports SceneCards component styles.
 */

export default theme => ({
  card: {
    marginTop: theme.spacing.unit * 2
  },
  cardActive: {
    border: '1px solid',
    borderColor: theme.palette.secondary.dark
  },
  cardActionButton: {
    marginRight: theme.spacing.unit
  },
  cardMedia: {
    height: 0,
    // 16/9 ratio.
    paddingTop: '56.25%'
  }
});
