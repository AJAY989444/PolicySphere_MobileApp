import { create } from 'zustand';
import { PendingUnderwritingItem, EmpaneledInsurer, PromoCoupon } from '../types/package5';
import { adminService } from '../services/adminService';

interface AdminState {
  queue: PendingUnderwritingItem[];
  insurers: EmpaneledInsurer[];
  coupons: PromoCoupon[];
  isLoading: boolean;
  loadAdminData: () => Promise<void>;
  reviewItem: (id: string, action: 'Approved' | 'Rejected', notes: string) => Promise<void>;
  toggleCoupon: (code: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  queue: [],
  insurers: [],
  coupons: [],
  isLoading: false,
  loadAdminData: async () => {
    set({ isLoading: true });
    const [queue, insurers, coupons] = await Promise.all([
      adminService.getPendingUnderwritingQueue(),
      adminService.getInsurers(),
      adminService.getCoupons(),
    ]);
    set({ queue, insurers, coupons, isLoading: false });
  },
  reviewItem: async (id, action, notes) => {
    const updated = await adminService.reviewQueueItem(id, action, notes);
    if (updated) {
      set({ queue: get().queue.map((q) => (q.id === id ? updated : q)) });
    }
  },
  toggleCoupon: async (code) => {
    const updated = await adminService.toggleCouponActive(code);
    if (updated) {
      set({ coupons: get().coupons.map((c) => (c.code === code ? updated : c)) });
    }
  },
}));
