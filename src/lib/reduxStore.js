/**
 * @file reduxStore.js
 * Constructs Redux store and persistor.
 */

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from '../reducers';
import actions from '../actions';

// Set up persisted reducers using redux-persist.
const persistedReducer = persistReducer(
  {
    key: 'editvr-root',
    storage
  },
  reducers
);

// Set up Saga middleware using redux-saga.
const sagaMiddleware = createSagaMiddleware();

// Compose a store with persisted reducers, and middlewares.
const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(actions);
const persistor = persistStore(store);

export { store, persistor };
