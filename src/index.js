// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import App from './App'
import './index.css'
import { store, history } from './store/store'
import { checkToken } from './helpers/checkToken';
import {
  ALREADY_LOGGED, SET_CURRENT_USER
} from './actionTypes/appTypes';
import {
  LogOutAction
} from './actions/appAction'

const url = 'http://localhost:3001/';

axios.defaults.baseURL = url;

axios.interceptors.response.use(
  null,
  (error) => {
    const status = error.response.data.statusCode;
    if (status === 401) {
      store.dispatch(LogOutAction())
    }
    return Promise.reject(error)
  },
)

checkToken()
  .then(({ user }) => {
    store.dispatch({ type: ALREADY_LOGGED });
    store.dispatch({ type: SET_CURRENT_USER, user });

    ReactDOM.render(
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <App />
          </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
})
.catch(() => {

  ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

