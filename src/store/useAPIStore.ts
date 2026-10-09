import { create } from 'zustand';
import { APITrafficLog, RateLimitStatus, APIProtocol } from '../types/package6';
import { apiClientService } from '../services/apiClient';

interface APIState {
  trafficLogs: APITrafficLog[];
  rateLimit: RateLimitStatus | null;
  isLoading: boolean;
  loadAPIData: () => Promise<void>;
  simulateRequest: (protocol: APIProtocol, url: string) => Promise<void>;
}

export const useAPIStore = create<APIState>((set, get) => ({
  trafficLogs: [],
  rateLimit: null,
  isLoading: false,
  loadAPIData: async () => {
    set({ isLoading: true });
    const [logs, rateLimit] = await Promise.all([
      apiClientService.getTrafficLogs(),
      apiClientService.getRateLimitStatus(),
    ]);
    set({ trafficLogs: logs, rateLimit, isLoading: false });
  },
  simulateRequest: async (protocol, url) => {
    const log = await apiClientService.simulateRequest(protocol, url);
    const updatedRateLimit = await apiClientService.getRateLimitStatus();
    set({ trafficLogs: [log, ...get().trafficLogs], rateLimit: updatedRateLimit });
  },
}));
