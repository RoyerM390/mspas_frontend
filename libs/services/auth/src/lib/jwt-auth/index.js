import axios from 'axios';

export default class JwtAxios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    });

    this.instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.data.msg === 'Token is not valid') {
          console.log('Need to logout user');
          // store.dispatch({type: LOGOUT});
        }
        return Promise.reject(err);
      }
    );
  }

  init() {
    return this.instance;
  }

  setAuthToken(token) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] =
        'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }
}
