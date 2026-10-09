import { create } from 'zustand';
import { ThirdPartyIntegration, DigiLockerDocument, CKYCRecord } from '../types/package6';
import { integrationsService } from '../services/integrationsService';

interface IntegrationState {
  integrations: ThirdPartyIntegration[];
  digiDocs: DigiLockerDocument[];
  ckyc: CKYCRecord | null;
  isLoading: boolean;
  loadIntegrationData: () => Promise<void>;
}

export const useIntegrationStore = create<IntegrationState>((set) => ({
  integrations: [],
  digiDocs: [],
  ckyc: null,
  isLoading: false,
  loadIntegrationData: async () => {
    set({ isLoading: true });
    const [integrations, digiDocs, ckyc] = await Promise.all([
      integrationsService.getIntegrations(),
      integrationsService.fetchDigiLockerDocs(),
      integrationsService.fetchCKYCRecord(),
    ]);
    set({ integrations, digiDocs, ckyc, isLoading: false });
  },
}));
