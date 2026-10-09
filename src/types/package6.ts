export type ServiceHealthStatus = 'Healthy' | 'Degraded' | 'Down';
export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface MicroserviceInfo {
  id: string;
  name: string;
  code: string;
  endpoint: string;
  health: ServiceHealthStatus;
  latencyMs: number;
  circuitBreaker: CircuitBreakerState;
  uptimePercent: number;
}

export type APIProtocol = 'REST' | 'GraphQL' | 'WebSocket' | 'gRPC';

export interface APITrafficLog {
  id: string;
  timestamp: string;
  protocol: APIProtocol;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'SUBSCRIBE';
  url: string;
  status: number;
  latencyMs: number;
  idempotencyKey?: string;
  requestHeaders: Record<string, string>;
  responsePayload: string;
}

export interface RateLimitStatus {
  limitPerMinute: number;
  remaining: number;
  resetSeconds: number;
}

export interface OfflineMutationItem {
  id: string;
  actionType: 'CLAIM_INTIMATION' | 'LEAD_NOTE' | 'DOCUMENT_UPLOAD' | 'PROFILE_UPDATE';
  payloadSummary: string;
  timestamp: string;
  status: 'QUEUED' | 'SYNCING' | 'SYNCED' | 'FAILED';
}

export interface StorageStats {
  totalAllocatedMB: number;
  usedMemoryMB: number;
  cachedPoliciesCount: number;
  cachedQuotesCount: number;
  pendingSyncQueueCount: number;
  lastSyncedTimestamp: string;
}

export interface ThirdPartyIntegration {
  id: string;
  providerName: string;
  category: 'Govt Identity' | 'KYC Registry' | 'Messaging' | 'Payment Gateway' | 'Maps & Location';
  apiStatus: 'Connected & Operational' | 'Rate Limited' | 'Maintenance';
  latencyMs: number;
  authMethod: 'OAuth2' | 'API Key' | 'HMAC Signature';
}

export interface DigiLockerDocument {
  docId: string;
  name: string;
  issuer: string;
  issuedDate: string;
  isVerified: boolean;
}

export interface CKYCRecord {
  ckycNumber: string;
  fullName: string;
  dob: string;
  panNumber: string;
  verificationStatus: 'Verified & Active';
}
