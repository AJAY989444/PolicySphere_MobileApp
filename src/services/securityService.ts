import { MaskedField } from '../types/package7';

const MOCK_FIELDS: MaskedField[] = [
  { fieldName: 'Aadhaar Number', rawValue: '4812-9910-4412', maskedValue: 'XXXX-XXXX-4412', encryptionAlgorithm: 'AES-256-GCM', isEncrypted: true },
  { fieldName: 'PAN Card Number', rawValue: 'ABCDE1234F', maskedValue: 'AB***1234F', encryptionAlgorithm: 'AES-256-GCM', isEncrypted: true },
  { fieldName: 'Customer Email', rawValue: 'rajesh.kumar@example.com', maskedValue: 'r***h@example.com', encryptionAlgorithm: 'AES-256-GCM', isEncrypted: true },
  { fieldName: 'Credit Card Token', rawValue: '4111222233334444', maskedValue: 'XXXX-XXXX-XXXX-4444 (Tok-9918)', encryptionAlgorithm: 'AES-256-GCM', isEncrypted: true },
  { fieldName: 'Medical History Notes', rawValue: 'Pre-existing Hypertension since 2021', maskedValue: '[ENCRYPTED_AES256_BLOB]', encryptionAlgorithm: 'AES-256-GCM', isEncrypted: true },
];

export class SecurityService {
  private fields: MaskedField[] = MOCK_FIELDS;

  public async getSecurityFields(): Promise<MaskedField[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.fields]), 150);
    });
  }

  public encryptString(input: string): string {
    return `AES256::${btoa ? btoa(input) : 'ENC_' + input}`;
  }

  public maskString(input: string, type: 'Aadhaar' | 'PAN' | 'Email'): string {
    if (type === 'Aadhaar') return `XXXX-XXXX-${input.slice(-4)}`;
    if (type === 'PAN') return `${input.slice(0, 2)}***${input.slice(-3)}`;
    return `${input[0]}***@example.com`;
  }
}

export const securityService = new SecurityService();
