export interface AppEnvironment {
  envName: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  appVersion: string;
  enableMockApi: boolean;
}

export const ENV: AppEnvironment = {
  envName: (process.env.EXPO_PUBLIC_APP_ENV as AppEnvironment['envName']) || 'development',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.policysphere.internal/v1',
  appVersion: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  enableMockApi: process.env.EXPO_PUBLIC_ENABLE_MOCK_API !== 'false',
};
