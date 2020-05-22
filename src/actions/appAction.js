import Axios from 'axios';
import { push } from 'connected-react-router'
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import {
  LOG_OUT, LOGIN_ERROR, LOGIN_SUCCESS,
} from '../actionTypes/appTypes';
 
export const Login = credentials => dispatch => { 
  return Axios.post('/api/auth/login', credentials)
  .then((response) => {
    if (response.data.success) {
      setAuthorizationToken(response.data.token);
      dispatch({ type: LOGIN_SUCCESS, loginCredentials: response.data });
      return response.data;
    }
    dispatch({ type: LOGIN_ERROR, loginError: response.data });

    const { type } = response.data;
    const message = type ? response.data.message : 'El sistema no funciona, intente más tarde o póngase en contacto con el administrador.';
    const data = {
      ...response.data,
      unknown: true,
      message,
    };
    return data;
  })
  .catch((response) => {
    dispatch({ type: LOGIN_ERROR, loginError: response.data });
    const data = {
      success: false,
      unknown: true,
      message: 'El sistema no funciona, intente más tarde o póngase en contacto con el administrador.',
    };
    localStorage.removeItem('jwtToken')
    delete Axios.defaults.headers.common.Authorization
    return data;
  });
}

export const LogOutAction = () => (dispatch) => {
    localStorage.removeItem('jwtToken')
    delete Axios.defaults.headers.common.Authorization
    dispatch(push('/login'))
    dispatch({ type: LOG_OUT });
};

export const sendRecoveryEmail = email => () => new Promise((resolve, reject) => {
  Axios.post('/api/auth/forgot-password', { email })
    .then((response) => {
      if (response.data.success) {
        resolve();
      } else {
        reject(response.data);
      }
    })
    .catch((error) => {
      reject(error.response.data || error);
    });
});
