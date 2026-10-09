export type ReportCategory =
  | 'Sales'
  | 'Renewals'
  | 'Claims'
  | 'Fraud'
  | 'Commission'
  | 'Tax80D'
  | 'Operational';

export interface ReportDataRow {
  id: string;
  referenceId: string;
  category: string;
  customerName: string;
  amount: number;
  date: string;
  status: string;
  details: string;
}

export interface ReportSummary {
  reportType: ReportCategory;
  generatedDate: string;
  totalRecords: number;
  totalVolumeAmount: number;
  rows: ReportDataRow[];
}

export interface PendingUnderwritingItem {
  id: string;
  type: 'Proposal' | 'Claim';
  customerName: string;
  categoryName: string;
  policyOrClaimNumber: string;
  amount: number;
  submittedDate: string;
  riskScore: number; // 0 - 100
  status: 'Pending Review' | 'Approved' | 'Rejected';
  reviewerNotes?: string;
}

export interface EmpaneledInsurer {
  id: string;
  name: string;
  code: string;
  claimSettlementRatio: number;
  activeProductsCount: number;
  status: 'Active' | 'Under Audit' | 'Suspended';
}

export interface PromoCoupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  validCategory: string;
  expiryDate: string;
  isActive: boolean;
}

export type PermissionAction =
  | 'Create'
  | 'Read'
  | 'Update'
  | 'Delete'
  | 'Approve'
  | 'Reject'
  | 'Assign'
  | 'Export'
  | 'Import'
  | 'Configure'
  | 'Audit';

export type RoleName =
  | 'Customer'
  | 'Insurance Advisor'
  | 'Insurance Company'
  | 'Corporate Customer'
  | 'Super Admin'
  | 'Operations Team'
  | 'Customer Support';

export interface RolePermissions {
  role: RoleName;
  description: string;
  grantedActions: PermissionAction[];
}

export interface FunnelStage {
  stageName: string;
  usersCount: number;
  conversionPercent: number; // e.g. 100%, 64%, 38%
  dropoffPercent: number;
}

export interface PlatformKPIs {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  retentionRate: number; // e.g. 84.5%
  totalPremiumCollected: number;
  totalPoliciesSold: number;
  claimsRatio: number; // e.g. 98.4%
  npsScore: number; // e.g. 72
  averageCLV: number; // e.g. 45000
}
