export type ProposalStatus = 'Draft' | 'Locked' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Issued';

export interface ProposalDetails {
  proposalId: string;
  quoteId: string;
  insurerName: string;
  planName: string;
  categoryName: string;
  sumInsured: number;
  annualPremium: number;
  lockExpiryTimestamp: number; // 30 min lock timestamp
  proposer: {
    fullName: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    email: string;
    mobile: string;
    panNumber: string;
    addressLine1: string;
    pincode: string;
    city: string;
    state: string;
  };
  medicalDeclaration: {
    hasPreExistingCondition: boolean;
    conditionDetails: string;
    isSmoker: boolean;
  };
  nominee: {
    fullName: string;
    relationship: string;
    age: number;
  };
  status: ProposalStatus;
}

export type PaymentMethod = 'UPI' | 'CreditCard' | 'DebitCard' | 'NetBanking' | 'Wallet' | 'EMI' | 'AutoDebit';

export interface PaymentTransaction {
  txnId: string;
  proposalId: string;
  amount: number;
  method: PaymentMethod;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  timestamp: string;
  gatewayRef: string;
}

export interface IssuedPolicy {
  policyNumber: string;
  proposalId: string;
  insurerName: string;
  insurerLogo: string;
  categoryName: string;
  planName: string;
  sumInsured: number;
  annualPremium: number;
  policyStartDate: string;
  policyExpiryDate: string;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'LAPSED' | 'CANCELLED';
  certificatePdfUrl: string;
  nomineeName: string;
  dispatchChannels: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  paymentHistory: PaymentTransaction[];
}
