/**
 * @file index.js
 * Contains code that facilitates the rendering of EditVR.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
