/**
 * @file SceneForm.style.js
 * Exports SceneForm component styles.
 */

export default theme => ({
  textField: {
    width: '100%',
    marginTop: `${theme.spacing.unit * 2}px`
  },
  button: {
    marginTop: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit
  },
  dropzone: {
    width: '100%',
    background: theme.palette.primary.light,
    padding: theme.spacing.unit,
    boxSizing: 'border-box',
    marginTop: theme.spacing.unit * 2
  },
  dropzoneParagraph: {
    lineHeight: '1.3',
    display: 'inline-block',
    verticalAlign: 'middle',
    maxWidth: '80%'
  },
  dropzoneIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '18%',
    maxWidth: theme.spacing.unit * 10,
    height: 'auto',
    color: theme.palette.common.white
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: theme.spacing.unit * 20,
    marginTop: theme.spacing.unit * 2
  }
});
