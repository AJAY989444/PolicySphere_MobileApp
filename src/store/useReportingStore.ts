import { create } from 'zustand';
import { ReportCategory, ReportSummary } from '../types/package5';
import { reportingService } from '../services/reportingService';

interface ReportingState {
  activeCategory: ReportCategory;
  currentReport: ReportSummary | null;
  isLoading: boolean;
  loadReport: (category: ReportCategory) => Promise<void>;
  exportCSV: () => Promise<void>;
}

export const useReportingStore = create<ReportingState>((set, get) => ({
  activeCategory: 'Sales',
  currentReport: null,
  isLoading: false,
  loadReport: async (category) => {
    set({ activeCategory: category, isLoading: true });
    const report = await reportingService.getReport(category);
    set({ currentReport: report, isLoading: false });
  },
  exportCSV: async () => {
    const report = get().currentReport;
    if (report) {
      await reportingService.exportReportCSV(report);
    }
  },
}));
