import {legacy_createStore as createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import accountReducer from './Reducer/Account';
import {persistStore, persistReducer} from 'redux-persist';
import messageReducer from './Reducer/Message';

const AccountReducerPersist = {
  key: 'accountreducer',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const MessageReducerPersist = {
  key: 'messageReducer',
  storage: AsyncStorage,
  whitelist: [],
};

const combinedReducers = combineReducers({
  accountReducer: persistReducer(AccountReducerPersist, accountReducer),
  messageReducer: persistReducer(MessageReducerPersist, messageReducer),
});

const store = createStore(combinedReducers);

const peristStore = persistStore(store);

export {store, peristStore};
