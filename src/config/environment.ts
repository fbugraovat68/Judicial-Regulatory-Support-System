export interface Environment {
  // Application
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  
  // API Configuration
  apiBaseUrl: string;
  apiVersion: string;
  formDataUrl: string;
  
  // External Services
  igateUrl: string;
  
  // Feature Flags
  enableDebug: boolean;
  enableAnalytics: boolean;
  enableMockApi: boolean;
  
  // Build Configuration
  generateSourceMap: boolean;
}

const getEnvironment = (): Environment => {
  const isProduction = import.meta.env.PROD;
  const isStaging = import.meta.env.VITE_APP_ENV === 'staging';
  
  return {
    // Application
    name: import.meta.env.VITE_APP_NAME || 'RA Ticketing System',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: isProduction 
      ? (isStaging ? 'staging' : 'production')
      : 'development',
    
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://172.20.162.75:9061/legal/new-ratik/api/v1',
    apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
    formDataUrl: import.meta.env.VITE_FORM_DATA_URL || 'http://172.20.162.75:9061/legal/new-ratik/api/v1',
    
    // External Services
    igateUrl: import.meta.env.VITE_IGATE_URL || 'https://igateapp.stc.com.sa',
    
    // Feature Flags
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
    
    // Build Configuration
    generateSourceMap: import.meta.env.GENERATE_SOURCEMAP === 'true',
  };
};

export const environment = getEnvironment();

// Helper functions
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = environment.apiBaseUrl;
  const version = environment.apiVersion;
  return `${baseUrl}/api/${version}/${endpoint}`.replace(/\/+/g, '/');
};

export const getFormDataUrl = (endpoint: string): string => {
  const baseUrl = environment.formDataUrl;
  const version = environment.apiVersion;
  return `${baseUrl}/api/${version}/${endpoint}`.replace(/\/+/g, '/');
};

export const isDevelopment = (): boolean => environment.environment === 'development';
export const isProduction = (): boolean => environment.environment === 'production';
export const isStaging = (): boolean => environment.environment === 'staging'; 