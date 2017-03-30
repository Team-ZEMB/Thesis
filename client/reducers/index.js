import { combineReducers } from 'redux';
import UserReducer from './userdata.js';

const rootReducer = combineReducers({
  userdata: UserReducer,
});

export default rootReducer;
