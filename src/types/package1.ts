export type UserRole =
  | 'Customer'
  | 'Insurance Advisor'
  | 'Insurance Company'
  | 'Corporate Customer'
  | 'Super Admin'
  | 'Operations Team'
  | 'Customer Support';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  isKycVerified: boolean;
  aadhaarNumber?: string;
  panNumber?: string;
  occupation: string;
  annualIncome: string;
  nominees: Array<{ name: string; relation: string; sharePercentage: number }>;
  familyMembers: Array<{ name: string; relation: string; age: number }>;
  existingPolicies: Array<{ policyNumber: string; categoryName: string; expiryDate: string }>;
}

export interface MarketplaceFilterState {
  minPremium: number;
  maxPremium: number;
  minCoverage: number; // in lakhs
  maxWaitingPeriodMonths: number;
  minClaimRatio: number; // e.g. 95%
  minInsurerRating: number; // e.g. 4.0
  roomRentLimit: string;
  copayPreference: string;
  diseaseCoverageFilter: string;
  cashlessHospitalsOnly: boolean;
}

export interface QuoteInputParameters {
  categoryId: string;
  categoryName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  pincode: string;
  occupation: string;
  sumInsured: number; // in Rupees
  tobaccoUser: boolean;
  existingConditions: string[];
  vehicleDetails?: { make: string; model: string; year: number; ncbPercentage: number };
  selectedAddOns: string[];
}

export interface CalculatedQuote {
  id: string;
  insurerId: string;
  insurerName: string;
  insurerLogo: string;
  planName: string;
  claimSettlementRatio: number; // e.g. 98.5
  solvencyRatio: number; // e.g. 2.1
  cashlessHospitalsCount: number;
  basePremium: number;
  addOnsCost: number;
  ncbDiscount: number;
  gstAmount: number;
  finalPremium: number; // Annual premium
  roomRentLimit: string;
  copayPercentage: number;
  waitingPeriodMonths: number;
  diseaseExclusions: string[];
  taxBenefit: string;
  features: string[];
}
