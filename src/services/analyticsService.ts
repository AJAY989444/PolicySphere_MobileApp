import { FunnelStage, PlatformKPIs } from '../types/package5';

const MOCK_FUNNEL_STAGES: FunnelStage[] = [
  { stageName: 'Search & Browse', usersCount: 100000, conversionPercent: 100, dropoffPercent: 0 },
  { stageName: 'Policy Comparison', usersCount: 64000, conversionPercent: 64, dropoffPercent: 36 },
  { stageName: 'Proposal Submission', usersCount: 38000, conversionPercent: 38, dropoffPercent: 26 },
  { stageName: 'Payment Gateway', usersCount: 28000, conversionPercent: 28, dropoffPercent: 10 },
  { stageName: 'Policy Issued', usersCount: 26500, conversionPercent: 26.5, dropoffPercent: 1.5 },
];

const MOCK_PLATFORM_KPIS: PlatformKPIs = {
  dailyActiveUsers: 45200,
  monthlyActiveUsers: 520000,
  retentionRate: 84.5,
  totalPremiumCollected: 148500000, // ₹14.85 Crore
  totalPoliciesSold: 28450,
  claimsRatio: 98.4,
  npsScore: 72,
  averageCLV: 45000,
};

export class AnalyticsService {
  public async getFunnelAnalytics(): Promise<FunnelStage[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_FUNNEL_STAGES]), 150);
    });
  }

  public async getPlatformKPIs(): Promise<PlatformKPIs> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...MOCK_PLATFORM_KPIS }), 150);
    });
  }
}

export const analyticsService = new AnalyticsService();
