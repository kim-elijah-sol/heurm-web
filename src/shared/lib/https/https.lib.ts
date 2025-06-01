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

https.interceptors.response.use(undefined, async (error) => {
  if (
    isAxiosError(error) &&
    error.response?.status === 401 &&
    error.response?.data === 'Access token is incorrect'
  ) {
    const refreshResult = await https.post('/user/refresh', {
      refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      clientId: localStorage.getItem(STORAGE_KEYS.CLIENT_ID),
    });

    const accessToken = refreshResult.data.accessToken;

    if (accessToken) {
      const originalRequest = error.config as AxiosRequestConfig;

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

      originalRequest.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await https(originalRequest);
      return response;
    }
  }

  return Promise.reject(error);
});
