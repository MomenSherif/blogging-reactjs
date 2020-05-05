import { combineReducers } from 'redux';

// Import All Reducers
import authenticationReducer from './authentication';
import statusReducer from './status';
import blogsReducer from './blogs';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  status: statusReducer,
  blogs: blogsReducer,
});

export default rootReducer;
