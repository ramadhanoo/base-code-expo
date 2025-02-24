import {combineReducers} from 'redux';
import AuthReducer from '../slices/AuthSlice';
import { usersApi } from '../api/users';


const reducers = combineReducers({
  auth: AuthReducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;