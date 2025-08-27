import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { STORAGE_KEYS } from '~/shared/constant';

export const https = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

https.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processFailedQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

https.interceptors.response.use(undefined, async (error) => {
  if (
    isAxiosError(error) &&
    error.response?.status === 401 &&
    error.config?.url !== '/user/login'
  ) {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.data !== 'Access token is expired') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.CLIENT_ID);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      window.location.replace('/login');
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };
          return https(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    https
      .post('/user/refresh', {
        refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        clientId: localStorage.getItem(STORAGE_KEYS.CLIENT_ID),
      })
      .then(({ data: { accessToken } }) => {
        if (accessToken) {
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

          processFailedQueue(null, accessToken);

          originalRequest.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          };

          return https(originalRequest);
        } else {
          throw new Error('No access token received');
        }
      })
      .catch((error) => {
        processFailedQueue(error, null);

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.CLIENT_ID);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.location.replace('/login');

        return Promise.reject(error);
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return Promise.reject(error);
});
