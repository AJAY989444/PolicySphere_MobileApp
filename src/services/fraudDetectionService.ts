import { FraudCheckResult } from '../types/package4';

const MOCK_FRAUD_AUDITS: FraudCheckResult[] = [
  {
    evaluationId: 'FRD-EV-9012',
    proposalOrClaimId: 'PROP-HLT-2026-99182',
    customerName: 'Rajesh Kumar',
    overallRiskScore: 12,
    riskLevel: 'Low',
    flagsTriggered: [],
    deviceFingerprint: {
      ipAddress: '103.21.124.55 (Delhi, IN)',
      deviceId: 'iOS-iPhone15Pro-a8f92b',
      geoCity: 'New Delhi',
      vpnDetected: false,
    },
    velocityCount24h: 1,
    kycDocAuthenticityScore: 99,
    status: 'Clean',
  },
  {
    evaluationId: 'FRD-EV-8821',
    proposalOrClaimId: 'CLM-HLT-99201',
    customerName: 'Ramesh Verma (Suspected Duplicate)',
    overallRiskScore: 78,
    riskLevel: 'High',
    flagsTriggered: [
      { ruleName: 'Duplicate PAN / Aadhaar Hash', severity: 'High', description: 'Matching Aadhaar hash registered under 2 different names within 48h.' },
      { ruleName: 'IP Velocity Exceeded', severity: 'Medium', description: '5 claims intimated from same IP address within 1 hour.' },
      { ruleName: 'OCR OCR Alteration Flag', severity: 'High', description: 'Font irregularity detected on uploaded hospital bill amount area.' },
    ],
    deviceFingerprint: {
      ipAddress: '45.112.98.12 (Proxy / VPN)',
      deviceId: 'Android-Pixel7-3391ba',
      geoCity: 'Mumbai',
      vpnDetected: true,
    },
    velocityCount24h: 5,
    kycDocAuthenticityScore: 62,
    status: 'Flagged For Ops Review',
  },
];

export class FraudDetectionService {
  private audits: FraudCheckResult[] = MOCK_FRAUD_AUDITS;

  public async getFraudAuditLogs(): Promise<FraudCheckResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.audits]), 150);
    });
  }

  public async evaluateProposalOrClaim(
    targetId: string,
    customerName: string
  ): Promise<FraudCheckResult> {
    const isHighRisk = Math.random() < 0.3;
    const score = isHighRisk ? Math.floor(Math.random() * 30 + 65) : Math.floor(Math.random() * 20 + 5);

    const result: FraudCheckResult = {
      evaluationId: `FRD-EV-${Math.floor(Math.random() * 8999 + 1000)}`,
      proposalOrClaimId: targetId,
      customerName,
      overallRiskScore: score,
      riskLevel: score > 60 ? 'High' : score > 30 ? 'Medium' : 'Low',
      flagsTriggered:
        score > 60
          ? [
              { ruleName: 'Device Hash Velocity', severity: 'High', description: 'Multiple proposals submitted from same hardware fingerprint.' },
            ]
          : [],
      deviceFingerprint: {
        ipAddress: '103.11.200.41',
        deviceId: `Device-${Math.floor(Math.random() * 899 + 100)}`,
        geoCity: 'Bengaluru',
        vpnDetected: false,
      },
      velocityCount24h: isHighRisk ? 4 : 1,
      kycDocAuthenticityScore: isHighRisk ? 74 : 98,
      status: score > 60 ? 'Flagged For Ops Review' : 'Clean',
    };

    this.audits.unshift(result);
    return result;
  }
}

export const fraudDetectionService = new FraudDetectionService();
