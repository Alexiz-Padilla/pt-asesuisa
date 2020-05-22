import Axios from 'axios';
import _ from 'lodash'
import {
    GET_USERS_LIST_FULFILLED, GET_USERS_LIST_PENDING, GET_USERS_LIST_REJECTED, POST_USER_FULFILLED, POST_USER_REJECTED, UPDATE_USER_FULFILLED, UPDATE_USER_REJECTED, DELETE_USER_FULFILLED, DELETE_USER_REJECTED
} from '../actionTypes/userTypes';
 
export const getUsers = () => dispatch => { 
    dispatch({ type: GET_USERS_LIST_PENDING });
  return Axios.get('/api/users')
  .then((response) => {
    if (response.data.success) {
      const payload = _.keyBy(response.data.users, '_id')

      dispatch({ type: GET_USERS_LIST_FULFILLED, payload });
      return response.data;
    }
    
    dispatch({ type: GET_USERS_LIST_REJECTED, payload: response.data });

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
    dispatch({ type: GET_USERS_LIST_REJECTED, payload: response.data });
    const data = {
      success: false,
      unknown: true,
      message: 'El sistema no funciona, intente más tarde o póngase en contacto con el administrador.',
    };
    return data;
  });
}
  
export const postUser = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.post('/api/users',{
    user_first_name: data.user_first_name,
    user_last_name: data.user_last_name,
    user_email: data.user_email,
    user_phone1: data.user_phone1,
    user_phone2: data.user_phone2, 
    user_password: data.user_password, 
    user_role: data.user_role, 
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: POST_USER_FULFILLED, payload: response.data });
    }
    reject(response.data);
    dispatch({ type: POST_USER_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: POST_USER_REJECTED, payload: response.data });
  });
});

export const updateUser = (id, data) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.put(`/api/users/${id}`,{
    user_first_name: data.user_first_name,
    user_last_name: data.user_last_name,
    user_phone1: data.user_phone1,
    user_phone2: data.user_phone2, 
    user_role: data.role, 
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: UPDATE_USER_FULFILLED, payload: response.data });
    }
    reject(response.data);
    dispatch({ type: UPDATE_USER_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: UPDATE_USER_REJECTED, payload: response.data });
  });
});
  
export const desactiveUser = (id) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.put(`/api/users/${id}/deactive`,{
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: DELETE_USER_FULFILLED, payload: response.data });
    }
    reject(response.data);
    dispatch({ type: DELETE_USER_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: DELETE_USER_REJECTED, payload: response.data });
  });
});
