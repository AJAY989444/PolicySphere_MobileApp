import {
  ThirdPartyIntegration,
  DigiLockerDocument,
  CKYCRecord,
} from '../types/package6';

const MOCK_INTEGRATIONS: ThirdPartyIntegration[] = [
  { id: 'int-1', providerName: 'DigiLocker Govt Portal', category: 'Govt Identity', apiStatus: 'Connected & Operational', latencyMs: 140, authMethod: 'OAuth2' },
  { id: 'int-2', providerName: 'Central CKYC Registry', category: 'KYC Registry', apiStatus: 'Connected & Operational', latencyMs: 180, authMethod: 'HMAC Signature' },
  { id: 'int-3', providerName: 'Aadhaar eKYC Gateway', category: 'Govt Identity', apiStatus: 'Connected & Operational', latencyMs: 95, authMethod: 'OAuth2' },
  { id: 'int-4', providerName: 'NSDL PAN Verification', category: 'Govt Identity', apiStatus: 'Connected & Operational', latencyMs: 65, authMethod: 'API Key' },
  { id: 'int-5', providerName: 'WhatsApp Business API', category: 'Messaging', apiStatus: 'Connected & Operational', latencyMs: 45, authMethod: 'OAuth2' },
  { id: 'int-6', providerName: 'Google Maps TPA Locator', category: 'Maps & Location', apiStatus: 'Connected & Operational', latencyMs: 25, authMethod: 'API Key' },
];

const MOCK_DIGILOCKER_DOCS: DigiLockerDocument[] = [
  { docId: 'dl-001', name: 'Aadhaar Card (UIDAI Verified)', issuer: 'Government of India', issuedDate: '2024-05-10', isVerified: true },
  { docId: 'dl-002', name: 'PAN Card (Income Tax Dept)', issuer: 'Income Tax Department', issuedDate: '2023-11-15', isVerified: true },
  { docId: 'dl-003', name: 'Driving License (DL-01-2022-99182)', issuer: 'Transport Department Delhi', issuedDate: '2022-08-01', isVerified: true },
];

const MOCK_CKYC_RECORD: CKYCRecord = {
  ckycNumber: '400199281028',
  fullName: 'Rajesh Kumar',
  dob: '14/05/1992',
  panNumber: 'ABCDE1234F',
  verificationStatus: 'Verified & Active',
};

export class IntegrationsService {
  private integrations: ThirdPartyIntegration[] = MOCK_INTEGRATIONS;

  public async getIntegrations(): Promise<ThirdPartyIntegration[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.integrations]), 150);
    });
  }

  public async fetchDigiLockerDocs(): Promise<DigiLockerDocument[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_DIGILOCKER_DOCS]), 200);
    });
  }

  public async fetchCKYCRecord(): Promise<CKYCRecord> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...MOCK_CKYC_RECORD }), 200);
    });
  }
}

export const integrationsService = new IntegrationsService();
