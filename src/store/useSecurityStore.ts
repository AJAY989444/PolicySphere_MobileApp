import { create } from 'zustand';
import { MaskedField } from '../types/package7';
import { securityService } from '../services/securityService';

interface SecurityState {
  fields: MaskedField[];
  isLoading: boolean;
  loadSecurityData: () => Promise<void>;
}

export const useSecurityStore = create<SecurityState>((set) => ({
  fields: [],
  isLoading: false,
  loadSecurityData: async () => {
    set({ isLoading: true });
    const fields = await securityService.getSecurityFields();
    set({ fields, isLoading: false });
  },
}));
