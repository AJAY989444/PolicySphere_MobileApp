import { create } from 'zustand';
import { DPDPConsentItem, ComplianceCheckItem } from '../types/package7';
import { complianceService } from '../services/complianceService';

interface ComplianceState {
  consents: DPDPConsentItem[];
  checks: ComplianceCheckItem[];
  isLoading: boolean;
  loadComplianceData: () => Promise<void>;
  toggleConsent: (id: string) => Promise<void>;
}

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  consents: [],
  checks: [],
  isLoading: false,
  loadComplianceData: async () => {
    set({ isLoading: true });
    const [consents, checks] = await Promise.all([
      complianceService.getConsents(),
      complianceService.getComplianceChecks(),
    ]);
    set({ consents, checks, isLoading: false });
  },
  toggleConsent: async (id) => {
    const updated = await complianceService.toggleConsent(id);
    if (updated) {
      set({ consents: get().consents.map((c) => (c.id === id ? updated : c)) });
    }
  },
}));
