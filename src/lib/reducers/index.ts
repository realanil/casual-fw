// lib/reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import betReducer from './betReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  bet: betReducer,
  auth: authReducer
});

export default rootReducer;
