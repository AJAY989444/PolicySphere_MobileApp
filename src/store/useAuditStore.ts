import { create } from 'zustand';
import { AuditLogEvent } from '../types/package7';
import { auditTrailService } from '../services/auditTrailService';

interface AuditState {
  events: AuditLogEvent[];
  isLoading: boolean;
  loadAuditTrail: () => Promise<void>;
  exportAudit: () => Promise<void>;
}

export const useAuditStore = create<AuditState>((set) => ({
  events: [],
  isLoading: false,
  loadAuditTrail: async () => {
    set({ isLoading: true });
    const events = await auditTrailService.getAuditTrail();
    set({ events, isLoading: false });
  },
  exportAudit: async () => {
    await auditTrailService.exportAuditTrail();
  },
}));
