import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers/index';

export const history = createBrowserHistory()

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);
