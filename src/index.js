/**
 * @file index.js
 * Contains code that facilitates the rendering of EditVR.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App, Loading } from './components';
import { ThemeProvider } from './hoc';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './lib/reduxStore';

// Create a theme-wrapped loading screen.
const PersistLoader = ThemeProvider(() => <Loading />);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<PersistLoader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
