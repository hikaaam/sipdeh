import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {createStore, combineReducers} from 'redux';

import {peraturan} from './Reducers';

const reducers = combineReducers({
  peraturan,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);