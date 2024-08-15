import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userReducer from './User/UserSlice'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeReducer from './Theme/themeSlice'

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer

});
const persistConfig={
    key:'root',
    storage,
    version:1,
};
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck:false
  })
})

export const persistor = persistStore(store);