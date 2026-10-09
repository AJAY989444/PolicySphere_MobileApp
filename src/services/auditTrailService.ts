import { AuditLogEvent } from '../types/package7';
import { downloadBlobFile } from '../utils/downloadPdf';

const MOCK_AUDIT_EVENTS: AuditLogEvent[] = [
  {
    auditId: 'AUD-2026-901',
    timestamp: '2026-10-09 13:10:00',
    action: 'POLICY_PURCHASED',
    actorUserId: 'USR-99182',
    actorPersona: 'Customer',
    ipAddress: '103.21.124.55',
    deviceHash: 'iOS-iPhone15Pro-a8f92b',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    details: 'Purchased HDFC ERGO Optima Secure (POL-HLT-2026-99182) for ₹48,500 via UPI',
  },
  {
    auditId: 'AUD-2026-882',
    timestamp: '2026-10-08 16:45:12',
    action: 'CLAIM_INTIMATED',
    actorUserId: 'USR-99182',
    actorPersona: 'Customer',
    ipAddress: '103.21.124.55',
    deviceHash: 'iOS-iPhone15Pro-a8f92b',
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    details: 'Intimated cashless claim CLM-HLT-99201 for Apollo Hospital (₹65,000)',
  },
  {
    auditId: 'AUD-2026-751',
    timestamp: '2026-10-07 11:20:30',
    action: 'DPDP_CONSENT_UPDATED',
    actorUserId: 'USR-99182',
    actorPersona: 'Customer',
    ipAddress: '103.21.124.55',
    deviceHash: 'iOS-iPhone15Pro-a8f92b',
    sha256Hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    details: 'Granted DPDP consent for Core Policy Issuance Data Processing',
  },
  {
    auditId: 'AUD-2026-610',
    timestamp: '2026-10-06 09:15:00',
    action: 'PERMISSION_TOGGLED',
    actorUserId: 'ADM-001',
    actorPersona: 'Super Admin',
    ipAddress: '103.11.200.41',
    deviceHash: 'MacBookPro-m3-9912a',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    details: 'Updated Insurance Company RBAC matrix permission: Granted Approve action',
  },
];

export class AuditTrailService {
  private events: AuditLogEvent[] = MOCK_AUDIT_EVENTS;

  public async getAuditTrail(): Promise<AuditLogEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.events]), 150);
    });
  }

  public async logAudit(action: AuditLogEvent['action'], persona: string, details: string): Promise<AuditLogEvent> {
    const hash = `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const event: AuditLogEvent = {
      auditId: `AUD-2026-${Math.floor(Math.random() * 899 + 100)}`,
      timestamp: new Date().toLocaleString('en-IN'),
      action,
      actorUserId: 'USR-99182',
      actorPersona: persona,
      ipAddress: '103.21.124.55',
      deviceHash: 'iOS-iPhone15Pro-a8f92b',
      sha256Hash: hash,
      details,
    };
    this.events.unshift(event);
    return event;
  }

  public async exportAuditTrail(): Promise<void> {
    const lines = [
      `PolicySphere Immutable Audit Trail Report`,
      `Generated Date: ${new Date().toLocaleString('en-IN')}`,
      `Audit ID,Timestamp,Action,Actor User,Persona,IP Address,SHA-256 Hash,Details`,
      ...this.events.map(
        (e) =>
          `"${e.auditId}","${e.timestamp}","${e.action}","${e.actorUserId}","${e.actorPersona}","${e.ipAddress}","${e.sha256Hash}","${e.details}"`
      ),
    ];
    downloadBlobFile('PolicySphere_Audit_Trail_2026.csv', lines.join('\n'));
  }
}

export const auditTrailService = new AuditTrailService();
