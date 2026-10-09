import { create } from 'zustand';
import { FunnelStage, PlatformKPIs } from '../types/package5';
import { analyticsService } from '../services/analyticsService';

interface AnalyticsState {
  funnelStages: FunnelStage[];
  kpis: PlatformKPIs | null;
  isLoading: boolean;
  loadAnalyticsData: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  funnelStages: [],
  kpis: null,
  isLoading: false,
  loadAnalyticsData: async () => {
    set({ isLoading: true });
    const [stages, kpis] = await Promise.all([
      analyticsService.getFunnelAnalytics(),
      analyticsService.getPlatformKPIs(),
    ]);
    set({ funnelStages: stages, kpis, isLoading: false });
  },
}));
