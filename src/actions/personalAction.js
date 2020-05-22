import Axios from 'axios';
import _ from 'lodash'
import {
    GET_PERSONAL_LIST_FULFILLED, GET_PERSONAL_LIST_PENDING, GET_PERSONAL_LIST_REJECTED, POST_PERSONAL_FULFILLED, POST_PERSONAL_REJECTED, UPDATE_PERSONAL_FULFILLED, UPDATE_PERSONAL_REJECTED, DELETE_PERSONAL_FULFILLED, DELETE_PERSONAL_REJECTED
} from '../actionTypes/personal';
 
export const getPersonalInformations = () => dispatch => { 
  dispatch({ type: GET_PERSONAL_LIST_PENDING });
  return Axios.get('/api/pi')
  .then((response) => {
    if (response.data) {
      const payload = _.keyBy(response.data, '_id')

      dispatch({ type: GET_PERSONAL_LIST_FULFILLED, payload  });
      return response.data;
    }
    
    dispatch({ type: GET_PERSONAL_LIST_REJECTED, payload: response.data });

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
    dispatch({ type: GET_PERSONAL_LIST_REJECTED, payload: response.data });
    const data = {
      success: false,
      unknown: true,
      message: 'El sistema no funciona, intente más tarde o póngase en contacto con el administrador.',
    };
    return data;
  });
}
  
export const postPersonalInformation = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.post('/api/pi',{
    pi_first_name: data.pi_first_name,
    pi_second_name: data.pi_second_name,
    pi_first_surname: data.pi_first_surname,
    pi_second_surname: data.pi_second_surname,  
    pi_married_lastname: data.pi_married_lastname,
    pi_DUI: data.pi_DUI,
    pi_NIT: data.pi_NIT,
    pi_birthdate: data.pi_birthdate,
    pi_phone: data.pi_phone,
    pi_address: data.pi_address,
    pi_email: data.pi_email,
    pi_gender: data.pi_gender,
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: POST_PERSONAL_FULFILLED, payload: response.data.personalInfo });

      return response.data;
    }
    reject(response.data);
    dispatch({ type: POST_PERSONAL_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: POST_PERSONAL_REJECTED, payload: response.data });
  });
});

export const updatePersonalInformation = (id, data) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.put(`/api/pi/${id}`,{
    pi_first_name: data.pi_first_name,
    pi_second_name: data.pi_second_name,
    pi_first_surname: data.pi_first_surname,
    pi_second_surname: data.pi_second_surname,  
    pi_married_lastname: data.pi_married_lastname,
    pi_DUI: data.pi_DUI,
    pi_NIT: data.pi_NIT,
    pi_birthdate: data.pi_birthdate,
    pi_phone: data.pi_phone,
    pi_address: data.pi_address,
    pi_email: data.pi_email,
    pi_gender: data.pi_gender,
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: UPDATE_PERSONAL_FULFILLED, payload: response.data.personalInfo });

      return response.data;
    }
    reject(response.data);
    dispatch({ type: UPDATE_PERSONAL_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: UPDATE_PERSONAL_REJECTED, payload: response.data });
  });
});
  
export const desactivePersonalInformation = (id) => (dispatch, getState) => new Promise((resolve, reject) => {
  Axios.put(`/api/pi/${id}/deactive`,{
  })
  .then((response) => {
    if (response.data.success) {
      resolve(response);
      dispatch({ type: DELETE_PERSONAL_FULFILLED, payload: response.data.personalInformation._id });
    }
    reject(response.data);
    dispatch({ type: DELETE_PERSONAL_REJECTED, payload: response.data });
  })
  .catch((response) => {
    reject(response.data);
    dispatch({ type: DELETE_PERSONAL_REJECTED, payload: response.data });
  });
});
