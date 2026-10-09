import { create } from 'zustand';

interface AppState {
  appName: string;
  version: string;
  isInitialized: boolean;
  themeMode: 'light' | 'dark';
  setInitialized: (val: boolean) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  appName: 'PolicySphere',
  version: '1.0.0',
  isInitialized: false,
  themeMode: 'dark',
  setInitialized: (isInitialized) => set({ isInitialized }),
  toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'dark' ? 'light' : 'dark' })),
}));
