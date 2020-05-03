import { combineReducers } from 'redux';

// Import All Reducers
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  auth: authenticationReducer,
});

export default rootReducer;
