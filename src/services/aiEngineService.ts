import { AIRecommendation } from '../types/package4';

const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'ai-rec-1',
    policyName: 'HDFC ERGO Optima Secure AI-Fit',
    insurerName: 'HDFC ERGO General Insurance',
    matchScore: 97,
    category: 'Health',
    monthlyPremium: 1250,
    coverageAmount: '₹10,000,000 (1 Crore)',
    rationale: [
      'Matches your family age profile (32 yrs)',
      '0% Co-pay & 4X automatic coverage multiplier',
      'Instant cashless approval at 14,200+ hospitals',
    ],
    plainEnglishSummary:
      'This policy quadruples your sum insured automatically after year 1 without extra premium. Covers pre & post hospitalization 100% with no room rent caps.',
    claimProbabilityScore: 99,
    riskRating: 'Low Risk',
  },
  {
    id: 'ai-rec-2',
    policyName: 'ICICI Pru iProtect Smart AI',
    insurerName: 'ICICI Prudential Life',
    matchScore: 94,
    category: 'Life',
    monthlyPremium: 890,
    coverageAmount: '₹20,000,000 (2 Crore)',
    rationale: [
      'Highest Claim Settlement Ratio (99.1%)',
      'Includes Critical Illness rider for 34 diseases',
      'Tax deduction benefit under Section 80C',
    ],
    plainEnglishSummary:
      'Provides pure life protection for your dependents. Includes instant payout on diagnosis of terminal illnesses without waiting for death certificate.',
    claimProbabilityScore: 98,
    riskRating: 'Low Risk',
  },
  {
    id: 'ai-rec-3',
    policyName: 'Tata AIG AutoSecure Zero-Dep',
    insurerName: 'Tata AIG General Insurance',
    matchScore: 91,
    category: 'Motor',
    monthlyPremium: 680,
    coverageAmount: 'IDV ₹850,000',
    rationale: [
      'Bumper-to-Bumper Zero Depreciation cover',
      'Engine & Gearbox protection included',
      '24x7 Roadside assistance in 1,200+ cities',
    ],
    plainEnglishSummary:
      'Covers 100% repair cost of plastic, rubber, and glass parts without depreciation deduction during accident claims.',
    claimProbabilityScore: 96,
    riskRating: 'Low Risk',
  },
];

export class AIEngineService {
  private recommendations: AIRecommendation[] = MOCK_RECOMMENDATIONS;

  public async getPersonalizedRecommendations(
    userAge: number = 32,
    incomeRange: string = '10L-15L',
    dependents: number = 2
  ): Promise<AIRecommendation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.recommendations);
      }, 200);
    });
  }

  public async predictPremium(
    category: string,
    age: number,
    sumInsured: number
  ): Promise<{ predictedMonthly: number; confidenceScore: number }> {
    const base = sumInsured / 10000;
    const ageMultiplier = age > 45 ? 1.5 : age > 35 ? 1.2 : 1.0;
    const predictedMonthly = Math.round(base * ageMultiplier * 1.15);
    return {
      predictedMonthly,
      confidenceScore: 95,
    };
  }
}

export const aiEngineService = new AIEngineService();
