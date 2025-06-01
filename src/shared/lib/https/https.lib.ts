import axios from 'axios';
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
