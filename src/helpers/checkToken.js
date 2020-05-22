import Axios from 'axios';
import { setAuthorizationToken } from './setAuthorizationToken';

export const checkToken = () => new Promise((resolve, reject) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    setAuthorizationToken(token);
    Axios.post('/api/auth/check-session-token', { token })
      .then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  } else {
    reject();
  }
});
