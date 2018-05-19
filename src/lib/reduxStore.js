/**
 * @file reduxStore.js
 * Constructs Redux store and persistor.
 */

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage
  },
  reducer
);

const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store);

export { store, persistor };
