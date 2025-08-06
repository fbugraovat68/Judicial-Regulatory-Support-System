// Application Constants
export const APP_CONSTANTS = {
  NAME: 'RA Ticketing System',
  VERSION: '1.0.0',
  DESCRIPTION: 'Legal Case Management System',
} as const;

// API Constants
export const API_CONSTANTS = {
  TIMEOUT: 10000,
  FORM_DATA_TIMEOUT: 30000,
  APPLICATION_NAME: 'ra-tik',
  SKIP_LOADER: 'yes',
} as const;

// Pagination Constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 7,
  DEFAULT_PAGE_INDEX: 1,
  MAX_PAGE_SIZE: 100,
} as const;

// File Upload Constants
export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'],
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
  ],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_STORAGE: 'user-storage',
  TOKEN_STORAGE: 'token-storage',
  NOTIFICATION_STORAGE: 'notification-storage',
  FILTERS_STORAGE: 'filters-store',
  USER_ROLES: 'user-roles',
  LANGUAGE: 'i18nextLng',
} as const;

// Route Constants
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CASES: '/cases',
  CASE_DETAILS: '/cases/:id',
  CALENDAR: '/calendar',
  ADMIN: '/admin',
  LOGIN: '/login',
  NOT_FOUND: '/404',
} as const;

// Theme Constants
export const THEME_CONSTANTS = {
  PRIMARY_COLOR: '#4f008c',
  BORDER_RADIUS: 6,
  FONT_FAMILY: 'Inter, system-ui, sans-serif',
} as const;

// Date Format Constants
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm',
} as const;

// Validation Constants
export const VALIDATION_CONSTANTS = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 1000,
} as const; 