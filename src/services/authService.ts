import { UserProfile, UserRole } from '../types/package1';

export class AuthService {
  private mockProfile: UserProfile = {
    id: 'usr-101',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@policysphere.internal',
    mobile: '+91 98765 43210',
    role: 'Customer',
    isKycVerified: true,
    aadhaarNumber: 'XXXX-XXXX-4812',
    panNumber: 'ABCDE1234F',
    occupation: 'Software Engineer',
    annualIncome: '₹18,00,000',
    nominees: [
      { name: 'Sunita Kumar', relation: 'Spouse', sharePercentage: 70 },
      { name: 'Aarav Kumar', relation: 'Son', sharePercentage: 30 },
    ],
    familyMembers: [
      { name: 'Sunita Kumar', relation: 'Spouse', age: 34 },
      { name: 'Aarav Kumar', relation: 'Son', age: 8 },
    ],
    existingPolicies: [
      { policyNumber: 'POL-HLT-99812', categoryName: 'Family Floater', expiryDate: '2026-12-15' },
      { policyNumber: 'POL-MTR-88711', categoryName: 'Motor Insurance', expiryDate: '2027-03-20' },
    ],
  };

  public async sendOTP(mobileOrEmail: string): Promise<{ success: boolean; txnId: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, txnId: `otp-txn-${Date.now()}` });
      }, 300);
    });
  }

  public async verifyOTP(txnId: string, otp: string): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '1234' || otp.length === 4) {
          resolve(this.mockProfile);
        } else {
          reject(new Error('Invalid OTP entered. Please try 1234 for demo.'));
        }
      }, 400);
    });
  }

  public async verifyAadhaarPan(aadhaar: string, pan: string): Promise<{ success: boolean; kycRefId: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, kycRefId: `KYC-OK-${Math.floor(Math.random() * 100000)}` });
      }, 500);
    });
  }

  public getProfile(): UserProfile {
    return this.mockProfile;
  }
}

export const authService = new AuthService();
