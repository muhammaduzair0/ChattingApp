import {legacy_createStore as createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import accountReducer from './Reducer/Account';
import {persistStore, persistReducer} from 'redux-persist';

const AccountReducerPersist = {
  key: 'accountreducer',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const combinedReducers = combineReducers({
  accountReducer: persistReducer(AccountReducerPersist, accountReducer),
});

const store = createStore(combinedReducers);

const peristStore = persistStore(store);

export {store, peristStore};
