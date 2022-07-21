import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && err.response.data['message'] === 'Unauthorized access.') {
        originalConfig._retry = true;
        try {
          const rs = await api.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refresh_token'),
          });
          localStorage.setItem('access_token', rs.data['access_token']);
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);

export default api;
