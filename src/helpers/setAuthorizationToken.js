import Axios from 'axios';

export const setAuthorizationToken = (token) => {
  if (token) {
    localStorage.setItem('jwtToken', token);
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
