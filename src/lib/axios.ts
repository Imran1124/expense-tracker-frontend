import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// ----------------------------------------------------------------------

export type { AxiosRequestConfig, AxiosResponse };

// export const BASE_URI = 'http://localhost:3001';
export const BASE_URI = 'https://expense-tracker-backend-two-henna.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URI + '/api/v1'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // set token to header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// intercept every response
axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.data?.authenticated == false ||
      response.data?.isUser == false
    ) {
      delete axiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('authenticated', response.data?.authenticated);
      // window.location.href = '/auth/login';
      alert('Session Expired');
      window.location.reload();
    }
    return response;
  },
  async (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
