import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { env } from '../config/env';

const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config;

    // Don't retry refresh endpoint to prevent cycles
    if (originalRequest.url?.includes('/auth/refresh')) {
      isRefreshing = false;
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post('/auth/refresh');
        isRefreshing = false;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Dispatch custom event for AuthContext to handle
        window.dispatchEvent(new CustomEvent('auth:session-expired'));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
