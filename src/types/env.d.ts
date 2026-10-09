declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_APP_ENV?: 'development' | 'staging' | 'production';
      EXPO_PUBLIC_API_BASE_URL?: string;
      EXPO_PUBLIC_APP_VERSION?: string;
      EXPO_PUBLIC_ENABLE_MOCK_API?: string;
    }
  }
}

export {};
