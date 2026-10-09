import {
  PendingUnderwritingItem,
  EmpaneledInsurer,
  PromoCoupon,
} from '../types/package5';

const MOCK_UNDERWRITING_QUEUE: PendingUnderwritingItem[] = [
  {
    id: 'uw-1',
    type: 'Proposal',
    customerName: 'Ramesh Verma',
    categoryName: 'Health Insurance',
    policyOrClaimNumber: 'PROP-HLT-2026-99182',
    amount: 78000,
    submittedDate: '2026-10-06',
    riskScore: 78,
    status: 'Pending Review',
  },
  {
    id: 'uw-2',
    type: 'Claim',
    customerName: 'Karan Malhotra',
    categoryName: 'Motor Insurance',
    policyOrClaimNumber: 'CLM-MTR-88102',
    amount: 145000,
    submittedDate: '2026-10-05',
    riskScore: 65,
    status: 'Pending Review',
  },
];

const MOCK_INSURERS: EmpaneledInsurer[] = [
  { id: 'ins-1', name: 'HDFC ERGO General Insurance', code: 'HDFC_ERGO', claimSettlementRatio: 99.2, activeProductsCount: 14, status: 'Active' },
  { id: 'ins-2', name: 'ICICI Prudential Life', code: 'ICICI_PRU', claimSettlementRatio: 99.1, activeProductsCount: 18, status: 'Active' },
  { id: 'ins-3', name: 'Tata AIG General Insurance', code: 'TATA_AIG', claimSettlementRatio: 98.6, activeProductsCount: 12, status: 'Active' },
  { id: 'ins-4', name: 'Star Health & Allied', code: 'STAR_HLT', claimSettlementRatio: 97.9, activeProductsCount: 9, status: 'Active' },
  { id: 'ins-5', name: 'Digit General Insurance', code: 'GODIGIT', claimSettlementRatio: 96.5, activeProductsCount: 7, status: 'Under Audit' },
];

const MOCK_COUPONS: PromoCoupon[] = [
  { code: 'FESTIVE10', discountPercentage: 10, maxDiscount: 2000, validCategory: 'All', expiryDate: '2026-12-31', isActive: true },
  { code: 'HEALTH2026', discountPercentage: 15, maxDiscount: 3500, validCategory: 'Health Insurance', expiryDate: '2026-11-30', isActive: true },
  { code: 'AUTOSAVE5', discountPercentage: 5, maxDiscount: 1000, validCategory: 'Motor Insurance', expiryDate: '2026-10-31', isActive: false },
];

export class AdminService {
  private queue: PendingUnderwritingItem[] = MOCK_UNDERWRITING_QUEUE;
  private insurers: EmpaneledInsurer[] = MOCK_INSURERS;
  private coupons: PromoCoupon[] = MOCK_COUPONS;

  public async getPendingUnderwritingQueue(): Promise<PendingUnderwritingItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.queue]), 150);
    });
  }

  public async getInsurers(): Promise<EmpaneledInsurer[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.insurers]), 150);
    });
  }

  public async getCoupons(): Promise<PromoCoupon[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.coupons]), 150);
    });
  }

  public async reviewQueueItem(id: string, action: 'Approved' | 'Rejected', notes: string): Promise<PendingUnderwritingItem | null> {
    const item = this.queue.find((q) => q.id === id);
    if (!item) return null;
    item.status = action;
    item.reviewerNotes = notes;
    return { ...item };
  }

  public async toggleCouponActive(code: string): Promise<PromoCoupon | null> {
    const coupon = this.coupons.find((c) => c.code === code);
    if (!coupon) return null;
    coupon.isActive = !coupon.isActive;
    return { ...coupon };
  }
}

export const adminService = new AdminService();
