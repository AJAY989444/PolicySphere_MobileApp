import { create } from 'zustand';
import { FraudCheckResult } from '../types/package4';
import { fraudDetectionService } from '../services/fraudDetectionService';

interface FraudState {
  auditLogs: FraudCheckResult[];
  isLoading: boolean;
  loadAuditLogs: () => Promise<void>;
  evaluateItem: (targetId: string, customerName: string) => Promise<FraudCheckResult>;
}

export const useFraudStore = create<FraudState>((set, get) => ({
  auditLogs: [],
  isLoading: false,
  loadAuditLogs: async () => {
    set({ isLoading: true });
    const logs = await fraudDetectionService.getFraudAuditLogs();
    set({ auditLogs: logs, isLoading: false });
  },
  evaluateItem: async (targetId, customerName) => {
    const res = await fraudDetectionService.evaluateProposalOrClaim(targetId, customerName);
    set({ auditLogs: [res, ...get().auditLogs] });
    return res;
  },
}));
