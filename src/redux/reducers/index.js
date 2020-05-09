import { combineReducers } from 'redux';

// Import All Reducers
import authenticationReducer from './authentication';
import statusReducer from './status';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  status: statusReducer,
});

export default rootReducer;
