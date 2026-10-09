import { create } from 'zustand';
import { AdvisorLead, CommissionSummary, LeadStage } from '../types/package4';
import { crmService } from '../services/crmService';

interface CRMState {
  leads: AdvisorLead[];
  commissionSummary: CommissionSummary | null;
  isLoading: boolean;
  loadCRMData: () => Promise<void>;
  updateLeadStage: (leadId: string, stage: LeadStage) => Promise<void>;
  addInteractionNote: (leadId: string, note: string, type: 'Call' | 'Meeting' | 'Note' | 'Email') => Promise<void>;
  createLead: (customerName: string, mobile: string, category: string, sumAssured: number) => Promise<AdvisorLead>;
}

export const useCRMStore = create<CRMState>((set, get) => ({
  leads: [],
  commissionSummary: null,
  isLoading: false,
  loadCRMData: async () => {
    set({ isLoading: true });
    const [leads, summary] = await Promise.all([
      crmService.getLeads(),
      crmService.getCommissionSummary(),
    ]);
    set({ leads, commissionSummary: summary, isLoading: false });
  },
  updateLeadStage: async (leadId, stage) => {
    const updated = await crmService.updateLeadStage(leadId, stage);
    if (updated) {
      set({ leads: get().leads.map((l) => (l.leadId === leadId ? updated : l)) });
    }
  },
  addInteractionNote: async (leadId, note, type) => {
    const updated = await crmService.addInteractionNote(leadId, note, type);
    if (updated) {
      set({ leads: get().leads.map((l) => (l.leadId === leadId ? updated : l)) });
    }
  },
  createLead: async (customerName, mobile, category, sumAssured) => {
    const newLead = await crmService.createLead(customerName, mobile, category, sumAssured);
    set({ leads: [newLead, ...get().leads] });
    return newLead;
  },
}));
