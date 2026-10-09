import { InsuranceClaim, ClaimType } from '../types/package3';

const MOCK_CLAIMS: InsuranceClaim[] = [
  {
    claimId: 'CLM-HLT-99201',
    policyNumber: 'POL-HLT-2026-99182',
    categoryName: 'Health Insurance',
    claimType: 'Cashless',
    incidentDate: '2026-09-28',
    claimedAmount: 65000,
    approvedAmount: 62500,
    currentStage: 'Approved',
    surveyorName: 'Vikram Mehta',
    surveyorMobile: '+91 98112 33445',
    hospitalName: 'Apollo Speciality Hospital, New Delhi',
    uploadedDocumentIds: ['doc-3', 'doc-4'],
    timeline: [
      { stage: 'Intimated', timestamp: '2026-09-28 10:15', note: 'Cashless claim intimated by hospital desk' },
      { stage: 'Documents Uploaded', timestamp: '2026-09-28 11:30', note: 'Pre-auth form & estimated hospital bill submitted' },
      { stage: 'Under Verification', timestamp: '2026-09-28 14:00', note: 'TPAs verified medical policy active status' },
      { stage: 'Surveyor Assigned', timestamp: '2026-09-28 16:30', note: 'Surveyor Vikram Mehta conducted hospital desk audit' },
      { stage: 'Approved', timestamp: '2026-09-29 09:00', note: 'Cashless approval authorization letter generated (₹62,500)' },
    ],
  },
  {
    claimId: 'CLM-MTR-88102',
    policyNumber: 'POL-MTR-2026-44102',
    categoryName: 'Motor Insurance',
    claimType: 'Vehicle',
    incidentDate: '2026-09-15',
    claimedAmount: 28000,
    approvedAmount: 28000,
    currentStage: 'Settled',
    surveyorName: 'Amit Sharma',
    surveyorMobile: '+91 98221 55667',
    uploadedDocumentIds: ['doc-5'],
    timeline: [
      { stage: 'Intimated', timestamp: '2026-09-15 14:20', note: 'Accident claim intimating bumper damage' },
      { stage: 'Surveyor Assigned', timestamp: '2026-09-16 10:00', note: 'Spot inspection conducted at garage' },
      { stage: 'Approved', timestamp: '2026-09-18 11:00', note: 'Repair estimate approved' },
      { stage: 'Settled', timestamp: '2026-09-20 15:30', note: 'Payout transferred directly to garage' },
      { stage: 'Closed', timestamp: '2026-09-20 16:00', note: 'Claim closed successfully' },
    ],
  },
];

export class ClaimsService {
  private claims: InsuranceClaim[] = MOCK_CLAIMS;

  public async getActiveClaims(): Promise<InsuranceClaim[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.claims), 200);
    });
  }

  public async intimateClaim(
    policyNumber: string,
    categoryName: string,
    claimType: ClaimType,
    claimedAmount: number,
    incidentDate: string,
    hospitalOrDetails: string
  ): Promise<InsuranceClaim> {
    const newClaim: InsuranceClaim = {
      claimId: `CLM-${categoryName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 89999 + 10000)}`,
      policyNumber,
      categoryName,
      claimType,
      incidentDate,
      claimedAmount,
      currentStage: 'Intimated',
      surveyorName: 'Anil Gupta (TPA Desk)',
      surveyorMobile: '+91 98700 11223',
      hospitalName: claimType === 'Cashless' ? hospitalOrDetails : undefined,
      uploadedDocumentIds: [],
      timeline: [
        { stage: 'Intimated', timestamp: new Date().toLocaleString('en-IN'), note: 'Claim intimated successfully on PolicySphere platform' },
      ],
    };

    this.claims.unshift(newClaim);
    return newClaim;
  }
}

export const claimsService = new ClaimsService();
