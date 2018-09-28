/**
 * @file index.js
 * Exports default config, overridden by local config.
 */

let config = require('./development.json');

const { NODE_ENV } = process.env;

// If this is a production environment, override with production settings.
if (NODE_ENV === 'production') {
  config = require('./production.json'); // eslint-disable-line global-require
}

module.exports = config;
