import axios from 'axios';
import store from '../redux/store';
import { onLoading, onSuccess } from '../redux/actions/status';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    store.dispatch(onLoading());
    const { token } = store.getState().auth;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    const { message } = response.data;
    if (message) store.dispatch(onSuccess(message));
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
