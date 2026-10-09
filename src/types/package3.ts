export type ClaimType = 'Cashless' | 'Reimbursement' | 'Vehicle' | 'Travel' | 'Property';
export type ClaimStage =
  | 'Intimated'
  | 'Documents Uploaded'
  | 'Under Verification'
  | 'Surveyor Assigned'
  | 'Approved'
  | 'Settled'
  | 'Closed';

export interface InsuranceClaim {
  claimId: string;
  policyNumber: string;
  categoryName: string;
  claimType: ClaimType;
  incidentDate: string;
  claimedAmount: number;
  approvedAmount?: number;
  currentStage: ClaimStage;
  surveyorName?: string;
  surveyorMobile?: string;
  hospitalName?: string;
  uploadedDocumentIds: string[];
  timeline: Array<{ stage: ClaimStage; timestamp: string; note: string }>;
}

export interface VaultDocument {
  id: string;
  documentName: string;
  documentType:
    | 'Aadhaar'
    | 'PAN'
    | 'Passport'
    | 'DL'
    | 'RC'
    | 'MedicalReport'
    | 'Bill'
    | 'DeathCert'
    | 'FIR'
    | 'ClaimForm';
  fileFormat: 'PDF' | 'JPG' | 'PNG' | 'DOCX';
  fileSize: string;
  uploadDate: string;
  version: number;
  isVirusScanned: boolean;
  isAiVerified: boolean;
  ocrExtractedText: string;
  encryptionStatus: 'AES-256 Encrypted';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  channel: 'InApp' | 'Push' | 'SMS' | 'WhatsApp' | 'Email';
  eventCategory: 'OTP' | 'Purchase' | 'Renewal' | 'Claim' | 'Payment' | 'Reminder';
  timestamp: string;
  isRead: boolean;
}

export interface SupportTicket {
  ticketId: string;
  subject: string;
  category: 'Claim Query' | 'Policy Endorsement' | 'Payment Failure' | 'General';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  slaHoursRemaining: number;
  createdDate: string;
  messages: Array<{ sender: 'Customer' | 'Support Agent' | 'AI Assistant'; text: string; timestamp: string }>;
}

export interface KnowledgeBaseArticle {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  readTime: string;
}
