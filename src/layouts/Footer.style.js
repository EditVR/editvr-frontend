/**
 * @file Footer.style.js
 * Exports Footer component styles.
 */

export default () => ({
  wrapper: {
    marginTop: '5rem',
    padding: '0 1rem',
    position: 'relative',
    textAlign: 'center'
  },
  elements: {
    display: 'inline-block',
    position: 'relative'
  },
  logo: {
    maxWidth: '230px',
    width: '100%'
  },
  text: {
    color: 'rgba(255,255,255,.5)',
    marginBottom: '10px'
  },
  '@media (min-width: 380px)': {
    text: {
      marginLeft: '86px',
      marginBottom: '-20px'
    }
  }
});
