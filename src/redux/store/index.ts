import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import reducers, {RootState} from '../reducers';
  import {configureStore} from '@reduxjs/toolkit';
  import {useDispatch} from 'react-redux';
import { ENV } from '@/src/constants/configs';
  
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
  };
  
  const middlewares: any = [
    /* other middlewares */
  ];
  
  const persistedReducer = persistReducer<RootState>(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducer,
    devTools: ENV === 'DEV',
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middlewares, []);
    }
  });
  const persistor = persistStore(store);
  
  export const getPersistor = () => persistor;
  export const getStore = () => store;
  export const getState = () => store.getState();
  export const getUserToken = () => store.getState().auth.userToken;
  
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
  