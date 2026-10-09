import { ProposalDetails, ProposalStatus } from '../types/package2';

export class ProposalService {
  private activeProposal: ProposalDetails = {
    proposalId: 'PROP-88912',
    quoteId: 'qte-ins-1-demo',
    insurerName: 'Star Health & Allied Insurance',
    planName: 'Optima Secure Super Plan',
    categoryName: 'Health Insurance',
    sumInsured: 1000000,
    annualPremium: 15840,
    lockExpiryTimestamp: Date.now() + 30 * 60 * 1000, // 30 mins from now
    proposer: {
      fullName: 'Rajesh Kumar',
      dob: '1992-05-14',
      gender: 'Male',
      email: 'rajesh.kumar@policysphere.internal',
      mobile: '9876543210',
      panNumber: 'ABCDE1234F',
      addressLine1: '402, Green Park Avenue',
      pincode: '110001',
      city: 'New Delhi',
      state: 'Delhi',
    },
    medicalDeclaration: {
      hasPreExistingCondition: false,
      conditionDetails: 'None',
      isSmoker: false,
    },
    nominee: {
      fullName: 'Sunita Kumar',
      relationship: 'Spouse',
      age: 34,
    },
    status: 'Draft',
  };

  public async saveProposal(details: Partial<ProposalDetails>): Promise<ProposalDetails> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.activeProposal = {
          ...this.activeProposal,
          ...details,
          proposer: { ...this.activeProposal.proposer, ...details.proposer },
          medicalDeclaration: { ...this.activeProposal.medicalDeclaration, ...details.medicalDeclaration },
          nominee: { ...this.activeProposal.nominee, ...details.nominee },
          status: 'Locked',
        };
        resolve(this.activeProposal);
      }, 300);
    });
  }

  public getProposal(): ProposalDetails {
    return this.activeProposal;
  }

  public async submitProposalForApproval(proposalId: string): Promise<{ approved: boolean; approvalCode: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.activeProposal.status = 'Approved';
        resolve({ approved: true, approvalCode: `UW-AUTO-APPROVED-${Math.floor(Math.random() * 8999 + 1000)}` });
      }, 400);
    });
  }
}

export const proposalService = new ProposalService();
