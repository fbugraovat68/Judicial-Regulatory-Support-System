import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { environment, API_CONSTANTS } from '@/config';
import { userService } from '@/features/auth/services/userService';

// Create API instance with environment configuration
const api: AxiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  timeout: API_CONSTANTS.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create form data API instance
const formDataApi: AxiosInstance = axios.create({
  baseURL: environment.formDataUrl,
  timeout: API_CONSTANTS.FORM_DATA_TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add environment-specific headers
    config.headers['X-Environment'] = environment.environment;
    config.headers['X-App-Version'] = environment.version;
    
    // Add user info if available
    const userInfo = userService.getUserInfo();
    if (userInfo) {
      config.headers.email = userInfo.loggedInUserEmail || '';
      config.headers['Accept-Language'] = userInfo.language || 'en';
    }
    
    config.headers.skipLoader = config.headers.skipLoader || 'no';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response?.data);
    }
    
    return Promise.reject(error);
  }
);

export { api, formDataApi };
export default api; 