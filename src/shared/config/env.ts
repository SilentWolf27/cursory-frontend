export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',

  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',

  IS_DEV: import.meta.env.VITE_APP_ENV === 'development',
  IS_PROD: import.meta.env.VITE_APP_ENV === 'production',
} as const;
