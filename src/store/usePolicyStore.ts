import { create } from 'zustand';
import { IssuedPolicy, PaymentTransaction } from '../types/package2';

interface PolicyState {
  activePolicies: IssuedPolicy[];
  selectedPolicy: IssuedPolicy | null;
  latestTransaction: PaymentTransaction | null;
  setActivePolicies: (policies: IssuedPolicy[]) => void;
  setSelectedPolicy: (policy: IssuedPolicy | null) => void;
  setLatestTransaction: (txn: PaymentTransaction | null) => void;
  addIssuedPolicy: (policy: IssuedPolicy) => void;
}

export const usePolicyStore = create<PolicyState>((set) => ({
  activePolicies: [],
  selectedPolicy: null,
  latestTransaction: null,
  setActivePolicies: (activePolicies) => set({ activePolicies }),
  setSelectedPolicy: (selectedPolicy) => set({ selectedPolicy }),
  setLatestTransaction: (latestTransaction) => set({ latestTransaction }),
  addIssuedPolicy: (policy) =>
    set((state) => ({ activePolicies: [policy, ...state.activePolicies] })),
}));
