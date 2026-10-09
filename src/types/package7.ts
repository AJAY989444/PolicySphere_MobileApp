export interface MaskedField {
  fieldName: string;
  rawValue: string;
  maskedValue: string;
  encryptionAlgorithm: 'AES-256-GCM';
  isEncrypted: boolean;
}

export interface DPDPConsentItem {
  id: string;
  title: string;
  purpose: string;
  category: 'Core Policy Issuance' | 'Third-Party Insurers' | 'Marketing & Analytics' | 'IRDAI Regulatory Sharing';
  isGranted: boolean;
  grantedTimestamp: string;
  isMandatory: boolean;
}

export interface ComplianceCheckItem {
  frameworkName: 'IRDAI Digital Guidelines' | 'DPDP Act 2023 (India)' | 'PCI DSS 4.0' | 'ISO 27001' | 'SOC 2 Type II' | 'AML & Sanction List';
  status: 'Compliant' | 'Audit Ready';
  score: number; // e.g. 100
  lastAuditDate: string;
  requirementsMetCount: number;
  totalRequirementsCount: number;
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SECURITY';

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  sourceModule: string;
  message: string;
  metaData: Record<string, string | number | boolean>;
}

export type AuditActionType =
  | 'LOGIN_SUCCESS'
  | 'POLICY_PURCHASED'
  | 'CLAIM_INTIMATED'
  | 'DOCUMENT_UPLOADED'
  | 'DPDP_CONSENT_UPDATED'
  | 'PERMISSION_TOGGLED'
  | 'PAYMENT_PROCESSED';

export interface AuditLogEvent {
  auditId: string;
  timestamp: string;
  action: AuditActionType;
  actorUserId: string;
  actorPersona: string;
  ipAddress: string;
  deviceHash: string;
  sha256Hash: string; // Cryptographic hash
  details: string;
}
