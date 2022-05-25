import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import AccountReducer from './Reducer/Account';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, AccountReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export default persistor;
