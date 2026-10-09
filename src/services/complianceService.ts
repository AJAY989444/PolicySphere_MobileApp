import { DPDPConsentItem, ComplianceCheckItem } from '../types/package7';

const MOCK_CONSENTS: DPDPConsentItem[] = [
  { id: 'dpdp-1', title: 'Core Policy Issuance Data Processing', purpose: 'Process KYC, personal details and policy issuance under IRDAI guidelines.', category: 'Core Policy Issuance', isGranted: true, grantedTimestamp: '2026-10-01 10:00 AM', isMandatory: true },
  { id: 'dpdp-2', title: 'Empaneled Insurers Data Sharing', purpose: 'Share proposal & medical details with empaneled insurance company for underwriting.', category: 'Third-Party Insurers', isGranted: true, grantedTimestamp: '2026-10-01 10:00 AM', isMandatory: true },
  { id: 'dpdp-3', title: 'Personalised Product Offers & Renewals', purpose: 'Send automated renewal alerts and personalised insurance recommendations.', category: 'Marketing & Analytics', isGranted: true, grantedTimestamp: '2026-10-01 10:01 AM', isMandatory: false },
  { id: 'dpdp-4', title: 'IRDAI Regulatory Reporting', purpose: 'Submit statutory policy issuance & claims transaction reports to IRDAI BIMA VAHAK portal.', category: 'IRDAI Regulatory Sharing', isGranted: true, grantedTimestamp: '2026-10-01 10:00 AM', isMandatory: true },
];

const MOCK_COMPLIANCE_CHECKS: ComplianceCheckItem[] = [
  { frameworkName: 'DPDP Act 2023 (India)', status: 'Compliant', score: 100, lastAuditDate: '2026-10-01', requirementsMetCount: 24, totalRequirementsCount: 24 },
  { frameworkName: 'IRDAI Digital Guidelines', status: 'Compliant', score: 100, lastAuditDate: '2026-10-01', requirementsMetCount: 38, totalRequirementsCount: 38 },
  { frameworkName: 'PCI DSS 4.0', status: 'Compliant', score: 100, lastAuditDate: '2026-09-15', requirementsMetCount: 12, totalRequirementsCount: 12 },
  { frameworkName: 'ISO 27001', status: 'Audit Ready', score: 98, lastAuditDate: '2026-09-01', requirementsMetCount: 114, totalRequirementsCount: 114 },
  { frameworkName: 'AML & Sanction List', status: 'Compliant', score: 100, lastAuditDate: '2026-10-05', requirementsMetCount: 15, totalRequirementsCount: 15 },
];

export class ComplianceService {
  private consents: DPDPConsentItem[] = MOCK_CONSENTS;
  private checks: ComplianceCheckItem[] = MOCK_COMPLIANCE_CHECKS;

  public async getConsents(): Promise<DPDPConsentItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.consents]), 150);
    });
  }

  public async getComplianceChecks(): Promise<ComplianceCheckItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.checks]), 150);
    });
  }

  public async toggleConsent(id: string): Promise<DPDPConsentItem | null> {
    const item = this.consents.find((c) => c.id === id);
    if (!item || item.isMandatory) return item || null;
    item.isGranted = !item.isGranted;
    item.grantedTimestamp = new Date().toLocaleString('en-IN');
    return { ...item };
  }
}

export const complianceService = new ComplianceService();
