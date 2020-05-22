import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';
import userReducer from './userReducer';
import personalReducer from './personalReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  appReducer,
  userReducer,
  personalReducer,
});

export default createRootReducer;
