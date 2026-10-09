import { IssuedPolicy, PaymentTransaction } from '../types/package2';

const MOCK_ACTIVE_POLICIES: IssuedPolicy[] = [
  {
    policyNumber: 'POL-HLT-2026-99182',
    proposalId: 'PROP-88912',
    insurerName: 'Star Health & Allied Insurance',
    insurerLogo: '⭐',
    categoryName: 'Health Insurance',
    planName: 'Optima Secure Super Plan',
    sumInsured: 1000000,
    annualPremium: 15840,
    policyStartDate: '2026-10-02',
    policyExpiryDate: '2027-10-01',
    status: 'ACTIVE',
    certificatePdfUrl: 'https://policysphere.internal/certs/POL-HLT-2026-99182.pdf',
    nomineeName: 'Sunita Kumar',
    dispatchChannels: { email: true, sms: true, whatsapp: true },
    paymentHistory: [
      {
        txnId: 'TXN-1727889100',
        proposalId: 'PROP-88912',
        amount: 15840,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2026-10-02 18:30:00',
        gatewayRef: 'PG-RAZOR-998123',
      },
    ],
  },
  {
    policyNumber: 'POL-MTR-2026-44102',
    proposalId: 'PROP-33109',
    insurerName: 'HDFC ERGO General',
    insurerLogo: '🛡️',
    categoryName: 'Motor Insurance',
    planName: 'Comprehensive Car Protect',
    sumInsured: 850000,
    annualPremium: 12450,
    policyStartDate: '2026-03-15',
    policyExpiryDate: '2027-03-14',
    status: 'ACTIVE',
    certificatePdfUrl: 'https://policysphere.internal/certs/POL-MTR-2026-44102.pdf',
    nomineeName: 'Sunita Kumar',
    dispatchChannels: { email: true, sms: true, whatsapp: true },
    paymentHistory: [
      {
        txnId: 'TXN-1710492800',
        proposalId: 'PROP-33109',
        amount: 12450,
        method: 'CreditCard',
        status: 'SUCCESS',
        timestamp: '2026-03-15 11:20:00',
        gatewayRef: 'PG-RAZOR-441092',
      },
    ],
  },
];

export class PolicyService {
  private activePolicies: IssuedPolicy[] = MOCK_ACTIVE_POLICIES;

  public async getActivePolicies(): Promise<IssuedPolicy[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.activePolicies), 200);
    });
  }

  public issuePolicyFromProposal(
    proposalId: string,
    txn: PaymentTransaction,
    categoryName: string,
    insurerName: string,
    planName: string,
    sumInsured: number,
    annualPremium: number
  ): IssuedPolicy {
    const newPolicy: IssuedPolicy = {
      policyNumber: `POL-${categoryName.substring(0, 3).toUpperCase()}-2026-${Math.floor(Math.random() * 89999 + 10000)}`,
      proposalId,
      insurerName,
      insurerLogo: '🛡️',
      categoryName,
      planName,
      sumInsured,
      annualPremium,
      policyStartDate: new Date().toISOString().split('T')[0],
      policyExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ACTIVE',
      certificatePdfUrl: `https://policysphere.internal/certs/POL-NEW-${Date.now()}.pdf`,
      nomineeName: 'Sunita Kumar',
      dispatchChannels: { email: true, sms: true, whatsapp: true },
      paymentHistory: [txn],
    };

    this.activePolicies.unshift(newPolicy);
    return newPolicy;
  }
}

export const policyService = new PolicyService();
