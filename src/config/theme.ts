import type { ThemeConfig } from 'antd';

// Ant Design Theme Configuration
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4f008c',
    colorPrimaryHover: '#6a1b9a',
    colorPrimaryActive: '#3d0066',
    borderRadius: 6,
    fontFamily: 'Cairo, sans-serif',
    fontSize: 14,
    lineHeight: 1.5,
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 36,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 36,
    },
    Select: {
      borderRadius: 6,
      controlHeight: 36,
    },
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
    Card: {
      borderRadius: 8,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    Modal: {
      borderRadius: 8,
    },
    Drawer: {
      borderRadius: 8,
    },
  },
};

// Custom CSS Variables for Tailwind
export const cssVariables = {
  '--color-primary': '#4f008c',
  '--color-primary-light': '#e5d9ee',
  '--color-soft-gray': '#fafafa',
  '--color-soft-gray-2': '#f4f4f4',
  '--color-soft-gray-7': '#f8f9fa',
  '--color-slate-black': '#1a1a1a',
  '--color-slate-black-3': '#333333',
  '--color-coral': '#ff6b6b',
  '--color-success': '#52c41a',
  '--color-warning': '#faad14',
  '--color-error': '#ff4d4f',
  '--color-info': '#1890ff',
} as const;

// RTL Theme Overrides
export const rtlTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    // RTL specific overrides
  },
};