export type AIRecommendationCategory = 'Health' | 'Life' | 'Motor' | 'Travel' | 'Property';

export interface AIRecommendation {
  id: string;
  policyName: string;
  insurerName: string;
  matchScore: number; // e.g. 96 (%)
  category: AIRecommendationCategory;
  monthlyPremium: number;
  coverageAmount: string;
  rationale: string[]; // Key reasons why AI recommended this
  plainEnglishSummary: string; // Module 15 plain-English explainer
  claimProbabilityScore: number; // e.g. 98 (%) approval likelihood
  riskRating: 'Low Risk' | 'Moderate Risk' | 'Custom Underwriting';
}

export interface SearchResultItem {
  id: string;
  type: 'Policy' | 'Category' | 'Hospital' | 'FAQ' | 'Claim';
  title: string;
  subtitle: string;
  badgeText?: string;
  targetRoute: string;
  targetParams?: Record<string, string>;
}

export type LeadStage = 'New Lead' | 'Requirement Analysis' | 'Quote Sent' | 'Underwriting' | 'Converted' | 'Lost';

export interface AdvisorLead {
  leadId: string;
  customerName: string;
  mobile: string;
  email: string;
  interestedCategory: string;
  estimatedSumAssured: number;
  stage: LeadStage;
  assignedAdvisorName: string;
  lastContactedDate: string;
  notesCount: number;
  estimatedCommission: number;
  interactionLogs: Array<{ date: string; type: 'Call' | 'Meeting' | 'Note' | 'Email'; note: string }>;
}

export interface CommissionSummary {
  totalTarget: number;
  achievedTarget: number;
  pendingCommission: number;
  paidCommission: number;
  activeLeadsCount: number;
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface FraudCheckResult {
  evaluationId: string;
  proposalOrClaimId: string;
  customerName: string;
  overallRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  flagsTriggered: Array<{ ruleName: string; severity: RiskLevel; description: string }>;
  deviceFingerprint: {
    ipAddress: string;
    deviceId: string;
    geoCity: string;
    vpnDetected: boolean;
  };
  velocityCount24h: number;
  kycDocAuthenticityScore: number; // e.g. 99 (%)
  status: 'Clean' | 'Flagged For Ops Review' | 'Rejected / Blacklisted';
}
