import { create } from 'zustand';
import { SystemLogEntry, LogLevel } from '../types/package7';
import { loggingService } from '../services/loggingService';

interface LoggingState {
  logs: SystemLogEntry[];
  selectedLevel: LogLevel | 'ALL';
  isLoading: boolean;
  loadLogs: () => Promise<void>;
  setSelectedLevel: (level: LogLevel | 'ALL') => void;
  exportJSON: () => Promise<void>;
}

export const useLoggingStore = create<LoggingState>((set) => ({
  logs: [],
  selectedLevel: 'ALL',
  isLoading: false,
  loadLogs: async () => {
    set({ isLoading: true });
    const logs = await loggingService.getLogs();
    set({ logs, isLoading: false });
  },
  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),
  exportJSON: async () => {
    await loggingService.exportLogsJSON();
  },
}));
